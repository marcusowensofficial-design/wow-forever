import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');

const whItems = JSON.parse(fs.readFileSync(path.join(ROOT, 'data', 'scraped', 'wowhead_forever_weapons.json'), 'utf8'));
const progData = JSON.parse(fs.readFileSync(path.join(ROOT, 'data', 'scraped', 'forever_weapons.json'), 'utf8'));

// Build lookup dictionary from Wowhead items
const whLookupById = new Map();
const whLookupByName = new Map();
for (const item of whItems) {
  if (item.id) whLookupById.set(item.id, item);
  if (item.name) whLookupByName.set(item.name.toLowerCase(), item);
}

const weaponSubclasses = {
  0: 'One-handed axe',
  1: 'Two-handed axe',
  2: 'Bow',
  3: 'Gun',
  4: 'One-handed mace',
  5: 'Two-handed mace',
  6: 'Polearm',
  7: 'One-handed sword',
  8: 'Two-handed sword',
  10: 'Staff',
  13: 'Fist Weapon',
  14: 'Miscellaneous',
  15: 'Dagger',
  18: 'Crossbow',
  19: 'Wand'
};

function getSubclassString(subclass) {
  return weaponSubclasses[subclass] || 'Weapon';
}

// Helper to determine faction cleanly
function determineFactionAccurate(name, sourceTitle, sourceDetail, value) {
  const text = `${name || ''} ${sourceTitle || ''} ${sourceDetail || ''} ${value || ''}`.toLowerCase();

  // If vendor or craft without explicit faction exclusivity, it is 'both'
  const isVendor = text.includes('vendor') || text.includes('purchased in') || text.includes('sold in');
  const isCraft = text.includes('craft') || text.includes('blacksmithing') || text.includes('engineering');
  const isDrop = text.includes('drop') || text.includes('dungeon') || text.includes('chasm') || text.includes('deadmines') || text.includes('wailing caverns') || text.includes('shadowfang') || text.includes('blackfathom') || text.includes('gnomeregan') || text.includes('scarlet monastery') || text.includes('razorfen') || text.includes('uldaman') || text.includes('zul\'farrak') || text.includes('maraudon') || text.includes('sunken temple') || text.includes('blackrock') || text.includes('stratholme') || text.includes('scholomance') || text.includes('dire maul');

  // Multi-faction text checks
  const mentionsAllianceHub = text.includes('elwynn') || text.includes('northshire') || text.includes('dun morogh') || text.includes('kharanos') || text.includes('goldshire') || text.includes('teldrassil') || text.includes('shadowglen') || text.includes('dolanaar') || text.includes('auberdine') || text.includes('darkshore') || text.includes('ironforge') || text.includes('stormwind') || text.includes('loch modan') || text.includes('westfall') || text.includes('redridge') || text.includes('duskwood');
  const mentionsHordeHub = text.includes('durotar') || text.includes('valley of trials') || text.includes('razor hill') || text.includes('mulgore') || text.includes('camp narache') || text.includes('bloodhoof') || text.includes('tirisfal') || text.includes('deathknell') || text.includes('brill') || text.includes('silverpine') || text.includes('crossroads') || text.includes('barrens') || text.includes('orgrimmar') || text.includes('thunder bluff') || text.includes('undercity');

  if (mentionsAllianceHub && mentionsHordeHub) return 'both';
  if ((isVendor || isCraft) && !text.includes('quest') && !text.includes('reputation')) return 'both';
  if (isDrop && !text.includes('quest')) return 'both';

  // Explicit Alliance quests / items
  const isAlliance = text.includes('alliance') ||
    text.includes('in the name of the light') ||
    text.includes('test of righteousness') ||
    text.includes('morbent fel') ||
    text.includes('brotherhood of thieves') ||
    text.includes('bonebiter') ||
    text.includes('sword of serenity') ||
    text.includes('verigan\'s fist') ||
    text.includes('wolfsbane') ||
    text.includes('staff of westfall') ||
    text.includes('cruel barb') ||
    text.includes('smite\'s mighty hammer') ||
    text.includes('people\'s militia') ||
    text.includes('rare books') ||
    text.includes('the theft') ||
    (mentionsAllianceHub && text.includes('quest'));

  // Explicit Horde quests / items
  const isHorde = text.includes('horde') ||
    text.includes('hidden enemies') ||
    text.includes('into the scarlet monastery') ||
    text.includes('the family crypt') ||
    text.includes('rear guard patrol') ||
    text.includes('lost in the shadows') ||
    text.includes('centaur bracers') ||
    text.includes('threat from below') ||
    text.includes('the scarlet crusade') ||
    text.includes('escorting erland') ||
    text.includes('supervisor fizsprocket') ||
    text.includes('apothecary zamah') ||
    text.includes('stormy potential') ||
    text.includes('forged steel') ||
    text.includes('sword of omen') ||
    text.includes('axe of orgrimmar') ||
    text.includes('kris of orgrimmar') ||
    text.includes('staff of orgrimmar') ||
    text.includes('hammer of orgrimmar') ||
    text.includes('leaders of the fang') ||
    (mentionsHordeHub && text.includes('quest'));

  if (isAlliance && !isHorde) return 'alliance';
  if (isHorde && !isAlliance) return 'horde';
  return 'both';
}

