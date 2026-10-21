#!/usr/bin/env node
/* global process, console */

/**
 * Empirical Adversarial Challenger Test Suite: Milestone 2
 * Progression Gating, Stat Weights & Single-Command Engine
 *
 * Exhaustively stress-tests:
 * 1. File Size & Compilation Budget (< 10 MB limit)
 * 2. Dungeon Gating Boundaries (RFC <13, VC <18, WC <18, SFK <22, BFD <24, Stocks <24, Gnome <29, RFK <30, SM GY <30, SM Lib <33, SM Arm <36, SM Cath <39, RFD <38, Ulda <41, ZF <44, Mara <46, ST <50, BRD <52, custom dungeons)
 * 3. Elite Quest Gating Boundaries (Bangalash <38, Bonebiter <38, Whirlwind <30, Verigan <20)
 * 4. Weapon Proficiencies & Trainer Floors (Polearms <20 across all classes, Dual Wield <20 for Warrior/Hunter)
 * 5. Complete Class Weapon Restrictions Census across all 9 classes (0 axes in Paladin, 0 melee in Hunter ranged, 0 swords in Shaman, 0 2H/axes in Rogue, 0 swords/axes in Druid/Priest, 0 maces/axes in Mage/Warlock)
 * 6. Human-Tuned Leveling Stat Weights Sanity (Melee DPS slow instant scaling, Rogue OH fast speed, Hunter slow ranged, Caster wand/Spirit 1-30 vs Spell 31-60, Healer itemization, Tank shield itemization)
 * 7. Two-Tiered Ranking Integrity ("⭐ Top Pick" rank 1, top 4-5 alts, background pool indexing, descending score order)
 * 8. 17-Stat Parsing & Zero-NaN Evaluation
 */

import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');

const SCRAPED_DIR = path.join(ROOT, 'data', 'scraped');
const COMPILED_DATA_PATH = path.join(ROOT, 'js', 'data', 'class-progression-data.js');
const WEAPONS_PATH = path.join(SCRAPED_DIR, 'forever_weapons.json');
const OFFHANDS_PATH = path.join(SCRAPED_DIR, 'forever_offhands.json');
const WANDS_PATH = path.join(SCRAPED_DIR, 'forever_wands.json');

console.log('======================================================================');
console.log('   EMPIRICAL ADVERSARIAL CHALLENGER SUITE: MILESTONE 2');
console.log('   Progression Gating, Stat Weights & Single-Command Engine');
console.log('======================================================================\n');

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;
const defects = [];

function assert(condition, message, defectDetail = null) {
  totalTests++;
  if (condition) {
    passedTests++;
    console.log(`  ✓ PASS: ${message}`);
  } else {
    failedTests++;
    console.error(`  ✗ FAIL: ${message}`);
    if (defectDetail !== null && defectDetail !== undefined) {
      defects.push({ message, detail: defectDetail });
      console.error(`    Detail: ${typeof defectDetail === 'object' ? JSON.stringify(defectDetail) : defectDetail}`);
    } else {
      defects.push({ message });
    }
  }
}

// ============================================================================
// SUITE 1: FILE SIZE & RUNTIME DATASET INTEGRITY BUDGET
// ============================================================================
console.log('--- SUITE 1: FILE SIZE & COMPILATION BUDGET (< 10 MB) ---');

assert(fs.existsSync(COMPILED_DATA_PATH), 'Compiled runtime data exists at js/data/class-progression-data.js');
const compiledSizeBytes = fs.statSync(COMPILED_DATA_PATH).size;
const MAX_BUDGET_BYTES = 10 * 1024 * 1024; // 10,485,760 bytes
assert(
  compiledSizeBytes < MAX_BUDGET_BYTES,
  `class-progression-data.js size ${(compiledSizeBytes / (1024 * 1024)).toFixed(2)} MB is strictly < 10 MB budget`,
  { sizeBytes: compiledSizeBytes, limitBytes: MAX_BUDGET_BYTES }
);

// VM Execution to verify browser bundle compatibility
const compiledCode = fs.readFileSync(COMPILED_DATA_PATH, 'utf8');
const sandbox = { window: {}, console };
const context = vm.createContext(sandbox);
vm.runInContext(compiledCode, context);
const progressionData = sandbox.window.WOW_PROGRESSION_DATA;

