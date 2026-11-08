import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');

const PROFESSIONS_JSON = path.join(ROOT, 'data', 'forever_professions.json');
const PROFESSIONS_JS = path.join(ROOT, 'js', 'data', 'professions-data.js');

const profData = JSON.parse(fs.readFileSync(PROFESSIONS_JSON, 'utf8'));

// 1. Update capNote across all 13 professions
for (const slug of Object.keys(profData)) {
  const p = profData[slug];
  if (p.leveling) {
    p.leveling.capNote = 'Complete 1–300 Artisan Roadmap';
  }
}

// 2. Retitle and update shopping lists for standard crafting trades
const craftingTrades = ['alchemy', 'blacksmithing', 'enchanting', 'engineering', 'leatherworking', 'tailoring', 'cooking', 'first-aid'];
for (const slug of craftingTrades) {
  const p = profData[slug];
  if (p.shopping) {
    p.shopping.title = 'Reagent Shopping List (1 to 300)';
  }
  if (p.leveling && p.leveling.shopping) {
    p.leveling.shopping.title = 'Reagent Shopping List (1 to 300)';
  }
}

profData.blacksmithing.shopping.subtitle = 'Complete trade goods, stone, and ores needed to power-level Blacksmithing from 1 to 300.';
profData.cooking.shopping.subtitle = 'Meats and fish required to power-level Cooking from 1 to 300.';
profData['first-aid'].shopping.subtitle = 'Cloth, herbs, and vials required to power-level First Aid from 1 to 300.';

// Clean up Enchanting beta-stop
profData.enchanting.leveling.steps = profData.enchanting.leveling.steps.filter(s => s.type !== 'beta-stop');

// 3. Upgrade Camping to 1–300
const camping = profData.camping;
camping.leveling.title = 'Leveling from 1 to 300 (Campfires & Field Stations)';
camping.leveling.capNote = 'Complete 1–300 Artisan Roadmap';
camping.leveling.desc = 'At each stage, craft campfire kits, pitch wilderness shelters, and construct portable field workstations to advance your Camping skill. Check off each craft as you progress in-game.';

// Remove old beta-stop and update step 15
camping.leveling.steps = camping.leveling.steps.filter(s => s.type !== 'beta-stop');
const expertCampfireStep = camping.leveling.steps.find(s => s.recipeName === 'Expert Campfire Kit');
if (expertCampfireStep) {
  expertCampfireStep.advice = 'Deploys an encampment campfire holding up to 10 stations with 60-min burn time. Expert Cap reached (225)!';
}

