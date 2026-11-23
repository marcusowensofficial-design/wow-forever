/**
 * Builds js/data/class-guides-60-data.js: one level 60 guide per class, with a section per spec.
 *
 * Inputs (all local, already synced on the site):
 *   scripts/class-guides-60/curated.mjs      titles, raid utility and Onyxia notes (hand-written)
 *   js/data/deepdives/<class>.js             class summary (Class Deep Dives tab)
 *   js/data/talent-builds-60-data.js         consensus 51-point build per spec
 *   js/data/spec-coach-data.js               ForeverDB level 60 priority, keep-ups, cooldowns, consumables, sim
 *   js/data/bis-60-data.js                   Level 60 pre-raid BiS per spec (gear, enchants, stat notes)
 *
 * Usage: node scripts/class-guides-60/build-class-guides.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';
import { CLASSES } from './curated.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const OUT = path.join(ROOT, 'js', 'data', 'class-guides-60-data.js');
const BUILD_DATE = 'November 22, 2026';

// Some deep-dive files use the bare global WOW_FOREVER_DATA (as in the browser, where window is the global).
const FOREVER = {};
const ctx = { window: { WOW_FOREVER_DATA: FOREVER }, WOW_FOREVER_DATA: FOREVER };
vm.createContext(ctx);
const load = (rel) => vm.runInContext(fs.readFileSync(path.join(ROOT, 'js', 'data', rel), 'utf8'), ctx);
['spec-coach-data.js', 'talent-builds-60-data.js', 'bis-60-data.js'].forEach(load);
Object.keys(CLASSES).forEach(c => load(`deepdives/${c}.js`));
const W = ctx.window;
const COACH = W.WOW_SPEC_COACH_DATA;
const TALENTS = W.WOW_TALENT_BUILDS_60.classes;
const BIS = W.WOW_BIS_DATA_60;
const BIS_META = W.WOW_BIS_METADATA_60;
const DEEP = W.WOW_FOREVER_DATA.classDeepDives;

const cell = (s) => String(s ?? '').replace(/\|/g, '/').replace(/\s+/g, ' ').trim();
const spell = (id, name) => `[${name}](https://www.wowhead.com/forever/spell=${id})`;
const item = (id, name) => `[${name}](https://www.wowhead.com/forever/item=${id})`;
const pct = (v) => `${(v * 100).toFixed(1)}%`;
const SLOTS = [['head', 'Head'], ['neck', 'Neck'], ['shoulder', 'Shoulder'], ['back', 'Back'], ['chest', 'Chest'], ['wrist', 'Wrist'],
  ['hands', 'Hands'], ['waist', 'Waist'], ['legs', 'Legs'], ['feet', 'Feet'], ['finger1', 'Ring'], ['finger2', 'Ring'],
  ['trinket1', 'Trinket'], ['trinket2', 'Trinket'], ['mainHand', 'Main Hand'], ['offHand', 'Off Hand'], ['ranged', 'Ranged / Relic']];
const AVAIL_NOTE = { raid: ' (raid, Dec 9)', unavailable: ' (not in Forever yet)', unknown: ' (source unconfirmed)' };
const USE_TEXT = { as_needed: 'when needed', on_pull: 'on the pull' };

function priorityLines(bracket) {
  return bracket.priority.map((p, i) => {
    let line = `${i + 1}. **${spell(p.spell, p.name)}:** ${p.why}`;
    if (p.speculation) line += ` ⚠️ *Unconfirmed:* ${p.reason || 'the simulator uses Classic numbers here.'}`.replace('*Unconfirmed:*', 'Unconfirmed:');
    return line;
  });
}

function specSection(classId, className, talent, coach, bisSpecs) {
  const out = [];
  const role = bisSpecs[0]?.role || talent?.role || coach?.role || '';
  const label = coach?.specName || talent?.name || bisSpecs[0]?.name;
  out.push(`### ${label} (${role})`, '');

  // Talents
  if (talent) {
    const agree = (talent.agreement || []).map(a => `${a.site} ${a.similarity}%`).join(', ');
    out.push('#### Talent Build (51 points)', '');
    out.push(`- **Split:** ${talent.split.join(' / ')}`);
    out.push(`- **Key talents:** ${talent.keyTalents.join(', ')}`);
    out.push(`- **Picked from:** ${talent.pickedFrom.site} (${talent.pickedFrom.label})${agree ? `; matches ${agree}` : ''}`);
    out.push(`- **Open it:** [Wowhead talent calculator](${talent.wowheadCalcUrl}) or the [BiS tab](#bis/${classId}/${bisSpecs[0]?.id || talent.specId}) → View Level 60 Build`);
    out.push('');
  }

  // Rotation
  if (coach) {
    const b = coach.brackets.find(x => x.levels[1] === 60);
    out.push('#### Rotation & Priority (Level 60)', '');
    if (classId === 'druid' && coach.spec === 'druid-feral') {
      out.push('💡 ForeverDB\'s Feral profile is the **Bear (tank)** priority. Cat damage follows the usual energy-and-combo-point loop: build combo points, then spend them on finishers.', '');
    }
    out.push(...priorityLines(b), '');
    if (b.keep_up?.length) {
      out.push(`- **Keep up:** ${b.keep_up.map(k => `${k.name} on ${k.on === 'self' ? 'yourself' : 'the target'}${k.min_uptime ? ` (aim for ${Math.round(k.min_uptime * 100)}%+ uptime)` : ''}`).join('; ')}`);
    }
    if (b.cooldowns?.length) {
      out.push(`- **Cooldowns:** ${b.cooldowns.map(c => {
        const use = c.use.startsWith('with:') ? `together with ${c.use.slice(5)}` : (USE_TEXT[c.use] || c.use);
        return `${spell(c.spell, c.name)} ${use}${c.why ? ` (${c.why.replace(/\.$/, '')})` : ''}`;
      }).join('; ')}`);
    }
    if (b.triggers?.length) out.push(`- **React to:** ${b.triggers.map(t => t.why).join('; ')}`);
    out.push('');
    for (const a of b.avoid || []) out.push(`⚠️ **Avoid:** ${a.text}${a.speculation && a.reason ? ` ${a.reason}.` : ''}`, '');
    if (b.sim) {
      const metric = b.sim.dps ? `${Math.round(b.sim.dps)} DPS` : (b.sim.hps ? `${Math.round(b.sim.hps)} HPS` : '');
      out.push(`📦 **Simulator:** ${metric} in a ${b.sim.fight_s} s single-target fight with this build and pre-raid gear.${b.sim.limits?.length ? ` Not modeled: ${b.sim.limits.join('; ')}.` : ''}`, '');
    } else {
      out.push('📦 No simulator run for this spec yet: the priority comes from class guides and client data, not a sim.', '');
    }
    if (b.prepull?.length) {
      out.push(`- **Consumables & pre-pull:** ${b.prepull.map(p => `${item(p.id, p.name)}${p.value ? ` (+${pct(p.value)})` : ''}`).join(' · ')}`, '');
    }
  }

  // Gear
  for (const bs of bisSpecs) {
    const doll = bs.doll?.alliance || bs.doll?.horde || {};
    out.push(`#### Pre-Raid Gear${bisSpecs.length > 1 ? `: ${bs.name}` : ''}`, '');
    if (bs.description) out.push(bs.description, '');
    out.push('| Slot | Best in Slot | Source |', '|---|---|---|');
    for (const [key, slotName] of SLOTS) {
      const it = doll[key];
      if (!it) continue;
      // BiS sources sometimes give only the price ("Sold by 13g 17s 69c"); say "Vendor" instead.
      const source = cell(it.source).replace(/^Sold by (?=\d+[gsc]\b|\d+ Tarnished)/, 'Vendor: ');
      out.push(`| ${slotName} | ${item(it.itemId, cell(it.name))} | ${source}${AVAIL_NOTE[it.avail] || ''} |`);
    }
    out.push('');
    if (bs.enchants?.length) {
      const ench = [...new Map(bs.enchants.map(e => [`${e.slot}|${e.effect}`, e])).values()];
      out.push(`- **Enchants:** ${ench.map(e => `${e.slot}: ${e.effect}`).join(' · ')}`, '');
    }
    out.push(`🎯 Full list with alternatives and Horde/Alliance differences: [BiS tab → ${bs.name}](#bis/${classId}/${bs.id}).`, '');
  }
  return out;
}

function buildClassGuide(classId) {
  const meta = CLASSES[classId];
  const cls = BIS.classes.find(c => c.id === classId);
  const talents = TALENTS[classId] || [];
  const bisSpecs = BIS[classId].specs;
  const deep = DEEP[classId] || {};
  const coachSpecs = Object.values(COACH).filter(c => c.spec.startsWith(`${classId}-`));

  const out = [];
  out.push(`### Overview: ${cls.name} at Level 60`, '');
  if (deep.summary) out.push(deep.summary, '');
  out.push('| Spec | Role | Talent Split | Simulator |', '|---|---|---|---|');
  for (const coach of coachSpecs) {
    const specId = coach.spec.slice(classId.length + 1);
    const t = talents.find(x => x.specId === specId);
    const b = coach.brackets.find(x => x.levels[1] === 60);
    const sim = b.sim?.dps ? `${Math.round(b.sim.dps)} DPS` : '–';
    const role = bisSpecs.find(s => s.id === specId)?.role || coach.role;
    out.push(`| **${coach.specName}** | ${role} | ${t ? t.split.join(' / ') : '–'} | ${sim} |`);
  }
  out.push('');
  out.push('💡 Simulator numbers compare specs under the same test (pre-raid gear, single target, no raid buffs). They are a guide, not a ranking of real raid performance.', '');
  out.push('---', '', `### What ${cls.name}s Bring to a Raid`, '');
  meta.utility.forEach(u => out.push(`- ${u}`));
  out.push('', `🎯 **Onyxia tip:** ${meta.onyxia} Every raider needs the Drakefire Amulet: [Onyxia Attunement guide](#guides/guide-onyxia-attunement).`, '');

  for (const coach of coachSpecs) {
    const specId = coach.spec.slice(classId.length + 1);
    const t = talents.find(x => x.specId === specId);
    // Druid: Feral covers both the cat and the bear BiS lists
    const specBis = bisSpecs.filter(s => s.id === specId || (specId === 'feral' && s.id === 'feral-tank'));
    if (!t) throw new Error(`${classId}/${specId}: no level 60 talent build`);
    if (!specBis.length) throw new Error(`${classId}/${specId}: no BiS list`);
    out.push('---', '', ...specSection(classId, cls.name, t, coach, specBis));
  }
  const covered = new Set(coachSpecs.flatMap(c => [c.spec.slice(classId.length + 1)]).concat(classId === 'druid' ? ['feral-tank'] : []));
  const missing = bisSpecs.filter(s => !covered.has(s.id));
  if (missing.length) throw new Error(`${classId}: BiS specs without a guide section: ${missing.map(s => s.id).join(', ')}`);

  out.push('---', '', '### More for Your Class', '');
  out.push(`- [Class Deep Dives](#deepdives): every Forever change to the ${cls.name}, talent by talent.`);
  out.push(`- [${cls.name} leveling guide (level 30)](#guides/${meta.level30}): leveling tips and early builds.`);
  out.push(`- [Level 60 Checklist](#guides/guide-level-60-checklist): what to do before raids open on December 9.`);
  out.push('', `📦 Data: talent builds collected ${W.WOW_TALENT_BUILDS_60.meta.collectedAt} (Wowhead, ForeverDB, WoW Forever Talents); rotation priorities and simulator from ForeverDB (build ${coachSpecs[0].build}, updated ${coachSpecs[0].updated}); BiS lists updated ${BIS_META.lastUpdated}. Compiled ${BUILD_DATE}.`);

  const specNames = coachSpecs.map(c => c.specName);
  return {
    id: `guide-class-${classId}-60`,
    title: meta.title,
    category: 'Classes & Pets',
    source: 'ForeverDB rotation & sim data · Wowhead/ForeverDB talent builds · Level 60 BiS lists',
    icon: `https://render.worldofwarcraft.com/us/icons/56/${meta.icon}.jpg`,
    summary: `Level 60 ${cls.name} guide for ${specNames.join(', ')}: 51-point talent builds, rotation priorities with simulator results, consumables, pre-raid gear and enchants, plus what ${cls.name}s bring to a raid.`,
    content: out.join('\n')
  };
}

const guides = Object.keys(CLASSES).map(buildClassGuide);
const level30Links = Object.fromEntries(Object.entries(CLASSES).map(([c, m]) => [m.level30, `guide-class-${c}-60`]));

const js = `/**
 * World of Warcraft: Forever - Level 60 Class Guides (one per class)
 * GENERATED by scripts/class-guides-60/build-class-guides.mjs on ${BUILD_DATE}. Do not edit by hand:
 * change scripts/class-guides-60/curated.mjs or the source datasets and re-run the build.
 */
