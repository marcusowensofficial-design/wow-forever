#!/usr/bin/env node

/**
 * sync-market-scan.mjs
 * Bridges in-game WoW Forever Auction House scans (ForeverMarket SavedVariables from
 * `WTF/Account/<Account>/SavedVariables/ForeverMarket.lua`) into `website/js/data/market-data.js`
 * (`window.WOW_MARKET_SCAN_DATA`): lowest buyouts, 14-day medians, a compact daily price
 * history for sparklines, and vendor arbitrage flips against `window.WOW_ITEM_DATABASE`.
 *
 * Several scans (yours plus friends') can be merged in one run: for each item the newest
 * sighting wins the current price, and daily histories are combined (lowest price per day).
 *
 * Usage:
 *   node scripts/sync-market-scan.mjs <ForeverMarket.lua> [more.lua ...]
 *   node scripts/sync-market-scan.mjs --dir market-scans        # every *.lua in that folder
 *   node scripts/sync-market-scan.mjs --wtf                     # your own WTF SavedVariables
 *   (options combine, e.g. --wtf --dir market-scans)
 *
 * With no usable input it exits with an error and leaves market-data.js untouched.
 */

import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const WEBSITE_ROOT = path.resolve(__dirname, '..');
const ITEM_DB_PATH = path.join(WEBSITE_ROOT, 'js', 'data', 'item-database-data.js');
const OUT_MARKET_PATH = path.join(WEBSITE_ROOT, 'js', 'data', 'market-data.js');
const DEFAULT_WTF_PATH = 'C:/Program Files (x86)/World of Warcraft/_forever_/WTF/Account/54273602#2/SavedVariables/ForeverMarket.lua';

const HISTORY_DAYS = 14;
const MIN_HISTORY_POINTS = 3;     // fewer than this and a sparkline says nothing
const FLIP_MIN_PROFIT = 50;       // copper per item...
const FLIP_MIN_TOTAL = 10000;     // ...or 1g across every listed unit
const MAX_FLIPS = 100;

function loadItemDatabaseMap() {
  if (!fs.existsSync(ITEM_DB_PATH)) return new Map();
  const sandbox = { window: {} };
  vm.createContext(sandbox);
  vm.runInContext(fs.readFileSync(ITEM_DB_PATH, 'utf8'), sandbox);
  const db = sandbox.window.WOW_ITEM_DATABASE;
  const map = new Map();
  if (db && Array.isArray(db.rows)) {
    for (const r of db.rows) {
      // [id, name, quality, ilvl, reqLvl, catIdx, kindIdx, iconIdx, bindCode, vendorSellCopper]
      map.set(Number(r[0]), { name: r[1], vendorCopper: Number(r[9]) || 0 });
    }
  }
  return map;
}

/**
 * Minimal parser for the Lua subset WoW writes to SavedVariables: `Name = value` assignments
 * whose values are tables, strings, numbers, booleans or nil. Tables become plain objects
 * (array-style entries get keys 1, 2, 3...). Comments (`-- [1]`) are skipped.
 */
export function parseSavedVariables(text) {
  let i = 0;
  const n = text.length;

  function skip() {
    while (i < n) {
      const c = text[i];
      if (c === ' ' || c === '\t' || c === '\n' || c === '\r' || c === ',' || c === ';') { i++; continue; }
      if (c === '-' && text[i + 1] === '-') {
        while (i < n && text[i] !== '\n') i++;
        continue;
      }
      break;
    }
  }

  function parseString() {
    const quote = text[i++];
    let out = '';
    while (i < n && text[i] !== quote) {
      if (text[i] === '\\') {
        const e = text[i + 1];
        if (/\d/.test(e)) {
          const m = /^\d{1,3}/.exec(text.slice(i + 1, i + 4))[0];
          out += String.fromCharCode(Number(m));
          i += 1 + m.length;
          continue;
        }
        out += e === 'n' ? '\n' : e === 't' ? '\t' : e;
        i += 2;
        continue;
      }
      out += text[i++];
    }
    i++; // closing quote
    return out;
  }

  function parseValue() {
    skip();
    const c = text[i];
    if (c === '{') return parseTable();
    if (c === '"' || c === "'") return parseString();
    const m = /^(-?\d+(?:\.\d+)?(?:e[+-]?\d+)?|true|false|nil)/i.exec(text.slice(i, i + 40));
    if (!m) throw new Error(`Unexpected token at ${i}: ${text.slice(i, i + 30)}`);
    i += m[0].length;
    if (m[0] === 'true') return true;
    if (m[0] === 'false') return false;
    if (m[0] === 'nil') return null;
    return Number(m[0]);
  }

  function parseTable() {
    i++; // {
    const obj = {};
    let arrayIdx = 1;
    for (;;) {
      skip();
      if (text[i] === '}') { i++; return obj; }
      if (text[i] === '[') {
        i++;
        const key = parseValue();
        skip();
        i++; // ]
        skip();
        i++; // =
        obj[key] = parseValue();
      } else {
        obj[arrayIdx++] = parseValue();
      }
    }
  }

  const globals = {};
  while (i < n) {
    skip();
    if (i >= n) break;
    const m = /^[A-Za-z_][A-Za-z0-9_]*/.exec(text.slice(i, i + 200));
    if (!m) throw new Error(`Expected a global name at ${i}`);
    i += m[0].length;
    skip();
    i++; // =
    globals[m[0]] = parseValue();
  }
  return globals;
}

