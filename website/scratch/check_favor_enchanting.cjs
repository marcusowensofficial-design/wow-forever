const fs = require('fs');

const fcData = JSON.parse(fs.readFileSync('scratch/fc_enchanting_data.json', 'utf8'));

console.log('FC Favor count:', fcData.favor.length);
console.log('Sample FC favor item:', fcData.favor[0]);

const fcFavorNames = fcData.favor.map(f => {
  const item = fcData.items[f.id] || {};
  return {
    id: f.id,
    cost: f.cost,
    name: item.n || f.name || 'Unknown',
    skill: f.skill
  };
});

console.table(fcFavorNames);

// Now compare with our site's enchanting favor recipes
const jsCode = fs.readFileSync('js/data/professions-data.js', 'utf8');
const vm = require('vm');
const sandbox = { window: {} };
vm.createContext(sandbox);
vm.runInContext(jsCode, sandbox);
const myEnc = sandbox.window.WOW_PROFESSIONS_DATA.enchanting;

console.log('Our enchanting favor recipes count:', myEnc.favor?.recipes?.length || 0);

const missingFavor = [];
fcFavorNames.forEach(f => {
  const fName = f.name.toLowerCase().trim();
  const found = myEnc.favor?.recipes?.some(myF => {
    const myFName = myF.name.toLowerCase().trim();
    return myFName === fName || myFName.replace('formula: ', '') === fName.replace('formula: ', '');
  });
  if (!found) {
    missingFavor.push(f);
  }
});

console.log('Missing Favor in our site:', missingFavor.length);
console.table(missingFavor);

// Now check if any of our site's favor items are NOT in myEnc.recipes!
console.log('\n--- Checking if our favor recipes exist in myEnc.recipes ---');
const favorMissingInRecipes = [];
myEnc.favor?.recipes?.forEach(f => {
  const fName = f.name.toLowerCase().replace('formula: ', '').trim();
  const found = myEnc.recipes.some(r => {
    const rName = r.name.toLowerCase().replace('formula: ', '').trim();
    return rName === fName || rName.includes(fName) || fName.includes(rName);
  });
  if (!found) {
    favorMissingInRecipes.push(f);
  }
});
console.log('Favor items missing from recipes array:', favorMissingInRecipes.length);
console.table(favorMissingInRecipes);