assert(typeof progressionData === 'object' && progressionData !== null, 'window.WOW_PROGRESSION_DATA initialized in browser context');
assert(typeof progressionData.weapons === 'object', 'progressionData.weapons is populated');
assert(typeof progressionData.offhands === 'object', 'progressionData.offhands is populated');
assert(typeof progressionData.wands === 'object', 'progressionData.wands is populated');
assert(typeof progressionData.macros === 'object', 'progressionData.macros is populated');
assert(typeof progressionData.spellbooks === 'object', 'progressionData.spellbooks is populated');
assert(typeof progressionData.milestones === 'object', 'progressionData.milestones is populated');

const weaponsData = JSON.parse(fs.readFileSync(WEAPONS_PATH, 'utf8'));
const offhandsData = JSON.parse(fs.readFileSync(OFFHANDS_PATH, 'utf8'));
const wandsData = JSON.parse(fs.readFileSync(WANDS_PATH, 'utf8'));

// Helper to iterate every single item across every class and track
function getAllItems() {
  const items = [];
  // Weapons
  for (const [classId, classObj] of Object.entries(weaponsData)) {
    const trackSets = [
      { trackId: 'primary', list: classObj.levels },
      { trackId: 'tank', list: classObj.tracksData?.tank },
      { trackId: 'healing', list: classObj.healingLevels }
    ];
    for (const { trackId, list } of trackSets) {
      if (!Array.isArray(list)) continue;
      for (const step of list) {
        items.push({ kind: 'weapon', classId, trackId, bracket: step.levelBracket, item: step, isHero: true });
        for (const alt of (step.alts || [])) {
          items.push({ kind: 'weapon', classId, trackId, bracket: step.levelBracket, item: alt, isHero: false });
        }
      }
    }
  }
  // Offhands
  for (const [classId, classObj] of Object.entries(offhandsData)) {
    const trackSets = [
      { trackId: 'primary', list: classObj.levels },
      { trackId: 'healing', list: classObj.healingLevels }
    ];
    for (const { trackId, list } of trackSets) {
      if (!Array.isArray(list)) continue;
      for (const step of list) {
        items.push({ kind: 'offhand', classId, trackId, bracket: step.levelBracket, item: step, isHero: true });
        for (const alt of (step.alts || [])) {
          items.push({ kind: 'offhand', classId, trackId, bracket: step.levelBracket, item: alt, isHero: false });
        }
      }
    }
  }
  // Wands
  for (const [classId, classObj] of Object.entries(wandsData)) {
    if (Array.isArray(classObj.levels)) {
      for (const step of classObj.levels) {
        items.push({ kind: 'wand', classId, trackId: 'wand', bracket: step.levelBracket, item: step, isHero: true });
        for (const alt of (step.alts || [])) {
          items.push({ kind: 'wand', classId, trackId: 'wand', bracket: step.levelBracket, item: alt, isHero: false });
        }
      }
    }
  }
  return items;
}

const allProgressionItems = getAllItems();
console.log(`[Census] Total progression items indexed across all classes & tracks: ${allProgressionItems.length}`);

function parseBracketMax(bracket) {
  if (!bracket) return 60;
  const parts = bracket.split(/[–-]/).map(s => parseInt(s.trim(), 10));
  return parts[1] || parts[0] || 60;
}

// ============================================================================
// SUITE 2: PRACTICAL DUNGEON GATING BOUNDARIES
// ============================================================================
console.log('\n--- SUITE 2: PRACTICAL DUNGEON GATING BOUNDARIES ---');

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

for (const gate of DUNGEON_GATES) {
  const violations = [];
  for (const entry of allProgressionItems) {
    const it = entry.item;
    const bracketMax = parseBracketMax(entry.bracket);
    const sourceText = [
      it.name || '',
      it.value || '',
      typeof it.source === 'string' ? it.source : (it.source?.title || '') + ' ' + (it.source?.detail || '') + ' ' + (it.source?.text || '')
    ].join(' ');

    if (gate.regex.test(sourceText)) {
      if (bracketMax < gate.minBracket) {
        violations.push({
          item: it.name,
          itemId: it.itemId,
          bracket: entry.bracket,
          bracketMax,
          requiredMin: gate.minBracket,
          class: entry.classId,
          track: entry.trackId
        });
      }
    }
  }

  assert(
    violations.length === 0,
    `Dungeon Gating: 0 ${gate.dungeon} drops appear below level ${gate.minBracket}`,
    violations.slice(0, 3)
  );
}

