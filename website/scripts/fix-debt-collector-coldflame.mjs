import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');

const bisPath = path.join(ROOT, 'js', 'data', 'bis-data.js');
let bisContent = fs.readFileSync(bisPath, 'utf8');

// 1. Replace Warrior Fury Debt Collector with Wingblade (itemId 6504)
const newWarriorWingblade = `{
                "rank": 4,
                "quality": "q3",
                "itemId": "6504",
                "tipId": "6504",
                "name": "Wingblade",
                "icon": "inv_sword_24.jpg",
                "side": "both",
                "source": "Quest: Leaders of the Fang",
                "sourceDetails": [
                  "Reward from Leaders of the Fang in Wailing Caverns (+5 Agility, +2 Stamina)"
                ],
                "stats": "+5 Agility, +2 Stamina",
                "ilvl": 24,
                "lines": [
                  "Binds when picked up",
                  "One-Hand\\tSword",
                  "25 - 47 Damage\\tSpeed 2.20",
                  "(16.36 damage per second)",
                  "+5 Agility",
                  "+2 Stamina",
                  "Requires Level 19"
                ],
                "mats": ""
              }`;

bisContent = bisContent.replace(
  /\{\s*"rank":\s*4,\s*"quality":\s*"q3",\s*"itemId":\s*"273827"[\s\S]*?"stats":\s*"Equip:\s*\+34 Attack Power\."[\s\S]*?"mats":\s*""\s*\}/,
  newWarriorWingblade
);
console.log('✓ Replaced Warrior Fury Debt Collector with Wingblade.');

// 2. Fix all remaining Debt Collector entries to be alliance and have full equip lines
const oldDcPattern = /\{\s*"rank":\s*(\d+),\s*"quality":\s*"q3",\s*"itemId":\s*"273827",\s*"tipId":\s*"273827",\s*"name":\s*"Debt Collector"[\s\S]*?"mats":\s*""\s*\}/g;

bisContent = bisContent.replace(oldDcPattern, (match, rank) => {
  return `{
                "rank": ${rank},
                "quality": "q3",
                "itemId": "273827",
                "tipId": "273827",
                "name": "Debt Collector",
                "icon": "inv_sword_24.jpg",
                "side": "alliance",
                "source": "The Stockade - Bazil Thredd",
                "sourceDetails": [
                  "Dropped by Bazil Thredd in The Stockade (Alliance Only)"
                ],
                "stats": "Equip: Increases damage and healing done by magical spells and effects by up to 34., Equip: Grants 6 health and 2 mana every 5 sec for 15 sec when one of your spells is resisted.",
                "ilvl": 31,
                "lines": [
                  "Binds when picked up",
                  "Main Hand\\tSword",
                  "21 - 39 Damage\\tSpeed 2.30",
                  "(13.04 damage per second)",
                  "Requires Level 26",
                  "Equip: Increases damage and healing done by magical spells and effects by up to 34.",
                  "Equip: Grants 6 health and 2 mana every 5 sec for 15 sec when one of your spells is resisted."
                ],
                "mats": ""
              }`;
});
console.log('✓ Updated all Debt Collector entries in bis-data.js to alliance with authentic equips.');

// 3. Restore Inventor's Focal Sword (itemId 9459) for Rank 3 where it has Gizlock stats
const gizlockPattern = /\{\s*"rank":\s*3,\s*"quality":\s*"q3",\s*"itemId":\s*"276631",\s*"tipId":\s*"276631",\s*"name":\s*"Coldflame Saber",\s*"icon":\s*"inv_sword_04\.jpg",\s*"side":\s*"both",\s*"source":\s*"Gnomeregan - Tinkerer Gizlock"[\s\S]*?"mats":\s*""\s*\}/g;

