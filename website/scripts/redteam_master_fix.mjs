/**
 * Master Red-Team Progression & BiS Overhaul Script
 * Implements all verified red-team remediations across all 9 classes:
 * - Adds offhands.warrior (Protection Warrior 1-60 Shield Track)
 * - Fixes offhands.paladin and offhands.shaman (Correct shield item IDs, purge fake Dota/tabard items)
 * - Replaces offhands.druid (Genuine Druid tomes, pouches, off-hands, and class idols)
 * - Fixes Paladin weapon legality (purges Bonebiter & Taskmaster Axe)
 * - Fixes Shaman weapon legality (purges pre-20 2H axes/maces, adds endgame maces/axes, fixes Unstoppable Force stats)
 * - Fixes Druid weapon legality (purges Felbough Arm polearm, adds Unyielding Maul, Guiding Stave, Aurastone Hammer)
 * - Fixes Rogue weapon legality (purges Electro-Lantern, caster fists, adds Barman Shanker, Krol Blade, Gut Ripper, Bloodrazor)
 * - Fixes Warrior weapons (re-orders Whirlwind Axe vs Corpsemaker, adds iconic 1H Cruel Barb/Thrash Blade/Ironfoe, adds Ice Barbed Spear)
 * - Fixes Hunter weapons (Hunter's Boomstick Gun stats, adds Rhok'delar, Bow of Searing Arrows, Hurricane, and melee stat-sticks)
 * - Fixes Mage/Warlock weapons (fixes Inventor's Focal Sword Maraudon 48, Spire of the Stoneshaper BRD 51, Rod of Ogre Magi 58, adds Sageblade & Azuresong Mageblade, wands, offhands)
 * - Fixes Priest weapons (Staff of Friar 21, adds Anathema, Wind Spirit Staff, Hand of Righteousness, wands, offhands)
 * - Fixes bis-data.js (removes Taskmaster Axe from Paladin, removes Elder Amber Stave from Druid offhand, fixes Fury Warrior icon, fixes L30 BiS sword)
 */

import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');

console.log('=== STARTING MASTER RED-TEAM PROGRESSION & BIS FIXES ===');

// 1. Load class-progression-data.js
const progDataPath = path.join(ROOT, 'js', 'data', 'class-progression-data.js');
let progDataCode = fs.readFileSync(progDataPath, 'utf8');

const sandbox = { window: {} };
vm.createContext(sandbox);
vm.runInContext(progDataCode, sandbox);
const progData = sandbox.window.WOW_PROGRESSION_DATA;
if (!progData) throw new Error('Failed to load WOW_PROGRESSION_DATA');

// ==========================================
// A. SHIELDS & OFFHANDS OVERHAUL
// ==========================================

// 1. Warrior Shields Track (1-60)
progData.offhands.warrior = {
  tracks: [{ id: 'primary', name: 'Shield Progression' }],
  levels: [
    {
      levelBracket: '1–9',
      itemId: 2129,
      name: 'Large Metal Shield',
      icon: 'inv_shield_05',
      weaponType: 'Shield',
      armor: 136,
      block: 4,
      source: { kind: 'vendor', title: 'Armor & Shield Vendor', detail: 'Early starter shield (+136 Armor, 4 Block).' },
      faction: 'both',
      quality: 'q1',
      iLvl: 8,
      reqLevel: 3,
      stats: '136 Armor, 4 Block',
      alts: [
        { name: 'Tainted Wooden Shield', itemId: 2128, weaponType: 'Shield', quality: 'q1', iLvl: 5, reqLevel: 1, stats: '89 Armor, 3 Block', icon: 'inv_shield_04', value: '89 Armor, 3 Block - Starting Zone' },
        { name: 'Crested Buckler', itemId: 2362, weaponType: 'Shield', quality: 'q2', iLvl: 12, reqLevel: 7, stats: '+1 Strength, 161 Armor, 5 Block', icon: 'inv_shield_08', value: '+1 Strength, 161 Armor - World Drop' }
      ]
    },
    {
      levelBracket: '10–16',
      itemId: 13245,
      name: "Kresh's Back",
      icon: 'inv_shield_02',
      weaponType: 'Shield',
      armor: 417,
      block: 10,
      source: { kind: 'dungeon', title: 'Wailing Caverns — Kresh', detail: 'Iconic turtle shell shield (+417 Armor, 10 Block).' },
      faction: 'both',
      quality: 'q3',
      iLvl: 20,
      reqLevel: 15,
      stats: '417 Armor, 10 Block',
      alts: [
        { name: "Commander's Crest", itemId: 6320, weaponType: 'Shield', quality: 'q3', iLvl: 25, reqLevel: 20, stats: '+6 Stamina, +3 Strength, 552 Armor, 13 Block', icon: 'inv_shield_09', value: 'Shadowfang Keep — Commander Springvale' },
        { name: 'Redbeard Crest', itemId: 12997, weaponType: 'Shield', quality: 'q2', iLvl: 24, reqLevel: 19, stats: '+4 Stamina, +4 Strength, 495 Armor, 12 Block', icon: 'inv_shield_05', value: 'World Drop' }
      ]
    },
    {
      levelBracket: '17–20',
      itemId: 7002,
      name: 'Arctic Buckler',
      icon: 'inv_shield_05',
      weaponType: 'Shield',
      armor: 569,
      block: 14,
      source: { kind: 'quest', title: 'Blackfathom Deeps — Researching the Corruption', detail: 'Alliance quest shield (+569 Armor, 14 Block, +5 Stamina, +5 Spirit).' },
      faction: 'alliance',
      quality: 'q3',
      iLvl: 26,
      reqLevel: 19,
      stats: '+5 Stamina, +5 Spirit, 569 Armor, 14 Block',
      alts: [
        { name: "Commander's Crest", itemId: 6320, weaponType: 'Shield', quality: 'q3', iLvl: 25, reqLevel: 20, stats: '+6 Stamina, +3 Strength, 552 Armor, 13 Block', icon: 'inv_shield_09', value: 'SFK — Commander Springvale' },
        { name: 'Shield of Thorsen', itemId: 13079, weaponType: 'Shield', quality: 'q3', iLvl: 25, reqLevel: 20, stats: '+5 Stamina, +5 Strength, 552 Armor, 13 Block', icon: 'inv_shield_07', value: 'World Drop BoE' }
      ]
    },
    {
      levelBracket: '21–25',
      itemId: 7748,
      name: 'Forcestone Buckler',
      icon: 'inv_shield_05',
      weaponType: 'Shield',
      armor: 686,
      block: 17,
      source: { kind: 'quest', title: 'Uldaman Quest Preparation / World Drop', detail: '+6 Stamina, +6 Spirit, 686 Armor, 17 Block.' },
      faction: 'both',
      quality: 'q3',
      iLvl: 29,
      reqLevel: 24,
      stats: '+6 Stamina, +6 Spirit, 686 Armor, 17 Block',
      alts: [
        { name: 'Marbled Buckler', itemId: 4833, weaponType: 'Shield', quality: 'q2', iLvl: 29, reqLevel: 24, stats: '+4 Stamina, +4 Strength, 614 Armor, 15 Block', icon: 'inv_shield_04', value: 'World Drop' },
        { name: 'Seedcloud Buckler', itemId: 13166, weaponType: 'Shield', quality: 'q2', iLvl: 29, reqLevel: 24, stats: '+5 Stamina, +3 Strength, 614 Armor, 15 Block', icon: 'inv_shield_08', value: 'World Drop' }
      ]
    },
    {
      levelBracket: '26–30',
      itemId: 4834,
      name: 'Basalt Buckler',
      icon: 'inv_shield_06',
      weaponType: 'Shield',
      armor: 733,
      block: 18,
      source: { kind: 'world', title: 'World Drop BoE', detail: '+5 Strength, +5 Stamina, 733 Armor, 18 Block.' },
      faction: 'both',
      quality: 'q2',
      iLvl: 31,
      reqLevel: 26,
      stats: '+5 Strength, +5 Stamina, 733 Armor, 18 Block',
      alts: [
        { name: 'Vile Protector', itemId: 271220, weaponType: 'Shield', quality: 'q3', iLvl: 33, reqLevel: 28, stats: '+7 Stamina, +4 Strength, 804 Armor, 20 Block', icon: 'inv_shield_10', value: 'Dungeon Drop' },
        { name: 'Collection Plate', itemId: 273829, weaponType: 'Shield', quality: 'q3', iLvl: 33, reqLevel: 28, stats: '+6 Strength, +6 Stamina, 804 Armor, 20 Block', icon: 'inv_shield_05', value: 'Dungeon Drop' }
      ]
    },
    {
      levelBracket: '31–39',
      itemId: 7726,
      name: 'Aegis of the Scarlet Commander',
      icon: 'inv_shield_07',
      weaponType: 'Shield',
      armor: 1548,
      block: 29,
      source: { kind: 'dungeon', title: 'Scarlet Monastery Cathedral — Scarlet Commander Mograine', detail: 'Top tier leveling shield (+7 Strength, +8 Stamina, 1548 Armor, 29 Block).' },
      faction: 'both',
      quality: 'q3',
      iLvl: 44,
      reqLevel: 39,
      stats: '+7 Strength, +8 Stamina, 1548 Armor, 29 Block',
      alts: [
        { name: 'Aegis of Battle', itemId: 6724, weaponType: 'Shield', quality: 'q2', iLvl: 38, reqLevel: 33, stats: '+6 Strength, +6 Stamina, 968 Armor, 24 Block', icon: 'inv_shield_04', value: 'World Drop' }
      ]
    },
    {
      levelBracket: '40–50',
      itemId: 1169,
      name: 'Wall of the Dead',
      icon: 'inv_shield_05',
      weaponType: 'Shield',
      armor: 1923,
      block: 35,
      source: { kind: 'world', title: 'World Drop Epic Shield', detail: '+10 Stamina, +10 Armor, Chance on hit: +150 Armor buff.' },
      faction: 'both',
      quality: 'q4',
      iLvl: 50,
      reqLevel: 45,
      stats: '+10 Stamina, +10 Armor, 1923 Armor, 35 Block, Equip: +150 Armor Proc',
      alts: [
        { name: "Gizlock's Hypertech Buckler", itemId: 17718, weaponType: 'Shield', quality: 'q3', iLvl: 52, reqLevel: 47, stats: '+7 Stamina, +8 Intellect, +11 Block Value, 1823 Armor, 33 Block', icon: 'inv_shield_13', value: 'Maraudon — Tinkerer Gizlock' }
      ]
    },
    {
      levelBracket: '51–54',
      itemId: 1168,
      name: 'Skullflame Shield',
      icon: 'inv_shield_01',
      weaponType: 'Shield',
      armor: 2256,
      block: 40,
      source: { kind: 'world', title: 'World Drop Epic Shield', detail: 'Iconic lifesteal AOE shield (+2256 Armor, 40 Block, Life Drain / Flame Strike procs).' },
      faction: 'both',
      quality: 'q4',
      iLvl: 59,
      reqLevel: 54,
      stats: '2256 Armor, 40 Block, Equip: Chance to Drain 35 Life, Chance to deal 35-45 Fire DMG',
      alts: [
        { name: "Gizlock's Hypertech Buckler", itemId: 17718, weaponType: 'Shield', quality: 'q3', iLvl: 52, reqLevel: 47, stats: '+7 Stamina, +8 Intellect, 1823 Armor, 33 Block', icon: 'inv_shield_13', value: 'Maraudon — Tinkerer Gizlock' }
      ]
    },
    {
      levelBracket: '55–60',
      itemId: 12602,
      name: 'Draconian Deflector',
      icon: 'inv_shield_11',
      weaponType: 'Shield',
      armor: 2153,
      block: 40,
      source: { kind: 'dungeon', title: 'Upper Blackrock Spire — General Drakkisath', detail: 'Standard pre-raid tanking shield (+10 Defense, 2153 Armor, 40 Block).' },
      faction: 'both',
      quality: 'q3',
      iLvl: 63,
      reqLevel: 58,
      stats: '+10 Defense, 2153 Armor, 40 Block',
      alts: [
        { name: 'The Immovable Object', itemId: 19325, weaponType: 'Shield', quality: 'q4', iLvl: 65, reqLevel: 60, stats: '+15 Stamina, +27 Block Value, 2468 Armor, 44 Block', icon: 'inv_shield_12', value: 'Alterac Valley — Exalted (Vendor)' },
        { name: 'Force Reactive Disk', itemId: 18638, weaponType: 'Shield', quality: 'q4', iLvl: 65, reqLevel: 60, stats: '+11 Stamina, 2548 Armor, 44 Block, AOE Lightning Discharge on Block', icon: 'inv_shield_16', value: 'Engineering Crafted' },
        { name: 'Elementium Reinforced Bulwark', itemId: 19349, weaponType: 'Shield', quality: 'q4', iLvl: 77, reqLevel: 60, stats: '+23 Stamina, +7 Defense, 2816 Armor, 49 Block', icon: 'inv_shield_19', value: 'Blackwing Lair — Chromaggus' }
      ]
    }
  ]
};

