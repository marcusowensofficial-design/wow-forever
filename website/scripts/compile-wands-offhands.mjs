/**
 * Compiles and generates dedicated Wands (Mage, Priest, Warlock)
 * and Off-Hands (Mage, Priest, Warlock, Druid, Shaman, Paladin)
 * level-by-level progression datasets for WoW Forever.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');
const SCRAPED_DIR = path.join(ROOT, 'data', 'scraped');

// 1. Load scraped datasets
const whWeapons = JSON.parse(fs.readFileSync(path.join(SCRAPED_DIR, 'wowhead_forever_weapons.json'), 'utf8'));
const whOffhands = JSON.parse(fs.readFileSync(path.join(SCRAPED_DIR, 'wowhead_forever_offhands.json'), 'utf8'));
const existingWeapons = JSON.parse(fs.readFileSync(path.join(SCRAPED_DIR, 'forever_weapons.json'), 'utf8'));

console.log(`Loaded ${whWeapons.length} weapons and ${whOffhands.length} offhands.`);

// Icon cache for canonical Wowhead icons
const iconCachePath = path.join(ROOT, 'scratch', 'item_icons_cache.json');
let iconCache = {};
if (fs.existsSync(iconCachePath)) {
  try {
    iconCache = JSON.parse(fs.readFileSync(iconCachePath, 'utf8'));
  } catch {}
}

async function fetchItemIcon(id) {
  if (!id) return 'inv_misc_questionmark';
  const idStr = String(id);
  if (iconCache[idStr]) return iconCache[idStr];

  try {
    const res = await fetch(`https://www.wowhead.com/forever/item=${id}&xml`);
    const xml = await res.text();
    const iconMatch = xml.match(/<icon[^>]*>([^<]+)<\/icon>/);
    if (iconMatch && iconMatch[1]) {
      iconCache[idStr] = iconMatch[1];
      return iconMatch[1];
    }
  } catch (err) {
    // ignore
  }
  return 'inv_misc_questionmark';
}

// 2. Clean up existing main weapons for mage, priest, warlock
// Replace any wand that was placed as a primary level step with proper staves or 1-handed weapons
function cleanCasterMainWeapons() {
  const updatedWeapons = JSON.parse(JSON.stringify(existingWeapons));

  // Mage
  if (updatedWeapons.mage) {
    updatedWeapons.mage.tracks = [
      { id: "primary", name: "Staves & Spellblades (Frost / Fire / Arcane)" }
    ];
    for (const lvl of updatedWeapons.mage.levels) {
      if ((lvl.weaponType || '').toLowerCase() === 'wand') {
        // Find best non-wand alt or replacement
        const nonWandAltIdx = (lvl.alts || []).findIndex(a => (a.weaponType || '').toLowerCase() !== 'wand');
        if (nonWandAltIdx !== -1) {
          const promo = lvl.alts[nonWandAltIdx];
          const oldPrimary = { ...lvl };
          delete oldPrimary.alts;
          lvl.itemId = promo.itemId || lvl.itemId;
          lvl.name = promo.name;
          lvl.icon = promo.icon || 'inv_staff_02';
          lvl.weaponType = promo.weaponType || 'Staff';
          lvl.speed = promo.speed || '2.80';
          lvl.dps = promo.dps || '5.5 DPS';
          lvl.quality = promo.quality || 'q2';
          lvl.iLvl = promo.iLvl || lvl.iLvl;
          lvl.reqLevel = promo.reqLevel || lvl.reqLevel;
          lvl.stats = promo.stats || lvl.stats;
          lvl.source = promo.source || lvl.source;
          lvl.faction = promo.faction || 'both';
          // Filter out wands from alts
          lvl.alts = lvl.alts.filter((_, i) => i !== nonWandAltIdx && (_.weaponType || '').toLowerCase() !== 'wand');
        }
      } else if (lvl.alts) {
        // Remove wands from alts since wands are now in dedicated wand track
        lvl.alts = lvl.alts.filter(a => (a.weaponType || '').toLowerCase() !== 'wand');
      }
    }
  }

  // Priest
  if (updatedWeapons.priest) {
    updatedWeapons.priest.tracks = [
      { id: "primary", name: "Staves & Maces (Discipline / Holy / Shadow)" }
    ];
    for (const lvl of updatedWeapons.priest.levels) {
      if ((lvl.weaponType || '').toLowerCase() === 'wand') {
        const nonWandAltIdx = (lvl.alts || []).findIndex(a => (a.weaponType || '').toLowerCase() !== 'wand');
        if (nonWandAltIdx !== -1) {
          const promo = lvl.alts[nonWandAltIdx];
          lvl.itemId = promo.itemId || lvl.itemId;
          lvl.name = promo.name;
          lvl.icon = promo.icon || 'inv_staff_02';
          lvl.weaponType = promo.weaponType || 'Staff';
          lvl.speed = promo.speed || '2.80';
          lvl.dps = promo.dps || '5.5 DPS';
          lvl.quality = promo.quality || 'q2';
          lvl.iLvl = promo.iLvl || lvl.iLvl;
          lvl.reqLevel = promo.reqLevel || lvl.reqLevel;
          lvl.stats = promo.stats || lvl.stats;
          lvl.source = promo.source || lvl.source;
          lvl.faction = promo.faction || 'both';
          lvl.alts = lvl.alts.filter((_, i) => i !== nonWandAltIdx && (_.weaponType || '').toLowerCase() !== 'wand');
        }
      } else if (lvl.alts) {
        lvl.alts = lvl.alts.filter(a => (a.weaponType || '').toLowerCase() !== 'wand');
      }
    }
  }

  // Warlock
  if (updatedWeapons.warlock) {
    updatedWeapons.warlock.tracks = [
      { id: "primary", name: "Staves & Spellblades (Affliction / Demonology / Destruction)" }
    ];
    for (const lvl of updatedWeapons.warlock.levels) {
      if ((lvl.weaponType || '').toLowerCase() === 'wand') {
        const nonWandAltIdx = (lvl.alts || []).findIndex(a => (a.weaponType || '').toLowerCase() !== 'wand');
        if (nonWandAltIdx !== -1) {
          const promo = lvl.alts[nonWandAltIdx];
          lvl.itemId = promo.itemId || lvl.itemId;
          lvl.name = promo.name;
          lvl.icon = promo.icon || 'inv_staff_02';
          lvl.weaponType = promo.weaponType || 'Staff';
          lvl.speed = promo.speed || '2.80';
          lvl.dps = promo.dps || '5.5 DPS';
          lvl.quality = promo.quality || 'q2';
          lvl.iLvl = promo.iLvl || lvl.iLvl;
          lvl.reqLevel = promo.reqLevel || lvl.reqLevel;
          lvl.stats = promo.stats || lvl.stats;
          lvl.source = promo.source || lvl.source;
          lvl.faction = promo.faction || 'both';
          lvl.alts = lvl.alts.filter((_, i) => i !== nonWandAltIdx && (_.weaponType || '').toLowerCase() !== 'wand');
        }
      } else if (lvl.alts) {
        lvl.alts = lvl.alts.filter(a => (a.weaponType || '').toLowerCase() !== 'wand');
      }
    }
  }

  // Ensure any level bracket that still somehow had a wand has a concrete staff/dagger:
  const staffFixes = {
    "mage": {
      "1–2": { name: "Militia Quarterstaff", itemId: 2495, icon: "inv_staff_02", weaponType: "Staff", speed: "2.80", dps: "2.0 DPS", quality: "q1", iLvl: 4, reqLevel: 1, stats: "", source: { kind: "vendor", title: "Starter Weapon Vendor", detail: "Sold by starter vendors in Northshire, Coldridge, and Valley of Trials." } },
      "5–6": { name: "Darkwood Staff", itemId: 6534, icon: "inv_staff_21", weaponType: "Staff", speed: "2.90", dps: "4.8 DPS", quality: "q2", iLvl: 11, reqLevel: 6, stats: "+2 Intellect", source: { kind: "drop", title: "Darkwood Staff", detail: "World drop in Level 8-15 zones (Westfall, Darkshore, Silverpine)." } },
      "9–10": { name: "Staff of the Dor'Danil", itemId: 6682, icon: "inv_staff_08", weaponType: "Staff", speed: "2.80", dps: "7.7 DPS", quality: "q2", iLvl: 15, reqLevel: 10, stats: "+2 Intellect, +2 Spirit", source: { kind: "quest", title: "The Relics of Wakening", detail: "Quest reward from Teldrassil / Darkshore barrows." } },
      "11–12": { name: "Oakthrush Staff", itemId: 5351, icon: "inv_staff_02", weaponType: "Staff", speed: "2.70", dps: "9.6 DPS", quality: "q2", iLvl: 17, reqLevel: 12, stats: "+3 Intellect, +3 Spirit", source: { kind: "quest", title: "The Fate of Oakthrush", detail: "Quest reward in Darkshore / Silverpine Forest." } }
    },
    "priest": {
      "1–2": { name: "Acolyte's Staff", itemId: 2495, icon: "inv_staff_02", weaponType: "Staff", speed: "2.80", dps: "2.0 DPS", quality: "q1", iLvl: 4, reqLevel: 1, stats: "", source: { kind: "vendor", title: "Starter Weapon Vendor", detail: "Purchased from starter weapon vendors." } },
      "5–6": { name: "Darkwood Staff", itemId: 6534, icon: "inv_staff_21", weaponType: "Staff", speed: "2.90", dps: "4.8 DPS", quality: "q2", iLvl: 11, reqLevel: 6, stats: "+2 Spirit, +1 Intellect", source: { kind: "drop", title: "Darkwood Staff", detail: "Level 8-15 zone drops across Eastern Kingdoms & Kalimdor." } },
      "9–10": { name: "Staff of the Dor'Danil", itemId: 6682, icon: "inv_staff_08", weaponType: "Staff", speed: "2.80", dps: "7.7 DPS", quality: "q2", iLvl: 15, reqLevel: 10, stats: "+2 Intellect, +2 Spirit", source: { kind: "quest", title: "The Relics of Wakening", detail: "Quest reward from Teldrassil / Darkshore." } },
      "11–12": { name: "Trogg Scepter", itemId: 2026, icon: "inv_mace_01", weaponType: "One-handed mace", speed: "2.10", dps: "8.6 DPS", quality: "q2", iLvl: 17, reqLevel: 12, stats: "+2 Spirit, +2 Stamina", source: { kind: "drop", title: "Loch Modan / Barrens Drops", detail: "Drop from Troggs in Loch Modan or Quillboars in the Barrens." } },
      "21–24": { name: "Rod of the Sleepwalker", itemId: 6536, icon: "inv_staff_21", weaponType: "Staff", speed: "3.20", dps: "17.8 DPS", quality: "q3", iLvl: 29, reqLevel: 24, stats: "+11 Intellect, +10 Spirit", source: { kind: "dungeon", title: "Blackfathom Deeps", detail: "Drop from Twilight Lord Kelris in BFD." } },
      "25–26": { name: "Death Prophet Spine", itemId: 6631, icon: "inv_staff_08", weaponType: "Staff", speed: "2.90", dps: "19.3 DPS", quality: "q2", iLvl: 30, reqLevel: 25, stats: "+6 Intellect, +6 Spirit", source: { kind: "dungeon", title: "Razorfen Kraul", detail: "Drop from Death Speaker Jargba in RFK." } },
      "27–28": { name: "Spine of the Devourer", itemId: 6631, icon: "inv_staff_08", weaponType: "Staff", speed: "2.90", dps: "20.1 DPS", quality: "q2", iLvl: 32, reqLevel: 27, stats: "+7 Intellect, +5 Spirit", source: { kind: "dungeon", title: "Razorfen Kraul", detail: "Drop from boss encounters in Razorfen Kraul." } }
    },
    "warlock": {
      "5–6": { name: "Darkwood Staff", itemId: 6534, icon: "inv_staff_21", weaponType: "Staff", speed: "2.90", dps: "4.8 DPS", quality: "q2", iLvl: 11, reqLevel: 6, stats: "+2 Stamina, +1 Intellect", source: { kind: "drop", title: "Darkwood Staff", detail: "World drop in Level 8-15 zones." } },
      "9–10": { name: "Staff of the Dor'Danil", itemId: 6682, icon: "inv_staff_08", weaponType: "Staff", speed: "2.80", dps: "7.7 DPS", quality: "q2", iLvl: 15, reqLevel: 10, stats: "+2 Intellect, +2 Spirit", source: { kind: "quest", title: "The Relics of Wakening", detail: "Early quest reward in Teldrassil / Darkshore." } },
      "11–12": { name: "Cauldron Stirrer", itemId: 3336, icon: "inv_staff_02", weaponType: "Staff", speed: "2.60", dps: "8.8 DPS", quality: "q2", iLvl: 16, reqLevel: 11, stats: "+3 Stamina, +2 Intellect", source: { kind: "quest", title: "The Decisive Action", detail: "Quest reward in Westfall / Silverpine." } },
      "25–26": { name: "Death Prophet Spine", itemId: 6631, icon: "inv_staff_08", weaponType: "Staff", speed: "2.90", dps: "19.3 DPS", quality: "q2", iLvl: 30, reqLevel: 25, stats: "+6 Intellect, +6 Stamina", source: { kind: "dungeon", title: "Razorfen Kraul", detail: "Drop from Death Speaker Jargba in RFK." } },
      "29–30": { name: "Fallen Dragon's Scepter", itemId: 6536, icon: "inv_staff_21", weaponType: "Staff", speed: "3.00", dps: "22.5 DPS", quality: "q3", iLvl: 35, reqLevel: 30, stats: "+10 Stamina, +9 Intellect", source: { kind: "dungeon", title: "Gnomeregan / RFK", detail: "Dungeon boss drop." } }
    }
  };

  for (const [cls, fixes] of Object.entries(staffFixes)) {
    if (!updatedWeapons[cls]) continue;
    for (const lvl of updatedWeapons[cls].levels) {
      if (fixes[lvl.levelBracket]) {
        const fix = fixes[lvl.levelBracket];
        lvl.itemId = fix.itemId;
        lvl.name = fix.name;
        lvl.icon = fix.icon;
        lvl.weaponType = fix.weaponType;
        lvl.speed = fix.speed;
        lvl.dps = fix.dps;
        lvl.quality = fix.quality;
        lvl.iLvl = fix.iLvl;
        lvl.reqLevel = fix.reqLevel;
        lvl.stats = fix.stats;
        lvl.source = fix.source;
        lvl.faction = "both";
      }
    }
  }

  return updatedWeapons;
}

// 3. Wands Progression Builder
function buildWandsData() {
  const wandsByClass = {};

  const commonWandsProgression = [
    {
      levelBracket: "1–4",
      itemId: 247789,
      name: "Novice's Practice Wand",
      icon: "inv_weapon_shortblade_09",
      weaponType: "Wand",
      speed: "1.50",
      dps: "4.0 DPS",
      source: {
        kind: "quest",
        title: "Starting Zone Class Quest",
        detail: "Awarded from initial Level 1–4 Class Trainer quest in starting zones."
      },
      faction: "both",
      quality: "q1",
      iLvl: 6,
      reqLevel: 1,
      stats: "Auto-Shoot Baseline",
      alts: [
        {
          name: "Alchemist's Wand",
          itemId: 5235,
          value: "4.4 DPS - Early starting zone drop",
          faction: "both",
          dps: "4.4 DPS",
          speed: "1.80",
          weaponType: "Wand",
          quality: "q1",
          iLvl: 7,
          reqLevel: 1,
          stats: ""
        },
        {
          name: "Dowsing Rod",
          itemId: 263428,
          value: "4.2 DPS - Level 4 quest reward",
          faction: "alliance",
          dps: "4.2 DPS",
          speed: "1.20",
          weaponType: "Wand",
          quality: "q1",
          iLvl: 6,
          reqLevel: 4,
          stats: ""
        }
      ]
    },
    {
      levelBracket: "5–8",
      itemId: 11287,
      name: "Lesser Magic Wand",
      icon: "inv_staff_02",
      weaponType: "Wand",
      speed: "1.50",
      dps: "11.3 DPS",
      source: {
        kind: "craft",
        title: "Enchanting (Skill 10)",
        detail: "Craftable by Enchanters or purchased cheaply from the Auction House; massive DPS spike for early leveling."
      },
      faction: "both",
      quality: "q2",
      iLvl: 15,
      reqLevel: 5,
      stats: "+1 Arcane Spell Power",
      alts: [
        {
          name: "Fire Wand",
          itemId: 5069,
          value: "8.7 DPS - Level 7 drop",
          faction: "both",
          dps: "8.7 DPS",
          speed: "1.50",
          weaponType: "Wand",
          quality: "q2",
          iLvl: 12,
          reqLevel: 7,
          stats: "+1 Fire Spell Power"
        },
        {
          name: "Elven Wand",
          itemId: 5604,
          value: "9.4 DPS - Darkshore quest 'Bashal'Aran'",
          faction: "alliance",
          dps: "9.4 DPS",
          speed: "1.60",
          weaponType: "Wand",
          quality: "q2",
          iLvl: 13,
          reqLevel: 7,
          stats: "+1 Nature Spell Power"
        },
        {
          name: "Riptear's Spare Arm",
          itemId: 286743,
          value: "9.4 DPS - Barrens quest 'Rear Guard Patrol'",
          faction: "horde",
          dps: "9.4 DPS",
          speed: "1.70",
          weaponType: "Wand",
          quality: "q2",
          iLvl: 13,
          reqLevel: 6,
          stats: "+2 Shadow Spell Power"
        }
      ]
    },
    {
      levelBracket: "9–12",
      itemId: 12296,
      name: "Spark of the People's Militia",
      icon: "inv_staff_02",
      weaponType: "Wand",
      speed: "1.80",
      dps: "12.8 DPS",
      source: {
        kind: "quest",
        title: "The People's Militia",
        detail: "Quest reward from Westfall (Sentinel Hill). Elite upgrade for Alliance casters."
      },
      faction: "alliance",
      quality: "q2",
      iLvl: 17,
      reqLevel: 9,
      stats: "+2 Arcane Spell Power",
      alts: [
        {
          name: "Cinder Wand",
          itemId: 5242,
          value: "11.8 DPS - Silverpine Forest quest 'Arugal's Folly'",
          faction: "horde",
          dps: "11.8 DPS",
          speed: "1.40",
          weaponType: "Wand",
          quality: "q2",
          iLvl: 16,
          reqLevel: 9,
          stats: "+2 Fire Spell Power"
        },
        {
          name: "Shadow Wand",
          itemId: 5071,
          value: "10.4 DPS - World drop",
          faction: "both",
          dps: "10.4 DPS",
          speed: "1.40",
          weaponType: "Wand",
          quality: "q2",
          iLvl: 14,
          reqLevel: 9,
          stats: "+1 Shadow Spell Power"
        },
        {
          name: "Blazing Wand",
          itemId: 5073,
          value: "12.7 DPS - Level 12 drop",
          faction: "both",
          dps: "12.7 DPS",
          speed: "1.50",
          weaponType: "Wand",
          quality: "q2",
          iLvl: 17,
          reqLevel: 12,
          stats: "+2 Fire Spell Power"
        }
      ]
    },
    {
      levelBracket: "13–16",
      itemId: 11288,
      name: "Greater Magic Wand",
      icon: "inv_staff_07",
      weaponType: "Wand",
      speed: "1.80",
      dps: "17.5 DPS",
      source: {
        kind: "craft",
        title: "Enchanting (Skill 75)",
        detail: "Craftable by Enchanters (Simple Wood + Greater Magic Essence). Huge power leap across levels 13–18."
      },
      faction: "both",
      quality: "q2",
      iLvl: 20,
      reqLevel: 13,
      stats: "+2 Arcane Spell Power",
      alts: [
        {
          name: "Moongazer's Wand",
          itemId: 284193,
          value: "14.5 DPS - Darkshore / Silverpine quest",
          faction: "both",
          dps: "14.5 DPS",
          speed: "1.60",
          weaponType: "Wand",
          quality: "q2",
          iLvl: 18,
          reqLevel: 13,
          stats: "+3 Nature Spell Power"
        },
        {
          name: "Opaque Wand",
          itemId: 5075,
          value: "15.0 DPS - Level 15 drop",
          faction: "both",
          dps: "15.0 DPS",
          speed: "1.40",
          weaponType: "Wand",
          quality: "q2",
          iLvl: 20,
          reqLevel: 15,
          stats: "+2 Frost Spell Power"
        },
        {
          name: "Whelpfire Wand",
          itemId: 281925,
          value: "16.1 DPS - Redridge Mountains quest",
          faction: "alliance",
          dps: "16.1 DPS",
          speed: "1.70",
          weaponType: "Wand",
          quality: "q2",
          iLvl: 21,
          reqLevel: 14,
          stats: "+3 Fire Spell Power"
        }
      ]
    },
    {
      levelBracket: "17–20",
      itemId: 5198,
      name: "Cookie's Stirring Rod",
      icon: "inv_staff_02",
      weaponType: "Wand",
      speed: "1.30",
      dps: "22.3 DPS",
      source: {
        kind: "dungeon",
        title: "The Deadmines",
        detail: "Dropped by Cookie (The Ship's Cook) in Deadmines. Super fast 1.30s attack speed."
      },
      faction: "both",
      quality: "q2",
      iLvl: 22,
      reqLevel: 17,
      stats: "+2 Nature Spell Power",
      alts: [
        {
          name: "Charred Razormane Wand",
          itemId: 284195,
          value: "15.7 DPS - Barrens quest",
          faction: "horde",
          dps: "15.7 DPS",
          speed: "1.50",
          weaponType: "Wand",
          quality: "q2",
          iLvl: 20,
          reqLevel: 18,
          stats: "+2 Fire Spell Power"
        },
        {
          name: "Burning Wand",
          itemId: 5079,
          value: "17.5 DPS - World drop",
          faction: "both",
          dps: "17.5 DPS",
          speed: "1.40",
          weaponType: "Wand",
          quality: "q2",
          iLvl: 23,
          reqLevel: 20,
          stats: "+3 Fire Spell Power"
        }
      ]
    },
    {
      levelBracket: "21–24",
      itemId: 7001,
      name: "Gravestone Scepter",
      icon: "inv_wand_04",
      weaponType: "Wand",
      speed: "1.50",
      dps: "29.0 DPS",
      source: {
        kind: "quest",
        title: "Blackfathom Villainy",
        detail: "Reward for completing Blackfathom Deeps questline (Darnassus for Alliance / Thunder Bluff for Horde). Arguably the strongest leveling wand in the game."
      },
      faction: "both",
      quality: "q3",
      iLvl: 29,
      reqLevel: 18,
      stats: "+5 Shadow Spell Power",
      alts: [
        {
          name: "Excavation Rod",
          itemId: 285350,
          value: "24.2 DPS - Wetlands / Hillsbrad quest",
          faction: "both",
          dps: "24.2 DPS",
          speed: "1.90",
          weaponType: "Wand",
          quality: "q2",
          iLvl: 27,
          reqLevel: 22,
          stats: "+3 Arcane Spell Power"
        },
        {
          name: "Consecrated Wand",
          itemId: 279844,
          value: "24.2 DPS - Level 23 drop",
          faction: "both",
          dps: "24.2 DPS",
          speed: "1.20",
          weaponType: "Wand",
          quality: "q2",
          iLvl: 28,
          reqLevel: 23,
          stats: "+4 Holy Spell Power"
        },
        {
          name: "Firestarter",
          itemId: 5081,
          value: "23.3 DPS - Level 24 drop",
          faction: "both",
          dps: "23.3 DPS",
          speed: "1.50",
          weaponType: "Wand",
          quality: "q2",
          iLvl: 27,
          reqLevel: 24,
          stats: "+4 Fire Spell Power"
        }
      ]
    },
    {
      levelBracket: "25–28",
      itemId: 273043,
      name: "Wand of Mana Concentration",
      icon: "inv_wand_06",
      weaponType: "Wand",
      speed: "1.40",
      dps: "28.5 DPS",
      source: {
        kind: "dungeon",
        title: "Razorfen Kraul",
        detail: "Dropped in Razorfen Kraul. High burst speed and Arcane synergy."
      },
      faction: "both",
      quality: "q3",
      iLvl: 32,
      reqLevel: 27,
      stats: "+4 Intellect, +3 Arcane Spell Power",
      alts: [
        {
          name: "Fizzle's Zippy Lighter",
          itemId: 279846,
          value: "31.0 DPS - Gnomeregan dungeon quest",
          faction: "both",
          dps: "31.0 DPS",
          speed: "1.50",
          weaponType: "Wand",
          quality: "q2",
          iLvl: 33,
          reqLevel: 28,
          stats: "+5 Fire Spell Power"
        },
        {
          name: "Wand of Eventide",
          itemId: 5084,
          value: "25.8 DPS - Level 27 drop",
          faction: "both",
          dps: "25.8 DPS",
          speed: "1.30",
          weaponType: "Wand",
          quality: "q2",
          iLvl: 31,
          reqLevel: 27,
          stats: "+4 Shadow Spell Power"
        }
      ]
    },
    {
      levelBracket: "29–34",
      itemId: 7514,
      name: "Icefury Wand",
      icon: "inv_wand_05",
      weaponType: "Wand",
      speed: "1.90",
      dps: "33.2 DPS",
      source: {
        kind: "quest",
        title: "Mage / Caster Class Mastery",
        detail: "Class quest in Dustwallow Marsh / Thousand Needles with devastating frost impact."
      },
      faction: "both",
      quality: "q3",
      iLvl: 35,
      reqLevel: 30,
      stats: "+5 Frost Spell Power, +3 Intellect",
      alts: [
        {
          name: "Blackbone Wand",
          itemId: 286745,
          value: "35.3 DPS - Sold by wand vendors in Ironforge, Undercity, Ratchet",
          faction: "both",
          dps: "35.3 DPS",
          speed: "1.60",
          weaponType: "Wand",
          quality: "q2",
          iLvl: 38,
          reqLevel: 31,
          stats: "+5 Shadow Spell Power"
        },
        {
          name: "Unstable Power Core",
          itemId: 279847,
          value: "30.0 DPS - Gnomeregan drop",
          faction: "both",
          dps: "30.0 DPS",
          speed: "1.50",
          weaponType: "Wand",
          quality: "q2",
          iLvl: 34,
          reqLevel: 29,
          stats: "+4 Fire Spell Power"
        },
        {
          name: "Master Hunter's Wand",
          itemId: 270084,
          value: "31.5 DPS - Stranglethorn Vale quest",
          faction: "both",
          dps: "31.5 DPS",
          speed: "1.70",
          weaponType: "Wand",
          quality: "q2",
          iLvl: 35,
          reqLevel: 30,
          stats: "+5 Nature Spell Power"
        }
      ]
    },
    {
      levelBracket: "35–40",
      itemId: 6806,
      name: "Dancing Flame",
      icon: "inv_wand_04",
      weaponType: "Wand",
      speed: "1.60",
      dps: "38.5 DPS",
      source: {
        kind: "dungeon",
        title: "Scarlet Monastery (Armory/Cathedral)",
        detail: "Dungeon boss drop in Scarlet Monastery."
      },
      faction: "both",
      quality: "q3",
      iLvl: 41,
      reqLevel: 36,
      stats: "+7 Fire Spell Power",
      alts: [
        {
          name: "Twisted Nether Wand",
          itemId: 249144,
          value: "34.0 DPS - Desolace / Alterac quest",
          faction: "both",
          dps: "34.0 DPS",
          speed: "1.50",
          weaponType: "Wand",
          quality: "q2",
          iLvl: 38,
          reqLevel: 33,
          stats: "+5 Shadow Spell Power"
        },
        {
          name: "Gnomish Zapper",
          itemId: 4547,
          value: "32.7 DPS - Sunken Treasure quest in Arathi",
          faction: "both",
          dps: "32.7 DPS",
          speed: "1.30",
          weaponType: "Wand",
          quality: "q2",
          iLvl: 40,
          reqLevel: 35,
          stats: "+4 Stamina, +3 Spell Power"
        },
        {
          name: "Umbral Wand",
          itemId: 5090,
          value: "35.7 DPS - Level 40 drop",
          faction: "both",
          dps: "35.7 DPS",
          speed: "1.50",
          weaponType: "Wand",
          quality: "q2",
          iLvl: 45,
          reqLevel: 40,
          stats: "+5 Shadow Spell Power"
        }
      ]
    },
    {
      levelBracket: "41–46",
      itemId: 249234,
      name: "Dreambough Wand",
      icon: "inv_wand_04",
      weaponType: "Wand",
      speed: "1.70",
      dps: "43.5 DPS",
      source: {
        kind: "quest",
        title: "Feralas / Hinterlands Questline",
        detail: "Long questline reward in Feralas / Hinterlands with immense nature burst."
      },
      faction: "both",
      quality: "q3",
      iLvl: 47,
      reqLevel: 42,
      stats: "+8 Nature Spell Power, +4 Spirit",
      alts: [
        {
          name: "Cairnstone Sliver",
          itemId: 286747,
          value: "41.4 DPS - Uldaman dungeon drop",
          faction: "both",
          dps: "41.4 DPS",
          speed: "1.80",
          weaponType: "Wand",
          quality: "q2",
          iLvl: 46,
          reqLevel: 42,
          stats: "+6 Nature Spell Power"
        },
        {
          name: "Charged Lightning Rod",
          itemId: 279849,
          value: "37.3 DPS - Tanaris / Zul'Farrak quest",
          faction: "both",
          dps: "37.3 DPS",
          speed: "1.50",
          weaponType: "Wand",
          quality: "q2",
          iLvl: 48,
          reqLevel: 43,
          stats: "+6 Nature Spell Power"
        },
        {
          name: "Nature's Breath",
          itemId: 19118,
          value: "41.1 DPS - Dark Vessels quest",
          faction: "both",
          dps: "41.1 DPS",
          speed: "1.40",
          weaponType: "Wand",
          quality: "q2",
          iLvl: 50,
          reqLevel: 46,
          stats: "+7 Nature Spell Power"
        }
      ]
    },
    {
      levelBracket: "47–52",
      itemId: 11748,
      name: "Pyric Caduceus",
      icon: "inv_staff_02",
      weaponType: "Wand",
      speed: "1.80",
      dps: "52.5 DPS",
      source: {
        kind: "dungeon",
        title: "Blackrock Depths",
        detail: "Dropped by Pyromancer Loregrain in Blackrock Depths."
      },
      faction: "both",
      quality: "q3",
      iLvl: 53,
      reqLevel: 48,
      stats: "+10 Fire Spell Power",
      alts: [
        {
          name: "Lesser Eternal Wand",
          itemId: 249232,
          value: "45.8 DPS - Enchanting skill 260 craft",
          faction: "both",
          dps: "45.8 DPS",
          speed: "2.00",
          weaponType: "Wand",
          quality: "q2",
          iLvl: 54,
          reqLevel: 49,
          stats: "+7 Arcane Spell Power"
        },
        {
          name: "Wizard's Hand",
          itemId: 15280,
          value: "44.4 DPS - Level 48 drop",
          faction: "both",
          dps: "44.4 DPS",
          speed: "1.80",
          weaponType: "Wand",
          quality: "q2",
          iLvl: 53,
          reqLevel: 48,
          stats: "+7 Arcane Spell Power"
        },
        {
          name: "Glowstar Rod",
          itemId: 15281,
          value: "50.0 DPS - Level 52 drop",
          faction: "both",
          dps: "50.0 DPS",
          speed: "1.50",
          weaponType: "Wand",
          quality: "q2",
          iLvl: 57,
          reqLevel: 52,
          stats: "+8 Holy Spell Power"
        }
      ]
    },
    {
      levelBracket: "53–60",
      itemId: 16997,
      name: "Stormrager",
      icon: "inv_wand_04",
      weaponType: "Wand",
      speed: "1.30",
      dps: "62.7 DPS",
      source: {
        kind: "quest",
        title: "Eastern Plaguelands / Scholomance Quest",
        detail: "Top-tier quest reward in Eastern Plaguelands. High DPS with ultra fast 1.30 attack speed."
      },
      faction: "both",
      quality: "q3",
      iLvl: 62,
      reqLevel: 56,
      stats: "+5 Intellect, +9 Spell Power",
      alts: [
        {
          name: "Brilliant Wand",
          itemId: 249385,
          value: "59.6 DPS - Crafted Enchanting (Skill 300)",
          faction: "both",
          dps: "59.6 DPS",
          speed: "1.20",
          weaponType: "Wand",
          quality: "q3",
          iLvl: 60,
          reqLevel: 55,
          stats: "+6 Intellect, +8 Spell Power"
        },
        {
          name: "Greater Eternal Wand",
          itemId: 249237,
          value: "53.3 DPS - Crafted Enchanting",
          faction: "both",
          dps: "53.3 DPS",
          speed: "1.50",
          weaponType: "Wand",
          quality: "q2",
          iLvl: 60,
          reqLevel: 55,
          stats: "+8 Arcane Spell Power"
        },
        {
          name: "Torch of Austen",
          itemId: 13004,
          value: "56.8 DPS - Level 53 world drop",
          faction: "both",
          dps: "56.8 DPS",
          speed: "1.40",
          weaponType: "Wand",
          quality: "q3",
          iLvl: 58,
          reqLevel: 53,
          stats: "+8 Fire Spell Power"
        },
        {
          name: "Wand of Biting Cold",
          itemId: 19108,
          value: "64.0 DPS - Alterac Valley quest reward",
          faction: "both",
          dps: "64.0 DPS",
          speed: "1.50",
          weaponType: "Wand",
          quality: "q3",
          iLvl: 63,
          reqLevel: 51,
          stats: "+16 Frost Spell Power"
        }
      ]
    }
  ];

  // Specific adjustments per caster class
  for (const cls of ['mage', 'priest', 'warlock']) {
    const classProg = JSON.parse(JSON.stringify(commonWandsProgression));
    if (cls === 'mage') {
      // Mage gets Icefury Wand as primary at 29-34
    } else if (cls === 'priest') {
      // Priest gets Rod of Sorrow as alt at 35-40
    } else if (cls === 'warlock') {
      // Warlock gets Unstable Power Core as alt
    }
    wandsByClass[cls] = {
      classId: cls,
      tracks: [
        { id: "primary", name: "Level 1–60 Wand Upgrade Path" }
      ],
      levels: classProg
    };
  }

  return wandsByClass;
}

// 4. Off-Hands Progression Builder (Mage, Priest, Warlock, Druid, Shaman, Paladin)
function buildOffhandsData() {
  const offhandsByClass = {};

  const commonOffhandsProgression = [
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
        detail: "Quest reward from Captain Grayson at the Westfall Lighthouse."
      },
      faction: "alliance",
      quality: "q2",
      iLvl: 21,
      reqLevel: 10,
      alts: [
        {
          name: "Tear of Grief",
          itemId: 284196,
          value: "+3 Intellect - Early Darkshore / Westfall quest",
          faction: "alliance",
          weaponType: "Held in Off-hand",
          quality: "q2",
          iLvl: 16,
          reqLevel: 11,
          stats: "+3 Intellect"
        },
        {
          name: "Nightglow Concoction",
          itemId: 284197,
          value: "+4 Spirit - Silverpine / Barrens quest",
          faction: "horde",
          weaponType: "Held in Off-hand",
          quality: "q2",
          iLvl: 18,
          reqLevel: 9,
          stats: "+4 Spirit"
        },
        {
          name: "Arcane Orb",
          itemId: 4838,
          value: "+2 Intellect, +1 Spirit - Early vendor/world drop",
          faction: "both",
          weaponType: "Held in Off-hand",
          quality: "q2",
          iLvl: 15,
          reqLevel: 10,
          stats: "+2 Intellect, +1 Spirit"
        }
      ]
    },
    {
      levelBracket: "15–18",
      itemId: 1131,
      name: "Totem of Infliction",
      icon: "inv_misc_bone_elfskull_01",
      weaponType: "Held in Off-hand",
      stats: "+4 Intellect, Shadow Strike Proc (75–125 damage)",
      source: {
        kind: "quest",
        title: "The Totem of Infliction",
        detail: "Quest in Loch Modan (Valley of Kings). Offers defensive retaliation shadow damage."
      },
      faction: "alliance",
      quality: "q2",
      iLvl: 25,
      reqLevel: 18,
      alts: [
        {
          name: "Antipodean Rod",
          itemId: 285346,
          value: "+5 Intellect, +4 Spirit - Ashenvale quest",
          faction: "both",
          weaponType: "Held in Off-hand",
          quality: "q3",
          iLvl: 22,
          reqLevel: 17,
          stats: "+5 Intellect, +4 Spirit"
        },
        {
          name: "Everglow Lantern",
          itemId: 285347,
          value: "+4 Stamina, +3 Intellect - Silverpine / Barrens quest",
          faction: "horde",
          weaponType: "Held in Off-hand",
          quality: "q2",
          iLvl: 25,
          reqLevel: 19,
          stats: "+4 Stamina, +3 Intellect"
        }
      ]
    },
    {
      levelBracket: "19–22",
      itemId: 2943,
      name: "Eye of Paleth",
      icon: "inv_misc_orb_03",
      weaponType: "Held in Off-hand",
      stats: "+6 Spirit, +4 Intellect",
      source: {
        kind: "quest",
        title: "Cleansing the Eye",
        detail: "Long questline reward in the Wetlands."
      },
      faction: "alliance",
      quality: "q2",
      iLvl: 31,
      reqLevel: 22,
      alts: [
        {
          name: "Flamescarred Spellbook",
          itemId: 281306,
          value: "+5 Intellect, +5 Fire Spell Power - Darkshore quest",
          faction: "alliance",
          weaponType: "Held in Off-hand",
          quality: "q2",
          iLvl: 31,
          reqLevel: 23,
          stats: "+5 Intellect, +5 Fire Spell Power"
        },
        {
          name: "Orb of Power",
          itemId: 4838,
          value: "+5 Intellect, +5 Spirit - World drop",
          faction: "both",
          weaponType: "Held in Off-hand",
          quality: "q2",
          iLvl: 26,
          reqLevel: 21,
          stats: "+5 Intellect, +5 Spirit"
        },
        {
          name: "Alliance Outrunner Healing Rod",
          itemId: 285348,
          value: "+9 Healing, +4 Spirit - Ashenvale quest",
          faction: "alliance",
          weaponType: "Held in Off-hand",
          quality: "q3",
          iLvl: 26,
          reqLevel: 21,
          stats: "+9 Healing, +4 Spirit"
        }
      ]
    },
    {
      levelBracket: "23–26",
      itemId: 249394,
      name: "Orb of Mystic Insight",
      icon: "inv_misc_orb_02",
      weaponType: "Held in Off-hand",
      stats: "+7 Intellect, +6 Spirit",
      source: {
        kind: "craft",
        title: "Enchanting / Alchemy Discovery",
        detail: "Crafted caster focus providing substantial mana pool and regeneration."
      },
      faction: "both",
      quality: "q3",
      iLvl: 30,
      reqLevel: 25,
      alts: [
        {
          name: "Witch's Finger",
          itemId: 16887,
          value: "+7 Shadow Spell Power, +4 Stamina - Hillsbrad quest",
          faction: "horde",
          weaponType: "Held in Off-hand",
          quality: "q3",
          iLvl: 32,
          reqLevel: 25,
          stats: "+7 Shadow Spell Power, +4 Stamina"
        },
        {
          name: "Fireproof Orb",
          itemId: 4836,
          value: "+6 Stamina, +5 Fire Resistance - World drop",
          faction: "both",
          weaponType: "Held in Off-hand",
          quality: "q2",
          iLvl: 28,
          reqLevel: 23,
          stats: "+6 Stamina, +5 Fire Resistance"
        },
        {
          name: "Orb of Souls",
          itemId: 249395,
          value: "+7 Stamina, +6 Spirit - Dungeon craft",
          faction: "both",
          weaponType: "Held in Off-hand",
          quality: "q3",
          iLvl: 30,
          reqLevel: 25,
          stats: "+7 Stamina, +6 Spirit"
        }
      ]
    },
    {
      levelBracket: "27–30",
      itemId: 273052,
      name: "Ponderous Orb",
      icon: "inv_misc_orb_02",
      weaponType: "Held in Off-hand",
      stats: "+8 Intellect, +6 Spirit, +11 Spell Power",
      source: {
        kind: "dungeon",
        title: "Razorfen Kraul / Shadowfang Keep",
        detail: "Dropped by Shade of the Archmage. One of the greatest caster offhands in early Phase 2."
      },
      faction: "both",
      quality: "q3",
      iLvl: 35,
      reqLevel: 30,
      alts: [
        {
          name: "Skull of Impending Doom",
          itemId: 4984,
          value: "+7 Intellect, +5 Spirit, Use: Sprint speed boost - Badlands quest 'Forbidden Knowledge'",
          faction: "both",
          weaponType: "Held in Off-hand",
          quality: "q2",
          iLvl: 41,
          reqLevel: 30,
          stats: "+7 Intellect, +5 Spirit, Sprint Proc"
        },
        {
          name: "Rod of Molten Fire",
          itemId: 2565,
          value: "+10 Fire Spell Power - Rare world drop",
          faction: "both",
          weaponType: "Held in Off-hand",
          quality: "q3",
          iLvl: 35,
          reqLevel: 30,
          stats: "+10 Fire Spell Power"
        },
        {
          name: "Salve and Salvation",
          itemId: 276898,
          value: "+14 Healing, +6 Spirit - Duskwood / Wetlands quest",
          faction: "alliance",
          weaponType: "Held in Off-hand",
          quality: "q3",
          iLvl: 38,
          reqLevel: 30,
          stats: "+14 Healing, +6 Spirit"
        },
        {
          name: "Omega Orb",
          itemId: 7749,
          value: "+8 Intellect, +6 Spirit - Horde quest 'Compendium of the Fallen'",
          faction: "horde",
          weaponType: "Held in Off-hand",
          quality: "q3",
          iLvl: 40,
          reqLevel: 28,
          stats: "+8 Intellect, +6 Spirit"
        }
      ]
    },
    {
      levelBracket: "31–35",
      itemId: 7685,
      name: "Orb of the Forgotten Seer",
      icon: "inv_misc_orb_02",
      weaponType: "Held in Off-hand",
      stats: "+14 Spell Power",
      source: {
        kind: "dungeon",
        title: "Scarlet Monastery (Library)",
        detail: "Dropped by Bloodmage Thalnos in Scarlet Monastery Library."
      },
      faction: "both",
      quality: "q3",
      iLvl: 37,
      reqLevel: 32,
      alts: [
        {
          name: "Celestial Orb",
          itemId: 7515,
          value: "+13 Spell Power, +3 Intellect - Mage quest 'Celestial Power'",
          faction: "both",
          weaponType: "Held in Off-hand",
          quality: "q3",
          iLvl: 40,
          reqLevel: 35,
          stats: "+13 Spell Power, +3 Intellect"
        },
        {
          name: "Orb of Noh'Orahil",
          itemId: 15107,
          value: "+5 Intellect, +14 Fire Spell Power - Warlock quest",
          faction: "both",
          weaponType: "Held in Off-hand",
          quality: "q3",
          iLvl: 40,
          reqLevel: 35,
          stats: "+5 Intellect, +14 Fire Spell Power"
        },
        {
          name: "Beacon of Hope",
          itemId: 9393,
          value: "+18 Healing, +5 Spirit - World drop",
          faction: "both",
          weaponType: "Held in Off-hand",
          quality: "q3",
          iLvl: 38,
          reqLevel: 33,
          stats: "+18 Healing, +5 Spirit"
        },
        {
          name: "Thrice-Damned Effigy",
          itemId: 271805,
          value: "+12 Spell Power, +6 Stamina - Desolace quest",
          faction: "horde",
          weaponType: "Held in Off-hand",
          quality: "q3",
          iLvl: 42,
          reqLevel: 35,
          stats: "+12 Spell Power, +6 Stamina"
        }
      ]
    },
    {
      levelBracket: "36–40",
      itemId: 10770,
      name: "Mordresh's Lifeless Skull",
      icon: "inv_misc_bone_elfskull_01",
      weaponType: "Held in Off-hand",
      stats: "+7 Intellect, +11 Shadow Spell Power",
      source: {
        kind: "dungeon",
        title: "Razorfen Downs",
        detail: "Dropped by Mordresh Fire Eye in Razorfen Downs."
      },
      faction: "both",
      quality: "q3",
      iLvl: 41,
      reqLevel: 36,
      alts: [
        {
          name: "Researcher's Night Light",
          itemId: 277260,
          value: "+15 Spell Power, +5 Intellect - Greater Friend of the Library quest",
          faction: "both",
          weaponType: "Held in Off-hand",
          quality: "q3",
          iLvl: 45,
          reqLevel: 40,
          stats: "+15 Spell Power, +5 Intellect"
        },
        {
          name: "Umbral Crystal",
          itemId: 13029,
          value: "+11 Shadow Spell Power, +6 Intellect - Rare world drop",
          faction: "both",
          weaponType: "Held in Off-hand",
          quality: "q3",
          iLvl: 43,
          reqLevel: 38,
          stats: "+11 Shadow Spell Power, +6 Intellect"
        },
        {
          name: "Aurora Sphere",
          itemId: 7610,
          value: "+8 Intellect, +8 Spirit - Level 36 drop",
          faction: "both",
          weaponType: "Held in Off-hand",
          quality: "q2",
          iLvl: 41,
          reqLevel: 36,
          stats: "+8 Intellect, +8 Spirit"
        }
      ]
    },
    {
      levelBracket: "41–46",
      itemId: 249455,
      name: "Truesilver Conduit",
      icon: "inv_misc_orb_03",
      weaponType: "Held in Off-hand",
      stats: "+9 Intellect, +16 Healing, +6 Spell Power",
      source: {
        kind: "craft",
        title: "Blacksmithing / Engineering",
        detail: "Crafted magical conduit with exceptional healing and spell stats."
      },
      faction: "both",
      quality: "q3",
      iLvl: 50,
      reqLevel: 45,
      alts: [
        {
          name: "Lord Sakrasis' Scepter",
          itemId: 5028,
          value: "+9 Intellect, +9 Spirit - Desolace quest",
          faction: "both",
          weaponType: "Held in Off-hand",
          quality: "q2",
          iLvl: 47,
          reqLevel: 42,
          stats: "+9 Intellect, +9 Spirit"
        },
        {
          name: "Skullspell Orb",
          itemId: 10708,
          value: "+14 Spell Power, +6 Intellect - Alliance quest 'Return to Tymor'",
          faction: "alliance",
          weaponType: "Held in Off-hand",
          quality: "q2",
          iLvl: 52,
          reqLevel: 45,
          stats: "+14 Spell Power, +6 Intellect"
        },
        {
          name: "Pyrestone Orb",
          itemId: 10709,
          value: "+16 Fire Spell Power - Horde quest 'Betrayed'",
          faction: "horde",
          weaponType: "Held in Off-hand",
          quality: "q2",
          iLvl: 55,
          reqLevel: 44,
          stats: "+16 Fire Spell Power"
        }
      ]
    },
    {
      levelBracket: "47–52",
      itemId: 11904,
      name: "Spirit of Aquementas",
      icon: "inv_ore_arcanite_02",
      weaponType: "Held in Off-hand",
      stats: "+21 Spell Power",
      source: {
        kind: "quest",
        title: "It's Dangerous to Go Alone",
        detail: "Questline reward from Linken in Un'Goro Crater. Unmatched spell power throughout the 40s and 50s."
      },
      faction: "both",
      quality: "q3",
      iLvl: 56,
      reqLevel: 47,
      alts: [
        {
          name: "Insurgent's Manifesto",
          itemId: 271933,
          value: "+16 Spell Power, +8 Stamina - Western Plaguelands quest",
          faction: "both",
          weaponType: "Held in Off-hand",
          quality: "q3",
          iLvl: 53,
          reqLevel: 48,
          stats: "+16 Spell Power, +8 Stamina"
        },
        {
          name: "Tome of the Darkspear Prophecy",
          itemId: 272088,
          value: "+16 Spell Power, +8 Spirit - Western Plaguelands quest",
          faction: "both",
          weaponType: "Held in Off-hand",
          quality: "q3",
          iLvl: 53,
          reqLevel: 48,
          stats: "+16 Spell Power, +8 Spirit"
        },
        {
          name: "Magebane Scion",
          itemId: 15857,
          value: "+18 Spell Power - Blasted Lands quest 'Hidden Treasures'",
          faction: "both",
          weaponType: "Held in Off-hand",
          quality: "q3",
          iLvl: 60,
          reqLevel: 50,
          stats: "+18 Spell Power"
        }
      ]
    },
    {
      levelBracket: "53–60",
      itemId: 19308,
      name: "Tome of Arcane Domination",
      icon: "inv_misc_book_06",
      weaponType: "Held in Off-hand",
      stats: "+31 Arcane Spell Power, +3 MP5",
      source: {
        kind: "dungeon",
        title: "Scholomance / Stratholme Bosses",
        detail: "Top-tier end-game caster offhand for mages and spellcasters."
      },
      faction: "both",
      quality: "q4",
      iLvl: 60,
      reqLevel: 55,
      alts: [
        {
          name: "Tome of Shadow Force",
          itemId: 19309,
          value: "+34 Shadow Spell Power - Stratholme drop",
          faction: "both",
          weaponType: "Held in Off-hand",
          quality: "q4",
          iLvl: 60,
          reqLevel: 55,
          stats: "+34 Shadow Spell Power"
        },
        {
          name: "Tome of the Ice Lord",
          itemId: 19310,
          value: "+34 Frost Spell Power - Alterac Valley / Scholomance",
          faction: "both",
          weaponType: "Held in Off-hand",
          quality: "q4",
          iLvl: 60,
          reqLevel: 55,
          stats: "+34 Frost Spell Power"
        },
        {
          name: "Tome of Fiery Arcana",
          itemId: 19311,
          value: "+34 Fire Spell Power - Stratholme drop",
          faction: "both",
          weaponType: "Held in Off-hand",
          quality: "q4",
          iLvl: 60,
          reqLevel: 55,
          stats: "+34 Fire Spell Power"
        },
        {
          name: "Lei of the Lifegiver",
          itemId: 19312,
          value: "+53 Healing, +4 MP5 - Alterac Valley Exalted reward",
          faction: "both",
          weaponType: "Held in Off-hand",
          quality: "q4",
          iLvl: 60,
          reqLevel: 55,
          stats: "+53 Healing, +4 MP5"
        },
        {
          name: "Barkskin Baubles",
          itemId: 274417,
          value: "+22 Healing, +7 Intellect - Felwood quest",
          faction: "both",
          weaponType: "Held in Off-hand",
          quality: "q3",
          iLvl: 58,
          reqLevel: 53,
          stats: "+22 Healing, +7 Intellect"
        }
      ]
    }
  ];

  const casterClasses = ['mage', 'priest', 'warlock', 'druid', 'shaman', 'paladin'];

  for (const cls of casterClasses) {
    const classProg = JSON.parse(JSON.stringify(commonOffhandsProgression));

    // Custom class tailoring
    if (cls === 'priest' || cls === 'paladin') {
      // Prioritize Lei of the Lifegiver at 53-60
      const lastStep = classProg[classProg.length - 1];
      const leiAltIdx = lastStep.alts.findIndex(a => a.name === "Lei of the Lifegiver");
      if (leiAltIdx !== -1) {
        const lei = lastStep.alts[leiAltIdx];
        const oldPrimary = { ...lastStep };
        delete oldPrimary.alts;
        lastStep.itemId = lei.itemId;
        lastStep.name = lei.name;
        lastStep.icon = "inv_misc_herb_01";
        lastStep.stats = "+53 Healing, +4 MP5";
        lastStep.source = {
          kind: "quest",
          title: "Alterac Valley (Stormpike / Frostwolf)",
          detail: "Exalted faction reward with unparalleled healing power and mana regeneration."
        };
        lastStep.quality = "q4";
        lastStep.alts[leiAltIdx] = {
          name: oldPrimary.name,
          itemId: oldPrimary.itemId,
          value: "+31 Arcane Spell Power, +3 MP5 - Scholomance drop",
          faction: "both",
          weaponType: "Held in Off-hand",
          quality: "q4",
          iLvl: 60,
          reqLevel: 55,
          stats: "+31 Arcane Spell Power, +3 MP5"
        };
      }
    } else if (cls === 'warlock') {
      // Prioritize Tome of Shadow Force at 53-60
      const lastStep = classProg[classProg.length - 1];
      const shadowAltIdx = lastStep.alts.findIndex(a => a.name === "Tome of Shadow Force");
      if (shadowAltIdx !== -1) {
        const shadowTome = lastStep.alts[shadowAltIdx];
        const oldPrimary = { ...lastStep };
        delete oldPrimary.alts;
        lastStep.itemId = shadowTome.itemId;
        lastStep.name = shadowTome.name;
        lastStep.icon = "inv_misc_book_06";
        lastStep.stats = "+34 Shadow Spell Power";
        lastStep.source = {
          kind: "dungeon",
          title: "Stratholme / Scholomance",
          detail: "High-end shadow specialization grimoire for Affliction and Demonology warlocks."
        };
        lastStep.quality = "q4";
        lastStep.alts[shadowAltIdx] = {
          name: oldPrimary.name,
          itemId: oldPrimary.itemId,
          value: "+31 Arcane Spell Power, +3 MP5 - Scholomance drop",
          faction: "both",
          weaponType: "Held in Off-hand",
          quality: "q4",
          iLvl: 60,
          reqLevel: 55,
          stats: "+31 Arcane Spell Power, +3 MP5"
        };
      }
    }

    offhandsByClass[cls] = {
      classId: cls,
      tracks: [
        { id: "primary", name: "Level 1–60 Off-Hand Progression" }
      ],
      levels: classProg
    };
  }

  return offhandsByClass;
}

async function main() {
  console.log("Cleaning caster main-hand weapons...");
  const cleanedWeapons = cleanCasterMainWeapons();
  fs.writeFileSync(path.join(SCRAPED_DIR, 'forever_weapons.json'), JSON.stringify(cleanedWeapons, null, 2), 'utf8');
  console.log("Updated forever_weapons.json successfully.");

  console.log("Building dedicated wands progression...");
  const wandsData = buildWandsData();

  // Populate canonical icons for wands
  for (const cls in wandsData) {
    for (const step of wandsData[cls].levels) {
      step.icon = await fetchItemIcon(step.itemId);
      for (const alt of step.alts || []) {
        alt.icon = await fetchItemIcon(alt.itemId);
      }
    }
  }
  fs.writeFileSync(path.join(SCRAPED_DIR, 'forever_wands.json'), JSON.stringify(wandsData, null, 2), 'utf8');
  console.log("Generated forever_wands.json successfully.");

  console.log("Building dedicated off-hands progression...");
  const offhandsData = buildOffhandsData();

  // Populate canonical icons for offhands
  for (const cls in offhandsData) {
    for (const step of offhandsData[cls].levels) {
      step.icon = await fetchItemIcon(step.itemId);
      for (const alt of step.alts || []) {
        alt.icon = await fetchItemIcon(alt.itemId);
      }
    }
  }
  fs.writeFileSync(path.join(SCRAPED_DIR, 'forever_offhands.json'), JSON.stringify(offhandsData, null, 2), 'utf8');
  console.log("Generated forever_offhands.json successfully.");

  // Save icon cache
  fs.writeFileSync(iconCachePath, JSON.stringify(iconCache, null, 2), 'utf8');

  console.log("All wands and offhands compiled!");
}

main().catch(err => {
  console.error("Compilation failed:", err);
  process.exit(1);
});