bisContent = bisContent.replace(gizlockPattern, () => {
  return `{
                "rank": 3,
                "quality": "q3",
                "itemId": "9459",
                "tipId": "9459",
                "name": "Inventor's Focal Sword",
                "icon": "inv_sword_04.jpg",
                "side": "both",
                "source": "Gnomeregan - Tinkerer Gizlock",
                "sourceDetails": [
                  "Dropped by Tinkerer Gizlock in Gnomeregan (+1% Spell Critical Strike)"
                ],
                "stats": "+6 Intellect, Equip: Improves your chance to get a critical strike with spells by 1%.",
                "ilvl": 34,
                "armor": 0,
                "lines": [
                  "Binds when picked up",
                  "One-Hand\\tSword",
                  "39 - 60 Damage\\tSpeed 2.20",
                  "(22.5 damage per second)",
                  "+6 Intellect",
                  "Requires Level 29",
                  "Equip: Improves your chance to get a critical strike with spells by 1%."
                ],
                "mats": ""
              }`;
});
console.log('✓ Restored Inventor\'s Focal Sword (itemId 9459) in bis-data.js.');

// 4. Ensure all remaining Coldflame Saber entries have authentic Mage class quest stats
const coldflamePattern = /\{\s*"rank":\s*(\d+),\s*"quality":\s*"q3",\s*"itemId":\s*"276631",\s*"tipId":\s*"276631",\s*"name":\s*"Coldflame Saber"[\s\S]*?"mats":\s*""\s*\}/g;

bisContent = bisContent.replace(coldflamePattern, (match, rank) => {
  return `{
                "rank": ${rank},
                "quality": "q3",
                "itemId": "276631",
                "tipId": "276631",
                "name": "Coldflame Saber",
                "icon": "inv_sword_05.jpg",
                "side": "both",
                "source": "Quest: Scroll of the Saber & Blade of Silverlaine",
                "sourceDetails": [
                  "Mage class quest: Imbue Blade of Silverlaine with Scroll of the Saber (+7 Int, +32 Spell Power, 98 Fire dmg on frozen targets)"
                ],
                "stats": "+7 Intellect, Equip: Increases damage and healing done by magical spells and effects by up to 32., Equip: Melee attacks deal 98 additional Fire damage against Frozen targets.",
                "ilvl": 29,
                "armor": 0,
                "lines": [
                  "Binds when picked up",
                  "Main Hand\\tSword",
                  "17 - 32 Damage\\tSpeed 2.00",
                  "(12.25 damage per second)",
                  "+7 Intellect",
                  "Classes: Mage",
                  "Requires Level 21",
                  "Equip: Increases damage and healing done by magical spells and effects by up to 32.",
                  "Equip: Melee attacks deal 98 additional Fire damage against Frozen targets."
                ],
                "mats": ""
              }`;
});
console.log('✓ Updated Coldflame Saber in bis-data.js.');

fs.writeFileSync(bisPath, bisContent, 'utf8');

// 5. Update data/scraped/forever_weapons.json
const fwPath = path.join(ROOT, 'data', 'scraped', 'forever_weapons.json');
const fw = JSON.parse(fs.readFileSync(fwPath, 'utf8'));

// A. Fix Debt Collector in all classes
for (const cls of Object.keys(fw)) {
  for (const s of fw[cls].levels || []) {
    if (s.itemId === 273827 || s.name === 'Debt Collector') {
      s.faction = 'alliance';
      s.stats = 'Equip: Increases damage and healing done by magical spells and effects by up to 34., Equip: Grants 6 health and 2 mana every 5 sec for 15 sec when one of your spells is resisted.';
    }
    for (const a of s.alts || []) {
      if (a.itemId === 273827 || a.name === 'Debt Collector') {
        a.faction = 'alliance';
        a.value = '13.0 DPS, 2.30s, +34 SP, Req Level 26 - Stockade: Bazil Thredd (Alliance)';
        a.stats = 'Equip: Increases damage and healing done by magical spells and effects by up to 34., Equip: Grants 6 health and 2 mana every 5 sec for 15 sec when one of your spells is resisted.';
        a.lines = [
          'Binds when picked up',
          'Main Hand\tSword',
          '21 - 39 Damage\tSpeed 2.30',
          '(13.0 damage per second)',
          'Requires Level 26',
          'Equip: Increases damage and healing done by magical spells and effects by up to 34.',
          'Equip: Grants 6 health and 2 mana every 5 sec for 15 sec when one of your spells is resisted.'
        ];
      }
    }
  }
}
console.log('✓ Updated Debt Collector faction to alliance and refreshed stats in forever_weapons.json.');

