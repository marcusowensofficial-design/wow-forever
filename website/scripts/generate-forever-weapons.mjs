import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');

const weaponsData = {
  warrior: {
    classId: 'warrior',
    tracks: [
      { id: 'primary', name: 'Two-Handed Path (Arms / Fury)' }
    ],
    levels: [
      {
        levelBracket: '1–2',
        itemId: 2488,
        name: 'Crude Battle Axe',
        icon: 'inv_axe_04',
        weaponType: 'Two-handed axe',
        speed: '2.80',
        dps: '2.0 DPS',
        source: { kind: 'vendor', title: 'Weapon Vendor', detail: 'Purchased in starting zones (Coldridge, Northshire, Valley of Trials)' },
        alts: [
          { name: 'Club', itemId: 2491, value: '1.8 DPS - Starter vendor mace' },
          { name: 'Worn Shortsword', itemId: 25, value: '1.7 DPS - Starter 1H sword' }
        ]
      },
      {
        levelBracket: '3–4',
        itemId: 2493,
        name: 'Wooden Mallet',
        icon: 'inv_hammer_18',
        weaponType: 'Two-handed mace',
        speed: '2.60',
        dps: '5.0 DPS',
        source: { kind: 'vendor', title: 'Weapon Vendor', detail: 'Sold in starter hub towns (Kharanos, Goldshire, Razor Hill)' },
        alts: [
          { name: 'Large Club', itemId: 2492, value: '3.8 DPS - Early vendor 2H mace' },
          { name: 'Copper Axe', itemId: 2845, value: '3.8 DPS - Crafted Blacksmithing (skill 20)' }
        ]
      },
      {
        levelBracket: '5–6',
        itemId: 7955,
        name: 'Copper Claymore',
        icon: 'inv_sword_24',
        weaponType: 'Two-handed sword',
        speed: '3.30',
        dps: '7.7 DPS',
        source: { kind: 'craft', title: 'Blacksmithing (25)', detail: 'Crafted or bought cheaply on the Auction House' },
        alts: [
          { name: 'Copper Battle Axe', itemId: 3488, value: '9.0 DPS, 3.50s - Crafted Blacksmithing (30)' },
          { name: 'Rough Boomstick', itemId: 4362, value: '4.1 DPS - Engineering ranged pulling gun' }
        ]
      },
      {
        levelBracket: '7–8',
        itemId: 248005,
        name: 'Northshire Hammer',
        icon: 'inv_hammer_20',
        weaponType: 'Two-handed mace',
        speed: '2.70',
        dps: '8.3 DPS',
        source: { kind: 'quest', title: 'Rare Books / Kobold Camp', detail: 'Early quest in Elwynn Forest / Dun Morogh' },
        alts: [
          { name: 'Copper Battle Axe', itemId: 3488, value: '9.0 DPS, 3.50s - Heavy burst swing' },
          { name: 'Staff of the Dor\'Danil', itemId: 15396, value: '8.5 DPS - Teldrassil quest reward' }
        ]
      },
      {
        levelBracket: '9–10',
        itemId: 1197,
        name: 'Giant Mace',
        icon: 'inv_mace_01',
        weaponType: 'Two-handed mace',
        speed: '3.50',
        dps: '9.0 DPS',
        source: { kind: 'vendor', title: 'Weapon Vendor', detail: 'Sold in Redridge, Loch Modan, Crossroads, and Auberdine' },
        alts: [
          { name: 'Trogg Scepter', itemId: 272996, value: '8.1 DPS, 2.40s - Ragefire Chasm: Oggleflint' },
          { name: 'Thick War Axe', itemId: 3489, value: '8.6 DPS - 1H Axe from Blacksmithing (45)' }
        ]
      },
      {
        levelBracket: '11–12',
        itemId: 6214,
        name: 'Heavy Copper Maul',
        icon: 'inv_hammer_14',
        weaponType: 'Two-handed mace',
        speed: '3.30',
        dps: '10.8 DPS',
        source: { kind: 'craft', title: 'Blacksmithing (40)', detail: 'Guaranteed crafted spike, trainer taught at 40' },
        alts: [
          { name: 'Woodchopper', itemId: 2520, value: '10.5 DPS - Vendor 2H Axe' },
          { name: 'Trogg Scepter', itemId: 272996, value: '8.1 DPS - RFC: Oggleflint' }
        ]
      },
      {
        levelBracket: '13–14',
        itemId: 279895,
        name: 'Ironforge Greathammer',
        icon: 'inv_hammer_04',
        weaponType: 'Two-handed mace',
        speed: '3.10',
        dps: '16.0 DPS',
        source: { kind: 'quest', title: 'Old Ironforge Incursion', detail: 'Dungeon quest, The Hall of Thanes, level 16' },
        alts: [
          { name: "Durgen's Crescent Axe", itemId: 270227, value: '15.5 DPS, 2.40s, +5 Str, +2 Sta - Hall of Thanes: Durgen' },
          { name: 'Heavy Copper Broadsword', itemId: 3487, value: '12.6 DPS - Crafted Blacksmithing (skill 65)' }
        ]
      },
      {
        levelBracket: '15–16',
        itemId: 5187,
        name: "Rhahk'Zor's Hammer",
        icon: 'inv_hammer_20',
        weaponType: 'Two-handed mace',
        speed: '3.20',
        dps: '18.4 DPS',
        source: { kind: 'dungeon', title: "Rhahk'Zor", detail: 'First boss in The Deadmines, levels 18–23' },
        alts: [
          { name: 'Monstrous Cleaver', itemId: 279890, value: '17.5 DPS, 3.20s - Ruins of Lordaeron Quest: Abominable Creatures' },
          { name: 'Meathook Slicer', itemId: 271101, value: '13.2 DPS - Ruins of Lordaeron: The Baron' }
        ]
      },
      {
        levelBracket: '17–18',
        itemId: 271104,
        name: 'Corpse Chopper',
        icon: 'inv_axe_19',
        weaponType: 'Two-handed axe',
        speed: '3.20',
        dps: '17.4 DPS',
        source: { kind: 'dungeon', title: 'Bjork', detail: 'Ruins of Lordaeron, levels 15–20 (+7 Str, +4 Sta)' },
        alts: [
          { name: "Smite's Mighty Hammer", itemId: 7230, value: '19.7 DPS, 3.50s - The Deadmines: Mr. Smite' },
          { name: 'Haunting Blade', itemId: 271107, value: '18.2 DPS, 3.00s, +6 Str, +5 Sta - Ruins of Lordaeron: Captain' },
          { name: 'Vileblood Scimitar', itemId: 271106, value: '15.0 DPS, 2.20s - Ruins of Lordaeron: Viktor the Vile' }
        ]
      },
      {
        levelBracket: '19–20',
        itemId: 279891,
        name: 'Forsaken Greataxe',
        icon: 'inv_axe_11',
        weaponType: 'Two-handed axe',
        speed: '3.40',
        dps: '20.5 DPS',
        source: { kind: 'quest', title: 'The Wrath of Rath\'mael', detail: 'Ruins of Lordaeron dungeon quest (+8 Str, +5 Sta)' },
        alts: [
          { name: 'Bronze Warhammer', itemId: 7956, value: '17.4 DPS - Blacksmithing (90)' },
          { name: 'Taskmaster Axe', itemId: 5194, value: '17.3 DPS, 2.70s - The Deadmines: Sneed' }
        ]
      },
      {
        levelBracket: '21–22',
        itemId: 6905,
        name: 'Reef Axe',
        icon: 'inv_axe_08',
        weaponType: 'Two-handed axe',
        speed: '3.30',
        dps: '22.4 DPS',
        source: { kind: 'dungeon', title: 'Gelihast', detail: 'Blackfathom Deeps, levels 20–27 (+10 Str, +4 Agi)' },
        alts: [
          { name: 'Strike of the Hydra', itemId: 6909, value: '25.6 DPS, 3.30s - BFD: Aku\'mai' },
          { name: 'Taurenbane\'s Family Cleaver', itemId: 285328, value: '22.9 DPS, 3.40s, +9 Sta, +32 AP - Barrens Rare: Hagg Taurenbane' },
          { name: 'Bronze Battle Axe', itemId: 7958, value: '18.8 DPS - Crafted Blacksmithing (105)' }
        ]
      },
      {
        levelBracket: '23–24',
        itemId: 285328,
        name: "Taurenbane's Family Cleaver",
        icon: 'inv_axe_16',
        weaponType: 'Two-handed axe',
        speed: '3.40',
        dps: '22.9 DPS',
        source: { kind: 'drop', title: 'Hagg Taurenbane', detail: 'Barrens Rare Elite (+9 Sta, +32 AP vs Humanoids)' },
        alts: [
          { name: 'Strike of the Hydra', itemId: 6909, value: '25.6 DPS, 3.30s - BFD: Aku\'mai' },
          { name: 'Heavy Mithril Axe', itemId: 3854, value: '20.5 DPS - Blacksmithing (130)' }
        ]
      },
      {
        levelBracket: '25–26',
        itemId: 271766,
        name: 'Heavehammer',
        icon: 'inv_hammer_15',
        weaponType: 'Two-handed mace',
        speed: '3.30',
        dps: '27.7 DPS',
        source: { kind: 'quest', title: 'Lost Relic Carry / Elder Knowledge', detail: 'Excavation Site 4 dungeon quest (+60 Armor, +32 AP)' },
        alts: [
          { name: 'Trusty Sword', itemId: 281313, value: '26.7 DPS, 3.30s, +12 Sta, +12 Spi - Wetlands Quest: Stopping the Cycle' },
          { name: "Dendweller's Hammer", itemId: 284459, value: '25.6 DPS, 3.30s - Level 26 Mace' },
          { name: 'Solid Iron Maul', itemId: 3851, value: '22.8 DPS - Blacksmithing (135)' }
        ]
      },
      {
        levelBracket: '27–28',
        itemId: 273046,
        name: "Guardian's Dualblade",
        icon: 'inv_axe_06',
        weaponType: 'Two-handed axe',
        speed: '3.40',
        dps: '24.6 DPS',
        source: { kind: 'dungeon', title: 'Unstable Sentinel', detail: 'City of Dalaran dungeon (+11 Str, +8 Sta)' },
        alts: [
          { name: 'Felbough Arm', itemId: 273037, value: '28.8 DPS, 3.00s, +10 Agi, +10 Hit - City of Dalaran: Fel Ancient' },
          { name: 'Defender of Dalaran', itemId: 279841, value: '31.2 DPS, 3.30s - City of Dalaran Quest: Heart of Disruption' }
        ]
      },
      {
        levelBracket: '29–30',
        itemId: 6975,
        name: 'Whirlwind Axe',
        icon: 'inv_axe_12',
        weaponType: 'Two-handed axe',
        speed: '3.60',
        dps: '35.6 DPS',
        source: { kind: 'quest', title: 'Whirlwind Weapon', detail: 'Level 30 Warrior class quest in Arathi Highlands (+14 Str, +15 Sta)' },
        alts: [
          { name: 'Whirlwind Warhammer', itemId: 6976, value: '35.6 DPS, 3.60s - Mace alternative from class quest' },
          { name: 'Whirlwind Sword', itemId: 6977, value: '35.6 DPS, 3.60s - Sword alternative from class quest' },
          { name: 'Dark Hearted Hammer', itemId: 270071, value: '28.9 DPS, 3.80s, +12 Str, +8 Sta - STV Quest: Colonel Kurzen' },
          { name: "Master Hunter's Spellsword", itemId: 270085, value: '32.5 DPS, 2.40s - STV Quest: Big Game Hunter' },
          { name: 'Corpsemaker', itemId: 6687, value: '28.9 DPS, 3.80s - RFK: Overlord Ramtusk' }
        ]
      },
      {
        levelBracket: '31–36',
        itemId: 6687,
        name: 'Corpsemaker',
        icon: 'inv_weapon_halbard_01',
        weaponType: 'Two-handed axe',
        speed: '3.80',
        dps: '28.9 DPS',
        source: { kind: 'dungeon', title: 'Overlord Ramtusk', detail: 'Razorfen Kraul, levels 29–38 (+15 Str, +8 Sta)' },
        alts: [
          { name: 'Whirlwind Axe', itemId: 6975, value: '35.6 DPS, 3.60s - Class quest spike remains dominant' },
          { name: 'Manual Crowd Pummeler', itemId: 9449, value: '31.5 DPS, 2.00s - Gnomeregan: Crowd Pummeler 9-60' },
          { name: 'Mighty Iron Hammer', itemId: 3492, value: '25.0 DPS - Blacksmithing (145)' }
        ]
      },
      {
        levelBracket: '37–40',
        itemId: 7717,
        name: 'Ravager',
        icon: 'inv_axe_10',
        weaponType: 'Two-handed axe',
        speed: '3.50',
        dps: '37.3 DPS',
        source: { kind: 'dungeon', title: 'Herod', detail: 'Scarlet Monastery Armory, levels 35–45 (Whirlwind proc devastates AoE)' },
        alts: [
          { name: "Mograine's Might", itemId: 7726, value: '38.9 DPS, 3.50s, +16 Str, +17 Sta - SM Cath: Mograine' },
          { name: 'Bonebiter', itemId: 6807, value: '38.8 DPS, 3.40s - Alliance Quest: In the Name of the Light' }
        ]
      },
      {
        levelBracket: '41–44',
        itemId: 13018,
        name: "Executioner's Cleaver",
        icon: 'inv_axe_23',
        weaponType: 'Two-handed axe',
        speed: '3.80',
        dps: '42.5 DPS',
        source: { kind: 'drop', title: 'World Drop BoE', detail: 'Slow 3.80s swing speed maximizes Mortal Strike weapon coefficient' },
        alts: [
          { name: 'Stoneslayer', itemId: 9413, value: '40.5 DPS, 3.90s - Uldaman: Archaedas' },
          { name: 'The Pacifier', itemId: 13053, value: '40.0 DPS - World Drop BoE Mace' }
        ]
      },
      {
        levelBracket: '45–50',
        itemId: 17730,
        name: 'Gatorbite Axe',
        icon: 'inv_axe_22',
        weaponType: 'Two-handed axe',
        speed: '3.40',
        dps: '45.8 DPS',
        source: { kind: 'dungeon', title: 'Rotgrip', detail: 'Maraudon, levels 46–55 (+14 Str, +1% Crit)' },
        alts: [
          { name: "Princess Theradras' Scepter", itemId: 17780, value: '47.1 DPS, 3.40s - Maraudon: Princess Theradras' },
          { name: 'Warmonger', itemId: 13052, value: '44.6 DPS, 3.50s, +3% Hit - World drop 2H sword' }
        ]
      },
      {
        levelBracket: '51–54',
        itemId: 11608,
        name: 'Dark Iron Pulverizer',
        icon: 'inv_hammer_16',
        weaponType: 'Two-handed mace',
        speed: '3.70',
        dps: '47.4 DPS',
        source: { kind: 'craft', title: 'Blacksmithing (265)', detail: 'Crafted (Plan drops in Blackrock Depths) - 8 sec stun proc!' },
        alts: [
          { name: 'Dreadforge Retaliator', itemId: 11931, value: '49.3 DPS, 3.70s - BRD: Emperor Dagran Thaurissan' },
          { name: 'Enchanted Battlehammer', itemId: 12776, value: '48.3 DPS, 3.50s - Crafted Blacksmithing (280)' }
        ]
      },
      {
        levelBracket: '55–60',
        itemId: 12784,
        name: 'Arcanite Reaper',
        icon: 'inv_axe_09',
        weaponType: 'Two-handed axe',
        speed: '3.80',
        dps: '53.8 DPS',
        source: { kind: 'craft', title: 'Blacksmithing (275)', detail: 'Legendary physical spike (+62 AP, slow 3.80s Mortal Strikes)' },
        alts: [
          { name: 'Blackhand Doomsaw', itemId: 12583, value: '55.4 DPS, 3.50s, 420 bleed proc - LBRS: Warmaster Voone' },
          { name: 'Blackblade of Shahram', itemId: 12592, value: '53.6 DPS, 3.50s - UBRS: General Drakkisath' },
          { name: 'The Unstoppable Force', itemId: 18803, value: '61.4 DPS, 3.80s, Stun proc - Alterac Valley Exalted' },
          { name: 'Dreadforge Retaliator', itemId: 11931, value: '49.3 DPS - BRD Emperor' }
        ]
      }
    ]
  },

  paladin: {
    classId: 'paladin',
    tracks: [
      { id: 'primary', name: 'Two-Handed Path (Retribution / Leveling)' }
    ],
    levels: [
      {
        levelBracket: '1–2',
        itemId: 5579,
        name: 'Militia Warhammer',
        icon: 'inv_hammer_18',
        weaponType: 'Two-handed mace',
        speed: '2.70',
        dps: '2.6 DPS',
        source: { kind: 'quest', title: 'Brotherhood of Thieves', detail: 'Northshire starter quest reward' },
        alts: [
          { name: 'Club', itemId: 2491, value: '1.8 DPS - Starter vendor mace' },
          { name: 'Worn Shortsword', itemId: 25, value: '1.7 DPS - Starter sword' }
        ]
      },
      {
        levelBracket: '3–4',
        itemId: 2493,
        name: 'Wooden Mallet',
        icon: 'inv_hammer_18',
        weaponType: 'Two-handed mace',
        speed: '2.60',
        dps: '5.0 DPS',
        source: { kind: 'vendor', title: 'Weapon Vendor', detail: 'Purchased in starter hubs (Goldshire, Kharanos)' },
        alts: [
          { name: 'Large Club', itemId: 2492, value: '3.8 DPS - Starter vendor 2H mace' },
          { name: 'Copper Shortsword', itemId: 2847, value: '4.0 DPS - Blacksmithing (20)' }
        ]
      },
      {
        levelBracket: '5–6',
        itemId: 7955,
        name: 'Copper Claymore',
        icon: 'inv_sword_24',
        weaponType: 'Two-handed sword',
        speed: '3.30',
        dps: '7.7 DPS',
        source: { kind: 'craft', title: 'Blacksmithing (25)', detail: 'Crafted 2H Sword with heavy Seal of Command scaling' },
        alts: [
          { name: 'Large Club', itemId: 2492, value: '3.8 DPS - Vendor 2H mace' },
          { name: 'Copper Mace', itemId: 2844, value: '3.8 DPS - Blacksmithing (15)' }
        ]
      },
      {
        levelBracket: '7–8',
        itemId: 248005,
        name: 'Northshire Hammer',
        icon: 'inv_hammer_20',
        weaponType: 'Two-handed mace',
        speed: '2.70',
        dps: '8.3 DPS',
        source: { kind: 'quest', title: 'Rare Books / Kobold Camp', detail: 'Early quest reward in Elwynn Forest' },
        alts: [
          { name: 'Giant Mace', itemId: 1197, value: '9.0 DPS, 3.50s - Town vendor 2H mace' },
          { name: 'Copper Claymore', itemId: 7955, value: '7.7 DPS - Blacksmithing (25)' }
        ]
      },
      {
        levelBracket: '9–10',
        itemId: 1197,
        name: 'Giant Mace',
        icon: 'inv_mace_01',
        weaponType: 'Two-handed mace',
        speed: '3.50',
        dps: '9.0 DPS',
        source: { kind: 'vendor', title: 'Weapon Vendor', detail: 'Loch Modan, Redridge, and Westfall vendors' },
        alts: [
          { name: 'Trogg Scepter', itemId: 272996, value: '8.1 DPS, 2.40s - RFC: Oggleflint 1H mace' },
          { name: 'Heavy Copper Broadsword', itemId: 3487, value: '12.6 DPS, 3.00s - Blacksmithing (65)' }
        ]
      },
      {
        levelBracket: '11–12',
        itemId: 6214,
        name: 'Heavy Copper Maul',
        icon: 'inv_hammer_14',
        weaponType: 'Two-handed mace',
        speed: '3.30',
        dps: '10.8 DPS',
        source: { kind: 'craft', title: 'Blacksmithing (40)', detail: 'Guaranteed crafted 2H mace upgrade' },
        alts: [
          { name: 'Giant Mace', itemId: 1197, value: '9.0 DPS - Slow 3.50s swing' },
          { name: 'Heavy Copper Broadsword', itemId: 3487, value: '12.6 DPS - Blacksmithing (65)' }
        ]
      },
      {
        levelBracket: '13–14',
        itemId: 279895,
        name: 'Ironforge Greathammer',
        icon: 'inv_hammer_04',
        weaponType: 'Two-handed mace',
        speed: '3.10',
        dps: '16.0 DPS',
        source: { kind: 'quest', title: 'Old Ironforge Incursion', detail: 'The Hall of Thanes dungeon quest, level 16' },
        alts: [
          { name: 'Heavy Copper Broadsword', itemId: 3487, value: '12.6 DPS - Blacksmithing (65)' },
          { name: 'Bronze Mace', itemId: 2848, value: '10.5 DPS - Blacksmithing (75)' }
        ]
      },
      {
        levelBracket: '15–16',
        itemId: 5187,
        name: "Rhahk'Zor's Hammer",
        icon: 'inv_hammer_20',
        weaponType: 'Two-handed mace',
        speed: '3.20',
        dps: '18.4 DPS',
        source: { kind: 'dungeon', title: "Rhahk'Zor", detail: 'The Deadmines first boss (+11 Str)' },
        alts: [
          { name: 'Haunting Blade', itemId: 271107, value: '18.2 DPS, 3.00s, +6 Str, +5 Sta - Ruins of Lordaeron: Captain' },
          { name: 'Monstrous Cleaver', itemId: 279890, value: '17.5 DPS, 3.20s - Ruins of Lordaeron Quest: Abominable Creatures' }
        ]
      },
      {
        levelBracket: '17–18',
        itemId: 7230,
        name: "Smite's Mighty Hammer",
        icon: 'inv_hammer_18',
        weaponType: 'Two-handed mace',
        speed: '3.50',
        dps: '19.7 DPS',
        source: { kind: 'dungeon', title: 'Mr. Smite', detail: 'The Deadmines (+11 Str, +4 Agi, slow 3.50s)' },
        alts: [
          { name: 'Haunting Blade', itemId: 271107, value: '18.2 DPS, 3.00s - Ruins of Lordaeron: Captain' },
          { name: 'Bronze Warhammer', itemId: 7956, value: '17.4 DPS, 3.30s - Blacksmithing (90)' }
        ]
      },
      {
        levelBracket: '19–20',
        itemId: 6953,
        name: "Verigan's Fist",
        icon: 'inv_hammer_04',
        weaponType: 'Two-handed mace',
        speed: '3.20',
        dps: '25.6 DPS',
        source: { kind: 'quest', title: 'The Test of Righteousness', detail: 'Iconic Paladin class quest (+6 Str, +12 Sta, +7 Int, +6 Spi)' },
        alts: [
          { name: 'Bronze Warhammer', itemId: 7956, value: '17.4 DPS - Blacksmithing (90)' },
          { name: 'Bronze Greatsword', itemId: 7957, value: '18.8 DPS - Blacksmithing (105)' }
        ]
      },
      {
        levelBracket: '21–24',
        itemId: 6953,
        name: "Verigan's Fist",
        icon: 'inv_hammer_04',
        weaponType: 'Two-handed mace',
        speed: '3.20',
        dps: '25.6 DPS',
        source: { kind: 'quest', title: 'The Test of Righteousness', detail: 'Exceptional stats carry through level 30' },
        alts: [
          { name: 'Strike of the Hydra', itemId: 6909, value: '25.6 DPS, 3.30s - BFD: Aku\'mai' },
          { name: 'Solid Iron Maul', itemId: 3851, value: '22.8 DPS - Blacksmithing (135)' }
        ]
      },
      {
        levelBracket: '25–28',
        itemId: 271766,
        name: 'Heavehammer',
        icon: 'inv_hammer_15',
        weaponType: 'Two-handed mace',
        speed: '3.30',
        dps: '27.7 DPS',
        source: { kind: 'quest', title: 'Lost Relic Carry', detail: 'Excavation Site 4 dungeon quest (+60 Armor, +32 AP)' },
        alts: [
          { name: 'Trusty Sword', itemId: 281313, value: '26.7 DPS, 3.30s, +12 Sta, +12 Spi - Wetlands Quest: Stopping the Cycle' },
          { name: "Dendweller's Hammer", itemId: 284459, value: '25.6 DPS, 3.30s - Level 26 Mace' },
          { name: 'Hardened Iron Shortsword', itemId: 3849, value: '19.5 DPS - Blacksmithing (130)' }
        ]
      },
      {
        levelBracket: '29–30',
        itemId: 267369,
        name: 'Wolfsbane',
        icon: 'inv_sword_26',
        weaponType: 'Two-handed sword',
        speed: '3.40',
        dps: '25.6 DPS',
        source: { kind: 'quest', title: 'Paladin Class Chain', detail: 'Sear target with blazing Holystorm vortex (+10 Int, +9 Sta, 3x dmg to Wolves/Worgen)' },
        alts: [
          { name: 'Defender of Dalaran', itemId: 279841, value: '31.2 DPS, 3.30s, +9 Str, +13 Sta, +9 Int - City of Dalaran Quest: Heart of Disruption' },
          { name: 'Dark Hearted Hammer', itemId: 270071, value: '28.9 DPS, 3.80s, +12 Str, +8 Sta - STV Quest: Colonel Kurzen' },
          { name: "Master Hunter's Spellsword", itemId: 270085, value: '32.5 DPS, 2.40s - STV Quest: Big Game Hunter' }
        ]
      },
      {
        levelBracket: '31–35',
        itemId: 9449,
        name: 'Manual Crowd Pummeler',
        icon: 'inv_hammer_16',
        weaponType: 'Two-handed mace',
        speed: '2.00',
        dps: '31.5 DPS',
        source: { kind: 'dungeon', title: 'Crowd Pummeler 9-60', detail: 'Gnomeregan (+50% attack speed on-use for 30 sec)' },
        alts: [
          { name: 'Moonsteel Broadsword', itemId: 3853, value: '27.8 DPS - Crafted Blacksmithing (160)' },
          { name: 'Silver Spade', itemId: 4128, value: '27.2 DPS - Redridge quest' }
        ]
      },
      {
        levelBracket: '36–40',
        itemId: 7726,
        name: "Mograine's Might",
        icon: 'inv_hammer_08',
        weaponType: 'Two-handed mace',
        speed: '3.50',
        dps: '38.9 DPS',
        source: { kind: 'dungeon', title: 'Scarlet Commander Mograine', detail: 'Scarlet Monastery Cathedral (+16 Str, +17 Sta)' },
        alts: [
          { name: 'Sword of Serenity', itemId: 6802, value: '33.0 DPS, 2.80s, +9 Sta, +15 Spi - Alliance Quest: In the Name of the Light' },
          { name: 'Archeus', itemId: 2000, value: '30.8 DPS, 3.40s - Duskwood Morbent Fel quest' }
        ]
      },
      {
        levelBracket: '41–45',
        itemId: 9413,
        name: 'Stoneslayer',
        icon: 'inv_sword_04',
        weaponType: 'Two-handed sword',
        speed: '3.90',
        dps: '40.5 DPS',
        source: { kind: 'dungeon', title: 'Archaedas', detail: 'Uldaman boss (+5 Str, +13 Sta)' },
        alts: [
          { name: 'The Pacifier', itemId: 13053, value: '40.0 DPS - BoE 2H Mace' },
          { name: 'Grisly Sack of Skulls', itemId: 1959, value: '40.3 DPS - World Drop' }
        ]
      },
      {
        levelBracket: '46–50',
        itemId: 17780,
        name: "Princess Theradras' Scepter",
        icon: 'inv_hammer_04',
        weaponType: 'Two-handed mace',
        speed: '3.40',
        dps: '47.1 DPS',
        source: { kind: 'dungeon', title: 'Princess Theradras', detail: 'Maraudon final boss (+11 Str, +10 Sta)' },
        alts: [
          { name: 'Blade of the Titans', itemId: 13035, value: '44.6 DPS, +12 Str, +12 Sta - World Drop 2H sword' },
          { name: 'Warmonger', itemId: 13052, value: '44.6 DPS, 3.50s, +3% Hit - World drop 2H sword' }
        ]
      },
      {
        levelBracket: '51–55',
        itemId: 11608,
        name: 'Dark Iron Pulverizer',
        icon: 'inv_hammer_16',
        weaponType: 'Two-handed mace',
        speed: '3.70',
        dps: '47.4 DPS',
        source: { kind: 'craft', title: 'Blacksmithing (265)', detail: 'Plan drops in Blackrock Depths - 8s Stun proc' },
        alts: [
          { name: 'Dreadforge Retaliator', itemId: 11931, value: '49.3 DPS, 3.70s - BRD: Emperor Dagran Thaurissan' },
          { name: 'Enchanted Battlehammer', itemId: 12776, value: '48.3 DPS, 3.50s - Crafted Blacksmithing (280)' }
        ]
      },
      {
        levelBracket: '56–60',
        itemId: 18717,
        name: 'Hammer of the Grand Crusader',
        icon: 'inv_hammer_04',
        weaponType: 'Two-handed mace',
        speed: '3.10',
        dps: '53.9 DPS',
        source: { kind: 'dungeon', title: 'Grand Crusader Dathrohan', detail: 'Stratholme Scarlet Bastion (+12 Str, +21 Sta)' },
        alts: [
          { name: 'Blackblade of Shahram', itemId: 12592, value: '53.6 DPS, 3.50s - UBRS: General Drakkisath' },
          { name: 'The Unstoppable Force', itemId: 18803, value: '61.4 DPS, 3.80s, Stun proc - Alterac Valley Exalted' },
          { name: 'Dreadforge Retaliator', itemId: 11931, value: '49.3 DPS - BRD Emperor' }
        ]
      }
    ]
  },

  hunter: {
    classId: 'hunter',
    tracks: [
      { id: 'primary', name: 'Ranged Progression (Bows / Guns / Crossbows)' }
    ],
    levels: [
      {
        levelBracket: '1–2',
        itemId: 2505,
        name: 'Polished Shortbow',
        icon: 'inv_weapon_bow_08',
        weaponType: 'Bow',
        speed: '1.80',
        dps: '1.8 DPS',
        source: { kind: 'vendor', title: 'Bow Vendor', detail: 'Purchased in starting areas' },
        alts: [
          { name: 'Hornwood Recurve Bow', itemId: 2506, value: '2.4 DPS - Starter vendor' }
        ]
      },
      {
        levelBracket: '3–4',
        itemId: 2506,
        name: 'Hornwood Recurve Bow',
        icon: 'inv_weapon_bow_08',
        weaponType: 'Bow',
        speed: '2.00',
        dps: '2.4 DPS',
        source: { kind: 'vendor', title: 'Weapon Vendor', detail: 'Sold by town weapon vendors' },
        alts: [
          { name: 'Rough Boomstick', itemId: 4362, value: '4.1 DPS, 2.30s - Crafted Engineering (30)' }
        ]
      },
      {
        levelBracket: '5–6',
        itemId: 4362,
        name: 'Rough Boomstick',
        icon: 'inv_weapon_rifle_01',
        weaponType: 'Gun',
        speed: '2.30',
        dps: '4.1 DPS',
        source: { kind: 'craft', title: 'Engineering (30)', detail: 'Crafted gun, substantial auto-shot increase' },
        alts: [
          { name: 'Hornwood Recurve Bow', itemId: 2506, value: '2.4 DPS - Vendor fallback' }
        ]
      },
      {
        levelBracket: '7–8',
        itemId: 276685,
        name: 'Militia Bow',
        icon: 'inv_weapon_bow_03',
        weaponType: 'Bow',
        speed: '2.10',
        dps: '5.7 DPS',
        source: { kind: 'quest', title: 'Rare Books / Kobold Camp', detail: 'Early quest reward in starting zones' },
        alts: [
          { name: 'Reinforced Bow', itemId: 2507, value: '4.4 DPS, 2.20s - Vendor bow' }
        ]
      },
      {
        levelBracket: '9–10',
        itemId: 3026,
        name: 'Heavy Recurve Bow',
        icon: 'inv_weapon_bow_07',
        weaponType: 'Bow',
        speed: '2.20',
        dps: '6.7 DPS',
        source: { kind: 'vendor', title: 'Bow Vendor', detail: 'Sold in Stormwind, Ironforge, Orgrimmar, and Thunder Bluff' },
        alts: [
          { name: 'Fine Shortbow', itemId: 11303, value: '6.2 DPS - Fast 1.70s swing' },
          { name: 'Rough Boomstick', itemId: 4362, value: '4.1 DPS - Engineering (30)' }
        ]
      },
      {
        levelBracket: '11–12',
        itemId: 3027,
        name: 'Laminated Recurve Bow',
        icon: 'inv_weapon_bow_07',
        weaponType: 'Bow',
        speed: '2.30',
        dps: '7.8 DPS',
        source: { kind: 'vendor', title: 'Bow Vendor', detail: 'Sold in Redridge, Loch Modan, Crossroads, and Auberdine' },
        alts: [
          { name: "Hunter's Boomstick", itemId: 3446, value: '8.5 DPS, 2.10s - Dun Morogh quest reward' },
          { name: 'Deadly Blunderbuss', itemId: 4369, value: '8.3 DPS, 2.60s - Engineering (105)' }
        ]
      },
      {
        levelBracket: '13–14',
        itemId: 279894,
        name: 'Calibrated Blunderbuss',
        icon: 'inv_weapon_rifle_03',
        weaponType: 'Gun',
        speed: '2.40',
        dps: '9.6 DPS',
        source: { kind: 'quest', title: 'Old Ironforge Incursion', detail: 'Hall of Thanes dungeon quest reward' },
        alts: [
          { name: 'Deadly Blunderbuss', itemId: 4369, value: '8.3 DPS, 2.60s - Engineering (105)' },
          { name: 'Laminated Recurve Bow', itemId: 3027, value: '7.8 DPS - Town vendor fallback' }
        ]
      },
      {
        levelBracket: '15–18',
        itemId: 6469,
        name: 'Venomstrike',
        icon: 'inv_weapon_bow_04',
        weaponType: 'Bow',
        speed: '2.40',
        dps: '12.1 DPS',
        source: { kind: 'dungeon', title: 'Lord Serpentis', detail: 'Wailing Caverns (Poison bolt proc)' },
        alts: [
          { name: 'Lovingly Crafted Boomstick', itemId: 4372, value: '9.7 DPS, 1.80s - Engineering (120)' },
          { name: 'Deadly Blunderbuss', itemId: 4369, value: '8.3 DPS - Engineering (105)' }
        ]
      },
      {
        levelBracket: '19–20',
        itemId: 6469,
        name: 'Venomstrike',
        icon: 'inv_weapon_bow_04',
        weaponType: 'Bow',
        speed: '2.40',
        dps: '12.1 DPS',
        source: { kind: 'dungeon', title: 'Lord Serpentis', detail: 'Remains top-tier through level 22' },
        alts: [
          { name: 'Silver-plated Shotgun', itemId: 4379, value: '10.4 DPS, 2.40s - Engineering (125)' },
          { name: 'Reinforced Bow', itemId: 2507, value: '4.4 DPS - Vendor fallback' }
        ]
      },
      {
        levelBracket: '21–22',
        itemId: 3078,
        name: 'Naga Heartpiercer',
        icon: 'inv_weapon_bow_03',
        weaponType: 'Bow',
        speed: '2.40',
        dps: '13.3 DPS',
        source: { kind: 'dungeon', title: 'Lady Sarevess', detail: 'Blackfathom Deeps' },
        alts: [
          { name: 'Moonsight Rifle', itemId: 4383, value: '13.8 DPS, 2.40s, +3 Hit - Engineering (145)' },
          { name: 'Fallenroot Longbow', itemId: 273843, value: '13.9 DPS, 2.20s - BFD: Lorgus Jett' }
        ]
      },
      {
        levelBracket: '23–24',
        itemId: 273843,
        name: 'Fallenroot Longbow',
        icon: 'inv_weapon_bow_05',
        weaponType: 'Bow',
        speed: '2.20',
        dps: '13.9 DPS',
        source: { kind: 'dungeon', title: 'Lorgus Jett', detail: 'Blackfathom Deeps (+2 Agi, +4 Sta)' },
        alts: [
          { name: 'BKP 2700 "Enforcer"', itemId: 4384, value: '14.2 DPS, 2.70s - Engineering (155)' },
          { name: 'Concealed Hand Crossbow', itemId: 273829, value: '15.3 DPS - The Stockade: Bazil Thredd' }
        ]
      },
      {
        levelBracket: '25–26',
        itemId: 273033,
        name: 'Gravespike Repeater',
        icon: 'inv_weapon_crossbow_01',
        weaponType: 'Crossbow',
        speed: '2.30',
        dps: '15.4 DPS',
        source: { kind: 'dungeon', title: 'Atrexis the Grave Knight', detail: 'City of Dalaran dungeon (+8 AP, +9 AP vs Humanoids)' },
        alts: [
          { name: 'Concealed Hand Crossbow', itemId: 273829, value: '15.3 DPS - The Stockade: Bazil Thredd' },
          { name: 'Fallenroot Longbow', itemId: 273843, value: '13.9 DPS - Blackfathom Deeps' }
        ]
      },
      {
        levelBracket: '27–28',
        itemId: 273029,
        name: 'Golemsight Long Gun',
        icon: 'inv_weapon_rifle_07',
        weaponType: 'Gun',
        speed: '2.50',
        dps: '16.6 DPS',
        source: { kind: 'dungeon', title: 'Relic Guardian', detail: 'Excavation Site: Wetlands (+6 Agility, Req Level 28)' },
        alts: [
          { name: 'Gravespike Repeater', itemId: 273033, value: '15.4 DPS, 2.30s - City of Dalaran: Atrexis' },
          { name: 'Glass Shooter', itemId: 9456, value: '18.5 DPS, 2.90s - Gnomeregan: Dark Iron Ambassador' }
        ]
      },
      {
        levelBracket: '29–30',
        itemId: 17687,
        name: "Master Hunter's Rifle",
        icon: 'inv_weapon_rifle_05',
        weaponType: 'Gun',
        speed: '2.60',
        dps: '20.9 DPS',
        source: { kind: 'quest', title: 'Big Game Hunter', detail: 'Stranglethorn Vale Nesingwary chain reward (+14 RAP)' },
        alts: [
          { name: "Master Hunter's Bow", itemId: 17686, value: '20.9 DPS - Bow reward choice from Big Game Hunter' },
          { name: 'Quilboar Blaster', itemId: 274084, value: '18.6 DPS, 2.80s, +4 Agi, +4 Spi - RFK Quest: The Crone of the Kraul' },
          { name: "Booty Bay Bruiser's Buckshot", itemId: 274748, value: '18.0 DPS, 2.80s, +3 Sta, +9 AP - Booty Bay Honored vendor gun' },
          { name: 'Glass Shooter', itemId: 9456, value: '18.5 DPS - Gnomeregan: Dark Iron Ambassador' }
        ]
      },
      {
        levelBracket: '31–34',
        itemId: 274293,
        name: 'Spellsever Crossbow',
        icon: 'inv_weapon_crossbow_02',
        weaponType: 'Crossbow',
        speed: '2.40',
        dps: '20.8 DPS',
        source: { kind: 'dungeon', title: 'Arcanist Doan', detail: 'Scarlet Monastery Library' },
        alts: [
          { name: "Master Hunter's Rifle", itemId: 17687, value: '20.9 DPS - Big Game Hunter quest gun' },
          { name: 'Crystalpine Stinger', itemId: 13037, value: '21.0 DPS, 2.60s - World drop BoE bow' },
          { name: 'Mithril Blunderbuss', itemId: 10508, value: '17.9 DPS - Engineering (175)' }
        ]
      },
      {
        levelBracket: '35–38',
        itemId: 17687,
        name: "Master Hunter's Rifle",
        icon: 'inv_weapon_rifle_05',
        weaponType: 'Gun',
        speed: '2.60',
        dps: '20.9 DPS',
        source: { kind: 'quest', title: 'Big Game Hunter', detail: 'Outstanding weapon coefficient carries through 40' },
        alts: [
          { name: 'Chesterfall Musket', itemId: 7729, value: '20.9 DPS, 2.50s - SM Graveyard rare trash drop' },
          { name: 'Blasting Hackbut', itemId: 6798, value: '21.0 DPS - Horde Quest: Questioning Reethe' },
          { name: 'Mithril Blunderbuss', itemId: 10508, value: '17.9 DPS - Engineering (175)' }
        ]
      },
      {
        levelBracket: '39–42',
        itemId: 10510,
        name: 'Mithril Heavy-bore Rifle',
        icon: 'inv_weapon_rifle_03',
        weaponType: 'Gun',
        speed: '2.90',
        dps: '23.4 DPS',
        source: { kind: 'craft', title: 'Engineering (200)', detail: 'High top-end damage for Aimed Shot (+6 Agi)' },
        alts: [
          { name: 'Shrapnel Blaster', itemId: 4127, value: '22.8 DPS - Alliance Quest: Colonel Kurzen' },
          { name: 'Ironweaver', itemId: 13137, value: '23.2 DPS - World drop BoE crossbow' }
        ]
      },
      {
        levelBracket: '43–46',
        itemId: 277254,
        name: "Truthseeker's Bow",
        icon: 'inv_weapon_bow_08',
        weaponType: 'Bow',
        speed: '2.50',
        dps: '23.8 DPS',
        source: { kind: 'quest', title: 'Greater Friend of the Library', detail: 'Custom WoW Forever Library completion reward' },
        alts: [
          { name: 'Gryphonwing Bow', itemId: 10633, value: '24.5 DPS, 2.60s - Hinterlands quest reward' },
          { name: 'Riphook', itemId: 13038, value: '25.0 DPS - World drop BoE bow' }
        ]
      },
      {
        levelBracket: '47–52',
        itemId: 17717,
        name: 'Megashot Rifle',
        icon: 'inv_weapon_rifle_08',
        weaponType: 'Gun',
        speed: '2.90',
        dps: '27.4 DPS',
        source: { kind: 'dungeon', title: 'Tinkerer Gizlock', detail: 'Maraudon (+8 Agi, heavy Aimed Shot burst)' },
        alts: [
          { name: 'Thorium Rifle', itemId: 15995, value: '28.0 DPS, 2.50s, +17 RAP - Engineering (235)' },
          { name: 'Dark Iron Rifle', itemId: 16004, value: '29.5 DPS - Engineering (255)' }
        ]
      },
      {
        levelBracket: '53–60',
        itemId: 12651,
        name: 'Blackcrow',
        icon: 'inv_weapon_crossbow_02',
        weaponType: 'Crossbow',
        speed: '3.20',
        dps: '30.3 DPS',
        source: { kind: 'dungeon', title: "Shadow Hunter Vosh'gajin", detail: 'Lower Blackrock Spire (+3 Hit)' },
        alts: [
          { name: 'Ancient Bone Bow', itemId: 18680, value: '31.4 DPS, 2.80s, +11 Agi - Scholomance: Rattlegore' },
          { name: 'Flawless Arcanite Rifle', itemId: 16007, value: '31.0 DPS, +10 RAP - Engineering (275)' },
          { name: 'Core Marksman Rifle', itemId: 18282, value: '35.0 DPS - Molten Core' }
        ]
      }
    ]
  },

  rogue: {
    classId: 'rogue',
    tracks: [
      { id: 'primary', name: 'One-Handed & Daggers (Combat / Subtlety)' }
    ],
    levels: [
      {
        levelBracket: '1–2',
        itemId: 2092,
        name: 'Worn Dagger',
        icon: 'inv_weapon_shortblade_05',
        weaponType: 'Dagger',
        speed: '1.50',
        dps: '1.6 DPS',
        source: { kind: 'vendor', title: 'Starter Dagger', detail: 'Equipped by all starter rogues' },
        alts: [
          { name: 'Small Knife', itemId: 2494, value: '1.8 DPS - Starter vendor dagger' },
          { name: 'Worn Shortsword', itemId: 25, value: '1.7 DPS - Starter sword' }
        ]
      },
      {
        levelBracket: '3–4',
        itemId: 2494,
        name: 'Small Knife',
        icon: 'inv_weapon_shortblade_05',
        weaponType: 'Dagger',
        speed: '1.40',
        dps: '1.8 DPS',
        source: { kind: 'vendor', title: 'Weapon Vendor', detail: 'Purchased in starting hub towns' },
        alts: [
          { name: 'Carving Knife', itemId: 2489, value: '3.1 DPS - Vendor fast dagger' },
          { name: 'Copper Shortsword', itemId: 2847, value: '4.0 DPS - Blacksmithing (20)' }
        ]
      },
      {
        levelBracket: '5–6',
        itemId: 7166,
        name: 'Copper Dagger',
        icon: 'inv_weapon_shortblade_01',
        weaponType: 'Dagger',
        speed: '1.60',
        dps: '5.9 DPS',
        source: { kind: 'craft', title: 'Blacksmithing (25)', detail: 'Crafted spike or auction house purchase' },
        alts: [
          { name: 'Copper Shortsword', itemId: 2847, value: '4.0 DPS - Blacksmithing (20)' },
          { name: 'Stiletto', itemId: 2490, value: '4.8 DPS - Fast 1.50s vendor dagger' }
        ]
      },
      {
        levelBracket: '7–8',
        itemId: 248007,
        name: 'Militia Shortblade',
        icon: 'inv_sword_04',
        weaponType: 'One-handed sword',
        speed: '1.80',
        dps: '6.5 DPS',
        source: { kind: 'quest', title: 'Rare Books / Kobold Camp', detail: 'Early quest reward in starting zones' },
        alts: [
          { name: 'Scrappy Dagger', itemId: 250601, value: '5.5 DPS - Early quest' },
          { name: 'Stiletto', itemId: 2490, value: '4.8 DPS - Fast vendor dagger' }
        ]
      },
      {
        levelBracket: '9–10',
        itemId: 7298,
        name: 'Blade of Cunning',
        icon: 'inv_weapon_shortblade_04',
        weaponType: 'Dagger',
        speed: '1.60',
        dps: '6.8 DPS',
        source: { kind: 'quest', title: 'Snatch and Grab', detail: 'Level 10 Rogue class quest reward (+2 Agi)' },
        alts: [
          { name: "Thief's Blade", itemId: 2226, value: '7.2 DPS, 1.70s - Vendor dagger' },
          { name: 'Cutlass', itemId: 2524, value: '7.7 DPS, 2.00s - 1H vendor sword' }
        ]
      },
      {
        levelBracket: '11–12',
        itemId: 2209,
        name: 'Jambiya',
        icon: 'inv_weapon_shortblade_01',
        weaponType: 'Dagger',
        speed: '1.60',
        dps: '8.4 DPS',
        source: { kind: 'vendor', title: 'Weapon Vendor', detail: 'Sold in Redridge, Loch Modan, Crossroads, and Auberdine' },
        alts: [
          { name: 'Cutlass', itemId: 2524, value: '7.7 DPS, 2.00s - 1H vendor sword' },
          { name: 'Trogg Scepter', itemId: 272996, value: '8.1 DPS, 2.40s - RFC: Oggleflint 1H mace' }
        ]
      },
      {
        levelBracket: '13–14',
        itemId: 270226,
        name: 'Fang of Magmatus',
        icon: 'inv_weapon_shortblade_05',
        weaponType: 'Main Hand Dagger',
        speed: '1.60',
        dps: '11.8 DPS',
        source: { kind: 'dungeon', title: 'Magmatus', detail: 'Hall of Thanes dungeon, levels 13–18 (+2 Agi, +2 Fire SP)' },
        alts: [
          { name: 'Poniard', itemId: 2208, value: '9.6 DPS - Vendor fast dagger' },
          { name: 'Heavy Copper Broadsword', itemId: 3487, value: '12.6 DPS, 3.00s - Blacksmithing (65)' }
        ]
      },
      {
        levelBracket: '15–16',
        itemId: 271101,
        name: 'Meathook Slicer',
        icon: 'inv_weapon_shortblade_06',
        weaponType: 'Dagger',
        speed: '1.50',
        dps: '13.2 DPS',
        source: { kind: 'dungeon', title: 'The Baron', detail: 'Ruins of Lordaeron, levels 15–20 (+3 Agi, +2 Sta)' },
        alts: [
          { name: 'Tail Spike', itemId: 6448, value: '11.9 DPS, 1.50s - Wailing Caverns: Skum' },
          { name: 'Big Bronze Knife', itemId: 3848, value: '11.6 DPS - Blacksmithing (75)' }
        ]
      },
      {
        levelBracket: '17–18',
        itemId: 271106,
        name: 'Vileblood Scimitar',
        icon: 'inv_sword_21',
        weaponType: 'One-handed sword',
        speed: '2.20',
        dps: '15.0 DPS',
        source: { kind: 'dungeon', title: 'Viktor the Vile', detail: 'Ruins of Lordaeron (+4 Str, +3 Sta)' },
        alts: [
          { name: 'Cruel Barb', itemId: 5191, value: '16.8 DPS, 2.80s - The Deadmines: Edwin VanCleef' },
          { name: 'Pearl-handled Dagger', itemId: 5540, value: '14.2 DPS, 1.70s - BFD: Gelihast' }
        ]
      },
      {
        levelBracket: '19–20',
        itemId: 279892,
        name: 'Plaguefang',
        icon: 'inv_sword_24',
        weaponType: 'One-handed sword',
        speed: '1.60',
        dps: '16.2 DPS',
        source: { kind: 'quest', title: 'The New Plague', detail: 'Ruins of Lordaeron quest (+4 Agi, +3 Sta)' },
        alts: [
          { name: 'Cruel Barb', itemId: 5191, value: '16.8 DPS, 2.80s - Deadmines: Edwin VanCleef' },
          { name: 'Wingblade', itemId: 6504, value: '15.8 DPS, 2.20s - WC Quest: Leaders of the Fang' }
        ]
      },
      {
        levelBracket: '21–22',
        itemId: 3490,
        name: 'Deadly Bronze Poniard',
        icon: 'inv_weapon_shortblade_12',
        weaponType: 'Dagger',
        speed: '1.60',
        dps: '12.8 DPS',
        source: { kind: 'craft', title: 'Blacksmithing (100)', detail: 'Crafted fast off-hand poison applicator' },
        alts: [
          { name: "Subdued Dragon's Fang", itemId: 281314, value: '20.6 DPS, 1.70s, +7 Agi - Wetlands Quest: Stopping the Cycle' },
          { name: "Butcher's Cleaver", itemId: 1292, value: '14.8 DPS - SFK: The Butcher' },
          { name: 'Bronze Shortsword', itemId: 2850, value: '12.4 DPS - Blacksmithing (105)' }
        ]
      },
      {
        levelBracket: '23–24',
        itemId: 6220,
        name: 'Meteor Shard',
        icon: 'inv_weapon_shortblade_02',
        weaponType: 'Dagger',
        speed: '1.80',
        dps: '17.8 DPS',
        source: { kind: 'dungeon', title: 'Archmage Arugal', detail: 'Shadowfang Keep (35 Fire damage proc)' },
        alts: [
          { name: "Subdued Dragon's Fang", itemId: 281314, value: '20.6 DPS, 1.70s, +7 Agi - Wetlands Quest: Stopping the Cycle' },
          { name: "Odo's Claw", itemId: 6323, value: '17.0 DPS, 1.50s - SFK: Odo the Blindwatcher' },
          { name: 'Iridescent Hammer', itemId: 5541, value: '15.6 DPS - BFD: Lady Sarevess' }
        ]
      },
      {
        levelBracket: '25–26',
        itemId: 277246,
        name: 'Ruby-Adorned Blade',
        icon: 'inv_sword_15',
        weaponType: 'One-handed sword',
        speed: '2.30',
        dps: '23.9 DPS',
        source: { kind: 'quest', title: 'The Eye of Bhossca', detail: 'Level 25 Rogue class quest in Scarlet Monastery (+3 Agi, +8 Sta, Rogue only!)' },
        alts: [
          { name: "Subdued Dragon's Fang", itemId: 281314, value: '20.6 DPS, 1.70s, +7 Agi, +2 Sta - Wetlands Quest: Stopping the Cycle' },
          { name: 'Serrated Raptor Claw', itemId: 271770, value: '18.0 DPS, 1.60s - Quest: Changing Tastes' },
          { name: 'Iron Fists', itemId: 250604, value: '17.5 DPS - Crafted fist weapon' }
        ]
      },
      {
        levelBracket: '27–28',
        itemId: 273053,
        name: 'Tendonscraper Dagger',
        icon: 'inv_weapon_shortblade_15',
        weaponType: 'Main Hand Dagger',
        speed: '1.60',
        dps: '14.4 DPS',
        source: { kind: 'dungeon', title: 'Lyn the Ignored', detail: 'City of Dalaran (+5 Sta, +36 Spell Power)' },
        alts: [
          { name: "City Guard's Tarnished Blade", itemId: 286996, value: '22.4 DPS, 2.50s, Req Level 29 - City of Dalaran drop' },
          { name: 'Toxic Revenger', itemId: 9453, value: '18.8 DPS, 2.20s - Gnomeregan: Viscous Fallout' },
          { name: 'Hardened Iron Shortsword', itemId: 3849, value: '19.5 DPS - Blacksmithing (130)' }
        ]
      },
      {
        levelBracket: '29–30',
        itemId: 6681,
        name: 'Thornspike',
        icon: 'inv_weapon_shortblade_01',
        weaponType: 'Dagger',
        speed: '2.00',
        dps: '20.2 DPS',
        source: { kind: 'dungeon', title: 'Aggem Thorncurse', detail: 'Razorfen Kraul (+8 Attack Power)' },
        alts: [
          { name: 'Swinetusk Shank', itemId: 6691, value: '18.5 DPS, 1.50s - RFK: Agathelos' },
          { name: 'Pronged Reaver', itemId: 6692, value: '20.3 DPS, 2.10s - RFK: Overlord Ramtusk' },
          { name: 'Zealot Blade', itemId: 13033, value: '20.4 DPS, 1.90s - World drop BoE sword' }
        ]
      },
      {
        levelBracket: '31–34',
        itemId: 4977,
        name: 'Sword of Hammerfall',
        icon: 'inv_sword_27',
        weaponType: 'One-handed sword',
        speed: '2.60',
        dps: '28.5 DPS',
        source: { kind: 'quest', title: 'The Real Threat / Sword of Serenity', detail: 'Major quest reward (+9 Str, +4 Sta)' },
        alts: [
          { name: "Ironspine's Fist", itemId: 7687, value: '24.7 DPS, 2.70s - SM Graveyard: Ironspine' },
          { name: 'Bloody Brass Knuckles', itemId: 7683, value: '25.0 DPS, 2.30s - SM Graveyard: Azshir' }
        ]
      },
      {
        levelBracket: '35–38',
        itemId: 6831,
        name: 'Black Menace',
        icon: 'inv_weapon_shortblade_05',
        weaponType: 'Dagger',
        speed: '2.40',
        dps: '29.7 DPS',
        source: { kind: 'quest', title: 'In the Name of the Light / Compendium', detail: 'SM quest reward (+7 Agi, +3 Str)' },
        alts: [
          { name: 'The Butcher', itemId: 8226, value: '28.6 DPS, 2.80s - World drop BoE sword' },
          { name: 'Silent Hunter', itemId: 9520, value: '27.2 DPS, 1.70s - Maraudon/Quest' },
          { name: 'Mithril Shortsword', itemId: 250607, value: '26.5 DPS - Blacksmithing (170)' }
        ]
      },
      {
        levelBracket: '39–44',
        itemId: 9467,
        name: "Gahz'rilla Fang",
        icon: 'inv_weapon_shortblade_12',
        weaponType: 'Dagger',
        speed: '1.90',
        dps: '32.2 DPS',
        source: { kind: 'dungeon', title: "Gahz'rilla", detail: "Zul'Farrak (+10 Attack Power)" },
        alts: [
          { name: 'Coldrage Dagger', itemId: 10761, value: '32.3 DPS, 1.50s - RFD: Amnennar' },
          { name: "Vanquisher's Sword", itemId: 10823, value: '30.4 DPS, 2.20s - RFD Quest: Bring the End' }
        ]
      },
      {
        levelBracket: '45–50',
        itemId: 17705,
        name: 'Thrash Blade',
        icon: 'inv_sword_23',
        weaponType: 'One-handed sword',
        speed: '2.70',
        dps: '35.9 DPS',
        source: { kind: 'quest', title: 'Corruption of Earth and Seed', detail: 'Maraudon quest reward (Extra swing proc on hit)' },
        alts: [
          { name: 'Lifeforce Dirk', itemId: 10750, value: '35.9 DPS, 1.50s - Sunken Temple Quest: The God Hakkar' },
          { name: 'Electro-Lantern', itemId: 11855, value: '34.0 DPS - BRD' }
        ]
      },
      {
        levelBracket: '51–56',
        itemId: 17705,
        name: 'Thrash Blade',
        icon: 'inv_sword_23',
        weaponType: 'One-handed sword',
        speed: '2.70',
        dps: '35.9 DPS',
        source: { kind: 'quest', title: 'Corruption of Earth and Seed', detail: 'Extra attack engine remains top-tier through 60' },
        alts: [
          { name: 'Bold Dirk', itemId: 250616, value: '35.3 DPS - Blacksmithing (270)' },
          { name: "Julie's Dagger", itemId: 6660, value: '35.3 DPS, 1.30s - World drop BoE' },
          { name: "Dal'Rend's Sacred Charge", itemId: 12940, value: '41.4 DPS, 2.80s - UBRS: Rend Blackhand' }
        ]
      },
      {
        levelBracket: '57–60',
        itemId: 12783,
        name: 'Heartseeker',
        icon: 'inv_weapon_shortblade_12',
        weaponType: 'Dagger',
        speed: '1.70',
        dps: '41.3 DPS',
        source: { kind: 'craft', title: 'Blacksmithing (290)', detail: 'Crafted Dagger (+4 Str, +9 Agi, +1% Crit)' },
        alts: [
          { name: 'Felstriker', itemId: 12590, value: '41.1 DPS, 1.70s, 3s 100% crit proc - UBRS: Rend Blackhand' },
          { name: "Mirah's Song", itemId: 15805, value: '38.8 DPS, 1.80s, +9 Str, +9 Agi - Scholomance Quest: Kirtonos' },
          { name: "Dal'Rend's Tribal Guardian", itemId: 12939, value: '39.6 DPS - UBRS Rend' }
        ]
      }
    ]
  },

  shaman: {
    classId: 'shaman',
    tracks: [
      { id: 'primary', name: 'Enhancement & Elemental (Two-Hand & Staves)' }
    ],
    levels: [
      {
        levelBracket: '1–2',
        itemId: 2132,
        name: 'Short Staff',
        icon: 'inv_staff_08',
        weaponType: 'Staff',
        speed: '2.20',
        dps: '2.0 DPS',
        source: { kind: 'vendor', title: 'Weapon Vendor', detail: 'Sold in starting zones (Valley of Trials, Camp Narache)' },
        alts: [
          { name: 'Club', itemId: 2491, value: '1.8 DPS - Starter vendor mace' },
          { name: 'Crude Battle Axe', itemId: 2488, value: '2.0 DPS - Starter 2H axe' }
        ]
      },
      {
        levelBracket: '3–4',
        itemId: 2495,
        name: 'Walking Stick',
        icon: 'inv_staff_08',
        weaponType: 'Staff',
        speed: '2.50',
        dps: '4.2 DPS',
        source: { kind: 'vendor', title: 'Weapon Vendor', detail: 'Sold in Razor Hill, Bloodhoof Village' },
        alts: [
          { name: 'Wooden Mallet', itemId: 2493, value: '5.0 DPS - Vendor 2H mace' },
          { name: 'Copper Axe', itemId: 2845, value: '3.8 DPS - Blacksmithing (20)' }
        ]
      },
      {
        levelBracket: '5–6',
        itemId: 3488,
        name: 'Copper Battle Axe',
        icon: 'inv_axe_06',
        weaponType: 'Two-handed axe',
        speed: '3.50',
        dps: '9.0 DPS',
        source: { kind: 'craft', title: 'Blacksmithing (30)', detail: 'Heavy slow 2H weapon for massive early Rockbiter bursts' },
        alts: [
          { name: 'Copper Mace', itemId: 2844, value: '3.8 DPS - Blacksmithing (15)' },
          { name: 'Large Club', itemId: 2492, value: '3.8 DPS - Vendor 2H mace' }
        ]
      },
      {
        levelBracket: '7–8',
        itemId: 3488,
        name: 'Copper Battle Axe',
        icon: 'inv_axe_06',
        weaponType: 'Two-handed axe',
        speed: '3.50',
        dps: '9.0 DPS',
        source: { kind: 'craft', title: 'Blacksmithing (30)', detail: 'Slow 3.50s swing speed maximizes Rockbiter AP bonuses' },
        alts: [
          { name: 'Staff of the Dor\'Danil', itemId: 15396, value: '8.5 DPS - Early quest staff' },
          { name: 'Large Club', itemId: 2492, value: '3.8 DPS - Vendor 2H mace' }
        ]
      },
      {
        levelBracket: '9–10',
        itemId: 1197,
        name: 'Giant Mace',
        icon: 'inv_mace_01',
        weaponType: 'Two-handed mace',
        speed: '3.50',
        dps: '9.0 DPS',
        source: { kind: 'vendor', title: 'Weapon Vendor', detail: 'Sold in Crossroads, Bloodhoof Village' },
        alts: [
          { name: 'Trogg Scepter', itemId: 272996, value: '8.1 DPS, 2.40s - RFC: Oggleflint 1H mace' },
          { name: 'Thick War Axe', itemId: 3489, value: '8.6 DPS - Blacksmithing (45)' }
        ]
      },
      {
        levelBracket: '11–12',
        itemId: 6214,
        name: 'Heavy Copper Maul',
        icon: 'inv_hammer_14',
        weaponType: 'Two-handed mace',
        speed: '3.30',
        dps: '10.8 DPS',
        source: { kind: 'craft', title: 'Blacksmithing (40)', detail: 'Guaranteed crafted spike, slow 3.30s' },
        alts: [
          { name: 'Trogg Scepter', itemId: 272996, value: '8.1 DPS - RFC: Oggleflint' },
          { name: 'Woodchopper', itemId: 2520, value: '10.5 DPS - Vendor 2H axe' }
        ]
      },
      {
        levelBracket: '13–14',
        itemId: 270228,
        name: 'Golemheart Stave',
        icon: 'inv_staff_20',
        weaponType: 'Staff',
        speed: '2.60',
        dps: '14.2 DPS',
        source: { kind: 'dungeon', title: 'Plunder', detail: 'Hall of Thanes dungeon (+5 Int, +4 Spirit)' },
        alts: [
          { name: 'Staff of Orgrimmar', itemId: 15444, value: '11.8 DPS, +6 Int, +6 Agi, +18 Spell Dmg - RFC: Hidden Enemies (Horde)' },
          { name: "Durgen's Crescent Axe", itemId: 270227, value: '15.5 DPS, 2.40s, +5 Str, +2 Sta - Hall of Thanes: Durgen' },
          { name: 'Ironforge Greathammer', itemId: 279895, value: '16.0 DPS - Hall of Thanes dungeon quest' }
        ]
      },
      {
        levelBracket: '15–16',
        itemId: 271104,
        name: 'Corpse Chopper',
        icon: 'inv_axe_19',
        weaponType: 'Two-handed axe',
        speed: '3.20',
        dps: '17.4 DPS',
        source: { kind: 'dungeon', title: 'Bjork', detail: 'Ruins of Lordaeron, levels 15–20 (+7 Str, +4 Sta)' },
        alts: [
          { name: 'Staff of Orgrimmar', itemId: 15444, value: '11.8 DPS, +6 Int, +6 Agi, +18 Spell Dmg - RFC: Hidden Enemies (Horde)' },
          { name: 'Scepter of the Abandoned', itemId: 271103, value: '14.0 DPS, +4 Sta, +4 Int - Ruins of Lordaeron: The Abandoned' },
          { name: 'Segmented Spider Leg', itemId: 271102, value: '14.8 DPS, +5 Int, +4 Sta - Ruins of Lordaeron: Witherfang' }
        ]
      },
      {
        levelBracket: '17–18',
        itemId: 279891,
        name: 'Forsaken Greataxe',
        icon: 'inv_axe_11',
        weaponType: 'Two-handed axe',
        speed: '3.40',
        dps: '20.5 DPS',
        source: { kind: 'quest', title: "The Wrath of Rath'mael", detail: 'Ruins of Lordaeron dungeon quest (+8 Str, +5 Sta)' },
        alts: [
          { name: 'Staff of Orgrimmar', itemId: 15444, value: '11.8 DPS, +6 Int, +6 Agi, +18 Spell Dmg - RFC: Hidden Enemies (Horde)' },
          { name: 'Coldspire Staff', itemId: 271105, value: '16.8 DPS, +7 Int, +5 Spi - Ruins of Lordaeron: Rath\'mael' },
          { name: "Smite's Mighty Hammer", itemId: 7230, value: '19.7 DPS, 3.50s - The Deadmines: Mr. Smite' }
        ]
      },
      {
        levelBracket: '19–20',
        itemId: 6505,
        name: 'Crescent Staff',
        icon: 'inv_staff_20',
        weaponType: 'Staff',
        speed: '2.90',
        dps: '15.3 DPS',
        source: { kind: 'quest', title: 'Leaders of the Fang', detail: 'Wailing Caverns quest (+7 Int, +7 Spi, +7 Sta)' },
        alts: [
          { name: 'Staff of Orgrimmar', itemId: 15444, value: '11.8 DPS, +6 Int, +6 Agi, +18 Spell Dmg - RFC: Hidden Enemies (Horde)' },
          { name: 'Bronze Warhammer', itemId: 7956, value: '17.4 DPS - Blacksmithing (90)' },
          { name: 'Bronze Battle Axe', itemId: 7958, value: '18.8 DPS - Blacksmithing (105)' }
        ]
      },
      {
        levelBracket: '21–22',
        itemId: 6905,
        name: 'Reef Axe',
        icon: 'inv_axe_08',
        weaponType: 'Two-handed axe',
        speed: '3.30',
        dps: '22.4 DPS',
        source: { kind: 'dungeon', title: 'Gelihast', detail: 'Blackfathom Deeps (+10 Str, +4 Agi)' },
        alts: [
          { name: 'Bronze Battle Axe', itemId: 7958, value: '18.8 DPS - Blacksmithing (105)' },
          { name: 'Iridescent Hammer', itemId: 5541, value: '15.6 DPS - BFD: Lady Sarevess' }
        ]
      },
      {
        levelBracket: '23–24',
        itemId: 285328,
        name: "Taurenbane's Family Cleaver",
        icon: 'inv_axe_16',
        weaponType: 'Two-handed axe',
        speed: '3.40',
        dps: '22.9 DPS',
        source: { kind: 'drop', title: 'Hagg Taurenbane', detail: 'Barrens Rare Elite (+9 Sta, +32 AP vs Humanoids)' },
        alts: [
          { name: 'Staff of the Friar', itemId: 3415, value: '17.5 DPS, +12 Int, +6 Spi - SM Graveyard: Interrogator Vishas' },
          { name: 'Rod of the Sleepwalker', itemId: 1155, value: '17.7 DPS, +11 Int, +10 Spi - BFD: Kelris' }
        ]
      },
      {
        levelBracket: '25–26',
        itemId: 271766,
        name: 'Heavehammer',
        icon: 'inv_hammer_15',
        weaponType: 'Two-handed mace',
        speed: '3.30',
        dps: '27.7 DPS',
        source: { kind: 'quest', title: 'Elder Knowledge / Lost Relic Carry', detail: 'Excavation Site 4 dungeon quest (+60 Armor, +32 AP)' },
        alts: [
          { name: 'Solid Iron Maul', itemId: 3851, value: '22.8 DPS - Blacksmithing (135)' },
          { name: 'Mighty Iron Hammer', itemId: 3492, value: '25.0 DPS - Blacksmithing (145)' },
          { name: "Dendweller's Hammer", itemId: 284459, value: '25.6 DPS, 3.30s - Level 26 Mace' }
        ]
      },
      {
        levelBracket: '27–28',
        itemId: 273046,
        name: "Guardian's Dualblade",
        icon: 'inv_axe_06',
        weaponType: 'Two-handed axe',
        speed: '3.40',
        dps: '24.6 DPS',
        source: { kind: 'dungeon', title: 'Unstable Sentinel', detail: 'City of Dalaran dungeon (+11 Str, +8 Sta)' },
        alts: [
          { name: 'Striking Staff', itemId: 279844, value: '31.3 DPS, 3.10s, +9 Str, +6 Sta, +14 Int - City of Dalaran Quest: Heart of Disruption' },
          { name: "Healer's Staff", itemId: 271767, value: '20.8 DPS, +67 Healing, 5 MP5 - Excavation Site 4 quest' }
        ]
      },
      {
        levelBracket: '29–30',
        itemId: 280604,
        name: 'Rage of the Storm',
        icon: 'inv_hammer_08',
        weaponType: 'Two-handed mace',
        speed: '3.20',
        dps: '35.6 DPS',
        source: { kind: 'quest', title: "The Tempest's Weapons", detail: 'Level 30 Shaman class chain reward (+12 Int, +15 Sta, +10% Stormstrike damage)' },
        alts: [
          { name: "Lightning's Grasp", itemId: 280607, value: '18.2 DPS, 2.20s, +6 Int, +46 SP, +1% LB crit - Elemental fist choice' },
          { name: "Tidebringer's Claw", itemId: 280605, value: '18.1 DPS, 2.40s, +5 Sta, +86 Healing, +2% HW crit - Resto fist choice' },
          { name: 'Corpsemaker', itemId: 6687, value: '28.9 DPS, 3.80s - RFK: Overlord Ramtusk' },
          { name: 'Striking Staff', itemId: 279844, value: '31.3 DPS - Dalaran quest' }
        ]
      },
      {
        levelBracket: '31–36',
        itemId: 6687,
        name: 'Corpsemaker',
        icon: 'inv_weapon_halbard_01',
        weaponType: 'Two-handed axe',
        speed: '3.80',
        dps: '28.9 DPS',
        source: { kind: 'dungeon', title: 'Overlord Ramtusk', detail: 'Razorfen Kraul (+15 Str, +8 Sta)' },
        alts: [
          { name: 'Rage of the Storm', itemId: 280604, value: '35.6 DPS - Tempest quest weapon dominates into late 30s' },
          { name: 'Manual Crowd Pummeler', itemId: 9449, value: '31.5 DPS, 2.00s - Gnomeregan' },
          { name: 'Massive Iron Axe', itemId: 3855, value: '31.4 DPS - Blacksmithing (185)' }
        ]
      },
      {
        levelBracket: '37–40',
        itemId: 7717,
        name: 'Ravager',
        icon: 'inv_axe_10',
        weaponType: 'Two-handed axe',
        speed: '3.50',
        dps: '37.3 DPS',
        source: { kind: 'dungeon', title: 'Herod', detail: 'Scarlet Monastery Armory (Bladestorm proc procures multiple Windfuries!)' },
        alts: [
          { name: "Mograine's Might", itemId: 7726, value: '38.9 DPS, 3.50s - SM Cath: Mograine' },
          { name: 'Illusionary Rod', itemId: 7713, value: '25.7 DPS, +15 Int, +10 Spi - SM Library: Arcanist Doan' }
        ]
      },
      {
        levelBracket: '41–46',
        itemId: 17730,
        name: 'Gatorbite Axe',
        icon: 'inv_axe_22',
        weaponType: 'Two-handed axe',
        speed: '3.40',
        dps: '45.8 DPS',
        source: { kind: 'dungeon', title: 'Rotgrip', detail: 'Maraudon (+14 Str, +1% Crit)' },
        alts: [
          { name: "Princess Theradras' Scepter", itemId: 17780, value: '47.1 DPS, 3.40s - Maraudon: Princess Theradras' },
          { name: "Executioner's Cleaver", itemId: 13018, value: '42.5 DPS - BoE 2H Axe' }
        ]
      },
      {
        levelBracket: '47–52',
        itemId: 11608,
        name: 'Dark Iron Pulverizer',
        icon: 'inv_hammer_16',
        weaponType: 'Two-handed mace',
        speed: '3.70',
        dps: '47.4 DPS',
        source: { kind: 'craft', title: 'Blacksmithing (265)', detail: 'Plan drops in Blackrock Depths - 8s stun proc' },
        alts: [
          { name: 'Dreadforge Retaliator', itemId: 11931, value: '49.3 DPS, 3.70s - BRD: Emperor Dagran Thaurissan' },
          { name: 'Enchanted Battlehammer', itemId: 12776, value: '48.3 DPS - Blacksmithing (280)' }
        ]
      },
      {
        levelBracket: '53–60',
        itemId: 12784,
        name: 'Arcanite Reaper',
        icon: 'inv_axe_09',
        weaponType: 'Two-handed axe',
        speed: '3.80',
        dps: '53.8 DPS',
        source: { kind: 'craft', title: 'Blacksmithing (275)', detail: 'Slow 3.80s swing speed yields monster Windfury procs' },
        alts: [
          { name: 'The Unstoppable Force', itemId: 18803, value: '61.4 DPS, 3.80s, Stun proc - Alterac Valley Exalted' },
          { name: 'Wisepaw Totem', itemId: 274420, value: '36.9 DPS - Mount Hyjal caster staff' },
          { name: 'Fist of the Damned', itemId: 13399, value: '39.4 DPS - Stratholme' }
        ]
      }
    ]
  },

  mage: {
    classId: 'mage',
    tracks: [
      { id: 'primary', name: 'Wand & Staff Weaving (Frost / Fire)' }
    ],
    levels: [
      {
        levelBracket: '1–2',
        itemId: 1159,
        name: 'Militia Quarterstaff',
        icon: 'inv_staff_08',
        weaponType: 'Staff',
        speed: '2.60',
        dps: '2.7 DPS',
        source: { kind: 'quest', title: 'Brotherhood of Thieves', detail: 'Northshire starter quest reward' },
        alts: [
          { name: 'Walking Stick', itemId: 2495, value: '4.2 DPS - Starter vendor staff' },
          { name: "Novice's Practice Wand", itemId: 247789, value: '4.0 DPS - Starter wand' }
        ]
      },
      {
        levelBracket: '3–4',
        itemId: 2495,
        name: 'Walking Stick',
        icon: 'inv_staff_08',
        weaponType: 'Staff',
        speed: '2.50',
        dps: '4.2 DPS',
        source: { kind: 'vendor', title: 'Weapon Vendor', detail: 'Purchased in starter hub towns' },
        alts: [
          { name: "Novice's Practice Wand", itemId: 247789, value: '4.0 DPS - Enchanting (10)' }
        ]
      },
      {
        levelBracket: '5–6',
        itemId: 11287,
        name: 'Lesser Magic Wand',
        icon: 'inv_wand_01',
        weaponType: 'Wand',
        speed: '1.50',
        dps: '11.3 DPS',
        source: { kind: 'craft', title: 'Enchanting (10)', detail: 'Crafted wand, triple player DPS with zero mana cost!' },
        alts: [
          { name: 'Walking Stick', itemId: 2495, value: '4.2 DPS - Vendor fallback' }
        ]
      },
      {
        levelBracket: '7–8',
        itemId: 248008,
        name: "Apprentice's Spellstaff",
        icon: 'inv_staff_10',
        weaponType: 'Staff',
        speed: '2.40',
        dps: '6.4 DPS',
        source: { kind: 'quest', title: 'Rare Books / Kobold Camp', detail: 'Early quest in starting zones' },
        alts: [
          { name: "Staff of the Dor'Danil", itemId: 15396, value: '8.5 DPS - Teldrassil quest' },
          { name: 'Lesser Magic Wand', itemId: 11287, value: '11.3 DPS - Enchanting (10)' }
        ]
      },
      {
        levelBracket: '9–10',
        itemId: 11287,
        name: 'Lesser Magic Wand',
        icon: 'inv_wand_01',
        weaponType: 'Wand',
        speed: '1.50',
        dps: '11.3 DPS',
        source: { kind: 'craft', title: 'Enchanting (10)', detail: 'Primary leveling damage source while drinking less' },
        alts: [
          { name: 'Pagan Rod', itemId: 6449, value: '8.6 DPS, 1.90s - Vendor wand' },
          { name: "Staff of the Dor'Danil", itemId: 15396, value: '8.5 DPS - Early quest' }
        ]
      },
      {
        levelBracket: '11–12',
        itemId: 11288,
        name: 'Greater Magic Wand',
        icon: 'inv_wand_02',
        weaponType: 'Wand',
        speed: '1.70',
        dps: '17.5 DPS',
        source: { kind: 'craft', title: 'Enchanting (75)', detail: 'Legendary early wand upgrade, out-damages Rank 1 Fireball' },
        alts: [
          { name: 'Oakthrush Staff', itemId: 15397, value: '10.9 DPS - Ashenvale quest' },
          { name: 'Pagan Rod', itemId: 6449, value: '8.6 DPS - Vendor wand' }
        ]
      },
      {
        levelBracket: '13–14',
        itemId: 270228,
        name: 'Golemheart Stave',
        icon: 'inv_staff_20',
        weaponType: 'Staff',
        speed: '2.60',
        dps: '14.2 DPS',
        source: { kind: 'dungeon', title: 'Plunder', detail: 'Hall of Thanes dungeon (+5 Int, +4 Spirit)' },
        alts: [
          { name: 'Staff of Orgrimmar', itemId: 15444, value: '11.8 DPS, +6 Int, +6 Agi, +18 Spell Dmg - RFC: Hidden Enemies (Horde)' },
          { name: 'Greater Magic Wand', itemId: 11288, value: '17.5 DPS - Enchanting (75)' },
          { name: 'Fang of Magmatus', itemId: 270226, value: '11.8 DPS, 1.60s, +2 Agi, +2 Fire SP - Hall of Thanes: Magmatus' }
        ]
      },
      {
        levelBracket: '15–16',
        itemId: 5201,
        name: 'Emberstone Staff',
        icon: 'inv_staff_13',
        weaponType: 'Staff',
        speed: '2.90',
        dps: '14.2 DPS',
        source: { kind: 'dungeon', title: 'Captain Greenskin', detail: 'The Deadmines (+5 Int, +5 Spi)' },
        alts: [
          { name: 'Staff of Orgrimmar', itemId: 15444, value: '11.8 DPS, +6 Int, +6 Agi, +18 Spell Dmg - RFC: Hidden Enemies (Horde)' },
          { name: 'Segmented Spider Leg', itemId: 271102, value: '14.8 DPS, +5 Int, +4 Sta - Ruins of Lordaeron: Witherfang' },
          { name: 'Meathook Slicer', itemId: 271101, value: '13.2 DPS - Ruins of Lordaeron: The Baron' }
        ]
      },
      {
        levelBracket: '17–18',
        itemId: 271105,
        name: 'Coldspire Staff',
        icon: 'inv_staff_08',
        weaponType: 'Staff',
        speed: '2.80',
        dps: '16.8 DPS',
        source: { kind: 'dungeon', title: "Rath'mael", detail: 'Ruins of Lordaeron (+7 Int, +5 Spi, +6 Frost Spell Dmg)' },
        alts: [
          { name: 'Staff of Orgrimmar', itemId: 15444, value: '11.8 DPS, +6 Int, +6 Agi, +18 Spell Dmg - RFC: Hidden Enemies (Horde)' },
          { name: 'Staff of Westfall', itemId: 2042, value: '15.2 DPS, +5 Int, +11 Spi - Deadmines Quest: The Defias Brotherhood' },
          { name: 'Vileblood Scimitar', itemId: 271106, value: '15.0 DPS, 2.20s - Ruins of Lordaeron: Viktor the Vile' }
        ]
      },
      {
        levelBracket: '19–20',
        itemId: 2042,
        name: 'Staff of Westfall',
        icon: 'inv_staff_08',
        weaponType: 'Staff',
        speed: '2.90',
        dps: '15.2 DPS',
        source: { kind: 'quest', title: 'The Defias Brotherhood', detail: 'Deadmines quest reward (+5 Int, +11 Spi)' },
        alts: [
          { name: 'Staff of Orgrimmar', itemId: 15444, value: '11.8 DPS, +6 Int, +6 Agi, +18 Spell Dmg - RFC: Hidden Enemies (Horde)' },
          { name: "Odo's Ley Staff", itemId: 6318, value: '16.0 DPS - SFK: Odo the Blindwatcher' },
          { name: 'Glimmering Staff', itemId: 249392, value: '18.4 DPS, 2.20s, Req Level 25 - Enchanting (140)' }
        ]
      },
      {
        levelBracket: '21–24',
        itemId: 276631,
        name: 'Coldflame Saber',
        icon: 'inv_sword_24',
        weaponType: 'Main Hand Sword',
        speed: '2.00',
        dps: '12.3 DPS',
        source: { kind: 'quest', title: 'Scroll of the Saber & Blade of Silverlaine', detail: 'Custom WoW Forever Mage class quest weapon (+7 Int, +32 Spell Power, 98 Fire dmg on frozen targets, Req Level 21)' },
        alts: [
          { name: 'Rod of the Sleepwalker', itemId: 1155, value: '17.7 DPS, +11 Int, +10 Spi - BFD: Twilight Lord Kelris' },
          { name: 'Lesser Mystic Wand', itemId: 11289, value: '22.2 DPS - Enchanting (155)' },
          { name: 'Meteor Shard', itemId: 6220, value: '17.8 DPS, 1.80s - SFK: Archmage Arugal' }
        ]
      },
      {
        levelBracket: '25–26',
        itemId: 7001,
        name: 'Gravestone Scepter',
        icon: 'inv_wand_02',
        weaponType: 'Wand',
        speed: '1.50',
        dps: '29.0 DPS',
        source: { kind: 'quest', title: 'Blackfathom Villainy', detail: 'BFD quest reward (29.0 DPS melts level 20–35 mobs)' },
        alts: [
          { name: 'Coldflame Saber', itemId: 276631, value: '12.3 DPS, +32 SP, 98 Fire dmg proc - Custom Mage sword' },
          { name: 'Death Prophet Spine', itemId: 274158, value: '18.9 DPS, 2.80s, +11 Sta, +34 SP, 5 MP5 - RFK: Aggem Thorncurse' },
          { name: 'Debt Collector', itemId: 273827, value: '13.0 DPS, 2.30s, +34 SP, Req Level 26 - Stockade: Bazil Thredd' }
        ]
      },
      {
        levelBracket: '27–28',
        itemId: 273040,
        name: 'Spine of the Devourer',
        icon: 'inv_staff_13',
        weaponType: 'Staff',
        speed: '3.60',
        dps: '20.7 DPS',
        source: { kind: 'dungeon', title: 'Mana Devourer', detail: 'City of Dalaran (+14 Sta, +36 Spell Power)' },
        alts: [
          { name: 'Wand of Mana Concentration', itemId: 273043, value: '31.2 DPS, 1.70s, +4 Int, 2 MP5 - City of Dalaran: Arcanic Enigma' },
          { name: 'Tendonscraper Dagger', itemId: 273053, value: '14.4 DPS, +36 SP - City of Dalaran: Lyn the Ignored' }
        ]
      },
      {
        levelBracket: '29–30',
        itemId: 279844,
        name: 'Striking Staff',
        icon: 'inv_staff_20',
        weaponType: 'Staff',
        speed: '3.10',
        dps: '31.3 DPS',
        source: { kind: 'quest', title: 'Heart of Disruption', detail: 'City of Dalaran dungeon quest (+9 Str, +6 Sta, +14 Int)' },
        alts: [
          { name: "Fallen Dragon's Scepter", itemId: 281312, value: '19.9 DPS, 3.40s, +11 Int, +13 Spi, +36 SP - Wetlands Quest: Stopping the Cycle' },
          { name: 'Mindslicer', itemId: 270069, value: '15.3 DPS, +7 Int, +34 SP - Arathi: Call to Arms' },
          { name: "Master Hunter's Wand", itemId: 270084, value: '34.7 DPS, 1.50s - STV Quest: Big Game Hunter' },
          { name: 'Icefury Wand', itemId: 7514, value: '25.3 DPS - Level 30 Mage class quest wand' }
        ]
      },
      {
        levelBracket: '31–35',
        itemId: 7713,
        name: 'Illusionary Rod',
        icon: 'inv_staff_13',
        weaponType: 'Staff',
        speed: '2.90',
        dps: '25.7 DPS',
        source: { kind: 'dungeon', title: 'Arcanist Doan', detail: 'Scarlet Monastery Library (+15 Int, +10 Spi)' },
        alts: [
          { name: 'Hypnotic Blade', itemId: 7714, value: '26.8 DPS, +9 SP, +8 Int - SM Library: Arcanist Doan' },
          { name: 'Twisted Nether Wand', itemId: 249144, value: '25.0 DPS - Craft/Drop' }
        ]
      },
      {
        levelBracket: '36–40',
        itemId: 7713,
        name: 'Illusionary Rod',
        icon: 'inv_staff_13',
        weaponType: 'Staff',
        speed: '2.90',
        dps: '25.7 DPS',
        source: { kind: 'dungeon', title: 'Arcanist Doan', detail: 'Strong stats carry through the late 30s' },
        alts: [
          { name: 'Staff of Jordan', itemId: 873, value: '31.0 DPS, +26 Spell Power - World drop BoE staff' },
          { name: 'Dancing Flame', itemId: 6806, value: '29.2 DPS - World drop wand' },
          { name: 'Rod of Sorrow', itemId: 5247, value: '28.0 DPS - Quest' }
        ]
      },
      {
        levelBracket: '41–46',
        itemId: 9527,
        name: 'Spellshifter Rod',
        icon: 'inv_staff_10',
        weaponType: 'Staff',
        speed: '3.00',
        dps: '31.1 DPS',
        source: { kind: 'quest', title: 'Tiara of the Deep', detail: 'Custom quest reward (+16 Int, +10 Spi)' },
        alts: [
          { name: "Zum'rah's Vexing Cane", itemId: 18082, value: "32.3 DPS, +10 Int, +21 SP - ZF: Witch Doctor Zum'rah" },
          { name: 'Dreambough Wand', itemId: 249234, value: '31.0 DPS - World drop wand' }
        ]
      },
      {
        levelBracket: '47–52',
        itemId: 11750,
        name: 'Kindling Stave',
        icon: 'inv_staff_18',
        weaponType: 'Staff',
        speed: '2.90',
        dps: '34.1 DPS',
        source: { kind: 'dungeon', title: 'Pyromancer Loregrain', detail: 'Blackrock Depths (+12 Int, +20 Spi)' },
        alts: [
          { name: 'Lesser Eternal Wand', itemId: 249232, value: '33.0 DPS - Enchanting (265)' },
          { name: 'Spire of the Stoneshaper', itemId: 11802, value: '33.8 DPS - BRD: Lord Incendius' }
        ]
      },
      {
        levelBracket: '53–60',
        itemId: 274420,
        name: 'Wisepaw Totem',
        icon: 'inv_staff_04',
        weaponType: 'Staff',
        speed: '3.20',
        dps: '36.9 DPS',
        source: { kind: 'vendor', title: 'Dala Fairmaw', detail: 'Mount Hyjal vendor (+Spell Power & Healing)' },
        alts: [
          { name: 'Rod of the Ogre Magi', itemId: 18534, value: '36.0 DPS, +14 Int, +11 Spi, +23 SP, 1% Spell Crit - DM North Tribute Run' },
          { name: 'Witchblade', itemId: 13968, value: '37.2 DPS, 1.80s, +14 SP - Scholomance: Darkmaster Gandling' },
          { name: 'Greater Eternal Wand', itemId: 249237, value: '36.0 DPS - Enchanting (285)' },
          { name: 'Brilliant Wand', itemId: 249385, value: '38.0 DPS - World drop wand' }
        ]
      }
    ]
  },

  warlock: {
    classId: 'warlock',
    tracks: [
      { id: 'primary', name: 'Wand & Staff Progression (Affliction / Demonology)' }
    ],
    levels: [
      {
        levelBracket: '1–2',
        itemId: 1159,
        name: 'Militia Quarterstaff',
        icon: 'inv_staff_08',
        weaponType: 'Staff',
        speed: '2.60',
        dps: '2.7 DPS',
        source: { kind: 'quest', title: 'Brotherhood of Thieves', detail: 'Early starting quest reward' },
        alts: [
          { name: 'Walking Stick', itemId: 2495, value: '4.2 DPS - Starter vendor staff' },
          { name: "Novice's Practice Wand", itemId: 247789, value: '4.0 DPS - Starter wand' }
        ]
      },
      {
        levelBracket: '3–4',
        itemId: 2495,
        name: 'Walking Stick',
        icon: 'inv_staff_08',
        weaponType: 'Staff',
        speed: '2.50',
        dps: '4.2 DPS',
        source: { kind: 'vendor', title: 'Weapon Vendor', detail: 'Sold in starter hub towns' },
        alts: [
          { name: "Novice's Practice Wand", itemId: 247789, value: '4.0 DPS - Enchanting (10)' }
        ]
      },
      {
        levelBracket: '5–6',
        itemId: 11287,
        name: 'Lesser Magic Wand',
        icon: 'inv_wand_01',
        weaponType: 'Wand',
        speed: '1.50',
        dps: '11.3 DPS',
        source: { kind: 'craft', title: 'Enchanting (10)', detail: 'Massive damage jump; wanding while DoTs tick saves full mana pools' },
        alts: [
          { name: 'Walking Stick', itemId: 2495, value: '4.2 DPS - Vendor' }
        ]
      },
      {
        levelBracket: '7–8',
        itemId: 248008,
        name: "Apprentice's Spellstaff",
        icon: 'inv_staff_10',
        weaponType: 'Staff',
        speed: '2.40',
        dps: '6.4 DPS',
        source: { kind: 'quest', title: 'Rare Books / Kobold Camp', detail: 'Starting zone quest reward' },
        alts: [
          { name: "Staff of the Dor'Danil", itemId: 15396, value: '8.5 DPS - Early quest' },
          { name: 'Lesser Magic Wand', itemId: 11287, value: '11.3 DPS - Enchanting (10)' }
        ]
      },
      {
        levelBracket: '9–10',
        itemId: 11287,
        name: 'Lesser Magic Wand',
        icon: 'inv_wand_01',
        weaponType: 'Wand',
        speed: '1.50',
        dps: '11.3 DPS',
        source: { kind: 'craft', title: 'Enchanting (10)', detail: 'Primary leveling weapon' },
        alts: [
          { name: 'Pagan Rod', itemId: 6449, value: '8.6 DPS, 1.90s - Vendor wand' },
          { name: "Staff of the Dor'Danil", itemId: 15396, value: '8.5 DPS - Early quest' }
        ]
      },
      {
        levelBracket: '11–12',
        itemId: 11288,
        name: 'Greater Magic Wand',
        icon: 'inv_wand_02',
        weaponType: 'Wand',
        speed: '1.70',
        dps: '17.5 DPS',
        source: { kind: 'craft', title: 'Enchanting (75)', detail: 'Finishes off mobs swiftly while Spirit recovers mana' },
        alts: [
          { name: 'Oakthrush Staff', itemId: 15397, value: '10.9 DPS - Ashenvale quest' },
          { name: 'Pagan Rod', itemId: 6449, value: '8.6 DPS - Vendor wand' }
        ]
      },
      {
        levelBracket: '13–14',
        itemId: 270228,
        name: 'Golemheart Stave',
        icon: 'inv_staff_20',
        weaponType: 'Staff',
        speed: '2.60',
        dps: '14.2 DPS',
        source: { kind: 'dungeon', title: 'Plunder', detail: 'Hall of Thanes dungeon (+5 Int, +4 Spirit)' },
        alts: [
          { name: 'Staff of Orgrimmar', itemId: 15444, value: '11.8 DPS, +6 Int, +6 Agi, +18 Spell Dmg - RFC: Hidden Enemies (Horde)' },
          { name: 'Greater Magic Wand', itemId: 11288, value: '17.5 DPS - Enchanting (75)' },
          { name: 'Fang of Magmatus', itemId: 270226, value: '11.8 DPS, 1.60s, +2 Agi, +2 Fire SP - Hall of Thanes: Magmatus' }
        ]
      },
      {
        levelBracket: '15–16',
        itemId: 271102,
        name: 'Segmented Spider Leg',
        icon: 'inv_staff_12',
        weaponType: 'Staff',
        speed: '2.70',
        dps: '14.8 DPS',
        source: { kind: 'dungeon', title: 'Witherfang', detail: 'Ruins of Lordaeron, levels 15–20 (+5 Int, +4 Sta)' },
        alts: [
          { name: 'Staff of Orgrimmar', itemId: 15444, value: '11.8 DPS, +6 Int, +6 Agi, +18 Spell Dmg - RFC: Hidden Enemies (Horde)' },
          { name: 'Emberstone Staff', itemId: 5201, value: '14.2 DPS, +5 Int, +5 Spi - Deadmines: Captain Greenskin' },
          { name: 'Meathook Slicer', itemId: 271101, value: '13.2 DPS - Ruins of Lordaeron: The Baron' }
        ]
      },
      {
        levelBracket: '17–18',
        itemId: 271105,
        name: 'Coldspire Staff',
        icon: 'inv_staff_08',
        weaponType: 'Staff',
        speed: '2.80',
        dps: '16.8 DPS',
        source: { kind: 'dungeon', title: "Rath'mael", detail: 'Ruins of Lordaeron (+7 Int, +5 Spi, +6 Frost Dmg)' },
        alts: [
          { name: 'Staff of Orgrimmar', itemId: 15444, value: '11.8 DPS, +6 Int, +6 Agi, +18 Spell Dmg - RFC: Hidden Enemies (Horde)' },
          { name: 'Staff of Westfall', itemId: 2042, value: '15.2 DPS, +5 Int, +11 Spi - Deadmines Quest: The Defias Brotherhood' },
          { name: 'Vileblood Scimitar', itemId: 271106, value: '15.0 DPS, 2.20s - Ruins of Lordaeron: Viktor' }
        ]
      },
      {
        levelBracket: '19–20',
        itemId: 6318,
        name: "Odo's Ley Staff",
        icon: 'inv_staff_08',
        weaponType: 'Staff',
        speed: '2.70',
        dps: '16.0 DPS',
        source: { kind: 'dungeon', title: 'Odo the Blindwatcher', detail: 'Shadowfang Keep (+4 Int, +5 Spi)' },
        alts: [
          { name: 'Staff of Orgrimmar', itemId: 15444, value: '11.8 DPS, +6 Int, +6 Agi, +18 Spell Dmg - RFC: Hidden Enemies (Horde)' },
          { name: 'Staff of Westfall', itemId: 2042, value: '15.2 DPS - Deadmines Quest' },
          { name: 'Glimmering Staff', itemId: 249392, value: '18.4 DPS, 2.20s, Req Level 25 - Enchanting (140)' }
        ]
      },
      {
        levelBracket: '21–24',
        itemId: 15109,
        name: "Staff of Soran'ruk",
        icon: 'inv_staff_13',
        weaponType: 'Staff',
        speed: '2.90',
        dps: '15.7 DPS',
        source: { kind: 'quest', title: "The Orb of Soran'ruk", detail: 'Warlock class quest weapon (+16 Shadow Spell Damage)' },
        alts: [
          { name: 'Rod of the Sleepwalker', itemId: 1155, value: '17.7 DPS, +11 Int, +10 Spi - BFD: Twilight Lord Kelris' },
          { name: 'Lesser Mystic Wand', itemId: 11289, value: '22.2 DPS - Enchanting (155)' },
          { name: 'Meteor Shard', itemId: 6220, value: '17.8 DPS - SFK: Archmage Arugal' }
        ]
      },
      {
        levelBracket: '25–26',
        itemId: 7001,
        name: 'Gravestone Scepter',
        icon: 'inv_wand_02',
        weaponType: 'Wand',
        speed: '1.50',
        dps: '29.0 DPS',
        source: { kind: 'quest', title: 'Blackfathom Villainy', detail: 'BFD quest reward (29.0 DPS melts level 20–35 mobs)' },
        alts: [
          { name: 'Death Prophet Spine', itemId: 274158, value: '18.9 DPS, 2.80s, +11 Sta, +34 SP, 5 MP5 - RFK: Aggem Thorncurse' },
          { name: 'Debt Collector', itemId: 273827, value: '13.0 DPS, 2.30s, +34 SP, Req Level 26 - Stockade: Bazil Thredd' }
        ]
      },
      {
        levelBracket: '27–28',
        itemId: 273040,
        name: 'Spine of the Devourer',
        icon: 'inv_staff_13',
        weaponType: 'Staff',
        speed: '3.60',
        dps: '20.7 DPS',
        source: { kind: 'dungeon', title: 'Mana Devourer', detail: 'City of Dalaran (+14 Sta, +36 Spell Power)' },
        alts: [
          { name: 'Wand of Mana Concentration', itemId: 273043, value: '31.2 DPS, 1.70s, +4 Int, 2 MP5 - City of Dalaran: Arcanic Enigma' },
          { name: 'Tendonscraper Dagger', itemId: 273053, value: '14.4 DPS, +36 SP - City of Dalaran: Lyn the Ignored' }
        ]
      },
      {
        levelBracket: '29–30',
        itemId: 279847,
        name: 'Unstable Power Core',
        icon: 'inv_wand_04',
        weaponType: 'Wand',
        speed: '1.70',
        dps: '29.7 DPS',
        source: { kind: 'quest', title: 'Source of Power', detail: 'City of Dalaran quest reward (+4 Sta, 29.7 DPS)' },
        alts: [
          { name: "Fallen Dragon's Scepter", itemId: 281312, value: '19.9 DPS, 3.40s, +11 Int, +13 Spi, +36 SP - Wetlands Quest: Stopping the Cycle' },
          { name: 'Mindslicer', itemId: 270069, value: '15.3 DPS, +7 Int, +34 SP - Arathi: Call to Arms' },
          { name: "Master Hunter's Wand", itemId: 270084, value: '34.7 DPS, 1.50s - STV Quest: Big Game Hunter' },
          { name: 'Debt Collector', itemId: 273827, value: '13.0 DPS, 2.30s, +34 SP - Stockade: Bazil Thredd' }
        ]
      },
      {
        levelBracket: '31–35',
        itemId: 7713,
        name: 'Illusionary Rod',
        icon: 'inv_staff_13',
        weaponType: 'Staff',
        speed: '2.90',
        dps: '25.7 DPS',
        source: { kind: 'dungeon', title: 'Arcanist Doan', detail: 'Scarlet Monastery Library (+15 Int, +10 Spi)' },
        alts: [
          { name: 'Hypnotic Blade', itemId: 7714, value: '26.8 DPS, +9 SP, +8 Int - SM Library: Arcanist Doan' },
          { name: 'Twisted Nether Wand', itemId: 249144, value: '25.0 DPS - Craft/Drop' }
        ]
      },
      {
        levelBracket: '36–40',
        itemId: 7713,
        name: 'Illusionary Rod',
        icon: 'inv_staff_13',
        weaponType: 'Staff',
        speed: '2.90',
        dps: '25.7 DPS',
        source: { kind: 'dungeon', title: 'Arcanist Doan', detail: 'Outstanding caster stats carry through 40' },
        alts: [
          { name: 'Staff of Jordan', itemId: 873, value: '31.0 DPS, +26 Spell Power - World drop BoE staff' },
          { name: 'Dancing Flame', itemId: 6806, value: '29.2 DPS - World drop wand' },
          { name: 'Rod of Sorrow', itemId: 5247, value: '28.0 DPS - Quest' }
        ]
      },
      {
        levelBracket: '41–46',
        itemId: 9527,
        name: 'Spellshifter Rod',
        icon: 'inv_staff_10',
        weaponType: 'Staff',
        speed: '3.00',
        dps: '31.1 DPS',
        source: { kind: 'quest', title: 'Tiara of the Deep', detail: 'Custom quest reward (+16 Int, +10 Spi)' },
        alts: [
          { name: "Zum'rah's Vexing Cane", itemId: 18082, value: "32.3 DPS, +10 Int, +21 SP - ZF: Witch Doctor Zum'rah" },
          { name: 'Dreambough Wand', itemId: 249234, value: '31.0 DPS - World drop wand' }
        ]
      },
      {
        levelBracket: '47–50',
        itemId: 20536,
        name: 'Soul Harvester',
        icon: 'inv_weapon_halberd_01',
        weaponType: 'Staff',
        speed: '3.30',
        dps: '33.5 DPS',
        source: { kind: 'quest', title: 'Trolls of a Feather', detail: 'Level 50 Warlock class quest in Sunken Temple (+16 Sta, +24 Shadow SP, Drain Life proc)' },
        alts: [
          { name: 'Kindling Stave', itemId: 11750, value: '34.1 DPS - BRD: Pyromancer Loregrain' },
          { name: 'Lesser Eternal Wand', itemId: 249232, value: '33.0 DPS - Enchanting (265)' }
        ]
      },
      {
        levelBracket: '51–60',
        itemId: 20536,
        name: 'Soul Harvester',
        icon: 'inv_weapon_halberd_01',
        weaponType: 'Staff',
        speed: '3.30',
        dps: '33.5 DPS',
        source: { kind: 'quest', title: 'Trolls of a Feather', detail: 'Legendary warlock class scythe' },
        alts: [
          { name: 'Wisepaw Totem', itemId: 274420, value: '36.9 DPS - Mount Hyjal vendor' },
          { name: 'Rod of the Ogre Magi', itemId: 18534, value: '36.0 DPS, +14 Int, +11 Spi, +23 SP, 1% Spell Crit - DM North Tribute Run' },
          { name: 'Witchblade', itemId: 13968, value: '37.2 DPS, 1.80s, +14 SP - Scholomance: Darkmaster Gandling' },
          { name: 'Greater Eternal Wand', itemId: 249237, value: '36.0 DPS - Enchanting (285)' },
          { name: 'Brilliant Wand', itemId: 249385, value: '38.0 DPS - World drop wand' }
        ]
      }
    ]
  },

  priest: {
    classId: 'priest',
    tracks: [
      { id: 'primary', name: 'Wand & Staff Mastery (Discipline / Shadow)' }
    ],
    levels: [
      {
        levelBracket: '1–2',
        itemId: 247789,
        name: "Novice's Practice Wand",
        icon: 'inv_wand_01',
        weaponType: 'Wand',
        speed: '1.50',
        dps: '4.0 DPS',
        source: { kind: 'craft', title: 'Enchanting (10)', detail: 'Priest wanding engine starts here' },
        alts: [
          { name: 'Short Staff', itemId: 2132, value: '2.0 DPS - Starter vendor staff' }
        ]
      },
      {
        levelBracket: '3–4',
        itemId: 2495,
        name: 'Walking Stick',
        icon: 'inv_staff_08',
        weaponType: 'Staff',
        speed: '2.50',
        dps: '4.2 DPS',
        source: { kind: 'vendor', title: 'Weapon Vendor', detail: 'Purchased in starter hub towns' },
        alts: [
          { name: "Novice's Practice Wand", itemId: 247789, value: '4.0 DPS - Starter wand' }
        ]
      },
      {
        levelBracket: '5–6',
        itemId: 11287,
        name: 'Lesser Magic Wand',
        icon: 'inv_wand_01',
        weaponType: 'Wand',
        speed: '1.50',
        dps: '11.3 DPS',
        source: { kind: 'craft', title: 'Enchanting (10)', detail: 'Massive early damage surge with Wand Specialization (25% extra damage)' },
        alts: [
          { name: 'Walking Stick', itemId: 2495, value: '4.2 DPS - Vendor' }
        ]
      },
      {
        levelBracket: '7–8',
        itemId: 248008,
        name: "Apprentice's Spellstaff",
        icon: 'inv_staff_10',
        weaponType: 'Staff',
        speed: '2.40',
        dps: '6.4 DPS',
        source: { kind: 'quest', title: 'Rare Books / Kobold Camp', detail: 'Early starting quest reward' },
        alts: [
          { name: "Staff of the Dor'Danil", itemId: 15396, value: '8.5 DPS - Early quest' },
          { name: 'Lesser Magic Wand', itemId: 11287, value: '11.3 DPS - Enchanting (10)' }
        ]
      },
      {
        levelBracket: '9–10',
        itemId: 11287,
        name: 'Lesser Magic Wand',
        icon: 'inv_wand_01',
        weaponType: 'Wand',
        speed: '1.50',
        dps: '11.3 DPS',
        source: { kind: 'craft', title: 'Enchanting (10)', detail: 'Enables high mana regeneration via the 5-second rule while wanding' },
        alts: [
          { name: 'Pagan Rod', itemId: 6449, value: '8.6 DPS, 1.90s - Vendor wand' },
          { name: "Staff of the Dor'Danil", itemId: 15396, value: '8.5 DPS - Early quest' }
        ]
      },
      {
        levelBracket: '11–12',
        itemId: 11288,
        name: 'Greater Magic Wand',
        icon: 'inv_wand_02',
        weaponType: 'Wand',
        speed: '1.70',
        dps: '17.5 DPS',
        source: { kind: 'craft', title: 'Enchanting (75)', detail: 'Kills mobs with almost zero mana consumption' },
        alts: [
          { name: 'Oakthrush Staff', itemId: 15397, value: '10.9 DPS - Ashenvale quest' },
          { name: 'Pagan Rod', itemId: 6449, value: '8.6 DPS - Vendor wand' }
        ]
      },
      {
        levelBracket: '13–14',
        itemId: 270228,
        name: 'Golemheart Stave',
        icon: 'inv_staff_20',
        weaponType: 'Staff',
        speed: '2.60',
        dps: '14.2 DPS',
        source: { kind: 'dungeon', title: 'Plunder', detail: 'Hall of Thanes dungeon (+5 Int, +4 Spirit)' },
        alts: [
          { name: 'Staff of Orgrimmar', itemId: 15444, value: '11.8 DPS, +6 Int, +6 Agi, +18 Spell Dmg - RFC: Hidden Enemies (Horde)' },
          { name: 'Greater Magic Wand', itemId: 11288, value: '17.5 DPS - Enchanting (75)' },
          { name: 'Trogg Scepter', itemId: 272996, value: '8.1 DPS, 2.40s - RFC: Oggleflint 1H mace' }
        ]
      },
      {
        levelBracket: '15–16',
        itemId: 271103,
        name: 'Scepter of the Abandoned',
        icon: 'inv_mace_01',
        weaponType: 'One-handed mace',
        speed: '2.20',
        dps: '14.0 DPS',
        source: { kind: 'dungeon', title: 'The Abandoned', detail: 'Ruins of Lordaeron (+4 Sta, +4 Int)' },
        alts: [
          { name: 'Staff of Orgrimmar', itemId: 15444, value: '11.8 DPS, +6 Int, +6 Agi, +18 Spell Dmg - RFC: Hidden Enemies (Horde)' },
          { name: 'Segmented Spider Leg', itemId: 271102, value: '14.8 DPS, +5 Int, +4 Sta - Ruins of Lordaeron: Witherfang' },
          { name: 'Emberstone Staff', itemId: 5201, value: '14.2 DPS - Deadmines: Captain Greenskin' }
        ]
      },
      {
        levelBracket: '17–18',
        itemId: 271105,
        name: 'Coldspire Staff',
        icon: 'inv_staff_08',
        weaponType: 'Staff',
        speed: '2.80',
        dps: '16.8 DPS',
        source: { kind: 'dungeon', title: "Rath'mael", detail: 'Ruins of Lordaeron (+7 Int, +5 Spi, +6 Frost Dmg)' },
        alts: [
          { name: 'Staff of Orgrimmar', itemId: 15444, value: '11.8 DPS, +6 Int, +6 Agi, +18 Spell Dmg - RFC: Hidden Enemies (Horde)' },
          { name: 'Staff of Westfall', itemId: 2042, value: '15.2 DPS, +5 Int, +11 Spi - Deadmines Quest: The Defias Brotherhood' },
          { name: 'Living Root', itemId: 6631, value: '14.7 DPS - WC: Verdan the Everliving' }
        ]
      },
      {
        levelBracket: '19–20',
        itemId: 2042,
        name: 'Staff of Westfall',
        icon: 'inv_staff_08',
        weaponType: 'Staff',
        speed: '2.90',
        dps: '15.2 DPS',
        source: { kind: 'quest', title: 'The Defias Brotherhood', detail: 'Deadmines quest reward (+5 Int, +11 Spi)' },
        alts: [
          { name: 'Staff of Orgrimmar', itemId: 15444, value: '11.8 DPS, +6 Int, +6 Agi, +18 Spell Dmg - RFC: Hidden Enemies (Horde)' },
          { name: "Odo's Ley Staff", itemId: 6318, value: '16.0 DPS - SFK: Odo the Blindwatcher' },
          { name: 'Glimmering Staff', itemId: 249392, value: '18.4 DPS, 2.20s, Req Level 25 - Enchanting (140)' }
        ]
      },
      {
        levelBracket: '21–24',
        itemId: 7001,
        name: 'Gravestone Scepter',
        icon: 'inv_wand_02',
        weaponType: 'Wand',
        speed: '1.50',
        dps: '29.0 DPS',
        source: { kind: 'quest', title: 'Blackfathom Villainy', detail: 'BFD quest reward (God-tier 29.0 DPS wand)' },
        alts: [
          { name: 'Rod of the Sleepwalker', itemId: 1155, value: '17.7 DPS, +11 Int, +10 Spi - BFD: Twilight Lord Kelris' },
          { name: 'Lesser Mystic Wand', itemId: 11289, value: '22.2 DPS - Enchanting (155)' }
        ]
      },
      {
        levelBracket: '25–26',
        itemId: 7001,
        name: 'Gravestone Scepter',
        icon: 'inv_wand_02',
        weaponType: 'Wand',
        speed: '1.50',
        dps: '29.0 DPS',
        source: { kind: 'quest', title: 'Blackfathom Villainy', detail: 'Remains top-tier through level 35' },
        alts: [
          { name: 'Death Prophet Spine', itemId: 274158, value: '18.9 DPS, 2.80s, +11 Sta, +34 SP, 5 MP5 - RFK: Aggem Thorncurse' },
          { name: 'Crested Scepter', itemId: 3414, value: '17.5 DPS - SM Graveyard: Fallen Champion' }
        ]
      },
      {
        levelBracket: '27–28',
        itemId: 273043,
        name: 'Wand of Mana Concentration',
        icon: 'inv_wand_04',
        weaponType: 'Wand',
        speed: '1.70',
        dps: '31.2 DPS',
        source: { kind: 'dungeon', title: 'Arcanic Enigma', detail: 'City of Dalaran (+4 Int, 2 MP5, Req Level 27)' },
        alts: [
          { name: 'Spine of the Devourer', itemId: 273040, value: '20.7 DPS, +36 SP - City of Dalaran: Mana Devourer' },
          { name: 'Tendonscraper Dagger', itemId: 273053, value: '14.4 DPS, +36 SP - City of Dalaran: Lyn the Ignored' }
        ]
      },
      {
        levelBracket: '29–30',
        itemId: 271767,
        name: "Healer's Staff",
        icon: 'inv_staff_13',
        weaponType: 'Staff',
        speed: '2.60',
        dps: '20.8 DPS',
        source: { kind: 'quest', title: 'Lost Relic Carry / Elder Knowledge', detail: 'Excavation Site 4 dungeon quest (+12 Sta, +67 Healing, 5 MP5)' },
        alts: [
          { name: "Fallen Dragon's Scepter", itemId: 281312, value: '19.9 DPS, 3.40s, +11 Int, +13 Spi, +36 SP - Wetlands Quest: Stopping the Cycle' },
          { name: "Madman's Blade", itemId: 270070, value: '14.7 DPS, 1.90s, +7 Spi, +32 SP - STV Quest: Colonel Kurzen' },
          { name: 'Mindslicer', itemId: 270069, value: '15.3 DPS, +7 Int, +34 SP - Arathi: Call to Arms' },
          { name: "Master Hunter's Wand", itemId: 270084, value: '34.7 DPS, 1.50s - STV: Big Game Hunter' }
        ]
      },
      {
        levelBracket: '31–35',
        itemId: 7713,
        name: 'Illusionary Rod',
        icon: 'inv_staff_13',
        weaponType: 'Staff',
        speed: '2.90',
        dps: '25.7 DPS',
        source: { kind: 'dungeon', title: 'Arcanist Doan', detail: 'Scarlet Monastery Library (+15 Int, +10 Spi)' },
        alts: [
          { name: 'Staff of the Friar', itemId: 3415, value: '17.5 DPS, +12 Int, +6 Spi - SM Graveyard: Interrogator Vishas' },
          { name: 'Twisted Nether Wand', itemId: 249144, value: '25.0 DPS - Craft/Drop' }
        ]
      },
      {
        levelBracket: '36–40',
        itemId: 7713,
        name: 'Illusionary Rod',
        icon: 'inv_staff_13',
        weaponType: 'Staff',
        speed: '2.90',
        dps: '25.7 DPS',
        source: { kind: 'dungeon', title: 'Arcanist Doan', detail: 'Reliable high spirit caster weapon' },
        alts: [
          { name: 'Staff of Jordan', itemId: 873, value: '31.0 DPS, +26 Spell Power - World drop BoE staff' },
          { name: 'Dancing Flame', itemId: 6806, value: '29.2 DPS - World drop wand' },
          { name: 'Rod of Sorrow', itemId: 5247, value: '28.0 DPS - Quest' }
        ]
      },
      {
        levelBracket: '41–46',
        itemId: 9527,
        name: 'Spellshifter Rod',
        icon: 'inv_staff_10',
        weaponType: 'Staff',
        speed: '3.00',
        dps: '31.1 DPS',
        source: { kind: 'quest', title: 'Tiara of the Deep', detail: 'Custom quest reward (+16 Int, +10 Spi)' },
        alts: [
          { name: "Zum'rah's Vexing Cane", itemId: 18082, value: "32.3 DPS, +10 Int, +21 SP - ZF: Witch Doctor Zum'rah" },
          { name: 'Dreambough Wand', itemId: 249234, value: '31.0 DPS - World drop wand' }
        ]
      },
      {
        levelBracket: '47–52',
        itemId: 11750,
        name: 'Kindling Stave',
        icon: 'inv_staff_18',
        weaponType: 'Staff',
        speed: '2.90',
        dps: '34.1 DPS',
        source: { kind: 'dungeon', title: 'Pyromancer Loregrain', detail: 'Blackrock Depths (+12 Int, +20 Spi)' },
        alts: [
          { name: 'Lesser Eternal Wand', itemId: 249232, value: '33.0 DPS - Enchanting (265)' },
          { name: 'Spire of the Stoneshaper', itemId: 11802, value: '33.8 DPS - BRD: Lord Incendius' }
        ]
      },
      {
        levelBracket: '53–60',
        itemId: 274420,
        name: 'Wisepaw Totem',
        icon: 'inv_staff_04',
        weaponType: 'Staff',
        speed: '3.20',
        dps: '36.9 DPS',
        source: { kind: 'vendor', title: 'Dala Fairmaw', detail: 'Mount Hyjal vendor (+Spell Power & Healing)' },
        alts: [
          { name: 'Benediction', itemId: 18608, value: '43.4 DPS, +31 Int, +12 Sta, +12 Spi, +106 Healing - Legendary Priest Quest Staff!' },
          { name: 'Rod of the Ogre Magi', itemId: 18534, value: '36.0 DPS, +14 Int, +11 Spi, +23 SP, 1% Spell Crit - DM North Tribute Run' },
          { name: 'Greater Eternal Wand', itemId: 249237, value: '36.0 DPS - Enchanting (285)' },
          { name: 'Brilliant Wand', itemId: 249385, value: '38.0 DPS - World drop wand' }
        ]
      }
    ]
  },

  druid: {
    classId: 'druid',
    tracks: [
      { id: 'primary', name: 'Feral & Balance (Staves & Two-Handed Maces)' }
    ],
    levels: [
      {
        levelBracket: '1–2',
        itemId: 2132,
        name: 'Short Staff',
        icon: 'inv_staff_08',
        weaponType: 'Staff',
        speed: '2.20',
        dps: '2.0 DPS',
        source: { kind: 'vendor', title: 'Weapon Vendor', detail: 'Purchased in starting zones (Shadowglen, Camp Narache)' },
        alts: [
          { name: 'Club', itemId: 2491, value: '1.8 DPS - Starter vendor mace' }
        ]
      },
      {
        levelBracket: '3–4',
        itemId: 2493,
        name: 'Wooden Mallet',
        icon: 'inv_hammer_18',
        weaponType: 'Two-handed mace',
        speed: '2.60',
        dps: '5.0 DPS',
        source: { kind: 'vendor', title: 'Weapon Vendor', detail: 'Sold in Dolanaar, Bloodhoof Village' },
        alts: [
          { name: 'Walking Stick', itemId: 2495, value: '4.2 DPS - Vendor staff' },
          { name: 'Large Club', itemId: 2492, value: '3.8 DPS - Vendor 2H mace' }
        ]
      },
      {
        levelBracket: '5–6',
        itemId: 2492,
        name: 'Large Club',
        icon: 'inv_mace_04',
        weaponType: 'Two-handed mace',
        speed: '2.70',
        dps: '3.8 DPS',
        source: { kind: 'vendor', title: 'Weapon Vendor', detail: 'Town weapon vendors' },
        alts: [
          { name: 'Copper Mace', itemId: 2844, value: '3.8 DPS - Blacksmithing (15)' },
          { name: 'Walking Stick', itemId: 2495, value: '4.2 DPS - Vendor staff' }
        ]
      },
      {
        levelBracket: '7–8',
        itemId: 9603,
        name: 'Gritroot Staff',
        icon: 'inv_staff_08',
        weaponType: 'Staff',
        speed: '2.50',
        dps: '5.4 DPS',
        source: { kind: 'quest', title: 'The Relics of Wakening', detail: 'Teldrassil early quest reward' },
        alts: [
          { name: "Staff of the Dor'Danil", itemId: 15396, value: '8.5 DPS - Teldrassil quest' },
          { name: "Apprentice's Spellstaff", itemId: 248008, value: '6.4 DPS - Early quest' }
        ]
      },
      {
        levelBracket: '9–10',
        itemId: 1197,
        name: 'Giant Mace',
        icon: 'inv_mace_01',
        weaponType: 'Two-handed mace',
        speed: '3.50',
        dps: '9.0 DPS',
        source: { kind: 'vendor', title: 'Weapon Vendor', detail: 'Sold in Auberdine, Bloodhoof, Crossroads' },
        alts: [
          { name: "Staff of the Dor'Danil", itemId: 15396, value: '8.5 DPS - Early quest' },
          { name: 'Trogg Scepter', itemId: 272996, value: '8.1 DPS, 2.40s - RFC: Oggleflint 1H mace' }
        ]
      },
      {
        levelBracket: '11–12',
        itemId: 6214,
        name: 'Heavy Copper Maul',
        icon: 'inv_hammer_14',
        weaponType: 'Two-handed mace',
        speed: '3.30',
        dps: '10.8 DPS',
        source: { kind: 'craft', title: 'Blacksmithing (40)', detail: 'Guaranteed crafted spike for early Bear Form auto-attacks' },
        alts: [
          { name: 'Oakthrush Staff', itemId: 15397, value: '10.9 DPS - Ashenvale quest' },
          { name: 'Trogg Scepter', itemId: 272996, value: '8.1 DPS - RFC: Oggleflint' }
        ]
      },
      {
        levelBracket: '13–14',
        itemId: 270228,
        name: 'Golemheart Stave',
        icon: 'inv_staff_20',
        weaponType: 'Staff',
        speed: '2.60',
        dps: '14.2 DPS',
        source: { kind: 'dungeon', title: 'Plunder', detail: 'Hall of Thanes dungeon (+5 Int, +4 Spirit)' },
        alts: [
          { name: 'Staff of Orgrimmar', itemId: 15444, value: '11.8 DPS, +6 Int, +6 Agi, +18 Spell Dmg - RFC: Hidden Enemies (Horde Caster / Feral)' },
          { name: 'Ironforge Greathammer', itemId: 279895, value: '16.0 DPS - Hall of Thanes dungeon quest' },
          { name: 'Oakthrush Staff', itemId: 15397, value: '10.9 DPS - Ashenvale quest' }
        ]
      },
      {
        levelBracket: '15–16',
        itemId: 6631,
        name: 'Living Root',
        icon: 'inv_staff_12',
        weaponType: 'Staff',
        speed: '2.90',
        dps: '14.7 DPS',
        source: { kind: 'dungeon', title: 'Verdan the Everliving', detail: 'Wailing Caverns (+5 Spi, +5 Sta, Root on hit)' },
        alts: [
          { name: 'Staff of Orgrimmar', itemId: 15444, value: '11.8 DPS, +6 Int, +6 Agi, +18 Spell Dmg - RFC: Hidden Enemies (Horde Caster / Feral)' },
          { name: 'Segmented Spider Leg', itemId: 271102, value: '14.8 DPS, +5 Int, +4 Sta - Ruins of Lordaeron: Witherfang' },
          { name: 'Scepter of the Abandoned', itemId: 271103, value: '14.0 DPS - Ruins of Lordaeron: The Abandoned' }
        ]
      },
      {
        levelBracket: '17–18',
        itemId: 7230,
        name: "Smite's Mighty Hammer",
        icon: 'inv_hammer_18',
        weaponType: 'Two-handed mace',
        speed: '3.50',
        dps: '19.7 DPS',
        source: { kind: 'dungeon', title: 'Mr. Smite', detail: 'The Deadmines (+11 Str, +4 Agi)' },
        alts: [
          { name: 'Staff of Orgrimmar', itemId: 15444, value: '11.8 DPS, +6 Int, +6 Agi, +18 Spell Dmg - RFC quest (great hybrid stats)' },
          { name: 'Coldspire Staff', itemId: 271105, value: '16.8 DPS, +7 Int, +5 Spi - Ruins of Lordaeron: Rath\'mael' },
          { name: 'Staff of Westfall', itemId: 2042, value: '15.2 DPS - Deadmines quest' }
        ]
      },
      {
        levelBracket: '19–20',
        itemId: 6505,
        name: 'Crescent Staff',
        icon: 'inv_staff_20',
        weaponType: 'Staff',
        speed: '2.90',
        dps: '15.3 DPS',
        source: { kind: 'quest', title: 'Leaders of the Fang', detail: 'Wailing Caverns quest (+7 Int, +7 Spi, +7 Sta)' },
        alts: [
          { name: 'Staff of Orgrimmar', itemId: 15444, value: '11.8 DPS, +6 Int, +6 Agi, +18 Spell Dmg - RFC quest (great hybrid stats)' },
          { name: 'Bronze Warhammer', itemId: 7956, value: '17.4 DPS - Blacksmithing (90)' },
          { name: 'Staff of Westfall', itemId: 2042, value: '15.2 DPS - Deadmines quest' }
        ]
      },
      {
        levelBracket: '21–22',
        itemId: 6318,
        name: "Odo's Ley Staff",
        icon: 'inv_staff_08',
        weaponType: 'Staff',
        speed: '2.70',
        dps: '16.0 DPS',
        source: { kind: 'dungeon', title: 'Odo the Blindwatcher', detail: 'Shadowfang Keep (+4 Int, +5 Spi)' },
        alts: [
          { name: 'Glimmering Staff', itemId: 249392, value: '18.4 DPS, 2.20s, Req Level 25 - Enchanting (140)' },
          { name: "Subdued Dragon's Fang", itemId: 281314, value: '20.6 DPS, 1.70s, +7 Agi - Wetlands: Stopping the Cycle' }
        ]
      },
      {
        levelBracket: '23–24',
        itemId: 1155,
        name: 'Rod of the Sleepwalker',
        icon: 'inv_staff_13',
        weaponType: 'Staff',
        speed: '2.70',
        dps: '17.7 DPS',
        source: { kind: 'dungeon', title: 'Twilight Lord Kelris', detail: 'Blackfathom Deeps (+11 Int, +10 Spi)' },
        alts: [
          { name: 'Staff of the Friar', itemId: 3415, value: '17.5 DPS - SM Graveyard: Interrogator Vishas' },
          { name: "Subdued Dragon's Fang", itemId: 281314, value: '20.6 DPS, 1.70s, +7 Agi - Wetlands: Stopping the Cycle' }
        ]
      },
      {
        levelBracket: '25–26',
        itemId: 271766,
        name: 'Heavehammer',
        icon: 'inv_hammer_15',
        weaponType: 'Two-handed mace',
        speed: '3.30',
        dps: '27.7 DPS',
        source: { kind: 'quest', title: 'Lost Relic Carry / Elder Knowledge', detail: 'Excavation Site 4 dungeon quest (+60 Armor, +32 AP)' },
        alts: [
          { name: "Dendweller's Hammer", itemId: 284459, value: '25.6 DPS, 3.30s - Level 26 Mace' },
          { name: 'Solid Iron Maul', itemId: 3851, value: '22.8 DPS - Blacksmithing (135)' },
          { name: 'Death Prophet Spine', itemId: 274158, value: '18.9 DPS, +34 SP, 5 MP5 - RFK: Aggem Thorncurse' }
        ]
      },
      {
        levelBracket: '27–28',
        itemId: 279841,
        name: 'Defender of Dalaran',
        icon: 'inv_hammer_08',
        weaponType: 'Two-handed mace',
        speed: '3.30',
        dps: '31.2 DPS',
        source: { kind: 'quest', title: 'Heart of Disruption', detail: 'City of Dalaran quest reward (+9 Str, +13 Sta, +9 Int)' },
        alts: [
          { name: 'Striking Staff', itemId: 279844, value: '31.3 DPS, 3.10s, +9 Str, +6 Sta, +14 Int - City of Dalaran Quest: Heart of Disruption' },
          { name: 'Spine of the Devourer', itemId: 273040, value: '20.7 DPS, +36 SP - City of Dalaran: Mana Devourer' },
          { name: 'Felbough Arm', itemId: 273037, value: '28.8 DPS, 3.00s, +10 Agi, +10 Hit - City of Dalaran: Fel Ancient' }
        ]
      },
      {
        levelBracket: '29–30',
        itemId: 9449,
        name: 'Manual Crowd Pummeler',
        icon: 'inv_hammer_16',
        weaponType: 'Two-handed mace',
        speed: '2.00',
        dps: '31.5 DPS',
        source: { kind: 'dungeon', title: 'Crowd Pummeler 9-60', detail: 'Gnomeregan (+50% attack speed on-use for 30s - BiS Feral Cat & Bear weapon!)' },
        alts: [
          { name: "Healer's Staff", itemId: 271767, value: '20.8 DPS, 2.60s, +12 Sta, +67 Healing, 5 MP5 - Excavation Site 4 quest' },
          { name: 'Dark Hearted Hammer', itemId: 270071, value: '28.9 DPS, 3.80s, +12 Str, +8 Sta - STV Quest: Colonel Kurzen' },
          { name: "Fallen Dragon's Scepter", itemId: 281312, value: '19.9 DPS, 3.40s, +11 Int, +13 Spi, +36 SP - Wetlands Quest: Stopping the Cycle' }
        ]
      },
      {
        levelBracket: '31–35',
        itemId: 9449,
        name: 'Manual Crowd Pummeler',
        icon: 'inv_hammer_16',
        weaponType: 'Two-handed mace',
        speed: '2.00',
        dps: '31.5 DPS',
        source: { kind: 'dungeon', title: 'Crowd Pummeler 9-60', detail: 'The 50% haste active makes this legendary for all druids' },
        alts: [
          { name: 'Illusionary Rod', itemId: 7713, value: '25.7 DPS, +15 Int, +10 Spi - SM Library: Arcanist Doan' },
          { name: 'Rock Pulverizer', itemId: 4983, value: '28.4 DPS, 3.20s - Badlands Quest: Murdaloc' }
        ]
      },
      {
        levelBracket: '36–40',
        itemId: 7726,
        name: "Mograine's Might",
        icon: 'inv_hammer_08',
        weaponType: 'Two-handed mace',
        speed: '3.50',
        dps: '38.9 DPS',
        source: { kind: 'dungeon', title: 'Scarlet Commander Mograine', detail: 'Scarlet Monastery Cathedral (+16 Str, +17 Sta)' },
        alts: [
          { name: 'Staff of Jordan', itemId: 873, value: '31.0 DPS, +26 Spell Power - World drop BoE staff' },
          { name: 'Archeus', itemId: 2000, value: '30.8 DPS - Duskwood quest' }
        ]
      },
      {
        levelBracket: '41–46',
        itemId: 17780,
        name: "Princess Theradras' Scepter",
        icon: 'inv_hammer_04',
        weaponType: 'Two-handed mace',
        speed: '3.40',
        dps: '47.1 DPS',
        source: { kind: 'dungeon', title: 'Princess Theradras', detail: 'Maraudon (+11 Str, +10 Sta)' },
        alts: [
          { name: 'Spellshifter Rod', itemId: 9527, value: '31.1 DPS - Quest: Tiara of the Deep' },
          { name: 'Grisly Sack of Skulls', itemId: 1959, value: '40.3 DPS - World Drop' }
        ]
      },
      {
        levelBracket: '47–52',
        itemId: 11608,
        name: 'Dark Iron Pulverizer',
        icon: 'inv_hammer_16',
        weaponType: 'Two-handed mace',
        speed: '3.70',
        dps: '47.4 DPS',
        source: { kind: 'craft', title: 'Blacksmithing (265)', detail: 'Plan drops in Blackrock Depths - 8s stun proc' },
        alts: [
          { name: 'Kindling Stave', itemId: 11750, value: '34.1 DPS - BRD: Pyromancer Loregrain' },
          { name: 'Enchanted Battlehammer', itemId: 12776, value: '48.3 DPS - Blacksmithing (280)' }
        ]
      },
      {
        levelBracket: '53–60',
        itemId: 943,
        name: 'Warden Staff',
        icon: 'inv_staff_13',
        weaponType: 'Staff',
        speed: '2.40',
        dps: '38.3 DPS',
        source: { kind: 'drop', title: 'World Drop BoE', detail: 'Undisputed BiS Feral Bear Tanking weapon forever (+260 Armor, +10 Defense)' },
        alts: [
          { name: 'Wisepaw Totem', itemId: 274420, value: '36.9 DPS - Mount Hyjal caster staff' },
          { name: 'Hammer of the Grand Crusader', itemId: 18717, value: '53.9 DPS - Stratholme 2H Mace' },
          { name: 'Rod of the Ogre Magi', itemId: 18534, value: '36.0 DPS - DM North Tribute Run' }
        ]
      }
    ]
  }
};

const outPath = path.join(ROOT, 'data', 'scraped', 'forever_weapons.json');
fs.writeFileSync(outPath, JSON.stringify(weaponsData, null, 2), 'utf8');
console.log(`[Generator] Wrote full 9-class weapon database to ${outPath}`);

// Run compilation into class-progression-data.js
import('./compile-progression-data.mjs').then(() => {
  console.log('[Generator] Compiled into js/data/class-progression-data.js successfully.');
});
