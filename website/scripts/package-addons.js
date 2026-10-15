#!/usr/bin/env node

/**
 * package-addons.js
 * Automatically packages clean, release-ready zip archives for the WoW Forever Addon Suite
 * into website/downloads/ using zero-dependency cross-platform Node.js zip compression.
 */

import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { createZipArchive } from './zip-util.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const REPO_ROOT = path.resolve(__dirname, '../..');
const ADDONS_DIR = path.resolve(REPO_ROOT, 'addons');
const DOWNLOADS_DIR = path.resolve(REPO_ROOT, 'website/downloads');

if (!fs.existsSync(DOWNLOADS_DIR)) {
  fs.mkdirSync(DOWNLOADS_DIR, { recursive: true });
}

const ADDON_FOLDERS = [
  'ForeverPlates',
  'Foreverplatescastbars',
  'ForeverLiquid',
  'ForeverDungeonJournal',
  'ForeverBlessings',
  'EchoTwist'
];

const IGNORE_PATTERNS = [
  /\.git/i,
  /scratch/i,
  /tools/i,
  /media-scratch/i,
  /\.py$/i,
  /\.pyc$/i,
  /__pycache__/i,
  /\.DS_Store/i,
  /Thumbs\.db/i,
  /SKILL\.md$/i,
  /ARCHITECTURE\.md$/i,
  /\.pkgmeta$/i,
  /\.orig(\.|$)/i
];

function shouldInclude(relPath) {
  const norm = relPath.replace(/\\/g, '/');
  return !IGNORE_PATTERNS.some(re => re.test(norm));
}

function getAddonVersion(addonFolder) {
  const tocPath = path.join(ADDONS_DIR, addonFolder, `${addonFolder}.toc`);
  if (fs.existsSync(tocPath)) {
    const content = fs.readFileSync(tocPath, 'utf8');
    const match = content.match(/##\s*Version:\s*([^\r\n]+)/i);
    if (match && match[1]) {
      return match[1].trim().replace(/^v/i, '');
    }
  }
  return '1.0.0';
}

function collectFiles(baseDir, prefix = '') {
  let results = [];
  const entries = fs.readdirSync(baseDir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(baseDir, entry.name);
    const relPath = prefix ? `${prefix}/${entry.name}` : entry.name;

    if (!shouldInclude(relPath)) continue;

    if (entry.isDirectory()) {
      results = results.concat(collectFiles(fullPath, relPath));
    } else if (entry.isFile()) {
      const stat = fs.statSync(fullPath);
      results.push({
        relPath,
        data: fs.readFileSync(fullPath),
        mtime: stat.mtime
      });
    }
  }
  return results;
}

function sha256File(filePath) {
  const data = fs.readFileSync(filePath);
  return crypto.createHash('sha256').update(data).digest('hex');
}

console.log('⚔️  WoW Forever Addon Release Packaging Pipeline (Cross-Platform Node)');
console.log(`Source Addons: ${ADDONS_DIR}`);
console.log(`Output Downloads: ${DOWNLOADS_DIR}`);

const manifest = [];
let allSuiteFiles = [];

// 1. Package individual addons
for (const folder of ADDON_FOLDERS) {
  const addonSrc = path.join(ADDONS_DIR, folder);
  if (!fs.existsSync(addonSrc)) {
    console.warn(`⚠️ Warning: Addon directory not found: ${addonSrc}`);
    continue;
  }

  const version = getAddonVersion(folder);
  const files = collectFiles(addonSrc, folder);
  const zipName = `${folder}-v${version}.zip`;
  const zipPath = path.join(DOWNLOADS_DIR, zipName);

  console.log(`📦 Packaging ${folder} v${version} (${files.length} files)...`);
  createZipArchive(files, zipPath);

  const stats = fs.statSync(zipPath);
  const sizeKb = Math.round(stats.size / 1024);
  const checksum = sha256File(zipPath);
  console.log(`   ✓ ${zipName} (${sizeKb} KB) [sha256: ${checksum.slice(0, 10)}...]`);

  manifest.push({
    name: folder,
    version,
    filename: zipName,
    sizeKb,
    sha256: checksum,
    downloadPath: `downloads/${zipName}`
  });

  allSuiteFiles = allSuiteFiles.concat(files);
}

// 2. Package complete Master Suite (all 6 addons bundled)
console.log(`\n💎 Packaging Master Addon Suite (${allSuiteFiles.length} total files)...`);
const masterZipName = 'Marcus-WoWForever-Addon-Suite.zip';
const masterZipPath = path.join(DOWNLOADS_DIR, masterZipName);
createZipArchive(allSuiteFiles, masterZipPath);

const masterStats = fs.statSync(masterZipPath);
const masterSizeKb = Math.round(masterStats.size / 1024);
const masterChecksum = sha256File(masterZipPath);
console.log(`   ✓ ${masterZipName} (${masterSizeKb} KB) [sha256: ${masterChecksum.slice(0, 10)}...]`);

// 3. Output Manifest JSON
const manifestPath = path.join(DOWNLOADS_DIR, 'manifest.json');
fs.writeFileSync(manifestPath, JSON.stringify({
  generatedAt: new Date().toISOString(),
  targetInterface: 16001,
  engine: 'Camelot 12.0',
  masterSuite: {
    filename: masterZipName,
    sizeKb: masterSizeKb,
    sha256: masterChecksum,
    downloadPath: `downloads/${masterZipName}`
  },
  addons: manifest
}, null, 2));

// 4. Purge obsolete archives not present in current manifest
const activeZips = new Set([masterZipName, ...manifest.map(m => m.filename)]);
for (const file of fs.readdirSync(DOWNLOADS_DIR)) {
  if (file.endsWith('.zip') && !activeZips.has(file)) {
    fs.unlinkSync(path.join(DOWNLOADS_DIR, file));
    console.log(`   🗑️  Cleaned up obsolete archive: ${file}`);
  }
}

console.log(`\n🎉 All ${manifest.length} addons + Master Suite packaged successfully!`);
console.log(`Manifest saved to ${manifestPath}`);

