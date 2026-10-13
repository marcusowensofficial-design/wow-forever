#!/usr/bin/env node

/**
 * package-addons.js
 * Automatically packages clean, release-ready zip archives for the WoW Forever Addon Suite
 * into website/downloads/ using native PowerShell Compress-Archive.
 */

import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const REPO_ROOT = path.resolve(__dirname, '../..');
const ADDONS_DIR = path.resolve(REPO_ROOT, 'addons');
const DOWNLOADS_DIR = path.resolve(REPO_ROOT, 'website/downloads');
const TEMP_DIR = path.resolve(REPO_ROOT, 'website/scratch/addon-packaging-temp');

if (!fs.existsSync(DOWNLOADS_DIR)) {
  fs.mkdirSync(DOWNLOADS_DIR, { recursive: true });
}

const ADDON_DEFS = [
  { name: 'ForeverPlates', version: '2.1.0', folder: 'ForeverPlates' },
  { name: 'Foreverplatescastbars', version: '2.2.0', folder: 'Foreverplatescastbars' },
  { name: 'ForeverLiquid', version: '1.3.0', folder: 'ForeverLiquid' },
  { name: 'ForeverDungeonJournal', version: '1.6.0', folder: 'ForeverDungeonJournal' },
  { name: 'ForeverBlessings', version: '1.1.0', folder: 'ForeverBlessings' },
  { name: 'EchoTwist', version: '1.0.0', folder: 'EchoTwist' }
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
  /Thumbs\.db/i
];

function shouldCopy(srcPath) {
  const norm = srcPath.replace(/\\/g, '/');
  return !IGNORE_PATTERNS.some(re => re.test(norm));
}

function copyCleanDir(srcDir, destDir) {
  if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });
  const entries = fs.readdirSync(srcDir, { withFileTypes: true });

  for (const entry of entries) {
    const srcEntryPath = path.join(srcDir, entry.name);
    const destEntryPath = path.join(destDir, entry.name);

    if (!shouldCopy(srcEntryPath)) continue;

    if (entry.isDirectory()) {
      copyCleanDir(srcEntryPath, destEntryPath);
    } else if (entry.isFile()) {
      fs.copyFileSync(srcEntryPath, destEntryPath);
    }
  }
}

function zipDirectory(sourcePath, outZipPath) {
  if (fs.existsSync(outZipPath)) {
    fs.unlinkSync(outZipPath);
  }
  const cmd = `powershell -NoProfile -ExecutionPolicy Bypass -Command "Compress-Archive -Path '${sourcePath}' -DestinationPath '${outZipPath}' -Force"`;
  execSync(cmd, { stdio: 'pipe' });
}

console.log('⚔️  WoW Forever Addon Release Packaging Pipeline');
console.log(`Source Addons: ${ADDONS_DIR}`);
console.log(`Output Downloads: ${DOWNLOADS_DIR}`);

if (fs.existsSync(TEMP_DIR)) {
  fs.rmSync(TEMP_DIR, { recursive: true, force: true });
}
fs.mkdirSync(TEMP_DIR, { recursive: true });

const manifest = [];

// 1. Package individual addons
for (const addon of ADDON_DEFS) {
  const addonSrc = path.join(ADDONS_DIR, addon.folder);
  if (!fs.existsSync(addonSrc)) {
    console.warn(`⚠️ Warning: Addon directory not found: ${addonSrc}`);
    continue;
  }

  const cleanTemp = path.join(TEMP_DIR, addon.folder);
  copyCleanDir(addonSrc, cleanTemp);

  const zipName = `${addon.name}-v${addon.version}.zip`;
  const zipPath = path.join(DOWNLOADS_DIR, zipName);

  console.log(`📦 Packaging ${addon.name} v${addon.version}...`);
  zipDirectory(cleanTemp, zipPath);

  const stats = fs.statSync(zipPath);
  const sizeKb = Math.round(stats.size / 1024);
  console.log(`   ✓ ${zipName} (${sizeKb} KB)`);

  manifest.push({
    name: addon.name,
    version: addon.version,
    filename: zipName,
    sizeKb,
    downloadPath: `downloads/${zipName}`
  });
}

// 2. Package complete Master Suite (all 6 addons together)
console.log('💎 Packaging Master Addon Suite (All-in-One)...');
const masterTemp = path.join(TEMP_DIR, 'suite');
fs.mkdirSync(masterTemp, { recursive: true });

for (const addon of ADDON_DEFS) {
  const addonSrc = path.join(ADDONS_DIR, addon.folder);
  const destSub = path.join(masterTemp, addon.folder);
  copyCleanDir(addonSrc, destSub);
}

const masterZipName = 'Marcus-WoWForever-Addon-Suite.zip';
const masterZipPath = path.join(DOWNLOADS_DIR, masterZipName);
zipDirectory(`${masterTemp}/*`, masterZipPath);

const masterStats = fs.statSync(masterZipPath);
const masterSizeKb = Math.round(masterStats.size / 1024);
console.log(`   ✓ ${masterZipName} (${masterSizeKb} KB)`);

// 3. Clean up temp folder
fs.rmSync(TEMP_DIR, { recursive: true, force: true });

// 4. Output Manifest JSON
const manifestPath = path.join(DOWNLOADS_DIR, 'manifest.json');
fs.writeFileSync(manifestPath, JSON.stringify({
  generatedAt: new Date().toISOString(),
  targetInterface: 16001,
  engine: 'Camelot 12.0',
  masterSuite: {
    filename: masterZipName,
    sizeKb: masterSizeKb,
    downloadPath: `downloads/${masterZipName}`
  },
  addons: manifest
}, null, 2));

console.log(`\n🎉 All ${manifest.length} addons + Master Suite packaged successfully!`);
console.log(`Manifest saved to ${manifestPath}`);
