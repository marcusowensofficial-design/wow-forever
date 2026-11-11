/**
 * WoW Forever — Weapon Paths Rebuild (weapons / wands / shields & off-hands)
 *
 * Regenerates every 1–60 weapon path from the raw Wowhead Forever catalogs
 * (data/scraped/wowhead_forever_{weapons,shields,offhands}.json) instead of
 * patching the previous hand-edited output. The raw catalog is treated as the
 * source of truth for item identity (id ↔ name), item level, required level,
 * weapon subclass, slot, faction side, class restriction and source.
 *
 * Rules enforced (each one fixes a defect found in the previous data):
 *  1. WoW Forever weapon skills per class (Paladins: axes + polearms; Druids:
 *     polearms; Rogues: one-handed axes; Hunters: no maces; Shamans: no swords;
 *     casters: no 2H maces/swords etc.). Shaman 2H axes/maces are baseline on
 *     Forever (the Enhancement talent was removed from the Forever trees).
 *  2. An item is only eligible once you can equip it: required level (max of
 *     the listview value and the tooltip "Requires Level N") plus the existing
 *     dungeon practical-level floors from build-progression.mjs.
 *  3. Items with no source AND no required level above iLvl 15 are datamined /
 *     unobtainable placeholders and are dropped (they previously showed up as
 *     "Level 1" top picks with an invented "Zone Drop / Rare Mob" source).
 *  4. Raid, PvP-rank and legendary items are not leveling weapons and are
 *     excluded (Atiesh, Grand Marshal's / High Warlord's, AQ40, ...).
 *  5. Track shape: the top pick must match the track (2H track → 2H weapon,
 *     tank track → 1H weapon, hunter → ranged, rogue → main-hand-capable 1H,
 *     casters → staff/1H, wand/shield/off-hand categories → that slot only).
 *     Alternatives still include other legal slots so the slot filter works.
 *  6. Wands live only in the Wands category, never in the Weapons path.
 *  7. Faction from the catalog `side` field, plus PvP rank names; Shaman never
 *     gets Alliance-only items. Paladin keeps full Horde coverage.
 *  8. Picks never regress: each bracket picks the best item usable by the end
 *     of that bracket, and consecutive brackets with the same pick are merged.
 *  9. Item names, icons and tooltips come from the cache only when the cache
 *     entry's name matches the catalog name for that id (the cache has ~20
 *     entries attached to the wrong id, e.g. 5196 "Smite's Mighty Hammer").
 *
 * Usage:  node scripts/rebuild-weapon-paths.mjs
 * Writes: data/scraped/forever_{weapons,wands,offhands}.json and patches the
 *         weapons/wands/offhands keys of js/data/class-progression-data.js
 *         (macros, spellbooks and milestones are preserved untouched).
 */

import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';
import {
  calculateLevelingStatWeight,
  detectDungeonFloor,
  SPECIFIC_ITEM_GATING
} from './build-progression.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const SCRAPED = path.join(ROOT, 'data', 'scraped');
const PROG_JS = path.join(ROOT, 'js', 'data', 'class-progression-data.js');
const CACHE_PATH = path.join(ROOT, 'scratch', 'forever_items_cache.json');

const readJson = p => JSON.parse(fs.readFileSync(p, 'utf8'));

// ---------------------------------------------------------------------------
// 1. Inputs
// ---------------------------------------------------------------------------
const rawCatalog = [
  ...readJson(path.join(SCRAPED, 'wowhead_forever_weapons.json')),
  ...readJson(path.join(SCRAPED, 'wowhead_forever_shields.json')),
  ...readJson(path.join(SCRAPED, 'wowhead_forever_offhands.json'))
];
const cache = readJson(CACHE_PATH);

function loadProgressionBundle() {
  const ctx = { window: {} };
  vm.createContext(ctx);
  vm.runInContext(fs.readFileSync(PROG_JS, 'utf8'), ctx);
  return ctx.window.WOW_PROGRESSION_DATA;
}
const bundle = loadProgressionBundle();
const OLD = { weapons: bundle.weapons, wands: bundle.wands, offhands: bundle.offhands };

