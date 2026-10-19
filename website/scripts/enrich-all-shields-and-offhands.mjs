/**
 * Master Shields and Held In Off-Hand Progression Pipeline Enricher for WoW Forever.
 * Systematically ingests:
 * 1. data/scraped/wowhead_forever_shields.json (330 shields)
 * 2. data/scraped/wowhead_forever_offhands.json (238 held in off-hand items)
 * 3. scratch/forever_items_cache.json (cached tooltip stats & icons)
 *
 * Replaces hardcoded stubs with granular 1–60 leveling roadmaps for:
 * - Warrior (Protection & Tanking Shields)
 * - Paladin (Tanking Shields & Holy Healing Shields)
 * - Shaman (Elemental/Tanking Shields & Restoration Healing Shields)
 * - Mage (Spell Power & Elemental Off-Hands)
 * - Warlock (Shadow & Fire Spell Power Off-Hands)
 * - Priest (Shadow/DPS Off-Hands & Holy/Discipline Healing Off-Hands)
 * - Druid (Balance/Feral Off-Hands & Restoration Healing Off-Hands)
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');

const SCRAPED_DIR = path.join(ROOT, 'data', 'scraped');
const cachePath = path.join(ROOT, 'scratch', 'forever_items_cache.json');
const shieldsPath = path.join(SCRAPED_DIR, 'wowhead_forever_shields.json');
const offhandsPath = path.join(SCRAPED_DIR, 'wowhead_forever_offhands.json');
const outOffhandsPath = path.join(SCRAPED_DIR, 'forever_offhands.json');

const cache = JSON.parse(fs.readFileSync(cachePath, 'utf8'));
const rawShields = JSON.parse(fs.readFileSync(shieldsPath, 'utf8'));
const rawOffhands = JSON.parse(fs.readFileSync(offhandsPath, 'utf8'));

// Build lookup maps by ID and lower-case name
const itemsById = new Map();
const itemsByName = new Map();

for (const it of [...rawShields, ...rawOffhands]) {
  if (it.id) itemsById.set(it.id, it);
  if (it.name) itemsByName.set(it.name.toLowerCase().trim(), it);
}

// Helper to look up item info from cache or scraped data
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
  const isShield = wh?.slot === 14 || wh?.subclass === 6 || cached?.inventorySlot === 'Shield';
  const icon = cached?.icon || wh?.appearances?.['0']?.[1] || (isShield ? 'inv_shield_04' : 'inv_misc_orb_01');
  const quality = cached?.quality || (wh?.quality ? `q${wh.quality}` : 'q2');
  const reqLevel = cached?.reqLevel !== undefined ? cached.reqLevel : (wh?.reqlevel || 1);
  const iLvl = cached?.iLvl || wh?.level || (reqLevel + 5);
  const stats = cached?.stats || (wh?.armor ? `${wh.armor} Armor` : '');
  const side = cached?.side || (wh?.side === 1 ? 'alliance' : wh?.side === 2 ? 'horde' : 'both');
  const weaponType = isShield ? 'Shield' : 'Held In Off-hand';

  let defaultSource = 'Drop / Quest';
  if (wh?.sourcemore?.[0]?.n) {
    defaultSource = wh.sourcemore[0].n;
  } else if (wh?.source?.[0] === 4) {
    defaultSource = 'Quest Reward';
  } else if (wh?.source?.[0] === 1) {
    defaultSource = 'Crafted';
  } else if (quality === 'q4') {
    defaultSource = 'World Drop Epic / Raid';
  }

  return { id, name, icon, quality, reqLevel, iLvl, stats, faction: side, weaponType, defaultSource, wh, cached };
}

function makeAlt(idOrName, overrides = {}) {
  const info = getItemInfo(idOrName);
  const name = overrides.name || info.name;
  const stats = overrides.stats !== undefined ? overrides.stats : info.stats;
  const faction = overrides.faction || info.faction;
  const quality = overrides.quality || info.quality;
  const reqLevel = overrides.reqLevel !== undefined ? overrides.reqLevel : info.reqLevel;
  const iLvl = overrides.iLvl !== undefined ? overrides.iLvl : info.iLvl;
  const icon = overrides.icon || info.icon;
  const weaponType = overrides.weaponType || info.weaponType;

  let value = overrides.value;
  if (!value) {
    const parts = [];
    if (stats) parts.push(stats);
    parts.push(overrides.source || info.defaultSource);
    value = parts.join(' - ');
  }

  const lines = [weaponType];
  if (stats) {
    stats.split(/,\s*/).forEach(s => { if (s.trim()) lines.push(s.trim()); });
  }
  if (reqLevel > 1) {
    lines.push(`Requires Level ${reqLevel}`);
  }

  return {
    name,
    itemId: info.id,
    icon,
    weaponType,
    value,
    faction,
    quality,
    iLvl,
    reqLevel,
    stats,
    lines,
    source: overrides.source || info.defaultSource
  };
}

function makeStep(levelBracket, primaryIdOrName, primaryOverrides = {}, alts = []) {
  const info = getItemInfo(primaryIdOrName);
  const name = primaryOverrides.name || info.name;
  const stats = primaryOverrides.stats !== undefined ? primaryOverrides.stats : info.stats;
  const faction = primaryOverrides.faction || info.faction;
  const quality = primaryOverrides.quality || info.quality;
  const reqLevel = primaryOverrides.reqLevel !== undefined ? primaryOverrides.reqLevel : info.reqLevel;
  const iLvl = primaryOverrides.iLvl !== undefined ? primaryOverrides.iLvl : info.iLvl;
  const icon = primaryOverrides.icon || info.icon;
  const weaponType = primaryOverrides.weaponType || info.weaponType;

  const sourceKind = primaryOverrides.source?.kind || (primaryOverrides.detail?.includes('quest') || info.defaultSource.includes('Quest') ? 'quest' : (info.defaultSource.includes('Craft') ? 'craft' : 'drop'));
  const sourceTitle = primaryOverrides.source?.title || info.defaultSource;
  const sourceDetail = primaryOverrides.source?.detail || primaryOverrides.detail || `Level ${reqLevel} upgrade focus.`;

  const lines = [weaponType];
  if (stats) {
    stats.split(/,\s*/).forEach(s => { if (s.trim()) lines.push(s.trim()); });
  }
  if (reqLevel > 1) {
    lines.push(`Requires Level ${reqLevel}`);
  }

  return {
    levelBracket,
    itemId: info.id,
    name,
    icon,
    weaponType,
    stats,
    source: {
      kind: sourceKind,
      title: sourceTitle,
      detail: sourceDetail
    },
    faction,
    quality,
    iLvl,
    reqLevel,
    lines,
    alts: alts.filter(Boolean)
  };
}

