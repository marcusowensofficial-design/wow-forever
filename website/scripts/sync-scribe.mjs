#!/usr/bin/env node

/**
 * sync-scribe.mjs
 * Merges ForeverScribe recordings (the in-game addon's SavedVariables,
 * `WTF/Account/<Account>/SavedVariables/ForeverScribe.lua`) into `data/forever_scribe.json`.
 * The JSON accumulates: every run merges new files on top of what it already holds, so wiping
 * the addon's data in game never loses anything here.
 *
 * Merge rules
 *   items    newest recording of each tooltip wins
 *   vendors  newest visit wins the vendor's details; stock is the union of every full-list visit
 *   loot     kills/chests are keyed by GUID, so the same corpse sent in by several group members
 *            counts once; for one corpse the highest quantity seen per item wins
 *
 * Usage (from website/):
 *   node scripts/sync-scribe.mjs --wtf                    your own WTF SavedVariables
 *   node scripts/sync-scribe.mjs --dir scribe-scans       every *.lua in that folder (friends' files)
 *   node scripts/sync-scribe.mjs <ForeverScribe.lua> ...  specific files
 *   add --out <file> to write somewhere else (tests); add --apply-tooltips to update consumables-data.js wherever a recorded tooltip differs
 *   Next: node scripts/build-reputation-data.mjs --offline  (uses the recorded vendors)
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseSavedVariables } from './sync-market-scan.mjs';

const __filename = fileURLToPath(import.meta.url);
const ROOT = path.resolve(path.dirname(__filename), '..');
const DEFAULT_OUT = path.join(ROOT, 'data', 'forever_scribe.json');
const CONSUMABLES = path.join(ROOT, 'js', 'data', 'consumables-data.js');
const DEFAULT_WTF = 'C:/Program Files (x86)/World of Warcraft/_forever_/WTF/Account/54273602#2/SavedVariables/ForeverScribe.lua';

/** Lua tables of consecutive integer keys come back as {1:..,2:..}; turn them into arrays. */
const list = t => (Array.isArray(t) ? t : t && typeof t === 'object' ? Object.keys(t).sort((a, b) => a - b).map(k => t[k]) : []);

export function emptyStore() {
  return { schema: 1, updatedAt: null, sources: 0, items: {}, vendors: {}, loot: {} };
}

/** Normalizes one ForeverScribeDB into the store's shape. */
export function normalize(db) {
  const out = emptyStore();
  for (const [id, r] of Object.entries(db.items || {})) {
    if (!r || !r.n) continue;
    out.items[id] = { name: r.n, quality: r.q ?? null, build: r.b || null, seen: r.t || 0, lines: list(r.l) };
  }
  for (const [id, v] of Object.entries(db.vendors || {})) {
    if (!v || !v.sells) continue;
    const sells = {};
    for (const [itemId, s] of Object.entries(v.sells)) {
      sells[itemId] = {
        price: s.p ?? null, stack: s.s ?? null, limited: s.a ?? null, cost: s.c ?? null, requires: list(s.r)
      };
    }
    out.vendors[id] = {
      name: v.n || null, mapId: v.map ?? null, zone: v.zone || null, x: v.x ?? null, y: v.y ?? null,
      side: v.side || null, build: v.b || null, seen: v.t || 0, partial: !!v.partial, sells
    };
  }
  for (const [id, inst] of Object.entries(db.loot || {})) {
    if (!inst) continue;
    const kills = {};
    for (const [guid, k] of Object.entries(inst.kills || {})) {
      kills[guid] = { encounter: k.e || null, source: k.src || null, seen: k.t || 0, items: { ...(k.i || {}) } };
    }
    out.loot[id] = { name: inst.n || null, type: inst.type || null, size: inst.size ?? null, difficulty: inst.diff ?? null, kills };
  }
  return out;
}

/** Merges `add` into `base` (both store-shaped) following the rules in the header. */
export function merge(base, add) {
  for (const [id, r] of Object.entries(add.items)) {
    if (!base.items[id] || (r.seen || 0) >= (base.items[id].seen || 0)) base.items[id] = r;
  }
  for (const [id, v] of Object.entries(add.vendors)) {
    const old = base.vendors[id];
    if (!old) { base.vendors[id] = v; continue; }
    const newer = (v.seen || 0) >= (old.seen || 0);
    const sells = { ...old.sells };
    // A filtered (partial) list can't prove an item is gone, so stock only ever grows here.
    for (const [itemId, s] of Object.entries(v.sells)) if (newer || !sells[itemId]) sells[itemId] = s;
    base.vendors[id] = { ...(newer ? v : old), sells, partial: old.partial && v.partial };
  }
  for (const [id, inst] of Object.entries(add.loot)) {
    const into = base.loot[id] ||= { ...inst, kills: {} };
    for (const [guid, k] of Object.entries(inst.kills)) {
      const cur = into.kills[guid];
      if (!cur) { into.kills[guid] = k; continue; }
      cur.encounter ||= k.encounter;
      for (const [itemId, qty] of Object.entries(k.items)) cur.items[itemId] = Math.max(cur.items[itemId] || 0, qty);
    }
  }
  return base;
}

/** "Requires Argent Dawn - Honored" -> { faction, standing }. */
export function parseReputation(line) {
  const m = /^Requires (.+) - (Neutral|Friendly|Honored|Revered|Exalted)$/.exec(line || '');
  return m ? { faction: m[1], standing: m[2] } : null;
}