// Add Artisan Camping Rank + 225-300 steps
camping.leveling.steps.push(
  {
    type: 'rank',
    rank: 'Artisan Camping (225–300)',
    details: 'Learned at Level 35 (Skill 200+) from Wilderness Survival Grandmasters — Deneb Walker in Stromgarde Keep, Arathi Highlands (/way 27.2, 58.6, Alliance) or Karrina Mekeda in Brackenwall Village, Dustwallow Marsh (/way 36.6, 30.8, Horde), or Master Survivalist Shurome in Emerald Sanctuary, Felwood (/way 51.4, 82.0, Neutral), up to 300.'
  },
  {
    type: 'step',
    from: 225,
    to: 250,
    bar: { iLeft: '75.00%', iWidth: '8.33%', eLeft: '100%' },
    itemId: 279975,
    recipeName: 'Mageweave Expedition Pavilion',
    source: 'Learned from Artisan Wilderness Master (Skill 225)',
    advice: 'High-capacity outdoor rest shelter. Grants +200% rested XP generation speed and shelter for up to 5 party members.',
    crafts: 25,
    reagents: [
      { itemId: 4338, name: 'Mageweave Cloth', count: 16, icon: 'inv_fabric_mageweave_01', quality: 1 },
      { itemId: 8343, name: 'Heavy Silken Thread', count: 4, icon: 'inv_fabric_silk_02', quality: 1 },
      { itemId: 3575, name: 'Iron Bar', count: 2, icon: 'inv_ingot_02', quality: 1 }
    ]
  },
  {
    type: 'step',
    from: 250,
    to: 275,
    bar: { iLeft: '83.33%', iWidth: '8.33%', eLeft: '100%' },
    itemId: 279977,
    recipeName: 'Ironwood Campfire Kit',
    source: 'Blueprint: Ironwood Campfire (Winterspring / Felwood Timbermaw Vendors)',
    advice: 'Burns white-hot Ironwood fuel. Required as the heat source for high-tier Tier 3 and Tier 4 field workstations (Master Forge, Arcane Forge, Alchemy Laboratory).',
    crafts: 25,
    reagents: [
      { itemId: 11292, name: 'Ironwood', count: 1, icon: 'inv_tradeskillitem_03', quality: 1 },
      { itemId: 3857, name: 'Coal', count: 2, icon: 'inv_ore_coal_01', quality: 1 }
    ],
    vendorDetails: {
      npc: 'Timbermaw Post Vendor / Dalaran Supplies',
      location: 'Felwood / Dalaran',
      cost: '2g 50s',
      supply: 'Unlimited'
    }
  },
  {
    type: 'step',
    from: 275,
    to: 300,
    bar: { iLeft: '91.67%', iWidth: '8.33%', eLeft: '100%' },
    itemId: 279978,
    recipeName: 'Runecloth Encampment Pavilion',
    source: 'Blueprint: Runecloth Pavilion (Cenarion Circle Quartermaster, Silithus / Moonglade)',
    advice: 'Endgame Master rest pavilion. Unlocks full camp functionality and satisfies station requirements for all 12 Tier 3/4 workstations up to Skill 300.',
    crafts: 25,
    reagents: [
      { itemId: 14048, name: 'Bolt of Runecloth', count: 6, icon: 'inv_fabric_purplefire_02', quality: 1 },
      { itemId: 14341, name: 'Rune Thread', count: 2, icon: 'inv_fabric_mageweave_02', quality: 1 },
      { itemId: 12359, name: 'Thorium Bar', count: 4, icon: 'inv_ingot_07', quality: 1 }
    ]
  }
);

// Camping shopping list update
camping.shopping.title = 'Reagent Shopping List (1 to 300)';
camping.shopping.subtitle = 'Materials required to power-level Camping from 1 to 300 including all portable station shelters.';
if (camping.shopping.groups.length === 2) {
  camping.shopping.groups.push(
    {
      title: 'From Trade Goods & General Vendors (Artisan 225 to 300)',
      note: 'Thread, wood, and coal purchased from trade suppliers.',
      items: [
        { itemId: 8343, name: 'Heavy Silken Thread', icon: 'inv_fabric_silk_02', quality: 1, count: 100 },
        { itemId: 11292, name: 'Ironwood', icon: 'inv_tradeskillitem_03', quality: 1, count: 25 },
        { itemId: 3857, name: 'Coal', icon: 'inv_ore_coal_01', quality: 1, count: 50 },
        { itemId: 14341, name: 'Rune Thread', icon: 'inv_fabric_mageweave_02', quality: 1, count: 50 }
      ]
    },
    {
      title: 'Gathered, Crafted or Auction House Reagents (Artisan 225 to 300)',
      note: 'Cloth, metal, and crafted bolts required for high-tier pavilions.',
      items: [
        { itemId: 4338, name: 'Mageweave Cloth', icon: 'inv_fabric_mageweave_01', quality: 1, count: 400 },
        { itemId: 3575, name: 'Iron Bar', icon: 'inv_ingot_02', quality: 1, count: 50 },
        { itemId: 14048, name: 'Bolt of Runecloth', icon: 'inv_fabric_purplefire_02', quality: 1, count: 150 },
        { itemId: 12359, name: 'Thorium Bar', icon: 'inv_ingot_07', quality: 1, count: 100 }
      ]
    }
  );
}

// 4. Upgrade Mining to 1–300
const mining = profData.mining;
mining.leveling.title = 'Leveling from 1 to 300 (Smelting Bypass & Vein Mining)';
mining.leveling.capNote = 'Complete 1–300 Artisan Roadmap';
mining.leveling.steps = mining.leveling.steps.filter(s => s.type !== 'beta-stop');
const mithrilStep = mining.leveling.steps.find(s => s.title && s.title.includes('Mithril Deposit'));
if (mithrilStep) {
  mithrilStep.zones = 'Mine Mithril Deposits from 175 to 230 in Badlands, Tanaris, The Hinterlands, Searing Gorge & Desolace. Yields Mithril Ore, Solid Stone, Aquamarine & Star Ruby.';
}

