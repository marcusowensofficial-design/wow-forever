import fs from 'node:fs';
import path from 'node:path';

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`  ✓ ${message}`);
    passed++;
  } else {
    console.error(`  ✗ FAIL: ${message}`);
    failed++;
  }
}

console.log('=== WAVE 3 FOREVERDB INTEGRATION TESTS ===\n');

// 1. Hunter Pets & 520 Beast Radar
console.log('--- 1. Hunter Pets & 520 Beast Radar ---');
{
  const code = fs.readFileSync('js/data/hunter-pets-data.js', 'utf8');
  const window = {};
  eval(code);
  assert(typeof window.WOW_HUNTER_PETS_DATA === 'object', 'WOW_HUNTER_PETS_DATA is an object');
  assert(Array.isArray(window.WOW_HUNTER_PETS_DATA.allBeasts), 'allBeasts is an Array');
  assert(window.WOW_HUNTER_PETS_DATA.allBeasts.length === 520, `Expected 520 beasts, got ${window.WOW_HUNTER_PETS_DATA.allBeasts.length}`);
  
  assert(Array.isArray(window.WOW_HUNTER_PETS_DATA.families), 'families is an Array');
  assert(window.WOW_HUNTER_PETS_DATA.families.length === 18, `Expected 18 families, got ${window.WOW_HUNTER_PETS_DATA.families.length}`);
  
  const brokenTooth = window.WOW_HUNTER_PETS_DATA.allBeasts.find(b => b.name === 'Broken Tooth');
  assert(brokenTooth && brokenTooth.attackSpeed === 1.0, 'Broken Tooth verified with authentic 1.0s attack speed');

  const theRake = window.WOW_HUNTER_PETS_DATA.allBeasts.find(b => b.name === 'The Rake');
  assert(theRake && theRake.attackSpeed === 1.2, 'The Rake verified with authentic 1.2s attack speed');

  const foxFamily = window.WOW_HUNTER_PETS_DATA.families.find(f => f.name === 'Fox' || f.id === 'fox');
  assert(foxFamily && foxFamily.isNew, 'Fox verified as new Classic+ family');
}

// 2. Collections Directory (Mounts, Vanity Pets, Titles)
console.log('\n--- 2. Collections Directory (Mounts, Vanity Pets, Titles) ---');
{
  const code = fs.readFileSync('js/data/collections-data.js', 'utf8');
  const window = {};
  eval(code);
  assert(typeof window.WOW_COLLECTIONS_DATA === 'object', 'WOW_COLLECTIONS_DATA is an object');
  assert(Array.isArray(window.WOW_COLLECTIONS_DATA.mounts), 'mounts is an Array');
  assert(window.WOW_COLLECTIONS_DATA.mounts.length === 141, `Expected 141 mounts, got ${window.WOW_COLLECTIONS_DATA.mounts.length}`);

  assert(Array.isArray(window.WOW_COLLECTIONS_DATA.vanityPets), 'vanityPets is an Array');
  assert(window.WOW_COLLECTIONS_DATA.vanityPets.length === 73, `Expected 73 vanity pets, got ${window.WOW_COLLECTIONS_DATA.vanityPets.length}`);

  assert(Array.isArray(window.WOW_COLLECTIONS_DATA.titles), 'titles is an Array');
  assert(window.WOW_COLLECTIONS_DATA.titles.length === 41, `Expected 41 titles, got ${window.WOW_COLLECTIONS_DATA.titles.length}`);

  // Dual-Faction Paladin safety checks
  const forsakenCharger = window.WOW_COLLECTIONS_DATA.mounts.find(m => m.name === 'Forsaken Charger');
  assert(forsakenCharger && forsakenCharger.faction === 'Horde' && forsakenCharger.classRestriction === 'PALADIN', 'Forsaken Charger is correctly assigned to Horde Paladins');

  const allianceCharger = window.WOW_COLLECTIONS_DATA.mounts.find(m => m.name === 'Charger' && m.spellId === 23214);
  assert(allianceCharger && allianceCharger.faction === 'Alliance' && allianceCharger.classRestriction === 'PALADIN', 'Charger (23214) is correctly assigned to Alliance Paladins');
}

