import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');

const cachePath = path.join(ROOT, 'scratch', 'forever_items_cache.json');
let cache = {};
if (fs.existsSync(cachePath)) {
  cache = JSON.parse(fs.readFileSync(cachePath, 'utf8'));
}

// Canonical replacements dictionary
const CANONICAL_REPLACEMENTS = {
  "Toxic Revenger": {
    itemId: 9453,
    name: "Toxic Revenger",
    icon: "inv_sword_04",
    weaponType: "One-Handed Sword",
    speed: "2.70",
    dps: "18.3 DPS",
    quality: "q3",
    iLvl: 32,
    reqLevel: 27,
    stats: "Chance on hit: Poisons target for 15 Nature damage every 3 sec for 15 sec.",
    lines: [
      "Binds when picked up",
      "One-Hand\tSword",
      "37 - 69 Damage\tSpeed 2.70",
      "(19.63 damage per second)",
      "Requires Level 27",
      "Chance on hit: Poisons target for 15 Nature damage every 3 sec for 15 sec."
    ],
    source: { kind: "dungeon", title: "Gnomeregan — Viscous Fallout", detail: "Proc sword with poison damage" }
  },
  "Silver-Thread Rod": {
    itemId: 7714,
    name: "Scepter of the Unholy",
    icon: "inv_mace_01",
    weaponType: "One-Handed Mace",
    speed: "2.00",
    dps: "14.2 DPS",
    quality: "q2",
    iLvl: 25,
    reqLevel: 20,
    stats: "+4 Spirit, +3 Stamina, Equip: Increases healing done by up to 11.",
    lines: [
      "Binds when picked up",
      "One-Hand\tMace",
      "22 - 42 Damage\tSpeed 2.00",
      "(16.00 damage per second)",
      "+4 Spirit",
      "+3 Stamina",
      "Requires Level 20",
      "Equip: Increases healing done by up to 11."
    ],
    source: { kind: "drop", title: "Dungeon Drop", detail: "Leveling healer mace" }
  },
  "Apprentice's Spellstaff": {
    itemId: 1412,
    name: "Apprentice's Staff",
    icon: "inv_staff_08",
    weaponType: "Staff",
    speed: "2.50",
    dps: "4.8 DPS",
    quality: "q2",
    iLvl: 12,
    reqLevel: 7,
    stats: "+2 Intellect, +1 Spirit",
    lines: [
      "Binds when equipped",
      "Two-Hand\tStaff",
      "10 - 16 Damage\tSpeed 2.50",
      "(5.20 damage per second)",
      "+2 Intellect",
      "+1 Spirit",
      "Requires Level 7"
    ],
    source: { kind: "vendor", title: "Staff Vendor", detail: "Early leveling caster staff" }
  },
  "Scepter of the Abandoned": {
    itemId: 6323,
    name: "Odo's Ley Staff",
    icon: "inv_staff_02",
    weaponType: "Staff",
    speed: "2.70",
    dps: "16.1 DPS",
    quality: "q3",
    iLvl: 26,
    reqLevel: 21,
    stats: "+5 Intellect, +6 Spirit, +5 Stamina",
    lines: [
      "Binds when picked up",
      "Two-Hand\tStaff",
      "36 - 55 Damage\tSpeed 2.70",
      "(16.85 damage per second)",
      "+5 Intellect",
      "+6 Spirit",
      "+5 Stamina",
      "Requires Level 21"
    ],
    source: { kind: "dungeon", title: "Shadowfang Keep — Odo the Blindwatcher", detail: "Early caster dungeon staff" }
  },
  "Coldspire Staff": {
    itemId: 6536,
    name: "Rod of the Sleepwalker",
    icon: "inv_staff_21",
    weaponType: "Staff",
    speed: "3.20",
    dps: "17.8 DPS",
    quality: "q3",
    iLvl: 29,
    reqLevel: 24,
    stats: "+11 Intellect, +10 Spirit",
    lines: [
      "Binds when picked up",
      "Two-Hand\tStaff",
      "46 - 70 Damage\tSpeed 3.20",
      "(18.12 damage per second)",
      "+11 Intellect",
      "+10 Spirit",
      "Requires Level 24"
    ],
    source: { kind: "dungeon", title: "Blackfathom Deeps — Twilight Lord Kelris", detail: "Prime early healer staff" }
  },

  // 1. Staff of the Dor'Danil -> Gritroot Staff (The Relics of Wakening) or Curvewood Dagger (The Fragments Within)
  "Staff of the Dor'Danil": {
    name: "Gritroot Staff",
    itemId: 9603,
    icon: "inv_staff_22",
    weaponType: "Staff",
    speed: "2.60",
    dps: "5.4 DPS",
    quality: "q2",
    iLvl: 10,
    reqLevel: 4,
    stats: "+1 Stamina, +2 Spell Power",
    lines: [
      "Binds when picked up",
      "Two-Hand\tStaff",
      "11 - 17 Damage\tSpeed 2.60",
      "(5.38 damage per second)",
      "+1 Stamina",
      "+2 Spell Power",
      "Requires Level 4"
    ],
    source: { kind: "quest", title: "The Relics of Wakening", detail: "Quest reward from Teldrassil / Dolanaar." }
  },

  // 2. Deadmines / Dungeon boss drops with swapped contiguous IDs
  "Cruel Barb": {
    itemId: 5191,
    name: "Cruel Barb",
    icon: "inv_sword_26",
    weaponType: "One-Handed Sword",
    speed: "2.80",
    dps: "17.0 DPS",
    quality: "q3",
    iLvl: 24,
    reqLevel: 19,
    stats: "+12 Attack Power",
    lines: [
      "Binds when picked up",
      "One-Hand\tSword",
      "30 - 57 Damage\tSpeed 2.80",
      "(15.54 damage per second)",
      "+12 Attack Power",
      "Requires Level 19"
    ],
    source: { kind: "dungeon", title: "The Deadmines — Edwin VanCleef", detail: "Iconic rogue/warrior leveling sword" }
  },

  "Cookie's Tenderizer": {
    itemId: 5195,
    name: "Cookie's Tenderizer",
    icon: "inv_hammer_07",
    weaponType: "One-Handed Mace",
    speed: "2.40",
    dps: "10.8 DPS",
    quality: "q3",
    iLvl: 21,
    reqLevel: 16,
    stats: "+3 Strength, +2 Stamina",
    lines: [
      "Binds when picked up",
      "One-Hand\tMace",
      "20 - 38 Damage\tSpeed 2.40",
      "(12.08 damage per second)",
      "+3 Strength",
      "+2 Stamina",
      "Requires Level 16"
    ],
    source: { kind: "dungeon", title: "The Deadmines — Cookie", detail: "Deadmines rare drop" }
  },

  "Butcher's Slicer": {
    itemId: 6631,
    name: "Butcher's Slicer",
    icon: "inv_sword_18",
    weaponType: "One-Handed Sword",
    speed: "2.50",
    dps: "10.6 DPS",
    quality: "q3",
    iLvl: 21,
    reqLevel: 16,
    stats: "+3 Strength, +2 Agility",
    lines: [
      "Binds when picked up",
      "One-Hand\tSword",
      "21 - 40 Damage\tSpeed 2.50",
      "(12.20 damage per second)",
      "+3 Strength",
      "+2 Agility",
      "Requires Level 16"
    ],
    source: { kind: "dungeon", title: "Shadowfang Keep — Razorclaw the Butcher", detail: "SFK weapon drop" }
  },

  "Stoneslayer": {
    itemId: 9418,
    name: "Stoneslayer",
    icon: "inv_sword_26",
    weaponType: "Two-Handed Sword",
    speed: "3.90",
    dps: "37.1 DPS",
    quality: "q3",
    iLvl: 49,
    reqLevel: 44,
    stats: "+10 Strength, +7 Agility, +15 Stamina",
    lines: [
      "Binds when picked up",
      "Two-Hand\tSword",
      "121 - 183 Damage\tSpeed 3.90",
      "(38.97 damage per second)",
      "+10 Strength",
      "+7 Agility",
      "+15 Stamina",
      "Requires Level 44"
    ],
    source: { kind: "dungeon", title: "Uldaman — Archaedas", detail: "Massive slow two-handed sword" }
  },

  "Witchblade": {
    itemId: 13984,
    name: "Witchblade",
    icon: "inv_weapon_shortblade_16",
    weaponType: "Dagger",
    speed: "1.50",
    dps: "40.3 DPS",
    quality: "q3",
    iLvl: 62,
    reqLevel: 57,
    stats: "+8 Intellect, Equip: Increases damage and healing done by magical spells and effects by up to 14.",
    lines: [
      "Binds when picked up",
      "One-Hand\tDagger",
      "46 - 87 Damage\tSpeed 1.50",
      "(44.33 damage per second)",
      "+8 Intellect",
      "Requires Level 57",
      "Equip: Increases damage and healing done by magical spells and effects by up to 14."
    ],
    source: { kind: "dungeon", title: "Scholomance — Darkmaster Gandling", detail: "BiS caster dagger before raiding" }
  },

  "Swine Fists": {
    itemId: 10760,
    name: "Swine Fists",
    icon: "inv_gauntlets_04",
    weaponType: "Fist Weapon",
    speed: "2.40",
    dps: "23.8 DPS",
    quality: "q3",
    iLvl: 38,
    reqLevel: 33,
    stats: "+7 Strength, +6 Agility",
    lines: [
      "Binds when picked up",
      "Main Hand\tFist Weapon",
      "47 - 88 Damage\tSpeed 2.40",
      "(28.12 damage per second)",
      "+7 Strength",
      "+6 Agility",
      "Requires Level 33"
    ],
    source: { kind: "dungeon", title: "Razorfen Downs — Agathelos", detail: "Rare fist weapon drop" }
  },

  "Spire of the Stoneshaper": {
    itemId: 11805,
    name: "Spire of the Stoneshaper",
    icon: "inv_staff_29",
    weaponType: "Staff",
    speed: "2.90",
    dps: "36.2 DPS",
    quality: "q3",
    iLvl: 45,
    reqLevel: 40,
    stats: "+10 Intellect, +17 Spirit, +5 Stamina",
    lines: [
      "Binds when picked up",
      "Two-Hand\tStaff",
      "87 - 132 Damage\tSpeed 2.90",
      "(37.76 damage per second)",
      "+10 Intellect",
      "+17 Spirit",
      "+5 Stamina",
      "Requires Level 40"
    ],
    source: { kind: "dungeon", title: "Uldaman — Ironaya", detail: "Caster staff drop" }
  },

  "Woodchopper": {
    itemId: 2030,
    name: "Woodchopper",
    icon: "inv_axe_08",
    weaponType: "Two-Handed Axe",
    speed: "3.40",
    dps: "11.5 DPS",
    quality: "q2",
    iLvl: 19,
    reqLevel: 14,
    stats: "+5 Strength, +3 Stamina",
    lines: [
      "Binds when equipped",
      "Two-Hand\tAxe",
      "29 - 44 Damage\tSpeed 3.40",
      "(10.74 damage per second)",
      "+5 Strength",
      "+3 Stamina",
      "Requires Level 14"
    ],
    source: { kind: "drop", title: "World Drop BoE", detail: "Early leveling 2H axe" }
  },

  "Cobalt Crusher": {
    itemId: 7957,
    name: "Cobalt Crusher",
    icon: "inv_hammer_16",
    weaponType: "Two-Handed Mace",
    speed: "3.60",
    dps: "26.9 DPS",
    quality: "q3",
    iLvl: 38,
    reqLevel: 33,
    stats: "+12 Strength, +11 Stamina",
    lines: [
      "Binds when equipped",
      "Two-Hand\tMace",
      "81 - 122 Damage\tSpeed 3.60",
      "(28.19 damage per second)",
      "+12 Strength",
      "+11 Stamina",
      "Requires Level 33"
    ],
    source: { kind: "drop", title: "World Drop BoE", detail: "High impact 2H leveling mace" }
  },

  "Burning War Axe": {
    itemId: 811,
    name: "Burning War Axe",
    icon: "inv_axe_09",
    weaponType: "Two-Handed Axe",
    speed: "3.50",
    dps: "29.7 DPS",
    quality: "q3",
    iLvl: 40,
    reqLevel: 35,
    stats: "+14 Strength, +7 Agility, Chance on hit: Blasts a target for 60 Fire damage.",
    lines: [
      "Binds when equipped",
      "Two-Hand\tAxe",
      "88 - 133 Damage\tSpeed 3.50",
      "(31.57 damage per second)",
      "+14 Strength",
      "+7 Agility",
      "Requires Level 35",
      "Chance on hit: Blasts a target for 60 Fire damage."
    ],
    source: { kind: "drop", title: "World Drop BoE", detail: "Iconic fire-proc leveling 2H axe" }
  },

  "Smite's Mighty Hammer": {
    itemId: 7230,
    name: "Smite's Mighty Hammer",
    icon: "inv_hammer_09",
    weaponType: "Two-Handed Mace",
    speed: "3.50",
    dps: "19.8 DPS",
    quality: "q3",
    iLvl: 23,
    reqLevel: 18,
    stats: "+11 Strength, +4 Agility",
    lines: [
      "Binds when picked up",
      "Two-Hand\tMace",
      "55 - 83 Damage\tSpeed 3.50",
      "(19.71 damage per second)",
      "+11 Strength",
      "+4 Agility",
      "Requires Level 18"
    ],
    source: { kind: "dungeon", title: "The Deadmines — Mr. Smite", detail: "Iconic slow 2H leveling mace" }
  },

  "Scrappy Dagger": {
    itemId: 281722,
    name: "Scrappy Dagger",
    icon: "inv_weapon_shortblade_05",
    weaponType: "Dagger",
    speed: "1.50",
    dps: "4.5 DPS",
    quality: "q2",
    iLvl: 8,
    reqLevel: 4,
    stats: "+1 Agility",
    lines: [
      "Binds when picked up",
      "One-Hand\tDagger",
      "5 - 10 Damage\tSpeed 1.50",
      "(5.00 damage per second)",
      "+1 Agility",
      "Requires Level 4"
    ],
    source: { kind: "quest", title: "Starter Zone Quest", detail: "Early leveling dagger" }
  },

  // 3. Wands
  "Blackbone Wand": {
    itemId: 5239,
    name: "Blackbone Wand",
    icon: "inv_wand_02",
    weaponType: "Wand",
    speed: "1.50",
    dps: "15.3 DPS",
    quality: "q2",
    iLvl: 20,
    reqLevel: 15,
    stats: "18 - 34 Shadow Damage",
    lines: [
      "Binds when equipped",
      "Ranged\tWand",
      "18 - 34 Shadow Damage\tSpeed 1.50",
      "(17.33 damage per second)",
      "Requires Level 15"
    ],
    source: { kind: "vendor", title: "Wand Vendor / Trade", detail: "Early Shadow wand" }
  },

  "Wand of Biting Cold": {
    itemId: 19108,
    name: "Wand of Biting Cold",
    icon: "inv_wand_06",
    weaponType: "Wand",
    speed: "1.40",
    dps: "52.5 DPS",
    quality: "q3",
    iLvl: 60,
    reqLevel: 51,
    stats: "59 - 110 Frost Damage",
    lines: [
      "Binds when picked up",
      "Ranged\tWand",
      "59 - 110 Frost Damage\tSpeed 1.40",
      "(60.36 damage per second)",
      "Requires Level 51"
    ],
    source: { kind: "quest", title: "The Battle for Alterac", detail: "Alterac Valley quest reward wand" }
  },

  "Crimson Shocker": {
    itemId: 17077,
    name: "Crimson Shocker",
    icon: "inv_wand_05",
    weaponType: "Wand",
    speed: "1.50",
    dps: "54.0 DPS",
    quality: "q3",
    iLvl: 62,
    reqLevel: 57,
    stats: "67 - 126 Fire Damage",
    lines: [
      "Binds when equipped",
      "Ranged\tWand",
      "67 - 126 Fire Damage\tSpeed 1.50",
      "(64.33 damage per second)",
      "Requires Level 57"
    ],
    source: { kind: "drop", title: "Molten Core / World Drop BoE", detail: "High fire damage raiding wand" }
  },

  // 4. Off-hands & Shields
  "Battered Viking Shield": {
    itemId: 9401,
    name: "Battered Viking Shield",
    icon: "inv_shield_06",
    weaponType: "Shield",
    armor: 984,
    block: 22,
    quality: "q3",
    iLvl: 40,
    reqLevel: 35,
    stats: "+9 Strength, +7 Stamina, 984 Armor, 22 Block",
    lines: [
      "Binds when picked up",
      "Off Hand\tShield",
      "984 Armor",
      "22 Block",
      "+9 Strength",
      "+7 Stamina",
      "Requires Level 35"
    ],
    source: { kind: "dungeon", title: "Uldaman — Olaf / Eric / Baelog", detail: "Uldaman Lost Vikings shield" }
  },

  "Thermaplugg's Central Core": {
    itemId: 9456,
    name: "Thermaplugg's Central Core",
    icon: "inv_shield_11",
    weaponType: "Shield",
    armor: 721,
    block: 16,
    quality: "q3",
    iLvl: 34,
    reqLevel: 29,
    stats: "721 Armor, 16 Block, Equip: When struck in combat has a 5% chance of inflicting 50 Nature damage to all nearby enemies.",
    lines: [
      "Binds when picked up",
      "Off Hand\tShield",
      "721 Armor",
      "16 Block",
      "Requires Level 29",
      "Equip: When struck in combat has a 5% chance of inflicting 50 Nature damage to all nearby enemies."
    ],
    source: { kind: "dungeon", title: "Gnomeregan — Mekgineer Thermaplugg", detail: "Iconic Gnomeregan shield with AOE Nature retaliation" }
  },

  "Tome of the Fiery Arcana": {
    itemId: 19310,
    name: "Tome of the Fiery Arcana",
    icon: "inv_misc_book_06",
    weaponType: "Held in Off-Hand",
    quality: "q3",
    iLvl: 60,
    reqLevel: 55,
    stats: "+10 Intellect, +10 Spirit, Equip: Increases damage done by Fire spells and effects by up to 21.",
    lines: [
      "Binds when picked up",
      "Held In Off-hand",
      "+10 Intellect",
      "+10 Spirit",
      "Requires Level 55",
      "Equip: Increases damage done by Fire spells and effects by up to 21."
    ],
    source: { kind: "drop", title: "Blackwing Lair / World Drop", detail: "Fire caster off-hand" }
  },

  "Tome of Arcane Domination": {
    itemId: 19308,
    name: "Tome of Arcane Domination",
    icon: "inv_misc_book_07",
    weaponType: "Held in Off-Hand",
    quality: "q3",
    iLvl: 60,
    reqLevel: 55,
    stats: "+10 Intellect, +10 Spirit, Equip: Increases damage done by Arcane spells and effects by up to 21.",
    lines: [
      "Binds when picked up",
      "Held In Off-hand",
      "+10 Intellect",
      "+10 Spirit",
      "Requires Level 55",
      "Equip: Increases damage done by Arcane spells and effects by up to 21."
    ],
    source: { kind: "drop", title: "Blackwing Lair / World Drop", detail: "Arcane caster off-hand" }
  },

  "Master Dragonslayer's Orb": {
    itemId: 19315,
    name: "Master Dragonslayer's Orb",
    icon: "inv_misc_gem_pearl_01",
    weaponType: "Held in Off-Hand",
    quality: "q4",
    iLvl: 83,
    reqLevel: 60,
    stats: "+14 Stamina, Equip: Increases damage and healing done by magical spells and effects by up to 28.",
    lines: [
      "Binds when picked up",
      "Held In Off-hand",
      "+14 Stamina",
      "Requires Level 60",
      "Equip: Increases damage and healing done by magical spells and effects by up to 28."
    ],
    source: { kind: "quest", title: "Head of Nefarian (Blackwing Lair)", detail: "Nefarian head quest reward caster off-hand" }
  }
};

