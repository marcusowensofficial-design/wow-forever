const fs = require('fs');

const fcData = JSON.parse(fs.readFileSync('scratch/fc_enchanting_data.json', 'utf8'));

console.log('Total items in fcData.items:', Object.keys(fcData.items || {}).length);
const sampleKey = Object.keys(fcData.items)[0];
console.log('Sample item key:', sampleKey);
console.log('Sample item:', fcData.items[sampleKey]);

// Let's resolve crafted items with their names from items dictionary
const craftedWithNames = fcData.crafted.map(c => {
  const item = fcData.items[c.id] || {};
  return {
    id: c.id,
    spell: c.spell,
    name: item.name || 'Unknown',
    quality: item.quality,
    isNew: c.isNew,
    learn: c.learn
  };
});

console.log('Crafted items (first 10):');
console.table(craftedWithNames.slice(0, 10));

// Check enchants
console.log('Enchants count:', fcData.enchants.length);
console.log('Enchants isNew count:', fcData.enchants.filter(e => e.isNew).length);

// Compare enchants names with our site
const jsCode = fs.readFileSync('js/data/professions-data.js', 'utf8');
const vm = require('vm');
const sandbox = { window: {} };
vm.createContext(sandbox);
vm.runInContext(jsCode, sandbox);
const myEnc = sandbox.window.WOW_PROFESSIONS_DATA.enchanting;

const missingEnchants = [];
fcData.enchants.forEach(e => {
  const eName = e.name.toLowerCase().trim();
  const found = myEnc.recipes.some(r => {
    const rName = r.name.toLowerCase().trim();
    return rName === eName || 
           rName.replace('formula: ', '') === eName || 
           rName.replace('enchant ', '') === eName.replace('enchant ', '');
  });
  if (!found) {
    missingEnchants.push(e);
  }
});

console.log('Missing Enchants in our site:', missingEnchants.length);
if (missingEnchants.length > 0) {
  console.log(missingEnchants.map(e => ({ name: e.name, group: e.group, isNew: e.isNew, learn: e.learn })));
}

// Compare crafted names with our site
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
    missingCrafted.push(c);
  }
});
console.log('Missing Crafted in our site:', missingCrafted.length);
if (missingCrafted.length > 0) {
  console.log(missingCrafted);
}

