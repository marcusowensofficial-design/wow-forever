import fs from 'node:fs';

console.log('--- Starting ForeverDB Data Builder ---');

// 1. Load Item Names
console.log('Loading item names...');
const searchNamesText = fs.readFileSync('scratch/SearchNames.lua', 'utf8');
const itemNames = {};
const nameRegex = /\[(\d+)\]="([^"]+)"/g;
let m;
while ((m = nameRegex.exec(searchNamesText)) !== null) {
  itemNames[m[1]] = m[2];
}
console.log(`Loaded ${Object.keys(itemNames).length} item names.`);

// 2. Load Reagent Sources
let reagentSources = {};
try {
  reagentSources = JSON.parse(fs.readFileSync('data/forever_reagent_sources.json', 'utf8'));
} catch (e) {
  console.warn('Reagent sources file not found, continuing with defaults.');
}

// ---------------------------------------------------------------------------
// 3. Parse Camp.lua -> js/data/camping-matrix-data.js
// ---------------------------------------------------------------------------
console.log('Parsing Camp.lua...');
const campText = fs.readFileSync('scratch/Camp.lua', 'utf8');

function luaTableToJson(luaStr) {
  let pos = 0;
  const str = luaStr.trim();

  function skipWhitespace() {
    while (pos < str.length && /\s/.test(str[pos])) pos++;
  }

  function parseValue() {
    skipWhitespace();
    if (pos >= str.length) return null;
    if (str[pos] === '{') return parseTable();
    if (str[pos] === '"') return parseString();
    if (str.startsWith('true', pos)) { pos += 4; return true; }
    if (str.startsWith('false', pos)) { pos += 5; return false; }
    if (str.startsWith('nil', pos)) { pos += 3; return null; }

    const numMatch = str.slice(pos).match(/^-?\d+(\.\d+)?/);
    if (numMatch) {
      pos += numMatch[0].length;
      return Number(numMatch[0]);
    }

    const idMatch = str.slice(pos).match(/^[a-zA-Z_][a-zA-Z0-9_]*/);
    if (idMatch) {
      pos += idMatch[0].length;
      return idMatch[0];
    }
    throw new Error(`Unexpected character at ${pos}: ${str.slice(pos, pos + 30)}`);
  }

  function parseString() {
    pos++;
    let res = '';
    while (pos < str.length) {
      const char = str[pos];
      if (char === '\\') {
        pos++;
        const next = str[pos];
        if (next === '"') res += '"';
        else if (next === '\\') res += '\\';
        else if (next === 'n') res += '\n';
        else if (next === 't') res += '\t';
        else res += next;
        pos++;
      } else if (char === '"') {
        pos++;
        return res;
      } else {
        res += char;
        pos++;
      }
    }
    return res;
  }

  function parseTable() {
    pos++;
    skipWhitespace();
    const isArray = [];
    const isObject = {};
    let hasKeys = false;
    let hasValues = false;

    while (pos < str.length && str[pos] !== '}') {
      skipWhitespace();
      if (str[pos] === '}') break;

      let key = null;
      if (str[pos] === '[') {
        pos++;
        skipWhitespace();
        if (str[pos] === '"') key = parseString();
        else {
          const kMatch = str.slice(pos).match(/^([a-zA-Z0-9_-]+)/);
          if (kMatch) { key = kMatch[0]; pos += key.length; }
        }
        skipWhitespace();
        if (str[pos] === ']') pos++;
        skipWhitespace();
        if (str[pos] === '=') pos++;
      } else {
        const keyMatch = str.slice(pos).match(/^([a-zA-Z_][a-zA-Z0-9_]*)\s*=/);
        if (keyMatch) {
          key = keyMatch[1];
          pos += keyMatch[0].length;
        }
      }

      if (key !== null) {
        hasKeys = true;
        isObject[key] = parseValue();
      } else {
        hasValues = true;
        isArray.push(parseValue());
      }

      skipWhitespace();
      if (str[pos] === ',' || str[pos] === ';') {
        pos++;
        skipWhitespace();
      }
    }

    if (str[pos] === '}') pos++;
    if (hasKeys && !hasValues) return isObject;
    if (hasValues && !hasKeys) return isArray;
    if (hasKeys && hasValues) {
      isArray.forEach((v, idx) => { isObject[idx + 1] = v; });
      return isObject;
    }
    return [];
  }

  return parseValue();
}

const campMatch = campText.match(/ns\.camp\s*=\s*(\{[\s\S]+\})/);
if (!campMatch) throw new Error('ns.camp not found');
const rawCamp = luaTableToJson(campMatch[1]);