// -------------------------------------------------------------
// 1. WARRIOR SHIELDS (Full 1-60 Protection & Tanking Progression)
// -------------------------------------------------------------
const warriorShieldLevels = [
  makeStep('1–9', 1166, {
    name: "Dented Buckler",
    detail: "Starting armor vendor / starter zone drop."
  }, [
    makeAlt(2129, { name: "Large Metal Shield" }),
    makeAlt(263431, { name: "Redbeard Crest" }),
    makeAlt(246265, { name: "Salvaged Wooden Tower Shield" }),
    makeAlt(257255, { name: "Highlands Defender's Shield" })
  ]),
  makeStep('10–14', 263431, {
    name: "Redbeard Crest",
    detail: "Early quest reward offering dependable armor and stamina."
  }, [
    makeAlt(17192, { name: "Reinforced Targe" }),
    makeAlt(2442, { name: "Reinforced Targe" }),
    makeAlt(3650, { name: "Battle Shield" }),
    makeAlt(257255, { name: "Highlands Defender's Shield" })
  ]),
  makeStep('15–18', 13245, {
    name: "Kresh's Back",
    detail: "Dropped by Kresh in Wailing Caverns. Iconic massive armor spike for early dungeon tanking."
  }, [
    makeAlt(7002, { name: "Arctic Buckler" }),
    makeAlt(5443, { name: "Gold-plated Buckler" }),
    makeAlt(276889, { name: "Thornwoven Shield" }),
    makeAlt(6223, { name: "Crest of Darkshire", faction: "alliance" }),
    makeAlt(17192, { name: "Reinforced Targe" })
  ]),
  makeStep('19–22', 6320, {
    name: "Commander's Crest",
    detail: "Dropped by Commander Springvale in Shadowfang Keep. Premier early-game dungeon tank shield."
  }, [
    makeAlt(7188, { name: "Stormwind Guard Shield", faction: "alliance" }),
    makeAlt(6223, { name: "Crest of Darkshire", faction: "alliance" }),
    makeAlt(6630, { name: "Seedcloud Buckler" }),
    makeAlt(9607, { name: "Bastion of Stormwind", faction: "alliance" })
  ]),
  makeStep('23–26', 209424, {
    name: "Shell Plate Barrier",
    detail: "Blackfathom Deeps drop with defense and high armor."
  }, [
    makeAlt(7787, { name: "Resplendent Guardian" }),
    makeAlt(13079, { name: "Shield of Thorsen" }),
    makeAlt(6746, { name: "Basalt Buckler" }),
    makeAlt(273811, { name: "Repurposed Rack" }),
    makeAlt(285344, { name: "Guard Captain's Barrier" })
  ]),
  makeStep('27–30', 7747, {
    name: "Vile Protector",
    detail: "High-mitigation dungeon boss drop. Incredible 1150 Armor at level 28."
  }, [
    makeAlt(4129, { name: "Collection Plate" }),
    makeAlt(6694, { name: "Heart of Agamaggan" }),
    makeAlt(273055, { name: "Bonepile Gaze" }),
    makeAlt(286982, { name: "Unearthed Barrier" }),
    makeAlt(6725, { name: "Marbled Buckler" })
  ]),
  makeStep('31–34', 281307, {
    name: "Dragonmaw Buckler",
    detail: "High-strength mid-level shield with balanced mitigation and offensive stats."
  }, [
    makeAlt(13081, { name: "Skullance Shield" }),
    makeAlt(2448, { name: "Heavy Pavise" }),
    makeAlt(271213, { name: "Mirror of Rath'mael" }),
    makeAlt(274043, { name: "Irradiated Shield" })
  ]),
  makeStep('35–38', 9449, {
    name: "Battered Viking Shield",
    detail: "Uldaman: Eric 'The Swift'. Iconic heavy kite shield with massive armor."
  }, [
    makeAlt(1204, { name: "The Green Tower" }),
    makeAlt(9404, { name: "Olaf's All Purpose Shield" }),
    makeAlt(10767, { name: "Savage Boar's Guard" }),
    makeAlt(10686, { name: "Aegis of Battle" }),
    makeAlt(282555, { name: "Shadowforge Shield" })
  ]),
  makeStep('39–42', 7726, {
    name: "Aegis of the Scarlet Commander",
    detail: "Scarlet Monastery Cathedral: Scarlet Commander Mograine. Premier mid-game dungeon shield."
  }, [
    makeAlt(213390, { name: "Whirling Truesilver Gearwall" }),
    makeAlt(1169, { name: "Blackskull Shield" }),
    makeAlt(1203, { name: "Aegis of Stormwind" }),
    makeAlt(277258, { name: "Crest of Elucidation" }),
    makeAlt(216501, { name: "Bloodstorm Barrier" })
  ]),
  makeStep('43–46', 1979, {
    name: "Wall of the Dead",
    detail: "Iconic World Drop Epic Shield. Unbeatable physical mitigation throughout the 40s."
  }, [
    makeAlt(275864, { name: "Putridus Wall" }),
    makeAlt(2040, { name: "Troll Protector" }),
    makeAlt(271798, { name: "Desperate Barrier" }),
    makeAlt(274652, { name: "Wall of Water" }),
    makeAlt(280696, { name: "Elementalist's Guard" })
  ]),
  makeStep('47–50', 17718, {
    name: "Gizlock's Hypertech Buckler",
    detail: "Maraudon: Tinkerer Gizlock. Superb armor, intellect, and MP5."
  }, [
    makeAlt(220600, { name: "Crest of Preeminence" }),
    makeAlt(221468, { name: "Wall of Whispers" }),
    makeAlt(220602, { name: "Sewer Turtle Half-Shell" }),
    makeAlt(11631, { name: "Stoneshell Guard" })
  ]),
  makeStep('51–54', 1168, {
    name: "Skullflame Shield",
    detail: "Iconic World Drop Epic Shield. Unrivaled sustain, self-healing, and dungeon AOE threat."
  }, [
    makeAlt(274418, { name: "Burrow Barricade" }),
    makeAlt(11785, { name: "Rock Golem Bulwark" }),
    makeAlt(10835, { name: "Crest of Supremacy" }),
    makeAlt(13254, { name: "Astral Guard" }),
    makeAlt(18673, { name: "Avalanchion's Stony Hide" })
  ]),
  makeStep('55–58', 12602, {
    name: "Draconian Deflector",
    detail: "Upper Blackrock Spire: General Drakkisath. The undisputed gold-standard pre-raid tanking shield."
  }, [
    makeAlt(18499, { name: "Barrier Shield" }),
    makeAlt(23139, { name: "Lord Blackwood's Buckler" }),
    makeAlt(22336, { name: "Draconian Aegis of the Legion" }),
    makeAlt(13243, { name: "Argent Defender" }),
    makeAlt(13375, { name: "Crest of Retribution" }),
    makeAlt(13205, { name: "Rhombeard Protector" }),
    makeAlt(13529, { name: "Husk of Nerub'enkan" }),
    makeAlt(18696, { name: "Intricately Runed Shield" }),
    makeAlt(18756, { name: "Dreadguard's Protector" }),
    makeAlt(19321, { name: "The Immovable Object" }),
    makeAlt(18168, { name: "Force Reactive Disk" })
  ]),
  makeStep('59–60', 19349, {
    name: "Elementium Reinforced Bulwark",
    detail: "Blackwing Lair: Chromaggus. Pinnacle raid progression shield with impenetrable armor."
  }, [
    makeAlt(23043, { name: "The Face of Death" }),
    makeAlt(22818, { name: "The Plague Bearer" }),
    makeAlt(234807, { name: "Blessed Qiraji Bulwark" }),
    makeAlt(21485, { name: "Buru's Skull Fragment" }),
    makeAlt(22198, { name: "Jagged Obsidian Shield" }),
    makeAlt(19915, { name: "Zulian Defender" }),
    makeAlt(241015, { name: "Aegis of the Scarlet Bastion" }),
    makeAlt(235868, { name: "Bulwark of Ire" }),
    makeAlt(20688, { name: "Earthen Guard" }),
    makeAlt(18825, { name: "Grand Marshal's Aegis", faction: "alliance" }),
    makeAlt(18826, { name: "High Warlord's Shield Wall", faction: "horde" }),
    makeAlt(17066, { name: "Drillborer Disk" })
  ])
];

