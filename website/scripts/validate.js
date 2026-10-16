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

check('Professions category mapping and zero unmapped categories', () => {
  const profJson = JSON.parse(fs.readFileSync(path.join(dataDir, 'forever_professions.json'), 'utf8'));
  for (const [slug, prof] of Object.entries(profJson)) {
    if (prof.groups && prof.recipes) {
      const validCategories = new Set(prof.groups.map(g => g.key));
      const unmapped = prof.recipes.filter(r => !validCategories.has(r.cat));
      if (unmapped.length > 0) {
        throw new Error(`Found ${unmapped.length} unmapped recipes in ${slug} (first: ${unmapped[0].name})`);
      }
      for (const g of prof.groups) {
        const actual = prof.recipes.filter(r => r.cat === g.key).length;
        if (actual !== g.count) {
          throw new Error(`Group count mismatch in ${slug} for category "${g.key}": declared ${g.count}, actual ${actual}`);
        }
      }
    }
  }
});

check('No duplicate prefix scraping artifacts in recipe sources', () => {
  const profRaw = fs.readFileSync(path.join(dataDir, 'forever_professions.json'), 'utf8');
  const dirty = ['Formula: Formula:', 'Plans: Plans:', 'Pattern: Pattern:', 'Schematic: Schematic:', 'Recipe: Recipe:'];
  for (const pattern of dirty) {
    if (profRaw.includes(pattern)) {
      throw new Error(`Found dirty repeated prefix "${pattern}" in forever_professions.json`);
    }
  }
});

check('Declared profession stats match actual array calculations', () => {
  const profJson = JSON.parse(fs.readFileSync(path.join(dataDir, 'forever_professions.json'), 'utf8'));
  for (const [slug, prof] of Object.entries(profJson)) {
    if (prof.recipes) {
      if (prof.stats?.recipeCount !== prof.recipes.length) {
        throw new Error(`Recipe count stat mismatch in ${slug}: declared ${prof.stats?.recipeCount}, actual ${prof.recipes.length}`);
      }
      const actualNew = prof.recipes.filter(r => r.isNew).length;
      if (prof.stats?.newInForever !== actualNew) {
        throw new Error(`New in forever stat mismatch in ${slug}: declared ${prof.stats?.newInForever}, actual ${actualNew}`);
      }
    }
  }
});

console.log('\n--- 4. ADDON SUITE & DISTRIBUTION AUDIT ---');

check('Addon Suite tab and section markup exist in index.html', () => {
  if (!indexHtml.includes('data-tab="addons"')) {
    throw new Error('data-tab="addons" not found in index.html navigation');
  }
  if (!indexHtml.includes('id="tab-addons"')) {
    throw new Error('id="tab-addons" section not found in index.html');
  }
  if (!indexHtml.includes('js/modules/addons.js')) {
    throw new Error('js/modules/addons.js script reference not found in index.html');
  }
});

check('Addon release packages and manifest exist in website/downloads/', () => {
  const downloadsDir = path.join(ROOT, 'downloads');
  const manifestFile = path.join(downloadsDir, 'manifest.json');
  if (!fs.existsSync(manifestFile)) {
    throw new Error('website/downloads/manifest.json does not exist. Run node scripts/package-addons.js');
  }
  const manifest = JSON.parse(fs.readFileSync(manifestFile, 'utf8'));
  if (!manifest.masterSuite || !fs.existsSync(path.join(ROOT, manifest.masterSuite.downloadPath))) {
    throw new Error('Master suite zip does not exist in website/downloads/');
  }
  for (const addon of manifest.addons) {
    const pkgPath = path.join(ROOT, addon.downloadPath);
    if (!fs.existsSync(pkgPath)) {
      throw new Error(`Addon package missing: ${pkgPath}`);
    }
  }
});

console.log('\n--- 5. SITE LIFECYCLE & ENGINE INTEGRITY ---');

