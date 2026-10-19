/**
 * Systematically audits and enriches weapon progression datasets:
 * 1. data/scraped/forever_weapons.json
 * 2. data/scraped/forever_wands.json
 * 3. data/scraped/forever_offhands.json
 *
 * Ensures all items have their stats properly included in their lines array,
 * separates stats from source text, and regenerates js/data/class-progression-data.js.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');
const SCRAPED_DIR = path.join(ROOT, 'data', 'scraped');

function isRealStatToken(tok) {
  const s = String(tok ?? '').trim();
  if (!s) return false;
  if (/^(equip|use|chance on hit):/i.test(s)) return true;
  if (/^[+-]\d+%?\s+(strength|agility|stamina|intellect|spirit|str|agi|sta|int|spi|spell power|sp|attack power|ap|healing|armor|crit|hit|defense|res|penetration|fire|frost|shadow|nature|arcane|holy|mana regeneration|health regeneration|spell damage|healing spells)/i.test(s)) return true;
  if (/^\d+%?\s+(mp5|sp|ap|crit|hit|spell power|healing)/i.test(s)) return true;
  if (/^(strength|agility|stamina|intellect|spirit|str|agi|sta|int|spi|spell power|sp|attack power|ap|defense|armor)\s+[+-]\d+/i.test(s)) return true;
  if (/proc on hit|on hit/i.test(s) && /[+-]?\d+/.test(s)) return true;
  if (/^[+-]\d+/.test(s)) return true;
  return false;
}

function parseStatsTokens(statsStr, altValStr) {
  if (statsStr) {
    const tokens = statsStr.split(/,(?=\s*(?:[+-]|\d+\s*(?:mp5|sp|ap|crit|hit)|equip|use|chance on hit|\b(?:strength|agility|stamina|intellect|spirit|str|agi|sta|int|spi)\b))/i)
      .map(s => s.trim())
      .filter(Boolean);
    const valid = tokens.filter(isRealStatToken);
    if (valid.length > 0) return valid;
  }
  if (!altValStr) return [];
  const parts = altValStr.split(/\s*[-–—]\s*/);
  if (parts.length > 1) {
    for (const p of parts.slice(1)) {
      const tokens = p.split(/,(?=\s*(?:[+-]|\d+\s*(?:mp5|sp|ap|crit|hit)|equip|use|chance on hit|\b(?:strength|agility|stamina|intellect|spirit|str|agi|sta|int|spi)\b))/i)
        .map(s => s.trim())
        .filter(Boolean);
      const valid = tokens.filter(isRealStatToken);
      if (valid.length > 0) return valid;
    }
  }
  return [];
}

function extractSourceAndStats(valStr) {
  if (!valStr) return { stats: [], source: '' };
  const parts = valStr.split(/\s*[-–—]\s*/);
  if (parts.length <= 1) return { stats: [], source: valStr };
  
  const rest = parts.slice(1);
  const statParts = [];
  const sourceParts = [];

  for (const p of rest) {
    const trimmed = p.trim();
    if (!trimmed) continue;
    const subTokens = trimmed.split(/,(?=\s*(?:[+-]|\d+\s*(?:mp5|sp|ap|crit|hit)|equip|use|chance on hit|\b(?:strength|agility|stamina|intellect|spirit|str|agi|sta|int|spi)\b))/i)
      .map(s => s.trim())
      .filter(Boolean);
    const allStats = subTokens.length > 0 && subTokens.every(isRealStatToken);
    if (allStats) {
      statParts.push(...subTokens);
    } else {
      sourceParts.push(trimmed);
    }
  }

  return {
    stats: statParts,
    source: sourceParts.join(' — ')
  };
}

function enrichItem(it) {
  if (!it) return;

  // 1. Separate stats and clean source from value
  if (it.value) {
    const { stats: valStats, source: valSource } = extractSourceAndStats(it.value);
    if ((!it.stats || !it.stats.trim()) && valStats.length > 0) {
      it.stats = valStats.join(', ');
    }
    if ((!it.source || (typeof it.source === 'string' && !it.source.trim())) && valSource) {
      it.source = valSource;
    }
  }

  // 2. Parse stat tokens
  const statTokens = parseStatsTokens(it.stats, it.value);
  if (statTokens.length === 0) return;

  // 3. Ensure it.lines has the stat tokens
  if (it.lines && Array.isArray(it.lines) && it.lines.length > 0) {
    const hasStats = it.lines.some(l => {
      const trimmed = l.trim();
      return trimmed.startsWith('+') || /Strength|Agility|Stamina|Intellect|Spirit|Armor|Spell Damage|Healing|Attack Power|\bAP\b|\bSP\b/i.test(trimmed);
    });

    if (!hasStats) {
      let insertIdx = it.lines.findIndex(l => l.toLowerCase().includes('damage per second'));
      if (insertIdx !== -1) {
        insertIdx += 1;
      } else {
        insertIdx = it.lines.findIndex(l => l.includes('Damage') || l.includes('Speed'));
        if (insertIdx !== -1) {
          insertIdx += 1;
        } else {
          insertIdx = it.lines.findIndex(l => l.startsWith('Requires Level') || l.startsWith('Sell Price:') || l.startsWith('Equip:'));
          if (insertIdx === -1) insertIdx = it.lines.length;
        }
      }
      it.lines = [...it.lines.slice(0, insertIdx), ...statTokens, ...it.lines.slice(insertIdx)];
    }
  }
}

function processFile(filename) {
  const filePath = path.join(SCRAPED_DIR, filename);
  if (!fs.existsSync(filePath)) {
    console.warn(`File ${filePath} does not exist, skipping.`);
    return;
  }
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  let count = 0;

  for (const key in data) {
    const obj = data[key];
    const sets = [obj.levels, obj.healingLevels].filter(Boolean);
    for (const set of sets) {
      for (const item of set) {
        enrichItem(item);
        count++;
        if (item.alts && Array.isArray(item.alts)) {
          for (const alt of item.alts) {
            enrichItem(alt);
            count++;
          }
        }
      }
    }
  }

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
  console.log(`[Enricher] Updated ${filename} (processed ${count} items/alts).`);
}

['forever_weapons.json', 'forever_wands.json', 'forever_offhands.json'].forEach(processFile);

console.log('[Enricher] All progression datasets successfully enriched with stats!');
