const fs = require('fs');
const vm = require('vm');

const jsCode = fs.readFileSync('js/data/professions-data.js', 'utf8');
const sandbox = { window: {} };
vm.createContext(sandbox);
vm.runInContext(jsCode, sandbox);
const jsData = sandbox.window.WOW_PROFESSIONS_DATA;

const jsonData = JSON.parse(fs.readFileSync('data/forever_professions.json', 'utf8'));

const jsKeys = Object.keys(jsData);
const jsonKeys = Object.keys(jsonData);

console.log('Professions in JS:', jsKeys.length);
console.log('Professions in JSON:', jsonKeys.length);

const allProfSlugs = Array.from(new Set([...jsKeys, ...jsonKeys]));

const summary = [];

allProfSlugs.forEach(slug => {
  const jsP = jsData[slug] || {};
  const jsonP = jsonData[slug] || {};

  const jsRecCount = (jsP.recipes || []).length;
  const jsonRecCount = (jsonP.recipes || []).length;

  const jsFavorCount = (jsP.favor?.recipes || []).length;
  const jsonFavorCount = (jsonP.favor?.recipes || []).length;

  const jsHasShopping = !!jsP.shopping;
  const jsonHasShopping = !!jsonP.shopping;

  const jsHasCampPerks = !!jsP.campPerks;
  const jsonHasCampPerks = !!jsonP.campPerks;

  const jsHasSynergy = !!jsP.synergy;
  const jsonHasSynergy = !!jsonP.synergy;

  summary.push({
    slug,
    recipes: `${jsRecCount} / ${jsonRecCount}`,
    favor: `${jsFavorCount} / ${jsonFavorCount}`,
    shopping: `${jsHasShopping} / ${jsonHasShopping}`,
    campPerks: `${jsHasCampPerks} / ${jsonHasCampPerks}`,
    synergy: `${jsHasSynergy} / ${jsonHasSynergy}`
  });
});

console.table(summary);
