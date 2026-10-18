import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');

const genFilePath = path.join(ROOT, 'scripts', 'generate-forever-weapons.mjs');
const src = fs.readFileSync(genFilePath, 'utf8');

const match = src.match(/const weaponsData = (\{[\s\S]*?\n\});/);
if (!match) {
  throw new Error('Could not parse weaponsData from generate-forever-weapons.mjs');
}

const weaponsData = vm.runInNewContext('(' + match[1] + ')');

// Helper to determine faction based on item properties
function determineFaction(name, sourceTitle, sourceDetail, value) {
  const text = `${name || ''} ${sourceTitle || ''} ${sourceDetail || ''} ${value || ''}`.toLowerCase();
  
  // Alliance indicators
  const isAlliance = text.includes('alliance') ||
    text.includes('elwynn') ||
    text.includes('northshire') ||
    text.includes('dun morogh') ||
    text.includes('teldrassil') ||
    text.includes('ironforge') ||
    text.includes('westfall') ||
    text.includes('redridge') ||
    text.includes('duskwood') ||
    text.includes('in the name of the light') ||
    text.includes('test of righteousness') ||
    text.includes('morbent fel') ||
    text.includes('brotherhood of thieves') ||
    text.includes('bonebiter') ||
    text.includes('sword of serenity') ||
    text.includes('verigan\'s fist') ||
    text.includes('wolfsbane');

  // Horde indicators
  const isHorde = text.includes('horde') ||
    text.includes('durotar') ||
    text.includes('valley of trials') ||
    text.includes('razor hill') ||
    text.includes('mulgore') ||
    text.includes('camp narache') ||
    text.includes('bloodhoof') ||
    text.includes('tirisfal') ||
    text.includes('deathknell') ||
    text.includes('brill') ||
    text.includes('silverpine') ||
    text.includes('hidden enemies') ||
    text.includes('into the scarlet monastery') ||
    text.includes('the family crypt') ||
    text.includes('rear guard patrol') ||
    text.includes('lost in the shadows') ||
    text.includes('centaur bracers') ||
    text.includes('threat from below') ||
    text.includes('the scarlet crusade') ||
    text.includes('escorting erland') ||
    text.includes('supervisor fizsprocket') ||
    text.includes('apothecary zamah') ||
    text.includes('stormy potential') ||
    text.includes('forged steel') ||
    text.includes('sword of omen') ||
    text.includes('axe of orgrimmar') ||
    text.includes('kris of orgrimmar') ||
    text.includes('staff of orgrimmar') ||
    text.includes('hammer of orgrimmar');

  if (isAlliance && !isHorde) return 'alliance';
  if (isHorde && !isAlliance) return 'horde';
  return 'both';
}

// 1. Tag all existing steps and alts
for (const [cls, cData] of Object.entries(weaponsData)) {
  cData.levels.forEach(lvl => {
    if (!lvl.faction) {
      lvl.faction = determineFaction(lvl.name, lvl.source?.title, lvl.source?.detail, '');
    }
    if (lvl.alts) {
      lvl.alts.forEach(alt => {
        if (!alt.faction) {
          alt.faction = determineFaction(alt.name, '', '', alt.value);
        }
      });
    }
  });
}

// 2. Class specific enrichments
// Helper to safely append alt if not existing
function addAltIfMissing(step, altItem) {
  if (!step.alts) step.alts = [];
  const exists = step.alts.some(a => a.name.toLowerCase() === altItem.name.toLowerCase());
  if (!exists) {
    step.alts.push(altItem);
  }
}

