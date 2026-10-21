import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';

const ROOT = process.cwd();

function createBrowserEnv() {
  const listeners = {};
  const mockStorage = {};

  const context = {
    console,
    Date,
    Math,
    parseInt,
    parseFloat,
    String,
    Number,
    Boolean,
    Array,
    Object,
    RegExp,
    Set,
    Map,
    localStorage: {
      getItem: (k) => mockStorage[k] || null,
      setItem: (k, v) => { mockStorage[k] = String(v); },
      removeItem: (k) => { delete mockStorage[k]; },
      clear: () => { for (const k in mockStorage) delete mockStorage[k]; }
    },
    escapeHtml: s => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'),
    document: {
      addEventListener: (evt, fn) => { listeners[evt] = listeners[evt] || []; listeners[evt].push(fn); },
      removeEventListener: () => {},
      getElementById: () => null,
      querySelector: () => null,
      querySelectorAll: () => []
    }
  };
  context.window = context;
  context.globalThis = context;
  vm.createContext(context);

  const progDataCode = fs.readFileSync(path.join(ROOT, 'js', 'data', 'class-progression-data.js'), 'utf8');
  vm.runInContext(progDataCode, context);

  const filterCode = fs.readFileSync(path.join(ROOT, 'js', 'modules', 'deepdives', 'progression-filter.js'), 'utf8');
  vm.runInContext(filterCode, context);

  const classProgCode = fs.readFileSync(path.join(ROOT, 'js', 'modules', 'deepdives', 'class-progression.js'), 'utf8');
  vm.runInContext(classProgCode, context);

  return context;
}

const env = createBrowserEnv();
const { WOW_PROGRESSION_FILTER, WOW_DEEPDIVES_PROGRESSION, WOW_PROGRESSION_DATA } = env;

console.log('======================================================================');
console.log('   CHALLENGER 2: ROADMAP LIFECYCLE & ALT PROMOTION HARNESS');
console.log('======================================================================\n');

const testResults = [];
function recordResult(group, name, passed, details = '') {
  testResults.push({ group, name, passed, details });
  console.log(`[${passed ? 'PASS' : 'FAIL'}] [${group}] ${name} ${details ? '- ' + details : ''}`);
}

// -----------------------------------------------------------------------------
// 1. Alt Promotion
// -----------------------------------------------------------------------------
console.log('--- TEST GROUP 1: Alternative Item Promotion ---');

// 1.1 Synthetic Controlled Step Verification
const synthStep1 = {
  name: 'Basic Woodcutter Axe',
  itemId: 9001,
  dps: 14.5,
  speed: 2.7,
  reqLevel: 15,
  faction: 'both',
  source: { kind: 'vendor', title: 'Weapon Vendor' },
  alts: [
    { name: 'Weak Dagger', itemId: 9002, dps: 11.0, speed: 1.8, reqLevel: 15, value: '11.0 DPS, 1.80s', faction: 'both' },
    { name: 'Cruel Barb', itemId: 9003, dps: 21.4, speed: 2.8, reqLevel: 19, value: '21.4 DPS, 2.80s', faction: 'both' }
  ]
};

const wData = WOW_PROGRESSION_DATA.weapons.warrior;
const trackKey = wData.tracks?.[0]?.id || 'primary';
const origList = wData.tracksData?.[trackKey] || wData.levels;

if (wData.tracksData && wData.tracksData[trackKey]) {
  wData.tracksData[trackKey] = [synthStep1];
} else {
  wData.levels = [synthStep1];
}

WOW_PROGRESSION_FILTER.resetFilters();
WOW_PROGRESSION_FILTER.setState({ minDps: 20.0 });

const promotedHtml1 = WOW_DEEPDIVES_PROGRESSION.renderWeapons('warrior');

recordResult('AltPromotion', 'Promotes passing alt to hero card position',
  promotedHtml1.includes('Cruel Barb') && promotedHtml1.includes('weapon-item-hero'));

recordResult('AltPromotion', 'Hero card displays ⭐ Alt Promoted badge markup',
  promotedHtml1.includes('<span class="item-promoted-badge" title="Promoted alternative matching your active filters">⭐ Alt Promoted</span>'));

recordResult('AltPromotion', 'Failing primary Woodcutter Axe is omitted from hero card',
  !promotedHtml1.includes('weapon-title-main">Basic Woodcutter Axe</span>'));

