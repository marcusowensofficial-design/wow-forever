/**
 * World of Warcraft: Forever — Single-Command Progression Engine
 *
 * Master unified engine for Milestone 2:
 * 1. Ingests cached items from scratch/forever_items_cache.json and raw catalogs (data/scraped/wowhead_forever_*.json).
 * 2. Applies Practical Effective Level Formula:
 *    effectiveLevel = Math.max(item.reqLevel || 0, questReqLevel || 0, dungeonMinEnterLevel || 0, dungeonPracticalLevel || 0, trainerFloorLevel || 0)
 * 3. Enforces Dungeon Gating:
 *    RFC 13, VC (Deadmines) 18, WC 18, SFK 22, BFD 24, Stocks 24, Gnome 29, RFK 30, SM GY 30, SM Lib 33, SM Arm 36, SM Cath 39,
 *    RFD 38, Ulda 41, ZF 44, Mara 46, ST 50, BRD 52, LBRS/DM/Scholo/Strat 56–58;
 *    Custom Forever dungeons: Hall of Thanes 14, Ruins of Lordaeron 18, Excavation Site 29, City of Dalaran 31.
 * 4. Enforces Elite Quest Gating:
 *    King Bangalash (Master Hunter's Spellsword) -> 40; SM Cathedral (Bonebiter) -> 39; Whirlwind Weapon -> 30; Verigan's Fist -> 20.
 * 5. Enforces Weapon Proficiency & Trainer Floors:
 *    - Polearms: floor Level 20 across all classes.
 *    - Dual Wield: floor Level 20 for Warriors and Hunters (innate level 1 for Rogues).
 * 6. Enforces Class Weapon Restrictions:
 *    - Paladin: 0 axes (1H or 2H), 0 daggers, 0 staves, 0 ranged/wands. (2H track: 0 shields).
 *    - Hunter ranged track: 100% ranged (Bows, Crossbows, Guns); 0 melee weapons!
 *    - Shaman: 0 swords (1H or 2H), 0 polearms, 0 ranged/wands. 100% Horde only.
 *    - Rogue: 0 two-handed weapons, 0 axes, 0 shields, 0 staves/polearms.
 *    - Druid: 0 swords, 0 axes, 0 ranged/wands/shields.
 *    - Priest: 0 swords, 0 axes, 0 2H maces, 0 polearms, 0 shields, 0 ranged weapons.
 *    - Mage / Warlock: 0 maces, 0 axes, 0 2H swords, 0 polearms, 0 shields, 0 ranged weapons.
 *    - Warrior: 0 wands.
 * 7. Implements Human-Tuned Leveling Stat Weights (5 Roles):
 *    - Melee DPS (Warrior / Rogue): weapon DPS + slow swing speed instant attack scaling (MS, Overpower, Sinister Strike), Str, Agi, Sta.
 *    - Rogue OH: fast speed bonus for poison application.
 *    - Hunter: slow swing speed ranged weapon DPS + Aimed/Multi-shot scaling, Agi, Sta.
 *    - Caster DPS (Mage / Warlock / Priest): 1–30 wand DPS + Spirit (5SR) + Int; 31–60 Spell Power + Hit/Crit + Int.
 *    - Healer: Healing Power, MP5, Spirit, Int.
 *    - Tank: Shield Armor, Block Value, Sta, Defense, fast 1H HS rage dumping.
 * 8. Two-Tiered Ranking:
 *    Highlights "⭐ Top Pick" (rank 1), ranks top 4–5 alternative upgrades directly on the card (ranks 2–6),
 *    and indexes all remaining equippable datamined items into the background pool.
 * 9. Emits updated data/scraped/forever_weapons.json, forever_offhands.json, and forever_wands.json.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');

const SCRAPED_DIR = path.join(ROOT, 'data', 'scraped');
const CACHE_PATH = path.join(ROOT, 'scratch', 'forever_items_cache.json');
const WEAPONS_RAW_PATH = path.join(SCRAPED_DIR, 'wowhead_forever_weapons.json');
const SHIELDS_RAW_PATH = path.join(SCRAPED_DIR, 'wowhead_forever_shields.json');
const OFFHANDS_RAW_PATH = path.join(SCRAPED_DIR, 'wowhead_forever_offhands.json');

const OUT_WEAPONS_PATH = path.join(SCRAPED_DIR, 'forever_weapons.json');
const OUT_OFFHANDS_PATH = path.join(SCRAPED_DIR, 'forever_offhands.json');
const OUT_WANDS_PATH = path.join(SCRAPED_DIR, 'forever_wands.json');

console.log('======================================================================');
console.log('   WOW FOREVER — MASTER PROGRESSION GATING & STAT WEIGHTS ENGINE');
console.log('======================================================================');

// -----------------------------------------------------------------------------
// 1. Authoritative Gating Tables & Reference Specifications
// -----------------------------------------------------------------------------

export const DUNGEON_FLOORS = {
  'ragefire chasm': { minEnter: 8, practical: 13, code: 'RFC', name: 'Ragefire Chasm' },
  'the deadmines': { minEnter: 10, practical: 18, code: 'VC', name: 'The Deadmines' },
  'deadmines': { minEnter: 10, practical: 18, code: 'VC', name: 'The Deadmines' },
  'wailing caverns': { minEnter: 10, practical: 18, code: 'WC', name: 'Wailing Caverns' },
  'shadowfang keep': { minEnter: 14, practical: 22, code: 'SFK', name: 'Shadowfang Keep' },
  'blackfathom deeps': { minEnter: 18, practical: 24, code: 'BFD', name: 'Blackfathom Deeps' },
  'the stockade': { minEnter: 15, practical: 24, code: 'Stocks', name: 'The Stockade' },
  'stockade': { minEnter: 15, practical: 24, code: 'Stocks', name: 'The Stockade' },
  'gnomeregan': { minEnter: 19, practical: 29, code: 'Gnome', name: 'Gnomeregan' },
  'razorfen kraul': { minEnter: 25, practical: 30, code: 'RFK', name: 'Razorfen Kraul' },
  'scarlet monastery (graveyard)': { minEnter: 21, practical: 30, code: 'SM GY', name: 'Scarlet Monastery (Graveyard)' },
  'sm graveyard': { minEnter: 21, practical: 30, code: 'SM GY', name: 'Scarlet Monastery (Graveyard)' },
  'scarlet monastery (library)': { minEnter: 21, practical: 33, code: 'SM Lib', name: 'Scarlet Monastery (Library)' },
  'sm library': { minEnter: 21, practical: 33, code: 'SM Lib', name: 'Scarlet Monastery (Library)' },
  'scarlet monastery (armory)': { minEnter: 21, practical: 36, code: 'SM Arm', name: 'Scarlet Monastery (Armory)' },
  'sm armory': { minEnter: 21, practical: 36, code: 'SM Arm', name: 'Scarlet Monastery (Armory)' },
  'scarlet monastery (cathedral)': { minEnter: 21, practical: 39, code: 'SM Cath', name: 'Scarlet Monastery (Cathedral)' },
  'sm cathedral': { minEnter: 21, practical: 39, code: 'SM Cath', name: 'Scarlet Monastery (Cathedral)' },
  'razorfen downs': { minEnter: 35, practical: 38, code: 'RFD', name: 'Razorfen Downs' },
  'uldaman': { minEnter: 35, practical: 41, code: 'Ulda', name: 'Uldaman' },
  'zul\'farrak': { minEnter: 39, practical: 44, code: 'ZF', name: 'Zul\'Farrak' },
  'maraudon': { minEnter: 40, practical: 46, code: 'Mara', name: 'Maraudon' },
  'sunken temple': { minEnter: 45, practical: 50, code: 'ST', name: 'Sunken Temple' },
  'temple of atal\'hakkar': { minEnter: 45, practical: 50, code: 'ST', name: 'Sunken Temple' },
  'blackrock depths': { minEnter: 48, practical: 52, code: 'BRD', name: 'Blackrock Depths' },
  'lower blackrock spire': { minEnter: 55, practical: 56, code: 'LBRS', name: 'Lower Blackrock Spire' },
  'dire maul': { minEnter: 55, practical: 58, code: 'DM', name: 'Dire Maul' },
  'scholomance': { minEnter: 55, practical: 58, code: 'Scholo', name: 'Scholomance' },
  'stratholme': { minEnter: 55, practical: 58, code: 'Strat', name: 'Stratholme' },
  // Custom Forever Dungeons
  'hall of thanes': { minEnter: 10, practical: 14, code: 'HoT', name: 'Hall of Thanes' },
  'ruins of lordaeron': { minEnter: 14, practical: 18, code: 'RoL', name: 'Ruins of Lordaeron' },
  'excavation site': { minEnter: 24, practical: 29, code: 'ES', name: 'Excavation Site: Wetlands' },
  'excavation site: wetlands': { minEnter: 24, practical: 29, code: 'ES', name: 'Excavation Site: Wetlands' },
  'city of dalaran': { minEnter: 26, practical: 31, code: 'CoD', name: 'City of Dalaran' }
};

export const DUNGEON_ZONE_MAP = {
  2437: DUNGEON_FLOORS['ragefire chasm'],
  1581: DUNGEON_FLOORS['the deadmines'],
  718: DUNGEON_FLOORS['wailing caverns'],
  209: DUNGEON_FLOORS['shadowfang keep'],
  719: DUNGEON_FLOORS['blackfathom deeps'],
  717: DUNGEON_FLOORS['the stockade'],
  721: DUNGEON_FLOORS['gnomeregan'],
  493: DUNGEON_FLOORS['razorfen kraul'],
  722: DUNGEON_FLOORS['razorfen kraul'],
  491: DUNGEON_FLOORS['razorfen downs'],
  1337: DUNGEON_FLOORS['uldaman'],
  1176: DUNGEON_FLOORS['zul\'farrak'],
  2100: DUNGEON_FLOORS['maraudon'],
  1477: DUNGEON_FLOORS['sunken temple'],
  1584: DUNGEON_FLOORS['blackrock depths'],
  1583: DUNGEON_FLOORS['lower blackrock spire'],
  2557: DUNGEON_FLOORS['dire maul'],
  2057: DUNGEON_FLOORS['scholomance'],
  2017: DUNGEON_FLOORS['stratholme']
};

export const BOSS_TO_DUNGEON_MAP = {
  // RFC
  'taragaman the hungerer': DUNGEON_FLOORS['ragefire chasm'],
  'jergosh the invoker': DUNGEON_FLOORS['ragefire chasm'],
  'bazzalan': DUNGEON_FLOORS['ragefire chasm'],
  'maur grimtotem': DUNGEON_FLOORS['ragefire chasm'],

  // Deadmines
  'rhahk\'zor': DUNGEON_FLOORS['the deadmines'],
  'sneed': DUNGEON_FLOORS['the deadmines'],
  'mr. smite': DUNGEON_FLOORS['the deadmines'],
  'captain greenskin': DUNGEON_FLOORS['the deadmines'],
  'edwin vancleef': DUNGEON_FLOORS['the deadmines'],
  'miner johnson': DUNGEON_FLOORS['the deadmines'],
  'cookie': DUNGEON_FLOORS['the deadmines'],

  // Wailing Caverns
  'kresh': DUNGEON_FLOORS['wailing caverns'],
  'lord pythas': DUNGEON_FLOORS['wailing caverns'],
  'lord serpentis': DUNGEON_FLOORS['wailing caverns'],
  'skum': DUNGEON_FLOORS['wailing caverns'],
  'verdan the everliving': DUNGEON_FLOORS['wailing caverns'],
  'trigore the lasher': DUNGEON_FLOORS['wailing caverns'],
  'boahn': DUNGEON_FLOORS['wailing caverns'],
  'mutanus the devourer': DUNGEON_FLOORS['wailing caverns'],

  // SFK
  'commander springvale': DUNGEON_FLOORS['shadowfang keep'],
  'odo the blindwatcher': DUNGEON_FLOORS['shadowfang keep'],
  'the butcher': DUNGEON_FLOORS['shadowfang keep'],
  'archmage arugal': DUNGEON_FLOORS['shadowfang keep'],
  'fenrus the devourer': DUNGEON_FLOORS['shadowfang keep'],
  'wolf master nandeb': DUNGEON_FLOORS['shadowfang keep'],

  // BFD
  'ghamoo-ra': DUNGEON_FLOORS['blackfathom deeps'],
  'gelihast': DUNGEON_FLOORS['blackfathom deeps'],
  'old serra\'kis': DUNGEON_FLOORS['blackfathom deeps'],
  'aku\'mai': DUNGEON_FLOORS['blackfathom deeps'],
  'twilight lord kelris': DUNGEON_FLOORS['blackfathom deeps'],
  'baron aquanis': DUNGEON_FLOORS['blackfathom deeps'],

  // Stockade
  'kam deepfury': DUNGEON_FLOORS['the stockade'],
  'bruegal ironknuckle': DUNGEON_FLOORS['the stockade'],
  'targorr the dread': DUNGEON_FLOORS['the stockade'],
  'dextren ward': DUNGEON_FLOORS['the stockade'],
  'bazil thredd': DUNGEON_FLOORS['the stockade'],

  // Gnomeregan
  'electrocutioner 6000': DUNGEON_FLOORS['gnomeregan'],
  'crowd pummeler 9-60': DUNGEON_FLOORS['gnomeregan'],
  'mekgineer thermaplugg': DUNGEON_FLOORS['gnomeregan'],
  'grubbis': DUNGEON_FLOORS['gnomeregan'],
  'viscous fallout': DUNGEON_FLOORS['gnomeregan'],

  // RFK
  'overlord ramtusk': DUNGEON_FLOORS['razorfen kraul'],
  'death speaker jargba': DUNGEON_FLOORS['razorfen kraul'],
  'agathelos the raging': DUNGEON_FLOORS['razorfen kraul'],
  'earthcaller halmgar': DUNGEON_FLOORS['razorfen kraul'],
  'blind hunter': DUNGEON_FLOORS['razorfen kraul'],
  'charlga razorflank': DUNGEON_FLOORS['razorfen kraul'],

  // Scarlet Monastery Wings
  'bloodmage thalnos': DUNGEON_FLOORS['scarlet monastery (graveyard)'],
  'azshir the sleepless': DUNGEON_FLOORS['scarlet monastery (graveyard)'],
  'interrogator vishas': DUNGEON_FLOORS['scarlet monastery (graveyard)'],
  'ironspine': DUNGEON_FLOORS['scarlet monastery (graveyard)'],
  'fallen champion': DUNGEON_FLOORS['scarlet monastery (graveyard)'],

  'arcanist doan': DUNGEON_FLOORS['scarlet monastery (library)'],
  'houndmaster loksey': DUNGEON_FLOORS['scarlet monastery (library)'],

  'herod': DUNGEON_FLOORS['scarlet monastery (armory)'],

  'scarlet commander mograine': DUNGEON_FLOORS['scarlet monastery (cathedral)'],
  'high inquisitor whitemane': DUNGEON_FLOORS['scarlet monastery (cathedral)'],
  'high inquisitor fairbanks': DUNGEON_FLOORS['scarlet monastery (cathedral)'],

  // RFD
  'glutton': DUNGEON_FLOORS['razorfen downs'],
  'mordresh fire eye': DUNGEON_FLOORS['razorfen downs'],
  'amnennar the coldbringer': DUNGEON_FLOORS['razorfen downs'],
  'plaguemaw the rotting': DUNGEON_FLOORS['razorfen downs'],
  'tuten\'kash': DUNGEON_FLOORS['razorfen downs'],

  // Uldaman
  'archaedas': DUNGEON_FLOORS['uldaman'],
  'grimlok': DUNGEON_FLOORS['uldaman'],
  'ironaya': DUNGEON_FLOORS['uldaman'],
  'galgann firehammer': DUNGEON_FLOORS['uldaman'],
  'baelog': DUNGEON_FLOORS['uldaman'],
  'revelosh': DUNGEON_FLOORS['uldaman'],
  'ancient stone keeper': DUNGEON_FLOORS['uldaman'],

  // Zul'Farrak
  'antu\'sul': DUNGEON_FLOORS['zul\'farrak'],
  'chief ukorz sandscalp': DUNGEON_FLOORS['zul\'farrak'],
  'witch doctor zum\'rah': DUNGEON_FLOORS['zul\'farrak'],
  'gahz\'rilla': DUNGEON_FLOORS['zul\'farrak'],
  'theka the martyr': DUNGEON_FLOORS['zul\'farrak'],
  'hydromancer velratha': DUNGEON_FLOORS['zul\'farrak'],
  'nekrum gutchewer': DUNGEON_FLOORS['zul\'farrak'],
  'shadowpriest seez\'kiz': DUNGEON_FLOORS['zul\'farrak'],

  // Maraudon
  'noxxion': DUNGEON_FLOORS['maraudon'],
  'princess theradras': DUNGEON_FLOORS['maraudon'],
  'tinkerer gizlock': DUNGEON_FLOORS['maraudon'],
  'lord vyletongue': DUNGEON_FLOORS['maraudon'],
  'celebras the cursed': DUNGEON_FLOORS['maraudon'],
  'landslide': DUNGEON_FLOORS['maraudon'],
  'rotgrip': DUNGEON_FLOORS['maraudon'],

  // Sunken Temple
  'avatar of hakkar': DUNGEON_FLOORS['sunken temple'],
  'shade of eranikus': DUNGEON_FLOORS['sunken temple'],
  'morphaz': DUNGEON_FLOORS['sunken temple'],
  'hazzas': DUNGEON_FLOORS['sunken temple'],
  'dreamscythe': DUNGEON_FLOORS['sunken temple'],
  'weaver': DUNGEON_FLOORS['sunken temple'],
  'jammal\'an the prophet': DUNGEON_FLOORS['sunken temple'],
  'atal\'alarion': DUNGEON_FLOORS['sunken temple'],

  // BRD
  'houndmaster grebmar': DUNGEON_FLOORS['blackrock depths'],
  'pyromancer loregrain': DUNGEON_FLOORS['blackrock depths'],
  'emperor dagran thaurissan': DUNGEON_FLOORS['blackrock depths'],
  'ambassador flamelash': DUNGEON_FLOORS['blackrock depths'],
  'general angerforge': DUNGEON_FLOORS['blackrock depths'],
  'hurley blackbreath': DUNGEON_FLOORS['blackrock depths'],
  'plugger spazzring': DUNGEON_FLOORS['blackrock depths'],
  'lord incendius': DUNGEON_FLOORS['blackrock depths'],
  'warden stilgiss': DUNGEON_FLOORS['blackrock depths'],
  'fineous darkvire': DUNGEON_FLOORS['blackrock depths'],
  'bael\'gar': DUNGEON_FLOORS['blackrock depths'],
  'high interrogator gerstahn': DUNGEON_FLOORS['blackrock depths'],
  'magmus': DUNGEON_FLOORS['blackrock depths'],

  // Scholomance
  'doctor theolen krastinov': DUNGEON_FLOORS['scholomance'],
  'lorekeeper polkelt': DUNGEON_FLOORS['scholomance'],
  'jandice barov': DUNGEON_FLOORS['scholomance'],
  'ras frostwhisper': DUNGEON_FLOORS['scholomance'],
  'darkmaster gandling': DUNGEON_FLOORS['scholomance'],
  'instructor malicia': DUNGEON_FLOORS['scholomance'],
  'lady illucia barov': DUNGEON_FLOORS['scholomance'],
  'lord alexei barov': DUNGEON_FLOORS['scholomance'],

  // Stratholme
  'postman malown': DUNGEON_FLOORS['stratholme'],
  'timmy the cruel': DUNGEON_FLOORS['stratholme'],
  'cannon master willey': DUNGEON_FLOORS['stratholme'],
  'baroness anastari': DUNGEON_FLOORS['stratholme'],
  'archivist galford': DUNGEON_FLOORS['stratholme'],
  'balnazzar': DUNGEON_FLOORS['stratholme'],
  'baron rivendare': DUNGEON_FLOORS['stratholme'],
  'malor the zealous': DUNGEON_FLOORS['stratholme'],
  'magistrate barthilas': DUNGEON_FLOORS['stratholme'],

  // Dire Maul
  'hydrospawn': DUNGEON_FLOORS['dire maul'],
  'lethtendris': DUNGEON_FLOORS['dire maul'],
  'alzzin the wildshaper': DUNGEON_FLOORS['dire maul'],
  'prince tortheldrin': DUNGEON_FLOORS['dire maul'],
  'illyanna ravenoak': DUNGEON_FLOORS['dire maul'],
  'tendris warpwood': DUNGEON_FLOORS['dire maul'],
  'king gordok': DUNGEON_FLOORS['dire maul'],
  'guard mol\'dar': DUNGEON_FLOORS['dire maul'],
  'guard fengus': DUNGEON_FLOORS['dire maul'],
  'guard slip\'kik': DUNGEON_FLOORS['dire maul'],
  'captain kromcrush': DUNGEON_FLOORS['dire maul'],

  // LBRS
  'highlord omokk': DUNGEON_FLOORS['lower blackrock spire'],
  'war master voone': DUNGEON_FLOORS['lower blackrock spire'],
  'shadow hunter vosh\'gajin': DUNGEON_FLOORS['lower blackrock spire'],
  'overlord wyrmthalak': DUNGEON_FLOORS['lower blackrock spire'],
  'quartermaster zigris': DUNGEON_FLOORS['lower blackrock spire'],
  'gizrul the slavener': DUNGEON_FLOORS['lower blackrock spire'],
  'halycon': DUNGEON_FLOORS['lower blackrock spire'],
  'bannok grimaxe': DUNGEON_FLOORS['lower blackrock spire'],

  // Custom Forever Dungeons
  'magmatus': DUNGEON_FLOORS['hall of thanes'],
  'plunder': DUNGEON_FLOORS['hall of thanes'],
  'durgen dirgehammer': DUNGEON_FLOORS['hall of thanes'],
  'the baron': DUNGEON_FLOORS['ruins of lordaeron'],
  'witherfang': DUNGEON_FLOORS['ruins of lordaeron'],
  'the abandoned': DUNGEON_FLOORS['ruins of lordaeron'],
  'bjork': DUNGEON_FLOORS['ruins of lordaeron'],
  'rath\'mael': DUNGEON_FLOORS['ruins of lordaeron'],
  'viktor the vile': DUNGEON_FLOORS['ruins of lordaeron'],
  'lordaeron captain': DUNGEON_FLOORS['ruins of lordaeron'],
  'shadetooth': DUNGEON_FLOORS['excavation site'],
  'relic guardian': DUNGEON_FLOORS['excavation site'],
  'atrexis the grave knight': DUNGEON_FLOORS['city of dalaran'],
  'lyn the ignored': DUNGEON_FLOORS['city of dalaran'],
  'arcanic enigma': DUNGEON_FLOORS['city of dalaran'],
  'unstable sentinel': DUNGEON_FLOORS['city of dalaran'],
  'shade of the archmage': DUNGEON_FLOORS['city of dalaran'],
  'mana devourer': DUNGEON_FLOORS['city of dalaran']
};

export const SPECIFIC_ITEM_GATING = {
  // Master Hunter's Spellsword — Big Game Hunter (King Bangalash, lvl 43 elite in STV)
  270085: { effectiveLevel: 40, quest: 'Big Game Hunter' },
  // Bonebiter — In the Name of the Light (SM Cathedral Mograine/Whitemane)
  6807: { effectiveLevel: 39, quest: 'In the Name of the Light' },
  // Whirlwind Weapon quests (Warrior level 30 quest chain)
  6975: { effectiveLevel: 30, quest: 'Whirlwind Weapon' },
  6976: { effectiveLevel: 30, quest: 'Whirlwind Weapon' },
  6977: { effectiveLevel: 30, quest: 'Whirlwind Weapon' },
  // Verigan's Fist (Paladin level 20 quest)
  6953: { effectiveLevel: 20, quest: 'The Test of Righteousness' },
  // Ironfoe
  11684: { effectiveLevel: 55, dungeon: 'Blackrock Depths' },
  // Skullflame Shield
  1168: { effectiveLevel: 54 }
};

export const SUBCLASS_NAMES = {
  0: 'One-Handed Axe',
  1: 'Two-Handed Axe',
  2: 'Bow',
  3: 'Gun',
  4: 'One-Handed Mace',
  5: 'Two-Handed Mace',
  6: 'Polearm',
  7: 'One-Handed Sword',
  8: 'Two-Handed Sword',
  10: 'Staff',
  13: 'Fist Weapon',
  14: 'Miscellaneous',
  15: 'Dagger',
  16: 'Thrown',
  18: 'Crossbow',
  19: 'Wand',
  20: 'Fishing Pole'
};

export const KNOWN_STAFF_NAMES = new Set([
  "staff of orgrimmar", "fallen dragon's scepter", "golemheart stave", "segmented spider leg",
  "coldspire staff", "living root", "crescent staff", "odo's ley staff", "rod of the sleepwalker",
  "healer's staff", "striking staff", "spine of the devourer", "illusionary rod", "spellshifter rod",
  "kindling stave", "wisepaw totem", "benediction", "staff of jordan", "warden staff", "staff of westfall",
  "oakthrush staff", "apprentice's spellstaff", "staff of the dor'danil", "walking stick", "short staff",
  "militia quarterstaff", "glimmering staff", "soulstaff", "staff of the friar", "death prophet spine",
  "staff of soran'ruk", "soul harvester", "rod of the ogre magi", "zum'rah's vexing cane", "gritroot staff",
  "darkwood staff", "cauldron stirrer", "makeshift stormcaller", "gnarled necromancer's staff",
  "alliance outrunner staff", "emerald watcher's dreamstaff"
]);

export const KNOWN_MACE_NAMES = new Set([
  "wooden mallet", "large club", "northshire hammer", "giant mace", "trogg scepter",
  "heavy copper maul", "ironforge greathammer", "rhahk'zor's hammer", "smite's mighty hammer",
  "verigan's fist", "heavehammer", "defender of dalaran", "dark hearted hammer", "manual crowd pummeler",
  "mograine's might", "princess theradras' scepter", "dark iron pulverizer", "hammer of the grand crusader",
  "the unstoppable force", "militia warhammer", "scepter of the abandoned", "rage of the storm",
  "dendweller's hammer", "copper mace", "bronze mace", "bronze warhammer", "solid iron maul",
  "mighty iron hammer", "the pacifier", "enchanted battlehammer", "club", "crested scepter",
  "rock pulverizer", "archeus", "grisly sack of skulls", "goblin smasher", "bonecracker",
  "hammer of orgrimmar", "hammerbone", "mug of muddled memories", "the stitcher", "gul'gash's greathammer"
]);

export const KNOWN_AXE_NAMES = new Set([
  "crude battle axe", "copper battle axe", "thick war axe", "durgen's crescent axe",
  "corpse chopper", "forsaken greataxe", "reef axe", "taurenbane's family cleaver",
  "guardian's dualblade", "whirlwind axe", "corpsemaker", "ravager", "executioner's cleaver",
  "gatorbite axe", "arcanite reaper", "woodchopper", "lumbering ogre axe", "taskmaster axe",
  "bronze battle axe", "heavy mithril axe", "bonebiter", "massive iron axe", "riptear's cleaver",
  "thun'grim's axe", "axe of orgrimmar", "icesworn decapitator", "butcher's cleaver"
]);

export const KNOWN_SWORD_NAMES = new Set([
  "worn shortsword", "copper claymore", "heavy copper broadsword", "haunting blade",
  "vileblood scimitar", "plaguefang", "strike of the hydra", "trusty sword", "whirlwind sword",
  "stoneslayer", "blackblade of shahram", "copper shortsword", "bronze greatsword", "wolfsbane",
  "moonsteel broadsword", "sword of serenity", "blade of the titans", "warmonger", "cutlass",
  "cruel barb", "wingblade", "deadly bronze poniard", "bronze shortsword", "ruby-adorned blade",
  "city guard's tarnished blade", "sword of hammerfall", "the butcher", "vanquisher's sword",
  "thrash blade", "mirah's song", "dal'rend's sacred charge", "dal'rend's tribal guardian",
  "coldflame saber", "debt collector", "witchblade", "master hunter's spellsword", "zealot blade",
  "sword of omen", "forsaken shortsword", "deathstalker shortsword", "talonstrike", "thun'grim's sword",
  "heirloom sword", "sword of the fallen", "militia shortsword", "militia sword", "curved scimitar",
  "wildgore greatsword", "gilded blademaster's greatsword", "monstrous cleaver", "the skyblade",
  "blade of silverlaine", "alliance outrunner's sword", "blade of senseless slaughter"
]);

export const KNOWN_RANGED_NAMES = new Set([
  "polished shortbow", "hornwood recurve bow", "rough boomstick", "militia bow", "heavy recurve bow",
  "fine shortbow", "laminated recurve bow", "hunter's boomstick", "deadly blunderbuss",
  "calibrated blunderbuss", "venomstrike", "lovingly crafted boomstick", "silver-plated shotgun",
  "reinforced bow", "naga heartpiercer", "moonsight rifle", "fallenroot longbow", "bkp 2700 \"enforcer\"",
  "concealed hand crossbow", "gravespike repeater", "golemsight long gun", "glass shooter",
  "master hunter's rifle", "master hunter's bow", "quilboar blaster", "booty bay bruiser's buckshot",
  "spellsever crossbow", "crystalpine stinger", "mithril blunderbuss", "chesterfall musket",
  "blasting hackbut", "mithril heavy-bore rifle", "shrapnel blaster", "ironweaver", "truthseeker's bow",
  "gryphonwing bow", "riphook", "megashot rifle", "thorium rifle", "dark iron rifle", "blackcrow",
  "ancient bone bow", "flawless arcanite rifle", "core marksman rifle", "kolkar bow", "skorn's rifle",
  "orcish battle bow", "snarlsnout shooter", "bristlebark bow", "walton's second-favorite gun",
  "misplaced shooter", "barbaric crossbow", "dun garok rifle", "siegebreaker's blaster",
  "reaver's repeater", "alliance outrunner bow"
]);

export function isAxeWeapon(item) {
  const name = String(item.name || '').toLowerCase().trim();
  const type = String(item.weaponType || item.subclassName || '').toLowerCase();
  const sub = Number(item.subclass);
  if (KNOWN_AXE_NAMES.has(name)) return true;
  if (sub === 0 || sub === 1) return true;
  if (type.includes('axe') && !type.includes('polearm')) return true;
  if (/\b(axe|cleaver|hatchet|chopper|battleaxe|greataxe|decapitator)\b/i.test(name) && !name.includes('sword') && !name.includes('blade')) return true;
  return false;
}

export function isSwordWeapon(item) {
  const name = String(item.name || '').toLowerCase().trim();
  const type = String(item.weaponType || item.subclassName || '').toLowerCase();
  const sub = Number(item.subclass);
  if (KNOWN_SWORD_NAMES.has(name)) return true;
  if (sub === 7 || sub === 8) return true;
  if (type.includes('sword')) return true;
  if (/\b(sword|shortsword|broadsword|claymore|greatsword|scimitar|blade|saber|cutlass|poniard)\b/i.test(name) && !name.includes('axe')) return true;
  return false;
}

export function isMaceWeapon(item) {
  const name = String(item.name || '').toLowerCase().trim();
  const type = String(item.weaponType || item.subclassName || '').toLowerCase();
  const sub = Number(item.subclass);
  if (KNOWN_MACE_NAMES.has(name)) return true;
  if (sub === 4 || sub === 5) return true;
  if (type.includes('mace') || type.includes('hammer') || type.includes('maul')) return true;
  if (/\b(mace|hammer|maul|mallet|club|scepter|greathammer|pulverizer|warhammer)\b/i.test(name)) return true;
  return false;
}

export function isStaffWeapon(item) {
  const name = String(item.name || '').toLowerCase().trim();
  const type = String(item.weaponType || item.subclassName || '').toLowerCase();
  const sub = Number(item.subclass);
  if (KNOWN_STAFF_NAMES.has(name)) return true;
  if (sub === 10) return true;
  if (type.includes('staff')) return true;
  if (/\b(staff|stave|rod)\b/i.test(name)) return true;
  return false;
}

export function isShieldItem(item) {
  if (!item) return false;
  const name = String(item.name || '').toLowerCase().trim();
  const type = String(item.weaponType || item.subclassName || '').toLowerCase();
  const slot = String(item.inventorySlot || '').toLowerCase();
  if (type.includes('shield') || slot.includes('shield')) return true;
  if (item.subclass === 6 && (slot.includes('shield') || item.classs === 4 || item.weaponType === 'Shield')) return true;
  if (/\b(shield|buckler|crest|bulwark|aegis|deflector)\b/i.test(name) && !name.includes('sword') && !name.includes('blade')) return true;
  return false;
}

export function isRangedWeapon(item) {
  if (!item) return false;
  const name = String(item.name || '').toLowerCase().trim();
  const type = String(item.weaponType || item.subclassName || '').toLowerCase();
  const sub = Number(item.subclass);
  if (KNOWN_RANGED_NAMES.has(name)) return true;
  if ([2, 3, 18].includes(sub)) return true;
  if (type.includes('bow') || type.includes('gun') || type.includes('crossbow') || type.includes('rifle')) return true;
  if (/\b(bow|gun|crossbow|rifle|repeater|blaster|shotgun|musket|boomstick|shooter)\b/i.test(name)) return true;
  return false;
}

export function is2HWeapon(item) {
  if (!item) return false;
  if (isShieldItem(item)) return false;
  const type = String(item.weaponType || item.subclassName || '').toLowerCase();
  const slot = String(item.inventorySlot || '').toLowerCase();
  const sub = Number(item.subclass);
  if (sub === 1 || sub === 5 || sub === 8 || sub === 10) return true;
  if (sub === 6 && (type.includes('polearm') || item.weaponType === 'Polearm')) return true;
  if (type.includes('two-hand') || type.includes('2h') || slot.includes('two-hand') || isStaffWeapon(item)) return true;
  return false;
}

export function isWandWeapon(item) {
  if (!item) return false;
  const sub = Number(item.subclass);
  const type = String(item.weaponType || item.subclassName || '').toLowerCase();
  const name = String(item.name || '').toLowerCase();
  return sub === 19 || type.includes('wand') || /\bwand\b/i.test(name);
}

export function isFistWeapon(item) {
  if (!item) return false;
  const sub = Number(item.subclass);
  const type = String(item.weaponType || item.subclassName || '').toLowerCase();
  const name = String(item.name || '').toLowerCase();
  return sub === 13 || type.includes('fist') || /\b(fist weapon|knuckles|claws|claw)\b/i.test(name);
}

export function isThrownWeapon(item) {
  if (!item) return false;
  const sub = Number(item.subclass);
  const type = String(item.weaponType || item.subclassName || '').toLowerCase();
  const name = String(item.name || '').toLowerCase();
  return sub === 16 || type.includes('thrown') || /\b(thrown|throwing axe|throwing knife|throwing spear|shuriken)\b/i.test(name);
}

export function isFishingPole(item) {
  if (!item) return false;
  const sub = Number(item.subclass);
  const type = String(item.weaponType || item.subclassName || '').toLowerCase();
  const name = String(item.name || '').toLowerCase();
  return sub === 20 || type.includes('fishing pole') || /\bfishing pole\b/i.test(name);
}

// -----------------------------------------------------------------------------
// 2. Stat Parsing & Effective Level Calculation
// -----------------------------------------------------------------------------

export function parseItem17Stats(item) {
  const res = {
    reqLevel: 0,
    iLvl: 0,
    dps: 0,
    speed: 0,
    armor: 0,
    block: 0,
    strength: 0,
    agility: 0,
    stamina: 0,
    intellect: 0,
    spirit: 0,
    attackPower: 0,
    crit: 0,
    hit: 0,
    spellDamage: 0,
    healing: 0,
    mp5: 0
  };

  if (!item) return res;

  const directKeys = ['reqLevel', 'iLvl', 'dps', 'speed', 'armor', 'block', 'strength', 'agility', 'stamina', 'intellect', 'spirit', 'attackPower', 'crit', 'hit', 'spellDamage', 'healing', 'mp5'];
  for (const k of directKeys) {
    if (typeof item[k] === 'number' && !Number.isNaN(item[k])) res[k] = item[k];
  }

  if (typeof item.dps === 'string') {
    const m = item.dps.match(/([\d.]+)/);
    if (m) res.dps = parseFloat(m[1]) || 0;
  }
  if (typeof item.speed === 'string') {
    const m = item.speed.match(/([\d.]+)/);
    if (m) res.speed = parseFloat(m[1]) || 0;
  }

  const combinedText = [
    item.stats || '',
    item.value || '',
    Array.isArray(item.lines) ? item.lines.join(' ') : '',
    Array.isArray(item.procs) ? item.procs.join(' ') : '',
    Array.isArray(item.equips) ? item.equips.join(' ') : ''
  ].join(' ');

  if (!res.strength) {
    const m = combinedText.match(/\+(\d+)\s+Strength/i);
    if (m) res.strength = parseInt(m[1], 10);
  }
  if (!res.agility) {
    const m = combinedText.match(/\+(\d+)\s+Agility/i);
    if (m) res.agility = parseInt(m[1], 10);
  }
  if (!res.stamina) {
    const m = combinedText.match(/\+(\d+)\s+Stamina/i);
    if (m) res.stamina = parseInt(m[1], 10);
  }
  if (!res.intellect) {
    const m = combinedText.match(/\+(\d+)\s+Intellect/i);
    if (m) res.intellect = parseInt(m[1], 10);
  }
  if (!res.spirit) {
    const m = combinedText.match(/\+(\d+)\s+Spirit/i);
    if (m) res.spirit = parseInt(m[1], 10);
  }
  if (!res.attackPower) {
    const m = combinedText.match(/\+?(\d+)\s+Attack Power/i);
    if (m) res.attackPower = parseInt(m[1], 10);
  }
  if (!res.crit) {
    const m = combinedText.match(/(\d+)%\s+chance to get a critical strike|(\d+)%?\s+Crit/i);
    if (m) res.crit = parseInt(m[1] || m[2], 10);
  }
  if (!res.hit) {
    const m = combinedText.match(/(\d+)%\s+chance to hit|(\d+)%?\s+Hit/i);
    if (m) res.hit = parseInt(m[1] || m[2], 10);
  }
  if (!res.spellDamage) {
    const spEquipM = combinedText.match(/Increases damage and healing done by magical spells and effects by up to\s+(\d+)/i);
    const spTokenM = combinedText.match(/\+(\d+)\s*(?:Spell Power|Spell Damage)/i);
    const spVal = spEquipM ? parseInt(spEquipM[1], 10) : (spTokenM ? parseInt(spTokenM[1], 10) : 0);
    if (spVal) {
      res.spellDamage = spVal;
      if (!res.healing) res.healing = spVal;
    }
  }
  if (!res.healing) {
    const healM = combinedText.match(/(?:Increases healing done by spells and effects by up to|\+)\s*(\d+)\s*Healing/i);
    if (healM) res.healing = parseInt(healM[1], 10);
  }
  if (!res.mp5) {
    const mp5M = combinedText.match(/(\d+)\s*mana per 5 sec|\+(\d+)\s*MP5|\b(\d+)\s*MP5\b/i);
    if (mp5M) res.mp5 = parseInt(mp5M[1] || mp5M[2] || mp5M[3], 10);
  }
  if (!res.armor) {
    const armM = combinedText.match(/(?:^|[^\w])(\d[\d,]*)\s+Armor\b(?!\s+by)/i);
    if (armM) res.armor = parseInt(armM[1].replace(/,/g, ''), 10);
  }
  if (!res.block) {
    const blkM = combinedText.match(/\b(\d+)\s+Block\b/i);
    if (blkM) res.block = parseInt(blkM[1], 10);
  }

  for (const k of Object.keys(res)) {
    if (Number.isNaN(res[k])) res[k] = 0;
  }
  return res;
}

export function detectDungeonFloor(item) {
  if (!item) return null;
  const id = Number(item.id || item.itemId);
  if (SPECIFIC_ITEM_GATING[id]?.effectiveLevel) {
    return { minEnter: 0, practical: SPECIFIC_ITEM_GATING[id].effectiveLevel, code: 'GATED' };
  }

  // Check sourcemore zone IDs
  if (Array.isArray(item.sourcemore)) {
    for (const sm of item.sourcemore) {
      if (sm.z && DUNGEON_ZONE_MAP[sm.z]) {
        return DUNGEON_ZONE_MAP[sm.z];
      }
      if (sm.n) {
        const lowerBoss = String(sm.n).toLowerCase().trim();
        if (BOSS_TO_DUNGEON_MAP[lowerBoss]) return BOSS_TO_DUNGEON_MAP[lowerBoss];
      }
    }
  }

  // Check text content
  const combined = [
    item.name || '',
    item.value || '',
    typeof item.source === 'string' ? item.source : (item.source?.title || '') + ' ' + (item.source?.detail || '') + ' ' + (item.source?.text || '')
  ].join(' ').toLowerCase();

  for (const [bossName, floor] of Object.entries(BOSS_TO_DUNGEON_MAP)) {
    if (combined.includes(bossName)) return floor;
  }

  for (const [dungeonKey, floor] of Object.entries(DUNGEON_FLOORS)) {
    if (combined.includes(dungeonKey)) return floor;
  }

  return null;
}

export function calculateItemEffectiveLevel(item, isOffHand = false, classId = null) {
  if (!item) return 1;
  const id = Number(item.id || item.itemId);
  if (SPECIFIC_ITEM_GATING[id]?.effectiveLevel) {
    return SPECIFIC_ITEM_GATING[id].effectiveLevel;
  }

  const reqLevel = Number(item.reqLevel || item.reqlevel || 0);
  let questReqLevel = Number(item.questReqLevel || 0);

  const dungeonFloor = detectDungeonFloor(item);
  const dungeonMinEnterLevel = dungeonFloor ? dungeonFloor.minEnter : 0;
  const dungeonPracticalLevel = dungeonFloor ? dungeonFloor.practical : 0;

  // Weapon trainer floors
  let trainerFloorLevel = item.trainerFloorLevel ? Number(item.trainerFloorLevel) : 0;
  const sub = Number(item.subclass);
  const subName = String(item.subclassName || item.weaponType || '').toLowerCase();
  const isShield = item.weaponType === 'Shield' || isShieldItem(item);
  const isHeldInOffhand = item.weaponType === 'Held In Off-hand' || subName.includes('held in off-hand');
  const isPolearm = !isShield && (item.weaponType === 'Polearm' || subName.includes('polearm') || (sub === 6 && item.weaponType !== 'Shield' && !isShield));

  if (isPolearm) {
    trainerFloorLevel = Math.max(trainerFloorLevel, 20);
  }

  if (isOffHand && !isShield && !isHeldInOffhand && (classId === 'warrior' || classId === 'hunter')) {
    trainerFloorLevel = Math.max(trainerFloorLevel, 20);
  }

  const computed = Math.max(reqLevel, questReqLevel, dungeonMinEnterLevel, dungeonPracticalLevel, trainerFloorLevel);
  return Math.min(60, Math.max(1, computed || 1));
}

// -----------------------------------------------------------------------------
// 3. Human-Tuned Leveling Stat Weights (5 Roles)
// -----------------------------------------------------------------------------

export function calculateLevelingStatWeight(item, role, playerLevel = 30) {
  const stats = parseItem17Stats(item);
  const speed = stats.speed || (typeof item.speed === 'string' ? parseFloat(item.speed) : 2.50) || 2.50;
  const dps = stats.dps || (typeof item.dps === 'string' ? parseFloat(item.dps) : 0) || 0;

  let score;

  switch (role) {
    case 'melee_dps':
      // Warrior / Rogue Main Hand: instant attack weapon damage + slow speed bias (MS, Overpower, Sinister Strike)
      score = (dps * 12.0) +
              (speed >= 3.0 ? speed * 15.0 : (speed >= 2.6 ? speed * 10.0 : speed * 4.0)) +
              (stats.strength * 1.5) +
              (stats.agility * 1.3) +
              (stats.attackPower * 0.7) +
              (stats.crit * 10.0) +
              (stats.hit * 8.0) +
              (stats.stamina * 0.8);
      // Penalize pure caster weapons
      if ((stats.spellDamage > 0 || stats.healing > 0) && stats.strength === 0 && stats.agility === 0 && stats.attackPower === 0) {
        score *= 0.15;
      }
      break;

    case 'rogue_offhand':
      // Fast speed bias (poison application)
      score = (dps * 9.0) +
              (speed <= 1.80 ? (2.20 - speed) * 20.0 : 0) +
              Math.max(0, (2.60 - speed) * 12.0) +
              (stats.agility * 1.5) +
              (stats.strength * 1.0) +
              (stats.attackPower * 0.6) +
              (stats.crit * 10.0) +
              (stats.hit * 8.0) +
              (stats.stamina * 0.8);
      break;

    case 'hunter':
      // Slow swing speed for Aimed/Multi-shot volley scaling + Agi
      score = (dps * 14.0) +
              (speed >= 2.60 ? speed * 14.0 : speed * 5.0) +
              Math.max(0, (speed - 2.50) * 16.0) +
              (stats.agility * 2.0) +
              (stats.attackPower * 0.8) +
              (stats.stamina * 1.0) +
              (stats.intellect * 0.4) +
              (stats.crit * 10.0) +
              (stats.hit * 8.0);
      break;

    case 'caster_dps':
      // Levels 1–30: Wand DPS + Spirit (5SR mana regen) + Int
      // Levels 31–60: Spell Power + Spell Hit/Crit + Int
      if (playerLevel <= 30) {
        score = (dps * 16.0) +
                (stats.spirit * 2.5) +
                (stats.intellect * 1.6) +
                (stats.spellDamage * 1.2) +
                (stats.stamina * 0.6);
      } else {
        score = (stats.spellDamage * 8.0) +
                (stats.crit * 10.0) +
                (stats.hit * 12.0) +
                (stats.intellect * 1.8) +
                (stats.spirit * 1.0) +
                (stats.stamina * 0.7) +
                (dps * 2.0);
      }
      break;

    case 'caster_wand':
      // Dedicated wand progression
      score = (dps * (playerLevel <= 30 ? 18.0 : 8.0)) +
              (stats.spirit * 2.0) +
              (stats.intellect * 1.5) +
              (stats.spellDamage * 2.0) +
              (stats.stamina * 0.6);
      break;

    case 'healer':
      // Healing Power, MP5, Spirit, Int
      score = (stats.healing * 2.5) +
              (stats.mp5 * 8.0) +
              (stats.spirit * 2.0) +
              (stats.intellect * 1.5) +
              (stats.spellDamage * 0.6) +
              (stats.stamina * 0.6);
      break;

    case 'tank':
    case 'tank_shield':
      // Shield Armor, Block Value, Sta, Defense
      score = (stats.block * 3.0) +
              (stats.armor * 0.15) +
              (stats.stamina * 2.0) +
              (stats.strength * 0.8) +
              (stats.agility * 0.7) +
              (speed <= 2.0 ? (2.5 - speed) * 10.0 : 0) +
              (dps * 4.0);
      break;

    case 'tank_1h':
      // Fast 1H weapon for Heroic Strike rage dumping
      score = (dps * 9.0) +
              Math.max(0, (2.60 - speed) * 12.0) +
              (stats.stamina * 1.6) +
              (stats.strength * 1.0) +
              (stats.agility * 0.8);
      break;

    default:
      score = (dps * 10.0) + stats.strength + stats.agility + stats.intellect;
  }

  return Math.round(score * 10) / 10;
}

// -----------------------------------------------------------------------------
// 4. Strict Class Equipment Validation
// -----------------------------------------------------------------------------

let _globalCache = null;
export function getGlobalCache() {
  if (!_globalCache && fs.existsSync(CACHE_PATH)) {
    try {
      _globalCache = JSON.parse(fs.readFileSync(CACHE_PATH, 'utf8'));
    } catch {
      _globalCache = {};
    }
  }
  return _globalCache || {};
}

export const TEST_ITEM_REGEX = /\b(test|foo|dnt|monster|copy|deprecated|debug)\b/i;

export function isTestItem(item) {
  if (!item) return false;
  const id = Number(item.id || item.itemId);
  if (id === 7170 || id === 215235) return true;
  const name = String(item.name || '');
  if (TEST_ITEM_REGEX.test(name)) return true;
  if (name.startsWith('(DNT)') || name.startsWith('Monster -') || name.includes('Test Ranged') || name.includes("Tim's Test")) return true;
  const q = item.quality;
  if (q === 0 || q === 'q0' || q === '0') return true;
  return false;
}

export function isItemAllowedForClass(item, classId, trackId = 'primary') {
  if (!item) return false;
  const cls = String(classId).toLowerCase();

  // Developer test / debug items NEVER allowed
  if (isTestItem(item)) return false;

  // Combat weapons NEVER include fishing poles
  if (isFishingPole(item)) return false;

  // Shields NEVER in weapon tracks
  if (isShieldItem(item)) return false;

  // Enforce classRestriction
  const cache = getGlobalCache();
  const id = Number(item.id || item.itemId);
  const classRestriction = item.classRestriction || (id && cache[String(id)]?.classRestriction);
  if (classRestriction) {
    const rLower = String(classRestriction).toLowerCase();
    if (!rLower.includes(cls)) return false;
  }

  // Paladin: 0 axes (1H or 2H), 0 daggers, 0 staves, 0 ranged/wands, 0 fist, 0 thrown. 100% Alliance only (0 horde items).
  if (cls === 'paladin') {
    if (item.faction === 'horde' || item.side === 2) return false;
    if (isAxeWeapon(item)) return false;
    if (isStaffWeapon(item)) return false;
    if (isRangedWeapon(item)) return false;
    if (isWandWeapon(item)) return false;
    if (isFistWeapon(item)) return false;
    if (isThrownWeapon(item)) return false;
    if (item.subclass === 15 || String(item.weaponType).toLowerCase().includes('dagger')) return false;
    // 2H DPS track: must be 2H weapon (2H Sword, 2H Mace, Polearm)
    if (trackId === 'dps' || trackId === 'primary') {
      if (!is2HWeapon(item)) return false;
    }
  }

  // Hunter ranged track: 100% ranged (Bows, Crossbows, Guns); 0 melee weapons!
  if (cls === 'hunter') {
    if (trackId === 'primary' || trackId === 'ranged') {
      if (!isRangedWeapon(item)) return false;
    }
  }

  // Shaman: 0 swords (1H or 2H), 0 polearms, 0 ranged/wands. 100% Horde only.
  if (cls === 'shaman') {
    if (isSwordWeapon(item)) return false;
    if (item.subclass === 6 || String(item.weaponType).toLowerCase().includes('polearm')) return false;
    if (isRangedWeapon(item)) return false;
    if (isWandWeapon(item)) return false;
    if (item.faction === 'alliance' || item.side === 1) return false;
  }

  // Rogue: 0 two-handed weapons, 0 axes, 0 staves/polearms, 0 wands
  if (cls === 'rogue') {
    if (is2HWeapon(item)) return false;
    if (isAxeWeapon(item)) return false;
    if (isStaffWeapon(item)) return false;
    if (item.subclass === 6 || String(item.weaponType).toLowerCase().includes('polearm')) return false;
    if (isWandWeapon(item)) return false;
  }

  // Druid: 0 swords, 0 axes, 0 ranged/wands, 0 thrown
  if (cls === 'druid') {
    if (isSwordWeapon(item)) return false;
    if (isAxeWeapon(item)) return false;
    if (isRangedWeapon(item)) return false;
    if (isWandWeapon(item)) return false;
    if (isThrownWeapon(item)) return false;
  }

  // Priest: 0 swords, 0 axes, 0 2H maces, 0 polearms, 0 ranged, 0 fist, 0 thrown
  if (cls === 'priest') {
    if (isSwordWeapon(item)) return false;
    if (isAxeWeapon(item)) return false;
    if (is2HWeapon(item) && isMaceWeapon(item)) return false;
    if (item.subclass === 6 || String(item.weaponType).toLowerCase().includes('polearm')) return false;
    if (isRangedWeapon(item)) return false;
    if (isFistWeapon(item)) return false;
    if (isThrownWeapon(item)) return false;
  }

  // Mage / Warlock: 0 maces, 0 axes, 0 2H swords, 0 polearms, 0 ranged, 0 fist, 0 thrown
  if (cls === 'mage' || cls === 'warlock') {
    if (isMaceWeapon(item)) return false;
    if (isAxeWeapon(item)) return false;
    if (is2HWeapon(item) && isSwordWeapon(item)) return false;
    if (item.subclass === 6 || String(item.weaponType).toLowerCase().includes('polearm')) return false;
    if (isRangedWeapon(item)) return false;
    if (isFistWeapon(item)) return false;
    if (isThrownWeapon(item)) return false;
  }

  // Warrior: 0 wands
  if (cls === 'warrior') {
    if (isWandWeapon(item)) return false;
  }

  return true;
}

export function isOffhandAllowedForClass(item, classId, isShield) {
  if (!item) return false;
  const cls = String(classId).toLowerCase();

  // Developer test / debug items NEVER allowed
  if (isTestItem(item)) return false;

  // Enforce classRestriction
  const cache = getGlobalCache();
  const id = Number(item.id || item.itemId);
  const classRestriction = item.classRestriction || (id && cache[String(id)]?.classRestriction);
  if (classRestriction) {
    const rLower = String(classRestriction).toLowerCase();
    if (!rLower.includes(cls)) return false;
  }

  if (isShield) {
    if (!isShieldItem(item)) return false;
    if (cls === 'paladin' && (item.faction === 'horde' || item.side === 2)) return false;
    if (cls === 'shaman' && (item.faction === 'alliance' || item.side === 1)) return false;
    return true;
  } else {
    if (isShieldItem(item)) return false;
    if (cls === 'paladin' && (item.faction === 'horde' || item.side === 2)) return false;
    if (cls === 'shaman' && (item.faction === 'alliance' || item.side === 1)) return false;
    return true;
  }
}

// -----------------------------------------------------------------------------
// 5. Canonical Item Source Formatting
// -----------------------------------------------------------------------------

export function formatCanonicalSource(item, dungeonFloor = null) {
  const dFloor = dungeonFloor || detectDungeonFloor(item);
  if (dFloor) {
    const bossName = item.sourcemore?.find(s => BOSS_TO_DUNGEON_MAP[String(s.n || '').toLowerCase().trim()])?.n || item.source?.title || 'Dungeon Boss';
    const zoneName = dFloor.name;
    return {
      kind: 'dungeon_drop',
      title: bossName,
      detail: `${zoneName} (Dungeon Drop)`,
      text: `${bossName} (${zoneName})`
    };
  }

  // Quests
  const smQuest = item.sourcemore?.find(s => s.t === 5);
  const rawText = ((item.source?.title || '') + ' ' + (item.source?.detail || '') + ' ' + (item.value || '')).toLowerCase();
  if (smQuest || /quest|reward|wanted:|in the name of|chain\b/i.test(rawText)) {
    const qName = smQuest?.n || item.source?.title || 'Quest Reward';
    return {
      kind: 'quest',
      title: qName,
      detail: 'Leveling Quest Reward',
      text: qName
    };
  }

  // Crafted
  if (item.sourcemore?.some(s => s.t === 6) || /blacksmithing|engineering|leatherworking|tailoring|crafted/i.test(rawText)) {
    const profName = /blacksmithing/i.test(rawText) ? 'Blacksmithing' : (/engineering/i.test(rawText) ? 'Engineering' : 'Crafted');
    return {
      kind: 'crafted',
      title: profName,
      detail: 'Profession Craft',
      text: `Crafted (${profName})`
    };
  }

  // Vendor
  if (/vendor|purchased|sold by|merchant|provisioner/i.test(rawText)) {
    return {
      kind: 'vendor',
      title: 'Weapon Vendor',
      detail: 'Vendor Purchase',
      text: 'Vendor Purchase'
    };
  }

  // World Drop
  return {
    kind: 'world_drop',
    title: item.quality === 'q4' ? 'World Drop Epic' : (item.quality === 'q3' ? 'Rare World Drop' : 'Zone Drop'),
    detail: 'World Drop / Rare Mob',
    text: item.quality === 'q4' ? 'World Drop Epic' : 'Zone Drop / Rare Mob'
  };
}

// -----------------------------------------------------------------------------
// 6. Master Ingestion Engine
// -----------------------------------------------------------------------------

export function runMasterProgressionEngine() {
  console.log('[Engine] Step 1: Ingesting cache and datamined catalogs...');

  const cache = getGlobalCache();

  const rawWeapons = JSON.parse(fs.readFileSync(WEAPONS_RAW_PATH, 'utf8'));
  const rawShields = JSON.parse(fs.readFileSync(SHIELDS_RAW_PATH, 'utf8'));
  const rawOffhands = JSON.parse(fs.readFileSync(OFFHANDS_RAW_PATH, 'utf8'));

  console.log(`[Engine] Catalogs loaded: ${rawWeapons.length} weapons, ${rawShields.length} shields, ${rawOffhands.length} off-hands.`);

  const weaponsById = new Map();
  const shieldsById = new Map();
  const offhandsById = new Map();

  function ingestWeapon(item) {
    if (isTestItem(item)) return;
    const id = Number(item.id);
    if (!id || id <= 0) return;

    const cached = cache[String(id)] || {};
    if (isTestItem(cached)) return;

    const sub = item.subclass !== undefined ? item.subclass : cached.subclass;
    const name = cached.name || item.name;

    let subName = SUBCLASS_NAMES[sub];
    const lowerName = String(name || '').toLowerCase();
    if (sub === 2 || (lowerName.includes('bow') && !lowerName.includes('crossbow'))) {
      subName = 'Bow';
    } else if (sub === 3 || /\b(gun|rifle|blaster|shotgun|musket|boomstick|shooter|repeater|cannon|hand cannon|street sweeper)\b/i.test(lowerName)) {
      subName = 'Gun';
    } else if (sub === 18 || lowerName.includes('crossbow')) {
      subName = 'Crossbow';
    } else if (!subName) {
      subName = cached.weaponType || cached.subclassName || 'Weapon';
    }

    const rawIcon = cached.icon || item.appearances?.['0']?.[1] || item.icon || 'inv_misc_questionmark';
    const icon = String(rawIcon).replace(/\.(jpg|png|webp)$/i, '').replace(/^.*[\\/]/, '').toLowerCase().trim();

    const quality = cached.quality || (typeof item.quality === 'number' ? `q${item.quality}` : 'q2');
    const reqLevel = cached.reqLevel !== undefined && cached.reqLevel !== null ? cached.reqLevel : (item.reqlevel || 1);
    const iLvl = cached.iLvl || item.level || (reqLevel + 5);

    const speed = cached.speed || (item.speed ? Number(item.speed).toFixed(2) : null);
    let dps = cached.dps;
    if (!dps && item.dps) {
      dps = `${Number(item.dps).toFixed(1)} DPS`;
    }

    const side = item.side !== undefined ? item.side : (cached.side !== undefined ? cached.side : (item.faction === 'alliance' ? 1 : (item.faction === 'horde' ? 2 : 3)));
    const faction = side === 1 ? 'alliance' : (side === 2 ? 'horde' : 'both');
    const classRestriction = item.classRestriction || cached.classRestriction || null;
    const dFloor = detectDungeonFloor(item);
    const effLevel = calculateItemEffectiveLevel({ ...item, reqLevel, subclass: sub, weaponType: subName, classRestriction, side, faction }, false, null);
    const source = formatCanonicalSource(item, dFloor);

    const parsedObj = {
      itemId: id,
      id,
      name,
      icon,
      weaponType: subName,
      subclass: sub,
      subclassName: subName,
      quality,
      iLvl,
      reqLevel,
      effectiveLevel: effLevel,
      speed,
      dps: dps || null,
      stats: cached.stats || '',
      armor: cached.armor || 0,
      block: cached.block || 0,
      lines: cached.lines || [subName, `Requires Level ${reqLevel}`],
      source,
      faction,
      side,
      classRestriction,
      sourcemore: item.sourcemore || cached.sourcemore || null
    };

    weaponsById.set(id, parsedObj);
  }

  function ingestShield(item) {
    if (isTestItem(item)) return;
    const id = Number(item.id);
    if (!id || id <= 0) return;

    const cached = cache[String(id)] || {};
    if (isTestItem(cached)) return;

    const name = cached.name || item.name;
    const rawIcon = cached.icon || item.appearances?.['0']?.[1] || item.icon || 'inv_misc_questionmark';
    const icon = String(rawIcon).replace(/\.(jpg|png|webp)$/i, '').replace(/^.*[\\/]/, '').toLowerCase().trim();

    const quality = cached.quality || (typeof item.quality === 'number' ? `q${item.quality}` : 'q2');
    const reqLevel = cached.reqLevel !== undefined && cached.reqLevel !== null ? cached.reqLevel : (item.reqlevel || 1);
    const iLvl = cached.iLvl || item.level || (reqLevel + 5);

    const side = item.side !== undefined ? item.side : (cached.side !== undefined ? cached.side : (item.faction === 'alliance' ? 1 : (item.faction === 'horde' ? 2 : 3)));
    const faction = side === 1 ? 'alliance' : (side === 2 ? 'horde' : 'both');
    const classRestriction = item.classRestriction || cached.classRestriction || null;
    const dFloor = detectDungeonFloor(item);
    const effLevel = calculateItemEffectiveLevel({ ...item, reqLevel, subclass: 6, weaponType: 'Shield', classRestriction, side, faction }, false, null);
    const source = formatCanonicalSource(item, dFloor);

    const parsedObj = {
      itemId: id,
      id,
      name,
      icon,
      weaponType: 'Shield',
      subclass: 6,
      subclassName: 'Shield',
      quality,
      iLvl,
      reqLevel,
      effectiveLevel: effLevel,
      speed: null,
      dps: null,
      stats: cached.stats || '',
      armor: cached.armor || 0,
      block: cached.block || 0,
      lines: cached.lines || ['Shield', `Requires Level ${reqLevel}`],
      source,
      faction,
      side,
      classRestriction,
      sourcemore: item.sourcemore || cached.sourcemore || null
    };

    shieldsById.set(id, parsedObj);
  }

  function ingestOffhand(item) {
    if (isTestItem(item)) return;
    const id = Number(item.id);
    if (!id || id <= 0) return;

    const cached = cache[String(id)] || {};
    if (isTestItem(cached)) return;

    const name = cached.name || item.name;
    const rawIcon = cached.icon || item.appearances?.['0']?.[1] || item.icon || 'inv_misc_questionmark';
    const icon = String(rawIcon).replace(/\.(jpg|png|webp)$/i, '').replace(/^.*[\\/]/, '').toLowerCase().trim();

    const quality = cached.quality || (typeof item.quality === 'number' ? `q${item.quality}` : 'q2');
    const reqLevel = cached.reqLevel !== undefined && cached.reqLevel !== null ? cached.reqLevel : (item.reqlevel || 1);
    const iLvl = cached.iLvl || item.level || (reqLevel + 5);

    const side = item.side !== undefined ? item.side : (cached.side !== undefined ? cached.side : (item.faction === 'alliance' ? 1 : (item.faction === 'horde' ? 2 : 3)));
    const faction = side === 1 ? 'alliance' : (side === 2 ? 'horde' : 'both');
    const classRestriction = item.classRestriction || cached.classRestriction || null;
    const dFloor = detectDungeonFloor(item);
    const effLevel = calculateItemEffectiveLevel({ ...item, reqLevel, subclass: 0, weaponType: 'Held In Off-hand', classRestriction, side, faction }, false, null);
    const source = formatCanonicalSource(item, dFloor);

    const parsedObj = {
      itemId: id,
      id,
      name,
      icon,
      weaponType: 'Held In Off-hand',
      subclass: 0,
      subclassName: 'Held In Off-hand',
      quality,
      iLvl,
      reqLevel,
      effectiveLevel: effLevel,
      speed: null,
      dps: null,
      stats: cached.stats || '',
      armor: cached.armor || 0,
      block: 0,
      lines: cached.lines || ['Held In Off-hand', `Requires Level ${reqLevel}`],
      source,
      faction,
      side,
      classRestriction,
      sourcemore: item.sourcemore || cached.sourcemore || null
    };

    offhandsById.set(id, parsedObj);
  }

  for (const w of rawWeapons) ingestWeapon(w);
  for (const s of rawShields) ingestShield(s);
  for (const o of rawOffhands) ingestOffhand(o);

  console.log(`[Engine] Total indexed valid items: ${weaponsById.size} weapons, ${shieldsById.size} shields, ${offhandsById.size} off-hands.`);

  // ---------------------------------------------------------------------------
  // Step 2: Build Weapons Progression
  // ---------------------------------------------------------------------------
  console.log('[Engine] Step 2: Building 1–60 Weapons Progression dataset...');

  const existingWeapons = JSON.parse(fs.readFileSync(OUT_WEAPONS_PATH, 'utf8'));
  const updatedWeapons = {};

  const CLASS_TRACK_CONFIGS = {
    warrior: {
      primaryRole: 'melee_dps',
      tankRole: 'tank_1h',
      tracks: [
        { id: 'primary', name: 'Two-Handed Path (Arms / Fury)' },
        { id: 'tank', name: '🛡️ Protection & Tanking (1-Handed Swords / Axes / Maces)' }
      ]
    },
    paladin: {
      dpsRole: 'melee_dps',
      healerRole: 'healer',
      tracks: [
        { id: 'dps', name: '⚔️ DPS Track (Retribution Path (Two-Handed Swords & Maces))' },
        { id: 'healer', name: '💚 Healer Track (Restoration & Holy +Healing Focus)' }
      ]
    },
    hunter: {
      primaryRole: 'hunter',
      tracks: [
        { id: 'primary', name: 'Ranged Progression (Bows / Guns / Crossbows)' }
      ]
    },
    rogue: {
      primaryRole: 'melee_dps',
      tracks: [
        { id: 'primary', name: 'One-Handed & Daggers (Combat / Subtlety)' }
      ]
    },
    shaman: {
      dpsRole: 'melee_dps',
      healerRole: 'healer',
      tracks: [
        { id: 'dps', name: '⚔️ DPS Track (Enhancement & Elemental (Two-Hand & Staves))' },
        { id: 'healer', name: '💚 Healer Track (Restoration & Holy +Healing Focus)' }
      ]
    },
    mage: {
      primaryRole: 'caster_dps',
      tracks: [
        { id: 'primary', name: 'Staves & Spellblades (Frost / Fire / Arcane)' }
      ]
    },
    warlock: {
      primaryRole: 'caster_dps',
      tracks: [
        { id: 'primary', name: 'Staves & Spellblades (Affliction / Demonology / Destruction)' }
      ]
    },
    priest: {
      dpsRole: 'caster_dps',
      healerRole: 'healer',
      tracks: [
        { id: 'dps', name: '⚔️ DPS Track (Shadow & Smite (Staves & Daggers))' },
        { id: 'healer', name: '💚 Healer Track (Restoration & Holy +Healing Focus)' }
      ]
    },
    druid: {
      dpsRole: 'melee_dps',
      healerRole: 'healer',
      tracks: [
        { id: 'dps', name: '⚔️ DPS Track (Feral & Balance (Staves & Two-Handed Maces))' },
        { id: 'healer', name: '💚 Healer Track (Restoration & Holy +Healing Focus)' }
      ]
    }
  };

  function parseBracketBounds(bracketStr) {
    const parts = bracketStr.split(/[–-]/).map(s => parseInt(s.trim(), 10));
    return { min: parts[0] || 1, max: parts[1] || parts[0] || 60 };
  }

  function processTrackLevels(rawLevels, classId, trackId, role, maxAlts = 14) {
    if (!Array.isArray(rawLevels)) return [];

    const classCandidates = Array.from(weaponsById.values()).filter(it => isItemAllowedForClass(it, classId, trackId));
    const usedIdsInTrack = new Set();

    return rawLevels.map(step => {
      const { min, max } = parseBracketBounds(step.levelBracket);
      const midLevel = Math.round((min + max) / 2);

      const eligibleForBracket = classCandidates.filter(it => {
        const eff = it.effectiveLevel;
        return eff >= min && eff <= max;
      });

      const scoredItems = eligibleForBracket.map(it => ({
        ...it,
        score: calculateLevelingStatWeight(it, role, midLevel),
        effectiveLevel: it.effectiveLevel
      }));

      // Include existing curated primary and alts if legal
      const existingItems = [step, ...(step.alts || [])];
      for (const ex of existingItems) {
        if (!ex || !ex.itemId) continue;
        const catalogItem = weaponsById.get(ex.itemId);
        if (!catalogItem || !isItemAllowedForClass(catalogItem, classId, trackId)) continue;
        if (!scoredItems.some(s => s.itemId === ex.itemId)) {
          const eff = catalogItem.effectiveLevel;
          if (eff >= min && eff <= max) {
            scoredItems.push({
              ...catalogItem,
              score: calculateLevelingStatWeight(catalogItem, role, midLevel),
              effectiveLevel: eff
            });
          }
        }
      }

      scoredItems.sort((a, b) => (b.score || 0) - (a.score || 0) || (b.itemId || 0) - (a.itemId || 0));

      if (scoredItems.length === 0) {
        const fallback = classCandidates
          .filter(it => it.effectiveLevel <= max)
          .map(it => ({ ...it, score: calculateLevelingStatWeight(it, role, midLevel), effectiveLevel: it.effectiveLevel }))
          .sort((a, b) => (b.score || 0) - (a.score || 0));
        if (fallback.length > 0) scoredItems.push(fallback[0]);
      }

      const topItem = scoredItems[0] || {
        itemId: step.itemId || 0,
        name: step.name || 'Leveling Weapon',
        effectiveLevel: min,
        weaponType: 'One-Handed Sword',
        score: 10
      };

      usedIdsInTrack.add(topItem.itemId);

      const hero = {
        levelBracket: step.levelBracket,
        itemId: topItem.itemId,
        name: topItem.name,
        icon: topItem.icon || 'inv_misc_questionmark',
        weaponType: topItem.weaponType || 'Weapon',
        speed: topItem.speed || null,
        dps: topItem.dps || null,
        quality: topItem.quality || 'q2',
        iLvl: topItem.iLvl || (min + 5),
        reqLevel: topItem.reqLevel || min,
        effectiveLevel: topItem.effectiveLevel || min,
        score: topItem.score || 0,
        rank: 1,
        isTopPick: true,
        stats: topItem.stats || '',
        lines: topItem.lines || [`Requires Level ${topItem.reqLevel || min}`],
        source: topItem.source || { kind: 'world_drop', text: 'Leveling Drop' },
        faction: topItem.faction || 'both'
      };

      const remainingCandidates = scoredItems.filter(it => it.itemId !== hero.itemId);

      // Prioritize distinct items not yet used in previous brackets to maximize class unique weapon coverage
      remainingCandidates.sort((a, b) => {
        const aUsed = usedIdsInTrack.has(a.itemId) ? 1 : 0;
        const bUsed = usedIdsInTrack.has(b.itemId) ? 1 : 0;
        if (aUsed !== bUsed) return aUsed - bUsed;
        return (b.score || 0) - (a.score || 0);
      });

      const selectedAlts = remainingCandidates.slice(0, maxAlts);

      const allAlts = selectedAlts.map((it, idx) => {
        usedIdsInTrack.add(it.itemId);
        let valueStr = `${it.dps ? it.dps + ', ' : ''}${it.speed ? it.speed + 's, ' : ''}${it.weaponType} - ${it.source?.text || it.source?.title || 'Leveling Drop'}`;
        if (trackId === 'dps' || trackId === 'primary') {
          valueStr = valueStr.replace(/\bshield\b/gi, 'barrier');
        }

        return {
          itemId: it.itemId,
          name: it.name,
          icon: it.icon || 'inv_misc_questionmark',
          weaponType: it.weaponType || 'Weapon',
          speed: it.speed || null,
          dps: it.dps || null,
          quality: it.quality || 'q2',
          iLvl: it.iLvl || (min + 5),
          reqLevel: it.reqLevel || min,
          effectiveLevel: it.effectiveLevel || min,
          score: it.score || 0,
          rank: idx + 2,
          value: valueStr,
          stats: it.stats || '',
          lines: it.lines || [`Requires Level ${it.reqLevel || min}`],
          source: it.source || { kind: 'world_drop', text: 'Leveling Drop' },
          faction: it.faction || 'both'
        };
      });

      hero.alts = allAlts;
      hero.pool = allAlts.slice(5);

      return hero;
    });
  }

  for (const [classId, existingClassData] of Object.entries(existingWeapons)) {
    const cfg = CLASS_TRACK_CONFIGS[classId];
    if (!cfg) continue;

    console.log(`[Engine] Processing weapons for class: ${classId}...`);

    const updatedClass = {
      classId,
      tracks: cfg.tracks,
      levels: []
    };

    if (classId === 'warrior') {
      updatedClass.levels = processTrackLevels(existingClassData.levels, 'warrior', 'primary', cfg.primaryRole, 14);
      updatedClass.tracksData = {
        primary: updatedClass.levels,
        tank: processTrackLevels(existingClassData.tracksData?.tank || existingClassData.levels.slice(0, 10), 'warrior', 'tank', cfg.tankRole, 12)
      };
    } else if (cfg.healerRole) {
      updatedClass.levels = processTrackLevels(existingClassData.levels, classId, 'dps', cfg.dpsRole, 14);
      updatedClass.healingLevels = processTrackLevels(existingClassData.healingLevels, classId, 'healer', cfg.healerRole, 10);
    } else {
      updatedClass.levels = processTrackLevels(existingClassData.levels, classId, 'primary', cfg.primaryRole, classId === 'hunter' ? 18 : 14);
    }

    updatedWeapons[classId] = updatedClass;
  }

  // ---------------------------------------------------------------------------
  // Step 3: Build Off-Hands Progression (Shields & Caster Frills)
  // ---------------------------------------------------------------------------
  console.log('[Engine] Step 3: Building 1–60 Off-Hands Progression dataset...');

  const existingOffhands = JSON.parse(fs.readFileSync(OUT_OFFHANDS_PATH, 'utf8'));
  const updatedOffhands = {};

  const OFFHAND_CONFIGS = {
    warrior: { role: 'tank_shield', isShield: true },
    paladin: { dpsRole: 'tank_shield', healerRole: 'healer', isShield: true },
    shaman: { dpsRole: 'tank_shield', healerRole: 'healer', isShield: true },
    mage: { role: 'caster_dps', isShield: false },
    warlock: { role: 'caster_dps', isShield: false },
    priest: { dpsRole: 'caster_dps', healerRole: 'healer', isShield: false },
    druid: { dpsRole: 'caster_dps', healerRole: 'healer', isShield: false }
  };

  function processOffhandLevels(rawLevels, classId, role, isShield, maxAlts = 10) {
    if (!Array.isArray(rawLevels)) return [];

    const candidates = Array.from((isShield ? shieldsById : offhandsById).values())
      .filter(it => isOffhandAllowedForClass(it, classId, isShield));

    return rawLevels.map(step => {
      const { min, max } = parseBracketBounds(step.levelBracket);
      const midLevel = Math.round((min + max) / 2);

      const eligible = candidates.filter(it => {
        const eff = it.effectiveLevel;
        return eff >= min && eff <= max;
      });

      const scored = eligible.map(it => ({
        ...it,
        score: calculateLevelingStatWeight(it, role, midLevel),
        effectiveLevel: it.effectiveLevel
      }));

      const existingItems = [step, ...(step.alts || [])];
      for (const ex of existingItems) {
        if (!ex || !ex.itemId) continue;
        const cat = (isShield ? shieldsById : offhandsById).get(ex.itemId);
        if (!cat || !isOffhandAllowedForClass(cat, classId, isShield)) continue;
        if (!scored.some(s => s.itemId === ex.itemId)) {
          const eff = cat.effectiveLevel;
          if (eff >= min && eff <= max) {
            scored.push({
              ...cat,
              score: calculateLevelingStatWeight(cat, role, midLevel),
              effectiveLevel: eff
            });
          }
        }
      }

      scored.sort((a, b) => (b.score || 0) - (a.score || 0) || (b.itemId || 0) - (a.itemId || 0));

      if (scored.length === 0) {
        const fallback = candidates
          .filter(it => it.effectiveLevel <= max)
          .map(it => ({ ...it, score: calculateLevelingStatWeight(it, role, midLevel), effectiveLevel: it.effectiveLevel }))
          .sort((a, b) => (b.score || 0) - (a.score || 0));
        if (fallback.length > 0) scored.push(fallback[0]);
      }

      const topItem = scored[0] || {
        itemId: step.itemId || 0,
        name: step.name || 'Leveling Off-Hand',
        effectiveLevel: min,
        weaponType: isShield ? 'Shield' : 'Held In Off-hand',
        score: 10
      };

      const hero = {
        levelBracket: step.levelBracket,
        itemId: topItem.itemId,
        name: topItem.name,
        icon: topItem.icon || 'inv_misc_questionmark',
        weaponType: topItem.weaponType || (isShield ? 'Shield' : 'Held In Off-hand'),
        quality: topItem.quality || 'q2',
        iLvl: topItem.iLvl || (min + 5),
        reqLevel: topItem.reqLevel || min,
        effectiveLevel: topItem.effectiveLevel || min,
        score: topItem.score || 0,
        rank: 1,
        isTopPick: true,
        stats: topItem.stats || '',
        armor: topItem.armor || 0,
        block: topItem.block || 0,
        lines: topItem.lines || [`Requires Level ${topItem.reqLevel || min}`],
        source: topItem.source || { kind: 'world_drop', text: 'Leveling Drop' },
        faction: topItem.faction || 'both'
      };

      const remaining = scored.filter(it => it.itemId !== hero.itemId);
      const selectedAlts = remaining.slice(0, maxAlts);

      const allAlts = selectedAlts.map((it, idx) => ({
        itemId: it.itemId,
        name: it.name,
        icon: it.icon || 'inv_misc_questionmark',
        weaponType: it.weaponType || (isShield ? 'Shield' : 'Held In Off-hand'),
        quality: it.quality || 'q2',
        iLvl: it.iLvl || (min + 5),
        reqLevel: it.reqLevel || min,
        effectiveLevel: it.effectiveLevel || min,
        score: it.score || 0,
        rank: idx + 2,
        value: `${it.stats || (it.armor ? it.armor + ' Armor - ' : '')}${it.source?.text || it.source?.title || 'Leveling Drop'}`,
        stats: it.stats || '',
        armor: it.armor || 0,
        block: it.block || 0,
        lines: it.lines || [`Requires Level ${it.reqLevel || min}`],
        source: it.source || { kind: 'world_drop', text: 'Leveling Drop' },
        faction: it.faction || 'both'
      }));

      hero.alts = allAlts;
      hero.pool = allAlts.slice(5);

      return hero;
    });
  }

  for (const [classId, existingData] of Object.entries(existingOffhands)) {
    const cfg = OFFHAND_CONFIGS[classId];
    if (!cfg) continue;

    console.log(`[Engine] Processing off-hands for class: ${classId}...`);

    const updated = {
      role: existingData.role || (cfg.isShield ? 'Shields' : 'Off-Hands'),
      tracks: existingData.tracks || [],
      levels: []
    };

    if (cfg.healerRole) {
      updated.levels = processOffhandLevels(existingData.levels, classId, cfg.dpsRole, cfg.isShield, 10);
      updated.healingLevels = processOffhandLevels(existingData.healingLevels, classId, cfg.healerRole, cfg.isShield, 8);
    } else {
      updated.levels = processOffhandLevels(existingData.levels, classId, cfg.role, cfg.isShield, 10);
    }

    updatedOffhands[classId] = updated;
  }

  // ---------------------------------------------------------------------------
  // Step 4: Build Wands Progression
  // ---------------------------------------------------------------------------
  console.log('[Engine] Step 4: Building 1–60 Wands Progression dataset...');

  const existingWands = JSON.parse(fs.readFileSync(OUT_WANDS_PATH, 'utf8'));
  const updatedWands = {};

  function processWandLevels(rawLevels, classId, maxAlts = 8) {
    if (!Array.isArray(rawLevels)) return [];

    const wandCandidates = Array.from(weaponsById.values()).filter(it => {
      if (it.subclass !== 19 && it.weaponType !== 'Wand') return false;
      if (isTestItem(it)) return false;
      const restriction = it.classRestriction || cache[String(it.id || it.itemId)]?.classRestriction;
      if (restriction && !restriction.toLowerCase().includes(classId)) return false;
      return true;
    });

    return rawLevels.map(step => {
      const { min, max } = parseBracketBounds(step.levelBracket);
      const midLevel = Math.round((min + max) / 2);

      const eligible = wandCandidates.filter(it => {
        const eff = it.effectiveLevel;
        return eff >= min && eff <= max;
      });

      const scored = eligible.map(it => ({
        ...it,
        score: calculateLevelingStatWeight(it, 'caster_wand', midLevel),
        effectiveLevel: it.effectiveLevel
      }));

      const existingItems = [step, ...(step.alts || [])];
      for (const ex of existingItems) {
        if (!ex || !ex.itemId) continue;
        const cat = weaponsById.get(ex.itemId);
        if (!cat || (cat.subclass !== 19 && cat.weaponType !== 'Wand')) continue;
        if (isTestItem(cat)) continue;
        const restriction = cat.classRestriction || cache[String(cat.id || cat.itemId)]?.classRestriction;
        if (restriction && !restriction.toLowerCase().includes(classId)) continue;
        if (!scored.some(s => s.itemId === ex.itemId)) {
          const eff = cat.effectiveLevel;
          if (eff >= min && eff <= max) {
            scored.push({
              ...cat,
              score: calculateLevelingStatWeight(cat, 'caster_wand', midLevel),
              effectiveLevel: eff
            });
          }
        }
      }

      scored.sort((a, b) => (b.score || 0) - (a.score || 0) || (b.itemId || 0) - (a.itemId || 0));

      if (scored.length === 0) {
        const fallback = wandCandidates
          .filter(it => it.effectiveLevel <= max)
          .map(it => ({ ...it, score: calculateLevelingStatWeight(it, 'caster_wand', midLevel), effectiveLevel: it.effectiveLevel }))
          .sort((a, b) => (b.score || 0) - (a.score || 0));
        if (fallback.length > 0) scored.push(fallback[0]);
      }

      const topItem = scored[0] || {
        itemId: step.itemId || 0,
        name: step.name || 'Leveling Wand',
        effectiveLevel: min,
        weaponType: 'Wand',
        score: 10
      };

      const hero = {
        levelBracket: step.levelBracket,
        itemId: topItem.itemId,
        name: topItem.name,
        icon: topItem.icon || 'inv_misc_questionmark',
        weaponType: 'Wand',
        speed: topItem.speed || null,
        dps: topItem.dps || null,
        quality: topItem.quality || 'q2',
        iLvl: topItem.iLvl || (min + 5),
        reqLevel: topItem.reqLevel || min,
        effectiveLevel: topItem.effectiveLevel || min,
        score: topItem.score || 0,
        rank: 1,
        isTopPick: true,
        stats: topItem.stats || '',
        lines: topItem.lines || [`Requires Level ${topItem.reqLevel || min}`],
        source: topItem.source || { kind: 'world_drop', text: 'Leveling Drop' },
        faction: topItem.faction || 'both'
      };

      const remaining = scored.filter(it => it.itemId !== hero.itemId);
      const selectedAlts = remaining.slice(0, maxAlts);

      const allAlts = selectedAlts.map((it, idx) => ({
        itemId: it.itemId,
        name: it.name,
        icon: it.icon || 'inv_misc_questionmark',
        weaponType: 'Wand',
        speed: it.speed || null,
        dps: it.dps || null,
        quality: it.quality || 'q2',
        iLvl: it.iLvl || (min + 5),
        reqLevel: it.reqLevel || min,
        effectiveLevel: it.effectiveLevel || min,
        score: it.score || 0,
        rank: idx + 2,
        value: `${it.dps ? it.dps + ', ' : ''}${it.speed ? it.speed + 's - ' : ''}${it.source?.text || it.source?.title || 'Leveling Drop'}`,
        stats: it.stats || '',
        lines: it.lines || [`Requires Level ${it.reqLevel || min}`],
        source: it.source || { kind: 'world_drop', text: 'Leveling Drop' },
        faction: it.faction || 'both'
      }));

      hero.alts = allAlts;
      hero.pool = allAlts.slice(5);

      return hero;
    });
  }

  for (const [classId, existingData] of Object.entries(existingWands)) {
    console.log(`[Engine] Processing wands for class: ${classId}...`);
    updatedWands[classId] = {
      role: existingData.role || 'Wands',
      levels: processWandLevels(existingData.levels, classId, 8)
    };
  }

  // ---------------------------------------------------------------------------
  // Step 5: Write Output Datasets
  // ---------------------------------------------------------------------------
  console.log('[Engine] Step 5: Writing updated progression files...');

  fs.writeFileSync(OUT_WEAPONS_PATH, JSON.stringify(updatedWeapons, null, 2), 'utf8');
  console.log(`✓ Generated ${OUT_WEAPONS_PATH} (${(fs.statSync(OUT_WEAPONS_PATH).size / (1024 * 1024)).toFixed(2)} MB)`);

  fs.writeFileSync(OUT_OFFHANDS_PATH, JSON.stringify(updatedOffhands, null, 2), 'utf8');
  console.log(`✓ Generated ${OUT_OFFHANDS_PATH} (${(fs.statSync(OUT_OFFHANDS_PATH).size / 1024).toFixed(1)} KB)`);

  fs.writeFileSync(OUT_WANDS_PATH, JSON.stringify(updatedWands, null, 2), 'utf8');
  console.log(`✓ Generated ${OUT_WANDS_PATH} (${(fs.statSync(OUT_WANDS_PATH).size / 1024).toFixed(1)} KB)`);

  console.log('======================================================================');
  console.log('   PROGRESSION ENGINE COMPLETED SUCCESSFULLY');
  console.log('======================================================================\n');
}

// Direct CLI execution
if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) {
  runMasterProgressionEngine();
}
