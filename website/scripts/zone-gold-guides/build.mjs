/**
 * Builds js/data/zone-gold-guides-data.js: guides for The Riverglades, Shen'dralas, Mount Hyjal
 * and a level 60 gold guide.
 *
 * Generated from the site's data:
 *   js/data/forever-quests-data.js     new Forever quests (zone, level, giver, coordinates)
 *   js/data/world-rares-data.js        rares by zone
 *   js/data/reputation-data.js         factions and quartermasters
 *   data/scraped/mount-hyjal-quests-cache.json   36 Mount Hyjal quests verified on Wowhead Forever
 *                                                (ForeverDB's quest export has no Hyjal quests)
 *   js/data/market-data.js + item-database-data.js   Auction House medians by item category
 * Hand-written text below is limited to facts from Blizzard's zone announcements, the site's
 * hotfix log and community zone guides, each labelled where it is not confirmed by Blizzard.
 *
 * Usage: node scripts/zone-gold-guides/build.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const OUT = path.join(ROOT, 'js', 'data', 'zone-gold-guides-data.js');
const BUILD_DATE = 'November 22, 2026';

const ctx = { window: {} };
vm.createContext(ctx);
for (const f of ['forever-quests-data.js', 'world-rares-data.js', 'reputation-data.js', 'item-database-data.js', 'market-data.js']) {
  vm.runInContext(fs.readFileSync(path.join(ROOT, 'js', 'data', f), 'utf8'), ctx);
}
const W = ctx.window;
const QUESTS = W.WOW_FOREVER_NEW_QUESTS_DATA;
const RARES = Array.isArray(W.WOW_WORLD_RARES_DATA) ? W.WOW_WORLD_RARES_DATA : W.WOW_WORLD_RARES_DATA.rares;
const HYJAL = JSON.parse(fs.readFileSync(path.join(ROOT, 'data', 'scraped', 'mount-hyjal-quests-cache.json'), 'utf8'));

const cell = (s) => String(s ?? '').replace(/\|/g, '/').replace(/\s+/g, ' ').trim();
const qlink = (id, name) => `[${name}](https://www.wowhead.com/forever/quest=${id})`;
const g = (id, label) => `[${label}](#guides/${id})`;
const gold = (copper) => {
  const gg = Math.floor(copper / 10000), s = Math.floor((copper % 10000) / 100);
  return gg ? `${gg}g${s ? ` ${s}s` : ''}` : `${s}s`;
};

/** Groups quests into hubs: givers within `radius` map units of each other share a hub. */
function questHubs(zone, radius = 6) {
  const qs = QUESTS.filter(q => q.zone === zone);
  const givers = new Map();
  const unplaced = [];
  for (const q of qs) {
    const [x, y] = q.coords.split(',').map(Number);
    // No giver position recorded (item-started or follow-up quests): list them separately.
    if ((!x && !y) || q.giver === 'Item / World Object Starter' || q.giver === 'Unknown NPC') { unplaced.push(q); continue; }
    const k = q.giver;
    if (!givers.has(k)) givers.set(k, { giver: k, x, y, quests: [] });
    givers.get(k).quests.push(q);
  }
  const hubs = [];
  for (const gv of [...givers.values()].sort((a, b) => b.quests.length - a.quests.length)) {
    const hub = hubs.find(h => Math.hypot(h.x - gv.x, h.y - gv.y) <= radius);
    if (hub) hub.givers.push(gv); else hubs.push({ x: gv.x, y: gv.y, givers: [gv] });
  }
  for (const h of hubs) {
    h.quests = h.givers.flatMap(x => x.quests);
    h.min = Math.min(...h.quests.map(q => q.level));
    h.max = Math.max(...h.quests.map(q => q.level));
  }
  return { total: qs.length, unplaced, hubs: hubs.sort((a, b) => a.min - b.min || b.quests.length - a.quests.length) };
}