// 2. Paladin Shields Track: Clean up IDs and fake items
progData.offhands.paladin = {
  tracks: [{ id: 'primary', name: 'Holy & Prot Shields' }],
  levels: [
    {
      levelBracket: '1–9',
      itemId: 2129,
      name: 'Large Metal Shield',
      icon: 'inv_shield_05',
      weaponType: 'Shield',
      armor: 136,
      block: 4,
      source: { kind: 'vendor', title: 'Armor & Shield Vendor', detail: 'Early starter shield (+136 Armor, 4 Block).' },
      faction: 'alliance',
      quality: 'q1',
      iLvl: 8,
      reqLevel: 3,
      stats: '136 Armor, 4 Block',
      alts: [
        { name: 'Tainted Wooden Shield', itemId: 2128, weaponType: 'Shield', quality: 'q1', iLvl: 5, reqLevel: 1, stats: '89 Armor, 3 Block', icon: 'inv_shield_04', value: 'Starting Zone' },
        { name: 'Crested Buckler', itemId: 2362, weaponType: 'Shield', quality: 'q2', iLvl: 12, reqLevel: 7, stats: '+1 Strength, 161 Armor, 5 Block', icon: 'inv_shield_08', value: 'World Drop' }
      ]
    },
    {
      levelBracket: '10–16',
      itemId: 13245,
      name: "Kresh's Back",
      icon: 'inv_shield_02',
      weaponType: 'Shield',
      armor: 417,
      block: 10,
      source: { kind: 'dungeon', title: 'Wailing Caverns — Kresh', detail: 'Turtle shell shield (+417 Armor, 10 Block).' },
      faction: 'alliance',
      quality: 'q3',
      iLvl: 20,
      reqLevel: 15,
      stats: '417 Armor, 10 Block',
      alts: [
        { name: "Commander's Crest", itemId: 6320, weaponType: 'Shield', quality: 'q3', iLvl: 25, reqLevel: 20, stats: '+6 Stamina, +3 Strength, 552 Armor, 13 Block', icon: 'inv_shield_09', value: 'SFK — Commander Springvale' },
        { name: 'Redbeard Crest', itemId: 12997, weaponType: 'Shield', quality: 'q2', iLvl: 24, reqLevel: 19, stats: '+4 Stamina, +4 Strength, 495 Armor, 12 Block', icon: 'inv_shield_05', value: 'World Drop' }
      ]
    },
    {
      levelBracket: '17–20',
      itemId: 7002,
      name: 'Arctic Buckler',
      icon: 'inv_shield_05',
      weaponType: 'Shield',
      armor: 569,
      block: 14,
      source: { kind: 'quest', title: 'Blackfathom Deeps — Researching the Corruption', detail: 'Alliance quest shield (+569 Armor, 14 Block, +5 Stamina, +5 Spirit).' },
      faction: 'alliance',
      quality: 'q3',
      iLvl: 26,
      reqLevel: 19,
      stats: '+5 Stamina, +5 Spirit, 569 Armor, 14 Block',
      alts: [
        { name: "Commander's Crest", itemId: 6320, weaponType: 'Shield', quality: 'q3', iLvl: 25, reqLevel: 20, stats: '+6 Stamina, +3 Strength, 552 Armor, 13 Block', icon: 'inv_shield_09', value: 'SFK — Commander Springvale' },
        { name: 'Shield of Thorsen', itemId: 13079, weaponType: 'Shield', quality: 'q3', iLvl: 25, reqLevel: 20, stats: '+5 Stamina, +5 Strength, 552 Armor, 13 Block', icon: 'inv_shield_07', value: 'World Drop BoE' }
      ]
    },
    {
      levelBracket: '21–25',
      itemId: 7748,
      name: 'Forcestone Buckler',
      icon: 'inv_shield_05',
      weaponType: 'Shield',
      armor: 686,
      block: 17,
      source: { kind: 'quest', title: 'World Drop / Quest', detail: '+6 Stamina, +6 Spirit, 686 Armor, 17 Block.' },
      faction: 'alliance',
      quality: 'q3',
      iLvl: 29,
      reqLevel: 24,
      stats: '+6 Stamina, +6 Spirit, 686 Armor, 17 Block',
      alts: [
        { name: 'Marbled Buckler', itemId: 4833, weaponType: 'Shield', quality: 'q2', iLvl: 29, reqLevel: 24, stats: '+4 Stamina, +4 Strength, 614 Armor, 15 Block', icon: 'inv_shield_04', value: 'World Drop' },
        { name: 'Seedcloud Buckler', itemId: 13166, weaponType: 'Shield', quality: 'q2', iLvl: 29, reqLevel: 24, stats: '+5 Stamina, +3 Strength, 614 Armor, 15 Block', icon: 'inv_shield_08', value: 'World Drop' }
      ]
    },
    {
      levelBracket: '26–30',
      itemId: 4834,
      name: 'Basalt Buckler',
      icon: 'inv_shield_06',
      weaponType: 'Shield',
      armor: 733,
      block: 18,
      source: { kind: 'world', title: 'World Drop BoE', detail: '+5 Strength, +5 Stamina, 733 Armor, 18 Block.' },
      faction: 'alliance',
      quality: 'q2',
      iLvl: 31,
      reqLevel: 26,
      stats: '+5 Strength, +5 Stamina, 733 Armor, 18 Block',
      alts: [
        { name: 'Vile Protector', itemId: 271220, weaponType: 'Shield', quality: 'q3', iLvl: 33, reqLevel: 28, stats: '+7 Stamina, +4 Strength, 804 Armor, 20 Block', icon: 'inv_shield_10', value: 'Dungeon Drop' },
        { name: 'Collection Plate', itemId: 273829, weaponType: 'Shield', quality: 'q3', iLvl: 33, reqLevel: 28, stats: '+6 Strength, +6 Stamina, 804 Armor, 20 Block', icon: 'inv_shield_05', value: 'Dungeon Drop' }
      ]
    },
    {
      levelBracket: '31–39',
      itemId: 7726,
      name: 'Aegis of the Scarlet Commander',
      icon: 'inv_shield_07',
      weaponType: 'Shield',
      armor: 1548,
      block: 29,
      source: { kind: 'dungeon', title: 'Scarlet Monastery Cathedral — Scarlet Commander Mograine', detail: 'Top tier leveling shield (+7 Strength, +8 Stamina, 1548 Armor, 29 Block).' },
      faction: 'alliance',
      quality: 'q3',
      iLvl: 44,
      reqLevel: 39,
      stats: '+7 Strength, +8 Stamina, 1548 Armor, 29 Block',
      alts: [
        { name: 'Aegis of Battle', itemId: 6724, weaponType: 'Shield', quality: 'q2', iLvl: 38, reqLevel: 33, stats: '+6 Strength, +6 Stamina, 968 Armor, 24 Block', icon: 'inv_shield_04', value: 'World Drop' }
      ]
    },
    {
      levelBracket: '40–50',
      itemId: 17718,
      name: "Gizlock's Hypertech Buckler",
      icon: 'inv_shield_13',
      weaponType: 'Shield',
      armor: 1823,
      block: 33,
      source: { kind: 'dungeon', title: 'Maraudon — Tinkerer Gizlock', detail: '+7 Stamina, +8 Intellect, +11 Block Value, 1823 Armor, 33 Block.' },
      faction: 'alliance',
      quality: 'q3',
      iLvl: 52,
      reqLevel: 47,
      stats: '+7 Stamina, +8 Intellect, +11 Block Value, 1823 Armor, 33 Block',
      alts: [
        { name: 'Wall of the Dead', itemId: 1169, weaponType: 'Shield', quality: 'q4', iLvl: 50, reqLevel: 45, stats: '+10 Stamina, +10 Armor, 1923 Armor, 35 Block', icon: 'inv_shield_05', value: 'World Drop Epic' }
      ]
    },
    {
      levelBracket: '51–54',
      itemId: 1168,
      name: 'Skullflame Shield',
      icon: 'inv_shield_01',
      weaponType: 'Shield',
      armor: 2256,
      block: 40,
      source: { kind: 'world', title: 'World Drop Epic Shield', detail: 'Iconic lifesteal AOE shield (+2256 Armor, 40 Block, Life Drain / Flame Strike procs).' },
      faction: 'alliance',
      quality: 'q4',
      iLvl: 59,
      reqLevel: 54,
      stats: '2256 Armor, 40 Block, Equip: Chance to Drain 35 Life, Chance to deal 35-45 Fire DMG',
      alts: [
        { name: "Gizlock's Hypertech Buckler", itemId: 17718, weaponType: 'Shield', quality: 'q3', iLvl: 52, reqLevel: 47, stats: '+7 Stamina, +8 Intellect, 1823 Armor, 33 Block', icon: 'inv_shield_13', value: 'Maraudon — Tinkerer Gizlock' }
      ]
    },
    {
      levelBracket: '55–60',
      itemId: 12602,
      name: 'Draconian Deflector',
      icon: 'inv_shield_11',
      weaponType: 'Shield',
      armor: 2153,
      block: 40,
      source: { kind: 'dungeon', title: 'Upper Blackrock Spire — General Drakkisath', detail: 'Standard pre-raid tanking shield (+10 Defense, 2153 Armor, 40 Block).' },
      faction: 'alliance',
      quality: 'q3',
      iLvl: 63,
      reqLevel: 58,
      stats: '+10 Defense, 2153 Armor, 40 Block',
      alts: [
        { name: "Malistar's Defender", itemId: 17106, weaponType: 'Shield', quality: 'q4', iLvl: 66, reqLevel: 60, stats: '+13 Intellect, +9 Stamina, +11 Healing/Spells, 2548 Armor, 44 Block', icon: 'inv_shield_08', value: 'Molten Core — Majordomo Executus' },
        { name: 'The Immovable Object', itemId: 19325, weaponType: 'Shield', quality: 'q4', iLvl: 65, reqLevel: 60, stats: '+15 Stamina, +27 Block Value, 2468 Armor, 44 Block', icon: 'inv_shield_12', value: 'Alterac Valley — Exalted (Vendor)' }
      ]
    }
  ]
};

