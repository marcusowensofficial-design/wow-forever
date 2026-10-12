import fs from 'node:fs';

const fcHtml = fs.readFileSync('C:/Users/marco/.gemini/antigravity-ide/brain/a3609b6e-2221-4ccb-ae94-18127d24d6d2/.system_generated/steps/99/content.md', 'utf8');

// Check for JSON script tags
const nextDataMatch = fcHtml.match(/<script id="__NEXT_DATA__"[^>]*>([\s\S]*?)<\/script>/);
if (nextDataMatch) {
  console.log('Found __NEXT_DATA__ length:', nextDataMatch[1].length);
} else {
  console.log('No __NEXT_DATA__ found, checking for self.__next_f or other embeds');
  const fMatches = fcHtml.match(/self\.__next_f\.push\(\[1,"([^"]+)"\]\)/g);
  console.log('Found next_f pushes:', fMatches ? fMatches.length : 0);
}

// Let's search for "Enchant " in fcHtml
const allEnchants = new Set();
const reg = /"name":"(Enchant [^"]+)"/g;
let m;
while ((m = reg.exec(fcHtml)) !== null) {
  allEnchants.add(m[1]);
}
console.log('Enchant matches via "name":"Enchant...":', allEnchants.size);

// Also search for cr-name in full html
const crRegex = /class="cr-name[^"]*">([^<]+)<\/span>/g;
let crMatch;
const crNames = new Set();
while ((crMatch = crRegex.exec(fcHtml)) !== null) {
  crNames.add(crMatch[1]);
}
console.log('cr-name matches in full HTML:', crNames.size);
for (const n of Array.from(crNames).slice(0, 15)) {
  console.log(' -', n);
}
