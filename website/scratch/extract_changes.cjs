const fs = require('fs');

const file = 'C:/Users/marco/.gemini/antigravity-ide/brain/f0a6c862-566a-4448-8f6e-440d4a3e2b51/.system_generated/steps/479/output.txt';
const data = JSON.parse(fs.readFileSync(file, 'utf8'));
const html = data.rawHtml;

const regex = /self\.__next_f\.push\(\[\d+,\s*"([\s\S]*?)"\]\)/g;
let match;
let combined = '';

while ((match = regex.exec(html)) !== null) {
  try {
    const unescaped = JSON.parse('"' + match[1] + '"');
    combined += unescaped;
  } catch (err) {
    // try direct replacement
    combined += match[1].replace(/\\"/g, '"').replace(/\\\\/g, '\\');
  }
}

console.log('Combined length:', combined.length);
fs.writeFileSync('scratch/changes_rsc.txt', combined);

console.log('Contains "Warrior":', combined.includes('Warrior'));
console.log('Contains "Spearing Strike":', combined.includes('Spearing Strike'));
console.log('Contains "Improved Heroic Strike":', combined.includes('Improved Heroic Strike'));
console.log('Contains "753":', combined.includes('753'));
