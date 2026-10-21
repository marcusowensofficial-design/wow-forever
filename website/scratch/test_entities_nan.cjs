const fs = require('fs');
const path = require('path');

const cachePath = path.join(__dirname, 'forever_items_cache.json');
const cache = JSON.parse(fs.readFileSync(cachePath, 'utf8'));

console.log('=== Checking Broken Entities ===');
for (const [id, item] of Object.entries(cache)) {
  if (item.stats && /&(?:nbsp|amp|quot|lt|gt|#039);/.test(item.stats)) {
    console.log(`Item ${id} (${item.name}) stats: ${item.stats}`);
  }
  if (item.lines && item.lines.some(l => /&(?:nbsp|amp|quot|lt|gt|#039);/.test(l))) {
    console.log(`Item ${id} (${item.name}) lines: ${item.lines.filter(l => /&(?:nbsp|amp|quot|lt|gt|#039);/.test(l))}`);
  }
}

console.log('=== Checking NaN and null values ===');
for (const [id, item] of Object.entries(cache)) {
  const jsonStr = JSON.stringify(item);
  if (jsonStr.includes('NaN')) {
    console.log(`Item ${id} contains literal NaN string: ${jsonStr}`);
  }
  if (item.name === null || item.name === undefined) {
    console.log(`Item ${id} has null/undef name`);
  }
  if (item.icon === null || item.icon === undefined) {
    console.log(`Item ${id} has null/undef icon`);
  }
  if (item.effectiveLevel === undefined) {
    // just count
  }
}
