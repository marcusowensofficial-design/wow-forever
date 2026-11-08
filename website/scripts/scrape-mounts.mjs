import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');

const MOUNTS_IMG_DIR = path.join(ROOT, 'images', 'mounts');
if (!fs.existsSync(MOUNTS_IMG_DIR)) {
  fs.mkdirSync(MOUNTS_IMG_DIR, { recursive: true });
}

const FIRECRAWL_KEY = process.env.FIRECRAWL_API_KEY || 'fc-a65f7b3acd1e4761b08aaa4064b73052';

const EXTERNAL_DATAMINED_IMAGES = {
  // 5 Devilsaur Mounts
  'Black Devilsaur Mount': 'https://www.wow-petopia.com/images/skin_mid/trexskinblack.jpg',
  'Blue Devilsaur Mount': 'https://www.wow-petopia.com/images/skin_mid/zandalaridevilsaur_blue.jpg',
  'Green Devilsaur Mount': 'https://www.wow-petopia.com/images/skin_mid/trexskingreen.jpg',
  'Purple Devilsaur Mount': 'https://www.wow-petopia.com/images/skin_mid/devilsaptor_purple.jpg',
  'White Devilsaur Mount': 'https://www.wow-petopia.com/images/skin_mid/trexskinwhite.jpg',

  // 4 Druid Moose Mounts
  'Black Druid Moose Mount': 'https://www.warcraftmounts.com/images/skins/moosemount2black.jpg',
  'Gray Druid Moose Mount': 'https://www.warcraftmounts.com/images/thumbs/moosemount2albino.jpg',
  'Green Druid Moose Mount': 'https://www.warcraftmounts.com/images/skins/moosemount2.jpg',
  'White Druid Moose Mount': 'https://www.warcraftmounts.com/images/skins/moosemount2white.jpg',

  // 4 Warden Saber Mounts
  'Black Warden Saber Mount': 'https://www.warcraftmounts.com/images/skins/ridingtigerskinblack.jpg',
  'Brown Warden Saber Mount': 'https://www.warcraftmounts.com/images/skins/ridingtigerskinbrown.jpg',
  'Gray Warden Saber Mount': 'https://www.warcraftmounts.com/images/skins/nightsaber2purplemount.jpg',
  'White Warden Saber Mount': 'https://www.warcraftmounts.com/images/skins/ridingtigerskinwhite.jpg'
};

async function downloadFile(url, destPath) {
  if (fs.existsSync(destPath) && fs.statSync(destPath).size > 0) {
    return true;
  }
  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36'
      }
    });
    if (!res.ok) {
      console.warn(`[WARN] HTTP ${res.status} for ${url}`);
      return false;
    }
    const buf = Buffer.from(await res.arrayBuffer());
    fs.writeFileSync(destPath, buf);
    return true;
  } catch (err) {
    console.error(`[ERROR] Failed to download ${url}: ${err.message}`);
    return false;
  }
}

