import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');

const OUT_JSON = path.join(ROOT, 'data', 'forever_reputation.json');
const OUT_JS = path.join(ROOT, 'js', 'data', 'reputation-data.js');

const STANDINGS = ['Neutral', 'Friendly', 'Honored', 'Revered', 'Exalted'];

/**
 * ForeverDB's reputation feed has no vendor or item lists, so every faction shipped with empty
 * rewards. The site's own vendor directory (js/data/vendors-data.js) already knows which items need
 * which reputation (req[item].rep = [faction, standing]) and which vendors sell them, so derive
 * rewards and quartermasters from it. stockSource says how sure we are the stock is Forever's:
 * 'forever' = players' ForeverDB addon saw it, 'npc' = the NPC exists in Forever, 'classic' = Classic data.
 */
function enrichFromVendors(factions) {
  const sandbox = {};
  new Function('window', fs.readFileSync(path.join(ROOT, 'js', 'data', 'vendors-data.js'), 'utf8'))(sandbox);
  const v = sandbox.WOW_VENDORS_DATA;
  const sellers = {};
  for (const [vid, vendor] of Object.entries(v.vendors)) {
    for (const itemId of Object.keys(vendor.sells || {})) (sellers[itemId] ||= []).push([vid, vendor]);
  }
  const confidence = vendor => (vendor.fv ? 'forever' : vendor.met ? 'npc' : 'classic');
  const rank = { forever: 0, npc: 1, classic: 2 };

  return factions.map(f => {
    const items = Object.entries(v.req)
      .filter(([id, r]) => r.rep && r.rep[0] === f.name && sellers[id])
      .map(([id, r]) => {
        const [name, , quality] = v.items[id] || [`Item ${id}`, 0, 1];
        return { id: Number(id), name, standing: r.rep[1], quality: quality || 1 };
      })
      .sort((a, b) => STANDINGS.indexOf(a.standing) - STANDINGS.indexOf(b.standing) || b.quality - a.quality || a.name.localeCompare(b.name));
    if (!items.length) return f;

    const qms = new Map();
    for (const item of items) {
      for (const [vid, vendor] of sellers[item.id]) {
        if (!qms.has(vid)) qms.set(vid, { id: Number(vid), name: vendor.n, zone: vendor.zone, x: vendor.x, y: vendor.y, side: vendor.side || 'Neutral', source: confidence(vendor) });
      }
    }
    const quartermasters = [...qms.values()].sort((a, b) => rank[a.source] - rank[b.source] || a.name.localeCompare(b.name));
    return {
      ...f,
      quartermasters,
      rewardsCount: items.length,
      rewards: items,
      stockSource: quartermasters.reduce((best, q) => (rank[q.source] < rank[best] ? q.source : best), 'classic')
    };
  });
}

async function loadFactions() {
  if (process.argv.includes('--offline')) {
    const saved = JSON.parse(fs.readFileSync(OUT_JSON, 'utf8'));
    console.log(`Loaded ${saved.factions.length} factions from ${path.relative(ROOT, OUT_JSON)} (offline).`);
    return { saved };
  }
  console.log('Fetching https://foreverdb.net/data/reputation.json...');
  const res = await fetch('https://foreverdb.net/data/reputation.json');
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const data = await res.json();
  console.log(`Loaded ${data.factions.length} factions from ForeverDB.`);
  return { data };
}

async function build() {
  const { data, saved } = await loadFactions();
  if (saved) {
    saved.factions = enrichFromVendors(saved.factions);
    write(saved);
    return;
  }

  // Enrich factions with quartermaster info and standing thresholds
  const enrichedFactions = enrichFromVendors(data.factions.map(f => {
    return {
      id: f.id,
      name: f.n,
      desc: f.d || '',
      category: f.group || (f.new ? 'WoW Forever' : 'Classic Era'),
      side: f.side || 'Neutral', // 'Alliance' | 'Horde' | 'Neutral'
      isNewInForever: f.new === 1,
      minLevel: f.minLevel || 1,
      quartermasters: (f.vendors || []).map(v => ({
        id: v.id,
        name: v.n,
        zone: v.zone,
        x: v.x,
        y: v.y,
        side: v.side
      })),
      rewardsCount: f.rewards || (f.items ? f.items.length : 0),
      rewards: (f.items || []).slice(0, 15).map(item => ({
        id: item.id,
        name: item.n,
        standing: item.rank || 'Friendly',
        cost: item.cost || '',
        quality: item.q || 1
      }))
    };
  }));

  const dataset = {
    meta: {
      totalFactions: enrichedFactions.length,
      newFactionsCount: enrichedFactions.filter(f => f.isNewInForever).length,
      ranks: data.ranks || [
        { rank: 'Hated', min: -42000, max: -6000 },
        { rank: 'Hostile', min: -6000, max: -3000 },
        { rank: 'Unfriendly', min: -3000, max: 0 },
        { rank: 'Neutral', min: 0, max: 3000 },
        { rank: 'Friendly', min: 3000, max: 9000 },
        { rank: 'Honored', min: 9000, max: 21000 },
        { rank: 'Revered', min: 21000, max: 42000 },
        { rank: 'Exalted', min: 42000, max: 43000 }
      ],
      build: data.build || '1.60.1.70959',
      updatedAt: '2026-11-20'
    },
    factions: enrichedFactions
  };
  write(dataset);
}

function write(dataset) {
  dataset.meta.rewardsSource = 'js/data/vendors-data.js (reputation-gated vendor items)';
  dataset.meta.totalRewards = dataset.factions.reduce((n, f) => n + (f.rewardsCount || 0), 0);
  fs.writeFileSync(OUT_JSON, JSON.stringify(dataset, null, 2), 'utf8');
  console.log(`Saved ${OUT_JSON}`);

  const jsContent = `/**
 * World of Warcraft: Forever - Factions & Reputation Dataset
 * Datamined from WoW Forever Client (Build ${dataset.meta.build})
 * Ingested from ForeverDB open data under GPL-3.0 attribution (Updated 2026-11-20)
 */
(function () {
  'use strict';

  window.WOW_REPUTATION_DATA = ${JSON.stringify(dataset, null, 2)};
})();
`;
  fs.writeFileSync(OUT_JS, jsContent, 'utf8');
  console.log(`Saved ${OUT_JS}`);
}

build().catch(console.error);
