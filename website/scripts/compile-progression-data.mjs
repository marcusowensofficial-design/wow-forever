/**
 * Compiles scraped macros, weapons, spellbooks, and milestones
 * into js/data/class-progression-data.js for browser runtime.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');

const SCRAPED_DIR = path.join(ROOT, 'data', 'scraped');
const OUT_FILE = path.join(ROOT, 'js', 'data', 'class-progression-data.js');

const macros = JSON.parse(fs.readFileSync(path.join(SCRAPED_DIR, 'forever_macros.json'), 'utf8'));
const weapons = JSON.parse(fs.readFileSync(path.join(SCRAPED_DIR, 'forever_weapons.json'), 'utf8'));
const spellbooks = JSON.parse(fs.readFileSync(path.join(SCRAPED_DIR, 'forever_spellbooks.json'), 'utf8'));
const milestones = JSON.parse(fs.readFileSync(path.join(SCRAPED_DIR, 'forever_milestones.json'), 'utf8'));

const bundle = {
  macros,
  weapons,
  spellbooks,
  milestones
};

const jsContent = `/**
 * World of Warcraft: Forever - Class Progression & Toolkit Dataset
 * Contains 1-60 Spellbooks, Weapon Progression, 1-Click Copyable Macros, and Leveling Milestones
 * Auto-compiled from verified Beta Forensics and multi-competitor datasets.
 */

if (typeof window !== 'undefined') {
  window.WOW_PROGRESSION_DATA = ${JSON.stringify(bundle, null, 2)};
}
`;

fs.writeFileSync(OUT_FILE, jsContent, 'utf8');
console.log(`[Compiler] Generated ${OUT_FILE} (${(fs.statSync(OUT_FILE).size / 1024).toFixed(1)} KB)`);