/** Reads one ForeverMarket.lua into { bucketKey: { lastScanTime, items: { id: record } } }. */
function readScan(file) {
  const db = parseSavedVariables(fs.readFileSync(file, 'utf8')).ForeverMarketDB;
  if (!db || !db.realms) throw new Error(`${file} has no ForeverMarketDB.realms`);
  const out = {};
  for (const [bucketKey, bucket] of Object.entries(db.realms)) {
    if (!bucket || typeof bucket !== 'object' || !bucket.items) continue;
    const items = {};
    for (const [id, rec] of Object.entries(bucket.items)) {
      // Only the item's own top-level fields; suffix variants keep their own records.
      if (!rec || !(rec.minBuyout > 0)) continue;
      const history = {};
      for (const [day, price] of Object.entries(rec.history || {})) {
        if (price > 0) history[Number(day)] = price;
      }
      items[id] = {
        minBuyout: rec.minBuyout,
        qty: rec.qty || 1,
        lastSeen: rec.lastSeen || bucket.lastScanTime || 0,
        name: rec.name || null,
        history
      };
    }
    out[bucketKey] = { lastScanTime: bucket.lastScanTime || 0, items };
  }
  return out;
}

/** Merges scans: newest sighting wins the current price; histories keep the lowest per day. */
function mergeScans(scans) {
  const merged = {};
  for (const scan of scans) {
    for (const [bucketKey, bucket] of Object.entries(scan)) {
      const into = merged[bucketKey] || (merged[bucketKey] = { lastScanTime: 0, sources: 0, items: {} });
      into.lastScanTime = Math.max(into.lastScanTime, bucket.lastScanTime);
      into.sources++;
      for (const [id, rec] of Object.entries(bucket.items)) {
        const cur = into.items[id];
        if (!cur) { into.items[id] = { ...rec, history: { ...rec.history } }; continue; }
        if (rec.lastSeen > cur.lastSeen) {
          cur.minBuyout = rec.minBuyout;
          cur.qty = rec.qty;
          cur.lastSeen = rec.lastSeen;
          cur.name = rec.name || cur.name;
        }
        for (const [day, price] of Object.entries(rec.history)) {
          if (!(cur.history[day] <= price)) cur.history[day] = price;
        }
      }
    }
  }
  return merged;
}

function median(values) {
  if (!values || values.length === 0) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 !== 0 ? sorted[mid] : Math.round((sorted[mid - 1] + sorted[mid]) / 2);
}

function resolveInputs(argv) {
  const files = [];
  for (let a = 0; a < argv.length; a++) {
    const arg = argv[a];
    if (arg === '--wtf') {
      files.push(DEFAULT_WTF_PATH);
    } else if (arg === '--dir') {
      const dir = path.resolve(argv[++a] || '');
      if (!fs.existsSync(dir)) throw new Error(`--dir folder not found: ${dir}`);
      const found = fs.readdirSync(dir).filter((f) => f.toLowerCase().endsWith('.lua')).map((f) => path.join(dir, f));
      if (found.length === 0) throw new Error(`No .lua scan files in ${dir}`);
      files.push(...found);
    } else {
      files.push(arg);
    }
  }
  if (files.length === 0) {
    throw new Error('No scan file given. Pass a ForeverMarket.lua path, --dir <folder>, or --wtf.');
  }
  for (const f of files) {
    if (!fs.existsSync(f)) throw new Error(`Scan file not found: ${f}`);
  }
  return files;
}