/** Loot table per instance and encounter: kills seen and how often each item dropped. */
export function lootSummary(store) {
  const out = [];
  for (const inst of Object.values(store.loot)) {
    const enc = {};
    for (const k of Object.values(inst.kills)) {
      const key = k.encounter || 'Trash & chests';
      const e = enc[key] ||= { kills: 0, items: {} };
      e.kills++;
      for (const id of Object.keys(k.items)) e.items[id] = (e.items[id] || 0) + 1;
    }
    out.push({ instance: inst.name, size: inst.size, encounters: enc });
  }
  return out;
}

function useText(lines) {
  return lines.filter(l => /^(Use|Equip): /.test(l)).map(l => l.split('\t')[0]).join(' ');
}

function applyTooltips(store, apply) {
  if (!fs.existsSync(CONSUMABLES)) return 0;
  let src = fs.readFileSync(CONSUMABLES, 'utf8');
  const sandbox = {};
  new Function('window', src)(sandbox);
  const tt = sandbox.WOW_CONSUMABLE_TOOLTIPS || {};
  let changed = 0;
  for (const [id, item] of Object.entries(store.items)) {
    if (!(id in tt)) continue;
    const live = useText(item.lines);
    if (!live || live === tt[id]) continue;
    changed++;
    console.log(`  #${id} ${item.name}\n     site: ${tt[id]}\n     game: ${live}`);
    if (apply) {
      src = src.replace(`${JSON.stringify(id)}: ${JSON.stringify(tt[id])}`, `${JSON.stringify(id)}: ${JSON.stringify(live)}`);
      const byName = `${JSON.stringify(item.name.toLowerCase())}: ${JSON.stringify(tt[id])}`;
      if (src.includes(byName)) src = src.replace(byName, `${JSON.stringify(item.name.toLowerCase())}: ${JSON.stringify(live)}`);
    }
  }
  if (apply && changed) fs.writeFileSync(CONSUMABLES, src, 'utf8');
  return changed;
}

function inputFiles(argv) {
  const files = [];
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--wtf') files.push(DEFAULT_WTF);
    else if (a === '--out') i++;
    else if (a === '--dir') {
      const dir = path.resolve(ROOT, argv[++i] || 'scribe-scans');
      if (fs.existsSync(dir)) for (const f of fs.readdirSync(dir)) if (f.endsWith('.lua')) files.push(path.join(dir, f));
    } else if (!a.startsWith('--')) files.push(path.resolve(a));
  }
  return files.filter(f => {
    if (fs.existsSync(f)) return true;
    console.warn(`  skipped (not found): ${f}`);
    return false;
  });
}

function main() {
  const argv = process.argv.slice(2);
  const outIdx = argv.indexOf('--out');
  const OUT = outIdx >= 0 ? path.resolve(argv[outIdx + 1]) : DEFAULT_OUT;
  const files = inputFiles(argv);
  if (!files.length) {
    console.error('✗ No ForeverScribe.lua found. Pass --wtf, --dir <folder> or a file path. Nothing was changed.');
    process.exit(1);
  }
  const store = fs.existsSync(OUT) ? JSON.parse(fs.readFileSync(OUT, 'utf8')) : emptyStore();
  for (const file of files) {
    const db = parseSavedVariables(fs.readFileSync(file, 'utf8')).ForeverScribeDB;
    if (!db) { console.warn(`  skipped (no ForeverScribeDB): ${file}`); continue; }
    merge(store, normalize(db));
    store.sources = (store.sources || 0) + 1;
    console.log(`  merged ${file}`);
  }
  store.updatedAt = new Date().toISOString();
  fs.writeFileSync(OUT, JSON.stringify(store, null, 1), 'utf8');

  const kills = Object.values(store.loot).reduce((n, i) => n + Object.keys(i.kills).length, 0);
  const repItems = Object.values(store.vendors).reduce((n, v) => n + Object.values(v.sells).filter(s => s.requires.some(parseReputation)).length, 0);
  console.log(`✓ Wrote ${path.relative(ROOT, OUT)}: ${Object.keys(store.items).length} tooltips, ${Object.keys(store.vendors).length} vendors (${repItems} reputation items), ${kills} looted kills/chests`);

  console.log('\nTooltips that differ from consumables-data.js:');
  const diff = applyTooltips(store, argv.includes('--apply-tooltips'));
  console.log(diff ? `  ${diff} differ${argv.includes('--apply-tooltips') ? ' and were updated' : '. Re-run with --apply-tooltips to update them'}` : '  none');

  for (const inst of lootSummary(store)) {
    console.log(`\nLoot: ${inst.instance} (${inst.size}-player)`);
    for (const [name, e] of Object.entries(inst.encounters)) {
      const top = Object.entries(e.items).sort((a, b) => b[1] - a[1]).slice(0, 8)
        .map(([id, n]) => `${store.items[id]?.name || id} ${Math.round((n / e.kills) * 100)}%`).join(', ');
      console.log(`  ${name}: ${e.kills} kill(s). ${top}`);
    }
  }
  console.log('\nNext: node scripts/build-reputation-data.mjs --offline, then npm run stamp:data');
}

if (process.argv[1] && path.resolve(process.argv[1]) === __filename) main();