// B. Fix Coldflame Saber in Mage progression
const mageLevels = fw.mage.levels;
const cfs21 = mageLevels.find(s => s.levelBracket === '21–24' && (s.itemId === 276631 || s.name === 'Coldflame Saber'));
if (cfs21) {
  cfs21.stats = '+7 Intellect, Equip: Increases damage and healing done by magical spells and effects by up to 32., Equip: Melee attacks deal 98 additional Fire damage against Frozen targets.';
  cfs21.lines = [
    'Binds when picked up',
    'Main Hand\tSword',
    '17 - 32 Damage\tSpeed 2.00',
    '(12.25 damage per second)',
    '+7 Intellect',
    'Classes: Mage',
    'Requires Level 21',
    'Equip: Increases damage and healing done by magical spells and effects by up to 32.',
    'Equip: Melee attacks deal 98 additional Fire damage against Frozen targets.'
  ];
  cfs21.source = {
    kind: 'quest',
    title: 'Scroll of the Saber & Blade of Silverlaine',
    detail: 'Mage class quest: Imbue Blade of Silverlaine with Scroll of the Saber (+7 Int, +32 Spell Power, 98 Fire dmg on frozen targets)'
  };
}

// In Mage bracket 25–26, replace duplicate Coldflame Saber primary with Rod of the Sleepwalker
const mage25 = mageLevels.find(s => s.levelBracket === '25–26');
if (mage25 && mage25.name === 'Coldflame Saber') {
  mage25.itemId = 1155;
  mage25.name = 'Rod of the Sleepwalker';
  mage25.icon = 'inv_staff_06';
  mage25.weaponType = 'Staff';
  mage25.speed = '2.80';
  mage25.dps = '17.7 DPS';
  mage25.faction = 'both';
  mage25.quality = 'q3';
  mage25.iLvl = 29;
  mage25.reqLevel = 24;
  mage25.stats = '+11 Intellect, +10 Spirit';
  mage25.lines = [
    'Binds when picked up',
    'Two-Hand\tStaff',
    '39 - 60 Damage\tSpeed 2.80',
    '(17.7 damage per second)',
    '+11 Intellect',
    '+10 Spirit',
    'Requires Level 24'
  ];
  mage25.source = {
    kind: 'quest',
    title: 'Blackfathom Villainy',
    detail: 'BFD quest reward (+11 Int, +10 Spirit caster staff)'
  };
  // Ensure Coldflame Saber is preserved in alts as 1H class quest option
  if (!mage25.alts.some(a => a.itemId === 276631)) {
    mage25.alts.unshift({
      name: 'Coldflame Saber',
      itemId: 276631,
      value: '12.3 DPS, 2.00s, +7 Int, +32 SP, 98 Fire Proc - Mage Quest',
      faction: 'both',
      dps: '12.25 DPS',
      speed: '2.00',
      weaponType: 'Main Hand Sword',
      quality: 'q3',
      iLvl: 29,
      reqLevel: 21,
      stats: '+7 Intellect, Equip: Increases damage and healing done by magical spells and effects by up to 32., Equip: Melee attacks deal 98 additional Fire damage against Frozen targets.',
      lines: [
        'Binds when picked up',
        'Main Hand\tSword',
        '17 - 32 Damage\tSpeed 2.00',
        '(12.25 damage per second)',
        '+7 Intellect',
        'Classes: Mage',
        'Requires Level 21',
        'Equip: Increases damage and healing done by magical spells and effects by up to 32.',
        'Equip: Melee attacks deal 98 additional Fire damage against Frozen targets.'
      ],
      icon: 'inv_sword_05'
    });
  }
}
console.log('✓ Updated Mage progression brackets 21-24 and 25-26.');