// 3. Special Quests, Riddles & Mysteries
console.log('\n--- 3. Special Quests, Riddles & Mysteries ---');
{
  const code = fs.readFileSync('js/data/special-quests-data.js', 'utf8');
  const window = {};
  eval(code);
  assert(Array.isArray(window.WOW_SPECIAL_QUESTS_DATA), 'WOW_SPECIAL_QUESTS_DATA is an Array');
  assert(window.WOW_SPECIAL_QUESTS_DATA.length === 15, `Expected 15 secret chains, got ${window.WOW_SPECIAL_QUESTS_DATA.length}`);

  const sleepingBag = window.WOW_SPECIAL_QUESTS_DATA.find(c => c.key === 'sleeping-bag');
  assert(sleepingBag && sleepingBag.steps.length === 7, 'Cozy Sleeping Bag chain has 7 detailed steps');

  const keystone = window.WOW_SPECIAL_QUESTS_DATA.find(c => c.key === 'keystone-fragment');
  assert(keystone && keystone.name.includes('Keystone Fragment'), 'Keystone Fragment riddle present');

  const lyn = window.WOW_SPECIAL_QUESTS_DATA.find(c => c.key === 'lyn-the-ignored');
  assert(lyn && lyn.summary.includes('City of Dalaran dungeon'), 'Lyn the Ignored Dalaran secret boss present');
}

// 4. New Classic+ Quests Database
console.log('\n--- 4. 279 New Forever Quests Database ---');
{
  const code = fs.readFileSync('js/data/forever-quests-data.js', 'utf8');
  const window = {};
  eval(code);
  assert(Array.isArray(window.WOW_FOREVER_NEW_QUESTS_DATA), 'WOW_FOREVER_NEW_QUESTS_DATA is an Array');
  assert(window.WOW_FOREVER_NEW_QUESTS_DATA.length === 279, `Expected 279 new quests, got ${window.WOW_FOREVER_NEW_QUESTS_DATA.length}`);

  const bookInv = window.WOW_FOREVER_NEW_QUESTS_DATA.find(q => q.id === 92124);
  assert(bookInv && bookInv.title === 'Book Inventory', 'Quest 92124 (Book Inventory) present');
}

// 5. Battlegrounds & Tactical Radar
console.log('\n--- 5. Battlegrounds & Tactical Radar ---');
{
  const code = fs.readFileSync('js/data/battlegrounds-data.js', 'utf8');
  const window = {};
  eval(code);
  assert(Array.isArray(window.WOW_BATTLEGROUNDS_DATA), 'WOW_BATTLEGROUNDS_DATA is an Array');
  assert(window.WOW_BATTLEGROUNDS_DATA.length === 5, `Expected 5 battlegrounds, got ${window.WOW_BATTLEGROUNDS_DATA.length}`);

  const darkspear = window.WOW_BATTLEGROUNDS_DATA.find(bg => bg.id === 2997);
  assert(darkspear && darkspear.isNewInForever && darkspear.objectives.length === 5, 'Darkspear Islands verified with 5 tactical capture points');
  assert(darkspear.objectives.some(o => o.name === 'Darkspear Flag' && o.coords === '51.1, 52.4'), 'Darkspear Flag coordinates verified');
}

// 6. DOM & HTML Wiring
console.log('\n--- 6. DOM & HTML Script Wiring ---');
{
  const html = fs.readFileSync('index.html', 'utf8');
  assert(html.includes('src="js/data/hunter-pets-data.js'), 'index.html loads hunter-pets-data.js');
  assert(html.includes('src="js/data/collections-data.js'), 'index.html loads collections-data.js');
  assert(html.includes('src="js/data/special-quests-data.js'), 'index.html loads special-quests-data.js');
  assert(html.includes('src="js/data/forever-quests-data.js'), 'index.html loads forever-quests-data.js');
  assert(html.includes('src="js/data/battlegrounds-data.js'), 'index.html loads battlegrounds-data.js');
  assert(html.includes('src="js/modules/codex/codex-collections.js'), 'index.html loads codex-collections.js');
  assert(html.includes('src="js/modules/guides/special-quests.js'), 'index.html loads special-quests.js');
  assert(html.includes('id="special-quests-explorer-mount"'), 'index.html contains special-quests-explorer-mount');
  assert(html.includes('id="atlas-hunter-pets-mount"'), 'index.html contains atlas-hunter-pets-mount');
}

console.log(`\n=======================================`);
console.log(`Wave 3 Tests Summary: ${passed} Passed, ${failed} Failed`);
console.log(`=======================================`);

if (failed > 0) {
  process.exit(1);
} else {
  console.log('ALL WAVE 3 FOREVERDB INTEGRATION TESTS PASSED!\n');
}