// WARRIOR
const warrior = weaponsData.warrior;
// 5-6
addAltIfMissing(warrior.levels.find(l => l.levelBracket === '5–6'), {
  name: 'Goblin Smasher', itemId: 4964, value: '8.2 DPS, 3.10s - Mulgore Quest: Supervisor Fizsprocket', faction: 'horde'
});
// 7-8
addAltIfMissing(warrior.levels.find(l => l.levelBracket === '7–8'), {
  name: "Riptear's Cleaver", itemId: 286742, value: '8.9 DPS, 3.30s - Durotar Quest: Rear Guard Patrol', faction: 'horde'
});
addAltIfMissing(warrior.levels.find(l => l.levelBracket === '7–8'), {
  name: 'Bonecracker', itemId: 3440, value: '9.1 DPS, 3.20s - Tirisfal Quest: The Family Crypt', faction: 'horde'
});
// 9-10
addAltIfMissing(warrior.levels.find(l => l.levelBracket === '9–10'), {
  name: "Thun'grim's Axe", itemId: 7326, value: '7.8 DPS, 2.70s - Horde Warrior Quest: Forged Steel', faction: 'horde'
});
addAltIfMissing(warrior.levels.find(l => l.levelBracket === '9–10'), {
  name: "Thun'grim's Sword", itemId: 7329, value: '7.8 DPS, 2.60s - Horde Warrior Quest: Forged Steel', faction: 'horde'
});
// 11-12
addAltIfMissing(warrior.levels.find(l => l.levelBracket === '11–12'), {
  name: 'Axe of Orgrimmar', itemId: 15424, value: '16.1 DPS, 3.30s, +6 Sta, +6 Spi - RFC Quest: Hidden Enemies', faction: 'horde'
});
// 13-14
addAltIfMissing(warrior.levels.find(l => l.levelBracket === '13–14'), {
  name: 'Axe of Orgrimmar', itemId: 15424, value: '16.1 DPS, 3.30s, +6 Sta, +6 Spi - RFC Quest: Hidden Enemies', faction: 'horde'
});
// 37-40 (SM Mirror pairs)
const w37 = warrior.levels.find(l => l.levelBracket === '37–40');
addAltIfMissing(w37, {
  name: 'Bonebiter', itemId: 6830, value: '38.8 DPS, 3.40s, +20 Str, +10 Sta - Alliance SM Quest: In the Name of the Light', faction: 'alliance'
});
addAltIfMissing(w37, {
  name: 'Sword of Serenity', itemId: 6829, value: '30.0 DPS, 2.20s, +9 Sta, +4 Spi - Alliance SM Quest: In the Name of the Light', faction: 'alliance'
});
addAltIfMissing(w37, {
  name: 'Sword of Omen', itemId: 6802, value: '29.7 DPS, 2.20s, +9 Str, +4 Sta, +3 Agi - Horde SM Quest: Into The Scarlet Monastery', faction: 'horde'
});

// PALADIN
const paladin = weaponsData.paladin;
const p36 = paladin.levels.find(l => l.levelBracket === '36–40');
addAltIfMissing(p36, {
  name: 'Sword of Serenity', itemId: 6829, value: '30.0 DPS, 2.20s, +9 Sta, +4 Spi - Alliance SM Quest: In the Name of the Light', faction: 'alliance'
});

// HUNTER
const hunter = weaponsData.hunter;
addAltIfMissing(hunter.levels.find(l => l.levelBracket === '3–4'), {
  name: 'Kolkar Bow', itemId: 286729, value: '2.7 DPS, 2.80s - Durotar Quest: Lost in the Shadows', faction: 'horde'
});
addAltIfMissing(hunter.levels.find(l => l.levelBracket === '5–6'), {
  name: 'Kolkar Bow', itemId: 286729, value: '2.7 DPS - Durotar Quest: Lost in the Shadows', faction: 'horde'
});
addAltIfMissing(hunter.levels.find(l => l.levelBracket === '7–8'), {
  name: "Skorn's Rifle", itemId: 3079, value: '5.0 DPS, 1.90s - Mulgore Quest: The Demon Scarred Cloak', faction: 'horde'
});
addAltIfMissing(hunter.levels.find(l => l.levelBracket === '9–10'), {
  name: 'Orcish Battle Bow', itemId: 5346, value: '5.5 DPS, 1.90s - Durotar Quest: Centaur Bracers', faction: 'horde'
});
addAltIfMissing(hunter.levels.find(l => l.levelBracket === '9–10'), {
  name: 'Snarlsnout Shooter', itemId: 286753, value: '5.0 DPS, 2.50s - Barrens Rare', faction: 'both'
});
addAltIfMissing(hunter.levels.find(l => l.levelBracket === '11–12'), {
  name: 'Orcish Battle Bow', itemId: 5346, value: '5.5 DPS - Durotar Quest: Centaur Bracers', faction: 'horde'
});
addAltIfMissing(hunter.levels.find(l => l.levelBracket === '11–12'), {
  name: 'Bristlebark Bow', itemId: 286748, value: '5.0 DPS, 2.60s - Barrens Drop', faction: 'both'
});

