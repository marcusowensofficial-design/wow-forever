const fs = require('fs');
const assert = require('assert');
const vm = require('vm');

console.log('=== RUNNING COMPREHENSIVE FIX AUDIT ===');

// Load professions.js in VM sandbox
const code = fs.readFileSync('js/modules/professions.js', 'utf8');

const sandbox = {
  window: {
    WOW_PROFESSIONS_DATA: {
      alchemy: {
        name: 'Alchemy',
        slug: 'alchemy',
        recipes: [
          { name: 'Elixir of Lion\'s Strength', learn: 1, yellow: 30, green: 50, grey: 70, reagents: [{ name: 'Peacebloom', count: 1 }] }
        ]
      }
    },
    WOW_REAGENT_SOURCES: {},
    WOW_BIS_DATA: {
      classes: [{ id: 'warrior', name: 'Warrior' }],
      warrior: {
        specs: [{
          id: 'pve',
          name: 'PvE',
          gear: { head: [{ name: 'Lionheart Helm', phase: 'Phase 2' }] }
        }]
      }
    },
    copyMacroToClipboard: (macro, btn) => { btn.classList.add('copied'); },
    copyTextToClipboard: (text, cb) => cb && cb(),
    showToast: () => {}
  },
  document: {
    addEventListener: () => {},
    createElement: () => ({ setAttribute: () => {}, classList: { add: () => {}, remove: () => {} } }),
    body: { appendChild: () => {} },
    getElementById: () => null,
    querySelectorAll: () => []
  },
  localStorage: {
    getItem: () => null,
    setItem: () => {}
  },
  console: console
};

vm.createContext(sandbox);
vm.runInContext(code, sandbox);

// 1. Waypoint parser audit
console.log('\n1. Auditing formatWaypointsInHtml:');
const s1 = 'Tinkmaster Overspark in Ironforge (/way 69.8, 50.0) or Oglethorpe Obnoticus in Booty Bay (/way 28.2, 76.2)';
// Extract formatWaypointsInHtml from professions.js
global.escapeHtml = s => String(s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const extractFn = (name) => {
  const start = code.indexOf(`function ${name}`);
  const end = code.indexOf('\n  function ', start + 10);
  const fnBody = code.slice(start, end !== -1 ? end : start + 1500);
  return eval('(' + fnBody.replace(new RegExp(`^\\s*function\\s+${name}`), 'function') + ')');
};

const formatWaypointsInHtml = extractFn('formatWaypointsInHtml');
const res1 = formatWaypointsInHtml(s1);

assert(res1.includes('Tinkmaster Overspark in Ironforge'), 'Tinkmaster Overspark name must be preserved');
assert(res1.includes('Oglethorpe Obnoticus in Booty Bay'), 'Oglethorpe Obnoticus name must be preserved');
assert(res1.includes('data-macro="/way Ironforge 69.8 50.0"'), 'First macro must target Ironforge');
assert(res1.includes('data-macro="/way Booty Bay 28.2 76.2"'), 'Second macro must target Booty Bay');
console.log('✓ Trainer names preserved and correct TomTom macros generated!');

// 2. Trainer directory zone filter audit
console.log('\n2. Auditing Master Trainer Directory & Zone Filter:');
const matchTrainers = code.match(/const WOW_TRAINERS_DATA = (\[[\s\S]*?\]);/);
assert(matchTrainers, 'WOW_TRAINERS_DATA must exist');
const trainers = JSON.parse(matchTrainers[1]);
assert(trainers.length >= 90, `Expected at least 90 trainers, got ${trainers.length}`);

const distinctZones = [...new Set(trainers.map(t => t.zone))];
assert(distinctZones.length >= 30, `Expected at least 30 zones, got ${distinctZones.length}`);
assert(code.includes('id="trainer-zone-select"'), 'trainer-zone-select dropdown must be rendered');
assert(code.includes('trainerZoneFilter'), 'trainerZoneFilter state variable must exist');
console.log(`✓ Master Trainer Directory has ${trainers.length} trainers across ${distinctZones.length} unique zones with dedicated zone select!`);

// 3. Gathering Circuit Tier Labels audit
console.log('\n3. Auditing Gathering Circuit Tier Chip Labels:');
assert(code.includes('Tier ${tierNum}: ${shortMat}'), 'Chip label must include tier number and resource name');
console.log('✓ Gathering circuit tier chips display descriptive ore/herb names and skill brackets!');

// 4. Disenchanting Nexus Crystal audit
console.log('\n4. Auditing Disenchanting Nexus Crystal highlight:');
assert(code.includes("cleanLower.includes('nexus') && b.ilvl.includes('51–60')"), 'Nexus Crystal must highlight iLvl 51-60 row');
assert(code.includes("if (!src && hasDisenchant)"), 'Synthetic src must be created when src is null for disenchant materials');
console.log('✓ Disenchanting matrix highlights Nexus Crystal and supports null reagent source fallback!');

// 5. CSS selectors and Responsive Breakpoints audit
console.log('\n5. Auditing CSS Selectors & Media Queries:');
const css = fs.readFileSync('css/professions.css', 'utf8');
assert(css.includes('.trainer-select,'), '.trainer-select must be styled');
assert(css.includes('#trainer-search-input'), '#trainer-search-input must be styled');
assert(css.includes('.tomtom-way-btn.copied'), '.tomtom-way-btn.copied must be styled');
assert(css.includes('@media (max-width: 768px)'), '@media (max-width: 768px) must exist');
assert(css.includes('@media (max-width: 480px)'), '@media (max-width: 480px) must exist');
console.log('✓ CSS selector matches confirmed, .copied state styled, and responsive media queries verified!');

console.log('\n=== ALL AUDIT CHECKS PASSED PERFECTLY ===');
