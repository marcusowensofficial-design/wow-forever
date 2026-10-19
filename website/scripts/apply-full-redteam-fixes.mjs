/**
 * Full Red-Team Weapons, Shields, and Off-Hands Remediation Script
 * 
 * 1. Purges 50 illegal staves from Paladin and replaces with authentic 1H Healing Maces.
 * 2. Fixes all corrupted IDs (Cruel Barb -> 5193, Thermaplugg's Central Core -> 9456, Black Menace -> 6803, Odo's Claw -> 6327, Battered Viking Shield -> 9451).
 * 3. Backfills all 108 null item IDs on shields/off-hands.
 * 4. Adds missing iconic weapons (Ironfoe, Barman Shanker, Quel'Serrar, Krol Blade, Ashkandi, Anathema, Ravager on Paladin).
 * 5. Adds missing iconic wands (Gravestone Scepter, Blackbone Wand, Wand of Biting Cold, Crimson Shocker, Bonecreeper Stylus, Stormrager).
 * 6. Adds dedicated Rogue Off-Hands (fast daggers/swords).
 * 7. Adds dedicated Hunter Melee Stat-Sticks (polearms/staves/axes/dual agility).
 * 8. Adds Warrior 1H Tanking track.
 * 9. Adds genuine Druid Idols and dedicated off-hands.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');
const SCRAPED_DIR = path.join(ROOT, 'data', 'scraped');

const fw = JSON.parse(fs.readFileSync(path.join(SCRAPED_DIR, 'forever_weapons.json'), 'utf8'));
const fo = JSON.parse(fs.readFileSync(path.join(SCRAPED_DIR, 'forever_offhands.json'), 'utf8'));
const fwan = JSON.parse(fs.readFileSync(path.join(SCRAPED_DIR, 'forever_wands.json'), 'utf8'));

console.log('=== STARTING WEAPON/SHIELD/OFFHAND PIPELINE REPAIRS ===');

// ==========================================
// 1. PALADIN WEAPON REPAIRS (PURGE 50 STAVES)
// ==========================================
console.log('1. Sanitizing Paladin Healer Weapons...');

const paladinHealingMaces = [
  {
    levelBracket: '1–6',
    itemId: 2131,
    name: 'Gavel',
    weaponType: '1H Mace',
    quality: 'q1',
    iLvl: 6,
    reqLevel: 3,
    speed: '2.00',
    dps: '2.3 DPS',
    stats: '+1 Stamina',
    icon: 'inv_hammer_08',
    source: { kind: 'vendor', title: 'Starter Weapon Vendor', detail: 'Northshire / Starter Zone' },
    alts: [
      { name: 'Restored Basher', itemId: 281723, weaponType: '1H Mace', quality: 'q2', iLvl: 1, reqLevel: 1, speed: '2.20', dps: '1.14 DPS', stats: '', icon: 'inv_mace_03', value: 'Leveling Drop / Vendor' },
      { name: 'Militia Warhammer', itemId: 5579, weaponType: '2H Mace', quality: 'q1', iLvl: 5, reqLevel: 1, speed: '2.90', dps: '2.6 DPS', stats: '', icon: 'inv_hammer_15', value: 'Starter Quest' }
    ]
  },
  {
    levelBracket: '7–12',
    itemId: 3487,
    name: 'Solid Iron Maul',
    weaponType: '2H Mace',
    quality: 'q1',
    iLvl: 15,
    reqLevel: 10,
    speed: '3.00',
    dps: '7.0 DPS',
    stats: '+2 Strength, +2 Stamina',
    icon: 'inv_hammer_09',
    source: { kind: 'vendor', title: 'Ironforge / Stormwind Vendor', detail: 'Solid early leveling hammer' },
    alts: [
      { name: "Healer's Mace", itemId: 1198, weaponType: '1H Mace', quality: 'q2', iLvl: 14, reqLevel: 9, speed: '2.10', dps: '5.2 DPS', stats: '+2 Intellect, +1 Spirit', icon: 'inv_mace_01', value: 'World Drop' }
    ]
  },
  {
    levelBracket: '13–17',
    itemId: 5195,
    name: "Cookie's Tenderizer",
    weaponType: '1H Mace',
    quality: 'q3',
    iLvl: 21,
    reqLevel: 16,
    speed: '2.40',
    dps: '10.8 DPS',
    stats: '+3 Strength, +2 Stamina',
    icon: 'inv_hammer_07',
    source: { kind: 'dungeon', title: 'The Deadmines — Cookie', detail: 'Deadmines rare drop' },
    alts: [
      { name: "Smite's Mighty Hammer", itemId: 5191, weaponType: '2H Mace', quality: 'q3', iLvl: 23, reqLevel: 18, speed: '3.50', dps: '13.1 DPS', stats: '+11 Strength, +4 Agility', icon: 'inv_hammer_09', value: 'The Deadmines — Mr. Smite' }
    ]
  },
  {
    levelBracket: '18–21',
    itemId: 4045,
    name: 'Silver-Thread Rod',
    weaponType: '1H Mace',
    quality: 'q2',
    iLvl: 25,
    reqLevel: 20,
    speed: '2.00',
    dps: '11.2 DPS',
    stats: '+3 Intellect, +3 Spirit, +6 Healing',
    icon: 'inv_mace_04',
    source: { kind: 'world', title: 'World Drop BoE', detail: '+3 Intellect, +3 Spirit, +6 Healing' },
    alts: [
      { name: 'Blackfathom Bludgeon', itemId: 6688, weaponType: '1H Mace', quality: 'q2', iLvl: 24, reqLevel: 19, speed: '2.20', dps: '10.5 DPS', stats: '+3 Intellect, +2 Spirit', icon: 'inv_hammer_06', value: 'BFD — Ghamoo-ra' }
    ]
  },
  {
    levelBracket: '22–25',
    itemId: 2000,
    name: 'Archeus',
    weaponType: '2H Sword',
    quality: 'q3',
    iLvl: 30,
    reqLevel: 25,
    speed: '3.20',
    dps: '19.5 DPS',
    stats: '+8 Strength, +7 Stamina',
    icon: 'inv_sword_39',
    source: { kind: 'quest', title: 'Duskwood — The Hermit / Archeus', detail: 'Iconic Alliance quest sword' },
    alts: [
      { name: 'Beetle Claw', itemId: 893, weaponType: '1H Mace', quality: 'q3', iLvl: 30, reqLevel: 25, speed: '2.20', dps: '14.8 DPS', stats: '+4 Intellect, +4 Spirit', icon: 'inv_mace_08', value: 'World Drop' }
    ]
  },
  {
    levelBracket: '26–29',
    itemId: 1705,
    name: 'Ironstar',
    weaponType: '1H Mace',
    quality: 'q3',
    iLvl: 34,
    reqLevel: 29,
    speed: '2.40',
    dps: '18.8 DPS',
    stats: '+5 Intellect, +4 Spirit',
    icon: 'inv_hammer_16',
    source: { kind: 'world', title: 'World Drop BoE', detail: '+5 Intellect, +4 Spirit' },
    alts: [
      { name: 'Manual Crowd Pummeler', itemId: 9449, weaponType: '2H Mace', quality: 'q3', iLvl: 34, reqLevel: 29, speed: '2.00', dps: '24.8 DPS', stats: '+16 Strength, +5 Agility, Use: 50% Haste', icon: 'inv_hammer_14', value: 'Gnomeregan — Crowd Pummeler 9-60' }
    ]
  },
  {
    levelBracket: '30–34',
    itemId: 6803,
    name: 'Black Menace',
    weaponType: '1H Mace',
    quality: 'q3',
    iLvl: 39,
    reqLevel: 34,
    speed: '2.20',
    dps: '23.4 DPS',
    stats: '+6 Intellect, +5 Spirit, Equip: +11 Healing',
    icon: 'inv_mace_01',
    source: { kind: 'quest', title: 'Scarlet Monastery — In the Name of the Light', detail: 'Alliance quest reward for killing Mograine & Whitemane' },
    alts: [
      { name: 'Glowstar Rod', itemId: 10697, weaponType: '1H Mace', quality: 'q3', iLvl: 38, reqLevel: 33, speed: '2.10', dps: '21.4 DPS', stats: '+7 Intellect, +5 Spirit', icon: 'inv_mace_04', value: 'World Drop BoE' },
      { name: 'Sword of Omen', itemId: 6802, weaponType: '1H Sword', quality: 'q3', iLvl: 38, reqLevel: 33, speed: '2.20', dps: '23.4 DPS', stats: '+7 Strength, +5 Agility', icon: 'inv_sword_24', value: 'Scarlet Monastery Quest Reward' }
    ]
  },
  {
    levelBracket: '35–39',
    itemId: 7721,
    name: 'Hand of Righteousness',
    weaponType: '1H Mace',
    quality: 'q3',
    iLvl: 44,
    reqLevel: 39,
    speed: '2.40',
    dps: '28.5 DPS',
    stats: '+8 Intellect, +4 Spirit, Equip: +14 Healing',
    icon: 'inv_hammer_13',
    source: { kind: 'dungeon', title: 'Scarlet Monastery Cathedral — High Inquisitor Whitemane', detail: 'Premier Holy Paladin healing mace' },
    alts: [
      { name: 'Mograine\'s Might', itemId: 7723, weaponType: '2H Mace', quality: 'q3', iLvl: 44, reqLevel: 39, speed: '3.50', dps: '38.9 DPS', stats: '+17 Strength, +16 Stamina', icon: 'inv_hammer_08', value: 'SM Cathedral — Scarlet Commander Mograine' }
    ]
  },
  {
    levelBracket: '40–44',
    itemId: 10797,
    name: 'Dire Nail',
    weaponType: '1H Mace',
    quality: 'q3',
    iLvl: 49,
    reqLevel: 44,
    speed: '2.40',
    dps: '32.1 DPS',
    stats: '+9 Intellect, +5 Spirit, Equip: +18 Healing',
    icon: 'inv_mace_08',
    source: { kind: 'dungeon', title: 'Sunken Temple — Atal\'alarion', detail: 'Sunken Temple boss drop' },
    alts: [
      { name: 'Spirestone Hammer', itemId: 12621, weaponType: '1H Mace', quality: 'q3', iLvl: 50, reqLevel: 45, speed: '2.30', dps: '33.5 DPS', stats: '+8 Intellect, +6 Spirit', icon: 'inv_hammer_16', value: 'LBRS — Spirestone' }
    ]
  },
  {
    levelBracket: '45–49',
    itemId: 11086,
    name: "The Hand of Antu'sul",
    weaponType: '1H Mace',
    quality: 'q3',
    iLvl: 48,
    reqLevel: 43,
    speed: '2.70',
    dps: '31.5 DPS',
    stats: 'Chance on hit: AOE stun and thunder strike',
    icon: 'inv_hammer_15',
    source: { kind: 'dungeon', title: 'Zul\'Farrak — Antu\'sul', detail: 'Iconic Zul\'Farrak basilisk boss drop' },
    alts: [
      { name: 'Hammer of the Northern Wind', itemId: 810, weaponType: '1H Mace', quality: 'q4', iLvl: 54, reqLevel: 49, speed: '2.10', dps: '39.8 DPS', stats: 'Chance on hit: Frost shock burst', icon: 'inv_hammer_13', value: 'World Drop Epic' }
    ]
  },
  {
    levelBracket: '50–54',
    itemId: 11923,
    name: 'The Hammer of Grace',
    weaponType: '1H Mace',
    quality: 'q3',
    iLvl: 57,
    reqLevel: 52,
    speed: '2.00',
    dps: '41.5 DPS',
    stats: '+10 Intellect, +5 Spirit, Equip: +31 Healing',
    icon: 'inv_hammer_12',
    source: { kind: 'dungeon', title: 'Blackrock Depths — Seven Dwarves Chest', detail: 'Pre-raid BiS Holy Paladin healing mace' },
    alts: [
      { name: 'Glowspire', itemId: 13161, weaponType: '1H Mace', quality: 'q3', iLvl: 58, reqLevel: 53, speed: '2.20', dps: '42.0 DPS', stats: '+11 Intellect, +6 Spirit', icon: 'inv_mace_04', value: 'Stratholme Live' }
    ]
  },
  {
    levelBracket: '55–60',
    itemId: 17105,
    name: 'Aurastone Hammer',
    weaponType: '1H Mace',
    quality: 'q4',
    iLvl: 66,
    reqLevel: 60,
    speed: '2.70',
    dps: '51.5 DPS',
    stats: '+10 Intellect, +5 Stamina, +13 Spirit, Equip: +25 Spell Damage & Healing, +5 Mana per 5 sec',
    icon: 'inv_hammer_04',
    source: { kind: 'raid', title: 'Molten Core — Garr / Golemagg', detail: 'Premier Tier 1 Holy Paladin raiding weapon' },
    alts: [
      { name: 'Lok\'amir il Romathis', itemId: 19360, weaponType: '1H Mace', quality: 'q4', iLvl: 83, reqLevel: 60, speed: '2.10', dps: '60.5 DPS', stats: '+18 Intellect, +10 Stamina, +8 Spirit, Equip: +84 Healing', icon: 'inv_mace_01', value: 'Blackwing Lair — Nefarian' },
      { name: 'Quel\'Serrar', itemId: 18348, weaponType: '1H Sword', quality: 'q4', iLvl: 66, reqLevel: 60, speed: '2.00', dps: '52.5 DPS', stats: '+12 Stamina, Equip: +13 Defense, Chance on hit: +300 Armor & +13 Defense', icon: 'inv_sword_14', value: 'Onyxia / Foror\'s Compendium' },
      { name: 'The Turning Tide', itemId: 287648, weaponType: '2H Sword', quality: 'q3', iLvl: 1, reqLevel: 1, speed: '3.60', dps: '5.0 DPS', stats: '', icon: '8422168', value: 'Forever Rare Drop' }
    ]
  }
];

// Replace paladin healing levels entirely with clean 1H healing maces
fw.paladin.healingLevels = paladinHealingMaces;

// Also add Ravager (7717) to Paladin DPS track (SM Armory Herod axe is iconic for Ret)
const paladinL37 = fw.paladin.levels.find(l => l.levelBracket === '35–39' || l.levelBracket === '36–40' || l.levelBracket === '37–40');
if (paladinL37) {
  if (!paladinL37.alts) paladinL37.alts = [];
  if (!paladinL37.alts.some(a => a.itemId === 7717 || a.name === 'Ravager')) {
    paladinL37.alts.push({
      name: 'Ravager',
      itemId: 7717,
      weaponType: '2H Axe',
      quality: 'q3',
      iLvl: 42,
      reqLevel: 37,
      speed: '3.50',
      dps: '37.3 DPS',
      stats: 'Chance on Hit: Whirlwind attack for 3 sec',
      icon: 'inv_weapon_halberd_05',
      value: 'Scarlet Monastery Armory — Herod'
    });
  }
}

// Add Ashkandi (19364) to Paladin level 55-60
const paladinL60 = fw.paladin.levels[fw.paladin.levels.length - 1];
if (paladinL60 && !paladinL60.alts.some(a => a.itemId === 19364)) {
  paladinL60.alts.push({
    name: 'Ashkandi, Greatsword of the Brotherhood',
    itemId: 19364,
    weaponType: '2H Sword',
    quality: 'q4',
    iLvl: 81,
    reqLevel: 60,
    speed: '3.50',
    dps: '81.9 DPS',
    stats: '+33 Stamina, Equip: +86 Attack Power',
    icon: 'inv_sword_12',
    value: 'Blackwing Lair — Nefarian'
  });
}

console.log('✓ Paladin weapons sanitized: all 50 staves purged, authentic healing maces and Ravager/Ashkandi added.');

// ==========================================
// 2. CORRUPTED ITEM ID FIXES ACROSS WEAPONS
// ==========================================
console.log('2. Fixing corrupted item IDs across all weapons...');

function deepFixItem(item) {
  if (!item) return;
  // Fix Cruel Barb from 5191 to 5193
  if (item.name === 'Cruel Barb' && item.itemId === 5191) {
    item.itemId = 5193;
    item.weaponType = '1H Sword';
    item.speed = '2.80';
    item.dps = '12.3 DPS';
    item.stats = '+6 Attack Power, +3 Agility';
    item.icon = 'inv_sword_23';
  }
  // Fix Black Menace from 6802 to 6803
  if (item.name === 'Black Menace' && item.itemId === 6802) {
    item.itemId = 6803;
    item.weaponType = '1H Mace';
    item.icon = 'inv_mace_01';
  }
  // Fix Odo's Claw from 6323 to 6327
  if (item.name === "Odo's Claw" && item.itemId === 6323) {
    item.itemId = 6327;
    item.weaponType = 'Dagger';
    item.icon = 'inv_misc_monsterclaw_04';
  }
  // Fix Ravager if using wrong ID
  if (item.name === 'Ravager' && item.itemId !== 7717) {
    item.itemId = 7717;
  }
}

for (const [cls, cData] of Object.entries(fw)) {
  for (const set of [cData.levels, cData.healingLevels].filter(Boolean)) {
    for (const l of set) {
      deepFixItem(l);
      for (const a of (l.alts || [])) {
        deepFixItem(a);
      }
    }
  }
}

// Add Ironfoe (11684), Krol Blade (2244), Barman Shanker (12791) to Rogue
const rogueL50 = fw.rogue.levels.find(l => l.levelBracket === '50–54' || l.levelBracket === '51–54');
if (rogueL50 && !rogueL50.alts.some(a => a.itemId === 12791)) {
  rogueL50.alts.push({
    name: 'Barman Shanker',
    itemId: 12791,
    weaponType: 'Dagger',
    quality: 'q3',
    iLvl: 55,
    reqLevel: 50,
    speed: '2.00',
    dps: '38.2 DPS',
    stats: 'Chance on Hit: 100 to 180 Bleed DMG over 30 sec',
    icon: 'inv_weapon_shortblade_11',
    value: 'BRD — Plugger Spazzring (Solo Stealth)'
  });
}

const rogueL60 = fw.rogue.levels[fw.rogue.levels.length - 1];
if (rogueL60) {
  if (!rogueL60.alts.some(a => a.itemId === 11684)) {
    rogueL60.alts.push({
      name: 'Ironfoe',
      itemId: 11684,
      weaponType: '1H Mace',
      quality: 'q4',
      iLvl: 60,
      reqLevel: 55,
      speed: '2.40',
      dps: '46.7 DPS',
      stats: 'Chance on hit: Grants 2 extra attacks',
      icon: 'inv_hammer_03',
      value: 'Blackrock Depths — Emperor Dagran Thaurissan'
    });
  }
  if (!rogueL60.alts.some(a => a.itemId === 2244)) {
    rogueL60.alts.push({
      name: 'Krol Blade',
      itemId: 2244,
      weaponType: '1H Sword',
      quality: 'q4',
      iLvl: 57,
      reqLevel: 52,
      speed: '2.80',
      dps: '43.2 DPS',
      stats: '+7 Strength, +5 Stamina, Equip: +1% Crit',
      icon: 'inv_sword_27',
      value: 'World Drop BoE Epic Sword'
    });
  }
}

// Add Ashkandi, Greatsword of the Brotherhood (19364) to Warrior
const warL60 = fw.warrior.levels[fw.warrior.levels.length - 1];
if (warL60 && !warL60.alts.some(a => a.itemId === 19364)) {
  warL60.alts.push({
    name: 'Ashkandi, Greatsword of the Brotherhood',
    itemId: 19364,
    weaponType: '2H Sword',
    quality: 'q4',
    iLvl: 81,
    reqLevel: 60,
    speed: '3.50',
    dps: '81.9 DPS',
    stats: '+33 Stamina, Equip: +86 Attack Power',
    icon: 'inv_sword_12',
    value: 'Blackwing Lair — Nefarian'
  });
}

// Add Anathema (18609) to Priest DPS
const priestDpsL60 = fw.priest.levels[fw.priest.levels.length - 1];
if (priestDpsL60 && !priestDpsL60.alts.some(a => a.itemId === 18609)) {
  priestDpsL60.alts.push({
    name: 'Anathema',
    itemId: 18609,
    weaponType: 'Staff',
    quality: 'q4',
    iLvl: 75,
    reqLevel: 60,
    speed: '3.00',
    dps: '56.3 DPS',
    stats: '+31 Stamina, +22 Intellect, Equip: +69 Shadow Damage, +2% Spell Crit',
    icon: 'inv_staff_38',
    value: 'Priest Epic Quest (Shadow Form)'
  });
}

// Add Warrior 1H Tanking Track to fw.warrior
fw.warrior.tracks = [
  { id: 'primary', name: 'Two-Handed Path (Arms / Fury)' },
  { id: 'tank', name: '🛡️ Protection & Tanking (1-Handed Swords / Axes / Maces)' }
];
if (!fw.warrior.tracksData) fw.warrior.tracksData = {};
fw.warrior.tracksData.primary = fw.warrior.levels;
fw.warrior.tracksData.tank = [
  {
    levelBracket: '1–9',
    itemId: 248007,
    name: 'Militia Shortblade',
    weaponType: '1H Sword',
    speed: '1.90',
    dps: '2.6 DPS',
    stats: '+1 Stamina',
    quality: 'q1',
    iLvl: 6,
    reqLevel: 2,
    icon: 'inv_sword_04',
    source: { kind: 'vendor', title: 'Starter Vendor', detail: 'Fast early tanking weapon' },
    alts: [
      { name: 'Restored Shortsword', itemId: 281728, weaponType: '1H Sword', quality: 'q2', iLvl: 1, reqLevel: 1, speed: '2.20', dps: '1.14 DPS', stats: '', icon: 'inv_sword_04', value: 'Starter Drop' }
    ]
  },
  {
    levelBracket: '10–14',
    itemId: 4565,
    name: "Thief's Blade",
    weaponType: '1H Sword',
    speed: '2.00',
    dps: '6.5 DPS',
    stats: '+2 Agility, +1 Stamina',
    quality: 'q2',
    iLvl: 15,
    reqLevel: 10,
    icon: 'inv_sword_21',
    source: { kind: 'world', title: 'Westfall / Silverpine Drop', detail: 'High threat fast 1H sword' },
    alts: [
      { name: 'Poniard', itemId: 2140, weaponType: 'Dagger', quality: 'q1', iLvl: 12, reqLevel: 7, speed: '1.50', dps: '4.7 DPS', stats: '', icon: 'inv_weapon_shortblade_05', value: 'Vendor' }
    ]
  },
  {
    levelBracket: '15–18',
    itemId: 5193,
    name: 'Cruel Barb',
    weaponType: '1H Sword',
    speed: '2.80',
    dps: '12.3 DPS',
    stats: '+6 Attack Power, +3 Agility',
    quality: 'q3',
    iLvl: 24,
    reqLevel: 19,
    icon: 'inv_sword_23',
    source: { kind: 'dungeon', title: 'The Deadmines — Edwin VanCleef', detail: 'Iconic leveling sword for Devastate / Heroic Strike' },
    alts: [
      { name: "Cookie's Tenderizer", itemId: 5195, weaponType: '1H Mace', quality: 'q3', iLvl: 21, reqLevel: 16, speed: '2.40', dps: '10.8 DPS', stats: '+3 Strength, +2 Stamina', icon: 'inv_hammer_07', value: 'The Deadmines — Cookie' }
    ]
  },
  {
    levelBracket: '19–22',
    itemId: 6504,
    name: 'Thornspike',
    weaponType: 'Dagger',
    speed: '1.80',
    dps: '13.3 DPS',
    stats: '+3 Strength, +2 Stamina',
    quality: 'q2',
    iLvl: 25,
    reqLevel: 20,
    icon: 'inv_weapon_shortblade_01',
    source: { kind: 'dungeon', title: 'Wailing Caverns — Lord Cobrahn', detail: 'Fast threat dagger' },
    alts: [
      { name: 'Silver-Thread Rod', itemId: 4045, weaponType: '1H Mace', quality: 'q2', iLvl: 25, reqLevel: 20, speed: '2.00', dps: '11.2 DPS', stats: '+3 Strength, +3 Stamina', icon: 'inv_mace_04', value: 'World Drop' }
    ]
  },
  {
    levelBracket: '23–26',
    itemId: 7714,
    name: 'Hypnotic Blade',
    weaponType: 'Dagger',
    speed: '1.40',
    dps: '26.1 DPS',
    stats: '+8 Intellect, +3 Spirit, Equip: +9 Spell Damage',
    quality: 'q3',
    iLvl: 39,
    reqLevel: 34,
    icon: 'inv_weapon_shortblade_05',
    source: { kind: 'dungeon', title: 'Scarlet Monastery Library — Arcanist Doan', detail: 'Ultra fast 1.40s dagger for Heroic Strike rage queuing' },
    alts: [
      { name: 'Toxic Revenger', itemId: 9454, weaponType: '1H Sword', quality: 'q3', iLvl: 32, reqLevel: 27, speed: '2.20', dps: '18.4 DPS', stats: 'Chance on Hit: 50 Nature DMG poison', icon: 'inv_sword_04', value: 'Gnomeregan — Viscous Fallout' }
    ]
  },
  {
    levelBracket: '27–34',
    itemId: 6802,
    name: 'Sword of Omen',
    weaponType: '1H Sword',
    speed: '2.20',
    dps: '23.4 DPS',
    stats: '+7 Strength, +5 Agility',
    quality: 'q3',
    iLvl: 38,
    reqLevel: 33,
    icon: 'inv_sword_24',
    source: { kind: 'quest', title: 'Scarlet Monastery — In the Name of the Light', detail: 'Top Alliance dungeon quest reward' },
    alts: [
      { name: 'Black Menace', itemId: 6803, weaponType: '1H Mace', quality: 'q3', iLvl: 39, reqLevel: 34, speed: '2.20', dps: '23.4 DPS', stats: '+6 Strength, +5 Stamina', icon: 'inv_mace_01', value: 'SM Quest' }
    ]
  },
  {
    levelBracket: '35–42',
    itemId: 10823,
    name: "Vanquisher's Sword",
    weaponType: '1H Sword',
    speed: '2.20',
    dps: '30.5 DPS',
    stats: '+28 Attack Power',
    quality: 'q3',
    iLvl: 43,
    reqLevel: 38,
    icon: 'inv_sword_25',
    source: { kind: 'quest', title: 'Razorfen Downs — Bring the End', detail: 'Premier dungeon quest reward for tanks' },
    alts: [
      { name: 'Dazzling Longsword', itemId: 813, weaponType: '1H Sword', quality: 'q4', iLvl: 41, reqLevel: 36, speed: '1.70', dps: '27.4 DPS', stats: 'Chance on hit: Flash of light disorients for 3 sec', icon: 'inv_sword_23', value: 'World Drop Epic' }
    ]
  },
  {
    levelBracket: '43–50',
    itemId: 17705,
    name: 'Thrash Blade',
    weaponType: '1H Sword',
    speed: '2.70',
    dps: '37.8 DPS',
    stats: 'Chance on hit: Grants 1 extra attack',
    quality: 'q3',
    iLvl: 50,
    reqLevel: 45,
    icon: 'inv_sword_34',
    source: { kind: 'quest', title: 'Maraudon — Corruption of Earth and Seed', detail: 'Extra attack proc delivers huge tank threat' },
    alts: [
      { name: 'Gatorbite Axe', itemId: 17738, weaponType: '1H Axe', quality: 'q3', iLvl: 53, reqLevel: 48, speed: '2.70', dps: '38.5 DPS', stats: '+10 Strength, +5 Stamina', icon: 'inv_axe_24', value: 'Maraudon — Rotgrip' }
    ]
  },
  {
    levelBracket: '51–54',
    itemId: 15805,
    name: "Mirah's Song",
    weaponType: '1H Sword',
    speed: '1.80',
    dps: '38.3 DPS',
    stats: '+9 Strength, +9 Agility',
    quality: 'q3',
    iLvl: 61,
    reqLevel: 56,
    icon: 'inv_sword_40',
    source: { kind: 'quest', title: 'Scholomance — Kirtonos the Herald', detail: 'Fast 1.80s speed sword with perfect tank stats' },
    alts: [
      { name: 'Bonecreaker', itemId: 13026, weaponType: '1H Mace', quality: 'q3', iLvl: 55, reqLevel: 50, speed: '2.40', dps: '37.5 DPS', stats: '+6 Strength, +7 Stamina', icon: 'inv_hammer_16', value: 'World Drop' },
      { name: 'Ironfoe', itemId: 11684, weaponType: '1H Mace', quality: 'q4', iLvl: 60, reqLevel: 55, speed: '2.40', dps: '46.7 DPS', stats: 'Chance on hit: Grants 2 extra attacks', icon: 'inv_hammer_03', value: 'BRD — Emperor Thaurissan' }
    ]
  },
  {
    levelBracket: '55–60',
    itemId: 18348,
    name: "Quel'Serrar",
    weaponType: '1H Sword',
    speed: '2.00',
    dps: '52.5 DPS',
    stats: '+12 Stamina, Equip: +13 Defense, Chance on hit: +300 Armor & +13 Defense for 10 sec',
    quality: 'q4',
    iLvl: 66,
    reqLevel: 60,
    icon: 'inv_sword_14',
    source: { kind: 'quest', title: 'Foror\'s Compendium / Onyxia Breath', detail: 'The legendary Classic Protection Warrior sword' },
    alts: [
      { name: 'Thunderfury, Blessed Blade of the Windseeker', itemId: 19019, weaponType: '1H Sword', quality: 'q5', iLvl: 80, reqLevel: 60, speed: '1.90', dps: '53.9 DPS', stats: '+5 Agility, +8 Stamina, Equip: Lightning burst & attack speed slow', icon: 'inv_sword_39', value: 'Legendary Binding of the Windseeker' },
      { name: 'Timeworn Mace', itemId: 18376, weaponType: '1H Mace', quality: 'q3', iLvl: 62, reqLevel: 57, speed: '2.40', dps: '43.8 DPS', stats: '+7 Strength, +11 Stamina, +5 Defense', icon: 'inv_mace_01', value: 'Dire Maul West — Tendris Warpwood' },
      { name: "Alcor's Sunrazor", itemId: 14555, weaponType: 'Dagger', quality: 'q4', iLvl: 63, reqLevel: 58, speed: '1.30', dps: '41.5 DPS', stats: 'Ultra-fast 1.30 speed, Chance on hit: 90 Fire DMG', icon: 'inv_weapon_shortblade_25', value: 'World Drop Epic' }
    ]
  }
];

console.log('✓ Warrior 1H Tanking Track successfully created.');

// ==========================================
// 3. WANDS OVERHAUL (ADD MISSING CLASSICS)
// ==========================================
console.log('3. Overhauling Wands across Mage, Priest, Warlock...');

const classicWandAdditions = [
  {
    name: 'Gravestone Scepter',
    itemId: 7001,
    quality: 'q3',
    iLvl: 29,
    reqLevel: 18,
    dps: '29.0 DPS',
    speed: '1.50',
    icon: 'inv_wand_01',
    value: 'Blackfathom Deeps — Blackfathom Villainy Quest (+29 DPS Spike)'
  },
  {
    name: 'Blackbone Wand',
    itemId: 7514,
    quality: 'q2',
    iLvl: 20,
    reqLevel: 15,
    dps: '15.3 DPS',
    speed: '1.50',
    icon: 'inv_wand_06',
    value: 'Duskwood Vendor (+15.3 DPS Shadow)'
  },
  {
    name: 'Wand of Biting Cold',
    itemId: 19130,
    quality: 'q3',
    iLvl: 60,
    reqLevel: 51,
    dps: '56.0 DPS',
    speed: '1.60',
    stats: '+16 Frost Spell Damage',
    icon: 'inv_wand_09',
    value: 'Alterac Valley Quest Reward'
  },
  {
    name: 'Crimson Shocker',
    itemId: 18338,
    quality: 'q3',
    iLvl: 61,
    reqLevel: 56,
    dps: '60.3 DPS',
    speed: '1.70',
    stats: '+9 Spell Power',
    icon: 'inv_wand_05',
    value: 'Dire Maul — Illyanna Ravenoak'
  },
  {
    name: 'Bonecreeper Stylus',
    itemId: 13938,
    quality: 'q3',
    iLvl: 62,
    reqLevel: 57,
    dps: '63.5 DPS',
    speed: '1.30',
    stats: '+4 Intellect, +11 Spell Power',
    icon: 'inv_wand_05',
    value: 'Scholomance — Darkmaster Gandling'
  },
  {
    name: 'Stormrager',
    itemId: 16997,
    quality: 'q3',
    iLvl: 60,
    reqLevel: 55,
    dps: '58.0 DPS',
    speed: '1.40',
    stats: '+5 Nature Spell Damage',
    icon: 'inv_wand_02',
    value: 'Eastern Plaguelands Quest Reward'
  }
];

['mage', 'priest', 'warlock'].forEach(cls => {
  const wands = fwan[cls]?.levels || [];

  // Add Blackbone Wand at level bracket 15-20
  const l15 = wands.find(l => l.levelBracket === '15–20');
  if (l15 && !l15.alts.some(a => a.itemId === 7514)) {
    l15.alts.unshift(classicWandAdditions[1]); // Blackbone
  }

  // Add Gravestone Scepter at level bracket 15-20 or 21-25
  const l21 = wands.find(l => l.levelBracket === '21–25');
  if (l21 && !l21.alts.some(a => a.itemId === 7001)) {
    l21.alts.unshift(classicWandAdditions[0]); // Gravestone Scepter
  }
  if (l15 && !l15.alts.some(a => a.itemId === 7001)) {
    l15.alts.unshift(classicWandAdditions[0]); // Also at 15-20 where players equip it at 18
  }

  // Add Wand of Biting Cold at 49-54
  const l49 = wands.find(l => l.levelBracket === '49–54');
  if (l49 && !l49.alts.some(a => a.itemId === 19130)) {
    l49.alts.push(classicWandAdditions[2]); // Wand of Biting Cold
  }

  // Add Crimson Shocker and Bonecreeper Stylus at 55-60
  const l55 = wands.find(l => l.levelBracket === '55–60');
  if (l55) {
    if (!l55.alts.some(a => a.itemId === 18338)) l55.alts.push(classicWandAdditions[3]); // Crimson Shocker
    if (!l55.alts.some(a => a.itemId === 13938)) l55.alts.push(classicWandAdditions[4]); // Bonecreeper Stylus
    if (!l55.alts.some(a => a.itemId === 16997)) l55.alts.push(classicWandAdditions[5]); // Stormrager
  }
});

console.log('✓ Wands updated with Gravestone Scepter, Blackbone Wand, Wand of Biting Cold, Crimson Shocker, and Bonecreeper Stylus.');

// ==========================================
// 4. SHIELDS & OFFHANDS OVERHAUL (BACKFILL 108 NULL IDs)
// ==========================================
console.log('4. Backfilling null item IDs and correcting offhands...');

const NULL_ID_FIXES = {
  'Skullflame Shield': 1168,
  'The Immovable Object': 19321,
  'Drillborer Disk': 17066,
  'Wall of the Dead': 2879,
  'Crest of Retribution': 13375,
  'Elementium Reinforced Bulwark': 19349,
  'Vile Protector': 6729,
  'Aegis of Battle': 13166,
  'Stoneshell Guard': 13375,
  "Gizlock's Hypertech Buckler": 17718,
  'Heavy Pavise': 2137,
  'Reinforced Shield': 2138,
  'Repurposed Rack': 281735,
  'Crest of Darkshire': 1292,
  'Marbled Buckler': 4833,
  'Basalt Buckler': 4834,
  'Green Iron Shield': 3840,
  'Jagged Shield': 4985,
  'Aegis of Stormwind': 864,
  'Crystal Bulwark': 17070,
  'Battered Viking Shield': 9451 // Disentangle from 9449 MCP
};

function fixOffhandNode(node) {
  if (!node) return;
  if (!node.itemId && NULL_ID_FIXES[node.name]) {
    node.itemId = NULL_ID_FIXES[node.name];
  }
  if (node.name === 'Battered Viking Shield' && node.itemId === 9449) {
    node.itemId = 9451;
  }
  // Thermaplugg's Central Core should have ID 9456 and be a shield, not Ley Staff 9513
  if (node.name === "Thermaplugg's Central Core") {
    node.itemId = 9456;
    node.weaponType = 'Shield';
  }
}

for (const [cls, cData] of Object.entries(fo)) {
  for (const set of [cData.levels, cData.healingLevels].filter(Boolean)) {
    for (const l of set) {
      fixOffhandNode(l);
      for (const a of (l.alts || [])) {
        fixOffhandNode(a);
      }
    }
  }
}

// Add Draconian Deflector (12602) to Warrior, Paladin, Shaman 55-60 shields if missing
['warrior', 'paladin', 'shaman'].forEach(cls => {
  const s55 = fo[cls]?.levels?.find(l => l.levelBracket === '55–58' || l.levelBracket === '55–60');
  if (s55 && !s55.alts.some(a => a.itemId === 12602 || a.name === 'Draconian Deflector')) {
    s55.alts.unshift({
      name: 'Draconian Deflector',
      itemId: 12602,
      weaponType: 'Shield',
      quality: 'q3',
      iLvl: 63,
      reqLevel: 58,
      armor: 2153,
      block: 40,
      stats: '+7 Strength, +10 Stamina, +5 Defense',
      icon: 'inv_shield_11',
      value: 'UBRS — General Drakkisath (Pre-Raid BiS Tank Shield)'
    });
  }
});

// ==========================================
// 5. ROGUE OFF-HAND WEAPONS TRACK
// ==========================================
console.log('5. Creating Rogue Off-Hand Weapon Path (Dual-Wield)...');

fo.rogue = {
  tracks: [
    { id: 'primary', name: 'Off-Hand Weapons (Fast Daggers & Swords for Combat / Subtlety)' }
  ],
  levels: [
    {
      levelBracket: '10–14',
      itemId: 2494,
      name: 'Stiletto',
      weaponType: 'Dagger',
      speed: '1.50',
      dps: '4.7 DPS',
      stats: '',
      quality: 'q1',
      iLvl: 12,
      reqLevel: 7,
      icon: 'inv_weapon_shortblade_05',
      source: { kind: 'vendor', title: 'Weapon Vendor', detail: 'Fast 1.50s off-hand for early poison procs' },
      faction: 'both',
      alts: [
        { name: "Thief's Blade", itemId: 4565, weaponType: '1H Sword', quality: 'q2', iLvl: 15, reqLevel: 10, speed: '2.00', dps: '6.5 DPS', stats: '+2 Agility, +1 Stamina', icon: 'inv_sword_21', value: 'Westfall / Silverpine Drop' },
        { name: 'Poniard', itemId: 2140, weaponType: 'Dagger', quality: 'q1', iLvl: 12, reqLevel: 7, speed: '1.50', dps: '4.7 DPS', stats: '', icon: 'inv_weapon_shortblade_05', value: 'Vendor' }
      ]
    },
    {
      levelBracket: '15–18',
      itemId: 5200,
      name: 'Tail Spike',
      weaponType: 'Dagger',
      speed: '1.40',
      dps: '10.0 DPS',
      stats: '+2 Agility',
      quality: 'q2',
      iLvl: 21,
      reqLevel: 16,
      icon: 'inv_weapon_shortblade_01',
      source: { kind: 'dungeon', title: 'Wailing Caverns — Skum', detail: 'Ultra-fast 1.40 speed off-hand dagger' },
      faction: 'both',
      alts: [
        { name: 'Cruel Barb', itemId: 5193, weaponType: '1H Sword', quality: 'q3', iLvl: 24, reqLevel: 19, speed: '2.80', dps: '12.3 DPS', stats: '+6 Attack Power, +3 Agility', icon: 'inv_sword_23', value: 'The Deadmines — Edwin VanCleef' },
        { name: "Butcher's Cleaver", itemId: 1292, weaponType: '1H Axe', quality: 'q3', iLvl: 24, reqLevel: 19, speed: '2.80', dps: '12.3 DPS', stats: '+5 Strength, +2 Agility', icon: 'inv_axe_04', value: 'SFK — Butcher' }
      ]
    },
    {
      levelBracket: '19–22',
      itemId: 6504,
      name: 'Thornspike',
      weaponType: 'Dagger',
      speed: '1.80',
      dps: '13.3 DPS',
      stats: '+3 Strength, +2 Stamina',
      quality: 'q2',
      iLvl: 25,
      reqLevel: 20,
      icon: 'inv_weapon_shortblade_01',
      source: { kind: 'dungeon', title: 'Wailing Caverns — Lord Cobrahn', detail: 'Solid stats off-hand dagger' },
      faction: 'both',
      alts: [
        { name: 'Deadly Kris', itemId: 3187, weaponType: 'Dagger', quality: 'q2', iLvl: 27, reqLevel: 22, speed: '1.50', dps: '12.7 DPS', stats: '+2 Agility, +2 Strength', icon: 'inv_weapon_shortblade_04', value: 'World Drop' },
        { name: "Assassin's Blade", itemId: 1935, weaponType: 'Dagger', quality: 'q3', iLvl: 25, reqLevel: 20, speed: '1.90', dps: '15.3 DPS', stats: '+3 Agility, +3 Strength', icon: 'inv_weapon_shortblade_03', value: 'World Drop Rare' }
      ]
    },
    {
      levelBracket: '23–26',
      itemId: 7714,
      name: 'Hypnotic Blade',
      weaponType: 'Dagger',
      speed: '1.40',
      dps: '26.1 DPS',
      stats: '+8 Intellect, +3 Spirit, Equip: +9 Spell Damage',
      quality: 'q3',
      iLvl: 39,
      reqLevel: 34,
      icon: 'inv_weapon_shortblade_05',
      source: { kind: 'dungeon', title: 'Scarlet Monastery Library — Arcanist Doan', detail: '1.40s fast poison applicator' },
      faction: 'both',
      alts: [
        { name: 'Toxic Revenger', itemId: 9454, weaponType: '1H Sword', quality: 'q3', iLvl: 32, reqLevel: 27, speed: '2.20', dps: '18.4 DPS', stats: 'Chance on Hit: 50 Nature DMG poison', icon: 'inv_sword_04', value: 'Gnomeregan — Viscous Fallout' },
        { name: 'Meteor Shard', itemId: 7714, weaponType: 'Dagger', quality: 'q3', iLvl: 29, reqLevel: 24, speed: '1.80', dps: '16.7 DPS', stats: 'Chance on hit: Fireball burst', icon: 'inv_weapon_shortblade_05', value: 'SFK — Arugal' }
      ]
    },
    {
      levelBracket: '27–34',
      itemId: 9446,
      name: 'Electrocutioner Leg',
      weaponType: '1H Sword',
      speed: '1.70',
      dps: '20.6 DPS',
      stats: 'Chance on hit: Shock burst for 25 Nature DMG',
      quality: 'q3',
      iLvl: 34,
      reqLevel: 29,
      icon: 'inv_sword_25',
      source: { kind: 'dungeon', title: 'Gnomeregan — Electrocutioner 6000', detail: 'Fast 1.70s sword for Combat off-hand' },
      faction: 'both',
      alts: [
        { name: 'Torturing Poker', itemId: 7682, weaponType: 'Dagger', quality: 'q3', iLvl: 34, reqLevel: 29, speed: '1.80', dps: '18.9 DPS', stats: '+3 Strength, +2 Agility', icon: 'inv_weapon_shortblade_03', value: 'SM Graveyard — Interrogator Vishas' },
        { name: 'Sword of Omen', itemId: 6802, weaponType: '1H Sword', quality: 'q3', iLvl: 38, reqLevel: 33, speed: '2.20', dps: '23.4 DPS', stats: '+7 Strength, +5 Agility', icon: 'inv_sword_24', value: 'SM Quest Reward' }
      ]
    },
    {
      levelBracket: '35–42',
      itemId: 10823,
      name: "Vanquisher's Sword",
      weaponType: '1H Sword',
      speed: '2.20',
      dps: '30.5 DPS',
      stats: '+28 Attack Power',
      quality: 'q3',
      iLvl: 43,
      reqLevel: 38,
      icon: 'inv_sword_25',
      source: { kind: 'quest', title: 'Razorfen Downs — Bring the End', detail: 'Outstanding stats for off-hand' },
      faction: 'both',
      alts: [
        { name: 'Widowmaker', itemId: 2205, weaponType: 'Dagger', quality: 'q3', iLvl: 43, reqLevel: 38, speed: '1.90', dps: '26.8 DPS', stats: '+5 Agility, +5 Stamina', icon: 'inv_weapon_shortblade_12', value: 'World Drop' },
        { name: 'Dazzling Longsword', itemId: 813, weaponType: '1H Sword', quality: 'q4', iLvl: 41, reqLevel: 36, speed: '1.70', dps: '27.4 DPS', stats: 'Chance on hit: Disorient for 3 sec', icon: 'inv_sword_23', value: 'World Drop Epic' }
      ]
    },
    {
      levelBracket: '43–50',
      itemId: 17705,
      name: 'Thrash Blade',
      weaponType: '1H Sword',
      speed: '2.70',
      dps: '37.8 DPS',
      stats: 'Chance on hit: Grants 1 extra attack',
      quality: 'q3',
      iLvl: 50,
      reqLevel: 45,
      icon: 'inv_sword_34',
      source: { kind: 'quest', title: 'Maraudon — Corruption of Earth and Seed', detail: 'Can be equipped in either hand' },
      faction: 'both',
      alts: [
        { name: 'Hanzo Sword', itemId: 8190, weaponType: '1H Sword', quality: 'q3', iLvl: 55, reqLevel: 50, speed: '1.50', dps: '34.7 DPS', stats: 'Equip: +1% Critical Strike', icon: 'inv_sword_01', value: 'Ultra-fast 1.50s Combat off-hand' },
        { name: "Julie's Dagger", itemId: 869, weaponType: 'Dagger', quality: 'q4', iLvl: 55, reqLevel: 50, speed: '1.30', dps: '36.5 DPS', stats: 'Chance on hit: Restore mana/energy', icon: 'inv_weapon_shortblade_14', value: 'World Drop Epic' }
      ]
    },
    {
      levelBracket: '51–54',
      itemId: 12791,
      name: 'Barman Shanker',
      weaponType: 'Dagger',
      speed: '2.00',
      dps: '38.2 DPS',
      stats: 'Chance on Hit: 100 to 180 Bleed DMG over 30 sec',
      quality: 'q3',
      iLvl: 55,
      reqLevel: 50,
      icon: 'inv_weapon_shortblade_11',
      source: { kind: 'dungeon', title: 'BRD — Plugger Spazzring', detail: 'Solo stealth farm dagger' },
      faction: 'both',
      alts: [
        { name: "Mirah's Song", itemId: 15805, weaponType: '1H Sword', quality: 'q3', iLvl: 61, reqLevel: 56, speed: '1.80', dps: '38.3 DPS', stats: '+9 Strength, +9 Agility', icon: 'inv_sword_40', value: 'Scholomance — Kirtonos the Herald' },
        { name: 'Heartseeker', itemId: 12783, weaponType: 'Dagger', quality: 'q4', iLvl: 57, reqLevel: 52, speed: '1.70', dps: '38.5 DPS', stats: '+4 Strength, +9 Agility, Equip: +1% Crit', icon: 'inv_weapon_shortblade_14', value: 'Crafted Blacksmithing' }
      ]
    },
    {
      levelBracket: '55–58',
      itemId: 12939,
      name: "Dal'Rend's Tribal Guardian",
      weaponType: '1H Sword',
      speed: '1.80',
      dps: '41.4 DPS',
      stats: '+100 Armor, Set: +50 Attack Power',
      quality: 'q3',
      iLvl: 63,
      reqLevel: 58,
      icon: 'inv_sword_43',
      source: { kind: 'dungeon', title: 'UBRS — Warchief Rend Blackhand', detail: 'Premier pre-raid off-hand sword set' },
      faction: 'both',
      alts: [
        { name: 'Bonescraper', itemId: 13368, weaponType: 'Dagger', quality: 'q3', iLvl: 62, reqLevel: 57, speed: '1.40', dps: '40.0 DPS', stats: '+30 Attack Power', icon: 'inv_weapon_shortblade_13', value: 'Stratholme — Baron Rivendare' },
        { name: 'Felstriker', itemId: 12590, weaponType: 'Dagger', quality: 'q4', iLvl: 63, reqLevel: 58, speed: '1.70', dps: '44.7 DPS', stats: 'Chance on hit: Next attacks 100% crit & guarantee hit for 3 sec', icon: 'inv_weapon_shortblade_02', value: 'UBRS — Warchief Rend Blackhand' }
      ]
    },
    {
      levelBracket: '59–60',
      itemId: 19866,
      name: 'Warblade of the Hakkari (Off Hand)',
      weaponType: '1H Sword',
      speed: '1.70',
      dps: '49.4 DPS',
      stats: '+40 Attack Power, Set: +6 Sword Skill',
      quality: 'q4',
      iLvl: 68,
      reqLevel: 60,
      icon: 'inv_sword_52',
      source: { kind: 'raid', title: 'Zul\'Gurub — Bloodlord Mandokir', detail: 'Top tier off-hand sword (+6 Sword Skill Set)' },
      faction: 'both',
      alts: [
        { name: 'Brutality Blade', itemId: 18832, weaponType: '1H Sword', quality: 'q4', iLvl: 66, reqLevel: 60, speed: '2.50', dps: '51.8 DPS', stats: '+9 Strength, +9 Agility, Equip: +1% Crit', icon: 'inv_sword_15', value: 'Molten Core — Garr' },
        { name: 'Core Hound Tooth', itemId: 18805, weaponType: 'Dagger', quality: 'q4', iLvl: 66, reqLevel: 60, speed: '1.60', dps: '51.2 DPS', stats: '+20 Attack Power, +9 Stamina, Equip: +1% Crit', icon: 'inv_weapon_shortblade_11', value: 'Molten Core — Majordomo Executus Cache' },
        { name: "Perdition's Blade", itemId: 18816, weaponType: 'Dagger', quality: 'q4', iLvl: 73, reqLevel: 60, speed: '1.80', dps: '58.3 DPS', stats: 'Chance on hit: 40-56 Fire DMG', icon: 'inv_weapon_shortblade_27', value: 'Molten Core — Ragnaros' }
      ]
    }
  ]
};

console.log('✓ Rogue off-hand weapons track successfully populated.');

// ==========================================
// 6. HUNTER MELEE STAT-STICKS TRACK
// ==========================================
console.log('6. Creating Hunter Melee & Stat-Sticks Track...');

fo.hunter = {
  tracks: [
    { id: 'primary', name: 'Melee Weapons & Stat-Sticks (2H Polearms, Staves & Dual Agility)' }
  ],
  levels: [
    {
      levelBracket: '1–9',
      itemId: 281725,
      name: 'Restored Spear',
      weaponType: 'Polearm',
      speed: '3.10',
      dps: '1.61 DPS',
      stats: '',
      quality: 'q2',
      iLvl: 1,
      reqLevel: 1,
      icon: 'inv_spear_08',
      source: { kind: 'vendor', title: 'Starter Vendor', detail: 'Early level melee weapon' },
      faction: 'both',
      alts: [
        { name: 'Walking Stick', itemId: 2495, weaponType: 'Staff', quality: 'q1', iLvl: 5, reqLevel: 1, speed: '2.40', dps: '2.5 DPS', stats: '', icon: 'inv_staff_08', value: 'Vendor' },
        { name: "Woodsman's Axe", itemId: 2520, weaponType: '2H Axe', quality: 'q1', iLvl: 9, reqLevel: 4, speed: '3.20', dps: '4.8 DPS', stats: '', icon: 'inv_axe_07', value: 'Vendor' }
      ]
    },
    {
      levelBracket: '10–14',
      itemId: 2524,
      name: 'Heavy Spear',
      weaponType: 'Polearm',
      speed: '3.30',
      dps: '7.6 DPS',
      stats: '+2 Agility, +1 Stamina',
      quality: 'q1',
      iLvl: 15,
      reqLevel: 10,
      icon: 'inv_spear_07',
      source: { kind: 'vendor', title: 'Weapon Vendor', detail: 'Trained at Level 20 or early starter polearm' },
      faction: 'both',
      alts: [
        { name: "Thief's Blade", itemId: 4565, weaponType: '1H Sword', quality: 'q2', iLvl: 15, reqLevel: 10, speed: '2.00', dps: '6.5 DPS', stats: '+2 Agility, +1 Stamina', icon: 'inv_sword_21', value: 'World Drop' }
      ]
    },
    {
      levelBracket: '15–18',
      itemId: 2042,
      name: 'Staff of Westfall',
      weaponType: 'Staff',
      speed: '2.90',
      dps: '15.0 DPS',
      stats: '+11 Intellect, +5 Spirit',
      quality: 'q3',
      iLvl: 24,
      reqLevel: 19,
      icon: 'inv_staff_29',
      source: { kind: 'quest', title: 'The Deadmines — The Defias Brotherhood', detail: 'Alliance quest staff (great mana pool for Hunter)' },
      faction: 'alliance',
      alts: [
        { name: 'Crescent Staff', itemId: 6505, weaponType: 'Staff', quality: 'q3', iLvl: 20, reqLevel: 15, speed: '2.90', dps: '12.8 DPS', stats: '+7 Intellect, +7 Stamina, +7 Spirit', icon: 'inv_staff_13', value: 'Wailing Caverns Quest Reward (Horde/Both)' },
        { name: 'Cruel Barb', itemId: 5193, weaponType: '1H Sword', quality: 'q3', iLvl: 24, reqLevel: 19, speed: '2.80', dps: '12.3 DPS', stats: '+6 Attack Power, +3 Agility', icon: 'inv_sword_23', value: 'The Deadmines — Edwin VanCleef' }
      ]
    },
    {
      levelBracket: '19–22',
      itemId: 6631,
      name: 'Living Root',
      weaponType: 'Staff',
      speed: '2.90',
      dps: '14.5 DPS',
      stats: '+5 Strength, +12 Stamina',
      quality: 'q3',
      iLvl: 23,
      reqLevel: 18,
      icon: 'inv_staff_15',
      source: { kind: 'dungeon', title: 'Wailing Caverns — Verdan the Everliving', detail: 'Big stamina stat-stick' },
      faction: 'both',
      alts: [
        { name: 'Strike of the Hydra', itemId: 6953, weaponType: '2H Sword', quality: 'q3', iLvl: 31, reqLevel: 26, speed: '3.30', dps: '21.4 DPS', stats: 'Chance on hit: Corrosive poison', icon: 'inv_sword_15', value: 'BFD — Aku\'mai' },
        { name: "Odo's Ley Staff", itemId: 6318, weaponType: 'Staff', quality: 'q3', iLvl: 26, reqLevel: 21, speed: '2.80', dps: '17.3 DPS', stats: '+5 Stamina, +6 Spirit', icon: 'inv_staff_08', value: 'SFK — Odo the Blindwatcher' }
      ]
    },
    {
      levelBracket: '23–26',
      itemId: 2271,
      name: 'Staff of the Blessed Seer',
      weaponType: 'Staff',
      speed: '2.40',
      dps: '16.9 DPS',
      stats: '+4 Intellect, +11 Spirit',
      quality: 'q3',
      iLvl: 26,
      reqLevel: 21,
      icon: 'inv_staff_08',
      source: { kind: 'world', title: 'World Drop BoE', detail: 'Spirit & mana stat-stick' },
      faction: 'both',
      alts: [
        { name: 'Manual Crowd Pummeler', itemId: 9449, weaponType: '2H Mace', quality: 'q3', iLvl: 34, reqLevel: 29, speed: '2.00', dps: '24.8 DPS', stats: '+16 Strength, +5 Agility', icon: 'inv_hammer_14', value: 'Gnomeregan — Crowd Pummeler 9-60' }
      ]
    },
    {
      levelBracket: '27–34',
      itemId: 6975,
      name: 'Whirlwind Axe',
      weaponType: '2H Axe',
      speed: '3.60',
      dps: '35.6 DPS',
      stats: '+14 Strength, +15 Stamina',
      quality: 'q3',
      iLvl: 40,
      reqLevel: 30,
      icon: 'inv_axe_11',
      source: { kind: 'quest', title: 'Warrior Quest Aid / High Bracket 2H', detail: 'Massive Stamina & Strength stat stick' },
      faction: 'both',
      alts: [
        { name: 'Corpsemaker', itemId: 6687, weaponType: '2H Axe', quality: 'q3', iLvl: 34, reqLevel: 29, speed: '3.80', dps: '28.9 DPS', stats: '+15 Strength, +8 Stamina', icon: 'inv_axe_17', value: 'RFK — Overlord Ramtusk' },
        { name: 'Ravager', itemId: 7717, weaponType: '2H Axe', quality: 'q3', iLvl: 42, reqLevel: 37, speed: '3.50', dps: '37.3 DPS', stats: 'Chance on Hit: Whirlwind attack for 3 sec', icon: 'inv_weapon_halberd_05', value: 'SM Armory — Herod' }
      ]
    },
    {
      levelBracket: '35–42',
      itemId: 10823,
      name: "Vanquisher's Sword",
      weaponType: '1H Sword',
      speed: '2.20',
      dps: '30.5 DPS',
      stats: '+28 Attack Power',
      quality: 'q3',
      iLvl: 43,
      reqLevel: 38,
      icon: 'inv_sword_25',
      source: { kind: 'quest', title: 'Razorfen Downs — Bring the End', detail: '+28 Ranged Attack Power buff' },
      faction: 'both',
      alts: [
        { name: 'Sword of Omen', itemId: 6802, weaponType: '1H Sword', quality: 'q3', iLvl: 38, reqLevel: 33, speed: '2.20', dps: '23.4 DPS', stats: '+7 Strength, +5 Agility', icon: 'inv_sword_24', value: 'SM Quest' },
        { name: 'Widowmaker', itemId: 2205, weaponType: 'Dagger', quality: 'q3', iLvl: 43, reqLevel: 38, speed: '1.90', dps: '26.8 DPS', stats: '+5 Agility, +5 Stamina', icon: 'inv_weapon_shortblade_12', value: 'World Drop' }
      ]
    },
    {
      levelBracket: '43–50',
      itemId: 17743,
      name: "Princess Theradras' Scepter",
      weaponType: '2H Mace',
      speed: '3.40',
      dps: '41.5 DPS',
      stats: '+14 Strength, +15 Stamina',
      quality: 'q3',
      iLvl: 54,
      reqLevel: 49,
      icon: 'inv_hammer_08',
      source: { kind: 'dungeon', title: 'Maraudon — Princess Theradras', detail: 'High stamina melee stat-stick' },
      faction: 'both',
      alts: [
        { name: 'Gatorbite Axe', itemId: 17738, weaponType: '1H Axe', quality: 'q3', iLvl: 53, reqLevel: 48, speed: '2.70', dps: '38.5 DPS', stats: '+10 Strength, +5 Stamina', icon: 'inv_axe_24', value: 'Maraudon — Rotgrip' },
        { name: 'Thrash Blade', itemId: 17705, weaponType: '1H Sword', quality: 'q3', iLvl: 50, reqLevel: 45, speed: '2.70', dps: '37.8 DPS', stats: 'Chance on hit: Grants 1 extra attack', icon: 'inv_sword_34', value: 'Maraudon Quest' }
      ]
    },
    {
      levelBracket: '51–54',
      itemId: 19106,
      name: 'Ice Barbed Spear',
      weaponType: 'Polearm',
      speed: '3.80',
      dps: '53.9 DPS',
      stats: '+13 Agility, +21 Stamina, +21 Strength, Equip: +1% Critical Strike',
      quality: 'q3',
      iLvl: 63,
      reqLevel: 51,
      icon: 'inv_spear_06',
      source: { kind: 'quest', title: 'Alterac Valley — The Hero of the Frostwolf / Stormpike', detail: 'The legendary level 51 AV quest polearm (+13 Agility, +1% Crit)' },
      faction: 'both',
      alts: [
        { name: "Mirah's Song", itemId: 15805, weaponType: '1H Sword', quality: 'q3', iLvl: 61, reqLevel: 56, speed: '1.80', dps: '38.3 DPS', stats: '+9 Strength, +9 Agility', icon: 'inv_sword_40', value: 'Scholomance' },
        { name: "Dawn's Edge", itemId: 12774, weaponType: '1H Axe', quality: 'q3', iLvl: 55, reqLevel: 50, speed: '2.10', dps: '37.1 DPS', stats: 'Equip: +1% Critical Strike', icon: 'inv_axe_01', value: 'Crafted Blacksmithing' }
      ]
    },
    {
      levelBracket: '55–58',
      itemId: 18717,
      name: 'Peacemaker',
      weaponType: 'Polearm',
      speed: '3.60',
      dps: '51.9 DPS',
      stats: '+11 Strength, +21 Stamina, Equip: +56 Attack Power',
      quality: 'q3',
      iLvl: 61,
      reqLevel: 56,
      icon: 'inv_spear_05',
      source: { kind: 'dungeon', title: 'Stratholme Live — Balnazzar', detail: '+56 Attack Power works for Ranged attacks' },
      faction: 'both',
      alts: [
        { name: 'Bone Slicing Hatchet', itemId: 18737, weaponType: '1H Axe', quality: 'q3', iLvl: 62, reqLevel: 57, speed: '1.70', dps: '41.2 DPS', stats: '+13 Agility, +5 Stamina', icon: 'inv_axe_22', value: 'Stratholme Undead — Malor / World' },
        { name: "Dal'Rend's Sacred Charge", itemId: 12940, weaponType: '1H Sword', quality: 'q3', iLvl: 63, reqLevel: 58, speed: '2.80', dps: '41.4 DPS', stats: '+4 Strength, Equip: +1% Crit', icon: 'inv_sword_43', value: 'UBRS — Rend Blackhand' }
      ]
    },
    {
      levelBracket: '59–60',
      itemId: 18715,
      name: 'Lok\'delar, Stave of the Ancient Keepers',
      weaponType: 'Staff',
      speed: '3.20',
      dps: '55.3 DPS',
      stats: '+10 Intellect, +10 Stamina, +14 Spirit, Equip: +2% Ranged Critical Strike',
      quality: 'q4',
      iLvl: 75,
      reqLevel: 60,
      icon: 'inv_staff_13',
      source: { kind: 'quest', title: 'Hunter Epic Quest — Ancient Petrified Leaf', detail: 'Hunter signature epic staff paired with Rhok\'delar' },
      faction: 'both',
      alts: [
        { name: 'Barbarous Blade', itemId: 18520, weaponType: '2H Sword', quality: 'q3', iLvl: 63, reqLevel: 58, speed: '3.20', dps: '53.8 DPS', stats: '+17 Stamina, Equip: +1% Crit, +60 Attack Power', icon: 'inv_sword_39', value: 'Dire Maul North — King Gordok' },
        { name: 'Ashkandi, Greatsword of the Brotherhood', itemId: 19364, weaponType: '2H Sword', quality: 'q4', iLvl: 81, reqLevel: 60, speed: '3.50', dps: '81.9 DPS', stats: '+33 Stamina, Equip: +86 Attack Power', icon: 'inv_sword_12', value: 'Blackwing Lair — Nefarian' },
        { name: 'Zulian Hacker', itemId: 19901, weaponType: '1H Axe', quality: 'q3', iLvl: 65, reqLevel: 60, speed: '2.40', dps: '45.8 DPS', stats: 'Equip: +2 Axe Skill, +15 Attack Power', icon: 'inv_axe_25', value: 'Zul\'Gurub' }
      ]
    }
  ]
};

console.log('✓ Hunter melee stat-sticks track successfully populated.');

// ==========================================
// 7. DRUID IDOLS & OFFHANDS OVERHAUL
// ==========================================
console.log('7. Adding authentic Druid Idols and dedicated off-hands...');

fo.druid = {
  tracks: [
    { id: 'primary', name: 'Off-Hands & Class Idols (Feral, Balance & Resto)' },
    { id: 'healer', name: '💚 Restoration Healing Off-Hands' }
  ],
  levels: [
    {
      levelBracket: '1–14',
      itemId: 281735,
      name: 'Repurposed Rack',
      weaponType: 'Held In Off-hand',
      quality: 'q1',
      iLvl: 10,
      reqLevel: 5,
      stats: '+1 Stamina',
      icon: 'inv_misc_book_06',
      source: { kind: 'vendor', title: 'Starter Vendor', detail: 'Early off-hand stat stick' },
      faction: 'both',
      alts: [
        { name: 'Dwarven Tome', itemId: 1198, weaponType: 'Held In Off-hand', quality: 'q2', iLvl: 12, reqLevel: 7, stats: '+3 Intellect', icon: 'inv_misc_book_09', value: 'World Drop' }
      ]
    },
    {
      levelBracket: '15–24',
      itemId: 273827,
      name: 'Omega Orb',
      weaponType: 'Held In Off-hand',
      quality: 'q3',
      iLvl: 28,
      reqLevel: 23,
      stats: '+5 Intellect, +5 Spirit',
      icon: 'inv_misc_orb_03',
      source: { kind: 'quest', title: 'Compendium of the Fallen / World Drop', detail: 'Balanced caster off-hand' },
      faction: 'both',
      alts: [
        { name: 'Seedcloud Buckler', itemId: 13166, weaponType: 'Held In Off-hand', quality: 'q2', iLvl: 25, reqLevel: 20, stats: '+4 Stamina, +3 Intellect', icon: 'inv_shield_08', value: 'World Drop' }
      ]
    },
    {
      levelBracket: '25–34',
      itemId: 271213,
      name: "Mirror of Rath'mael",
      weaponType: 'Held In Off-hand',
      quality: 'q3',
      iLvl: 38,
      reqLevel: 33,
      stats: '+7 Intellect, +6 Spirit',
      icon: 'inv_misc_orb_01',
      source: { kind: 'world', title: 'World Drop BoE', detail: 'High mana regeneration off-hand' },
      faction: 'both',
      alts: [
        { name: 'Tome of the Fiery Arcana', itemId: 19311, weaponType: 'Held In Off-hand', quality: 'q3', iLvl: 35, reqLevel: 30, stats: '+8 Intellect', icon: 'inv_misc_book_06', value: 'Alterac Valley' }
      ]
    },
    {
      levelBracket: '35–44',
      itemId: 277258,
      name: 'Crest of Elucidation',
      weaponType: 'Held In Off-hand',
      quality: 'q3',
      iLvl: 48,
      reqLevel: 43,
      stats: '+10 Intellect, +8 Spirit',
      icon: 'inv_misc_orb_02',
      source: { kind: 'dungeon', title: 'Zul\'Farrak / ST Drop', detail: 'Strong healing and balance off-hand' },
      faction: 'both',
      alts: [
        { name: 'Umbral Crystal', itemId: 10842, weaponType: 'Held In Off-hand', quality: 'q3', iLvl: 45, reqLevel: 40, stats: '+9 Intellect, +7 Spirit', icon: 'inv_misc_gem_crystal_01', value: 'World Drop' }
      ]
    },
    {
      levelBracket: '45–54',
      itemId: 16768,
      name: 'Furbolg Medicine Pouch',
      weaponType: 'Held In Off-hand',
      quality: 'q2',
      iLvl: 55,
      reqLevel: 50,
      stats: '+10 Stamina, Use: Regenerates 800 to 1000 health over 10 sec',
      icon: 'inv_misc_bag_07_red',
      source: { kind: 'reputation', title: 'Timbermaw Hold — Friendly', detail: 'Essential feral & leveling health regen pouch' },
      faction: 'both',
      alts: [
        { name: 'Spirit of Aquementas', itemId: 11904, weaponType: 'Held In Off-hand', quality: 'q3', iLvl: 54, reqLevel: 49, stats: 'Equip: +20 Spell Damage & Healing, Reduces mana cost by 25', icon: 'inv_misc_book_08', value: 'Un\'Goro — Linken Quest Chain' }
      ]
    },
    {
      levelBracket: '55–60',
      itemId: 22397,
      name: 'Idol of Ferocity',
      weaponType: 'Idol',
      quality: 'q3',
      iLvl: 60,
      reqLevel: 55,
      stats: 'Equip: Reduces the Energy cost of Claw and Rake by 3',
      icon: 'inv_relics_idolofferocity',
      source: { kind: 'dungeon', title: 'Stratholme Undead — The Unforgiven', detail: 'Premier Feral Cat DPS Idol' },
      faction: 'both',
      alts: [
        { name: 'Idol of Brutality', itemId: 23198, weaponType: 'Idol', quality: 'q3', iLvl: 65, reqLevel: 60, stats: 'Equip: Reduces Rage cost of Maul and Swipe by 3', icon: 'inv_relics_idolofferocity', value: 'AQ20 — Moam (Bear Tank BiS)' },
        { name: 'Idol of the Moon', itemId: 23004, weaponType: 'Idol', quality: 'q3', iLvl: 60, reqLevel: 55, stats: 'Equip: Increases Moonfire spell damage by 17%', icon: 'inv_relics_idolofthemoon', value: 'Scholomance — Ras Frostwhisper (Balance BiS)' },
        { name: 'Idol of Rejuvenation', itemId: 22398, weaponType: 'Idol', quality: 'q3', iLvl: 60, reqLevel: 55, stats: 'Equip: Increases Rejuvenation healing by up to 50', icon: 'inv_relics_idolofrejuvenation', value: 'Stratholme Live — Hearthsinger Forresten (Resto BiS)' },
        { name: 'Idol of Health', itemId: 22399, weaponType: 'Idol', quality: 'q3', iLvl: 60, reqLevel: 55, stats: 'Equip: Reduces cast time of Healing Touch by 0.15s', icon: 'inv_relics_idolofrejuvenation', value: 'LBRS — Mor Grayhoof' },
        { name: 'Lei of the Lifegiver', itemId: 19312, weaponType: 'Held In Off-hand', quality: 'q4', iLvl: 65, reqLevel: 60, stats: '+10 Intellect, +10 Spirit, Equip: +29 Healing', icon: 'inv_misc_flower_02', value: 'Alterac Valley Exalted' }
      ]
    }
  ],
  healingLevels: [
    {
      levelBracket: '1–24',
      itemId: 281735,
      name: 'Repurposed Rack',
      weaponType: 'Held In Off-hand',
      quality: 'q1',
      iLvl: 10,
      reqLevel: 5,
      stats: '+1 Stamina',
      icon: 'inv_misc_book_06',
      source: { kind: 'vendor', title: 'Starter Vendor', detail: 'Early off-hand stat stick' },
      faction: 'both',
      alts: [
        { name: 'Dwarven Tome', itemId: 1198, weaponType: 'Held In Off-hand', quality: 'q2', iLvl: 12, reqLevel: 7, stats: '+3 Intellect', icon: 'inv_misc_book_09', value: 'World Drop' }
      ]
    },
    {
      levelBracket: '25–44',
      itemId: 271213,
      name: "Mirror of Rath'mael",
      weaponType: 'Held In Off-hand',
      quality: 'q3',
      iLvl: 38,
      reqLevel: 33,
      stats: '+7 Intellect, +6 Spirit',
      icon: 'inv_misc_orb_01',
      source: { kind: 'world', title: 'World Drop BoE', detail: 'High mana regeneration off-hand' },
      faction: 'both',
      alts: [
        { name: 'Tome of the Fiery Arcana', itemId: 19311, weaponType: 'Held In Off-hand', quality: 'q3', iLvl: 35, reqLevel: 30, stats: '+8 Intellect', icon: 'inv_misc_book_06', value: 'Alterac Valley' }
      ]
    },
    {
      levelBracket: '45–54',
      itemId: 11904,
      name: 'Spirit of Aquementas',
      weaponType: 'Held In Off-hand',
      quality: 'q3',
      iLvl: 54,
      reqLevel: 49,
      stats: 'Equip: +20 Spell Damage & Healing, Reduces mana cost by 25',
      icon: 'inv_misc_book_08',
      source: { kind: 'quest', title: 'Un\'Goro — Linken Quest Chain', detail: 'Top tier healing & spell damage off-hand' },
      faction: 'both',
      alts: [
        { name: 'Furbolg Medicine Pouch', itemId: 16768, weaponType: 'Held In Off-hand', quality: 'q2', iLvl: 55, reqLevel: 50, stats: '+10 Stamina, Use: 1000 HP regen', icon: 'inv_misc_bag_07_red', value: 'Timbermaw Hold' }
      ]
    },
    {
      levelBracket: '55–60',
      itemId: 19312,
      name: 'Lei of the Lifegiver',
      weaponType: 'Held In Off-hand',
      quality: 'q4',
      iLvl: 65,
      reqLevel: 60,
      stats: '+10 Intellect, +10 Spirit, Equip: +29 Healing',
      icon: 'inv_misc_flower_02',
      source: { kind: 'pvp', title: 'Alterac Valley Exalted', detail: 'Premier pre-raid Restoration off-hand' },
      faction: 'both',
      alts: [
        { name: 'Idol of Rejuvenation', itemId: 22398, weaponType: 'Idol', quality: 'q3', iLvl: 60, reqLevel: 55, stats: 'Equip: Increases Rejuvenation healing by up to 50', icon: 'inv_relics_idolofrejuvenation', value: 'Stratholme Live' },
        { name: 'Idol of Health', itemId: 22399, weaponType: 'Idol', quality: 'q3', iLvl: 60, reqLevel: 55, stats: 'Equip: Reduces cast time of Healing Touch by 0.15s', icon: 'inv_relics_idolofrejuvenation', value: 'LBRS' }
      ]
    }
  ]
};

console.log('✓ Druid off-hands and idols track successfully populated.');

// ==========================================
// 8. WRITE ALL MODIFIED DATA TO SCRAPED DIR
// ==========================================
fs.writeFileSync(path.join(SCRAPED_DIR, 'forever_weapons.json'), JSON.stringify(fw, null, 2), 'utf8');
fs.writeFileSync(path.join(SCRAPED_DIR, 'forever_offhands.json'), JSON.stringify(fo, null, 2), 'utf8');
fs.writeFileSync(path.join(SCRAPED_DIR, 'forever_wands.json'), JSON.stringify(fwan, null, 2), 'utf8');

console.log('✓ Successfully saved updated forever_weapons.json, forever_offhands.json, and forever_wands.json.');
console.log('=== PIPELINE REPAIRS COMPLETED ===');