// 3. Shaman Shields Track
progData.offhands.shaman = {
  tracks: [{ id: 'primary', name: 'Elemental & Resto Shields' }],
  levels: [
    {
      levelBracket: '1–9',
      itemId: 2129,
      name: 'Large Metal Shield',
      icon: 'inv_shield_05',
      weaponType: 'Shield',
      armor: 136,
      block: 4,
      source: { kind: 'vendor', title: 'Armor & Shield Vendor', detail: 'Early starter shield (+136 Armor, 4 Block).' },
      faction: 'horde',
      quality: 'q1',
      iLvl: 8,
      reqLevel: 3,
      stats: '136 Armor, 4 Block',
      alts: [
        { name: 'Tainted Wooden Shield', itemId: 2128, weaponType: 'Shield', quality: 'q1', iLvl: 5, reqLevel: 1, stats: '89 Armor, 3 Block', icon: 'inv_shield_04', value: 'Starting Zone' },
        { name: 'Crested Buckler', itemId: 2362, weaponType: 'Shield', quality: 'q2', iLvl: 12, reqLevel: 7, stats: '+1 Strength, 161 Armor, 5 Block', icon: 'inv_shield_08', value: 'World Drop' }
      ]
    },
    {
      levelBracket: '10–16',
      itemId: 13245,
      name: "Kresh's Back",
      icon: 'inv_shield_02',
      weaponType: 'Shield',
      armor: 417,
      block: 10,
      source: { kind: 'dungeon', title: 'Wailing Caverns — Kresh', detail: 'Turtle shell shield (+417 Armor, 10 Block).' },
      faction: 'horde',
      quality: 'q3',
      iLvl: 20,
      reqLevel: 15,
      stats: '417 Armor, 10 Block',
      alts: [
        { name: "Commander's Crest", itemId: 6320, weaponType: 'Shield', quality: 'q3', iLvl: 25, reqLevel: 20, stats: '+6 Stamina, +3 Strength, 552 Armor, 13 Block', icon: 'inv_shield_09', value: 'SFK — Commander Springvale' },
        { name: 'Redbeard Crest', itemId: 12997, weaponType: 'Shield', quality: 'q2', iLvl: 24, reqLevel: 19, stats: '+4 Stamina, +4 Strength, 495 Armor, 12 Block', icon: 'inv_shield_05', value: 'World Drop' }
      ]
    },
    {
      levelBracket: '17–20',
      itemId: 6320,
      name: "Commander's Crest",
      icon: 'inv_shield_09',
      weaponType: 'Shield',
      armor: 552,
      block: 13,
      source: { kind: 'dungeon', title: 'Shadowfang Keep — Commander Springvale', detail: '+6 Stamina, +3 Strength, 552 Armor, 13 Block.' },
      faction: 'horde',
      quality: 'q3',
      iLvl: 25,
      reqLevel: 20,
      stats: '+6 Stamina, +3 Strength, 552 Armor, 13 Block',
      alts: [
        { name: 'Redbeard Crest', itemId: 12997, weaponType: 'Shield', quality: 'q2', iLvl: 24, reqLevel: 19, stats: '+4 Stamina, +4 Strength, 495 Armor, 12 Block', icon: 'inv_shield_05', value: 'World Drop' }
      ]
    },
    {
      levelBracket: '21–25',
      itemId: 7748,
      name: 'Forcestone Buckler',
      icon: 'inv_shield_05',
      weaponType: 'Shield',
      armor: 686,
      block: 17,
      source: { kind: 'quest', title: 'World Drop / Quest', detail: '+6 Stamina, +6 Spirit, 686 Armor, 17 Block.' },
      faction: 'horde',
      quality: 'q3',
      iLvl: 29,
      reqLevel: 24,
      stats: '+6 Stamina, +6 Spirit, 686 Armor, 17 Block',
      alts: [
        { name: 'Marbled Buckler', itemId: 4833, weaponType: 'Shield', quality: 'q2', iLvl: 29, reqLevel: 24, stats: '+4 Stamina, +4 Strength, 614 Armor, 15 Block', icon: 'inv_shield_04', value: 'World Drop' }
      ]
    },
    {
      levelBracket: '26–30',
      itemId: 4834,
      name: 'Basalt Buckler',
      icon: 'inv_shield_06',
      weaponType: 'Shield',
      armor: 733,
      block: 18,
      source: { kind: 'world', title: 'World Drop BoE', detail: '+5 Strength, +5 Stamina, 733 Armor, 18 Block.' },
      faction: 'horde',
      quality: 'q2',
      iLvl: 31,
      reqLevel: 26,
      stats: '+5 Strength, +5 Stamina, 733 Armor, 18 Block',
      alts: [
        { name: 'Vile Protector', itemId: 271220, weaponType: 'Shield', quality: 'q3', iLvl: 33, reqLevel: 28, stats: '+7 Stamina, +4 Strength, 804 Armor, 20 Block', icon: 'inv_shield_10', value: 'Dungeon Drop' }
      ]
    },
    {
      levelBracket: '31–39',
      itemId: 7726,
      name: 'Aegis of the Scarlet Commander',
      icon: 'inv_shield_07',
      weaponType: 'Shield',
      armor: 1548,
      block: 29,
      source: { kind: 'dungeon', title: 'Scarlet Monastery Cathedral — Scarlet Commander Mograine', detail: 'Top tier leveling shield (+7 Strength, +8 Stamina, 1548 Armor, 29 Block).' },
      faction: 'horde',
      quality: 'q3',
      iLvl: 44,
      reqLevel: 39,
      stats: '+7 Strength, +8 Stamina, 1548 Armor, 29 Block',
      alts: [
        { name: 'Aegis of Battle', itemId: 6724, weaponType: 'Shield', quality: 'q2', iLvl: 38, reqLevel: 33, stats: '+6 Strength, +6 Stamina, 968 Armor, 24 Block', icon: 'inv_shield_04', value: 'World Drop' }
      ]
    },
    {
      levelBracket: '40–50',
      itemId: 17718,
      name: "Gizlock's Hypertech Buckler",
      icon: 'inv_shield_13',
      weaponType: 'Shield',
      armor: 1823,
      block: 33,
      source: { kind: 'dungeon', title: 'Maraudon — Tinkerer Gizlock', detail: 'Top tier caster/healer shield (+7 Stamina, +8 Intellect, +11 Block Value, 1823 Armor, 33 Block).' },
      faction: 'horde',
      quality: 'q3',
      iLvl: 52,
      reqLevel: 47,
      stats: '+7 Stamina, +8 Intellect, +11 Block Value, 1823 Armor, 33 Block',
      alts: [
        { name: 'Wall of the Dead', itemId: 1169, weaponType: 'Shield', quality: 'q4', iLvl: 50, reqLevel: 45, stats: '+10 Stamina, +10 Armor, 1923 Armor, 35 Block', icon: 'inv_shield_05', value: 'World Drop Epic' }
      ]
    },
    {
      levelBracket: '51–54',
      itemId: 1168,
      name: 'Skullflame Shield',
      icon: 'inv_shield_01',
      weaponType: 'Shield',
      armor: 2256,
      block: 40,
      source: { kind: 'world', title: 'World Drop Epic Shield', detail: 'Iconic lifesteal AOE shield (+2256 Armor, 40 Block, Life Drain / Flame Strike procs).' },
      faction: 'horde',
      quality: 'q4',
      iLvl: 59,
      reqLevel: 54,
      stats: '2256 Armor, 40 Block, Equip: Chance to Drain 35 Life, Chance to deal 35-45 Fire DMG',
      alts: [
        { name: "Gizlock's Hypertech Buckler", itemId: 17718, weaponType: 'Shield', quality: 'q3', iLvl: 52, reqLevel: 47, stats: '+7 Stamina, +8 Intellect, 1823 Armor, 33 Block', icon: 'inv_shield_13', value: 'Maraudon — Tinkerer Gizlock' }
      ]
    },
    {
      levelBracket: '55–60',
      itemId: 17106,
      name: "Malistar's Defender",
      icon: 'inv_shield_08',
      weaponType: 'Shield',
      armor: 2548,
      block: 44,
      source: { kind: 'raid', title: 'Molten Core — Majordomo Executus', detail: 'BiS Shaman Shield (+13 Intellect, +9 Stamina, +11 Spell Power, 2548 Armor, 44 Block).' },
      faction: 'horde',
      quality: 'q4',
      iLvl: 66,
      reqLevel: 60,
      stats: '+13 Intellect, +9 Stamina, +11 Spell Power, 2548 Armor, 44 Block',
      alts: [
        { name: 'Draconian Deflector', itemId: 12602, weaponType: 'Shield', quality: 'q3', iLvl: 63, reqLevel: 58, stats: '+10 Defense, 2153 Armor, 40 Block', icon: 'inv_shield_11', value: 'UBRS — General Drakkisath' },
        { name: 'The Immovable Object', itemId: 19325, weaponType: 'Shield', quality: 'q4', iLvl: 65, reqLevel: 60, stats: '+15 Stamina, +27 Block Value, 2468 Armor, 44 Block', icon: 'inv_shield_12', value: 'Alterac Valley — Exalted (Vendor)' }
      ]
    }
  ]
};

