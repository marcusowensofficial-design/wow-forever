const fs = require('fs');

const fcData = JSON.parse(fs.readFileSync('scratch/fc_enchanting_data.json', 'utf8'));

// Search in items for Idol of the Dream, Libram of Holy Alacrity, Totem of Thunder
Object.entries(fcData.items || {}).forEach(([id, item]) => {
  if (item.n && (
    item.n.includes('Idol of the Dream') ||
    item.n.includes('Libram of Holy Alacrity') ||
    item.n.includes('Totem of Thunder')
  )) {
    console.log(`Found item ${id}:`, item);
  }
});

// Search in crafted
fcData.crafted?.forEach(c => {
  const item = fcData.items?.[c.id] || {};
  if (item.n && (
    item.n.includes('Idol of the Dream') ||
    item.n.includes('Libram of Holy Alacrity') ||
    item.n.includes('Totem of Thunder')
  )) {
    console.log(`Found crafted:`, c, item);
  }
});
