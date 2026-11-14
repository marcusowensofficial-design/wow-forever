/**
 * Resolves routes-spec.cjs against the site's own recipe database
 * (window.WOW_PROFESSIONS_DATA[prof].recipes) and validates each step:
 *   - recipe exists and its learn skill <= step.from
 *   - recipe is not grey before step.to (grey > to - 1)
 * Usage: node scripts/profession-routes/resolve.cjs   (prints a report, exits 1 on errors)
 */
'use strict';
const path = require('path');

function loadData() {
  global.window = global.window || {};
  require(path.join(__dirname, '..', '..', 'js', 'data', 'professions-data.js'));
  return global.window.WOW_PROFESSIONS_DATA;
}

const norm = s => String(s || '').toLowerCase().replace(/[’']/g, "'").replace(/\s+/g, ' ').trim();

// Wowhead spell names that differ from the crafted item's name in our data.
const ALIASES = {
  'mithril headed trout': 'mithril head trout',
};

function findRecipe(prof, name) {
  const want = norm(ALIASES[norm(name)] || name);
  const all = prof.recipes || [];
  return all.find(r => norm(r.name) === want)
    || all.find(r => norm(r.name).replace(/^(enchant|formula|recipe|pattern|plans|schematic): /, '') === want)
    || null;
}

function resolveAll(spec, data) {
  const report = [];
  const out = {};
  for (const [slug, entries] of Object.entries(spec)) {
    const prof = data[slug];
    out[slug] = entries.map(e => {
      if (!Array.isArray(e)) {
        if (e.tool) {
          const r = findRecipe(prof, e.tool);
          if (!r) report.push(`ERR ${slug}: tool "${e.tool}" not found`);
          return { ...e, recipe: r };
        }
        return e;
      }
      const [from, to, name] = e;
      const r = findRecipe(prof, name);
      if (!r) { report.push(`ERR ${slug}: "${name}" not found in recipes`); return { e, recipe: null }; }
      const learn = Number(r.learn) || 0;
      const grey = Number(r.grey) || 0;
      if (learn > from) report.push(`WARN ${slug}: ${from}-${to} ${name} learn ${learn} > from ${from}`);
      if (grey && grey < to) report.push(`WARN ${slug}: ${from}-${to} ${name} grey at ${grey} < to ${to}`);
      return { e, recipe: r };
    });
  }
  return { out, report };
}

module.exports = { loadData, findRecipe, resolveAll, norm };

if (require.main === module) {
  const data = loadData();
  const spec = require('./routes-spec.cjs');
  const { out, report } = resolveAll(spec, data);
  for (const [slug, steps] of Object.entries(out)) {
    for (const s of steps) {
      if (!s.e || !s.recipe) continue;
      const r = s.recipe;
      console.log(`${slug.padEnd(14)} ${String(s.e[0]).padStart(3)}-${String(s.e[1]).padEnd(3)} ${s.e[2].padEnd(34)} id=${r.id} [${r.learn}/${r.yellow}/${r.green}/${r.grey}] ${r.reagents.map(x => x.count + ' ' + x.name).join(', ')}`);
    }
  }
  console.log('\n' + (report.join('\n') || 'no issues'));
  process.exit(report.some(l => l.startsWith('ERR')) ? 1 : 0);
}
