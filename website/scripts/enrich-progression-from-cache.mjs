import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');

const cachePath = path.join(ROOT, 'scratch', 'forever_items_cache.json');
if (!fs.existsSync(cachePath)) {
  console.error('Cache not found at', cachePath);
  process.exit(1);
}

const cache = JSON.parse(fs.readFileSync(cachePath, 'utf8'));

function isRealStatToken(tok) {
  const s = String(tok ?? '').trim();
  if (!s) return false;
  if (/^(equip|use|chance on hit):/i.test(s)) return true;
  if (/^[+-]\d+%?\s+(strength|agility|stamina|intellect|spirit|str|agi|sta|int|spi|spell power|sp|attack power|ap|healing|armor|block|crit|hit|defense|res|penetration|fire|frost|shadow|nature|arcane|holy|mana regeneration|health regeneration|spell damage|healing spells)/i.test(s)) return true;
  if (/^\d+%?\s+(mp5|sp|ap|crit|hit|spell power|healing|armor|block)/i.test(s)) return true;
  if (/^(strength|agility|stamina|intellect|spirit|str|agi|sta|int|spi|spell power|sp|attack power|ap|defense|armor|block)\s+[+-]\d+/i.test(s)) return true;
  if (/proc on hit|on hit/i.test(s) && /[+-]?\d+/.test(s)) return true;
  return false;
}

function extractSourceOnly(valStr) {
  if (!valStr) return '';
  const parts = valStr.split(/\s*[-–—]\s*/);
  if (parts.length <= 1) return valStr;
  const nonStats = parts.slice(1).filter(p => {
    const trimmed = p.trim();
    if (!trimmed) return false;
    const tokens = trimmed.split(/,/);
    return !tokens.every(isRealStatToken);
  });
  return nonStats.join(' — ').trim();
}

function enrichItemFromCache(it) {
  if (!it) return;
  const id = it.itemId || it.id;
  if (!id) return;
  const cached = cache[String(id)];
  if (!cached) return;

  // 1. Core attributes
  if (cached.icon && (!it.icon || it.icon === 'inv_misc_questionmark')) {
    it.icon = cached.icon;
  }
  if (cached.quality && !it.quality) {
    it.quality = cached.quality;
  }
  if (cached.iLvl && !it.iLvl) {
    it.iLvl = cached.iLvl;
  }
  if (cached.reqLevel && (!it.reqLevel || it.reqLevel === 1)) {
    it.reqLevel = cached.reqLevel;
  }
  if (cached.speed && !it.speed) {
    it.speed = cached.speed;
  }
  if (cached.dps && !it.dps) {
    it.dps = cached.dps;
  }

  // 2. Stats
  if (cached.stats && (!it.stats || !it.stats.trim())) {
    it.stats = cached.stats;
  }

  // 3. Lines
  if (cached.lines && Array.isArray(cached.lines) && cached.lines.length > 0) {
    // If current lines is missing or sparse, use cached lines
    const currentHasStats = (it.lines || []).some(l => l.startsWith('+') || /Strength|Agility|Stamina|Intellect|Spirit|Armor|Spell Damage|Healing|Attack Power|Crit|Hit|MP5/i.test(l));
    if (!currentHasStats) {
      it.lines = cached.lines;
    }
  }

  // 4. Update value string for alts to include stats
  if (it.value && it.stats) {
    const cleanSource = extractSourceOnly(it.value) || (typeof it.source === 'string' ? it.source : it.source?.title || '');
    const cleanDps = it.dps ? (it.dps.toLowerCase().includes('dps') ? it.dps : `${it.dps} DPS`) : '';
    const cleanSpeed = it.speed ? `${it.speed}s` : '';
    
    let prefix = '';
    if (cleanDps && cleanSpeed) prefix = `${cleanDps}, ${cleanSpeed}`;
    else if (cleanDps) prefix = cleanDps;
    else if (cleanSpeed) prefix = cleanSpeed;

    const parts = [];
    if (prefix) parts.push(prefix);
    if (it.stats) parts.push(it.stats);
    if (cleanSource) parts.push(cleanSource);

    it.value = parts.join(' - ');
  }
}

function processProgressionFile(filePath) {
  if (!fs.existsSync(filePath)) {
    console.warn(`File not found: ${filePath}`);
    return;
  }
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  let count = 0;

  for (const cKey in data) {
    const cData = data[cKey];
    const sets = [cData.levels, cData.healingLevels, ...(Object.values(cData.tracksData || {}))].filter(Boolean);
    for (const set of sets) {
      for (const step of set) {
        enrichItemFromCache(step);
        count++;
        if (step.alts && Array.isArray(step.alts)) {
          for (const alt of step.alts) {
            enrichItemFromCache(alt);
            count++;
          }
        }
      }
    }
  }

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
  console.log(`Updated ${path.basename(filePath)} (${count} items/alts processed).`);
}

const files = [
  path.join(ROOT, 'data', 'scraped', 'forever_weapons.json'),
  path.join(ROOT, 'data', 'scraped', 'forever_wands.json'),
  path.join(ROOT, 'data', 'scraped', 'forever_offhands.json')
];

files.forEach(processProgressionFile);
console.log('All progression files successfully enriched from cache!');
