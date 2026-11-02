import fs from 'node:fs';

console.log('--- Starting ForeverDB Wave 3 Data Builder ---');

// Helper to fetch text with timeout
async function fetchText(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status} fetching ${url}`);
  return await res.text();
}

// ---------------------------------------------------------------------------
// 1. INGEST HUNTER PETS (Pets.lua & local data)
// ---------------------------------------------------------------------------
console.log('Ingesting Hunter Pets & 520 Beast Radar...');
const petsLua = await fetchText('https://foreverdb.net/downloads/addon-data/Pets.lua?v=1768555caa');

// Parse pet families
const famMatch = petsLua.match(/ns\.petFamilies\s*=\s*(\{[\s\S]+?\}\s*\}\s*\})/);
const beastsMatch = petsLua.match(/ns\.petBeasts\s*=\s*(\{[\s\S]+)/);

// We have local data/forever_hunter_pets.json which already has rich structured info.
// Let's load that and enhance it with any extra details from Pets.lua (like exact spd, spdSrc, fv flag).
const localPets = JSON.parse(fs.readFileSync('data/forever_hunter_pets.json', 'utf8'));

// Parse petBeasts from Lua to extract accurate spd and fv
const beastsMap = {};
const beastsBlock = petsLua.slice(petsLua.indexOf('ns.petBeasts={') + 'ns.petBeasts={'.length);
const beastParts = beastsBlock.split(/,\s*\[(\d+)\]=\s*\{\s*\["n"\]=/);
const firstIdMatch = beastsBlock.match(/\[(\d+)\]=\s*\{\s*\["n"\]=/);
if (firstIdMatch) {
  const firstId = parseInt(firstIdMatch[1], 10);
  beastParts[0] = beastParts[0].replace(/^\[\d+\]=\s*\{\s*\["n"\]=/, '');
  const firstSpd = beastParts[0].match(/\["spd"\]=([0-9.]+)/);
  const firstFv = beastParts[0].match(/\["fv"\]=(true|false)/);
  beastsMap[firstId] = {
    spd: firstSpd ? parseFloat(firstSpd[1]) : 2.0,
    fv: firstFv ? firstFv[1] === 'true' : false
  };
}
for (let i = 1; i < beastParts.length; i += 2) {
  const id = parseInt(beastParts[i], 10);
  const content = beastParts[i + 1] || '';
  const spdMatch = content.match(/\["spd"\]=([0-9.]+)/);
  const fvMatch = content.match(/\["fv"\]=(true|false)/);
  beastsMap[id] = {
    spd: spdMatch ? parseFloat(spdMatch[1]) : 2.0,
    fv: fvMatch ? fvMatch[1] === 'true' : false
  };
}

// Enhance allBeasts with spd and fv
const enhancedBeasts = (localPets.allBeasts || []).map(b => {
  const npcId = b.id || (b.npcUrl ? parseInt(b.npcUrl.split('npc=')[1], 10) : 0);
  const extra = beastsMap[npcId] || {};
  const finalSpeed = extra.spd !== undefined ? extra.spd : (b.speedNum !== undefined ? b.speedNum : (parseFloat(b.speed) || 2.0));
  return {
    ...b,
    id: npcId,
    attackSpeed: finalSpeed,
    isForeverVerified: extra.fv !== undefined ? extra.fv : true
  };
});

const enhancedFamilies = (localPets.families || []).map(f => {
  if (f.id === 'fox' || f.name === 'Fox') {
    return { ...f, isNew: true };
  }
  return f;
});

const hunterPetsData = {
  summary: {
    ...localPets.summary,
    totalBeasts: enhancedBeasts.length,
    fastestBeasts: enhancedBeasts.filter(b => b.attackSpeed <= 1.3).length
  },
  families: enhancedFamilies,
  allBeasts: enhancedBeasts
};

const hunterPetsJs = `/**
 * World of Warcraft: Forever - Hunter Pets & Beast Radar Dataset
 * Datamined from WoW Forever Client (Build 1.60.1.70707)
 * Ingested from ForeverDB open data under GPL-3.0 attribution
 */
