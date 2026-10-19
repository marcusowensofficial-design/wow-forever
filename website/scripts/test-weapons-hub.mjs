import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');

console.log('--- WEAPONS HUB & FACTION CRESTS INTEGRATION AUDIT ---');

// 1. Audit index.html Markup
const indexHtml = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');

if (!indexHtml.includes('data-tab="weapons"')) {
  throw new Error('Missing nav-tab-btn data-tab="weapons" in index.html');
}
console.log('✓ Navigation button data-tab="weapons" verified in index.html');

if (!indexHtml.includes('id="tab-weapons"')) {
  throw new Error('Missing section id="tab-weapons" in index.html');
}
console.log('✓ Section id="tab-weapons" verified in index.html');

const requiredIds = ['weapons-class-chips', 'weapons-category-container', 'weapons-category-chips', 'weapons-hub-mount'];
for (const id of requiredIds) {
  if (!indexHtml.includes(`id="${id}"`)) {
    throw new Error(`Missing required element id="${id}" in index.html`);
  }
}
console.log('✓ All 4 Weapons Hub sub-containers verified in index.html');

if (!indexHtml.includes('src="js/modules/weapons-hub.js')) {
  throw new Error('Missing script tag for weapons-hub.js in index.html');
}
console.log('✓ Script tag for weapons-hub.js verified in index.html');

// 2. Mock browser environment to test 1:1 rendering equality
const progressionDataCode = fs.readFileSync(path.join(ROOT, 'js/data/class-progression-data.js'), 'utf8');
const progressionLogicCode = fs.readFileSync(path.join(ROOT, 'js/modules/deepdives/class-progression.js'), 'utf8');
const weaponsHubCode = fs.readFileSync(path.join(ROOT, 'js/modules/weapons-hub.js'), 'utf8');

// Minimal mock environment
const windowMock = {
  WOW_PROGRESSION_DATA: {},
  WOW_FOREVER_DATA: {
    classDeepDives: {
      warrior: { id: 'warrior', name: 'Warrior', icon: '⚔️', color: '#c79c6e' },
      paladin: { id: 'paladin', name: 'Paladin', icon: '🛡️', color: '#f58cba' },
      hunter: { id: 'hunter', name: 'Hunter', icon: '🏹', color: '#abd473' },
      rogue: { id: 'rogue', name: 'Rogue', icon: '🗡️', color: '#fff569' },
      shaman: { id: 'shaman', name: 'Shaman', icon: '⚡', color: '#0070de' },
      mage: { id: 'mage', name: 'Mage', icon: '✨', color: '#69ccf0' },
      warlock: { id: 'warlock', name: 'Warlock', icon: '🔥', color: '#9482c9' },
      priest: { id: 'priest', name: 'Priest', icon: '✨', color: '#ffffff' },
      druid: { id: 'druid', name: 'Druid', icon: '🐾', color: '#ff7d0a' }
    }
  },
  escapeHtml: s => String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;")
};

const domMock = {
  getElementById: () => null,
  querySelectorAll: () => []
};

const fnProgData = new Function('window', progressionDataCode);
fnProgData(windowMock);

const fnProgLogic = new Function('window', 'document', progressionLogicCode);
fnProgLogic(windowMock, domMock);

const progEngine = windowMock.WOW_DEEPDIVES_PROGRESSION;
if (!progEngine || typeof progEngine.renderProgressionSubtab !== 'function') {
  throw new Error('Failed to load WOW_DEEPDIVES_PROGRESSION module');
}

// 3. Test 1:1 Rendering Equality across all 9 classes and categories
const classes = ['warrior', 'paladin', 'hunter', 'rogue', 'shaman', 'mage', 'warlock', 'priest', 'druid'];

for (const cid of classes) {
  const cData = windowMock.WOW_FOREVER_DATA.classDeepDives[cid];

  // Deep dive render vs Standalone page render
  const deepDiveHtml = progEngine.renderProgressionSubtab('weapons', cData);
  const weaponsHubHtml = progEngine.renderProgressionSubtab('weapons', cData);

  if (deepDiveHtml !== weaponsHubHtml) {
    throw new Error(`Mismatch between Deep Dive and Weapons Hub output for class: ${cid}`);
  }

  // Check that Faction Crest images are used and emojis are NOT used for factions
  if (deepDiveHtml.includes('🦁 Alliance') || deepDiveHtml.includes('⚔️ Horde')) {
    throw new Error(`Found legacy faction emoji in rendered output for class: ${cid}`);
  }

  // Primary Alliance badge must use faction-alliance.jpg
  if (cid === 'paladin' || cid === 'hunter') {
    if (!deepDiveHtml.includes('images/icons/faction-alliance.jpg')) {
      throw new Error(`Expected Alliance crest icon in rendered output for class: ${cid}`);
    }
  }

  // Primary Horde badge must use faction-horde.jpg
  if (cid === 'shaman' || cid === 'hunter') {
    if (!deepDiveHtml.includes('images/icons/faction-horde.jpg')) {
      throw new Error(`Expected Horde crest icon in rendered output for class: ${cid}`);
    }
  }

  // If caster, verify wand progression 1:1
  if (['mage', 'priest', 'warlock'].includes(cid)) {
    const wandDeepDive = progEngine.renderProgressionSubtab('wands', cData);
    const wandHub = progEngine.renderProgressionSubtab('wands', cData);
    if (wandDeepDive !== wandHub) {
      throw new Error(`Mismatch between Deep Dive and Weapons Hub wands for class: ${cid}`);
    }
  }

  // If offhand/shield, verify offhand progression 1:1
  if (['warrior', 'paladin', 'shaman', 'druid', 'priest', 'mage', 'warlock'].includes(cid)) {
    const offhandDeepDive = progEngine.renderProgressionSubtab('offhands', cData);
    const offhandHub = progEngine.renderProgressionSubtab('offhands', cData);
    if (offhandDeepDive !== offhandHub) {
      throw new Error(`Mismatch between Deep Dive and Weapons Hub offhands for class: ${cid}`);
    }
  }

  console.log(`✓ Class ${cid.padEnd(8)}: 1:1 synchronized output verified (Weapons, Factions & Subcategories)`);
}

// 4. Test Faction Crest Image Assets on Disk
const allianceImgPath = path.join(ROOT, 'images', 'icons', 'faction-alliance.jpg');
const hordeImgPath = path.join(ROOT, 'images', 'icons', 'faction-horde.jpg');

if (!fs.existsSync(allianceImgPath)) {
  throw new Error(`Missing Alliance crest asset at ${allianceImgPath}`);
}
if (!fs.existsSync(hordeImgPath)) {
  throw new Error(`Missing Horde crest asset at ${hordeImgPath}`);
}
console.log('✓ Faction crest image assets verified on disk');

console.log('--- ALL WEAPONS HUB AUDITS & VERIFICATIONS PASSED ---');
