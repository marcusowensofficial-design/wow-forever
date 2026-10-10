/**
 * World of Warcraft: Forever - Data Ingestion Compiler
 * Compiles raw scraped markdown outputs into structured JSON datasets in /data
 * and generates the browser-ready js/data/atlas-data.js bundle.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_DIR = path.resolve(__dirname, '../data');
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// 1. Compile 34 World Rares
const WORLD_RARES = [
  {
    id: "nightveiled-rotheap",
    name: "Nightveiled Rotheap",
    zone: "Wetlands",
    level: 32,
    elite: true,
    macro: "/target Nightveiled Rotheap",
    coords: "19.6, 43.4 (Patrols coast & river at night)",
    respawn: "5 to 30 min (Night only, server time)",
    lore: "Comes out of the sea on the west coast, then walks up the main river toward the dam. Two or three can be up at once.",
    drops: [
      { name: "Rotheap Innards", type: "Quest Item", desc: "Every member of party loots one; trade to Rethiel the Greenwarden (56.2, 40.5) for Malignant Root." },
      { name: "Malignant Root", type: "Finger (iLvl 32)", stats: "+7 Stamina, +8 Attack Power, +4 Spell Power" }
    ]
  },
  {
    id: "heartrazor",
    name: "Heartrazor",
    zone: "Thousand Needles",
    level: 31,
    elite: true,
    macro: "/target Heartrazor",
    coords: "15.8, 41.2 (Highperch Cliffs)",
    respawn: "5 to 8 hours",
    lore: "Wyvern that patrols Highperch on the western cliffs. Hits hard with deadly poisons.",
    drops: [
      { name: "Wyvern Heart Band", type: "Finger (iLvl 34)", stats: "+5 Agility, +5 Stamina, +15 Attack Power" }
    ]
  },
  {
    id: "humar-the-pridelord",
    name: "Humar the Pridelord",
    zone: "The Barrens",
    level: 23,
    elite: true,
    tameable: "Cat (1.30s attack speed)",
    macro: "/target Humar the Pridelord",
    coords: "61.0, 35.0 (North of Ratchet)",
    respawn: "8 to 12 hours",
    lore: "The legendary black lion resting under the grand acacia tree north of Ratchet.",
    drops: [
      { name: "Mark of the Pack Leader", type: "Neck (iLvl 25) - Blessing of Kalimdor Set (1/3)", stats: "+5 Strength, +5 Intellect. (2) Set: +5% Movement Speed in Barrens & Stonetalon." }
    ]
  },
  {
    id: "swiftmane",
    name: "Swiftmane",
    zone: "The Barrens",
    level: 20,
    elite: false,
    macro: "/target Swiftmane",
    coords: "60.4, 33.0 (Plateau north of Ratchet)",
    respawn: "4 to 6 hours",
    lore: "A majestic zhevra galloping along the savannah ridges north of Ratchet.",
    drops: [
      { name: "Signet of the Zhevra", type: "Finger (iLvl 23) - Blessing of Kalimdor Set (2/3)", stats: "+6 Agility, +2 Spirit. (2) Set: +5% Movement Speed in Barrens & Stonetalon." }
    ]
  },
  {
    id: "takk-the-leaper",
    name: "Takk the Leaper",
    zone: "The Barrens",
    level: 19,
    elite: false,
    tameable: "Raptor",
    macro: "/target Takk the Leaper",
    coords: "60.4, 9.4 (Northern Barrens)",
    respawn: "6 to 8 hours",
    lore: "High-speed sprinting raptor roaming the northern brush near the Sludge Fen.",
    drops: [
      { name: "Raptor Hide Cloak", type: "Back (iLvl 21) - Blessing of Kalimdor Set (3/3)", stats: "19 Armor, +4 Stamina, +3 Spirit. (2) Set: +5% Movement Speed in Barrens & Stonetalon." }
    ]
  },
  {
    id: "alliance-outrunners",
    name: "Alliance Outrunners (Aean Swiftriver)",
    zone: "The Barrens",
    level: 25,
    elite: true,
    macro: "/target Aean Swiftriver",
    coords: "48.5, 79.7 to 45.4, 41.4 (Southern Road)",
    respawn: "1 to 2 hours",
    lore: "Four mounted Alliance scouts (Aean Swiftriver, Thora Feathermoon, Hannah Bladeleaf, Marcus Bel) patrolling the Southern Gold Road.",
    drops: [
      { name: "Alliance Outrunner Bow", type: "Ranged Bow (iLvl 27)", stats: "13.3 DPS, +4 Agi, +3 Spi" },
      { name: "Alliance Outrunner's Sword", type: "1H Sword (iLvl 27)", stats: "17.1 DPS, +5 Agi, +6 AP" },
      { name: "Alliance Outrunner Healing Rod", type: "Off-Hand (iLvl 26)", stats: "+8 HP Regen, +12 Healing, +4 Spell Dmg" },
      { name: "Alliance Outrunner Staff", type: "2H Staff (iLvl 26)", stats: "16.2 DPS, +9 Sta, +9 Spi, +28 Spell Power" }
    ]
  },
  {
    id: "taskmaster-whipfang",
    name: "Taskmaster Whipfang",
    zone: "Stonetalon Mountains",
    level: 22,
    elite: false,
    macro: "/target Taskmaster Whipfang",
    coords: "63.0, 53.0 (Windshear Crag)",
    respawn: "2 to 4 hours",
    lore: "Venture Co. taskmaster patrolling the machinery at Windshear Crag.",
    drops: [
      { name: "Whipfang's Skinsearer", type: "1H Dagger (iLvl 24)", stats: "15.6 DPS, Chance on hit: 67-101 Fire Damage" }
    ]
  },
  {
    id: "foreman-rigger",
    name: "Foreman Rigger",
    zone: "Stonetalon Mountains",
    level: 24,
    elite: false,
    macro: "/target Foreman Rigger",
    coords: "65.2, 52.8 (Windshear Crag)",
    respawn: "2 to 4 hours",
    lore: "Overseeing Venture Co. logging camp in eastern Stonetalon Mountains.",
    drops: [
      { name: "Foreman's Helm", type: "Head Mail (iLvl 26)", stats: "166 Armor, +9 Stamina, +8 Strength, +5 Mining Skill" }
    ]
  },
  {
    id: "drozem-the-blasphemous",
    name: "Dro'zem the Blasphemous",
    zone: "Redridge Mountains",
    level: 23,
    elite: false,
    macro: "/target Dro'zem the Blasphemous",
    coords: "74.4, 82.2 (Render's Valley) / 63.0, 43.0",
    respawn: "2 to 3 hours",
    lore: "Dark orc warlock turning up in Render's Valley and Stonewatch Keep.",
    drops: [
      { name: "Dro'zem's Tunic", type: "Chest Cloth (iLvl 25)", stats: "43 Armor, +9 Intellect, +11 Spell Power" }
    ]
  },
  {
    id: "elmpaw",
    name: "Elmpaw",
    zone: "Elwynn Forest",
    level: 10,
    elite: false,
    tameable: "Bear",
    macro: "/target Elmpaw",
    coords: "81.6, 85.4 (Ridgepoint Tower) / 75.0, 38.4",
    respawn: "45 to 60 min",
    lore: "Massive black bear with over 800 health roaming south of Ridgepoint Tower.",
    drops: [
      { name: "Elmpaw's Head", type: "Quest Item", desc: "Starts quest: Helene Peltskinner in Goldshire for 840 XP, 3s 50c, +100 Stormwind Rep." }
    ]
  },
  {
    id: "baron-marinous",
    name: "Baron Marinous",
    zone: "Darkshore",
    level: 21,
    elite: true,
    macro: "/target Baron Marinous",
    coords: "59.2, 22.6 (Mathystral Ruins)",
    respawn: "Summoned via Fathom Stone",
    lore: "Summoned elemental of 2,400 health by combining 20 Mathystral Amulet Fragments at the Fathom Stone.",
    drops: [
      { name: "Mathystral Amulet", type: "Accessory / Quest", stats: "Summons Baron Marinous; unlocks Clouded Water Globe quest." }
    ]
  },
  {
    id: "lordaeron-captain",
    name: "Lordaeron Captain",
    zone: "Ruins of Lordaeron (Dungeon)",
    level: 23,
    elite: true,
    macro: "/target Lordaeron Captain",
    coords: "Northwest courtyard inside instance",
    respawn: "Rare instance spawn",
    lore: "Skeletal captain patrolling the northwest courtyard with Skeletal Soldiers.",
    drops: [
      { name: "Haunting Blade", type: "2H Sword (iLvl 27)", stats: "22.4 DPS, 3.80 Speed, +33 Healing, +11 Spell Damage" }
    ]
  },
  {
    id: "mystmane",
    name: "Mystmane",
    zone: "Zephras Isle",
    level: 8,
    elite: false,
    tameable: "Bear (1.60s attack speed - Fastest Bear)",
    macro: "/target Mystmane",
    coords: "60.2, 34.6 (Shadowgale Forest)",
    respawn: "45 min",
    lore: "Fastest-attacking bear in the entire game (1.6s swing speed), native to Zephras Isle.",
    drops: [
      { name: "Mystmane Claws", type: "Junk / Crafting", stats: "High-value starter trade item" }
    ]
  },
  {
    id: "ghostfang",
    name: "Ghostfang",
    zone: "Dun Morogh",
    level: 11,
    elite: false,
    tameable: "Cat (White Sabercat)",
    macro: "/target Ghostfang",
    coords: "74.2, 63.2 (Tunnel hills toward Wetlands)",
    respawn: "30 min",
    lore: "Stealthed white mountain cat stalking the snowy hills near the Wetlands pass.",
    drops: [
      { name: "Ghostfang Pelt", type: "Leather / Quest", stats: "Rare white fur" }
    ]
  },
  {
    id: "coldrasp",
    name: "Coldrasp",
    zone: "Tirisfal Glades",
    level: 11,
    elite: false,
    tameable: "Wolf (Blue Ghost Wolf with Furious Howl)",
    macro: "/target Coldrasp",
    coords: "19.7, 65.6 (Whispering Forest)",
    respawn: "2 to 3 hours",
    lore: "A striking blue ghost wolf roaming the ethereal Whispering Forest west of Deathknell.",
    drops: [
      { name: "Coldrasp Fang", type: "Unique Trophy", stats: "Prized trophy" }
    ]
  },
  {
    id: "shalma",
    name: "Shal'ma",
    zone: "Durotar",
    level: 9,
    elite: false,
    tameable: "Cat (Cheetah 1.30s)",
    macro: "/target Shal'ma",
    coords: "59.8, 91.0 (Kolkar Crags)",
    respawn: "1 hour",
    lore: "Fast 1.3s attack speed cheetah prowling the ridges south of Sen'jin Village.",
    drops: [
      { name: "Kolkar Trophy Claws", type: "Trophy", stats: "Valuable beginner weapon vendor drop" }
    ]
  },
  {
    id: "dishu",
    name: "Dishu",
    zone: "The Barrens",
    level: 13,
    elite: false,
    tameable: "Cat (Cheetah 1.30s)",
    macro: "/target Dishu",
    coords: "48.2, 16.4 (Lushwater Plains)",
    respawn: "2 to 4 hours",
    lore: "Fastest-attacking starter cheetah roaming the western Barrens savannas.",
    drops: [
      { name: "Pelt of Dishu", type: "Leather / Quest", stats: "High quality spotted cheetah pelt" }
    ]
  },
  {
    id: "gesharahan",
    name: "Gesharahan",
    zone: "The Barrens",
    level: 20,
    elite: true,
    macro: "/target Gesharahan",
    coords: "46.8, 38.6 (The Stagnant Oasis)",
    respawn: "Summoned via Altered Snapvine",
    lore: "Vicious hydra lurking beneath the murky depths of the Stagnant Oasis.",
    drops: [
      { name: "Gesharahan's Scale", type: "Quest Item", desc: "Turns in to Tonga Runetotem for 1,250 XP and +100 Thunder Bluff rep" }
    ]
  },
  {
    id: "sludge-beast",
    name: "Sludge Beast",
    zone: "The Barrens",
    level: 21,
    elite: false,
    macro: "/target Sludge Beast",
    coords: "57.0, 9.6 (The Sludge Fen)",
    respawn: "2 to 3 hours",
    lore: "Toxic chemical ooze crawling in the Venture Co. oil runoff pool.",
    drops: [
      { name: "Ooze-Covered Bag", type: "10-Slot Bag", stats: "Portable storage pouch" }
    ]
  },
  {
    id: "brood-mother-araxx",
    name: "Brood Mother Araxx",
    zone: "The Barrens",
    level: 17,
    elite: false,
    tameable: "Spider",
    macro: "/target Brood Mother Araxx",
    coords: "43.6, 17.2 (Dry Hills)",
    respawn: "1 to 2 hours",
    lore: "Giant black widow nesting inside the spider crags in northwest Barrens.",
    drops: [
      { name: "Araxx's Web Sac", type: "Crafting / Off-Hand", stats: "Produces 3-4 Shadow Silk" }
    ]
  },
  {
    id: "rathorian",
    name: "Rathorian",
    zone: "Ashenvale",
    level: 31,
    elite: true,
    macro: "/target Rathorian",
    coords: "84.4, 69.8 (Demon Fall Canyon)",
    respawn: "4 to 6 hours",
    lore: "Demonic satyr commander guarding the canyon of Mannoroth's demise.",
    drops: [
      { name: "Horn of Rathorian", type: "Quest Item / Trinket", stats: "Starts Demonic Deception questline" }
    ]
  },
  {
    id: "terrowulf-packlord",
    name: "Terrowulf Packlord",
    zone: "Ashenvale",
    level: 28,
    elite: false,
    tameable: "Wolf",
    macro: "/target Terrowulf Packlord",
    coords: "38.2, 54.6 (Iris Lake)",
    respawn: "2 to 3 hours",
    lore: "Alpha shadow-worg pacing the dense woods south of Iris Lake.",
    drops: [
      { name: "Packlord's Fang", type: "1H Dagger (iLvl 30)", stats: "14.2 DPS, +3 Agility, +5 AP" }
    ]
  },
  {
    id: "ursollok",
    name: "Ursol'lok",
    zone: "Ashenvale",
    level: 31,
    elite: false,
    tameable: "Bear",
    macro: "/target Ursol'lok",
    coords: "82.6, 52.2 (Splintertree Woodlands)",
    respawn: "3 to 4 hours",
    lore: "Venerable corrupted furbolg elder bear roaming east Ashenvale.",
    drops: [
      { name: "Ursol'lok's Claws", type: "Fist Weapon (iLvl 33)", stats: "15.8 DPS, +6 Strength, +4 Stamina" }
    ]
  },
  {
    id: "mugglefin",
    name: "Mugglefin",
    zone: "Darkshore",
    level: 16,
    elite: false,
    macro: "/target Mugglefin",
    coords: "56.4, 9.2 (Ruins of Welvar)",
    respawn: "1 to 2 hours",
    lore: "Greenscale murloc warlord raiding along the Northern coast of Darkshore.",
    drops: [
      { name: "Mugglefin's Trident", type: "Polearm (iLvl 18)", stats: "11.2 DPS, +3 Agility, +2 Spirit" }
    ]
  },
  {
    id: "strider-clutchmother",
    name: "Strider Clutchmother",
    zone: "Darkshore",
    level: 20,
    elite: false,
    tameable: "Tallstrider",
    macro: "/target Strider Clutchmother",
    coords: "37.6, 82.2 (Grove of the Ancients)",
    respawn: "2 hours",
    lore: "Mother tallstrider nesting near the borders of Ashenvale.",
    drops: [
      { name: "Clutchmother's Feather", type: "Off-Hand (iLvl 22)", stats: "+4 Agility, +3 Spirit" }
    ]
  },
  {
    id: "carnivous-the-breaker",
    name: "Carnivous the Breaker",
    zone: "Darkshore",
    level: 16,
    elite: false,
    tameable: "Bear",
    macro: "/target Carnivous the Breaker",
    coords: "38.4, 86.8 (Cliffspring River)",
    respawn: "1 to 2 hours",
    lore: "Diseased thistle bear prowling along the riverbank.",
    drops: [
      { name: "Bear-Leather Bracers", type: "Wrist, Leather (iLvl 18)", stats: "+3 Stamina, +2 Strength" }
    ]
  },
  {
    id: "lord-malathrom",
    name: "Lord Malathrom",
    zone: "Duskwood",
    level: 31,
    elite: true,
    macro: "/target Lord Malathrom",
    coords: "17.8, 29.4 (Addle's Stead)",
    respawn: "4 to 6 hours",
    lore: "Spectral necromancer roaming the misty crypts of western Duskwood.",
    drops: [
      { name: "Malathrom's Grimoire", type: "Off-Hand (iLvl 34)", stats: "+6 Intellect, +5 Spirit, +9 Spell Damage" }
    ]
  },
  {
    id: "naraxis",
    name: "Naraxis",
    zone: "Duskwood",
    level: 27,
    elite: false,
    tameable: "Spider",
    macro: "/target Naraxis",
    coords: "86.8, 48.6 (Vul'Gol Ogre Mound)",
    respawn: "2 to 3 hours",
    lore: "Massive green weaver spider lurking at the mouth of Vul'Gol Mound.",
    drops: [
      { name: "Naraxis' Fang", type: "1H Dagger (iLvl 29)", stats: "14.1 DPS, Chance on hit: 45 Poison damage over 15s" }
    ]
  },
  {
    id: "lupos",
    name: "Lupos",
    zone: "Duskwood",
    level: 23,
    elite: false,
    tameable: "Wolf (Shadow Damage swings)",
    macro: "/target Lupos",
    coords: "22.4, 25.2 (The Darkened Bank)",
    respawn: "4 to 6 hours",
    lore: "Ghostly white wolf that inflicts direct Shadow Damage bypassing physical armor.",
    drops: [
      { name: "Lupos' Whisper", type: "Neck (iLvl 25)", stats: "+4 Agility, +5 Stamina" }
    ]
  },
  {
    id: "nefaru",
    name: "Nefaru",
    zone: "Duskwood",
    level: 30,
    elite: false,
    macro: "/target Nefaru",
    coords: "72.8, 76.4 (Roland's Doom)",
    respawn: "2 to 4 hours",
    lore: "Feral worgen pack leader lurking in the Roland's Doom copper mine.",
    drops: [
      { name: "Nefaru's Pauldrons", type: "Shoulder, Mail (iLvl 32)", stats: "+7 Strength, +5 Stamina" }
    ]
  },
  {
    id: "vultros",
    name: "Vultros",
    zone: "Westfall",
    level: 26,
    elite: false,
    tameable: "Carrion Bird",
    macro: "/target Vultros",
    coords: "53.4, 52.8 (Furlbrow's Pumpkin Farm)",
    respawn: "1 to 2 hours",
    lore: "Giant red carrion bird circling over Furlbrow's Pumpkin Farm.",
    drops: [
      { name: "Vultros' Claw", type: "1H Dagger (iLvl 28)", stats: "13.6 DPS, +4 Agility, +2 Stamina" }
    ]
  },
  {
    id: "slark",
    name: "Slark",
    zone: "Westfall",
    level: 15,
    elite: false,
    macro: "/target Slark",
    coords: "36.2, 33.8 (Coast of Westfall)",
    respawn: "45 min",
    lore: "Tidehunter murloc chieftain guarding his shoreline clan.",
    drops: [
      { name: "Slark's Shell Shield", type: "Shield (iLvl 17)", stats: "Block 14, +2 Stamina, +2 Strength" }
    ]
  },
  {
    id: "miner-johnson",
    name: "Miner Johnson",
    zone: "The Deadmines (Dungeon)",
    level: 19,
    elite: true,
    macro: "/target Miner Johnson",
    coords: "Ironclad Cove upper scaffolding",
    respawn: "Rare instance spawn",
    lore: "Undead dwarf miner hiding in the forgotten shafts of the Deadmines.",
    drops: [
      { name: "Miner's Hat of the Deep", type: "Head, Cloth (iLvl 21)", stats: "+4 Int, +3 Spi, Equip: Light source" }
    ]
  },
  {
    id: "shanda-the-spinner",
    name: "Shanda the Spinner",
    zone: "Loch Modan",
    level: 19,
    elite: false,
    tameable: "Spider",
    macro: "/target Shanda the Spinner",
    coords: "79.4, 61.2 (Valley of Kings)",
    respawn: "1 to 2 hours",
    lore: "Venomous cliff spider stalking the rocks between Loch Modan and Badlands.",
    drops: [
      { name: "Spinner's Silk Cord", type: "Waist, Cloth (iLvl 21)", stats: "+4 Intellect, +3 Spirit, +5 Spell Power" }
    ]
  }
];

// 2. Compile 40 Library Books & Rewards
const LIBRARY_BOOKS_DATA = {
  rewards: [
    {
      threshold: 10,
      title: "Friend of the Library (Necklace Choice)",
      req: "10 Unique Books",
      items: [
        { name: "Scholarly Pendant", slot: "Neck (iLvl 23)", stats: "+3 Stamina, +2 Spirit", icon: "https://foreverchanges.pro/icon/inv_jewelry_necklace_11.jpg" },
        { name: "Erudite's Amulet", slot: "Neck (iLvl 23)", stats: "+2 Agility, +3 Stamina", icon: "https://foreverchanges.pro/icon/inv_jewelry_necklace_01.jpg" }
      ]
    },
    {
      threshold: 20,
      title: "Greater Friend of the Library (Ring Choice)",
      req: "20 Unique Books (Level 20+)",
      items: [
        { name: "Philanthropist's Ring", slot: "Finger (iLvl 35)", stats: "+5 Intellect, Equip: +10 Spell Damage and Healing", icon: "https://foreverchanges.pro/icon/inv_jewelry_ring_14.jpg" },
        { name: "Field Researcher's Loop", slot: "Finger (iLvl 35)", stats: "+7 Agility, +7 Stamina", icon: "https://foreverchanges.pro/icon/inv_jewelry_ring_02.jpg" }
      ]
    },
    {
      threshold: 25,
      title: "Master Scholar of Azeroth (Weapon Choice)",
      req: "25 Unique Books (Level 30+ / Req Lvl 40)",
      items: [
        { name: "Truthseeker's Bow", slot: "Ranged Bow (iLvl 45)", stats: "23.8 DPS, +7 Agility, +3 Stamina (Req Level 40)", icon: "https://foreverchanges.pro/icon/inv_weapon_bow_01.jpg" },
        { name: "Crest of Elucidation", slot: "Off-Hand Shield (iLvl 45)", stats: "+12 Spirit, +11 Healing, +4 Spell Damage (Req Level 40)", icon: "https://foreverchanges.pro/icon/spell_holy_powerwordshield.jpg" },
        { name: "Researcher's Night Light", slot: "Off-Hand (iLvl 45)", stats: "+12 Stamina, +7 Fire Spell Damage (Req Level 40)", icon: "https://foreverchanges.pro/icon/inv_torch_lit.jpg" }
      ]
    }
  ],
  librarians: {
    alliance: { name: "Garion Wendell", location: "Mage Quarter, Stormwind City (37.6, 80.8)" },
    horde: { name: "Owen Thadd", location: "Magic Quarter, Undercity (73.4, 33.0)" }
  },
  books: [
    { id: "book-01", name: "Archmage Theocritus' Research Journal", zone: "Elwynn Forest", coords: "65.4, 70.1 (Tower of Azora)", set: 1, desc: "Research notes from the Tower of Azora." },
    { id: "book-02", name: "Archmage Antonidas: The Unabridged Autobiography", zone: "Ironforge", coords: "75.7, 10.5 (Hall of Explorers)", set: 1, desc: "Somewhat self-indulgent autobiography. Horde players can loot it too." },
    { id: "book-03", name: "Bewitchments and Glamours", zone: "Westfall", coords: "45.4, 70.4 (Moonbrook Schoolhouse)", set: 1, desc: "Spells for manipulation and deception." },
    { id: "book-04", name: "Rumi of Gnomeregan: The Collected Works", zone: "Westfall / Loch Modan", coords: "52.7, 53.8 (Sentinel Hill) or 35.6, 48.9", set: 1, desc: "The writings of a notable Gnome mage." },
    { id: "book-05", name: "Crimes Against Anatomy", zone: "Duskwood", coords: "16.6, 28.5 (Darkened Bank Catacombs)", set: 1, desc: "Written by Doctor Krastinov inside the catacomb end room." },
    { id: "book-06", name: "Runes of the Sorcerer-Kings", zone: "Loch Modan", coords: "77.4, 14.0 (Mo'grosh Stronghold)", set: 1, desc: "A relic of the mighty ogre empires of Draenor." },
    { id: "book-07", name: "Goaz Scrolls", zone: "Wetlands", coords: "33.6, 47.9 (Whelgar's Excavation Site)", set: 1, desc: "Written in lost Titan script." },
    { id: "book-08", name: "The Dalaran Digest, Vol. 23", zone: "Silverpine Forest", coords: "63.5, 63.1 (Ambermill)", set: 1, desc: "Arcane research of the Kirin Tor." },
    { id: "book-09", name: "The Apothecary's Metaphysical Primer", zone: "Tirisfal Glades", coords: "59.4, 52.3 (Brill Gallows)", set: 1, desc: "Notes on arcane theory by Archmage Rotwick." },
    { id: "book-10", name: "Nar'thalas Almanac, Vol. 74", zone: "Darkshore", coords: "59.8, 22.3 (Ruins of Mathystra)", set: 1, desc: "Arcane research of the ancient quel'dorei." },
    { id: "book-11", name: "Arcanic Systems Manual", zone: "The Barrens", coords: "56.3, 8.8 (The Sludge Fen)", set: 1, desc: "Poorly-organized troubleshooting tips for goblin technology." },
    { id: "book-12", name: "Baxtan: On Destructive Magics", zone: "The Barrens", coords: "62.7, 36.3 (Ratchet)", set: 1, desc: "The writings of a notable Goblin mage." },
    { id: "book-13", name: "Secrets of the Dreamers", zone: "The Barrens", coords: "46.0, 36.5 (Lushwater Oasis / Cavern of Mists)", set: 1, desc: "Observations on the Emerald Dream inside the Wailing Caverns cave." },
    { id: "book-14", name: "Fury of the Land", zone: "Stonetalon Mountains", coords: "74.4, 85.7 (Grimtotem Post)", set: 1, desc: "Closely guarded shamanistic secrets of the Grimtotem clan." },
    { id: "book-15", name: "The Lessons of Ta'zo", zone: "Orgrimmar", coords: "38.7, 78.4 (Valley of Spirits Mural)", set: 1, desc: "Etchings written by a great Troll mage." },
    { id: "book-16", name: "Basilisks: Should Petrification be Feared?", zone: "Stranglethorn Vale", coords: "41.4, 50.9 (Crystalvein Mine platform)", set: 2, desc: "Research notes on basilisk reagents outside the mine mouth." },
    { id: "book-17", name: "Geomancy: The Stone-Cold Truth", zone: "Thousand Needles", coords: "34.4, 40.1 (Darkcloud Pinnacle hut)", set: 2, desc: "Theories on the origin and usage of elemental magic." },
    { id: "book-18", name: "Defensive Magics 101", zone: "Alterac Mountains", coords: "48.4, 57.6 (Gallows' Corner Tower)", set: 2, desc: "Introductory guide to defensive barriers inside the ogre fortress tower." },
    { id: "book-19", name: "RwlRwlRwlRwl!", zone: "Dustwallow Marsh", coords: "57.2, 20.8 (Witch Hill murloc camp)", set: 2, desc: "Waterlogged book on the ground at the eastern edge of the murloc camp." },
    { id: "book-20", name: "A Web of Lies: Debunking Myths and Legends", zone: "Arathi Highlands", coords: "73.6, 65.2 (Witherbark Village)", set: 3, desc: "An incomplete thesis claiming spiders are harmless." },
    { id: "book-21", name: "Demons and You", zone: "Desolace", coords: "55.1, 26.2 (Thunder Axe Fortress)", set: 3, desc: "Inside the large building on a bench against the wall." },
    { id: "book-22", name: "Mummies: A Guide to the Unsavory Undead", zone: "Badlands", coords: "56.7, 39.9 (Mirage Flats)", set: 3, desc: "Tales frightening enough to scare hardy warriors." },
    { id: "book-23", name: "Sanguine Sorcery", zone: "Swamp of Sorrows", coords: "70.0, 51.0 (Pool of Tears / Sunken Temple roof)", set: 3, desc: "Outlines powerful blood rituals on top of the Sunken Temple exterior." },
    { id: "book-24", name: "Legends of the Tidesages", zone: "Tanaris", coords: "72.7, 47.8 (Lost Rigger Cove)", set: 3, desc: "Covered in notes scrawled by an unsteady hand." },
    { id: "book-25", name: "Stonewrought Design", zone: "Burning Steppes", coords: "29.0, 28.9 (Blackrock Mountain Tomb)", set: 3, desc: "On the altar of Franclorn Forgewright's tomb in Blackrock Mountain." },
    { id: "book-26", name: "Northern Kalimdor - A Comprehensive Guide", zone: "Felwood", coords: "65.2, 3.3 (Timbermaw Hold Tunnel)", set: 3, desc: "In the tunnel between Felwood and Winterspring." },
    { id: "book-27", name: "Necromancy 101", zone: "Western Plaguelands", coords: "69.4, 72.8 (Caer Darrow Scholomance keep)", set: 3, desc: "On a table in the ruined keep of Caer Darrow outside the dungeon." },
    { id: "book-28", name: "A Study of the Light", zone: "Eastern Plaguelands", coords: "71.8, 48.2 (Light's Hope Chapel)", set: 3, desc: "Teachings of the Light inside the chapel building." },
    { id: "book-29", name: "The Knight and the Lady", zone: "Eastern Plaguelands", coords: "54.4, 51.1 (Corin's Crossing)", set: 3, desc: "In a small house by the lake." },
    { id: "book-30", name: "Ka-Boom!", zone: "Winterspring", coords: "60.7, 37.7 (Everlook Alchemy shop)", set: 3, desc: "On a shelf behind the alchemy supplier in Everlook." },
    { id: "book-31", name: "The Founding of Ironforge", zone: "Loch Modan", coords: "46.2, 13.8 (Algaz Gate Library)", set: 4, desc: "Architectural blueprints and clan pacts from the construction of Ironforge." },
    { id: "book-32", name: "Legends of the Gurubashi", zone: "Duskwood", coords: "78.4, 34.6 (Beggar's Haunt)", set: 4, desc: "Chronicles of the ancient Jungle Troll empire and the avatar of Hakkar." },
    { id: "book-33", name: "The Seven Kingdoms", zone: "Hillsbrad Foothills", coords: "51.2, 58.6 (Southshore Town Hall)", set: 4, desc: "Political history and diplomatic accords of Arathor's successor states." },
    { id: "book-34", name: "The Scourge of Lordaeron", zone: "Silverpine Forest", coords: "43.8, 40.2 (Pyrewood Village Town Hall)", set: 4, desc: "Eyewitness testimonies from the fall of Stratholme and the plague grain." },
    { id: "book-35", name: "The Sunken Temple of Atal'Hakkar", zone: "Swamp of Sorrows", coords: "67.2, 48.4 (Sunken Temple Outer Balcony)", set: 4, desc: "Warnings of the Green Dragonflight wardens containing Hakkar's nightmare." },
    { id: "book-36", name: "Rise of the Horde", zone: "Stonetalon Mountains", coords: "48.6, 61.2 (Sun Rock Retreat)", set: 4, desc: "Firsthand orc accounts of the crossing through the Dark Portal." },
    { id: "book-37", name: "The Old Gods and the Ordering of Azeroth", zone: "Ashenvale", coords: "74.2, 60.8 (Forest Song Ruins)", set: 4, desc: "Titan archives detailing the imprisonment of C'Thun and Yogg-Saron." },
    { id: "book-38", name: "War of the Ancients: The Well of Eternity", zone: "Darkshore", coords: "37.2, 43.6 (Ruins of Mathystra)", set: 4, desc: "Highborne scrolls describing the Burning Legion's first invasion ten thousand years ago." },
    { id: "book-39", name: "The Scepter of the Shifting Sands", zone: "Thousand Needles", coords: "28.4, 76.2 (Mirage Raceway)", set: 4, desc: "Bronze Dragonflight lore detailing the seal placed upon Ahn'Qiraj." },
    { id: "book-40", name: "The World Tree and the Emerald Dream", zone: "Zephras Isle", coords: "42.6, 58.2 (Windweaver Sanctum)", set: 4, desc: "Sacred druidic tome gifted to the early Skyborne by the Green Flight." }
  ]
};

// 3. Compile Camping Field Station Recipes
const CAMPING_RECIPES_DATA = {
  tanningRack: {
    name: "Tanning Rack",
    prof: "Leatherworking",
    reqSkill: 140,
    blueprintSource: "Razorclaw the Butcher (Shadowfang Keep - 1 in 900 drop)",
    reagents: "5x Medium Leather, 3x Fine Thread, 2x Simple Wood",
    duration: "15 minutes (Replaces Camp Tent, grants Tent bonuses + 1hr CD)",
    totalRecipes: 48,
    highlightRecipes: [
      { skill: 125, name: "Defender's Leather Kilt", reagents: "12x Med Leather, 4x Cured Med Hide, 8x Pristine Leather, 8x Elixir of Minor Fortitude" },
      { skill: 125, name: "Totemic Leather Leggings", reagents: "12x Med Leather, 4x Cured Med Hide, 8x Pristine Leather, 8x Sulfuric Acid" },
      { skill: 125, name: "Brawler's Leather Legguards", reagents: "12x Med Leather, 4x Cured Med Hide, 8x Pristine Leather, 8x Shadowgem" },
      { skill: 125, name: "Trapper's Leather Legguards", reagents: "12x Med Leather, 4x Cured Med Hide, 8x Pristine Leather, 8x Deviate Scale" },
      { skill: 125, name: "Stormrider's Leather Kilt", reagents: "12x Med Leather, 4x Cured Med Hide, 8x Pristine Leather, 8x Cerulean Dye" },
      { skill: 125, name: "Wisdom's Leather Leggings", reagents: "12x Med Leather, 4x Cured Med Hide, 8x Pristine Leather, 8x Small Lustrous Pearl" },
      { skill: 150, name: "Prowler's Leather Belt", reagents: "8x Heavy Leather, 2x Cured Med Hide, 1x Jade" },
      { skill: 150, name: "Warden's Leather Belt", reagents: "8x Heavy Leather, 2x Cured Med Hide, 1x Elemental Earth" },
      { skill: 150, name: "Skirmisher's Leather Belt", reagents: "8x Heavy Leather, 2x Cured Med Hide, 1x Citrine" },
      { skill: 150, name: "Skulker's Leather Belt", reagents: "8x Heavy Leather, 2x Cured Med Hide, 1x Spider's Silk" },
      { skill: 175, name: "Prowler's Leather Gloves", reagents: "16x Heavy Leather, 2x Cured Heavy Hide, 2x Pristine Hide, 2x Jade" },
      { skill: 175, name: "Skulker's Leather Gloves", reagents: "16x Heavy Leather, 2x Cured Heavy Hide, 2x Pristine Hide, 2x Spider's Silk" },
      { skill: 200, name: "Stalker's Mail Boots", reagents: "8x Heavy Leather, 2x Cured Med Hide, 2x Elemental Air" },
      { skill: 200, name: "Skycaller's Mail Boots", reagents: "8x Heavy Leather, 2x Cured Med Hide, 2x Elemental Water" },
      { skill: 220, name: "Wolfshead Helm", type: "Classic Rework", reagents: "18x Thick Leather, 2x Thick Wolfhide, 8x Wicked Claw, 2x Cured Thick Hide" }
    ]
  },
  spinningWheel: {
    name: "Spinning Wheel",
    prof: "Tailoring",
    reqSkill: 140,
    blueprintSource: "Unstable Sentinel (City of Dalaran)",
    reagents: "5x Bolt of Silk Cloth, 3x Fine Thread, 2x Simple Wood",
    duration: "15 minutes (Replaces Faction Banner, preserves Spirit buff)",
    totalRecipes: 74,
    highlightRecipes: [
      { skill: 125, name: "Pristine Leggings", reagents: "14x Bolt of Silk, 8x Cerulean Dye, 8x Pristine Leather, 2x Silver Bar, 3x Greater Astral Essence" },
      { skill: 125, name: "Silky Leggings", reagents: "14x Bolt of Silk, 8x Cerulean Dye, 8x Spider's Silk, 2x Silver Bar, 3x Greater Astral Essence" },
      { skill: 125, name: "Flame Leggings", reagents: "14x Bolt of Silk, 8x Cerulean Dye, 8x Fire Oil, 2x Silver Bar, 3x Greater Astral Essence" },
      { skill: 125, name: "Shadow Leggings", reagents: "14x Bolt of Silk, 8x Cerulean Dye, 8x Shadowgem, 2x Silver Bar, 3x Greater Astral Essence" },
      { skill: 140, name: "Gilded Slippers", reagents: "8x Bolt of Mageweave, 4x Heavy Silken Thread, 2x Magenta Dye, 2x Gold Bar" },
      { skill: 140, name: "Frothing Slippers", reagents: "8x Bolt of Mageweave, 4x Heavy Silken Thread, 2x Magenta Dye, 2x Globe of Water" },
      { skill: 140, name: "Fiery Slippers", reagents: "8x Bolt of Mageweave, 4x Heavy Silken Thread, 2x Magenta Dye, 2x Heart of Fire" },
      { skill: 165, name: "Gilded Handwraps", reagents: "12x Bolt of Mageweave, 4x Heavy Silken Thread, 2x Magenta Dye, 4x Gold Bar" },
      { skill: 165, name: "Frothing Handwraps", reagents: "12x Bolt of Mageweave, 4x Heavy Silken Thread, 2x Magenta Dye, 4x Globe of Water" },
      { skill: 190, name: "Gilded Cord", reagents: "28x Bolt of Mageweave, 6x Magenta Dye, 4x Cerulean Dye, 12x Gold Bar" },
      { skill: 195, name: "Nethergeld Shoulders", reagents: "16x Bolt of Mageweave, 4x Magenta Dye, 8x Gold Bar, 2x Greater Nether Essence" },
      { skill: 205, name: "Nethergeld Cuffs", reagents: "18x Bolt of Mageweave, 6x Magenta Dye, 10x Gold Bar, 4x Greater Nether Essence" },
      { skill: 205, name: "Dreamweave Vest", type: "Classic Rework", reagents: "6x Bolt of Mageweave, 6x Wildvine, 2x Heart of the Wild" }
    ]
  }
};

// 4. Compile PvP Progression & Spec Sets
const PVP_DATA = {
  ranks: [
    { rank: 1, titleA: "Private", titleH: "Scout", rpNeeded: 750, rpTotal: 750, earliestWeek: 1, unlock: "Private's Tabard / Scout's Tabard" },
    { rank: 2, titleA: "Corporal", titleH: "Grunt", rpNeeded: 900, rpTotal: 1650, earliestWeek: 1, unlock: "Greater Insignia of Alliance / Horde (Trinket)" },
    { rank: 3, titleA: "Sergeant", titleH: "Sergeant", rpNeeded: 1050, rpTotal: 2700, earliestWeek: 1, unlock: "Faction Cloak (+7 Stamina)" },
    { rank: 4, titleA: "Master Sergeant", titleH: "Senior Sergeant", rpNeeded: 1200, rpTotal: 3900, earliestWeek: 2, unlock: "Premier Master Sergeant's Insignia (Phase 2 Cap)" },
    { rank: 5, titleA: "Sergeant Major", titleH: "First Sergeant", rpNeeded: 1350, rpTotal: 5250, earliestWeek: 2, unlock: "Combat Potions" },
    { rank: 6, titleA: "Knight", titleH: "Stone Guard", rpNeeded: 1500, rpTotal: 6750, earliestWeek: 3, unlock: "Knight's Colors / Stone Guard's Herald" },
    { rank: 7, titleA: "Knight-Lieutenant", titleH: "Blood Guard", rpNeeded: 1650, rpTotal: 8400, earliestWeek: 4, unlock: "Alliance Battle Standard / Horde Battle Standard" },
    { rank: 8, titleA: "Knight-Captain", titleH: "Legionnaire", rpNeeded: 1800, rpTotal: 10200, earliestWeek: 5, unlock: "Elite Wrist & Waist Upgrades (Emboldened Seals)" },
    { rank: 9, titleA: "Knight-Champion", titleH: "Centurion", rpNeeded: 1950, rpTotal: 12150, earliestWeek: 6, unlock: "Elite Boot Upgrade" },
    { rank: 10, titleA: "Lieutenant Commander", titleH: "Champion", rpNeeded: 2100, rpTotal: 14250, earliestWeek: 7, unlock: "Elite Glove Upgrade" },
    { rank: 11, titleA: "Commander", titleH: "Lieutenant General", rpNeeded: 2350, rpTotal: 16600, earliestWeek: 7, unlock: "Black War Mounts (100% Speed)" },
    { rank: 12, titleA: "Marshal", titleH: "General", rpNeeded: 2500, rpTotal: 19100, earliestWeek: 8, unlock: "Elite Leg & Shoulder Upgrades" },
    { rank: 13, titleA: "Field Marshal", titleH: "Warlord", rpNeeded: 2650, rpTotal: 21750, earliestWeek: 9, unlock: "Elite Chest & Head Upgrades" },
    { rank: 14, titleA: "Grand Marshal", titleH: "High Warlord", rpNeeded: 3000, rpTotal: 24750, earliestWeek: 10, unlock: "Grand Marshal / High Warlord Epic Weapons" }
  ],
  battlegrounds: [
    { name: "Warsong Gulch", players: "10v10", levels: "20-29 (Active in Beta), 30-39, 40-49, 50-59, 60", type: "Capture the Flag" },
    { name: "Arathi Basin", players: "15v15", levels: "20-29, 30-39, 40-49, 50-59, 60", type: "Base Resource Domination" },
    { name: "Darkspear Islands", players: "15v15", levels: "30-39, 40-49, 50-59, 60", type: "NEW Battleground in Forever (Island War)" },
    { name: "Alterac Valley", players: "40v40", levels: "51-60", type: "Large-Scale Warfare" }
  ]
};

// 5. Compile Legacy Challenges
const LEGACY_CHALLENGES_DATA = {
  total: 65,
  categories: [
    {
      name: "Classes",
      count: 27,
      desc: "Reach Level 25, 45, and 60 across all 9 classes (Druid, Hunter, Mage, Paladin, Priest, Rogue, Shaman, Warlock, Warrior)."
    },
    {
      name: "Tradeskills",
      count: 18,
      desc: "Reach Skill 150, 225, and 300 across 6 primary crafting trades (Alchemy, Blacksmithing, Enchanting, Engineering, Leatherworking, Tailoring)."
    },
    {
      name: "Dungeons",
      count: 3,
      desc: "Novice Spelunker (6 dungeons), Experienced Spelunker (10 dungeons), Master Spelunker (17 dungeons)."
    },
    {
      name: "Raids",
      count: 3,
      desc: "Conqueror of the Wilds (13 encounters in Hyjal Summit), Conqueror of the Deeps (8 encounters in Barrow Deeps), Conqueror of the Lair (Onyxia)."
    },
    {
      name: "Player vs. Player",
      count: 12,
      desc: "Honor Ranks (Rank 3, 7, 10, 13, 14), Exalted Reputations (Warsong, Arathi, Alterac, Darkspear Islands), Field of Honor Journey (Weeks 4, 7, 10)."
    },
    {
      name: "Adventure",
      count: 2,
      desc: "Lord Valthalak Laid to Rest (Dungeon Set 2 questline), Explorer (Explore Azeroth achievement)."
    }
  ],
  accountRewards: [
    { points: 15, name: "Holstered Replica Ironforge Air Rifle", type: "Toy", desc: "Interactive air rifle shootout shootout that keeps score." },
    { points: 25, name: "Spectral Bear Cub", type: "Pet", desc: "Companion vanity pet." },
    { points: 40, name: "Spectral Bear Tabard", type: "Tabard", desc: "Showcases Legacy dedication." },
    { points: 55, name: "Reins of the Spectral Bear", type: "Mount", desc: "100% Epic spectral bear mount." }
  ]
};

// 6. Detailed Encounter Tactics & Pre-Quests for New Dungeons
const DUNGEONS_EXPANDED_DATA = {
  "excavation-site": {
    id: "excavation-site",
    name: "Excavation Site: Wetlands",
    zone: "Wetlands (Above Whelgar's Excavation)",
    levelRange: "26–31",
    entrance: "In the cliffside cliffs overlooking Whelgar's Excavation Site in central Wetlands.",
    bosses: [
      {
        name: "Saltspine",
        level: 28,
        portrait: "https://foreverchanges.pro/wow-ui/bosses/saltspine.webp",
        mechanics: "Roams the starting marsh among elite crocolisks. Clear trash thoroughly before engaging him. He hits hard with high base health.",
        abilities: [
          { name: "Large Health Pool", role: "Tank", type: "Physical", desc: "Hits hard with high sustained melee swings. Tank keep defensive buffs active." }
        ],
        drops: [
          { name: "Supple Bellyskin Leggings", slot: "Legs, Leather", dropRate: "35%", stats: "+6 Agi, +5 Sta" },
          { name: "Saltscale Girdle", slot: "Waist, Mail", dropRate: "35%", stats: "+5 Str, +4 Sta" },
          { name: "Glinteye Slippers", slot: "Feet, Cloth", dropRate: "30%", stats: "+5 Int, +4 Spi" }
        ]
      },
      {
        name: "Shadetooth",
        level: 29,
        portrait: "https://foreverchanges.pro/wow-ui/bosses/shadetooth.webp",
        mechanics: "Slay the raptor matriarch in the tall brush. A wave of raptor adds spawns upon her death; wipe out the wave quickly before Shadetooth charges in.",
        abilities: [
          { name: "Raptors in the Grass", role: "DPS", type: "Physical", desc: "Small ambush raptors jump from foliage applying stacking bleed effects." },
          { name: "Wave of the Pack", role: "DPS", type: "Add Wave", desc: "Kill every raptor in the incoming pack before Shadetooth arrives to prevent overlap." },
          { name: "Primal Fear", role: "Healer / Tank", type: "Fear CC", desc: "Fears the tank repeatedly. Shamans should drop Tremor Totem; Priests use Fear Ward." }
        ],
        drops: [
          { name: "Raptorclaw Greaves", slot: "Feet, Mail", dropRate: "33%", stats: "+7 Str, +6 Sta" },
          { name: "Garb of Florid Feathers", slot: "Chest, Leather", dropRate: "33%", stats: "+8 Agi, +6 Sta" },
          { name: "Raptor's Gaze", slot: "Held in Off-hand", dropRate: "28%", stats: "+6 Int, +5 Spi, +8 Spell Power" },
          { name: "Blueprint: Greenhouse", slot: "Camping Book", dropRate: "6%", stats: "Teaches Greenhouse Camping Blueprint" }
        ]
      },
      {
        name: "Highland Horror",
        level: 30,
        portrait: "https://foreverchanges.pro/wow-ui/bosses/highland-horror.webp",
        mechanics: "Guards the Dragonmaw orc encampment. Pull the surrounding Dragonmaw orcs in small packs first, then engage the horror.",
        abilities: [
          { name: "Dragonmaw Vanguard", role: "Tank", type: "Add Group", desc: "Pulls easily with nearby camp. Pull isolated packs to avoid overwhelming the tank." }
        ],
        drops: [
          { name: "Horrible Rootcore", slot: "Quest Item", dropRate: "100%", stats: "Starts Horrors in the Highland quest for Rethiel the Greenwarden." }
        ]
      },
      {
        name: "Relic Guardian",
        level: 31,
        portrait: "https://foreverchanges.pro/wow-ui/bosses/relic-guardian.webp",
        mechanics: "Dormant at the end of the spider cavern. Click the ancient Titan console next to him to initiate the encounter.",
        abilities: [
          { name: "Threat Protocol Reset", role: "Tank / DPS", type: "Threat Wipe", desc: "Drops all threat and snaps to highest DPS. Damage dealers throttle bursts; tank must taunt immediately." }
        ],
        drops: [
          { name: "Reliquary Mantle", slot: "Shoulder, Mail", dropRate: "32%", stats: "+7 Str, +6 Sta" },
          { name: "Ring of Power Regulation", slot: "Finger", dropRate: "30%", stats: "+5 Int, +5 Sta, +7 Spell Power" },
          { name: "Golemsight Long Gun", slot: "Ranged, Gun", dropRate: "25%", stats: "14.8 DPS, +4 Agi, +3 Sta" },
          { name: "Titan Relic", slot: "Quest Item", dropRate: "100%", stats: "Starts Prehistoric Prism / Earthen Echo questlines." }
        ]
      }
    ],
    quests: [
      {
        name: "Prehistoric Prism / Earthen Echo",
        faction: "Both",
        levelReq: 24,
        source: "Titan Relic (Relic Guardian)",
        xp: "6,150–6,950 XP",
        rewards: "Explorer's League Dustcover (Back) / Healer's Staff / Heavehammer (2H Mace) / Furs of the Earthen Ring"
      },
      {
        name: "Horrors in the Highland",
        faction: "Alliance",
        levelReq: 24,
        source: "Rethiel the Greenwarden (Wetlands 56.2, 40.5)",
        xp: "6,150 XP",
        rewards: "Ironwood Destroyer (2H Mace) / Curl of Life (Ring) / Hornbeam Heft (1H Axe)"
      },
      {
        name: "Changing Tastes",
        faction: "Horde",
        levelReq: 24,
        source: "Borstan (Orgrimmar 57.4, 53.4)",
        xp: "6,950 XP",
        rewards: "Serrated Raptor Claw (1H Dagger) / Recipe: Twice-Spiced Raptor Slice"
      },
      {
        name: "Dorin's Kin / Songblade Stabilizer",
        faction: "Alliance",
        levelReq: 24,
        source: "Body of Daewyn inside dungeon",
        xp: "6,150 XP",
        rewards: "Daewyn's Girdle (Cloth Waist) / Songblade Stabilizer (Mail Waist)"
      }
    ]
  },
  "city-of-dalaran": {
    id: "city-of-dalaran",
    name: "City of Dalaran",
    zone: "Alterac Mountains (Through Lordamere Lake Sewers)",
    levelRange: "28–33",
    entrance: "Sewer pipe entrance beneath Dalaran purple dome in Alterac Mountains. Key required (Dalaran Sewer Key).",
    bosses: [
      {
        name: "Atrexis the Grave Knight",
        level: 29,
        portrait: "https://foreverchanges.pro/wow-ui/bosses/145787.webp",
        mechanics: "Stands inside the ritual summoning circle in the sewer underbelly, flanked by Kirin Tor Necromancers.",
        abilities: [
          { name: "Unholy Frenzy", role: "Healer / Shaman / Priest", type: "Magic Dispel", desc: "+75% Attack Speed for 20 sec. Shaman Purge or Priest Dispel Magic immediately!" },
          { name: "Thrash", role: "Tank / Healer", type: "Burst Melee", desc: "Swings twice simultaneously; heavy incoming spike damage." },
          { name: "Raise Dead", role: "DPS", type: "Add Cleave", desc: "Skeletons rise continually around the circle. Cleave them down quickly." },
          { name: "Disarm", role: "Tank", type: "Debuff", desc: "Takes tank weapon away for 6 seconds; keep defensive mitigation rolling." }
        ],
        drops: [
          { name: "Graveweave Bindings", slot: "Wrist, Cloth", dropRate: "35%", stats: "+5 Int, +4 Spi, +6 Spell Power" },
          { name: "Bonebinder's Signet", slot: "Finger", dropRate: "36%", stats: "+6 Sta, +5 Spi, +8 Healing" },
          { name: "Gravespike Repeater", slot: "Ranged, Crossbow", dropRate: "29%", stats: "16.4 DPS, +4 Agi, +3 Sta" }
        ]
      },
      {
        name: "Lyn the Ignored",
        level: 31,
        portrait: "https://foreverchanges.pro/wow-ui/bosses/lyn-the-ignored.webp",
        mechanics: "Secret summoning encounter: player with Tome of Dalaran clicks pink circle in northeast market stalls room.",
        abilities: [
          { name: "Shadow Bolt Volley", role: "Healer", type: "AoE Shadow", desc: "Hits all party members within 30 yards. Healers prepare group heals." },
          { name: "Curse of Thorns", role: "Mage / Druid", type: "Curse Dispel", desc: "Damages attackers on hit. Decurse targets immediately." }
        ],
        drops: [
          { name: "Cartilage Shapers", slot: "Hands, Leather", dropRate: "39%", stats: "+7 Agi, +6 Sta, +10 AP" },
          { name: "Tendonscraper Dagger", slot: "Main Hand, Dagger", dropRate: "19%", stats: "18.2 DPS, 1.60 Speed" },
          { name: "Bonepile Gaze", slot: "Off Hand, Shield", dropRate: "43%", stats: "Block 24, +6 Sta, +4 Str" }
        ]
      },
      {
        name: "Arcane Anomaly",
        level: 30,
        portrait: "https://foreverchanges.pro/wow-ui/bosses/arcane-anomaly.webp",
        mechanics: "Channels lethal directional beam and arcane bolts.",
        abilities: [
          { name: "Focal Blast", role: "All Players", type: "Directional Beam", desc: "3s cast, channels a continuous beam hitting 4x per second. Step out of the path immediately!" },
          { name: "Arcane Bolt", role: "Tank", type: "Magic Nuke", desc: "Regular 1.5s cast dealing heavy arcane spike damage to the tank." }
        ],
        drops: [
          { name: "Runemender's Seal", slot: "Finger", dropRate: "30%", stats: "+6 Int, +8 Spell Damage" },
          { name: "Ephemeral Grips", slot: "Hands, Cloth", dropRate: "39%", stats: "+7 Int, +5 Spi, +9 Spell Power" },
          { name: "Mana-Warped Chain Shirt", slot: "Chest, Mail", dropRate: "31%", stats: "+9 Str, +8 Sta, +6 Int" }
        ]
      },
      {
        name: "Arcanic Enigma",
        level: 30,
        portrait: "https://foreverchanges.pro/wow-ui/bosses/arcanic-enigma.webp",
        mechanics: "Polymorphs party members and silences spellcasters.",
        abilities: [
          { name: "Manamorph", role: "Healer", type: "Magic Dispel", desc: "Polymorphs target into an animal for 8 sec. Dispel immediately." },
          { name: "Silence Wave", role: "Healers / Casters", type: "Silence", desc: "10-second silence aura. Healers must position beyond 20 yards." },
          { name: "Arcane Manalings", role: "DPS", type: "Adds", desc: "Summons manalings that must be burned down with AoE." }
        ],
        drops: [
          { name: "Drape of Shifting Energy", slot: "Back, Cloth", dropRate: "31%", stats: "24 Armor, +5 Int, +7 Spell Power" },
          { name: "Violet Sorcerer's Robes", slot: "Chest, Cloth (Set)", dropRate: "39%", stats: "+10 Int, +7 Spi, +12 Spell Power" },
          { name: "Wand of Mana Concentration", slot: "Ranged, Wand", dropRate: "30%", stats: "32.1 DPS, +3 Int, +5 Spell Power" }
        ]
      },
      {
        name: "Unstable Sentinel",
        level: 31,
        portrait: "https://foreverchanges.pro/wow-ui/bosses/unstable-sentinel.webp",
        mechanics: "Ancient construct with lethal 25-yard pulsing AoE. Drops the Spinning Wheel blueprint!",
        abilities: [
          { name: "Malfunction", role: "All Players", type: "Pulsing AoE", desc: "Channels 6s, pulsing 140 damage every 2s within 25 yards. Ranged stay back; melee back off during cast!" }
        ],
        drops: [
          { name: "Guardian's Dualblade", slot: "2H Axe", dropRate: "35%", stats: "24.6 DPS, 3.40 Speed, +11 Str, +8 Sta" },
          { name: "Refractory Scaleguards", slot: "Legs, Mail", dropRate: "32%", stats: "+10 Str, +8 Sta" },
          { name: "Unstable Crystalline Shoulderpads", slot: "Shoulder, Leather", dropRate: "33%", stats: "+8 Agi, +7 Sta" },
          { name: "Blueprint: Spinning Wheel", slot: "Tailoring Recipe", dropRate: "8.4%", stats: "Teaches Spinning Wheel campsite station" }
        ]
      },
      {
        name: "Shade of the Archmage",
        level: 33,
        portrait: "https://foreverchanges.pro/wow-ui/bosses/shade-of-archmage.webp",
        mechanics: "Final boss of Dalaran inside the Violet Chamber. Mass polymorphs when out of mana and channels Evocation.",
        abilities: [
          { name: "Bounding Mana", role: "All Players", type: "Silencing Orb", desc: "Mana orb flies between players and boss. Passing through it deals heavy arcane damage and silences for 6s!" },
          { name: "Mass Polymorph & Evocation", role: "Healer / All", type: "Phase Change", desc: "When mana reaches 0, transforms entire group into sheep for 8s while channeling Evocation." },
          { name: "Stay in the Room", role: "All", type: "Encounter Rule", desc: "Leaving the chamber resets the encounter to 100% health." }
        ],
        drops: [
          { name: "Ponderous Orb", slot: "Held in Off-hand", dropRate: "26%", stats: "+8 Int, +6 Spi, +11 Spell Power" },
          { name: "Violet Sorcerer's Mantle", slot: "Shoulder, Cloth (Set)", dropRate: "35%", stats: "+8 Int, +6 Spi, +9 Spell Power" },
          { name: "Archmagister's Faceted Pendant", slot: "Neck", dropRate: "38%", stats: "+7 Int, +5 Sta, +8 Spell Power" },
          { name: "Blueprint: Arcane Salvager", slot: "Enchanting Recipe", dropRate: "7.5%", stats: "Teaches Arcane Salvager campfire tool" }
        ]
      }
    ],
    quests: [
      {
        name: "Heart of Disruption",
        faction: "Both",
        levelReq: 24,
        source: "Image of Archmage Modera (Lordamere Lake) / Magus Wordeen (Tarren Mill)",
        xp: "9,400 XP",
        rewards: "Spellguard Pauldrons (Mail) / Renewing Footpads (Leather) / Defender of Dalaran (2H Mace) OR Battle Spaulders / Enchanted Sandals / Striking Staff"
      },
      {
        name: "The Grave Knight",
        faction: "Horde",
        levelReq: 24,
        source: "Melisara (Tarren Mill)",
        xp: "9,400 XP",
        rewards: "Gravewalker Boots (Leather) / Undead Knight's Bracers (Mail)"
      },
      {
        name: "Power Overwhelming",
        faction: "Alliance",
        levelReq: 24,
        source: "High Sorcerer Andromath (Stormwind City 48.7, 87.6)",
        xp: "9,400 XP",
        rewards: "Violet Sash (Cloth Waist) / Runebound Gloves (Leather)"
      },
      {
        name: "Source of Power",
        faction: "Horde",
        levelReq: 24,
        source: "Doctor Martin Felben (Undercity 46.6, 74.4)",
        xp: "9,400 XP",
        rewards: "Unstable Power Core (Wand) / Construct Cloak (Cloth Back)"
      }
    ]
  }
};

// Write out JSON datasets to /data
fs.writeFileSync(path.join(DATA_DIR, 'forever_rares.json'), JSON.stringify(WORLD_RARES, null, 2), 'utf-8');
fs.writeFileSync(path.join(DATA_DIR, 'forever_library_books.json'), JSON.stringify(LIBRARY_BOOKS_DATA, null, 2), 'utf-8');
fs.writeFileSync(path.join(DATA_DIR, 'forever_camping_recipes.json'), JSON.stringify(CAMPING_RECIPES_DATA, null, 2), 'utf-8');
fs.writeFileSync(path.join(DATA_DIR, 'forever_pvp.json'), JSON.stringify(PVP_DATA, null, 2), 'utf-8');
fs.writeFileSync(path.join(DATA_DIR, 'forever_legacy_challenges.json'), JSON.stringify(LEGACY_CHALLENGES_DATA, null, 2), 'utf-8');
fs.writeFileSync(path.join(DATA_DIR, 'forever_dungeons.json'), JSON.stringify(DUNGEONS_EXPANDED_DATA, null, 2), 'utf-8');

console.log('[Compiler] Wrote 6 structured JSON datasets to /data');

// Write out browser-ready bundle js/data/atlas-data.js
const BUNDLE_JS = `/**
 * World of Warcraft: Forever - Atlas & Expansion Dataset
 * Browser bundle for World Atlas, Rare Spawns, Library Books, Camping Recipes, and PvP.
 */

window.WOW_ATLAS_DATA = {
  rares: ${JSON.stringify(WORLD_RARES, null, 2)},
  libraryBooks: ${JSON.stringify(LIBRARY_BOOKS_DATA, null, 2)},
  campingRecipes: ${JSON.stringify(CAMPING_RECIPES_DATA, null, 2)},
  pvp: ${JSON.stringify(PVP_DATA, null, 2)},
  legacyChallenges: ${JSON.stringify(LEGACY_CHALLENGES_DATA, null, 2)},
  expandedDungeons: ${JSON.stringify(DUNGEONS_EXPANDED_DATA, null, 2)}
};
`;

const ATLAS_DATA_PATH = path.resolve(__dirname, '../js/data/atlas-data.js');
fs.writeFileSync(ATLAS_DATA_PATH, BUNDLE_JS, 'utf-8');
console.log('[Compiler] Successfully compiled js/data/atlas-data.js');
