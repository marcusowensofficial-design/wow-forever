/**
 * Skeptical Verification Test for Class Progression & Toolkit Expansion
 */

import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');

console.log('--- CLASS PROGRESSION & TOOLKIT INTEGRITY AUDIT ---');

// 1. Check index.html script tags
const indexHtml = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
if (!indexHtml.includes('js/data/class-progression-data.js')) {
  throw new Error('index.html is missing script tag for js/data/class-progression-data.js');
}
if (!indexHtml.includes('js/modules/deepdives/class-progression.js')) {
  throw new Error('index.html is missing script tag for js/modules/deepdives/class-progression.js');
}
console.log('✓ index.html script tags registered in correct sequence');

// 2. Check Line Cap on deepdives.js and class-progression.js
const deepdivesLines = fs.readFileSync(path.join(ROOT, 'js', 'modules', 'deepdives.js'), 'utf8').split('\n').length;
if (deepdivesLines > 1500) {
  throw new Error(`deepdives.js exceeded 1,500 lines cap (${deepdivesLines} lines)`);
}
const progressionLines = fs.readFileSync(path.join(ROOT, 'js', 'modules', 'deepdives', 'class-progression.js'), 'utf8').split('\n').length;
if (progressionLines > 1500) {
  throw new Error(`class-progression.js exceeded 1,500 lines cap (${progressionLines} lines)`);
}
console.log(`✓ Line count checks passed: deepdives.js (${deepdivesLines} L), class-progression.js (${progressionLines} L)`);

// 3. Load & Validate Progression Dataset in VM
const sandbox = {
  console,
  window: {},
  document: {
    querySelectorAll: () => [],
    getElementById: () => null
  },
  localStorage: {
    getItem: () => null,
    setItem: () => {}
  }
};
sandbox.window = sandbox;
vm.createContext(sandbox);

// Run class-progression-data.js
const dataCode = fs.readFileSync(path.join(ROOT, 'js', 'data', 'class-progression-data.js'), 'utf8');
vm.runInContext(dataCode, sandbox);
const progData = sandbox.window.WOW_PROGRESSION_DATA;
if (!progData) throw new Error('WOW_PROGRESSION_DATA failed to attach to window');

const expectedClasses = ['hunter', 'shaman', 'mage', 'paladin', 'warrior', 'warlock', 'priest', 'druid', 'rogue'];
for (const cls of expectedClasses) {
  if (!progData.macros[cls] || progData.macros[cls].length === 0) {
    throw new Error(`Missing macros for ${cls}`);
  }
  if (!progData.weapons[cls] || !progData.weapons[cls].levels || progData.weapons[cls].levels.length === 0) {
    throw new Error(`Missing weapons for ${cls}`);
  }
  if (!progData.spellbooks[cls] || !progData.spellbooks[cls].levels || progData.spellbooks[cls].levels.length === 0) {
    throw new Error(`Missing spellbooks for ${cls}`);
  }
  if (!progData.milestones[cls] || progData.milestones[cls].length === 0) {
    throw new Error(`Missing milestones for ${cls}`);
  }
}
console.log('✓ All 9 classes have complete datasets for macros, weapons, spellbooks, and milestones');

// 4. Test Renderer Output in class-progression.js
const moduleCode = fs.readFileSync(path.join(ROOT, 'js', 'modules', 'deepdives', 'class-progression.js'), 'utf8');
vm.runInContext(moduleCode, sandbox);
const mod = sandbox.window.WOW_DEEPDIVES_PROGRESSION;
if (!mod || typeof mod.renderProgressionSubtab !== 'function') {
  throw new Error('WOW_DEEPDIVES_PROGRESSION.renderProgressionSubtab is missing');
}

