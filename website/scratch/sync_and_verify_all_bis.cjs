const fs = require('fs');
const path = require('path');
const vm = require('vm');

const BIS_PATHS = [
  'warrior', 'warrior/pvp', 'warrior/tank',
  'hunter', 'hunter/pvp',
  'mage', 'mage/pvp', 'mage/fire', 'mage/fire-pvp', 'mage/arcane',
  'rogue', 'rogue/assassination', 'rogue/pvp', 'rogue/pvp-hemo',
  'priest', 'priest/shadow-pvp', 'priest/holy', 'priest/discipline-pvp',
  'warlock', 'warlock/pvp',
  'paladin', 'paladin/retribution-pvp', 'paladin/holy', 'paladin/holy-pvp', 'paladin/shockadin', 'paladin/tank',
  'druid', 'druid/feral-pvp', 'druid/tank', 'druid/balance', 'druid/balance-pvp', 'druid/restoration', 'druid/restoration-pvp',
  'shaman', 'shaman/elemental-pvp', 'shaman/enhancement', 'shaman/enhancement-pvp', 'shaman/restoration'
];

const CACHE_DIR = path.join(__dirname, 'fc_bis_cache');
if (!fs.existsSync(CACHE_DIR)) {
  fs.mkdirSync(CACHE_DIR, { recursive: true });
}

async function fetchAllPages() {
  console.log(`Checking / downloading cache for ${BIS_PATHS.length} specs...`);
  for (const p of BIS_PATHS) {
    const safeName = p.replace(/\//g, '_') + '.html';
    const filePath = path.join(CACHE_DIR, safeName);
    if (!fs.existsSync(filePath)) {
      console.log(`Downloading https://foreverchanges.pro/bis/${p}...`);
      const url = `https://foreverchanges.pro/bis/${p}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.statusText}`);
      const text = await res.text();
      fs.writeFileSync(filePath, text, 'utf8');
      // small throttle
      await new Promise(r => setTimeout(r, 100));
    }
  }
  console.log('All 38 spec pages are cached in', CACHE_DIR);
}

// 2. Load existing bis-data.js
const bisDataJsPath = path.join(__dirname, '..', 'js', 'data', 'bis-data.js');
const code = fs.readFileSync(bisDataJsPath, 'utf8');
const context = { window: {}, console: console };
vm.createContext(context);
const [ourBisData, ourBisMetadata] = vm.runInContext(code + '\n; [WOW_BIS_DATA, WOW_BIS_METADATA];', context);

// 3. Extract items and compare
async function analyze() {
  await fetchAllPages();

  let missingItemsCount = 0;
  let totalFcItemsCount = 0;
  const missingReport = [];

  for (const p of BIS_PATHS) {
    const safeName = p.replace(/\//g, '_') + '.html';
    const html = fs.readFileSync(path.join(CACHE_DIR, safeName), 'utf8');
    const [cls, sub = 'pve'] = p.split('/');
    const ourSpec = ourBisData[cls]?.specs?.find(s => s.id === sub);
    if (!ourSpec) {
      console.error(`Spec missing in our data: ${p}`);
      continue;
    }

    // Parse each slot section
    const slotRegex = /<section class="bis-slot" id="slot-([^"]+)"><h2>(.*?)<\/h2><ol>([\s\S]*?)<\/ol><\/section>/g;
    let sm;
    while ((sm = slotRegex.exec(html)) !== null) {
      const rawSlotId = sm[1];
      const slotId = rawSlotId === 'shoulders' ? 'shoulder' : rawSlotId;
      const slotTitle = sm[2];
      const itemsHtml = sm[3];

      const ourSlot = ourSpec.slots.find(s => s.slotId === slotId || s.slotName.toLowerCase() === slotTitle.toLowerCase());
      if (!ourSlot) {
        console.error(`Slot missing in our spec ${p}: ${slotId} (${slotTitle})`);
        missingItemsCount++;
        continue;
      }

      const ourItemNames = new Set(ourSlot.items.map(i => i.name.toLowerCase()));
      const ourTipIds = new Set(ourSlot.items.map(i => String(i.tipId || '')));

      // Extract items in this FC slot
      const itemRegex = /<li class="bis-row"[^>]*>[\s\S]*?<img src="\/icon\/([^"]+)"[\s\S]*?class="bis-icon (bq\d)" data-tip="([^"]+)"[\s\S]*?<a data-tip="[^"]*" class="bis-name (q\d)" href="\/item\/([^"]+)">([^<]+)<\/a>/g;
      let im;
      while ((im = itemRegex.exec(itemsHtml)) !== null) {
        totalFcItemsCount++;
        const tipId = im[3];
        const itemId = im[5];
        const name = im[6].replace(/&#x27;/g, "'").replace(/&amp;/g, '&');

        const found = ourItemNames.has(name.toLowerCase()) || ourTipIds.has(tipId);
        if (!found) {
          missingItemsCount++;
          missingReport.push({
            spec: p,
            slot: slotId,
            name: name,
            itemId: itemId,
            tipId: tipId
          });
        }
      }
    }
  }

  console.log(`Analysis complete: Total FC items checked: ${totalFcItemsCount}`);
  console.log(`Missing items in our bis-data.js: ${missingItemsCount}`);
  if (missingItemsCount > 0) {
    console.log('Missing items:', missingReport);
  }
}

analyze().catch(console.error);
