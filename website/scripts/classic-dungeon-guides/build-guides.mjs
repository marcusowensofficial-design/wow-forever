/**
 * Builds js/data/dungeon-guides-classic-data.js: guides for the 14 classic level 29–60 dungeons.
 *
 * Inputs (all local):
 *   scripts/classic-dungeon-guides/curated.mjs           hand-written entrances, keys, routes, tactics, Forever notes
 *   js/data/forever-instances-data.js                    ForeverDB bosses, loot (by boss order) and quest ids
 *   js/data/item-database-data.js                        item quality / ilvl / icon / stats / "new in Forever" flag / boss sources
 *   js/data/bis-60-data.js                               which Level 60 pre-raid BiS lists pick each drop
 *   data/scraped/classic-dungeon-wowhead-cache.json      quest names, levels and objectives (fetch-wowhead-cache.mjs)
 *
 * Usage: node scripts/classic-dungeon-guides/build-guides.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';
import { GUIDES } from './curated.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const OUT = path.join(ROOT, 'js', 'data', 'dungeon-guides-classic-data.js');
const CACHE = JSON.parse(fs.readFileSync(path.join(ROOT, 'data', 'scraped', 'classic-dungeon-wowhead-cache.json'), 'utf8'));
const BUILD_DATE = 'November 22, 2026';

const ctx = { window: {} };
vm.createContext(ctx);
for (const f of ['forever-instances-data.js', 'item-database-data.js', 'bis-60-data.js']) {
  vm.runInContext(fs.readFileSync(path.join(ROOT, 'js', 'data', f), 'utf8'), ctx);
}
const W = ctx.window;
const DB = W.WOW_ITEM_DATABASE;
const ROWS = new Map(DB.rows.map(r => [Number(r[0]), r]));
const ITEMDB_INST = { 'zul-farrak': 'zulfarrak' }; // item DB uses a different slug for ZF
const LEVELS = { 'lower-blackrock-spire': [55, 60], 'upper-blackrock-spire': [58, 60] };
// BiS-60 source strings name the dungeon like this:
const BIS_DUNGEON_RE = {
  'razorfen-kraul': /Razorfen Kraul/, 'gnomeregan': /Gnomeregan/, 'scarlet-monastery': /Scarlet Monastery/,
  'razorfen-downs': /Razorfen Downs/, 'uldaman': /Uldaman/, 'zul-farrak': /Zul'Farrak/, 'maraudon': /Maraudon/,
  'sunken-temple': /Sunken Temple|Atal'Hakkar/, 'blackrock-depths': /Blackrock Depths/,
  'lower-blackrock-spire': /Lower Blackrock Spire/, 'upper-blackrock-spire': /Upper Blackrock Spire/,
  'dire-maul': /Dire Maul/, 'scholomance': /Scholomance/, 'stratholme': /Stratholme/
};
const BIND_TEXT = { 1: 'Binds when picked up', 2: 'Binds when equipped', 3: 'Binds when used', 4: 'Quest Item', 5: 'Binds when picked up' };

const esc = (s) => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const cell = (s) => String(s ?? '').replace(/\|/g, '/').replace(/\s+/g, ' ').trim();
const itemUrl = (id) => `https://www.wowhead.com/forever/item=${id}`;
const questUrl = (id) => `https://www.wowhead.com/forever/quest=${id}`;

function itemInfo(id) {
  const r = ROWS.get(Number(id));
  if (!r) return null;
  return {
    id: Number(r[0]), name: r[1], q: Math.min(r[2], 5), ilvl: r[3], req: r[4],
    kind: DB.meta.kinds[r[6]] || 'Item', icon: r[7] >= 0 ? DB.meta.icons[r[7]] : 'inv_misc_questionmark',
    bind: r[8], isNew: (r[10] & 1) !== 0, stats: r[14] || ''
  };
}

/** All drops for an instance keyed by boss name ('' = trash), merged from ForeverDB loot and item DB sources. */
function collectLoot(inst) {
  const byBoss = new Map();
  const add = (boss, id) => {
    const key = boss || '';
    if (!byBoss.has(key)) byBoss.set(key, new Set());
    byBoss.get(key).add(Number(id));
  };
  const orderToName = new Map(inst.bosses.map(b => [b.order, b.name]));
  for (const l of inst.loot || []) add(orderToName.get(l.bossOrder) || '', l.itemId);
  const instKey = ITEMDB_INST[inst.slug] || inst.slug;
  DB.rows.forEach(r => {
    for (const k of r[13] || []) {
      const src = DB.meta.src[k];
      if (src && src[0] === instKey) add(src[1] === 'Trash mobs' ? '' : src[1], r[0]);
    }
  });
  return byBoss;
}

