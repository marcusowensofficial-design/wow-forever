import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');
const SCRAPED_DIR = path.join(ROOT, 'data', 'scraped');

const stepFiles = [
  { step: 501, sub: '1H Swords', subId: 7 },
  { step: 505, sub: '1H Axes', subId: 0 },
  { step: 507, sub: '2H Axes', subId: 1 },
  { step: 509, sub: '2H Swords', subId: 8 },
  { step: 511, sub: '1H Maces', subId: 4 },
  { step: 513, sub: '2H Maces', subId: 5 },
  { step: 515, sub: 'Daggers', subId: 15 },
  { step: 517, sub: 'Staves', subId: 10 },
  { step: 519, sub: 'Polearms', subId: 6 },
  { step: 521, sub: 'Bows', subId: 2 },
  { step: 523, sub: 'Guns', subId: 3 },
  { step: 525, sub: 'Crossbows', subId: 18 },
  { step: 527, sub: 'Fist Weapons', subId: 13 },
  { step: 529, sub: 'Wands', subId: 19 },
  { step: 531, sub: 'Thrown', subId: 16 },
  { step: 533, sub: 'Fishing Poles', subId: 20 },
  { step: 535, sub: 'Misc', subId: 14 }
];

const basePath = 'C:\\Users\\marco\\.gemini\\antigravity\\brain\\802021b9-9d5c-4b05-91cb-aa3393ed65cc\\.system_generated\\steps\\';
const allWeapons = new Map();

for (const { step, sub, subId } of stepFiles) {
  const filePath = path.join(basePath, String(step), 'content.md');
  if (!fs.existsSync(filePath)) {
    console.warn(`File not found for step: ${step}`);
    continue;
  }
  const content = fs.readFileSync(filePath, 'utf8');
  const varIdx = content.indexOf('var listviewitems =');
  if (varIdx === -1) {
    console.warn(`listviewitems NOT found for step: ${step} (${sub})`);
    continue;
  }
  const semiIdx = content.indexOf(';\n', varIdx);
  const rawJs = content.slice(varIdx + 'var listviewitems ='.length, semiIdx !== -1 ? semiIdx : undefined).trim();
  const items = vm.runInNewContext('(' + rawJs + ')');
  console.log(`Parsed ${items.length} items from ${sub} (step ${step})`);
  for (const item of items) {
    if (item.id) {
      if (item.subclass === undefined) item.subclass = subId;
      allWeapons.set(item.id, item);
    }
  }
}

const finalWeaponsList = Array.from(allWeapons.values());
finalWeaponsList.sort((a, b) => (a.reqlevel || 0) - (b.reqlevel || 0) || a.name.localeCompare(b.name));

const weaponsOutPath = path.join(SCRAPED_DIR, 'wowhead_forever_weapons.json');
fs.writeFileSync(weaponsOutPath, JSON.stringify(finalWeaponsList, null, 2), 'utf8');
console.log(`\nSuccessfully saved ${finalWeaponsList.length} uncapped weapons to ${weaponsOutPath}!`);

// Compile shields
const shieldsPath = path.join(basePath, '539', 'content.md');
if (fs.existsSync(shieldsPath)) {
  const content = fs.readFileSync(shieldsPath, 'utf8');
  const varIdx = content.indexOf('var listviewitems =');
  if (varIdx !== -1) {
    const semiIdx = content.indexOf(';\n', varIdx);
    const rawJs = content.slice(varIdx + 'var listviewitems ='.length, semiIdx !== -1 ? semiIdx : undefined).trim();
    const shields = vm.runInNewContext('(' + rawJs + ')');
    shields.sort((a, b) => (a.reqlevel || 0) - (b.reqlevel || 0) || a.name.localeCompare(b.name));
    const shieldsOutPath = path.join(SCRAPED_DIR, 'wowhead_forever_shields.json');
    fs.writeFileSync(shieldsOutPath, JSON.stringify(shields, null, 2), 'utf8');
    console.log(`Successfully saved ${shields.length} shields to ${shieldsOutPath}!`);
  }
}
