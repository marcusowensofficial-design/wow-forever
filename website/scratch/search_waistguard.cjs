const fs = require('fs');

const bsData = JSON.parse(fs.readFileSync('scratch/fc_bs_data.json', 'utf8'));

// Search in bsData.items for anything with id around 251420-251430
for (let id = 251420; id <= 251430; id++) {
  if (bsData.items && bsData.items[id]) {
    console.log(`Found item ${id}:`, bsData.items[id]);
  }
}

// Search in all bsData.rows for 251426
const rowsWith251426 = bsData.rows?.filter(r => JSON.stringify(r).includes('251426'));
console.log('Rows containing 251426:', rowsWith251426?.length);
if (rowsWith251426?.length > 0) {
  console.log(rowsWith251426);
}

// Search all rows for "Waistguard"
const waistRows = bsData.rows?.filter(r => JSON.stringify(r).toLowerCase().includes('waistguard'));
console.log('Rows containing Waistguard in BS:', waistRows?.length);
waistRows?.forEach(r => console.log(r.name || r.item?.n, r.id, r.recipe?.name));