// Previous data indexed by id (used only for icons / curated sources when the name matches)
const oldById = new Map();
for (const ds of Object.values(OLD)) {
  for (const cd of Object.values(ds)) {
    const lists = [cd.levels, cd.healingLevels, ...Object.values(cd.tracksData || {})].filter(Boolean);
    for (const l of lists) for (const st of l) for (const it of [st, ...(st.alts || []), ...(st.pool || [])]) {
      if (it.itemId && !oldById.has(it.itemId)) oldById.set(it.itemId, it);
    }
  }
}

// ---------------------------------------------------------------------------
// 2. Classification
// ---------------------------------------------------------------------------
const WEAPON_SUB = { 0: 'axe1', 1: 'axe2', 2: 'bow', 3: 'gun', 4: 'mace1', 5: 'mace2', 6: 'polearm', 7: 'sword1', 8: 'sword2', 10: 'staff', 13: 'fist', 14: 'misc', 15: 'dagger', 16: 'thrown', 18: 'crossbow', 19: 'wand', 20: 'fishing' };
const LABEL = {
  axe1: 'One-Handed Axe', axe2: 'Two-Handed Axe', mace1: 'One-Handed Mace', mace2: 'Two-Handed Mace',
  sword1: 'One-Handed Sword', sword2: 'Two-Handed Sword', polearm: 'Polearm', staff: 'Staff', dagger: 'Dagger',
  fist: 'Fist Weapon', bow: 'Bow', gun: 'Gun', crossbow: 'Crossbow', thrown: 'Thrown', wand: 'Wand',
  shield: 'Shield', holdable: 'Held In Off-hand'
};
const SLOT_TEXT = { 13: 'One-Hand', 17: 'Two-Hand', 21: 'Main Hand', 22: 'Off Hand', 14: 'Off Hand', 15: 'Ranged', 25: 'Thrown', 26: 'Ranged', 23: 'Held In Off-hand' };

function kindOf(r) {
  if (r.classs === 4) {
    if (r.subclass === 6 || r.slot === 14) return 'shield';
    if (r.slot === 23) return 'holdable';
    return null; // relics / armor
  }
  if (r.classs === 2) return WEAPON_SUB[r.subclass] || null;
  return null;
}

// WoW Forever weapon skills (trainer table): Classic plus Druid Polearms and Rogue One-Handed
// Axes; Shaman 2H axes/maces are baseline (the Enhancement talent was removed).
const PROF = {
  warrior: ['axe1', 'axe2', 'mace1', 'mace2', 'sword1', 'sword2', 'polearm', 'staff', 'dagger', 'fist', 'bow', 'gun', 'crossbow', 'thrown', 'shield'],
  paladin: ['axe1', 'axe2', 'mace1', 'mace2', 'sword1', 'sword2', 'polearm', 'shield', 'holdable'],
  hunter: ['axe1', 'axe2', 'sword1', 'sword2', 'polearm', 'staff', 'dagger', 'fist', 'bow', 'gun', 'crossbow', 'thrown'],
  rogue: ['dagger', 'fist', 'axe1', 'mace1', 'sword1', 'bow', 'gun', 'crossbow', 'thrown'],
  shaman: ['axe1', 'axe2', 'mace1', 'mace2', 'staff', 'dagger', 'fist', 'shield', 'holdable'],
  mage: ['dagger', 'sword1', 'staff', 'wand', 'holdable'],
  warlock: ['dagger', 'sword1', 'staff', 'wand', 'holdable'],
  priest: ['dagger', 'mace1', 'staff', 'wand', 'holdable'],
  druid: ['dagger', 'fist', 'mace1', 'mace2', 'polearm', 'staff', 'holdable']
};
const CLASS_MASK = { warrior: 1, paladin: 2, hunter: 4, rogue: 8, priest: 16, shaman: 64, mage: 128, warlock: 256, druid: 1024 };

