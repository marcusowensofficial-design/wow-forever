/**
 * scripts/verify_dungeon_tooltips.js
 * Verification test suite for dungeon loot tooltips and 4-column matrix integrity.
 */

import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';

const ROOT_DIR = process.cwd();
const tooltipsFile = path.join(ROOT_DIR, 'js', 'data', 'dungeon-loot-tooltips.js');
const dungeonsDataFile = path.join(ROOT_DIR, 'js', 'data', 'dungeons-data.js');

let passCount = 0;
let failCount = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`  ✓ ${message}`);
    passCount++;
  } else {
    console.error(`  ✗ FAIL: ${message}`);
    failCount++;
  }
}

console.log('--- 1. TOOLTIP DATASET INTEGRITY ---');
assert(fs.existsSync(tooltipsFile), 'js/data/dungeon-loot-tooltips.js exists');

// Load tooltips dataset in sandbox
const sandbox = { window: {} };
vm.createContext(sandbox);
const code = fs.readFileSync(tooltipsFile, 'utf8');
vm.runInContext(code, sandbox);

const tooltips = sandbox.window.WOW_DUNGEON_LOOT_TOOLTIPS;
assert(tooltips && typeof tooltips === 'object', 'window.WOW_DUNGEON_LOOT_TOOLTIPS is defined and is an object');

const itemIds = Object.keys(tooltips);
assert(itemIds.length >= 215, `Contains at least 215 item tooltips (found: ${itemIds.length})`);

let invalidTooltips = 0;
let missingIcons = 0;
let missingHtml = 0;

for (const [id, item] of Object.entries(tooltips)) {
  if (!item.name || !item.quality || !item.slot) {
    invalidTooltips++;
  }
  if (!item.icon) {
    missingIcons++;
  }
  if (!item.htmlTooltip || !item.htmlTooltip.includes('<table>')) {
    missingHtml++;
  }
}

assert(invalidTooltips === 0, `All ${itemIds.length} items have complete metadata (name, quality, slot)`);
assert(missingIcons === 0, `All ${itemIds.length} items have valid Zamimg icon tokens`);
assert(missingHtml === 0, `All ${itemIds.length} items have non-empty Blizzard HTML tooltips`);

console.log('\n--- 2. DUNGEONS DATA INTEGRATION ---');
assert(fs.existsSync(dungeonsDataFile), 'js/data/dungeons-data.js exists');

const dungeonsDataCode = fs.readFileSync(dungeonsDataFile, 'utf8');
const dSandbox = { window: {} };
vm.createContext(dSandbox);
vm.runInContext(dungeonsDataCode, dSandbox);

const dungeonGuides = dSandbox.window.WOW_DUNGEON_GUIDES;
assert(Array.isArray(dungeonGuides) && dungeonGuides.length === 10, 'All 10 dungeon guides loaded successfully');

let totalLootLinks = 0;
let missingTooltipCount = 0;
let non4ColumnLootTables = 0;

dungeonGuides.forEach(g => {
  // Check 4-column loot tables
  const lines = g.content.split('\n');
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line.startsWith('| Item Slot / Type |')) {
      const parts = line.split('|').filter(Boolean).map(s => s.trim());
      if (parts.length !== 4) {
        non4ColumnLootTables++;
      }
    }
  }

  // Find all item links
  const itemMatches = g.content.matchAll(/\[([^\]]+)\]\(https:\/\/www\.wowhead\.com\/forever\/item=(\d+)[^)]*\)/g);
  for (const m of itemMatches) {
    totalLootLinks++;
    const itemId = m[2];
    if (!tooltips[itemId]) {
      missingTooltipCount++;
      console.warn(`    Missing tooltip for item ID ${itemId} (${m[1]}) in guide ${g.id}`);
    }
  }
});

assert(non4ColumnLootTables === 0, 'All dungeon loot tables are formatted with the 4-column matrix');
assert(totalLootLinks >= 215, `Found ${totalLootLinks} encounter drop item links across all 10 guides`);
assert(missingTooltipCount === 0, `Every encounter drop item link has a matching entry in WOW_DUNGEON_LOOT_TOOLTIPS`);

console.log(`\n=======================================`);
console.log(`Ran ${passCount + failCount} checks. Failures: ${failCount}`);
console.log(`=======================================`);

if (failCount > 0) {
  process.exit(1);
} else {
  console.log('✓ All dungeon loot tooltip checks passed!\n');
}
