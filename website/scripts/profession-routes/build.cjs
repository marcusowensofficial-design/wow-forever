/**
 * Rebuilds every profession's 1-300 leveling guide + shopping list.
 *
 *   node scripts/profession-routes/build.cjs           # dry run: validate + report
 *   node scripts/profession-routes/build.cjs --write   # write data/forever_professions.json
 *                                                       # and js/data/professions-data.js
 *
 * Crafting routes come from routes-spec.cjs / colors-spec.cjs (Wowhead WoW
 * Forever planner data). Gathering, Camping and callouts are defined below.
 * Item ids, icons and reagents are resolved from the site's own recipe database.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const { loadData, norm } = require('./resolve.cjs');
const SPEC = require('./routes-spec.cjs');
const COLORS = require('./colors-spec.cjs');
const CATALOG_PATH = path.join(__dirname, 'catalog-colors.json');
const CATALOG = fs.existsSync(CATALOG_PATH) ? JSON.parse(fs.readFileSync(CATALOG_PATH, 'utf8')) : {};
const PHANTOM_PATH = path.join(__dirname, 'phantom-recipes.json');
const PHANTOMS = fs.existsSync(PHANTOM_PATH) ? JSON.parse(fs.readFileSync(PHANTOM_PATH, 'utf8')).recipes : [];

const ROOT = path.join(__dirname, '..', '..');
const JSON_PATH = path.join(ROOT, 'data', 'forever_professions.json');
const JS_PATH = path.join(ROOT, 'js', 'data', 'professions-data.js');
const WRITE = process.argv.includes('--write');

const DATA = loadData();
const SOURCES = global.window.WOW_REAGENT_SOURCES || {};
global.window.WOW_CAMPING_MATRIX = undefined;
require(path.join(ROOT, 'js', 'data', 'camping-matrix-data.js'));
const CAMP = global.window.WOW_CAMPING_MATRIX || [];

const errors = [];
const warns = [];

// ---------------------------------------------------------------- helpers
const ALIASES = { 'mithril headed trout': 'mithril head trout', 'dust to motes': 'mote of magic' };
const MANUAL = {
  leatherworking: {
    'gray leather boots': {
      id: 2315, name: 'Gray Leather Boots', icon: 'inv_boots_05', quality: 2,
      reagents: [
        { id: 2319, count: 4, name: 'Medium Leather', icon: 'inv_misc_leatherscrap_05', quality: 1 },
        { id: 2321, count: 2, name: 'Fine Thread', icon: 'inv_fabric_wool_02', quality: 1 },
        { id: 4340, count: 1, name: 'Gray Dye', icon: 'inv_drink_10', quality: 1 },
      ],
    },
  },
};
// Items a recipe makes per craft (only where > 1 and it matters for shopping math).
const YIELD = { 'Gold Power Core': 3, 'Cured Rugged Hide': 2, 'Silver Contact': 5, 'Iron Buckle': 2, 'Mote of Magic': 3 };
// Intermediates the shopping list expands into base materials when the route
// does not already craft enough of them.
const EXPANDABLE = new Set([
  'Bolt of Linen Cloth', 'Bolt of Woolen Cloth', 'Bolt of Silk Cloth', 'Bolt of Mageweave', 'Bolt of Runecloth',
  'Rough Grinding Stone', 'Coarse Grinding Stone', 'Heavy Grinding Stone', 'Solid Grinding Stone', 'Dense Grinding Stone',
  'Rough Blasting Powder', 'Coarse Blasting Powder', 'Heavy Blasting Powder', 'Solid Blasting Powder', 'Dense Blasting Powder',
  'Gold Power Core', 'Cured Rugged Hide', 'Mote of Magic',
]);

function recipeFor(slug, name) {
  const manual = MANUAL[slug] && MANUAL[slug][norm(name)];
  if (manual) return { learn: null, yellow: null, green: null, grey: null, ...manual };
  const want = norm(ALIASES[norm(name)] || name);
  return (DATA[slug].recipes || []).find(r => norm(r.name) === want) || null;
}
const pct = n => `${Math.round((n / 300) * 10000) / 100}%`;
const bar = (from, to) => ({ iLeft: pct(from), iWidth: pct(Math.max(1, to - from)) });
const mapReagent = r => ({ itemId: r.id, name: r.name, count: r.count, icon: r.icon, quality: r.quality || 1 });
const colorObj = c => (c ? { orange: c[0], yellow: c[1], green: c[2], grey: c[3] } : null);
const sourceIsVendor = id => (SOURCES[id] && SOURCES[id].primaryType === 'vendor');

// ------------------------------------------------- rank text (fixed + reused)
// Trainer names/coords below were checked on 2026-11-14 against Wowhead's Forever
// profession overview guides (trainer tables) and Wowhead's Forever NPC database.
// Blacksmithing/leatherworking have no Wowhead Forever trainer table; their NPCs were
// checked one by one in the NPC database. Claims not found there were removed.
const RANK_OVERRIDES = {
  alchemy: {
    Apprentice: 'Learned from any Alchemy trainer (e.g., Lilyssia Nightbreeze in Stormwind /way 55.6, 85.8 · Vosur Brakthel in Ironforge /way 67.0, 54.2 · Whuut in Orgrimmar /way 56.0, 33.8 · Doctor Martin Felben in Undercity /way 46.6, 74.6), up to 75. Zephras Isle has Apprentice trainers in Shen\'dar Village and Valanaar.',
    Journeyman: 'Learned from Journeyman trainers (Skill 50, Level 10), up to 150 — Lilyssia Nightbreeze (Stormwind), Tally Berryfizz (Ironforge /way 67.2, 54.2), Kylanna in Silverwind Refuge, Ashenvale (/way 50.0, 67.0), Yelmak (Orgrimmar /way 56.6, 33.2), Bena Winterhoof (Thunder Bluff), Doctor Marsh (Undercity), Serge Hinott in Tarren Mill, or Jaxin Chong in Booty Bay (/way 28.0, 78.0, Neutral).',
  },
  blacksmithing: {
    Apprentice: 'Learned from any Blacksmithing trainer (e.g., Therum Deepforge in Stormwind\'s Dwarven District · Bengus Deepforge in Ironforge /way 51.4, 42.2 · Saru Steelfury in Orgrimmar /way 82.2, 23.0 · Basil Frye in Undercity /way 59.2, 29.4), up to 75.',
    Expert: 'Learned from Expert trainers (Skill 125, Level 20), up to 225 — Bengus Deepforge in Ironforge (/way 51.4, 42.2, A), Saru Steelfury in Orgrimmar (/way 82.2, 23.0, H) or James Van Brunt in Undercity (/way 61.2, 29.2, H).',
    Artisan: 'Learned from Brikk Keencraft in Booty Bay, Stranglethorn Vale (/way 29.0, 75.4, Neutral, Skill 200 & Level 35), up to 300. Armorsmith specialization: Grumnus Steelshaper in Ironforge (/way 49.0, 43.6) or Okothos Ironrager in Orgrimmar (/way 79.4, 23.4). Weaponsmith: Ironus Coldsteel in Ironforge (/way 49.4, 44.8) or Borgosh Corebender in Orgrimmar (/way 79.4, 23.4).',
  },
  enchanting: {
    Apprentice: 'Learned from any Enchanting trainer (e.g., Lucan Cordell in Stormwind /way 43.0, 64.2 · Gimble Thistlefuzz in Ironforge /way 60.0, 45.2 · Godan in Orgrimmar /way 53.8, 38.4 · Lavinia Crowe in Undercity /way 62.6, 61.4), up to 75.',
    Journeyman: 'Learned from Journeyman trainers (Skill 50, Level 10), up to 150 — the capital city trainers, Alanna Raveneye in Teldrassil, Vance Undergloom in Brill, or Xylinnia Starshine in Feathermoon Stronghold, Feralas.',
    Artisan: 'Learned from Annora <Master Enchanter> deep inside Uldaman, Badlands (both factions, Skill 200 & Level 35). She sits between the Map Chamber and the Temple Hall and only appears after you clear the scorpids around her. Up to 300.',
  },
  engineering: {
    Apprentice: 'Learned from any Engineering trainer (e.g., Lilliam Sparkspindle in Stormwind /way 62.2, 30.6 · Springspindle Fizzlegear in Ironforge /way 68.8, 45.2 · Roxxik in Orgrimmar /way 76.0, 25.0 · the Strange Hermit on Zephras Isle /way 54.0, 39.0), up to 75.',
    Journeyman: 'Learned from Journeyman trainers (Skill 50, Level 10), up to 150 — the capital city trainers, Trixie Quikswitch in Ironforge, Nogg in Orgrimmar, or Finbus Geargrind in Darkshire, Duskwood (/way 77.4, 48.4).',
    Expert: 'Learned from Expert trainers (Skill 125, Level 20), up to 225 — Springspindle Fizzlegear in Ironforge (/way 68.8, 45.2, A) or Roxxik in the Valley of Honor, Orgrimmar (/way 76.0, 25.0, H).',
    Artisan: 'Learned from Buzzek Bracketswing in Gadgetzan, Tanaris (/way 52.2, 27.6, Neutral, Skill 200 & Level 35) or Kaylaena Springwhisper in Mount Hyjal (Forever), up to 300. Specializations: Gnomish Engineering from Tinkmaster Overspark in Ironforge (/way 70.6, 50.4) or Oglethorpe Obnoticus in Booty Bay (/way 28.2, 76.2); Goblin Engineering from Nixx Sprocketspring in Gadgetzan (/way 52.4, 27.2). Melbin Powderfuse in Riverglades (/way 77.6, 50.8) teaches Forever goblin recipes.',
  },
  leatherworking: {
    Apprentice: 'Learned from any Leatherworking trainer (e.g., Simon Tanner in Stormwind /way 67.2, 49.4 · Fimble Finespindle in Ironforge /way 39.4, 33.0 · Adele Fielder in Goldshire /way 46.4, 62.2 · Karolek in Orgrimmar /way 62.8, 44.4), up to 75.',
    Expert: 'Learned from Expert trainers (Skill 125, Level 20), up to 225 — Telonis in Darnassus (/way 64.4, 21.4, A) or Una in Thunder Bluff (/way 41.4, 42.6, H).',
    Artisan: 'Learned from Artisan trainers (Skill 200, Level 35), up to 300 — Drakk Stonehand in Aerie Peak, The Hinterlands (/way 13.4, 43.4, A) or Hahrana Ironhide in Camp Mojache, Feralas (/way 74.4, 43.0, H). Specializations at 225 & Lvl 40: Dragonscale (Peter Galen in Azshara /way 37.4, 65.4 · Thorkaf Dragoneye in Badlands /way 62.4, 57.4), Elemental (Sarah Tanner in Searing Gorge /way 63.2, 75.4 · Brumn Winterhoof in Arathi /way 28.2, 45.0), or Tribal (Caryssia Moonhunter in Feralas · Se\'Jib in Stranglethorn Vale /way 36.4, 34.0).',
  },
  tailoring: {
    Journeyman: 'Learned from Journeyman trainers (Skill 50, Level 10), up to 150 — the capital city trainers, Eldrin in Elwynn Forest, Bowen Brisboise in Tirisfal Glades, Grondal Moonbreeze in Darkshore, Kil\'hala in The Barrens, or Othesia Evengale / Taleen Shimmerthread on Zephras Isle.',
    Expert: 'Learned at Skill 125 (Level 20), up to 225, from Georgio Bolero in Mage Quarter, Stormwind (/way 43.2, 73.6, A) or Josef Gregorian in Magic Quarter, Undercity (/way 70.6, 30.6, H). Both are Artisan Tailors, and they are also where you learn Bolt of Mageweave and the newer Forever crafts.',
  },
  mining: {
    Apprentice: 'Learned from the "Mining for Dummies" starter quest reward or trainers: Gelman Stonehand in Stormwind (/way 59.0, 37.6), Geofram Bouldertoe in Ironforge (/way 50.4, 26.0), Makaru in Orgrimmar (/way 73.0, 26.4), Brek Stonehoof in Thunder Bluff (/way 34.6, 57.6), Brom Killian in Undercity (/way 56.0, 37.0), plus Messana Crestwind and Halavuul Cragwind on Zephras Isle and Grungle in Powderfuse Port, Riverglades.',
    Expert: 'Learned at Skill 125 (Level 20) from the full Mining trainers (capital cities and towns such as Thelsamar, Auberdine, Darkshire, Razor Hill and The Sepulcher), up to 225.',
    Artisan: 'Learned at Skill 200 (Level 35) from the full Mining trainers — capital cities, Pikkle in Gadgetzan (/way 51.0, 28.0) or Grungle in Powderfuse Port, Riverglades (/way 77.6, 51.8) — up to 300. Unlocks Smelt Truesilver (230), Smelt Dark Iron (230, Blackrock Depths quest), Smelt Thorium (250), Smelt Azerothium (275, Forever New), and Smelt Heavy Thorium (300, Forever New).',
  },
  herbalism: {
    Apprentice: 'Learned from the "Wild Harvest" starter quest reward or trainers: Tannysa in Stormwind (/way 44.8, 77.0), Reyna Stonebranch in Ironforge (/way 55.6, 58.0), Firodren Mooncaller in Darnassus (/way 48.0, 68.0), Jandi in Orgrimmar (/way 55.6, 39.6), Komin Winterhoof in Thunder Bluff (/way 49.8, 39.8), Martha Alliestar in Undercity (/way 54.8, 50.2), and Halassa Fernbreeze / Syriel Nightrain on Zephras Isle.',
    Expert: 'Learned at Skill 125 from the full Herbalism trainers (capital cities and towns), including Edward Egan in Dalaran, Alterac Mountains (/way 18.4, 63.2, A), up to 225.',
    Artisan: 'Learned at Skill 200 from the full Herbalism trainers — capital cities, Flora Silverwind in Booty Bay (/way 27.6, 77.6) or Malvor in Nighthaven, Moonglade (/way 45.6, 46.8) — up to 300.',
  },
  skinning: {
    Apprentice: 'Learned from the "Pelt Collecting for Beginners" starter quest reward or trainers: Maris Granger in Stormwind (/way 67.8, 49.0), Balthus Stoneflayer in Ironforge (/way 39.8, 33.0), Thuwd in Orgrimmar (/way 63.2, 45.2), Mooranta in Thunder Bluff (/way 45.2, 43.6), Killian Hagey in Undercity (/way 71.0, 59.4), and Mendalass Tattermend / Ishlee Breezewhisper on Zephras Isle.',
    Expert: 'Learned at Skill 125 from the full Skinning trainers — capital cities or towns such as Jayla in Silverwind Refuge, Ashenvale (/way 50.0, 67.2) or Kulleg Stonehorn in Camp Mojache, Feralas (/way 74.4, 43.0) — up to 225.',
    Artisan: 'Learned at Skill 200 from the full Skinning trainers (capital cities and towns), up to 300.',
  },
  cooking: {
    Apprentice: 'Learned from any Cooking trainer (e.g., Stephen Ryback in Stormwind /way 78.2, 53.0 · Daryl Riknussun in Ironforge /way 60.4, 38.0 · Zamja in Orgrimmar /way 57.6, 53.6), up to 75. All cooked foods grant Well Fed (+5% Kill XP) in Forever!',
  },
  fishing: {
    Apprentice: 'Learned from any Fishing trainer (e.g. Arnold Leland in Stormwind /way 55.0, 69.6 · Grimnur Stonebrand in Ironforge /way 48.4, 6.4 · Lumak in Orgrimmar /way 69.8, 29.6 · Kah Mistrunner in Thunder Bluff /way 56.0, 46.8 · Krix in Powderfuse Port, Riverglades /way 79.2, 54.6).',
  },
  'first-aid': {
    Apprentice: 'Learned from any First Aid trainer (e.g., Shaina Fuller in Stormwind /way 42.8, 26.6 · Nissa Firestone in Ironforge /way 54.8, 58.6 · Arnok in Orgrimmar /way 34.0, 84.4), up to 75. Teaches Linen Bandages + Minor Healing Potion at Skill 1!',
  },
};

function existingRankDetails(slug) {
  const map = {};
  for (const s of (DATA[slug].leveling.steps || [])) {
    if (s.type !== 'rank') continue;
    const key = ['Apprentice', 'Journeyman', 'Expert', 'Artisan'].find(k => s.rank.includes(k));
    if (key) map[key] = s.details;
  }
  return map;
}
const rankDetails = slug => ({ ...existingRankDetails(slug), ...(RANK_OVERRIDES[slug] || {}) });
// For professions whose steps are reused as-is (skinning, fishing).
const withRankOverrides = (slug, steps) => steps.map(s => {
  if (s.type !== 'rank') return s;
  const key = ['Apprentice', 'Journeyman', 'Expert', 'Artisan'].find(k => s.rank.includes(k));
  const o = key && (RANK_OVERRIDES[slug] || {})[key];
  return o ? { ...s, details: o } : s;
});

// ------------------------------------------------------- crafting builder
function buildCrafting(slug) {
  const ranks = rankDetails(slug);
  const colors = COLORS[slug] || {};
  const steps = [];
  for (const e of SPEC[slug]) {
    if (!Array.isArray(e) && e.rank) {
      steps.push({ type: 'rank', rank: e.rank, details: ranks[e.rank] || '' });
      continue;
    }
    if (!Array.isArray(e) && e.tool) {
      const r = recipeFor(slug, e.tool);
      if (!r) { errors.push(`${slug}: tool ${e.tool} not found`); continue; }
      const c = colors[e.tool];
      if (!c) warns.push(`${slug}: no Wowhead colors for tool ${e.tool}`);
      steps.push({
        type: 'step', from: e.at, to: e.at, bar: bar(e.at, e.at), itemId: r.id,
        recipeName: `Make a ${e.tool}`, source: 'Learned from the trainer · tool, keep it in your bags',
        advice: e.advice || '', crafts: 1, craftsSafe: 1, colors: colorObj(c), reagents: r.reagents.map(mapReagent),
      });
      continue;
    }
    if (!Array.isArray(e) && e.note) {
      steps.push({
        type: 'gather-step', from: e.from, to: e.to, bar: bar(e.from, e.to), title: e.note, zones: e.text,
        icons: [
          { itemId: 10940, icon: 'inv_enchant_duststrange', name: 'Strange Dust' },
          { itemId: 10938, icon: 'inv_enchant_essencemagicsmall', name: 'Lesser Magic Essence' },
          { itemId: 10978, icon: 'inv_enchant_shardglimmeringsmall', name: 'Small Glimmering Shard' },
        ],
      });
      continue;
    }
    const [from, to, name, crafts, safe, source, advice] = e;
    const r = recipeFor(slug, name);
    if (!r) { errors.push(`${slug}: recipe "${name}" not found`); continue; }
    const c = colors[name];
    if (!c) errors.push(`${slug}: no Wowhead colors for "${name}"`);
    else {
      if (c[0] > from) errors.push(`${slug}: ${from}-${to} ${name} not learnable until ${c[0]}`);
      if (c[3] < to) errors.push(`${slug}: ${from}-${to} ${name} is grey at ${c[3]}`);
      if (r.grey && (r.grey !== c[3] || r.yellow !== c[1])) {
        warns.push(`${slug}: DB colors for ${name} [${r.learn}/${r.yellow}/${r.green}/${r.grey}] differ from Wowhead [${c.join('/')}]`);
      }
    }
    if (!(safe >= crafts)) errors.push(`${slug}: ${name} craftsSafe < crafts`);
    steps.push({
      type: 'step', from, to, bar: bar(from, to), itemId: r.id, recipeName: name,
      source: source || 'Learned from the trainer', advice: advice || '',
      crafts, craftsSafe: safe, colors: colorObj(c), reagents: r.reagents.map(mapReagent),
    });
  }
  // continuity check: each step starts where the previous one ended
  let at = 1;
  for (const s of steps) {
    if (s.type !== 'step' && s.type !== 'gather-step') continue;
    if (s.from === s.to && s.recipeName && s.recipeName.startsWith('Make a')) continue;
    if (s.from !== at) errors.push(`${slug}: gap/overlap at ${at} -> step starts ${s.from} (${s.recipeName || s.title})`);
    at = s.to;
  }
  if (at !== 300) errors.push(`${slug}: route ends at ${at}, not 300`);
  return steps;
}

// ----------------------------------------------------- shopping generator
function buildShopping(slug, steps, title) {
  const need = new Map();   // name -> {meta,count}
  const made = new Map();   // name -> produced count
  const add = (r, n) => {
    const cur = need.get(r.name) || { meta: r, count: 0 };
    cur.count += n; need.set(r.name, cur);
  };
  for (const s of steps) {
    if (s.type !== 'step') continue;
    for (const r of s.reagents) add(r, r.count * s.crafts);
    const out = (s.recipeName || '').replace(/^Make a /, '');
    const rec = recipeFor(slug, out);
    if (rec) made.set(rec.name, (made.get(rec.name) || 0) + s.crafts * (YIELD[rec.name] || 1));
  }
  // expand intermediates
  const alongTheWay = [];
  for (let pass = 0; pass < 3; pass++) {
    for (const [name, v] of [...need]) {
      const produced = made.get(name) || 0;
      if (produced > 0 || EXPANDABLE.has(name)) {
        const deficit = v.count - produced;
        need.delete(name);
        if (deficit <= 0) continue;
        const rec = recipeFor(slug, name);
        if (!rec || !EXPANDABLE.has(name)) { need.set(name, { ...v, count: deficit }); continue; }
        const per = YIELD[name] || 1;
        const extra = Math.ceil(deficit / per);
        alongTheWay.push({ ...v.meta, count: deficit });
        made.set(name, produced + extra * per);
        for (const r of rec.reagents) add(mapReagent(r), r.count * extra);
      }
    }
  }
  const vendor = [], gathered = [];
  for (const [, v] of need) {
    const item = { itemId: v.meta.itemId, name: v.meta.name, icon: v.meta.icon, quality: v.meta.quality || 1, count: v.count };
    (sourceIsVendor(item.itemId) ? vendor : gathered).push(item);
  }
  const byCount = (a, b) => b.count - a.count;
  const groups = [];
  if (vendor.length) groups.push({ title: 'From a trade supplies vendor', note: 'Always in stock, for a few coins.', items: vendor.sort(byCount) });
  if (gathered.length) groups.push({ title: 'Gathered, looted or bought from other players', note: 'The bulk of the cost: farm it or look at the auction house.', items: gathered.sort(byCount) });
  if (alongTheWay.length) groups.push({ title: 'Made along the way', note: 'Extra components the route crafts for itself; their raw materials are already counted above.', items: alongTheWay.map(i => ({ itemId: i.itemId, name: i.name, icon: i.icon, quality: i.quality || 1, count: i.count })).sort(byCount) });
  return {
    title: title || 'Reagent Shopping List (1 to 300)',
    subtitle: 'Totals for the average craft counts in the 1–300 route. Buy ~10% extra, or use the "to be safe" counts on each step.',
    groups,
  };
}

// -------------------------------------------------------------- callouts
const PERKS = {
  icon: '🏆',
  title: 'Forever Skill-Up Boosters: Legacy Perks & Camp Objects',
  text: 'Legacy perk Working Overtime raises your chance to gain a skill point from every tradeskill by 4% per rank (5 ranks). Dedicated Study raises your lowest profession by 1 once a day. Every profession also teaches camp objects at skill 20 and 140 (and a third at 300): each one is a recipe, so craft it once for an extra skill point.',
};

const CALLOUTS = {
  alchemy: [
    { icon: '🧪', title: 'Forever Zone Flasks: Mount Hyjal, Hyjal Summit & the Barrow Deeps', text: 'Flask of Natural Accuracy, Aggression, Precision and Swiftness (items 274273–274276, level 55) each give +30 Stamina for 2 hours and persist through death. Inside Mount Hyjal, Hyjal Summit and the Barrow Deeps they add 2% Hit, 2% Critical Strike, 2% less chance to be dodged/parried, or 2% Haste respectively.' },
    { icon: '⚗️', title: 'Camp Objects & Forever Potions', text: 'Mana Well (skill 20) and Fermenter (skill 140) are your camp objects — the Fermenter is also the station for Viridian Dye at 227. Forever adds Discolored Healing Potions (big heals with a damage-over-time drawback; the Major one is taught by the Odd Child in Westfall or Apothecary Renferrel in Silverpine) and Potion of Predatory Senses (stand still to see stealthed enemies\' heat trails for 1.5 min).' },
    PERKS,
  ],
  blacksmithing: [
    { icon: '⚒️', title: 'Camp Objects: Sharpening Wheel, Anvil & Master Forge', text: 'Sharpening Wheel at 20 (1 Rough Stone, 1 Copper Bar) and Anvil at 140 (5 Bronze Bar, 2 Coarse Grinding Stone, 2 Medium Leather) are one-off crafts worth a skill point each. The Master Forge at 300 (Golem Heart, 5 Thorium Bar, 2 Rugged Leather) is required for the strongest Forever plans.' },
    { icon: '⛏️', title: 'Plan for the 250–300 Metal Bill', text: 'The last 50 points need ~11 Arcanite Bars (an Alchemist\'s daily transmute), Truesilver for Ebon Shivs, and about 900 Thorium Bars plus ~290 Azerothium Bars for Bold Dirks. Azerothium is smelted from Pitchblende at Mining 275, so Mining is the natural partner. At 200 (level 40) you can specialise as Armorsmith or Weaponsmith; the route above works for both.' },
    PERKS,
  ],
  enchanting: [
    { icon: '✨', title: 'Forever Change: Disenchanting Levels You to 20', text: 'Every green or better item you disenchant is a guaranteed skill point up to 20; after that the chance falls off and stops at 60. Keep every dust and essence — the next steps use them. Your camp objects are the Enchanted Lute (skill 20) and the Arcane Salvager (skill 140, makes disenchanting more efficient).' },
    { icon: '🪄', title: 'Rods Are Tools, Not Steps', text: 'Each Runed Rod (Copper → Silver → Golden → Truesilver) is a one-time craft you keep in your bags. Buy the plain rod from a Blacksmith or the auction house before the step that needs it so you never stall mid-bracket.' },
    PERKS,
  ],
  engineering: [
    { icon: '🦄', title: 'Desolace Mobility: Hoof-Shaped Foot Pedal & Centaur War', text: 'The Hoof-Shaped Foot Pedal (item 269902) turns you into a centaur for 20 minutes or until combat; inside Desolace you also run 30% faster and the form persists through combat. The Centaur Banner Deployment Device (item 269900, toy) plants your chosen clan banner during the Desolace centaur war.' },
    { icon: '🤖', title: 'Camp Objects & Forever Gadgets', text: 'Reagent Bot (skill 20) and Repair Bot (skill 140) let everyone at your camp buy reagents and repair. SAF-T Nitro Boosts (item 260828) are a cloth belt with 3 charges of a 160% speed burst. Gnomish or Goblin specialisation unlocks at skill 200.' },
    PERKS,
  ],
  leatherworking: [
    { icon: '⛺', title: 'Camp Objects: Camp Tent & Tanning Rack', text: 'The Camp Tent (skill 20, 5 Light Leather) is the only camp object that grants rested XP — sit by it for up to 5% of a level. The Tanning Rack (skill 125, 5 Medium Leather, 3 Fine Thread, 2 Simple Wood) replaces it and is required to cure Rugged Hides at 225, so craft one before Artisan.' },
    { icon: '🐉', title: 'Specialisations at 225', text: 'At skill 225 (level 40) choose Dragonscale, Elemental or Tribal Leatherworking from their specialist trainers. The 1–300 route above uses no specialisation-locked patterns.' },
    PERKS,
  ],
  tailoring: [
    { icon: '⚠️', title: '285–300 Needs Cenarion Circle Rep and a Loom', text: 'Wowhead\'s planner confirms that no vendor pattern takes Tailoring past 295 without Cenarion Circle reputation (Friendly for Venomspew Gloves, Honored for the Cord and Footpads), and those patterns need a Loom — a camp object only a 300 Tailor can place. Start Silithus quests early and arrange a Loom with your guild.' },
    { icon: '🧵', title: 'Camp Objects & the Runecloth Bill', text: 'Faction Banner at 20 and Spinning Wheel at 140 (needed for Robe of Power at 158). No trainer teaches the Spinning Wheel: it comes from Blueprint: Spinning Wheel, sold by the Happy Camper for 15s or dropped by the Unstable Sentinel in Dalaran. From 205 to 300 you will spin roughly 2,300 Runecloth into bolts, mostly for Runecloth Cuffs — farm Runecloth throughout your 50s.' },
    PERKS,
  ],
  cooking: [
    { icon: '🔥', title: 'Cooking Builds the Camp', text: 'Cooks make the campfires every other camp object needs: Basic Campfire Kit at skill 1 (holds 3 objects), Journeyman Campfire (blueprint at 90, 5 objects) and Expert Campfire (220, 10 objects). Cookie\'s Feast (140) and the Iron Oven (300) are the cook\'s camp objects.' },
    { icon: '🍲', title: 'Forever Cooking Perks', text: 'Many Forever dishes and drinks add +5% experience from kills while Well Fed. Wastewanderer Rations (trinket, item 277950) make Well Fed last 50% longer, and twice as long in wasteland zones.' },
    PERKS,
  ],
  'first-aid': [
    { icon: '🩹', title: 'Forever First Aid: Potions, Poultices & Tourniquets', text: 'First Aid now makes healing potions (Minor, Lesser at 55, Healing at 110 and up), disease-curing poultices, anti-venoms and bleed tourniquets as well as bandages. The route above mixes potions in where they level faster than bandages.' },
    { icon: '🧺', title: 'Camp Objects & a Cloth-Only Alternative', text: 'First Aid Kit (skill 20), Toxin Study (140) and Plague Doctor\'s Laboratory (300). Prefer cloth only? Linen 1–40, Heavy Linen 40–80, Wool 80–115, Heavy Wool 115–150, then the same bandage route above from 150.' },
    PERKS,
  ],
};

// ------------------------------------------------------ gathering guides
const G = (from, to, title, zones, icons) => ({ type: 'gather-step', from, to, bar: bar(from, to), title, zones, icons });
const I = (itemId, name, icon) => ({ itemId, name, icon });
function campStep(slug, at, name) {
  const m = CAMP.find(c => c.name === name);
  const r = m ? m.reagents.map(x => `${x.count} ${x.name}`).join(', ') : '';
  return G(at, at, `Craft your camp object once: ${name} (skill ${at})`, `A one-off recipe worth a skill point${r ? ` — ${r}` : ''}.`, m ? [I(m.itemId, name, 'inv_misc_bag_10')] : []);
}
// Smelting colors from Wowhead's Forever spell data [orange, yellow, green, grey].
const SMELT = {
  'Smelt Copper': ['Copper Bar', [1, 25, 47, 70]], 'Smelt Tin': ['Tin Bar', [65, 65, 65, 75]],
  'Smelt Bronze': ['Bronze Bar', [65, 65, 90, 115]],
  'Smelt Silver': ['Silver Bar', [75, 100, 112, 125]], 'Smelt Iron': ['Iron Bar', [125, 130, 135, 140]],
  'Smelt Gold': ['Gold Bar', [155, 170, 177, 185]],
};
function smelt(from, to, name, advice) {
  const [barName, c] = SMELT[name];
  const r = recipeFor('mining', barName);
  if (!r) { errors.push(`mining: ${barName} not found`); return null; }
  const crafts = expectedCrafts(from, to, c);
  return {
    type: 'step', from, to, bar: bar(from, to), itemId: r.id, recipeName: name,
    source: 'Learned from your Mining trainer', advice, crafts, craftsSafe: Math.ceil(crafts * 1.12),
    colors: colorObj(c), reagents: r.reagents.map(mapReagent),
  };
}
// Expected crafts with the community model: orange = 1/craft, yellow/green
// chance = (grey - skill) / (grey - yellow).
function expectedCrafts(from, to, [, y, , g]) {
  let n = 0;
  for (let s = from; s < to; s++) n += s < y ? 1 : (g - y) / Math.max(1, g - s);
  return Math.round(n);
}

function buildMining() {
  // Smelting counts follow Wowhead's "1-185 Mining Leveling by Smelting in Forever";
  // node brackets follow its "Leveling by Mining" table, extended to 300 with Forever nodes.
  const ranks = rankDetails('mining');
  const fixed = (from, to, name, crafts, advice, noColors) => {
    const s = smelt(from, to, name, advice);
    if (!s) return null;
    s.crafts = crafts; s.craftsSafe = Math.ceil(crafts * 1.08);
    if (noColors) s.colors = null;
    return s;
  };
  const steps = [
    { type: 'rank', rank: 'Apprentice Mining (1–75)', details: ranks.Apprentice },
    G(1, 65, 'Mine Copper Veins (1)', 'Any starter zone — Forever adds Poor Copper Veins in Elwynn Forest, Durotar and Mulgore. Drops Copper Ore and Rough Stone. Level by mining nodes, by smelting (steps below), or a mix of both depending on ore prices.', [I(2770, 'Copper Ore', 'inv_ore_copper_01'), I(2835, 'Rough Stone', 'inv_stone_06')]),
    fixed(1, 65, 'Smelt Copper', 130, 'Smelting route: 130 Copper Ore. Keep 60 Copper Bars for Bronze at 75. Orange to 25, yellow to 47, then green.'),
    campStep('mining', 20, 'Lodestone'),
    { type: 'rank', rank: 'Journeyman Mining (50–150)', details: ranks.Journeyman },
    G(65, 125, 'Mine Copper, Tin (65) & Silver (75) Veins', 'Ashenvale, Redridge Mountains, The Barrens and Thousand Needles. Incendicite (Wetlands) and Lesser Bloodstone (Arathi) are quest ores at 65/75.', [I(2771, 'Tin Ore', 'inv_ore_tin_01'), I(2775, 'Silver Ore', 'inv_stone_16'), I(2836, 'Coarse Stone', 'inv_stone_09')]),
    fixed(65, 75, 'Smelt Tin', 60, 'Smelting route: 60 Tin Ore. Tin is green from the start and grey at 75 — you smelt 60 mainly for the Bronze bars.', true),
    fixed(75, 100, 'Smelt Bronze', 60, 'Uses the 60 Copper Bars and 60 Tin Bars from the previous steps.'),
    fixed(100, 125, 'Smelt Silver', 70, 'Smelting route: 70 Silver Ore (scarce — buy it or mine instead).'),
    { type: 'rank', rank: 'Expert Mining (125–225)', details: ranks.Expert },
    G(125, 175, 'Mine Iron Deposits (125), Cold Iron Deposits (125, Forever) & Gold Veins (155)', 'Arathi Highlands, Desolace, Stranglethorn Vale and Thousand Needles; Forever adds Cold Iron Deposits in Duskwood. Tin Veins stop giving points at 165. Nothing smelts for points between 140 and 155, so mine through that gap.', [I(2772, 'Iron Ore', 'inv_ore_iron_01'), I(2776, 'Gold Ore', 'inv_ore_copper_01'), I(2838, 'Heavy Stone', 'inv_stone_12')]),
    fixed(125, 140, 'Smelt Iron', 35, 'Smelting route: 35 Iron Ore. Grey at 140.'),
    campStep('mining', 140, 'Rock Garden'),
    fixed(155, 185, 'Smelt Gold', 60, 'Smelting route: 60 Gold Ore. The last smelt that levels you — past 185 only mining nodes give points.'),
    G(175, 225, 'Mine Gold, Mithril (175), Fool\'s Gold Veins (175, Forever) & Truesilver (230)', 'Azshara, Tanaris and the Hinterlands; Forever adds Fool\'s Gold Veins in Ashenvale. Silver Veins stop giving points around here.', [I(3858, 'Mithril Ore', 'inv_ore_mithril_02'), I(7911, 'Truesilver Ore', 'inv_ore_truesilver_01'), I(7912, 'Solid Stone', 'inv_stone_10')]),
    { type: 'rank', rank: 'Artisan Mining (225–300)', details: ranks.Artisan },
    G(225, 275, 'Mine Mithril, Truesilver, Dark Iron (230), Small Thorium & Starsilver Veins (245, Forever)', 'Un\'Goro Crater, Silithus, Burning Steppes, Searing Gorge, Blasted Lands and Felwood; Forever adds Starsilver Veins in the Hinterlands.', [I(10620, 'Thorium Ore', 'inv_ore_thorium_02'), I(12365, 'Dense Stone', 'inv_misc_stonetablet_07')]),
    G(275, 300, 'Mine Rich Thorium Veins (275) & Heavy Thorium Veins (300, Forever)', 'Rich Thorium in Winterspring, Eastern Plaguelands, Azshara, Silithus and Zul\'Gurub; Forever\'s Heavy Thorium Veins are in Mount Hyjal. Pitchblende from these nodes smelts into Azerothium Bars at 275.', [I(10620, 'Thorium Ore', 'inv_ore_thorium_02'), I(12363, 'Arcane Crystal', 'inv_misc_gem_crystal_01'), I(12365, 'Dense Stone', 'inv_misc_stonetablet_07')]),
  ].filter(Boolean);
  return steps;
}

function buildHerbalism() {
  const ranks = rankDetails('herbalism');
  return [
    // Brackets follow Wowhead's "Herbalism Profession Overview in Forever": Forever moves each
    // herb's yellow -> green point later than Classic, so every herb stays useful longer.
    { type: 'rank', rank: 'Apprentice Herbalism (1–75)', details: ranks.Apprentice },
    G(1, 70, 'Peacebloom & Silverleaf (1 · green 65), Earthroot (15 · green 80)', 'Any starter zone — even the starting areas have Wilted Peacebloom and Stunted Silverleaf. The "Wild Harvest" quest reward teaches Herbalism (+2 skill).', [I(2447, 'Peacebloom', 'inv_misc_flower_02'), I(765, 'Silverleaf', 'inv_misc_herb_10'), I(2449, 'Earthroot', 'inv_misc_herb_07')]),
    campStep('herbalism', 20, 'Incense Candle'),
    { type: 'rank', rank: 'Journeyman Herbalism (50–150)', details: ranks.Journeyman },
    G(70, 115, 'Mageroyal (50 · green 115), Briarthorn (70 · green 135) & Stranglekelp (85 · green 150)', 'Darkshore, Loch Modan and Silverpine Forest. Stranglekelp only grows underwater.', [I(785, 'Mageroyal', 'inv_jewelry_talisman_03'), I(2450, 'Briarthorn', 'inv_misc_root_01'), I(3820, 'Stranglekelp', 'inv_misc_herb_11')]),
    G(115, 170, 'Bruiseweed (100), Wild Steelbloom (115), Grave Moss (120), Kingsblood & Nightmare Moss (125), Liferoot (150)', 'Hillsbrad Foothills, Wetlands and Stonetalon Mountains; Grave Moss near crypts and graveyards. Forever adds Nightmare Moss in Duskwood.', [I(2453, 'Bruiseweed', 'inv_misc_herb_01'), I(3355, 'Wild Steelbloom', 'inv_misc_flower_01'), I(3356, 'Kingsblood', 'inv_misc_herb_03'), I(3357, 'Liferoot', 'inv_misc_root_02')]),
    { type: 'rank', rank: 'Expert Herbalism (125–225)', details: ranks.Expert },
    G(140, 140, 'Camp object: Greenhouse (skill 140)', 'Not a trainer recipe — the blueprint drops from Shadetooth at the Excavation Site in the Wetlands. It grows herbs from the seeds you gather.', [I(279964, 'Greenhouse', 'inv_misc_bag_10')]),
    G(170, 205, 'Kingsblood, Liferoot, Fadeleaf (160), Goldthorn (170) & Khadgar\'s Whisker (185)', 'Stranglethorn Vale and Arathi Highlands.', [I(3818, 'Fadeleaf', 'inv_misc_herb_12'), I(3821, 'Goldthorn', 'inv_misc_herb_15'), I(3358, "Khadgar's Whisker", 'inv_misc_herb_08')]),
    G(205, 225, 'Wintersbite (195), Firebloom & Dreamroot (205, Forever), Purple Lotus (210)', 'Alterac Mountains (Wintersbite only grows in its snow), Tanaris and Searing Gorge; Forever adds Dreamroot in Ashenvale.', [I(4625, 'Firebloom', 'inv_misc_herb_19'), I(8831, 'Purple Lotus', 'inv_misc_herb_17')]),
    { type: 'rank', rank: 'Artisan Herbalism (225–300)', details: ranks.Artisan },
    G(225, 260, 'Arthas\' Tears (220), Sungrass (230), Blindweed (235), Ghost Mushroom (245), Gromsblood, Moonroot & Star Lotus (250)', 'Felwood, the Plaguelands, Feralas, the Hinterlands, Swamp of Sorrows and Un\'Goro Crater. Forever adds Moonroot in Feralas and Star Lotus in the Hinterlands.', [I(8836, "Arthas' Tears", 'inv_misc_herb_13'), I(8838, 'Sungrass', 'inv_misc_herb_18'), I(8846, 'Gromsblood', 'inv_misc_herb_16')]),
    G(260, 300, 'Golden Sansam (260), Dreamfoil (270), Mountain Silversage (280), Plaguebloom (285), Icecap (290), Black Lotus & Demonsage (300)', 'Felwood, Un\'Goro Crater, Azshara, Eastern Plaguelands, Silithus and Winterspring; Demonsage grows in Mount Hyjal. Goldthorn Tea (+15 for 15 min) lets you pick these earlier.', [I(13464, 'Golden Sansam', 'inv_misc_herb_sansamroot'), I(13463, 'Dreamfoil', 'inv_misc_herb_dreamfoil'), I(13465, 'Mountain Silversage', 'inv_misc_herb_mountainsilversage'), I(13467, 'Icecap', 'inv_misc_herb_icecap')]),
  ];
}

function insertCamp(slug, steps, list) {
  // list: [{at, name}] inserted before the first gather-step whose range starts after `at`
  // idempotent: drop camp steps a previous build already inserted
  const out = steps.filter(s => !(s.type === 'gather-step' && String(s.title || '').startsWith('Craft your camp object')));
  for (const { at, name } of list) {
    let idx = out.findIndex(s => (s.type === 'gather-step' || s.type === 'step') && s.from > at);
    while (idx > 0 && out[idx - 1].type === 'rank') idx--;
    out.splice(idx < 0 ? out.length : idx, 0, campStep(slug, at, name));
  }
  return out;
}

// --------------------------------------------------------- camping guide
function buildCamping() {
  const objs = tier => CAMP.filter(c => c.tier === tier && c.profession !== 'Cooking').map(c => `${c.profession}: ${c.name}`).join(' · ');
  const kit = n => CAMP.find(c => c.name === n);
  return [
    { type: 'rank', rank: 'Camping has no skill bar', details: 'Camping is a Forever world system, not a profession: there is no Camping trainer and nothing to level. A cook places a campfire, players who know other professions add their camp objects, and anyone sitting by the fire for a minute gets every object\'s buff for an hour. Use this checklist to track what you have unlocked.' },
    G(1, 1, 'Learn the Basic Campfire Kit (Cooking 1)', `Around level 5 the quest "The Great Outdoors" sends you to a cooking trainer. Basic Campfire Kit: ${kit('Basic Campfire Kit') ? '1 Simple Wood' : ''} with Flint and Tinder in your bags (both sold by the trainer). Holds 3 camp objects and burns for 15 minutes.`, [I(279981, 'Basic Campfire Kit', 'inv_camelot_camping_welcomingcampfire')]),
    G(20, 20, 'First camp object for each profession you know (skill 20)', `${objs(1)}. Each profession hands you a quest that teaches it.`, []),
    G(90, 90, 'Journeyman Campfire (Cooking, blueprint at 90)', 'Uses 1 Star Wood and holds 5 camp objects.', [I(279961, 'Journeyman Campfire Kit', 'inv_camelot_camping_welcomingcampfire')]),
    G(140, 140, 'Second camp objects (skill 140, Leatherworking 125)', `${objs(2)}. Each replaces the first object and keeps its buff.`, []),
    G(220, 220, 'Expert Campfire (Cooking 220)', 'Uses 1 Thick Logs and holds 10 camp objects.', [I(279974, 'Expert Campfire Kit', 'inv_camelot_camping_welcomingcampfire')]),
    G(300, 300, 'Master stations (skill 300)', `${objs(3)} · ${objs(4)}. Several late recipes need these stations (Iron Oven, Loom, Master Forge), so leveling players must use a 300 player's camp.`, []),
  ];
}

function campingShopping() {
  const items = [
    { itemId: 4470, name: 'Simple Wood', icon: 'inv_tradeskillitem_01', quality: 1, count: 10 },
    { itemId: 4471, name: 'Flint and Tinder', icon: 'inv_tradeskillitem_01', quality: 1, count: 1 },
  ];
  return {
    title: 'Campfire Supplies',
    subtitle: 'Camping has no skill to level — these are the campfire fuels a cook needs. Each profession\'s camp object reagents are listed on that profession\'s page.',
    groups: [
      { title: 'From a cooking or trade supplies vendor', note: 'Basic Campfire Kit fuel and the tool to light it.', items },
      { title: 'Higher-tier campfire fuel', note: 'Journeyman and Expert campfires.', items: [
        { itemId: 11291, name: 'Star Wood', icon: 'inv_tradeskillitem_03', quality: 1, count: 5 },
        { itemId: 272941, name: 'Thick Logs', icon: 'inv_tradeskillitem_01', quality: 1, count: 5 },
      ] },
    ],
  };
}

// --------------------------------------------------------------- assemble
const DESC = 'Fastest practical route, built from Wowhead\'s WoW Forever skill-up data (updated Nov 4, 2026). Each step shows the recipe\'s skill colors (orange → yellow → green → grey), the average number of crafts, and a "to be safe" count that covers 9 in 10 players. Recipes locked behind reputation, a skill-300 station or ultra-rare materials are swapped for practical ones; the 💡 note says when a faster alternative exists.';
const CAP = 'Verified for WoW Forever · Nov 2026';
const result = {};

for (const slug of Object.keys(SPEC)) {
  const steps = buildCrafting(slug);
  result[slug] = {
    leveling: { title: 'Leveling from 1 to 300', capNote: CAP, desc: DESC, steps, guideCallouts: CALLOUTS[slug] },
    shopping: buildShopping(slug, steps),
  };
}

const GATHER_DESC = 'Gathering professions level by harvesting nodes: a node gives a point every time while it is orange or yellow for you, and less often as it turns green. Skill requirements below are from Wowhead\'s WoW Forever node data, including the new Forever nodes.';
result.mining = { leveling: { title: 'Leveling from 1 to 300 (Veins + Smelting)', capNote: CAP, desc: GATHER_DESC + ' Smelting is a bonus: each smelt is listed only for the range where it is orange or yellow.', steps: buildMining(), guideCallouts: [
  { icon: '🔥', title: 'Smelting Facts for Forever', text: 'Smelt Copper is orange to 25 and yellow to 47; Bronze is good 65–90; Silver is orange 75–100; Iron 125–135; Gold 155–177. Steel, Mithril, Truesilver, Dark Iron, Thorium and Azerothium give exactly one point when learned and none after. Nothing smelts for points between 140 and 155. Smelting Pants (Gilnid, Deadmines) speed up Copper, Tin, Bronze and Silver smelting by 25%.' },
  { icon: '🪨', title: 'Forever Ores & Camp Objects', text: 'New Forever nodes: Cold Iron Deposits (125, Duskwood), Fool\'s Gold Veins (175, Ashenvale), Starsilver Veins (245, Hinterlands) and Heavy Thorium Veins (300, Mount Hyjal). Pitchblende smelts into Azerothium Bars at 275; Heavy Thorium Bars at 300. Camp objects: Lodestone (20), Rock Garden (140, spawns a mining node over time) and Molten Foundry (300). Miner\'s Cape (Miner Johnson, Deadmines) gives +2 Mining.' },
  PERKS,
] } };

result.herbalism = { leveling: { title: 'Leveling from 1 to 300 (Herb Brackets)', capNote: CAP, desc: GATHER_DESC, steps: buildHerbalism(), guideCallouts: [
  { icon: '🍵', title: 'Pick Herbs Early: Goldthorn Tea & Gloves', text: 'Goldthorn Tea (item 10841, level 25) gives +15 Herbalism for 15 minutes once you have sat drinking for 10 seconds, plus 5% kill experience. Combine it with Herbalist\'s Gloves (+5) and Enchant Gloves - Advanced Herbalism (+5) to pick nodes 25 points early. Tauren Cultivation now duplicates a nearby herb node instead of giving +15 skill.' },
  { icon: '🌱', title: 'Forever Herbs, Seeds & Camp Objects', text: 'New Forever herb nodes: Nightmare Moss (125, Duskwood), Dreamroot (205, Ashenvale), Moonroot (250, Feralas), Star Lotus (250, Hinterlands) and Demonsage (300, Mount Hyjal). Marefoil and Death Lotus are new endgame herbs whose node locations are still unconfirmed; Enchant Gloves - Lotus Claw gives a small chance of Death Lotus from any herb in Hyjal. Herbs also drop seeds and Scarce materials (Frilled Lichen, Rosecap, Stranglevine). Camp objects: Incense Candle (20), Greenhouse (140, blueprint from Shadetooth in the Wetlands) and Seed Hybridizer (300). The Bountiful Harvest perk adds 20% Scarce materials per rank.' },
  PERKS,
] } };

// Keep a profession's (override-corrected) rank dividers, replace its brackets.
// Each rank goes before the first bracket starting at/after its threshold.
function rebuildBrackets(slug, steps, brackets) {
  const ranks = withRankOverrides(slug, steps).filter(s => s.type === 'rank');
  const at = [0, 75, 125, 225];
  const out = [];
  ranks.forEach((r, i) => {
    out.push(r);
    for (const b of brackets) if (b.from >= at[i] && (i === ranks.length - 1 || b.from < at[i + 1])) out.push(b);
  });
  return out;
}
// Brackets 1-225 follow Wowhead's "Skinning Profession Overview in Forever"
// (it stops at 225); 225-300 uses the standard beast level x 5 rule.
const SKIN_BRACKETS = [
  G(1, 75, 'Any starter zone (Forever: starter-area beasts are now skinnable)', 'Skin everything you kill while questing; move on when beasts stop giving points. Learn Apprentice Skinning from the "Pelt Collecting for Beginners" quest reward or a starter trainer, and train Journeyman before you hit 75.', [I(2934, 'Ruined Leather Scraps', 'inv_misc_pelt_bear_ruin_05'), I(2318, 'Light Leather', 'inv_misc_leatherscrap_03'), I(783, 'Light Hide', 'inv_misc_pelt_wolf_ruin_02')]),
  G(75, 125, 'The Barrens, Loch Modan or Darkshore', 'Barrens beasts get higher-level from north (Crossroads) to south — skin southward as points slow down. In Loch Modan start west near Thelsamar and move east.', [I(2318, 'Light Leather', 'inv_misc_leatherscrap_03'), I(2319, 'Medium Leather', 'inv_misc_leatherscrap_05'), I(4232, 'Medium Hide', 'inv_misc_pelt_boar_ruin_02')]),
  G(125, 175, 'Ashenvale, Duskwood, Hillsbrad Foothills or Wetlands', 'Bears and lions are dense in central Hillsbrad; in the Wetlands start near Dun Algaz and head toward Menethil Harbor. Leave a little before 175 when points slow.', [I(2319, 'Medium Leather', 'inv_misc_leatherscrap_05'), I(4234, 'Heavy Leather', 'inv_misc_leatherscrap_07'), I(4235, 'Heavy Hide', 'inv_misc_pelt_wolf_ruin_03')]),
  G(175, 225, 'Arathi Highlands, Stranglethorn Vale or Thousand Needles', 'Arathi raptors west of Refuge Pointe (30–34) and southeast of it (36–37); Stranglethorn beasts run 30–40 from north to south; Shimmering Flats has 30–32 to the north and 33–35 to the south. Train Artisan at 200.', [I(4234, 'Heavy Leather', 'inv_misc_leatherscrap_07'), I(4304, 'Thick Leather', 'inv_misc_leatherscrap_08'), I(8169, 'Thick Hide', 'inv_misc_pelt_bear_ruin_01')]),
  G(225, 300, 'Beasts level 45–60 (required skill = beast level × 5)', '225–250: Tanaris, Feralas, the Hinterlands and Searing Gorge · 250–300: Un\'Goro Crater, Winterspring, Felwood, Blasted Lands, Silithus and Mount Hyjal.', [I(4304, 'Thick Leather', 'inv_misc_leatherscrap_08'), I(8170, 'Rugged Leather', 'inv_misc_leatherscrap_02'), I(8171, 'Rugged Hide', 'inv_misc_pelt_bear_ruin_02')]),
];
// Brackets follow Wowhead's "Fishing Profession Overview in Forever".
const FISH_BRACKETS = [
  G(1, 75, 'Any starter zone', 'Use a Shiny Bauble until 25; after that you catch everything in starter zones. Skill depends only on the number of fish you land, not the zone.', [I(6291, 'Raw Brilliant Smallfish', 'inv_misc_fish_01'), I(6289, 'Raw Longjaw Mud Snapper', 'inv_misc_fish_02')]),
  G(75, 150, 'Any capital city (Stormwind, Ironforge, Darnassus, Orgrimmar, Undercity, Thunder Bluff)', '100% catch rate without lures. Read Expert Fishing - The Bass and You (Old Man Heming, Booty Bay) at 125.', [I(6289, 'Raw Longjaw Mud Snapper', 'inv_misc_fish_02'), I(6308, 'Raw Bristle Whisker Catfish', 'inv_misc_fish_03')]),
  G(150, 225, 'Dustwallow Marsh (easier for Alliance) or Stranglethorn Vale (easier for Horde)', 'You need 225 for a 100% catch rate here, so use lures or a better pole until then — or keep fishing a capital if you only want the points.', [I(6308, 'Raw Bristle Whisker Catfish', 'inv_misc_fish_03'), I(8365, 'Raw Mithril Head Trout', 'inv_misc_fish_03'), I(6359, 'Firefin Snapper', 'inv_misc_fish_04')]),
  G(225, 300, 'Artisan quest in Dustwallow Marsh, then Tanaris', 'Finish Nat Pagle\'s Artisan quest (Feralas Ahi, Misty Reed Mahi Mahi, Sar\'theris Striker and Savage Coast Blue Sailfin), then fish Tanaris for Raw Summer Bass or Raw Winter Squid depending on the season. A guaranteed catch in Tanaris needs 300, so use lures until then.', [I(12726, 'Feralas Ahi', 'inv_misc_fish_06'), I(13756, 'Raw Summer Bass', 'inv_misc_fish_08'), I(13755, 'Raw Winter Squid', 'inv_misc_fish_13')]),
];

const skin = DATA.skinning.leveling;
result.skinning = { leveling: { ...skin, capNote: CAP, steps: insertCamp('skinning', rebuildBrackets('skinning', skin.steps, SKIN_BRACKETS), [{ at: 20, name: 'Camp Chair' }, { at: 140, name: 'Field Guide' }]), guideCallouts: [
  skin.guideCallouts[0],
  { icon: '🔪', title: 'Forever Skinning Gear & Camp Objects', text: 'Learn Apprentice Skinning from the starter book "Pelt Collecting for Beginners" (item 247846, +2 skill). Cartilage Shapers (item 273054, +4 Skinning, level 28 gloves from Lyn the Ignored) let you skin beasts early; Finkle\'s Skinner and Zulian Slicer add +10 at endgame. Camp objects: Camp Chair (20), Field Guide (140, grants Track Beasts) and Trapper\'s Workbench (300).' },
  PERKS,
] } };

const fish = DATA.fishing.leveling;
const fishSteps = insertCamp('fishing', rebuildBrackets('fishing', fish.steps, FISH_BRACKETS), [{ at: 20, name: 'Fish Bowl' }, { at: 140, name: 'Fishing Rack' }]);
result.fishing = { leveling: { ...fish, capNote: CAP, steps: fishSteps, guideCallouts: [
  { icon: '🎣', title: 'Skill Comes From Catches, Not Zones', text: 'Fishing skill depends only on how many fish you land — the zone does not change catches per point. Below 25 use a Shiny Bauble; from 25 you catch everything in starter zones. Fish where your catch rate is 100% (capitals to 150, Dustwallow Marsh or Stranglethorn to 225, then Tanaris) and use lures or a better pole when it drops. The Luremaster legacy perk gives a 25% chance of an extra fish while a lure is active. Camp objects: Fish Bowl (20), Fishing Rack (140) and Fishing Hut (300).' },
  PERKS,
] } };

result.camping = { leveling: { title: 'Camping Unlock Roadmap (No Skill to Level)', capNote: 'Camping is a system, not a profession', desc: 'Camping has no skill bar or trainer. Track the campfires and camp objects your professions unlock instead.', steps: buildCamping(), guideCallouts: [
  { icon: '🏕️', title: 'How a Camp Works', text: 'A cook places a campfire; every other player can add one camp object from a profession they know. Sit or craft by the fire for a minute to receive every object\'s buff for an hour. Your camp objects share a one-hour cooldown (the Field Guide legacy perk shortens it), and no other campfire can stand within 100 yards.' },
] }, shopping: campingShopping() };

// ------------------------------------------- gathering shopping lists
// A gatherer's "shopping list" is what its partner craft's 1-300 route needs
// (derived from the routes above), plus the reagents for its own camp objects.
function gatheredItems(slug, keep) {
  const out = [];
  for (const g of (result[slug].shopping.groups || [])) {
    for (const it of g.items) if (keep(it)) out.push({ ...it });
  }
  return out.sort((a, b) => b.count - a.count);
}
function campReagentGroup(profession) {
  const items = new Map();
  for (const m of CAMP.filter(c => c.profession === profession && c.tier <= 2)) {
    for (const r of m.reagents || []) {
      const src = SOURCES[r.id];
      const cur = items.get(r.id) || { itemId: r.id, name: r.name, icon: (src && src.icon) || 'inv_misc_questionmark', quality: 1, count: 0 };
      cur.count += r.count; items.set(r.id, cur);
    }
  }
  const objs = CAMP.filter(c => c.profession === profession && c.tier <= 2).map(c => c.name).join(' and ');
  return { title: `Your camp objects (${objs})`, note: 'One craft of each — also worth a skill point apiece.', items: [...items.values()] };
}
const typeOf = it => (SOURCES[it.itemId] && SOURCES[it.itemId].primaryType) || '';
const MINING_ORE = buildMining().filter(s => s.type === 'step')
  .flatMap(s => s.reagents.filter(r => / Ore$/.test(r.name)).map(r => ({ ...r, count: r.count * s.crafts })));
const GATHER_SHOPPING = {
  herbalism: {
    title: 'Herbs to Gather (for the Alchemy 1–300 route)',
    groups: [
      { title: 'Herbs the Alchemy route uses', note: 'Exact totals from the Alchemy leveling route — sell them or supply your own Alchemy.', items: gatheredItems('alchemy', it => typeOf(it) === 'herb') },
      campReagentGroup('Herbalism'),
    ],
  },
  skinning: {
    title: 'Leather to Collect (for the Leatherworking 1–300 route)',
    groups: [
      { title: 'Leather, hides and scales the Leatherworking route uses', note: 'Exact totals from the Leatherworking leveling route.', items: gatheredItems('leatherworking', it => typeOf(it) === 'skinned' || (/(Leather|Hide|Scale)$/.test(it.name) && !/^Cured/.test(it.name))) },
      campReagentGroup('Skinning'),
    ],
  },
  mining: {
    title: 'Ore & Bars (Mining smelting route + Blacksmithing partner)',
    groups: [
      { title: 'Ore for the 1–185 smelting route', note: 'Only if you level by smelting; Bronze reuses your Copper and Tin bars.', items: MINING_ORE.map(r => ({ itemId: r.itemId, name: r.name, icon: r.icon, quality: 1, count: r.count })) },
      { title: 'Bars and stone the Blacksmithing route uses', note: 'Exact totals from the Blacksmithing leveling route — one ore per bar except alloys.', items: gatheredItems('blacksmithing', it => / (Bar|Stone)$/.test(it.name) && !/Grinding Stone|Arcanite Bar/.test(it.name)) },
      campReagentGroup('Mining'),
    ],
  },
  fishing: {
    title: 'Fish to Catch (for the Cooking 1–300 route)',
    groups: [
      { title: 'Fish the Cooking route uses', note: 'Exact totals from the Cooking leveling route.', items: gatheredItems('cooking', it => typeOf(it) === 'fished' || /^Raw /.test(it.name)) },
      campReagentGroup('Fishing'),
    ],
  },
};
for (const [slug, s] of Object.entries(GATHER_SHOPPING)) {
  result[slug].shopping = {
    title: s.title,
    subtitle: 'Gathering has no reagent cost — this is what your gathering feeds. Totals come from the matching crafting route on this site.',
    groups: s.groups.filter(g => g.items.length),
  };
}

// ----------------------------------------------------------------- report
for (const [slug, v] of Object.entries(result)) {
  const steps = v.leveling.steps;
  const crafts = steps.filter(s => s.type === 'step').reduce((a, s) => a + (s.crafts || 0), 0);
  console.log(`${slug.padEnd(15)} ${String(steps.length).padStart(3)} entries  ${String(crafts).padStart(4)} crafts` +
    (v.shopping ? `  shopping: ${v.shopping.groups.map(g => g.items.length + ' ' + g.title.split(' ')[0]).join(', ')}` : ''));
}
if (warns.length) console.log('\nWARN\n' + warns.join('\n'));
if (errors.length) { console.log('\nERRORS\n' + errors.join('\n')); process.exit(1); }

if (WRITE) {
  let colorFixes = 0;
  let phantomRemoved = 0;
  const apply = obj => {
    colorFixes = 0;
    phantomRemoved = 0;
    for (const [slug, v] of Object.entries(result)) {
      obj[slug].leveling = v.leveling;
      if (v.shopping) obj[slug].shopping = v.shopping;
    }
    // Sync the recipe catalog's skill colors to Wowhead's Forever values for
    // every recipe the routes use (fixes stale learn/grey values in the DB).
    for (const [slug, map] of Object.entries(COLORS)) {
      for (const [name, c] of Object.entries(map)) {
        const want = norm(ALIASES[norm(name)] || name);
        for (const r of obj[slug].recipes || []) {
          if (norm(r.name) !== want) continue;
          if (r.learn !== c[0] || r.yellow !== c[1] || r.green !== c[2] || r.grey !== c[3]) {
            [r.learn, r.yellow, r.green, r.grey] = c;
            colorFixes++;
          }
        }
      }
    }
    // Whole-catalog color sync from Wowhead's Forever spell listings
    // (catalog-colors.json: { slug: { bySpell, byItem, byName } } -> [orange, yellow, green, grey]).
    // Wowhead writes 0 for a stage that doesn't exist; fill it from the recorded
    // learn level (if still valid) or the next stage so we never store a 0.
    for (const [slug, idx] of Object.entries(CATALOG)) {
      for (const r of (obj[slug] && obj[slug].recipes) || []) {
        const raw = (r.spellId != null && idx.bySpell[r.spellId]) || (r.id != null && idx.byItem[r.id]) || idx.byName[String(r.name).toLowerCase()];
        if (!raw) continue;
        const firstSet = raw.find(v => v > 0) || raw[3];
        const o = raw[0] || (r.learn > 0 && r.learn <= firstSet ? r.learn : firstSet);
        const y = raw[1] || o;
        const g = raw[2] || y;
        const c = [o, y, g, raw[3]];
        if (r.learn !== c[0] || r.yellow !== c[1] || r.green !== c[2] || r.grey !== c[3]) {
          [r.learn, r.yellow, r.green, r.grey] = c;
          colorFixes++;
        }
      }
    }
    // Remove recipes that don't exist in WoW Forever (phantom-recipes.json:
    // crafted item missing from Forever's item DB and absent from Wowhead's
    // Forever profession spell lists — mostly Season of Discovery imports).
    for (const ph of PHANTOMS) {
      const p = obj[ph.slug];
      if (!p || !p.recipes) continue;
      const before = p.recipes.length;
      p.recipes = p.recipes.filter(r => !(ph.id != null ? r.id === ph.id : (r.id == null && r.name === ph.name)));
      if (p.recipes.length !== before) phantomRemoved++;
    }
    for (const p of Object.values(obj)) {
      if (p.stats && Array.isArray(p.recipes)) {
        p.stats.recipeCount = p.recipes.length;
        p.stats.newInForever = p.recipes.filter(r => r.isNew).length;
      }
      for (const g of (Array.isArray(p.groups) && Array.isArray(p.recipes) ? p.groups : [])) {
        g.count = p.recipes.filter(r => r.cat === g.key).length;
      }
    }
    // Nov 10 hotfix (see core-data.js patch notes): Journeyman Campfire needs
    // Cooking 90 (was 140); the Tanning Rack is Leatherworking 125 (was 140).
    for (const f of (obj.camping && obj.camping.campfires) || []) {
      if (f.name === 'Journeyman Campfire Kit') f.skillReq = 'Cooking 90';
    }
    for (const p of Object.values(obj)) {
      for (const r of p.recipes || []) {
        if (typeof r.effect === 'string') r.effect = r.effect.replace('Crafted at the Tanning Rack (Leatherworking 140+)', 'Crafted at the Tanning Rack (Leatherworking 125+)');
      }
    }
  };
  const json = JSON.parse(fs.readFileSync(JSON_PATH, 'utf8'));
  apply(json);
  fs.writeFileSync(JSON_PATH, JSON.stringify(json, null, 2), 'utf8');

  const raw = fs.readFileSync(JS_PATH, 'utf8');
  const marker = 'window.WOW_PROFESSIONS_DATA = ';
  const at = raw.indexOf(marker);
  const js = JSON.parse(raw.slice(at + marker.length).replace(/;\s*$/, ''));
  apply(js);
  fs.writeFileSync(JS_PATH, raw.slice(0, at) + marker + JSON.stringify(js, null, 2) + ';\n', 'utf8');
  console.log('\nWrote', path.relative(ROOT, JSON_PATH), 'and', path.relative(ROOT, JS_PATH), `(${colorFixes} recipe color corrections, ${phantomRemoved} phantom recipes removed)`);
}
module.exports = { result };
