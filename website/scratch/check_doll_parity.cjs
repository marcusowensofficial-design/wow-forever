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
const bisDataJsPath = path.join(__dirname, '..', 'js', 'data', 'bis-data.js');
const code = fs.readFileSync(bisDataJsPath, 'utf8');
const context = { window: {}, console: console };
vm.createContext(context);
const [ourBisData, ourBisMetadata] = vm.runInContext(code + '\n; [WOW_BIS_DATA, WOW_BIS_METADATA];', context);

let dollMismatches = 0;
let totalDollSlotsChecked = 0;

for (const p of BIS_PATHS) {
  const safeName = p.replace(/\//g, '_') + '.html';
  const html = fs.readFileSync(path.join(CACHE_DIR, safeName), 'utf8');
  const [cls, sub = 'pve'] = p.split('/');
  const ourSpec = ourBisData[cls]?.specs?.find(s => s.id === sub);
  if (!ourSpec || !ourSpec.doll) {
    console.error(`Spec missing doll in our data: ${p}`);
    continue;
  }

  const cellRegex = /<a class="bis-cell" href="#slot-([^"]+)">([\s\S]*?)<\/a>/g;
  let cm;
  let aFingerCount = 0;
  let hFingerCount = 0;
  let aTrinketCount = 0;
  let hTrinketCount = 0;

  while ((cm = cellRegex.exec(html)) !== null) {
    const rawSlot = cm[1];
    const cellContent = cm[2];
    const aMatch = cellContent.match(/data-for="a" data-tip="([^"]+)"[\s\S]*?<b class="(q\d)">([^<]+)<\/b>/);
    const hMatch = cellContent.match(/data-for="h" data-tip="([^"]+)"[\s\S]*?<b class="(q\d)">([^<]+)<\/b>/);

    function getSlotKey(raw, isAlliance) {
      if (raw === 'shoulders') return 'shoulder';
      if (raw === 'main-hand' || raw === 'two-hand' || raw === 'one-hand') return 'mainHand';
      if (raw === 'off-hand') return 'offHand';
      if (raw === 'finger') {
        if (isAlliance) {
          aFingerCount++;
          return aFingerCount === 1 ? 'finger1' : 'finger2';
        } else {
          hFingerCount++;
          return hFingerCount === 1 ? 'finger1' : 'finger2';
        }
      }
      if (raw === 'trinket') {
        if (isAlliance) {
          aTrinketCount++;
          return aTrinketCount === 1 ? 'trinket1' : 'trinket2';
        } else {
          hTrinketCount++;
          return hTrinketCount === 1 ? 'trinket1' : 'trinket2';
        }
      }
      return raw;
    }

    if (aMatch) {
      totalDollSlotsChecked++;
      const slotKey = getSlotKey(rawSlot, true);
      const fcTipId = aMatch[1];
      const fcName = aMatch[3].replace(/&#x27;/g, "'").replace(/&amp;/g, '&');
      const ourEquipped = ourSpec.doll.alliance[slotKey];
      if (!ourEquipped) {
        console.error(`[A Missing] ${p} slot ${slotKey}: FC has ${fcName}`);
        dollMismatches++;
      } else if (ourEquipped.name.toLowerCase() !== fcName.toLowerCase()) {
        console.error(`[A Mismatch] ${p} slot ${slotKey}: FC has "${fcName}" (${fcTipId}) vs OUR "${ourEquipped.name}" (${ourEquipped.tipId})`);
        dollMismatches++;
      }
    }

    if (hMatch) {
      totalDollSlotsChecked++;
      const slotKey = getSlotKey(rawSlot, false);
      const fcTipId = hMatch[1];
      const fcName = hMatch[3].replace(/&#x27;/g, "'").replace(/&amp;/g, '&');
      const ourEquipped = ourSpec.doll.horde[slotKey];
      if (!ourEquipped) {
        console.error(`[H Missing] ${p} slot ${slotKey}: FC has ${fcName}`);
        dollMismatches++;
      } else if (ourEquipped.name.toLowerCase() !== fcName.toLowerCase()) {
        console.error(`[H Mismatch] ${p} slot ${slotKey}: FC has "${fcName}" (${fcTipId}) vs OUR "${ourEquipped.name}" (${ourEquipped.tipId})`);
        dollMismatches++;
      }
    }
  }
}

console.log(`Doll check complete: Total slots checked: ${totalDollSlotsChecked}, Mismatches: ${dollMismatches}`);
