/**
 * Vendor Directory - item taxonomy.
 * Maps Classic item class/subclass ids (plus a few name checks for Classic's catch-all
 * subclasses) to the directory's categories, and defines the quick-filter chips.
 * Category counts are computed at runtime from the data, never typed in.
 */
(function () {
  'use strict';

  const PROFESSION_MAP = {
    1: 'Leatherworking',
    2: 'Tailoring',
    3: 'Engineering',
    4: 'Blacksmithing',
    5: 'Cooking',
    6: 'Alchemy',
    7: 'First Aid',
    8: 'Enchanting',
    9: 'Fishing',
    0: 'Books & Grimoires'
  };

  const RECIPE_SUBS = { 5: 'cooking', 0: 'books', 2: 'tailoring', 1: 'leatherworking', 4: 'blacksmithing', 6: 'alchemy', 3: 'engineering', 8: 'enchanting', 7: 'firstaid', 9: 'fishing' };

  const TAXONOMY = {
    all: { label: 'All Categories', subcategories: [{ id: 'all', label: 'All Items' }] },
    recipes: {
      label: '📜 Recipes & Grimoires',
      subcategories: [
        { id: 'all', label: 'All Recipes' },
        { id: 'cooking', label: 'Cooking Recipes' },
        { id: 'books', label: 'Books & Grimoires' },
        { id: 'tailoring', label: 'Tailoring Patterns' },
        { id: 'leatherworking', label: 'Leatherworking Patterns' },
        { id: 'blacksmithing', label: 'Blacksmithing Plans' },
        { id: 'alchemy', label: 'Alchemy Recipes' },
        { id: 'engineering', label: 'Engineering Schematics' },
        { id: 'enchanting', label: 'Enchanting Formulas' },
        { id: 'firstaid', label: 'First Aid Manuals' },
        { id: 'fishing', label: 'Fishing Guides' }
      ]
    },
    weapons: {
      label: '⚔️ Weapons & Armaments',
      subcategories: [
        { id: 'all', label: 'All Weapons' },
        { id: 'weapons_1h', label: 'One-Hand Swords, Axes, Maces, Daggers & Fists' },
        { id: 'weapons_2h', label: 'Two-Hand Swords, Axes, Maces & Polearms' },
        { id: 'weapons_ranged', label: 'Bows, Guns, Crossbows & Thrown' },
        { id: 'weapons_caster', label: 'Staves & Wands' }
      ]
    },
    armor: {
      label: '🛡️ Armor & Shields',
      subcategories: [
        { id: 'all', label: 'All Armor & Shields' },
        { id: 'armor_cloth', label: 'Cloth Armor' },
        { id: 'armor_leather', label: 'Leather Armor' },
        { id: 'armor_mail', label: 'Mail Armor' },
        { id: 'armor_plate', label: 'Plate Armor' },
        { id: 'armor_shield', label: 'Shields' },
        { id: 'armor_acc', label: 'Cloaks, Shirts, Rings, Trinkets & Off-Hands' },
        { id: 'armor_relic', label: 'Librams, Idols & Totems' }
      ]
    },
    consumables: {
      label: '🍖 Consumables & Sustenance',
      subcategories: [
        { id: 'all', label: 'All Consumables' },
        { id: 'cons_food', label: 'Food & Drink' },
        { id: 'cons_potions', label: 'Potions, Elixirs & Flasks' },
        { id: 'cons_poisons', label: 'Rogue Poisons' },
        { id: 'cons_reagents', label: 'Class Reagents (Powders, Candles, Ankhs)' },
        { id: 'cons_scrolls', label: 'Scrolls' },
        { id: 'cons_bandages', label: 'Bandages' },
        { id: 'cons_misc', label: 'Fireworks, Lures, Explosives & Misc' }
      ]
    },
    bags_tools: {
      label: '🎒 Bags, Ammo & Tools',
      subcategories: [
        { id: 'all', label: 'All Bags & Tools' },
        { id: 'bagstool_bags', label: 'Containers & Bags' },
        { id: 'bagstool_quivers', label: 'Quivers & Ammo Pouches' },
        { id: 'bagstool_ammo', label: 'Arrows & Bullets' },
        { id: 'bagstool_tools', label: 'Tradeskill Tools & Fishing Poles' }
      ]
    },
    mounts_pets: {
      label: '🐎 Mounts & Vanity Pets',
      subcategories: [
        { id: 'all', label: 'All Mounts & Pets' },
        { id: 'mp_mounts', label: 'Mounts' },
        { id: 'mp_pets', label: 'Companion Pets' }
      ]
    },
    trade_goods: {
      label: '🌾 Trade Supplies & Reagents',
      subcategories: [
        { id: 'all', label: 'All Trade Supplies' },
        { id: 'tg_tailoring', label: 'Thread, Dye, Bleach & Cloth' },
        { id: 'tg_smithing', label: 'Flux, Vials, Stone & Parts' },
        { id: 'tg_leather', label: 'Leather & Salt' },
        { id: 'tg_cooking', label: 'Cooking Spices, Herbs & Meat' },
        { id: 'tg_enchanting', label: 'Enchanting Rods, Dust & Oils' }
      ]
    },
    misc: {
      label: '🎁 Quest, Holiday & Other',
      subcategories: [
        { id: 'all', label: 'All Other Goods' },
        { id: 'misc_quest', label: 'Quest Items' },
        { id: 'misc_holiday', label: 'Holiday Goods' },
        { id: 'misc_other', label: 'Books, Certifications & Curios' }
      ]
    }
  };

  // Quick-filter chips: each one is a shortcut to a category/subcategory pair.
  const QUICK_CHIPS = [
    { id: 'all', label: 'All Items', icon: '🌐', cat: 'all', sub: 'all' },
    { id: 'limited', label: 'Limited Stock', icon: '🔥', cat: 'all', sub: 'all', limOnly: true },
    { id: 'cooking', label: 'Cooking Recipes', icon: '🍳', cat: 'recipes', sub: 'cooking' },
    { id: 'books', label: 'Books & Grimoires', icon: '📖', cat: 'recipes', sub: 'books' },
    { id: 'tailoring', label: 'Tailoring Patterns', icon: '🧵', cat: 'recipes', sub: 'tailoring' },
    { id: 'blacksmithing', label: 'Blacksmithing Plans', icon: '🔨', cat: 'recipes', sub: 'blacksmithing' },
    { id: 'leatherworking', label: 'Leatherworking Patterns', icon: '🥋', cat: 'recipes', sub: 'leatherworking' },
    { id: 'alchemy', label: 'Alchemy Recipes', icon: '🧪', cat: 'recipes', sub: 'alchemy' },
    { id: 'engineering', label: 'Engineering Schematics', icon: '⚙️', cat: 'recipes', sub: 'engineering' },
    { id: 'enchanting', label: 'Enchanting Formulas', icon: '✨', cat: 'recipes', sub: 'enchanting' },
    { id: 'bags', label: 'Bags & Containers', icon: '🎒', cat: 'bags_tools', sub: 'bagstool_bags' },
    { id: 'mounts_pets', label: 'Mounts & Pets', icon: '🐎', cat: 'mounts_pets', sub: 'all' },
    { id: 'weapons', label: 'Weapons', icon: '⚔️', cat: 'weapons', sub: 'all' },
    { id: 'armor', label: 'Armor & Shields', icon: '🛡️', cat: 'armor', sub: 'all' },
    { id: 'food', label: 'Food & Drinks', icon: '🍖', cat: 'consumables', sub: 'cons_food' },
    { id: 'potions', label: 'Potions & Elixirs', icon: '⚗️', cat: 'consumables', sub: 'cons_potions' },
    { id: 'poisons', label: 'Rogue Poisons', icon: '☠️', cat: 'consumables', sub: 'cons_poisons' },
    { id: 'reagents', label: 'Class Reagents', icon: '🕯️', cat: 'consumables', sub: 'cons_reagents' }
  ];

  const R = (cat, sub, label) => ({ cat, sub, label });

  function classifyItem(item) {
    const [name, , , classId, subClassId] = item;
    const n = String(name || '');

    if (classId === 9) return R('recipes', RECIPE_SUBS[subClassId] || 'all', PROFESSION_MAP[subClassId] || 'Recipe');

    if (classId === 2) {
      if (subClassId === 14) return R('bags_tools', 'bagstool_tools', 'Tradeskill Tool');
      if (subClassId === 20) return R('bags_tools', 'bagstool_tools', 'Fishing Pole');
      if ([0, 4, 7, 13, 15].includes(subClassId)) return R('weapons', 'weapons_1h', '1H Weapon');
      if ([1, 5, 6, 8].includes(subClassId)) return R('weapons', 'weapons_2h', '2H Weapon');
      if ([2, 3, 16, 18].includes(subClassId)) return R('weapons', 'weapons_ranged', 'Ranged Weapon');
      if ([10, 19].includes(subClassId)) return R('weapons', 'weapons_caster', subClassId === 19 ? 'Wand' : 'Staff');
      return R('weapons', 'all', 'Weapon');
    }

    if (classId === 4) {
      if (subClassId === 1) return R('armor', 'armor_cloth', 'Cloth Armor');
      if (subClassId === 2) return R('armor', 'armor_leather', 'Leather Armor');
      if (subClassId === 3) return R('armor', 'armor_mail', 'Mail Armor');
      if (subClassId === 4) return R('armor', 'armor_plate', 'Plate Armor');
      if (subClassId === 5 || subClassId === 6) return R('armor', 'armor_shield', 'Shield');
      if ([7, 8, 9].includes(subClassId)) return R('armor', 'armor_relic', 'Relic');
      return R('armor', 'armor_acc', 'Cloak / Accessory');
    }

    if (classId === 0) {
      if (subClassId === 5) return R('consumables', 'cons_food', 'Food & Drink');
      if ([1, 2, 3].includes(subClassId)) return R('consumables', 'cons_potions', 'Potion / Elixir');
      if (subClassId === 4) return R('consumables', 'cons_scrolls', 'Scroll');
      if (subClassId === 7) return R('consumables', 'cons_bandages', 'Bandage');
      // Classic files rogue poisons under the catch-all "Other" subclass with fireworks and lures
      if (/poison/i.test(n)) return R('consumables', 'cons_poisons', 'Rogue Poison');
      return R('consumables', 'cons_misc', 'Consumable');
    }

    if (classId === 5 || (classId === 15 && subClassId === 1)) return R('consumables', 'cons_reagents', 'Reagent');

    if (classId === 1) return R('bags_tools', 'bagstool_bags', 'Container / Bag');
    if (classId === 11) return R('bags_tools', 'bagstool_quivers', 'Quiver / Ammo Pouch');
    if (classId === 6) return R('bags_tools', 'bagstool_ammo', 'Ammunition');

    if (classId === 15) {
      if (subClassId === 5) return R('mounts_pets', 'mp_mounts', 'Mount');
      if (subClassId === 2) return R('mounts_pets', 'mp_pets', 'Companion Pet');
      if (subClassId === 3) return R('misc', 'misc_holiday', 'Holiday');
      return R('misc', 'misc_other', 'Miscellaneous');
    }

    if (classId === 12) return R('misc', 'misc_quest', 'Quest Item');

    if (classId === 7) {
      if (subClassId === 5) return R('trade_goods', 'tg_tailoring', 'Cloth');
      if (subClassId === 6) return R('trade_goods', 'tg_leather', 'Leather');
      if (subClassId === 1 || subClassId === 7) return R('trade_goods', 'tg_smithing', 'Metal / Parts');
      if (subClassId === 8 || subClassId === 9) return R('trade_goods', 'tg_cooking', 'Meat / Herb');
      if (subClassId === 12) return R('trade_goods', 'tg_enchanting', 'Enchanting');
      if (subClassId === 11) {
        // Classic's "Other" trade goods mixes every profession's vendor supplies
        if (/thread|dye|bleach/i.test(n)) return R('trade_goods', 'tg_tailoring', 'Tailoring Supply');
        if (/flux|vial|powder|stone/i.test(n)) return R('trade_goods', 'tg_smithing', 'Crafting Supply');
        if (/spice|salt|flour|oil|milk|seasoning/i.test(n)) return R('trade_goods', 'tg_cooking', 'Cooking Supply');
        if (/rod|dust|essence/i.test(n)) return R('trade_goods', 'tg_enchanting', 'Enchanting Supply');
      }
      return R('trade_goods', 'all', 'Trade Good');
    }

    return R('misc', 'misc_other', 'Item');
  }

  window.VendorTaxonomy = { PROFESSION_MAP, TAXONOMY, QUICK_CHIPS, classifyItem };
})();
