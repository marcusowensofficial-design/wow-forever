const fs = require('fs');
const path = require('path');

const changesJsonPath = path.join(__dirname, '..', 'data', 'forever_changes.json');
const changesJsPath = path.join(__dirname, '..', 'js', 'data', 'changes-data.js');
const talentsJsPath = path.join(__dirname, '..', 'js', 'data', 'talents-data.js');

const data = JSON.parse(fs.readFileSync(changesJsonPath, 'utf8'));
const entries = data.entries;

// 1. Multi-Shot
const ms = entries.find(e => e.id === 'spellbook-hunter-multi-shot');
if (ms) {
  ms.summary = 'Ranks 2 to 5 gone (Classic goes to rank 5). Costs 13.9% of base mana instead of 100 Mana; Instant cast (reverted from 0.5s cast in Oct 15 update); Cooldown 6 sec instead of 10 sec.';
  ms.rank_texts = {
    '1': '13.9% of base mana, 35 yd range, Instant, 6 sec cooldown. Fires several missiles, hitting 3 targets. Multi-Shot shares its cooldown with Aimed Shot. Requires Ranged Weapon'
  };
  ms.changes = [
    'Ranks 2 to 5 gone (Classic goes to rank 5)',
    'Costs 13.9% of base mana instead of 100 Mana',
    'Instant cast (reverted from 0.5s cast in Oct 15 update)',
    'Cooldown 6 sec instead of 10 sec, shares cooldown with Aimed Shot'
  ];
  ms.discovered_at = '2026-10-15';
}

// 2. Trueshot Aura
const tsa = entries.find(e => e.id === 'calc-hunter-marksmanship-trueshot-aura');
if (tsa) {
  tsa.rank_texts = {
    '1': 'Increases the Ranged Attack Power of party or raid members within 45 yds by 30.'
  };
  tsa.changes = tsa.changes || [];
  if (!tsa.changes.some(c => c.includes('whole raid'))) {
    tsa.changes.push('Now covers the whole raid');
  }
  if (!tsa.changes.some(c => c.includes('Sniper Shot benefits'))) {
    tsa.changes.push('Sniper Shot benefits from the Marksmanship talents it missed');
  }
  tsa.discovered_at = '2026-10-15';
}

// 3. Strider Kick
const sk = entries.find(e => e.id === 'calc-hunter-survival-strider-kick');
if (sk) {
  sk.changes = sk.changes || [];
  if (!sk.changes.some(c => c.includes('disarmed'))) {
    sk.changes.push('Can be used while disarmed or with no main-hand weapon, and Resourcefulness lowers its cost');
  }
  sk.discovered_at = '2026-10-15';
}

// 4. Immolation Trap
const immo = entries.find(e => e.id === 'spellbook-hunter-immolation-trap');
if (immo) {
  immo.changes = immo.changes || [];
  if (!immo.changes.some(c => c.includes('scales with attack power') || c.includes('scale with attack power'))) {
    immo.changes.push('Fire traps scale with attack power, and you can have one fire trap and one frost trap out at once');
  }
  immo.discovered_at = '2026-10-15';
}

// 5. Summon Hawk
const sh = entries.find(e => e.id === 'calc-hunter-beast-mastery-summon-hawk');
if (sh) {
  sh.changes = sh.changes || [];
  if (!sh.changes.some(c => c.includes('Spawns the hawk'))) {
    sh.changes.push('Spawns the hawk at your target and keeps it there');
  }
  sh.discovered_at = '2026-10-15';
}

// 6. Auto Shot
const as = entries.find(e => e.id === 'spellbook-hunter-auto-shot');
if (as) {
  as.summary = 'Requires standing still for 0.5s before shooting, matching early versions of World of Warcraft. You still fire it while casting Aimed Shot or Sniper Shot.';
  as.changes = [
    'Requires standing still for 0.5 sec before shooting, matching early versions of World of Warcraft. You still fire it while casting Aimed Shot or Sniper Shot',
    'Added Auto Attack/Auto Shot toggle setting'
  ];
  as.discovered_at = '2026-10-15';
}

// Write back forever_changes.json
fs.writeFileSync(changesJsonPath, JSON.stringify(data, null, 2), 'utf8');
console.log('Updated forever_changes.json successfully.');

// Write back changes-data.js (matching JSON exactly)
const jsContent = `/**
 * World of Warcraft: Forever - Changes Master Dataset
 * Auto-synced from data/forever_changes.json
 */
window.WOW_CHANGES_DATA = ${JSON.stringify(data, null, 2)};
`;
fs.writeFileSync(changesJsPath, jsContent, 'utf8');
console.log('Updated js/data/changes-data.js successfully.');

// Update talents-data.js for Trueshot Aura
let talentsContent = fs.readFileSync(talentsJsPath, 'utf8');
if (talentsContent.includes('Increases the Ranged Attack Power of party members within 45 yds by 30.')) {
  talentsContent = talentsContent.replace(
    'Increases the Ranged Attack Power of party members within 45 yds by 30.',
    'Increases the Ranged Attack Power of party or raid members within 45 yds by 30.'
  );
  fs.writeFileSync(talentsJsPath, talentsContent, 'utf8');
  console.log('Updated js/data/talents-data.js successfully.');
} else {
  console.log('Trueshot text in talents-data.js already updated.');
}