// C. Staff of Orgrimmar: Promote to primary for Shaman brackets 13-14, 15-16, 17-18
// And enrich Staff of Orgrimmar stats and lines across all classes!
const staffOfOrgFull = {
  itemId: 15444,
  name: 'Staff of Orgrimmar',
  icon: 'inv_staff_goldfeathered_01',
  weaponType: 'Staff',
  speed: '3.30',
  dps: '11.8 DPS',
  source: {
    kind: 'quest',
    title: 'Hidden Enemies',
    detail: 'Ragefire Chasm quest from Thrall (+6 Int, +6 Agi, +18 Spell Damage) — Horde BiS Caster Staff until Crescent Staff'
  },
  faction: 'horde',
  quality: 'q3',
  iLvl: 18,
  reqLevel: 13,
  stats: '+6 Intellect, +6 Agility, Equip: Increases damage and healing done by magical spells and effects by up to 18.',
  lines: [
    'Binds when picked up',
    'Two-Hand\tStaff',
    '31 - 47 Damage\tSpeed 3.30',
    '(11.8 damage per second)',
    '+6 Agility',
    '+6 Intellect',
    'Equip: Increases damage and healing done by magical spells and effects by up to 18.'
  ]
};

// Update Shaman brackets 13-18
const shamanLevels = fw.shaman.levels;
for (const b of ['13–14', '15–16', '17–18']) {
  const step = shamanLevels.find(s => s.levelBracket === b);
  if (step && step.itemId !== 15444) {
    const oldPrimary = {
      name: step.name,
      itemId: step.itemId,
      value: `${step.dps}, ${step.speed}s - ${step.source?.title || ''}`,
      faction: step.faction || 'both',
      dps: step.dps,
      speed: step.speed,
      weaponType: step.weaponType,
      quality: step.quality,
      iLvl: step.iLvl,
      reqLevel: step.reqLevel,
      stats: step.stats,
      icon: step.icon
    };
    step.itemId = staffOfOrgFull.itemId;
    step.name = staffOfOrgFull.name;
    step.icon = staffOfOrgFull.icon;
    step.weaponType = staffOfOrgFull.weaponType;
    step.speed = staffOfOrgFull.speed;
    step.dps = staffOfOrgFull.dps;
    step.source = staffOfOrgFull.source;
    step.faction = staffOfOrgFull.faction;
    step.quality = staffOfOrgFull.quality;
    step.iLvl = staffOfOrgFull.iLvl;
    step.reqLevel = staffOfOrgFull.reqLevel;
    step.stats = staffOfOrgFull.stats;
    step.lines = staffOfOrgFull.lines;

    // Filter out Staff of Orgrimmar from alts and add old primary
    step.alts = (step.alts || []).filter(a => a.itemId !== 15444 && a.name !== 'Staff of Orgrimmar');
    step.alts.unshift(oldPrimary);
  }
}
console.log('✓ Promoted Staff of Orgrimmar to primary for Shaman brackets 13-18.');

// Update Staff of Orgrimmar in alts for Mage, Warlock, Priest, Druid
for (const cls of ['mage', 'warlock', 'priest', 'druid', 'shaman']) {
  for (const s of fw[cls].levels || []) {
    for (const a of s.alts || []) {
      if (a.itemId === 15444 || a.name === 'Staff of Orgrimmar') {
        a.stats = staffOfOrgFull.stats;
        a.value = '11.8 DPS, +6 Int, +6 Agi, +18 Spell Dmg - RFC: Hidden Enemies (Horde BiS)';
        a.lines = staffOfOrgFull.lines;
        a.reqLevel = 13;
      }
    }
  }
}
console.log('✓ Enriched all Staff of Orgrimmar alt entries with full stats and lines.');

fs.writeFileSync(fwPath, JSON.stringify(fw, null, 2), 'utf8');
console.log('✓ Successfully wrote data/scraped/forever_weapons.json.');
