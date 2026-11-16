/**
 * Vendor Directory data pipeline.
 *
 *   node scripts/scrape_foreverdb_vendors.js            # fetch ForeverDB + enrich from Wowhead (cached)
 *   node scripts/scrape_foreverdb_vendors.js --offline  # rebuild from data/forever_vendors_raw.json + cache only
 *
 * 1. Pulls vendors/items/currencies from ForeverDB (foreverdb.net/data).
 * 2. Enriches from the public Wowhead Forever tooltip API (cached in
 *    data/wowhead_vendor_tooltips.json so re-runs only fetch new ids):
 *      - item requirements: profession skill, specialization, reputation, level, PvP rank
 *      - what each recipe teaches (searchable)
 *      - names/quality/icons for token costs missing from the item list (Marks of Honor ...)
 *      - subtitles for vendors ForeverDB lists without one, and placeholder "NPC 12345" names
 * 3. Applies manual fixes (vendors whose zone is a continent).
 * 4. Writes data/forever_vendors.json and js/data/vendors-data.js.
 *
 * Afterwards run: node scripts/download_vendor_icons.js
 */
import fs from 'node:fs';
import path from 'node:path';

const OFFLINE = process.argv.includes('--offline');
const RAW_PATH = path.resolve('data/forever_vendors_raw.json');
const CACHE_PATH = path.resolve('data/wowhead_vendor_tooltips.json');
const RECIPES_PATH = path.resolve('data/wowhead_vendor_recipes.json');
const UA = 'Mozilla/5.0 (compatible; vendor-directory-builder)';

// Vendors whose ForeverDB zone is a whole continent (they stand inside an instance entrance).
// Coordinates are dropped so the site never offers a /way that points at the wrong map.
const ZONE_FIXES = {
  2683: { zone: 'Dun Morogh', loc: 'Gnomeregan (inside the instance entrance)', noWay: true },
  5783: { zone: 'The Barrens', loc: 'Wailing Caverns (inside the cave, before the portal)', noWay: true }
};

// Towns players search by name. A vendor gets the nearest hub whose radius (map %) contains it.
// Centers come from the vendor clusters in the data; Riverglades names from Forever zone guides.
const HUBS = [
  ['Stranglethorn Vale', 'Booty Bay', 28, 77, 6], ['Stranglethorn Vale', "Grom'gol Base Camp", 32.5, 29, 3],
  ['Tanaris', 'Gadgetzan', 52, 28, 3], ['Tanaris', 'Steamwheedle Port', 67, 22, 2.5],
  ['The Barrens', 'The Crossroads', 52, 30.5, 2.5], ['The Barrens', 'Durotar Supply and Logistics camp', 49.9, 29.6, 1.3],
  ['The Barrens', 'Ratchet', 62.5, 38, 3], ['The Barrens', 'Camp Taurajo', 45.5, 59, 2.5],
  ['Winterspring', 'Everlook', 61.5, 38.5, 3], ['Winterspring', 'Starfall Village', 52, 30, 2.5],
  ['Silithus', 'Cenarion Hold', 51, 38.5, 3.5], ['Eastern Plaguelands', "Light's Hope Chapel", 71.5, 50, 4],
  ['Searing Gorge', 'Thorium Point', 39, 29, 3], ['Felwood', 'Timbermaw Hold', 65.5, 3, 3],
  ['Felwood', 'Bloodvenom Post', 35, 53, 3], ['Felwood', 'Talonbranch Glade', 62, 26, 2.5],
  ['Thousand Needles', 'Mirage Raceway', 79, 77, 3], ['Thousand Needles', 'Freewind Post', 45.5, 51.5, 2.5],
  ['Dustwallow Marsh', 'Theramore Isle', 67, 49, 5], ['Dustwallow Marsh', 'Brackenwall Village', 36.5, 31, 3],
  ['Redridge Mountains', 'Lakeshire', 22, 45, 5], ['Redridge Mountains', 'Azeroth Commerce Authority camp (Three Corners)', 10.5, 73, 3],
  ['Alterac Mountains', 'Ravenholdt Manor', 86, 80, 2],
  ['Riverglades', 'Powderfuse Port', 78.3, 53, 3], ['Riverglades', 'Farholde Keep', 64, 84, 4]
];

function hubFor(v) {
  let best = null;
  for (const [zone, name, x, y, r] of HUBS) {
    if (zone !== v.zone) continue;
    const d = Math.hypot(v.x - x, v.y - y);
    if (d <= r && (!best || d < best.d)) best = { name, d };
  }
  return best && best.name;
}