// 1. Clean existing steps & alts
for (const [cls, cData] of Object.entries(progData)) {
  cData.levels.forEach(step => {
    // Re-evaluate step faction
    step.faction = determineFactionAccurate(step.name, step.source?.title, step.source?.detail, '');

    // Clean alts
    if (step.alts) {
      // Fix illegal/misidentified alts first
      if (cls === 'rogue') {
        step.alts = step.alts.filter(a => a.name !== 'Heavy Copper Broadsword' && a.name !== "Butcher's Cleaver" && a.name !== 'Pronged Reaver');
      }
      if (cls === 'druid') {
        step.alts = step.alts.filter(a => a.name !== 'Archeus');
      }

      step.alts.forEach(alt => {
        // Fix misidentified item IDs
        if (alt.name === 'Carving Knife') {
          alt.itemId = 2494;
          alt.weaponType = 'Dagger';
          alt.speed = '1.70';
          alt.dps = '2.5 DPS';
          alt.value = '2.5 DPS, 1.70s - Starter Vendor Dagger';
        }
        if (alt.name === 'Crude Battle Axe') {
          alt.itemId = 2490;
          alt.weaponType = 'Two-handed axe';
          alt.speed = '3.20';
          alt.dps = '3.8 DPS';
        }

        alt.faction = determineFactionAccurate(alt.name, '', '', alt.value);

        // Fill missing alt metadata from Wh lookup if available
        const whMatch = (alt.itemId && whLookupById.get(alt.itemId)) || whLookupByName.get(alt.name.toLowerCase());
        if (whMatch) {
          if (!alt.itemId) alt.itemId = whMatch.id;
          if (!alt.dps && whMatch.dps) alt.dps = `${whMatch.dps} DPS`;
          if (!alt.speed && whMatch.speed) alt.speed = `${whMatch.speed.toFixed(2)}`;
          if (!alt.weaponType && whMatch.subclass !== undefined) alt.weaponType = getSubclassString(whMatch.subclass);
        }

        // Parse from value if still missing
        const valStr = alt.value || '';
        if (!alt.dps) {
          const m = valStr.match(/([\d.]+\s*DPS)/i);
          if (m) alt.dps = m[1].toUpperCase();
        }
        if (!alt.speed) {
          const m = valStr.match(/([\d.]+s)/i);
          if (m) alt.speed = m[1].replace('s', '');
        }
      });
    }
  });
}

// Add legal replacements for removed items
addAlt(progData.rogue, '21–22', {
  name: 'Blade of Silverlaine', itemId: 273637, weaponType: 'One-handed sword', speed: '2.30', dps: '10.9 DPS', value: '10.9 DPS, 2.30s - SFK Drop', faction: 'both'
});
addAlt(progData.rogue, '29–30', {
  name: 'Swine Fists', itemId: 6693, weaponType: 'Fist Weapon', speed: '2.10', dps: '20.3 DPS', value: '20.3 DPS, 2.10s - RFK Drop', faction: 'both'
});
addAlt(progData.druid, '36–40', {
  name: "Dendweller's Hammer", itemId: 284459, weaponType: 'Two-handed mace', speed: '3.30', dps: '25.6 DPS', value: '25.6 DPS, 3.30s - Custom 2H Mace Drop', faction: 'both'
});

// Helper to add or update an alt
function addAlt(cData, bracket, itemObj) {
  const step = cData.levels.find(l => l.levelBracket === bracket);
  if (!step) {
    console.warn(`[WARN] Bracket "${bracket}" not found for class "${cData.classId || 'unknown'}"`);
    return;
  }
  if (!step.alts) step.alts = [];

  const existing = step.alts.find(a => a.name.toLowerCase() === itemObj.name.toLowerCase());
  if (existing) {
    Object.assign(existing, itemObj);
  } else {
    step.alts.push(itemObj);
  }
}