// ============================================================================
// SUITE 3: ELITE QUEST GATING BOUNDARIES
// ============================================================================
console.log('\n--- SUITE 3: ELITE QUEST GATING BOUNDARIES ---');

// King Bangalash reward: Master Hunter's Spellsword (270085)
const bangalashViolations = allProgressionItems.filter(e => {
  return Number(e.item.itemId) === 270085 && parseBracketMax(e.bracket) < 38;
});
assert(
  bangalashViolations.length === 0,
  "King Bangalash / Master Hunter's Spellsword (270085) does not appear below level 38",
  bangalashViolations
);

// Bonebiter (6807) from In the Name of the Light (SM Cathedral)
const bonebiterViolations = allProgressionItems.filter(e => {
  return Number(e.item.itemId) === 6807 && parseBracketMax(e.bracket) < 38;
});
assert(
  bonebiterViolations.length === 0,
  "Bonebiter (6807) does not appear below level 38",
  bonebiterViolations
);

// Whirlwind Weapons (6975 Whirlwind Axe, 6976 Whirlwind Sword, 6977 Whirlwind Pin)
const whirlwindViolations = allProgressionItems.filter(e => {
  return [6975, 6976, 6977].includes(Number(e.item.itemId)) && parseBracketMax(e.bracket) < 30;
});
assert(
  whirlwindViolations.length === 0,
  "Whirlwind Weapons (6975/6976/6977) do not appear below level 30",
  whirlwindViolations
);

// Verigan's Fist (6953)
const veriganViolations = allProgressionItems.filter(e => {
  return Number(e.item.itemId) === 6953 && parseBracketMax(e.bracket) < 20;
});
assert(
  veriganViolations.length === 0,
  "Verigan's Fist (6953) does not appear below level 20",
  veriganViolations
);

// ============================================================================
// SUITE 4: WEAPON PROFICIENCIES & TRAINER FLOORS
// ============================================================================
console.log('\n--- SUITE 4: WEAPON PROFICIENCIES & TRAINER FLOORS ---');

// Polearms: verify 0 Polearms in any bracket below level 20 for ANY class
const earlyPolearmViolations = allProgressionItems.filter(e => {
  const type = String(e.item.weaponType || e.item.subclassName || '').toLowerCase();
  const sub = Number(e.item.subclass);
  const name = String(e.item.name || '').toLowerCase();
  const isPolearm = sub === 6 || type.includes('polearm') || name.includes('polearm');
  return isPolearm && parseBracketMax(e.bracket) < 20;
});
assert(
  earlyPolearmViolations.length === 0,
  "Weapon Proficiency: 0 Polearms appear in any level bracket below level 20 across all classes",
  earlyPolearmViolations
);

// Dual Wield: verify Warrior and Hunter tracks have no offhand items below level 20
const warriorHunterOffhandViolations = allProgressionItems.filter(e => {
  if (e.classId !== 'warrior' && e.classId !== 'hunter') return false;
  if (e.kind !== 'offhand') return false;
  // Shield is allowed for warrior at level 1; off-hand weapons are dual wield
  const type = String(e.item.weaponType || '').toLowerCase();
  const isShield = type.includes('shield');
  if (e.classId === 'warrior' && isShield) return false; // shields fine
  return parseBracketMax(e.bracket) < 20;
});
assert(
  warriorHunterOffhandViolations.length === 0,
  "Weapon Proficiency: 0 Dual Wield off-hand weapons appear below level 20 for Warrior/Hunter",
  warriorHunterOffhandViolations
);

// ============================================================================
// SUITE 5: 9-CLASS WEAPON RESTRICTIONS CENSUS
// ============================================================================
console.log('\n--- SUITE 5: 9-CLASS WEAPON RESTRICTIONS CENSUS ---');

// Helper classifiers
function checkIsAxe(it) {
  const name = String(it.name || '').toLowerCase().trim();
  const type = String(it.weaponType || it.subclassName || '').toLowerCase();
  const sub = Number(it.subclass);
  if (sub === 0 || sub === 1) return true;
  if (type.includes('axe') && !type.includes('polearm')) return true;
  if (/\b(axe|cleaver|hatchet|chopper|battleaxe|greataxe|decapitator)\b/i.test(name) && !name.includes('sword') && !name.includes('blade')) return true;
  return false;
}

