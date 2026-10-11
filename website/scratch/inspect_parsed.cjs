const fs = require('fs');

const rsc = fs.readFileSync('scratch/changes_rsc.txt', 'utf8');
const lines = rsc.split('\n');
const line43 = lines[43];

const jsonStart = line43.indexOf('{');
const jsonEnd = line43.lastIndexOf('}');
const parsed = JSON.parse(line43.substring(jsonStart, jsonEnd + 1));

// Let's traverse parsed to find props, entries, etc.
function findKey(obj, key, maxDepth = 10, currentDepth = 0) {
  if (!obj || currentDepth > maxDepth) return null;
  if (typeof obj === 'object') {
    if (obj[key]) return obj[key];
    for (const k of Object.keys(obj)) {
      const found = findKey(obj[k], key, maxDepth, currentDepth + 1);
      if (found) return found;
    }
  }
  return null;
}

const entries = findKey(parsed, 'entries');
console.log('Found entries:', Array.isArray(entries), entries?.length);

if (entries) {
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

// Let's also search for class summaries / descriptions / stats in the RSC stream
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('WARRIOR CHANGES IN WOW FOREVER') || lines[i].includes('Spearing Strike, Bloodthrill')) {
    console.log(`Class summary in Line ${i}:`, lines[i].substring(0, 300));
  }
}
