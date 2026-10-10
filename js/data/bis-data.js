/**
 * World of Warcraft: Forever - Beta BiS (Best in Slot) Master Dataset
 * Level 30 Phase 2 Beta Cap • Build 1.60.6.71890 (October 2026)
 * 
 * Contains all Spec Configurations across 9 Classes with FULL Ranked Alternatives (#1, #2, #3, #4):
 * - Equipment paper-doll slots (Head, Neck, Shoulder, Back, Chest, Wrist, Hands, Waist, Legs, Feet, Fingers, Trinkets, Weapons, Ranged/Relic)
 * - Complete drop sources (City of Dalaran, Excavation Site 4, RFK, BFD, Gnomeregan, SM Graveyard, Crafting, Quests, World Drops)
 * - Stat budgets, enchant recommendations, and Level 30 talent specs (+5 points from 'Talented' Legacy Perk)
 */

const WOW_BIS_METADATA = {
  "version": "1.60.6.71890",
  "phase": "Beta Phase 2 (Level 30 Cap)",
  "lastUpdated": "October 9, 2026",
  "sourceNotice": "Curated from Beta Discovery logs, Wowhead datamining, and in-game itemcache.wdb extracts.",
  "totalSpecs": 38,
  "totalClasses": 9
};

const WOW_BIS_DATA = {
  "classes": [
    {
      "id": "warrior",
      "name": "Warrior",
      "color": "#C79C6E",
      "icon": "https://render.worldofwarcraft.com/us/icons/56/classicon_warrior.jpg"
    },
    {
      "id": "paladin",
      "name": "Paladin",
      "color": "#F58CBA",
      "icon": "https://render.worldofwarcraft.com/us/icons/56/classicon_paladin.jpg"
    },
    {
      "id": "hunter",
      "name": "Hunter",
      "color": "#ABD473",
      "icon": "https://render.worldofwarcraft.com/us/icons/56/classicon_hunter.jpg"
    },
    {
      "id": "rogue",
      "name": "Rogue",
      "color": "#FFF569",
      "icon": "https://render.worldofwarcraft.com/us/icons/56/classicon_rogue.jpg"
    },
    {
      "id": "priest",
      "name": "Priest",
      "color": "#FFFFFF",
      "icon": "https://render.worldofwarcraft.com/us/icons/56/classicon_priest.jpg"
    },
    {
      "id": "shaman",
      "name": "Shaman",
      "color": "#2B8CFF",
      "icon": "https://render.worldofwarcraft.com/us/icons/56/classicon_shaman.jpg"
    },
    {
      "id": "mage",
      "name": "Mage",
      "color": "#69CCF0",
      "icon": "https://render.worldofwarcraft.com/us/icons/56/classicon_mage.jpg"
    },
    {
      "id": "warlock",
      "name": "Warlock",
      "color": "#9482C9",
      "icon": "https://render.worldofwarcraft.com/us/icons/56/classicon_warlock.jpg"
    },
    {
      "id": "druid",
      "name": "Druid",
      "color": "#FF7D0A",
      "icon": "https://render.worldofwarcraft.com/us/icons/56/classicon_druid.jpg"
    }
  ],
  "warrior": {
    "specs": [
      {
        "id": "pve",
        "name": "Arms PvE",
        "role": "Melee DPS",
        "icon": "https://render.worldofwarcraft.com/us/icons/56/ability_rogue_eviscerate.jpg",
        "weaponType": "Two-Hand Axe / Sword",
        "statSummary": {
          "alliance": {
            "hp": 1334,
            "armor": 1263,
            "str": 174,
            "agi": 128,
            "sta": 114,
            "int": 26,
            "spi": 33,
            "ap": "+58",
            "hit": "3%",
            "crit": "14.2%"
          },
          "horde": {
            "hp": 1354,
            "armor": 1185,
            "str": 170,
            "agi": 126,
            "sta": 116,
            "int": 23,
            "spi": 35,
            "ap": "+74",
            "hit": "3%",
            "crit": "14.0%"
          }
        },
        "talents": {
          "points": "26 / 0 / 0",
          "summary": "Arms Deep Wounds + Sweeping Strikes + Spearing Strike (Level 30 cap + 5 Talented perk points)",
          "buildCode": "FOREVER-WARRIOR-ARMS-30-26-0-0",
          "trees": [
            {
              "name": "Arms",
              "icon": "https://render.worldofwarcraft.com/us/icons/56/ability_rogue_eviscerate.jpg",
              "points": 26,
              "talents": [
                {
                  "name": "Deflection",
                  "rank": "2/5",
                  "desc": "Increases your Parry chance by 2%."
                },
                {
                  "name": "Improved Rend",
                  "rank": "3/3",
                  "desc": "Increases bleed damage of Rend by 35%."
                },
                {
                  "name": "Tactical Mastery",
                  "rank": "5/5",
                  "desc": "Retain up to 25 Rage when changing stances."
                },
                {
                  "name": "Improved Overpower",
                  "rank": "2/2",
                  "desc": "Increases critical strike chance of Overpower by 50%."
                },
                {
                  "name": "Deep Wounds",
                  "rank": "3/3",
                  "desc": "Critical strikes cause enemy to bleed for 60% of weapon damage."
                },
                {
                  "name": "Two-Handed Weapon Spec",
                  "rank": "5/5",
                  "desc": "Increases physical damage with two-handed weapons by 5%."
                },
                {
                  "name": "Impale",
                  "rank": "2/2",
                  "desc": "Increases critical strike damage bonus of abilities by 20%."
                },
                {
                  "name": "Sweeping Strikes",
                  "rank": "1/1",
                  "desc": "Next 5 melee attacks strike an additional nearby enemy."
                },
                {
                  "name": "Spearing Strike",
                  "rank": "1/1",
                  "isNew": true,
                  "desc": "Classic+ Ability: Interrupts enemy spellcasting and locks school for 4 sec in all stances."
                }
              ]
            },
            {
              "name": "Fury",
              "icon": "https://render.worldofwarcraft.com/us/icons/56/ability_warrior_innerrage.jpg",
              "points": 0,
              "talents": []
            },
            {
              "name": "Protection",
              "icon": "https://render.worldofwarcraft.com/us/icons/56/inv_shield_06.jpg",
              "points": 0,
              "talents": []
            }
          ]
        },
        "gear": {
          "head": {
            "name": "Infiltrator Cap of the Tiger",
            "quality": "q2",
            "icon": "inv_helmet_15.jpg",
            "stats": "+8 Str, +8 Agi",
            "enchant": "Lesser Arcanum of Voracity (+8 Str)",
            "source": "World drop, sold at the auction house",
            "alts": [
              {
                "name": "Tusken Helm",
                "quality": "q3",
                "icon": "inv_helmet_09.jpg",
                "stats": "+15 Sta, +7 Agi",
                "source": "Overlord Ramtusk, Razorfen Kraul"
              },
              {
                "name": "Veteran's Silvered Chain Helm",
                "quality": "q3",
                "icon": "inv_helmet_39.jpg",
                "stats": "+10 Str, +8 Sta, +1% Crit",
                "source": "Blacksmithing (95)"
              },
              {
                "name": "Defender's Leather Helm",
                "quality": "q3",
                "icon": "inv_helmet_33.jpg",
                "stats": "+9 Str, +9 Sta, +6 Agi",
                "source": "Dungeon Bosses (BFD / RFK / Stockade)"
              }
            ]
          },
          "neck": {
            "name": "Ghostshard Talisman",
            "quality": "q3",
            "icon": "inv_jewelry_necklace_06.jpg",
            "stats": "+11 Sta, +4 Str",
            "enchant": "None",
            "source": "Azshir the Sleepless, Scarlet Monastery Graveyard (33.9%)",
            "alts": [
              {
                "name": "Archmagister's Faceted Pendant",
                "quality": "q3",
                "icon": "inv_misc_necklacea8.jpg",
                "stats": "+6 Int, +12 AP, +Undead Bonus XP",
                "source": "Shade of the Archmage, City of Dalaran"
              },
              {
                "name": "Thermaplugg Medal of Honor",
                "quality": "q3",
                "icon": "inv_jewelry_amulet_03.jpg",
                "stats": "+8 Sta, +7 Str",
                "source": "Mekgineer Thermaplugg, Gnomeregan"
              },
              {
                "name": "Cerulean Talisman of the Tiger",
                "quality": "q2",
                "icon": "inv_jewelry_necklace_01.jpg",
                "stats": "+5 Str, +5 Agi",
                "source": "World Drop"
              }
            ]
          },
          "shoulder": {
            "name": "Forest Tracker Epaulets",
            "quality": "q3",
            "icon": "inv_shoulder_18.jpg",
            "stats": "+11 Agi, +5 Str",
            "enchant": "None",
            "source": "World drop, sold at the auction house",
            "alts": [
              {
                "name": "Cutthroat's Mantle of the Tiger",
                "quality": "q2",
                "icon": "inv_shoulder_11.jpg",
                "stats": "+7 Str, +7 Agi",
                "source": "World Drop"
              },
              {
                "name": "Sanguine Pauldrons",
                "quality": "q2",
                "icon": "inv_shoulder_29.jpg",
                "stats": "+9 Str, +5 Sta",
                "source": "Quest: The Karnitol Shipwreck (Alliance, lvl 30)"
              },
              {
                "name": "Brigand's Pauldrons",
                "quality": "q2",
                "icon": "inv_shoulder_03.jpg",
                "stats": "+8 Str, +6 Sta",
                "source": "Quest: Taretha's Gift (Horde, lvl 29)"
              },
              {
                "name": "Barbaric Shoulders",
                "quality": "q2",
                "icon": "inv_shoulder_08.jpg",
                "stats": "+7 Str, +6 Sta",
                "source": "Leatherworking (175)"
              }
            ]
          },
          "back": {
            "name": "Hawkeye's Cloak",
            "quality": "q2",
            "icon": "inv_misc_cape_03.jpg",
            "stats": "+8 Agi, +3 Sta",
            "enchant": "Lesser Agility (+3 Agility)",
            "source": "World drop, sold at the auction house",
            "alts": [
              {
                "name": "Twilight Cape of the Tiger",
                "quality": "q2",
                "icon": "inv_misc_cape_13.jpg",
                "stats": "+5 Str, +5 Agi",
                "source": "World Drop"
              },
              {
                "name": "Crocolisk Skin Gaiter",
                "quality": "q3",
                "icon": "inv_misc_monsterscales_02.jpg",
                "stats": "+6 Str, +6 Sta, +5 Agi",
                "source": "Excavation Site 4 Quest, Wetlands"
              },
              {
                "name": "Drape of Shifting Energy",
                "quality": "q3",
                "icon": "inv_misc_cape_18.jpg",
                "stats": "+7 Sta, +6 Str",
                "source": "Arcanic Enigma, City of Dalaran"
              }
            ]
          },
          "chest": {
            "name": "Avenger's Armor",
            "quality": "q3",
            "icon": "inv_chest_chain.jpg",
            "stats": "+15 Str, +7 Sta",
            "enchant": "Greater Health (+35 Health)",
            "source": "Trash mobs, Razorfen Kraul (0.03% World Drop)",
            "alts": [
              {
                "name": "Infiltrator Armor of the Tiger",
                "quality": "q2",
                "icon": "inv_chest_leather_03.jpg",
                "stats": "+11 Str, +11 Agi",
                "source": "World Drop"
              },
              {
                "name": "Veteran's Silvered Chain Shirt",
                "quality": "q3",
                "icon": "inv_chest_chain_07.jpg",
                "stats": "+12 Str, +10 Sta, +8 Agi",
                "source": "Blacksmithing (110 Specialist)"
              },
              {
                "name": "Shining Silver Breastplate",
                "quality": "q3",
                "icon": "inv_chest_plate15.jpg",
                "stats": "+14 Str, +8 Sta",
                "source": "Blacksmithing (145)"
              },
              {
                "name": "Mana-Warped Chain Shirt",
                "quality": "q3",
                "icon": "inv_chest_chain_04.jpg",
                "stats": "+13 Str, +9 Sta",
                "source": "Arcane Anomaly, City of Dalaran"
              }
            ]
          },
          "wrist": {
            "name": "Unearthed Bands of the Tiger",
            "quality": "q3",
            "icon": "inv_bracer_06.jpg",
            "stats": "+7 Str, +7 Agi",
            "enchant": "Lesser Strength (+5 Strength)",
            "source": "Trash mobs, Uldaman / World Rare Drop",
            "alts": [
              {
                "name": "Arathi Armbands",
                "quality": "q2",
                "icon": "inv_bracer_09.jpg",
                "stats": "+7 Str, +4 Sta",
                "source": "Quest: Wanted! Otto and Falconcrest (Alliance)"
              },
              {
                "name": "Pugilist Bracers",
                "quality": "q3",
                "icon": "inv_bracer_03.jpg",
                "stats": "+7 Sta, +4 Agi, +3 Str",
                "source": "Trash mobs, Razorfen Kraul"
              },
              {
                "name": "Hawkeye's Bracers",
                "quality": "q2",
                "icon": "inv_bracer_04.jpg",
                "stats": "+6 Agi, +3 Sta",
                "source": "World Drop"
              }
            ]
          },
          "hands": {
            "name": "Tiger Hunter Gloves",
            "quality": "q2",
            "icon": "inv_gauntlets_04.jpg",
            "stats": "+9 Str, +8 Agi",
            "enchant": "Strength (+7 Strength)",
            "source": "Quest: Tiger Mastery (Stranglethorn Vale, lvl 28+)",
            "alts": [
              {
                "name": "Algae Fists",
                "quality": "q3",
                "icon": "inv_gauntlets_22.jpg",
                "stats": "+10 Str, +8 Sta",
                "source": "Gelihast, Blackfathom Deeps"
              },
              {
                "name": "Veteran's Silvered Chain Gauntlets",
                "quality": "q3",
                "icon": "inv_gauntlets_16.jpg",
                "stats": "+9 Str, +7 Sta, +6 Agi",
                "source": "Blacksmithing (105)"
              },
              {
                "name": "True-Aim Stalkers",
                "quality": "q3",
                "icon": "inv_gauntlets_28.jpg",
                "stats": "+8 Str, +8 Agi, +1% Hit",
                "source": "Excavation Site 4 Boss"
              }
            ]
          },
          "waist": {
            "name": "Officer's Belt",
            "quality": "q3",
            "icon": "inv_belt_20.jpg",
            "stats": "+12 Str, +6 Sta",
            "enchant": "None",
            "source": "PvP Rank 4 Honor Vendor (Grooming / Blood Guard)",
            "alts": [
              {
                "name": "Cobrahn's Grasp",
                "quality": "q3",
                "icon": "inv_belt_12.jpg",
                "stats": "+8 Agi, +5 Sta, +5 Str",
                "source": "Lord Cobrahn, Wailing Caverns"
              },
              {
                "name": "Veteran's Silvered Chain Girdle",
                "quality": "q3",
                "icon": "inv_belt_15.jpg",
                "stats": "+9 Str, +7 Sta",
                "source": "Blacksmithing (100)"
              },
              {
                "name": "Ogron's Sash",
                "quality": "q3",
                "icon": "inv_belt_03.jpg",
                "stats": "+10 Str, +6 Sta",
                "source": "World Drop"
              }
            ]
          },
          "legs": {
            "name": "Veteran's Silvered Chain Leggings",
            "quality": "q3",
            "icon": "inv_pants_mail_05.jpg",
            "stats": "+14 Str, +11 Sta, +8 Agi",
            "enchant": "Attack Power +6 and Armor +24",
            "source": "Blacksmithing (120 - WoW Forever New Recipe)",
            "alts": [
              {
                "name": "Triprunner Dungarees",
                "quality": "q3",
                "icon": "inv_pants_06.jpg",
                "stats": "+18 Agi, +4 Sta",
                "source": "Quest: The Great Fras Siabi (Gnomeregan)"
              },
              {
                "name": "Gryphon Rider's Leggings",
                "quality": "q3",
                "icon": "inv_pants_03.jpg",
                "stats": "+13 Str, +8 Sta",
                "source": "Excavation Site 4 Quest"
              },
              {
                "name": "Infiltrator Leggings of the Tiger",
                "quality": "q2",
                "icon": "inv_pants_08.jpg",
                "stats": "+10 Str, +10 Agi",
                "source": "World Drop"
              }
            ]
          },
          "feet": {
            "name": "Shapeshifting Sentinel's Strides",
            "quality": "q3",
            "icon": "inv_boots_chain_08.jpg",
            "stats": "+11 Str, +9 Agi, +7 Sta",
            "enchant": "Lesser Agility (+4 Agility)",
            "source": "Lord Pythas / Aku'mai, Blackfathom Deeps (Forever Re-itemized)",
            "allianceBis": {
              "name": "Trouncing Boots",
              "quality": "q2",
              "icon": "inv_boots_01.jpg",
              "stats": "+9 Str, +8 Agi",
              "source": "Quest: The Karnitol Shipwreck (Alliance)"
            },
            "alts": [
              {
                "name": "Silvered Bronze Boots",
                "quality": "q2",
                "icon": "inv_boots_chain_03.jpg",
                "stats": "+7 Str, +5 Sta",
                "source": "Blacksmithing (130)"
              },
              {
                "name": "Excavator's Work Boots",
                "quality": "q3",
                "icon": "inv_boots_chain_06.jpg",
                "stats": "+8 Str, +8 Sta, +5 Agi",
                "source": "Excavation Site 4 Overseer"
              },
              {
                "name": "Trouncing Boots",
                "quality": "q2",
                "icon": "inv_boots_01.jpg",
                "stats": "+9 Str, +8 Agi",
                "source": "The Karnitol Shipwreck (Alliance)"
              }
            ]
          },
          "finger1": {
            "name": "Wyvern Heart Band",
            "quality": "q3",
            "icon": "inv_jewelry_ring_25.jpg",
            "stats": "+7 Str, +6 Agi, +5 Sta",
            "enchant": "None",
            "source": "Rare World Drop / Harpy Matriarch, Thousand Needles",
            "alts": [
              {
                "name": "Tigerstrike Signet",
                "quality": "q3",
                "icon": "inv_jewelry_ring_16.jpg",
                "stats": "+8 Str, +5 Agi",
                "source": "King Bangalash, Stranglethorn Vale"
              },
              {
                "name": "Seal of Wrynn",
                "quality": "q3",
                "icon": "inv_jewelry_ring_12.jpg",
                "stats": "+3 Str, +4 Agi, +4 Sta, +3 Int",
                "source": "Quest: The Missing Diplomat (Alliance)"
              },
              {
                "name": "Blackstone Ring",
                "quality": "q3",
                "icon": "inv_jewelry_ring_17.jpg",
                "stats": "+6 Str, +1% Hit",
                "source": "Princess Theradras, Maraudon"
              }
            ]
          },
          "finger2": {
            "name": "Wyvern Heart Band",
            "quality": "q3",
            "icon": "inv_jewelry_ring_25.jpg",
            "stats": "+7 Str, +6 Agi, +5 Sta",
            "enchant": "None",
            "source": "Rare World Drop / Harpy Matriarch, Thousand Needles",
            "alts": [
              {
                "name": "Blackstone Ring",
                "quality": "q3",
                "icon": "inv_jewelry_ring_17.jpg",
                "stats": "+6 Str, +1% Hit",
                "source": "Princess Theradras, Maraudon (lvl 45+ target)"
              },
              {
                "name": "Savory Devourer Band",
                "quality": "q2",
                "icon": "inv_jewelry_ring_08.jpg",
                "stats": "+6 Str, +5 Sta",
                "source": "Excavation Site 4 Rare"
              },
              {
                "name": "Tigerstrike Signet",
                "quality": "q3",
                "icon": "inv_jewelry_ring_16.jpg",
                "stats": "+8 Str, +5 Agi",
                "source": "King Bangalash, STV"
              }
            ]
          },
          "trinket1": {
            "name": "Minor Recombobulator",
            "quality": "q2",
            "icon": "inv_gizmo_07.jpg",
            "stats": "Use: Restores 150 to 250 health and 150 to 250 mana; cures polymorph",
            "enchant": "None",
            "source": "Engineering (140) / Vendor Gnomeregan",
            "alts": [
              {
                "name": "Insignia of the Alliance / Horde",
                "quality": "q3",
                "icon": "inv_jewelry_trinketpvp_01.jpg",
                "stats": "Use: Dispels fear, stun, and sleep",
                "source": "PvP Rank 2 Honor Vendor"
              },
              {
                "name": "Gyromatic Icemaker",
                "quality": "q2",
                "icon": "inv_gizmo_03.jpg",
                "stats": "Use: Blasts target with frost dealing damage",
                "source": "Engineering (145)"
              },
              {
                "name": "Rune of Duty",
                "quality": "q2",
                "icon": "inv_misc_rune_01.jpg",
                "stats": "+10 Stamina",
                "source": "Warsong Gulch Friendly Vendor"
              }
            ]
          },
          "trinket2": {
            "name": "Dog Whistle",
            "quality": "q3",
            "icon": "ability_hunter_beastcall.jpg",
            "stats": "Use: Summons a tracking hound to fight for you for 10 min",
            "enchant": "None",
            "source": "Houndmaster Loksey, Scarlet Monastery Graveyard",
            "alts": [
              {
                "name": "Smolderweb Eye",
                "quality": "q3",
                "icon": "inv_misc_gem_pearl_04.jpg",
                "stats": "Use: Shoots a web immobilizing target for 5 sec",
                "source": "Mother Smolderweb, LBRS Rare / World Quest"
              },
              {
                "name": "Insignia of the Alliance / Horde",
                "quality": "q3",
                "icon": "inv_jewelry_trinketpvp_01.jpg",
                "stats": "Use: Dispels fear, stun, and sleep",
                "source": "PvP Rank 2 Honor Vendor"
              },
              {
                "name": "Minor Recombobulator",
                "quality": "q2",
                "icon": "inv_gizmo_07.jpg",
                "stats": "Use: Restores HP/Mana, cures polymorph",
                "source": "Engineering (140)"
              }
            ]
          },
          "mainHand": {
            "name": "Whirlwind Axe",
            "quality": "q3",
            "icon": "inv_axe_12.jpg",
            "stats": "3.60 Speed • 102-154 Dmg (35.6 DPS) • +15 Str, +14 Sta",
            "enchant": "Weapon Damage +6 (or Crusader)",
            "source": "Warrior Class Quest (Level 30 Questline - Cyclonian in Arathi)",
            "alts": [
              {
                "name": "Whirlwind Sword",
                "quality": "q3",
                "icon": "inv_sword_26.jpg",
                "stats": "2.90 Speed • 82-124 Dmg • +15 Str, +14 Sta",
                "source": "Warrior Class Quest (Cyclonian)"
              },
              {
                "name": "Corpsemaker",
                "quality": "q3",
                "icon": "inv_axe_14.jpg",
                "stats": "3.80 Speed • 92-139 Dmg (30.4 DPS) • +15 Str, +8 Sta",
                "source": "Overlord Ramtusk, Razorfen Kraul"
              },
              {
                "name": "Archon Greatsword",
                "quality": "q3",
                "icon": "inv_sword_33.jpg",
                "stats": "3.40 Speed • +13 Str, +12 Agi",
                "source": "City of Dalaran Boss"
              }
            ]
          },
          "offHand": {
            "name": "Two-Handed Grip",
            "quality": "q1",
            "icon": "inv_misc_questionmark.jpg",
            "stats": "Held by Two-Hander",
            "enchant": "None",
            "source": "Requires Two-Handed Weapon equipped",
            "alts": [
              {
                "name": "Cruel Barb",
                "quality": "q3",
                "icon": "inv_sword_19.jpg",
                "stats": "2.80 Speed • 18.2 DPS • +12 AP",
                "source": "Edwin VanCleef, Deadmines"
              },
              {
                "name": "Tail Spike",
                "quality": "q3",
                "icon": "inv_sword_25.jpg",
                "stats": "1.70 Fast Speed • 18.0 DPS • +5 Agi, +3 Sta",
                "source": "Razorfen Kraul"
              },
              {
                "name": "Toxic Revenger",
                "quality": "q3",
                "icon": "inv_weapon_shortblade_05.jpg",
                "stats": "2.70 Speed • 18.9 DPS • Chance on hit: Poison",
                "source": "Gnomeregan"
              }
            ]
          },
          "ranged": {
            "name": "Master Hunter's Rifle",
            "quality": "q2",
            "icon": "inv_weapon_rifle_05.jpg",
            "stats": "+4 Agi, +3 Sta",
            "enchant": "Standard Scope (+2 Dmg)",
            "source": "Quest: Master Hunter (Nessingwary Stranglethorn Vale)",
            "alts": [
              {
                "name": "Nightstalker Bow",
                "quality": "q2",
                "icon": "inv_weapon_bow_08.jpg",
                "stats": "+5 Agi, +2 Sta",
                "source": "World Drop"
              },
              {
                "name": "Excavation Carbine",
                "quality": "q3",
                "icon": "inv_weapon_rifle_01.jpg",
                "stats": "+6 Agi, +4 Str",
                "source": "Excavation Site 4 Overseer"
              },
              {
                "name": "Venomstrike",
                "quality": "q3",
                "icon": "inv_weapon_bow_01.jpg",
                "stats": "Chance on hit: 31-45 Poison damage",
                "source": "Lord Cobrahn, Wailing Caverns"
              }
            ]
          }
        }
      },
      {
        "id": "pvp",
        "name": "Arms PvP",
        "role": "Burst Melee DPS",
        "icon": "https://render.worldofwarcraft.com/us/icons/56/ability_warrior_innerrage.jpg",
        "weaponType": "Two-Hand Axe / Mace",
        "statSummary": {
          "alliance": {
            "hp": 1540,
            "armor": 1420,
            "str": 152,
            "agi": 104,
            "sta": 158,
            "int": 26,
            "spi": 33,
            "ap": "+44",
            "hit": "3%",
            "crit": "12.8%"
          },
          "horde": {
            "hp": 1560,
            "armor": 1350,
            "str": 148,
            "agi": 102,
            "sta": 160,
            "int": 23,
            "spi": 35,
            "ap": "+58",
            "hit": "3%",
            "crit": "12.6%"
          }
        },
        "talents": {
          "points": "26 / 0 / 0",
          "summary": "Improved Hamstring + Tactical Mastery + Sweeping Strikes + Spearing Strike interrupt",
          "buildCode": "FOREVER-WARRIOR-ARMS-30-26-0-0",
          "trees": [
            {
              "name": "Arms",
              "icon": "https://render.worldofwarcraft.com/us/icons/56/ability_rogue_eviscerate.jpg",
              "points": 26,
              "talents": [
                {
                  "name": "Deflection",
                  "rank": "2/5",
                  "desc": "Increases your Parry chance by 2%."
                },
                {
                  "name": "Improved Rend",
                  "rank": "3/3",
                  "desc": "Increases bleed damage of Rend by 35%."
                },
                {
                  "name": "Tactical Mastery",
                  "rank": "5/5",
                  "desc": "Retain up to 25 Rage when changing stances."
                },
                {
                  "name": "Improved Overpower",
                  "rank": "2/2",
                  "desc": "Increases critical strike chance of Overpower by 50%."
                },
                {
                  "name": "Deep Wounds",
                  "rank": "3/3",
                  "desc": "Critical strikes cause enemy to bleed for 60% of weapon damage."
                },
                {
                  "name": "Two-Handed Weapon Spec",
                  "rank": "5/5",
                  "desc": "Increases physical damage with two-handed weapons by 5%."
                },
                {
                  "name": "Impale",
                  "rank": "2/2",
                  "desc": "Increases critical strike damage bonus of abilities by 20%."
                },
                {
                  "name": "Sweeping Strikes",
                  "rank": "1/1",
                  "desc": "Next 5 melee attacks strike an additional nearby enemy."
                },
                {
                  "name": "Spearing Strike",
                  "rank": "1/1",
                  "isNew": true,
                  "desc": "Classic+ Ability: Interrupts enemy spellcasting and locks school for 4 sec in all stances."
                }
              ]
            },
            {
              "name": "Fury",
              "icon": "https://render.worldofwarcraft.com/us/icons/56/ability_warrior_innerrage.jpg",
              "points": 0,
              "talents": []
            },
            {
              "name": "Protection",
              "icon": "https://render.worldofwarcraft.com/us/icons/56/inv_shield_06.jpg",
              "points": 0,
              "talents": []
            }
          ]
        },
        "gear": {
          "head": {
            "name": "Tusken Helm",
            "quality": "q3",
            "icon": "inv_helmet_09.jpg",
            "stats": "+15 Sta, +7 Agi",
            "enchant": "Lesser Arcanum of Constitution (+100 HP)",
            "source": "Overlord Ramtusk, Razorfen Kraul",
            "alts": [
              {
                "name": "Veteran's Silvered Chain Helm",
                "quality": "q3",
                "icon": "inv_helmet_39.jpg",
                "stats": "+10 Str, +8 Sta, +1% Crit",
                "source": "Blacksmithing (95)"
              },
              {
                "name": "Infiltrator Cap of the Tiger",
                "quality": "q2",
                "icon": "inv_helmet_15.jpg",
                "stats": "+8 Str, +8 Agi",
                "source": "World Drop / Auction House"
              },
              {
                "name": "Green Tinted Goggles",
                "quality": "q2",
                "icon": "inv_gizmo_01.jpg",
                "stats": "+8 Sta, +8 Agi",
                "source": "Engineering (150)"
              }
            ]
          },
          "neck": {
            "name": "Ghostshard Talisman",
            "quality": "q3",
            "icon": "inv_jewelry_necklace_06.jpg",
            "stats": "+11 Sta, +4 Str",
            "enchant": "None",
            "source": "Azshir the Sleepless, Scarlet Monastery Graveyard",
            "alts": [
              {
                "name": "Thermaplugg Medal of Honor",
                "quality": "q3",
                "icon": "inv_jewelry_amulet_03.jpg",
                "stats": "+8 Sta, +7 Str",
                "source": "Mekgineer Thermaplugg, Gnomeregan"
              },
              {
                "name": "Mark of the Pack Leader",
                "quality": "q3",
                "icon": "inv_jewelry_necklace_04.jpg",
                "stats": "+8 Agi, +6 Sta",
                "source": "The Barrens Rare / Quest"
              },
              {
                "name": "Fossilized Amber Pendant",
                "quality": "q3",
                "icon": "inv_jewelry_necklace_12.jpg",
                "stats": "+7 Agi, +5 Sta, +4 Str",
                "source": "Excavation Site 4 Boss"
              }
            ]
          },
          "shoulder": {
            "name": "Brigand's Pauldrons",
            "quality": "q2",
            "icon": "inv_shoulder_03.jpg",
            "stats": "+8 Str, +6 Sta",
            "enchant": "None",
            "source": "Quest: Taretha's Gift (Horde) / Sanguine Pauldrons (Alliance)",
            "alts": [
              {
                "name": "Forest Tracker Epaulets",
                "quality": "q3",
                "icon": "inv_shoulder_18.jpg",
                "stats": "+11 Agi, +5 Str",
                "source": "World Drop"
              },
              {
                "name": "Cutthroat's Mantle of the Tiger",
                "quality": "q2",
                "icon": "inv_shoulder_11.jpg",
                "stats": "+7 Str, +7 Agi",
                "source": "World Drop"
              },
              {
                "name": "Barbaric Shoulders",
                "quality": "q2",
                "icon": "inv_shoulder_08.jpg",
                "stats": "+7 Str, +6 Sta",
                "source": "Leatherworking (175)"
              }
            ]
          },
          "back": {
            "name": "Crocolisk Skin Gaiter",
            "quality": "q3",
            "icon": "inv_misc_monsterscales_02.jpg",
            "stats": "+6 Str, +6 Sta, +5 Agi",
            "enchant": "Lesser Agility (+3 Agi)",
            "source": "Excavation Site 4 Quest, Wetlands",
            "alts": [
              {
                "name": "Hawkeye's Cloak",
                "quality": "q2",
                "icon": "inv_misc_cape_03.jpg",
                "stats": "+8 Agi, +3 Sta",
                "source": "World Drop"
              },
              {
                "name": "Batwing Cloak",
                "quality": "q3",
                "icon": "inv_misc_cape_06.jpg",
                "stats": "+5 Agi, +7 Sta",
                "source": "Razorfen Kraul"
              },
              {
                "name": "Drape of Shifting Energy",
                "quality": "q3",
                "icon": "inv_misc_cape_18.jpg",
                "stats": "+7 Sta, +6 Str",
                "source": "City of Dalaran"
              }
            ]
          },
          "chest": {
            "name": "Shining Silver Breastplate",
            "quality": "q3",
            "icon": "inv_chest_plate15.jpg",
            "stats": "+14 Str, +8 Sta",
            "enchant": "Greater Health (+35 Health)",
            "source": "Blacksmithing (145)",
            "alts": [
              {
                "name": "Avenger's Armor",
                "quality": "q3",
                "icon": "inv_chest_chain.jpg",
                "stats": "+15 Str, +7 Sta",
                "source": "Trash, Razorfen Kraul"
              },
              {
                "name": "Mana-Warped Chain Shirt",
                "quality": "q3",
                "icon": "inv_chest_chain_04.jpg",
                "stats": "+13 Str, +9 Sta",
                "source": "City of Dalaran"
              },
              {
                "name": "Veteran's Silvered Chain Shirt",
                "quality": "q3",
                "icon": "inv_chest_chain_07.jpg",
                "stats": "+12 Str, +10 Sta, +8 Agi",
                "source": "Blacksmithing (110)"
              }
            ]
          },
          "wrist": {
            "name": "Pugilist Bracers",
            "quality": "q3",
            "icon": "inv_bracer_03.jpg",
            "stats": "+7 Sta, +4 Agi, +3 Str",
            "enchant": "Lesser Stamina (+5 Stamina)",
            "source": "Trash mobs, Razorfen Kraul",
            "alts": [
              {
                "name": "Unearthed Bands of the Tiger",
                "quality": "q3",
                "icon": "inv_bracer_06.jpg",
                "stats": "+7 Str, +7 Agi",
                "source": "World Drop"
              },
              {
                "name": "Arathi Armbands",
                "quality": "q2",
                "icon": "inv_bracer_09.jpg",
                "stats": "+7 Str, +4 Sta",
                "source": "Arathi Quest"
              },
              {
                "name": "Hawkeye's Bracers",
                "quality": "q2",
                "icon": "inv_bracer_04.jpg",
                "stats": "+6 Agi, +3 Sta",
                "source": "World Drop"
              }
            ]
          },
          "hands": {
            "name": "Algae Fists",
            "quality": "q3",
            "icon": "inv_gauntlets_22.jpg",
            "stats": "+10 Str, +8 Sta",
            "enchant": "Strength (+7 Str)",
            "source": "Gelihast, Blackfathom Deeps",
            "alts": [
              {
                "name": "Tiger Hunter Gloves",
                "quality": "q2",
                "icon": "inv_gauntlets_04.jpg",
                "stats": "+9 Str, +8 Agi",
                "source": "Quest: Tiger Mastery"
              },
              {
                "name": "True-Aim Stalkers",
                "quality": "q3",
                "icon": "inv_gauntlets_28.jpg",
                "stats": "+9 Agi, +6 Sta, +1% Hit",
                "source": "Excavation Site 4 Boss"
              },
              {
                "name": "Veteran's Silvered Chain Gauntlets",
                "quality": "q3",
                "icon": "inv_gauntlets_16.jpg",
                "stats": "+9 Str, +7 Sta, +6 Agi",
                "source": "Blacksmithing (105)"
              }
            ]
          },
          "waist": {
            "name": "Officer's Belt",
            "quality": "q3",
            "icon": "inv_belt_20.jpg",
            "stats": "+12 Str, +6 Sta",
            "enchant": "None",
            "source": "PvP Rank 4 Honor Vendor",
            "alts": [
              {
                "name": "Cobrahn's Grasp",
                "quality": "q3",
                "icon": "inv_belt_12.jpg",
                "stats": "+8 Agi, +5 Sta, +5 Str",
                "source": "Wailing Caverns"
              },
              {
                "name": "Ogron's Sash",
                "quality": "q3",
                "icon": "inv_belt_03.jpg",
                "stats": "+10 Str, +6 Sta",
                "source": "World Drop"
              },
              {
                "name": "Veteran's Silvered Chain Girdle",
                "quality": "q3",
                "icon": "inv_belt_15.jpg",
                "stats": "+9 Str, +7 Sta",
                "source": "Blacksmithing (100)"
              }
            ]
          },
          "legs": {
            "name": "Veteran's Silvered Chain Leggings",
            "quality": "q3",
            "icon": "inv_pants_mail_05.jpg",
            "stats": "+14 Str, +11 Sta, +8 Agi",
            "enchant": "Armor +24 and Stamina +10",
            "source": "Blacksmithing (120)",
            "alts": [
              {
                "name": "Gryphon Rider's Leggings",
                "quality": "q3",
                "icon": "inv_pants_03.jpg",
                "stats": "+13 Str, +8 Sta",
                "source": "Excavation Site 4"
              },
              {
                "name": "Triprunner Dungarees",
                "quality": "q3",
                "icon": "inv_pants_06.jpg",
                "stats": "+18 Agi, +4 Sta",
                "source": "Gnomeregan Quest"
              },
              {
                "name": "Infiltrator Leggings of the Tiger",
                "quality": "q2",
                "icon": "inv_pants_08.jpg",
                "stats": "+10 Str, +10 Agi",
                "source": "World Drop"
              }
            ]
          },
          "feet": {
            "name": "Excavator's Work Boots",
            "quality": "q3",
            "icon": "inv_boots_chain_06.jpg",
            "stats": "+8 Str, +8 Sta, +5 Agi",
            "enchant": "Minor Speed (+8% Movement Speed)",
            "source": "Excavation Site 4 Overseer",
            "alts": [
              {
                "name": "Shapeshifting Sentinel's Strides",
                "quality": "q3",
                "icon": "inv_boots_chain_08.jpg",
                "stats": "+11 Str, +9 Agi, +7 Sta",
                "source": "Blackfathom Deeps"
              },
              {
                "name": "Trouncing Boots",
                "quality": "q2",
                "icon": "inv_boots_01.jpg",
                "stats": "+9 Str, +8 Agi",
                "source": "The Karnitol Shipwreck (Alliance)"
              },
              {
                "name": "Silvered Bronze Boots",
                "quality": "q2",
                "icon": "inv_boots_chain_03.jpg",
                "stats": "+7 Str, +5 Sta",
                "source": "Blacksmithing (130)"
              }
            ]
          },
          "finger1": {
            "name": "Wyvern Heart Band",
            "quality": "q3",
            "icon": "inv_jewelry_ring_25.jpg",
            "stats": "+7 Str, +6 Agi, +5 Sta",
            "enchant": "None",
            "source": "Rare World Drop / Harpy Matriarch",
            "alts": [
              {
                "name": "Seal of Wrynn",
                "quality": "q3",
                "icon": "inv_jewelry_ring_12.jpg",
                "stats": "+3 Str, +4 Agi, +4 Sta",
                "source": "Alliance Quest"
              },
              {
                "name": "Tigerstrike Signet",
                "quality": "q3",
                "icon": "inv_jewelry_ring_16.jpg",
                "stats": "+8 Str, +5 Agi",
                "source": "King Bangalash, STV"
              },
              {
                "name": "Blackstone Ring",
                "quality": "q3",
                "icon": "inv_jewelry_ring_17.jpg",
                "stats": "+6 Str, +1% Hit",
                "source": "Princess Theradras, Maraudon"
              }
            ]
          },
          "finger2": {
            "name": "Savory Devourer Band",
            "quality": "q2",
            "icon": "inv_jewelry_ring_08.jpg",
            "stats": "+6 Str, +5 Sta",
            "enchant": "None",
            "source": "Excavation Site 4 Rare",
            "alts": [
              {
                "name": "Tigerstrike Signet",
                "quality": "q3",
                "icon": "inv_jewelry_ring_16.jpg",
                "stats": "+8 Str, +5 Agi",
                "source": "Stranglethorn Vale"
              },
              {
                "name": "Wyvern Heart Band",
                "quality": "q3",
                "icon": "inv_jewelry_ring_25.jpg",
                "stats": "+7 Str, +6 Agi, +5 Sta",
                "source": "Harpy Matriarch / World Drop"
              },
              {
                "name": "Blackstone Ring",
                "quality": "q3",
                "icon": "inv_jewelry_ring_17.jpg",
                "stats": "+6 Str, +1% Hit",
                "source": "Princess Theradras, Maraudon"
              }
            ]
          },
          "trinket1": {
            "name": "Insignia of the Alliance / Horde",
            "quality": "q3",
            "icon": "inv_jewelry_trinketpvp_01.jpg",
            "stats": "Use: Dispels fear, stun, and sleep",
            "enchant": "None",
            "source": "PvP Rank 2 Honor Vendor",
            "alts": [
              {
                "name": "Minor Recombobulator",
                "quality": "q2",
                "icon": "inv_gizmo_07.jpg",
                "stats": "Cures polymorph & restores HP",
                "source": "Engineering"
              },
              {
                "name": "Gyromatic Icemaker",
                "quality": "q2",
                "icon": "inv_gizmo_03.jpg",
                "stats": "Use: Blasts target with frost dealing damage",
                "source": "Engineering (145)"
              },
              {
                "name": "Rune of Duty",
                "quality": "q2",
                "icon": "inv_misc_rune_01.jpg",
                "stats": "+10 Stamina",
                "source": "Warsong Gulch Friendly Vendor"
              }
            ]
          },
          "trinket2": {
            "name": "Dog Whistle",
            "quality": "q3",
            "icon": "ability_hunter_beastcall.jpg",
            "stats": "Use: Summons a tracking hound",
            "enchant": "None",
            "source": "Houndmaster Loksey, Scarlet Monastery Graveyard",
            "alts": [
              {
                "name": "Smolderweb Eye",
                "quality": "q3",
                "icon": "inv_misc_gem_pearl_04.jpg",
                "stats": "Immobilize web",
                "source": "Rare"
              },
              {
                "name": "Insignia of the Alliance / Horde",
                "quality": "q3",
                "icon": "inv_jewelry_trinketpvp_01.jpg",
                "stats": "Use: Dispels fear, stun, and sleep",
                "source": "PvP Rank 2 Honor Vendor"
              },
              {
                "name": "Minor Recombobulator",
                "quality": "q2",
                "icon": "inv_gizmo_07.jpg",
                "stats": "Use: Restores HP/Mana, cures polymorph",
                "source": "Engineering (140)"
              }
            ]
          },
          "mainHand": {
            "name": "Whirlwind Axe",
            "quality": "q3",
            "icon": "inv_axe_12.jpg",
            "stats": "3.60 Speed • 102-154 Dmg (35.6 DPS) • +15 Str, +14 Sta",
            "enchant": "Weapon Damage +6",
            "source": "Warrior Class Quest (Level 30 Cyclonian)",
            "alts": [
              {
                "name": "Corpsemaker",
                "quality": "q3",
                "icon": "inv_axe_14.jpg",
                "stats": "3.80 Speed • 92-139 Dmg • +15 Str, +8 Sta",
                "source": "Razorfen Kraul"
              },
              {
                "name": "Cruel Barb",
                "quality": "q3",
                "icon": "inv_sword_19.jpg",
                "stats": "2.80 Speed • 18.2 DPS • +12 AP",
                "source": "Edwin VanCleef, Deadmines"
              },
              {
                "name": "Scin-Rending Cleaver",
                "quality": "q3",
                "icon": "inv_axe_04.jpg",
                "stats": "2.50 Speed • 18.5 DPS • +7 Str, +4 Sta",
                "source": "Excavation Site 4 Boss"
              }
            ]
          },
          "offHand": {
            "name": "Two-Handed Grip",
            "quality": "q1",
            "icon": "inv_misc_questionmark.jpg",
            "stats": "Held by Two-Hander",
            "enchant": "None",
            "source": "Equipped in Two Hands",
            "alts": [
              {
                "name": "Cruel Barb",
                "quality": "q3",
                "icon": "inv_sword_19.jpg",
                "stats": "2.80 Speed • 18.2 DPS • +12 AP",
                "source": "Edwin VanCleef, Deadmines"
              },
              {
                "name": "Tail Spike",
                "quality": "q3",
                "icon": "inv_sword_25.jpg",
                "stats": "1.70 Fast Speed • 18.0 DPS • +5 Agi, +3 Sta",
                "source": "Razorfen Kraul"
              },
              {
                "name": "Toxic Revenger",
                "quality": "q3",
                "icon": "inv_weapon_shortblade_05.jpg",
                "stats": "2.70 Speed • 18.9 DPS • Chance on hit: Poison",
                "source": "Gnomeregan"
              }
            ]
          },
          "ranged": {
            "name": "Excavation Carbine",
            "quality": "q3",
            "icon": "inv_weapon_rifle_01.jpg",
            "stats": "+6 Agi, +4 Str",
            "enchant": "Standard Scope (+2 Dmg)",
            "source": "Excavation Site 4 Overseer",
            "alts": [
              {
                "name": "Master Hunter's Rifle",
                "quality": "q2",
                "icon": "inv_weapon_rifle_05.jpg",
                "stats": "+4 Agi, +3 Sta",
                "source": "Stranglethorn Vale"
              },
              {
                "name": "Nightstalker Bow",
                "quality": "q2",
                "icon": "inv_weapon_bow_08.jpg",
                "stats": "+5 Agi, +3 Sta",
                "source": "World Drop"
              },
              {
                "name": "Venomstrike",
                "quality": "q3",
                "icon": "inv_weapon_bow_01.jpg",
                "stats": "Chance on hit: 31-45 Poison damage",
                "source": "Lord Cobrahn, Wailing Caverns"
              }
            ]
          }
        }
      },
      {
        "id": "tank",
        "name": "Protection Tank",
        "role": "Tank",
        "icon": "https://render.worldofwarcraft.com/us/icons/56/inv_shield_06.jpg",
        "weaponType": "One-Hand Weapon + Shield",
        "statSummary": {
          "alliance": {
            "hp": 1680,
            "armor": 2450,
            "str": 130,
            "agi": 85,
            "sta": 182,
            "int": 26,
            "spi": 33,
            "def": "+16 Def",
            "block": "14.5%"
          },
          "horde": {
            "hp": 1710,
            "armor": 2380,
            "str": 128,
            "agi": 83,
            "sta": 185,
            "int": 23,
            "spi": 35,
            "def": "+16 Def",
            "block": "14.5%"
          }
        },
        "talents": {
          "points": "5 / 0 / 21",
          "summary": "Shield Specialization + Last Stand + Vanguard + Concussion Blow (Full mitigation)",
          "buildCode": "FOREVER-WARRIOR-ARMS-30-26-0-0",
          "trees": [
            {
              "name": "Arms",
              "icon": "https://render.worldofwarcraft.com/us/icons/56/ability_rogue_eviscerate.jpg",
              "points": 26,
              "talents": [
                {
                  "name": "Deflection",
                  "rank": "2/5",
                  "desc": "Increases your Parry chance by 2%."
                },
                {
                  "name": "Improved Rend",
                  "rank": "3/3",
                  "desc": "Increases bleed damage of Rend by 35%."
                },
                {
                  "name": "Tactical Mastery",
                  "rank": "5/5",
                  "desc": "Retain up to 25 Rage when changing stances."
                },
                {
                  "name": "Improved Overpower",
                  "rank": "2/2",
                  "desc": "Increases critical strike chance of Overpower by 50%."
                },
                {
                  "name": "Deep Wounds",
                  "rank": "3/3",
                  "desc": "Critical strikes cause enemy to bleed for 60% of weapon damage."
                },
                {
                  "name": "Two-Handed Weapon Spec",
                  "rank": "5/5",
                  "desc": "Increases physical damage with two-handed weapons by 5%."
                },
                {
                  "name": "Impale",
                  "rank": "2/2",
                  "desc": "Increases critical strike damage bonus of abilities by 20%."
                },
                {
                  "name": "Sweeping Strikes",
                  "rank": "1/1",
                  "desc": "Next 5 melee attacks strike an additional nearby enemy."
                },
                {
                  "name": "Spearing Strike",
                  "rank": "1/1",
                  "isNew": true,
                  "desc": "Classic+ Ability: Interrupts enemy spellcasting and locks school for 4 sec in all stances."
                }
              ]
            },
            {
              "name": "Fury",
              "icon": "https://render.worldofwarcraft.com/us/icons/56/ability_warrior_innerrage.jpg",
              "points": 0,
              "talents": []
            },
            {
              "name": "Protection",
              "icon": "https://render.worldofwarcraft.com/us/icons/56/inv_shield_06.jpg",
              "points": 0,
              "talents": []
            }
          ]
        },
        "gear": {
          "head": {
            "name": "Tusken Helm",
            "quality": "q3",
            "icon": "inv_helmet_09.jpg",
            "stats": "+15 Sta, +7 Agi",
            "enchant": "Lesser Arcanum of Constitution (+100 HP)",
            "source": "Overlord Ramtusk, Razorfen Kraul",
            "alts": [
              {
                "name": "Veteran's Silvered Chain Helm",
                "quality": "q3",
                "icon": "inv_helmet_39.jpg",
                "stats": "+10 Str, +8 Sta, +1% Crit",
                "source": "Blacksmithing"
              },
              {
                "name": "Infiltrator Cap of the Tiger",
                "quality": "q2",
                "icon": "inv_helmet_15.jpg",
                "stats": "+8 Str, +8 Agi",
                "source": "World Drop / Auction House"
              },
              {
                "name": "Green Tinted Goggles",
                "quality": "q2",
                "icon": "inv_gizmo_01.jpg",
                "stats": "+8 Sta, +8 Agi",
                "source": "Engineering (150)"
              }
            ]
          },
          "neck": {
            "name": "Thermaplugg Medal of Honor",
            "quality": "q3",
            "icon": "inv_jewelry_amulet_03.jpg",
            "stats": "+8 Sta, +7 Str",
            "enchant": "None",
            "source": "Mekgineer Thermaplugg, Gnomeregan",
            "alts": [
              {
                "name": "Ghostshard Talisman",
                "quality": "q3",
                "icon": "inv_jewelry_necklace_06.jpg",
                "stats": "+11 Sta, +4 Str",
                "source": "SM Graveyard"
              },
              {
                "name": "Mark of the Pack Leader",
                "quality": "q3",
                "icon": "inv_jewelry_necklace_04.jpg",
                "stats": "+8 Agi, +6 Sta",
                "source": "The Barrens Rare / Quest"
              },
              {
                "name": "Fossilized Amber Pendant",
                "quality": "q3",
                "icon": "inv_jewelry_necklace_12.jpg",
                "stats": "+7 Agi, +5 Sta, +4 Str",
                "source": "Excavation Site 4 Boss"
              }
            ]
          },
          "shoulder": {
            "name": "Sanguine Pauldrons",
            "quality": "q2",
            "icon": "inv_shoulder_29.jpg",
            "stats": "+9 Str, +5 Sta",
            "enchant": "None",
            "source": "Quest: The Karnitol Shipwreck",
            "alts": [
              {
                "name": "Brigand's Pauldrons",
                "quality": "q2",
                "icon": "inv_shoulder_03.jpg",
                "stats": "+8 Str, +6 Sta",
                "source": "Quest: Taretha's Gift"
              },
              {
                "name": "Forest Tracker Epaulets",
                "quality": "q3",
                "icon": "inv_shoulder_18.jpg",
                "stats": "+11 Agi, +5 Str",
                "source": "World Drop"
              },
              {
                "name": "Cutthroat's Mantle of the Tiger",
                "quality": "q2",
                "icon": "inv_shoulder_11.jpg",
                "stats": "+7 Str, +7 Agi",
                "source": "World Drop"
              }
            ]
          },
          "back": {
            "name": "Crocolisk Skin Gaiter",
            "quality": "q3",
            "icon": "inv_misc_monsterscales_02.jpg",
            "stats": "+6 Str, +6 Sta, +5 Agi",
            "enchant": "Lesser Defense (+30 Armor)",
            "source": "Excavation Site 4 Quest, Wetlands",
            "alts": [
              {
                "name": "Yeti Fur Cloak",
                "quality": "q2",
                "icon": "inv_misc_cape_04.jpg",
                "stats": "+5 Sta, +4 Str",
                "source": "Hillsbrad Quest"
              },
              {
                "name": "Hawkeye's Cloak",
                "quality": "q2",
                "icon": "inv_misc_cape_03.jpg",
                "stats": "+8 Agi, +3 Sta",
                "source": "World Drop"
              },
              {
                "name": "Batwing Cloak",
                "quality": "q3",
                "icon": "inv_misc_cape_06.jpg",
                "stats": "+5 Agi, +7 Sta",
                "source": "Razorfen Kraul"
              }
            ]
          },
          "chest": {
            "name": "Shining Silver Breastplate",
            "quality": "q3",
            "icon": "inv_chest_plate15.jpg",
            "stats": "+14 Str, +8 Sta, 298 Armor",
            "enchant": "Greater Health (+35 Health)",
            "source": "Blacksmithing (145)",
            "alts": [
              {
                "name": "Mana-Warped Chain Shirt",
                "quality": "q3",
                "icon": "inv_chest_chain_04.jpg",
                "stats": "+13 Str, +9 Sta",
                "source": "City of Dalaran"
              },
              {
                "name": "Avenger's Armor",
                "quality": "q3",
                "icon": "inv_chest_chain.jpg",
                "stats": "+15 Str, +7 Sta",
                "source": "Razorfen Kraul"
              },
              {
                "name": "Veteran's Silvered Chain Shirt",
                "quality": "q3",
                "icon": "inv_chest_chain_07.jpg",
                "stats": "+12 Str, +10 Sta, +8 Agi",
                "source": "Blacksmithing (110)"
              }
            ]
          },
          "wrist": {
            "name": "Pugilist Bracers",
            "quality": "q3",
            "icon": "inv_bracer_03.jpg",
            "stats": "+7 Sta, +4 Agi, +3 Str",
            "enchant": "Lesser Stamina (+5 Stamina)",
            "source": "Trash mobs, Razorfen Kraul",
            "alts": [
              {
                "name": "Arathi Armbands",
                "quality": "q2",
                "icon": "inv_bracer_09.jpg",
                "stats": "+7 Str, +4 Sta",
                "source": "Arathi Quest"
              },
              {
                "name": "Unearthed Bands of the Tiger",
                "quality": "q3",
                "icon": "inv_bracer_06.jpg",
                "stats": "+7 Str, +7 Agi",
                "source": "Uldaman / World Drop"
              },
              {
                "name": "Hawkeye's Bracers",
                "quality": "q2",
                "icon": "inv_bracer_04.jpg",
                "stats": "+6 Agi, +3 Sta",
                "source": "World Drop"
              }
            ]
          },
          "hands": {
            "name": "Algae Fists",
            "quality": "q3",
            "icon": "inv_gauntlets_22.jpg",
            "stats": "+10 Str, +8 Sta",
            "enchant": "Lesser Agility (+5 Agility)",
            "source": "Gelihast, Blackfathom Deeps",
            "alts": [
              {
                "name": "Veteran's Silvered Chain Gauntlets",
                "quality": "q3",
                "icon": "inv_gauntlets_16.jpg",
                "stats": "+9 Str, +7 Sta",
                "source": "Blacksmithing"
              },
              {
                "name": "True-Aim Stalkers",
                "quality": "q3",
                "icon": "inv_gauntlets_28.jpg",
                "stats": "+9 Agi, +6 Sta, +1% Hit",
                "source": "Excavation Site 4 Boss"
              },
              {
                "name": "Tiger Hunter Gloves",
                "quality": "q2",
                "icon": "inv_gauntlets_04.jpg",
                "stats": "+9 Str, +8 Agi",
                "source": "Stranglethorn Vale Tiger Mastery"
              }
            ]
          },
          "waist": {
            "name": "Officer's Belt",
            "quality": "q3",
            "icon": "inv_belt_20.jpg",
            "stats": "+12 Str, +6 Sta",
            "enchant": "None",
            "source": "PvP Rank 4 Honor Vendor",
            "alts": [
              {
                "name": "Cobrahn's Grasp",
                "quality": "q3",
                "icon": "inv_belt_12.jpg",
                "stats": "+8 Agi, +5 Sta, +5 Str",
                "source": "Wailing Caverns"
              },
              {
                "name": "Ogron's Sash",
                "quality": "q3",
                "icon": "inv_belt_03.jpg",
                "stats": "+10 Str, +6 Sta",
                "source": "World Drop"
              },
              {
                "name": "Veteran's Silvered Chain Girdle",
                "quality": "q3",
                "icon": "inv_belt_15.jpg",
                "stats": "+9 Str, +7 Sta",
                "source": "Blacksmithing (100)"
              }
            ]
          },
          "legs": {
            "name": "Veteran's Silvered Chain Leggings",
            "quality": "q3",
            "icon": "inv_pants_mail_05.jpg",
            "stats": "+14 Str, +11 Sta, +8 Agi",
            "enchant": "Armor +24 and Stamina +10",
            "source": "Blacksmithing (120)",
            "alts": [
              {
                "name": "Gryphon Rider's Leggings",
                "quality": "q3",
                "icon": "inv_pants_03.jpg",
                "stats": "+13 Str, +8 Sta",
                "source": "Excavation Site 4"
              },
              {
                "name": "Triprunner Dungarees",
                "quality": "q3",
                "icon": "inv_pants_06.jpg",
                "stats": "+18 Agi, +4 Sta",
                "source": "Gnomeregan Quest"
              },
              {
                "name": "Infiltrator Leggings of the Tiger",
                "quality": "q2",
                "icon": "inv_pants_08.jpg",
                "stats": "+10 Str, +10 Agi",
                "source": "World Drop"
              }
            ]
          },
          "feet": {
            "name": "Excavator's Work Boots",
            "quality": "q3",
            "icon": "inv_boots_chain_06.jpg",
            "stats": "+8 Str, +8 Sta, +5 Agi",
            "enchant": "Lesser Stamina (+5 Stamina)",
            "source": "Excavation Site 4 Overseer",
            "alts": [
              {
                "name": "Silvered Bronze Boots",
                "quality": "q2",
                "icon": "inv_boots_chain_03.jpg",
                "stats": "+7 Str, +5 Sta",
                "source": "Blacksmithing"
              },
              {
                "name": "Trouncing Boots",
                "quality": "q2",
                "icon": "inv_boots_01.jpg",
                "stats": "+9 Str, +8 Agi",
                "source": "The Karnitol Shipwreck (Alliance)"
              },
              {
                "name": "Shapeshifting Sentinel's Strides",
                "quality": "q3",
                "icon": "inv_boots_chain_08.jpg",
                "stats": "+11 Str, +9 Agi, +7 Sta",
                "source": "Blackfathom Deeps (Horde)"
              }
            ]
          },
          "finger1": {
            "name": "Wyvern Heart Band",
            "quality": "q3",
            "icon": "inv_jewelry_ring_25.jpg",
            "stats": "+7 Str, +6 Agi, +5 Sta",
            "enchant": "None",
            "source": "Rare Harpy World Drop",
            "alts": [
              {
                "name": "Seal of Wrynn",
                "quality": "q3",
                "icon": "inv_jewelry_ring_12.jpg",
                "stats": "+3 Str, +4 Agi, +4 Sta",
                "source": "Alliance Quest"
              },
              {
                "name": "Tigerstrike Signet",
                "quality": "q3",
                "icon": "inv_jewelry_ring_16.jpg",
                "stats": "+8 Str, +5 Agi",
                "source": "King Bangalash, STV"
              },
              {
                "name": "Blackstone Ring",
                "quality": "q3",
                "icon": "inv_jewelry_ring_17.jpg",
                "stats": "+6 Str, +1% Hit",
                "source": "Princess Theradras, Maraudon"
              }
            ]
          },
          "finger2": {
            "name": "Savory Devourer Band",
            "quality": "q2",
            "icon": "inv_jewelry_ring_08.jpg",
            "stats": "+6 Str, +5 Sta",
            "enchant": "None",
            "source": "Excavation Site 4",
            "alts": [
              {
                "name": "Blackstone Ring",
                "quality": "q3",
                "icon": "inv_jewelry_ring_17.jpg",
                "stats": "+6 Str, +1% Hit",
                "source": "Maraudon"
              },
              {
                "name": "Wyvern Heart Band",
                "quality": "q3",
                "icon": "inv_jewelry_ring_25.jpg",
                "stats": "+7 Str, +6 Agi, +5 Sta",
                "source": "Harpy Matriarch / World Drop"
              },
              {
                "name": "Tigerstrike Signet",
                "quality": "q3",
                "icon": "inv_jewelry_ring_16.jpg",
                "stats": "+8 Str, +5 Agi",
                "source": "King Bangalash, STV"
              }
            ]
          },
          "trinket1": {
            "name": "Minor Recombobulator",
            "quality": "q2",
            "icon": "inv_gizmo_07.jpg",
            "stats": "Use: Restores HP/Mana, removes polymorph",
            "enchant": "None",
            "source": "Engineering (140)",
            "alts": [
              {
                "name": "Insignia of the Alliance / Horde",
                "quality": "q3",
                "icon": "inv_jewelry_trinketpvp_01.jpg",
                "stats": "CC Break",
                "source": "PvP"
              },
              {
                "name": "Gyromatic Icemaker",
                "quality": "q2",
                "icon": "inv_gizmo_03.jpg",
                "stats": "Use: Blasts target with frost dealing damage",
                "source": "Engineering (145)"
              },
              {
                "name": "Rune of Duty",
                "quality": "q2",
                "icon": "inv_misc_rune_01.jpg",
                "stats": "+10 Stamina",
                "source": "Warsong Gulch Friendly Vendor"
              }
            ]
          },
          "trinket2": {
            "name": "Dog Whistle",
            "quality": "q3",
            "icon": "ability_hunter_beastcall.jpg",
            "stats": "Use: Summons a battle dog",
            "enchant": "None",
            "source": "Scarlet Monastery Graveyard",
            "alts": [
              {
                "name": "Smolderweb Eye",
                "quality": "q3",
                "icon": "inv_misc_gem_pearl_04.jpg",
                "stats": "Use: Shoots a web immobilizing target for 5 sec",
                "source": "LBRS Rare / World Quest"
              },
              {
                "name": "Insignia of the Alliance / Horde",
                "quality": "q3",
                "icon": "inv_jewelry_trinketpvp_01.jpg",
                "stats": "Use: Dispels fear, stun, and sleep",
                "source": "PvP Rank 2 Honor Vendor"
              },
              {
                "name": "Minor Recombobulator",
                "quality": "q2",
                "icon": "inv_gizmo_07.jpg",
                "stats": "Use: Restores HP/Mana, cures polymorph",
                "source": "Engineering (140)"
              }
            ]
          },
          "mainHand": {
            "name": "Outlaw Sabre",
            "quality": "q3",
            "icon": "inv_sword_20.jpg",
            "stats": "2.70 Speed • 18.2 DPS • +6 Agi, +3 Sta",
            "enchant": "Weapon Damage +4",
            "source": "Blackfathom Deeps Quest Reward",
            "alts": [
              {
                "name": "Scin-Rending Cleaver",
                "quality": "q3",
                "icon": "inv_axe_04.jpg",
                "stats": "2.50 Speed • +7 Str, +4 Sta",
                "source": "Excavation Site 4"
              },
              {
                "name": "Cruel Barb",
                "quality": "q3",
                "icon": "inv_sword_19.jpg",
                "stats": "2.80 Speed • 18.2 DPS • +12 AP",
                "source": "Edwin VanCleef, Deadmines"
              },
              {
                "name": "Pronged Reaver",
                "quality": "q3",
                "icon": "inv_axe_01.jpg",
                "stats": "2.60 Speed • 19.1 DPS • +8 Str, +5 Sta",
                "source": "Razorfen Kraul"
              }
            ]
          },
          "offHand": {
            "name": "Commander's Crest",
            "quality": "q3",
            "icon": "inv_shield_05.jpg",
            "stats": "1050 Armor, 27 Block • +8 Str, +7 Sta",
            "enchant": "Lesser Block (+2% Block)",
            "source": "Commander Springvale, Shadowfang Keep",
            "alts": [
              {
                "name": "Arctic Buckler",
                "quality": "q3",
                "icon": "inv_shield_08.jpg",
                "stats": "980 Armor, 25 Block • +8 Sta, +5 Spirit",
                "source": "Scarlet Monastery Graveyard"
              },
              {
                "name": "Aegis of the Sun",
                "quality": "q3",
                "icon": "inv_shield_10.jpg",
                "stats": "1100 Armor, 28 Block • +9 Sta, +5 Str",
                "source": "City of Dalaran"
              }
            ]
          },
          "ranged": {
            "name": "Excavation Carbine",
            "quality": "q3",
            "icon": "inv_weapon_rifle_01.jpg",
            "stats": "+6 Agi, +4 Str",
            "enchant": "Standard Scope",
            "source": "Excavation Site 4 Overseer",
            "alts": [
              {
                "name": "Master Hunter's Rifle",
                "quality": "q2",
                "icon": "inv_weapon_rifle_05.jpg",
                "stats": "+4 Agi, +3 Sta",
                "source": "Stranglethorn Vale Quest"
              },
              {
                "name": "Nightstalker Bow",
                "quality": "q2",
                "icon": "inv_weapon_bow_08.jpg",
                "stats": "+5 Agi, +3 Sta",
                "source": "World Drop"
              },
              {
                "name": "Venomstrike",
                "quality": "q3",
                "icon": "inv_weapon_bow_01.jpg",
                "stats": "Chance on hit: 31-45 Poison damage",
                "source": "Lord Cobrahn, Wailing Caverns"
              }
            ]
          }
        }
      }
    ]
  },
  "paladin": {
    "specs": [
      {
        "id": "ret-pve",
        "name": "Retribution PvE",
        "role": "Melee DPS",
        "icon": "https://render.worldofwarcraft.com/us/icons/56/spell_holy_auraoflight.jpg",
        "weaponType": "Two-Hand Mace / Sword",
        "statSummary": {
          "alliance": {
            "hp": 1290,
            "armor": 1250,
            "str": 165,
            "agi": 95,
            "sta": 110,
            "int": 88,
            "spi": 45,
            "ap": "+62",
            "sp": "+24 Holy",
            "hit": "3%",
            "crit": "11.8%"
          }
        },
        "talents": {
          "points": "5 / 0 / 21",
          "summary": "Benediction + Seal of Command + Pursuit of Justice + Vengeance (Full 2H Burst)",
          "buildCode": "FOREVER-PALADIN-RET-30-5-0-21",
          "trees": [
            {
              "name": "Holy",
              "icon": "https://render.worldofwarcraft.com/us/icons/56/spell_holy_holybolt.jpg",
              "points": 5,
              "talents": [
                {
                  "name": "Divine Strength",
                  "rank": "5/5",
                  "desc": "Increases your Strength by 10%."
                }
              ]
            },
            {
              "name": "Protection",
              "icon": "https://render.worldofwarcraft.com/us/icons/56/spell_holy_devotionaura.jpg",
              "points": 0,
              "talents": []
            },
            {
              "name": "Retribution",
              "icon": "https://render.worldofwarcraft.com/us/icons/56/spell_holy_auraoflight.jpg",
              "points": 21,
              "talents": [
                {
                  "name": "Benediction",
                  "rank": "5/5",
                  "desc": "Reduces mana cost of Judgement and Seals by 15%."
                },
                {
                  "name": "Improved Judgement",
                  "rank": "2/2",
                  "desc": "Decreases cooldown of Judgement by 2 sec."
                },
                {
                  "name": "Improved Seal of the Crusader",
                  "rank": "3/3",
                  "desc": "Increases Attack Power bonus of Seal of the Crusader by 15%."
                },
                {
                  "name": "Conviction",
                  "rank": "5/5",
                  "desc": "Increases your chance to get a critical strike with melee weapons by 5%."
                },
                {
                  "name": "Seal of Command",
                  "rank": "1/1",
                  "desc": "Gives a chance to deal additional Holy damage equal to 70% of weapon damage."
                },
                {
                  "name": "Pursuit of Justice",
                  "rank": "2/2",
                  "desc": "Increases movement and mounted movement speed by 8%."
                },
                {
                  "name": "Eye for an Eye",
                  "rank": "2/2",
                  "desc": "Causes 30% of critical damage taken to be reflected back to the attacker."
                },
                {
                  "name": "Vengeance",
                  "rank": "1/1",
                  "desc": "Gives a 15% bonus to physical and Holy damage after scoring a critical strike."
                }
              ]
            }
          ]
        },
        "gear": {
          "head": {
            "name": "Veteran's Silvered Chain Helm",
            "quality": "q3",
            "icon": "inv_helmet_39.jpg",
            "stats": "+10 Str, +8 Sta, +1% Crit",
            "enchant": "Lesser Arcanum of Voracity (+8 Str)",
            "source": "Blacksmithing (95)",
            "alts": [
              {
                "name": "Tusken Helm",
                "quality": "q3",
                "icon": "inv_helmet_09.jpg",
                "stats": "+15 Sta, +7 Agi",
                "source": "Razorfen Kraul"
              },
              {
                "name": "Infiltrator Cap of the Tiger",
                "quality": "q2",
                "icon": "inv_helmet_15.jpg",
                "stats": "+8 Str, +8 Agi",
                "source": "World Drop / Auction House"
              },
              {
                "name": "Green Tinted Goggles",
                "quality": "q2",
                "icon": "inv_gizmo_01.jpg",
                "stats": "+8 Sta, +8 Agi",
                "source": "Engineering (150)"
              }
            ]
          },
          "neck": {
            "name": "Ghostshard Talisman",
            "quality": "q3",
            "icon": "inv_jewelry_necklace_06.jpg",
            "stats": "+11 Sta, +4 Str",
            "enchant": "None",
            "source": "Scarlet Monastery Graveyard",
            "alts": [
              {
                "name": "Archmagister's Faceted Pendant",
                "quality": "q3",
                "icon": "inv_misc_necklacea8.jpg",
                "stats": "+6 Int, +12 AP",
                "source": "City of Dalaran"
              },
              {
                "name": "Mark of the Pack Leader",
                "quality": "q3",
                "icon": "inv_jewelry_necklace_04.jpg",
                "stats": "+8 Agi, +6 Sta",
                "source": "The Barrens Rare / Quest"
              },
              {
                "name": "Fossilized Amber Pendant",
                "quality": "q3",
                "icon": "inv_jewelry_necklace_12.jpg",
                "stats": "+7 Agi, +5 Sta, +4 Str",
                "source": "Excavation Site 4 Boss"
              }
            ]
          },
          "shoulder": {
            "name": "Sanguine Pauldrons",
            "quality": "q2",
            "icon": "inv_shoulder_29.jpg",
            "stats": "+9 Str, +5 Sta",
            "enchant": "None",
            "source": "Quest: The Karnitol Shipwreck",
            "alts": [
              {
                "name": "Forest Tracker Epaulets",
                "quality": "q3",
                "icon": "inv_shoulder_18.jpg",
                "stats": "+11 Agi, +5 Str",
                "source": "World Drop"
              },
              {
                "name": "Cutthroat's Mantle of the Tiger",
                "quality": "q2",
                "icon": "inv_shoulder_11.jpg",
                "stats": "+7 Str, +7 Agi",
                "source": "World Drop"
              },
              {
                "name": "Barbaric Shoulders",
                "quality": "q2",
                "icon": "inv_shoulder_08.jpg",
                "stats": "+7 Str, +6 Sta",
                "source": "Leatherworking (175)"
              }
            ]
          },
          "back": {
            "name": "Crocolisk Skin Gaiter",
            "quality": "q3",
            "icon": "inv_misc_monsterscales_02.jpg",
            "stats": "+6 Str, +6 Sta, +5 Agi",
            "enchant": "Lesser Agility (+3 Agi)",
            "source": "Excavation Site 4 Quest",
            "alts": [
              {
                "name": "Hawkeye's Cloak",
                "quality": "q2",
                "icon": "inv_misc_cape_03.jpg",
                "stats": "+8 Agi, +3 Sta",
                "source": "World Drop"
              },
              {
                "name": "Batwing Cloak",
                "quality": "q3",
                "icon": "inv_misc_cape_06.jpg",
                "stats": "+5 Agi, +7 Sta",
                "source": "Razorfen Kraul"
              },
              {
                "name": "Drape of Shifting Energy",
                "quality": "q3",
                "icon": "inv_misc_cape_18.jpg",
                "stats": "+7 Sta, +6 Str",
                "source": "City of Dalaran"
              }
            ]
          },
          "chest": {
            "name": "Veteran's Silvered Chain Shirt",
            "quality": "q3",
            "icon": "inv_chest_chain_07.jpg",
            "stats": "+12 Str, +10 Sta, +8 Agi",
            "enchant": "Greater Health (+35 HP)",
            "source": "Blacksmithing (110)",
            "alts": [
              {
                "name": "Shining Silver Breastplate",
                "quality": "q3",
                "icon": "inv_chest_plate15.jpg",
                "stats": "+14 Str, +8 Sta",
                "source": "Blacksmithing"
              },
              {
                "name": "Avenger's Armor",
                "quality": "q3",
                "icon": "inv_chest_chain.jpg",
                "stats": "+15 Str, +7 Sta",
                "source": "Razorfen Kraul"
              },
              {
                "name": "Mana-Warped Chain Shirt",
                "quality": "q3",
                "icon": "inv_chest_chain_04.jpg",
                "stats": "+13 Str, +9 Sta",
                "source": "City of Dalaran"
              }
            ]
          },
          "wrist": {
            "name": "Arathi Armbands",
            "quality": "q2",
            "icon": "inv_bracer_09.jpg",
            "stats": "+7 Str, +4 Sta",
            "enchant": "Lesser Strength (+5 Str)",
            "source": "Wanted! Otto and Falconcrest",
            "alts": [
              {
                "name": "Pugilist Bracers",
                "quality": "q3",
                "icon": "inv_bracer_03.jpg",
                "stats": "+7 Sta, +4 Agi, +3 Str",
                "source": "Razorfen Kraul"
              },
              {
                "name": "Unearthed Bands of the Tiger",
                "quality": "q3",
                "icon": "inv_bracer_06.jpg",
                "stats": "+7 Str, +7 Agi",
                "source": "Uldaman / World Drop"
              },
              {
                "name": "Hawkeye's Bracers",
                "quality": "q2",
                "icon": "inv_bracer_04.jpg",
                "stats": "+6 Agi, +3 Sta",
                "source": "World Drop"
              }
            ]
          },
          "hands": {
            "name": "Veteran's Silvered Chain Gauntlets",
            "quality": "q3",
            "icon": "inv_gauntlets_16.jpg",
            "stats": "+9 Str, +7 Sta, +6 Agi",
            "enchant": "Strength (+7 Str)",
            "source": "Blacksmithing (105)",
            "alts": [
              {
                "name": "Algae Fists",
                "quality": "q3",
                "icon": "inv_gauntlets_22.jpg",
                "stats": "+10 Str, +8 Sta",
                "source": "Blackfathom Deeps"
              },
              {
                "name": "True-Aim Stalkers",
                "quality": "q3",
                "icon": "inv_gauntlets_28.jpg",
                "stats": "+9 Agi, +6 Sta, +1% Hit",
                "source": "Excavation Site 4 Boss"
              },
              {
                "name": "Tiger Hunter Gloves",
                "quality": "q2",
                "icon": "inv_gauntlets_04.jpg",
                "stats": "+9 Str, +8 Agi",
                "source": "Stranglethorn Vale Tiger Mastery"
              }
            ]
          },
          "waist": {
            "name": "Officer's Belt",
            "quality": "q3",
            "icon": "inv_belt_20.jpg",
            "stats": "+12 Str, +6 Sta",
            "enchant": "None",
            "source": "PvP Rank 4 Honor Vendor",
            "alts": [
              {
                "name": "Veteran's Silvered Chain Girdle",
                "quality": "q3",
                "icon": "inv_belt_15.jpg",
                "stats": "+9 Str, +7 Sta",
                "source": "Blacksmithing"
              },
              {
                "name": "Cobrahn's Grasp",
                "quality": "q3",
                "icon": "inv_belt_12.jpg",
                "stats": "+8 Agi, +5 Sta, +5 Str",
                "source": "Wailing Caverns"
              },
              {
                "name": "Ogron's Sash",
                "quality": "q3",
                "icon": "inv_belt_03.jpg",
                "stats": "+10 Str, +6 Sta",
                "source": "World Drop"
              }
            ]
          },
          "legs": {
            "name": "Veteran's Silvered Chain Leggings",
            "quality": "q3",
            "icon": "inv_pants_mail_05.jpg",
            "stats": "+14 Str, +11 Sta, +8 Agi",
            "enchant": "Attack Power +6 and Armor +24",
            "source": "Blacksmithing (120)",
            "alts": [
              {
                "name": "Gryphon Rider's Leggings",
                "quality": "q3",
                "icon": "inv_pants_03.jpg",
                "stats": "+13 Str, +8 Sta",
                "source": "Excavation Site 4"
              },
              {
                "name": "Triprunner Dungarees",
                "quality": "q3",
                "icon": "inv_pants_06.jpg",
                "stats": "+18 Agi, +4 Sta",
                "source": "Gnomeregan Quest"
              },
              {
                "name": "Infiltrator Leggings of the Tiger",
                "quality": "q2",
                "icon": "inv_pants_08.jpg",
                "stats": "+10 Str, +10 Agi",
                "source": "World Drop"
              }
            ]
          },
          "feet": {
            "name": "Trouncing Boots",
            "quality": "q2",
            "icon": "inv_boots_01.jpg",
            "stats": "+9 Str, +8 Agi",
            "enchant": "Lesser Agility (+4 Agi)",
            "source": "Alliance Quest",
            "alts": [
              {
                "name": "Excavator's Work Boots",
                "quality": "q3",
                "icon": "inv_boots_chain_06.jpg",
                "stats": "+8 Str, +8 Sta",
                "source": "Excavation Site 4"
              },
              {
                "name": "Shapeshifting Sentinel's Strides",
                "quality": "q3",
                "icon": "inv_boots_chain_08.jpg",
                "stats": "+11 Str, +9 Agi, +7 Sta",
                "source": "Blackfathom Deeps (Horde)"
              },
              {
                "name": "Silvered Bronze Boots",
                "quality": "q2",
                "icon": "inv_boots_chain_03.jpg",
                "stats": "+7 Str, +5 Sta",
                "source": "Blacksmithing (130)"
              }
            ]
          },
          "finger1": {
            "name": "Wyvern Heart Band",
            "quality": "q3",
            "icon": "inv_jewelry_ring_25.jpg",
            "stats": "+7 Str, +6 Agi, +5 Sta",
            "enchant": "None",
            "source": "World Rare Drop",
            "alts": [
              {
                "name": "Seal of Wrynn",
                "quality": "q3",
                "icon": "inv_jewelry_ring_12.jpg",
                "stats": "+3 Str, +4 Agi, +4 Sta, +3 Int",
                "source": "Quest"
              },
              {
                "name": "Tigerstrike Signet",
                "quality": "q3",
                "icon": "inv_jewelry_ring_16.jpg",
                "stats": "+8 Str, +5 Agi",
                "source": "King Bangalash, STV"
              },
              {
                "name": "Blackstone Ring",
                "quality": "q3",
                "icon": "inv_jewelry_ring_17.jpg",
                "stats": "+6 Str, +1% Hit",
                "source": "Princess Theradras, Maraudon"
              }
            ]
          },
          "finger2": {
            "name": "Seal of Wrynn",
            "quality": "q3",
            "icon": "inv_jewelry_ring_12.jpg",
            "stats": "+3 Str, +4 Agi, +4 Sta, +3 Int",
            "enchant": "None",
            "source": "Alliance Quest: The Missing Diplomat",
            "alts": [
              {
                "name": "Savory Devourer Band",
                "quality": "q2",
                "icon": "inv_jewelry_ring_08.jpg",
                "stats": "+6 Str, +5 Sta",
                "source": "Excavation Site 4"
              },
              {
                "name": "Wyvern Heart Band",
                "quality": "q3",
                "icon": "inv_jewelry_ring_25.jpg",
                "stats": "+7 Str, +6 Agi, +5 Sta",
                "source": "Harpy Matriarch / World Drop"
              },
              {
                "name": "Tigerstrike Signet",
                "quality": "q3",
                "icon": "inv_jewelry_ring_16.jpg",
                "stats": "+8 Str, +5 Agi",
                "source": "King Bangalash, STV"
              }
            ]
          },
          "trinket1": {
            "name": "Minor Recombobulator",
            "quality": "q2",
            "icon": "inv_gizmo_07.jpg",
            "stats": "Use: Restores HP/Mana, cures polymorph",
            "enchant": "None",
            "source": "Engineering (140)",
            "alts": [
              {
                "name": "Insignia of the Alliance / Horde",
                "quality": "q3",
                "icon": "inv_jewelry_trinketpvp_01.jpg",
                "stats": "Use: Dispels fear, stun, and sleep",
                "source": "PvP Rank 2 Honor Vendor"
              },
              {
                "name": "Gyromatic Icemaker",
                "quality": "q2",
                "icon": "inv_gizmo_03.jpg",
                "stats": "Use: Blasts target with frost dealing damage",
                "source": "Engineering (145)"
              },
              {
                "name": "Rune of Duty",
                "quality": "q2",
                "icon": "inv_misc_rune_01.jpg",
                "stats": "+10 Stamina",
                "source": "Warsong Gulch Friendly Vendor"
              }
            ]
          },
          "trinket2": {
            "name": "Insignia of the Alliance",
            "quality": "q3",
            "icon": "inv_jewelry_trinketpvp_01.jpg",
            "stats": "Use: Dispels fear, stun, and sleep",
            "enchant": "None",
            "source": "PvP Rank 2 Honor Vendor",
            "alts": [
              {
                "name": "Dog Whistle",
                "quality": "q3",
                "icon": "ability_hunter_beastcall.jpg",
                "stats": "Use: Summons a tracking battle hound (10 min)",
                "source": "Houndmaster Loksey, SM Graveyard"
              },
              {
                "name": "Smolderweb Eye",
                "quality": "q3",
                "icon": "inv_misc_gem_pearl_04.jpg",
                "stats": "Use: Shoots a web immobilizing target for 5 sec",
                "source": "LBRS Rare / World Quest"
              },
              {
                "name": "Insignia of the Alliance / Horde",
                "quality": "q3",
                "icon": "inv_jewelry_trinketpvp_01.jpg",
                "stats": "Use: Dispels fear, stun, and sleep",
                "source": "PvP Rank 2 Honor Vendor"
              }
            ]
          },
          "mainHand": {
            "name": "Manual Crowd Pummeler",
            "quality": "q3",
            "icon": "inv_mace_14.jpg",
            "stats": "2.00 Speed • 16-24 Dmg • Use: Increases attack speed by 50% for 30 sec",
            "enchant": "Weapon Damage +6",
            "source": "Crowd Pummeler 9-60, Gnomeregan",
            "alts": [
              {
                "name": "Corpsemaker",
                "quality": "q3",
                "icon": "inv_axe_14.jpg",
                "stats": "3.80 Speed • +15 Str, +8 Sta",
                "source": "Razorfen Kraul"
              },
              {
                "name": "Verigan's Fist",
                "quality": "q3",
                "icon": "inv_hammer_04.jpg",
                "stats": "3.20 Speed • +6 Str, +12 Sta, +6 Int, +6 Spi",
                "source": "Paladin Class Quest (Level 20)"
              }
            ]
          },
          "offHand": {
            "name": "Two-Handed Grip",
            "quality": "q1",
            "icon": "inv_misc_questionmark.jpg",
            "stats": "Held by Two-Hander",
            "enchant": "None",
            "source": "Equipped in Two Hands",
            "alts": [
              {
                "name": "Cruel Barb",
                "quality": "q3",
                "icon": "inv_sword_19.jpg",
                "stats": "2.80 Speed • 18.2 DPS • +12 AP",
                "source": "Edwin VanCleef, Deadmines"
              },
              {
                "name": "Tail Spike",
                "quality": "q3",
                "icon": "inv_sword_25.jpg",
                "stats": "1.70 Fast Speed • 18.0 DPS • +5 Agi, +3 Sta",
                "source": "Razorfen Kraul"
              },
              {
                "name": "Toxic Revenger",
                "quality": "q3",
                "icon": "inv_weapon_shortblade_05.jpg",
                "stats": "2.70 Speed • 18.9 DPS • Chance on hit: Poison",
                "source": "Gnomeregan"
              }
            ]
          },
          "ranged": {
            "name": "Libram of Hope",
            "quality": "q3",
            "icon": "inv_misc_book_06.jpg",
            "stats": "+15 Holy Spell Power & Judgement Bonus",
            "enchant": "None",
            "source": "City of Dalaran Secret Library Tomb",
            "alts": [
              {
                "name": "Master Hunter's Rifle",
                "quality": "q2",
                "icon": "inv_weapon_rifle_05.jpg",
                "stats": "+4 Agi, +3 Sta",
                "source": "Stranglethorn Vale Quest"
              },
              {
                "name": "Excavation Carbine",
                "quality": "q3",
                "icon": "inv_weapon_rifle_01.jpg",
                "stats": "+6 Agi, +4 Str",
                "source": "Excavation Site 4 Overseer"
              },
              {
                "name": "Nightstalker Bow",
                "quality": "q2",
                "icon": "inv_weapon_bow_08.jpg",
                "stats": "+5 Agi, +3 Sta",
                "source": "World Drop"
              }
            ]
          }
        }
      },
      {
        "id": "holy-pve",
        "name": "Holy PvE",
        "role": "Healer",
        "icon": "https://render.worldofwarcraft.com/us/icons/56/spell_holy_holybolt.jpg",
        "weaponType": "One-Hand Mace + Shield / Offhand",
        "statSummary": {
          "alliance": {
            "hp": 1120,
            "mana": 2280,
            "armor": 1450,
            "str": 75,
            "int": 162,
            "spi": 98,
            "sta": 92,
            "heal": "+78 Healing",
            "mp5": 8
          }
        },
        "talents": {
          "points": "21 / 5 / 0",
          "summary": "Divine Intellect + Spiritual Focus (No pushback) + Illumination (100% mana refund on Holy crit!)",
          "buildCode": "FOREVER-PALADIN-RET-30-5-0-21",
          "trees": [
            {
              "name": "Holy",
              "icon": "https://render.worldofwarcraft.com/us/icons/56/spell_holy_holybolt.jpg",
              "points": 5,
              "talents": [
                {
                  "name": "Divine Strength",
                  "rank": "5/5",
                  "desc": "Increases your Strength by 10%."
                }
              ]
            },
            {
              "name": "Protection",
              "icon": "https://render.worldofwarcraft.com/us/icons/56/spell_holy_devotionaura.jpg",
              "points": 0,
              "talents": []
            },
            {
              "name": "Retribution",
              "icon": "https://render.worldofwarcraft.com/us/icons/56/spell_holy_auraoflight.jpg",
              "points": 21,
              "talents": [
                {
                  "name": "Benediction",
                  "rank": "5/5",
                  "desc": "Reduces mana cost of Judgement and Seals by 15%."
                },
                {
                  "name": "Improved Judgement",
                  "rank": "2/2",
                  "desc": "Decreases cooldown of Judgement by 2 sec."
                },
                {
                  "name": "Improved Seal of the Crusader",
                  "rank": "3/3",
                  "desc": "Increases Attack Power bonus of Seal of the Crusader by 15%."
                },
                {
                  "name": "Conviction",
                  "rank": "5/5",
                  "desc": "Increases your chance to get a critical strike with melee weapons by 5%."
                },
                {
                  "name": "Seal of Command",
                  "rank": "1/1",
                  "desc": "Gives a chance to deal additional Holy damage equal to 70% of weapon damage."
                },
                {
                  "name": "Pursuit of Justice",
                  "rank": "2/2",
                  "desc": "Increases movement and mounted movement speed by 8%."
                },
                {
                  "name": "Eye for an Eye",
                  "rank": "2/2",
                  "desc": "Causes 30% of critical damage taken to be reflected back to the attacker."
                },
                {
                  "name": "Vengeance",
                  "rank": "1/1",
                  "desc": "Gives a 15% bonus to physical and Holy damage after scoring a critical strike."
                }
              ]
            }
          ]
        },
        "gear": {
          "head": {
            "name": "Holy Cowl of the Whale",
            "quality": "q2",
            "icon": "inv_helmet_14.jpg",
            "stats": "+9 Int, +9 Spi",
            "enchant": "Lesser Arcanum of Resilience (+20 Fire Res)",
            "source": "World Drop",
            "alts": [
              {
                "name": "Healer's Chain Cap",
                "quality": "q3",
                "icon": "inv_helmet_39.jpg",
                "stats": "+8 Int, +6 Sta, +12 Healing",
                "source": "Excavation Site 4"
              },
              {
                "name": "Azure Silk Hood",
                "quality": "q2",
                "icon": "inv_helmet_15.jpg",
                "stats": "+11 Int, +8 Sta",
                "source": "Tailoring (145)"
              },
              {
                "name": "Nightsky Cowl",
                "quality": "q2",
                "icon": "inv_helmet_14.jpg",
                "stats": "+9 Int, +6 Spi",
                "source": "World Drop"
              }
            ]
          },
          "neck": {
            "name": "Archmagister's Faceted Pendant",
            "quality": "q3",
            "icon": "inv_misc_necklacea8.jpg",
            "stats": "+6 Int, +14 Spell Power",
            "enchant": "None",
            "source": "City of Dalaran Boss",
            "alts": [
              {
                "name": "Ghostshard Talisman",
                "quality": "q3",
                "icon": "inv_jewelry_necklace_06.jpg",
                "stats": "+11 Sta, +4 Str",
                "source": "SM Graveyard"
              },
              {
                "name": "Fossilized Amber Pendant",
                "quality": "q3",
                "icon": "inv_jewelry_necklace_12.jpg",
                "stats": "+8 Int, +6 Sta, +5 Spi",
                "source": "Excavation Site 4 Boss"
              },
              {
                "name": "Electrocutioner Locket",
                "quality": "q3",
                "icon": "inv_jewelry_necklace_10.jpg",
                "stats": "+9 Int, +5 Spi",
                "source": "Electrocutioner 6000, Gnomeregan"
              }
            ]
          },
          "shoulder": {
            "name": "Inquisitor's Shawl",
            "quality": "q3",
            "icon": "inv_shoulder_02.jpg",
            "stats": "+9 Int, +8 Spi",
            "enchant": "None",
            "source": "Interrogator Vishas, Scarlet Monastery Graveyard",
            "alts": [
              {
                "name": "Magician's Mantle",
                "quality": "q3",
                "icon": "inv_shoulder_23.jpg",
                "stats": "+8 Int, +5 Sta",
                "source": "World Drop"
              },
              {
                "name": "Mantle of Dalaran",
                "quality": "q3",
                "icon": "inv_shoulder_02.jpg",
                "stats": "+12 Int, +8 Sta, +9 Spell Power",
                "source": "Kirin Tor Archmage, City of Dalaran"
              },
              {
                "name": "Beguiler's Robes Pauldrons",
                "quality": "q2",
                "icon": "inv_shoulder_13.jpg",
                "stats": "+8 Int, +6 Spi",
                "source": "Scarlet Monastery Graveyard"
              }
            ]
          },
          "back": {
            "name": "Drape of Shifting Energy",
            "quality": "q3",
            "icon": "inv_misc_cape_18.jpg",
            "stats": "+7 Sta, +8 Int, +9 Healing",
            "enchant": "Lesser Resistance",
            "source": "City of Dalaran",
            "alts": [
              {
                "name": "Engineer's Cloak",
                "quality": "q2",
                "icon": "inv_misc_cape_06.jpg",
                "stats": "+6 Int",
                "source": "Gnomeregan"
              },
              {
                "name": "Nightsky Cloak",
                "quality": "q2",
                "icon": "inv_misc_cape_03.jpg",
                "stats": "+7 Int, +4 Spi",
                "source": "World Drop"
              },
              {
                "name": "Cloak of the People's Militia",
                "quality": "q2",
                "icon": "inv_misc_cape_11.jpg",
                "stats": "+6 Sta, +5 Int",
                "source": "Westfall Militia Quest"
              }
            ]
          },
          "chest": {
            "name": "Robe of the Magi",
            "quality": "q3",
            "icon": "inv_chest_cloth_08.jpg",
            "stats": "+12 Int, +8 Spi, +14 Healing",
            "enchant": "Greater Mana (+50 Mana)",
            "source": "City of Dalaran / Tailoring",
            "alts": [
              {
                "name": "Robes of Arugal",
                "quality": "q3",
                "icon": "inv_chest_cloth_16.jpg",
                "stats": "+10 Int, +10 Spi, +5 Agi",
                "source": "Shadowfang Keep"
              },
              {
                "name": "Robes of Arcanic Flow",
                "quality": "q3",
                "icon": "inv_chest_cloth_16.jpg",
                "stats": "+14 Int, +9 Sta, +12 Spell Power",
                "source": "Grand Mage Doan / Dalaran Vault"
              },
              {
                "name": "Robes of the Doombringer",
                "quality": "q3",
                "icon": "inv_chest_cloth_03.jpg",
                "stats": "+10 Int, +7 Sta, +14 Shadow/Fire Dmg",
                "source": "Scarlet Monastery Graveyard"
              }
            ]
          },
          "wrist": {
            "name": "Mindthrust Bracers",
            "quality": "q3",
            "icon": "inv_bracer_07.jpg",
            "stats": "+8 Int, +4 Spi",
            "enchant": "Lesser Intellect (+5 Int)",
            "source": "World Drop",
            "alts": [
              {
                "name": "Sparkmetal Bracers",
                "quality": "q2",
                "icon": "inv_bracer_06.jpg",
                "stats": "+6 Int, +3 Sta",
                "source": "Gnomeregan"
              },
              {
                "name": "Unearthed Bands of the Owl",
                "quality": "q3",
                "icon": "inv_bracer_07.jpg",
                "stats": "+7 Int, +7 Spi",
                "source": "Uldaman / World Drop"
              },
              {
                "name": "Arcanist's Bindings",
                "quality": "q2",
                "icon": "inv_bracer_06.jpg",
                "stats": "+6 Int, +4 Sta",
                "source": "World Drop"
              }
            ]
          },
          "hands": {
            "name": "Gold-flecked Gloves",
            "quality": "q3",
            "icon": "inv_gauntlets_14.jpg",
            "stats": "+8 Int, +7 Spi, +10 Healing",
            "enchant": "Lesser Intellect (+5 Int)",
            "source": "Razorfen Kraul",
            "alts": [
              {
                "name": "Magefist Gloves",
                "quality": "q3",
                "icon": "inv_gauntlets_17.jpg",
                "stats": "+8 Int, +5 Spi",
                "source": "World Drop"
              },
              {
                "name": "Crimson Silk Gloves",
                "quality": "q2",
                "icon": "inv_gauntlets_14.jpg",
                "stats": "+10 Int, +7 Spell Power",
                "source": "Tailoring (150)"
              },
              {
                "name": "Hands of the Exiled",
                "quality": "q3",
                "icon": "inv_gauntlets_17.jpg",
                "stats": "+9 Int, +5 Sta, +6 Shadow Dmg",
                "source": "Scarlet Monastery Graveyard"
              }
            ]
          },
          "waist": {
            "name": "Girdle of the Blessed",
            "quality": "q3",
            "icon": "inv_belt_11.jpg",
            "stats": "+9 Int, +8 Sta, +12 Healing",
            "enchant": "None",
            "source": "City of Dalaran Boss",
            "alts": [
              {
                "name": "Belt of Arugal",
                "quality": "q3",
                "icon": "inv_belt_13.jpg",
                "stats": "+8 Int, +4 Spi",
                "source": "Shadowfang Keep"
              },
              {
                "name": "Dalaran Warden's Belt",
                "quality": "q3",
                "icon": "inv_belt_08.jpg",
                "stats": "+11 Int, +7 Sta, +8 Spell Power",
                "source": "City of Dalaran Gatekeeper"
              },
              {
                "name": "Belt of the Undertaker",
                "quality": "q3",
                "icon": "inv_belt_03.jpg",
                "stats": "+8 Int, +5 Sta, +6 Shadow Dmg",
                "source": "The Stockade Rare"
              }
            ]
          },
          "legs": {
            "name": "Silver-thread Pants",
            "quality": "q2",
            "icon": "inv_pants_07.jpg",
            "stats": "+11 Int, +8 Spi",
            "enchant": "Mana +65",
            "source": "World Drop",
            "alts": [
              {
                "name": "Gaze Leggings",
                "quality": "q3",
                "icon": "inv_pants_08.jpg",
                "stats": "+9 Int, +9 Sta, +11 Healing",
                "source": "Excavation Site 4"
              },
              {
                "name": "Netherweave Pants",
                "quality": "q2",
                "icon": "inv_pants_cloth_05.jpg",
                "stats": "+12 Int, +8 Sta",
                "source": "Tailoring / World Drop"
              },
              {
                "name": "Nightsky Trousers",
                "quality": "q2",
                "icon": "inv_pants_08.jpg",
                "stats": "+10 Int, +7 Spi",
                "source": "World Drop"
              }
            ]
          },
          "feet": {
            "name": "Spidersilk Boots",
            "quality": "q3",
            "icon": "inv_boots_05.jpg",
            "stats": "+8 Int, +8 Spi, +7 Sta",
            "enchant": "Minor Speed (+8% Run)",
            "source": "Tailoring (125)",
            "alts": [
              {
                "name": "Acidic Walkers",
                "quality": "q3",
                "icon": "inv_boots_cloth_03.jpg",
                "stats": "+7 Int, +7 Sta",
                "source": "Gnomeregan"
              },
              {
                "name": "Dalaran Apprentice Slippers",
                "quality": "q2",
                "icon": "inv_boots_05.jpg",
                "stats": "+8 Int, +4 Sta",
                "source": "City of Dalaran"
              },
              {
                "name": "Nightsky Boots",
                "quality": "q2",
                "icon": "inv_boots_04.jpg",
                "stats": "+7 Int, +5 Spi",
                "source": "World Drop"
              }
            ]
          },
          "finger1": {
            "name": "Advisor's Ring",
            "quality": "q3",
            "icon": "inv_jewelry_ring_22.jpg",
            "stats": "+7 Int, +5 Spi, +8 Healing",
            "enchant": "None",
            "source": "Warsong Gulch Honored Vendor",
            "alts": [
              {
                "name": "Seal of Sylvanas / Wrynn",
                "quality": "q3",
                "icon": "inv_jewelry_ring_12.jpg",
                "stats": "+3 Int, +4 Sta",
                "source": "Quest"
              },
              {
                "name": "Violet Signet",
                "quality": "q3",
                "icon": "inv_jewelry_ring_15.jpg",
                "stats": "+8 Int, +6 Sta, +7 Spell Power",
                "source": "City of Dalaran Arcane Vault"
              },
              {
                "name": "Deep Fathom Ring",
                "quality": "q3",
                "icon": "inv_jewelry_ring_14.jpg",
                "stats": "+6 Int, +5 Sta, +4 Spi",
                "source": "Aku'mai, Blackfathom Deeps"
              }
            ]
          },
          "finger2": {
            "name": "Band of the Arcanist",
            "quality": "q3",
            "icon": "inv_jewelry_ring_14.jpg",
            "stats": "+8 Int, +4 Sta",
            "enchant": "None",
            "source": "City of Dalaran Rare Boss",
            "alts": [
              {
                "name": "Lavishly Jeweled Ring",
                "quality": "q3",
                "icon": "inv_jewelry_ring_03.jpg",
                "stats": "+6 Int, +2 Agi",
                "source": "Deadmines"
              },
              {
                "name": "Violet Signet",
                "quality": "q3",
                "icon": "inv_jewelry_ring_15.jpg",
                "stats": "+8 Int, +6 Sta, +7 Spell Power",
                "source": "City of Dalaran Arcane Vault"
              },
              {
                "name": "Deep Fathom Ring",
                "quality": "q3",
                "icon": "inv_jewelry_ring_14.jpg",
                "stats": "+6 Int, +5 Sta, +4 Spi",
                "source": "Aku'mai, Blackfathom Deeps"
              }
            ]
          },
          "trinket1": {
            "name": "Minor Recombobulator",
            "quality": "q2",
            "icon": "inv_gizmo_07.jpg",
            "stats": "Use: Restores HP/Mana, cures polymorph",
            "enchant": "None",
            "source": "Engineering",
            "alts": [
              {
                "name": "Burst of Knowledge",
                "quality": "q3",
                "icon": "inv_jewelry_talisman_07.jpg",
                "stats": "Use: Increases Spell Damage by +20 for 15 sec",
                "source": "City of Dalaran"
              },
              {
                "name": "Insignia of the Alliance / Horde",
                "quality": "q3",
                "icon": "inv_jewelry_trinketpvp_01.jpg",
                "stats": "Use: Dispels fear, stun, and sleep",
                "source": "PvP Rank 2 Honor Vendor"
              },
              {
                "name": "Rune of Duty",
                "quality": "q2",
                "icon": "inv_misc_rune_01.jpg",
                "stats": "+10 Stamina",
                "source": "Warsong Gulch Friendly Vendor"
              }
            ]
          },
          "trinket2": {
            "name": "Parchment of Inner Light",
            "quality": "q3",
            "icon": "inv_misc_book_09.jpg",
            "stats": "Equip: Restores 6 mana per 5 sec",
            "enchant": "None",
            "source": "City of Dalaran Secret Library Tomb",
            "alts": [
              {
                "name": "Dog Whistle",
                "quality": "q3",
                "icon": "ability_hunter_beastcall.jpg",
                "stats": "Use: Summons a tracking battle hound (10 min)",
                "source": "Houndmaster Loksey, SM Graveyard"
              },
              {
                "name": "Smolderweb Eye",
                "quality": "q3",
                "icon": "inv_misc_gem_pearl_04.jpg",
                "stats": "Use: Shoots a web immobilizing target for 5 sec",
                "source": "LBRS Rare / World Quest"
              },
              {
                "name": "Insignia of the Alliance / Horde",
                "quality": "q3",
                "icon": "inv_jewelry_trinketpvp_01.jpg",
                "stats": "Use: Dispels fear, stun, and sleep",
                "source": "PvP Rank 2 Honor Vendor"
              }
            ]
          },
          "mainHand": {
            "name": "Inventor's Focal Rod",
            "quality": "q3",
            "icon": "inv_wand_06.jpg",
            "stats": "+9 Int, +6 Spi, +16 Healing",
            "enchant": "Lesser Spell Power (+15 Healing)",
            "source": "Electrocutioner 6000, Gnomeregan",
            "alts": [
              {
                "name": "Scepter of the Council",
                "quality": "q3",
                "icon": "inv_mace_11.jpg",
                "stats": "+8 Int, +7 Sta, +14 Healing",
                "source": "City of Dalaran"
              },
              {
                "name": "Hypnotic Blade",
                "quality": "q3",
                "icon": "inv_sword_01.jpg",
                "stats": "1.40 Speed • +8 Int, +3 Spi, +9 Spell Power",
                "source": "Scarlet Monastery Graveyard"
              },
              {
                "name": "Kirin Tor Scepter",
                "quality": "q3",
                "icon": "inv_mace_07.jpg",
                "stats": "2.10 Speed • +9 Int, +6 Sta, +8 Spell Power",
                "source": "City of Dalaran"
              }
            ]
          },
          "offHand": {
            "name": "Arctic Buckler",
            "quality": "q3",
            "icon": "inv_shield_08.jpg",
            "stats": "980 Armor, 25 Block • +8 Sta, +5 Spirit, +9 Healing",
            "enchant": "Lesser Stamina (+5 Sta)",
            "source": "Scarlet Monastery Graveyard",
            "alts": [
              {
                "name": "Commander's Crest",
                "quality": "q3",
                "icon": "inv_shield_05.jpg",
                "stats": "1050 Armor • +8 Str, +7 Sta",
                "source": "Shadowfang Keep"
              },
              {
                "name": "Aegis of the Sun",
                "quality": "q3",
                "icon": "inv_shield_10.jpg",
                "stats": "1100 Armor, 28 Block • +9 Sta, +5 Str",
                "source": "City of Dalaran"
              }
            ]
          },
          "ranged": {
            "name": "Libram of Hope",
            "quality": "q3",
            "icon": "inv_misc_book_06.jpg",
            "stats": "+15 Holy Spell Power & Flash of Light Mana Reduction",
            "enchant": "None",
            "source": "City of Dalaran Secret Library Tomb",
            "alts": [
              {
                "name": "Gravestone Scepter",
                "quality": "q3",
                "icon": "inv_wand_02.jpg",
                "stats": "29.0 DPS Shadow • +5 Int, +3 Sta",
                "source": "Blackfathom Villainy Quest"
              },
              {
                "name": "Kirin Tor Apprentice Wand",
                "quality": "q3",
                "icon": "inv_wand_06.jpg",
                "stats": "31.2 DPS Arcane • +6 Int, +4 Spell Power",
                "source": "City of Dalaran Boss"
              },
              {
                "name": "Petrified Bone Wand",
                "quality": "q3",
                "icon": "inv_wand_01.jpg",
                "stats": "28.5 DPS Nature • +5 Int, +4 Sta",
                "source": "Excavation Site 4"
              }
            ]
          }
        }
      },
      {
        "id": "prot-tank",
        "name": "Protection Tank",
        "role": "Frontline Tank (Shield & Seal of Fury)",
        "icon": "https://render.worldofwarcraft.com/us/icons/56/spell_holy_devotionaura.jpg",
        "weaponType": "One-Hand Mace / Sword + Shield",
        "statSummary": {
          "alliance": {
            "hp": 1420,
            "armor": 2280,
            "str": 148,
            "agi": 72,
            "sta": 136,
            "int": 85,
            "spi": 40,
            "ap": "+44",
            "block": "29%",
            "hit": "3%"
          }
        },
        "talents": {
          "points": "0 / 21 / 5",
          "summary": "Redoubt + Precision + Toughness + Blessing of Sanctuary + Seal of Fury Taunt",
          "buildCode": "FOREVER-PALADIN-PROT-30-0-21-5",
          "trees": [
            {
              "name": "Holy",
              "icon": "https://render.worldofwarcraft.com/us/icons/56/spell_holy_holybolt.jpg",
              "points": 0,
              "talents": []
            },
            {
              "name": "Protection",
              "icon": "https://render.worldofwarcraft.com/us/icons/56/spell_holy_devotionaura.jpg",
              "points": 21,
              "talents": [
                {
                  "name": "Redoubt",
                  "rank": "5/5",
                  "desc": "Damaging melee attacks have a 10% chance to increase Block chance by 30%."
                },
                {
                  "name": "Precision",
                  "rank": "3/3",
                  "desc": "Increases your chance to hit with melee attacks by 3%."
                },
                {
                  "name": "Toughness",
                  "rank": "5/5",
                  "desc": "Increases armor value from items by 10%."
                },
                {
                  "name": "Shield of Righteousness",
                  "rank": "1/1",
                  "desc": "Slashes the target with your shield, dealing Holy threat damage."
                },
                {
                  "name": "Blessing of Sanctuary",
                  "rank": "1/1",
                  "desc": "Reduces damage taken by all attacks by 10 and deals Holy damage back on block."
                },
                {
                  "name": "One-Handed Weapon Spec",
                  "rank": "5/5",
                  "desc": "Increases damage dealt with one-handed melee weapons by 10%."
                },
                {
                  "name": "Holy Shield",
                  "rank": "1/1",
                  "desc": "Increases chance to block by 30% and causes blocked attacks to deal Holy damage."
                }
              ]
            },
            {
              "name": "Retribution",
              "icon": "https://render.worldofwarcraft.com/us/icons/56/spell_holy_auraoflight.jpg",
              "points": 5,
              "talents": [
                {
                  "name": "Benediction",
                  "rank": "5/5",
                  "desc": "Reduces the Mana cost of Judgement and Seals by 15%."
                }
              ]
            }
          ]
        },
        "gear": {
          "head": {
            "name": "Tusken Helm",
            "quality": "q3",
            "icon": "inv_helmet_09.jpg",
            "stats": "+15 Sta, +7 Agi",
            "enchant": "Lesser Arcanum of Constitution (+100 HP)",
            "source": "Overlord Ramtusk, Razorfen Kraul",
            "alts": [
              {
                "name": "Tusken Helm",
                "quality": "q3",
                "icon": "inv_helmet_09.jpg",
                "stats": "+15 Sta, +7 Agi",
                "source": "Overlord Ramtusk, Razorfen Kraul"
              },
              {
                "name": "Infiltrator Cap of the Tiger",
                "quality": "q2",
                "icon": "inv_helmet_15.jpg",
                "stats": "+8 Str, +8 Agi",
                "source": "World Drop / Auction House"
              },
              {
                "name": "Green Tinted Goggles",
                "quality": "q2",
                "icon": "inv_gizmo_01.jpg",
                "stats": "+8 Sta, +8 Agi",
                "source": "Engineering (150)"
              }
            ]
          },
          "neck": {
            "name": "Ghostshard Talisman",
            "quality": "q3",
            "icon": "inv_jewelry_necklace_06.jpg",
            "stats": "+11 Sta, +4 Str",
            "enchant": "None",
            "source": "Scarlet Monastery Graveyard",
            "alts": [
              {
                "name": "Ghostshard Talisman",
                "quality": "q3",
                "icon": "inv_jewelry_necklace_06.jpg",
                "stats": "+11 Sta, +4 Str",
                "source": "Scarlet Monastery Graveyard"
              },
              {
                "name": "Mark of the Pack Leader",
                "quality": "q3",
                "icon": "inv_jewelry_necklace_04.jpg",
                "stats": "+8 Agi, +6 Sta",
                "source": "The Barrens Rare / Quest"
              },
              {
                "name": "Fossilized Amber Pendant",
                "quality": "q3",
                "icon": "inv_jewelry_necklace_12.jpg",
                "stats": "+7 Agi, +5 Sta, +4 Str",
                "source": "Excavation Site 4 Boss"
              }
            ]
          },
          "shoulder": {
            "name": "Sanguine Pauldrons",
            "quality": "q2",
            "icon": "inv_shoulder_29.jpg",
            "stats": "+9 Str, +5 Sta",
            "enchant": "None",
            "source": "The Karnitol Shipwreck Quest",
            "alts": [
              {
                "name": "Forest Tracker Epaulets",
                "quality": "q3",
                "icon": "inv_shoulder_18.jpg",
                "stats": "+11 Agi, +5 Str",
                "source": "World Drop"
              },
              {
                "name": "Cutthroat's Mantle of the Tiger",
                "quality": "q2",
                "icon": "inv_shoulder_11.jpg",
                "stats": "+7 Str, +7 Agi",
                "source": "World Drop"
              },
              {
                "name": "Barbaric Shoulders",
                "quality": "q2",
                "icon": "inv_shoulder_08.jpg",
                "stats": "+7 Str, +6 Sta",
                "source": "Leatherworking (175)"
              }
            ]
          },
          "back": {
            "name": "Crocolisk Skin Gaiter",
            "quality": "q3",
            "icon": "inv_misc_monsterscales_02.jpg",
            "stats": "+6 Str, +6 Sta, +5 Agi",
            "enchant": "Lesser Defense (+30 Armor)",
            "source": "Excavation Site 4 Quest, Wetlands",
            "alts": [
              {
                "name": "Hawkeye's Cloak",
                "quality": "q2",
                "icon": "inv_misc_cape_03.jpg",
                "stats": "+8 Agi, +3 Sta",
                "source": "World Drop"
              },
              {
                "name": "Crocolisk Skin Gaiter",
                "quality": "q3",
                "icon": "inv_misc_monsterscales_02.jpg",
                "stats": "+6 Str, +6 Sta, +5 Agi",
                "source": "Excavation Site 4 Quest, Wetlands"
              },
              {
                "name": "Batwing Cloak",
                "quality": "q3",
                "icon": "inv_misc_cape_06.jpg",
                "stats": "+5 Agi, +7 Sta",
                "source": "Razorfen Kraul"
              }
            ]
          },
          "chest": {
            "name": "Shining Silver Breastplate",
            "quality": "q3",
            "icon": "inv_chest_plate15.jpg",
            "stats": "+14 Str, +8 Sta, 298 Armor",
            "enchant": "Greater Health (+35 Health)",
            "source": "Blacksmithing (145)",
            "alts": [
              {
                "name": "Avenger's Armor",
                "quality": "q3",
                "icon": "inv_chest_chain.jpg",
                "stats": "+15 Str, +7 Sta",
                "source": "Razorfen Kraul"
              },
              {
                "name": "Shining Silver Breastplate",
                "quality": "q3",
                "icon": "inv_chest_plate15.jpg",
                "stats": "+14 Str, +8 Sta",
                "source": "Blacksmithing (145)"
              },
              {
                "name": "Mana-Warped Chain Shirt",
                "quality": "q3",
                "icon": "inv_chest_chain_04.jpg",
                "stats": "+13 Str, +9 Sta",
                "source": "City of Dalaran"
              }
            ]
          },
          "wrist": {
            "name": "Pugilist Bracers",
            "quality": "q3",
            "icon": "inv_bracer_03.jpg",
            "stats": "+7 Sta, +4 Agi, +3 Str",
            "enchant": "Lesser Stamina (+5 Stamina)",
            "source": "Razorfen Kraul Trash",
            "alts": [
              {
                "name": "Unearthed Bands of the Tiger",
                "quality": "q3",
                "icon": "inv_bracer_06.jpg",
                "stats": "+7 Str, +7 Agi",
                "source": "Uldaman / World Drop"
              },
              {
                "name": "Pugilist Bracers",
                "quality": "q3",
                "icon": "inv_bracer_03.jpg",
                "stats": "+7 Sta, +4 Agi, +3 Str",
                "source": "Razorfen Kraul Trash"
              },
              {
                "name": "Arathi Armbands",
                "quality": "q2",
                "icon": "inv_bracer_09.jpg",
                "stats": "+7 Str, +4 Sta",
                "source": "Arathi Quest"
              }
            ]
          },
          "hands": {
            "name": "Algae Fists",
            "quality": "q3",
            "icon": "inv_gauntlets_22.jpg",
            "stats": "+10 Str, +8 Sta",
            "enchant": "Strength (+7 Str)",
            "source": "Gelihast, Blackfathom Deeps",
            "alts": [
              {
                "name": "True-Aim Stalkers",
                "quality": "q3",
                "icon": "inv_gauntlets_28.jpg",
                "stats": "+9 Agi, +6 Sta, +1% Hit",
                "source": "Excavation Site 4 Boss"
              },
              {
                "name": "Tiger Hunter Gloves",
                "quality": "q2",
                "icon": "inv_gauntlets_04.jpg",
                "stats": "+9 Str, +8 Agi",
                "source": "Stranglethorn Vale Tiger Mastery"
              },
              {
                "name": "Algae Fists",
                "quality": "q3",
                "icon": "inv_gauntlets_22.jpg",
                "stats": "+10 Str, +8 Sta",
                "source": "Gelihast, Blackfathom Deeps"
              }
            ]
          },
          "waist": {
            "name": "Officer's Belt",
            "quality": "q3",
            "icon": "inv_belt_20.jpg",
            "stats": "+12 Str, +6 Sta",
            "enchant": "None",
            "source": "PvP Rank 4 Honor Vendor",
            "alts": [
              {
                "name": "Officer's Belt",
                "quality": "q3",
                "icon": "inv_belt_20.jpg",
                "stats": "+12 Str, +6 Sta",
                "source": "PvP Rank 4 Honor Vendor"
              },
              {
                "name": "Cobrahn's Grasp",
                "quality": "q3",
                "icon": "inv_belt_12.jpg",
                "stats": "+8 Agi, +5 Sta, +5 Str",
                "source": "Wailing Caverns"
              },
              {
                "name": "Ogron's Sash",
                "quality": "q3",
                "icon": "inv_belt_03.jpg",
                "stats": "+10 Str, +6 Sta",
                "source": "World Drop"
              }
            ]
          },
          "legs": {
            "name": "Veteran's Silvered Chain Leggings",
            "quality": "q3",
            "icon": "inv_pants_mail_05.jpg",
            "stats": "+14 Str, +11 Sta, +8 Agi",
            "enchant": "Armor +24 and Stamina +10",
            "source": "Blacksmithing (120)",
            "alts": [
              {
                "name": "Veteran's Silvered Chain Leggings",
                "quality": "q3",
                "icon": "inv_pants_mail_05.jpg",
                "stats": "+14 Str, +11 Sta, +8 Agi",
                "source": "Blacksmithing (120)"
              },
              {
                "name": "Triprunner Dungarees",
                "quality": "q3",
                "icon": "inv_pants_06.jpg",
                "stats": "+18 Agi, +4 Sta",
                "source": "Gnomeregan Quest"
              },
              {
                "name": "Gryphon Rider's Leggings",
                "quality": "q3",
                "icon": "inv_pants_03.jpg",
                "stats": "+13 Str, +8 Sta",
                "source": "Excavation Site 4 Quest"
              }
            ]
          },
          "feet": {
            "name": "Excavator's Work Boots",
            "quality": "q3",
            "icon": "inv_boots_chain_06.jpg",
            "stats": "+8 Str, +8 Sta, +5 Agi",
            "enchant": "Minor Speed (+8% Movement)",
            "source": "Excavation Site 4 Overseer",
            "alts": [
              {
                "name": "Trouncing Boots",
                "quality": "q2",
                "icon": "inv_boots_01.jpg",
                "stats": "+9 Str, +8 Agi",
                "source": "The Karnitol Shipwreck (Alliance)"
              },
              {
                "name": "Shapeshifting Sentinel's Strides",
                "quality": "q3",
                "icon": "inv_boots_chain_08.jpg",
                "stats": "+11 Str, +9 Agi, +7 Sta",
                "source": "Blackfathom Deeps (Horde)"
              },
              {
                "name": "Excavator's Work Boots",
                "quality": "q3",
                "icon": "inv_boots_chain_06.jpg",
                "stats": "+8 Str, +8 Sta, +5 Agi",
                "source": "Excavation Site 4 Overseer"
              }
            ]
          },
          "finger1": {
            "name": "Wyvern Heart Band",
            "quality": "q3",
            "icon": "inv_jewelry_ring_25.jpg",
            "stats": "+7 Str, +6 Agi, +5 Sta",
            "enchant": "None",
            "source": "Harpy Matriarch / World Drop",
            "alts": [
              {
                "name": "Wyvern Heart Band",
                "quality": "q3",
                "icon": "inv_jewelry_ring_25.jpg",
                "stats": "+7 Str, +6 Agi, +5 Sta",
                "source": "Harpy Matriarch / World Drop"
              },
              {
                "name": "Tigerstrike Signet",
                "quality": "q3",
                "icon": "inv_jewelry_ring_16.jpg",
                "stats": "+8 Str, +5 Agi",
                "source": "King Bangalash, STV"
              },
              {
                "name": "Blackstone Ring",
                "quality": "q3",
                "icon": "inv_jewelry_ring_17.jpg",
                "stats": "+6 Str, +1% Hit",
                "source": "Princess Theradras, Maraudon"
              }
            ]
          },
          "finger2": {
            "name": "Savory Devourer Band",
            "quality": "q2",
            "icon": "inv_jewelry_ring_08.jpg",
            "stats": "+6 Str, +5 Sta",
            "enchant": "None",
            "source": "Excavation Site 4 Rare",
            "alts": [
              {
                "name": "Tigerstrike Signet",
                "quality": "q3",
                "icon": "inv_jewelry_ring_16.jpg",
                "stats": "+8 Str, +5 Agi",
                "source": "King Bangalash, STV"
              },
              {
                "name": "Blackstone Ring",
                "quality": "q3",
                "icon": "inv_jewelry_ring_17.jpg",
                "stats": "+6 Str, +1% Hit",
                "source": "Princess Theradras, Maraudon"
              },
              {
                "name": "Savory Devourer Band",
                "quality": "q2",
                "icon": "inv_jewelry_ring_08.jpg",
                "stats": "+6 Str, +5 Sta",
                "source": "Excavation Site 4 Rare"
              }
            ]
          },
          "trinket1": {
            "name": "Minor Recombobulator",
            "quality": "q2",
            "icon": "inv_gizmo_07.jpg",
            "stats": "Use: Restores HP/Mana, cures polymorph",
            "enchant": "None",
            "source": "Engineering (140)",
            "alts": [
              {
                "name": "Insignia of the Alliance / Horde",
                "quality": "q3",
                "icon": "inv_jewelry_trinketpvp_01.jpg",
                "stats": "Use: Dispels fear, stun, and sleep",
                "source": "PvP Rank 2 Honor Vendor"
              },
              {
                "name": "Gyromatic Icemaker",
                "quality": "q2",
                "icon": "inv_gizmo_03.jpg",
                "stats": "Use: Blasts target with frost dealing damage",
                "source": "Engineering (145)"
              },
              {
                "name": "Rune of Duty",
                "quality": "q2",
                "icon": "inv_misc_rune_01.jpg",
                "stats": "+10 Stamina",
                "source": "Warsong Gulch Friendly Vendor"
              }
            ]
          },
          "trinket2": {
            "name": "Dog Whistle",
            "quality": "q3",
            "icon": "ability_hunter_beastcall.jpg",
            "stats": "Use: Summons a battle dog",
            "enchant": "None",
            "source": "Houndmaster Loksey, SM Graveyard",
            "alts": [
              {
                "name": "Smolderweb Eye",
                "quality": "q3",
                "icon": "inv_misc_gem_pearl_04.jpg",
                "stats": "Use: Shoots a web immobilizing target for 5 sec",
                "source": "LBRS Rare / World Quest"
              },
              {
                "name": "Insignia of the Alliance / Horde",
                "quality": "q3",
                "icon": "inv_jewelry_trinketpvp_01.jpg",
                "stats": "Use: Dispels fear, stun, and sleep",
                "source": "PvP Rank 2 Honor Vendor"
              },
              {
                "name": "Minor Recombobulator",
                "quality": "q2",
                "icon": "inv_gizmo_07.jpg",
                "stats": "Use: Restores HP/Mana, cures polymorph",
                "source": "Engineering (140)"
              }
            ]
          },
          "mainHand": {
            "name": "Outlaw Sabre",
            "quality": "q3",
            "icon": "inv_sword_20.jpg",
            "stats": "2.70 Speed • 18.2 DPS • +6 Agi, +3 Sta",
            "enchant": "Weapon Damage +4",
            "source": "Blackfathom Deeps Quest Reward",
            "alts": [
              {
                "name": "Scin-Rending Cleaver",
                "quality": "q3",
                "icon": "inv_axe_04.jpg",
                "stats": "2.50 Speed • +7 Str, +4 Sta",
                "source": "Excavation Site 4"
              },
              {
                "name": "Redbeard Crest Mace",
                "quality": "q3",
                "icon": "inv_mace_01.jpg",
                "stats": "2.40 Speed • +8 Str, +5 Sta",
                "source": "City of Dalaran"
              },
              {
                "name": "Pronged Reaver",
                "quality": "q3",
                "icon": "inv_axe_01.jpg",
                "stats": "2.60 Speed • +8 Str, +5 Sta",
                "source": "Razorfen Kraul"
              }
            ]
          },
          "offHand": {
            "name": "Commander's Crest",
            "quality": "q3",
            "icon": "inv_shield_05.jpg",
            "stats": "1050 Armor, 27 Block • +8 Str, +7 Sta",
            "enchant": "Lesser Block (+2% Block)",
            "source": "Commander Springvale, Shadowfang Keep",
            "alts": [
              {
                "name": "Arctic Buckler",
                "quality": "q3",
                "icon": "inv_shield_08.jpg",
                "stats": "980 Armor, 25 Block • +8 Sta, +5 Spirit",
                "source": "Scarlet Monastery Graveyard"
              },
              {
                "name": "Aegis of the Sun",
                "quality": "q3",
                "icon": "inv_shield_10.jpg",
                "stats": "1100 Armor, 28 Block • +9 Sta, +5 Str",
                "source": "City of Dalaran"
              },
              {
                "name": "Crest of Darkshire",
                "quality": "q2",
                "icon": "inv_shield_06.jpg",
                "stats": "890 Armor, 22 Block • +6 Sta, +4 Str",
                "source": "Duskwood Quest"
              }
            ]
          },
          "ranged": {
            "name": "Libram of Hope",
            "quality": "q3",
            "icon": "inv_misc_book_11.jpg",
            "stats": "Equip: Reduces mana cost of Holy Light by 15",
            "enchant": "None",
            "source": "Excavation Site 4 Sacred Relic",
            "alts": [
              {
                "name": "Libram of Fervor",
                "quality": "q2",
                "icon": "inv_misc_book_10.jpg",
                "stats": "Equip: Increases Seal of Fury threat by 10%",
                "source": "World Drop"
              },
              {
                "name": "Libram of Truth",
                "quality": "q2",
                "icon": "inv_misc_book_09.jpg",
                "stats": "Equip: +5 Armor on Devotion Aura",
                "source": "Scarlet Monastery Graveyard"
              }
            ]
          }
        }
      }
    ]
  },
  "hunter": {
    "specs": [
      {
        "id": "pve",
        "name": "Marksman / BM PvE",
        "role": "Ranged Physical DPS",
        "icon": "https://render.worldofwarcraft.com/us/icons/56/ability_marksmanship.jpg",
        "weaponType": "Bow / Gun / Crossbow + Dual Daggers/Polearm",
        "statSummary": {
          "alliance": {
            "hp": 1180,
            "mana": 1420,
            "armor": 960,
            "agi": 168,
            "sta": 98,
            "int": 72,
            "rap": "+148 RAP",
            "crit": "16.4%",
            "hit": "3%"
          },
          "horde": {
            "hp": 1210,
            "mana": 1390,
            "armor": 960,
            "agi": 170,
            "sta": 100,
            "int": 70,
            "rap": "+152 RAP",
            "crit": "16.6%",
            "hit": "3%"
          }
        },
        "talents": {
          "points": "21 / 5 / 0",
          "summary": "Lethality + Mortal Shots + Aimed Shot (Max burst rotation at 30 cap)",
          "buildCode": "FOREVER-HUNTER-MM-30-5-21-0",
          "trees": [
            {
              "name": "Beast Mastery",
              "icon": "https://render.worldofwarcraft.com/us/icons/56/ability_hunter_beasttaming.jpg",
              "points": 5,
              "talents": [
                {
                  "name": "Endurance Training",
                  "rank": "5/5",
                  "desc": "Increases pet health by 15% and Hunter health by 5%."
                }
              ]
            },
            {
              "name": "Marksmanship",
              "icon": "https://render.worldofwarcraft.com/us/icons/56/ability_marksmanship.jpg",
              "points": 21,
              "talents": [
                {
                  "name": "Efficiency",
                  "rank": "5/5",
                  "desc": "Reduces mana cost of Shots and Stings by 10%."
                },
                {
                  "name": "Lethality",
                  "rank": "5/5",
                  "desc": "Increases critical strike damage bonus of Shots by 30%."
                },
                {
                  "name": "Aimed Shot",
                  "rank": "1/1",
                  "desc": "An aimed shot that deals weapon damage +70 and reduces target healing taken."
                },
                {
                  "name": "Hawk Eye",
                  "rank": "3/3",
                  "desc": "Increases range of ranged weapons by 6 yards."
                },
                {
                  "name": "Mortal Shots",
                  "rank": "5/5",
                  "desc": "Increases ranged critical strike damage bonus by 30%."
                },
                {
                  "name": "Cobra Shot",
                  "rank": "2/2",
                  "isNew": true,
                  "desc": "Classic+ Shot: An instant venomous shot dealing Nature damage that extends Serpent Sting duration."
                }
              ]
            },
            {
              "name": "Survival",
              "icon": "https://render.worldofwarcraft.com/us/icons/56/ability_hunter_swiftstrike.jpg",
              "points": 0,
              "talents": []
            }
          ]
        },
        "gear": {
          "head": {
            "name": "Infiltrator Cap of the Tiger",
            "quality": "q2",
            "icon": "inv_helmet_15.jpg",
            "stats": "+8 Str, +8 Agi",
            "enchant": "Lesser Arcanum of Voracity (+8 Agi)",
            "source": "World Drop",
            "alts": [
              {
                "name": "Tusken Helm",
                "quality": "q3",
                "icon": "inv_helmet_09.jpg",
                "stats": "+15 Sta, +7 Agi",
                "source": "Razorfen Kraul"
              },
              {
                "name": "Green Tinted Goggles",
                "quality": "q2",
                "icon": "inv_gizmo_01.jpg",
                "stats": "+8 Sta, +8 Agi",
                "source": "Engineering (150)"
              },
              {
                "name": "Veteran's Silvered Chain Helm",
                "quality": "q3",
                "icon": "inv_helmet_39.jpg",
                "stats": "+10 Str, +8 Sta, +1% Crit",
                "source": "Blacksmithing (130)"
              }
            ]
          },
          "neck": {
            "name": "Mark of the Pack Leader",
            "quality": "q3",
            "icon": "inv_jewelry_necklace_04.jpg",
            "stats": "+8 Agi, +6 Sta, +8 RAP",
            "enchant": "None",
            "source": "Humar the Pridelord (The Barrens Rare Black Lion)",
            "alts": [
              {
                "name": "Ghostshard Talisman",
                "quality": "q3",
                "icon": "inv_jewelry_necklace_06.jpg",
                "stats": "+11 Sta, +4 Str",
                "source": "SM Graveyard"
              },
              {
                "name": "Fossilized Amber Pendant",
                "quality": "q3",
                "icon": "inv_jewelry_necklace_12.jpg",
                "stats": "+7 Agi, +5 Sta, +4 Str",
                "source": "Excavation Site 4 Boss"
              },
              {
                "name": "Thermaplugg Medal of Honor",
                "quality": "q3",
                "icon": "inv_jewelry_amulet_03.jpg",
                "stats": "+8 Sta, +7 Str",
                "source": "Mekgineer Thermaplugg, Gnomeregan"
              }
            ]
          },
          "shoulder": {
            "name": "Forest Tracker Epaulets",
            "quality": "q3",
            "icon": "inv_shoulder_18.jpg",
            "stats": "+11 Agi, +5 Str",
            "enchant": "None",
            "source": "World Drop",
            "alts": [
              {
                "name": "Cutthroat's Mantle of the Tiger",
                "quality": "q2",
                "icon": "inv_shoulder_11.jpg",
                "stats": "+7 Str, +7 Agi",
                "source": "World Drop"
              },
              {
                "name": "Barbaric Shoulders",
                "quality": "q2",
                "icon": "inv_shoulder_08.jpg",
                "stats": "+7 Str, +6 Sta",
                "source": "Leatherworking (175)"
              },
              {
                "name": "Mantle of Thieves",
                "quality": "q2",
                "icon": "inv_shoulder_07.jpg",
                "stats": "+10 Agi, +3 Sta",
                "source": "The Stockade / Dalaran Outskirts"
              }
            ]
          },
          "back": {
            "name": "Hawkeye's Cloak",
            "quality": "q2",
            "icon": "inv_misc_cape_03.jpg",
            "stats": "+8 Agi, +3 Sta",
            "enchant": "Lesser Agility (+3 Agi)",
            "source": "World Drop",
            "alts": [
              {
                "name": "Crocolisk Skin Gaiter",
                "quality": "q3",
                "icon": "inv_misc_monsterscales_02.jpg",
                "stats": "+6 Str, +6 Sta, +5 Agi",
                "source": "Excavation Site 4"
              },
              {
                "name": "Batwing Cloak",
                "quality": "q3",
                "icon": "inv_misc_cape_06.jpg",
                "stats": "+5 Agi, +7 Sta",
                "source": "Razorfen Kraul"
              },
              {
                "name": "Drape of Shifting Energy",
                "quality": "q3",
                "icon": "inv_misc_cape_18.jpg",
                "stats": "+7 Sta, +6 Str",
                "source": "City of Dalaran"
              }
            ]
          },
          "chest": {
            "name": "Infiltrator Armor of the Tiger",
            "quality": "q2",
            "icon": "inv_chest_leather_03.jpg",
            "stats": "+11 Str, +11 Agi",
            "enchant": "Greater Health (+35 HP)",
            "source": "World Drop",
            "alts": [
              {
                "name": "Tunic of Westfall",
                "quality": "q3",
                "icon": "inv_chest_cloth_05.jpg",
                "stats": "+11 Agi, +5 Sta",
                "source": "Deadmines Quest"
              },
              {
                "name": "Toughened Leather Armor",
                "quality": "q2",
                "icon": "inv_chest_leather_08.jpg",
                "stats": "+15 Agi, +5 Sta",
                "source": "Leatherworking (155)"
              },
              {
                "name": "Black Whelp Tunic",
                "quality": "q2",
                "icon": "inv_chest_leather_04.jpg",
                "stats": "+8 Agi, +8 Sta, +6 Str",
                "source": "Redridge Rare / AH"
              }
            ]
          },
          "wrist": {
            "name": "Unearthed Bands of the Tiger",
            "quality": "q3",
            "icon": "inv_bracer_06.jpg",
            "stats": "+7 Str, +7 Agi",
            "enchant": "Lesser Agility (+3 Agi)",
            "source": "Uldaman / World Drop",
            "alts": [
              {
                "name": "Hawkeye's Bracers",
                "quality": "q2",
                "icon": "inv_bracer_04.jpg",
                "stats": "+6 Agi, +3 Sta",
                "source": "World Drop"
              },
              {
                "name": "Pugilist Bracers",
                "quality": "q3",
                "icon": "inv_bracer_03.jpg",
                "stats": "+7 Sta, +4 Agi, +3 Str",
                "source": "Razorfen Kraul Trash"
              },
              {
                "name": "Arathi Armbands",
                "quality": "q2",
                "icon": "inv_bracer_09.jpg",
                "stats": "+7 Str, +4 Sta",
                "source": "Arathi Quest"
              }
            ]
          },
          "hands": {
            "name": "True-Aim Stalkers",
            "quality": "q3",
            "icon": "inv_gauntlets_28.jpg",
            "stats": "+9 Agi, +6 Sta, +1% Hit",
            "enchant": "Lesser Agility (+5 Agi)",
            "source": "Excavation Site 4 Dungeon Boss",
            "alts": [
              {
                "name": "Tiger Hunter Gloves",
                "quality": "q2",
                "icon": "inv_gauntlets_04.jpg",
                "stats": "+9 Str, +8 Agi",
                "source": "Tiger Mastery Quest"
              },
              {
                "name": "Algae Fists",
                "quality": "q3",
                "icon": "inv_gauntlets_22.jpg",
                "stats": "+10 Str, +8 Sta",
                "source": "Gelihast, Blackfathom Deeps"
              },
              {
                "name": "Veteran's Silvered Chain Gauntlets",
                "quality": "q3",
                "icon": "inv_gauntlets_16.jpg",
                "stats": "+9 Str, +7 Sta, +6 Agi",
                "source": "Blacksmithing (105)"
              }
            ]
          },
          "waist": {
            "name": "Cobrahn's Grasp",
            "quality": "q3",
            "icon": "inv_belt_12.jpg",
            "stats": "+8 Agi, +5 Sta, +5 Str",
            "enchant": "None",
            "source": "Lord Cobrahn, Wailing Caverns",
            "alts": [
              {
                "name": "Officer's Belt",
                "quality": "q3",
                "icon": "inv_belt_20.jpg",
                "stats": "+12 Str, +6 Sta",
                "source": "PvP Honor Vendor"
              },
              {
                "name": "Ogron's Sash",
                "quality": "q3",
                "icon": "inv_belt_03.jpg",
                "stats": "+10 Str, +6 Sta",
                "source": "World Drop"
              },
              {
                "name": "Veteran's Silvered Chain Girdle",
                "quality": "q3",
                "icon": "inv_belt_15.jpg",
                "stats": "+9 Str, +7 Sta",
                "source": "Blacksmithing (100)"
              }
            ]
          },
          "legs": {
            "name": "Triprunner Dungarees",
            "quality": "q3",
            "icon": "inv_pants_06.jpg",
            "stats": "+18 Agi, +4 Sta",
            "enchant": "Lesser Agility (+8 Agi)",
            "source": "Quest: The Great Fras Siabi (Gnomeregan)",
            "alts": [
              {
                "name": "Infiltrator Leggings of the Tiger",
                "quality": "q2",
                "icon": "inv_pants_08.jpg",
                "stats": "+10 Str, +10 Agi",
                "source": "World Drop"
              },
              {
                "name": "Gryphon Rider's Leggings",
                "quality": "q3",
                "icon": "inv_pants_03.jpg",
                "stats": "+13 Str, +8 Sta",
                "source": "Excavation Site 4 Quest"
              },
              {
                "name": "Barbaric Leggings",
                "quality": "q2",
                "icon": "inv_pants_07.jpg",
                "stats": "+11 Agi, +6 Str",
                "source": "Leatherworking (175)"
              }
            ]
          },
          "feet": {
            "name": "Trouncing Boots",
            "quality": "q2",
            "icon": "inv_boots_01.jpg",
            "stats": "+9 Str, +8 Agi",
            "enchant": "Minor Speed (+8% Movement)",
            "source": "The Karnitol Shipwreck (Alliance) / Shapeshifting Sentinel's Strides (Horde)",
            "alts": [
              {
                "name": "Excavator's Work Boots",
                "quality": "q3",
                "icon": "inv_boots_chain_06.jpg",
                "stats": "+8 Str, +8 Sta, +5 Agi",
                "source": "Excavation Site 4"
              },
              {
                "name": "Shapeshifting Sentinel's Strides",
                "quality": "q3",
                "icon": "inv_boots_chain_08.jpg",
                "stats": "+11 Str, +9 Agi, +7 Sta",
                "source": "Blackfathom Deeps (Horde)"
              },
              {
                "name": "Silvered Bronze Boots",
                "quality": "q2",
                "icon": "inv_boots_chain_03.jpg",
                "stats": "+7 Str, +5 Sta",
                "source": "Blacksmithing (130)"
              }
            ]
          },
          "finger1": {
            "name": "Wyvern Heart Band",
            "quality": "q3",
            "icon": "inv_jewelry_ring_25.jpg",
            "stats": "+7 Str, +6 Agi, +5 Sta",
            "enchant": "None",
            "source": "Harpy Matriarch / World Drop",
            "alts": [
              {
                "name": "Seal of Wrynn",
                "quality": "q3",
                "icon": "inv_jewelry_ring_12.jpg",
                "stats": "+4 Agi, +4 Sta",
                "source": "Quest"
              },
              {
                "name": "Tigerstrike Signet",
                "quality": "q3",
                "icon": "inv_jewelry_ring_16.jpg",
                "stats": "+8 Str, +5 Agi",
                "source": "King Bangalash, STV"
              },
              {
                "name": "Blackstone Ring",
                "quality": "q3",
                "icon": "inv_jewelry_ring_17.jpg",
                "stats": "+6 Str, +1% Hit",
                "source": "Princess Theradras, Maraudon"
              }
            ]
          },
          "finger2": {
            "name": "Tigerstrike Signet",
            "quality": "q3",
            "icon": "inv_jewelry_ring_16.jpg",
            "stats": "+8 Str, +5 Agi",
            "enchant": "None",
            "source": "King Bangalash, Stranglethorn Vale",
            "alts": [
              {
                "name": "Blackstone Ring",
                "quality": "q3",
                "icon": "inv_jewelry_ring_17.jpg",
                "stats": "+6 Str, +1% Hit",
                "source": "Maraudon"
              },
              {
                "name": "Wyvern Heart Band",
                "quality": "q3",
                "icon": "inv_jewelry_ring_25.jpg",
                "stats": "+7 Str, +6 Agi, +5 Sta",
                "source": "Harpy Matriarch / World Drop"
              },
              {
                "name": "Savory Devourer Band",
                "quality": "q2",
                "icon": "inv_jewelry_ring_08.jpg",
                "stats": "+6 Str, +5 Sta",
                "source": "Excavation Site 4 Rare"
              }
            ]
          },
          "trinket1": {
            "name": "Minor Recombobulator",
            "quality": "q2",
            "icon": "inv_gizmo_07.jpg",
            "stats": "Restores HP/Mana, cures polymorph",
            "enchant": "None",
            "source": "Engineering",
            "alts": [
              {
                "name": "Insignia of the Alliance / Horde",
                "quality": "q3",
                "icon": "inv_jewelry_trinketpvp_01.jpg",
                "stats": "Use: Dispels fear, stun, and sleep",
                "source": "PvP Rank 2 Honor Vendor"
              },
              {
                "name": "Gyromatic Icemaker",
                "quality": "q2",
                "icon": "inv_gizmo_03.jpg",
                "stats": "Use: Blasts target with frost dealing damage",
                "source": "Engineering (145)"
              },
              {
                "name": "Rune of Duty",
                "quality": "q2",
                "icon": "inv_misc_rune_01.jpg",
                "stats": "+10 Stamina",
                "source": "Warsong Gulch Friendly Vendor"
              }
            ]
          },
          "trinket2": {
            "name": "Dog Whistle",
            "quality": "q3",
            "icon": "ability_hunter_beastcall.jpg",
            "stats": "Summons a hunting dog",
            "enchant": "None",
            "source": "Scarlet Monastery Graveyard",
            "alts": [
              {
                "name": "Smolderweb Eye",
                "quality": "q3",
                "icon": "inv_misc_gem_pearl_04.jpg",
                "stats": "Use: Shoots a web immobilizing target for 5 sec",
                "source": "LBRS Rare / World Quest"
              },
              {
                "name": "Insignia of the Alliance / Horde",
                "quality": "q3",
                "icon": "inv_jewelry_trinketpvp_01.jpg",
                "stats": "Use: Dispels fear, stun, and sleep",
                "source": "PvP Rank 2 Honor Vendor"
              },
              {
                "name": "Minor Recombobulator",
                "quality": "q2",
                "icon": "inv_gizmo_07.jpg",
                "stats": "Use: Restores HP/Mana, cures polymorph",
                "source": "Engineering (140)"
              }
            ]
          },
          "mainHand": {
            "name": "Cruel Barb",
            "quality": "q3",
            "icon": "inv_sword_19.jpg",
            "stats": "2.80 Speed • 18.2 DPS • +12 AP",
            "enchant": "Lesser Agility (+5 Agi)",
            "source": "Edwin VanCleef, The Deadmines",
            "alts": [
              {
                "name": "Meteor Shard",
                "quality": "q3",
                "icon": "inv_sword_27.jpg",
                "stats": "1.80 Speed • +35 Fire Proc",
                "source": "Shadowfang Keep"
              },
              {
                "name": "Scin-Rending Cleaver",
                "quality": "q3",
                "icon": "inv_axe_04.jpg",
                "stats": "2.50 Speed • 18.5 DPS • +7 Str, +4 Sta",
                "source": "Excavation Site 4 Boss"
              },
              {
                "name": "Pronged Reaver",
                "quality": "q3",
                "icon": "inv_axe_01.jpg",
                "stats": "2.60 Speed • 19.1 DPS • +8 Str, +5 Sta",
                "source": "Razorfen Kraul"
              }
            ]
          },
          "offHand": {
            "name": "Outlaw Sabre",
            "quality": "q3",
            "icon": "inv_sword_20.jpg",
            "stats": "2.70 Speed • 18.2 DPS • +6 Agi, +3 Sta",
            "enchant": "Lesser Agility (+5 Agi)",
            "source": "Blackfathom Deeps Quest",
            "alts": [
              {
                "name": "Tail Spike",
                "quality": "q3",
                "icon": "inv_sword_25.jpg",
                "stats": "+5 Agi, +3 Sta",
                "source": "Razorfen Kraul"
              },
              {
                "name": "Cruel Barb",
                "quality": "q3",
                "icon": "inv_sword_19.jpg",
                "stats": "2.80 Speed • 18.2 DPS • +12 AP",
                "source": "Edwin VanCleef, Deadmines"
              },
              {
                "name": "Toxic Revenger",
                "quality": "q3",
                "icon": "inv_weapon_shortblade_05.jpg",
                "stats": "2.70 Speed • 18.9 DPS • Chance on hit: Poison",
                "source": "Gnomeregan"
              }
            ]
          },
          "ranged": {
            "name": "Master Hunter's Rifle",
            "quality": "q2",
            "icon": "inv_weapon_rifle_05.jpg",
            "stats": "2.60 Speed • 23.4 DPS • +4 Agi, +3 Sta",
            "enchant": "Standard Scope (+2 Damage)",
            "source": "Master Hunter Quest (Stranglethorn Vale)",
            "alts": [
              {
                "name": "Excavation Carbine",
                "quality": "q3",
                "icon": "inv_weapon_rifle_01.jpg",
                "stats": "2.80 Speed • 24.8 DPS • +6 Agi, +4 Str",
                "source": "Excavation Site 4 Overseer"
              },
              {
                "name": "Nightstalker Bow",
                "quality": "q2",
                "icon": "inv_weapon_bow_08.jpg",
                "stats": "2.70 Speed • +5 Agi, +2 Sta",
                "source": "World Drop"
              },
              {
                "name": "Venomstrike",
                "quality": "q3",
                "icon": "inv_weapon_bow_01.jpg",
                "stats": "Chance on hit: 31-45 Poison damage",
                "source": "Lord Cobrahn, Wailing Caverns"
              }
            ]
          }
        }
      }
    ]
  },
  "mage": {
    "specs": [
      {
        "id": "frost-pve",
        "name": "Frost PvE",
        "role": "Ranged Caster DPS",
        "icon": "https://render.worldofwarcraft.com/us/icons/56/spell_frost_frostbolt02.jpg",
        "weaponType": "Staff or Dagger/Wand + Offhand",
        "statSummary": {
          "alliance": {
            "hp": 1050,
            "mana": 2450,
            "armor": 480,
            "int": 172,
            "spi": 88,
            "sta": 84,
            "frostSp": "+82 Frost Spell Dmg",
            "crit": "11.2%",
            "hit": "4%"
          },
          "horde": {
            "hp": 1070,
            "mana": 2420,
            "armor": 480,
            "int": 170,
            "spi": 90,
            "sta": 86,
            "frostSp": "+82 Frost Spell Dmg",
            "crit": "11.0%",
            "hit": "4%"
          }
        },
        "talents": {
          "points": "0 / 0 / 26",
          "summary": "Elemental Precision (+6% Hit) + Ice Shards (100% Crit bonus) + Shatter + Ice Block (Level 30 cap + 5 Talented perk points)",
          "buildCode": "FOREVER-MAGE-FROST-30-0-0-26",
          "trees": [
            {
              "name": "Arcane",
              "icon": "https://render.worldofwarcraft.com/us/icons/56/spell_holy_magicalsentry.jpg",
              "points": 0,
              "talents": []
            },
            {
              "name": "Fire",
              "icon": "https://render.worldofwarcraft.com/us/icons/56/spell_fire_firebolt02.jpg",
              "points": 0,
              "talents": []
            },
            {
              "name": "Frost",
              "icon": "https://render.worldofwarcraft.com/us/icons/56/spell_frost_frostbolt02.jpg",
              "points": 26,
              "talents": [
                {
                  "name": "Frost Warding",
                  "rank": "2/2",
                  "desc": "Increases armor and resistances provided by Frost Armor and Frost Ward."
                },
                {
                  "name": "Elemental Precision",
                  "rank": "3/3",
                  "desc": "Reduces mana cost and increases chance to hit with Frost spells by 6%."
                },
                {
                  "name": "Ice Shards",
                  "rank": "5/5",
                  "desc": "Increases critical strike damage bonus of Frost spells by 100%."
                },
                {
                  "name": "Improved Frostbolt",
                  "rank": "5/5",
                  "desc": "Reduces cast time of Frostbolt by 0.5 sec."
                },
                {
                  "name": "Piercing Ice",
                  "rank": "3/3",
                  "desc": "Increases damage done by Frost spells by 6%."
                },
                {
                  "name": "Cold Snap",
                  "rank": "1/1",
                  "desc": "Instantly resets cooldown of all Frost spells."
                },
                {
                  "name": "Shatter",
                  "rank": "5/5",
                  "desc": "Increases critical strike chance of all spells against frozen targets by 50%."
                },
                {
                  "name": "Ice Block",
                  "rank": "1/1",
                  "desc": "Encases caster in a block of ice, protecting from all physical and spell attacks for 10 sec."
                },
                {
                  "name": "Deep Freeze",
                  "rank": "1/1",
                  "isNew": true,
                  "desc": "Classic+ Ability: Stuns target for 5 sec. Only usable on Frozen targets."
                }
              ]
            }
          ]
        },
        "gear": {
          "head": {
            "name": "Archivist's Spell-Cap",
            "quality": "q3",
            "icon": "inv_helmet_14.jpg",
            "stats": "+11 Int, +8 Sta, +12 Frost Spell Damage",
            "enchant": "Lesser Arcanum of Focus (+8 Spell Power)",
            "source": "City of Dalaran Boss",
            "alts": [
              {
                "name": "Green Tinted Goggles",
                "quality": "q2",
                "icon": "inv_helmet_15.jpg",
                "stats": "+8 Sta, +7 Spi",
                "source": "Engineering (150)"
              },
              {
                "name": "Azure Silk Hood",
                "quality": "q2",
                "icon": "inv_helmet_15.jpg",
                "stats": "+11 Int, +8 Sta",
                "source": "Tailoring (145)"
              },
              {
                "name": "Nightsky Cowl",
                "quality": "q2",
                "icon": "inv_helmet_14.jpg",
                "stats": "+9 Int, +6 Spi",
                "source": "World Drop"
              }
            ]
          },
          "neck": {
            "name": "Archmagister's Faceted Pendant",
            "quality": "q3",
            "icon": "inv_misc_necklacea8.jpg",
            "stats": "+6 Int, +14 Spell Power, +Undead XP",
            "enchant": "None",
            "source": "Shade of the Archmage, City of Dalaran",
            "alts": [
              {
                "name": "Ghostshard Talisman",
                "quality": "q3",
                "icon": "inv_jewelry_necklace_06.jpg",
                "stats": "+11 Sta",
                "source": "SM Graveyard"
              },
              {
                "name": "Fossilized Amber Pendant",
                "quality": "q3",
                "icon": "inv_jewelry_necklace_12.jpg",
                "stats": "+8 Int, +6 Sta, +5 Spi",
                "source": "Excavation Site 4 Boss"
              },
              {
                "name": "Electrocutioner Locket",
                "quality": "q3",
                "icon": "inv_jewelry_necklace_10.jpg",
                "stats": "+9 Int, +5 Spi",
                "source": "Electrocutioner 6000, Gnomeregan"
              }
            ]
          },
          "shoulder": {
            "name": "Inquisitor's Shawl",
            "quality": "q3",
            "icon": "inv_shoulder_02.jpg",
            "stats": "+9 Int, +8 Spi",
            "enchant": "None",
            "source": "Interrogator Vishas, Scarlet Monastery Graveyard",
            "alts": [
              {
                "name": "Magician's Mantle",
                "quality": "q3",
                "icon": "inv_shoulder_23.jpg",
                "stats": "+8 Int, +5 Sta",
                "source": "World Drop"
              },
              {
                "name": "Mantle of Dalaran",
                "quality": "q3",
                "icon": "inv_shoulder_02.jpg",
                "stats": "+12 Int, +8 Sta, +9 Spell Power",
                "source": "Kirin Tor Archmage, City of Dalaran"
              },
              {
                "name": "Beguiler's Robes Pauldrons",
                "quality": "q2",
                "icon": "inv_shoulder_13.jpg",
                "stats": "+8 Int, +6 Spi",
                "source": "Scarlet Monastery Graveyard"
              }
            ]
          },
          "back": {
            "name": "Drape of Shifting Energy",
            "quality": "q3",
            "icon": "inv_misc_cape_18.jpg",
            "stats": "+7 Sta, +8 Int, +9 Spell Damage",
            "enchant": "Lesser Resistance",
            "source": "Arcanic Enigma, City of Dalaran",
            "alts": [
              {
                "name": "Engineer's Cloak",
                "quality": "q2",
                "icon": "inv_misc_cape_06.jpg",
                "stats": "+6 Int",
                "source": "Gnomeregan"
              },
              {
                "name": "Nightsky Cloak",
                "quality": "q2",
                "icon": "inv_misc_cape_03.jpg",
                "stats": "+7 Int, +4 Spi",
                "source": "World Drop"
              },
              {
                "name": "Cloak of the People's Militia",
                "quality": "q2",
                "icon": "inv_misc_cape_11.jpg",
                "stats": "+6 Sta, +5 Int",
                "source": "Westfall Militia Quest"
              }
            ]
          },
          "chest": {
            "name": "Robes of Arugal",
            "quality": "q3",
            "icon": "inv_chest_cloth_16.jpg",
            "stats": "+10 Int, +10 Spi, +5 Agi, +3 Sta",
            "enchant": "Greater Mana (+50 Mana)",
            "source": "Archmage Arugal, Shadowfang Keep",
            "alts": [
              {
                "name": "Robe of the Magi",
                "quality": "q3",
                "icon": "inv_chest_cloth_08.jpg",
                "stats": "+12 Int, +8 Spi, +14 Spell Dmg",
                "source": "City of Dalaran"
              },
              {
                "name": "Robes of Arcanic Flow",
                "quality": "q3",
                "icon": "inv_chest_cloth_16.jpg",
                "stats": "+14 Int, +9 Sta, +12 Spell Power",
                "source": "Grand Mage Doan / Dalaran Vault"
              },
              {
                "name": "Robes of the Doombringer",
                "quality": "q3",
                "icon": "inv_chest_cloth_03.jpg",
                "stats": "+10 Int, +7 Sta, +14 Shadow/Fire Dmg",
                "source": "Scarlet Monastery Graveyard"
              }
            ]
          },
          "wrist": {
            "name": "Mindthrust Bracers",
            "quality": "q3",
            "icon": "inv_bracer_07.jpg",
            "stats": "+8 Int, +4 Spi",
            "enchant": "Lesser Intellect (+5 Int)",
            "source": "World Drop",
            "alts": [
              {
                "name": "Sparkmetal Bracers",
                "quality": "q2",
                "icon": "inv_bracer_06.jpg",
                "stats": "+6 Int, +3 Sta",
                "source": "Gnomeregan"
              },
              {
                "name": "Unearthed Bands of the Owl",
                "quality": "q3",
                "icon": "inv_bracer_07.jpg",
                "stats": "+7 Int, +7 Spi",
                "source": "Uldaman / World Drop"
              },
              {
                "name": "Arcanist's Bindings",
                "quality": "q2",
                "icon": "inv_bracer_06.jpg",
                "stats": "+6 Int, +4 Sta",
                "source": "World Drop"
              }
            ]
          },
          "hands": {
            "name": "Magefist Gloves",
            "quality": "q3",
            "icon": "inv_gauntlets_17.jpg",
            "stats": "+8 Int, +5 Spi, +6 Spell Damage",
            "enchant": "Lesser Intellect (+5 Int)",
            "source": "World Drop",
            "alts": [
              {
                "name": "Gold-flecked Gloves",
                "quality": "q3",
                "icon": "inv_gauntlets_14.jpg",
                "stats": "+8 Int, +7 Spi",
                "source": "Razorfen Kraul"
              },
              {
                "name": "Crimson Silk Gloves",
                "quality": "q2",
                "icon": "inv_gauntlets_14.jpg",
                "stats": "+10 Int, +7 Spell Power",
                "source": "Tailoring (150)"
              },
              {
                "name": "Hands of the Exiled",
                "quality": "q3",
                "icon": "inv_gauntlets_17.jpg",
                "stats": "+9 Int, +5 Sta, +6 Shadow Dmg",
                "source": "Scarlet Monastery Graveyard"
              }
            ]
          },
          "waist": {
            "name": "Belt of Arugal",
            "quality": "q3",
            "icon": "inv_belt_13.jpg",
            "stats": "+8 Int, +4 Spi, +3 Sta",
            "enchant": "None",
            "source": "Archmage Arugal, Shadowfang Keep",
            "alts": [
              {
                "name": "Girdle of the Blessed",
                "quality": "q3",
                "icon": "inv_belt_11.jpg",
                "stats": "+9 Int, +8 Sta",
                "source": "City of Dalaran"
              },
              {
                "name": "Dalaran Warden's Belt",
                "quality": "q3",
                "icon": "inv_belt_08.jpg",
                "stats": "+11 Int, +7 Sta, +8 Spell Power",
                "source": "City of Dalaran Gatekeeper"
              },
              {
                "name": "Belt of the Undertaker",
                "quality": "q3",
                "icon": "inv_belt_03.jpg",
                "stats": "+8 Int, +5 Sta, +6 Shadow Dmg",
                "source": "The Stockade Rare"
              }
            ]
          },
          "legs": {
            "name": "Gaze Leggings",
            "quality": "q3",
            "icon": "inv_pants_08.jpg",
            "stats": "+9 Int, +9 Sta, +11 Spell Damage",
            "enchant": "Mana +65",
            "source": "Excavation Site 4 Dungeon Boss",
            "alts": [
              {
                "name": "Silver-thread Pants",
                "quality": "q2",
                "icon": "inv_pants_07.jpg",
                "stats": "+11 Int, +8 Spi",
                "source": "World Drop"
              },
              {
                "name": "Netherweave Pants",
                "quality": "q2",
                "icon": "inv_pants_cloth_05.jpg",
                "stats": "+12 Int, +8 Sta",
                "source": "Tailoring / World Drop"
              },
              {
                "name": "Nightsky Trousers",
                "quality": "q2",
                "icon": "inv_pants_08.jpg",
                "stats": "+10 Int, +7 Spi",
                "source": "World Drop"
              }
            ]
          },
          "feet": {
            "name": "Spidersilk Boots",
            "quality": "q3",
            "icon": "inv_boots_05.jpg",
            "stats": "+8 Int, +8 Spi, +7 Sta",
            "enchant": "Minor Speed (+8% Run)",
            "source": "Tailoring (125)",
            "alts": [
              {
                "name": "Acidic Walkers",
                "quality": "q3",
                "icon": "inv_boots_cloth_03.jpg",
                "stats": "+7 Int, +7 Sta",
                "source": "Gnomeregan"
              },
              {
                "name": "Dalaran Apprentice Slippers",
                "quality": "q2",
                "icon": "inv_boots_05.jpg",
                "stats": "+8 Int, +4 Sta",
                "source": "City of Dalaran"
              },
              {
                "name": "Nightsky Boots",
                "quality": "q2",
                "icon": "inv_boots_04.jpg",
                "stats": "+7 Int, +5 Spi",
                "source": "World Drop"
              }
            ]
          },
          "finger1": {
            "name": "Band of the Arcanist",
            "quality": "q3",
            "icon": "inv_jewelry_ring_14.jpg",
            "stats": "+8 Int, +4 Sta, +7 Spell Damage",
            "enchant": "None",
            "source": "City of Dalaran Rare Boss",
            "alts": [
              {
                "name": "Advisor's Ring",
                "quality": "q3",
                "icon": "inv_jewelry_ring_22.jpg",
                "stats": "+7 Int, +5 Spi",
                "source": "WSG Vendor"
              },
              {
                "name": "Violet Signet",
                "quality": "q3",
                "icon": "inv_jewelry_ring_15.jpg",
                "stats": "+8 Int, +6 Sta, +7 Spell Power",
                "source": "City of Dalaran Arcane Vault"
              },
              {
                "name": "Deep Fathom Ring",
                "quality": "q3",
                "icon": "inv_jewelry_ring_14.jpg",
                "stats": "+6 Int, +5 Sta, +4 Spi",
                "source": "Aku'mai, Blackfathom Deeps"
              }
            ]
          },
          "finger2": {
            "name": "Advisor's Ring",
            "quality": "q3",
            "icon": "inv_jewelry_ring_22.jpg",
            "stats": "+7 Int, +5 Spi, +7 Spell Damage",
            "enchant": "None",
            "source": "Warsong Gulch Honored Vendor",
            "alts": [
              {
                "name": "Lavishly Jeweled Ring",
                "quality": "q3",
                "icon": "inv_jewelry_ring_03.jpg",
                "stats": "+6 Int, +2 Agi",
                "source": "Deadmines"
              },
              {
                "name": "Violet Signet",
                "quality": "q3",
                "icon": "inv_jewelry_ring_15.jpg",
                "stats": "+8 Int, +6 Sta, +7 Spell Power",
                "source": "City of Dalaran Arcane Vault"
              },
              {
                "name": "Deep Fathom Ring",
                "quality": "q3",
                "icon": "inv_jewelry_ring_14.jpg",
                "stats": "+6 Int, +5 Sta, +4 Spi",
                "source": "Aku'mai, Blackfathom Deeps"
              }
            ]
          },
          "trinket1": {
            "name": "Minor Recombobulator",
            "quality": "q2",
            "icon": "inv_gizmo_07.jpg",
            "stats": "Restores HP/Mana, removes polymorph",
            "enchant": "None",
            "source": "Engineering",
            "alts": [
              {
                "name": "Burst of Knowledge",
                "quality": "q3",
                "icon": "inv_jewelry_talisman_07.jpg",
                "stats": "Use: Increases Spell Damage by +20 for 15 sec",
                "source": "City of Dalaran"
              },
              {
                "name": "Insignia of the Alliance / Horde",
                "quality": "q3",
                "icon": "inv_jewelry_trinketpvp_01.jpg",
                "stats": "Use: Dispels fear, stun, and sleep",
                "source": "PvP Rank 2 Honor Vendor"
              },
              {
                "name": "Rune of Duty",
                "quality": "q2",
                "icon": "inv_misc_rune_01.jpg",
                "stats": "+10 Stamina",
                "source": "Warsong Gulch Friendly Vendor"
              }
            ]
          },
          "trinket2": {
            "name": "Parchment of Inner Light",
            "quality": "q3",
            "icon": "inv_misc_book_09.jpg",
            "stats": "Equip: Restores 6 mana per 5 sec",
            "enchant": "None",
            "source": "City of Dalaran Secret Library Tomb",
            "alts": [
              {
                "name": "Dog Whistle",
                "quality": "q3",
                "icon": "ability_hunter_beastcall.jpg",
                "stats": "Use: Summons a tracking battle hound (10 min)",
                "source": "Houndmaster Loksey, SM Graveyard"
              },
              {
                "name": "Smolderweb Eye",
                "quality": "q3",
                "icon": "inv_misc_gem_pearl_04.jpg",
                "stats": "Use: Shoots a web immobilizing target for 5 sec",
                "source": "LBRS Rare / World Quest"
              },
              {
                "name": "Insignia of the Alliance / Horde",
                "quality": "q3",
                "icon": "inv_jewelry_trinketpvp_01.jpg",
                "stats": "Use: Dispels fear, stun, and sleep",
                "source": "PvP Rank 2 Honor Vendor"
              }
            ]
          },
          "mainHand": {
            "name": "Inventor's Focal Rod",
            "quality": "q3",
            "icon": "inv_wand_06.jpg",
            "stats": "+9 Int, +6 Spi, +16 Frost Damage",
            "enchant": "Lesser Spell Power (+15 Spell Dmg)",
            "source": "Electrocutioner 6000, Gnomeregan",
            "alts": [
              {
                "name": "Scepter of the Council",
                "quality": "q3",
                "icon": "inv_mace_11.jpg",
                "stats": "+8 Int, +7 Sta, +14 Spell Dmg",
                "source": "City of Dalaran"
              },
              {
                "name": "Hypnotic Blade",
                "quality": "q3",
                "icon": "inv_sword_01.jpg",
                "stats": "1.40 Speed • +8 Int, +3 Spi, +9 Spell Power",
                "source": "Scarlet Monastery Graveyard"
              },
              {
                "name": "Kirin Tor Scepter",
                "quality": "q3",
                "icon": "inv_mace_07.jpg",
                "stats": "2.10 Speed • +9 Int, +6 Sta, +8 Spell Power",
                "source": "City of Dalaran"
              }
            ]
          },
          "offHand": {
            "name": "Orb of the Forgotten Archmage",
            "quality": "q3",
            "icon": "inv_misc_orb_03.jpg",
            "stats": "+8 Int, +6 Sta, +12 Frost Spell Damage",
            "enchant": "None",
            "source": "City of Dalaran Boss",
            "alts": [
              {
                "name": "Orb of Soran",
                "quality": "q3",
                "icon": "inv_misc_orb_01.jpg",
                "stats": "+7 Int, +5 Spi",
                "source": "Shadowfang Keep"
              },
              {
                "name": "Tome of the Lost",
                "quality": "q3",
                "icon": "inv_misc_book_06.jpg",
                "stats": "+7 Int, +5 Sta, +6 Spell Power",
                "source": "City of Dalaran Vault"
              },
              {
                "name": "Skull of Impending Doom",
                "quality": "q2",
                "icon": "inv_misc_bone_skull_01.jpg",
                "stats": "Use: Increases run speed by 60%",
                "source": "Badlands Quest"
              }
            ]
          },
          "ranged": {
            "name": "Gravestone Scepter",
            "quality": "q3",
            "icon": "inv_wand_02.jpg",
            "stats": "29.0 DPS Shadow Dmg • +5 Int, +5 Spi",
            "enchant": "None",
            "source": "Quest: Blackfathom Villainy (Blackfathom Deeps)",
            "alts": [
              {
                "name": "Cookie's Stirring Rod",
                "quality": "q3",
                "icon": "inv_wand_04.jpg",
                "stats": "18.5 DPS • +4 Int, +3 Sta",
                "source": "Deadmines"
              },
              {
                "name": "Kirin Tor Apprentice Wand",
                "quality": "q3",
                "icon": "inv_wand_06.jpg",
                "stats": "31.2 DPS Arcane • +6 Int, +4 Spell Power",
                "source": "City of Dalaran Boss"
              },
              {
                "name": "Petrified Bone Wand",
                "quality": "q3",
                "icon": "inv_wand_01.jpg",
                "stats": "28.5 DPS Nature • +5 Int, +4 Sta",
                "source": "Excavation Site 4"
              }
            ]
          }
        }
      }
    ]
  },
  "rogue": {
    "specs": [
      {
        "id": "combat-pve",
        "name": "Combat Swords PvE",
        "role": "Melee Physical DPS",
        "icon": "https://render.worldofwarcraft.com/us/icons/56/ability_backstab.jpg",
        "weaponType": "Main-Hand Sword (Slow) + Off-Hand Sword/Dagger (Fast)",
        "statSummary": {
          "alliance": {
            "hp": 1220,
            "energy": 100,
            "armor": 960,
            "agi": 172,
            "str": 128,
            "sta": 102,
            "ap": "+112 AP",
            "hit": "5% (+5% Precision)",
            "crit": "17.4%"
          },
          "horde": {
            "hp": 1240,
            "energy": 100,
            "armor": 960,
            "agi": 170,
            "str": 130,
            "sta": 104,
            "ap": "+114 AP",
            "hit": "5%",
            "crit": "17.2%"
          }
        },
        "talents": {
          "points": "5 / 21 / 0",
          "summary": "Precision (+5% Hit) + Dual Wield Specialization + Blade Flurry (Unmatched AoE cleave at 30 cap)",
          "buildCode": "FOREVER-ROGUE-COMBAT-30-5-21-0",
          "trees": [
            {
              "name": "Assassination",
              "icon": "https://render.worldofwarcraft.com/us/icons/56/ability_rogue_eviscerate.jpg",
              "points": 5,
              "talents": [
                {
                  "name": "Malice",
                  "rank": "5/5",
                  "desc": "Increases your critical strike chance by 5%."
                }
              ]
            },
            {
              "name": "Combat",
              "icon": "https://render.worldofwarcraft.com/us/icons/56/ability_backstab.jpg",
              "points": 21,
              "talents": [
                {
                  "name": "Improved Sinister Strike",
                  "rank": "2/2",
                  "desc": "Reduces energy cost of Sinister Strike by 5."
                },
                {
                  "name": "Lightning Reflexes",
                  "rank": "3/3",
                  "desc": "Increases Dodge chance by 3%."
                },
                {
                  "name": "Precision",
                  "rank": "5/5",
                  "desc": "Increases your chance to hit with melee weapons by 5%."
                },
                {
                  "name": "Dual Wield Specialization",
                  "rank": "5/5",
                  "desc": "Increases damage dealt by your off-hand weapon by 50%."
                },
                {
                  "name": "Blade Flurry",
                  "rank": "1/1",
                  "desc": "Increases attack speed by 20% and attacks strike an additional nearby enemy."
                },
                {
                  "name": "Sword Specialization",
                  "rank": "5/5",
                  "desc": "Gives a 5% chance to get an extra attack on the same target with Swords."
                }
              ]
            },
            {
              "name": "Subtlety",
              "icon": "https://render.worldofwarcraft.com/us/icons/56/ability_stealth.jpg",
              "points": 0,
              "talents": []
            }
          ]
        },
        "gear": {
          "head": {
            "name": "Infiltrator Cap of the Tiger",
            "quality": "q2",
            "icon": "inv_helmet_15.jpg",
            "stats": "+8 Str, +8 Agi",
            "enchant": "Lesser Arcanum of Voracity (+8 Agi)",
            "source": "World Drop / Auction House",
            "alts": [
              {
                "name": "Tusken Helm",
                "quality": "q3",
                "icon": "inv_helmet_09.jpg",
                "stats": "+15 Sta, +7 Agi",
                "source": "Razorfen Kraul"
              },
              {
                "name": "Green Tinted Goggles",
                "quality": "q2",
                "icon": "inv_gizmo_01.jpg",
                "stats": "+8 Sta, +8 Agi",
                "source": "Engineering (150)"
              },
              {
                "name": "Veteran's Silvered Chain Helm",
                "quality": "q3",
                "icon": "inv_helmet_39.jpg",
                "stats": "+10 Str, +8 Sta, +1% Crit",
                "source": "Blacksmithing (130)"
              }
            ]
          },
          "neck": {
            "name": "Ghostshard Talisman",
            "quality": "q3",
            "icon": "inv_jewelry_necklace_06.jpg",
            "stats": "+11 Sta, +4 Str",
            "enchant": "None",
            "source": "Scarlet Monastery Graveyard",
            "alts": [
              {
                "name": "Mark of the Pack Leader",
                "quality": "q3",
                "icon": "inv_jewelry_necklace_04.jpg",
                "stats": "+8 Agi, +6 Sta",
                "source": "The Barrens Rare"
              },
              {
                "name": "Fossilized Amber Pendant",
                "quality": "q3",
                "icon": "inv_jewelry_necklace_12.jpg",
                "stats": "+7 Agi, +5 Sta, +4 Str",
                "source": "Excavation Site 4 Boss"
              },
              {
                "name": "Thermaplugg Medal of Honor",
                "quality": "q3",
                "icon": "inv_jewelry_amulet_03.jpg",
                "stats": "+8 Sta, +7 Str",
                "source": "Mekgineer Thermaplugg, Gnomeregan"
              }
            ]
          },
          "shoulder": {
            "name": "Forest Tracker Epaulets",
            "quality": "q3",
            "icon": "inv_shoulder_18.jpg",
            "stats": "+11 Agi, +5 Str",
            "enchant": "None",
            "source": "World Drop",
            "alts": [
              {
                "name": "Cutthroat's Mantle of the Tiger",
                "quality": "q2",
                "icon": "inv_shoulder_11.jpg",
                "stats": "+7 Str, +7 Agi",
                "source": "World Drop"
              },
              {
                "name": "Barbaric Shoulders",
                "quality": "q2",
                "icon": "inv_shoulder_08.jpg",
                "stats": "+7 Str, +6 Sta",
                "source": "Leatherworking (175)"
              },
              {
                "name": "Mantle of Thieves",
                "quality": "q2",
                "icon": "inv_shoulder_07.jpg",
                "stats": "+10 Agi, +3 Sta",
                "source": "The Stockade / Dalaran Outskirts"
              }
            ]
          },
          "back": {
            "name": "Hawkeye's Cloak",
            "quality": "q2",
            "icon": "inv_misc_cape_03.jpg",
            "stats": "+8 Agi, +3 Sta",
            "enchant": "Lesser Agility (+3 Agi)",
            "source": "World Drop",
            "alts": [
              {
                "name": "Crocolisk Skin Gaiter",
                "quality": "q3",
                "icon": "inv_misc_monsterscales_02.jpg",
                "stats": "+6 Str, +6 Sta, +5 Agi",
                "source": "Excavation Site 4"
              },
              {
                "name": "Batwing Cloak",
                "quality": "q3",
                "icon": "inv_misc_cape_06.jpg",
                "stats": "+5 Agi, +7 Sta",
                "source": "Razorfen Kraul"
              },
              {
                "name": "Drape of Shifting Energy",
                "quality": "q3",
                "icon": "inv_misc_cape_18.jpg",
                "stats": "+7 Sta, +6 Str",
                "source": "City of Dalaran"
              }
            ]
          },
          "chest": {
            "name": "Infiltrator Armor of the Tiger",
            "quality": "q2",
            "icon": "inv_chest_leather_03.jpg",
            "stats": "+11 Str, +11 Agi",
            "enchant": "Greater Health (+35 HP)",
            "source": "World Drop",
            "alts": [
              {
                "name": "Tunic of Westfall",
                "quality": "q3",
                "icon": "inv_chest_cloth_05.jpg",
                "stats": "+11 Agi, +5 Sta",
                "source": "Deadmines Quest"
              },
              {
                "name": "Toughened Leather Armor",
                "quality": "q2",
                "icon": "inv_chest_leather_08.jpg",
                "stats": "+15 Agi, +5 Sta",
                "source": "Leatherworking (155)"
              },
              {
                "name": "Black Whelp Tunic",
                "quality": "q2",
                "icon": "inv_chest_leather_04.jpg",
                "stats": "+8 Agi, +8 Sta, +6 Str",
                "source": "Redridge Rare / AH"
              }
            ]
          },
          "wrist": {
            "name": "Unearthed Bands of the Tiger",
            "quality": "q3",
            "icon": "inv_bracer_06.jpg",
            "stats": "+7 Str, +7 Agi",
            "enchant": "Lesser Agility (+3 Agi)",
            "source": "Uldaman / World Drop",
            "alts": [
              {
                "name": "Hawkeye's Bracers",
                "quality": "q2",
                "icon": "inv_bracer_04.jpg",
                "stats": "+6 Agi, +3 Sta",
                "source": "World Drop"
              },
              {
                "name": "Pugilist Bracers",
                "quality": "q3",
                "icon": "inv_bracer_03.jpg",
                "stats": "+7 Sta, +4 Agi, +3 Str",
                "source": "Razorfen Kraul Trash"
              },
              {
                "name": "Arathi Armbands",
                "quality": "q2",
                "icon": "inv_bracer_09.jpg",
                "stats": "+7 Str, +4 Sta",
                "source": "Arathi Quest"
              }
            ]
          },
          "hands": {
            "name": "True-Aim Stalkers",
            "quality": "q3",
            "icon": "inv_gauntlets_28.jpg",
            "stats": "+9 Agi, +6 Sta, +1% Hit",
            "enchant": "Lesser Agility (+5 Agi)",
            "source": "Excavation Site 4 Boss",
            "alts": [
              {
                "name": "Tiger Hunter Gloves",
                "quality": "q2",
                "icon": "inv_gauntlets_04.jpg",
                "stats": "+9 Str, +8 Agi",
                "source": "Tiger Mastery"
              },
              {
                "name": "Algae Fists",
                "quality": "q3",
                "icon": "inv_gauntlets_22.jpg",
                "stats": "+10 Str, +8 Sta",
                "source": "Gelihast, Blackfathom Deeps"
              },
              {
                "name": "Veteran's Silvered Chain Gauntlets",
                "quality": "q3",
                "icon": "inv_gauntlets_16.jpg",
                "stats": "+9 Str, +7 Sta, +6 Agi",
                "source": "Blacksmithing (105)"
              }
            ]
          },
          "waist": {
            "name": "Cobrahn's Grasp",
            "quality": "q3",
            "icon": "inv_belt_12.jpg",
            "stats": "+8 Agi, +5 Sta, +5 Str",
            "enchant": "None",
            "source": "Wailing Caverns",
            "alts": [
              {
                "name": "Officer's Belt",
                "quality": "q3",
                "icon": "inv_belt_20.jpg",
                "stats": "+12 Str, +6 Sta",
                "source": "PvP Vendor"
              },
              {
                "name": "Ogron's Sash",
                "quality": "q3",
                "icon": "inv_belt_03.jpg",
                "stats": "+10 Str, +6 Sta",
                "source": "World Drop"
              },
              {
                "name": "Veteran's Silvered Chain Girdle",
                "quality": "q3",
                "icon": "inv_belt_15.jpg",
                "stats": "+9 Str, +7 Sta",
                "source": "Blacksmithing (100)"
              }
            ]
          },
          "legs": {
            "name": "Triprunner Dungarees",
            "quality": "q3",
            "icon": "inv_pants_06.jpg",
            "stats": "+18 Agi, +4 Sta",
            "enchant": "Lesser Agility (+8 Agi)",
            "source": "Gnomeregan Quest",
            "alts": [
              {
                "name": "Infiltrator Leggings of the Tiger",
                "quality": "q2",
                "icon": "inv_pants_08.jpg",
                "stats": "+10 Str, +10 Agi",
                "source": "World Drop"
              },
              {
                "name": "Gryphon Rider's Leggings",
                "quality": "q3",
                "icon": "inv_pants_03.jpg",
                "stats": "+13 Str, +8 Sta",
                "source": "Excavation Site 4 Quest"
              },
              {
                "name": "Barbaric Leggings",
                "quality": "q2",
                "icon": "inv_pants_07.jpg",
                "stats": "+11 Agi, +6 Str",
                "source": "Leatherworking (175)"
              }
            ]
          },
          "feet": {
            "name": "Trouncing Boots",
            "quality": "q2",
            "icon": "inv_boots_01.jpg",
            "stats": "+9 Str, +8 Agi",
            "enchant": "Minor Speed (+8% Movement)",
            "source": "Alliance Quest / Shapeshifting Sentinel's Strides (Horde)",
            "alts": [
              {
                "name": "Excavator's Work Boots",
                "quality": "q3",
                "icon": "inv_boots_chain_06.jpg",
                "stats": "+8 Str, +8 Sta",
                "source": "Excavation Site 4"
              },
              {
                "name": "Shapeshifting Sentinel's Strides",
                "quality": "q3",
                "icon": "inv_boots_chain_08.jpg",
                "stats": "+11 Str, +9 Agi, +7 Sta",
                "source": "Blackfathom Deeps (Horde)"
              },
              {
                "name": "Silvered Bronze Boots",
                "quality": "q2",
                "icon": "inv_boots_chain_03.jpg",
                "stats": "+7 Str, +5 Sta",
                "source": "Blacksmithing (130)"
              }
            ]
          },
          "finger1": {
            "name": "Wyvern Heart Band",
            "quality": "q3",
            "icon": "inv_jewelry_ring_25.jpg",
            "stats": "+7 Str, +6 Agi, +5 Sta",
            "enchant": "None",
            "source": "Harpy Matriarch / World Drop",
            "alts": [
              {
                "name": "Tigerstrike Signet",
                "quality": "q3",
                "icon": "inv_jewelry_ring_16.jpg",
                "stats": "+8 Str, +5 Agi",
                "source": "Stranglethorn Vale"
              },
              {
                "name": "Blackstone Ring",
                "quality": "q3",
                "icon": "inv_jewelry_ring_17.jpg",
                "stats": "+6 Str, +1% Hit",
                "source": "Princess Theradras, Maraudon"
              },
              {
                "name": "Savory Devourer Band",
                "quality": "q2",
                "icon": "inv_jewelry_ring_08.jpg",
                "stats": "+6 Str, +5 Sta",
                "source": "Excavation Site 4 Rare"
              }
            ]
          },
          "finger2": {
            "name": "Blackstone Ring",
            "quality": "q3",
            "icon": "inv_jewelry_ring_17.jpg",
            "stats": "+6 Str, +1% Hit",
            "enchant": "None",
            "source": "Princess Theradras, Maraudon",
            "alts": [
              {
                "name": "Seal of Wrynn",
                "quality": "q3",
                "icon": "inv_jewelry_ring_12.jpg",
                "stats": "+4 Agi, +4 Sta",
                "source": "Alliance Quest"
              },
              {
                "name": "Wyvern Heart Band",
                "quality": "q3",
                "icon": "inv_jewelry_ring_25.jpg",
                "stats": "+7 Str, +6 Agi, +5 Sta",
                "source": "Harpy Matriarch / World Drop"
              },
              {
                "name": "Tigerstrike Signet",
                "quality": "q3",
                "icon": "inv_jewelry_ring_16.jpg",
                "stats": "+8 Str, +5 Agi",
                "source": "King Bangalash, STV"
              }
            ]
          },
          "trinket1": {
            "name": "Minor Recombobulator",
            "quality": "q2",
            "icon": "inv_gizmo_07.jpg",
            "stats": "Restores HP/Mana, cures polymorph",
            "enchant": "None",
            "source": "Engineering",
            "alts": [
              {
                "name": "Insignia of the Alliance / Horde",
                "quality": "q3",
                "icon": "inv_jewelry_trinketpvp_01.jpg",
                "stats": "Use: Dispels fear, stun, and sleep",
                "source": "PvP Rank 2 Honor Vendor"
              },
              {
                "name": "Gyromatic Icemaker",
                "quality": "q2",
                "icon": "inv_gizmo_03.jpg",
                "stats": "Use: Blasts target with frost dealing damage",
                "source": "Engineering (145)"
              },
              {
                "name": "Rune of Duty",
                "quality": "q2",
                "icon": "inv_misc_rune_01.jpg",
                "stats": "+10 Stamina",
                "source": "Warsong Gulch Friendly Vendor"
              }
            ]
          },
          "trinket2": {
            "name": "Dog Whistle",
            "quality": "q3",
            "icon": "ability_hunter_beastcall.jpg",
            "stats": "Summons a hunting dog",
            "enchant": "None",
            "source": "Scarlet Monastery Graveyard",
            "alts": [
              {
                "name": "Smolderweb Eye",
                "quality": "q3",
                "icon": "inv_misc_gem_pearl_04.jpg",
                "stats": "Use: Shoots a web immobilizing target for 5 sec",
                "source": "LBRS Rare / World Quest"
              },
              {
                "name": "Insignia of the Alliance / Horde",
                "quality": "q3",
                "icon": "inv_jewelry_trinketpvp_01.jpg",
                "stats": "Use: Dispels fear, stun, and sleep",
                "source": "PvP Rank 2 Honor Vendor"
              },
              {
                "name": "Minor Recombobulator",
                "quality": "q2",
                "icon": "inv_gizmo_07.jpg",
                "stats": "Use: Restores HP/Mana, cures polymorph",
                "source": "Engineering (140)"
              }
            ]
          },
          "mainHand": {
            "name": "Outlaw Sabre",
            "quality": "q3",
            "icon": "inv_sword_20.jpg",
            "stats": "2.70 Speed • 18.2 DPS • +6 Agi, +3 Sta",
            "enchant": "Weapon Damage +4",
            "source": "Blackfathom Deeps Quest",
            "alts": [
              {
                "name": "Cruel Barb",
                "quality": "q3",
                "icon": "inv_sword_19.jpg",
                "stats": "2.80 Speed • +12 AP",
                "source": "Deadmines"
              },
              {
                "name": "Scin-Rending Cleaver",
                "quality": "q3",
                "icon": "inv_axe_04.jpg",
                "stats": "2.50 Speed • +7 Str, +4 Sta",
                "source": "Excavation Site 4"
              }
            ]
          },
          "offHand": {
            "name": "Cruel Barb",
            "quality": "q3",
            "icon": "inv_sword_19.jpg",
            "stats": "2.80 Speed • 18.2 DPS • +12 AP",
            "enchant": "Lesser Agility (+5 Agi)",
            "source": "Edwin VanCleef, Deadmines",
            "alts": [
              {
                "name": "Tail Spike",
                "quality": "q3",
                "icon": "inv_sword_25.jpg",
                "stats": "1.70 Fast Speed • +5 Agi, +3 Sta",
                "source": "Razorfen Kraul"
              },
              {
                "name": "Toxic Revenger",
                "quality": "q3",
                "icon": "inv_weapon_shortblade_05.jpg",
                "stats": "2.70 Speed • 18.9 DPS • Chance on hit: Poison",
                "source": "Gnomeregan"
              }
            ]
          },
          "ranged": {
            "name": "Master Hunter's Rifle",
            "quality": "q2",
            "icon": "inv_weapon_rifle_05.jpg",
            "stats": "+4 Agi, +3 Sta",
            "enchant": "Standard Scope",
            "source": "Stranglethorn Vale Quest",
            "alts": [
              {
                "name": "Nightstalker Bow",
                "quality": "q2",
                "icon": "inv_weapon_bow_08.jpg",
                "stats": "+5 Agi",
                "source": "World Drop"
              },
              {
                "name": "Excavation Carbine",
                "quality": "q3",
                "icon": "inv_weapon_rifle_01.jpg",
                "stats": "+6 Agi, +4 Str",
                "source": "Excavation Site 4 Overseer"
              },
              {
                "name": "Venomstrike",
                "quality": "q3",
                "icon": "inv_weapon_bow_01.jpg",
                "stats": "Chance on hit: 31-45 Poison damage",
                "source": "Lord Cobrahn, Wailing Caverns"
              }
            ]
          }
        }
      },
      {
        "id": "assassination-pve",
        "name": "Assassination Mutilate",
        "role": "Melee DPS (Daggers & AP Poisons)",
        "icon": "https://render.worldofwarcraft.com/us/icons/56/ability_rogue_eviscerate.jpg",
        "weaponType": "Dual Daggers (Mutilate)",
        "statSummary": {
          "alliance": {
            "hp": 1220,
            "armor": 890,
            "str": 105,
            "agi": 172,
            "sta": 102,
            "ap": "+195",
            "hit": "4%",
            "crit": "18.5%"
          },
          "horde": {
            "hp": 1240,
            "armor": 890,
            "str": 108,
            "agi": 170,
            "sta": 104,
            "ap": "+205",
            "hit": "4%",
            "crit": "18.2%"
          }
        },
        "talents": {
          "points": "21 / 5 / 0",
          "summary": "Malice + Lethality + Mutilate + Remorseless + Dual Wield Precision",
          "buildCode": "FOREVER-ROGUE-ASSASSIN-30-21-5-0",
          "trees": [
            {
              "name": "Assassination",
              "icon": "https://render.worldofwarcraft.com/us/icons/56/ability_rogue_eviscerate.jpg",
              "points": 21,
              "talents": [
                {
                  "name": "Malice",
                  "rank": "5/5",
                  "desc": "Increases Critical Strike chance by 5%."
                },
                {
                  "name": "Ruthlessness",
                  "rank": "3/3",
                  "desc": "Gives finishing moves a 60% chance to add a combo point."
                },
                {
                  "name": "Murder",
                  "rank": "2/2",
                  "desc": "Increases damage against Humanoids, Beasts, and Giants by 2%."
                },
                {
                  "name": "Relentless Strikes",
                  "rank": "1/1",
                  "desc": "Finishing moves have 20% chance per combo point to restore 25 Energy."
                },
                {
                  "name": "Lethality",
                  "rank": "5/5",
                  "desc": "Increases Critical Strike damage bonus of Sinister Strike, Gouge, and Backstab/Mutilate by 30%."
                },
                {
                  "name": "Cold Blood",
                  "rank": "1/1",
                  "desc": "Increases critical strike chance of next offensive ability by 100%."
                },
                {
                  "name": "Seal Fate",
                  "rank": "4/5",
                  "desc": "Critical strikes from abilities that add combo points have an 80% chance to add an additional combo point."
                }
              ]
            },
            {
              "name": "Combat",
              "icon": "https://render.worldofwarcraft.com/us/icons/56/ability_backstab.jpg",
              "points": 5,
              "talents": [
                {
                  "name": "Lightning Reflexes",
                  "rank": "2/3",
                  "desc": "Increases Dodge chance by 2%."
                },
                {
                  "name": "Improved Sinister Strike",
                  "rank": "2/2",
                  "desc": "Reduces energy cost of Sinister Strike by 5."
                },
                {
                  "name": "Precision",
                  "rank": "1/5",
                  "desc": "Increases your chance to hit with melee weapons by 1%."
                }
              ]
            },
            {
              "name": "Subtlety",
              "icon": "https://render.worldofwarcraft.com/us/icons/56/ability_stealth.jpg",
              "points": 0,
              "talents": []
            }
          ]
        },
        "gear": {
          "head": {
            "name": "Infiltrator Cap of the Tiger",
            "quality": "q2",
            "icon": "inv_helmet_15.jpg",
            "stats": "+8 Str, +8 Agi",
            "enchant": "Lesser Arcanum of Voracity (+8 Agi)",
            "source": "World Drop / Auction House",
            "alts": [
              {
                "name": "Tusken Helm",
                "quality": "q3",
                "icon": "inv_helmet_09.jpg",
                "stats": "+15 Sta, +7 Agi",
                "source": "Overlord Ramtusk, Razorfen Kraul"
              },
              {
                "name": "Infiltrator Cap of the Tiger",
                "quality": "q2",
                "icon": "inv_helmet_15.jpg",
                "stats": "+8 Str, +8 Agi",
                "source": "World Drop / Auction House"
              },
              {
                "name": "Green Tinted Goggles",
                "quality": "q2",
                "icon": "inv_gizmo_01.jpg",
                "stats": "+8 Sta, +8 Agi",
                "source": "Engineering (150)"
              }
            ]
          },
          "neck": {
            "name": "Mark of the Pack Leader",
            "quality": "q3",
            "icon": "inv_jewelry_necklace_04.jpg",
            "stats": "+8 Agi, +6 Sta",
            "enchant": "None",
            "source": "The Barrens Rare / Quest",
            "alts": [
              {
                "name": "Ghostshard Talisman",
                "quality": "q3",
                "icon": "inv_jewelry_necklace_06.jpg",
                "stats": "+11 Sta, +4 Str",
                "source": "Scarlet Monastery Graveyard"
              },
              {
                "name": "Mark of the Pack Leader",
                "quality": "q3",
                "icon": "inv_jewelry_necklace_04.jpg",
                "stats": "+8 Agi, +6 Sta",
                "source": "The Barrens Rare / Quest"
              },
              {
                "name": "Fossilized Amber Pendant",
                "quality": "q3",
                "icon": "inv_jewelry_necklace_12.jpg",
                "stats": "+7 Agi, +5 Sta, +4 Str",
                "source": "Excavation Site 4 Boss"
              }
            ]
          },
          "shoulder": {
            "name": "Forest Tracker Epaulets",
            "quality": "q3",
            "icon": "inv_shoulder_18.jpg",
            "stats": "+11 Agi, +5 Str",
            "enchant": "None",
            "source": "World Drop",
            "alts": [
              {
                "name": "Forest Tracker Epaulets",
                "quality": "q3",
                "icon": "inv_shoulder_18.jpg",
                "stats": "+11 Agi, +5 Str",
                "source": "World Drop"
              },
              {
                "name": "Cutthroat's Mantle of the Tiger",
                "quality": "q2",
                "icon": "inv_shoulder_11.jpg",
                "stats": "+7 Str, +7 Agi",
                "source": "World Drop"
              },
              {
                "name": "Barbaric Shoulders",
                "quality": "q2",
                "icon": "inv_shoulder_08.jpg",
                "stats": "+7 Str, +6 Sta",
                "source": "Leatherworking (175)"
              }
            ]
          },
          "back": {
            "name": "Hawkeye's Cloak",
            "quality": "q2",
            "icon": "inv_misc_cape_03.jpg",
            "stats": "+8 Agi, +3 Sta",
            "enchant": "Lesser Agility (+3 Agi)",
            "source": "World Drop",
            "alts": [
              {
                "name": "Hawkeye's Cloak",
                "quality": "q2",
                "icon": "inv_misc_cape_03.jpg",
                "stats": "+8 Agi, +3 Sta",
                "source": "World Drop"
              },
              {
                "name": "Crocolisk Skin Gaiter",
                "quality": "q3",
                "icon": "inv_misc_monsterscales_02.jpg",
                "stats": "+6 Str, +6 Sta, +5 Agi",
                "source": "Excavation Site 4 Quest, Wetlands"
              },
              {
                "name": "Batwing Cloak",
                "quality": "q3",
                "icon": "inv_misc_cape_06.jpg",
                "stats": "+5 Agi, +7 Sta",
                "source": "Razorfen Kraul"
              }
            ]
          },
          "chest": {
            "name": "Tunic of Westfall",
            "quality": "q3",
            "icon": "inv_chest_cloth_05.jpg",
            "stats": "+11 Agi, +5 Sta",
            "enchant": "Greater Health (+35 HP)",
            "source": "Deadmines Quest",
            "alts": [
              {
                "name": "Infiltrator Armor of the Tiger",
                "quality": "q2",
                "icon": "inv_chest_leather_03.jpg",
                "stats": "+11 Str, +11 Agi",
                "source": "World Drop"
              },
              {
                "name": "Tunic of Westfall",
                "quality": "q3",
                "icon": "inv_chest_cloth_05.jpg",
                "stats": "+11 Agi, +5 Sta",
                "source": "Deadmines Defias Quest"
              },
              {
                "name": "Toughened Leather Armor",
                "quality": "q2",
                "icon": "inv_chest_leather_08.jpg",
                "stats": "+15 Agi, +5 Sta",
                "source": "Leatherworking (155)"
              }
            ]
          },
          "wrist": {
            "name": "Unearthed Bands of the Tiger",
            "quality": "q3",
            "icon": "inv_bracer_06.jpg",
            "stats": "+7 Str, +7 Agi",
            "enchant": "Lesser Agility (+3 Agi)",
            "source": "Uldaman / World Drop",
            "alts": [
              {
                "name": "Unearthed Bands of the Tiger",
                "quality": "q3",
                "icon": "inv_bracer_06.jpg",
                "stats": "+7 Str, +7 Agi",
                "source": "Uldaman / World Drop"
              },
              {
                "name": "Pugilist Bracers",
                "quality": "q3",
                "icon": "inv_bracer_03.jpg",
                "stats": "+7 Sta, +4 Agi, +3 Str",
                "source": "Razorfen Kraul Trash"
              },
              {
                "name": "Arathi Armbands",
                "quality": "q2",
                "icon": "inv_bracer_09.jpg",
                "stats": "+7 Str, +4 Sta",
                "source": "Arathi Quest"
              }
            ]
          },
          "hands": {
            "name": "True-Aim Stalkers",
            "quality": "q3",
            "icon": "inv_gauntlets_28.jpg",
            "stats": "+9 Agi, +6 Sta, +1% Hit",
            "enchant": "Lesser Agility (+5 Agi)",
            "source": "Excavation Site 4 Boss",
            "alts": [
              {
                "name": "True-Aim Stalkers",
                "quality": "q3",
                "icon": "inv_gauntlets_28.jpg",
                "stats": "+9 Agi, +6 Sta, +1% Hit",
                "source": "Excavation Site 4 Boss"
              },
              {
                "name": "Tiger Hunter Gloves",
                "quality": "q2",
                "icon": "inv_gauntlets_04.jpg",
                "stats": "+9 Str, +8 Agi",
                "source": "Stranglethorn Vale Tiger Mastery"
              },
              {
                "name": "Algae Fists",
                "quality": "q3",
                "icon": "inv_gauntlets_22.jpg",
                "stats": "+10 Str, +8 Sta",
                "source": "Gelihast, Blackfathom Deeps"
              }
            ]
          },
          "waist": {
            "name": "Cobrahn's Grasp",
            "quality": "q3",
            "icon": "inv_belt_12.jpg",
            "stats": "+8 Agi, +5 Sta, +5 Str",
            "enchant": "None",
            "source": "Wailing Caverns",
            "alts": [
              {
                "name": "Officer's Belt",
                "quality": "q3",
                "icon": "inv_belt_20.jpg",
                "stats": "+12 Str, +6 Sta",
                "source": "PvP Rank 4 Honor Vendor"
              },
              {
                "name": "Cobrahn's Grasp",
                "quality": "q3",
                "icon": "inv_belt_12.jpg",
                "stats": "+8 Agi, +5 Sta, +5 Str",
                "source": "Wailing Caverns"
              },
              {
                "name": "Ogron's Sash",
                "quality": "q3",
                "icon": "inv_belt_03.jpg",
                "stats": "+10 Str, +6 Sta",
                "source": "World Drop"
              }
            ]
          },
          "legs": {
            "name": "Triprunner Dungarees",
            "quality": "q3",
            "icon": "inv_pants_06.jpg",
            "stats": "+18 Agi, +4 Sta",
            "enchant": "Lesser Agility (+8 Agi)",
            "source": "Gnomeregan Quest",
            "alts": [
              {
                "name": "Triprunner Dungarees",
                "quality": "q3",
                "icon": "inv_pants_06.jpg",
                "stats": "+18 Agi, +4 Sta",
                "source": "Gnomeregan Quest"
              },
              {
                "name": "Infiltrator Leggings of the Tiger",
                "quality": "q2",
                "icon": "inv_pants_08.jpg",
                "stats": "+10 Str, +10 Agi",
                "source": "World Drop"
              },
              {
                "name": "Gryphon Rider's Leggings",
                "quality": "q3",
                "icon": "inv_pants_03.jpg",
                "stats": "+13 Str, +8 Sta",
                "source": "Excavation Site 4 Quest"
              }
            ]
          },
          "feet": {
            "name": "Trouncing Boots",
            "quality": "q2",
            "icon": "inv_boots_01.jpg",
            "stats": "+9 Str, +8 Agi",
            "enchant": "Minor Speed (+8% Movement)",
            "source": "Alliance Quest",
            "alts": [
              {
                "name": "Trouncing Boots",
                "quality": "q2",
                "icon": "inv_boots_01.jpg",
                "stats": "+9 Str, +8 Agi",
                "source": "The Karnitol Shipwreck (Alliance)"
              },
              {
                "name": "Shapeshifting Sentinel's Strides",
                "quality": "q3",
                "icon": "inv_boots_chain_08.jpg",
                "stats": "+11 Str, +9 Agi, +7 Sta",
                "source": "Blackfathom Deeps (Horde)"
              },
              {
                "name": "Excavator's Work Boots",
                "quality": "q3",
                "icon": "inv_boots_chain_06.jpg",
                "stats": "+8 Str, +8 Sta, +5 Agi",
                "source": "Excavation Site 4 Overseer"
              }
            ]
          },
          "finger1": {
            "name": "Wyvern Heart Band",
            "quality": "q3",
            "icon": "inv_jewelry_ring_25.jpg",
            "stats": "+7 Str, +6 Agi, +5 Sta",
            "enchant": "None",
            "source": "Harpy Matriarch / World Drop",
            "alts": [
              {
                "name": "Wyvern Heart Band",
                "quality": "q3",
                "icon": "inv_jewelry_ring_25.jpg",
                "stats": "+7 Str, +6 Agi, +5 Sta",
                "source": "Harpy Matriarch / World Drop"
              },
              {
                "name": "Tigerstrike Signet",
                "quality": "q3",
                "icon": "inv_jewelry_ring_16.jpg",
                "stats": "+8 Str, +5 Agi",
                "source": "King Bangalash, STV"
              },
              {
                "name": "Blackstone Ring",
                "quality": "q3",
                "icon": "inv_jewelry_ring_17.jpg",
                "stats": "+6 Str, +1% Hit",
                "source": "Princess Theradras, Maraudon"
              }
            ]
          },
          "finger2": {
            "name": "Blackstone Ring",
            "quality": "q3",
            "icon": "inv_jewelry_ring_17.jpg",
            "stats": "+6 Str, +1% Hit",
            "enchant": "None",
            "source": "Princess Theradras, Maraudon",
            "alts": [
              {
                "name": "Tigerstrike Signet",
                "quality": "q3",
                "icon": "inv_jewelry_ring_16.jpg",
                "stats": "+8 Str, +5 Agi",
                "source": "King Bangalash, STV"
              },
              {
                "name": "Blackstone Ring",
                "quality": "q3",
                "icon": "inv_jewelry_ring_17.jpg",
                "stats": "+6 Str, +1% Hit",
                "source": "Princess Theradras, Maraudon"
              },
              {
                "name": "Savory Devourer Band",
                "quality": "q2",
                "icon": "inv_jewelry_ring_08.jpg",
                "stats": "+6 Str, +5 Sta",
                "source": "Excavation Site 4 Rare"
              }
            ]
          },
          "trinket1": {
            "name": "Minor Recombobulator",
            "quality": "q2",
            "icon": "inv_gizmo_07.jpg",
            "stats": "Use: Restores HP/Mana, cures polymorph",
            "enchant": "None",
            "source": "Engineering (140)",
            "alts": [
              {
                "name": "Insignia of the Alliance / Horde",
                "quality": "q3",
                "icon": "inv_jewelry_trinketpvp_01.jpg",
                "stats": "Use: Dispels fear, stun, and sleep",
                "source": "PvP Rank 2 Honor Vendor"
              },
              {
                "name": "Gyromatic Icemaker",
                "quality": "q2",
                "icon": "inv_gizmo_03.jpg",
                "stats": "Use: Blasts target with frost dealing damage",
                "source": "Engineering (145)"
              },
              {
                "name": "Rune of Duty",
                "quality": "q2",
                "icon": "inv_misc_rune_01.jpg",
                "stats": "+10 Stamina",
                "source": "Warsong Gulch Friendly Vendor"
              }
            ]
          },
          "trinket2": {
            "name": "Dog Whistle",
            "quality": "q3",
            "icon": "ability_hunter_beastcall.jpg",
            "stats": "Use: Summons a battle dog",
            "enchant": "None",
            "source": "Houndmaster Loksey, SM Graveyard",
            "alts": [
              {
                "name": "Smolderweb Eye",
                "quality": "q3",
                "icon": "inv_misc_gem_pearl_04.jpg",
                "stats": "Use: Shoots a web immobilizing target for 5 sec",
                "source": "LBRS Rare / World Quest"
              },
              {
                "name": "Insignia of the Alliance / Horde",
                "quality": "q3",
                "icon": "inv_jewelry_trinketpvp_01.jpg",
                "stats": "Use: Dispels fear, stun, and sleep",
                "source": "PvP Rank 2 Honor Vendor"
              },
              {
                "name": "Minor Recombobulator",
                "quality": "q2",
                "icon": "inv_gizmo_07.jpg",
                "stats": "Use: Restores HP/Mana, cures polymorph",
                "source": "Engineering (140)"
              }
            ]
          },
          "mainHand": {
            "name": "Torturing Poker",
            "quality": "q3",
            "icon": "inv_weapon_shortblade_01.jpg",
            "stats": "1.80 Speed • 18.6 DPS • +5 Agi, +3 Sta",
            "enchant": "Weapon Damage +4",
            "source": "Interrogator Vishas, SM Graveyard",
            "alts": [
              {
                "name": "Toxic Revenger",
                "quality": "q3",
                "icon": "inv_weapon_shortblade_05.jpg",
                "stats": "2.70 Speed • 18.9 DPS • Chance on hit: Poison",
                "source": "Gnomeregan"
              },
              {
                "name": "Blackfathom Dagger",
                "quality": "q3",
                "icon": "inv_weapon_shortblade_03.jpg",
                "stats": "1.70 Speed • 17.8 DPS • +6 Agi",
                "source": "Blackfathom Deeps"
              },
              {
                "name": "Sacrificial Dagger",
                "quality": "q2",
                "icon": "inv_weapon_shortblade_04.jpg",
                "stats": "1.60 Speed • +5 Agi, +3 Sta",
                "source": "World Drop"
              }
            ]
          },
          "offHand": {
            "name": "Tail Spike",
            "quality": "q3",
            "icon": "inv_sword_25.jpg",
            "stats": "1.70 Fast Speed • 18.0 DPS • +5 Agi, +3 Sta",
            "enchant": "Lesser Agility (+5 Agi)",
            "source": "Razorfen Kraul",
            "alts": [
              {
                "name": "Torturing Poker",
                "quality": "q3",
                "icon": "inv_weapon_shortblade_01.jpg",
                "stats": "1.80 Speed • +5 Agi, +3 Sta",
                "source": "SM Graveyard"
              },
              {
                "name": "Defias Rapier",
                "quality": "q2",
                "icon": "inv_sword_04.jpg",
                "stats": "1.80 Fast Speed • +5 Agi",
                "source": "The Stockade"
              },
              {
                "name": "Scin-Rending Cleaver",
                "quality": "q3",
                "icon": "inv_axe_04.jpg",
                "stats": "2.50 Speed • +7 Str, +4 Sta",
                "source": "Excavation Site 4"
              }
            ]
          },
          "ranged": {
            "name": "Master Hunter's Rifle",
            "quality": "q2",
            "icon": "inv_weapon_rifle_05.jpg",
            "stats": "+4 Agi, +3 Sta",
            "enchant": "Standard Scope",
            "source": "Stranglethorn Vale Quest",
            "alts": [
              {
                "name": "Excavation Carbine",
                "quality": "q3",
                "icon": "inv_weapon_rifle_01.jpg",
                "stats": "+6 Agi, +4 Str",
                "source": "Excavation Site 4 Overseer"
              },
              {
                "name": "Nightstalker Bow",
                "quality": "q2",
                "icon": "inv_weapon_bow_08.jpg",
                "stats": "+5 Agi, +3 Sta",
                "source": "World Drop"
              },
              {
                "name": "Venomstrike",
                "quality": "q3",
                "icon": "inv_weapon_bow_01.jpg",
                "stats": "Chance on hit: 31-45 Poison damage",
                "source": "Lord Cobrahn, Wailing Caverns"
              }
            ]
          }
        }
      }
    ]
  },
  "priest": {
    "specs": [
      {
        "id": "shadow-pve",
        "name": "Shadow PvE",
        "role": "Ranged Caster DPS",
        "icon": "https://render.worldofwarcraft.com/us/icons/56/spell_shadow_shadowwordpain.jpg",
        "weaponType": "Staff or Dagger/Mace + Offhand + Wand",
        "statSummary": {
          "alliance": {
            "hp": 1080,
            "mana": 2380,
            "armor": 480,
            "int": 165,
            "spi": 92,
            "sta": 88,
            "shadowSp": "+84 Shadow Spell Dmg",
            "hit": "10% (+10% Shadow Focus)"
          },
          "horde": {
            "hp": 1100,
            "mana": 2350,
            "armor": 480,
            "int": 163,
            "spi": 94,
            "sta": 90,
            "shadowSp": "+84 Shadow Spell Dmg",
            "hit": "10%"
          }
        },
        "talents": {
          "points": "0 / 0 / 26",
          "summary": "Shadow Focus (+10% Hit) + Improved Mind Blast + Mind Flay + Shadow Weaving (+15% Shadow Vulnerability at Level 30 cap)",
          "buildCode": "FOREVER-PRIEST-SHADOW-30-0-0-26",
          "trees": [
            {
              "name": "Discipline",
              "icon": "https://render.worldofwarcraft.com/us/icons/56/spell_holy_wordfortitude.jpg",
              "points": 0,
              "talents": []
            },
            {
              "name": "Holy",
              "icon": "https://render.worldofwarcraft.com/us/icons/56/spell_holy_guardianspirit.jpg",
              "points": 0,
              "talents": []
            },
            {
              "name": "Shadow",
              "icon": "https://render.worldofwarcraft.com/us/icons/56/spell_shadow_shadowwordpain.jpg",
              "points": 26,
              "talents": [
                {
                  "name": "Spirit Tap",
                  "rank": "5/5",
                  "desc": "Gives a 100% chance to gain a 100% bonus to Spirit after killing an enemy."
                },
                {
                  "name": "Improved Shadow Word: Pain",
                  "rank": "2/2",
                  "desc": "Increases duration of Shadow Word: Pain by 6 sec."
                },
                {
                  "name": "Shadow Focus",
                  "rank": "5/5",
                  "desc": "Increases your chance to hit with Shadow spells by 10%."
                },
                {
                  "name": "Mind Flay",
                  "rank": "1/1",
                  "desc": "Channels shadow energy into target, dealing damage and slowing by 50%."
                },
                {
                  "name": "Improved Mind Blast",
                  "rank": "5/5",
                  "desc": "Reduces cooldown of Mind Blast by 2.5 sec."
                },
                {
                  "name": "Shadow Reach",
                  "rank": "3/3",
                  "desc": "Increases range of Shadow spells by 20%."
                },
                {
                  "name": "Shadow Weaving",
                  "rank": "5/5",
                  "desc": "Shadow spells have a 100% chance to cause target to take 15% increased Shadow damage."
                }
              ]
            }
          ]
        },
        "gear": {
          "head": {
            "name": "Archivist's Spell-Cap",
            "quality": "q3",
            "icon": "inv_helmet_14.jpg",
            "stats": "+11 Int, +8 Sta, +12 Shadow Spell Damage",
            "enchant": "Lesser Arcanum of Focus (+8 Spell Power)",
            "source": "City of Dalaran Boss",
            "alts": [
              {
                "name": "Green Tinted Goggles",
                "quality": "q2",
                "icon": "inv_helmet_15.jpg",
                "stats": "+8 Sta, +7 Spi",
                "source": "Engineering"
              },
              {
                "name": "Azure Silk Hood",
                "quality": "q2",
                "icon": "inv_helmet_15.jpg",
                "stats": "+11 Int, +8 Sta",
                "source": "Tailoring (145)"
              },
              {
                "name": "Nightsky Cowl",
                "quality": "q2",
                "icon": "inv_helmet_14.jpg",
                "stats": "+9 Int, +6 Spi",
                "source": "World Drop"
              }
            ]
          },
          "neck": {
            "name": "Archmagister's Faceted Pendant",
            "quality": "q3",
            "icon": "inv_misc_necklacea8.jpg",
            "stats": "+6 Int, +14 Spell Power, +Undead XP",
            "enchant": "None",
            "source": "City of Dalaran Boss",
            "alts": [
              {
                "name": "Ghostshard Talisman",
                "quality": "q3",
                "icon": "inv_jewelry_necklace_06.jpg",
                "stats": "+11 Sta",
                "source": "SM Graveyard"
              },
              {
                "name": "Fossilized Amber Pendant",
                "quality": "q3",
                "icon": "inv_jewelry_necklace_12.jpg",
                "stats": "+8 Int, +6 Sta, +5 Spi",
                "source": "Excavation Site 4 Boss"
              },
              {
                "name": "Electrocutioner Locket",
                "quality": "q3",
                "icon": "inv_jewelry_necklace_10.jpg",
                "stats": "+9 Int, +5 Spi",
                "source": "Electrocutioner 6000, Gnomeregan"
              }
            ]
          },
          "shoulder": {
            "name": "Inquisitor's Shawl",
            "quality": "q3",
            "icon": "inv_shoulder_02.jpg",
            "stats": "+9 Int, +8 Spi",
            "enchant": "None",
            "source": "Scarlet Monastery Graveyard",
            "alts": [
              {
                "name": "Magician's Mantle",
                "quality": "q3",
                "icon": "inv_shoulder_23.jpg",
                "stats": "+8 Int, +5 Sta",
                "source": "World Drop"
              },
              {
                "name": "Mantle of Dalaran",
                "quality": "q3",
                "icon": "inv_shoulder_02.jpg",
                "stats": "+12 Int, +8 Sta, +9 Spell Power",
                "source": "Kirin Tor Archmage, City of Dalaran"
              },
              {
                "name": "Beguiler's Robes Pauldrons",
                "quality": "q2",
                "icon": "inv_shoulder_13.jpg",
                "stats": "+8 Int, +6 Spi",
                "source": "Scarlet Monastery Graveyard"
              }
            ]
          },
          "back": {
            "name": "Drape of Shifting Energy",
            "quality": "q3",
            "icon": "inv_misc_cape_18.jpg",
            "stats": "+7 Sta, +8 Int, +9 Spell Damage",
            "enchant": "Lesser Resistance",
            "source": "City of Dalaran",
            "alts": [
              {
                "name": "Engineer's Cloak",
                "quality": "q2",
                "icon": "inv_misc_cape_06.jpg",
                "stats": "+6 Int",
                "source": "Gnomeregan"
              },
              {
                "name": "Nightsky Cloak",
                "quality": "q2",
                "icon": "inv_misc_cape_03.jpg",
                "stats": "+7 Int, +4 Spi",
                "source": "World Drop"
              },
              {
                "name": "Cloak of the People's Militia",
                "quality": "q2",
                "icon": "inv_misc_cape_11.jpg",
                "stats": "+6 Sta, +5 Int",
                "source": "Westfall Militia Quest"
              }
            ]
          },
          "chest": {
            "name": "Robes of Arugal",
            "quality": "q3",
            "icon": "inv_chest_cloth_16.jpg",
            "stats": "+10 Int, +10 Spi, +5 Agi, +3 Sta",
            "enchant": "Greater Mana (+50 Mana)",
            "source": "Shadowfang Keep",
            "alts": [
              {
                "name": "Robe of the Magi",
                "quality": "q3",
                "icon": "inv_chest_cloth_08.jpg",
                "stats": "+12 Int, +8 Spi, +14 Spell Dmg",
                "source": "City of Dalaran"
              },
              {
                "name": "Robes of Arcanic Flow",
                "quality": "q3",
                "icon": "inv_chest_cloth_16.jpg",
                "stats": "+14 Int, +9 Sta, +12 Spell Power",
                "source": "Grand Mage Doan / Dalaran Vault"
              },
              {
                "name": "Robes of the Doombringer",
                "quality": "q3",
                "icon": "inv_chest_cloth_03.jpg",
                "stats": "+10 Int, +7 Sta, +14 Shadow/Fire Dmg",
                "source": "Scarlet Monastery Graveyard"
              }
            ]
          },
          "wrist": {
            "name": "Mindthrust Bracers",
            "quality": "q3",
            "icon": "inv_bracer_07.jpg",
            "stats": "+8 Int, +4 Spi",
            "enchant": "Lesser Intellect (+5 Int)",
            "source": "World Drop",
            "alts": [
              {
                "name": "Sparkmetal Bracers",
                "quality": "q2",
                "icon": "inv_bracer_06.jpg",
                "stats": "+6 Int, +3 Sta",
                "source": "Gnomeregan"
              },
              {
                "name": "Unearthed Bands of the Owl",
                "quality": "q3",
                "icon": "inv_bracer_07.jpg",
                "stats": "+7 Int, +7 Spi",
                "source": "Uldaman / World Drop"
              },
              {
                "name": "Arcanist's Bindings",
                "quality": "q2",
                "icon": "inv_bracer_06.jpg",
                "stats": "+6 Int, +4 Sta",
                "source": "World Drop"
              }
            ]
          },
          "hands": {
            "name": "Magefist Gloves",
            "quality": "q3",
            "icon": "inv_gauntlets_17.jpg",
            "stats": "+8 Int, +5 Spi, +6 Spell Damage",
            "enchant": "Lesser Intellect (+5 Int)",
            "source": "World Drop",
            "alts": [
              {
                "name": "Gold-flecked Gloves",
                "quality": "q3",
                "icon": "inv_gauntlets_14.jpg",
                "stats": "+8 Int, +7 Spi",
                "source": "Razorfen Kraul"
              },
              {
                "name": "Crimson Silk Gloves",
                "quality": "q2",
                "icon": "inv_gauntlets_14.jpg",
                "stats": "+10 Int, +7 Spell Power",
                "source": "Tailoring (150)"
              },
              {
                "name": "Hands of the Exiled",
                "quality": "q3",
                "icon": "inv_gauntlets_17.jpg",
                "stats": "+9 Int, +5 Sta, +6 Shadow Dmg",
                "source": "Scarlet Monastery Graveyard"
              }
            ]
          },
          "waist": {
            "name": "Belt of Arugal",
            "quality": "q3",
            "icon": "inv_belt_13.jpg",
            "stats": "+8 Int, +4 Spi, +3 Sta",
            "enchant": "None",
            "source": "Shadowfang Keep",
            "alts": [
              {
                "name": "Girdle of the Blessed",
                "quality": "q3",
                "icon": "inv_belt_11.jpg",
                "stats": "+9 Int, +8 Sta",
                "source": "City of Dalaran"
              },
              {
                "name": "Dalaran Warden's Belt",
                "quality": "q3",
                "icon": "inv_belt_08.jpg",
                "stats": "+11 Int, +7 Sta, +8 Spell Power",
                "source": "City of Dalaran Gatekeeper"
              },
              {
                "name": "Belt of the Undertaker",
                "quality": "q3",
                "icon": "inv_belt_03.jpg",
                "stats": "+8 Int, +5 Sta, +6 Shadow Dmg",
                "source": "The Stockade Rare"
              }
            ]
          },
          "legs": {
            "name": "Gaze Leggings",
            "quality": "q3",
            "icon": "inv_pants_08.jpg",
            "stats": "+9 Int, +9 Sta, +11 Spell Damage",
            "enchant": "Mana +65",
            "source": "Excavation Site 4",
            "alts": [
              {
                "name": "Silver-thread Pants",
                "quality": "q2",
                "icon": "inv_pants_07.jpg",
                "stats": "+11 Int, +8 Spi",
                "source": "World Drop"
              },
              {
                "name": "Netherweave Pants",
                "quality": "q2",
                "icon": "inv_pants_cloth_05.jpg",
                "stats": "+12 Int, +8 Sta",
                "source": "Tailoring / World Drop"
              },
              {
                "name": "Nightsky Trousers",
                "quality": "q2",
                "icon": "inv_pants_08.jpg",
                "stats": "+10 Int, +7 Spi",
                "source": "World Drop"
              }
            ]
          },
          "feet": {
            "name": "Spidersilk Boots",
            "quality": "q3",
            "icon": "inv_boots_05.jpg",
            "stats": "+8 Int, +8 Spi, +7 Sta",
            "enchant": "Minor Speed (+8% Run)",
            "source": "Tailoring (125)",
            "alts": [
              {
                "name": "Acidic Walkers",
                "quality": "q3",
                "icon": "inv_boots_cloth_03.jpg",
                "stats": "+7 Int, +7 Sta",
                "source": "Gnomeregan"
              },
              {
                "name": "Dalaran Apprentice Slippers",
                "quality": "q2",
                "icon": "inv_boots_05.jpg",
                "stats": "+8 Int, +4 Sta",
                "source": "City of Dalaran"
              },
              {
                "name": "Nightsky Boots",
                "quality": "q2",
                "icon": "inv_boots_04.jpg",
                "stats": "+7 Int, +5 Spi",
                "source": "World Drop"
              }
            ]
          },
          "finger1": {
            "name": "Band of the Arcanist",
            "quality": "q3",
            "icon": "inv_jewelry_ring_14.jpg",
            "stats": "+8 Int, +4 Sta, +7 Spell Damage",
            "enchant": "None",
            "source": "City of Dalaran",
            "alts": [
              {
                "name": "Advisor's Ring",
                "quality": "q3",
                "icon": "inv_jewelry_ring_22.jpg",
                "stats": "+7 Int, +5 Spi",
                "source": "WSG Vendor"
              },
              {
                "name": "Violet Signet",
                "quality": "q3",
                "icon": "inv_jewelry_ring_15.jpg",
                "stats": "+8 Int, +6 Sta, +7 Spell Power",
                "source": "City of Dalaran Arcane Vault"
              },
              {
                "name": "Deep Fathom Ring",
                "quality": "q3",
                "icon": "inv_jewelry_ring_14.jpg",
                "stats": "+6 Int, +5 Sta, +4 Spi",
                "source": "Aku'mai, Blackfathom Deeps"
              }
            ]
          },
          "finger2": {
            "name": "Advisor's Ring",
            "quality": "q3",
            "icon": "inv_jewelry_ring_22.jpg",
            "stats": "+7 Int, +5 Spi, +7 Spell Damage",
            "enchant": "None",
            "source": "Warsong Gulch Vendor",
            "alts": [
              {
                "name": "Lavishly Jeweled Ring",
                "quality": "q3",
                "icon": "inv_jewelry_ring_03.jpg",
                "stats": "+6 Int, +2 Agi",
                "source": "Deadmines"
              },
              {
                "name": "Violet Signet",
                "quality": "q3",
                "icon": "inv_jewelry_ring_15.jpg",
                "stats": "+8 Int, +6 Sta, +7 Spell Power",
                "source": "City of Dalaran Arcane Vault"
              },
              {
                "name": "Deep Fathom Ring",
                "quality": "q3",
                "icon": "inv_jewelry_ring_14.jpg",
                "stats": "+6 Int, +5 Sta, +4 Spi",
                "source": "Aku'mai, Blackfathom Deeps"
              }
            ]
          },
          "trinket1": {
            "name": "Minor Recombobulator",
            "quality": "q2",
            "icon": "inv_gizmo_07.jpg",
            "stats": "Restores HP/Mana, removes polymorph",
            "enchant": "None",
            "source": "Engineering",
            "alts": [
              {
                "name": "Burst of Knowledge",
                "quality": "q3",
                "icon": "inv_jewelry_talisman_07.jpg",
                "stats": "Use: Increases Spell Damage by +20 for 15 sec",
                "source": "City of Dalaran"
              },
              {
                "name": "Insignia of the Alliance / Horde",
                "quality": "q3",
                "icon": "inv_jewelry_trinketpvp_01.jpg",
                "stats": "Use: Dispels fear, stun, and sleep",
                "source": "PvP Rank 2 Honor Vendor"
              },
              {
                "name": "Rune of Duty",
                "quality": "q2",
                "icon": "inv_misc_rune_01.jpg",
                "stats": "+10 Stamina",
                "source": "Warsong Gulch Friendly Vendor"
              }
            ]
          },
          "trinket2": {
            "name": "Parchment of Inner Light",
            "quality": "q3",
            "icon": "inv_misc_book_09.jpg",
            "stats": "Equip: Restores 6 mana per 5 sec",
            "enchant": "None",
            "source": "City of Dalaran",
            "alts": [
              {
                "name": "Dog Whistle",
                "quality": "q3",
                "icon": "ability_hunter_beastcall.jpg",
                "stats": "Use: Summons a tracking battle hound (10 min)",
                "source": "Houndmaster Loksey, SM Graveyard"
              },
              {
                "name": "Smolderweb Eye",
                "quality": "q3",
                "icon": "inv_misc_gem_pearl_04.jpg",
                "stats": "Use: Shoots a web immobilizing target for 5 sec",
                "source": "LBRS Rare / World Quest"
              },
              {
                "name": "Insignia of the Alliance / Horde",
                "quality": "q3",
                "icon": "inv_jewelry_trinketpvp_01.jpg",
                "stats": "Use: Dispels fear, stun, and sleep",
                "source": "PvP Rank 2 Honor Vendor"
              }
            ]
          },
          "mainHand": {
            "name": "Inventor's Focal Rod",
            "quality": "q3",
            "icon": "inv_wand_06.jpg",
            "stats": "+9 Int, +6 Spi, +16 Shadow Damage",
            "enchant": "Lesser Spell Power (+15 Spell Dmg)",
            "source": "Gnomeregan",
            "alts": [
              {
                "name": "Scepter of the Council",
                "quality": "q3",
                "icon": "inv_mace_11.jpg",
                "stats": "+8 Int, +7 Sta, +14 Spell Dmg",
                "source": "City of Dalaran"
              },
              {
                "name": "Hypnotic Blade",
                "quality": "q3",
                "icon": "inv_sword_01.jpg",
                "stats": "1.40 Speed • +8 Int, +3 Spi, +9 Spell Power",
                "source": "Scarlet Monastery Graveyard"
              },
              {
                "name": "Kirin Tor Scepter",
                "quality": "q3",
                "icon": "inv_mace_07.jpg",
                "stats": "2.10 Speed • +9 Int, +6 Sta, +8 Spell Power",
                "source": "City of Dalaran"
              }
            ]
          },
          "offHand": {
            "name": "Orb of the Forgotten Archmage",
            "quality": "q3",
            "icon": "inv_misc_orb_03.jpg",
            "stats": "+8 Int, +6 Sta, +12 Shadow Spell Damage",
            "enchant": "None",
            "source": "City of Dalaran",
            "alts": [
              {
                "name": "Orb of Soran",
                "quality": "q3",
                "icon": "inv_misc_orb_01.jpg",
                "stats": "+7 Int, +5 Spi",
                "source": "Shadowfang Keep"
              },
              {
                "name": "Tome of the Lost",
                "quality": "q3",
                "icon": "inv_misc_book_06.jpg",
                "stats": "+7 Int, +5 Sta, +6 Spell Power",
                "source": "City of Dalaran Vault"
              },
              {
                "name": "Skull of Impending Doom",
                "quality": "q2",
                "icon": "inv_misc_bone_skull_01.jpg",
                "stats": "Use: Increases run speed by 60%",
                "source": "Badlands Quest"
              }
            ]
          },
          "ranged": {
            "name": "Gravestone Scepter",
            "quality": "q3",
            "icon": "inv_wand_02.jpg",
            "stats": "29.0 DPS Shadow Dmg • +5 Int, +5 Spi",
            "enchant": "None",
            "source": "Blackfathom Villainy Quest",
            "alts": [
              {
                "name": "Cookie's Stirring Rod",
                "quality": "q3",
                "icon": "inv_wand_04.jpg",
                "stats": "18.5 DPS • +4 Int, +3 Sta",
                "source": "Deadmines"
              },
              {
                "name": "Kirin Tor Apprentice Wand",
                "quality": "q3",
                "icon": "inv_wand_06.jpg",
                "stats": "31.2 DPS Arcane • +6 Int, +4 Spell Power",
                "source": "City of Dalaran Boss"
              },
              {
                "name": "Petrified Bone Wand",
                "quality": "q3",
                "icon": "inv_wand_01.jpg",
                "stats": "28.5 DPS Nature • +5 Int, +4 Sta",
                "source": "Excavation Site 4"
              }
            ]
          }
        }
      }
    ]
  },
  "warlock": {
    "specs": [
      {
        "id": "pve",
        "name": "Affliction / Destro PvE",
        "role": "Ranged Caster DPS",
        "icon": "https://render.worldofwarcraft.com/us/icons/56/spell_shadow_deathcoil.jpg",
        "weaponType": "Staff or Dagger/Sword + Offhand + Wand",
        "statSummary": {
          "alliance": {
            "hp": 1140,
            "mana": 2280,
            "armor": 480,
            "int": 160,
            "sta": 104,
            "spi": 75,
            "shadowSp": "+86 Shadow Spell Dmg",
            "hit": "10% (+10% Suppression)"
          },
          "horde": {
            "hp": 1160,
            "mana": 2250,
            "armor": 480,
            "int": 158,
            "sta": 106,
            "spi": 77,
            "shadowSp": "+86 Shadow Spell Dmg",
            "hit": "10%"
          }
        },
        "talents": {
          "points": "21 / 0 / 5",
          "summary": "Suppression (+10% Hit) + Improved Corruption (Instant Cast) + Siphon Life + Shadowburn",
          "buildCode": "FOREVER-WARLOCK-AFF-30-21-0-5",
          "trees": [
            {
              "name": "Affliction",
              "icon": "https://render.worldofwarcraft.com/us/icons/56/spell_shadow_deathcoil.jpg",
              "points": 21,
              "talents": [
                {
                  "name": "Suppression",
                  "rank": "5/5",
                  "desc": "Reduces chance for enemies to resist your Affliction spells by 10%."
                },
                {
                  "name": "Improved Corruption",
                  "rank": "5/5",
                  "desc": "Reduces cast time of Corruption by 2 sec (Instant Cast!)."
                },
                {
                  "name": "Improved Life Tap",
                  "rank": "2/2",
                  "desc": "Increases mana awarded by Life Tap by 20%."
                },
                {
                  "name": "Nightfall",
                  "rank": "2/2",
                  "desc": "Gives Corruption and Drain Life a 4% chance to grant an instant Shadow Bolt."
                },
                {
                  "name": "Grim Reach",
                  "rank": "2/2",
                  "desc": "Increases range of Affliction spells by 20%."
                },
                {
                  "name": "Siphon Life",
                  "rank": "1/1",
                  "desc": "Transfers health from the target to the caster every 3 sec."
                },
                {
                  "name": "Shadow Embrace",
                  "rank": "4/4",
                  "isNew": true,
                  "desc": "Classic+ Talent: Shadow spells apply Shadow Embrace, reducing physical damage dealt by target."
                }
              ]
            },
            {
              "name": "Demonology",
              "icon": "https://render.worldofwarcraft.com/us/icons/56/spell_shadow_metamorphosis.jpg",
              "points": 0,
              "talents": []
            },
            {
              "name": "Destruction",
              "icon": "https://render.worldofwarcraft.com/us/icons/56/spell_shadow_rainoffire.jpg",
              "points": 5,
              "talents": [
                {
                  "name": "Improved Shadow Bolt",
                  "rank": "5/5",
                  "desc": "Shadow Bolt crits increase shadow damage dealt to target by 20% for next 4 hits."
                }
              ]
            }
          ]
        },
        "gear": {
          "head": {
            "name": "Archivist's Spell-Cap",
            "quality": "q3",
            "icon": "inv_helmet_14.jpg",
            "stats": "+11 Int, +8 Sta, +12 Shadow Spell Damage",
            "enchant": "Lesser Arcanum of Focus (+8 Spell Power)",
            "source": "City of Dalaran Boss",
            "alts": [
              {
                "name": "Green Tinted Goggles",
                "quality": "q2",
                "icon": "inv_helmet_15.jpg",
                "stats": "+8 Sta, +7 Spi",
                "source": "Engineering"
              },
              {
                "name": "Azure Silk Hood",
                "quality": "q2",
                "icon": "inv_helmet_15.jpg",
                "stats": "+11 Int, +8 Sta",
                "source": "Tailoring (145)"
              },
              {
                "name": "Nightsky Cowl",
                "quality": "q2",
                "icon": "inv_helmet_14.jpg",
                "stats": "+9 Int, +6 Spi",
                "source": "World Drop"
              }
            ]
          },
          "neck": {
            "name": "Archmagister's Faceted Pendant",
            "quality": "q3",
            "icon": "inv_misc_necklacea8.jpg",
            "stats": "+6 Int, +14 Spell Power, +Undead XP",
            "enchant": "None",
            "source": "City of Dalaran Boss",
            "alts": [
              {
                "name": "Ghostshard Talisman",
                "quality": "q3",
                "icon": "inv_jewelry_necklace_06.jpg",
                "stats": "+11 Sta",
                "source": "SM Graveyard"
              },
              {
                "name": "Fossilized Amber Pendant",
                "quality": "q3",
                "icon": "inv_jewelry_necklace_12.jpg",
                "stats": "+8 Int, +6 Sta, +5 Spi",
                "source": "Excavation Site 4 Boss"
              },
              {
                "name": "Electrocutioner Locket",
                "quality": "q3",
                "icon": "inv_jewelry_necklace_10.jpg",
                "stats": "+9 Int, +5 Spi",
                "source": "Electrocutioner 6000, Gnomeregan"
              }
            ]
          },
          "shoulder": {
            "name": "Inquisitor's Shawl",
            "quality": "q3",
            "icon": "inv_shoulder_02.jpg",
            "stats": "+9 Int, +8 Spi",
            "enchant": "None",
            "source": "Scarlet Monastery Graveyard",
            "alts": [
              {
                "name": "Magician's Mantle",
                "quality": "q3",
                "icon": "inv_shoulder_23.jpg",
                "stats": "+8 Int, +5 Sta",
                "source": "World Drop"
              },
              {
                "name": "Mantle of Dalaran",
                "quality": "q3",
                "icon": "inv_shoulder_02.jpg",
                "stats": "+12 Int, +8 Sta, +9 Spell Power",
                "source": "Kirin Tor Archmage, City of Dalaran"
              },
              {
                "name": "Beguiler's Robes Pauldrons",
                "quality": "q2",
                "icon": "inv_shoulder_13.jpg",
                "stats": "+8 Int, +6 Spi",
                "source": "Scarlet Monastery Graveyard"
              }
            ]
          },
          "back": {
            "name": "Drape of Shifting Energy",
            "quality": "q3",
            "icon": "inv_misc_cape_18.jpg",
            "stats": "+7 Sta, +8 Int, +9 Spell Damage",
            "enchant": "Lesser Resistance",
            "source": "City of Dalaran",
            "alts": [
              {
                "name": "Engineer's Cloak",
                "quality": "q2",
                "icon": "inv_misc_cape_06.jpg",
                "stats": "+6 Int",
                "source": "Gnomeregan"
              },
              {
                "name": "Nightsky Cloak",
                "quality": "q2",
                "icon": "inv_misc_cape_03.jpg",
                "stats": "+7 Int, +4 Spi",
                "source": "World Drop"
              },
              {
                "name": "Cloak of the People's Militia",
                "quality": "q2",
                "icon": "inv_misc_cape_11.jpg",
                "stats": "+6 Sta, +5 Int",
                "source": "Westfall Militia Quest"
              }
            ]
          },
          "chest": {
            "name": "Robes of Arugal",
            "quality": "q3",
            "icon": "inv_chest_cloth_16.jpg",
            "stats": "+10 Int, +10 Spi, +5 Agi, +3 Sta",
            "enchant": "Greater Health (+35 Health)",
            "source": "Shadowfang Keep",
            "alts": [
              {
                "name": "Robe of the Magi",
                "quality": "q3",
                "icon": "inv_chest_cloth_08.jpg",
                "stats": "+12 Int, +8 Spi, +14 Spell Dmg",
                "source": "City of Dalaran"
              },
              {
                "name": "Robes of Arcanic Flow",
                "quality": "q3",
                "icon": "inv_chest_cloth_16.jpg",
                "stats": "+14 Int, +9 Sta, +12 Spell Power",
                "source": "Grand Mage Doan / Dalaran Vault"
              },
              {
                "name": "Robes of the Doombringer",
                "quality": "q3",
                "icon": "inv_chest_cloth_03.jpg",
                "stats": "+10 Int, +7 Sta, +14 Shadow/Fire Dmg",
                "source": "Scarlet Monastery Graveyard"
              }
            ]
          },
          "wrist": {
            "name": "Mindthrust Bracers",
            "quality": "q3",
            "icon": "inv_bracer_07.jpg",
            "stats": "+8 Int, +4 Spi",
            "enchant": "Lesser Intellect (+5 Int)",
            "source": "World Drop",
            "alts": [
              {
                "name": "Sparkmetal Bracers",
                "quality": "q2",
                "icon": "inv_bracer_06.jpg",
                "stats": "+6 Int, +3 Sta",
                "source": "Gnomeregan"
              },
              {
                "name": "Unearthed Bands of the Owl",
                "quality": "q3",
                "icon": "inv_bracer_07.jpg",
                "stats": "+7 Int, +7 Spi",
                "source": "Uldaman / World Drop"
              },
              {
                "name": "Arcanist's Bindings",
                "quality": "q2",
                "icon": "inv_bracer_06.jpg",
                "stats": "+6 Int, +4 Sta",
                "source": "World Drop"
              }
            ]
          },
          "hands": {
            "name": "Magefist Gloves",
            "quality": "q3",
            "icon": "inv_gauntlets_17.jpg",
            "stats": "+8 Int, +5 Spi, +6 Spell Damage",
            "enchant": "Lesser Intellect (+5 Int)",
            "source": "World Drop",
            "alts": [
              {
                "name": "Gold-flecked Gloves",
                "quality": "q3",
                "icon": "inv_gauntlets_14.jpg",
                "stats": "+8 Int, +7 Spi",
                "source": "Razorfen Kraul"
              },
              {
                "name": "Crimson Silk Gloves",
                "quality": "q2",
                "icon": "inv_gauntlets_14.jpg",
                "stats": "+10 Int, +7 Spell Power",
                "source": "Tailoring (150)"
              },
              {
                "name": "Hands of the Exiled",
                "quality": "q3",
                "icon": "inv_gauntlets_17.jpg",
                "stats": "+9 Int, +5 Sta, +6 Shadow Dmg",
                "source": "Scarlet Monastery Graveyard"
              }
            ]
          },
          "waist": {
            "name": "Belt of Arugal",
            "quality": "q3",
            "icon": "inv_belt_13.jpg",
            "stats": "+8 Int, +4 Spi, +3 Sta",
            "enchant": "None",
            "source": "Shadowfang Keep",
            "alts": [
              {
                "name": "Girdle of the Blessed",
                "quality": "q3",
                "icon": "inv_belt_11.jpg",
                "stats": "+9 Int, +8 Sta",
                "source": "City of Dalaran"
              },
              {
                "name": "Dalaran Warden's Belt",
                "quality": "q3",
                "icon": "inv_belt_08.jpg",
                "stats": "+11 Int, +7 Sta, +8 Spell Power",
                "source": "City of Dalaran Gatekeeper"
              },
              {
                "name": "Belt of the Undertaker",
                "quality": "q3",
                "icon": "inv_belt_03.jpg",
                "stats": "+8 Int, +5 Sta, +6 Shadow Dmg",
                "source": "The Stockade Rare"
              }
            ]
          },
          "legs": {
            "name": "Gaze Leggings",
            "quality": "q3",
            "icon": "inv_pants_08.jpg",
            "stats": "+9 Int, +9 Sta, +11 Spell Damage",
            "enchant": "Greater Health (+35 Health)",
            "source": "Excavation Site 4",
            "alts": [
              {
                "name": "Silver-thread Pants",
                "quality": "q2",
                "icon": "inv_pants_07.jpg",
                "stats": "+11 Int, +8 Spi",
                "source": "World Drop"
              },
              {
                "name": "Netherweave Pants",
                "quality": "q2",
                "icon": "inv_pants_cloth_05.jpg",
                "stats": "+12 Int, +8 Sta",
                "source": "Tailoring / World Drop"
              },
              {
                "name": "Nightsky Trousers",
                "quality": "q2",
                "icon": "inv_pants_08.jpg",
                "stats": "+10 Int, +7 Spi",
                "source": "World Drop"
              }
            ]
          },
          "feet": {
            "name": "Spidersilk Boots",
            "quality": "q3",
            "icon": "inv_boots_05.jpg",
            "stats": "+8 Int, +8 Spi, +7 Sta",
            "enchant": "Minor Speed (+8% Run)",
            "source": "Tailoring (125)",
            "alts": [
              {
                "name": "Acidic Walkers",
                "quality": "q3",
                "icon": "inv_boots_cloth_03.jpg",
                "stats": "+7 Int, +7 Sta",
                "source": "Gnomeregan"
              },
              {
                "name": "Dalaran Apprentice Slippers",
                "quality": "q2",
                "icon": "inv_boots_05.jpg",
                "stats": "+8 Int, +4 Sta",
                "source": "City of Dalaran"
              },
              {
                "name": "Nightsky Boots",
                "quality": "q2",
                "icon": "inv_boots_04.jpg",
                "stats": "+7 Int, +5 Spi",
                "source": "World Drop"
              }
            ]
          },
          "finger1": {
            "name": "Band of the Arcanist",
            "quality": "q3",
            "icon": "inv_jewelry_ring_14.jpg",
            "stats": "+8 Int, +4 Sta, +7 Spell Damage",
            "enchant": "None",
            "source": "City of Dalaran",
            "alts": [
              {
                "name": "Advisor's Ring",
                "quality": "q3",
                "icon": "inv_jewelry_ring_22.jpg",
                "stats": "+7 Int, +5 Spi",
                "source": "WSG Vendor"
              },
              {
                "name": "Violet Signet",
                "quality": "q3",
                "icon": "inv_jewelry_ring_15.jpg",
                "stats": "+8 Int, +6 Sta, +7 Spell Power",
                "source": "City of Dalaran Arcane Vault"
              },
              {
                "name": "Deep Fathom Ring",
                "quality": "q3",
                "icon": "inv_jewelry_ring_14.jpg",
                "stats": "+6 Int, +5 Sta, +4 Spi",
                "source": "Aku'mai, Blackfathom Deeps"
              }
            ]
          },
          "finger2": {
            "name": "Advisor's Ring",
            "quality": "q3",
            "icon": "inv_jewelry_ring_22.jpg",
            "stats": "+7 Int, +5 Spi, +7 Spell Damage",
            "enchant": "None",
            "source": "Warsong Gulch Vendor",
            "alts": [
              {
                "name": "Lavishly Jeweled Ring",
                "quality": "q3",
                "icon": "inv_jewelry_ring_03.jpg",
                "stats": "+6 Int, +2 Agi",
                "source": "Deadmines"
              },
              {
                "name": "Violet Signet",
                "quality": "q3",
                "icon": "inv_jewelry_ring_15.jpg",
                "stats": "+8 Int, +6 Sta, +7 Spell Power",
                "source": "City of Dalaran Arcane Vault"
              },
              {
                "name": "Deep Fathom Ring",
                "quality": "q3",
                "icon": "inv_jewelry_ring_14.jpg",
                "stats": "+6 Int, +5 Sta, +4 Spi",
                "source": "Aku'mai, Blackfathom Deeps"
              }
            ]
          },
          "trinket1": {
            "name": "Minor Recombobulator",
            "quality": "q2",
            "icon": "inv_gizmo_07.jpg",
            "stats": "Restores HP/Mana, removes polymorph",
            "enchant": "None",
            "source": "Engineering",
            "alts": [
              {
                "name": "Burst of Knowledge",
                "quality": "q3",
                "icon": "inv_jewelry_talisman_07.jpg",
                "stats": "Use: Increases Spell Damage by +20 for 15 sec",
                "source": "City of Dalaran"
              },
              {
                "name": "Insignia of the Alliance / Horde",
                "quality": "q3",
                "icon": "inv_jewelry_trinketpvp_01.jpg",
                "stats": "Use: Dispels fear, stun, and sleep",
                "source": "PvP Rank 2 Honor Vendor"
              },
              {
                "name": "Rune of Duty",
                "quality": "q2",
                "icon": "inv_misc_rune_01.jpg",
                "stats": "+10 Stamina",
                "source": "Warsong Gulch Friendly Vendor"
              }
            ]
          },
          "trinket2": {
            "name": "Dog Whistle",
            "quality": "q3",
            "icon": "ability_hunter_beastcall.jpg",
            "stats": "Summons a fighting dog",
            "enchant": "None",
            "source": "Scarlet Monastery Graveyard",
            "alts": [
              {
                "name": "Smolderweb Eye",
                "quality": "q3",
                "icon": "inv_misc_gem_pearl_04.jpg",
                "stats": "Use: Shoots a web immobilizing target for 5 sec",
                "source": "LBRS Rare / World Quest"
              },
              {
                "name": "Insignia of the Alliance / Horde",
                "quality": "q3",
                "icon": "inv_jewelry_trinketpvp_01.jpg",
                "stats": "Use: Dispels fear, stun, and sleep",
                "source": "PvP Rank 2 Honor Vendor"
              },
              {
                "name": "Minor Recombobulator",
                "quality": "q2",
                "icon": "inv_gizmo_07.jpg",
                "stats": "Use: Restores HP/Mana, cures polymorph",
                "source": "Engineering (140)"
              }
            ]
          },
          "mainHand": {
            "name": "Inventor's Focal Rod",
            "quality": "q3",
            "icon": "inv_wand_06.jpg",
            "stats": "+9 Int, +6 Spi, +16 Shadow Damage",
            "enchant": "Lesser Spell Power (+15 Spell Dmg)",
            "source": "Gnomeregan",
            "alts": [
              {
                "name": "Scepter of the Council",
                "quality": "q3",
                "icon": "inv_mace_11.jpg",
                "stats": "+8 Int, +7 Sta, +14 Spell Dmg",
                "source": "City of Dalaran"
              },
              {
                "name": "Hypnotic Blade",
                "quality": "q3",
                "icon": "inv_sword_01.jpg",
                "stats": "1.40 Speed • +8 Int, +3 Spi, +9 Spell Power",
                "source": "Scarlet Monastery Graveyard"
              },
              {
                "name": "Kirin Tor Scepter",
                "quality": "q3",
                "icon": "inv_mace_07.jpg",
                "stats": "2.10 Speed • +9 Int, +6 Sta, +8 Spell Power",
                "source": "City of Dalaran"
              }
            ]
          },
          "offHand": {
            "name": "Orb of the Forgotten Archmage",
            "quality": "q3",
            "icon": "inv_misc_orb_03.jpg",
            "stats": "+8 Int, +6 Sta, +12 Shadow Spell Damage",
            "enchant": "None",
            "source": "City of Dalaran",
            "alts": [
              {
                "name": "Orb of Soran",
                "quality": "q3",
                "icon": "inv_misc_orb_01.jpg",
                "stats": "+7 Int, +5 Spi",
                "source": "Shadowfang Keep"
              },
              {
                "name": "Tome of the Lost",
                "quality": "q3",
                "icon": "inv_misc_book_06.jpg",
                "stats": "+7 Int, +5 Sta, +6 Spell Power",
                "source": "City of Dalaran Vault"
              },
              {
                "name": "Skull of Impending Doom",
                "quality": "q2",
                "icon": "inv_misc_bone_skull_01.jpg",
                "stats": "Use: Increases run speed by 60%",
                "source": "Badlands Quest"
              }
            ]
          },
          "ranged": {
            "name": "Gravestone Scepter",
            "quality": "q3",
            "icon": "inv_wand_02.jpg",
            "stats": "29.0 DPS Shadow Dmg • +5 Int, +5 Spi",
            "enchant": "None",
            "source": "Blackfathom Villainy Quest",
            "alts": [
              {
                "name": "Cookie's Stirring Rod",
                "quality": "q3",
                "icon": "inv_wand_04.jpg",
                "stats": "18.5 DPS • +4 Int, +3 Sta",
                "source": "Deadmines"
              },
              {
                "name": "Kirin Tor Apprentice Wand",
                "quality": "q3",
                "icon": "inv_wand_06.jpg",
                "stats": "31.2 DPS Arcane • +6 Int, +4 Spell Power",
                "source": "City of Dalaran Boss"
              },
              {
                "name": "Petrified Bone Wand",
                "quality": "q3",
                "icon": "inv_wand_01.jpg",
                "stats": "28.5 DPS Nature • +5 Int, +4 Sta",
                "source": "Excavation Site 4"
              }
            ]
          }
        }
      }
    ]
  },
  "shaman": {
    "specs": [
      {
        "id": "enhancement-pve",
        "name": "Enhancement PvE",
        "role": "Melee Hybrid DPS",
        "icon": "https://render.worldofwarcraft.com/us/icons/56/spell_nature_lightningshield.jpg",
        "weaponType": "Two-Hand Mace / Axe (Windfury)",
        "statSummary": {
          "horde": {
            "hp": 1320,
            "mana": 1380,
            "armor": 1190,
            "str": 168,
            "agi": 122,
            "sta": 112,
            "int": 74,
            "ap": "+82 AP",
            "crit": "13.8%",
            "hit": "3%"
          }
        },
        "talents": {
          "points": "0 / 21 / 5",
          "summary": "Two-Handed Axes and Maces + Flurry (30% Haste) + Improved Ghost Wolf + Concussion",
          "buildCode": "FOREVER-SHAMAN-ENH-30-0-21-5",
          "trees": [
            {
              "name": "Elemental",
              "icon": "https://render.worldofwarcraft.com/us/icons/56/spell_nature_lightning.jpg",
              "points": 5,
              "talents": [
                {
                  "name": "Concussion",
                  "rank": "5/5",
                  "desc": "Increases damage done by Lightning and Shock spells by 5%."
                }
              ]
            },
            {
              "name": "Enhancement",
              "icon": "https://render.worldofwarcraft.com/us/icons/56/spell_nature_lightningshield.jpg",
              "points": 21,
              "talents": [
                {
                  "name": "Ancestral Knowledge",
                  "rank": "5/5",
                  "desc": "Increases maximum Mana by 5%."
                },
                {
                  "name": "Thundering Strikes",
                  "rank": "5/5",
                  "desc": "Increases critical strike chance with melee weapons by 5%."
                },
                {
                  "name": "Improved Ghost Wolf",
                  "rank": "2/2",
                  "desc": "Reduces cast time of Ghost Wolf by 2 sec (Instant in Forever!)."
                },
                {
                  "name": "Two-Handed Axes and Maces",
                  "rank": "1/1",
                  "desc": "Allows 2H Axes and Two-Handed Maces to be used."
                },
                {
                  "name": "Flurry",
                  "rank": "5/5",
                  "desc": "Increases attack speed by 30% for your next 3 swings after a critical hit."
                },
                {
                  "name": "Lava Lash",
                  "rank": "3/3",
                  "isNew": true,
                  "desc": "Classic+ Strike: Charges offhand weapon with lava to deal instant fire weapon damage."
                }
              ]
            },
            {
              "name": "Restoration",
              "icon": "https://render.worldofwarcraft.com/us/icons/56/spell_nature_magicimmunity.jpg",
              "points": 0,
              "talents": []
            }
          ]
        },
        "gear": {
          "head": {
            "name": "Infiltrator Cap of the Tiger",
            "quality": "q2",
            "icon": "inv_helmet_15.jpg",
            "stats": "+8 Str, +8 Agi",
            "enchant": "Lesser Arcanum of Voracity (+8 Str)",
            "source": "World Drop",
            "alts": [
              {
                "name": "Tusken Helm",
                "quality": "q3",
                "icon": "inv_helmet_09.jpg",
                "stats": "+15 Sta, +7 Agi",
                "source": "Razorfen Kraul"
              },
              {
                "name": "Green Tinted Goggles",
                "quality": "q2",
                "icon": "inv_gizmo_01.jpg",
                "stats": "+8 Sta, +8 Agi",
                "source": "Engineering (150)"
              },
              {
                "name": "Veteran's Silvered Chain Helm",
                "quality": "q3",
                "icon": "inv_helmet_39.jpg",
                "stats": "+10 Str, +8 Sta, +1% Crit",
                "source": "Blacksmithing (130)"
              }
            ]
          },
          "neck": {
            "name": "Ghostshard Talisman",
            "quality": "q3",
            "icon": "inv_jewelry_necklace_06.jpg",
            "stats": "+11 Sta, +4 Str",
            "enchant": "None",
            "source": "Scarlet Monastery Graveyard",
            "alts": [
              {
                "name": "Archmagister's Faceted Pendant",
                "quality": "q3",
                "icon": "inv_misc_necklacea8.jpg",
                "stats": "+6 Int, +12 AP",
                "source": "City of Dalaran"
              },
              {
                "name": "Mark of the Pack Leader",
                "quality": "q3",
                "icon": "inv_jewelry_necklace_04.jpg",
                "stats": "+8 Agi, +6 Sta",
                "source": "The Barrens Rare / Quest"
              },
              {
                "name": "Fossilized Amber Pendant",
                "quality": "q3",
                "icon": "inv_jewelry_necklace_12.jpg",
                "stats": "+7 Agi, +5 Sta, +4 Str",
                "source": "Excavation Site 4 Boss"
              }
            ]
          },
          "shoulder": {
            "name": "Brigand's Pauldrons",
            "quality": "q2",
            "icon": "inv_shoulder_03.jpg",
            "stats": "+8 Str, +6 Sta",
            "enchant": "None",
            "source": "Quest: Taretha's Gift (Horde)",
            "alts": [
              {
                "name": "Forest Tracker Epaulets",
                "quality": "q3",
                "icon": "inv_shoulder_18.jpg",
                "stats": "+11 Agi, +5 Str",
                "source": "World Drop"
              },
              {
                "name": "Cutthroat's Mantle of the Tiger",
                "quality": "q2",
                "icon": "inv_shoulder_11.jpg",
                "stats": "+7 Str, +7 Agi",
                "source": "World Drop"
              },
              {
                "name": "Barbaric Shoulders",
                "quality": "q2",
                "icon": "inv_shoulder_08.jpg",
                "stats": "+7 Str, +6 Sta",
                "source": "Leatherworking (175)"
              }
            ]
          },
          "back": {
            "name": "Crocolisk Skin Gaiter",
            "quality": "q3",
            "icon": "inv_misc_monsterscales_02.jpg",
            "stats": "+6 Str, +6 Sta, +5 Agi",
            "enchant": "Lesser Agility (+3 Agi)",
            "source": "Excavation Site 4",
            "alts": [
              {
                "name": "Hawkeye's Cloak",
                "quality": "q2",
                "icon": "inv_misc_cape_03.jpg",
                "stats": "+8 Agi, +3 Sta",
                "source": "World Drop"
              },
              {
                "name": "Batwing Cloak",
                "quality": "q3",
                "icon": "inv_misc_cape_06.jpg",
                "stats": "+5 Agi, +7 Sta",
                "source": "Razorfen Kraul"
              },
              {
                "name": "Drape of Shifting Energy",
                "quality": "q3",
                "icon": "inv_misc_cape_18.jpg",
                "stats": "+7 Sta, +6 Str",
                "source": "City of Dalaran"
              }
            ]
          },
          "chest": {
            "name": "Veteran's Silvered Chain Shirt",
            "quality": "q3",
            "icon": "inv_chest_chain_07.jpg",
            "stats": "+12 Str, +10 Sta, +8 Agi",
            "enchant": "Greater Health (+35 HP)",
            "source": "Blacksmithing (110)",
            "alts": [
              {
                "name": "Avenger's Armor",
                "quality": "q3",
                "icon": "inv_chest_chain.jpg",
                "stats": "+15 Str, +7 Sta",
                "source": "Razorfen Kraul"
              },
              {
                "name": "Shining Silver Breastplate",
                "quality": "q3",
                "icon": "inv_chest_plate15.jpg",
                "stats": "+14 Str, +8 Sta",
                "source": "Blacksmithing (145)"
              },
              {
                "name": "Mana-Warped Chain Shirt",
                "quality": "q3",
                "icon": "inv_chest_chain_04.jpg",
                "stats": "+13 Str, +9 Sta",
                "source": "City of Dalaran"
              }
            ]
          },
          "wrist": {
            "name": "Pugilist Bracers",
            "quality": "q3",
            "icon": "inv_bracer_03.jpg",
            "stats": "+7 Sta, +4 Agi, +3 Str",
            "enchant": "Lesser Strength (+5 Str)",
            "source": "Razorfen Kraul",
            "alts": [
              {
                "name": "Unearthed Bands of the Tiger",
                "quality": "q3",
                "icon": "inv_bracer_06.jpg",
                "stats": "+7 Str, +7 Agi",
                "source": "World Drop"
              },
              {
                "name": "Arathi Armbands",
                "quality": "q2",
                "icon": "inv_bracer_09.jpg",
                "stats": "+7 Str, +4 Sta",
                "source": "Arathi Quest"
              },
              {
                "name": "Hawkeye's Bracers",
                "quality": "q2",
                "icon": "inv_bracer_04.jpg",
                "stats": "+6 Agi, +3 Sta",
                "source": "World Drop"
              }
            ]
          },
          "hands": {
            "name": "Tiger Hunter Gloves",
            "quality": "q2",
            "icon": "inv_gauntlets_04.jpg",
            "stats": "+9 Str, +8 Agi",
            "enchant": "Strength (+7 Str)",
            "source": "Tiger Mastery Quest",
            "alts": [
              {
                "name": "Algae Fists",
                "quality": "q3",
                "icon": "inv_gauntlets_22.jpg",
                "stats": "+10 Str, +8 Sta",
                "source": "Blackfathom Deeps"
              },
              {
                "name": "True-Aim Stalkers",
                "quality": "q3",
                "icon": "inv_gauntlets_28.jpg",
                "stats": "+9 Agi, +6 Sta, +1% Hit",
                "source": "Excavation Site 4 Boss"
              },
              {
                "name": "Veteran's Silvered Chain Gauntlets",
                "quality": "q3",
                "icon": "inv_gauntlets_16.jpg",
                "stats": "+9 Str, +7 Sta, +6 Agi",
                "source": "Blacksmithing (105)"
              }
            ]
          },
          "waist": {
            "name": "Officer's Belt",
            "quality": "q3",
            "icon": "inv_belt_20.jpg",
            "stats": "+12 Str, +6 Sta",
            "enchant": "None",
            "source": "PvP Rank 4 Honor Vendor",
            "alts": [
              {
                "name": "Cobrahn's Grasp",
                "quality": "q3",
                "icon": "inv_belt_12.jpg",
                "stats": "+8 Agi, +5 Sta, +5 Str",
                "source": "Wailing Caverns"
              },
              {
                "name": "Ogron's Sash",
                "quality": "q3",
                "icon": "inv_belt_03.jpg",
                "stats": "+10 Str, +6 Sta",
                "source": "World Drop"
              },
              {
                "name": "Veteran's Silvered Chain Girdle",
                "quality": "q3",
                "icon": "inv_belt_15.jpg",
                "stats": "+9 Str, +7 Sta",
                "source": "Blacksmithing (100)"
              }
            ]
          },
          "legs": {
            "name": "Veteran's Silvered Chain Leggings",
            "quality": "q3",
            "icon": "inv_pants_mail_05.jpg",
            "stats": "+14 Str, +11 Sta, +8 Agi",
            "enchant": "Attack Power +6 and Armor +24",
            "source": "Blacksmithing (120)",
            "alts": [
              {
                "name": "Triprunner Dungarees",
                "quality": "q3",
                "icon": "inv_pants_06.jpg",
                "stats": "+18 Agi, +4 Sta",
                "source": "Gnomeregan"
              },
              {
                "name": "Gryphon Rider's Leggings",
                "quality": "q3",
                "icon": "inv_pants_03.jpg",
                "stats": "+13 Str, +8 Sta",
                "source": "Excavation Site 4 Quest"
              },
              {
                "name": "Infiltrator Leggings of the Tiger",
                "quality": "q2",
                "icon": "inv_pants_08.jpg",
                "stats": "+10 Str, +10 Agi",
                "source": "World Drop"
              }
            ]
          },
          "feet": {
            "name": "Shapeshifting Sentinel's Strides",
            "quality": "q3",
            "icon": "inv_boots_chain_08.jpg",
            "stats": "+11 Str, +9 Agi, +7 Sta",
            "enchant": "Lesser Agility (+4 Agi)",
            "source": "Blackfathom Deeps",
            "alts": [
              {
                "name": "Excavator's Work Boots",
                "quality": "q3",
                "icon": "inv_boots_chain_06.jpg",
                "stats": "+8 Str, +8 Sta",
                "source": "Excavation Site 4"
              },
              {
                "name": "Trouncing Boots",
                "quality": "q2",
                "icon": "inv_boots_01.jpg",
                "stats": "+9 Str, +8 Agi",
                "source": "The Karnitol Shipwreck (Alliance)"
              },
              {
                "name": "Silvered Bronze Boots",
                "quality": "q2",
                "icon": "inv_boots_chain_03.jpg",
                "stats": "+7 Str, +5 Sta",
                "source": "Blacksmithing (130)"
              }
            ]
          },
          "finger1": {
            "name": "Wyvern Heart Band",
            "quality": "q3",
            "icon": "inv_jewelry_ring_25.jpg",
            "stats": "+7 Str, +6 Agi, +5 Sta",
            "enchant": "None",
            "source": "Harpy Matriarch / World Drop",
            "alts": [
              {
                "name": "Tigerstrike Signet",
                "quality": "q3",
                "icon": "inv_jewelry_ring_16.jpg",
                "stats": "+8 Str, +5 Agi",
                "source": "Stranglethorn Vale"
              },
              {
                "name": "Blackstone Ring",
                "quality": "q3",
                "icon": "inv_jewelry_ring_17.jpg",
                "stats": "+6 Str, +1% Hit",
                "source": "Princess Theradras, Maraudon"
              },
              {
                "name": "Savory Devourer Band",
                "quality": "q2",
                "icon": "inv_jewelry_ring_08.jpg",
                "stats": "+6 Str, +5 Sta",
                "source": "Excavation Site 4 Rare"
              }
            ]
          },
          "finger2": {
            "name": "Blackstone Ring",
            "quality": "q3",
            "icon": "inv_jewelry_ring_17.jpg",
            "stats": "+6 Str, +1% Hit",
            "enchant": "None",
            "source": "Princess Theradras, Maraudon",
            "alts": [
              {
                "name": "Savory Devourer Band",
                "quality": "q2",
                "icon": "inv_jewelry_ring_08.jpg",
                "stats": "+6 Str, +5 Sta",
                "source": "Excavation Site 4"
              },
              {
                "name": "Wyvern Heart Band",
                "quality": "q3",
                "icon": "inv_jewelry_ring_25.jpg",
                "stats": "+7 Str, +6 Agi, +5 Sta",
                "source": "Harpy Matriarch / World Drop"
              },
              {
                "name": "Tigerstrike Signet",
                "quality": "q3",
                "icon": "inv_jewelry_ring_16.jpg",
                "stats": "+8 Str, +5 Agi",
                "source": "King Bangalash, STV"
              }
            ]
          },
          "trinket1": {
            "name": "Minor Recombobulator",
            "quality": "q2",
            "icon": "inv_gizmo_07.jpg",
            "stats": "Restores HP/Mana, cures polymorph",
            "enchant": "None",
            "source": "Engineering",
            "alts": [
              {
                "name": "Insignia of the Alliance / Horde",
                "quality": "q3",
                "icon": "inv_jewelry_trinketpvp_01.jpg",
                "stats": "Use: Dispels fear, stun, and sleep",
                "source": "PvP Rank 2 Honor Vendor"
              },
              {
                "name": "Gyromatic Icemaker",
                "quality": "q2",
                "icon": "inv_gizmo_03.jpg",
                "stats": "Use: Blasts target with frost dealing damage",
                "source": "Engineering (145)"
              },
              {
                "name": "Rune of Duty",
                "quality": "q2",
                "icon": "inv_misc_rune_01.jpg",
                "stats": "+10 Stamina",
                "source": "Warsong Gulch Friendly Vendor"
              }
            ]
          },
          "trinket2": {
            "name": "Insignia of the Horde",
            "quality": "q3",
            "icon": "inv_jewelry_trinketpvp_02.jpg",
            "stats": "CC Break",
            "enchant": "None",
            "source": "PvP Vendor",
            "alts": [
              {
                "name": "Dog Whistle",
                "quality": "q3",
                "icon": "ability_hunter_beastcall.jpg",
                "stats": "Use: Summons a tracking battle hound (10 min)",
                "source": "Houndmaster Loksey, SM Graveyard"
              },
              {
                "name": "Smolderweb Eye",
                "quality": "q3",
                "icon": "inv_misc_gem_pearl_04.jpg",
                "stats": "Use: Shoots a web immobilizing target for 5 sec",
                "source": "LBRS Rare / World Quest"
              },
              {
                "name": "Insignia of the Alliance / Horde",
                "quality": "q3",
                "icon": "inv_jewelry_trinketpvp_01.jpg",
                "stats": "Use: Dispels fear, stun, and sleep",
                "source": "PvP Rank 2 Honor Vendor"
              }
            ]
          },
          "mainHand": {
            "name": "Corpsemaker",
            "quality": "q3",
            "icon": "inv_axe_14.jpg",
            "stats": "3.80 Speed • 92-139 Dmg (30.4 DPS) • +15 Str, +8 Sta",
            "enchant": "Weapon Damage +6",
            "source": "Overlord Ramtusk, Razorfen Kraul",
            "alts": [
              {
                "name": "Manual Crowd Pummeler",
                "quality": "q3",
                "icon": "inv_mace_14.jpg",
                "stats": "2.00 Speed • 50% Attack Speed Proc",
                "source": "Gnomeregan"
              },
              {
                "name": "Archon Greatsword",
                "quality": "q3",
                "icon": "inv_sword_33.jpg",
                "stats": "3.40 Speed • +13 Str, +12 Agi",
                "source": "City of Dalaran"
              }
            ]
          },
          "offHand": {
            "name": "Two-Handed Grip",
            "quality": "q1",
            "icon": "inv_misc_questionmark.jpg",
            "stats": "Held by Two-Hander",
            "enchant": "None",
            "source": "Equipped in Two Hands",
            "alts": [
              {
                "name": "Cruel Barb",
                "quality": "q3",
                "icon": "inv_sword_19.jpg",
                "stats": "2.80 Speed • 18.2 DPS • +12 AP",
                "source": "Edwin VanCleef, Deadmines"
              },
              {
                "name": "Tail Spike",
                "quality": "q3",
                "icon": "inv_sword_25.jpg",
                "stats": "1.70 Fast Speed • 18.0 DPS • +5 Agi, +3 Sta",
                "source": "Razorfen Kraul"
              },
              {
                "name": "Toxic Revenger",
                "quality": "q3",
                "icon": "inv_weapon_shortblade_05.jpg",
                "stats": "2.70 Speed • 18.9 DPS • Chance on hit: Poison",
                "source": "Gnomeregan"
              }
            ]
          },
          "ranged": {
            "name": "Totem of the Earth Mother",
            "quality": "q3",
            "icon": "inv_misc_branch_01.jpg",
            "stats": "+14 Shock Spell Damage & +12 AP",
            "enchant": "None",
            "source": "Horde Shaman Quest / City of Dalaran",
            "alts": [
              {
                "name": "Master Hunter's Rifle",
                "quality": "q2",
                "icon": "inv_weapon_rifle_05.jpg",
                "stats": "+4 Agi, +3 Sta",
                "source": "Stranglethorn Vale Quest"
              },
              {
                "name": "Excavation Carbine",
                "quality": "q3",
                "icon": "inv_weapon_rifle_01.jpg",
                "stats": "+6 Agi, +4 Str",
                "source": "Excavation Site 4 Overseer"
              },
              {
                "name": "Nightstalker Bow",
                "quality": "q2",
                "icon": "inv_weapon_bow_08.jpg",
                "stats": "+5 Agi, +3 Sta",
                "source": "World Drop"
              }
            ]
          }
        }
      }
    ]
  },
  "druid": {
    "specs": [
      {
        "id": "feral-pve",
        "name": "Feral Cat PvE",
        "role": "Melee Physical DPS",
        "icon": "https://render.worldofwarcraft.com/us/icons/56/ability_racial_bearform.jpg",
        "weaponType": "Two-Hand Mace (Manual Crowd Pummeler)",
        "statSummary": {
          "alliance": {
            "hp": 1210,
            "energy": 100,
            "armor": 960,
            "agi": 174,
            "str": 132,
            "sta": 98,
            "ap": "+118 AP",
            "crit": "17.8%",
            "hit": "3%"
          },
          "horde": {
            "hp": 1230,
            "energy": 100,
            "armor": 960,
            "agi": 172,
            "str": 134,
            "sta": 100,
            "ap": "+120 AP",
            "crit": "17.6%",
            "hit": "3%"
          }
        },
        "talents": {
          "points": "0 / 21 / 5",
          "summary": "Sharpened Claws (+6% Crit) + Blood Frenzy + Faerie Fire (Feral) + Furor (Instant 40 energy shift)",
          "buildCode": "FOREVER-DRUID-FERAL-30-0-21-5",
          "trees": [
            {
              "name": "Balance",
              "icon": "https://render.worldofwarcraft.com/us/icons/56/spell_nature_starfall.jpg",
              "points": 0,
              "talents": []
            },
            {
              "name": "Feral Combat",
              "icon": "https://render.worldofwarcraft.com/us/icons/56/ability_racial_bearform.jpg",
              "points": 21,
              "talents": [
                {
                  "name": "Ferocity",
                  "rank": "5/5",
                  "desc": "Reduces cost of Maul, Swipe, Claw, and Rake by 5 Rage or Energy."
                },
                {
                  "name": "Feral Aggression",
                  "rank": "5/5",
                  "desc": "Increases Ferocious Bite damage by 15%."
                },
                {
                  "name": "Brutal Impact",
                  "rank": "2/2",
                  "desc": "Increases stun duration of Bash and Pounce by 1 sec."
                },
                {
                  "name": "Feral Charge",
                  "rank": "1/1",
                  "desc": "Causes you to charge an enemy, immobilizing them for 4 sec."
                },
                {
                  "name": "Sharpened Claws",
                  "rank": "3/3",
                  "desc": "Increases critical strike chance in Bear and Cat Forms by 6%."
                },
                {
                  "name": "Blood Frenzy",
                  "rank": "2/2",
                  "desc": "Critical strikes from Claw, Rake, and Shred add an additional combo point."
                },
                {
                  "name": "Faerie Fire (Feral)",
                  "rank": "1/1",
                  "desc": "Decreases armor of target and prevents stealth in Bear/Cat form."
                },
                {
                  "name": "Savage Roar",
                  "rank": "2/2",
                  "isNew": true,
                  "desc": "Classic+ Finisher: Increases physical damage dealt by 25% while in Cat Form."
                }
              ]
            },
            {
              "name": "Restoration",
              "icon": "https://render.worldofwarcraft.com/us/icons/56/spell_nature_healingtouch.jpg",
              "points": 5,
              "talents": [
                {
                  "name": "Furor",
                  "rank": "5/5",
                  "desc": "Gives a 100% chance to gain 10 Rage in Bear Form or 40 Energy in Cat Form when shapeshifting."
                }
              ]
            }
          ]
        },
        "gear": {
          "head": {
            "name": "Wolfshead Helm",
            "quality": "q3",
            "icon": "inv_helmet_01.jpg",
            "stats": "+10 Spi, +6 Sta • Equip: Gain 20 Energy / 5 Rage on shapeshift!",
            "enchant": "Lesser Arcanum of Voracity (+8 Agi)",
            "source": "Leatherworking (225 - Tribal / Crafted by Level 30 Spec)",
            "alts": [
              {
                "name": "Infiltrator Cap of the Tiger",
                "quality": "q2",
                "icon": "inv_helmet_15.jpg",
                "stats": "+8 Str, +8 Agi",
                "source": "World Drop"
              },
              {
                "name": "Tusken Helm",
                "quality": "q3",
                "icon": "inv_helmet_09.jpg",
                "stats": "+15 Sta, +7 Agi",
                "source": "Overlord Ramtusk, Razorfen Kraul"
              },
              {
                "name": "Green Tinted Goggles",
                "quality": "q2",
                "icon": "inv_gizmo_01.jpg",
                "stats": "+8 Sta, +8 Agi",
                "source": "Engineering (150)"
              }
            ]
          },
          "neck": {
            "name": "Ghostshard Talisman",
            "quality": "q3",
            "icon": "inv_jewelry_necklace_06.jpg",
            "stats": "+11 Sta, +4 Str",
            "enchant": "None",
            "source": "Scarlet Monastery Graveyard",
            "alts": [
              {
                "name": "Mark of the Pack Leader",
                "quality": "q3",
                "icon": "inv_jewelry_necklace_04.jpg",
                "stats": "+8 Agi, +6 Sta",
                "source": "The Barrens Rare"
              },
              {
                "name": "Fossilized Amber Pendant",
                "quality": "q3",
                "icon": "inv_jewelry_necklace_12.jpg",
                "stats": "+7 Agi, +5 Sta, +4 Str",
                "source": "Excavation Site 4 Boss"
              },
              {
                "name": "Thermaplugg Medal of Honor",
                "quality": "q3",
                "icon": "inv_jewelry_amulet_03.jpg",
                "stats": "+8 Sta, +7 Str",
                "source": "Mekgineer Thermaplugg, Gnomeregan"
              }
            ]
          },
          "shoulder": {
            "name": "Forest Tracker Epaulets",
            "quality": "q3",
            "icon": "inv_shoulder_18.jpg",
            "stats": "+11 Agi, +5 Str",
            "enchant": "None",
            "source": "World Drop",
            "alts": [
              {
                "name": "Cutthroat's Mantle of the Tiger",
                "quality": "q2",
                "icon": "inv_shoulder_11.jpg",
                "stats": "+7 Str, +7 Agi",
                "source": "World Drop"
              },
              {
                "name": "Barbaric Shoulders",
                "quality": "q2",
                "icon": "inv_shoulder_08.jpg",
                "stats": "+7 Str, +6 Sta",
                "source": "Leatherworking (175)"
              },
              {
                "name": "Mantle of Thieves",
                "quality": "q2",
                "icon": "inv_shoulder_07.jpg",
                "stats": "+10 Agi, +3 Sta",
                "source": "The Stockade / Dalaran Outskirts"
              }
            ]
          },
          "back": {
            "name": "Hawkeye's Cloak",
            "quality": "q2",
            "icon": "inv_misc_cape_03.jpg",
            "stats": "+8 Agi, +3 Sta",
            "enchant": "Lesser Agility (+3 Agi)",
            "source": "World Drop",
            "alts": [
              {
                "name": "Crocolisk Skin Gaiter",
                "quality": "q3",
                "icon": "inv_misc_monsterscales_02.jpg",
                "stats": "+6 Str, +6 Sta, +5 Agi",
                "source": "Excavation Site 4"
              },
              {
                "name": "Batwing Cloak",
                "quality": "q3",
                "icon": "inv_misc_cape_06.jpg",
                "stats": "+5 Agi, +7 Sta",
                "source": "Razorfen Kraul"
              },
              {
                "name": "Drape of Shifting Energy",
                "quality": "q3",
                "icon": "inv_misc_cape_18.jpg",
                "stats": "+7 Sta, +6 Str",
                "source": "City of Dalaran"
              }
            ]
          },
          "chest": {
            "name": "Infiltrator Armor of the Tiger",
            "quality": "q2",
            "icon": "inv_chest_leather_03.jpg",
            "stats": "+11 Str, +11 Agi",
            "enchant": "Greater Health (+35 HP)",
            "source": "World Drop",
            "alts": [
              {
                "name": "Tunic of Westfall",
                "quality": "q3",
                "icon": "inv_chest_cloth_05.jpg",
                "stats": "+11 Agi, +5 Sta",
                "source": "Deadmines Quest"
              },
              {
                "name": "Toughened Leather Armor",
                "quality": "q2",
                "icon": "inv_chest_leather_08.jpg",
                "stats": "+15 Agi, +5 Sta",
                "source": "Leatherworking (155)"
              },
              {
                "name": "Black Whelp Tunic",
                "quality": "q2",
                "icon": "inv_chest_leather_04.jpg",
                "stats": "+8 Agi, +8 Sta, +6 Str",
                "source": "Redridge Rare / AH"
              }
            ]
          },
          "wrist": {
            "name": "Unearthed Bands of the Tiger",
            "quality": "q3",
            "icon": "inv_bracer_06.jpg",
            "stats": "+7 Str, +7 Agi",
            "enchant": "Lesser Agility (+3 Agi)",
            "source": "Uldaman / World Drop",
            "alts": [
              {
                "name": "Hawkeye's Bracers",
                "quality": "q2",
                "icon": "inv_bracer_04.jpg",
                "stats": "+6 Agi, +3 Sta",
                "source": "World Drop"
              },
              {
                "name": "Pugilist Bracers",
                "quality": "q3",
                "icon": "inv_bracer_03.jpg",
                "stats": "+7 Sta, +4 Agi, +3 Str",
                "source": "Razorfen Kraul Trash"
              },
              {
                "name": "Arathi Armbands",
                "quality": "q2",
                "icon": "inv_bracer_09.jpg",
                "stats": "+7 Str, +4 Sta",
                "source": "Arathi Quest"
              }
            ]
          },
          "hands": {
            "name": "True-Aim Stalkers",
            "quality": "q3",
            "icon": "inv_gauntlets_28.jpg",
            "stats": "+9 Agi, +6 Sta, +1% Hit",
            "enchant": "Lesser Agility (+5 Agi)",
            "source": "Excavation Site 4 Boss",
            "alts": [
              {
                "name": "Tiger Hunter Gloves",
                "quality": "q2",
                "icon": "inv_gauntlets_04.jpg",
                "stats": "+9 Str, +8 Agi",
                "source": "Tiger Mastery"
              },
              {
                "name": "Algae Fists",
                "quality": "q3",
                "icon": "inv_gauntlets_22.jpg",
                "stats": "+10 Str, +8 Sta",
                "source": "Gelihast, Blackfathom Deeps"
              },
              {
                "name": "Veteran's Silvered Chain Gauntlets",
                "quality": "q3",
                "icon": "inv_gauntlets_16.jpg",
                "stats": "+9 Str, +7 Sta, +6 Agi",
                "source": "Blacksmithing (105)"
              }
            ]
          },
          "waist": {
            "name": "Cobrahn's Grasp",
            "quality": "q3",
            "icon": "inv_belt_12.jpg",
            "stats": "+8 Agi, +5 Sta, +5 Str",
            "enchant": "None",
            "source": "Wailing Caverns",
            "alts": [
              {
                "name": "Officer's Belt",
                "quality": "q3",
                "icon": "inv_belt_20.jpg",
                "stats": "+12 Str, +6 Sta",
                "source": "PvP Vendor"
              },
              {
                "name": "Ogron's Sash",
                "quality": "q3",
                "icon": "inv_belt_03.jpg",
                "stats": "+10 Str, +6 Sta",
                "source": "World Drop"
              },
              {
                "name": "Veteran's Silvered Chain Girdle",
                "quality": "q3",
                "icon": "inv_belt_15.jpg",
                "stats": "+9 Str, +7 Sta",
                "source": "Blacksmithing (100)"
              }
            ]
          },
          "legs": {
            "name": "Triprunner Dungarees",
            "quality": "q3",
            "icon": "inv_pants_06.jpg",
            "stats": "+18 Agi, +4 Sta",
            "enchant": "Lesser Agility (+8 Agi)",
            "source": "Gnomeregan Quest",
            "alts": [
              {
                "name": "Infiltrator Leggings of the Tiger",
                "quality": "q2",
                "icon": "inv_pants_08.jpg",
                "stats": "+10 Str, +10 Agi",
                "source": "World Drop"
              },
              {
                "name": "Gryphon Rider's Leggings",
                "quality": "q3",
                "icon": "inv_pants_03.jpg",
                "stats": "+13 Str, +8 Sta",
                "source": "Excavation Site 4 Quest"
              },
              {
                "name": "Barbaric Leggings",
                "quality": "q2",
                "icon": "inv_pants_07.jpg",
                "stats": "+11 Agi, +6 Str",
                "source": "Leatherworking (175)"
              }
            ]
          },
          "feet": {
            "name": "Trouncing Boots",
            "quality": "q2",
            "icon": "inv_boots_01.jpg",
            "stats": "+9 Str, +8 Agi",
            "enchant": "Minor Speed (+8% Movement)",
            "source": "Alliance Quest / Shapeshifting Sentinel's Strides (Horde)",
            "alts": [
              {
                "name": "Excavator's Work Boots",
                "quality": "q3",
                "icon": "inv_boots_chain_06.jpg",
                "stats": "+8 Str, +8 Sta",
                "source": "Excavation Site 4"
              },
              {
                "name": "Shapeshifting Sentinel's Strides",
                "quality": "q3",
                "icon": "inv_boots_chain_08.jpg",
                "stats": "+11 Str, +9 Agi, +7 Sta",
                "source": "Blackfathom Deeps (Horde)"
              },
              {
                "name": "Silvered Bronze Boots",
                "quality": "q2",
                "icon": "inv_boots_chain_03.jpg",
                "stats": "+7 Str, +5 Sta",
                "source": "Blacksmithing (130)"
              }
            ]
          },
          "finger1": {
            "name": "Wyvern Heart Band",
            "quality": "q3",
            "icon": "inv_jewelry_ring_25.jpg",
            "stats": "+7 Str, +6 Agi, +5 Sta",
            "enchant": "None",
            "source": "Harpy Matriarch / World Drop",
            "alts": [
              {
                "name": "Tigerstrike Signet",
                "quality": "q3",
                "icon": "inv_jewelry_ring_16.jpg",
                "stats": "+8 Str, +5 Agi",
                "source": "Stranglethorn Vale"
              },
              {
                "name": "Blackstone Ring",
                "quality": "q3",
                "icon": "inv_jewelry_ring_17.jpg",
                "stats": "+6 Str, +1% Hit",
                "source": "Princess Theradras, Maraudon"
              },
              {
                "name": "Savory Devourer Band",
                "quality": "q2",
                "icon": "inv_jewelry_ring_08.jpg",
                "stats": "+6 Str, +5 Sta",
                "source": "Excavation Site 4 Rare"
              }
            ]
          },
          "finger2": {
            "name": "Blackstone Ring",
            "quality": "q3",
            "icon": "inv_jewelry_ring_17.jpg",
            "stats": "+6 Str, +1% Hit",
            "enchant": "None",
            "source": "Princess Theradras, Maraudon",
            "alts": [
              {
                "name": "Seal of Wrynn",
                "quality": "q3",
                "icon": "inv_jewelry_ring_12.jpg",
                "stats": "+4 Agi, +4 Sta",
                "source": "Alliance Quest"
              },
              {
                "name": "Wyvern Heart Band",
                "quality": "q3",
                "icon": "inv_jewelry_ring_25.jpg",
                "stats": "+7 Str, +6 Agi, +5 Sta",
                "source": "Harpy Matriarch / World Drop"
              },
              {
                "name": "Tigerstrike Signet",
                "quality": "q3",
                "icon": "inv_jewelry_ring_16.jpg",
                "stats": "+8 Str, +5 Agi",
                "source": "King Bangalash, STV"
              }
            ]
          },
          "trinket1": {
            "name": "Minor Recombobulator",
            "quality": "q2",
            "icon": "inv_gizmo_07.jpg",
            "stats": "Restores HP/Mana, cures polymorph",
            "enchant": "None",
            "source": "Engineering",
            "alts": [
              {
                "name": "Insignia of the Alliance / Horde",
                "quality": "q3",
                "icon": "inv_jewelry_trinketpvp_01.jpg",
                "stats": "Use: Dispels fear, stun, and sleep",
                "source": "PvP Rank 2 Honor Vendor"
              },
              {
                "name": "Gyromatic Icemaker",
                "quality": "q2",
                "icon": "inv_gizmo_03.jpg",
                "stats": "Use: Blasts target with frost dealing damage",
                "source": "Engineering (145)"
              },
              {
                "name": "Rune of Duty",
                "quality": "q2",
                "icon": "inv_misc_rune_01.jpg",
                "stats": "+10 Stamina",
                "source": "Warsong Gulch Friendly Vendor"
              }
            ]
          },
          "trinket2": {
            "name": "Dog Whistle",
            "quality": "q3",
            "icon": "ability_hunter_beastcall.jpg",
            "stats": "Summons a fighting dog",
            "enchant": "None",
            "source": "Scarlet Monastery Graveyard",
            "alts": [
              {
                "name": "Smolderweb Eye",
                "quality": "q3",
                "icon": "inv_misc_gem_pearl_04.jpg",
                "stats": "Use: Shoots a web immobilizing target for 5 sec",
                "source": "LBRS Rare / World Quest"
              },
              {
                "name": "Insignia of the Alliance / Horde",
                "quality": "q3",
                "icon": "inv_jewelry_trinketpvp_01.jpg",
                "stats": "Use: Dispels fear, stun, and sleep",
                "source": "PvP Rank 2 Honor Vendor"
              },
              {
                "name": "Minor Recombobulator",
                "quality": "q2",
                "icon": "inv_gizmo_07.jpg",
                "stats": "Use: Restores HP/Mana, cures polymorph",
                "source": "Engineering (140)"
              }
            ]
          },
          "mainHand": {
            "name": "Manual Crowd Pummeler",
            "quality": "q3",
            "icon": "inv_mace_14.jpg",
            "stats": "2.00 Speed • Use: Increases attack speed by 50% for 30 sec (3 Charges)",
            "enchant": "Lesser Agility (+5 Agi)",
            "source": "Crowd Pummeler 9-60, Gnomeregan",
            "alts": [
              {
                "name": "Corpsemaker",
                "quality": "q3",
                "icon": "inv_axe_14.jpg",
                "stats": "3.80 Speed • +15 Str, +8 Sta",
                "source": "Razorfen Kraul"
              },
              {
                "name": "Cruel Barb",
                "quality": "q3",
                "icon": "inv_sword_19.jpg",
                "stats": "2.80 Speed • 18.2 DPS • +12 AP",
                "source": "Edwin VanCleef, Deadmines"
              },
              {
                "name": "Scin-Rending Cleaver",
                "quality": "q3",
                "icon": "inv_axe_04.jpg",
                "stats": "2.50 Speed • 18.5 DPS • +7 Str, +4 Sta",
                "source": "Excavation Site 4 Boss"
              }
            ]
          },
          "offHand": {
            "name": "Two-Handed Grip",
            "quality": "q1",
            "icon": "inv_misc_questionmark.jpg",
            "stats": "Held by Two-Hander",
            "enchant": "None",
            "source": "Equipped in Two Hands",
            "alts": [
              {
                "name": "Cruel Barb",
                "quality": "q3",
                "icon": "inv_sword_19.jpg",
                "stats": "2.80 Speed • 18.2 DPS • +12 AP",
                "source": "Edwin VanCleef, Deadmines"
              },
              {
                "name": "Tail Spike",
                "quality": "q3",
                "icon": "inv_sword_25.jpg",
                "stats": "1.70 Fast Speed • 18.0 DPS • +5 Agi, +3 Sta",
                "source": "Razorfen Kraul"
              },
              {
                "name": "Toxic Revenger",
                "quality": "q3",
                "icon": "inv_weapon_shortblade_05.jpg",
                "stats": "2.70 Speed • 18.9 DPS • Chance on hit: Poison",
                "source": "Gnomeregan"
              }
            ]
          },
          "ranged": {
            "name": "Idol of the Wild Heart",
            "quality": "q3",
            "icon": "inv_misc_horn_01.jpg",
            "stats": "+15 Attack Power in Cat and Bear Form",
            "enchant": "None",
            "source": "City of Dalaran Secret Druid Cache",
            "alts": [
              {
                "name": "Master Hunter's Rifle",
                "quality": "q2",
                "icon": "inv_weapon_rifle_05.jpg",
                "stats": "+4 Agi, +3 Sta",
                "source": "Stranglethorn Vale Quest"
              },
              {
                "name": "Excavation Carbine",
                "quality": "q3",
                "icon": "inv_weapon_rifle_01.jpg",
                "stats": "+6 Agi, +4 Str",
                "source": "Excavation Site 4 Overseer"
              },
              {
                "name": "Nightstalker Bow",
                "quality": "q2",
                "icon": "inv_weapon_bow_08.jpg",
                "stats": "+5 Agi, +3 Sta",
                "source": "World Drop"
              }
            ]
          }
        }
      }
    ]
  }
};

if (typeof window !== 'undefined') {
  window.WOW_BIS_METADATA = WOW_BIS_METADATA;
  window.WOW_BIS_DATA = WOW_BIS_DATA;
}