// 2. Add verified datamined leveling weapons across classes

// WARRIOR
const warrior = progData.warrior;
// 9-10 & 11-12 Alliance 2H hammer
addAlt(warrior, '9–10', {
  name: 'Ironforge Greathammer', itemId: 279895, weaponType: 'Two-handed mace', speed: '3.30', dps: '16.0 DPS', value: '16.0 DPS, 3.30s - Ironforge Quest', faction: 'alliance'
});
addAlt(warrior, '11–12', {
  name: 'Ironforge Greathammer', itemId: 279895, weaponType: 'Two-handed mace', speed: '3.30', dps: '16.0 DPS', value: '16.0 DPS, 3.30s - Ironforge Quest', faction: 'alliance'
});
// 13-14 Bone Knuckles (RFC)
addAlt(warrior, '13–14', {
  name: 'Bone Knuckles', itemId: 272998, weaponType: 'Fist Weapon', speed: '2.00', dps: '12.3 DPS', value: '12.3 DPS, 2.00s - RFC Drop', faction: 'both'
});
// 15-18 Monstrous Cleaver & Plaguefang
addAlt(warrior, '15–16', {
  name: 'Monstrous Cleaver', itemId: 279864, weaponType: 'Two-handed sword', speed: '3.30', dps: '15.2 DPS', value: '15.2 DPS, 3.30s - Dalaran Dungeon', faction: 'both'
});
addAlt(warrior, '17–18', {
  name: 'Sword of the Fallen', itemId: 286977, weaponType: 'Two-handed sword', speed: '3.50', dps: '19.7 DPS', value: '19.7 DPS, 3.50s - Rare Drop', faction: 'both'
});
// 21-24 The Skyblade & Alliance Outrunner's Sword
addAlt(warrior, '21–22', {
  name: "Alliance Outrunner's Sword", itemId: 285346, weaponType: 'One-handed sword', speed: '2.10', dps: '17.1 DPS', value: '17.1 DPS, 2.10s - Alliance Outrunner Drop', faction: 'alliance'
});
addAlt(warrior, '23–24', {
  name: 'The Skyblade', itemId: 286540, weaponType: 'Two-handed sword', speed: '3.60', dps: '22.4 DPS', value: '22.4 DPS, 3.60s - Ashenvale Rare', faction: 'both'
});
// 25-26 Trusty Sword & Defender of Dalaran
addAlt(warrior, '25–26', {
  name: 'Trusty Sword', itemId: 281313, weaponType: 'Two-handed sword', speed: '3.20', dps: '26.7 DPS', value: '26.7 DPS, 3.20s - Redridge Quest', faction: 'both'
});
// 29-32 Rage of the Storm
addAlt(warrior, '29–30', {
  name: 'Rage of the Storm', itemId: 280604, weaponType: 'Two-handed mace', speed: '3.20', dps: '35.6 DPS', value: '35.6 DPS, 3.20s - Custom Boss Drop', faction: 'both'
});
// 41-44 Gul'gash's Greathammer
addAlt(warrior, '41–44', {
  name: "Gul'gash's Greathammer", itemId: 281648, weaponType: 'Two-handed mace', speed: '3.60', dps: '42.8 DPS', value: '42.8 DPS, 3.60s - Feralas Drop', faction: 'both'
});
// 55-60 Icesworn Decapitator
addAlt(warrior, '55–60', {
  name: 'Icesworn Decapitator', itemId: 284257, weaponType: 'Two-handed axe', speed: '3.60', dps: '50.6 DPS', value: '50.6 DPS, 3.60s - Winterspring Rare', faction: 'both'
});