(function () {
  'use strict';
  if (typeof window === 'undefined') return;
  const GUIDES = ${JSON.stringify(guides, null, 2)};
  // Level 30 class guide id -> its level 60 guide (used to point leveling guides at the new ones).
  const LEVEL30_TO_60 = ${JSON.stringify(level30Links, null, 2)};

  const ids = new Set(GUIDES.map(g => g.id));
  window.WOW_CLASS_GUIDES_60 = GUIDES;
  if (window.WOW_TOOLS_DATA) {
    const list = (window.WOW_TOOLS_DATA.guides || []).filter(g => !ids.has(g.id));
    for (const g of list) {
      const to = LEVEL30_TO_60[g.id];
      if (to && !String(g.content || '').includes('#guides/' + to)) {
        g.content = '🎯 Level 60? This is the leveling guide. For raid builds, rotations and pre-raid gear see the [level 60 guide](#guides/' + to + ').\\n\\n' + g.content;
      }
    }
    window.WOW_TOOLS_DATA.guides = list.concat(GUIDES);
  }
})();
`;
fs.writeFileSync(OUT, js, 'utf8');
console.log(`wrote ${path.relative(ROOT, OUT)}: ${guides.length} guides, ${(js.length / 1024).toFixed(0)} KB`);
for (const g of guides) console.log(`  ${g.id.padEnd(26)} ${g.content.length} chars`);
