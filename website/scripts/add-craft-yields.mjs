#!/usr/bin/env node

/**
 * add-craft-yields.mjs
 * Adds `createCount` (how many items one craft makes) to recipes in
 * data/forever_professions.json and js/data/professions-data.js, from ForeverDB's
 * profession data (`make: [itemId, count]`). Only recipes that make more than 1 get the
 * field; everything else is left exactly as it is. Safe to re-run.
 *
 * sync-all-professions.mjs keeps the field on future full syncs.
 *
 * Usage: node scripts/add-craft-yields.mjs
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const PROFESSIONS_JSON = path.join(ROOT, 'data', 'forever_professions.json');
const PROFESSIONS_JS = path.join(ROOT, 'js', 'data', 'professions-data.js');
const MARKER = 'window.WOW_PROFESSIONS_DATA =';

async function fetchProfession(slug) {
  const url = `https://foreverdb.net/data/professions/${slug}.json`;
  const res = await fetch(url, { headers: { 'User-Agent': 'wow-forever-site-build' } });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`${url} -> HTTP ${res.status}`);
  return res.json();
}

async function main() {
  const data = JSON.parse(fs.readFileSync(PROFESSIONS_JSON, 'utf8'));
  let changed = 0;
  const report = [];

  for (const [slug, prof] of Object.entries(data)) {
    if (!Array.isArray(prof.recipes) || prof.recipes.length === 0) continue;
    const fdb = await fetchProfession(slug);
    if (!fdb || !Array.isArray(fdb.recipes)) {
      console.log(`  ${slug}: no ForeverDB data, skipped`);
      continue;
    }
    const bySpell = new Map();
    const byMake = new Map();
    for (const fr of fdb.recipes) {
      if (!Array.isArray(fr.make)) continue;
      if (fr.s) bySpell.set(fr.s, fr.make);
      if (fr.make[0]) byMake.set(fr.make[0], fr.make);
    }
    let multi = 0;
    for (const r of prof.recipes) {
      const make = (r.spellId && bySpell.get(r.spellId)) || (r.id && byMake.get(r.id));
      const count = make && make[0] === r.id ? Number(make[1]) || 1 : 1;
      const before = r.createCount || 1;
      if (count > 1) { r.createCount = count; multi++; } else delete r.createCount;
      if ((r.createCount || 1) !== before) { changed++; report.push(`${r.name}: ${before} -> ${r.createCount || 1}`); }
    }
    console.log(`  ${slug}: ${multi} recipes make more than 1`);
  }

  if (changed === 0) {
    console.log('No changes.');
    return;
  }
  fs.writeFileSync(PROFESSIONS_JSON, JSON.stringify(data, null, 2), 'utf8');
  const js = fs.readFileSync(PROFESSIONS_JS, 'utf8');
  const idx = js.indexOf(MARKER);
  if (idx === -1) throw new Error(`Could not find ${MARKER} in ${PROFESSIONS_JS}`);
  fs.writeFileSync(PROFESSIONS_JS, `${js.slice(0, idx)}${MARKER} ${JSON.stringify(data, null, 2)};\n`, 'utf8');
  console.log(`✓ Updated ${changed} recipes:\n  ${report.slice(0, 40).join('\n  ')}${report.length > 40 ? `\n  ...and ${report.length - 40} more` : ''}`);
  console.log('Next: npm run stamp:data');
}

main().catch((err) => {
  console.error(`✗ ${err.message}`);
  process.exit(1);
});