mining.shopping = {
  title: 'Smelting & Mining Shopping List (1 to 300)',
  subtitle: 'Exact ore quantities required to power-level Mining 1–300 via forge smelting bypass and open-world vein extraction.',
  groups: [
    {
      title: '1–140 & 155–185 Smelting Bypass Ores',
      note: '60 Copper Bars + 60 Tin Bars from steps 1–2 are reused to smelt 60 Bronze (75–100)',
      items: [
        { itemId: 2770, name: 'Copper Ore', icon: 'inv_ore_copper_01', quality: 1, count: 130 },
        { itemId: 2771, name: 'Tin Ore', icon: 'inv_ore_tin_01', quality: 1, count: 60 },
        { itemId: 2775, name: 'Silver Ore', icon: 'inv_stone_16', quality: 1, count: 70 },
        { itemId: 2772, name: 'Iron Ore', icon: 'inv_ore_iron_01', quality: 1, count: 35 },
        { itemId: 2776, name: 'Gold Ore', icon: 'inv_ore_gold_01', quality: 1, count: 60 }
      ]
    },
    {
      title: 'Artisan Smelting & Extraction Ores (225 to 300)',
      note: 'Smelted at capital forges or extracted from high-tier veins to reach 300.',
      items: [
        { itemId: 7911, name: 'Truesilver Ore', icon: 'inv_ore_truesilver_01', quality: 2, count: 30 },
        { itemId: 10620, name: 'Thorium Ore', icon: 'inv_ore_thorium_01', quality: 1, count: 40 },
        { itemId: 11370, name: 'Dark Iron Ore', icon: 'inv_ore_mithril_02', quality: 1, count: 160 }
      ]
    }
  ]
};

// 5. Upgrade Herbalism to 1–300
const herbalism = profData.herbalism;
herbalism.leveling.title = 'Leveling from 1 to 300 (Herb Zones & Gathering Route)';
herbalism.leveling.capNote = 'Complete 1–300 Artisan Roadmap';
herbalism.leveling.steps = herbalism.leveling.steps.filter(s => s.type !== 'beta-stop');
herbalism.shopping = {
  title: 'Herb Harvesting & Reagent Checklist (1 to 300)',
  subtitle: 'Target herb quantities recommended across all 4 tiers from starting valleys to endgame zones.',
  groups: [
    {
      title: 'Apprentice & Journeyman Herbs (1 to 150)',
      note: 'Early herbs farmable across starter valleys and level 10–25 zones.',
      items: [
        { itemId: 2447, name: 'Peacebloom', icon: 'inv_misc_herb_01', quality: 1, count: 60 },
        { itemId: 765, name: 'Silverleaf', icon: 'inv_misc_herb_03', quality: 1, count: 60 },
        { itemId: 2449, name: 'Earthroot', icon: 'inv_misc_root_01', quality: 1, count: 40 },
        { itemId: 785, name: 'Mageroyal', icon: 'inv_misc_herb_13', quality: 1, count: 40 },
        { itemId: 2450, name: 'Briarthorn', icon: 'inv_misc_root_01', quality: 1, count: 40 },
        { itemId: 3820, name: 'Stranglekelp', icon: 'inv_misc_herb_08', quality: 1, count: 30 },
        { itemId: 2453, name: 'Bruiseweed', icon: 'inv_misc_herb_01', quality: 1, count: 30 },
        { itemId: 3355, name: 'Wild Steelbloom', icon: 'inv_misc_herb_07', quality: 1, count: 20 },
        { itemId: 3356, name: 'Kingsblood', icon: 'inv_misc_herb_03', quality: 1, count: 30 }
      ]
    },
    {
      title: 'Expert Herbs (150 to 225)',
      note: 'Mid-game herbs gathered in Stranglethorn, Arathi, Alterac, and Swamp of Sorrows.',
      items: [
        { itemId: 3357, name: 'Liferoot', icon: 'inv_misc_root_02', quality: 1, count: 30 },
        { itemId: 3818, name: 'Fadeleaf', icon: 'inv_misc_herb_12', quality: 1, count: 30 },
        { itemId: 3821, name: 'Goldthorn', icon: 'inv_misc_herb_15', quality: 1, count: 30 },
        { itemId: 3369, name: "Khadgar's Whisker", icon: 'inv_misc_herb_08', quality: 1, count: 30 },
        { itemId: 4625, name: 'Firebloom', icon: 'inv_misc_herb_19', quality: 1, count: 20 },
        { itemId: 8831, name: 'Purple Lotus', icon: 'inv_misc_herb_17', quality: 1, count: 20 },
        { itemId: 8836, name: "Arthas' Tears", icon: 'inv_misc_herb_13', quality: 1, count: 20 }
      ]
    },
    {
      title: 'Artisan Herbs (225 to 300)',
      note: 'Endgame herbs in Hinterlands, Felwood, Un\'Goro, Western/Eastern Plaguelands & Winterspring.',
      items: [
        { itemId: 8838, name: 'Sungrass', icon: 'inv_misc_herb_18', quality: 1, count: 30 },
        { itemId: 8839, name: 'Blindweed', icon: 'inv_misc_herb_14', quality: 1, count: 30 },
        { itemId: 8845, name: 'Ghost Mushroom', icon: 'inv_mushroom_08', quality: 1, count: 20 },
        { itemId: 8846, name: 'Gromsblood', icon: 'inv_misc_herb_16', quality: 1, count: 25 },
        { itemId: 13464, name: 'Golden Sansam', icon: 'inv_misc_herb_sansamroot', quality: 1, count: 25 },
        { itemId: 13463, name: 'Dreamfoil', icon: 'inv_misc_herb_dreamfoil', quality: 1, count: 30 },
        { itemId: 13465, name: 'Mountain Silversage', icon: 'inv_misc_herb_mountainsilversage', quality: 1, count: 25 },
        { itemId: 13466, name: 'Plaguebloom', icon: 'inv_misc_herb_plaguebloom', quality: 1, count: 25 },
        { itemId: 13467, name: 'Icecap', icon: 'inv_misc_herb_icecap', quality: 1, count: 20 },
        { itemId: 13468, name: 'Black Lotus', icon: 'inv_misc_herb_blacklotus', quality: 2, count: 5 }
      ]
    }
  ]
};

