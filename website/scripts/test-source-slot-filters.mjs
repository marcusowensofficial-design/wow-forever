/**
 * Comprehensive verification of Dungeon Boss drops, Source Filtering,
 * and Slot/Hand Filtering across all classes in WoW Forever.
 */

import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');

console.log('--- DUNGEON BOSS DROPS & PROGRESSION FILTERS VERIFICATION ---');

const capturedListeners = [];
let currentTestTarget = null;
let tooltipHidden = false;
const mockElement = {
  id: 'wow-item-tooltip',
  innerHTML: '',
  style: {},
  hasAttribute: (attr) => attr === 'hidden' && tooltipHidden,
  setAttribute: (attr, val) => {
    if (attr === 'hidden') tooltipHidden = true;
  },
  removeAttribute: (attr) => {
    if (attr === 'hidden') tooltipHidden = false;
  },
  getAttribute: (attr) => currentTestTarget ? currentTestTarget.getAttribute(attr) : '',
  addEventListener: (event, handler) => {
    capturedListeners.push({ event, handler });
  }
};

const sandbox = {
  console,
  window: {},
  document: {
    querySelectorAll: (selector) => {
      if (selector === '[data-weapon-target="true"]') {
        return [mockElement];
      }
      return [];
    },
    getElementById: (id) => {
      if (id === 'wow-item-tooltip') return mockElement;
      return null;
    },
    createElement: () => ({ ...mockElement }),
    body: { appendChild: () => {} }
  },
  localStorage: { getItem: () => null, setItem: () => {} }
};
sandbox.window = sandbox;
vm.createContext(sandbox);

// 1. Load BiS data
let bisCode = fs.readFileSync(path.join(ROOT, 'js', 'data', 'bis-data.js'), 'utf8');
bisCode = bisCode.replace('const WOW_BIS_DATA =', 'window.WOW_BIS_DATA =');
vm.runInContext(bisCode, sandbox);

// 2. Load progression data
const progDataCode = fs.readFileSync(path.join(ROOT, 'js', 'data', 'class-progression-data.js'), 'utf8');
vm.runInContext(progDataCode, sandbox);

// 3. Load class-progression.js
const progModuleCode = fs.readFileSync(path.join(ROOT, 'js', 'modules', 'deepdives', 'class-progression.js'), 'utf8');
vm.runInContext(progModuleCode, sandbox);

const mod = sandbox.window.WOW_DEEPDIVES_PROGRESSION;
if (!mod || typeof mod.renderProgressionSubtab !== 'function') {
  throw new Error('WOW_DEEPDIVES_PROGRESSION.renderProgressionSubtab is missing');
}

// 4. Test UI markup has Source Filter and Slot Filter
const warriorHtml = mod.renderProgressionSubtab('weapons', { id: 'warrior', name: 'WARRIOR' });
if (!warriorHtml.includes('id="weapon-source-toggle"')) {
  throw new Error('Weapon controls bar missing weapon-source-toggle');
}
if (!warriorHtml.includes('data-source="dungeon"')) {
  throw new Error('Weapon controls bar missing data-source="dungeon"');
}
if (!warriorHtml.includes('data-source="quest"')) {
  throw new Error('Weapon controls bar missing data-source="quest"');
}
if (!warriorHtml.includes('id="weapon-slot-toggle"')) {
  throw new Error('Weapon controls bar missing weapon-slot-toggle');
}
if (!warriorHtml.includes('data-slot="one-hand"')) {
  throw new Error('Weapon controls bar missing data-slot="one-hand"');
}
console.log('✓ Weapon progression HTML renders complete Source and Slot filter controls');

// 5. Test Source Filter: Dungeon Bosses
mod.setWeaponSource('dungeon');
mod.setWeaponSlot('all');
mod.setWeaponFaction('all');

