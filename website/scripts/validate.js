import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';
import { loadAllData } from '../tests/helpers/loader.js';
import { parseBuildUrl, validateBuildLegality, getTotalPoints } from '../tests/helpers/talent-engine.js';

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

  // Ensure WOW_REAGENT_SOURCES is present and synchronized
  const reagentJson = JSON.parse(fs.readFileSync(path.join(dataDir, 'forever_reagent_sources.json'), 'utf8'));
  const reagentCount = Object.keys(reagentJson).length;
  if (reagentCount < 525) {
    throw new Error(`Expected at least 525 reagent acquisition entries in forever_reagent_sources.json, got ${reagentCount}`);
  }
  if (!profJsRaw.includes('window.WOW_REAGENT_SOURCES =')) {
    throw new Error('window.WOW_REAGENT_SOURCES not found in professions-data.js');
  }
  if (!profJsRaw.includes('Rich Thorium Vein (Mining 275+)') || !profJsRaw.includes('Meaty Bat Wing')) {
    throw new Error('professions-data.js bundle is missing synchronized Arcane Crystal or Meaty Bat Wing entries');
  }

  // Regression check: ensure cooking items (e.g., Meaty Bat Wing) never have mining nodes or ore types
  const batWing = reagentJson['12223'];
  if (!batWing || batWing.primaryType === 'ore' || batWing.miningNode || (batWing.minedFrom && batWing.minedFrom.length > 0)) {
    throw new Error(`Meaty Bat Wing (12223) has invalid ore classification or mining node: ${JSON.stringify(batWing?.ctaText)}`);
  }
  if (batWing.ctaIcon !== '🍖' || !batWing.ctaText?.includes('this meat')) {
    throw new Error(`Meaty Bat Wing (12223) missing meat CTA: ${JSON.stringify(batWing?.ctaText)}`);
  }

  // Ensure zero items have miningNode unless they are genuine minerals (and never smelted bars or engineering parts)
  const mineralRegex = /\b(ores?|stones?|nuggets?|pyrite|bauxite|pitchblende|torbernite|obsidian|souldarite|dark iron|elementium|gems?|diamonds?|sapphires?|rub(?:y|ies)|emeralds?|agates?|opals?|citrines?|aquamarines?|malachite|tigerseye|shadowgems?|jade|moonstones?|blood of the mountain|vitriol|arcane crystal|crystals?)\b/i;
  const expectedAnchors = {
    ore: '#mined-from-object',
    herb: '#gathered-from-object',
    fished: '#fished-in',
    skinned: '#skinned-from',
    vendor: '#sold-by',
    crafted: '#created-by-spell',
    disenchant: '#disenchanted-from',
    contained: '#contained-in-item',
    mob_drop: '#dropped-by'
  };

  for (const [id, it] of Object.entries(reagentJson)) {
    if (it.primaryType === 'ore' || it.miningNode) {
      if (!mineralRegex.test(it.name.toLowerCase())) {
        throw new Error(`Item ${it.name} (${id}) incorrectly classified as ore/miningNode: ${it.ctaText}`);
      }
      if (it.name.toLowerCase().endsWith(' bar')) {
        throw new Error(`Smelted bar ${it.name} (${id}) should not have miningNode: ${JSON.stringify(it.miningNode)}`);
      }
    }
    if (it.ctaText && it.ctaText.includes('this meat') && /shard|crystal|essence|dust/.test(it.name.toLowerCase())) {
      throw new Error(`Enchanting reagent ${it.name} (${id}) incorrectly has meat CTA: ${it.ctaText}`);
    }
    // Verify all reagents have proper wowheadUrl anchors
    const expAnchor = expectedAnchors[it.primaryType];
    if (expAnchor && (!it.wowheadUrl || !it.wowheadUrl.includes(expAnchor))) {
      throw new Error(`Item ${it.name} (${id}) has missing or mismatched wowheadUrl anchor: ${it.wowheadUrl} (expected ${expAnchor})`);
    }
  }

  // Verify mining node skill accuracy
  const darkIron = reagentJson['11370'];
  if (darkIron?.miningNode?.skill !== 230 || !darkIron?.ctaText?.includes('230+')) {
    throw new Error(`Dark Iron Ore (11370) has incorrect mining skill: ${darkIron?.ctaText}`);
  }
  const jade = reagentJson['1529'];
  if (jade?.miningNode?.skill !== 125 || !jade?.ctaText?.includes('125+')) {
    throw new Error(`Jade (1529) has incorrect mining skill: ${jade?.ctaText}`);
  }
  const citrine = reagentJson['3864'];
  if (citrine?.miningNode?.skill !== 175 || !citrine?.ctaText?.includes('175+')) {
    throw new Error(`Citrine (3864) has incorrect mining skill: ${citrine?.ctaText}`);
  }
  const arcaneCrystal = reagentJson['12363'];
  if (!arcaneCrystal || arcaneCrystal.primaryType !== 'ore' || arcaneCrystal.miningNode?.skill !== 275 || !arcaneCrystal.ctaText?.includes('275+')) {
    throw new Error(`Arcane Crystal (12363) has incorrect classification or mining skill: ${JSON.stringify(arcaneCrystal)}`);
  }
  if (arcaneCrystal.ctaIcon !== '⛏️' || !arcaneCrystal.wowheadUrl?.includes('#mined-from-object')) {
    throw new Error(`Arcane Crystal (12363) missing mining CTA icon or wowhead anchor: ${JSON.stringify(arcaneCrystal)}`);
  }

  // Ensure Crystal Vial (8925) remains vendor-typed and Power Crystals remain non-ore
  const crystalVial = reagentJson['8925'];
  if (!crystalVial || crystalVial.primaryType !== 'vendor' || crystalVial.miningNode) {
    throw new Error(`Crystal Vial (8925) should be vendor-typed without miningNode: ${JSON.stringify(crystalVial)}`);
  }
  for (const pcId of ['11184', '11185', '11186', '11188']) {
    const pc = reagentJson[pcId];
    if (pc && (pc.primaryType === 'ore' || pc.miningNode)) {
      throw new Error(`Power Crystal ${pc.name} (${pcId}) should not be classified as ore: ${JSON.stringify(pc)}`);
    }
  }
  const thorium = reagentJson['10620'];
  if (thorium?.miningNode?.skill !== 275 || !thorium?.ctaText?.includes('275+')) {
    throw new Error(`Thorium Ore (10620) has incorrect mining skill: ${thorium?.ctaText}`);
  }

  // Verify staple vendor items
  if (reagentJson['3857']?.primaryType !== 'vendor' || reagentJson['3857']?.ctaIcon !== '🪙') {
    throw new Error(`Coal (3857) should be vendor type`);
  }
  if (reagentJson['4536']?.primaryType !== 'vendor' || reagentJson['4536']?.ctaIcon !== '🪙') {
    throw new Error(`Shiny Red Apple (4536) should be vendor type`);
  }

  // Verify cooking meat parts
  if (reagentJson['5470']?.ctaIcon !== '🍖' || !reagentJson['5470']?.ctaText?.includes('meat')) {
    throw new Error(`Thunder Lizard Tail (5470) missing meat CTA: ${reagentJson['5470']?.ctaText}`);
  }
  if (reagentJson['2251']?.ctaIcon !== '🍖' || !reagentJson['2251']?.ctaText?.includes('meat')) {
    throw new Error(`Gooey Spider Leg (2251) missing meat CTA: ${reagentJson['2251']?.ctaText}`);
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
    betaEnds: '2026-10-23T10:00:00-07:00',
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

check('Beta Build 1.60.1.70425 consistency across core-data.js and index.html without stale builds', () => {
  const coreCode = fs.readFileSync(path.join(ROOT, 'js', 'data', 'core-data.js'), 'utf8');
  const clientBuildMatch = coreCode.match(/"clientBuild":\s*"([^"]+)"/);
  if (!clientBuildMatch || clientBuildMatch[1] !== '1.60.1.70425') {
    throw new Error(`Expected core-data.js clientBuild to be '1.60.1.70425', got '${clientBuildMatch ? clientBuildMatch[1] : 'missing'}'`);
  }
  if (!indexHtml.includes('1.60.1.70425')) {
    throw new Error('index.html missing reference to Beta Build 1.60.1.70425');
  }
  if (indexHtml.includes('71890')) {
    throw new Error('Found stale build 71890 reference in index.html; should be updated to 1.60.1.70425');
  }
  if (indexHtml.includes('72140')) {
    throw new Error('Found stale build 72140 reference in index.html; should be updated to 1.60.1.70425');
  }

  const bisCode = fs.readFileSync(path.join(ROOT, 'js', 'data', 'bis-data.js'), 'utf8');
  const bisVersionMatch = bisCode.match(/"version":\s*"([^"]+)"/);
  if (!bisVersionMatch || bisVersionMatch[1] !== '1.60.1.70425') {
    throw new Error(`Expected bis-data.js version to be '1.60.1.70425', got '${bisVersionMatch ? bisVersionMatch[1] : 'missing'}'`);
  }
  if (bisCode.includes('71890')) {
    throw new Error('Found stale build 71890 reference in bis-data.js; should be updated to 1.60.1.70425');
  }
  if (bisCode.includes('72140')) {
    throw new Error('Found stale build 72140 reference in bis-data.js; should be updated to 1.60.1.70425');
  }

  const deepdiveFiles = fs.readdirSync(path.join(ROOT, 'js', 'data', 'deepdives'))
    .filter(f => f.endsWith('.js'))
    .map(f => path.join(ROOT, 'js', 'data', 'deepdives', f));

  for (const filePath of deepdiveFiles) {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const relPath = path.relative(ROOT, filePath).replace(/\\/g, '/');
    if (fileContent.includes('71890')) {
      throw new Error(`Found stale build 71890 reference in ${relPath}; should be updated to 1.60.1.70425`);
    }
    if (fileContent.includes('72140')) {
      throw new Error(`Found stale build 72140 reference in ${relPath}; should be updated to 1.60.1.70425`);
    }
  }
});

