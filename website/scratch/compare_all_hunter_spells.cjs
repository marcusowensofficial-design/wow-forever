const fs = require('fs');
const file = 'C:/Users/marco/.gemini/antigravity/brain/817e084c-7294-42ef-872e-8fe135c8613a/.system_generated/steps/32/content.md';
const html = fs.readFileSync(file, 'utf8');

const nextChunks = [];
const regex = /self\.__next_f\.push\(\[1,\s*"(.*?)"\]\)/g;
let m;
while ((m = regex.exec(html)) !== null) nextChunks.push(m[1]);
const clean = nextChunks.join('').replace(/\\"/g, '"').replace(/\\\\/g, '\\');

const ourData = JSON.parse(fs.readFileSync('data/forever_changes.json', 'utf8'));
const ourHunterEntries = ourData.entries.filter(e => e.class === 'hunter');

let searchPos = 0;
const fcSpells = [];
while (true) {
  const idIdx = clean.indexOf('"id":"hunter-', searchPos);
  if (idIdx === -1) break;
  let startIdx = clean.lastIndexOf('{', idIdx);
  let depth = 0;
  let endIdx = -1;
  for (let i = startIdx; i < clean.length; i++) {
    if (clean[i] === '{') depth++;
    else if (clean[i] === '}') {
      depth--;
      if (depth === 0) {
        endIdx = i + 1;
        break;
      }
    }
  }
  if (endIdx !== -1) {
    try {
      const obj = JSON.parse(clean.substring(startIdx, endIdx));
      if (obj.name && obj.ranks) {
        fcSpells.push(obj);
      }
    } catch (e) {}
    searchPos = endIdx;
  } else {
    searchPos = idIdx + 10;
  }
}

console.log('FC Hunter spells:', fcSpells.length);

let diffCount = 0;
fcSpells.forEach(fc => {
  const our = ourHunterEntries.find(e => e.name.toLowerCase() === fc.name.toLowerCase());
  if (!our) return;

  // Compare each rank
  fc.ranks.forEach(r => {
    const rNum = String(r.rank);
    const fcForever = r.forever;
    if (!fcForever) return;
    const ourText = our.rank_texts && our.rank_texts[rNum];
    
    // Check if our text contains main stats
    const cost = fcForever.cost;
    const cast = fcForever.cast;
    const cooldown = fcForever.cooldown;
    const range = fcForever.range;
    
    if (ourText) {
      if (cast && cast !== 'Instant' && !ourText.includes(cast)) {
        console.log(`[DIFF CAST] ${fc.name} Rank ${rNum}: FC cast "${cast}" vs OUR: "${ourText}"`);
        diffCount++;
      }
      if (cooldown && !ourText.includes(cooldown)) {
        console.log(`[DIFF CD] ${fc.name} Rank ${rNum}: FC cd "${cooldown}" vs OUR: "${ourText}"`);
        diffCount++;
      }
    }
  });
});

console.log('Total potential differences flagged:', diffCount);
