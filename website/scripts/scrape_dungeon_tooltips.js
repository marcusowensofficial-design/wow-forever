import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');

// 1. Extract all unique item IDs from dungeons-data.js
const dungPath = path.join(ROOT, 'js', 'data', 'dungeons-data.js');
const dungCode = fs.readFileSync(dungPath, 'utf8');

const itemRegex = /item=(\d+)(?:\/([^"\s)]+))?/g;
const itemMap = new Map();
let m;
while ((m = itemRegex.exec(dungCode)) !== null) {
  const id = m[1];
  const slug = m[2] || '';
  if (!itemMap.has(id)) {
    itemMap.set(id, slug);
  }
}

console.log(`Found ${itemMap.size} unique items in dungeon guides.`);

// Ensure data/scraped exists
const scrapedDir = path.join(ROOT, 'data', 'scraped');
if (!fs.existsSync(scrapedDir)) {
  fs.mkdirSync(scrapedDir, { recursive: true });
}

const cachePath = path.join(scrapedDir, 'forever_dungeon_loot_tooltips.json');
let cache = {};
if (fs.existsSync(cachePath)) {
  try {
    cache = JSON.parse(fs.readFileSync(cachePath, 'utf8'));
    console.log(`Loaded ${Object.keys(cache).length} pre-cached items.`);
  } catch (e) {
    console.error('Failed reading existing cache:', e.message);
  }
}

function cleanHtmlText(html) {
  if (!html) return '';
  return html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
}

function extractStatSummary(xml, htmlTooltip) {
  // Extract key summary stats: stats (+X Str, etc.), damage/DPS, armor, and equips
  const parts = [];

  // Weapon damage & speed
  const dmgMatch = htmlTooltip.match(/<!--dmg-->([^<]+)/);
  const spdMatch = htmlTooltip.match(/Speed <!--spd-->([^<]+)/);
  const dpsMatch = htmlTooltip.match(/<!--dps-->\(([^)]+)\)/);
  if (dmgMatch && spdMatch) {
    const dps = dpsMatch ? ` (${dpsMatch[1].replace(' damage per second', ' DPS')})` : '';
    parts.push(`${dmgMatch[1].trim()}${dps} · Spd ${spdMatch[1].trim()}`);
  }

  // Armor
  const armorMatch = htmlTooltip.match(/<span>(\d+) Armor<\/span>/i) || htmlTooltip.match(/(\d+)\s+Armor/i);
  if (armorMatch && !htmlTooltip.includes('<!--dmg-->')) {
    parts.push(`${armorMatch[1]} Armor`);
  }

  // Block
  const blockMatch = htmlTooltip.match(/(\d+)\s+Block/i);
  if (blockMatch) {
    parts.push(`${blockMatch[1]} Block`);
  }

  // Primary stats: +X Strength, +Y Agility, +Z Stamina, +W Intellect, +S Spirit
  const statMatches = [...htmlTooltip.matchAll(/<!--stat\d+-->([+-]\d+\s+[A-Za-z]+)/gi)].map(sm => sm[1].trim());
  if (statMatches.length > 0) {
    parts.push(statMatches.join(', '));
  } else {
    // Fallback regex for stats
    const altStats = [...htmlTooltip.matchAll(/([+-]\d+\s+(?:Strength|Agility|Stamina|Intellect|Spirit))/gi)].map(sm => sm[1].trim());
    if (altStats.length > 0) {
      parts.push([...new Set(altStats)].join(', '));
    }
  }

  // Equip effects
  const equipMatches = [...htmlTooltip.matchAll(/<span class="q2">Equip:\s*([^<]+(?:<span>[^<]+<\/span>[^<]*)*)<\/span>/gi)];
  if (equipMatches.length > 0) {
    const cleanEquip = cleanHtmlText(equipMatches[0][1]).replace(/^Equip:\s*/i, '');
    parts.push(cleanEquip);
  }

  // Use effects
  const useMatches = [...htmlTooltip.matchAll(/<span class="q2">Use:\s*([^<]+(?:<span>[^<]+<\/span>[^<]*)*)<\/span>/gi)];
  if (useMatches.length > 0) {
    const cleanUse = cleanHtmlText(useMatches[0][1]).replace(/^Use:\s*/i, '');
    parts.push(`Use: ${cleanUse}`);
  }

  return parts.length > 0 ? parts.join(' · ') : 'Equipable Quest / Encounter Drop';
}

async function scrapeAll() {
  const ids = Array.from(itemMap.keys());
  let fetchedCount = 0;

  for (let i = 0; i < ids.length; i++) {
    const id = ids[i];
    if (cache[id] && cache[id].htmlTooltip && cache[id].icon) {
      continue; // Already complete
    }

    const url = `https://www.wowhead.com/forever/item=${id}&xml`;
    try {
      const res = await fetch(url, {
        headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
      });
      if (!res.ok) {
        console.warn(`HTTP ${res.status} for item ${id}`);
        continue;
      }
      const xml = await res.text();

      const nameMatch = xml.match(/<name><!\[CDATA\[([\s\S]*?)\]\]><\/name>/);
      const qualityMatch = xml.match(/<quality id="(\d+)">/);
      const iconMatch = xml.match(/<icon[^>]*>([\s\S]*?)<\/icon>/);
      const ilvlMatch = xml.match(/<level>(\d+)<\/level>/);
      const slotMatch = xml.match(/<inventorySlot id="\d+">([\s\S]*?)<\/inventorySlot>/);
      const subClassMatch = xml.match(/<subclass id="\d+"><!\[CDATA\[([\s\S]*?)\]\]><\/subclass>/);
      const tooltipMatch = xml.match(/<htmlTooltip><!\[CDATA\[([\s\S]*?)\]\]><\/htmlTooltip>/);

      const name = nameMatch ? nameMatch[1].trim() : 'Unknown Item';
      const quality = qualityMatch ? parseInt(qualityMatch[1], 10) : 2;
      const icon = iconMatch ? iconMatch[1].trim() : 'inv_misc_questionmark';
      const iLvl = ilvlMatch ? parseInt(ilvlMatch[1], 10) : 1;
      const slot = (slotMatch ? slotMatch[1].trim() : '') || (subClassMatch ? subClassMatch[1].trim() : '') || 'Quest Item';
      const subClass = subClassMatch ? subClassMatch[1].trim() : '';
      const htmlTooltip = tooltipMatch ? tooltipMatch[1].trim() : '';

      const statSummary = extractStatSummary(xml, htmlTooltip);

      cache[id] = {
        id: parseInt(id, 10),
        name,
        quality: `q${quality}`,
        qualityNum: quality,
        icon,
        iLvl,
        slot,
        subClass,
        statSummary,
        htmlTooltip
      };

      fetchedCount++;
      if (fetchedCount % 10 === 0 || i === ids.length - 1) {
        console.log(`Progress: ${i + 1}/${ids.length} items processed (fetched ${fetchedCount} new)...`);
        fs.writeFileSync(cachePath, JSON.stringify(cache, null, 2), 'utf8');
      }

      // Polite rate delay
      await new Promise(r => setTimeout(r, 60));
    } catch (e) {
      console.error(`Error fetching item ${id}:`, e.message);
    }
  }

  // Save final cache JSON
  fs.writeFileSync(cachePath, JSON.stringify(cache, null, 2), 'utf8');
  console.log(`Saved ${Object.keys(cache).length} items to ${cachePath}`);

  // Generate js/data/dungeon-loot-tooltips.js
  const jsContent = `/**
 * World of Warcraft: Forever - Curated Dungeon Loot Tooltip Dataset
 * Pre-cached canonical stats, icons, and Blizzard HTML tooltips for all 220 Phase 2 dungeon drops.
 */

if (typeof window !== 'undefined') {
  window.WOW_DUNGEON_LOOT_TOOLTIPS = ${JSON.stringify(cache, null, 2)};
}
`;

  const jsPath = path.join(ROOT, 'js', 'data', 'dungeon-loot-tooltips.js');
  fs.writeFileSync(jsPath, jsContent, 'utf8');
  console.log(`Saved dataset to ${jsPath}`);
}

scrapeAll().catch(console.error);