// -------------------------------------------------------------
// 2. PALADIN SHIELDS (Dual Track: Tanking vs Holy/Healing)
// -------------------------------------------------------------
const paladinTankingShieldLevels = warriorShieldLevels;

const paladinHealingShieldLevels = [
  makeStep('1–9', 5357, {
    name: "Ward of the Vale",
    detail: "Early quest shield with Intellect, Spirit, and solid armor defense."
  }, [
    makeAlt(284322, { name: "Invading Marine's Shield" }),
    makeAlt(3652, { name: "Hunting Buckler" }),
    makeAlt(3160, { name: "Ironplate Buckler" }),
    makeAlt(3653, { name: "Ceremonial Buckler" })
  ]),
  makeStep('10–14', 6380, {
    name: "Inscribed Buckler",
    detail: "Reliable early caster shield with Intellect and Spirit."
  }, [
    makeAlt(4290, { name: "Dust Bowl" }),
    makeAlt(263431, { name: "Redbeard Crest" }),
    makeAlt(276889, { name: "Thornwoven Shield" })
  ]),
  makeStep('15–18', 7002, {
    name: "Arctic Buckler",
    detail: "Blackfathom Deeps drop. High armor, Stamina, and Spirit for healing low-level dungeons."
  }, [
    makeAlt(6447, { name: "Worn Turtle Shell Shield" }),
    makeAlt(4822, { name: "Owl's Disk" }),
    makeAlt(1276, { name: "Fire Hardened Buckler" }),
    makeAlt(1557, { name: "Buckler of the Seas" })
  ]),
  makeStep('19–22', 6630, {
    name: "Seedcloud Buckler",
    detail: "Premier early spell power shield with Intellect and Spell Power."
  }, [
    makeAlt(6383, { name: "Forest Buckler" }),
    makeAlt(3743, { name: "Sentry Buckler" }),
    makeAlt(15894, { name: "Bristlebark Buckler" }),
    makeAlt(4820, { name: "Guardian Buckler" }),
    makeAlt(4444, { name: "Black Husk Shield" })
  ]),
  makeStep('23–26', 273811, {
    name: "Repurposed Rack",
    detail: "Hamhock in the Stockade. Superb armor, Strength, and Spell Power."
  }, [
    makeAlt(1547, { name: "Shield of the Faith", faction: "alliance" }),
    makeAlt(16660, { name: "Driftmire Shield" }),
    makeAlt(6746, { name: "Basalt Buckler" }),
    makeAlt(14608, { name: "Dokebi Buckler" }),
    makeAlt(211460, { name: "Ancient Arctic Buckler" })
  ]),
  makeStep('27–30', 6694, {
    name: "Heart of Agamaggan",
    detail: "Razorfen Kraul: Charlga Razorflank. Dedicated +15 Healing equip effect."
  }, [
    makeAlt(17508, { name: "Forcestone Buckler" }),
    makeAlt(274290, { name: "Painwalker Buckler" }),
    makeAlt(9522, { name: "Energized Stone Circle" }),
    makeAlt(280696, { name: "Elementalist's Guard" }),
    makeAlt(274043, { name: "Irradiated Shield" })
  ]),
  makeStep('31–34', 15865, {
    name: "Anchorhold Buckler",
    detail: "Outstanding mid-game healing shield with +6 Intellect and +5 Spell Power."
  }, [
    makeAlt(270065, { name: "Farseer's Forgotten Shield" }),
    makeAlt(14607, { name: "Hawkeye's Buckler" }),
    makeAlt(9458, { name: "Thermaplugg's Central Core" }),
    makeAlt(4115, { name: "Grom'gol Buckler", faction: "horde" }),
    makeAlt(4067, { name: "Glyphed Buckler" })
  ]),
  makeStep('35–38', 9403, {
    name: "Battered Viking Shield",
    detail: "Uldaman: Eric 'The Swift'. High mitigation shield with Spirit and dedicated +13 Healing equip."
  }, [
    makeAlt(282555, { name: "Shadowforge Shield" }),
    makeAlt(14825, { name: "Symbolic Crest" }),
    makeAlt(4652, { name: "Salbac Shield", faction: "alliance" })
  ]),
  makeStep('39–42', 213412, {
    name: "Dielectric Safety Shield",
    detail: "Gnomeregan raid / dungeon boss drop. Incredible +22 Healing and +4 MP5."
  }, [
    makeAlt(13082, { name: "Mountainside Buckler" }),
    makeAlt(277258, { name: "Crest of Elucidation" }),
    makeAlt(216501, { name: "Bloodstorm Barrier" }),
    makeAlt(276204, { name: "Thrash's Trash" }),
    makeAlt(213351, { name: "Irradiated Tower Shield" }),
    makeAlt(9661, { name: "Earthclasp Barrier", faction: "horde" }),
    makeAlt(14777, { name: "Ravager's Shield" }),
    makeAlt(1169, { name: "Blackskull Shield" })
  ]),
  makeStep('43–46', 274652, {
    name: "Wall of Water",
    detail: "High-level dungeon drop with +14 Spell Power and +3 MP5 sustain."
  }, [
    makeAlt(14780, { name: "Khan's Buckler" }),
    makeAlt(8134, { name: "Myrmidon's Defender" }),
    makeAlt(271798, { name: "Desperate Barrier" })
  ]),
  makeStep('47–50', 220602, {
    name: "Sewer Turtle Half-Shell",
    detail: "Sunken Temple boss drop. High mitigation, Intellect, and massive +35 Healing."
  }, [
    makeAlt(17718, { name: "Gizlock's Hypertech Buckler" }),
    makeAlt(220601, { name: "Hakkari Witch Doctor's Guard" }),
    makeAlt(223197, { name: "Defender of the Wilds" }),
    makeAlt(14790, { name: "Protector Buckler" }),
    makeAlt(14852, { name: "Sunscale Shield" })
  ]),
  makeStep('51–54', 10835, {
    name: "Crest of Supremacy",
    detail: "Scholomance / Stratholme drop. All-around stat booster with Intellect, Spirit, and Stamina."
  }, [
    makeAlt(8275, { name: "Ebonhold Buckler" }),
    makeAlt(14800, { name: "Bloodlust Buckler" }),
    makeAlt(15890, { name: "Vanguard Shield" })
  ]),
  makeStep('55–58', 276754, {
    name: "Sunderbark Vigil",
    detail: "Rare Dire Maul / high-level drop with +12 Healing, +6 Spell Power, and +3 MP5."
  }, [
    makeAlt(228064, { name: "Observer's Shield" }),
    makeAlt(228591, { name: "Rhombeard Protector" }),
    makeAlt(16998, { name: "Sacred Protector" }),
    makeAlt(13083, { name: "Garrett Family Crest" }),
    makeAlt(14002, { name: "Darrowshire Strongguard" })
  ]),
  makeStep('59–60', 19348, {
    name: "Red Dragonscale Protector",
    detail: "Blackwing Lair / high-end raid drop. Unrivaled Holy throughput with 2787 Armor and +37 Healing."
  }, [
    makeAlt(17106, { name: "Malistar's Defender" }),
    makeAlt(279262, { name: "Evergreen Shield" }),
    makeAlt(23075, { name: "Death's Bargain" }),
    makeAlt(241017, { name: "Demon's Folly" }),
    makeAlt(241018, { name: "Nathrezim Heart" }),
    makeAlt(23238, { name: "Stygian Buckler" }),
    makeAlt(19862, { name: "Aegis of the Blood God" }),
    makeAlt(21610, { name: "Wormscale Blocker" }),
    makeAlt(22819, { name: "Shield of Condemnation" }),
    makeAlt(235473, { name: "Grand Marshal's Barricade", faction: "alliance" }),
    makeAlt(235474, { name: "High Warlord's Barricade", faction: "horde" }),
    makeAlt(278468, { name: "Premier Grand Marshal's Barricade", faction: "alliance" }),
    makeAlt(278469, { name: "Premier High Warlord's Barricade", faction: "horde" })
  ])
];

