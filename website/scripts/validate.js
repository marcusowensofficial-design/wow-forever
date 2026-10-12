import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');

let totalChecks = 0;
let errors = [];

function check(title, fn) {
  totalChecks++;
  try {
    fn();
    console.log(`  ✓ ${title}`);
  } catch (err) {
    errors.push({ title, message: err.message });
    console.error(`  ✗ ${title}: ${err.message}`);
  }
}

console.log('\n--- 1. HTML & DOM AUDIT (index.html) ---');

const indexHtmlPath = path.join(ROOT, 'index.html');
const indexHtml = fs.readFileSync(indexHtmlPath, 'utf8');

check('Unique DOM IDs across index.html', () => {
  const idRegex = /id=["']([^"']+)["']/g;
  const ids = new Map();
  let match;
  while ((match = idRegex.exec(indexHtml)) !== null) {
    const id = match[1];
    if (ids.has(id)) {
      ids.set(id, ids.get(id) + 1);
    } else {
      ids.set(id, 1);
    }
  }

  const duplicates = [];
  for (const [id, count] of ids.entries()) {
    if (count > 1) {
      duplicates.push(`${id} (${count}x)`);
    }
  }

  if (duplicates.length > 0) {
    throw new Error(`Duplicate IDs detected: ${duplicates.join(', ')}`);
  }
});

check('All script src references exist on disk', () => {
  const scriptRegex = /<script[^>]+src=["']([^"']+)["']/g;
  let match;
  const missing = [];
  while ((match = scriptRegex.exec(indexHtml)) !== null) {
    const src = match[1];
    if (src.startsWith('http://') || src.startsWith('https://')) continue;
    const cleanSrc = src.split('?')[0];
    const absPath = path.join(ROOT, cleanSrc);
    if (!fs.existsSync(absPath)) {
      missing.push(src);
    }
  }

  if (missing.length > 0) {
    throw new Error(`Referenced scripts missing on disk: ${missing.join(', ')}`);
  }
});

check('Interactive input elements have aria-label or associated label', () => {
  const inputRegex = /<input[^>]+>/g;
  let match;
  const unlabelled = [];
  while ((match = inputRegex.exec(indexHtml)) !== null) {
    const tag = match[0];
    const typeMatch = tag.match(/type=["']([^"']+)["']/);
    const type = typeMatch ? typeMatch[1] : 'text';
    if (type === 'hidden' || type === 'submit' || type === 'button') continue;
    
    const hasAria = /aria-label=["'][^"']+["']/.test(tag) || /aria-labelledby=["'][^"']+["']/.test(tag);
    const idMatch = tag.match(/id=["']([^"']+)["']/);
    const id = idMatch ? idMatch[1] : 'unnamed';
    
    // Check if there is an explicit <label for="id"> in the document
    const hasExplicitLabel = id !== 'unnamed' && new RegExp(`<label[^>]+for=["']${id}["']`).test(indexHtml);

    if (!hasAria && !hasExplicitLabel) {
      unlabelled.push(id);
    }
  }

  if (unlabelled.length > 0) {
    throw new Error(`Inputs missing accessible label: ${unlabelled.join(', ')}`);
  }
});

console.log('\n--- 2. TALENT ENGINE AUDIT (Level 30 Budget & Gating) ---');

const deepdiveDir = path.join(ROOT, 'js', 'data', 'deepdives');
const classFiles = fs.readdirSync(deepdiveDir).filter(f => f.endsWith('.js'));

for (const file of classFiles) {
  check(`Talent build legality for ${file}`, () => {
    const filePath = path.join(deepdiveDir, file);
    const code = fs.readFileSync(filePath, 'utf8');

    // Extract builds array
    const buildsMatch = code.match(/builds:\s*\[([\s\S]*?)\]\s*(?:,\s*\w+:|\})/);
    if (!buildsMatch) return;

    // Match all build objects
    const talentRegex = /talents:\s*['"]([0-9-]*)['"]/g;
    let bMatch;
    while ((bMatch = talentRegex.exec(buildsMatch[1])) !== null) {
      const talentString = bMatch[1];
      const trees = talentString.split('-');
      
      let totalSpent = 0;
      for (const tree of trees) {
        if (!tree) continue;
        let treeSpent = 0;
        for (let i = 0; i < tree.length; i++) {
          const pts = parseInt(tree[i], 10) || 0;
          treeSpent += pts;
        }
        totalSpent += treeSpent;
      }

      if (totalSpent > 26) {
        throw new Error(`Build "${talentString}" in ${file} exceeds Level 30 cap (${totalSpent} > 26 points)`);
      }
    }
  });
}