const RAID_ZONES = new Set([2717, 2159, 2677, 1977, 3429, 3428, 3456]); // MC, Ony, BWL, ZG, AQ20, AQ40, Naxx
const PVP_ALLIANCE = /\b(Grand Marshal|Field Marshal|Marshal|Commander|Lieutenant Commander|Knight-Captain|Knight-Lieutenant|Sergeant Major|Master Sergeant)'s\b/;
const PVP_HORDE = /\b(High Warlord|Warlord|General|Lieutenant General|Champion|Centurion|Legionnaire|Blood Guard|Stone Guard|First Sergeant|Senior Sergeant)'s\b/;
const TEST_NAME = /\b(test|foo|dnt|monster|copy|deprecated|debug)\b|^\(DNT\)|^Monster -/i;
const PROFESSION_SKILL = { 164: 'Blacksmithing', 202: 'Engineering', 165: 'Leatherworking', 197: 'Tailoring', 333: 'Enchanting', 171: 'Alchemy', 773: 'Inscription' };

// ---------------------------------------------------------------------------
// 3. Canonical item records
// ---------------------------------------------------------------------------
const norm = s => String(s || '').toLowerCase().replace(/[^a-z0-9]/g, '');

// The catalog subclass/slot is authoritative; a few cached tooltips carry the wrong type line
// (e.g. Claymore shown as "1H Mace", Simple Dagger as "1H Sword"), so normalise it.
function withCanonicalTypeLine(lines, r, kind) {
  const slot = SLOT_TEXT[r.slot];
  if (!slot || kind === 'holdable') return lines;
  const typeLine = `${slot}\t${LABEL[kind]}`;
  const idx = lines.findIndex(l => /^(One-Hand|Two-Hand|Main Hand|Off Hand|Ranged|Thrown)\t/.test(l));
  if (idx !== -1) { lines[idx] = typeLine; return lines; }
  const bindIdx = lines.findIndex(l => /^Binds when/i.test(l));
  lines.splice(bindIdx + 1, 0, typeLine);
  return lines;
}

function tooltipLines(r, kind) {
  const c = cache[r.id];
  if (c && norm(c.name) === norm(r.name) && Array.isArray(c.lines) && c.lines.length) return withCanonicalTypeLine(c.lines.slice(), r, kind);
  const old = oldById.get(r.id);
  if (old && norm(old.name) === norm(r.name) && Array.isArray(old.lines) && old.lines.length) return withCanonicalTypeLine(old.lines.slice(), r, kind);
  // Minimal tooltip from the catalog
  const lines = [];
  const slot = SLOT_TEXT[r.slot];
  if (slot) lines.push(`${slot}\t${LABEL[kind] || ''}`.trim());
  if (r.armor) lines.push(`${r.armor} Armor`);
  if (r.dps && r.speed && kind !== 'shield' && kind !== 'holdable') {
    lines.push(`Speed ${Number(r.speed).toFixed(2)}`);
    lines.push(`(${Number(r.dps).toFixed(2)} damage per second)`);
  }
  if (r.reqlevel) lines.push(`Requires Level ${r.reqlevel}`);
  return lines;
}