// -------------------------------------------------------------
// 3. SHAMAN SHIELDS (Dual Track: Elemental/Tanking vs Restoration)
// -------------------------------------------------------------
const shamanElementalShieldLevels = warriorShieldLevels;
const shamanRestorationShieldLevels = paladinHealingShieldLevels;

// -------------------------------------------------------------
// 4. MAGE OFF-HANDS (Spell Power & Elemental 1-60 Progression)
// -------------------------------------------------------------
const mageOffhandLevels = [
  makeStep('1–9', 279898, {
    name: "Dwarven Tome",
    stats: "+1 Spirit, +3 Spell Power & Healing",
    faction: "alliance",
    detail: "Important Heirlooms quest reward (Loch Modan). First true early spell power off-hand."
  }, [
    makeAlt(15970, { name: "Native Branch", value: "+2 Intellect - Level 10 Drop" }),
    makeAlt(15932, { name: "Disciple's Stein", value: "+2 Intellect, +1 Spirit - Level 7 Drop" }),
    makeAlt(7507, { name: "Arcane Orb", value: "+2 Intellect, +1 Spirit - World drop" })
  ]),
  makeStep('10–14', 1172, {
    name: "Grayson's Torch",
    stats: "+4 Spirit",
    detail: "The Westfall Lighthouse / coastal quest. Reliable early stat stick."
  }, [
    makeAlt(284196, { name: "Tear of Grief", faction: "alliance", value: "+3 Intellect - Darkshore quest" }),
    makeAlt(284197, { name: "Nightglow Concoction", faction: "horde", value: "+4 Spirit - Silverpine / Barrens quest" })
  ]),
  makeStep('15–18', 273137, {
    name: "Skum's Bucket",
    stats: "+5 Intellect, +3 Stamina, On-Use: Restores 835 Mana",
    quality: "q3",
    detail: "Dropped by Skum in Wailing Caverns. Superb mana pool and active mana fountain."
  }, [
    makeAlt(2879, { name: "Antipodean Rod", value: "+5 Intellect, +4 Spirit - Ashenvale quest" }),
    makeAlt(281291, { name: "Mathystra Channeling Orb", faction: "alliance", value: "+4 Intellect, +3 Spirit - Darkshore quest" }),
    makeAlt(6341, { name: "Eerie Stable Lantern", value: "+4 Stamina - SFK Deathsworn Captain" })
  ]),
  makeStep('19–22', 279838, {
    name: "Arcane Infused Rod",
    stats: "+11 Arcane Spell Damage",
    faction: "alliance",
    detail: "Starving Arcane quest in Ashenvale (Alliance). Massive Arcane throughput spike."
  }, [
    makeAlt(1131, { name: "Totem of Infliction", faction: "alliance", value: "+4 Intellect, Shadow Strike Proc - Loch Modan" }),
    makeAlt(284668, { name: "Apothecary's Concoction", faction: "horde", value: "+4 Stamina, +3 Intellect - Barrens quest" })
  ]),
  makeStep('23–26', 249394, {
    name: "Orb of Mystic Insight",
    stats: "+6 Intellect, +7 Spell Power & Healing",
    quality: "q3",
    detail: "Crafted by Enchanters. Reliable high spell power off-hand for mid-20s."
  }, [
    makeAlt(281306, { name: "Flamescarred Spellbook", faction: "alliance", value: "+5 Intellect, +5 Fire Spell Power - Darkshore" }),
    makeAlt(9513, { name: "Thermaplugg's Central Core", value: "+5 Intellect, +5 Stamina - Gnomeregan" })
  ]),
  makeStep('27–30', 273027, {
    name: "Raptor's Gaze",
    stats: "+4 Stamina, +4 Intellect, +8 Spell Power & Healing",
    quality: "q3",
    detail: "Excavation Site: Wetlands (Shadetooth). Elite dungeon spell power focus."
  }, [
    makeAlt(4984, { name: "Skull of Impending Doom", value: "+60% Run Speed On-Use, breaks CC - Badlands quest" }),
    makeAlt(7515, { name: "Celestial Orb", value: "+3 Intellect, +3 Spirit, +3 Stamina - Mage Class Quest" }),
    makeAlt(273052, { name: "Ponderous Orb", value: "+2 Intellect, +8 Spirit, +11 Spell Power - Dalaran" })
  ]),
  makeStep('31–34', 7685, {
    name: "Orb of the Forgotten Seer",
    stats: "+14 Spell Power & Healing",
    quality: "q3",
    detail: "Scarlet Monastery Library: Bloodmage Thalnos / Doan. The gold-standard mid-game caster off-hand."
  }, [
    makeAlt(1992, { name: "Swampchill Fetish", value: "+10 Frost Spell Power, +6 Intellect - Swamp of Sorrows" }),
    makeAlt(276897, { name: "A Lesson in Destruction", value: "+8 Stamina, +6 Spirit - World Drop" })
  ]),
  makeStep('35–38', 271805, {
    name: "Thrice-Damned Effigy",
    stats: "+4 Intellect, +7 Spirit, +2 Stamina, +10 Spell Power",
    faction: "horde",
    quality: "q3",
    detail: "Maraudon: Khan Jehn. Elite caster off-hand throughout the late 30s."
  }, [
    makeAlt(10770, { name: "Mordresh's Lifeless Skull", value: "+5 Spirit, +14 Fire Spell Power - Razorfen Downs" }),
    makeAlt(10796, { name: "Umbral Crystal", value: "+11 Shadow Res, +7 Intellect - Rare World Drop" })
  ]),
  makeStep('39–42', 277260, {
    name: "Researcher's Night Light",
    stats: "+12 Stamina, +7 Fire Spell Damage",
    quality: "q3",
    detail: "Greater Friend of the Library quest reward. Heavy durability and spell damage."
  }, [
    makeAlt(282706, { name: "Rotting Meat", value: "+12 Stamina - World Drop" }),
    makeAlt(5028, { name: "Lord Sakrasis' Scepter", value: "+6 Intellect - Desolace" })
  ]),
  makeStep('43–46', 249455, {
    name: "Truesilver Conduit",
    stats: "+8 Stamina, +8 Intellect, +10 Spell Power & Healing",
    quality: "q3",
    detail: "Crafted by Enchanters / Tradeskills. Consistent high spell power leading into endgame."
  }, [
    makeAlt(282088, { name: "Heart of Smoldar", value: "+8 Stamina, +14 Fire Spell Power - Burning Steppes" }),
    makeAlt(18762, { name: "Shard of the Green Flame", value: "+10 Fire Spell Power, +8 Intellect - Sunken Temple" })
  ]),
  makeStep('47–50', 11904, {
    name: "Spirit of Aquementas",
    stats: "+21 Spell Power & Healing",
    quality: "q3",
    detail: "It's Dangerous to Go Alone quest reward in Un'Goro Crater (Linken chain). Premier pre-60 focus."
  }, [
    makeAlt(10842, { name: "Drakestone of the Fireflash", value: "+21 Fire Spell Power - Sunken Temple: Drakes" }),
    makeAlt(10843, { name: "Drakestone of the Frozen", value: "+21 Frost Spell Power - Sunken Temple: Drakes" })
  ]),
  makeStep('51–54', 274417, {
    name: "Barkskin Baubles",
    stats: "+10 Stamina, +10 Spirit, +22 Healing & Spell Power",
    quality: "q3",
    detail: "Dropped by Dala Fairmaw. Outstanding survivability and throughput entering endgame."
  }, [
    makeAlt(16768, { name: "Furbolg Medicine Pouch", value: "+10 Stamina, On-Use 1000 HP Heal - Timbermaw Hold Friendly" }),
    makeAlt(271933, { name: "Insurgent's Manifesto", value: "+14 Stamina, +6 Intellect, +5 Spell Power" })
  ]),
  makeStep('55–58', 19315, {
    name: "Therazane's Touch",
    stats: "+29 Spell Power",
    quality: "q4",
    detail: "Alterac Valley / Reputation. Premier raw damage off-hand focus."
  }, [
    makeAlt(19308, { name: "Tome of the Fiery Arcana", value: "+34 Fire Spell Power - Alterac Valley (Fire Mage BiS)" }),
    makeAlt(19312, { name: "Tome of Arcane Domination", value: "+34 Arcane Spell Power - Alterac Valley (Arcane BiS)" }),
    makeAlt(18602, { name: "Tome of Sacrifice", value: "+12 Stamina - Suppression" })
  ]),
  makeStep('59–60', 19309, {
    name: "Master Dragonslayer's Orb",
    stats: "+14 Intellect, +28 Spell Power",
    quality: "q4",
    detail: "Onyxia Head quest turn-in reward. Top-tier endgame caster focus."
  }, [
    makeAlt(234589, { name: "Grand Marshal's Tome of Power", faction: "alliance", value: "+24 Stamina, +13 Intellect, +25 Spell Power - PvP Rank 14" }),
    makeAlt(234563, { name: "High Warlord's Tome of Destruction", faction: "horde", value: "+24 Stamina, +13 Intellect, +25 Spell Power - PvP Rank 14" }),
    makeAlt(21597, { name: "Royal Scepter of Vek'lor", value: "+10 Stamina, +9 Intellect, +20 Spell Power, +14 Crit, +10 Hit - AQ40" })
  ])
];

