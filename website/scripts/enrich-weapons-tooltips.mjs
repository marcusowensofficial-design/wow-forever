import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');

// 1. Load BiS data
let bisCode = fs.readFileSync(path.join(ROOT, 'js', 'data', 'bis-data.js'), 'utf8');
bisCode = bisCode.replace('const WOW_BIS_DATA =', 'global.WOW_BIS_DATA =');
eval(bisCode);

const bisMap = new Map();
for (const cls of global.WOW_BIS_DATA.classes) {
  const cd = global.WOW_BIS_DATA[cls.id];
  for (const sp of cd.specs || []) {
    for (const sl of sp.slots || []) {
      for (const it of sl.items || []) {
        if (it.itemId) bisMap.set(String(it.itemId), it);
        if (it.name) bisMap.set(it.name.toLowerCase().trim(), it);
      }
    }
  }
}

// 2. Load Wowhead scraped weapons
const whItems = JSON.parse(fs.readFileSync(path.join(ROOT, 'data', 'scraped', 'wowhead_forever_weapons.json'), 'utf8'));
const whMap = new Map();
const whNameMap = new Map();
for (const it of whItems) {
  if (it.id) whMap.set(String(it.id), it);
  if (it.name) whNameMap.set(it.name.toLowerCase().trim(), it);
  if (it.displayName) whNameMap.set(it.displayName.toLowerCase().trim(), it);
}

// 3. Helper to parse stats from text
function parseStatsFromText(text) {
  if (!text) return '';
  // Check for parenthesis format: e.g. (+14 Sta, +36 Spell Power)
  const pMatch = text.match(/\(([^)]+)\)/);
  if (pMatch) {
    const inner = pMatch[1].trim();
    if (/[+0-9]|\b(str|sta|agi|int|spi|sp|ap|crit|hit|healing|spell|defense|res|mp5)\b/i.test(inner)) {
      return inner;
    }
  }
  // Check for value list before '-' or ':'
  const left = text.split(/\s*[-–—:]\s*/)[0] || '';
  const tokens = left.split(',').map(s => s.trim());
  const statTokens = tokens.filter(t => !/dps$/i.test(t) && !/^\d+(\.\d+)?s$/i.test(t) && !/vendor/i.test(t));
  if (statTokens.length > 0 && statTokens.some(t => /[+0-9]|\b(str|sta|agi|int|spi|sp|ap|mp5)\b/i.test(t))) {
    return statTokens.join(', ');
  }
  return '';
}

// Helper to parse min level from bracket
function parseMinLevel(bracket) {
  if (!bracket) return 1;
  const match = bracket.match(/(\d+)/);
  return match ? parseInt(match[1], 10) : 1;
}

// 4. Load weapons
const progPath = path.join(ROOT, 'data', 'scraped', 'forever_weapons.json');
const progData = JSON.parse(fs.readFileSync(progPath, 'utf8'));

let enrichedCount = 0;

for (const [cls, cData] of Object.entries(progData)) {
  for (const step of cData.levels || []) {
    const minLvl = parseMinLevel(step.levelBracket);
    const bis = (step.itemId ? bisMap.get(String(step.itemId)) : null) || bisMap.get(step.name.toLowerCase().trim());
    const wh = (step.itemId ? whMap.get(String(step.itemId)) : null) || whNameMap.get(step.name.toLowerCase().trim());

    if (bis) {
      step.quality = bis.quality || 'q3';
      step.iLvl = bis.ilvl || (wh ? wh.level : minLvl + 5);
      step.stats = bis.stats || parseStatsFromText(step.source?.detail);
      step.lines = bis.lines || null;
      // Extract required level from lines if present
      const reqLine = bis.lines?.find(l => l.startsWith('Requires Level'));
      const reqMatch = reqLine?.match(/\d+/);
      step.reqLevel = reqMatch ? parseInt(reqMatch[0], 10) : (wh?.reqlevel || Math.max(1, minLvl - 1));
    } else if (wh) {
      step.quality = 'q' + (wh.quality || 2);
      step.iLvl = wh.level || (minLvl + 5);
      step.reqLevel = wh.reqlevel || Math.max(1, minLvl - 1);
      step.stats = parseStatsFromText(step.source?.detail);
    } else {
      const isVendorLow = step.source?.kind === 'vendor' && minLvl <= 5;
      step.quality = isVendorLow ? 'q1' : (minLvl >= 15 ? 'q3' : 'q2');
      step.iLvl = minLvl + 5;
      step.reqLevel = Math.max(1, minLvl - 1);
      step.stats = parseStatsFromText(step.source?.detail);
    }
    enrichedCount++;

    // Enrich alts
    for (const alt of step.alts || []) {
      const altBis = (alt.itemId ? bisMap.get(String(alt.itemId)) : null) || bisMap.get(alt.name.toLowerCase().trim());
      const altWh = (alt.itemId ? whMap.get(String(alt.itemId)) : null) || whNameMap.get(alt.name.toLowerCase().trim());

      if (altBis) {
        alt.quality = altBis.quality || 'q3';
        alt.iLvl = altBis.ilvl || (altWh ? altWh.level : minLvl + 5);
        alt.stats = altBis.stats || parseStatsFromText(alt.value);
        alt.lines = altBis.lines || null;
        const reqLine = altBis.lines?.find(l => l.startsWith('Requires Level'));
        const reqMatch = reqLine?.match(/\d+/);
        alt.reqLevel = reqMatch ? parseInt(reqMatch[0], 10) : (altWh?.reqlevel || Math.max(1, minLvl - 1));
      } else if (altWh) {
        alt.quality = 'q' + (altWh.quality || 2);
        alt.iLvl = altWh.level || (minLvl + 5);
        alt.reqLevel = altWh.reqlevel || Math.max(1, minLvl - 1);
        alt.stats = parseStatsFromText(alt.value);
      } else {
        const isVendorLow = (alt.value || '').toLowerCase().includes('vendor') && minLvl <= 5;
        alt.quality = isVendorLow ? 'q1' : (minLvl >= 15 ? 'q3' : 'q2');
        alt.iLvl = minLvl + 5;
        alt.reqLevel = Math.max(1, minLvl - 1);
        alt.stats = parseStatsFromText(alt.value);
      }
      enrichedCount++;
    }
  }
}

// Save updated forever_weapons.json
fs.writeFileSync(progPath, JSON.stringify(progData, null, 2), 'utf8');
console.log(`[Enricher] Enriched ${enrichedCount} weapons & alts in ${progPath}`);
