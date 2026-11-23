/**
 * Caches Wowhead Forever tooltip data (quest names/levels/objectives and item quality/icon/ilvl)
 * for the classic level 29–60 dungeons, so build-guides.mjs can run offline.
 *
 * Usage: node scripts/classic-dungeon-guides/fetch-wowhead-cache.mjs
 * Output: data/scraped/classic-dungeon-wowhead-cache.json (incremental; re-runs only fetch missing ids)
 */
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const CACHE_PATH = path.join(ROOT, 'data', 'scraped', 'classic-dungeon-wowhead-cache.json');
export const CLASSIC_SLUGS = [
  'razorfen-kraul', 'gnomeregan', 'scarlet-monastery', 'razorfen-downs', 'uldaman', 'zul-farrak',
  'maraudon', 'sunken-temple', 'blackrock-depths', 'blackrock-spire', 'dire-maul', 'scholomance', 'stratholme'
];

function loadWindowData(files) {
  const ctx = { window: {} };
  vm.createContext(ctx);
  for (const f of files) vm.runInContext(fs.readFileSync(path.join(ROOT, 'js', 'data', f), 'utf8'), ctx);
  return ctx.window;
}

const stripHtml = (s) => String(s || '')
  .replace(/<br\s*\/?>/gi, '\n').replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ')
  .replace(/&amp;/g, '&').replace(/&#39;/g, "'").replace(/&quot;/g, '"').replace(/\n{2,}/g, '\n').trim();

async function fetchTooltip(kind, id) {
  const url = `https://nether.wowhead.com/forever/tooltip/${kind}/${id}`;
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0 (data cache script)' } });
      if (res.status === 404) return null;
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch (err) {
      if (attempt === 2) { console.warn(`  ! ${kind} ${id}: ${err.message}`); return null; }
      await new Promise(r => setTimeout(r, 800 * (attempt + 1)));
    }
  }
  return null;
}

function parseQuest(id, json) {
  if (!json || !json.name) return null;
  const tip = json.tooltip || '';
  const lvl = tip.match(/Level (\d+)/);
  const body = stripHtml(tip.replace(/^[\s\S]*?<\/table><table>/, ''));
  const [objective] = body.split(/\nRequirements:/);
  return { id, name: json.name, level: lvl ? Number(lvl[1]) : null, objective: objective.replace(/\s+/g, ' ').trim().slice(0, 320) };
}

function parseItem(id, json) {
  if (!json || !json.name) return null;
  const tip = json.tooltip || '';
  const ilvl = tip.match(/Item Level <!--ilvl-->(\d+)/);
  return { id, name: json.name, quality: json.quality ?? null, icon: json.icon || null, ilvl: ilvl ? Number(ilvl[1]) : null };
}

async function main() {
  const w = loadWindowData(['forever-instances-data.js', 'item-database-data.js']);
  const cache = fs.existsSync(CACHE_PATH) ? JSON.parse(fs.readFileSync(CACHE_PATH, 'utf8')) : { quests: {}, items: {} };
  const dbIds = new Set(w.WOW_ITEM_DATABASE.rows.map(r => Number(r[0])));

  const questIds = new Set();
  const itemIds = new Set();
  for (const slug of CLASSIC_SLUGS) {
    const inst = w.WOW_FOREVER_INSTANCES_DATA.find(d => d.slug === slug);
    if (!inst) { console.warn(`missing instance ${slug}`); continue; }
    (inst.quests || []).forEach(q => questIds.add(q));
    (inst.loot || []).forEach(l => { if (!dbIds.has(Number(l.itemId))) itemIds.add(l.itemId); });
  }

  const jobs = [
    ...[...questIds].filter(id => !cache.quests[id]).map(id => ['quest', id]),
    ...[...itemIds].filter(id => !cache.items[id]).map(id => ['item', id])
  ];
  console.log(`quests ${questIds.size}, items needing lookup ${itemIds.size}; fetching ${jobs.length} new`);

  const CONCURRENCY = 4;
  let done = 0;
  async function worker() {
    while (jobs.length) {
      const [kind, id] = jobs.shift();
      const json = await fetchTooltip(kind, id);
      const parsed = kind === 'quest' ? parseQuest(id, json) : parseItem(id, json);
      if (parsed) cache[kind === 'quest' ? 'quests' : 'items'][id] = parsed;
      if (++done % 50 === 0) console.log(`  ${done} fetched`);
      await new Promise(r => setTimeout(r, 150));
    }
  }
  await Promise.all(Array.from({ length: CONCURRENCY }, worker));

  cache.fetchedAt = new Date().toISOString().slice(0, 10);
  fs.writeFileSync(CACHE_PATH, JSON.stringify(cache, null, 2) + '\n', 'utf8');
  console.log(`cached ${Object.keys(cache.quests).length} quests, ${Object.keys(cache.items).length} items -> ${path.relative(ROOT, CACHE_PATH)}`);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) main();
