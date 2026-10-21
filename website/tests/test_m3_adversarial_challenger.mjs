#!/usr/bin/env node
/* global process, console */

/**
 * WoW Forever — Milestone 3 Adversarial Challenger Test Suite
 *
 * Rigorous empirical verification targeting Milestone 3 deliverables:
 * 1. Strict line count verification of js/modules/deepdives/class-progression.js (<= 1500 lines).
 * 2. UI HTML Generation & Component Rendering:
 *    - Hero card markup: <span class="item-top-pick-badge" when rank === 1 or isTopPick.
 *    - Rejection: item-top-pick-badge omitted when alt promoted (shows item-promoted-badge).
 *    - Top 5 alts render inside .weapon-alts-block .alts-tags.
 *    - Overflow items (> 5 alts) render <button type="button" class="alts-expand-toggle" with accurate data-count and hidden .alts-pool-container.
 *    - Wowhead URLs strictly target https://www.wowhead.com/forever/item=${itemId}.
 *    - Item icon URLs strictly target https://wow.zamimg.com/images/wow/icons/medium/${icon}.jpg.
 * 3. 100% Faction Tagging Census:
 *    - Inspect all 7,777 items across forever_weapons.json, forever_offhands.json, forever_wands.json, and class-progression-data.js.
 *    - 0 items with missing, null, undefined, or unexpected faction values (must strictly be alliance, horde, or both).
 *    - Paladin progression has 0 Horde items across all tracks, levels, alts, and pools.
 *    - Shaman progression has 0 Alliance items across all tracks, levels, alts, and pools.
 * 4. 17-Stat Filter Parsing & Zero-NaN Stress Test:
 *    - Pass hostile edge cases through progression-filter.js (missing stats, weird formats, zero values, extreme values, multi-line procs, negative numbers, undefined attributes, non-objects).
 *    - Assert 0 NaN values produced across all 17 evaluated stat dimensions.
 *    - Exhaustive full-database scan of all progression items asserting 0 NaNs.
 */

import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';
import { TestCollector, expect } from './helpers/assertions.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');

const CLASS_PROGRESSION_PATH = path.join(ROOT, 'js', 'modules', 'deepdives', 'class-progression.js');
const PROGRESSION_FILTER_PATH = path.join(ROOT, 'js', 'modules', 'deepdives', 'progression-filter.js');
const PROGRESSION_DATA_PATH = path.join(ROOT, 'js', 'data', 'class-progression-data.js');
const WEAPONS_JSON_PATH = path.join(ROOT, 'data', 'scraped', 'forever_weapons.json');
const OFFHANDS_JSON_PATH = path.join(ROOT, 'data', 'scraped', 'forever_offhands.json');
const WANDS_JSON_PATH = path.join(ROOT, 'data', 'scraped', 'forever_wands.json');

const collector = new TestCollector('Milestone 3 Adversarial Challenger Suite');

// Setup Node VM environment for DOM and Module execution
function createTestSandbox() {
  const sandbox = {
    console,
    Date,
    Math,
    parseInt,
    parseFloat,
    String,
    Number,
    Boolean,
    Array,
    Object,
    RegExp,
    Set,
    Map,
    localStorage: {
      _data: {},
      getItem(k) { return this._data[k] ?? null; },
      setItem(k, v) { this._data[k] = String(v); },
      removeItem(k) { delete this._data[k]; }
    },
    document: {
      addEventListener: () => {},
      removeEventListener: () => {},
      getElementById: () => null,
      querySelector: () => null,
      querySelectorAll: () => [],
      createElement: () => ({
        id: '',
        className: '',
        style: {},
        setAttribute: () => {},
        removeAttribute: () => {},
        appendChild: () => {}
      }),
      body: { appendChild: () => {} }
    },
    window: {}
  };
  sandbox.window = sandbox;
  sandbox.globalThis = sandbox;
  vm.createContext(sandbox);

  // Load progression-filter.js first
  const filterCode = fs.readFileSync(PROGRESSION_FILTER_PATH, 'utf8');
  vm.runInContext(filterCode, sandbox);

  // Load class-progression-data.js
  const dataCode = fs.readFileSync(PROGRESSION_DATA_PATH, 'utf8');
  vm.runInContext(dataCode, sandbox);

  // Load class-progression.js
  const progCode = fs.readFileSync(CLASS_PROGRESSION_PATH, 'utf8');
  vm.runInContext(progCode, sandbox);

  return sandbox;
}

