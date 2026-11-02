import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');

const OUT_JSON = path.join(ROOT, 'data', 'forever_reputation.json');
const OUT_JS = path.join(ROOT, 'js', 'data', 'reputation-data.js');

async function build() {
  console.log('Fetching https://foreverdb.net/data/reputation.json...');
  const res = await fetch('https://foreverdb.net/data/reputation.json');
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const data = await res.json();

  console.log(`Loaded ${data.factions.length} factions from ForeverDB.`);

  // Enrich factions with quartermaster info and standing thresholds
  const enrichedFactions = data.factions.map(f => {
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
  });

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
      build: '1.60.1.70707',
      updatedAt: '2026-11-02'
    },
    factions: enrichedFactions
  };

  fs.writeFileSync(OUT_JSON, JSON.stringify(dataset, null, 2), 'utf8');
  console.log(`Saved ${OUT_JSON}`);

  const jsContent = `/**
 * World of Warcraft: Forever - Factions & Reputation Dataset
 * Datamined from WoW Forever Client (Build 1.60.1.70707)
 * Ingested from ForeverDB open data under GPL-3.0 attribution
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
