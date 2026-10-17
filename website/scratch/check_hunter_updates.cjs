const fs = require('fs');
const file = 'C:/Users/marco/.gemini/antigravity/brain/817e084c-7294-42ef-872e-8fe135c8613a/.system_generated/steps/32/content.md';
const html = fs.readFileSync(file, 'utf8');

const nextChunks = [];
const regex = /self\.__next_f\.push\(\[1,\s*"(.*?)"\]\)/g;
let m;
while ((m = regex.exec(html)) !== null) nextChunks.push(m[1]);
const clean = nextChunks.join('').replace(/\\"/g, '"').replace(/\\\\/g, '\\');

const matches = [...clean.matchAll(/70425/g)];
console.log('Total 70425 occurrences:', matches.length);
matches.forEach((match, i) => {
  console.log(`Match ${i+1}:`);
  console.log(clean.substring(Math.max(0, match.index - 100), Math.min(clean.length, match.index + 150)));
});
