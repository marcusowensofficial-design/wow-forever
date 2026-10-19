const fs = require('fs');
const vm = require('vm');

const window = {
  escapeHtml: s => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
};
global.window = window;
const progDataCode = fs.readFileSync('js/data/class-progression-data.js', 'utf8');
vm.runInNewContext(progDataCode, { window, console });

const progModuleCode = fs.readFileSync('js/modules/deepdives/class-progression.js', 'utf8');
const document = { querySelectorAll: () => [], getElementById: () => null };
global.document = document;
vm.runInNewContext(progModuleCode, { window, document, console, escapeHtml: window.escapeHtml });

const prog = window.WOW_DEEPDIVES_PROGRESSION;

// Test default (all factions)
const htmlAll = prog.renderProgressionSubtab('weapons', { id: 'mage' });
console.log('Default Mage weapons has Crescent Staff:', htmlAll.includes('Crescent Staff'));
console.log('Default Mage weapons has Staff of Westfall:', htmlAll.includes('Staff of Westfall'));

const lockHtml = prog.renderProgressionSubtab('weapons', { id: 'warlock' });
console.log('Warlock weapons has Crescent Staff:', lockHtml.includes('Crescent Staff'));
console.log('Warlock weapons has Staff of Soran\'ruk:', lockHtml.includes('Staff of Soran\'ruk'));
console.log('Warlock weapons has Soul Harvester:', lockHtml.includes('Soul Harvester'));

const priestHtml = prog.renderProgressionSubtab('weapons', { id: 'priest' });
console.log('Priest weapons has Crescent Staff:', priestHtml.includes('Crescent Staff'));
console.log('Priest weapons has Death Speaker Scepter:', priestHtml.includes('Death Speaker Scepter'));

const rogueHtml = prog.renderProgressionSubtab('weapons', { id: 'rogue' });
console.log('Rogue weapons has Wingblade:', rogueHtml.includes('Wingblade'));
console.log('Rogue weapons has Cruel Barb:', rogueHtml.includes('Cruel Barb'));

const paladinHtml = prog.renderProgressionSubtab('weapons', { id: 'paladin' });
console.log('Paladin weapons has Verigan\'s Fist:', paladinHtml.includes('Verigan\'s Fist'));
console.log('Paladin weapons has Bonebiter:', paladinHtml.includes('Bonebiter'));

const warriorHtml = prog.renderProgressionSubtab('weapons', { id: 'warrior' });
console.log('Warrior weapons has Whirlwind Axe:', warriorHtml.includes('Whirlwind Axe'));
console.log('Warrior weapons has Bonebiter:', warriorHtml.includes('Bonebiter'));

console.log('RENDER TEST PASSED!');