function bisPicks(guideSlug, bossNames) {
  const re = BIS_DUNGEON_RE[guideSlug];
  const B = W.WOW_BIS_DATA_60;
  const picks = new Map();
  for (const c of B.classes) {
    for (const sp of B[c.id].specs) {
      const seen = new Set();
      const consider = (it) => {
        if (!it || !it.itemId) return;
        const text = [it.source, ...(it.sourceDetails || [])].join(' ');
        if (!re.test(text)) return;
        const boss = bossNames.find(b => text.includes(b)) || '';
        // Lower/Upper split: an item from a boss in the other wing does not belong here
        if (!boss && /blackrock-spire/.test(guideSlug)) return;
        const specLabel = `${sp.name} ${c.name}`;
        const k = String(it.itemId);
        if (!picks.has(k)) picks.set(k, { id: Number(it.itemId), name: it.name, boss, specs: new Set() });
        if (!seen.has(k + specLabel)) { picks.get(k).specs.add(specLabel); seen.add(k + specLabel); }
      };
      for (const fac of ['alliance', 'horde']) Object.values(sp.doll?.[fac] || {}).forEach(consider);
      for (const sl of sp.slots || []) (sl.items || []).forEach(consider);
    }
  }
  return [...picks.values()].sort((a, b) => b.specs.size - a.specs.size || a.name.localeCompare(b.name));
}

function lootLine(ids, tooltips, max = 6) {
  const items = [...ids].map(itemInfo).filter(i => i && i.q >= 3)
    .sort((a, b) => b.q - a.q || b.ilvl - a.ilvl || a.name.localeCompare(b.name));
  if (!items.length) return '';
  const shown = items.slice(0, max);
  shown.forEach(i => { tooltips[i.id] = i; });
  const parts = shown.map(i => `[${i.name}](${itemUrl(i.id)})${i.isNew ? ' ✦' : ''}`);
  const more = items.length > max ? ` · +${items.length - max} more` : '';
  return parts.join(' · ') + more;
}

function buildTooltip(i) {
  const lines = [
    `<b class="q${i.q}">${esc(i.name)}</b>`,
    `<span class="q">Item Level ${i.ilvl}</span>`,
    BIND_TEXT[i.bind] ? esc(BIND_TEXT[i.bind]) : '',
    esc(i.kind),
    ...String(i.stats).split(' · ').filter(Boolean).map(s => `<span class="q2">${esc(s)}</span>`),
    i.req ? `Requires Level ${i.req}` : '',
    i.isNew ? '<span class="q2">✦ New in WoW Forever</span>' : ''
  ].filter(Boolean);
  return `<table><tr><td>${lines.join('<br>')}</td></tr></table>`;
}