const campMatrix = rawCamp.map(item => {
  const reagentsRaw = (item.reagents || '').split(',').filter(Boolean);
  const reagents = reagentsRaw.map(r => {
    const [rId, count] = r.split(':');
    const idNum = parseInt(rId, 10);
    const countNum = parseInt(count, 10);
    const name = itemNames[idNum] || (reagentSources[idNum] ? reagentSources[idNum].name : `Item #${idNum}`);
    return {
      id: idNum,
      name,
      count: countNum,
      wowheadUrl: `https://www.wowhead.com/forever/item=${idNum}`
    };
  });

  const mutMatch = (item.fx || '').match(/mutually exclusive with ([^.]+)\./i);
  const mutualExclusion = mutMatch ? mutMatch[1].trim() : null;

  return {
    profession: item.prof,
    tier: item.tier,
    skillReq: item.skill,
    itemId: item.item,
    name: item.name,
    isKit: Boolean(item.kit),
    reagents,
    effects: item.fx,
    mutualExclusion,
    wowheadUrl: `https://www.wowhead.com/forever/item=${item.item}`
  };
});

console.log(`Parsed ${campMatrix.length} camp matrix entries.`);

const campJsContent = `/**
 * World of Warcraft: Forever - Camping System Matrix Data
 * Datamined from WoW Forever Client (Build 1.60.1.70707)
 * Ingested from ForeverDB open data under GPL-3.0 attribution
 */
window.WOW_CAMPING_MATRIX = ${JSON.stringify(campMatrix, null, 2)};
`;
fs.writeFileSync('js/data/camping-matrix-data.js', campJsContent);
console.log('Wrote js/data/camping-matrix-data.js');

// ---------------------------------------------------------------------------
// 4. Parse Dungeons.lua -> js/data/forever-instances-data.js
// ---------------------------------------------------------------------------
console.log('Parsing Dungeons.lua...');
const dungText = fs.readFileSync('scratch/Dungeons.lua', 'utf8');
const dungMatches = [...dungText.matchAll(/\[(\d+)\]\s*=\s*\{([^}]+)\}/g)];

const entranceCoordinatesMap = {
  2959: 'Alterac Mountains / Silverpine border (Alterac Sewers entrance at 44.8, 22.1)',
  2998: 'Wetlands, Excavation Site (Dun Algaz path at 38.6, 52.4)',
  2999: 'Tirisfal Glades, Undercity Sewers exterior (Ruins courtyard at 60.5, 68.2)',
  3065: 'Ironforge, High Seat Royal Vault gate beneath the Great Forge (Ironforge Vaults)',
  2784: 'Ashenvale, Demon Fall Canyon (Southern canyon approach near Demon Fall Ridge)',
  2875: 'Deadwind Pass, Karazhan Crypts (Morgue well portal behind Karazhan)',
  2856: 'Eastern Plaguelands, Scarlet Enclave (Tyrs Hand / Havenshire perimeter)',
  2832: 'Nightmare Grove (Instanced Emerald Dream Portals: Bough Shadow, Twilight Grove, Seradane, Dream Bough)',
  2804: 'Silithus, The Crystal Vale (Northwestern Crystal Vale basin)',
  2791: 'Azshara, Storm Cliffs (Northern promontory cliffs overlooking the Bay of Storms)',
  2789: 'Blasted Lands, The Tainted Scar (Southern demonic rift)',
  2720: 'Searing Gorge, The Searing Basin (Central slag pit excavation)',
  3002: 'Half-Pint Tavern (Sub-dungeon encounter)',
  33: 'Silverpine Forest (North of Pyrewood Village, 44.8, 67.8)',
  34: 'Stormwind City, Mage Quarter Canal (Stormwind Stockade entrance)',
  36: 'Westfall, Moonbrook Smuggler Tunnel (42.5, 71.9)',
  43: 'The Barrens, Oasis Caves southwest of Crossroads (46.0, 36.2)',
  47: 'The Barrens, Southern Razorfen Thornhedge (40.8, 87.2)',
  48: 'Ashenvale, Zoram Strand ruined temple (14.2, 14.4)',
  90: 'Dun Morogh, Tinker Town Gnomeregan elevator (24.7, 39.8)',
  189: 'Tirisfal Glades, Northeast hills (Scarlet Monastery courtyard)',
  209: 'Tanaris, Northwest desert ruins (39.2, 19.8)'
};

