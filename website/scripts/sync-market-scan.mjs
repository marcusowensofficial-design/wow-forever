#!/usr/bin/env node

/**
 * sync-market-scan.mjs
 * Bridges in-game WoW Forever Auction House scans (`ForeverMarket.lua` or `Auctionator.lua`
 * from `WTF/Account/<Account>/SavedVariables/`) into `website/js/data/market-data.js`
 * (`window.WOW_MARKET_SCAN_DATA`), computing lowest buyouts, 14-day medians, and vendor
 * arbitrage flips against `window.WOW_ITEM_DATABASE`.
 *
 * Usage:
 *   node scripts/sync-market-scan.mjs [path/to/SavedVariables/ForeverMarket.lua]
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
      map.set(Number(r[0]), {
        id: Number(r[0]),
        name: r[1],
        quality: Number(r[2]),
        ilvl: Number(r[3]),
        reqLvl: Number(r[4]),
        vendorCopper: Number(r[9]) || 0
      });
    }
  }
  return map;
}

/**
 * Lightweight Lua SavedVariables table parser for ForeverMarketDB
 */
function parseForeverMarketLua(luaText) {
  const realms = {};
  const realmBlocks = luaText.split(/\["([A-Za-z0-9_]+_[A-Za-z0-9]+)"\]\s*=\s*\{/);
  for (let i = 1; i < realmBlocks.length; i += 2) {
    const bucketKey = realmBlocks[i];
    const body = realmBlocks[i + 1] || '';
    const lastScanMatch = body.match(/\["lastScanTime"\]\s*=\s*(\d+)/);
    const lastScanTime = lastScanMatch ? Number(lastScanMatch[1]) : Math.floor(Date.now() / 1000);

    const items = {};
    const itemRe = /\[(\d+)\]\s*=\s*\{([\s\S]*?)\n\t\t\t\}/g;
    let m;
    while ((m = itemRe.exec(body)) !== null) {
      const itemId = Number(m[1]);
      const itemBody = m[2];
      const minBuyout = Number((itemBody.match(/\["minBuyout"\]\s*=\s*(\d+)/) || [])[1] || 0);
      const qty = Number((itemBody.match(/\["qty"\]\s*=\s*(\d+)/) || [])[1] || 1);
      const lastSeen = Number((itemBody.match(/\["lastSeen"\]\s*=\s*(\d+)/) || [])[1] || lastScanTime);
      const histPrices = [];
      const histMatch = itemBody.match(/\["history"\]\s*=\s*\{([\s\S]*?)\}/);
      if (histMatch) {
        const valRe = /=\s*(\d+)/g;
        let hm;
        while ((hm = valRe.exec(histMatch[1])) !== null) {
          histPrices.push(Number(hm[1]));
        }
      }
      if (minBuyout > 0) {
        items[itemId] = { minBuyout, qty, lastSeen, histPrices };
      }
    }
    realms[bucketKey] = { lastScanTime, items };
  }
  return realms;
}

function median(values) {
  if (!values || values.length === 0) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 !== 0 ? sorted[mid] : Math.round((sorted[mid - 1] + sorted[mid]) / 2);
}

function main() {
  const inputPath = process.argv[2];
  const itemMap = loadItemDatabaseMap();
  console.log(`Loaded ${itemMap.size.toLocaleString()} items from item-database-data.js`);

  let parsedRealms = {};
  if (inputPath && fs.existsSync(inputPath)) {
    console.log(`Reading SavedVariables from: ${inputPath}`);
    const rawLua = fs.readFileSync(inputPath, 'utf8');
    parsedRealms = parseForeverMarketLua(rawLua);
  } else {
    console.log('No SavedVariables file passed (or file not found). Generating baseline market-data.js scaffold ready for Nov 4 launch scans.');
  }

  const output = {
    generatedAt: new Date().toISOString(),
    addonVersion: '1.0.0',
    realms: {}
  };

  for (const [bucketKey, bucket] of Object.entries(parsedRealms)) {
    const deals = [];
    const prices = {};
    for (const [idStr, info] of Object.entries(bucket.items)) {
      const id = Number(idStr);
      const meta = itemMap.get(id);
      const med14 = median(info.histPrices.length ? info.histPrices : [info.minBuyout]);
      prices[id] = [info.minBuyout, info.qty, med14, info.lastSeen];

      if (meta && meta.vendorCopper > info.minBuyout) {
        deals.push({
          id,
          name: meta.name,
          buyout: info.minBuyout,
          vendor: meta.vendorCopper,
          profit: meta.vendorCopper - info.minBuyout,
          qty: info.qty
        });
      }
    }
    deals.sort((a, b) => b.profit - a.profit);
    output.realms[bucketKey] = {
      lastScanTime: bucket.lastScanTime,
      itemCount: Object.keys(prices).length,
      vendorFlips: deals.slice(0, 100),
      prices
    };
  }

  const jsContent = `/**
 * WoW Forever Live Server Market Scan Data
 * Auto-generated by scripts/sync-market-scan.mjs from ForeverMarket SavedVariables.
 */
window.WOW_MARKET_SCAN_DATA = ${JSON.stringify(output, null, 2)};\n`;

  fs.writeFileSync(OUT_MARKET_PATH, jsContent, 'utf8');
  console.log(`✓ Wrote ${OUT_MARKET_PATH}`);
}

main();
