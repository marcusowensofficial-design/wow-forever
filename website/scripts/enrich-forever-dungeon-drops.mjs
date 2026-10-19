import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const fwPath = path.join(ROOT, 'data', 'scraped', 'forever_weapons.json');
const fwandPath = path.join(ROOT, 'data', 'scraped', 'forever_wands.json');
const foffPath = path.join(ROOT, 'data', 'scraped', 'forever_offhands.json');

const fw = JSON.parse(fs.readFileSync(fwPath, 'utf8'));
const fwand = JSON.parse(fs.readFileSync(fwandPath, 'utf8'));
const foff = JSON.parse(fs.readFileSync(foffPath, 'utf8'));

// Master mapping of all 20 WoW Forever dungeon drops
const FOREVER_DUNGEON_METADATA = {
  // Hall of Thanes (13–18)
  'Fang of Magmatus': {
    boss: 'Magmatus',
    dungeon: 'Hall of Thanes (Levels 13–18)'
  },
  'Golemheart Stave': {
    boss: 'Plunder',
    dungeon: 'Hall of Thanes (Levels 13–18)'
  },
  "Durgen's Crescent Axe": {
    boss: 'Durgen Dirgehammer',
    dungeon: 'Hall of Thanes (Levels 13–18)'
  },

  // Ruins of Lordaeron (15–20)
  'Meathook Slicer': {
    boss: 'The Baron',
    dungeon: 'Ruins of Lordaeron (Levels 15–20)'
  },
  'Segmented Spider Leg': {
    boss: 'Witherfang',
    dungeon: 'Ruins of Lordaeron (Levels 15–20)'
  },
  'Scepter of the Abandoned': {
    boss: 'The Abandoned',
    dungeon: 'Ruins of Lordaeron (Levels 15–20)'
  },
  'Corpse Chopper': {
    boss: 'Bjork',
    dungeon: 'Ruins of Lordaeron (Levels 15–20)'
  },
  "Mirror of Rath'mael": {
    boss: "Rath'mael",
    dungeon: 'Ruins of Lordaeron (Levels 15–20)'
  },
  'Coldspire Staff': {
    boss: "Rath'mael",
    dungeon: 'Ruins of Lordaeron (Levels 15–20)'
  },
  'Vileblood Scimitar': {
    boss: 'Viktor the Vile',
    dungeon: 'Ruins of Lordaeron (Levels 15–20)'
  },
  'Haunting Blade': {
    boss: 'Lordaeron Captain',
    dungeon: 'Ruins of Lordaeron (Levels 15–20)'
  },

  // Excavation Site: Wetlands (26–31)
  "Raptor's Gaze": {
    boss: 'Shadetooth',
    dungeon: 'Excavation Site: Wetlands (Levels 26–31)'
  },
  'Golemsight Long Gun': {
    boss: 'Relic Guardian',
    dungeon: 'Excavation Site: Wetlands (Levels 26–31)'
  },

  // City of Dalaran (28–33)
  'Gravespike Repeater': {
    boss: 'Atrexis the Grave Knight',
    dungeon: 'City of Dalaran (Levels 28–33)'
  },
  'Tendonscraper Dagger': {
    boss: 'Lyn the Ignored',
    dungeon: 'City of Dalaran (Levels 28–33)'
  },
  'Bonepile Gaze': {
    boss: 'Lyn the Ignored',
    dungeon: 'City of Dalaran (Levels 28–33)'
  },
  'Wand of Mana Concentration': {
    boss: 'Arcanic Enigma',
    dungeon: 'City of Dalaran (Levels 28–33)'
  },
  "Guardian's Dualblade": {
    boss: 'Unstable Sentinel',
    dungeon: 'City of Dalaran (Levels 28–33)'
  },
  'Ponderous Orb': {
    boss: 'Shade of the Archmage',
    dungeon: 'City of Dalaran (Levels 28–33)'
  },
  'Spine of the Devourer': {
    boss: 'Mana Devourer',
    dungeon: 'City of Dalaran (Levels 28–33)'
  }
};

let updatedCount = 0;

function tagItem(item) {
  if (!item || !item.name) return;
  const meta = FOREVER_DUNGEON_METADATA[item.name];
  if (meta) {
    item.source = {
      kind: 'dungeon',
      title: meta.boss,
      detail: meta.dungeon
    };
    updatedCount++;
  }
}

function traverse(obj) {
  if (!obj || typeof obj !== 'object') return;
  if (obj.name && FOREVER_DUNGEON_METADATA[obj.name]) {
    tagItem(obj);
  }
  for (const k of Object.keys(obj)) {
    traverse(obj[k]);
  }
}

traverse(fw);
traverse(fwand);
traverse(foff);

console.log(`Updated ${updatedCount} occurrences of WoW Forever dungeon drops with kind: 'dungeon'.`);