// PALADIN
const paladin = progData.paladin;
addAlt(paladin, '9–10', {
  name: 'Ironforge Greathammer', itemId: 279895, weaponType: 'Two-handed mace', speed: '3.30', dps: '16.0 DPS', value: '16.0 DPS, 3.30s - Ironforge Quest', faction: 'alliance'
});
addAlt(paladin, '11–12', {
  name: 'Ironforge Greathammer', itemId: 279895, weaponType: 'Two-handed mace', speed: '3.30', dps: '16.0 DPS', value: '16.0 DPS, 3.30s - Ironforge Quest', faction: 'alliance'
});
addAlt(paladin, '15–16', {
  name: 'Monstrous Cleaver', itemId: 279864, weaponType: 'Two-handed sword', speed: '3.30', dps: '15.2 DPS', value: '15.2 DPS, 3.30s - Dalaran Dungeon', faction: 'both'
});
addAlt(paladin, '17–18', {
  name: 'Sword of the Fallen', itemId: 286977, weaponType: 'Two-handed sword', speed: '3.50', dps: '19.7 DPS', value: '19.7 DPS, 3.50s - Rare Drop', faction: 'both'
});
addAlt(paladin, '21–24', {
  name: 'The Skyblade', itemId: 286540, weaponType: 'Two-handed sword', speed: '3.60', dps: '22.4 DPS', value: '22.4 DPS, 3.60s - Ashenvale Rare', faction: 'both'
});
addAlt(paladin, '25–28', {
  name: 'Defender of Dalaran', itemId: 279841, weaponType: 'Two-handed mace', speed: '3.30', dps: '31.2 DPS', value: '31.2 DPS, 3.30s - Dalaran Dungeon', faction: 'both'
});
addAlt(paladin, '25–28', {
  name: 'Trusty Sword', itemId: 281313, weaponType: 'Two-handed sword', speed: '3.20', dps: '26.7 DPS', value: '26.7 DPS, 3.20s - Redridge Quest', faction: 'both'
});
addAlt(paladin, '29–30', {
  name: 'Rage of the Storm', itemId: 280604, weaponType: 'Two-handed mace', speed: '3.20', dps: '35.6 DPS', value: '35.6 DPS, 3.20s - Custom Boss Drop', faction: 'both'
});
addAlt(paladin, '41–45', {
  name: "Gul'gash's Greathammer", itemId: 281648, weaponType: 'Two-handed mace', speed: '3.60', dps: '42.8 DPS', value: '42.8 DPS, 3.60s - Feralas Drop', faction: 'both'
});

// HUNTER
const hunter = progData.hunter;
addAlt(hunter, '13–14', {
  name: 'Barbaric Crossbow', itemId: 272999, weaponType: 'Crossbow', speed: '2.00', dps: '9.5 DPS', value: '9.5 DPS, 2.00s, +2 Agi - RFC Drop', faction: 'both'
});
addAlt(hunter, '15–18', {
  name: 'Barbaric Crossbow', itemId: 272999, weaponType: 'Crossbow', speed: '2.00', dps: '9.5 DPS', value: '9.5 DPS, 2.00s - RFC Drop', faction: 'both'
});
addAlt(hunter, '21–22', {
  name: 'Alliance Outrunner Bow', itemId: 285347, weaponType: 'Bow', speed: '2.40', dps: '13.3 DPS', value: '13.3 DPS, 2.40s - Alliance Outrunner Drop', faction: 'alliance'
});
addAlt(hunter, '25–26', {
  name: 'Dun Garok Rifle', itemId: 282710, weaponType: 'Gun', speed: '2.60', dps: '14.8 DPS', value: '14.8 DPS, 2.60s - Hillsbrad Drop', faction: 'both'
});
addAlt(hunter, '35–38', {
  name: "Siegebreaker's Blaster", itemId: 282561, weaponType: 'Gun', speed: '2.60', dps: '22.3 DPS', value: '22.3 DPS, 2.60s - Custom Gun Drop', faction: 'both'
});
addAlt(hunter, '39–42', {
  name: "Truthseeker's Bow", itemId: 277254, weaponType: 'Bow', speed: '2.80', dps: '23.8 DPS', value: '23.8 DPS, 2.80s - Tanaris Quest', faction: 'both'
});
addAlt(hunter, '53–60', {
  name: "Reaver's Repeater", itemId: 282029, weaponType: 'Gun', speed: '2.70', dps: '27.0 DPS', value: '27.0 DPS, 2.70s - Custom Gun Drop', faction: 'both'
});

