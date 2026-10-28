import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');

const dungeons = [
  'ragefire-chasm',
  'the-stockade',
  'the-deadmines',
  'wailing-caverns',
  'shadowfang-keep',
  'blackfathom-deeps',
  'hall-of-thanes',
  'ruins-of-lordaeron',
  'excavation-site-wetlands',
  'city-of-dalaran'
];

const scratchDir = 'C:/Users/marco/.gemini/antigravity/brain/36315a22-a155-4a5f-b1d2-7fc209310dbd/scratch';
const imagesBaseDir = path.join(ROOT, 'images', 'dungeons');

async function downloadFile(url, destPath) {
  if (fs.existsSync(destPath) && fs.statSync(destPath).size > 0) {
    return; // Already downloaded
  }
  try {
    const res = await fetch(url);
    if (!res.ok) {
      console.error(`Failed to download ${url}: status ${res.status}`);
      return;
    }
    const buf = Buffer.from(await res.arrayBuffer());
    fs.writeFileSync(destPath, buf);
  } catch (e) {
    console.error(`Error downloading ${url}:`, e.message);
  }
}

function slugify(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

async function runDownload() {
  for (const slug of dungeons) {
    const dungeonDir = path.join(imagesBaseDir, slug);
    if (!fs.existsSync(dungeonDir)) {
      fs.mkdirSync(dungeonDir, { recursive: true });
    }

    const html = fs.readFileSync(path.join(scratchDir, `${slug}.html`), 'utf8');

    // 1. Entrance images
    const locSectionMatch = html.match(/id="location"[\s\S]*?<div class="section-content">([\s\S]*?)<\/div>\s*<\/div>/i);
    if (locSectionMatch) {
      const locImgs = [...locSectionMatch[1].matchAll(/<img[^>]+src=["']([^"']+)["']/gi)].map(m => m[1]);
      for (let i = 0; i < locImgs.length; i++) {
        let u = locImgs[i];
        if (u.startsWith('/')) u = 'https://www.method.gg' + u;
        const ext = path.extname(u.split('?')[0]) || '.jpg';
        const dest = path.join(dungeonDir, `entrance-${i + 1}${ext}`);
        await downloadFile(u, dest);
      }
    }

    // 2. Dungeon Maps
    const mapSectionMatch = html.match(/id="dungeon-map"[\s\S]*?<div class="section-content">([\s\S]*?)<\/div>\s*<\/div>/i);
    if (mapSectionMatch) {
      const mapImgs = [...mapSectionMatch[1].matchAll(/<img[^>]+src=["']([^"']+)["']/gi)].map(m => m[1]);
      for (let i = 0; i < mapImgs.length; i++) {
        let u = mapImgs[i];
        if (u.startsWith('/')) u = 'https://www.method.gg' + u;
        const ext = path.extname(u.split('?')[0]) || '.png';
        const dest = path.join(dungeonDir, `map-${i + 1}${ext}`);
        await downloadFile(u, dest);
      }
    }

    // 3. Trash mob images
    const trashTiles = [...html.matchAll(/<div class="mob-tile\s*">([\s\S]*?)(?=<div class="mob-tile\s*"|id="bosses"|<div id="dungeon-loot"|$)/gi)];
    for (const tile of trashTiles) {
      const nameMatch = tile[1].match(/<h3 class="mob-name">([\s\S]*?)<\/h3>/i);
      const imgMatch = tile[1].match(/<img[^>]+src=["']([^"']+)["']/i);
      if (nameMatch && imgMatch) {
        const name = nameMatch[1].replace(/<[^>]+>/g, '').trim();
        let u = imgMatch[1];
        if (u.startsWith('/')) u = 'https://www.method.gg' + u;
        const ext = path.extname(u.split('?')[0]) || '.jpg';
        const dest = path.join(dungeonDir, `trash-${slugify(name)}${ext}`);
        await downloadFile(u, dest);
      }
    }

    // 4. Boss images
    const bossPanes = [...html.matchAll(/<div role="tabpanel"[^>]*id="boss-\d+"[^>]*>([\s\S]*?)(?=<div role="tabpanel" id="boss-\d+"|<div id="dungeon-loot"|<\/div>\s*<\/div>\s*<\/div>\s*<div id="dungeon-loot"|$)/gi)];
    for (const pane of bossPanes) {
      const nameMatch = pane[1].match(/<h3 class="mob-name">([\s\S]*?)<\/h3>/i);
      const imgMatch = pane[1].match(/<img[^>]+src=["']([^"']+)["']/i);
      if (nameMatch && imgMatch) {
        const name = nameMatch[1].replace(/<[^>]+>/g, '').trim();
        let u = imgMatch[1];
        if (u.startsWith('/')) u = 'https://www.method.gg' + u;
        const ext = path.extname(u.split('?')[0]) || '.jpg';
        const dest = path.join(dungeonDir, `boss-${slugify(name)}${ext}`);
        await downloadFile(u, dest);
      }
    }

    const downloaded = fs.readdirSync(dungeonDir);
    console.log(`[${slug}] downloaded ${downloaded.length} images:`, downloaded.slice(0, 5));
  }
}

runDownload().catch(console.error);
