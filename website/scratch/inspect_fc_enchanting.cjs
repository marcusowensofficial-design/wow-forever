const fs = require('fs');

const html = fs.readFileSync('C:/Users/marco/.gemini/antigravity-ide/brain/a3609b6e-2221-4ccb-ae94-18127d24d6d2/.system_generated/steps/229/content.md', 'utf8');

// Find all cr-row or items
const rowRegex = /<li class="cr-row">([\s\S]*?)<\/li>/g;
let match;
const recipes = [];

while ((match = rowRegex.exec(html)) !== null) {
  const rowHtml = match[1];
  const nameMatch = rowHtml.match(/<span class="cr-name[^"]*">([^<]+)<\/span>/);
  const name = nameMatch ? nameMatch[1].trim() : 'Unknown';
  
  const isNew = rowHtml.includes('v2-tag v2-kind-added');
  
  const skillMatch = rowHtml.match(/class="en3-skill[^"]*"[^>]*>(\d+)<\/span>/);
  const skill = skillMatch ? parseInt(skillMatch[1], 10) : null;
  
  const srcMatch = rowHtml.match(/class="cr-src">([\s\S]*?)<\/span><\/li>/) || rowHtml.match(/class="cr-src">([\s\S]*?)<\/span>/);
  const src = srcMatch ? srcMatch[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim() : '';

  recipes.push({ name, isNew, skill, src });
}

console.log('Total recipes found in FC Enchanting page:', recipes.length);
console.log('New recipes count:', recipes.filter(r => r.isNew).length);

// Also look for relics/wands section or other sections
const sections = [];
const secRegex = /<section id="([^"]+)"/g;
let sMatch;
while ((sMatch = secRegex.exec(html)) !== null) {
  sections.push(sMatch[1]);
}
console.log('Sections found:', sections);

// Let's write the parsed recipes to a scratch file
fs.writeFileSync('scratch/fc_enchanting_parsed.json', JSON.stringify(recipes, null, 2));
console.log('Saved to scratch/fc_enchanting_parsed.json');