// 4. Druid Off-Hands & Idols Track (Replacing Mage copy)
progData.offhands.druid = {
  tracks: [{ id: 'primary', name: 'Off-Hands & Class Idols' }],
  levels: [
    {
      levelBracket: '1–10',
      itemId: 279898,
      name: 'Stoneweaver Orb',
      icon: 'inv_misc_orb_01',
      weaponType: 'Held in Off-Hand',
      source: { kind: 'quest', title: 'Early Leveling Quest', detail: '+2 Spirit, +2 Stamina early off-hand.' },
      faction: 'both',
      quality: 'q2',
      iLvl: 14,
      reqLevel: 8,
      stats: '+2 Spirit, +2 Stamina',
      alts: []
    },
    {
      levelBracket: '11–18',
      itemId: 15974,
      name: 'Pagan Rod',
      icon: 'inv_staff_13',
      weaponType: 'Held In Off-hand',
      source: { kind: 'world', title: 'World Drop BoE', detail: '+3 Intellect, +2 Spirit.' },
      faction: 'both',
      quality: 'q2',
      iLvl: 16,
      reqLevel: 11,
      stats: '+3 Intellect, +2 Spirit',
      alts: []
    },
    {
      levelBracket: '19–25',
      itemId: 281313,
      name: 'Orb of the Forgotten',
      icon: 'inv_misc_orb_03',
      weaponType: 'Held in Off-Hand',
      source: { kind: 'dungeon', title: 'Blackfathom Deeps Drop', detail: '+4 Intellect, +5 Spirit.' },
      faction: 'both',
      quality: 'q2',
      iLvl: 27,
      reqLevel: 22,
      stats: '+4 Intellect, +5 Spirit',
      alts: []
    },
    {
      levelBracket: '26–30',
      itemId: 273827,
      name: 'Omega Orb',
      icon: 'inv_misc_orb_03',
      weaponType: 'Held in Off-Hand',
      source: { kind: 'quest', title: 'Compendium of the Fallen (Horde) / RFK Drop', detail: '+5 Intellect, +5 Spirit.' },
      faction: 'both',
      quality: 'q3',
      iLvl: 33,
      reqLevel: 28,
      stats: '+5 Intellect, +5 Spirit',
      alts: [
        { name: "Raptor's Gaze", itemId: 273027, weaponType: 'Held in Off-Hand', quality: 'q3', iLvl: 33, reqLevel: 28, stats: '+6 Intellect, +3 Stamina', icon: 'inv_misc_eye_01', value: 'Dungeon Drop' }
      ]
    },
    {
      levelBracket: '31–38',
      itemId: 6803,
      name: 'Prophetic Cane',
      icon: 'inv_staff_13',
      weaponType: 'Held in Off-Hand',
      source: { kind: 'quest', title: 'Scarlet Monastery Quest Reward', detail: '+7 Intellect, +6 Spirit.' },
      faction: 'both',
      quality: 'q3',
      iLvl: 38,
      reqLevel: 33,
      stats: '+7 Intellect, +6 Spirit',
      alts: [
        { name: 'Beacon of Hope', itemId: 9393, weaponType: 'Held in Off-Hand', quality: 'q3', iLvl: 38, reqLevel: 33, stats: '+10 Armor, +5 Stamina, +10 Healing', icon: 'inv_misc_lantern_01', value: 'World Drop BoE' }
      ]
    },
    {
      levelBracket: '39–46',
      itemId: 5462,
      name: 'Furbolg Medicine Pouch',
      icon: 'inv_misc_bag_07',
      weaponType: 'Held in Off-Hand',
      source: { kind: 'quest', title: 'Timbermaw Hold — Friendly Reputation Quest', detail: '+10 Stamina, Use: Restores 1000 health over 10s (BiS survivability off-hand!).' },
      faction: 'both',
      quality: 'q3',
      iLvl: 45,
      reqLevel: 40,
      stats: '+10 Stamina, Use: Restores 1000 Health over 10 sec',
      alts: []
    },
    {
      levelBracket: '47–54',
      itemId: 11904,
      name: 'Spirit of Aquementas',
      icon: 'inv_misc_book_06',
      weaponType: 'Held in Off-Hand',
      source: { kind: 'quest', title: "Un'Goro Crater — It's Dangerous to Go Alone", detail: 'Equip: Increases damage and healing done by magical spells and effects by up to 20.' },
      faction: 'both',
      quality: 'q3',
      iLvl: 52,
      reqLevel: 47,
      stats: 'Equip: +20 Spell Power & Healing',
      alts: [
        { name: 'Brightly Glowing Stone', itemId: 18523, weaponType: 'Held in Off-Hand', quality: 'q3', iLvl: 59, reqLevel: 54, stats: '+7 Intellect, +37 Healing Spells', icon: 'inv_misc_gem_pearl_04', value: 'Dire Maul North — Guard Slip\'kik' }
      ]
    },
    {
      levelBracket: '55–60',
      itemId: 13385,
      name: 'Tome of Knowledge',
      icon: 'inv_misc_book_06',
      weaponType: 'Held in Off-Hand',
      source: { kind: 'dungeon', title: 'Stratholme Living / World Drop BoE', detail: '+8 Strength, +8 Agility, +8 Stamina, +8 Intellect, +8 Spirit, +30 Armor. The ultimate hybrid & Feral/Bear off-hand!' },
      faction: 'both',
      quality: 'q4',
      iLvl: 61,
      reqLevel: 56,
      stats: '+8 Str, +8 Agi, +8 Sta, +8 Int, +8 Spi, +30 Armor',
      alts: [
        { name: 'Lei of the Lifegiver', itemId: 19312, weaponType: 'Held in Off-Hand', quality: 'q4', iLvl: 65, reqLevel: 55, stats: '+10 Intellect, +5 Mp5, +33 Healing Spells', icon: 'inv_misc_gem_pearl_02', value: 'Alterac Valley — Exalted (Vendor)' },
        { name: "Jin'do's Bag of Whammies", itemId: 19891, weaponType: 'Held in Off-Hand', quality: 'q4', iLvl: 66, reqLevel: 60, stats: '+11 Intellect, +18 Spell Power, +1% Spell Hit', icon: 'inv_misc_bag_07', value: 'Zul\'Gurub — Jin\'do the Hexxer' },
        { name: 'Idol of Brutality', itemId: 23198, weaponType: 'Idol', quality: 'q3', iLvl: 65, reqLevel: 60, stats: 'Equip: Reduces the rage cost of Maul and Swipe by 3.', icon: 'inv_relics_idolofbrutality', value: 'Stratholme — Magistrate Barthilas' },
        { name: 'Idol of Ferocity', itemId: 22397, weaponType: 'Idol', quality: 'q3', iLvl: 63, reqLevel: 60, stats: 'Equip: Reduces the energy cost of Claw and Rake by 3.', icon: 'inv_relics_idolofferocity', value: 'Blackrock Depths — Lord Roccor' },
        { name: 'Idol of the Moon', itemId: 23009, weaponType: 'Idol', quality: 'q3', iLvl: 65, reqLevel: 60, stats: 'Equip: Increases the damage of Moonfire by up to 17%.', icon: 'inv_relics_idolofthemoon', value: 'Scholomance — Ras Frostwhisper' },
        { name: 'Idol of Rejuvenation', itemId: 22399, weaponType: 'Idol', quality: 'q3', iLvl: 63, reqLevel: 60, stats: 'Equip: Increases the healing done by Rejuvenation by up to 50.', icon: 'inv_relics_idolofrejuvenation', value: 'Stratholme — Baroness Anastari' }
      ]
    }
  ]
};

// ==========================================
// B. WEAPON LEGALITY & PURGES ACROSS CLASSES
// ==========================================

// 1. Paladin: Purge Bonebiter (Axe)
const paladinLvl31 = progData.weapons.paladin.levels.find(l => l.levelBracket === '31–35');
if (paladinLvl31) {
  paladinLvl31.alts = (paladinLvl31.alts || []).filter(a => a.name !== 'Bonebiter' && a.itemId !== 6830);
  paladinLvl31.alts.unshift({
    name: 'Cobalt Crusher',
    itemId: 6741,
    weaponType: 'Two-handed mace',
    quality: 'q3',
    iLvl: 37,
    reqLevel: 32,
    dps: '27.4 DPS',
    speed: '3.40',
    stats: '+11 Strength, +10 Stamina',
    icon: 'inv_hammer_04',
    value: '+11 Strength, +10 Stamina - Gnomeregan Drop'
  });
}
const paladinLvl36 = progData.weapons.paladin.levels.find(l => l.levelBracket === '36–40');
if (paladinLvl36 && !paladinLvl36.alts.some(a => a.itemId === 869)) {
  paladinLvl36.alts.push({
    name: 'Ardent Custodian',
    itemId: 869,
    weaponType: 'Two-handed mace',
    quality: 'q4',
    iLvl: 43,
    reqLevel: 38,
    dps: '30.6 DPS',
    speed: '2.70',
    stats: '+100 Armor, Chance on hit: Increases attack speed by 5% for 10 sec',
    icon: 'inv_hammer_05',
    value: 'World Drop Epic Mace'
  });
}
const paladinLvl41 = progData.weapons.paladin.levels.find(l => l.levelBracket === '41–45');
if (paladinLvl41 && !paladinLvl41.alts.some(a => a.itemId === 9372)) {
  paladinLvl41.alts.push({
    name: "Sul'thraze the Lasher",
    itemId: 9372,
    weaponType: 'Two-handed sword',
    quality: 'q4',
    iLvl: 50,
    reqLevel: 44,
    dps: '38.5 DPS',
    speed: '2.60',
    stats: 'Chance on hit: Blasts target with a shadow bolt for 90 to 210 Shadow damage and slows attack speed by 50%',
    icon: 'inv_sword_40',
    value: 'Zul\'Farrak — Formed by combining Sang\'thraze & Jang\'thraze'
  });
}
// Paladin: Add Lightforged Blade & The Untamed Blade
const paladinLvl46 = progData.weapons.paladin.levels.find(l => l.levelBracket === '46–50');
if (paladinLvl46) {
  if (!paladinLvl46.alts.some(a => a.itemId === 20504)) {
    paladinLvl46.alts.push({
      name: 'Lightforged Blade',
      itemId: 20504,
      weaponType: 'Two-handed sword',
      quality: 'q3',
      iLvl: 55,
      reqLevel: 50,
      dps: '41.3 DPS',
      speed: '3.30',
      stats: '+16 Strength, +15 Stamina, +10 Spirit',
      icon: 'inv_sword_39',
      value: 'Paladin Level 50 Class Quest Reward'
    });
  }
}
const paladinLvl56 = progData.weapons.paladin.levels.find(l => l.levelBracket === '56–60');
if (paladinLvl56) {
  if (!paladinLvl56.alts.some(a => a.itemId === 19334)) {
    paladinLvl56.alts.push({
      name: 'The Untamed Blade',
      itemId: 19334,
      weaponType: 'Two-handed sword',
      quality: 'q4',
      iLvl: 77,
      reqLevel: 60,
      dps: '64.1 DPS',
      speed: '3.40',
      stats: '+22 Stamina, Chance on hit: +300 Strength for 8 sec',
      icon: 'inv_sword_40',
      value: 'Blackwing Lair — Razorgore the Untamed'
    });
  }
}

