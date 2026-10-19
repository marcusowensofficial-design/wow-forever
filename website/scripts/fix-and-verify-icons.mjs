/**
 * Comprehensive item ID and Icon Auditor / Resolver for WoW Forever.
 * 1. Corrects mismatched legacy item IDs against uncapped Wowhead Forever dataset.
 * 2. Replaces question mark and trade/armor icons (ingots, ores, capes, necklaces, etc.)
 *    with exact Wowhead XML icons or canonical Classic/thematic icon art.
 * 3. Enforces an archetype fallback so no weapon, wand, or off-hand is ever left with question marks.
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
const whShields = fs.existsSync(path.join(SCRAPED_DIR, 'wowhead_forever_shields.json'))
  ? JSON.parse(fs.readFileSync(path.join(SCRAPED_DIR, 'wowhead_forever_shields.json'), 'utf8'))
  : [];
const cache = JSON.parse(fs.readFileSync(path.join(ROOT, 'scratch', 'forever_items_cache.json'), 'utf8'));

// Build lookup maps
const whByName = new Map();
const whById = new Map();

for (const it of [...whWeapons, ...whOffhands, ...whShields]) {
  if (it.name) whByName.set(it.name.toLowerCase().trim(), it);
  if (it.id) whById.set(it.id, it);
}

// Canonical icon dictionary for iconic Classic items and custom items
const CANONICAL_ICONS = {
  // Iconic Classic weapons
  "sword of omen": "inv_sword_24",
  "stoneslayer": "inv_sword_04",
  "dreadforge retaliator": "inv_axe_11",
  "blackhand doomsaw": "inv_weapon_halberd_01",
  "blackblade of shahram": "inv_sword_34",
  "hammer of the grand crusader": "inv_hammer_04",
  "the unstoppable force": "inv_hammer_09",
  "gryphonwing bow": "inv_weapon_bow_07",
  "ancient bone bow": "inv_weapon_bow_08",
  "dal'rend's sacred charge": "inv_sword_43",
  "dal'rend's tribal guardian": "inv_sword_40",
  "felstriker": "inv_weapon_shortblade_25",
  "mirah's song": "inv_sword_39",
  "spire of the stoneshaper": "inv_staff_29",
  "rod of the ogre magi": "inv_staff_13",
  "witchblade": "inv_weapon_shortblade_16",
  "warden staff": "inv_staff_10",
  "grisly sack of skulls": "inv_misc_bag_10",
  "odo's claw": "inv_misc_monsterclaw_04",
  "swine fists": "inv_misc_monsterclaw_02",
  "electro-lantern": "inv_lantern_01",
  "riphook": "inv_weapon_crossbow_04",
  "acolyte's staff": "inv_staff_08",
  "woodchopper": "inv_axe_02",
  "staff of the dor'danil": "inv_staff_08",
  "darkwood staff": "inv_staff_16",
  "lesser magic wand": "inv_wand_01",
  "lesser mystic wand": "inv_wand_02",
  "tear of grief": "inv_jewelry_talisman_08",
  "disciple's stein": "inv_drink_04",
  "orb of the forgotten seer": "inv_misc_orb_01",
  "spirit of aquementas": "inv_wand_05",
  "orb of power": "inv_jewelry_talisman_05",
  "haunting blade": "inv_sword_27",
  "mograine's might": "inv_hammer_04",
  "princess theradras' scepter": "inv_hammer_08",
  "scrappy dagger": "inv_weapon_shortblade_05",

  // Custom dungeon weapons
  "durgen's crescent axe": "inv_axe_05",
  "meathook slicer": "inv_weapon_shortblade_02",
  "corpse chopper": "inv_axe_09",
  "vileblood scimitar": "inv_sword_01",
  "forsaken greataxe": "inv_axe_24",
  "plaguefang": "inv_sword_05",
  "serrated raptor claw": "inv_weapon_shortblade_16",
  "scepter of the abandoned": "inv_mace_01",
  "segmented spider leg": "inv_staff_13",
  "coldspire staff": "inv_staff_08",
  "fang of magmatus": "inv_weapon_shortblade_05",
  "golemheart stave": "inv_staff_10",
  "ironforge greathammer": "inv_hammer_21",
  "calibrated blunderbuss": "inv_weapon_rifle_01",
  "deepblaze": "inv_wand_11",
  "dwarven tome": "inv_misc_book_07",
  "the skyblade": "inv_sword_20",
  "riptear's cleaver": "inv_throwingaxe_02",
  "riptear's spare arm": "inv_wand_01",
  "wisesight wand": "inv_wand_01",
  "snarlsnout shooter": "inv_weapon_rifle_05",
  "bristlebark bow": "inv_weapon_bow_03",
  "helm splitter": "inv_sword_04",
  "subdued dragon's fang": "inv_weapon_shortblade_01",
  "trusty sword": "inv_sword_04",
  "defender of dalaran": "inv_hammer_20",
  "striking staff": "inv_staff_10",
  "unstable power core": "inv_wand_02",
  "wand of mana concentration": "inv_wand_06",
  "master hunter's wand": "inv_wand_07",
  "wail of death": "inv_wand_12",
  "skum's bucket": "inv_misc_1h_bucket_c_01",
  "raptor's gaze": "inv_misc_orb_01",
  "ponderous orb": "inv_misc_orb_04",
  "flamescarred spellbook": "inv_misc_book_01",
  "thrice-damned effigy": "inv_misc_orb_01",
  "researcher's night light": "inv_lantern_01",
  "truesilver conduit": "inv_misc_orb_blue",
  "barkskin baubles": "inv_misc_bag_10_black"
};

// Archetype fallback icons based on weapon / offhand type
const TYPE_FALLBACK_ICONS = {
  "One-Handed Sword": "inv_sword_04",
  "Two-Handed Sword": "inv_sword_20",
  "One-Handed Axe": "inv_axe_08",
  "Two-Handed Axe": "inv_axe_09",
  "One-Handed Mace": "inv_mace_01",
  "Two-Handed Mace": "inv_hammer_04",
  "Dagger": "inv_weapon_shortblade_05",
  "Staff": "inv_staff_08",
  "Bow": "inv_weapon_bow_01",
  "Gun": "inv_weapon_rifle_01",
  "Crossbow": "inv_weapon_crossbow_01",
  "Wand": "inv_wand_01",
  "Fist Weapon": "inv_misc_monsterclaw_04",
  "Polearm": "inv_weapon_halberd_01",
  "Thrown": "inv_throwingknife_04",
  "Shield": "inv_shield_04",
  "Held In Off-hand": "inv_misc_orb_01",
  "Held in Off-hand": "inv_misc_orb_01"
};

// Subclass number to name
const SUBCLASS_MAP = {
  0: "One-Handed Axe", 1: "Two-Handed Axe", 2: "Bow", 3: "Gun", 4: "One-Handed Mace",
  5: "Two-Handed Mace", 6: "Polearm", 7: "One-Handed Sword", 8: "Two-Handed Sword",
  10: "Staff", 13: "Fist Weapon", 15: "Dagger", 16: "Thrown", 18: "Crossbow",
  19: "Wand", 20: "Fishing Pole", "-5": "Held In Off-hand"
};

// Helper to determine if an icon is bad/invalid for weapons/gear
function isBadIcon(icon) {
  if (!icon || typeof icon !== 'string') return true;
  const ic = icon.toLowerCase().trim();
  if (ic === 'inv_misc_questionmark' || ic === '') return true;
  // Mining bars, ores, trade materials, non-weapon armor on weapons
  if (ic.includes('inv_ingot_') || ic.includes('inv_ore_') || ic.includes('inv_stone_')) return true;
  if (ic.includes('inv_chest_') || ic.includes('inv_pants_') || ic.includes('inv_boots_') || ic.includes('inv_bracer_')) return true;
  if (ic.includes('inv_misc_cape_') || ic.includes('inv_misc_necklace') || ic.includes('inv_misc_map')) return true;
  return false;
}

// Function to resolve the pristine icon for any item
function resolvePristineIcon(item) {
  const nameKey = (item.name || '').toLowerCase().trim();

  // 1. Check curated canonical dictionary
  if (CANONICAL_ICONS[nameKey]) {
    return CANONICAL_ICONS[nameKey];
  }

  // 2. Check cached XML icon if valid
  const cached = cache[String(item.itemId)];
  if (cached?.icon && !isBadIcon(cached.icon)) {
    return cached.icon;
  }

  // 3. Check Wowhead database entry
  const wh = whById.get(item.itemId) || whByName.get(nameKey);
  if (wh) {
    if (item.itemId !== wh.id) {
      item.itemId = wh.id;
    }
    const whApp = wh.appearances?.['0']?.[1];
    if (whApp && !isBadIcon(whApp)) {
      return whApp;
    }
    const whIcon = wh.icon;
    if (whIcon && !isBadIcon(whIcon)) {
      return whIcon;
    }
  }

  // 4. Existing icon if valid
  if (item.icon && !isBadIcon(item.icon)) {
    return item.icon;
  }

  // 5. Archetype fallback
  const wType = item.weaponType || SUBCLASS_MAP[wh?.subclass] || "One-Handed Sword";
  for (const [key, icon] of Object.entries(TYPE_FALLBACK_ICONS)) {
    if (wType.toLowerCase().includes(key.toLowerCase()) || key.toLowerCase().includes(wType.toLowerCase())) {
      return icon;
    }
  }

  return "inv_sword_04";
}

// Audit and fix a collection of items
function fixItemsTree(obj) {
  if (!obj) return;
  if (Array.isArray(obj)) {
    for (const item of obj) {
      fixItem(item);
      if (item.alts) {
        for (const alt of item.alts) {
          fixItem(alt);
        }
      }
    }
  } else if (typeof obj === 'object') {
    if (obj.levels) fixItemsTree(obj.levels);
    else {
      for (const v of Object.values(obj)) {
        if (typeof v === 'object') fixItemsTree(v);
      }
    }
  }
}

function fixItem(item) {
  if (!item || !item.name) return;

  // Fix known ID typos
  const nameKey = item.name.toLowerCase().trim();
  const wh = whByName.get(nameKey);
  if (wh && (!item.itemId || item.itemId !== wh.id)) {
    item.itemId = wh.id;
  }

  // Assign pristine icon
  item.icon = resolvePristineIcon(item);

  // Normalize weaponType if missing
  if (!item.weaponType && wh?.subclass !== undefined) {
    item.weaponType = SUBCLASS_MAP[wh.subclass] || "Weapon";
  }
}

// Process all datasets
console.log('[Icon Fixer] Auditing and fixing forever_weapons.json...');
const weapons = JSON.parse(fs.readFileSync(path.join(SCRAPED_DIR, 'forever_weapons.json'), 'utf8'));
fixItemsTree(weapons);
fs.writeFileSync(path.join(SCRAPED_DIR, 'forever_weapons.json'), JSON.stringify(weapons, null, 2), 'utf8');

console.log('[Icon Fixer] Auditing and fixing forever_wands.json...');
const wands = JSON.parse(fs.readFileSync(path.join(SCRAPED_DIR, 'forever_wands.json'), 'utf8'));
fixItemsTree(wands);
fs.writeFileSync(path.join(SCRAPED_DIR, 'forever_wands.json'), JSON.stringify(wands, null, 2), 'utf8');

console.log('[Icon Fixer] Auditing and fixing forever_offhands.json...');
const offhands = JSON.parse(fs.readFileSync(path.join(SCRAPED_DIR, 'forever_offhands.json'), 'utf8'));
fixItemsTree(offhands);
fs.writeFileSync(path.join(SCRAPED_DIR, 'forever_offhands.json'), JSON.stringify(offhands, null, 2), 'utf8');

console.log('[Icon Fixer] All datasets updated! Recompiling class-progression-data.js...');
import('./compile-progression-data.mjs').then(() => {
  console.log('[Icon Fixer] class-progression-data.js successfully recompiled!');
});
