import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');

const PROFESSIONS_JSON = path.join(ROOT, 'data', 'forever_professions.json');
const PROFESSIONS_JS = path.join(ROOT, 'js', 'data', 'professions-data.js');

// Cache for Wowhead item/spell XML lookups
const xmlCache = new Map();

async function fetchWowheadMeta(type, id) {
  const key = `${type}_${id}`;
  if (xmlCache.has(key)) return xmlCache.get(key);

  try {
    const res = await fetch(`https://www.wowhead.com/classic/${type}=${id}&xml`);
    if (!res.ok) return null;
    const xml = await res.text();

    const nameMatch = xml.match(/<name><!\[CDATA\[(.*?)\]\]><\/name>/);
    const iconMatch = xml.match(/<icon[^>]*>([^<]+)<\/icon>/);
    const qualMatch = xml.match(/<quality id="([0-9]+)"/);
    const slotMatch = xml.match(/<inventorySlot id="([0-9]+)">([^<]+)<\/inventorySlot>/);
    const subMatch = xml.match(/<subclass id="([0-9]+)">([^<]+)<\/subclass>/);

    const meta = {
      name: nameMatch ? nameMatch[1] : null,
      icon: iconMatch ? iconMatch[1].toLowerCase().trim() : null,
      quality: qualMatch ? parseInt(qualMatch[1], 10) : 1,
      slot: slotMatch ? slotMatch[2].toLowerCase().trim() : null,
      subclass: subMatch ? subMatch[2].trim() : null
    };
    xmlCache.set(key, meta);
    return meta;
  } catch (e) {
    return null;
  }
}