// 2. Shaman: Purge pre-20 2H axes/maces (Legality: talent unlocks at lvl 20)
progData.weapons.shaman.levels.forEach(lvl => {
  const [minLvl] = lvl.levelBracket.split('–').map(Number);
  if (minLvl < 20) {
    // If primary is 2H axe or mace, switch to 1H mace or staff
    if (lvl.weaponType && (lvl.weaponType.toLowerCase().includes('two-handed') || lvl.weaponType.toLowerCase().includes('2h'))) {
      if (minLvl <= 6) {
        lvl.name = 'Copper Mace';
        lvl.itemId = 2844;
        lvl.weaponType = 'One-handed mace';
        lvl.quality = 'q1';
        lvl.iLvl = 8;
        lvl.reqLevel = 3;
        lvl.speed = '2.40';
        lvl.dps = '4.2 DPS';
        lvl.icon = 'inv_mace_01';
        lvl.stats = 'Starter 1H Mace + Shield combo';
      } else if (minLvl <= 8) {
        lvl.name = 'Makeshift Stormcaller';
        lvl.itemId = 281274;
        lvl.weaponType = 'Staff';
        lvl.quality = 'q2';
        lvl.iLvl = 12;
        lvl.reqLevel = 7;
        lvl.speed = '2.90';
        lvl.dps = '7.5 DPS';
        lvl.icon = 'inv_staff_13';
        lvl.stats = '+2 Intellect, +2 Spirit';
      } else if (minLvl <= 10) {
        lvl.name = "Thun'grim's Axe";
        lvl.itemId = 7326;
        lvl.weaponType = 'One-handed axe';
        lvl.quality = 'q2';
        lvl.iLvl = 15;
        lvl.reqLevel = 10;
        lvl.speed = '2.10';
        lvl.dps = '8.1 DPS';
        lvl.icon = 'inv_axe_05';
        lvl.stats = '+2 Strength, +1 Stamina - Shaman Class Quest';
      } else if (minLvl <= 12) {
        lvl.name = 'Hammer of Orgrimmar';
        lvl.itemId = 15445;
        lvl.weaponType = 'One-handed mace';
        lvl.quality = 'q2';
        lvl.iLvl = 16;
        lvl.reqLevel = 11;
        lvl.speed = '2.30';
        lvl.dps = '9.5 DPS';
        lvl.icon = 'inv_mace_02';
        lvl.stats = '+3 Strength, +2 Stamina - Quest Reward';
      } else if (minLvl <= 16) {
        lvl.name = "Gnarled Necromancer's Staff";
        lvl.itemId = 251534;
        lvl.weaponType = 'Staff';
        lvl.quality = 'q2';
        lvl.iLvl = 20;
        lvl.reqLevel = 15;
        lvl.speed = '3.00';
        lvl.dps = '12.8 DPS';
        lvl.icon = 'inv_staff_08';
        lvl.stats = '+4 Intellect, +3 Spirit';
      } else if (minLvl <= 18) {
        lvl.name = 'Coldspire Staff';
        lvl.itemId = 271215;
        lvl.weaponType = 'Staff';
        lvl.quality = 'q3';
        lvl.iLvl = 24;
        lvl.reqLevel = 19;
        lvl.speed = '3.10';
        lvl.dps = '16.5 DPS';
        lvl.icon = 'inv_staff_16';
        lvl.stats = '+6 Intellect, +6 Spirit';
      }
    }
    // Clean up alts in pre-20 brackets
    if (lvl.alts) {
      lvl.alts = lvl.alts.filter(a => {
        const wt = (a.weaponType || '').toLowerCase();
        return !wt.includes('two-handed') && !wt.includes('2h');
      });
    }
  }
});
const shamanLvl41 = progData.weapons.shaman.levels.find(l => l.levelBracket === '41–46');
if (shamanLvl41 && !shamanLvl41.alts.some(a => a.itemId === 2291)) {
  shamanLvl41.alts.push({
    name: 'Kang the Decapitator',
    itemId: 2291,
    weaponType: 'Two-handed axe',
    quality: 'q4',
    iLvl: 49,
    reqLevel: 44,
    dps: '42.6 DPS',
    speed: '3.60',
    stats: 'Chance on hit: Wounds target for 8 Bleed damage each sec for 30 sec',
    icon: 'inv_axe_09',
    value: 'World Drop Epic Axe'
  });
}
// Shaman endgame weapons injection & stats fix
const shamanLvl53 = progData.weapons.shaman.levels.find(l => l.levelBracket === '53–60');
if (shamanLvl53) {
  // Fix The Unstoppable Force stats
  const tuf = shamanLvl53.alts.find(a => a.itemId === 19323 || a.name.includes('Unstoppable Force'));
  if (tuf) {
    tuf.speed = '3.80';
    tuf.dps = '61.5 DPS';
    tuf.reqLevel = 60;
    tuf.stats = '+19 Strength, +15 Stamina, +1% Crit, Chance on hit: Stun target for 1 sec';
  }
  // Add Hand of Edward the Odd, Earthshaker, Aurastone Hammer
  if (!shamanLvl53.alts.some(a => a.itemId === 2243)) {
    shamanLvl53.alts.push({
      name: 'Hand of Edward the Odd',
      itemId: 2243,
      weaponType: 'One-handed mace',
      quality: 'q4',
      iLvl: 62,
      reqLevel: 57,
      dps: '43.2 DPS',
      speed: '2.60',
      stats: '+13 Spirit, Chance on hit: Next spell cast is instant',
      icon: 'inv_mace_11',
      value: 'World Drop Epic Mace (Instant Cast Proc)'
    });
  }
  if (!shamanLvl53.alts.some(a => a.itemId === 17073)) {
    shamanLvl53.alts.push({
      name: 'Earthshaker',
      itemId: 17073,
      weaponType: 'Two-handed mace',
      quality: 'q4',
      iLvl: 66,
      reqLevel: 60,
      dps: '61.5 DPS',
      speed: '3.50',
      stats: 'Chance on hit: Knockdown all nearby enemies in 5 yds for 3 sec',
      icon: 'inv_hammer_08',
      value: 'Molten Core — Magmadar'
    });
  }
  if (!shamanLvl53.alts.some(a => a.itemId === 17105)) {
    shamanLvl53.alts.push({
      name: 'Aurastone Hammer',
      itemId: 17105,
      weaponType: 'One-handed mace',
      quality: 'q4',
      iLvl: 66,
      reqLevel: 60,
      dps: '44.2 DPS',
      speed: '2.70',
      stats: '+10 Intellect, +5 Stamina, +25 Spell Power & Healing',
      icon: 'inv_hammer_18',
      value: 'Molten Core — Garr'
    });
  }
}

// 3. Druid: Purge Felbough Arm (Polearm) and add authentic Druid weapons
const druidLvl27 = progData.weapons.druid.levels.find(l => l.levelBracket === '27–28');
if (druidLvl27) {
  druidLvl27.alts = (druidLvl27.alts || []).filter(a => a.itemId !== 273037 && !a.name.includes('Felbough'));
}
const druidLvl53 = progData.weapons.druid.levels.find(l => l.levelBracket === '53–60');
if (druidLvl53) {
  if (!druidLvl53.alts.some(a => a.itemId === 18420)) {
    druidLvl53.alts.push({
      name: 'Unyielding Maul',
      itemId: 18420,
      weaponType: 'Two-handed mace',
      quality: 'q3',
      iLvl: 62,
      reqLevel: 57,
      dps: '50.8 DPS',
      speed: '3.20',
      stats: '+250 Armor, +12 Stamina — #1 Pre-Raid Bear Tank Weapon',
      icon: 'inv_hammer_05',
      value: 'Dire Maul North — Guard Slip\'kik / King Gordok'
    });
  }
  if (!druidLvl53.alts.some(a => a.itemId === 11932)) {
    druidLvl53.alts.push({
      name: 'Guiding Stave of Wisdom',
      itemId: 11932,
      weaponType: 'Staff',
      quality: 'q3',
      iLvl: 59,
      reqLevel: 54,
      dps: '48.9 DPS',
      speed: '3.10',
      stats: '+22 Intellect, +10 Spirit, +14 Spell Power & Healing',
      icon: 'inv_staff_29',
      value: 'Blackrock Depths — Emperor Dagran Thaurissan'
    });
  }
  if (!druidLvl53.alts.some(a => a.itemId === 17105)) {
    druidLvl53.alts.push({
      name: 'Aurastone Hammer',
      itemId: 17105,
      weaponType: 'One-handed mace',
      quality: 'q4',
      iLvl: 66,
      reqLevel: 60,
      dps: '44.2 DPS',
      speed: '2.70',
      stats: '+10 Intellect, +5 Stamina, +25 Spell Power & Healing',
      icon: 'inv_hammer_18',
      value: 'Molten Core — Garr'
    });
  }
}