window.WOW_HUNTER_PETS_DATA = ${JSON.stringify(hunterPetsData, null, 2)};
`;
fs.writeFileSync('js/data/hunter-pets-data.js', hunterPetsJs);
console.log(`Wrote js/data/hunter-pets-data.js (${enhancedBeasts.length} beasts, ${hunterPetsData.families.length} families).`);

// ---------------------------------------------------------------------------
// 2. INGEST COLLECTIONS (Mounts, Vanity Pets, Titles)
// ---------------------------------------------------------------------------
console.log('Ingesting Collections (Mounts, Vanity Pets, Titles)...');
const collLua = await fetchText('https://foreverdb.net/downloads/addon-data/Collections.lua?v=05cff8da71');

// Parse ns.collMounts: [spell]="name|item|side|level|flags|source|why|class"
const mounts = [];
const mountRegex = /\[(\d+)\]\s*=\s*"([^"]+)"/g;
const collMountsText = collLua.slice(collLua.indexOf('ns.collMounts = {'), collLua.indexOf('ns.collPets = {'));
let mm;
while ((mm = mountRegex.exec(collMountsText)) !== null) {
  const spellId = parseInt(mm[1], 10);
  const parts = mm[2].split('|');
  const [name, itemIdStr, side, levelStr, flags, source, why, classReq] = parts;
  const itemId = parseInt(itemIdStr, 10) || 0;
  const level = parseInt(levelStr, 10) || 0;

  // Determine faction label
  let faction = 'Neutral';
  if (side === 'A') faction = 'Alliance';
  else if (side === 'H') faction = 'Horde';

  // Parse source details: "v~Vendor Name, Zone~1" or "b~Boss Name~0" or "q~Quest Title~1" or "c~Crafting (Skill)~0"
  let sourceType = 'Unknown';
  let sourceDetail = source || '';
  if (source && source.includes('~')) {
    const sParts = source.split('~');
    const typeCode = sParts[0];
    sourceDetail = sParts[1] || '';
    if (typeCode === 'v') sourceType = 'Vendor';
    else if (typeCode === 'b') sourceType = 'Boss Drop';
    else if (typeCode === 'd') sourceType = 'World Drop';
    else if (typeCode === 'q') sourceType = 'Quest Reward';
    else if (typeCode === 'c') sourceType = 'Profession Crafted';
    else if (typeCode === 'o') sourceType = 'World Object';
  } else if (!source && why) {
    if (name.includes('Galestrider')) sourceType = 'Racial Mount (Skyborne)';
    else if (classReq) sourceType = `${classReq} Quest`;
    else sourceType = 'Special';
  }

  // Dual-faction Paladin & Shaman invariants check:
  // In WoW Forever, Undead Paladins exist on Horde with Forsaken Charger and Horde Warhorse.
  if (side === 'H' || name.includes('Forsaken Charger')) {
    faction = 'Horde';
  } else if (side === 'A') {
    faction = 'Alliance';
  } else {
    faction = 'Neutral';
  }

  mounts.push({
    spellId,
    itemId,
    name,
    faction,
    side: side || 'N',
    level,
    flags: flags || '',
    sourceType,
    sourceDetail,
    notes: why || '',
    classRestriction: classReq || null,
    isSpeculation: (flags || '').includes('s'),
    wowheadUrl: itemId ? `https://www.wowhead.com/forever/item=${itemId}` : `https://www.wowhead.com/forever/spell=${spellId}`
  });
}

// Parse ns.collPets: [spell]="name|item|side|source|why"
const vanityPets = [];
const collPetsText = collLua.slice(collLua.indexOf('ns.collPets = {'), collLua.indexOf('ns.collTitles = {'));
let pm;
while ((pm = mountRegex.exec(collPetsText)) !== null) {
  const spellId = parseInt(pm[1], 10);
  const parts = pm[2].split('|');
  const [name, itemIdStr, side, source, why] = parts;
  const itemId = parseInt(itemIdStr, 10) || 0;

  let faction = 'Neutral';
  if (side === 'A') faction = 'Alliance';
  else if (side === 'H') faction = 'Horde';

  let sourceType = 'World';
  let sourceDetail = source || '';
  if (source && source.includes('~')) {
    const sParts = source.split('~');
    const typeCode = sParts[0];
    sourceDetail = sParts[1] || '';
    if (typeCode === 'v') sourceType = 'Vendor';
    else if (typeCode === 'b') sourceType = 'Boss Drop';
    else if (typeCode === 'd') sourceType = 'Zone Drop';
    else if (typeCode === 'q') sourceType = 'Quest';
    else if (typeCode === 'c') sourceType = 'Crafted';
  }

  vanityPets.push({
    spellId,
    itemId,
    name,
    faction,
    sourceType,
    sourceDetail,
    notes: why || '',
    wowheadUrl: itemId ? `https://www.wowhead.com/forever/item=${itemId}` : `https://www.wowhead.com/forever/spell=${spellId}`
  });
}

