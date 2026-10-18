const fs = require('fs');
const vm = require('vm');
const assert = require('assert');

function makeEl(id = '') {
  return {
    id,
    innerHTML: '',
    textContent: '',
    style: {},
    classList: { toggle: () => {}, add: () => {}, remove: () => {}, contains: () => false },
    setAttribute: () => {},
    getAttribute: () => '',
    removeAttribute: () => {},
    addEventListener: () => {},
    querySelector: () => null,
    querySelectorAll: () => [],
    appendChild: () => {}
  };
}

const els = {
  'professions-root': makeEl('professions-root'),
  'prof-selector-buttons': makeEl('prof-selector-buttons'),
  'prof-viewport-container': makeEl('prof-viewport-container'),
  'prof-subtab-body': makeEl('prof-subtab-body'),
  'wow-item-tooltip': makeEl('wow-item-tooltip')
};

const store = {};
const localStorage = {
  getItem: (k) => store[k] ?? null,
  setItem: (k, v) => { store[k] = String(v); },
  removeItem: (k) => { delete store[k]; }
};

const documentMock = {
  getElementById: (id) => els[id] || null,
  createElement: (tag) => makeEl(tag),
  querySelector: () => null,
  querySelectorAll: () => [],
  addEventListener: () => {},
  body: makeEl('body')
};

const escapeHtml = (s) => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// Mock window and document
const windowMock = {
  WOW_PROFESSIONS_DATA: JSON.parse(fs.readFileSync('data/forever_professions.json', 'utf8')),
  document: documentMock,
  localStorage,
  escapeHtml,
  location: { hash: '#professions/enchanting/recipes' },
  history: { replaceState: () => {} },
  scrollTo: () => {},
  innerWidth: 1280,
  innerHeight: 800,
  addEventListener: () => {}
};
windowMock.window = windowMock;

const context = vm.createContext({
  ...windowMock,
  window: windowMock,
  document: documentMock,
  localStorage,
  escapeHtml,
  history: windowMock.history,
  console,
  setTimeout,
  clearTimeout
});

// Load reference datasets
const refDataCode = fs.readFileSync('js/data/professions-reference-data.js', 'utf8');
vm.runInContext(refDataCode, context);

// Load professions submodules
vm.runInContext(fs.readFileSync('js/modules/professions/professions-core.js', 'utf8'), context);
vm.runInContext(fs.readFileSync('js/modules/professions/professions-modal.js', 'utf8'), context);
vm.runInContext(fs.readFileSync('js/modules/professions/professions-routes.js', 'utf8'), context);
vm.runInContext(fs.readFileSync('js/modules/professions/professions-leveling.js', 'utf8'), context);
vm.runInContext(fs.readFileSync('js/modules/professions/professions-tabs.js', 'utf8'), context);

// Run professions.js in context to verify syntax and initialization
const code = fs.readFileSync('js/modules/professions.js', 'utf8');