export function buildOutput(merged, itemMap) {
  const output = {
    generatedAt: new Date().toISOString(),
    activeRealm: '',
    lastScanTime: 0,
    sources: 0,
    totalItems: 0,
    realms: {},
    prices: {},
    vendorFlips: []
  };

  for (const [bucketKey, bucket] of Object.entries(merged)) {
    const scanDay = Math.floor(bucket.lastScanTime / 86400);
    const firstDay = scanDay - HISTORY_DAYS + 1;
    const prices = {};
    const flips = [];

    for (const [idStr, info] of Object.entries(bucket.items)) {
      const id = Number(idStr);
      const meta = itemMap.get(id);
      const name = (meta && meta.name) || info.name || '';

      const h = [];
      const inWindow = [];
      for (let d = firstDay; d <= scanDay; d++) {
        const p = info.history[d];
        h.push(p > 0 ? p : 0);
        if (p > 0) inWindow.push(p);
      }
      const rec = {
        minBuyout: info.minBuyout,
        qty: info.qty,
        med14: median(inWindow.length ? inWindow : [info.minBuyout]),
        lastSeen: info.lastSeen,
        name
      };
      if (inWindow.length >= MIN_HISTORY_POINTS) {
        // Trim leading empty days; the array still ends on the scan day.
        while (h.length && h[0] === 0) h.shift();
        // Stored as a percent of med14 (0 = no data that day): sparklines only need the shape,
        // and 2-3 digit numbers keep the download small. price ≈ h[i] / 100 * med14.
        rec.h = h.map((p) => (p > 0 ? Math.max(1, Math.round((p / rec.med14) * 100)) : 0));
      }
      prices[id] = rec;

      const vendor = (meta && meta.vendorCopper) || 0;
      const profit = vendor - info.minBuyout;
      const total = profit * info.qty;
      if (profit > 0 && (profit >= FLIP_MIN_PROFIT || total >= FLIP_MIN_TOTAL)) {
        flips.push({ id, name, buyout: info.minBuyout, vendor, profit, qty: info.qty, total });
      }
    }
    flips.sort((a, b) => b.total - a.total);

    // Per-realm summary only: the active realm's prices are in output.prices.
    output.realms[bucketKey] = {
      lastScanTime: bucket.lastScanTime,
      sources: bucket.sources,
      itemCount: Object.keys(prices).length,
      vendorFlips: flips.slice(0, MAX_FLIPS)
    };

    const isPve = bucketKey.startsWith('PvE');
    const activeIsPve = output.activeRealm.startsWith('PvE');
    if (!output.activeRealm || (isPve && (!activeIsPve || bucket.lastScanTime > output.lastScanTime))) {
      output.activeRealm = bucketKey;
      output.lastScanTime = bucket.lastScanTime;
      output.sources = bucket.sources;
      output.totalItems = Object.keys(prices).length;
      output.prices = prices;
      output.vendorFlips = flips.slice(0, MAX_FLIPS);
    }
  }
  return output;
}

function main() {
  let files;
  try {
    files = resolveInputs(process.argv.slice(2));
  } catch (err) {
    console.error(`✗ ${err.message}\n  market-data.js was NOT changed.`);
    process.exit(1);
  }

  const itemMap = loadItemDatabaseMap();
  console.log(`Loaded ${itemMap.size.toLocaleString()} items from item-database-data.js`);

  const scans = [];
  for (const f of files) {
    try {
      const scan = readScan(f);
      const count = Object.values(scan).reduce((s, b) => s + Object.keys(b.items).length, 0);
      console.log(`  read ${f} (${count.toLocaleString()} items)`);
      scans.push(scan);
    } catch (err) {
      console.error(`✗ Could not read ${f}: ${err.message}\n  market-data.js was NOT changed.`);
      process.exit(1);
    }
  }

  const output = buildOutput(mergeScans(scans), itemMap);
  if (output.totalItems === 0) {
    console.error('✗ The scan(s) contained no priced items. market-data.js was NOT changed.');
    process.exit(1);
  }

  fs.writeFileSync(OUT_MARKET_PATH, buildMarketJs(output), 'utf8');
  const withHist = Object.values(output.prices).filter((p) => p.h).length;
  console.log(`✓ Wrote ${OUT_MARKET_PATH}`);
  console.log(`  ${output.totalItems.toLocaleString()} prices on ${output.activeRealm} from ${output.sources} scan file(s), ${withHist.toLocaleString()} with price history, ${output.vendorFlips.length} vendor flips`);
  console.log('  Next: npm run stamp:data  (so browsers fetch the new file)');
}

/**
 * Serializes the market data compactly. `byName` (lowercased item name -> price record) is NOT
 * shipped: it is rebuilt in the browser from `prices`, which cuts the download by more than half.
 */
export function buildMarketJs(output) {
  const { byName: _byName, ...shipped } = output;
  return `/**
 * WoW Forever Live Server Market Scan Data
 * Auto-generated by scripts/sync-market-scan.mjs from ForeverMarket SavedVariables.
 * prices[id] = { minBuyout, qty, med14, lastSeen, name, h? } where h is the daily lowest
 * buyout for up to 14 days ending on the scan day, as a percent of med14 (0 = no data).
 * byName is rebuilt at load time from prices (see the snippet at the end).
 */
window.WOW_MARKET_SCAN_DATA = ${JSON.stringify(shipped)};
(function () {
  var M = window.WOW_MARKET_SCAN_DATA, byName = {};
  for (var id in M.prices) {
    var p = M.prices[id];
    if (p && p.name) byName[p.name.toLowerCase().trim()] = p;
  }
  M.byName = byName;
})();
`;
}

// Only run the sync when executed directly, so other scripts can import the helpers.
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main();
}
