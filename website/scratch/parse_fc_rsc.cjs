const fs = require('fs');

const rsc = fs.readFileSync('scratch/fc_enchanting_rsc.txt', 'utf8');

// Find all JSON arrays or objects in RSC
// Next.js RSC streams components and data props. Let's find props containing enchants or recipes
const jsCode = fs.readFileSync('js/data/professions-data.js', 'utf8');
const vm = require('vm');
const sandbox = { window: {} };
vm.createContext(sandbox);
vm.runInContext(jsCode, sandbox);
const myEnchanting = sandbox.window.WOW_PROFESSIONS_DATA.enchanting;

console.log('Our Enchanting recipe count:', myEnchanting.recipes.length);
console.log('Our Enchanting favor count:', myEnchanting.favor?.recipes?.length || 0);

// Let's search for all formula names or enchants in RSC
// Let's regex match objects with "name": "...", "skill": ..., or similar
const recipeObjects = [];
// Match patterns like {"id":...,"name":"...","skill":...} or similar
const reg = /\{[^{}]*"name":"([^"]+)"[^{}]*\}/g;
let m;
const allNames = new Set();
while ((m = reg.exec(rsc)) !== null) {
  try {
    const obj = JSON.parse(m[0]);
    if (obj.name && (obj.skill !== undefined || obj.slot || obj.reagents || obj.cost || obj.mats)) {
      recipeObjects.push(obj);
      allNames.add(obj.name);
    }
  } catch (e) {}
}

console.log('Extracted recipe-like objects with single-level regex:', recipeObjects.length);
console.log('Unique recipe names found:', allNames.size);

// Let's do a more flexible JSON structure extraction
// In RSC, arrays of enchants are often passed as props: e.g. enchants:[{...}] or items:[{...}]
const enchantsPropMatch = rsc.match(/enchants":\s*(\[[^\]]+\])/);
console.log('enchants prop match?', !!enchantsPropMatch);

// Let's search for where "Enchant Cloak - " or "Formula: " appears
const sampleSearch = [];
const lines = rsc.split('\n');
for (let line of lines) {
  if (line.includes('Enchant Cloak -') || line.includes('Formula: Enchant')) {
    sampleSearch.push(line.slice(0, 300));
  }
}
console.log('Sample matching lines count:', sampleSearch.length);
if (sampleSearch.length > 0) {
  console.log('Sample line preview:', sampleSearch[0]);
}

