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
        if (it.itemId) {
          const existing = bisMap.get(String(it.itemId));
          if (!existing || (!existing.lines && it.lines) || (!existing.stats && it.stats)) {
            bisMap.set(String(it.itemId), it);
          }
        }
        if (it.name) {
          const key = it.name.toLowerCase().trim();
          const existing = bisMap.get(key);
          if (!existing || (!existing.lines && it.lines) || (!existing.stats && it.stats)) {
            bisMap.set(key, it);
          }
        }
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

// 3. Helper to parse envChange added stats from Wowhead data
function parseEnvChangeStats(lines) {
  if (!lines || !Array.isArray(lines)) return [];
  const stats = [];
  for (const line of lines) {
    const addedMatch = line.match(/^([A-Za-z\s]+?)\s+(\d+)\s+added$/i);
    if (addedMatch) {
      const name = addedMatch[1].trim();
      const val = addedMatch[2];
      if (!/item level|requires level|level/i.test(name)) {
        stats.push(`+${val} ${name}`);
      }
    }
    const insteadMatch = line.match(/^([A-Za-z\s]+?)\s+(\d+)\s+instead of\s+\d+$/i);
    if (insteadMatch) {
      const name = insteadMatch[1].trim();
      const val = insteadMatch[2];
      if (!/item level|requires level|level|durability/i.test(name)) {
        stats.push(`+${val} ${name}`);
      }
    }
  }
  return stats;
}

// Helper to validate whether a token is an authentic WoW stat
function isRealStatToken(tok) {
  const s = tok.trim();
  if (!s) return false;
  if (/^(equip|use|chance on hit):/i.test(s)) return true;
  // +X or -X Stat
  if (/^[+-]\d+%?\s+(strength|agility|stamina|intellect|spirit|str|agi|sta|int|spi|spell power|sp|attack power|ap|healing|armor|crit|hit|defense|res|penetration|fire|frost|shadow|nature|arcane|holy|mana regeneration|health regeneration)/i.test(s)) return true;
  // X MP5, X SP, X AP, X% Crit, X% Hit
  if (/^\d+%?\s+(mp5|sp|ap|crit|hit|spell power|healing)/i.test(s)) return true;
  // Stat +X
  if (/^(strength|agility|stamina|intellect|spirit|str|agi|sta|int|spi|spell power|sp|attack power|ap|defense|armor)\s+[+-]\d+/i.test(s)) return true;
  // Proc text with numbers (e.g. "+5 Spi, +5 Sta, Root on hit")
  if (/proc on hit|on hit/i.test(s) && /[+-]?\d+/.test(s)) return true;
  return false;
}

// 4. Helper to parse legitimate stats from description text
function parseStatsFromText(text) {
  if (!text) return '';
  // Check for parenthesis format: e.g. (+14 Sta, +36 Spell Power)
  const pMatch = text.match(/\(([^)]+)\)/);
  if (pMatch) {
    const inner = pMatch[1].trim();
    const tokens = inner.split(/,(?=\s*(?:[+-]|\d+\s*(?:mp5|sp|ap|crit|hit)|equip|use|chance on hit|\b(?:strength|agility|stamina|intellect|spirit|str|agi|sta|int|spi)\b))/i).map(s => s.trim()).filter(Boolean);
    const valid = tokens.filter(isRealStatToken);
    if (valid.length > 0) return valid.join(', ');
  }
  // Check for value list before '-' or ':'
  const left = text.split(/\s*[-–—:]\s*/)[0] || '';
  const tokens = left.split(/,(?=\s*(?:[+-]|\d+\s*(?:mp5|sp|ap|crit|hit)|equip|use|chance on hit|\b(?:strength|agility|stamina|intellect|spirit|str|agi|sta|int|spi)\b))/i).map(s => s.trim()).filter(Boolean);
  const valid = tokens.filter(isRealStatToken);
  if (valid.length > 0) return valid.join(', ');
  return '';
}

// Helper to parse min level from bracket
function parseMinLevel(bracket) {
  if (!bracket) return 1;
  const match = bracket.match(/(\d+)/);
  return match ? parseInt(match[1], 10) : 1;
}

// 5. Load and enrich weapons
const progPath = path.join(ROOT, 'data', 'scraped', 'forever_weapons.json');
const progData = JSON.parse(fs.readFileSync(progPath, 'utf8'));

let enrichedCount = 0;