// ROGUE
const rogue = weaponsData.rogue;
addAltIfMissing(rogue.levels.find(l => l.levelBracket === '3–4'), {
  name: 'Forsaken Shortsword', itemId: 3267, value: '3.0 DPS, 2.10s - Tirisfal Quest: The Scarlet Crusade', faction: 'horde'
});
addAltIfMissing(rogue.levels.find(l => l.levelBracket === '5–6'), {
  name: 'Forsaken Shortsword', itemId: 3267, value: '3.0 DPS - Tirisfal Quest: The Scarlet Crusade', faction: 'horde'
});
addAltIfMissing(rogue.levels.find(l => l.levelBracket === '7–8'), {
  name: 'Pristine Orcish Dagger', itemId: 286730, value: '6.25 DPS, 2.40s - Durotar Quest: Threat from Below', faction: 'horde'
});
addAltIfMissing(rogue.levels.find(l => l.levelBracket === '9–10'), {
  name: 'Pristine Orcish Dagger', itemId: 286730, value: '6.25 DPS - Durotar Quest: Threat from Below', faction: 'horde'
});
addAltIfMissing(rogue.levels.find(l => l.levelBracket === '11–12'), {
  name: 'Deathstalker Shortsword', itemId: 3455, value: '7.5 DPS, 2.20s - Silverpine Quest: Escorting Erland', faction: 'horde'
});
// 13-14 & 15-16
addAltIfMissing(rogue.levels.find(l => l.levelBracket === '13–14'), {
  name: 'Kris of Orgrimmar', itemId: 15443, value: '8.0 DPS, 1.50s, +4 Sta, +33 Healing, +11 Spell Damage - RFC Quest: Hidden Enemies', faction: 'horde'
});
addAltIfMissing(rogue.levels.find(l => l.levelBracket === '15–16'), {
  name: 'Kris of Orgrimmar', itemId: 15443, value: '8.0 DPS, +4 Sta, +33 Healing, +11 Spell Damage - RFC Quest', faction: 'horde'
});
// 19-20
addAltIfMissing(rogue.levels.find(l => l.levelBracket === '19–20'), {
  name: 'Wingblade', itemId: 6504, value: '15.8 DPS, 2.20s - WC Quest: Leaders of the Fang', faction: 'horde'
});
// 35-38 (SM mirror)
const r35 = rogue.levels.find(l => l.levelBracket === '35–38');
addAltIfMissing(r35, {
  name: 'Sword of Omen', itemId: 6802, value: '29.7 DPS, 2.20s, +9 Str, +4 Sta, +3 Agi - Horde SM Quest: Into The Scarlet Monastery', faction: 'horde'
});
addAltIfMissing(r35, {
  name: 'Sword of Serenity', itemId: 6829, value: '30.0 DPS, 2.20s, +9 Sta, +4 Spi - Alliance SM Quest: In the Name of the Light', faction: 'alliance'
});
// 39-44
const r39 = rogue.levels.find(l => l.levelBracket === '39–44');
addAltIfMissing(r39, {
  name: 'Sword of Omen', itemId: 6802, value: '29.7 DPS - Horde SM Quest mirror', faction: 'horde'
});
addAltIfMissing(r39, {
  name: 'Sword of Serenity', itemId: 6829, value: '30.0 DPS - Alliance SM Quest mirror', faction: 'alliance'
});