recordResult('AltPromotion', 'Failing primary Woodcutter Axe is omitted from alt tray',
  !promotedHtml1.includes('data-item-name="Basic Woodcutter Axe"'));

recordResult('AltPromotion', 'Non-passing alt Weak Dagger is omitted from tray',
  !promotedHtml1.includes('Weak Dagger'));

// Restore warrior data
if (wData.tracksData && wData.tracksData[trackKey]) {
  wData.tracksData[trackKey] = origList;
} else {
  wData.levels = origList;
}

// 1.2 Real Dataset Alt Promotion Verification on Mage (Staff path)
WOW_PROGRESSION_FILTER.resetFilters();
WOW_PROGRESSION_FILTER.setState({ minSpellDmg: 15 });
const mageHtml = WOW_DEEPDIVES_PROGRESSION.renderWeapons('mage');
const mageHasPromotedBadge = mageHtml.includes('⭐ Alt Promoted');
recordResult('AltPromotion', 'Real Mage weapon roadmap triggers ⭐ Alt Promoted when minSpellDmg=15',
  mageHasPromotedBadge);

// -----------------------------------------------------------------------------
// 2. Multi-Alt Partitioning
// -----------------------------------------------------------------------------
console.log('\n--- TEST GROUP 2: Multi-Alt Partitioning ---');

const synthStep2 = {
  name: 'Common Longsword',
  itemId: 8001,
  dps: 15.0,
  speed: 2.4,
  reqLevel: 22,
  faction: 'both',
  source: { kind: 'vendor', title: 'Vendor' },
  alts: [
    { name: 'Ogre Toothpick', itemId: 8002, dps: 18.0, speed: 2.1, reqLevel: 23, value: '18.0 DPS', faction: 'both' },
    { name: 'Whirlwind Axe', itemId: 8003, dps: 35.6, speed: 3.6, reqLevel: 30, value: '35.6 DPS', faction: 'both' },
    { name: 'Rusty Dirk', itemId: 8004, dps: 12.0, speed: 1.7, reqLevel: 20, value: '12.0 DPS', faction: 'both' },
    { name: 'Bonebiter', itemId: 8005, dps: 38.8, speed: 3.8, reqLevel: 34, value: '38.8 DPS', faction: 'both' }
  ]
};

if (wData.tracksData && wData.tracksData[trackKey]) {
  wData.tracksData[trackKey] = [synthStep2];
} else {
  wData.levels = [synthStep2];
}

WOW_PROGRESSION_FILTER.resetFilters();
WOW_PROGRESSION_FILTER.setState({ minDps: 30.0 });

const partitionHtml = WOW_DEEPDIVES_PROGRESSION.renderWeapons('warrior');

recordResult('MultiAlt', 'First matching alt (Whirlwind Axe) promoted to hero card',
  partitionHtml.includes('Whirlwind Axe') && partitionHtml.includes('⭐ Alt Promoted'));

recordResult('MultiAlt', 'Second matching alt (Bonebiter) placed in alternatives tray',
  partitionHtml.includes('Bonebiter') && partitionHtml.includes('class="alt-tag'));

recordResult('MultiAlt', 'Non-matching alts (Ogre Toothpick, Rusty Dirk) completely excluded',
  !partitionHtml.includes('Ogre Toothpick') && !partitionHtml.includes('Rusty Dirk'));

recordResult('MultiAlt', 'Failing primary (Common Longsword) completely excluded',
  !partitionHtml.includes('Common Longsword'));

// Restore warrior data
if (wData.tracksData && wData.tracksData[trackKey]) {
  wData.tracksData[trackKey] = origList;
} else {
  wData.levels = origList;
}

// -----------------------------------------------------------------------------
// 3. Step Hiding
// -----------------------------------------------------------------------------
console.log('\n--- TEST GROUP 3: Step Card Omission (Step Hiding) ---');

const synthFailingStep = {
  name: 'Worn Shortsword',
  itemId: 7001,
  dps: 8.5,
  speed: 2.0,
  reqLevel: 5,
  faction: 'both',
  source: { kind: 'vendor', title: 'Starter Vendor' },
  alts: [
    { name: 'Rusty Dagger', itemId: 7002, dps: 6.0, speed: 1.5, reqLevel: 3, value: '6.0 DPS', faction: 'both' },
    { name: 'Cracked Club', itemId: 7003, dps: 7.2, speed: 2.2, reqLevel: 4, value: '7.2 DPS', faction: 'both' }
  ]
};

