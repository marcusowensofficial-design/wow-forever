/**
 * Writes a short content hash for every lazy-loaded data bundle into js/modules/data-loader.js
 * (between the FILE_VERSIONS:BEGIN / FILE_VERSIONS:END markers). Browsers then cache each bundle
 * until its own content changes, instead of re-downloading ~25 MB after every CACHE_VERSION bump.
 *
 * Usage:
 *   node scripts/stamp-data-versions.mjs           update the hashes (run after changing any bundle)
 *   node scripts/stamp-data-versions.mjs --check   exit 1 if any hash is stale (used by npm test)
 */
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const LOADER = path.join(ROOT, 'js', 'modules', 'data-loader.js');
const src = fs.readFileSync(LOADER, 'utf8');

// Every file listed in a BUNDLES `files: [...]` array.
const files = [...new Set([...src.matchAll(/files:\s*\[([^\]]*)\]/g)]
  .flatMap(m => [...m[1].matchAll(/'([^']+)'/g)].map(x => x[1])))].sort();

// Hash with CRLF folded to LF: git's core.autocrlf rewrites working copies with CRLF on Windows
// checkouts, while the repo (and Render) serve LF. Hashing raw bytes made the hash depend on
// which machine ran the script. latin1 round-trips bytes 1:1, so LF files hash exactly as before.
const lfBytes = file => fs.readFileSync(file).toString('latin1').replace(/\r\n/g, '\n');

const versions = Object.fromEntries(files.map(f => {
  const hash = crypto.createHash('sha1').update(lfBytes(path.join(ROOT, f)), 'latin1').digest('hex').slice(0, 10);
  return [f, hash];
}));

const block = `  // FILE_VERSIONS:BEGIN\n  const FILE_VERSIONS = ${JSON.stringify(versions, null, 2).replace(/\n/g, '\n  ')};\n  // FILE_VERSIONS:END`;
const re = / {2}\/\/ FILE_VERSIONS:BEGIN[\s\S]*?\/\/ FILE_VERSIONS:END/;
if (!re.test(src)) {
  console.error('FILE_VERSIONS markers not found in js/modules/data-loader.js');
  process.exit(1);
}
const next = src.replace(re, block);

if (process.argv.includes('--check')) {
  if (next.replace(/\r\n/g, '\n') !== src.replace(/\r\n/g, '\n')) {
    console.error('✗ Lazy bundle hashes in data-loader.js are stale. Run: node scripts/stamp-data-versions.mjs');
    process.exit(1);
  }
  console.log(`✓ Lazy bundle hashes are current (${files.length} files)`);
} else {
  fs.writeFileSync(LOADER, next, 'utf8');
  console.log(`Stamped ${files.length} lazy bundles:`);
  for (const [f, h] of Object.entries(versions)) console.log(`  ${h}  ${f}`);
}
