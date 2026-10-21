#!/usr/bin/env node
/* global process, console */

/**
 * Progression Stat Parser & Multi-Criteria Matcher Adversarial Stress Harness
 * Challenger 1 — Empirical Verification Suite
 *
 * Verifies:
 * 1. Extreme weapon swing speeds (1.00s, 1.20s, 3.80s, 4.00s, high-precision decimals) with >= and <=.
 * 2. Extreme & zero DPS values, non-weapon items (shields/offhand tomes).
 * 3. Core attributes: negative stats (-1 Int, -5 Sta), zero stats (+0 Agi), selectable tokens (+9 [Agility or Strength]), abbreviation tokens.
 * 4. Attack Power: base AP, ranged AP, feral AP, effective AP formula, rejection of debuff procs.
 * 5. Spell damage & healing: dual caster lines, school spell damage, Trogg Scepter pure healing, asymmetric lines, MP5 vs HP5.
 * 6. Defensive stats: comma-formatted armor (1,380 Armor), proc armor rejection, shield block value summation (base + bonus), block chance % rejection.
 * 7. Full database census across all 9 classes and BiS datasets: zero exceptions, zero NaNs, 100% mathematical validity.
 */

import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';
import { TestCollector, expect } from './helpers/assertions.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');

function loadEnvironment(root) {
  const context = {
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
    escapeHtml: s => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'),
    document: {
      addEventListener: () => {},
      removeEventListener: () => {},
      getElementById: () => null,
      querySelector: () => null,
      querySelectorAll: () => []
    }
  };
  context.window = context;
  vm.createContext(context);

  // 1. Progression Data
  const progPath = path.join(root, 'js', 'data', 'class-progression-data.js');
  if (fs.existsSync(progPath)) {
    const code = fs.readFileSync(progPath, 'utf8');
    vm.runInContext(code, context);
  }

  // 2. BiS Data
  const bisPath = path.join(root, 'js', 'data', 'bis-data.js');
  if (fs.existsSync(bisPath)) {
    const code = fs.readFileSync(bisPath, 'utf8');
    vm.runInContext(code, context);
  }

  // 3. Progression Filter Module
  const filterModulePath = path.join(root, 'js', 'modules', 'deepdives', 'progression-filter.js');
  if (!fs.existsSync(filterModulePath)) {
    throw new Error(`Filter module not found at: ${filterModulePath}`);
  }
  const filterCode = fs.readFileSync(filterModulePath, 'utf8');
  vm.runInContext(filterCode, context);

  return {
    context,
    filter: context.window.WOW_PROGRESSION_FILTER,
    progressionData: context.window.WOW_PROGRESSION_DATA || {},
    bisData: context.window.WOW_BIS_DATA || {}
  };
}

console.log('======================================================================');
console.log('   CHALLENGER 1: ADVERSARIAL STRESS TEST HARNESS (STAT PARSER & MATCHER)');
console.log('======================================================================');
console.log(`Working Directory: ${ROOT}`);
console.log(`Timestamp: ${new Date().toISOString()}\n`);

const env = loadEnvironment(ROOT);
const { filter, progressionData, bisData } = env;

if (!filter) {
  console.error('FATAL: WOW_PROGRESSION_FILTER not initialized on window!');
  process.exit(1);
}

const collector = new TestCollector('Challenger 1 Adversarial Suite');