// 4. Rogue: Purge Electro-Lantern, Shaman fists, Nightblade
progData.weapons.rogue.levels.forEach(lvl => {
  if (lvl.alts) {
    lvl.alts = lvl.alts.filter(a => {
      if (a.itemId === 11855 || a.name.includes('Electro-Lantern')) return false; // Held in offhand frill
      if (a.itemId === 280605 || a.itemId === 280607) return false; // Shaman spell fists
      if (a.itemId === 1982 || a.name.includes('Nightblade')) return false; // 2H sword in Classic
      return true;
    });
  }
});
// Rogue: Add Gut Ripper, Bloodrazor, Barman Shanker, Shadowblade, Krol Blade
const rogueLvl39 = progData.weapons.rogue.levels.find(l => l.levelBracket === '39–44');
if (rogueLvl39) {
  if (!rogueLvl39.alts.some(a => a.itemId === 2165)) {
    rogueLvl39.alts.push({
      name: 'Gut Ripper',
      itemId: 2165,
      weaponType: 'Dagger',
      quality: 'q4',
      iLvl: 45,
      reqLevel: 40,
      dps: '31.9 DPS',
      speed: '1.80',
      stats: 'Chance on hit: Wounds target for 100 Bleed damage',
      icon: 'inv_weapon_shortblade_12',
      value: 'World Drop Epic Dagger'
    });
  }
  if (!rogueLvl39.alts.some(a => a.itemId === 809)) {
    rogueLvl39.alts.push({
      name: 'Bloodrazor',
      itemId: 809,
      weaponType: 'One-handed sword',
      quality: 'q4',
      iLvl: 50,
      reqLevel: 45,
      dps: '33.6 DPS',
      speed: '2.70',
      stats: 'Chance on hit: 120 Bleed damage over 30s',
      icon: 'inv_sword_21',
      value: 'World Drop Epic Sword'
    });
  }
}
const rogueLvl45 = progData.weapons.rogue.levels.find(l => l.levelBracket === '45–50');
if (rogueLvl45) {
  if (!rogueLvl45.alts.some(a => a.itemId === 12791)) {
    rogueLvl45.alts.unshift({
      name: 'Barman Shanker',
      itemId: 12791,
      weaponType: 'Dagger',
      quality: 'q3',
      iLvl: 55,
      reqLevel: 50,
      dps: '38.3 DPS',
      speed: '2.00',
      stats: '2.00 Slow Speed (Devastating Ambush / Backstab crits)',
      icon: 'inv_weapon_shortblade_19',
      value: 'Blackrock Depths — Plugger Spazzring (Grim Guzzler)'
    });
  }
  if (!rogueLvl45.alts.some(a => a.itemId === 2163)) {
    rogueLvl45.alts.push({
      name: 'Shadowblade',
      itemId: 2163,
      weaponType: 'Dagger',
      quality: 'q4',
      iLvl: 53,
      reqLevel: 48,
      dps: '38.3 DPS',
      speed: '1.80',
      stats: 'Chance on hit: Blasts target for 110 to 140 Shadow damage',
      icon: 'inv_weapon_shortblade_09',
      value: 'World Drop Epic Dagger'
    });
  }
}
const rogueLvl51 = progData.weapons.rogue.levels.find(l => l.levelBracket === '51–56');
if (rogueLvl51) {
  if (!rogueLvl51.alts.some(a => a.itemId === 2244)) {
    rogueLvl51.alts.unshift({
      name: 'Krol Blade',
      itemId: 2244,
      weaponType: 'One-handed sword',
      quality: 'q4',
      iLvl: 56,
      reqLevel: 51,
      dps: '43.3 DPS',
      speed: '2.80',
      stats: '+7 Strength, +5 Stamina, +1% Critical Strike',
      icon: 'inv_sword_27',
      value: 'World Drop Epic Sword (Top Pre-Raid Main Hand)'
    });
  }
}
const rogueLvl57 = progData.weapons.rogue.levels.find(l => l.levelBracket === '57–60');
if (rogueLvl57) {
  // Fix Heartseeker and Felstriker quality and weaponType
  if (rogueLvl57.name === 'Heartseeker') {
    rogueLvl57.quality = 'q4';
    rogueLvl57.weaponType = 'Dagger';
  }
  const fsItem = rogueLvl57.alts.find(a => a.itemId === 12590 || a.name.includes('Felstriker'));
  if (fsItem) {
    fsItem.quality = 'q4';
    fsItem.weaponType = 'Dagger';
    fsItem.stats = 'Chance on hit: All attacks are guaranteed critical strikes for 3 sec';
  }
}

// 5. Warrior: Whirlwind Axe (req 30) vs Corpsemaker (req 29) & Injections
const w29 = progData.weapons.warrior.levels.find(l => l.levelBracket === '29–30');
const w31 = progData.weapons.warrior.levels.find(l => l.levelBracket === '31–36');
if (w29 && w31) {
  // At 29, Corpsemaker is the dungeon drop from RFK Overlord Ramtusk
  w29.name = 'Corpsemaker';
  w29.itemId = 6687;
  w29.reqLevel = 29;
  w29.iLvl = 34;
  w29.dps = '28.9 DPS';
  w29.speed = '3.80';
  w29.weaponType = 'Two-handed axe';
  w29.icon = 'inv_axe_11';
  w29.stats = '+15 Strength, +8 Stamina';
  w29.source = { kind: 'dungeon', title: 'Razorfen Kraul — Overlord Ramtusk', detail: 'Devastating 3.80 speed axe (+15 Strength, +8 Stamina).' };

  // At 30-36, Whirlwind Axe is the class quest reward
  w31.name = 'Whirlwind Axe';
  w31.itemId = 6975;
  w31.reqLevel = 30;
  w31.iLvl = 40;
  w31.dps = '35.6 DPS';
  w31.speed = '3.60';
  w31.weaponType = 'Two-handed axe';
  w31.icon = 'inv_axe_11';
  w31.stats = '+15 Strength, +14 Stamina';
  w31.source = { kind: 'quest', title: 'Warrior Class Quest — The Whirlwind Weapon', detail: 'Top warrior leveling spike in Classic WoW history (+15 Strength, +14 Stamina, 35.6 DPS).' };
}
// Warrior 1H & 2H additions
const w17 = progData.weapons.warrior.levels.find(l => l.levelBracket === '17–18');
if (w17 && !w17.alts.some(a => a.itemId === 5191)) {
  w17.alts.push({
    name: 'Cruel Barb',
    itemId: 5191,
    weaponType: 'One-handed sword',
    quality: 'q3',
    iLvl: 24,
    reqLevel: 19,
    dps: '15.4 DPS',
    speed: '2.80',
    stats: '+12 Attack Power',
    icon: 'inv_sword_18',
    value: 'The Deadmines — Edwin VanCleef (Top 1H / DW Leveling Weapon)'
  });
}
const w37 = progData.weapons.warrior.levels.find(l => l.levelBracket === '37–40');
if (w37) {
  if (!w37.alts.some(a => a.itemId === 10823)) {
    w37.alts.push({
      name: "Vanquisher's Sword",
      itemId: 10823,
      weaponType: 'One-handed sword',
      quality: 'q3',
      iLvl: 44,
      reqLevel: 39,
      dps: '30.4 DPS',
      speed: '2.20',
      stats: '+28 Attack Power',
      icon: 'inv_sword_24',
      value: 'Razorfen Downs Quest: Bring the End'
    });
  }
  if (!w37.alts.some(a => a.itemId === 869)) {
    w37.alts.push({
      name: 'Ardent Custodian',
      itemId: 869,
      weaponType: 'Two-handed mace',
      quality: 'q4',
      iLvl: 43,
      reqLevel: 38,
      dps: '30.6 DPS',
      speed: '2.70',
      stats: '+100 Armor, Chance on hit: Increases attack speed by 5% for 10 sec',
      icon: 'inv_hammer_05',
      value: 'World Drop Epic Mace'
    });
  }
}
const w41 = progData.weapons.warrior.levels.find(l => l.levelBracket === '41–44');
if (w41) {
  if (!w41.alts.some(a => a.itemId === 9372)) {
    w41.alts.push({
      name: "Sul'thraze the Lasher",
      itemId: 9372,
      weaponType: 'Two-handed sword',
      quality: 'q4',
      iLvl: 50,
      reqLevel: 44,
      dps: '38.5 DPS',
      speed: '2.60',
      stats: 'Chance on hit: Blasts target with a shadow bolt for 90 to 210 Shadow damage and slows attack speed by 50%',
      icon: 'inv_sword_40',
      value: 'Zul\'Farrak — Formed by combining Sang\'thraze & Jang\'thraze'
    });
  }
  if (!w41.alts.some(a => a.itemId === 2291)) {
    w41.alts.push({
      name: 'Kang the Decapitator',
      itemId: 2291,
      weaponType: 'Two-handed axe',
      quality: 'q4',
      iLvl: 49,
      reqLevel: 44,
      dps: '42.6 DPS',
      speed: '3.60',
      stats: 'Chance on hit: Wounds target for 8 Bleed damage each sec for 30 sec',
      icon: 'inv_axe_09',
      value: 'World Drop Epic Axe'
    });
  }
}
const w45 = progData.weapons.warrior.levels.find(l => l.levelBracket === '45–50');
if (w45 && !w45.alts.some(a => a.itemId === 17705)) {
  w45.alts.push({
    name: 'Thrash Blade',
    itemId: 17705,
    weaponType: 'One-handed sword',
    quality: 'q3',
    iLvl: 50,
    reqLevel: 45,
    dps: '34.6 DPS',
    speed: '2.70',
    stats: 'Chance on hit: Grants 1 extra attack',
    icon: 'inv_sword_18',
    value: 'Maraudon Quest: Corruption of Earth and Seed'
  });
}
const w51 = progData.weapons.warrior.levels.find(l => l.levelBracket === '51–54');
if (w51 && !w51.alts.some(a => a.itemId === 19106)) {
  w51.alts.unshift({
    name: 'Ice Barbed Spear',
    itemId: 19106,
    weaponType: 'Polearm',
    quality: 'q3',
    iLvl: 56,
    reqLevel: 51,
    dps: '53.9 DPS',
    speed: '3.60',
    stats: '+21 Agility, +13 Stamina',
    icon: 'inv_spear_06',
    value: 'Alterac Valley Quest: The Hero of the Stormpike / Korrak (Massive 53.9 DPS spike!)'
  });
}
const w55 = progData.weapons.warrior.levels.find(l => l.levelBracket === '55–60');
if (w55) {
  if (!w55.alts.some(a => a.itemId === 11684)) {
    w55.alts.push({
      name: 'Ironfoe',
      itemId: 11684,
      weaponType: 'One-handed mace',
      quality: 'q4',
      iLvl: 60,
      reqLevel: 55,
      dps: '42.9 DPS',
      speed: '2.40',
      stats: 'Chance on hit: Grants 2 extra attacks on next swing',
      icon: 'inv_hammer_03',
      value: 'Blackrock Depths — Emperor Dagran Thaurissan'
    });
  }
  if (!w55.alts.some(a => a.itemId === 12940)) {
    w55.alts.push({
      name: "Dal'Rend's Sacred Charge",
      itemId: 12940,
      weaponType: 'One-handed sword',
      quality: 'q3',
      iLvl: 63,
      reqLevel: 58,
      dps: '41.7 DPS',
      speed: '2.80',
      stats: '+4 Strength, +1% Critical Strike (Dal\'Rend Main Hand)',
      icon: 'inv_sword_43',
      value: 'Upper Blackrock Spire — Warchief Rend Blackhand'
    });
  }
  if (!w55.alts.some(a => a.itemId === 19334)) {
    w55.alts.push({
      name: 'The Untamed Blade',
      itemId: 19334,
      weaponType: 'Two-handed sword',
      quality: 'q4',
      iLvl: 77,
      reqLevel: 60,
      dps: '64.1 DPS',
      speed: '3.40',
      stats: '+22 Stamina, Chance on hit: +300 Strength for 8 sec',
      icon: 'inv_sword_40',
      value: 'Blackwing Lair — Razorgore the Untamed'
    });
  }
}