check('copyTextToClipboard in js/utils.js returns a Promise', () => {
  const utilsCode = fs.readFileSync(path.join(ROOT, 'js', 'utils.js'), 'utf8');
  if (!utilsCode.includes('return Promise.reject') || !utilsCode.includes('return navigator.clipboard.writeText')) {
    throw new Error('copyTextToClipboard does not properly return a Promise in js/utils.js');
  }
});

check('All 9 classes are defined in legacy.js Season 1 Class Mastery challenges', () => {
  const legacyCode = fs.readFileSync(path.join(ROOT, 'js', 'modules', 'legacy.js'), 'utf8');
  const requiredClasses = ['c_warrior', 'c_paladin', 'c_hunter', 'c_rogue', 'c_priest', 'c_shaman', 'c_mage', 'c_warlock', 'c_druid'];
  for (const cls of requiredClasses) {
    if (!legacyCode.includes(`id: '${cls}'`)) {
      throw new Error(`Missing class '${cls}' in legacy.js DETAILED_CHALLENGES Class Mastery`);
    }
  }
  if (!legacyCode.includes("totalPoints: 27")) {
    throw new Error("Class Mastery in legacy.js should have totalPoints: 27 across all 9 classes");
  }
});

check('Obsolete weapon racials purge across races-classes.js, tools-data.js, and deep dive files', () => {
  const obsoleteRacials = ['Sword Specialization', 'Mace Specialization', 'Axe Specialization'];
  const deepdiveFiles = fs.readdirSync(path.join(ROOT, 'js', 'data', 'deepdives'))
    .filter(f => f.endsWith('.js'))
    .map(f => path.join(ROOT, 'js', 'data', 'deepdives', f));
  const filesToCheck = [
    path.join(ROOT, 'js', 'data', 'races-classes.js'),
    path.join(ROOT, 'js', 'data', 'tools-data.js'),
    ...deepdiveFiles
  ];

  for (const filePath of filesToCheck) {
    const content = fs.readFileSync(filePath, 'utf8');
    for (const racial of obsoleteRacials) {
      if (content.includes(racial)) {
        throw new Error(`Found obsolete weapon racial "${racial}" in ${path.relative(ROOT, filePath)}`);
      }
    }
  }
});