if (wData.tracksData && wData.tracksData[trackKey]) {
  wData.tracksData[trackKey] = [synthFailingStep];
} else {
  wData.levels = [synthFailingStep];
}

WOW_PROGRESSION_FILTER.resetFilters();
WOW_PROGRESSION_FILTER.setState({ minDps: 25.0 });

const hiddenHtml = WOW_DEEPDIVES_PROGRESSION.renderWeapons('warrior');

recordResult('StepHiding', 'Step card omitted (no weapon-step-card rendered)',
  !hiddenHtml.includes('class="weapon-step-card'));

recordResult('StepHiding', 'Primary and all alts omitted from markup',
  !hiddenHtml.includes('Worn Shortsword') && !hiddenHtml.includes('Rusty Dagger') && !hiddenHtml.includes('Cracked Club'));

// Restore warrior data
if (wData.tracksData && wData.tracksData[trackKey]) {
  wData.tracksData[trackKey] = origList;
} else {
  wData.levels = origList;
}

// -----------------------------------------------------------------------------
// 4. Empty State Banner & Reset Action
// -----------------------------------------------------------------------------
console.log('\n--- TEST GROUP 4: Empty State Banner & Reset Controls ---');

WOW_PROGRESSION_FILTER.resetFilters();
WOW_PROGRESSION_FILTER.setState({ minDps: 999.0 }); // Impossible DPS

const allClasses = ['warrior', 'paladin', 'hunter', 'rogue', 'shaman', 'mage', 'warlock', 'priest', 'druid'];
let allEmptyStatesValid = true;
let allResetBtnsValid = true;

for (const cId of allClasses) {
  const html = WOW_DEEPDIVES_PROGRESSION.renderWeapons(cId);
  const hasEmptyState = html.includes('filter-empty-state') && html.includes('No Progression Items Match Your Active Filters');
  const hasResetBtn = html.includes('id="btn-empty-reset-filters"') && html.includes('Reset All Filters');

  if (!hasEmptyState) allEmptyStatesValid = false;
  if (!hasResetBtn) allResetBtnsValid = false;
}

recordResult('EmptyState', 'Accessible empty state banner rendered across all 9 classes when 0 match',
  allEmptyStatesValid);

recordResult('EmptyState', 'Reset All Filters button present in empty state banner across all 9 classes',
  allResetBtnsValid);

// -----------------------------------------------------------------------------
// 5. 1-Click Reset Full Restoration Across All 9 Classes & All Roadmaps
// -----------------------------------------------------------------------------
console.log('\n--- TEST GROUP 5: 1-Click Reset Consistency Across All 9 Classes & Roadmaps ---');

WOW_PROGRESSION_FILTER.resetFilters();
const allCategories = ['weapons', 'wands', 'offhands'];

