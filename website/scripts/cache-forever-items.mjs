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

const whWeapons = JSON.parse(fs.readFileSync(path.join(ROOT, 'data', 'scraped', 'wowhead_forever_weapons.json'), 'utf8'));
const whOffhands = JSON.parse(fs.readFileSync(path.join(ROOT, 'data', 'scraped', 'wowhead_forever_offhands.json'), 'utf8'));

// Filter items needing cache: custom items or any items missing stats/speed
const itemsToFetch = [];
for (const w of [...whWeapons, ...whOffhands]) {
  if (!w.id) continue;
  const idStr = String(w.id);
  // Fetch if custom item or not cached yet
  if ((w.id >= 200000 || (w.envChange && w.envChange.status === 'new')) && !cache[idStr]) {
    itemsToFetch.push({ id: w.id, item: w });
  }
}

console.log(`Found ${itemsToFetch.length} items needing XML scrape.`);

function parseXmlTooltip(xml, fallback) {
  const nameMatch = xml.match(/<name><!\[CDATA\[(.*?)\]\]><\/name>/);
  const iconMatch = xml.match(/<icon[^>]*>(.*?)<\/icon>/);
  const levelMatch = xml.match(/<level>(\d+)<\/level>/);
  const qualMatch = xml.match(/<quality id="(\d+)">/);
  const spdMatch = xml.match(/Speed <!--spd-->([\d.]+)/);
  const dpsMatch = xml.match(/\(([\d.]+) damage per second\)/);
  const reqMatch = xml.match(/Requires Level <!--rlvl-->(\d+)/);
  const slotMatch = xml.match(/<inventorySlot id="(\d+)">([^<]+)<\/inventorySlot>/);
  const subMatch = xml.match(/<subclass id="(-?\d+)">([^<]+)<\/subclass>/);

  // Extract stats
  const stats = [];
  const statRegex = /<!--stat\d+-->([+-]?\d+[^<]+)/g;
  let m;
  while ((m = statRegex.exec(xml)) !== null) {
    stats.push(m[1].trim());
  }

  // Extract spell power / healing / attack power / crit equip effects
  const equipRegex = /<span class="q2">(?:Equip|Chance on hit): ([^<]+)<\/span>/gi;
  while ((m = equipRegex.exec(xml)) !== null) {
    const raw = m[1].replace(/<!--.*?-->/g, '').trim();
    if (raw) stats.push(raw);
  }

  const resRegex = /\+([0-9]+)\s+([A-Za-z]+ Resistance)/g;
  while ((m = resRegex.exec(xml)) !== null) {
    stats.push(`+${m[1]} ${m[2]}`);
  }

  return {
    id: fallback.id,
    name: nameMatch ? nameMatch[1] : fallback.name,
    icon: iconMatch ? iconMatch[1] : (fallback.appearances?.['0']?.[1] || 'inv_misc_questionmark'),
    iLvl: levelMatch ? parseInt(levelMatch[1], 10) : (fallback.level || 1),
    reqLevel: reqMatch ? parseInt(reqMatch[1], 10) : (fallback.reqlevel || 1),
    quality: qualMatch ? `q${qualMatch[1]}` : (fallback.quality ? `q${fallback.quality}` : 'q2'),
    speed: spdMatch ? spdMatch[1] : (fallback.speed ? Number(fallback.speed).toFixed(2) : null),
    dps: dpsMatch ? `${dpsMatch[1]} DPS` : (fallback.dps ? `${Number(fallback.dps).toFixed(1)} DPS` : null),
    stats: stats.join(', '),
    inventorySlot: slotMatch ? slotMatch[2] : null,
    subclass: subMatch ? subMatch[2] : null,
    side: fallback.side === 1 ? 'alliance' : fallback.side === 2 ? 'horde' : 'both',
    sourcemore: fallback.sourcemore || null
  };
}

// Concurrency pool
async function runScrape() {
  const BATCH_SIZE = 15;
  for (let i = 0; i < itemsToFetch.length; i += BATCH_SIZE) {
    const batch = itemsToFetch.slice(i, i + BATCH_SIZE);
    await Promise.all(batch.map(async ({ id, item }) => {
      try {
        const res = await fetch(`https://www.wowhead.com/forever/item=${id}&xml`);
        const xml = await res.text();
        if (xml.includes('<item id=')) {
          const parsed = parseXmlTooltip(xml, item);
          cache[String(id)] = parsed;
        }
      } catch (err) {
        console.error(`Failed to fetch XML for item ${id}:`, err.message);
      }
    }));
    if ((i + BATCH_SIZE) % 60 === 0 || i + BATCH_SIZE >= itemsToFetch.length) {
      console.log(`Scraped ${Math.min(i + BATCH_SIZE, itemsToFetch.length)} / ${itemsToFetch.length}...`);
      fs.writeFileSync(cachePath, JSON.stringify(cache, null, 2), 'utf8');
    }
  }
  fs.writeFileSync(cachePath, JSON.stringify(cache, null, 2), 'utf8');
  console.log(`Scrape finished! Total cached items: ${Object.keys(cache).length}`);
}

runScrape().catch(console.error);