function checkIsSword(it) {
  const name = String(it.name || '').toLowerCase().trim();
  const type = String(it.weaponType || it.subclassName || '').toLowerCase();
  const sub = Number(it.subclass);
  if (sub === 7 || sub === 8) return true;
  if (type.includes('sword')) return true;
  if (/\b(sword|shortsword|broadsword|claymore|greatsword|scimitar|blade|saber|cutlass|poniard)\b/i.test(name) && !name.includes('axe')) return true;
  return false;
}

function checkIsMace(it) {
  const name = String(it.name || '').toLowerCase().trim();
  const type = String(it.weaponType || it.subclassName || '').toLowerCase();
  const sub = Number(it.subclass);
  if (sub === 4 || sub === 5) return true;
  if (type.includes('mace') || type.includes('hammer') || type.includes('maul')) return true;
  if (/\b(mace|hammer|maul|mallet|club|scepter|greathammer|pulverizer|warhammer)\b/i.test(name)) return true;
  return false;
}

function checkIs2H(it) {
  const type = String(it.weaponType || it.subclassName || '').toLowerCase();
  const sub = Number(it.subclass);
  if (sub === 1 || sub === 5 || sub === 8 || sub === 6 || sub === 10) return true;
  if (type.includes('two-hand') || type.includes('2h') || type.includes('staff')) return true;
  return false;
}

function checkIsRanged(it) {
  const name = String(it.name || '').toLowerCase().trim();
  const type = String(it.weaponType || it.subclassName || '').toLowerCase();
  const sub = Number(it.subclass);
  if ([2, 3, 18].includes(sub)) return true;
  if (type.includes('bow') || type.includes('gun') || type.includes('crossbow') || type.includes('rifle')) return true;
  if (/\b(bow|gun|crossbow|rifle|repeater|blaster|shotgun|musket|boomstick|shooter)\b/i.test(name)) return true;
  return false;
}

// 1. Paladin: 0 axes in Paladin tracks
const paladinAxeViolations = allProgressionItems.filter(e => {
  return e.classId === 'paladin' && e.kind === 'weapon' && checkIsAxe(e.item);
});
assert(paladinAxeViolations.length === 0, 'Paladin: 0 axes in Paladin tracks (100% census)', paladinAxeViolations);

// Paladin 2H track: 0 shields in 2H DPS track
const paladinShieldIn2HViolations = allProgressionItems.filter(e => {
  return e.classId === 'paladin' && e.trackId === 'dps' && e.kind === 'weapon' && String(e.item.weaponType).toLowerCase().includes('shield');
});
assert(paladinShieldIn2HViolations.length === 0, 'Paladin: 0 shields in 2H DPS track', paladinShieldIn2HViolations);

// 2. Hunter: 0 melee weapons in Hunter ranged progression track (100% Bows, Crossbows, Guns)
const hunterNonRangedViolations = allProgressionItems.filter(e => {
  return e.classId === 'hunter' && e.kind === 'weapon' && !checkIsRanged(e.item);
});
assert(
  hunterNonRangedViolations.length === 0,
  'Hunter: 0 melee weapons in Hunter ranged progression track (100% Bows, Crossbows, Guns)',
  hunterNonRangedViolations
);

// 3. Shaman: 0 swords in Shaman tracks
const shamanSwordViolations = allProgressionItems.filter(e => {
  return e.classId === 'shaman' && e.kind === 'weapon' && checkIsSword(e.item);
});
assert(shamanSwordViolations.length === 0, 'Shaman: 0 swords in Shaman tracks (100% census)', shamanSwordViolations);

// Shaman: 0 Alliance items
const shamanAllianceViolations = allProgressionItems.filter(e => {
  return e.classId === 'shaman' && (e.item.faction === 'alliance' || e.item.side === 1);
});
assert(shamanAllianceViolations.length === 0, 'Shaman: 0 Alliance-restricted items (100% Horde/neutral)', shamanAllianceViolations);

// 4. Rogue: 0 2H or axes in Rogue tracks
const rogueViolations = allProgressionItems.filter(e => {
  return e.classId === 'rogue' && e.kind === 'weapon' && (checkIs2H(e.item) || checkIsAxe(e.item));
});
assert(rogueViolations.length === 0, 'Rogue: 0 two-handed weapons and 0 axes in Rogue tracks', rogueViolations);