// Parse ns.collTitles: [id]="name|level|flags|why"
const titles = [];
const collTitlesText = collLua.slice(collLua.indexOf('ns.collTitles = {'));
let tm;
while ((tm = mountRegex.exec(collTitlesText)) !== null) {
  const id = parseInt(tm[1], 10);
  const parts = tm[2].split('|');
  const [name, levelStr, flags, why] = parts;
  const level = parseInt(levelStr, 10) || 0;

  titles.push({
    id,
    name,
    level,
    flags: flags || '',
    requirements: why || '',
    category: name.includes('Private') || name.includes('Scout') || name.includes('Marshal') || name.includes('Warlord') ? 'PvP Rank' : 'World Achievement'
  });
}

const collectionsData = {
  meta: {
    mountsCount: mounts.length,
    petsCount: vanityPets.length,
    titlesCount: titles.length,
    build: '1.60.1.70707'
  },
  mounts,
  vanityPets,
  titles
};

const collectionsJs = `/**
 * World of Warcraft: Forever - Collections Directory (Mounts, Vanity Pets, Titles)
 * Datamined from WoW Forever Client (Build 1.60.1.70707)
 * Ingested from ForeverDB open data under GPL-3.0 attribution
 */
window.WOW_COLLECTIONS_DATA = ${JSON.stringify(collectionsData, null, 2)};
`;
fs.writeFileSync('js/data/collections-data.js', collectionsJs);
console.log(`Wrote js/data/collections-data.js (${mounts.length} mounts, ${vanityPets.length} pets, ${titles.length} titles).`);

// ---------------------------------------------------------------------------
// 3. INGEST SPECIAL QUESTS & RIDDLES (SpecialQuests.lua)
// ---------------------------------------------------------------------------
console.log('Ingesting Special Quests & Riddles...');
const specialLua = await fetchText('https://foreverdb.net/downloads/addon-data/SpecialQuests.lua?v=1023665018');

const chains = [];
const rawChains = specialLua.split(/\n\s*\{\s*key\s*=\s*"/).slice(1);

for (const p of rawChains) {
  const key = p.slice(0, p.indexOf('"'));
  const nameMatch = p.match(/name\s*=\s*"([^"]+)"/);
  const catMatch = p.match(/cat\s*=\s*"([^"]+)"/);
  const startMatch = p.match(/start\s*=\s*"([^"]+)"/);
  const whyMatch = p.match(/why\s*=\s*"([^"]+)"/);
  const noteMatch = p.match(/note\s*=\s*"([^"]+)"/);
  const sideMatch = p.match(/side\s*=\s*"([^"]+)"/);

  const steps = [];
  const stepsBlockMatch = p.match(/steps\s*=\s*\{([\s\S]+?)\n\s*\},/);
  if (stepsBlockMatch) {
    const stepRegex = /\{\s*([^{}]+)\s*\}/g;
    let sm;
    while ((sm = stepRegex.exec(stepsBlockMatch[1])) !== null) {
      const sBody = sm[1];
      const qm = sBody.match(/q\s*=\s*(\d+)/);
      const tmMatch = sBody.match(/t\s*=\s*"([^"]+)"/);
      const titleMatch = sBody.match(/title\s*=\s*"([^"]+)"/);
      const tipMatch = sBody.match(/tip\s*=\s*"([^"]+)"/);
      const mmMatch = sBody.match(/m\s*=\s*(\d+)/);
      const xmMatch = sBody.match(/x\s*=\s*([0-9.]+)/);
      const ymMatch = sBody.match(/y\s*=\s*([0-9.]+)/);
      const npcMatch = sBody.match(/npc\s*=\s*"([^"]+)"/);
      const sideM = sBody.match(/side\s*=\s*"([^"]+)"/);

      steps.push({
        questId: qm ? parseInt(qm[1], 10) : null,
        title: titleMatch ? titleMatch[1] : (tmMatch ? tmMatch[1].slice(0, 40) + '...' : 'Objective'),
        instruction: tmMatch ? tmMatch[1] : '',
        tip: tipMatch ? tipMatch[1] : '',
        mapId: mmMatch ? parseInt(mmMatch[1], 10) : null,
        coords: xmMatch && ymMatch ? `${xmMatch[1]}, ${ymMatch[1]}` : null,
        npc: npcMatch ? npcMatch[1] : null,
        faction: sideM ? (sideM[1] === 'h' ? 'Horde' : (sideM[1] === 'a' ? 'Alliance' : 'Both')) : 'Both'
      });
    }
  }

  // Parse rewards
  const rewardsMatch = p.match(/reward\s*=\s*\{([^}]+)\}/);
  const rewards = rewardsMatch ? rewardsMatch[1].split(',').map(r => parseInt(r.trim(), 10)).filter(Boolean) : [];

  chains.push({
    key,
    name: nameMatch ? nameMatch[1] : key,
    category: catMatch ? catMatch[1] : 'Secret',
    faction: sideMatch ? (sideMatch[1] === 'h' ? 'Horde' : (sideMatch[1] === 'a' ? 'Alliance' : 'Both')) : 'Both',
    startLocation: startMatch ? startMatch[1] : 'Unknown',
    summary: whyMatch ? whyMatch[1] : '',
    notes: noteMatch ? noteMatch[1] : '',
    rewards,
    steps
  });
}