// Category helpers
function categorize(slug, name, slot, subclass, fdbGroup) {
  const n = (name || '').toLowerCase();
  const sl = (slot || '').toLowerCase();
  const sb = (subclass || '').toLowerCase();

  if (slug === 'leatherworking') {
    if (n.includes('armor kit') || n.includes('armor-kit')) return 'Kits';
    if (n.includes('bag') || n.includes('pack') || n.includes('quiver') || n.includes('ammo pouch')) return 'Bags';
    if (n.includes('cured') || n.includes('hide') || n.includes('leather') && (n.includes('light leather') || n.includes('medium leather') || n.includes('heavy leather') || n.includes('thick leather') || n.includes('rugged leather'))) return 'Leather';
    if (n.includes('tanning rack') || n.includes('camp')) return 'Camp';

    if (sl === 'head' || n.includes('cap') || n.includes('helm') || n.includes('headband') || n.includes('coif')) return 'Head';
    if (sl === 'shoulder' || n.includes('spaulders') || n.includes('shoulders') || n.includes('mantle') || n.includes('epaulets')) return 'Shoulder';
    if (sl === 'back' || sl === 'cloak' || n.includes('cloak') || n.includes('cape')) return 'Back';
    if (sl === 'chest' || n.includes('tunic') || n.includes('vest') || n.includes('armor') || n.includes('jerkin') || n.includes('chest') || n.includes('harness') || n.includes('jacket')) return 'Chest';
    if (sl === 'wrist' || n.includes('bracers') || n.includes('bindings') || n.includes('wrist') || n.includes('armguards')) return 'Wrist';
    if (sl === 'hands' || n.includes('gloves') || n.includes('gauntlets') || n.includes('grips') || n.includes('mitts')) return 'Hands';
    if (sl === 'waist' || n.includes('belt') || n.includes('girdle') || n.includes('sash') || n.includes('waist')) return 'Waist';
    if (sl === 'legs' || n.includes('pants') || n.includes('leggings') || n.includes('breeches') || n.includes('kilt')) return 'Legs';
    if (sl === 'feet' || n.includes('boots') || n.includes('shoes') || n.includes('footwraps') || n.includes('sandals')) return 'Feet';

    return 'Other';
  }

  if (slug === 'tailoring') {
    if (n.includes('bolt of') || n.includes('cloth') && (n.includes('linen') || n.includes('wool') || n.includes('silk') || n.includes('mageweave') || n.includes('runecloth'))) return 'Cloth';
    if (n.includes('bag') || n.includes('pouch') || n.includes('pack')) return 'Bags';
    if (n.includes('shirt') || n.includes('robe') && (n.includes('simple') || n.includes('white') || n.includes('dress') || n.includes('tuxedo') || n.includes('suit'))) return 'Shirts';
    if (n.includes('spinning wheel') || n.includes('camp')) return 'Camp';

    if (sl === 'head' || n.includes('hood') || n.includes('hat') || n.includes('cap') || n.includes('headband') || n.includes('cowl') || n.includes('turban')) return 'Head';
    if (sl === 'shoulder' || n.includes('shoulders') || n.includes('mantle') || n.includes('spaulders') || n.includes('epaulets')) return 'Shoulder';
    if (sl === 'back' || sl === 'cloak' || n.includes('cloak') || n.includes('cape')) return 'Back';
    if (sl === 'chest' || n.includes('robe') || n.includes('vest') || n.includes('tunic') || n.includes('chest') || n.includes('jacket') || n.includes('raiment')) return 'Chest';
    if (sl === 'wrist' || n.includes('bracers') || n.includes('cuffs') || n.includes('wristbands')) return 'Wrist';
    if (sl === 'hands' || n.includes('gloves') || n.includes('mitts') || n.includes('handwraps')) return 'Hands';
    if (sl === 'waist' || n.includes('belt') || n.includes('sash') || n.includes('cord') || n.includes('girdle')) return 'Waist';
    if (sl === 'legs' || n.includes('pants') || n.includes('leggings') || n.includes('breeches') || n.includes('trousers') || n.includes('kilt')) return 'Legs';
    if (sl === 'feet' || n.includes('boots') || n.includes('shoes') || n.includes('sandals') || n.includes('slippers')) return 'Feet';

    return 'Other';
  }

  if (slug === 'enchanting') {
    if (n.includes('rod')) return 'Rods';
    if (n.includes('oil')) return 'Oils';
    if (n.includes('wand') || n.includes('staff')) return 'Wands & Staves';
    if (n.includes('relic') || n.includes('libram') || n.includes('totem') || n.includes('idol') || n.includes('sigil')) return 'Relics';
    if (n.includes('certification') || n.includes('camp')) return 'Camp';

    if (n.includes('bracer')) return 'Bracer';
    if (n.includes('chest')) return 'Chest';
    if (n.includes('cloak')) return 'Cloak';
    if (n.includes('2h') || n.includes('two-hand')) return '2H Weapon';
    if (n.includes('weapon')) return 'Weapon';
    if (n.includes('shield')) return 'Shield';
    if (n.includes('boots') || n.includes('feet')) return 'Boots';
    if (n.includes('gloves')) return 'Gloves';
    if (n.includes('necklace') || n.includes('amulet')) return 'Necklace';
    if (n.includes('off-hand')) return 'Off-Hand';

    return 'Bracer';
  }

  if (slug === 'engineering') {
    if (n.includes('bomb') || n.includes('dynamite') || n.includes('charge') || n.includes('grenade') || n.includes('explosive')) return 'Explosives';
    if (n.includes('goggles') || n.includes('helm') || n.includes('visor') || n.includes('lenses') || sl === 'head') return 'Head';
    if (n.includes('rifle') || n.includes('gun') || n.includes('blaster') || n.includes('shotgun') || n.includes('scope')) return 'Guns';
    if (n.includes('bullet') || n.includes('shot') || n.includes('shell') || n.includes('arrow') || n.includes('pellet')) return 'Ammo';
    if (n.includes('firework') || n.includes('flare') || n.includes('rocket cluster') || n.includes('sparkler')) return 'Fireworks';
    if (n.includes('pet') || n.includes('mechanical') && (n.includes('squirrel') || n.includes('chicken') || n.includes('toad') || n.includes('dragonling') || n.includes('yeti'))) return 'Pets';
    if (n.includes('gear') || n.includes('boots') || n.includes('belt') || n.includes('cloak') || n.includes('parachute') || n.includes('net') || sl === 'feet' || sl === 'waist') return 'Gear';
    if (n.includes('tube') || n.includes('casing') || n.includes('trigger') || n.includes('blasting powder') || n.includes('unstable trigger') || n.includes('gyrochronatom') || n.includes('whirring bronze gizmo') || n.includes('copper mod') || n.includes('flux') || n.includes('parts')) return 'Parts';
    if (n.includes('camp') || n.includes('anvil') || n.includes('workbench')) return 'Camp';

    return 'Devices';
  }

  if (slug === 'alchemy') {
    if (n.includes('flask')) return 'Flasks';
    if (n.includes('transmute')) return 'Transmutes';
    if (n.includes('oil')) return 'Oils';
    if (n.includes('elixir')) return 'Elixirs';
    if (n.includes('camp') || n.includes('cauldron')) return 'Camp';
    return 'Potions';
  }

  if (slug === 'cooking') {
    if (n.includes('camp') || n.includes('spit') || n.includes('fire')) return 'Camp';
    if (n.includes('herb') || n.includes('tea') || n.includes('juice') || n.includes('intellect') || n.includes('mana') || n.includes('sagefish') || n.includes('spell')) return 'Caster';
    if (n.includes('strength') || n.includes('attack power') || n.includes('wolf') || n.includes('bear') || n.includes('lion') || n.includes('tiger') || n.includes('boar')) return 'Strength';
    if (n.includes('agility') || n.includes('cat') || n.includes('fish') || n.includes('deviate') || n.includes('squid')) return 'Agility';
    if (n.includes('spirit') || n.includes('stamina') && n.includes('spirit')) return 'Spirit';
    if (n.includes('stamina') || n.includes('crab') || n.includes('turtle') || n.includes('crocolisk') || n.includes('sausage') || n.includes('roast')) return 'Stamina';
    if (n.includes('breath') || n.includes('size') || n.includes('speed') || n.includes('giant') || n.includes('noggenfogger')) return 'Other buffs';
    return 'Plain';
  }

  if (slug === 'first-aid') {
    if (n.includes('camp')) return 'Camp';
    if (n.includes('anti-venom') || n.includes('venom') || n.includes('poison')) return 'Potions';
    return 'Bandages';
  }

  if (slug === 'mining') {
    if (n.includes('camp') || n.includes('furnace')) return 'Camping';
    return 'Smelting';
  }

  return 'Other';
}

