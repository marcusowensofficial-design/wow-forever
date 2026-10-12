const fs = require('fs');
const vm = require('vm');

const jsCode = fs.readFileSync('js/data/professions-data.js', 'utf8');
const sandbox = { window: {} };
vm.createContext(sandbox);
vm.runInContext(jsCode, sandbox);
const mining = sandbox.window.WOW_PROFESSIONS_DATA.mining;

console.log('Mining recipes in professions-data.js:');
console.table(mining.recipes.map(r => ({
  id: r.id,
  name: r.name,
  learn: r.learn,
  yellow: r.yellow,
  green: r.green,
  grey: r.grey,
  isNew: r.isNew,
  reagents: r.reagents?.map(m => `${m.count}x ${m.name}`).join(', ')
})));
