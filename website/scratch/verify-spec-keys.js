import fs from 'node:fs';

const raw = fs.readFileSync('js/data/spec-coach-data.js', 'utf8');
const jsonStart = raw.indexOf('{');
const jsonEnd = raw.lastIndexOf('}');
const coachData = JSON.parse(raw.slice(jsonStart, jsonEnd + 1));

const classIds = ['druid', 'hunter', 'mage', 'paladin', 'priest', 'rogue', 'shaman', 'warlock', 'warrior'];
let matchCount = 0;
let totalSpecs = 0;

for (const cid of classIds) {
  const file = `js/data/deepdives/${cid}.js`;
  const content = fs.readFileSync(file, 'utf8');
  const specMatches = [...content.matchAll(/specId:\s*['"]([^'"]+)['"]/g)].map(m => m[1]);
  const uniqueSpecs = [...new Set(specMatches)];
  for (const s of uniqueSpecs) {
    totalSpecs++;
    let key = `${cid}-${s.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
    // handle slight variations
    if (key === 'hunter-bm') key = 'hunter-beast-mastery';
    if (key === 'hunter-marks') key = 'hunter-marksmanship';
    if (key === 'druid-feral-tank' || key === 'druid-feral-dps') key = 'druid-feral';

    if (coachData[key]) {
      matchCount++;
    } else {
      console.warn(`✗ Missing key for ${cid} ${s}: ${key}`);
    }
  }
}

console.log(`Matched ${matchCount} of ${totalSpecs} specs against spec coach data!`);