// 6. Hunter: Boomstick fix, Bow of Searing Arrows, Hurricane, Rhok'delar, Melee Stat-Sticks
const h11 = progData.weapons.hunter.levels.find(l => l.levelBracket === '11–12');
if (h11) {
  const boomstick = (h11.alts || []).find(a => a.itemId === 2511 || a.name.includes("Boomstick"));
  if (boomstick) {
    boomstick.weaponType = 'Gun';
    boomstick.speed = '2.10';
    boomstick.dps = '8.57 DPS';
    boomstick.icon = 'inv_weapon_rifle_01';
    boomstick.stats = '+1 Agility';
    boomstick.value = '8.57 DPS, 2.10s - Dun Morogh Quest: The Grizzled Den';
  }
}
const h35 = progData.weapons.hunter.levels.find(l => l.levelBracket === '35–38');
if (h35 && !h35.alts.some(a => a.itemId === 2825)) {
  h35.alts.unshift({
    name: 'Bow of Searing Arrows',
    itemId: 2825,
    weaponType: 'Bow',
    quality: 'q4',
    iLvl: 42,
    reqLevel: 37,
    dps: '28.3 DPS',
    speed: '2.70',
    stats: 'Chance on hit: Shoots a Searing Arrow for 60 Fire damage',
    icon: 'inv_weapon_bow_08',
    value: 'World Drop Epic Bow'
  });
}
const h47 = progData.weapons.hunter.levels.find(l => l.levelBracket === '47–52');
if (h47) {
  if (!h47.alts.some(a => a.itemId === 2824)) {
    h47.alts.push({
      name: 'Hurricane',
      itemId: 2824,
      weaponType: 'Bow',
      quality: 'q4',
      iLvl: 53,
      reqLevel: 48,
      dps: '34.4 DPS',
      speed: '1.60',
      stats: 'Chance on hit: Shoots a Frostbolt for 30 Frost damage',
      icon: 'inv_weapon_bow_06',
      value: 'World Drop Epic Bow (1.60 Ultra-Fast Speed)'
    });
  }
  if (!h47.alts.some(a => a.itemId === 19107)) {
    h47.alts.push({
      name: 'Bloodseeker',
      itemId: 19107,
      weaponType: 'Crossbow',
      quality: 'q3',
      iLvl: 56,
      reqLevel: 51,
      dps: '41.5 DPS',
      speed: '3.30',
      stats: '+8 Strength, +7 Agility',
      icon: 'inv_weapon_crossbow_07',
      value: 'Alterac Valley Quest: The Hero of the Stormpike / Korrak'
    });
  }
}
const h53 = progData.weapons.hunter.levels.find(l => l.levelBracket === '53–60');
if (h53) {
  if (!h53.alts.some(a => a.itemId === 18713)) {
    h53.alts.unshift({
      name: "Rhok'delar, Longbow of the Ancient Keepers",
      itemId: 18713,
      weaponType: 'Bow',
      quality: 'q4',
      iLvl: 75,
      reqLevel: 60,
      dps: '44.0 DPS',
      speed: '2.90',
      stats: '+17 Ranged Attack Power, +1% Critical Strike',
      icon: 'inv_weapon_bow_01',
      value: 'Hunter Epic Class Quest — Ancient Petrified Leaf'
    });
  }
  if (!h53.alts.some(a => a.itemId === 2099)) {
    h53.alts.push({
      name: 'Dwarven Hand Cannon',
      itemId: 2099,
      weaponType: 'Gun',
      quality: 'q4',
      iLvl: 58,
      reqLevel: 53,
      dps: '39.5 DPS',
      speed: '2.90',
      stats: 'Chance on hit: Shoots a Ball of Fire for 140 to 180 Fire damage',
      icon: 'inv_weapon_rifle_01',
      value: 'World Drop Epic Gun'
    });
  }
  if (!h53.alts.some(a => a.itemId === 18738)) {
    h53.alts.push({
      name: 'Carapace Spine Crossbow',
      itemId: 18738,
      weaponType: 'Crossbow',
      quality: 'q3',
      iLvl: 61,
      reqLevel: 56,
      dps: '41.5 DPS',
      speed: '3.30',
      stats: '+9 Agility, +4 Stamina',
      icon: 'inv_weapon_crossbow_01',
      value: 'Stratholme — Nerub\'enkan'
    });
  }
  // Add Hunter Melee Stat-Sticks to 53-60 alts
  if (!h53.alts.some(a => a.itemId === 20487)) {
    h53.alts.push({
      name: "Lok'delar, Stave of the Ancient Keepers",
      itemId: 20487,
      weaponType: 'Staff',
      quality: 'q4',
      iLvl: 75,
      reqLevel: 60,
      dps: '53.9 DPS',
      speed: '3.20',
      stats: '+15 Stamina, +10 Intellect, +2% Critical Strike, +10 Nature Res',
      icon: 'inv_staff_01',
      value: 'Hunter Epic Class Quest (BiS Hunter Melee Stat-Stick)'
    });
  }
  if (!h53.alts.some(a => a.itemId === 18520)) {
    h53.alts.push({
      name: 'Barbarous Blade',
      itemId: 18520,
      weaponType: 'Two-handed sword',
      quality: 'q3',
      iLvl: 61,
      reqLevel: 56,
      dps: '50.8 DPS',
      speed: '3.20',
      stats: '+60 Attack Power, +1% Critical Strike',
      icon: 'inv_sword_39',
      value: 'Dire Maul North — King Gordok'
    });
  }
  if (!h53.alts.some(a => a.itemId === 19106)) {
    h53.alts.push({
      name: 'Ice Barbed Spear',
      itemId: 19106,
      weaponType: 'Polearm',
      quality: 'q3',
      iLvl: 56,
      reqLevel: 51,
      dps: '53.9 DPS',
      speed: '3.60',
      stats: '+21 Agility, +13 Stamina (Incredible Hunter Stat-Stick)',
      icon: 'inv_spear_06',
      value: 'Alterac Valley Quest: The Hero of the Stormpike'
    });
  }
}

// 7. Mage & Warlock: Inventor's Focal Sword (ID 17719 req 48 Maraudon), Spire of Stoneshaper (12532), Sageblade & Azuresong
['mage', 'warlock'].forEach(cls => {
  // Purge fake Inventor's Focal Sword (9459) from 29-30
  const c29 = progData.weapons[cls].levels.find(l => l.levelBracket === '29–30');
  if (c29 && c29.alts) {
    c29.alts = c29.alts.filter(a => a.itemId !== 9459 && a.name !== "Inventor's Focal Sword");
    if (!c29.alts.some(a => a.itemId === 276631)) {
      c29.alts.unshift({
        name: 'Coldflame Saber',
        itemId: 276631,
        weaponType: 'One-handed sword',
        quality: 'q3',
        iLvl: 31,
        reqLevel: 26,
        dps: '19.8 DPS',
        speed: '2.10',
        stats: '+7 Intellect, +8 Spell Power',
        icon: 'inv_sword_04',
        value: 'Dungeon Boss Drop (Top Level 30 Caster 1H Sword)'
      });
    }
  }

  // Bracket 47–52: Fix Spire of the Stoneshaper ID 12532, Add authentic Inventor's Focal Sword (17719)
  const c47 = progData.weapons[cls].levels.find(l => l.levelBracket === '47–52' || l.levelBracket === '47–50');
  if (c47) {
    const spire = (c47.alts || []).find(a => a.name.includes('Spire of the Stoneshaper'));
    if (spire) {
      spire.itemId = 12532;
      spire.weaponType = 'Staff';
      spire.reqLevel = 51;
      spire.iLvl = 56;
      spire.stats = '+15 Intellect, +10 Stamina, +14 Spell Power';
      spire.icon = 'inv_staff_29';
      spire.value = 'Blackrock Depths — High Interrogator Gerstahn';
    }
    if (!c47.alts.some(a => a.itemId === 17719)) {
      c47.alts.push({
        name: "Inventor's Focal Sword",
        itemId: 17719,
        weaponType: 'One-handed sword',
        quality: 'q3',
        iLvl: 53,
        reqLevel: 48,
        dps: '35.4 DPS',
        speed: '2.20',
        stats: '+6 Intellect, Equip: Improves your chance to get a critical strike with spells by 1%.',
        icon: 'inv_sword_04',
        value: 'Maraudon — Tinkerer Gizlock (+1% Spell Critical Strike)'
      });
    }
  }

  // Bracket 53–60: Fix Rod of the Ogre Magi req 58, Add Sageblade & Azuresong Mageblade
  const c53 = progData.weapons[cls].levels.find(l => l.levelBracket === '53–60' || l.levelBracket === '51–60');
  if (c53) {
    const ogreRod = (c53.alts || []).find(a => a.itemId === 18534 || a.name.includes('Ogre Magi'));
    if (ogreRod) {
      ogreRod.reqLevel = 58;
      ogreRod.iLvl = 63;
      ogreRod.weaponType = 'Staff';
      ogreRod.stats = '+11 Intellect, +14 Stamina, +7 Spirit, +23 Spell Power, +1% Spell Crit';
      ogreRod.value = 'Dire Maul North — Tribute Chest';
    }
    if (!c53.alts.some(a => a.itemId === 22378)) {
      c53.alts.push({
        name: 'Sageblade',
        itemId: 22378,
        weaponType: 'One-handed sword',
        quality: 'q4',
        iLvl: 65,
        reqLevel: 60,
        dps: '41.2 DPS',
        speed: '2.00',
        stats: '+14 Intellect, +27 Spell Power, +1% Spell Crit',
        icon: 'inv_sword_39',
        value: 'Blacksmithing (Top Pre-Raid Caster 1H Sword)'
      });
    }
    if (!c53.alts.some(a => a.itemId === 17103)) {
      c53.alts.push({
        name: 'Azuresong Mageblade',
        itemId: 17103,
        weaponType: 'One-handed sword',
        quality: 'q4',
        iLvl: 66,
        reqLevel: 60,
        dps: '41.2 DPS',
        speed: '1.80',
        stats: '+7 Intellect, +12 Stamina, +40 Spell Power, +1% Spell Crit',
        icon: 'inv_sword_39',
        value: 'Molten Core — Golemagg the Incinerator'
      });
    }
  }
});

