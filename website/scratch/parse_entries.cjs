const fs = require('fs');

const rsc = fs.readFileSync('scratch/changes_rsc.txt', 'utf8');
const lines = rsc.split('\n');
const line43 = lines[43];

// Find where "entries": starts
const entriesIdx = line43.indexOf('"entries":');
console.log('entriesIdx:', entriesIdx);

// Let's parse the JSON from "entries":
// In Next.js RSC, line 43 starts with something like: "d:[...]"
// Let's remove the prefix and parse the JSON.
const jsonStart = line43.indexOf('{');
const jsonEnd = line43.lastIndexOf('}');
const jsonStr = line43.substring(jsonStart, jsonEnd + 1);

let parsed;
try {
  parsed = JSON.parse(jsonStr);
  console.log('Successfully parsed top JSON! Keys:', Object.keys(parsed));
} catch (e) {
  console.log('Top JSON parse failed, extracting entries array specifically...');
  const arrayStart = line43.indexOf('[', entriesIdx);
  // find matching closing bracket for array
  let depth = 0;
  let arrayEnd = -1;
  let inString = false;
  let escape = false;
  for (let i = arrayStart; i < line43.length; i++) {
    const ch = line43[i];
    if (escape) {
      escape = false;
      continue;
    }
    if (ch === '\\') {
      escape = true;
      continue;
    }
    if (ch === '"') {
      inString = !inString;
      continue;
    }
    if (!inString) {
      if (ch === '[') depth++;
      else if (ch === ']') {
        depth--;
        if (depth === 0) {
          arrayEnd = i;
          break;
        }
      }
    }
  }
  console.log('Array extracted from', arrayStart, 'to', arrayEnd);
  const arrStr = line43.substring(arrayStart, arrayEnd + 1);
  const entries = JSON.parse(arrStr);
  console.log('Total entries extracted:', entries.length);
  fs.writeFileSync('scratch/all_changes_entries.json', JSON.stringify(entries, null, 2));

  // Let's inspect classes and kinds
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

  console.log('Sample entry #0:', entries[0]);
}