console.log('\n--- 3. DATA & ASSET INTEGRITY AUDIT ---');

const dataDir = path.join(ROOT, 'data');
const jsonFiles = fs.readdirSync(dataDir).filter(f => f.endsWith('.json'));

for (const jsonFile of jsonFiles) {
  check(`Valid JSON format in data/${jsonFile}`, () => {
    const raw = fs.readFileSync(path.join(dataDir, jsonFile), 'utf8');
    JSON.parse(raw);
  });

  check(`No dead icon CDN domains in data/${jsonFile}`, () => {
    const raw = fs.readFileSync(path.join(dataDir, jsonFile), 'utf8');
    if (raw.includes('foreverchanges.pro/icon/')) {
      throw new Error(`Contains deprecated foreverchanges.pro/icon/ link in data/${jsonFile}`);
    }
  });
}

check('No placeholder unknown or dummy recipes in professions JSON', () => {
  const profRaw = fs.readFileSync(path.join(dataDir, 'forever_professions.json'), 'utf8');
  if (profRaw.includes('"name": "Unknown Recipe"') || profRaw.includes('"name": "Favor Recipe"')) {
    throw new Error('Found placeholder "Unknown Recipe" or "Favor Recipe" in forever_professions.json');
  }
});

check('No placeholder unknown or dummy recipes in professions JS bundle', () => {
  const profJsRaw = fs.readFileSync(path.join(ROOT, 'js', 'data', 'professions-data.js'), 'utf8');
  if (profJsRaw.includes('"name": "Unknown Recipe"') || profJsRaw.includes('"name": "Favor Recipe"')) {
    throw new Error('Found placeholder "Unknown Recipe" or "Favor Recipe" in professions-data.js');
  }
});

check('Professions data synchronization between JSON and JS bundle', () => {
  const profJson = JSON.parse(fs.readFileSync(path.join(dataDir, 'forever_professions.json'), 'utf8'));
  const profJsRaw = fs.readFileSync(path.join(ROOT, 'js', 'data', 'professions-data.js'), 'utf8');
  
  // Extract WOW_PROFESSIONS_DATA from JS
  const match = profJsRaw.match(/window\.WOW_PROFESSIONS_DATA\s*=\s*(\{[\s\S]*\});\s*$/);
  if (!match) throw new Error('Could not parse window.WOW_PROFESSIONS_DATA from professions-data.js');
  const profJs = JSON.parse(match[1]);

  for (const slug of Object.keys(profJson)) {
    const jsonRecCount = profJson[slug]?.recipes?.length || 0;
    const jsRecCount = profJs[slug]?.recipes?.length || 0;
    if (jsonRecCount !== jsRecCount) {
      throw new Error(`Recipe count mismatch for ${slug}: JSON has ${jsonRecCount}, JS has ${jsRecCount}`);
    }

    const jsonFavorCount = profJson[slug]?.favor?.recipes?.length || 0;
    const jsFavorCount = profJs[slug]?.favor?.recipes?.length || 0;
    if (jsonFavorCount !== jsFavorCount) {
      throw new Error(`Favor count mismatch for ${slug}: JSON has ${jsonFavorCount}, JS has ${jsFavorCount}`);
    }
  }

  // Ensure 14 Mining smelts
  if ((profJson.mining?.recipes?.length || 0) < 14) {
    throw new Error(`Expected at least 14 mining smelts in forever_professions.json, got ${profJson.mining?.recipes?.length}`);
  }
});

console.log('\n=======================================');
console.log(`Ran ${totalChecks} checks. Failures: ${errors.length}`);
console.log('=======================================\n');

if (errors.length > 0) {
  process.exit(1);
} else {
  console.log('✓ All integrity and build checks passed!\n');
}