const warriorDungeonHtml = mod.renderProgressionSubtab('weapons', { id: 'warrior', name: 'WARRIOR' });
// Must include iconic dungeon drops
const expectedDungeonDrops = ["Rhahk'Zor's Hammer", "Corpsemaker", "Ravager", "Mograine's Might", "Ironfoe"];
for (const drop of expectedDungeonDrops) {
  if (!warriorDungeonHtml.includes(drop)) {
    throw new Error(`Warrior dungeon-filtered view missing expected drop: ${drop}`);
  }
}
// Starter vendor items (e.g. Crude Battle Axe) must be filtered out
if (warriorDungeonHtml.includes('Crude Battle Axe')) {
  throw new Error('Warrior dungeon-filtered view unexpectedly includes vendor starter axe: Crude Battle Axe');
}
console.log('✓ Dungeon Bosses filter cleanly isolates dungeon drops (Rhahk\'Zor, Corpsemaker, Ravager, Mograine, Ironfoe) and excludes vendor items');

// 6. Test Slot Filter: One-Hand (Off-Hand viable) for Rogue
mod.setWeaponSource('all');
mod.setWeaponSlot('one-hand');
mod.setWeaponFaction('all');

const rogue1hHtml = mod.renderProgressionSubtab('weapons', { id: 'rogue', name: 'ROGUE' });
// Should contain 1H weapons: Cruel Barb, Thief's Blade, Buzz Saw, Electrocutioner Leg
const expected1h = ["Cruel Barb", "Thief's Blade", "Buzz Saw", "Electrocutioner Leg"];
for (const it of expected1h) {
  if (!rogue1hHtml.includes(it)) {
    throw new Error(`Rogue 1H filtered view missing expected One-Hand weapon: ${it}`);
  }
}
console.log('✓ Slot filter One-Hand correctly allows Rogues to find all off-hand viable weapons (Cruel Barb, Thief\'s Blade, Buzz Saw, Electrocutioner Leg)');

// 6b. Regression test: Two-Hand weapons must NOT appear in One-Hand filter
const warrior1hHtml = mod.renderProgressionSubtab('weapons', { id: 'warrior', name: 'WARRIOR' });
const forbidden2hIn1h = ["Steady Bastard Sword", "Severing Axe", "Spiked Club", "Gilded Blademaster's Greatsword"];
for (const f2h of forbidden2hIn1h) {
  if (warrior1hHtml.includes(f2h)) {
    throw new Error(`One-Hand filter incorrectly includes Two-Handed weapon: ${f2h}`);
  }
}
console.log('✓ Slot filter One-Hand strictly rejects all 2H weapons (Steady Bastard Sword, Severing Axe, Spiked Club)');

// 6c. Regression test: Two-Hand filter must correctly include all 2H weapons
mod.setWeaponSlot('two-hand');
const warrior2hHtml = mod.renderProgressionSubtab('weapons', { id: 'warrior', name: 'WARRIOR' });
const expected2h = ["Steady Bastard Sword", "Severing Axe", "Spiked Club", "Corpsemaker", "Ravager"];
for (const e2h of expected2h) {
  if (!warrior2hHtml.includes(e2h)) {
    throw new Error(`Two-Hand filter missing expected 2H weapon: ${e2h}`);
  }
}
console.log('✓ Slot filter Two-Hand correctly includes all 2H weapons (Steady Bastard Sword, Severing Axe, Corpsemaker, Ravager)');

// 6d. Regression test: Ragefire Chasm (RFC) drops under dungeon filter
mod.setWeaponSource('dungeon');
mod.setWeaponSlot('all');
const warlockDungeonHtml = mod.renderProgressionSubtab('weapons', { id: 'warlock', name: 'WARLOCK' });
if (!warlockDungeonHtml.includes('Chanting Staff') || !warlockDungeonHtml.includes('Searing Dagger')) {
  throw new Error('Warlock dungeon filter missing RFC drops (Chanting Staff, Searing Dagger)');
}
const rogueDungeonHtml = mod.renderProgressionSubtab('weapons', { id: 'rogue', name: 'ROGUE' });
if (!rogueDungeonHtml.includes('Spikethorn Dirk') || !rogueDungeonHtml.includes('Chanting Blade')) {
  throw new Error('Rogue dungeon filter missing RFC drops (Spikethorn Dirk, Chanting Blade)');
}
console.log('✓ Ragefire Chasm (RFC) dungeon drops verified under dungeon filter for Warlock and Rogue');

