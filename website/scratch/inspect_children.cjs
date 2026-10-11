const fs = require('fs');

const rsc = fs.readFileSync('scratch/changes_rsc.txt', 'utf8');
const lines = rsc.split('\n');
const line43 = lines[43];

const jsonStart = line43.indexOf('{');
const jsonEnd = line43.lastIndexOf('}');
const parsed = JSON.parse(line43.substring(jsonStart, jsonEnd + 1));

console.log('parsed keys:', Object.keys(parsed));
console.log('children isArray:', Array.isArray(parsed.children), parsed.children.length);

// Let's print out the children structure
console.log('children[0]:', parsed.children[0]);
console.log('children[0][3] keys:', parsed.children[0][3] ? Object.keys(parsed.children[0][3]) : null);

if (parsed.children[0][3] && parsed.children[0][3].entries) {
  const entries = parsed.children[0][3].entries;
  console.log('Total entries:', entries.length);
  fs.writeFileSync('scratch/all_changes_entries.json', JSON.stringify(entries, null, 2));

  const classes = {};
  const kinds = {};
  const changeKinds = {};
  for (const item of entries) {
    classes[item.class] = (classes[item.class] || 0) + 1;
    kinds[item.kind] = (kinds[item.kind] || 0) + 1;
    changeKinds[item.reported_change_kind] = (changeKinds[item.reported_change_kind] || 0) + 1;
  }
  console.log('Classes count:', classes);
  console.log('Kinds count:', kinds);
  console.log('Change kinds count:', changeKinds);
  console.log('\nSample entry #0:', JSON.stringify(entries[0], null, 2));
}