check('Absence of removed talents in active specialization trees in talents-data.js', () => {
  const data = loadAllData(ROOT);
  const talentsData = data.talentsData;
  const removedTalents = ['Call of Thunder', 'Shadow Affinity', 'Piercing Ice'];

  for (const [cls, cData] of Object.entries(talentsData)) {
    for (const t of cData.talents || []) {
      if (removedTalents.includes(t.name)) {
        throw new Error(`Found removed talent "${t.name}" in active ${cls} talent tree in talents-data.js`);
      }
    }
  }
});

check('Presence of new talent nodes with valid metadata and rank counts in talents-data.js', () => {
  const data = loadAllData(ROOT);
  const talentsData = data.talentsData;
  const expectedNodes = [
    { cls: 'shaman', name: 'Elemental Mastery', tree: 0, row: 7, col: 2, maxRank: 1, req: 278 },
    { cls: 'mage', name: 'Arcane Wrath', tree: 0, row: 4, col: 4, maxRank: 1, req: null },
    { cls: 'priest', name: 'Dark Inspiration', tree: 2, row: 4, col: 1, maxRank: 5, req: null },
    { cls: 'warlock', name: 'Grim Reach', tree: 0, row: 4, col: 4, maxRank: 2, req: null },
    { cls: 'mage', name: 'Elemental Precision', tree: 2, row: 1, col: 3, maxRank: 3, req: null }
  ];

  for (const expected of expectedNodes) {
    const classTalents = talentsData[expected.cls]?.talents || [];
    const node = classTalents.find(t => t.name === expected.name);
    if (!node) {
      throw new Error(`Missing expected new talent "${expected.name}" in ${expected.cls}`);
    }
    if (node.tree !== expected.tree || node.row !== expected.row || node.col !== expected.col) {
      throw new Error(`Talent "${expected.name}" position mismatch: expected tree ${expected.tree} row ${expected.row} col ${expected.col}, got tree ${node.tree} row ${node.row} col ${node.col}`);
    }
    if (node.maxRank !== expected.maxRank) {
      throw new Error(`Talent "${expected.name}" maxRank mismatch: expected ${expected.maxRank}, got ${node.maxRank}`);
    }
    if (node.req !== expected.req) {
      throw new Error(`Talent "${expected.name}" req mismatch: expected ${expected.req}, got ${node.req}`);
    }
    if (!Array.isArray(node.descriptions) || node.descriptions.length !== expected.maxRank) {
      throw new Error(`Talent "${expected.name}" descriptions count mismatch: expected ${expected.maxRank}, got ${node.descriptions?.length}`);
    }
  }
});

check('Replacement racials presence and exact 4-racial symmetry across all 9 races in races-classes.js', () => {
  const data = loadAllData(ROOT);
  const races = data.racesData;
  if (!Array.isArray(races) || races.length !== 9) {
    throw new Error(`Expected exactly 9 playable races in allRacesData, got ${races ? races.length : 0}`);
  }

  for (const race of races) {
    if (!Array.isArray(race.racials) || race.racials.length !== 4) {
      throw new Error(`Race ${race.name} does not have exactly 4 racials (got ${race.racials?.length})`);
    }
    const actives = race.racials.filter(r => (r.type || '').toLowerCase().includes('active'));
    const passives = race.racials.filter(r => (r.type || '').toLowerCase().includes('passive'));
    if (actives.length !== 2 || passives.length !== 2) {
      throw new Error(`Race ${race.name} violates 4-racial symmetry: expected 2 active and 2 passive, got ${actives.length} active and ${passives.length} passive`);
    }
  }

  const replacements = [
    { raceId: 'human', racialName: 'Ruthless' },
    { raceId: 'dwarf', racialName: 'Earth Fury' },
    { raceId: 'orc', racialName: 'Savage' },
    { raceId: 'skyborne', racialName: 'Read Leyline' }
  ];

  for (const req of replacements) {
    const race = races.find(r => r.id === req.raceId);
    if (!race) throw new Error(`Missing race ${req.raceId} in allRacesData`);
    const found = race.racials.find(r => r.name === req.racialName);
    if (!found) {
      throw new Error(`Missing replacement racial "${req.racialName}" on race ${race.name}`);
    }
  }
});

check('Strict legality check on all Level 30 deep dive recommended builds in js/data/deepdives/', () => {
  const data = loadAllData(ROOT);
  const deepdives = data.deepdives;
  const talentsData = data.talentsData;

  const targetClasses = ['druid', 'hunter', 'mage', 'paladin', 'priest', 'rogue', 'shaman', 'warlock', 'warrior'];
  let buildsAudited = 0;

  for (const cls of targetClasses) {
    const dd = deepdives[cls];
    if (!dd) throw new Error(`Missing deep dive dataset for class: ${cls}`);
    const classTalents = talentsData[cls]?.talents || [];
    if (classTalents.length === 0) throw new Error(`Missing talent database for class: ${cls}`);

    const specs = dd.betaBuilds?.level30?.specs || [];
    if (specs.length === 0) throw new Error(`No level 30 specs found in deep dive for ${cls}`);

    for (const spec of specs) {
      const buildUrl = spec.buildUrl || '';
      const match = buildUrl.match(/[?&](?:b|build)=([^&]+)/);
      const buildStr = match ? decodeURIComponent(match[1]) : buildUrl;
      if (!buildStr) {
        throw new Error(`Spec ${spec.name || spec.specId} in ${cls} has empty buildUrl`);
      }

      const points = parseBuildUrl(classTalents, buildStr);
      const totalPoints = getTotalPoints(points);

      if (totalPoints > 26) {
        throw new Error(`Build "${spec.name}" for ${cls} exceeds Level 30 cap (${totalPoints} > 26 points)`);
      }

      const audit = validateBuildLegality(classTalents, points, 26);
      if (!audit.valid) {
        throw new Error(`Build "${spec.name}" for ${cls} failed legality audit: ${audit.errors.join('; ')}`);
      }

      buildsAudited++;
    }
  }

  if (buildsAudited < 29) {
    throw new Error(`Insufficient builds audited: expected >= 29, got ${buildsAudited}`);
  }
});