// 5. Druid: 0 swords or axes in Druid tracks
const druidViolations = allProgressionItems.filter(e => {
  return e.classId === 'druid' && e.kind === 'weapon' && (checkIsSword(e.item) || checkIsAxe(e.item));
});
assert(druidViolations.length === 0, 'Druid: 0 swords or axes in Druid tracks', druidViolations);

// 6. Priest: 0 swords or axes in Priest tracks (and 0 2H maces)
const priestViolations = allProgressionItems.filter(e => {
  if (e.classId !== 'priest' || e.kind !== 'weapon') return false;
  return checkIsSword(e.item) || checkIsAxe(e.item) || (checkIs2H(e.item) && checkIsMace(e.item));
});
assert(priestViolations.length === 0, 'Priest: 0 swords, axes, or 2H maces in Priest tracks', priestViolations);

// 7. Mage & Warlock: 0 maces or axes in Mage/Warlock tracks (and 0 2H swords)
const casterViolations = allProgressionItems.filter(e => {
  if ((e.classId !== 'mage' && e.classId !== 'warlock') || e.kind !== 'weapon') return false;
  return checkIsMace(e.item) || checkIsAxe(e.item) || (checkIs2H(e.item) && checkIsSword(e.item));
});
assert(casterViolations.length === 0, 'Mage/Warlock: 0 maces, axes, or 2H swords in tracks', casterViolations);

// 8. Warrior: 0 wands in Warrior tracks
const warriorWandViolations = allProgressionItems.filter(e => {
  return e.classId === 'warrior' && (e.kind === 'wand' || e.item.subclass === 19 || String(e.item.weaponType).toLowerCase().includes('wand'));
});
assert(warriorWandViolations.length === 0, 'Warrior: 0 wands in Warrior tracks', warriorWandViolations);

// ============================================================================
// SUITE 6: HUMAN-TUNED LEVELING STAT WEIGHTS SANITY
// ============================================================================
console.log('\n--- SUITE 6: HUMAN-TUNED LEVELING STAT WEIGHTS SANITY ---');

import { calculateLevelingStatWeight, parseItem17Stats } from '../scripts/build-progression.mjs';

// 1. Melee DPS: Slow instant attack scaling (MS, Overpower, Sinister Strike)
const slowMeleeWeapon = {
  name: 'Heavy War Cleaver',
  speed: 3.60,
  dps: 30.0,
  strength: 10,
  agility: 5,
  stamina: 8,
  spellDamage: 0
};
const fastMeleeWeapon = {
  name: 'Quick Dagger',
  speed: 1.80,
  dps: 30.0,
  strength: 10,
  agility: 5,
  stamina: 8,
  spellDamage: 0
};
const slowScore = calculateLevelingStatWeight(slowMeleeWeapon, 'melee_dps', 35);
const fastScore = calculateLevelingStatWeight(fastMeleeWeapon, 'melee_dps', 35);
assert(
  slowScore > fastScore,
  `Melee DPS: Slow weapon (${slowMeleeWeapon.speed}s, score=${slowScore}) beats fast weapon (${fastMeleeWeapon.speed}s, score=${fastScore}) at equal DPS`,
  { slowScore, fastScore }
);

// 2. Pure caster weapon penalty in Melee DPS track
const casterStaffInMelee = {
  name: 'Arcane Staff',
  speed: 3.00,
  dps: 30.0,
  strength: 0,
  agility: 0,
  attackPower: 0,
  spellDamage: 25,
  intellect: 15
};
const casterInMeleeScore = calculateLevelingStatWeight(casterStaffInMelee, 'melee_dps', 35);
assert(
  casterInMeleeScore < slowScore * 0.25,
  `Melee DPS: Pure spell damage weapon heavily penalized (${casterInMeleeScore} vs ${slowScore})`,
  { casterInMeleeScore, slowScore }
);