// 6. Upgrade Skinning to 1–300
const skinning = profData.skinning;
skinning.leveling.title = 'Leveling from 1 to 300 (Beast Level Formula & Zones)';
skinning.leveling.capNote = 'Complete 1–300 Artisan Roadmap';
skinning.leveling.steps = skinning.leveling.steps.filter(s => s.type !== 'beta-stop');
const skinStep41 = skinning.leveling.steps.find(s => s.title && s.title.includes('Beasts of Level 41 to 45'));
if (skinStep41) {
  skinStep41.title = 'Beasts of Level 41 to 45 (Skill 205–225)';
}
skinning.shopping = {
  title: 'Leather & Pelt Harvest Checklist (1 to 300)',
  subtitle: 'Target yield counts across all beast tiers from Elwynn/Durotar to Un\'Goro, Winterspring, and Mount Hyjal.',
  groups: [
    {
      title: 'Apprentice & Journeyman Pelts (1 to 150)',
      note: 'Early leather harvested from level 1–30 wildlife.',
      items: [
        { itemId: 2934, name: 'Ruined Leather Scraps', icon: 'inv_misc_pelt_bear_ruin_05', quality: 1, count: 50 },
        { itemId: 2318, name: 'Light Leather', icon: 'inv_misc_leatherscrap_03', quality: 1, count: 120 },
        { itemId: 783, name: 'Light Hide', icon: 'inv_misc_pelt_wolf_ruin_02', quality: 1, count: 15 },
        { itemId: 2319, name: 'Medium Leather', icon: 'inv_misc_leatherscrap_05', quality: 1, count: 120 },
        { itemId: 4232, name: 'Medium Hide', icon: 'inv_misc_pelt_boar_ruin_02', quality: 1, count: 20 },
        { itemId: 4234, name: 'Heavy Leather', icon: 'inv_misc_leatherscrap_07', quality: 1, count: 80 }
      ]
    },
    {
      title: 'Expert Leathers & Scales (150 to 225)',
      note: 'Mid-game hides and scales skinned in STV, Thousand Needles, Arathi, and Desolace.',
      items: [
        { itemId: 4234, name: 'Heavy Leather', icon: 'inv_misc_leatherscrap_07', quality: 1, count: 120 },
        { itemId: 4235, name: 'Heavy Hide', icon: 'inv_misc_pelt_wolf_ruin_03', quality: 1, count: 25 },
        { itemId: 4304, name: 'Thick Leather', icon: 'inv_misc_leatherscrap_08', quality: 1, count: 100 },
        { itemId: 8169, name: 'Thick Hide', icon: 'inv_misc_pelt_bear_ruin_01', quality: 1, count: 20 },
        { itemId: 8167, name: 'Turtle Scale', icon: 'inv_misc_monsterscales_11', quality: 1, count: 40 }
      ]
    },
    {
      title: 'Artisan Leathers & End-Game Hides (225 to 300)',
      note: 'High-level leathers and exotic scales from Un\'Goro, Winterspring, Felwood & Silithus.',
      items: [
        { itemId: 4304, name: 'Thick Leather', icon: 'inv_misc_leatherscrap_08', quality: 1, count: 120 },
        { itemId: 8170, name: 'Rugged Leather', icon: 'inv_misc_leatherscrap_02', quality: 1, count: 150 },
        { itemId: 8171, name: 'Rugged Hide', icon: 'inv_misc_pelt_bear_ruin_02', quality: 1, count: 30 },
        { itemId: 15408, name: 'Heavy Scorpid Scale', icon: 'inv_misc_monsterscales_03', quality: 1, count: 30 },
        { itemId: 15417, name: 'Devilsaur Leather', icon: 'inv_misc_monsterscales_08', quality: 2, count: 20 }
      ]
    }
  ]
};

