/**
 * Build the Level 60 "popular builds" presets for the Talents tab.
 *
 * Input:  data/scraped/talent-builds-60-sources.json (builds gathered from Wowhead,
 *         ForeverDB and WoW Forever Talents, plus Wowhead's live tree layout)
 * Output: js/data/talent-builds-60-data.js  (window.WOW_TALENT_BUILDS_60)
 *
 * Method, per spec:
 *   1. Decode every candidate build with the live tree layout and drop any that are
 *      not legal 51-point builds (rank caps, tier gates, prerequisites).
 *   2. Weight candidates: the guide sites' main PvE build = 1 (a secondary guide
 *      build = 0.5); community builds = views / most-viewed build for that spec.
 *   3. Score each candidate as its own weight plus the weighted similarity of every
 *      other candidate to it, and keep the top scorer: the build the sites agree on most.
 *
 * Talents are stored by name so the presets survive layout changes in talents-data.js.
 * Usage: node scripts/build-talent-builds-60.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SRC = JSON.parse(fs.readFileSync(path.join(ROOT, 'data', 'scraped', 'talent-builds-60-sources.json'), 'utf8'));
const OUT = path.join(ROOT, 'js', 'data', 'talent-builds-60-data.js');

const ctx = { window: {} };
vm.createContext(ctx);
vm.runInContext(fs.readFileSync(path.join(ROOT, 'js', 'data', 'talents-data.js'), 'utf8'), ctx);
const TALENTS = ctx.window.WOW_TALENTS_DATA;

const SPECS = {
  warrior: [['arms', 'Arms', 'Melee DPS'], ['fury', 'Fury', 'Melee DPS'], ['protection', 'Protection', 'Tank']],
  paladin: [['holy', 'Holy', 'Healer'], ['protection', 'Protection', 'Tank'], ['retribution', 'Retribution', 'Melee DPS']],
  hunter: [['beast-mastery', 'Beast Mastery', 'Ranged DPS'], ['marksmanship', 'Marksmanship', 'Ranged DPS'], ['survival', 'Survival', 'Melee DPS']],
  rogue: [['assassination', 'Assassination', 'Melee DPS'], ['combat', 'Combat', 'Melee DPS'], ['subtlety', 'Subtlety', 'Melee DPS']],
  priest: [['discipline', 'Discipline', 'Healer'], ['holy', 'Holy', 'Healer'], ['shadow', 'Shadow', 'Ranged DPS']],
  shaman: [['elemental', 'Elemental', 'Ranged DPS'], ['enhancement', 'Enhancement', 'Melee DPS'], ['restoration', 'Restoration', 'Healer']],
  mage: [['arcane', 'Arcane', 'Ranged DPS'], ['fire', 'Fire', 'Ranged DPS'], ['frost', 'Frost', 'Ranged DPS']],
  warlock: [['affliction', 'Affliction', 'Ranged DPS'], ['demonology', 'Demonology', 'Ranged DPS'], ['destruction', 'Destruction', 'Ranged DPS']],
  druid: [['balance', 'Balance', 'Ranged DPS'], ['feral', 'Feral', 'Melee DPS / Tank'], ['restoration', 'Restoration', 'Healer']]
};

const slug = s => s.toLowerCase().replace(/[’']/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const cap = s => s.charAt(0).toUpperCase() + s.slice(1);

function decode(cls, code) {
  const layout = SRC.wowheadLayout[cls];
  const ranks = {};
  const errors = [];
  code.split('-').forEach((part, tree) => {
    const list = layout[tree] || [];
    if (part.length > list.length) errors.push(`tree ${tree} has more digits than talents`);
    [...part].forEach((ch, i) => {
      const v = Number(ch);
      if (!v || !list[i]) return;
      const [row, , max, , s] = list[i];
      if (v > max) errors.push(`${s} ${v}/${max}`);
      ranks[s] = { v, tree, row: row + 1, max };
    });
  });
  return { ranks, errors };
}

function legal(cls, ranks) {
  const errors = [];
  const ours = Object.fromEntries(TALENTS[cls].talents.map(t => [slug(t.name), t]));
  const byId = Object.fromEntries(TALENTS[cls].talents.map(t => [t.id, t]));
  let total = 0;
  for (const [s, r] of Object.entries(ranks)) {
    total += r.v;
    const below = Object.values(ranks).filter(o => o.tree === r.tree && o.row < r.row).reduce((a, o) => a + o.v, 0);
    if (below < 5 * (r.row - 1)) errors.push(`${s} tier gate`);
    const t = ours[s];
    if (!t) { errors.push(`${s} missing from talents-data.js`); continue; }
    if (r.v > t.maxRank) errors.push(`${s} exceeds rank ${t.maxRank} in talents-data.js`);
    if (t.req) {
      const pre = byId[t.req];
      const have = ranks[slug(pre.name)];
      if (!have || have.v < pre.maxRank) errors.push(`${s} needs ${pre.name}`);
    }
  }
  if (total !== 51) errors.push(`${total} points`);
  return errors;
}

const dist = (a, b) => {
  let d = 0;
  new Set([...Object.keys(a), ...Object.keys(b)]).forEach(k => { d += Math.abs((a[k]?.v || 0) - (b[k]?.v || 0)); });
  return d;
};
const similarity = (a, b) => Math.round(100 * (1 - dist(a, b) / 102));

function candidatesFor(cls, specId, tree) {
  const key = `${cls}/${specId}`;
  const out = [];
  const add = (c) => {
    const { ranks, errors } = decode(cls, c.code);
    if (errors.length || legal(cls, ranks).length) return;
    out.push({ ...c, ranks });
  };
  (SRC.wowhead[key] || []).filter(([label]) => /Raid|Dungeon/.test(label)).forEach(([label, code], i) => add({
    site: 'wowhead', code, weight: i === 0 ? 1 : 0.5,
    label: `PvE ${label.toLowerCase()} build`, url: SRC.wowheadGuideUrls[key]
  }));
  if (SRC.foreverdb[key]) add({
    site: 'foreverdb', code: SRC.foreverdb[key], weight: 1,
    label: 'level 60 group build', url: `https://foreverdb.net/class/${cap(cls)}/builds`
  });
  const community = SRC.wowforevertalents.filter(b => b.class === cls).map(b => {
    const { ranks } = decode(cls, b.code);
    const split = [0, 1, 2].map(t => Object.values(ranks).filter(r => r.tree === t).reduce((a, r) => a + r.v, 0));
    return { ...b, split };
  }).filter(b => b.split.indexOf(Math.max(...b.split)) === tree);
  const maxViews = Math.max(1, ...community.map(b => b.views));
  community.forEach(b => add({
    site: 'wowforevertalents', code: b.code, weight: b.views / maxViews,
    label: `community build, ${b.views.toLocaleString('en-US')} views`, url: `https://wowforevertalents.com/${cls}/?t=h${b.code}`
  }));
  return out;
}

const result = {};
const report = [];
for (const [cls, specs] of Object.entries(SPECS)) {
  const classData = TALENTS[cls];
  result[cls] = specs.map(([specId, name, role], tree) => {
    const cands = candidatesFor(cls, specId, tree);
    if (!cands.length) throw new Error(`No legal level 60 candidates for ${cls}/${specId}`);
    cands.forEach(c => {
      c.score = c.weight + cands.filter(o => o !== c).reduce((a, o) => a + o.weight * (1 - dist(c.ranks, o.ranks) / 102), 0);
    });
    cands.sort((a, b) => b.score - a.score);
    const best = cands[0];
    const agreement = {};
    cands.filter(o => o !== best).forEach(o => {
      agreement[o.site] = Math.max(agreement[o.site] || 0, similarity(best.ranks, o.ranks));
    });
    const talents = {};
    classData.talents
      .filter(t => best.ranks[slug(t.name)])
      .sort((a, b) => a.tree - b.tree || a.row - b.row || a.col - b.col)
      .forEach(t => { talents[t.name] = best.ranks[slug(t.name)].v; });
    const split = [0, 1, 2].map(t => classData.talents.filter(x => x.tree === t).reduce((a, x) => a + (talents[x.name] || 0), 0));
    const keyTalents = classData.talents
      .filter(t => t.tree === tree && talents[t.name] && t.row >= 5)
      .sort((a, b) => b.row - a.row || a.col - b.col)
      .slice(0, 4)
      .map(t => t.name);
    report.push(`${cls}/${specId}: ${split.join('/')} from ${best.site} (${cands.length} candidates)`);
    return {
      specId, name, role, tree, split, talents, keyTalents,
      pickedFrom: { site: SRC.sites[best.site].name, label: best.label, url: best.url },
      agreement: Object.entries(agreement).map(([site, pct]) => ({ site: SRC.sites[site].name, similarity: pct })),
      candidates: cands.length,
      wowheadCalcUrl: `https://www.wowhead.com/forever/talent-calc/${cls}/vkndmh${best.code}_t0`
    };
  });
}

const header = `/**
 * World of Warcraft: Forever - Level 60 popular talent builds (one per spec).
 * GENERATED by scripts/build-talent-builds-60.mjs from data/scraped/talent-builds-60-sources.json.
 * Sources collected ${SRC.collectedAt}: ${Object.values(SRC.sites).map(s => s.name).join(', ')}.
 * Talents are keyed by name and resolved against WOW_TALENTS_DATA at runtime. Do not edit by hand.
 */
`;
const body = `if (typeof window !== 'undefined') {
  window.WOW_TALENT_BUILDS_60 = ${JSON.stringify({
    meta: {
      collectedAt: SRC.collectedAt,
      level: 60,
      points: 51,
      method: 'For each spec, legal 51-point builds were collected from the sites below. Each build was scored by how closely the other builds match it, weighted by guide placement and community views; the top scorer is shown.',
      sources: Object.values(SRC.sites).map(s => ({ name: s.name, url: s.home }))
    },
    classes: result
  }, null, 2).replace(/\n/g, '\n  ')};
}
`;
fs.writeFileSync(OUT, header + body);
console.log(report.join('\n'));
console.log(`Wrote ${path.relative(ROOT, OUT)}`);