const PVP_RANKS = [
  'Private', 'Corporal', 'Sergeant', 'Master Sergeant', 'Sergeant Major', 'Knight', 'Knight-Lieutenant',
  'Knight-Captain', 'Knight-Champion', 'Lieutenant Commander', 'Commander', 'Marshal', 'Field Marshal',
  'Grand Marshal', 'Scout', 'Grunt', 'Senior Sergeant', 'First Sergeant', 'Stone Guard', 'Blood Guard',
  'Legionnaire', 'Centurion', 'Champion', 'Lieutenant General', 'General', 'Warlord', 'High Warlord'
];

async function getJson(url) {
  const res = await fetch(url, { headers: { 'User-Agent': UA } });
  if (!res.ok) throw new Error(`${url} -> ${res.status}`);
  return res.json();
}

/** OneDrive can briefly lock files it is syncing; retry instead of failing the build. */
function writeFileRetry(p, content) {
  for (let attempt = 1; ; attempt++) {
    try {
      return fs.writeFileSync(p, content, 'utf8');
    } catch (e) {
      if (attempt >= 5 || !['UNKNOWN', 'EBUSY', 'EPERM'].includes(e.code)) throw e;
      Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, 500 * attempt);
    }
  }
}

function loadJson(p, fallback) {
  return fs.existsSync(p) ? JSON.parse(fs.readFileSync(p, 'utf8')) : fallback;
}

function tooltipText(html) {
  return String(html || '')
    .replace(/<!--[^>]*-->/g, '')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/(tr|td|table|div)>/gi, '\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, '&')
    .split('\n').map(s => s.trim()).filter(Boolean);
}

