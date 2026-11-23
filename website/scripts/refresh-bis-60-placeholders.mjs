/**
 * Replaces placeholder item tooltips in data/scraped/bis-60-sources.json ("Item 12345" names,
 * question-mark icons, no item-name line) with real Wowhead Forever tooltip data.
 *
 * Usage: node scripts/refresh-bis-60-placeholders.mjs && node scripts/build-bis-60.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SOURCES_FILE = path.join(ROOT, 'data', 'scraped', 'bis-60-sources.json');
const src = JSON.parse(fs.readFileSync(SOURCES_FILE, 'utf8'));

const isPlaceholder = (rec) => rec && rec.tt && /^Item \d+$/.test(rec.tt.name || '');
const targets = Object.entries(src.items).filter(([, rec]) => isPlaceholder(rec)).map(([id]) => id);
console.log(`${targets.length} placeholder items`);

let fixed = 0;
for (const id of targets) {
  const res = await fetch(`https://nether.wowhead.com/forever/tooltip/item/${id}`, { headers: { 'User-Agent': 'Mozilla/5.0 (data refresh script)' } });
  if (!res.ok) { console.warn(`  ! ${id}: HTTP ${res.status}`); continue; }
  const json = await res.json();
  if (!json.name || !json.tooltip || /^Item \d+$/.test(json.name)) { console.warn(`  ! ${id}: no tooltip yet`); continue; }
  src.items[id].tt = { name: json.name, q: json.quality, icon: json.icon, html: json.tooltip };
  src.items[id].ttRefreshed = new Date().toLocaleDateString('en-CA'); // local YYYY-MM-DD (UTC can be a day ahead)
  fixed++;
  console.log(`  ${id} -> ${json.name} (q${json.quality}, ${json.icon})`);
  await new Promise(r => setTimeout(r, 200));
}

// Same formatting as build-bis-60.mjs --import (JSON.stringify(out, null, 1)).
fs.writeFileSync(SOURCES_FILE, JSON.stringify(src, null, 1));
console.log(`fixed ${fixed}/${targets.length}`);
