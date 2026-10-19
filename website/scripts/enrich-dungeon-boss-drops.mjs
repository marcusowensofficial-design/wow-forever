/**
 * Systematic Dungeon Boss Drops Enricher across all 9 classes in WoW Forever.
 * Enriches forever_weapons.json, forever_wands.json, forever_offhands.json, and forever_items_cache.json.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');
const SCRAPED_DIR = path.join(ROOT, 'data', 'scraped');

const fwPath = path.join(SCRAPED_DIR, 'forever_weapons.json');
const fwdPath = path.join(SCRAPED_DIR, 'forever_wands.json');
const foPath = path.join(SCRAPED_DIR, 'forever_offhands.json');
const cachePath = path.join(ROOT, 'scratch', 'forever_items_cache.json');

const weapons = JSON.parse(fs.readFileSync(fwPath, 'utf8'));
const wands = JSON.parse(fs.readFileSync(fwdPath, 'utf8'));
const offhands = JSON.parse(fs.readFileSync(foPath, 'utf8'));
let cache = {};
if (fs.existsSync(cachePath)) {
  cache = JSON.parse(fs.readFileSync(cachePath, 'utf8'));
}

// Master definitions of leveling dungeon boss drops
const DUNGEON_DROPS = [
  // --- Ragefire Chasm ---
  {
    itemId: 2271,
    name: "Chanting Staff",
    quality: "q2",
    iLvl: 18,
    reqLevel: 13,
    icon: "inv_staff_13",
    weaponType: "Staff",
    speed: "2.80",
    dps: "5.18 DPS",
    stats: "+1 Intellect, +2 Spirit",
    lines: [
      "Binds when picked up",
      "Two-Hand\tStaff",
      "11 - 18 Damage\tSpeed 2.80",
      "(5.18 damage per second)",
      "+1 Intellect",
      "+2 Spirit",
      "Requires Level 13"
    ],
    source: { kind: "dungeon", title: "Jergosh the Invoker", detail: "Ragefire Chasm" },
    value: "5.2 DPS, 2.80s, +1 Int, +2 Spi - Ragefire Chasm: Jergosh the Invoker",
    minBracket: 13,
    maxBracket: 18,
    classes: ["mage", "priest", "warlock", "druid", "shaman"],
    slots: ["two-hand"]
  },
  {
    itemId: 2270,
    name: "Spikethorn Dirk",
    quality: "q2",
    iLvl: 17,
    reqLevel: 12,
    icon: "inv_weapon_shortblade_05",
    weaponType: "Dagger",
    speed: "1.60",
    dps: "7.50 DPS",
    stats: "6 - 18 Damage",
    lines: [
      "Binds when picked up",
      "One-Hand\tDagger",
      "6 - 18 Damage\tSpeed 1.60",
      "(7.50 damage per second)",
      "Requires Level 12"
    ],
    source: { kind: "dungeon", title: "Bazzalan", detail: "Ragefire Chasm" },
    value: "7.5 DPS, 1.60s - Ragefire Chasm: Bazzalan",
    minBracket: 11,
    maxBracket: 16,
    classes: ["rogue", "hunter", "warrior", "druid", "mage", "priest", "warlock", "shaman"],
    slots: ["one-hand"]
  },
  {
    itemId: 14145,
    name: "Cursed Felblade",
    quality: "q3",
    iLvl: 18,
    reqLevel: 13,
    icon: "inv_sword_23",
    weaponType: "One-Handed Sword",
    speed: "2.30",
    dps: "12.17 DPS",
    stats: "Chance on hit: Reduces target enemy's attack power by 39 for 30 sec.",
    lines: [
      "Binds when picked up",
      "One-Hand\tOne-Handed Sword",
      "19 - 37 Damage\tSpeed 2.30",
      "(12.17 damage per second)",
      "Chance on hit: Reduces target enemy's attack power by 39 for 30 sec.",
      "Requires Level 13"
    ],
    source: { kind: "dungeon", title: "Taragaman the Hungerer", detail: "Ragefire Chasm" },
    value: "12.2 DPS, 2.30s - Ragefire Chasm: Taragaman the Hungerer",
    minBracket: 13,
    maxBracket: 18,
    classes: ["rogue", "warrior", "hunter", "paladin"],
    slots: ["one-hand"]
  },
  {
    itemId: 14151,
    name: "Chanting Blade",
    quality: "q2",
    iLvl: 18,
    reqLevel: 13,
    icon: "inv_weapon_shortblade_05",
    weaponType: "Dagger",
    speed: "1.50",
    dps: "12.00 DPS",
    stats: "+2 Agility, +3 Stamina",
    lines: [
      "Binds when picked up",
      "One-Hand\tDagger",
      "12 - 24 Damage\tSpeed 1.50",
      "(12.00 damage per second)",
      "+2 Agility",
      "+3 Stamina",
      "Requires Level 13"
    ],
    source: { kind: "dungeon", title: "Jergosh the Invoker", detail: "Ragefire Chasm" },
    value: "12.0 DPS, 1.50s, +2 Agi, +3 Sta - Ragefire Chasm: Jergosh the Invoker",
    minBracket: 13,
    maxBracket: 18,
    classes: ["rogue", "hunter", "warrior", "druid", "priest", "mage", "warlock", "shaman"],
    slots: ["one-hand"]
  },
  {
    itemId: 273003,
    name: "Searing Dagger",
    quality: "q2",
    iLvl: 17,
    reqLevel: 12,
    icon: "inv_weapon_shortblade_05",
    weaponType: "Dagger",
    speed: "1.60",
    dps: "8.13 DPS",
    stats: "+4 Spirit, Equip: Harmful spell casts sear the target for 7 Fire damage.",
    lines: [
      "Binds when picked up",
      "One-Hand\tDagger",
      "8 - 18 Damage\tSpeed 1.60",
      "(8.13 damage per second)",
      "+4 Spirit",
      "Equip: Harmful spell casts sear the target for 7 Fire damage.",
      "Requires Level 12"
    ],
    source: { kind: "dungeon", title: "Bazzalan", detail: "Ragefire Chasm" },
    value: "8.1 DPS, 1.60s, +4 Spi, +7 Fire proc - Ragefire Chasm: Bazzalan",
    minBracket: 11,
    maxBracket: 16,
    classes: ["mage", "priest", "warlock", "druid", "shaman", "rogue"],
    slots: ["one-hand"]
  },

  // --- The Deadmines ---
  {
    itemId: 5187,
    name: "Rhahk'Zor's Hammer",
    quality: "q3",
    iLvl: 21,
    reqLevel: 16,
    icon: "inv_mace_01",
    weaponType: "Two-Handed Mace",
    speed: "3.20",
    dps: "18.44 DPS",
    stats: "+8 Strength, +3 Stamina",
    lines: [
      "Binds when picked up",
      "Two-Hand\tTwo-Handed Mace",
      "47 - 71 Damage\tSpeed 3.20",
      "(18.44 damage per second)",
      "+8 Strength",
      "+3 Stamina",
      "Requires Level 16"
    ],
    source: { kind: "dungeon", title: "Rhahk'Zor", detail: "The Deadmines" },
    value: "18.4 DPS, 3.20s, +8 Str, +3 Sta - The Deadmines: Rhahk'Zor",
    minBracket: 15,
    maxBracket: 22,
    classes: ["warrior", "paladin", "shaman", "druid"],
    slots: ["two-hand"]
  },
  {
    itemId: 5194,
    name: "Taskmaster Axe",
    quality: "q2",
    iLvl: 19,
    reqLevel: 14,
    icon: "inv_axe_11",
    weaponType: "One-Handed Axe",
    speed: "2.00",
    dps: "12.00 DPS",
    stats: "+1 Strength, +4 Stamina",
    lines: [
      "Binds when picked up",
      "One-Hand\tOne-Handed Axe",
      "19 - 36 Damage\tSpeed 2.00",
      "(12.00 damage per second)",
      "+1 Strength",
      "+4 Stamina",
      "Requires Level 14"
    ],
    source: { kind: "dungeon", title: "Sneed", detail: "The Deadmines" },
    value: "12.0 DPS, 2.00s, +1 Str, +4 Sta - The Deadmines: Sneed",
    minBracket: 13,
    maxBracket: 18,
    classes: ["warrior", "shaman", "hunter"],
    slots: ["one-hand"]
  },
  {
    itemId: 5193,
    name: "Buzz Saw",
    quality: "q2",
    iLvl: 19,
    reqLevel: 14,
    icon: "inv_weapon_shortblade_05",
    weaponType: "Dagger",
    speed: "1.40",
    dps: "11.79 DPS",
    stats: "+3 Agility, +1 Stamina",
    lines: [
      "Binds when picked up",
      "One-Hand\tDagger",
      "11 - 22 Damage\tSpeed 1.40",
      "(11.79 damage per second)",
      "+3 Agility",
      "+1 Stamina",
      "Requires Level 14"
    ],
    source: { kind: "dungeon", title: "Sneed's Shredder", detail: "The Deadmines" },
    value: "11.8 DPS, 1.40s, +3 Agi, +1 Sta - The Deadmines: Sneed's Shredder",
    minBracket: 13,
    maxBracket: 18,
    classes: ["rogue", "hunter", "warrior", "druid", "priest", "mage", "warlock"],
    slots: ["one-hand"]
  },
  {
    itemId: 5196,
    name: "Smite's Mighty Hammer",
    quality: "q3",
    iLvl: 23,
    reqLevel: 18,
    icon: "inv_hammer_08",
    weaponType: "Two-Handed Mace",
    speed: "3.50",
    dps: "20.00 DPS",
    stats: "+11 Strength, +4 Agility",
    lines: [
      "Binds when picked up",
      "Two-Hand\tTwo-Handed Mace",
      "56 - 84 Damage\tSpeed 3.50",
      "(20.00 damage per second)",
      "+11 Strength",
      "+4 Agility",
      "Requires Level 18"
    ],
    source: { kind: "dungeon", title: "Mr. Smite", detail: "The Deadmines" },
    value: "20.0 DPS, 3.50s, +11 Str, +4 Agi - The Deadmines: Mr. Smite",
    minBracket: 17,
    maxBracket: 24,
    classes: ["warrior", "paladin", "shaman", "druid"],
    slots: ["two-hand"]
  },
  {
    itemId: 5197,
    name: "Thief's Blade",
    quality: "q2",
    iLvl: 22,
    reqLevel: 17,
    icon: "inv_sword_27",
    weaponType: "One-Handed Sword",
    speed: "2.20",
    dps: "13.64 DPS",
    stats: "+4 Agility, +2 Stamina",
    lines: [
      "Binds when picked up",
      "One-Hand\tOne-Handed Sword",
      "23 - 44 Damage\tSpeed 2.20",
      "(13.64 damage per second)",
      "+4 Agility",
      "+2 Stamina",
      "Requires Level 17"
    ],
    source: { kind: "dungeon", title: "Mr. Smite", detail: "The Deadmines" },
    value: "13.6 DPS, 2.20s, +4 Agi, +2 Sta - The Deadmines: Mr. Smite",
    minBracket: 15,
    maxBracket: 22,
    classes: ["rogue", "warrior", "hunter", "paladin"],
    slots: ["one-hand"]
  },
  {
    itemId: 5195,
    name: "Cookie's Tenderizer",
    quality: "q2",
    iLvl: 22,
    reqLevel: 17,
    icon: "inv_mace_08",
    weaponType: "One-Handed Mace",
    speed: "2.70",
    dps: "13.70 DPS",
    stats: "+3 Strength, +3 Stamina",
    lines: [
      "Binds when picked up",
      "One-Hand\tOne-Handed Mace",
      "30 - 56 Damage\tSpeed 2.70",
      "(13.70 damage per second)",
      "+3 Strength",
      "+3 Stamina",
      "Requires Level 17"
    ],
    source: { kind: "dungeon", title: "Cookie", detail: "The Deadmines" },
    value: "13.7 DPS, 2.70s, +3 Str, +3 Sta - The Deadmines: Cookie",
    minBracket: 15,
    maxBracket: 22,
    classes: ["warrior", "paladin", "shaman", "rogue", "priest", "druid"],
    slots: ["one-hand"]
  },
  {
    itemId: 5198,
    name: "Cookie's Stirring Rod",
    quality: "q3",
    iLvl: 22,
    reqLevel: 17,
    icon: "inv_wand_02",
    weaponType: "Wand",
    speed: "1.30",
    dps: "15.77 DPS",
    stats: "14 - 27 Arcane Damage",
    lines: [
      "Binds when picked up",
      "Ranged\tWand",
      "14 - 27 Arcane Damage\tSpeed 1.30",
      "(15.77 damage per second)",
      "Requires Level 17"
    ],
    source: { kind: "dungeon", title: "Cookie", detail: "The Deadmines" },
    value: "15.8 DPS, 1.30s - The Deadmines: Cookie",
    minBracket: 15,
    maxBracket: 24,
    classes: ["mage", "priest", "warlock"],
    slots: ["ranged"],
    isWand: true
  },
  {
    itemId: 5201,
    name: "Emberstone Staff",
    quality: "q3",
    iLvl: 23,
    reqLevel: 18,
    icon: "inv_staff_13",
    weaponType: "Staff",
    speed: "3.00",
    dps: "19.67 DPS",
    stats: "+5 Intellect, +5 Spirit, +8 Stamina",
    lines: [
      "Binds when picked up",
      "Two-Hand\tStaff",
      "47 - 71 Damage\tSpeed 3.00",
      "(19.67 damage per second)",
      "+5 Intellect",
      "+5 Spirit",
      "+8 Stamina",
      "Requires Level 18"
    ],
    source: { kind: "dungeon", title: "Captain Greenskin", detail: "The Deadmines" },
    value: "19.7 DPS, 3.00s, +5 Int, +5 Spi, +8 Sta - The Deadmines: Captain Greenskin",
    minBracket: 17,
    maxBracket: 24,
    classes: ["mage", "priest", "warlock", "druid", "shaman"],
    slots: ["two-hand"]
  },
  {
    itemId: 5202,
    name: "Cruel Barb",
    quality: "q3",
    iLvl: 24,
    reqLevel: 19,
    icon: "inv_sword_23",
    weaponType: "One-Handed Sword",
    speed: "2.80",
    dps: "16.96 DPS",
    stats: "+12 Attack Power",
    lines: [
      "Binds when picked up",
      "One-Hand\tOne-Handed Sword",
      "30 - 56 Damage\tSpeed 2.80",
      "(16.96 damage per second)",
      "Equip: +12 Attack Power",
      "Requires Level 19"
    ],
    source: { kind: "dungeon", title: "Edwin VanCleef", detail: "The Deadmines" },
    value: "17.0 DPS, 2.80s, +12 AP - The Deadmines: Edwin VanCleef",
    minBracket: 17,
    maxBracket: 24,
    classes: ["rogue", "warrior", "hunter", "paladin"],
    slots: ["one-hand"]
  },
  {
    itemId: 5191,
    name: "Gilded Buckler",
    quality: "q2",
    iLvl: 20,
    reqLevel: 15,
    icon: "inv_shield_05",
    weaponType: "Shield",
    armor: 358,
    block: 11,
    stats: "+3 Stamina, +1 Spirit",
    lines: [
      "Binds when picked up",
      "Off Hand\tShield",
      "358 Armor",
      "11 Block",
      "+3 Stamina",
      "+1 Spirit",
      "Requires Level 15"
    ],
    source: { kind: "dungeon", title: "Miner Johnson", detail: "The Deadmines" },
    value: "358 Armor, 11 Block, +3 Sta, +1 Spi - The Deadmines: Miner Johnson",
    minBracket: 13,
    maxBracket: 20,
    classes: ["warrior", "paladin", "shaman"],
    slots: ["off-hand"],
    isOffhand: true
  },

  // --- Wailing Caverns ---
  {
    itemId: 13245,
    name: "Kresh's Back",
    quality: "q3",
    iLvl: 20,
    reqLevel: 15,
    icon: "inv_shield_08",
    weaponType: "Shield",
    armor: 468,
    block: 14,
    stats: "+4 Stamina, +2 Spirit",
    lines: [
      "Binds when picked up",
      "Off Hand\tShield",
      "468 Armor",
      "14 Block",
      "+4 Stamina",
      "+2 Spirit",
      "Requires Level 15"
    ],
    source: { kind: "dungeon", title: "Kresh", detail: "Wailing Caverns" },
    value: "468 Armor, 14 Block, +4 Sta, +2 Spi - Wailing Caverns: Kresh",
    minBracket: 15,
    maxBracket: 22,
    classes: ["warrior", "paladin", "shaman"],
    slots: ["off-hand"],
    isOffhand: true
  },
  {
    itemId: 6533,
    name: "Stinging Viper",
    quality: "q3",
    iLvl: 24,
    reqLevel: 19,
    icon: "inv_mace_01",
    weaponType: "One-Handed Mace",
    speed: "2.80",
    dps: "14.29 DPS",
    stats: "Chance on hit: Poisons target for 35 Nature damage over 15 sec",
    lines: [
      "Binds when picked up",
      "One-Hand\tOne-Handed Mace",
      "30 - 57 Damage\tSpeed 2.80",
      "(14.29 damage per second)",
      "Chance on hit: Poisons target for 35 Nature damage over 15 sec",
      "Requires Level 19"
    ],
    source: { kind: "dungeon", title: "Lord Pythas", detail: "Wailing Caverns" },
    value: "14.3 DPS, 2.80s - Wailing Caverns: Lord Pythas",
    minBracket: 17,
    maxBracket: 24,
    classes: ["warrior", "paladin", "shaman", "rogue", "priest", "druid"],
    slots: ["one-hand"]
  },
  {
    itemId: 6469,
    name: "Venomstrike",
    quality: "q3",
    iLvl: 24,
    reqLevel: 19,
    icon: "inv_weapon_bow_10",
    weaponType: "Bow",
    speed: "2.40",
    dps: "9.58 DPS",
    stats: "Chance on hit: Shoots a poison bolt for 31 to 45 Nature damage",
    lines: [
      "Binds when picked up",
      "Ranged\tBow",
      "14 - 32 Damage\tSpeed 2.40",
      "(9.58 damage per second)",
      "Chance on hit: Shoots a poison bolt for 31 to 45 Nature damage",
      "Requires Level 19"
    ],
    source: { kind: "dungeon", title: "Lord Serpentis", detail: "Wailing Caverns" },
    value: "9.6 DPS, 2.40s - Wailing Caverns: Lord Serpentis",
    minBracket: 17,
    maxBracket: 24,
    classes: ["hunter", "warrior", "rogue"],
    slots: ["ranged"]
  },
  {
    itemId: 6633,
    name: "Tail Spike",
    quality: "q2",
    iLvl: 22,
    reqLevel: 17,
    icon: "inv_misc_monsterfang_01",
    weaponType: "Dagger",
    speed: "1.70",
    dps: "12.94 DPS",
    stats: "+2 Agility, +2 Stamina",
    lines: [
      "Binds when picked up",
      "One-Hand\tDagger",
      "15 - 29 Damage\tSpeed 1.70",
      "(12.94 damage per second)",
      "+2 Agility",
      "+2 Stamina",
      "Requires Level 17"
    ],
    source: { kind: "dungeon", title: "Skum", detail: "Wailing Caverns" },
    value: "12.9 DPS, 1.70s, +2 Agi, +2 Sta - Wailing Caverns: Skum",
    minBracket: 15,
    maxBracket: 22,
    classes: ["rogue", "hunter", "warrior", "druid", "priest", "mage", "warlock"],
    slots: ["one-hand"]
  },
  {
    itemId: 6631,
    name: "Living Root",
    quality: "q3",
    iLvl: 25,
    reqLevel: 20,
    icon: "inv_staff_25",
    weaponType: "Staff",
    speed: "2.90",
    dps: "21.21 DPS",
    stats: "+5 Strength, +12 Stamina",
    lines: [
      "Binds when picked up",
      "Two-Hand\tStaff",
      "49 - 74 Damage\tSpeed 2.90",
      "(21.21 damage per second)",
      "+5 Strength",
      "+12 Stamina",
      "Requires Level 20"
    ],
    source: { kind: "dungeon", title: "Verdan the Everliving", detail: "Wailing Caverns" },
    value: "21.2 DPS, 2.90s, +5 Str, +12 Sta - Wailing Caverns: Verdan the Everliving",
    minBracket: 19,
    maxBracket: 26,
    classes: ["druid", "shaman", "mage", "priest", "warlock"],
    slots: ["two-hand"]
  },
  {
    itemId: 6630,
    name: "Seedcloud Buckler",
    quality: "q3",
    iLvl: 25,
    reqLevel: 20,
    icon: "inv_shield_10",
    weaponType: "Shield",
    armor: 560,
    block: 16,
    stats: "+5 Stamina, +3 Spirit",
    lines: [
      "Binds when picked up",
      "Off Hand\tShield",
      "560 Armor",
      "16 Block",
      "+5 Stamina",
      "+3 Spirit",
      "Requires Level 20"
    ],
    source: { kind: "dungeon", title: "Verdan the Everliving", detail: "Wailing Caverns" },
    value: "560 Armor, 16 Block, +5 Sta, +3 Spi - Wailing Caverns: Verdan the Everliving",
    minBracket: 19,
    maxBracket: 26,
    classes: ["warrior", "paladin", "shaman"],
    slots: ["off-hand"],
    isOffhand: true
  },

  // --- Shadowfang Keep ---
  {
    itemId: 6320,
    name: "Commander's Crest",
    quality: "q3",
    iLvl: 26,
    reqLevel: 21,
    icon: "inv_shield_03",
    weaponType: "Shield",
    armor: 582,
    block: 17,
    stats: "+6 Stamina, +3 Spirit",
    lines: [
      "Binds when picked up",
      "Off Hand\tShield",
      "582 Armor",
      "17 Block",
      "+6 Stamina",
      "+3 Spirit",
      "Requires Level 21"
    ],
    source: { kind: "dungeon", title: "Commander Springvale", detail: "Shadowfang Keep" },
    value: "582 Armor, 17 Block, +6 Sta, +3 Spi - Shadowfang Keep: Commander Springvale",
    minBracket: 21,
    maxBracket: 28,
    classes: ["warrior", "paladin", "shaman"],
    slots: ["off-hand"],
    isOffhand: true
  },
  {
    itemId: 6318,
    name: "Odo's Ley Staff",
    quality: "q3",
    iLvl: 26,
    reqLevel: 21,
    icon: "inv_staff_27",
    weaponType: "Staff",
    speed: "2.90",
    dps: "21.72 DPS",
    stats: "+8 Spirit, +5 Stamina",
    lines: [
      "Binds when picked up",
      "Two-Hand\tStaff",
      "50 - 76 Damage\tSpeed 2.90",
      "(21.72 damage per second)",
      "+8 Spirit",
      "+5 Stamina",
      "Requires Level 21"
    ],
    source: { kind: "dungeon", title: "Odo the Blindwatcher", detail: "Shadowfang Keep" },
    value: "21.7 DPS, 2.90s, +8 Spi, +5 Sta - Shadowfang Keep: Odo the Blindwatcher",
    minBracket: 21,
    maxBracket: 28,
    classes: ["priest", "mage", "warlock", "druid", "shaman"],
    slots: ["two-hand"]
  },
  {
    itemId: 1292,
    name: "Butcher's Cleaver",
    quality: "q3",
    iLvl: 25,
    reqLevel: 20,
    icon: "inv_axe_23",
    weaponType: "One-Handed Axe",
    speed: "1.70",
    dps: "16.18 DPS",
    stats: "+5 Strength, +2 Agility",
    lines: [
      "Binds when picked up",
      "One-Hand\tOne-Handed Axe",
      "19 - 36 Damage\tSpeed 1.70",
      "(16.18 damage per second)",
      "+5 Strength",
      "+2 Agility",
      "Requires Level 20"
    ],
    source: { kind: "dungeon", title: "The Butcher", detail: "Shadowfang Keep" },
    value: "16.2 DPS, 1.70s, +5 Str, +2 Agi - Shadowfang Keep: The Butcher",
    minBracket: 19,
    maxBracket: 26,
    classes: ["warrior", "shaman", "hunter"],
    slots: ["one-hand"]
  },
  {
    itemId: 2299,
    name: "Meteor Shard",
    quality: "q3",
    iLvl: 29,
    reqLevel: 24,
    icon: "inv_weapon_shortblade_05",
    weaponType: "Dagger",
    speed: "1.80",
    dps: "17.78 DPS",
    stats: "Chance on hit: Hurls a fiery ball that inflicts 35 Fire damage",
    lines: [
      "Binds when picked up",
      "One-Hand\tDagger",
      "23 - 44 Damage\tSpeed 1.80",
      "(17.78 damage per second)",
      "Chance on hit: Hurls a fiery ball that inflicts 35 Fire damage",
      "Requires Level 24"
    ],
    source: { kind: "dungeon", title: "Archmage Arugal", detail: "Shadowfang Keep" },
    value: "17.8 DPS, 1.80s - Shadowfang Keep: Archmage Arugal",
    minBracket: 23,
    maxBracket: 30,
    classes: ["rogue", "mage", "warlock", "priest", "hunter", "druid"],
    slots: ["one-hand"]
  },

  // --- Blackfathom Deeps ---
  {
    itemId: 6907,
    name: "Tortoise Armor",
    quality: "q3",
    iLvl: 27,
    reqLevel: 22,
    icon: "inv_shield_06",
    weaponType: "Shield",
    armor: 605,
    block: 18,
    stats: "+7 Stamina, +2 Strength",
    lines: [
      "Binds when picked up",
      "Off Hand\tShield",
      "605 Armor",
      "18 Block",
      "+7 Stamina",
      "+2 Strength",
      "Requires Level 22"
    ],
    source: { kind: "dungeon", title: "Ghamoo-ra", detail: "Blackfathom Deeps" },
    value: "605 Armor, 18 Block, +7 Sta, +2 Str - Blackfathom Deeps: Ghamoo-ra",
    minBracket: 21,
    maxBracket: 28,
    classes: ["warrior", "paladin", "shaman"],
    slots: ["off-hand"],
    isOffhand: true
  },
  {
    itemId: 6905,
    name: "Reef Axe",
    quality: "q2",
    iLvl: 25,
    reqLevel: 20,
    icon: "inv_weapon_halberd_06",
    weaponType: "Two-Handed Axe",
    speed: "3.30",
    dps: "18.33 DPS",
    stats: "+7 Strength, +3 Agility",
    lines: [
      "Binds when picked up",
      "Two-Hand\tTwo-Handed Axe",
      "46 - 75 Damage\tSpeed 3.30",
      "(18.33 damage per second)",
      "+7 Strength",
      "+3 Agility",
      "Requires Level 20"
    ],
    source: { kind: "dungeon", title: "Gelihast", detail: "Blackfathom Deeps" },
    value: "18.3 DPS, 3.30s, +7 Str, +3 Agi - Blackfathom Deeps: Gelihast",
    minBracket: 19,
    maxBracket: 26,
    classes: ["warrior", "paladin", "shaman", "hunter"],
    slots: ["two-hand"]
  },
  {
    itemId: 6904,
    name: "Bite of Serra'kis",
    quality: "q3",
    iLvl: 28,
    reqLevel: 23,
    icon: "inv_misc_monsterfang_01",
    weaponType: "Dagger",
    speed: "1.30",
    dps: "17.69 DPS",
    stats: "Chance on hit: Poisons target for 40 Nature damage over 10 sec",
    lines: [
      "Binds when picked up",
      "One-Hand\tDagger",
      "17 - 32 Damage\tSpeed 1.30",
      "(17.69 damage per second)",
      "Chance on hit: Poisons target for 40 Nature damage over 10 sec",
      "Requires Level 23"
    ],
    source: { kind: "dungeon", title: "Old Serra'kis", detail: "Blackfathom Deeps" },
    value: "17.7 DPS, 1.30s - Blackfathom Deeps: Old Serra'kis",
    minBracket: 21,
    maxBracket: 28,
    classes: ["rogue", "hunter", "warrior", "druid"],
    slots: ["one-hand"]
  },
  {
    itemId: 6909,
    name: "Strike of the Hydra",
    quality: "q3",
    iLvl: 31,
    reqLevel: 26,
    icon: "inv_sword_42",
    weaponType: "Two-Handed Sword",
    speed: "3.30",
    dps: "25.61 DPS",
    stats: "Chance on hit: Corrosive acid hits target for 140 Nature damage over 30 sec",
    lines: [
      "Binds when picked up",
      "Two-Hand\tTwo-Handed Sword",
      "63 - 106 Damage\tSpeed 3.30",
      "(25.61 damage per second)",
      "Chance on hit: Corrosive acid hits target for 140 Nature damage over 30 sec",
      "Requires Level 26"
    ],
    source: { kind: "dungeon", title: "Aku'mai", detail: "Blackfathom Deeps" },
    value: "25.6 DPS, 3.30s - Blackfathom Deeps: Aku'mai",
    minBracket: 25,
    maxBracket: 32,
    classes: ["warrior", "paladin", "hunter"],
    slots: ["two-hand"]
  },

  // --- The Stockade ---
  {
    itemId: 2280,
    name: "Kam's Walking Stick",
    quality: "q2",
    iLvl: 26,
    reqLevel: 21,
    icon: "inv_staff_06",
    weaponType: "Staff",
    speed: "2.80",
    dps: "18.39 DPS",
    stats: "+7 Intellect, +4 Spirit",
    lines: [
      "Binds when picked up",
      "Two-Hand\tStaff",
      "39 - 64 Damage\tSpeed 2.80",
      "(18.39 damage per second)",
      "+7 Intellect",
      "+4 Spirit",
      "Requires Level 21"
    ],
    source: { kind: "dungeon", title: "Kam Deepfury", detail: "The Stockade" },
    value: "18.4 DPS, 2.80s, +7 Int, +4 Spi - The Stockade: Kam Deepfury",
    minBracket: 21,
    maxBracket: 28,
    classes: ["priest", "mage", "warlock", "druid"],
    slots: ["two-hand"]
  },
  {
    itemId: 1977,
    name: "Ironknuckle",
    quality: "q2",
    iLvl: 26,
    reqLevel: 21,
    icon: "inv_gauntlets_04",
    weaponType: "Fist Weapon",
    speed: "1.70",
    dps: "15.00 DPS",
    stats: "+4 Strength, +3 Agility",
    lines: [
      "Binds when picked up",
      "One-Hand\tFist Weapon",
      "19 - 36 Damage\tSpeed 1.70",
      "(15.00 damage per second)",
      "+4 Strength",
      "+3 Agility",
      "Requires Level 21"
    ],
    source: { kind: "dungeon", title: "Bruegal Ironknuckle", detail: "The Stockade" },
    value: "15.0 DPS, 1.70s, +4 Str, +3 Agi - The Stockade: Bruegal Ironknuckle",
    minBracket: 21,
    maxBracket: 28,
    classes: ["rogue", "warrior", "shaman", "druid"],
    slots: ["one-hand"]
  },

  // --- Gnomeregan ---
  {
    itemId: 9446,
    name: "Electrocutioner Leg",
    quality: "q3",
    iLvl: 34,
    reqLevel: 29,
    icon: "inv_sword_30",
    weaponType: "One-Handed Sword",
    speed: "1.70",
    dps: "22.06 DPS",
    stats: "Chance on hit: Shocks target for 20 to 30 Nature damage",
    lines: [
      "Binds when picked up",
      "One-Hand\tOne-Handed Sword",
      "28 - 53 Damage\tSpeed 1.70",
      "(22.06 damage per second)",
      "Chance on hit: Shocks target for 20 to 30 Nature damage",
      "Requires Level 29"
    ],
    source: { kind: "dungeon", title: "Electrocutioner 6000", detail: "Gnomeregan" },
    value: "22.1 DPS, 1.70s - Gnomeregan: Electrocutioner 6000",
    minBracket: 27,
    maxBracket: 34,
    classes: ["rogue", "warrior", "hunter", "paladin"],
    slots: ["one-hand"]
  },
  {
    itemId: 9449,
    name: "Manual Crowd Pummeler",
    quality: "q3",
    iLvl: 34,
    reqLevel: 29,
    icon: "inv_mace_14",
    weaponType: "Two-Handed Mace",
    speed: "2.00",
    dps: "29.00 DPS",
    stats: "+16 Strength, +5 Agility, Use: +50% attack speed for 30 sec",
    lines: [
      "Binds when picked up",
      "Two-Hand\tTwo-Handed Mace",
      "46 - 70 Damage\tSpeed 2.00",
      "(29.00 damage per second)",
      "+16 Strength",
      "+5 Agility",
      "Use: Increases attack speed by 50% for 30 sec (3 Charges)",
      "Requires Level 29"
    ],
    source: { kind: "dungeon", title: "Crowd Pummeler 9-60", detail: "Gnomeregan" },
    value: "29.0 DPS, 2.00s, +16 Str, +5 Agi - Gnomeregan: Crowd Pummeler 9-60",
    minBracket: 27,
    maxBracket: 36,
    classes: ["feral", "druid", "warrior", "paladin", "shaman"],
    slots: ["two-hand"]
  },
  {
    itemId: 9459,
    name: "Thermaplugg's Left Arm",
    quality: "q3",
    iLvl: 37,
    reqLevel: 32,
    icon: "inv_axe_03",
    weaponType: "Two-Handed Axe",
    speed: "2.70",
    dps: "32.59 DPS",
    stats: "+17 Strength, +5 Stamina, +4 Intellect",
    lines: [
      "Binds when picked up",
      "Two-Hand\tTwo-Handed Axe",
      "66 - 110 Damage\tSpeed 2.70",
      "(32.59 damage per second)",
      "+17 Strength",
      "+5 Stamina",
      "+4 Intellect",
      "Requires Level 32"
    ],
    source: { kind: "dungeon", title: "Mekgineer Thermaplugg", detail: "Gnomeregan" },
    value: "32.6 DPS, 2.70s, +17 Str, +5 Sta - Gnomeregan: Mekgineer Thermaplugg",
    minBracket: 31,
    maxBracket: 38,
    classes: ["warrior", "paladin", "shaman", "hunter"],
    slots: ["two-hand"]
  },
  {
    itemId: 9488,
    name: "Oscillating Power Hammer",
    quality: "q3",
    iLvl: 33,
    reqLevel: 28,
    icon: "inv_hammer_08",
    weaponType: "One-Handed Mace",
    speed: "2.00",
    dps: "17.50 DPS",
    stats: "+6 Strength, +3 Stamina",
    lines: [
      "Binds when picked up",
      "One-Hand\tOne-Handed Mace",
      "26 - 49 Damage\tSpeed 2.00",
      "(17.50 damage per second)",
      "+6 Strength",
      "+3 Stamina",
      "Requires Level 28"
    ],
    source: { kind: "dungeon", title: "Mekgineer Thermaplugg", detail: "Gnomeregan" },
    value: "17.5 DPS, 2.00s, +6 Str, +3 Sta - Gnomeregan: Mekgineer Thermaplugg",
    minBracket: 27,
    maxBracket: 34,
    classes: ["warrior", "paladin", "shaman", "rogue", "druid"],
    slots: ["one-hand"]
  },
  {
    itemId: 9445,
    name: "Grubbis Paws",
    quality: "q3",
    iLvl: 30,
    reqLevel: 25,
    icon: "inv_gauntlets_17",
    weaponType: "Fist Weapon",
    speed: "1.60",
    dps: "18.13 DPS",
    stats: "+7 Strength, +3 Stamina",
    lines: [
      "Binds when picked up",
      "One-Hand\tFist Weapon",
      "22 - 42 Damage\tSpeed 1.60",
      "(18.13 damage per second)",
      "+7 Strength",
      "+3 Stamina",
      "Requires Level 25"
    ],
    source: { kind: "dungeon", title: "Grubbis", detail: "Gnomeregan" },
    value: "18.1 DPS, 1.60s, +7 Str, +3 Sta - Gnomeregan: Grubbis",
    minBracket: 25,
    maxBracket: 32,
    classes: ["rogue", "warrior", "shaman", "druid"],
    slots: ["one-hand"]
  },

  // --- Razorfen Kraul ---
  {
    itemId: 6687,
    name: "Corpsemaker",
    quality: "q3",
    iLvl: 34,
    reqLevel: 29,
    icon: "inv_weapon_halbard_01",
    weaponType: "Two-Handed Axe",
    speed: "3.80",
    dps: "28.95 DPS",
    stats: "+15 Strength, +8 Stamina",
    lines: [
      "Binds when picked up",
      "Two-Hand\tTwo-Handed Axe",
      "88 - 132 Damage\tSpeed 3.80",
      "(28.95 damage per second)",
      "+15 Strength",
      "+8 Stamina",
      "Requires Level 29"
    ],
    source: { kind: "dungeon", title: "Overlord Ramtusk", detail: "Razorfen Kraul" },
    value: "29.0 DPS, 3.80s, +15 Str, +8 Sta - Razorfen Kraul: Overlord Ramtusk",
    minBracket: 29,
    maxBracket: 36,
    classes: ["warrior", "paladin", "shaman", "hunter"],
    slots: ["two-hand"]
  },
  {
    itemId: 6688,
    name: "Death Speaker Scepter",
    quality: "q3",
    iLvl: 32,
    reqLevel: 27,
    icon: "inv_mace_01",
    weaponType: "One-Handed Mace",
    speed: "2.40",
    dps: "18.33 DPS",
    stats: "+5 Intellect, +3 Spirit, +3 Stamina",
    lines: [
      "Binds when picked up",
      "One-Hand\tOne-Handed Mace",
      "33 - 62 Damage\tSpeed 2.40",
      "(18.33 damage per second)",
      "+5 Intellect",
      "+3 Spirit",
      "+3 Stamina",
      "Requires Level 27"
    ],
    source: { kind: "dungeon", title: "Death Speaker Jargba", detail: "Razorfen Kraul" },
    value: "18.3 DPS, 2.40s, +5 Int, +3 Spi - Razorfen Kraul: Death Speaker Jargba",
    minBracket: 27,
    maxBracket: 34,
    classes: ["priest", "shaman", "paladin", "druid"],
    slots: ["one-hand"]
  },
  {
    itemId: 6691,
    name: "Swinetusk Shank",
    quality: "q3",
    iLvl: 36,
    reqLevel: 31,
    icon: "inv_misc_bone_06",
    weaponType: "Dagger",
    speed: "1.50",
    dps: "23.00 DPS",
    stats: "+6 Strength, +4 Agility",
    lines: [
      "Binds when picked up",
      "One-Hand\tDagger",
      "26 - 49 Damage\tSpeed 1.50",
      "(23.00 damage per second)",
      "+6 Strength",
      "+4 Agility",
      "Requires Level 31"
    ],
    source: { kind: "dungeon", title: "Agathelos the Raging", detail: "Razorfen Kraul" },
    value: "23.0 DPS, 1.50s, +6 Str, +4 Agi - Razorfen Kraul: Agathelos the Raging",
    minBracket: 29,
    maxBracket: 36,
    classes: ["rogue", "hunter", "warrior", "druid"],
    slots: ["one-hand"]
  },
  {
    itemId: 6689,
    name: "Wind Spirit Staff",
    quality: "q3",
    iLvl: 34,
    reqLevel: 29,
    icon: "inv_staff_01",
    weaponType: "Staff",
    speed: "3.30",
    dps: "26.67 DPS",
    stats: "+11 Spirit, +6 Stamina",
    lines: [
      "Binds when picked up",
      "Two-Hand\tStaff",
      "66 - 110 Damage\tSpeed 3.30",
      "(26.67 damage per second)",
      "+11 Spirit",
      "+6 Stamina",
      "Requires Level 29"
    ],
    source: { kind: "dungeon", title: "Earthcaller Halmgar", detail: "Razorfen Kraul" },
    value: "26.7 DPS, 3.30s, +11 Spi, +6 Sta - Razorfen Kraul: Earthcaller Halmgar",
    minBracket: 27,
    maxBracket: 36,
    classes: ["priest", "druid", "shaman", "mage", "warlock"],
    slots: ["two-hand"]
  },

  // --- Scarlet Monastery ---
  {
    itemId: 7685,
    name: "Orb of the Forgotten Seer",
    quality: "q3",
    iLvl: 36,
    reqLevel: 31,
    icon: "inv_misc_orb_02",
    weaponType: "Held in Off-hand",
    stats: "+12 Intellect, +5 Spirit, +6 Spell Power",
    lines: [
      "Binds when picked up",
      "Held In Off-hand",
      "+12 Intellect",
      "+5 Spirit",
      "Equip: Increases spell damage and healing by up to 6",
      "Requires Level 31"
    ],
    source: { kind: "dungeon", title: "Bloodmage Thalnos", detail: "Scarlet Monastery (Graveyard)" },
    value: "+12 Int, +5 Spi, +6 SP - Scarlet Monastery GY: Bloodmage Thalnos",
    minBracket: 31,
    maxBracket: 40,
    classes: ["mage", "priest", "warlock", "druid"],
    slots: ["off-hand"],
    isOffhand: true
  },
  {
    itemId: 7708,
    name: "Necrotic Wand",
    quality: "q3",
    iLvl: 36,
    reqLevel: 31,
    icon: "inv_wand_04",
    weaponType: "Wand",
    speed: "1.40",
    dps: "33.21 DPS",
    stats: "35 - 65 Shadow Damage, +6 Healing, +3 Spell Power",
    lines: [
      "Binds when picked up",
      "Ranged\tWand",
      "35 - 65 Shadow Damage\tSpeed 1.40",
      "(33.21 damage per second)",
      "Equip: Increases healing done by up to 6 and damage by up to 3",
      "Requires Level 31"
    ],
    source: { kind: "dungeon", title: "Azshir the Sleepless", detail: "Scarlet Monastery (Graveyard)" },
    value: "33.2 DPS, 1.40s, +6 Heal, +3 SP - Scarlet Monastery GY: Azshir the Sleepless",
    minBracket: 29,
    maxBracket: 38,
    classes: ["priest", "mage", "warlock"],
    slots: ["ranged"],
    isWand: true
  },
  {
    itemId: 7683,
    name: "Bloody Brass Knuckles",
    quality: "q3",
    iLvl: 34,
    reqLevel: 29,
    icon: "inv_gauntlets_04",
    weaponType: "Fist Weapon",
    speed: "1.60",
    dps: "21.88 DPS",
    stats: "+8 Strength, +3 Stamina",
    lines: [
      "Binds when picked up",
      "One-Hand\tFist Weapon",
      "24 - 46 Damage\tSpeed 1.60",
      "(21.88 damage per second)",
      "+8 Strength",
      "+3 Stamina",
      "Requires Level 29"
    ],
    source: { kind: "dungeon", title: "Interrogator Vishas", detail: "Scarlet Monastery (Graveyard)" },
    value: "21.9 DPS, 1.60s, +8 Str, +3 Sta - Scarlet Monastery GY: Interrogator Vishas",
    minBracket: 29,
    maxBracket: 36,
    classes: ["rogue", "warrior", "shaman", "druid"],
    slots: ["one-hand"]
  },
  {
    itemId: 7711,
    name: "Hypnotic Blade",
    quality: "q3",
    iLvl: 39,
    reqLevel: 34,
    icon: "inv_sword_33",
    weaponType: "Dagger",
    speed: "1.40",
    dps: "26.79 DPS",
    stats: "+8 Intellect, +3 Spirit, +9 Spell Power",
    lines: [
      "Binds when picked up",
      "One-Hand\tDagger",
      "28 - 53 Damage\tSpeed 1.40",
      "(26.79 damage per second)",
      "+8 Intellect",
      "+3 Spirit",
      "Equip: Increases damage and healing done by magical spells and effects by up to 9",
      "Requires Level 34"
    ],
    source: { kind: "dungeon", title: "Arcanist Doan", detail: "Scarlet Monastery (Library)" },
    value: "26.8 DPS, 1.40s, +8 Int, +3 Spi, +9 SP - Scarlet Monastery Lib: Arcanist Doan",
    minBracket: 33,
    maxBracket: 42,
    classes: ["mage", "priest", "warlock", "rogue", "druid", "shaman"],
    slots: ["one-hand"]
  },
  {
    itemId: 7752,
    name: "Illusionary Rod",
    quality: "q3",
    iLvl: 39,
    reqLevel: 34,
    icon: "inv_staff_13",
    weaponType: "Staff",
    speed: "2.90",
    dps: "29.14 DPS",
    stats: "+15 Intellect, +10 Spirit, +7 Stamina",
    lines: [
      "Binds when picked up",
      "Two-Hand\tStaff",
      "67 - 102 Damage\tSpeed 2.90",
      "(29.14 damage per second)",
      "+15 Intellect",
      "+10 Spirit",
      "+7 Stamina",
      "Requires Level 34"
    ],
    source: { kind: "dungeon", title: "Arcanist Doan", detail: "Scarlet Monastery (Library)" },
    value: "29.1 DPS, 2.90s, +15 Int, +10 Spi, +7 Sta - Scarlet Monastery Lib: Arcanist Doan",
    minBracket: 33,
    maxBracket: 42,
    classes: ["mage", "priest", "warlock", "druid", "shaman"],
    slots: ["two-hand"]
  },
  {
    itemId: 7717,
    name: "Ravager",
    quality: "q3",
    iLvl: 42,
    reqLevel: 37,
    icon: "inv_weapon_halberd_05",
    weaponType: "Two-Handed Axe",
    speed: "3.50",
    dps: "37.29 DPS",
    stats: "Chance on hit: You whirl around in a bladed tempest for 9 sec",
    lines: [
      "Binds when picked up",
      "Two-Hand\tTwo-Handed Axe",
      "104 - 157 Damage\tSpeed 3.50",
      "(37.29 damage per second)",
      "Chance on hit: You whirl around 3 targets for 9 sec",
      "Requires Level 37"
    ],
    source: { kind: "dungeon", title: "Herod", detail: "Scarlet Monastery (Armory)" },
    value: "37.3 DPS, 3.50s - Scarlet Monastery Armory: Herod",
    minBracket: 37,
    maxBracket: 44,
    classes: ["warrior", "paladin", "shaman", "hunter"],
    slots: ["two-hand"]
  },
  {
    itemId: 7726,
    name: "Aegis of the Scarlet Commander",
    quality: "q3",
    iLvl: 44,
    reqLevel: 39,
    icon: "inv_shield_05",
    weaponType: "Shield",
    armor: 1056,
    block: 29,
    stats: "+8 Strength, +7 Stamina",
    lines: [
      "Binds when picked up",
      "Off Hand\tShield",
      "1056 Armor",
      "29 Block",
      "+8 Strength",
      "+7 Stamina",
      "Requires Level 39"
    ],
    source: { kind: "dungeon", title: "Scarlet Commander Mograine", detail: "Scarlet Monastery (Cathedral)" },
    value: "1056 Armor, 29 Block, +8 Str, +7 Sta - Scarlet Monastery Cath: Mograine",
    minBracket: 37,
    maxBracket: 46,
    classes: ["warrior", "paladin", "shaman"],
    slots: ["off-hand"],
    isOffhand: true
  },
  {
    itemId: 7723,
    name: "Mograine's Might",
    quality: "q3",
    iLvl: 44,
    reqLevel: 39,
    icon: "inv_mace_13",
    weaponType: "Two-Handed Mace",
    speed: "2.80",
    dps: "38.93 DPS",
    stats: "+17 Strength, +16 Stamina",
    lines: [
      "Binds when picked up",
      "Two-Hand\tTwo-Handed Mace",
      "82 - 136 Damage\tSpeed 2.80",
      "(38.93 damage per second)",
      "+17 Strength",
      "+16 Stamina",
      "Requires Level 39"
    ],
    source: { kind: "dungeon", title: "Scarlet Commander Mograine", detail: "Scarlet Monastery (Cathedral)" },
    value: "38.9 DPS, 2.80s, +17 Str, +16 Sta - Scarlet Monastery Cath: Mograine",
    minBracket: 37,
    maxBracket: 46,
    classes: ["warrior", "paladin", "shaman", "druid"],
    slots: ["two-hand"]
  },
  {
    itemId: 7721,
    name: "Hand of Righteousness",
    quality: "q3",
    iLvl: 44,
    reqLevel: 39,
    icon: "inv_hammer_02",
    weaponType: "One-Handed Mace",
    speed: "2.70",
    dps: "29.81 DPS",
    stats: "+8 Intellect, +4 Spirit, +14 Healing",
    lines: [
      "Binds when picked up",
      "Main Hand\tOne-Handed Mace",
      "61 - 100 Damage\tSpeed 2.70",
      "(29.81 damage per second)",
      "+8 Intellect",
      "+4 Spirit",
      "Equip: Increases healing done by spells and effects by up to 14",
      "Requires Level 39"
    ],
    source: { kind: "dungeon", title: "High Inquisitor Whitemane", detail: "Scarlet Monastery (Cathedral)" },
    value: "29.8 DPS, 2.70s, +8 Int, +4 Spi, +14 Heal - Scarlet Monastery Cath: Whitemane",
    minBracket: 37,
    maxBracket: 46,
    classes: ["priest", "paladin", "shaman", "druid"],
    slots: ["one-hand", "main-hand"]
  },

  // --- Razorfen Downs ---
  {
    itemId: 10772,
    name: "Glutton's Cleaver",
    quality: "q2",
    iLvl: 45,
    reqLevel: 40,
    icon: "inv_axe_23",
    weaponType: "One-Handed Axe",
    speed: "2.00",
    dps: "23.00 DPS",
    stats: "+10 Strength, +4 Stamina",
    lines: [
      "Binds when picked up",
      "One-Hand\tOne-Handed Axe",
      "33 - 59 Damage\tSpeed 2.00",
      "(23.00 damage per second)",
      "+10 Strength",
      "+4 Stamina",
      "Requires Level 40"
    ],
    source: { kind: "dungeon", title: "Glutton", detail: "Razorfen Downs" },
    value: "23.0 DPS, 2.00s, +10 Str, +4 Sta - Razorfen Downs: Glutton",
    minBracket: 39,
    maxBracket: 46,
    classes: ["warrior", "shaman", "hunter"],
    slots: ["one-hand"]
  },
  {
    itemId: 10770,
    name: "Mordresh's Lifeless Skull",
    quality: "q3",
    iLvl: 42,
    reqLevel: 37,
    icon: "inv_misc_bone_elfskull_01",
    weaponType: "Held in Off-hand",
    stats: "+7 Intellect, +7 Stamina, +14 Spell Power",
    lines: [
      "Binds when picked up",
      "Held In Off-hand",
      "+7 Intellect",
      "+7 Stamina",
      "Equip: Increases damage and healing done by magical spells and effects by up to 14",
      "Requires Level 37"
    ],
    source: { kind: "dungeon", title: "Mordresh Fire Eye", detail: "Razorfen Downs" },
    value: "+7 Int, +7 Sta, +14 SP - Razorfen Downs: Mordresh Fire Eye",
    minBracket: 37,
    maxBracket: 46,
    classes: ["mage", "priest", "warlock", "druid"],
    slots: ["off-hand"],
    isOffhand: true
  },
  {
    itemId: 10761,
    name: "Coldrage Dagger",
    quality: "q3",
    iLvl: 44,
    reqLevel: 39,
    icon: "inv_sword_34",
    weaponType: "Dagger",
    speed: "1.50",
    dps: "29.67 DPS",
    stats: "Chance on hit: Frostbolt hits target for 40 to 60 Frost damage and slows by 50%",
    lines: [
      "Binds when picked up",
      "One-Hand\tDagger",
      "33 - 62 Damage\tSpeed 1.50",
      "(29.67 damage per second)",
      "Chance on hit: Frostbolt hits target for 40 to 60 Frost damage",
      "Requires Level 39"
    ],
    source: { kind: "dungeon", title: "Amnennar the Coldbringer", detail: "Razorfen Downs" },
    value: "29.7 DPS, 1.50s - Razorfen Downs: Amnennar the Coldbringer",
    minBracket: 37,
    maxBracket: 46,
    classes: ["rogue", "hunter", "warrior", "mage", "priest", "warlock", "druid"],
    slots: ["one-hand"]
  },

  // --- Uldaman ---
  {
    itemId: 9413,
    name: "The Rockpounder",
    quality: "q3",
    iLvl: 49,
    reqLevel: 44,
    icon: "inv_hammer_12",
    weaponType: "Two-Handed Mace",
    speed: "3.70",
    dps: "42.70 DPS",
    stats: "+5 Strength, +11 Stamina, +2% Crit",
    lines: [
      "Binds when picked up",
      "Two-Hand\tTwo-Handed Mace",
      "126 - 190 Damage\tSpeed 3.70",
      "(42.70 damage per second)",
      "+5 Strength",
      "+11 Stamina",
      "Equip: Improves your chance to get a critical strike by 2%",
      "Requires Level 44"
    ],
    source: { kind: "dungeon", title: "Archaedas", detail: "Uldaman" },
    value: "42.7 DPS, 3.70s, +5 Str, +11 Sta, +2% Crit - Uldaman: Archaedas",
    minBracket: 43,
    maxBracket: 52,
    classes: ["warrior", "paladin", "shaman", "druid"],
    slots: ["two-hand"]
  },
  {
    itemId: 9416,
    name: "Grimlok's Charge",
    quality: "q3",
    iLvl: 47,
    reqLevel: 42,
    icon: "inv_spear_08",
    weaponType: "Polearm",
    speed: "2.70",
    dps: "40.93 DPS",
    stats: "+15 Agility, +10 Strength, +10 Stamina",
    lines: [
      "Binds when picked up",
      "Two-Hand\tPolearm",
      "86 - 130 Damage\tSpeed 2.70",
      "(40.93 damage per second)",
      "+15 Agility",
      "+10 Strength",
      "+10 Stamina",
      "Requires Level 42"
    ],
    source: { kind: "dungeon", title: "Grimlok", detail: "Uldaman" },
    value: "40.9 DPS, 2.70s, +15 Agi, +10 Str, +10 Sta - Uldaman: Grimlok",
    minBracket: 41,
    maxBracket: 50,
    classes: ["hunter", "warrior", "paladin"],
    slots: ["two-hand"]
  },
  {
    itemId: 9418,
    name: "Stoneslayer",
    quality: "q3",
    iLvl: 49,
    reqLevel: 44,
    icon: "inv_sword_47",
    weaponType: "Two-Handed Sword",
    speed: "3.90",
    dps: "42.69 DPS",
    stats: "Chance on hit: Reduces enemy armor by 100",
    lines: [
      "Binds when picked up",
      "Two-Hand\tTwo-Handed Sword",
      "131 - 197 Damage\tSpeed 3.90",
      "(42.69 damage per second)",
      "Chance on hit: Reduces enemy armor by 100",
      "Requires Level 44"
    ],
    source: { kind: "dungeon", title: "Archaedas", detail: "Uldaman" },
    value: "42.7 DPS, 3.90s - Uldaman: Archaedas",
    minBracket: 43,
    maxBracket: 52,
    classes: ["warrior", "paladin", "hunter"],
    slots: ["two-hand"]
  },
  {
    itemId: 9415,
    name: "Galgann's Fireblaster",
    quality: "q3",
    iLvl: 47,
    reqLevel: 42,
    icon: "inv_weapon_rifle_07",
    weaponType: "Gun",
    speed: "2.60",
    dps: "24.62 DPS",
    stats: "+5 Agility, +3 Stamina",
    lines: [
      "Binds when picked up",
      "Ranged\tGun",
      "51 - 96 Damage\tSpeed 2.60",
      "(24.62 damage per second)",
      "+5 Agility",
      "+3 Stamina",
      "Requires Level 42"
    ],
    source: { kind: "dungeon", title: "Galgann Firehammer", detail: "Uldaman" },
    value: "24.6 DPS, 2.60s, +5 Agi, +3 Sta - Uldaman: Galgann Firehammer",
    minBracket: 41,
    maxBracket: 50,
    classes: ["hunter", "warrior", "rogue"],
    slots: ["ranged"]
  },

  // --- Zul'Farrak ---
  {
    itemId: 9379,
    name: "Sang'thraze the Deflector",
    quality: "q3",
    iLvl: 49,
    reqLevel: 44,
    icon: "inv_sword_45",
    weaponType: "One-Handed Sword",
    speed: "1.70",
    dps: "29.12 DPS",
    stats: "Chance on hit: Absorbs 120 damage and increases defense by 35 for 10 sec",
    lines: [
      "Binds when picked up",
      "One-Hand\tOne-Handed Sword",
      "37 - 70 Damage\tSpeed 1.70",
      "(29.12 damage per second)",
      "Chance on hit: Absorbs 120 damage and increases defense by 35",
      "Requires Level 44"
    ],
    source: { kind: "dungeon", title: "Antu'sul", detail: "Zul'Farrak" },
    value: "29.1 DPS, 1.70s - Zul'Farrak: Antu'sul",
    minBracket: 43,
    maxBracket: 52,
    classes: ["warrior", "rogue", "hunter", "paladin"],
    slots: ["one-hand"]
  },
  {
    itemId: 11086,
    name: "Jang'thraze the Protector",
    quality: "q3",
    iLvl: 50,
    reqLevel: 45,
    icon: "inv_sword_43",
    weaponType: "One-Handed Sword",
    speed: "1.90",
    dps: "33.42 DPS",
    stats: "Chance on hit: Slows enemy target and reduces attack power",
    lines: [
      "Binds when picked up",
      "One-Hand\tOne-Handed Sword",
      "47 - 88 Damage\tSpeed 1.90",
      "(33.42 damage per second)",
      "Chance on hit: Slows enemy target and reduces attack power",
      "Requires Level 45"
    ],
    source: { kind: "dungeon", title: "Chief Ukorz Sandscalp", detail: "Zul'Farrak" },
    value: "33.4 DPS, 1.90s - Zul'Farrak: Chief Ukorz Sandscalp",
    minBracket: 43,
    maxBracket: 52,
    classes: ["warrior", "rogue", "hunter", "paladin"],
    slots: ["one-hand"]
  },
  {
    itemId: 18082,
    name: "Zum'rah's Vexing Cane",
    quality: "q3",
    iLvl: 47,
    reqLevel: 42,
    icon: "inv_staff_10",
    weaponType: "Staff",
    speed: "2.70",
    dps: "40.93 DPS",
    stats: "+10 Intellect, +10 Stamina, +21 Spell Power",
    lines: [
      "Binds when picked up",
      "Two-Hand\tStaff",
      "86 - 130 Damage\tSpeed 2.70",
      "(40.93 damage per second)",
      "+10 Intellect",
      "+10 Stamina",
      "Equip: Increases damage and healing done by magical spells and effects by up to 21",
      "Requires Level 42"
    ],
    source: { kind: "dungeon", title: "Witch Doctor Zum'rah", detail: "Zul'Farrak" },
    value: "40.9 DPS, 2.70s, +10 Int, +10 Sta, +21 SP - Zul'Farrak: Witch Doctor Zum'rah",
    minBracket: 41,
    maxBracket: 50,
    classes: ["mage", "priest", "warlock", "druid", "shaman"],
    slots: ["two-hand"]
  },
  {
    itemId: 10787,
    name: "Gahz'rilla Fang",
    quality: "q3",
    iLvl: 47,
    reqLevel: 42,
    icon: "inv_sword_33",
    weaponType: "Dagger",
    speed: "1.80",
    dps: "32.22 DPS",
    stats: "Chance on hit: Blasts target for 55 to 85 Frost damage and slows by 50%",
    lines: [
      "Binds when picked up",
      "One-Hand\tDagger",
      "42 - 79 Damage\tSpeed 1.80",
      "(32.22 damage per second)",
      "Chance on hit: Blasts target for 55 to 85 Frost damage",
      "Requires Level 42"
    ],
    source: { kind: "dungeon", title: "Gahz'rilla", detail: "Zul'Farrak" },
    value: "32.2 DPS, 1.80s - Zul'Farrak: Gahz'rilla",
    minBracket: 41,
    maxBracket: 50,
    classes: ["rogue", "hunter", "warrior", "druid"],
    slots: ["one-hand"]
  },

  // --- Maraudon ---
  {
    itemId: 17745,
    name: "Noxious Shooter",
    quality: "q3",
    iLvl: 51,
    reqLevel: 46,
    icon: "inv_wand_04",
    weaponType: "Wand",
    speed: "1.60",
    dps: "50.00 DPS",
    stats: "57 - 107 Nature Damage, +5 Stamina, +5 Spell Power",
    lines: [
      "Binds when picked up",
      "Ranged\tWand",
      "57 - 107 Nature Damage\tSpeed 1.60",
      "(50.00 damage per second)",
      "+5 Stamina",
      "Equip: Increases damage and healing done by magical spells and effects by up to 5",
      "Requires Level 46"
    ],
    source: { kind: "dungeon", title: "Noxxion", detail: "Maraudon" },
    value: "50.0 DPS, 1.60s, +5 Sta, +5 SP - Maraudon: Noxxion",
    minBracket: 45,
    maxBracket: 54,
    classes: ["mage", "priest", "warlock"],
    slots: ["ranged"],
    isWand: true
  },
  {
    itemId: 17780,
    name: "Blade of Eternal Darkness",
    quality: "q4",
    iLvl: 54,
    reqLevel: 49,
    icon: "inv_sword_09",
    weaponType: "Dagger",
    speed: "1.50",
    dps: "34.67 DPS",
    stats: "Equip: Chance on spell cast to deal 100 Shadow damage and restore 100 mana",
    lines: [
      "Binds when picked up",
      "Main Hand\tDagger",
      "39 - 73 Damage\tSpeed 1.50",
      "(34.67 damage per second)",
      "Equip: Chance on spell cast to deal 100 Shadow damage to target and restore 100 mana to you",
      "Requires Level 49"
    ],
    source: { kind: "dungeon", title: "Princess Theradras", detail: "Maraudon" },
    value: "34.7 DPS, 1.50s, 100 Mana proc on cast - Maraudon: Princess Theradras",
    minBracket: 47,
    maxBracket: 56,
    classes: ["mage", "priest", "warlock", "druid"],
    slots: ["main-hand", "one-hand"]
  },
  {
    itemId: 17718,
    name: "Gizlock's Hypertech Buckler",
    quality: "q3",
    iLvl: 53,
    reqLevel: 48,
    icon: "inv_shield_10",
    weaponType: "Shield",
    armor: 1482,
    block: 39,
    stats: "+11 Stamina, +5 Intellect, +5 Spirit",
    lines: [
      "Binds when picked up",
      "Off Hand\tShield",
      "1482 Armor",
      "39 Block",
      "+11 Stamina",
      "+5 Intellect",
      "+5 Spirit",
      "Requires Level 48"
    ],
    source: { kind: "dungeon", title: "Tinkerer Gizlock", detail: "Maraudon" },
    value: "1482 Armor, 39 Block, +11 Sta, +5 Int, +5 Spi - Maraudon: Tinkerer Gizlock",
    minBracket: 47,
    maxBracket: 56,
    classes: ["warrior", "paladin", "shaman"],
    slots: ["off-hand"],
    isOffhand: true
  },
  {
    itemId: 17719,
    name: "Inventor's Focal Sword",
    quality: "q3",
    iLvl: 53,
    reqLevel: 48,
    icon: "inv_sword_14",
    weaponType: "One-Handed Sword",
    speed: "2.20",
    dps: "35.23 DPS",
    stats: "+60 Spell Power, +14 Crit",
    lines: [
      "Binds when picked up",
      "One-Hand\tOne-Handed Sword",
      "54 - 101 Damage\tSpeed 2.20",
      "(35.23 damage per second)",
      "Equip: Increases damage and healing done by magical spells and effects by up to 60",
      "Equip: Improves your chance to get a critical strike with spells by 1%",
      "Requires Level 48"
    ],
    source: { kind: "dungeon", title: "Tinkerer Gizlock", detail: "Maraudon" },
    value: "35.2 DPS, 2.20s, +60 SP, +14 Crit - Maraudon: Tinkerer Gizlock",
    minBracket: 47,
    maxBracket: 56,
    classes: ["mage", "warlock", "paladin"],
    slots: ["one-hand"]
  },
  {
    itemId: 17766,
    name: "Princess Theradras' Scepter",
    quality: "q3",
    iLvl: 54,
    reqLevel: 49,
    icon: "inv_hammer_10",
    weaponType: "Two-Handed Mace",
    speed: "3.40",
    dps: "46.47 DPS",
    stats: "+17 Strength, +11 Stamina, +10 Agility",
    lines: [
      "Binds when picked up",
      "Two-Hand\tTwo-Handed Mace",
      "126 - 190 Damage\tSpeed 3.40",
      "(46.47 damage per second)",
      "+17 Strength",
      "+11 Stamina",
      "+10 Agility",
      "Requires Level 49"
    ],
    source: { kind: "dungeon", title: "Princess Theradras", detail: "Maraudon" },
    value: "46.5 DPS, 3.40s, +17 Str, +11 Sta, +10 Agi - Maraudon: Princess Theradras",
    minBracket: 47,
    maxBracket: 56,
    classes: ["warrior", "paladin", "shaman", "druid"],
    slots: ["two-hand"]
  },

  // --- Sunken Temple ---
  {
    itemId: 10844,
    name: "Spire of Hakkar",
    quality: "q3",
    iLvl: 54,
    reqLevel: 49,
    icon: "inv_staff_32",
    weaponType: "Staff",
    speed: "3.40",
    dps: "46.47 DPS",
    stats: "+16 Spirit, +15 Intellect, +18 Spell Power",
    lines: [
      "Binds when picked up",
      "Two-Hand\tStaff",
      "126 - 190 Damage\tSpeed 3.40",
      "(46.47 damage per second)",
      "+16 Spirit",
      "+15 Intellect",
      "Equip: Increases damage and healing done by magical spells and effects by up to 18",
      "Requires Level 49"
    ],
    source: { kind: "dungeon", title: "Avatar of Hakkar", detail: "Sunken Temple" },
    value: "46.5 DPS, 3.40s, +16 Spi, +15 Int, +18 SP - Sunken Temple: Avatar of Hakkar",
    minBracket: 47,
    maxBracket: 56,
    classes: ["priest", "mage", "warlock", "druid", "shaman"],
    slots: ["two-hand"]
  },
  {
    itemId: 10847,
    name: "Dragon's Call",
    quality: "q4",
    iLvl: 57,
    reqLevel: 52,
    icon: "inv_sword_38",
    weaponType: "One-Handed Sword",
    speed: "2.50",
    dps: "41.40 DPS",
    stats: "Chance on hit: Calls forth an Emerald Dragon Whelp to protect you in battle",
    lines: [
      "Binds when picked up",
      "One-Hand\tOne-Handed Sword",
      "72 - 135 Damage\tSpeed 2.50",
      "(41.40 damage per second)",
      "Chance on hit: Calls forth an Emerald Dragon Whelp to protect you in battle",
      "Requires Level 52"
    ],
    source: { kind: "dungeon", title: "Shade of Eranikus", detail: "Sunken Temple" },
    value: "41.4 DPS, 2.50s, Dragon Whelp proc - Sunken Temple: Shade of Eranikus",
    minBracket: 51,
    maxBracket: 60,
    classes: ["rogue", "warrior", "paladin", "hunter"],
    slots: ["one-hand"]
  },
  {
    itemId: 10797,
    name: "Firebreather",
    quality: "q3",
    iLvl: 53,
    reqLevel: 48,
    icon: "inv_sword_09",
    weaponType: "One-Handed Sword",
    speed: "2.20",
    dps: "35.23 DPS",
    stats: "Chance on hit: Blasts target with Fireball for 70 Fire damage and 9 over 6 sec",
    lines: [
      "Binds when picked up",
      "One-Hand\tOne-Handed Sword",
      "54 - 101 Damage\tSpeed 2.20",
      "(35.23 damage per second)",
      "Chance on hit: Blasts target with Fireball for 70 Fire damage",
      "Requires Level 48"
    ],
    source: { kind: "dungeon", title: "Morphaz / Hazzas", detail: "Sunken Temple" },
    value: "35.2 DPS, 2.20s - Sunken Temple: Morphaz",
    minBracket: 47,
    maxBracket: 56,
    classes: ["rogue", "warrior", "paladin", "hunter"],
    slots: ["one-hand"]
  },

  // --- Blackrock Depths ---
  {
    itemId: 11628,
    name: "Houndmaster's Bow",
    quality: "q3",
    iLvl: 54,
    reqLevel: 49,
    icon: "inv_weapon_bow_04",
    weaponType: "Bow",
    speed: "1.80",
    dps: "27.22 DPS",
    stats: "+4 Agility, +5 Stamina",
    lines: [
      "Binds when picked up",
      "Ranged\tBow",
      "37 - 69 Damage\tSpeed 1.80",
      "(27.22 damage per second)",
      "+4 Agility",
      "+5 Stamina",
      "Requires Level 49"
    ],
    source: { kind: "dungeon", title: "Houndmaster Grebmar", detail: "Blackrock Depths" },
    value: "27.2 DPS, 1.80s, +4 Agi, +5 Sta - Blackrock Depths: Houndmaster Grebmar",
    minBracket: 47,
    maxBracket: 56,
    classes: ["hunter", "warrior", "rogue"],
    slots: ["ranged"]
  },
  {
    itemId: 11748,
    name: "Pyric Caduceus",
    quality: "q3",
    iLvl: 55,
    reqLevel: 50,
    icon: "inv_staff_13",
    weaponType: "Wand",
    speed: "1.80",
    dps: "52.50 DPS",
    stats: "67 - 122 Fire Damage, +3 Spirit, +6 Fire Spell Damage",
    lines: [
      "Binds when picked up",
      "Ranged\tWand",
      "67 - 122 Fire Damage\tSpeed 1.80",
      "(52.50 damage per second)",
      "+3 Spirit",
      "Equip: Increases damage done by Fire spells and effects by up to 6",
      "Requires Level 50"
    ],
    source: { kind: "dungeon", title: "Pyromancer Loregrain", detail: "Blackrock Depths" },
    value: "52.5 DPS, 1.80s, +3 Spi, +6 Fire SP - Blackrock Depths: Pyromancer Loregrain",
    minBracket: 49,
    maxBracket: 58,
    classes: ["mage", "priest", "warlock"],
    slots: ["ranged"],
    isWand: true
  },
  {
    itemId: 11684,
    name: "Ironfoe",
    quality: "q4",
    iLvl: 60,
    reqLevel: 55,
    icon: "spell_frost_frostbrand",
    weaponType: "One-Handed Mace",
    speed: "2.40",
    dps: "43.54 DPS",
    stats: "Chance on hit: Grants 2 extra attacks on your next swing",
    lines: [
      "Binds when picked up",
      "Main Hand\tOne-Handed Mace",
      "73 - 136 Damage\tSpeed 2.40",
      "(43.54 damage per second)",
      "Chance on hit: Grants 2 extra attacks on your next swing",
      "Requires Level 55"
    ],
    source: { kind: "dungeon", title: "Emperor Dagran Thaurissan", detail: "Blackrock Depths" },
    value: "43.5 DPS, 2.40s, 2 Extra Attacks proc - Blackrock Depths: Emperor Thaurissan",
    minBracket: 55,
    maxBracket: 60,
    classes: ["warrior", "rogue", "shaman", "paladin"],
    slots: ["main-hand", "one-hand"]
  },
  {
    itemId: 11809,
    name: "Flame Wrath",
    quality: "q3",
    iLvl: 56,
    reqLevel: 51,
    icon: "inv_spear_01",
    weaponType: "Polearm",
    speed: "3.30",
    dps: "48.18 DPS",
    stats: "Chance on hit: Sends a fiery blast at up to 3 nearby enemies for 100 Fire damage",
    lines: [
      "Binds when picked up",
      "Two-Hand\tPolearm",
      "118 - 198 Damage\tSpeed 3.30",
      "(48.18 damage per second)",
      "Chance on hit: Sends a fiery blast at up to 3 nearby enemies for 100 Fire damage",
      "Requires Level 51"
    ],
    source: { kind: "dungeon", title: "Ambassador Flamelash", detail: "Blackrock Depths" },
    value: "48.2 DPS, 3.30s - Blackrock Depths: Ambassador Flamelash",
    minBracket: 51,
    maxBracket: 60,
    classes: ["hunter", "warrior", "paladin"],
    slots: ["two-hand"]
  },
  {
    itemId: 11816,
    name: "Angerforge's Battle Axe",
    quality: "q3",
    iLvl: 56,
    reqLevel: 51,
    icon: "inv_weapon_halberd_06",
    weaponType: "Two-Handed Axe",
    speed: "2.60",
    dps: "48.08 DPS",
    stats: "+22 Strength, +12 Stamina",
    lines: [
      "Binds when picked up",
      "Two-Hand\tTwo-Handed Axe",
      "95 - 155 Damage\tSpeed 2.60",
      "(48.08 damage per second)",
      "+22 Strength",
      "+12 Stamina",
      "Requires Level 51"
    ],
    source: { kind: "dungeon", title: "General Angerforge", detail: "Blackrock Depths" },
    value: "48.1 DPS, 2.60s, +22 Str, +12 Sta - Blackrock Depths: General Angerforge",
    minBracket: 51,
    maxBracket: 60,
    classes: ["warrior", "paladin", "shaman", "hunter"],
    slots: ["two-hand"]
  },
  {
    itemId: 11817,
    name: "Lord General's Sword",
    quality: "q3",
    iLvl: 56,
    reqLevel: 51,
    icon: "inv_sword_25",
    weaponType: "One-Handed Sword",
    speed: "2.60",
    dps: "36.92 DPS",
    stats: "+11 Strength, +5 Stamina",
    lines: [
      "Binds when picked up",
      "Main Hand\tOne-Handed Sword",
      "70 - 122 Damage\tSpeed 2.60",
      "(36.92 damage per second)",
      "+11 Strength",
      "+5 Stamina",
      "Requires Level 51"
    ],
    source: { kind: "dungeon", title: "General Angerforge", detail: "Blackrock Depths" },
    value: "36.9 DPS, 2.60s, +11 Str, +5 Sta - Blackrock Depths: General Angerforge",
    minBracket: 51,
    maxBracket: 60,
    classes: ["warrior", "paladin", "rogue", "hunter"],
    slots: ["main-hand", "one-hand"]
  },
  {
    itemId: 11920,
    name: "Wraith Scythe",
    quality: "q3",
    iLvl: 57,
    reqLevel: 52,
    icon: "inv_axe_13",
    weaponType: "One-Handed Axe",
    speed: "2.20",
    dps: "37.05 DPS",
    stats: "+9 Strength, +7 Agility, +5 Stamina",
    lines: [
      "Binds when picked up",
      "One-Hand\tOne-Handed Axe",
      "59 - 104 Damage\tSpeed 2.20",
      "(37.05 damage per second)",
      "+9 Strength",
      "+7 Agility",
      "+5 Stamina",
      "Requires Level 52"
    ],
    source: { kind: "dungeon", title: "Hurley Blackbreath", detail: "Blackrock Depths" },
    value: "37.1 DPS, 2.20s, +9 Str, +7 Agi, +5 Sta - Blackrock Depths: Hurley Blackbreath",
    minBracket: 51,
    maxBracket: 60,
    classes: ["warrior", "shaman", "hunter"],
    slots: ["one-hand"]
  },
  {
    itemId: 12791,
    name: "Barman Shanker",
    quality: "q3",
    iLvl: 55,
    reqLevel: 50,
    icon: "inv_drink_10",
    weaponType: "Dagger",
    speed: "2.00",
    dps: "36.50 DPS",
    stats: "Chance on hit: Causes target to bleed for 100 damage over 30 sec",
    lines: [
      "Binds when picked up",
      "One-Hand\tDagger",
      "51 - 95 Damage\tSpeed 2.00",
      "(36.50 damage per second)",
      "Chance on hit: Causes target to bleed for 100 damage over 30 sec",
      "Requires Level 50"
    ],
    source: { kind: "dungeon", title: "Plugger Spazzring", detail: "Blackrock Depths" },
    value: "36.5 DPS, 2.00s, Bleed proc - Blackrock Depths: Plugger Spazzring",
    minBracket: 49,
    maxBracket: 58,
    classes: ["rogue", "hunter", "warrior", "druid"],
    slots: ["one-hand"]
  },
  {
    itemId: 11923,
    name: "The Hammer of Grace",
    quality: "q3",
    iLvl: 57,
    reqLevel: 52,
    icon: "inv_hammer_07",
    weaponType: "One-Handed Mace",
    speed: "2.70",
    dps: "37.59 DPS",
    stats: "+10 Intellect, +31 Healing",
    lines: [
      "Binds when picked up",
      "Main Hand\tOne-Handed Mace",
      "74 - 129 Damage\tSpeed 2.70",
      "(37.59 damage per second)",
      "+10 Intellect",
      "Equip: Increases healing done by spells and effects by up to 31",
      "Requires Level 52"
    ],
    source: { kind: "dungeon", title: "Chest of The Seven", detail: "Blackrock Depths" },
    value: "37.6 DPS, 2.70s, +10 Int, +31 Heal - Blackrock Depths: Chest of The Seven",
    minBracket: 51,
    maxBracket: 60,
    classes: ["priest", "paladin", "shaman", "druid"],
    slots: ["main-hand", "one-hand"]
  },
  {
    itemId: 11928,
    name: "Thaurissan's Royal Scepter",
    quality: "q3",
    iLvl: 60,
    reqLevel: 55,
    icon: "inv_mace_13",
    weaponType: "Held in Off-hand",
    stats: "+10 Intellect, +10 Spirit, +12 Spell Power",
    lines: [
      "Binds when picked up",
      "Held In Off-hand",
      "+10 Intellect",
      "+10 Spirit",
      "Equip: Increases damage and healing done by magical spells and effects by up to 12",
      "Requires Level 55"
    ],
    source: { kind: "dungeon", title: "Emperor Dagran Thaurissan", detail: "Blackrock Depths" },
    value: "+10 Int, +10 Spi, +12 SP - Blackrock Depths: Emperor Thaurissan",
    minBracket: 53,
    maxBracket: 60,
    classes: ["mage", "priest", "warlock", "druid"],
    slots: ["off-hand"],
    isOffhand: true
  },

  // --- Dire Maul & Scholomance High-Level Caster Off-Hands ---
  {
    itemId: 18338,
    name: "Tome of the Lost",
    quality: "q3",
    iLvl: 59,
    reqLevel: 54,
    icon: "inv_misc_book_06",
    weaponType: "Held in Off-hand",
    stats: "+17 Intellect, +7 Spirit",
    lines: [
      "Binds when picked up",
      "Held In Off-hand",
      "+17 Intellect",
      "+7 Spirit",
      "Requires Level 54"
    ],
    source: { kind: "dungeon", title: "Hydrospawn", detail: "Dire Maul" },
    value: "+17 Int, +7 Spi - Dire Maul: Hydrospawn",
    minBracket: 53,
    maxBracket: 60,
    classes: ["mage", "priest", "warlock", "druid"],
    slots: ["off-hand"],
    isOffhand: true
  },
  {
    itemId: 13951,
    name: "Krastinov's Bag of Horrors",
    quality: "q3",
    iLvl: 61,
    reqLevel: 56,
    icon: "inv_misc_bag_10_blue",
    weaponType: "Held in Off-hand",
    stats: "+8 Stamina, +11 Intellect, +14 Spirit",
    lines: [
      "Binds when picked up",
      "Held In Off-hand",
      "+8 Stamina",
      "+11 Intellect",
      "+14 Spirit",
      "Requires Level 56"
    ],
    source: { kind: "dungeon", title: "Doctor Theolen Krastinov", detail: "Scholomance" },
    value: "+8 Sta, +11 Int, +14 Spi - Scholomance: Doctor Theolen Krastinov",
    minBracket: 55,
    maxBracket: 60,
    classes: ["mage", "priest", "warlock", "druid"],
    slots: ["off-hand"],
    isOffhand: true
  },
  {
    itemId: 13385,
    name: "Tome of Knowledge",
    quality: "q4",
    iLvl: 61,
    reqLevel: 56,
    icon: "inv_misc_book_07",
    weaponType: "Held in Off-hand",
    armor: 30,
    stats: "+8 Strength, +8 Agility, +8 Stamina, +8 Intellect, +8 Spirit",
    lines: [
      "Binds when equipped",
      "Held In Off-hand",
      "30 Armor",
      "+8 Strength",
      "+8 Agility",
      "+8 Stamina",
      "+8 Intellect",
      "+8 Spirit",
      "Requires Level 56"
    ],
    source: { kind: "dungeon", title: "Lorekeeper Polkelt", detail: "Scholomance" },
    value: "30 Armor, +8 All Stats - Scholomance: Lorekeeper Polkelt",
    minBracket: 55,
    maxBracket: 60,
    classes: ["mage", "priest", "warlock", "druid", "paladin", "shaman"],
    slots: ["off-hand"],
    isOffhand: true
  }
];

// 1. Populate item cache
for (const drop of DUNGEON_DROPS) {
  const idStr = String(drop.itemId);
  cache[idStr] = {
    id: drop.itemId,
    name: drop.name,
    icon: drop.icon,
    iLvl: drop.iLvl,
    quality: drop.quality,
    reqLevel: drop.reqLevel,
    speed: drop.speed,
    dps: drop.dps,
    weaponType: drop.weaponType,
    armor: drop.armor,
    block: drop.block,
    stats: drop.stats,
    lines: drop.lines
  };
}
fs.writeFileSync(cachePath, JSON.stringify(cache, null, 2), 'utf8');
console.log(`[Cache] Successfully updated ${DUNGEON_DROPS.length} dungeon drops in forever_items_cache.json`);

// 2. Helper to find appropriate level step
function findStepForBracket(steps, minB, maxB) {
  let best = null;
  let bestScore = Infinity;
  for (const step of steps) {
    const parts = (step.levelBracket || '').split('–').map(n => parseInt(n.trim(), 10));
    const sMin = parts[0] || 1;
    const sMax = parts[1] || sMin;
    const mid = (sMin + sMax) / 2;
    const targetMid = (minB + maxB) / 2;
    const diff = Math.abs(mid - targetMid);
    // Prefer steps where minB falls inside [sMin - 3, sMax + 3]
    if (mid >= minB - 3 && mid <= maxB + 3) {
      if (diff < bestScore) {
        bestScore = diff;
        best = step;
      }
    }
  }
  return best;
}

// 3. Inject drops into weapons
let injectedWeaponCount = 0;
for (const drop of DUNGEON_DROPS) {
  if (drop.isOffhand || drop.isWand) continue;

  const altObj = {
    name: drop.name,
    itemId: drop.itemId,
    value: drop.value,
    faction: "both",
    dps: drop.dps,
    quality: drop.quality,
    iLvl: drop.iLvl,
    reqLevel: drop.reqLevel,
    stats: drop.stats,
    icon: drop.icon,
    weaponType: drop.weaponType,
    speed: drop.speed,
    lines: drop.lines,
    source: drop.source
  };

  for (const cls of drop.classes) {
    if (!weapons[cls]) continue;
    const stepSets = [weapons[cls].levels, weapons[cls].healingLevels, ...(Object.values(weapons[cls].tracksData || {}))].filter(Boolean);
    for (const stepSet of stepSets) {
      const step = findStepForBracket(stepSet, drop.minBracket, drop.maxBracket);
      if (step) {
        step.alts = step.alts || [];
        const exists = step.itemId === drop.itemId || step.alts.some(a => a.itemId === drop.itemId || a.name === drop.name);
        if (!exists) {
          step.alts.push(altObj);
          injectedWeaponCount++;
        } else {
          // Ensure existing alt or primary has proper source object
          if (step.itemId === drop.itemId && (!step.source || typeof step.source === 'string')) {
            step.source = drop.source;
          }
          const altMatch = step.alts.find(a => a.itemId === drop.itemId || a.name === drop.name);
          if (altMatch && (!altMatch.source || typeof altMatch.source === 'string')) {
            altMatch.source = drop.source;
          }
        }
      }
    }
  }
}
console.log(`[Weapons] Injected ${injectedWeaponCount} dungeon drop occurrences across weapons progression.`);

// 4. Inject drops into wands
let injectedWandCount = 0;
for (const drop of DUNGEON_DROPS) {
  if (!drop.isWand) continue;

  const altObj = {
    name: drop.name,
    itemId: drop.itemId,
    value: drop.value,
    faction: "both",
    dps: drop.dps,
    quality: drop.quality,
    iLvl: drop.iLvl,
    reqLevel: drop.reqLevel,
    stats: drop.stats,
    icon: drop.icon,
    weaponType: drop.weaponType,
    speed: drop.speed,
    lines: drop.lines,
    source: drop.source
  };

  for (const cls of drop.classes) {
    if (!wands[cls] || !wands[cls].levels) continue;
    const step = findStepForBracket(wands[cls].levels, drop.minBracket, drop.maxBracket);
    if (step) {
      step.alts = step.alts || [];
      const exists = step.itemId === drop.itemId || step.alts.some(a => a.itemId === drop.itemId || a.name === drop.name);
      if (!exists) {
        step.alts.push(altObj);
        injectedWandCount++;
      } else {
        if (step.itemId === drop.itemId && (!step.source || typeof step.source === 'string')) {
          step.source = drop.source;
        }
        const altMatch = step.alts.find(a => a.itemId === drop.itemId || a.name === drop.name);
        if (altMatch && (!altMatch.source || typeof altMatch.source === 'string')) {
          altMatch.source = drop.source;
        }
      }
    }
  }
}
console.log(`[Wands] Injected ${injectedWandCount} dungeon wand occurrences across wand progression.`);

// 5. Inject drops into offhands / shields
let injectedOffhandCount = 0;
for (const drop of DUNGEON_DROPS) {
  if (!drop.isOffhand) continue;

  const altObj = {
    name: drop.name,
    itemId: drop.itemId,
    value: drop.value,
    faction: "both",
    dps: "",
    quality: drop.quality,
    iLvl: drop.iLvl,
    reqLevel: drop.reqLevel,
    stats: drop.stats,
    icon: drop.icon,
    weaponType: drop.weaponType,
    armor: drop.armor,
    block: drop.block,
    lines: drop.lines,
    source: drop.source
  };

  for (const cls of drop.classes) {
    if (!offhands[cls]) continue;
    const stepSets = [
      offhands[cls].levels,
      offhands[cls].healingLevels,
      ...(Object.values(offhands[cls].tracksData || {}))
    ].filter(Boolean);
    for (const stepSet of stepSets) {
      const step = findStepForBracket(stepSet, drop.minBracket, drop.maxBracket);
      if (step) {
        step.alts = step.alts || [];
        const exists = step.itemId === drop.itemId || step.alts.some(a => a.itemId === drop.itemId || a.name === drop.name);
        if (!exists) {
          step.alts.push(altObj);
          injectedOffhandCount++;
        } else {
          if (step.itemId === drop.itemId && (!step.source || typeof step.source === 'string')) {
            step.source = drop.source;
          }
          const altMatch = step.alts.find(a => a.itemId === drop.itemId || a.name === drop.name);
          if (altMatch && (!altMatch.source || typeof altMatch.source === 'string')) {
            altMatch.source = drop.source;
          }
        }
      }
    }
  }
}
console.log(`[Offhands] Injected ${injectedOffhandCount} dungeon shield/offhand occurrences across offhands progression.`);

// Ensure Hornbeam Heft (271772) is in cache with full lines
if (!cache['271772']) {
  cache['271772'] = {
    id: 271772,
    name: 'Hornbeam Heft',
    icon: 'inv_axe_02',
    iLvl: 33,
    quality: 'q3',
    reqLevel: 28,
    speed: '2.40',
    dps: '16.88 DPS',
    weaponType: 'One-Handed Axe',
    inventorySlot: 'One-Hand',
    stats: '+6 Strength, +4 Agility',
    lines: [
      'Binds when picked up',
      'One-Hand\tOne-Handed Axe',
      '31 - 50 Damage\tSpeed 2.40',
      '(16.88 damage per second)',
      '+6 Strength',
      '+4 Agility',
      'Requires Level 28'
    ]
  };
}

// Fix Priest 19-22 in offhands.priest.levels
if (offhands.priest && Array.isArray(offhands.priest.levels)) {
  const pStep = offhands.priest.levels.find(l => l.levelBracket === '19–22');
  if (pStep && (pStep.itemId === 6898 || pStep.name === "Orb of Soran'ruk")) {
    pStep.itemId = 279838;
    pStep.name = "Arcane Infused Rod";
    pStep.icon = "inv_wand_01";
    pStep.stats = "+5 Intellect, +3 Spirit, +5 Spell Power";
    pStep.lines = [
      "Binds when picked up",
      "Held In Off-hand",
      "+5 Intellect",
      "+3 Spirit",
      "Equip: Increases damage and healing done by magical spells and effects by up to 5",
      "Requires Level 20"
    ];
    pStep.source = {
      kind: "quest",
      title: "Arcane Infused Rod",
      detail: "Ashenvale / Darkshore quest reward. Balanced intellect, spirit, and early spell power."
    };
  }
}

// 6. Systematic source normalization across all weapons, wands, and offhands
const DUNGEON_ZONES = new Set([1581, 719, 717, 721, 493, 722, 796, 1337, 1176, 2100, 1477, 1584, 2437, 718, 209, 2017, 2057, 2557]);
const DUNGEON_BOSS_NAMES = new Set([
  'taragaman the hungerer', 'jergosh the invoker', 'bazzalan', 'maur grimtotem',
  'rhahk\'zor', 'sneed', 'mr. smite', 'captain greenskin', 'edwin vancleef', 'miner johnson', 'cookie',
  'kresh', 'lord pythas', 'lord serpentis', 'skum', 'verdan the everliving', 'trigore the lasher', 'boahn',
  'commander springvale', 'odo the blindwatcher', 'the butcher', 'archmage arugal', 'fenrus the devourer', 'wolf master nandeb',
  'ghamoo-ra', 'gelihast', 'old serra\'kis', 'aku\'mai', 'twilight lord kelris', 'baron aquanis',
  'kam deepfury', 'bruegal ironknuckle', 'targorr the dread', 'dextren ward', 'bazil thredd',
  'electrocutioner 6000', 'crowd pummeler 9-60', 'mekgineer thermaplugg', 'grubbis', 'viscous fallout',
  'overlord ramtusk', 'death speaker jargba', 'agathelos the raging', 'earthcaller halmgar', 'blind hunter', 'charlga razorflank',
  'bloodmage thalnos', 'azshir the sleepless', 'interrogator vishas', 'arcanist doan', 'houndmaster loksey', 'herod', 'scarlet commander mograine', 'high inquisitor whitemane',
  'glutton', 'mordresh fire eye', 'amnennar the coldbringer', 'plaguemaw the rotting', 'tuten\'kash',
  'archaedas', 'grimlok', 'ironaya', 'galgann firehammer', 'baelog', 'revelosh', 'ancient stone keeper',
  'antu\'sul', 'chief ukorz sandscalp', 'witch doctor zum\'rah', 'gahz\'rilla', 'theka the martyr', 'hydromancer velratha', 'nekrum gutchewer', 'shadowpriest seez\'kiz',
  'noxxion', 'princess theradras', 'tinkerer gizlock', 'lord vyletongue', 'celebras the cursed', 'landslide', 'rotgrip',
  'avatar of hakkar', 'shade of eranikus', 'morphaz', 'hazzas', 'dreamscythe', 'weaver', 'jammal\'an the prophet', 'atal\'alarion',
  'houndmaster grebmar', 'pyromancer loregrain', 'emperor dagran thaurissan', 'ambassador flamelash', 'general angerforge', 'hurley blackbreath', 'plugger spazzring', 'lord incendius', 'warden stilgiss', 'fineous darkvire', 'bael\'gar', 'high interrogator gerstahn', 'magmus', 'chest of the seven',
  'doctor theolen krastinov', 'lorekeeper polkelt', 'jandice barov', 'ras frostwhisper', 'darkmaster gandling', 'instructor malicia', 'lady illucia barov', 'lord alexei barov',
  'postman malown', 'timmy the cruel', 'cannon master willey', 'baroness anastari', 'archivist galford', 'balnazzar', 'baron rivendare', 'malor the zealous', 'magistrate barthilas',
  'hydrospawn', 'lethtendris', 'alzzin the wildshaper', 'prince tortheldrin', 'illyanna ravenoak', 'tendris warpwood', 'king gordok', 'guard mol\'dar', 'guard fengus', 'guard slip\'kik', 'captain kromcrush',
  'highlord omokk', 'war master voone', 'shadow hunter vosh\'gajin', 'overlord wyrmthalak', 'quartermaster zigris', 'gizrul the slavener', 'halycon', 'bannok grimaxe'
]);
const VENDOR_NAMES = new Set([
  'kelm hargunth', 'illiyana moonblaze', 'captain o\'neal', 'sergeant thunderhorn',
  'creeg bothunk', 'brammold deepmine', 'bryanna embreeze', 'dala fairmaw', 'kyle brennan',
  'barkeep kelly', 'tharynn bouden', 'grunt komak', 'morley firerider', 'zaldimar whefthun'
]);

function normalizeItemSource(item) {
  if (!item) return { kind: 'world', title: 'World Drop', detail: 'World Drop' };
  const idStr = String(item.itemId || '');
  const cItem = cache[idStr];
  const sm = cItem?.sourcemore || [];
  const text = ((typeof item.source === 'string' ? item.source : (item.source?.title || '')) + ' ' + (item.source?.detail || '') + ' ' + (item.value || '')).toLowerCase();

  // If already structured and has explicit valid kind
  if (typeof item.source === 'object' && item.source !== null && item.source.kind && item.source.title) {
    if (item.source.kind === 'drop' || item.source.kind === 'world') {
      const bossMatch = DUNGEON_BOSS_NAMES.has(item.source.title.toLowerCase().trim());
      if (bossMatch || sm.some(s => DUNGEON_ZONES.has(s.z))) {
        item.source.kind = 'dungeon';
        item.source.detail = item.source.detail || 'Dungeon Boss Drop';
      }
    }
    return item.source;
  }

  const rawStr = typeof item.source === 'string' ? item.source : (item.source?.title || '');

  // 1. Check dungeon bosses & zones
  if (DUNGEON_BOSS_NAMES.has(rawStr.toLowerCase().trim()) || sm.some(s => DUNGEON_ZONES.has(s.z) || DUNGEON_BOSS_NAMES.has(String(s.n || '').toLowerCase().trim()))) {
    const bossName = rawStr || sm.find(s => DUNGEON_BOSS_NAMES.has(String(s.n || '').toLowerCase().trim()))?.n || 'Dungeon Boss';
    return { kind: 'dungeon', title: bossName, detail: 'Dungeon Boss Drop' };
  }
  if (/dungeon|boss|instance|ragefire|wailing caverns|deadmines|shadowfang|blackfathom|stockade|gnomeregan|razorfen|scarlet monastery|monastery|armory|cathedral|graveyard|library|uldaman|zul'farrak|maraudon|sunken temple|atal'hakkar|blackrock depths|scholomance|stratholme|dire maul|\brfc\b|\bsfk\b|\bbfd\b|\brfk\b|\brfd\b|\bsm\b|\bzf\b|\bst\b|\bbrd\b|\blbrs\b|\bubrs\b|\bdm\b/i.test(text)) {
    return { kind: 'dungeon', title: rawStr || 'Dungeon Drop', detail: 'Dungeon Drop' };
  }

  // 2. Check quests (sourcemore t === 5 or quest keywords)
  const qObj = sm.find(s => s.t === 5);
  if (qObj || /quest|reward|wanted:|chain\b|turn-in|task:|contract|order|search for|return to|in the name of|the fate of|hidden enemies|leaders of the fang|test of|battle of|assault on/i.test(text)) {
    return { kind: 'quest', title: qObj?.n || rawStr || 'Quest Reward', detail: 'Leveling Quest Reward' };
  }

  // 3. Check vendor / craft (sourcemore t === 6 or vendor names / keywords)
  if (sm.some(s => s.t === 6) || /blacksmithing|engineering|leatherworking|tailoring|crafted|crafting/i.test(text)) {
    return { kind: 'craft', title: rawStr || 'Crafted Item', detail: 'Profession Craft' };
  }
  if (VENDOR_NAMES.has(rawStr.toLowerCase().trim()) || /vendor|purchased|sold by|merchant|provisioner|supply officer|sergeant|officer|starter/i.test(text)) {
    return { kind: 'vendor', title: rawStr || 'Vendor Purchase', detail: 'Vendor Purchase' };
  }

  // 4. Check world / rare drop
  if (/world drop|zone drop|rare drop|rare spawn|chest|leveling drop/i.test(text) || sm.some(s => s.t === 1 || s.t === 2)) {
    return { kind: 'world', title: rawStr || 'World Drop', detail: 'Zone Drop / Rare Mob' };
  }

  return { kind: 'world', title: rawStr || 'Leveling Item', detail: 'World Drop / Quest' };
}

function normalizeDataset(dataset) {
  for (const cls in dataset) {
    const cData = dataset[cls];
    const sets = [cData.levels, cData.healingLevels, ...(Object.values(cData.tracksData || {}))].filter(Boolean);
    for (const set of sets) {
      for (const step of set) {
        step.source = normalizeItemSource(step);
        if (step.itemId && !step.lines && cache[String(step.itemId)]?.lines) {
          step.lines = cache[String(step.itemId)].lines;
        }
        for (const alt of step.alts || []) {
          alt.source = normalizeItemSource(alt);
          if (alt.itemId && !alt.lines && cache[String(alt.itemId)]?.lines) {
            alt.lines = cache[String(alt.itemId)].lines;
          }
        }
      }
    }
  }
}

normalizeDataset(weapons);
normalizeDataset(wands);
normalizeDataset(offhands);

// Save files
fs.writeFileSync(cachePath, JSON.stringify(cache, null, 2), 'utf8');
fs.writeFileSync(fwPath, JSON.stringify(weapons, null, 2), 'utf8');
fs.writeFileSync(fwdPath, JSON.stringify(wands, null, 2), 'utf8');
fs.writeFileSync(foPath, JSON.stringify(offhands, null, 2), 'utf8');
console.log('[Enricher] Successfully saved forever_weapons.json, forever_wands.json, and forever_offhands.json');