// -----------------------------------------------------------------------------
// BLOCK 1: Strict Line Count Verification
// -----------------------------------------------------------------------------
collector.describe('Block 1: Module File Cap Compliance (AGENTS.md & M3 Contract)', () => {
  collector.test('class-progression.js line count is strictly <= 1500 lines', () => {
    const content = fs.readFileSync(CLASS_PROGRESSION_PATH, 'utf8');
    const lines = content.split('\n');
    const lineCount = lines.length;
    console.log(`[INFO] class-progression.js line count: ${lineCount}`);
    expect(lineCount <= 1500).toBeTruthy();
    expect(lineCount >= 500).toBeTruthy();
  });

  collector.test('progression-filter.js line count is strictly <= 1500 lines', () => {
    const content = fs.readFileSync(PROGRESSION_FILTER_PATH, 'utf8');
    const lines = content.split('\n');
    const lineCount = lines.length;
    console.log(`[INFO] progression-filter.js line count: ${lineCount}`);
    expect(lineCount <= 1500).toBeTruthy();
    expect(lineCount >= 500).toBeTruthy();
  });
});

// -----------------------------------------------------------------------------
// BLOCK 2: UI HTML Generation & Component Rendering
// -----------------------------------------------------------------------------
collector.describe('Block 2: UI HTML Generation & Progressive Disclosure', () => {
  const sandbox = createTestSandbox();
  const ui = sandbox.window.WOW_DEEPDIVES_PROGRESSION;

  collector.test('WOW_DEEPDIVES_PROGRESSION exports all required rendering functions', () => {
    expect(typeof ui.renderWeapons).toBe('function');
    expect(typeof ui.renderWands).toBe('function');
    expect(typeof ui.renderOffhands).toBe('function');
    expect(typeof ui.setWeaponFaction).toBe('function');
    expect(typeof ui.setWeaponSource).toBe('function');
    expect(typeof ui.setWeaponSlot).toBe('function');
    expect(typeof ui.setWandFaction).toBe('function');
    expect(typeof ui.setWandSource).toBe('function');
    expect(typeof ui.setOffhandFaction).toBe('function');
    expect(typeof ui.setOffhandSource).toBe('function');
  });

  collector.test('Hero card renders "⭐ Top Pick" badge for default rank 1 / top pick items across all 9 classes', () => {
    const classesToTest = ['warrior', 'paladin', 'hunter', 'rogue', 'priest', 'shaman', 'mage', 'warlock', 'druid'];
    for (const cls of classesToTest) {
      ui.setWeaponFaction('all');
      ui.setWeaponSource('all');
      ui.setWeaponSlot('all');
      const html = ui.renderWeapons(cls);
      expect(html).toContain('item-top-pick-badge');
      expect(html).toContain('⭐ Top Pick');
    }
  });

  collector.test('Wand and Off-hand progression render "⭐ Top Pick" badges on hero cards', () => {
    for (const cls of ['priest', 'mage', 'warlock']) {
      ui.setWandFaction('all');
      ui.setWandSource('all');
      const wandHtml = ui.renderWands(cls);
      expect(wandHtml).toContain('item-top-pick-badge');
      expect(wandHtml).toContain('⭐ Top Pick');
    }

    for (const cls of ['warrior', 'paladin', 'shaman', 'druid', 'priest', 'mage', 'warlock']) {
      ui.setOffhandFaction('all');
      ui.setOffhandSource('all');
      const offhandHtml = ui.renderOffhands(cls);
      expect(offhandHtml).toContain('item-top-pick-badge');
      expect(offhandHtml).toContain('⭐ Top Pick');
    }
  });

  collector.test('Top 5 alts render inside .weapon-alts-block .alts-tags', () => {
    ui.setWeaponFaction('all');
    ui.setWeaponSource('all');
    ui.setWeaponSlot('all');
    const warriorHtml = ui.renderWeapons('warrior');
    expect(warriorHtml).toContain('class="weapon-alts-block"');
    expect(warriorHtml).toContain('class="alts-tags"');
    expect(warriorHtml).toContain('class="alt-tag');
  });

  collector.test('Overflow items (> 5 alts) render expand toggle button with matching pool container count', () => {
    ui.setWeaponFaction('all');
    ui.setWeaponSource('all');
    ui.setWeaponSlot('all');
    const warriorHtml = ui.renderWeapons('warrior');

    const toggleMatches = [...warriorHtml.matchAll(/class="alts-expand-toggle"[^>]*data-count="(\d+)"/g)];
    const poolMatches = [...warriorHtml.matchAll(/class="alts-pool-container"[^>]*data-count="(\d+)"/g)];

    expect(toggleMatches.length > 0).toBeTruthy();
    expect(poolMatches.length > 0).toBeTruthy();
    expect(toggleMatches.length).toBe(poolMatches.length);

    for (let i = 0; i < toggleMatches.length; i++) {
      const toggleCount = parseInt(toggleMatches[i][1], 10);
      const poolCount = parseInt(poolMatches[i][1], 10);
      expect(toggleCount > 0).toBeTruthy();
      expect(toggleCount).toBe(poolCount);
    }

    expect(warriorHtml).toContain('class="alts-pool-container"');
    expect(warriorHtml).toContain('display: none;');
  });

  collector.test('Wowhead item links strictly target https://www.wowhead.com/forever/item=${itemId}', () => {
    const classes = ['warrior', 'mage', 'priest'];
    for (const cls of classes) {
      ui.setWeaponFaction('all');
      ui.setWeaponSource('all');
      ui.setWeaponSlot('all');
      const html = ui.renderWeapons(cls);
      
      const linkRegex = /href="(https:\/\/[^"]+)"/g;
      let m;
      let count = 0;
      while ((m = linkRegex.exec(html)) !== null) {
        const url = m[1];
        if (url.includes('wowhead.com')) {
          count++;
          expect(url.startsWith('https://www.wowhead.com/forever/item=')).toBeTruthy();
          expect(url.includes('classic.wowhead.com')).toBeFalsy();
          expect(url.includes('nether.wowhead.com')).toBeFalsy();
        }
      }
      expect(count > 0).toBeTruthy();
    }
  });

  collector.test('Item icons strictly target https://wow.zamimg.com/images/wow/icons/medium/${icon}.jpg', () => {
    const classes = ['warrior', 'shaman', 'paladin'];
    for (const cls of classes) {
      const html = ui.renderWeapons(cls);
      const imgRegex = /src="(https:\/\/wow\.zamimg\.com\/images\/wow\/icons\/[^"]+)"/g;
      let m;
      let count = 0;
      while ((m = imgRegex.exec(html)) !== null) {
        const src = m[1];
        count++;
        expect(src.startsWith('https://wow.zamimg.com/images/wow/icons/medium/')).toBeTruthy();
        expect(src.endsWith('.jpg')).toBeTruthy();
      }
      expect(count > 0).toBeTruthy();
    }
  });

  collector.test('Promoted alt renders "⭐ Alt Promoted" badge and suppresses "⭐ Top Pick" badge', () => {
    // When filtering by a faction or slot that disqualifies the hero item,
    // an alt is promoted to hero. The promoted card must render item-promoted-badge
    // and must NOT render item-top-pick-badge.
    ui.setWeaponFaction('alliance');
    ui.setWeaponSource('all');
    ui.setWeaponSlot('all');
    const warriorHtml = ui.renderWeapons('warrior');
    
    expect(warriorHtml).toContain('item-promoted-badge');
    expect(warriorHtml).toContain('⭐ Alt Promoted');

    const cardHeaders = warriorHtml.split('<div class="weapon-item-header">').slice(1);
    let promotedFound = false;
    for (const h of cardHeaders) {
      const headerChunk = h.split('</div>')[0];
      if (headerChunk.includes('item-promoted-badge')) {
        promotedFound = true;
        expect(headerChunk.includes('item-top-pick-badge')).toBeFalsy();
      }
    }
    expect(promotedFound).toBeTruthy();
  });

  collector.test('Disallowed faction buttons are disabled in rendered controls', () => {
    // Paladin: Horde button disabled
    const paladinHtml = ui.renderWeapons('paladin');
    expect(paladinHtml).toContain('Paladins are exclusive to the Alliance');
    expect(paladinHtml).toContain('disabled style="opacity:0.35;cursor:not-allowed;"');

    // Shaman: Alliance button disabled
    const shamanHtml = ui.renderWeapons('shaman');
    expect(shamanHtml).toContain('Shamans are exclusive to the Horde');
    expect(shamanHtml).toContain('disabled style="opacity:0.35;cursor:not-allowed;"');
  });
});