function slugify(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

async function scrapeForeverDbMounts() {
  console.log('--- Launching headless browser to scrape https://foreverdb.net/mounts ---');
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  await page.goto('https://foreverdb.net/mounts', { waitUntil: 'networkidle', timeout: 30000 });

  const scrapedMounts = await page.evaluate(() => {
    /* global document */
    const mountMap = new Map();
    const articles = document.querySelectorAll('article.mt-card');

    articles.forEach(a => {
      const rawId = a.id.replace(/^(mount|all)-/, '');
      if (mountMap.has(rawId)) return;

      const nameEl = a.querySelector('h3 a');
      const name = nameEl ? nameEl.innerText.trim() : '';
      const href = nameEl ? nameEl.getAttribute('href') : '';
      const itemIdMatch = href ? href.match(/\/item\/(\d+)/) : null;
      const spellIdMatch = href ? href.match(/\/spell\/(\d+)/) : null;

      const imgEl = a.querySelector('img.mt-img');
      const creatureImg = imgEl ? imgEl.getAttribute('src') : null;

      const badges = Array.from(a.querySelectorAll('.badge')).map(b => ({
        text: b.innerText.trim(),
        title: b.getAttribute('title') || '',
        className: b.className
      }));

      const facts = Array.from(a.querySelectorAll('.mt-facts > span')).map(s => ({
        text: s.innerText.trim(),
        title: s.getAttribute('title') || ''
      }));

      const srcEl = a.querySelector('.mt-src');
      const sourceText = srcEl ? srcEl.innerText.trim() : '';

      const specEl = a.querySelector('.mt-spec');
      const specText = specEl ? specEl.innerText.replace(/^Speculation:\s*/i, '').trim() : '';

      // Parse facts
      let speed = '';
      let ridingSkill = '';
      let cost = '';
      let level = 0;
      let restriction = '';

      for (const f of facts) {
        const txt = f.text;
        if (txt.includes('speed') || txt.includes('bonus')) {
          speed = txt;
        } else if (txt.includes('Riding') || txt.includes('Piloting') || txt.includes('Horsemanship')) {
          ridingSkill = txt;
        } else if (/\d+g$/.test(txt)) {
          cost = txt;
        } else if (txt.startsWith('Level ')) {
          level = parseInt(txt.replace('Level ', ''), 10) || 0;
        } else if (txt.includes('only') || txt.includes('Paladins') || txt.includes('Warlocks')) {
          restriction = txt;
        }
      }

      const isNew = badges.some(b => b.text.includes('NEW IN FOREVER'));
      const isChanged = badges.some(b => b.text.includes('CHANGED'));
      const isSpec = badges.some(b => b.text.includes('SPECULATION'));

      mountMap.set(rawId, {
        rawId,
        name,
        itemId: itemIdMatch ? parseInt(itemIdMatch[1], 10) : null,
        spellId: spellIdMatch ? parseInt(spellIdMatch[1], 10) : null,
        creatureImg,
        isNew,
        isChanged,
        isSpec,
        speed,
        ridingSkill,
        cost,
        level,
        restriction,
        sourceText,
        specText
      });
    });

    return Array.from(mountMap.values());
  });

  await browser.close();
  console.log(`Scraped ${scrapedMounts.length} unique mounts from ForeverDB.`);
  return scrapedMounts;
}

async function run() {
  const scrapedMounts = await scrapeForeverDbMounts();

  // Load existing collections-data.js
  const colPath = path.join(ROOT, 'js/data/collections-data.js');
  const colText = fs.readFileSync(colPath, 'utf8');
  const colWin = {};
  eval(colText.replace('window.', 'colWin.'));
  const existingMounts = colWin.WOW_COLLECTIONS_DATA?.mounts || [];
  console.log(`Existing mounts in collections-data.js: ${existingMounts.length}`);

  let downloadedCount = 0;

  // Process and download images
  for (const sm of scrapedMounts) {
    let localRelPath = '';

    if (sm.creatureImg) {
      // ForeverDB client creature image: img/creatures/{id}.webp
      const cIdMatch = sm.creatureImg.match(/creatures\/([a-zA-Z0-9_-]+)\.webp/);
      const cId = cIdMatch ? cIdMatch[1] : sm.rawId;
      const fileName = `${cId}.webp`;
      const fullDest = path.join(MOUNTS_IMG_DIR, fileName);
      const remoteUrl = `https://foreverdb.net/${sm.creatureImg}`;

      const ok = await downloadFile(remoteUrl, fullDest);
      if (ok) {
        localRelPath = `images/mounts/${fileName}`;
        downloadedCount++;
      }
    } else if (EXTERNAL_DATAMINED_IMAGES[sm.name]) {
      // 13 unreleased datamined mounts with models from Petopia/WarcraftMounts
      const extUrl = EXTERNAL_DATAMINED_IMAGES[sm.name];
      const ext = path.extname(extUrl) || '.jpg';
      const fileName = `${slugify(sm.name)}${ext}`;
      const fullDest = path.join(MOUNTS_IMG_DIR, fileName);

      const ok = await downloadFile(extUrl, fullDest);
      if (ok) {
        localRelPath = `images/mounts/${fileName}`;
        downloadedCount++;
      }
    }

    sm.localImagePath = localRelPath;
  }

  console.log(`Image processing complete: ${downloadedCount} images verified/downloaded.`);

  // Now enrich existing mounts or match with scraped mounts
  const enrichedMounts = existingMounts.map(em => {
    // Match by itemId, spellId, or name
    const sm = scrapedMounts.find(s => 
      (em.itemId && s.itemId && em.itemId === s.itemId) ||
      (em.spellId && s.spellId && em.spellId === s.spellId) ||
      (em.name.toLowerCase() === s.name.toLowerCase())
    ) || {};

    const speed = sm.speed || (em.level === 60 ? '100% speed' : (em.level === 40 ? '60% speed' : 'Special'));
    const speedType = speed.includes('100%') ? 'epic' : (speed.includes('60%') ? 'normal' : (speed.includes('Scales') ? 'scales' : 'special'));
    const isNew = sm.isNew !== undefined ? sm.isNew : em.isSpeculation;
    const isChanged = sm.isChanged || false;
    const isSpec = sm.isSpec !== undefined ? sm.isSpec : em.isSpeculation;
    const cost = sm.cost || (em.level === 60 ? '100g' : (em.level === 40 ? '80g' : ''));
    const ridingSkill = sm.ridingSkill || (em.level === 60 ? 'Riding 150' : (em.level === 40 ? 'Riding 75' : ''));
    const sourceDetail = sm.sourceText || em.sourceDetail || '';
    const specReason = sm.specText || em.notes || '';
    const image = sm.localImagePath || `images/mounts/${slugify(em.name)}.webp`;

    // Strictly enforce canonical Horde Paladin invariant
    let faction = em.faction;
    let side = em.side;
    let classRestriction = em.classRestriction;
    if (em.name === 'Forsaken Charger') {
      faction = 'Horde';
      side = 'H';
      classRestriction = 'PALADIN';
    }

    return {
      spellId: em.spellId,
      itemId: em.itemId,
      name: em.name,
      faction,
      side,
      level: sm.level || em.level,
      flags: em.flags,
      sourceType: em.sourceType,
      sourceDetail,
      notes: em.notes,
      speculationReason: specReason,
      classRestriction,
      isSpeculation: isSpec,
      isNewInForever: isNew,
      isChanged,
      speed,
      speedType,
      ridingSkill,
      cost,
      image,
      wowheadUrl: em.wowheadUrl
    };
  });

  // Write enriched collections dataset
  const updatedData = {
    ...colWin.WOW_COLLECTIONS_DATA,
    meta: {
      ...colWin.WOW_COLLECTIONS_DATA.meta,
      mountsCount: enrichedMounts.length,
      updatedAt: '2026-11-02'
    },
    mounts: enrichedMounts
  };

  const fileContent = `/**
 * World of Warcraft: Forever - Collections Directory (Mounts, Vanity Pets, Titles)
 * Datamined from WoW Forever Client (Build 1.60.1.70707)
 * Ingested and enriched from ForeverDB open data under GPL-3.0 attribution
 */
window.WOW_COLLECTIONS_DATA = ${JSON.stringify(updatedData, null, 2)};
`;

  fs.writeFileSync(colPath, fileContent, 'utf8');
  console.log(`Updated ${colPath} with ${enrichedMounts.length} enriched mounts.`);
}

run().catch(err => {
  console.error('[FATAL ERROR]:', err);
  process.exit(1);
});