// ROGUE
const rogue = progData.rogue;
addAlt(rogue, '13–14', {
  name: 'Fang of Magmatus', itemId: 271095, weaponType: 'Dagger', speed: '1.70', dps: '7.9 DPS', value: '7.9 DPS, 1.70s, +2 Agi - RFC Drop', faction: 'both'
});
addAlt(rogue, '13–14', {
  name: 'Bone Knuckles', itemId: 272998, weaponType: 'Fist Weapon', speed: '2.00', dps: '12.3 DPS', value: '12.3 DPS, 2.00s - RFC Drop', faction: 'both'
});
addAlt(rogue, '13–14', {
  name: 'Searing Dagger', itemId: 273003, weaponType: 'Dagger', speed: '1.60', dps: '8.1 DPS', value: '8.1 DPS, 1.60s - RFC Drop', faction: 'both'
});
addAlt(rogue, '15–16', {
  name: 'Plaguefang', itemId: 279876, weaponType: 'One-handed sword', speed: '2.10', dps: '12.4 DPS', value: '12.4 DPS, 2.10s - Dalaran Dungeon', faction: 'both'
});
addAlt(rogue, '17–18', {
  name: "Whipfang's Skinsearer", itemId: 284386, weaponType: 'Dagger', speed: '1.70', dps: '15.6 DPS', value: '15.6 DPS, 1.70s - Barrens Rare', faction: 'both'
});
addAlt(rogue, '21–22', {
  name: "Alliance Outrunner's Sword", itemId: 285346, weaponType: 'One-handed sword', speed: '2.10', dps: '17.1 DPS', value: '17.1 DPS, 2.10s - Alliance Drop', faction: 'alliance'
});
addAlt(rogue, '23–24', {
  name: 'Serrated Raptor Claw', itemId: 280805, weaponType: 'Dagger', speed: '1.60', dps: '17.2 DPS', value: '17.2 DPS, 1.60s - Arathi Drop', faction: 'both'
});
addAlt(rogue, '25–26', {
  name: "Subdued Dragon's Fang", itemId: 281314, weaponType: 'Dagger', speed: '1.70', dps: '20.6 DPS', value: '20.6 DPS, 1.70s - Redridge Quest', faction: 'both'
});
addAlt(rogue, '29–30', {
  name: "Tidebringer's Claw", itemId: 280605, weaponType: 'Fist Weapon', speed: '2.40', dps: '18.1 DPS', value: '18.1 DPS, 2.40s - Custom Boss Drop', faction: 'both'
});
addAlt(rogue, '29–30', {
  name: "Lightning's Grasp", itemId: 280607, weaponType: 'Fist Weapon', speed: '2.40', dps: '18.2 DPS', value: '18.2 DPS, 2.40s - Custom Boss Drop', faction: 'both'
});
addAlt(rogue, '57–60', {
  name: 'Blade of Senseless Slaughter', itemId: 284101, weaponType: 'One-handed sword', speed: '2.70', dps: '40.7 DPS', value: '40.7 DPS, 2.70s - Late Game Drop', faction: 'both'
});

// PRIEST
const priest = progData.priest;
addAlt(priest, '7–8', {
  name: 'Wisesight Wand', itemId: 286750, weaponType: 'Wand', speed: '1.70', dps: '8.8 DPS', value: '8.8 DPS, 1.70s - Early Wand Drop', faction: 'both'
});
addAlt(priest, '9–10', {
  name: 'Deepblaze', itemId: 279896, weaponType: 'Wand', speed: '1.70', dps: '18.5 DPS', value: '18.5 DPS, 1.70s - Alliance Ironforge Quest', faction: 'alliance'
});
addAlt(priest, '11–12', {
  name: "Spark of the People's Militia", itemId: 12296, weaponType: 'Wand', speed: '1.80', dps: '12.8 DPS', value: '12.8 DPS, 1.80s - Westfall Quest', faction: 'alliance'
});
addAlt(priest, '13–14', {
  name: "Moongazer's Wand", itemId: 284193, weaponType: 'Wand', speed: '1.70', dps: '14.4 DPS', value: '14.4 DPS, 1.70s - Ashenvale Rare', faction: 'both'
});
addAlt(priest, '15–16', {
  name: 'Whelpfire Wand', itemId: 281925, weaponType: 'Wand', speed: '1.90', dps: '15.3 DPS', value: '15.3 DPS, 1.90s - Wetlands Drop', faction: 'both'
});
addAlt(priest, '21–24', {
  name: 'Snapped Branch Wand', itemId: 284574, weaponType: 'Wand', speed: '1.70', dps: '21.2 DPS', value: '21.2 DPS, 1.70s - Custom Wand Drop', faction: 'both'
});
addAlt(priest, '21–24', {
  name: 'Alliance Outrunner Staff', itemId: 285350, weaponType: 'Staff', speed: '2.50', dps: '16.2 DPS', value: '16.2 DPS, 2.50s - Alliance Drop', faction: 'alliance'
});
addAlt(priest, '25–26', {
  name: 'Striking Staff', itemId: 279844, weaponType: 'Staff', speed: '3.30', dps: '31.3 DPS', value: '31.3 DPS, 3.30s - Dalaran Dungeon', faction: 'both'
});
addAlt(priest, '25–26', {
  name: 'Unstable Power Core', itemId: 279847, weaponType: 'Wand', speed: '1.70', dps: '29.7 DPS', value: '29.7 DPS, 1.70s - Dalaran Dungeon', faction: 'both'
});
addAlt(priest, '25–26', {
  name: "Fallen Dragon's Scepter", itemId: 281312, weaponType: 'Staff', speed: '3.00', dps: '19.9 DPS', value: '19.9 DPS, 3.00s - Redridge Quest', faction: 'both'
});
addAlt(priest, '41–46', {
  name: "Emerald Watcher's Dreamstaff", itemId: 282007, weaponType: 'Staff', speed: '3.00', dps: '31.7 DPS', value: '31.7 DPS, 3.00s - Custom Staff Drop', faction: 'both'
});

