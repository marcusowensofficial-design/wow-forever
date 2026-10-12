const fs = require('fs');

const fcData = JSON.parse(fs.readFileSync('scratch/fc_enchanting_data.json', 'utf8'));

console.log('Sample FC enchant:', fcData.enchants[0]);
console.log('Sample FC crafted:', fcData.crafted[0]);

// Check crafted items schema
for (let i = 0; i < Math.min(5, fcData.crafted.length); i++) {
  console.log(`Crafted ${i}:`, fcData.crafted[i]);
}