// ============================================================================
// SUITE A: EXTREME WEAPON SWING SPEEDS
// ============================================================================
collector.describe('Suite A: Extreme Weapon Swing Speeds', () => {
  const speeds = [1.00, 1.20, 1.30, 1.80, 2.00, 2.60, 3.40, 3.80, 4.00, 1.234, 2.655, 3.789];

  speeds.forEach(speed => {
    collector.test(`A.1 Parse speed ${speed}s correctly from direct prop, string and tooltip`, () => {
      const itemDirect = { speed };
      const parsedDirect = filter.parseItemStats(itemDirect);
      expect(parsedDirect.speed).toBe(speed);

      const itemStr = { speed: `${speed}s` };
      const parsedStr = filter.parseItemStats(itemStr);
      expect(parsedStr.speed).toBe(speed);

      const itemLines = { lines: [`Speed ${speed}`] };
      const parsedLines = filter.parseItemStats(itemLines);
      expect(parsedLines.speed).toBe(speed);
    });
  });

  collector.test('A.2 Speed operator >= boundary enforcement (1.20s benchmark)', () => {
    const item119 = { speed: 1.19 };
    const item120 = { speed: 1.20 };
    const item121 = { speed: 1.21 };

    expect(filter.itemMatchesFilter(item119, { speedOp: '>=', speedVal: 1.20 })).toBe(false);
    expect(filter.itemMatchesFilter(item120, { speedOp: '>=', speedVal: 1.20 })).toBe(true);
    expect(filter.itemMatchesFilter(item121, { speedOp: '>=', speedVal: 1.20 })).toBe(true);
  });

  collector.test('A.3 Speed operator <= boundary enforcement (1.80s fast benchmark)', () => {
    const item179 = { speed: 1.79 };
    const item180 = { speed: 1.80 };
    const item181 = { speed: 1.81 };

    expect(filter.itemMatchesFilter(item179, { speedOp: '<=', speedVal: 1.80 })).toBe(true);
    expect(filter.itemMatchesFilter(item180, { speedOp: '<=', speedVal: 1.80 })).toBe(true);
    expect(filter.itemMatchesFilter(item181, { speedOp: '<=', speedVal: 1.80 })).toBe(false);
  });

  collector.test('A.4 Speed operator >= boundary enforcement (3.80s / 4.00s slow benchmark)', () => {
    const item379 = { speed: 3.79 };
    const item380 = { speed: 3.80 };
    const item400 = { speed: 4.00 };

    expect(filter.itemMatchesFilter(item379, { speedOp: '>=', speedVal: 3.80 })).toBe(false);
    expect(filter.itemMatchesFilter(item380, { speedOp: '>=', speedVal: 3.80 })).toBe(true);
    expect(filter.itemMatchesFilter(item400, { speedOp: '>=', speedVal: 3.80 })).toBe(true);
  });

  collector.test('A.5 Speed operator <= boundary enforcement (3.80s / 4.00s slow benchmark)', () => {
    const item380 = { speed: 3.80 };
    const item381 = { speed: 3.81 };
    const item400 = { speed: 4.00 };

    expect(filter.itemMatchesFilter(item380, { speedOp: '<=', speedVal: 3.80 })).toBe(true);
    expect(filter.itemMatchesFilter(item381, { speedOp: '<=', speedVal: 3.80 })).toBe(false);
    expect(filter.itemMatchesFilter(item400, { speedOp: '<=', speedVal: 3.80 })).toBe(false);
  });

  collector.test('A.6 Fractional decimal speed evaluation (2.65s)', () => {
    const item = { speed: 2.65 };
    expect(filter.itemMatchesFilter(item, { speedOp: '>=', speedVal: 2.65 })).toBe(true);
    expect(filter.itemMatchesFilter(item, { speedOp: '<=', speedVal: 2.65 })).toBe(true);
    expect(filter.itemMatchesFilter(item, { speedOp: '>=', speedVal: 2.651 })).toBe(false);
    expect(filter.itemMatchesFilter(item, { speedOp: '<=', speedVal: 2.649 })).toBe(false);
  });

  collector.test('A.7 Non-weapon items (0 speed / missing speed) never match active speed filters', () => {
    const shield = { name: 'Shield of the Golden Dawn', block: 20, armor: 800 };
    const tome = { name: 'Tome of Arcane Wisdom', intellect: 10 };
    const zeroSpeedWeapon = { name: 'Bugged Weapon', speed: 0 };

    // When speedVal > 0, neither >= nor <= matches non-speed items
    expect(filter.itemMatchesFilter(shield, { speedOp: '>=', speedVal: 1.20 })).toBe(false);
    expect(filter.itemMatchesFilter(shield, { speedOp: '<=', speedVal: 3.80 })).toBe(false);
    expect(filter.itemMatchesFilter(tome, { speedOp: '>=', speedVal: 1.20 })).toBe(false);
    expect(filter.itemMatchesFilter(tome, { speedOp: '<=', speedVal: 3.80 })).toBe(false);
    expect(filter.itemMatchesFilter(zeroSpeedWeapon, { speedOp: '>=', speedVal: 1.00 })).toBe(false);
    expect(filter.itemMatchesFilter(zeroSpeedWeapon, { speedOp: '<=', speedVal: 4.00 })).toBe(false);

    // When speedVal is null / unconstrained, they are not rejected by speed
    expect(filter.itemMatchesFilter(shield, { speedVal: null })).toBe(true);
    expect(filter.itemMatchesFilter(tome, { speedVal: null })).toBe(true);
  });
});