function buildGuide(g, tooltips) {
  const inst = W.WOW_FOREVER_INSTANCES_DATA.find(d => d.slug === (g.instanceSlug || g.slug));
  if (!inst) throw new Error(`No ForeverDB instance for ${g.slug}`);
  const instBossNames = new Set(inst.bosses.map(b => b.name));
  const routeBosses = g.route.flatMap(w => w.bosses);
  for (const b of routeBosses) {
    if (!instBossNames.has(b)) throw new Error(`${g.slug}: boss "${b}" is not in ForeverDB`);
    if (!g.tactics[b]) throw new Error(`${g.slug}: no tactics for "${b}"`);
  }
  if (!g.instanceSlug) {
    const missing = [...instBossNames].filter(b => !routeBosses.includes(b));
    if (missing.length) throw new Error(`${g.slug}: route is missing ForeverDB bosses ${missing.join(', ')}`);
  }

  const [lvMin, lvMax] = LEVELS[g.slug] || [inst.minLevel, inst.maxLevel];
  const loot = collectLoot(inst);
  const bis = bisPicks(g.slug, routeBosses);
  const isSplit = Boolean(g.instanceSlug);
  const quests = (isSplit && g.slug === 'upper-blackrock-spire') ? [] : (inst.quests || [])
    .map(id => CACHE.quests[id]).filter(Boolean)
    .sort((a, b) => (a.level ?? 99) - (b.level ?? 99) || a.name.localeCompare(b.name));
  const newCount = [...new Set(routeBosses.flatMap(b => [...(loot.get(b) || [])]))]
    .map(itemInfo).filter(i => i && i.isNew).length;

  const out = [];
  out.push(`### Overview: ${g.title.split(':')[0]}`, '', g.intro, '');
  out.push('| Parameter | Dungeon Profile |', '|---|---|');
  out.push(`| **Level Range** | ${lvMin}–${lvMax} |`);
  out.push(`| **Zone & Entrance** | ${cell(g.zone)} (\`${cell(g.coords)}\`) |`);
  out.push(`| **Faction** | Alliance & Horde |`);
  out.push(`| **Access** | ${cell(g.access)} |`);
  out.push(`| **Boss Encounters** | ${routeBosses.length} |`);
  if (quests.length) out.push(`| **Dungeon Quests** | ${quests.length} |`);
  if (bis.length) out.push(`| **Level 60 BiS Picks** | ${bis.length} items across ${new Set(bis.flatMap(b => [...b.specs])).size} specs |`);
  out.push('');
  out.push('💡 Boss tactics below follow the Classic encounters. As of November 22, 2026 Blizzard has not published encounter changes for this dungeon; loot, quests and BiS data come from live ForeverDB and Wowhead Forever data.', '');
  out.push('---', '', '### Getting There', '');
  g.travel.forEach(t => out.push(`- ${t}`));
  out.push('', `🔒 ${g.access}`, '');

  if (g.forever.length) {
    out.push('---', '', '### Forever Changes & Hotfixes', '');
    g.forever.forEach(f => out.push(`- **${f.date} (${f.source}):** ${f.text}`));
    out.push('');
  }

  out.push('---', '', '### Boss Route & Tactics', '');
  for (const wing of g.route) {
    out.push(`#### ${wing.wing}`, '');
    wing.bosses.forEach((b, i) => {
      out.push(`${i + 1}. **${b}:** ${g.tactics[b]}`);
      const line = lootLine(loot.get(b) || [], tooltips);
      if (line) out.push(`   - 📦 Notable drops: ${line}`);
    });
    out.push('');
  }
  const trash = loot.get('') || new Set();
  if (trash.size && g.slug !== 'upper-blackrock-spire') {
    const line = lootLine(trash, tooltips, 8);
    // Leading "📦 " renders as a guide callout; a leading "**" would be parsed as a list bullet.
    if (line) out.push(`📦 **Trash & world drops${isSplit ? ' (all of Blackrock Spire)' : ''}:** ${line}`, '');
  }
  if (newCount) out.push(`✦ marks items that are new in WoW Forever (${newCount} in this dungeon's boss loot).`, '');

  if (bis.length) {
    out.push('---', '', '### Level 60 Pre-Raid BiS From This Dungeon', '');
    out.push('| Item | Boss | Picked By |', '|---|---|---|');
    for (const p of bis) {
      const info = itemInfo(p.id);
      if (info) tooltips[info.id] = info;
      const specs = [...p.specs];
      const shown = specs.length > 4 ? `${specs.slice(0, 4).join(', ')} +${specs.length - 4} more` : specs.join(', ');
      // bis-60-data.js has some "Item 12345" placeholder names; prefer the item database name.
      const name = info?.name || p.name;
      out.push(`| [${cell(name)}](${itemUrl(p.id)}) | ${cell(p.boss || 'Various')} | ${cell(shown)} |`);
    }
    out.push('', '🎯 Open the BiS tab (Level 60 Pre-Raid) to see these items in each spec\'s full list.', '');
  }

  if (quests.length) {
    out.push('---', '', '### Dungeon Quests', '');
    out.push('| Quest | Level | Objective |', '|---|---|---|');
    quests.forEach(q => out.push(`| [${cell(q.name)}](${questUrl(q.id)}) | ${q.level ?? '–'} | ${cell(q.objective) || '–'} |`));
    out.push('');
  } else if (g.slug === 'upper-blackrock-spire') {
    out.push('---', '', '### Dungeon Quests', '', 'UBRS quests are listed with Lower Blackrock Spire: ForeverDB records Blackrock Spire as one instance.', '');
  }

  out.push('---', '', '### Tips', '');
  g.tips.forEach(t => out.push(`- ${t}`));
  out.push('', `📦 Data: ForeverDB live instance data (build 1.60.1.70959), WoW: Forever item database, Level 60 BiS lists and Wowhead Forever quest data, compiled ${BUILD_DATE}.`);

  const summaryBits = [`Levels ${lvMin}–${lvMax} in ${g.zone.split(' (')[0]}`, `${routeBosses.length} bosses`];
  if (quests.length) summaryBits.push(`${quests.length} quests`);
  if (bis.length) summaryBits.push(`${bis.length} Level 60 BiS picks`);
  return {
    id: `guide-dungeon-${g.slug}`,
    title: g.title,
    category: 'Dungeons & Raids',
    source: 'ForeverDB · Wowhead Forever · Blizzard hotfix notes',
    icon: `https://render.worldofwarcraft.com/us/icons/56/${g.icon}.jpg`,
    summary: `${summaryBits.join(', ')}. Entrance, access, boss route with tactics and notable drops, and Forever hotfix notes.`,
    dungeonMeta: {
      slug: g.slug, levelMin: lvMin, levelMax: lvMax, optimalLevel: Math.max(lvMin, lvMax - 2),
      faction: 'Both', zone: g.zone, coords: g.coords, bossCount: routeBosses.length, type: 'classic'
    },
    content: out.join('\n')
  };
}

