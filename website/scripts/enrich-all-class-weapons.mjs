/**
 * Comprehensive weapon path auditor and enricher for WoW Forever.
 * Systematically audits all 9 classes against scraped WoW Forever weapons (wowhead_forever_weapons.json),
 * injecting missing iconic quest/dungeon drops (Crescent Staff, Wingblade, Verigan's Fist, Whirlwind weapons,
 * Bonebiter, Hypnotic Blade, Narpas Sword, Illusionary Rod, Soul Harvester, etc.) and tuning optimal
 * base speeds, DPS, and stat thresholds.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');
const SCRAPED_DIR = path.join(ROOT, 'data', 'scraped');

const whWeapons = JSON.parse(fs.readFileSync(path.join(SCRAPED_DIR, 'wowhead_forever_weapons.json'), 'utf8'));
const currentProgData = JSON.parse(fs.readFileSync(path.join(SCRAPED_DIR, 'forever_weapons.json'), 'utf8'));

// Build lookup dictionary from Wowhead items
const whLookupById = new Map();
const whLookupByName = new Map();
for (const item of whWeapons) {
  if (item.id) whLookupById.set(item.id, item);
  if (item.name) whLookupByName.set(item.name.toLowerCase().trim(), item);
}

// Icon cache
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
  } catch (err) {}
  return 'inv_misc_questionmark';
}

// Helper to construct a fully qualified item object from Wowhead Forever data
function createWeaponObj({
  levelBracket,
  name,
  itemId,
  icon,
  weaponType,
  speed,
  dps,
  stats,
  source,
  faction = 'both',
  quality = 'q2',
  iLvl,
  reqLevel,
  alts = []
}) {
  const wh = (itemId ? whLookupById.get(itemId) : null) || (name ? whLookupByName.get(name.toLowerCase().trim()) : null);
  
  let finalId = itemId || wh?.id || null;
  let finalName = name || wh?.name || 'Weapon';
  let finalSpeed = speed || (wh?.speed ? Number(wh.speed).toFixed(2) : '2.80');
  let finalDps = dps || (wh?.dps ? `${Number(wh.dps).toFixed(1)} DPS` : '');
  let finalReq = reqLevel !== undefined ? reqLevel : (wh?.reqlevel || 1);
  let finalIlvl = iLvl !== undefined ? iLvl : (wh?.level || finalReq + 5);
  let finalQuality = quality || (wh?.quality ? `q${wh.quality}` : 'q2');
  let finalFaction = faction !== 'both' ? faction : (wh?.side === 1 ? 'alliance' : wh?.side === 2 ? 'horde' : 'both');

  // Format stats from envChange if available and not explicitly passed
  let finalStats = stats;
  if (!finalStats && wh?.envChange?.lines) {
    const addedStats = wh.envChange.lines
      .filter(l => /added$/i.test(l) && !/rating|level/i.test(l))
      .map(l => l.replace(/added$/i, '').trim());
    if (addedStats.length > 0) {
      finalStats = addedStats.map(s => `+${s}`).join(', ');
    }
  }

  return {
    levelBracket,
    itemId: finalId,
    name: finalName,
    icon: icon || 'inv_misc_questionmark',
    weaponType: weaponType || 'Weapon',
    speed: finalSpeed,
    dps: finalDps,
    source: source || { kind: 'drop', title: 'World Drop', detail: 'Zone drop or vendor' },
    alts,
    faction: finalFaction,
    quality: finalQuality,
    iLvl: finalIlvl,
    reqLevel: finalReq,
    stats: finalStats || ''
  };
}

function createAltObj({
  name,
  itemId,
  value,
  faction = 'both',
  dps,
  speed,
  weaponType,
  quality = 'q2',
  iLvl,
  reqLevel,
  stats,
  icon,
  source
}) {
  const wh = (itemId ? whLookupById.get(itemId) : null) || (name ? whLookupByName.get(name.toLowerCase().trim()) : null);

  let finalId = itemId || wh?.id || null;
  let finalName = name || wh?.name || 'Alternative';
  let finalSpeed = speed || (wh?.speed ? Number(wh.speed).toFixed(2) : undefined);
  let finalDps = dps || (wh?.dps ? `${Number(wh.dps).toFixed(1)} DPS` : undefined);
  let finalReq = reqLevel !== undefined ? reqLevel : (wh?.reqlevel || 1);
  let finalIlvl = iLvl !== undefined ? iLvl : (wh?.level || finalReq + 5);
  let finalQuality = quality || (wh?.quality ? `q${wh.quality}` : 'q2');
  let finalFaction = faction !== 'both' ? faction : (wh?.side === 1 ? 'alliance' : wh?.side === 2 ? 'horde' : 'both');

  let finalStats = stats;
  if (!finalStats && wh?.envChange?.lines) {
    const addedStats = wh.envChange.lines
      .filter(l => /added$/i.test(l) && !/rating|level/i.test(l))
      .map(l => l.replace(/added$/i, '').trim());
    if (addedStats.length > 0) {
      finalStats = addedStats.map(s => `+${s}`).join(', ');
    }
  }

  return {
    name: finalName,
    itemId: finalId,
    value: value || (finalDps ? `${finalDps} - ${finalStats || 'Alternative option'}` : (finalStats || '')),
    faction: finalFaction,
    dps: finalDps,
    speed: finalSpeed,
    weaponType: weaponType || 'Weapon',
    quality: finalQuality,
    iLvl: finalIlvl,
    reqLevel: finalReq,
    stats: finalStats || '',
    icon: icon || 'inv_misc_questionmark',
    source: source || undefined
  };
}

// 1. Crescent Staff canonical definition
const crescentStaffAlt = createAltObj({
  name: "Crescent Staff",
  itemId: 6505,
  value: "+26 Spell Power, +7 Agi, +7 Sta - Leaders of the Fang quest in Wailing Caverns (Horde)",
  faction: "horde",
  dps: "15.2 DPS",
  speed: "2.90",
  weaponType: "Staff",
  quality: "q3",
  iLvl: 24,
  reqLevel: 10,
  stats: "+26 Spell Power, +7 Agility, +7 Stamina",
  icon: "inv_staff_08",
  source: {
    kind: "quest",
    title: "Leaders of the Fang",
    detail: "Major dungeon quest reward in Wailing Caverns (Horde). Elite spell power boost."
  }
});

// 2. Wingblade canonical definition
const wingbladeAlt = createAltObj({
  name: "Wingblade",
  itemId: 6504,
  value: "15.7 DPS, 2.20s - Leaders of the Fang quest in Wailing Caverns (+5 Agi, +2 Sta) (Horde)",
  faction: "horde",
  dps: "15.7 DPS",
  speed: "2.20",
  weaponType: "One-handed sword",
  quality: "q3",
  iLvl: 24,
  reqLevel: 10,
  stats: "+5 Agility, +2 Stamina",
  icon: "inv_sword_24",
  source: {
    kind: "quest",
    title: "Leaders of the Fang",
    detail: "Dungeon quest reward in Wailing Caverns (Horde). Outstanding fast/balanced sword."
  }
});

// 3. Verigan's Fist canonical definition
const verigansFistAlt = createAltObj({
  name: "Verigan's Fist",
  itemId: 6953,
  value: "21.9 DPS, 3.20s - Paladin Level 20 Class Quest (+12 Sta, +6 Str, +6 Spi, +6 Int) (Alliance)",
  faction: "alliance",
  dps: "21.9 DPS",
  speed: "3.20",
  weaponType: "Two-handed mace",
  quality: "q3",
  iLvl: 31,
  reqLevel: 20,
  stats: "+12 Stamina, +6 Strength, +6 Spirit, +6 Intellect",
  icon: "inv_hammer_04",
  source: {
    kind: "quest",
    title: "The Test of Righteousness",
    detail: "Paladin Level 20 class quest in Stormwind/Ironforge. Colossal 2H mace power spike."
  }
});

// 4. Whirlwind Axe / Sword / Warhammer definitions
const whirlwindAxeAlt = createAltObj({
  name: "Whirlwind Axe",
  itemId: 6975,
  value: "35.6 DPS, 3.60s (102–154 dmg) - Warrior Level 30 Class Quest (+16 Str, +15 Sta)",
  faction: "both",
  dps: "35.6 DPS",
  speed: "3.60",
  weaponType: "Two-handed axe",
  quality: "q3",
  iLvl: 40,
  reqLevel: 30,
  stats: "+16 Strength, +15 Stamina",
  icon: "inv_axe_11",
  source: {
    kind: "quest",
    title: "Whirlwind Weapon (Warrior Quest)",
    detail: "Warrior Level 30 class quest reward. Massive slow top-end damage that anchors Mortal Strike."
  }
});

const whirlwindSwordAlt = createAltObj({
  name: "Whirlwind Sword",
  itemId: 6977,
  value: "35.5 DPS, 2.90s - Warrior Level 30 Class Quest (+16 Str, +15 Sta)",
  faction: "both",
  dps: "35.5 DPS",
  speed: "2.90",
  weaponType: "Two-handed sword",
  quality: "q3",
  iLvl: 40,
  reqLevel: 30,
  stats: "+16 Strength, +15 Stamina",
  icon: "inv_sword_39"
});

const whirlwindWarhammerAlt = createAltObj({
  name: "Whirlwind Warhammer",
  itemId: 6976,
  value: "35.7 DPS, 3.40s - Warrior Level 30 Class Quest (+16 Str, +15 Sta)",
  faction: "both",
  dps: "35.7 DPS",
  speed: "3.40",
  weaponType: "Two-handed mace",
  quality: "q3",
  iLvl: 40,
  reqLevel: 30,
  stats: "+16 Strength, +15 Stamina",
  icon: "inv_hammer_16"
});

// 5. Bonebiter definition
const bonebiterAlt = createAltObj({
  name: "Bonebiter",
  itemId: 6830,
  value: "38.8 DPS, 3.40s (105–159 dmg) - In the Name of the Light quest (+10 Str, +10 Sta, +5 Agi) (Alliance)",
  faction: "alliance",
  dps: "38.8 DPS",
  speed: "3.40",
  weaponType: "Two-handed axe",
  quality: "q3",
  iLvl: 44,
  reqLevel: 34,
  stats: "+10 Strength, +10 Stamina, +5 Agility",
  icon: "inv_axe_25",
  source: {
    kind: "quest",
    title: "In the Name of the Light",
    detail: "Scarlet Monastery dungeon quest reward for Alliance. Highest physical top-end weapon until Maraudon."
  }
});

// 6. Hypnotic Blade & Narpas Sword
const hypnoticBladeAlt = createAltObj({
  name: "Hypnotic Blade",
  itemId: 7714,
  value: "17.5 DPS, 1.40s - Arcanist Doan in SM Library (+44 Spell Power, +8 Int, +3 Spi)",
  faction: "both",
  dps: "17.5 DPS",
  speed: "1.40",
  weaponType: "Dagger",
  quality: "q3",
  iLvl: 39,
  reqLevel: 34,
  stats: "+44 Spell Power, +8 Intellect, +3 Spirit",
  icon: "inv_weapon_shortblade_05",
  source: {
    kind: "dungeon",
    title: "Scarlet Monastery (Library)",
    detail: "Dropped by Arcanist Doan in SM Library. Best 1H spell dagger in Phase 2."
  }
});

const narpasSwordAlt = createAltObj({
  name: "Narpas Sword",
  itemId: 217497,
  value: "+48 Spell Power, +10 Hit Rating - Level 34 Mage 1H Sword",
  faction: "both",
  dps: "26.5 DPS",
  speed: "2.10",
  weaponType: "One-handed sword",
  quality: "q3",
  iLvl: 42,
  reqLevel: 34,
  stats: "+48 Spell Power, +10 Hit Rating",
  icon: "inv_sword_24",
  source: {
    kind: "dungeon",
    title: "Dungeon Drop",
    detail: "Specialized caster 1H sword for Mages."
  }
});

const staffOfJordanAlt = createAltObj({
  name: "Staff of Jordan",
  itemId: 873,
  value: "+60 Spell Power, +11 Int, +11 Spi - Level 35 Epic World Drop",
  faction: "both",
  dps: "29.9 DPS",
  speed: "3.70",
  weaponType: "Staff",
  quality: "q4",
  iLvl: 40,
  reqLevel: 35,
  stats: "+60 Spell Power, +11 Intellect, +11 Spirit",
  icon: "inv_staff_29"
});

const soulHarvesterAlt = createAltObj({
  name: "Soul Harvester",
  itemId: 20536,
  value: "+73 Shadow Spell Power, +19 Sta, +16 Int, +10 Hit - Warlock Level 50 Quest",
  faction: "both",
  dps: "33.5 DPS",
  speed: "3.30",
  weaponType: "Staff",
  quality: "q3",
  iLvl: 52,
  reqLevel: 50,
  stats: "+73 Shadow Spell Power, +19 Stamina, +16 Intellect, +10 Hit Rating",
  icon: "inv_weapon_halberd_05",
  source: {
    kind: "quest",
    title: "The Temple of Atal'Hakkar (Warlock Quest)",
    detail: "Class quest in Sunken Temple. Best-in-slot leveling staff for Warlocks."
  }
});

const witchingStaveAlt = createAltObj({
  name: "Witching Stave",
  itemId: 1484,
  value: "+27 Shadow Spell Power, +6 Sta, +5 Int - Level 17 Rare Drop",
  faction: "both",
  dps: "14.0 DPS",
  speed: "3.60",
  weaponType: "Staff",
  quality: "q3",
  iLvl: 22,
  reqLevel: 17,
  stats: "+27 Shadow Spell Power, +6 Stamina, +5 Intellect",
  icon: "inv_staff_08"
});

const staffOfSoranrukAlt = createAltObj({
  name: "Staff of Soran'ruk",
  itemId: 15109,
  value: "+34 Fire/Shadow Spell Power, +14 Sta - Warlock Quest",
  faction: "both",
  dps: "15.7 DPS",
  speed: "2.90",
  weaponType: "Staff",
  quality: "q3",
  iLvl: 25,
  reqLevel: 20,
  stats: "+34 Fire/Shadow Spell Power, +14 Stamina",
  icon: "inv_staff_08",
  source: {
    kind: "quest",
    title: "The Staff of Soran'ruk",
    detail: "Warlock level 20 class quest reward from BFD / Shadowfang Keep."
  }
});

const deathSpeakerScepterAlt = createAltObj({
  name: "Death Speaker Scepter",
  itemId: 2816,
  value: "+68 Healing, +28 Shadow SP, 12 HP5 - Razorfen Kraul (Death Speaker Jargba)",
  faction: "both",
  dps: "18.5 DPS",
  speed: "2.20",
  weaponType: "One-handed mace",
  quality: "q3",
  iLvl: 33,
  reqLevel: 28,
  stats: "+68 Healing, +28 Shadow Spell Power, 12 Health per 5 sec",
  icon: "inv_mace_01",
  source: {
    kind: "dungeon",
    title: "Razorfen Kraul",
    detail: "Dropped by Death Speaker Jargba. Invaluable 1H mace for Priests, Shamans, and Paladins."
  }
});

// Perform class-by-class audit and enhancements
async function auditAndEnrichAllClasses() {
  const data = JSON.parse(JSON.stringify(currentProgData));

  // --- 1. MAGE ---
  if (data.mage) {
    const lvl19 = data.mage.levels.find(l => l.levelBracket === '19–20');
    if (lvl19) {
      // Ensure Crescent Staff is in alts for Horde
      if (!lvl19.alts.some(a => a.name === "Crescent Staff")) {
        lvl19.alts.unshift(crescentStaffAlt);
      }
      if (!lvl19.alts.some(a => a.name === "Witching Stave")) {
        lvl19.alts.push(witchingStaveAlt);
      }
    }
    const lvl31 = data.mage.levels.find(l => l.levelBracket === '31–35');
    if (lvl31) {
      if (!lvl31.alts.some(a => a.name === "Hypnotic Blade")) {
        lvl31.alts.push(hypnoticBladeAlt);
      }
      if (!lvl31.alts.some(a => a.name === "Narpas Sword")) {
        lvl31.alts.push(narpasSwordAlt);
      }
      if (!lvl31.alts.some(a => a.name === "Staff of Jordan")) {
        lvl31.alts.push(staffOfJordanAlt);
      }
    }
    const lvl36 = data.mage.levels.find(l => l.levelBracket === '36–40');
    if (lvl36) {
      lvl36.source.detail += " (Continue wielding Illusionary Rod / Hypnotic Blade / Narpas Sword: spell power out-scales late 30s quest rewards)";
    }
  }

  // --- 2. WARLOCK ---
  if (data.warlock) {
    const lvl17 = data.warlock.levels.find(l => l.levelBracket === '17–18');
    if (lvl17 && !lvl17.alts.some(a => a.name === "Witching Stave")) {
      lvl17.alts.push(witchingStaveAlt);
    }
    const lvl19 = data.warlock.levels.find(l => l.levelBracket === '19–20');
    if (lvl19) {
      if (!lvl19.alts.some(a => a.name === "Crescent Staff")) {
        lvl19.alts.unshift(crescentStaffAlt);
      }
      if (!lvl19.alts.some(a => a.name === "Staff of Soran'ruk")) {
        lvl19.alts.push(staffOfSoranrukAlt);
      }
    }
    const lvl21 = data.warlock.levels.find(l => l.levelBracket === '21–24');
    if (lvl21) {
      lvl21.name = "Staff of Soran'ruk";
      lvl21.itemId = 15109;
      lvl21.stats = "+34 Fire/Shadow Spell Power, +14 Stamina";
      lvl21.quality = "q3";
      lvl21.reqLevel = 20;
      lvl21.iLvl = 25;
      lvl21.source = {
        kind: "quest",
        title: "The Staff of Soran'ruk",
        detail: "Warlock level 20 class quest in BFD/SFK. Game-changing +34 spell power spike."
      };
    }
    const lvl31 = data.warlock.levels.find(l => l.levelBracket === '31–35');
    if (lvl31) {
      if (!lvl31.alts.some(a => a.name === "Hypnotic Blade")) {
        lvl31.alts.push(hypnoticBladeAlt);
      }
      if (!lvl31.alts.some(a => a.name === "Staff of Jordan")) {
        lvl31.alts.push(staffOfJordanAlt);
      }
    }
    const lvl47 = data.warlock.levels.find(l => l.levelBracket === '47–50');
    if (lvl47) {
      lvl47.name = "Soul Harvester";
      lvl47.itemId = 20536;
      lvl47.stats = "+73 Shadow Spell Power, +19 Stamina, +16 Intellect, +10 Hit Rating";
      lvl47.quality = "q3";
      lvl47.reqLevel = 50;
      lvl47.iLvl = 52;
      lvl47.source = {
        kind: "quest",
        title: "The Temple of Atal'Hakkar (Warlock Quest)",
        detail: "Class quest in Sunken Temple. Best-in-slot leveling staff in the game for Warlocks."
      };
    }
  }

  // --- 3. PRIEST ---
  if (data.priest) {
    const lvl17 = data.priest.levels.find(l => l.levelBracket === '17–18');
    if (lvl17 && !lvl17.alts.some(a => a.name === "Witching Stave")) {
      lvl17.alts.push(witchingStaveAlt);
    }
    const lvl19 = data.priest.levels.find(l => l.levelBracket === '19–20');
    if (lvl19) {
      if (!lvl19.alts.some(a => a.name === "Crescent Staff")) {
        lvl19.alts.unshift(crescentStaffAlt);
      }
    }
    const lvl27 = data.priest.levels.find(l => l.levelBracket === '27–28');
    if (lvl27 && !lvl27.alts.some(a => a.name === "Death Speaker Scepter")) {
      lvl27.alts.unshift(deathSpeakerScepterAlt);
    }
    const lvl31 = data.priest.levels.find(l => l.levelBracket === '31–35');
    if (lvl31) {
      if (!lvl31.alts.some(a => a.name === "Hypnotic Blade")) {
        lvl31.alts.push(hypnoticBladeAlt);
      }
      if (!lvl31.alts.some(a => a.name === "Staff of Jordan")) {
        lvl31.alts.push(staffOfJordanAlt);
      }
    }
  }

  // --- 4. DRUID ---
  if (data.druid) {
    const lvl19 = data.druid.levels.find(l => l.levelBracket === '19–20');
    if (lvl19) {
      lvl19.stats = "+26 Spell Power, +7 Agility, +7 Stamina";
      lvl19.source.detail = "Major quest reward from Leaders of the Fang in Wailing Caverns (Horde). Elite stat stick for both Feral and Balance.";
    }
  }

  // --- 5. SHAMAN ---
  if (data.shaman) {
    const lvl19 = data.shaman.levels.find(l => l.levelBracket === '19–20');
    if (lvl19) {
      lvl19.stats = "+26 Spell Power, +7 Agility, +7 Stamina";
      lvl19.source.detail = "Leaders of the Fang quest reward in Wailing Caverns. Outstanding early 2H weapon for melee or casting.";
    }
    const lvl27 = data.shaman.levels.find(l => l.levelBracket === '27–28');
    if (lvl27 && !lvl27.alts.some(a => a.name === "Death Speaker Scepter")) {
      lvl27.alts.push(deathSpeakerScepterAlt);
    }
  }

  // --- 6. WARRIOR ---
  if (data.warrior) {
    // Level 30 Whirlwind Axe check
    let lvl30 = data.warrior.levels.find(l => l.levelBracket === '29–30' || l.levelBracket === '31–36');
    if (lvl30) {
      if (!lvl30.alts.some(a => a.name === "Whirlwind Axe")) {
        lvl30.alts.unshift(whirlwindAxeAlt);
      }
      if (!lvl30.alts.some(a => a.name === "Whirlwind Sword")) {
        lvl30.alts.push(whirlwindSwordAlt);
      }
      if (!lvl30.alts.some(a => a.name === "Whirlwind Warhammer")) {
        lvl30.alts.push(whirlwindWarhammerAlt);
      }
      if (!lvl30.alts.some(a => a.name === "Bonebiter")) {
        lvl30.alts.push(bonebiterAlt);
      }
    }
  }

  // --- 7. PALADIN ---
  if (data.paladin) {
    const lvl20 = data.paladin.levels.find(l => l.levelBracket === '19–20' || l.levelBracket === '21–24');
    if (lvl20 && !lvl20.alts.some(a => a.name === "Verigan's Fist")) {
      lvl20.alts.unshift(verigansFistAlt);
    }
    const lvl31 = data.paladin.levels.find(l => l.levelBracket === '31–36' || l.levelBracket === '31–35');
    if (lvl31 && !lvl31.alts.some(a => a.name === "Bonebiter")) {
      lvl31.alts.unshift(bonebiterAlt);
    }
  }

  // --- 8. ROGUE ---
  if (data.rogue) {
    const lvl19 = data.rogue.levels.find(l => l.levelBracket === '19–20');
    if (lvl19) {
      if (!lvl19.alts.some(a => a.name === "Wingblade")) {
        lvl19.alts.unshift(wingbladeAlt);
      }
    }
  }

  // --- 9. HUNTER ---
  if (data.hunter) {
    const lvl19 = data.hunter.levels.find(l => l.levelBracket === '19–20');
    if (lvl19) {
      if (!lvl19.alts.some(a => a.name === "Wingblade")) {
        lvl19.alts.push(wingbladeAlt);
      }
      if (!lvl19.alts.some(a => a.name === "Crescent Staff")) {
        lvl19.alts.push(crescentStaffAlt);
      }
    }
  }

  // Ensure icons are populated for all primary and alts
  for (const cls in data) {
    for (const step of data[cls].levels) {
      step.icon = await fetchItemIcon(step.itemId);
      for (const alt of step.alts || []) {
        alt.icon = await fetchItemIcon(alt.itemId);
      }
    }
  }

  // Save enriched forever_weapons.json
  fs.writeFileSync(path.join(SCRAPED_DIR, 'forever_weapons.json'), JSON.stringify(data, null, 2), 'utf8');
  console.log("Successfully enriched all 9 classes in forever_weapons.json!");

  // Save icon cache
  fs.writeFileSync(iconCachePath, JSON.stringify(iconCache, null, 2), 'utf8');
}

auditAndEnrichAllClasses().catch(err => {
  console.error("Enrichment failed:", err);
  process.exit(1);
});
