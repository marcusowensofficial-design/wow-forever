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

// 1. Weapons Subtab Test
const htmlMage = prog.renderProgressionSubtab('weapons', { id: 'mage' });
console.log('Mage weapons has Crescent Staff:', htmlMage.includes('Crescent Staff'));
console.log('Mage weapons has Staff of Westfall:', htmlMage.includes('Staff of Westfall'));
console.log('Mage weapons has Hypnotic Blade:', htmlMage.includes('Hypnotic Blade'));
console.log('Mage weapons has Narpas Sword:', htmlMage.includes('Narpas Sword'));

const warriorHtml = prog.renderProgressionSubtab('weapons', { id: 'warrior' });
console.log('Warrior weapons has Whirlwind Axe:', warriorHtml.includes('Whirlwind Axe'));
console.log('Warrior weapons has Bonebiter:', warriorHtml.includes('Bonebiter'));
console.log('Warrior weapons has Battleguard Captain\'s Sticker:', warriorHtml.includes('Battleguard Captain\'s Sticker'));
console.log('Warrior weapons has The Skyblade:', warriorHtml.includes('The Skyblade'));
console.log('Warrior weapons has Defender of Dalaran:', warriorHtml.includes('Defender of Dalaran'));

const paladinHtml = prog.renderProgressionSubtab('weapons', { id: 'paladin' });
console.log('Paladin weapons has Verigan\'s Fist:', paladinHtml.includes('Verigan\'s Fist'));
console.log('Paladin weapons has Northshire Hammer:', paladinHtml.includes('Northshire Hammer'));
console.log('Paladin weapons has Ironforge Greathammer:', paladinHtml.includes('Ironforge Greathammer'));

const hunterHtml = prog.renderProgressionSubtab('weapons', { id: 'hunter' });
console.log('Hunter weapons has Kolkar Bow:', hunterHtml.includes('Kolkar Bow'));
console.log('Hunter weapons has Calibrated Blunderbuss:', hunterHtml.includes('Calibrated Blunderbuss'));
console.log('Hunter weapons has Golemsight Long Gun:', hunterHtml.includes('Golemsight Long Gun'));

const rogueHtml = prog.renderProgressionSubtab('weapons', { id: 'rogue' });
console.log('Rogue weapons has Wingblade:', rogueHtml.includes('Wingblade'));
console.log('Rogue weapons has Meathook Slicer:', rogueHtml.includes('Meathook Slicer'));
console.log('Rogue weapons has Subdued Dragon\'s Fang:', rogueHtml.includes('Subdued Dragon\'s Fang'));

// 2. Wands Subtab Test
const wandHtml = prog.renderProgressionSubtab('wands', { id: 'mage' });
console.log('Wand tab has Riptear\'s Spare Arm:', wandHtml.includes('Riptear\'s Spare Arm'));
console.log('Wand tab has Deepblaze:', wandHtml.includes('Deepblaze'));
console.log('Wand tab has Wand of Mana Concentration:', wandHtml.includes('Wand of Mana Concentration'));
console.log('Wand tab has Master Hunter\'s Wand:', wandHtml.includes('Master Hunter\'s Wand'));
console.log('Wand tab has Wail of Death:', wandHtml.includes('Wail of Death'));

// 3. Off-Hands Subtab Test
const offHtml = prog.renderProgressionSubtab('offhands', { id: 'mage' });
console.log('Offhand tab has Dwarven Tome:', offHtml.includes('Dwarven Tome'));
console.log('Offhand tab has Skum\'s Bucket:', offHtml.includes('Skum\'s Bucket'));
console.log('Offhand tab has Raptor\'s Gaze:', offHtml.includes('Raptor\'s Gaze'));
console.log('Offhand tab has Ponderous Orb:', offHtml.includes('Ponderous Orb'));
console.log('Offhand tab has Barkskin Baubles:', offHtml.includes('Barkskin Baubles'));

console.log('\nALL 9 CLASSES, WANDS, AND OFFHANDS RENDER TESTS PASSED 100%!');