function hubSection({ total, hubs, unplaced }) {
  const out = [`This zone has **${total} new Forever quests** in ForeverDB's data, from ${hubs.reduce((n, h) => n + h.givers.length, 0)} quest givers. They are grouped below by where the givers stand (map coordinates), lowest level first.`, ''];
  out.push('| Hub (around) | Levels | Quests | Main quest givers |', '|---|---|---|---|');
  for (const h of hubs.filter(x => x.quests.length >= 2)) {
    const givers = h.givers.slice(0, 3).map(x => `${x.giver} (${x.quests.length})`).join(', ');
    out.push(`| \`${h.x.toFixed(1)}, ${h.y.toFixed(1)}\` | ${h.min}–${h.max} | ${h.quests.length} | ${cell(givers)} |`);
  }
  const singles = hubs.filter(x => x.quests.length < 2).length;
  if (singles) out.push('', `Plus ${singles} single-quest givers scattered around the zone.`);
  if (unplaced.length) {
    const sorted = [...unplaced].sort((a, b) => a.level - b.level);
    out.push('', `📦 ${unplaced.length} more quests have no recorded giver position (usually started from an item or as a follow-up): ${sorted.map(q => `${qlink(q.id, q.title)} (${q.level})`).join(', ')}.`);
  }
  out.push('');
  const starters = [...hubs].sort((a, b) => a.min - b.min)[0];
  out.push(`💡 Start at the hub around \`${starters.x.toFixed(1)}, ${starters.y.toFixed(1)}\` (from level ${starters.min}), then follow the hubs down the table as you level.`, '');
  out.push('#### First quests at each of the three biggest hubs', '');
  for (const h of [...hubs].sort((a, b) => b.quests.length - a.quests.length).slice(0, 3)) {
    const first = [...h.quests].sort((a, b) => a.level - b.level).slice(0, 4);
    out.push(`- **Around \`${h.x.toFixed(1)}, ${h.y.toFixed(1)}\`:** ${first.map(q => `${qlink(q.id, q.title)} (${q.level})`).join(', ')}`);
  }
  out.push('');
  return out;
}

