const fs = require('fs');

const mf = JSON.parse(fs.readFileSync('data/forever_merchants_favor.json', 'utf8'));

// Search items with id 271621, 251426, 271622, 271625, 271626, 271627, 271624
const ids = [271621, 251426, 271622, 271625, 271626, 271627, 271624];

console.log('Merchant Favor entries matching dummy IDs:');
mf.items?.forEach(item => {
  if (ids.includes(item.id)) {
    console.log(item);
  }
});

// Also search in whole json by text
console.log('\nSearching for 251426 in all keys:');
const mfStr = JSON.stringify(mf);
ids.forEach(id => {
  const idx = mfStr.indexOf(String(id));
  console.log(`ID ${id} in forever_merchants_favor.json? ${idx !== -1}`);
});
