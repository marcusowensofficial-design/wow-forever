const fs = require('fs');
const vm = require('vm');

const fcData = JSON.parse(fs.readFileSync('scratch/fc_enchanting_data.json', 'utf8'));

const jsCode = fs.readFileSync('js/data/professions-data.js', 'utf8');
const sandbox = { window: {} };
vm.createContext(sandbox);
vm.runInContext(jsCode, sandbox);
const myEnc = sandbox.window.WOW_PROFESSIONS_DATA.enchanting;

console.log('--- FOREVERCHANGES ENCHANTING DATA ---');
console.log('FC enchants count:', fcData.enchants?.length || 0);
console.log('FC crafted count:', fcData.crafted?.length || 0);
console.log('FC favor count:', fcData.favor?.length || 0);
console.log('FC leveling steps:', fcData.leveling?.length || 0);
console.log('FC camps:', fcData.camps?.length || 0);

console.log('\n--- OUR SITE ENCHANTING DATA ---');
console.log('Our recipes count:', myEnc.recipes?.length || 0);
console.log('Our favor recipes count:', myEnc.favor?.recipes?.length || 0);
console.log('Our leveling steps count:', myEnc.leveling?.length || 0);

// Combine FC enchants and crafted into full list of FC recipes
const fcAllRecipes = [...(fcData.enchants || []), ...(fcData.crafted || [])];
console.log('\nTotal FC recipes (enchants + crafted):', fcAllRecipes.length);

// Compare recipe names
const myNames = new Set(myEnc.recipes.map(r => r.name.toLowerCase().trim()));
const missingInOurRecipes = [];

fcAllRecipes.forEach(r => {
  const nLow = r.name.toLowerCase().trim();
  const found = myEnc.recipes.some(myR => {
    const myN = myR.name.toLowerCase().trim();
    return myN === nLow || myN.replace('formula: ', '') === nLow.replace('formula: ', '');
  });
  if (!found) {
    missingInOurRecipes.push({
      id: r.id,
      name: r.name,
      slot: r.slot,
      skill: r.skill,
      added: r.added
    });
  }
});

console.log('\nMissing in our Enchanting recipes:', missingInOurRecipes.length);
console.log(missingInOurRecipes);

// Check if any missing are in our favor
console.log('\nCheck if missing are present in our favor:');
missingInOurRecipes.forEach(m => {
  const inFavor = myEnc.favor?.recipes?.some(f => f.name.toLowerCase().includes(m.name.toLowerCase()));
  console.log(` - ${m.name}: in favor? ${inFavor}`);
});

// Now let's check what's in our site that FC doesn't have
const extraInOurSite = [];
myEnc.recipes.forEach(r => {
  const nLow = r.name.toLowerCase().trim();
  const found = fcAllRecipes.some(fcR => {
    const fcN = fcR.name.toLowerCase().trim();
    return fcN === nLow || fcN.replace('formula: ', '') === nLow.replace('formula: ', '');
  });
  if (!found) {
    extraInOurSite.push(r.name);
  }
});
console.log('\nExtra in our site not in FC (enchants+crafted):', extraInOurSite.length);
console.log('Sample extra in our site:', extraInOurSite.slice(0, 10));

