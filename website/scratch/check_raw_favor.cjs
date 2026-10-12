const fs = require('fs');

const bsData = JSON.parse(fs.readFileSync('scratch/fc_bs_data.json', 'utf8'));

const f251426 = bsData.favor.find(f => f.id == 251426);
const f271622 = bsData.favor.find(f => f.id == 271622);

console.log('f251426 raw object:', f251426);
console.log('f271622 raw object:', f271622);

// Check if there are other fields in favor
console.log('First 5 favor raw objects:');
console.log(bsData.favor.slice(0, 5));