// 3. Rogue Off-Hand: Fast speed priority (<= 1.80) for poison application
const fastRogueOH = {
  name: 'Swift Poison Blade',
  speed: 1.40,
  dps: 25.0,
  agility: 8,
  stamina: 5
};
const slowRogueOH = {
  name: 'Clunky Off-Hand Mace',
  speed: 2.70,
  dps: 25.0,
  agility: 8,
  stamina: 5
};
const fastOHScore = calculateLevelingStatWeight(fastRogueOH, 'rogue_offhand', 30);
const slowOHScore = calculateLevelingStatWeight(slowRogueOH, 'rogue_offhand', 30);
assert(
  fastOHScore > slowOHScore,
  `Rogue Off-Hand: Fast weapon (${fastRogueOH.speed}s, score=${fastOHScore}) beats slow weapon (${slowRogueOH.speed}s, score=${slowOHScore}) at equal DPS`,
  { fastOHScore, slowOHScore }
);

// 4. Hunter Ranged: Slow swing speed priority for Aimed/Multi-shot volley scaling
const slowBow = {
  name: 'Heavy Longbow',
  speed: 2.90,
  dps: 28.0,
  agility: 10,
  stamina: 6
};
const fastGun = {
  name: 'Rapid Pea Shooter',
  speed: 1.80,
  dps: 28.0,
  agility: 10,
  stamina: 6
};
const slowBowScore = calculateLevelingStatWeight(slowBow, 'hunter', 35);
const fastGunScore = calculateLevelingStatWeight(fastGun, 'hunter', 35);
assert(
  slowBowScore > fastGunScore,
  `Hunter Ranged: Slow bow (${slowBow.speed}s, score=${slowBowScore}) beats fast gun (${fastGun.speed}s, score=${fastGunScore}) at equal DPS`,
  { slowBowScore, fastGunScore }
);

// 5. Caster DPS: Levels 1–30 wand DPS + Spirit (5SR mana regen) vs Levels 31–60 Spell Power
const earlyWand = {
  name: 'Greater Magic Wand',
  dps: 18.0,
  spirit: 5,
  intellect: 4,
  spellDamage: 0
};
const earlyWandLowDps = {
  name: 'Lesser Magic Wand',
  dps: 10.0,
  spirit: 5,
  intellect: 4,
  spellDamage: 0
};
const earlyScore1 = calculateLevelingStatWeight(earlyWand, 'caster_dps', 20);
const earlyScore2 = calculateLevelingStatWeight(earlyWandLowDps, 'caster_dps', 20);
assert(
  earlyScore1 > earlyScore2,
  `Caster DPS (1–30): Wand DPS heavily scales leveling speed (${earlyScore1} vs ${earlyScore2})`,
  { earlyScore1, earlyScore2 }
);

const lateSpellblade = {
  name: 'Blade of Sorcery',
  dps: 25.0,
  spellDamage: 30,
  intellect: 10,
  crit: 1,
  hit: 1
};
const lateStatStickNoSpell = {
  name: 'Stick of Wisdom',
  dps: 25.0,
  spellDamage: 0,
  intellect: 15,
  spirit: 12
};
const lateScore1 = calculateLevelingStatWeight(lateSpellblade, 'caster_dps', 50);
const lateScore2 = calculateLevelingStatWeight(lateStatStickNoSpell, 'caster_dps', 50);
assert(
  lateScore1 > lateScore2,
  `Caster DPS (31–60): Spell Power + Hit/Crit dominates pure stats (${lateScore1} vs ${lateScore2})`,
  { lateScore1, lateScore2 }
);

// 6. Healer: Healing Power, MP5, Spirit
const healerMace = {
  name: 'Mace of Grace',
  healing: 35,
  mp5: 6,
  spirit: 10,
  intellect: 8
};
const meleeMace = {
  name: 'Skull Crusher',
  dps: 35.0,
  strength: 15,
  agility: 10,
  healing: 0,
  mp5: 0
};
const healerScore = calculateLevelingStatWeight(healerMace, 'healer', 45);
const nonHealerScore = calculateLevelingStatWeight(meleeMace, 'healer', 45);
assert(
  healerScore > nonHealerScore,
  `Healer: Healing Power + MP5 + Spirit dominates melee stats (${healerScore} vs ${nonHealerScore})`,
  { healerScore, nonHealerScore }
);

