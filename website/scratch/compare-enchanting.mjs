import fs from 'node:fs';
import vm from 'node:vm';

const fcHtml = fs.readFileSync('C:/Users/marco/.gemini/antigravity-ide/brain/a3609b6e-2221-4ccb-ae94-18127d24d6d2/.system_generated/steps/99/content.md', 'utf8');
const jsCode = fs.readFileSync('js/data/professions-data.js', 'utf8');

const sandbox = { window: {} };
vm.createContext(sandbox);
vm.runInContext(jsCode, sandbox);

const myEnc = sandbox.window.WOW_PROFESSIONS_DATA.enchanting.recipes;
const myNames = new Set(myEnc.map(r => r.name.toLowerCase().trim()));

const regex = /<span class="cr-name[^"]*">([^<]+)<\/span>/g;
let match;
const fcNames = new Set();
while ((match = regex.exec(fcHtml)) !== null) {
  fcNames.add(match[1].trim());
}

console.log('Total recipe names extracted from ForeverChanges HTML:', fcNames.size);
console.log('Total recipe names in our site:', myEnc.length);

const missingInMine = [];
fcNames.forEach(name => {
  const nLow = name.toLowerCase();
  const found = myEnc.some(r => {
    const rn = r.name.toLowerCase();
    return rn === nLow || rn.includes(nLow) || nLow.includes(rn);
  });
  if (!found) {
    missingInMine.push(name);
  }
});

console.log('Missing in our site (' + missingInMine.length + '):', missingInMine);
