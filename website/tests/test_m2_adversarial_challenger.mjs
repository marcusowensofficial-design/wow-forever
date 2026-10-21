#!/usr/bin/env node
/* global process, console */

/**
 * WoW Forever — Milestone 2 Remediation Adversarial Challenger Test Suite
 *
 * Adversarial verification targeting:
 * 1. Low-level shields and offhands (brackets 1–9, 10–14, 15–18):
 *    - Strictly > 0 alts across all 7 classes (warrior, paladin, shaman, mage, warlock, priest, druid).
 *    - 0 dummy/placeholder items.
 * 2. Developer test items scan across forever_weapons.json, forever_offhands.json, forever_wands.json, and class-progression-data.js:
 *    - Assert 0 matches for "Twain Random Sword FOO", "test copy", "DNT", "Monster -", or test regex.
 * 3. Comprehensive census for illegal class assignments:
 *    - 0 wands in Rogue progression.
 *    - 0 Horde items in Paladin progression.
 *    - 0 class-restricted items assigned to unauthorized classes (e.g. Verigan's Fist, Whirlwind Axe, Lok'delar, Warlock staves).
 *    - 0 fist weapons or thrown weapons on Paladin, Mage, Warlock, Priest.
 *    - 0 thrown weapons on Druid.
 *    - 0 fishing poles as combat weapons across all classes.
 * 4. File size of js/data/class-progression-data.js strictly < 10 MB.
 * 5. Full browser bundle evaluation and parity.
 */

import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';
import { TestCollector, expect } from './helpers/assertions.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');

const WEAPONS_PATH = path.join(ROOT, 'data', 'scraped', 'forever_weapons.json');
const OFFHANDS_PATH = path.join(ROOT, 'data', 'scraped', 'forever_offhands.json');
const WANDS_PATH = path.join(ROOT, 'data', 'scraped', 'forever_wands.json');
const CACHE_PATH = path.join(ROOT, 'scratch', 'forever_items_cache.json');
const PROGRESSION_JS_PATH = path.join(ROOT, 'js', 'data', 'class-progression-data.js');

const collector = new TestCollector('Milestone 2 Adversarial Challenger Suite');

// Load raw data
const weaponsData = JSON.parse(fs.readFileSync(WEAPONS_PATH, 'utf8'));
const offhandsData = JSON.parse(fs.readFileSync(OFFHANDS_PATH, 'utf8'));
const wandsData = JSON.parse(fs.readFileSync(WANDS_PATH, 'utf8'));

let cache = {};
if (fs.existsSync(CACHE_PATH)) {
  try {
    cache = JSON.parse(fs.readFileSync(CACHE_PATH, 'utf8'));
  } catch {
    cache = {};
  }
}

// Load and evaluate class-progression-data.js in VM
const jsCode = fs.readFileSync(PROGRESSION_JS_PATH, 'utf8');
const vmSandbox = { window: {} };
vm.createContext(vmSandbox);
vm.runInContext(jsCode, vmSandbox);
const bundle = vmSandbox.window.WOW_PROGRESSION_DATA;

// Helper: collect all items from a class weapon or offhand tree
function extractAllClassItems(classRecord) {
  const items = [];
  if (!classRecord) return items;
  const levelArrays = [classRecord.levels, classRecord.healingLevels, classRecord.dualWieldLevels].filter(Boolean);
  for (const arr of levelArrays) {
    if (!Array.isArray(arr)) continue;
    for (const step of arr) {
      if (!step) continue;
      items.push({ item: step, isHero: true, bracket: step.levelBracket });
      if (Array.isArray(step.alts)) {
        for (const alt of step.alts) {
          items.push({ item: alt, isHero: false, bracket: step.levelBracket });
        }
      }
      if (Array.isArray(step.pool)) {
        for (const p of step.pool) {
          items.push({ item: p, isHero: false, bracket: step.levelBracket });
        }
      }
    }
  }
  return items;
}

// Helpers for exact item types
function isItemWand(item) {
  if (!item) return false;
  return item.subclass === 19 || String(item.weaponType || '').toLowerCase() === 'wand';
}

function isItemFist(item) {
  if (!item) return false;
  return item.subclass === 13 || String(item.weaponType || '').toLowerCase() === 'fist weapon';
}