const instancesData = dungMatches.map(match => {
  const id = parseInt(match[1], 10);
  const body = match[2];

  const getField = (field) => {
    const m = body.match(new RegExp(`${field}=(?:"([^"]*)"|(\\d+))`));
    if (!m) return null;
    return m[1] !== undefined ? m[1] : parseInt(m[2], 10);
  };

  const name = getField('n');
  const kind = getField('kind') || 'dungeon';
  const size = getField('size') || 5;
  const lv = getField('lv') || '0:0:0';
  const [minLevel, maxLevel, practicalLevel] = lv.split(':').map(Number);
  const ent = getField('ent') || '';
  const zone = getField('zone') || '';
  const bossRaw = getField('boss') || '';
  const lootRaw = getField('loot') || '';
  const questsRaw = getField('q') || '';
  const guide = getField('guide') || '';

  const bosses = bossRaw.split('|').filter(Boolean).map(b => {
    const [order, creatureId, bName] = b.split(':');
    return {
      order: parseInt(order, 10),
      creatureId: parseInt(creatureId, 10),
      name: bName
    };
  });

  const loot = lootRaw.split(' ').filter(Boolean).map(l => {
    const [itemId, bossOrder, source] = l.split(':');
    const idNum = parseInt(itemId, 10);
    const itemName = itemNames[idNum] || `Item #${idNum}`;
    return {
      itemId: idNum,
      name: itemName,
      bossOrder: parseInt(bossOrder, 10),
      source: source === 's' ? 'Confirmed Drop' : 'Client Datamined',
      wowheadUrl: `https://www.wowhead.com/forever/item=${idNum}`
    };
  });

  const quests = questsRaw.split(' ').filter(Boolean).map(q => parseInt(q, 10));

  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  const entranceDesc = entranceCoordinatesMap[id] || (zone ? `${zone} instance entrance.` : 'Main portal entrance.');

  return {
    id,
    slug,
    name,
    kind, // 'dungeon' | 'raid'
    size, // 5 | 20 | 40
    minLevel,
    maxLevel,
    practicalLevel,
    levelDisplay: minLevel > 0 ? (minLevel === maxLevel ? `Level ${minLevel}` : `Levels ${minLevel}–${maxLevel}`) : 'Level 60',
    zone: zone || 'Azeroth',
    entranceCode: ent,
    entrance: entranceDesc,
    bosses,
    loot,
    quests,
    guide,
    isCustomForever: id >= 2000
  };
});

console.log(`Parsed ${instancesData.length} instances.`);

const instancesJsContent = `/**
 * World of Warcraft: Forever - Custom & Revamped Instances Data
 * Datamined from WoW Forever Client (Build 1.60.1.70707)
 * Ingested from ForeverDB open data under GPL-3.0 attribution
 */
window.WOW_FOREVER_INSTANCES_DATA = ${JSON.stringify(instancesData, null, 2)};
`;
fs.writeFileSync('js/data/forever-instances-data.js', instancesJsContent);
console.log('Wrote js/data/forever-instances-data.js');

// ---------------------------------------------------------------------------
// 5. Parse Coach.lua -> js/data/spec-coach-data.js
// ---------------------------------------------------------------------------
console.log('Parsing Coach.lua profiles...');
const coachText = fs.readFileSync('scratch/Coach.lua', 'utf8');
const lines = coachText.split('\n');

const coachProfiles = {};
for (const line of lines) {
  const profileMatch = line.match(/^ns\.coachData\.profiles\["([^"]+)"\]\s*=\s*(\{[\s\S]+)/);
  if (!profileMatch) continue;

  const specKey = profileMatch[1];
  const luaContent = profileMatch[2].trim();
  try {
    const parsed = luaTableToJson(luaContent);
    coachProfiles[specKey] = parsed;
  } catch (err) {
    console.error(`Error parsing profile ${specKey}:`, err.message);
  }
}

console.log(`Successfully parsed ${Object.keys(coachProfiles).length} spec coach profiles.`);

const coachJsContent = `/**
 * World of Warcraft: Forever - Spec Rotation & Priority Coach Profiles
 * Datamined from WoW Forever Client (Build 1.60.1.70707) & Closed Beta Simulations
 * Ingested from ForeverDB open data under GPL-3.0 attribution
 */
window.WOW_SPEC_COACH_DATA = ${JSON.stringify(coachProfiles, null, 2)};
`;
fs.writeFileSync('js/data/spec-coach-data.js', coachJsContent);
console.log('Wrote js/data/spec-coach-data.js');

console.log('--- Finished ForeverDB Data Ingestion Successfully ---');
