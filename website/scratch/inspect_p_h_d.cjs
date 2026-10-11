const fs = require('fs');

for (const c of ['paladin', 'hunter', 'druid']) {
  const md = fs.readFileSync(`scratch/class_${c}.md`, 'utf8');
  console.log(`=== ${c} lines 1-35 ===`);
  console.log(md.split('\n').slice(0, 35).join('\n'));
}