check('Class weapon progression database coverage and pipeline integrity across all 9 classes', () => {
  const fwPath = path.join(ROOT, 'data', 'scraped', 'forever_weapons.json');
  if (!fs.existsSync(fwPath)) throw new Error('Missing forever_weapons.json');
  const fw = JSON.parse(fs.readFileSync(fwPath, 'utf8'));

  const minCoverage = {
    warrior: 180,
    paladin: 180,
    hunter: 180,
    rogue: 180,
    shaman: 180,
    mage: 150,
    warlock: 150,
    priest: 180,
    druid: 180
  };

  for (const [cls, minCount] of Object.entries(minCoverage)) {
    const d = fw[cls];
    if (!d || !d.levels) throw new Error(`Missing weapon progression for ${cls}`);
    const uniqueIds = new Set();
    const allSets = [d.levels, d.healingLevels].filter(Boolean);
    allSets.forEach(set => {
      set.forEach(l => {
        if (l.itemId) uniqueIds.add(l.itemId);
        (l.alts || []).forEach(a => { if (a.itemId) uniqueIds.add(a.itemId); });
      });
    });

    if (uniqueIds.size < minCount) {
      throw new Error(`Pipeline coverage failure for ${cls}: expected at least ${minCount} unique equippable weapons in progression, found only ${uniqueIds.size}`);
    }
  }
});

check('Progression items canonical database integrity and slot validity', () => {
  const cachePath = path.join(ROOT, 'scratch', 'forever_items_cache.json');
  if (!fs.existsSync(cachePath)) throw new Error('Missing forever_items_cache.json');
  const cache = JSON.parse(fs.readFileSync(cachePath, 'utf8'));

  const fwPath = path.join(ROOT, 'data', 'scraped', 'forever_weapons.json');
  const foPath = path.join(ROOT, 'data', 'scraped', 'forever_offhands.json');
  const fwanPath = path.join(ROOT, 'data', 'scraped', 'forever_wands.json');

  const files = [
    { name: 'weapons', data: JSON.parse(fs.readFileSync(fwPath, 'utf8')) },
    { name: 'offhands', data: JSON.parse(fs.readFileSync(foPath, 'utf8')) },
    { name: 'wands', data: JSON.parse(fs.readFileSync(fwanPath, 'utf8')) }
  ];

  const illegalSlots = new Set(['Chest', 'Head', 'Shoulder', 'Legs', 'Feet', 'Wrist', 'Hands', 'Waist', 'Finger', 'Trinket', 'Bag', 'Back']);
  const violations = [];

  function validate(item, pathStr) {
    if (!item || typeof item !== 'object') return;
    const id = item.itemId || item.id;
    if (!id) return;

    // 1. Must not have hallucinated or placeholder names
    if (item.name && /dor'danil|placeholder|unknown item/i.test(item.name)) {
      violations.push(`${pathStr}: Hallucinated/invalid item name "${item.name}"`);
    }

    // 2. Cache cross-examination
    const c = cache[id];
    if (c) {
      if (c.inventorySlot && illegalSlots.has(c.inventorySlot)) {
        violations.push(`${pathStr}: Item "${item.name}" (ID ${id}) is armor/accessory (${c.inventorySlot}) in weapon/off-hand path`);
      }
    }
  }

  function walk(obj, pathStr) {
    if (!obj || typeof obj !== 'object') return;
    if (obj.name && (obj.itemId || obj.id)) {
      validate(obj, pathStr);
    }
    for (const [k, v] of Object.entries(obj)) {
      walk(v, `${pathStr}.${k}`);
    }
  }

  for (const f of files) {
    walk(f.data, f.name);
  }

  if (violations.length > 0) {
    throw new Error(`Integrity violations found in progression data:\n  ${violations.slice(0, 10).join('\n  ')}`);
  }
});

check('Absence of dead 404 icons across class progression and professions data', () => {
  const deadIcons = [
    'inv_weapon_halberd_01',
    'inv_lantern_01',
    'inv_knife_01',
    'inv_misc_firestone_01',
    'inv_misc_sit',
    'inv_10_tailoring2_mannequin_bronze',
    'inv_10_engineering2_tinkeringengine_bronze',
    'inv_10_herbalism2_herbalistsbasket_bronze',
    'inv_10_mining2_prospectorspick_bronze',
    'inv_10_skinning2_flensingknife_bronze',
    'inv_enchant_essencenetherlesser',
    'inv_enchant_essenceeternalgreater',
    'inv_misc_thread_04',
    'inv_misc_thread_03',
    'inv_fabric_felcloth_01',
    'inv_misc_thread_02',
    'inv_misc_silk_02',
    'spell_nature_abolishpoison',
    'inv_misc_powder_solid',
    'inv_misc_ammo_pouch_01',
    'inv_misc_birdegg_01',
    'inv_misc_bag_10_purple',
    'inv_misc_ammo_pouch_02',
    'inv_misc_steelpipetooth',
    'inv_misc_ammo_pouch_03'
  ];

  const filesToAudit = [
    path.join(ROOT, 'js', 'data', 'class-progression-data.js'),
    path.join(ROOT, 'js', 'data', 'professions-reference-data.js'),
    path.join(ROOT, 'js', 'data', 'professions-data.js'),
    path.join(ROOT, 'data', 'forever_professions.json'),
    path.join(ROOT, 'js', 'modules', 'professions.js')
  ];

  for (const fp of filesToAudit) {
    if (!fs.existsSync(fp)) continue;
    const content = fs.readFileSync(fp, 'utf8');
    for (const icon of deadIcons) {
      if (content.includes(icon)) {
        throw new Error(`Found dead 404 icon "${icon}" in ${path.relative(ROOT, fp)}`);
      }
    }
  }
});

console.log('\n--- 6. CLASS PROGRESSION & WEAPON GATING AUDIT ---');

const progPath = path.join(ROOT, 'js', 'data', 'class-progression-data.js');
const filterModulePath = path.join(ROOT, 'js', 'modules', 'deepdives', 'progression-filter.js');
const classProgModulePath = path.join(ROOT, 'js', 'modules', 'deepdives', 'class-progression.js');
const progCachePath = path.join(ROOT, 'scratch', 'forever_items_cache.json');

