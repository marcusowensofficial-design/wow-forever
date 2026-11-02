/**
 * World of Warcraft: Forever - Professions Core Utilities & Icon Helpers
 */
(function () {
  "use strict";

  const CDN_BASE = 'https://wow.zamimg.com/images/wow/icons/medium/';

  function getPlaceholderIcon(name = '', source = '') {
    const n = (name || '').toLowerCase();
    const s = (source || '').toLowerCase();
    if (n.includes('star wood')) return 'inv_tradeskillitem_03';
    if (n.includes('wood') || n.includes('log') || n.includes('lumber') || n.includes('timber')) return 'inv_tradeskillitem_01';
    if (n.includes('thread') || n.includes('string') || n.includes('cord') || n.includes('twine') || n.includes('yarn') || n.includes('spool') || n.includes('fiber')) return 'inv_fabric_linen_03';
    if (n.includes('cloth') || n.includes('linen') || n.includes('fabric')) return 'inv_fabric_linen_01';
    if (n.includes('leather') || n.includes('hide') || n.includes('pelt') || n.includes('fur')) return 'inv_misc_leatherscrap_01';
    if (n.includes('tin bar')) return 'inv_ingot_05';
    if (n.includes('bar') || n.includes('ingot')) return 'inv_ingot_01';
    if (n.includes('ore') || n.includes('nugget')) return 'inv_ore_copper_01';
    if (n.includes('stone') || n.includes('rock')) return 'inv_stone_01';
    if (n.includes('herb') || n.includes('leaf') || n.includes('blossom') || n.includes('weed') || n.includes('root') || n.includes('kelp')) return 'inv_misc_herb_01';
    if (n.includes('potion') || n.includes('elixir') || n.includes('flask') || n.includes('vial')) return 'inv_potion_51';
    if (n.includes('dust') || n.includes('powder') || n.includes('sand')) return 'inv_misc_dust_01';
    if (n.includes('meat') || n.includes('flank') || n.includes('rib') || n.includes('steak') || n.includes('flesh')) return 'inv_misc_food_14';
    if (n.includes('fish') || n.includes('salmon') || n.includes('trout') || n.includes('snapper') || n.includes('eel')) return 'inv_misc_fish_02';
    if (n.includes('gem') || n.includes('ruby') || n.includes('sapphire') || n.includes('diamond') || n.includes('emerald') || n.includes('pearl')) return 'inv_misc_gem_ruby_01';
    if (n.includes('flint') || n.includes('tinder')) return 'inv_stone_11';
    if (n.includes('water') || n.includes('drink')) return 'inv_drink_01';
    if (n.includes('enchant') || n.includes('formula') || (window.WOW_PROFESSIONS && window.WOW_PROFESSIONS.getCurrentProfession && window.WOW_PROFESSIONS.getCurrentProfession() === 'enchanting')) {
      if (s.includes('drop') || s.includes('formula') || s.includes('vendor') || s.includes('merchant') || s.includes('favor') || n.includes('formula')) {
        return 'inv_scroll_03';
      }
      return 'inv_scroll_04';
    }
    return null;
  }

  function getIconUrl(icon, name = '', source = '') {
    let cleanIcon = (icon || '').trim();
    if (cleanIcon === 'inv_wood_01' || cleanIcon === 'inv_wood_03') cleanIcon = 'inv_tradeskillitem_01';
    else if (cleanIcon === 'inv_wood_02') cleanIcon = 'inv_tradeskillitem_03';
    else if (cleanIcon === 'inv_misc_string_01') cleanIcon = 'inv_fabric_linen_03';
    else if (cleanIcon === 'inv_ingot_tin') cleanIcon = 'inv_ingot_05';

    if (!cleanIcon || cleanIcon === 'inv_misc_questionmark' || cleanIcon.includes('inv_misc_questionmark')) {
      const placeholder = getPlaceholderIcon(name, source);
      if (placeholder) return `${CDN_BASE}${placeholder}.jpg`;
      return `${CDN_BASE}inv_misc_questionmark.jpg`;
    }
    if (cleanIcon.startsWith('http://') || cleanIcon.startsWith('https://')) return cleanIcon;
    const clean = cleanIcon.replace(/\.(jpg|png|webp)$/i, '');
    return `${CDN_BASE}${clean}.jpg`;
  }

  const escapeHtml = window.escapeHtml;

  function getProfessionPassive(nameOrSlug) {
    if (!nameOrSlug) return null;
    const clean = String(nameOrSlug).toLowerCase().replace(/[^a-z0-9]/g, '');
    const list = (window.WOW_FOREVER_DATA && window.WOW_FOREVER_DATA.professionPassives) || [];
    return list.find(p => {
      const pClean = p.name.toLowerCase().replace(/[^a-z0-9]/g, '');
      return pClean === clean;
    }) || null;
  }

  function getSkillClass(recipe, skill) {
    if (skill === null || skill === undefined || isNaN(skill)) {
      return 'skill-orange';
    }
    const s = Number(skill);
    if (s < recipe.learn) return 'skill-grey';
    if (s < recipe.yellow) return 'skill-orange';
    if (s < recipe.green) return 'skill-yellow';
    if (s < recipe.grey) return 'skill-green';
    return 'skill-grey';
  }

  /* ==========================================================================
     EXTENDED SUITE: DATASETS & UTILITIES (BIS, TOMTOM, SPECS, CONTAINERS, CIRCUITS)
     ========================================================================== */
  let cachedBisMap = null;
  function buildBiSLookupMap() {
    if (cachedBisMap) return cachedBisMap;
    const map = new Map();
    const bisData = window.WOW_BIS_DATA || (typeof WOW_BIS_DATA !== 'undefined' ? WOW_BIS_DATA : null);
    if (!bisData || !bisData.classes) return map;

    for (const cls of bisData.classes) {
      const cData = bisData[cls.id];
      if (!cData) continue;
      for (const sp of cData.specs || []) {
        for (const slot of Object.keys(sp.gear || {})) {
          const list = Array.isArray(sp.gear[slot]) ? sp.gear[slot] : [sp.gear[slot]];
          for (const it of list) {
            if (!it || !it.name) continue;
            const key = it.name.toLowerCase().trim();
            if (!map.has(key)) {
              map.set(key, {
                name: it.name,
                classId: cls.id,
                className: cls.name,
                specId: sp.id,
                specName: sp.name,
                slot: slot,
                phase: it.phase || 'Phase 2',
                type: 'gear'
              });
            }
          }
        }
        for (const enc of sp.enchants || []) {
          if (!enc.source) continue;
          const m = enc.source.match(/^(?:Enchant\s+[^(\d]+|[\w\s'’-]+Armor Kit|[\w\s'’-]+Weightstone|[\w\s'’-]+Sharpening Stone)/i);
          const encName = m ? m[0].trim().toLowerCase() : '';
          if (encName && !map.has(encName)) {
            map.set(encName, {
              name: m[0].trim(),
              classId: cls.id,
              className: cls.name,
              specId: sp.id,
              specName: sp.name,
              type: 'enchant'
            });
          }
        }
        for (const con of sp.consumables || []) {
          if (!con || !con.name) continue;
          const key = con.name.toLowerCase().trim();
          if (!map.has(key)) {
            map.set(key, {
              name: con.name,
              classId: cls.id,
              className: cls.name,
              specId: sp.id,
              specName: sp.name,
              type: 'consumable'
            });
          }
        }
      }
    }
    cachedBisMap = map;
    return map;
  }

  function getBiSInfo(recipeName) {
    if (!recipeName) return null;
    const map = buildBiSLookupMap();
    return map.get(recipeName.toLowerCase().trim()) || null;
  }

  function isDungeonRecipe(r) {
    if (!r) return false;
    const s = (r.source || '').toLowerCase();
    const n = (r.name || '').toLowerCase();
    if (s.includes('dungeon') || s.includes('instance') || s.includes('boss')) return true;
    const dungeonKeywords = [
      'deadmines', 'shadowfang', 'wailing caverns', 'blackfathom', 'stockade',
      'gnomeregan', 'razorfen', 'scarlet monastery', 'graveyard', 'library', 'armory',
      'cathedral', 'uldaman', 'zul\'farrak', 'maraudon', 'sunken temple', 'atal\'hakkar',
      'blackrock depths', 'brd', 'lbrs', 'ubrs', 'stratholme', 'scholomance', 'dire maul',
      'city of dalaran', 'excavation site', 'ruins of lordaeron', 'hall of thanes',
      'molten core', 'onyxia', 'blackwing', 'zul\'gurub', 'ahn\'qiraj', 'naxxramas'
    ];
    return dungeonKeywords.some(d => s.includes(d) || n.includes(d));
  }

  function isBlueprintRecipe(r) {
    if (!r) return false;
    const s = (r.source || '').toLowerCase();
    const n = (r.name || '').toLowerCase();
    return n.startsWith('blueprint:') || s.includes('blueprint:') || s.includes('campfire station') || s.includes('camp blueprint');
  }

  function isDisenchantMaterial(name) {
    if (!name) return false;
    const n = name.toLowerCase().trim();
    const exact = [
      'strange dust', 'soul dust', 'vision dust', 'dream dust', 'illusion dust',
      'lesser magic essence', 'greater magic essence',
      'lesser astral essence', 'greater astral essence',
      'lesser mystic essence', 'greater mystic essence',
      'lesser nether essence', 'greater nether essence',
      'lesser eternal essence', 'greater eternal essence',
      'small glimmering shard', 'large glimmering shard',
      'small glowing shard', 'large glowing shard',
      'small radiant shard', 'large radiant shard',
      'small brilliant shard', 'large brilliant shard',
      'nexus crystal'
    ];
    return exact.includes(n) || n.endsWith(' dust') || n.endsWith(' essence') || n.endsWith(' shard') || n.endsWith(' crystal');
  }

  function renderSkillBreakpointsHtml(r) {
    if (!r) return '';
    const orange = r.learn || r.orange || 1;
    const yellow = r.yellow || (r.learn ? Math.round(r.learn * 1.3) : '—');
    const green = r.green || (r.yellow ? Math.round(r.yellow * 1.3) : '—');
    const grey = r.grey || (r.green ? Math.round(r.green * 1.3) : '—');

    return `<div class="skill-breakpoints" title="Skill Difficulty: Orange (100% point), Yellow (~75%), Green (~25%), Grey (0%)" style="display:inline-flex; align-items:center; gap:3px; font-size:0.75rem; font-family:monospace; font-weight:bold;">
      <span style="color:#ff8c00; background:rgba(255,140,0,0.18); padding:1px 5px; border-radius:3px;">${orange}</span>
      <span style="color:#ffd700; background:rgba(255,215,0,0.18); padding:1px 5px; border-radius:3px;">${yellow}</span>
      <span style="color:#4caf50; background:rgba(76,175,80,0.18); padding:1px 5px; border-radius:3px;">${green}</span>
      <span style="color:#9e9e9e; background:rgba(158,158,158,0.18); padding:1px 5px; border-radius:3px;">${grey}</span>
    </div>`;
  }

  function renderClassicDiffBadge(r) {
    if (!r) return '';
    const diff = r.classicDiff || r.diffFromClassic || (r.isNew ? 'New in Forever' : (r.isChanged ? 'Changed from Classic' : ''));
    if (!diff && !r.isNew && !r.isCamp) return '';
    if (r.isCamp) {
      return `<span class="badge-camp" style="background:rgba(255,152,0,0.2); color:#ffb74d; border:1px solid rgba(255,152,0,0.4); font-size:0.7rem; font-weight:600; padding:1px 5px; border-radius:3px; margin-left:4px;">⛺ Camp</span>`;
    }
    if (r.isNew) {
      return `<span class="badge-new-forever" style="background:rgba(76,175,80,0.2); color:#81c784; border:1px solid rgba(76,175,80,0.4); font-size:0.7rem; font-weight:600; padding:1px 5px; border-radius:3px; margin-left:4px;">★ New</span>`;
    }
    return `<span class="badge-changed" title="${escapeHtml(diff)}" style="background:rgba(156,39,176,0.2); color:#ba68c8; border:1px solid rgba(156,39,176,0.4); font-size:0.7rem; font-weight:600; padding:1px 5px; border-radius:3px; margin-left:4px;">⚡ Changed</span>`;
  }

  function getCraftedBiSItemsForProfession(prof) {
    if (!prof || !prof.recipes) return [];
    const bisMap = buildBiSLookupMap();
    const results = [];
    const seen = new Set();

    for (const r of prof.recipes) {
      if (!r || !r.name || seen.has(r.name)) continue;
      const bis = bisMap.get(r.name.toLowerCase().trim());
      if (bis) {
        seen.add(r.name);
        results.push({
          recipe: r,
          bisInfo: bis,
          skillLearn: r.learn || r.orange || 1
        });
      }
    }
    results.sort((a, b) => a.skillLearn - b.skillLearn);
    return results;
  }

  function formatWaypointsInHtml(htmlText, fallbackZone = '') {
    if (!htmlText || typeof htmlText !== 'string') return htmlText;
    return htmlText.replace(/(?:(\(\s*\/way\s+[^)]+\))|(\/way\s+(?:[-A-Za-z0-9\s,'’]+?\s+)?[\d.]+[,\s]+[\d.]+(?:\s*,\s*[A-Za-z]+)?))/g, (match, parenMatch, standaloneMatch, offset, fullStr) => {
      const raw = (parenMatch || standaloneMatch || '').replace(/^\(|\)$/g, '').trim();
      const m = raw.match(/\/way\s+(?:([-A-Za-z0-9\s,'’]+?)\s+)?([\d.]+)[,\s]+([\d.]+)(?:\s*,\s*([A-Za-z]+))?/);
      if (!m) return match;
      let zone = (m[1] || '').trim();
      const x = m[2];
      const y = m[3];
      const faction = m[4] || '';

      if (!zone) {
        const before = fullStr.slice(0, offset).trim();
        const allZoneMatches = [...before.matchAll(/(?:in|at)\s+([A-Za-z0-9\s,'’]+?)(?:\s*\(|\s*$)/gi)];
        if (allZoneMatches.length > 0) {
          zone = allZoneMatches[allZoneMatches.length - 1][1].trim();
        } else if (fallbackZone) {
          zone = fallbackZone.trim();
        }
      }

      const macroCmd = `/way ${zone ? zone + ' ' : ''}${x} ${y}`;
      const labelText = `/way ${zone ? zone + ' ' : ''}${x}, ${y}${faction ? ' (' + faction + ')' : ''}`;
      return `<button type="button" class="tomtom-way-btn" data-macro="${escapeHtml(macroCmd)}" title="Click to copy TomTom macro: ${escapeHtml(macroCmd)}">📍 <span>${escapeHtml(labelText)}</span></button>`;
    });
  }

  window.WOW_PROFESSIONS_CORE = {
    CDN_BASE,
    getPlaceholderIcon,
    getIconUrl,
    getProfessionPassive,
    getSkillClass,
    buildBiSLookupMap,
    getBiSInfo,
    isDungeonRecipe,
    isBlueprintRecipe,
    isDisenchantMaterial,
    formatWaypointsInHtml,
    escapeHtml,
    renderSkillBreakpointsHtml,
    renderClassicDiffBadge,
    getCraftedBiSItemsForProfession
  };
})();