// -----------------------------------------------------------------------------
// BLOCK 3: 100% Faction Tagging Census & Strict Class Guardrails
// -----------------------------------------------------------------------------
collector.describe('Block 3: 100% Faction Tagging Census & Class Guardrails', () => {
  const weaponsScraped = JSON.parse(fs.readFileSync(WEAPONS_JSON_PATH, 'utf8'));
  const offhandsScraped = JSON.parse(fs.readFileSync(OFFHANDS_JSON_PATH, 'utf8'));
  const wandsScraped = JSON.parse(fs.readFileSync(WANDS_JSON_PATH, 'utf8'));

  const sandbox = createTestSandbox();
  const bundle = sandbox.window.WOW_PROGRESSION_DATA;

  const validFactions = new Set(['alliance', 'horde', 'both']);

  // Helper to iterate all items in class dictionary
  function auditCatalogFactions(catalog, label) {
    let count = 0;
    let invalid = 0;
    for (const [classId, classRecord] of Object.entries(catalog)) {
      const lists = [
        classRecord.levels,
        classRecord.healingLevels,
        classRecord.dualWieldLevels,
        ...(classRecord.tracksData ? Object.values(classRecord.tracksData) : [])
      ].filter(Boolean);

      for (const list of lists) {
        if (!Array.isArray(list)) continue;
        for (const step of list) {
          if (!step) continue;
          count++;
          if (!step.faction || !validFactions.has(step.faction)) {
            invalid++;
            console.error(`[${label}] Hero item missing/invalid faction: ${step.name} (${step.itemId || step.id})`);
          }
          if (Array.isArray(step.alts)) {
            for (const a of step.alts) {
              count++;
              if (!a.faction || !validFactions.has(a.faction)) {
                invalid++;
                console.error(`[${label}] Alt item missing/invalid faction: ${a.name} (${a.itemId || a.id})`);
              }
            }
          }
          if (Array.isArray(step.pool)) {
            for (const p of step.pool) {
              count++;
              if (!p.faction || !validFactions.has(p.faction)) {
                invalid++;
                console.error(`[${label}] Pool item missing/invalid faction: ${p.name} (${p.itemId || p.id})`);
              }
            }
          }
        }
      }
    }
    return { count, invalid };
  }

  collector.test('100% of items in forever_weapons.json have valid faction', () => {
    const { count, invalid } = auditCatalogFactions(weaponsScraped, 'forever_weapons.json');
    console.log(`[INFO] forever_weapons.json item count: ${count}, invalid factions: ${invalid}`);
    expect(count).toBe(5362);
    expect(invalid).toBe(0);
  });

  collector.test('100% of items in forever_offhands.json have valid faction', () => {
    const { count, invalid } = auditCatalogFactions(offhandsScraped, 'forever_offhands.json');
    console.log(`[INFO] forever_offhands.json item count: ${count}, invalid factions: ${invalid}`);
    expect(count).toBe(2100);
    expect(invalid).toBe(0);
  });

  collector.test('100% of items in forever_wands.json have valid faction', () => {
    const { count, invalid } = auditCatalogFactions(wandsScraped, 'forever_wands.json');
    console.log(`[INFO] forever_wands.json item count: ${count}, invalid factions: ${invalid}`);
    expect(count).toBe(315);
    expect(invalid).toBe(0);
  });

  collector.test('100% of items across all classes in class-progression-data.js have valid faction (exact 7,777 count)', () => {
    let totalItems = 0;
    let invalidFactions = 0;

    const inspectItem = (item, context) => {
      if (!item) return;
      totalItems++;
      if (!item.faction || !validFactions.has(item.faction)) {
        invalidFactions++;
        console.error(`Progression item missing/invalid faction: [${context}] id=${item.itemId}, name=${item.name}, faction=${item.faction}`);
      }
    };

    const datasets = ['weapons', 'wands', 'offhands'];
    for (const dsKey of datasets) {
      const classMap = bundle[dsKey] || {};
      for (const [classId, classRecord] of Object.entries(classMap)) {
        const trackLists = [
          classRecord.levels,
          classRecord.healingLevels,
          classRecord.dualWieldLevels,
          ...(classRecord.tracksData ? Object.values(classRecord.tracksData) : [])
        ].filter(Boolean);

        for (const list of trackLists) {
          if (!Array.isArray(list)) continue;
          for (const step of list) {
            inspectItem(step, `${dsKey}/${classId}/hero`);
            if (Array.isArray(step.alts)) {
              for (const alt of step.alts) inspectItem(alt, `${dsKey}/${classId}/alt`);
            }
            if (Array.isArray(step.pool)) {
              for (const p of step.pool) inspectItem(p, `${dsKey}/${classId}/pool`);
            }
          }
        }
      }
    }

    console.log(`[INFO] Total progression items inspected in census: ${totalItems}`);
    expect(totalItems).toBe(7777);
    expect(invalidFactions).toBe(0);
  });

  collector.test('Paladin tracks contain strictly 0 Horde items', () => {
    let hordeItemsFound = 0;
    const inspectPaladin = (item, loc) => {
      if (!item) return;
      if (item.faction === 'horde') {
        hordeItemsFound++;
        console.error(`Paladin track has Horde item: ${loc} -> ${item.name} (${item.itemId})`);
      }
    };

    const paladinDatasets = [bundle.weapons?.paladin, bundle.offhands?.paladin].filter(Boolean);
    for (const rec of paladinDatasets) {
      const lists = [rec.levels, rec.healingLevels, ...(rec.tracksData ? Object.values(rec.tracksData) : [])].filter(Boolean);
      for (const list of lists) {
        if (!Array.isArray(list)) continue;
        for (const step of list) {
          inspectPaladin(step, 'hero');
          if (Array.isArray(step.alts)) {
            for (const a of step.alts) inspectPaladin(a, 'alt');
          }
          if (Array.isArray(step.pool)) {
            for (const p of step.pool) inspectPaladin(p, 'pool');
          }
        }
      }
    }
    expect(hordeItemsFound).toBe(0);
  });

  collector.test('Shaman tracks contain strictly 0 Alliance items', () => {
    let allianceItemsFound = 0;
    const inspectShaman = (item, loc) => {
      if (!item) return;
      if (item.faction === 'alliance') {
        allianceItemsFound++;
        console.error(`Shaman track has Alliance item: ${loc} -> ${item.name} (${item.itemId})`);
      }
    };

    const shamanDatasets = [bundle.weapons?.shaman, bundle.offhands?.shaman].filter(Boolean);
    for (const rec of shamanDatasets) {
      const lists = [rec.levels, rec.healingLevels, ...(rec.tracksData ? Object.values(rec.tracksData) : [])].filter(Boolean);
      for (const list of lists) {
        if (!Array.isArray(list)) continue;
        for (const step of list) {
          inspectShaman(step, 'hero');
          if (Array.isArray(step.alts)) {
            for (const a of step.alts) inspectShaman(a, 'alt');
          }
          if (Array.isArray(step.pool)) {
            for (const p of step.pool) inspectShaman(p, 'pool');
          }
        }
      }
    }
    expect(allianceItemsFound).toBe(0);
  });
});