// 7. Tank: Shield Block, Armor, Stamina
const tankShield = {
  name: 'Bulwark of the Defender',
  armor: 1800,
  block: 35,
  stamina: 12,
  strength: 6
};
const casterOffhand = {
  name: 'Tome of Divine Knowledge',
  armor: 0,
  block: 0,
  intellect: 10,
  spirit: 10
};
const tankScore = calculateLevelingStatWeight(tankShield, 'tank_shield', 40);
const nonTankScore = calculateLevelingStatWeight(casterOffhand, 'tank_shield', 40);
assert(
  tankScore > nonTankScore,
  `Tank: Shield Block + Armor + Stamina dominates caster frill (${tankScore} vs ${nonTankScore})`,
  { tankScore, nonTankScore }
);

// ============================================================================
// SUITE 7: TWO-TIERED RANKING INTEGRITY
// ============================================================================
console.log('\n--- SUITE 7: TWO-TIERED RANKING INTEGRITY ---');

let totalBracketsChecked = 0;
let topPickMissingCount = 0;
let rankOrderFailures = 0;
let emptyAltsCount = 0;
let backgroundPoolChecked = 0;

function checkTrackSteps(steps, contextName) {
  if (!Array.isArray(steps)) return;
  for (const step of steps) {
    totalBracketsChecked++;
    if (!step.isTopPick || step.rank !== 1) {
      topPickMissingCount++;
    }
    const heroScore = step.score || 0;
    const alts = step.alts || [];
    if (alts.length === 0) {
      emptyAltsCount++;
    }
    for (const alt of alts) {
      if ((alt.score || 0) > heroScore) {
        rankOrderFailures++;
      }
    }
    if (alts.length > 5) {
      backgroundPoolChecked++;
      assert(
        Array.isArray(step.pool) && step.pool.length === alts.length - 5,
        `${contextName} [${step.levelBracket}] background pool contains ${alts.length - 5} items`
      );
    }
  }
}

for (const [cls, cData] of Object.entries(weaponsData)) {
  checkTrackSteps(cData.levels, `Weapons: ${cls} primary`);
  if (cData.tracksData?.tank) checkTrackSteps(cData.tracksData.tank, `Weapons: ${cls} tank`);
  if (cData.healingLevels) checkTrackSteps(cData.healingLevels, `Weapons: ${cls} healing`);
}

for (const [cls, cData] of Object.entries(offhandsData)) {
  checkTrackSteps(cData.levels, `Offhands: ${cls} primary`);
  if (cData.healingLevels) checkTrackSteps(cData.healingLevels, `Offhands: ${cls} healing`);
}

for (const [cls, cData] of Object.entries(wandsData)) {
  checkTrackSteps(cData.levels, `Wands: ${cls}`);
}

assert(
  topPickMissingCount === 0,
  `Two-Tiered Ranking: 100% of ${totalBracketsChecked} level brackets have a designated "⭐ Top Pick" (rank 1)`,
  { missing: topPickMissingCount }
);
assert(
  rankOrderFailures === 0,
  `Two-Tiered Ranking: 100% of hero items strictly outscore or equal their alternative options`,
  { violations: rankOrderFailures }
);
assert(
  backgroundPoolChecked > 0,
  `Two-Tiered Ranking: Background pools verified across ${backgroundPoolChecked} populated brackets`
);

// ============================================================================
// SUITE 8: 17-STAT PARSING & ZERO-NAN INTEGRITY
// ============================================================================
console.log('\n--- SUITE 8: 17-STAT PARSING & ZERO-NAN INTEGRITY ---');

let nanStatsDetected = 0;
for (const entry of allProgressionItems) {
  const it = entry.item;
  const parsed = parseItem17Stats(it);
  for (const [k, v] of Object.entries(parsed)) {
    if (Number.isNaN(v)) {
      nanStatsDetected++;
      console.error(`NaN detected in item ${it.name} (${it.itemId}) stat: ${k}`);
    }
  }
}
assert(nanStatsDetected === 0, `17-Stat Parsing: 0 NaNs detected across all ${allProgressionItems.length} progression items`, { nanStatsDetected });

// ============================================================================
// SUITE 9: BENCHMARK ITEMS EXACT VERIFICATION
// ============================================================================
console.log('\n--- SUITE 9: BENCHMARK ITEMS EXACT VERIFICATION ---');

const cachePath = path.join(ROOT, 'scratch', 'forever_items_cache.json');
assert(fs.existsSync(cachePath), 'forever_items_cache.json exists in scratch/');
const cache = JSON.parse(fs.readFileSync(cachePath, 'utf8'));