// -------------------------------------------------------------
// 5. WARLOCK OFF-HANDS (Shadow & Fire Spell Power 1-60 Progression)
// -------------------------------------------------------------
const warlockOffhandLevels = [
  makeStep('1–9', 279898, {
    name: "Dwarven Tome",
    stats: "+1 Spirit, +3 Spell Power & Healing",
    faction: "alliance",
    detail: "Important Heirlooms quest reward (Loch Modan). First true early spell power off-hand."
  }, [
    makeAlt(15970, { name: "Native Branch", value: "+2 Intellect - Level 10 Drop" }),
    makeAlt(7507, { name: "Arcane Orb", value: "+2 Intellect, +1 Spirit - World drop" })
  ]),
  makeStep('10–14', 1172, {
    name: "Grayson's Torch",
    stats: "+4 Spirit",
    detail: "The Westfall Lighthouse / coastal quest. Reliable early stat stick."
  }, [
    makeAlt(284197, { name: "Nightglow Concoction", faction: "horde", value: "+4 Spirit - Silverpine / Barrens quest" })
  ]),
  makeStep('15–18', 273137, {
    name: "Skum's Bucket",
    stats: "+5 Intellect, +3 Stamina, On-Use: Restores 835 Mana",
    quality: "q3",
    detail: "Dropped by Skum in Wailing Caverns. Superb mana recovery for Life Tap pacing."
  }, [
    makeAlt(2879, { name: "Antipodean Rod", value: "+5 Intellect, +4 Spirit - Ashenvale quest" }),
    makeAlt(6341, { name: "Eerie Stable Lantern", value: "+4 Stamina - SFK Deathsworn Captain" })
  ]),
  makeStep('19–22', 6898, {
    name: "Orb of Soran'ruk",
    stats: "+6 Stamina, +6 Intellect",
    quality: "q3",
    detail: "The Orb of Soran'ruk (Level 20 Warlock Quest). Iconic class quest off-hand for early Life Tap."
  }, [
    makeAlt(1131, { name: "Totem of Infliction", faction: "alliance", value: "+4 Intellect, Shadow Strike Proc - Loch Modan" }),
    makeAlt(284668, { name: "Apothecary's Concoction", faction: "horde", value: "+4 Stamina, +3 Intellect - Barrens quest" })
  ]),
  makeStep('23–26', 16887, {
    name: "Witch's Finger",
    stats: "+4 Stamina, +8 Intellect, +7 Shadow Spell Power",
    faction: "horde",
    quality: "q3",
    detail: "Hillsbrad Foothills quest reward (Horde). Elite early Shadow Spell Power focus."
  }, [
    makeAlt(249395, { name: "Orb of Souls", value: "+6 Spirit, +13 Healing / Shadow Spell Power - Crafted" }),
    makeAlt(249394, { name: "Orb of Mystic Insight", value: "+6 Intellect, +7 Spell Power - Crafted" })
  ]),
  makeStep('27–30', 273027, {
    name: "Raptor's Gaze",
    stats: "+4 Stamina, +4 Intellect, +8 Spell Power & Healing",
    quality: "q3",
    detail: "Excavation Site: Wetlands (Shadetooth). Premier dungeon spell power focus."
  }, [
    makeAlt(4984, { name: "Skull of Impending Doom", value: "+60% Run Speed On-Use, breaks CC - Badlands quest" }),
    makeAlt(273052, { name: "Ponderous Orb", value: "+2 Intellect, +8 Spirit, +11 Spell Power - Dalaran" })
  ]),
  makeStep('31–34', 7685, {
    name: "Orb of the Forgotten Seer",
    stats: "+14 Spell Power & Healing",
    quality: "q3",
    detail: "Scarlet Monastery Library: Bloodmage Thalnos / Doan. Standard mid-game spell damage focus."
  }, [
    makeAlt(10770, { name: "Mordresh's Lifeless Skull", value: "+5 Spirit, +14 Fire Spell Power - Razorfen Downs" }),
    makeAlt(276897, { name: "A Lesson in Destruction", value: "+8 Stamina, +6 Spirit - World Drop" })
  ]),
  makeStep('35–38', 271805, {
    name: "Thrice-Damned Effigy",
    stats: "+4 Intellect, +7 Spirit, +2 Stamina, +10 Spell Power",
    faction: "horde",
    quality: "q3",
    detail: "Maraudon: Khan Jehn. Exceptional stat distribution for Affliction and Demonology."
  }, [
    makeAlt(10796, { name: "Umbral Crystal", value: "+11 Shadow Res, +7 Intellect - Rare World Drop" }),
    makeAlt(10770, { name: "Mordresh's Lifeless Skull", value: "+5 Spirit, +14 Fire Spell Power - RFD" })
  ]),
  makeStep('39–42', 277260, {
    name: "Researcher's Night Light",
    stats: "+12 Stamina, +7 Fire Spell Damage",
    quality: "q3",
    detail: "Greater Friend of the Library quest reward. Heavy stamina pool for Life Tap sustain."
  }, [
    makeAlt(282706, { name: "Rotting Meat", value: "+12 Stamina - World Drop" }),
    makeAlt(5028, { name: "Lord Sakrasis' Scepter", value: "+6 Intellect - Desolace" })
  ]),
  makeStep('43–46', 18762, {
    name: "Shard of the Green Flame",
    stats: "+10 Fire Spell Power, +8 Intellect",
    quality: "q3",
    detail: "Sunken Temple: Kroshius' Infernal Core (Warlock Class Quest). High Destruction fire power."
  }, [
    makeAlt(249455, { name: "Truesilver Conduit", value: "+8 Stamina, +8 Intellect, +10 Spell Power - Crafted" }),
    makeAlt(282088, { name: "Heart of Smoldar", value: "+8 Stamina, +14 Fire Spell Power - Burning Steppes" })
  ]),
  makeStep('47–50', 11904, {
    name: "Spirit of Aquementas",
    stats: "+21 Spell Power & Healing",
    quality: "q3",
    detail: "It's Dangerous to Go Alone quest reward in Un'Goro Crater (Linken chain). Premier spell power focus."
  }, [
    makeAlt(10844, { name: "Drakestone of the Shadow", value: "+21 Shadow Spell Power - Sunken Temple: Drakes" }),
    makeAlt(10842, { name: "Drakestone of the Fireflash", value: "+21 Fire Spell Power - Sunken Temple: Drakes" })
  ]),
  makeStep('51–54', 274417, {
    name: "Barkskin Baubles",
    stats: "+10 Stamina, +10 Spirit, +22 Healing & Spell Power",
    quality: "q3",
    detail: "Dropped by Dala Fairmaw. Outstanding survivability and Life Tap sustain."
  }, [
    makeAlt(16768, { name: "Furbolg Medicine Pouch", value: "+10 Stamina, On-Use 1000 HP Heal - Timbermaw Hold Friendly" }),
    makeAlt(271933, { name: "Insurgent's Manifesto", value: "+14 Stamina, +6 Intellect, +5 Spell Power" })
  ]),
  makeStep('55–58', 19309, {
    name: "Tome of Shadow Force",
    stats: "+34 Shadow Spell Power, +7 Stamina",
    quality: "q4",
    detail: "Alterac Valley (Stormpike / Frostwolf). Supreme Shadow Spell Power focus for Affliction."
  }, [
    makeAlt(18602, { name: "Tome of Sacrifice", value: "+12 Stamina - Suppression" }),
    makeAlt(19315, { name: "Therazane's Touch", value: "+29 Spell Power - Alterac Valley" }),
    makeAlt(19308, { name: "Tome of the Fiery Arcana", value: "+34 Fire Spell Power - Alterac Valley (Destro BiS)" })
  ]),
  makeStep('59–60', 19309, {
    name: "Master Dragonslayer's Orb",
    stats: "+14 Intellect, +28 Spell Power",
    quality: "q4",
    detail: "Onyxia Head quest turn-in reward. Top-tier endgame caster focus."
  }, [
    makeAlt(234563, { name: "High Warlord's Tome of Destruction", faction: "horde", value: "+24 Stamina, +13 Intellect, +25 Spell Power - PvP Rank 14" }),
    makeAlt(234589, { name: "Grand Marshal's Tome of Power", faction: "alliance", value: "+24 Stamina, +13 Intellect, +25 Spell Power - PvP Rank 14" }),
    makeAlt(21597, { name: "Royal Scepter of Vek'lor", value: "+10 Stamina, +9 Intellect, +20 Spell Power, +14 Crit, +10 Hit - AQ40" })
  ])
];

