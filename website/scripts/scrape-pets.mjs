import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');

const COLLECTIONS_FILE = path.join(ROOT, 'js', 'data', 'collections-data.js');
const PETS_DIR = path.join(ROOT, 'images', 'pets');

if (!fs.existsSync(PETS_DIR)) {
  fs.mkdirSync(PETS_DIR, { recursive: true });
}

// Fetch raw Collections.lua from ForeverDB
async function getForeverPetsRaw() {
  const res = await fetch('https://foreverdb.net/downloads/addon-data/Collections.lua');
  const lua = await res.text();
  const start = lua.indexOf('ns.collPets = {');
  const end = lua.indexOf('ns.collTitles = {');
  const chunk = lua.slice(start, end);

  // Parse lines: [spellId]="name|item|flags|source|notes"
  const petMap = new Map();
  const lineRegex = /\[(\d+)\]="([^"]+)"/g;
  let m;
  while ((m = lineRegex.exec(chunk)) !== null) {
    const spellId = parseInt(m[1], 10);
    const parts = m[2].split('|');
    const name = parts[0];
    const itemId = parts[1] ? parseInt(parts[1], 10) : null;
    const flags = parts[2] || '';
    const srcRaw = parts[3] || '';
    const notes = parts[4] || '';

    petMap.set(spellId, { spellId, name, itemId, flags, srcRaw, notes });
  }
  return petMap;
}

function parsePetSource(srcRaw) {
  if (!srcRaw) return { sourceType: 'World', sourceDetail: 'Unknown world encounter' };
  const [kind, detail] = srcRaw.split('~');
  switch (kind) {
    case 'v': return { sourceType: 'Vendor', sourceDetail: `Sold by ${detail || 'Vendor'}` };
    case 'd': return { sourceType: 'World Drop', sourceDetail: `Drops from ${detail || 'Creatures'}` };
    case 'b': return { sourceType: 'Boss Drop', sourceDetail: `Drops from ${detail || 'Dungeon Boss'}` };
    case 'q': return { sourceType: 'Quest', sourceDetail: `Reward from quest ${detail || ''}` };
    case 'c': return { sourceType: 'Crafted', sourceDetail: `Crafted via ${detail || 'Profession'}` };
    case 'x': return { sourceType: 'Container', sourceDetail: `Found inside ${detail || 'Container'}` };
    default: return { sourceType: 'Special', sourceDetail: detail || srcRaw };
  }
}

function getPetCategory(name) {
  const n = (name || '').toLowerCase();
  if (n.includes('cat') || n.includes('kitten')) return 'Cats';
  if (n.includes('wolf') || n.includes('pup') || n.includes('dog') || n.includes('prairie dog')) return 'Canines';
  if (n.includes('whelpling') || n.includes('dragon')) return 'Dragons';
  if (n.includes('owl') || n.includes('parrot') || n.includes('chicken') || n.includes('chick') || n.includes('tallstrider')) return 'Birds';
  if (n.includes('snake') || n.includes('frog') || n.includes('toad') || n.includes('turtle') || n.includes('crocolisk')) return 'Reptiles & Amphibians';
  if (n.includes('mechanical') || n.includes('squirrel') || n.includes('yeti')) return 'Mechanical';
  if (n.includes('cockroach') || n.includes('weevil') || n.includes('spider')) return 'Insects';
  if (n.includes('slime') || n.includes('oozeling') || n.includes('squashling') || n.includes('jubling')) return 'Strange Companions';
  return 'Exotic Companions';
}

async function downloadPetImage(id, url) {
  const outPath = path.join(PETS_DIR, `${id}.webp`);
  if (fs.existsSync(outPath) && fs.statSync(outPath).size > 100) {
    return `images/pets/${id}.webp`;
  }

  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    const buf = Buffer.from(await res.arrayBuffer());
    fs.writeFileSync(outPath, buf);
    return `images/pets/${id}.webp`;
  } catch (e) {
    return null;
  }
}

async function run() {
  console.log('Fetching raw ForeverDB pets data...');
  const fdbPets = await getForeverPetsRaw();
  console.log(`Found ${fdbPets.size} pets in Collections.lua`);

  const colContent = fs.readFileSync(COLLECTIONS_FILE, 'utf8');
  const startMarker = '"vanityPets": [';
  const endMarker = '"titles": [';

  const startIdx = colContent.indexOf(startMarker);
  const endIdx = colContent.indexOf(endMarker);
  if (startIdx === -1 || endIdx === -1) {
    throw new Error('Could not find vanityPets in collections-data.js');
  }

  const existingArrayStr = colContent.slice(startIdx + startMarker.length - 1, endIdx).trim().replace(/,\s*$/, '');
  const existingPets = JSON.parse(existingArrayStr);
  console.log(`Existing local pets: ${existingPets.length}`);

  const enrichedPets = [];

  for (const pet of existingPets) {
    const fdb = fdbPets.get(pet.spellId) || {};
    const flags = fdb.flags || '';
    const isNew = flags.includes('n') || (pet.spellId && pet.spellId > 100000);
    const isSpec = flags.includes('s');
    const { sourceType, sourceDetail } = parsePetSource(fdb.srcRaw);
    const category = getPetCategory(pet.name);

    // Fetch icon url from ForeverDB item/spell page
    const lookupId = pet.itemId || pet.spellId;
    const lookupType = pet.itemId ? 'item' : 'spell';
    let iconUrl = null;

    try {
      const pageRes = await fetch(`https://foreverdb.net/${lookupType}/${lookupId}`);
      if (pageRes.ok) {
        const html = await pageRes.text();
        const ogMatch = html.match(/<meta property="og:image" content="([^"]+)"/);
        if (ogMatch) {
          iconUrl = ogMatch[1];
        }
      }
    } catch (e) {}

    let localImagePath = `images/pets/${lookupId}.webp`;
    if (iconUrl) {
      const downloaded = await downloadPetImage(lookupId, iconUrl);
      if (downloaded) localImagePath = downloaded;
    }

    enrichedPets.push({
      spellId: pet.spellId,
      itemId: pet.itemId,
      name: pet.name,
      faction: pet.faction || 'Neutral',
      category,
      sourceType: pet.sourceType || sourceType,
      sourceDetail: pet.sourceDetail || sourceDetail,
      notes: fdb.notes || pet.notes || '',
      speculationReason: isSpec ? (fdb.notes || 'Post-beta cap datamined entry.') : '',
      isSpeculation: isSpec,
      isNewInForever: isNew,
      image: localImagePath,
      wowheadUrl: pet.wowheadUrl || (pet.itemId ? `https://www.wowhead.com/forever/item=${pet.itemId}` : `https://www.wowhead.com/forever/spell=${pet.spellId}`)
    });

    console.log(`Enriched ${pet.name} (${localImagePath})`);
  }

  // Rewrite collections-data.js
  const prefix = colContent.slice(0, startIdx + startMarker.length);
  const suffix = colContent.slice(endIdx);
  const updatedPetsJson = JSON.stringify(enrichedPets, null, 2);
  // Indent by 4 spaces
  const indented = updatedPetsJson.slice(1, -1).trim();

  const finalFile = `${prefix}\n    ${indented}\n  ],\n  ${suffix}`;
  fs.writeFileSync(COLLECTIONS_FILE, finalFile, 'utf8');
  console.log(`Successfully updated ${COLLECTIONS_FILE} with ${enrichedPets.length} enriched companion pets.`);
}

run().catch(console.error);
