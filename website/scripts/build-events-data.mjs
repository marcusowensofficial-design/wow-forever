import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');

const OUT_JSON = path.join(ROOT, 'data', 'forever_events.json');
const OUT_JS = path.join(ROOT, 'js', 'data', 'events-data.js');

async function build() {
  console.log('Fetching https://foreverdb.net/data/events.json...');
  const res = await fetch('https://foreverdb.net/data/events.json');
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const data = await res.json();

  console.log(`Loaded ${data.events.length} events from ForeverDB.`);

  // Enrich events
  const enrichedEvents = data.events.map(e => {
    return {
      slug: e.slug,
      name: e.n,
      desc: e.d || '',
      kind: e.kind || 'world-event', // 'battleground' | 'holiday' | 'micro'
      icon: e.icon || 134269,
      isNewInForever: e.new === 1,
      minLevel: e.minLevel || 1,
      schedules: e.schedules || [],
      battleground: e.bg ? {
        id: e.bg.id,
        name: e.bg.n,
        minLevel: e.bg.min,
        maxLevel: e.bg.max,
        players: e.bg.players,
        isNew: e.bg.new === 1
      } : null,
      factions: (e.factions || []).map(f => ({
        id: f.id,
        name: f.n,
        rewardsCount: f.rewards || 0,
        isNew: f.new === 1
      })),
      challenge: e.challenge ? {
        id: e.challenge.id,
        name: e.challenge.n,
        desc: e.challenge.d,
        icon: e.challenge.ic
      } : null,
      questsCount: (e.quests || []).length,
      itemsCount: (e.items || []).length,
      vendorsCount: (e.vendors || []).length,
      posts: (e.posts || []).slice(0, 3)
    };
  });

  const dataset = {
    meta: {
      totalEvents: enrichedEvents.length,
      build: data.build || '1.60.1.70707',
      extracted: data.extracted || '2026-10-31',
      updatedAt: '2026-11-02'
    },
    events: enrichedEvents
  };

  fs.writeFileSync(OUT_JSON, JSON.stringify(dataset, null, 2), 'utf8');
  console.log(`Saved ${OUT_JSON}`);

  const jsContent = `/**
 * World of Warcraft: Forever - World Events & Holiday Schedules Dataset
 * Datamined from WoW Forever Client (Build 1.60.1.70707)
 * Ingested from ForeverDB open data under GPL-3.0 attribution
 */
(function () {
  'use strict';

  window.WOW_EVENTS_DATA = ${JSON.stringify(dataset, null, 2)};
})();
`;
  fs.writeFileSync(OUT_JS, jsContent, 'utf8');
  console.log(`Saved ${OUT_JS}`);
}

build().catch(console.error);
