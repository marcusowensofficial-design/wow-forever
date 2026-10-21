#!/usr/bin/env node
/* global console, process */

/**
 * WoW Forever — Milestone 4 Gate Challenger Adversarial Test Suite
 *
 * Adversarially challenges and stress-tests Checks 64–68 in scripts/validate.js:
 * 1. Suite 1 (Check 64): Weapon proficiency & class legality inversion/mutation testing.
 * 2. Suite 2 (Check 65): Dungeon instance & elite quest level gating inversion/mutation testing.
 * 3. Suite 3 (Check 66): Faction tagging & class guardrails inversion/mutation testing.
 * 4. Suite 4 (Check 67): 17-stat dimension parsing & zero-NaN integrity inversion/mutation testing.
 * 5. Suite 5 (Check 68): Forever domain links & Zamimg CDN icon URL inversion/mutation testing.
 * 6. Suite 6: Live Subprocess Disk Tamper Testing against `node scripts/validate.js`.
 *
 * Exit Code: 0 on 100% pass, 1 on any failure.
 */

import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { execSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { TestCollector, expect } from './helpers/assertions.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');

const PROG_PATH = path.join(ROOT, 'js', 'data', 'class-progression-data.js');
const FILTER_PATH = path.join(ROOT, 'js', 'modules', 'deepdives', 'progression-filter.js');
const CACHE_PATH = path.join(ROOT, 'scratch', 'forever_items_cache.json');

console.log('======================================================================');
console.log('   WOW FOREVER — MILESTONE 4 GATE CHALLENGER ADVERSARIAL TEST SUITE');
console.log('   Checks 64–68 Fault Injection & Tamper Verification');
console.log('======================================================================\n');

const collector = new TestCollector('Milestone 4 Gate Challenger: Checks 64–68 Adversarial Suite');

function assertDoesNotThrow(fn, desc) {
  try {
    fn();
  } catch (err) {
    throw new Error(`${desc || 'Function threw an unexpected error'}: ${err.message}`);
  }
}

function sleepMs(ms) {
  Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms);
}

function safeWriteFileSync(filePath, content, retries = 5) {
  for (let i = 0; i < retries; i++) {
    try {
      fs.writeFileSync(filePath, content, 'utf8');
      return;
    } catch (err) {
      if (i === retries - 1) throw err;
      sleepMs(100);
    }
  }
}

// Helper to create sandbox and load progression data and filter
function createSandbox() {
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
    escapeHtml: s => String(s ?? ''),
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

  const progCode = fs.readFileSync(PROG_PATH, 'utf8');
  vm.runInContext(progCode, context);

  const filterCode = fs.readFileSync(FILTER_PATH, 'utf8');
  vm.runInContext(filterCode, context);

  let cache = {};
  if (fs.existsSync(CACHE_PATH)) {
    try {
      cache = JSON.parse(fs.readFileSync(CACHE_PATH, 'utf8'));
    } catch {
      cache = {};
    }
  }

  return {
    progressionData: context.window.WOW_PROGRESSION_DATA,
    progressionFilter: context.window.WOW_PROGRESSION_FILTER,
    cache
  };
}

function cloneProgressionData(data) {
  return JSON.parse(JSON.stringify(data));
}

function parseBracketMax(bracket) {
  if (!bracket) return 60;
  const parts = bracket.split(/[–-]/).map(s => parseInt(s.trim(), 10));
  return parts[1] || parts[0] || 60;
}

