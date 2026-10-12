const fs = require('fs');
const vm = require('vm');

const jsCode = fs.readFileSync('js/data/professions-data.js', 'utf8');
const sandbox = { window: {} };
vm.createContext(sandbox);
vm.runInContext(jsCode, sandbox);
const profs = sandbox.window.WOW_PROFESSIONS_DATA;

const jsonProf = JSON.parse(fs.readFileSync('data/forever_professions.json', 'utf8'));

console.log('=== GLOBAL PROFESSIONS AUDIT ===\n');

for (const [profKey, profData] of Object.entries(profs)) {
  console.log(`>>> Profession: ${profKey.toUpperCase()}`);
  const recipes = profData.recipes || [];
  const favorRecipes = profData.favor?.recipes || [];
  const leveling = profData.leveling || [];

  console.log(`  Recipes count: ${recipes.length} | Favor count: ${favorRecipes.length} | Leveling steps: ${leveling.length}`);

  // 1. Check for dummy / placeholder names
  const dummyInRecipes = recipes.filter(r => 
    !r.name || r.name.toLowerCase().includes('favor recipe') || r.name.toLowerCase().includes('unknown')
  );
  if (dummyInRecipes.length > 0) {
    console.log(`  [DUMMY IN RECIPES] Found ${dummyInRecipes.length} dummy recipes:`, dummyInRecipes.map(r => ({ id: r.id, name: r.name })));
  }

  const dummyInFavor = favorRecipes.filter(r => 
    !r.name || r.name.toLowerCase().includes('favor recipe') || r.name.toLowerCase().includes('unknown')
  );
  if (dummyInFavor.length > 0) {
    console.log(`  [DUMMY IN FAVOR] Found ${dummyInFavor.length} dummy favor items:`, dummyInFavor.map(r => ({ id: r.id, name: r.name, cost: r.cost })));
  }

  // 2. Check Favor items missing from main recipes
  const missingFromMain = [];
  favorRecipes.forEach(f => {
    const fName = (f.name || '').toLowerCase()
      .replace(/^(formula|plans|schematic|pattern|recipe):\s*/i, '')
      .trim();
    if (!fName || fName === 'favor recipe') return;

    const found = recipes.some(r => {
      const rName = (r.name || '').toLowerCase()
        .replace(/^(formula|plans|schematic|pattern|recipe):\s*/i, '')
        .trim();
      return rName === fName || rName.includes(fName) || fName.includes(rName);
    });

    if (!found) {
      missingFromMain.push({ id: f.id, name: f.name, cost: f.cost, req: f.requiredSkill });
    }
  });

  if (missingFromMain.length > 0) {
    console.log(`  [FAVOR MISSING FROM RECIPES] ${missingFromMain.length} items in favor but not in recipes:`);
    console.table(missingFromMain);
  }

  // 3. Compare with data/forever_professions.json
  const jsonProfData = jsonProf[profKey];
  if (!jsonProfData) {
    console.log(`  [SYNC ERROR] Missing from data/forever_professions.json completely!`);
  } else {
    const jsonRecCount = jsonProfData.recipes?.length || 0;
    const jsonFavorCount = jsonProfData.favor?.recipes?.length || 0;
    if (jsonRecCount !== recipes.length) {
      console.log(`  [DRIFT] Recipe count mismatch: js=${recipes.length} vs json=${jsonRecCount}`);
    }
    if (jsonFavorCount !== favorRecipes.length) {
      console.log(`  [DRIFT] Favor count mismatch: js=${favorRecipes.length} vs json=${jsonFavorCount}`);
    }
    if (!jsonProfData.shopping && profData.shopping) {
      console.log(`  [DRIFT] json missing 'shopping' list`);
    }
    if (!jsonProfData.campPerks && profData.campPerks) {
      console.log(`  [DRIFT] json missing 'campPerks'`);
    }
  }
  console.log('');
}
