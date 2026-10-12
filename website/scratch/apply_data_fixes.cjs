const fs = require('fs');
const vm = require('vm');

// 1. Read existing professions-data.js
const jsPath = 'js/data/professions-data.js';
const jsCode = fs.readFileSync(jsPath, 'utf8');

const sandbox = { window: {} };
vm.createContext(sandbox);
vm.runInContext(jsCode, sandbox);
const profs = sandbox.window.WOW_PROFESSIONS_DATA;

// 2. Fix dummy Favor Recipe entries across all professions
const certificationUpdates = {
  alchemy: {
    id: 271621,
    name: 'Alchemy Certification',
    icon: 'inv_scroll_15',
    desc: "Unlocks the account-wide title 'The Alchemist' upon achieving 300 skill in Alchemy."
  },
  blacksmithing_prefect: {
    id: 251426,
    name: "Plans: Prefect's Waistguard",
    icon: 'inv_scroll_03',
    desc: "Teaches how to craft Prefect's Waistguard (Plate Belt with +Intellect & Spell Power)."
  },
  blacksmithing_cert: {
    id: 271622,
    name: 'Blacksmithing Certification',
    icon: 'inv_scroll_15',
    desc: "Unlocks the account-wide title 'The Blacksmith' upon achieving 300 skill in Blacksmithing."
  },
  engineering: {
    id: 271625,
    name: 'Engineering Certification',
    icon: 'inv_scroll_15',
    desc: "Unlocks the account-wide title 'The Engineer' upon achieving 300 skill in Engineering."
  },
  leatherworking: {
    id: 271626,
    name: 'Leatherworking Certification',
    icon: 'inv_scroll_15',
    desc: "Unlocks the account-wide title 'The Leatherworker' upon achieving 300 skill in Leatherworking."
  },
  tailoring: {
    id: 271627,
    name: 'Tailoring Certification',
    icon: 'inv_scroll_15',
    desc: "Unlocks the account-wide title 'The Tailor' upon achieving 300 skill in Tailoring."
  }
};

// Apply updates to Favor lists
// Alchemy
const alchCert = profs.alchemy.favor.recipes.find(r => r.id === 271621);
if (alchCert) {
  alchCert.name = certificationUpdates.alchemy.name;
  alchCert.icon = certificationUpdates.alchemy.icon;
  alchCert.desc = certificationUpdates.alchemy.desc;
}

// Blacksmithing
const bsPrefect = profs.blacksmithing.favor.recipes.find(r => r.id === 251426);
if (bsPrefect) {
  bsPrefect.name = certificationUpdates.blacksmithing_prefect.name;
  bsPrefect.icon = certificationUpdates.blacksmithing_prefect.icon;
  bsPrefect.desc = certificationUpdates.blacksmithing_prefect.desc;
  bsPrefect.quality = 3;
}
const bsCert = profs.blacksmithing.favor.recipes.find(r => r.id === 271622);
if (bsCert) {
  bsCert.name = certificationUpdates.blacksmithing_cert.name;
  bsCert.icon = certificationUpdates.blacksmithing_cert.icon;
  bsCert.desc = certificationUpdates.blacksmithing_cert.desc;
}

// Engineering
const engCert = profs.engineering.favor.recipes.find(r => r.id === 271625);
if (engCert) {
  engCert.name = certificationUpdates.engineering.name;
  engCert.icon = certificationUpdates.engineering.icon;
  engCert.desc = certificationUpdates.engineering.desc;
}

// Leatherworking
const lwCert = profs.leatherworking.favor.recipes.find(r => r.id === 271626);
if (lwCert) {
  lwCert.name = certificationUpdates.leatherworking.name;
  lwCert.icon = certificationUpdates.leatherworking.icon;
  lwCert.desc = certificationUpdates.leatherworking.desc;
}

// Tailoring
const tailCert = profs.tailoring.favor.recipes.find(r => r.id === 271627);
if (tailCert) {
  tailCert.name = certificationUpdates.tailoring.name;
  tailCert.icon = certificationUpdates.tailoring.icon;
  tailCert.desc = certificationUpdates.tailoring.desc;
}

