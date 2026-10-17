const fs = require('fs');
const file = 'C:/Users/marco/.gemini/antigravity/brain/817e084c-7294-42ef-872e-8fe135c8613a/.system_generated/steps/132/content.md';
const html = fs.readFileSync(file, 'utf8');

const nextChunks = [];
const regex = /self\.__next_f\.push\(\[1,\s*"(.*?)"\]\)/g;
let m;
while ((m = regex.exec(html)) !== null) nextChunks.push(m[1]);
const clean = nextChunks.join('').replace(/\\"/g, '"').replace(/\\\\/g, '\\');

console.log('Clean length:', clean.length);
console.log('Contains 250498:', clean.includes('250498'));
console.log("Contains Veteran's Chain Helm:", clean.includes("Veteran's Chain Helm"));

// Let's find Head slot in HTML
const headIdx = html.indexOf('id="slot-head"');
if (headIdx !== -1) {
  console.log('HTML Head section:');
  console.log(html.substring(headIdx, headIdx + 1200));
}
