import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';

const ROOT = process.cwd();

function createTestEnv() {
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

const env = createTestEnv();
const { WOW_PROGRESSION_FILTER, WOW_DEEPDIVES_PROGRESSION, WOW_PROGRESSION_DATA } = env;

console.log('======================================================================');
console.log('   CHALLENGER V2: DEEP STRESS & ADVERSARIAL ORACLE HARNESS');
console.log('======================================================================\n');

let totalChecks = 0;
let passedChecks = 0;

function assert(condition, testName, extra = '') {
  totalChecks++;
  if (condition) {
    passedChecks++;
    console.log(`[PASS] ${testName} ${extra ? '(' + extra + ')' : ''}`);
  } else {
    console.error(`[FAIL] ${testName} ${extra ? '(' + extra + ')' : ''}`);
  }
}

// ============================================================================
// SECTION 1: BADGE MARKUP & ALT PROMOTION EXACT SPECIFICATION
// ============================================================================
console.log('--- SECTION 1: Alt Promotion Badge Markup & Positioning ---');

WOW_PROGRESSION_FILTER.resetFilters();
WOW_DEEPDIVES_PROGRESSION.setWeaponFaction('all');

// 1.1 Unconstrained state has 0 "⭐ Alt Promoted" badges across all classes and tracks
const allClasses = ['warrior', 'paladin', 'hunter', 'rogue', 'shaman', 'mage', 'warlock', 'priest', 'druid'];
let unconstrainedBadgesCount = 0;
for (const cid of allClasses) {
  const htmlW = WOW_DEEPDIVES_PROGRESSION.renderWeapons(cid);
  const htmlO = WOW_DEEPDIVES_PROGRESSION.renderOffhands(cid);
  const htmlV = WOW_DEEPDIVES_PROGRESSION.renderWands(cid);
  const m1 = htmlW.match(/⭐ Alt Promoted/g) || [];
  const m2 = htmlO.match(/⭐ Alt Promoted/g) || [];
  const m3 = htmlV.match(/⭐ Alt Promoted/g) || [];
  unconstrainedBadgesCount += m1.length + m2.length + m3.length;
}
assert(unconstrainedBadgesCount === 0, '1.1 Unconstrained default state contains 0 ⭐ Alt Promoted badges', `Count: ${unconstrainedBadgesCount}`);

// 1.2 Exact badge markup string verification
const expectedBadge = '<span class="item-promoted-badge" title="Promoted alternative matching your active filters">⭐ Alt Promoted</span>';
WOW_PROGRESSION_FILTER.setState({ minSpellDmg: 15 });
const mageHtmlPromoted = WOW_DEEPDIVES_PROGRESSION.renderWeapons('mage');
assert(mageHtmlPromoted.includes(expectedBadge), '1.2 Exact HTML markup of ⭐ Alt Promoted badge matches spec in Mage weapons');

// 1.3 Badge position is strictly inside .weapon-item-header
const hasBadgeInsideHeader = /<div class="weapon-item-header">[\s\S]*?<span class="item-promoted-badge"[^>]*>⭐ Alt Promoted<\/span>[\s\S]*?<\/div>/.test(mageHtmlPromoted);
assert(hasBadgeInsideHeader, '1.3 ⭐ Alt Promoted badge is cleanly nested inside .weapon-item-header');

// ============================================================================
// SECTION 2: MULTI-ALT PARTITIONING & COMBINATORIAL INTEGRITY
// ============================================================================
console.log('\n--- SECTION 2: Multi-Alt Partitioning Deep Matrix ---');

const wData = WOW_PROGRESSION_DATA.weapons.warrior;
const trackKey = wData.tracks?.[0]?.id || 'primary';
const origList = wData.tracksData?.[trackKey] || wData.levels;

const multiAltStep = {
  name: 'Primary Broadsword',
  itemId: 5001,
  dps: 18.0,
  speed: 2.5,
  reqLevel: 25,
  faction: 'both',
  source: { kind: 'vendor', title: 'Blacksmith' },
  alts: [
    { name: 'Alt 1 - Weak Dagger', itemId: 5002, dps: 12.0, speed: 1.5, reqLevel: 24, faction: 'both' },
    { name: 'Alt 2 - Heavy Mace', itemId: 5003, dps: 28.5, speed: 3.2, reqLevel: 26, faction: 'both' },
    { name: 'Alt 3 - Flail of Doom', itemId: 5004, dps: 32.0, speed: 3.5, reqLevel: 28, faction: 'both' },
    { name: 'Alt 4 - Rusty Scythe', itemId: 5005, dps: 10.0, speed: 2.0, reqLevel: 20, faction: 'both' },
    { name: 'Alt 5 - Iron Cleaver', itemId: 5006, dps: 29.0, speed: 3.0, reqLevel: 27, faction: 'both' }
  ]
};

if (wData.tracksData && wData.tracksData[trackKey]) {
  wData.tracksData[trackKey] = [multiAltStep];
} else {
  wData.levels = [multiAltStep];
}

// 2.1 Filter minDps = 25.0:
// Primary fails (18.0 DPS).
// Alt 1 fails (12.0).
// Alt 2 matches (28.5 DPS) -> MUST be promoted to hero card!
// Alt 3 matches (32.0 DPS) -> MUST be in alt tray!
// Alt 4 fails (10.0 DPS) -> MUST be excluded!
// Alt 5 matches (29.0 DPS) -> MUST be in alt tray!
// Primary fails -> MUST be excluded from hero and alt tray!
WOW_PROGRESSION_FILTER.resetFilters();
WOW_PROGRESSION_FILTER.setState({ minDps: 25.0 });
const resHtml1 = WOW_DEEPDIVES_PROGRESSION.renderWeapons('warrior');

assert(resHtml1.includes('Heavy Mace') && resHtml1.includes('⭐ Alt Promoted'),
  '2.1 First matching alt (Heavy Mace) is promoted to Hero position with badge');

assert(resHtml1.includes('Flail of Doom') && resHtml1.includes('Iron Cleaver'),
  '2.1 Subsequent matching alts (Flail of Doom, Iron Cleaver) are placed in tray');

assert(!resHtml1.includes('Alt 1 - Weak Dagger') && !resHtml1.includes('Rusty Scythe'),
  '2.1 Failing alts (Weak Dagger, Rusty Scythe) are completely excluded');

assert(!resHtml1.includes('Primary Broadsword'),
  '2.1 Failing primary (Primary Broadsword) is completely excluded from card and tray');

// 2.2 Primary MATCHES, and has alts:
// What happens when primary matches and there is an alt?
// In standard rendering, primary stays hero, matching alts stay in tray.
WOW_PROGRESSION_FILTER.resetFilters();
WOW_PROGRESSION_FILTER.setState({ minDps: 15.0 });
const resHtml2 = WOW_DEEPDIVES_PROGRESSION.renderWeapons('warrior');

assert(resHtml2.includes('Primary Broadsword') && !resHtml2.includes('⭐ Alt Promoted'),
  '2.2 When primary matches (18.0 >= 15.0), primary stays hero without Alt Promoted badge');

assert(resHtml2.includes('Heavy Mace') && resHtml2.includes('Flail of Doom') && resHtml2.includes('Iron Cleaver'),
  '2.2 Matching alts >= 15.0 DPS are displayed in alts tray');

assert(!resHtml2.includes('Weak Dagger') && !resHtml2.includes('Rusty Scythe'),
  '2.2 Failing alts < 15.0 DPS are excluded from alts tray');

// Restore original warrior data
if (wData.tracksData && wData.tracksData[trackKey]) {
  wData.tracksData[trackKey] = origList;
} else {
  wData.levels = origList;
}

// ============================================================================
// SECTION 3: 1-CLICK RESET CONSISTENCY & CARD RESTORATION
// ============================================================================
console.log('\n--- SECTION 3: 1-Click Reset Exhaustive Restoration Matrix ---');

WOW_PROGRESSION_FILTER.resetFilters();
const baselineCounts = {};
for (const cid of allClasses) {
  baselineCounts[cid] = {
    weapons: (WOW_DEEPDIVES_PROGRESSION.renderWeapons(cid).match(/class="weapon-step-card/g) || []).length,
    offhands: (WOW_DEEPDIVES_PROGRESSION.renderOffhands(cid).match(/class="weapon-step-card/g) || []).length,
    wands: (WOW_DEEPDIVES_PROGRESSION.renderWands(cid).match(/class="weapon-step-card/g) || []).length
  };
}

// Perform 5 consecutive severe filter cycles and resets
const testFilterBatches = [
  { minLevel: 45, maxLevel: 55, minDps: 35.0 },
  { minStr: 12, minSta: 10, speedOp: '<=', speedVal: 2.0 },
  { minSpellDmg: 20, minIntellect: 8 },
  { minArmor: 300, minBlock: 10 },
  { minDps: 999.0 } // 0 matches everywhere
];

let allResetPass = true;
let cycleNum = 1;
for (const fState of testFilterBatches) {
  WOW_PROGRESSION_FILTER.setState(fState);
  assert(WOW_PROGRESSION_FILTER.getActiveFilterCount() > 0, `3.${cycleNum}a Filters applied in cycle ${cycleNum}`);
  
  WOW_PROGRESSION_FILTER.resetFilters();
  assert(WOW_PROGRESSION_FILTER.getActiveFilterCount() === 0, `3.${cycleNum}b Filters successfully reset to 0 in cycle ${cycleNum}`);

  for (const cid of allClasses) {
    const wNow = (WOW_DEEPDIVES_PROGRESSION.renderWeapons(cid).match(/class="weapon-step-card/g) || []).length;
    const oNow = (WOW_DEEPDIVES_PROGRESSION.renderOffhands(cid).match(/class="weapon-step-card/g) || []).length;
    const vNow = (WOW_DEEPDIVES_PROGRESSION.renderWands(cid).match(/class="weapon-step-card/g) || []).length;
    
    if (wNow !== baselineCounts[cid].weapons || oNow !== baselineCounts[cid].offhands || vNow !== baselineCounts[cid].wands) {
      allResetPass = false;
      console.error(`Discrepancy on ${cid}: w=${wNow}/${baselineCounts[cid].weapons}, o=${oNow}/${baselineCounts[cid].offhands}, v=${vNow}/${baselineCounts[cid].wands}`);
    }
  }
  cycleNum++;
}
assert(allResetPass, '3.6 All 5 stress cycles achieved 100% exact card count restoration across all 9 classes and categories');

// ============================================================================
// SECTION 4: HORDE BIS FILTER LEAKAGE MATRIX ACROSS ALL CASTER CLASSES
// ============================================================================
console.log('\n--- SECTION 4: Horde BiS Filter Leakage Matrix (Staff of Orgrimmar) ---');

// Staff of Orgrimmar is itemId 15444 (DPS 11.82, ReqLevel 13, Two-Hand Staff, Quest)
// Test against all caster classes: mage, warlock, priest, druid, shaman under Horde faction
const casterClasses = ['mage', 'warlock', 'priest', 'druid', 'shaman'];
WOW_DEEPDIVES_PROGRESSION.setWeaponFaction('horde');

// 4.1 Under minLevel = 40, Staff of Orgrimmar must NEVER appear in ANY caster roadmap
WOW_PROGRESSION_FILTER.resetFilters();
WOW_PROGRESSION_FILTER.setState({ minLevel: 40 });
let leakedUnderMinLevel = false;
for (const cid of casterClasses) {
  const html = WOW_DEEPDIVES_PROGRESSION.renderWeapons(cid);
  if (html.includes('Staff of Orgrimmar')) {
    leakedUnderMinLevel = true;
    console.error(`Leak detected in class: ${cid}`);
  }
}
assert(!leakedUnderMinLevel, '4.1 Staff of Orgrimmar strictly filtered out across all 5 caster classes when minLevel=40');

// 4.2 Under minDps = 35.0, Staff of Orgrimmar must NEVER appear in ANY caster roadmap
WOW_PROGRESSION_FILTER.resetFilters();
WOW_PROGRESSION_FILTER.setState({ minDps: 35.0 });
let leakedUnderMinDps = false;
for (const cid of casterClasses) {
  const html = WOW_DEEPDIVES_PROGRESSION.renderWeapons(cid);
  if (html.includes('Staff of Orgrimmar')) {
    leakedUnderMinDps = true;
    console.error(`Leak detected in class: ${cid}`);
  }
}
assert(!leakedUnderMinDps, '4.2 Staff of Orgrimmar strictly filtered out across all 5 caster classes when minDps=35.0');

// 4.3 Under source = 'vendor-craft' or 'world', Staff of Orgrimmar (Dungeon/Quest) must NEVER appear
WOW_PROGRESSION_FILTER.resetFilters();
WOW_DEEPDIVES_PROGRESSION.setWeaponSource('vendor-craft');
let leakedUnderVendor = false;
for (const cid of casterClasses) {
  const html = WOW_DEEPDIVES_PROGRESSION.renderWeapons(cid);
  if (html.includes('Staff of Orgrimmar')) {
    leakedUnderVendor = true;
    console.error(`Leak detected under vendor-craft source in class: ${cid}`);
  }
}
assert(!leakedUnderVendor, '4.3a Staff of Orgrimmar strictly filtered out across all caster classes when Source=Vendor-Craft');

WOW_DEEPDIVES_PROGRESSION.setWeaponSource('world');
let leakedUnderWorld = false;
for (const cid of casterClasses) {
  const html = WOW_DEEPDIVES_PROGRESSION.renderWeapons(cid);
  if (html.includes('Staff of Orgrimmar')) {
    leakedUnderWorld = true;
    console.error(`Leak detected under world source in class: ${cid}`);
  }
}
assert(!leakedUnderWorld, '4.3b Staff of Orgrimmar strictly filtered out across all caster classes when Source=World');

// 4.4 Under slot = 'one-hand', Staff of Orgrimmar (Two-Hand) must NEVER appear
WOW_DEEPDIVES_PROGRESSION.setWeaponSource('all');
WOW_DEEPDIVES_PROGRESSION.setWeaponSlot('one-hand');
let leakedUnder1H = false;
for (const cid of casterClasses) {
  const html = WOW_DEEPDIVES_PROGRESSION.renderWeapons(cid);
  if (html.includes('Staff of Orgrimmar')) {
    leakedUnder1H = true;
    console.error(`Leak detected under one-hand slot in class: ${cid}`);
  }
}
assert(!leakedUnder1H, '4.4 Staff of Orgrimmar strictly filtered out across all caster classes when Slot=One-Hand');

// 4.5 Under unconstrained Horde quest / staff view, Staff of Orgrimmar SHOULD be present for Shaman/Mage
WOW_DEEPDIVES_PROGRESSION.setWeaponSlot('all');
WOW_DEEPDIVES_PROGRESSION.setWeaponSource('all');
WOW_PROGRESSION_FILTER.resetFilters();
const shamanHordeHtml = WOW_DEEPDIVES_PROGRESSION.renderWeapons('shaman');
assert(shamanHordeHtml.includes('Staff of Orgrimmar'),
  '4.5 Staff of Orgrimmar is legitimately present in Horde Shaman roadmap when unconstrained');

// 4.6 Empty state under minDps=999 on Horde produces clean empty state without leaking Staff of Orgrimmar
WOW_PROGRESSION_FILTER.setState({ minDps: 999.0 });
const emptyHordeHtml = WOW_DEEPDIVES_PROGRESSION.renderWeapons('shaman');
assert(!emptyHordeHtml.includes('Staff of Orgrimmar') && emptyHordeHtml.includes('No Progression Items Match Your Active Filters'),
  '4.6 Impossible filter (minDps=999) under Horde produces clean empty state with 0 leaks');

// Clean up
WOW_DEEPDIVES_PROGRESSION.setWeaponFaction('all');
WOW_PROGRESSION_FILTER.resetFilters();

// ============================================================================
// SECTION 5: SUMMARY REPORT
// ============================================================================
console.log('\n======================================================================');
console.log(`TOTAL CHECKS: ${totalChecks} | PASSED: ${passedChecks} | FAILED: ${totalChecks - passedChecks}`);
console.log('======================================================================');

if (passedChecks === totalChecks) {
  console.log('🎉 ALL CHALLENGER V2 DEEP STRESS ASSERTIONS PASSED WITH ZERO ERRORS!');
  process.exit(0);
} else {
  console.error('❌ SOME CHECKS FAILED!');
  process.exit(1);
}