// Cross-class alternative additions for WoW Forever dungeons
// 1. Haunting Blade for Hunter (bracket 15–16 or 17–18 melee stat stick)
const hunterSteps = fw.hunter?.levels || [];
const step17Hunter = hunterSteps.find(s => s.levelBracket === '17–18' || s.levelBracket === '15–16');
if (step17Hunter && !step17Hunter.alts?.some(a => a.name === 'Haunting Blade')) {
  step17Hunter.alts = step17Hunter.alts || [];
  step17Hunter.alts.push({
    name: 'Haunting Blade',
    itemId: 6641,
    icon: 'inv_sword_24',
    weaponType: '2H Sword',
    speed: '3.40',
    dps: '15.7 DPS',
    value: '15.7 DPS, 3.40s - +5 Strength, +3 Stamina - Lordaeron Captain',
    faction: 'both',
    quality: 'q3',
    iLvl: 20,
    reqLevel: 15,
    stats: '+5 Strength, +3 Stamina',
    lines: [
      'Binds when picked up',
      'Two-Hand\tTwo-Handed Sword',
      '43 - 64 Damage\tSpeed 3.40',
      '(15.74 damage per second)',
      '+5 Strength',
      '+3 Stamina',
      'Requires Level 15'
    ],
    source: {
      kind: 'dungeon',
      title: 'Lordaeron Captain',
      detail: 'Ruins of Lordaeron (Levels 15–20)'
    }
  });
  console.log('Added Haunting Blade to Hunter bracket 17–18.');
}

// 2. Meathook Slicer for Shaman and Druid (bracket 17–18 dagger alternative)
for (const cls of ['shaman', 'druid']) {
  const steps = fw[cls]?.levels || [];
  const step17 = steps.find(s => s.levelBracket === '17–18');
  if (step17 && !step17.alts?.some(a => a.name === 'Meathook Slicer')) {
    step17.alts = step17.alts || [];
    step17.alts.push({
      name: 'Meathook Slicer',
      itemId: 271204,
      icon: 'inv_weapon_shortblade_07',
      weaponType: 'Dagger',
      speed: '1.60',
      dps: '14.69 DPS',
      value: '14.7 DPS, 1.60s - +4 Agility, +3 Stamina - The Baron',
      faction: 'both',
      quality: 'q3',
      iLvl: 23,
      reqLevel: 18,
      stats: '+4 Agility, +3 Stamina',
      lines: [
        'Binds when picked up',
        'One-Hand\tDagger',
        '18 - 34 Damage\tSpeed 1.60',
        '(14.69 damage per second)',
        '+4 Agility',
        '+3 Stamina',
        'Requires Level 18'
      ],
      source: {
        kind: 'dungeon',
        title: 'The Baron',
        detail: 'Ruins of Lordaeron (Levels 15–20)'
      }
    });
    console.log(`Added Meathook Slicer to ${cls} bracket 17–18.`);
  }
}

// 3. Gravespike Repeater for Rogue and Warrior (bracket 27–28 ranged stat stick alternative)
for (const cls of ['warrior', 'rogue']) {
  const steps = fw[cls]?.levels || [];
  const step27 = steps.find(s => s.levelBracket === '27–28');
  if (step27 && !step27.alts?.some(a => a.name === 'Gravespike Repeater')) {
    step27.alts = step27.alts || [];
    step27.alts.push({
      name: 'Gravespike Repeater',
      itemId: 273033,
      icon: 'inv_weapon_crossbow_08',
      weaponType: 'Crossbow',
      speed: '2.80',
      dps: '15.43 DPS',
      value: '15.43 DPS, 2.80s - +6 Agility, +4 Stamina - Atrexis the Grave Knight',
      faction: 'both',
      quality: 'q3',
      iLvl: 33,
      reqLevel: 28,
      stats: '+6 Agility, +4 Stamina',
      lines: [
        'Binds when picked up',
        'Ranged\tCrossbow',
        '33 - 54 Damage\tSpeed 2.80',
        '(15.43 damage per second)',
        '+6 Agility',
        '+4 Stamina',
        'Requires Level 28'
      ],
      source: {
        kind: 'dungeon',
        title: 'Atrexis the Grave Knight',
        detail: 'City of Dalaran (Levels 28–33)'
      }
    });
    console.log(`Added Gravespike Repeater to ${cls} bracket 27–28.`);
  }
}

// 4. Golemsight Long Gun for Rogue and Warrior (bracket 25–26 ranged stat stick alternative)
for (const cls of ['warrior', 'rogue']) {
  const steps = fw[cls]?.levels || [];
  const step25 = steps.find(s => s.levelBracket === '25–26');
  if (step25 && !step25.alts?.some(a => a.name === 'Golemsight Long Gun')) {
    step25.alts = step25.alts || [];
    step25.alts.push({
      name: 'Golemsight Long Gun',
      itemId: 273029,
      icon: 'inv_weapon_rifle_07',
      weaponType: 'Gun',
      speed: '2.60',
      dps: '16.60 DPS',
      value: '16.60 DPS, 2.60s - +6 Agility - Relic Guardian',
      faction: 'both',
      quality: 'q3',
      iLvl: 31,
      reqLevel: 26,
      stats: '+6 Agility',
      lines: [
        'Binds when picked up',
        'Ranged\tGun',
        '34 - 52 Damage\tSpeed 2.60',
        '(16.60 damage per second)',
        '+6 Agility',
        'Requires Level 26'
      ],
      source: {
        kind: 'dungeon',
        title: 'Relic Guardian',
        detail: 'Excavation Site: Wetlands (Levels 26–31)'
      }
    });
    console.log(`Added Golemsight Long Gun to ${cls} bracket 25–26.`);
  }
}

fs.writeFileSync(fwPath, JSON.stringify(fw, null, 2), 'utf8');
fs.writeFileSync(fwandPath, JSON.stringify(fwand, null, 2), 'utf8');
fs.writeFileSync(foffPath, JSON.stringify(foff, null, 2), 'utf8');

console.log('Saved all updated progression files.');
