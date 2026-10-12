const fs = require('fs');
const vm = require('vm');

const jsCode = fs.readFileSync('js/data/professions-data.js', 'utf8');
const sandbox = { window: {} };
vm.createContext(sandbox);
vm.runInContext(jsCode, sandbox);
const profs = sandbox.window.WOW_PROFESSIONS_DATA;

let realTotalRecipes = 0;
let realTotalNew = 0;
let realTotalFavor = 0;

for (const [slug, data] of Object.entries(profs)) {
  const recs = data.recipes || [];
  const favor = data.favor?.recipes || [];
  const newCount = recs.filter(r => r.isNew).length;
  
  realTotalRecipes += recs.length;
  realTotalNew += newCount;
  realTotalFavor += favor.length;

  console.log(`${slug.padEnd(15)} | recipes: ${String(recs.length).padStart(4)} (new: ${String(newCount).padStart(3)}) | favor: ${String(favor.length).padStart(3)}`);
}

console.log('---------------------------------------------------------');
console.log(`REAL TOTALS: recipes = ${realTotalRecipes} | new = ${realTotalNew} | favor = ${realTotalFavor}`);
console.log(`HARDCODED IN JS: recipes = 2185 | new = 926 | favor = 317`);
console.log(`Discrepancy: recipes diff = ${realTotalRecipes - 2185}, new diff = ${realTotalNew - 926}, favor diff = ${realTotalFavor - 317}`);
