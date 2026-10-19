/**
 * Master gear progression enricher for WoW Forever.
 * Systematically audits and populates:
 * 1. data/scraped/forever_weapons.json (All 9 classes, 1-60)
 * 2. data/scraped/forever_wands.json (Mage, Priest, Warlock, 1-60)
 * 3. data/scraped/forever_offhands.json (Mage, Priest, Warlock, Druid, Shaman, Paladin, 1-60)
 * Integrates custom WoW Forever items (IDs 200,000+ and envChange "new"), classic dungeon/quest upgrades,
 * and profession weapons (Blacksmithing, Engineering, Enchanting).
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');
const SCRAPED_DIR = path.join(ROOT, 'data', 'scraped');

// Load databases
const whWeapons = JSON.parse(fs.readFileSync(path.join(SCRAPED_DIR, 'wowhead_forever_weapons.json'), 'utf8'));
const whOffhands = JSON.parse(fs.readFileSync(path.join(SCRAPED_DIR, 'wowhead_forever_offhands.json'), 'utf8'));
const cache = JSON.parse(fs.readFileSync(path.join(ROOT, 'scratch', 'forever_items_cache.json'), 'utf8'));

// Build lookup tables
const itemsById = new Map();
const itemsByName = new Map();

for (const it of [...whWeapons, ...whOffhands]) {
  if (it.id) itemsById.set(it.id, it);
  if (it.name) itemsByName.set(it.name.toLowerCase().trim(), it);
}

// Helper to look up comprehensive item info
function getItemInfo(idOrName) {
  let wh = null;
  let cached = null;

  if (typeof idOrName === 'number') {
    wh = itemsById.get(idOrName);
    cached = cache[String(idOrName)];
  } else if (typeof idOrName === 'string') {
    const num = Number(idOrName);
    if (!isNaN(num)) {
      wh = itemsById.get(num);
      cached = cache[String(num)];
    } else {
      wh = itemsByName.get(idOrName.toLowerCase().trim());
      if (wh?.id) cached = cache[String(wh.id)];
    }
  }

  const id = cached?.id || wh?.id || null;
  const name = cached?.name || wh?.name || String(idOrName);
  const icon = cached?.icon || wh?.appearances?.['0']?.[1] || 'inv_misc_questionmark';
  const quality = cached?.quality || (wh?.quality ? `q${wh.quality}` : 'q2');
  const reqLevel = cached?.reqLevel !== undefined ? cached.reqLevel : (wh?.reqlevel || 1);
  const iLvl = cached?.iLvl || wh?.level || (reqLevel + 5);
  const speed = cached?.speed || (wh?.speed ? Number(wh.speed).toFixed(2) : undefined);
  const dps = cached?.dps || (wh?.dps ? `${Number(wh.dps).toFixed(1)} DPS` : undefined);
  const stats = cached?.stats || '';
  const side = cached?.side || (wh?.side === 1 ? 'alliance' : wh?.side === 2 ? 'horde' : 'both');
  const subclass = cached?.subclassName || 'Weapon';

  return { id, name, icon, quality, reqLevel, iLvl, speed, dps, stats, faction: side, weaponType: subclass, cached, wh };
}

// Factory to create formatted Alt object
function makeAlt(idOrName, customOverrides = {}) {
  const info = getItemInfo(idOrName);
  const name = customOverrides.name || info.name;
  const dps = customOverrides.dps || info.dps;
  const speed = customOverrides.speed || info.speed;
  const stats = customOverrides.stats || info.stats;
  const faction = customOverrides.faction || info.faction;
  const source = customOverrides.source || info.wh?.sourcemore?.[0]?.n || customOverrides.value || 'Drop / Quest';

  let value = customOverrides.value;
  if (!value) {
    const parts = [];
    if (dps && speed) parts.push(`${dps}, ${speed}s`);
    else if (dps) parts.push(dps);
    if (stats) parts.push(stats);
    if (typeof source === 'string') parts.push(source);
    else if (source?.title) parts.push(source.title);
    value = parts.join(' - ');
  }

  return {
    name,
    itemId: info.id || customOverrides.itemId || null,
    value,
    faction,
    dps: dps || undefined,
    speed: speed || undefined,
    weaponType: customOverrides.weaponType || info.weaponType,
    quality: customOverrides.quality || info.quality,
    iLvl: customOverrides.iLvl || info.iLvl,
    reqLevel: customOverrides.reqLevel !== undefined ? customOverrides.reqLevel : info.reqLevel,
    stats: stats || '',
    icon: customOverrides.icon || info.icon,
    source: typeof source === 'object' ? source : undefined
  };
}

// Factory to create/update formatted Primary Step object
function makeStep(bracket, idOrName, customOverrides = {}, alts = []) {
  const info = getItemInfo(idOrName);
  return {
    levelBracket: bracket,
    itemId: info.id || customOverrides.itemId || null,
    name: customOverrides.name || info.name,
    icon: customOverrides.icon || info.icon,
    weaponType: customOverrides.weaponType || info.weaponType,
    speed: customOverrides.speed || info.speed || '2.80',
    dps: customOverrides.dps || info.dps || '',
    source: customOverrides.source || { kind: 'drop', title: 'World Drop / Quest', detail: customOverrides.detail || 'Zone quest or drop' },
    faction: customOverrides.faction || info.faction,
    quality: customOverrides.quality || info.quality,
    iLvl: customOverrides.iLvl || info.iLvl,
    reqLevel: customOverrides.reqLevel !== undefined ? customOverrides.reqLevel : info.reqLevel,
    stats: customOverrides.stats || info.stats || '',
    alts: cleanAlts(alts, customOverrides.name || info.name)
  };
}

// Clean duplicate or self-referential alts
function cleanAlts(alts, primaryName) {
  const seen = new Set();
  if (primaryName) seen.add(primaryName.toLowerCase().trim());
  const res = [];
  for (const a of alts) {
    if (!a || !a.name) continue;
    const key = a.name.toLowerCase().trim();
    if (!seen.has(key)) {
      seen.add(key);
      res.push(a);
    }
  }
  return res;
}

// --- 1. ENRICH FOREVER WEAPONS ---
console.log('[Enricher] Building comprehensive 1-60 weapons paths across all 9 classes...');
const weaponsData = JSON.parse(fs.readFileSync(path.join(SCRAPED_DIR, 'forever_weapons.json'), 'utf8'));

// Inject new custom weapons and enrich existing levels
function enrichClassWeapons() {
  // A. WARRIOR
  if (weaponsData.warrior) {
    const wLevels = weaponsData.warrior.levels;
    // Add / update level 7-8 to feature Battleguard Captain's Sticker
    const lvl7 = wLevels.find(l => l.levelBracket === '7–8');
    if (lvl7) {
      lvl7.alts.unshift(makeAlt(284286, { name: "Battleguard Captain's Sticker", value: "8.92 DPS, 3.70s - Captain Flat Tusk in Barrens (+3 Str)" }));
      lvl7.alts.push(makeAlt(286755, { name: "Helm Splitter", value: "6.88 DPS, 2.40s - 1H Sword (+1 Str)" }));
    }
    // Add Hammerbone & Ironforge Greathammer at 9-10
    const lvl9 = wLevels.find(l => l.levelBracket === '9–10');
    if (lvl9) {
      lvl9.alts.unshift(makeAlt(270018, { name: "Hammerbone", faction: "horde", value: "20.44 DPS, 3.40s - Leaders of the Fang quest in Wailing Caverns (Horde)" }));
      lvl9.alts.unshift(makeAlt(279895, { name: "Ironforge Greathammer", faction: "alliance", value: "15.97 DPS, 3.10s - Old Ironforge Incursion quest (Alliance)" }));
    }
    // Add The Skyblade & Wolfsbane at 21-22
    const lvl21 = wLevels.find(l => l.levelBracket === '21–22');
    if (lvl21) {
      lvl21.alts.unshift(makeAlt(286540, { name: "The Skyblade", value: "22.36 DPS, 3.60s (56-105 dmg) (+10 Str, +8 Sta) - Rare 2H Sword" }));
      lvl21.alts.unshift(makeAlt(267369, { name: "Wolfsbane", faction: "horde", value: "25.59 DPS, 3.40s - Old Fire-Eye in Hillsbrad (Horde)" }));
    }
    // Add Trusty Sword, Defender of Dalaran, Heavehammer at 23-26
    const lvl23 = wLevels.find(l => l.levelBracket === '23–24');
    if (lvl23) {
      lvl23.alts.unshift(makeAlt(281313, { name: "Trusty Sword", faction: "alliance", value: "26.67 DPS, 3.30s (+12 Sta, +12 Spi) - Stopping the Cycle quest" }));
    }
    const lvl25 = wLevels.find(l => l.levelBracket === '25–26');
    if (lvl25) {
      lvl25.alts.unshift(makeAlt(279841, { name: "Defender of Dalaran", faction: "alliance", value: "31.21 DPS, 3.30s - Heart of Disruption quest in City of Dalaran" }));
      lvl25.alts.push(makeAlt(277246, { name: "Ruby-Adorned Blade", value: "23.91 DPS, 2.30s - 1H Sword (The Eye of Bhossca quest)" }));
    }
    // Add Abandoned Ferocity, Scavenged Magram Armament at 31-36
    const lvl31 = wLevels.find(l => l.levelBracket === '31–36');
    if (lvl31) {
      lvl31.alts.push(makeAlt(271801, { name: "Abandoned Ferocity", faction: "horde", value: "37.19 DPS, 3.20s - Khan Jehn in Maraudon (Horde)" }));
      lvl31.alts.push(makeAlt(271800, { name: "Scavenged Magram Armament", value: "37.17 DPS, 3.00s - Polearm (Khan Jehn in Maraudon)" }));
    }
    // Clean alts
    wLevels.forEach(l => l.alts = cleanAlts(l.alts, l.name));
  }

  // B. PALADIN
  if (weaponsData.paladin) {
    const pLevels = weaponsData.paladin.levels;
    const lvl1 = pLevels.find(l => l.levelBracket === '1–4');
    if (lvl1) {
      lvl1.alts.unshift(makeAlt(248005, { name: "Northshire Hammer", faction: "alliance", value: "8.33 DPS, 2.70s - Rare Books quest (Alliance)" }));
    }
    const lvl9 = pLevels.find(l => l.levelBracket === '9–10');
    if (lvl9) {
      lvl9.alts.unshift(makeAlt(279895, { name: "Ironforge Greathammer", faction: "alliance", value: "15.97 DPS, 3.10s - Old Ironforge Incursion quest" }));
    }
    const lvl21 = pLevels.find(l => l.levelBracket === '21–22');
    if (lvl21) {
      lvl21.alts.unshift(makeAlt(286540, { name: "The Skyblade", value: "22.36 DPS, 3.60s (+10 Str, +8 Sta) - Heavy slow 2H Sword" }));
    }
    const lvl25 = pLevels.find(l => l.levelBracket === '25–26');
    if (lvl25) {
      lvl25.alts.unshift(makeAlt(279841, { name: "Defender of Dalaran", faction: "alliance", value: "31.21 DPS, 3.30s - Heart of Disruption in City of Dalaran" }));
      lvl25.alts.unshift(makeAlt(271667, { name: "Ironwood Destroyer", faction: "alliance", value: "22.21 DPS, 3.40s - Horrors in the Highland quest" }));
    }
    pLevels.forEach(l => l.alts = cleanAlts(l.alts, l.name));
  }

  // C. HUNTER
  if (weaponsData.hunter) {
    const hLevels = weaponsData.hunter.levels;
    const lvl1 = hLevels.find(l => l.levelBracket === '1–4');
    if (lvl1) {
      lvl1.alts.unshift(makeAlt(286729, { name: "Kolkar Bow", faction: "horde", value: "2.68 DPS, 2.80s - Lost in the Shadows quest (Horde)" }));
      lvl1.alts.unshift(makeAlt(276685, { name: "Militia Bow", faction: "alliance", value: "5.71 DPS, 2.10s - Rare Books quest (Alliance)" }));
      lvl1.alts.unshift(makeAlt(276694, { name: "Captain Sander's Lucky Shooter", value: "5.87 DPS, 2.30s (+1 Str) - Westfall treasure quest" }));
    }
    const lvl7 = hLevels.find(l => l.levelBracket === '7–8');
    if (lvl7) {
      lvl7.alts.unshift(makeAlt(286753, { name: "Snarlsnout Shooter", value: "5.00 DPS, 2.50s (+1 Str) - Uncommon Gun" }));
      lvl7.alts.unshift(makeAlt(286748, { name: "Bristlebark Bow", value: "5.00 DPS, 2.60s (+1 Agi) - Uncommon Bow" }));
    }
    const lvl9 = hLevels.find(l => l.levelBracket === '9–10');
    if (lvl9) {
      lvl9.alts.unshift(makeAlt(279894, { name: "Calibrated Blunderbuss", faction: "alliance", value: "9.57 DPS, 2.30s (+3 Sta) - Old Ironforge Incursion" }));
      lvl9.alts.unshift(makeAlt(277255, { name: "Misplaced Shooter", faction: "horde", value: "4.82 DPS, 2.80s (+1 Str, +1 Sta) - Leonid's Letter" }));
    }
    const lvl13 = hLevels.find(l => l.levelBracket === '13–14');
    if (lvl13) {
      lvl13.alts.unshift(makeAlt(272999, { name: "Barbaric Crossbow", value: "9.50 DPS, 2.00s - Oggleflint in Ragefire Chasm" }));
      lvl13.alts.push(makeAlt(269742, { name: "Walton's Second-Favorite Gun", faction: "horde", value: "7.95 DPS, 2.20s (+2 Agi) - Unwelcome Guests" }));
    }
    const lvl21 = hLevels.find(l => l.levelBracket === '21–22');
    if (lvl21) {
      lvl21.alts.unshift(makeAlt(285347, { name: "Alliance Outrunner Bow", faction: "alliance", value: "13.33 DPS, 2.40s - Outrunner Quest" }));
      lvl21.alts.unshift(makeAlt(273843, { name: "Fallenroot Longbow", value: "13.86 DPS, 2.20s - Lorgus Jett in BFD" }));
    }
    const lvl25 = hLevels.find(l => l.levelBracket === '25–26');
    if (lvl25) {
      lvl25.alts.unshift(makeAlt(273033, { name: "Gravespike Repeater", value: "15.43 DPS, 2.30s - Atrexis the Grave Knight in City of Dalaran" }));
      lvl25.alts.unshift(makeAlt(282710, { name: "Dun Garok Rifle", value: "14.81 DPS, 2.60s (+3 Agi, +3 Spi) - Hillsbrad" }));
      lvl25.alts.unshift(makeAlt(273029, { name: "Golemsight Long Gun", value: "16.60 DPS, 2.50s (+6 Agi) - Relic Guardian in Excavation Site" }));
    }
    hLevels.forEach(l => l.alts = cleanAlts(l.alts, l.name));
  }

  // D. ROGUE
  if (weaponsData.rogue) {
    const rLevels = weaponsData.rogue.levels;
    const lvl7 = rLevels.find(l => l.levelBracket === '7–8');
    if (lvl7) {
      lvl7.alts.unshift(makeAlt(286755, { name: "Helm Splitter", value: "6.88 DPS, 2.40s (+1 Str) - Uncommon 1H Sword" }));
      lvl7.alts.unshift(makeAlt(286730, { name: "Pristine Orcish Dagger", faction: "horde", value: "6.25 DPS, 2.40s - Horde Starter Dagger" }));
    }
    const lvl15 = rLevels.find(l => l.levelBracket === '15–16');
    if (lvl15) {
      lvl15.alts.unshift(makeAlt(271204, { name: "Meathook Slicer", value: "13.61 DPS, 1.80s - The Baron in Ruins of Lordaeron" }));
      lvl15.alts.unshift(makeAlt(279876, { name: "Plaguefang", faction: "horde", value: "12.38 DPS, 2.10s - The New Plague quest in Ruins of Lordaeron" }));
      lvl15.alts.unshift(makeAlt(271218, { name: "Vileblood Scimitar", value: "14.62 DPS, 2.60s - Viktor the Vile in Ruins of Lordaeron" }));
    }
    const lvl23 = rLevels.find(l => l.levelBracket === '23–24');
    if (lvl23) {
      lvl23.alts.unshift(makeAlt(281314, { name: "Subdued Dragon's Fang", faction: "alliance", value: "20.59 DPS, 1.70s (+7 Agi, +2 Sta) - Stopping the Cycle quest" }));
      lvl23.alts.unshift(makeAlt(280805, { name: "Serrated Raptor Claw", faction: "horde", value: "17.19 DPS, 1.60s (+3 Agi) - Changing Tastes quest" }));
      lvl23.alts.unshift(makeAlt(277246, { name: "Ruby-Adorned Blade", value: "23.91 DPS, 2.30s - The Eye of Bhossca quest" }));
    }
    const lvl27 = rLevels.find(l => l.levelBracket === '27–28');
    if (lvl27) {
      lvl27.alts.unshift(makeAlt(286996, { name: "City Guard's Tarnished Blade", value: "22.40 DPS, 2.50s - Level 29 1H Sword" }));
      lvl27.alts.unshift(makeAlt(273053, { name: "Tendonscraper Dagger", value: "14.38 DPS, 1.60s - Lyn the Ignored in City of Dalaran" }));
    }
    rLevels.forEach(l => l.alts = cleanAlts(l.alts, l.name));
  }

  // E. MAGE, PRIEST, WARLOCK, DRUID, SHAMAN - Staffs and Caster blades
  const casters = ['mage', 'priest', 'warlock', 'druid', 'shaman'];
  for (const c of casters) {
    if (!weaponsData[c]) continue;
    const cLevels = weaponsData[c].levels;

    // Remove self-referential alts and repetitive Kris of Orgrimmar
    for (const l of cLevels) {
      l.alts = l.alts.filter(a => a.name !== l.name && a.name !== "Staff of the Dor'Danil" || l.name !== "Staff of the Dor'Danil");
      l.alts = cleanAlts(l.alts, l.name);
    }

    // Add Gnarled Necromancer's Staff at 15-16
    const lvl15 = cLevels.find(l => l.levelBracket === '15–16');
    if (lvl15) {
      lvl15.alts.unshift(makeAlt(251534, { name: "Gnarled Necromancer's Staff", faction: "horde", value: "15.18 DPS, 2.80s (+12 Spell Power) - The Wrath of Rath'mael in Ruins of Lordaeron" }));
    }

    // Add Striking Staff at 25-26 or 27-28
    const lvl25 = cLevels.find(l => l.levelBracket === '25–26' || l.levelBracket === '27–28');
    if (lvl25) {
      lvl25.alts.unshift(makeAlt(279844, { name: "Striking Staff", faction: "horde", value: "31.29 DPS, 3.10s (+14 Spell Power) - Heart of Disruption in City of Dalaran" }));
      lvl25.alts.unshift(makeAlt(271767, { name: "Healer's Staff", value: "20.77 DPS, 2.60s (+16 Healing) - Excavation Site: Wetlands" }));
    }
  }
}

enrichClassWeapons();
fs.writeFileSync(path.join(SCRAPED_DIR, 'forever_weapons.json'), JSON.stringify(weaponsData, null, 2), 'utf8');
console.log('[Enricher] Successfully saved enriched forever_weapons.json!');

// --- 2. ENRICH FOREVER WANDS ---
console.log('[Enricher] Building comprehensive 1-60 wand progression roadmap...');
const wandsData = JSON.parse(fs.readFileSync(path.join(SCRAPED_DIR, 'forever_wands.json'), 'utf8'));

// Curate the definitive 1-60 Wand Progression Steps
const definitiveWandSteps = [
  makeStep('1–4', 247789, {
    name: "Novice's Practice Wand",
    weaponType: "Wand",
    speed: "1.50",
    dps: "4.0 DPS",
    stats: "Starter Level 1 Wand",
    detail: "Vendor or starting quest wand enabling early wanding rotation without mana drain."
  }, [
    makeAlt(263428, { name: "Dowsing Rod", faction: "alliance", value: "4.17 DPS, 1.20s - A Magical Affront quest (Alliance)" })
  ]),
  makeStep('5–6', 286743, {
    name: "Riptear's Spare Arm",
    weaponType: "Wand",
    speed: "1.70",
    dps: "9.41 DPS",
    stats: "Shadow Damage (11–21)",
    faction: "horde",
    detail: "Rear Guard Patrol quest reward in Durotar (Horde). Enormous level 6 wand upgrade."
  }, [
    makeAlt(11287, { name: "Lesser Magic Wand", value: "11.3 DPS, 1.50s - Crafted by Enchanters (Skill 10)" }),
    makeAlt(286750, { name: "Wisesight Wand", value: "8.82 DPS, 1.70s (+1 Int) - Nightscreech drop" })
  ]),
  makeStep('7–10', 279896, {
    name: "Deepblaze",
    weaponType: "Wand",
    speed: "1.70",
    dps: "18.53 DPS",
    stats: "Fire Damage (22–41), +3 Fire Res",
    faction: "alliance",
    quality: "q3",
    detail: "Old Ironforge Incursion quest reward (Alliance). Exceptional 18.5 DPS at level 9."
  }, [
    makeAlt(286750, { name: "Wisesight Wand", value: "8.82 DPS, 1.70s (+1 Int) - Matriarch / drop" }),
    makeAlt(263430, { name: "Windbough Wand", faction: "alliance", value: "7.19 DPS, 1.60s - Boughs in the Wind quest" })
  ]),
  makeStep('11–14', 11288, {
    name: "Greater Magic Wand",
    weaponType: "Wand",
    speed: "1.30",
    dps: "17.5 DPS",
    stats: "Arcane Damage (20–37)",
    detail: "Crafted by Enchanters (Skill 75). Standard leveling powerhouse wand for both factions."
  }, [
    makeAlt(284193, { name: "Moongazer's Wand", value: "14.41 DPS, 1.70s - Lady Moongazer drop" }),
    makeAlt(281925, { name: "Whelpfire Wand", value: "15.26 DPS, 1.90s - Snarlflare in Redridge" })
  ]),
  makeStep('15–20', 281925, {
    name: "Whelpfire Wand",
    weaponType: "Wand",
    speed: "1.90",
    dps: "15.26 DPS",
    stats: "Fire Damage (24–45)",
    detail: "Snarlflare in Redridge Mountains. High single-shot top-end damage for wand weaving."
  }, [
    makeAlt(284574, { name: "Snapped Branch Wand", value: "21.18 DPS, 1.70s - Level 22 World Drop" }),
    makeAlt(11288, { name: "Greater Magic Wand", value: "17.5 DPS, 1.30s - Continue using if unavailable" })
  ]),
  makeStep('21–25', 279847, {
    name: "Unstable Power Core",
    weaponType: "Wand",
    speed: "1.70",
    dps: "29.71 DPS",
    stats: "Arcane Damage (40–74)",
    faction: "horde",
    quality: "q3",
    detail: "Source of Power quest reward in City of Dalaran (Horde). Huge 29.7 DPS spike."
  }, [
    makeAlt(11289, { name: "Lesser Mystic Wand", value: "23.2 DPS, 1.40s - Crafted by Enchanters (Skill 155)" }),
    makeAlt(273043, { name: "Wand of Mana Concentration", value: "31.18 DPS, 1.70s - Arcanic Enigma in City of Dalaran" }),
    makeAlt(284574, { name: "Snapped Branch Wand", value: "21.18 DPS, 1.70s - Level 22 World Drop" })
  ]),
  makeStep('26–30', 273043, {
    name: "Wand of Mana Concentration",
    weaponType: "Wand",
    speed: "1.70",
    dps: "31.18 DPS",
    stats: "Arcane Damage (42–78), +3 Int, +5 Spell Power",
    quality: "q3",
    detail: "Arcanic Enigma in City of Dalaran. Premier level 27 caster wand with bonus spell power."
  }, [
    makeAlt(270084, { name: "Master Hunter's Wand", value: "34.67 DPS, 1.50s - Big Game Hunter quest in STV" }),
    makeAlt(217287, { name: "Greater Mystic Wand", value: "29.0 DPS, 2.00s - Crafted by Enchanters (Skill 175)" })
  ]),
  makeStep('31–36', 270084, {
    name: "Master Hunter's Wand",
    weaponType: "Wand",
    speed: "1.50",
    dps: "34.67 DPS",
    stats: "Nature Damage (44–82)",
    quality: "q3",
    detail: "Big Game Hunter quest reward in Stranglethorn Vale. Exceptional 34.7 DPS at level 28+."
  }, [
    makeAlt(217287, { name: "Greater Mystic Wand", value: "29.0 DPS, 2.00s - Enchanter crafted (Req lvl 30)" }),
    makeAlt(249144, { name: "Twisted Nether Wand", value: "34.0 DPS, 1.50s - Crafted by Enchanters (Req lvl 37)" })
  ]),
  makeStep('37–42', 274425, {
    name: "White Obsidian Wand",
    weaponType: "Wand",
    speed: "1.70",
    dps: "41.47 DPS",
    stats: "Shadow Damage (55–102)",
    quality: "q3",
    detail: "Level 39 Rare Dungeon Drop. Crushing 41.5 DPS wanding output."
  }, [
    makeAlt(277256, { name: "Dudd's Second-Favorite Wand", value: "35.67 DPS, 1.50s - Partial Mystical Notes quest" }),
    makeAlt(249144, { name: "Twisted Nether Wand", value: "34.0 DPS, 1.50s - Crafted by Enchanters (Req lvl 37)" })
  ]),
  makeStep('43–48', 274655, {
    name: "Peacekeeper Wand",
    weaponType: "Wand",
    speed: "1.90",
    dps: "45.53 DPS",
    stats: "Arcane Damage (68–125)",
    quality: "q3",
    detail: "Level 43 Rare Dungeon Drop. Invaluable mana-free damage while grinding mid-40s."
  }, [
    makeAlt(249234, { name: "Dreambough Wand", value: "39.17 DPS, 1.80s - Crafted by Enchanters (Skill 225)" }),
    makeAlt(249232, { name: "Lesser Eternal Wand", value: "45.75 DPS, 2.00s - Crafted by Enchanters (Req lvl 49)" })
  ]),
  makeStep('49–54', 249232, {
    name: "Lesser Eternal Wand",
    weaponType: "Wand",
    speed: "2.00",
    dps: "45.75 DPS",
    stats: "Arcane Damage (73–137)",
    quality: "q3",
    detail: "Crafted by Enchanters (Skill 260). High consistency, easily acquired pre-raid."
  }, [
    makeAlt(281600, { name: "Wail of Death", value: "54.17 DPS, 1.80s - Rare World Drop (Req lvl 56)" })
  ]),
  makeStep('55–60', 281600, {
    name: "Wail of Death",
    weaponType: "Wand",
    speed: "1.80",
    dps: "54.17 DPS",
    stats: "Shadow Damage (85–159)",
    quality: "q3",
    detail: "Level 56 Rare Wand. Outstanding finisher wand before entering Level 60 raid content."
  }, [
    makeAlt(249385, { name: "Brilliant Wand", value: "59.58 DPS, 1.20s - Fast high-DPS wand" }),
    makeAlt(249237, { name: "Greater Eternal Wand", value: "53.33 DPS, 1.50s - Crafted by Enchanters (Skill 285)" }),
    makeAlt(279246, { name: "Torch of Light", value: "76.76 DPS, 1.70s - Best-in-Slot Level 60 Wand" })
  ])
];

for (const cls of ['mage', 'priest', 'warlock']) {
  wandsData[cls] = {
    role: "Caster",
    levels: JSON.parse(JSON.stringify(definitiveWandSteps))
  };
}

fs.writeFileSync(path.join(SCRAPED_DIR, 'forever_wands.json'), JSON.stringify(wandsData, null, 2), 'utf8');
console.log('[Enricher] Successfully saved enriched forever_wands.json!');

// --- 3. ENRICH FOREVER OFF-HANDS ---
console.log('[Enricher] Building comprehensive 1-60 off-hand progression roadmap...');
const offhandsData = JSON.parse(fs.readFileSync(path.join(SCRAPED_DIR, 'forever_offhands.json'), 'utf8'));

const definitiveOffhandSteps = [
  makeStep('1–9', 287090, {
    name: "Letter Opener",
    weaponType: "Held In Off-hand",
    stats: "Starter Off-hand",
    detail: "Basic starter off-hand item for early stat-stick pairing."
  }, []),
  makeStep('10–16', 279898, {
    name: "Dwarven Tome",
    weaponType: "Held In Off-hand",
    stats: "+1 Spirit, +3 Spell Power & Healing",
    faction: "alliance",
    detail: "Important Heirlooms quest reward in Loch Modan (Alliance). First true caster spell power off-hand."
  }, [
    makeAlt(5611, { name: "Tear of Grief", faction: "horde", value: "+3 Stamina, +2 Intellect - Horde Quest" }),
    makeAlt(15932, { name: "Disciple's Stein", value: "+2 Intellect, +1 Spirit - Level 7 Drop" })
  ]),
  makeStep('17–20', 273137, {
    name: "Skum's Bucket",
    weaponType: "Held In Off-hand",
    stats: "+5 Intellect, +3 Stamina",
    detail: "Dropped by Skum in Wailing Caverns. Superb mana pool booster for low-level dungeons."
  }, [
    makeAlt(281294, { name: "Expended Apothecary Vial", faction: "horde", value: "+4 Intellect, +3 Stamina - Valuable Vantages quest" }),
    makeAlt(281291, { name: "Mathystra Channeling Orb", faction: "alliance", value: "+4 Intellect, +3 Spirit - Baron Marinous" }),
    makeAlt(274743, { name: "Defective Samophlange", value: "+4 Stamina, +3 Intellect - Winklespark in Barrens" })
  ]),
  makeStep('21–25', 281306, {
    name: "Flamescarred Spellbook",
    weaponType: "Held In Off-hand",
    stats: "+5 Intellect, +5 Spirit",
    faction: "alliance",
    detail: "Old Habits quest reward (Alliance). Excellent balanced mana recovery off-hand."
  }, [
    makeAlt(285348, { name: "Alliance Outrunner Healing Rod", faction: "alliance", value: "+6 Healing, +3 Stamina - Hannah Bladeleaf" }),
    makeAlt(249394, { name: "Orb of Mystic Insight", value: "+7 Intellect, +5 Spirit - Crafted / Enchanting" }),
    makeAlt(249395, { name: "Orb of Souls", value: "+8 Shadow Spell Power, +6 Stamina - Crafted / Enchanting" })
  ]),
  makeStep('26–29', 273027, {
    name: "Raptor's Gaze",
    weaponType: "Held In Off-hand",
    stats: "+4 Stamina, +4 Intellect, +8 Spell Power",
    quality: "q3",
    detail: "Dropped by Shadetooth in Excavation Site: Wetlands. Invaluable dungeon spell power off-hand."
  }, [
    makeAlt(279838, { name: "Arcane Infused Rod", faction: "alliance", value: "+6 Intellect, +5 Stamina - Starving Arcane quest" }),
    makeAlt(271935, { name: "Insurgent's Manifesto", value: "+8 Stamina, +4 Intellect, +8 Spell Power" }),
    makeAlt(272090, { name: "Tome of the Darkspear Prophecy", faction: "horde", value: "+8 Stamina, +4 Intellect, +8 Spell Power - Creeg Bothunk" })
  ]),
  makeStep('30–34', 273052, {
    name: "Ponderous Orb",
    weaponType: "Held In Off-hand",
    stats: "+8 Intellect, +6 Spirit, +11 Spell Power",
    quality: "q3",
    detail: "Dropped by Shade of the Archmage in City of Dalaran. Premier caster off-hand throughout the 30s."
  }, [
    makeAlt(276898, { name: "Salve and Salvation", faction: "alliance", value: "+9 Spirit, +50 Armor - Past Due quest" }),
    makeAlt(283254, { name: "Heart of Alterac", value: "+7 Stamina, +5 Intellect - Stone Fury in Alterac" })
  ]),
  makeStep('35–39', 271805, {
    name: "Thrice-Damned Effigy",
    weaponType: "Held In Off-hand",
    stats: "+4 Intellect, +7 Spirit, +2 Stamina, +10 Spell Power",
    faction: "horde",
    quality: "q3",
    detail: "Dropped by Khan Jehn in Maraudon (Horde). Elite caster off-hand for mid-level leveling."
  }, [
    makeAlt(271934, { name: "Insurgent's Manifesto", value: "+12 Stamina, +5 Intellect, +12 Spell Power" }),
    makeAlt(272089, { name: "Tome of the Darkspear Prophecy", faction: "horde", value: "+12 Stamina, +5 Intellect, +12 Spell Power" }),
    makeAlt(7685, { name: "Orb of the Forgotten Seer", value: "+12 Intellect, +5 Spirit - Scarlet Monastery Library" })
  ]),
  makeStep('40–44', 277260, {
    name: "Researcher's Night Light",
    weaponType: "Held In Off-hand",
    stats: "+12 Stamina, +12 Spell Power",
    quality: "q3",
    detail: "Greater Friend of the Library quest reward. Heavy durability and spell power boost."
  }, [
    makeAlt(277259, { name: "Fermented Restoration Potion", value: "+12 Stamina, +5 Spirit, +16 Healing" }),
    makeAlt(11904, { name: "Spirit of Aquementas", value: "+20 Spell Power - Un'Goro Crater quest chain" })
  ]),
  makeStep('45–52', 249455, {
    name: "Truesilver Conduit",
    weaponType: "Held In Off-hand",
    stats: "+8 Stamina, +8 Intellect, +14 Spell Power",
    quality: "q3",
    detail: "Crafted by Enchanters / Tradeskills. Reliable high spell power off-hand leading into late game."
  }, [
    makeAlt(249456, { name: "Twisting Essence Jar", value: "+8 Stamina, +8 Spirit, +18 Healing" }),
    makeAlt(271933, { name: "Insurgent's Manifesto", value: "+14 Stamina, +6 Intellect, +14 Spell Power" }),
    makeAlt(282088, { name: "Heart of Smoldar", value: "+8 Stamina, +14 Fire Spell Power" })
  ]),
  makeStep('53–60', 274417, {
    name: "Barkskin Baubles",
    weaponType: "Held In Off-hand",
    stats: "+10 Stamina, +10 Spirit, +18 Healing / Spell Power",
    quality: "q3",
    detail: "Dropped by Dala Fairmaw. Outstanding survivability and caster throughput for level 53-60."
  }, [
    makeAlt(271932, { name: "Insurgent's Manifesto", value: "+17 Stamina, +7 Intellect, +16 Spell Power" }),
    makeAlt(272087, { name: "Tome of the Darkspear Prophecy", faction: "horde", value: "+17 Stamina, +7 Intellect, +16 Spell Power" }),
    makeAlt(234563, { name: "High Warlord's Tome of Destruction", faction: "horde", value: "+24 Stamina, +13 Intellect, +23 Spell Power" }),
    makeAlt(234589, { name: "Grand Marshal's Tome of Power", faction: "alliance", value: "+24 Stamina, +13 Intellect, +23 Spell Power" }),
    makeAlt(234564, { name: "High Warlord's Tome of Mending", faction: "horde", value: "+23 Stamina, +14 Intellect, +35 Healing" }),
    makeAlt(234590, { name: "Grand Marshal's Tome of Restoration", faction: "alliance", value: "+23 Stamina, +14 Intellect, +35 Healing" })
  ])
];

for (const cls of ['mage', 'priest', 'warlock', 'druid', 'shaman', 'paladin']) {
  offhandsData[cls] = {
    role: "Caster",
    levels: JSON.parse(JSON.stringify(definitiveOffhandSteps))
  };
}

fs.writeFileSync(path.join(SCRAPED_DIR, 'forever_offhands.json'), JSON.stringify(offhandsData, null, 2), 'utf8');
console.log('[Enricher] Successfully saved enriched forever_offhands.json!');

// Recompile bundle
import('./compile-progression-data.mjs').then(() => {
  console.log('[Enricher] Master progression dataset compiled into class-progression-data.js successfully!');
});
