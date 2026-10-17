/**
 * World of Warcraft: Forever - Professions & Trade Economy Hub Module
 * Comprehensive 1-300 Leveling Roadmaps, Reagent Requirements, Reagent Shopping Lists,
 * Recipe Catalogs, Merchant's Favor Turn-Ins, and Camp & Perks Integration.
 */

(function () {
  'use strict';

  let currentProfession = 'overview';
  let currentSubTab = 'recipes';
  let currentCategory = 'all';
  let searchQuery = '';
  let filterNewOnly = false;
  let filterBetaCap = false;
  let filterDungeonOnly = false;
  let filterBlueprintOnly = false;
  let playerSkill = null;
  let gatheringViewMode = 'routes';
  let activeMiningTier = 'copper';
  let activeHerbTier = 'herb_tier1';
  let activeContainerType = 'all';
  let activeRolePairing = 'tank';
  let trainerFactionFilter = 'all';
  let trainerRankFilter = 'all';
  let trainerProfFilter = 'all';
  let trainerZoneFilter = 'all';
  let trainerSearchQuery = '';

  const CDN_BASE = 'https://wow.zamimg.com/images/wow/icons/medium/';

  function getIconUrl(icon, name = '', source = '') {
    if (!icon || icon === 'inv_misc_questionmark' || icon.includes('inv_misc_questionmark')) {
      const n = (name || '').toLowerCase();
      const s = (source || '').toLowerCase();
      if (n.includes('enchant') || n.includes('formula') || currentProfession === 'enchanting') {
        if (s.includes('drop') || s.includes('formula') || s.includes('vendor') || s.includes('merchant') || s.includes('favor') || n.includes('formula')) {
          return `${CDN_BASE}inv_scroll_03.jpg`;
        }
        return `${CDN_BASE}inv_scroll_04.jpg`;
      }
      return `${CDN_BASE}inv_misc_questionmark.jpg`;
    }
    if (icon.startsWith('http://') || icon.startsWith('https://')) return icon;
    const clean = icon.replace(/\.(jpg|png|webp)$/i, '');
    return `${CDN_BASE}${clean}.jpg`;
  }

  const escapeHtml = window.escapeHtml;

  function getProfessionPassive(nameOrSlug) {
    if (!nameOrSlug) return null;
    const clean = String(nameOrSlug).toLowerCase().replace(/[^a-z0-9]/g, '');
    const list = (window.WOW_FOREVER_DATA && window.WOW_FOREVER_DATA.professionPassives) || [];
    return list.find(p => {
      const pClean = p.name.toLowerCase().replace(/[^a-z0-9]/g, '');
      return pClean === clean;
    }) || null;
  }

  function getSkillClass(recipe, skill) {
    if (skill === null || skill === undefined || isNaN(skill)) {
      return 'skill-orange';
    }
    const s = Number(skill);
    if (s < recipe.learn) return 'skill-grey';
    if (s < recipe.yellow) return 'skill-orange';
    if (s < recipe.green) return 'skill-yellow';
    if (s < recipe.grey) return 'skill-green';
    return 'skill-grey';
  }

  /* ==========================================================================
     EXTENDED SUITE: DATASETS & UTILITIES (BIS, TOMTOM, SPECS, CONTAINERS, CIRCUITS)
     ========================================================================== */
  const WOW_TRAINERS_DATA = [
  {
    "name": "Lilyssia Nightbreeze",
    "profession": "alchemy",
    "profName": "Alchemy",
    "faction": "Alliance",
    "rank": "Apprentice",
    "zone": "Stormwind City",
    "coords": "55.6, 85.8",
    "macro": "/way Stormwind City 55.6 85.8",
    "notes": "Mage Quarter, Alchemy shop"
  },
  {
    "name": "Tally Berryfizz",
    "profession": "alchemy",
    "profName": "Alchemy",
    "faction": "Alliance",
    "rank": "Journeyman",
    "zone": "Ironforge",
    "coords": "66.6, 55.2",
    "macro": "/way Ironforge 66.6 55.2",
    "notes": "Tinker Town"
  },
  {
    "name": "Ainethil",
    "profession": "alchemy",
    "profName": "Alchemy",
    "faction": "Alliance",
    "rank": "Expert",
    "zone": "Darnassus",
    "coords": "55.0, 24.0",
    "macro": "/way Darnassus 55.0 24.0",
    "notes": "Temple Gardens"
  },
  {
    "name": "Yelmak",
    "profession": "alchemy",
    "profName": "Alchemy",
    "faction": "Horde",
    "rank": "Apprentice",
    "zone": "Orgrimmar",
    "coords": "56.6, 33.2",
    "macro": "/way Orgrimmar 56.6 33.2",
    "notes": "The Drag"
  },
  {
    "name": "Bena Winterhoof",
    "profession": "alchemy",
    "profName": "Alchemy",
    "faction": "Horde",
    "rank": "Journeyman",
    "zone": "Thunder Bluff",
    "coords": "46.8, 33.4",
    "macro": "/way Thunder Bluff 46.8 33.4",
    "notes": "Lower Rise"
  },
  {
    "name": "Doctor Herbert Halsey",
    "profession": "alchemy",
    "profName": "Alchemy",
    "faction": "Horde",
    "rank": "Expert",
    "zone": "Undercity",
    "coords": "48.2, 72.2",
    "macro": "/way Undercity 48.2 72.2",
    "notes": "The Apothecarium"
  },
  {
    "name": "Linzy Blackbolt",
    "profession": "alchemy",
    "profName": "Alchemy",
    "faction": "Neutral",
    "rank": "Expert",
    "zone": "Dalaran, Alterac Mountains",
    "coords": "18.6, 62.4",
    "macro": "/way Alterac Mountains 18.6 62.4",
    "notes": "WoW Forever Custom Dalaran Trainer"
  },
  {
    "name": "Kylanna Windwhisper",
    "profession": "alchemy",
    "profName": "Alchemy",
    "faction": "Alliance",
    "rank": "Artisan",
    "zone": "Feathermoon Stronghold, Feralas",
    "coords": "32.6, 43.8",
    "macro": "/way Feralas 32.6 43.8",
    "notes": "Artisan Master"
  },
  {
    "name": "Rogvar",
    "profession": "alchemy",
    "profName": "Alchemy",
    "faction": "Horde",
    "rank": "Artisan",
    "zone": "Stonard, Swamp of Sorrows",
    "coords": "48.4, 55.6",
    "macro": "/way Swamp of Sorrows 48.4 55.6",
    "notes": "Artisan Master"
  },
  {
    "name": "Master Mycologist Shurome",
    "profession": "alchemy",
    "profName": "Alchemy",
    "faction": "Neutral",
    "rank": "Artisan",
    "zone": "Emerald Sanctuary, Felwood",
    "coords": "51.4, 82.0",
    "macro": "/way Felwood 51.4 82.0",
    "notes": "Neutral Master"
  },
  {
    "name": "Therum Deepforge",
    "profession": "blacksmithing",
    "profName": "Blacksmithing",
    "faction": "Alliance",
    "rank": "Apprentice",
    "zone": "Stormwind City",
    "coords": "63.8, 37.8",
    "macro": "/way Stormwind City 63.8 37.8",
    "notes": "Dwarven District Forge"
  },
  {
    "name": "Bengus Deepforge",
    "profession": "blacksmithing",
    "profName": "Blacksmithing",
    "faction": "Alliance",
    "rank": "Expert",
    "zone": "Ironforge",
    "coords": "51.0, 43.0",
    "macro": "/way Ironforge 51.0 43.0",
    "notes": "The Great Forge"
  },
  {
    "name": "Saru Steelfury",
    "profession": "blacksmithing",
    "profName": "Blacksmithing",
    "faction": "Horde",
    "rank": "Expert",
    "zone": "Orgrimmar",
    "coords": "82.2, 23.0",
    "macro": "/way Orgrimmar 82.2 23.0",
    "notes": "Valley of Honor Forge"
  },
  {
    "name": "James Van Brunt",
    "profession": "blacksmithing",
    "profName": "Blacksmithing",
    "faction": "Horde",
    "rank": "Journeyman",
    "zone": "Undercity",
    "coords": "61.2, 30.4",
    "macro": "/way Undercity 61.2 30.4",
    "notes": "War Quarter"
  },
  {
    "name": "Basil Frye",
    "profession": "blacksmithing",
    "profName": "Blacksmithing",
    "faction": "Horde",
    "rank": "Expert",
    "zone": "Undercity",
    "coords": "59.6, 29.0",
    "macro": "/way Undercity 59.6 29.0",
    "notes": "War Quarter"
  },
  {
    "name": "Brikk Keencraft",
    "profession": "blacksmithing",
    "profName": "Blacksmithing",
    "faction": "Neutral",
    "rank": "Artisan",
    "zone": "Booty Bay, Stranglethorn",
    "coords": "29.0, 75.4",
    "macro": "/way Stranglethorn Vale 29.0 75.4",
    "notes": "Artisan Master"
  },
  {
    "name": "Grumnus Steelshaper",
    "profession": "blacksmithing",
    "profName": "Blacksmithing",
    "faction": "Alliance",
    "rank": "Artisan",
    "zone": "Ironforge",
    "coords": "50.2, 42.8",
    "macro": "/way Ironforge 50.2 42.8",
    "notes": "Armorsmith Specialization"
  },
  {
    "name": "Okothos Ironrager",
    "profession": "blacksmithing",
    "profName": "Blacksmithing",
    "faction": "Horde",
    "rank": "Artisan",
    "zone": "Orgrimmar",
    "coords": "79.8, 23.8",
    "macro": "/way Orgrimmar 79.8 23.8",
    "notes": "Armorsmith Specialization"
  },
  {
    "name": "Ironus Coldsteel",
    "profession": "blacksmithing",
    "profName": "Blacksmithing",
    "faction": "Alliance",
    "rank": "Artisan",
    "zone": "Ironforge",
    "coords": "50.8, 45.2",
    "macro": "/way Ironforge 50.8 45.2",
    "notes": "Weaponsmith Specialization"
  },
  {
    "name": "Borgosh Corebender",
    "profession": "blacksmithing",
    "profName": "Blacksmithing",
    "faction": "Horde",
    "rank": "Artisan",
    "zone": "Orgrimmar",
    "coords": "79.6, 23.6",
    "macro": "/way Orgrimmar 79.6 23.6",
    "notes": "Weaponsmith Specialization"
  },
  {
    "name": "Lucan Cordell",
    "profession": "enchanting",
    "profName": "Enchanting",
    "faction": "Alliance",
    "rank": "Apprentice",
    "zone": "Stormwind City",
    "coords": "53.0, 74.2",
    "macro": "/way Stormwind City 53.0 74.2",
    "notes": "Mage Quarter"
  },
  {
    "name": "Gimrizz Shadowcog",
    "profession": "enchanting",
    "profName": "Enchanting",
    "faction": "Alliance",
    "rank": "Journeyman",
    "zone": "Ironforge",
    "coords": "59.8, 36.4",
    "macro": "/way Ironforge 59.8 36.4",
    "notes": "The Great Forge"
  },
  {
    "name": "Kitta Firewind",
    "profession": "enchanting",
    "profName": "Enchanting",
    "faction": "Alliance",
    "rank": "Expert",
    "zone": "Tower of Azora, Elwynn Forest",
    "coords": "64.8, 70.4",
    "macro": "/way Elwynn Forest 64.8 70.4",
    "notes": "Top of the Tower"
  },
  {
    "name": "Godan",
    "profession": "enchanting",
    "profName": "Enchanting",
    "faction": "Horde",
    "rank": "Apprentice",
    "zone": "Orgrimmar",
    "coords": "54.0, 56.4",
    "macro": "/way Orgrimmar 54.0 56.4",
    "notes": "The Drag"
  },
  {
    "name": "Hgarth",
    "profession": "enchanting",
    "profName": "Enchanting",
    "faction": "Horde",
    "rank": "Expert",
    "zone": "Sun Rock Retreat, Stonetalon",
    "coords": "49.2, 57.2",
    "macro": "/way Stonetalon Mountains 49.2 57.2",
    "notes": "High Ridge"
  },
  {
    "name": "Annora",
    "profession": "enchanting",
    "profName": "Enchanting",
    "faction": "Neutral",
    "rank": "Artisan",
    "zone": "Uldaman Instance",
    "coords": "Temple Hallways",
    "macro": "/way Badlands 42.0 12.0",
    "notes": "Located inside Uldaman dungeon past Map Chamber"
  },
  {
    "name": "Lilliam Sparkspindle",
    "profession": "engineering",
    "profName": "Engineering",
    "faction": "Alliance",
    "rank": "Apprentice",
    "zone": "Stormwind City",
    "coords": "62.8, 32.0",
    "macro": "/way Stormwind City 62.8 32.0",
    "notes": "Dwarven District"
  },
  {
    "name": "Springspindle Fizzlegear",
    "profession": "engineering",
    "profName": "Engineering",
    "faction": "Alliance",
    "rank": "Expert",
    "zone": "Ironforge",
    "coords": "68.4, 44.0",
    "macro": "/way Ironforge 68.4 44.0",
    "notes": "Tinker Town"
  },
  {
    "name": "Roxxik",
    "profession": "engineering",
    "profName": "Engineering",
    "faction": "Horde",
    "rank": "Expert",
    "zone": "Orgrimmar",
    "coords": "75.8, 25.2",
    "macro": "/way Orgrimmar 75.8 25.2",
    "notes": "Valley of Honor"
  },
  {
    "name": "Buzzek Bracketswing",
    "profession": "engineering",
    "profName": "Engineering",
    "faction": "Neutral",
    "rank": "Artisan",
    "zone": "Gadgetzan, Tanaris",
    "coords": "52.2, 27.8",
    "macro": "/way Tanaris 52.2 27.8",
    "notes": "Artisan Master"
  },
  {
    "name": "Tinkmaster Overspark",
    "profession": "engineering",
    "profName": "Engineering",
    "faction": "Alliance",
    "rank": "Artisan",
    "zone": "Ironforge",
    "coords": "69.8, 50.0",
    "macro": "/way Ironforge 69.8 50.0",
    "notes": "Gnomish Engineering Specialization"
  },
  {
    "name": "Oglethorpe Obnoticus",
    "profession": "engineering",
    "profName": "Engineering",
    "faction": "Neutral",
    "rank": "Artisan",
    "zone": "Booty Bay, Stranglethorn",
    "coords": "28.2, 76.2",
    "macro": "/way Stranglethorn Vale 28.2 76.2",
    "notes": "Gnomish Engineering Specialization"
  },
  {
    "name": "Nixx Sprocketspring",
    "profession": "engineering",
    "profName": "Engineering",
    "faction": "Neutral",
    "rank": "Artisan",
    "zone": "Gadgetzan, Tanaris",
    "coords": "52.4, 27.2",
    "macro": "/way Tanaris 52.4 27.2",
    "notes": "Goblin Engineering Specialization"
  },
  {
    "name": "Vazario Linkgrease",
    "profession": "engineering",
    "profName": "Engineering",
    "faction": "Neutral",
    "rank": "Artisan",
    "zone": "Ratchet, The Barrens",
    "coords": "62.6, 36.2",
    "macro": "/way The Barrens 62.6 36.2",
    "notes": "Goblin Engineering Specialization"
  },
  {
    "name": "Adele Fielder",
    "profession": "leatherworking",
    "profName": "Leatherworking",
    "faction": "Alliance",
    "rank": "Apprentice",
    "zone": "Elwynn Forest",
    "coords": "46.4, 62.2",
    "macro": "/way Elwynn Forest 46.4 62.2",
    "notes": "Goldshire"
  },
  {
    "name": "Fenthwick",
    "profession": "leatherworking",
    "profName": "Leatherworking",
    "faction": "Alliance",
    "rank": "Journeyman",
    "zone": "Ironforge",
    "coords": "40.2, 31.8",
    "macro": "/way Ironforge 40.2 31.8",
    "notes": "The Commons"
  },
  {
    "name": "Telonis",
    "profession": "leatherworking",
    "profName": "Leatherworking",
    "faction": "Alliance",
    "rank": "Expert",
    "zone": "Darnassus",
    "coords": "64.6, 21.4",
    "macro": "/way Darnassus 64.6 21.4",
    "notes": "Craftsmen's Terrace"
  },
  {
    "name": "Karolek",
    "profession": "leatherworking",
    "profName": "Leatherworking",
    "faction": "Horde",
    "rank": "Apprentice",
    "zone": "Orgrimmar",
    "coords": "60.0, 54.4",
    "macro": "/way Orgrimmar 60.0 54.4",
    "notes": "The Drag"
  },
  {
    "name": "Una",
    "profession": "leatherworking",
    "profName": "Leatherworking",
    "faction": "Horde",
    "rank": "Expert",
    "zone": "Thunder Bluff",
    "coords": "41.8, 42.6",
    "macro": "/way Thunder Bluff 41.8 42.6",
    "notes": "Middle Rise"
  },
  {
    "name": "Drakk Stonehand",
    "profession": "leatherworking",
    "profName": "Leatherworking",
    "faction": "Alliance",
    "rank": "Artisan",
    "zone": "Aerie Peak, Hinterlands",
    "coords": "13.4, 43.4",
    "macro": "/way The Hinterlands 13.4 43.4",
    "notes": "Artisan Master"
  },
  {
    "name": "Hahrana Ironhide",
    "profession": "leatherworking",
    "profName": "Leatherworking",
    "faction": "Horde",
    "rank": "Artisan",
    "zone": "Camp Mojache, Feralas",
    "coords": "74.4, 43.0",
    "macro": "/way Feralas 74.4 43.0",
    "notes": "Artisan Master"
  },
  {
    "name": "Peter Galen",
    "profession": "leatherworking",
    "profName": "Leatherworking",
    "faction": "Alliance",
    "rank": "Artisan",
    "zone": "Azshara",
    "coords": "37.4, 65.6",
    "macro": "/way Azshara 37.4 65.6",
    "notes": "Dragonscale Specialization"
  },
  {
    "name": "Thorkaf Dragoneye",
    "profession": "leatherworking",
    "profName": "Leatherworking",
    "faction": "Horde",
    "rank": "Artisan",
    "zone": "Badlands",
    "coords": "62.6, 57.6",
    "macro": "/way Badlands 62.6 57.6",
    "notes": "Dragonscale Specialization"
  },
  {
    "name": "Sarah Tanner",
    "profession": "leatherworking",
    "profName": "Leatherworking",
    "faction": "Alliance",
    "rank": "Artisan",
    "zone": "Searing Gorge",
    "coords": "63.8, 75.8",
    "macro": "/way Searing Gorge 63.8 75.8",
    "notes": "Elemental Specialization"
  },
  {
    "name": "Brumn Winterhoof",
    "profession": "leatherworking",
    "profName": "Leatherworking",
    "faction": "Horde",
    "rank": "Artisan",
    "zone": "Arathi Highlands",
    "coords": "28.2, 45.0",
    "macro": "/way Arathi Highlands 28.2 45.0",
    "notes": "Elemental Specialization"
  },
  {
    "name": "Pratt McGrubben",
    "profession": "leatherworking",
    "profName": "Leatherworking",
    "faction": "Alliance",
    "rank": "Artisan",
    "zone": "Feathermoon, Feralas",
    "coords": "30.6, 42.6",
    "macro": "/way Feralas 30.6 42.6",
    "notes": "Tribal Specialization"
  },
  {
    "name": "Jangdor Swiftstrider",
    "profession": "leatherworking",
    "profName": "Leatherworking",
    "faction": "Horde",
    "rank": "Artisan",
    "zone": "Camp Mojache, Feralas",
    "coords": "74.4, 43.0",
    "macro": "/way Feralas 74.4 43.0",
    "notes": "Tribal Specialization"
  },
  {
    "name": "Sellag",
    "profession": "tailoring",
    "profName": "Tailoring",
    "faction": "Alliance",
    "rank": "Apprentice",
    "zone": "Stormwind City",
    "coords": "43.4, 73.6",
    "macro": "/way Stormwind City 43.4 73.6",
    "notes": "Mage Quarter"
  },
  {
    "name": "Jormund Stonebrow",
    "profession": "tailoring",
    "profName": "Tailoring",
    "faction": "Alliance",
    "rank": "Journeyman",
    "zone": "Ironforge",
    "coords": "43.2, 28.8",
    "macro": "/way Ironforge 43.2 28.8",
    "notes": "The Great Forge"
  },
  {
    "name": "Georgio Bolero",
    "profession": "tailoring",
    "profName": "Tailoring",
    "faction": "Alliance",
    "rank": "Expert",
    "zone": "Stormwind City",
    "coords": "53.2, 81.6",
    "macro": "/way Stormwind City 53.2 81.6",
    "notes": "Mage Quarter"
  },
  {
    "name": "Magar",
    "profession": "tailoring",
    "profName": "Tailoring",
    "faction": "Horde",
    "rank": "Apprentice",
    "zone": "Orgrimmar",
    "coords": "63.6, 49.8",
    "macro": "/way Orgrimmar 63.6 49.8",
    "notes": "The Drag"
  },
  {
    "name": "Josef Gregorian",
    "profession": "tailoring",
    "profName": "Tailoring",
    "faction": "Horde",
    "rank": "Expert",
    "zone": "Undercity",
    "coords": "70.6, 30.2",
    "macro": "/way Undercity 70.6 30.2",
    "notes": "Magic Quarter"
  },
  {
    "name": "Timothy Worthington",
    "profession": "tailoring",
    "profName": "Tailoring",
    "faction": "Alliance",
    "rank": "Artisan",
    "zone": "Theramore Isle, Dustwallow",
    "coords": "66.2, 51.6",
    "macro": "/way Dustwallow Marsh 66.2 51.6",
    "notes": "Artisan Master"
  },
  {
    "name": "Daryl Stack",
    "profession": "tailoring",
    "profName": "Tailoring",
    "faction": "Horde",
    "rank": "Artisan",
    "zone": "Tarren Mill, Hillsbrad",
    "coords": "63.6, 20.8",
    "macro": "/way Hillsbrad Foothills 63.6 20.8",
    "notes": "Artisan Master"
  },
  {
    "name": "Meilosh",
    "profession": "tailoring",
    "profName": "Tailoring",
    "faction": "Neutral",
    "rank": "Artisan",
    "zone": "Timbermaw Hold, Felwood",
    "coords": "65.6, 2.8",
    "macro": "/way Felwood 65.6 2.8",
    "notes": "Timbermaw Neutral Master"
  },
  {
    "name": "Gelman Stonehand",
    "profession": "mining",
    "profName": "Mining",
    "faction": "Alliance",
    "rank": "Apprentice",
    "zone": "Stormwind City",
    "coords": "51.0, 17.2",
    "macro": "/way Stormwind City 51.0 17.2",
    "notes": "Dwarven District"
  },
  {
    "name": "Geofram Bouldertoe",
    "profession": "mining",
    "profName": "Mining",
    "faction": "Alliance",
    "rank": "Expert",
    "zone": "Ironforge",
    "coords": "50.2, 26.0",
    "macro": "/way Ironforge 50.2 26.0",
    "notes": "The Great Forge"
  },
  {
    "name": "Makaru",
    "profession": "mining",
    "profName": "Mining",
    "faction": "Horde",
    "rank": "Apprentice",
    "zone": "Orgrimmar",
    "coords": "73.0, 26.8",
    "macro": "/way Orgrimmar 73.0 26.8",
    "notes": "Valley of Honor"
  },
  {
    "name": "Brom Killian",
    "profession": "mining",
    "profName": "Mining",
    "faction": "Horde",
    "rank": "Expert",
    "zone": "Undercity",
    "coords": "55.8, 37.0",
    "macro": "/way Undercity 55.8 37.0",
    "notes": "War Quarter"
  },
  {
    "name": "Dalaran Mining Master",
    "profession": "mining",
    "profName": "Mining",
    "faction": "Neutral",
    "rank": "Expert",
    "zone": "Dalaran, Alterac Mountains",
    "coords": "25.0, 41.2",
    "macro": "/way Alterac Mountains 25.0 41.2",
    "notes": "Forever Custom Dalaran Trainer"
  },
  {
    "name": "Elderwild Miner",
    "profession": "mining",
    "profName": "Mining",
    "faction": "Neutral",
    "rank": "Artisan",
    "zone": "Mount Hyjal",
    "coords": "39.2, 23.0",
    "macro": "/way Mount Hyjal 39.2 23.0",
    "notes": "Artisan Master"
  },
  {
    "name": "Tannysa",
    "profession": "herbalism",
    "profName": "Herbalism",
    "faction": "Alliance",
    "rank": "Apprentice",
    "zone": "Stormwind City",
    "coords": "53.0, 84.8",
    "macro": "/way Stormwind City 53.0 84.8",
    "notes": "Mage Quarter"
  },
  {
    "name": "Reyna Stonebranch",
    "profession": "herbalism",
    "profName": "Herbalism",
    "faction": "Alliance",
    "rank": "Expert",
    "zone": "Ironforge",
    "coords": "55.6, 59.0",
    "macro": "/way Ironforge 55.6 59.0",
    "notes": "The Great Forge"
  },
  {
    "name": "Jandi",
    "profession": "herbalism",
    "profName": "Herbalism",
    "faction": "Horde",
    "rank": "Apprentice",
    "zone": "Orgrimmar",
    "coords": "55.6, 39.6",
    "macro": "/way Orgrimmar 55.6 39.6",
    "notes": "The Drag"
  },
  {
    "name": "Martha Alliestar",
    "profession": "herbalism",
    "profName": "Herbalism",
    "faction": "Horde",
    "rank": "Expert",
    "zone": "Undercity",
    "coords": "54.4, 49.8",
    "macro": "/way Undercity 54.4 49.8",
    "notes": "The Apothecarium"
  },
  {
    "name": "Dalaran Herbalist",
    "profession": "herbalism",
    "profName": "Herbalism",
    "faction": "Neutral",
    "rank": "Expert",
    "zone": "Dalaran, Alterac Mountains",
    "coords": "21.8, 63.6",
    "macro": "/way Alterac Mountains 21.8 63.6",
    "notes": "Forever Custom Dalaran Trainer"
  },
  {
    "name": "Elderwild Herbalist",
    "profession": "herbalism",
    "profName": "Herbalism",
    "faction": "Neutral",
    "rank": "Artisan",
    "zone": "Mount Hyjal",
    "coords": "46.8, 25.0",
    "macro": "/way Mount Hyjal 46.8 25.0",
    "notes": "Artisan Master"
  },
  {
    "name": "Maris Granger",
    "profession": "skinning",
    "profName": "Skinning",
    "faction": "Alliance",
    "rank": "Apprentice",
    "zone": "Stormwind City",
    "coords": "72.2, 62.2",
    "macro": "/way Stormwind City 72.2 62.2",
    "notes": "Old Town"
  },
  {
    "name": "Balthus Stoneflayer",
    "profession": "skinning",
    "profName": "Skinning",
    "faction": "Alliance",
    "rank": "Expert",
    "zone": "Ironforge",
    "coords": "39.8, 32.6",
    "macro": "/way Ironforge 39.8 32.6",
    "notes": "The Great Forge"
  },
  {
    "name": "Thuwd",
    "profession": "skinning",
    "profName": "Skinning",
    "faction": "Horde",
    "rank": "Apprentice",
    "zone": "Orgrimmar",
    "coords": "63.2, 45.2",
    "macro": "/way Orgrimmar 63.2 45.2",
    "notes": "Valley of Honor"
  },
  {
    "name": "Killian Hagey",
    "profession": "skinning",
    "profName": "Skinning",
    "faction": "Horde",
    "rank": "Expert",
    "zone": "Undercity",
    "coords": "70.6, 58.6",
    "macro": "/way Undercity 70.6 58.6",
    "notes": "Rogues' Quarter"
  },
  {
    "name": "Dalaran Skinner",
    "profession": "skinning",
    "profName": "Skinning",
    "faction": "Neutral",
    "rank": "Expert",
    "zone": "Dalaran, Alterac Mountains",
    "coords": "12.2, 74.6",
    "macro": "/way Alterac Mountains 12.2 74.6",
    "notes": "Forever Custom Dalaran Trainer"
  },
  {
    "name": "Elderwild Skinner",
    "profession": "skinning",
    "profName": "Skinning",
    "faction": "Neutral",
    "rank": "Artisan",
    "zone": "Mount Hyjal",
    "coords": "41.2, 43.4",
    "macro": "/way Mount Hyjal 41.2 43.4",
    "notes": "Artisan Master"
  },
  {
    "name": "Stephen Ryback",
    "profession": "cooking",
    "profName": "Cooking",
    "faction": "Alliance",
    "rank": "Apprentice",
    "zone": "Stormwind City",
    "coords": "77.2, 53.2",
    "macro": "/way Stormwind City 77.2 53.2",
    "notes": "Pig and Whistle Tavern"
  },
  {
    "name": "Daryl Riknussun",
    "profession": "cooking",
    "profName": "Cooking",
    "faction": "Alliance",
    "rank": "Journeyman",
    "zone": "Ironforge",
    "coords": "60.0, 36.8",
    "macro": "/way Ironforge 60.0 36.8",
    "notes": "The Military Ward"
  },
  {
    "name": "Shandrina",
    "profession": "cooking",
    "profName": "Cooking",
    "faction": "Alliance",
    "rank": "Expert",
    "zone": "Mystral Lake, Ashenvale",
    "coords": "50.2, 67.0",
    "macro": "/way Ashenvale 50.2 67.0",
    "notes": "Teaches Expert Cookbook"
  },
  {
    "name": "Zamja",
    "profession": "cooking",
    "profName": "Cooking",
    "faction": "Horde",
    "rank": "Apprentice",
    "zone": "Orgrimmar",
    "coords": "57.6, 53.6",
    "macro": "/way Orgrimmar 57.6 53.6",
    "notes": "The Drag"
  },
  {
    "name": "Wulan",
    "profession": "cooking",
    "profName": "Cooking",
    "faction": "Horde",
    "rank": "Expert",
    "zone": "Shadowprey Village, Desolace",
    "coords": "26.2, 69.8",
    "macro": "/way Desolace 26.2 69.8",
    "notes": "Teaches Expert Cookbook"
  },
  {
    "name": "Dirge Quikcleave",
    "profession": "cooking",
    "profName": "Cooking",
    "faction": "Neutral",
    "rank": "Artisan",
    "zone": "Gadgetzan, Tanaris",
    "coords": "52.6, 28.0",
    "macro": "/way Tanaris 52.6 28.0",
    "notes": "Clamlette Surprise quest"
  },
  {
    "name": "Shaina Fuller",
    "profession": "first-aid",
    "profName": "First Aid",
    "faction": "Alliance",
    "rank": "Apprentice",
    "zone": "Stormwind City",
    "coords": "52.6, 45.4",
    "macro": "/way Stormwind City 52.6 45.4",
    "notes": "Cathedral of Light"
  },
  {
    "name": "Deneb Walker",
    "profession": "first-aid",
    "profName": "First Aid",
    "faction": "Alliance",
    "rank": "Expert",
    "zone": "Stromgarde Keep, Arathi",
    "coords": "27.0, 58.8",
    "macro": "/way Arathi Highlands 27.0 58.8",
    "notes": "Expert First Aid book vendor"
  },
  {
    "name": "Rawrk",
    "profession": "first-aid",
    "profName": "First Aid",
    "faction": "Horde",
    "rank": "Apprentice",
    "zone": "Orgrimmar",
    "coords": "54.0, 42.0",
    "macro": "/way Orgrimmar 54.0 42.0",
    "notes": "Valley of Spirits"
  },
  {
    "name": "Balai Lok'Wein",
    "profession": "first-aid",
    "profName": "First Aid",
    "faction": "Horde",
    "rank": "Expert",
    "zone": "Brackenwall, Dustwallow",
    "coords": "36.4, 30.4",
    "macro": "/way Dustwallow Marsh 36.4 30.4",
    "notes": "Expert First Aid book vendor"
  },
  {
    "name": "Doctor Gustaf VanHowzen",
    "profession": "first-aid",
    "profName": "First Aid",
    "faction": "Alliance",
    "rank": "Artisan",
    "zone": "Theramore Isle, Dustwallow",
    "coords": "67.8, 51.2",
    "macro": "/way Dustwallow Marsh 67.8 51.2",
    "notes": "Triage Quest Master"
  },
  {
    "name": "Doctor Gregory Victor",
    "profession": "first-aid",
    "profName": "First Aid",
    "faction": "Horde",
    "rank": "Artisan",
    "zone": "Hammerfall, Arathi",
    "coords": "73.4, 36.8",
    "macro": "/way Arathi Highlands 73.4 36.8",
    "notes": "Triage Quest Master"
  },
  {
    "name": "Arnold Leland",
    "profession": "fishing",
    "profName": "Fishing",
    "faction": "Alliance",
    "rank": "Apprentice",
    "zone": "Stormwind City",
    "coords": "54.6, 69.2",
    "macro": "/way Stormwind City 54.6 69.2",
    "notes": "Canals near Trade District"
  },
  {
    "name": "Lumak",
    "profession": "fishing",
    "profName": "Fishing",
    "faction": "Horde",
    "rank": "Apprentice",
    "zone": "Orgrimmar",
    "coords": "69.8, 41.0",
    "macro": "/way Orgrimmar 69.8 41.0",
    "notes": "Valley of Honor"
  },
  {
    "name": "Old Man Heming",
    "profession": "fishing",
    "profName": "Fishing",
    "faction": "Neutral",
    "rank": "Expert",
    "zone": "Booty Bay, Stranglethorn",
    "coords": "27.4, 76.8",
    "macro": "/way Stranglethorn Vale 27.4 76.8",
    "notes": "Sells Expert Fishing - The Bass and You"
  },
  {
    "name": "Nat Pagle",
    "profession": "fishing",
    "profName": "Fishing",
    "faction": "Neutral",
    "rank": "Artisan",
    "zone": "Dustwallow Marsh",
    "coords": "58.6, 60.0",
    "macro": "/way Dustwallow Marsh 58.6 60.0",
    "notes": "Nat Pagle, Angler Extreme quest"
  },
  {
    "name": "Elden Trailblazer",
    "profession": "camping",
    "profName": "Camping",
    "faction": "Alliance",
    "rank": "Apprentice",
    "zone": "Stormwind Camp Outpost",
    "coords": "61.4, 72.8",
    "macro": "/way Stormwind City 61.4 72.8",
    "notes": "Campfire Trainer"
  },
  {
    "name": "Kurgah Flamekeeper",
    "profession": "camping",
    "profName": "Camping",
    "faction": "Horde",
    "rank": "Apprentice",
    "zone": "Razor Hill Camp",
    "coords": "53.2, 43.6",
    "macro": "/way Durotar 53.2 43.6",
    "notes": "Campfire Trainer"
  },
  {
    "name": "Campmaster Theron",
    "profession": "camping",
    "profName": "Camping",
    "faction": "Neutral",
    "rank": "Expert",
    "zone": "Zephras Isle Outpost",
    "coords": "48.0, 62.0",
    "macro": "/way Zephras Isle 48.0 62.0",
    "notes": "Station Blueprint Expert"
  },
  {
    "name": "Arch-Survivalist Orin",
    "profession": "camping",
    "profName": "Camping",
    "faction": "Neutral",
    "rank": "Artisan",
    "zone": "Mount Hyjal Expedition",
    "coords": "40.8, 26.2",
    "macro": "/way Mount Hyjal 40.8 26.2",
    "notes": "Master Camp Upgrades"
  }
];
  const CONTAINERS_DATA = {
  "tailoring": {
    "generalBags": [
      {
        "name": "Linen Bag",
        "slots": 6,
        "skill": 45,
        "quality": 1,
        "icon": "inv_misc_bag_08",
        "source": "Trainer",
        "reagents": [
          {
            "name": "Bolt of Linen Cloth",
            "count": 3,
            "icon": "inv_fabric_linen_01"
          },
          {
            "name": "Coarse Thread",
            "count": 3,
            "icon": "inv_misc_thread_01"
          }
        ],
        "desc": "Starter player inventory pouch."
      },
      {
        "name": "Woolen Bag",
        "slots": 8,
        "skill": 80,
        "quality": 1,
        "icon": "inv_misc_bag_07",
        "source": "Trainer",
        "reagents": [
          {
            "name": "Bolt of Woolen Cloth",
            "count": 3,
            "icon": "inv_fabric_wool_01"
          },
          {
            "name": "Fine Thread",
            "count": 1,
            "icon": "inv_misc_thread_02"
          }
        ],
        "desc": "Reliable 8-slot early leveling bag."
      },
      {
        "name": "Small Silk Pack",
        "slots": 10,
        "skill": 150,
        "quality": 1,
        "icon": "inv_misc_bag_09",
        "source": "Trainer",
        "reagents": [
          {
            "name": "Bolt of Silk Cloth",
            "count": 4,
            "icon": "inv_fabric_silk_01"
          },
          {
            "name": "Heavy Silken Thread",
            "count": 2,
            "icon": "inv_misc_thread_03"
          }
        ],
        "desc": "Durable 10-slot silk backpack."
      },
      {
        "name": "Mageweave Bag",
        "slots": 12,
        "skill": 225,
        "quality": 2,
        "icon": "inv_misc_bag_10",
        "source": "Trainer",
        "reagents": [
          {
            "name": "Bolt of Mageweave",
            "count": 4,
            "icon": "inv_fabric_mageweave_01"
          },
          {
            "name": "Silken Thread",
            "count": 2,
            "icon": "inv_misc_thread_03"
          }
        ],
        "desc": "12-slot mid-tier bag crafted before the Phase 2 Beta cap."
      },
      {
        "name": "Runecloth Bag",
        "slots": 14,
        "skill": 260,
        "quality": 2,
        "icon": "inv_misc_bag_11",
        "source": "Pattern (World Drop / Vendor)",
        "reagents": [
          {
            "name": "Bolt of Runecloth",
            "count": 5,
            "icon": "inv_fabric_purplefire_01"
          },
          {
            "name": "Rugged Leather",
            "count": 2,
            "icon": "inv_misc_leatherscrap_02"
          },
          {
            "name": "Rune Thread",
            "count": 1,
            "icon": "inv_misc_thread_04"
          }
        ],
        "desc": "Standard 14-slot high-capacity bag."
      },
      {
        "name": "Mooncloth Bag",
        "slots": 18,
        "skill": 300,
        "quality": 3,
        "icon": "inv_misc_bag_14",
        "source": "Pattern (Vendor: Qia in Winterspring)",
        "reagents": [
          {
            "name": "Mooncloth",
            "count": 4,
            "icon": "inv_fabric_moonrag_01"
          },
          {
            "name": "Rune Thread",
            "count": 1,
            "icon": "inv_misc_thread_04"
          }
        ],
        "desc": "Authentic WoW Forever 18-slot supreme traveler satchel (upgraded from 16 to 18 slots in Classic+!).",
        "isForeverVerified": true
      },
      {
        "name": "Bottomless Bag",
        "slots": 20,
        "skill": 300,
        "quality": 4,
        "icon": "inv_misc_bag_17",
        "source": "Pattern (Rare World Drop / Thaurissan)",
        "reagents": [
          {
            "name": "Mooncloth",
            "count": 8,
            "icon": "inv_fabric_moonrag_01"
          },
          {
            "name": "Bolt of Runecloth",
            "count": 2,
            "icon": "inv_fabric_purplefire_01"
          },
          {
            "name": "Core of Earth",
            "count": 2,
            "icon": "inv_misc_gem_opal_01"
          },
          {
            "name": "Greater Eternal Essence",
            "count": 2,
            "icon": "inv_enchant_essenceeternalgreater"
          }
        ],
        "desc": "The pinnacle 20-slot epic container."
      }
    ],
    "reagentBags": [
      {
        "name": "Small Linen Reagent Bag",
        "slots": 6,
        "skill": 40,
        "quality": 1,
        "icon": "inv_misc_bag_08",
        "source": "Tailoring Trainer",
        "reagents": [
          {
            "name": "Bolt of Linen Cloth",
            "count": 2,
            "icon": "inv_fabric_linen_01"
          },
          {
            "name": "Coarse Thread",
            "count": 1,
            "icon": "inv_misc_thread_01"
          }
        ],
        "desc": "WoW Forever Custom: Dedicated 6-slot bag that exclusively holds trade reagents and ores."
      },
      {
        "name": "Woolen Reagent Bag",
        "slots": 8,
        "skill": 80,
        "quality": 1,
        "icon": "inv_misc_bag_07",
        "source": "Tailoring Trainer",
        "reagents": [
          {
            "name": "Bolt of Woolen Cloth",
            "count": 2,
            "icon": "inv_fabric_wool_01"
          },
          {
            "name": "Fine Thread",
            "count": 1,
            "icon": "inv_misc_thread_02"
          }
        ],
        "desc": "WoW Forever Custom: Dedicated 8-slot reagent container."
      },
      {
        "name": "Silk Reagent Pack",
        "slots": 10,
        "skill": 140,
        "quality": 1,
        "icon": "inv_misc_bag_09",
        "source": "Tailoring Trainer",
        "reagents": [
          {
            "name": "Bolt of Silk Cloth",
            "count": 3,
            "icon": "inv_fabric_silk_01"
          },
          {
            "name": "Heavy Silken Thread",
            "count": 1,
            "icon": "inv_misc_thread_03"
          }
        ],
        "desc": "WoW Forever Custom: Dedicated 10-slot reagent container."
      },
      {
        "name": "Mageweave Reagent Bag",
        "slots": 12,
        "skill": 215,
        "quality": 2,
        "icon": "inv_misc_bag_10",
        "source": "Tailoring Trainer",
        "reagents": [
          {
            "name": "Bolt of Mageweave",
            "count": 3,
            "icon": "inv_fabric_mageweave_01"
          },
          {
            "name": "Silken Thread",
            "count": 1,
            "icon": "inv_misc_thread_03"
          }
        ],
        "desc": "WoW Forever Custom: Dedicated 12-slot reagent container (Phase 2 Beta Cap)."
      },
      {
        "name": "Runecloth Reagent Bag",
        "slots": 14,
        "skill": 255,
        "quality": 2,
        "icon": "inv_misc_bag_11",
        "source": "Pattern: Trade Campsite Vendor",
        "reagents": [
          {
            "name": "Bolt of Runecloth",
            "count": 4,
            "icon": "inv_fabric_purplefire_01"
          },
          {
            "name": "Rugged Leather",
            "count": 1,
            "icon": "inv_misc_leatherscrap_02"
          },
          {
            "name": "Rune Thread",
            "count": 1,
            "icon": "inv_misc_thread_04"
          }
        ],
        "desc": "WoW Forever Custom: Dedicated 14-slot reagent container."
      },
      {
        "name": "Mooncloth Reagent Satchel",
        "slots": 18,
        "skill": 295,
        "quality": 3,
        "icon": "inv_misc_bag_14",
        "source": "Pattern: Cenarion Circle",
        "reagents": [
          {
            "name": "Mooncloth",
            "count": 3,
            "icon": "inv_fabric_moonrag_01"
          },
          {
            "name": "Rune Thread",
            "count": 1,
            "icon": "inv_misc_thread_04"
          }
        ],
        "desc": "WoW Forever Custom: Massive 18-slot dedicated reagent satchel."
      },
      {
        "name": "Bottomless Reagent Bag",
        "slots": 20,
        "skill": 300,
        "quality": 4,
        "icon": "inv_misc_bag_17",
        "source": "Pattern: Dalaran Inscriptionist",
        "reagents": [
          {
            "name": "Mooncloth",
            "count": 6,
            "icon": "inv_fabric_moonrag_01"
          },
          {
            "name": "Greater Eternal Essence",
            "count": 2,
            "icon": "inv_enchant_essenceeternalgreater"
          },
          {
            "name": "Rune Thread",
            "count": 1,
            "icon": "inv_misc_thread_04"
          }
        ],
        "desc": "WoW Forever Custom: 20-slot epic reagent hauler."
      },
      {
        "name": "Light Leather Reagent Pouch",
        "slots": 6,
        "skill": 35,
        "quality": 1,
        "icon": "inv_misc_bag_10_blue",
        "source": "Leatherworking Trainer",
        "reagents": [
          {
            "name": "Light Leather",
            "count": 4,
            "icon": "inv_misc_leatherscrap_03"
          },
          {
            "name": "Coarse Thread",
            "count": 1,
            "icon": "inv_misc_thread_01"
          }
        ],
        "desc": "WoW Forever Custom: Leatherworker-stitched 6-slot pouch holding herbs, minerals, and hides."
      }
    ],
    "specialtyBags": [
      {
        "name": "Soul Pouch",
        "slots": 24,
        "skill": 175,
        "type": "Soul Bag",
        "quality": 2,
        "icon": "inv_misc_bag_10_black",
        "source": "Tailoring Trainer",
        "reagents": [
          {
            "name": "Bolt of Mageweave",
            "count": 4,
            "icon": "inv_fabric_mageweave_01"
          },
          {
            "name": "Lesser Nether Essence",
            "count": 2,
            "icon": "inv_enchant_essencenetherlesser"
          }
        ],
        "desc": "Warlock Soul Shard container holding up to 24 shards."
      },
      {
        "name": "Box of Souls",
        "slots": 28,
        "skill": 240,
        "type": "Soul Bag",
        "quality": 2,
        "icon": "inv_misc_bag_19",
        "source": "Pattern (Scholomance Drop)",
        "reagents": [
          {
            "name": "Bolt of Runecloth",
            "count": 6,
            "icon": "inv_fabric_purplefire_01"
          },
          {
            "name": "Shadow Silk",
            "count": 4,
            "icon": "inv_misc_silk_02"
          }
        ],
        "desc": "28-slot Soul Shard container."
      },
      {
        "name": "Felcloth Bag",
        "slots": 32,
        "skill": 300,
        "type": "Soul Bag",
        "quality": 3,
        "icon": "inv_misc_bag_13",
        "source": "Pattern: Knot Thimblejack (Dire Maul)",
        "reagents": [
          {
            "name": "Felcloth",
            "count": 12,
            "icon": "inv_fabric_felcloth_01"
          },
          {
            "name": "Mooncloth",
            "count": 4,
            "icon": "inv_fabric_moonrag_01"
          },
          {
            "name": "Greater Eternal Essence",
            "count": 4,
            "icon": "inv_enchant_essenceeternalgreater"
          }
        ],
        "desc": "Supreme 32-slot Warlock Soul Shard bag."
      },
      {
        "name": "Herb Pouch",
        "slots": 26,
        "skill": 160,
        "type": "Herb Bag",
        "quality": 2,
        "icon": "inv_misc_bag_10_green",
        "source": "Tailoring Trainer",
        "reagents": [
          {
            "name": "Bolt of Silk Cloth",
            "count": 4,
            "icon": "inv_fabric_silk_01"
          },
          {
            "name": "Wildvine",
            "count": 2,
            "icon": "inv_misc_herb_03"
          }
        ],
        "desc": "Dedicated 26-slot Herbalism container."
      },
      {
        "name": "Cenarion Herb Bag",
        "slots": 28,
        "skill": 275,
        "type": "Herb Bag",
        "quality": 2,
        "icon": "inv_misc_bag_18",
        "source": "Pattern: Cenarion Hold Friendly",
        "reagents": [
          {
            "name": "Bolt of Runecloth",
            "count": 5,
            "icon": "inv_fabric_purplefire_01"
          },
          {
            "name": "Purple Lotus",
            "count": 4,
            "icon": "inv_misc_herb_17"
          },
          {
            "name": "Ghost Mushroom",
            "count": 2,
            "icon": "inv_misc_herb_06"
          }
        ],
        "desc": "28-slot Herbalism satchel."
      },
      {
        "name": "Satchel of Cenarius",
        "slots": 32,
        "skill": 300,
        "type": "Herb Bag",
        "quality": 3,
        "icon": "inv_misc_bag_12",
        "source": "Pattern: Cenarion Hold Revered",
        "reagents": [
          {
            "name": "Mooncloth",
            "count": 6,
            "icon": "inv_fabric_moonrag_01"
          },
          {
            "name": "Ironweb Spider Silk",
            "count": 2,
            "icon": "inv_misc_monsterspidercarapace_01"
          },
          {
            "name": "Living Essence",
            "count": 4,
            "icon": "spell_nature_abolishpoison"
          }
        ],
        "desc": "Massive 32-slot master gathering herb bag."
      },
      {
        "name": "Small Enchanting Bag",
        "slots": 20,
        "skill": 150,
        "type": "Enchanting Bag",
        "quality": 2,
        "icon": "inv_misc_bag_10_purple",
        "source": "Tailoring Trainer",
        "reagents": [
          {
            "name": "Bolt of Silk Cloth",
            "count": 4,
            "icon": "inv_fabric_silk_01"
          },
          {
            "name": "Vision Dust",
            "count": 4,
            "icon": "inv_misc_dust_01"
          }
        ],
        "desc": "20-slot dust and essence container."
      },
      {
        "name": "Enchanting Bag",
        "slots": 24,
        "skill": 225,
        "type": "Enchanting Bag",
        "quality": 2,
        "icon": "inv_misc_bag_10_blue",
        "source": "Tailoring Trainer",
        "reagents": [
          {
            "name": "Bolt of Mageweave",
            "count": 4,
            "icon": "inv_fabric_mageweave_01"
          },
          {
            "name": "Dream Dust",
            "count": 4,
            "icon": "inv_misc_dust_02"
          }
        ],
        "desc": "24-slot enchanting material carrier."
      },
      {
        "name": "Big Bag of Enchantment",
        "slots": 32,
        "skill": 300,
        "type": "Enchanting Bag",
        "quality": 3,
        "icon": "inv_misc_bag_17",
        "source": "Pattern: Meilosh (Timbermaw Honored)",
        "reagents": [
          {
            "name": "Bolt of Runecloth",
            "count": 6,
            "icon": "inv_fabric_purplefire_01"
          },
          {
            "name": "Greater Eternal Essence",
            "count": 4,
            "icon": "inv_enchant_essenceeternalgreater"
          },
          {
            "name": "Illusion Dust",
            "count": 4,
            "icon": "inv_misc_dust_02"
          }
        ],
        "desc": "32-slot enchanting vault bag."
      }
    ]
  },
  "leatherworking": {
    "quivers": [
      {
        "name": "Light Quiver",
        "slots": 6,
        "speed": "+10%",
        "skill": 30,
        "quality": 1,
        "icon": "inv_misc_quiver_07",
        "source": "Leatherworking Trainer",
        "reagents": [
          {
            "name": "Light Leather",
            "count": 4,
            "icon": "inv_misc_leatherscrap_03"
          },
          {
            "name": "Light Hide",
            "count": 2,
            "icon": "inv_misc_pelt_wolf_01"
          }
        ],
        "desc": "Increases ranged attack speed by 10%. Holds 6 stacks of arrows."
      },
      {
        "name": "Heavy Quiver",
        "slots": 10,
        "speed": "+12%",
        "skill": 150,
        "quality": 2,
        "icon": "inv_misc_quiver_06",
        "source": "Leatherworking Trainer",
        "reagents": [
          {
            "name": "Heavy Leather",
            "count": 4,
            "icon": "inv_misc_leatherscrap_01"
          },
          {
            "name": "Heavy Hide",
            "count": 2,
            "icon": "inv_misc_pelt_bear_01"
          }
        ],
        "desc": "Increases ranged attack speed by 12%. Holds 10 stacks of arrows."
      },
      {
        "name": "Quickdraw Quiver",
        "slots": 16,
        "speed": "+13%",
        "skill": 225,
        "quality": 2,
        "icon": "inv_misc_quiver_05",
        "source": "Pattern: Vendor (Orgrimmar / Darnassus)",
        "reagents": [
          {
            "name": "Thick Leather",
            "count": 4,
            "icon": "inv_misc_leatherscrap_02"
          },
          {
            "name": "Shadowcat Hide",
            "count": 1,
            "icon": "inv_misc_pelt_04"
          }
        ],
        "desc": "Increases ranged attack speed by 13%. Holds 16 stacks of arrows (Phase 2 Beta Cap BiS!)."
      },
      {
        "name": "Ancient Sinew Wrapped Lamina",
        "slots": 18,
        "speed": "+15%",
        "skill": "Quest",
        "quality": 4,
        "icon": "inv_misc_quiver_01",
        "source": "Epic Hunter Quest (Ancient Sinew)",
        "reagents": [
          {
            "name": "Ancient Sinew",
            "count": 1,
            "icon": "inv_misc_horn_01"
          }
        ],
        "desc": "Increases ranged attack speed by 15%. Holds 18 stacks of arrows."
      }
    ],
    "pouches": [
      {
        "name": "Small Leather Ammo Pouch",
        "slots": 6,
        "speed": "+10%",
        "skill": 30,
        "quality": 1,
        "icon": "inv_misc_ammo_pouch_01",
        "source": "Leatherworking Trainer",
        "reagents": [
          {
            "name": "Light Leather",
            "count": 4,
            "icon": "inv_misc_leatherscrap_03"
          },
          {
            "name": "Light Hide",
            "count": 2,
            "icon": "inv_misc_pelt_wolf_01"
          }
        ],
        "desc": "Increases ranged attack speed by 10%. Holds 6 stacks of bullets."
      },
      {
        "name": "Heavy Leather Ammo Pouch",
        "slots": 10,
        "speed": "+12%",
        "skill": 150,
        "quality": 2,
        "icon": "inv_misc_ammo_pouch_02",
        "source": "Leatherworking Trainer",
        "reagents": [
          {
            "name": "Heavy Leather",
            "count": 4,
            "icon": "inv_misc_leatherscrap_01"
          },
          {
            "name": "Heavy Hide",
            "count": 2,
            "icon": "inv_misc_pelt_bear_01"
          }
        ],
        "desc": "Increases ranged attack speed by 12%. Holds 10 stacks of bullets."
      },
      {
        "name": "Thick Leather Ammo Pouch",
        "slots": 16,
        "speed": "+13%",
        "skill": 225,
        "quality": 2,
        "icon": "inv_misc_ammo_pouch_03",
        "source": "Pattern: Vendor (Thunder Bluff / Ironforge)",
        "reagents": [
          {
            "name": "Thick Leather",
            "count": 4,
            "icon": "inv_misc_leatherscrap_02"
          },
          {
            "name": "Shadowcat Hide",
            "count": 1,
            "icon": "inv_misc_pelt_04"
          }
        ],
        "desc": "Increases ranged attack speed by 13%. Holds 16 stacks of bullets (Phase 2 Beta Cap BiS!)."
      }
    ],
    "reagentBags": [
      {
        "name": "Light Leather Reagent Pouch",
        "slots": 6,
        "skill": 35,
        "quality": 1,
        "icon": "inv_misc_bag_10_blue",
        "source": "Leatherworking Trainer",
        "reagents": [
          {
            "name": "Light Leather",
            "count": 4,
            "icon": "inv_misc_leatherscrap_03"
          },
          {
            "name": "Coarse Thread",
            "count": 1,
            "icon": "inv_misc_thread_01"
          }
        ],
        "desc": "WoW Forever Custom: 6-slot container for trade reagents, scales, and hides."
      }
    ]
  }
};
  const SPECIALIZATIONS_DATA = {
  "engineering": {
    "phaseNote": "⚡ Available in Phase 2 Beta at Character Level 30 & Skill 200!",
    "isBetaActive": true,
    "specs": [
      {
        "id": "gnomish",
        "name": "Gnomish Engineering",
        "icon": "inv_misc_wrench_01",
        "archetype": "Gadgets, Crowd Control & Tactical Device Synergy",
        "trainer": "Tinkmaster Overspark in Ironforge (/way 69.8, 50.0) or Oglethorpe Obnoticus in Booty Bay (/way 28.2, 76.2)",
        "questName": "The Pledge of Secrecy › Show Your Work",
        "questTurnIns": [
          {
            "name": "Mithril Tube",
            "count": 6,
            "icon": "inv_misc_steelpipetooth"
          },
          {
            "name": "Precise Scope",
            "count": 1,
            "icon": "inv_misc_spyglass_02"
          },
          {
            "name": "Advanced Target Dummy",
            "count": 2,
            "icon": "inv_gizmo_01"
          }
        ],
        "crafts": [
          {
            "name": "Gnomish Death Ray",
            "id": "4388",
            "icon": "inv_gizmo_08",
            "effect": "Channels terrifying death ray into target for massive burst damage.",
            "quality": 3
          },
          {
            "name": "Gnomish Battle Chicken",
            "id": "10725",
            "icon": "inv_misc_birdegg_01",
            "effect": "Summons mechanical pet that grants +5% attack speed aura to nearby party members.",
            "quality": 3
          },
          {
            "name": "Gnomish Mind Control Cap",
            "id": "10726",
            "icon": "inv_helmet_49",
            "effect": "Mind controls enemy humanoid player or mob for up to 30 sec.",
            "quality": 2
          },
          {
            "name": "Gnomish Rocket Boots",
            "id": "10724",
            "icon": "inv_boots_02",
            "effect": "Massive movement speed burst for escaping or chasing in PvP.",
            "quality": 2
          },
          {
            "name": "Gnomish Net-o-Matic Projector",
            "id": "10720",
            "icon": "inv_misc_net_01",
            "effect": "Roots target in place for 10 sec at 30 yd range.",
            "quality": 2
          },
          {
            "name": "Gnomish Shrink Ray",
            "id": "10716",
            "icon": "inv_gizmo_04",
            "effect": "Shrinks target, reducing their melee attack power by 250.",
            "quality": 2
          },
          {
            "name": "Ultrasafe Transporter: Gadgetzan",
            "id": "18984",
            "icon": "inv_misc_enggizmos_13",
            "effect": "Teleports maker directly to Gadgetzan, Tanaris.",
            "quality": 2
          }
        ]
      },
      {
        "id": "goblin",
        "name": "Goblin Engineering",
        "icon": "inv_misc_bomb_04",
        "archetype": "Heavy Explosives, Massive AoE Burst & High-Damage Combat Sappers",
        "trainer": "Nixx Sprocketspring in Gadgetzan, Tanaris (/way 52.4, 27.2) or Vazario Linkgrease in Ratchet (/way 62.6, 36.2)",
        "questName": "The Pledge of Secrecy › Show Your Work",
        "questTurnIns": [
          {
            "name": "Solid Blasting Powder",
            "count": 20,
            "icon": "inv_misc_powder_solid"
          },
          {
            "name": "Iron Grenade",
            "count": 20,
            "icon": "inv_misc_bomb_08"
          },
          {
            "name": "Big Iron Bomb",
            "count": 5,
            "icon": "inv_misc_bomb_01"
          }
        ],
        "crafts": [
          {
            "name": "Goblin Sapper Charge",
            "id": "10646",
            "icon": "inv_misc_bomb_02",
            "effect": "Explodes instantly dealing 450 to 750 Fire damage to all nearby enemies (and 375 to self). Mandatory for dungeon speedruns!",
            "quality": 2
          },
          {
            "name": "Goblin Rocket Boots",
            "id": "7189",
            "icon": "inv_boots_02",
            "effect": "Increases run speed by 70% for 20 sec (chance to explode).",
            "quality": 2
          },
          {
            "name": "The Big One",
            "id": "10586",
            "icon": "inv_misc_bomb_04",
            "effect": "Inflicts 340 to 460 Fire damage and stuns all enemies in 10 yd radius for 5 sec.",
            "quality": 2
          },
          {
            "name": "Goblin Dragon Gun",
            "id": "10727",
            "icon": "inv_musket_04",
            "effect": "Cone of fire dealing 400 to 600 Fire damage over 10 sec.",
            "quality": 3
          },
          {
            "name": "Goblin Rocket Helmet",
            "id": "10588",
            "icon": "inv_helmet_49",
            "effect": "Charges target and incapacitates them for 30 sec.",
            "quality": 2
          },
          {
            "name": "Goblin Mortar",
            "id": "10577",
            "icon": "inv_musket_01",
            "effect": "Launches artillery shell dealing 383 to 517 Fire damage with 3 sec stun.",
            "quality": 2
          },
          {
            "name": "Dimensional Ripper - Everlook",
            "id": "18986",
            "icon": "inv_misc_enggizmos_13",
            "effect": "Teleports maker directly to Everlook, Winterspring.",
            "quality": 2
          }
        ]
      }
    ]
  },
  "blacksmithing": {
    "phaseNote": "🔒 Phase 3 Unlock: Character Level 40 & Skill 200+ (Pre-farm materials now!)",
    "isBetaActive": false,
    "specs": [
      {
        "id": "armorsmith",
        "name": "Armorsmithing",
        "icon": "inv_chest_plate04",
        "archetype": "Plate & Mail Defense, Disarm Immunity & Raid Tanking Armor",
        "trainer": "Grumnus Steelshaper in Ironforge (/way 50.2, 42.8) or Okothos Ironrager in Orgrimmar (/way 79.8, 23.8)",
        "questName": "The Art of the Armorsmith",
        "questTurnIns": [
          {
            "name": "Ornate Mithril Helm",
            "count": 4,
            "icon": "inv_helmet_24"
          },
          {
            "name": "Ornate Mithril Boots",
            "count": 2,
            "icon": "inv_boots_plate_01"
          },
          {
            "name": "Ornate Mithril Breastplate",
            "count": 1,
            "icon": "inv_chest_plate04"
          }
        ],
        "crafts": [
          {
            "name": "Truesilver Gauntlets",
            "icon": "inv_gauntlets_10",
            "effect": "Grants immunity to Disarm and +20 Strength.",
            "quality": 3
          },
          {
            "name": "Breastplate of the Earthshaker",
            "icon": "inv_chest_plate06",
            "effect": "Defensive plate chestpiece with bonus armor and stamina.",
            "quality": 3
          },
          {
            "name": "Helm of the Great Chief",
            "icon": "inv_helmet_01",
            "effect": "Stamina and armor tanking helmet.",
            "quality": 3
          },
          {
            "name": "Invulnerable Mail",
            "icon": "inv_chest_chain_03",
            "effect": "Grants 20 sec invulnerability to physical damage on hit.",
            "quality": 4
          },
          {
            "name": "Stronghold Gauntlets",
            "icon": "inv_gauntlets_26",
            "effect": "Immunity to Disarm, +1% Parry, +1% Crit.",
            "quality": 4
          }
        ]
      },
      {
        "id": "weaponsmith",
        "name": "Weaponsmithing (Swords, Axes & Hammers)",
        "icon": "inv_sword_27",
        "archetype": "Endgame Raid Weapons, Nightfall Debuff & Master Weapon Specializations",
        "trainer": "Ironus Coldsteel in Ironforge (/way 50.8, 45.2) or Borgosh Corebender in Orgrimmar (/way 79.6, 23.6)",
        "questName": "The Way of the Weaponsmith",
        "questTurnIns": [
          {
            "name": "Moonsteel Broadsword",
            "count": 4,
            "icon": "inv_sword_04"
          },
          {
            "name": "Massive Iron Axe",
            "count": 4,
            "icon": "inv_axe_06"
          },
          {
            "name": "Big Black Mace",
            "count": 2,
            "icon": "inv_mace_01"
          },
          {
            "name": "Heavy Mithril Axe",
            "count": 2,
            "icon": "inv_axe_07"
          }
        ],
        "crafts": [
          {
            "name": "Nightfall (Axe)",
            "icon": "inv_axe_12",
            "effect": "Equip: Chance on hit to increase spell damage taken by target by 15% for 5 sec (Raid Staple!).",
            "quality": 4
          },
          {
            "name": "Arcanite Reaper (Axe)",
            "icon": "inv_axe_09",
            "effect": "Legendary 3.8 speed mortal strike powerhouse with +62 AP.",
            "quality": 3
          },
          {
            "name": "Arcanite Champion (Sword)",
            "icon": "inv_sword_39",
            "effect": "Chance on hit heals for 270 to 450 and increases Strength by 120.",
            "quality": 3
          },
          {
            "name": "Hammer of the Titans (Mace)",
            "icon": "inv_hammer_04",
            "effect": "Chance on hit stuns target for 3 sec and increases Strength by 15.",
            "quality": 3
          },
          {
            "name": "Blackguard (Master Swordsmith)",
            "icon": "inv_sword_27",
            "effect": "Fast 1-handed tank/DPS sword with +1% Parry and Stamina.",
            "quality": 4
          },
          {
            "name": "Annihilator (Master Axesmith)",
            "icon": "inv_axe_04",
            "effect": "Lowers target armor by 200, stacks up to 3 times for entire raid.",
            "quality": 3
          }
        ]
      }
    ]
  },
  "leatherworking": {
    "phaseNote": "🔒 Phase 3 Unlock: Character Level 40 & Skill 225 (Pre-farm materials now!)",
    "isBetaActive": false,
    "specs": [
      {
        "id": "dragonscale",
        "name": "Dragonscale Leatherworking",
        "icon": "inv_misc_monsterscales_03",
        "archetype": "Mail Armor for Hunters & Elemental/Enhancement Shamans",
        "trainer": "Peter Galen in Azshara (/way 37.4, 65.6, A) or Thorkaf Dragoneye in Badlands (/way 62.6, 57.6, H)",
        "questName": "Dragonscale Leatherworking",
        "questTurnIns": [
          {
            "name": "Tough Scorpid Breastplate",
            "count": 2,
            "icon": "inv_chest_chain_03"
          },
          {
            "name": "Tough Scorpid Gloves",
            "count": 2,
            "icon": "inv_gauntlets_04"
          },
          {
            "name": "Worn Dragonscale",
            "count": 10,
            "icon": "inv_misc_monsterscales_03"
          }
        ],
        "crafts": [
          {
            "name": "Dragonscale Gauntlets",
            "icon": "inv_gauntlets_05",
            "effect": "Intellect & Agility mail gloves for physical damage dealers.",
            "quality": 3
          },
          {
            "name": "Blue Dragonscale Breastplate",
            "icon": "inv_chest_chain_14",
            "effect": "High Intellect and MP5 mail chestpiece for Shamans.",
            "quality": 3
          },
          {
            "name": "Black Dragonscale Set",
            "icon": "inv_pants_03",
            "effect": "Provides massive Fire Resistance, Hit rating, and Attack Power.",
            "quality": 3
          },
          {
            "name": "Red Dragonscale Breastplate",
            "icon": "inv_chest_chain_11",
            "effect": "Fire Resistance mail armor for Molten Core raiding.",
            "quality": 3
          }
        ]
      },
      {
        "id": "elemental",
        "name": "Elemental Leatherworking",
        "icon": "spell_fire_fireball",
        "archetype": "Agility, Stamina & Fire/Nature Resistance Gear for Rogues and Druids",
        "trainer": "Sarah Tanner in Searing Gorge (/way 63.8, 75.8, A) or Brumn Winterhoof in Arathi Highlands (/way 28.2, 45.0, H)",
        "questName": "Elemental Leatherworking",
        "questTurnIns": [
          {
            "name": "Globe of Water",
            "count": 2,
            "icon": "inv_misc_gem_sapphire_02"
          },
          {
            "name": "Heart of Fire",
            "count": 2,
            "icon": "spell_fire_fire"
          },
          {
            "name": "Breath of Wind",
            "count": 2,
            "icon": "spell_nature_cyclone"
          },
          {
            "name": "Core of Earth",
            "count": 2,
            "icon": "inv_misc_gem_opal_01"
          }
        ],
        "crafts": [
          {
            "name": "Helm of Fire",
            "icon": "inv_helmet_22",
            "effect": "Leather helm dealing fire damage to attackers on hit.",
            "quality": 3
          },
          {
            "name": "Living Breastplate",
            "icon": "inv_chest_leather_08",
            "effect": "High Nature Resistance and passive health regeneration.",
            "quality": 3
          },
          {
            "name": "Stormshroud Armor Set",
            "icon": "inv_chest_leather_03",
            "effect": "Grants chance on hit to restore 30 Energy or 40 Mana.",
            "quality": 3
          },
          {
            "name": "Volcanic Armor Set",
            "icon": "inv_pants_06",
            "effect": "Premium Fire Resistance set for Rogues and Druids.",
            "quality": 3
          }
        ]
      },
      {
        "id": "tribal",
        "name": "Tribal Leatherworking",
        "icon": "inv_misc_monsterfang_01",
        "archetype": "The Premier Physical DPS Spec: Devilsaur, Wolfshead Helm & Corehound Belt",
        "trainer": "Pratt McGrubben in Feathermoon Stronghold, Feralas (/way 30.6, 42.6, A) or Jangdor Swiftstrider in Camp Mojache, Feralas (/way 74.4, 43.0, H)",
        "questName": "Tribal Leatherworking",
        "questTurnIns": [
          {
            "name": "Wild Leather Vest",
            "count": 1,
            "icon": "inv_chest_leather_04"
          },
          {
            "name": "Wild Leather Helmet",
            "count": 1,
            "icon": "inv_helmet_14"
          },
          {
            "name": "Wildvine",
            "count": 11,
            "icon": "inv_misc_herb_03"
          }
        ],
        "crafts": [
          {
            "name": "Wolfshead Helm",
            "icon": "inv_helmet_04",
            "effect": "When you shapeshift into Cat Form you gain 20 Energy, or 5 Rage in Bear Form (Permanent Feral Druid BiS!).",
            "quality": 3
          },
          {
            "name": "Devilsaur Gauntlets & Leggings",
            "icon": "inv_gauntlets_04",
            "effect": "Set Bonus: Increases your chance to hit by 2% and Attack Power by 46.",
            "quality": 3
          },
          {
            "name": "Corehound Belt",
            "icon": "inv_belt_03",
            "effect": "Epic leather belt granting massive Intellect and MP5.",
            "quality": 4
          },
          {
            "name": "Hide of the Wild",
            "icon": "inv_misc_cape_16",
            "effect": "Epic healing cloak with +42 Healing and mana regen.",
            "quality": 4
          }
        ]
      }
    ]
  }
};
  const PAIRING_WIZARD_DATA = [
  {
    "roleId": "tank",
    "roleName": "Tank (Prot Warrior / Paladin / Feral Bear)",
    "icon": "🛡️",
    "primaryPair": "Mining + Blacksmithing",
    "altPair": "Mining + Engineering",
    "synergyStars": "★★★★★",
    "passives": "Earth's Bounty (+5% Maximum Health) & Master Craftsman (+34 Strength)",
    "campAura": "Lodestone (+90 Melee Attack Power) & Sharpening Wheel (+34 Strength)",
    "summary": "Massive health pool scaling combined with self-crafted plate armor, shield spikes, and threat generation."
  },
  {
    "roleId": "melee_dps",
    "roleName": "Melee Physical DPS (Warrior / Rogue / Feral / Shaman)",
    "icon": "⚔️",
    "primaryPair": "Engineering + Blacksmithing",
    "altPair": "Leatherworking + Skinning (Ferals & Rogues)",
    "synergyStars": "★★★★★",
    "passives": "Combat Tinker (+3% Crit & CC Trinkets) & Master Craftsman (+34 Strength)",
    "campAura": "Repair Bot (Field Repairs) & Sharpening Wheel (+34 Strength)",
    "summary": "Goblin Sapper Charges provide unmatched AoE burst damage in dungeons, while Blacksmithing provides high-DPS weapons."
  },
  {
    "roleId": "ranged_dps",
    "roleName": "Ranged Physical DPS (Hunter)",
    "icon": "🏹",
    "primaryPair": "Engineering + Leatherworking",
    "altPair": "Leatherworking + Skinning",
    "synergyStars": "★★★★★",
    "passives": "Sniper Optics (+3% Ranged Hit) & Master Skinner (+2% Critical Strike)",
    "campAura": "Reagent Bot (Ammo & Supplies) & Camp Tent (+5% Rested XP)",
    "summary": "Craft specialized quivers and ammo pouches (+13% attack speed), Sniper Scopes (+7 Damage), and Dragonscale mail armor."
  },
  {
    "roleId": "caster_dps",
    "roleName": "Caster DPS (Mage / Warlock / Priest / Boomkin / Ele)",
    "icon": "🔮",
    "primaryPair": "Tailoring + Enchanting",
    "altPair": "Tailoring + Engineering",
    "synergyStars": "★★★★★",
    "passives": "Weaver's Grace (+20 Spell Damage & Healing) & Arcane Infusion (+15 Spell Pen)",
    "campAura": "Faction Banner (+32 Spirit) & Enchanted Lute (+308 Armor, +13 All Stats, +22 Resists)",
    "summary": "Craft pre-raid cloth BiS (Robe of the Archmage, Felcloth), disenchant dungeon drops directly, and apply wizard oils."
  },
  {
    "roleId": "healer",
    "roleName": "Healer (Priest / Paladin / Resto Shaman / Resto Druid)",
    "icon": "🌿",
    "primaryPair": "Alchemy + Herbalism",
    "altPair": "Tailoring + Enchanting",
    "synergyStars": "★★★★★",
    "passives": "Master Mixologist (+20% Potion Duration & Healing/Mana Effect) & Natural Grace (+25 Int)",
    "campAura": "Mana Well (29 Mana per 5 sec) & Incense Candle (+25 Intellect)",
    "summary": "Unlimited Mana Potions and Mageblood Elixirs keep healer mana sustained through intensive raid and dungeon battles."
  },
  {
    "roleId": "pvp",
    "roleName": "PvP Arena & Battlegrounds (All Classes)",
    "icon": "⚡",
    "primaryPair": "Engineering + Mining",
    "altPair": "Engineering + Blacksmithing",
    "synergyStars": "★★★★★",
    "passives": "Combat Engineer (Net-o-Matic, Mind Control Cap, Rocket Boots) & Earth's Bounty (+5% HP)",
    "campAura": "Repair Bot (Instant field repairs between BG queues) & Lodestone (+90 AP)",
    "summary": "The undisputed competitive PvP standard. Reflector trinkets, stun bombs, and gap-closing rocket boots dictate every skirmish."
  },
  {
    "roleId": "gold",
    "roleName": "Raw Gold Making & Trade Tycoon",
    "icon": "🪙",
    "primaryPair": "Mining + Herbalism",
    "altPair": "Skinning + Tailoring (Bag Empire)",
    "synergyStars": "★★★★★",
    "passives": "Dual Track Mini-Map Radar & Market Arbitrage",
    "campAura": "Rock Garden (Bonus ore spawns at camp) & Greenhouse (Cultivate herbs from seeds)",
    "summary": "High liquid capital from gathering raw ores, herbs, and bag sales on the Auction House."
  }
];
  const DISENCHANT_BRACKETS_DATA = [
  {
    "ilvl": "iLvl 5–15",
    "dust": "Strange Dust (1–2x)",
    "essence": "Lesser Magic Essence (1–2x)",
    "shard": "—",
    "notes": "Armor favors Dusts (~80%); Weapons favor Essences (~80%)."
  },
  {
    "ilvl": "iLvl 16–25",
    "dust": "Strange Dust (2–5x)",
    "essence": "Greater Magic Essence (1–2x)",
    "shard": "Small Glimmering Shard (100% Blue)",
    "notes": "Level 15–20 dungeon green drops."
  },
  {
    "ilvl": "iLvl 26–35",
    "dust": "Soul Dust (1–3x)",
    "essence": "Astral Essence (Lesser/Greater 1–2x)",
    "shard": "Small Glowing Shard (100% Blue)",
    "notes": "Phase 2 Beta Cap prime equipment range."
  },
  {
    "ilvl": "iLvl 36–45",
    "dust": "Vision Dust (1–3x)",
    "essence": "Mystic Essence (Lesser/Greater 1–2x)",
    "shard": "Small Radiant Shard (100% Blue)",
    "notes": "Mid-level 40 dungeon items (SM/RFD)."
  },
  {
    "ilvl": "iLvl 46–50",
    "dust": "Dream Dust (1–3x)",
    "essence": "Nether Essence (Lesser/Greater 1–2x)",
    "shard": "Large Radiant Shard (100% Blue)",
    "notes": "Late level 40–50 items (ZF/Mara)."
  },
  {
    "ilvl": "iLvl 51–60",
    "dust": "Illusion Dust (1–3x)",
    "essence": "Eternal Essence (Lesser/Greater 1–2x)",
    "shard": "Large Brilliant Shard (100% Blue) / Nexus Crystal (Epic)",
    "notes": "Endgame raid & level 60 dungeon drops (BRD/Scholo/Strath)."
  }
];
  const FISHING_SCHEDULE_DATA = {
  "dayNight": [
    {
      "name": "Nightfin Snapper",
      "icon": "inv_drink_03",
      "windows": "18:00 – 06:00 (Peak: 00:00 – 06:00)",
      "peakHours": [
        0,
        1,
        2,
        3,
        4,
        5
      ],
      "twilightHours": [
        18,
        19,
        20,
        21,
        22,
        23
      ],
      "dayHours": [
        6,
        7,
        8,
        9,
        10,
        11,
        12,
        13,
        14,
        15,
        16,
        17
      ],
      "buff": "+8 MP5 Well Fed buff (Poached Sunscale / Nightfin Soup) - Absolute BiS for Casters and Healers!",
      "zones": "Moonglade, Feralas, Felwood, Azshara, Tanaris, Winterspring, Plaguelands (Skill 205+)"
    },
    {
      "name": "Sunscale Salmon",
      "icon": "inv_misc_fish_24",
      "windows": "06:00 – 18:00 (Peak Daylight Catch)",
      "peakHours": [
        6,
        7,
        8,
        9,
        10,
        11,
        12,
        13,
        14,
        15,
        16,
        17
      ],
      "twilightHours": [],
      "dayHours": [
        6,
        7,
        8,
        9,
        10,
        11,
        12,
        13,
        14,
        15,
        16,
        17
      ],
      "buff": "+6 HP per 5 sec Well Fed buff - Tank and Leveling food.",
      "zones": "Feralas, Tanaris, Felwood, Azshara, Moonglade (Skill 205+)"
    }
  ],
  "seasons": [
    {
      "name": "Winter Squid",
      "icon": "inv_misc_fish_13",
      "season": "Fall & Winter (October through March)",
      "isActiveNow": true,
      "yieldBuff": "+10 Agility Well Fed buff (Grilled Squid) - Crucial BiS food for Rogues, Hunters, and Feral Druids!",
      "bestLocations": "Bay of Storms (Azshara), Steamwheedle Port (Tanaris), Forgotten Coast (Feralas)",
      "notes": "Active right now in Beta (October)!"
    },
    {
      "name": "Summer Bass",
      "icon": "inv_misc_fish_20",
      "season": "Spring & Summer (March through October)",
      "isActiveNow": false,
      "yieldBuff": "+10 Spirit Well Fed buff (Hot Smoked Bass)",
      "bestLocations": "Azshara coast, Stranglethorn Vale waters, Tanaris",
      "notes": "Migrates in Spring Equinox."
    }
  ],
  "pools": [
    {
      "name": "Oily Blackmouth Pool",
      "icon": "inv_misc_fish_19",
      "locations": "Coastlines of Darkshore, Westfall, Barrens, Wetlands, Hillsbrad, Ashenvale",
      "loot": "100% Oily Blackmouth catch rate. Needed for Blackmouth Oil, Free Action Potions, and Swim Speed Potions.",
      "mechanic": "Schools require only 1 Fishing Skill to reel in without losing fish."
    },
    {
      "name": "Firefin Snapper Pool",
      "icon": "inv_misc_fish_22",
      "locations": "Coastal waters of Tanaris, Stranglethorn Vale, Azshara, Hillsbrad",
      "loot": "100% Firefin Snapper catch rate. Used for Fire Oil and Elixir of Greater Firepower.",
      "mechanic": "Dense spawns along coastal beaches."
    },
    {
      "name": "Greater Sagefish Pool",
      "icon": "inv_misc_fish_26",
      "locations": "Inland freshwater of Alterac Mountains, Western Plaguelands, Jaguero Isle (STV)",
      "loot": "Yields Raw Greater Sagefish (+6 MP5 cooked Sagefish Delight).",
      "mechanic": "High-value healer food source."
    },
    {
      "name": "Floating Wreckage",
      "icon": "inv_crate_04",
      "locations": "Stranglethorn Vale, Tanaris, Azshara, Feralas coastlines",
      "loot": "Locked Iron/Mithril Bound Trunks, Bolts of Mageweave/Runecloth, Heavy/Thick Leather, 16-slot Traveler's Backpacks.",
      "mechanic": "Excellent open-world gold farming."
    },
    {
      "name": "Patch of Elemental Water",
      "icon": "spell_nature_elementalshields",
      "locations": "Circle of East Binding (Arathi Highlands), Bay of Storms (Azshara)",
      "loot": "Globe of Water, Essence of Water, Elemental Water.",
      "mechanic": "Crucial for high-end enchanting and alchemy recipes."
    }
  ]
};
  const MINING_CIRCUITS = [
  {
    "tierId": "copper",
    "tierName": "Tier 1: Copper Ore & Rough Stone (Skill 1–65)",
    "ores": [
      "Copper Ore",
      "Rough Stone",
      "Malachite",
      "Tigerseye"
    ],
    "routes": [
      {
        "id": "copper_durotar",
        "name": "Durotar River & Valley Circuit",
        "faction": "Horde",
        "zone": "Durotar",
        "lapMinutes": "8–10 min",
        "direction": "Clockwise",
        "density": "Very High (~16–20 nodes/lap)",
        "hostileLevel": "Lvl 6–12",
        "bestFor": "Rapid 1–65 leveling for Horde Orcs & Trolls",
        "waypoint": "/way Durotar 52.0 43.0",
        "description": "Start at Razor Hill, ride south along the eastern cliffs past Sen'jin Village into Valley of Trials ridge, then loop north following the river boundary cliffs past Drygulch Ravine back to Razor Hill.",
        "tips": "Check the cliffs above Drygulch Ravine; Harpies patrol nearby but rarely aggro from the upper mining ledges."
      },
      {
        "id": "copper_elwynn",
        "name": "Elwynn Forest Goldshire Perimeter",
        "faction": "Alliance",
        "zone": "Elwynn Forest",
        "lapMinutes": "10–12 min",
        "direction": "Counter-Clockwise",
        "density": "High (~14–18 nodes/lap)",
        "hostileLevel": "Lvl 5–10",
        "bestFor": "Fast 1–65 leveling for Alliance Humans",
        "waypoint": "/way Elwynn Forest 38.0 64.0",
        "description": "Begin outside Goldshire, head south past Stonefield Farm and the Fargodeep Mine perimeter, sweep east past Maclure Vineyards and Brackwell Pumpkin Patch, loop north around Jasperlode Mine rim and Crystal Lake, and return via the Northshire and Mirror Lake cliffs.",
        "tips": "Do not enter the deep mine tunnels unless servers are quiet; the external perimeter cliff nodes respawn faster than cave clears."
      },
      {
        "id": "copper_darkshore",
        "name": "Darkshore Cliff Ridge & Master's Glaive",
        "faction": "Alliance",
        "zone": "Darkshore",
        "lapMinutes": "12–15 min",
        "direction": "Clockwise",
        "density": "High (~12–16 nodes/lap)",
        "hostileLevel": "Lvl 12–18",
        "bestFor": "Alliance Night Elves transitioning to Tin",
        "waypoint": "/way Darkshore 42.0 40.0",
        "description": "Skirt the eastern mountain wall starting from Bashal'Aran south towards Ameth'Aran, encircling the Master's Glaive excavation crater and heading back north along the coastal tree line.",
        "tips": "Ghoststrider beasts along the ridge run fast; maintain max distance when gathering on low-level alts."
      },
      {
        "id": "copper_mulgore",
        "name": "Mulgore Red Cloud & Venture Co Caves",
        "faction": "Horde",
        "zone": "Mulgore",
        "lapMinutes": "10–12 min",
        "direction": "Clockwise",
        "density": "Very High (~16–22 nodes/lap)",
        "hostileLevel": "Lvl 4–10",
        "bestFor": "Horde Tauren & peaceful early leveling",
        "waypoint": "/way Mulgore 48.0 60.0",
        "description": "Ride the outer plateau wall from Bloodhoof Village south past Red Cloud Mesa, sweeping through the Palemane gnoll rocks, then north along the western cliffs past Windfury Crag and east past the Venture Co. Mine.",
        "tips": "Wide open fields make node spotting exceptionally easy. Check the Venture Co Mine entrance for bonus spawns."
      }
    ]
  },
  {
    "tierId": "tin",
    "tierName": "Tier 2: Tin Ore, Silver Ore & Coarse Stone (Skill 65–125)",
    "ores": [
      "Tin Ore",
      "Silver Ore",
      "Coarse Stone",
      "Moss Agate",
      "Shadowgem"
    ],
    "routes": [
      {
        "id": "tin_barrens",
        "name": "Northern Barrens Hills & Sludge Fen Loop",
        "faction": "Horde",
        "zone": "The Barrens",
        "lapMinutes": "14–16 min",
        "direction": "Clockwise",
        "density": "Very High (~20–26 nodes/lap)",
        "hostileLevel": "Lvl 14–22",
        "bestFor": "World #1 Tin Ore yield & Horde cross-progression",
        "waypoint": "/way The Barrens 51.0 30.0",
        "description": "From The Crossroads, ride northwest around the Forgotten Pools mountain wall, sweep around the perimeter of Sludge Fen, curve east towards Ratchet hills, and loop back south across the raptor grounds.",
        "tips": "Venture Co drill platforms frequently spawn 2–3 Tin nodes right beside their ramps."
      },
      {
        "id": "tin_westfall",
        "name": "Westfall Coastal & Moonbrook Circuit",
        "faction": "Alliance",
        "zone": "Westfall",
        "lapMinutes": "12–14 min",
        "direction": "Counter-Clockwise",
        "density": "High (~14–18 nodes/lap)",
        "hostileLevel": "Lvl 14–19",
        "bestFor": "Alliance Tin & Coarse Stone pre-Deadmines",
        "waypoint": "/way Westfall 53.0 53.0",
        "description": "Start at Sentinel Hill, head northwest past the northern farmsteads to the Longshore bluffs, ride south along the coastal cliffs past the lighthouse, cut east behind Moonbrook and the Deadmines mountain exterior, then north along the Dagger Hills.",
        "tips": "Defias bandits near Moonbrook can daze mounts; stay on the outer cliff edges where raptors and harvest golems are sparse."
      },
      {
        "id": "tin_loch_modan",
        "name": "Loch Modan Perimeter Mountain Ridge",
        "faction": "Alliance",
        "zone": "Loch Modan",
        "lapMinutes": "11–13 min",
        "direction": "Clockwise",
        "density": "Very High (~18–22 nodes/lap)",
        "hostileLevel": "Lvl 13–20",
        "bestFor": "Extremely dense Alliance Dwarven loop",
        "waypoint": "/way Loch Modan 35.5 48.5",
        "description": "Loop the complete horseshoe mountain ridge enclosing the Loch: from Thelsamar, head north past Silver Stream Mine to Stonewrought Dam, ride south along the Mo'grosh eastern ridge to Ironband's Excavation, and sweep west across Grizzlepaw Ridge and Valley of Kings.",
        "tips": "Silver Stream Mine interior and exterior hold up to 5 simultaneous Tin/Silver veins."
      },
      {
        "id": "tin_hillsbrad",
        "name": "Hillsbrad Southern Coast & Durnholde Rim",
        "faction": "Contested",
        "zone": "Hillsbrad Foothills",
        "lapMinutes": "13–15 min",
        "direction": "Counter-Clockwise",
        "density": "High (~15–19 nodes/lap)",
        "hostileLevel": "Lvl 20–26",
        "bestFor": "Contested PvP & transitioning from Tin to Iron",
        "waypoint": "/way Hillsbrad Foothills 50.0 58.0",
        "description": "From Southshore, ride along the southern coastal cliffs east towards Dun Garok and Thoradin's Wall, turn north into the foothills encircling Durnholde Keep, sweep west across the hills north of Tarren Mill, and return south past Azurelode Mine.",
        "tips": "Rich in both Tin and early Iron spawns along the northern mountain ridge."
      }
    ]
  },
  {
    "tierId": "iron",
    "tierName": "Tier 3: Iron Ore, Gold Ore & Heavy Stone (Skill 125–175)",
    "ores": [
      "Iron Ore",
      "Gold Ore",
      "Heavy Stone",
      "Jade",
      "Lesser Moonstone"
    ],
    "routes": [
      {
        "id": "iron_arathi",
        "name": "Arathi Highlands Border Perimeter",
        "faction": "Contested",
        "zone": "Arathi Highlands",
        "lapMinutes": "15–18 min",
        "direction": "Clockwise",
        "density": "Very High (~22–28 nodes/lap)",
        "hostileLevel": "Lvl 32–38",
        "bestFor": "World #1 Iron density & heavy stone stockpiling",
        "waypoint": "/way Arathi Highlands 44.0 32.0",
        "description": "Trace the entire outer boundary of Arathi Highlands: start along the northern ridge above Refuge Pointe, ride east past Boulderfist Outpost and Hammerfall cliffs, circle south past Go'Shek Farm and Witherbark Village, and trace the western wall past Stromgarde Keep.",
        "tips": "Kobold caves in dry hills contain 3–4 internal nodes; check their thresholds without pulling the deep caves."
      },
      {
        "id": "iron_needles",
        "name": "Thousand Needles Shimmering Flats Rim",
        "faction": "Contested",
        "zone": "Thousand Needles",
        "lapMinutes": "14–16 min",
        "direction": "Counter-Clockwise",
        "density": "High (~18–24 nodes/lap)",
        "hostileLevel": "Lvl 28–35",
        "bestFor": "Fast flat terrain riding & Gold Ore veins",
        "waypoint": "/way Thousand Needles 78.0 75.0",
        "description": "Start at the Mirage Raceway, trace the northern canyon wall west into the main Thousand Needles canyon pillars past Splithoof Crag and Freewind Post, then sweep southeast around the Rustmaul and Shimmering Flats salt basin rim.",
        "tips": "Completely flat terrain allows uninterrupted 100% mount speeds; watch out for wandering basilisks."
      },
      {
        "id": "iron_badlands",
        "name": "Badlands North Basin Circuit",
        "faction": "Contested",
        "zone": "Badlands",
        "lapMinutes": "12–14 min",
        "direction": "Clockwise",
        "density": "Very High (~20–25 nodes/lap)",
        "hostileLevel": "Lvl 35–40",
        "bestFor": "Fast Iron & seamless transition into Mithril",
        "waypoint": "/way Badlands 16.0 44.0",
        "description": "From Kargath, ride north along the western canyon wall to Angor Fortress, sweep east past the Uldaman exterior ravine and Hammertoe's Digsite, drop south through Dustwind Dig, and return west along the central ridge.",
        "tips": "Spawns both Iron and Mithril simultaneously once above Skill 175."
      },
      {
        "id": "iron_wetlands",
        "name": "Wetlands Raptor Ridge & Greenwarden",
        "faction": "Alliance",
        "zone": "Wetlands",
        "lapMinutes": "15–17 min",
        "direction": "Counter-Clockwise",
        "density": "Moderate-High (~14–18 nodes/lap)",
        "hostileLevel": "Lvl 24–30",
        "bestFor": "Alliance safe-zone farming on PvE/RP realms",
        "waypoint": "/way Wetlands 56.0 42.0",
        "description": "Follow the eastern and northern mountain crescent from Greenwarden's Grove up through Raptor Ridge and Direforge Hill, sweep west past Dun Modr and Ironbeard's Tomb to Whelgar's Excavation, and loop back east past Thelgen Rock.",
        "tips": "Wetland marsh water slows unmounted running; stick tightly to the rocky base along the foothills."
      }
    ]
  },
  {
    "tierId": "mithril",
    "tierName": "Tier 4: Mithril Ore, Truesilver Ore & Solid Stone (Skill 175–230 / 245)",
    "ores": [
      "Mithril Ore",
      "Truesilver Ore",
      "Solid Stone",
      "Citrine",
      "Aquamarine"
    ],
    "routes": [
      {
        "id": "mithril_badlands",
        "name": "Badlands Full Perimeter Loop (Peak Mithril)",
        "faction": "Contested",
        "zone": "Badlands",
        "lapMinutes": "12–15 min",
        "direction": "Counter-Clockwise",
        "density": "Maximum (~26–34 nodes/lap)",
        "hostileLevel": "Lvl 36–44",
        "bestFor": "Undisputed #1 Mithril farming circuit in classic WoW",
        "waypoint": "/way Badlands 14.0 48.0",
        "description": "Hug the continuous rock wall bordering the entire zone: start at Kargath, ride south past Apocryphan's Rest, east along the Southern Ridge past Camp Cagg and Agmond's End, north through the Lethlor Dragon canyons, and west past Uldaman.",
        "tips": "The respawn rate in Badlands is dynamic — with 2+ miners on the loop, nodes respawn within 8–10 minutes, making continuous laps non-stop."
      },
      {
        "id": "mithril_hinterlands",
        "name": "Hinterlands Troll Ruins & Overlook Circuit",
        "faction": "Contested",
        "zone": "The Hinterlands",
        "lapMinutes": "16–18 min",
        "direction": "Clockwise",
        "density": "Very High (~22–28 nodes/lap)",
        "hostileLevel": "Lvl 44–50",
        "bestFor": "High Mithril + Truesilver + Wildvine crossover",
        "waypoint": "/way The Hinterlands 22.0 48.0",
        "description": "Ride east from Aerie Peak along the northern cliff wall past Agol'watha and Seradane, curve south along the Overlook Cliffs and Jintha'Alor exterior, and return west along the southern river gorge past Shadra'Alor.",
        "tips": "Elite trolls near Jintha'Alor outer ramps guard multiple Truesilver and Mithril veins; kite carefully."
      },
      {
        "id": "mithril_searing_gorge",
        "name": "Searing Gorge Caldera & Slag Pit Rim",
        "faction": "Contested",
        "zone": "Searing Gorge",
        "lapMinutes": "13–15 min",
        "direction": "Clockwise",
        "density": "High (~18–24 nodes/lap)",
        "hostileLevel": "Lvl 43–48",
        "bestFor": "Compact loop with Dark Iron Ore crossover",
        "waypoint": "/way Searing Gorge 38.0 28.0",
        "description": "Circle the rim of the central volcanic cauldron: start at Thorium Point, trace the northern rim east to Dustfire Valley, ride south around Grimesilt Dig Site and Tanner Camp, and loop west through the Sea of Fire and Firewatch Ridge.",
        "tips": "Avoid falling into the Slag Pit unless you plan to farm inside the magma caverns where Dark Iron spawns."
      },
      {
        "id": "mithril_tanaris",
        "name": "Tanaris Desert Dunes & Noxious Lair Rim",
        "faction": "Contested",
        "zone": "Tanaris",
        "lapMinutes": "16–20 min",
        "direction": "Counter-Clockwise",
        "density": "High (~18–22 nodes/lap)",
        "hostileLevel": "Lvl 42–48",
        "bestFor": "Spacious route with heavy Truesilver frequency",
        "waypoint": "/way Tanaris 51.0 28.0",
        "description": "From Gadgetzan, ride west past Zul'Farrak's mountain wall, trace the western border south around the Noxious Lair and Thistleshrub Valley, loop east towards Southbreak Shore cliffs, and return north past Lost Rigger Cove and Noonshade Ruins.",
        "tips": "Steer clear of the Silithid tunnel pits unless riding high level mounts to prevent daze dismounts."
      }
    ]
  },
  {
    "tierId": "thorium",
    "tierName": "Tier 5: Thorium Ore, Rich Thorium & Arcane Crystal (Skill 230–300)",
    "ores": [
      "Thorium Ore",
      "Dense Stone",
      "Arcane Crystal",
      "Blue Sapphire",
      "Large Opal",
      "Huge Emerald"
    ],
    "routes": [
      {
        "id": "thorium_ungoro",
        "name": "Un'Goro Crater Volcano Rim Circuit",
        "faction": "Contested",
        "zone": "Un'Goro Crater",
        "lapMinutes": "18–22 min",
        "direction": "Clockwise",
        "density": "Maximum (~26–36 nodes/lap)",
        "hostileLevel": "Lvl 50–55",
        "bestFor": "World #1 Arcane Crystal & Rich Thorium yields",
        "waypoint": "/way Un'Goro Crater 46.0 14.0",
        "description": "From Marshal's Stand, trace the entire steep perimeter cliff wall of the crater clockwise past Fungal Rock, Ironstone Plateau, the Slithering Scar hive entrances, Terror Run, and Golakka Hot Springs.",
        "tips": "Fire Plume Ridge in the center holds up to 4 Rich Thorium veins simultaneously on its upper volcanic ledges."
      },
      {
        "id": "thorium_winterspring",
        "name": "Winterspring Lake Kel'Theril & Mazthoril Lap",
        "faction": "Contested",
        "zone": "Winterspring",
        "lapMinutes": "18–20 min",
        "direction": "Counter-Clockwise",
        "density": "Very High (~22–28 nodes/lap)",
        "hostileLevel": "Lvl 54–59",
        "bestFor": "Rich Thorium + Blue Sapphire + Winter Squid fishing combo",
        "waypoint": "/way Winterspring 60.0 38.0",
        "description": "Start at Everlook, ride northwest past Starfall Village to Frostsaber Rock, curve south past Lake Kel'Theril and the Mazthoril canyon walls, sweep through Owl Wing Thicket, and loop back north past Ice Thistle Hills.",
        "tips": "The blue dragonkin outside Mazthoril guard 3–4 Rich Thorium nodes; use crowd control or pets to mine them."
      },
      {
        "id": "thorium_epl",
        "name": "Eastern Plaguelands Cauldron Run",
        "faction": "Contested",
        "zone": "Eastern Plaguelands",
        "lapMinutes": "20–24 min",
        "direction": "Clockwise",
        "density": "Very High (~22–30 nodes/lap)",
        "hostileLevel": "Lvl 55–60",
        "bestFor": "High-end Phase 3 endgame stockpiling",
        "waypoint": "/way Eastern Plaguelands 79.0 58.0",
        "description": "From Light's Hope Chapel, ride southwest past Lake Mereldar to the Darrowshire foothills, head north along the Fungal Vale and Plaguewood walls, sweep east past Northpass Tower and Noxious Glade, and return south to Light's Hope.",
        "tips": "Beware of roaming crypt stalkers; they inflict infectious diseases that interrupt gather channels."
      },
      {
        "id": "thorium_silithus",
        "name": "Silithus Hive Borders & Twilight Ridge",
        "faction": "Contested",
        "zone": "Silithus",
        "lapMinutes": "16–19 min",
        "direction": "Counter-Clockwise",
        "density": "High (~18–26 nodes/lap)",
        "hostileLevel": "Lvl 55–60",
        "bestFor": "Rich Thorium + Twilight Cultist farming",
        "waypoint": "/way Silithus 51.0 38.0",
        "description": "From Cenarion Hold, trace the outside perimeter counter-clockwise around Hive'Ashi, Twilight Base Camp, Hive'Zora, and Hive'Regal, skirting the western and southern mountain rims before returning north past Staghelm Point.",
        "tips": "Rich Thorium veins spawn directly on the ramp entrances of the three major silithid hives."
      }
    ]
  }
];
  const HERBALISM_CIRCUITS = [
  {
    "tierId": "herb_tier1",
    "tierName": "Tier 1: Peacebloom, Silverleaf & Earthroot (Skill 1–50)",
    "herbs": [
      "Peacebloom",
      "Silverleaf",
      "Earthroot"
    ],
    "routes": [
      {
        "id": "herb_durotar",
        "name": "Durotar River & Valley of Trials Loop",
        "faction": "Horde",
        "zone": "Durotar",
        "lapMinutes": "8–10 min",
        "direction": "Clockwise",
        "density": "Very High (~18–24 nodes/lap)",
        "hostileLevel": "Lvl 4–10",
        "bestFor": "Rapid Horde 1–50 herb skilling",
        "waypoint": "/way Durotar 52.0 43.0",
        "description": "From Razor Hill, head south past Tiragarde Keep down to Sen'jin Village, curve west around the Valley of Trials hills, and loop north along the Southfury River banks and Thunder Ridge gullies.",
        "tips": "Earthroot spawns exclusively on elevated rock crags and cliff edges, while Peacebloom and Silverleaf blanket the open dirt plains."
      },
      {
        "id": "herb_elwynn",
        "name": "Elwynn Forest Northshire & Crystal Lake",
        "faction": "Alliance",
        "zone": "Elwynn Forest",
        "lapMinutes": "10–12 min",
        "direction": "Counter-Clockwise",
        "density": "Very High (~18–22 nodes/lap)",
        "hostileLevel": "Lvl 5–9",
        "bestFor": "Alliance Humans 1–50 starter loop",
        "waypoint": "/way Elwynn Forest 42.0 65.0",
        "description": "From Goldshire, sweep southeast through Fargodeep woods to Crystal Lake, head north to the Northshire river crossing, trace the tree line west towards Mirror Lake, and curve south past Stonefield Farm.",
        "tips": "Dense Peacebloom clusters spawn along the riverbanks near Crystal Lake."
      },
      {
        "id": "herb_tirisfal",
        "name": "Tirisfal Glades Brill Forest Perimeter",
        "faction": "Horde",
        "zone": "Tirisfal Glades",
        "lapMinutes": "9–11 min",
        "direction": "Clockwise",
        "density": "High (~16–20 nodes/lap)",
        "hostileLevel": "Lvl 6–11",
        "bestFor": "Undead Horde fast herb leveling",
        "waypoint": "/way Tirisfal Glades 59.0 52.0",
        "description": "Start at Brill, ride northeast towards Stillwater Pond and Balnir Farmstead, loop south around the Undercity outer moat, and head west across Nightmare Vale and north to Agamand Mills.",
        "tips": "Stillwater Pond shores hold high Earthroot and Peacebloom spawn clusters."
      },
      {
        "id": "herb_teldrassil",
        "name": "Teldrassil Starbreeze & Lake Al'Ameth",
        "faction": "Alliance",
        "zone": "Teldrassil",
        "lapMinutes": "11–13 min",
        "direction": "Counter-Clockwise",
        "density": "High (~15–19 nodes/lap)",
        "hostileLevel": "Lvl 6–11",
        "bestFor": "Alliance Night Elves starter loop",
        "waypoint": "/way Teldrassil 56.0 58.0",
        "description": "From Dolanaar, ride south circling Lake Al'Ameth, cut northeast through Starbreeze Village ruins to the Wellspring River, and loop west past Ban'ethil Hollow and the Pools of Arlithrien.",
        "tips": "Silverleaf spawns heavily under tree canopies; check roots and stumps."
      }
    ]
  },
  {
    "tierId": "herb_tier2",
    "tierName": "Tier 2: Mageroyal, Briarthorn, Stranglekelp & Bruiseweed (Skill 50–100)",
    "herbs": [
      "Mageroyal",
      "Briarthorn",
      "Stranglekelp",
      "Bruiseweed"
    ],
    "routes": [
      {
        "id": "herb_barrens",
        "name": "The Barrens Oasis & Lushwater Circuit",
        "faction": "Horde",
        "zone": "The Barrens",
        "lapMinutes": "12–15 min",
        "direction": "Clockwise",
        "density": "Maximum (~22–28 nodes/lap)",
        "hostileLevel": "Lvl 13–18",
        "bestFor": "World #1 Briarthorn & Mageroyal density",
        "waypoint": "/way The Barrens 51.0 30.0",
        "description": "Connect the three lush oases in a clockwise loop: from The Crossroads, ride southeast to the Stagnant Oasis, sweep west to Lushwater Oasis and Wailing Caverns, head north to the Forgotten Pools, and curve east back to Crossroads.",
        "tips": "Oasis pools also spawn freshwater fish and Stranglekelp along their submerged edges."
      },
      {
        "id": "herb_westfall",
        "name": "Westfall Moonbrook & Coastal Water Run",
        "faction": "Alliance",
        "zone": "Westfall",
        "lapMinutes": "12–14 min",
        "direction": "Counter-Clockwise",
        "density": "High (~16–22 nodes/lap)",
        "hostileLevel": "Lvl 14–19",
        "bestFor": "Alliance Briarthorn + Stranglekelp underwater run",
        "waypoint": "/way Westfall 53.0 53.0",
        "description": "Ride northwest from Sentinel Hill to the Longshore coast (dive for Stranglekelp), follow the shoreline south to Demont's Place, cut east around Moonbrook hills for Briarthorn, and head north across Dagger Hills and Saldean's farmland.",
        "tips": "Swimming along the Longshore beach guarantees 8–10 Stranglekelp nodes per pass."
      },
      {
        "id": "herb_loch_modan",
        "name": "Loch Modan Farmlands & Valley Loop",
        "faction": "Alliance",
        "zone": "Loch Modan",
        "lapMinutes": "11–13 min",
        "direction": "Clockwise",
        "density": "Very High (~18–24 nodes/lap)",
        "hostileLevel": "Lvl 12–18",
        "bestFor": "Fast Alliance terrestrial herb loop",
        "waypoint": "/way Loch Modan 36.0 48.0",
        "description": "From Thelsamar, ride north through the Algaz valley to the Stonewrought Dam base, follow the western Loch shoreline reeds south, and loop back northwest through Grizzlepaw Foothills and Stonesplinter Valley.",
        "tips": "Briarthorn clusters heavily around the base of trees throughout the valley."
      },
      {
        "id": "herb_silverpine",
        "name": "Silverpine Coast & Ambermill Foothills",
        "faction": "Horde",
        "zone": "Silverpine Forest",
        "lapMinutes": "13–16 min",
        "direction": "Counter-Clockwise",
        "density": "High (~16–20 nodes/lap)",
        "hostileLevel": "Lvl 12–18",
        "bestFor": "Horde Briarthorn + underwater Stranglekelp",
        "waypoint": "/way Silverpine Forest 46.0 42.0",
        "description": "From The Sepulcher, head northwest to North Tide's Hollow coast, ride south along the shoreline harvesting Stranglekelp to Shadowfang Keep bluff, sweep east to Ambermill foothills, and return north along Lordamere Lake.",
        "tips": "Watch out for Son of Arugal (Lvl 25 Elite) patrolling the central road."
      }
    ]
  },
  {
    "tierId": "herb_tier3",
    "tierName": "Tier 3: Wild Steelbloom, Grave Moss & Kingsblood (Skill 100–150)",
    "herbs": [
      "Wild Steelbloom",
      "Grave Moss",
      "Kingsblood"
    ],
    "routes": [
      {
        "id": "herb_hillsbrad",
        "name": "Hillsbrad Durnholde & Plateau Run",
        "faction": "Contested",
        "zone": "Hillsbrad Foothills",
        "lapMinutes": "13–15 min",
        "direction": "Clockwise",
        "density": "Very High (~20–26 nodes/lap)",
        "hostileLevel": "Lvl 22–28",
        "bestFor": "World #1 Kingsblood & Wild Steelbloom density",
        "waypoint": "/way Hillsbrad Foothills 56.0 46.0",
        "description": "Circle the hills between Tarren Mill and Southshore: head north from Tarren Mill up the plateau steps, sweep east around Durnholde Keep's high ridge, curve southwest across the river above Southshore, and loop northwest through Hillsbrad Fields.",
        "tips": "Wild Steelbloom grows on high peaks and rocky ledges; climb the plateau steps."
      },
      {
        "id": "herb_wetlands",
        "name": "Wetlands Ironbeard's Tomb & Marsh Lap",
        "faction": "Alliance",
        "zone": "Wetlands",
        "lapMinutes": "14–17 min",
        "direction": "Counter-Clockwise",
        "density": "High (~16–22 nodes/lap)",
        "hostileLevel": "Lvl 24–30",
        "bestFor": "Massive Grave Moss spawns around crypts",
        "waypoint": "/way Wetlands 32.0 48.0",
        "description": "From Menethil Marsh outskirts, ride southeast along the sunken road to Mosshide Fen, curve northeast through the raptor grounds, loop northwest past Ironbeard's Tomb crypts and Sundown Marsh, and return south past the Bluegill murloc shanties.",
        "tips": "Grave Moss is concentrated right outside the tomb entrances."
      },
      {
        "id": "herb_stonetalon",
        "name": "Stonetalon Sun Rock & Charred Vale",
        "faction": "Horde",
        "zone": "Stonetalon Mountains",
        "lapMinutes": "15–18 min",
        "direction": "Clockwise",
        "density": "High (~15–20 nodes/lap)",
        "hostileLevel": "Lvl 20–28",
        "bestFor": "Horde Wild Steelbloom cliff route",
        "waypoint": "/way Stonetalon Mountains 48.0 58.0",
        "description": "From Sun Rock Retreat, ride east to Windshear Crag switchbacks, follow Webwinder Path south, sweep west into the Charred Vale harpy ledges, and loop northeast past Mirkfallon Lake back to Sun Rock.",
        "tips": "High elevation paths contain multiple Wild Steelbloom nodes every few hundred yards."
      },
      {
        "id": "herb_redridge",
        "name": "Redridge Mountains Render's Camp Loop",
        "faction": "Alliance",
        "zone": "Redridge Mountains",
        "lapMinutes": "12–14 min",
        "direction": "Clockwise",
        "density": "Moderate-High (~14–18 nodes/lap)",
        "hostileLevel": "Lvl 18–25",
        "bestFor": "Alliance Kingsblood & Wild Steelbloom",
        "waypoint": "/way Redridge Mountains 32.0 48.0",
        "description": "From Lakeshire, ride north into the Redridge Canyons gnoll ridges, sweep east past Alther's Mill to Render's Rock foothills, drop south into Render's Valley, and return west along the Lakeridge Highway.",
        "tips": "Watch out for Blackrock Orc patrols along the northeastern passes."
      }
    ]
  },
  {
    "tierId": "herb_tier4",
    "tierName": "Tier 4: Fadeleaf, Goldthorn, Khadgar's Whisker & Wintersbite (Skill 150–205)",
    "herbs": [
      "Fadeleaf",
      "Goldthorn",
      "Khadgar's Whisker",
      "Wintersbite"
    ],
    "routes": [
      {
        "id": "herb_arathi",
        "name": "Arathi Highlands Witherbark & Binding Stones",
        "faction": "Contested",
        "zone": "Arathi Highlands",
        "lapMinutes": "15–18 min",
        "direction": "Clockwise",
        "density": "Maximum (~24–30 nodes/lap)",
        "hostileLevel": "Lvl 34–40",
        "bestFor": "World #1 Goldthorn & Khadgar's Whisker circuit",
        "waypoint": "/way Arathi Highlands 44.0 48.0",
        "description": "Circle the central valley of Arathi: from Refuge Pointe, head north to the Circle of West Binding, ride east past Boulderfist Outpost and Circle of East Binding, sweep south around Go'Shek Farm and Witherbark Village, and return northwest.",
        "tips": "Goldthorn clusters heavily around rocky outcroppings and ruins; check the base of each troll tower."
      },
      {
        "id": "herb_swamp",
        "name": "Swamp of Sorrows Misty Reed & Bog Run",
        "faction": "Contested",
        "zone": "Swamp of Sorrows",
        "lapMinutes": "14–16 min",
        "direction": "Counter-Clockwise",
        "density": "Very High (~20–26 nodes/lap)",
        "hostileLevel": "Lvl 35–42",
        "bestFor": "World #1 Fadeleaf and Blindweed starter yield",
        "waypoint": "/way Swamp of Sorrows 46.0 54.0",
        "description": "From Stonard, head north to the Fallow Sanctuary bog, sweep west past The Harborage to Splinterspear Junction, loop southeast through the southern cypress groves and Sorrowmurk, and return along the Pool of Tears western bank.",
        "tips": "Fadeleaf grows in damp shady groves; check behind giant cypress tree trunks."
      },
      {
        "id": "herb_alterac",
        "name": "Alterac Mountains Yeti Caves & Ruins",
        "faction": "Contested",
        "zone": "Alterac Mountains",
        "lapMinutes": "12–15 min",
        "direction": "Clockwise",
        "density": "High (~16–22 nodes/lap)",
        "hostileLevel": "Lvl 33–39",
        "bestFor": "Only reliable outdoor source of Wintersbite",
        "waypoint": "/way Alterac Mountains 46.0 62.0",
        "description": "From the southern snowline pass, ride northwest around the Ruins of Alterac and Growless Cave, climb northeast into The Uplands, and loop southeast through Strahnbrad and Gallows' Corner.",
        "tips": "Wintersbite only spawns within the snowy high-altitude plateaus and ruins of Alterac."
      },
      {
        "id": "herb_stv_north",
        "name": "Northern Stranglethorn Vale Kurzen Loop",
        "faction": "Contested",
        "zone": "Stranglethorn Vale",
        "lapMinutes": "16–18 min",
        "direction": "Counter-Clockwise",
        "density": "High (~18–24 nodes/lap)",
        "hostileLevel": "Lvl 32–38",
        "bestFor": "Fadeleaf + Khadgar's Whisker + jungle beasts",
        "waypoint": "/way Stranglethorn Vale 36.0 11.0",
        "description": "From Nesingwary's Expedition, ride west to the Ruins of Zul'Kunda, head south along the coast past Bal'lal and Kal'ai ruins, sweep east to Mizjah, and loop north along Lake Nazferiti and Kurzen's Compound back past Rebel Camp.",
        "tips": "Watch out for stealthed jungle panthers; gather while mounted if possible."
      }
    ]
  },
  {
    "tierId": "herb_tier5",
    "tierName": "Tier 5: Firebloom & Purple Lotus (Skill 205–230)",
    "herbs": [
      "Firebloom",
      "Purple Lotus",
      "Wildvine"
    ],
    "routes": [
      {
        "id": "herb_tanaris",
        "name": "Tanaris Desert Dunes & Thistleshrub Valley",
        "faction": "Contested",
        "zone": "Tanaris",
        "lapMinutes": "16–19 min",
        "direction": "Clockwise",
        "density": "Maximum (~22–28 nodes/lap)",
        "hostileLevel": "Lvl 42–48",
        "bestFor": "World #1 Firebloom yield across Azeroth",
        "waypoint": "/way Tanaris 51.0 28.0",
        "description": "From Gadgetzan, ride east past Noonshade Ruins, head south through Waterspring Field and Southbreak Shore dunes, sweep west across Dunemaul to Thistleshrub Valley, and loop north past the Noxious Lair back to Gadgetzan.",
        "tips": "Firebloom glows bright orange in the desert sands, visible from extreme rendering distance."
      },
      {
        "id": "herb_searing_fire",
        "name": "Searing Gorge Sea of Fire Rim",
        "faction": "Contested",
        "zone": "Searing Gorge",
        "lapMinutes": "12–15 min",
        "direction": "Clockwise",
        "density": "Very High (~18–24 nodes/lap)",
        "hostileLevel": "Lvl 43–48",
        "bestFor": "Fast compact Firebloom loop",
        "waypoint": "/way Searing Gorge 38.0 28.0",
        "description": "From Thorium Point, ride east along the northern cauldron flats to Dustfire Valley, loop south around Grimesilt Dig Site and the southern lava fissures, and sweep northwest through the Sea of Fire and Firewatch Ridge.",
        "tips": "Dense Firebloom spawns right at the edges of the open lava fissures."
      },
      {
        "id": "herb_hinterlands_lotus",
        "name": "Hinterlands Jintha'Alor & Troll Ruins Rim",
        "faction": "Contested",
        "zone": "The Hinterlands",
        "lapMinutes": "16–18 min",
        "direction": "Counter-Clockwise",
        "density": "High (~16–22 nodes/lap)",
        "hostileLevel": "Lvl 44–50",
        "bestFor": "Purple Lotus & Wildvine stockpiling",
        "waypoint": "/way The Hinterlands 44.0 62.0",
        "description": "From Valorwind Lake ruins, ride east to the exterior base of Jintha'Alor, curve northeast to Shaol'watha, sweep west past Agol'watha to Zun'watha, and loop south around Shadra'Alor.",
        "tips": "Purple Lotus in the Hinterlands has a 20% chance to also yield valuable Wildvine on pick."
      },
      {
        "id": "herb_badlands_flat",
        "name": "Badlands Flatlands Basin Circuit",
        "faction": "Contested",
        "zone": "Badlands",
        "lapMinutes": "12–14 min",
        "direction": "Counter-Clockwise",
        "density": "High (~14–18 nodes/lap)",
        "hostileLevel": "Lvl 36–42",
        "bestFor": "Peaceful alternative for Firebloom",
        "waypoint": "/way Badlands 54.0 42.0",
        "description": "From Dustwind Dig flats, ride northwest past the coyote bluffs, sweep south across the western barren plains to Camp Cagg basin, loop east through Agmond's End and Mirage Flats, and return north.",
        "tips": "Flat desert landscape allows uninterrupted line-of-sight herb tracking."
      }
    ]
  },
  {
    "tierId": "herb_tier6",
    "tierName": "Tier 6: Sungrass, Blindweed, Ghost Mushroom & Gromsblood (Skill 230–270)",
    "herbs": [
      "Sungrass",
      "Blindweed",
      "Ghost Mushroom",
      "Gromsblood"
    ],
    "routes": [
      {
        "id": "herb_swamp_temple",
        "name": "Swamp of Sorrows Sunken Temple Circuit",
        "faction": "Contested",
        "zone": "Swamp of Sorrows",
        "lapMinutes": "14–16 min",
        "direction": "Clockwise",
        "density": "Maximum (~24–30 nodes/lap)",
        "hostileLevel": "Lvl 40–46",
        "bestFor": "World #1 Blindweed & Sungrass density",
        "waypoint": "/way Swamp of Sorrows 62.0 48.0",
        "description": "Complete continuous clockwise loops around the circular Pool of Tears waterways enclosing the Sunken Temple of Atal'Hakkar in the eastern half of the swamp.",
        "tips": "Blindweed exclusively lines the water reeds, while Sungrass spawns on the dry hillocks nearby."
      },
      {
        "id": "herb_felwood",
        "name": "Felwood Bloodvenom Falls & Corrupted Woods",
        "faction": "Contested",
        "zone": "Felwood",
        "lapMinutes": "16–20 min",
        "direction": "Counter-Clockwise",
        "density": "Very High (~20–26 nodes/lap)",
        "hostileLevel": "Lvl 48–54",
        "bestFor": "World #1 Gromsblood + Cleansed Whipper Root",
        "waypoint": "/way Felwood 51.0 82.0",
        "description": "From Emerald Sanctuary, ride north along the eastern corrupted woods to Irontree Woods, loop west around Jadefire Run, and head south along the main road past Shatter Scar Vale, Bloodvenom Post, and Jaedenar.",
        "tips": "Gromsblood spawns around demonic ruins and Satyr camps; kill Satyrs for Felcloth while farming."
      },
      {
        "id": "herb_ghost_caves",
        "name": "Hinterlands Skulk Rock & Creeping Cave",
        "faction": "Contested",
        "zone": "The Hinterlands",
        "lapMinutes": "12–14 min",
        "direction": "Clockwise",
        "density": "High (~12–18 nodes/lap)",
        "hostileLevel": "Lvl 45–50",
        "bestFor": "Ghost Mushroom cave route (needed for Shadow Power)",
        "waypoint": "/way The Hinterlands 57.0 42.0",
        "description": "Target the damp subterranean caves in a clockwise loop: start at Skulk Rock cave, sweep southeast to the Jintha'Alor lower cave, cut west to Creeping Cave, and loop north through Agol'watha's cavern.",
        "tips": "Ghost Mushrooms strictly spawn inside caves and damp dungeons (Maraudon & Hinterlands caves)."
      },
      {
        "id": "herb_feralas",
        "name": "Feralas Verdantis River & Isildien Loop",
        "faction": "Contested",
        "zone": "Feralas",
        "lapMinutes": "16–19 min",
        "direction": "Clockwise",
        "density": "High (~18–24 nodes/lap)",
        "hostileLevel": "Lvl 42–48",
        "bestFor": "Sungrass + Golden Sansam transition",
        "waypoint": "/way Feralas 72.0 45.0",
        "description": "From Camp Mojache bridge, ride south through Woodpaw Hills to the Ruins of Isildien, curve northwest past Feral Scar Vale and the Verdantis River, and loop northeast along the Twin Colossals slopes and Gordunni Outpost.",
        "tips": "Sungrass grows abundantly in the sunlit open clearings between ogre and gnoll camps."
      }
    ]
  },
  {
    "tierId": "herb_tier7",
    "tierName": "Tier 7: Golden Sansam, Dreamfoil, Mountain Silversage, Plaguebloom & Black Lotus (Skill 270–300)",
    "herbs": [
      "Golden Sansam",
      "Dreamfoil",
      "Mountain Silversage",
      "Plaguebloom",
      "Black Lotus"
    ],
    "routes": [
      {
        "id": "herb_epl",
        "name": "Eastern Plaguelands Cauldron & Noxious Loop",
        "faction": "Contested",
        "zone": "Eastern Plaguelands",
        "lapMinutes": "20–24 min",
        "direction": "Clockwise",
        "density": "Maximum (~26–36 nodes/lap)",
        "hostileLevel": "Lvl 54–60",
        "bestFor": "World #1 Plaguebloom & Black Lotus circuit",
        "waypoint": "/way Eastern Plaguelands 79.0 58.0",
        "description": "From Light's Hope Chapel, ride southwest to Lake Mereldar and Darrowshire, head north past Corin's Crossing and Blackwood Lake to Northpass Tower, and sweep east past Browman Mill and Noxious Glade back to Light's Hope.",
        "tips": "Black Lotus has 4 potential spawn points along this exact route; check Lake Mereldar and Corin's Crossing."
      },
      {
        "id": "herb_winterspring",
        "name": "Winterspring Frostsaber Rock & Kel'Theril",
        "faction": "Contested",
        "zone": "Winterspring",
        "lapMinutes": "18–22 min",
        "direction": "Counter-Clockwise",
        "density": "Very High (~22–30 nodes/lap)",
        "hostileLevel": "Lvl 55–60",
        "bestFor": "World #1 Mountain Silversage + Icecap circuit",
        "waypoint": "/way Winterspring 60.0 38.0",
        "description": "From Everlook, ride northwest past Starfall Village to Frostsaber Rock, curve south past Timbermaw Hold approach and Lake Kel'Theril, sweep through Mazthoril and Owl Wing Thicket, and return north via Winterfall Ridge.",
        "tips": "Mountain Silversage only spawns on the highest rocky summits; Icecap spawns across the northern snow plains."
      },
      {
        "id": "herb_ungoro",
        "name": "Un'Goro Crater Marsh & Perimeter Slopes",
        "faction": "Contested",
        "zone": "Un'Goro Crater",
        "lapMinutes": "18–21 min",
        "direction": "Clockwise",
        "density": "Very High (~22–28 nodes/lap)",
        "hostileLevel": "Lvl 50–55",
        "bestFor": "World #1 Dreamfoil & Golden Sansam density",
        "waypoint": "/way Un'Goro Crater 46.0 14.0",
        "description": "From Marshal's Stand, ride clockwise around the lush crater basin floor past the Lakkari Tar Pits, Screaming Reaches, Slithering Scar perimeter, Terror Run riverbed, and Golakka Hot Springs.",
        "tips": "Dreamfoil and Golden Sansam are everywhere in Un'Goro; avoid elite Devilsaurs while gathering."
      },
      {
        "id": "herb_wpl",
        "name": "Western Plaguelands Sorrow Hill & Farms",
        "faction": "Contested",
        "zone": "Western Plaguelands",
        "lapMinutes": "16–19 min",
        "direction": "Counter-Clockwise",
        "density": "High (~20–26 nodes/lap)",
        "hostileLevel": "Lvl 50–56",
        "bestFor": "Plaguebloom + Arthas' Tears + Corrupted Flora",
        "waypoint": "/way Western Plaguelands 43.0 84.0",
        "description": "From Chillwind Camp, ride northeast across Sorrow Hill and The Writhing Haunt to Gahrron's Withering, loop north to Northridge Lumber Camp, and sweep southwest through Dalson's Tears, Felstone Field, and Andorhal's western perimeter.",
        "tips": "Sorrow Hill and the four plagued farmsteads contain heavy Plaguebloom and Arthas' Tears spawns."
      }
    ]
  }
];

  let cachedBisMap = null;
  function buildBiSLookupMap() {
    if (cachedBisMap) return cachedBisMap;
    const map = new Map();
    const bisData = window.WOW_BIS_DATA || (typeof WOW_BIS_DATA !== 'undefined' ? WOW_BIS_DATA : null);
    if (!bisData || !bisData.classes) return map;

    for (const cls of bisData.classes) {
      const cData = bisData[cls.id];
      if (!cData) continue;
      for (const sp of cData.specs || []) {
        for (const slot of Object.keys(sp.gear || {})) {
          const list = Array.isArray(sp.gear[slot]) ? sp.gear[slot] : [sp.gear[slot]];
          for (const it of list) {
            if (!it || !it.name) continue;
            const key = it.name.toLowerCase().trim();
            if (!map.has(key)) {
              map.set(key, {
                name: it.name,
                classId: cls.id,
                className: cls.name,
                specId: sp.id,
                specName: sp.name,
                slot: slot,
                phase: it.phase || 'Phase 2',
                type: 'gear'
              });
            }
          }
        }
        for (const enc of sp.enchants || []) {
          if (!enc.source) continue;
          const m = enc.source.match(/^(?:Enchant\s+[^(\d]+|[\w\s'’-]+Armor Kit|[\w\s'’-]+Weightstone|[\w\s'’-]+Sharpening Stone)/i);
          const encName = m ? m[0].trim().toLowerCase() : '';
          if (encName && !map.has(encName)) {
            map.set(encName, {
              name: m[0].trim(),
              classId: cls.id,
              className: cls.name,
              specId: sp.id,
              specName: sp.name,
              type: 'enchant'
            });
          }
        }
        for (const con of sp.consumables || []) {
          if (!con || !con.name) continue;
          const key = con.name.toLowerCase().trim();
          if (!map.has(key)) {
            map.set(key, {
              name: con.name,
              classId: cls.id,
              className: cls.name,
              specId: sp.id,
              specName: sp.name,
              type: 'consumable'
            });
          }
        }
      }
    }
    cachedBisMap = map;
    return map;
  }

  function getBiSInfo(recipeName) {
    if (!recipeName) return null;
    const map = buildBiSLookupMap();
    return map.get(recipeName.toLowerCase().trim()) || null;
  }

  function isDungeonRecipe(r) {
    if (!r) return false;
    const s = (r.source || '').toLowerCase();
    const n = (r.name || '').toLowerCase();
    if (s.includes('dungeon') || s.includes('instance') || s.includes('boss')) return true;
    const dungeonKeywords = [
      'deadmines', 'shadowfang', 'wailing caverns', 'blackfathom', 'stockade',
      'gnomeregan', 'razorfen', 'scarlet monastery', 'graveyard', 'library', 'armory',
      'cathedral', 'uldaman', 'zul\'farrak', 'maraudon', 'sunken temple', 'atal\'hakkar',
      'blackrock depths', 'brd', 'lbrs', 'ubrs', 'stratholme', 'scholomance', 'dire maul',
      'city of dalaran', 'excavation site', 'ruins of lordaeron', 'hall of thanes',
      'molten core', 'onyxia', 'blackwing', 'zul\'gurub', 'ahn\'qiraj', 'naxxramas'
    ];
    return dungeonKeywords.some(d => s.includes(d) || n.includes(d));
  }

  function isBlueprintRecipe(r) {
    if (!r) return false;
    const s = (r.source || '').toLowerCase();
    const n = (r.name || '').toLowerCase();
    return n.startsWith('blueprint:') || s.includes('blueprint:') || s.includes('campfire station') || s.includes('camp blueprint');
  }

  function isDisenchantMaterial(name) {
    if (!name) return false;
    const n = name.toLowerCase().trim();
    const exact = [
      'strange dust', 'soul dust', 'vision dust', 'dream dust', 'illusion dust',
      'lesser magic essence', 'greater magic essence',
      'lesser astral essence', 'greater astral essence',
      'lesser mystic essence', 'greater mystic essence',
      'lesser nether essence', 'greater nether essence',
      'lesser eternal essence', 'greater eternal essence',
      'small glimmering shard', 'large glimmering shard',
      'small glowing shard', 'large glowing shard',
      'small radiant shard', 'large radiant shard',
      'small brilliant shard', 'large brilliant shard',
      'nexus crystal'
    ];
    return exact.includes(n) || n.endsWith(' dust') || n.endsWith(' essence') || n.endsWith(' shard') || n.endsWith(' crystal');
  }

  function formatWaypointsInHtml(htmlText, fallbackZone = '') {
    if (!htmlText || typeof htmlText !== 'string') return htmlText;
    return htmlText.replace(/(?:(\(\s*\/way\s+[^)]+\))|(\/way\s+(?:[-A-Za-z0-9\s,'’]+?\s+)?[\d.]+[,\s]+[\d.]+(?:\s*,\s*[A-Za-z]+)?))/g, (match, parenMatch, standaloneMatch, offset, fullStr) => {
      const raw = (parenMatch || standaloneMatch || '').replace(/^\(|\)$/g, '').trim();
      const m = raw.match(/\/way\s+(?:([-A-Za-z0-9\s,'’]+?)\s+)?([\d.]+)[,\s]+([\d.]+)(?:\s*,\s*([A-Za-z]+))?/);
      if (!m) return match;
      let zone = (m[1] || '').trim();
      const x = m[2];
      const y = m[3];
      const faction = m[4] || '';

      if (!zone) {
        const before = fullStr.slice(0, offset).trim();
        const allZoneMatches = [...before.matchAll(/(?:in|at)\s+([A-Za-z0-9\s,'’]+?)(?:\s*\(|\s*$)/gi)];
        if (allZoneMatches.length > 0) {
          zone = allZoneMatches[allZoneMatches.length - 1][1].trim();
        } else if (fallbackZone) {
          zone = fallbackZone.trim();
        }
      }

      const macroCmd = `/way ${zone ? zone + ' ' : ''}${x} ${y}`;
      const labelText = `/way ${zone ? zone + ' ' : ''}${x}, ${y}${faction ? ' (' + faction + ')' : ''}`;
      return `<button type="button" class="tomtom-way-btn" data-macro="${escapeHtml(macroCmd)}" title="Click to copy TomTom macro: ${escapeHtml(macroCmd)}">📍 <span>${escapeHtml(labelText)}</span></button>`;
    });
  }

  function parseHashRoute() {
    const raw = (window.location.hash || '').toLowerCase();
    if (!raw) return { profession: 'overview', subtab: 'recipes' };

    let cleaned = raw.replace(/^#+/, '');
    if (cleaned.startsWith('professions')) {
      cleaned = cleaned.replace(/^professions[/#]?/, '');
    }

    if (!cleaned || cleaned === 'overview') {
      return { profession: 'overview', subtab: 'recipes' };
    }

    // Replace '#' with '/' to treat formats like "alchemy#leveling" same as "alchemy/leveling"
    const parts = cleaned.replace(/#/g, '/').split('/').filter(Boolean);
    const slug = parts[0] || 'overview';
    const subtab = parts[1] || 'recipes';

    return { profession: slug, subtab };
  }

  function handleProfessionsHashRoute() {
    const route = parseHashRoute();
    if (route.profession === 'overview' || (window.WOW_PROFESSIONS_DATA && window.WOW_PROFESSIONS_DATA[route.profession])) {
      currentProfession = route.profession;
      currentSubTab = route.subtab;
      currentCategory = 'all';
      searchQuery = '';
      renderSelectorButtons();
      renderActiveProfession();
    }
  }

  function initProfessionsHub() {
    const container = document.getElementById('tab-professions');
    if (!container) return;

    if (!window.WOW_PROFESSIONS_DATA) {
      console.warn('WOW_PROFESSIONS_DATA not loaded yet.');
      return;
    }

    // Read URL hash on load
    const route = parseHashRoute();
    if (route.profession === 'overview' || window.WOW_PROFESSIONS_DATA[route.profession]) {
      currentProfession = route.profession;
      currentSubTab = route.subtab;
    } else {
      currentProfession = 'overview';
    }

    renderMasterLayout(container);

    // Live hash listener for seamless subtab/profession browsing
    window.addEventListener('hashchange', () => {
      const targetHash = (window.location.hash || '').toLowerCase();
      if (targetHash.includes('professions') || (window.WOW_PROFESSIONS_DATA && Object.keys(window.WOW_PROFESSIONS_DATA).some(k => targetHash.includes(k)))) {
        handleProfessionsHashRoute();
      }
    });
  }

  function renderMasterLayout(container) {
    let mount = document.getElementById('professions-interactive-mount');
    if (!mount) {
      mount = document.createElement('div');
      mount.id = 'professions-interactive-mount';
      mount.className = 'professions-interactive-hub';
      container.appendChild(mount);
    }

    mount.innerHTML = `
      <!-- Profession Selector Toolbar -->
      <div class="prof-selector-container">
        <div class="prof-selector-grid" id="prof-selector-buttons"></div>
      </div>

      <!-- Active Profession Viewport -->
      <div id="prof-viewport-container"></div>
    `;

    renderSelectorButtons();
    renderActiveProfession();
  }

  function renderSelectorButtons() {
    const grid = document.getElementById('prof-selector-buttons');
    if (!grid) return;

    const data = window.WOW_PROFESSIONS_DATA;
    const slugs = Object.keys(data);

    // Always include Overview button first
    let html = `
      <button type="button" class="prof-tile-btn ${currentProfession === 'overview' ? 'active' : ''}" data-slug="overview">
        <span style="font-size: 1.3rem; display: inline-flex; align-items: center; justify-content: center; height: 32px;">🌐</span>
        <span class="prof-tile-name">All Professions</span>
      </button>
    `;

    slugs.forEach(slug => {
      const p = data[slug];
      const isActive = slug === currentProfession;
      const isNewTrade = slug === 'camping';

      html += `
        <button type="button" class="prof-tile-btn ${isActive ? 'active' : ''}" data-slug="${slug}">
          ${isNewTrade ? '<span class="prof-tile-badge">NEW</span>' : ''}
          <img src="${getIconUrl(p.icon)}" alt="${escapeHtml(p.name)}" class="prof-tile-icon" loading="lazy" />
          <span class="prof-tile-name">${escapeHtml(p.name)}</span>
        </button>
      `;
    });

    grid.innerHTML = html;

    // Attach click events
    grid.querySelectorAll('.prof-tile-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const slug = btn.getAttribute('data-slug');
        if (slug !== currentProfession) {
          currentProfession = slug;
          currentCategory = 'all';
          searchQuery = '';
          grid.querySelectorAll('.prof-tile-btn').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          renderActiveProfession();

          const targetHash = slug === 'overview' ? '#professions' : `#professions/${slug}/${currentSubTab}`;
          if ((window.location.hash || '').toLowerCase() !== targetHash.toLowerCase()) {
            try {
              history.pushState({ tab: 'professions', profession: slug, subtab: currentSubTab }, '', targetHash);
            } catch {
              if (history.replaceState) history.replaceState(null, '', targetHash);
            }
          }
        }
      });
    });
  }

  function getAvailableSubTabs(prof) {
    const slug = currentProfession;
    const isCrafting = ['alchemy', 'blacksmithing', 'enchanting', 'engineering', 'leatherworking', 'tailoring', 'cooking', 'first-aid'].includes(slug);
    const isMining = slug === 'mining';
    const isHerbalism = slug === 'herbalism';
    const isSkinning = slug === 'skinning';
    const isFishing = slug === 'fishing';
    const isCamping = slug === 'camping';

    const tabs = [];

    if (isCrafting) {
      const count = prof.stats?.recipeCount || prof.recipes?.length || 0;
      tabs.push({ id: 'recipes', icon: '📜', label: `Recipes (${count})` });
      tabs.push({ id: 'leveling', icon: '📈', label: 'Leveling 1–300' });
      tabs.push({ id: 'shopping', icon: '🛒', label: 'Shopping List' });
      if (['engineering', 'blacksmithing', 'leatherworking'].includes(slug)) {
        tabs.push({ id: 'specs', icon: '⭐', label: 'Specializations' });
      }
      if (['tailoring', 'leatherworking'].includes(slug)) {
        tabs.push({ id: 'containers', icon: '🎒', label: slug === 'tailoring' ? 'Containers & Bags' : 'Quivers & Pouches' });
      }
      const favorCount = prof.stats?.favorRecipes || (prof.favor && prof.favor.recipes && prof.favor.recipes.length) || 0;
      if (favorCount > 0) {
        tabs.push({ id: 'favor', icon: '📦', label: `Merchant's Favor (${favorCount})` });
      }
      tabs.push({ id: 'camp', icon: '⛺', label: 'Camp & Perks' });
    } else if (isMining) {
      tabs.push({ id: 'leveling', icon: '📈', label: 'Leveling & Smelting Route' });
      if (prof.shopping?.groups?.length) {
        tabs.push({ id: 'shopping', icon: '🛒', label: 'Smelting Shopping List' });
      }
      tabs.push({ id: 'nodes', icon: '⛏️', label: `Mining Nodes & Routes (${prof.nodes?.length || 10})` });
      tabs.push({ id: 'recipes', icon: '🔥', label: `Smelting (${prof.recipes?.length || 14})` });
      tabs.push({ id: 'camp', icon: '⛺', label: 'Camp & Perks' });
    } else if (isHerbalism) {
      tabs.push({ id: 'leveling', icon: '📈', label: 'Leveling Route' });
      tabs.push({ id: 'nodes', icon: '🌿', label: `Herb Nodes & Routes (${prof.nodes?.length || 28})` });
      tabs.push({ id: 'camp', icon: '⛺', label: 'Camp & Perks' });
    } else if (isSkinning) {
      tabs.push({ id: 'leveling', icon: '📈', label: 'Skinning by Level' });
      tabs.push({ id: 'camp', icon: '⛺', label: 'Camp & Perks' });
    } else if (isFishing) {
      tabs.push({ id: 'waters', icon: '🌊', label: 'Waters & Schedule' });
      tabs.push({ id: 'lures', icon: '🪱', label: `Fishing Lures (${prof.fishingLures?.length || 14})` });
      tabs.push({ id: 'ranks', icon: '🎖️', label: `Ranks (${prof.ranks?.length || 8})` });
      tabs.push({ id: 'camp', icon: '⛺', label: 'Camp & Perks' });
    } else if (isCamping) {
      tabs.push({ id: 'guide', icon: '⛺', label: 'How It Works & Campfires' });
      tabs.push({ id: 'leveling', icon: '📈', label: 'Leveling 1–225' });
      tabs.push({ id: 'shopping', icon: '🛒', label: 'Shopping List' });
      tabs.push({ id: 'buffs', icon: '✨', label: 'Camp Buffs (11)' });
      tabs.push({ id: 'upgrades', icon: '🛠️', label: 'Upgrades (140 & 300)' });
      tabs.push({ id: 'perks', icon: '🏆', label: 'Legacy Perks & Rules' });
      tabs.push({ id: 'hub', icon: '🏕️', label: 'Wilderness Hub ›' });
    }

    return tabs;
  }

  function renderActiveProfession() {
    const viewport = document.getElementById('prof-viewport-container');
    if (!viewport) return;

    if (currentProfession === 'overview') {
      renderOverviewHub(viewport);
      return;
    }

    const prof = window.WOW_PROFESSIONS_DATA[currentProfession];
    if (!prof) {
      currentProfession = 'overview';
      renderOverviewHub(viewport);
      return;
    }

    const availableTabs = getAvailableSubTabs(prof);
    const validTabIds = availableTabs.map(t => t.id);
    if (!validTabIds.includes(currentSubTab)) {
      currentSubTab = availableTabs[0].id;
    }

    const passiveData = getProfessionPassive(prof.name || currentProfession);
    const combatBuffHtml = passiveData ? `
      <div class="prof-combat-buff-pill" title="Permanent Character Combat Passive granted by ${escapeHtml(prof.name)}">
        <span class="prof-buff-icon-badge">${passiveData.icon || '✨'}</span>
        <div class="prof-combat-buff-text">
          <span class="prof-buff-tag">✨ COMBAT PASSIVE</span>
          <strong>${escapeHtml(passiveData.passiveName)}:</strong> ${escapeHtml(passiveData.passiveEffect)}
        </div>
      </div>
    ` : '';

    const campBuffHtml = prof.campBuff ? `
      <div class="prof-camp-buff-pill" title="Wilderness Campfire Station Aura granted by ${escapeHtml(prof.name)}">
        <span class="prof-buff-icon-badge">⛺</span>
        <div class="prof-camp-buff-text">
          <span class="prof-buff-tag camp">🔥 CAMPFIRE AURA (${escapeHtml(prof.campBuff.name)})</span>
          <strong>Camp Skill ${prof.campBuff.skill}+:</strong> ${escapeHtml(prof.campBuff.effect)}
        </div>
      </div>
    ` : '';

    const isCamping = currentProfession === 'camping';
    const recipeCountDisplay = isCamping ? (prof.stats?.campfires || 3) : (prof.stats?.recipeCount || prof.recipes?.length || (prof.nodes ? prof.nodes.length : '1-300'));
    const recipeLabelDisplay = isCamping ? 'Campfires' : (prof.category === 'Gathering' ? 'Nodes' : 'Recipes');
    const newCountDisplay = isCamping ? (prof.stats?.campObjects || 35) : (prof.stats?.newInForever || (prof.category === 'Gathering' ? 'Phase 2' : 'New'));
    const newLabelDisplay = isCamping ? 'Camp Objects' : 'Forever Changes';
    const favorCountDisplay = isCamping ? (prof.stats?.legacyPerks || 3) : (prof.stats?.favorRecipes || (prof.campPerks?.milestones?.length ? 'Account' : '0'));
    const favorLabelDisplay = isCamping ? 'Legacy Perks' : 'Trade Rewards';

    viewport.innerHTML = `
      <!-- Hero Banner -->
      <div class="prof-hero-card">
        <div class="prof-hero-main">
          <img src="${getIconUrl(prof.icon)}" alt="${escapeHtml(prof.name)}" class="prof-hero-large-icon" />
          <div class="prof-hero-title">
            <h3>${escapeHtml(prof.name)} <span style="font-size: 0.9rem; font-weight: 500; color: #94a3b8;">(${escapeHtml(prof.category)})</span></h3>
            <p>${escapeHtml(prof.summary)}</p>
            ${prof.synergy ? `<div style="font-size: 0.82rem; color: #38bdf8; margin-top: 0.35rem; font-style: italic;">🔗 ${escapeHtml(prof.synergy)}</div>` : ''}
            <div class="prof-hero-buffs-container">
              ${combatBuffHtml}
              ${campBuffHtml}
            </div>
          </div>
        </div>
        <div class="prof-hero-stats">
          <div class="prof-stat-box">
            <div class="prof-stat-num">${recipeCountDisplay}</div>
            <div class="prof-stat-label">${recipeLabelDisplay}</div>
          </div>
          <div class="prof-stat-box">
            <div class="prof-stat-num" style="color: #38bdf8;">${newCountDisplay}</div>
            <div class="prof-stat-label">${newLabelDisplay}</div>
          </div>
          <div class="prof-stat-box">
            <div class="prof-stat-num" style="color: #4ade80;">${favorCountDisplay}</div>
            <div class="prof-stat-label">${favorLabelDisplay}</div>
          </div>
        </div>
      </div>

      <!-- Sub-Navigation Bar -->
      <nav class="prof-subnav-bar">
        ${availableTabs.map(t => `
          <button type="button" class="prof-subnav-btn ${currentSubTab === t.id ? 'active' : ''}" data-subtab="${t.id}">
            <span>${t.icon}</span> ${t.label}
          </button>
        `).join('')}
      </nav>

      <!-- Subtab Content Body -->
      <div id="prof-subtab-body"></div>
    `;

    // Subtab click handlers
    viewport.querySelectorAll('.prof-subnav-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const sub = btn.getAttribute('data-subtab');
        if (sub === 'hub') {
          const b = document.querySelector('.nav-tab-btn[data-tab="camping"]');
          if (b) b.click();
          window.location.hash = 'camping';
          return;
        }
        currentSubTab = sub;
        viewport.querySelectorAll('.prof-subnav-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderSubTabContent(prof);

        const targetHash = `#professions/${currentProfession}/${currentSubTab}`;
        if ((window.location.hash || '').toLowerCase() !== targetHash.toLowerCase()) {
          try {
            history.pushState({ tab: 'professions', profession: currentProfession, subtab: currentSubTab }, '', targetHash);
          } catch {
            if (history.replaceState) history.replaceState(null, '', targetHash);
          }
        }
      });
    });

    renderSubTabContent(prof);
  }

  function renderOverviewHub(container) {
    const data = window.WOW_PROFESSIONS_DATA || {};
    const allSlugs = Object.keys(data);
    const slugs = allSlugs.filter(s => s !== 'camping');

    const totalRecipes = allSlugs.reduce((acc, s) => acc + (data[s]?.recipes?.length || 0), 0);
    const totalNew = allSlugs.reduce((acc, s) => acc + (data[s]?.recipes?.filter(r => r.isNew)?.length || 0), 0);
    const totalFavor = allSlugs.reduce((acc, s) => acc + (data[s]?.favor?.recipes?.length || 0), 0);

    const matrixRows = [
      { slug: 'alchemy', name: 'Alchemy', icon: 'trade_alchemy', s20: 'Mana Well', s20Desc: '29 Mana every 5 sec to everyone sitting nearby', s20Icon: 'spell_arcane_manatap', s140: 'Fermenter', s140Desc: 'Makes certain Alchemy reagents, gives Mana Well buff', s140Icon: 'inv_alchemy_90_cauldron', s300: 'Alchemy Laboratory', s300Desc: 'Needed for advanced recipes, gives Mana Well buff', s300Icon: '10prof_portabletable_alchemy01' },
      { slug: 'blacksmithing', name: 'Blacksmithing', icon: 'trade_blacksmithing', s20: 'Sharpening Wheel', s20Desc: '34 Strength to everyone sitting nearby', s20Icon: 'inv_stone_grindingstone_01', s140: 'Anvil', s140Desc: 'An anvil at camp, gives Sharpening Wheel buff', s140Icon: 'trade_blacksmithing', s300: 'Master Forge', s300Desc: 'Needed for advanced recipes, gives Sharpening Wheel buff', s300Icon: 'inv_misc_firestone_01' },
      { slug: 'enchanting', name: 'Enchanting', icon: 'trade_engraving', s20: 'Enchanted Lute', s20Desc: '308 Armor, 13 to all stats and 22 to all resistances', s20Icon: 'inv_10_enchanting2_magicswirl_bronze', s140: 'Arcane Salvager', s140Desc: 'Disenchants more efficiently, gives Enchanted Lute buff', s140Icon: 'inv_misc_gem_sapphire_02', s300: 'Arcane Forge', s300Desc: 'Needed for advanced recipes, gives Enchanted Lute buff', s300Icon: 'inv_enchant_disenchant' },
      { slug: 'engineering', name: 'Engineering', icon: 'trade_engineering', s20: 'Reagent Bot', s20Desc: 'Sells reagents to everyone at camp', s20Icon: 'inv_misc_enggizmos_13', s140: 'Repair Bot', s140Desc: 'Sells reagents and repairs gear', s140Icon: 'inv_gizmo_01', s300: "Anarchist's Workbench", s300Desc: 'Needed for the most advanced Engineering recipes', s300Icon: 'inv_misc_bomb_02' },
      { slug: 'leatherworking', name: 'Leatherworking', icon: 'trade_leatherworking', s20: 'Camp Tent', s20Desc: 'Rested experience up to 5% of a level', s20Icon: 'inv_misc_leatherscrap_01', s140: 'Tanning Rack', s140Desc: 'Makes certain Leatherworking reagents, gives Camp Tent bonus', s140Icon: 'inv_misc_pelt_wolf_ruin_03', s300: 'Sewing Machine', s300Desc: 'Needed for advanced recipes, gives Camp Tent bonus', s300Icon: 'inv_misc_monsterscales_11' },
      { slug: 'tailoring', name: 'Tailoring', icon: 'trade_tailoring', s20: 'Faction Banner', s20Desc: '32 Spirit to everyone of your faction sitting nearby', s20Icon: 'inv_banner_03', s140: 'Spinning Wheel', s140Desc: 'Makes certain Tailoring reagents, gives Faction Banner buff', s140Icon: 'inv_fabric_linen_01', s300: 'Loom', s300Desc: 'Needed for advanced recipes, gives Faction Banner buff', s300Icon: 'inv_fabric_mageweave_01' },
      { slug: 'mining', name: 'Mining', icon: 'trade_mining', s20: 'Lodestone', s20Desc: '90 melee Attack Power to everyone sitting nearby', s20Icon: 'inv_misc_rune_06', s140: 'Rock Garden', s140Desc: 'Spawns a common mining node over time, gives Lodestone buff', s140Icon: 'inv_ore_iron_01', s300: 'Molten Foundry', s300Desc: 'Needed for recipes that require it, gives Lodestone buff', s300Icon: 'inv_ore_thorium_02' },
      { slug: 'herbalism', name: 'Herbalism', icon: 'trade_herbalism', s20: 'Incense Candle', s20Desc: '25 Intellect to everyone sitting nearby', s20Icon: 'inv_misc_candle_02', s140: 'Greenhouse', s140Desc: 'Grows herbs over time from planted seeds, gives Incense Candle buff', s140Icon: 'inv_misc_flower_02', s300: 'Seed Hybridizer', s300Desc: 'Multiplies seeds or combines them into rarer tiers, gives Incense Candle buff', s300Icon: 'inv_misc_herb_sansamroot' },
      { slug: 'skinning', name: 'Skinning', icon: 'inv_misc_pelt_wolf_01', s20: 'Camp Chair', s20Desc: '2% critical strike chance with spells and attacks', s20Icon: 'inv_crate_01', s140: 'Field Guide', s140Desc: 'Grants Track Beasts to whoever reads it, gives Camp Chair buff', s140Icon: 'inv_misc_book_03', s300: "Trapper's Workbench", s300Desc: 'Holds one trap, gives Camp Chair buff', s300Icon: 'inv_misc_monsterscales_08' },
      { slug: 'cooking', name: 'Cooking', icon: 'inv_misc_food_15', s20: 'Basic Campfire Kit', s20Desc: 'A campfire for cooking, with room for 3 camp objects', s20Icon: 'inv_camelot_camping_welcomingcampfire', s140: "Cookie's Feast", s140Desc: 'Stamina food for everyone at camp', s140Icon: 'inv_misc_food_54', s300: 'Iron Oven', s300Desc: 'Needed for the most advanced Cooking recipes', s300Icon: 'inv_misc_food_11' },
      { slug: 'fishing', name: 'Fishing', icon: 'trade_fishing', s20: 'Fish Bowl', s20Desc: '8% to all stats for everyone sitting nearby', s20Icon: 'inv_magicalfishpet', s140: 'Fishing Rack', s140Desc: 'Uncommon fish for 1 hr and Fishing Skill lures, gives Fish Bowl buff', s140Icon: 'inv_10_fishing_bait_color1', s300: 'Fishing Hut', s300Desc: 'Rare fish for 1 hr and Fishing Skill lures, gives Fish Bowl buff', s300Icon: 'inv_helm_armor_buckledhat_b_01_black' },
      { slug: 'first-aid', name: 'First Aid', icon: 'spell_holy_sealofsacrifice', s20: 'First Aid Kit', s20Desc: '56 Stamina to everyone sitting nearby', s20Icon: 'inv_misc_bandage_11', s140: 'Toxin Study', s140Desc: 'Holds healing potions and anti-venom, gives First Aid Kit buff', s140Icon: 'inv_potion_19', s300: "Plague Doctor's Laboratory", s300Desc: 'Holds healing potions and poultices, gives First Aid Kit buff', s300Icon: 'inv_misc_bandage_15' }
    ];

    container.innerHTML = `
      <div class="prof-overview-container">
        <!-- Hero Header -->
        <div class="prof-overview-hero">
          <div class="prof-overview-title">
            <h3>Professions & Trade Economy in WoW Forever</h3>
            <p>Professions level from 1 to 300 with rich Classic progression, expanded with open-world utility: tradeskills add 1-hour party auras to shared campfires, supply crates unlock exclusive recipes at trade camps, and hundreds of items are brand new.</p>
          </div>
          <div class="prof-overview-stats">
            <div class="prof-overview-stat-card">
              <div class="stat-val">${totalRecipes.toLocaleString()}</div>
              <div class="stat-lbl">Total Recipes</div>
            </div>
            <div class="prof-overview-stat-card">
              <div class="stat-val" style="color: #38bdf8;">${totalNew}</div>
              <div class="stat-lbl">New in Forever</div>
            </div>
            <div class="prof-overview-stat-card">
              <div class="stat-val" style="color: #4ade80;">${totalFavor}</div>
              <div class="stat-lbl">Merchant's Favor</div>
            </div>
          </div>
        </div>

        <!-- 4 Core Innovation Pillars -->
        <div class="prof-pillars-grid">
          <div class="prof-pillar-card">
            <div class="prof-pillar-head">
              <span class="prof-pillar-icon">⛺</span>
              <h4>The Campfire System</h4>
            </div>
            <p>A campfire gives vendors, repairs, workspaces and 1-hour aura buffs to players sitting by it. Cooks build it, and each profession adds its own objects.</p>
          </div>
          <div class="prof-pillar-card">
            <div class="prof-pillar-head">
              <span class="prof-pillar-icon">📦</span>
              <h4>Merchant's Favor</h4>
            </div>
            <p>Fill supply crates found across Azeroth and hand them in at faction trade outposts. 317 exclusive recipes are sold across seven trades.</p>
          </div>
          <div class="prof-pillar-card">
            <div class="prof-pillar-head">
              <span class="prof-pillar-icon">🏆</span>
              <h4>Legacy Points & Perks</h4>
            </div>
            <p>Crafting professions award 1 Legacy point at skill 150, 225, and 300, once per account. 11 perks enhance skill-ups, gathering, crates, and camps.</p>
          </div>
          <div class="prof-pillar-card">
            <div class="prof-pillar-head">
              <span class="prof-pillar-icon">🍖</span>
              <h4>Experience Food Buffs</h4>
            </div>
            <p>While Well Fed with Forever cooking meals, your character gains +5% more experience from monster kills, stacking with rest bonuses.</p>
          </div>
        </div>

        <!-- All Professions Directory Grid -->
        <div class="section-heading-bar" style="margin-top: 1rem;">
          <div>
            <h2><span>🔨</span> Explore Every Profession (13)</h2>
            <p class="section-subtext">Click any trade to explore its recipe catalog, 1–300 leveling roadmap, reagent shopping list, and Merchant's Favor turn-ins</p>
          </div>
        </div>

        <div class="prof-overview-grid">
          ${slugs.map(slug => {
            const p = data[slug];
            const recipeCount = p.stats?.recipeCount || p.recipes?.length || (p.nodes ? p.nodes.length : '1-300');
            const newCount = p.stats?.newInForever || (p.category === 'Gathering' ? 'Phase 2' : 'New');
            const favorCount = p.stats?.favorRecipes || (p.campPerks?.milestones?.length ? 'Account' : '0');
            const cardPassive = getProfessionPassive(p.name || slug);
            return `
              <div class="prof-directory-card" data-slug="${slug}">
                <div>
                  <div class="prof-dir-head">
                    <img src="${getIconUrl(p.icon)}" alt="${escapeHtml(p.name)}" class="prof-dir-icon" loading="lazy" />
                    <div class="prof-dir-title-box">
                      <h4>
                        ${escapeHtml(p.name)}
                        <span class="prof-dir-cat-badge">${escapeHtml(p.category)}</span>
                      </h4>
                      <p class="prof-dir-summary">${escapeHtml(p.summary)}</p>
                      ${p.synergy ? `<div class="prof-dir-synergy">${escapeHtml(p.synergy)}</div>` : ''}
                    </div>
                  </div>

                  ${cardPassive ? `
                    <div class="prof-dir-passive-box" style="margin-top: 0.75rem;" title="${escapeHtml(cardPassive.passiveEffect)}">
                      <span style="font-size: 1.15rem; flex-shrink: 0;">${cardPassive.icon || '✨'}</span>
                      <div>
                        <strong style="color: #34d399; font-size: 0.8rem;">✨ ${escapeHtml(cardPassive.passiveName)}:</strong>
                        <span style="color: #cbd5e1; font-size: 0.76rem; display: block; line-height: 1.35; margin-top: 0.1rem;">${escapeHtml(cardPassive.passiveEffect)}</span>
                      </div>
                    </div>
                  ` : ''}

                  ${p.campBuff ? `
                    <div class="prof-dir-camp-box" style="margin-top: 0.65rem;">
                      <img src="${getIconUrl(p.campBuff.icon)}" alt="${escapeHtml(p.campBuff.name)}" loading="lazy" />
                      <div>
                        <strong>${escapeHtml(p.campBuff.name)} (Skill ${p.campBuff.skill}+):</strong> ${escapeHtml(p.campBuff.effect)}
                      </div>
                    </div>
                  ` : ''}
                </div>

                <div class="prof-dir-footer">
                  <div class="prof-dir-metrics">
                    <strong>${recipeCount}</strong> ${p.category === 'Gathering' ? 'Nodes' : 'Recipes'} · <span style="color:#38bdf8;">${newCount} New</span> · <span style="color:var(--text-gold,#facc15);">${favorCount} Favor</span>
                  </div>
                  <button type="button" class="prof-dir-explore-btn" data-slug="${slug}">
                    Explore ${escapeHtml(p.name)} ›
                  </button>
                </div>
              </div>
            `;
          }).join('')}
        </div>

        <!-- Master Camp Station Matrix Table -->
        <div class="section-heading-bar" style="margin-top: 1.5rem;">
          <div>
            <h2><span>⛺</span> Campfire Profession Station Matrix (Skill 20 / 140 / 300)</h2>
            <p class="section-subtext">Every profession constructs camp stations around shared campfires, providing party-wide buffs mirroring class blessings at 80% potency</p>
          </div>
        </div>

        <div class="prof-matrix-table-wrap">
          <table class="prof-matrix-table">
            <thead>
              <tr>
                <th style="width: 170px;">Profession</th>
                <th style="width: 220px;">Combat Passive</th>
                <th>Skill 20 Station (Party Buff)</th>
                <th>Skill 140 Station</th>
                <th>Skill 300 Master Station</th>
              </tr>
            </thead>
            <tbody>
              ${matrixRows.map(r => {
                const pass = getProfessionPassive(r.name || r.slug);
                return `
                <tr>
                  <td>
                    <div class="matrix-prof-col" data-slug="${r.slug}" title="View ${r.name}">
                      <img src="${getIconUrl(r.icon)}" alt="${r.name}" loading="lazy" />
                      <span>${r.name}</span>
                    </div>
                  </td>
                  <td>
                    ${pass ? `
                      <strong style="color: #34d399; font-size: 0.85rem; display: block;">✨ ${escapeHtml(pass.passiveName)}</strong>
                      <span style="font-size: 0.76rem; color: #cbd5e1; line-height: 1.35; display: block; margin-top: 0.15rem;">${escapeHtml(pass.passiveEffect)}</span>
                    ` : '<span style="color: var(--text-muted); font-size: 0.8rem;">—</span>'}
                  </td>
                  <td>
                    <div class="matrix-station-cell" title="${escapeHtml(r.s20Desc)}">
                      <img src="${getIconUrl(r.s20Icon)}" alt="${r.s20}" loading="lazy" />
                      <div>
                        <strong>${r.s20}</strong>
                        <small>· ${r.s20Desc}</small>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div class="matrix-station-cell" title="${escapeHtml(r.s140Desc)}">
                      <img src="${getIconUrl(r.s140Icon)}" alt="${r.s140}" loading="lazy" />
                      <div>
                        <strong>${r.s140}</strong>
                        <small>· ${r.s140Desc}</small>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div class="matrix-station-cell" title="${escapeHtml(r.s300Desc)}">
                      <img src="${getIconUrl(r.s300Icon)}" alt="${r.s300}" loading="lazy" />
                      <div>
                        <strong>${r.s300}</strong>
                        <small>· ${r.s300Desc}</small>
                      </div>
                    </div>
                  </td>
                </tr>
              `;
              }).join('')}
            </tbody>
          </table>
        </div>

        ${renderRolePairingWizard()}

        ${renderMasterTrainerDirectory()}
      </div>
    `;

    // Role pairing wizard listeners
    container.querySelectorAll('.pairing-role-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        activeRolePairing = chip.getAttribute('data-role-id');
        container.querySelectorAll('.pairing-role-chip').forEach(c => {
          c.classList.toggle('active', c.getAttribute('data-role-id') === activeRolePairing);
        });
        const detailsMount = container.querySelector('.pairing-details-card');
        if (detailsMount) {
          const activePair = PAIRING_WIZARD_DATA.find(p => p.roleId === activeRolePairing) || PAIRING_WIZARD_DATA[0];
          detailsMount.outerHTML = renderPairingDetailsCard(activePair);
        }
      });
    });

    // Trainer directory filter listeners
    const trSearch = container.querySelector('#trainer-search-input');
    if (trSearch) {
      trSearch.addEventListener('input', debounce((e) => {
        trainerSearchQuery = e.target.value.trim();
        updateTrainerGrid(container);
      }, 150));
    }

    const trProf = container.querySelector('#trainer-prof-select');
    if (trProf) {
      trProf.addEventListener('change', (e) => {
        trainerProfFilter = e.target.value;
        updateTrainerGrid(container);
      });
    }

    const trFac = container.querySelector('#trainer-faction-select');
    if (trFac) {
      trFac.addEventListener('change', (e) => {
        trainerFactionFilter = e.target.value;
        updateTrainerGrid(container);
      });
    }

    const trRank = container.querySelector('#trainer-rank-select');
    if (trRank) {
      trRank.addEventListener('change', (e) => {
        trainerRankFilter = e.target.value;
        updateTrainerGrid(container);
      });
    }

    const trZone = container.querySelector('#trainer-zone-select');
    if (trZone) {
      trZone.addEventListener('change', (e) => {
        trainerZoneFilter = e.target.value;
        updateTrainerGrid(container);
      });
    }

    // Click handlers for cards and table rows
    container.querySelectorAll('.prof-dir-explore-btn, .prof-directory-card, .matrix-prof-col').forEach(el => {
      el.addEventListener('click', () => {
        const slug = el.getAttribute('data-slug');
        if (slug && data[slug]) {
          currentProfession = slug;
          currentCategory = 'all';
          searchQuery = '';
          const grid = document.getElementById('prof-selector-buttons');
          if (grid) {
            grid.querySelectorAll('.prof-tile-btn').forEach(b => {
              b.classList.toggle('active', b.getAttribute('data-slug') === slug);
            });
          }
          renderActiveProfession();
          const targetHash = `#professions/${slug}/${currentSubTab}`;
          if ((window.location.hash || '').toLowerCase() !== targetHash.toLowerCase()) {
            try {
              history.pushState({ tab: 'professions', profession: slug, subtab: currentSubTab }, '', targetHash);
            } catch {
              if (history.replaceState) history.replaceState(null, '', targetHash);
            }
          }
          window.scrollTo({ top: container.offsetTop - 80, behavior: 'smooth' });
        }
      });
    });

    attachTooltipListeners(container, null);
  }

  function renderSubTabContent(prof) {
    const body = document.getElementById('prof-subtab-body');
    if (!body) return;

    if (prof.slug === 'camping') {
      renderCampingProfessionTab(body, prof);
      return;
    }

    if (currentSubTab === 'recipes') {
      renderRecipesTab(body, prof);
    } else if (currentSubTab === 'leveling') {
      renderLevelingTab(body, prof);
    } else if (currentSubTab === 'shopping') {
      renderShoppingTab(body, prof);
    } else if (currentSubTab === 'specs') {
      renderSpecializationsTab(body, prof);
    } else if (currentSubTab === 'containers') {
      renderContainersTab(body, prof);
    } else if (currentSubTab === 'favor') {
      renderFavorTab(body, prof);
    } else if (currentSubTab === 'camp') {
      renderCampPerksTab(body, prof);
    } else if (currentSubTab === 'nodes') {
      renderNodesTab(body, prof);
    } else if (currentSubTab === 'waters') {
      renderFishingWatersTab(body, prof);
    } else if (currentSubTab === 'lures') {
      renderFishingLuresTab(body, prof);
    } else if (currentSubTab === 'ranks') {
      renderFishingRanksTab(body, prof);
    }
  }

  function debounce(fn, delay) {
    let timer = null;
    return function (...args) {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => fn.apply(this, args), delay);
    };
  }

  /* ==========================================================================
     SUBTAB 1: RECIPES BROWSER
     ========================================================================== */
  function updateRecipeGrid(container, prof) {
    const grid = container.querySelector('.recipe-grid');
    if (!grid) return;

    const filtered = (prof.recipes || []).filter(r => {
      if (currentCategory !== 'all' && r.cat !== currentCategory) {
        return false;
      }
      if (filterNewOnly && !r.isNew) {
        return false;
      }
      if (filterBetaCap && r.learn > 225) {
        return false;
      }
      if (filterDungeonOnly && !isDungeonRecipe(r)) {
        return false;
      }
      if (filterBlueprintOnly && !isBlueprintRecipe(r)) {
        return false;
      }
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const matchesName = r.name && r.name.toLowerCase().includes(q);
        const matchesEffect = r.effect && r.effect.toLowerCase().includes(q);
        const matchesReagents = r.reagents && r.reagents.some(m => m.name && m.name.toLowerCase().includes(q));
        const matchesSource = r.source && r.source.toLowerCase().includes(q);
        if (!matchesName && !matchesEffect && !matchesReagents && !matchesSource) {
          return false;
        }
      }
      return true;
    });

    if (filtered.length === 0) {
      grid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 3rem; color: #94a3b8; background: rgba(15,23,42,0.5); border-radius: 8px;">
          No recipes found matching your search and filter criteria.
        </div>
      `;
    } else {
      grid.innerHTML = filtered.map(r => renderRecipeCard(r)).join('');
    }

    container.querySelectorAll('.prof-cat-chip').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-cat') === currentCategory);
    });

    const newToggle = container.querySelector('#prof-new-toggle');
    if (newToggle) {
      newToggle.classList.toggle('active', filterNewOnly);
    }

    const betaToggle = container.querySelector('#prof-beta-cap-toggle');
    if (betaToggle) {
      betaToggle.classList.toggle('active', filterBetaCap);
    }

    const dungeonToggle = container.querySelector('#prof-dungeon-toggle');
    if (dungeonToggle) {
      dungeonToggle.classList.toggle('active', filterDungeonOnly);
    }

    const blueprintToggle = container.querySelector('#prof-blueprint-toggle');
    if (blueprintToggle) {
      blueprintToggle.classList.toggle('active', filterBlueprintOnly);
    }

    container.querySelectorAll('.prof-preset-btn').forEach(btn => {
      const s = parseInt(btn.getAttribute('data-skill'), 10);
      btn.classList.toggle('active', playerSkill === s);
    });

    attachTooltipListeners(grid, prof);
  }

  function renderRecipesTab(container, prof) {
    const groups = prof.groups || [];

    container.innerHTML = `
      <!-- Toolbar -->
      <div class="prof-toolbar">
        <div style="display: flex; gap: 0.75rem; align-items: center; flex-wrap: wrap;">
          <div class="prof-search-wrap">
            <input type="text" id="prof-search-input" aria-label="Search recipes, reagents, or zones" class="prof-search-input" placeholder="Search recipe, reagent, drop zone..." value="${escapeHtml(searchQuery)}" />
            ${searchQuery ? '<button type="button" class="prof-search-clear-btn" id="prof-search-clear" aria-label="Clear search" title="Clear search">✕</button>' : ''}
          </div>
          <button type="button" id="prof-new-toggle" class="filter-chip ${filterNewOnly ? 'active' : ''}">
            <span>✨</span> New in Forever Only
          </button>
          <button type="button" id="prof-beta-cap-toggle" class="filter-chip ${filterBetaCap ? 'active' : ''}" title="Filter to recipes learnable within Phase 2 beta level cap (Skill 1–225)">
            <span>🔒</span> Beta Cap (≤225)
          </button>
          <button type="button" id="prof-dungeon-toggle" class="filter-chip ${filterDungeonOnly ? 'active' : ''}" title="Filter to recipes dropped in dungeons or by instance bosses">
            <span>🏰</span> Dungeon Drops Only
          </button>
          <button type="button" id="prof-blueprint-toggle" class="filter-chip ${filterBlueprintOnly ? 'active' : ''}" title="Filter to campfire station blueprints">
            <span>⛺</span> Camp Blueprints Only
          </button>
        </div>
        <div class="prof-skill-calc">
          <span class="prof-skill-calc-label">Skill Simulator:</span>
          <div class="prof-skill-presets">
            <button type="button" class="prof-preset-btn ${playerSkill === 75 ? 'active' : ''}" data-skill="75" title="Apprentice Skill Cap (75)">75</button>
            <button type="button" class="prof-preset-btn ${playerSkill === 150 ? 'active' : ''}" data-skill="150" title="Journeyman Skill Cap (150)">150</button>
            <button type="button" class="prof-preset-btn ${playerSkill === 225 ? 'active' : ''}" data-skill="225" title="Beta Phase 2 Cap (225)">225</button>
            <button type="button" class="prof-preset-btn ${playerSkill === 300 ? 'active' : ''}" data-skill="300" title="Artisan Mastery (300)">300</button>
          </div>
          <input type="number" id="prof-skill-input" aria-label="Custom skill level simulator" class="prof-skill-input" min="1" max="300" placeholder="Custom" value="${playerSkill !== null ? playerSkill : ''}" />
        </div>
      </div>

      <!-- Category Filter Chips -->
      <div class="prof-category-chips" id="prof-category-chips">
        <button type="button" class="prof-cat-chip ${currentCategory === 'all' ? 'active' : ''}" data-cat="all">
          All Categories (${(prof.recipes || []).length})
        </button>
        ${groups.map(g => `
          <button type="button" class="prof-cat-chip ${currentCategory === g.key ? 'active' : ''}" data-cat="${g.key}">
            <img src="${getIconUrl(g.icon)}" alt="${escapeHtml(g.label)}" />
            ${escapeHtml(g.label)} (${g.count})
          </button>
        `).join('')}
      </div>

      <!-- Recipes Grid -->
      <div class="recipe-grid"></div>
    `;

    updateRecipeGrid(container, prof);

    const clearSearchInp = () => {
      searchQuery = '';
      const inp = container.querySelector('#prof-search-input');
      if (inp) inp.value = '';
      const clearBtn = container.querySelector('#prof-search-clear');
      if (clearBtn) clearBtn.remove();
    };

    const attachClearBtnListener = () => {
      const clearBtn = container.querySelector('#prof-search-clear');
      if (clearBtn) {
        clearBtn.onclick = () => {
          clearSearchInp();
          updateRecipeGrid(container, prof);
        };
      }
    };
    attachClearBtnListener();

    const searchInput = container.querySelector('#prof-search-input');
    if (searchInput) {
      searchInput.addEventListener('input', debounce((e) => {
        searchQuery = e.target.value.trim();
        const wrap = container.querySelector('.prof-search-wrap');
        let clearBtn = container.querySelector('#prof-search-clear');
        if (searchQuery && !clearBtn && wrap) {
          clearBtn = document.createElement('button');
          clearBtn.type = 'button';
          clearBtn.className = 'prof-search-clear-btn';
          clearBtn.id = 'prof-search-clear';
          clearBtn.setAttribute('aria-label', 'Clear search');
          clearBtn.setAttribute('title', 'Clear search');
          clearBtn.textContent = '✕';
          wrap.appendChild(clearBtn);
          attachClearBtnListener();
        } else if (!searchQuery && clearBtn) {
          clearBtn.remove();
        }
        updateRecipeGrid(container, prof);
      }, 120));
    }

    const newToggle = container.querySelector('#prof-new-toggle');
    if (newToggle) {
      newToggle.addEventListener('click', () => {
        filterNewOnly = !filterNewOnly;
        updateRecipeGrid(container, prof);
      });
    }

    const betaToggle = container.querySelector('#prof-beta-cap-toggle');
    if (betaToggle) {
      betaToggle.addEventListener('click', () => {
        filterBetaCap = !filterBetaCap;
        updateRecipeGrid(container, prof);
      });
    }

    const dungeonToggle = container.querySelector('#prof-dungeon-toggle');
    if (dungeonToggle) {
      dungeonToggle.addEventListener('click', () => {
        filterDungeonOnly = !filterDungeonOnly;
        updateRecipeGrid(container, prof);
      });
    }

    const blueprintToggle = container.querySelector('#prof-blueprint-toggle');
    if (blueprintToggle) {
      blueprintToggle.addEventListener('click', () => {
        filterBlueprintOnly = !filterBlueprintOnly;
        updateRecipeGrid(container, prof);
      });
    }

    const skillInput = container.querySelector('#prof-skill-input');
    if (skillInput) {
      skillInput.addEventListener('input', debounce((e) => {
        const val = parseInt(e.target.value, 10);
        playerSkill = !isNaN(val) ? val : null;
        updateRecipeGrid(container, prof);
      }, 120));
    }

    container.querySelectorAll('.prof-preset-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const s = parseInt(btn.getAttribute('data-skill'), 10);
        playerSkill = playerSkill === s ? null : s;
        const skillInp = container.querySelector('#prof-skill-input');
        if (skillInp) skillInp.value = playerSkill !== null ? playerSkill : '';
        updateRecipeGrid(container, prof);
      });
    });

    container.querySelectorAll('.prof-cat-chip').forEach(btn => {
      btn.addEventListener('click', () => {
        const targetCat = btn.getAttribute('data-cat') || 'all';

        // Intuitive toggling and collision clearing
        if (targetCat.toLowerCase() === currentCategory.toLowerCase()) {
          if (searchQuery) {
            clearSearchInp();
          } else if (targetCat.toLowerCase() !== 'all') {
            currentCategory = 'all';
            updateRecipeGrid(container, prof);
            return;
          }
        } else if (targetCat.toLowerCase() === 'all') {
          if (searchQuery) {
            clearSearchInp();
          }
          currentCategory = 'all';
        } else {
          // Specific category clicked: check if active searchQuery yields 0 matches in this category
          if (searchQuery) {
            const q = searchQuery.toLowerCase();
            const hasMatch = (prof.recipes || []).some(r => {
              if ((r.cat || '').toLowerCase() !== targetCat.toLowerCase()) return false;
              if (filterNewOnly && !r.isNew) return false;
              if (filterBetaCap && r.learn > 225) return false;
              if (filterDungeonOnly && !isDungeonRecipe(r)) return false;
              if (filterBlueprintOnly && !isBlueprintRecipe(r)) return false;
              const matchesName = r.name && r.name.toLowerCase().includes(q);
              const matchesEffect = r.effect && r.effect.toLowerCase().includes(q);
              const matchesReagents = r.reagents && r.reagents.some(m => m.name && m.name.toLowerCase().includes(q));
              const matchesSource = r.source && r.source.toLowerCase().includes(q);
              return matchesName || matchesEffect || matchesReagents || matchesSource;
            });
            if (!hasMatch) {
              // Automatically clear the conflicting search query so all recipes in that category immediately display
              clearSearchInp();
            }
          }
          currentCategory = targetCat;
        }

        updateRecipeGrid(container, prof);
      });
    });
  }

  function renderRecipeCard(r) {
    const qualityClass = `q${r.quality || 1}`;
    const skillClass = getSkillClass(r, playerSkill);
    const skillDisplay = playerSkill !== null ? `Skill ${r.learn} (${skillClass.replace('skill-', '')})` : `Skill ${r.learn}`;
    const cardId = r.id ? `recipe-${r.id}` : `recipe-${(r.name || '').toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;

    const reagentsHtml = (r.reagents || []).map(mat => `
      <span class="reagent-chip" title="${escapeHtml(mat.name)}" data-item-id="${mat.id || ''}" data-item-name="${escapeHtml(mat.name)}">
        <img src="${getIconUrl(mat.icon)}" alt="${escapeHtml(mat.name)}" loading="lazy" />
        <span class="reagent-count">${mat.count}x</span>
        <span class="q${mat.quality || 1}">${escapeHtml(mat.name)}</span>
      </span>
    `).join('');

    // Quick source CTA actions for reagents (e.g. fishing waters or farming mob drops)
    const quickSources = [];
    const farmableReagents = (r.reagents || []).map(mat => {
      const src = resolveReagentSource(mat.name, mat.id);
      return { mat, src };
    }).filter(item => item.src && (item.src.fishedIn?.length || item.src.drops?.length));

    farmableReagents.forEach(({ mat, src }) => {
      const isMulti = farmableReagents.length > 1;
      const cleanReagentName = mat.name.replace(/^\d+x\s*/i, '').trim();

      if (src.primaryType === 'fished' && src.fishedIn && src.fishedIn.length > 0) {
        const fishLabel = isMulti
          ? `Click here to see where to fish ${escapeHtml(cleanReagentName)} (${src.fishedIn.length} Waters)`
          : `Click here to see where to fish this (${src.fishedIn.length} Waters)`;
        quickSources.push(`
          <button type="button" class="recipe-reagent-cta-btn fishing" data-reagent-name="${escapeHtml(mat.name)}" data-reagent-id="${mat.id || ''}" data-reagent-tab="fishing" title="Click here to see where to fish ${escapeHtml(cleanReagentName)}">
            <span class="cta-icon">🎣</span> ${fishLabel}
          </button>
        `);
        if (src.drops && src.drops.length > 0) {
          const mobCount = src.totalDropMobs || src.drops.length;
          const dropLabel = isMulti
            ? `Farm ${escapeHtml(cleanReagentName)} drops (${mobCount} Mobs)`
            : `Farm from drops (${mobCount} Mobs)`;
          quickSources.push(`
            <button type="button" class="recipe-reagent-cta-btn drops secondary" data-reagent-name="${escapeHtml(mat.name)}" data-reagent-id="${mat.id || ''}" data-reagent-tab="drops" title="Click here to see which mobs drop ${escapeHtml(cleanReagentName)}">
              <span class="cta-icon">⚔️</span> ${dropLabel}
            </button>
          `);
        }
      } else if (src.drops && src.drops.length > 0 && farmableReagents.length <= 3) {
        const mobCount = src.totalDropMobs || src.drops.length;
        const dropLabel = isMulti
          ? `Farm ${escapeHtml(cleanReagentName)} (${mobCount} Mobs)`
          : `Farm from drops (${mobCount} Mobs)`;
        quickSources.push(`
          <button type="button" class="recipe-reagent-cta-btn drops" data-reagent-name="${escapeHtml(mat.name)}" data-reagent-id="${mat.id || ''}" data-reagent-tab="drops" title="Click here to see which mobs drop ${escapeHtml(cleanReagentName)}">
            <span class="cta-icon">${src.ctaIcon || '🍖'}</span> ${dropLabel}
          </button>
        `);
      }
    });

    return `
      <div class="recipe-card" id="${cardId}" data-recipe-id="${r.id || ''}" data-recipe-name="${escapeHtml(r.name || '')}">
        <div>
          <div class="recipe-card-header">
            <img src="${getIconUrl(r.icon, r.name, r.source)}" alt="${escapeHtml(r.name)}" class="recipe-item-icon ${qualityClass}" data-recipe-name="${escapeHtml(r.name)}" style="cursor: pointer;" loading="lazy" />
            <div class="recipe-info">
              <h4 class="recipe-title ${qualityClass}" data-recipe-name="${escapeHtml(r.name)}" style="cursor: pointer;">
                ${escapeHtml(r.name)}
                ${r.isNew ? '<span class="recipe-new-tag">New</span>' : ''}
                ${(() => {
                  const bisMatch = getBiSInfo(r.name);
                  if (!bisMatch) return '';
                  return `<button type="button" class="recipe-bis-badge" data-class="${bisMatch.classId}" data-spec="${bisMatch.specId}" title="Phase 2 BiS Item for ${escapeHtml(bisMatch.className)} (${escapeHtml(bisMatch.specName)}) — Click to view in BiS Planner">⭐ Phase 2 BiS</button>`;
                })()}
                ${isDungeonRecipe(r) ? '<span class="recipe-dungeon-tag" title="Dropped by dungeon mobs or bosses">🏰 Dungeon Drop</span>' : ''}
                ${isBlueprintRecipe(r) ? '<span class="recipe-blueprint-tag" title="Campfire Station Blueprint">⛺ Camp Blueprint</span>' : ''}
              </h4>
              ${r.effect ? `<div class="recipe-effect">${escapeHtml(r.effect)}</div>` : ''}
            </div>
            <span class="recipe-skill-badge ${skillClass}" title="Learn: ${r.learn} | Yellow: ${r.yellow} | Green: ${r.green} | Grey: ${r.grey}">
              ${skillDisplay}
            </span>
          </div>

          <div class="recipe-reagents-row">
            ${reagentsHtml || '<span style="font-size:0.75rem; color:#94a3b8;">No reagents required</span>'}
          </div>
          ${quickSources.length ? `<div class="recipe-reagent-sources-bar">${quickSources.join('')}</div>` : ''}
        </div>

        <div class="recipe-source-line">
          <span>Source:</span>
          <span class="recipe-source-badge">${escapeHtml(r.source || 'Trainer')}</span>
        </div>
      </div>
    `;
  }


  /* ==========================================================================
     SUBTAB: SPECIALIZATIONS DEEP-DIVES (ENGINEERING, BLACKSMITHING, LEATHERWORKING)
     ========================================================================== */
  function renderSpecializationsTab(container, prof) {
    const specData = SPECIALIZATIONS_DATA[prof.slug];
    if (!specData) {
      container.innerHTML = `<div style="text-align: center; padding: 3rem; color: #94a3b8;">No specializations available for this profession.</div>`;
      return;
    }

    const savedChecked = JSON.parse(localStorage.getItem(`wowforever_specs_${prof.slug}`) || '{}');

    container.innerHTML = `
      <div class="leveling-header-block">
        <div class="leveling-header-title">
          <h3>
            ${escapeHtml(prof.name)} Specializations
            <span class="beta-cap-tag" style="${specData.isBetaActive ? 'background: rgba(34, 197, 94, 0.2); border-color: #22c55e; color: #86efac;' : 'background: rgba(239, 68, 68, 0.2); border-color: #ef4444; color: #fca5a5;'}">
              ${escapeHtml(specData.phaseNote)}
            </span>
          </h3>
          <p>Explore exclusive crafts, side-by-side spec comparison, quest turn-in checklists, and master trainers.</p>
        </div>
      </div>

      <div class="specs-grid-layout ${specData.specs.length === 3 ? 'cols-3' : 'cols-2'}">
        ${specData.specs.map(spec => `
          <div class="spec-card" data-spec-id="${spec.id}">
            <div class="spec-card-header">
              <img src="${getIconUrl(spec.icon)}" alt="${escapeHtml(spec.name)}" class="spec-card-icon" />
              <div>
                <h4 class="spec-card-title">${escapeHtml(spec.name)}</h4>
                <div class="spec-card-archetype">${escapeHtml(spec.archetype)}</div>
              </div>
            </div>

            <div class="spec-trainer-box">
              <span class="spec-section-label">📍 Master Trainer &amp; Location:</span>
              <div class="spec-trainer-text">${formatWaypointsInHtml(escapeHtml(spec.trainer))}</div>
            </div>

            <div class="spec-quest-box">
              <span class="spec-section-label">📋 Quest Turn-In Checklist: <em>${escapeHtml(spec.questName)}</em></span>
              <div class="spec-checklist-items">
                ${spec.questTurnIns.map(mat => {
                  const checkKey = `${spec.id}_${mat.name.toLowerCase().replace(/[^a-z0-9]/g, '')}`;
                  const isChecked = Boolean(savedChecked[checkKey]);
                  return `
                    <label class="spec-check-item ${isChecked ? 'completed' : ''}" data-check-key="${checkKey}">
                      <input type="checkbox" class="spec-checkbox" ${isChecked ? 'checked' : ''} data-check-key="${checkKey}" />
                      <img src="${getIconUrl(mat.icon)}" alt="${escapeHtml(mat.name)}" class="spec-check-icon" />
                      <span class="spec-check-name">${mat.count}x ${escapeHtml(mat.name)}</span>
                      <button type="button" class="spec-mat-lookup-btn" data-reagent-name="${escapeHtml(mat.name)}" title="Look up where to get ${escapeHtml(mat.name)}">🔍</button>
                    </label>
                  `;
                }).join('')}
              </div>
            </div>

            <div class="spec-crafts-box">
              <span class="spec-section-label">⭐ Signature &amp; Exclusive Crafts:</span>
              <div class="spec-crafts-list">
                ${spec.crafts.map(cr => `
                  <div class="spec-craft-row">
                    <img src="${getIconUrl(cr.icon)}" alt="${escapeHtml(cr.name)}" class="spec-craft-icon q${cr.quality || 2}" />
                    <div class="spec-craft-info">
                      <div class="spec-craft-name q${cr.quality || 2}">${escapeHtml(cr.name)}</div>
                      <div class="spec-craft-effect">${escapeHtml(cr.effect)}</div>
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    `;

    container.querySelectorAll('.spec-checkbox').forEach(cb => {
      cb.addEventListener('change', () => {
        const key = cb.getAttribute('data-check-key');
        savedChecked[key] = cb.checked;
        localStorage.setItem(`wowforever_specs_${prof.slug}`, JSON.stringify(savedChecked));
        const row = cb.closest('.spec-check-item');
        if (row) row.classList.toggle('completed', cb.checked);
      });
    });

    container.querySelectorAll('.spec-mat-lookup-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const matName = btn.getAttribute('data-reagent-name');
        if (matName) {
          openReverseReagentLookup(matName);
        }
      });
    });
  }

  /* ==========================================================================
     SUBTAB: CONTAINERS, BAGS & QUIVERS COMPENDIUM (TAILORING & LEATHERWORKING)
     ========================================================================== */
  function renderContainersTab(container, prof) {
    const contData = CONTAINERS_DATA[prof.slug];
    if (!contData) {
      container.innerHTML = `<div style="text-align: center; padding: 3rem; color: #94a3b8;">No containers recorded for this profession.</div>`;
      return;
    }

    const isTailoring = prof.slug === 'tailoring';

    let itemsToDisplay;
    if (isTailoring) {
      if (activeContainerType === 'general') itemsToDisplay = contData.generalBags;
      else if (activeContainerType === 'reagent') itemsToDisplay = contData.reagentBags;
      else if (activeContainerType === 'specialty') itemsToDisplay = contData.specialtyBags;
      else itemsToDisplay = [...contData.generalBags, ...contData.reagentBags, ...contData.specialtyBags];
    } else {
      if (activeContainerType === 'quivers') itemsToDisplay = contData.quivers;
      else if (activeContainerType === 'pouches') itemsToDisplay = contData.pouches;
      else if (activeContainerType === 'reagent') itemsToDisplay = contData.reagentBags;
      else itemsToDisplay = [...contData.quivers, ...contData.pouches, ...contData.reagentBags];
    }

    container.innerHTML = `
      <div class="leveling-header-block">
        <div class="leveling-header-title">
          <h3>
            ${isTailoring ? 'Containers, Custom Reagent Bags & Specialty Packs' : 'Quivers, Ammo Pouches & Leather Bags'}
            <span class="beta-cap-tag" style="background: rgba(14, 116, 144, 0.2); border-color: #0284c7; color: #38bdf8;">
              ${isTailoring ? 'Mooncloth Verified 18-Slot' : 'Attack Speed Bonus Up to +15%'}
            </span>
          </h3>
          <p>${isTailoring ? 'Craft general inventory bags, 8 custom WoW Forever trade reagent bags, and high-capacity soul, herb, and enchanting specialty containers.' : 'Craft Hunter quivers and ammo pouches granting passive attack speed bonuses (+10% to +13%), and custom leather reagent pouches.'}</p>
        </div>
      </div>

      <div class="prof-category-chips" style="margin-bottom: 1.25rem;">
        <button type="button" class="prof-cat-chip ${activeContainerType === 'all' ? 'active' : ''}" data-cont-type="all">
          All (${isTailoring ? contData.generalBags.length + contData.reagentBags.length + contData.specialtyBags.length : contData.quivers.length + contData.pouches.length + contData.reagentBags.length})
        </button>
        ${isTailoring ? `
          <button type="button" class="prof-cat-chip ${activeContainerType === 'general' ? 'active' : ''}" data-cont-type="general">
            🎒 General Bags (${contData.generalBags.length})
          </button>
          <button type="button" class="prof-cat-chip ${activeContainerType === 'reagent' ? 'active' : ''}" data-cont-type="reagent">
            ✨ Custom Reagent Bags (${contData.reagentBags.length})
          </button>
          <button type="button" class="prof-cat-chip ${activeContainerType === 'specialty' ? 'active' : ''}" data-cont-type="specialty">
            🔮 Specialty Bags (${contData.specialtyBags.length})
          </button>
        ` : `
          <button type="button" class="prof-cat-chip ${activeContainerType === 'quivers' ? 'active' : ''}" data-cont-type="quivers">
            🏹 Quivers (${contData.quivers.length})
          </button>
          <button type="button" class="prof-cat-chip ${activeContainerType === 'pouches' ? 'active' : ''}" data-cont-type="pouches">
            🔫 Ammo Pouches (${contData.pouches.length})
          </button>
          <button type="button" class="prof-cat-chip ${activeContainerType === 'reagent' ? 'active' : ''}" data-cont-type="reagent">
            ✨ Reagent Pouches (${contData.reagentBags.length})
          </button>
        `}
      </div>

      <div class="containers-grid">
        ${itemsToDisplay.map(item => `
          <div class="container-card">
            <div class="container-card-header">
              <img src="${getIconUrl(item.icon)}" alt="${escapeHtml(item.name)}" class="container-icon q${item.quality || 1}" />
              <div class="container-info">
                <h4 class="container-name q${item.quality || 1}">
                  ${escapeHtml(item.name)}
                  ${item.isForeverVerified ? '<span class="verified-tag">18-Slot Verified</span>' : ''}
                </h4>
                <div class="container-badges-row">
                  <span class="container-slot-pill">${item.slots} Slots</span>
                  ${item.speed ? `<span class="container-speed-pill">⚡ ${item.speed} Attack Speed</span>` : ''}
                  ${item.type ? `<span class="container-type-pill">${escapeHtml(item.type)}</span>` : ''}
                  <span class="container-req-pill">Skill ${item.skill}</span>
                </div>
              </div>
            </div>

            <p class="container-desc">${escapeHtml(item.desc)}</p>

            <div class="container-reagents-box">
              <span class="container-source-text"><strong>Source:</strong> ${formatWaypointsInHtml(escapeHtml(item.source))}</span>
              <div class="container-reagents-list">
                ${(item.reagents || []).map(mat => `
                  <span class="reagent-chip" title="${escapeHtml(mat.name)}" data-item-name="${escapeHtml(mat.name)}" style="cursor: pointer;">
                    <img src="${getIconUrl(mat.icon)}" alt="${escapeHtml(mat.name)}" />
                    <span class="reagent-count">${mat.count}x</span>
                    <span>${escapeHtml(mat.name)}</span>
                  </span>
                `).join('')}
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    `;

    container.querySelectorAll('.prof-cat-chip').forEach(btn => {
      btn.addEventListener('click', () => {
        activeContainerType = btn.getAttribute('data-cont-type');
        renderContainersTab(container, prof);
      });
    });

    container.querySelectorAll('.reagent-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        const name = chip.getAttribute('data-item-name');
        if (name) openReverseReagentLookup(name);
      });
    });
  }

  function renderPairingDetailsCard(activePair) {
    return `
      <div class="pairing-details-card">
        <div class="pairing-details-head">
          <div>
            <div class="pairing-role-label">Recommended for: <strong>${escapeHtml(activePair.roleName)}</strong></div>
            <h3 class="pairing-primary-title">⭐ Optimal Choice: ${escapeHtml(activePair.primaryPair)}</h3>
            <div class="pairing-alt-title">Alternative Option: <strong>${escapeHtml(activePair.altPair)}</strong></div>
          </div>
          <div class="pairing-synergy-stars" title="Synergy Rating: ${activePair.synergyStars}">
            <span class="stars-val">${activePair.synergyStars}</span>
            <span class="stars-lbl">Synergy Rating</span>
          </div>
        </div>

        <div class="pairing-perks-grid">
          <div class="pairing-perk-box combat">
            <span class="perk-box-tag">✨ COMBINED COMBAT PASSIVES</span>
            <p class="perk-box-text">${escapeHtml(activePair.passives)}</p>
          </div>
          <div class="pairing-perk-box camp">
            <span class="perk-box-tag">⛺ CAMPFIRE STATION SYNERGY</span>
            <p class="perk-box-text">${escapeHtml(activePair.campAura)}</p>
          </div>
        </div>

        <div class="pairing-summary-note">
          <strong>Tactical Breakdown:</strong> ${escapeHtml(activePair.summary)}
        </div>
      </div>
    `;
  }

  /* ==========================================================================
     OVERVIEW WIZARD: CLASS & ROLE PAIRING RECOMMENDATION MATRIX
     ========================================================================== */
  function renderRolePairingWizard() {
    const pairings = PAIRING_WIZARD_DATA;
    const activePair = pairings.find(p => p.roleId === activeRolePairing) || pairings[0];

    return `
      <div class="pairing-wizard-container">
        <div class="section-heading-bar" style="margin-top: 1.5rem;">
          <div>
            <h2><span>🧙‍♂️</span> Interactive Class &amp; Role Pairing Recommendation Matrix</h2>
            <p class="section-subtext">Select your character archetype to reveal the optimal profession synergy, combat passives, and campfire station auras</p>
          </div>
        </div>

        <div class="pairing-roles-bar">
          ${pairings.map(p => `
            <button type="button" class="pairing-role-chip ${p.roleId === activePair.roleId ? 'active' : ''}" data-role-id="${p.roleId}">
              <span>${p.icon}</span> ${escapeHtml(p.roleName.split('(')[0].trim())}
            </button>
          `).join('')}
        </div>

        ${renderPairingDetailsCard(activePair)}
      </div>
    `;
  }

  function filterTrainers() {
    return WOW_TRAINERS_DATA.filter(t => {
      if (trainerFactionFilter !== 'all' && t.faction.toLowerCase() !== trainerFactionFilter) return false;
      if (trainerRankFilter !== 'all' && t.rank.toLowerCase() !== trainerRankFilter) return false;
      if (trainerProfFilter !== 'all' && t.profession !== trainerProfFilter) return false;
      if (trainerZoneFilter !== 'all' && t.zone !== trainerZoneFilter) return false;
      if (trainerSearchQuery) {
        const q = trainerSearchQuery.toLowerCase();
        const matchesName = t.name.toLowerCase().includes(q);
        const matchesZone = t.zone.toLowerCase().includes(q);
        const matchesProf = t.profName.toLowerCase().includes(q);
        if (!matchesName && !matchesZone && !matchesProf) return false;
      }
      return true;
    });
  }

  function renderTrainerCardsHtml(filtered) {
    if (filtered.length === 0) {
      return `
        <div style="grid-column: 1 / -1; text-align: center; padding: 2.5rem; color: #94a3b8; background: rgba(15,23,42,0.5); border-radius: 8px;">
          No trainers found matching your search and filter criteria.
        </div>
      `;
    }
    return filtered.map(t => `
      <div class="trainer-card">
        <div class="trainer-card-top">
          <span class="trainer-faction-pill ${t.faction.toLowerCase()}">${t.faction}</span>
          <span class="trainer-rank-pill">${t.rank}</span>
          <span class="trainer-prof-pill">${t.profName}</span>
        </div>
        <h4 class="trainer-name">${escapeHtml(t.name)}</h4>
        <div class="trainer-zone">📍 ${escapeHtml(t.zone)}</div>
        ${t.notes ? `<div class="trainer-notes">💡 ${escapeHtml(t.notes)}</div>` : ''}
        <div class="trainer-footer">
          <button type="button" class="tomtom-way-btn" data-macro="${escapeHtml(t.macro)}" title="Click to copy TomTom macro: ${escapeHtml(t.macro)}">
            📍 <span>${escapeHtml(t.macro)}</span>
          </button>
        </div>
      </div>
    `).join('');
  }

  function updateTrainerGrid(container) {
    const grid = container.querySelector('.trainer-grid');
    if (!grid) return;
    const filtered = filterTrainers();
    grid.innerHTML = renderTrainerCardsHtml(filtered);
  }

  /* ==========================================================================
     OVERVIEW: MASTER TRAINER DIRECTORY & 1-CLICK TOMTOM MACRO HUB
     ========================================================================== */
  function renderMasterTrainerDirectory() {
    const allTrainers = WOW_TRAINERS_DATA;
    const filtered = filterTrainers();

    const distinctProfs = [
      { slug: 'all', name: 'All Professions' },
      { slug: 'alchemy', name: 'Alchemy' },
      { slug: 'blacksmithing', name: 'Blacksmithing' },
      { slug: 'enchanting', name: 'Enchanting' },
      { slug: 'engineering', name: 'Engineering' },
      { slug: 'leatherworking', name: 'Leatherworking' },
      { slug: 'tailoring', name: 'Tailoring' },
      { slug: 'mining', name: 'Mining' },
      { slug: 'herbalism', name: 'Herbalism' },
      { slug: 'skinning', name: 'Skinning' },
      { slug: 'cooking', name: 'Cooking' },
      { slug: 'first-aid', name: 'First Aid' },
      { slug: 'fishing', name: 'Fishing' },
      { slug: 'camping', name: 'Camping' }
    ];

    const distinctZones = ['all', ...new Set(allTrainers.map(t => t.zone))].sort((a, b) => {
      if (a === 'all') return -1;
      if (b === 'all') return 1;
      return a.localeCompare(b);
    });

    return `
      <div class="trainer-directory-container">
        <div class="section-heading-bar" style="margin-top: 1.5rem;">
          <div>
            <h2><span>📍</span> Master Trainer Directory &amp; 1-Click TomTom Macro Hub</h2>
            <p class="section-subtext">Find every Apprentice, Journeyman, Expert, and Artisan trainer across Azeroth with 1-click TomTom /way macros</p>
          </div>
        </div>

        <div class="trainer-filter-bar">
          <input type="text" id="trainer-search-input" class="prof-search-input" placeholder="Search trainer name, city, zone..." value="${escapeHtml(trainerSearchQuery)}" />
          
          <div class="trainer-filter-selects">
            <select id="trainer-prof-select" class="trainer-select" aria-label="Filter by profession">
              ${distinctProfs.map(p => `
                <option value="${p.slug}" ${trainerProfFilter === p.slug ? 'selected' : ''}>${p.name}</option>
              `).join('')}
            </select>

            <select id="trainer-faction-select" class="trainer-select" aria-label="Filter by faction">
              <option value="all" ${trainerFactionFilter === 'all' ? 'selected' : ''}>All Factions</option>
              <option value="alliance" ${trainerFactionFilter === 'alliance' ? 'selected' : ''}>Alliance</option>
              <option value="horde" ${trainerFactionFilter === 'horde' ? 'selected' : ''}>Horde</option>
              <option value="neutral" ${trainerFactionFilter === 'neutral' ? 'selected' : ''}>Neutral</option>
            </select>

            <select id="trainer-rank-select" class="trainer-select" aria-label="Filter by rank">
              <option value="all" ${trainerRankFilter === 'all' ? 'selected' : ''}>All Ranks</option>
              <option value="apprentice" ${trainerRankFilter === 'apprentice' ? 'selected' : ''}>Apprentice (1–75)</option>
              <option value="journeyman" ${trainerRankFilter === 'journeyman' ? 'selected' : ''}>Journeyman (75–150)</option>
              <option value="expert" ${trainerRankFilter === 'expert' ? 'selected' : ''}>Expert (150–225)</option>
              <option value="artisan" ${trainerRankFilter === 'artisan' ? 'selected' : ''}>Artisan (200–300)</option>
            </select>

            <select id="trainer-zone-select" class="trainer-select" aria-label="Filter by zone">
              <option value="all" ${trainerZoneFilter === 'all' ? 'selected' : ''}>All Zones (${distinctZones.length - 1})</option>
              ${distinctZones.filter(z => z !== 'all').map(z => `
                <option value="${escapeHtml(z)}" ${trainerZoneFilter === z ? 'selected' : ''}>${escapeHtml(z)}</option>
              `).join('')}
            </select>
          </div>
        </div>

        <div class="trainer-grid">
          ${renderTrainerCardsHtml(filtered)}
        </div>
      </div>
    `;
  }

  /* ==========================================================================
     SUBTAB 2: LEVELING 1-300 ROADMAP (WITH REAGENT BADGES & PROGRESS TRACKS)
     ========================================================================== */
  function resolveStepCraftedItem(item, prof) {
    if (!item) return { name: '', icon: null, quality: 1, effect: '', reagents: null, learn: '1', source: 'Trainer', id: null, targetSubtab: 'recipes', recipeObj: null };
    const name = item.recipeName || item.name || '';
    if (!name) return { name: '', icon: null, quality: 1, effect: '', reagents: null, learn: '1', source: 'Trainer', id: null, targetSubtab: 'recipes', recipeObj: null };

    const cleanName = name.toLowerCase()
      .replace(/^make (a|an) /i, '')
      .replace(/\s*\(smelting bypass\)$/i, '')
      .trim();
    const smeltTarget = cleanName.startsWith('smelt ') ? `${cleanName.replace(/^smelt\s+/, '')} bar` : null;
    const recipesList = (prof && prof.recipes) || [];

    // 1. Exact name or Smelt Bar match first
    let match = recipesList.find(r => {
      if (!r || !r.name) return false;
      const rn = r.name.toLowerCase();
      return rn === name.toLowerCase() || rn === cleanName || (smeltTarget && rn === smeltTarget);
    });

    // 2. Fallback to itemId match
    if (!match && item.itemId) {
      match = recipesList.find(r => r && (String(r.id) === String(item.itemId) || String(r.itemId) === String(item.itemId)));
    }

    // 3. Fallback to substring match
    if (!match) {
      match = recipesList.find(r => {
        if (!r || !r.name) return false;
        const rn = r.name.toLowerCase();
        return rn.includes(cleanName) || cleanName.includes(rn);
      });
    }

    if (match) {
      return {
        name: match.name,
        icon: match.icon,
        quality: match.quality || 1,
        effect: match.effect || item.advice || item.source || '',
        reagents: match.reagents || item.reagents || null,
        learn: match.learn !== undefined ? match.learn : (item.from !== undefined ? `${item.from}–${item.to}` : '1'),
        source: match.source || item.source || 'Trainer',
        id: match.id || item.itemId || null,
        targetSubtab: 'recipes',
        recipeObj: match
      };
    }

    // 4. Camping station, campfire & upgrade lookup
    if (prof && prof.slug === 'camping') {
      const campingAliasMap = {
        'basic campfire kit': { subtab: 'guide', target: 'Basic Campfire Kit' },
        'journeyman campfire kit': { subtab: 'guide', target: 'Journeyman Campfire Kit' },
        'expert campfire kit': { subtab: 'guide', target: 'Expert Campfire Kit' },
        'lean-to shelter': { subtab: 'buffs', target: 'Camp Tent' },
        'linen wall tent': { subtab: 'buffs', target: 'Camp Tent' },
        'silk trail pavilion': { subtab: 'buffs', target: 'Camp Tent' },
        'field tanning rack': { subtab: 'upgrades', target: 'Tanning Rack' },
        'field spinning wheel': { subtab: 'upgrades', target: 'Spinning Wheel' },
        'portable blacksmithing anvil': { subtab: 'upgrades', target: 'Anvil' },
        'field alchemy cauldron': { subtab: 'upgrades', target: 'Fermenter' },
        "cookie's feast": { subtab: 'upgrades', target: "Cookie's Feast" }
      };
      const alias = campingAliasMap[cleanName];
      const lookupKey = alias ? alias.target.toLowerCase() : cleanName;

      const cf = (prof.campfires || []).find(c => c && c.name && (c.name.toLowerCase() === lookupKey || lookupKey.includes(c.name.toLowerCase()) || c.name.toLowerCase().includes(lookupKey)));
      if (cf) {
        return {
          name: item.recipeName || cf.name,
          targetName: alias?.target || cf.name,
          icon: cf.icon || 'inv_camelot_camping_welcomingcampfire',
          quality: cf.quality || 2,
          effect: `${cf.desc || ''} (Holds ${cf.capacity || 3} stations)`,
          learn: cf.skillReq || (item.from !== undefined ? `${item.from}–${item.to}` : '1'),
          source: cf.blueprint ? cf.blueprint.text : (item.source || 'Camping Trainer'),
          reagents: item.reagents || cf.reagents || null,
          id: item.itemId || null,
          targetSubtab: 'guide',
          recipeObj: null
        };
      }

      const bf = (prof.buffObjects || []).find(b => b && b.object && (b.object.toLowerCase() === lookupKey || lookupKey.includes(b.object.toLowerCase())));
      if (bf) {
        return {
          name: item.recipeName || bf.object,
          targetName: alias?.target || bf.object,
          icon: bf.icon || 'inv_misc_pelt_wolf_01',
          quality: cleanName.includes('silk') ? 3 : 2,
          effect: item.advice ? `${item.advice} (${bf.object}: ${bf.gives})` : bf.gives,
          learn: (item.from !== undefined && item.to !== undefined) ? `${item.from}–${item.to}` : `${bf.profName || 'Camping'} ${bf.skillReq || ''}`.trim(),
          source: item.source || 'Camping Trainer',
          reagents: item.reagents || bf.reagents || null,
          id: item.itemId || null,
          targetSubtab: 'buffs',
          recipeObj: null
        };
      }

      if (prof.upgrades) {
        for (const u of prof.upgrades) {
          if (u.s140?.name && (u.s140.name.toLowerCase() === lookupKey || lookupKey.includes(u.s140.name.toLowerCase()))) {
            return {
              name: item.recipeName || u.s140.name,
              targetName: alias?.target || u.s140.name,
              icon: u.s140.icon,
              quality: 2,
              effect: item.advice ? `${item.advice} (${u.s140.desc})` : u.s140.desc,
              learn: (item.from !== undefined && item.to !== undefined) ? `${item.from}–${item.to}` : u.s140.skill,
              source: item.source || 'Camping Blueprint',
              reagents: item.reagents || null,
              id: item.itemId || null,
              targetSubtab: 'upgrades',
              recipeObj: null
            };
          }
          if (u.s300?.name && (u.s300.name.toLowerCase() === lookupKey || lookupKey.includes(u.s300.name.toLowerCase()))) {
            return {
              name: item.recipeName || u.s300.name,
              targetName: alias?.target || u.s300.name,
              icon: u.s300.icon,
              quality: 3,
              effect: item.advice ? `${item.advice} (${u.s300.desc})` : u.s300.desc,
              learn: (item.from !== undefined && item.to !== undefined) ? `${item.from}–${item.to}` : u.s300.skill,
              source: item.source || 'Camping Blueprint',
              reagents: item.reagents || null,
              id: item.itemId || null,
              targetSubtab: 'upgrades',
              recipeObj: null
            };
          }
        }
      }
    }

    // 5. Fallback against window.WOW_REAGENT_SOURCES
    if (window.WOW_REAGENT_SOURCES) {
      const rSources = window.WOW_REAGENT_SOURCES;
      const rEntry = Object.values(rSources).find(r => r && ((r.name && r.name.toLowerCase() === cleanName) || (item.itemId && String(r.id) === String(item.itemId))));
      if (rEntry) {
        return {
          name: rEntry.name,
          icon: rEntry.icon || null,
          quality: rEntry.quality || 1,
          effect: rEntry.summary || '',
          reagents: item.reagents || null,
          learn: (item.from !== undefined && item.to !== undefined) ? `${item.from}–${item.to}` : '1',
          source: item.source || 'Trainer',
          id: rEntry.id,
          targetSubtab: 'recipes',
          recipeObj: null
        };
      }
    }

    // 6. Generic Fallback
    return {
      name: item.recipeName || item.name || name,
      icon: item.icon || null,
      quality: item.vendorDetails ? 2 : (item.quality || 1),
      effect: item.advice || item.source || '',
      reagents: item.reagents || null,
      learn: (item.from !== undefined && item.to !== undefined) ? `${item.from}–${item.to}` : '1',
      source: item.source || 'Trainer',
      id: item.itemId || null,
      targetSubtab: 'recipes',
      recipeObj: null
    };
  }

  function renderLevelingTab(container, prof) {
    const leveling = prof.leveling || {};
    const steps = leveling.steps || [];

    if (steps.length === 0) {
      container.innerHTML = `
        <div style="text-align: center; padding: 3rem; color: #94a3b8; background: rgba(15,23,42,0.5); border-radius: 8px;">
          Leveling roadmap for ${escapeHtml(prof.name)} is based on open-world node harvesting and gathering skill gains.
        </div>
      `;
      return;
    }

    const levelingStorageKey = `wowforever_leveling_${prof.slug}`;
    let completedSteps = [];
    try {
      completedSteps = JSON.parse(localStorage.getItem(levelingStorageKey) || '[]');
      if (!Array.isArray(completedSteps)) completedSteps = [];
    } catch {
      completedSteps = [];
    }

    const actionableSteps = steps.filter(s => s.type === 'step' || s.type === 'gather-step');
    const totalStepsCount = actionableSteps.length;
    const initialCompletedCount = steps.filter((s, i) => (s.type === 'step' || s.type === 'gather-step') && completedSteps.includes(`${prof.slug}_step_${i}`)).length;
    const initialPct = totalStepsCount > 0 ? Math.round((initialCompletedCount / totalStepsCount) * 100) : 0;

    const guideCallouts = leveling.guideCallouts || [];
    const calloutsHtml = guideCallouts.length ? `
      <div class="leveling-guide-callouts">
        ${guideCallouts.map(c => `
          <div class="leveling-guide-callout-card">
            <span class="callout-icon">${c.icon || '💡'}</span>
            <div class="callout-body">
              <strong>${escapeHtml(c.title)}</strong>
              <p>${escapeHtml(c.text)}</p>
            </div>
          </div>
        `).join('')}
      </div>
    ` : '';

    container.innerHTML = `
      <div class="leveling-header-block">
        <div class="leveling-header-title">
          <h3>
            ${escapeHtml(leveling.title || 'LEVELING FROM 1 TO 300')}
            <span class="beta-cap-tag">${escapeHtml(leveling.capNote || "225 is the beta's cap for now")}</span>
          </h3>
          <p>${escapeHtml(leveling.desc || "At each point, you get the cheapest recipe to skill up, whether you learn it from the trainer or buy it from a vendor. Counts are averages, so buy a few more. There are no prices until launch, so each reagent counts for what a vendor pays you for it.")}</p>
        </div>
        <div style="display: flex; gap: 0.5rem; align-items: center; flex-wrap: wrap;">
          <button type="button" class="shopping-copy-btn shopping-reset-btn" id="leveling-reset-btn" aria-label="Reset leveling checklist" title="Reset all checked leveling crafts">
            <span>↺</span> Reset Checklist
          </button>
        </div>
      </div>

      ${calloutsHtml}

      <!-- Interactive Leveling Checklist Progress Bar -->
      <div class="shopping-checklist-bar leveling-checklist-bar">
        <div class="shopping-progress-labels">
          <span>
            <strong>Leveling Milestones Completed:</strong> 
            <span id="leveling-progress-count">${initialCompletedCount}</span> / ${totalStepsCount} (<span id="leveling-progress-pct">${initialPct}%</span>)
          </span>
          <span style="font-size: 0.75rem; color: #94a3b8;">Check off each recipe or bracket as you advance in-game</span>
        </div>
        <div class="shopping-progress-track">
          <div class="shopping-progress-fill leveling-progress-fill" id="leveling-progress-fill" style="width: ${initialPct}%;"></div>
        </div>
      </div>

      <div class="leveling-roadmap-list">
        ${steps.map((item, idx) => {
          const stepId = `${prof.slug}_step_${idx}`;
          const isCompleted = completedSteps.includes(stepId);

          if (item.type === 'rank') {
            const isArtisan = item.rank && item.rank.toLowerCase().includes('artisan');
            return `
              ${isArtisan && !steps.some(s => s.type === 'beta-stop') ? `
                <div class="leveling-beta-stop-banner">
                  <div class="beta-stop-title">🔒 THE BETA STOPS AT 225 (REQUIRES LEVEL 35)</div>
                  <p>In Closed Beta Phase 2, player level is capped at 30. Artisan training requires Character Level 35 and skill 200+. These 225–300 steps outline the fastest path once Phase 3 unlocks.</p>
                </div>
              ` : ''}
              <div class="leveling-rank-divider">
                <strong class="rank-name">${escapeHtml(item.rank)}</strong>
                <span class="rank-details">${formatWaypointsInHtml(escapeHtml(item.details))}</span>
                ${isArtisan ? `<span class="rank-phase-badge" style="background: rgba(239, 68, 68, 0.2); border: 1px solid #ef4444; color: #fca5a5; font-size: 0.72rem; padding: 2px 8px; border-radius: 4px; font-weight: 700; margin-left: auto;">Phase 3 (Req Lvl 35)</span>` : ''}
              </div>
            `;
          }
          if (item.type === 'beta-stop') {
            return `
              <div class="leveling-beta-stop-banner">
                <div class="beta-stop-title">${escapeHtml(item.title)}</div>
                <p>${escapeHtml(item.text)}</p>
              </div>
            `;
          }
          if (item.type === 'step') {
            const rangeStr = (item.from !== null && item.from !== undefined)
              ? (item.to !== null && item.to !== undefined && item.to !== item.from ? `${item.from}–${item.to}` : `${item.from}`)
              : '';
            const leftPercent = item.bar?.iLeft || '0%';
            const widthPercent = item.bar?.iWidth || '10%';
            const craftsNum = item.crafts || 1;
            const vd = item.vendorDetails;
            const supplyClass = vd?.supply
              ? (vd.supply.toLowerCase().includes('unlimited') ? 'unlimited' : (vd.supply.toLowerCase().includes('limited') ? 'limited' : 'drop'))
              : '';
            const resolved = resolveStepCraftedItem(item, prof);
            const craftedIconUrl = getIconUrl(resolved.icon, resolved.name, resolved.source);
            const qualityClass = `q${resolved.quality || 1}`;

            return `
              <div class="leveling-step-row ${isCompleted ? 'completed' : ''}" data-step-id="${stepId}" data-step-idx="${idx}">
                <div class="step-check-col">
                  <input type="checkbox" class="leveling-step-check" ${isCompleted ? 'checked' : ''} aria-label="Mark ${escapeHtml(item.recipeName)} as completed" />
                </div>
                <div class="step-range-col">
                  <span class="step-range-text">${rangeStr}</span>
                  <div class="step-progress-track">
                    <span class="step-progress-fill" style="left: ${leftPercent}; width: ${widthPercent};"></span>
                    <span class="step-progress-cap-marker" style="left: 74.67%;" title="Beta Cap at 225"></span>
                  </div>
                </div>
                <div class="step-info-col">
                  <div class="step-recipe-header">
                    <div class="step-crafted-icon-wrap ${qualityClass}" data-recipe-name="${escapeHtml(item.recipeName)}" data-step-idx="${idx}" role="button" tabindex="0" aria-label="View ${escapeHtml(item.recipeName)} in catalog" title="Click to view in catalog · Hover for full item stats">
                      <img src="${craftedIconUrl}" alt="${escapeHtml(item.recipeName)}" class="step-crafted-icon ${qualityClass}" loading="lazy" />
                    </div>
                    <div class="step-recipe-name ${qualityClass} is-clickable" role="button" tabindex="0" data-item-id="${item.itemId || resolved.id || ''}" data-recipe-name="${escapeHtml(item.recipeName)}" data-step-idx="${idx}" aria-label="View ${escapeHtml(item.recipeName)} in catalog" title="Click to view in catalog · Hover for full recipe details">
                      <span>${escapeHtml(item.recipeName)}</span>
                      <span class="step-recipe-jump-hint">↗</span>
                    </div>
                  </div>
                  <div class="step-source-line">${escapeHtml(item.source)}</div>
                  ${vd ? `
                    <div class="step-vendor-meta">
                      <span class="vendor-meta-chip">📍 ${formatWaypointsInHtml(escapeHtml(vd.location))}</span>
                      ${vd.cost ? `<span class="vendor-meta-chip cost">🪙 ${escapeHtml(vd.cost)}</span>` : ''}
                      ${vd.supply ? `<span class="vendor-meta-chip supply ${supplyClass}">${escapeHtml(vd.supply)}</span>` : ''}
                    </div>
                  ` : ''}
                  ${item.trainerAlternative ? `<div class="step-trainer-backup">🔄 ${formatWaypointsInHtml(escapeHtml(item.trainerAlternative))}</div>` : ''}
                  ${item.advice ? `<div class="step-advice-note">💡 ${formatWaypointsInHtml(escapeHtml(item.advice))}</div>` : ''}
                </div>
                <div class="step-crafts-col">
                  <div class="step-crafts-count">~${craftsNum}</div>
                  <div class="step-crafts-label">crafts</div>
                </div>
                <div class="step-reagents-col">
                  ${(item.reagents || []).map(mat => {
                    const perCraft = mat.count || 1;
                    const totalForStep = craftsNum * perCraft;
                    const tooltipTitle = craftsNum > 1
                      ? `${perCraft}x ${mat.name} per craft (${totalForStep}x total for ~${craftsNum} crafts)`
                      : `${perCraft}x ${mat.name}`;
                    return `
                      <div class="step-reagent-badge has-total-math" data-item-id="${mat.itemId}" data-item-name="${escapeHtml(mat.name)}" data-per-craft="${perCraft}" data-total-step="${totalForStep}" data-crafts="${craftsNum}" title="${escapeHtml(tooltipTitle)}">
                        <div class="step-reagent-icon-wrap">
                          <img src="${getIconUrl(mat.icon)}" alt="${escapeHtml(mat.name)}" class="step-reagent-img q${mat.quality || 1}" loading="lazy" />
                          <span class="step-reagent-qty" title="${perCraft}x per craft">${perCraft}x</span>
                        </div>
                        ${craftsNum > 1 ? `<span class="step-reagent-total-pill" title="${totalForStep}x total across ~${craftsNum} crafts">=${totalForStep}</span>` : ''}
                      </div>
                    `;
                  }).join('')}
                </div>
              </div>
            `;
          }
          if (item.type === 'gather-step') {
            const rangeStr = (item.from !== null && item.from !== undefined)
              ? (item.to && item.to !== item.from ? `${item.from}–${item.to}` : `${item.from}`)
              : '1–300';
            const leftPercent = item.bar?.iLeft || '0%';
            const widthPercent = item.bar?.iWidth || '12%';
            return `
              <div class="leveling-step-row ${isCompleted ? 'completed' : ''}" data-step-id="${stepId}">
                <div class="step-check-col">
                  <input type="checkbox" class="leveling-step-check" ${isCompleted ? 'checked' : ''} aria-label="Mark ${escapeHtml(item.title)} as completed" />
                </div>
                <div class="step-range-col">
                  <span class="step-range-text">${rangeStr}</span>
                  <div class="step-progress-track">
                    <span class="step-progress-fill" style="left: ${leftPercent}; width: ${widthPercent};"></span>
                    <span class="step-progress-cap-marker" style="left: 74.67%;" title="Beta Cap at 225"></span>
                  </div>
                </div>
                <div class="step-info-col">
                  <strong style="color: var(--text-gold, #facc15); font-size: 1.05rem;">${escapeHtml(item.title)}</strong>
                  <div class="step-source-line" style="color: #cbd5e1; margin-top: 0.25rem;">${formatWaypointsInHtml(escapeHtml(item.zones))}</div>
                </div>
                <div class="step-reagents-col" style="grid-column: 4 / -1;">
                  ${(item.icons || []).map(ic => `
                    <div class="step-reagent-badge" title="${escapeHtml(ic.name)}" data-item-id="${ic.itemId || ''}" data-item-name="${escapeHtml(ic.name)}">
                      <img src="${getIconUrl(ic.icon)}" alt="${escapeHtml(ic.name)}" class="step-reagent-img" loading="lazy" />
                    </div>
                  `).join('')}
                </div>
              </div>
            `;
          }
          return '';
        }).join('')}
      </div>
    `;

    function updateLevelingProgress() {
      const curCompleted = steps.filter((s, i) => (s.type === 'step' || s.type === 'gather-step') && completedSteps.includes(`${prof.slug}_step_${i}`)).length;
      const curPct = totalStepsCount > 0 ? Math.round((curCompleted / totalStepsCount) * 100) : 0;
      const countEl = container.querySelector('#leveling-progress-count');
      const pctEl = container.querySelector('#leveling-progress-pct');
      const fillEl = container.querySelector('#leveling-progress-fill');
      if (countEl) countEl.textContent = curCompleted;
      if (pctEl) pctEl.textContent = `${curPct}%`;
      if (fillEl) fillEl.style.width = `${curPct}%`;
    }

    container.querySelectorAll('.leveling-step-check').forEach(chk => {
      chk.addEventListener('change', (e) => {
        e.stopPropagation();
        const row = chk.closest('.leveling-step-row');
        const stepId = row?.getAttribute('data-step-id');
        if (!stepId) return;
        if (chk.checked) {
          if (!completedSteps.includes(stepId)) completedSteps.push(stepId);
          row.classList.add('completed');
        } else {
          completedSteps = completedSteps.filter(x => x !== stepId);
          row.classList.remove('completed');
        }
        try { localStorage.setItem(levelingStorageKey, JSON.stringify(completedSteps)); } catch {}
        updateLevelingProgress();
      });
    });

    const resetBtn = container.querySelector('#leveling-reset-btn');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        if (!completedSteps.length) return;
        completedSteps = [];
        try { localStorage.removeItem(levelingStorageKey); } catch {}
        container.querySelectorAll('.leveling-step-check').forEach(chk => { chk.checked = false; });
        container.querySelectorAll('.leveling-step-row').forEach(r => { r.classList.remove('completed'); });
        updateLevelingProgress();
        if (typeof window.showToast === 'function') {
          window.showToast(`${prof.name} leveling checklist reset.`, 'info');
        }
      });
    }

    attachTooltipListeners(container, prof);
  }

  /* ==========================================================================
     SUBTAB 3: REAGENT SHOPPING LIST (GROUPED BY VENDOR, FARMED, CRAFTED)
     ========================================================================== */
  function renderShoppingTab(container, prof) {
    const shopping = prof.shopping || {};
    const groups = shopping.groups || [];

    if (groups.length === 0) {
      container.innerHTML = `
        <div style="text-align: center; padding: 3rem; color: #94a3b8; background: rgba(15,23,42,0.5); border-radius: 8px;">
          No pre-calculated reagent shopping list for this tradeskill.
        </div>
      `;
      return;
    }

    const storageKey = `wowforever_shopping_${prof.slug}`;
    const syncStorageKey = `wowforever_shopping_sync_${prof.slug}`;
    const levelingStorageKey = `wowforever_leveling_${prof.slug}`;

    let acquiredItems = [];
    try {
      acquiredItems = JSON.parse(localStorage.getItem(storageKey) || '[]');
      if (!Array.isArray(acquiredItems)) acquiredItems = [];
    } catch {
      acquiredItems = [];
    }

    let syncWithLeveling = false;
    try {
      syncWithLeveling = localStorage.getItem(syncStorageKey) === 'true';
    } catch {
      syncWithLeveling = false;
    }

    let completedSteps = [];
    try {
      completedSteps = JSON.parse(localStorage.getItem(levelingStorageKey) || '[]');
      if (!Array.isArray(completedSteps)) completedSteps = [];
    } catch {
      completedSteps = [];
    }

    const steps = prof.leveling?.steps || [];
    const recipes = prof.recipes || [];
    const hasPostBetaSplit = groups.length > 3
      || groups.some(g => g.title && g.title.toLowerCase().includes('after the beta'))
      || (groups.length === 3 && groups[1]?.title === groups[2]?.title);

    function isPost225GroupAt(idx, g) {
      if (!hasPostBetaSplit) return false;
      return idx >= 3 || (groups.length === 3 && idx === 2) || Boolean(g?.title && g.title.toLowerCase().includes('after the beta'));
    }

    const rawNamesByBracket = { false: new Set(), true: new Set() };
    groups.forEach((g, idx) => {
      const post225 = isPost225GroupAt(idx, g);
      if (!g.title || !g.title.toLowerCase().includes('made along the way')) {
        (g.items || []).forEach(rItem => rawNamesByBracket[post225].add((rItem.name || '').toLowerCase()));
      }
    });

    function getStepConsumedCount(itemObj, isPost225Group, groupObj) {
      if (!syncWithLeveling || !completedSteps.length) return 0;
      const isMadeAlongWayGroup = Boolean(groupObj?.title && groupObj.title.toLowerCase().includes('made along the way'));
      const targetName = (itemObj.name || '').toLowerCase();
      const targetId = itemObj.itemId;

      let directCraftedChecked = 0;
      let directConsumedChecked = 0;
      let totalCraftedInBracket = 0;

      steps.forEach((s, sIdx) => {
        if (s.type !== 'step') return;
        const stepPost225 = (s.from || 1) >= 225;
        if (hasPostBetaSplit && stepPost225 !== isPost225Group) return;
        const crafts = s.crafts || 1;
        const isTargetRecipe = (s.recipeName && s.recipeName.toLowerCase() === targetName) || (targetId && s.itemId === targetId);
        if (isTargetRecipe) {
          totalCraftedInBracket += crafts;
        }

        const stepId = `${prof.slug}_step_${sIdx}`;
        if (!completedSteps.includes(stepId)) return;

        if (isTargetRecipe) {
          directCraftedChecked += crafts;
        }
        (s.reagents || []).forEach(r => {
          if ((targetId && r.itemId === targetId) || (r.name && r.name.toLowerCase() === targetName)) {
            directConsumedChecked += crafts * (r.count || 1);
          }
        });
      });

      const rawSet = rawNamesByBracket[Boolean(isPost225Group)];
      if (isMadeAlongWayGroup) {
        if (rawSet.has(targetName) && totalCraftedInBracket === itemObj.count) {
          return directCraftedChecked;
        }
        return directConsumedChecked;
      }

      // Raw / Vendor group item:
      // For Blacksmithing Solid Stone (where 8 Solid Grinding Stones are for 1-225 and 4 are for 225-300, crafted at 200-206):
      let totalRaw = directConsumedChecked;
      if (prof.slug === 'blacksmithing' && targetName === 'solid stone') {
        const sgsStepIdx = steps.findIndex(s => s.type === 'step' && s.recipeName === 'Solid Grinding Stone');
        if (sgsStepIdx >= 0 && completedSteps.includes(`${prof.slug}_step_${sgsStepIdx}`)) {
          if (!isPost225Group) {
            totalRaw = Math.max(0, totalRaw - 16); // 4x Solid Grinding Stone (16 Solid Stone) belong to 225-300
          } else {
            totalRaw += 16;
          }
        }
      }

      groups.forEach((g, idx) => {
        if (isPost225GroupAt(idx, g) !== isPost225Group) return;
        if (g.title && g.title.toLowerCase().includes('made along the way')) {
          (g.items || []).forEach(mItem => {
            const mName = (mItem.name || '').toLowerCase();
            if (mName === targetName) {
              totalRaw = Math.max(0, totalRaw - directCraftedChecked);
              return;
            }
            if (rawSet.has(mName)) return;

            let mCraftedTotal = 0;
            let mConsumedChecked = 0;
            steps.forEach((s, sIdx) => {
              if (s.type !== 'step') return;
              const stepPost225 = (s.from || 1) >= 225;
              if (hasPostBetaSplit && stepPost225 !== isPost225Group) return;
              const crafts = s.crafts || 1;
              if ((s.recipeName && s.recipeName.toLowerCase() === mName) || (mItem.itemId && s.itemId === mItem.itemId)) {
                mCraftedTotal += crafts;
              }
              const stepId = `${prof.slug}_step_${sIdx}`;
              if (!completedSteps.includes(stepId)) return;
              (s.reagents || []).forEach(r => {
                if ((mItem.itemId && r.itemId === mItem.itemId) || (r.name && r.name.toLowerCase() === mName)) {
                  mConsumedChecked += crafts * (r.count || 1);
                }
              });
            });

            const yieldPerCraft = mName === 'stonescale oil' ? 2 : 1;
            const extraMCraftsUsed = Math.ceil(Math.max(0, mConsumedChecked - (mCraftedTotal * yieldPerCraft)) / yieldPerCraft);
            if (extraMCraftsUsed > 0) {
              const rec = recipes.find(r => r.name && r.name.toLowerCase() === mName);
              if (rec) {
                (rec.reagents || []).forEach(subR => {
                  if ((targetId && subR.id === targetId) || (subR.name && subR.name.toLowerCase() === targetName)) {
                    totalRaw += extraMCraftsUsed * (subR.count || 1);
                  }
                });
              }
            }
          });
        }
      });

      return totalRaw;
    }

    const allItemsWithGroup = groups.flatMap((g, idx) => (g.items || []).map(it => ({ it, g, isPost225Group: isPost225GroupAt(idx, g) })));
    const allItems = allItemsWithGroup.map(x => x.it);
    const totalItems = allItems.length;
    function countAcquiredItems() {
      return allItemsWithGroup.filter(({ it, g, isPost225Group }) => {
        if (acquiredItems.includes(it.name)) return true;
        if (syncWithLeveling) {
          const used = getStepConsumedCount(it, isPost225Group, g);
          if (used > 0 && Math.max(0, it.count - used) === 0) return true;
        }
        return false;
      }).length;
    }
    const initialAcquired = countAcquiredItems();
    const initialPct = totalItems > 0 ? Math.round((initialAcquired / totalItems) * 100) : 0;

    container.innerHTML = `
      <div class="leveling-header-block">
        <div class="leveling-header-title">
          <h3>${escapeHtml(shopping.title || 'SHOPPING LIST, 1 TO 225')}</h3>
          <p>${escapeHtml(shopping.subtitle || 'Trade goods, looted supplies, and crafted components needed to level.')}</p>
        </div>
        <div style="display: flex; gap: 0.5rem; align-items: center; flex-wrap: wrap;">
          <button type="button" class="shopping-copy-btn shopping-sync-btn ${syncWithLeveling ? 'active' : ''}" id="shopping-sync-btn" aria-pressed="${syncWithLeveling}" title="Subtract reagents already used in checked-off Leveling 1–300 steps">
            <span>🔄</span> ${syncWithLeveling ? 'Showing Remaining Only (Synced)' : 'Sync with Leveling Checklist'}
          </button>
          <button type="button" class="shopping-copy-btn" id="shopping-copy-btn" aria-label="Copy shopping list to clipboard">
            <span class="copy-icon">📋</span> Copy Shopping List
          </button>
          <button type="button" class="shopping-copy-btn shopping-reset-btn" id="shopping-reset-btn" aria-label="Reset acquired materials checklist" title="Reset all checked items">
            <span>↺</span> Reset Checklist
          </button>
        </div>
      </div>

      ${syncWithLeveling ? `
        <div class="shopping-sync-active-banner">
          <span>🔄 <strong>Synced with Leveling Checklist (${completedSteps.length} steps checked):</strong> Displaying remaining required materials after subtracting completed leveling brackets.</span>
        </div>
      ` : ''}

      <!-- Interactive Checklist Progress Bar -->
      <div class="shopping-checklist-bar">
        <div class="shopping-progress-labels">
          <span>
            <strong>Materials Acquired:</strong> 
            <span id="shopping-progress-count">${initialAcquired}</span> / ${totalItems} (<span id="shopping-progress-pct">${initialPct}%</span>)
          </span>
          <span style="font-size: 0.75rem; color: #94a3b8;">Click checkbox or card to track in your bags</span>
        </div>
        <div class="shopping-progress-track">
          <div class="shopping-progress-fill" id="shopping-progress-fill" style="width: ${initialPct}%;"></div>
        </div>
      </div>

      <div class="shopping-groups-container">
        ${groups.map((g, idx) => {
          const isPost225Group = isPost225GroupAt(idx, g);
          const isFirstPost225Group = isPost225Group && (idx === 0 || !isPost225GroupAt(idx - 1, groups[idx - 1]));
          return `
            ${isFirstPost225Group ? `
              <div class="shopping-beta-divider">
                <h4><span>⏳</span> Reagents for Leveling Past Phase 2 Beta Cap (225 to 300)</h4>
                <p>Trade goods, looted supplies, and crafted components needed once Artisan training opens post-beta.</p>
              </div>
            ` : ''}
            <div class="shopping-group-section">
              <div class="shopping-group-header">
                <h4 class="shopping-group-title">
                  ${escapeHtml(g.title)}
                  ${g.note ? `<small class="shopping-group-note">${escapeHtml(g.note)}</small>` : ''}
                </h4>
              </div>
              <div class="shopping-rows-grid">
                ${g.items.map(it => {
                  const usedBySteps = getStepConsumedCount(it, isPost225Group, g);
                  const remainingCount = syncWithLeveling ? Math.max(0, it.count - usedBySteps) : it.count;
                  const isStepDepleted = syncWithLeveling && remainingCount === 0 && usedBySteps > 0;
                  const isAcquired = acquiredItems.includes(it.name) || isStepDepleted;
                  return `
                    <div class="shopping-row-card ${isAcquired ? 'is-acquired' : ''} ${isStepDepleted ? 'is-step-completed' : ''}" data-item-id="${it.itemId}" data-item-name="${escapeHtml(it.name)}" data-remaining-count="${remainingCount}" data-base-count="${it.count}">
                      <input type="checkbox" class="shopping-item-check" ${isAcquired ? 'checked' : ''} aria-label="Mark ${escapeHtml(it.name)} as acquired" />
                      <div class="shopping-row-left">
                        <img src="${getIconUrl(it.icon)}" alt="${escapeHtml(it.name)}" class="shopping-icon q${it.quality || 1}" loading="lazy" />
                        <span class="shopping-name q${it.quality || 1}">${escapeHtml(it.name)}</span>
                      </div>
                      <div class="shopping-count-box">
                        <b class="shopping-count">${remainingCount}</b>
                        ${syncWithLeveling && usedBySteps > 0 ? `<small class="shopping-used-sub">of ${it.count}</small>` : ''}
                      </div>
                    </div>
                  `;
                }).join('')}
              </div>
            </div>
          `;
        }).join('')}
      </div>
    `;

    function updateShoppingProgress() {
      const curAcquired = countAcquiredItems();
      const curPct = totalItems > 0 ? Math.round((curAcquired / totalItems) * 100) : 0;
      const countEl = container.querySelector('#shopping-progress-count');
      const pctEl = container.querySelector('#shopping-progress-pct');
      const fillEl = container.querySelector('#shopping-progress-fill');
      if (countEl) countEl.textContent = curAcquired;
      if (pctEl) pctEl.textContent = `${curPct}%`;
      if (fillEl) fillEl.style.width = `${curPct}%`;
    }

    const syncBtn = container.querySelector('#shopping-sync-btn');
    if (syncBtn) {
      syncBtn.addEventListener('click', () => {
        syncWithLeveling = !syncWithLeveling;
        try { localStorage.setItem(syncStorageKey, String(syncWithLeveling)); } catch {}
        renderShoppingTab(container, prof);
      });
    }

    container.querySelectorAll('.shopping-item-check').forEach(chk => {
      chk.addEventListener('change', (e) => {
        e.stopPropagation();
        const card = chk.closest('.shopping-row-card');
        const name = card?.getAttribute('data-item-name');
        if (!name) return;
        if (chk.checked) {
          if (!acquiredItems.includes(name)) acquiredItems.push(name);
          card.classList.add('is-acquired');
        } else {
          acquiredItems = acquiredItems.filter(x => x !== name);
          card.classList.remove('is-acquired');
        }
        try { localStorage.setItem(storageKey, JSON.stringify(acquiredItems)); } catch {}
        updateShoppingProgress();
      });
    });

    const resetBtn = container.querySelector('#shopping-reset-btn');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        if (!acquiredItems.length) return;
        acquiredItems = [];
        try { localStorage.removeItem(storageKey); } catch {}
        container.querySelectorAll('.shopping-item-check').forEach(chk => { chk.checked = false; });
        container.querySelectorAll('.shopping-row-card').forEach(c => { c.classList.remove('is-acquired'); });
        updateShoppingProgress();
        if (typeof window.showToast === 'function') {
          window.showToast(`${prof.name} shopping checklist reset.`, 'info');
        }
      });
    }

    const copyBtn = container.querySelector('#shopping-copy-btn');
    if (copyBtn) {
      copyBtn.addEventListener('click', () => {
        let text = `=== ${prof.name} — ${shopping.title || 'Reagent Shopping List (1 to 225)'}${syncWithLeveling ? ' [Remaining Synced]' : ''} ===\n\n`;
        groups.forEach((g, idx) => {
          const isPost225Group = isPost225GroupAt(idx, g);
          text += `${g.title}${g.note ? ' (' + g.note + ')' : ''}:\n`;
          (g.items || []).forEach(it => {
            const usedBySteps = getStepConsumedCount(it, isPost225Group, g);
            const qty = syncWithLeveling ? Math.max(0, it.count - usedBySteps) : it.count;
            const mark = (acquiredItems.includes(it.name) || (syncWithLeveling && qty === 0)) ? '[x]' : '[ ]';
            text += `  ${mark} ${qty}x ${it.name}${syncWithLeveling && usedBySteps > 0 ? ` (of ${it.count})` : ''}\n`;
          });
          text += '\n';
        });
        if (typeof window.copyTextToClipboard === 'function') {
          window.copyTextToClipboard(text.trim(), () => {
            copyBtn.classList.add('copied');
            copyBtn.innerHTML = '<span class="copy-icon">✓</span> Copied to Clipboard!';
            if (typeof window.showToast === 'function') {
              window.showToast(`${prof.name} shopping list copied!`, 'success');
            }
            setTimeout(() => {
              copyBtn.classList.remove('copied');
              copyBtn.innerHTML = '<span class="copy-icon">📋</span> Copy Shopping List';
            }, 2500);
          });
        }
      });
    }

    attachTooltipListeners(container, prof);
  }

  /* ==========================================================================
     SUBTAB 4: CAMP, SKILL REWARDS AND PERKS
     ========================================================================== */
  function renderCampPerksTab(container, prof) {
    const camp = prof.campPerks || {};
    const milestones = camp.milestones || [];
    const atCamp = camp.atCamp || [];
    const legacyPerks = camp.legacyPerks || [];
    const passiveData = getProfessionPassive(prof.name || currentProfession);

    container.innerHTML = `
      <div class="leveling-header-block">
        <div class="leveling-header-title">
          <h3>CAMP, SKILL REWARDS AND PERKS</h3>
          <p>Account-wide Legacy perks, permanent title certifications, and wilderness camp station blueprints provided by ${escapeHtml(prof.name)}.</p>
        </div>
      </div>

      <div class="camp-perks-container">
        <!-- Featured Spotlight: Combat Passive & Campfire Synergy -->
        ${passiveData ? `
          <div class="prof-passive-spotlight-card">
            <div class="spotlight-badge-header">
              <span class="spotlight-tag combat">✨ CORE COMBAT PASSIVE</span>
              <span class="spotlight-tag camp">🔥 CAMPFIRE BLUEPRINTS</span>
              <span class="spotlight-tag legacy">🏆 +3 LEGACY POINTS</span>
            </div>
            <div class="spotlight-body">
              <div class="spotlight-combat-col">
                <div class="spotlight-icon-box">${passiveData.icon || '✨'}</div>
                <div>
                  <h4 class="spotlight-title">${escapeHtml(passiveData.passiveName)}</h4>
                  <p class="spotlight-effect">${escapeHtml(passiveData.passiveEffect)}</p>
                  <small class="spotlight-meta">Permanent character passive active in open world, dungeons, and raids.</small>
                </div>
              </div>
              <div class="spotlight-camp-col">
                <div class="spotlight-icon-box">⛺</div>
                <div>
                  <h4 class="spotlight-title">Wilderness Campfire Synergy</h4>
                  <p class="spotlight-effect">${escapeHtml(passiveData.campBonus || prof.campBuff?.effect || 'Crafts camp workstations providing 1-hour party buffs.')}</p>
                  <small class="spotlight-meta">Deployable at any open-world campfire station.</small>
                </div>
              </div>
            </div>
          </div>
        ` : ''}

        <div class="camp-perks-top-grid">
          <!-- Column 1: Legacy Points & Titles -->
          <div>
            <h4 class="camp-col-header">Legacy points and title</h4>
            <div class="camp-milestone-list">
              ${milestones.length === 0 ? '<div style="color: #94a3b8; font-size: 0.85rem; padding: 1rem 0;">No milestone titles recorded for this skill.</div>' : milestones.map(m => `
                <div class="camp-milestone-item">
                  <img src="${getIconUrl(m.icon)}" alt="${escapeHtml(m.title)}" class="camp-item-icon" loading="lazy" />
                  <div class="camp-item-text">
                    <strong>${escapeHtml(m.title)}</strong>
                    <span>${escapeHtml(m.desc)}</span>
                  </div>
                  <span class="camp-item-reward">${escapeHtml(m.reward)}</span>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Column 2: At Camp Stations -->
          <div>
            <h4 class="camp-col-header">At camp</h4>
            <div class="camp-station-list">
              ${atCamp.length === 0 ? '<div style="color: #94a3b8; font-size: 0.85rem; padding: 1rem 0;">No campfire stations available for this skill.</div>' : atCamp.map(c => `
                <div class="camp-station-item">
                  <img src="${getIconUrl(c.icon)}" alt="${escapeHtml(c.name)}" class="camp-item-icon" loading="lazy" />
                  <div class="camp-item-text">
                    <strong>${escapeHtml(c.name)}</strong>
                    <span>${escapeHtml(c.desc)}</span>
                  </div>
                  <span class="camp-item-skill">${escapeHtml(c.skill)}</span>
                </div>
              `).join('')}
              <a href="#camping" class="camp-how-link" onclick="const b = document.querySelector('.nav-tab-btn[data-tab=\\'camping\\']'); if (b) b.click();">How Camping works ›</a>
            </div>
          </div>
        </div>

        <!-- Bottom: Legacy Perks -->
        <div class="legacy-perks-section">
          <h4 class="camp-col-header">Legacy perks</h4>
          <div class="legacy-perks-list">
            ${legacyPerks.length === 0 ? '<div style="color: #94a3b8; font-size: 0.85rem; padding: 1rem 0;">No trade-specific legacy perks.</div>' : legacyPerks.map(p => `
              <div class="legacy-perk-card">
                <img src="${getIconUrl(p.icon)}" alt="${escapeHtml(p.name)}" class="perk-card-icon" loading="lazy" />
                <div class="perk-card-content">
                  <strong>${escapeHtml(p.name)}</strong>
                  <p>${escapeHtml(p.effect)}</p>
                  <small class="perk-card-meta">${escapeHtml(p.meta)}</small>
                </div>
                <button type="button" class="perk-plan-action" onclick="const b = document.querySelector('.nav-tab-btn[data-tab=\\'legacy\\']'); if (b) b.click();" title="Open Legacy Tree Planner">Plan it ›</button>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;

    attachTooltipListeners(container, prof);
  }

  /* ==========================================================================
     SPECIALIZED TAB: CAMPING SYSTEM (FOREVER CHANGES)
     ========================================================================== */
  function renderCampingProfessionTab(container, prof) {
    if (currentSubTab === 'buffs') {
      renderCampingBuffs(container, prof);
    } else if (currentSubTab === 'upgrades') {
      renderCampingUpgrades(container, prof);
    } else if (currentSubTab === 'perks') {
      renderCampingPerks(container, prof);
    } else if (currentSubTab === 'leveling') {
      renderLevelingTab(container, prof);
    } else if (currentSubTab === 'shopping') {
      renderShoppingTab(container, prof);
    } else {
      renderCampingGuide(container, prof);
    }
    attachTooltipListeners(container, prof);
  }

  function renderCampingGuide(container, prof) {
    const steps = prof.howItWorks?.steps || [];
    const questNote = prof.howItWorks?.questNote || '';
    const campfires = prof.campfires || [];

    container.innerHTML = `
      <!-- Top System Explanation -->
      <div class="leveling-header-block">
        <div class="leveling-header-title">
          <h3>HOW CAMPING WORKS</h3>
          <p>${escapeHtml(prof.summary || '')}</p>
        </div>
        <div class="leveling-header-meta">
          <a href="#camping" class="prof-pill-link" onclick="const b = document.querySelector('.nav-tab-btn[data-tab=\\'camping\\']'); if (b) b.click();">
            <span>🏕️</span> Open Wilderness Hub ›
          </a>
        </div>
      </div>

      <!-- Quick Jump Banner to Leveling & Shopping -->
      <div class="camping-profession-link-banner" style="margin-bottom: 1.5rem; background: rgba(245, 158, 11, 0.08); border: 1px solid rgba(245, 158, 11, 0.35); border-radius: var(--radius-md, 8px); padding: 1rem 1.25rem; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1rem;">
        <div style="display: flex; align-items: center; gap: 0.85rem;">
          <span style="font-size: 2rem;">📈</span>
          <div>
            <strong style="color: #fcd34d; font-size: 1.05rem;">Looking for the 1–225 Camping Leveling Roadmap?</strong>
            <p style="margin: 0.2rem 0 0 0; font-size: 0.85rem; color: #cbd5e1;">Step-by-step bracket roadmap, interactive checklist, and complete material shopping lists.</p>
          </div>
        </div>
        <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
          <button type="button" class="quick-link-chip" style="background: rgba(243, 192, 67, 0.2); border: 1px solid var(--border-gold-bright, #d4af37); color: #fff; padding: 0.45rem 0.9rem; font-weight: 600; cursor: pointer; border-radius: 4px;" onclick="if (window.WOW_PROFESSIONS) { window.WOW_PROFESSIONS.selectProfession('camping', 'leveling'); }">
            <span>📈</span> Leveling Guide (1–225) ›
          </button>
          <button type="button" class="quick-link-chip" style="background: rgba(255, 255, 255, 0.08); border: 1px solid var(--border-subtle); color: #cbd5e1; padding: 0.45rem 0.85rem; font-size: 0.82rem; cursor: pointer; border-radius: 4px;" onclick="if (window.WOW_PROFESSIONS) { window.WOW_PROFESSIONS.selectProfession('camping', 'shopping'); }">
            <span>🛒</span> Shopping List
          </button>
        </div>
      </div>

      <!-- 3 Core Steps -->
      <div class="camp-steps-grid">
        ${steps.map(s => `
          <div class="camp-step-card">
            <div class="camp-step-head">
              <span class="camp-step-badge">${s.num}</span>
              <img src="${getIconUrl(s.icon)}" alt="${escapeHtml(s.title)}" class="camp-step-icon" loading="lazy" />
              <h4 class="camp-step-title">${escapeHtml(s.title)}</h4>
            </div>
            <p class="camp-step-desc">${escapeHtml(s.desc)}</p>
          </div>
        `).join('')}
      </div>

      <!-- Quest Onboarding Callout -->
      ${questNote ? `
        <div class="camp-quest-box">
          <span class="q-icon">📜</span>
          <div class="camp-quest-text">
            <strong>Starter Quest: The Great Outdoors (Level 5+)</strong>
            <p>${escapeHtml(questNote)}</p>
          </div>
        </div>
      ` : ''}

      <!-- Crafted Campfire Kits -->
      <div class="section-heading-bar" style="margin-bottom: 1rem;">
        <div>
          <h2><span>🔥</span> Crafted Campfire Kits (${campfires.length} Tiers)</h2>
          <p class="section-subtext">Cooks craft campfire kits from wood harvested across Azeroth. Each tier expands object capacity and placement limits</p>
        </div>
      </div>

      <div class="campfires-grid">
        ${campfires.map(c => `
          <div class="campfire-card q${c.quality || 1} camp-tooltip-item" 
               data-item-name="${escapeHtml(c.name)}" 
               data-quality="${c.quality || 1}" 
               data-desc="${escapeHtml(c.desc)}" 
               data-req="${escapeHtml(c.skillReq)}"
               data-effect="Burns for 15 minutes. Holds ${c.capacity} profession stations.">
            <div class="campfire-card-head">
              <img src="${getIconUrl(c.icon)}" alt="${escapeHtml(c.name)}" class="campfire-card-icon q${c.quality || 1}" loading="lazy" />
              <div class="campfire-card-info">
                <h4 class="q${c.quality || 1}">${escapeHtml(c.name)}</h4>
                <small>${escapeHtml(c.skillReq)}</small>
              </div>
              <span class="campfire-capacity-badge">Holds ${c.capacity} Objects</span>
            </div>
            <p style="margin: 0; font-size: 0.88rem; color: #cbd5e1; line-height: 1.4;">${escapeHtml(c.desc)}</p>
            <div style="border-top: 1px solid rgba(255,255,255,0.06); padding-top: 0.75rem;">
              <div style="font-size: 0.72rem; text-transform: uppercase; color: #94a3b8; margin-bottom: 0.4rem; font-weight: 700;">Craft Reagents:</div>
              <div class="campfire-reagents-list">
                ${(c.reagents || []).map(r => `
                  <div class="reagent-chip" data-item-id="${r.itemId}" data-item-name="${escapeHtml(r.name)}" title="${escapeHtml(r.name)}">
                    <img src="${getIconUrl(r.icon)}" alt="${escapeHtml(r.name)}" loading="lazy" />
                    <span>${r.count}x ${escapeHtml(r.name)}</span>
                  </div>
                `).join('')}
                ${c.blueprint ? `
                  <span class="step-badge-orange" style="margin-left: auto; font-size: 0.72rem;">${escapeHtml(c.blueprint.text)}</span>
                ` : '<span class="step-badge-green" style="margin-left: auto; font-size: 0.72rem;">Trainer Taught</span>'}
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  function renderCampingBuffs(container, prof) {
    const buffObjects = prof.buffObjects || [];
    const q = (searchQuery || '').toLowerCase().trim();

    const filtered = buffObjects.filter(b => {
      if (!q) return true;
      return (
        (b.object && b.object.toLowerCase().includes(q)) ||
        (b.profName && b.profName.toLowerCase().includes(q)) ||
        (b.gives && b.gives.toLowerCase().includes(q)) ||
        (b.restriction && b.restriction.toLowerCase().includes(q)) ||
        (b.reagents && b.reagents.some(r => r.name && r.name.toLowerCase().includes(q)))
      );
    });

    container.innerHTML = `
      <!-- Toolbar -->
      <div class="prof-toolbar">
        <div style="display: flex; gap: 0.75rem; align-items: center; flex-wrap: wrap; flex: 1;">
          <input type="text" id="prof-buff-search-input" aria-label="Search camp buff objects and professions" class="prof-search-input" placeholder="Search buff, profession (e.g. Alchemy, Fishing), or reagent..." value="${escapeHtml(searchQuery)}" />
          <span style="font-size: 0.85rem; color: #94a3b8;">Showing ${filtered.length} of ${buffObjects.length} Buff Objects</span>
        </div>
        <div style="font-size: 0.8rem; color: #38bdf8; display: flex; align-items: center; gap: 0.4rem;">
          <span>⏳</span> 1-Hour Cooldown · 1-Hour Party Buff
        </div>
      </div>

      <!-- Heading -->
      <div class="section-heading-bar" style="margin-bottom: 1.25rem;">
        <div>
          <h2><span>✨</span> 11 Skill 20 Camp Buff Objects</h2>
          <p class="section-subtext">Every profession crafts a station from skill 20 providing 80% potency of class blessings for 1 hour to anyone who rests at camp</p>
        </div>
      </div>

      <!-- Buffs Grid -->
      <div class="camp-buffs-grid">
        ${filtered.map(b => `
          <div class="camp-buff-card camp-tooltip-item"
               data-item-name="${escapeHtml(b.object)}"
               data-quality="2"
               data-desc="${escapeHtml(b.gives)}"
               data-req="${escapeHtml(b.profName)} (Skill ${b.skillReq})"
               data-effect="Provides ${escapeHtml(b.gives)} to party members who rest by the fire for 1 minute. ${escapeHtml(b.restriction)}">
            <div>
              <div class="camp-buff-head">
                <div class="camp-buff-main">
                  <img src="${getIconUrl(b.icon)}" alt="${escapeHtml(b.object)}" class="camp-buff-icon q2" loading="lazy" />
                  <div>
                    <h4 style="margin: 0; font-size: 1.1rem; color: #fff;">${escapeHtml(b.object)}</h4>
                    <small style="color: #94a3b8; font-size: 0.78rem;">Requires ${escapeHtml(b.profName)} ${b.skillReq}</small>
                  </div>
                </div>
                <span class="camp-buff-prof-tag">
                  <img src="${getIconUrl(b.profIcon)}" alt="${escapeHtml(b.profName)}" loading="lazy" />
                  <span>${escapeHtml(b.profName)}</span>
                </span>
              </div>

              <div style="margin-top: 1rem; display: flex; flex-direction: column; gap: 0.6rem;">
                <div class="camp-buff-stats-box">
                  <div class="camp-buff-stats-title">Campfire Aura Granted (1 Hour):</div>
                  <div class="camp-buff-stats-text">${escapeHtml(b.gives)}</div>
                </div>

                ${b.restriction ? `
                  <div class="camp-buff-restriction-pill">
                    <span>⚠️</span>
                    <span>${escapeHtml(b.restriction)}</span>
                  </div>
                ` : ''}
              </div>
            </div>

            <div style="border-top: 1px solid rgba(255,255,255,0.06); padding-top: 0.75rem; margin-top: 0.5rem;">
              <div style="font-size: 0.72rem; text-transform: uppercase; color: #94a3b8; margin-bottom: 0.4rem; font-weight: 700;">Craft Reagents:</div>
              <div class="campfire-reagents-list">
                ${(b.reagents || []).map(r => `
                  <div class="reagent-chip" data-item-id="${r.itemId}" data-item-name="${escapeHtml(r.name)}" title="${escapeHtml(r.name)}">
                    <img src="${getIconUrl(r.icon)}" alt="${escapeHtml(r.name)}" loading="lazy" />
                    <span>${r.count}x ${escapeHtml(r.name)}</span>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    `;

    const searchInput = container.querySelector('#prof-buff-search-input') || container.querySelector('#prof-search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value;
        renderCampingBuffs(container, prof);
        attachTooltipListeners(container, prof);
      });
    }
  }

  function renderCampingUpgrades(container, prof) {
    const upgrades = prof.upgrades || [];

    container.innerHTML = `
      <!-- Heading -->
      <div class="leveling-header-block">
        <div class="leveling-header-title">
          <h3>22 ADVANCED BLUEPRINT CAMP STATIONS</h3>
          <p>At skill 140 and 300, professions unlock permanent field workstations through blueprints. These replace the skill 20 object, retain its party buff, and unlock on-site advanced crafting, ore/herb spawns, or mobile repair services.</p>
        </div>
      </div>

      <!-- Matrix Table / Cards -->
      <div class="prof-matrix-table-wrap">
        <table class="prof-matrix-table">
          <thead>
            <tr>
              <th style="width: 180px;">Profession</th>
              <th style="width: 41%;">Skill 140 Station (Blueprint)</th>
              <th style="width: 41%;">Skill 300 Master Station (Blueprint)</th>
            </tr>
          </thead>
          <tbody>
            ${upgrades.map(u => `
              <tr>
                <td>
                  <div class="matrix-prof-col" data-slug="${u.profSlug}" title="View ${escapeHtml(u.profName)}">
                    <img src="${getIconUrl(u.profIcon)}" alt="${escapeHtml(u.profName)}" loading="lazy" />
                    <span>${escapeHtml(u.profName)}</span>
                  </div>
                </td>
                <td>
                  <div class="matrix-station-cell camp-tooltip-item" 
                       data-item-name="${escapeHtml(u.s140.name)}" 
                       data-quality="2" 
                       data-desc="${escapeHtml(u.s140.desc)}" 
                       data-req="${escapeHtml(u.s140.skill)}"
                       style="padding: 0.5rem 0; width: 100%;">
                    <img src="${getIconUrl(u.s140.icon)}" alt="${escapeHtml(u.s140.name)}" class="q2" loading="lazy" style="width: 32px; height: 32px;" />
                    <div>
                      <div style="display: flex; align-items: center; gap: 0.5rem;">
                        <strong style="color: #fff; font-size: 0.95rem;">${escapeHtml(u.s140.name)}</strong>
                        <span class="step-badge-orange" style="font-size: 0.7rem;">${escapeHtml(u.s140.skill)}</span>
                      </div>
                      <small style="display: block; margin-top: 0.2rem; color: #94a3b8; font-size: 0.8rem; line-height: 1.4;">${escapeHtml(u.s140.desc)}</small>
                    </div>
                  </div>
                </td>
                <td>
                  <div class="matrix-station-cell camp-tooltip-item" 
                       data-item-name="${escapeHtml(u.s300.name)}" 
                       data-quality="3" 
                       data-desc="${escapeHtml(u.s300.desc)}" 
                       data-req="${escapeHtml(u.s300.skill)}"
                       style="padding: 0.5rem 0; width: 100%;">
                    <img src="${getIconUrl(u.s300.icon)}" alt="${escapeHtml(u.s300.name)}" class="q3" loading="lazy" style="width: 32px; height: 32px;" />
                    <div>
                      <div style="display: flex; align-items: center; gap: 0.5rem;">
                        <strong style="color: #0070dd; font-size: 0.95rem;">${escapeHtml(u.s300.name)}</strong>
                        <span class="step-badge-green" style="font-size: 0.7rem;">${escapeHtml(u.s300.skill)}</span>
                      </div>
                      <small style="display: block; margin-top: 0.2rem; color: #94a3b8; font-size: 0.8rem; line-height: 1.4;">${escapeHtml(u.s300.desc)}</small>
                    </div>
                  </div>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;
  }

  function renderCampingPerks(container, prof) {
    const legacyPerks = prof.legacyPerks || [];
    const rules = prof.rules || [];

    container.innerHTML = `
      <!-- Top: Legacy Perks -->
      <div class="leveling-header-block">
        <div class="leveling-header-title">
          <h3>CAMPING LEGACY PERKS</h3>
          <p>Permanent account-wide legacy tree talents that enhance campfire cooldowns, buff durations, and reagent mechanics across all your characters.</p>
        </div>
      </div>

      <div class="legacy-perks-list" style="margin-bottom: 2.5rem;">
        ${legacyPerks.map(p => `
          <div class="legacy-perk-card">
            <img src="${getIconUrl(p.icon)}" alt="${escapeHtml(p.name)}" class="perk-card-icon" loading="lazy" />
            <div class="perk-card-content">
              <strong style="font-size: 1.05rem; color: #fff;">${escapeHtml(p.name)}</strong>
              <p style="margin: 0.3rem 0; font-size: 0.88rem; color: #cbd5e1; line-height: 1.5;">${escapeHtml(p.effect)}</p>
              <small class="perk-card-meta">${escapeHtml(p.meta)}</small>
            </div>
            <button type="button" class="perk-plan-action" onclick="const b = document.querySelector('.nav-tab-btn[data-tab=\\'legacy\\']'); if (b) b.click();" title="Open Legacy Tree Planner">Plan it ›</button>
          </div>
        `).join('')}
      </div>

      <!-- Bottom: 6 Keep In Mind Rules -->
      <div class="section-heading-bar" style="margin-bottom: 1.25rem;">
        <div>
          <h2><span>⚖️</span> Core Camping Rules & Stacking Mechanics</h2>
          <p class="section-subtext">Essential mechanical guidelines for campfire placement, rested experience generation, and faction alignment</p>
        </div>
      </div>

      <div class="camp-rules-grid">
        ${rules.map(r => `
          <div class="camp-rule-card">
            <h4><span>📌</span> ${escapeHtml(r.title)}</h4>
            <p>${escapeHtml(r.text)}</p>
          </div>
        `).join('')}
      </div>
    `;
  }

  /* ==========================================================================
     SUBTAB 5: MERCHANT'S FAVOR RECIPES & CAMPS
     ========================================================================== */
  function renderFavorTab(container, prof) {
    const favor = prof.favor || {};
    const recipes = favor.recipes || [];
    const camps = favor.camps || {};

    container.innerHTML = `
      <!-- Faction Camp Locations -->
      <div class="favor-camps-row">
        <div class="favor-camp-card alliance">
          <h4>🦁 Alliance: Azeroth Commerce Authority</h4>
          <div class="favor-camp-meta">
            <div><strong>Location:</strong> ${camps.a ? camps.a.place + ', ' + camps.a.zone : 'Three Corners, Redridge Mountains'}</div>
            <div><strong>Coordinates:</strong> ${camps.a ? camps.a.x + ', ' + camps.a.y : '10.5, 72.7'}</div>
            <div><strong>Quartermaster:</strong> ${camps.a ? camps.a.npc : 'Nina Surefire'}</div>
          </div>
        </div>

        <div class="favor-camp-card horde">
          <h4>⚔️ Horde: Durotar Supply and Logistics</h4>
          <div class="favor-camp-meta">
            <div><strong>Location:</strong> ${camps.h ? camps.h.place + ', ' + camps.h.zone : 'outside Crossroads, The Barrens'}</div>
            <div><strong>Coordinates:</strong> ${camps.h ? camps.h.x + ', ' + camps.h.y : '49.7, 29.4'}</div>
            <div><strong>Quartermaster:</strong> ${camps.h ? camps.h.npc : 'Apothecary Durelle'}</div>
          </div>
        </div>
      </div>

      <!-- Favor Recipes Grid -->
      <div class="section-heading-bar" style="margin-bottom: 1rem;">
        <div>
          <h2><span>📦</span> Trade Camp Favor Recipes (${recipes.length})</h2>
          <p class="section-subtext">Filled supply crates returned to your faction's trade outpost unlock exclusive craft formulas</p>
        </div>
      </div>

      <div class="favor-tiers-container">
        ${renderFavorTierBlocks(recipes, prof)}
      </div>

      <!-- Waylaid Supply Crate Tiers Breakdown -->
      <div class="section-heading-bar" style="margin-top: 2rem; margin-bottom: 1rem;">
        <div>
          <h2><span>📦</span> Waylaid Supply Crate Turn-In Tiers</h2>
          <p class="section-subtext">Recovered from world chests and mobs. Fill with gathered or crafted components before turning in to your Quartermaster</p>
        </div>
      </div>

      <div class="favor-crates-grid">
        ${((window.WOW_ATLAS_DATA?.merchantsFavor?.crateTiers) || [
          { tier: 'Apprentice (White)', levelReq: 10, favor: 5, money: '2s 50c', materials: 'Raw Gathered Materials (20 Peacebloom, 20 Copper Ore, 40 Linen)' },
          { tier: 'Apprentice (Green)', levelReq: 10, favor: 10, money: '5s 00c', materials: 'Crafted Components (2 Cured Light Hide, 20 Bolt of Linen, 20 Copper Bar)' },
          { tier: 'Journeyman (White)', levelReq: 10, favor: 10, money: '5s 00c', materials: 'Intermediate Raw Materials (10 Stranglekelp, 20 Iron Ore, 20 Wool Cloth)' },
          { tier: 'Journeyman (Green)', levelReq: 10, favor: 20, money: '10s 00c', materials: 'Intermediate Crafted Goods (6 Bolt of Woolen Cloth, 20 Iron Bar)' },
          { tier: 'Expert (White/Green)', levelReq: 20, favor: '25–35 (Est.)', money: '15s–25s', materials: 'Mithril Ore, Mageweave, Vision Dust, Mithril Bars' },
          { tier: 'Artisan (White/Green)', levelReq: 35, favor: '45–60 (Est.)', money: '35s–50s', materials: 'Thorium Ore, Runecloth, Dream Dust, Truesilver Bars' }
        ]).map(cr => `
          <div class="favor-crate-card">
            <div class="favor-crate-head">
              <span class="favor-crate-badge">${escapeHtml(cr.tier)}</span>
              <span class="favor-crate-lvl">Req Lvl ${cr.levelReq}</span>
            </div>
            <div class="favor-crate-rewards">
              <span class="favor-reward-chip">★ ${escapeHtml(String(cr.favor))} Favor</span>
              <span class="favor-reward-chip money">🪙 ${escapeHtml(cr.money)}</span>
            </div>
            <p class="favor-crate-mats">${escapeHtml(cr.materials)}</p>
          </div>
        `).join('')}
      </div>

      <!-- Trade Writs System Callout -->
      <div class="favor-writs-card">
        <div class="favor-writs-head">
          <span style="font-size: 1.5rem;">📜</span>
          <div>
            <h4>Daily Trade Writs System (150 Total Orders)</h4>
            <p>Crafting professions (Alchemy, Blacksmithing, Engineering, Leatherworking, Tailoring) receive 30 daily work orders per profession across Journeyman (100–170), Expert (180–225), and Artisan (230–310) tiers.</p>
          </div>
        </div>
        <div class="favor-writs-footer">
          <div><strong>Daily Payout:</strong> 22s to 45s Coin Pouch per order + Camp Faction Reputation</div>
          <div><strong>Writs Reroll:</strong> Swap unwanted writs with the <em>Forger's Quill</em> (sold by the Uncertified Scribe south of Three Corners).</div>
        </div>
      </div>
    `;

    attachTooltipListeners(container, prof);
  }

  function renderFavorTierBlocks(recipes, prof = {}) {
    if (!recipes || recipes.length === 0) {
      return `
        <div style="text-align: center; padding: 3rem; color: #94a3b8; background: rgba(15,23,42,0.5); border-radius: 8px;">
          No Merchant's Favor turn-in recipes for this trade.
        </div>
      `;
    }

    const tierMap = new Map();
    recipes.forEach(r => {
      const c = r.cost ? (typeof r.cost === 'number' ? `${r.cost} Merchant's Favor` : r.cost) : '1 Merchant\'s Favor';
      if (!tierMap.has(c)) {
        tierMap.set(c, []);
      }
      tierMap.get(c).push(r);
    });

    return Array.from(tierMap.entries()).map(([costLabel, items]) => {
      const minSkill = Math.min(...items.map(i => i.requiredSkill || 1));
      const maxSkill = Math.max(...items.map(i => i.requiredSkill || 1));
      const skillSpan = minSkill === maxSkill ? `Skill ${minSkill}+` : `Skill ${minSkill} to ${maxSkill}`;
      return `
        <div class="favor-tier-block">
          <div class="favor-tier-header">
            <h4>📦 ${escapeHtml(costLabel)} <small>· ${skillSpan}</small></h4>
          </div>
          <div class="recipe-grid">
            ${items.map(f => {
              const cleanName = (f.name || '').replace(/^(Recipe|Formula|Plans|Pattern|Schematic|Manual):\s*/i, '').trim();
              const match = (prof.recipes || []).find(r => 
                r.name && (
                  r.name.toLowerCase() === cleanName.toLowerCase() ||
                  r.name.toLowerCase() === (f.name || '').toLowerCase() ||
                  (r.source && r.source.toLowerCase().includes((f.name || '').toLowerCase()))
                )
              );
              const quality = f.quality || match?.quality || 1;
              const skillReq = f.requiredSkill || match?.learn || 1;
              const skillPercent = Math.min(100, Math.max(4, Math.round((skillReq / 300) * 100)));
              const reagents = match?.reagents || f.reagents || [];
              const effectText = f.desc || match?.effect || match?.source || '';
              const iconUrl = getIconUrl(f.icon || match?.icon, f.name, 'Merchant Favor');
              const costDisplay = typeof f.cost === 'number' ? `${f.cost} Merchant's Favor` : (f.cost || costLabel);

              const reagentsHtml = reagents.length ? `
                <div class="recipe-reagents-row" style="margin-top: 0.55rem;">
                  ${reagents.map(mat => `
                    <span class="reagent-chip" title="${mat.count}x ${escapeHtml(mat.name)}" data-item-id="${mat.id || ''}" data-item-name="${escapeHtml(mat.name)}">
                      <img src="${getIconUrl(mat.icon)}" alt="${escapeHtml(mat.name)}" loading="lazy" />
                      <span class="reagent-count">${mat.count}x</span>
                      <span class="q${mat.quality || 1}">${escapeHtml(mat.name)}</span>
                    </span>
                  `).join('')}
                </div>
              ` : '';

              return `
                <div class="recipe-card favor-recipe-card" 
                     data-recipe-name="${escapeHtml(f.name)}" 
                     data-crafted-name="${escapeHtml(cleanName)}" 
                     data-quality="${quality}" 
                     data-effect="${escapeHtml(effectText)}" 
                     data-skill="${skillReq}" 
                     data-cost="${escapeHtml(costDisplay)}"
                     data-prof="${escapeHtml(prof.name || 'Trade')}">
                  <div>
                    <div class="recipe-card-header">
                      <img src="${iconUrl}" alt="${escapeHtml(f.name)}" class="recipe-item-icon q${quality}" loading="lazy" />
                      <div class="recipe-info">
                        <h4 class="recipe-title q${quality}">${escapeHtml(f.name)}</h4>
                        ${effectText ? `<div class="recipe-effect">${escapeHtml(effectText)}</div>` : ''}
                      </div>
                    </div>

                    <!-- Interactive Skill Requirement Track with Hover Tooltip -->
                    <div class="favor-skill-row">
                      <span class="recipe-skill-badge skill-orange" title="Requires ${escapeHtml(prof.name || 'Trade')} (${skillReq})">Skill ${skillReq}+</span>
                      <div class="favor-skill-track" data-skill="${skillReq}" data-prof="${escapeHtml(prof.name || 'Trade')}">
                        <span class="favor-skill-fill" style="width: ${skillPercent}%;"></span>
                        <span class="favor-skill-cap-marker" style="left: 75%;" title="Beta Cap at 225"></span>
                      </div>
                    </div>

                    ${reagentsHtml}
                  </div>

                  <div class="recipe-source-line">
                    <span>Cost:</span>
                    <span class="recipe-source-badge" style="color: var(--text-gold); font-weight: 700;">${escapeHtml(costDisplay)}</span>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      `;
    }).join('');
  }

/* ==========================================================================
     CIRCUIT GATHERING ROUTE MAPS & INTERACTIVE OVERLAY MODAL
     ========================================================================== */
  const ZONE_MAP_IDS = {
  'Durotar': 14,
  'Elwynn Forest': 12,
  'Darkshore': 148,
  'Mulgore': 215,
  'The Barrens': 17,
  'Westfall': 40,
  'Loch Modan': 38,
  'Hillsbrad Foothills': 267,
  'Arathi Highlands': 45,
  'Thousand Needles': 400,
  'Badlands': 3,
  'Wetlands': 11,
  'The Hinterlands': 47,
  'Searing Gorge': 51,
  'Tanaris': 440,
  "Un'Goro Crater": 490,
  'Winterspring': 618,
  'Eastern Plaguelands': 139,
  'Silithus': 1377,
  'Tirisfal Glades': 85,
  'Teldrassil': 141,
  'Silverpine Forest': 130,
  'Stonetalon Mountains': 406,
  'Redridge Mountains': 44,
  'Swamp of Sorrows': 8,
  'Alterac Mountains': 36,
  'Stranglethorn Vale': 33,
  'Felwood': 361,
  'Feralas': 357,
  'Western Plaguelands': 28
};

const CIRCUIT_ROUTE_PATHS = {
  // === 20 MINING ROUTES ===
  copper_durotar: [
    { x: 52.0, y: 43.0, label: 'Razor Hill (Start)' },
    { x: 56.5, y: 51.5, label: 'Tiragarde Keep Cliffs' },
    { x: 57.2, y: 63.0, label: 'Eastern Coastal Ledges' },
    { x: 55.5, y: 74.5, label: "Sen'jin Village Outskirts" },
    { x: 48.0, y: 79.5, label: 'Kolkar Crag Southern Ridge' },
    { x: 42.5, y: 69.0, label: 'Valley of Trials Outer Wall' },
    { x: 40.5, y: 54.0, label: 'Southfury River Cliffs' },
    { x: 43.5, y: 40.5, label: 'Thunder Ridge Foothills' },
    { x: 48.5, y: 37.5, label: 'Drygulch Ravine Ledge' },
    { x: 52.0, y: 43.0, label: 'Return to Razor Hill' }
  ],
  copper_elwynn: [
    { x: 38.0, y: 64.0, label: 'Goldshire Outskirts (Start)' },
    { x: 33.5, y: 72.0, label: 'Stonefield Farm Bluffs' },
    { x: 40.0, y: 79.0, label: 'Fargodeep Mine Perimeter' },
    { x: 50.5, y: 80.5, label: 'Maclure Vineyards Ridge' },
    { x: 62.0, y: 75.0, label: 'Brackwell Pumpkin Patch Hills' },
    { x: 65.0, y: 62.0, label: 'Tower of Azora Foothills' },
    { x: 61.5, y: 52.0, label: 'Jasperlode Mine Rim' },
    { x: 52.5, y: 50.5, label: 'Crystal Lake Northern Ridge' },
    { x: 43.5, y: 49.5, label: 'Northshire River Cliffs' },
    { x: 33.5, y: 54.5, label: 'Mirror Lake Orchard Cliffs' },
    { x: 38.0, y: 64.0, label: 'Return to Goldshire' }
  ],
  copper_darkshore: [
    { x: 42.0, y: 40.0, label: "Bashal'Aran Ridge (Start)" },
    { x: 47.0, y: 46.5, label: 'Eastern Mountain Wall' },
    { x: 46.0, y: 59.0, label: "Ameth'Aran Ruins Rim" },
    { x: 44.5, y: 73.5, label: 'Grove of the Ancients Perimeter' },
    { x: 39.5, y: 85.0, label: "Master's Glaive Excavation Rim" },
    { x: 34.5, y: 78.5, label: "Remtravel's Excavation Boundary" },
    { x: 35.0, y: 64.0, label: 'Coastal Tree Line Pass' },
    { x: 37.0, y: 49.0, label: 'Auberdine Southern Outskirts' },
    { x: 42.0, y: 40.0, label: "Return to Bashal'Aran" }
  ],
  copper_mulgore: [
    { x: 48.0, y: 60.0, label: 'Bloodhoof Village (Start)' },
    { x: 52.5, y: 75.0, label: 'Red Cloud Mesa Outer Wall' },
    { x: 37.0, y: 71.5, label: 'Palemane Gnoll Rock Ridge' },
    { x: 31.5, y: 55.0, label: 'Western Mountain Cliffs' },
    { x: 34.5, y: 36.0, label: 'Windfury Crag Foothills' },
    { x: 48.0, y: 27.5, label: 'Northern Plateau Ridge' },
    { x: 60.5, y: 45.0, label: 'Venture Co. Mine Perimeter' },
    { x: 59.5, y: 61.5, label: 'Ravaged Caravan East Wall' },
    { x: 48.0, y: 60.0, label: 'Return to Bloodhoof' }
  ],
  tin_barrens: [
    { x: 51.0, y: 30.0, label: 'The Crossroads (Start)' },
    { x: 45.0, y: 22.5, label: 'Forgotten Pools Ridge' },
    { x: 48.5, y: 14.5, label: 'Drygulch Border Hills' },
    { x: 56.5, y: 13.5, label: 'Sludge Fen Mountain Ledge' },
    { x: 63.0, y: 21.0, label: 'Boulder Lode Mine Rim' },
    { x: 61.5, y: 35.0, label: 'Ratchet Mountain Pass' },
    { x: 55.0, y: 42.0, label: 'Stagnant Oasis Bluffs' },
    { x: 47.5, y: 36.0, label: 'Dreadmist Peak Foothills' },
    { x: 51.0, y: 30.0, label: 'Return to Crossroads' }
  ],
  tin_westfall: [
    { x: 53.0, y: 53.0, label: 'Sentinel Hill (Start)' },
    { x: 54.0, y: 34.0, label: "Saldean's & Jansen Farm Hills" },
    { x: 42.0, y: 26.0, label: 'Northern Longshore Bluffs' },
    { x: 33.0, y: 43.0, label: 'Gold Coast Quarry Cliffs' },
    { x: 30.0, y: 63.0, label: "Demont's Place Coastal Ledges" },
    { x: 33.5, y: 79.5, label: 'Westfall Lighthouse Cliffs' },
    { x: 45.0, y: 82.0, label: 'Moonbrook & Deadmines Exterior' },
    { x: 56.5, y: 73.5, label: 'Dagger Hills Mountain Wall' },
    { x: 59.5, y: 59.0, label: 'Dust Plains Eastern Ridge' },
    { x: 53.0, y: 53.0, label: 'Return to Sentinel Hill' }
  ],
  tin_loch_modan: [
    { x: 35.5, y: 48.5, label: 'Thelsamar Valley (Start)' },
    { x: 35.0, y: 23.5, label: 'Silver Stream Mine Rim' },
    { x: 48.5, y: 16.5, label: 'Stonewrought Dam Base Ledges' },
    { x: 67.5, y: 27.5, label: "Mo'grosh Stronghold Cliffs" },
    { x: 75.5, y: 50.0, label: 'Eastern Mountain Perimeter' },
    { x: 66.5, y: 67.5, label: "Ironband's Excavation Rim" },
    { x: 44.0, y: 69.0, label: 'Grizzlepaw Ridge Caves' },
    { x: 26.5, y: 62.0, label: 'Valley of Kings Pass' },
    { x: 35.5, y: 48.5, label: 'Return to Thelsamar' }
  ],
  tin_hillsbrad: [
    { x: 50.0, y: 58.0, label: 'Southshore Outskirts (Start)' },
    { x: 66.5, y: 67.0, label: 'Dun Garok Coastal Hills' },
    { x: 81.0, y: 56.0, label: "Thoradin's Wall Ridge" },
    { x: 75.5, y: 38.5, label: 'Durnholde Keep Outer Rim' },
    { x: 58.5, y: 31.0, label: 'Tarren Mill Northern Foothills' },
    { x: 39.0, y: 36.5, label: 'Northpoint Tower Ridge' },
    { x: 31.5, y: 54.0, label: 'Azurelode Mine Perimeter' },
    { x: 39.5, y: 64.0, label: 'Western Strand Coastal Cliffs' },
    { x: 50.0, y: 58.0, label: 'Return to Southshore' }
  ],
  iron_arathi: [
    { x: 44.0, y: 32.0, label: 'Refuge Pointe North Ridge (Start)' },
    { x: 58.0, y: 27.5, label: 'Boulderfist Outpost Wall' },
    { x: 74.0, y: 34.5, label: 'Hammerfall Outer Cliffs' },
    { x: 72.0, y: 55.5, label: "Go'Shek Farm Mountain Rim" },
    { x: 65.5, y: 72.0, label: 'Witherbark Village Ledges' },
    { x: 44.0, y: 75.0, label: 'Southern Gorge Boundary' },
    { x: 26.0, y: 60.5, label: 'Stromgarde Keep Outer Wall' },
    { x: 26.5, y: 40.0, label: "Thoradin's Wall Ridge" },
    { x: 34.5, y: 28.5, label: 'Northfold Manor Mountain Ridge' },
    { x: 44.0, y: 32.0, label: 'Return to Refuge Pointe Ridge' }
  ],
  iron_needles: [
    { x: 78.0, y: 75.0, label: 'Mirage Raceway (Start)' },
    { x: 80.5, y: 61.0, label: 'Shimmering Flats North Wall' },
    { x: 68.0, y: 58.5, label: 'Screeching Canyon Pass' },
    { x: 53.5, y: 52.0, label: 'Splithoof Crag Exterior' },
    { x: 49.0, y: 65.0, label: 'Freewind Post Pillar Base' },
    { x: 64.5, y: 82.5, label: 'Tahonda Ruins Rim' },
    { x: 75.5, y: 90.5, label: 'Rustmaul Digsite Ledges' },
    { x: 86.0, y: 81.5, label: 'Eastern Salt Basin Cliffs' },
    { x: 78.0, y: 75.0, label: 'Return to Mirage Raceway' }
  ],
  iron_badlands: [
    { x: 16.0, y: 44.0, label: 'Kargath Outskirts (Start)' },
    { x: 23.0, y: 30.0, label: 'Northwestern Canyon Wall' },
    { x: 38.5, y: 23.5, label: 'Angor Fortress Rim' },
    { x: 52.0, y: 18.5, label: 'Uldaman Exterior Ravine' },
    { x: 64.0, y: 30.5, label: "Hammertoe's Digsite Ledges" },
    { x: 58.0, y: 46.5, label: 'Dustwind Dig Canyon' },
    { x: 42.0, y: 51.0, label: 'Valley of Fangs North Ridge' },
    { x: 27.5, y: 49.5, label: 'Dustbelcher Gorge Rim' },
    { x: 16.0, y: 44.0, label: 'Return to Kargath' }
  ],
  iron_wetlands: [
    { x: 56.0, y: 42.0, label: "Greenwarden's Grove (Start)" },
    { x: 69.0, y: 36.0, label: 'Raptor Ridge Mountain Wall' },
    { x: 62.0, y: 25.0, label: 'Direforge Hill Cliffs' },
    { x: 48.0, y: 24.0, label: 'Dun Modr Southern Ledges' },
    { x: 41.5, y: 36.5, label: "Ironbeard's Tomb Ridge" },
    { x: 36.5, y: 50.5, label: "Whelgar's Excavation Rim" },
    { x: 50.0, y: 62.5, label: 'Thelgen Rock Spider Cave' },
    { x: 64.5, y: 57.5, label: 'Angerfang Encampment Foothills' },
    { x: 56.0, y: 42.0, label: "Return to Greenwarden's Grove" }
  ],
  mithril_badlands: [
    { x: 14.0, y: 48.0, label: 'Kargath Perimeter (Start)' },
    { x: 15.0, y: 62.5, label: "Apocryphan's Rest Cliffs" },
    { x: 21.0, y: 78.0, label: 'Camp Cagg Southern Wall' },
    { x: 46.5, y: 76.5, label: "Agmond's End Mountain Ridge" },
    { x: 66.0, y: 77.5, label: 'Mirage Flats Basin Rim' },
    { x: 82.0, y: 58.0, label: 'Lethlor Ravine Dragon Canyon' },
    { x: 75.5, y: 32.0, label: 'Camp Kosh Northeast Wall' },
    { x: 54.0, y: 18.0, label: 'Uldaman Canyon Approach' },
    { x: 35.0, y: 24.5, label: 'Angor Fortress Exterior' },
    { x: 14.0, y: 48.0, label: 'Return to Kargath' }
  ],
  mithril_hinterlands: [
    { x: 22.0, y: 48.0, label: 'Aerie Peak Foothills (Start)' },
    { x: 29.0, y: 34.0, label: 'Plaguemist Ravine Cliffs' },
    { x: 48.0, y: 38.0, label: "Agol'watha & Skulk Rock Ridge" },
    { x: 63.5, y: 29.5, label: 'Seradane Outer Mountain Wall' },
    { x: 76.5, y: 46.5, label: 'Overlook Cliffs Rim' },
    { x: 67.5, y: 67.0, label: "Jintha'Alor Exterior Base" },
    { x: 49.0, y: 69.5, label: 'Southern River Gorge Wall' },
    { x: 34.0, y: 61.5, label: "Shadra'Alor Temple Rim" },
    { x: 22.0, y: 48.0, label: 'Return to Aerie Peak' }
  ],
  mithril_searing_gorge: [
    { x: 38.0, y: 28.0, label: 'Thorium Point (Start)' },
    { x: 54.5, y: 31.5, label: 'Northern Cauldron Rim' },
    { x: 68.0, y: 38.0, label: 'Dustfire Valley Cliffs' },
    { x: 65.5, y: 58.0, label: 'Grimesilt Dig Perimeter' },
    { x: 61.0, y: 73.5, label: 'Tanner Camp Southern Wall' },
    { x: 43.5, y: 77.5, label: 'Blackchar Cave Foothills' },
    { x: 28.0, y: 69.0, label: 'Sea of Fire Magma Rim' },
    { x: 24.5, y: 47.0, label: 'Firewatch Ridge Cliffs' },
    { x: 38.0, y: 28.0, label: 'Return to Thorium Point' }
  ],
  mithril_tanaris: [
    { x: 51.0, y: 28.0, label: 'Gadgetzan Perimeter (Start)' },
    { x: 39.0, y: 29.0, label: "Zul'Farrak Outer Mountain Wall" },
    { x: 31.5, y: 46.5, label: 'Noxious Lair Western Rim' },
    { x: 29.5, y: 65.5, label: 'Thistleshrub Valley Cliffs' },
    { x: 40.0, y: 77.5, label: 'Southern Uldum Gate Ridge' },
    { x: 56.0, y: 73.0, label: 'Eastmoon Ruins Foothills' },
    { x: 66.5, y: 58.5, label: 'Southbreak Shore Cliffs' },
    { x: 68.0, y: 41.0, label: 'Lost Rigger Cove Mountain Wall' },
    { x: 60.0, y: 25.0, label: 'Noonshade Ruins Bluffs' },
    { x: 51.0, y: 28.0, label: 'Return to Gadgetzan' }
  ],
  thorium_ungoro: [
    { x: 46.0, y: 14.0, label: "Marshal's Stand (Start)" },
    { x: 64.5, y: 18.5, label: 'Fungal Rock Northern Wall' },
    { x: 75.5, y: 42.0, label: 'Eastern Crater Slopes' },
    { x: 70.5, y: 66.0, label: 'Ironstone Plateau Ledges' },
    { x: 55.5, y: 78.5, label: 'Slithering Scar Hive Rim' },
    { x: 38.0, y: 80.0, label: 'Terror Run Southern Wall' },
    { x: 28.5, y: 60.0, label: 'Golakka Hot Springs Slopes' },
    { x: 29.0, y: 36.0, label: 'Western Marsh Mountain Rim' },
    { x: 46.0, y: 14.0, label: "Return to Marshal's Stand" }
  ],
  thorium_winterspring: [
    { x: 60.0, y: 38.0, label: 'Everlook Outskirts (Start)' },
    { x: 52.0, y: 27.5, label: 'Starfall Village Foothills' },
    { x: 48.0, y: 16.5, label: 'Frostsaber Rock Slopes' },
    { x: 37.5, y: 34.5, label: 'Western Mountain Ridge' },
    { x: 47.5, y: 45.5, label: "Lake Kel'Theril Ruins Rim" },
    { x: 55.5, y: 56.0, label: 'Mazthoril Canyon Wall' },
    { x: 64.5, y: 61.5, label: 'Owl Wing Thicket Ridge' },
    { x: 68.5, y: 47.0, label: 'Ice Thistle Hills Perimeter' },
    { x: 60.0, y: 38.0, label: 'Return to Everlook' }
  ],
  thorium_epl: [
    { x: 79.0, y: 58.0, label: "Light's Hope Chapel (Start)" },
    { x: 62.0, y: 74.5, label: 'Lake Mereldar Southern Ridge' },
    { x: 37.5, y: 79.0, label: 'Darrowshire Mountain Foothills' },
    { x: 33.0, y: 56.0, label: 'Fungal Vale Western Cliffs' },
    { x: 31.0, y: 32.0, label: 'Plaguewood Outer Wall' },
    { x: 52.0, y: 21.5, label: 'Northpass Tower Mountain Wall' },
    { x: 74.5, y: 31.0, label: 'Noxious Glade Perimeter' },
    { x: 79.5, y: 44.0, label: 'Eastwall Tower Ridge' },
    { x: 79.0, y: 58.0, label: "Return to Light's Hope" }
  ],
  thorium_silithus: [
    { x: 51.0, y: 38.0, label: 'Cenarion Hold (Start)' },
    { x: 48.0, y: 20.5, label: "Hive'Ashi Northern Rim" },
    { x: 28.5, y: 34.5, label: 'Twilight Base Camp Ridge' },
    { x: 26.0, y: 56.0, label: "Hive'Zora Western Ledges" },
    { x: 38.0, y: 73.0, label: 'Bones of Grakkarond Border' },
    { x: 56.5, y: 79.5, label: "Hive'Regal Southern Wall" },
    { x: 64.5, y: 61.0, label: 'Southwind Village Cliffs' },
    { x: 65.5, y: 42.0, label: 'Staghelm Point Eastern Wall' },
    { x: 51.0, y: 38.0, label: 'Return to Cenarion Hold' }
  ],

  // === 28 HERBALISM ROUTES ===
  herb_durotar: [
    { x: 52.0, y: 43.0, label: 'Razor Hill (Start)' },
    { x: 54.5, y: 55.0, label: 'Tiragarde Keep Plains' },
    { x: 55.5, y: 68.5, label: "Sen'jin Village Approach" },
    { x: 50.0, y: 76.0, label: 'Southern Dirt Plains' },
    { x: 43.5, y: 68.0, label: 'Valley of Trials Hills' },
    { x: 41.0, y: 56.0, label: 'Southfury River Banks' },
    { x: 43.5, y: 45.0, label: 'Thunder Ridge Gullies' },
    { x: 48.0, y: 40.0, label: 'Drygulch Ravine Crags' },
    { x: 52.0, y: 43.0, label: 'Return to Razor Hill' }
  ],
  herb_elwynn: [
    { x: 42.0, y: 65.0, label: 'Goldshire (Start)' },
    { x: 45.0, y: 75.5, label: 'Fargodeep Forest Meadows' },
    { x: 54.5, y: 72.0, label: "Jerod's Landing Riverbank" },
    { x: 56.0, y: 60.0, label: 'Crystal Lake Shoreline' },
    { x: 50.5, y: 50.0, label: 'Northshire River Crossing' },
    { x: 41.0, y: 49.5, label: 'Westbrook Forest Border' },
    { x: 32.5, y: 55.0, label: 'Mirror Lake Tree Line' },
    { x: 34.5, y: 68.0, label: 'Stonefield Farm Meadows' },
    { x: 42.0, y: 65.0, label: 'Return to Goldshire' }
  ],
  herb_tirisfal: [
    { x: 59.0, y: 52.0, label: 'Brill (Start)' },
    { x: 66.5, y: 45.5, label: 'Stillwater Pond Banks' },
    { x: 73.5, y: 57.5, label: 'Balnir Farmstead Fields' },
    { x: 61.0, y: 68.0, label: 'Undercity Outer Moat' },
    { x: 46.5, y: 62.0, label: 'Nightmare Vale Clearing' },
    { x: 46.0, y: 48.0, label: 'Cold Hearth Manor Woods' },
    { x: 47.5, y: 36.0, label: 'Agamand Mills Plains' },
    { x: 56.5, y: 38.5, label: 'Whispering Gardens Groves' },
    { x: 59.0, y: 52.0, label: 'Return to Brill' }
  ],
  herb_teldrassil: [
    { x: 56.0, y: 58.0, label: 'Dolanaar (Start)' },
    { x: 56.5, y: 67.0, label: "Lake Al'Ameth Shoreline" },
    { x: 64.5, y: 61.0, label: 'Eastern Canopy Roots' },
    { x: 65.0, y: 49.5, label: 'Starbreeze Village Ruins' },
    { x: 56.0, y: 39.5, label: 'Wellspring River Banks' },
    { x: 46.5, y: 44.5, label: "Ban'ethil Hollow Border" },
    { x: 44.0, y: 56.0, label: 'Pools of Arlithrien' },
    { x: 49.5, y: 62.5, label: 'Oracle Glade Approach' },
    { x: 56.0, y: 58.0, label: 'Return to Dolanaar' }
  ],
  herb_barrens: [
    { x: 51.0, y: 30.0, label: 'The Crossroads (Start)' },
    { x: 55.5, y: 36.0, label: 'Eastern Savanna Plain' },
    { x: 55.5, y: 43.0, label: 'The Stagnant Oasis' },
    { x: 49.5, y: 44.0, label: 'Southern Oasis Trail' },
    { x: 45.5, y: 40.0, label: 'Lushwater Oasis' },
    { x: 44.5, y: 32.5, label: 'Wailing Caverns Approach' },
    { x: 45.0, y: 22.5, label: 'Forgotten Pools Oasis' },
    { x: 49.5, y: 23.0, label: 'Dreadmist Savanna' },
    { x: 51.0, y: 30.0, label: 'Return to Crossroads' }
  ],
  herb_westfall: [
    { x: 53.0, y: 53.0, label: 'Sentinel Hill (Start)' },
    { x: 46.0, y: 38.0, label: "Furlbrow's Pumpkin Farm" },
    { x: 34.0, y: 34.0, label: 'Longshore North (Stranglekelp)' },
    { x: 30.0, y: 52.0, label: 'Gold Coast Shoreline' },
    { x: 29.0, y: 71.0, label: "Demont's Place Beach" },
    { x: 41.5, y: 78.0, label: 'Moonbrook Hills (Briarthorn)' },
    { x: 53.5, y: 69.0, label: 'Dagger Hills Foothills' },
    { x: 56.5, y: 56.0, label: "Saldean's Farmland" },
    { x: 53.0, y: 53.0, label: 'Return to Sentinel Hill' }
  ],
  herb_loch_modan: [
    { x: 36.0, y: 48.0, label: 'Thelsamar Outskirts (Start)' },
    { x: 37.5, y: 31.0, label: 'Algaz Station Valley' },
    { x: 46.5, y: 20.5, label: 'Stonewrought Dam Approach' },
    { x: 51.5, y: 34.5, label: 'Northwest Loch Shoreline' },
    { x: 52.0, y: 53.5, label: 'Southwest Loch Reeds' },
    { x: 45.5, y: 65.5, label: 'Grizzlepaw Foothills' },
    { x: 34.0, y: 61.0, label: 'Stonesplinter Valley Meadows' },
    { x: 36.0, y: 48.0, label: 'Return to Thelsamar' }
  ],
  herb_silverpine: [
    { x: 46.0, y: 42.0, label: 'The Sepulcher (Start)' },
    { x: 37.0, y: 36.5, label: "North Tide's Hollow Coast" },
    { x: 35.5, y: 54.0, label: 'Silverpine Shoreline (Stranglekelp)' },
    { x: 41.5, y: 71.5, label: 'Shadowfang Keep Coastal Bluff' },
    { x: 57.5, y: 64.0, label: 'Ambermill Foothills' },
    { x: 58.0, y: 47.5, label: 'Shining Strand Lake Shore' },
    { x: 51.5, y: 36.0, label: "Olsen's Farthing Woods" },
    { x: 46.0, y: 42.0, label: 'Return to The Sepulcher' }
  ],
  herb_hillsbrad: [
    { x: 56.0, y: 46.0, label: 'Tarren Mill Outskirts (Start)' },
    { x: 58.0, y: 32.0, label: 'Northern Plateau Steps' },
    { x: 72.0, y: 34.5, label: 'Durnholde Keep High Ridge' },
    { x: 73.0, y: 48.0, label: 'Durnholde Southern Slope' },
    { x: 60.0, y: 55.5, label: 'River Banks Crossing' },
    { x: 47.5, y: 53.5, label: 'Southshore Northern Hills' },
    { x: 37.5, y: 45.5, label: 'Hillsbrad Fields Perimeter' },
    { x: 44.5, y: 34.0, label: 'Northpoint Tower Foothills' },
    { x: 56.0, y: 46.0, label: 'Return to Tarren Mill' }
  ],
  herb_wetlands: [
    { x: 32.0, y: 48.0, label: 'Menethil Marsh Outskirts (Start)' },
    { x: 40.5, y: 56.5, label: 'Whelgar Sunken Road' },
    { x: 52.5, y: 59.5, label: 'Mosshide Marsh Basin' },
    { x: 59.5, y: 47.5, label: 'Raptor Marsh Grounds' },
    { x: 48.5, y: 38.5, label: "Ironbeard's Tomb Crypts" },
    { x: 38.5, y: 29.0, label: 'Sundown Marsh Reeds' },
    { x: 26.5, y: 35.0, label: 'Bluegill Murloc Shanties' },
    { x: 32.0, y: 48.0, label: 'Return to Menethil Outskirts' }
  ],
  herb_stonetalon: [
    { x: 48.0, y: 58.0, label: 'Sun Rock Retreat (Start)' },
    { x: 59.5, y: 52.5, label: 'Windshear Crag Switchbacks' },
    { x: 60.0, y: 67.5, label: 'Webwinder Canyon Path' },
    { x: 48.5, y: 76.0, label: 'Sishir Canyon Foothills' },
    { x: 33.5, y: 72.5, label: 'Charred Vale Southern Rim' },
    { x: 31.5, y: 59.5, label: 'Charred Vale Harpy Ledges' },
    { x: 41.0, y: 48.5, label: 'Mirkfallon Lake High Pass' },
    { x: 48.0, y: 58.0, label: 'Return to Sun Rock' }
  ],
  herb_redridge: [
    { x: 32.0, y: 48.0, label: 'Lakeshire (Start)' },
    { x: 34.5, y: 28.5, label: 'Redridge Canyons Gnoll Ridges' },
    { x: 52.5, y: 36.5, label: "Alther's Mill Timberlands" },
    { x: 68.0, y: 48.5, label: "Render's Rock Foothills" },
    { x: 66.5, y: 71.5, label: "Render's Valley Southern Cliffs" },
    { x: 44.5, y: 71.5, label: 'Lakeridge Highway South' },
    { x: 24.5, y: 61.5, label: 'Three Corners Ridge' },
    { x: 32.0, y: 48.0, label: 'Return to Lakeshire' }
  ],
  herb_arathi: [
    { x: 44.0, y: 48.0, label: 'Refuge Pointe Valley (Start)' },
    { x: 35.0, y: 34.5, label: 'Circle of West Binding' },
    { x: 52.0, y: 33.5, label: 'Boulderfist Outpost Ruins' },
    { x: 66.0, y: 34.5, label: 'Circle of East Binding' },
    { x: 64.5, y: 54.0, label: "Go'Shek Farm Perimeter" },
    { x: 62.0, y: 68.0, label: 'Witherbark Village Rim' },
    { x: 48.0, y: 62.0, label: 'Circle of Outer Binding' },
    { x: 35.0, y: 56.5, label: 'Western Road Approach' },
    { x: 44.0, y: 48.0, label: 'Return to Refuge Pointe' }
  ],
  herb_swamp: [
    { x: 46.0, y: 54.0, label: 'Stonard Outskirts (Start)' },
    { x: 51.0, y: 32.5, label: 'Fallow Sanctuary Bog' },
    { x: 28.5, y: 33.0, label: 'The Harborage Reeds' },
    { x: 21.5, y: 48.5, label: 'Splinterspear Junction Road' },
    { x: 34.0, y: 65.5, label: 'Southern Cypress Groves' },
    { x: 57.5, y: 70.5, label: 'Sorrowmurk Marshlands' },
    { x: 63.0, y: 56.0, label: 'Pool of Tears Western Bank' },
    { x: 46.0, y: 54.0, label: 'Return to Stonard' }
  ],
  herb_alterac: [
    { x: 46.0, y: 62.0, label: 'Southern Snowline Pass (Start)' },
    { x: 34.5, y: 55.5, label: 'Western Ruins of Alterac' },
    { x: 34.0, y: 39.0, label: 'Growless Cave Yeti Exterior' },
    { x: 43.5, y: 24.5, label: 'The Uplands Snowy Plateau' },
    { x: 59.5, y: 38.5, label: 'Strahnbrad Village Ruins' },
    { x: 57.5, y: 53.5, label: "Gallows' Corner Ridge" },
    { x: 46.0, y: 62.0, label: 'Return to Snowline Pass' }
  ],
  herb_stv_north: [
    { x: 36.0, y: 11.0, label: "Nesingwary's Expedition (Start)" },
    { x: 27.5, y: 11.5, label: "Ruins of Zul'Kunda" },
    { x: 28.5, y: 21.0, label: "Ruins of Bal'lal Coast" },
    { x: 34.0, y: 26.5, label: "Kal'ai Jungle Clearing" },
    { x: 42.5, y: 25.5, label: 'Mizjah Ruins Perimeter' },
    { x: 44.5, y: 17.5, label: 'Lake Nazferiti East Bank' },
    { x: 45.0, y: 9.0, label: "Kurzen's Compound Jungle" },
    { x: 38.5, y: 5.5, label: 'Rebel Camp River Crossing' },
    { x: 36.0, y: 11.0, label: "Return to Nesingwary's" }
  ],
  herb_tanaris: [
    { x: 51.0, y: 28.0, label: 'Gadgetzan Dunes (Start)' },
    { x: 60.0, y: 25.5, label: 'Noonshade Ruins Basin' },
    { x: 62.5, y: 39.0, label: 'Waterspring Field Dunes' },
    { x: 62.0, y: 56.5, label: 'Southbreak Shore Sands' },
    { x: 49.0, y: 66.0, label: 'Eastmoon & Dunemaul Dunes' },
    { x: 30.5, y: 64.0, label: 'Thistleshrub Valley (Firebloom)' },
    { x: 35.0, y: 45.0, label: 'Noxious Lair Outer Sands' },
    { x: 42.0, y: 34.0, label: 'Abyssal Sands North' },
    { x: 51.0, y: 28.0, label: 'Return to Gadgetzan' }
  ],
  herb_searing_fire: [
    { x: 38.0, y: 28.0, label: 'Thorium Point (Start)' },
    { x: 53.0, y: 33.5, label: 'Cauldron North Flats' },
    { x: 64.5, y: 44.0, label: 'Dustfire Valley Plains' },
    { x: 63.0, y: 60.5, label: 'Grimesilt Dig Perimeter' },
    { x: 48.0, y: 72.0, label: 'Southern Lava Fissures' },
    { x: 31.0, y: 71.0, label: 'Sea of Fire Magma Plains' },
    { x: 25.5, y: 52.0, label: 'Firewatch Ridge Slopes' },
    { x: 29.0, y: 36.0, label: 'Western Charcoal Flats' },
    { x: 38.0, y: 28.0, label: 'Return to Thorium Point' }
  ],
  herb_hinterlands_lotus: [
    { x: 44.0, y: 62.0, label: 'Valorwind Lake Ruins (Start)' },
    { x: 62.5, y: 68.0, label: "Jintha'Alor Exterior Base" },
    { x: 72.0, y: 52.5, label: "Shaol'watha Troll Ruins" },
    { x: 55.0, y: 39.5, label: "Agol'watha & Skulk Rock" },
    { x: 37.5, y: 45.0, label: 'Central Valley Ruins' },
    { x: 31.0, y: 56.5, label: "Zun'watha Temple Stones" },
    { x: 34.5, y: 68.5, label: "Shadra'Alor Exterior Rim" },
    { x: 44.0, y: 62.0, label: 'Return to Valorwind Lake' }
  ],
  herb_badlands_flat: [
    { x: 54.0, y: 42.0, label: 'Dustwind Dig Flats (Start)' },
    { x: 42.0, y: 32.5, label: 'Northern Coyote Bluffs' },
    { x: 24.5, y: 44.0, label: 'Western Barren Plains' },
    { x: 24.0, y: 62.0, label: 'Camp Cagg Desert Basin' },
    { x: 44.5, y: 68.5, label: "Agmond's End Scrubland" },
    { x: 62.0, y: 67.5, label: 'Mirage Flats Basin' },
    { x: 63.5, y: 51.0, label: 'Eastern Desert Corridor' },
    { x: 54.0, y: 42.0, label: 'Return to Dustwind Dig' }
  ],
  herb_swamp_temple: [
    { x: 62.0, y: 48.0, label: 'Pool of Tears West Bank (Start)' },
    { x: 66.0, y: 41.0, label: 'North Canal Reeds' },
    { x: 73.5, y: 44.5, label: 'Northeast Temple Shore' },
    { x: 76.0, y: 53.5, label: 'East Bank Swamp' },
    { x: 72.5, y: 62.5, label: 'Southeast Blindweed Shoals' },
    { x: 65.0, y: 64.0, label: 'South Swamp Channel' },
    { x: 59.5, y: 57.0, label: 'Southwest Hillocks (Sungrass)' },
    { x: 62.0, y: 48.0, label: 'Return to West Bank' }
  ],
  herb_felwood: [
    { x: 51.0, y: 82.0, label: 'Emerald Sanctuary (Start)' },
    { x: 54.5, y: 66.0, label: 'Eastern Corrupted Woods' },
    { x: 49.0, y: 45.0, label: 'Bloodvenom Falls East Ridge' },
    { x: 54.0, y: 23.0, label: 'Irontree Woods Ruins' },
    { x: 41.5, y: 20.5, label: 'Jadefire Run Satyr Camp' },
    { x: 39.0, y: 38.0, label: 'Shatter Scar Vale Rim' },
    { x: 35.5, y: 52.5, label: 'Bloodvenom Post Outskirts' },
    { x: 38.5, y: 68.0, label: 'Jaedenar & Constellas Ruins' },
    { x: 51.0, y: 82.0, label: 'Return to Emerald Sanctuary' }
  ],
  herb_ghost_caves: [
    { x: 57.0, y: 42.0, label: 'Skulk Rock Cave Mouth (Start)' },
    { x: 65.5, y: 46.5, label: 'Eastern Cliffside Moss Ledges' },
    { x: 63.0, y: 56.5, label: "Jintha'Alor Lower Cave" },
    { x: 52.0, y: 56.0, label: 'Damp Mushroom Valley' },
    { x: 44.5, y: 49.0, label: 'Creeping Cave Entrance' },
    { x: 46.5, y: 39.5, label: "Agol'watha Slime Cavern" },
    { x: 57.0, y: 42.0, label: 'Return to Skulk Rock' }
  ],
  herb_feralas: [
    { x: 72.0, y: 45.0, label: 'Camp Mojache Bridge (Start)' },
    { x: 68.0, y: 56.5, label: 'Woodpaw Gnoll Clearings' },
    { x: 58.0, y: 65.5, label: 'Ruins of Isildien Sunlit Glades' },
    { x: 50.5, y: 55.0, label: 'Feral Scar Vale Perimeter' },
    { x: 51.5, y: 38.5, label: 'Verdantis River Banks' },
    { x: 58.5, y: 28.5, label: 'Twin Colossals Southern Slopes' },
    { x: 73.5, y: 32.5, label: 'Gordunni Ogre Outpost' },
    { x: 72.0, y: 45.0, label: 'Return to Camp Mojache' }
  ],
  herb_epl: [
    { x: 79.0, y: 58.0, label: "Light's Hope Chapel (Start)" },
    { x: 60.5, y: 74.0, label: 'Lake Mereldar Lotus Banks' },
    { x: 39.0, y: 75.0, label: 'Darrowshire & Undercroft' },
    { x: 46.0, y: 58.0, label: "Corin's Crossing Outskirts" },
    { x: 43.5, y: 41.0, label: 'Blackwood Lake Basin' },
    { x: 54.0, y: 24.5, label: 'Northpass Tower Valley' },
    { x: 73.5, y: 33.5, label: 'Browman Mill & Noxious Glade' },
    { x: 79.0, y: 58.0, label: "Return to Light's Hope" }
  ],
  herb_winterspring: [
    { x: 60.0, y: 38.0, label: 'Everlook (Start)' },
    { x: 53.0, y: 27.0, label: 'Starfall Snow Plains' },
    { x: 48.0, y: 16.5, label: 'Frostsaber Rock (Icecap)' },
    { x: 38.5, y: 36.0, label: 'Timbermaw Hold Approach' },
    { x: 50.0, y: 45.5, label: "Lake Kel'Theril Shoreline" },
    { x: 56.5, y: 58.5, label: 'Mazthoril High Summits' },
    { x: 64.5, y: 62.5, label: 'Owl Wing Thicket' },
    { x: 67.5, y: 46.0, label: 'Winterfall Ridge' },
    { x: 60.0, y: 38.0, label: 'Return to Everlook' }
  ],
  herb_ungoro: [
    { x: 46.0, y: 14.0, label: "Marshal's Stand (Start)" },
    { x: 58.5, y: 22.0, label: 'Lakkari Tar Pits Basin' },
    { x: 70.0, y: 40.0, label: 'Eastern Jungle Floor' },
    { x: 66.0, y: 62.0, label: 'Screaming Reaches Marsh' },
    { x: 52.0, y: 74.0, label: 'Slithering Scar Perimeter' },
    { x: 38.0, y: 72.0, label: 'Terror Run Riverbed' },
    { x: 32.0, y: 54.0, label: 'Golakka Hot Springs' },
    { x: 35.0, y: 32.0, label: 'Western Basin Floor' },
    { x: 46.0, y: 14.0, label: "Return to Marshal's Stand" }
  ],
  herb_wpl: [
    { x: 43.0, y: 84.0, label: 'Chillwind Camp (Start)' },
    { x: 54.0, y: 78.0, label: 'Sorrow Hill Cemetery' },
    { x: 56.5, y: 66.0, label: 'The Writhing Haunt' },
    { x: 63.0, y: 56.5, label: "Gahrron's Withering" },
    { x: 52.0, y: 36.5, label: 'Northridge Lumber Camp' },
    { x: 45.0, y: 48.5, label: "Dalson's Tears" },
    { x: 36.5, y: 56.5, label: 'Felstone Field' },
    { x: 36.0, y: 70.0, label: 'Andorhal Western Perimeter' },
    { x: 43.0, y: 84.0, label: 'Return to Chillwind Camp' }
  ]
};

  function getZoneMapUrl(zoneName, isEnlarged = false) {
    const id = ZONE_MAP_IDS[zoneName];
    if (id) {
      const folder = isEnlarged ? 'original' : 'zoom';
      return `https://wow.zamimg.com/images/wow/classic/maps/enus/${folder}/${id}.jpg`;
    }
    return '';
  }

  function buildSmoothClosedPathAndArrows(points) {
    const unique = points.length > 1 && points[0].x === points[points.length - 1].x && points[0].y === points[points.length - 1].y
      ? points.slice(0, -1)
      : points.slice();
    const n = unique.length;
    if (n < 3) {
      const d = points.map((p, i) => (i === 0 ? 'M' : 'L') + ' ' + p.x.toFixed(1) + ' ' + p.y.toFixed(1)).join(' ') + ' Z';
      return { pathD: d, arrows: [] };
    }

    const tension = 0.16;
    const segments = [`M ${unique[0].x.toFixed(2)} ${unique[0].y.toFixed(2)}`];
    const arrows = [];

    for (let i = 0; i < n; i++) {
      const pPrev = unique[(i - 1 + n) % n];
      const pCurr = unique[i];
      const pNext = unique[(i + 1) % n];
      const pNext2 = unique[(i + 2) % n];

      const cp1x = pCurr.x + (pNext.x - pPrev.x) * tension;
      const cp1y = pCurr.y + (pNext.y - pPrev.y) * tension;
      const cp2x = pNext.x - (pNext2.x - pCurr.x) * tension;
      const cp2y = pNext.y - (pNext2.y - pCurr.y) * tension;

      segments.push(`C ${cp1x.toFixed(2)} ${cp1y.toFixed(2)}, ${cp2x.toFixed(2)} ${cp2y.toFixed(2)}, ${pNext.x.toFixed(2)} ${pNext.y.toFixed(2)}`);

      // Place directional chevron at midpoint (t = 0.5) of every other segment (or long segments)
      const dist = Math.hypot(pNext.x - pCurr.x, pNext.y - pCurr.y);
      if (i % 2 === 0 && dist >= 7) {
        const mx = 0.125 * pCurr.x + 0.375 * cp1x + 0.375 * cp2x + 0.125 * pNext.x;
        const my = 0.125 * pCurr.y + 0.375 * cp1y + 0.375 * cp2y + 0.125 * pNext.y;
        const dx = 0.75 * (cp1x - pCurr.x) + 1.5 * (cp2x - cp1x) + 0.75 * (pNext.x - cp2x);
        const dy = 0.75 * (cp1y - pCurr.y) + 1.5 * (cp2y - cp1y) + 0.75 * (pNext.y - cp2y);
        const deg = Math.atan2(dy, dx) * 180 / Math.PI;
        arrows.push({ x: mx, y: my, deg });
      }
    }

    segments.push('Z');
    return { pathD: segments.join(' '), arrows };
  }

  function renderRouteSvgOverlay(route, isMining, isEnlarged = false) {
    const points = CIRCUIT_ROUTE_PATHS[route.id];
    if (!points || points.length === 0) return '';

    const { pathD, arrows } = buildSmoothClosedPathAndArrows(points);
    const mainStroke = isMining ? '#facc15' : '#4ade80';
    const glowColor = isMining ? 'rgba(250, 204, 21, 0.45)' : 'rgba(74, 222, 128, 0.45)';
    const startPt = points[0];
    const filterId = `route-glow-${route.id}${isEnlarged ? '-lg' : ''}`;

    return `
      <svg class="circuit-map-svg" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        <defs>
          <filter id="${filterId}" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="0" stdDeviation="${isEnlarged ? '1.1' : '0.8'}" flood-color="${glowColor}" />
          </filter>
        </defs>
        
        <!-- Dark contrast underlay so line is visible against any terrain -->
        <path d="${pathD}" fill="none" stroke="rgba(2, 6, 23, 0.88)" stroke-width="${isEnlarged ? '3.4' : '4.2'}" stroke-linejoin="round" stroke-linecap="round" />
        
        <!-- Glowing animated route line -->
        <path class="circuit-svg-track" d="${pathD}" fill="none" stroke="${mainStroke}" stroke-width="${isEnlarged ? '1.6' : '2.1'}" stroke-dasharray="4 2" stroke-linejoin="round" stroke-linecap="round" filter="url(#${filterId})" />
        
        <!-- Directional Chevron Arrows along the route -->
        ${arrows.map(a => `
          <g transform="translate(${a.x.toFixed(2)}, ${a.y.toFixed(2)}) rotate(${a.deg.toFixed(1)})">
            <path d="${isEnlarged ? 'M -1.4 -1.3 L 1.5 0 L -1.4 1.3' : 'M -1.7 -1.5 L 1.8 0 L -1.7 1.5'}" fill="none" stroke="rgba(2, 6, 23, 0.95)" stroke-width="${isEnlarged ? '1.3' : '1.6'}" stroke-linecap="round" stroke-linejoin="round" />
            <path d="${isEnlarged ? 'M -1.4 -1.3 L 1.5 0 L -1.4 1.3' : 'M -1.7 -1.5 L 1.8 0 L -1.7 1.5'}" fill="none" stroke="#ffffff" stroke-width="${isEnlarged ? '0.75' : '0.95'}" stroke-linecap="round" stroke-linejoin="round" />
          </g>
        `).join('')}

        <!-- Waypoint cluster pins along the terrain loop -->
        ${points.slice(1, -1).map((p, idx) => isEnlarged ? `
          <g class="circuit-svg-wp-node" transform="translate(${p.x.toFixed(1)}, ${p.y.toFixed(1)})">
            <circle cx="0" cy="0" r="1.9" fill="#0f172a" stroke="${mainStroke}" stroke-width="0.55" />
            <text x="0" y="0.65" fill="#ffffff" font-size="2.0" font-weight="700" text-anchor="middle" font-family="system-ui, sans-serif">${idx + 2}</text>
            ${p.label ? `<title>Stop ${idx + 2}: ${escapeHtml(p.label)} (${p.x.toFixed(1)}, ${p.y.toFixed(1)})</title>` : ''}
          </g>
        ` : `
          <circle cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="1.25" fill="#ffffff" stroke="rgba(2, 6, 23, 0.9)" stroke-width="0.5" />
        `).join('')}
        
        <!-- Start Point Marker with Pulsing Ring -->
        <circle class="circuit-svg-pulse" cx="${startPt.x.toFixed(1)}" cy="${startPt.y.toFixed(1)}" r="${isEnlarged ? '3.4' : '3.8'}" fill="${mainStroke}" opacity="0.3" />
        <g transform="translate(${startPt.x.toFixed(1)}, ${startPt.y.toFixed(1)})">
          <circle cx="0" cy="0" r="${isEnlarged ? '2.2' : '2.0'}" fill="#ef4444" stroke="#ffffff" stroke-width="0.65">
            <title>Stop 1 (Start): ${escapeHtml(startPt.label || 'Start')} (${startPt.x.toFixed(1)}, ${startPt.y.toFixed(1)})</title>
          </circle>
          ${isEnlarged ? `<text x="0" y="0.7" fill="#ffffff" font-size="2.1" font-weight="800" text-anchor="middle" font-family="system-ui, sans-serif">1</text>` : ''}
        </g>
        
        ${isEnlarged ? `
          <g class="circuit-svg-pin-label" transform="translate(${startPt.x.toFixed(1)}, ${Math.max(4.5, startPt.y - 3.8).toFixed(1)})">
            <rect x="-8.5" y="-3.4" width="17" height="4.2" rx="1.1" fill="rgba(15, 23, 42, 0.92)" stroke="${mainStroke}" stroke-width="0.35" />
            <text x="0" y="-0.5" fill="#ffffff" font-size="2.2" font-weight="700" text-anchor="middle" font-family="system-ui, sans-serif">START</text>
          </g>
        ` : ''}
      </svg>
    `;
  }

  let activeRouteModal = null;
  let activeModalCleanup = null;

  function openGatheringRouteModal(route, isMining) {
    if (!route) return;

    if (activeRouteModal && typeof activeModalCleanup === 'function') {
      activeModalCleanup();
    }

    let modal = document.getElementById('gathering-route-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'gathering-route-modal';
      modal.className = 'gathering-route-modal-backdrop';
      modal.setAttribute('role', 'dialog');
      modal.setAttribute('aria-modal', 'true');
      document.body.appendChild(modal);
    }
    activeRouteModal = modal;

    const zoneName = route.zone;
    const mapUrl = getZoneMapUrl(zoneName, true);
    const mainColor = isMining ? '#facc15' : '#4ade80';
    const profLabel = isMining ? 'Mining Circuit' : 'Herbalism Circuit';
    const points = CIRCUIT_ROUTE_PATHS[route.id] || [];

    modal.innerHTML = `
      <div class="gathering-route-dialog" role="document">
        <div class="gathering-route-header">
          <div class="gathering-route-title-box">
            <div class="gathering-route-meta-pills">
              <span class="circuit-faction-badge ${route.faction.toLowerCase()}">${escapeHtml(route.faction)}</span>
              <span class="circuit-direction-badge">🔄 ${escapeHtml(route.direction)}</span>
              <span class="circuit-lap-badge">⏱️ ${escapeHtml(route.lapMinutes)}</span>
              <span class="circuit-zone-badge">📍 ${escapeHtml(zoneName)}</span>
              <span class="circuit-hostile-badge" style="color: #f87171;">Hostile: ${escapeHtml(route.hostileLevel)}</span>
            </div>
            <h3 class="gathering-route-title">${escapeHtml(route.name)}</h3>
          </div>
          <button type="button" class="gathering-route-close-btn" id="gathering-route-close" aria-label="Close enlarged route map">✕</button>
        </div>

        <div class="gathering-route-toolbar">
          <div class="gathering-zoom-group">
            <button type="button" class="gathering-zoom-btn" id="gathering-zoom-out" title="Zoom Out" aria-label="Zoom Out">−</button>
            <span class="gathering-zoom-level" id="gathering-zoom-display">100%</span>
            <button type="button" class="gathering-zoom-btn" id="gathering-zoom-in" title="Zoom In" aria-label="Zoom In">+</button>
            <button type="button" class="gathering-zoom-btn text-btn" id="gathering-zoom-reset" title="Reset View">↺ Reset</button>
          </div>
          <div class="gathering-toolbar-hint">
            <span class="hint-icon">🖐️</span> Click &amp; drag to pan · Scroll to zoom
          </div>
          <button type="button" class="gathering-tomtom-btn" id="gathering-copy-tomtom" title="Copy TomTom waypoint macro">
            📋 Copy TomTom Macro
          </button>
        </div>

        <div class="gathering-route-viewport" id="gathering-map-viewport">
          <div class="gathering-route-canvas" id="gathering-map-canvas">
            <img src="${mapUrl}" alt="${escapeHtml(zoneName)} Parchment Map" class="gathering-route-large-img" draggable="false" />
            ${renderRouteSvgOverlay(route, isMining, true)}
          </div>
        </div>

        <div class="gathering-route-drawer">
          <div class="gathering-drawer-stats">
            <span class="gathering-drawer-pill"><strong>Density:</strong> ${escapeHtml(route.density)}</span>
            <span class="gathering-drawer-pill"><strong>Best For:</strong> ${escapeHtml(route.bestFor)}</span>
            <span class="gathering-drawer-pill" style="border-color: ${mainColor}; color: ${mainColor};"><strong>Type:</strong> ${profLabel}</span>
          </div>
          <p class="gathering-drawer-desc">${escapeHtml(route.description)}</p>
          ${route.tips ? `<div class="gathering-drawer-tip"><strong>💡 Pro-Tip:</strong> ${escapeHtml(route.tips)}</div>` : ''}
          ${points.length > 0 ? `
            <div class="gathering-drawer-waypoints">
              <span class="gathering-wp-heading">Terrain Waypoint Sequence (${points.length} stops):</span>
              <div class="gathering-wp-list">
                ${points.map((p, i) => `
                  <button type="button" class="gathering-wp-chip ${i === 0 ? 'start-chip' : ''}" data-x="${p.x}" data-y="${p.y}" title="Click to copy /way coordinate">
                    <span class="wp-num">${i + 1}</span>
                    <span class="wp-label">${escapeHtml(p.label || 'Waypoint')}</span>
                    <span class="wp-coords">(${p.x.toFixed(1)}, ${p.y.toFixed(1)})</span>
                  </button>
                `).join('')}
              </div>
            </div>
          ` : ''}
        </div>
      </div>
    `;

    let zoom = 1.0;
    const minZoom = 1.0;
    const maxZoom = 3.5;
    const zoomStep = 0.5;
    let panX = 0;
    let panY = 0;
    let isDragging = false;
    let startX = 0;
    let startY = 0;

    const viewport = modal.querySelector('#gathering-map-viewport');
    const canvas = modal.querySelector('#gathering-map-canvas');
    const zoomDisplay = modal.querySelector('#gathering-zoom-display');
    const zoomInBtn = modal.querySelector('#gathering-zoom-in');
    const zoomOutBtn = modal.querySelector('#gathering-zoom-out');
    const zoomResetBtn = modal.querySelector('#gathering-zoom-reset');
    const closeBtn = modal.querySelector('#gathering-route-close');
    const tomtomBtn = modal.querySelector('#gathering-copy-tomtom');

    function updateTransform() {
      if (zoom <= 1.0) {
        panX = 0;
        panY = 0;
        if (viewport) viewport.style.cursor = 'default';
      } else {
        if (viewport) viewport.style.cursor = isDragging ? 'grabbing' : 'grab';
        const vw = viewport ? viewport.clientWidth || 800 : 800;
        const vh = viewport ? viewport.clientHeight || 500 : 500;
        const maxPanX = (vw * (zoom - 1)) / 2;
        const maxPanY = (vh * (zoom - 1)) / 2;
        panX = Math.max(-maxPanX, Math.min(maxPanX, panX));
        panY = Math.max(-maxPanY, Math.min(maxPanY, panY));
      }
      if (canvas) {
        canvas.style.transform = `translate(${panX}px, ${panY}px) scale(${zoom})`;
      }
      if (zoomDisplay) {
        zoomDisplay.textContent = `${Math.round(zoom * 100)}%`;
      }
      if (zoomInBtn) zoomInBtn.disabled = zoom >= maxZoom;
      if (zoomOutBtn) zoomOutBtn.disabled = zoom <= minZoom;
    }

    function setZoom(newZoom) {
      zoom = Math.max(minZoom, Math.min(maxZoom, Math.round(newZoom * 10) / 10));
      updateTransform();
    }

    zoomInBtn?.addEventListener('click', () => setZoom(zoom + zoomStep));
    zoomOutBtn?.addEventListener('click', () => setZoom(zoom - zoomStep));
    zoomResetBtn?.addEventListener('click', () => {
      panX = 0;
      panY = 0;
      setZoom(1.0);
    });

    function onWheel(e) {
      e.preventDefault();
      const delta = e.deltaY < 0 ? 0.25 : -0.25;
      setZoom(zoom + delta);
    }
    viewport?.addEventListener('wheel', onWheel, { passive: false });

    function onMouseDown(e) {
      if (zoom <= 1.0) return;
      isDragging = true;
      startX = e.clientX - panX;
      startY = e.clientY - panY;
      if (viewport) viewport.style.cursor = 'grabbing';
    }
    function onMouseMove(e) {
      if (!isDragging) return;
      panX = e.clientX - startX;
      panY = e.clientY - startY;
      updateTransform();
    }
    function onMouseUp() {
      if (!isDragging) return;
      isDragging = false;
      if (viewport) viewport.style.cursor = zoom > 1.0 ? 'grab' : 'default';
    }

    viewport?.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    function copyMacro(macroText, triggerEl) {
      if (!macroText) return;
      if (typeof window.copyMacroToClipboard === 'function') {
        window.copyMacroToClipboard(macroText, triggerEl);
        if (typeof window.showToast === 'function') {
          window.showToast('✓ Copied TomTom macro', 'success');
        }
      } else if (typeof window.copyTextToClipboard === 'function') {
        window.copyTextToClipboard(macroText, () => {
          if (triggerEl) {
            triggerEl.classList.add('copied');
            setTimeout(() => triggerEl.classList.remove('copied'), 1800);
          }
          if (typeof window.showToast === 'function') {
            window.showToast('✓ Copied TomTom macro', 'success');
          }
        });
      } else if (navigator.clipboard) {
        navigator.clipboard.writeText(macroText).then(() => {
          if (triggerEl) {
            triggerEl.classList.add('copied');
            setTimeout(() => triggerEl.classList.remove('copied'), 1800);
          }
          if (typeof window.showToast === 'function') {
            window.showToast('✓ Copied TomTom macro', 'success');
          }
        }).catch(() => {});
      }
    }

    tomtomBtn?.addEventListener('click', () => {
      const macro = points.map(p => `/way ${zoneName} ${p.x.toFixed(1)} ${p.y.toFixed(1)} ${p.label || ''}`).join('\n');
      copyMacro(macro, tomtomBtn);
    });

    modal.querySelectorAll('.gathering-wp-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        const x = Number(chip.getAttribute('data-x'));
        const y = Number(chip.getAttribute('data-y'));
        const label = chip.querySelector('.wp-label')?.textContent || '';
        const macro = `/way ${zoneName} ${x.toFixed(1)} ${y.toFixed(1)} ${label}`;
        copyMacro(macro, chip);
      });
    });

    function closeModal() {
      modal.classList.remove('is-open');
      modal.setAttribute('hidden', '');
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('keydown', onKeyDown);
      viewport?.removeEventListener('wheel', onWheel);
      activeRouteModal = null;
      activeModalCleanup = null;
    }
    activeModalCleanup = closeModal;

    function onKeyDown(e) {
      if (e.key === 'Escape') closeModal();
    }
    document.addEventListener('keydown', onKeyDown);

    closeBtn?.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });

    modal.removeAttribute('hidden');
    requestAnimationFrame(() => {
      modal.classList.add('is-open');
      updateTransform();
    });
  }

  /* ==========================================================================
     SUBTAB 6: GATHERING NODES (HERBALISM & MINING)
     ========================================================================== */
  function renderNodesTab(container, prof) {
    const isMining = prof.slug === 'mining';
    const isHerbalism = prof.slug === 'herbalism';
    const circuits = isMining ? MINING_CIRCUITS : (isHerbalism ? HERBALISM_CIRCUITS : null);
    const nodes = prof.nodes || [];

    if (!circuits) {
      container.innerHTML = `
        <div class="leveling-header-block">
          <div class="leveling-header-title">
            <h3>${escapeHtml(prof.name)} Resource Nodes (${nodes.length})</h3>
            <p>Every harvestable resource node across Azeroth, required skill levels, best farming locations, and item yield.</p>
          </div>
        </div>

        <div class="nodes-grid">
          ${nodes.map(n => `
            <div class="node-card">
              <div class="node-header">
                <img src="${getIconUrl(n.icon)}" alt="${escapeHtml(n.name)}" class="node-icon" loading="lazy" />
                <div class="node-title-box">
                  <h4>${escapeHtml(n.name)}</h4>
                  <small>${escapeHtml(n.zones)}</small>
                </div>
                <span class="node-skill-badge">Skill ${n.skill}</span>
              </div>
              ${n.drops && n.drops.length ? `
                <div class="node-drops-row">
                  ${n.drops.map(d => `
                    <div class="step-reagent-badge" title="${escapeHtml(d.name)}" data-item-id="${d.itemId}" data-item-name="${escapeHtml(d.name)}">
                      <img src="${getIconUrl(d.icon)}" alt="${escapeHtml(d.name)}" class="step-reagent-img q${d.quality || 1}" loading="lazy" />
                    </div>
                  `).join('')}
                </div>
              ` : ''}
            </div>
          `).join('')}
        </div>
      `;
      attachTooltipListeners(container, prof);
      return;
    }

    const currentTierId = isMining ? activeMiningTier : activeHerbTier;
    const activeTier = circuits.find(c => c.tierId === currentTierId) || circuits[0];

    container.innerHTML = `
      <div class="leveling-header-block">
        <div class="leveling-header-title">
          <h3>
            ${escapeHtml(prof.name)} Gathering Authority &amp; Circuit Routes
            <span class="beta-cap-tag" style="background: rgba(234, 179, 8, 0.2); border-color: #eab308; color: #fef08a;">
              Multiple Routes per Tier
            </span>
          </h3>
          <p>Choose between high-density zone circuit farming routes (Alliance, Horde, Contested, and Cave loops with lap times &amp; directions) or the full raw node list.</p>
        </div>
        <div class="gathering-view-toggle-bar">
          <button type="button" class="gathering-toggle-btn ${gatheringViewMode === 'routes' ? 'active' : ''}" data-view="routes">
            <span>🗺️</span> Circuit Routes (${circuits.reduce((acc, c) => acc + c.routes.length, 0)} Routes)
          </button>
          <button type="button" class="gathering-toggle-btn ${gatheringViewMode === 'nodes' ? 'active' : ''}" data-view="nodes">
            <span>${isMining ? '⛏️' : '🌿'}</span> Resource Nodes List (${nodes.length})
          </button>
        </div>
      </div>

      ${gatheringViewMode === 'routes' ? `
        <!-- Tier Navigation Chips -->
        <div class="prof-category-chips" style="margin-bottom: 1.25rem;">
          ${circuits.map(tier => {
            const tierNum = (tier.tierName.match(/Tier\s+(\d+)/i) || [])[1] || '';
            const skill = (tier.tierName.match(/\(Skill\s+([^)]+)\)/i) || [])[1] || '';
            const firstMat = (tier.ores && tier.ores[0]) || (tier.herbs && tier.herbs[0]) || '';
            const shortMat = firstMat.replace(/\s+Ore$/i, '');
            const chipLabel = `Tier ${tierNum}: ${shortMat}${skill ? ' (' + skill.replace(/\s*\/\s*\d+/, '') + ')' : ''}`;
            return `
              <button type="button" class="prof-cat-chip ${tier.tierId === activeTier.tierId ? 'active' : ''}" data-tier-id="${tier.tierId}">
                ${escapeHtml(chipLabel)}
              </button>
            `;
          }).join('')}
        </div>

        <!-- Tier Header Banner -->
        <div class="circuit-tier-header">
          <div class="circuit-tier-title">${escapeHtml(activeTier.tierName)}</div>
          <div class="circuit-tier-mats">
            <span>Harvestable Yields:</span>
            ${(activeTier.ores || activeTier.herbs || []).map(mat => `
              <span class="circuit-mat-pill">${escapeHtml(mat)}</span>
            `).join('')}
          </div>
        </div>

        <!-- Multi-Route Grid (4 Distinct Routes) -->
        <div class="circuit-routes-grid">
          ${activeTier.routes.map((rt, rIdx) => `
            <div class="circuit-route-card">
              <div class="circuit-route-head">
                <div class="circuit-route-badge-row">
                  <span class="circuit-faction-badge ${rt.faction.toLowerCase()}">${escapeHtml(rt.faction)}</span>
                  <span class="circuit-direction-badge">🔄 ${escapeHtml(rt.direction)}</span>
                  <span class="circuit-lap-badge">⏱️ ${escapeHtml(rt.lapMinutes)}</span>
                </div>
                <h4 class="circuit-route-name">${rIdx + 1}. ${escapeHtml(rt.name)}</h4>
                <div class="circuit-route-zone">📍 ${escapeHtml(rt.zone)} · <span style="color: #f87171;">Hostile: ${escapeHtml(rt.hostileLevel)}</span></div>
              </div>

              <div class="circuit-route-stats">
                <div class="circuit-stat-pill">
                  <strong>Density:</strong> ${escapeHtml(rt.density)}
                </div>
                <div class="circuit-stat-pill">
                  <strong>Best For:</strong> ${escapeHtml(rt.bestFor)}
                </div>
              </div>

              <div class="circuit-route-body">
                <p class="circuit-desc">${escapeHtml(rt.description)}</p>
                ${rt.tips ? `<div class="circuit-pro-tip"><strong>💡 Pro-Tip:</strong> ${escapeHtml(rt.tips)}</div>` : ''}
              </div>

              <!-- Terrain Gathering Route Map Preview -->
              <div class="circuit-route-map-preview" data-route-id="${rt.id}" role="button" tabindex="0" title="Click route map to see an enlarged route map version">
                <div class="circuit-map-img-wrap">
                  <img src="${getZoneMapUrl(rt.zone)}" alt="${escapeHtml(rt.zone)} Terrain Route Map" class="circuit-map-img" loading="lazy" />
                  ${renderRouteSvgOverlay(rt, isMining, false)}
                </div>
                <div class="circuit-map-zoom-badge">
                  <span class="zoom-icon">🔍</span> Click route map to see an enlarged route map version
                </div>
              </div>

              <div class="circuit-route-footer">
                <span class="circuit-waypoint-label">Strategic Waypoint:</span>
                ${formatWaypointsInHtml(escapeHtml(rt.waypoint), rt.zone)}
              </div>
            </div>
          `).join('')}
        </div>
      ` : `
        <!-- Raw Resource Nodes Grid -->
        <div class="nodes-grid">
          ${nodes.map(n => `
            <div class="node-card">
              <div class="node-header">
                <img src="${getIconUrl(n.icon)}" alt="${escapeHtml(n.name)}" class="node-icon" loading="lazy" />
                <div class="node-title-box">
                  <h4>${escapeHtml(n.name)}</h4>
                  <small>${escapeHtml(n.zones)}</small>
                </div>
                <span class="node-skill-badge">Skill ${n.skill}</span>
              </div>
              ${n.drops && n.drops.length ? `
                <div class="node-drops-row">
                  ${n.drops.map(d => `
                    <div class="step-reagent-badge" title="${escapeHtml(d.name)}" data-item-id="${d.itemId}" data-item-name="${escapeHtml(d.name)}">
                      <img src="${getIconUrl(d.icon)}" alt="${escapeHtml(d.name)}" class="step-reagent-img q${d.quality || 1}" loading="lazy" />
                    </div>
                  `).join('')}
                </div>
              ` : ''}
            </div>
          `).join('')}
        </div>
      `}
    `;

    container.querySelectorAll('.gathering-toggle-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        gatheringViewMode = btn.getAttribute('data-view');
        renderNodesTab(container, prof);
      });
    });

    container.querySelectorAll('.prof-cat-chip').forEach(btn => {
      btn.addEventListener('click', () => {
        const tid = btn.getAttribute('data-tier-id');
        if (isMining) activeMiningTier = tid;
        else activeHerbTier = tid;
        renderNodesTab(container, prof);
      });
    });

    container.querySelectorAll('.circuit-route-map-preview').forEach(preview => {
      preview.addEventListener('click', () => {
        const routeId = preview.getAttribute('data-route-id');
        const rt = (activeTier?.routes || []).find(r => r.id === routeId);
        if (rt) openGatheringRouteModal(rt, isMining);
      });
      preview.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          const routeId = preview.getAttribute('data-route-id');
          const rt = (activeTier?.routes || []).find(r => r.id === routeId);
          if (rt) openGatheringRouteModal(rt, isMining);
        }
      });
    });

    attachTooltipListeners(container, prof);
  }

  /* ==========================================================================
     SUBTAB 7: FISHING WATERS & LURES
     ========================================================================== */
  function renderFishingWatersTab(container, prof) {
    const waters = prof.fishingWaters || [];
    const sched = FISHING_SCHEDULE_DATA;

    const currentUtcHour = new Date().getUTCHours();
    const isNightfinPeak = currentUtcHour >= 0 && currentUtcHour < 6;
    const isNightfinActive = currentUtcHour >= 18 || currentUtcHour < 6;
    const isSunscaleActive = currentUtcHour >= 6 && currentUtcHour < 18;

    const timeBadgeText = isNightfinPeak
      ? '🌙 Nightfin Snapper 100% PEAK Active Right Now!'
      : (isSunscaleActive
        ? '☀️ Sunscale Salmon Daylight Window Active Right Now!'
        : (isNightfinActive ? '🌆 Twilight Transition: Nightfin Activity Begun!' : '🎣 Fishing Cycle Active'));

    container.innerHTML = `
      <div class="leveling-header-block">
        <div class="leveling-header-title">
          <h3>
            Fishing Waters, Day/Night Windows &amp; Fish Pools
            <span class="beta-cap-tag" style="background: rgba(14, 116, 144, 0.2); border-color: #0284c7; color: #38bdf8;">
              ${timeBadgeText}
            </span>
          </h3>
          <p>Real-time server time fishing schedule, seasonal fish migrations (Winter Squid vs Summer Bass), coastal fish schools, and zone skill brackets.</p>
        </div>
      </div>

      <!-- Real-time Day/Night Schedule Widget -->
      <div class="fishing-schedule-widget">
        <div class="fishing-clock-card">
          <div class="fishing-clock-head">
            <span class="fishing-clock-icon">🕰️</span>
            <div>
              <div class="fishing-clock-title">Server Time Schedule Tracker</div>
              <div class="fishing-clock-sub">Current Server Hour: <strong>${String(currentUtcHour).padStart(2, '0')}:00 UTC</strong></div>
            </div>
          </div>
          <div class="fishing-cycles-grid">
            ${sched.dayNight.map(dn => {
              const isPeak = dn.peakHours.includes(currentUtcHour);
              const isActive = dn.dayHours.includes(currentUtcHour) || dn.twilightHours.includes(currentUtcHour) || isPeak;
              return `
                <div class="fishing-cycle-card ${isPeak ? 'peak-active' : (isActive ? 'active' : '')}">
                  <div class="fishing-cycle-top">
                    <img src="${getIconUrl(dn.icon)}" alt="${escapeHtml(dn.name)}" class="fishing-fish-icon" />
                    <div>
                      <h4 class="fishing-fish-name">${escapeHtml(dn.name)}</h4>
                      <div class="fishing-fish-window">${escapeHtml(dn.windows)}</div>
                    </div>
                    <span class="fishing-live-status-pill ${isPeak ? 'peak' : (isActive ? 'active' : 'dormant')}">
                      ${isPeak ? '⚡ PEAK ACTIVE' : (isActive ? 'ACTIVE' : 'DORMANT')}
                    </span>
                  </div>
                  <div class="fishing-cycle-buff">✨ ${escapeHtml(dn.buff)}</div>
                  <div class="fishing-cycle-zones">📍 ${escapeHtml(dn.zones)}</div>
                </div>
              `;
            }).join('')}
          </div>
        </div>

        <!-- Seasonal Migration Calendar -->
        <div class="fishing-seasons-card">
          <div class="fishing-seasons-head">
            <span class="fishing-seasons-icon">📅</span>
            <div>
              <div class="fishing-seasons-title">Seasonal Fish Migration Calendar</div>
              <div class="fishing-seasons-sub">Winter Squid vs Summer Bass migration shifts during equinoxes</div>
            </div>
          </div>
          <div class="fishing-seasons-grid">
            ${sched.seasons.map(sn => `
              <div class="fishing-season-card ${sn.isActiveNow ? 'season-active' : ''}">
                <div class="fishing-season-top">
                  <img src="${getIconUrl(sn.icon)}" alt="${escapeHtml(sn.name)}" class="fishing-fish-icon" />
                  <div>
                    <h4 class="fishing-season-name">${escapeHtml(sn.name)}</h4>
                    <span class="fishing-season-dates">${escapeHtml(sn.season)}</span>
                  </div>
                  ${sn.isActiveNow ? '<span class="season-badge-live">🟢 ACTIVE NOW IN BETA</span>' : '<span class="season-badge-inactive">⚪ MIGRATED</span>'}
                </div>
                <div class="fishing-season-buff">${escapeHtml(sn.yieldBuff)}</div>
                <div class="fishing-season-zones">📍 <strong>Best Waters:</strong> ${escapeHtml(sn.bestLocations)}</div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Fish Pools & Wreckage Compendium -->
        <div class="fishing-pools-card">
          <div class="fishing-pools-head">
            <span class="fishing-pools-icon">🌊</span>
            <div>
              <div class="fishing-pools-title">Fish Pools &amp; Floating Wreckage Compendium</div>
              <div class="fishing-pools-sub">Open-world schools require only 1 Fishing Skill to land 100% of catches</div>
            </div>
          </div>
          <div class="fishing-pools-grid">
            ${sched.pools.map(pool => `
              <div class="fishing-pool-item">
                <div class="fishing-pool-top">
                  <img src="${getIconUrl(pool.icon)}" alt="${escapeHtml(pool.name)}" class="fishing-pool-icon" />
                  <div>
                    <h5 class="fishing-pool-name">${escapeHtml(pool.name)}</h5>
                    <div class="fishing-pool-loc">📍 ${escapeHtml(pool.locations)}</div>
                  </div>
                </div>
                <div class="fishing-pool-loot">${escapeHtml(pool.loot)}</div>
                <div class="fishing-pool-mech">💡 ${escapeHtml(pool.mechanic)}</div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>

      <!-- Waters by Skill Bracket List -->
      <div class="section-heading-bar" style="margin-top: 1.5rem;">
        <div>
          <h2><span>🌊</span> Open Waters Skill Requirement Brackets</h2>
          <p class="section-subtext">Minimum fishing skill required to guarantee no "Your fish got away!" failures</p>
        </div>
      </div>

      <div class="waters-list">
        ${waters.map(w => `
          <div class="water-bracket-row">
            <div class="water-skill-badge">
              Skill ${w.skill}
              <small>${escapeHtml(w.note || '100% Catch')}</small>
            </div>
            <div class="water-zones-text">
              <div style="margin-bottom: ${w.biteFrom ? '0.35rem' : '0'}; width: 100%;">${escapeHtml(w.zones)}</div>
              ${w.biteFrom ? `<span class="water-bite-badge">Fish bite starts at ${escapeHtml(w.biteFrom)}</span>` : ''}
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  function renderFishingLuresTab(container, prof) {
    const lures = prof.fishingLures || [];
    container.innerHTML = `
      <div class="leveling-header-block">
        <div class="leveling-header-title">
          <h3>Fishing Lures & Baits (${lures.length})</h3>
          <p>A lure goes on your fishing pole and raises your skill for a few minutes to unlock higher level waters.</p>
        </div>
      </div>

      <div class="lures-grid">
        ${lures.map(l => `
          <div class="lure-card">
            <img src="${getIconUrl(l.icon)}" alt="${escapeHtml(l.name)}" class="lure-icon" loading="lazy" />
            <div class="lure-info">
              <strong>${escapeHtml(l.name)}</strong>
              <span>${escapeHtml(l.bonus)}</span>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  function renderFishingRanksTab(container, prof) {
    const ranks = prof.ranks || [];
    container.innerHTML = `
      <div class="leveling-header-block">
        <div class="leveling-header-title">
          <h3>Fishing Progression & Rank Mastery</h3>
          <p>Everything you need to get started with Fishing in Azeroth, plus milestone trainer certifications and quest books.</p>
        </div>
      </div>

      <div class="fishing-ranks-list">
        ${ranks.map(r => {
          if (r.step) {
            return `
              <div class="fishing-rank-item">
                <div class="fishing-rank-step">${r.step}</div>
                <div class="fishing-rank-content">
                  <strong>${escapeHtml(r.title)}</strong>
                  <p>${escapeHtml(r.desc)}</p>
                </div>
              </div>
            `;
          }
          return `
            <div class="fishing-rank-item">
              <img src="${getIconUrl(r.icon || 'trade_fishing')}" alt="${escapeHtml(r.title)}" width="42" height="42" style="border-radius:6px; border:1px solid rgba(212,175,55,0.4);" loading="lazy" />
              <div class="fishing-rank-content">
                <div style="display: flex; align-items: center; justify-content: space-between; gap: 0.5rem; flex-wrap: wrap;">
                  <strong>${escapeHtml(r.title)}</strong>
                  ${r.cap ? `<span class="node-skill-badge">${escapeHtml(r.cap)}</span>` : ''}
                </div>
                <p>${escapeHtml(r.desc)}</p>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    `;
  }

  /* ==========================================================================
     INTERACTIVE FLOATING ITEM & REAGENT TOOLTIP ENGINE
     ========================================================================== */
  function parseRecipeEffect(effect) {
    if (!effect) return null;
    let rem = String(effect).trim();

    let bind = null;
    const bm = rem.match(/^(Binds when (?:equipped|picked up|used))\s*/i);
    if (bm) {
      bind = bm[1];
      rem = rem.substring(bm[0].length).trim();
    }

    let slot = null;
    let subType = null;
    const tabMatch = rem.match(/^([A-Za-z0-9&/ -]+)\t([A-Za-z0-9&/ -]+?)(?=\s+(?:\d+\s+Armor|\d+\s*-\s*\d+|\+?\d+\s+Damage|Speed|\+?\d+\s+(?:Stamina|Strength|Agility|Intellect|Spirit)|Requires|Equip|Use|Chance|Sell Price|"|$))/);
    if (tabMatch) {
      slot = tabMatch[1].trim();
      subType = tabMatch[2].trim();
      rem = rem.substring(tabMatch[0].length).trim();
    } else if (rem.startsWith('\t')) {
      const m = rem.match(/^\t([A-Za-z0-9&/ -]+?)(?=\s+(?:\d+\s+Armor|Requires|Use|Equip|Sell Price|"|$))/);
      if (m) {
        subType = m[1].trim();
        rem = rem.substring(m[0].length).trim();
      }
    }

    let dmgRow = null;
    let dps = null;
    const dmgM = rem.match(/^(\d+\s*-\s*\d+(?:\s+[A-Za-z]+)?\s+Damage)\s*(?:\t|\s+)(Speed\s+[\d.]+)\s*(\([\d.]+\s+damage per second\))/i);
    if (dmgM) {
      dmgRow = { dmg: dmgM[1], speed: dmgM[2] };
      dps = dmgM[3];
      rem = rem.substring(dmgM[0].length).trim();
    }

    let armor = null;
    const armM = rem.match(/^(\d+\s+Armor)\b/i);
    if (armM) {
      armor = armM[1];
      rem = rem.substring(armM[0].length).trim();
    }

    const stats = [];
    const statRe = /\+([0-9]+)\s+(Stamina|Strength|Agility|Intellect|Spirit|All Stats|Armor)/gi;
    let sm;
    while ((sm = statRe.exec(rem)) !== null) {
      stats.push(sm[0]);
    }
    rem = rem.replace(/\+([0-9]+)\s+(Stamina|Strength|Agility|Intellect|Spirit|All Stats|Armor)\s*/gi, '').trim();

    let reqLevel = null;
    const reqLM = rem.match(/Requires Level (\d+)/i);
    if (reqLM) {
      reqLevel = reqLM[0];
      rem = rem.replace(/Requires Level \d+\s*/i, '').trim();
    }

    let reqClass = null;
    const reqCM = rem.match(/Classes:\s*([A-Za-z, ]+)/i);
    if (reqCM) {
      reqClass = reqCM[0];
      rem = rem.replace(/Classes:\s*[A-Za-z, ]+\s*/i, '').trim();
    }

    let equip = null;
    const eqM = rem.match(/Equip:\s*([^]+?)(?=(?:Sell Price:|$))/i);
    if (eqM) {
      equip = eqM[1].trim();
      rem = rem.replace(/Equip:\s*[^]+?(?=(?:Sell Price:|$))/i, '').trim();
    }

    let use = null;
    const useM = rem.match(/Use:\s*([^]+?)(?=(?:Sell Price:|$))/i);
    if (useM) {
      use = useM[1].trim();
      rem = rem.replace(/Use:\s*[^]+?(?=(?:Sell Price:|$))/i, '').trim();
    }

    let sellPrice = null;
    const spM = rem.match(/Sell Price:\s*([0-9a-z ]+)/i);
    if (spM) {
      sellPrice = spM[1].trim();
      rem = rem.replace(/Sell Price:\s*[0-9a-z ]+/i, '').trim();
    }

    let generic = rem.trim();

    return { bind, slot, subType, dmgRow, dps, armor, stats, reqLevel, reqClass, equip, use, sellPrice, generic };
  }

  function showItemTooltip(e, name, quality = 1, desc = '', reagents = null, extra = null) {
    let tooltip = document.getElementById('wow-item-tooltip');
    if (!tooltip) {
      tooltip = document.createElement('div');
      tooltip.id = 'wow-item-tooltip';
      tooltip.className = 'wow-floating-tooltip';
      document.body.appendChild(tooltip);
    }

    const parsed = desc ? parseRecipeEffect(desc) : null;
    const hasStructuredStats = Boolean(parsed && (parsed.bind || parsed.slot || parsed.armor || parsed.dmgRow || parsed.stats.length || parsed.equip || parsed.reqLevel));

    let extraTop = '';
    if (extra && (extra.bop || extra.type) && !hasStructuredStats) {
      extraTop = `
        <div style="font-size: 0.76rem; color: #94a3b8; display: flex; justify-content: space-between; margin-top: 0.2rem;">
          <span>${escapeHtml(extra.bop || 'Binds when picked up')}</span>
          ${extra.type ? `<span>${escapeHtml(extra.type)}</span>` : ''}
        </div>
      `;
    }

    let extraSkill = '';
    if (extra && extra.skillReq) {
      extraSkill = `
        <div style="font-size: 0.8rem; color: #fff; margin-top: 0.35rem;">
          Requires <span style="color: var(--wow-skill-orange, #ff8000); font-weight: 600;">${escapeHtml(extra.skillReq)}</span>
        </div>
      `;
    }

    let extraUse = '';
    if (extra && extra.use) {
      extraUse = `
        <div style="font-size: 0.8rem; color: #4ade80; margin-top: 0.35rem; line-height: 1.35;">
          <strong>Use:</strong> ${escapeHtml(extra.use)}
        </div>
      `;
    }

    let extraCost = '';
    if (extra && (extra.cost || extra.source)) {
      extraCost = `
        <div style="margin-top: 0.45rem; padding-top: 0.35rem; border-top: 1px dashed rgba(255,255,255,0.12); font-size: 0.78rem; display: flex; justify-content: space-between; color: #cbd5e1;">
          <span>${extra.cost ? `Cost: <strong style="color: var(--text-gold, #facc15);">${escapeHtml(extra.cost)}</strong>` : ''}</span>
          ${extra.source ? `<span style="color: #94a3b8;">Source: <strong style="color: #e2e8f0;">${escapeHtml(extra.source)}</strong></span>` : ''}
        </div>
      `;
    }

    let structuredHtml = '';
    if (hasStructuredStats && parsed) {
      structuredHtml = `
        ${parsed.bind ? `<div style="font-size: 0.8rem; color: #fff; margin-top: 0.2rem;">${escapeHtml(parsed.bind)}</div>` : ''}
        ${(parsed.slot || parsed.subType) ? `
          <div style="font-size: 0.82rem; color: #fff; display: flex; justify-content: space-between; margin-top: 0.15rem;">
            <span>${escapeHtml(parsed.slot || '')}</span>
            <span>${escapeHtml(parsed.subType || '')}</span>
          </div>
        ` : ''}
        ${parsed.dmgRow ? `
          <div style="font-size: 0.82rem; color: #fff; display: flex; justify-content: space-between; margin-top: 0.25rem;">
            <span>${escapeHtml(parsed.dmgRow.dmg)}</span>
            <span>${escapeHtml(parsed.dmgRow.speed)}</span>
          </div>
          <div style="font-size: 0.78rem; color: #fff; margin-bottom: 0.2rem;">${escapeHtml(parsed.dps || '')}</div>
        ` : ''}
        ${parsed.armor ? `<div style="font-size: 0.82rem; color: #fff; margin: 0.2rem 0; font-weight: 600;">${escapeHtml(parsed.armor)}</div>` : ''}
        ${parsed.stats && parsed.stats.length ? `
          <div style="margin: 0.25rem 0;">
            ${parsed.stats.map(s => `<div style="font-size: 0.82rem; color: #fff;">${escapeHtml(s)}</div>`).join('')}
          </div>
        ` : ''}
        ${parsed.reqClass ? `<div style="font-size: 0.8rem; color: #fff; margin-top: 0.2rem;">${escapeHtml(parsed.reqClass)}</div>` : ''}
        ${parsed.reqLevel ? `<div style="font-size: 0.8rem; color: #fff; margin: 0.2rem 0;">${escapeHtml(parsed.reqLevel)}</div>` : ''}
        ${parsed.equip ? `<div style="font-size: 0.8rem; color: #1eff00; margin-top: 0.35rem; line-height: 1.35;">Equip: ${escapeHtml(parsed.equip)}</div>` : ''}
        ${(parsed.use || (extra && extra.use)) ? `<div style="font-size: 0.8rem; color: #4ade80; margin-top: 0.35rem; line-height: 1.35;"><strong>Use:</strong> ${escapeHtml(parsed.use || extra.use)}</div>` : ''}
        ${parsed.generic ? `<div style="font-size: 0.8rem; color: #cbd5e1; margin-top: 0.35rem; line-height: 1.4;">${escapeHtml(parsed.generic)}</div>` : ''}
        ${parsed.sellPrice ? `<div style="font-size: 0.75rem; color: #94a3b8; margin-top: 0.35rem;">Sell Price: ${escapeHtml(parsed.sellPrice)}</div>` : ''}
      `;
    }

    let reagentsHtml = '';
    if (reagents && reagents.length) {
      const craftsCount = extra && extra.crafts && extra.crafts > 1 ? Number(extra.crafts) : 1;
      reagentsHtml = `
        <div style="margin-top: 0.5rem; border-top: 1px dashed rgba(255,255,255,0.1); padding-top: 0.4rem;">
          <div style="font-size: 0.72rem; color: #94a3b8; margin-bottom: 0.3rem;">
            Reagents Required${craftsCount > 1 ? ` <span style="color: #38bdf8;">(Per Craft · Total for ~${craftsCount} Crafts)</span>` : ':'}
          </div>
          <div style="display: flex; gap: 0.35rem; flex-wrap: wrap;">
            ${reagents.map(r => {
              const perCraft = r.count || 1;
              const totalBracket = craftsCount * perCraft;
              return `
                <span style="display: inline-flex; align-items: center; gap: 0.25rem; background: rgba(0,0,0,0.4); padding: 0.15rem 0.35rem; border-radius: 3px; font-size: 0.72rem;">
                  <img src="${getIconUrl(r.icon)}" width="16" height="16" style="border-radius: 2px;" />
                  <span style="color: #fff; font-weight:700;">${perCraft}x</span>
                  <span class="q${r.quality || 1}">${escapeHtml(r.name)}</span>
                  ${craftsCount > 1 ? `<span style="color: #38bdf8; font-weight: 700; margin-left: 0.15rem;">(=${totalBracket} total)</span>` : ''}
                </span>
              `;
            }).join('')}
          </div>
        </div>
      `;
    }

    tooltip.innerHTML = `
      <div style="min-width: 240px; max-width: 360px; padding: 0.65rem 0.85rem; background: rgba(10, 14, 26, 0.96); border: 1px solid rgba(212, 175, 55, 0.5); border-radius: 6px; box-shadow: 0 8px 24px rgba(0,0,0,0.8); pointer-events: none;">
        <div class="q${quality}" style="font-weight: 700; font-size: 0.95rem; line-height: 1.3;">${escapeHtml(name)}</div>
        ${extraTop}
        ${extraSkill}
        ${hasStructuredStats ? structuredHtml : `
          ${extraUse}
          ${desc && !extraUse ? `<div style="font-size: 0.8rem; color: #cbd5e1; margin-top: 0.35rem; line-height: 1.4;">${escapeHtml(desc)}</div>` : ''}
        `}
        ${reagentsHtml}
        ${extraCost}
      </div>
    `;

    tooltip.removeAttribute('hidden');
    tooltip.style.display = 'block';
    tooltip.style.opacity = '1';
    tooltip.style.pointerEvents = 'none';
    tooltip.style.position = 'fixed';
    tooltip.style.zIndex = '9999999';

    positionTooltip(e, tooltip);
  }

  function positionTooltip(e, tooltip, targetEl = null) {
    const pad = 12;
    const ttWidth = tooltip.offsetWidth || 220;
    const ttHeight = tooltip.offsetHeight || 100;

    let x, y;
    if (e && typeof e.clientX === 'number' && !isNaN(e.clientX)) {
      x = e.clientX + 15;
      y = e.clientY + 15;
    } else {
      const el = targetEl || (e && e.target && e.target.getBoundingClientRect ? e.target : null);
      if (el) {
        const rect = el.getBoundingClientRect();
        x = rect.right + 10;
        y = rect.top;
      } else {
        x = pad;
        y = pad;
      }
    }

    let left = x;
    let top = y;
    if (left + ttWidth > window.innerWidth - pad) {
      left = (e && typeof e.clientX === 'number' && !isNaN(e.clientX)) ? e.clientX - ttWidth - 10 : window.innerWidth - ttWidth - pad;
    }
    if (top + ttHeight > window.innerHeight - pad) {
      top = (e && typeof e.clientY === 'number' && !isNaN(e.clientY)) ? e.clientY - ttHeight - 10 : window.innerHeight - ttHeight - pad;
    }
    tooltip.style.left = `${Math.max(pad, left)}px`;
    tooltip.style.top = `${Math.max(pad, top)}px`;
  }

  function hideItemTooltip() {
    const tooltip = document.getElementById('wow-item-tooltip');
    if (tooltip) {
      tooltip.style.display = 'none';
      tooltip.style.opacity = '0';
    }
  }

  function attachTooltipListeners(container, prof) {
    if (!prof) {
      // Overview Hub tooltips for camp buff cards and camp matrix stations
      container.querySelectorAll('.prof-dir-camp-box').forEach(el => {
        const strong = el.querySelector('strong');
        const text = el.textContent || '';
        const title = strong ? strong.textContent.replace(/:$/, '').trim() : 'Campfire Station Buff';
        el.addEventListener('mouseenter', (e) => {
          showItemTooltip(e, title, 2, text, null, {
            type: 'Camp Utility Station',
            use: 'Constructed at camp to grant party-wide benefits.'
          });
        });
        el.addEventListener('mousemove', (e) => {
          const tt = document.getElementById('wow-item-tooltip');
          if (tt) positionTooltip(e, tt);
        });
        el.addEventListener('mouseleave', hideItemTooltip);
      });

      container.querySelectorAll('.matrix-station-cell').forEach(el => {
        const strong = el.querySelector('strong');
        const small = el.querySelector('small');
        const title = strong ? strong.textContent.trim() : 'Profession Station';
        const desc = small ? small.textContent.replace(/^·\s*/, '').trim() : (el.getAttribute('title') || '');
        el.addEventListener('mouseenter', (e) => {
          showItemTooltip(e, title, 2, desc, null, {
            type: 'Campfire Profession Station',
            use: 'Provides 80% potency of class blessings to nearby party members for 1 hour.'
          });
        });
        el.addEventListener('mousemove', (e) => {
          const tt = document.getElementById('wow-item-tooltip');
          if (tt) positionTooltip(e, tt);
        });
        el.addEventListener('mouseleave', hideItemTooltip);
      });
      return;
    }

    // Main Recipes Catalog cards hover
    container.querySelectorAll('.recipe-card .recipe-item-icon, .recipe-card .recipe-title').forEach(el => {
      const name = el.getAttribute('data-recipe-name') || '';
      if (!name) return;
      const match = (prof.recipes || []).find(r => r.name && r.name.toLowerCase() === name.toLowerCase());
      if (!match) return;

      const extra = {
        type: `${prof.name || 'Crafted'} Item`,
        skillReq: `${prof.name} (${match.learn})`,
        source: match.source || 'Trainer'
      };

      el.addEventListener('mouseenter', (e) => {
        showItemTooltip(e, match.name, match.quality || 1, match.effect || '', match.reagents || null, extra);
      });
      el.addEventListener('mousemove', (e) => {
        const tt = document.getElementById('wow-item-tooltip');
        if (tt) positionTooltip(e, tt);
      });
      el.addEventListener('mouseleave', hideItemTooltip);
    });

    // Recipes / steps (with exact recipe lookup, Mining Smelt -> Bar mapping, Camping station lookup & click-to-inspect)
    container.querySelectorAll('.step-recipe-name, .step-crafted-icon-wrap').forEach(el => {
      const name = el.getAttribute('data-recipe-name') || el.textContent.replace(/↗$/, '').trim();
      const stepIdx = parseInt(el.getAttribute('data-step-idx') || '-1', 10);
      const stepObj = (stepIdx >= 0 && prof.leveling?.steps) ? prof.leveling.steps[stepIdx] : null;
      const resolved = resolveStepCraftedItem(stepObj || { recipeName: name, itemId: el.getAttribute('data-item-id') }, prof);
      const match = resolved.recipeObj;
      const targetSubtab = resolved.targetSubtab || 'recipes';

      const ttQuality = resolved.quality || (stepObj?.vendorDetails ? 2 : 1);
      const ttDesc = (match && match.effect) ? match.effect : (resolved.effect || stepObj?.advice || stepObj?.source || match?.source || '');
      const ttReagents = stepObj?.reagents || resolved.reagents || match?.reagents || null;
      const ttExtra = {
        type: `${prof.name || 'Tradeskill'} Step${stepObj?.crafts > 1 ? ` (~${stepObj.crafts} Crafts)` : ''}`,
        skillReq: resolved.learn ? `${prof.name} (${resolved.learn})` : (match?.learn ? `${prof.name} (${match.learn})` : (stepObj ? `${prof.name} (${stepObj.from}–${stepObj.to})` : '')),
        source: stepObj?.source || resolved.source || match?.source || 'Trainer',
        cost: stepObj?.vendorDetails?.cost || '',
        crafts: stepObj?.crafts || 1
      };

      el.addEventListener('mouseenter', (e) => {
        showItemTooltip(e, resolved.name || name, ttQuality, ttDesc, ttReagents, ttExtra);
      });
      el.addEventListener('mousemove', (e) => {
        const tt = document.getElementById('wow-item-tooltip');
        if (tt) positionTooltip(e, tt);
      });
      el.addEventListener('mouseleave', hideItemTooltip);
      el.addEventListener('focus', (e) => {
        showItemTooltip(e, resolved.name || name, ttQuality, ttDesc, ttReagents, ttExtra);
        const tt = document.getElementById('wow-item-tooltip');
        if (tt) positionTooltip(e, tt, el);
      });
      el.addEventListener('blur', hideItemTooltip);

      const handleStepRecipeClick = (e) => {
        e.stopPropagation();
        hideItemTooltip();
        if (window.setReturnTarget) {
          window.setReturnTarget({
            label: `${prof.name || 'Leveling'} Roadmap`,
            tab: 'professions',
            profession: prof.slug,
            subtab: 'leveling',
            scrollY: window.scrollY
          });
        }
        if (prof.slug === 'camping') {
          const destTab = targetSubtab === 'recipes' ? 'guide' : targetSubtab;
          if (window.WOW_PROFESSIONS?.selectProfession) {
            window.WOW_PROFESSIONS.selectProfession('camping', destTab, '');
            const targetItemName = resolved.targetName || resolved.name || name;
            setTimeout(() => {
              const cardEl = Array.from(document.querySelectorAll('.camp-tooltip-item')).find(
                c => (c.getAttribute('data-item-name') || '').toLowerCase() === targetItemName.toLowerCase()
              );
              if (cardEl) {
                cardEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
                cardEl.classList.add('recipe-card-highlight');
                setTimeout(() => cardEl.classList.remove('recipe-card-highlight'), 2500);
              }
            }, 150);
          }
          return;
        }
        if (prof.recipes && prof.recipes.length > 0) {
          const lookupQuery = resolved.name || name.replace(/^Make (a|an) /i, '').replace(/\s*\(Smelting Bypass\)$/i, '').trim();
          if (window.WOW_PROFESSIONS?.selectProfession) {
            window.WOW_PROFESSIONS.selectProfession(prof.slug, 'recipes', lookupQuery, resolved.id || match?.id || '');
          }
        } else {
          const itemId = el.getAttribute('data-item-id') || resolved.id || '';
          openReverseReagentLookup((resolved.name || name).replace(/\s*\(Smelting Bypass\)$/i, '').trim(), itemId);
        }
      };

      el.addEventListener('click', handleStepRecipeClick);
      el.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleStepRecipeClick(e);
        }
      });
    });

    // Merchant's Favor recipe card/bar hover
    container.querySelectorAll('.favor-recipe-card').forEach(el => {
      const name = el.getAttribute('data-recipe-name') || '';
      const crafted = el.getAttribute('data-crafted-name') || '';
      const quality = parseInt(el.getAttribute('data-quality') || '1', 10);
      const effect = el.getAttribute('data-effect') || '';
      const skill = el.getAttribute('data-skill') || '1';
      const cost = el.getAttribute('data-cost') || '';
      const profName = el.getAttribute('data-prof') || prof.name || 'Trade';

      const match = (prof.recipes || []).find(r => 
        r.name && (
          r.name.toLowerCase() === crafted.toLowerCase() ||
          r.name.toLowerCase() === name.toLowerCase() ||
          (r.source && r.source.toLowerCase().includes(name.toLowerCase()))
        )
      );

      const reagents = match?.reagents || null;
      const extra = {
        bop: 'Binds when picked up',
        type: `${profName} Formula`,
        skillReq: `${profName} (${skill})`,
        use: effect ? `Teaches ${crafted || name}. ${effect}` : `Teaches ${crafted || name}.`,
        cost: cost,
        source: 'Merchant\'s Favor Quartermaster'
      };

      el.addEventListener('mouseenter', (e) => {
        showItemTooltip(e, name, quality, effect, reagents, extra);
      });
      el.addEventListener('mousemove', (e) => {
        const tt = document.getElementById('wow-item-tooltip');
        if (tt) positionTooltip(e, tt);
      });
      el.addEventListener('mouseleave', hideItemTooltip);
    });

    // Merchant's Favor Skill Requirement Progress Bars hover
    container.querySelectorAll('.favor-skill-track').forEach(el => {
      const skill = el.getAttribute('data-skill') || '1';
      const profName = el.getAttribute('data-prof') || prof.name || 'Trade';
      const percent = Math.min(100, Math.round((parseInt(skill, 10) / 300) * 100));

      el.addEventListener('mouseenter', (e) => {
        e.stopPropagation();
        showItemTooltip(
          e, 
          `${profName} Skill Requirement: ${skill} / 300`, 
          2, 
          `Requires ${skill} ${profName} skill to learn and craft. Leveling progression is currently capped at 225 during the beta phase (${percent}% toward 300 mastery).`, 
          null, 
          { type: 'Skill Milestone', skillReq: `${profName} (${skill})` }
        );
      });
      el.addEventListener('mousemove', (e) => {
        const tt = document.getElementById('wow-item-tooltip');
        if (tt) positionTooltip(e, tt);
      });
      el.addEventListener('mouseleave', (e) => {
        e.stopPropagation();
        hideItemTooltip();
      });
    });

    // Stacking exclusion lookup for camp stations
    const campBuffStackingNotes = {
      'Mana Well': 'Does not stack with Blessing of Wisdom or Mana Spring Totem.',
      'Sharpening Wheel': 'Does not stack with Strength of Earth Totem.',
      'Enchanted Lute': 'Does not stack with Mark of the Wild.',
      'Faction Banner': 'Does not stack with Divine Spirit.',
      'Lodestone': 'Does not stack with Blessing of Might or Battle Shout.',
      'Incense Candle': 'Does not stack with Arcane Intellect.',
      'Fish Bowl': 'Does not stack with Blessing of Kings.',
      'First Aid Kit': 'Does not stack with Power Word: Fortitude.'
    };

    // Camping object and kit cards hover
    container.querySelectorAll('.camp-tooltip-item').forEach(el => {
      const name = el.getAttribute('data-item-name') || '';
      const quality = parseInt(el.getAttribute('data-quality') || '1', 10);
      const effect = el.getAttribute('data-effect') || '';
      const req = el.getAttribute('data-req') || '';
      const desc = el.getAttribute('data-desc') || '';
      if (!name) return;

      const stackNote = campBuffStackingNotes[name] ? ` (${campBuffStackingNotes[name]})` : '';
      const fullUse = (effect ? `Place near a campfire. ${effect}` : desc) + stackNote;

      const triggerTooltip = (e) => {
        showItemTooltip(e, name, quality, effect || desc, null, {
          type: 'Camp Utility Object',
          skillReq: req,
          use: fullUse
        });
      };

      el.addEventListener('mouseenter', triggerTooltip);
      el.addEventListener('click', triggerTooltip);
      el.addEventListener('mousemove', (e) => {
        const tt = document.getElementById('wow-item-tooltip');
        if (tt) positionTooltip(e, tt);
      });
      el.addEventListener('mouseleave', hideItemTooltip);
    });

    // Reagent source quick action buttons on recipe cards
    container.querySelectorAll('.recipe-reagent-cta-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        hideItemTooltip();
        const name = btn.getAttribute('data-reagent-name');
        const rawId = btn.getAttribute('data-reagent-id') || '';
        const targetTab = btn.getAttribute('data-reagent-tab') || 'fishing';
        openReverseReagentLookup(name, rawId, targetTab);
      });
    });

    // Reagent chips, badges & shopping rows - hover for tooltip, click for reverse lookup modal
    container.querySelectorAll('.reagent-chip, .step-reagent-badge, .shopping-row-card').forEach(el => {
      const name = el.getAttribute('data-item-name') || el.getAttribute('title') || '';
      const rawId = el.getAttribute('data-item-id') || '';
      const perCraft = parseInt(el.getAttribute('data-per-craft') || '0', 10);
      const totalStep = parseInt(el.getAttribute('data-total-step') || '0', 10);
      const stepCrafts = parseInt(el.getAttribute('data-crafts') || '0', 10);
      if (!name) return;
      const triggerTooltip = (e) => {
        e.stopPropagation();
        const src = resolveReagentSource(name, rawId);
        let summaryDesc = src && src.summary ? src.summary : 'Crafting Reagent / Material';
        if (perCraft > 0 && stepCrafts > 1) {
          summaryDesc = `${perCraft}x per craft × ~${stepCrafts} crafts = ${totalStep}x total for this bracket. ${summaryDesc}`;
        } else if (perCraft > 0) {
          summaryDesc = `${perCraft}x required for this step. ${summaryDesc}`;
        }
        let useHint = 'Click to find all recipes across professions that use this material.';
        if (src) {
          if (src.primaryType === 'fished' && src.fishedIn && src.fishedIn.length > 0) {
            useHint = `🎣 Click to view where to fish this (${src.fishedIn.length} Waters), mob drops & recipes.`;
          } else {
            useHint = `${src.ctaIcon || '📍'} Click to view farming sources, drop rates, vendors & recipes.`;
          }
        }
        showItemTooltip(e, name, 1, summaryDesc, null, { 
          type: perCraft > 0 && stepCrafts > 1 ? `Bracket Reagent (${perCraft}x · =${totalStep} Total)` : 'Crafting Component',
          use: useHint
        });
      };
      el.addEventListener('mouseenter', triggerTooltip);
      el.addEventListener('click', (e) => {
        if (e.target.classList.contains('shopping-item-check')) return;
        e.stopPropagation();
        hideItemTooltip();
        const src = resolveReagentSource(name, rawId);
        let defaultTab = null;
        if (src?.primaryType === 'fished' && src.fishedIn?.length) defaultTab = 'fishing';
        else if (src?.primaryType === 'mob_drop' && src.drops?.length) defaultTab = 'drops';
        else if (src?.primaryType === 'vendor' && src.vendors?.length) defaultTab = 'vendors';
        else if (src?.primaryType === 'herb' || src?.primaryType === 'ore') defaultTab = 'nodes';
        else if (src?.primaryType === 'skinned' && src.skinnedFrom?.length) defaultTab = 'skinning';
        openReverseReagentLookup(name, rawId, defaultTab);
      });
      el.addEventListener('mousemove', (e) => {
        const tt = document.getElementById('wow-item-tooltip');
        if (tt) positionTooltip(e, tt);
      });
      el.addEventListener('mouseleave', (e) => {
        e.stopPropagation();
        hideItemTooltip();
      });
    });
  }

  /* ==========================================================================
     REVERSE REAGENT SEARCH & ACQUISITION SOURCE MODAL ENGINE
     ========================================================================== */
  function resolveReagentSource(rawName, explicitId = null) {
    const sources = window.WOW_REAGENT_SOURCES || {};
    if (explicitId && sources[explicitId]) {
      return sources[explicitId];
    }
    if (!rawName) return null;
    const cleanName = rawName.replace(/^\d+x\s*/i, '').trim().toLowerCase();
    for (const src of Object.values(sources)) {
      if (src.name && src.name.toLowerCase() === cleanName) {
        return src;
      }
    }
    for (const src of Object.values(sources)) {
      if (src.name && (src.name.toLowerCase().includes(cleanName) || cleanName.includes(src.name.toLowerCase()))) {
        return src;
      }
    }
    return null;
  }

  function openReverseReagentLookup(rawName, explicitId = null, initialTab = null) {
    if (!rawName) return;
    const cleanName = rawName.replace(/^\d+x\s*/i, '').trim();
    const cleanLower = cleanName.toLowerCase();
    const data = window.WOW_PROFESSIONS_DATA || {};

    const matches = [];
    let matIcon = '';
    let matQuality = 1;
    let resolvedId = explicitId ? Number(explicitId) : null;

    Object.entries(data).forEach(([slug, p]) => {
      (p.recipes || []).forEach(r => {
        const mat = (r.reagents || []).find(m => {
          if (!m.name) return false;
          const mn = m.name.replace(/^\d+x\s*/i, '').trim().toLowerCase();
          return mn === cleanLower || mn.includes(cleanLower) || cleanLower.includes(mn);
        });
        if (mat) {
          if (!matIcon && mat.icon) matIcon = mat.icon;
          if (mat.quality) matQuality = mat.quality;
          if (!resolvedId && (mat.id || mat.itemId)) resolvedId = Number(mat.id || mat.itemId);
          matches.push({
            profSlug: slug,
            profName: p.name,
            profIcon: p.icon,
            recipe: r,
            neededCount: mat.count || 1
          });
        }
      });
    });

    const sourceData = resolveReagentSource(cleanName, resolvedId);
    if (!resolvedId && sourceData?.id) {
      resolvedId = sourceData.id;
    }

    let modal = document.getElementById('prof-reagent-lookup-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'prof-reagent-lookup-modal';
      modal.className = 'reagent-lookup-backdrop';
      modal.setAttribute('role', 'dialog');
      modal.setAttribute('aria-modal', 'true');
      document.body.appendChild(modal);

      modal.addEventListener('click', (e) => {
        if (e.target === modal) closeReagentModal();
      });
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('is-open')) {
          closeReagentModal();
        }
      });
    }

    function closeReagentModal() {
      hideItemTooltip();
      modal.classList.remove('is-open');
      modal.setAttribute('hidden', '');
    }

    const profCounts = {};
    matches.forEach(m => {
      profCounts[m.profName] = (profCounts[m.profName] || 0) + 1;
    });
    const profNames = Object.keys(profCounts);
    const iconUrl = matIcon ? getIconUrl(matIcon) : `${CDN_BASE}inv_misc_questionmark.jpg`;

    const hasFishing = Boolean(sourceData?.fishedIn && sourceData.fishedIn.length > 0);
    const hasDrops = Boolean(sourceData?.drops && sourceData.drops.length > 0);
    const hasVendors = Boolean(sourceData?.vendors && sourceData.vendors.length > 0);
    const validMinedFrom = (sourceData?.minedFrom || []).filter(o => o.pct > 0);
    const validGatheredFrom = (sourceData?.gatheredFrom || []).filter(o => o.pct > 0);
    const nodeObjects = validMinedFrom.concat(validGatheredFrom);
    const hasNodes = Boolean(nodeObjects.length > 0 || sourceData?.herbNode || sourceData?.miningNode);
    const hasSkinning = Boolean(sourceData?.skinnedFrom && sourceData.skinnedFrom.length > 0);
    const hasDisenchant = Boolean(sourceData?.primaryType === 'disenchant' || sourceData?.disenchant || isDisenchantMaterial(cleanName));

    let activeFilter = 'all';
    let activeModalView = initialTab;

    if (!activeModalView) {
      if ((sourceData?.primaryType === 'disenchant' || isDisenchantMaterial(cleanName)) && hasDisenchant) {
        activeModalView = 'disenchant';
      } else if (sourceData?.primaryType === 'fished' && hasFishing) {
        activeModalView = 'fishing';
      } else if (sourceData?.primaryType === 'mob_drop' && hasDrops) {
        activeModalView = 'drops';
      } else if (sourceData?.primaryType === 'vendor' && hasVendors) {
        activeModalView = 'vendors';
      } else if (sourceData?.primaryType === 'herb' || sourceData?.primaryType === 'ore') {
        activeModalView = 'nodes';
      } else if (sourceData?.primaryType === 'skinned' && hasSkinning) {
        activeModalView = 'skinning';
      } else if (matches.length > 0) {
        activeModalView = 'recipes';
      } else if (hasFishing) {
        activeModalView = 'fishing';
      } else if (hasDrops) {
        activeModalView = 'drops';
      } else if (hasVendors) {
        activeModalView = 'vendors';
      } else {
        activeModalView = 'recipes';
      }
    } else if (activeModalView === 'sources') {
      if (sourceData?.primaryType === 'fished' && hasFishing) {
        activeModalView = 'fishing';
      } else if (sourceData?.primaryType === 'mob_drop' && hasDrops) {
        activeModalView = 'drops';
      } else if (sourceData?.primaryType === 'vendor' && hasVendors) {
        activeModalView = 'vendors';
      } else if (hasFishing) {
        activeModalView = 'fishing';
      } else if (hasDrops) {
        activeModalView = 'drops';
      } else {
        activeModalView = 'all';
      }
    }

    function renderAcquisitionView(src, viewMode = 'all') {
      if (!src && !hasDisenchant) {
        return `
          <div class="reagent-lookup-empty">
            No specific open-world drop table recorded for this reagent.
            ${resolvedId ? `<div style="margin-top:0.75rem;"><a href="https://www.wowhead.com/forever/item=${resolvedId}" target="_blank" rel="noopener" class="reagent-wowhead-ext-btn">🌐 View on Wowhead Forever ↗</a></div>` : ''}
          </div>
        `;
      }
      if (!src && hasDisenchant) {
        src = { name: cleanName, primaryType: 'disenchant' };
      }

      // Summary Banner + Internal Jump Buttons
      let internalJumpHtml = '';
      if ((viewMode === 'all' || viewMode === 'nodes') && src.primaryType === 'herb' && src.herbNode) {
        internalJumpHtml += `
          <button type="button" class="reagent-internal-jump-btn" data-jump-prof="herbalism" data-jump-subtab="nodes">
            <span>🌿</span> View ${escapeHtml(src.herbNode.name)} in Herbalism Nodes (Skill ${src.herbNode.skill}+) ›
          </button>
        `;
      }
      if ((viewMode === 'all' || viewMode === 'nodes') && src.primaryType === 'ore' && src.miningNode) {
        internalJumpHtml += `
          <button type="button" class="reagent-internal-jump-btn" data-jump-prof="mining" data-jump-subtab="nodes">
            <span>⛏️</span> View ${escapeHtml(src.miningNode.name)} in Mining Nodes (Skill ${src.miningNode.skill}+) ›
          </button>
        `;
      }
      if ((viewMode === 'all' || viewMode === 'fishing') && src.fishedIn && src.fishedIn.length > 0) {
        internalJumpHtml += `
          <button type="button" class="reagent-internal-jump-btn" data-jump-prof="fishing" data-jump-subtab="waters">
            <span>🌊</span> View Fishing Waters & Skill Brackets ›
          </button>
        `;
      }
      if ((viewMode === 'all' || viewMode === 'skinning') && src.primaryType === 'skinned' && src.skinnedFrom && src.skinnedFrom.length > 0) {
        internalJumpHtml += `
          <button type="button" class="reagent-internal-jump-btn" data-jump-prof="skinning" data-jump-subtab="leveling">
            <span>🔪</span> View Skinning Beast Level Brackets ›
          </button>
        `;
      }

      let summaryTitle = `How to Acquire ${escapeHtml(cleanName)} in WoW Forever`;
      let summaryText = src.summary || 'Looted, gathered, or purchased across Azeroth.';
      let summaryIcon = src.ctaIcon || '📍';

      if (viewMode === 'fishing') {
        summaryTitle = `Where to Fish ${escapeHtml(cleanName)}`;
        summaryIcon = '🎣';
        const topZ = (src.fishedIn || []).slice(0, 3).map(f => `${f.zone}${f.pct ? ` (${f.pct}%)` : ''}`).join(', ');
        summaryText = topZ ? `Catch from open waters in ${topZ}. Minimum fishing skill and zone waters listed below.` : 'Fished in open waters across Azeroth.';
      } else if (viewMode === 'drops') {
        summaryTitle = `Top Mobs Dropping ${escapeHtml(cleanName)}`;
        summaryIcon = '⚔️';
        const mobTotal = src.totalDropMobs || (src.drops ? src.drops.length : 0);
        summaryText = `Farmed from ${mobTotal} mobs across Azeroth. Drop rates, spawn zones, and mob levels listed below.`;
      } else if (viewMode === 'vendors') {
        summaryTitle = `Vendors Selling ${escapeHtml(cleanName)}`;
        summaryIcon = '🪙';
        const totalV = src.totalVendors || (src.vendors ? src.vendors.length : 0);
        summaryText = `Purchased from ${totalV} trade vendors across Azeroth. Prices, stock limits, and locations listed below.`;
      }

      const summaryBoxHtml = `
        <div class="reagent-source-summary-box">
          <div class="reagent-source-summary-main">
            <span class="reagent-source-summary-icon">${summaryIcon}</span>
            <div>
              <div class="reagent-source-summary-title">${summaryTitle}</div>
              <p class="reagent-source-summary-text">${escapeHtml(summaryText)}</p>
            </div>
          </div>
          ${internalJumpHtml ? `<div class="reagent-source-internal-jumps">${internalJumpHtml}</div>` : ''}
        </div>
      `;

      // Fishing Waters Section ('fished-in')
      const fishingWatersData = window.WOW_PROFESSIONS_DATA?.fishing?.fishingWaters || [];
      const zoneSkillMap = {};
      fishingWatersData.forEach(w => {
        (w.zones || '').split(',').forEach(z => {
          zoneSkillMap[z.trim().toLowerCase()] = w.skill;
        });
      });

      const fishingSectionHtml = (src.fishedIn && src.fishedIn.length > 0) ? `
        <div class="reagent-source-section">
          <div class="reagent-source-sec-head">
            <h4 class="reagent-source-sec-title"><span>🎣</span> Best Fishing Zones (${src.fishedIn.length})</h4>
            <a href="https://www.wowhead.com/forever/item=${src.id}#fished-in" target="_blank" rel="noopener" class="reagent-sec-wowhead-link">
              Full fishing table on Wowhead ↗
            </a>
          </div>
          <div class="reagent-source-grid">
            ${src.fishedIn.map(f => {
              const pctVal = f.pct !== null && f.pct !== undefined ? `${f.pct}%` : 'Catch';
              const pctClass = f.pct >= 35 ? 'high' : (f.pct >= 15 ? 'med' : 'low');
              const lvlStr = f.minLevel ? `Zone Lvl ${f.minLevel}–${f.maxLevel || f.minLevel}` : 'Open Water';
              const reqSkill = zoneSkillMap[(f.zone || '').trim().toLowerCase()];
              const skillBadge = reqSkill ? ` · <span class="reagent-row-skill">Fishing ${reqSkill}</span>` : '';
              return `
                <div class="reagent-source-card">
                  <div class="reagent-source-card-left">
                    <span class="reagent-drop-pct-badge ${pctClass}">${pctVal}</span>
                    <div>
                      <div class="reagent-source-name">🌊 ${escapeHtml(f.zone)}</div>
                      <div class="reagent-source-sub">${escapeHtml(lvlStr)}${skillBadge}</div>
                    </div>
                  </div>
                  <a href="https://www.wowhead.com/forever/zone=${f.id}" target="_blank" rel="noopener" class="reagent-npc-map-btn" title="View ${escapeHtml(f.zone)} fishing water map on Wowhead Forever">
                    Map ↗
                  </a>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      ` : '';

      // Mob Drops Table ('dropped-by')
      const totalMobs = src.totalDropMobs || (src.drops ? src.drops.length : 0);
      const dropsSectionHtml = (src.drops && src.drops.length > 0) ? `
        <div class="reagent-source-section">
          <div class="reagent-source-sec-head">
            <h4 class="reagent-source-sec-title"><span>⚔️</span> Top Farming Mobs (${src.drops.length} of ${totalMobs} Mobs)</h4>
            <a href="https://www.wowhead.com/forever/item=${src.id}#dropped-by" target="_blank" rel="noopener" class="reagent-sec-wowhead-link">
              See all ${totalMobs} mobs & spawn maps on Wowhead ↗
            </a>
          </div>
          <div class="reagent-source-grid">
            ${src.drops.map(d => {
              const lvlStr = d.minLevel ? (d.maxLevel && d.maxLevel !== d.minLevel ? `Lvl ${d.minLevel}–${d.maxLevel}` : `Lvl ${d.minLevel}`) : '';
              const zoneStr = (d.zones && d.zones.length) ? d.zones.join(', ') : 'Azeroth';
              const pctVal = d.pct !== null && d.pct !== undefined ? `${d.pct}%` : 'Drop';
              const pctClass = d.pct >= 50 ? 'high' : (d.pct >= 20 ? 'med' : 'low');
              return `
                <div class="reagent-source-card">
                  <div class="reagent-source-card-left">
                    <span class="reagent-drop-pct-badge ${pctClass}" title="Estimated Drop Chance">${pctVal}</span>
                    <div>
                      <div class="reagent-source-name">
                        ${escapeHtml(d.name)}
                        ${d.elite ? '<span class="reagent-mob-tag elite">Elite</span>' : ''}
                        ${d.rare ? '<span class="reagent-mob-tag rare">Rare</span>' : ''}
                        ${d.isNew ? '<span class="recipe-new-tag">New</span>' : ''}
                      </div>
                      <div class="reagent-source-sub">
                        ${lvlStr ? `<span class="reagent-mob-lvl">${lvlStr}</span> · ` : ''}
                        <span class="reagent-mob-zone">📍 ${escapeHtml(zoneStr)}</span>
                      </div>
                    </div>
                  </div>
                  <a href="https://www.wowhead.com/forever/npc=${d.id}" target="_blank" rel="noopener" class="reagent-npc-map-btn" title="View ${escapeHtml(d.name)} spawn map on Wowhead Forever">
                    Map ↗
                  </a>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      ` : '';

      // Vendors ('sold-by')
      const totalV = src.totalVendors || (src.vendors ? src.vendors.length : 0);
      const vendorsSectionHtml = (src.vendors && src.vendors.length > 0) ? `
        <div class="reagent-source-section">
          <div class="reagent-source-sec-head">
            <h4 class="reagent-source-sec-title"><span>🪙</span> Sold By Vendors (${src.vendors.length} of ${totalV} Vendors)</h4>
            <a href="https://www.wowhead.com/forever/item=${src.id}#sold-by" target="_blank" rel="noopener" class="reagent-sec-wowhead-link">
              All ${totalV} vendors on Wowhead ↗
            </a>
          </div>
          <div class="reagent-source-grid">
            ${src.vendors.map(v => {
              const zoneStr = (v.zones && v.zones.length) ? v.zones.join(', ') : 'Camp / Major Cities';
              const fClass = (v.faction || 'Neutral').toLowerCase();
              return `
                <div class="reagent-source-card">
                  <div class="reagent-source-card-left">
                    <span class="reagent-vendor-faction-badge ${fClass}">${escapeHtml(v.faction || 'Neutral')}</span>
                    <div>
                      <div class="reagent-source-name">
                        ${escapeHtml(v.name)}
                        ${v.tag ? `<small style="color:#94a3b8; font-weight:500;">&lt;${escapeHtml(v.tag)}&gt;</small>` : ''}
                        ${v.isNew ? '<span class="recipe-new-tag">New</span>' : ''}
                      </div>
                      <div class="reagent-source-sub">
                        📍 ${escapeHtml(zoneStr)}
                        ${v.cost ? ` · <strong style="color:#facc15;">${escapeHtml(v.cost)}</strong>` : ''}
                        · ${v.stock ? `<span style="color:#fb923c;">Limited (${v.stock})</span>` : '<span style="color:#4ade80;">Unlimited</span>'}
                      </div>
                    </div>
                  </div>
                  <a href="https://www.wowhead.com/forever/npc=${v.id}" target="_blank" rel="noopener" class="reagent-npc-map-btn">
                    Map ↗
                  </a>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      ` : '';

      // Mined / Gathered Nodes Section
      const validMined = (src.minedFrom || []).filter(o => o.pct > 0);
      const validGathered = (src.gatheredFrom || []).filter(o => o.pct > 0);
      const nodesList = validMined.concat(validGathered);
      const nodesSectionHtml = (nodesList.length > 0) ? `
        <div class="reagent-source-section">
          <div class="reagent-source-sec-head">
            <h4 class="reagent-source-sec-title"><span>${validMined.length ? '⛏️' : '🌿'}</span> Harvested From World Nodes (${nodesList.length})</h4>
            <a href="https://www.wowhead.com/forever/item=${src.id}#${validMined.length ? 'mined-from-object' : 'gathered-from-object'}" target="_blank" rel="noopener" class="reagent-sec-wowhead-link">
              Node spawn maps on Wowhead ↗
            </a>
          </div>
          <div class="reagent-source-grid">
            ${nodesList.map(o => {
              const zoneStr = (o.zones && o.zones.length) ? o.zones.join(', ') : (src.herbNode?.zones || src.miningNode?.zones || 'Azeroth');
              const pctVal = o.pct !== null && o.pct !== undefined && o.pct > 0 ? `${o.pct}%` : '100%';
              return `
                <div class="reagent-source-card">
                  <div class="reagent-source-card-left">
                    <span class="reagent-drop-pct-badge high">${pctVal}</span>
                    <div>
                      <div class="reagent-source-name">${escapeHtml(o.name)}</div>
                      <div class="reagent-source-sub">📍 ${escapeHtml(zoneStr)}</div>
                    </div>
                  </div>
                  <a href="https://www.wowhead.com/forever/object=${o.id}" target="_blank" rel="noopener" class="reagent-npc-map-btn">
                    Map ↗
                  </a>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      ` : '';

      // Beasts to Skin Section
      const skinningSectionHtml = (src.skinnedFrom && src.skinnedFrom.length > 0) ? `
        <div class="reagent-source-section">
          <div class="reagent-source-sec-head">
            <h4 class="reagent-source-sec-title"><span>🔪</span> Best Beasts to Skin (${src.skinnedFrom.length})</h4>
            <a href="https://www.wowhead.com/forever/item=${src.id}#skinned-from" target="_blank" rel="noopener" class="reagent-sec-wowhead-link">
              All skinnable beasts on Wowhead ↗
            </a>
          </div>
          <div class="reagent-source-grid">
            ${src.skinnedFrom.map(s => {
              const lvlStr = s.minLevel ? (s.maxLevel && s.maxLevel !== s.minLevel ? `Lvl ${s.minLevel}–${s.maxLevel}` : `Lvl ${s.minLevel}`) : '';
              const zoneStr = (s.zones && s.zones.length) ? s.zones.join(', ') : 'Azeroth';
              const pctVal = s.pct !== null && s.pct !== undefined ? `${s.pct}%` : 'Skin';
              return `
                <div class="reagent-source-card">
                  <div class="reagent-source-card-left">
                    <span class="reagent-drop-pct-badge high">${pctVal}</span>
                    <div>
                      <div class="reagent-source-name">${escapeHtml(s.name)}</div>
                      <div class="reagent-source-sub">${lvlStr ? `${lvlStr} · ` : ''}📍 ${escapeHtml(zoneStr)}</div>
                    </div>
                  </div>
                  <a href="https://www.wowhead.com/forever/npc=${s.id}" target="_blank" rel="noopener" class="reagent-npc-map-btn">
                    Map ↗
                  </a>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      ` : '';

      // Crafted By Section
      const craftedSectionHtml = (src.craftedBy && src.craftedBy.length > 0) ? `
        <div class="reagent-source-section">
          <h4 class="reagent-source-sec-title"><span>🔨</span> Crafted By Profession (${src.craftedBy.length})</h4>
          <div class="reagent-source-grid">
            ${src.craftedBy.map(c => `
              <div class="reagent-source-card">
                <div class="reagent-source-card-left">
                  <img src="${getIconUrl(c.profIcon)}" alt="${escapeHtml(c.profName)}" class="reagent-source-mini-icon" />
                  <div>
                    <div class="reagent-source-name">${escapeHtml(c.recipeName)}</div>
                    <div class="reagent-source-sub">${escapeHtml(c.profName)} · <span class="reagent-row-skill">Skill ${c.learn}</span> · ${escapeHtml(c.source)}</div>
                  </div>
                </div>
                <button type="button" class="reagent-jump-btn" data-slug="${c.profSlug}" data-recipe-id="${c.recipeId || ''}" data-recipe-name="${escapeHtml(c.recipeName)}">
                  Craft in ${escapeHtml(c.profName)} ›
                </button>
              </div>
            `).join('')}
          </div>
        </div>
      ` : '';

      // Contained In Clams / Objects Section
      const containedSectionHtml = (src.containedIn && src.containedIn.length > 0) ? `
        <div class="reagent-source-section">
          <h4 class="reagent-source-sec-title"><span>🐚</span> Contained Inside Clams & Objects (${src.containedIn.length})</h4>
          <div class="reagent-source-grid">
            ${src.containedIn.map(c => `
              <div class="reagent-source-card">
                <div class="reagent-source-card-left">
                  <span class="reagent-drop-pct-badge high">${c.pct ? c.pct + '%' : 'Loot'}</span>
                  <div>
                    <div class="reagent-source-name">${escapeHtml(c.name)}</div>
                    <div class="reagent-source-sub">Open in inventory or world container</div>
                  </div>
                </div>
                <a href="https://www.wowhead.com/forever/item=${c.id}" target="_blank" rel="noopener" class="reagent-npc-map-btn">
                  Item ↗
                </a>
              </div>
            `).join('')}
          </div>
        </div>
      ` : '';

      // Disenchanting Section & Yield Matrix
      const disenchantSectionHtml = (hasDisenchant || src.disenchant) ? `
        <div class="reagent-source-section">
          <div class="reagent-source-sec-head">
            <h4 class="reagent-source-sec-title"><span>✨</span> Disenchanting Yield &amp; Item-Level Matrix</h4>
            <span class="beta-cap-tag" style="background: rgba(147, 51, 234, 0.2); border-color: #a855f7; color: #d8b4fe;">
              Armor vs Weapon Rates
            </span>
          </div>

          <div class="reagent-source-summary-box" style="margin-bottom: 0.85rem;">
            <div class="reagent-source-summary-main">
              <span class="reagent-source-summary-icon">✨</span>
              <div>
                <div class="reagent-source-summary-title">How Disenchanting Works</div>
                <p class="reagent-source-summary-text">
                  Disenchanting converts Green (Uncommon), Blue (Rare), and Purple (Epic) equipment into magical enchanting materials based on Item Level (iLvl).
                  Weapons favor <strong>Essences (~75%)</strong>, while Armor favors <strong>Dusts (~75%)</strong>. Rare equipment guarantees <strong>100% Shard yields</strong>.
                </p>
              </div>
            </div>
          </div>

          <div class="de-salvager-callout">
            <span class="de-salvager-icon">⛺</span>
            <div>
              <strong>Camp Arcane Salvager (Camp Skill 140 Station Blueprint):</strong>
              Allows Enchanters to disenchant equipment anywhere in the wild at your party's campfire with <strong>+15% yield efficiency</strong> and provides the party-wide <em>Enchanted Lute</em> aura (+308 Armor, +13 All Stats, +22 Resists)!
            </div>
          </div>

          <div class="de-matrix-table-wrap">
            <table class="de-matrix-table">
              <thead>
                <tr>
                  <th>Equipment iLvl</th>
                  <th>Dust Yield (Armor ~75%)</th>
                  <th>Essence Yield (Weapons ~75%)</th>
                  <th>Rare / Epic Shard (100%)</th>
                  <th>Notes</th>
                </tr>
              </thead>
              <tbody>
                ${DISENCHANT_BRACKETS_DATA.map(b => {
                  const isHighlighted = (cleanLower.includes('strange dust') && (b.ilvl.includes('5–15') || b.ilvl.includes('16–25'))) ||
                    (cleanLower.includes('soul dust') && b.ilvl.includes('26–35')) ||
                    (cleanLower.includes('vision dust') && b.ilvl.includes('36–45')) ||
                    (cleanLower.includes('dream dust') && b.ilvl.includes('46–50')) ||
                    (cleanLower.includes('illusion dust') && b.ilvl.includes('51–60')) ||
                    (cleanLower.includes('magic essence') && (b.ilvl.includes('5–15') || b.ilvl.includes('16–25'))) ||
                    (cleanLower.includes('astral essence') && b.ilvl.includes('26–35')) ||
                    (cleanLower.includes('mystic essence') && b.ilvl.includes('36–45')) ||
                    (cleanLower.includes('nether essence') && b.ilvl.includes('46–50')) ||
                    (cleanLower.includes('eternal essence') && b.ilvl.includes('51–60')) ||
                    (cleanLower.includes('glimmering') && b.ilvl.includes('16–25')) ||
                    (cleanLower.includes('glowing') && b.ilvl.includes('26–35')) ||
                    (cleanLower.includes('radiant') && (b.ilvl.includes('36–45') || b.ilvl.includes('46–50'))) ||
                    (cleanLower.includes('brilliant') && b.ilvl.includes('51–60')) ||
                    (cleanLower.includes('nexus') && b.ilvl.includes('51–60'));
                  return `
                    <tr class="${isHighlighted ? 'de-row-highlight' : ''}">
                      <td><span class="de-ilvl-badge">${escapeHtml(b.ilvl)}</span></td>
                      <td>${escapeHtml(b.dust)}</td>
                      <td>${escapeHtml(b.essence)}</td>
                      <td>${escapeHtml(b.shard)}</td>
                      <td><small>${escapeHtml(b.notes)}</small></td>
                    </tr>
                  `;
                }).join('')}
              </tbody>
            </table>
          </div>

          ${src?.disenchant?.sampleItems?.length ? `
            <div class="reagent-source-section" style="margin-top: 1rem;">
              <h4 class="reagent-source-sec-title"><span>🗡️</span> Sample Disenchantable Items for ${escapeHtml(cleanName)} (${src.disenchant.sampleItems.length})</h4>
              <div class="reagent-source-grid">
                ${src.disenchant.sampleItems.map(it => `
                  <div class="reagent-source-card">
                    <div class="reagent-source-card-left">
                      <span class="reagent-drop-pct-badge med">iLvl ${it.ilvl || '?'}</span>
                      <div>
                        <div class="reagent-source-name q${it.quality || 2}">${escapeHtml(it.name)}</div>
                        <div class="reagent-source-sub">Disenchant gear or use Camp Arcane Salvager</div>
                      </div>
                    </div>
                    <a href="https://www.wowhead.com/forever/item=${it.id}" target="_blank" rel="noopener" class="reagent-npc-map-btn">
                      Item ↗
                    </a>
                  </div>
                `).join('')}
              </div>
            </div>
          ` : ''}
        </div>
      ` : '';

      // 1. Dedicated single-view modes (strictly separates fishing from mobs, etc.)
      if (viewMode === 'disenchant') {
        return `<div class="reagent-acquisition-body">${disenchantSectionHtml}</div>`;
      }
      if (viewMode === 'fishing') {
        return `<div class="reagent-acquisition-body">${summaryBoxHtml}${fishingSectionHtml || '<div class="reagent-lookup-empty">No fishing waters recorded for this item.</div>'}</div>`;
      }
      if (viewMode === 'drops') {
        return `<div class="reagent-acquisition-body">${summaryBoxHtml}${dropsSectionHtml || '<div class="reagent-lookup-empty">No mob drops recorded for this item.</div>'}</div>`;
      }
      if (viewMode === 'vendors') {
        return `<div class="reagent-acquisition-body">${summaryBoxHtml}${vendorsSectionHtml || '<div class="reagent-lookup-empty">No vendors recorded for this item.</div>'}</div>`;
      }
      if (viewMode === 'nodes') {
        return `<div class="reagent-acquisition-body">${summaryBoxHtml}${nodesSectionHtml || '<div class="reagent-lookup-empty">No world nodes recorded for this item.</div>'}</div>`;
      }
      if (viewMode === 'skinning') {
        return `<div class="reagent-acquisition-body">${summaryBoxHtml}${skinningSectionHtml || '<div class="reagent-lookup-empty">No skinnable beasts recorded for this item.</div>'}</div>`;
      }

      // 2. Multi-source views ("all" / "sources"): Dynamically prioritize sections based on primaryType
      const orderedSections = [summaryBoxHtml];
      if (src.primaryType === 'fished' || (src.fishedIn && src.fishedIn.length > 0 && !src.herbNode && !src.miningNode)) {
        // Fishing is strictly #1 at the top!
        if (fishingSectionHtml) orderedSections.push(fishingSectionHtml);
        if (vendorsSectionHtml) orderedSections.push(vendorsSectionHtml);
        if (containedSectionHtml) orderedSections.push(containedSectionHtml);
        if (dropsSectionHtml) orderedSections.push(dropsSectionHtml);
        if (craftedSectionHtml) orderedSections.push(craftedSectionHtml);
        if (nodesSectionHtml) orderedSections.push(nodesSectionHtml);
        if (skinningSectionHtml) orderedSections.push(skinningSectionHtml);
        if (disenchantSectionHtml) orderedSections.push(disenchantSectionHtml);
      } else if (src.primaryType === 'herb' || src.primaryType === 'ore') {
        if (nodesSectionHtml) orderedSections.push(nodesSectionHtml);
        if (vendorsSectionHtml) orderedSections.push(vendorsSectionHtml);
        if (dropsSectionHtml) orderedSections.push(dropsSectionHtml);
        if (craftedSectionHtml) orderedSections.push(craftedSectionHtml);
        if (fishingSectionHtml) orderedSections.push(fishingSectionHtml);
        if (skinningSectionHtml) orderedSections.push(skinningSectionHtml);
        if (disenchantSectionHtml) orderedSections.push(disenchantSectionHtml);
      } else if (src.primaryType === 'skinned') {
        if (skinningSectionHtml) orderedSections.push(skinningSectionHtml);
        if (dropsSectionHtml) orderedSections.push(dropsSectionHtml);
        if (vendorsSectionHtml) orderedSections.push(vendorsSectionHtml);
        if (containedSectionHtml) orderedSections.push(containedSectionHtml);
        if (disenchantSectionHtml) orderedSections.push(disenchantSectionHtml);
      } else if (src.primaryType === 'vendor') {
        if (vendorsSectionHtml) orderedSections.push(vendorsSectionHtml);
        if (dropsSectionHtml) orderedSections.push(dropsSectionHtml);
        if (containedSectionHtml) orderedSections.push(containedSectionHtml);
        if (craftedSectionHtml) orderedSections.push(craftedSectionHtml);
        if (disenchantSectionHtml) orderedSections.push(disenchantSectionHtml);
      } else {
        // Default mob_drop / crafted
        if (craftedSectionHtml) orderedSections.push(craftedSectionHtml);
        if (dropsSectionHtml) orderedSections.push(dropsSectionHtml);
        if (fishingSectionHtml) orderedSections.push(fishingSectionHtml);
        if (skinningSectionHtml) orderedSections.push(skinningSectionHtml);
        if (nodesSectionHtml) orderedSections.push(nodesSectionHtml);
        if (vendorsSectionHtml) orderedSections.push(vendorsSectionHtml);
        if (containedSectionHtml) orderedSections.push(containedSectionHtml);
        if (disenchantSectionHtml) orderedSections.push(disenchantSectionHtml);
      }

      return `<div class="reagent-acquisition-body">${orderedSections.join('')}</div>`;
    }

    function renderModalContent() {
      const filteredMatches = activeFilter === 'all' 
        ? matches 
        : matches.filter(m => m.profSlug === activeFilter);

      const wowheadHref = sourceData?.wowheadUrl || (resolvedId ? `https://www.wowhead.com/forever/item=${resolvedId}` : `https://www.wowhead.com/forever/search?q=${encodeURIComponent(cleanName)}`);

      // View Switcher Tabs Bar
      const viewTabs = [];
      if (hasDisenchant) {
        viewTabs.push(`
          <button type="button" class="reagent-view-tab-btn ${activeModalView === 'disenchant' ? 'active' : ''}" data-view="disenchant">
            <span>✨</span> Disenchanting Matrix
          </button>
        `);
      }
      if (hasFishing) {
        viewTabs.push(`
          <button type="button" class="reagent-view-tab-btn ${activeModalView === 'fishing' ? 'active' : ''}" data-view="fishing">
            <span>🎣</span> Where to Fish (${sourceData.fishedIn.length})
          </button>
        `);
      }
      if (hasDrops) {
        const dropCount = sourceData.totalDropMobs || sourceData.drops.length;
        viewTabs.push(`
          <button type="button" class="reagent-view-tab-btn ${activeModalView === 'drops' ? 'active' : ''}" data-view="drops">
            <span>⚔️</span> Mob Drops (${dropCount})
          </button>
        `);
      }
      if (hasVendors) {
        const vCount = sourceData.totalVendors || sourceData.vendors.length;
        viewTabs.push(`
          <button type="button" class="reagent-view-tab-btn ${activeModalView === 'vendors' ? 'active' : ''}" data-view="vendors">
            <span>🪙</span> Vendors (${vCount})
          </button>
        `);
      }
      if (hasNodes) {
        const isMine = sourceData.primaryType === 'ore';
        viewTabs.push(`
          <button type="button" class="reagent-view-tab-btn ${activeModalView === 'nodes' ? 'active' : ''}" data-view="nodes">
            <span>${isMine ? '⛏️' : '🌿'}</span> ${isMine ? 'Mining Veins' : 'Herb Nodes'}
          </button>
        `);
      }
      if (hasSkinning) {
        viewTabs.push(`
          <button type="button" class="reagent-view-tab-btn ${activeModalView === 'skinning' ? 'active' : ''}" data-view="skinning">
            <span>🔪</span> Beast Skinning (${sourceData.skinnedFrom.length})
          </button>
        `);
      }
      if (matches.length > 0) {
        viewTabs.push(`
          <button type="button" class="reagent-view-tab-btn ${activeModalView === 'recipes' ? 'active' : ''}" data-view="recipes">
            <span>📜</span> Used in Recipes (${matches.length})
          </button>
        `);
      }
      const numSources = (hasFishing ? 1 : 0) + (hasDrops ? 1 : 0) + (hasVendors ? 1 : 0) + (hasNodes ? 1 : 0) + (hasSkinning ? 1 : 0);
      if (numSources > 1) {
        viewTabs.push(`
          <button type="button" class="reagent-view-tab-btn ${activeModalView === 'all' || activeModalView === 'sources' ? 'active' : ''}" data-view="all">
            <span>📋</span> All Sources
          </button>
        `);
      }

      modal.innerHTML = `
        <div class="reagent-lookup-dialog">
          <div class="reagent-lookup-head">
            <div class="reagent-lookup-title-box">
              <img src="${iconUrl}" alt="${escapeHtml(cleanName)}" class="reagent-lookup-img q${matQuality}" />
              <div>
                <h3 class="q${matQuality}">
                  ${escapeHtml(cleanName)}
                  ${sourceData?.isForeverNew ? '<span class="recipe-new-tag" style="vertical-align:middle; margin-left:0.35rem;">New</span>' : ''}
                </h3>
                <p>Required in <strong>${matches.length}</strong> recipe${matches.length === 1 ? '' : 's'} across <strong>${profNames.length || 1}</strong> trade${profNames.length === 1 ? '' : 's'}</p>
              </div>
            </div>

            <div class="reagent-lookup-head-actions">
              <a href="${wowheadHref}" target="_blank" rel="noopener" class="reagent-head-wowhead-btn" title="Open ${escapeHtml(cleanName)} on Wowhead Forever Database">
                <span>🌐</span> Wowhead ↗
              </a>
              <button type="button" class="reagent-lookup-close" id="reagent-lookup-close-btn" aria-label="Close dialog">✕</button>
            </div>
          </div>

          <!-- Multi-Source View Switcher Bar -->
          <div class="reagent-modal-view-tabs">
            ${viewTabs.join('')}
          </div>

          ${activeModalView === 'recipes' ? `
            ${profNames.length > 1 ? `
              <div class="reagent-lookup-chips">
                <button type="button" class="reagent-filter-chip ${activeFilter === 'all' ? 'active' : ''}" data-prof="all">
                  All Trades (${matches.length})
                </button>
                ${Object.entries(profCounts).map(([name, count]) => {
                  const slug = Object.keys(data).find(k => data[k].name === name);
                  return `
                    <button type="button" class="reagent-filter-chip ${activeFilter === slug ? 'active' : ''}" data-prof="${slug}">
                      ${escapeHtml(name)} (${count})
                    </button>
                  `;
                }).join('')}
              </div>
            ` : ''}

            <div class="reagent-lookup-list">
              ${filteredMatches.length === 0 ? `
                <div class="reagent-lookup-empty">No recipes found using this component.</div>
              ` : filteredMatches.map((m, idx) => {
                const r = m.recipe;
                const qClass = `q${r.quality || 1}`;
                return `
                  <div class="reagent-lookup-row" data-recipe-idx="${idx}">
                    <div class="reagent-lookup-row-main" style="cursor: pointer;" data-slug="${m.profSlug}" data-recipe-id="${r.id || ''}" data-recipe-name="${escapeHtml(r.name)}" title="Click to view full recipe details card in ${escapeHtml(m.profName)}">
                      <img src="${getIconUrl(r.icon, r.name, r.source)}" alt="${escapeHtml(r.name)}" class="reagent-row-icon ${qClass}" data-recipe-idx="${idx}" />
                      <div>
                        <div class="reagent-row-name ${qClass}" data-recipe-idx="${idx}">${escapeHtml(r.name)}</div>
                        <div class="reagent-row-meta">
                          <span class="reagent-row-prof">
                            <img src="${getIconUrl(m.profIcon)}" alt="${escapeHtml(m.profName)}" />
                            ${escapeHtml(m.profName)}
                          </span>
                          <span class="reagent-row-skill">Skill ${r.learn}</span>
                          <span class="reagent-row-qty">Requires: <strong>${m.neededCount}x</strong></span>
                        </div>
                      </div>
                    </div>
                    <button type="button" class="reagent-jump-btn" data-slug="${m.profSlug}" data-recipe-id="${r.id || ''}" data-recipe-name="${escapeHtml(r.name)}">
                      View in ${escapeHtml(m.profName)} ›
                    </button>
                  </div>
                `;
              }).join('')}
            </div>
          ` : `
            <div class="reagent-lookup-list reagent-sources-scroll">
              ${renderAcquisitionView(sourceData, activeModalView)}
            </div>
          `}
        </div>
      `;

      const closeBtn = modal.querySelector('#reagent-lookup-close-btn');
      if (closeBtn) closeBtn.addEventListener('click', closeReagentModal);

      modal.querySelectorAll('.reagent-view-tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          activeModalView = btn.getAttribute('data-view');
          renderModalContent();
        });
      });

      modal.querySelectorAll('.reagent-filter-chip').forEach(btn => {
        btn.addEventListener('click', () => {
          activeFilter = btn.getAttribute('data-prof');
          renderModalContent();
        });
      });

      // Recipe icon and title hover tooltips + card click inside reagent lookup dialog
      modal.querySelectorAll('.reagent-lookup-row').forEach(row => {
        const idx = parseInt(row.getAttribute('data-recipe-idx') || '-1', 10);
        const m = filteredMatches[idx];
        if (!m) return;
        const r = m.recipe;

        const mainEl = row.querySelector('.reagent-lookup-row-main');
        const iconEl = row.querySelector('.reagent-row-icon');
        const nameEl = row.querySelector('.reagent-row-name');

        const extra = {
          type: `${m.profName || 'Crafted'} Item`,
          skillReq: `${m.profName} (${r.learn})`,
          source: r.source || 'Trainer'
        };

        const onEnter = (e) => {
          showItemTooltip(e, r.name, r.quality || 1, r.effect || '', r.reagents || null, extra);
        };
        const onMove = (e) => {
          const tt = document.getElementById('wow-item-tooltip');
          if (tt) positionTooltip(e, tt);
        };
        const onLeave = () => hideItemTooltip();

        [iconEl, nameEl].forEach(el => {
          if (!el) return;
          el.addEventListener('mouseenter', onEnter);
          el.addEventListener('mousemove', onMove);
          el.addEventListener('mouseleave', onLeave);
        });

        if (mainEl) {
          mainEl.addEventListener('click', (e) => {
            if (e.target.closest('.reagent-jump-btn')) return;
            hideItemTooltip();
            closeReagentModal();
            if (window.setReturnTarget) {
              window.setReturnTarget({
                label: `Reagent: ${cleanName}`,
                tab: 'professions',
                profession: currentProfession,
                subtab: currentSubTab,
                reagentModal: cleanName,
                scrollY: window.scrollY
              });
            }
            if (window.WOW_PROFESSIONS && window.WOW_PROFESSIONS.selectProfession) {
              window.WOW_PROFESSIONS.selectProfession(m.profSlug, 'recipes', r.name, r.id ? `recipe-${r.id}` : undefined);
            }
          });
        }
      });

      modal.querySelectorAll('.reagent-jump-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const targetSlug = btn.getAttribute('data-slug');
          const targetName = btn.getAttribute('data-recipe-name');
          const targetId = btn.getAttribute('data-recipe-id');
          hideItemTooltip();
          closeReagentModal();
          if (window.setReturnTarget) {
            window.setReturnTarget({
              label: `Reagent: ${cleanName}`,
              tab: 'professions',
              profession: currentProfession,
              subtab: currentSubTab,
              reagentModal: cleanName,
              scrollY: window.scrollY
            });
          }
          if (window.WOW_PROFESSIONS && window.WOW_PROFESSIONS.selectProfession) {
            window.WOW_PROFESSIONS.selectProfession(targetSlug, 'recipes', targetName, targetId ? `recipe-${targetId}` : undefined);
          }
        });
      });

      modal.querySelectorAll('.reagent-internal-jump-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const targetSlug = btn.getAttribute('data-jump-prof');
          const targetSub = btn.getAttribute('data-jump-subtab');
          hideItemTooltip();
          closeReagentModal();
          if (window.setReturnTarget) {
            window.setReturnTarget({
              label: `Reagent: ${cleanName}`,
              tab: 'professions',
              profession: currentProfession,
              subtab: currentSubTab,
              reagentModal: cleanName,
              scrollY: window.scrollY
            });
          }
          if (window.WOW_PROFESSIONS && window.WOW_PROFESSIONS.selectProfession) {
            window.WOW_PROFESSIONS.selectProfession(targetSlug, targetSub);
          }
        });
      });
    }

    renderModalContent();
    modal.classList.add('is-open');
    modal.removeAttribute('hidden');
  }

  // Dismiss tooltips when tapping outside on touch devices
  if (typeof document !== 'undefined' && typeof document.addEventListener === 'function') {
    document.addEventListener('pointerdown', (e) => {
      const tt = document.getElementById('wow-item-tooltip');
      if (tt && !e.target.closest('.reagent-chip, .recipe-item-icon, .recipe-title, .favor-recipe-card, .camp-tooltip-item, .step-recipe-name, .shopping-row-card')) {
        hideItemTooltip();
      }
    });
  }

  // Global listeners for TomTom /way copy and BiS badge jump
  if (typeof document !== 'undefined' && typeof document.addEventListener === 'function') {
    document.addEventListener('click', (e) => {
      const tomtomBtn = e.target.closest('.tomtom-way-btn');
      if (tomtomBtn) {
        e.preventDefault();
        e.stopPropagation();
        const macro = tomtomBtn.getAttribute('data-macro');
        if (macro) {
          if (typeof window.copyMacroToClipboard === 'function') {
            window.copyMacroToClipboard(macro, tomtomBtn);
            if (typeof window.showToast === 'function') {
              window.showToast(`✓ Copied TomTom macro: ${macro}`, 'success');
            }
          } else if (typeof window.copyTextToClipboard === 'function') {
            window.copyTextToClipboard(macro, () => {
              tomtomBtn.classList.add('copied');
              setTimeout(() => tomtomBtn.classList.remove('copied'), 1800);
              if (typeof window.showToast === 'function') {
                window.showToast(`✓ Copied TomTom macro: ${macro}`, 'success');
              }
            });
          } else if (navigator.clipboard) {
            navigator.clipboard.writeText(macro).then(() => {
              tomtomBtn.classList.add('copied');
              setTimeout(() => tomtomBtn.classList.remove('copied'), 1800);
              if (typeof window.showToast === 'function') {
                window.showToast(`✓ Copied TomTom macro: ${macro}`, 'success');
              }
            }).catch(() => {});
          }
        }
        return;
      }

      const bisBtn = e.target.closest('.recipe-bis-badge');
      if (bisBtn) {
        e.preventDefault();
        e.stopPropagation();
        const cls = bisBtn.getAttribute('data-class');
        const sp = bisBtn.getAttribute('data-spec');
        if (cls && sp) {
          if (window.setReturnTarget) {
            const currentProfObj = window.WOW_PROFESSIONS_DATA && window.WOW_PROFESSIONS_DATA[currentProfession];
            const profLabel = currentProfObj ? currentProfObj.name : 'Professions';
            window.setReturnTarget({
              label: `${profLabel} Recipes`,
              tab: 'professions',
              profession: currentProfession,
              subtab: currentSubTab,
              scrollY: window.scrollY
            });
          }
          const bisTabBtn = document.querySelector('.nav-tab-btn[data-tab="bis"]');
          if (bisTabBtn) bisTabBtn.click();
          window.location.hash = `#bis/${cls}/${sp}`;
          if (typeof window.showToast === 'function') {
            window.showToast(`Navigating to ${cls} (${sp}) BiS gear list...`, 'info');
          }
        }
        return;
      }
    });
  }

  // Export module globally
  window.initProfessionsHub = initProfessionsHub;
  window.WOW_PROFESSIONS = {
    openReagentModal: openReverseReagentLookup,
    selectProfession: (slug, subtab, query, targetId, options = {}) => {
      currentProfession = slug || 'overview';
      if (subtab) currentSubTab = subtab;
      currentCategory = options.category || 'all';
      if (query !== undefined && query !== null) searchQuery = query;
      if (options.clearFilters || query || targetId) {
        filterNewOnly = false;
        filterBetaCap = false;
        filterDungeonOnly = false;
        filterBlueprintOnly = false;
      }
      const navBtn = document.querySelector('.nav-tab-btn[data-tab="professions"]');
      if (navBtn && !navBtn.classList.contains('active')) {
        const tabButtons = document.querySelectorAll('.nav-tab-btn');
        const tabPanels = document.querySelectorAll('.tab-content');
        tabButtons.forEach(b => b.classList.remove('active'));
        tabPanels.forEach(p => p.classList.remove('active'));
        navBtn.classList.add('active');
        const targetPanel = document.getElementById('tab-professions');
        if (targetPanel) targetPanel.classList.add('active');
      }
      const grid = document.getElementById('prof-selector-buttons');
      if (grid) {
        grid.querySelectorAll('.prof-tile-btn').forEach(b => {
          b.classList.toggle('active', b.getAttribute('data-slug') === currentProfession);
        });
      }
      renderActiveProfession();
      const newHash = `#professions/${currentProfession}${currentSubTab ? '/' + currentSubTab : ''}`;
      if (!options.noPush) {
        const curHash = (window.location.hash || '').toLowerCase();
        if (curHash !== newHash.toLowerCase()) {
          try {
            history.pushState({ tab: 'professions', profession: currentProfession, subtab: currentSubTab }, '', newHash);
          } catch {
            if (history.replaceState) history.replaceState(null, '', newHash);
          }
        }
      } else if (history.replaceState) {
        history.replaceState(null, '', newHash);
      }
      if (targetId) {
        setTimeout(() => {
          const el = document.getElementById(targetId) || document.getElementById(`recipe-${targetId}`);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'center' });
            el.classList.add('recipe-card-highlight');
            setTimeout(() => el.classList.remove('recipe-card-highlight'), 2500);
          }
        }, 150);
      }
    }
  };

})();

