const fs = require('fs');

const bsData = JSON.parse(fs.readFileSync('scratch/fc_bs_data.json', 'utf8'));

console.log('BS Favor count:', bsData.favor?.length || 0);

// Search for 251426 and 271622 in items and favor
console.log('Item 251426:', bsData.items?.['251426']);
console.log('Item 271622:', bsData.items?.['271622']);

// Look at all favor items in BS
const favorItems = bsData.favor.map(f => {
  const item = bsData.items?.[f.id] || {};
  return {
    id: f.id,
    name: item.n || f.name,
    favor: f.favor,
    skill: f.skill
  };
});

console.log('Blacksmithing Favor items containing 251426 or 271622:');
favorItems.forEach(f => {
  if (f.id == 251426 || f.id == 271622) {
    console.log(f);
  }
});

// Also check all Favor items in BS for other items
console.log('\nAll BS Favor items count:', favorItems.length);
fs.writeFileSync('scratch/fc_bs_favor.json', JSON.stringify(favorItems, null, 2));

// Compare with our site's Blacksmithing recipes and favor
const jsCode = fs.readFileSync('js/data/professions-data.js', 'utf8');
const vm = require('vm');
const sandbox = { window: {} };
vm.createContext(sandbox);
vm.runInContext(jsCode, sandbox);
const myBs = sandbox.window.WOW_PROFESSIONS_DATA.blacksmithing;

console.log('Our BS recipes count:', myBs.recipes.length);
console.log('Our BS favor count:', myBs.favor?.recipes?.length || 0);

// Check if our BS recipes have dummy items
const dummyInMyBs = myBs.favor?.recipes?.filter(f => f.name.toLowerCase().includes('favor recipe'));
console.log('Dummy in my BS favor:', dummyInMyBs);

