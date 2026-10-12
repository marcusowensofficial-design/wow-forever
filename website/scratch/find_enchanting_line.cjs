const fs = require('fs');

const rsc = fs.readFileSync('scratch/fc_enchanting_rsc.txt', 'utf8');
const lines = rsc.split('\n');
console.log('Total lines in RSC:', lines.length);

for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('"slug":"enchanting"')) {
    console.log(`Line ${i} length: ${lines[i].length}`);
    const linePrefix = lines[i].slice(0, 100);
    console.log(`Line ${i} prefix:`, linePrefix);
    // Write this specific line to a file to examine
    fs.writeFileSync('scratch/fc_enchanting_line.txt', lines[i]);
    break;
  }
}