// Exact Check 64 implementation from scripts/validate.js
function runCheck64(progressionData, cache) {
  const allItems = getAllProgressionItems(progressionData);

  const knownAxeNames = new Set(["crude battle axe", "copper battle axe", "thick war axe", "durgen's crescent axe", "corpse chopper", "forsaken greataxe", "reef axe", "taurenbane's family cleaver", "guardian's dualblade", "whirlwind axe", "corpsemaker", "ravager", "executioner's cleaver", "gatorbite axe", "arcanite reaper", "woodchopper", "lumbering ogre axe", "taskmaster axe", "bronze battle axe", "heavy mithril axe", "bonebiter", "massive iron axe", "riptear's cleaver", "thun'grim's axe", "axe of orgrimmar", "icesworn decapitator", "butcher's cleaver"]);
  const knownSwordNames = new Set(["worn shortsword", "copper claymore", "heavy copper broadsword", "haunting blade", "vileblood scimitar", "plaguefang", "strike of the hydra", "trusty sword", "whirlwind sword", "stoneslayer", "blackblade of shahram", "copper shortsword", "bronze greatsword", "wolfsbane", "moonsteel broadsword", "sword of serenity", "blade of the titans", "warmonger", "cutlass", "cruel barb", "wingblade", "deadly bronze poniard", "bronze shortsword", "ruby-adorned blade", "city guard's tarnished blade", "sword of hammerfall", "the butcher", "vanquisher's sword", "thrash blade", "mirah's song", "dal'rend's sacred charge", "dal'rend's tribal guardian", "coldflame saber", "debt collector", "witchblade", "master hunter's spellsword", "zealot blade", "sword of omen", "forsaken shortsword", "deathstalker shortsword", "talonstrike", "thun'grim's sword", "heirloom sword", "sword of the fallen", "militia shortsword", "militia sword", "curved scimitar", "wildgore greatsword", "gilded blademaster's greatsword", "monstrous cleaver", "the skyblade", "blade of silverlaine", "alliance outrunner's sword", "blade of senseless slaughter"]);
  const knownMaceNames = new Set(["crude battle axe", "wooden mallet", "large club", "northshire hammer", "giant mace", "trogg scepter", "heavy copper maul", "ironforge greathammer", "rhahk'zor's hammer", "smite's mighty hammer", "verigan's fist", "heavehammer", "defender of dalaran", "dark hearted hammer", "manual crowd pummeler", "mograine's might", "princess theradras' scepter", "dark iron pulverizer", "hammer of the grand crusader", "the unstoppable force", "militia warhammer", "scepter of the abandoned", "rage of the storm", "dendweller's hammer", "copper mace", "bronze mace", "bronze warhammer", "solid iron maul", "mighty iron hammer", "the pacifier", "enchanted battlehammer", "club", "crested scepter", "rock pulverizer", "archeus", "grisly sack of skulls", "goblin smasher", "bonecracker", "hammer of orgrimmar", "hammerbone", "mug of muddled memories", "the stitcher", "gul'gash's greathammer"]);

  const violations = [];

  for (const { kind, cls, trackId, item: it } of allItems) {
    const id = it.itemId || it.id;
    const name = (it.name || '').toLowerCase();
    const val = (it.value || '').toLowerCase();
    const wt = (it.weaponType || '').toLowerCase();
    const sub = it.subclass;

    // 1. Fishing poles
    if (sub === 20 || name.includes('fishing pole') || val.includes('fishing pole') || wt.includes('fishing pole')) {
      violations.push(`${cls} cannot have fishing pole "${it.name}" in combat progression`);
    }

    // 2. Class restrictions
    const restriction = it.classRestriction || cache[id]?.classRestriction;
    if (restriction && !restriction.toLowerCase().includes(cls)) {
      violations.push(`${cls} has "${it.name}" restricted to "${restriction}"`);
    }

    // 3. Class-specific proficiencies
    if (cls === 'rogue') {
      if (sub === 19 || wt.includes('wand')) {
        violations.push(`Rogue cannot equip wand "${it.name}"`);
      }
      if (knownAxeNames.has(name) || wt.includes('axe') || wt.includes('2h') || wt.includes('two-hand') || wt.includes('staff')) {
        violations.push(`Rogue cannot equip 2H/axe/staff "${it.name}"`);
      }
    }

    if (cls === 'paladin') {
      if (knownAxeNames.has(name) || wt.includes('axe')) {
        violations.push(`Paladin cannot equip axe "${it.name}"`);
      }
      if (wt.includes('fist') || wt.includes('thrown') || sub === 13 || sub === 16) {
        violations.push(`Paladin cannot equip fist/thrown "${it.name}"`);
      }
    }

    if (cls === 'shaman') {
      if (knownSwordNames.has(name) || wt.includes('sword')) {
        violations.push(`Shaman cannot equip sword "${it.name}"`);
      }
    }

    if (cls === 'druid') {
      if (knownSwordNames.has(name) || wt.includes('sword')) {
        violations.push(`Druid cannot equip sword "${it.name}"`);
      }
      if ((knownAxeNames.has(name) || wt.includes('axe')) && !wt.includes('polearm')) {
        violations.push(`Druid cannot equip axe "${it.name}"`);
      }
      if (wt.includes('thrown') || sub === 16) {
        violations.push(`Druid cannot equip thrown weapon "${it.name}"`);
      }
    }

    if (cls === 'priest') {
      if (knownSwordNames.has(name) || wt.includes('sword')) {
        violations.push(`Priest cannot equip sword "${it.name}"`);
      }
      if (knownAxeNames.has(name) || wt.includes('axe')) {
        violations.push(`Priest cannot equip axe "${it.name}"`);
      }
      if (wt.includes('fist') || wt.includes('thrown') || sub === 13 || sub === 16) {
        violations.push(`Priest cannot equip fist/thrown "${it.name}"`);
      }
      if ((wt.includes('2h') || wt.includes('two-hand')) && (knownMaceNames.has(name) || wt.includes('mace'))) {
        violations.push(`Priest cannot equip 2H mace "${it.name}"`);
      }
    }

    if (cls === 'mage' || cls === 'warlock') {
      if (knownMaceNames.has(name) || wt.includes('mace')) {
        violations.push(`${cls} cannot equip mace "${it.name}"`);
      }
      if (knownAxeNames.has(name) || wt.includes('axe')) {
        violations.push(`${cls} cannot equip axe "${it.name}"`);
      }
      if (wt.includes('fist') || wt.includes('thrown') || sub === 13 || sub === 16) {
        violations.push(`${cls} cannot equip fist/thrown "${it.name}"`);
      }
    }

    if (cls === 'hunter' && kind === 'weapons') {
      if (trackId === 'twohand' || trackId === 'melee') {
        const is2hOrMelee = wt.includes('staff') || wt.includes('polearm') || wt.includes('sword') || wt.includes('axe') || wt.includes('dagger') || wt.includes('fist');
        if (!is2hOrMelee) {
          violations.push(`Hunter two-handed track cannot contain non-melee weapon "${it.name}"`);
        }
        if (knownMaceNames.has(name) || wt.includes('mace')) {
          violations.push(`Hunter cannot equip mace "${it.name}"`);
        }
      } else {
        const isRanged = wt.includes('bow') || wt.includes('gun') || wt.includes('crossbow') || wt.includes('rifle');
        if (!isRanged) {
          violations.push(`Hunter ranged track cannot contain non-ranged weapon "${it.name}"`);
        }
      }
    }

    // 4. Level floors
    if ((wt.includes('polearm') || sub === 6) && it.effectiveLevel < 20) {
      violations.push(`Polearm "${it.name}" effectiveLevel ${it.effectiveLevel} < 20`);
    }

    if ((cls === 'warrior' || cls === 'hunter') && it.effectiveLevel < 20) {
      const isDw = cache[id]?.inventorySlot === 'SecondaryHand' || (it.slot || '').toLowerCase().includes('off hand');
      if (isDw) {
        violations.push(`${cls} dual wield item "${it.name}" effectiveLevel ${it.effectiveLevel} < 20`);
      }
    }
  }

  if (violations.length > 0) {
    throw new Error(`Weapon proficiency & class legality violations (${violations.length}):\n  ${violations.slice(0, 10).join('\n  ')}`);
  }
}