// MAGE
const mage = progData.mage;
addAlt(mage, '7–8', {
  name: 'Wisesight Wand', itemId: 286750, weaponType: 'Wand', speed: '1.70', dps: '8.8 DPS', value: '8.8 DPS, 1.70s - Early Wand Drop', faction: 'both'
});
addAlt(mage, '9–10', {
  name: 'Deepblaze', itemId: 279896, weaponType: 'Wand', speed: '1.70', dps: '18.5 DPS', value: '18.5 DPS, 1.70s - Alliance Ironforge Quest', faction: 'alliance'
});
addAlt(mage, '11–12', {
  name: "Spark of the People's Militia", itemId: 12296, weaponType: 'Wand', speed: '1.80', dps: '12.8 DPS', value: '12.8 DPS, 1.80s - Westfall Quest', faction: 'alliance'
});
addAlt(mage, '13–14', {
  name: 'Searing Dagger', itemId: 273003, weaponType: 'Dagger', speed: '1.60', dps: '8.1 DPS', value: '8.1 DPS, 1.60s - RFC Drop', faction: 'both'
});
addAlt(mage, '13–14', {
  name: "Moongazer's Wand", itemId: 284193, weaponType: 'Wand', speed: '1.70', dps: '14.4 DPS', value: '14.4 DPS, 1.70s - Ashenvale Rare', faction: 'both'
});
addAlt(mage, '15–16', {
  name: 'Whelpfire Wand', itemId: 281925, weaponType: 'Wand', speed: '1.90', dps: '15.3 DPS', value: '15.3 DPS, 1.90s - Wetlands Drop', faction: 'both'
});
addAlt(mage, '21–24', {
  name: 'Snapped Branch Wand', itemId: 284574, weaponType: 'Wand', speed: '1.70', dps: '21.2 DPS', value: '21.2 DPS, 1.70s - Custom Wand Drop', faction: 'both'
});
addAlt(mage, '21–24', {
  name: 'Alliance Outrunner Staff', itemId: 285350, weaponType: 'Staff', speed: '2.50', dps: '16.2 DPS', value: '16.2 DPS, 2.50s - Alliance Drop', faction: 'alliance'
});
addAlt(mage, '25–26', {
  name: 'Striking Staff', itemId: 279844, weaponType: 'Staff', speed: '3.30', dps: '31.3 DPS', value: '31.3 DPS, 3.30s - Dalaran Dungeon', faction: 'both'
});
addAlt(mage, '25–26', {
  name: 'Unstable Power Core', itemId: 279847, weaponType: 'Wand', speed: '1.70', dps: '29.7 DPS', value: '29.7 DPS, 1.70s - Dalaran Dungeon', faction: 'both'
});
addAlt(mage, '25–26', {
  name: "Fallen Dragon's Scepter", itemId: 281312, weaponType: 'Staff', speed: '3.00', dps: '19.9 DPS', value: '19.9 DPS, 3.00s - Redridge Quest', faction: 'both'
});
addAlt(mage, '41–46', {
  name: "Emerald Watcher's Dreamstaff", itemId: 282007, weaponType: 'Staff', speed: '3.00', dps: '31.7 DPS', value: '31.7 DPS, 3.00s - Custom Staff Drop', faction: 'both'
});