try {
  vm.runInContext(code, context);
  console.log('✓ professions.js syntax and evaluation test passed!');
  console.log('window.WOW_PROFESSIONS exists:', !!windowMock.WOW_PROFESSIONS);
  console.log('window.initProfessionsHub exists:', !!windowMock.initProfessionsHub);

  const data = windowMock.WOW_PROFESSIONS_DATA;
  assert.strictEqual(Object.keys(data).length, 13, 'Should have 13 professions');

  // 1. Render Leveling/Ranks & Shopping tabs across all 13 professions
  for (const slug of Object.keys(data)) {
    const targetSub = slug === 'fishing' ? 'ranks' : 'leveling';
    windowMock.WOW_PROFESSIONS.selectProfession(slug, targetSub);
    const html = els['prof-subtab-body'].innerHTML;
    assert(html.length > 100, `${slug} ${targetSub} HTML should render`);
    if (data[slug].shopping) {
      windowMock.WOW_PROFESSIONS.selectProfession(slug, 'shopping');
      const shopHtml = els['prof-subtab-body'].innerHTML;
      assert(shopHtml.includes('shopping-sync-btn'), `${slug} shopping HTML should contain sync button`);
    }
  }
  console.log('✓ Rendered Leveling/Ranks & Shopping tabs cleanly across all 13 professions!');

  // 2. Test Dynamic Remaining Materials Sync on Alchemy (1-225 and 225-300 boundary)
  localStorage.setItem('wowforever_leveling_alchemy', JSON.stringify(['alchemy_step_1']));
  localStorage.setItem('wowforever_shopping_sync_alchemy', 'true');
  windowMock.WOW_PROFESSIONS.selectProfession('alchemy', 'shopping');
  const syncedAlchemyHtml = els['prof-subtab-body'].innerHTML;
  assert(syncedAlchemyHtml.includes('data-item-name="Silverleaf" data-remaining-count="0" data-base-count="65"'), 'Silverleaf should have 0 remaining after step 1');
  assert(syncedAlchemyHtml.includes('data-item-name="Peacebloom" data-remaining-count="21" data-base-count="86"'), 'Peacebloom should have 21 remaining after step 1');
  assert(syncedAlchemyHtml.includes('data-item-name="Empty Vial" data-remaining-count="137" data-base-count="202"'), 'Empty Vial should have 137 remaining after step 1');
  console.log('✓ Dynamic Remaining Materials Sync verified (Silverleaf 65->0, Peacebloom 86->21, Empty Vial 202->137)!');

  // 3. Test Per-Craft vs Total Bracket Math on Blacksmithing Grinding Stones
  windowMock.WOW_PROFESSIONS.selectProfession('blacksmithing', 'leveling');
  const bsHtml = els['prof-subtab-body'].innerHTML;
  assert(bsHtml.includes('=184'), 'Blacksmithing Coarse Grinding Stone should show =184 total Coarse Stone');
  assert(bsHtml.includes('=48'), 'Blacksmithing Solid Grinding Stone should show =48 total Solid Stone');
  assert(bsHtml.includes('=1520'), 'Blacksmithing Dense Grinding Stone should show =1520 total Dense Stone');
  assert(bsHtml.includes('data-per-craft="2" data-total-step="184" data-crafts="92"'), 'Step reagent badge should carry per-craft and total-step data attributes for tooltips');
  console.log('✓ Per-Craft vs Total Bracket Math & Grinding Stone steps verified (=184, =48, =1520)!');

  // 4. Test Blacksmithing Intermediate Grinding Stone Sync (No Double-Counting)
  // Step index 3 in blacksmithing is Coarse Grinding Stone (75-90, 92 crafts, 184 Coarse Stone)
  const bsSteps = data.blacksmithing.leveling.steps;
  const cgsIdx = bsSteps.findIndex(s => s.recipeName === 'Coarse Grinding Stone');
  const pbbIdx = bsSteps.findIndex(s => s.recipeName === 'Patterned Bronze Bracers');
  localStorage.setItem('wowforever_leveling_blacksmithing', JSON.stringify([`blacksmithing_step_${cgsIdx}`]));
  localStorage.setItem('wowforever_shopping_sync_blacksmithing', 'true');
  windowMock.WOW_PROFESSIONS.selectProfession('blacksmithing', 'shopping');
  let bsShopHtml = els['prof-subtab-body'].innerHTML;
  assert(bsShopHtml.includes('data-item-name="Coarse Stone" data-remaining-count="0" data-base-count="184"'), 'Checking Coarse Grinding Stone step should reduce raw Coarse Stone (184->0)');
  assert(bsShopHtml.includes('data-item-name="Coarse Grinding Stone" data-remaining-count="92" data-base-count="92"'), 'Checking Coarse Grinding Stone step alone should NOT reduce Made-along-the-way Coarse Grinding Stone (still 92 needed for bracers/boots/gauntlets)');

  // Now also check Patterned Bronze Bracers (22 crafts * 2 Coarse Grinding Stone = 44 consumed)
  localStorage.setItem('wowforever_leveling_blacksmithing', JSON.stringify([`blacksmithing_step_${cgsIdx}`, `blacksmithing_step_${pbbIdx}`]));
  windowMock.WOW_PROFESSIONS.selectProfession('blacksmithing', 'shopping');
  bsShopHtml = els['prof-subtab-body'].innerHTML;
  assert(bsShopHtml.includes('data-item-name="Coarse Grinding Stone" data-remaining-count="48" data-base-count="92"'), 'Checking Patterned Bronze Bracers should reduce Made-along-the-way Coarse Grinding Stone from 92 to 48');
  console.log('✓ Blacksmithing Intermediate Grinding Stone vs Made-along-the-way sync verified (no double-subtraction)!');

  // 5. Test Tailoring Bolt of Woolen Cloth vs Raw Wool Cloth Sync (Shortfall Expansion)
  const tailSteps = data.tailoring.leveling.steps;
  const woolBolt1 = tailSteps.findIndex((s, i) => s.recipeName === 'Bolt of Woolen Cloth' && s.from === 55);
  const woolBolt2 = tailSteps.findIndex((s, i) => s.recipeName === 'Bolt of Woolen Cloth' && s.from === 75);
  localStorage.setItem('wowforever_leveling_tailoring', JSON.stringify([`tailoring_step_${woolBolt1}`, `tailoring_step_${woolBolt2}`]));
  localStorage.setItem('wowforever_shopping_sync_tailoring', 'true');
  windowMock.WOW_PROFESSIONS.selectProfession('tailoring', 'shopping');
  const tailShopHtml = els['prof-subtab-body'].innerHTML;
  assert(tailShopHtml.includes('data-item-name="Wool Cloth" data-remaining-count="195" data-base-count="390"'), 'Checking both Bolt of Woolen Cloth steps (65 bolts = 195 Wool Cloth) should leave 195 Wool Cloth remaining for the 65 extra bolts');
  assert(tailShopHtml.includes('data-item-name="Bolt of Woolen Cloth" data-remaining-count="130" data-base-count="130"'), 'Checking Bolt of Woolen Cloth steps should leave 130 Bolt of Woolen Cloth remaining for downstream armor steps');
  console.log('✓ Tailoring Bolt vs Cloth shortfall sync verified!');

  // 6. Test Cooking & First Aid 1-225 vs 225-300 Post-Beta Group Split
  const faSteps = data['first-aid'].leveling.steps;
  const mwPre225Idx = faSteps.findIndex(s => s.recipeName === 'Mageweave Bandage' && s.from === 210);
  localStorage.setItem('wowforever_leveling_first-aid', JSON.stringify([`first-aid_step_${mwPre225Idx}`]));
  localStorage.setItem('wowforever_shopping_sync_first-aid', 'true');
  windowMock.WOW_PROFESSIONS.selectProfession('first-aid', 'shopping');
  const faShopHtml = els['prof-subtab-body'].innerHTML;
  assert(faShopHtml.includes('data-item-name="Mageweave Cloth" data-remaining-count="0" data-base-count="18"'), 'Pre-225 Mageweave Bandage step should deplete 1-225 Mageweave Cloth (18->0)');
  assert(faShopHtml.includes('data-item-name="Mageweave Cloth" data-remaining-count="74" data-base-count="74"'), 'Pre-225 Mageweave Bandage step must NOT subtract from 225-300 Mageweave Cloth (74->74)');
  assert(faShopHtml.includes('shopping-beta-divider'), 'First Aid shopping list should render the 225-300 beta divider');
  console.log('✓ Cooking & First Aid 1-225 vs 225-300 group split verified!');

  // 7. Test Camping Shopping List Sync (All steps checked -> 0 remaining for all items)
  const campAllStepIds = data.camping.leveling.steps
    .map((s, idx) => s.type === 'step' ? `camping_step_${idx}` : null)
    .filter(Boolean);
  localStorage.setItem('wowforever_leveling_camping', JSON.stringify(campAllStepIds));
  localStorage.setItem('wowforever_shopping_sync_camping', 'true');
  windowMock.WOW_PROFESSIONS.selectProfession('camping', 'shopping');
  const campShopHtml = els['prof-subtab-body'].innerHTML;
  assert(campShopHtml.includes('data-item-name="Simple Wood" data-remaining-count="0" data-base-count="376"'), 'Camping Simple Wood should reach 0 when all steps checked');
  assert(campShopHtml.includes('data-item-name="Iron Bar" data-remaining-count="0" data-base-count="160"'), 'Camping Iron Bar should reach 0 when all steps checked');
  console.log('✓ Camping 1-225 full checklist sync verified (Simple Wood 376->0, Iron Bar 160->0)!');
} catch (err) {
  console.error('✗ Evaluation failed:', err);
  process.exit(1);
}

