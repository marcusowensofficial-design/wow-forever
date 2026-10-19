/**
 * Comprehensive Healer Weapon Tracks & Missing Dungeon Drops/Quests Enricher
 * Generates:
 * 1. Dedicated Healer paths for Druid, Priest, Shaman, and Paladin (where Healing > Spell Damage).
 * 2. Complete 1-60 Shield progression roadmaps for Warrior, Paladin, and Shaman.
 * 3. Dedicated Healer vs DPS off-hand paths for Druid, Priest, Shaman, Paladin.
 * 4. Injects missing WoW Forever dungeon items (Mirror of Rath'mael, Bonepile Gaze, Ironwood Destroyer, Hornbeam Heft)
 *    and classic dungeon drops/quests (Cookie's Stirring Rod, Commander's Crest, Seedcloud Buckler, etc.).
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');
const SCRAPED_DIR = path.join(ROOT, 'data', 'scraped');

// Load datasets
const whWeapons = JSON.parse(fs.readFileSync(path.join(SCRAPED_DIR, 'wowhead_forever_weapons.json'), 'utf8'));
const whOffhands = JSON.parse(fs.readFileSync(path.join(SCRAPED_DIR, 'wowhead_forever_offhands.json'), 'utf8'));
const whShields = JSON.parse(fs.readFileSync(path.join(SCRAPED_DIR, 'wowhead_forever_shields.json'), 'utf8'));
const currentWeapons = JSON.parse(fs.readFileSync(path.join(SCRAPED_DIR, 'forever_weapons.json'), 'utf8'));
const currentOffhands = JSON.parse(fs.readFileSync(path.join(SCRAPED_DIR, 'forever_offhands.json'), 'utf8'));
const currentWands = JSON.parse(fs.readFileSync(path.join(SCRAPED_DIR, 'forever_wands.json'), 'utf8'));

// Icon cache
const iconCachePath = path.join(ROOT, 'scratch', 'item_icons_cache.json');
let iconCache = {};
if (fs.existsSync(iconCachePath)) {
  try {
    iconCache = JSON.parse(fs.readFileSync(iconCachePath, 'utf8'));
  } catch {}
}

function getIcon(name, defaultIcon = 'inv_misc_questionmark') {
  const n = name.toLowerCase();
  if (n.includes('shield') || n.includes('buckler') || n.includes('crest') || n.includes('barrier') || n.includes('wall') || n.includes('aegis')) {
    if (n.includes('scarlet')) return 'inv_shield_06';
    if (n.includes('kresh')) return 'inv_shield_08';
    if (n.includes('commander')) return 'inv_shield_05';
    if (n.includes('bonepile')) return 'inv_shield_11';
    if (n.includes('mirror of rath')) return 'inv_shield_04';
    if (n.includes('agamaggan')) return 'inv_shield_07';
    if (n.includes('viking')) return 'inv_shield_04';
    if (n.includes('draconian')) return 'inv_shield_13';
    if (n.includes('immovable')) return 'inv_shield_08';
    if (n.includes('dented') || n.includes('battered')) return 'inv_shield_04';
    return 'inv_shield_04';
  }
  if (n.includes('scepter') || n.includes('mallet') || n.includes('hammer') || n.includes('mace')) {
    if (n.includes('royal diplomatic') || n.includes('death speaker')) return 'inv_mace_01';
    if (n.includes('hand of righteousness')) return 'inv_mace_08';
    if (n.includes('trogg')) return 'inv_mace_01';
    return 'inv_mace_04';
  }
  if (n.includes('staff') || n.includes('stave') || n.includes('rod')) {
    if (n.includes('westfall')) return 'inv_staff_08';
    if (n.includes('friar')) return 'inv_staff_13';
    if (n.includes('odo')) return 'inv_staff_12';
    if (n.includes('healer')) return 'inv_staff_10';
    if (n.includes('wind spirit')) return 'inv_staff_08';
    if (n.includes('resurgence')) return 'inv_staff_04';
    if (n.includes('benediction')) return 'inv_staff_30';
    return 'inv_staff_02';
  }
  return defaultIcon;
}

// -------------------------------------------------------------
// 1. INJECT MISSING DUNGEON ITEMS INTO EXISTING DPS ROADMAPS
// -------------------------------------------------------------

// Inject Ironwood Destroyer (Excavation Site: Wetlands) to Warrior, Paladin, Shaman, Druid
const ironwoodDestroyerAlt = {
  name: "Ironwood Destroyer",
  itemId: 271770,
  value: "22.5 DPS - 2H Mace from Excavation Site: Wetlands quest (Horrors in the Highland)",
  faction: "both",
  dps: "22.5 DPS",
  quality: "q3",
  iLvl: 33,
  reqLevel: 28,
  stats: "+9 Strength, +6 Stamina",
  icon: "inv_mace_05",
  weaponType: "Two-Handed Mace"
};

// Inject Hornbeam Heft (Excavation Site: Wetlands) to Warrior, Shaman, Rogue
const hornbeamHeftAlt = {
  name: "Hornbeam Heft",
  itemId: 271772,
  value: "16.8 DPS - 1H Axe from Excavation Site: Wetlands quest (Horrors in the Highland)",
  faction: "both",
  dps: "16.8 DPS",
  quality: "q3",
  iLvl: 33,
  reqLevel: 28,
  stats: "+6 Strength, +4 Agility",
  icon: "inv_axe_02",
  weaponType: "One-Handed Axe"
};

for (const cls of ['warrior', 'paladin', 'shaman', 'druid']) {
  if (currentWeapons[cls]) {
    const lvl28 = currentWeapons[cls].levels.find(l => l.levelBracket === '27–28' || l.levelBracket === '28–29' || l.levelBracket === '29–30');
    if (lvl28 && !lvl28.alts.some(a => a.name === "Ironwood Destroyer")) {
      lvl28.alts.push(ironwoodDestroyerAlt);
    }
  }
}

for (const cls of ['warrior', 'shaman']) {
  if (currentWeapons[cls]) {
    const lvl28 = currentWeapons[cls].levels.find(l => l.levelBracket === '27–28' || l.levelBracket === '28–29' || l.levelBracket === '29–30');
    if (lvl28 && !lvl28.alts.some(a => a.name === "Hornbeam Heft")) {
      lvl28.alts.push(hornbeamHeftAlt);
    }
  }
}

// Inject Cookie's Stirring Rod to Wands
if (currentWands.mage && currentWands.mage.levels) {
  const lvl19 = currentWands.mage.levels.find(l => l.levelBracket === '19–20' || l.levelBracket === '15–20');
  if (lvl19 && !lvl19.alts?.some(a => a.name === "Cookie's Stirring Rod")) {
    lvl19.alts = lvl19.alts || [];
    lvl19.alts.push({
      name: "Cookie's Stirring Rod",
      itemId: 5198,
      value: "11.2 DPS - Arcane Wand from Cookie in The Deadmines",
      faction: "both",
      dps: "11.2 DPS",
      quality: "q2",
      iLvl: 22,
      reqLevel: 17,
      stats: "+2 Arcane Resistance",
      icon: "inv_wand_02",
      weaponType: "Wand"
    });
  }
}

// -------------------------------------------------------------
// 2. BUILD DEDICATED HEALER WEAPON PROGRESSION (1-60)
// Focus on items where Healing > Spell Damage / pure healing / high spirit
// -------------------------------------------------------------

function isLegalHealerWeapon(cls, item) {
  const type = (item.weaponType || '').toLowerCase();
  const name = item.name.toLowerCase();
  const val = (item.value || '').toLowerCase();
  const text = `${type} ${name} ${val}`;

  if (cls === 'paladin') {
    if (text.includes('staff') || text.includes('stave') || text.includes('rod')) return false;
    if (text.includes('dagger') || text.includes('knife') || text.includes('dirk') || text.includes('shank') || text.includes('blade') && !text.includes('sword')) return false;
    if (text.includes('axe') || text.includes('cleaver')) return false;
  }
  if (cls === 'priest') {
    if (text.includes('sword') || text.includes('blade') || text.includes('saber') || text.includes('claymore')) return false;
    if (text.includes('axe') || text.includes('cleaver')) return false;
    if ((text.includes('2h') || text.includes('two-hand')) && (text.includes('mace') || text.includes('hammer') || text.includes('maul'))) return false;
  }
  if (cls === 'druid') {
    if (text.includes('sword') || text.includes('blade') || text.includes('saber') || text.includes('claymore')) return false;
    if (text.includes('axe') || text.includes('cleaver')) return false;
  }
  if (cls === 'shaman') {
    if (text.includes('sword') || text.includes('blade') || text.includes('saber') || text.includes('claymore')) return false;
  }
  return true;
}

function buildHealerWeaponPath(classId) {
  const path = [];

  // Bracket 1-6
  const b1Primary = (classId === 'paladin' || classId === 'shaman')
    ? {
        levelBracket: "1–6",
        itemId: 2493,
        name: "Wooden Mallet",
        icon: "inv_hammer_01",
        weaponType: "One-Handed Mace",
        speed: "2.00",
        dps: "1.8 DPS",
        stats: "+1 Spirit",
        source: {
          kind: "vendor",
          title: "Starter Weapon Vendor",
          detail: "Starting weapon or purchase from weapon merchants in starting zones."
        },
        faction: "both",
        quality: "q1",
        iLvl: 4,
        reqLevel: 1,
        alts: [
          {
            name: "Club",
            itemId: 2130,
            value: "+1 Spirit - Starter vendor mace",
            faction: "both",
            quality: "q1",
            iLvl: 4,
            reqLevel: 1,
            stats: "+1 Spirit",
            icon: "inv_axe_10",
            weaponType: "One-Handed Mace"
          }
        ]
      }
    : {
        levelBracket: "1–6",
        itemId: classId === 'priest' ? 2495 : 2132,
        name: classId === 'priest' ? "Acolyte's Staff" : "Short Staff",
        icon: "inv_staff_02",
        weaponType: "Staff",
        speed: "2.20",
        dps: "2.0 DPS",
        stats: "+1 Spirit",
        source: {
          kind: "vendor",
          title: "Starter Weapon Vendor",
          detail: "Starting weapon or purchase from weapon merchants in starting zones."
        },
        faction: "both",
        quality: "q1",
        iLvl: 4,
        reqLevel: 1,
        alts: [
          {
            name: "Club",
            itemId: 2130,
            value: "+1 Spirit - Starter vendor mace",
            faction: "both",
            quality: "q1",
            iLvl: 4,
            reqLevel: 1,
            stats: "+1 Spirit",
            icon: "inv_axe_10",
            weaponType: "One-Handed Mace"
          }
        ]
      };
  path.push(b1Primary);

  // Bracket 7-12
  const b2Primary = classId === 'paladin'
    ? {
        levelBracket: "7–12",
        itemId: 2493,
        name: "Wooden Mallet",
        icon: "inv_hammer_01",
        weaponType: "One-Handed Mace",
        speed: "2.00",
        dps: "2.5 DPS",
        stats: "+2 Spirit",
        source: {
          kind: "vendor",
          title: "Low-level Weapon Vendor",
          detail: "Purchased from starter merchants in Goldshire or Kharanos."
        },
        faction: "both",
        quality: "q1",
        iLvl: 9,
        reqLevel: 6,
        alts: [
          {
            name: "Heavy Copper Maul",
            itemId: 3489,
            value: "+2 Strength, +2 Stamina - Early Blacksmithing 2H Mace",
            faction: "both",
            quality: "q2",
            iLvl: 11,
            reqLevel: 6,
            stats: "+2 Strength, +2 Stamina",
            icon: "inv_hammer_04",
            weaponType: "Two-Handed Mace"
          }
        ]
      }
    : {
        levelBracket: "7–12",
        itemId: 2077,
        name: "Militia Quarterstaff",
        icon: "inv_staff_08",
        weaponType: "Staff",
        speed: "2.60",
        dps: "4.8 DPS",
        stats: "+2 Intellect, +2 Spirit",
        source: {
          kind: "vendor",
          title: "Low-level Weapon Vendor",
          detail: "Purchased from weapon merchants in Goldshire, Kharanos, Bloodhoof, or Brill."
        },
        faction: "both",
        quality: "q1",
        iLvl: 11,
        reqLevel: 7,
        alts: [
          {
            name: "Wooden Mallet",
            itemId: 2493,
            value: "+2 Spirit - Starter vendor mace",
            faction: "both",
            quality: "q1",
            iLvl: 9,
            reqLevel: 6,
            stats: "+2 Spirit",
            icon: "inv_hammer_01",
            weaponType: "One-Handed Mace"
          },
          {
            name: "Apprentice's Spellstaff",
            itemId: 4835,
            value: "+3 Spirit, +2 Intellect - Darkshore / Silverpine drop",
            faction: "both",
            quality: "q2",
            iLvl: 13,
            reqLevel: 8,
            stats: "+3 Spirit, +2 Intellect",
            icon: "inv_staff_02",
            weaponType: "Staff"
          }
        ]
      };
  path.push(b2Primary);

  // Bracket 13-17
  const b3Primary = classId === 'paladin'
    ? {
        levelBracket: "13–17",
        itemId: 271207,
        name: "Scepter of the Abandoned",
        icon: "inv_mace_01",
        weaponType: "Main Hand Mace",
        speed: "2.20",
        dps: "14.0 DPS",
        stats: "+4 Stamina, +4 Intellect",
        source: {
          kind: "drop",
          title: "The Abandoned (Ruins of Lordaeron)",
          detail: "WoW Forever custom dungeon boss drop. Superb early intellect mace."
        },
        faction: "both",
        quality: "q2",
        iLvl: 18,
        reqLevel: 14,
        alts: [
          {
            name: "Trogg Scepter",
            itemId: 272996,
            value: "+4 Spirit, +33 Healing / +11 Spell Dmg - Oggleflint (Ragefire Chasm)",
            faction: "both",
            quality: "q2",
            iLvl: 16,
            reqLevel: 11,
            stats: "+4 Spirit, Equip: Increases healing done by up to 33 and damage done by up to 11.",
            icon: "inv_mace_01",
            weaponType: "One-Handed Mace"
          },
          {
            name: "Smite's Mighty Hammer",
            itemId: 5195,
            value: "+11 Strength, +4 Agility - Mr. Smite (The Deadmines)",
            faction: "both",
            quality: "q3",
            iLvl: 23,
            reqLevel: 18,
            stats: "+11 Strength, +4 Agility",
            icon: "inv_hammer_04",
            weaponType: "Two-Handed Mace"
          }
        ]
      }
    : {
        levelBracket: "13–17",
        itemId: 271198,
        name: "Golemheart Stave",
        icon: "inv_staff_08",
        weaponType: "Staff",
        speed: "2.70",
        dps: "14.2 DPS",
        stats: "+5 Intellect, +4 Spirit",
        source: {
          kind: "drop",
          title: "Plunder (Hall of Thanes)",
          detail: "Drops from Plunder inside the Hall of Thanes (Beneath Ironforge). Prime early healer mana-pool staff."
        },
        faction: "both",
        quality: "q2",
        iLvl: 17,
        reqLevel: 13,
        alts: [
          {
            name: "Trogg Scepter",
            itemId: 272996,
            value: "+4 Spirit, +33 Healing / +11 Spell Dmg - Oggleflint (Ragefire Chasm)",
            faction: "both",
            quality: "q2",
            iLvl: 16,
            reqLevel: 11,
            stats: "+4 Spirit, Equip: Increases healing done by up to 33 and damage done by up to 11.",
            icon: "inv_mace_01",
            weaponType: "One-Handed Mace"
          },
          {
            name: "Scepter of the Abandoned",
            itemId: 271207,
            value: "+4 Stamina, +4 Intellect - The Abandoned (Ruins of Lordaeron)",
            faction: "both",
            quality: "q2",
            iLvl: 18,
            reqLevel: 14,
            stats: "+4 Stamina, +4 Intellect",
            icon: "inv_mace_01",
            weaponType: "Main Hand Mace"
          },
          {
            name: "Staff of the Dor'Danil",
            itemId: 6543,
            value: "+4 Intellect, +4 Spirit - Darkshore / Bloodmyst quest reward",
            faction: "alliance",
            quality: "q2",
            iLvl: 17,
            reqLevel: 12,
            stats: "+4 Intellect, +4 Spirit",
            icon: "inv_staff_02",
            weaponType: "Staff"
          }
        ]
      };
  path.push(b3Primary);

  // Bracket 18-21
  const b4Primary = classId === 'paladin'
    ? {
        levelBracket: "18–21",
        itemId: 6641,
        name: "Haunting Blade",
        icon: "inv_sword_26",
        weaponType: "Two-Handed Sword",
        speed: "3.00",
        dps: "18.2 DPS",
        stats: "Equip: Increases healing done by up to 33 and damage done by up to 11.",
        source: {
          kind: "drop",
          title: "Lordaeron Captain (Ruins of Lordaeron)",
          detail: "Drops from Lordaeron Captain in Ruins of Lordaeron or SFK. Direct +33 Healing 2H blade."
        },
        faction: "both",
        quality: "q3",
        iLvl: 27,
        reqLevel: 22,
        alts: [
          {
            name: "Verigan's Fist",
            itemId: 6953,
            value: "+6 Strength, +6 Stamina, +12 Intellect - Paladin Class Quest",
            faction: "alliance",
            quality: "q3",
            iLvl: 29,
            reqLevel: 20,
            stats: "+6 Strength, +6 Stamina, +12 Intellect",
            icon: "inv_hammer_04",
            weaponType: "Two-Handed Mace"
          },
          {
            name: "Scepter of the Abandoned",
            itemId: 271207,
            value: "+4 Stamina, +4 Intellect - The Abandoned (Ruins of Lordaeron)",
            faction: "both",
            quality: "q2",
            iLvl: 18,
            reqLevel: 14,
            stats: "+4 Stamina, +4 Intellect",
            icon: "inv_mace_01",
            weaponType: "Main Hand Mace"
          }
        ]
      }
    : {
        levelBracket: "18–21",
        itemId: classId === 'priest' ? 2042 : 6631,
        name: classId === 'priest' ? "Staff of Westfall" : "Living Root",
        icon: "inv_staff_08",
        weaponType: "Staff",
        speed: "2.80",
        dps: "15.4 DPS",
        stats: classId === 'priest'
          ? "+5 Intellect, +6 Spirit, Equip: Increases healing done by up to 48 and damage done by up to 16."
          : "+7 Spirit, Equip: Increases healing done by up to 45 and damage done by up to 15.",
        source: {
          kind: classId === 'priest' ? "quest" : "drop",
          title: classId === 'priest' ? "The Defias Brotherhood (Alliance)" : "Verdan the Everliving (Wailing Caverns)",
          detail: classId === 'priest' ? "Deadmines quest finale. Massive 48 Healing power spike." : "Verdan boss drop in WC. Healer favorite with +45 Healing."
        },
        faction: "both",
        quality: "q3",
        iLvl: 24,
        reqLevel: 18,
        alts: [
          {
            name: "Living Root",
            itemId: 6631,
            value: "+45 Healing / +15 Spell Dmg, +7 Spirit - Verdan the Everliving (Wailing Caverns)",
            faction: "both",
            quality: "q3",
            iLvl: 24,
            reqLevel: 18,
            stats: "+7 Spirit, Equip: Increases healing done by up to 45 and damage done by up to 15.",
            icon: "inv_staff_08",
            weaponType: "Staff"
          },
          {
            name: "Crescent Staff",
            itemId: 6505,
            value: "+7 Spirit, +7 Intellect, +7 Stamina - Leaders of the Fang quest (Wailing Caverns)",
            faction: "both",
            quality: "q3",
            iLvl: 22,
            reqLevel: 15,
            stats: "+7 Intellect, +7 Spirit, +7 Stamina",
            icon: "inv_staff_02",
            weaponType: "Staff"
          },
          {
            name: "Coldspire Staff",
            itemId: 271212,
            value: "+7 Intellect, +5 Spirit, +6 Frost Dmg - Rath'mael (Ruins of Lordaeron)",
            faction: "both",
            quality: "q2",
            iLvl: 22,
            reqLevel: 17,
            stats: "+7 Intellect, +5 Spirit, +6 Frost Dmg",
            icon: "inv_staff_08",
            weaponType: "Staff"
          }
        ]
      };
  path.push(b4Primary);

  // Bracket 22-25
  const b5Primary = classId === 'paladin'
    ? {
        levelBracket: "22–25",
        itemId: 6641,
        name: "Haunting Blade",
        icon: "inv_sword_26",
        weaponType: "Two-Handed Sword",
        speed: "3.00",
        dps: "18.2 DPS",
        stats: "Equip: Increases healing done by up to 33 and damage done by up to 11.",
        source: {
          kind: "drop",
          title: "Lordaeron Captain (Ruins of Lordaeron)",
          detail: "Iconic blue 2H sword with +33 Healing."
        },
        faction: "both",
        quality: "q3",
        iLvl: 27,
        reqLevel: 22,
        alts: [
          {
            name: "Scepter of the Abandoned",
            itemId: 271207,
            value: "+4 Stamina, +4 Intellect - The Abandoned (Ruins of Lordaeron)",
            faction: "both",
            quality: "q2",
            iLvl: 18,
            reqLevel: 14,
            stats: "+4 Stamina, +4 Intellect",
            icon: "inv_mace_01",
            weaponType: "Main Hand Mace"
          }
        ]
      }
    : {
        levelBracket: "22–25",
        itemId: 3415,
        name: "Staff of the Friar",
        icon: "inv_staff_13",
        weaponType: "Staff",
        speed: "2.70",
        dps: "15.4 DPS",
        stats: "+3 Intellect, +4 Stamina, +12 Spirit, Equip: Increases healing done by up to 52 and damage done by up to 17.",
        source: {
          kind: "drop",
          title: "Trash mobs (Blackfathom Deeps)",
          detail: "Iconic world/dungeon rare drop with huge +12 Spirit and +52 Healing power."
        },
        faction: "both",
        quality: "q3",
        iLvl: 26,
        reqLevel: 21,
        alts: [
          {
            name: "Odo's Ley Staff",
            itemId: 6318,
            value: "+5 Stamina, +12 Spirit, +52 Healing / +17 Spell Dmg - Odo the Blindwatcher (SFK)",
            faction: "both",
            quality: "q3",
            iLvl: 26,
            reqLevel: 21,
            stats: "+5 Stamina, +12 Spirit, Equip: Increases healing done by up to 52 and damage done by up to 17.",
            icon: "inv_staff_12",
            weaponType: "Staff"
          },
          {
            name: "Rod of the Sleepwalker",
            itemId: 1155,
            value: "+11 Intellect, +10 Spirit - Twilight Lord Kelris (Blackfathom Deeps)",
            faction: "both",
            quality: "q3",
            iLvl: 29,
            reqLevel: 24,
            stats: "+11 Intellect, +10 Spirit",
            icon: "inv_staff_08",
            weaponType: "Staff"
          }
        ]
      };
  path.push(b5Primary);

  // Bracket 26-29
  const b6Primary = classId === 'paladin'
    ? {
        levelBracket: "26–29",
        itemId: 9457,
        name: "Royal Diplomatic Scepter",
        icon: "inv_mace_01",
        weaponType: "Main Hand Mace",
        speed: "2.10",
        dps: "22.4 DPS",
        stats: "+3 Stamina, +7 Spirit, Equip: Increases healing done by up to 75 and damage done by up to 25.",
        source: {
          kind: "drop",
          title: "Dark Iron Ambassador (Gnomeregan)",
          detail: "Rare boss in Gnomeregan crypt tunnels. Best 1H leveling healing scepter in early midgame."
        },
        faction: "both",
        quality: "q3",
        iLvl: 35,
        reqLevel: 30,
        alts: [
          {
            name: "Death Speaker Scepter",
            itemId: 2816,
            value: "+68 Healing, +12 HP5, +28 Shadow Dmg - Death Speaker Jargba (Razorfen Kraul)",
            faction: "both",
            quality: "q3",
            iLvl: 33,
            reqLevel: 28,
            stats: "Equip: Increases healing done by up to 68. Equip: Restores 12 Health per 5 sec.",
            icon: "inv_mace_01",
            weaponType: "One-Handed Mace"
          },
          {
            name: "Manual Crowd Pummeler",
            itemId: 9449,
            value: "25.6 DPS - Crowd Pummeler 9-60 (Gnomeregan)",
            faction: "both",
            quality: "q3",
            iLvl: 34,
            reqLevel: 29,
            stats: "+16 Strength, +5 Agility",
            icon: "inv_mace_04",
            weaponType: "Two-Handed Mace"
          }
        ]
      }
    : {
        levelBracket: "26–29",
        itemId: 271767,
        name: "Healer's Staff",
        icon: "inv_staff_10",
        weaponType: "Staff",
        speed: "2.90",
        dps: "20.5 DPS",
        stats: "+12 Stamina, Equip: Increases healing done by up to 67 and damage done by up to 22. Equip: Restores 5 Mana per 5 sec.",
        source: {
          kind: "quest",
          title: "Prehistoric Prism / Lost Relic Carry (Excavation Site: Wetlands)",
          detail: "WoW Forever custom dungeon quest reward. Outstanding +67 Healing and 5 MP5."
        },
        faction: "both",
        quality: "q3",
        iLvl: 33,
        reqLevel: 24,
        alts: [
          {
            name: "Royal Diplomatic Scepter",
            itemId: 9457,
            value: "+3 Sta, +7 Spirit, +75 Healing / +25 Spell Dmg - Dark Iron Ambassador (Gnomeregan)",
            faction: "both",
            quality: "q3",
            iLvl: 35,
            reqLevel: 30,
            stats: "+3 Stamina, +7 Spirit, Equip: Increases healing done by up to 75 and damage done by up to 25.",
            icon: "inv_mace_01",
            weaponType: "Main Hand Mace"
          },
          {
            name: "Death Speaker Scepter",
            itemId: 2816,
            value: "+68 Healing, +12 HP5, +28 Shadow Dmg - Death Speaker Jargba (Razorfen Kraul)",
            faction: "both",
            quality: "q3",
            iLvl: 33,
            reqLevel: 28,
            stats: "Equip: Increases healing done by up to 68. Equip: Restores 12 Health per 5 sec.",
            icon: "inv_mace_01",
            weaponType: "One-Handed Mace"
          },
          {
            name: "Wind Spirit Staff",
            itemId: 6689,
            value: "+6 Sta, +16 Spirit, +71 Healing / +23 Spell Dmg - Earthcaller Halmgar (Razorfen Kraul)",
            faction: "both",
            quality: "q3",
            iLvl: 34,
            reqLevel: 29,
            stats: "+6 Stamina, +16 Spirit, Equip: Increases healing done by up to 71 and damage done by up to 23.",
            icon: "inv_staff_08",
            weaponType: "Staff"
          }
        ]
      };
  path.push(b6Primary);

  // Bracket 30-34
  const b7Primary = classId === 'shaman'
    ? {
        levelBracket: "30–34",
        itemId: 280605,
        name: "Tidebringer's Claw",
        icon: "inv_weapon_shortblade_05",
        weaponType: "Main Hand Mace",
        speed: "2.10",
        dps: "22.4 DPS",
        stats: "+5 Stamina, Equip: Increases healing done by up to 86 and damage done by up to 28. Equip: Increases healing spell critical strike chance by 2%.",
        source: {
          kind: "quest",
          title: "The Tempest's Weapons (Shaman Class Quest)",
          detail: "Level 30 Shaman quest finale. Unrivaled +86 Healing and +2% Heal Crit."
        },
        faction: "both",
        quality: "q3",
        iLvl: 35,
        reqLevel: 30,
        alts: [
          {
            name: "Royal Diplomatic Scepter",
            itemId: 9457,
            value: "+3 Sta, +7 Spirit, +75 Healing / +25 Spell Dmg - Dark Iron Ambassador (Gnomeregan)",
            faction: "both",
            quality: "q3",
            iLvl: 35,
            reqLevel: 30,
            stats: "+3 Stamina, +7 Spirit, Equip: Increases healing done by up to 75 and damage done by up to 25.",
            icon: "inv_mace_01",
            weaponType: "Main Hand Mace"
          },
          {
            name: "Illusionary Rod",
            itemId: 7713,
            value: "+15 Intellect, +10 Spirit, +7 Stamina - Arcanist Doan (SM Library)",
            faction: "both",
            quality: "q3",
            iLvl: 39,
            reqLevel: 34,
            stats: "+15 Intellect, +10 Spirit, +7 Stamina",
            icon: "inv_staff_02",
            weaponType: "Staff"
          }
        ]
      }
    : (classId === 'paladin'
      ? {
          levelBracket: "30–34",
          itemId: 9457,
          name: "Royal Diplomatic Scepter",
          icon: "inv_mace_01",
          weaponType: "Main Hand Mace",
          speed: "2.10",
          dps: "22.4 DPS",
          stats: "+3 Stamina, +7 Spirit, Equip: Increases healing done by up to 75 and damage done by up to 25.",
          source: {
            kind: "drop",
            title: "Dark Iron Ambassador (Gnomeregan)",
            detail: "Prime 1H healing scepter. Enormous +75 Healing."
          },
          faction: "both",
          quality: "q3",
          iLvl: 35,
          reqLevel: 30,
          alts: [
            {
              name: "Black Menace",
              itemId: 6802,
              value: "+50 Healing / +16 Spell Dmg - In the Name of the Light quest",
              faction: "alliance",
              quality: "q3",
              iLvl: 44,
              reqLevel: 34,
              stats: "+4 Strength, +3 Spirit, Equip: Increases damage and healing by up to 16.",
              icon: "inv_mace_01",
              weaponType: "One-Handed Mace"
            }
          ]
        }
      : {
          levelBracket: "30–34",
          itemId: 9457,
          name: "Royal Diplomatic Scepter",
          icon: "inv_mace_01",
          weaponType: "Main Hand Mace",
          speed: "2.10",
          dps: "22.4 DPS",
          stats: "+3 Stamina, +7 Spirit, Equip: Increases healing done by up to 75 and damage done by up to 25.",
          source: {
            kind: "drop",
            title: "Dark Iron Ambassador (Gnomeregan)",
            detail: "Rare boss in Gnomeregan crypt tunnels. Best 1H leveling healing scepter in early midgame."
          },
          faction: "both",
          quality: "q3",
          iLvl: 35,
          reqLevel: 30,
          alts: [
            {
              name: "Illusionary Rod",
              itemId: 7713,
              value: "+15 Intellect, +10 Spirit, +7 Stamina - Arcanist Doan (SM Library)",
              faction: "both",
              quality: "q3",
              iLvl: 39,
              reqLevel: 34,
              stats: "+15 Intellect, +10 Spirit, +7 Stamina",
              icon: "inv_staff_02",
              weaponType: "Staff"
            },
            {
              name: "Hypnotic Blade",
              itemId: 7714,
              value: "+8 Intellect, +3 Spirit, +9 Spell Dmg & Healing - Arcanist Doan (SM Library)",
              faction: "both",
              quality: "q3",
              iLvl: 39,
              reqLevel: 34,
              stats: "+8 Intellect, +3 Spirit, Equip: Increases damage and healing by up to 9.",
              icon: "inv_sword_33",
              weaponType: "Dagger"
            }
          ]
        });
  path.push(b7Primary);

  // Bracket 35-39
  path.push({
    levelBracket: "35–39",
    itemId: 7721,
    name: "Hand of Righteousness",
    icon: "inv_mace_08",
    weaponType: "One-Handed Mace",
    speed: "2.60",
    dps: "25.2 DPS",
    stats: "+7 Stamina, Equip: Increases healing done by up to 94 and damage done by up to 31.",
    source: {
      kind: "drop",
      title: "High Inquisitor Whitemane (Scarlet Monastery Cathedral)",
      detail: "Iconic Scarlet Cathedral boss drop. Massive +94 Healing power spike for 1H healers."
    },
    faction: "both",
    quality: "q3",
    iLvl: 44,
    reqLevel: 39,
    alts: [
      {
        name: "Black Menace",
        itemId: 6802,
        value: "+50 Healing / +16 Spell Dmg - SM Quest (In the Name of the Light)",
        faction: "alliance",
        quality: "q3",
        iLvl: 44,
        reqLevel: 34,
        stats: "+4 Strength, +3 Spirit, Equip: Increases damage and healing by up to 16.",
        icon: "inv_mace_01",
        weaponType: "One-Handed Mace"
      },
      {
        name: "Galgann's Firehammer",
        itemId: 9415,
        value: "+8 Intellect, +6 Spirit - Galgann Firehammer (Uldaman)",
        faction: "both",
        quality: "q3",
        iLvl: 43,
        reqLevel: 38,
        stats: "+8 Intellect, +6 Spirit",
        icon: "inv_mace_08",
        weaponType: "One-Handed Mace"
      }
    ]
  });

  // Bracket 40-44
  const b9Primary = classId === 'paladin'
    ? {
        levelBracket: "40–44",
        itemId: 7721,
        name: "Hand of Righteousness",
        icon: "inv_mace_08",
        weaponType: "One-Handed Mace",
        speed: "2.60",
        dps: "25.2 DPS",
        stats: "+7 Stamina, Equip: Increases healing done by up to 94 and damage done by up to 31.",
        source: {
          kind: "drop",
          title: "High Inquisitor Whitemane (Scarlet Monastery Cathedral)",
          detail: "Whitemane's scepter carries Holy Paladins through the 40s."
        },
        faction: "both",
        quality: "q3",
        iLvl: 44,
        reqLevel: 39,
        alts: [
          {
            name: "The Shoveler",
            itemId: 9481,
            value: "+5 Intellect, +5 Spirit - Digmaster Shovelphlange (Uldaman)",
            faction: "both",
            quality: "q3",
            iLvl: 45,
            reqLevel: 40,
            stats: "+5 Intellect, +5 Spirit",
            icon: "inv_mace_07",
            weaponType: "One-Handed Mace"
          }
        ]
      }
    : {
        levelBracket: "40–44",
        itemId: 18082,
        name: "Zum'rah's Vexing Cane",
        icon: "inv_staff_08",
        weaponType: "Staff",
        speed: "3.10",
        dps: "31.5 DPS",
        stats: "+10 Intellect, +10 Stamina, Equip: Increases damage and healing done by magical spells and effects by up to 21.",
        source: {
          kind: "drop",
          title: "Witch Doctor Zum'rah (Zul'Farrak)",
          detail: "Drops from Zum'rah in Zul'Farrak graveyard. Reliable high-stamina healer staff."
        },
        faction: "both",
        quality: "q3",
        iLvl: 47,
        reqLevel: 42,
        alts: [
          {
            name: "The Shoveler",
            itemId: 9481,
            value: "+5 Intellect, +5 Spirit - Digmaster Shovelphlange (Uldaman)",
            faction: "both",
            quality: "q3",
            iLvl: 45,
            reqLevel: 40,
            stats: "+5 Intellect, +5 Spirit",
            icon: "inv_mace_07",
            weaponType: "One-Handed Mace"
          }
        ]
      };
  path.push(b9Primary);

  // Bracket 45-49
  const b10Primary = classId === 'paladin'
    ? {
        levelBracket: "45–49",
        itemId: 17743,
        name: "Princess Theradras' Scepter",
        icon: "inv_mace_04",
        weaponType: "Two-Handed Mace",
        speed: "3.40",
        dps: "41.8 DPS",
        stats: "+14 Strength, +13 Stamina",
        source: {
          kind: "drop",
          title: "Princess Theradras (Maraudon)",
          detail: "Iconic Theradras drop for heavy stats and emergency melee damage."
        },
        faction: "both",
        quality: "q3",
        iLvl: 54,
        reqLevel: 49,
        alts: [
          {
            name: "Hand of Righteousness",
            itemId: 7721,
            value: "+94 Healing / +31 Spell Dmg - Whitemane (SM Cath)",
            faction: "both",
            quality: "q3",
            iLvl: 44,
            reqLevel: 39,
            stats: "+7 Stamina, Equip: Increases healing done by up to 94 and damage done by up to 31.",
            icon: "inv_mace_08",
            weaponType: "One-Handed Mace"
          }
        ]
      }
    : {
        levelBracket: "45–49",
        itemId: 17743,
        name: "Resurgence Rod",
        icon: "inv_staff_04",
        weaponType: "Staff",
        speed: "2.90",
        dps: "44.7 DPS",
        stats: "Equip: Increases healing done by up to 112 and damage done by up to 37. Equip: Restores 11 Mana and 11 Health per 5 sec.",
        source: {
          kind: "quest",
          title: "Corruption of Earth and Seed (Maraudon)",
          detail: "Maraudon dungeon quest reward from Keeper Margol. Massive +112 Healing and 11 MP5."
        },
        faction: "both",
        quality: "q3",
        iLvl: 53,
        reqLevel: 45,
        alts: [
          {
            name: "Charstone Dirk",
            itemId: 17710,
            value: "+116 Healing / +38 Spell Dmg - Maraudon trash drop",
            faction: "both",
            quality: "q3",
            iLvl: 54,
            reqLevel: 49,
            stats: "Equip: Increases healing done by up to 116 and damage done by up to 38.",
            icon: "inv_knife_01",
            weaponType: "Dagger"
          },
          {
            name: "Spire of Hakkar",
            itemId: 10844,
            value: "+16 Spirit, +14 Intellect, +18 Spell Dmg/Healing - Avatar of Hakkar (Sunken Temple)",
            faction: "both",
            quality: "q3",
            iLvl: 53,
            reqLevel: 48,
            stats: "+16 Spirit, +14 Intellect, Equip: Increases damage and healing by up to 18.",
            icon: "inv_staff_08",
            weaponType: "Staff"
          }
        ]
      };
  path.push(b10Primary);

  // Bracket 50-54
  path.push({
    levelBracket: "50–54",
    itemId: 11923,
    name: "Hammer of the Grace",
    icon: "inv_mace_01",
    weaponType: "One-Handed Mace",
    speed: "2.50",
    dps: "36.2 DPS",
    stats: "+6 Spirit, Equip: Increases healing done by up to 31 and damage done by up to 11.",
    source: {
      kind: "drop",
      title: "Chest of The Seven (Blackrock Depths)",
      detail: "Chest reward from The Seven challenge in BRD. Premier pre-raid 1H healing mace."
    },
    faction: "both",
    quality: "q3",
    iLvl: 57,
    reqLevel: 52,
    alts: classId === 'paladin' ? [] : [
      {
        name: "Guiding Stave of Wisdom",
        itemId: 11932,
        value: "+12 Intellect, +28 Healing - Emperor Dagran Thaurissan (BRD)",
        faction: "both",
        quality: "q3",
        iLvl: 58,
        reqLevel: 53,
        stats: "+12 Intellect, Equip: Increases healing done by up to 28.",
        icon: "inv_staff_08",
        weaponType: "Staff"
      }
    ]
  });

  // Bracket 55-60
  const b12Primary = classId === 'priest'
    ? {
        levelBracket: "55–60",
        itemId: 18608,
        name: "Benediction",
        icon: "inv_staff_30",
        weaponType: "Staff",
        speed: "3.00",
        dps: "40.7 DPS",
        stats: "+10 Stamina, +12 Intellect, +31 Spirit, Equip: Increases healing done by up to 195 and damage done by up to 65. Equip: Restores 6 Mana per 5 sec.",
        source: {
          kind: "quest",
          title: "The Balance of Light and Shadow (Priest Epic Quest)",
          detail: "The defining Priest healing staff in World of Warcraft history."
        },
        faction: "both",
        quality: "q4",
        iLvl: 75,
        reqLevel: 60,
        alts: [
          {
            name: "Scepter of the False Prophet",
            itemId: 21839,
            value: "+210 Healing / +70 Spell Dmg, +19 Int, +10 Spi - C'Thun (Temple of Ahn'Qiraj)",
            faction: "both",
            quality: "q4",
            iLvl: 84,
            reqLevel: 60,
            stats: "+19 Intellect, +10 Spirit, Equip: Increases healing done by up to 210 and damage done by up to 70.",
            icon: "inv_mace_01",
            weaponType: "One-Handed Mace"
          },
          {
            name: "Grand Marshal's Warhammer",
            itemId: 23454,
            value: "+199 Healing / +66 Spell Dmg - PvP Rank 14 Officer's Lounge",
            faction: "alliance",
            quality: "q4",
            iLvl: 78,
            reqLevel: 60,
            stats: "+11 Stamina, +7 Intellect, Equip: Increases healing done by up to 199 and damage done by up to 66.",
            icon: "inv_mace_08",
            weaponType: "One-Handed Mace"
          },
          {
            name: "Blessed Qiraji Augur Staff",
            itemId: 21275,
            value: "+203 Healing / +67 Spell Dmg - Imperial Qiraji Regalia (AQ40)",
            faction: "both",
            quality: "q4",
            iLvl: 79,
            reqLevel: 60,
            stats: "+31 Stamina, +20 Intellect, +14 Spirit, Equip: Increases healing done by up to 203 and damage done by up to 67.",
            icon: "inv_staff_08",
            weaponType: "Staff"
          },
          {
            name: "Atiesh, Greatstaff of the Guardian",
            itemId: 22631,
            value: "+242 Healing / +120 Spell Power, +28 Int, +28 Spi - Naxxramas 40 splinter quest",
            faction: "both",
            quality: "q4",
            iLvl: 90,
            reqLevel: 60,
            stats: "+28 Intellect, +28 Spirit, Equip: Increases healing done by up to 242 and damage done by up to 120.",
            icon: "inv_staff_30",
            weaponType: "Staff"
          }
        ]
      }
    : (classId === 'paladin'
      ? {
          levelBracket: "55–60",
          itemId: 21410,
          name: "Gavel of Infinite Wisdom",
          icon: "inv_mace_08",
          weaponType: "One-Handed Mace",
          speed: "2.60",
          dps: "35.8 DPS",
          stats: "+14 Intellect, +8 Spirit, Equip: Increases healing done by up to 184 and damage done by up to 61.",
          source: {
            kind: "drop",
            title: "General Rajaxx / AQ20 Tokens",
            detail: "Temple of Ahn'Qiraj / Ruins of Ahn'Qiraj premier healing mace."
          },
          faction: "both",
          quality: "q4",
          iLvl: 70,
          reqLevel: 60,
          alts: [
            {
              name: "Scepter of the False Prophet",
              itemId: 21839,
              value: "+210 Healing / +70 Spell Dmg, +19 Int, +10 Spi - C'Thun (Temple of Ahn'Qiraj)",
              faction: "both",
              quality: "q4",
              iLvl: 84,
              reqLevel: 60,
              stats: "+19 Intellect, +10 Spirit, Equip: Increases healing done by up to 210 and damage done by up to 70.",
              icon: "inv_mace_01",
              weaponType: "One-Handed Mace"
            },
            {
              name: "Grand Marshal's Warhammer",
              itemId: 23454,
              value: "+199 Healing / +66 Spell Dmg - PvP Rank 14 Officer's Lounge",
              faction: "alliance",
              quality: "q4",
              iLvl: 78,
              reqLevel: 60,
              stats: "+11 Stamina, +7 Intellect, Equip: Increases healing done by up to 199 and damage done by up to 66.",
              icon: "inv_mace_08",
              weaponType: "One-Handed Mace"
            },
            {
              name: "Simone's Cultivating Hammer",
              itemId: 22380,
              value: "+139 Healing / +46 Spell Dmg - High level world drop / quest",
              faction: "both",
              quality: "q3",
              iLvl: 65,
              reqLevel: 60,
              stats: "Equip: Increases healing done by up to 139 and damage done by up to 46.",
              icon: "inv_mace_08",
              weaponType: "One-Handed Mace"
            }
          ]
        }
      : (classId === 'shaman'
        ? {
            levelBracket: "55–60",
            itemId: 23464,
            name: "High Warlord's Battle Mace",
            icon: "inv_mace_08",
            weaponType: "One-Handed Mace",
            speed: "2.60",
            dps: "41.2 DPS",
            stats: "+11 Stamina, +7 Intellect, Equip: Increases healing done by up to 199 and damage done by up to 66.",
            source: {
              kind: "pvp",
              title: "PvP Rank 14 Champion's Hall (Horde)",
              detail: "Highest PvP healing weapon for Horde Restoration Shamans."
            },
            faction: "horde",
            quality: "q4",
            iLvl: 78,
            reqLevel: 60,
            alts: [
              {
                name: "Scepter of the False Prophet",
                itemId: 21839,
                value: "+210 Healing / +70 Spell Dmg, +19 Int, +10 Spi - C'Thun (Temple of Ahn'Qiraj)",
                faction: "both",
                quality: "q4",
                iLvl: 84,
                reqLevel: 60,
                stats: "+19 Intellect, +10 Spirit, Equip: Increases healing done by up to 210 and damage done by up to 70.",
                icon: "inv_mace_01",
                weaponType: "One-Handed Mace"
              },
              {
                name: "Gavel of Infinite Wisdom",
                itemId: 21410,
                value: "+184 Healing / +61 Spell Dmg - AQ20",
                faction: "both",
                quality: "q4",
                iLvl: 70,
                reqLevel: 60,
                stats: "+14 Intellect, +8 Spirit, Equip: Increases healing done by up to 184 and damage done by up to 61.",
                icon: "inv_mace_08",
                weaponType: "One-Handed Mace"
              },
              {
                name: "Blessed Qiraji Augur Staff",
                itemId: 21275,
                value: "+203 Healing / +67 Spell Dmg - Imperial Qiraji Regalia (AQ40)",
                faction: "both",
                quality: "q4",
                iLvl: 79,
                reqLevel: 60,
                stats: "+31 Stamina, +20 Intellect, +14 Spirit, Equip: Increases healing done by up to 203 and damage done by up to 67.",
                icon: "inv_staff_08",
                weaponType: "Staff"
              }
            ]
          }
        : {
            levelBracket: "55–60",
            itemId: 21410,
            name: "Gavel of Infinite Wisdom",
            icon: "inv_mace_08",
            weaponType: "One-Handed Mace",
            speed: "2.60",
            dps: "35.8 DPS",
            stats: "+14 Intellect, +8 Spirit, Equip: Increases healing done by up to 184 and damage done by up to 61.",
            source: {
              kind: "drop",
              title: "General Rajaxx / AQ20 Tokens",
              detail: "Temple of Ahn'Qiraj / Ruins of Ahn'Qiraj premier healing mace."
            },
            faction: "both",
            quality: "q4",
            iLvl: 70,
            reqLevel: 60,
            alts: [
              {
                name: "Scepter of the False Prophet",
                itemId: 21839,
                value: "+210 Healing / +70 Spell Dmg, +19 Int, +10 Spi - C'Thun (Temple of Ahn'Qiraj)",
                faction: "both",
                quality: "q4",
                iLvl: 84,
                reqLevel: 60,
                stats: "+19 Intellect, +10 Spirit, Equip: Increases healing done by up to 210 and damage done by up to 70.",
                icon: "inv_mace_01",
                weaponType: "One-Handed Mace"
              },
              {
                name: "Blessed Qiraji Augur Staff",
                itemId: 21275,
                value: "+203 Healing / +67 Spell Dmg - Imperial Qiraji Regalia (AQ40)",
                faction: "both",
                quality: "q4",
                iLvl: 79,
                reqLevel: 60,
                stats: "+31 Stamina, +20 Intellect, +14 Spirit, Equip: Increases healing done by up to 203 and damage done by up to 67.",
                icon: "inv_staff_08",
                weaponType: "Staff"
              },
              {
                name: "Atiesh, Greatstaff of the Guardian",
                itemId: 22631,
                value: "+242 Healing / +120 Spell Power, +28 Int, +28 Spi - Naxxramas 40 splinter quest",
                faction: "both",
                quality: "q4",
                iLvl: 90,
                reqLevel: 60,
                stats: "+28 Intellect, +28 Spirit, Equip: Increases healing done by up to 242 and damage done by up to 120.",
                icon: "inv_staff_30",
                weaponType: "Staff"
              }
            ]
          }));
  path.push(b12Primary);

  // Final check: filter out any alt that is illegal for this class
  for (const step of path) {
    if (step.alts) {
      step.alts = step.alts.filter(alt => isLegalHealerWeapon(classId, alt));
    }
  }

  return path;
}

// Attach Healer tracks and healing levels to Druid, Priest, Shaman, Paladin
for (const cls of ['druid', 'priest', 'shaman', 'paladin']) {
  if (currentWeapons[cls]) {
    const existingDpsName = cls === 'druid' ? 'Feral & Balance (Staves & Two-Handed Maces)'
      : (cls === 'priest' ? 'Shadow & Smite (Staves & Daggers)'
      : (cls === 'shaman' ? 'Enhancement & Elemental (Two-Hand & Staves)'
      : 'Retribution Path (Two-Handed Swords & Maces)'));

    currentWeapons[cls].tracks = [
      { id: "dps", name: `⚔️ DPS Track (${existingDpsName})` },
      { id: "healer", name: `💚 Healer Track (Restoration & Holy +Healing Focus)` }
    ];
    currentWeapons[cls].healingLevels = buildHealerWeaponPath(cls);
  }
}

// -------------------------------------------------------------
// 3. BUILD SHIELDS FOR WARRIOR, PALADIN, SHAMAN
// -------------------------------------------------------------

function buildTankingShieldPath(cls) {
  return [
    {
      levelBracket: "1–10",
      itemId: 1166,
      name: "Dented Buckler",
      icon: "inv_shield_04",
      weaponType: "Shield",
      stats: "55 Armor, Block 2",
      source: {
        kind: "vendor",
        title: "Starting Armor Vendor",
        detail: "Purchased in starting zones (Northshire, Coldridge, Camp Narache, Sen'jin)."
      },
      faction: "both",
      quality: "q1",
      iLvl: 5,
      reqLevel: 1,
      alts: [
        {
          name: "Redbeard Crest",
          itemId: 263431,
          value: "177 Armor, Block 5, +2 Sta - Early quest shield",
          faction: "both",
          quality: "q2",
          iLvl: 10,
          reqLevel: 5,
          stats: "+2 Stamina",
          icon: "inv_shield_04",
          weaponType: "Shield"
        }
      ]
    },
    {
      levelBracket: "11–18",
      itemId: 13245,
      name: "Kresh's Back",
      icon: "inv_shield_08",
      weaponType: "Shield",
      stats: "528 Armor, Block 11, +6 Stamina",
      source: {
        kind: "drop",
        title: "Kresh (Wailing Caverns)",
        detail: "Drops from giant snapping turtle Kresh in Wailing Caverns. Excellent armor spike."
      },
      faction: "both",
      quality: "q2",
      iLvl: 23,
      reqLevel: 15,
      alts: [
        {
          name: "Commander's Crest",
          itemId: 6320,
          value: "585 Armor, Block 16, +6 Sta, +3 Str - Commander Springvale (Shadowfang Keep)",
          faction: "both",
          quality: "q3",
          iLvl: 26,
          reqLevel: 21,
          stats: "+6 Stamina, +3 Strength",
          icon: "inv_shield_05",
          weaponType: "Shield"
        },
        {
          name: "Repurposed Rack",
          itemId: 271240,
          value: "490 Armor, +6 Strength, +7 Spell Power - Hamhock (The Stockade)",
          faction: "alliance",
          quality: "q2",
          iLvl: 23,
          reqLevel: 18,
          stats: "+6 Strength",
          icon: "inv_shield_04",
          weaponType: "Shield"
        }
      ]
    },
    {
      levelBracket: "19–27",
      itemId: 6320,
      name: "Commander's Crest",
      icon: "inv_shield_05",
      weaponType: "Shield",
      stats: "585 Armor, Block 16, +6 Stamina, +3 Strength",
      source: {
        kind: "drop",
        title: "Commander Springvale (Shadowfang Keep)",
        detail: "Iconic blue tower shield with hefty strength and stamina."
      },
      faction: "both",
      quality: "q3",
      iLvl: 26,
      reqLevel: 21,
      alts: [
        {
          name: "Electromagnetic Hyper-Shield",
          itemId: 9461,
          value: "820 Armor, Block 21, +5 Sta, 5% on block shocks attackers - Thermaplugg (Gnomeregan)",
          faction: "both",
          quality: "q3",
          iLvl: 32,
          reqLevel: 27,
          stats: "+5 Stamina, Equip: 5% chance on block to shock attacker for 35 Nature damage.",
          icon: "inv_shield_07",
          weaponType: "Shield"
        },
        {
          name: "Mirror of Rath'mael",
          itemId: 271213,
          value: "460 Armor, Block 12, +5 Sta, +3 Int - Rath'mael (Ruins of Lordaeron)",
          faction: "both",
          quality: "q2",
          iLvl: 24,
          reqLevel: 18,
          stats: "+5 Stamina, +3 Intellect",
          icon: "inv_shield_04",
          weaponType: "Shield"
        }
      ]
    },
    {
      levelBracket: "28–34",
      itemId: 273055,
      name: "Bonepile Gaze",
      icon: "inv_shield_11",
      weaponType: "Shield",
      stats: "718 Armor, Block 24, +6 Stamina, +4 Strength",
      source: {
        kind: "drop",
        title: "Lyn the Ignored (City of Dalaran)",
        detail: "WoW Forever custom dungeon drop beneath Dalaran sewers. Prime tanking block rating."
      },
      faction: "both",
      quality: "q3",
      iLvl: 33,
      reqLevel: 28,
      alts: [
        {
          name: "Heart of Agamaggan",
          itemId: 6694,
          value: "757 Armor, Block 22, +7 Sta, +15 Healing / +5 Spell Dmg - Charlga Razorflank (RFK)",
          faction: "both",
          quality: "q3",
          iLvl: 35,
          reqLevel: 30,
          stats: "+7 Stamina, Equip: Increases healing by up to 15.",
          icon: "inv_shield_07",
          weaponType: "Shield"
        }
      ]
    },
    {
      levelBracket: "35–44",
      itemId: 7726,
      name: "Aegis of the Scarlet Commander",
      icon: "inv_shield_06",
      weaponType: "Shield",
      stats: "1548 Armor, Block 29, +8 Strength, +7 Stamina",
      source: {
        kind: "drop",
        title: "Scarlet Commander Mograine (Scarlet Monastery Cathedral)",
        detail: "The gold-standard mid-game tanking shield in Classic WoW. Incredible 1548 Armor."
      },
      faction: "both",
      quality: "q3",
      iLvl: 44,
      reqLevel: 39,
      alts: [
        {
          name: "Battered Viking Shield",
          itemId: 9403,
          value: "1287 Armor, Block 27, +10 Spirit, +8 Healing / +5 Spell Dmg - Eric The Swift (Uldaman)",
          faction: "both",
          quality: "q3",
          iLvl: 42,
          reqLevel: 37,
          stats: "+10 Spirit, Equip: Increases healing done by up to 8 and damage by up to 5.",
          icon: "inv_shield_04",
          weaponType: "Shield"
        }
      ]
    },
    {
      levelBracket: "45–54",
      itemId: 11631,
      name: "Stoneshell Guard",
      icon: "inv_shield_04",
      weaponType: "Shield",
      stats: "1803 Armor, Block 35, +7 Strength, +6 Stamina",
      source: {
        kind: "drop",
        title: "Stonevault mobs / Maraudon",
        detail: "Substantial 1800+ Armor bulwark with defense block rating."
      },
      faction: "both",
      quality: "q3",
      iLvl: 52,
      reqLevel: 47,
      alts: [
        {
          name: "Aegis of Stormwind",
          itemId: 1203,
          value: "1867 Armor, Block 36, +10 Stamina - World drop",
          faction: "both",
          quality: "q3",
          iLvl: 54,
          reqLevel: 49,
          stats: "+10 Stamina",
          icon: "inv_shield_06",
          weaponType: "Shield"
        }
      ]
    },
    {
      levelBracket: "55–60",
      itemId: 12602,
      name: "Draconian Deflector",
      icon: "inv_shield_13",
      weaponType: "Shield",
      stats: "2153 Armor, Block 40, +15 Stamina, +7 Spirit, +10 Defense Rating",
      source: {
        kind: "drop",
        title: "General Drakkisath (Upper Blackrock Spire)",
        detail: "The premier pre-raid tanking shield. 2153 Armor and +10 Defense Rating."
      },
      faction: "both",
      quality: "q3",
      iLvl: 63,
      reqLevel: 58,
      alts: [
        {
          name: "The Immovable Object",
          itemId: 19321,
          value: "2291 Armor, Block 44, +14 Stamina, +15 Block - Alterac Valley Exalted",
          faction: "both",
          quality: "q4",
          iLvl: 60,
          reqLevel: 60,
          stats: "+14 Stamina, Equip: Increases block value by 15.",
          icon: "inv_shield_08",
          weaponType: "Shield"
        },
        {
          name: "Grand Marshal's Aegis",
          itemId: 18825,
          value: "2929 Armor, Block 54, +20 Stamina - PvP Rank 14",
          faction: "alliance",
          quality: "q4",
          iLvl: 78,
          reqLevel: 60,
          stats: "+20 Stamina",
          icon: "inv_shield_08",
          weaponType: "Shield"
        },
        {
          name: "High Warlord's Shield Wall",
          itemId: 18826,
          value: "2929 Armor, Block 54, +20 Stamina - PvP Rank 14",
          faction: "horde",
          quality: "q4",
          iLvl: 78,
          reqLevel: 60,
          stats: "+20 Stamina",
          icon: "inv_shield_08",
          weaponType: "Shield"
        }
      ]
    }
  ];
}

function buildHealingShieldPath() {
  return [
    {
      levelBracket: "1–15",
      itemId: 263431,
      name: "Redbeard Crest",
      icon: "inv_shield_04",
      weaponType: "Shield",
      stats: "177 Armor, Block 5, +2 Stamina",
      source: {
        kind: "vendor",
        title: "Early Quest / Vendor Shield",
        detail: "Early defensive shield to protect while casting heals."
      },
      faction: "both",
      quality: "q2",
      iLvl: 10,
      reqLevel: 5,
      alts: []
    },
    {
      levelBracket: "16–23",
      itemId: 271213,
      name: "Mirror of Rath'mael",
      icon: "inv_shield_04",
      weaponType: "Shield",
      stats: "460 Armor, Block 12, +5 Stamina, +3 Intellect",
      source: {
        kind: "drop",
        title: "Rath'mael (Ruins of Lordaeron)",
        detail: "WoW Forever custom dungeon boss drop. Ideal Holy Paladin and Shaman caster shield."
      },
      faction: "both",
      quality: "q2",
      iLvl: 24,
      reqLevel: 18,
      alts: [
        {
          name: "Seedcloud Buckler",
          itemId: 6630,
          value: "547 Armor, Block 14, +5 Intellect, +5 Spells - Verdan the Everliving (WC)",
          faction: "both",
          quality: "q3",
          iLvl: 24,
          reqLevel: 18,
          stats: "+5 Intellect, Equip: Increases damage and healing by up to 5.",
          icon: "inv_shield_04",
          weaponType: "Shield"
        }
      ]
    },
    {
      levelBracket: "24–32",
      itemId: 6694,
      name: "Heart of Agamaggan",
      icon: "inv_shield_07",
      weaponType: "Shield",
      stats: "757 Armor, Block 22, +7 Stamina, Equip: Increases healing done by up to 15 and damage by up to 5.",
      source: {
        kind: "drop",
        title: "Charlga Razorflank (Razorfen Kraul)",
        detail: "Iconic RFK finale shield with dedicated +15 Healing."
      },
      faction: "both",
      quality: "q3",
      iLvl: 35,
      reqLevel: 30,
      alts: [
        {
          name: "Forcestone Buckler",
          itemId: 17508,
          value: "1078 Armor, Block 25, +4 Sta, +18 Healing / +6 Spell Dmg - Compendium quest",
          faction: "horde",
          quality: "q3",
          iLvl: 40,
          reqLevel: 28,
          stats: "+4 Stamina, Equip: Increases healing by up to 18 and damage by up to 6.",
          icon: "inv_shield_04",
          weaponType: "Shield"
        },
        {
          name: "Energized Stone Circle",
          itemId: 9522,
          value: "711 Armor, Block 21, +4 Sta, +40 Bonus Armor, +7 Healing / +3 Spell Dmg - Power Stones",
          faction: "both",
          quality: "q3",
          iLvl: 38,
          reqLevel: 30,
          stats: "+4 Stamina, Equip: Increases healing by up to 7 and damage by up to 3.",
          icon: "inv_shield_04",
          weaponType: "Shield"
        }
      ]
    },
    {
      levelBracket: "33–44",
      itemId: 9403,
      name: "Battered Viking Shield",
      icon: "inv_shield_04",
      weaponType: "Shield",
      stats: "1287 Armor, Block 27, +10 Spirit, Equip: Increases healing done by up to 8 and damage by up to 5.",
      source: {
        kind: "drop",
        title: "Eric The Swift (Uldaman)",
        detail: "Rare dungeon drop in Uldaman with +10 Spirit and healing power."
      },
      faction: "both",
      quality: "q3",
      iLvl: 42,
      reqLevel: 37,
      alts: [
        {
          name: "Aegis of the Scarlet Commander",
          itemId: 7726,
          value: "1548 Armor, Block 29, +8 Str, +7 Sta - SM Cathedral",
          faction: "both",
          quality: "q3",
          iLvl: 44,
          reqLevel: 39,
          stats: "+8 Strength, +7 Stamina",
          icon: "inv_shield_06",
          weaponType: "Shield"
        }
      ]
    },
    {
      levelBracket: "45–54",
      itemId: 14852,
      name: "Sunscale Shield",
      icon: "inv_shield_04",
      weaponType: "Shield",
      stats: "1663 Armor, Block 34, +8 Intellect, +8 Spirit",
      source: {
        kind: "drop",
        title: "High-level World Drop / Dungeon Drop",
        detail: "Solid high-intellect and spirit healer shield before endgame."
      },
      faction: "both",
      quality: "q2",
      iLvl: 54,
      reqLevel: 49,
      alts: []
    },
    {
      levelBracket: "55–60",
      itemId: 235473,
      name: "Grand Marshal's Barricade",
      icon: "inv_shield_08",
      weaponType: "Shield",
      stats: "3000 Armor, Block 55, +15 Stamina, +15 Intellect, Equip: Increases healing done by up to 20 and damage done by up to 24.",
      source: {
        kind: "pvp",
        title: "PvP Rank 14 Officer's Lounge (Alliance)",
        detail: "Highest armor caster/healer shield in the game."
      },
      faction: "alliance",
      quality: "q4",
      iLvl: 80,
      reqLevel: 60,
      alts: [
        {
          name: "High Warlord's Barricade",
          itemId: 235474,
          value: "3000 Armor, Block 55, +15 Sta, +15 Int, +20 Healing / +24 Spell Dmg - PvP Rank 14",
          faction: "horde",
          quality: "q4",
          iLvl: 80,
          reqLevel: 60,
          stats: "+15 Stamina, +15 Intellect, Equip: Increases healing done by up to 20 and damage by up to 24.",
          icon: "inv_shield_08",
          weaponType: "Shield"
        },
        {
          name: "Wormscale Blocker",
          itemId: 21610,
          value: "3035 Armor, Block 56, +14 Sta, +14 Int, +23 Healing / +12 Spell Dmg - AQ40 Ouro",
          faction: "both",
          quality: "q4",
          iLvl: 81,
          reqLevel: 60,
          stats: "+14 Stamina, +14 Intellect, Equip: Increases healing done by up to 23 and damage by up to 12.",
          icon: "inv_shield_11",
          weaponType: "Shield"
        }
      ]
    }
  ];
}

// Set up Warrior shields
currentOffhands.warrior = {
  classId: "warrior",
  tracks: [
    { id: "primary", name: "🛡️ Shield Progression (Protection & Tanking)" }
  ],
  levels: buildTankingShieldPath('warrior')
};

// Set up Paladin shields (Tanking vs Healing)
currentOffhands.paladin = {
  classId: "paladin",
  tracks: [
    { id: "dps", name: "🛡️ Tanking Shields (Protection & Leveling)" },
    { id: "healer", name: "💚 Healing Shields (Holy & +Healing Focus)" }
  ],
  levels: buildTankingShieldPath('paladin'),
  healingLevels: buildHealingShieldPath()
};

// Set up Shaman shields (Tanking/Elemental vs Restoration)
currentOffhands.shaman = {
  classId: "shaman",
  tracks: [
    { id: "dps", name: "🛡️ Shields (Elemental & Tanking)" },
    { id: "healer", name: "💚 Healing Shields (Restoration & +Healing)" }
  ],
  levels: buildTankingShieldPath('shaman'),
  healingLevels: buildHealingShieldPath()
};

// -------------------------------------------------------------
// 4. BUILD HEALING OFF-HAND PATH FOR DRUID & PRIEST
// -------------------------------------------------------------

function buildHealingOffhandPath() {
  return [
    {
      levelBracket: "1–14",
      itemId: 1172,
      name: "Grayson's Torch",
      icon: "inv_torch_lit",
      weaponType: "Held in Off-hand",
      stats: "+4 Spirit",
      source: {
        kind: "quest",
        title: "The Westfall Lighthouse",
        detail: "Captain Grayson quest reward in Westfall. Early spirit stat-stick."
      },
      faction: "alliance",
      quality: "q2",
      iLvl: 21,
      reqLevel: 10,
      alts: [
        {
          name: "Nightglow Concoction",
          itemId: 284197,
          value: "+4 Spirit - Silverpine / Barrens quest",
          faction: "horde",
          quality: "q2",
          iLvl: 18,
          reqLevel: 9,
          stats: "+4 Spirit",
          icon: "inv_drink_06",
          weaponType: "Held in Off-hand"
        }
      ]
    },
    {
      levelBracket: "15–24",
      itemId: 2943,
      name: "Eye of Paleth",
      icon: "inv_misc_gem_pearl_03",
      weaponType: "Held in Off-hand",
      stats: "Equip: Increases healing done by up to 9 and damage done by up to 4.",
      source: {
        kind: "quest",
        title: "The Eye of Paleth (Wetlands Quest)",
        detail: "Excavating the Wetlands quest chain. First off-hand with dedicated +Healing."
      },
      faction: "both",
      quality: "q3",
      iLvl: 31,
      reqLevel: 22,
      alts: [
        {
          name: "Orb of Souls",
          itemId: 249395,
          value: "+6 Spirit, +13 Healing / +4 Spell Dmg - Enchanting craftable",
          faction: "both",
          quality: "q2",
          iLvl: 25,
          reqLevel: 18,
          stats: "+6 Spirit, Equip: Increases healing by up to 13 and damage by up to 4.",
          icon: "inv_misc_gem_pearl_04",
          weaponType: "Held in Off-hand"
        }
      ]
    },
    {
      levelBracket: "25–34",
      itemId: 276898,
      name: "Salve and Salvation",
      icon: "inv_misc_book_09",
      weaponType: "Held in Off-hand",
      stats: "+9 Spirit, +50 Armor, Equip: Increases healing done by up to 9 and damage done by up to 3.",
      source: {
        kind: "quest",
        title: "Past Due (Scarlet Monastery Library Quest)",
        detail: "Turn-in inside SM Library for Alliance. Excellent spirit and healing boost."
      },
      faction: "alliance",
      quality: "q3",
      iLvl: 34,
      reqLevel: 30,
      alts: [
        {
          name: "Ponderous Orb",
          itemId: 273052,
          value: "+8 Spirit, +2 Intellect, +11 Healing / +4 Spell Dmg - Shade of Archmage (Dalaran)",
          faction: "both",
          quality: "q3",
          iLvl: 35,
          reqLevel: 30,
          stats: "+8 Spirit, +2 Intellect, Equip: Increases healing by up to 11 and damage by up to 4.",
          icon: "inv_misc_gem_pearl_04",
          weaponType: "Held in Off-hand"
        },
        {
          name: "Raptor's Gaze",
          itemId: 271788,
          value: "+4 Intellect, +4 Stamina, +8 Spell Dmg & Healing - Shadetooth (Excavation Site)",
          faction: "both",
          quality: "q3",
          iLvl: 33,
          reqLevel: 28,
          stats: "+4 Intellect, +4 Stamina, Equip: Increases damage and healing by up to 8.",
          icon: "inv_misc_gem_pearl_02",
          weaponType: "Held in Off-hand"
        }
      ]
    },
    {
      levelBracket: "35–45",
      itemId: 9393,
      name: "Beacon of Hope",
      icon: "inv_misc_lantern_01",
      weaponType: "Held in Off-hand",
      stats: "Equip: Increases healing done by up to 14 and damage done by up to 8.",
      source: {
        kind: "drop",
        title: "Digmaster Shovelphlange / Uldaman",
        detail: "Rare dungeon treasure lantern. Focused healing output."
      },
      faction: "both",
      quality: "q3",
      iLvl: 38,
      reqLevel: 33,
      alts: []
    },
    {
      levelBracket: "46–54",
      itemId: 11262,
      name: "Orb of Lorica",
      icon: "inv_misc_gem_pearl_05",
      weaponType: "Held in Off-hand",
      stats: "+10 Intellect, Equip: Increases healing done by up to 12 and damage done by up to 6.",
      source: {
        kind: "drop",
        title: "High-level World Drop / Sunken Temple",
        detail: "Pure intellect and healing orb for late leveling."
      },
      faction: "both",
      quality: "q3",
      iLvl: 44,
      reqLevel: 34,
      alts: []
    },
    {
      levelBracket: "55–60",
      itemId: 19312,
      name: "Lei of the Lifegiver",
      icon: "inv_jewelry_necklace_16",
      weaponType: "Held in Off-hand",
      stats: "+11 Stamina, Equip: Increases healing done by up to 25 and damage done by up to 12. Equip: Restores 5 Mana per 5 sec.",
      source: {
        kind: "pvp",
        title: "Alterac Valley Exalted Reputation Vendor",
        detail: "The premier pre-raid healing off-hand in Classic. Incredible +25 Healing and 5 MP5."
      },
      faction: "both",
      quality: "q4",
      iLvl: 60,
      reqLevel: 55,
      alts: [
        {
          name: "Grand Marshal's Tome of Restoration",
          itemId: 234590,
          value: "+29 Healing / +15 Spell Dmg - PvP Rank 14 Officer's Lounge",
          faction: "alliance",
          quality: "q4",
          iLvl: 80,
          reqLevel: 60,
          stats: "Equip: Increases healing done by up to 29 and damage done by up to 15.",
          icon: "inv_misc_book_09",
          weaponType: "Held in Off-hand"
        },
        {
          name: "High Warlord's Tome of Mending",
          itemId: 234564,
          value: "+29 Healing / +15 Spell Dmg - PvP Rank 14 Champion's Hall",
          faction: "horde",
          quality: "q4",
          iLvl: 80,
          reqLevel: 60,
          stats: "Equip: Increases healing done by up to 29 and damage done by up to 15.",
          icon: "inv_misc_book_09",
          weaponType: "Held in Off-hand"
        }
      ]
    }
  ];
}

// Druid offhands: Feral/Balance vs Restoration
if (currentOffhands.druid) {
  currentOffhands.druid.tracks = [
    { id: "dps", name: "🔮 Off-Hands & Idols (Feral & Balance)" },
    { id: "healer", name: "💚 Healing Off-Hands (Restoration Focus)" }
  ];
  currentOffhands.druid.healingLevels = buildHealingOffhandPath();
}

// Priest offhands: Shadow DPS vs Holy/Disc Healer
if (currentOffhands.priest) {
  currentOffhands.priest.tracks = [
    { id: "dps", name: "🔮 Off-Hands (Shadow & Damage)" },
    { id: "healer", name: "💚 Healing Off-Hands (Holy & Discipline Focus)" }
  ];
  currentOffhands.priest.healingLevels = buildHealingOffhandPath();
}

// -------------------------------------------------------------
// 5. WRITE OUT ALL UPDATED JSON FILES
// -------------------------------------------------------------

fs.writeFileSync(path.join(SCRAPED_DIR, 'forever_weapons.json'), JSON.stringify(currentWeapons, null, 2), 'utf8');
console.log("✓ Successfully updated data/scraped/forever_weapons.json with Healer paths & dungeon items.");

fs.writeFileSync(path.join(SCRAPED_DIR, 'forever_offhands.json'), JSON.stringify(currentOffhands, null, 2), 'utf8');
console.log("✓ Successfully updated data/scraped/forever_offhands.json with Warrior, Paladin, Shaman shields & Healer offhands.");

fs.writeFileSync(path.join(SCRAPED_DIR, 'forever_wands.json'), JSON.stringify(currentWands, null, 2), 'utf8');
console.log("✓ Successfully updated data/scraped/forever_wands.json with missing dungeon wands.");
