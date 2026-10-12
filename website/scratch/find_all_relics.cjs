const fs = require('fs');

const fcData = JSON.parse(fs.readFileSync('scratch/fc_enchanting_data.json', 'utf8'));

Object.entries(fcData.items || {}).forEach(([id, item]) => {
  if (item.n && (
    item.n.includes('Idol') ||
    item.n.includes('Libram') ||
    item.n.includes('Totem')
  )) {
    console.log(`Item ${id}:`, item.n, `q:${item.q}`);
  }
});