function patchItem(item) {
  if (!item || typeof item !== 'object') return;

  if (item.name && CANONICAL_REPLACEMENTS[item.name]) {
    const rep = CANONICAL_REPLACEMENTS[item.name];
    item.name = rep.name;
    item.itemId = rep.itemId;
    if (rep.icon) item.icon = rep.icon;
    if (rep.weaponType) item.weaponType = rep.weaponType;
    if (rep.quality) item.quality = rep.quality;
    if (rep.iLvl) item.iLvl = rep.iLvl;
    if (rep.reqLevel) item.reqLevel = rep.reqLevel;
    if (rep.speed) item.speed = rep.speed;
    if (rep.dps) item.dps = rep.dps;
    if (rep.stats) item.stats = rep.stats;
    if (rep.lines) item.lines = rep.lines;
    if (rep.source) item.source = rep.source;
    if (rep.armor) item.armor = rep.armor;
    if (rep.block) item.block = rep.block;
    return;
  }

  // Handle any remaining Dor'Danil
  if (item.name && item.name.includes("Dor'Danil")) {
    if (item.itemId === 15396) {
      // It's the Curvewood Dagger from Fragments Within
      item.name = "Curvewood Dagger";
      item.icon = "inv_weapon_shortblade_05";
      item.weaponType = "Dagger";
      item.quality = "q2";
      item.iLvl = 14;
      item.reqLevel = 6;
      item.speed = "1.50";
      item.dps = "7.0 DPS";
      item.stats = "+1 Stamina";
      item.lines = [
        "Binds when picked up",
        "One-Hand\tDagger",
        "7 - 14 Damage\tSpeed 1.50",
        "(7.00 damage per second)",
        "+1 Stamina",
        "Requires Level 6"
      ];
      item.source = { kind: "quest", title: "The Fragments Within", detail: "Early quest reward in Teldrassil." };
    } else {
      const rep = CANONICAL_REPLACEMENTS["Staff of the Dor'Danil"];
      item.name = rep.name;
      item.itemId = rep.itemId;
      item.icon = rep.icon;
      item.weaponType = rep.weaponType;
      item.speed = rep.speed;
      item.dps = rep.dps;
      item.stats = rep.stats;
      item.lines = rep.lines;
      item.source = rep.source;
      item.quality = rep.quality;
      item.iLvl = rep.iLvl;
      item.reqLevel = rep.reqLevel;
    }
  }
}