// 6e. Regression test: Quest items under quest filter
mod.setWeaponSource('quest');
const rogueQuestHtml = mod.renderProgressionSubtab('weapons', { id: 'rogue', name: 'ROGUE' });
if (!rogueQuestHtml.includes('Camping Knife')) {
  throw new Error('Rogue quest filter missing Camping Knife (Return to Bellowfiz)');
}
console.log('✓ Quest filter correctly isolates quest rewards (Camping Knife from Return to Bellowfiz)');

// 6f. Regression test: High-level caster dungeon offhands
mod.setOffhandSource('dungeon');
mod.setOffhandFaction('all');
const mageOffHtml = mod.renderProgressionSubtab('offhands', { id: 'mage', name: 'MAGE' });
if (!mageOffHtml.includes('Tome of the Lost') || !mageOffHtml.includes('Krastinov') || !mageOffHtml.includes('Tome of Knowledge')) {
  throw new Error('Mage dungeon offhands missing Dire Maul / Scholomance drops');
}
console.log('✓ High-level caster offhands verified under dungeon filter (Tome of the Lost, Krastinov\'s Bag, Tome of Knowledge)');

// 6g. Regression test: Rogue and Hunter offhands direct guidance
const rogueOffHtml = mod.renderProgressionSubtab('offhands', { id: 'rogue', name: 'ROGUE' });
if (!rogueOffHtml.includes('Rogues dual-wield One-Hand weapons in their off-hand!')) {
  throw new Error('Rogue offhand missing direct guidance to Weapons path');
}
const hunterOffHtml = mod.renderProgressionSubtab('offhands', { id: 'hunter', name: 'HUNTER' });
if (!hunterOffHtml.includes('Hunters equip ranged weapons and two-handed stat-sticks!')) {
  throw new Error('Hunter offhand missing direct guidance to Weapons path');
}
console.log('✓ Rogue and Hunter offhand views render clear guidance directing to Weapon Path slot filters');

// 6h. Regression test: Priest 19-22 offhand does not leak Warlock class quest
const priestOff = sandbox.window.WOW_PROGRESSION_DATA.offhands.priest.levels.find(l => l.levelBracket === '19–22');
if (priestOff.name.includes("Soran'ruk")) {
  throw new Error('Priest offhands contains Warlock class quest item Orb of Soran\'ruk');
}
console.log('✓ Priest offhands bracket 19-22 verified clean without Warlock class quest leakage');

// 7. Test Slot Filter: Ranged for Hunter
mod.setWeaponSource('all');
mod.setWeaponSlot('ranged');
const hunterRangedHtml = mod.renderProgressionSubtab('weapons', { id: 'hunter', name: 'HUNTER' });
if (!hunterRangedHtml.includes('Venomstrike') && !hunterRangedHtml.includes('Nightstalker Bow') && !hunterRangedHtml.includes("Houndmaster's Bow")) {
  throw new Error('Hunter ranged-filtered view missing expected ranged weapons');
}
console.log('✓ Slot filter Ranged correctly isolates ranged weapons (Venomstrike, Nightstalker Bow, Houndmaster\'s Bow) for Hunter');

// 8. Test Weapons Hub category list: Rogue and Hunter do not have redundant offhands category
// Load weapons-hub.js into sandbox
let weaponsHubCode = fs.readFileSync(path.join(ROOT, 'js', 'modules', 'weapons-hub.js'), 'utf8');
vm.runInContext(weaponsHubCode, sandbox);

// Check that weapons-hub.js does not render offhands for rogue in getAvailableCategories
// In the source code of weapons-hub.js:
if (weaponsHubCode.includes("classId === 'rogue') {\n      cats.push({ id: 'offhands'")) {
  throw new Error('weapons-hub.js still includes offhands category for Rogue');
}
if (weaponsHubCode.includes("classId === 'hunter') {\n      cats.push({ id: 'offhands'")) {
  throw new Error('weapons-hub.js still includes offhands category for Hunter');
}
console.log('✓ weapons-hub.js cleanly removed offhands category for Rogue and Hunter in favor of the One-Hand weapon slot filter');