// ============================================================================
// SUITE B: EXTREME & ZERO DPS VALUES, NON-WEAPON ITEMS
// ============================================================================
collector.describe('Suite B: Extreme & Zero DPS Values, Non-Weapon Items', () => {
  collector.test('B.1 Non-weapon items have dps = 0 and pass unconstrained filters', () => {
    const shield = { name: 'Crest of Darkshire', armor: 320, block: 12 };
    const parsed = filter.parseItemStats(shield);
    expect(parsed.dps).toBe(0);
    expect(filter.itemMatchesFilter(shield, { minDps: null })).toBe(true);
    expect(filter.itemMatchesFilter(shield, { minDps: 0 })).toBe(true);
  });

  collector.test('B.2 Non-weapon items with dps = 0 fail minDps filters when minDps > 0', () => {
    const shield = { name: 'Crest of Darkshire', armor: 320, block: 12 };
    expect(filter.itemMatchesFilter(shield, { minDps: 1 })).toBe(false);
    expect(filter.itemMatchesFilter(shield, { minDps: 15.5 })).toBe(false);
  });

  collector.test('B.3 Extreme DPS parsing: zero DPS, low DPS, extreme high DPS', () => {
    const itemZero = { dps: 0 };
    expect(filter.parseItemStats(itemZero).dps).toBe(0);

    const itemLow = { dps: 0.15 };
    expect(filter.parseItemStats(itemLow).dps).toBe(0.15);

    const itemHigh = { dps: 105.8 };
    expect(filter.parseItemStats(itemHigh).dps).toBe(105.8);

    const itemGod = { dps: 999.99 };
    expect(filter.parseItemStats(itemGod).dps).toBe(999.99);
  });

  collector.test('B.4 DPS parsing from lines "(XX.XX damage per second)"', () => {
    const item = { lines: ['(24.58 damage per second)'] };
    expect(filter.parseItemStats(item).dps).toBe(24.58);
  });

  collector.test('B.5 DPS parsing from alt value string "20.37 DPS, 2.70s"', () => {
    const item = { value: '20.37 DPS, 2.70s - Rare World Drop' };
    const parsed = filter.parseItemStats(item);
    expect(parsed.dps).toBe(20.37);
    expect(parsed.speed).toBe(2.70);
  });

  collector.test('B.6 Floating point boundary checks on minDps', () => {
    const item = { dps: 20.37 };
    expect(filter.itemMatchesFilter(item, { minDps: 20.37 })).toBe(true);
    expect(filter.itemMatchesFilter(item, { minDps: 20.3700001 })).toBe(false);
    expect(filter.itemMatchesFilter(item, { minDps: 20.3699999 })).toBe(true);
  });
});

