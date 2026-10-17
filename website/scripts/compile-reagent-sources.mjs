/**
 * Merges all scraped Wowhead Forever reagent batches (batch_0..5_results.json)
 * with internal crafted recipes, Herbalism nodes, Mining veins, Skinning brackets,
 * Fishing waters, and Enchanting disenchant brackets to produce 100% coverage
 * for all 525 unique reagents across all 13 professions.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ROOT_DIR = path.resolve(__dirname, '..');
const PROFESSIONS_JS_PATH = path.join(ROOT_DIR, 'js', 'data', 'professions-data.js');
const PROFESSIONS_JSON_PATH = path.join(ROOT_DIR, 'data', 'forever_professions.json');
const REAGENT_SOURCES_JSON_PATH = path.join(ROOT_DIR, 'data', 'forever_reagent_sources.json');

// Load existing WOW_PROFESSIONS_DATA
const jsContent = fs.readFileSync(PROFESSIONS_JS_PATH, 'utf8');
const sandbox = { window: {} };
const fn = new Function('window', jsContent);
fn(sandbox.window);
const profData = sandbox.window.WOW_PROFESSIONS_DATA;

// 1. Merge existing forever_reagent_sources.json + scraped batches 0..5
const scrapedMap = {};
if (fs.existsSync(REAGENT_SOURCES_JSON_PATH)) {
  const existing = JSON.parse(fs.readFileSync(REAGENT_SOURCES_JSON_PATH, 'utf8'));
  Object.assign(scrapedMap, existing);
}
for (let i = 0; i <= 5; i++) {
  const p = path.join(ROOT_DIR, 'scratch', `batch_${i}_results.json`);
  if (fs.existsSync(p)) {
    const data = JSON.parse(fs.readFileSync(p, 'utf8'));
    Object.assign(scrapedMap, data);
  }
}
console.log(`[Compiler] Loaded ${Object.keys(scrapedMap).length} reagent source records.`);

// 2. Collect all unique reagents across all 13 professions
const uniqueReagents = new Map();
function registerReagent(id, name, icon, quality, slug, isLeveling = false, shoppingGroup = '') {
  if (!name) return;
  const cleanName = name.replace(/^\d+x\s+/i, '').trim();
  const numId = id ? Number(id) : null;
  if (!numId) return;
  if (!uniqueReagents.has(numId)) {
    uniqueReagents.set(numId, {
      id: numId,
      name: cleanName,
      icon: icon || '',
      quality: quality || 1,
      profs: new Set(),
      shoppingGroups: new Set(),
      isLeveling: false
    });
  }
  const entry = uniqueReagents.get(numId);
  if (slug) entry.profs.add(slug);
  if (isLeveling) entry.isLeveling = true;
  if (shoppingGroup) entry.shoppingGroups.add(shoppingGroup);
}

for (const [slug, p] of Object.entries(profData)) {
  (p.recipes || []).forEach(r => {
    (r.reagents || []).forEach(m => {
      registerReagent(m.id || m.itemId, m.name, m.icon, m.quality, slug, false, '');
    });
  });
  (p.leveling?.steps || []).forEach(s => {
    (s.reagents || []).forEach(m => {
      registerReagent(m.id || m.itemId, m.name, m.icon, m.quality, slug, true, '');
    });
    (s.icons || []).forEach(ic => {
      registerReagent(ic.id || ic.itemId, ic.name, ic.icon, ic.quality, slug, true, 'Gathering');
    });
  });
  (p.shopping?.groups || []).forEach(g => {
    (g.items || []).forEach(it => {
      registerReagent(it.id || it.itemId, it.name, it.icon, it.quality, slug, true, g.title || '');
    });
  });
  (p.campfires || []).forEach(c => {
    (c.reagents || []).forEach(m => {
      registerReagent(m.id || m.itemId, m.name, m.icon, m.quality, slug, true, '');
    });
  });
  (p.buffObjects || []).forEach(b => {
    (b.reagents || []).forEach(m => {
      registerReagent(m.id || m.itemId, m.name, m.icon, m.quality, slug, false, '');
    });
  });
}

// 3. Build internal Crafted, Herb, Mining, and Skinning indexes
const craftedRecipesByName = new Map();
for (const [slug, p] of Object.entries(profData)) {
  if (slug === 'camping') continue;
  (p.recipes || []).forEach(r => {
    if (!r.name) return;
    const clean = r.name.replace(/^Smelt\s+/i, '').toLowerCase().trim();
    const keys = new Set([r.name.toLowerCase().trim(), clean]);
    if (r.name.toLowerCase().startsWith('smelt ')) {
      keys.add(`${clean} bar`);
    }
    for (const k of keys) {
      if (!craftedRecipesByName.has(k)) craftedRecipesByName.set(k, []);
      const list = craftedRecipesByName.get(k);
      if (!list.some(x => x.profSlug === slug && x.recipeName === r.name)) {
        list.push({
          profSlug: slug,
          profName: p.name,
          profIcon: p.icon,
          recipeId: r.id,
          recipeName: r.name,
          learn: r.learn,
          source: r.source || 'Trainer'
        });
      }
    }
  });
}

const herbNodesByName = new Map();
(profData.herbalism?.nodes || []).forEach(n => {
  herbNodesByName.set(n.name.toLowerCase().trim(), n);
});

const miningNodesList = profData.mining?.nodes || [];
const miningNodesListDesc = miningNodesList.slice().sort((a, b) => b.name.length - a.name.length);

// 4. Build final WOW_REAGENT_SOURCES dictionary
const finalSources = {};

for (const [id, meta] of uniqueReagents.entries()) {
  const scraped = scrapedMap[id] || {};
  const cleanLower = meta.name.toLowerCase().trim();

  const drops = scraped.drops || [];
  const vendors = scraped.vendors || [];
  const fishedIn = scraped.fishedIn || [];
  const skinnedFrom = scraped.skinnedFrom || [];
  const minedFrom = (scraped.minedFrom || []).filter(m => m.pct > 0);
  const gatheredFrom = (scraped.gatheredFrom || []).filter(g => g.pct > 0);
  const containedIn = scraped.containedIn || [];
  const disenchant = scraped.disenchant || null;
  const topZones = scraped.topZones || [];

  const craftedBy = craftedRecipesByName.get(cleanLower) || [];
  const herbNode = herbNodesByName.get(cleanLower) || null;

  const isMineral = /\b(ores?|stones?|nuggets?|pyrite|bauxite|pitchblende|torbernite|obsidian|souldarite|dark iron|elementium|gems?|diamonds?|sapphires?|rub(?:y|ies)|emeralds?|agates?|opals?|citrines?|aquamarines?|malachite|tigerseye|shadowgems?|jade|moonstones?|blood of the mountain|vitriol|arcane crystal|crystals?)\b/i.test(cleanLower);

  let miningNode = null;
  if (isMineral && minedFrom.length > 0) {
    const topNodeName = minedFrom[0].name.toLowerCase();
    miningNode = miningNodesListDesc.find(n => {
      const nl = n.name.toLowerCase();
      return topNodeName === nl || topNodeName.includes(nl);
    }) || null;
  } else if (isMineral && (cleanLower.includes('ore') || cleanLower.includes('stone'))) {
    miningNode = miningNodesListDesc.find(n => {
      const nFirst = n.name.toLowerCase().split(' ')[0];
      return cleanLower.includes(nFirst);
    }) || null;
  }

  const isShoppingVendor = Array.from(meta.shoppingGroups).some(g => g.toLowerCase().includes('vendor'));
  const hasUnlimitedVendor = vendors.some(v => v.stock === null);
  const isBroadVendorSupply = hasUnlimitedVendor && (vendors.length >= 8 || (scraped.totalVendors || 0) >= 8);
  const isFish = /\b(raw\b|fish|salmon|trout|catfish|snapper|albacore|mackerel|cod|halibut|bass|squid|lobster|yellowtail|redgill|whimsyfin|eel|blackmouth)\b/i.test(cleanLower) || (fishedIn.length > 0 && drops.length === 0);

  let primaryType = 'mob_drop';
  let ctaIcon = '⚔️';
  let ctaText = 'Click here to see where to get this reagent';
  let summary = '';
  let wowheadTab = '';

  if (herbNode || (gatheredFrom.length > 0 && !cleanLower.includes('elemental'))) {
    primaryType = 'herb';
    ctaIcon = '🌿';
    const reqSkill = herbNode ? ` (Herbalism ${herbNode.skill}+)` : '';
    ctaText = `Click here to see where to gather this herb${reqSkill}`;
    const zonesTxt = herbNode?.zones || gatheredFrom[0]?.zones?.join(', ') || topZones.slice(0, 3).join(', ');
    summary = `Gathered via Herbalism${reqSkill}: ${zonesTxt || 'Open-world herb nodes across Azeroth'}.`;
    wowheadTab = 'gathered-from-object';
  } else if (isMineral && (minedFrom.length > 0 || (miningNode && !craftedBy.length))) {
    primaryType = 'ore';
    ctaIcon = '⛏️';
    const veinName = minedFrom[0]?.name || miningNode?.name || 'Mining Veins';
    const reqSkill = (minedFrom[0] && miningNode && (minedFrom[0].name.toLowerCase() === miningNode.name.toLowerCase() || minedFrom[0].name.toLowerCase().includes(miningNode.name.toLowerCase())))
      ? ` (Mining ${miningNode.skill}+)`
      : (!minedFrom[0] && miningNode ? ` (Mining ${miningNode.skill}+)` : '');
    ctaText = `Click here to see where to mine ${veinName}${reqSkill}`;
    const zonesTxt = miningNode?.zones || minedFrom[0]?.zones?.join(', ') || topZones.slice(0, 3).join(', ');
    summary = `Mined from ${veinName}${reqSkill}: ${zonesTxt || 'Mountain and cave mineral veins'}.`;
    wowheadTab = 'mined-from-object';
  } else if (isFish && fishedIn.length > 0) {
    primaryType = 'fished';
    ctaIcon = '🎣';
    ctaText = `Click here to see where to fish this (${fishedIn.length} Waters)`;
    const topZ = fishedIn.slice(0, 3).map(f => `${f.zone}${f.pct ? ` (${f.pct}%)` : ''}`).join(', ');
    summary = `Fished from open waters in ${topZ}${vendors.length ? ` or bought from ${vendors.length} fishing vendors` : ''}.`;
    wowheadTab = 'fished-in';
  } else if (skinnedFrom.length > 0 && (cleanLower.includes('leather') || cleanLower.includes('hide') || cleanLower.includes('scale') || cleanLower.includes('fur') || cleanLower.includes('pelt') || cleanLower.includes('chitin') || cleanLower.includes('carapace'))) {
    primaryType = 'skinned';
    ctaIcon = '🔪';
    ctaText = `Click here to see which beasts to skin (${skinnedFrom.length}+ Beasts)`;
    const topB = skinnedFrom.slice(0, 3).map(s => `${s.name}${s.zones?.[0] ? ` (${s.zones[0]})` : ''}`).join(', ');
    summary = `Skinned from beasts: ${topB}.`;
    wowheadTab = 'skinned-from';
  } else if (isShoppingVendor || isBroadVendorSupply || (hasUnlimitedVendor && drops.length === 0 && fishedIn.length === 0 && minedFrom.length === 0 && gatheredFrom.length === 0)) {
    primaryType = 'vendor';
    ctaIcon = '🪙';
    ctaText = `Click here to see which vendors sell this (${vendors.length || 'Trade'} Vendors)`;
    const topV = vendors.slice(0, 3).map(v => `${v.name}${v.zones?.[0] ? ` (${v.zones[0]})` : ''}`).join(', ');
    summary = topV ? `Sold by Trade & Supply Vendors: ${topV}.` : 'Purchased from Trade Supplies, Cooking, or General Goods vendors in major cities and towns.';
    wowheadTab = 'sold-by';
  } else if (craftedBy.length > 0 && drops.length === 0) {
    primaryType = 'crafted';
    ctaIcon = '🔨';
    ctaText = `Click here to see how to craft this in ${craftedBy[0].profName}`;
    summary = `Crafted by ${craftedBy.map(c => `${c.profName} (Skill ${c.learn})`).join(', ')}.`;
    wowheadTab = 'created-by-spell';
  } else if (disenchant && drops.length === 0) {
    primaryType = 'disenchant';
    ctaIcon = '✨';
    ctaText = `Click here to see what gear to disenchant (iLvl ${disenchant.minIlvl}–${disenchant.maxIlvl})`;
    summary = `Disenchanted from Uncommon/Rare equipment (Item Level ${disenchant.minIlvl}–${disenchant.maxIlvl}) or salvaged at an Arcane Salvager.`;
    wowheadTab = 'disenchanted-from';
  } else if (drops.length > 0) {
    primaryType = 'mob_drop';
    const isMeat = /\b(meat|flanks?|ribs?|flesh|wings?|liver|snouts?|intestines?|tenderloin|eggs?|chuck|steaks?|crawlers?|clams?|dig rat|tails?|legs?)\b/i.test(cleanLower);
    const isDropFish = isFish;
    ctaIcon = isDropFish ? '🐟' : (isMeat ? '🍖' : '⚔️');
    const mobCount = scraped.totalDropMobs || drops.length;
    ctaText = isDropFish
      ? `Click here to see which mobs drop this fish (${mobCount} Mobs)`
      : (isMeat
        ? `Click here to see which mobs drop this meat (${mobCount} Mobs)`
        : `Click here to see which mobs drop this (${mobCount} Mobs)`);
    const topMobs = drops.slice(0, 3).map(d => `${d.name}${d.pct ? ` (${d.pct}%)` : ''}${d.zones?.[0] ? ` in ${d.zones[0]}` : ''}`).join(', ');
    summary = `Dropped by ${topMobs}.`;
    wowheadTab = 'dropped-by';
  } else if (containedIn.length > 0) {
    primaryType = 'contained';
    ctaIcon = '🐚';
    ctaText = `Click here to see which containers/clams hold this`;
    const topC = containedIn.slice(0, 3).map(c => `${c.name}${c.pct ? ` (${c.pct}%)` : ''}`).join(', ');
    summary = `Looted inside ${topC}.`;
    wowheadTab = 'contained-in-item';
  } else if (fishedIn.length > 0) {
    primaryType = 'fished';
    ctaIcon = '🎣';
    ctaText = `Click here to see where to fish this (${fishedIn.length} Waters)`;
    const topZ = fishedIn.slice(0, 3).map(f => `${f.zone}${f.pct ? ` (${f.pct}%)` : ''}`).join(', ');
    summary = `Fished from open waters in ${topZ}${vendors.length ? ` or bought from ${vendors.length} fishing vendors` : ''}.`;
    wowheadTab = 'fished-in';
  } else if (isMineral && minedFrom.length > 0) {
    primaryType = 'ore';
    ctaIcon = '⛏️';
    const veinName = minedFrom[0]?.name || 'Mining Veins';
    ctaText = `Click here to see where to mine ${veinName}`;
    summary = `Mined from ${veinName}.`;
    wowheadTab = 'mined-from-object';
  } else if (vendors.length > 0) {
    primaryType = 'vendor';
    ctaIcon = '🪙';
    ctaText = `Click here to see which vendors sell this (${vendors.length} Vendors)`;
    const topV = vendors.slice(0, 3).map(v => `${v.name}${v.zones?.[0] ? ` (${v.zones[0]})` : ''}`).join(', ');
    summary = `Sold by ${topV}.`;
    wowheadTab = 'sold-by';
  } else if (craftedBy.length > 0) {
    primaryType = 'crafted';
    ctaIcon = '🔨';
    ctaText = `Click here to see how to craft this in ${craftedBy[0].profName}`;
    summary = `Crafted by ${craftedBy.map(c => `${c.profName} (Skill ${c.learn})`).join(', ')}.`;
    wowheadTab = 'created-by-spell';
  }

  const CURATED_FALLBACKS = {
    15409: {
      primaryType: 'crafted',
      ctaIcon: '🧂',
      ctaText: 'Click here to see how to refine this (Salt Shaker)',
      summary: 'Created by Leatherworkers (Skill 250+) using a Salt Shaker on Deeprock Salt (3-day cooldown).'
    },
    17057: {
      primaryType: 'skinned',
      ctaIcon: '🔪',
      ctaText: 'Click here to see where to get Shiny Fish Scales',
      summary: 'Looted from coastal Murlocs, Makrura, and Threshadons or skinned from level 11–30 aquatic beasts.'
    },
    21024: {
      primaryType: 'mob_drop',
      ctaIcon: '🍖',
      ctaText: 'Click here to see which mobs drop this meat (Feralas)',
      summary: 'Dropped by Lord Lakmaeran and elite Chimaeroks on the Isle of Dread in Feralas.'
    },
    248815: {
      primaryType: 'ore',
      ctaIcon: '⛏️',
      ctaText: 'Click here to see where to mine Heavy Thorium Ore (Mining 275+)',
      summary: 'Mined from Rich Thorium Veins (Mining 275+) in Winterspring, Azshara, Un\'Goro Crater, and Eastern Plaguelands.'
    },
    248819: {
      primaryType: 'mob_drop',
      ctaIcon: '🔮',
      ctaText: 'Click here to see where to farm Fel Crystal',
      summary: 'Looted from high-level Demons and Satyrs in Felwood, Azshara, and Blasted Lands.'
    },
    248820: {
      primaryType: 'ore',
      ctaIcon: '⛏️',
      ctaText: 'Click here to see where to mine Torbernite (Mining 275+)',
      summary: 'Rare radioactive mineral mined from Rich Thorium Veins in high-level Azeroth zones.'
    },
    248821: {
      primaryType: 'herb',
      ctaIcon: '🌿',
      ctaText: 'Click here to see where to gather Demonsage (Herbalism 285+)',
      summary: 'Rare Forever herb gathered from corrupted flora in Felwood, Blasted Lands, and Mount Hyjal.'
    },
    248822: {
      primaryType: 'herb',
      ctaIcon: '🌿',
      ctaText: 'Click here to see where to gather Death Lotus (Herbalism 290+)',
      summary: 'Rare endgame lotus gathered alongside high-level herbs or grown via the Seed Hybridizer at camp.'
    },
    248823: {
      primaryType: 'herb',
      ctaIcon: '🌿',
      ctaText: 'Click here to see where to gather Marefoil (Herbalism 280+)',
      summary: 'High-level aquatic & coastal herb gathered in Azshara, Feralas, and Mount Hyjal.'
    },
    248824: {
      primaryType: 'skinned',
      ctaIcon: '🔪',
      ctaText: 'Click here to see where to skin Fel Hide (Skinning 250+)',
      summary: 'Skinned from corrupted beasts and felhounds in Felwood, Blasted Lands, and Azshara.'
    },
    248825: {
      primaryType: 'skinned',
      ctaIcon: '🔪',
      ctaText: 'Click here to see where to skin Fel Leather (Skinning 250+)',
      summary: 'Skinned from corrupted level 48–60 beasts in Felwood and Blasted Lands.'
    },
    249274: {
      primaryType: 'herb',
      ctaIcon: '🌿',
      ctaText: 'Click here to see where to gather Stranglevine (Herbalism 185+)',
      summary: 'Bonus rare vine gathered from mid-to-high level herb nodes (Goldthorn, Khadgar\'s Whisker, Sungrass).'
    },
    249424: {
      primaryType: 'herb',
      ctaIcon: '🌿',
      ctaText: 'Click here to see where to gather Rosecap (Herbalism 115+)',
      summary: 'Bonus rare mushroom gathered alongside mid-level herbs (Bruiseweed, Wild Steelbloom, Kingsblood, Liferoot).'
    },
    249426: {
      primaryType: 'ore',
      ctaIcon: '⛏️',
      ctaText: 'Click here to see where to mine Pitchblende (Mining 230+)',
      summary: 'Rare mineral byproduct mined from Truesilver Deposits and Small/Rich Thorium Veins.'
    },
    249429: {
      primaryType: 'skinned',
      ctaIcon: '🔪',
      ctaText: 'Click here to see where to skin Pristine Scale (Skinning 175+)',
      summary: 'Rare pristine scale skinned from level 35–55 scaled beasts, dragonkin, and basilisks.'
    },
    249796: {
      primaryType: 'herb',
      ctaIcon: '🫐',
      ctaText: 'Click here to see where to gather Hyjal Berries',
      summary: 'Foraged from berry bushes and wildlife in Mount Hyjal and Winterspring.'
    },
    251524: {
      primaryType: 'fished',
      ctaIcon: '🐟',
      ctaText: 'Click here to see where to fish Whimsyfin',
      summary: 'Fished from enchanted and coastal waters in Darkshore, Ashenvale, The Barrens, and Riverglades.'
    },
    255645: {
      primaryType: 'mob_drop',
      ctaIcon: '🕷️',
      ctaText: 'Click here to see which mobs drop Swollen Venom Sac',
      summary: 'Dropped by level 35–50 venomous spiders and scorpids in Dustwallow Marsh, Tanaris, and The Hinterlands.'
    },
    273125: {
      primaryType: 'mob_drop',
      ctaIcon: '💀',
      ctaText: 'Click here to see where Lich\'s Index Finger drops',
      summary: 'Master Camp Station reagent dropped by endgame Undead/Lich bosses (Scholomance & Stratholme).'
    },
    273127: {
      primaryType: 'mob_drop',
      ctaIcon: '⚙️',
      ctaText: 'Click here to see where Golem Heart drops',
      summary: 'Master Camp Station reagent dropped by endgame Golem bosses (Blackrock Depths).'
    },
    273128: {
      primaryType: 'mob_drop',
      ctaIcon: '✨',
      ctaText: 'Click here to see where Maker\'s Spark drops',
      summary: 'Master Camp Station reagent dropped by Titanic Watcher / Construct bosses (Uldaman & Shaper\'s Terrace).'
    },
    273129: {
      primaryType: 'mob_drop',
      ctaIcon: '💣',
      ctaText: 'Click here to see where Essence of Anarchy drops',
      summary: 'Master Camp Station reagent dropped by endgame Tinker & Goblin bosses.'
    },
    273130: {
      primaryType: 'mob_drop',
      ctaIcon: '🦴',
      ctaText: 'Click here to see where Undeath Engine drops',
      summary: 'Master Camp Station reagent dropped by endgame Abomination & Scourge bosses.'
    },
    273131: {
      primaryType: 'mob_drop',
      ctaIcon: '👻',
      ctaText: 'Click here to see where Bottled Screams drops',
      summary: 'Master Camp Station reagent dropped by Banshee and Spectral bosses in endgame dungeons.'
    },
    274030: {
      primaryType: 'mob_drop',
      ctaIcon: '🍃',
      ctaText: 'Click here to see where Malleable Essence of Nature drops',
      summary: 'Endgame crafting essence looted from Nature Elementals and Ancient Guardians.'
    },
    279952: {
      primaryType: 'crafted',
      ctaIcon: '⛺',
      ctaText: 'Click here to see how to build Molten Foundry (Mining 300)',
      summary: 'Skill 300 Mining Master Campfire Station required nearby to smelt endgame Azerothium and Legionite.'
    }
  };

  if (CURATED_FALLBACKS[id] && !drops.length && !vendors.length && !fishedIn.length && !skinnedFrom.length && !minedFrom.length && !gatheredFrom.length) {
    primaryType = CURATED_FALLBACKS[id].primaryType;
    ctaIcon = CURATED_FALLBACKS[id].ctaIcon;
    ctaText = CURATED_FALLBACKS[id].ctaText;
    summary = CURATED_FALLBACKS[id].summary;
  }

  const defaultTabs = {
    ore: 'mined-from-object',
    herb: 'gathered-from-object',
    fished: 'fished-in',
    skinned: 'skinned-from',
    vendor: 'sold-by',
    crafted: 'created-by-spell',
    disenchant: 'disenchanted-from',
    contained: 'contained-in-item',
    mob_drop: 'dropped-by'
  };
  if (!wowheadTab && defaultTabs[primaryType]) {
    wowheadTab = defaultTabs[primaryType];
  }

  finalSources[id] = {
    id,
    name: meta.name,
    primaryType,
    ctaIcon,
    ctaText,
    summary,
    isForeverNew: Boolean(scraped.isForeverNew || id > 25000),
    wowheadUrl: `https://www.wowhead.com/forever/item=${id}${wowheadTab ? '#' + wowheadTab : ''}`,
    drops: drops.length ? drops : undefined,
    totalDropMobs: scraped.totalDropMobs || (drops.length ? drops.length : undefined),
    vendors: vendors.length ? vendors : undefined,
    totalVendors: scraped.totalVendors || (vendors.length ? vendors.length : undefined),
    fishedIn: fishedIn.length ? fishedIn : undefined,
    skinnedFrom: skinnedFrom.length ? skinnedFrom : undefined,
    minedFrom: minedFrom.length ? minedFrom : undefined,
    gatheredFrom: gatheredFrom.length ? gatheredFrom : undefined,
    containedIn: containedIn.length ? containedIn : undefined,
    disenchant: disenchant || undefined,
    craftedBy: craftedBy.length ? craftedBy : undefined,
    herbNode: herbNode ? { name: herbNode.name, skill: herbNode.skill, zones: herbNode.zones } : undefined,
    miningNode: miningNode ? { name: miningNode.name, skill: miningNode.skill, zones: miningNode.zones } : undefined,
    topZones: topZones.length ? topZones : undefined
  };
}

fs.writeFileSync(REAGENT_SOURCES_JSON_PATH, JSON.stringify(finalSources, null, 2), 'utf8');
console.log(`[Compiler] Wrote ${Object.keys(finalSources).length} complete reagent sources to ${REAGENT_SOURCES_JSON_PATH}`);

// Write updated js/data/professions-data.js
const outJs = `/**
 * World of Warcraft: Forever - Complete Professions, Leveling & Trade Economy Dataset
 * Synchronized with ForeverChanges.pro, Wowhead (Env 16), and WoW Forever Tools consensus.
 */

window.WOW_REAGENT_SOURCES = ${JSON.stringify(finalSources, null, 2)};

window.WOW_PROFESSIONS_DATA = ${JSON.stringify(profData, null, 2)};
`;

fs.writeFileSync(PROFESSIONS_JS_PATH, outJs, 'utf8');
fs.writeFileSync(PROFESSIONS_JSON_PATH, JSON.stringify(profData, null, 2), 'utf8');
console.log(`[Compiler] Successfully updated ${PROFESSIONS_JS_PATH} and ${PROFESSIONS_JSON_PATH}`);