const tooltips = {};
const guides = GUIDES.map(g => buildGuide(g, tooltips));
const tooltipData = Object.fromEntries(Object.values(tooltips).map(i => [String(i.id), {
  id: i.id, name: i.name, quality: `q${i.q}`, qualityNum: i.q, icon: i.icon, iLvl: i.ilvl,
  slot: i.kind, statSummary: i.stats, htmlTooltip: buildTooltip(i)
}]));

const js = `/**
 * World of Warcraft: Forever - Classic Dungeon Guides (Levels 29–60)
 * GENERATED by scripts/classic-dungeon-guides/build-guides.mjs on ${BUILD_DATE}. Do not edit by hand:
 * change scripts/classic-dungeon-guides/curated.mjs and re-run the build.
 * ${guides.length} guides, ${Object.keys(tooltipData).length} item tooltips.
 */
(function () {
  'use strict';
  if (typeof window === 'undefined') return;
  const GUIDES = ${JSON.stringify(guides, null, 2)};
  const TOOLTIPS = ${JSON.stringify(tooltipData)};

  // Keep any hand-curated tooltip that already exists for an item.
  window.WOW_DUNGEON_LOOT_TOOLTIPS = Object.assign({}, TOOLTIPS, window.WOW_DUNGEON_LOOT_TOOLTIPS || {});

  const ids = new Set(GUIDES.map(g => g.id));
  window.WOW_DUNGEON_GUIDES = (window.WOW_DUNGEON_GUIDES || []).filter(g => !ids.has(g.id)).concat(GUIDES);
  if (window.WOW_TOOLS_DATA) {
    window.WOW_TOOLS_DATA.guides = (window.WOW_TOOLS_DATA.guides || []).filter(g => !ids.has(g.id)).concat(GUIDES);
  }
})();
`;
fs.writeFileSync(OUT, js, 'utf8');
console.log(`wrote ${path.relative(ROOT, OUT)}: ${guides.length} guides, ${Object.keys(tooltipData).length} tooltips, ${(js.length / 1024).toFixed(0)} KB`);
for (const g of guides) console.log(`  ${g.id.padEnd(42)} ${g.content.length} chars · ${g.summary.split('.')[0]}`);