// -------------------------------------------------------------
// 6. PRIEST OFF-HANDS (Dual Track: Shadow/DPS vs Holy/Healing)
// -------------------------------------------------------------
const priestDpsOffhandLevels = warlockOffhandLevels;

const priestHealingOffhandLevels = [
  makeStep('1–10', 1172, {
    name: "Grayson's Torch",
    stats: "+4 Spirit",
    detail: "The Westfall Lighthouse quest. Provides crucial early Spirit mana regeneration."
  }, [
    makeAlt(279898, { name: "Dwarven Tome", faction: "alliance", value: "+1 Spirit, +3 Healing - Loch Modan" }),
    makeAlt(284197, { name: "Nightglow Concoction", faction: "horde", value: "+4 Spirit - Silverpine / Barrens quest" })
  ]),
  makeStep('11–16', 7344, {
    name: "Torch of Holy Flame",
    stats: "+6 Spirit, +4 Intellect",
    faction: "alliance",
    detail: "Duskwood: Morgan Ladimore quest chain. Outstanding Spirit and Intellect for low-level healing."
  }, [
    makeAlt(284196, { name: "Tear of Grief", value: "+3 Intellect - Early quest reward" }),
    makeAlt(15932, { name: "Disciple's Stein", value: "+2 Intellect, +1 Spirit - Level 7 Drop" })
  ]),
  makeStep('17–20', 273137, {
    name: "Skum's Bucket",
    stats: "+3 Stamina, +10 Healing, On-Use: Restores 835 Mana",
    quality: "q3",
    detail: "Wailing Caverns: Skum. Dedicated early healing power and on-use mana recovery."
  }, [
    makeAlt(2879, { name: "Antipodean Rod", value: "+5 Intellect, +4 Spirit - Ashenvale quest" }),
    makeAlt(281291, { name: "Mathystra Channeling Orb", value: "+4 Intellect, +3 Spirit - Darkshore quest" })
  ]),
  makeStep('21–25', 285348, {
    name: "Alliance Outrunner Healing Rod",
    stats: "+12 Healing, +4 Spirit",
    quality: "q3",
    detail: "Ashenvale quest reward (Hannah Bladeleaf). High early +Healing throughput focus."
  }, [
    makeAlt(2943, { name: "Eye of Paleth", value: "+6 Spirit, +4 Intellect, +9 Healing - Wetlands" }),
    makeAlt(249395, { name: "Orb of Souls", value: "+6 Spirit, +13 Healing - Crafted" })
  ]),
  makeStep('26–30', 273052, {
    name: "Ponderous Orb",
    stats: "+2 Intellect, +8 Spirit, +11 Healing & Spell Power",
    quality: "q3",
    detail: "Dalaran: Shade of the Archmage. Premier healing and mana regeneration focus."
  }, [
    makeAlt(276898, { name: "Salve and Salvation", value: "+9 Spirit, +50 Armor, +9 Healing - Past Due quest" }),
    makeAlt(273027, { name: "Raptor's Gaze", value: "+4 Intellect, +4 Stamina, +8 Healing - Wetlands" }),
    makeAlt(4984, { name: "Skull of Impending Doom", value: "+60% Run Speed On-Use, breaks CC - Badlands" })
  ]),
  makeStep('31–36', 11262, {
    name: "Orb of Lorica",
    stats: "+10 Intellect, +12 Healing, +6 Spell Power",
    faction: "alliance",
    quality: "q3",
    detail: "Desolace: In the Name of the Light quest reward. High mana pool and healing output."
  }, [
    makeAlt(7685, { name: "Orb of the Forgotten Seer", value: "+14 Healing & Spell Power - SM Library" }),
    makeAlt(10770, { name: "Mordresh's Lifeless Skull", value: "+5 Spirit, +14 Spell Power - RFD" })
  ]),
  makeStep('37–44', 9393, {
    name: "Beacon of Hope",
    stats: "+14 Healing, +8 Spell Power",
    quality: "q3",
    detail: "Uldaman: Ironaya / Archaedas. Unbeatable dedicated healing focus for the late 30s and 40s."
  }, [
    makeAlt(277259, { name: "Fermented Restoration Potion", value: "+12 Stamina, +5 Spirit, +16 Healing" }),
    makeAlt(271805, { name: "Thrice-Damned Effigy", value: "+4 Intellect, +7 Spirit, +10 Healing - Maraudon" })
  ]),
  makeStep('45–52', 249456, {
    name: "Twisting Essence Jar",
    stats: "+8 Stamina, +8 Spirit, +19 Healing",
    quality: "q3",
    detail: "Crafted by Enchanters / Tradeskills. Top-tier late-game +Healing and Spirit regeneration focus."
  }, [
    makeAlt(249455, { name: "Truesilver Conduit", value: "+8 Stamina, +8 Intellect, +10 Healing - Crafted" }),
    makeAlt(11904, { name: "Spirit of Aquementas", value: "+21 Healing & Spell Power - Un'Goro Linken quest" })
  ]),
  makeStep('53–58', 274417, {
    name: "Barkskin Baubles",
    stats: "+10 Stamina, +10 Spirit, +22 Healing",
    quality: "q3",
    detail: "Dropped by Dala Fairmaw. Outstanding survivability and healing throughput."
  }, [
    makeAlt(16768, { name: "Furbolg Medicine Pouch", value: "+10 Stamina, On-Use 1000 HP Heal - Timbermaw Hold Friendly" }),
    makeAlt(276336, { name: "Yashiro's Spirit Bead", value: "+12 Spirit - Level 60 Rare Drop" })
  ]),
  makeStep('59–60', 19312, {
    name: "Lei of the Lifegiver",
    stats: "+11 Stamina, +25 Healing, +12 Spell Power, +5 MP5",
    quality: "q4",
    detail: "Alterac Valley (Exalted). The premier pre-raid and raid healing off-hand with MP5."
  }, [
    makeAlt(18337, { name: "Brightly Glowing Stone", value: "+7 Intellect, +37 Healing - Dire Maul West (Illyanna Ravenoak)" }),
    makeAlt(19902, { name: "Jin'do's Bag of Whammies", value: "+11 Intellect, +6 Stamina, +18 Healing, +1% Spell Hit - Zul'Gurub" }),
    makeAlt(234590, { name: "Grand Marshal's Tome of Restoration", faction: "alliance", value: "+23 Stamina, +14 Intellect, +35 Healing - PvP Rank 14" }),
    makeAlt(234564, { name: "High Warlord's Tome of Mending", faction: "horde", value: "+23 Stamina, +14 Intellect, +35 Healing - PvP Rank 14" })
  ])
];