// ============================================================================
// SUITE C: CORE ATTRIBUTES EDGE CASES
// ============================================================================
collector.describe('Suite C: Core Attributes Edge Cases', () => {
  collector.test('C.1 Negative stats parsing (-1 Int, -5 Sta) does not throw or produce NaN', () => {
    const itemLines = {
      lines: ['Cursed Skull', '-1 Intellect', '-5 Stamina', '+10 Strength']
    };
    const parsed = filter.parseItemStats(itemLines);
    expect(parsed.intellect).toBe(-1);
    expect(parsed.stamina).toBe(-5);
    expect(parsed.strength).toBe(10);
    expect(isNaN(parsed.intellect)).toBe(false);
    expect(isNaN(parsed.stamina)).toBe(false);

    // Negative stats fail positive thresholds
    expect(filter.itemMatchesFilter(itemLines, { minInt: 1 })).toBe(false);
    expect(filter.itemMatchesFilter(itemLines, { minSta: 1 })).toBe(false);
    // But satisfy strength
    expect(filter.itemMatchesFilter(itemLines, { minStr: 10 })).toBe(true);
  });

  collector.test('C.2 Zero stats (+0 Agi) parse cleanly to 0 without NaN', () => {
    const item = { lines: ['Testing Trinket', '+0 Agility'] };
    const parsed = filter.parseItemStats(item);
    expect(parsed.agility).toBe(0);
    expect(isNaN(parsed.agility)).toBe(false);
    expect(filter.itemMatchesFilter(item, { minAgi: 1 })).toBe(false);
  });

  collector.test('C.3 Selectable tokens (+9 [Agility or Strength]) assigns max to both attributes in lines', () => {
    const item = {
      name: 'Blackblade of Shahram',
      lines: ['+9 [Agility or Strength]', '+17 Stamina']
    };
    const parsed = filter.parseItemStats(item);
    expect(parsed.strength).toBe(9);
    expect(parsed.agility).toBe(9);
    expect(parsed.stamina).toBe(17);

    // Meets either minStr or minAgi up to 9
    expect(filter.itemMatchesFilter(item, { minStr: 9 })).toBe(true);
    expect(filter.itemMatchesFilter(item, { minAgi: 9 })).toBe(true);
    expect(filter.itemMatchesFilter(item, { minStr: 10 })).toBe(false);
    expect(filter.itemMatchesFilter(item, { minAgi: 10 })).toBe(false);
  });

  collector.test('C.4 Selectable tokens with lines (+3 [Agility or Strength]) parses accurately', () => {
    const itemWithLines = {
      stats: '+3 [Agility or Strength], Equip: Wounds the target for 37 damage.',
      lines: ['+3 [Agility or Strength]', 'Equip: Wounds the target for 37 damage.']
    };
    const parsed = filter.parseItemStats(itemWithLines);
    expect(parsed.strength).toBe(3);
    expect(parsed.agility).toBe(3);
  });

  collector.test('C.5 Abbreviation tokens (+16 Str, +17 Sta) across lines and stats', () => {
    const item = {
      stats: '+16 Str, +17 Sta, +8 Int, +5 Spi, +12 Agi'
    };
    const parsed = filter.parseItemStats(item);
    expect(parsed.strength).toBe(16);
    expect(parsed.stamina).toBe(17);
    expect(parsed.intellect).toBe(8);
    expect(parsed.spirit).toBe(5);
    expect(parsed.agility).toBe(12);

    expect(filter.itemMatchesFilter(item, { minStr: 16, minSta: 17, minInt: 8, minSpi: 5, minAgi: 12 })).toBe(true);
    expect(filter.itemMatchesFilter(item, { minStr: 17 })).toBe(false);
  });

  collector.test('C.6 Multi-stat token on a single line (+16 Str, +17 Sta)', () => {
    const item = {
      lines: ['+16 Str, +17 Sta']
    };
    const parsed = filter.parseItemStats(item);
    expect(parsed.strength).toBe(16);
    expect(parsed.stamina).toBe(17);
  });
});

// ============================================================================
// SUITE D: ATTACK POWER DIMENSION PROBES
// ============================================================================
collector.describe('Suite D: Attack Power Dimension Probes', () => {
  collector.test('D.1 Base Attack Power parsing', () => {
    const item1 = { lines: ['+28 Attack Power'] };
    expect(filter.parseItemStats(item1).attackPower).toBe(28);

    const item2 = { lines: ['Equip: +30 Attack Power.'] };
    expect(filter.parseItemStats(item2).attackPower).toBe(30);

    const item3 = { lines: ['Equip: Increases attack power by 25.'] };
    expect(filter.parseItemStats(item3).attackPower).toBe(25);
  });

  collector.test('D.2 Ranged Attack Power parsing and formula integration', () => {
    const bow = { lines: ['+14 Ranged Attack Power'] };
    const parsed = filter.parseItemStats(bow);
    expect(parsed.rangedAttackPower).toBe(14);
    expect(parsed.attackPower).toBe(14);
    expect(filter.itemMatchesFilter(bow, { minAp: 14 })).toBe(true);
    expect(filter.itemMatchesFilter(bow, { minAp: 15 })).toBe(false);
  });

  collector.test('D.3 Feral Attack Power parsing and formula integration', () => {
    const staff = {
      lines: ['Equip: Increases attack power by 150 in Cat, Bear, Dire Bear, and Moonkin forms only.']
    };
    const parsed = filter.parseItemStats(staff);
    expect(parsed.feralAttackPower).toBe(150);
    expect(parsed.attackPower).toBe(150);
    expect(filter.itemMatchesFilter(staff, { minAp: 150 })).toBe(true);
  });

  collector.test('D.4 Composite AP: general AP + max(feral, ranged)', () => {
    const hybridWeapon = {
      lines: [
        '+20 Attack Power',
        '+15 Ranged Attack Power'
      ]
    };
    const parsed = filter.parseItemStats(hybridWeapon);
    expect(parsed.generalAttackPower).toBe(20);
    expect(parsed.rangedAttackPower).toBe(15);
    expect(parsed.attackPower).toBe(35); // 20 + 15
    expect(filter.itemMatchesFilter(hybridWeapon, { minAp: 35 })).toBe(true);
    expect(filter.itemMatchesFilter(hybridWeapon, { minAp: 36 })).toBe(false);
  });

  collector.test('D.5 Creature-specific Attack Power integration', () => {
    const slayer = {
      lines: ['Equip: +45 Attack Power against Undead.']
    };
    const parsed = filter.parseItemStats(slayer);
    expect(parsed.generalAttackPower).toBe(45);
    expect(parsed.attackPower).toBe(45);
  });

  collector.test('D.6 Rejection of debuff procs: lowers target attack power', () => {
    const debuffItem1 = {
      lines: ['Chance on hit: Lowers target attack power by 50.']
    };
    expect(filter.parseItemStats(debuffItem1).attackPower).toBe(0);

    const debuffItem2 = {
      lines: ["Chance on hit: Reduces target enemy's attack power by 39."]
    };
    expect(filter.parseItemStats(debuffItem2).attackPower).toBe(0);

    const debuffItem3 = {
      lines: ['Equip: Lowers the attack power of target by 100 for 10 sec.']
    };
    expect(filter.parseItemStats(debuffItem3).attackPower).toBe(0);
  });
});