// 7. Upgrade Fishing to 1–300
const fishing = profData.fishing;
const expRank = fishing.ranks.find(r => r.title && r.title.includes('Expert Fishing'));
if (expRank) {
  expRank.cap = 'Up to 225';
}

fishing.leveling = {
  title: 'Leveling from 1 to 300 (Water Brackets & Nat Pagle Quest)',
  capNote: 'Complete 1–300 Artisan Roadmap',
  desc: 'Fishing levels with every successful catch. Higher skill waters prevent hooked fish from getting away. Train Artisan at Skill 225 and Level 35 via Nat Pagle in Dustwallow Marsh.',
  steps: [
    {
      type: 'rank',
      rank: 'Apprentice Fishing (1–75)',
      details: 'Learned for 1s from any capital city Fishing trainer (e.g. Arnold Leland in Stormwind /way 54.8, 69.6 · Grimnur Stonebrand in Ironforge /way 48.2, 6.6 · Lumak in Orgrimmar /way 69.8, 29.4 · Kah Mistrunner in Thunder Bluff /way 56.0, 46.8).'
    },
    {
      type: 'gather-step',
      from: 1,
      to: 75,
      bar: { iLeft: '0.00%', iWidth: '25.00%', eLeft: '100%' },
      title: 'Capital City Ponds & Starter Coastlines (1–75)',
      zones: 'Dun Morogh, Durotar, Elwynn Forest, Mulgore, Teldrassil, Tirisfal Glades, and capital moats/canals. ~75 total catches (~1 catch per point early on).',
      icons: [
        { itemId: 6291, name: 'Raw Brilliant Smallfish', icon: 'inv_misc_fish_01' },
        { itemId: 6289, name: 'Raw Longjaw Mud Snapper', icon: 'inv_misc_fish_02' }
      ]
    },
    {
      type: 'rank',
      rank: 'Journeyman Fishing (50–150)',
      details: 'Learned at Skill 50 (Level 10) from any Fishing trainer for 5s, raising your maximum fishing skill to 150.'
    },
    {
      type: 'gather-step',
      from: 75,
      to: 150,
      bar: { iLeft: '25.00%', iWidth: '25.00%', eLeft: '100%' },
      title: 'Secondary Coastlines & Mid-Level Waters (75–150)',
      zones: 'Westfall, Loch Modan, Darkshore, The Barrens, Silverpine Forest, and coastal inlets. ~80 catches to advance to 150.',
      icons: [
        { itemId: 6289, name: 'Raw Longjaw Mud Snapper', icon: 'inv_misc_fish_02' },
        { itemId: 6308, name: 'Raw Bristle Whisker Catfish', icon: 'inv_misc_fish_03' },
        { itemId: 6358, name: 'Oily Blackmouth', icon: 'inv_misc_fish_04' }
      ]
    },
    {
      type: 'rank',
      rank: 'Expert Fishing (125–225)',
      details: 'Learned at Skill 125 (Level 20) by reading "Expert Fishing - The Bass and You" (1g, unlimited supply) purchased from Old Man Heming inside Booty Bay, Stranglethorn Vale (/way 27.4, 77.0).'
    },
    {
      type: 'gather-step',
      from: 150,
      to: 225,
      bar: { iLeft: '50.00%', iWidth: '25.00%', eLeft: '100%' },
      title: 'Expert Inland Waters & STV Reefs (150–225)',
      zones: 'Hillsbrad Foothills, Ashenvale, Wetlands, Redridge Mountains, Duskwood, Alterac Mountains, Arathi Highlands, and Northern Stranglethorn. ~95 catches to reach 225.',
      icons: [
        { itemId: 6308, name: 'Raw Bristle Whisker Catfish', icon: 'inv_misc_fish_03' },
        { itemId: 8365, name: 'Raw Mithril Head Trout', icon: 'inv_misc_fish_03' },
        { itemId: 6359, name: 'Firefin Snapper', icon: 'inv_misc_fish_04' }
      ]
    },
    {
      type: 'rank',
      rank: 'Artisan Fishing (225–300)',
      details: 'Unlocked at Skill 225 & Character Level 35 by completing the quest "Nat Pagle, Angler Extreme" from Nat Pagle on his island west of Theramore in Dustwallow Marsh (/way 58.6, 60.0).'
    },
    {
      type: 'gather-step',
      from: 225,
      to: 250,
      bar: { iLeft: '75.00%', iWidth: '8.33%', eLeft: '100%' },
      title: 'Nat Pagle Quest Fish & Coastal Waters (225–250)',
      zones: 'Catch 4 unique quest fish: Feralas Ahi (Verdantis River /way 63.5, 53.6), Misty Reed Mahi Mahi (Swamp of Sorrows /way 90.0, 70.0), Sar\'theris Striker (Desolace /way 26.0, 72.0), Savage Coast Blue Sailfin (STV /way 25.0, 26.0). Plus ~35 open water catches in Tanaris/Feralas.',
      icons: [
        { itemId: 12726, name: 'Feralas Ahi', icon: 'inv_misc_fish_06' },
        { itemId: 12727, name: 'Misty Reed Mahi Mahi', icon: 'inv_misc_fish_06' },
        { itemId: 12728, name: 'Sar\'theris Striker', icon: 'inv_misc_fish_06' },
        { itemId: 12729, name: 'Savage Coast Blue Sailfin', icon: 'inv_misc_fish_06' }
      ]
    },
    {
      type: 'gather-step',
      from: 250,
      to: 275,
      bar: { iLeft: '83.33%', iWidth: '8.33%', eLeft: '100%' },
      title: 'High-Tier Ocean & River Waters (250–275)',
      zones: 'Feralas, The Hinterlands, Tanaris, Dustwallow Marsh, and Moonwell waters in Moonglade. ~40 catches to reach 275.',
      icons: [
        { itemId: 13758, name: 'Raw Redgill', icon: 'inv_misc_fish_05' },
        { itemId: 13759, name: 'Raw Nightfin Snapper', icon: 'inv_misc_fish_04' },
        { itemId: 13422, name: 'Stonescale Eel', icon: 'inv_misc_fish_04' }
      ]
    },
    {
      type: 'gather-step',
      from: 275,
      to: 300,
      bar: { iLeft: '91.67%', iWidth: '8.33%', eLeft: '100%' },
      title: 'Endgame Waters & Elemental Pools (275–300)',
      zones: 'Azshara (Bay of Storms), Winterspring, Western Plaguelands, Un\'Goro Crater, and Jaguero Isle. Requires high-bonus pole + lures (Bright Baubles / Aquadynamic Attractor). ~45 catches to achieve 300 Master Angler.',
      icons: [
        { itemId: 13758, name: 'Raw Redgill', icon: 'inv_misc_fish_05' },
        { itemId: 13760, name: 'Raw Sunscale Salmon', icon: 'inv_misc_fish_05' },
        { itemId: 13889, name: 'Raw Whitescale Salmon', icon: 'inv_misc_fish_05' },
        { itemId: 13760, name: 'Winter Squid', icon: 'inv_misc_fish_13' }
      ]
    }
  ]
};