// PRIEST
const priest = weaponsData.priest;
addAltIfMissing(priest.levels.find(l => l.levelBracket === '7–8'), {
  name: "Riptear's Spare Arm", itemId: 286743, value: '9.4 DPS, 1.70s Wand - Durotar Quest: Rear Guard Patrol', faction: 'horde'
});
addAltIfMissing(priest.levels.find(l => l.levelBracket === '7–8'), {
  name: 'Darkwood Staff', itemId: 3446, value: '6.7 DPS, 3.20s - Tirisfal Quest: The Family Crypt', faction: 'horde'
});
addAltIfMissing(priest.levels.find(l => l.levelBracket === '9–10'), {
  name: "Riptear's Spare Arm", itemId: 286743, value: '9.4 DPS - Durotar Quest: Rear Guard Patrol', faction: 'horde'
});
addAltIfMissing(priest.levels.find(l => l.levelBracket === '9–10'), {
  name: 'Cinder Wand', itemId: 5242, value: '11.8 DPS, 1.40s - Silverpine Quest: Arugal\'s Folly', faction: 'horde'
});
addAltIfMissing(priest.levels.find(l => l.levelBracket === '11–12'), {
  name: 'Cauldron Stirrer', itemId: 5340, value: '7.4 DPS, 3.10s - Barrens Quest: Apothecary Zamah', faction: 'horde'
});
addAltIfMissing(priest.levels.find(l => l.levelBracket === '11–12'), {
  name: 'Cinder Wand', itemId: 5242, value: '11.8 DPS - Silverpine Quest: Arugal\'s Folly', faction: 'horde'
});
// Priest 13-20 Kris of Orgrimmar
['13–14', '15–16', '17–18', '19–20'].forEach(bracket => {
  const step = priest.levels.find(l => l.levelBracket === bracket);
  if (step) {
    addAltIfMissing(step, {
      name: 'Kris of Orgrimmar',
      itemId: 15443,
      value: '8.0 DPS, 1.50s, +4 Sta, +33 Healing, +11 Spell Damage - RFC Quest: Hidden Enemies',
      faction: 'horde'
    });
  }
});

// SHAMAN
const shaman = weaponsData.shaman;
addAltIfMissing(shaman.levels.find(l => l.levelBracket === '5–6'), {
  name: 'Goblin Smasher', itemId: 4964, value: '8.2 DPS, 3.10s - Mulgore Quest: Supervisor Fizsprocket', faction: 'horde'
});
addAltIfMissing(shaman.levels.find(l => l.levelBracket === '7–8'), {
  name: 'Makeshift Stormcaller', itemId: 281274, value: '5.8 DPS, 3.30s - Durotar Shaman Quest: Stormy Potential', faction: 'horde'
});
addAltIfMissing(shaman.levels.find(l => l.levelBracket === '7–8'), {
  name: 'Bonecracker', itemId: 3440, value: '9.1 DPS, 3.20s - Tirisfal Quest: The Family Crypt', faction: 'horde'
});
addAltIfMissing(shaman.levels.find(l => l.levelBracket === '9–10'), {
  name: "Thun'grim's Axe", itemId: 7326, value: '7.8 DPS, 2.70s - Horde Quest: Forged Steel', faction: 'horde'
});
addAltIfMissing(shaman.levels.find(l => l.levelBracket === '11–12'), {
  name: 'Axe of Orgrimmar', itemId: 15424, value: '16.1 DPS, 3.30s, +6 Sta, +6 Spi - RFC Quest: Hidden Enemies', faction: 'horde'
});
addAltIfMissing(shaman.levels.find(l => l.levelBracket === '11–12'), {
  name: 'Hammer of Orgrimmar', itemId: 15445, value: '12.4 DPS, 2.90s, +3 Str, +3 Spi - RFC Quest: Hidden Enemies', faction: 'horde'
});
// Shaman 13-20 Kris of Orgrimmar
['13–14', '15–16', '17–18', '19–20'].forEach(bracket => {
  const step = shaman.levels.find(l => l.levelBracket === bracket);
  if (step) {
    addAltIfMissing(step, {
      name: 'Kris of Orgrimmar',
      itemId: 15443,
      value: '8.0 DPS, 1.50s, +4 Sta, +33 Healing, +11 Spell Damage - RFC Quest: Hidden Enemies',
      faction: 'horde'
    });
  }
});

