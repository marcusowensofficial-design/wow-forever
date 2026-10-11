/**
 * World of Warcraft: Forever - Atlas & Expansion Dataset
 * Browser bundle for World Atlas, Rare Spawns, Library Books, Camping Recipes, PvP, Hunter Pets, and Merchant Economy.
 */

window.WOW_ATLAS_DATA = {
  rares: [
  {
    "id": "nightveiled-rotheap",
    "name": "Nightveiled Rotheap",
    "zone": "Wetlands",
    "level": 32,
    "elite": true,
    "macro": "/target Nightveiled Rotheap",
    "coords": "19.6, 43.4 (Patrols coast & river at night)",
    "respawn": "5 to 30 min (Night only, server time)",
    "lore": "Comes out of the sea on the west coast, then walks up the main river toward the dam. Two or three can be up at once.",
    "drops": [
      {
        "name": "Rotheap Innards",
        "type": "Quest Item",
        "desc": "Every member of party loots one; trade to Rethiel the Greenwarden (56.2, 40.5) for Malignant Root."
      },
      {
        "name": "Malignant Root",
        "type": "Finger (iLvl 32)",
        "stats": "+7 Stamina, +8 Attack Power, +4 Spell Power"
      }
    ]
  },
  {
    "id": "heartrazor",
    "name": "Heartrazor",
    "zone": "Thousand Needles",
    "level": 31,
    "elite": true,
    "macro": "/target Heartrazor",
    "coords": "15.8, 41.2 (Highperch Cliffs)",
    "respawn": "5 to 8 hours",
    "lore": "Wyvern that patrols Highperch on the western cliffs. Hits hard with deadly poisons.",
    "drops": [
      {
        "name": "Wyvern Heart Band",
        "type": "Finger (iLvl 34)",
        "stats": "+5 Agility, +5 Stamina, +15 Attack Power"
      }
    ]
  },
  {
    "id": "humar-the-pridelord",
    "name": "Humar the Pridelord",
    "zone": "The Barrens",
    "level": 23,
    "elite": true,
    "tameable": "Cat (1.30s attack speed)",
    "macro": "/target Humar the Pridelord",
    "coords": "61.0, 35.0 (North of Ratchet)",
    "respawn": "8 to 12 hours",
    "lore": "The legendary black lion resting under the grand acacia tree north of Ratchet.",
    "drops": [
      {
        "name": "Mark of the Pack Leader",
        "type": "Neck (iLvl 25) - Blessing of Kalimdor Set (1/3)",
        "stats": "+5 Strength, +5 Intellect. (2) Set: +5% Movement Speed in Barrens & Stonetalon."
      }
    ]
  },
  {
    "id": "swiftmane",
    "name": "Swiftmane",
    "zone": "The Barrens",
    "level": 20,
    "elite": false,
    "macro": "/target Swiftmane",
    "coords": "60.4, 33.0 (Plateau north of Ratchet)",
    "respawn": "4 to 6 hours",
    "lore": "A majestic zhevra galloping along the savannah ridges north of Ratchet.",
    "drops": [
      {
        "name": "Signet of the Zhevra",
        "type": "Finger (iLvl 23) - Blessing of Kalimdor Set (2/3)",
        "stats": "+6 Agility, +2 Spirit. (2) Set: +5% Movement Speed in Barrens & Stonetalon."
      }
    ]
  },
  {
    "id": "takk-the-leaper",
    "name": "Takk the Leaper",
    "zone": "The Barrens",
    "level": 19,
    "elite": false,
    "tameable": "Raptor",
    "macro": "/target Takk the Leaper",
    "coords": "60.4, 9.4 (Northern Barrens)",
    "respawn": "6 to 8 hours",
    "lore": "High-speed sprinting raptor roaming the northern brush near the Sludge Fen.",
    "drops": [
      {
        "name": "Raptor Hide Cloak",
        "type": "Back (iLvl 21) - Blessing of Kalimdor Set (3/3)",
        "stats": "19 Armor, +4 Stamina, +3 Spirit. (2) Set: +5% Movement Speed in Barrens & Stonetalon."
      }
    ]
  },
  {
    "id": "alliance-outrunners",
    "name": "Alliance Outrunners (Aean Swiftriver)",
    "zone": "The Barrens",
    "level": 25,
    "elite": true,
    "macro": "/target Aean Swiftriver",
    "coords": "48.5, 79.7 to 45.4, 41.4 (Southern Road)",
    "respawn": "1 to 2 hours",
    "lore": "Four mounted Alliance scouts (Aean Swiftriver, Thora Feathermoon, Hannah Bladeleaf, Marcus Bel) patrolling the Southern Gold Road.",
    "drops": [
      {
        "name": "Alliance Outrunner Bow",
        "type": "Ranged Bow (iLvl 27)",
        "stats": "13.3 DPS, +4 Agi, +3 Spi"
      },
      {
        "name": "Alliance Outrunner's Sword",
        "type": "1H Sword (iLvl 27)",
        "stats": "17.1 DPS, +5 Agi, +6 AP"
      },
      {
        "name": "Alliance Outrunner Healing Rod",
        "type": "Off-Hand (iLvl 26)",
        "stats": "+8 HP Regen, +12 Healing, +4 Spell Dmg"
      },
      {
        "name": "Alliance Outrunner Staff",
        "type": "2H Staff (iLvl 26)",
        "stats": "16.2 DPS, +9 Sta, +9 Spi, +28 Spell Power"
      }
    ]
  },
  {
    "id": "taskmaster-whipfang",
    "name": "Taskmaster Whipfang",
    "zone": "Stonetalon Mountains",
    "level": 22,
    "elite": false,
    "macro": "/target Taskmaster Whipfang",
    "coords": "63.0, 53.0 (Windshear Crag)",
    "respawn": "2 to 4 hours",
    "lore": "Venture Co. taskmaster patrolling the machinery at Windshear Crag.",
    "drops": [
      {
        "name": "Whipfang's Skinsearer",
        "type": "1H Dagger (iLvl 24)",
        "stats": "15.6 DPS, Chance on hit: 67-101 Fire Damage"
      }
    ]
  },
  {
    "id": "foreman-rigger",
    "name": "Foreman Rigger",
    "zone": "Stonetalon Mountains",
    "level": 24,
    "elite": false,
    "macro": "/target Foreman Rigger",
    "coords": "65.2, 52.8 (Windshear Crag)",
    "respawn": "2 to 4 hours",
    "lore": "Overseeing Venture Co. logging camp in eastern Stonetalon Mountains.",
    "drops": [
      {
        "name": "Foreman's Helm",
        "type": "Head Mail (iLvl 26)",
        "stats": "166 Armor, +9 Stamina, +8 Strength, +5 Mining Skill"
      }
    ]
  },
  {
    "id": "drozem-the-blasphemous",
    "name": "Dro'zem the Blasphemous",
    "zone": "Redridge Mountains",
    "level": 23,
    "elite": false,
    "macro": "/target Dro'zem the Blasphemous",
    "coords": "74.4, 82.2 (Render's Valley) / 63.0, 43.0",
    "respawn": "2 to 3 hours",
    "lore": "Dark orc warlock turning up in Render's Valley and Stonewatch Keep.",
    "drops": [
      {
        "name": "Dro'zem's Tunic",
        "type": "Chest Cloth (iLvl 25)",
        "stats": "43 Armor, +9 Intellect, +11 Spell Power"
      }
    ]
  },
  {
    "id": "elmpaw",
    "name": "Elmpaw",
    "zone": "Elwynn Forest",
    "level": 10,
    "elite": false,
    "tameable": "Bear",
    "macro": "/target Elmpaw",
    "coords": "81.6, 85.4 (Ridgepoint Tower) / 75.0, 38.4",
    "respawn": "45 to 60 min",
    "lore": "Massive black bear with over 800 health roaming south of Ridgepoint Tower.",
    "drops": [
      {
        "name": "Elmpaw's Head",
        "type": "Quest Item",
        "desc": "Starts quest: Helene Peltskinner in Goldshire for 840 XP, 3s 50c, +100 Stormwind Rep."
      }
    ]
  },
  {
    "id": "baron-marinous",
    "name": "Baron Marinous",
    "zone": "Darkshore",
    "level": 21,
    "elite": true,
    "macro": "/target Baron Marinous",
    "coords": "59.2, 22.6 (Mathystral Ruins)",
    "respawn": "Summoned via Fathom Stone",
    "lore": "Summoned elemental of 2,400 health by combining 20 Mathystral Amulet Fragments at the Fathom Stone.",
    "drops": [
      {
        "name": "Mathystral Amulet",
        "type": "Accessory / Quest",
        "stats": "Summons Baron Marinous; unlocks Clouded Water Globe quest."
      }
    ]
  },
  {
    "id": "lordaeron-captain",
    "name": "Lordaeron Captain",
    "zone": "Ruins of Lordaeron (Dungeon)",
    "level": 23,
    "elite": true,
    "macro": "/target Lordaeron Captain",
    "coords": "Northwest courtyard inside instance",
    "respawn": "Rare instance spawn",
    "lore": "Skeletal captain patrolling the northwest courtyard with Skeletal Soldiers.",
    "drops": [
      {
        "name": "Haunting Blade",
        "type": "2H Sword (iLvl 27)",
        "stats": "22.4 DPS, 3.80 Speed, +33 Healing, +11 Spell Damage"
      }
    ]
  },
  {
    "id": "mystmane",
    "name": "Mystmane",
    "zone": "Zephras Isle",
    "level": 8,
    "elite": false,
    "tameable": "Bear (1.60s attack speed - Fastest Bear)",
    "macro": "/target Mystmane",
    "coords": "60.2, 34.6 (Shadowgale Forest)",
    "respawn": "45 min",
    "lore": "Fastest-attacking bear in the entire game (1.6s swing speed), native to Zephras Isle.",
    "drops": [
      {
        "name": "Mystmane Claws",
        "type": "Junk / Crafting",
        "stats": "High-value starter trade item"
      }
    ]
  },
  {
    "id": "ghostfang",
    "name": "Ghostfang",
    "zone": "Dun Morogh",
    "level": 11,
    "elite": false,
    "tameable": "Cat (White Sabercat)",
    "macro": "/target Ghostfang",
    "coords": "74.2, 63.2 (Tunnel hills toward Wetlands)",
    "respawn": "30 min",
    "lore": "Stealthed white mountain cat stalking the snowy hills near the Wetlands pass.",
    "drops": [
      {
        "name": "Ghostfang Pelt",
        "type": "Leather / Quest",
        "stats": "Rare white fur"
      }
    ]
  },
  {
    "id": "coldrasp",
    "name": "Coldrasp",
    "zone": "Tirisfal Glades",
    "level": 11,
    "elite": false,
    "tameable": "Wolf (Blue Ghost Wolf with Furious Howl)",
    "macro": "/target Coldrasp",
    "coords": "19.7, 65.6 (Whispering Forest)",
    "respawn": "2 to 3 hours",
    "lore": "A striking blue ghost wolf roaming the ethereal Whispering Forest west of Deathknell.",
    "drops": [
      {
        "name": "Coldrasp Fang",
        "type": "Unique Trophy",
        "stats": "Prized trophy"
      }
    ]
  },
  {
    "id": "shalma",
    "name": "Shal'ma",
    "zone": "Durotar",
    "level": 9,
    "elite": false,
    "tameable": "Cat (Cheetah 1.30s)",
    "macro": "/target Shal'ma",
    "coords": "59.8, 91.0 (Kolkar Crags)",
    "respawn": "1 hour",
    "lore": "Fast 1.3s attack speed cheetah prowling the ridges south of Sen'jin Village.",
    "drops": [
      {
        "name": "Kolkar Trophy Claws",
        "type": "Trophy",
        "stats": "Valuable beginner weapon vendor drop"
      }
    ]
  },
  {
    "id": "dishu",
    "name": "Dishu",
    "zone": "The Barrens",
    "level": 13,
    "elite": false,
    "tameable": "Cat (Cheetah 1.30s)",
    "macro": "/target Dishu",
    "coords": "48.2, 16.4 (Lushwater Plains)",
    "respawn": "2 to 4 hours",
    "lore": "Fastest-attacking starter cheetah roaming the western Barrens savannas.",
    "drops": [
      {
        "name": "Pelt of Dishu",
        "type": "Leather / Quest",
        "stats": "High quality spotted cheetah pelt"
      }
    ]
  },
  {
    "id": "gesharahan",
    "name": "Gesharahan",
    "zone": "The Barrens",
    "level": 20,
    "elite": true,
    "macro": "/target Gesharahan",
    "coords": "46.8, 38.6 (The Stagnant Oasis)",
    "respawn": "Summoned via Altered Snapvine",
    "lore": "Vicious hydra lurking beneath the murky depths of the Stagnant Oasis.",
    "drops": [
      {
        "name": "Gesharahan's Scale",
        "type": "Quest Item",
        "desc": "Turns in to Tonga Runetotem for 1,250 XP and +100 Thunder Bluff rep"
      }
    ]
  },
  {
    "id": "sludge-beast",
    "name": "Sludge Beast",
    "zone": "The Barrens",
    "level": 21,
    "elite": false,
    "macro": "/target Sludge Beast",
    "coords": "57.0, 9.6 (The Sludge Fen)",
    "respawn": "2 to 3 hours",
    "lore": "Toxic chemical ooze crawling in the Venture Co. oil runoff pool.",
    "drops": [
      {
        "name": "Ooze-Covered Bag",
        "type": "10-Slot Bag",
        "stats": "Portable storage pouch"
      }
    ]
  },
  {
    "id": "brood-mother-araxx",
    "name": "Brood Mother Araxx",
    "zone": "The Barrens",
    "level": 17,
    "elite": false,
    "tameable": "Spider",
    "macro": "/target Brood Mother Araxx",
    "coords": "43.6, 17.2 (Dry Hills)",
    "respawn": "1 to 2 hours",
    "lore": "Giant black widow nesting inside the spider crags in northwest Barrens.",
    "drops": [
      {
        "name": "Araxx's Web Sac",
        "type": "Crafting / Off-Hand",
        "stats": "Produces 3-4 Shadow Silk"
      }
    ]
  },
  {
    "id": "rathorian",
    "name": "Rathorian",
    "zone": "Ashenvale",
    "level": 31,
    "elite": true,
    "macro": "/target Rathorian",
    "coords": "84.4, 69.8 (Demon Fall Canyon)",
    "respawn": "4 to 6 hours",
    "lore": "Demonic satyr commander guarding the canyon of Mannoroth's demise.",
    "drops": [
      {
        "name": "Horn of Rathorian",
        "type": "Quest Item / Trinket",
        "stats": "Starts Demonic Deception questline"
      }
    ]
  },
  {
    "id": "terrowulf-packlord",
    "name": "Terrowulf Packlord",
    "zone": "Ashenvale",
    "level": 28,
    "elite": false,
    "tameable": "Wolf",
    "macro": "/target Terrowulf Packlord",
    "coords": "38.2, 54.6 (Iris Lake)",
    "respawn": "2 to 3 hours",
    "lore": "Alpha shadow-worg pacing the dense woods south of Iris Lake.",
    "drops": [
      {
        "name": "Packlord's Fang",
        "type": "1H Dagger (iLvl 30)",
        "stats": "14.2 DPS, +3 Agility, +5 AP"
      }
    ]
  },
  {
    "id": "ursollok",
    "name": "Ursol'lok",
    "zone": "Ashenvale",
    "level": 31,
    "elite": false,
    "tameable": "Bear",
    "macro": "/target Ursol'lok",
    "coords": "82.6, 52.2 (Splintertree Woodlands)",
    "respawn": "3 to 4 hours",
    "lore": "Venerable corrupted furbolg elder bear roaming east Ashenvale.",
    "drops": [
      {
        "name": "Ursol'lok's Claws",
        "type": "Fist Weapon (iLvl 33)",
        "stats": "15.8 DPS, +6 Strength, +4 Stamina"
      }
    ]
  },
  {
    "id": "mugglefin",
    "name": "Mugglefin",
    "zone": "Darkshore",
    "level": 16,
    "elite": false,
    "macro": "/target Mugglefin",
    "coords": "56.4, 9.2 (Ruins of Welvar)",
    "respawn": "1 to 2 hours",
    "lore": "Greenscale murloc warlord raiding along the Northern coast of Darkshore.",
    "drops": [
      {
        "name": "Mugglefin's Trident",
        "type": "Polearm (iLvl 18)",
        "stats": "11.2 DPS, +3 Agility, +2 Spirit"
      }
    ]
  },
  {
    "id": "strider-clutchmother",
    "name": "Strider Clutchmother",
    "zone": "Darkshore",
    "level": 20,
    "elite": false,
    "tameable": "Tallstrider",
    "macro": "/target Strider Clutchmother",
    "coords": "37.6, 82.2 (Grove of the Ancients)",
    "respawn": "2 hours",
    "lore": "Mother tallstrider nesting near the borders of Ashenvale.",
    "drops": [
      {
        "name": "Clutchmother's Feather",
        "type": "Off-Hand (iLvl 22)",
        "stats": "+4 Agility, +3 Spirit"
      }
    ]
  },
  {
    "id": "carnivous-the-breaker",
    "name": "Carnivous the Breaker",
    "zone": "Darkshore",
    "level": 16,
    "elite": false,
    "tameable": "Bear",
    "macro": "/target Carnivous the Breaker",
    "coords": "38.4, 86.8 (Cliffspring River)",
    "respawn": "1 to 2 hours",
    "lore": "Diseased thistle bear prowling along the riverbank.",
    "drops": [
      {
        "name": "Bear-Leather Bracers",
        "type": "Wrist, Leather (iLvl 18)",
        "stats": "+3 Stamina, +2 Strength"
      }
    ]
  },
  {
    "id": "lord-malathrom",
    "name": "Lord Malathrom",
    "zone": "Duskwood",
    "level": 31,
    "elite": true,
    "macro": "/target Lord Malathrom",
    "coords": "17.8, 29.4 (Addle's Stead)",
    "respawn": "4 to 6 hours",
    "lore": "Spectral necromancer roaming the misty crypts of western Duskwood.",
    "drops": [
      {
        "name": "Malathrom's Grimoire",
        "type": "Off-Hand (iLvl 34)",
        "stats": "+6 Intellect, +5 Spirit, +9 Spell Damage"
      }
    ]
  },
  {
    "id": "naraxis",
    "name": "Naraxis",
    "zone": "Duskwood",
    "level": 27,
    "elite": false,
    "tameable": "Spider",
    "macro": "/target Naraxis",
    "coords": "86.8, 48.6 (Vul'Gol Ogre Mound)",
    "respawn": "2 to 3 hours",
    "lore": "Massive green weaver spider lurking at the mouth of Vul'Gol Mound.",
    "drops": [
      {
        "name": "Naraxis' Fang",
        "type": "1H Dagger (iLvl 29)",
        "stats": "14.1 DPS, Chance on hit: 45 Poison damage over 15s"
      }
    ]
  },
  {
    "id": "lupos",
    "name": "Lupos",
    "zone": "Duskwood",
    "level": 23,
    "elite": false,
    "tameable": "Wolf (Shadow Damage swings)",
    "macro": "/target Lupos",
    "coords": "22.4, 25.2 (The Darkened Bank)",
    "respawn": "4 to 6 hours",
    "lore": "Ghostly white wolf that inflicts direct Shadow Damage bypassing physical armor.",
    "drops": [
      {
        "name": "Lupos' Whisper",
        "type": "Neck (iLvl 25)",
        "stats": "+4 Agility, +5 Stamina"
      }
    ]
  },
  {
    "id": "nefaru",
    "name": "Nefaru",
    "zone": "Duskwood",
    "level": 30,
    "elite": false,
    "macro": "/target Nefaru",
    "coords": "72.8, 76.4 (Roland's Doom)",
    "respawn": "2 to 4 hours",
    "lore": "Feral worgen pack leader lurking in the Roland's Doom copper mine.",
    "drops": [
      {
        "name": "Nefaru's Pauldrons",
        "type": "Shoulder, Mail (iLvl 32)",
        "stats": "+7 Strength, +5 Stamina"
      }
    ]
  },
  {
    "id": "vultros",
    "name": "Vultros",
    "zone": "Westfall",
    "level": 26,
    "elite": false,
    "tameable": "Carrion Bird",
    "macro": "/target Vultros",
    "coords": "53.4, 52.8 (Furlbrow's Pumpkin Farm)",
    "respawn": "1 to 2 hours",
    "lore": "Giant red carrion bird circling over Furlbrow's Pumpkin Farm.",
    "drops": [
      {
        "name": "Vultros' Claw",
        "type": "1H Dagger (iLvl 28)",
        "stats": "13.6 DPS, +4 Agility, +2 Stamina"
      }
    ]
  },
  {
    "id": "slark",
    "name": "Slark",
    "zone": "Westfall",
    "level": 15,
    "elite": false,
    "macro": "/target Slark",
    "coords": "36.2, 33.8 (Coast of Westfall)",
    "respawn": "45 min",
    "lore": "Tidehunter murloc chieftain guarding his shoreline clan.",
    "drops": [
      {
        "name": "Slark's Shell Shield",
        "type": "Shield (iLvl 17)",
        "stats": "Block 14, +2 Stamina, +2 Strength"
      }
    ]
  },
  {
    "id": "miner-johnson",
    "name": "Miner Johnson",
    "zone": "The Deadmines (Dungeon)",
    "level": 19,
    "elite": true,
    "macro": "/target Miner Johnson",
    "coords": "Ironclad Cove upper scaffolding",
    "respawn": "Rare instance spawn",
    "lore": "Undead dwarf miner hiding in the forgotten shafts of the Deadmines.",
    "drops": [
      {
        "name": "Miner's Hat of the Deep",
        "type": "Head, Cloth (iLvl 21)",
        "stats": "+4 Int, +3 Spi, Equip: Light source"
      }
    ]
  },
  {
    "id": "shanda-the-spinner",
    "name": "Shanda the Spinner",
    "zone": "Loch Modan",
    "level": 19,
    "elite": false,
    "tameable": "Spider",
    "macro": "/target Shanda the Spinner",
    "coords": "79.4, 61.2 (Valley of Kings)",
    "respawn": "1 to 2 hours",
    "lore": "Venomous cliff spider stalking the rocks between Loch Modan and Badlands.",
    "drops": [
      {
        "name": "Spinner's Silk Cord",
        "type": "Waist, Cloth (iLvl 21)",
        "stats": "+4 Intellect, +3 Spirit, +5 Spell Power"
      }
    ]
  }
],
  libraryBooks: {
  "rewards": [
    {
      "threshold": 10,
      "title": "Friend of the Library (Necklace Choice)",
      "req": "10 Unique Books",
      "items": [
        {
          "name": "Scholarly Pendant",
          "slot": "Neck (iLvl 23)",
          "stats": "+3 Stamina, +2 Spirit",
          "icon": "https://foreverchanges.pro/icon/inv_jewelry_necklace_11.jpg"
        },
        {
          "name": "Erudite's Amulet",
          "slot": "Neck (iLvl 23)",
          "stats": "+2 Agility, +3 Stamina",
          "icon": "https://foreverchanges.pro/icon/inv_jewelry_necklace_01.jpg"
        }
      ]
    },
    {
      "threshold": 20,
      "title": "Greater Friend of the Library (Ring Choice)",
      "req": "20 Unique Books (Level 20+)",
      "items": [
        {
          "name": "Philanthropist's Ring",
          "slot": "Finger (iLvl 35)",
          "stats": "+5 Intellect, Equip: +10 Spell Damage and Healing",
          "icon": "https://foreverchanges.pro/icon/inv_jewelry_ring_14.jpg"
        },
        {
          "name": "Field Researcher's Loop",
          "slot": "Finger (iLvl 35)",
          "stats": "+7 Agility, +7 Stamina",
          "icon": "https://foreverchanges.pro/icon/inv_jewelry_ring_02.jpg"
        }
      ]
    },
    {
      "threshold": 25,
      "title": "Master Scholar of Azeroth (Weapon Choice)",
      "req": "25 Unique Books (Level 30+ / Req Lvl 40)",
      "items": [
        {
          "name": "Truthseeker's Bow",
          "slot": "Ranged Bow (iLvl 45)",
          "stats": "23.8 DPS, +7 Agility, +3 Stamina (Req Level 40)",
          "icon": "https://foreverchanges.pro/icon/inv_weapon_bow_01.jpg"
        },
        {
          "name": "Crest of Elucidation",
          "slot": "Off-Hand Shield (iLvl 45)",
          "stats": "+12 Spirit, +11 Healing, +4 Spell Damage (Req Level 40)",
          "icon": "https://foreverchanges.pro/icon/spell_holy_powerwordshield.jpg"
        },
        {
          "name": "Researcher's Night Light",
          "slot": "Off-Hand (iLvl 45)",
          "stats": "+12 Stamina, +7 Fire Spell Damage (Req Level 40)",
          "icon": "https://foreverchanges.pro/icon/inv_torch_lit.jpg"
        }
      ]
    }
  ],
  "librarians": {
    "alliance": {
      "name": "Garion Wendell",
      "location": "Mage Quarter, Stormwind City (37.6, 80.8)"
    },
    "horde": {
      "name": "Owen Thadd",
      "location": "Magic Quarter, Undercity (73.4, 33.0)"
    }
  },
  "books": [
    {
      "id": "book-01",
      "name": "Archmage Theocritus' Research Journal",
      "zone": "Elwynn Forest",
      "coords": "65.4, 70.1 (Tower of Azora)",
      "set": 1,
      "desc": "Research notes from the Tower of Azora."
    },
    {
      "id": "book-02",
      "name": "Archmage Antonidas: The Unabridged Autobiography",
      "zone": "Ironforge",
      "coords": "75.7, 10.5 (Hall of Explorers)",
      "set": 1,
      "desc": "Somewhat self-indulgent autobiography. Horde players can loot it too."
    },
    {
      "id": "book-03",
      "name": "Bewitchments and Glamours",
      "zone": "Westfall",
      "coords": "45.4, 70.4 (Moonbrook Schoolhouse)",
      "set": 1,
      "desc": "Spells for manipulation and deception."
    },
    {
      "id": "book-04",
      "name": "Rumi of Gnomeregan: The Collected Works",
      "zone": "Westfall / Loch Modan",
      "coords": "52.7, 53.8 (Sentinel Hill) or 35.6, 48.9",
      "set": 1,
      "desc": "The writings of a notable Gnome mage."
    },
    {
      "id": "book-05",
      "name": "Crimes Against Anatomy",
      "zone": "Duskwood",
      "coords": "16.6, 28.5 (Darkened Bank Catacombs)",
      "set": 1,
      "desc": "Written by Doctor Krastinov inside the catacomb end room."
    },
    {
      "id": "book-06",
      "name": "Runes of the Sorcerer-Kings",
      "zone": "Loch Modan",
      "coords": "77.4, 14.0 (Mo'grosh Stronghold)",
      "set": 1,
      "desc": "A relic of the mighty ogre empires of Draenor."
    },
    {
      "id": "book-07",
      "name": "Goaz Scrolls",
      "zone": "Wetlands",
      "coords": "33.6, 47.9 (Whelgar's Excavation Site)",
      "set": 1,
      "desc": "Written in lost Titan script."
    },
    {
      "id": "book-08",
      "name": "The Dalaran Digest, Vol. 23",
      "zone": "Silverpine Forest",
      "coords": "63.5, 63.1 (Ambermill)",
      "set": 1,
      "desc": "Arcane research of the Kirin Tor."
    },
    {
      "id": "book-09",
      "name": "The Apothecary's Metaphysical Primer",
      "zone": "Tirisfal Glades",
      "coords": "59.4, 52.3 (Brill Gallows)",
      "set": 1,
      "desc": "Notes on arcane theory by Archmage Rotwick."
    },
    {
      "id": "book-10",
      "name": "Nar'thalas Almanac, Vol. 74",
      "zone": "Darkshore",
      "coords": "59.8, 22.3 (Ruins of Mathystra)",
      "set": 1,
      "desc": "Arcane research of the ancient quel'dorei."
    },
    {
      "id": "book-11",
      "name": "Arcanic Systems Manual",
      "zone": "The Barrens",
      "coords": "56.3, 8.8 (The Sludge Fen)",
      "set": 1,
      "desc": "Poorly-organized troubleshooting tips for goblin technology."
    },
    {
      "id": "book-12",
      "name": "Baxtan: On Destructive Magics",
      "zone": "The Barrens",
      "coords": "62.7, 36.3 (Ratchet)",
      "set": 1,
      "desc": "The writings of a notable Goblin mage."
    },
    {
      "id": "book-13",
      "name": "Secrets of the Dreamers",
      "zone": "The Barrens",
      "coords": "46.0, 36.5 (Lushwater Oasis / Cavern of Mists)",
      "set": 1,
      "desc": "Observations on the Emerald Dream inside the Wailing Caverns cave."
    },
    {
      "id": "book-14",
      "name": "Fury of the Land",
      "zone": "Stonetalon Mountains",
      "coords": "74.4, 85.7 (Grimtotem Post)",
      "set": 1,
      "desc": "Closely guarded shamanistic secrets of the Grimtotem clan."
    },
    {
      "id": "book-15",
      "name": "The Lessons of Ta'zo",
      "zone": "Orgrimmar",
      "coords": "38.7, 78.4 (Valley of Spirits Mural)",
      "set": 1,
      "desc": "Etchings written by a great Troll mage."
    },
    {
      "id": "book-16",
      "name": "Basilisks: Should Petrification be Feared?",
      "zone": "Stranglethorn Vale",
      "coords": "41.4, 50.9 (Crystalvein Mine platform)",
      "set": 2,
      "desc": "Research notes on basilisk reagents outside the mine mouth."
    },
    {
      "id": "book-17",
      "name": "Geomancy: The Stone-Cold Truth",
      "zone": "Thousand Needles",
      "coords": "34.4, 40.1 (Darkcloud Pinnacle hut)",
      "set": 2,
      "desc": "Theories on the origin and usage of elemental magic."
    },
    {
      "id": "book-18",
      "name": "Defensive Magics 101",
      "zone": "Alterac Mountains",
      "coords": "48.4, 57.6 (Gallows' Corner Tower)",
      "set": 2,
      "desc": "Introductory guide to defensive barriers inside the ogre fortress tower."
    },
    {
      "id": "book-19",
      "name": "RwlRwlRwlRwl!",
      "zone": "Dustwallow Marsh",
      "coords": "57.2, 20.8 (Witch Hill murloc camp)",
      "set": 2,
      "desc": "Waterlogged book on the ground at the eastern edge of the murloc camp."
    },
    {
      "id": "book-20",
      "name": "A Web of Lies: Debunking Myths and Legends",
      "zone": "Arathi Highlands",
      "coords": "73.6, 65.2 (Witherbark Village)",
      "set": 3,
      "desc": "An incomplete thesis claiming spiders are harmless."
    },
    {
      "id": "book-21",
      "name": "Demons and You",
      "zone": "Desolace",
      "coords": "55.1, 26.2 (Thunder Axe Fortress)",
      "set": 3,
      "desc": "Inside the large building on a bench against the wall."
    },
    {
      "id": "book-22",
      "name": "Mummies: A Guide to the Unsavory Undead",
      "zone": "Badlands",
      "coords": "56.7, 39.9 (Mirage Flats)",
      "set": 3,
      "desc": "Tales frightening enough to scare hardy warriors."
    },
    {
      "id": "book-23",
      "name": "Sanguine Sorcery",
      "zone": "Swamp of Sorrows",
      "coords": "70.0, 51.0 (Pool of Tears / Sunken Temple roof)",
      "set": 3,
      "desc": "Outlines powerful blood rituals on top of the Sunken Temple exterior."
    },
    {
      "id": "book-24",
      "name": "Legends of the Tidesages",
      "zone": "Tanaris",
      "coords": "72.7, 47.8 (Lost Rigger Cove)",
      "set": 3,
      "desc": "Covered in notes scrawled by an unsteady hand."
    },
    {
      "id": "book-25",
      "name": "Stonewrought Design",
      "zone": "Burning Steppes",
      "coords": "29.0, 28.9 (Blackrock Mountain Tomb)",
      "set": 3,
      "desc": "On the altar of Franclorn Forgewright's tomb in Blackrock Mountain."
    },
    {
      "id": "book-26",
      "name": "Northern Kalimdor - A Comprehensive Guide",
      "zone": "Felwood",
      "coords": "65.2, 3.3 (Timbermaw Hold Tunnel)",
      "set": 3,
      "desc": "In the tunnel between Felwood and Winterspring."
    },
    {
      "id": "book-27",
      "name": "Necromancy 101",
      "zone": "Western Plaguelands",
      "coords": "69.4, 72.8 (Caer Darrow Scholomance keep)",
      "set": 3,
      "desc": "On a table in the ruined keep of Caer Darrow outside the dungeon."
    },
    {
      "id": "book-28",
      "name": "A Study of the Light",
      "zone": "Eastern Plaguelands",
      "coords": "71.8, 48.2 (Light's Hope Chapel)",
      "set": 3,
      "desc": "Teachings of the Light inside the chapel building."
    },
    {
      "id": "book-29",
      "name": "The Knight and the Lady",
      "zone": "Eastern Plaguelands",
      "coords": "54.4, 51.1 (Corin's Crossing)",
      "set": 3,
      "desc": "In a small house by the lake."
    },
    {
      "id": "book-30",
      "name": "Ka-Boom!",
      "zone": "Winterspring",
      "coords": "60.7, 37.7 (Everlook Alchemy shop)",
      "set": 3,
      "desc": "On a shelf behind the alchemy supplier in Everlook."
    },
    {
      "id": "book-31",
      "name": "The Founding of Ironforge",
      "zone": "Loch Modan",
      "coords": "46.2, 13.8 (Algaz Gate Library)",
      "set": 4,
      "desc": "Architectural blueprints and clan pacts from the construction of Ironforge."
    },
    {
      "id": "book-32",
      "name": "Legends of the Gurubashi",
      "zone": "Duskwood",
      "coords": "78.4, 34.6 (Beggar's Haunt)",
      "set": 4,
      "desc": "Chronicles of the ancient Jungle Troll empire and the avatar of Hakkar."
    },
    {
      "id": "book-33",
      "name": "The Seven Kingdoms",
      "zone": "Hillsbrad Foothills",
      "coords": "51.2, 58.6 (Southshore Town Hall)",
      "set": 4,
      "desc": "Political history and diplomatic accords of Arathor's successor states."
    },
    {
      "id": "book-34",
      "name": "The Scourge of Lordaeron",
      "zone": "Silverpine Forest",
      "coords": "43.8, 40.2 (Pyrewood Village Town Hall)",
      "set": 4,
      "desc": "Eyewitness testimonies from the fall of Stratholme and the plague grain."
    },
    {
      "id": "book-35",
      "name": "The Sunken Temple of Atal'Hakkar",
      "zone": "Swamp of Sorrows",
      "coords": "67.2, 48.4 (Sunken Temple Outer Balcony)",
      "set": 4,
      "desc": "Warnings of the Green Dragonflight wardens containing Hakkar's nightmare."
    },
    {
      "id": "book-36",
      "name": "Rise of the Horde",
      "zone": "Stonetalon Mountains",
      "coords": "48.6, 61.2 (Sun Rock Retreat)",
      "set": 4,
      "desc": "Firsthand orc accounts of the crossing through the Dark Portal."
    },
    {
      "id": "book-37",
      "name": "The Old Gods and the Ordering of Azeroth",
      "zone": "Ashenvale",
      "coords": "74.2, 60.8 (Forest Song Ruins)",
      "set": 4,
      "desc": "Titan archives detailing the imprisonment of C'Thun and Yogg-Saron."
    },
    {
      "id": "book-38",
      "name": "War of the Ancients: The Well of Eternity",
      "zone": "Darkshore",
      "coords": "37.2, 43.6 (Ruins of Mathystra)",
      "set": 4,
      "desc": "Highborne scrolls describing the Burning Legion's first invasion ten thousand years ago."
    },
    {
      "id": "book-39",
      "name": "The Scepter of the Shifting Sands",
      "zone": "Thousand Needles",
      "coords": "28.4, 76.2 (Mirage Raceway)",
      "set": 4,
      "desc": "Bronze Dragonflight lore detailing the seal placed upon Ahn'Qiraj."
    },
    {
      "id": "book-40",
      "name": "The World Tree and the Emerald Dream",
      "zone": "Zephras Isle",
      "coords": "42.6, 58.2 (Windweaver Sanctum)",
      "set": 4,
      "desc": "Sacred druidic tome gifted to the early Skyborne by the Green Flight."
    }
  ]
},
  campingRecipes: {
  "tanningRack": {
    "name": "Tanning Rack",
    "prof": "Leatherworking",
    "reqSkill": 140,
    "blueprintSource": "Razorclaw the Butcher (Shadowfang Keep - 1 in 900 drop)",
    "reagents": "5x Medium Leather, 3x Fine Thread, 2x Simple Wood",
    "duration": "15 minutes (Replaces Camp Tent, grants Tent bonuses + 1hr CD)",
    "totalRecipes": 48,
    "highlightRecipes": [
      {
        "skill": 125,
        "name": "Defender's Leather Kilt",
        "reagents": "12x Med Leather, 4x Cured Med Hide, 8x Pristine Leather, 8x Elixir of Minor Fortitude"
      },
      {
        "skill": 125,
        "name": "Totemic Leather Leggings",
        "reagents": "12x Med Leather, 4x Cured Med Hide, 8x Pristine Leather, 8x Sulfuric Acid"
      },
      {
        "skill": 125,
        "name": "Brawler's Leather Legguards",
        "reagents": "12x Med Leather, 4x Cured Med Hide, 8x Pristine Leather, 8x Shadowgem"
      },
      {
        "skill": 125,
        "name": "Trapper's Leather Legguards",
        "reagents": "12x Med Leather, 4x Cured Med Hide, 8x Pristine Leather, 8x Deviate Scale"
      },
      {
        "skill": 125,
        "name": "Stormrider's Leather Kilt",
        "reagents": "12x Med Leather, 4x Cured Med Hide, 8x Pristine Leather, 8x Cerulean Dye"
      },
      {
        "skill": 125,
        "name": "Wisdom's Leather Leggings",
        "reagents": "12x Med Leather, 4x Cured Med Hide, 8x Pristine Leather, 8x Small Lustrous Pearl"
      },
      {
        "skill": 150,
        "name": "Prowler's Leather Belt",
        "reagents": "8x Heavy Leather, 2x Cured Med Hide, 1x Jade"
      },
      {
        "skill": 150,
        "name": "Warden's Leather Belt",
        "reagents": "8x Heavy Leather, 2x Cured Med Hide, 1x Elemental Earth"
      },
      {
        "skill": 150,
        "name": "Skirmisher's Leather Belt",
        "reagents": "8x Heavy Leather, 2x Cured Med Hide, 1x Citrine"
      },
      {
        "skill": 150,
        "name": "Skulker's Leather Belt",
        "reagents": "8x Heavy Leather, 2x Cured Med Hide, 1x Spider's Silk"
      },
      {
        "skill": 175,
        "name": "Prowler's Leather Gloves",
        "reagents": "16x Heavy Leather, 2x Cured Heavy Hide, 2x Pristine Hide, 2x Jade"
      },
      {
        "skill": 175,
        "name": "Skulker's Leather Gloves",
        "reagents": "16x Heavy Leather, 2x Cured Heavy Hide, 2x Pristine Hide, 2x Spider's Silk"
      },
      {
        "skill": 200,
        "name": "Stalker's Mail Boots",
        "reagents": "8x Heavy Leather, 2x Cured Med Hide, 2x Elemental Air"
      },
      {
        "skill": 200,
        "name": "Skycaller's Mail Boots",
        "reagents": "8x Heavy Leather, 2x Cured Med Hide, 2x Elemental Water"
      },
      {
        "skill": 220,
        "name": "Wolfshead Helm",
        "type": "Classic Rework",
        "reagents": "18x Thick Leather, 2x Thick Wolfhide, 8x Wicked Claw, 2x Cured Thick Hide"
      }
    ]
  },
  "spinningWheel": {
    "name": "Spinning Wheel",
    "prof": "Tailoring",
    "reqSkill": 140,
    "blueprintSource": "Unstable Sentinel (City of Dalaran)",
    "reagents": "5x Bolt of Silk Cloth, 3x Fine Thread, 2x Simple Wood",
    "duration": "15 minutes (Replaces Faction Banner, preserves Spirit buff)",
    "totalRecipes": 74,
    "highlightRecipes": [
      {
        "skill": 125,
        "name": "Pristine Leggings",
        "reagents": "14x Bolt of Silk, 8x Cerulean Dye, 8x Pristine Leather, 2x Silver Bar, 3x Greater Astral Essence"
      },
      {
        "skill": 125,
        "name": "Silky Leggings",
        "reagents": "14x Bolt of Silk, 8x Cerulean Dye, 8x Spider's Silk, 2x Silver Bar, 3x Greater Astral Essence"
      },
      {
        "skill": 125,
        "name": "Flame Leggings",
        "reagents": "14x Bolt of Silk, 8x Cerulean Dye, 8x Fire Oil, 2x Silver Bar, 3x Greater Astral Essence"
      },
      {
        "skill": 125,
        "name": "Shadow Leggings",
        "reagents": "14x Bolt of Silk, 8x Cerulean Dye, 8x Shadowgem, 2x Silver Bar, 3x Greater Astral Essence"
      },
      {
        "skill": 140,
        "name": "Gilded Slippers",
        "reagents": "8x Bolt of Mageweave, 4x Heavy Silken Thread, 2x Magenta Dye, 2x Gold Bar"
      },
      {
        "skill": 140,
        "name": "Frothing Slippers",
        "reagents": "8x Bolt of Mageweave, 4x Heavy Silken Thread, 2x Magenta Dye, 2x Globe of Water"
      },
      {
        "skill": 140,
        "name": "Fiery Slippers",
        "reagents": "8x Bolt of Mageweave, 4x Heavy Silken Thread, 2x Magenta Dye, 2x Heart of Fire"
      },
      {
        "skill": 165,
        "name": "Gilded Handwraps",
        "reagents": "12x Bolt of Mageweave, 4x Heavy Silken Thread, 2x Magenta Dye, 4x Gold Bar"
      },
      {
        "skill": 165,
        "name": "Frothing Handwraps",
        "reagents": "12x Bolt of Mageweave, 4x Heavy Silken Thread, 2x Magenta Dye, 4x Globe of Water"
      },
      {
        "skill": 190,
        "name": "Gilded Cord",
        "reagents": "28x Bolt of Mageweave, 6x Magenta Dye, 4x Cerulean Dye, 12x Gold Bar"
      },
      {
        "skill": 195,
        "name": "Nethergeld Shoulders",
        "reagents": "16x Bolt of Mageweave, 4x Magenta Dye, 8x Gold Bar, 2x Greater Nether Essence"
      },
      {
        "skill": 205,
        "name": "Nethergeld Cuffs",
        "reagents": "18x Bolt of Mageweave, 6x Magenta Dye, 10x Gold Bar, 4x Greater Nether Essence"
      },
      {
        "skill": 205,
        "name": "Dreamweave Vest",
        "type": "Classic Rework",
        "reagents": "6x Bolt of Mageweave, 6x Wildvine, 2x Heart of the Wild"
      }
    ]
  }
},
  pvp: {
  "ranks": [
    {
      "rank": 1,
      "titleA": "Private",
      "titleH": "Scout",
      "rpNeeded": 750,
      "rpTotal": 750,
      "earliestWeek": 1,
      "unlock": "Private's Tabard / Scout's Tabard"
    },
    {
      "rank": 2,
      "titleA": "Corporal",
      "titleH": "Grunt",
      "rpNeeded": 900,
      "rpTotal": 1650,
      "earliestWeek": 1,
      "unlock": "Greater Insignia of Alliance / Horde (Trinket)"
    },
    {
      "rank": 3,
      "titleA": "Sergeant",
      "titleH": "Sergeant",
      "rpNeeded": 1050,
      "rpTotal": 2700,
      "earliestWeek": 1,
      "unlock": "Faction Cloak (+7 Stamina)"
    },
    {
      "rank": 4,
      "titleA": "Master Sergeant",
      "titleH": "Senior Sergeant",
      "rpNeeded": 1200,
      "rpTotal": 3900,
      "earliestWeek": 2,
      "unlock": "Premier Master Sergeant's Insignia (Phase 2 Cap)"
    },
    {
      "rank": 5,
      "titleA": "Sergeant Major",
      "titleH": "First Sergeant",
      "rpNeeded": 1350,
      "rpTotal": 5250,
      "earliestWeek": 2,
      "unlock": "Combat Potions"
    },
    {
      "rank": 6,
      "titleA": "Knight",
      "titleH": "Stone Guard",
      "rpNeeded": 1500,
      "rpTotal": 6750,
      "earliestWeek": 3,
      "unlock": "Knight's Colors / Stone Guard's Herald"
    },
    {
      "rank": 7,
      "titleA": "Knight-Lieutenant",
      "titleH": "Blood Guard",
      "rpNeeded": 1650,
      "rpTotal": 8400,
      "earliestWeek": 4,
      "unlock": "Alliance Battle Standard / Horde Battle Standard"
    },
    {
      "rank": 8,
      "titleA": "Knight-Captain",
      "titleH": "Legionnaire",
      "rpNeeded": 1800,
      "rpTotal": 10200,
      "earliestWeek": 5,
      "unlock": "Elite Wrist & Waist Upgrades (Emboldened Seals)"
    },
    {
      "rank": 9,
      "titleA": "Knight-Champion",
      "titleH": "Centurion",
      "rpNeeded": 1950,
      "rpTotal": 12150,
      "earliestWeek": 6,
      "unlock": "Elite Boot Upgrade"
    },
    {
      "rank": 10,
      "titleA": "Lieutenant Commander",
      "titleH": "Champion",
      "rpNeeded": 2100,
      "rpTotal": 14250,
      "earliestWeek": 7,
      "unlock": "Elite Glove Upgrade"
    },
    {
      "rank": 11,
      "titleA": "Commander",
      "titleH": "Lieutenant General",
      "rpNeeded": 2350,
      "rpTotal": 16600,
      "earliestWeek": 7,
      "unlock": "Black War Mounts (100% Speed)"
    },
    {
      "rank": 12,
      "titleA": "Marshal",
      "titleH": "General",
      "rpNeeded": 2500,
      "rpTotal": 19100,
      "earliestWeek": 8,
      "unlock": "Elite Leg & Shoulder Upgrades"
    },
    {
      "rank": 13,
      "titleA": "Field Marshal",
      "titleH": "Warlord",
      "rpNeeded": 2650,
      "rpTotal": 21750,
      "earliestWeek": 9,
      "unlock": "Elite Chest & Head Upgrades"
    },
    {
      "rank": 14,
      "titleA": "Grand Marshal",
      "titleH": "High Warlord",
      "rpNeeded": 3000,
      "rpTotal": 24750,
      "earliestWeek": 10,
      "unlock": "Grand Marshal / High Warlord Epic Weapons"
    }
  ],
  "battlegrounds": [
    {
      "name": "Warsong Gulch",
      "players": "10v10",
      "levels": "20-29 (Active in Beta), 30-39, 40-49, 50-59, 60",
      "type": "Capture the Flag"
    },
    {
      "name": "Arathi Basin",
      "players": "15v15",
      "levels": "20-29, 30-39, 40-49, 50-59, 60",
      "type": "Base Resource Domination"
    },
    {
      "name": "Darkspear Islands",
      "players": "15v15",
      "levels": "30-39, 40-49, 50-59, 60",
      "type": "NEW Battleground in Forever (Island War)"
    },
    {
      "name": "Alterac Valley",
      "players": "40v40",
      "levels": "51-60",
      "type": "Large-Scale Warfare"
    }
  ]
},
  legacyChallenges: {
  "total": 65,
  "categories": [
    {
      "name": "Classes",
      "count": 27,
      "desc": "Reach Level 25, 45, and 60 across all 9 classes (Druid, Hunter, Mage, Paladin, Priest, Rogue, Shaman, Warlock, Warrior)."
    },
    {
      "name": "Tradeskills",
      "count": 18,
      "desc": "Reach Skill 150, 225, and 300 across 6 primary crafting trades (Alchemy, Blacksmithing, Enchanting, Engineering, Leatherworking, Tailoring)."
    },
    {
      "name": "Dungeons",
      "count": 3,
      "desc": "Novice Spelunker (6 dungeons), Experienced Spelunker (10 dungeons), Master Spelunker (17 dungeons)."
    },
    {
      "name": "Raids",
      "count": 3,
      "desc": "Conqueror of the Wilds (13 encounters in Hyjal Summit), Conqueror of the Deeps (8 encounters in Barrow Deeps), Conqueror of the Lair (Onyxia)."
    },
    {
      "name": "Player vs. Player",
      "count": 12,
      "desc": "Honor Ranks (Rank 3, 7, 10, 13, 14), Exalted Reputations (Warsong, Arathi, Alterac, Darkspear Islands), Field of Honor Journey (Weeks 4, 7, 10)."
    },
    {
      "name": "Adventure",
      "count": 2,
      "desc": "Lord Valthalak Laid to Rest (Dungeon Set 2 questline), Explorer (Explore Azeroth achievement)."
    }
  ],
  "accountRewards": [
    {
      "points": 15,
      "name": "Holstered Replica Ironforge Air Rifle",
      "type": "Toy",
      "desc": "Interactive air rifle shootout shootout that keeps score."
    },
    {
      "points": 25,
      "name": "Spectral Bear Cub",
      "type": "Pet",
      "desc": "Companion vanity pet."
    },
    {
      "points": 40,
      "name": "Spectral Bear Tabard",
      "type": "Tabard",
      "desc": "Showcases Legacy dedication."
    },
    {
      "points": 55,
      "name": "Reins of the Spectral Bear",
      "type": "Mount",
      "desc": "100% Epic spectral bear mount."
    }
  ]
},
  expandedDungeons: {
  "excavation-site": {
    "id": "excavation-site",
    "name": "Excavation Site: Wetlands",
    "zone": "Wetlands (Above Whelgar's Excavation)",
    "levelRange": "26–31",
    "entrance": "In the cliffside cliffs overlooking Whelgar's Excavation Site in central Wetlands.",
    "bosses": [
      {
        "name": "Saltspine",
        "level": 28,
        "portrait": "https://foreverchanges.pro/wow-ui/bosses/saltspine.webp",
        "mechanics": "Roams the starting marsh among elite crocolisks. Clear trash thoroughly before engaging him. He hits hard with high base health.",
        "abilities": [
          {
            "name": "Large Health Pool",
            "role": "Tank",
            "type": "Physical",
            "desc": "Hits hard with high sustained melee swings. Tank keep defensive buffs active."
          }
        ],
        "drops": [
          {
            "name": "Supple Bellyskin Leggings",
            "slot": "Legs, Leather",
            "dropRate": "35%",
            "stats": "+6 Agi, +5 Sta"
          },
          {
            "name": "Saltscale Girdle",
            "slot": "Waist, Mail",
            "dropRate": "35%",
            "stats": "+5 Str, +4 Sta"
          },
          {
            "name": "Glinteye Slippers",
            "slot": "Feet, Cloth",
            "dropRate": "30%",
            "stats": "+5 Int, +4 Spi"
          }
        ]
      },
      {
        "name": "Shadetooth",
        "level": 29,
        "portrait": "https://foreverchanges.pro/wow-ui/bosses/shadetooth.webp",
        "mechanics": "Slay the raptor matriarch in the tall brush. A wave of raptor adds spawns upon her death; wipe out the wave quickly before Shadetooth charges in.",
        "abilities": [
          {
            "name": "Raptors in the Grass",
            "role": "DPS",
            "type": "Physical",
            "desc": "Small ambush raptors jump from foliage applying stacking bleed effects."
          },
          {
            "name": "Wave of the Pack",
            "role": "DPS",
            "type": "Add Wave",
            "desc": "Kill every raptor in the incoming pack before Shadetooth arrives to prevent overlap."
          },
          {
            "name": "Primal Fear",
            "role": "Healer / Tank",
            "type": "Fear CC",
            "desc": "Fears the tank repeatedly. Shamans should drop Tremor Totem; Priests use Fear Ward."
          }
        ],
        "drops": [
          {
            "name": "Raptorclaw Greaves",
            "slot": "Feet, Mail",
            "dropRate": "33%",
            "stats": "+7 Str, +6 Sta"
          },
          {
            "name": "Garb of Florid Feathers",
            "slot": "Chest, Leather",
            "dropRate": "33%",
            "stats": "+8 Agi, +6 Sta"
          },
          {
            "name": "Raptor's Gaze",
            "slot": "Held in Off-hand",
            "dropRate": "28%",
            "stats": "+6 Int, +5 Spi, +8 Spell Power"
          },
          {
            "name": "Blueprint: Greenhouse",
            "slot": "Camping Book",
            "dropRate": "6%",
            "stats": "Teaches Greenhouse Camping Blueprint"
          }
        ]
      },
      {
        "name": "Highland Horror",
        "level": 30,
        "portrait": "https://foreverchanges.pro/wow-ui/bosses/highland-horror.webp",
        "mechanics": "Guards the Dragonmaw orc encampment. Pull the surrounding Dragonmaw orcs in small packs first, then engage the horror.",
        "abilities": [
          {
            "name": "Dragonmaw Vanguard",
            "role": "Tank",
            "type": "Add Group",
            "desc": "Pulls easily with nearby camp. Pull isolated packs to avoid overwhelming the tank."
          }
        ],
        "drops": [
          {
            "name": "Horrible Rootcore",
            "slot": "Quest Item",
            "dropRate": "100%",
            "stats": "Starts Horrors in the Highland quest for Rethiel the Greenwarden."
          }
        ]
      },
      {
        "name": "Relic Guardian",
        "level": 31,
        "portrait": "https://foreverchanges.pro/wow-ui/bosses/relic-guardian.webp",
        "mechanics": "Dormant at the end of the spider cavern. Click the ancient Titan console next to him to initiate the encounter.",
        "abilities": [
          {
            "name": "Threat Protocol Reset",
            "role": "Tank / DPS",
            "type": "Threat Wipe",
            "desc": "Drops all threat and snaps to highest DPS. Damage dealers throttle bursts; tank must taunt immediately."
          }
        ],
        "drops": [
          {
            "name": "Reliquary Mantle",
            "slot": "Shoulder, Mail",
            "dropRate": "32%",
            "stats": "+7 Str, +6 Sta"
          },
          {
            "name": "Ring of Power Regulation",
            "slot": "Finger",
            "dropRate": "30%",
            "stats": "+5 Int, +5 Sta, +7 Spell Power"
          },
          {
            "name": "Golemsight Long Gun",
            "slot": "Ranged, Gun",
            "dropRate": "25%",
            "stats": "14.8 DPS, +4 Agi, +3 Sta"
          },
          {
            "name": "Titan Relic",
            "slot": "Quest Item",
            "dropRate": "100%",
            "stats": "Starts Prehistoric Prism / Earthen Echo questlines."
          }
        ]
      }
    ],
    "quests": [
      {
        "name": "Prehistoric Prism / Earthen Echo",
        "faction": "Both",
        "levelReq": 24,
        "source": "Titan Relic (Relic Guardian)",
        "xp": "6,150–6,950 XP",
        "rewards": "Explorer's League Dustcover (Back) / Healer's Staff / Heavehammer (2H Mace) / Furs of the Earthen Ring"
      },
      {
        "name": "Horrors in the Highland",
        "faction": "Alliance",
        "levelReq": 24,
        "source": "Rethiel the Greenwarden (Wetlands 56.2, 40.5)",
        "xp": "6,150 XP",
        "rewards": "Ironwood Destroyer (2H Mace) / Curl of Life (Ring) / Hornbeam Heft (1H Axe)"
      },
      {
        "name": "Changing Tastes",
        "faction": "Horde",
        "levelReq": 24,
        "source": "Borstan (Orgrimmar 57.4, 53.4)",
        "xp": "6,950 XP",
        "rewards": "Serrated Raptor Claw (1H Dagger) / Recipe: Twice-Spiced Raptor Slice"
      },
      {
        "name": "Dorin's Kin / Songblade Stabilizer",
        "faction": "Alliance",
        "levelReq": 24,
        "source": "Body of Daewyn inside dungeon",
        "xp": "6,150 XP",
        "rewards": "Daewyn's Girdle (Cloth Waist) / Songblade Stabilizer (Mail Waist)"
      }
    ]
  },
  "city-of-dalaran": {
    "id": "city-of-dalaran",
    "name": "City of Dalaran",
    "zone": "Alterac Mountains (Through Lordamere Lake Sewers)",
    "levelRange": "28–33",
    "entrance": "Sewer pipe entrance beneath Dalaran purple dome in Alterac Mountains. Key required (Dalaran Sewer Key).",
    "bosses": [
      {
        "name": "Atrexis the Grave Knight",
        "level": 29,
        "portrait": "https://foreverchanges.pro/wow-ui/bosses/145787.webp",
        "mechanics": "Stands inside the ritual summoning circle in the sewer underbelly, flanked by Kirin Tor Necromancers.",
        "abilities": [
          {
            "name": "Unholy Frenzy",
            "role": "Healer / Shaman / Priest",
            "type": "Magic Dispel",
            "desc": "+75% Attack Speed for 20 sec. Shaman Purge or Priest Dispel Magic immediately!"
          },
          {
            "name": "Thrash",
            "role": "Tank / Healer",
            "type": "Burst Melee",
            "desc": "Swings twice simultaneously; heavy incoming spike damage."
          },
          {
            "name": "Raise Dead",
            "role": "DPS",
            "type": "Add Cleave",
            "desc": "Skeletons rise continually around the circle. Cleave them down quickly."
          },
          {
            "name": "Disarm",
            "role": "Tank",
            "type": "Debuff",
            "desc": "Takes tank weapon away for 6 seconds; keep defensive mitigation rolling."
          }
        ],
        "drops": [
          {
            "name": "Graveweave Bindings",
            "slot": "Wrist, Cloth",
            "dropRate": "35%",
            "stats": "+5 Int, +4 Spi, +6 Spell Power"
          },
          {
            "name": "Bonebinder's Signet",
            "slot": "Finger",
            "dropRate": "36%",
            "stats": "+6 Sta, +5 Spi, +8 Healing"
          },
          {
            "name": "Gravespike Repeater",
            "slot": "Ranged, Crossbow",
            "dropRate": "29%",
            "stats": "16.4 DPS, +4 Agi, +3 Sta"
          }
        ]
      },
      {
        "name": "Lyn the Ignored",
        "level": 31,
        "portrait": "https://foreverchanges.pro/wow-ui/bosses/lyn-the-ignored.webp",
        "mechanics": "Secret summoning encounter: player with Tome of Dalaran clicks pink circle in northeast market stalls room.",
        "abilities": [
          {
            "name": "Shadow Bolt Volley",
            "role": "Healer",
            "type": "AoE Shadow",
            "desc": "Hits all party members within 30 yards. Healers prepare group heals."
          },
          {
            "name": "Curse of Thorns",
            "role": "Mage / Druid",
            "type": "Curse Dispel",
            "desc": "Damages attackers on hit. Decurse targets immediately."
          }
        ],
        "drops": [
          {
            "name": "Cartilage Shapers",
            "slot": "Hands, Leather",
            "dropRate": "39%",
            "stats": "+7 Agi, +6 Sta, +10 AP"
          },
          {
            "name": "Tendonscraper Dagger",
            "slot": "Main Hand, Dagger",
            "dropRate": "19%",
            "stats": "18.2 DPS, 1.60 Speed"
          },
          {
            "name": "Bonepile Gaze",
            "slot": "Off Hand, Shield",
            "dropRate": "43%",
            "stats": "Block 24, +6 Sta, +4 Str"
          }
        ]
      },
      {
        "name": "Arcane Anomaly",
        "level": 30,
        "portrait": "https://foreverchanges.pro/wow-ui/bosses/arcane-anomaly.webp",
        "mechanics": "Channels lethal directional beam and arcane bolts.",
        "abilities": [
          {
            "name": "Focal Blast",
            "role": "All Players",
            "type": "Directional Beam",
            "desc": "3s cast, channels a continuous beam hitting 4x per second. Step out of the path immediately!"
          },
          {
            "name": "Arcane Bolt",
            "role": "Tank",
            "type": "Magic Nuke",
            "desc": "Regular 1.5s cast dealing heavy arcane spike damage to the tank."
          }
        ],
        "drops": [
          {
            "name": "Runemender's Seal",
            "slot": "Finger",
            "dropRate": "30%",
            "stats": "+6 Int, +8 Spell Damage"
          },
          {
            "name": "Ephemeral Grips",
            "slot": "Hands, Cloth",
            "dropRate": "39%",
            "stats": "+7 Int, +5 Spi, +9 Spell Power"
          },
          {
            "name": "Mana-Warped Chain Shirt",
            "slot": "Chest, Mail",
            "dropRate": "31%",
            "stats": "+9 Str, +8 Sta, +6 Int"
          }
        ]
      },
      {
        "name": "Arcanic Enigma",
        "level": 30,
        "portrait": "https://foreverchanges.pro/wow-ui/bosses/arcanic-enigma.webp",
        "mechanics": "Polymorphs party members and silences spellcasters.",
        "abilities": [
          {
            "name": "Manamorph",
            "role": "Healer",
            "type": "Magic Dispel",
            "desc": "Polymorphs target into an animal for 8 sec. Dispel immediately."
          },
          {
            "name": "Silence Wave",
            "role": "Healers / Casters",
            "type": "Silence",
            "desc": "10-second silence aura. Healers must position beyond 20 yards."
          },
          {
            "name": "Arcane Manalings",
            "role": "DPS",
            "type": "Adds",
            "desc": "Summons manalings that must be burned down with AoE."
          }
        ],
        "drops": [
          {
            "name": "Drape of Shifting Energy",
            "slot": "Back, Cloth",
            "dropRate": "31%",
            "stats": "24 Armor, +5 Int, +7 Spell Power"
          },
          {
            "name": "Violet Sorcerer's Robes",
            "slot": "Chest, Cloth (Set)",
            "dropRate": "39%",
            "stats": "+10 Int, +7 Spi, +12 Spell Power"
          },
          {
            "name": "Wand of Mana Concentration",
            "slot": "Ranged, Wand",
            "dropRate": "30%",
            "stats": "32.1 DPS, +3 Int, +5 Spell Power"
          }
        ]
      },
      {
        "name": "Unstable Sentinel",
        "level": 31,
        "portrait": "https://foreverchanges.pro/wow-ui/bosses/unstable-sentinel.webp",
        "mechanics": "Ancient construct with lethal 25-yard pulsing AoE. Drops the Spinning Wheel blueprint!",
        "abilities": [
          {
            "name": "Malfunction",
            "role": "All Players",
            "type": "Pulsing AoE",
            "desc": "Channels 6s, pulsing 140 damage every 2s within 25 yards. Ranged stay back; melee back off during cast!"
          }
        ],
        "drops": [
          {
            "name": "Guardian's Dualblade",
            "slot": "2H Axe",
            "dropRate": "35%",
            "stats": "24.6 DPS, 3.40 Speed, +11 Str, +8 Sta"
          },
          {
            "name": "Refractory Scaleguards",
            "slot": "Legs, Mail",
            "dropRate": "32%",
            "stats": "+10 Str, +8 Sta"
          },
          {
            "name": "Unstable Crystalline Shoulderpads",
            "slot": "Shoulder, Leather",
            "dropRate": "33%",
            "stats": "+8 Agi, +7 Sta"
          },
          {
            "name": "Blueprint: Spinning Wheel",
            "slot": "Tailoring Recipe",
            "dropRate": "8.4%",
            "stats": "Teaches Spinning Wheel campsite station"
          }
        ]
      },
      {
        "name": "Shade of the Archmage",
        "level": 33,
        "portrait": "https://foreverchanges.pro/wow-ui/bosses/shade-of-archmage.webp",
        "mechanics": "Final boss of Dalaran inside the Violet Chamber. Mass polymorphs when out of mana and channels Evocation.",
        "abilities": [
          {
            "name": "Bounding Mana",
            "role": "All Players",
            "type": "Silencing Orb",
            "desc": "Mana orb flies between players and boss. Passing through it deals heavy arcane damage and silences for 6s!"
          },
          {
            "name": "Mass Polymorph & Evocation",
            "role": "Healer / All",
            "type": "Phase Change",
            "desc": "When mana reaches 0, transforms entire group into sheep for 8s while channeling Evocation."
          },
          {
            "name": "Stay in the Room",
            "role": "All",
            "type": "Encounter Rule",
            "desc": "Leaving the chamber resets the encounter to 100% health."
          }
        ],
        "drops": [
          {
            "name": "Ponderous Orb",
            "slot": "Held in Off-hand",
            "dropRate": "26%",
            "stats": "+8 Int, +6 Spi, +11 Spell Power"
          },
          {
            "name": "Violet Sorcerer's Mantle",
            "slot": "Shoulder, Cloth (Set)",
            "dropRate": "35%",
            "stats": "+8 Int, +6 Spi, +9 Spell Power"
          },
          {
            "name": "Archmagister's Faceted Pendant",
            "slot": "Neck",
            "dropRate": "38%",
            "stats": "+7 Int, +5 Sta, +8 Spell Power"
          },
          {
            "name": "Blueprint: Arcane Salvager",
            "slot": "Enchanting Recipe",
            "dropRate": "7.5%",
            "stats": "Teaches Arcane Salvager campfire tool"
          }
        ]
      }
    ],
    "quests": [
      {
        "name": "Heart of Disruption",
        "faction": "Both",
        "levelReq": 24,
        "source": "Image of Archmage Modera (Lordamere Lake) / Magus Wordeen (Tarren Mill)",
        "xp": "9,400 XP",
        "rewards": "Spellguard Pauldrons (Mail) / Renewing Footpads (Leather) / Defender of Dalaran (2H Mace) OR Battle Spaulders / Enchanted Sandals / Striking Staff"
      },
      {
        "name": "The Grave Knight",
        "faction": "Horde",
        "levelReq": 24,
        "source": "Melisara (Tarren Mill)",
        "xp": "9,400 XP",
        "rewards": "Gravewalker Boots (Leather) / Undead Knight's Bracers (Mail)"
      },
      {
        "name": "Power Overwhelming",
        "faction": "Alliance",
        "levelReq": 24,
        "source": "High Sorcerer Andromath (Stormwind City 48.7, 87.6)",
        "xp": "9,400 XP",
        "rewards": "Violet Sash (Cloth Waist) / Runebound Gloves (Leather)"
      },
      {
        "name": "Source of Power",
        "faction": "Horde",
        "levelReq": 24,
        "source": "Doctor Martin Felben (Undercity 46.6, 74.4)",
        "xp": "9,400 XP",
        "rewards": "Unstable Power Core (Wand) / Construct Cloak (Cloth Back)"
      }
    ]
  }
},
  hunterPets: {
  "summary": {
    "totalFamilies": 18,
    "newFamily": "Fox",
    "newAbilitiesCount": 9,
    "description": "WoW Forever preserves classic pet mechanics with normalized base speeds, native passive swing-speed inheritance, 18 pet families, the new Fox family, and 9 brand new or reworked family abilities."
  },
  "families": [
    {
      "id": "bat",
      "name": "Bat",
      "icon": "https://foreverchanges.pro/icon/ability_hunter_pet_bat.jpg",
      "damageMod": "+7%",
      "armorMod": "0%",
      "healthMod": "0%",
      "diet": [
        "Fungus",
        "Fruit"
      ],
      "abilities": [
        "Sonic Blast (Rank 1-5)",
        "Dive (Rank 1-3)",
        "Bite (Rank 1-8)"
      ],
      "newAbility": {
        "name": "Sonic Blast",
        "badge": "✦ New in Forever",
        "icon": "https://foreverchanges.pro/icon/ability_vehicle_sonicshockwave.jpg",
        "cost": "80 Focus",
        "cd": "30 sec CD",
        "desc": "Emits a piercing shriek, inflicting 33 to 39 Nature damage (Rank 2) and increasing the casting time of all spells by 60% for 30 sec."
      },
      "highlight": "Potent anti-caster pet; 60% cast slow shuts down enemy healers and casters in PvP.",
      "tameLocations": [
        {
          "name": "Mangy Duskbat",
          "level": "10–11",
          "minLevel": 10,
          "maxLevel": 11,
          "zone": "Tirisfal Glades",
          "subzone": "Northern woods & Garren's Haunt",
          "speed": "2.0s",
          "faction": "Horde",
          "teaches": "Bite 1",
          "notes": "Earliest Horde bat tame at level 10"
        },
        {
          "name": "Dread Flyer",
          "level": "12–13",
          "minLevel": 12,
          "maxLevel": 13,
          "zone": "Silverpine Forest",
          "subzone": "Along the northern road",
          "speed": "2.0s",
          "faction": "Horde",
          "teaches": "Bite 2",
          "notes": "Teaches Bite Rank 2"
        },
        {
          "name": "Resonating Bat",
          "level": "18–20",
          "minLevel": 18,
          "maxLevel": 20,
          "zone": "Wailing Caverns / Hillsbrad",
          "subzone": "Caverns entrance & Durnholde foothills",
          "speed": "2.0s",
          "faction": "Contested",
          "teaches": "Sonic Blast 1, Bite 3",
          "notes": "Teaches Sonic Blast Rank 1"
        },
        {
          "name": "Roosting Duskbat",
          "level": "22–24",
          "minLevel": 22,
          "maxLevel": 24,
          "zone": "Riverglades",
          "subzone": "High tree canopies",
          "speed": "2.0s",
          "faction": "Contested",
          "teaches": "Sonic Blast 2",
          "notes": "✦ Forever new Riverglades spawn"
        },
        {
          "name": "Vile Bat",
          "level": "32–34",
          "minLevel": 32,
          "maxLevel": 34,
          "zone": "Stranglethorn Vale",
          "subzone": "Ruins of Zul'Kunda & Kurzen jungle",
          "speed": "2.0s",
          "faction": "Contested",
          "teaches": "Sonic Blast 3, Dive 1",
          "notes": "Teaches Dive 1 & Sonic Blast 3"
        },
        {
          "name": "Guano-Covered Bat",
          "level": "42–44",
          "minLevel": 42,
          "maxLevel": 44,
          "zone": "Zul'Farrak / Feralas",
          "subzone": "Ruins of Isildien & ZF interior",
          "speed": "2.0s",
          "faction": "Contested",
          "teaches": "Sonic Blast 4, Dive 2",
          "notes": "Mid-40s progression tame"
        },
        {
          "name": "Dreadbeak",
          "level": "50–52",
          "minLevel": 50,
          "maxLevel": 52,
          "zone": "Eastern Plaguelands",
          "subzone": "Noxious Glade & Zul'Mashar",
          "speed": "2.0s",
          "faction": "Contested",
          "teaches": "Sonic Blast 5, Dive 3",
          "notes": "Highest rank Sonic Blast"
        }
      ]
    },
    {
      "id": "bear",
      "name": "Bear",
      "icon": "https://foreverchanges.pro/icon/ability_hunter_pet_bear.jpg",
      "damageMod": "-9%",
      "armorMod": "+5%",
      "healthMod": "+8%",
      "diet": [
        "Meat",
        "Fish",
        "Cheese",
        "Bread",
        "Fungus",
        "Fruit"
      ],
      "fastestTame": "1.60s (Mystmane, Mulgore / Zephras)",
      "abilities": [
        "Swipe (Rank 1-5)",
        "Dash (Rank 1-3)",
        "Bite (Rank 1-8)",
        "Claw (Rank 1-8)"
      ],
      "newAbility": {
        "name": "Swipe & Dash",
        "badge": "✦ New in Forever",
        "icon": "https://foreverchanges.pro/icon/inv_misc_monsterclaw_03.jpg",
        "cost": "20 Focus",
        "cd": "5 sec CD",
        "desc": "Swipe swipes 3 nearby enemies for cleave damage every 5 seconds. Bears also learn Dash for rapid target closing."
      },
      "highlight": "Unmatched multi-target tank; Swipe cleaves 3 targets and holds dungeon pack agro.",
      "tameLocations": [
        {
          "name": "Young Forest Bear",
          "level": "8–9",
          "minLevel": 8,
          "maxLevel": 9,
          "zone": "Elwynn Forest",
          "subzone": "Eastvale Logging Camp",
          "speed": "2.0s",
          "faction": "Alliance",
          "teaches": "Claw 2",
          "notes": "Alliance starter bear"
        },
        {
          "name": "Dun Morogh Black Bear",
          "level": "10–12",
          "minLevel": 10,
          "maxLevel": 12,
          "zone": "Dun Morogh",
          "subzone": "Ironband's Compound & Gol'Bolar",
          "speed": "2.0s",
          "faction": "Alliance",
          "teaches": "Claw 2, Swipe 1",
          "notes": "Immediate level 10 Dwarf/Gnome tame"
        },
        {
          "name": "Black Bear Patriarch",
          "level": "16–17",
          "minLevel": 16,
          "maxLevel": 17,
          "zone": "Loch Modan",
          "subzone": "The Farstrider Lodge perimeter",
          "speed": "2.0s",
          "faction": "Alliance",
          "teaches": "Claw 3, Swipe 1",
          "notes": "Teaches Claw 3"
        },
        {
          "name": "Mystmane",
          "level": "16",
          "minLevel": 16,
          "maxLevel": 16,
          "zone": "Mulgore / Zephras Isle",
          "subzone": "Shadowgale Forest (Rare)",
          "speed": "1.6s",
          "isFast": true,
          "faction": "Contested",
          "teaches": "Swipe 1, Claw 3, Savage Rend",
          "notes": "⚡ Fastest Bear in the Game (1.6s swing speed!)"
        },
        {
          "name": "Ol' Sooty",
          "level": "20",
          "minLevel": 20,
          "maxLevel": 20,
          "zone": "Loch Modan",
          "subzone": "Grizzled Den cave (Rare)",
          "speed": "2.0s",
          "faction": "Alliance",
          "teaches": "Swipe 1, Bite 3",
          "notes": "Named quest rare with high stamina"
        },
        {
          "name": "Ashenvale Bear",
          "level": "21–22",
          "minLevel": 21,
          "maxLevel": 22,
          "zone": "Ashenvale",
          "subzone": "Mystral Lake and Raynewood",
          "speed": "2.0s",
          "faction": "Contested",
          "teaches": "Swipe 1",
          "notes": "Great level 20+ tank"
        },
        {
          "name": "Elder Ashenvale Bear",
          "level": "25–26",
          "minLevel": 25,
          "maxLevel": 26,
          "zone": "Ashenvale",
          "subzone": "Silverwind Refuge",
          "speed": "2.0s",
          "faction": "Contested",
          "teaches": "Swipe 2, Claw 4",
          "notes": "Teaches Claw 4 & Swipe 2"
        },
        {
          "name": "Gray Bear",
          "level": "30–31",
          "minLevel": 30,
          "maxLevel": 31,
          "zone": "Hillsbrad Foothills",
          "subzone": "Hillsbrad plateau near Durnholde",
          "speed": "2.0s",
          "faction": "Contested",
          "teaches": "Swipe 2, Dash 1",
          "notes": "Teaches Dash Rank 1 in Forever"
        },
        {
          "name": "Ironfur Patriarch",
          "level": "48–49",
          "minLevel": 48,
          "maxLevel": 49,
          "zone": "Feralas",
          "subzone": "Grimtotem Post & Feralas wilds",
          "speed": "2.0s",
          "faction": "Contested",
          "teaches": "Claw 7, Swipe 4, Dash 2",
          "notes": "Teaches Claw 7 & Dash 2"
        },
        {
          "name": "Elder Shardtooth",
          "level": "57–58",
          "minLevel": 57,
          "maxLevel": 58,
          "zone": "Winterspring",
          "subzone": "Owl Wing Thicket perimeter",
          "speed": "2.0s",
          "faction": "Contested",
          "teaches": "Claw 8, Swipe 5",
          "notes": "Teaches Claw 8 & max Swipe"
        }
      ]
    },
    {
      "id": "bird-of-prey",
      "name": "Bird of Prey",
      "icon": "https://foreverchanges.pro/icon/ability_hunter_pet_owl.jpg",
      "damageMod": "+7%",
      "armorMod": "0%",
      "healthMod": "0%",
      "diet": [
        "Meat"
      ],
      "abilities": [
        "Mine! (Rank 1-5)",
        "Dive (Rank 1-3)",
        "Claw (Rank 1-8)"
      ],
      "newAbility": {
        "name": "Mine!",
        "badge": "✦ New in Forever",
        "icon": "https://foreverchanges.pro/icon/spell_nature_natureswrath.jpg",
        "cost": "20 Focus",
        "cd": "1 min CD",
        "desc": "Grabs an enemy's weapon with its talons, causing 20 to 24 damage and physically disarming them for 4 sec."
      },
      "highlight": "Disarm specialist; strips melee weapons from warriors and rogues to neutralize burst.",
      "tameLocations": [
        {
          "name": "Strigid Hunter",
          "level": "8–9",
          "minLevel": 8,
          "maxLevel": 9,
          "zone": "Teldrassil",
          "subzone": "Dolanaar outskirts",
          "speed": "2.0s",
          "faction": "Alliance",
          "teaches": "Claw 2",
          "notes": "Night Elf starter owl"
        },
        {
          "name": "Strigid Screecher",
          "level": "10–11",
          "minLevel": 10,
          "maxLevel": 11,
          "zone": "Teldrassil",
          "subzone": "Starbreeze Village perimeter",
          "speed": "2.0s",
          "faction": "Alliance",
          "teaches": "Mine! 1, Claw 2",
          "notes": "Immediate level 10 Alliance owl"
        },
        {
          "name": "Nightscreech",
          "level": "10",
          "minLevel": 10,
          "maxLevel": 10,
          "zone": "Teldrassil",
          "subzone": "Across from leatherworking trainer (Rare)",
          "speed": "2.0s",
          "faction": "Alliance",
          "teaches": "Mine! 1",
          "notes": "✦ Rare Hellhoot owl model in Forever"
        },
        {
          "name": "Jai'vhanel",
          "level": "12",
          "minLevel": 12,
          "maxLevel": 12,
          "zone": "Darkshore",
          "subzone": "Cliffside near Auberdine (2m respawn)",
          "speed": "2.0s",
          "faction": "Alliance",
          "teaches": "Mine! 1, Claw 2",
          "notes": "✦ Unique pure black owl model"
        },
        {
          "name": "Greater Fleshripper",
          "level": "16–17",
          "minLevel": 16,
          "maxLevel": 17,
          "zone": "Westfall",
          "subzone": "Sentinel Hill & coastline",
          "speed": "2.0s",
          "faction": "Alliance",
          "teaches": "Mine! 1",
          "notes": "Early Alliance utility pet"
        },
        {
          "name": "Shadowgale Shrieker",
          "level": "22–24",
          "minLevel": 22,
          "maxLevel": 24,
          "zone": "Zephras Isle",
          "subzone": "Shadowgale Peaks",
          "speed": "2.0s",
          "faction": "Contested",
          "teaches": "Mine! 2",
          "notes": "✦ Forever new island tame"
        },
        {
          "name": "Ironbeak Hunter",
          "level": "50–51",
          "minLevel": 50,
          "maxLevel": 51,
          "zone": "Felwood",
          "subzone": "Irontree Woods & Ruins of Constellas",
          "speed": "2.0s",
          "faction": "Contested",
          "teaches": "Dive 3, Mine! 5",
          "notes": "Teaches Dive 3"
        },
        {
          "name": "Olm the Wise",
          "level": "52",
          "minLevel": 52,
          "maxLevel": 52,
          "zone": "Felwood",
          "subzone": "South of Irontree Woods (Rare)",
          "speed": "2.0s",
          "faction": "Contested",
          "teaches": "Dive 3, Mine! 5",
          "notes": "Legendary translucent white owl model"
        },
        {
          "name": "Winterspring Screecher",
          "level": "57–59",
          "minLevel": 57,
          "maxLevel": 59,
          "zone": "Winterspring",
          "subzone": "Owl Wing Thicket & Mazthoril",
          "speed": "2.0s",
          "faction": "Contested",
          "teaches": "Claw 8, Mine! 5",
          "notes": "Teaches Claw 8"
        }
      ]
    },
    {
      "id": "boar",
      "name": "Boar",
      "icon": "https://foreverchanges.pro/icon/ability_hunter_pet_boar.jpg",
      "damageMod": "-10%",
      "armorMod": "+9%",
      "healthMod": "+4%",
      "diet": [
        "Meat",
        "Fish",
        "Cheese",
        "Bread",
        "Fungus",
        "Fruit"
      ],
      "abilities": [
        "Charge (Rank 1-6)",
        "Dash (Rank 1-3)",
        "Bite (Rank 1-8)"
      ],
      "newAbility": {
        "name": "Charge Rework",
        "badge": "✦ Changed in Forever",
        "icon": "https://foreverchanges.pro/icon/ability_hunter_pet_boar.jpg",
        "cost": "35 Focus",
        "cd": "25 sec CD",
        "desc": "Charges an enemy, immobilizes it for 1 sec, and adds up to +204 melee attack power (Rank 3) to the boar's next attack."
      },
      "highlight": "Omnivorous levelling king; eats anything, root-charges targets, and has high natural armor.",
      "tameLocations": [
        {
          "name": "Mottled Boar",
          "level": "1–2",
          "minLevel": 1,
          "maxLevel": 2,
          "zone": "Durotar",
          "subzone": "Valley of Trials",
          "speed": "2.0s",
          "faction": "Horde",
          "teaches": "Charge 1",
          "notes": "Orc/Troll starter boar"
        },
        {
          "name": "Small Crag Boar",
          "level": "3",
          "minLevel": 3,
          "maxLevel": 3,
          "zone": "Dun Morogh",
          "subzone": "Coldridge Valley",
          "speed": "2.0s",
          "faction": "Alliance",
          "teaches": "Charge 1",
          "notes": "Dwarf starter boar"
        },
        {
          "name": "Battleboar",
          "level": "3–4",
          "minLevel": 3,
          "maxLevel": 4,
          "zone": "Mulgore",
          "subzone": "Camp Narache",
          "speed": "2.0s",
          "faction": "Horde",
          "teaches": "Charge 1",
          "notes": "Tauren starter boar"
        },
        {
          "name": "Stonetusk Boar",
          "level": "5–6",
          "minLevel": 5,
          "maxLevel": 6,
          "zone": "Elwynn Forest",
          "subzone": "Northshire Valley",
          "speed": "2.0s",
          "faction": "Alliance",
          "teaches": "Charge 1",
          "notes": "Human starter boar"
        },
        {
          "name": "Crag Boar",
          "level": "10–11",
          "minLevel": 10,
          "maxLevel": 11,
          "zone": "Loch Modan",
          "subzone": "The Loch shoreline",
          "speed": "2.0s",
          "faction": "Alliance",
          "teaches": "Charge 1",
          "notes": "Immediate level 10 tame"
        },
        {
          "name": "Young Goretusk",
          "level": "12–13",
          "minLevel": 12,
          "maxLevel": 13,
          "zone": "Westfall",
          "subzone": "Furlbrow's Pumpkin Farm",
          "speed": "2.0s",
          "faction": "Alliance",
          "teaches": "Charge 2",
          "notes": "Teaches Charge Rank 2"
        },
        {
          "name": "Goretusk",
          "level": "14–15",
          "minLevel": 14,
          "maxLevel": 15,
          "zone": "Westfall",
          "subzone": "Saldean's Farm & Sentinel Hill",
          "speed": "2.0s",
          "faction": "Alliance",
          "teaches": "Charge 2",
          "notes": "Teaches Charge Rank 2"
        },
        {
          "name": "Bellygrub",
          "level": "24",
          "minLevel": 24,
          "maxLevel": 24,
          "zone": "Redridge Mountains",
          "subzone": "Lakeridge Highway (Rare)",
          "speed": "2.0s",
          "faction": "Alliance",
          "teaches": "Charge 3",
          "notes": "Teaches Charge Rank 3 (+204 AP)"
        },
        {
          "name": "Raging Agam'ar",
          "level": "24–25",
          "minLevel": 24,
          "maxLevel": 25,
          "zone": "Razorfen Kraul",
          "subzone": "Dungeon entrance & exterior",
          "speed": "2.0s",
          "faction": "Contested",
          "teaches": "Charge 3",
          "notes": "Teaches Charge Rank 3"
        },
        {
          "name": "Grunter",
          "level": "50",
          "minLevel": 50,
          "maxLevel": 50,
          "zone": "Blasted Lands",
          "subzone": "Altar of Storms road (Rare)",
          "speed": "2.0s",
          "faction": "Contested",
          "teaches": "Charge 5, Dash 3",
          "notes": "Teaches Charge 5 & Dash 3"
        },
        {
          "name": "Plagued Swine",
          "level": "60",
          "minLevel": 60,
          "maxLevel": 60,
          "zone": "Eastern Plaguelands",
          "subzone": "Corin's Crossing & pestilent plains",
          "speed": "2.0s",
          "faction": "Contested",
          "teaches": "Charge 6",
          "notes": "Max Rank Charge 6 (+490 AP)"
        }
      ]
    },
    {
      "id": "carrion-bird",
      "name": "Carrion Bird",
      "icon": "https://foreverchanges.pro/icon/ability_hunter_pet_vulture.jpg",
      "damageMod": "0%",
      "armorMod": "+5%",
      "healthMod": "0%",
      "diet": [
        "Meat",
        "Fish"
      ],
      "fastestTame": "1.20s (Spiteflayer Lvl 52, Blasted Lands)",
      "abilities": [
        "Demoralizing Screech (Rank 1-4)",
        "Dive (Rank 1-3)",
        "Bite (Rank 1-8)",
        "Claw (Rank 1-8)"
      ],
      "newAbility": {
        "name": "Demoralizing Screech",
        "badge": "✦ Changed in Forever",
        "icon": "https://foreverchanges.pro/icon/ability_hunter_pet_vulture.jpg",
        "cost": "20 Focus",
        "cd": "10 sec CD",
        "desc": "Blasts an enemy for damage and lowers the melee attack power of all enemies in melee range by 111 (Rank 2) for 30 sec."
      },
      "highlight": "AoE debuff utility; Screech reduces entire monster packs' melee damage by 111 AP.",
      "tameLocations": [
        {
          "name": "Greater Fleshripper",
          "level": "16–17",
          "minLevel": 16,
          "maxLevel": 17,
          "zone": "Westfall",
          "subzone": "Dagger Hills & Moonbrook road",
          "speed": "2.0s",
          "faction": "Alliance",
          "teaches": "Demoralizing Screech 1",
          "notes": "Teaches Demoralizing Screech 1 (-63 AP)"
        },
        {
          "name": "Salt Flats Vulture",
          "level": "32–34",
          "minLevel": 32,
          "maxLevel": 34,
          "zone": "Thousand Needles",
          "subzone": "Shimmering Flats race track",
          "speed": "2.0s",
          "faction": "Contested",
          "teaches": "Demoralizing Screech 2",
          "notes": "Teaches Demoralizing Screech 2 (-111 AP)"
        },
        {
          "name": "Young Mesa Buzzard",
          "level": "31–32",
          "minLevel": 31,
          "maxLevel": 32,
          "zone": "Arathi Highlands",
          "subzone": "Witherbark Village & Northfold Manor",
          "speed": "2.0s",
          "faction": "Contested",
          "teaches": "Dive 1",
          "notes": "Teaches Dive Rank 1"
        },
        {
          "name": "Mesa Buzzard",
          "level": "34–35",
          "minLevel": 34,
          "maxLevel": 35,
          "zone": "Arathi Highlands",
          "subzone": "Boulderfist Hall hills",
          "speed": "2.0s",
          "faction": "Contested",
          "teaches": "Dive 1",
          "notes": "Teaches Dive Rank 1"
        },
        {
          "name": "Roc",
          "level": "41–43",
          "minLevel": 41,
          "maxLevel": 43,
          "zone": "Tanaris",
          "subzone": "Noonshade Ruins & desert dunes",
          "speed": "2.0s",
          "faction": "Contested",
          "teaches": "Dive 2",
          "notes": "Teaches Dive Rank 2"
        },
        {
          "name": "Carrion Vulture",
          "level": "50–52",
          "minLevel": 50,
          "maxLevel": 52,
          "zone": "Western Plaguelands",
          "subzone": "Sorrow Hill & The Writhing Haunt",
          "speed": "2.0s",
          "faction": "Contested",
          "teaches": "Dive 3",
          "notes": "Teaches Dive Rank 3"
        },
        {
          "name": "Spiteflayer",
          "level": "52",
          "minLevel": 52,
          "maxLevel": 52,
          "zone": "Blasted Lands",
          "subzone": "Red Reaches canyon (Rare)",
          "speed": "1.2s",
          "isFast": true,
          "faction": "Contested",
          "teaches": "Dive 3, Screech 3",
          "notes": "⚡ Fastest Carrion Bird in the Game (1.2s swing speed!)"
        },
        {
          "name": "Zaricotl",
          "level": "55",
          "minLevel": 55,
          "maxLevel": 55,
          "zone": "Badlands",
          "subzone": "Dustbowl cliffs (Rare)",
          "speed": "2.0s",
          "faction": "Contested",
          "teaches": "Demoralizing Screech 3",
          "notes": "Legendary fiery bird model"
        }
      ]
    },
    {
      "id": "cat",
      "name": "Cat",
      "icon": "https://foreverchanges.pro/icon/ability_hunter_pet_cat.jpg",
      "damageMod": "+10%",
      "armorMod": "0%",
      "healthMod": "-2%",
      "diet": [
        "Meat",
        "Fish"
      ],
      "fastestTame": "1.00s (Broken Tooth Lvl 37) • 1.20s (The Rake Lvl 10) • 1.30s (Humar Lvl 23)",
      "abilities": [
        "Prowl (Rank 1-3)",
        "Dash (Rank 1-3)",
        "Bite (Rank 1-8)",
        "Claw (Rank 1-8)"
      ],
      "newAbility": {
        "name": "Prowl & Lethal Speed",
        "badge": "Verified Classic+",
        "icon": "https://foreverchanges.pro/icon/ability_druid_supriseattack.jpg",
        "cost": "40 Focus",
        "cd": "10 sec CD",
        "desc": "Stealth ambush with +50% opener damage bonus. Broken Tooth's 1.0s swing speed inflicts severe spell-pushback."
      },
      "highlight": "Maximum single-target damage output; essential for Marksmanship & BM raid DPS.",
      "tameLocations": [
        {
          "name": "The Rake",
          "level": "10",
          "minLevel": 10,
          "maxLevel": 10,
          "zone": "Mulgore",
          "subzone": "North of Bloodhoof Village near 45, 16 (Rare)",
          "speed": "1.2s",
          "isFast": true,
          "faction": "Horde",
          "teaches": "Claw 2",
          "notes": "⚡ Fastest Early Tame in Game! 1.2s swing speed at level 10"
        },
        {
          "name": "Ghostfang",
          "level": "10",
          "minLevel": 10,
          "maxLevel": 10,
          "zone": "Dun Morogh",
          "subzone": "Near Wetlands tunnel: 74, 64 & 80, 46 (Rare)",
          "speed": "2.0s",
          "faction": "Alliance",
          "teaches": "Claw 2",
          "notes": "✦ Rare Blue Lynx Model added in Forever (30m respawn)"
        },
        {
          "name": "Savannah Huntress",
          "level": "11–12",
          "minLevel": 11,
          "maxLevel": 12,
          "zone": "The Barrens",
          "subzone": "Crossroads perimeter",
          "speed": "1.3s",
          "isFast": true,
          "faction": "Horde",
          "teaches": "Bite 2",
          "notes": "⚡ Very fast 1.3s attack speed, ubiquitous in Barrens"
        },
        {
          "name": "Dishu",
          "level": "13",
          "minLevel": 13,
          "maxLevel": 13,
          "zone": "The Barrens",
          "subzone": "South of Crossroads near 48, 41 (Rare)",
          "speed": "1.3s",
          "isFast": true,
          "faction": "Horde",
          "teaches": "Bite 2",
          "notes": "⚡ Rare spotted cheetah with 1.3s swing speed"
        },
        {
          "name": "Feral Mountain Lion",
          "level": "18–19",
          "minLevel": 18,
          "maxLevel": 19,
          "zone": "Hillsbrad Foothills",
          "subzone": "Tarren Mill foothills",
          "speed": "1.3s",
          "isFast": true,
          "faction": "Contested",
          "teaches": "Bite 3",
          "notes": "⚡ 1.3s attack speed mountain cat"
        },
        {
          "name": "Humar the Pridelord",
          "level": "23",
          "minLevel": 23,
          "maxLevel": 23,
          "zone": "The Barrens",
          "subzone": "Under the large tree north of Ratchet (62, 32)",
          "speed": "1.3s",
          "isFast": true,
          "faction": "Horde",
          "teaches": "Bite 4",
          "notes": "⚡ Legendary pitch-black mane lion, 1.3s swing speed"
        },
        {
          "name": "Mountain Lion",
          "level": "32–33",
          "minLevel": 32,
          "maxLevel": 33,
          "zone": "Alterac Mountains",
          "subzone": "Sofera's Naze & Growless Cave",
          "speed": "1.3s",
          "isFast": true,
          "faction": "Contested",
          "teaches": "Prowl 1",
          "notes": "Teaches Prowl Rank 1 & 1.3s speed"
        },
        {
          "name": "Swamp Jaguar",
          "level": "36–37",
          "minLevel": 36,
          "maxLevel": 37,
          "zone": "Swamp of Sorrows",
          "subzone": "Misty Reed Strand",
          "speed": "1.2s",
          "isFast": true,
          "faction": "Contested",
          "teaches": "Claw 5",
          "notes": "⚡ Rare fast 1.2s swing speed jaguar"
        },
        {
          "name": "Broken Tooth",
          "level": "37",
          "minLevel": 37,
          "maxLevel": 37,
          "zone": "Badlands",
          "subzone": "South of Lethlor Ravine / Angor Fortress (Rare)",
          "speed": "1.0s",
          "isFast": true,
          "faction": "Contested",
          "teaches": "Claw 5",
          "notes": "⚡ FASTEST ATTACK SPEED IN ENTIRE GAME (1.00s)! The Holy Grail for PvP pushback"
        },
        {
          "name": "Shadow Panther",
          "level": "39–40",
          "minLevel": 39,
          "maxLevel": 40,
          "zone": "Stranglethorn Vale",
          "subzone": "Rebel Camp & Lake Nazferiti",
          "speed": "1.5s",
          "isFast": true,
          "faction": "Contested",
          "teaches": "Prowl 2, Dash 2",
          "notes": "Teaches Prowl 2 & Dash 2"
        },
        {
          "name": "King Bangalash",
          "level": "43",
          "minLevel": 43,
          "maxLevel": 43,
          "zone": "Stranglethorn Vale",
          "subzone": "Panther island near 38, 35 (Elite)",
          "speed": "1.4s",
          "isFast": true,
          "faction": "Contested",
          "teaches": "Claw 6, Dash 2",
          "notes": "⚡ Iconic white tiger boss, 1.4s attack speed"
        },
        {
          "name": "Frostsaber Stalker",
          "level": "59–60",
          "minLevel": 59,
          "maxLevel": 60,
          "zone": "Winterspring",
          "subzone": "Frostsaber Rock",
          "speed": "1.5s",
          "isFast": true,
          "faction": "Contested",
          "teaches": "Prowl 3, Claw 8",
          "notes": "Teaches Prowl Rank 3 (+50% opener damage)"
        }
      ]
    },
    {
      "id": "crab",
      "name": "Crab",
      "icon": "https://foreverchanges.pro/icon/ability_hunter_pet_crab.jpg",
      "damageMod": "-5%",
      "armorMod": "+13%",
      "healthMod": "-4%",
      "diet": [
        "Fish",
        "Bread",
        "Fungus",
        "Fruit"
      ],
      "abilities": [
        "Pinch (Rank 1-5)",
        "Dash (Rank 1-3)",
        "Claw (Rank 1-8)"
      ],
      "newAbility": {
        "name": "Pinch & Dash",
        "badge": "✦ New in Forever",
        "icon": "https://foreverchanges.pro/icon/ability_hunter_pet_crab.jpg",
        "cost": "50 Focus",
        "cd": "30 sec CD",
        "desc": "Pinches enemy legs for 32 to 36 damage (Rank 2) and reduces movement speed by 50% for 9 sec."
      },
      "highlight": "Massive +13% armor rating combined with an on-demand 50% hamstring pin.",
      "tameLocations": [
        {
          "name": "Pygmy Surf Crawler",
          "level": "5–6",
          "minLevel": 5,
          "maxLevel": 6,
          "zone": "Durotar",
          "subzone": "Scuttle Rock & Sen'jin Village coast",
          "speed": "2.0s",
          "faction": "Horde",
          "teaches": "Claw 1",
          "notes": "Troll/Orc starter crab"
        },
        {
          "name": "Shore Crawler",
          "level": "9–10",
          "minLevel": 9,
          "maxLevel": 10,
          "zone": "Westfall",
          "subzone": "Longshore beach",
          "speed": "2.0s",
          "faction": "Alliance",
          "teaches": "Claw 2",
          "notes": "Alliance level 10 starter crab"
        },
        {
          "name": "Pygmy Tide Crawler",
          "level": "10–11",
          "minLevel": 10,
          "maxLevel": 11,
          "zone": "Darkshore",
          "subzone": "Auberdine coastline",
          "speed": "2.0s",
          "faction": "Alliance",
          "teaches": "Pinch 1, Claw 2",
          "notes": "Teaches Pinch Rank 1 in Forever"
        },
        {
          "name": "Corrupted Surf Crawler",
          "level": "19–20",
          "minLevel": 19,
          "maxLevel": 20,
          "zone": "Darkshore",
          "subzone": "Ruins of Mathystra coast",
          "speed": "2.0s",
          "faction": "Alliance",
          "teaches": "Pinch 1, Claw 3",
          "notes": "Alliance progression tank"
        },
        {
          "name": "Scorpashi Snapper",
          "level": "30–31",
          "minLevel": 30,
          "maxLevel": 31,
          "zone": "Desolace",
          "subzone": "Sar'theris Strand",
          "speed": "2.0s",
          "faction": "Contested",
          "teaches": "Pinch 2, Claw 4, Dash 1",
          "notes": "Teaches Pinch 2 & Dash 1"
        },
        {
          "name": "Silt Crawler",
          "level": "40–41",
          "minLevel": 40,
          "maxLevel": 41,
          "zone": "Swamp of Sorrows",
          "subzone": "The Shifting Mire coast",
          "speed": "2.0s",
          "faction": "Contested",
          "teaches": "Pinch 3, Claw 6, Dash 2",
          "notes": "Teaches Claw 6 & Dash 2"
        },
        {
          "name": "Clack the Reaver",
          "level": "46",
          "minLevel": 46,
          "maxLevel": 46,
          "zone": "Blasted Lands",
          "subzone": "Coastal cliffs (Rare)",
          "speed": "2.0s",
          "faction": "Contested",
          "teaches": "Pinch 4, Claw 7",
          "notes": "Rare giant crab"
        },
        {
          "name": "Methuselah Crab",
          "level": "50–52",
          "minLevel": 50,
          "maxLevel": 52,
          "zone": "Azshara / Zephras Isle",
          "subzone": "Tide pools",
          "speed": "2.0s",
          "faction": "Contested",
          "teaches": "Pinch 4, Dash 3",
          "notes": "Endgame high-armor pin tank"
        }
      ]
    },
    {
      "id": "crocolisk",
      "name": "Crocolisk",
      "icon": "https://foreverchanges.pro/icon/ability_hunter_pet_crocolisk.jpg",
      "damageMod": "0%",
      "armorMod": "+10%",
      "healthMod": "-5%",
      "diet": [
        "Meat",
        "Fish"
      ],
      "abilities": [
        "Dismember (Rank 1-5)",
        "Dash (Rank 1-3)",
        "Bite (Rank 1-8)"
      ],
      "newAbility": {
        "name": "Dismember (Mortal Strike)",
        "badge": "✦ New in Forever",
        "icon": "https://foreverchanges.pro/icon/ability_hunter_pet_crocolisk.jpg",
        "cost": "35 Focus",
        "cd": "6 sec CD",
        "desc": "Viciously bites enemy appendages, reducing healing effectiveness by 50% for 10 sec on a 6-second cooldown."
      },
      "highlight": "PvP meta-definer; keeps 100% uptime on 50% healing reduction without requiring an Arms warrior.",
      "tameLocations": [
        {
          "name": "River Crocolisk",
          "level": "11–12",
          "minLevel": 11,
          "maxLevel": 12,
          "zone": "Loch Modan",
          "subzone": "Valley of Kings & The Loch",
          "speed": "2.0s",
          "faction": "Alliance",
          "teaches": "Dismember 1, Bite 2",
          "notes": "Alliance starter croc; teaches Dismember 1"
        },
        {
          "name": "Saltwater Crocolisk",
          "level": "15–16",
          "minLevel": 15,
          "maxLevel": 16,
          "zone": "The Barrens",
          "subzone": "The Sludge Fen & Dreadmist Peak",
          "speed": "2.0s",
          "faction": "Horde",
          "teaches": "Dismember 1, Bite 2",
          "notes": "Horde early croc tame"
        },
        {
          "name": "Logsplit Crocolisk",
          "level": "20–22",
          "minLevel": 20,
          "maxLevel": 22,
          "zone": "Wetlands",
          "subzone": "Greenwarden's Grove wetlands",
          "speed": "2.0s",
          "faction": "Alliance",
          "teaches": "Dismember 1, Bite 3",
          "notes": "Alliance level 20 progression tame"
        },
        {
          "name": "Drywallow Crocolisk",
          "level": "35–36",
          "minLevel": 35,
          "maxLevel": 36,
          "zone": "Dustwallow Marsh",
          "subzone": "Witch Hill & Wyrmbog",
          "speed": "2.0s",
          "faction": "Contested",
          "teaches": "Dismember 2, Bite 5, Dash 1",
          "notes": "Teaches Dismember Rank 2 & Dash 1"
        },
        {
          "name": "Ripscale",
          "level": "39",
          "minLevel": 39,
          "maxLevel": 39,
          "zone": "Dustwallow Marsh",
          "subzone": "Near Mudsprocket (Rare)",
          "speed": "2.0s",
          "faction": "Contested",
          "teaches": "Dismember 3, Bite 6",
          "notes": "Teaches Bite Rank 6 & Dismember 3"
        },
        {
          "name": "Sewer Beast",
          "level": "50",
          "minLevel": 50,
          "maxLevel": 50,
          "zone": "Stormwind City",
          "subzone": "Canals outside Dwarven District (Rare)",
          "speed": "2.0s",
          "faction": "Alliance",
          "teaches": "Dismember 4, Bite 7",
          "notes": "Legendary white crocolisk inside Stormwind!"
        }
      ]
    },
    {
      "id": "fox",
      "name": "Fox",
      "icon": "https://foreverchanges.pro/icon/ability_hunter_aspectofthefox.jpg",
      "damageMod": "0%",
      "armorMod": "+5%",
      "healthMod": "0%",
      "diet": [
        "Meat"
      ],
      "fastestTame": "Vuldren Alpha Lvl 10 (Zephras Isle)",
      "abilities": [
        "Trickster's Dance (Rank 1)",
        "Dash (Rank 1-3)",
        "Bite (Rank 1-8)"
      ],
      "newAbility": {
        "name": "Trickster's Dance",
        "badge": "✦ Brand New Family",
        "icon": "https://foreverchanges.pro/icon/ability_hunter_aspectofthefox.jpg",
        "cost": "10 Focus",
        "cd": "3 min CD",
        "desc": "Increases pet's chance to Dodge by 50% and decreases attack intervals by 30% for 12 sec."
      },
      "highlight": "Brand new pet family added to WoW Forever! Extreme defensive evasion and rapid burst attacks.",
      "tameLocations": [
        {
          "name": "Juvenile Vuldren",
          "level": "1",
          "minLevel": 1,
          "maxLevel": 1,
          "zone": "Zephras Isle",
          "subzone": "Starter Glade",
          "speed": "2.0s",
          "faction": "Contested",
          "teaches": "Bite 1",
          "notes": "✦ Brand new Fox family in WoW Forever"
        },
        {
          "name": "Vuldren",
          "level": "6",
          "minLevel": 6,
          "maxLevel": 6,
          "zone": "Zephras Isle",
          "subzone": "Lowland Meadows",
          "speed": "2.0s",
          "faction": "Contested",
          "teaches": "Bite 1",
          "notes": "New fox model"
        },
        {
          "name": "Vuldren Alpha",
          "level": "10",
          "minLevel": 10,
          "maxLevel": 10,
          "zone": "Zephras Isle",
          "subzone": "Shadowgale Ridge",
          "speed": "2.0s",
          "faction": "Contested",
          "teaches": "Bite 2, Dash 1",
          "notes": "✦ Rare pale coat fox model at level 10"
        },
        {
          "name": "Redridge Fox Kits / Vulpin",
          "level": "14–16",
          "minLevel": 14,
          "maxLevel": 16,
          "zone": "Redridge Mountains",
          "subzone": "Alther's Mill & Three Corners",
          "speed": "2.0s",
          "faction": "Alliance",
          "teaches": "Bite 3",
          "notes": "Alliance early fox tame"
        },
        {
          "name": "Silverpine Fox",
          "level": "15–17",
          "minLevel": 15,
          "maxLevel": 17,
          "zone": "Silverpine Forest",
          "subzone": "The Skittering Dark hills",
          "speed": "2.0s",
          "faction": "Horde",
          "teaches": "Bite 3",
          "notes": "Horde early fox tame"
        },
        {
          "name": "Vuldren Stalker",
          "level": "20–22",
          "minLevel": 20,
          "maxLevel": 22,
          "zone": "Zephras Isle",
          "subzone": "Highland crags",
          "speed": "2.0s",
          "faction": "Contested",
          "teaches": "Trickster's Dance 1, Bite 3, Dash 1",
          "notes": "Teaches Trickster's Dance Rank 1 (50% Dodge, -30% interval)"
        },
        {
          "name": "Highland Vulpin",
          "level": "30–32",
          "minLevel": 30,
          "maxLevel": 32,
          "zone": "Arathi Highlands",
          "subzone": "Go'Shek Farm outskirts",
          "speed": "2.0s",
          "faction": "Contested",
          "teaches": "Trickster's Dance 1, Bite 5, Dash 1",
          "notes": "Mid-level contested fox"
        }
      ]
    },
    {
      "id": "gorilla",
      "name": "Gorilla",
      "icon": "https://foreverchanges.pro/icon/ability_hunter_pet_gorilla.jpg",
      "damageMod": "+2%",
      "armorMod": "0%",
      "healthMod": "+4%",
      "diet": [
        "Fungus",
        "Fruit"
      ],
      "abilities": [
        "Thunderstomp (Rank 1-4)",
        "Dash (Rank 1-3)",
        "Bite (Rank 1-8)"
      ],
      "newAbility": {
        "name": "Thunderstomp Rework",
        "badge": "✦ Changed in Forever",
        "icon": "https://foreverchanges.pro/icon/ability_hunter_pet_gorilla.jpg",
        "cost": "60 Focus",
        "cd": "1 min CD",
        "desc": "Shakes the ground with thundering force, dealing 53 to 61 Nature damage to all enemies within 8 yards."
      },
      "highlight": "Area-of-effect threat burst; synergizes with Hunter traps and multi-pull dungeons.",
      "tameLocations": [
        {
          "name": "Groddoc Ape",
          "level": "30–32",
          "minLevel": 30,
          "maxLevel": 32,
          "zone": "Stranglethorn Vale",
          "subzone": "Crystalvein Mine & Kurzen camp",
          "speed": "2.0s",
          "faction": "Contested",
          "teaches": "Thunderstomp 1, Dash 1",
          "notes": "Earliest gorilla tame in the game (Level 30)"
        },
        {
          "name": "Mistvale Gorilla",
          "level": "32–33",
          "minLevel": 32,
          "maxLevel": 33,
          "zone": "Stranglethorn Vale",
          "subzone": "Mistvale Valley & Gurubashi arena",
          "speed": "2.0s",
          "faction": "Contested",
          "teaches": "Thunderstomp 1, Dash 1",
          "notes": "Teaches Thunderstomp Rank 1"
        },
        {
          "name": "Jungle Thunderer",
          "level": "37–38",
          "minLevel": 37,
          "maxLevel": 38,
          "zone": "Stranglethorn Vale",
          "subzone": "Mistvale Valley hills",
          "speed": "2.0s",
          "faction": "Contested",
          "teaches": "Thunderstomp 1, Dash 1",
          "notes": "AoE shock tank"
        },
        {
          "name": "Elder Mistvale Gorilla",
          "level": "40–41",
          "minLevel": 40,
          "maxLevel": 41,
          "zone": "Stranglethorn Vale",
          "subzone": "Near Booty Bay pass",
          "speed": "2.0s",
          "faction": "Contested",
          "teaches": "Thunderstomp 2, Dash 2",
          "notes": "Teaches Thunderstomp Rank 2"
        },
        {
          "name": "Groddoc Thunderer",
          "level": "49–50",
          "minLevel": 49,
          "maxLevel": 50,
          "zone": "Feralas",
          "subzone": "The High Wilderness",
          "speed": "2.0s",
          "faction": "Contested",
          "teaches": "Thunderstomp 2, Dash 2",
          "notes": "High level tank gorilla"
        },
        {
          "name": "U'cha",
          "level": "55",
          "minLevel": 55,
          "maxLevel": 55,
          "zone": "Un'Goro Crater",
          "subzone": "Fungal Rock cave (Rare)",
          "speed": "2.0s",
          "faction": "Contested",
          "teaches": "Thunderstomp 3, Dash 3",
          "notes": "Legendary pure white gorilla; teaches Thunderstomp 3"
        }
      ]
    },
    {
      "id": "hyena",
      "name": "Hyena",
      "icon": "https://foreverchanges.pro/icon/ability_hunter_pet_hyena.jpg",
      "damageMod": "0%",
      "armorMod": "0%",
      "healthMod": "0%",
      "diet": [
        "Meat",
        "Fruit"
      ],
      "fastestTame": "1.30s (Ravage Lvl 51, Blasted Lands)",
      "abilities": [
        "Tendon Rip (Rank 1-5)",
        "Dash (Rank 1-3)",
        "Bite (Rank 1-8)"
      ],
      "newAbility": {
        "name": "Tendon Rip",
        "badge": "✦ New in Forever",
        "icon": "https://foreverchanges.pro/icon/ability_hunter_pet_hyena.jpg",
        "cost": "25 Focus",
        "cd": "30 sec CD",
        "desc": "Tears at an enemy's legs for 21 damage over 9 sec and reduces movement speed by 50% for 9 sec."
      },
      "highlight": "Well-rounded scavenger beast with high agility, Dash mobility, and the new Tendon Rip hamstring.",
      "tameLocations": [
        {
          "name": "Giggling Hyena",
          "level": "13–14",
          "minLevel": 13,
          "maxLevel": 14,
          "zone": "The Barrens",
          "subzone": "Lushwater Oasis & Dreadmist Peak",
          "speed": "2.0s",
          "faction": "Horde",
          "teaches": "Tendon Rip 1, Bite 2",
          "notes": "Earliest hyena tame; teaches Tendon Rip 1"
        },
        {
          "name": "Snort the Heckler",
          "level": "17",
          "minLevel": 17,
          "maxLevel": 17,
          "zone": "The Barrens",
          "subzone": "South of Camp Taurajo (Rare)",
          "speed": "2.0s",
          "faction": "Horde",
          "teaches": "Tendon Rip 1, Bite 3",
          "notes": "Named rare hyena"
        },
        {
          "name": "Bonepaw Hyena",
          "level": "33–35",
          "minLevel": 33,
          "maxLevel": 35,
          "zone": "Desolace",
          "subzone": "Kolkar Centaur territory",
          "speed": "2.0s",
          "faction": "Contested",
          "teaches": "Tendon Rip 2, Bite 5, Dash 1",
          "notes": "Teaches Dash Rank 1 & Tendon Rip 2"
        },
        {
          "name": "Snickerfang Hyena",
          "level": "40–42",
          "minLevel": 40,
          "maxLevel": 42,
          "zone": "Badlands",
          "subzone": "Mirage Flats & Camp Cagg",
          "speed": "2.0s",
          "faction": "Contested",
          "teaches": "Tendon Rip 3, Bite 6, Dash 2",
          "notes": "Teaches Tendon Rip 3 & Dash 2"
        },
        {
          "name": "Ravage",
          "level": "51",
          "minLevel": 51,
          "maxLevel": 51,
          "zone": "Blasted Lands",
          "subzone": "The Tainted Scar border (Rare)",
          "speed": "1.3s",
          "isFast": true,
          "faction": "Contested",
          "teaches": "Tendon Rip 4, Bite 7, Dash 3",
          "notes": "⚡ Fastest Hyena in Game! 1.3s swing speed"
        }
      ]
    },
    {
      "id": "raptor",
      "name": "Raptor",
      "icon": "https://foreverchanges.pro/icon/ability_hunter_pet_raptor.jpg",
      "damageMod": "+10%",
      "armorMod": "+3%",
      "healthMod": "-5%",
      "diet": [
        "Meat"
      ],
      "abilities": [
        "Savage Rend (Rank 1-5)",
        "Dash (Rank 1-3)",
        "Bite (Rank 1-8)",
        "Claw (Rank 1-8)"
      ],
      "newAbility": {
        "name": "Savage Rend",
        "badge": "✦ New in Forever",
        "icon": "https://foreverchanges.pro/icon/ability_hunter_pet_raptor.jpg",
        "cost": "50 Focus",
        "cd": "1 min CD",
        "desc": "Slash an enemy with razor talons, causing target to Bleed for 54 damage (Rank 2) over 18 sec."
      },
      "highlight": "Pure offensive power with +10% damage bonus, Savage Rend bleed, and high armor penetration.",
      "tameLocations": [
        {
          "name": "Sunscale Raptor",
          "level": "13–14",
          "minLevel": 13,
          "maxLevel": 14,
          "zone": "The Barrens",
          "subzone": "The Forgotten Pools & Stagnant Oasis",
          "speed": "2.0s",
          "faction": "Horde",
          "teaches": "Savage Rend 1, Bite 2",
          "notes": "Earliest raptor tame; teaches Savage Rend 1"
        },
        {
          "name": "Highland Raptor",
          "level": "22–24",
          "minLevel": 22,
          "maxLevel": 24,
          "zone": "Wetlands",
          "subzone": "Raptor Ridge & Dun Modr path",
          "speed": "2.0s",
          "faction": "Alliance",
          "teaches": "Savage Rend 2, Bite 4",
          "notes": "Alliance early raptor tame"
        },
        {
          "name": "Shriekling Matriarch",
          "level": "24–26",
          "minLevel": 24,
          "maxLevel": 26,
          "zone": "Zephras Isle",
          "subzone": "Raptor Valley",
          "speed": "2.0s",
          "faction": "Contested",
          "teaches": "Savage Rend 2, Bite 4",
          "notes": "✦ Forever new island raptor"
        },
        {
          "name": "Bloodfen Raptor",
          "level": "35–37",
          "minLevel": 35,
          "maxLevel": 37,
          "zone": "Dustwallow Marsh",
          "subzone": "Bloodfen Den & Dragonmurk",
          "speed": "2.0s",
          "faction": "Contested",
          "teaches": "Savage Rend 3, Bite 5, Dash 1",
          "notes": "Teaches Dash Rank 1 & Savage Rend 3"
        },
        {
          "name": "Tazz'ala",
          "level": "37",
          "minLevel": 37,
          "maxLevel": 37,
          "zone": "Stranglethorn Vale",
          "subzone": "Zul'Gurub perimeter (Rare)",
          "speed": "2.0s",
          "faction": "Contested",
          "teaches": "Savage Rend 3, Claw 5, Dash 1",
          "notes": "Rare crimson raptor"
        },
        {
          "name": "Dart",
          "level": "38",
          "minLevel": 38,
          "maxLevel": 38,
          "zone": "Dustwallow Marsh",
          "subzone": "Bloodfen Den cave (Rare)",
          "speed": "2.0s",
          "faction": "Contested",
          "teaches": "Savage Rend 3, Bite 6, Dash 1",
          "notes": "Named rare raptor"
        },
        {
          "name": "Gurubashi Raptor",
          "level": "48–50",
          "minLevel": 48,
          "maxLevel": 50,
          "zone": "Stranglethorn Vale",
          "subzone": "Ruins of Aboraz & Jubuwal",
          "speed": "2.0s",
          "faction": "Contested",
          "teaches": "Savage Rend 4, Bite 7, Dash 2",
          "notes": "Teaches Savage Rend Rank 4"
        }
      ]
    },
    {
      "id": "scorpid",
      "name": "Scorpid",
      "icon": "https://foreverchanges.pro/icon/ability_hunter_pet_scorpid.jpg",
      "damageMod": "-6%",
      "armorMod": "+10%",
      "healthMod": "0%",
      "diet": [
        "Meat"
      ],
      "fastestTame": "1.60s (Death Flayer Lvl 11, Durotar)",
      "abilities": [
        "Scorpid Poison (Rank 1-5)",
        "Dash (Rank 1-3)",
        "Claw (Rank 1-8)"
      ],
      "newAbility": {
        "name": "Scorpid Poison Rework",
        "badge": "✦ Changed in Forever",
        "icon": "https://foreverchanges.pro/icon/ability_poisonsting.jpg",
        "cost": "30 Focus",
        "cd": "4 sec CD",
        "desc": "Inflicts 10 Nature damage over 10 sec, stacking up to 5 times. Protects Hunter Viper Sting from dispels."
      },
      "highlight": "Scorpid Poison stacks nature DoT to protect Viper Sting from dispel in PvP.",
      "tameLocations": [
        {
          "name": "Scorpid Worker",
          "level": "3",
          "minLevel": 3,
          "maxLevel": 3,
          "zone": "Durotar",
          "subzone": "Valley of Trials",
          "speed": "2.0s",
          "faction": "Horde",
          "teaches": "Claw 1",
          "notes": "Horde starter scorpid"
        },
        {
          "name": "Sarkoth",
          "level": "4",
          "minLevel": 4,
          "maxLevel": 4,
          "zone": "Durotar",
          "subzone": "Valley of Trials quest boss (Rare)",
          "speed": "2.0s",
          "faction": "Horde",
          "teaches": "Claw 1",
          "notes": "Iconic named scorpid"
        },
        {
          "name": "Venomtail Scorpid",
          "level": "9–10",
          "minLevel": 9,
          "maxLevel": 10,
          "zone": "Durotar",
          "subzone": "Sen'jin Village & Razor Hill road",
          "speed": "2.0s",
          "faction": "Horde",
          "teaches": "Scorpid Poison 1",
          "notes": "Teaches Scorpid Poison 1 at level 10"
        },
        {
          "name": "Death Flayer",
          "level": "11",
          "minLevel": 11,
          "maxLevel": 11,
          "zone": "Durotar",
          "subzone": "South of Razor Hill near 60, 48 (Rare)",
          "speed": "1.6s",
          "isFast": true,
          "faction": "Horde",
          "teaches": "Scorpid Poison 1, Claw 2",
          "notes": "⚡ Fastest Scorpid in Game! 1.6s swing speed"
        },
        {
          "name": "Clacklic",
          "level": "15",
          "minLevel": 15,
          "maxLevel": 15,
          "zone": "The Barrens",
          "subzone": "Near Far Watch Post (Rare)",
          "speed": "2.0s",
          "faction": "Horde",
          "teaches": "Scorpid Poison 1, Claw 2",
          "notes": "Rare copper scorpid"
        },
        {
          "name": "Scorpashi Snapper",
          "level": "30–31",
          "minLevel": 30,
          "maxLevel": 31,
          "zone": "Desolace",
          "subzone": "Kormek's Hut & Magram territory",
          "speed": "2.0s",
          "faction": "Contested",
          "teaches": "Scorpid Poison 2, Claw 4, Dash 1",
          "notes": "Teaches Scorpid Poison 2 & Dash 1"
        },
        {
          "name": "Scorpid Reaver",
          "level": "31–32",
          "minLevel": 31,
          "maxLevel": 32,
          "zone": "Thousand Needles",
          "subzone": "Highperch base & Splithoof Crag",
          "speed": "2.0s",
          "faction": "Contested",
          "teaches": "Scorpid Poison 2, Claw 4",
          "notes": "Teaches Scorpid Poison 2"
        },
        {
          "name": "Vile Sting",
          "level": "35",
          "minLevel": 35,
          "maxLevel": 35,
          "zone": "Thousand Needles",
          "subzone": "Salt Flats cliffs (Rare)",
          "speed": "2.0s",
          "faction": "Contested",
          "teaches": "Scorpid Poison 2, Claw 5",
          "notes": "Teaches Claw Rank 5"
        },
        {
          "name": "Scorpid Hunter",
          "level": "40–41",
          "minLevel": 40,
          "maxLevel": 41,
          "zone": "Tanaris",
          "subzone": "Zul'Farrak exterior & Sandsorrow Watch",
          "speed": "2.0s",
          "faction": "Contested",
          "teaches": "Scorpid Poison 3, Claw 6, Dash 2",
          "notes": "Teaches Scorpid Poison 3 & Claw 6"
        },
        {
          "name": "Firetail Scorpid",
          "level": "56–57",
          "minLevel": 56,
          "maxLevel": 57,
          "zone": "Burning Steppes",
          "subzone": "Pillar of Ash & Dreadmaul Rock",
          "speed": "2.0s",
          "faction": "Contested",
          "teaches": "Scorpid Poison 4, Claw 8",
          "notes": "Teaches Scorpid Poison 4 & Claw 8"
        }
      ]
    },
    {
      "id": "spider",
      "name": "Spider",
      "icon": "https://foreverchanges.pro/icon/ability_hunter_pet_spider.jpg",
      "damageMod": "+7%",
      "armorMod": "0%",
      "healthMod": "0%",
      "diet": [
        "Meat"
      ],
      "abilities": [
        "Web (Rank 1-5)",
        "Dash (Rank 1-3)",
        "Bite (Rank 1-8)"
      ],
      "newAbility": {
        "name": "Web (Root & Nature DoT)",
        "badge": "✦ New in Forever",
        "icon": "https://foreverchanges.pro/icon/spell_nature_web.jpg",
        "cost": "20 Focus",
        "cd": "40 sec CD",
        "desc": "Entangles an enemy in a corrosive web, immobilizing them and dealing 20 Nature damage (Rank 2) over 4 sec."
      },
      "highlight": "High damage ambush predator with on-demand Web roots to peel enemy melee in PvP.",
      "tameLocations": [
        {
          "name": "Night Web Spider",
          "level": "3–4",
          "minLevel": 3,
          "maxLevel": 4,
          "zone": "Tirisfal Glades",
          "subzone": "Deathknell woods",
          "speed": "2.0s",
          "faction": "Horde",
          "teaches": "Bite 1",
          "notes": "Undead starter spider"
        },
        {
          "name": "Webwood Silkspinner",
          "level": "8–9",
          "minLevel": 8,
          "maxLevel": 9,
          "zone": "Teldrassil",
          "subzone": "Shadowglen & Dolanaar",
          "speed": "2.0s",
          "faction": "Alliance",
          "teaches": "Bite 2",
          "notes": "Teaches Bite Rank 2"
        },
        {
          "name": "Pygmy Spider",
          "level": "10–11",
          "minLevel": 10,
          "maxLevel": 11,
          "zone": "Tirisfal / Silverpine",
          "subzone": "Near Ambermill border",
          "speed": "2.0s",
          "faction": "Horde",
          "teaches": "Web 1, Bite 2",
          "notes": "Immediate level 10 tame"
        },
        {
          "name": "Moss Stalker",
          "level": "12",
          "minLevel": 12,
          "maxLevel": 12,
          "zone": "Silverpine Forest",
          "subzone": "Deep Ecker & Malden's Orchard",
          "speed": "2.0s",
          "faction": "Horde",
          "teaches": "Web 1",
          "notes": "✦ Teaches Web Rank 1 in WoW Forever (4s root)"
        },
        {
          "name": "Broodling",
          "level": "14",
          "minLevel": 14,
          "maxLevel": 14,
          "zone": "Ruins of Lordaeron",
          "subzone": "First packs near courtyard",
          "speed": "2.0s",
          "faction": "Horde",
          "teaches": "Bite 2",
          "notes": "✦ Reported by beta players in Ruins of Lordaeron"
        },
        {
          "name": "Deepmoss Creeper",
          "level": "16–17",
          "minLevel": 16,
          "maxLevel": 17,
          "zone": "Stonetalon Mountains",
          "subzone": "Webwinder Path",
          "speed": "2.0s",
          "faction": "Contested",
          "teaches": "Web 1, Bite 3",
          "notes": "Teaches Bite Rank 3"
        },
        {
          "name": "Giant Moss Creeper",
          "level": "24–25",
          "minLevel": 24,
          "maxLevel": 25,
          "zone": "Hillsbrad Foothills",
          "subzone": "North of Tarren Mill & Durnholde",
          "speed": "2.0s",
          "faction": "Contested",
          "teaches": "Web 2, Bite 4",
          "notes": "Teaches Web 2 & Bite 4"
        },
        {
          "name": "Plains Creeper",
          "level": "32–33",
          "minLevel": 32,
          "maxLevel": 33,
          "zone": "Arathi Highlands",
          "subzone": "Dabyrie's Farmstead & Witherbark",
          "speed": "2.0s",
          "faction": "Contested",
          "teaches": "Web 2, Bite 5, Dash 1",
          "notes": "Teaches Bite 5 & Dash 1"
        },
        {
          "name": "Rekk'tilac",
          "level": "48",
          "minLevel": 48,
          "maxLevel": 48,
          "zone": "Searing Gorge",
          "subzone": "Slaag Foothills (Rare)",
          "speed": "2.0s",
          "faction": "Contested",
          "teaches": "Web 4, Bite 7, Dash 2",
          "notes": "Teaches Bite Rank 7 & Web 4"
        },
        {
          "name": "Spire Spiderling",
          "level": "55–56",
          "minLevel": 55,
          "maxLevel": 56,
          "zone": "Lower Blackrock Spire",
          "subzone": "Hordemar City web tunnels",
          "speed": "2.0s",
          "faction": "Contested",
          "teaches": "Web 4, Bite 7",
          "notes": "Dungeon spider with high level abilities"
        }
      ]
    },
    {
      "id": "tallstrider",
      "name": "Tallstrider",
      "icon": "https://foreverchanges.pro/icon/ability_hunter_pet_tallstrider.jpg",
      "damageMod": "0%",
      "armorMod": "0%",
      "healthMod": "+5%",
      "diet": [
        "Cheese",
        "Fruit",
        "Fungus"
      ],
      "fastestTame": "1.30s (Ornery Galestrider Lvl 8, Zephras Isle)",
      "abilities": [
        "Dust Cloud (Rank 1-5)",
        "Dash (Rank 1-3)",
        "Bite (Rank 1-8)"
      ],
      "newAbility": {
        "name": "Dust Cloud",
        "badge": "✦ New in Forever",
        "icon": "https://foreverchanges.pro/icon/spell_nature_sleep.jpg",
        "cost": "10 Focus",
        "cd": "Instant",
        "desc": "Kicks up an abrasive cloud of dust, reducing the target's Armor by 175 (Rank 2) for 30 sec."
      },
      "highlight": "Dust Cloud strips armor for physical group burst; vegetarian diet makes feeding very affordable.",
      "tameLocations": [
        {
          "name": "Ornery Galestrider",
          "level": "8",
          "minLevel": 8,
          "maxLevel": 8,
          "zone": "Zephras Isle",
          "subzone": "Coastal dunes",
          "speed": "1.3s",
          "isFast": true,
          "faction": "Contested",
          "teaches": "Dust Cloud 1",
          "notes": "⚡ Fastest Tallstrider in Entire Game! 1.3s swing speed"
        },
        {
          "name": "Mazzranache",
          "level": "9",
          "minLevel": 9,
          "maxLevel": 9,
          "zone": "Mulgore",
          "subzone": "Plains around Bloodhoof Village (Rare)",
          "speed": "2.0s",
          "faction": "Horde",
          "teaches": "Dust Cloud 1",
          "notes": "Iconic bright pink tallstrider model"
        },
        {
          "name": "Fleeting Plainstrider",
          "level": "12–13",
          "minLevel": 12,
          "maxLevel": 13,
          "zone": "The Barrens",
          "subzone": "Between Far Watch Post and Crossroads",
          "speed": "2.0s",
          "faction": "Horde",
          "teaches": "Dust Cloud 1, Bite 2",
          "notes": "Teaches Dust Cloud Rank 1"
        },
        {
          "name": "Greater Plainstrider",
          "level": "16–17",
          "minLevel": 16,
          "maxLevel": 17,
          "zone": "The Barrens",
          "subzone": "South of Crossroads & Camp Taurajo",
          "speed": "2.0s",
          "faction": "Horde",
          "teaches": "Dust Cloud 1, Bite 3",
          "notes": "Mid-level Barrens tallstrider"
        },
        {
          "name": "Strider Clutchmother",
          "level": "20",
          "minLevel": 20,
          "maxLevel": 20,
          "zone": "Darkshore",
          "subzone": "Ameth'Aran ruins (Rare)",
          "speed": "2.0s",
          "faction": "Alliance",
          "teaches": "Dust Cloud 1, Bite 3",
          "notes": "Rare purple tallstrider"
        },
        {
          "name": "Ornery Plainstrider",
          "level": "18–19",
          "minLevel": 18,
          "maxLevel": 19,
          "zone": "Darkshore / Barrens",
          "subzone": "Bashal'Aran & Taurajo border",
          "speed": "2.0s",
          "faction": "Contested",
          "teaches": "Dust Cloud 1, Dash 1",
          "notes": "Teaches Dash Rank 1 in Forever"
        },
        {
          "name": "Lost Barrens Strider",
          "level": "24–25",
          "minLevel": 24,
          "maxLevel": 25,
          "zone": "The Barrens",
          "subzone": "Field of Giants & Bael Modan",
          "speed": "2.0s",
          "faction": "Horde",
          "teaches": "Dust Cloud 2, Bite 4, Dash 1",
          "notes": "Teaches Dust Cloud Rank 2"
        }
      ]
    },
    {
      "id": "turtle",
      "name": "Turtle",
      "icon": "https://foreverchanges.pro/icon/ability_hunter_pet_turtle.jpg",
      "damageMod": "-10%",
      "armorMod": "+13%",
      "healthMod": "0%",
      "diet": [
        "Fruit",
        "Fungus",
        "Fish"
      ],
      "abilities": [
        "Shell Shield (Rank 1-3)",
        "Dash (Rank 1-3)",
        "Bite (Rank 1-8)"
      ],
      "newAbility": {
        "name": "Shell Shield Rework",
        "badge": "✦ Changed in Forever",
        "icon": "https://foreverchanges.pro/icon/ability_hunter_pet_turtle.jpg",
        "cost": "10 Focus",
        "cd": "3 min CD",
        "desc": "Reduces all damage taken by 50% for 12 sec, increases attack intervals by 60%, but deals significantly more damage per attack."
      },
      "highlight": "Ultimate tanking pet; Shell Shield reduces all damage taken by 50% for 12 sec with +13% Armor.",
      "tameLocations": [
        {
          "name": "Oasis Snapjaw",
          "level": "15–16",
          "minLevel": 15,
          "maxLevel": 16,
          "zone": "The Barrens",
          "subzone": "The Stagnant Oasis & Lushwater Oasis",
          "speed": "2.0s",
          "faction": "Horde",
          "teaches": "Bite 2, Shell Shield 1",
          "notes": "Earliest turtle tame; teaches Shell Shield 1 (-50% dmg)"
        },
        {
          "name": "Corrupted Snapjaw",
          "level": "20–21",
          "minLevel": 20,
          "maxLevel": 21,
          "zone": "Darkshore / Ashenvale",
          "subzone": "Cliffspring River & Zoram Strand",
          "speed": "2.0s",
          "faction": "Alliance",
          "teaches": "Bite 3, Shell Shield 1",
          "notes": "Alliance level 20 turtle tame"
        },
        {
          "name": "Snapjaw",
          "level": "30–31",
          "minLevel": 30,
          "maxLevel": 31,
          "zone": "Alterac Mountains / Hillsbrad",
          "subzone": "Durnholde river & Lordamere Lake",
          "speed": "2.0s",
          "faction": "Contested",
          "teaches": "Bite 4, Shell Shield 1, Dash 1",
          "notes": "Teaches Shell Shield 1 & Dash 1"
        },
        {
          "name": "Cranky Benj",
          "level": "32",
          "minLevel": 32,
          "maxLevel": 32,
          "zone": "Alterac Mountains",
          "subzone": "Island in Lordamere Lake (Rare)",
          "speed": "2.0s",
          "faction": "Contested",
          "teaches": "Bite 5, Shell Shield 1, Dash 1",
          "notes": "Named rare snapping turtle"
        },
        {
          "name": "Sparkleshell Snapper",
          "level": "34–35",
          "minLevel": 34,
          "maxLevel": 35,
          "zone": "Thousand Needles",
          "subzone": "Shimmering Flats salt pans",
          "speed": "2.0s",
          "faction": "Contested",
          "teaches": "Bite 5, Shell Shield 1, Dash 1",
          "notes": "Teaches Bite Rank 5"
        },
        {
          "name": "Giant Surf Glider",
          "level": "48–50",
          "minLevel": 48,
          "maxLevel": 50,
          "zone": "Tanaris",
          "subzone": "Eastmoon Ruins & Southbreak Shore",
          "speed": "2.0s",
          "faction": "Contested",
          "teaches": "Bite 7, Shell Shield 2, Dash 2",
          "notes": "Teaches Bite Rank 7 & Shell Shield 2"
        },
        {
          "name": "Ironback",
          "level": "51",
          "minLevel": 51,
          "maxLevel": 51,
          "zone": "The Hinterlands",
          "subzone": "The Overlook Cliffs coast (Rare)",
          "speed": "2.0s",
          "faction": "Contested",
          "teaches": "Bite 7, Shell Shield 2, Dash 3",
          "notes": "Massive armor rating turtle"
        }
      ]
    },
    {
      "id": "wind-serpent",
      "name": "Wind Serpent",
      "icon": "https://foreverchanges.pro/icon/ability_hunter_pet_windserpent.jpg",
      "damageMod": "+7%",
      "armorMod": "0%",
      "healthMod": "0%",
      "diet": [
        "Fish",
        "Bread",
        "Cheese"
      ],
      "abilities": [
        "Lightning Breath (Rank 1-6)",
        "Dive (Rank 1-3)",
        "Bite (Rank 1-8)"
      ],
      "newAbility": {
        "name": "Lightning Breath Rework",
        "badge": "✦ Changed in Forever",
        "icon": "https://foreverchanges.pro/icon/spell_nature_lightning.jpg",
        "cost": "50 Focus",
        "cd": "Instant",
        "desc": "Breathes lightning, instantly dealing 32 to 36 Nature damage (Rank 3) to a single target at 20-yard range."
      },
      "highlight": "Ranged Nature damage attacks that bypass physical armor and hit high-armor plate targets.",
      "tameLocations": [
        {
          "name": "Deviate Coiler",
          "level": "15–16",
          "minLevel": 15,
          "maxLevel": 16,
          "zone": "The Barrens / Wailing Caverns",
          "subzone": "Lushwater Oasis & WC entrance",
          "speed": "2.0s",
          "faction": "Horde",
          "teaches": "Lightning Breath 2, Bite 2",
          "notes": "Teaches Lightning Breath Rank 2"
        },
        {
          "name": "Deviate Stinglash",
          "level": "16–17",
          "minLevel": 16,
          "maxLevel": 17,
          "zone": "The Barrens / Wailing Caverns",
          "subzone": "Wailing Caverns interior",
          "speed": "2.0s",
          "faction": "Horde",
          "teaches": "Lightning Breath 2, Bite 3",
          "notes": "Teaches Lightning Breath Rank 2"
        },
        {
          "name": "Thunderhawk Cloudscraper",
          "level": "20–22",
          "minLevel": 20,
          "maxLevel": 22,
          "zone": "The Barrens",
          "subzone": "Bael Modan & Field of Giants",
          "speed": "2.0s",
          "faction": "Horde",
          "teaches": "Lightning Breath 2, Bite 3, Dive 1",
          "notes": "Teaches Dive Rank 1"
        },
        {
          "name": "Washte Pawne",
          "level": "25",
          "minLevel": 25,
          "maxLevel": 25,
          "zone": "The Barrens",
          "subzone": "South of Camp Taurajo near 44, 76 (Rare)",
          "speed": "2.0s",
          "faction": "Horde",
          "teaches": "Lightning Breath 3, Bite 4",
          "notes": "Rare crimson wind serpent; teaches Lightning Breath 3"
        },
        {
          "name": "Cloud Serpent",
          "level": "25–26",
          "minLevel": 25,
          "maxLevel": 26,
          "zone": "Thousand Needles",
          "subzone": "Splithoof Heights & Freewind Post cliffs",
          "speed": "2.0s",
          "faction": "Contested",
          "teaches": "Lightning Breath 3, Bite 4, Dive 1",
          "notes": "Teaches Lightning Breath 3"
        },
        {
          "name": "Noxious Reaver",
          "level": "37–38",
          "minLevel": 37,
          "maxLevel": 38,
          "zone": "Dustwallow Marsh",
          "subzone": "Dreadmurk Shore & Witch Hill",
          "speed": "2.0s",
          "faction": "Contested",
          "teaches": "Lightning Breath 4, Bite 5, Dive 1",
          "notes": "Teaches Lightning Breath Rank 4"
        },
        {
          "name": "Arash-ethis",
          "level": "49",
          "minLevel": 49,
          "maxLevel": 49,
          "zone": "Feralas",
          "subzone": "Ruins of Ravenwind (Rare)",
          "speed": "2.0s",
          "faction": "Contested",
          "teaches": "Lightning Breath 5, Dive 2",
          "notes": "Teaches Lightning Breath Rank 5"
        },
        {
          "name": "Son of Hakkar",
          "level": "50–51",
          "minLevel": 50,
          "maxLevel": 51,
          "zone": "Sunken Temple",
          "subzone": "Hall of Serpents inside dungeon",
          "speed": "2.0s",
          "faction": "Contested",
          "teaches": "Lightning Breath 5, Dive 3",
          "notes": "Dungeon wind serpent; teaches Dive 3"
        }
      ]
    },
    {
      "id": "wolf",
      "name": "Wolf",
      "icon": "https://foreverchanges.pro/icon/ability_hunter_pet_wolf.jpg",
      "damageMod": "0%",
      "armorMod": "+5%",
      "healthMod": "0%",
      "diet": [
        "Meat"
      ],
      "fastestTame": "1.20s (Deathmaw Lvl 53) • 1.40s (Coyote Packleader Lvl 11) • 1.50s (Coldrasp Ghost Wolf Lvl 12)",
      "abilities": [
        "Furious Howl (Rank 1-4)",
        "Dash (Rank 1-3)",
        "Bite (Rank 1-8)"
      ],
      "newAbility": {
        "name": "Furious Howl Rework",
        "badge": "✦ Changed in Forever",
        "icon": "https://foreverchanges.pro/icon/ability_hunter_pet_wolf.jpg",
        "cost": "60 Focus",
        "cd": "30 sec CD",
        "desc": "The wolf howls, increasing the melee attack power of all party members within 15 yards by 31 to 38 (Rank 2) for a full 1 minute."
      },
      "highlight": "Furious Howl buffs physical AP of party members for 1 min; top raid support companion.",
      "tameLocations": [
        {
          "name": "Starving Winter Wolf",
          "level": "8–9",
          "minLevel": 8,
          "maxLevel": 9,
          "zone": "Dun Morogh",
          "subzone": "Brewnall Village & Misty Pine",
          "speed": "2.0s",
          "faction": "Alliance",
          "teaches": "Bite 2",
          "notes": "Alliance starter wolf; teaches Bite 2"
        },
        {
          "name": "Coyote",
          "level": "10–11",
          "minLevel": 10,
          "maxLevel": 11,
          "zone": "Westfall",
          "subzone": "Furlbrow's Pumpkin Farm & Saldean's",
          "speed": "1.5s",
          "isFast": true,
          "faction": "Alliance",
          "teaches": "Furious Howl 1, Bite 2",
          "notes": "⚡ Fast 1.5s swing speed at level 10"
        },
        {
          "name": "Coyote Packleader",
          "level": "11–12",
          "minLevel": 11,
          "maxLevel": 12,
          "zone": "Westfall",
          "subzone": "Sentinel Hill perimeter",
          "speed": "1.4s",
          "isFast": true,
          "faction": "Alliance",
          "teaches": "Furious Howl 1, Bite 2",
          "notes": "⚡ Fast 1.4s swing speed coyote"
        },
        {
          "name": "Worg",
          "level": "10–11",
          "minLevel": 10,
          "maxLevel": 11,
          "zone": "Silverpine Forest",
          "subzone": "The Decrepit Ferry & The Shining Strand",
          "speed": "2.0s",
          "faction": "Horde",
          "teaches": "Furious Howl 1, Bite 2",
          "notes": "Horde level 10 wolf; teaches Furious Howl 1"
        },
        {
          "name": "Coldrasp",
          "level": "12",
          "minLevel": 12,
          "maxLevel": 12,
          "zone": "Tirisfal Glades",
          "subzone": "Whispering Forest near 19.7, 65.6 (Rare)",
          "speed": "1.5s",
          "isFast": true,
          "faction": "Horde",
          "teaches": "Furious Howl 1, Bite 2",
          "notes": "✦ RARE BLUE GHOST WOLF MODEL in Forever! 1.5s swing speed"
        },
        {
          "name": "Bloodsnout Worg",
          "level": "16–17",
          "minLevel": 16,
          "maxLevel": 17,
          "zone": "Silverpine Forest",
          "subzone": "Ambermill road",
          "speed": "2.0s",
          "faction": "Horde",
          "teaches": "Bite 3",
          "notes": "Teaches Bite Rank 3"
        },
        {
          "name": "Lupos",
          "level": "23",
          "minLevel": 23,
          "maxLevel": 23,
          "zone": "Duskwood",
          "subzone": "Addle's Stead & Raven Hill road (Rare)",
          "speed": "2.0s",
          "faction": "Contested",
          "teaches": "Furious Howl 2, Bite 3",
          "notes": "Legendary Duskwood rare; teaches Furious Howl 2"
        },
        {
          "name": "Black Ravager Mastiff",
          "level": "25–26",
          "minLevel": 25,
          "maxLevel": 26,
          "zone": "Duskwood",
          "subzone": "The Rotting Orchard & Darkshire outskirts",
          "speed": "2.0s",
          "faction": "Alliance",
          "teaches": "Furious Howl 2, Bite 4, Dash 1",
          "notes": "Teaches Furious Howl 2 & Dash 1"
        },
        {
          "name": "Ghostpaw Alpha",
          "level": "27–28",
          "minLevel": 27,
          "maxLevel": 28,
          "zone": "Ashenvale",
          "subzone": "Mystral Lake & Raynewood",
          "speed": "2.0s",
          "faction": "Contested",
          "teaches": "Furious Howl 2, Bite 4, Dash 1",
          "notes": "Teaches Furious Howl 2"
        },
        {
          "name": "Barnabus",
          "level": "38",
          "minLevel": 38,
          "maxLevel": 38,
          "zone": "Badlands",
          "subzone": "Camp Boff & Mirage Flats (Rare)",
          "speed": "2.0s",
          "faction": "Contested",
          "teaches": "Furious Howl 3, Bite 6, Dash 1",
          "notes": "Teaches Furious Howl 3 & Bite 6"
        },
        {
          "name": "Longtooth Runner",
          "level": "40–41",
          "minLevel": 40,
          "maxLevel": 41,
          "zone": "Feralas",
          "subzone": "Feralas western river",
          "speed": "2.0s",
          "faction": "Contested",
          "teaches": "Furious Howl 3, Dash 2",
          "notes": "Teaches Furious Howl 3 & Dash 2"
        },
        {
          "name": "Snarler",
          "level": "42",
          "minLevel": 42,
          "maxLevel": 42,
          "zone": "Feralas",
          "subzone": "North of Camp Mojache near 52, 42 (Rare)",
          "speed": "2.0s",
          "faction": "Contested",
          "teaches": "Furious Howl 3, Dash 2",
          "notes": "Legendary rare wolf with +100 to all elemental resistances!"
        },
        {
          "name": "Deathmaw",
          "level": "53",
          "minLevel": 53,
          "maxLevel": 53,
          "zone": "Burning Steppes",
          "subzone": "Morgan's Vigil cliffs near 83, 39 (Rare)",
          "speed": "1.2s",
          "isFast": true,
          "faction": "Contested",
          "teaches": "Furious Howl 4, Dash 3",
          "notes": "⚡ FASTEST WOLF IN THE GAME (1.20s swing speed!) Teaches Furious Howl 4"
        }
      ]
    }
  ]
},
  merchantsFavor: {
  "camps": {
    "alliance": {
      "name": "Azeroth Commerce Authority",
      "location": "Three Corners, Redridge Mountains",
      "coords": "10.5, 72.7 (Meeting of Elwynn, Duskwood & Lakeshire roads)",
      "quartermaster": "Marcy Baker (9.5, 71.1)",
      "territory": "Contested Zone (PvP Enabled)"
    },
    "horde": {
      "name": "Durotar Supply and Logistics",
      "location": "West of Crossroads, The Barrens",
      "coords": "49.7, 29.4 (Road to Stonetalon Mountains)",
      "quartermaster": "Dokimi (50.0, 29.2)",
      "territory": "Horde Controlled Zone"
    }
  },
  "vendors": [
    {
      "role": "Quartermaster (Takes Crates)",
      "alliance": "Marcy Baker (9.5, 71.1)",
      "horde": "Dokimi (50.0, 29.2)"
    },
    {
      "role": "Pack Kodo Mount (6,000 Favor)",
      "alliance": "Huey Sunnydale (8.5, 71.9)",
      "horde": "Okamache (49.6, 28.8)"
    },
    {
      "role": "Minimule Pet & Signpost Toy",
      "alliance": "Tamelyn Aldridge (10.5, 71.5)",
      "horde": "Gishah (49.4, 29.4)"
    },
    {
      "role": "Alchemy Vendor",
      "alliance": "Nina Surefire (10.8, 72.5)",
      "horde": "Apothecary Durelle (49.8, 29.5)"
    },
    {
      "role": "Blacksmithing Vendor",
      "alliance": "Stondry Darkhammer (10.3, 74.4)",
      "horde": "Gor'mak (49.8, 29.6)"
    },
    {
      "role": "Cooking Vendor",
      "alliance": "Kalsey Sanden (10.8, 72.5)",
      "horde": "Aza'bek (49.6, 29.2)"
    },
    {
      "role": "Enchanting Vendor",
      "alliance": "Alynsia (11.2, 71.5)",
      "horde": "Beneris (49.6, 29.8)"
    },
    {
      "role": "Engineering Vendor",
      "alliance": "Fritz Fizzle (10.4, 74.2)",
      "horde": "Fizzlefuse (49.8, 29.6)"
    },
    {
      "role": "Leatherworking Vendor",
      "alliance": "Daniel Stitchsong (10.0, 72.5)",
      "horde": "Pawani (49.6, 29.6)"
    },
    {
      "role": "Tailoring Vendor",
      "alliance": "Mivin Shadowweave (10.0, 72.5)",
      "horde": "Jim'bek (49.6, 29.5)"
    }
  ],
  "crateTiers": [
    {
      "tier": "Apprentice (White)",
      "levelReq": 10,
      "favor": 5,
      "money": "2s 50c",
      "materials": "Raw Gathered Materials (20 Peacebloom, 20 Copper Ore, 40 Linen)"
    },
    {
      "tier": "Apprentice (Green)",
      "levelReq": 10,
      "favor": 10,
      "money": "5s 00c",
      "materials": "Crafted Components (2 Cured Light Hide, 20 Bolt of Linen, 20 Copper Bar, 16 Copper Bolts)"
    },
    {
      "tier": "Journeyman (White)",
      "levelReq": 10,
      "favor": 10,
      "money": "5s 00c",
      "materials": "Intermediate Raw Materials (10 Stranglekelp, 20 Iron Ore, 20 Wool Cloth, 20 Soul Dust)"
    },
    {
      "tier": "Journeyman (Green)",
      "levelReq": 10,
      "favor": 20,
      "money": "10s 00c",
      "materials": "Intermediate Crafted Goods (6 Bolt of Woolen Cloth, 20 Iron Bar, 8 Bronze Tube)"
    },
    {
      "tier": "Expert (White/Green)",
      "levelReq": 20,
      "favor": "25–35 (Est.)",
      "money": "15s–25s",
      "materials": "Mithril Ore, Mageweave, Vision Dust, Mithril Bars, Steel Struts"
    },
    {
      "tier": "Artisan (White/Green)",
      "levelReq": 35,
      "favor": "45–60 (Est.)",
      "money": "35s–50s",
      "materials": "Thorium Ore, Runecloth, Dream Dust, Truesilver Bars, Thorium Widgets"
    }
  ],
  "firstTurnInQuest": {
    "item": "Shipping Label",
    "bonusFavor": 50,
    "note": "Awarded automatically upon filling your first Waylaid Crate. Directs you to the camp and rewards a massive one-time 50 Favor boost."
  },
  "writsGuide": {
    "totalWrits": 150,
    "professions": [
      "Alchemy (30)",
      "Blacksmithing (30)",
      "Engineering (30)",
      "Leatherworking (30)",
      "Tailoring (30)"
    ],
    "tiers": [
      {
        "level": "Journeyman",
        "skillReq": "100–170",
        "rep": 75,
        "count": 45
      },
      {
        "level": "Expert",
        "skillReq": "180–225",
        "rep": 125,
        "count": 60
      },
      {
        "level": "Artisan",
        "skillReq": "230–310",
        "rep": 200,
        "count": 45
      }
    ],
    "payout": "22 to 45 silver Coin Pouch per daily order + Camp Reputation.",
    "rerollItem": "Forger's Quill (sold by Uncertified Scribe south of Three Corners to swap unwanted writs)."
  },
  "priorityPurchases": [
    {
      "item": "Level 20 Crafted Armor Sets",
      "cost": "30 Favor each",
      "profs": "Tailoring / LW / BS",
      "note": "Head pieces (Lvl 20), Boots (17), Gloves (15), Belts (12). BiS pre-dungeon gear."
    },
    {
      "item": "Level 20 Class Relics",
      "cost": "45 Favor each",
      "profs": "Enchanting 130",
      "note": "Tenets of the Silver Hand (Paladin), Polished Driftwood Icon (Shaman), Mystic Mushroom (Druid)."
    },
    {
      "item": "Enchant Weapon - Revelation",
      "cost": "45 Favor",
      "profs": "Enchanting 135",
      "note": "Featured in 17 of 31 Phase 2 BiS gear lists; provides strong spell and attack procs."
    },
    {
      "item": "Reins of the Pack Kodo",
      "cost": "6,000 Favor",
      "profs": "Any (Level 60)",
      "note": "Account-wide riding kodo accessible to Alliance characters too!"
    },
    {
      "item": "Minimule Pet & Signpost Toy",
      "cost": "1,500 / 1,200 Favor",
      "profs": "Any",
      "note": "Minimule vanity companion and interactive Tradeskill Signpost toy."
    },
    {
      "item": "Profession Master Titles",
      "cost": "1,000 Favor",
      "profs": "300 Skill Req",
      "note": "Unlocks account titles: 'The Alchemist', 'The Blacksmith', 'The Enchanter', etc."
    }
  ]
},
  cozySleepingBag: {
  "item": {
    "name": "Cozy Sleeping Bag",
    "itemLevel": 40,
    "bind": "Binds when picked up",
    "unique": true,
    "cd": "60 Min Cooldown",
    "groundDuration": "20 Minutes",
    "deployCast": "15 Seconds (Standing Still)"
  },
  "buff": {
    "name": "Well-Rested",
    "duration": "2 Hours (7,200 seconds)",
    "stacks": "Up to 3 Stacks (+1% per minute rested)",
    "maxBonus": "+3% Experience from all sources (Monsters AND Quests)",
    "restingSynergy": "Resting in the bag counts as Resting in an Inn, accelerating Rested XP velocity."
  },
  "studentFodder": {
    "name": "Student Fodder",
    "itemLevel": 33,
    "use": "Heals 500 HP immediately + 1,050 over 12s; restores 900 mana / 50 rage / 100 energy (5 min CD, stacks to 30)."
  },
  "questRoadmap": [
    {
      "step": 1,
      "name": "...and that note you found",
      "levelReq": 14,
      "factionStart": {
        "alliance": "Alexston Farmstead, Westfall (37.4, 50.6) - Burned-Out Remains in scorched field",
        "horde": "Field of Giants, The Barrens (46.4, 73.9) - Burned-Out Remains by ruined tower"
      },
      "task": "Click the Burned-Out Remains to loot the traveler's note and initiate the cross-continent trail.",
      "rewards": "Swiftness Potion (+50% speed for 15s) + Lesser Troll's Blood Elixir"
    },
    {
      "step": 2,
      "name": "Stepping Stones",
      "location": "Opposite Continent's Burned Remains (Barrens for Alliance / Westfall for Horde)",
      "task": "Journey to the enemy continent and turn in the note at the Nailed Plank.",
      "rewards": "2x 12-Slot Bags (Sturdy Lunchbox & Old Toolbox) + Farmer's Shovel / Mining Pick + Simple Wood & Flint"
    },
    {
      "step": 3,
      "name": "Scramble & Wet Job",
      "location": "Webwinder Path, Stonetalon Mountains (Path at 50.9, 52.3 -> Camp at 40.7, 52.4 -> Dirt Mound at 39.6, 49.9)",
      "task": "Climb the mountain path north of Sun Rock Retreat, click Pocket Litter at abandoned tent, and jump the ravine to the Mound of Dirt.",
      "rewards": "Choice of Thrown/Ranged Weapon (Silver Star / Moonsight Rifle / Precision Bow) + 4x Student Fodder"
    },
    {
      "step": 4,
      "name": "Eagle's Fist",
      "location": "Stonewrought Dam, Loch Modan (49.4, 12.9)",
      "task": "Walk onto the dam crest and drop down onto the giant dwarf stone carvings facing the Wetlands to retrieve the Carved Figurine.",
      "rewards": "Hickory Pipe + Rumsey Rum Light (+5 Stamina)"
    },
    {
      "step": 5,
      "name": "This Must Be The Place",
      "location": "Thoradin's Wall, Hillsbrad / Arathi (87.4, 49.7 Cart -> 22.4, 24.2 Messenger Bag)",
      "task": "Climb the abandoned supply cart south of Durnholde, scale the ramparts, reach the interior room, and click the Hastily Rolled-Up Satchel.",
      "rewards": "Cozy Sleeping Bag (+3% XP for 2 hours) + 8x Student Fodder"
    }
  ]
}
};