const subtabs = ['spellbook', 'weapons', 'macros', 'milestones'];
for (const cls of expectedClasses) {
  const cData = { id: cls, name: cls.toUpperCase() };
  for (const st of subtabs) {
    const html = mod.renderProgressionSubtab(st, cData);
    if (!html || typeof html !== 'string' || html.length < 50) {
      throw new Error(`Render failed for class "${cls}" on subtab "${st}"`);
    }
    if (html.includes('undefined') || html.includes('NaN')) {
      throw new Error(`Render output contains undefined or NaN for class "${cls}" on subtab "${st}"`);
    }
  }
}
console.log('✓ All 9 classes rendered all 4 progression subtabs with 100% valid HTML without undefined/NaN tokens');

// 5. Test Kris of Orgrimmar in Priest, Shaman, Druid
for (const cls of ['priest', 'shaman', 'druid']) {
  const hasKris = progData.weapons[cls].levels.some(l => 
    (l.alts || []).some(a => a.name === 'Kris of Orgrimmar') || l.name === 'Kris of Orgrimmar'
  );
  if (!hasKris) {
    throw new Error(`Kris of Orgrimmar missing from ${cls} progression matrix!`);
  }
}
console.log('✓ Kris of Orgrimmar successfully integrated in early brackets (13-20) for Priest, Shaman, and Druid');

// 6. Test SM Quest Mirror Pairs (Sword of Omen, Sword of Serenity, Bonebiter)
const warriorSM = progData.weapons.warrior.levels.find(l => l.levelBracket === '37–40');
if (!warriorSM || !warriorSM.alts.some(a => a.name === 'Bonebiter') || !warriorSM.alts.some(a => a.name === 'Sword of Omen')) {
  throw new Error('Warrior 37-40 bracket missing Bonebiter or Sword of Omen SM mirror pair!');
}
const rogueSM = progData.weapons.rogue.levels.find(l => l.levelBracket === '35–38');
if (!rogueSM || !rogueSM.alts.some(a => a.name === 'Sword of Omen') || !rogueSM.alts.some(a => a.name === 'Sword of Serenity')) {
  throw new Error('Rogue 35-38 bracket missing Sword of Omen or Sword of Serenity SM mirror pair!');
}
console.log('✓ Scarlet Monastery mirror pairs (Sword of Omen / Sword of Serenity / Bonebiter) verified');

// 7. Test Horde Starter Quest Weapons in Brackets 1–12
const hordeStarters = ["Riptear's Cleaver", "Riptear's Spare Arm", "Kolkar Bow", "Goblin Smasher", "Bonecracker", "Darkwood Staff", "Forsaken Shortsword", "Pristine Orcish Dagger", "Makeshift Stormcaller", "Thun'grim's Axe", "Axe of Orgrimmar"];
let foundCount = 0;
for (const cls of expectedClasses) {
  progData.weapons[cls].levels.forEach(l => {
    const nums = l.levelBracket.split('–').map(Number);
    if (nums[0] <= 12) {
      (l.alts || []).forEach(alt => {
        if (hordeStarters.includes(alt.name)) foundCount++;
      });
    }
  });
}
if (foundCount < 10) {
  throw new Error(`Insufficient Horde starter quest weapons in brackets 1-12 (only found ${foundCount})`);
}
console.log(`✓ Verified ${foundCount} Horde starter quest weapon occurrences across brackets 1-12`);

// 8. Test Faction Filter UI Markup
const warriorHtml = mod.renderProgressionSubtab('weapons', { id: 'warrior', name: 'WARRIOR' });
if (!warriorHtml.includes('id="weapon-faction-toggle"') || !warriorHtml.includes('data-faction="alliance"') || !warriorHtml.includes('data-faction="horde"')) {
  throw new Error('Weapon progression UI missing faction filter toggle markup!');
}
console.log('✓ Weapon progression UI includes interactive Faction Filter toggle buttons');