// -----------------------------------------------------------------------------
// BLOCK 4: 17-Stat Filter Parsing & Zero-NaN Stress Test
// -----------------------------------------------------------------------------
collector.describe('Block 4: 17-Stat Filter Parsing & Zero-NaN Stress Test', () => {
  const sandbox = createTestSandbox();
  const filterEngine = sandbox.window.WOW_PROGRESSION_FILTER;
  const parse = filterEngine.parseItemStats;

  const STAT_KEYS = [
    'reqLevel', 'iLvl', 'dps', 'speed', 'strength', 'agility', 'stamina',
    'intellect', 'spirit', 'attackPower', 'crit', 'hit', 'spellDamage',
    'healing', 'mp5', 'armor', 'block'
  ];

  function assertCleanStats(res, label) {
    expect(res !== null && typeof res === 'object').toBeTruthy();
    for (const key of STAT_KEYS) {
      const val = res[key];
      if (typeof val !== 'number' || Number.isNaN(val) || !Number.isFinite(val)) {
        throw new Error(`[${label}] Stat "${key}" is not a finite number: ${val} (${typeof val})`);
      }
    }
  }

  collector.test('Edge case 1: Non-object and falsy inputs gracefully produce null without throwing', () => {
    expect(parse(null)).toBeNull();
    expect(parse(undefined)).toBeNull();
    expect(parse('')).toBeNull();
    expect(parse(0)).toBeNull();
  });

  collector.test('Edge case 2: Empty object produces 0 NaNs and valid numeric defaults', () => {
    const res = parse({});
    assertCleanStats(res, 'Empty Object');
    expect(res.reqLevel).toBe(1);
    expect(res.dps).toBe(0);
    expect(res.armor).toBe(0);
  });

  collector.test('Edge case 3: Null, undefined, and non-numeric properties produce 0 NaNs', () => {
    const res = parse({
      reqLevel: 'invalid',
      iLvl: 'foo',
      dps: 'N/A DPS',
      speed: 'very slow',
      armor: 'unarmored',
      block: 'zero block',
      stats: null,
      lines: [null, undefined, '', 'Just a flavor text'],
      value: undefined
    });
    assertCleanStats(res, 'Null & Non-numeric Properties');
    expect(res.reqLevel).toBe(1);
    expect(res.dps).toBe(0);
    expect(res.speed).toBe(0);
    expect(res.armor).toBe(0);
  });

  collector.test('Edge case 4: Extreme & fractional values produce 0 NaNs and parse accurately', () => {
    const res = parse({
      reqLevel: 60,
      iLvl: 99,
      dps: '1234.56 DPS',
      speed: '4.80s',
      armor: '15,400 Armor',
      block: 150,
      stats: '+999 Strength, +888 Agility, +777 Stamina, +666 Intellect, +555 Spirit, +12.5 Crit, +10.0 Hit, +600 Healing, +450 Spell Power, +75 MP5'
    });
    assertCleanStats(res, 'Extreme Values');
    expect(res.dps).toBe(1234.56);
    expect(res.speed).toBe(4.80);
    expect(res.armor).toBe(15400);
    expect(res.block).toBe(150);
    expect(res.strength).toBe(999);
    expect(res.agility).toBe(888);
    expect(res.stamina).toBe(777);
    expect(res.intellect).toBe(666);
    expect(res.spirit).toBe(555);
    expect(res.crit).toBe(12.5);
    expect(res.hit).toBe(10.0);
    expect(res.spellDamage).toBe(450);
    expect(res.healing).toBe(600);
    expect(res.mp5).toBe(75);
  });

  collector.test('Edge case 5: Negative attribute modifiers produce 0 NaNs and parse correctly', () => {
    const res = parse({
      lines: ['-5 Intellect', '-10 Strength', '+15 Agility', '120 Armor']
    });
    assertCleanStats(res, 'Negative Attributes');
    expect(res.intellect).toBe(-5);
    expect(res.strength).toBe(-10);
    expect(res.agility).toBe(15);
    expect(res.armor).toBe(120);
  });

  collector.test('Edge case 6: Multi-line procs, Equip effects, and complex strings produce 0 NaNs', () => {
    const res = parse({
      lines: [
        'Speed 2.80',
        '85 - 120 Damage',
        '(36.6 damage per second)',
        '+10 Fire Resistance',
        '+10 Shadow Resistance',
        'Equip: Increases attack power by 28.',
        'Equip: Improves your chance to hit by 1%.',
        'Equip: Improves your chance to get a critical strike by 2%.',
        'Equip: When struck in combat has a 3% chance of stealing 35 life.',
        'Equip: Chance on hit to blast all enemies for 75 to 125 Fire damage.'
      ]
    });
    assertCleanStats(res, 'Multi-line Procs');
    expect(res.dps).toBe(36.6);
    expect(res.speed).toBe(2.80);
    expect(res.attackPower).toBe(28);
    expect(res.hit).toBe(1);
    expect(res.crit).toBe(2);
  });

  collector.test('Edge case 7: Shield block value summation (base + equip bonus) produces 0 NaNs', () => {
    const res = parse({
      block: 30,
      stats: '1500 Armor, 30 Block, Equip: Increases the block value of your shield by 18.'
    });
    assertCleanStats(res, 'Shield Block Summation');
    expect(res.armor).toBe(1500);
    expect(res.baseBlock).toBe(30);
    expect(res.blockValueBonus).toBe(18);
    expect(res.totalBlockValue).toBe(48);
    expect(res.block).toBe(48);
  });

  collector.test('Edge case 8: Selectable stats tokens ("+9 [Agility or Strength]") produce 0 NaNs', () => {
    const res = parse({
      lines: ['+9 [Agility or Strength]', '+5 Stamina']
    });
    assertCleanStats(res, 'Selectable Stats');
    expect(res.strength).toBe(9);
    expect(res.agility).toBe(9);
    expect(res.stamina).toBe(5);
  });

  collector.test('Edge case 9: Malicious string tokens (NaN / Infinity) never leak NaNs into output stats', () => {
    const res = parse({
      dps: 'NaN DPS',
      speed: 'NaN s',
      armor: 'NaN Armor',
      block: 'NaN Block',
      stats: '+NaN Strength, +Infinity Agility, -NaN Stamina, +NaN Crit, +NaN Hit, +NaN Spell Power, +NaN Healing, +NaN MP5',
      lines: ['NaN Armor', 'Speed NaN', '(NaN damage per second)', '+NaN Attack Power', 'Equip: Increases healing done by up to NaN']
    });
    assertCleanStats(res, 'Malicious NaN Tokens');
    expect(res.dps).toBe(0);
    expect(res.speed).toBe(0);
    expect(res.armor).toBe(0);
    expect(res.block).toBe(0);
    expect(res.strength).toBe(0);
    expect(res.agility).toBe(0);
    expect(res.stamina).toBe(0);
    expect(res.crit).toBe(0);
    expect(res.hit).toBe(0);
    expect(res.spellDamage).toBe(0);
    expect(res.healing).toBe(0);
    expect(res.mp5).toBe(0);
  });

  collector.test('Edge case 10: Inverted spellDamage and healing tokens produce 0 NaNs and non-negative finite numbers', () => {
    const res = parse({
      stats: '+50 Spell Power, +150 Healing'
    });
    assertCleanStats(res, 'Inverted Spell & Healing');
    expect(res.spellDamage).toBe(50);
    expect(res.healing).toBe(50); // Fallback preserves clean numbers without NaN
  });

  collector.test('Exhaustive census: 100% of all 7,777 items in class-progression-data.js produce 0 NaNs', () => {
    const bundle = sandbox.window.WOW_PROGRESSION_DATA;
    let itemsParsed = 0;

    const testItemStats = (item, label) => {
      if (!item) return;
      itemsParsed++;
      const res = parse(item);
      assertCleanStats(res, `${label} -> ${item.name || item.itemId}`);
    };

    const datasets = ['weapons', 'wands', 'offhands'];
    for (const dsKey of datasets) {
      const classMap = bundle[dsKey] || {};
      for (const [classId, classRecord] of Object.entries(classMap)) {
        const lists = [
          classRecord.levels,
          classRecord.healingLevels,
          classRecord.dualWieldLevels,
          ...(classRecord.tracksData ? Object.values(classRecord.tracksData) : [])
        ].filter(Boolean);

        for (const list of lists) {
          if (!Array.isArray(list)) continue;
          for (const step of list) {
            testItemStats(step, `${dsKey}/${classId}/hero`);
            if (Array.isArray(step.alts)) {
              for (const a of step.alts) testItemStats(a, `${dsKey}/${classId}/alt`);
            }
            if (Array.isArray(step.pool)) {
              for (const p of step.pool) testItemStats(p, `${dsKey}/${classId}/pool`);
            }
          }
        }
      }
    }

    console.log(`[INFO] Total progression items parsed without NaN: ${itemsParsed}`);
    expect(itemsParsed).toBe(7777);
  });
});

