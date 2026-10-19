import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');

const weaponsPath = path.join(ROOT, 'data', 'scraped', 'forever_weapons.json');
const offhandsPath = path.join(ROOT, 'data', 'scraped', 'forever_offhands.json');
const wandsPath = path.join(ROOT, 'data', 'scraped', 'forever_wands.json');
const cachePath = path.join(ROOT, 'scratch', 'forever_items_cache.json');

const weapons = JSON.parse(fs.readFileSync(weaponsPath, 'utf8'));
const offhands = JSON.parse(fs.readFileSync(offhandsPath, 'utf8'));
const wands = JSON.parse(fs.readFileSync(wandsPath, 'utf8'));

let cache = {};
if (fs.existsSync(cachePath)) {
  try {
    cache = JSON.parse(fs.readFileSync(cachePath, 'utf8'));
  } catch {}
}

// 1. Gather all unique item IDs across progression files
const allItemsMap = new Map();

function collectItems(dataset, typeName) {
  for (const cls of Object.keys(dataset)) {
    const cData = dataset[cls];
    for (const step of cData.levels || []) {
      if (step.itemId) {
        allItemsMap.set(Number(step.itemId), { id: Number(step.itemId), name: step.name, type: typeName });
      }
      for (const alt of step.alts || []) {
        if (alt.itemId) {
          allItemsMap.set(Number(alt.itemId), { id: Number(alt.itemId), name: alt.name, type: typeName });
        }
      }
    }
  }
}

collectItems(weapons, 'weapon');
collectItems(offhands, 'offhand');
collectItems(wands, 'wand');

console.log(`Found ${allItemsMap.size} unique items across all progression tracks.`);