// 3. Add missing Favor recipes into main recipes arrays
// Enchanting: Formula: Enchant Off Hand - Wisdom, Formula: Idol of the Dream, Formula: Libram of Holy Alacrity, Formula: Totem of Thunder, Enchanting Certification
const encRecipes = profs.enchanting.recipes;
const newEncRecipes = [
  {
    id: 274393,
    name: 'Formula: Enchant Off Hand - Wisdom',
    icon: 'inv_enchant_formulasuperior_01',
    quality: 3,
    learn: 300,
    yellow: 320,
    green: 340,
    grey: 360,
    isNew: true,
    effect: 'Enchants an off-hand item to increase Intellect by 6 and Spirit by 5.',
    reagents: [
      { id: 14344, name: 'Large Brilliant Shard', count: 6, icon: 'inv_enchant_shardbrilliantlarge', quality: 3 },
      { id: 16204, name: 'Illusion Dust', count: 18, icon: 'inv_enchant_dustillusion', quality: 1 },
      { id: 7082, name: 'Essence of Air', count: 1, icon: 'spell_nature_earthbind', quality: 2 },
      { id: 7080, name: 'Essence of Water', count: 1, icon: 'spell_frost_summonwaterelemental', quality: 2 }
    ],
    source: "Merchant's Favor (240 Favor)"
  },
  {
    id: 249529,
    name: 'Formula: Idol of the Dream',
    icon: 'inv_misc_note_01',
    quality: 3,
    learn: 300,
    yellow: 315,
    green: 330,
    grey: 345,
    isNew: true,
    effect: 'Crafts an Idol of the Dream relic for Druids (+Rejuvenation & Healing Touch).',
    reagents: [
      { id: 14344, name: 'Large Brilliant Shard', count: 4, icon: 'inv_enchant_shardbrilliantlarge', quality: 3 },
      { id: 16204, name: 'Illusion Dust', count: 12, icon: 'inv_enchant_dustillusion', quality: 1 },
      { id: 12808, name: 'Essence of Undeath', count: 2, icon: 'spell_shadow_deathanddecay', quality: 2 }
    ],
    source: "Merchant's Favor (240 Favor)"
  },
  {
    id: 249530,
    name: 'Formula: Libram of Holy Alacrity',
    icon: 'inv_misc_note_01',
    quality: 3,
    learn: 300,
    yellow: 315,
    green: 330,
    grey: 345,
    isNew: true,
    effect: 'Crafts a Libram of Holy Alacrity relic for Paladins (+Holy Light cast speed & spell crit).',
    reagents: [
      { id: 14344, name: 'Large Brilliant Shard', count: 4, icon: 'inv_enchant_shardbrilliantlarge', quality: 3 },
      { id: 16204, name: 'Illusion Dust', count: 12, icon: 'inv_enchant_dustillusion', quality: 1 },
      { id: 12803, name: 'Living Essence', count: 2, icon: 'spell_nature_wispsplode', quality: 2 }
    ],
    source: "Merchant's Favor (240 Favor)"
  },
  {
    id: 249532,
    name: 'Formula: Totem of Thunder',
    icon: 'inv_misc_note_01',
    quality: 3,
    learn: 300,
    yellow: 315,
    green: 330,
    grey: 345,
    isNew: true,
    effect: 'Crafts a Totem of Thunder relic for Shamans (+Lightning Bolt & Chain Lightning spell damage).',
    reagents: [
      { id: 14344, name: 'Large Brilliant Shard', count: 4, icon: 'inv_enchant_shardbrilliantlarge', quality: 3 },
      { id: 16204, name: 'Illusion Dust', count: 12, icon: 'inv_enchant_dustillusion', quality: 1 },
      { id: 7082, name: 'Essence of Air', count: 2, icon: 'spell_nature_earthbind', quality: 2 }
    ],
    source: "Merchant's Favor (240 Favor)"
  },
  {
    id: 271624,
    name: 'Enchanting Certification',
    icon: 'inv_scroll_15',
    quality: 2,
    learn: 300,
    yellow: 300,
    green: 300,
    grey: 300,
    isNew: true,
    effect: "Unlocks the account-wide title 'The Enchanter' upon achieving 300 skill in Enchanting.",
    reagents: [],
    source: "Merchant's Favor (1,000 Favor)"
  }
];

newEncRecipes.forEach(rec => {
  if (!encRecipes.some(r => r.id === rec.id)) {
    encRecipes.push(rec);
  }
});

// Blacksmithing: Plans: Prefect's Waistguard
const bsRecipes = profs.blacksmithing.recipes;
const prefectRecipe = {
  id: 251426,
  name: "Plans: Prefect's Waistguard",
  icon: 'inv_scroll_03',
  quality: 3,
  learn: 250,
  yellow: 270,
  green: 290,
  grey: 310,
  isNew: true,
  effect: "Teaches how to craft Prefect's Waistguard (Plate Belt with +12 Intellect, +8 Spirit, +14 Spell Power).",
  reagents: [
    { id: 12359, name: 'Thorium Bar', count: 12, icon: 'inv_ingot_07', quality: 1 },
    { id: 249391, name: 'Pyrite', count: 4, icon: 'inv_ore_pyrite_nugget', quality: 2 },
    { id: 249410, name: 'Sulfuric Acid', count: 2, icon: 'trade_alchemy', quality: 2 }
  ],
  source: "Merchant's Favor (90 Favor)"
};
if (!bsRecipes.some(r => r.id === prefectRecipe.id)) {
  bsRecipes.push(prefectRecipe);
}

