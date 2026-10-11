const fs = require('fs');

const file = 'C:/Users/marco/.gemini/antigravity-ide/brain/f0a6c862-566a-4448-8f6e-440d4a3e2b51/.system_generated/steps/479/output.txt';
const data = JSON.parse(fs.readFileSync(file, 'utf8'));

fs.writeFileSync('scratch/changes_markdown.md', data.markdown || '');
console.log('Saved markdown, length:', data.markdown?.length);

// Print first 2000 chars of markdown
console.log('Markdown snippet:\n', (data.markdown || '').substring(0, 2000));