// WARLOCK
const warlock = progData.warlock;
addAlt(warlock, '7–8', {
  name: 'Wisesight Wand', itemId: 286750, weaponType: 'Wand', speed: '1.70', dps: '8.8 DPS', value: '8.8 DPS, 1.70s - Early Wand Drop', faction: 'both'
});
addAlt(warlock, '9–10', {
  name: 'Deepblaze', itemId: 279896, weaponType: 'Wand', speed: '1.70', dps: '18.5 DPS', value: '18.5 DPS, 1.70s - Alliance Ironforge Quest', faction: 'alliance'
});
addAlt(warlock, '11–12', {
  name: "Spark of the People's Militia", itemId: 12296, weaponType: 'Wand', speed: '1.80', dps: '12.8 DPS', value: '12.8 DPS, 1.80s - Westfall Quest', faction: 'alliance'
});
addAlt(warlock, '13–14', {
  name: 'Searing Dagger', itemId: 273003, weaponType: 'Dagger', speed: '1.60', dps: '8.1 DPS', value: '8.1 DPS, 1.60s - RFC Drop', faction: 'both'
});
addAlt(warlock, '13–14', {
  name: "Moongazer's Wand", itemId: 284193, weaponType: 'Wand', speed: '1.70', dps: '14.4 DPS', value: '14.4 DPS, 1.70s - Ashenvale Rare', faction: 'both'
});
addAlt(warlock, '15–16', {
  name: 'Whelpfire Wand', itemId: 281925, weaponType: 'Wand', speed: '1.90', dps: '15.3 DPS', value: '15.3 DPS, 1.90s - Wetlands Drop', faction: 'both'
});
addAlt(warlock, '21–24', {
  name: 'Snapped Branch Wand', itemId: 284574, weaponType: 'Wand', speed: '1.70', dps: '21.2 DPS', value: '21.2 DPS, 1.70s - Custom Wand Drop', faction: 'both'
});
addAlt(warlock, '21–24', {
  name: 'Alliance Outrunner Staff', itemId: 285350, weaponType: 'Staff', speed: '2.50', dps: '16.2 DPS', value: '16.2 DPS, 2.50s - Alliance Drop', faction: 'alliance'
});
addAlt(warlock, '25–26', {
  name: 'Striking Staff', itemId: 279844, weaponType: 'Staff', speed: '3.30', dps: '31.3 DPS', value: '31.3 DPS, 3.30s - Dalaran Dungeon', faction: 'both'
});
addAlt(warlock, '25–26', {
  name: 'Unstable Power Core', itemId: 279847, weaponType: 'Wand', speed: '1.70', dps: '29.7 DPS', value: '29.7 DPS, 1.70s - Dalaran Dungeon', faction: 'both'
});
addAlt(warlock, '25–26', {
  name: "Fallen Dragon's Scepter", itemId: 281312, weaponType: 'Staff', speed: '3.00', dps: '19.9 DPS', value: '19.9 DPS, 3.00s - Redridge Quest', faction: 'both'
});
addAlt(warlock, '41–46', {
  name: "Emerald Watcher's Dreamstaff", itemId: 282007, weaponType: 'Staff', speed: '3.00', dps: '31.7 DPS', value: '31.7 DPS, 3.00s - Custom Staff Drop', faction: 'both'
});

// SHAMAN
const shaman = progData.shaman;
addAlt(shaman, '9–10', {
  name: 'Trogg Scepter', itemId: 272996, weaponType: 'One-handed mace', speed: '2.40', dps: '8.1 DPS', value: '8.1 DPS, 2.40s - RFC Oggleflint', faction: 'both'
});
addAlt(shaman, '13–14', {
  name: 'Fang of Magmatus', itemId: 271095, weaponType: 'Dagger', speed: '1.70', dps: '7.9 DPS', value: '7.9 DPS, 1.70s - RFC Drop', faction: 'both'
});
addAlt(shaman, '13–14', {
  name: 'Bone Knuckles', itemId: 272998, weaponType: 'Fist Weapon', speed: '2.00', dps: '12.3 DPS', value: '12.3 DPS, 2.00s - RFC Drop', faction: 'both'
});
addAlt(shaman, '15–16', {
  name: 'The Stitcher', itemId: 279874, weaponType: 'One-handed mace', speed: '2.40', dps: '8.1 DPS', value: '8.1 DPS, 2.40s - Dalaran Dungeon', faction: 'both'
});
addAlt(shaman, '25–26', {
  name: 'Defender of Dalaran', itemId: 279841, weaponType: 'Two-handed mace', speed: '3.30', dps: '31.2 DPS', value: '31.2 DPS, 3.30s - Dalaran Dungeon', faction: 'both'
});
addAlt(shaman, '29–30', {
  name: 'Rage of the Storm', itemId: 280604, weaponType: 'Two-handed mace', speed: '3.20', dps: '35.6 DPS', value: '35.6 DPS, 3.20s - Custom Boss Drop', faction: 'both'
});
addAlt(shaman, '29–30', {
  name: "Tidebringer's Claw", itemId: 280605, weaponType: 'Fist Weapon', speed: '2.40', dps: '18.1 DPS', value: '18.1 DPS, 2.40s - Custom Boss Drop', faction: 'both'
});
addAlt(shaman, '29–30', {
  name: "Lightning's Grasp", itemId: 280607, weaponType: 'Fist Weapon', speed: '2.40', dps: '18.2 DPS', value: '18.2 DPS, 2.40s - Custom Boss Drop', faction: 'both'
});
addAlt(shaman, '41–46', {
  name: "Gul'gash's Greathammer", itemId: 281648, weaponType: 'Two-handed mace', speed: '3.60', dps: '42.8 DPS', value: '42.8 DPS, 3.60s - Feralas Drop', faction: 'both'
});
addAlt(shaman, '53–60', {
  name: 'Icesworn Decapitator', itemId: 284257, weaponType: 'Two-handed axe', speed: '3.60', dps: '50.6 DPS', value: '50.6 DPS, 3.60s - Winterspring Rare', faction: 'both'
});