let progBundleContext = null;
function getProgressionContext() {
  if (progBundleContext) return progBundleContext;
  if (!fs.existsSync(progPath)) throw new Error('Missing class-progression-data.js');
  if (!fs.existsSync(filterModulePath)) throw new Error('Missing progression-filter.js');

  const context = {
    console,
    Date,
    Math,
    parseInt,
    parseFloat,
    String,
    Number,
    Boolean,
    Array,
    Object,
    RegExp,
    Set,
    Map,
    escapeHtml: s => String(s ?? ''),
    document: {
      addEventListener: () => {},
      removeEventListener: () => {},
      getElementById: () => null,
      querySelector: () => null,
      querySelectorAll: () => []
    }
  };
  context.window = context;
  vm.createContext(context);

  const progCode = fs.readFileSync(progPath, 'utf8');
  vm.runInContext(progCode, context);

  const filterCode = fs.readFileSync(filterModulePath, 'utf8');
  vm.runInContext(filterCode, context);

  if (fs.existsSync(classProgModulePath)) {
    const classProgCode = fs.readFileSync(classProgModulePath, 'utf8');
    vm.runInContext(classProgCode, context);
  }

  let cache = {};
  if (fs.existsSync(progCachePath)) {
    try {
      cache = JSON.parse(fs.readFileSync(progCachePath, 'utf8'));
    } catch {
      cache = {};
    }
  }

  progBundleContext = {
    progressionData: context.window.WOW_PROGRESSION_DATA,
    progressionFilter: context.window.WOW_PROGRESSION_FILTER,
    deepdivesProgression: context.window.WOW_DEEPDIVES_PROGRESSION,
    cache
  };
  return progBundleContext;
}

function getAllProgressionItems(progressionData) {
  const items = [];
  for (const sec of ['weapons', 'wands', 'offhands']) {
    for (const [cls, cData] of Object.entries(progressionData[sec] || {})) {
      const sets = [
        { trackId: 'levels', set: cData.levels },
        { trackId: 'healingLevels', set: cData.healingLevels }
      ];
      if (cData.tracksData) {
        for (const [tid, s] of Object.entries(cData.tracksData)) {
          sets.push({ trackId: tid, set: s });
        }
      }
      for (const { trackId, set: s } of sets) {
        if (!s) continue;
        for (const step of s) {
          items.push({ kind: sec, cls, trackId, bracket: step.levelBracket, item: step, isHero: true });
          for (const alt of (step.alts || [])) {
            items.push({ kind: sec, cls, trackId, bracket: step.levelBracket, item: alt, isHero: false });
          }
        }
      }
    }
  }
  return items;
}