// ============================================================================
// SUITE E: CASTER & HYBRID STAT PROBES
// ============================================================================
collector.describe('Suite E: Caster & Hybrid Stat Probes', () => {
  collector.test('E.1 Dual caster lines increase BOTH spellDamage and healing equally', () => {
    const dualStaff = {
      lines: ['Equip: Increases damage and healing done by magical spells and effects by up to 14.']
    };
    const parsed = filter.parseItemStats(dualStaff);
    expect(parsed.spellDamage).toBe(14);
    expect(parsed.healing).toBe(14);
    expect(filter.itemMatchesFilter(dualStaff, { minSpellDmg: 14 })).toBe(true);
    expect(filter.itemMatchesFilter(dualStaff, { minHealing: 14 })).toBe(true);
  });

  collector.test('E.2 Pure school spell damage increases spellDamage ONLY (healing = 0)', () => {
    const shadowDagger = {
      lines: ['Equip: Increases damage done by Shadow spells and effects by up to 20.']
    };
    const parsed = filter.parseItemStats(shadowDagger);
    expect(parsed.spellDamage).toBe(20);
    expect(parsed.healing).toBe(0);
    expect(filter.itemMatchesFilter(shadowDagger, { minSpellDmg: 20 })).toBe(true);
    expect(filter.itemMatchesFilter(shadowDagger, { minHealing: 1 })).toBe(false);
  });

  collector.test('E.3 Pure healing (Trogg Scepter) increases healing ONLY (spellDamage = 0)', () => {
    const trogg = {
      lines: [
        'Trogg Scepter',
        'One-Hand Mace',
        '8.13 DPS',
        'Speed 2.40',
        'Equip: Increases healing done by up to 33'
      ]
    };
    const parsed = filter.parseItemStats(trogg);
    expect(parsed.healing).toBe(33);
    expect(parsed.spellDamage).toBe(0);
    expect(filter.itemMatchesFilter(trogg, { minHealing: 33 })).toBe(true);
    expect(filter.itemMatchesFilter(trogg, { minSpellDmg: 1 })).toBe(false);
  });

  collector.test('E.4 Asymmetric hybrid caster lines ("healing up to 18 and damage up to 6")', () => {
    const hybrid = {
      lines: ['Equip: Increases healing done by up to 18 and damage done by up to 6.']
    };
    const parsed = filter.parseItemStats(hybrid);
    expect(parsed.healing).toBe(18);
    expect(parsed.spellDamage).toBe(6);
    expect(filter.itemMatchesFilter(hybrid, { minHealing: 18, minSpellDmg: 6 })).toBe(true);
    expect(filter.itemMatchesFilter(hybrid, { minSpellDmg: 7 })).toBe(false);
  });

  collector.test('E.5 MP5 extraction and distinction from HP5', () => {
    const mp5Item = {
      lines: ['Equip: Restores 6 mana per 5 sec.']
    };
    const parsedMp5 = filter.parseItemStats(mp5Item);
    expect(parsedMp5.mp5).toBe(6);
    expect(filter.itemMatchesFilter(mp5Item, { minMp5: 6 })).toBe(true);

    const hp5Item = {
      lines: ['Equip: Restores 8 health per 5 sec.']
    };
    const parsedHp5 = filter.parseItemStats(hp5Item);
    expect(parsedHp5.mp5).toBe(0); // HP5 must NOT pollute MP5
    expect(filter.itemMatchesFilter(hp5Item, { minMp5: 1 })).toBe(false);
  });
});