function deepPatch(obj) {
  if (!obj || typeof obj !== 'object') return;
  if (obj.name && (obj.itemId || obj.id)) {
    patchItem(obj);
  }
  for (const key of Object.keys(obj)) {
    deepPatch(obj[key]);
  }
}

// 1. Remediate forever_weapons.json
const fwPath = path.join(ROOT, 'data', 'scraped', 'forever_weapons.json');
const fw = JSON.parse(fs.readFileSync(fwPath, 'utf8'));
deepPatch(fw);
fs.writeFileSync(fwPath, JSON.stringify(fw, null, 2), 'utf8');
console.log('Deep patched forever_weapons.json');

// 2. Remediate forever_offhands.json
const foPath = path.join(ROOT, 'data', 'scraped', 'forever_offhands.json');
const fo = JSON.parse(fs.readFileSync(foPath, 'utf8'));
deepPatch(fo);
fs.writeFileSync(foPath, JSON.stringify(fo, null, 2), 'utf8');
console.log('Deep patched forever_offhands.json');

// 3. Remediate forever_wands.json
const fwanPath = path.join(ROOT, 'data', 'scraped', 'forever_wands.json');
const fwan = JSON.parse(fs.readFileSync(fwanPath, 'utf8'));
deepPatch(fwan);
fs.writeFileSync(fwanPath, JSON.stringify(fwan, null, 2), 'utf8');
console.log('Deep patched forever_wands.json');