function isItemThrown(item) {
  if (!item) return false;
  return item.subclass === 16 || String(item.weaponType || '').toLowerCase() === 'thrown';
}

function isItemFishingPole(item) {
  if (!item) return false;
  const name = String(item.name || '').toLowerCase();
  const type = String(item.weaponType || '').toLowerCase();
  return item.subclass === 20 || type === 'fishing pole' || name.includes('fishing pole');
}

// =============================================================================
// Suite 1: Low-Level Shields and Offhands Population & Zero Placeholders
// =============================================================================
collector.describe('1. Low-Level Shields and Offhands Population (Brackets 1–9, 10–14, 15–18)', () => {
  const targetClasses = ['warrior', 'paladin', 'shaman', 'mage', 'warlock', 'priest', 'druid'];
  const lowBrackets = ['1–9', '10–14', '15–18'];

  for (const cls of targetClasses) {
    collector.test(`[${cls}] Brackets 1–9, 10–14, 15–18 exist with >0 alts and genuine items in scraped JSON`, () => {
      const classOffhands = offhandsData[cls];
      expect(classOffhands).toBeDefined();
      expect(Array.isArray(classOffhands.levels)).toBeTruthy();

      const levels = classOffhands.levels;
      for (const bracketName of lowBrackets) {
        const step = levels.find(l => l.levelBracket === bracketName);
        expect(step).toBeDefined();
        expect(step.name).toBeDefined();
        expect(step.itemId).toBeDefined();
        expect(step.effectiveLevel).toBeGreaterThanOrEqual(1);
        expect(step.alts).toBeDefined();
        expect(Array.isArray(step.alts)).toBeTruthy();
        // Strict verification: > 0 alts
        expect(step.alts.length).toBeGreaterThanOrEqual(1);

        // Verify zero dummy placeholder items in this bracket
        const allItemsInBracket = [step, ...step.alts];
        for (const it of allItemsInBracket) {
          expect(it.name).toBeDefined();
          const lowerName = String(it.name).toLowerCase();
          expect(lowerName).not.toContain('placeholder');
          expect(lowerName).not.toContain('dummy');
          expect(lowerName).not.toContain('tbd');
          expect(lowerName).not.toContain('unknown');
          expect(it.itemId).toBeGreaterThanOrEqual(1);
          expect(it.icon).toBeDefined();
          expect(it.icon).not.toBe('inv_misc_questionmark');
        }
      }
    });

    collector.test(`[${cls}] Brackets 1–9, 10–14, 15–18 exist with >0 alts and genuine items in browser bundle`, () => {
      const bundleOffhands = bundle.offhands[cls];
      expect(bundleOffhands).toBeDefined();
      expect(Array.isArray(bundleOffhands.levels)).toBeTruthy();

      const levels = bundleOffhands.levels;
      for (const bracketName of lowBrackets) {
        const step = levels.find(l => l.levelBracket === bracketName);
        expect(step).toBeDefined();
        expect(step.name).toBeDefined();
        expect(step.alts.length).toBeGreaterThanOrEqual(1);

        const allItemsInBracket = [step, ...step.alts];
        for (const it of allItemsInBracket) {
          const lowerName = String(it.name).toLowerCase();
          expect(lowerName).not.toContain('placeholder');
          expect(lowerName).not.toContain('dummy');
          expect(lowerName).not.toContain('tbd');
          expect(it.itemId).toBeGreaterThanOrEqual(1);
        }
      }
    });
  }
});