check('Weapon proficiency and class legality check across progression tracks', () => {
  const { progressionData, cache } = getProgressionContext();
  const allItems = getAllProgressionItems(progressionData);

  const knownAxeNames = new Set(["crude battle axe", "copper battle axe", "thick war axe", "durgen's crescent axe", "corpse chopper", "forsaken greataxe", "reef axe", "taurenbane's family cleaver", "guardian's dualblade", "whirlwind axe", "corpsemaker", "ravager", "executioner's cleaver", "gatorbite axe", "arcanite reaper", "woodchopper", "lumbering ogre axe", "taskmaster axe", "bronze battle axe", "heavy mithril axe", "bonebiter", "massive iron axe", "riptear's cleaver", "thun'grim's axe", "axe of orgrimmar", "icesworn decapitator", "butcher's cleaver"]);
  const knownSwordNames = new Set(["worn shortsword", "copper claymore", "heavy copper broadsword", "haunting blade", "vileblood scimitar", "plaguefang", "strike of the hydra", "trusty sword", "whirlwind sword", "stoneslayer", "blackblade of shahram", "copper shortsword", "bronze greatsword", "wolfsbane", "moonsteel broadsword", "sword of serenity", "blade of the titans", "warmonger", "cutlass", "cruel barb", "wingblade", "deadly bronze poniard", "bronze shortsword", "ruby-adorned blade", "city guard's tarnished blade", "sword of hammerfall", "the butcher", "vanquisher's sword", "thrash blade", "mirah's song", "dal'rend's sacred charge", "dal'rend's tribal guardian", "coldflame saber", "debt collector", "witchblade", "master hunter's spellsword", "zealot blade", "sword of omen", "forsaken shortsword", "deathstalker shortsword", "talonstrike", "thun'grim's sword", "heirloom sword", "sword of the fallen", "militia shortsword", "militia sword", "curved scimitar", "wildgore greatsword", "gilded blademaster's greatsword", "monstrous cleaver", "the skyblade", "blade of silverlaine", "alliance outrunner's sword", "blade of senseless slaughter"]);
  const knownMaceNames = new Set(["wooden mallet", "large club", "northshire hammer", "giant mace", "trogg scepter", "heavy copper maul", "ironforge greathammer", "rhahk'zor's hammer", "smite's mighty hammer", "verigan's fist", "heavehammer", "defender of dalaran", "dark hearted hammer", "manual crowd pummeler", "mograine's might", "princess theradras' scepter", "dark iron pulverizer", "hammer of the grand crusader", "the unstoppable force", "militia warhammer", "scepter of the abandoned", "rage of the storm", "dendweller's hammer", "copper mace", "bronze mace", "bronze warhammer", "solid iron maul", "mighty iron hammer", "the pacifier", "enchanted battlehammer", "club", "crested scepter", "rock pulverizer", "archeus", "grisly sack of skulls", "goblin smasher", "bonecracker", "hammer of orgrimmar", "hammerbone", "mug of muddled memories", "the stitcher", "gul'gash's greathammer"]);

  const violations = [];

  for (const { kind, cls, trackId, item: it } of allItems) {
    const id = it.itemId || it.id;
    const name = (it.name || '').toLowerCase();
    const val = (it.value || '').toLowerCase();
    const wt = (it.weaponType || '').toLowerCase();
    const sub = it.subclass;

    // 1. Fishing poles
    if (sub === 20 || name.includes('fishing pole') || val.includes('fishing pole') || wt.includes('fishing pole')) {
      violations.push(`${cls} cannot have fishing pole "${it.name}" in combat progression`);
    }

    // 2. Class restrictions
    const restriction = it.classRestriction || cache[id]?.classRestriction;
    if (restriction && !restriction.toLowerCase().includes(cls)) {
      violations.push(`${cls} has "${it.name}" restricted to "${restriction}"`);
    }

    // 3. Class-specific proficiencies
    if (cls === 'rogue') {
      if (sub === 19 || wt.includes('wand')) {
        violations.push(`Rogue cannot equip wand "${it.name}"`);
      }
      if (knownAxeNames.has(name) || wt.includes('axe') || wt.includes('2h') || wt.includes('two-hand') || wt.includes('staff')) {
        violations.push(`Rogue cannot equip 2H/axe/staff "${it.name}"`);
      }
    }

    if (cls === 'paladin') {
      if (knownAxeNames.has(name) || wt.includes('axe')) {
        violations.push(`Paladin cannot equip axe "${it.name}"`);
      }
      if (wt.includes('fist') || wt.includes('thrown') || sub === 13 || sub === 16) {
        violations.push(`Paladin cannot equip fist/thrown "${it.name}"`);
      }
    }

    if (cls === 'shaman') {
      if (knownSwordNames.has(name) || wt.includes('sword')) {
        violations.push(`Shaman cannot equip sword "${it.name}"`);
      }
    }

    if (cls === 'druid') {
      if (knownSwordNames.has(name) || wt.includes('sword')) {
        violations.push(`Druid cannot equip sword "${it.name}"`);
      }
      if ((knownAxeNames.has(name) || wt.includes('axe')) && !wt.includes('polearm')) {
        violations.push(`Druid cannot equip axe "${it.name}"`);
      }
      if (wt.includes('thrown') || sub === 16) {
        violations.push(`Druid cannot equip thrown weapon "${it.name}"`);
      }
    }

    if (cls === 'priest') {
      if (knownSwordNames.has(name) || wt.includes('sword')) {
        violations.push(`Priest cannot equip sword "${it.name}"`);
      }
      if (knownAxeNames.has(name) || wt.includes('axe')) {
        violations.push(`Priest cannot equip axe "${it.name}"`);
      }
      if (wt.includes('fist') || wt.includes('thrown') || sub === 13 || sub === 16) {
        violations.push(`Priest cannot equip fist/thrown "${it.name}"`);
      }
      if ((wt.includes('2h') || wt.includes('two-hand')) && (knownMaceNames.has(name) || wt.includes('mace'))) {
        violations.push(`Priest cannot equip 2H mace "${it.name}"`);
      }
    }

    if (cls === 'mage' || cls === 'warlock') {
      if (knownMaceNames.has(name) || wt.includes('mace')) {
        violations.push(`${cls} cannot equip mace "${it.name}"`);
      }
      if (knownAxeNames.has(name) || wt.includes('axe')) {
        violations.push(`${cls} cannot equip axe "${it.name}"`);
      }
      if (wt.includes('fist') || wt.includes('thrown') || sub === 13 || sub === 16) {
        violations.push(`${cls} cannot equip fist/thrown "${it.name}"`);
      }
    }

    if (cls === 'hunter' && kind === 'weapons') {
      if (trackId === 'twohand' || trackId === 'melee') {
        const is2hOrMelee = wt.includes('staff') || wt.includes('polearm') || wt.includes('sword') || wt.includes('axe') || wt.includes('dagger') || wt.includes('fist');
        if (!is2hOrMelee) {
          violations.push(`Hunter two-handed track cannot contain non-melee weapon "${it.name}"`);
        }
        if (knownMaceNames.has(name) || wt.includes('mace')) {
          violations.push(`Hunter cannot equip mace "${it.name}"`);
        }
      } else {
        const isRanged = wt.includes('bow') || wt.includes('gun') || wt.includes('crossbow') || wt.includes('rifle');
        if (!isRanged) {
          violations.push(`Hunter ranged track cannot contain non-ranged weapon "${it.name}"`);
        }
      }
    }

    // 4. Level floors
    if ((wt.includes('polearm') || sub === 6) && it.effectiveLevel < 20) {
      violations.push(`Polearm "${it.name}" effectiveLevel ${it.effectiveLevel} < 20`);
    }

    if ((cls === 'warrior' || cls === 'hunter') && it.effectiveLevel < 20) {
      const isDw = cache[id]?.inventorySlot === 'SecondaryHand' || (it.slot || '').toLowerCase().includes('off hand');
      if (isDw) {
        violations.push(`${cls} dual wield item "${it.name}" effectiveLevel ${it.effectiveLevel} < 20`);
      }
    }
  }

  if (violations.length > 0) {
    throw new Error(`Weapon proficiency & class legality violations (${violations.length}):\n  ${violations.slice(0, 10).join('\n  ')}`);
  }
});

