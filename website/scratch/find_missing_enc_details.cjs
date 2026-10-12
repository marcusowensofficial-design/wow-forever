const fs = require('fs');

const fcData = JSON.parse(fs.readFileSync('scratch/fc_enchanting_data.json', 'utf8'));

const targetIds = [274393, 249529, 249530, 249532, 271624];

console.log('Searching for target formulas in fcData:');
targetIds.forEach(id => {
  const item = fcData.items?.[id];
  console.log(`\nFormula ID ${id}:`, item);
  // Search in enchants
  const enc = fcData.enchants?.find(e => e.formula == id || JSON.stringify(e).includes(String(id)));
  if (enc) console.log('Found in enchants:', enc);
  // Search in crafted
  const cr = fcData.crafted?.find(c => c.taught_by == id || JSON.stringify(c).includes(String(id)));
  if (cr) console.log('Found in crafted:', cr);
});
