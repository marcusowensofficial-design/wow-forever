import fs from 'node:fs';
import path from 'node:path';

async function main() {
  console.log('Fetching vendor data from ForeverDB...');
  const [vendorsRes, currenciesRes] = await Promise.all([
    fetch('https://foreverdb.net/data/vendors.json'),
    fetch('https://foreverdb.net/data/currencies.json')
  ]);

  if (!vendorsRes.ok) throw new Error(`Failed to fetch vendors.json: ${vendorsRes.status}`);
  if (!currenciesRes.ok) throw new Error(`Failed to fetch currencies.json: ${currenciesRes.status}`);

  const vendorsData = await vendorsRes.json();
  const currenciesData = await currenciesRes.json();

  const dataset = {
    generatedAt: new Date().toISOString(),
    about: vendorsData.about || 'Vendors and what they sell in WoW Forever.',
    factions: vendorsData.factions || {},
    currencies: currenciesData || {},
    vendors: vendorsData.vendors || {},
    items: vendorsData.items || {}
  };

  const vendorCount = Object.keys(dataset.vendors).length;
  const itemCount = Object.keys(dataset.items).length;
  console.log(`Loaded ${vendorCount} vendors and ${itemCount} items.`);

  // Write canonical JSON
  const jsonPath = path.resolve('data/forever_vendors.json');
  fs.writeFileSync(jsonPath, JSON.stringify(dataset, null, 2), 'utf8');
  console.log(`Wrote canonical JSON to ${jsonPath}`);

  // Write browser JS data file
  const jsContent = `/**
 * World of Warcraft: Forever - Vendor & Merchant Directory Dataset
 * Auto-generated from ForeverDB Build 1.60.1 / 1.60.6.
 * Contains ${vendorCount} vendors across 47 zones and ${itemCount} items.
 */
window.WOW_VENDORS_DATA = ${JSON.stringify(dataset, null, 2)};
`;
  const jsPath = path.resolve('js/data/vendors-data.js');
  fs.writeFileSync(jsPath, jsContent, 'utf8');
  console.log(`Wrote browser JS to ${jsPath}`);
}

main().catch(err => {
  console.error('Error during scrape:', err);
  process.exit(1);
});
