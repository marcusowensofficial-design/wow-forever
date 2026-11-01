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

console.log('=== WAVE 2 FOREVERDB INTEGRATION TESTS ===\n');

// 1. Armor Sets & Set Bonuses
console.log('--- 1. Armor Sets & Item DB Cross-Indexing ---');
{
  const code = fs.readFileSync('js/data/gear-sets-data.js', 'utf8');
  const window = {};
  eval(code);
  assert(Array.isArray(window.WOW_GEAR_SETS), 'WOW_GEAR_SETS is an Array');
  assert(window.WOW_GEAR_SETS.length === 228, `Expected 228 sets, got ${window.WOW_GEAR_SETS.length}`);
  
  const kinds = new Set(window.WOW_GEAR_SETS.map(s => s.kind));
  assert(kinds.has('t1') && kinds.has('t2') && kinds.has('t3') && kinds.has('pvp') && kinds.has('forever'), 'All tier and custom kinds present');
  
  assert(typeof window.WOW_GEAR_SETS_ITEM_MAP === 'object', 'WOW_GEAR_SETS_ITEM_MAP is an object');
  const itemCount = Object.keys(window.WOW_GEAR_SETS_ITEM_MAP).length;
  assert(itemCount === 1272, `Expected 1272 indexed set items, got ${itemCount}`);

  // Test set item lookup
  const piece = window.WOW_GEAR_SETS_ITEM_MAP[16802]; // Arcanist Crown
  assert(piece && piece.setName === 'Arcanist Regalia', 'Item 16802 maps to Arcanist Regalia');
}

// 2. World Rares Radar Expansion
console.log('\n--- 2. World Atlas 354 Rares Radar ---');
{
  const code = fs.readFileSync('js/data/world-rares-data.js', 'utf8');
  const window = {};
  eval(code);
  assert(Array.isArray(window.WOW_WORLD_RARES_DATA), 'WOW_WORLD_RARES_DATA is an Array');
  assert(window.WOW_WORLD_RARES_DATA.length === 354, `Expected 354 rares, got ${window.WOW_WORLD_RARES_DATA.length}`);

  const withCoords = window.WOW_WORLD_RARES_DATA.filter(r => r.coordsCount > 0);
  assert(withCoords.length >= 330, `High coordinate coverage: ${withCoords.length} / 354 rares have coordinates`);

  const tameable = window.WOW_WORLD_RARES_DATA.filter(r => r.isTameable);
  assert(tameable.length > 50, `Tameable rares identified: ${tameable.length} beasts`);

  const lupos = window.WOW_WORLD_RARES_DATA.find(r => r.name === 'Lupos');
  assert(lupos && lupos.isTameable && lupos.spawns.some(s => s.zone === 'Duskwood'), 'Lupos verified with Duskwood / border spawn points as tameable rare');
}

// 3. Travel Network & Flight Nodes
console.log('\n--- 3. Azeroth Flight Network & New Taxi Nodes ---');
{
  const code = fs.readFileSync('js/data/travel-data.js', 'utf8');
  const window = {};
  eval(code);
  assert(typeof window.WOW_TRAVEL_DATA === 'object', 'WOW_TRAVEL_DATA is an object');
  assert(Array.isArray(window.WOW_TRAVEL_DATA.nodes), 'WOW_TRAVEL_DATA.nodes is an Array');
  assert(window.WOW_TRAVEL_DATA.nodes.length >= 79, `Expected 79+ nodes, got ${window.WOW_TRAVEL_DATA.nodes.length}`);

  const newForeverNodes = window.WOW_TRAVEL_DATA.nodes.filter(n => n.isNewInForever);
  assert(newForeverNodes.length === 7, `Expected 7 new Forever flight nodes, got ${newForeverNodes.length}`);
  
  const summit = window.WOW_TRAVEL_DATA.nodes.find(n => n.id === 559);
  assert(summit && summit.name === 'Summit of Eternity' && summit.zone === 'Mount Hyjal', 'Summit of Eternity node verified in Hyjal');

  const totalConnections = window.WOW_TRAVEL_DATA.nodes.reduce((acc, n) => acc + (n.connections?.length || 0), 0);
  assert(totalConnections >= 280, `Flight paths network connected: ${totalConnections} routes`);
}