// Helper to parse XML tooltip completely
function parseXmlItem(xml, fallbackId, fallbackName) {
  const nameMatch = xml.match(/<name><!\[CDATA\[(.*?)\]\]><\/name>/);
  const name = nameMatch ? nameMatch[1] : fallbackName;
  const iconMatch = xml.match(/<icon[^>]*>(.*?)<\/icon>/);
  const icon = iconMatch ? iconMatch[1] : 'inv_misc_questionmark';
  const levelMatch = xml.match(/<level>(\d+)<\/level>/);
  const iLvl = levelMatch ? parseInt(levelMatch[1], 10) : null;
  const qualMatch = xml.match(/<quality id="(\d+)">/);
  const quality = qualMatch ? `q${qualMatch[1]}` : 'q2';
  const reqMatch = xml.match(/Requires Level <!--rlvl-->(\d+)/) || xml.match(/Requires Level (\d+)/);
  const reqLevel = reqMatch ? parseInt(reqMatch[1], 10) : null;
  const spdMatch = xml.match(/Speed <!--spd-->([\d.]+)/) || xml.match(/Speed ([\d.]+)/);
  const speed = spdMatch ? Number(spdMatch[1]).toFixed(2) : null;
  const dpsMatch = xml.match(/\(([\d.]+) damage per second\)/);
  const dps = dpsMatch ? `${dpsMatch[1]} DPS` : null;
  const slotMatch = xml.match(/<inventorySlot id="(\d+)">([^<]+)<\/inventorySlot>/);
  const invSlot = slotMatch ? slotMatch[2] : null;
  const subMatch = xml.match(/<subclass id="(-?\d+)">([^<]+)<\/subclass>/);
  const subclassName = subMatch ? subMatch[2] : null;

  const ttMatch = xml.match(/<htmlTooltip><!\[CDATA\[([\s\S]*?)\]\]><\/htmlTooltip>/);
  if (!ttMatch) {
    return null;
  }

  const rawHtml = ttMatch[1];
  const cleanHtml = rawHtml.replace(/<!--.*?-->/g, '');

  // Extract base stats (+X Stat)
  const baseStats = [];
  const statRegex = /([+-]?\d+)\s+(Strength|Agility|Stamina|Intellect|Spirit|Armor)\b/gi;
  let sm;
  while ((sm = statRegex.exec(cleanHtml)) !== null) {
    baseStats.push(`${sm[1]} ${sm[2]}`);
  }

  // Extract resistances (+X Resistance)
  const resRegex = /([+-]?\d+)\s+([A-Za-z]+ Resistance)\b/gi;
  while ((sm = resRegex.exec(cleanHtml)) !== null) {
    baseStats.push(`${sm[1]} ${sm[2]}`);
  }

  // Extract all green equip / chance on hit / use effects
  const equips = [];
  const equipRegex = /<(?:span|div)[^>]*class="[^"]*q2[^"]*"[^>]*>([\s\S]*?)<\/(?:span|div)>/gi;
  let em;
  while ((em = equipRegex.exec(cleanHtml)) !== null) {
    let text = em[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
    if (/^(?:Equip|Chance on hit|Use):/i.test(text)) {
      // Clean up common suffix artifacts like "(0.00% @ L60)"
      text = text.replace(/\s*\(\d+\.\d+%\s*@\s*L\d+\)/gi, '');
      if (!equips.includes(text)) {
        equips.push(text);
      }
    }
  }

  // Extract damage row text if available
  const dmgMatch = cleanHtml.match(/(\d+\s*-\s*\d+\s*Damage)/i);
  const dmgStr = dmgMatch ? dmgMatch[1] : null;

  // Extract binding
  const isBindsPickup = cleanHtml.includes('Binds when picked up');
  const isBindsEquip = cleanHtml.includes('Binds when equipped');

  // Extract classes restriction
  const classMatch = cleanHtml.match(/Classes:\s*([^<]+)/i);
  const classRestriction = classMatch ? classMatch[1].trim() : null;

  // Build authentic lines array
  const lines = [];
  if (isBindsPickup) lines.push('Binds when picked up');
  else if (isBindsEquip) lines.push('Binds when equipped');

  if (invSlot && subclassName) {
    lines.push(`${invSlot}\t${subclassName}`);
  } else if (invSlot) {
    lines.push(invSlot);
  }

  if (dmgStr && speed) {
    lines.push(`${dmgStr}\tSpeed ${speed}`);
  }
  if (dpsMatch) {
    lines.push(`(${dpsMatch[1]} damage per second)`);
  }

  for (const st of baseStats) {
    lines.push(st);
  }

  if (classRestriction) {
    lines.push(`Classes: ${classRestriction}`);
  }

  if (reqLevel && reqLevel > 1) {
    lines.push(`Requires Level ${reqLevel}`);
  }

  for (const eq of equips) {
    lines.push(eq);
  }

  // Combine into single stats string
  const combinedStatsList = [...baseStats, ...equips];
  const statsString = combinedStatsList.join(', ');

  return {
    id: fallbackId,
    name,
    icon,
    iLvl,
    quality,
    reqLevel,
    speed,
    dps,
    weaponType: subclassName || invSlot,
    inventorySlot: invSlot,
    stats: statsString,
    equips,
    baseStats,
    lines: lines.length > 0 ? lines : null
  };
}

// Fetch all items from Wowhead XML
async function enrichAll() {
  const ids = Array.from(allItemsMap.keys());
  console.log(`Starting fetch of ${ids.length} items from Wowhead Forever XML...`);

  const BATCH_SIZE = 15;
  const enrichedMap = new Map();

  for (let i = 0; i < ids.length; i += BATCH_SIZE) {
    const batch = ids.slice(i, i + BATCH_SIZE);
    await Promise.all(batch.map(async (id) => {
      const itemInfo = allItemsMap.get(id);
      try {
        const res = await fetch(`https://www.wowhead.com/forever/item=${id}&xml`);
        const xml = await res.text();
        if (xml.includes('<item id=')) {
          const parsed = parseXmlItem(xml, id, itemInfo.name);
          if (parsed) {
            enrichedMap.set(id, parsed);
            cache[String(id)] = parsed;
          }
        }
      } catch (err) {
        console.warn(`[Warn] Failed to fetch item ${id}: ${err.message}`);
      }
    }));
    const progress = Math.min(i + BATCH_SIZE, ids.length);
    if (progress % 45 === 0 || progress >= ids.length) {
      console.log(`  Fetched ${progress} / ${ids.length} items...`);
    }
  }

  console.log(`Successfully fetched and parsed ${enrichedMap.size} items.`);

  // Save updated cache
  fs.writeFileSync(cachePath, JSON.stringify(cache, null, 2), 'utf8');

  // Apply enrichment to datasets
  let updatedWeaponsCount = 0;

  function updateItem(it) {
    if (!it.itemId) return;
    const parsed = enrichedMap.get(Number(it.itemId));
    if (!parsed) return;

    if (parsed.quality) it.quality = parsed.quality;
    if (parsed.iLvl) it.iLvl = parsed.iLvl;
    if (parsed.reqLevel) it.reqLevel = parsed.reqLevel;
    if (parsed.speed && !it.speed) it.speed = parsed.speed;
    if (parsed.dps && !it.dps) it.dps = parsed.dps;

    // Apply stats if parsed has richer stats or equips
    if (parsed.stats && parsed.stats.length > 0) {
      // If parsed contains Equip: or has more detailed stats, prefer parsed
      if (/equip:|chance on hit:|use:/i.test(parsed.stats) || !it.stats) {
        it.stats = parsed.stats;
      }
    }

    // Apply authentic lines array
    if (parsed.lines && parsed.lines.length > 0) {
      it.lines = parsed.lines;
    }

    updatedWeaponsCount++;
  }

  function walkDataset(ds) {
    for (const cls of Object.keys(ds)) {
      const cData = ds[cls];
      for (const step of cData.levels || []) {
        updateItem(step);
        for (const alt of step.alts || []) {
          updateItem(alt);
        }
      }
    }
  }

  walkDataset(weapons);
  walkDataset(offhands);
  walkDataset(wands);

  fs.writeFileSync(weaponsPath, JSON.stringify(weapons, null, 2), 'utf8');
  fs.writeFileSync(offhandsPath, JSON.stringify(offhands, null, 2), 'utf8');
  fs.writeFileSync(wandsPath, JSON.stringify(wands, null, 2), 'utf8');

  console.log(`✓ Enriched and updated ${updatedWeaponsCount} weapon, off-hand, and wand entries across all files.`);
}

enrichAll();