// -------------------------------------------------------------
// 7. DRUID OFF-HANDS (Dual Track: Balance/Feral vs Restoration)
// -------------------------------------------------------------
const druidDpsOffhandLevels = mageOffhandLevels;
const druidHealingOffhandLevels = priestHealingOffhandLevels;

// Assemble full master offhands payload
const fullOffhandsData = {
  warrior: {
    role: "Tank",
    tracks: [{ id: "primary", name: "🛡️ Shield Progression (Protection & Tanking)" }],
    levels: warriorShieldLevels
  },
  paladin: {
    role: "Hybrid",
    tracks: [
      { id: "primary", name: "🛡️ Tanking & Leveling Shields (Protection)" },
      { id: "healer", name: "💚 Holy Healing Shields (Holy & +Healing)" }
    ],
    levels: paladinTankingShieldLevels,
    healingLevels: paladinHealingShieldLevels
  },
  shaman: {
    role: "Hybrid",
    tracks: [
      { id: "primary", name: "🛡️ Elemental & Tanking Shields" },
      { id: "healer", name: "💚 Restoration Healing Shields" }
    ],
    levels: shamanElementalShieldLevels,
    healingLevels: shamanRestorationShieldLevels
  },
  mage: {
    role: "Caster",
    tracks: [{ id: "primary", name: "🔮 Spell Power & Elemental Off-Hands" }],
    levels: mageOffhandLevels
  },
  warlock: {
    role: "Caster",
    tracks: [{ id: "primary", name: "🔥 Shadow & Fire Spell Power Off-Hands" }],
    levels: warlockOffhandLevels
  },
  priest: {
    role: "Caster",
    tracks: [
      { id: "primary", name: "🔮 Shadow & Damage Off-Hands" },
      { id: "healer", name: "💚 Holy & Discipline Healing Off-Hands" }
    ],
    levels: priestDpsOffhandLevels,
    healingLevels: priestHealingOffhandLevels
  },
  druid: {
    role: "Hybrid",
    tracks: [
      { id: "primary", name: "🔮 Balance & Feral Off-Hands / Idols" },
      { id: "healer", name: "💚 Restoration Healing Off-Hands" }
    ],
    levels: druidDpsOffhandLevels,
    healingLevels: druidHealingOffhandLevels
  }
};

fs.writeFileSync(outOffhandsPath, JSON.stringify(fullOffhandsData, null, 2), 'utf8');
console.log(`[Master Pipeline] Successfully generated and wrote ${outOffhandsPath}!`);

// Tally counts
for (const cls in fullOffhandsData) {
  const d = fullOffhandsData[cls];
  let itemsCount = 0;
  const uniqueIds = new Set();
  [d.levels, d.healingLevels].filter(Boolean).forEach(set => {
    set.forEach(l => {
      if (l.itemId) uniqueIds.add(l.itemId);
      itemsCount += 1 + (l.alts?.length || 0);
      (l.alts || []).forEach(a => { if (a.itemId) uniqueIds.add(a.itemId); });
    });
  });
  console.log(`✓ ${cls.padEnd(8)}: ${d.levels.length} primary brackets (heal: ${d.healingLevels?.length || 0}), ${itemsCount} total items (${uniqueIds.size} unique items)`);
}
