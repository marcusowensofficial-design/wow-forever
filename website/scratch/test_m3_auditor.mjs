import fs from 'fs';
import assert from 'assert';

// Minimal mock DOM environment
global.window = global;
global.document = {
  getElementById: () => null,
  querySelectorAll: () => [],
  addEventListener: () => {}
};
global.localStorage = {
  getItem: () => null,
  setItem: () => {},
  removeItem: () => {}
};
global.escapeHtml = (s) => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// 1. Load bundle
eval(fs.readFileSync('js/data/class-progression-data.js', 'utf8'));
// 2. Load progression-filter
eval(fs.readFileSync('js/modules/deepdives/progression-filter.js', 'utf8'));
// 3. Load class-progression
eval(fs.readFileSync('js/modules/deepdives/class-progression.js', 'utf8'));

const prog = window.WOW_DEEPDIVES_PROGRESSION;
assert(prog, 'WOW_DEEPDIVES_PROGRESSION module must be loaded');

console.log('[Audit] Verifying Paladin weapons rendering...');
prog.setWeaponFaction('all');
const paladinHtml = prog.renderWeapons('paladin');

// Split into controls and timeline cards
const paladinParts = paladinHtml.split('<div class="weapon-timeline-container">');
const paladinControls = paladinParts[0];
const paladinCards = paladinParts[1] || '';

// Verify Paladin Horde button is disabled in controls
assert(paladinControls.includes('disabled style="opacity:0.35;cursor:not-allowed;" title="Paladins are exclusive to the Alliance"'), 'Paladin controls must disable Horde button');

// Verify 0 Horde items in Paladin timeline cards
assert(!paladinCards.includes('faction-horde'), 'Paladin timeline cards must contain 0 Horde item cards');
assert(!paladinCards.includes('alt-faction-horde'), 'Paladin timeline cards must contain 0 Horde alt items');
assert(!paladinCards.includes('Horde Only'), 'Paladin timeline cards must contain 0 Horde Only badges');

// Verify required elements in Paladin cards
assert(paladinCards.includes('⭐ Top Pick'), 'Paladin HTML must contain ⭐ Top Pick badge');
assert(paladinCards.includes('alts-expand-toggle'), 'Paladin HTML must contain progressive disclosure toggle');
assert(paladinCards.includes('https://www.wowhead.com/forever/item='), 'Paladin HTML must contain forever item links');
assert(paladinCards.includes('https://wow.zamimg.com/images/wow/icons/medium/'), 'Paladin HTML must contain Zamimg medium icon URLs');

console.log('[Audit] Verifying Shaman weapons rendering...');
prog.setWeaponFaction('all');
const shamanHtml = prog.renderWeapons('shaman');

// Split into controls and timeline cards
const shamanParts = shamanHtml.split('<div class="weapon-timeline-container">');
const shamanControls = shamanParts[0];
const shamanCards = shamanParts[1] || '';

// Verify Shaman Alliance button is disabled in controls
assert(shamanControls.includes('disabled style="opacity:0.35;cursor:not-allowed;" title="Shamans are exclusive to the Horde"'), 'Shaman controls must disable Alliance button');

// Verify 0 Alliance items in Shaman timeline cards
assert(!shamanCards.includes('faction-alliance'), 'Shaman timeline cards must contain 0 Alliance item cards');
assert(!shamanCards.includes('alt-faction-alliance'), 'Shaman timeline cards must contain 0 Alliance alt items');
assert(!shamanCards.includes('Alliance Only'), 'Shaman timeline cards must contain 0 Alliance Only badges');

// Verify required elements in Shaman cards
assert(shamanCards.includes('⭐ Top Pick'), 'Shaman HTML must contain ⭐ Top Pick badge');
assert(shamanCards.includes('alts-expand-toggle'), 'Shaman HTML must contain progressive disclosure toggle');
assert(shamanCards.includes('https://www.wowhead.com/forever/item='), 'Shaman HTML must contain forever item links');
assert(shamanCards.includes('https://wow.zamimg.com/images/wow/icons/medium/'), 'Shaman HTML must contain Zamimg medium icon URLs');

console.log('[Audit] Verifying all 9 classes weapons, offhands, and wands rendering...');
const classes = ['warrior', 'paladin', 'hunter', 'rogue', 'shaman', 'mage', 'warlock', 'priest', 'druid'];
for (const c of classes) {
  const wHtml = prog.renderWeapons(c);
  assert(wHtml.length > 500, c + ' weapons produced substantial HTML');

  if (window.WOW_PROGRESSION_DATA.offhands[c]) {
    const oHtml = prog.renderOffhands(c);
    assert(oHtml.length > 500, c + ' offhands produced substantial HTML');
  }

  if (window.WOW_PROGRESSION_DATA.wands[c]) {
    const wandHtml = prog.renderWands(c);
    assert(wandHtml.length > 500, c + ' wands produced substantial HTML');
  }
}

console.log('[Audit] Headless DOM rendering and assertion test PASSED 100%!');