// DRUID
const druid = weaponsData.druid;
addAltIfMissing(druid.levels.find(l => l.levelBracket === '5–6'), {
  name: 'Goblin Smasher', itemId: 4964, value: '8.2 DPS, 3.10s - Mulgore Quest: Supervisor Fizsprocket', faction: 'horde'
});
addAltIfMissing(druid.levels.find(l => l.levelBracket === '7–8'), {
  name: 'Bonecracker', itemId: 3440, value: '9.1 DPS, 3.20s - Tirisfal Quest: The Family Crypt', faction: 'horde'
});
addAltIfMissing(druid.levels.find(l => l.levelBracket === '7–8'), {
  name: 'Darkwood Staff', itemId: 3446, value: '6.7 DPS, 3.20s - Tirisfal Quest: The Family Crypt', faction: 'horde'
});
addAltIfMissing(druid.levels.find(l => l.levelBracket === '9–10'), {
  name: 'Cauldron Stirrer', itemId: 5340, value: '7.4 DPS, 3.10s - Barrens Quest: Apothecary Zamah', faction: 'horde'
});
addAltIfMissing(druid.levels.find(l => l.levelBracket === '11–12'), {
  name: 'Hammer of Orgrimmar', itemId: 15445, value: '12.4 DPS, 2.90s, +3 Str, +3 Spi - RFC Quest: Hidden Enemies', faction: 'horde'
});
// Druid 13-20 Kris of Orgrimmar
['13–14', '15–16', '17–18', '19–20'].forEach(bracket => {
  const step = druid.levels.find(l => l.levelBracket === bracket);
  if (step) {
    addAltIfMissing(step, {
      name: 'Kris of Orgrimmar',
      itemId: 15443,
      value: '8.0 DPS, 1.50s, +4 Sta, +33 Healing, +11 Spell Damage - RFC Quest: Hidden Enemies',
      faction: 'horde'
    });
  }
});

// MAGE & WARLOCK
['mage', 'warlock'].forEach(cls => {
  const c = weaponsData[cls];
  addAltIfMissing(c.levels.find(l => l.levelBracket === '7–8'), {
    name: "Riptear's Spare Arm", itemId: 286743, value: '9.4 DPS, 1.70s Wand - Durotar Quest: Rear Guard Patrol', faction: 'horde'
  });
  addAltIfMissing(c.levels.find(l => l.levelBracket === '7–8'), {
    name: 'Darkwood Staff', itemId: 3446, value: '6.7 DPS, 3.20s - Tirisfal Quest: The Family Crypt', faction: 'horde'
  });
  addAltIfMissing(c.levels.find(l => l.levelBracket === '9–10'), {
    name: "Riptear's Spare Arm", itemId: 286743, value: '9.4 DPS - Durotar Quest: Rear Guard Patrol', faction: 'horde'
  });
  addAltIfMissing(c.levels.find(l => l.levelBracket === '9–10'), {
    name: 'Cinder Wand', itemId: 5242, value: '11.8 DPS, 1.40s - Silverpine Quest: Arugal\'s Folly', faction: 'horde'
  });
  addAltIfMissing(c.levels.find(l => l.levelBracket === '11–12'), {
    name: 'Cauldron Stirrer', itemId: 5340, value: '7.4 DPS, 3.10s - Barrens Quest: Apothecary Zamah', faction: 'horde'
  });
  addAltIfMissing(c.levels.find(l => l.levelBracket === '11–12'), {
    name: 'Cinder Wand', itemId: 5242, value: '11.8 DPS - Silverpine Quest: Arugal\'s Folly', faction: 'horde'
  });
  addAltIfMissing(c.levels.find(l => l.levelBracket === '13–14'), {
    name: 'Staff of Orgrimmar', itemId: 15444, value: '11.8 DPS, +6 Int, +6 Agi, +18 Spell Dmg - RFC: Hidden Enemies (Horde)', faction: 'horde'
  });
  addAltIfMissing(c.levels.find(l => l.levelBracket === '13–14'), {
    name: 'Kris of Orgrimmar', itemId: 15443, value: '8.0 DPS, 1.50s, +4 Sta, +33 Healing, +11 Spell Damage - RFC Quest', faction: 'horde'
  });
});

// Output code back to generate-forever-weapons.mjs
const newFileContent = `import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');

const weaponsData = ${JSON.stringify(weaponsData, null, 2)};

const outPath = path.join(ROOT, 'data', 'scraped', 'forever_weapons.json');
fs.writeFileSync(outPath, JSON.stringify(weaponsData, null, 2), 'utf8');
console.log(\`[Generator] Wrote full 9-class weapon database to \${outPath}\`);

// Run compilation into class-progression-data.js
import('./compile-progression-data.mjs').then(() => {
  console.log('[Generator] Compiled into js/data/class-progression-data.js successfully.');
});
`;

fs.writeFileSync(genFilePath, newFileContent, 'utf8');
console.log('[Enricher] Successfully updated generate-forever-weapons.mjs');
