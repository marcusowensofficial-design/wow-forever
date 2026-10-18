import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';

const contentPath = 'C:\\Users\\marco\\.gemini\\antigravity\\brain\\bd43017c-500d-44db-85ca-90eace26a49b\\.system_generated\\steps\\24\\content.md';
const content = fs.readFileSync(contentPath, 'utf8');

const varIdx = content.indexOf('var listviewitems =');
console.log('Index of var listviewitems:', varIdx);
if (varIdx !== -1) {
  // Find where the statement ends (next newline or semicolon before next script/var)
  // Let's find ';var ' or ';\n'
  const semiIdx = content.indexOf(';\n', varIdx);
  const rawJs = content.slice(varIdx + 'var listviewitems ='.length, semiIdx !== -1 ? semiIdx : undefined).trim();
  
  const items = vm.runInNewContext('(' + rawJs + ')');
  console.log(`Successfully parsed ${items.length} items from listviewitems!`);
  console.log('Sample item:', JSON.stringify(items[0], null, 2));

  const outPath = path.resolve('data', 'scraped', 'wowhead_forever_weapons.json');
  fs.writeFileSync(outPath, JSON.stringify(items, null, 2), 'utf8');
  console.log(`Saved items to ${outPath}`);
}
