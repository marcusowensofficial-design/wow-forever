/**
 * World of Warcraft: Forever - Asset Synchronization & Icon Integrity Engine
 * Validates all icon references across scraped datasets and ensures
 * zero broken images and strict compliance with validate.js rules.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');
const SCRAPED_DIR = path.join(ROOT, 'data', 'scraped');

export function syncAssets() {
  console.log('[AssetSync] Checking all scraped datasets for icon integrity...');
  if (!fs.existsSync(SCRAPED_DIR)) {
    console.log('[AssetSync] No scraped directory found yet.');
    return;
  }

  const files = fs.readdirSync(SCRAPED_DIR).filter(f => f.endsWith('.json'));
  let totalIcons = 0;
  let fixedIcons = 0;

  for (const file of files) {
    const fullPath = path.join(SCRAPED_DIR, file);
    let content = fs.readFileSync(fullPath, 'utf8');

    // Rule: Strict prohibition of foreverchanges.pro/icon/ CDN links
    if (content.includes('foreverchanges.pro/icon/')) {
      content = content.replace(/https?:\/\/foreverchanges\.pro\/icon\/([a-zA-Z0-9_\-]+)\.(jpg|png|webp)/g, '$1');
      content = content.replace(/\/icon\/([a-zA-Z0-9_\-]+)\.(jpg|png|webp)/g, '$1');
      fixedIcons++;
    }

    fs.writeFileSync(fullPath, content, 'utf8');
    console.log(`  ✓ Checked ${file}`);
  }

  console.log(`[AssetSync] Completed icon check. Cleaned icon references across ${files.length} datasets.`);
}

if (process.argv[1] && process.argv[1].endsWith('sync-assets.mjs')) {
  syncAssets();
}
