const fs = require('fs');
const assert = require('assert');

// 1. Test BiS Map Builder
function buildBiSLookupMap(bisData) {
  const map = new Map();
  if (!bisData || !bisData.classes) return map;

  for (const cls of bisData.classes) {
    const cData = bisData[cls.id];
    if (!cData) continue;
    for (const sp of cData.specs || []) {
      for (const slot of Object.keys(sp.gear || {})) {
        const list = Array.isArray(sp.gear[slot]) ? sp.gear[slot] : [sp.gear[slot]];
        for (const it of list) {
          if (!it || !it.name) continue;
          const key = it.name.toLowerCase().trim();
          if (!map.has(key)) {
            map.set(key, {
              name: it.name,
              classId: cls.id,
              className: cls.name,
              specId: sp.id,
              specName: sp.name,
              slot: slot,
              phase: it.phase || 'Phase 2',
              type: 'gear'
            });
          }
        }
      }
      for (const enc of sp.enchants || []) {
        if (!enc.source) continue;
        const m = enc.source.match(/^(?:Enchant\s+[^(\d]+|[\w\s'’-]+Armor Kit|[\w\s'’-]+Weightstone|[\w\s'’-]+Sharpening Stone)/i);
        const encName = m ? m[0].trim().toLowerCase() : '';
        if (encName && !map.has(encName)) {
          map.set(encName, {
            name: m[0].trim(),
            classId: cls.id,
            className: cls.name,
            specId: sp.id,
            specName: sp.name,
            type: 'enchant'
          });
        }
      }
      for (const con of sp.consumables || []) {
        if (!con || !con.name) continue;
        const key = con.name.toLowerCase().trim();
        if (!map.has(key)) {
          map.set(key, {
            name: con.name,
            classId: cls.id,
            className: cls.name,
            specId: sp.id,
            specName: sp.name,
            type: 'consumable'
          });
        }
      }
    }
  }
  return map;
}

// 2. Test Dungeon & Blueprint Detectors
function isDungeonRecipe(r) {
  if (!r) return false;
  const s = (r.source || '').toLowerCase();
  const n = (r.name || '').toLowerCase();
  if (s.includes('dungeon') || s.includes('instance') || s.includes('boss')) return true;
  const dungeonKeywords = [
    'deadmines', 'shadowfang', 'wailing caverns', 'blackfathom', 'stockade',
    'gnomeregan', 'razorfen', 'scarlet monastery', 'graveyard', 'library', 'armory',
    'cathedral', 'uldaman', 'zul\'farrak', 'maraudon', 'sunken temple', 'atal\'hakkar',
    'blackrock depths', 'brd', 'lbrs', 'ubrs', 'stratholme', 'scholomance', 'dire maul',
    'city of dalaran', 'excavation site', 'ruins of lordaeron', 'hall of thanes',
    'molten core', 'onyxia', 'blackwing', 'zul\'gurub', 'ahn\'qiraj', 'naxxramas'
  ];
  return dungeonKeywords.some(d => s.includes(d) || n.includes(d));
}

function isBlueprintRecipe(r) {
  if (!r) return false;
  const s = (r.source || '').toLowerCase();
  const n = (r.name || '').toLowerCase();
  return n.startsWith('blueprint:') || s.includes('blueprint:') || s.includes('campfire station') || s.includes('camp blueprint');
}

// 3. Test Disenchant Material Detector
function isDisenchantMaterial(name) {
  if (!name) return false;
  const n = name.toLowerCase().trim();
  const exact = [
    'strange dust', 'soul dust', 'vision dust', 'dream dust', 'illusion dust',
    'lesser magic essence', 'greater magic essence',
    'lesser astral essence', 'greater astral essence',
    'lesser mystic essence', 'greater mystic essence',
    'lesser nether essence', 'greater nether essence',
    'lesser eternal essence', 'greater eternal essence',
    'small glimmering shard', 'large glimmering shard',
    'small glowing shard', 'large glowing shard',
    'small radiant shard', 'large radiant shard',
    'small brilliant shard', 'large brilliant shard',
    'nexus crystal'
  ];
  return exact.includes(n) || n.endsWith(' dust') || n.endsWith(' essence') || n.endsWith(' shard') || n.endsWith(' crystal');
}

console.log('Testing scratch module helpers...');

// Load data
const profs = JSON.parse(fs.readFileSync('data/forever_professions.json', 'utf8'));
const bisJs = fs.readFileSync('js/data/bis-data.js', 'utf8');
const ctx = { window: {} };
require('vm').runInNewContext(bisJs + '; window.WOW_BIS_DATA = WOW_BIS_DATA;', ctx);
const bisData = ctx.window.WOW_BIS_DATA;

const bisMap = buildBiSLookupMap(bisData);
console.log('BiS Map size:', bisMap.size);
assert(bisMap.size > 200, 'BiS map should contain over 200 items');

// Test isDungeonRecipe & isBlueprintRecipe across all recipes
let dungeonCount = 0;
let blueprintCount = 0;
for (const [k, p] of Object.entries(profs)) {
  for (const r of p.recipes || []) {
    if (isDungeonRecipe(r)) dungeonCount++;
    if (isBlueprintRecipe(r)) blueprintCount++;
  }
}
console.log('Dungeon recipes found:', dungeonCount);
console.log('Blueprint recipes found:', blueprintCount);
assert(dungeonCount > 40, 'Should detect at least 40 dungeon recipes');
assert(blueprintCount >= 10, 'Should detect at least 10 blueprint recipes');

// Test isDisenchantMaterial
assert(isDisenchantMaterial('Vision Dust'));
assert(isDisenchantMaterial('Greater Eternal Essence'));
assert(isDisenchantMaterial('Large Brilliant Shard'));
assert(!isDisenchantMaterial('Copper Ore'));
assert(!isDisenchantMaterial('Peacebloom'));
console.log('✓ Disenchant material detection verified!');

console.log('✓ Scratch test passed completely!');
