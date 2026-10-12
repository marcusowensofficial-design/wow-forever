const fs = require('fs');

const jsPath = 'js/data/professions-data.js';
const jsonPath = 'data/forever_professions.json';

const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

const certs = [
  { prof: 'alchemy', id: 271621, name: 'Alchemy Certification', title: 'The Alchemist', icon: 'inv_scroll_15' },
  { prof: 'blacksmithing', id: 271622, name: 'Blacksmithing Certification', title: 'The Blacksmith', icon: 'inv_scroll_15' },
  { prof: 'engineering', id: 271625, name: 'Engineering Certification', title: 'The Engineer', icon: 'inv_scroll_15' },
  { prof: 'leatherworking', id: 271626, name: 'Leatherworking Certification', title: 'The Leatherworker', icon: 'inv_scroll_15' },
  { prof: 'tailoring', id: 271627, name: 'Tailoring Certification', title: 'The Tailor', icon: 'inv_scroll_15' }
];

certs.forEach(c => {
  const profObj = data[c.prof];
  if (profObj && profObj.recipes) {
    if (!profObj.recipes.some(r => r.id === c.id)) {
      profObj.recipes.push({
        id: c.id,
        name: c.name,
        icon: c.icon,
        quality: 2,
        learn: 300,
        yellow: 300,
        green: 300,
        grey: 300,
        isNew: true,
        effect: `Unlocks the account-wide title '${c.title}' upon achieving 300 skill in ${profObj.name}.`,
        reagents: [],
        source: "Merchant's Favor (1,000 Favor)"
      });
      console.log(`Added ${c.name} to ${c.prof}.recipes`);
    }
  }
});

fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2), 'utf8');
const jsCode = `/**
 * World of Warcraft: Forever - Complete Professions, Leveling & Trade Economy Dataset
 * Synchronized with ForeverChanges.pro, Wowhead (Env 16), and WoW Forever Tools consensus.
 */

window.WOW_PROFESSIONS_DATA = ${JSON.stringify(data, null, 2)};
`;
fs.writeFileSync(jsPath, jsCode, 'utf8');
console.log('Synchronized both files with Master Certifications in all recipes arrays!');