/** Requirements from the item's own tooltip (stops before an embedded crafted-item tooltip). */
function parseItemTooltip(tt) {
  const lines = tooltipText(tt.tooltip);
  const out = {};
  const useIdx = lines.findIndex(l => /^Use: Teaches you how to/i.test(l));
  const own = useIdx >= 0 ? lines.slice(0, useIdx) : lines;
  for (const l of own) {
    let m;
    if ((m = l.match(/^Requires ([A-Za-z' ]+) \((\d+)\)$/))) out.sk = [m[1], Number(m[2])];
    else if ((m = l.match(/^Requires Level (\d+)$/))) out.lv = Number(m[1]);
    else if ((m = l.match(/^Requires (.+?) - (Neutral|Friendly|Honored|Revered|Exalted)$/))) out.rep = [m[1], m[2]];
    else if ((m = l.match(/^Requires (.+)$/)) && PVP_RANKS.includes(m[1])) out.rk = m[1];
    else if ((m = l.match(/^Requires (\w+ (?:Leatherworking|Smithing|Engineering|Tailoring|Alchemy)|Weaponsmith|Armorsmith|Master \w+smith|Gnomish Engineer|Goblin Engineer)$/))) out.sp = m[1];
  }
  if (useIdx >= 0) {
    const m = lines[useIdx].match(/Teaches you how to (?:craft|cook|make|create|brew|sew|smith|permanently enchant [^.]*? with|[a-z]+) (.+?)\.?$/i);
    if (m) out.t = m[1].replace(/\.$/, '').replace(/^(?:an?|the)\s+(?:delicious\s+)?/i, '');
  }
  return out;
}

function parseNpcTooltip(tt) {
  const lines = tooltipText(tt.tooltip);
  const sub = lines[1] && !/^Level /.test(lines[1]) ? lines[1] : '';
  return { n: tt.name, sub };
}

async function fetchTooltips(kind, ids, cache) {
  const todo = ids.filter(id => !cache[kind][id]);
  if (!todo.length || OFFLINE) return;
  console.log(`Fetching ${todo.length} ${kind} tooltips from Wowhead...`);
  let done = 0;
  const worker = async () => {
    while (todo.length) {
      const id = todo.shift();
      try {
        cache[kind][id] = await getJson(`https://nether.wowhead.com/forever/tooltip/${kind}/${id}`);
      } catch (e) {
        cache[kind][id] = { error: String(e.message || e) };
      }
      if (++done % 200 === 0) {
        console.log(`  ${done}...`);
        fs.writeFileSync(CACHE_PATH, JSON.stringify(cache));
      }
      await new Promise(r => setTimeout(r, 60));
    }
  };
  await Promise.all(Array.from({ length: 5 }, worker));
  fs.writeFileSync(CACHE_PATH, JSON.stringify(cache));
}

async function main() {
  let raw;
  if (OFFLINE) {
    raw = loadJson(RAW_PATH, null);
    if (!raw) throw new Error('No raw snapshot; run online first');
  } else {
    console.log('Fetching vendor data from ForeverDB...');
    const [vendors, currencies] = await Promise.all([
      getJson('https://foreverdb.net/data/vendors.json'),
      getJson('https://foreverdb.net/data/currencies.json')
    ]);
    raw = { fetchedAt: new Date().toISOString(), vendors, currencies };
    fs.writeFileSync(RAW_PATH, JSON.stringify(raw));
  }
  const src = raw.vendors;
  const vendors = src.vendors || {};
  const items = src.items || {};

  const cache = loadJson(CACHE_PATH, { item: {}, npc: {} });
  cache.item = cache.item || {};
  cache.npc = cache.npc || {};

  // Token costs that ForeverDB does not list as items (Marks of Honor, Forever tokens)
  const costIds = new Set();
  for (const v of Object.values(vendors)) {
    for (const s of Object.values(v.sells || {})) {
      for (const [type, id] of s.c || []) if (type === 'i' && !items[id]) costIds.add(String(id));
    }
  }
  const npcIds = Object.entries(vendors)
    .filter(([, v]) => !v.sub || /^NPC \d+$/.test(v.n))
    .map(([id]) => id);

  await fetchTooltips('item', [...Object.keys(items), ...costIds], cache);
  await fetchTooltips('npc', npcIds, cache);

  // Item requirements
  const req = {};
  const legacy = loadJson(RECIPES_PATH, []);
  for (const r of legacy) {
    if (items[r.id] && r.skill) req[r.id] = { sk: [null, r.skill] };
  }
  for (const id of Object.keys(items)) {
    const tt = cache.item[id];
    if (!tt || tt.error) continue;
    const parsed = parseItemTooltip(tt);
    if (Object.keys(parsed).length) req[id] = { ...(req[id] || {}), ...parsed };
  }
  for (const [id, r] of Object.entries(req)) {
    if (r.sk && r.sk[0] === null) delete req[id].sk; // a skill rank without its profession is not useful
    if (!Object.keys(req[id]).length) delete req[id];
  }

  const costItems = {};
  for (const id of costIds) {
    const tt = cache.item[id];
    if (tt && !tt.error) costItems[id] = { n: tt.name, q: tt.quality ?? 1, icon: tt.icon || 'inv_misc_questionmark' };
  }

  // Vendor fixes
  let subFixed = 0;
  for (const [id, v] of Object.entries(vendors)) {
    const tt = cache.npc[id];
    if (tt && !tt.error) {
      const npc = parseNpcTooltip(tt);
      if (/^NPC \d+$/.test(v.n) && npc.n) v.n = npc.n;
      if (!v.sub && npc.sub) { v.sub = npc.sub; subFixed++; }
    }
    if (ZONE_FIXES[id]) Object.assign(v, ZONE_FIXES[id]);
    const hub = !v.noWay && hubFor(v);
    if (hub) v.hub = hub;
  }

  const dataset = {
    generatedAt: new Date().toISOString(),
    sourceFetchedAt: raw.fetchedAt,
    about: src.about || 'Vendors and what they sell in WoW Forever.',
    factions: src.factions || {},
    currencies: raw.currencies || {},
    costItems,
    vendors,
    items,
    req
  };

  const vendorCount = Object.keys(vendors).length;
  const itemCount = Object.keys(items).length;
  const zoneCount = new Set(Object.values(vendors).map(v => v.zone)).size;
  console.log(`${vendorCount} vendors, ${itemCount} items, ${zoneCount} zones; ${Object.keys(req).length} items with requirements; ${Object.keys(costItems).length} token costs; ${subFixed} subtitles filled.`);

  writeFileRetry(path.resolve('data/forever_vendors.json'), JSON.stringify(dataset, null, 2));
  const js = `/**
 * World of Warcraft: Forever - Vendor & Merchant Directory Dataset
 * Auto-generated by scripts/scrape_foreverdb_vendors.js from ForeverDB, enriched with Wowhead Forever tooltips.
 * Contains ${vendorCount} vendors across ${zoneCount} zones and ${itemCount} items.
 */
window.WOW_VENDORS_DATA = ${JSON.stringify(dataset)};
`;
  writeFileRetry(path.resolve('js/data/vendors-data.js'), js);
  console.log('Wrote data/forever_vendors.json and js/data/vendors-data.js');
}

main().catch(err => {
  console.error('Error during build:', err);
  process.exit(1);
});
