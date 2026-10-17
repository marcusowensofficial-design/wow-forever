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

const CACHE_DIR = path.join(__dirname, '..', 'scratch', 'fc_bis_cache');
if (!fs.existsSync(CACHE_DIR)) {
  fs.mkdirSync(CACHE_DIR, { recursive: true });
}

// Ensure all 38 spec pages are cached
async function ensureCache() {
  for (const p of BIS_PATHS) {
    const safeName = p.replace(/\//g, '_') + '.html';
    const filePath = path.join(CACHE_DIR, safeName);
    if (!fs.existsSync(filePath)) {
      console.log(`Downloading https://foreverchanges.pro/bis/${p}...`);
      const res = await fetch(`https://foreverchanges.pro/bis/${p}`);
      if (!res.ok) throw new Error(`Failed to fetch ${p}: ${res.statusText}`);
      const text = await res.text();
      fs.writeFileSync(filePath, text, 'utf8');
      await new Promise(r => setTimeout(r, 100));
    }
  }
}

const bisDataJsPath = path.join(__dirname, '..', 'js', 'data', 'bis-data.js');

// 1. Load existing bis-data.js
const code = fs.readFileSync(bisDataJsPath, 'utf8');
const context = { window: {}, console: console };
vm.createContext(context);
const [ourBisData, ourBisMetadata] = vm.runInContext(code + '\n; [WOW_BIS_DATA, WOW_BIS_METADATA];', context);

// 2. Extract all tooltips from all 38 files
function extractTooltipsFromPayload(clean) {
  const itemsMap = {};
  const itemRegex = /"(\d+)":\{"id":(\d+),/g;
  let m;
  while ((m = itemRegex.exec(clean)) !== null) {
    const tipKey = m[1];
    const startIdx = m.index + tipKey.length + 3;
    let depth = 0;
    let endIdx = -1;
    for (let i = startIdx; i < clean.length; i++) {
      if (clean[i] === '{') depth++;
      else if (clean[i] === '}') {
        depth--;
        if (depth === 0) {
          endIdx = i + 1;
          break;
        }
      }
    }
    if (endIdx !== -1) {
      try {
        const obj = JSON.parse(clean.substring(startIdx, endIdx));
        if (obj.name && obj.lines) {
          itemsMap[tipKey] = obj;
        }
      } catch {}
    }
  }
  return itemsMap;
}

function formatStats(lines) {
  if (!lines || lines.length === 0) return '';
  const statParts = [];
  lines.forEach(l => {
    const trimmed = l.trim();
    if (!trimmed) return;
    if (trimmed.startsWith('+')) {
      statParts.push(trimmed);
    } else if (trimmed.startsWith('Equip:')) {
      statParts.push(trimmed);
    } else if (trimmed.startsWith('Use:')) {
      statParts.push(trimmed);
    } else if (trimmed.startsWith('Chance on hit:')) {
      statParts.push(trimmed);
    }
  });
  return statParts.join(', ');
}

function normalizeSlotKey(k) {
  if (k === 'shoulders') return 'shoulder';
  return k;
}

function getSlotClassification(slotLabel, itemName) {
  const l = (slotLabel || '').toLowerCase();
  const n = (itemName || '').toLowerCase();

  if (l.includes("main hand") || l.includes("off hand") || l.includes("two-hand") || l.includes("one-hand")) {
    if (n.includes("sword")) return "Sword";
    if (n.includes("axe")) return "Axe";
    if (n.includes("mace")) return "Mace";
    if (n.includes("dagger")) return "Dagger";
    if (n.includes("shield") || n.includes("buckler")) return "Shield";
    if (n.includes("staff")) return "Staff";
    if (n.includes("polearm")) return "Polearm";
    return "One-Hand";
  }
  if (l.includes("ranged")) {
    if (n.includes("bow")) return "Bow";
    if (n.includes("gun") || n.includes("musket") || n.includes("blunderbuss")) return "Gun";
    if (n.includes("wand")) return "Wand";
    if (n.includes("crossbow")) return "Crossbow";
    return "Ranged";
  }
  if (l.includes("finger")) return "Finger";
  if (l.includes("neck")) return "Neck";
  if (l.includes("trinket")) return "Trinket";
  if (l.includes("back")) return "Cloth";

  if (n.includes("chain") || n.includes("mail")) return "Mail";
  if (n.includes("leather") || n.includes("tiger") || n.includes("cutthroat") || n.includes("pelt")) return "Leather";
  if (n.includes("silk") || n.includes("robe") || n.includes("cloth") || n.includes("tunic of westfall")) return "Cloth";

  return "Armor";
}

function synthesizeTooltipLines(item, slotId) {
  if (item.lines && item.lines.length > 0) return item.lines;

  const lines = [];
  const src = (item.source || '').toLowerCase();
  const isBindsEquip = src.includes('world drop') || src.includes('auction') || src.includes('craft');
  lines.push(isBindsEquip ? 'Binds when equipped' : 'Binds when picked up');

  const slotCapitalized = slotId ? slotId.charAt(0).toUpperCase() + slotId.slice(1).replace('-', ' ') : 'Equipment';
  const classification = getSlotClassification(slotCapitalized, item.name);
  if (classification && classification !== 'Armor') {
    lines.push(`${slotCapitalized}\t${classification}`);
  } else {
    lines.push(slotCapitalized);
  }

  if (item.armor) {
    lines.push(`${item.armor} Armor`);
  }

  if (item.stats) {
    const parts = item.stats.split(',').map(s => s.trim()).filter(Boolean);
    parts.forEach(p => {
      lines.push(p);
    });
  }

  const reqLvl = item.ilvl && item.ilvl < 30 ? Math.max(15, item.ilvl - 5) : 25;
  lines.push(`Requires Level ${reqLvl}`);

  return lines;
}

async function main() {
  await ensureCache();

  const masterDict = {};
  const fcFiles = fs.readdirSync(CACHE_DIR).filter(f => f.endsWith('.html'));
  for (const f of fcFiles) {
    const html = fs.readFileSync(path.join(CACHE_DIR, f), 'utf8');
    const nextChunks = [];
    const regex = /self\.__next_f\.push\(\[1,\s*"(.*?)"\]\)/g;
    let m;
    while ((m = regex.exec(html)) !== null) nextChunks.push(m[1]);
    const clean = nextChunks.join('').replace(/\\"/g, '"').replace(/\\\\/g, '\\');
    const dict = extractTooltipsFromPayload(clean);
    Object.assign(masterDict, dict);
  }
  console.log(`Loaded ${Object.keys(masterDict).length} items in master tooltip dictionary.`);

  let totalItemsAddedOrUpdated = 0;

  for (const p of BIS_PATHS) {
    const safeName = p.replace(/\//g, '_') + '.html';
    const html = fs.readFileSync(path.join(CACHE_DIR, safeName), 'utf8');
    const [cls, sub = 'pve'] = p.split('/');
    const ourSpec = ourBisData[cls].specs.find(s => s.id === sub);
    if (!ourSpec) {
      console.warn(`Spec not found: ${p}`);
      continue;
    }

    // Parse slot sections cleanly without skipping sections with bis-slot-none
    const sectionRegex = /<section class="bis-slot" id="slot-([^"]+)"><h2>(.*?)<\/h2>([\s\S]*?)<\/section>/g;
    let sm;
    while ((sm = sectionRegex.exec(html)) !== null) {
      const rawSlotId = sm[1];
      const slotId = normalizeSlotKey(rawSlotId);
      const slotTitle = sm[2];
      const sectionBody = sm[3];

      const olMatch = sectionBody.match(/<ol>([\s\S]*?)<\/ol>/);
      const itemsHtml = olMatch ? olMatch[1] : '';

      let ourSlot = ourSpec.slots.find(s => s.slotId === slotId || s.slotName.toLowerCase() === slotTitle.toLowerCase());
      if (!ourSlot) {
        ourSlot = {
          slotId: slotId,
          slotName: slotTitle,
          items: []
        };
        ourSpec.slots.push(ourSlot);
      }

      const itemRegex = /<li class="bis-row"([^>]*)>[\s\S]*?<img src="\/icon\/([^"]+)"[\s\S]*?class="bis-icon (bq\d)" data-tip="([^"]+)"[\s\S]*?<a data-tip="[^"]*" class="bis-name (q\d)" href="\/item\/([^"]+)">([^<]+)<\/a>[\s\S]*?<div class="bis-from">([\s\S]*?)<\/div>[\s\S]*?<div class="bis-mats">([\s\S]*?)<\/div>/g;
      let im;
      let rank = 1;
      const newItems = [];
      const seenNames = new Set();

      while ((im = itemRegex.exec(itemsHtml)) !== null) {
        const rowAttrs = im[1];
        const iconRaw = im[2];
        const bqClass = im[3];
        const tipId = im[4];
        const qClass = im[5];
        const itemId = im[6];
        const name = im[7].replace(/&#x27;/g, "'").replace(/&amp;/g, '&');
        const fromRaw = im[8].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
        const mats = im[9].trim();

        let side = 'both';
        if (rowAttrs.includes('data-item-side="a"')) side = 'alliance';
        else if (rowAttrs.includes('data-item-side="h"')) side = 'horde';

        const tip = masterDict[tipId] || masterDict[itemId] || {};
        let lines = tip.lines && tip.lines.length > 0 ? tip.lines : [];
        const stats = formatStats(lines);
        const quality = 'q' + (tip.quality || qClass.replace('q', ''));
        const icon = (tip.icon || iconRaw).replace(/\.(jpg|png)$/i, '') + '.jpg';

        const itemObj = {
          rank: rank++,
          quality: quality,
          itemId: String(itemId),
          tipId: String(tipId),
          name: name,
          icon: icon,
          side: side,
          source: fromRaw,
          sourceDetails: [fromRaw],
          stats: stats,
          ilvl: tip.ilvl != null ? tip.ilvl : null,
          armor: tip.armor != null ? tip.armor : null,
          lines: lines,
          mats: mats
        };

        if (!itemObj.lines || itemObj.lines.length === 0) {
          itemObj.lines = synthesizeTooltipLines(itemObj, slotId);
        }

        newItems.push(itemObj);
        seenNames.add(name.toLowerCase());
        totalItemsAddedOrUpdated++;
      }

      // Keep any existing items in our slot that are not in FC (appended at the end as further alternatives)
      if (ourSlot.items && ourSlot.items.length > 0) {
        ourSlot.items.forEach(oldItem => {
          if (!seenNames.has(oldItem.name.toLowerCase())) {
            seenNames.add(oldItem.name.toLowerCase());
            const fullLines = synthesizeTooltipLines(oldItem, slotId);
            newItems.push({
              ...oldItem,
              lines: fullLines,
              rank: rank++
            });
          }
        });
      }

      ourSlot.items = newItems;
    }

    // Parse paper doll equipped items with support for finger1/2 and trinket1/2
    const cellRegex = /<a class="bis-cell" href="#slot-([^"]+)">([\s\S]*?)<\/a>/g;
    let cm;
    ourSpec.doll = ourSpec.doll || { alliance: {}, horde: {} };
    ourSpec.doll.alliance = ourSpec.doll.alliance || {};
    ourSpec.doll.horde = ourSpec.doll.horde || {};

    let aFingerCount = 0;
    let hFingerCount = 0;
    let aTrinketCount = 0;
    let hTrinketCount = 0;

    while ((cm = cellRegex.exec(html)) !== null) {
      const rawSlot = cm[1];
      const cellContent = cm[2];
      const aMatch = cellContent.match(/data-for="a" data-tip="([^"]+)"[\s\S]*?<b class="(q\d)">([^<]+)<\/b>/);
      const hMatch = cellContent.match(/data-for="h" data-tip="([^"]+)"[\s\S]*?<b class="(q\d)">([^<]+)<\/b>/);

      function resolveItem(tipId, name, qFallback) {
        let item = null;
        for (const sl of ourSpec.slots) {
          const found = sl.items.find(i => i.tipId === tipId || i.name === name);
          if (found) { item = found; break; }
        }
        if (!item) {
          const tip = masterDict[tipId] || {};
          item = {
            name: name,
            tipId: tipId,
            itemId: String(tip.id || tipId),
            quality: 'q' + (tip.quality || qFallback.replace('q', '')),
            icon: ((tip.icon || 'inv_misc_questionmark').replace(/\.(jpg|png)$/i, '')) + '.jpg',
            lines: tip.lines || [],
            ilvl: tip.ilvl || null,
            armor: tip.armor || null,
            stats: formatStats(tip.lines)
          };
          if (!item.lines || item.lines.length === 0) {
            item.lines = synthesizeTooltipLines(item, rawSlot);
          }
        }
        return item;
      }

      function getSlotKeys(rawSlot, isAlliance) {
        if (rawSlot === 'shoulders') return ['shoulder'];
        if (rawSlot === 'main-hand' || rawSlot === 'two-hand' || rawSlot === 'one-hand') return ['mainHand'];
        if (rawSlot === 'off-hand') return ['offHand'];
        if (rawSlot === 'finger') {
          if (isAlliance) {
            aFingerCount++;
            return aFingerCount === 1 ? ['finger1', 'finger'] : ['finger2'];
          } else {
            hFingerCount++;
            return hFingerCount === 1 ? ['finger1', 'finger'] : ['finger2'];
          }
        }
        if (rawSlot === 'trinket') {
          if (isAlliance) {
            aTrinketCount++;
            return aTrinketCount === 1 ? ['trinket1', 'trinket'] : ['trinket2'];
          } else {
            hTrinketCount++;
            return hTrinketCount === 1 ? ['trinket1', 'trinket'] : ['trinket2'];
          }
        }
        return [rawSlot];
      }

      if (aMatch) {
        const aTipId = aMatch[1];
        const aName = aMatch[3].replace(/&#x27;/g, "'").replace(/&amp;/g, '&');
        const item = resolveItem(aTipId, aName, aMatch[2]);
        const keys = getSlotKeys(rawSlot, true);
        keys.forEach(k => { ourSpec.doll.alliance[k] = item; });
      }

      if (hMatch) {
        const hTipId = hMatch[1];
        const hName = hMatch[3].replace(/&#x27;/g, "'").replace(/&amp;/g, '&');
        const item = resolveItem(hTipId, hName, hMatch[2]);
        const keys = getSlotKeys(rawSlot, false);
        keys.forEach(k => { ourSpec.doll.horde[k] = item; });
      }
    }
  }

  console.log(`Processed all 38 specs. Total items ranked/updated: ${totalItemsAddedOrUpdated}`);

  // 4. Write back to js/data/bis-data.js
  const header = `/**
 * World of Warcraft: Forever - Beta BiS (Best in Slot) Master Dataset
 * Level 30 Phase 2 Beta Cap • Build 1.60.1.70425 (October 15, 2026)
 * 
 * Contains FULL comprehensive BiS data extracted from Beta Build 70425 across ALL 9 Classes & 38 Specs:
 * - Equipment paper-doll slots (Head, Neck, Shoulder, Back, Chest, Wrist, Hands, Waist, Legs, Feet, Fingers, Trinkets, Weapons, Ranged/Relic)
 * - Complete item rankings (#1, #2, #3, #4, #5, #6, #7...) with exact drop sources (Dalaran, ES4, RFK, BFD, Stockade, Gnomeregan, SM Graveyard, Crafting, Quests, World Drops)
 * - Faction-specific availability (Alliance vs Horde drops & quest differences)
 * - Stat budgets, enchant recommendations, and Level 30 talent specs (+5 points from 'Talented' Legacy Perk)
 * - Pre-fight consumables (Elixirs, Potions, Foods, Scrolls, Ammo, Campfire buffs)
 */

const WOW_BIS_METADATA = ${JSON.stringify(ourBisMetadata, null, 2)};

const WOW_BIS_DATA = ${JSON.stringify(ourBisData, null, 2)};
`;

  fs.writeFileSync(bisDataJsPath, header, 'utf8');
  console.log('Successfully wrote updated bis-data.js!');
}

main().catch(console.error);
