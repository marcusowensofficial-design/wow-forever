/**
 * World of Warcraft: Forever - Hidden Library Books
 * Item and hand-in quest ids: ForeverDB (GPL-3.0). Locations: Warcraft Tavern and Method.gg, checked
 * November 24, 2026. "The Liminal and the Arcane" has an item but no reported location.
 */
window.WOW_LIBRARY_BOOKS_DATA = {
  "librarians": {
    "alliance": {
      "name": "Garion Wendell",
      "location": "Mage Quarter, Stormwind City",
      "coords": "37.6, 80.8",
      "mapId": 1453
    },
    "horde": {
      "name": "Owen Thadd",
      "location": "Magic Quarter, Undercity",
      "coords": "73.4, 33.0",
      "mapId": 1458
    }
  },
  "rewards": [
    {
      "threshold": 10,
      "title": "Friend of the Library",
      "subtitle": "Necklace Choice (Level 10+)",
      "req": "10 Unique Books Recovered",
      "items": [
        {
          "id": 277203,
          "name": "Scholarly Pendant",
          "slot": "Neck (iLvl 23)",
          "stats": "+3 Sta, +2 Spi",
          "icon": "inv_jewelry_necklace_11"
        },
        {
          "id": 277204,
          "name": "Erudite's Amulet",
          "slot": "Neck (iLvl 23)",
          "stats": "+2 Agi, +3 Sta",
          "icon": "inv_jewelry_necklace_01"
        }
      ]
    },
    {
      "threshold": 20,
      "title": "Greater Friend of the Library",
      "subtitle": "Ring Choice (Level 20+)",
      "req": "20 Unique Books Recovered",
      "items": [
        {
          "id": 281635,
          "name": "Philanthropist's Ring",
          "slot": "Finger (iLvl 35)",
          "stats": "+5 Int, +10 Spell",
          "icon": "inv_jewelry_ring_14"
        },
        {
          "id": 281634,
          "name": "Field Researcher's Loop",
          "slot": "Finger (iLvl 35)",
          "stats": "+7 Agi, +7 Sta",
          "icon": "inv_jewelry_ring_03"
        }
      ]
    },
    {
      "threshold": 25,
      "title": "Master Scholar of Azeroth",
      "subtitle": "Weapon / Off-Hand / Ranged Choice (Level 30+)",
      "req": "25 Unique Books Recovered",
      "items": [
        {
          "id": 277254,
          "name": "Truthseeker's Bow",
          "slot": "Ranged Bow (iLvl 45)",
          "stats": "+7 Agi, +3 Sta, 23.75 dps",
          "icon": "inv_weapon_bow_08"
        },
        {
          "id": 277258,
          "name": "Crest of Elucidation",
          "slot": "Shield (iLvl 45)",
          "stats": "+12 Spi, +4 Spell, +7 Healing",
          "icon": "inv_shield_05"
        },
        {
          "id": 277260,
          "name": "Researcher's Night Light",
          "slot": "Held In Off-Hand (iLvl 45)",
          "stats": "+12 Sta, +7 Fire spell damage",
          "icon": "inv_misc_lantern_01"
        }
      ]
    },
    {
      "threshold": 35,
      "title": "Greater Friend of the Library",
      "subtitle": "Choice (Level 50+)",
      "req": "35 Unique Books Recovered",
      "items": [
        {
          "id": 281637,
          "name": "Antique Bulwark",
          "slot": "Shield (iLvl 58)",
          "stats": "+13 Sta, +8 Defense",
          "icon": "inv_shield_02"
        },
        {
          "id": 277202,
          "name": "Artifact Seeker's Pendant",
          "slot": "Neck (iLvl 58)",
          "stats": "+9 Str, +8 Agi, +14 Sta",
          "icon": "trade_archaeology_pendant of the aqir"
        },
        {
          "id": 281636,
          "name": "Museum Keeper's Chain",
          "slot": "Neck (iLvl 58)",
          "stats": "+10 Sta, +10 Int, +11 Spell",
          "icon": "trade_archaeology_mithrilnecklace"
        }
      ]
    }
  ],
  "books": [
    {
      "id": "book-01",
      "itemId": 203755,
      "name": "Archmage Theocritus' Research Journal",
      "zone": "Elwynn Forest",
      "coords": "65.4, 70.1",
      "detail": "Tower of Azora, top floor table",
      "faction": "Alliance",
      "quests": {
        "A": 79092
      },
      "verifiedSeen": 2
    },
    {
      "id": "book-02",
      "itemId": 203754,
      "name": "Archmage Antonidas: The Unabridged Autobiography",
      "zone": "Ironforge",
      "coords": "75.7, 10.5",
      "detail": "Hall of Explorers, large table in the back room",
      "faction": "Neutral",
      "quests": {
        "A": 79091
      },
      "verifiedSeen": 2
    },
    {
      "id": "book-03",
      "itemId": 209845,
      "name": "Bewitchments and Glamours",
      "zone": "Westfall",
      "coords": "45.4, 70.4",
      "detail": "Moonbrook, shelf in the yellow-roofed house on the west edge",
      "faction": "Neutral",
      "quests": {
        "A": 78142
      },
      "verifiedSeen": 2
    },
    {
      "id": "book-04",
      "itemId": 209848,
      "name": "Goaz Scrolls",
      "zone": "Wetlands",
      "coords": "33.6, 47.9",
      "detail": "Whelgar's Excavation Site, lower level under half-buried pottery",
      "faction": "Neutral",
      "quests": {
        "A": 78146
      },
      "verifiedSeen": 2
    },
    {
      "id": "book-05",
      "itemId": 208860,
      "name": "Rumi of Gnomeregan: The Collected Works",
      "zone": "Loch Modan",
      "coords": "35.6, 48.9",
      "detail": "Upstairs table in the Stoutlager Inn, Thelsamar. A second copy is in the Sentinel Hill inn, Westfall (52.7, 53.8); only one counts",
      "faction": "Neutral",
      "quests": {
        "A": 79093
      },
      "verifiedSeen": 2
    },
    {
      "id": "book-06",
      "itemId": 209850,
      "name": "Runes of the Sorcerer-Kings",
      "zone": "Loch Modan",
      "coords": "77.5, 14.1",
      "detail": "Mo'grosh Stronghold ogre cave, past two elite ogres",
      "faction": "Neutral",
      "verifiedSeen": 2
    },
    {
      "id": "book-07",
      "itemId": 209844,
      "name": "The Dalaran Digest, Vol. 23",
      "zone": "Silverpine Forest",
      "coords": "63.5, 63.1",
      "detail": "Ambermill, shelf in the town hall",
      "faction": "Neutral",
      "quests": {
        "A": 78127
      },
      "verifiedSeen": 2
    },
    {
      "id": "book-08",
      "itemId": 210177,
      "name": "Ataeric: On Arcane Curiosities",
      "zone": "Silverpine Forest",
      "coords": "43.4, 41.2",
      "detail": "The Sepulcher, bottom floor shelf by the armorer",
      "faction": "Horde",
      "quests": {
        "H": 79096
      },
      "verifiedSeen": 2
    },
    {
      "id": "book-09",
      "itemId": 208185,
      "name": "The Apothecary's Metaphysical Primer",
      "zone": "Tirisfal Glades",
      "coords": "59.4, 52.3",
      "detail": "Brill, shelf in the alchemy shop",
      "faction": "Horde",
      "quests": {
        "H": 79095
      },
      "verifiedSeen": 2
    },
    {
      "id": "book-10",
      "itemId": 209843,
      "name": "Nar'thalas Almanac, Vol. 74",
      "zone": "Darkshore",
      "coords": "59.6, 22.2",
      "detail": "Ruins of Mathystra, landing on the stairs above the water",
      "faction": "Alliance",
      "verifiedSeen": 2
    },
    {
      "id": "book-11",
      "itemId": 209851,
      "name": "Fury of the Land",
      "zone": "Stonetalon Mountains",
      "coords": "74.4, 85.7",
      "detail": "Grimtotem Post, barrels in the smaller tent",
      "faction": "Neutral",
      "quests": {
        "H": 78149
      },
      "verifiedSeen": 2
    },
    {
      "id": "book-12",
      "itemId": 209849,
      "name": "Crimes Against Anatomy",
      "zone": "Duskwood",
      "coords": "16.7, 28.5",
      "detail": "Raven Hill Cemetery catacombs, table in the last room",
      "faction": "Neutral",
      "quests": {
        "A": 78147
      },
      "verifiedSeen": 2
    },
    {
      "id": "book-13",
      "itemId": 208800,
      "name": "Baxtan: On Destructive Magics",
      "zone": "The Barrens",
      "coords": "62.7, 36.3",
      "detail": "Ratchet, upstairs table in the engineering shop",
      "faction": "Neutral",
      "quests": {
        "H": 79097
      },
      "verifiedSeen": 2
    },
    {
      "id": "book-14",
      "itemId": 209846,
      "name": "Secrets of the Dreamers",
      "zone": "The Barrens",
      "coords": "52.8, 54.7",
      "detail": "Cavern of Mists, final room of the cave outside Wailing Caverns (do not enter the dungeon)",
      "faction": "Neutral",
      "quests": {
        "H": 78143
      },
      "verifiedSeen": 2
    },
    {
      "id": "book-15",
      "itemId": 209847,
      "name": "Arcanic Systems Manual",
      "zone": "The Barrens",
      "coords": "56.3, 8.8",
      "detail": "The Sludge Fen, top control room of the oil rig",
      "faction": "Neutral",
      "quests": {
        "H": 78145
      },
      "verifiedSeen": 2
    },
    {
      "id": "book-16",
      "itemId": 213165,
      "name": "Basilisks: Should Petrification be Feared?",
      "zone": "Stranglethorn Vale",
      "coords": "41.4, 50.9",
      "detail": "Table outside the basilisk cave",
      "faction": "Neutral",
      "verifiedSeen": 1
    },
    {
      "id": "book-17",
      "itemId": 215822,
      "name": "RwlRwlRwlRwl!",
      "zone": "Dustwallow Marsh",
      "coords": "57.1, 20.8",
      "detail": "Witch Hill, waterlogged book in the murloc camp",
      "faction": "Neutral",
      "verifiedSeen": 1
    },
    {
      "id": "book-18",
      "itemId": 215816,
      "name": "A Web of Lies: Debunking Myths and Legends",
      "zone": "Arathi Highlands",
      "coords": "73.6, 65.2",
      "detail": "Witherbark Village, scrolls by the east tent",
      "faction": "Neutral",
      "quests": {
        "A": 79949
      },
      "verifiedSeen": 2
    },
    {
      "id": "book-19",
      "itemId": 215824,
      "name": "A Luddite's Guide to Caring for Your Demonic Pet",
      "zone": "Swamp of Sorrows",
      "coords": "61.0, 22.0",
      "detail": "Fallow Sanctuary, caged book opened with a key from a Lost One",
      "faction": "Neutral"
    },
    {
      "id": "book-20",
      "itemId": 228132,
      "name": "Undead Potatoes",
      "zone": "Western Plaguelands",
      "coords": "38.3, 54.6",
      "detail": "Felstone Field, upstairs table in the house next to the barn",
      "faction": "Neutral",
      "verifiedSeen": 1
    },
    {
      "id": "book-21",
      "itemId": 220352,
      "name": "A Mind of Metal",
      "zone": "Searing Gorge",
      "coords": "38.1, 49.8",
      "detail": "The Cauldron, table in a Dark Iron tent",
      "faction": "Neutral"
    },
    {
      "id": "book-22",
      "itemId": 228135,
      "name": "A Study of the Light",
      "zone": "Eastern Plaguelands",
      "coords": "71.8, 48.2",
      "detail": "Inside Light's Hope Chapel, back left",
      "faction": "Neutral"
    },
    {
      "id": "book-23",
      "itemId": 220353,
      "name": "Conjurer's Codex",
      "zone": "Blasted Lands",
      "coords": "55.3, 32.2",
      "detail": "Rubble along the road near the center of the zone",
      "faction": "Neutral"
    },
    {
      "id": "book-24",
      "itemId": 215815,
      "name": "Defensive Magics 101",
      "zone": "Alterac Mountains",
      "coords": "48.4, 57.5",
      "detail": "Ruins of Alterac, first ogre tower",
      "faction": "Neutral"
    },
    {
      "id": "book-25",
      "itemId": 215817,
      "name": "Demons and You",
      "zone": "Desolace",
      "coords": "55.1, 26.2",
      "detail": "Thunder Axe Fortress, bench inside the large building",
      "faction": "Neutral",
      "quests": {
        "H": 79950
      },
      "verifiedSeen": 2
    },
    {
      "id": "book-26",
      "itemId": 220348,
      "name": "Everyday Etiquette",
      "zone": "Azshara",
      "coords": "20.4, 62.3",
      "detail": "Heldarr Encampment, on top of a box",
      "faction": "Neutral"
    },
    {
      "id": "book-27",
      "itemId": 215683,
      "name": "Geomancy: The Stone-Cold Truth",
      "zone": "Thousand Needles",
      "coords": "34.4, 40.0",
      "detail": "Darkcloud Pinnacle, largest hut",
      "faction": "Neutral",
      "quests": {
        "H": 79947
      },
      "verifiedSeen": 2
    },
    {
      "id": "book-28",
      "itemId": 228136,
      "name": "Ka-Boom!",
      "zone": "Winterspring",
      "coords": "60.7, 37.7",
      "detail": "Everlook, alchemy shop shelf",
      "faction": "Neutral"
    },
    {
      "id": "book-29",
      "itemId": 220346,
      "name": "Legends of the Tidesages",
      "zone": "Tanaris",
      "coords": "72.7, 47.8",
      "detail": "Lost Rigger Cove, bookshelf in the middle building",
      "faction": "Neutral"
    },
    {
      "id": "book-30",
      "itemId": 228133,
      "name": "Magma or Lava?",
      "zone": "Burning Steppes",
      "coords": "Blackrock Mountain",
      "detail": "On the ground before the Blackrock Depths entrance, past Lothos Riftwaker",
      "faction": "Neutral"
    },
    {
      "id": "book-31",
      "itemId": 215820,
      "name": "Mummies: A Guide to the Unsavory Undead",
      "zone": "Badlands",
      "coords": "56.7, 39.8",
      "detail": "Crypt, scrolls beside the skeletons",
      "faction": "Neutral",
      "quests": {
        "A": 79951
      },
      "verifiedSeen": 2
    },
    {
      "id": "book-32",
      "itemId": 228141,
      "name": "Necromancy 101",
      "zone": "Western Plaguelands",
      "coords": "69.4, 72.5",
      "detail": "Caer Darrow, table upstairs outside Scholomance",
      "faction": "Neutral"
    },
    {
      "id": "book-33",
      "itemId": 228134,
      "name": "Northern Kalimdor - A Comprehensive Guide",
      "zone": "Felwood",
      "coords": "65.2, 3.2",
      "detail": "Timbermaw Hold tunnel, beside the middle bridge",
      "faction": "Neutral"
    },
    {
      "id": "book-34",
      "itemId": 220345,
      "name": "Sanguine Sorcery",
      "zone": "Swamp of Sorrows",
      "coords": "70.0, 51.0",
      "detail": "Top of the Temple of Atal'Hakkar, outside the dungeon",
      "faction": "Neutral"
    },
    {
      "id": "book-35",
      "itemId": 228140,
      "name": "Scourge: Undead Menace or Misunderstood?",
      "zone": "Eastern Plaguelands",
      "coords": "26.6, 14.5",
      "detail": "Box before the bridge to Stratholme",
      "faction": "Neutral"
    },
    {
      "id": "book-36",
      "itemId": 220349,
      "name": "Stonewrought Design",
      "zone": "Burning Steppes",
      "coords": "Blackrock Mountain",
      "detail": "Altar at Franclorn Forgewright's tomb",
      "faction": "Neutral"
    },
    {
      "id": "book-37",
      "itemId": 228138,
      "name": "The Knight and the Lady",
      "zone": "Eastern Plaguelands",
      "coords": "47.3, 42.3",
      "detail": "Blackwood Lake, floor of the ruined house",
      "faction": "Neutral"
    },
    {
      "id": "book-38",
      "itemId": 207972,
      "name": "The Lessons of Ta'zo",
      "zone": "Orgrimmar",
      "coords": "38.6, 78.4",
      "detail": "Darkbriar Lodge, large mural stone near the mage trainer",
      "faction": "Horde",
      "quests": {
        "H": 79094
      },
      "verifiedSeen": 2
    },
    {
      "id": "book-39",
      "itemId": 220347,
      "name": "The Liminal and the Arcane",
      "zone": "Unknown",
      "coords": "Not found yet",
      "detail": "Listed in the game files, but neither guide we checked has a location",
      "faction": "Neutral"
    },
    {
      "id": "book-40",
      "itemId": 220350,
      "name": "Venomous Journeys",
      "zone": "The Hinterlands",
      "coords": "35.8, 72.5",
      "detail": "Shadra'Alor, inside the round wall of the eastern ziggurat",
      "faction": "Neutral"
    }
  ]
};