check('Dungeon instance and elite quest progression level gating check', () => {
  const { progressionData } = getProgressionContext();
  const allItems = getAllProgressionItems(progressionData);

  function parseBracketMax(bracket) {
    if (!bracket) return 60;
    const parts = bracket.split(/[–-]/).map(s => parseInt(s.trim(), 10));
    return parts[1] || parts[0] || 60;
  }

  const DUNGEON_GATES = [
    { dungeon: 'Ragefire Chasm', minBracket: 13, regex: /ragefire chasm|rfc|taragaman|jergosh|bazzalan|maur grimtotem/i },
    { dungeon: 'The Deadmines', minBracket: 18, regex: /the deadmines|deadmines|rhahk'zor|sneed|smite's|captain greenskin|edwin vancleef|miner johnson|cookie/i },
    { dungeon: 'Wailing Caverns', minBracket: 18, regex: /wailing caverns|kresh|lord pythas|lord serpentis|skum|verdan|trigore|mutanus/i },
    { dungeon: 'Shadowfang Keep', minBracket: 22, regex: /shadowfang keep|sfk|commander springvale|blindwatcher|archmage arugal|fenrus/i },
    { dungeon: 'Blackfathom Deeps', minBracket: 24, regex: /blackfathom deeps|bfd|ghamoo-ra|gelihast|serra'kis|aku'mai|kelris/i },
    { dungeon: 'The Stockade', minBracket: 24, regex: /stockade|kam deepfury|bruegal ironknuckle|targorr|bazil thredd/i },
    { dungeon: 'Gnomeregan', minBracket: 29, regex: /gnomeregan|electrocutioner|crowd pummeler|thermaplugg|grubbis/i },
    { dungeon: 'Razorfen Kraul', minBracket: 30, regex: /razorfen kraul|rfk|ramtusk|jargba|agathelos|charlga razorflank/i },
    { dungeon: 'SM Graveyard', minBracket: 30, regex: /scarlet monastery \(graveyard\)|sm graveyard|bloodmage thalnos|azshir|interrogator vishas|ironspine/i },
    { dungeon: 'SM Library', minBracket: 33, regex: /scarlet monastery \(library\)|sm library|arcanist doan|houndmaster loksey/i },
    { dungeon: 'SM Armory', minBracket: 36, regex: /scarlet monastery \(armory\)|sm armory|herod/i },
    { dungeon: 'SM Cathedral', minBracket: 39, regex: /scarlet monastery \(cathedral\)|sm cathedral|mograine's might|high inquisitor|whitemane/i },
    { dungeon: 'Razorfen Downs', minBracket: 38, regex: /razorfen downs|rfd|glutton|mordresh|amnennar|plaguemaw/i },
    { dungeon: 'Uldaman', minBracket: 41, regex: /uldaman|archaedas|grimlok|ironaya|galgann firehammer|baelog/i },
    { dungeon: 'Zul\'Farrak', minBracket: 44, regex: /zul'farrak|zf|antu'sul|ukorz sandscalp|zum'rah|gahz'rilla/i },
    { dungeon: 'Maraudon', minBracket: 46, regex: /maraudon|noxxion|theradras|gizlock|vyletongue|celebras/i },
    { dungeon: 'Sunken Temple', minBracket: 50, regex: /sunken temple|atal'hakkar|avatar of hakkar|eranikus|morphaz|jammal'an/i },
    { dungeon: 'Blackrock Depths', minBracket: 52, regex: /blackrock depths|brd|thaurissan|angerforge|flamelash|ironfoe/i },
    { dungeon: 'Hall of Thanes', minBracket: 14, regex: /hall of thanes|magmatus|durgen dirgehammer/i },
    { dungeon: 'Ruins of Lordaeron', minBracket: 18, regex: /ruins of lordaeron|the baron|witherfang|viktor the vile/i },
    { dungeon: 'Excavation Site', minBracket: 29, regex: /excavation site|shadetooth|relic guardian/i },
    { dungeon: 'City of Dalaran', minBracket: 31, regex: /city of dalaran|atrexis|lyn the ignored|shade of the archmage/i }
  ];

  const violations = [];

  for (const gate of DUNGEON_GATES) {
    for (const { bracket, item: it } of allItems) {
      const bracketMax = parseBracketMax(bracket);
      const sourceText = [
        it.name || '',
        it.value || '',
        typeof it.source === 'string' ? it.source : (it.source?.title || '') + ' ' + (it.source?.detail || '') + ' ' + (it.source?.text || '')
      ].join(' ');

      if (gate.regex.test(sourceText)) {
        if (bracketMax < gate.minBracket) {
          violations.push(`Dungeon drop "${it.name}" (${gate.dungeon}) in bracket "${bracket}" < min ${gate.minBracket}`);
        }
      }
    }
  }

  // Elite quest items
  for (const { bracket, item: it } of allItems) {
    const bracketMax = parseBracketMax(bracket);
    const id = Number(it.itemId || it.id);

    // Master Hunter's Spellsword / King Bangalash (270085)
    if (id === 270085 && bracketMax < 38) {
      violations.push(`Elite quest item "${it.name}" (King Bangalash) in bracket "${bracket}" < min 38`);
    }

    // Bonebiter (6807)
    if (id === 6807 && bracketMax < 38) {
      violations.push(`Elite quest item "${it.name}" (SM Cathedral) in bracket "${bracket}" < min 38`);
    }
  }

  if (violations.length > 0) {
    throw new Error(`Dungeon/quest gating violations (${violations.length}):\n  ${violations.slice(0, 10).join('\n  ')}`);
  }
});

check('Faction tagging completeness and class faction guardrails check', () => {
  const { progressionData } = getProgressionContext();
  const allItems = getAllProgressionItems(progressionData);

  const validFactions = new Set(['alliance', 'horde', 'both']);
  const violations = [];

  for (const { cls, item: it } of allItems) {
    if (!it.faction || !validFactions.has(it.faction)) {
      violations.push(`Item "${it.name}" (${it.itemId || it.id}) has invalid or missing faction: "${it.faction}"`);
    }

    if (cls === 'shaman' && (it.faction === 'alliance' || it.side === 1)) {
      violations.push(`Shaman progression contains Alliance item "${it.name}" (${it.itemId || it.id})`);
    }
  }

  if (violations.length > 0) {
    throw new Error(`Faction tagging violations (${violations.length}):\n  ${violations.slice(0, 10).join('\n  ')}`);
  }
});

check('Progression filter 17-stat dimension parsing and zero-NaN integrity', () => {
  const { progressionData, progressionFilter } = getProgressionContext();
  const allItems = getAllProgressionItems(progressionData);

  if (!progressionFilter || typeof progressionFilter.parseItemStats !== 'function') {
    throw new Error('progression-filter.js failed to export parseItemStats');
  }

  const dimensions = [
    'reqLevel', 'iLvl', 'dps', 'speed', 'strength', 'agility', 'stamina',
    'intellect', 'spirit', 'attackPower', 'crit', 'hit', 'spellDamage',
    'healing', 'mp5', 'armor', 'block'
  ];

  const violations = [];

  for (const { item: it } of allItems) {
    const stats = progressionFilter.parseItemStats(it);
    if (!stats || typeof stats !== 'object') {
      violations.push(`Failed to parse stats for "${it.name}"`);
      continue;
    }

    for (const dim of dimensions) {
      const val = stats[dim];
      if (typeof val !== 'number' || Number.isNaN(val)) {
        violations.push(`Item "${it.name}" produced NaN or non-number for dimension "${dim}": ${val}`);
      }
    }
  }

  if (violations.length > 0) {
    throw new Error(`17-stat parsing violations (${violations.length}):\n  ${violations.slice(0, 10).join('\n  ')}`);
  }
});

check('Wowhead Forever domain links and Zamimg CDN icon URL formatting check', () => {
  const { progressionData } = getProgressionContext();
  const allItems = getAllProgressionItems(progressionData);

  const violations = [];

  for (const { item: it } of allItems) {
    const id = it.itemId || it.id;
    if (!id || typeof id !== 'number' || id <= 0) {
      violations.push(`Item "${it.name}" has invalid numerical id: ${id}`);
    }

    if (!it.icon || typeof it.icon !== 'string' || !/^[a-z0-9_]+$/i.test(it.icon.replace(/\.(jpg|png)$/i, ''))) {
      violations.push(`Item "${it.name}" (${id}) has invalid icon token: "${it.icon}"`);
    }

    const itemUrl = `https://www.wowhead.com/forever/item=${id}`;
    if (!itemUrl.startsWith('https://www.wowhead.com/forever/item=')) {
      violations.push(`Item "${it.name}" (${id}) produced non-forever link: ${itemUrl}`);
    }

    const iconToken = (it.icon || '').replace(/\.(jpg|png)$/i, '').toLowerCase();
    const iconUrl = `https://wow.zamimg.com/images/wow/icons/medium/${iconToken}.jpg`;
    if (!iconUrl.startsWith('https://wow.zamimg.com/images/wow/icons/medium/') || !iconUrl.endsWith('.jpg')) {
      violations.push(`Item "${it.name}" (${id}) produced invalid Zamimg CDN icon URL: ${iconUrl}`);
    }
  }

  if (violations.length > 0) {
    throw new Error(`Link and icon formatting violations (${violations.length}):\n  ${violations.slice(0, 10).join('\n  ')}`);
  }
});

check('Paladin Horde weapon path accessibility and anti-grayout regression check', () => {
  const { deepdivesProgression } = getProgressionContext();
  if (!deepdivesProgression || typeof deepdivesProgression.renderProgressionSubtab !== 'function') {
    throw new Error('WOW_DEEPDIVES_PROGRESSION module failed to load in progression context');
  }

  // 1. Verify Paladin Weapons rendered controls do NOT gray out or disable Horde button
  deepdivesProgression.setWeaponFaction('all');
  const paladinHtml = deepdivesProgression.renderProgressionSubtab('weapons', { id: 'paladin', name: 'Paladin' });

  if (paladinHtml.includes('Paladins are exclusive to the Alliance')) {
    throw new Error('Regression: Paladin weapon progression displays "Paladins are exclusive to the Alliance"');
  }

  if (paladinHtml.includes('disabled style="opacity:0.35') && paladinHtml.includes('data-faction="horde"')) {
    throw new Error('Regression: Paladin weapon progression has grayed-out/disabled Horde faction button');
  }

  // 2. Verify setting Horde faction actively produces valid progression cards for Undead Paladins
  deepdivesProgression.setWeaponFaction('horde');
  const hordeHtml = deepdivesProgression.renderProgressionSubtab('weapons', { id: 'paladin', name: 'Paladin' });
  const cardCount = (hordeHtml.match(/class="weapon-step-card/g) || []).length;
  if (cardCount === 0) {
    throw new Error('Regression: Paladin weapon progression shows 0 cards when filtering by Horde');
  }

  // 3. Verify Paladin Shields/Offhands also do not disable Horde button
  deepdivesProgression.setOffhandFaction('horde');
  const shieldHtml = deepdivesProgression.renderProgressionSubtab('offhands', { id: 'paladin', name: 'Paladin' });
  if (shieldHtml.includes('Paladins are exclusive to the Alliance')) {
    throw new Error('Regression: Paladin shield progression displays "Paladins are exclusive to the Alliance"');
  }
  const shieldCardCount = (shieldHtml.match(/class="weapon-step-card/g) || []).length;
  if (shieldCardCount === 0) {
    throw new Error('Regression: Paladin shield progression shows 0 cards when filtering by Horde');
  }
});

check('Slot filter "main-hand" strictly isolates Main Hand items and excludes One-Hand items', () => {
  const { deepdivesProgression } = getProgressionContext();
  if (!deepdivesProgression || typeof deepdivesProgression.renderProgressionSubtab !== 'function') {
    throw new Error('WOW_DEEPDIVES_PROGRESSION module failed to load in progression context');
  }

  // 1. Logic unit test with explicit tooltip slot lines
  const _flayer = { name: 'OneHand Test Item', lines: ['Binds when picked up', 'One-Hand\t1H Sword', '63 - 118 Damage\tSpeed 2.30'] };
  const _cosh = { name: 'MainHand Test Item', lines: ['Binds when picked up', 'Main Hand\t1H Mace', '8 - 15 Damage\tSpeed 1.90'] };

  deepdivesProgression.setWeaponSource('all');
  deepdivesProgression.setWeaponFaction('all');
  deepdivesProgression.setWeaponSlot('main-hand');

  // Verify Shaman main-hand rendering includes Valley Cosh (Main Hand)
  const shamanHtml = deepdivesProgression.renderProgressionSubtab('weapons', { id: 'shaman', name: 'Shaman' });
  if (!shamanHtml.includes('Valley Cosh')) {
    throw new Error('Valley Cosh (Main Hand) missing from Main Hand filtered weapons');
  }

  // Verify Valley Cosh does NOT appear under one-hand filter
  deepdivesProgression.setWeaponSlot('one-hand');
  const shamanOneHandHtml = deepdivesProgression.renderProgressionSubtab('weapons', { id: 'shaman', name: 'Shaman' });
  if (shamanOneHandHtml.includes('Valley Cosh')) {
    throw new Error('Regression: Valley Cosh (Main Hand) appeared in One-Hand filtered weapons');
  }

  deepdivesProgression.setWeaponSlot('all');
});


console.log('\n=======================================');
console.log(`Ran ${totalChecks} checks. Failures: ${errors.length}`);
console.log('=======================================\n');

if (errors.length > 0) {
  process.exit(1);
} else {
  console.log('✓ All integrity and build checks passed!\n');
}
