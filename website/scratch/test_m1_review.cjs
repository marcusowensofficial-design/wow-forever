const fs = require('fs');
const path = require('path');

const cachePath = path.join(__dirname, 'forever_items_cache.json');
const weaponsPath = path.join(__dirname, '..', 'data', 'scraped', 'wowhead_forever_weapons.json');
const shieldsPath = path.join(__dirname, '..', 'data', 'scraped', 'wowhead_forever_shields.json');
const offhandsPath = path.join(__dirname, '..', 'data', 'scraped', 'wowhead_forever_offhands.json');

const cache = JSON.parse(fs.readFileSync(cachePath, 'utf8'));
const weapons = JSON.parse(fs.readFileSync(weaponsPath, 'utf8'));
const shields = JSON.parse(fs.readFileSync(shieldsPath, 'utf8'));
const offhands = JSON.parse(fs.readFileSync(offhandsPath, 'utf8'));

console.log('=== 1. CATALOG COVERAGE CHECK ===');
const catalogItems = new Map();
for (const w of weapons) catalogItems.set(Number(w.id), { ...w, cat: 'weapon' });
for (const s of shields) catalogItems.set(Number(s.id), { ...s, cat: 'shield' });
for (const o of offhands) catalogItems.set(Number(o.id), { ...o, cat: 'offhand' });

console.log('Total unique catalog items:', catalogItems.size);
console.log('Total items in cache:', Object.keys(cache).length);

let missingInCache = 0;
for (const [id, catItem] of catalogItems.entries()) {
  if (!cache[String(id)]) {
    missingInCache++;
    console.log(`Missing item in cache: ID ${id} (${catItem.name}) [${catItem.cat}]`);
  }
}
console.log(`Missing from catalog in cache: ${missingInCache}`);

console.log('\n=== 2. DATA INTEGRITY & SANITY CHECKS ===');
let invalidIcon = 0;
let invalidEffectiveLevel = 0;
let invalidArmor = 0;
let invalidBlock = 0;
let invalidResistances = 0;
let unstrippedHtml = 0;
let brokenEntities = 0;
let nanOrUndefinedValues = 0;
let emptyLines = 0;

for (const [id, item] of Object.entries(cache)) {
  const jsonStr = JSON.stringify(item);
  if (jsonStr.includes('NaN') || jsonStr.includes('null,') && (item.name === null || item.icon === null)) {
    nanOrUndefinedValues++;
  }

  // Icon validation: should be a clean token without extensions or path
  if (!item.icon || !/^[a-z0-9_-]+$/i.test(item.icon)) {
    invalidIcon++;
    console.log(`Invalid icon on item ${id}:`, item.icon);
  }

  // EffectiveLevel validation
  if (typeof item.effectiveLevel !== 'number' || isNaN(item.effectiveLevel) || item.effectiveLevel < 1 || item.effectiveLevel > 60) {
    invalidEffectiveLevel++;
    console.log(`Invalid effectiveLevel on item ${id}:`, item.effectiveLevel);
  }

  // Armor validation
  if (item.armor !== null && (typeof item.armor !== 'number' || isNaN(item.armor) || item.armor < 0)) {
    invalidArmor++;
  }

  // Block validation for shields
  const isShield = item.inventorySlot === 'Shield' || item.subclassName === 'Shield' || item.weaponType === 'Shield';
  if (isShield) {
    if (typeof item.block !== 'number' || isNaN(item.block) || item.block <= 0) {
      invalidBlock++;
      console.log(`Shield missing or invalid block: item ${id} (${item.name}):`, item.block);
    }
  }

  // Resistances validation
  if (item.resistances) {
    for (const [elem, val] of Object.entries(item.resistances)) {
      if (typeof val !== 'number' || isNaN(val) || val <= 0) {
        invalidResistances++;
        console.log(`Invalid resistance on item ${id}: ${elem}=${val}`);
      }
    }
  }

  // HTML tag stripping
  if (item.stats && /<[^>]+>/.test(item.stats)) {
    unstrippedHtml++;
    console.log(`Unstripped HTML in stats on item ${id}:`, item.stats);
  }
  if (item.lines && item.lines.some(l => /<[^>]+>/.test(l))) {
    unstrippedHtml++;
    console.log(`Unstripped HTML in lines on item ${id}`);
  }

  // Entity decoding check
  if (item.stats && /&(?:nbsp|amp|quot|lt|gt|#039);/.test(item.stats)) {
    brokenEntities++;
    console.log(`Unescaped HTML entity in stats on item ${id}:`, item.stats);
  }

  // Lines check
  if (!item.lines || item.lines.length === 0 || item.lines.some(l => !l || l.trim().length === 0)) {
    emptyLines++;
  }
}

console.log(`Invalid icons: ${invalidIcon}`);
console.log(`Invalid effectiveLevels: ${invalidEffectiveLevel}`);
console.log(`Invalid armors: ${invalidArmor}`);
console.log(`Invalid shield blocks: ${invalidBlock}`);
console.log(`Invalid resistances: ${invalidResistances}`);
console.log(`Unstripped HTML occurrences: ${unstrippedHtml}`);
console.log(`Broken HTML entities: ${brokenEntities}`);
console.log(`Empty/corrupted lines: ${emptyLines}`);
console.log(`NaN/unexpected values: ${nanOrUndefinedValues}`);

console.log('\n=== 3. SHIELD AND OFFHAND STAT DISTRIBUTION ===');
const shieldsList = Object.values(cache).filter(it => it.inventorySlot === 'Shield' || it.subclassName === 'Shield');
console.log(`Total shields: ${shieldsList.length}`);
const blockValues = shieldsList.map(s => s.block);
console.log(`Min block: ${Math.min(...blockValues)}, Max block: ${Math.max(...blockValues)}, Avg block: ${(blockValues.reduce((a,b)=>a+b,0)/blockValues.length).toFixed(1)}`);

const offhandsList = Object.values(cache).filter(it => it.subclassName === 'Miscellaneous' || it.inventorySlot === 'Held In Off-hand');
console.log(`Total offhands: ${offhandsList.length}`);

console.log('\n=== 4. WEAPON STAT DISTRIBUTION ===');
const weaponsList = Object.values(cache).filter(it => it.dps !== null && it.speed !== null);
console.log(`Total items with dps/speed: ${weaponsList.length}`);

console.log('\n=== AUDIT COMPLETE ===');