// 4. Add campPerks for Herbalism, Skinning, Fishing
profs.herbalism.campPerks = {
  milestones: [
    {
      title: 'The Botanist',
      desc: 'Master Herbalist rank certification at 300 skill.',
      reward: 'Account-wide title',
      icon: 'trade_herbalism'
    }
  ],
  atCamp: [
    {
      name: 'Incense Candle',
      desc: 'Skill 20 camp station providing +25 Intellect to all party members sitting nearby (does not stack with Arcane Intellect).',
      skill: 'Skill 20',
      icon: 'inv_misc_candle_02'
    },
    {
      name: 'Greenhouse',
      desc: 'Skill 140 camp station growing herbs over time from planted seeds while providing Incense Candle buff.',
      skill: 'Skill 140',
      icon: 'inv_misc_flower_02'
    },
    {
      name: 'Seed Hybridizer',
      desc: 'Skill 300 camp station that crossbreeds seeds into rarer tiers while providing Incense Candle buff.',
      skill: 'Skill 300',
      icon: 'inv_misc_herb_sansamroot'
    }
  ],
  legacyPerks: [
    {
      name: 'Bountiful Harvest',
      effect: 'Increases herb harvest yields by 15% and grants chance for rare bonus seed drops.',
      meta: 'World Explorer Tree (10 pts)',
      icon: 'inv_misc_flower_02'
    }
  ]
};

profs.skinning.campPerks = {
  milestones: [
    {
      title: 'The Skinner',
      desc: 'Master Skinner rank certification at 300 skill.',
      reward: 'Account-wide title',
      icon: 'inv_misc_pelt_wolf_01'
    }
  ],
  atCamp: [
    {
      name: 'Camp Chair',
      desc: 'Skill 20 camp station providing +2% critical strike chance with spells and attacks to party members resting nearby.',
      skill: 'Skill 20',
      icon: 'inv_crate_01'
    },
    {
      name: 'Field Guide',
      desc: 'Skill 140 camp station granting Track Beasts to readers and providing Camp Chair buff.',
      skill: 'Skill 140',
      icon: 'inv_misc_book_03'
    },
    {
      name: "Trapper's Workbench",
      desc: 'Skill 300 camp station holding traps and automated beast harvesting while providing Camp Chair buff.',
      skill: 'Skill 300',
      icon: 'inv_misc_monsterscales_08'
    }
  ],
  legacyPerks: [
    {
      name: 'Master Flayer',
      effect: 'Prevents ruined hides on beasts up to 3 levels above your character level and speeds skinning time.',
      meta: 'Tradeskills Tree (10 pts)',
      icon: 'inv_misc_pelt_wolf_01'
    }
  ]
};

profs.fishing.campPerks = {
  milestones: [
    {
      title: 'The Angler',
      desc: 'Master Fisher rank certification at 300 skill.',
      reward: 'Account-wide title',
      icon: 'trade_fishing'
    }
  ],
  atCamp: [
    {
      name: 'Fish Bowl',
      desc: 'Skill 20 camp station providing +8% to all primary stats for everyone sitting nearby (does not stack with Blessing of Kings).',
      skill: 'Skill 20',
      icon: 'inv_magicalfishpet'
    },
    {
      name: 'Fishing Rack',
      desc: 'Skill 140 camp station drying uncommon fish over 1 hour and offering fishing lures while providing Fish Bowl buff.',
      skill: 'Skill 140',
      icon: 'inv_10_fishing_bait_color1'
    },
    {
      name: 'Fishing Hut',
      desc: 'Skill 300 camp station catching rare fish over 1 hour and offering master fishing lures while providing Fish Bowl buff.',
      skill: 'Skill 300',
      icon: 'inv_helm_armor_buckledhat_b_01_black'
    }
  ],
  legacyPerks: [
    {
      name: "Fisherman's Patience",
      effect: 'Reduces bite delay and prevents missed hook attempts in turbulent or high-skill waters.',
      meta: 'Resourcefulness Tree (10 pts)',
      icon: 'trade_fishing'
    }
  ]
};

// 5. Write updated JS data file
const newJsContent = `/**
 * World of Warcraft: Forever - Complete Professions, Leveling & Trade Economy Dataset
 * Synchronized with ForeverChanges.pro, Wowhead (Env 16), and WoW Forever Tools consensus.
 */

window.WOW_PROFESSIONS_DATA = ${JSON.stringify(profs, null, 2)};
`;

fs.writeFileSync(jsPath, newJsContent, 'utf8');
console.log('Successfully updated js/data/professions-data.js');

// 6. Synchronize data/forever_professions.json with identical structure
const jsonPath = 'data/forever_professions.json';
fs.writeFileSync(jsonPath, JSON.stringify(profs, null, 2), 'utf8');
console.log('Successfully synchronized data/forever_professions.json');

// Run quick verification
console.log('Verification:');
console.log(' - Alchemy favor 271621 name:', profs.alchemy.favor.recipes.find(r => r.id === 271621).name);
console.log(' - BS favor 251426 name:', profs.blacksmithing.favor.recipes.find(r => r.id === 251426).name);
console.log(' - BS recipes count:', profs.blacksmithing.recipes.length);
console.log(' - Enchanting recipes count:', profs.enchanting.recipes.length);
console.log(' - Mining recipes count:', profs.mining.recipes.length);
console.log(' - Herbalism campPerks:', !!profs.herbalism.campPerks);
console.log(' - Skinning campPerks:', !!profs.skinning.campPerks);
console.log(' - Fishing campPerks:', !!profs.fishing.campPerks);