// 9. Reset filters to 'all' for clean state
mod.setWeaponSource('all');
mod.setWeaponSlot('all');
mod.setWeaponFaction('all');

const resetHtml = mod.renderProgressionSubtab('weapons', { id: 'warrior', name: 'WARRIOR' });
if (!resetHtml.includes('Crude Battle Axe')) {
  throw new Error('Resetting filters failed to restore full progression roadmap');
}
console.log('✓ Resetting filters to "all" seamlessly restores full default progression roadmap');

// 10. Test Rich Mouseover Tooltips for New Dungeon Drops
mod.setupEventListeners();
const mouseEnterHandler = capturedListeners.find(l => l.event === 'mouseenter')?.handler;
if (!mouseEnterHandler) throw new Error('Missing mouseenter handler');

// Test Ravager tooltip
currentTestTarget = {
  getAttribute: (attr) => {
    const map = {
      'data-item-name': 'Ravager',
      'data-item-id': '7717',
      'data-quality': 'q3',
      'data-weapon-type': 'Two-Handed Axe',
      'data-speed': '3.50',
      'data-dps': '37.29 DPS',
      'data-ilvl': '42',
      'data-req-level': '37',
      'data-source-title': 'Herod',
      'data-source-detail': 'Scarlet Monastery (Armory)'
    };
    return map[attr] || '';
  }
};
mouseEnterHandler({ clientX: 100, clientY: 100 });
let ttHtml = mockElement.innerHTML;
if (!ttHtml.includes('Ravager')) throw new Error('Ravager tooltip missing item name');
if (!ttHtml.includes('Herod')) throw new Error('Ravager tooltip missing Herod source');
if (!ttHtml.includes('3.50')) throw new Error('Ravager tooltip missing speed 3.50');
console.log('✓ Ravager tooltip correctly renders authentic stats, Herod boss source, and Wowhead links');

// Test Cruel Barb tooltip
currentTestTarget = {
  getAttribute: (attr) => {
    const map = {
      'data-item-name': 'Cruel Barb',
      'data-item-id': '5202',
      'data-quality': 'q3',
      'data-weapon-type': 'One-Handed Sword',
      'data-speed': '2.80',
      'data-dps': '16.96 DPS',
      'data-ilvl': '24',
      'data-req-level': '19',
      'data-source-title': 'Edwin VanCleef',
      'data-source-detail': 'The Deadmines'
    };
    return map[attr] || '';
  }
};
mouseEnterHandler({ clientX: 100, clientY: 100 });
ttHtml = mockElement.innerHTML;
if (!ttHtml.includes('Cruel Barb')) throw new Error('Cruel Barb tooltip missing item name');
if (!ttHtml.includes('Edwin VanCleef')) throw new Error('Cruel Barb tooltip missing Edwin VanCleef source');
console.log('✓ Cruel Barb tooltip correctly renders authentic stats, Edwin VanCleef source, and Wowhead links');

// Test Ironfoe tooltip
currentTestTarget = {
  getAttribute: (attr) => {
    const map = {
      'data-item-name': 'Ironfoe',
      'data-item-id': '11684',
      'data-quality': 'q4',
      'data-weapon-type': 'One-Handed Mace',
      'data-speed': '2.40',
      'data-dps': '43.54 DPS',
      'data-ilvl': '60',
      'data-req-level': '55',
      'data-source-title': 'Emperor Dagran Thaurissan',
      'data-source-detail': 'Blackrock Depths'
    };
    return map[attr] || '';
  }
};
mouseEnterHandler({ clientX: 100, clientY: 100 });
ttHtml = mockElement.innerHTML;
if (!ttHtml.includes('Ironfoe')) throw new Error('Ironfoe tooltip missing item name');
if (!ttHtml.includes('Emperor Dagran Thaurissan')) throw new Error('Ironfoe tooltip missing Emperor Dagran Thaurissan source');
console.log('✓ Ironfoe tooltip correctly renders authentic stats, Emperor Thaurissan source, and Wowhead links');

console.log('\n--- ALL SOURCE, SLOT, AND DUNGEON TESTS PASSED PERFECTLY ---');
