const fs = require('fs');
const vm = require('vm');

const jsCode = fs.readFileSync('js/data/professions-data.js', 'utf8');
const sandbox = { window: {} };
vm.createContext(sandbox);
vm.runInContext(jsCode, sandbox);
const enc = sandbox.window.WOW_PROFESSIONS_DATA.enchanting;

const favorItem = enc.favor.recipes.find(r => r.id === 274393);
const recItem = enc.recipes.find(r => r.id === 274393);

console.log('favorItem:', favorItem);
console.log('recItem:', recItem);