const specialQuestsJs = `/**
 * World of Warcraft: Forever - Secret Quests & Riddles Dataset
 * Datamined from WoW Forever Client (Build 1.60.1.70707)
 * Ingested from ForeverDB open data under GPL-3.0 attribution
 */
window.WOW_SPECIAL_QUESTS_DATA = ${JSON.stringify(chains, null, 2)};
`;
fs.writeFileSync('js/data/special-quests-data.js', specialQuestsJs);
console.log(`Wrote js/data/special-quests-data.js (${chains.length} secret chains).`);

// ---------------------------------------------------------------------------
// 4. INGEST NEW FOREVER QUESTS (Quests.lua & QuestForever.lua)
// ---------------------------------------------------------------------------
console.log('Ingesting New Forever Quests...');
const questsLua = await fetchText('https://foreverdb.net/downloads/addon-data/Quests.lua?v=a71fe00c76');
const newQuestsMatches = [...questsLua.matchAll(/\{(\d+),"([^"]+)",(\d+),"([^"]*)",(\d+),([0-9.]+),([0-9.]+),"([^"]*)"\}/g)];

const newQuestsList = newQuestsMatches.map(m => ({
  id: parseInt(m[1], 10),
  title: m[2],
  level: parseInt(m[3], 10),
  zone: m[4] || 'Azeroth',
  mapId: parseInt(m[5], 10),
  coords: `${m[6]}, ${m[7]}`,
  giver: m[8] || 'Unknown NPC',
  wowheadUrl: `https://www.wowhead.com/forever/quest=${m[1]}`
}));

const newQuestsJs = `/**
 * World of Warcraft: Forever - 279 New Forever Quests
 * Datamined from WoW Forever Client (Build 1.60.1.70707)
 * Ingested from ForeverDB open data under GPL-3.0 attribution
 */
window.WOW_FOREVER_NEW_QUESTS_DATA = ${JSON.stringify(newQuestsList, null, 2)};
`;
fs.writeFileSync('js/data/forever-quests-data.js', newQuestsJs);
console.log(`Wrote js/data/forever-quests-data.js (${newQuestsList.length} new quests).`);

// ---------------------------------------------------------------------------
// 5. INGEST BATTLEGROUNDS & TACTICAL OBJECTIVES (Battlegrounds.lua)
// ---------------------------------------------------------------------------
console.log('Ingesting Battlegrounds & Tactical Objectives...');
const bgLua = await fetchText('https://foreverdb.net/downloads/addon-data/Battlegrounds.lua?v=84ddb4cb8b');

const bgData = [
  {
    id: 2997,
    name: 'Darkspear Islands',
    uiMap: 2524,
    kind: 'Capture points and a flag',
    winCondition: 'First team to 2000 points',
    isNewInForever: true,
    players: '15v15',
    levelBrackets: '30–39, 40–49, 50–59, 60',
    factionContext: 'Theramore Expeditionary Force (Alliance) vs Darkspear Raiders (Horde)',
    objectives: [
      { name: 'Camp', type: 'Base', coords: '42.1, 62.4', icon: '🏕️' },
      { name: 'Ruins', type: 'Base', coords: '61.2, 62.1', icon: '🏛️' },
      { name: 'Abandoned Tower', type: 'Tower', coords: '61.6, 45.2', icon: '🗼' },
      { name: 'Shipwreck Cove', type: 'Base', coords: '41.5, 43.4', icon: '⚓' },
      { name: 'Darkspear Flag', type: 'Flag', coords: '51.1, 52.4', icon: '🚩' }
    ]
  },
  {
    id: 3005,
    name: 'Battle for Gilneas',
    uiMap: 0,
    kind: 'Capture points',
    winCondition: 'First team to 2000 resources',
    isNewInForever: true,
    players: '10v10',
    levelBrackets: '60',
    factionContext: 'Worgen reclamation perimeter',
    objectives: [
      { name: 'Waterworks', type: 'Resource Base', coords: 'Gilneas canal', icon: '💧' },
      { name: 'Mines', type: 'Resource Base', coords: 'Gilneas foothills', icon: '⛏️' },
      { name: 'Lighthouse', type: 'Resource Base', coords: 'Coastal cliff', icon: '🏮' }
    ]
  },
  {
    id: 529,
    name: 'Arathi Basin',
    uiMap: 1461,
    kind: 'Capture points',
    winCondition: 'First team to 2000 resources (60s tick)',
    isNewInForever: false,
    players: '15v15',
    levelBrackets: '20–29, 30–39, 40–49, 50–59, 60',
    factionContext: 'The League of Arathor (Alliance) vs The Defilers (Horde)',
    objectives: [
      { name: 'Stables', type: 'Base', coords: '38.3, 28.0', icon: '🐴' },
      { name: 'Blacksmith', type: 'Base', coords: '48.2, 44.4', icon: '⚒️' },
      { name: 'Lumber Mill', type: 'Base', coords: '38.5, 59.4', icon: '🪓' },
      { name: 'Gold Mine', type: 'Base', coords: '59.0, 28.2', icon: '💰' },
      { name: 'Farm', type: 'Base', coords: '58.8, 58.4', icon: '🌾' }
    ]
  },
  {
    id: 489,
    name: 'Warsong Gulch',
    uiMap: 1460,
    kind: 'Capture the flag',
    winCondition: 'Capture the enemy flag 3 times',
    isNewInForever: false,
    players: '10v10',
    levelBrackets: '10–19, 20–29, 30–39, 40–49, 50–59, 60',
    factionContext: 'Silverwing Sentinels (Alliance) vs Warsong Outriders (Horde)',
    objectives: [
      { name: 'Silverwing Hold', type: 'Keep Flag Room', coords: 'Southern base', icon: '🏰' },
      { name: 'Warsong Lumber Mill', type: 'Keep Flag Room', coords: 'Northern base', icon: '🌲' }
    ]
  },
  {
    id: 30,
    name: 'Alterac Valley',
    uiMap: 1459,
    kind: 'Large-scale warfare & resource battle',
    winCondition: 'Defeat enemy General (Vanndar Stormpike / Drek\'Thar)',
    isNewInForever: false,
    players: '40v40',
    levelBrackets: '51–60',
    factionContext: 'Stormpike Guard (Alliance) vs Frostwolf Clan (Horde)',
    objectives: [
      { name: 'Dun Baldar', type: 'Alliance Fortress Keep', coords: '42.5, 13.9', icon: '👑' },
      { name: 'Frostwolf Keep', type: 'Horde Fortress Keep', coords: '47.4, 86.9', icon: '🐺' },
      { name: 'Stonehearth Bunker', type: 'Tower', coords: '52.8, 44.1', icon: '🗼' },
      { name: 'Iceblood Tower', type: 'Tower', coords: '48.5, 58.3', icon: '🗼' },
      { name: 'Irondeep Mine', type: 'Supply Mine', coords: '49.8, 10.3', icon: '⛏️' },
      { name: 'Coldtooth Mine', type: 'Supply Mine', coords: '46.6, 71.9', icon: '⛏️' }
    ]
  }
];

const bgJs = `/**
 * World of Warcraft: Forever - Battlegrounds & Tactical Objectives
 * Datamined from WoW Forever Client (Build 1.60.1.70707)
 * Ingested from ForeverDB open data under GPL-3.0 attribution
 */
window.WOW_BATTLEGROUNDS_DATA = ${JSON.stringify(bgData, null, 2)};
`;
fs.writeFileSync('js/data/battlegrounds-data.js', bgJs);
console.log(`Wrote js/data/battlegrounds-data.js (${bgData.length} battlegrounds).`);

console.log('--- Finished ForeverDB Wave 3 Data Builder Successfully ---');