// ============================================================================
// SUITE F: DEFENSIVE & SHIELD STATS PROBES
// ============================================================================
collector.describe('Suite F: Defensive & Shield Stats Probes', () => {
  collector.test('F.1 Comma-formatted armor ("1,380 Armor") in lines and direct properties', () => {
    const plateChest = { lines: ['1,380 Armor'] };
    expect(filter.parseItemStats(plateChest).armor).toBe(1380);

    const shieldStr = { armor: '1,380' };
    expect(filter.parseItemStats(shieldStr).armor).toBe(1380);

    expect(filter.itemMatchesFilter(plateChest, { minArmor: 1380 })).toBe(true);
    expect(filter.itemMatchesFilter(plateChest, { minArmor: 1381 })).toBe(false);
  });

  collector.test('F.2 Proc armor lines are excluded from static armor', () => {
    const procItem = {
      lines: ['Equip: When struck in combat has a 5% chance to grant 1080 armor for 12 sec.']
    };
    expect(filter.parseItemStats(procItem).armor).toBe(0);
    expect(filter.itemMatchesFilter(procItem, { minArmor: 1 })).toBe(false);
  });

  collector.test('F.3 Shield block value summation: base block + equip block bonus = totalBlockValue', () => {
    const aegis = {
      name: 'Aegis of the Scarlet Commander',
      block: 17,
      lines: [
        '17 Block',
        'Equip: Increases the block value of your shield by 21.'
      ]
    };
    const parsed = filter.parseItemStats(aegis);
    expect(parsed.baseBlock).toBe(17);
    expect(parsed.blockValueBonus).toBe(21);
    expect(parsed.totalBlockValue).toBe(38); // 17 + 21
    expect(parsed.block).toBe(38);

    expect(filter.itemMatchesFilter(aegis, { minBlock: 38 })).toBe(true);
    expect(filter.itemMatchesFilter(aegis, { minBlock: 39 })).toBe(false);
  });

  collector.test('F.4 Exclusion of block chance % from block value', () => {
    const shieldWithChance = {
      name: 'Shield of Deflection',
      block: 15,
      lines: [
        '15 Block',
        'Equip: Increases your chance to block attacks with a shield by 2%.'
      ]
    };
    const parsed = filter.parseItemStats(shieldWithChance);
    expect(parsed.baseBlock).toBe(15);
    expect(parsed.blockValueBonus).toBe(0);
    expect(parsed.totalBlockValue).toBe(15);
    expect(filter.itemMatchesFilter(shieldWithChance, { minBlock: 16 })).toBe(false);
  });

  collector.test('F.5 Exclusion of block damage triggers from block value', () => {
    const spikeShield = {
      name: 'Spiked Shield',
      block: 12,
      lines: [
        '12 Block',
        'Equip: Each time you block an attack, you deal 20 Holy damage to the attacker.'
      ]
    };
    const parsed = filter.parseItemStats(spikeShield);
    expect(parsed.baseBlock).toBe(12);
    expect(parsed.blockValueBonus).toBe(0);
    expect(parsed.totalBlockValue).toBe(12);
  });
});