const NON_STAT_LINE = /^(Binds when|Unique|Requires Level|Durability|Classes:|Sell Price|Item Level|One-Hand|Two-Hand|Main Hand|Off Hand|Ranged|Thrown|Held In Off-hand|Speed |\(|\d+\s*-\s*\d+\s+.*Damage|Max Stack|<)/i;
function statsFromLines(lines) {
  return lines.filter(l => !NON_STAT_LINE.test(l.trim())).map(l => l.replace(/\t.*/, '').trim()).filter(Boolean).join(', ');
}

function sourceOf(r, dungeonFloor) {
  const sm = Array.isArray(r.sourcemore) ? r.sourcemore : [];
  const src = Array.isArray(r.source) ? r.source : [];
  const gating = SPECIFIC_ITEM_GATING[r.id];
  if (gating?.quest) return { kind: 'quest', title: gating.quest, detail: 'Quest Reward', text: gating.quest };

  if (dungeonFloor?.name) {
    const boss = sm.find(s => s.t === 1 && s.n)?.n || 'Dungeon Boss';
    return { kind: 'dungeon_drop', title: boss, detail: `${dungeonFloor.name} (Dungeon Drop)`, text: `${boss} (${dungeonFloor.name})` };
  }
  const quest = sm.find(s => s.t === 5 && s.n);
  if (quest || src.includes(4)) {
    const q = quest?.n || 'Quest Reward';
    return { kind: 'quest', title: q, detail: 'Quest Reward', text: q };
  }
  const craft = sm.find(s => s.t === 6);
  if (craft || src.includes(1)) {
    const prof = PROFESSION_SKILL[craft?.s] || 'Crafted';
    return { kind: 'crafted', title: prof, detail: 'Profession Craft', text: `Crafted (${prof})` };
  }
  if (src.includes(5)) {
    const npc = sm.find(s => s.t === 1 && s.n)?.n;
    return { kind: 'vendor', title: npc || 'Weapon Vendor', detail: 'Vendor Purchase', text: npc ? `Sold by ${npc}` : 'Vendor Purchase' };
  }
  const npc = sm.find(s => s.t === 1 && s.n)?.n;
  if (npc) return { kind: 'world_drop', title: npc, detail: 'Drop', text: `Dropped by ${npc}` };
  if (src.includes(2)) {
    return { kind: 'world_drop', title: r.quality >= 3 ? 'Rare World Drop' : 'Zone Drop', detail: 'World Drop', text: 'World Drop' };
  }
  return { kind: 'vendor', title: 'Starter / Trainer Weapon', detail: 'Starting equipment or weapon trainer', text: 'Starter Weapon' };
}

function buildRecord(r) {
  const kind = kindOf(r);
  if (!kind || kind === 'fishing' || kind === 'misc' || /fishing pole/i.test(r.name || '')) return null;
  if (r.quality === 0 || TEST_NAME.test(r.name || '') || r.id === 7170 || r.id === 215235) return null;

  const src = Array.isArray(r.source) ? r.source : [];
  const lines = tooltipLines(r, kind);
  const tipReq = Number((lines.join('\n').match(/Requires Level (\d+)/) || [])[1] || 0);
  const hasReq = !!(r.reqlevel || tipReq);

  // Unobtainable / datamined placeholders: no source and no level requirement, unless it is
  // low-level common/uncommon starter gear (e.g. "Worn Shortsword")
  if (!src.length && !hasReq && (r.level > 15 || r.quality >= 3)) return null;

  // Raid / PvP rank / legendary — not part of a leveling path
  const sm = Array.isArray(r.sourcemore) ? r.sourcemore : [];
  const isRaid = sm.some(s => RAID_ZONES.has(s.z));
  const isPvpRank = PVP_ALLIANCE.test(r.name) || PVP_HORDE.test(r.name);
  if (isRaid || isPvpRank || r.quality >= 5 || r.level >= 70) return null;

  const reqLevel = Math.max(Number(r.reqlevel || 0), tipReq) || Math.max(1, (r.level || 1) - 5);

  // Dungeon floor (practical level) from build-progression.mjs tables
  const itemLike = { id: r.id, itemId: r.id, name: r.name, sourcemore: sm, source: { title: '' } };
  const floor = detectDungeonFloor(itemLike);
  const gating = SPECIFIC_ITEM_GATING[r.id]?.effectiveLevel || 0;
  // Quest rewards often carry no item level requirement ("Requires Level 1"); the quest itself
  // is gated, so use the usual iLvl − 5 rule as a floor instead of making them level-1 picks.
  const questFloor = reqLevel <= 1 && r.level > 6 ? r.level - 5 : 0;
  const effectiveLevel = Math.min(60, Math.max(1, reqLevel, questFloor, floor?.practical || 0, gating, kind === 'polearm' ? 20 : 0));

  let faction = r.side === 1 ? 'alliance' : (r.side === 2 ? 'horde' : 'both');
  if (PVP_ALLIANCE.test(r.name)) faction = 'alliance';
  if (PVP_HORDE.test(r.name)) faction = 'horde';

  const c = cache[r.id];
  const cacheOk = c && norm(c.name) === norm(r.name);
  const old = oldById.get(r.id);
  const oldOk = old && norm(old.name) === norm(r.name);
  const icon = (cacheOk && c.icon) || (oldOk && old.icon) || sm.find(s => s.icon)?.icon || 'inv_misc_questionmark';

  const isWeapon = kind !== 'shield' && kind !== 'holdable';
  const speed = isWeapon && r.speed ? Number(r.speed).toFixed(2) : undefined;
  const dps = isWeapon && r.dps ? `${Number(r.dps).toFixed(2)} DPS` : undefined;
  const armor = Number(r.armor || (lines.join(' ').match(/(\d[\d,]*) Armor\b/) || [])[1]?.replace(/,/g, '') || 0);
  const block = Number((lines.join(' ').match(/\b(\d+) Block\b/) || [])[1] || 0);

  return {
    id: r.id, kind, name: r.name, icon, speed, dps, armor, block,
    quality: `q${r.quality}`, iLvl: r.level, reqLevel, effectiveLevel,
    slot: r.slot, offHandOnly: r.slot === 22,
    reqclass: r.reqclass || 0, faction, lines,
    stats: statsFromLines(lines),
    source: sourceOf(r, floor)
  };
}

const RECORDS = [];
const seen = new Set();
for (const r of rawCatalog) {
  if (seen.has(r.id)) continue;
  seen.add(r.id);
  const rec = buildRecord(r);
  if (rec) RECORDS.push(rec);
}

// ---------------------------------------------------------------------------
// 4. Track definitions
// ---------------------------------------------------------------------------
const TWO_H = ['axe2', 'mace2', 'sword2', 'polearm', 'staff'];
const ONE_H_MELEE = ['axe1', 'mace1', 'sword1', 'dagger', 'fist'];
const RANGED = ['bow', 'gun', 'crossbow'];

// key: `${dataset}.${class}.${listKey}` where listKey ∈ levels | healingLevels | tracksData.<id>
const TRACKS = {
  'weapons.warrior.levels':           { role: 'melee_dps', top: ['axe2', 'mace2', 'sword2', 'polearm'], alts: [...TWO_H, ...ONE_H_MELEE] },
  'weapons.warrior.tracksData.tank':  { role: 'tank_1h', top: ['axe1', 'mace1', 'sword1'], alts: ['axe1', 'mace1', 'sword1', 'dagger', 'fist'], noOffHandOnly: true },
  'weapons.paladin.levels':           { role: 'melee_dps', top: ['axe2', 'mace2', 'sword2', 'polearm'], alts: ['axe2', 'mace2', 'sword2', 'polearm', 'axe1', 'mace1', 'sword1'] },
  'weapons.paladin.healingLevels':    { role: 'healer', top: ['mace1', 'sword1', 'axe1'], alts: ['mace1', 'sword1', 'axe1', 'mace2', 'sword2'], noOffHandOnly: true },
  'weapons.paladin.tracksData.tank':  { role: 'tank_1h', top: ['axe1', 'mace1', 'sword1'], alts: ['axe1', 'mace1', 'sword1'], noOffHandOnly: true },
  'weapons.hunter.levels':            { role: 'hunter', top: RANGED, alts: RANGED },
  'weapons.hunter.tracksData.twohand': { role: 'melee_dps', top: ['axe2', 'sword2', 'polearm', 'staff'], alts: ['axe2', 'sword2', 'polearm', 'staff'] },
  'weapons.rogue.levels':             { role: 'melee_dps', top: ['dagger', 'sword1', 'mace1', 'axe1', 'fist'], alts: ['dagger', 'sword1', 'mace1', 'axe1', 'fist'], noOffHandOnly: true },
  'weapons.shaman.levels':            { role: 'melee_dps', top: ['axe2', 'mace2', 'staff'], alts: ['axe2', 'mace2', 'staff', 'axe1', 'mace1', 'dagger', 'fist'] },
  'weapons.shaman.healingLevels':     { role: 'healer', top: ['mace1', 'axe1', 'dagger', 'fist', 'staff'], alts: ['mace1', 'axe1', 'dagger', 'fist', 'staff', 'mace2'], noOffHandOnly: true },
  'weapons.mage.levels':              { role: 'caster_dps', top: ['staff', 'dagger', 'sword1'], alts: ['staff', 'dagger', 'sword1'], noOffHandOnly: true },
  'weapons.warlock.levels':           { role: 'caster_dps', top: ['staff', 'dagger', 'sword1'], alts: ['staff', 'dagger', 'sword1'], noOffHandOnly: true },
  'weapons.priest.levels':            { role: 'caster_dps', top: ['staff', 'dagger', 'mace1'], alts: ['staff', 'dagger', 'mace1'], noOffHandOnly: true },
  'weapons.priest.healingLevels':     { role: 'healer', top: ['staff', 'dagger', 'mace1'], alts: ['staff', 'dagger', 'mace1'], noOffHandOnly: true },
  'weapons.druid.levels':             { role: 'melee_dps', top: ['mace2', 'polearm', 'staff'], alts: ['mace2', 'polearm', 'staff', 'mace1', 'dagger', 'fist'] },
  'weapons.druid.healingLevels':      { role: 'healer', top: ['staff', 'mace1', 'mace2', 'dagger', 'fist'], alts: ['staff', 'mace1', 'mace2', 'dagger', 'fist'], noOffHandOnly: true },
  'wands.mage.levels':                { role: 'caster_wand', top: ['wand'], alts: ['wand'] },
  'wands.warlock.levels':             { role: 'caster_wand', top: ['wand'], alts: ['wand'] },
  'wands.priest.levels':              { role: 'caster_wand', top: ['wand'], alts: ['wand'] },
  'offhands.warrior.levels':          { role: 'tank_shield', top: ['shield'], alts: ['shield'] },
  'offhands.paladin.levels':          { role: 'tank_shield', top: ['shield'], alts: ['shield'] },
  'offhands.paladin.healingLevels':   { role: 'healer', top: ['shield'], alts: ['shield'] },
  'offhands.shaman.levels':           { role: 'tank_shield', top: ['shield'], alts: ['shield'] },
  'offhands.shaman.healingLevels':    { role: 'healer', top: ['shield'], alts: ['shield'] },
  'offhands.mage.levels':             { role: 'caster_dps', top: ['holdable'], alts: ['holdable'] },
  'offhands.warlock.levels':          { role: 'caster_dps', top: ['holdable'], alts: ['holdable'] },
  'offhands.priest.levels':           { role: 'caster_dps', top: ['holdable'], alts: ['holdable'] },
  'offhands.priest.healingLevels':    { role: 'healer', top: ['holdable'], alts: ['holdable'] },
  'offhands.druid.levels':            { role: 'caster_dps', top: ['holdable'], alts: ['holdable'] },
  'offhands.druid.healingLevels':     { role: 'healer', top: ['holdable'], alts: ['holdable'] }
};

// New hunter melee track (the UI already switches to `twohand` when the Two-Hand slot filter is used)
const HUNTER_TWOHAND_BRACKETS = ['10–14', '15–20', '21–26', '27–32', '33–38', '39–44', '45–50', '51–55', '56–60'];

// ---------------------------------------------------------------------------
// 5. Selection
// ---------------------------------------------------------------------------
const bracketMin = b => parseInt(String(b), 10) || 1;
const bracketMax = b => { const p = String(b).split(/[–-]/).map(s => parseInt(s, 10)); return p[1] || p[0] || 60; };
const MAX_ALTS = 16;

function eligibleFor(cls, track) {
  const mask = CLASS_MASK[cls];
  return RECORDS.filter(rec => {
    if (!track.alts.includes(rec.kind) || !PROF[cls].includes(rec.kind)) return false;
    if (rec.reqclass && !(rec.reqclass & mask)) return false;
    if (cls === 'shaman' && rec.faction === 'alliance') return false;
    if (track.noOffHandOnly && rec.offHandOnly) return false;
    return true;
  });
}

function scoreAt(rec, role, level) {
  return calculateLevelingStatWeight({ ...rec, itemId: rec.id }, role, level);
}

function toEntry(rec, score, rank) {
  const e = {
    itemId: rec.id, name: rec.name, icon: rec.icon, weaponType: LABEL[rec.kind],
    ...(rec.speed ? { speed: rec.speed } : {}), ...(rec.dps ? { dps: rec.dps } : {}),
    quality: rec.quality, iLvl: rec.iLvl, reqLevel: rec.reqLevel, effectiveLevel: rec.effectiveLevel,
    score, rank, stats: rec.stats,
    ...(rec.kind === 'shield' || rec.kind === 'holdable' ? { armor: rec.armor, block: rec.block } : {}),
    lines: rec.lines, source: rec.source, faction: rec.faction
  };
  return e;
}

function altValue(rec) {
  const head = rec.dps ? `${rec.dps}, ${rec.speed}s, ${LABEL[rec.kind]}` : (rec.stats || LABEL[rec.kind]);
  return `${head} - ${rec.source.text}`;
}

function buildList(cls, track, brackets) {
  const pool = eligibleFor(cls, track);
  // 1. pick tops per bracket
  const picks = [];
  for (const b of brackets) {
    const lo = bracketMin(b), hi = bracketMax(b), mid = Math.round((lo + hi) / 2);
    const usable = pool.filter(r => r.effectiveLevel <= hi);
    if (!usable.length) continue;
    const scored = usable.map(r => ({ r, s: scoreAt(r, track.role, mid) }));
    const topPool = scored.filter(x => track.top.includes(x.r.kind));
    const best = (topPool.length ? topPool : scored)
      .sort((a, b2) => b2.s - a.s || b2.r.iLvl - a.r.iLvl || a.r.id - b2.r.id)[0];
    const prev = picks[picks.length - 1];
    if (prev && prev.rec.id === best.r.id) { prev.hi = hi; continue; }
    picks.push({ lo: prev ? prev.hi + 1 : lo, hi, rec: best.r });
  }
  // first bracket always starts at the original first bracket's min
  if (picks.length) picks[0].lo = Math.min(picks[0].lo, bracketMin(brackets[0]));

  // 2. alternatives per (merged) bracket
  const topIds = new Set(picks.map(p => p.rec.id));
  return picks.map(p => {
    const mid = Math.round((p.lo + p.hi) / 2);
    const usable = pool.filter(r => r.effectiveLevel <= p.hi && r.id !== p.rec.id)
      .map(r => ({ r, s: scoreAt(r, track.role, mid) }))
      .sort((a, b) => b.s - a.s || b.r.iLvl - a.r.iLvl);
    const fresh = usable.filter(x => x.r.effectiveLevel >= p.lo - 10 && !topIds.has(x.r.id));
    const chosen = [];
    const add = x => { if (x && !chosen.some(c => c.r.id === x.r.id)) chosen.push(x); };
    // faction counterparts first (renderer looks for the best Alliance / Horde alternative)
    const top = track.top;
    add(usable.find(x => x.r.faction === 'horde' && top.includes(x.r.kind)));
    if (cls !== 'shaman') add(usable.find(x => x.r.faction === 'alliance' && top.includes(x.r.kind)));
    add(usable.find(x => x.r.faction === 'both' && top.includes(x.r.kind)));
    // best in-shape alternatives, then other legal slots so the slot filter has something to promote
    const offShape = track.alts.some(k => !top.includes(k));
    fresh.filter(x => top.includes(x.r.kind)).slice(0, offShape ? 9 : MAX_ALTS).forEach(add);
    if (offShape) {
      add(usable.find(x => !top.includes(x.r.kind) && x.r.slot === 21)); // best Main Hand
      add(usable.find(x => !top.includes(x.r.kind) && x.r.slot === 13)); // best One-Hand
      fresh.filter(x => !top.includes(x.r.kind)).forEach(x => { if (chosen.length < MAX_ALTS + 1) add(x); });
    }
    fresh.forEach(x => { if (chosen.length < MAX_ALTS) add(x); });
    // In-shape weapons first (the renderer promotes the first matching alternative for the
    // faction counterpart), off-shape ones after so the slot filter can still find them.
    const inShape = x => (top.includes(x.r.kind) ? 1 : 0);
    const ordered = chosen.sort((a, b) => inShape(b) - inShape(a) || b.s - a.s).slice(0, MAX_ALTS + 2);
    const hero = toEntry(p.rec, scoreAt(p.rec, track.role, mid), 1);
    return {
      levelBracket: p.lo === p.hi ? `${p.lo}` : `${p.lo}–${p.hi}`,
      ...hero,
      isTopPick: true,
      alts: ordered.map((x, i) => ({ ...toEntry(x.r, x.s, i + 2), value: altValue(x.r) }))
    };
  });
}

// ---------------------------------------------------------------------------
// 6. Rebuild datasets
// ---------------------------------------------------------------------------
const TRACK_LABELS = {
  'weapons.warrior.tank': '🛡️ Protection & Tanking (1-Handed Swords / Axes / Maces)',
  'weapons.paladin.dps': '⚔️ DPS Track (Retribution — Two-Handed Swords, Axes, Maces & Polearms)',
  'weapons.paladin.tank': '🛡️ Protection & Tanking (1-Handed Swords, Axes & Maces)',
  'weapons.hunter.twohand': '🗡️ Two-Handed Melee (Stat Stick — Axes, Swords, Polearms & Staves)'
};

const out = { weapons: {}, wands: {}, offhands: {} };
const report = [];

for (const ds of ['weapons', 'wands', 'offhands']) {
  for (const [cls, oldCd] of Object.entries(OLD[ds])) {
    const cd = JSON.parse(JSON.stringify({ ...oldCd, levels: undefined, healingLevels: undefined, tracksData: undefined }));
    const firstTrackId = oldCd.tracks?.[0]?.id || 'primary';
    const run = (listKey, brackets) => {
      const def = TRACKS[`${ds}.${cls}.${listKey}`];
      if (!def) throw new Error(`No track definition for ${ds}.${cls}.${listKey}`);
      const list = buildList(cls, def, brackets);
      report.push(`${ds}/${cls}/${listKey}: ${list.length} steps — ${list.map(s => `${s.levelBracket} ${s.name}`).join(' | ')}`);
      return list;
    };
    cd.levels = run('levels', oldCd.levels.map(s => s.levelBracket));
    if (oldCd.healingLevels) cd.healingLevels = run('healingLevels', oldCd.healingLevels.map(s => s.levelBracket));

    const td = {};
    for (const [tid, l] of Object.entries(oldCd.tracksData || {})) {
      td[tid] = tid === firstTrackId ? cd.levels : run(`tracksData.${tid}`, l.map(s => s.levelBracket));
    }
    if (ds === 'weapons' && cls === 'hunter') {
      td.twohand = run('tracksData.twohand', HUNTER_TWOHAND_BRACKETS);
      if (!cd.tracks.some(t => t.id === 'twohand')) cd.tracks.push({ id: 'twohand', name: TRACK_LABELS['weapons.hunter.twohand'] });
    }
    if (Object.keys(td).length) cd.tracksData = td; else delete cd.tracksData;

    for (const t of cd.tracks || []) {
      const lbl = TRACK_LABELS[`${ds}.${cls}.${t.id}`];
      if (lbl) t.name = lbl;
    }
    // keep the original key order (classId, role, tracks, levels, healingLevels, tracksData)
    const ordered = {};
    for (const k of Object.keys(oldCd)) if (cd[k] !== undefined) ordered[k] = cd[k];
    for (const k of Object.keys(cd)) if (ordered[k] === undefined && cd[k] !== undefined) ordered[k] = cd[k];
    out[ds][cls] = ordered;
  }
}

// ---------------------------------------------------------------------------
// 7. Write
// ---------------------------------------------------------------------------
fs.writeFileSync(path.join(SCRAPED, 'forever_weapons.json'), JSON.stringify(out.weapons, null, 2), 'utf8');
fs.writeFileSync(path.join(SCRAPED, 'forever_wands.json'), JSON.stringify(out.wands, null, 2), 'utf8');
fs.writeFileSync(path.join(SCRAPED, 'forever_offhands.json'), JSON.stringify(out.offhands, null, 2), 'utf8');

const newBundle = { ...bundle, weapons: out.weapons, wands: out.wands, offhands: out.offhands };
const ordered = {};
for (const k of Object.keys(bundle)) ordered[k] = newBundle[k];
const js = `/**
 * World of Warcraft: Forever - Class Progression & Toolkit Dataset
 * Contains 1-60 Spellbooks, Weapon Progression, 1-Click Copyable Macros, and Leveling Milestones
 * Auto-compiled from verified Beta Forensics and multi-competitor datasets.
 * Weapon paths regenerated by scripts/rebuild-weapon-paths.mjs.
 */

if (typeof window !== 'undefined') {
  window.WOW_PROGRESSION_DATA = ${JSON.stringify(ordered, null, 2)};
}
`;
fs.writeFileSync(PROG_JS, js, 'utf8');

if (process.argv.includes('--report')) console.log(report.join('\n'));
console.log(`[rebuild-weapon-paths] ${RECORDS.length} obtainable catalog items; wrote ${report.length} progression lists.`);