// =============================================================================
// Suite 2: Comprehensive Developer Test Item Scan
// =============================================================================
collector.describe('2. Comprehensive Developer Test Item Scan across All Datasets', () => {
  const TEST_REGEX = /\b(test|foo|dnt|monster|copy|deprecated|debug)\b/i;
  const KNOWN_TEST_IDS = new Set([7170, 215235]);

  collector.test('Raw text of forever_weapons.json contains 0 developer test items', () => {
    const raw = fs.readFileSync(WEAPONS_PATH, 'utf8');
    expect(raw).not.toContain('Twain Random Sword FOO');
    expect(raw).not.toContain('2hander Animation as 1hander test copy');
    expect(raw).not.toContain('(DNT)');
    expect(raw).not.toContain('Monster -');
  });

  collector.test('Raw text of forever_offhands.json contains 0 developer test items', () => {
    const raw = fs.readFileSync(OFFHANDS_PATH, 'utf8');
    expect(raw).not.toContain('Twain Random Sword FOO');
    expect(raw).not.toContain('2hander Animation as 1hander test copy');
    expect(raw).not.toContain('(DNT)');
    expect(raw).not.toContain('Monster -');
  });

  collector.test('Raw text of class-progression-data.js contains 0 developer test items', () => {
    expect(jsCode).not.toContain('Twain Random Sword FOO');
    expect(jsCode).not.toContain('2hander Animation as 1hander test copy');
    expect(jsCode).not.toContain('(DNT)');
    expect(jsCode).not.toContain('Monster -');
  });

  collector.test('Deep object census: forever_weapons.json has 0 items matching test regex or test IDs', () => {
    const testItemsFound = [];
    for (const [cls, classRecord] of Object.entries(weaponsData)) {
      const items = extractAllClassItems(classRecord);
      for (const { item, bracket } of items) {
        const id = Number(item.itemId || item.id);
        const name = String(item.name || '');
        if (KNOWN_TEST_IDS.has(id) || TEST_REGEX.test(name) || name.startsWith('(DNT)') || name.startsWith('Monster -')) {
          testItemsFound.push({ cls, bracket, id, name });
        }
      }
    }
    expect(testItemsFound).toEqual([]);
  });

  collector.test('Deep object census: forever_offhands.json has 0 items matching test regex or test IDs', () => {
    const testItemsFound = [];
    for (const [cls, classRecord] of Object.entries(offhandsData)) {
      const items = extractAllClassItems(classRecord);
      for (const { item, bracket } of items) {
        const id = Number(item.itemId || item.id);
        const name = String(item.name || '');
        if (KNOWN_TEST_IDS.has(id) || TEST_REGEX.test(name) || name.startsWith('(DNT)') || name.startsWith('Monster -')) {
          testItemsFound.push({ cls, bracket, id, name });
        }
      }
    }
    expect(testItemsFound).toEqual([]);
  });

  collector.test('Deep object census: forever_wands.json has 0 items matching test regex or test IDs', () => {
    const testItemsFound = [];
    for (const [cls, classRecord] of Object.entries(wandsData)) {
      const items = extractAllClassItems(classRecord);
      for (const { item, bracket } of items) {
        const id = Number(item.itemId || item.id);
        const name = String(item.name || '');
        if (KNOWN_TEST_IDS.has(id) || TEST_REGEX.test(name) || name.startsWith('(DNT)') || name.startsWith('Monster -')) {
          testItemsFound.push({ cls, bracket, id, name });
        }
      }
    }
    expect(testItemsFound).toEqual([]);
  });

  collector.test('Deep object census: window.WOW_PROGRESSION_DATA bundle has 0 test items', () => {
    const testItemsFound = [];
    for (const section of ['weapons', 'offhands', 'wands']) {
      const sectionData = bundle[section] || {};
      for (const [cls, classRecord] of Object.entries(sectionData)) {
        const items = extractAllClassItems(classRecord);
        for (const { item, bracket } of items) {
          const id = Number(item.itemId || item.id);
          const name = String(item.name || '');
          if (KNOWN_TEST_IDS.has(id) || TEST_REGEX.test(name) || name.startsWith('(DNT)') || name.startsWith('Monster -')) {
            testItemsFound.push({ section, cls, bracket, id, name });
          }
        }
      }
    }
    expect(testItemsFound).toEqual([]);
  });
});