// Capture unconstrained baseline card counts for every class and category
const baselineCardCounts = {};
for (const cId of allClasses) {
  baselineCardCounts[cId] = {};
  for (const cat of allCategories) {
    let html = '';
    if (cat === 'weapons') html = WOW_DEEPDIVES_PROGRESSION.renderWeapons(cId);
    else if (cat === 'wands') html = WOW_DEEPDIVES_PROGRESSION.renderWands(cId);
    else if (cat === 'offhands') html = WOW_DEEPDIVES_PROGRESSION.renderOffhands(cId);

    const matches = html.match(/class="weapon-step-card/g);
    baselineCardCounts[cId][cat] = matches ? matches.length : 0;
  }
}

// Apply multi-field strict filter
WOW_PROGRESSION_FILTER.setState({
  minLevel: 35,
  maxLevel: 45,
  minDps: 30.0,
  minStr: 10,
  minSta: 10,
  speedOp: '>=',
  speedVal: 2.80
});

const activeCountBeforeReset = WOW_PROGRESSION_FILTER.getActiveFilterCount();
recordResult('ResetConsistency', 'Active filters successfully set before reset',
  activeCountBeforeReset >= 5, `Active count: ${activeCountBeforeReset}`);

// Execute resetFilters()
WOW_PROGRESSION_FILTER.resetFilters();

const activeCountAfterReset = WOW_PROGRESSION_FILTER.getActiveFilterCount();
const stateAfterReset = WOW_PROGRESSION_FILTER.getState();

recordResult('ResetConsistency', 'Active filter count returns to 0',
  activeCountAfterReset === 0);

recordResult('ResetConsistency', 'Filter state fields return to unconstrained nulls',
  stateAfterReset.minLevel === null &&
  stateAfterReset.maxLevel === null &&
  stateAfterReset.minDps === null &&
  stateAfterReset.minStr === null &&
  stateAfterReset.minSta === null &&
  stateAfterReset.speedVal === null);

// Verify card counts match baseline 100% across all 9 classes and all 3 categories
let restorationMatches100Percent = true;
const discrepancies = [];

for (const cId of allClasses) {
  for (const cat of allCategories) {
    let html = '';
    if (cat === 'weapons') html = WOW_DEEPDIVES_PROGRESSION.renderWeapons(cId);
    else if (cat === 'wands') html = WOW_DEEPDIVES_PROGRESSION.renderWands(cId);
    else if (cat === 'offhands') html = WOW_DEEPDIVES_PROGRESSION.renderOffhands(cId);

    const matches = html.match(/class="weapon-step-card/g);
    const count = matches ? matches.length : 0;
    const expected = baselineCardCounts[cId][cat];

    if (count !== expected) {
      restorationMatches100Percent = false;
      discrepancies.push(`${cId} ${cat}: expected ${expected}, got ${count}`);
    }
  }
}

recordResult('ResetConsistency', '100% card count restored across all 9 classes and all categories',
  restorationMatches100Percent, discrepancies.join('; '));

// -----------------------------------------------------------------------------
// 6. Adversarial Stress Testing: Faction Override vs Stat Filter
// -----------------------------------------------------------------------------
console.log('\n--- TEST GROUP 6: Adversarial Stress Test (Horde BiS Filter Bypass) ---');

// Stress Test: In class-progression.js:
// Line 662: hordeBisIdx = displayAlts.findIndex(a => a.faction === 'horde' && (a.itemId === 15444 || a.name === 'Staff of Orgrimmar'));
// Line 667: if (hordeBisIdx !== -1) { matchIdx = hordeBisIdx; }
// Staff of Orgrimmar has reqLevel 13 and DPS 11.82.
// Test if Staff of Orgrimmar is promoted and displayed when minLevel=40 or minDps=35!

WOW_PROGRESSION_FILTER.resetFilters();
WOW_PROGRESSION_FILTER.setState({ minLevel: 40 });
WOW_DEEPDIVES_PROGRESSION.setWeaponFaction('horde');

const shamanHtml = WOW_DEEPDIVES_PROGRESSION.renderWeapons('shaman');
const staffOfOrgrimmarLeakedUnderMinLevel40 = shamanHtml.includes('Staff of Orgrimmar');

recordResult('AdversarialAudit', 'REMEDIATION: Staff of Orgrimmar (reqLevel 13) not promoted when minLevel=40',
  !staffOfOrgrimmarLeakedUnderMinLevel40,
  !staffOfOrgrimmarLeakedUnderMinLevel40 ? 'CONFIRMED FIX: hordeBisIdx respects itemMatchesAll' : 'LEAK DETECTED');

WOW_PROGRESSION_FILTER.resetFilters();
WOW_PROGRESSION_FILTER.setState({ minDps: 35.0 });
const shamanDpsHtml = WOW_DEEPDIVES_PROGRESSION.renderWeapons('shaman');
const staffOfOrgrimmarLeakedUnderMinDps35 = shamanDpsHtml.includes('Staff of Orgrimmar');

recordResult('AdversarialAudit', 'REMEDIATION: Staff of Orgrimmar (11.82 DPS) not promoted when minDps=35.0',
  !staffOfOrgrimmarLeakedUnderMinDps35,
  !staffOfOrgrimmarLeakedUnderMinDps35 ? 'CONFIRMED FIX: hordeBisIdx respects active stat filters' : 'LEAK DETECTED');

// Reset state
WOW_DEEPDIVES_PROGRESSION.setWeaponFaction('all');
WOW_PROGRESSION_FILTER.resetFilters();

// -----------------------------------------------------------------------------
// Summary
// -----------------------------------------------------------------------------
console.log('\n======================================================================');
const total = testResults.length;
const passed = testResults.filter(r => r.passed).length;
console.log(`Summary: ${passed}/${total} assertions passed.`);
console.log('======================================================================');
