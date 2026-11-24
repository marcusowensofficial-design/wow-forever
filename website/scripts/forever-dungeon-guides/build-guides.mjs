/**
 * Builds js/data/forever-dungeon-guides-data.js: The Drowned City, Krol'dok Stronghold, Alcaz Prison,
 * Blackmaw Hold and Shaper's Terrace. ForeverDB has no instance export for these five, so loot ids are
 * curated and joined to the item database, and checked against ForeverDungeonJournal's loot.
 *
 * Usage: node scripts/forever-dungeon-guides/build-guides.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';
import { GUIDES } from './curated.mjs';
import { readLuaTable } from './lua-table.mjs';
import { cell, itemUrl, questUrl, createItemInfo, journalSlots, guideBundle } from '../lib/guide-items.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const OUT = path.join(ROOT, 'js', 'data', 'forever-dungeon-guides-data.js');
const LUA = path.join(ROOT, '..', 'addons', 'ForeverDungeonJournal', 'Data', 'Dungeons.lua');
const BUILD_DATE = 'November 24, 2026';

const ctx = { window: {} };
vm.createContext(ctx);
vm.runInContext(fs.readFileSync(path.join(ROOT, 'js', 'data', 'item-database-data.js'), 'utf8'), ctx);
const lua = fs.readFileSync(LUA, 'utf8');
const itemInfo = createItemInfo(ctx.window.WOW_ITEM_DATABASE, journalSlots(lua));
const tooltips = {};

function item(id, where) {
  const i = itemInfo(id);
  if (!i) throw new Error(`${where}: item ${id} is not in the item database`);
  // "+-10 Spi" in the export means a penalty.
  i.stats = i.stats.replace(/\+-/g, '-');
  tooltips[i.id] = i;
  return i;
}
const link = (i) => `[${cell(i.name)}](${itemUrl(i.id)})`;
const SIDES = { A: 'Alliance', H: 'Horde', B: 'Both' };

function lootTable(g) {
  const out = ['| Item | Slot | iLvl | Stats | Drops From |', '|---|---|---|---|---|'];
  const row = (id, from) => {
    const i = item(id, g.id);
    out.push(`| ${link(i)} | ${cell(i.kind)} | ${i.ilvl > 1 ? i.ilvl : '–'} | ${cell(i.stats) || '–'} | ${cell(from)} |`);
  };
  for (const b of g.route) for (const id of b.loot) row(id, b.name.replace(/^\d+\. /, '').replace(/ \((final|last|optional)\)/, '').replace(/^Rares: .*/, 'Rare spawns'));
  for (const id of g.trashLoot) row(id, 'Trash');
  return out;
}