// ============================================================================
// SUITE G: EXHAUSTIVE CENSUS ACROSS ALL RUNTIME DATASETS
// ============================================================================
collector.describe('Suite G: Exhaustive Census of All Runtime Progression Items', () => {
  collector.test('G.1 Census across all 9 classes in WOW_PROGRESSION_DATA (0 NaNs, 0 Exceptions)', () => {
    let totalItems = 0;
    const categories = ['weapons', 'wands', 'offhands'];
    const expectedClasses = ['warrior', 'paladin', 'hunter', 'rogue', 'shaman', 'mage', 'warlock', 'priest', 'druid'];

    const statFields = [
      'reqLevel', 'iLvl', 'dps', 'speed', 'strength', 'agility', 'stamina',
      'intellect', 'spirit', 'attackPower', 'crit', 'hit', 'spellDamage',
      'healing', 'mp5', 'armor', 'block'
    ];

    expectedClasses.forEach(cls => {
      categories.forEach(cat => {
        const catObj = progressionData[cat];
        if (!catObj || !catObj[cls]) return;

        const classTrack = catObj[cls];
        const steps = Array.isArray(classTrack.levels) ? classTrack.levels : [];

        steps.forEach(step => {
          totalItems++;
          const parsedPrimary = filter.parseItemStats(step);
          expect(parsedPrimary !== null).toBe(true);

          statFields.forEach(field => {
            const val = parsedPrimary[field];
            if (typeof val !== 'number' || isNaN(val)) {
              throw new Error(`NaN/invalid stat ${field} on primary item ${step.name} (${cat}/${cls}): ${val}`);
            }
          });

          if (Array.isArray(step.alts)) {
            step.alts.forEach(alt => {
              totalItems++;
              const parsedAlt = filter.parseItemStats(alt);
              expect(parsedAlt !== null).toBe(true);

              statFields.forEach(field => {
                const val = parsedAlt[field];
                if (typeof val !== 'number' || isNaN(val)) {
                  throw new Error(`NaN/invalid stat ${field} on alt item ${alt.name} (${cat}/${cls}): ${val}`);
                }
              });
            });
          }
        });
      });
    });

    console.log(`  ✓ Successfully parsed and audited ${totalItems} progression items across 9 classes with 0 NaNs and 0 exceptions.`);
    expect(totalItems > 1000).toBe(true);
  });

  collector.test('G.2 Census across all BiS items in WOW_BIS_DATA (0 NaNs, 0 Exceptions)', () => {
    let totalBis = 0;
    const statFields = [
      'reqLevel', 'iLvl', 'dps', 'speed', 'strength', 'agility', 'stamina',
      'intellect', 'spirit', 'attackPower', 'crit', 'hit', 'spellDamage',
      'healing', 'mp5', 'armor', 'block'
    ];

    const expectedClasses = ['warrior', 'paladin', 'hunter', 'rogue', 'priest', 'shaman', 'mage', 'warlock', 'druid'];

    expectedClasses.forEach(cls => {
      const classBis = bisData[cls];
      if (!classBis || !Array.isArray(classBis.specs)) return;

      classBis.specs.forEach(spec => {
        if (!spec || !Array.isArray(spec.slots)) return;

        spec.slots.forEach(slot => {
          if (!slot || !Array.isArray(slot.items)) return;

          slot.items.forEach(item => {
            totalBis++;
            const parsed = filter.parseItemStats(item);
            expect(parsed !== null).toBe(true);

            statFields.forEach(field => {
              const val = parsed[field];
              if (typeof val !== 'number' || isNaN(val)) {
                throw new Error(`NaN/invalid stat ${field} on BiS item ${item.name} (${cls}/${spec.name}/${slot.slotName}): ${val}`);
              }
            });
          });
        });
      });
    });

    console.log(`  ✓ Successfully parsed and audited ${totalBis} BiS items with 0 NaNs and 0 exceptions.`);
    expect(totalBis > 500).toBe(true);
  });
});

// ============================================================================
// SUITE H: MULTI-CRITERIA MATCHER COMBINATORIAL INVARIANTS
// ============================================================================
collector.describe('Suite H: Multi-Criteria Matcher Combinatorial Invariants', () => {
  collector.test('H.1 Reset all filters returns state to unconstrained default (0 active)', () => {
    filter.setState({
      minLevel: 20,
      maxLevel: 40,
      minDps: 30,
      speedOp: '<=',
      speedVal: 2.00,
      minStr: 10,
      minAgi: 10
    });
    expect(filter.getActiveFilterCount()).toBe(6);

    filter.resetFilters();
    expect(filter.getActiveFilterCount()).toBe(0);
    const s = filter.getState();
    expect(s.minLevel).toBe(null);
    expect(s.maxLevel).toBe(null);
    expect(s.minDps).toBe(null);
    expect(s.speedVal).toBe(null);
    expect(s.minStr).toBe(null);
  });

  collector.test('H.2 Logical AND requires ALL active criteria to match', () => {
    const testItem = {
      name: 'Knightly Longsword',
      reqLevel: 25,
      dps: 22.5,
      speed: 2.40,
      strength: 8,
      stamina: 8,
      lines: ['+8 Strength', '+8 Stamina', 'Speed 2.40', '(22.5 damage per second)']
    };

    // Satisfies all:
    expect(filter.itemMatchesFilter(testItem, {
      minLevel: 20,
      maxLevel: 30,
      minDps: 20,
      speedOp: '<=',
      speedVal: 2.50,
      minStr: 8,
      minSta: 8
    })).toBe(true);

    // Fails on single criterion (speed too slow):
    expect(filter.itemMatchesFilter(testItem, {
      minLevel: 20,
      maxLevel: 30,
      minDps: 20,
      speedOp: '<=',
      speedVal: 2.30, // 2.40 > 2.30 -> fails
      minStr: 8,
      minSta: 8
    })).toBe(false);

    // Fails on single criterion (stamina too low):
    expect(filter.itemMatchesFilter(testItem, {
      minLevel: 20,
      maxLevel: 30,
      minDps: 20,
      speedOp: '<=',
      speedVal: 2.50,
      minStr: 8,
      minSta: 9 // 8 < 9 -> fails
    })).toBe(false);
  });
});