function getSourceString(src, itemName) {
  if (!src) return 'Trainer';
  if (src.auto) return 'Trainer';
  if (src.items && src.items.length > 0) {
    return itemName ? `Pattern: ${itemName.replace(/^(Pattern|Recipe|Schematic|Formula|Plans):\s*/i, '')}` : 'Pattern';
  }
  if (src.vendors) return 'Vendor';
  if (src.drop) return 'World Drop';
  if (src.quests) return 'Quest';
  return 'Trainer';
}

async function run() {
  const profData = JSON.parse(fs.readFileSync(PROFESSIONS_JSON, 'utf8'));
  const reagentSources = JSON.parse(fs.readFileSync(path.join(ROOT, 'data', 'forever_reagent_sources.json'), 'utf8'));

  // Build universal reagent cache
  const reagentMap = new Map();
  for (const [id, r] of Object.entries(reagentSources)) {
    reagentMap.set(parseInt(id, 10), { name: r.name, icon: r.icon, quality: r.quality || 1 });
  }

  // Pre-populate with existing recipe reagents
  for (const p of Object.values(profData)) {
    for (const rec of (p.recipes || [])) {
      for (const rg of (rec.reagents || [])) {
        if (rg.id && !reagentMap.has(rg.id)) {
          reagentMap.set(rg.id, { name: rg.name, icon: rg.icon, quality: rg.quality || 1 });
        }
      }
    }
  }

  const profSlugs = [
    'engineering'
  ];

  let totalAddedAcrossAll = 0;

  for (const slug of profSlugs) {
    console.log(`\n================ Processing ${slug.toUpperCase()} ================`);
    const profObj = profData[slug];
    if (!profObj) {
      console.warn(`Skipping missing profession ${slug}`);
      continue;
    }

    const res = await fetch(`https://foreverdb.net/data/professions/${slug}.json`);
    if (!res.ok) {
      console.warn(`Failed to fetch FDB for ${slug}: ${res.status}`);
      continue;
    }
    const fdb = await res.json();

    // Populate reagent map from fdb.items
    for (const [idStr, arr] of Object.entries(fdb.items || {})) {
      const id = parseInt(idStr, 10);
      if (!reagentMap.has(id) && Array.isArray(arr)) {
        reagentMap.set(id, { name: arr[0], icon: 'inv_misc_questionmark', quality: arr[2] || 1 });
      }
    }

    const existingRecipes = profObj.recipes || [];
    const existingBySpell = new Map();
    const existingByMake = new Map();
    const existingByName = new Map();

    existingRecipes.forEach(r => {
      if (r.spellId) existingBySpell.set(r.spellId, r);
      if (r.id) existingByMake.set(r.id, r);
      if (r.name) existingByName.set(r.name.toLowerCase().trim(), r);
    });

    const finalRecipes = [];
    const addedKeys = new Set();
    let newInProf = 0;

    for (const fr of fdb.recipes) {
      const spellId = fr.s;
      const makeId = fr.make ? fr.make[0] : null;
      const nameKey = (fr.n || '').toLowerCase().trim();

      let existing = null;
      if (spellId && existingBySpell.has(spellId)) {
        existing = existingBySpell.get(spellId);
      } else if (makeId && existingByMake.has(makeId)) {
        existing = existingByMake.get(makeId);
      } else if (nameKey && existingByName.has(nameKey)) {
        existing = existingByName.get(nameKey);
      }

      if (existing) {
        finalRecipes.push(existing);
        addedKeys.add(existing.spellId || existing.id || existing.name);
      } else {
        // Fetch metadata
        let meta = null;
        if (makeId) {
          meta = await fetchWowheadMeta('item', makeId);
        }
        if (!meta && spellId) {
          meta = await fetchWowheadMeta('spell', spellId);
        }

        const name = fr.n || meta?.name || `Craft #${spellId || makeId}`;
        const slot = meta?.slot || '';
        const subclass = meta?.subclass || '';
        const cat = categorize(slug, name, slot, subclass, null);
        const icon = meta?.icon || (fr.ic ? String(fr.ic) : 'inv_misc_questionmark');
        const quality = meta?.quality || fr.q || 1;

        const learn = fr.req || (fr.rl ? Math.max(1, (fr.rl - 5) * 5) : 1);
        const yellow = fr.y || (learn + 15);
        const green = fr.g || (yellow + 20);
        const grey = green + 20;

        // Resolve reagents
        const reagents = [];
        for (const [rid, cnt] of (fr.r || [])) {
          let rg = reagentMap.get(rid);
          if (!rg || rg.icon === 'inv_misc_questionmark') {
            const rMeta = await fetchWowheadMeta('item', rid);
            if (rMeta) {
              rg = { name: rMeta.name || rg?.name || `Item #${rid}`, icon: rMeta.icon || 'inv_misc_questionmark', quality: rMeta.quality || 1 };
              reagentMap.set(rid, rg);
            }
          }
          reagents.push({
            id: rid,
            count: cnt,
            name: rg?.name || `Item #${rid}`,
            icon: rg?.icon || 'inv_misc_questionmark',
            quality: rg?.quality || 1
          });
        }

        const newRec = {
          id: makeId,
          spellId: fr.s,
          name,
          icon,
          quality,
          cat,
          kind: subclass || slug.charAt(0).toUpperCase() + slug.slice(1),
          effect: `Crafted ${name}`,
          isNew: fr.new === 1 || (fr.s && fr.s > 100000),
          learn,
          yellow,
          green,
          grey,
          reagents,
          source: getSourceString(fr.src, name)
        };

        finalRecipes.push(newRec);
        addedKeys.add(newRec.spellId || newRec.id || newRec.name);
        newInProf++;
      }
    }

    // Preserve any existing recipes that weren't in ForeverDB (e.g. camping kits, special certs)
    for (const er of existingRecipes) {
      const key = er.spellId || er.id || er.name;
      if (!addedKeys.has(key)) {
        finalRecipes.push(er);
        addedKeys.add(key);
      }
    }

    console.log(`${slug}: started with ${existingRecipes.length}, added ${newInProf} new recipes. Total now: ${finalRecipes.length}`);
    totalAddedAcrossAll += newInProf;

    // Recalculate group counts
    const catCounts = {};
    finalRecipes.forEach(r => {
      catCounts[r.cat] = (catCounts[r.cat] || 0) + 1;
    });

    const validGroupKeys = new Set(profObj.groups.map(g => g.key));
    // Verify all recipes have a valid group
    finalRecipes.forEach(r => {
      if (!validGroupKeys.has(r.cat)) {
        console.warn(`Recipe "${r.name}" has invalid group "${r.cat}" in ${slug}. Falling back to "${profObj.groups[0].key}"`);
        r.cat = profObj.groups[0].key;
        catCounts[r.cat] = (catCounts[r.cat] || 0) + 1;
      }
    });

    const updatedGroups = profObj.groups.map(g => ({
      ...g,
      count: catCounts[g.key] || 0
    }));

    profData[slug] = {
      ...profObj,
      stats: {
        ...profObj.stats,
        recipeCount: finalRecipes.length,
        newInForever: finalRecipes.filter(r => r.isNew).length
      },
      groups: updatedGroups,
      recipes: finalRecipes
    };
  }

  console.log(`\n================ Finished Syncing All Professions ================\nTotal recipes added: ${totalAddedAcrossAll}`);

  // Write updated data/forever_professions.json
  fs.writeFileSync(PROFESSIONS_JSON, JSON.stringify(profData, null, 2), 'utf8');
  console.log(`Saved updated ${PROFESSIONS_JSON}`);

  // Write updated js/data/professions-data.js
  const profJsContent = fs.readFileSync(PROFESSIONS_JS, 'utf8');
  const profDataMarker = 'window.WOW_PROFESSIONS_DATA =';
  const idx = profJsContent.indexOf(profDataMarker);
  if (idx === -1) {
    throw new Error('Could not find window.WOW_PROFESSIONS_DATA in professions-data.js');
  }

  const prefix = profJsContent.slice(0, idx);
  const updatedJsFile = `${prefix}window.WOW_PROFESSIONS_DATA = ${JSON.stringify(profData, null, 2)};\n`;
  fs.writeFileSync(PROFESSIONS_JS, updatedJsFile, 'utf8');
  console.log(`Saved synchronized ${PROFESSIONS_JS}`);
}

run().catch(console.error);
