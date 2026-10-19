import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');

const cachePath = path.join(ROOT, 'scratch', 'forever_items_cache.json');
let cache = {};
if (fs.existsSync(cachePath)) {
  try {
    cache = JSON.parse(fs.readFileSync(cachePath, 'utf8'));
  } catch {}
}

const shields = JSON.parse(fs.readFileSync(path.join(ROOT, 'data', 'scraped', 'wowhead_forever_shields.json'), 'utf8'));
const offhands = JSON.parse(fs.readFileSync(path.join(ROOT, 'data', 'scraped', 'wowhead_forever_offhands.json'), 'utf8'));

const uncached = [];
const seen = new Set();
for (const it of [...shields, ...offhands]) {
  if (!it.id || seen.has(it.id)) continue;
  seen.add(it.id);
  if (!cache[String(it.id)] || !cache[String(it.id)].stats) {
    uncached.push(it);
  }
}

console.log(`[Cache Manager] Found ${uncached.length} shields and off-hands needing XML cache enrichment.`);

function parseXmlTooltip(xml, fallback) {
  const nameMatch = xml.match(/<name><!\[CDATA\[(.*?)\]\]><\/name>/);
  const iconMatch = xml.match(/<icon[^>]*>(.*?)<\/icon>/);
  const levelMatch = xml.match(/<level>(\d+)<\/level>/);
  const qualMatch = xml.match(/<quality id="(\d+)">/);
  const reqMatch = xml.match(/Requires Level <!--rlvl-->(\d+)/);
  const slotMatch = xml.match(/<inventorySlot id="(\d+)">([^<]+)<\/inventorySlot>/);
  const subMatch = xml.match(/<subclass id="(-?\d+)">([^<]+)<\/subclass>/);

  const jeMatch = xml.match(/<jsonEquip><!\[CDATA\[(.*?)\]\]><\/jsonEquip>/);
  let je = {};
  if (jeMatch) {
    try {
      je = JSON.parse('{' + jeMatch[1] + '}');
    } catch {}
  }

  const stats = [];
  const armorVal = je.armor || fallback.armor;
  if (armorVal) stats.push(`${armorVal} Armor`);
  if (je.blockamount || je.block) stats.push(`+${je.blockamount || je.block} Block`);
  if (je.str) stats.push(`+${je.str} Strength`);
  if (je.agi) stats.push(`+${je.agi} Agility`);
  if (je.sta) stats.push(`+${je.sta} Stamina`);
  if (je.int) stats.push(`+${je.int} Intellect`);
  if (je.spi) stats.push(`+${je.spi} Spirit`);
  if (je.defrtng) stats.push(`+${je.defrtng} Defense`);

  if (je.splheal && je.spldmg && je.splheal === je.spldmg) {
    stats.push(`+${je.splheal} Spell Power`);
  } else {
    if (je.splheal) stats.push(`+${je.splheal} Healing`);
    if (je.spldmg) stats.push(`+${je.spldmg} Spell Damage`);
  }
  if (je.splpwr) stats.push(`+${je.splpwr} Spell Power`);
  if (je.critstrkrtng) stats.push(`+${je.critstrkrtng} Crit`);
  if (je.hitrtng) stats.push(`+${je.hitrtng} Hit`);
  if (je.manargn) stats.push(`+${je.manargn} MP5`);

  // Parse resistances
  const resRegex = /\+([0-9]+)\s+([A-Za-z]+ Resistance)/g;
  let m;
  while ((m = resRegex.exec(xml)) !== null) {
    stats.push(`+${m[1]} ${m[2]}`);
  }

  // Parse equip procs
  const equipRegex = /<span class="q2">(?:Equip|Chance on hit): ([^<]+)<\/span>/gi;
  while ((m = equipRegex.exec(xml)) !== null) {
    const raw = m[1].replace(/<!--.*?-->/g, '').trim();
    if (raw && !stats.some(s => s.toLowerCase().includes(raw.toLowerCase()))) {
      stats.push(`Equip: ${raw}`);
    }
  }

  // Fallback to tooltip regex parsing if stats empty
  if (stats.length === 0) {
    const statRegex = /<!--stat\d+-->([+-]?\d+[^<]+)/g;
    while ((m = statRegex.exec(xml)) !== null) {
      stats.push(m[1].trim());
    }
  }

  const iconName = iconMatch ? iconMatch[1] : (fallback.appearances?.['0']?.[1] || (fallback.slot === 14 ? 'inv_shield_04' : 'inv_misc_orb_01'));
  const isShield = fallback.slot === 14 || fallback.subclass === 6;

  return {
    id: fallback.id,
    name: nameMatch ? nameMatch[1] : fallback.name,
    icon: iconName,
    iLvl: levelMatch ? parseInt(levelMatch[1], 10) : (fallback.level || 1),
    reqLevel: reqMatch ? parseInt(reqMatch[1], 10) : (fallback.reqlevel || 1),
    quality: qualMatch ? `q${qualMatch[1]}` : (fallback.quality ? `q${fallback.quality}` : 'q2'),
    stats: stats.join(', '),
    inventorySlot: slotMatch ? slotMatch[2] : (isShield ? 'Shield' : 'Held in Off-hand'),
    subclass: subMatch ? subMatch[2] : (isShield ? 'Shields' : 'Miscellaneous'),
    subclassName: isShield ? 'Shield' : 'Held In Off-hand',
    side: fallback.side === 1 ? 'alliance' : fallback.side === 2 ? 'horde' : 'both',
    sourcemore: fallback.sourcemore || null
  };
}

async function runScrape() {
  const BATCH_SIZE = 15;
  for (let i = 0; i < uncached.length; i += BATCH_SIZE) {
    const batch = uncached.slice(i, i + BATCH_SIZE);
    await Promise.all(batch.map(async item => {
      try {
        let res = await fetch(`https://www.wowhead.com/forever/item=${item.id}&xml`);
        let xml = await res.text();
        if (!xml.includes('<item id=')) {
          res = await fetch(`https://www.wowhead.com/classic/item=${item.id}&xml`);
          xml = await res.text();
        }
        if (xml.includes('<item id=')) {
          const parsed = parseXmlTooltip(xml, item);
          cache[String(item.id)] = parsed;
        }
      } catch (err) {
        console.warn(`Failed fetch for item ${item.id}:`, err.message);
      }
    }));

    if ((i + BATCH_SIZE) % 60 === 0 || i + BATCH_SIZE >= uncached.length) {
      console.log(`[Cache Manager] Cached ${Math.min(i + BATCH_SIZE, uncached.length)} / ${uncached.length}...`);
      fs.writeFileSync(cachePath, JSON.stringify(cache, null, 2), 'utf8');
    }
  }

  fs.writeFileSync(cachePath, JSON.stringify(cache, null, 2), 'utf8');
  console.log(`[Cache Manager] Finished! Total cached items: ${Object.keys(cache).length}`);
}

runScrape().catch(console.error);
