const fs = require('fs');

const html = fs.readFileSync('C:/Users/marco/.gemini/antigravity-ide/brain/a3609b6e-2221-4ccb-ae94-18127d24d6d2/.system_generated/steps/229/content.md', 'utf8');

// Find all self.__next_f.push([1, "..."])
const fRegex = /self\.__next_f\.push\(\[1,"([\s\S]*?)"\]\)/g;
let match;
let fullRsc = '';

while ((match = fRegex.exec(html)) !== null) {
  // unescape JS string
  let str = match[1];
  try {
    str = JSON.parse('"' + str + '"');
  } catch (e) {
    // raw replacement
    str = str.replace(/\\"/g, '"').replace(/\\n/g, '\n').replace(/\\\\/g, '\\');
  }
  fullRsc += str;
}

console.log('Total RSC payload length:', fullRsc.length);
fs.writeFileSync('scratch/fc_enchanting_rsc.txt', fullRsc);

// Search for recipe-like names or data objects in RSC
const nameMatches = [];
const nameRegex = /"name":"([^"]+)"/g;
let nm;
while ((nm = nameRegex.exec(fullRsc)) !== null) {
  nameMatches.push(nm[1]);
}
console.log('Total "name" fields in RSC:', nameMatches.length);
console.log('Sample names:', nameMatches.slice(0, 20));

// Search for enchants specifically
const enchants = nameMatches.filter(n => n.startsWith('Enchant ') || n.includes('Enchant'));
console.log('Enchant matches in RSC:', enchants.length);
