const fs = require('fs');

const rsc = fs.readFileSync('scratch/changes_rsc.txt', 'utf8');
const lines = rsc.split('\n');
const line43 = lines[43];

const jsonStart = line43.indexOf('{');
const jsonEnd = line43.lastIndexOf('}');
const parsed = JSON.parse(line43.substring(jsonStart, jsonEnd + 1));

console.log('children length:', parsed.children.length);
console.log('children[0] keys:', parsed.children[0] ? Object.keys(parsed.children[0][3] || {}) : null);
console.log('children[1]:', JSON.stringify(parsed.children[1], null, 2)?.substring(0, 500));
console.log('children[2]:', JSON.stringify(parsed.children[2], null, 2)?.substring(0, 500));

// Let's inspect racesByClass
console.log('racesByClass:', JSON.stringify(parsed.children[0][3].racesByClass, null, 2));

// Let's find class summaries across all RSC lines
for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  if (line.includes('WARRIOR CHANGES') || line.includes('PALADIN CHANGES') || line.includes('HUNTER CHANGES') || line.includes('Every Warrior talent')) {
    console.log(`Summary in Line ${i}:`, line.substring(0, 400));
  }
}