function raresSection(zone) {
  const rs = RARES.filter(r => r.zone === zone);
  if (!rs.length) return [];
  const out = ['### Rares', '', '| Rare | Level | Location |', '|---|---|---|'];
  for (const r of rs.sort((a, b) => a.levelMin - b.levelMin)) {
    const s = r.spawns && r.spawns[0];
    out.push(`| ${cell(r.name)} | ${r.levelText} | ${s ? `\`${s.x}, ${s.y}\`` : '–'} |`);
  }
  out.push('', 'See the World Atlas tab → Rares for respawn timers and all spawn points.', '');
  return out;
}

// ---------------------------------------------------------------------------------------------
// The Riverglades
// ---------------------------------------------------------------------------------------------
function riverglades() {
  const data = questHubs('Riverglades');
  const out = [];
  out.push('### Overview: The Riverglades', '');
  out.push('A new mid-level zone on the east side of the Eastern Kingdoms, roughly the size of Stranglethorn Vale. Blizzard describes a frontier of rivers, grasslands and trade routes, with gnoll camps, ogres, the Powderfuse goblins, the Twilight\'s Hammer and the Brotherhood of the Horse. Both factions quest here.', '');
  out.push('| Parameter | Zone Profile |', '|---|---|');
  out.push('| **Levels** | Mid-30s to mid-40s (Blizzard); quests in the data start at 36 |');
  out.push(`| **Quests** | ${data.total} new quests in ForeverDB's data (Blizzard says "more than 150") |`);
  out.push('| **Neighbors** | Burning Steppes, Redridge Mountains, Swamp of Sorrows, Badlands |');
  out.push('| **Getting there** | Steamwheedle Cartel sea route from Tanaris to **Powderfuse Port** |');
  out.push(`| **Dungeon** | ${g('guide-kroldok-stronghold', 'Krol\'dok Stronghold')} |`);
  out.push('| **Reputation** | Powderfuse (quartermaster in the Riverglades) |');
  out.push('');
  out.push('📦 Known places: Farholde Keep, Powderfuse Port, Terral\'s Watch, Windstead, Turner\'s Logging Camp, Twilight\'s Shroud and Krol\'dok Stronghold.', '');
  out.push('---', '', '### Quest Hubs', '', ...hubSection(data));
  out.push('---', '', ...raresSection('Riverglades'));
  out.push('⚠️ Mosh\'gra\'s rare loot was fixed in the Nov 19 hotfix, and the Nov 11 hotfix lowered damage from several Riverglades creatures.', '');
  out.push('---', '', '### Tips', '');
  out.push('- The Riverglades alone can carry you through most of your 30s and 40s: with this many quests you can skip weaker Classic zones.');
  out.push('- Pick up Krol\'dok Stronghold quests in the zone before you queue for the dungeon.');
  out.push(`- Next steps: ${g('guide-leveling-30-to-60', '30–60 Leveling Roadmap')} and ${g('guide-zone-shendralas', 'Shen\'dralas')}.`);
  out.push('', `📦 Data: ForeverDB quest export (giver positions), world rares and reputation data; zone description from Blizzard's BlizzCon 2026 panel recaps. Compiled ${BUILD_DATE}.`);
  return {
    id: 'guide-zone-riverglades', category: 'Leveling & Quests',
    title: 'The Riverglades Zone Guide: Quest Hubs, Rares & Krol\'dok (Levels 36–45)',
    source: 'ForeverDB quest data · Blizzard zone announcements · world rares data',
    icon: 'https://render.worldofwarcraft.com/us/icons/56/inv_misc_map_01.jpg',
    summary: `The Riverglades: ${data.total} new quests grouped into hubs with coordinates and level ranges, rares, how to get there via Powderfuse Port, and the Krol'dok Stronghold dungeon.`,
    content: out.join('\n')
  };
}

// ---------------------------------------------------------------------------------------------
// Shen'dralas
// ---------------------------------------------------------------------------------------------
function shendralas() {
  const data = questHubs("Shen'dralas");
  const out = [];
  out.push('### Overview: Shen\'dralas', '');
  out.push('A long-hidden region tied to the Shen\'dralar, Eldre\'Thalas (Dire Maul) and the centaur tribes of Desolace. Blizzard places it south of Desolace through the Valley of Bones (elsewhere described as between Mulgore and Desolace).', '');
  out.push('| Parameter | Zone Profile |', '|---|---|');
  out.push(`| **Levels** | Quests in the data run ${Math.min(...data.hubs.map(h => h.min))}–${Math.max(...data.hubs.map(h => h.max))}; Blizzard has not published a range |`);
  out.push(`| **Quests** | ${data.total} new quests in ForeverDB's data |`);
  out.push('| **Getting there** | South from Desolace through the Valley of Bones |');
  out.push(`| **Related** | ${g('guide-dungeon-dire-maul', 'Dire Maul')} (Eldre'Thalas) and the Desolace centaur questlines |`);
  out.push('');
  out.push('---', '', '### Quest Hubs', '', ...hubSection(data));
  out.push('---', '', '### Tips', '');
  out.push('- Desolace\'s centaur faction quests were updated for Forever too; they pair well with a Shen\'dralas trip.');
  out.push('- The story continues in Dire Maul at level 54–60, so keep Shen\'dralas quest items until you know where they lead.');
  out.push('', `📦 Data: ForeverDB quest export (giver positions); zone description from Blizzard's BlizzCon 2026 panel recaps. Compiled ${BUILD_DATE}.`);
  return {
    id: 'guide-zone-shendralas', category: 'Leveling & Quests',
    title: 'Shen\'dralas Zone Guide: Quest Hubs & the Valley of Bones (Levels 38–49)',
    source: 'ForeverDB quest data · Blizzard zone announcements',
    icon: 'https://render.worldofwarcraft.com/us/icons/56/inv_misc_book_09.jpg',
    summary: `Shen'dralas: ${data.total} new quests grouped into hubs with coordinates and level ranges, how to get there through the Valley of Bones, and its ties to Dire Maul.`,
    content: out.join('\n')
  };
}

// ---------------------------------------------------------------------------------------------
// Mount Hyjal
// ---------------------------------------------------------------------------------------------
// Faction and level per quest from Bind on Forever's zone listing; names and objectives verified
// on Wowhead Forever (data/scraped/mount-hyjal-quests-cache.json).
const HYJAL_META = {
  92015: ['A', 56, 'Johun "Punchy" Dillas'], 92014: ['A', 57, 'Johun "Punchy" Dillas'], 96992: ['A', 57, 'Johun "Punchy" Dillas'],
  96529: ['A', 59, 'Johun "Punchy" Dillas'], 92593: ['A', 59, 'Johun "Punchy" Dillas'], 96494: ['A', 59, 'Johun "Punchy" Dillas'],
  92702: ['A', 56, 'Fenwick Togglespring'], 92064: ['A', 56, 'Fenwick Togglespring'], 96559: ['A', 57, 'Fenwick Togglespring'],
  95218: ['A', 56, 'Daythor Brellan'], 96077: ['A', 58, 'Daythor Brellan'], 93383: ['A', 57, 'Personal Survival Pack'],
  95027: ['A', 57, 'Hnaz Blunderflame'], 90702: ['A', 58, 'Unmarked Grave'], 91881: ['A', 57, 'Curious Crow'],
  92449: ['A', 58, 'Sefira Everbright'], 92591: ['A', 59, 'Sefira Everbright'], 91688: ['A', 59, 'Sefira Everbright'],
  96676: ['A', 59, 'Master Mathias Shaw'],
  92609: ['H', 57, 'Zet\'gan'], 95026: ['H', 58, 'Zet\'gan'], 96999: ['H', 58, 'Zet\'gan'], 92592: ['H', 59, 'Zet\'gan'],
  95248: ['H', 59, 'Zet\'gan'], 92446: ['H', 60, 'Zet\'gan'], 97000: ['H', 57, 'Abigail Sawyer'], 96616: ['H', 57, 'Ortak Lomgok'],
  97119: ['H', 57, 'Ortak Lomgok'], 97001: ['H', 57, 'Abigail Sawyer'], 97007: ['H', 57, 'Abigail Sawyer'], 96998: ['H', 58, '–'],
  97006: ['H', 60, '–'], 94782: ['H', 57, 'Curious Crow'], 91794: ['H', 59, 'Kal\'tinzan'],
  92101: ['Both', 58, 'Veteran of the Third War'], 93510: ['Both', 58, 'Veteran of the Third War']
};

function mountHyjal() {
  const verified = Object.values(HYJAL).filter(Boolean);
  const rows = verified.map(q => ({ ...q, faction: HYJAL_META[q.id]?.[0] || '–', level: HYJAL_META[q.id]?.[1] || q.level, giver: HYJAL_META[q.id]?.[2] || '–' }))
    .sort((a, b) => a.level - b.level || a.faction.localeCompare(b.faction) || a.name.localeCompare(b.name));
  const out = [];
  out.push('### Overview: Mount Hyjal', '');
  out.push('The endgame leveling zone of WoW Forever: the night elves\' sacred mountain, recovering after Archimonde\'s defeat. Blizzard describes emerging factions and a land to help rebuild; the zone also holds the entrances to the **Hyjal Summit** (20-player) and **Barrow Deeps** (10-player) raids opening on December 9.', '');
  out.push('| Parameter | Zone Profile |', '|---|---|');
  out.push('| **Levels** | 55–60 (Group Finder); quests run 56–60, so arrive around 57 |');
  out.push('| **Getting there** | Winterspring: fly to Everlook, ride south into Darkwhisper Gorge, and follow the road west into the mountain. No attunement reported |');
  out.push('| **Flight points** | Tainted Foothills (about `55.1, 82.5`, near the entrance) and Summit of Eternity (about `68.6, 44.1`), both factions |');
  out.push('| **Faction hubs** | Elderwild in the west: Alliance outpost (Sefira Everbright, about `15.6, 54.7`) and Horde outpost (Zet\'gan, about `13.9, 54.9`) |');
  out.push('| **Raids** | Hyjal Summit (near the World Tree) and Barrow Deeps (one of several entrances) |');
  out.push('');
  out.push('⚠️ **The road in is dangerous.** Community guides report level 57–58 Hederine slayers and initiates through Darkwhisper Gorge, Lady Hederine (61) on its east side, and elite demons inside the zone. Travel as a group at 55–56.', '');
  out.push('---', '', '### Places', '');
  out.push('- **Tainted Foothills:** first stop after the gorge, with the ancients\' outpost and flight master.');
  out.push('- **Shrine of Aviana** (about `54.3, 63.8`) and **Malorne\'s Retreat** (about `25.3, 76.0`): druid and wild-god questlines.');
  out.push('- **Barkskin Burrow** (about `21.0, 80.1`): furbolg quests and the Barkskin Burrow reputation.');
  out.push('- **Elderwild:** the faction outposts and their graveyard; **Mourning\'s Rest** nearby has hard-hitting Scourge.');
  out.push('- **Cradle of Tranquility**, **Felblood Scar** and **Dae\'gun:** demon and corruption areas with elites.');
  out.push('- **Summit of Eternity:** the druids\' camp at the top, near the World Tree.', '');
  out.push('📦 Coordinates are community-reported and may be a little off.', '');
  out.push('---', '', '### Quests With Verified IDs', '');
  out.push(`Community sites list about 100 quests in the zone; ForeverDB's export does not include them yet. These ${rows.length} have been checked against Wowhead Forever:`, '');
  out.push('| Quest | Level | Side | Given by | Objective |', '|---|---|---|---|---|');
  for (const q of rows) out.push(`| ${qlink(q.id, cell(q.name))} | ${q.level} | ${q.faction} | ${cell(q.giver)} | ${cell(q.objective)} |`);
  out.push('', '💡 Several quests send you out of the zone (Stormwind, Undercity, Sen\'jin Village, Elwynn Forest); turn them in on your next city visit.', '');
  out.push('---', '', '### Reputations', '');
  out.push('| Faction | Start | Rewards reported |', '|---|---|---|');
  out.push('| **Guardians of Hyjal** | Neutral | Rousing Seed Pod at Revered (wear two Artisan\'s tier items), tabard at Exalted |');
  out.push('| **Barkskin Burrow** | Hostile | Not listed yet; furbolg quests around Barkskin Burrow |');
  out.push('| **The Watchers** | Neutral | Signet rings from Friendly to Exalted; the top ranks are epic and need level 60 |');
  out.push('', '📦 Reputation rewards come from community data-mining and are not confirmed by Blizzard.', '');
  out.push('---', '', '### Next Steps', '');
  out.push(`- ${g('guide-level-60-checklist', 'Level 60 Checklist')} and ${g('guide-tier1-raids-attunements', 'Tier 1 Raids guide')}.`);
  out.push(`- Gold for riding: ${g('guide-gold-making-60', 'Gold Guide')}.`);
  out.push('', `📦 Data: quest names and objectives verified on Wowhead Forever; levels, sides and places from community zone guides (Bind on Forever, ByteTavern, Polestar); zone description from Blizzard. Compiled ${BUILD_DATE}.`);
  return {
    id: 'guide-zone-mount-hyjal', category: 'Leveling & Quests',
    title: 'Mount Hyjal Zone Guide: Getting In, Hubs, Quests & Reputations (Levels 55–60)',
    source: 'Blizzard zone announcements · Wowhead Forever quest data · community zone guides',
    icon: 'https://render.worldofwarcraft.com/us/icons/56/inv_misc_herb_whipvine.jpg',
    summary: `Mount Hyjal: the safe way in from Winterspring, flight points, Alliance and Horde outposts, ${rows.length} verified quests, reputations and the raid entrances.`,
    content: out.join('\n')
  };
}

// ---------------------------------------------------------------------------------------------
// Gold guide
// ---------------------------------------------------------------------------------------------
function goldGuide() {
  const M = W.WOW_MARKET_SCAN_DATA;
  const DB = W.WOW_ITEM_DATABASE;
  const scanDate = new Date(M.lastScanTime * 1000).toISOString().slice(0, 10);
  const realm = M.activeRealm.replace('_', ' ');
  const byCat = {};
  for (const r of DB.rows) {
    const p = M.prices[String(r[0])];
    if (!p || !p.med14 || p.qty < 10) continue; // skip thin listings
    const cat = DB.meta.cats[r[5]];
    (byCat[cat] = byCat[cat] || []).push({ id: r[0], name: r[1], med: p.med14, qty: p.qty });
  }
  const table = (cats, n = 6) => {
    const items = cats.flatMap(c => byCat[c] || []).sort((a, b) => b.med - a.med).slice(0, n);
    return ['| Item | 14-day median | Listed |', '|---|---|---|',
      ...items.map(i => `| [${cell(i.name)}](https://www.wowhead.com/forever/item=${i.id}) | ${gold(i.med)} | ${i.qty} |`)];
  };
  const out = [];
  out.push('### Overview: Gold at Level 60', '');
  out.push('Level 60 is where gold matters most: Journeyman Riding costs about **1,000 gold** (plus about 200 for a swift mount), and raids open on December 9 with a week of flasks, elixirs and repairs to pay for.', '');
  out.push(`📦 Prices below are 14-day medians from one Auction House scan (${realm}, ${scanDate}), with at least 10 listed. Your realm will differ; use them to see what sells, not as exact prices.`, '');
  out.push('---', '', '### 1. Quests Still Pay', '');
  out.push('- At level 60, finished quests **no longer turn XP into gold**. Since the Nov 10 hotfix, most **level 48+ quests reward gold** directly instead.');
  out.push('- Save your level 55–60 quests (and dungeon quests) for when you hit 60: they pay gold and often gear.');
  out.push(`- ${g('guide-zone-mount-hyjal', 'Mount Hyjal')} and the classic level 55–60 zones have the most quests left at 60.`, '');
  out.push('---', '', '### 2. Gathering: What Sells', '');
  out.push('#### Herbs', '', ...table(['trade:herb']), '');
  out.push('#### Leather, cloth & metal', '', ...table(['trade:leather', 'trade:cloth', 'trade:metal'], 8), '');
  out.push('#### Elemental & enchanting materials', '', ...table(['trade:elemental', 'trade:enchanting'], 8), '');
  out.push('💡 Disenchanting the green and blue items from your level 55–60 dungeon runs is often worth more than vendoring them.', '');
  out.push('---', '', '### 3. Crafting for Raid Week', '');
  out.push('Demand spikes before December 9. These consumables already sell well:', '', ...table(['consumable:potion', 'consumable:food', 'consumable:scroll'], 8), '');
  out.push('---', '', '### 4. Vendor Flips', '');
  const flips = (M.vendorFlips || []).filter(f => f.qty >= 3).slice(0, 5);
  out.push('Some items on the Auction House sell for less than a vendor pays. Buy them and sell them to any vendor:', '');
  out.push('| Item | AH buyout | Vendor pays | Profit each |', '|---|---|---|---|');
  for (const f of flips) out.push(`| ${cell(f.name)} | ${gold(f.buyout)} | ${gold(f.vendor)} | ${gold(f.profit)} |`);
  out.push('', '⚠️ Flips disappear fast once others notice. Check the vendor price in the item tooltip before buying in bulk.', '');
  out.push('---', '', '### 5. Spending Less', '');
  out.push('- Reach **Honored** with your home faction before training riding for a 10% discount.');
  out.push('- Dual Specialization costs 50 gold; buy it once you know you need a second spec.');
  out.push('- The **Bartering** Legacy perk lowers vendor prices.', '');
  out.push('---', '', '### Things to Avoid', '');
  out.push('- **Buying gold** breaks the terms of service and gets accounts banned. WoW: Forever has no WoW Token.');
  out.push('- **Lockbox tricks:** the Nov 22 hotfix closed a lockbox "peek" exploit; containers now loot straight into your bags.', '');
  out.push(`📦 Data: ForeverMarket Auction House scan (${realm}, ${scanDate}) joined with the site's item database; quest gold rule from Blizzard's Nov 10 hotfix notes. Compiled ${BUILD_DATE}.`);
  return {
    id: 'guide-gold-making-60', category: 'Economy & Professions',
    title: 'Gold Guide for Level 60: Quests, Gathering, Crafting & Vendor Flips',
    source: 'ForeverMarket Auction House scan · item database · Blizzard hotfix notes',
    icon: 'https://render.worldofwarcraft.com/us/icons/56/inv_misc_coin_01.jpg',
    summary: `How to afford riding and raid consumables at 60: quest gold after the Nov 10 hotfix, the herbs, materials and consumables that sell best (Auction House medians, ${scanDate}), vendor flips and ways to spend less.`,
    content: out.join('\n')
  };
}

const guides = [riverglades(), shendralas(), mountHyjal(), goldGuide()];
const js = `/**
 * World of Warcraft: Forever - Zone guides (The Riverglades, Shen'dralas, Mount Hyjal) and the gold guide
 * GENERATED by scripts/zone-gold-guides/build.mjs on ${BUILD_DATE}. Do not edit by hand.
 */
(function () {
  'use strict';
  if (typeof window === 'undefined') return;
  const GUIDES = ${JSON.stringify(guides, null, 2)};
  const ids = new Set(GUIDES.map(g => g.id));
  window.WOW_ZONE_GOLD_GUIDES = GUIDES;
  if (window.WOW_TOOLS_DATA) {
    window.WOW_TOOLS_DATA.guides = (window.WOW_TOOLS_DATA.guides || []).filter(g => !ids.has(g.id)).concat(GUIDES);
  }
})();
`;
fs.writeFileSync(OUT, js, 'utf8');
console.log(`wrote ${path.relative(ROOT, OUT)}: ${guides.length} guides, ${(js.length / 1024).toFixed(0)} KB`);
for (const gd of guides) console.log(`  ${gd.id.padEnd(26)} ${gd.content.length} chars`);