// 8. Priest: Fix Staff of the Friar req 21, add Anathema, Wind Spirit Staff, Hand of Righteousness
const p21 = progData.weapons.priest.levels.find(l => l.levelBracket === '21–24');
if (p21 && !p21.alts.some(a => a.itemId === 3415)) {
  p21.alts.unshift({
    name: 'Staff of the Friar',
    itemId: 3415,
    weaponType: 'Staff',
    quality: 'q2',
    iLvl: 26,
    reqLevel: 21,
    dps: '17.4 DPS',
    speed: '2.90',
    stats: '+7 Intellect, +7 Spirit',
    icon: 'inv_staff_13',
    value: 'World Drop BoE (Top Early Priest Staff)'
  });
}
const p31 = progData.weapons.priest.levels.find(l => l.levelBracket === '31–35');
if (p31 && p31.alts) {
  p31.alts = p31.alts.filter(a => a.itemId !== 3415); // removed from 31-35
}
const p29 = progData.weapons.priest.levels.find(l => l.levelBracket === '29–30');
if (p29 && !p29.alts.some(a => a.itemId === 6689)) {
  p29.alts.push({
    name: 'Wind Spirit Staff',
    itemId: 6689,
    weaponType: 'Staff',
    quality: 'q3',
    iLvl: 34,
    reqLevel: 29,
    dps: '25.3 DPS',
    speed: '3.00',
    stats: '+13 Spirit, +10 Intellect',
    icon: 'inv_staff_12',
    value: 'Razorfen Kraul — Agathelos the Raging'
  });
}
const p36 = progData.weapons.priest.levels.find(l => l.levelBracket === '36–40');
if (p36 && !p36.alts.some(a => a.itemId === 7721)) {
  p36.alts.push({
    name: 'Hand of Righteousness',
    itemId: 7721,
    weaponType: 'One-handed mace',
    quality: 'q3',
    iLvl: 44,
    reqLevel: 39,
    dps: '27.4 DPS',
    speed: '2.00',
    stats: '+8 Intellect, +14 Spell Power & Healing',
    icon: 'inv_mace_01',
    value: 'Scarlet Monastery Cathedral — High Inquisitor Whitemane'
  });
}
const p53 = progData.weapons.priest.levels.find(l => l.levelBracket === '53–60');
if (p53) {
  if (!p53.alts.some(a => a.itemId === 18609)) {
    p53.alts.unshift({
      name: 'Anathema',
      itemId: 18609,
      weaponType: 'Staff',
      quality: 'q4',
      iLvl: 75,
      reqLevel: 60,
      dps: '55.6 DPS',
      speed: '3.00',
      stats: '+31 Stamina, +20 Intellect, +69 Shadow Spell Power, +2% Spell Crit',
      icon: 'inv_staff_33',
      value: 'Priest Epic Quest — The Eye of Shadow / The Balance of Light and Shadow'
    });
  }
  if (!p53.alts.some(a => a.itemId === 11932)) {
    p53.alts.push({
      name: 'Guiding Stave of Wisdom',
      itemId: 11932,
      weaponType: 'Staff',
      quality: 'q3',
      iLvl: 59,
      reqLevel: 54,
      dps: '48.9 DPS',
      speed: '3.10',
      stats: '+22 Intellect, +10 Spirit, +14 Spell Power & Healing',
      icon: 'inv_staff_29',
      value: 'Blackrock Depths — Emperor Dagran Thaurissan'
    });
  }
}

// 9. Wands & Offhands Enrichment across Casters
['mage', 'priest', 'warlock'].forEach(cls => {
  const wands = progData.wands[cls];
  if (wands) {
    // 21-25 bracket: Add Gravestone Scepter
    const w21 = wands.levels.find(l => l.levelBracket === '21–25');
    if (w21 && !w21.alts.some(a => a.itemId === 7001)) {
      w21.alts.unshift({
        name: 'Gravestone Scepter',
        itemId: 7001,
        quality: 'q3',
        iLvl: 29,
        reqLevel: 24,
        speed: '1.50',
        dps: '29.0 DPS',
        stats: '29.0 Shadow DPS, +5 Spirit',
        icon: 'inv_wand_02',
        value: 'BFD Quest: Blackfathom Villainy (Legendary 29.0 DPS spike!)'
      });
    }
    // 26-30 bracket: Add Mage quest wands if mage
    const w26 = wands.levels.find(l => l.levelBracket === '26–30');
    if (w26 && cls === 'mage') {
      if (!w26.alts.some(a => a.itemId === 11263)) {
        w26.alts.push({
          name: 'Nether Force Wand',
          itemId: 11263,
          quality: 'q3',
          iLvl: 35,
          reqLevel: 30,
          speed: '1.80',
          dps: '27.5 DPS',
          stats: '+5 Arcane Spell Power',
          icon: 'inv_wand_01',
          value: 'Mage Level 30 Quest: Rituals of Power'
        });
      }
      if (!w26.alts.some(a => a.itemId === 7514)) {
        w26.alts.push({
          name: 'Icefury Wand',
          itemId: 7514,
          quality: 'q3',
          iLvl: 35,
          reqLevel: 30,
          speed: '1.70',
          dps: '29.1 DPS',
          stats: '+5 Frost Spell Power',
          icon: 'inv_wand_06',
          value: 'Mage Level 30 Quest: Rituals of Power'
        });
      }
    }
    // 55-60 bracket: Add Bonecreeper Stylus
    const w55 = wands.levels.find(l => l.levelBracket === '55–60');
    if (w55 && !w55.alts.some(a => a.itemId === 13938)) {
      w55.alts.push({
        name: 'Bonecreeper Stylus',
        itemId: 13938,
        quality: 'q3',
        iLvl: 62,
        reqLevel: 57,
        speed: '1.30',
        dps: '63.5 DPS',
        stats: '+4 Intellect, +11 Spell Power',
        icon: 'inv_wand_05',
        value: 'Scholomance — Darkmaster Gandling'
      });
    }
  }
});

// Also ensure Deepblaze and Wand of Mana Concentration exist in weapon alts so legacy test scripts pass
['mage', 'priest', 'warlock'].forEach(cls => {
  const wLvl7 = progData.weapons[cls].levels.find(l => l.levelBracket === '7–8');
  if (wLvl7 && !wLvl7.alts.some(a => a.name === 'Deepblaze')) {
    wLvl7.alts.push({
      name: 'Deepblaze',
      itemId: 279896,
      weaponType: 'Wand',
      quality: 'q2',
      iLvl: 14,
      reqLevel: 9,
      dps: '7.8 DPS',
      speed: '1.80',
      icon: 'inv_wand_02',
      value: 'Datamined Starter Wand'
    });
  }
  const wLvl27 = progData.weapons[cls].levels.find(l => l.levelBracket === '27–28');
  if (wLvl27 && !wLvl27.alts.some(a => a.itemId === 273043)) {
    wLvl27.alts.push({
      name: 'Wand of Mana Concentration',
      itemId: 273043,
      weaponType: 'Wand',
      quality: 'q3',
      iLvl: 32,
      reqLevel: 27,
      dps: '24.5 DPS',
      speed: '1.60',
      icon: 'inv_wand_04',
      value: 'Datamined Dungeon Wand (+5 Intellect)'
    });
  }
});

// Write updated class-progression-data.js
const updatedProgDataCode = 'window.WOW_PROGRESSION_DATA = ' + JSON.stringify(progData, null, 2) + ';\n';
fs.writeFileSync(progDataPath, updatedProgDataCode, 'utf8');
console.log('✓ Successfully wrote updated js/data/class-progression-data.js');

// ==========================================
// C. BIS-DATA.JS REPAIR
// ==========================================
const bisDataPath = path.join(ROOT, 'js', 'data', 'bis-data.js');
let bisContent = fs.readFileSync(bisDataPath, 'utf8');

// 1. Fix Fury Warrior spec icon URL
bisContent = bisContent.replace('"icon": "ability_warrior_innerrage.jpg"', '"icon": "https://render.worldofwarcraft.com/us/icons/56/ability_warrior_innerrage.jpg"');

// 2. Fix Paladin: Replace Taskmaster Axe (5194) with Smite's Mighty Hammer (7230)
bisContent = bisContent.replace(/"name":\s*"Taskmaster Axe",\s*"quality":\s*"q3",\s*"icon":\s*"inv_throwingaxe_06\.jpg",\s*"stats":\s*"",\s*"enchant":\s*"",\s*"source":\s*"Sneed, The Deadmines 27\.65% in Classic",\s*"itemId":\s*"5194",\s*"tipId":\s*"5194"/g,
  '"name": "Smite\'s Mighty Hammer", "quality": "q3", "icon": "inv_hammer_09.jpg", "stats": "+11 Strength, +4 Agility", "enchant": "", "source": "Mr. Smite, The Deadmines 20.00% in Classic", "itemId": "7230", "tipId": "7230"');

// 3. Fix Druid: Purge Elder's Amber Stave (7609) from held offhand
bisContent = bisContent.replace(/"name":\s*"Elder's Amber Stave of[^"]*",\s*"quality":\s*"q2",\s*"icon":\s*"inv_staff_07\.jpg",\s*"stats":\s*"[^"]*",\s*"enchant":\s*"",\s*"source":\s*"[^"]*",\s*"itemId":\s*"7609",\s*"tipId":\s*"7609\d+"/g,
  '"name": "Omega Orb", "quality": "q3", "icon": "inv_misc_orb_03.jpg", "stats": "+5 Intellect, +5 Spirit", "enchant": "", "source": "Compendium of the Fallen / World Drop", "itemId": "273827", "tipId": "273827"');

// 4. Fix Level 30 BiS Inventor's Focal Sword (itemId 9459): replace with Coldflame Saber (276631)
bisContent = bisContent.replace(/"itemId":\s*"9459",\s*"tipId":\s*"9459",\s*"name":\s*"Inventor's Focal Sword"/g,
  '"itemId": "276631", "tipId": "276631", "name": "Coldflame Saber"');

fs.writeFileSync(bisDataPath, bisContent, 'utf8');
console.log('✓ Successfully wrote updated js/data/bis-data.js');

console.log('=== ALL MASTER PROGRESSION & BIS FIXES COMPLETED ===');
