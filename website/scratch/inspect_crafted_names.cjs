const fs = require('fs');

const fcData = JSON.parse(fs.readFileSync('scratch/fc_enchanting_data.json', 'utf8'));

const craftedWithNames = fcData.crafted.map(c => {
  const item = fcData.items[c.id] || {};
  return {
    id: c.id,
    spell: c.spell,
    name: item.n || 'Unknown',
    quality: item.q,
    isNew: c.isNew,
    learn: c.learn
  };
});

console.log('Crafted items (all 51):');
console.table(craftedWithNames);

// Now let's compare with our site!
const jsCode = fs.readFileSync('js/data/professions-data.js', 'utf8');
const vm = require('vm');
const sandbox = { window: {} };
vm.createContext(sandbox);
vm.runInContext(jsCode, sandbox);
const myEnc = sandbox.window.WOW_PROFESSIONS_DATA.enchanting;

const missingCrafted = [];
craftedWithNames.forEach(c => {
  const cName = c.name.toLowerCase().trim();
  const found = myEnc.recipes.some(r => {
    const rName = r.name.toLowerCase().trim();
    return rName === cName || 
           rName.replace('formula: ', '') === cName || 
           rName.includes(cName);
  });
  if (!found) {
    // Check if in favor
    const inFavor = myEnc.favor?.recipes?.some(f => f.name.toLowerCase().includes(cName));
    missingCrafted.push({ ...c, inFavor });
  }
});

console.log('Crafted missing from our recipes array:', missingCrafted.length);
console.table(missingCrafted);

