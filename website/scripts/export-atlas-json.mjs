/**
 * Exports js/data/atlas-data.js (the hand-maintained source of truth for the World Atlas, rares,
 * library books, camping recipes, PvP, legacy challenges, expanded dungeons, Merchant's Favor and
 * the Cozy Sleeping Bag) to the matching data/*.json files used by other scripts.
 *
 * Replaces the old scripts/compile-scraped-data.js, which rebuilt atlas-data.js from out-of-date
 * hardcoded data and would have reverted later edits.
 *
 * Usage: npm run build:data   (or: node scripts/export-atlas-json.mjs)
 */
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const ctx = { window: {} };
vm.createContext(ctx);
vm.runInContext(fs.readFileSync(path.join(ROOT, 'js', 'data', 'atlas-data.js'), 'utf8'), ctx);
const ATLAS = ctx.window.WOW_ATLAS_DATA;

// hunterPets is delegated to js/data/hunter-pets-data.js and is not exported here.
const MAP = {
  rares: 'forever_rares.json',
  libraryBooks: 'forever_library_books.json',
  campingRecipes: 'forever_camping_recipes.json',
  pvp: 'forever_pvp.json',
  legacyChallenges: 'forever_legacy_challenges.json',
  expandedDungeons: 'forever_dungeons.json',
  merchantsFavor: 'forever_merchants_favor.json',
  cozySleepingBag: 'forever_cozy_sleeping_bag.json'
};

let written = 0;
for (const [key, file] of Object.entries(MAP)) {
  if (ATLAS[key] === undefined) { console.warn(`! atlas-data.js has no "${key}"; skipped ${file}`); continue; }
  const out = path.join(ROOT, 'data', file);
  const json = JSON.stringify(ATLAS[key], null, 2);
  const prev = fs.existsSync(out) ? fs.readFileSync(out, 'utf8') : null;
  if (prev === json) { console.log(`= ${file} (unchanged)`); continue; }
  fs.writeFileSync(out, json, 'utf8');
  written++;
  console.log(`✓ ${file}`);
}
console.log(`Exported atlas-data.js: ${written} file(s) updated.`);
