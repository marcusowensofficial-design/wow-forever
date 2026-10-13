const fs = require('fs');
const path = 'C:/Users/marco/.gemini/antigravity-ide/brain/5f0f91da-716b-4c81-97b7-e91f7dc8db47/.system_generated/steps/67/content.md';
const text = fs.readFileSync(path, 'utf8');

const regex = /href="(\/dungeons\/[a-z0-9-]+)"/gi;
const slugs = new Set();
let match;
while ((match = regex.exec(text)) !== null) {
  slugs.add(match[1]);
}
console.log('Total dungeons discovered:', slugs.size);
console.log(Array.from(slugs));