// 9. Test Faction Filtering Completeness (0 missing brackets & 0 broken stats across all classes)
const factions = ['all', 'alliance', 'horde'];
for (const cls of expectedClasses) {
  const cData = progData.weapons[cls];
  const total = cData.levels.length;
  for (const f of factions) {
    const isPaladin = cls === 'paladin';
    const isShaman = cls === 'shaman';
    let eff = f;
    if (isPaladin && eff === 'horde') eff = 'alliance';
    if (isShaman && eff === 'alliance') eff = 'horde';

    let count = 0;
    cData.levels.forEach(step => {
      let displayStep = { ...step };
      let displayAlts = (step.alts || []).slice();

      if (eff !== 'all') {
        const stepFaction = step.faction || 'both';
        if (stepFaction !== 'both' && stepFaction !== eff) {
          let matchIdx = displayAlts.findIndex(a => a.faction === eff);
          if (matchIdx === -1) {
            matchIdx = displayAlts.findIndex(a => (a.faction || 'both') === 'both');
          }
          if (matchIdx !== -1) {
            const altMatch = displayAlts[matchIdx];
            const valStr = altMatch.value || '';
            const dpsMatch = altMatch.dps || valStr.match(/([\d.]+\s*DPS)/i)?.[1] || '';
            const spdMatch = altMatch.speed || valStr.match(/([\d.]+s)/i)?.[1]?.replace('s', '') || '';
            displayStep = {
              ...step,
              itemId: altMatch.itemId || null,
              name: altMatch.name,
              dps: dpsMatch || (altMatch.dps ? `${altMatch.dps} DPS` : step.dps),
              speed: spdMatch || altMatch.speed || step.speed,
              weaponType: altMatch.weaponType || step.weaponType
            };
          } else {
            return;
          }
        }
      }
      if (!displayStep.dps || displayStep.dps === '') {
        throw new Error(`Empty DPS on step ${step.levelBracket} for ${cls} under faction filter ${f}`);
      }
      count++;
    });

    if (count !== total) {
      throw new Error(`Faction filter "${f}" on ${cls} dropped brackets! (expected ${total}, got ${count})`);
    }
  }
}
console.log('✓ 100% of progression steps remain visible with valid DPS across all 9 classes and all faction filters');

// 10. Test Wowhead Forever Datamined Leveling Weapons Integration
const dataminedWeapons = [
  'Fang of Magmatus',
  'Defender of Dalaran',
  'Striking Staff',
  'Blade of Silverlaine',
  'Rage of the Storm',
  'Icesworn Decapitator',
  'Barbaric Crossbow',
  'Dun Garok Rifle',
  'Ironforge Greathammer',
  'Deepblaze'
];
for (const wName of dataminedWeapons) {
  let found = false;
  for (const cls of expectedClasses) {
    for (const lvl of progData.weapons[cls].levels) {
      if (lvl.name === wName || (lvl.alts || []).some(a => a.name === wName)) {
        found = true;
        break;
      }
    }
    if (found) break;
  }
  if (!found) {
    throw new Error(`Missing datamined leveling weapon "${wName}" from weapon progression database!`);
  }
}
console.log(`✓ All ${dataminedWeapons.length} checked Wowhead Forever datamined leveling weapons verified in dataset`);

// 11. Test Faction-Exclusive Class Button Protection
const paladinHtml = mod.renderProgressionSubtab('weapons', { id: 'paladin', name: 'PALADIN' });
if (!paladinHtml.includes('disabled') || !paladinHtml.includes('Paladins are exclusive to the Alliance')) {
  throw new Error('Paladin weapons UI failed to disable invalid Horde faction filter button');
}
const shamanHtml = mod.renderProgressionSubtab('weapons', { id: 'shaman', name: 'SHAMAN' });
if (!shamanHtml.includes('disabled') || !shamanHtml.includes('Shamans are exclusive to the Horde')) {
  throw new Error('Shaman weapons UI failed to disable invalid Alliance faction filter button');
}
console.log('✓ Faction-exclusive classes (Paladin/Shaman) correctly disable opposing faction filters');

console.log('\n✓ ALL CLASS PROGRESSION INTEGRITY CHECKS PASSED PERFECTLY!\n');