// 4. BiS Paper-Doll Slot Enhancements
console.log('\n--- 4. BiS Slot Enhancements & Optimal Enchants ---');
{
  const code = fs.readFileSync('js/data/bis-enhancements-data.js', 'utf8');
  const window = {};
  eval(code);
  assert(typeof window.WOW_BIS_ENHANCEMENTS === 'object', 'WOW_BIS_ENHANCEMENTS is an object');
  assert(typeof window.WOW_BIS_ENHANCEMENTS.catalog === 'object', 'Catalog is an object');
  assert(Object.keys(window.WOW_BIS_ENHANCEMENTS.catalog).length >= 150, `Catalog has 150+ enchants (${Object.keys(window.WOW_BIS_ENHANCEMENTS.catalog).length})`);

  const classes = Object.keys(window.WOW_BIS_ENHANCEMENTS.specs);
  assert(classes.length === 9, `All 9 classes covered: got ${classes.length}`);

  const paladinHoly = window.WOW_BIS_ENHANCEMENTS.specs.PALADIN?.Holy;
  assert(paladinHoly && paladinHoly.raid && paladinHoly.lvl, 'Paladin Holy has raid and lvl enhancement profiles');
  assert(paladinHoly.raid.w1h && paladinHoly.raid.w1h.length > 0, 'Paladin Holy has 1H weapon enchants recommended');
}

// 5. Dual-Faction Paladin Guardrails
console.log('\n--- 5. Dual-Faction Paladin Guardrails ---');
{
  const gearCode = fs.readFileSync('js/data/gear-sets-data.js', 'utf8');
  const window = {};
  eval(gearCode);
  const paladinSets = window.WOW_GEAR_SETS.filter(s => s.className === 'Paladin');
  const hordeSets = paladinSets.filter(s => s.faction === 'Horde');
  assert(paladinSets.length > 0, `Paladin sets exist (${paladinSets.length} sets)`);
  
  // Ensure Horde faction is never stripped or disabled for Paladin
  assert(paladinSets.some(s => s.faction === 'Both' || s.faction === 'Horde'), 'Paladin has accessible dual-faction or Horde sets');
}

// 6. DOM & File Limits
console.log('\n--- 6. Module Sizes & Script Registration ---');
{
  const html = fs.readFileSync('index.html', 'utf8');
  assert(html.includes('js/data/gear-sets-data.js?v=1.60.1-70425'), 'gear-sets-data.js registered in index.html');
  assert(html.includes('js/data/world-rares-data.js?v=1.60.1-70425'), 'world-rares-data.js registered in index.html');
  assert(html.includes('js/data/travel-data.js?v=1.60.1-70425'), 'travel-data.js registered in index.html');
  assert(html.includes('js/data/bis-enhancements-data.js?v=1.60.1-70425'), 'bis-enhancements-data.js registered in index.html');
  assert(html.includes('js/modules/codex/codex-sets.js?v=1.60.1-70425'), 'codex-sets.js registered in index.html');
  assert(html.includes('js/modules/atlas-travel.js?v=1.60.1-70425'), 'atlas-travel.js registered in index.html');
  assert(html.includes('js/modules/bis/bis-enhancements.js?v=1.60.1-70425'), 'bis-enhancements.js registered in index.html');
}

console.log(`\n=======================================`);
console.log(`Ran ${passed + failed} assertions. Failures: ${failed}`);
console.log(`=======================================`);

if (failed > 0) {
  process.exit(1);
} else {
  console.log('\n✓ ALL WAVE 2 INTEGRATION TESTS PASSED!');
}