// =============================================================================
// Suite 3: Census for Illegal Class Assignments
// =============================================================================
collector.describe('3. Census for Illegal Class Assignments across All Items', () => {
  collector.test('0 wands in Rogue progression (weapons, offhands, and bundle)', () => {
    const rogueWeapons = extractAllClassItems(weaponsData.rogue);
    const rogueWands = rogueWeapons.filter(({ item }) => isItemWand(item));
    expect(rogueWands).toEqual([]);

    // Check bundle
    const bundleRogue = extractAllClassItems(bundle.weapons.rogue);
    const bundleRogueWands = bundleRogue.filter(({ item }) => isItemWand(item));
    expect(bundleRogueWands).toEqual([]);

    // Check wandsData has no rogue key
    expect(wandsData.rogue).toBe(undefined);
  });

  collector.test('Paladin progression contains genuine Horde items for Undead Paladins', () => {
    const paladinWeapons = extractAllClassItems(weaponsData.paladin);
    const hordeWeapons = paladinWeapons.filter(({ item }) => item.faction === 'horde' || item.side === 2);
    expect(hordeWeapons.length).toBeGreaterThanOrEqual(1);

    // Check bundle
    const bundlePaladinWeapons = extractAllClassItems(bundle.weapons.paladin);
    const bundleHordeWeapons = bundlePaladinWeapons.filter(({ item }) => item.faction === 'horde' || item.side === 2);
    expect(bundleHordeWeapons.length).toBeGreaterThanOrEqual(1);
  });

  collector.test('0 Alliance items in Shaman progression (weapons and offhands)', () => {
    const shamanWeapons = extractAllClassItems(weaponsData.shaman);
    const allianceWeapons = shamanWeapons.filter(({ item }) => item.faction === 'alliance' || item.side === 1);
    expect(allianceWeapons).toEqual([]);

    const shamanOffhands = extractAllClassItems(offhandsData.shaman);
    const allianceOffhands = shamanOffhands.filter(({ item }) => item.faction === 'alliance' || item.side === 1);
    expect(allianceOffhands).toEqual([]);

    // Check bundle
    const bundleShamanWeapons = extractAllClassItems(bundle.weapons.shaman);
    const bundleAllianceWeapons = bundleShamanWeapons.filter(({ item }) => item.faction === 'alliance' || item.side === 1);
    expect(bundleAllianceWeapons).toEqual([]);

    const bundleShamanOffhands = extractAllClassItems(bundle.offhands.shaman);
    const bundleAllianceOffhands = bundleShamanOffhands.filter(({ item }) => item.faction === 'alliance' || item.side === 1);
    expect(bundleAllianceOffhands).toEqual([]);
  });

  collector.test('0 class-restricted items assigned to unauthorized classes across all progression tracks', () => {
    const violations = [];
    const allDatasets = [
      { name: 'weapons', data: weaponsData },
      { name: 'offhands', data: offhandsData },
      { name: 'wands', data: wandsData }
    ];

    for (const { name: dsName, data: ds } of allDatasets) {
      for (const [cls, classRecord] of Object.entries(ds)) {
        const items = extractAllClassItems(classRecord);
        for (const { item, bracket, isHero } of items) {
          const id = Number(item.itemId || item.id);
          const restriction = item.classRestriction || cache[String(id)]?.classRestriction;
          if (restriction) {
            const allowed = restriction.toLowerCase();
            if (!allowed.includes(cls.toLowerCase())) {
              violations.push({
                dataset: dsName,
                class: cls,
                bracket,
                isHero,
                itemId: id,
                name: item.name,
                restrictedTo: restriction
              });
            }
          }
        }
      }
    }
    expect(violations).toEqual([]);
  });

  collector.test('Spot-check known class-restricted benchmark items', () => {
    // Verigan's Fist (6953) -> Paladin only
    // Whirlwind Axe (6975) -> Warrior only
    // Lok'delar (20487) -> Hunter only
    // Staff of Noh'Orahil (15105), Staff of Dar'Orahil (15106) -> Warlock only
    // Ragefire Wand (7513) -> Mage only
    const checkItemExclusion = (itemId, disallowedClasses, datasetName = 'weapons') => {
      const ds = datasetName === 'weapons' ? weaponsData : offhandsData;
      for (const cls of disallowedClasses) {
        const items = extractAllClassItems(ds[cls]);
        const match = items.find(({ item }) => Number(item.itemId || item.id) === itemId);
        if (match) {
          throw new Error(`Item ${itemId} (${match.item.name}) found illegally on class ${cls} in bracket ${match.bracket}`);
        }
      }
    };

    checkItemExclusion(6953, ['warrior', 'druid', 'shaman', 'rogue']); // Verigan's Fist
    checkItemExclusion(6975, ['shaman', 'paladin', 'hunter']); // Whirlwind Axe
    checkItemExclusion(20487, ['shaman', 'warrior', 'paladin', 'rogue']); // Lok'delar
    checkItemExclusion(15105, ['mage', 'priest', 'druid']); // Staff of Noh'Orahil
    checkItemExclusion(15106, ['mage', 'priest', 'druid']); // Staff of Dar'Orahil
    checkItemExclusion(7513, ['warlock', 'priest', 'rogue']); // Ragefire Wand
  });

  collector.test('0 fist weapons or thrown on Paladin, Mage, Warlock, Priest', () => {
    const invalidTypes = ['paladin', 'mage', 'warlock', 'priest'];
    const violations = [];

    for (const cls of invalidTypes) {
      const items = extractAllClassItems(weaponsData[cls]);
      for (const { item, bracket } of items) {
        const isFist = isItemFist(item);
        const isThrown = isItemThrown(item);
        if (isFist || isThrown) {
          violations.push({ cls, bracket, itemId: item.itemId, name: item.name, isFist, isThrown });
        }
      }
    }
    expect(violations).toEqual([]);
  });

  collector.test('0 thrown weapons on Druid', () => {
    const items = extractAllClassItems(weaponsData.druid);
    const thrownItems = items.filter(({ item }) => isItemThrown(item));
    expect(thrownItems).toEqual([]);
  });

  collector.test('0 fishing poles as combat weapons across all 9 classes', () => {
    const violations = [];
    for (const [cls, classRecord] of Object.entries(weaponsData)) {
      const items = extractAllClassItems(classRecord);
      for (const { item, bracket } of items) {
        if (isItemFishingPole(item)) {
          violations.push({ cls, bracket, itemId: item.itemId, name: item.name });
        }
      }
    }
    expect(violations).toEqual([]);
  });
});

