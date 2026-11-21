import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');

const PROFESSIONS_JSON = path.join(ROOT, 'data', 'forever_professions.json');
const PROFESSIONS_JS = path.join(ROOT, 'js', 'data', 'professions-data.js');

const profData = JSON.parse(fs.readFileSync(PROFESSIONS_JSON, 'utf8'));

console.log('--- 1. AUDITING 1–300 SCOPE ACROSS ALL 13 PROFESSIONS ---');

const allSlugs = [
  'alchemy', 'blacksmithing', 'enchanting', 'engineering',
  'leatherworking', 'tailoring', 'mining', 'herbalism',
  'skinning', 'cooking', 'fishing', 'first-aid', 'camping'
];

allSlugs.forEach(slug => {
  const p = profData[slug];
  assert(p, `Profession ${slug} must exist in data`);

  // Cap note check
  assert(p.leveling, `${slug} must have leveling data`);
  assert(
    !p.leveling.capNote?.includes('225') && !p.leveling.capNote?.toLowerCase().includes('beta'),
    `${slug} capNote must not refer to beta cap 225, got: "${p.leveling.capNote}"`
  );

  // Beta stops check
  const betaStops = (p.leveling.steps || []).filter(s => s.type === 'beta-stop');
  assert.strictEqual(betaStops.length, 0, `${slug} must not have obsolete beta-stop entries`);

  // Shopping list checks
  const shopping = p.shopping || p.leveling.shopping;
  assert(shopping, `${slug} must have a shopping/checklist dataset`);
  assert(
    !shopping.title?.includes('225'),
    `${slug} shopping title must not say 225, got: "${shopping.title}"`
  );
  if (slug !== 'camping') {
    assert(
      shopping.title?.includes('300'),
      `${slug} shopping title must indicate 1 to 300, got: "${shopping.title}"`
    );
  }
  assert(shopping.groups && shopping.groups.length > 0, `${slug} must have shopping item groups`);

  const totalItems = shopping.groups.reduce((acc, g) => acc + (g.items?.length || 0), 0);
  assert(totalItems >= 3, `${slug} must have at least 3 shopping items, got: ${totalItems}`);

  console.log(`  ✓ ${slug.padEnd(15)}: 1–300 roadmap verified (${totalItems} items in checklist)`);
});

console.log('\n--- 2. DETAILED TRADESKILL INTEGRITY CHECKS ---');

// Camping checks (Camping is a cross-profession system with no 1-300 skill bar)
const campSteps = profData.camping.leveling.steps;
assert(campSteps && campSteps.length >= 5, `Camping must have system guide steps, got: ${campSteps?.length}`);
const campShopGroups = profData.camping.shopping.groups;
assert(campShopGroups.length >= 2, `Camping must have campfire supply groups, got: ${campShopGroups.length}`);
console.log('  ✓ Camping: cross-profession campfire system and supplies verified');

// Mining checks
const mineShop = profData.mining.shopping;
const allMineItems = mineShop.groups.flatMap(g => g.items.map(it => it.name));
assert(allMineItems.some(n => /Truesilver/.test(n)), 'Mining shopping list must include Truesilver');
assert(allMineItems.some(n => /Thorium/.test(n)), 'Mining shopping list must include Thorium');
assert(allMineItems.some(n => /Azerothium|Dark Iron/.test(n)), 'Mining shopping list must include endgame Azerothium / Dark Iron');
console.log('  ✓ Mining: Smelting and extraction shopping list verified through Thorium / Azerothium');

// Fishing checks
const fishSteps = profData.fishing.leveling.steps;
assert(fishSteps && fishSteps.length >= 6, `Fishing must have at least 6 leveling steps, got: ${fishSteps?.length}`);
const fishShopItems = profData.fishing.shopping.groups.flatMap(g => g.items.map(it => it.name));
assert(fishShopItems.some(n => /Nightfin Snapper|Mithril Head Trout/.test(n)), 'Fishing checklist must include high-level fish');
console.log('  ✓ Fishing: 1–300 catch roadmap and high-level fish checklist verified');

// Herbalism & Skinning checks
const herbItems = profData.herbalism.shopping.groups.flatMap(g => g.items.map(it => it.name));
assert(herbItems.some(n => /Plaguebloom|Black Lotus|Dreamfoil/.test(n)) && herbItems.some(n => /Purple Lotus|Arthas' Tears/.test(n)), 'Herbalism must include endgame herbs');
const skinItems = profData.skinning.shopping.groups.flatMap(g => g.items.map(it => it.name));
assert(skinItems.includes('Rugged Leather') && skinItems.some(n => /Rugged Hide|Devilsaur Leather/.test(n)), 'Skinning must include endgame leathers');
console.log('  ✓ Herbalism & Skinning: 1–300 harvest quotas verified');

console.log('\n--- 3. BUNDLE SYNCHRONIZATION AUDIT ---');
const profJsRaw = fs.readFileSync(PROFESSIONS_JS, 'utf8');
assert(!profJsRaw.includes("Shopping list, 1 to 225"), 'Bundle must not contain "Shopping list, 1 to 225"');
assert(!profJsRaw.includes("225 is the beta's cap for now"), 'Bundle must not contain beta cap note');
console.log('  ✓ professions-data.js bundle completely purged of obsolete 225 beta cap strings');

console.log('\n=======================================');
console.log('✓ ALL 1–300 PROFESSIONS INTEGRITY TESTS PASSED!');
console.log('=======================================');