function build(g) {
  const bosses = g.route.filter(b => !/^Rares|^Kroog/.test(b.name)).length;
  const o = [`### Overview: ${g.name}`, '', g.intro, '', '| Parameter | Dungeon Profile |', '|---|---|'];
  o.push(`| **Level Range** | ${g.levels[0]}–${g.levels[1]} (best around ${g.optimal}) |`);
  o.push(`| **Zone & Entrance** | ${g.zone} (\`${g.coords}\`) |`);
  o.push('| **Faction** | Alliance & Horde |', `| **Boss Encounters** | ${bosses} |`);
  o.push(`| **Dungeon Quests** | ${['A', 'H', 'B'].map(s => [s, g.quests.filter(q => q[2] === s).length]).filter(x => x[1]).map(([s, n]) => `${n} ${SIDES[s] === 'Both' ? 'for both factions' : SIDES[s]}`).join(', ')} |`, '');
  if (g.warning) o.push(`⚠️ ${g.warning}`, '');
  o.push('---', '', '### Getting There', '', ...g.travel.map(t => `- ${t}`), '', `🔒 ${g.access}`, '');
  o.push('---', '', '### Every Quest', '');
  for (const s of ['B', 'A', 'H']) {
    const qs = g.quests.filter(q => q[2] === s);
    if (!qs.length) continue;
    o.push(`#### ${s === 'B' ? 'Both Factions' : SIDES[s]}`, '', '| Quest | Min | Giver | Objective | Unlocked By | Rewards |', '|---|---|---|---|---|---|');
    for (const [id, name, , min, giver, goal, pre, rewards] of qs) {
      o.push(`| [${cell(name)}](${questUrl(id)}) | ${min} | ${cell(giver)} | ${cell(goal)} | ${cell(pre)} | ${rewards.map(r => link(item(r, g.id))).join(', ') || '–'} |`);
    }
    o.push('');
  }
  o.push(`💡 ${g.questNote}`, '');
  if (g.extra) o.push('---', '', `### ${g.extra.heading}`, '', ...g.extra.lines, '');
  o.push('---', '', '### Dangerous Trash', '', ...g.trash.map(([n, t]) => `- **${n}:** ${t}`), '');
  o.push('---', '', '### Bosses', '');
  for (const b of g.route) {
    o.push(`#### ${b.name}`, '', b.text, '');
    for (const [k, label] of [['tank', 'Tank'], ['heal', 'Healer'], ['dps', 'Damage']]) if (b[k]) o.push(`- **${label}:** ${b[k]}`);
    o.push('');
  }
  o.push('---', '', '### Loot Table', '', ...lootTable(g), '');
  if (g.fixes.length) o.push('---', '', '### Hotfixes', '', ...g.fixes.map(([d, t]) => `- **${d}:** ${t}`), '');
  o.push('---', '', '### Tips', '', ...g.tips.map(t => `- ${t}`), '');
  o.push(`📦 Checked ${BUILD_DATE} against [Wowhead Forever](https://www.wowhead.com/forever/guides), [Warcraft Tavern](https://www.warcrafttavern.com/forever/guides/type/dungeons/), Blizzard hotfix notes and ForeverDungeonJournal quest data. Item levels and stats come from this site's item database. Drop lists are still being filled in by players.`);
  return {
    id: g.id, title: g.title, category: 'Dungeons & Raids',
    source: 'Wowhead Forever · Warcraft Tavern · ForeverDungeonJournal · Blizzard hotfix notes',
    icon: `https://render.worldofwarcraft.com/us/icons/56/${g.icon}.jpg`,
    summary: `Levels ${g.levels[0]}–${g.levels[1]} in ${g.zone.split(' (')[0]}: ${bosses} bosses with role tactics, all ${g.quests.length} quests with coordinates and a full loot table.`,
    dungeonMeta: { slug: g.slug, levelMin: g.levels[0], levelMax: g.levels[1], optimalLevel: g.optimal, faction: 'Both', zone: g.zone, coords: g.coords, bossCount: bosses, type: 'custom' },
    content: o.join('\n')
  };
}

const guides = GUIDES.map(build);

// Report items ForeverDungeonJournal knows about that a guide leaves out, so new finds are not missed.
for (const g of GUIDES) {
  const db = readLuaTable(lua, `FDJ.DB["${g.name}"] =`);
  const listed = new Set([...g.route.flatMap(b => b.loot), ...g.trashLoot]);
  const missing = (db?.bosses || []).flatMap(b => (b.loot || []).map(l => Array.isArray(l) ? l : l.list || []).map(l => l[0])).filter(id => id && !listed.has(id));
  if (missing.length) console.warn(`  ! ${g.id}: ForeverDungeonJournal also lists ${missing.map(id => `${id} ${itemInfo(id)?.name || ''}`).join(', ')}`);
}

const header = [
  'World of Warcraft: Forever - Dungeon Guides for the new level 35-60 dungeons',
  `GENERATED by scripts/forever-dungeon-guides/build-guides.mjs on ${BUILD_DATE}. Do not edit by hand:`,
  'change scripts/forever-dungeon-guides/curated.mjs and re-run the build.'
];
fs.writeFileSync(OUT, guideBundle({ header, globalName: 'WOW_FOREVER_DUNGEON_GUIDES', guides, tooltips, dungeon: true }), 'utf8');
for (const g of guides) console.log(`${g.id.padEnd(30)} ${g.content.length} chars · ${g.summary}`);