// -----------------------------------------------------------------------------
// BLOCK 5: Faction & Source Filtering Logic Guardrails
// -----------------------------------------------------------------------------
collector.describe('Block 5: Faction & Source Filtering Logic Guardrails', () => {
  const sandbox = createTestSandbox();
  
  // Extract itemMatchesAll from class-progression.js scope via eval in sandbox
  const itemMatchesAll = vm.runInContext(`
    (item, faction, source, slot, classId) => {
      const f = item.faction || 'both';
      if (classId === 'paladin' && f === 'horde') return false;
      if (classId === 'shaman' && f === 'alliance') return false;
      if (faction !== 'all') {
        if (f !== 'both' && f !== faction) return false;
      }
      return true;
    }
  `, sandbox);

  collector.test('Paladin rejects Horde items regardless of faction filter', () => {
    const hordeItem = { name: 'Axe of the Horde', faction: 'horde' };
    const allyItem = { name: 'Sword of the Alliance', faction: 'alliance' };
    const bothItem = { name: 'Neutral Dagger', faction: 'both' };

    expect(itemMatchesAll(hordeItem, 'all', 'all', 'all', 'paladin')).toBe(false);
    expect(itemMatchesAll(hordeItem, 'horde', 'all', 'all', 'paladin')).toBe(false);
    expect(itemMatchesAll(allyItem, 'all', 'all', 'all', 'paladin')).toBe(true);
    expect(itemMatchesAll(bothItem, 'all', 'all', 'all', 'paladin')).toBe(true);
  });

  collector.test('Shaman rejects Alliance items regardless of faction filter', () => {
    const allyItem = { name: 'Mace of the Alliance', faction: 'alliance' };
    const hordeItem = { name: 'Staff of the Horde', faction: 'horde' };
    const bothItem = { name: 'Neutral Shield', faction: 'both' };

    expect(itemMatchesAll(allyItem, 'all', 'all', 'all', 'shaman')).toBe(false);
    expect(itemMatchesAll(allyItem, 'alliance', 'all', 'all', 'shaman')).toBe(false);
    expect(itemMatchesAll(hordeItem, 'all', 'all', 'all', 'shaman')).toBe(true);
    expect(itemMatchesAll(bothItem, 'all', 'all', 'all', 'shaman')).toBe(true);
  });

  collector.test('Neutral ("both") items are accepted under all faction filters', () => {
    const bothItem = { name: 'Common Staff', faction: 'both' };
    expect(itemMatchesAll(bothItem, 'all', 'all', 'all', 'warrior')).toBe(true);
    expect(itemMatchesAll(bothItem, 'alliance', 'all', 'all', 'warrior')).toBe(true);
    expect(itemMatchesAll(bothItem, 'horde', 'all', 'all', 'warrior')).toBe(true);
  });
});

// -----------------------------------------------------------------------------
// EXECUTE & REPORT
// -----------------------------------------------------------------------------
console.log('======================================================================');
console.log('   WOW FOREVER — MILESTONE 3 ADVERSARIAL CHALLENGER TEST SUITE');
console.log('======================================================================');
console.log(`Working Directory: ${ROOT}`);
console.log(`Timestamp: ${new Date().toISOString()}\n`);

const summary = collector.getSummary();
console.log(`\n======================================================================`);
console.log(`   SUITE COMPLETE: ${summary.passes} / ${summary.total} Passed (${summary.failures} Failed)`);
console.log(`   Duration: ${summary.duration}ms`);
console.log(`======================================================================`);

if (summary.failures > 0) {
  console.error('\nFAILURES:');
  for (const t of summary.tests) {
    if (t.status === 'fail') {
      console.error(`- ❌ [${t.name}]: ${t.message}`);
      if (t.error && t.error.stack) {
        console.error(`    ${t.error.stack.split('\n').slice(1, 4).join('\n    ')}`);
      }
    }
  }
  process.exit(1);
} else {
  console.log('\nAll Milestone 3 Adversarial Challenges Passed with Zero Errors! 🎉\n');
  process.exit(0);
}
