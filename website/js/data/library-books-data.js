/**
 * World of Warcraft: Forever - Ancient Library Books & Collectibles Dataset
 * 40 Discoverable Tomes, Turn-In Librarians, Coordinates, and Milestone Rewards.
 * Datamined from WoW Forever Client (Build 1.60.1.70707)
 */
(function () {
  'use strict';

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
            "stats": "+3 Stamina, +2 Spirit",
            "icon": "inv_jewelry_necklace_11"
          },
          {
            "id": 277204,
            "name": "Erudite's Amulet",
            "slot": "Neck (iLvl 23)",
            "stats": "+2 Agility, +3 Stamina",
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
            "stats": "+5 Intellect, Equip: +10 Spell Damage and Healing",
            "icon": "inv_jewelry_ring_14"
          },
          {
            "id": 281634,
            "name": "Field Researcher's Loop",
            "slot": "Finger (iLvl 35)",
            "stats": "+7 Agility, +7 Stamina",
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
            "slot": "Ranged Bow (iLvl 38)",
            "stats": "16.8 DPS, +4 Agility, +3 Stamina",
            "icon": "inv_weapon_bow_08"
          },
          {
            "id": 277258,
            "name": "Crest of Elucidation",
            "slot": "Shield (iLvl 38, 924 Armor)",
            "stats": "18 Block, +7 Strength, +5 Stamina",
            "icon": "inv_shield_05"
          },
          {
            "id": 277260,
            "name": "Researcher's Night Light",
            "slot": "Held In Off-Hand (iLvl 38)",
            "stats": "+8 Intellect, +5 Spirit, +11 Spell Damage",
            "icon": "inv_misc_lantern_01"
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
        "detail": "Tower of Azora top level",
        "faction": "Alliance",
        "desc": "Research notes from the Tower of Azora."
      },
      {
        "id": "book-02",
        "itemId": 203754,
        "name": "Archmage Antonidas: The Unabridged Autobiography",
        "zone": "Ironforge",
        "coords": "75.7, 10.5",
        "detail": "Hall of Explorers library shelf",
        "faction": "Neutral",
        "desc": "Somewhat self-indulgent autobiography. Horde players can loot it too."
      },
      {
        "id": "book-03",
        "itemId": 209845,
        "name": "Bewitchments and Glamours",
        "zone": "Westfall",
        "coords": "45.4, 70.4",
        "detail": "Moonbrook Schoolhouse interior",
        "faction": "Neutral",
        "desc": "Spells for manipulation and deception."
      },
      {
        "id": "book-04",
        "itemId": 209848,
        "name": "Goaz Scrolls",
        "zone": "Wetlands",
        "coords": "33.6, 47.9",
        "detail": "Mosshide Fen gnoll camp",
        "faction": "Neutral",
        "desc": "Ancient scrolls found in Mosshide Fen."
      },
      {
        "id": "book-05",
        "itemId": 208860,
        "name": "Rumi of Gnomeregan: The Collected Works",
        "zone": "Dun Morogh",
        "coords": "24.6, 39.8",
        "detail": "Near Gnomeregan engineering bay",
        "faction": "Neutral",
        "desc": "Eccentric poems by the famed gnome mechanist."
      },
      {
        "id": "book-06",
        "itemId": 209850,
        "name": "Runes of the Sorcerer-Kings",
        "zone": "Loch Modan",
        "coords": "77.4, 14.1",
        "detail": "Mo'grosh Stronghold ogre mounds",
        "faction": "Neutral",
        "desc": "Ancient runes from the ogre mage-lords."
      },
      {
        "id": "book-07",
        "itemId": 209844,
        "name": "The Dalaran Digest, Vol. 23",
        "zone": "Silverpine Forest",
        "coords": "63.5, 63.1",
        "detail": "Ambermill watchtower table",
        "faction": "Neutral",
        "desc": "Scholarly commentary on Kirin Tor elemental affairs."
      },
      {
        "id": "book-08",
        "itemId": 210177,
        "name": "Ataeric: On Arcane Curiosities",
        "zone": "Silverpine Forest",
        "coords": "43.4, 41.2",
        "detail": "Sepulcher crypt table",
        "faction": "Horde",
        "desc": "Research on necromantic and shadow curiosities."
      },
      {
        "id": "book-09",
        "itemId": 208185,
        "name": "The Apothecary's Metaphysical Primer",
        "zone": "Tirisfal Glades",
        "coords": "59.4, 52.2",
        "detail": "Brill Town Hall table",
        "faction": "Horde",
        "desc": "Early Royal Apothecary Society experiments on undeath."
      },
      {
        "id": "book-10",
        "itemId": 209843,
        "name": "Nar'thalas Almanac, Vol. 74",
        "zone": "Darkshore",
        "coords": "38.2, 43.1",
        "detail": "Ruins of Mathystra broken pedestal",
        "faction": "Alliance",
        "desc": "Pre-sundering celestial calendar and tidal tables."
      },
      {
        "id": "book-11",
        "itemId": 209851,
        "name": "Fury of the Land",
        "zone": "Stonetalon Mountains",
        "coords": "74.8, 86.2",
        "detail": "Webwinder Path cliff ledge",
        "faction": "Neutral",
        "desc": "Shamanic treatise on tectonic disturbances."
      },
      {
        "id": "book-12",
        "itemId": 209849,
        "name": "Crimes Against Anatomy",
        "zone": "Duskwood",
        "coords": "73.8, 75.2",
        "detail": "Hermit's house in Beggar's Haunt",
        "faction": "Neutral",
        "desc": "Aberrant fleshcrafting experiments by Abercrombie."
      },
      {
        "id": "book-13",
        "itemId": 208800,
        "name": "Baxtan: On Destructive Magics",
        "zone": "Redridge Mountains",
        "coords": "81.4, 78.6",
        "detail": "Stonewatch Keep upper parapet",
        "faction": "Neutral",
        "desc": "Orc warlock notes on explosive hellfire invocations."
      },
      {
        "id": "book-14",
        "itemId": 209846,
        "name": "Secrets of the Dreamers",
        "zone": "Ashenvale",
        "coords": "88.6, 42.1",
        "detail": "Bough Shadow dragon shrine",
        "faction": "Neutral",
        "desc": "Green Dragonflight communion rites."
      },
      {
        "id": "book-15",
        "itemId": 209847,
        "name": "Arcanic Systems Manual",
        "zone": "Gnomeregan",
        "coords": "Dungeon Entrance (42.0, 38.0)",
        "detail": "Clean Zone workshop table",
        "faction": "Neutral",
        "desc": "Troubleshooting high-voltage electromagnets."
      },
      {
        "id": "book-16",
        "itemId": 213165,
        "name": "Basilisks: Should Petrification be Feared?",
        "zone": "Stranglethorn Vale",
        "coords": "41.6, 50.8",
        "detail": "Crystalvein Mine interior",
        "faction": "Neutral",
        "desc": "Field experiments on petrifying gaze and oil of stone."
      },
      {
        "id": "book-17",
        "itemId": 215822,
        "name": "RwlRwlRwlRwl!",
        "zone": "Dustwallow Marsh",
        "coords": "56.4, 12.8",
        "detail": "Witch Hill murloc altar",
        "faction": "Neutral",
        "desc": "Phonetic translation attempt of Nerglish vocal patterns."
      },
      {
        "id": "book-18",
        "itemId": 215816,
        "name": "A Web of Lies: Debunking Myths and Legends",
        "zone": "The Barrens",
        "coords": "52.8, 30.6",
        "detail": "Crossroads watchtower lower shelf",
        "faction": "Neutral",
        "desc": "Critical historical revisions of centaur oral tradition."
      },
      {
        "id": "book-19",
        "itemId": 215824,
        "name": "A Luddite's Guide to Caring for Your Demonic Pet",
        "zone": "Desolace",
        "coords": "56.4, 58.2",
        "detail": "Shadowprey Village coastal cliff",
        "faction": "Neutral",
        "desc": "Satirical imp feeding schedules and brimstone treats."
      },
      {
        "id": "book-20",
        "itemId": 228132,
        "name": "Undead Potatoes",
        "zone": "Hillsbrad Foothills",
        "coords": "28.4, 42.6",
        "detail": "Tarren Mill apothecary shelf",
        "faction": "Neutral",
        "desc": "Bizarre culinary essays on blighted tuber farming."
      },
      {
        "id": "book-21",
        "itemId": 220352,
        "name": "A Mind of Metal",
        "zone": "Badlands",
        "coords": "42.8, 52.4",
        "detail": "Dustwind Dig dwarven ruins",
        "faction": "Neutral",
        "desc": "Titan-forged automaton neural architecture."
      },
      {
        "id": "book-22",
        "itemId": 228135,
        "name": "A Study of the Light",
        "zone": "Elwynn Forest",
        "coords": "40.0, 66.8",
        "detail": "Northshire Abbey library altar",
        "faction": "Alliance",
        "desc": "Fundamental tenets of the Silver Hand and virtuous devotion."
      },
      {
        "id": "book-23",
        "itemId": 220353,
        "name": "Conjurer's Codex",
        "zone": "Stormwind City",
        "coords": "38.8, 80.2",
        "detail": "Wizard's Sanctum inner study",
        "faction": "Alliance",
        "desc": "Conjuration of spring water and cinnamon rolls."
      },
      {
        "id": "book-24",
        "itemId": 215815,
        "name": "Defensive Magics 101",
        "zone": "Darnassus",
        "coords": "24.6, 48.2",
        "detail": "Temple of the Moon second tier",
        "faction": "Alliance",
        "desc": "Warding, mana shields, and sanctuary runes."
      },
      {
        "id": "book-25",
        "itemId": 215817,
        "name": "Demons and You",
        "zone": "Orgrimmar",
        "coords": "54.2, 45.8",
        "detail": "Cleft of Shadows dark enclave",
        "faction": "Horde",
        "desc": "Basic warding circles for reckless apprentice warlocks."
      },
      {
        "id": "book-26",
        "itemId": 220348,
        "name": "Everyday Etiquette",
        "zone": "Undercity",
        "coords": "68.2, 40.4",
        "detail": "Royal Quarter audience chamber",
        "faction": "Horde",
        "desc": "Lordamere court courtesies adapted for rotting lords."
      },
      {
        "id": "book-27",
        "itemId": 215683,
        "name": "Geomancy: The Stone-Cold Truth",
        "zone": "Mulgore",
        "coords": "32.4, 46.8",
        "detail": "Bael'dun Digsite excavator cart",
        "faction": "Neutral",
        "desc": "Trogg earthen rites versus dwarven seismology."
      },
      {
        "id": "book-28",
        "itemId": 228136,
        "name": "Ka-Boom!",
        "zone": "Tanaris",
        "coords": "51.8, 28.2",
        "detail": "Gadgetzan steam workshop floor",
        "faction": "Neutral",
        "desc": "Goblin chemical stoichiometry for catastrophic yields."
      },
      {
        "id": "book-29",
        "itemId": 220346,
        "name": "Legends of the Tidesages",
        "zone": "Southshore",
        "coords": "52.4, 55.8",
        "detail": "Southshore dockmaster hut",
        "faction": "Neutral",
        "desc": "Storm-whispers and sea chantries from Kul Tiras."
      },
      {
        "id": "book-30",
        "itemId": 228133,
        "name": "Magma or Lava?",
        "zone": "Searing Gorge",
        "coords": "38.2, 39.4",
        "detail": "Slag Pit scaffolding",
        "faction": "Neutral",
        "desc": "Thermodynamic distinctions between subterranean basalt."
      },
      {
        "id": "book-31",
        "itemId": 215820,
        "name": "Mummies: A Guide to the Unsavory Undead",
        "zone": "Zul'Farrak",
        "coords": "38.4, 20.0",
        "detail": "Entrance tomb alcove",
        "faction": "Neutral",
        "desc": "Farraki embalming arts and sand-preserved ghasts."
      },
      {
        "id": "book-32",
        "itemId": 228141,
        "name": "Necromancy 101",
        "zone": "Scholomance",
        "coords": "Viewing Room (Exterior)",
        "detail": "Caer Darrow study desk",
        "faction": "Neutral",
        "desc": "Introductory syllabi for Kel'Thuzad's cultist recruits."
      },
      {
        "id": "book-33",
        "itemId": 228134,
        "name": "Northern Kalimdor - A Comprehensive Guide",
        "zone": "Winterspring",
        "coords": "61.0, 38.6",
        "detail": "Everlook bank teller desk",
        "faction": "Neutral",
        "desc": "Topography of the frost-bound peaks and Mount Hyjal."
      },
      {
        "id": "book-34",
        "itemId": 220345,
        "name": "Sanguine Sorcery",
        "zone": "Swamp of Sorrows",
        "coords": "45.0, 56.4",
        "detail": "Sunken Temple courtyard rubble",
        "faction": "Neutral",
        "desc": "Hakkar blood-magic rituals and soul flaying."
      },
      {
        "id": "book-35",
        "itemId": 228140,
        "name": "Scourge: Undead Menace or Misunderstood?",
        "zone": "Western Plaguelands",
        "coords": "42.4, 84.0",
        "detail": "Chillwind Camp command tent",
        "faction": "Neutral",
        "desc": "Controversial political polemic seized by the Argent Dawn."
      },
      {
        "id": "book-36",
        "itemId": 220349,
        "name": "Stonewrought Design",
        "zone": "Loch Modan",
        "coords": "46.2, 13.8",
        "detail": "Stonewrought Dam mechanical chamber",
        "faction": "Alliance",
        "desc": "Architectural blueprints of the grand dam."
      },
      {
        "id": "book-37",
        "itemId": 228138,
        "name": "The Knight and the Lady",
        "zone": "Redridge Mountains",
        "coords": "26.8, 44.2",
        "detail": "Lakeshire Town Hall hearth",
        "faction": "Alliance",
        "desc": "Sentimental romance ballad popular in Stormwind."
      },
      {
        "id": "book-38",
        "itemId": 207972,
        "name": "The Lessons of Ta'zo",
        "zone": "Echo Isles",
        "coords": "56.2, 74.8",
        "detail": "Darkspear witch doctor's cauldron",
        "faction": "Horde",
        "desc": "Troll voodoo rituals and communion with the Loa."
      },
      {
        "id": "book-39",
        "itemId": 220347,
        "name": "The Liminal and the Arcane",
        "zone": "Feralas",
        "coords": "58.4, 43.6",
        "detail": "Dire Maul perimeter ruins",
        "faction": "Neutral",
        "desc": "Shen'dralar highborne spatial dilation studies."
      },
      {
        "id": "book-40",
        "itemId": 220350,
        "name": "Venomous Journeys",
        "zone": "Hinterlands",
        "coords": "26.8, 48.4",
        "detail": "Aerie Peak gryphon roost table",
        "faction": "Neutral",
        "desc": "Wildhammer remedies for spider venom and wyvern stings."
      }
    ]
  };
})();
