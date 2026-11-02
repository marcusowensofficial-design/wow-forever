import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');

const PROFESSIONS_JSON = path.join(ROOT, 'data', 'forever_professions.json');
const PROFESSIONS_JS = path.join(ROOT, 'js', 'data', 'professions-data.js');

async function sync() {
  const profData = JSON.parse(fs.readFileSync(PROFESSIONS_JSON, 'utf8'));
  const bs = profData.blacksmithing;
  const existingRecipes = bs.recipes;

  console.log(`Current local blacksmithing recipes: ${existingRecipes.length}`);

  // Fetch full foreverdb blacksmithing.json
  const res = await fetch('https://foreverdb.net/data/professions/blacksmithing.json');
  const fdb = await res.json();
  console.log(`ForeverDB blacksmithing recipes: ${fdb.recipes.length}`);

  // Load fetched missing item metadata & extra reagents
  const fetchedMissing = JSON.parse(fs.readFileSync(path.join(ROOT, 'scripts', 'missing_bs_fetched.json'), 'utf8'));
  const extraReagents = JSON.parse(fs.readFileSync(path.join(ROOT, 'scripts', 'extra_reagents.json'), 'utf8'));
  const reagentSources = JSON.parse(fs.readFileSync(path.join(ROOT, 'data', 'forever_reagent_sources.json'), 'utf8'));

  // Build lookups
  const missingMap = new Map();
  fetchedMissing.forEach(m => {
    if (m.spellId) missingMap.set(m.spellId, m);
    if (m.itemId) missingMap.set(`item_${m.itemId}`, m);
  });

  const reagentMap = new Map();
  // 1. From forever_reagent_sources.json
  for (const [id, r] of Object.entries(reagentSources)) {
    reagentMap.set(parseInt(id, 10), { name: r.name, icon: r.icon, quality: r.quality || 1 });
  }
  // 2. From extra reagents
  for (const [id, r] of Object.entries(extraReagents)) {
    reagentMap.set(parseInt(id, 10), { name: r.name, icon: r.icon, quality: r.quality || 1 });
  }
  // 3. From existing recipes
  for (const p of Object.values(profData)) {
    for (const rec of (p.recipes || [])) {
      for (const rg of (rec.reagents || [])) {
        if (rg.id && !reagentMap.has(rg.id)) {
          reagentMap.set(rg.id, { name: rg.name, icon: rg.icon, quality: rg.quality || 1 });
        }
      }
    }
  }
  // 4. From fdb.items
  for (const [idStr, arr] of Object.entries(fdb.items || {})) {
    const id = parseInt(idStr, 10);
    if (!reagentMap.has(id) && Array.isArray(arr)) {
      reagentMap.set(id, { name: arr[0], icon: 'inv_misc_questionmark', quality: arr[2] || 1 });
    }
  }

  function getCat(name, slot, sub) {
    const n = (name || '').toLowerCase();
    const sl = (slot || '').toLowerCase();
    const sb = (sub || '').toLowerCase();

    if (n.includes('stone') || n.includes('weightstone') || n.includes('sharpening')) return 'Stones';
    if (n.includes('spike') || n.includes('chain') || n.includes('spurs')) return 'Attachments';
    if (n.includes('anvil') || n.includes('forge') || n.includes('sharpening wheel')) return 'Camp';
    if (n.includes('rod') || n.includes('key') || n.includes('plates') || n.includes('flux') || n.includes('certification')) return 'Other';

    if (sl === 'head' || n.includes('helmet') || n.includes('coif') || n.includes('braincage') || n.includes('visor') || n.includes('headcage')) return 'Head';
    if (sl === 'shoulder' || n.includes('spaulders') || n.includes('pauldrons') || n.includes('mantle') || n.includes('shoulder')) return 'Shoulder';
    if (sl === 'chest' || n.includes('chestplate') || n.includes('breastplate') || n.includes('cuirass') || n.includes('vest') || n.includes('battleplate') || n.includes('plate')) return 'Chest';
    if (sl === 'wrist' || n.includes('bracer') || n.includes('protectors') || n.includes('armguard')) return 'Wrist';
    if (sl === 'hands' || n.includes('gauntlets') || n.includes('gloves') || n.includes('grips')) return 'Hands';
    if (sl === 'waist' || n.includes('waistguard') || n.includes('belt') || n.includes('girdle')) return 'Waist';
    if (sl === 'legs' || n.includes('legplates') || n.includes('leggings') || n.includes('pants')) return 'Legs';
    if (sl === 'feet' || n.includes('boots') || n.includes('stompers') || n.includes('sabatons')) return 'Feet';
    if (sl === 'shield' || sb.includes('shield') || n.includes('shield') || n.includes('defender')) return 'Shield';

    if (sl === 'two-hand' || sb.includes('two-hand') || sb.includes('polearm') || n.includes('reaper') || n.includes('broadsword') || n.includes('destroyer') || n.includes('champion')) return 'Two-hand';
    if (sl === 'one-hand' || sl === 'main hand' || sb.includes('one-hand') || sb.includes('dagger') || n.includes('blade') || n.includes('edge') || n.includes('reaver') || n.includes('battlehammer') || n.includes('stormhammer') || n.includes('frostguard') || n.includes('heartseeker') || n.includes('tranquility') || n.includes('desecration')) return 'One-hand';

    return 'Other';
  }

  function getSourceString(src, plansName) {
    if (!src) return 'Trainer';
    if (src.auto) return 'Trainer';
    if (src.items && src.items.length > 0) {
      return plansName ? `Plans: ${plansName.replace(/^Plans:\s*/i, '')}` : 'Plans';
    }
    if (src.vendors) return 'Vendor';
    if (src.drop) return 'World Drop';
    if (src.quests) return 'Quest';
    return 'Trainer';
  }

  // Create lookup of local recipes by spellId, makeId, and name
  const existingBySpell = new Map();
  const existingByMake = new Map();
  existingRecipes.forEach(r => {
    if (r.spellId) existingBySpell.set(r.spellId, r);
    if (r.id) existingByMake.set(r.id, r);
  });

  const finalRecipes = [];
  const addedSpells = new Set();

  // Process all 506 recipes from ForeverDB in order
  for (const fr of fdb.recipes) {
    const spellId = fr.s;
    const makeId = fr.make ? fr.make[0] : null;

    // Check if we already have this exact spell or makeId in local
    let existing = null;
    if (spellId && existingBySpell.has(spellId)) {
      existing = existingBySpell.get(spellId);
    } else if (makeId && existingByMake.has(makeId)) {
      existing = existingByMake.get(makeId);
    }

    if (existing) {
      finalRecipes.push(existing);
      addedSpells.add(existing.spellId || existing.id);
    } else {
      // It's one of the missing recipes! Build it cleanly
      const meta = (spellId && missingMap.get(spellId)) || (makeId && missingMap.get(`item_${makeId}`)) || {};
      const cat = getCat(fr.n, meta.slot, meta.subclass);
      const icon = meta.icon || 'inv_misc_questionmark';
      const quality = meta.quality || fr.q || 1;

      const learn = fr.req || (fr.rl ? Math.max(1, (fr.rl - 5) * 5) : 1);
      const yellow = fr.y || (learn + 15);
      const green = fr.g || (yellow + 20);
      const grey = green + 20;

      const reagents = (fr.r || []).map(([rid, cnt]) => {
        const rgInfo = reagentMap.get(rid) || {};
        return {
          id: rid,
          count: cnt,
          name: rgInfo.name || `Item #${rid}`,
          icon: rgInfo.icon || 'inv_misc_questionmark',
          quality: rgInfo.quality || 1
        };
      });

      const newRecipe = {
        id: makeId,
        spellId: fr.s,
        name: fr.n,
        icon,
        quality,
        cat,
        kind: meta.subclass || 'Blacksmithing',
        effect: `Crafted ${fr.n}`,
        isNew: fr.new === 1 || fr.s > 100000,
        learn,
        yellow,
        green,
        grey,
        reagents,
        source: getSourceString(fr.src, fr.n)
      };

      finalRecipes.push(newRecipe);
      addedSpells.add(newRecipe.spellId || newRecipe.id);
    }
  }

  // Preserve any local recipes that weren't in ForeverDB (e.g. Blacksmithing Certification)
  for (const er of existingRecipes) {
    const key = er.spellId || er.id;
    if (!addedSpells.has(key)) {
      finalRecipes.push(er);
      addedSpells.add(key);
    }
  }

  console.log(`Total final synchronized recipes: ${finalRecipes.length}`);

  // Recalculate group counts
  const catCounts = {};
  finalRecipes.forEach(r => {
    catCounts[r.cat] = (catCounts[r.cat] || 0) + 1;
  });

  const updatedGroups = bs.groups.map(g => ({
    ...g,
    count: catCounts[g.key] || 0
  }));

  // Update blacksmithing section
  profData.blacksmithing = {
    ...bs,
    stats: {
      ...bs.stats,
      recipeCount: finalRecipes.length,
      newInForever: finalRecipes.filter(r => r.isNew).length
    },
    groups: updatedGroups,
    recipes: finalRecipes
  };

  // Write updated forever_professions.json
  fs.writeFileSync(PROFESSIONS_JSON, JSON.stringify(profData, null, 2), 'utf8');
  console.log(`Wrote ${PROFESSIONS_JSON} with ${finalRecipes.length} recipes.`);

  // Synchronize js/data/professions-data.js
  const profJsContent = fs.readFileSync(PROFESSIONS_JS, 'utf8');
  const profDataMarker = 'window.WOW_PROFESSIONS_DATA =';
  const idx = profJsContent.indexOf(profDataMarker);
  if (idx === -1) {
    throw new Error('Could not find window.WOW_PROFESSIONS_DATA in professions-data.js');
  }

  const prefix = profJsContent.slice(0, idx);
  const updatedJsFile = `${prefix}window.WOW_PROFESSIONS_DATA = ${JSON.stringify(profData, null, 2)};\n`;
  fs.writeFileSync(PROFESSIONS_JS, updatedJsFile, 'utf8');
  console.log(`Wrote ${PROFESSIONS_JS} successfully synchronized.`);
}

sync().catch(console.error);