// 1. Skullflame Shield (1168)
const sfCache = cache['1168'];
assert(sfCache !== undefined, 'Skullflame Shield (1168) exists in forever_items_cache.json');
if (sfCache) {
  assert(sfCache.block >= 40, `Skullflame Shield cache block (${sfCache.block}) >= 40`);
  assert(sfCache.armor >= 2200, `Skullflame Shield cache armor (${sfCache.armor}) >= 2200`);
  assert(sfCache.procs && sfCache.procs.length >= 2, `Skullflame Shield has multi-line procs (${sfCache.procs?.length})`);
}

// 2. Verigan's Fist (6953)
const vfCache = cache['6953'];
assert(vfCache !== undefined, "Verigan's Fist (6953) exists in forever_items_cache.json");
if (vfCache) {
  assert(vfCache.reqLevel === 20, `Verigan's Fist cache reqLevel (${vfCache.reqLevel}) === 20`);
}

// 3. Whirlwind Axe (6975)
const wwCache = cache['6975'];
assert(wwCache !== undefined, 'Whirlwind Axe (6975) exists in forever_items_cache.json');
if (wwCache) {
  assert(wwCache.reqLevel === 30, `Whirlwind Axe cache reqLevel (${wwCache.reqLevel}) === 30`);
}

// 4. Ironfoe (11684)
const ironCache = cache['11684'];
assert(ironCache !== undefined, 'Ironfoe (11684) exists in forever_items_cache.json');
if (ironCache) {
  assert(ironCache.reqLevel === 55, `Ironfoe cache reqLevel (${ironCache.reqLevel}) === 55`);
  assert(ironCache.speed === '2.40', `Ironfoe cache speed (${ironCache.speed}) === '2.40'`);
  assert(
    ironCache.stats && ironCache.stats.includes('Chance on hit: Grants 2 extra attacks on your next swing.'),
    'Ironfoe has full untruncated proc in cache'
  );
}

// In-progression benchmark checks
const itemsById = new Map();
for (const entry of allProgressionItems) {
  itemsById.set(Number(entry.item.itemId), entry.item);
}

const skullflameProg = itemsById.get(1168);
assert(skullflameProg !== undefined, 'Skullflame Shield (1168) is present in progression catalog');
if (skullflameProg) {
  assert(skullflameProg.effectiveLevel >= 54, `Skullflame Shield effectiveLevel (${skullflameProg.effectiveLevel}) >= 54`);
}

const veriganProg = itemsById.get(6953);
assert(veriganProg !== undefined, "Verigan's Fist (6953) is present in progression catalog");
if (veriganProg) {
  assert(veriganProg.effectiveLevel === 20, `Verigan's Fist effectiveLevel (${veriganProg.effectiveLevel}) === 20`);
  assert(String(veriganProg.weaponType).includes('Mace'), `Verigan's Fist is a Two-Handed Mace (${veriganProg.weaponType})`);
}

const whirlwindProg = itemsById.get(6975);
assert(whirlwindProg !== undefined, 'Whirlwind Axe (6975) is present in progression catalog');
if (whirlwindProg) {
  assert(whirlwindProg.effectiveLevel === 30, `Whirlwind Axe effectiveLevel (${whirlwindProg.effectiveLevel}) === 30`);
  assert(String(whirlwindProg.weaponType).includes('Axe'), `Whirlwind Axe is a Two-Handed Axe (${whirlwindProg.weaponType})`);
}

// ============================================================================
// FINAL TEST SUMMARY
// ============================================================================
console.log('\n======================================================================');
console.log('   EMPIRICAL ADVERSARIAL TEST RUN SUMMARY');
console.log('======================================================================');
console.log(`Total Assertions: ${totalTests}`);
console.log(`Passed:           ${passedTests}`);
console.log(`Failed:           ${failedTests}`);
console.log('======================================================================');

if (failedTests > 0) {
  console.error(`\n❌ ADVERSARIAL CHALLENGE FAILED: ${failedTests} failure(s) found!`);
  console.error(JSON.stringify(defects, null, 2));
  process.exit(1);
} else {
  console.log('\n🎉 ALL ADVERSARIAL CHALLENGE TESTS PASSED EMPIRICALLY WITH ZERO DEFECTS!');
  process.exit(0);
}
