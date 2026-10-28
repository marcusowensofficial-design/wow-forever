import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';

const ctx = { window: {} };
vm.createContext(ctx);
const dungCode = fs.readFileSync('js/data/dungeons-data.js', 'utf8');
vm.runInContext(dungCode, ctx);

const guides = ctx.window.WOW_DUNGEON_GUIDES;
console.log('Validating', guides.length, 'dungeon guides...');

let totalImgs = 0;
let missingImgs = 0;

for (const g of guides) {
  const matches = [...g.content.matchAll(/src=["'](images\/[^"']+)["']/g)].map(m => m[1]);
  for (const relPath of matches) {
    totalImgs++;
    if (!fs.existsSync(relPath)) {
      console.error('MISSING:', relPath, 'in guide', g.id);
      missingImgs++;
    } else {
      const size = fs.statSync(relPath).size;
      if (size === 0) {
        console.error('EMPTY:', relPath, 'in guide', g.id);
        missingImgs++;
      }
    }
  }
}

console.log('Checked', totalImgs, 'local image references. Missing/Empty:', missingImgs);
if (missingImgs > 0) process.exit(1);