// DRUID
const druid = progData.druid;
addAlt(druid, '9–10', {
  name: 'Ironforge Greathammer', itemId: 279895, weaponType: 'Two-handed mace', speed: '3.30', dps: '16.0 DPS', value: '16.0 DPS, 3.30s - Ironforge Quest', faction: 'alliance'
});
addAlt(druid, '11–12', {
  name: 'Ironforge Greathammer', itemId: 279895, weaponType: 'Two-handed mace', speed: '3.30', dps: '16.0 DPS', value: '16.0 DPS, 3.30s - Ironforge Quest', faction: 'alliance'
});
addAlt(druid, '13–14', {
  name: 'Fang of Magmatus', itemId: 271095, weaponType: 'Dagger', speed: '1.70', dps: '7.9 DPS', value: '7.9 DPS, 1.70s - RFC Drop', faction: 'both'
});
addAlt(druid, '15–16', {
  name: 'The Stitcher', itemId: 279874, weaponType: 'One-handed mace', speed: '2.40', dps: '8.1 DPS', value: '8.1 DPS, 2.40s - Dalaran Dungeon', faction: 'both'
});
addAlt(druid, '21–22', {
  name: 'Alliance Outrunner Staff', itemId: 285350, weaponType: 'Staff', speed: '2.50', dps: '16.2 DPS', value: '16.2 DPS, 2.50s - Alliance Drop', faction: 'alliance'
});
addAlt(druid, '23–24', {
  name: 'Striking Staff', itemId: 279844, weaponType: 'Staff', speed: '3.30', dps: '31.3 DPS', value: '31.3 DPS, 3.30s - Dalaran Dungeon', faction: 'both'
});
addAlt(druid, '25–26', {
  name: 'Defender of Dalaran', itemId: 279841, weaponType: 'Two-handed mace', speed: '3.30', dps: '31.2 DPS', value: '31.2 DPS, 3.30s - Dalaran Dungeon', faction: 'both'
});
addAlt(druid, '29–30', {
  name: 'Rage of the Storm', itemId: 280604, weaponType: 'Two-handed mace', speed: '3.20', dps: '35.6 DPS', value: '35.6 DPS, 3.20s - Custom Boss Drop', faction: 'both'
});
addAlt(druid, '41–46', {
  name: "Gul'gash's Greathammer", itemId: 281648, weaponType: 'Two-handed mace', speed: '3.60', dps: '42.8 DPS', value: '42.8 DPS, 3.60s - Feralas Drop', faction: 'both'
});
addAlt(druid, '41–46', {
  name: "Emerald Watcher's Dreamstaff", itemId: 282007, weaponType: 'Staff', speed: '3.00', dps: '31.7 DPS', value: '31.7 DPS, 3.00s - Custom Staff Drop', faction: 'both'
});

// 3. Write enriched data to data/scraped/forever_weapons.json
const outProgPath = path.join(ROOT, 'data', 'scraped', 'forever_weapons.json');
fs.writeFileSync(outProgPath, JSON.stringify(progData, null, 2), 'utf8');
console.log(`Successfully wrote enriched weapons data to ${outProgPath}`);

// 4. Update generate-forever-weapons.mjs with enriched weaponsData
const genPath = path.join(ROOT, 'scripts', 'generate-forever-weapons.mjs');
let genContent = fs.readFileSync(genPath, 'utf8');
const replaceTarget = `const weaponsData = ${JSON.stringify(progData, null, 2)};`;
genContent = genContent.replace(/const weaponsData = \{[\s\S]*?\n\};/, replaceTarget);
fs.writeFileSync(genPath, genContent, 'utf8');
console.log(`Successfully updated ${genPath}`);

// 5. Run compile-progression-data.mjs
import('./compile-progression-data.mjs').then(() => {
  console.log('Successfully re-compiled progression data into js/data/class-progression-data.js');
});
