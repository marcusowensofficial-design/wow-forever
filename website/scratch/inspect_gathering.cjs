const fs = require('fs');
const vm = require('vm');

const jsCode = fs.readFileSync('js/data/professions-data.js', 'utf8');
const sandbox = { window: {} };
vm.createContext(sandbox);
vm.runInContext(jsCode, sandbox);
const profs = sandbox.window.WOW_PROFESSIONS_DATA;

['herbalism', 'skinning', 'fishing'].forEach(slug => {
  const p = profs[slug];
  console.log(`\n=== ${slug.toUpperCase()} ===`);
  console.log('Top keys:', Object.keys(p));
  if (p.nodes) console.log('Nodes count:', p.nodes.length);
  if (p.fishingWaters) console.log('Fishing waters count:', p.fishingWaters.length);
  if (p.fishingLures) console.log('Fishing lures count:', p.fishingLures.length);
  if (p.ranks) console.log('Ranks count:', p.ranks.length);
  if (p.leveling) console.log('Leveling count:', p.leveling.length);
  if (p.campPerks) console.log('Camp perks count:', p.campPerks.length);
});