for (const [cls, cData] of Object.entries(progData)) {
  for (const step of cData.levels || []) {
    const minLvl = parseMinLevel(step.levelBracket);
    const bis = (step.itemId ? bisMap.get(String(step.itemId)) : null) || bisMap.get(step.name.toLowerCase().trim());
    const wh = (step.itemId ? whMap.get(String(step.itemId)) : null) || whNameMap.get(step.name.toLowerCase().trim());

    // Resolve accurate stats without false positives
    let cleanStats = '';
    if (bis?.stats) {
      const bTokens = bis.stats.split(',').map(s => s.trim()).filter(Boolean);
      if (bTokens.every(isRealStatToken)) cleanStats = bis.stats;
    }
    if (!cleanStats) {
      cleanStats = parseStatsFromText(step.source?.detail);
    }
    if (!cleanStats && wh?.envChange?.lines) {
      const envStats = parseEnvChangeStats(wh.envChange.lines);
      if (envStats.length > 0) cleanStats = envStats.join(', ');
    }

    if (bis) {
      step.quality = bis.quality || 'q3';
      step.iLvl = bis.ilvl || (wh ? wh.level : minLvl + 5);
      step.stats = cleanStats;
      step.lines = bis.lines || null;
      const reqLine = bis.lines?.find(l => l.startsWith('Requires Level'));
      const reqMatch = reqLine?.match(/\d+/);
      step.reqLevel = reqMatch ? parseInt(reqMatch[0], 10) : (wh?.reqlevel || Math.max(1, minLvl - 1));
    } else if (wh) {
      step.quality = 'q' + (wh.quality || 2);
      step.iLvl = wh.level || (minLvl + 5);
      step.reqLevel = wh.reqlevel || Math.max(1, minLvl - 1);
      step.stats = cleanStats;
    } else {
      const isVendorLow = step.source?.kind === 'vendor' && minLvl <= 5;
      step.quality = isVendorLow ? 'q1' : (minLvl >= 15 ? 'q3' : 'q2');
      step.iLvl = minLvl + 5;
      step.reqLevel = Math.max(1, minLvl - 1);
      step.stats = cleanStats;
    }
    enrichedCount++;

    // Enrich alts
    for (const alt of step.alts || []) {
      const altBis = (alt.itemId ? bisMap.get(String(alt.itemId)) : null) || bisMap.get(alt.name.toLowerCase().trim());
      const altWh = (alt.itemId ? whMap.get(String(alt.itemId)) : null) || whNameMap.get(alt.name.toLowerCase().trim());

      let cleanAltStats = '';
      if (altBis?.stats) {
        const bTokens = altBis.stats.split(',').map(s => s.trim()).filter(Boolean);
        if (bTokens.every(isRealStatToken)) cleanAltStats = altBis.stats;
      }
      if (!cleanAltStats) {
        cleanAltStats = parseStatsFromText(alt.value);
      }
      if (!cleanAltStats && altWh?.envChange?.lines) {
        const envStats = parseEnvChangeStats(altWh.envChange.lines);
        if (envStats.length > 0) cleanAltStats = envStats.join(', ');
      }

      if (altBis) {
        alt.quality = altBis.quality || 'q3';
        alt.iLvl = altBis.ilvl || (altWh ? altWh.level : minLvl + 5);
        alt.stats = cleanAltStats;
        alt.lines = altBis.lines || null;
        const reqLine = altBis.lines?.find(l => l.startsWith('Requires Level'));
        const reqMatch = reqLine?.match(/\d+/);
        alt.reqLevel = reqMatch ? parseInt(reqMatch[0], 10) : (altWh?.reqlevel || Math.max(1, minLvl - 1));
      } else if (altWh) {
        alt.quality = 'q' + (altWh.quality || 2);
        alt.iLvl = altWh.level || (minLvl + 5);
        alt.reqLevel = altWh.reqlevel || Math.max(1, minLvl - 1);
        alt.stats = cleanAltStats;
      } else {
        const isVendorLow = (alt.value || '').toLowerCase().includes('vendor') && minLvl <= 5;
        alt.quality = isVendorLow ? 'q1' : (minLvl >= 15 ? 'q3' : 'q2');
        alt.iLvl = minLvl + 5;
        alt.reqLevel = Math.max(1, minLvl - 1);
        alt.stats = cleanAltStats;
      }
      enrichedCount++;
    }
  }
}

// Save updated forever_weapons.json
fs.writeFileSync(progPath, JSON.stringify(progData, null, 2), 'utf8');
console.log(`[Enricher] Enriched ${enrichedCount} weapons & alts in ${progPath}`);

// Compile into class-progression-data.js
import('./compile-progression-data.mjs').then(() => {
  console.log('[Enricher] Successfully recompiled class-progression-data.js');
});