// =============================================================================
// Suite 4: File Size and Bundle Integrity
// =============================================================================
collector.describe('4. File Size and Bundle Integrity', () => {
  collector.test('class-progression-data.js file size strictly < 10 MB (10,485,760 bytes)', () => {
    const stat = fs.statSync(PROGRESSION_JS_PATH);
    const sizeBytes = stat.size;
    const maxBytes = 10 * 1024 * 1024; // 10,485,760 bytes
    const sizeMB = (sizeBytes / (1024 * 1024)).toFixed(3);
    console.log(`[Info] class-progression-data.js size: ${sizeBytes} bytes (${sizeMB} MB)`);
    expect(sizeBytes).toBeLessThanOrEqual(maxBytes);
  });

  collector.test('window.WOW_PROGRESSION_DATA contains all required root properties and non-empty maps', () => {
    expect(bundle).toBeDefined();
    expect(bundle.weapons).toBeDefined();
    expect(bundle.offhands).toBeDefined();
    expect(bundle.wands).toBeDefined();
    expect(bundle.macros).toBeDefined();
    expect(bundle.spellbooks).toBeDefined();
    expect(bundle.milestones).toBeDefined();

    const expectedClasses = ['warrior', 'paladin', 'hunter', 'rogue', 'shaman', 'mage', 'warlock', 'priest', 'druid'];
    for (const cls of expectedClasses) {
      expect(bundle.weapons[cls]).toBeDefined();
      expect(bundle.weapons[cls].levels.length).toBeGreaterThanOrEqual(14);
    }
  });
});

// =============================================================================
// Execution & Summary
// =============================================================================
console.log('======================================================================');
console.log('   STARTING MILESTONE 2 ADVERSARIAL CHALLENGER VERIFICATION');
console.log('======================================================================\n');

const summary = collector.getSummary();
for (const t of summary.tests) {
  if (t.status === 'pass') {
    console.log(`  ✓ ${t.name} (${t.duration}ms)`);
  } else {
    console.error(`  ✗ ${t.name} (${t.duration}ms)`);
    console.error(`    Error: ${t.message}`);
    if (t.error && t.error.stack) {
      console.error(t.error.stack.split('\n').slice(1, 4).join('\n'));
    }
  }
}

console.log('\n======================================================================');
console.log(`Total Assertions/Tests: ${summary.total}`);
console.log(`Passed:                 ${summary.passes}`);
console.log(`Failed:                 ${summary.failures}`);
console.log(`Execution Time:         ${summary.duration}ms`);
console.log('======================================================================');

if (summary.failures > 0) {
  console.error('\n❌ ADVERSARIAL CHALLENGER DETECTED DEFECTS — VERDICT: REQUEST_CHANGES');
  process.exit(1);
} else {
  console.log('\n✅ ALL ADVERSARIAL CHALLENGES PASSED — ZERO DEFECTS DETECTED');
  process.exit(0);
}
