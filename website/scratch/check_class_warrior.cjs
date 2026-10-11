const fs = require('fs');

const file = 'C:/Users/marco/.gemini/antigravity-ide/brain/f0a6c862-566a-4448-8f6e-440d4a3e2b51/.system_generated/steps/549/output.txt';
const data = JSON.parse(fs.readFileSync(file, 'utf8'));

console.log('Markdown length:', data.markdown?.length);
console.log('Markdown sample:\n', data.markdown?.substring(0, 1500));