// ============================================================================
// SUITE I: ADVERSARIAL EDGE CASE FINDINGS (EXPLICIT VULNERABILITY PROBES)
// ============================================================================
collector.describe('Suite I: Adversarial Edge Case Vulnerability Probes', () => {
  collector.test('I.1 PROBE: Comma-formatted armor in stats string splits prematurely on comma', () => {
    // String '1,380 Armor, +10 Stamina' splits at comma into ['1', '380 Armor']
    const item = { stats: '1,380 Armor, +10 Stamina' };
    const parsed = filter.parseItemStats(item);
    // CHALLENGE: If parsed.armor is 380 instead of 1380, record confirmed bug!
    if (parsed.armor === 380) {
      console.warn('  ⚠️ CONFIRMED VULNERABILITY I.1: statsStr.split(",") cuts "1,380 Armor" into "1" and "380 Armor", returning armor: 380 instead of 1380.');
    }
    expect(parsed.armor).toBe(1380);
  });

  collector.test('I.2 PROBE: Selectable token +9 [Agility or Strength] in stats string without lines', () => {
    const item = { stats: '+9 [Agility or Strength]' };
    const parsed = filter.parseItemStats(item);
    // CHALLENGE: If strength and agility are 0, record confirmed bug!
    if (parsed.strength === 0 && parsed.agility === 0) {
      console.warn('  ⚠️ CONFIRMED VULNERABILITY I.2: statsStr lacks selectable stat choice regex for "+9 [Agility or Strength]", returning 0/0.');
    }
    expect(parsed.strength).toBe(9);
    expect(parsed.agility).toBe(9);
  });

  collector.test('I.3 PROBE: Pure healing Equip effect in stats string without lines', () => {
    const item = { stats: 'Equip: Increases healing done by up to 33' };
    const parsed = filter.parseItemStats(item);
    if (parsed.healing === 0) {
      console.warn('  ⚠️ CONFIRMED VULNERABILITY I.3: statsStr lacks Equip healing effect regex, returning healing: 0 instead of 33.');
    }
    expect(parsed.healing).toBe(33);
  });

  collector.test('I.4 PROBE: Secondary Attack Power in stats string (+20 AP, +14 RAP)', () => {
    const item = { stats: '+20 AP, +14 RAP' };
    const parsed = filter.parseItemStats(item);
    if (parsed.rangedAttackPower === 0) {
      console.warn('  ⚠️ CONFIRMED VULNERABILITY I.4: statsStr AP token logic short-circuits after reading first AP token, discarding RAP: 14.');
    }
    expect(parsed.rangedAttackPower).toBe(14);
  });

  collector.test('I.5 PROBE: Equip shield block value bonus in stats string without lines', () => {
    const item = { stats: '25 Block, Equip: Increases the block value of your shield by 15' };
    const parsed = filter.parseItemStats(item);
    if (parsed.blockValueBonus === 0) {
      console.warn('  ⚠️ CONFIRMED VULNERABILITY I.5: statsStr lacks shield block value bonus regex, returning total block: 25 instead of 40.');
    }
    expect(parsed.totalBlockValue).toBe(40);
  });
});

// ============================================================================
// EXECUTION & SUMMARY
// ============================================================================
const summary = collector.getSummary();
console.log('----------------------------------------------------------------------');
console.log(` Suite: ${summary.suiteName}`);
console.log(` Tests: ${summary.total} | Passed: ${summary.passes} | Failed: ${summary.failures} (${summary.duration}ms)`);
console.log('----------------------------------------------------------------------\n');

for (const t of summary.tests) {
  if (t.status === 'pass') {
    console.log(`  ✓ ${t.name}`);
  } else {
    console.error(`  ✗ ${t.name}`);
    console.error(`    Error: ${t.message}`);
  }
}

console.log('\n======================================================================');
console.log(` TOTAL ASSERTIONS: ${summary.total} | PASSED: ${summary.passes} | FAILED: ${summary.failures}`);
console.log('======================================================================\n');

if (summary.failures > 0) {
  console.log(`🚨 EMPIRICAL CHALLENGER IDENTIFIED ${summary.failures} REPRODUCIBLE ANOMALIES/VULNERABILITIES.`);
  process.exit(1);
} else {
  console.log('🎉 ALL ADVERSARIAL STRESS TESTS PASSED WITH 0 FAILURES!');
  process.exit(0);
}
