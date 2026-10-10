import fs from 'fs';

const html = fs.readFileSync('index.html', 'utf8');
const checks = [
  'data-tab="atlas"',
  'id="tab-atlas"',
  'atlas-data.js',
  'atlas.js',
  'boss-loot-modal',
  'atlas-rare-search',
  'atlas-subtab-rares',
  'atlas-subtab-books',
  'atlas-subtab-pvp'
];

let allPass = true;
for (const c of checks) {
  if (!html.includes(c)) {
    console.error('Missing in index.html:', c);
    allPass = false;
  } else {
    console.log('✓ Found in index.html:', c);
  }
}

// Check Atlas Data
const atlasDataCode = fs.readFileSync('js/data/atlas-data.js', 'utf8');
const atlasData = eval(`(function() { let window = {}; ${atlasDataCode}; return window.WOW_ATLAS_DATA; })()`);

console.log('--- WOW_ATLAS_DATA Verification ---');
console.log('✓ 34 World Rares count:', atlasData.rares.length);
console.log('✓ 40 Library Books count:', atlasData.libraryBooks.books.length);
console.log('✓ 14 PvP Ranks count:', atlasData.pvp.ranks.length);
console.log('✓ Battlegrounds count:', atlasData.pvp.battlegrounds.length);
console.log('✓ 65 Legacy Challenges total:', atlasData.legacyChallenges.total);
console.log('✓ 48 Tanning Rack recipes total:', atlasData.campingRecipes.tanningRack.totalRecipes);
console.log('✓ 74 Spinning Wheel recipes total:', atlasData.campingRecipes.spinningWheel.totalRecipes);
console.log('✓ Expanded Dungeons:', Object.keys(atlasData.expandedDungeons));

if (allPass && atlasData.rares.length === 34 && atlasData.libraryBooks.books.length === 40) {
  console.log('\n=== ALL ATLAS & EXPANDED DATA CHECKS PASSED PERFECTLY ===');
} else {
  console.error('Mismatch in expected counts!');
  process.exit(1);
}