check('Site Lifecycle engine module & date boundary transitions', () => {
  const lifecyclePath = path.join(ROOT, 'js', 'modules', 'lifecycle.js');
  if (!fs.existsSync(lifecyclePath)) {
    throw new Error('website/js/modules/lifecycle.js does not exist');
  }
  if (!indexHtml.includes('js/modules/lifecycle.js')) {
    throw new Error('lifecycle.js is not included in index.html');
  }

  // Unit test phase boundary logic
  const targets = {
    betaStart: '2026-09-17T10:00:00-07:00',
    betaEnds: '2026-10-21T23:59:59-07:00',
    globalLaunch: '2026-11-04T15:00:00-08:00',
    raidUnlock: '2026-12-09T10:00:00-08:00'
  };

  const code = fs.readFileSync(lifecyclePath, 'utf8');
  const mod = { exports: {} };
  new Function('module', 'exports', code)(mod, mod.exports);
  const getPhase = mod.exports.getSitePhase;
  if (!getPhase) throw new Error('getSitePhase not exported by lifecycle.js');

  const pBeta = getPhase(new Date('2026-10-15T12:00:00-07:00').getTime(), targets);
  if (pBeta !== 'beta2') throw new Error(`Expected beta2 on Oct 15, got ${pBeta}`);

  const pPre = getPhase(new Date('2026-10-25T12:00:00-07:00').getTime(), targets);
  if (pPre !== 'prelaunch') throw new Error(`Expected prelaunch on Oct 25, got ${pPre}`);

  const pLive = getPhase(new Date('2026-11-10T12:00:00-08:00').getTime(), targets);
  if (pLive !== 'live') throw new Error(`Expected live on Nov 10, got ${pLive}`);

  const pRaids = getPhase(new Date('2026-12-15T12:00:00-08:00').getTime(), targets);
  if (pRaids !== 'raids') throw new Error(`Expected raids on Dec 15, got ${pRaids}`);
});

check('Addon Suite single-TOC 16001 compliance and metadata', () => {
  const addonsDir = path.resolve(ROOT, '..', 'addons');
  const inHouse = ['ForeverPlates', 'Foreverplatescastbars', 'ForeverLiquid', 'ForeverDungeonJournal', 'ForeverBlessings', 'EchoTwist'];

  for (const name of inHouse) {
    const dir = path.join(addonsDir, name);
    const toc = path.join(dir, `${name}.toc`);
    if (!fs.existsSync(toc)) throw new Error(`Missing primary TOC: ${toc}`);
    const content = fs.readFileSync(toc, 'utf8');
    if (!content.includes('## Interface: 16001')) {
      throw new Error(`Addon ${name} TOC does not target Interface: 16001`);
    }
    if (!content.includes('## Author:')) {
      throw new Error(`Addon ${name} TOC missing Author metadata`);
    }
  }
});

check('Dalaran Map TGA textures are optimized power-of-two (1024x1024)', () => {
  const mediaDir = path.resolve(ROOT, '..', 'addons', 'ForeverDungeonJournal', 'Media');
  for (const mapName of ['DalaranCityMap.tga', 'DalaranUnderbellyMap.tga']) {
    const mapPath = path.join(mediaDir, mapName);
    if (!fs.existsSync(mapPath)) continue;
    const buf = fs.readFileSync(mapPath);
    const width = buf.readUInt16LE(12);
    const height = buf.readUInt16LE(14);
    if (width !== 1024 || height !== 1024) {
      throw new Error(`Expected ${mapName} to be 1024x1024 POT texture, found ${width}x${height}`);
    }
  }
});

check('Universal Search static targetId deep-links all resolve in index.html', () => {
  const searchRaw = fs.readFileSync(path.join(ROOT, 'js', 'modules', 'search.js'), 'utf8');
  const matches = [...searchRaw.matchAll(/targetId:\s*'([^']+)'/g)];
  for (const m of matches) {
    const tid = m[1];
    if (!indexHtml.includes(`id="${tid}"`)) {
      throw new Error(`Search index references missing DOM id="${tid}" in index.html`);
    }
  }
});

check('Addon spotlight cards in index.html have live download links and synced versions', () => {
  if (indexHtml.includes('Available for download soon')) {
    throw new Error('Found stale "Available for download soon" badge in index.html');
  }
  const manifest = JSON.parse(fs.readFileSync(path.join(ROOT, 'downloads', 'manifest.json'), 'utf8'));
  for (const addon of manifest.addons) {
    if (!indexHtml.includes(addon.downloadPath)) {
      throw new Error(`index.html missing download link for ${addon.downloadPath}`);
    }
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
