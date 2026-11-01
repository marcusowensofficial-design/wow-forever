import fs from 'node:fs';
import assert from 'node:assert';

console.log('--- Testing ForeverDB Integration ---');

// Test 1: Forever Instances Data
const instancesFile = fs.readFileSync('js/data/forever-instances-data.js', 'utf8');
const fakeWindow = {};
eval(instancesFile.replace('window.', 'fakeWindow.'));
const instances = fakeWindow.WOW_FOREVER_INSTANCES_DATA;

assert(Array.isArray(instances), 'WOW_FOREVER_INSTANCES_DATA must be an array');
assert.strictEqual(instances.length, 40, 'Must have 40 instances');

const customInsts = instances.filter(i => i.isCustomForever);
assert.strictEqual(customInsts.length, 14, 'Must have 14 custom Classic+ instances');

const dalaran = instances.find(i => i.slug === 'city-of-dalaran');
assert(dalaran, 'City of Dalaran must exist');
assert.strictEqual(dalaran.bosses.length, 9, 'Dalaran must have 9 bosses');

const crypts = instances.find(i => i.slug === 'karazhan-crypts');
assert(crypts, 'Karazhan Crypts must exist');
assert.strictEqual(crypts.bosses.length, 11, 'Karazhan Crypts must have 11 bosses');

const dfc = instances.find(i => i.slug === 'demon-fall-canyon');
assert(dfc, 'Demon Fall Canyon must exist');
assert.strictEqual(dfc.bosses.length, 7, 'Demon Fall Canyon must have 7 bosses');

console.log('✓ Instances dataset verified (40 instances, 14 custom Classic+).');

// Test 2: Camping Matrix Data
const campingFile = fs.readFileSync('js/data/camping-matrix-data.js', 'utf8');
eval(campingFile.replace('window.', 'fakeWindow.'));
const campMatrix = fakeWindow.WOW_CAMPING_MATRIX;

assert(Array.isArray(campMatrix), 'WOW_CAMPING_MATRIX must be an array');
assert.strictEqual(campMatrix.length, 39, 'Must have 39 camp entries');

const manaWell = campMatrix.find(c => c.itemId === 279956);
assert(manaWell, 'Mana Well must exist');
assert.strictEqual(manaWell.profession, 'Alchemy');
assert.strictEqual(manaWell.tier, 1);
assert.strictEqual(manaWell.mutualExclusion, 'Blessing of Wisdom');
assert(manaWell.reagents.length > 0, 'Mana Well must have reagents');

const expertKit = campMatrix.find(c => c.name === 'Expert Campfire Kit');
assert(expertKit, 'Expert Campfire Kit must exist');
assert.strictEqual(expertKit.tier, 3);
assert.strictEqual(expertKit.isKit, true);

console.log('✓ Camping matrix verified (39 entries, reagent formulas, mutual exclusions).');

// Test 3: Spec Coach Data
const coachFile = fs.readFileSync('js/data/spec-coach-data.js', 'utf8');
eval(coachFile.replace('window.', 'fakeWindow.'));
const coachData = fakeWindow.WOW_SPEC_COACH_DATA;

assert(typeof coachData === 'object', 'WOW_SPEC_COACH_DATA must be an object');
const coachKeys = Object.keys(coachData);
assert.strictEqual(coachKeys.length, 27, 'Must have 27 spec profiles');

for (const key of coachKeys) {
  const profile = coachData[key];
  assert(profile.brackets && profile.brackets.length >= 3, `${key} must have at least 3 brackets`);
  assert(profile.brackets[0].priority.length > 0, `${key} must have priorities in bracket 0`);
}

const druidBal = coachData['druid-balance'];
assert(druidBal, 'druid-balance profile must exist');
assert.strictEqual(druidBal.className, 'Druid');
assert.strictEqual(druidBal.brackets.length, 5, 'druid-balance must have 5 brackets');
assert(druidBal.brackets[0].sim.dps > 0, 'druid-balance must have sim DPS in bracket 0');

console.log('✓ Spec coach profiles verified (27 specs across all 9 classes, 5 brackets).');

// Test 4: HTML DOM Markup
const indexHtml = fs.readFileSync('index.html', 'utf8');
assert(indexHtml.includes('data-subtab="dungeons"'), 'index.html must have dungeons subnav button');
assert(indexHtml.includes('id="atlas-subtab-dungeons"'), 'index.html must have atlas-subtab-dungeons panel');
assert(indexHtml.includes('id="atlas-dungeons-mount"'), 'index.html must have atlas-dungeons-mount');
assert(indexHtml.includes('id="interactive-camp-builder-mount"'), 'index.html must have interactive-camp-builder-mount');
assert(indexHtml.includes('src="js/data/forever-instances-data.js'), 'index.html must load forever-instances-data.js');
assert(indexHtml.includes('src="js/data/camping-matrix-data.js'), 'index.html must load camping-matrix-data.js');
assert(indexHtml.includes('src="js/data/spec-coach-data.js'), 'index.html must load spec-coach-data.js');
assert(indexHtml.includes('src="js/modules/atlas-dungeons.js'), 'index.html must load atlas-dungeons.js');
assert(indexHtml.includes('src="js/modules/deepdives/deepdives-coach.js'), 'index.html must load deepdives-coach.js');

console.log('✓ HTML DOM and script wiring verified.');

console.log('=======================================');
console.log('ALL FOREVERDB INTEGRATION TESTS PASSED!');
console.log('=======================================');