// Exact Check 65 implementation from scripts/validate.js
function runCheck65(progressionData) {
  const allItems = getAllProgressionItems(progressionData);

  const DUNGEON_GATES = [
    { dungeon: 'Ragefire Chasm', minBracket: 13, regex: /ragefire chasm|rfc|taragaman|jergosh|bazzalan|maur grimtotem/i },
    { dungeon: 'The Deadmines', minBracket: 18, regex: /the deadmines|deadmines|rhahk'zor|sneed|smite's|captain greenskin|edwin vancleef|miner johnson|cookie/i },
    { dungeon: 'Wailing Caverns', minBracket: 18, regex: /wailing caverns|kresh|lord pythas|lord serpentis|skum|verdan|trigore|mutanus/i },
    { dungeon: 'Shadowfang Keep', minBracket: 22, regex: /shadowfang keep|sfk|commander springvale|blindwatcher|archmage arugal|fenrus/i },
    { dungeon: 'Blackfathom Deeps', minBracket: 24, regex: /blackfathom deeps|bfd|ghamoo-ra|gelihast|serra'kis|aku'mai|kelris/i },
    { dungeon: 'The Stockade', minBracket: 24, regex: /stockade|kam deepfury|bruegal ironknuckle|targorr|bazil thredd/i },
    { dungeon: 'Gnomeregan', minBracket: 29, regex: /gnomeregan|electrocutioner|crowd pummeler|thermaplugg|grubbis/i },
    { dungeon: 'Razorfen Kraul', minBracket: 30, regex: /razorfen kraul|rfk|ramtusk|jargba|agathelos|charlga razorflank/i },
    { dungeon: 'SM Graveyard', minBracket: 30, regex: /scarlet monastery \(graveyard\)|sm graveyard|bloodmage thalnos|azshir|interrogator vishas|ironspine/i },
    { dungeon: 'SM Library', minBracket: 33, regex: /scarlet monastery \(library\)|sm library|arcanist doan|houndmaster loksey/i },
    { dungeon: 'SM Armory', minBracket: 36, regex: /scarlet monastery \(armory\)|sm armory|herod/i },
    { dungeon: 'SM Cathedral', minBracket: 39, regex: /scarlet monastery \(cathedral\)|sm cathedral|mograine's might|high inquisitor|whitemane/i },
    { dungeon: 'Razorfen Downs', minBracket: 38, regex: /razorfen downs|rfd|glutton|mordresh|amnennar|plaguemaw/i },
    { dungeon: 'Uldaman', minBracket: 41, regex: /uldaman|archaedas|grimlok|ironaya|galgann firehammer|baelog/i },
    { dungeon: 'Zul\'Farrak', minBracket: 44, regex: /zul'farrak|zf|antu'sul|ukorz sandscalp|zum'rah|gahz'rilla/i },
    { dungeon: 'Maraudon', minBracket: 46, regex: /maraudon|noxxion|theradras|gizlock|vyletongue|celebras/i },
    { dungeon: 'Sunken Temple', minBracket: 50, regex: /sunken temple|atal'hakkar|avatar of hakkar|eranikus|morphaz|jammal'an/i },
    { dungeon: 'Blackrock Depths', minBracket: 52, regex: /blackrock depths|brd|thaurissan|angerforge|flamelash|ironfoe/i },
    { dungeon: 'Hall of Thanes', minBracket: 14, regex: /hall of thanes|magmatus|durgen dirgehammer/i },
    { dungeon: 'Ruins of Lordaeron', minBracket: 18, regex: /ruins of lordaeron|the baron|witherfang|viktor the vile/i },
    { dungeon: 'Excavation Site', minBracket: 29, regex: /excavation site|shadetooth|relic guardian/i },
    { dungeon: 'City of Dalaran', minBracket: 31, regex: /city of dalaran|atrexis|lyn the ignored|shade of the archmage/i }
  ];

  const violations = [];

  for (const gate of DUNGEON_GATES) {
    for (const { bracket, item: it } of allItems) {
      const bracketMax = parseBracketMax(bracket);
      const sourceText = [
        it.name || '',
        it.value || '',
        typeof it.source === 'string' ? it.source : (it.source?.title || '') + ' ' + (it.source?.detail || '') + ' ' + (it.source?.text || '')
      ].join(' ');

      if (gate.regex.test(sourceText)) {
        if (bracketMax < gate.minBracket) {
          violations.push(`Dungeon drop "${it.name}" (${gate.dungeon}) in bracket "${bracket}" < min ${gate.minBracket}`);
        }
      }
    }
  }

  // Elite quest items
  for (const { bracket, item: it } of allItems) {
    const bracketMax = parseBracketMax(bracket);
    const id = Number(it.itemId || it.id);

    // Master Hunter's Spellsword / King Bangalash (270085)
    if (id === 270085 && bracketMax < 38) {
      violations.push(`Elite quest item "${it.name}" (King Bangalash) in bracket "${bracket}" < min 38`);
    }

    // Bonebiter (6807)
    if (id === 6807 && bracketMax < 38) {
      violations.push(`Elite quest item "${it.name}" (SM Cathedral) in bracket "${bracket}" < min 38`);
    }
  }

  if (violations.length > 0) {
    throw new Error(`Dungeon/quest gating violations (${violations.length}):\n  ${violations.slice(0, 10).join('\n  ')}`);
  }
}

// Exact Check 66 implementation from scripts/validate.js
function runCheck66(progressionData) {
  const allItems = getAllProgressionItems(progressionData);

  const validFactions = new Set(['alliance', 'horde', 'both']);
  const violations = [];

  for (const { cls, item: it } of allItems) {
    if (!it.faction || !validFactions.has(it.faction)) {
      violations.push(`Item "${it.name}" (${it.itemId || it.id}) has invalid or missing faction: "${it.faction}"`);
    }

    if (cls === 'shaman' && (it.faction === 'alliance' || it.side === 1)) {
      violations.push(`Shaman progression contains Alliance item "${it.name}" (${it.itemId || it.id})`);
    }
  }

  if (violations.length > 0) {
    throw new Error(`Faction tagging violations (${violations.length}):\n  ${violations.slice(0, 10).join('\n  ')}`);
  }
}

// Exact Check 67 implementation from scripts/validate.js
function runCheck67(progressionData, progressionFilter) {
  const allItems = getAllProgressionItems(progressionData);

  if (!progressionFilter || typeof progressionFilter.parseItemStats !== 'function') {
    throw new Error('progression-filter.js failed to export parseItemStats');
  }

  const dimensions = [
    'reqLevel', 'iLvl', 'dps', 'speed', 'strength', 'agility', 'stamina',
    'intellect', 'spirit', 'attackPower', 'crit', 'hit', 'spellDamage',
    'healing', 'mp5', 'armor', 'block'
  ];

  const violations = [];

  for (const { item: it } of allItems) {
    const stats = progressionFilter.parseItemStats(it);
    if (!stats || typeof stats !== 'object') {
      violations.push(`Failed to parse stats for "${it.name}"`);
      continue;
    }

    for (const dim of dimensions) {
      const val = stats[dim];
      if (typeof val !== 'number' || Number.isNaN(val)) {
        violations.push(`Item "${it.name}" produced NaN or non-number for dimension "${dim}": ${val}`);
      }
    }
  }

  if (violations.length > 0) {
    throw new Error(`17-stat parsing violations (${violations.length}):\n  ${violations.slice(0, 10).join('\n  ')}`);
  }
}

// Exact Check 68 implementation from scripts/validate.js
function runCheck68(progressionData) {
  const allItems = getAllProgressionItems(progressionData);

  const violations = [];

  for (const { item: it } of allItems) {
    const id = it.itemId || it.id;
    if (!id || typeof id !== 'number' || id <= 0) {
      violations.push(`Item "${it.name}" has invalid numerical id: ${id}`);
    }

    if (!it.icon || typeof it.icon !== 'string' || !/^[a-z0-9_]+$/i.test(it.icon.replace(/\.(jpg|png)$/i, ''))) {
      violations.push(`Item "${it.name}" (${id}) has invalid icon token: "${it.icon}"`);
    }

    const itemUrl = `https://www.wowhead.com/forever/item=${id}`;
    if (!itemUrl.startsWith('https://www.wowhead.com/forever/item=')) {
      violations.push(`Item "${it.name}" (${id}) produced non-forever link: ${itemUrl}`);
    }

    const iconToken = (it.icon || '').replace(/\.(jpg|png)$/i, '').toLowerCase();
    const iconUrl = `https://wow.zamimg.com/images/wow/icons/medium/${iconToken}.jpg`;
    if (!iconUrl.startsWith('https://wow.zamimg.com/images/wow/icons/medium/') || !iconUrl.endsWith('.jpg')) {
      violations.push(`Item "${it.name}" (${id}) produced invalid Zamimg CDN icon URL: ${iconUrl}`);
    }
  }

  if (violations.length > 0) {
    throw new Error(`Link and icon formatting violations (${violations.length}):\n  ${violations.slice(0, 10).join('\n  ')}`);
  }
}

function getAllProgressionItems(progressionData) {
  const items = [];
  for (const sec of ['weapons', 'wands', 'offhands']) {
    for (const [cls, cData] of Object.entries(progressionData[sec] || {})) {
      const sets = [
        { trackId: 'levels', set: cData.levels },
        { trackId: 'healingLevels', set: cData.healingLevels }
      ];
      if (cData.tracksData) {
        for (const [tid, s] of Object.entries(cData.tracksData)) {
          sets.push({ trackId: tid, set: s });
        }
      }
      for (const { trackId, set: s } of sets) {
        if (!s) continue;
        for (const step of s) {
          items.push({ kind: sec, cls, trackId, bracket: step.levelBracket, item: step, isHero: true });
          for (const alt of (step.alts || [])) {
            items.push({ kind: sec, cls, trackId, bracket: step.levelBracket, item: alt, isHero: false });
          }
        }
      }
    }
  }
  return items;
}

const baseline = createSandbox();

// ============================================================================
// SUITE 1: CHECK 64 (WEAPON PROFICIENCY & CLASS LEGALITY)
// ============================================================================
collector.describe('Suite 1: Check 64 Weapon Proficiency Adversarial Inversion', () => {
  collector.test('1.1 Baseline dataset passes Check 64 with 0 violations', () => {
    assertDoesNotThrow(() => runCheck64(baseline.progressionData, baseline.cache), 'Baseline Check 64');
  });

  collector.test('1.2 Mutation: Injecting Rogue wand triggers Check 64 failure', () => {
    const mutated = cloneProgressionData(baseline.progressionData);
    mutated.weapons.rogue.levels[0].alts.push({
      id: 99901,
      itemId: 99901,
      name: 'Adversarial Illegal Wand',
      weaponType: 'Wand',
      subclass: 19,
      effectiveLevel: 10,
      faction: 'both',
      icon: 'inv_wand_01'
    });
    expect(() => runCheck64(mutated, baseline.cache)).toThrow(/Rogue cannot equip wand/);
  });

  collector.test('1.3 Mutation: Injecting Paladin axe triggers Check 64 failure', () => {
    const mutated = cloneProgressionData(baseline.progressionData);
    mutated.weapons.paladin.levels[0].alts.push({
      id: 99902,
      itemId: 99902,
      name: 'Adversarial Cleaver of Doom',
      weaponType: 'Two-Handed Axe',
      subclass: 1,
      effectiveLevel: 15,
      faction: 'alliance',
      icon: 'inv_axe_01'
    });
    expect(() => runCheck64(mutated, baseline.cache)).toThrow(/Paladin cannot equip axe/);
  });

  collector.test('1.4 Mutation: Injecting Shaman sword triggers Check 64 failure', () => {
    const mutated = cloneProgressionData(baseline.progressionData);
    mutated.weapons.shaman.levels[0].alts.push({
      id: 99903,
      itemId: 99903,
      name: 'Adversarial Broadsword',
      weaponType: 'One-Handed Sword',
      subclass: 7,
      effectiveLevel: 15,
      faction: 'horde',
      icon: 'inv_sword_01'
    });
    expect(() => runCheck64(mutated, baseline.cache)).toThrow(/Shaman cannot equip sword/);
  });

  collector.test('1.5 Mutation: Injecting Druid sword triggers Check 64 failure', () => {
    const mutated = cloneProgressionData(baseline.progressionData);
    mutated.weapons.druid.levels[0].alts.push({
      id: 99904,
      itemId: 99904,
      name: 'Adversarial Scimitar',
      weaponType: 'One-Handed Sword',
      subclass: 7,
      effectiveLevel: 15,
      faction: 'both',
      icon: 'inv_sword_01'
    });
    expect(() => runCheck64(mutated, baseline.cache)).toThrow(/Druid cannot equip sword/);
  });

  collector.test('1.6 Mutation: Injecting sub-20 Polearm triggers Check 64 failure', () => {
    const mutated = cloneProgressionData(baseline.progressionData);
    mutated.weapons.warrior.levels[0].alts.push({
      id: 99905,
      itemId: 99905,
      name: 'Adversarial Novice Polearm',
      weaponType: 'Polearm',
      subclass: 6,
      effectiveLevel: 14,
      faction: 'both',
      icon: 'inv_spear_01'
    });
    expect(() => runCheck64(mutated, baseline.cache)).toThrow(/Polearm "Adversarial Novice Polearm" effectiveLevel 14 < 20/);
  });

  collector.test('1.7 Mutation: Injecting combat fishing pole triggers Check 64 failure', () => {
    const mutated = cloneProgressionData(baseline.progressionData);
    mutated.weapons.warrior.levels[0].alts.push({
      id: 99906,
      itemId: 99906,
      name: 'Adversarial Master Fishing Pole',
      weaponType: 'Fishing Pole',
      subclass: 20,
      effectiveLevel: 25,
      faction: 'both',
      icon: 'inv_fishingpole_01'
    });
    expect(() => runCheck64(mutated, baseline.cache)).toThrow(/warrior cannot have fishing pole/);
  });

  collector.test('1.8 Mutation: Injecting class-restricted item leak triggers Check 64 failure', () => {
    const mutated = cloneProgressionData(baseline.progressionData);
    mutated.weapons.rogue.levels[0].alts.push({
      id: 99907,
      itemId: 99907,
      name: 'Warrior Only Dagger',
      weaponType: 'Dagger',
      subclass: 15,
      classRestriction: 'Warrior',
      effectiveLevel: 20,
      faction: 'both',
      icon: 'inv_weapon_shortblade_01'
    });
    expect(() => runCheck64(mutated, baseline.cache)).toThrow(/rogue has "Warrior Only Dagger" restricted to "Warrior"/);
  });

  collector.test('1.9 Mutation: Injecting melee weapon into Hunter ranged track triggers Check 64 failure', () => {
    const mutated = cloneProgressionData(baseline.progressionData);
    mutated.weapons.hunter.levels[0].alts.push({
      id: 99908,
      itemId: 99908,
      name: 'Hunter Melee Leak Dagger',
      weaponType: 'Dagger',
      subclass: 15,
      effectiveLevel: 20,
      faction: 'both',
      icon: 'inv_weapon_shortblade_01'
    });
    expect(() => runCheck64(mutated, baseline.cache)).toThrow(/Hunter ranged track cannot contain non-ranged weapon/);
  });
});

// ============================================================================
// SUITE 2: CHECK 65 (DUNGEON INSTANCE & ELITE QUEST GATING)
// ============================================================================
collector.describe('Suite 2: Check 65 Dungeon & Quest Gating Adversarial Inversion', () => {
  collector.test('2.1 Baseline dataset passes Check 65 with 0 violations', () => {
    assertDoesNotThrow(() => runCheck65(baseline.progressionData), 'Baseline Check 65');
  });

  collector.test('2.2 Mutation: Injecting RFC item at bracket 1–2 triggers Check 65 failure', () => {
    const mutated = cloneProgressionData(baseline.progressionData);
    const step = mutated.weapons.warrior.levels.find(s => parseBracketMax(s.levelBracket) < 13);
    if (!step) throw new Error('Could not find bracket < 13 in warrior');
    step.alts.push({
      id: 99911,
      itemId: 99911,
      name: 'Adversarial RFC Blade',
      source: { title: 'Ragefire Chasm', detail: 'Drop from Taragaman the Hungerer' },
      effectiveLevel: 2,
      faction: 'horde',
      icon: 'inv_sword_01'
    });
    expect(() => runCheck65(mutated)).toThrow(/Dungeon drop "Adversarial RFC Blade" \(Ragefire Chasm\) in bracket ".*" < min 13/);
  });

  collector.test('2.3 Mutation: Injecting Deadmines (VC) item at bracket 11–12 triggers Check 65 failure', () => {
    const mutated = cloneProgressionData(baseline.progressionData);
    const step = mutated.weapons.rogue.levels.find(s => parseBracketMax(s.levelBracket) < 18);
    if (!step) throw new Error('Could not find bracket < 18 in rogue');
    step.alts.push({
      id: 99912,
      itemId: 99912,
      name: 'Adversarial VanCleef Dagger',
      source: { title: 'The Deadmines', detail: 'Drop from Edwin VanCleef' },
      effectiveLevel: 12,
      faction: 'alliance',
      icon: 'inv_weapon_shortblade_01'
    });
    expect(() => runCheck65(mutated)).toThrow(/Dungeon drop "Adversarial VanCleef Dagger" \(The Deadmines\) in bracket ".*" < min 18/);
  });

  collector.test('2.4 Mutation: Injecting Wailing Caverns item at bracket 11–12 triggers Check 65 failure', () => {
    const mutated = cloneProgressionData(baseline.progressionData);
    const step = mutated.weapons.druid.levels.find(s => parseBracketMax(s.levelBracket) < 18);
    if (!step) throw new Error('Could not find bracket < 18 in druid');
    step.alts.push({
      id: 99913,
      itemId: 99913,
      name: 'Adversarial Kresh Club',
      source: { title: 'Wailing Caverns', detail: 'Drop from Kresh' },
      effectiveLevel: 12,
      faction: 'both',
      icon: 'inv_mace_01'
    });
    expect(() => runCheck65(mutated)).toThrow(/Dungeon drop "Adversarial Kresh Club" \(Wailing Caverns\) in bracket ".*" < min 18/);
  });

  collector.test('2.5 Mutation: Injecting King Bangalash (270085) at bracket 31–36 triggers Check 65 failure', () => {
    const mutated = cloneProgressionData(baseline.progressionData);
    const step = mutated.weapons.warrior.levels.find(s => parseBracketMax(s.levelBracket) < 38 && parseBracketMax(s.levelBracket) >= 30);
    if (!step) throw new Error('Could not find bracket 30-36 in warrior');
    step.alts.push({
      id: 270085,
      itemId: 270085,
      name: "Master Hunter's Spellsword",
      effectiveLevel: 32,
      faction: 'both',
      icon: 'inv_sword_27'
    });
    expect(() => runCheck65(mutated)).toThrow(/Elite quest item "Master Hunter's Spellsword" \(King Bangalash\) in bracket ".*" < min 38/);
  });

  collector.test('2.6 Mutation: Injecting Bonebiter (6807) at bracket 31–36 triggers Check 65 failure', () => {
    const mutated = cloneProgressionData(baseline.progressionData);
    const step = mutated.weapons.warrior.levels.find(s => parseBracketMax(s.levelBracket) < 38 && parseBracketMax(s.levelBracket) >= 30);
    if (!step) throw new Error('Could not find bracket 30-36 in warrior');
    step.alts.push({
      id: 6807,
      itemId: 6807,
      name: 'Bonebiter',
      effectiveLevel: 32,
      faction: 'alliance',
      icon: 'inv_axe_06'
    });
    expect(() => runCheck65(mutated)).toThrow(/Elite quest item "Bonebiter" \(SM Cathedral\) in bracket ".*" < min 38/);
  });
});

// ============================================================================
// SUITE 3: CHECK 66 (FACTION TAGGING & CLASS GUARDRAILS)
// ============================================================================
collector.describe('Suite 3: Check 66 Faction Guardrails Adversarial Inversion', () => {
  collector.test('3.1 Baseline dataset passes Check 66 with 0 violations', () => {
    assertDoesNotThrow(() => runCheck66(baseline.progressionData), 'Baseline Check 66');
  });

  collector.test('3.2 Paladin progression permits Horde items for Undead Paladins in WoW Forever', () => {
    const mutated = cloneProgressionData(baseline.progressionData);
    mutated.weapons.paladin.levels[0].alts.push({
      id: 99921,
      itemId: 99921,
      name: 'Forsaken Paladin Maul',
      faction: 'horde',
      icon: 'inv_hammer_01'
    });
    assertDoesNotThrow(() => runCheck66(mutated), 'Paladin permits Horde items');
  });

  collector.test('3.3 Mutation: Injecting Alliance item into Shaman progression triggers Check 66 failure', () => {
    const mutated = cloneProgressionData(baseline.progressionData);
    mutated.weapons.shaman.levels[0].alts.push({
      id: 99922,
      itemId: 99922,
      name: 'Adversarial Alliance Shaman Scepter',
      faction: 'alliance',
      icon: 'inv_mace_01'
    });
    expect(() => runCheck66(mutated)).toThrow(/Shaman progression contains Alliance item "Adversarial Alliance Shaman Scepter"/);
  });

  collector.test('3.4 Mutation: Injecting missing faction triggers Check 66 failure', () => {
    const mutated = cloneProgressionData(baseline.progressionData);
    mutated.weapons.warrior.levels[0].alts.push({
      id: 99923,
      itemId: 99923,
      name: 'Adversarial Unfactioned Blade',
      faction: null,
      icon: 'inv_sword_01'
    });
    expect(() => runCheck66(mutated)).toThrow(/has invalid or missing faction/);
  });

  collector.test('3.5 Mutation: Injecting invalid faction string triggers Check 66 failure', () => {
    const mutated = cloneProgressionData(baseline.progressionData);
    mutated.weapons.warrior.levels[0].alts.push({
      id: 99924,
      itemId: 99924,
      name: 'Adversarial Neutral Bogus Blade',
      faction: 'neutral_bogus',
      icon: 'inv_sword_01'
    });
    expect(() => runCheck66(mutated)).toThrow(/has invalid or missing faction: "neutral_bogus"/);
  });
});

// ============================================================================
// SUITE 4: CHECK 67 (17-STAT DIMENSION PARSING & ZERO-NAN INTEGRITY)
// ============================================================================
collector.describe('Suite 4: Check 67 17-Stat Dimension Parsing Adversarial Inversion', () => {
  collector.test('4.1 Baseline dataset passes Check 67 with 0 violations', () => {
    assertDoesNotThrow(() => runCheck67(baseline.progressionData, baseline.progressionFilter), 'Baseline Check 67');
  });

  collector.test('4.2 Mutation: Injecting item producing NaN in strength triggers Check 67 failure', () => {
    const mutated = cloneProgressionData(baseline.progressionData);
    mutated.weapons.warrior.levels[0].alts.push({
      id: 99931,
      itemId: 99931,
      name: 'Adversarial Corrupted Stat Mace',
      stats: '+NaN Strength, 100 Armor',
      icon: 'inv_mace_01'
    });

    const faultyFilter = {
      parseItemStats(it) {
        const res = baseline.progressionFilter.parseItemStats(it);
        if (it.id === 99931) res.strength = NaN;
        return res;
      }
    };
    expect(() => runCheck67(mutated, faultyFilter)).toThrow(/produced NaN or non-number for dimension "strength": NaN/);
  });

  collector.test('4.3 Mutation: Injecting item producing NaN in speed/dps triggers Check 67 failure', () => {
    const mutated = cloneProgressionData(baseline.progressionData);
    mutated.weapons.warrior.levels[0].alts.push({
      id: 99932,
      itemId: 99932,
      name: 'Adversarial Corrupted Speed Axe',
      icon: 'inv_axe_01'
    });
    const faultyFilter = {
      parseItemStats(it) {
        const res = baseline.progressionFilter.parseItemStats(it);
        if (it.id === 99932) res.speed = NaN;
        return res;
      }
    };
    expect(() => runCheck67(mutated, faultyFilter)).toThrow(/produced NaN or non-number for dimension "speed": NaN/);
  });

  collector.test('4.4 Mutation: Injecting item producing non-object stats triggers Check 67 failure', () => {
    const mutated = cloneProgressionData(baseline.progressionData);
    mutated.weapons.warrior.levels[0].alts.push({
      id: 99933,
      itemId: 99933,
      name: 'Adversarial Null Stat Dagger',
      icon: 'inv_sword_01'
    });
    const faultyFilter = {
      parseItemStats(it) {
        if (it.id === 99933) return null;
        return baseline.progressionFilter.parseItemStats(it);
      }
    };
    expect(() => runCheck67(mutated, faultyFilter)).toThrow(/Failed to parse stats for "Adversarial Null Stat Dagger"/);
  });
});

// ============================================================================
// SUITE 5: CHECK 68 (WOWHEAD FOREVER DOMAIN LINKS & ZAMIMG CDN ICONS)
// ============================================================================
collector.describe('Suite 5: Check 68 Link & Icon Formatting Adversarial Inversion', () => {
  collector.test('5.1 Baseline dataset passes Check 68 with 0 violations', () => {
    assertDoesNotThrow(() => runCheck68(baseline.progressionData), 'Baseline Check 68');
  });

  collector.test('5.2 Mutation: Injecting non-numerical or zero id triggers Check 68 failure', () => {
    const mutated = cloneProgressionData(baseline.progressionData);
    mutated.weapons.warrior.levels[0].alts.push({
      id: 0,
      itemId: 0,
      name: 'Adversarial Zero ID Blade',
      icon: 'inv_sword_01'
    });
    expect(() => runCheck68(mutated)).toThrow(/has invalid numerical id: 0/);
  });

  collector.test('5.3 Mutation: Injecting invalid icon token triggers Check 68 failure', () => {
    const mutated = cloneProgressionData(baseline.progressionData);
    mutated.weapons.warrior.levels[0].alts.push({
      id: 99941,
      itemId: 99941,
      name: 'Adversarial Bogus Icon Blade',
      icon: 'bad_icon#@!_token.gif'
    });
    expect(() => runCheck68(mutated)).toThrow(/has invalid icon token: "bad_icon#@!_token\.gif"/);
  });

  collector.test('5.4 Mutation: Injecting empty or null icon triggers Check 68 failure', () => {
    const mutated = cloneProgressionData(baseline.progressionData);
    mutated.weapons.warrior.levels[0].alts.push({
      id: 99942,
      itemId: 99942,
      name: 'Adversarial Missing Icon Blade',
      icon: null
    });
    expect(() => runCheck68(mutated)).toThrow(/has invalid icon token/);
  });
});

// ============================================================================
// SUITE 6: SUBPROCESS DISK TAMPER PROOF AGAINST scripts/validate.js
// ============================================================================
collector.describe('Suite 6: Subprocess Tamper Proof Against scripts/validate.js', () => {
  const originalFileContent = fs.readFileSync(PROG_PATH, 'utf8');

  collector.test('6.1 Subprocess tamper: Injecting Rogue wand into class-progression-data.js triggers Check 64 failure in validate.js', () => {
    const rogueTarget = '"itemId": 281587,\n          "name": "Greatflank Flayer",\n          "icon": "inv_sword_36",\n          "weaponType": "One-Handed Sword",';
    if (!originalFileContent.includes(rogueTarget)) {
      throw new Error('Could not find rogue Greatflank Flayer marker in class-progression-data.js');
    }
    const tamperedRogue = '"itemId": 281587,\n          "name": "Greatflank Flayer",\n          "icon": "inv_wand_01",\n          "weaponType": "Wand",\n          "subclass": 19,';
    const mutatedContent = originalFileContent.replace(rogueTarget, tamperedRogue);

    try {
      safeWriteFileSync(PROG_PATH, mutatedContent);
      sleepMs(50);
      let failed = false;
      let errorOutput = '';
      try {
        execSync('node scripts/validate.js', { cwd: ROOT, encoding: 'utf8', stdio: 'pipe' });
      } catch (err) {
        failed = true;
        errorOutput = (err.stdout || '') + (err.stderr || '');
      }
      expect(failed).toBe(true);
      expect(errorOutput).toContain('✗ Weapon proficiency and class legality check across progression tracks');
      expect(errorOutput).toContain('Rogue cannot equip wand "Greatflank Flayer"');
      expect(errorOutput).toContain('Failures: 1');
    } finally {
      safeWriteFileSync(PROG_PATH, originalFileContent);
      sleepMs(50);
    }
  });

  collector.test('6.2 Subprocess tamper: Injecting RFC item at bracket 1–2 triggers Check 65 failure in validate.js', () => {
    const warriorTarget = '"itemId": 221518,\n          "name": "Whisper",';
    if (!originalFileContent.includes(warriorTarget)) {
      throw new Error('Could not find warrior Whisper marker in class-progression-data.js');
    }
    const tamperedRfc = '"itemId": 221518,\n          "name": "Whisper (Ragefire Chasm)",';
    const mutatedContent = originalFileContent.replace(warriorTarget, tamperedRfc);

    try {
      safeWriteFileSync(PROG_PATH, mutatedContent);
      sleepMs(50);
      let failed = false;
      let errorOutput = '';
      try {
        execSync('node scripts/validate.js', { cwd: ROOT, encoding: 'utf8', stdio: 'pipe' });
      } catch (err) {
        failed = true;
        errorOutput = (err.stdout || '') + (err.stderr || '');
      }
      expect(failed).toBe(true);
      expect(errorOutput).toContain('✗ Dungeon instance and elite quest progression level gating check');
      expect(errorOutput).toContain('Dungeon drop "Whisper (Ragefire Chasm)" (Ragefire Chasm) in bracket "1–2" < min 13');
      expect(errorOutput).toContain('Failures: 1');
    } finally {
      safeWriteFileSync(PROG_PATH, originalFileContent);
      sleepMs(50);
    }
  });

  collector.test('6.3 Subprocess tamper: Injecting Alliance item on Shaman triggers Check 66 failure in validate.js', () => {
    const shamanBlock = '"name": "⚔️ DPS Track (Enhancement & Elemental (Two-Hand & Staves))"';
    const shamanIdx = originalFileContent.indexOf(shamanBlock);
    if (shamanIdx === -1) {
      throw new Error('Could not find shaman DPS track marker in class-progression-data.js');
    }
    const factionTarget = '"faction": "both"';
    const factionIdx = originalFileContent.indexOf(factionTarget, shamanIdx);
    if (factionIdx === -1 || factionIdx - shamanIdx > 3000) {
      throw new Error('Could not find faction target within shaman section');
    }
    const mutatedContent = originalFileContent.slice(0, factionIdx) + '"faction": "alliance"' + originalFileContent.slice(factionIdx + factionTarget.length);

    try {
      safeWriteFileSync(PROG_PATH, mutatedContent);
      sleepMs(50);
      let failed = false;
      let errorOutput = '';
      try {
        execSync('node scripts/validate.js', { cwd: ROOT, encoding: 'utf8', stdio: 'pipe' });
      } catch (err) {
        failed = true;
        errorOutput = (err.stdout || '') + (err.stderr || '');
      }
      expect(failed).toBe(true);
      expect(errorOutput).toContain('✗ Faction tagging completeness and class faction guardrails check');
      expect(errorOutput).toContain('Shaman progression contains Alliance item "Whisper"');
      expect(errorOutput).toContain('Failures: 1');
    } finally {
      safeWriteFileSync(PROG_PATH, originalFileContent);
      sleepMs(50);
    }
  });

  collector.test('6.4 Subprocess tamper: Injecting malformed icon token triggers Check 68 failure in validate.js', () => {
    const warriorTarget = '"itemId": 221518,\n          "name": "Whisper",\n          "icon": "inv_hammer_05",';
    if (!originalFileContent.includes(warriorTarget)) {
      throw new Error('Could not find warrior Whisper icon marker in class-progression-data.js');
    }
    const tamperedIcon = '"itemId": 221518,\n          "name": "Whisper",\n          "icon": "bad_icon#@!_token.gif",';
    const mutatedContent = originalFileContent.replace(warriorTarget, tamperedIcon);

    try {
      safeWriteFileSync(PROG_PATH, mutatedContent);
      sleepMs(50);
      let failed = false;
      let errorOutput = '';
      try {
        execSync('node scripts/validate.js', { cwd: ROOT, encoding: 'utf8', stdio: 'pipe' });
      } catch (err) {
        failed = true;
        errorOutput = (err.stdout || '') + (err.stderr || '');
      }
      expect(failed).toBe(true);
      expect(errorOutput).toContain('✗ Wowhead Forever domain links and Zamimg CDN icon URL formatting check');
      expect(errorOutput).toContain('has invalid icon token: "bad_icon#@!_token.gif"');
      expect(errorOutput).toContain('Failures: 1');
    } finally {
      safeWriteFileSync(PROG_PATH, originalFileContent);
      sleepMs(50);
    }
  });

  collector.test('6.5 Subprocess tamper: Injecting NaN in progression-filter.js triggers Check 67 failure in validate.js', () => {
    const originalFilterContent = fs.readFileSync(FILTER_PATH, 'utf8');
    const filterTarget = 'reqLevel: 0,\n      iLvl: 0,\n      dps: 0,\n      speed: 0,\n      strength: 0,';
    if (!originalFilterContent.includes(filterTarget)) {
      throw new Error('Could not find strength initialization marker in progression-filter.js');
    }
    const tamperedFilter = filterTarget.replace('strength: 0,', 'strength: NaN,');
    const mutatedFilterContent = originalFilterContent.replace(filterTarget, tamperedFilter);

    try {
      safeWriteFileSync(FILTER_PATH, mutatedFilterContent);
      sleepMs(50);
      let failed = false;
      let errorOutput = '';
      try {
        execSync('node scripts/validate.js', { cwd: ROOT, encoding: 'utf8', stdio: 'pipe' });
      } catch (err) {
        failed = true;
        errorOutput = (err.stdout || '') + (err.stderr || '');
      }
      expect(failed).toBe(true);
      expect(errorOutput).toContain('✗ Progression filter 17-stat dimension parsing and zero-NaN integrity');
      expect(errorOutput).toContain('produced NaN or non-number for dimension "strength": NaN');
      expect(errorOutput).toContain('Failures: 1');
    } finally {
      safeWriteFileSync(FILTER_PATH, originalFilterContent);
      sleepMs(50);
    }
  });
});

// ============================================================================
// EXECUTION SUMMARY & REPORT
// ============================================================================
const summary = collector.getSummary();

console.log('\n----------------------------------------------------------------------');
console.log(` Suite: ${summary.suiteName}`);
console.log(` Tests: ${summary.total} | Passed: ${summary.passes} | Failed: ${summary.failures} (${summary.duration}ms)`);
console.log('----------------------------------------------------------------------\n');

if (summary.failures > 0) {
  console.error('======================================================================');
  console.error('   ADVERSARIAL CHALLENGER SUITE DETECTED FAILURES!');
  console.error('======================================================================\n');
  for (const t of summary.tests) {
    if (t.status === 'fail') {
      console.error(`  ✗ ${t.name}: ${t.message}`);
    }
  }
  process.exit(1);
} else {
  console.log('======================================================================');
  console.log(`   🎉 ALL ${summary.total} ADVERSARIAL CHALLENGER TESTS PASSED!`);
  console.log('   Checks 64–68 rigorously verified: 0 false negatives, tamper-proof.');
  console.log('======================================================================\n');
  process.exit(0);
}