fishing.shopping = {
  title: 'Angler Gear, Tackle & Catch Checklist (1 to 300)',
  subtitle: 'Essential poles, skill lures, Nat Pagle quest fish, and high-value cooking catches for 1–300.',
  groups: [
    {
      title: 'Poles & Skill-Boosting Lures',
      note: 'Sold by fishing suppliers near docks or crafted by Engineers.',
      items: [
        { itemId: 6365, name: 'Strong Fishing Pole', icon: 'inv_fishingpole_01', quality: 2, count: 1 },
        { itemId: 6529, name: 'Shiny Bauble', icon: 'inv_misc_fish_02', quality: 1, count: 20 },
        { itemId: 6530, name: 'Nightcrawlers', icon: 'inv_misc_fish_02', quality: 1, count: 20 },
        { itemId: 6532, name: 'Bright Baubles', icon: 'inv_misc_fish_02', quality: 1, count: 20 },
        { itemId: 6533, name: 'Aquadynamic Fish Attractor', icon: 'inv_misc_fish_02', quality: 2, count: 10 }
      ]
    },
    {
      title: 'Nat Pagle Artisan Quest Fish (Level 35 / Skill 225)',
      note: 'Four unique quest catches required for Nat Pagle in Dustwallow Marsh.',
      items: [
        { itemId: 12726, name: 'Feralas Ahi', icon: 'inv_misc_fish_06', quality: 1, count: 1 },
        { itemId: 12727, name: 'Misty Reed Mahi Mahi', icon: 'inv_misc_fish_06', quality: 1, count: 1 },
        { itemId: 12728, name: 'Sar\'theris Striker', icon: 'inv_misc_fish_06', quality: 1, count: 1 },
        { itemId: 12729, name: 'Savage Coast Blue Sailfin', icon: 'inv_misc_fish_06', quality: 1, count: 1 }
      ]
    },
    {
      title: 'Target Cooking Fish Catches (1 to 300)',
      note: 'Fish caught along the route and needed for high-tier Cooking power-leveling.',
      items: [
        { itemId: 6291, name: 'Raw Brilliant Smallfish', icon: 'inv_misc_fish_01', quality: 1, count: 50 },
        { itemId: 6289, name: 'Raw Longjaw Mud Snapper', icon: 'inv_misc_fish_02', quality: 1, count: 60 },
        { itemId: 6308, name: 'Raw Bristle Whisker Catfish', icon: 'inv_misc_fish_03', quality: 1, count: 60 },
        { itemId: 8365, name: 'Raw Mithril Head Trout', icon: 'inv_misc_fish_03', quality: 1, count: 60 },
        { itemId: 13758, name: 'Raw Redgill', icon: 'inv_misc_fish_05', quality: 1, count: 70 },
        { itemId: 13760, name: 'Raw Sunscale Salmon', icon: 'inv_misc_fish_05', quality: 1, count: 25 },
        { itemId: 13759, name: 'Raw Nightfin Snapper', icon: 'inv_misc_fish_04', quality: 1, count: 30 }
      ]
    }
  ]
};

// Write updated data/forever_professions.json
fs.writeFileSync(PROFESSIONS_JSON, JSON.stringify(profData, null, 2), 'utf8');
console.log(`Saved updated ${PROFESSIONS_JSON}`);

// Synchronize into js/data/professions-data.js
const profJsContent = fs.readFileSync(PROFESSIONS_JS, 'utf8');
const profDataMarker = 'window.WOW_PROFESSIONS_DATA =';
const idx = profJsContent.indexOf(profDataMarker);
if (idx === -1) {
  throw new Error('Could not find window.WOW_PROFESSIONS_DATA in professions-data.js');
}

const prefix = profJsContent.slice(0, idx);
const updatedJsFile = `${prefix}window.WOW_PROFESSIONS_DATA = ${JSON.stringify(profData, null, 2)};\n`;
fs.writeFileSync(PROFESSIONS_JS, updatedJsFile, 'utf8');
console.log(`Saved synchronized ${PROFESSIONS_JS}`);
