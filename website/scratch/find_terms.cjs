const fs = require('fs');

const file = 'C:/Users/marco/.gemini/antigravity-ide/brain/f0a6c862-566a-4448-8f6e-440d4a3e2b51/.system_generated/steps/479/output.txt';
const data = JSON.parse(fs.readFileSync(file, 'utf8'));
const fullStr = data.rawHtml;

console.log('fullStr length:', fullStr.length);

const terms = [
  'WARRIOR CHANGES',
  'Warrior changes',
  'Arms adds Spearing Strike',
  'Spearing Strike',
  'Bloodthrill',
  'Weaponmaster',
  'Gore Drinker',
  'Raging Blows'
];

for (const t of terms) {
  const idx = fullStr.indexOf(t);
  console.log(`Term "${t}": index = ${idx}`);
  if (idx !== -1) {
    console.log(`Context around "${t}":\n`, fullStr.substring(Math.max(0, idx - 100), idx + 200));
  }
}
