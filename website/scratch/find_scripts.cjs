const fs = require('fs');

const file = 'C:/Users/marco/.gemini/antigravity-ide/brain/f0a6c862-566a-4448-8f6e-440d4a3e2b51/.system_generated/steps/479/output.txt';
const data = JSON.parse(fs.readFileSync(file, 'utf8'));
const fullStr = data.rawHtml;

const scriptMatches = [...fullStr.matchAll(/<script[^>]+src="([^">]+\.js)"/g)];
console.log('Scripts found:', scriptMatches.map(m => m[1]));
