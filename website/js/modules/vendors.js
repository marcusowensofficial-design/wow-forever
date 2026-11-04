/**
 * World of Warcraft: Forever - Vendor & Merchant Directory Module
 * Interactive directory of 931 vendors, 1,896 items, profession recipes,
 * limited-supply goods, and zone rosters with coordinate waypoints and /tar macros.
 * 100% Self-Hosted Local Icons & Comprehensive Category Taxonomy.
 */
(function () {
  'use strict';

  const QUALITY_COLORS = {
    0: '#9d9d9d',
    1: '#f8fafc',
    2: '#1eff00',
    3: '#0070dd',
    4: '#a335ee',
    5: '#ff8000'
  };

  const FACTION_COLORS = {
    Alliance: '#3b82f6',
    Horde: '#ef4444',
    Neutral: '#eab308'
  };

  const PROFESSION_MAP = {
    1: 'Leatherworking',
    2: 'Tailoring',
    3: 'Engineering',
    4: 'Blacksmithing',
    5: 'Cooking',
    6: 'Alchemy',
    7: 'First Aid',
    8: 'Enchanting',
    9: 'Fishing',
    0: 'Books & Grimoires'
  };

  const SUB_TABS = [
    { id: 'find', label: 'Find an Item', icon: '🔍' },
    { id: 'recipes', label: 'Recipes', icon: '📜' },
    { id: 'limited', label: 'Limited Supply', icon: '⏳' },
    { id: 'zones', label: 'By Zone', icon: '🗺️' }
  ];

  // Quick Filter Chips for 1-Click Exploration
  const QUICK_CHIPS = [
    { id: 'all', label: 'All Items', icon: '🌐' },
    { id: 'limited', label: 'Limited Stock', icon: '🔥' },
    { id: 'cooking', label: 'Cooking Recipes', icon: '🍳' },
    { id: 'books', label: 'Books & Grimoires', icon: '📖' },
    { id: 'tailoring', label: 'Tailoring Patterns', icon: '🧵' },
    { id: 'blacksmithing', label: 'Blacksmithing Plans', icon: '🔨' },
    { id: 'leatherworking', label: 'Leatherworking Patterns', icon: '🥋' },
    { id: 'alchemy', label: 'Alchemy Recipes', icon: '🧪' },
    { id: 'engineering', label: 'Engineering Schematics', icon: '⚙️' },
    { id: 'enchanting', label: 'Enchanting Formulas', icon: '✨' },
    { id: 'bags', label: 'Bags & Containers', icon: '🎒' },
    { id: 'mounts_pets', label: 'Mounts & Pets', icon: '🐎' },
    { id: 'weapons', label: 'Weapons', icon: '⚔️' },
    { id: 'armor', label: 'Armor & Shields', icon: '🛡️' },
    { id: 'food', label: 'Food & Drinks', icon: '🍖' },
    { id: 'potions', label: 'Potions & Elixirs', icon: '⚗️' },
    { id: 'poisons', label: 'Poisons & Toxins', icon: '☠️' }
  ];

  // Comprehensive 2-Tier Taxonomy
  const TAXONOMY = {
    all: {
      label: 'All Categories',
      subcategories: [
        { id: 'all', label: 'All Items' }
      ]
    },
    recipes: {
      label: '📜 Recipes & Grimoires',
      subcategories: [
        { id: 'all', label: 'All Recipes (662)' },
        { id: 'cooking', label: 'Cooking Recipes (70)' },
        { id: 'books', label: 'Books & Grimoires (62)' },
        { id: 'tailoring', label: 'Tailoring Patterns (118)' },
        { id: 'leatherworking', label: 'Leatherworking Patterns (150)' },
        { id: 'blacksmithing', label: 'Blacksmithing Plans (81)' },
        { id: 'alchemy', label: 'Alchemy Recipes (56)' },
        { id: 'engineering', label: 'Engineering Schematics (53)' },
        { id: 'enchanting', label: 'Enchanting Formulas (65)' },
        { id: 'firstaid', label: 'First Aid Manuals (5)' },
        { id: 'fishing', label: 'Fishing Guides (2)' }
      ]
    },
    weapons: {
      label: '⚔️ Weapons & Armaments',
      subcategories: [
        { id: 'all', label: 'All Weapons (194)' },
        { id: 'weapons_1h', label: 'One-Hand Swords, Maces & Daggers' },
        { id: 'weapons_2h', label: 'Two-Hand Swords, Axes & Maces' },
        { id: 'weapons_ranged', label: 'Bows, Guns & Crossbows' },
        { id: 'weapons_caster', label: 'Staves, Wands & Off-Hands' }
      ]
    },
    armor: {
      label: '🛡️ Armor & Shields',
      subcategories: [
        { id: 'all', label: 'All Armor & Shields (591)' },
        { id: 'armor_cloth', label: 'Cloth Armor' },
        { id: 'armor_leather', label: 'Leather Armor' },
        { id: 'armor_mail', label: 'Mail Armor' },
        { id: 'armor_plate', label: 'Plate Armor' },
        { id: 'armor_shield', label: 'Shields' },
        { id: 'armor_acc', label: 'Cloaks, Shirts & Accessories' }
      ]
    },
    consumables: {
      label: '🍖 Consumables & Sustenance',
      subcategories: [
        { id: 'all', label: 'All Consumables (218)' },
        { id: 'cons_food', label: 'Food & Refreshing Water' },
        { id: 'cons_potions', label: 'Potions, Elixirs & Flasks' },
        { id: 'cons_poisons', label: 'Rogue Poisons & Toxins' },
        { id: 'cons_scrolls', label: 'Scrolls & Buff Items' },
        { id: 'cons_bandages', label: 'Bandages & First Aid' }
      ]
    },
    bags_tools: {
      label: '🎒 Bags, Ammo & Tools',
      subcategories: [
        { id: 'all', label: 'All Bags & Tools (55)' },
        { id: 'bagstool_bags', label: 'Containers & Bags' },
        { id: 'bagstool_quivers', label: 'Quivers & Ammo Pouches' },
        { id: 'bagstool_ammo', label: 'Arrows & Bullets' },
        { id: 'bagstool_tools', label: 'Tradeskill Tools & Fishing Poles' }
      ]
    },
    mounts_pets: {
      label: '🐎 Mounts & Vanity Pets',
      subcategories: [
        { id: 'all', label: 'All Mounts & Pets (71)' },
        { id: 'mp_mounts', label: 'Mount Bridles & Whistles (51)' },
        { id: 'mp_pets', label: 'Companion Vanity Pets (20)' }
      ]
    },
    trade_goods: {
      label: '🌾 Trade Supplies & Reagents',
      subcategories: [
        { id: 'all', label: 'All Trade Supplies (75)' },
        { id: 'tg_tailoring', label: 'Thread, Dye & Bleach' },
        { id: 'tg_engineering', label: 'Blasting Powder & Flux' },
        { id: 'tg_herbs_fish', label: 'Cooking Spices, Herbs & Fish' },
        { id: 'tg_enchanting', label: 'Enchanting Dust & Rods' }
      ]
    }
  };

  let state = {
    tab: 'find',
    q: '',
    chip: 'all',
    cat: 'all',
    subCat: 'all',
    faction: 'all',
    quality: 'all',
    currencyType: 'all',
    limOnly: false,
    seenOnly: false,
    sort: 'default'
  };

  let indexCache = null;

  function esc(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function getIconUrl(iconId) {
    const id = Number(iconId) || 134400;
    // Local self-hosted icon path: 100% private, zero external network traffic
    return `images/icons/vendors/${id}.webp`;
  }

  function formatMoney(copper) {
    const c = Math.round(Number(copper) || 0);
    if (c <= 0) return '';
    const g = Math.floor(c / 10000);
    const s = Math.floor((c % 10000) / 100);
    const k = c % 100;
    const parts = [];
    if (g > 0) parts.push(`<span class="vd-money-g">${g.toLocaleString('en-US')}g</span>`);
    if (s > 0) parts.push(`<span class="vd-money-s">${s}s</span>`);
    if (k > 0 || parts.length === 0) parts.push(`<span class="vd-money-c">${k}c</span>`);
    return parts.join(' ');
  }

  function classifyItem(item) {
    const [name, icon, quality, classId, subClassId] = item;

    // Recipes (Class 9)
    if (classId === 9) {
      const pMap = {
        5: 'cooking',
        0: 'books',
        2: 'tailoring',
        1: 'leatherworking',
        4: 'blacksmithing',
        6: 'alchemy',
        3: 'engineering',
        8: 'enchanting',
        7: 'firstaid',
        9: 'fishing'
      };
      return {
        cat: 'recipes',
        sub: pMap[subClassId] || 'all',
        label: PROFESSION_MAP[subClassId] || 'Recipe'
      };
    }

    // Weapons (Class 2)
    if (classId === 2) {
      if ([7, 15, 4, 0, 14, 13].includes(subClassId)) {
        return { cat: 'weapons', sub: 'weapons_1h', label: '1H Weapon' };
      }
      if ([8, 1, 5, 6].includes(subClassId)) {
        return { cat: 'weapons', sub: 'weapons_2h', label: '2H Weapon' };
      }
      if ([2, 3, 18, 16].includes(subClassId)) {
        return { cat: 'weapons', sub: 'weapons_ranged', label: 'Ranged Weapon' };
      }
      if ([10, 19, 20].includes(subClassId)) {
        return { cat: 'weapons', sub: 'weapons_caster', label: 'Staff / Wand / Tool' };
      }
      return { cat: 'weapons', sub: 'all', label: 'Weapon' };
    }

    // Armor (Class 4)
    if (classId === 4) {
      if (subClassId === 1) return { cat: 'armor', sub: 'armor_cloth', label: 'Cloth Armor' };
      if (subClassId === 2) return { cat: 'armor', sub: 'armor_leather', label: 'Leather Armor' };
      if (subClassId === 3) return { cat: 'armor', sub: 'armor_mail', label: 'Mail Armor' };
      if (subClassId === 4) return { cat: 'armor', sub: 'armor_plate', label: 'Plate Armor' };
      if (subClassId === 6) return { cat: 'armor', sub: 'armor_shield', label: 'Shield' };
      return { cat: 'armor', sub: 'armor_acc', label: 'Cloak / Accessory' };
    }

    // Consumables (Class 0)
    if (classId === 0) {
      if (subClassId === 5) return { cat: 'consumables', sub: 'cons_food', label: 'Food & Drink' };
      if (subClassId === 1 || subClassId === 2) return { cat: 'consumables', sub: 'cons_potions', label: 'Potion / Elixir' };
      if (subClassId === 8) return { cat: 'consumables', sub: 'cons_poisons', label: 'Poison / Toxin' };
      if (subClassId === 4) return { cat: 'consumables', sub: 'cons_scrolls', label: 'Scroll' };
      if (subClassId === 7) return { cat: 'consumables', sub: 'cons_bandages', label: 'Bandage' };
      return { cat: 'consumables', sub: 'all', label: 'Consumable' };
    }

    // Bags & Ammo (Class 1, 11, 6)
    if (classId === 1) return { cat: 'bags_tools', sub: 'bagstool_bags', label: 'Container / Bag' };
    if (classId === 11) return { cat: 'bags_tools', sub: 'bagstool_quivers', label: 'Quiver / Ammo Pouch' };
    if (classId === 6) return { cat: 'bags_tools', sub: 'bagstool_ammo', label: 'Ammunition' };

    // Mounts & Pets (Class 15)
    if (classId === 15) {
      if (subClassId === 5) return { cat: 'mounts_pets', sub: 'mp_mounts', label: 'Mount' };
      if (subClassId === 2) return { cat: 'mounts_pets', sub: 'mp_pets', label: 'Companion Pet' };
      if (subClassId === 1) return { cat: 'consumables', sub: 'cons_poisons', label: 'Poison Reagent' };
      return { cat: 'mounts_pets', sub: 'all', label: 'Vanity / Item' };
    }

    // Trade Goods (Class 7)
    if (classId === 7) {
      if (subClassId === 5 || subClassId === 11) return { cat: 'trade_goods', sub: 'tg_tailoring', label: 'Tailoring Supply' };
      if (subClassId === 1 || subClassId === 7) return { cat: 'trade_goods', sub: 'tg_engineering', label: 'Flux / Powder' };
      if (subClassId === 8 || subClassId === 9) return { cat: 'trade_goods', sub: 'tg_herbs_fish', label: 'Cooking Herb / Fish' };
      if (subClassId === 12) return { cat: 'trade_goods', sub: 'tg_enchanting', label: 'Enchanting Dust' };
      return { cat: 'trade_goods', sub: 'all', label: 'Trade Good' };
    }

    return { cat: 'all', sub: 'all', label: 'Item' };
  }

  function ensureIndex() {
    if (indexCache) return indexCache;
    const data = window.WOW_VENDORS_DATA;
    if (!data || !data.vendors || !data.items) return null;

    const vendorList = Object.entries(data.vendors).map(([id, v]) => ({
      id: Number(id),
      ...v
    }));

    // Invert mapping: itemId -> Array of [vendor, sellDetails]
    const itemVendorsMap = new Map();
    for (const v of vendorList) {
      if (!v.sells) continue;
      for (const [itemId, sell] of Object.entries(v.sells)) {
        if (!itemVendorsMap.has(itemId)) itemVendorsMap.set(itemId, []);
        itemVendorsMap.get(itemId).push([v, sell]);
      }
    }

    // Sort vendors per item: Seen in Forever first, then faction, then zone
    for (const list of itemVendorsMap.values()) {
      list.sort((a, b) => {
        const fvA = a[0].fv ? 1 : 0;
        const fvB = b[0].fv ? 1 : 0;
        if (fvB !== fvA) return fvB - fvA;
        const sideA = a[0].side || 'Neutral';
        const sideB = b[0].side || 'Neutral';
        if (sideA !== sideB) return sideA.localeCompare(sideB);
        return (a[0].zone || '').localeCompare(b[0].zone || '');
      });
    }

    // Precalculate counts
    let totalLimited = 0;
    let totalRecipes = 0;
    for (const [itemId, item] of Object.entries(data.items)) {
      if (item[3] === 9) totalRecipes++;
      const vendors = itemVendorsMap.get(itemId) || [];
      if (vendors.some(([, sell]) => sell.lim)) totalLimited++;
    }

    const zones = Array.from(new Set(vendorList.map(v => v.zone).filter(Boolean))).sort();

    indexCache = {
      raw: data,
      vendors: vendorList,
      items: data.items,
      currencies: data.currencies || {},
      factions: data.factions || {},
      itemVendorsMap,
      zones,
      stats: {
        vendorCount: vendorList.length,
        itemCount: Object.keys(data.items).length,
        recipeCount: totalRecipes,
        limitedCount: totalLimited,
        zoneCount: zones.length
      }
    };

    return indexCache;
  }

  function renderCosts(costs, currencies, items) {
    if (!costs || !costs.length) return '';
    return costs.map(([type, id, qty]) => {
      if (type === 'c') {
        const cur = currencies[id];
        const name = cur ? cur.n : `Currency #${id}`;
        const desc = cur && cur.d ? ` title="${esc(cur.d)}"` : '';
        const iconSrc = cur && cur.ic ? getIconUrl(cur.ic) : getIconUrl(134400);
        return `<span class="vd-cost-item"${desc}><img src="${iconSrc}" class="vd-cost-icon" alt="" onerror="this.src='images/icons/vendors/134400.webp'">${qty} × ${esc(name)}</span>`;
      }
      if (type === 'i') {
        const item = items[id];
        const name = item ? item[0] : `Item #${id}`;
        const qColor = item ? QUALITY_COLORS[item[2]] || '#f8fafc' : '#f8fafc';
        const iconSrc = item && item[1] ? getIconUrl(item[1]) : getIconUrl(134400);
        return `<span class="vd-cost-item"><img src="${iconSrc}" class="vd-cost-icon" alt="" onerror="this.src='images/icons/vendors/134400.webp'">${qty} × <span style="color:${qColor};font-weight:600;">${esc(name)}</span></span>`;
      }
      return '';
    }).filter(Boolean).join(' + ');
  }

  function copyToClipboard(text, btnElement, successMsg = 'Copied!') {
    if (window.copyTextToClipboard) {
      window.copyTextToClipboard(text);
    } else if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text);
    }
    if (btnElement) {
      const origHtml = btnElement.innerHTML;
      btnElement.innerHTML = `<span style="color:#22c55e;">✓ ${successMsg}</span>`;
      btnElement.classList.add('vd-btn-copied');
      setTimeout(() => {
        btnElement.innerHTML = origHtml;
        btnElement.classList.remove('vd-btn-copied');
      }, 1800);
    }
  }

  window.vdCopyMacro = function (vendorName, btn) {
    const macro = `/tar ${vendorName}`;
    copyToClipboard(macro, btn, 'Macro Copied!');
  };

  window.vdCopyWaypoint = function (zone, x, y, btn) {
    const way = `/way ${zone} ${x} ${y}`;
    copyToClipboard(way, btn, 'Waypoint Copied!');
  };

  function renderVendorLine(vendor, sell, currencies, items) {
    const sideColor = FACTION_COLORS[vendor.side] || '#94a3b8';
    const sideName = vendor.side || 'Neutral';
    const moneyStr = sell && sell.p ? formatMoney(sell.p) : '';
    const costStr = sell && sell.c ? renderCosts(sell.c, currencies, items) : '';
    const priceSeparator = (moneyStr && costStr) ? ' + ' : '';
    const priceHtml = (moneyStr || costStr)
      ? `<span class="vd-price-badge">${moneyStr}${priceSeparator}${costStr}${sell.n > 1 ? ` <small class="vd-qty-sub">for ${sell.n}</small>` : ''}</span>`
      : '';

    const limHtml = sell && sell.lim
      ? `<span class="vd-badge vd-badge-lim" title="Limited vendor supply; restocks over time">Limited: ${sell.lim}</span>`
      : '';

    const fvHtml = vendor.fv
      ? `<span class="vd-badge vd-badge-fv" title="Verified in WoW Forever client cache">Seen in Forever</span>`
      : `<span class="vd-badge vd-badge-cl" title="CMaNGOS classic-db data">Classic Data</span>`;

    return `
      <div class="vd-vendor-row">
        <div class="vd-vendor-info">
          <span class="vd-vendor-name">
            <strong>${esc(vendor.n)}</strong>
            ${vendor.sub ? `<span class="vd-vendor-title">&lt;${esc(vendor.sub)}&gt;</span>` : ''}
          </span>
          <span class="vd-vendor-loc">
            <span class="vd-zone-pill">${esc(vendor.zone)}</span>
            <span class="vd-coords">(${vendor.x}, ${vendor.y})</span>
            <button type="button" class="vd-inline-btn" onclick="vdCopyWaypoint('${esc(vendor.zone)}', ${vendor.x}, ${vendor.y}, this)" title="Copy /way waypoint command" aria-label="Copy waypoint">
              📍 /way
            </button>
            <button type="button" class="vd-inline-btn" onclick="vdCopyMacro('${esc(vendor.n)}', this)" title="Copy /target macro" aria-label="Copy target macro">
              🎯 /tar
            </button>
          </span>
          <span class="vd-vendor-faction" style="color:${sideColor};">
            ● ${esc(sideName)}
          </span>
        </div>
        <div class="vd-vendor-pricing">
          ${priceHtml}
          ${limHtml}
          ${fvHtml}
        </div>
      </div>
    `;
  }

  function renderItemCard(itemId, idxData, showAllVendors = false) {
    const item = idxData.items[itemId];
    if (!item) return '';

    const [name, iconId, quality, classId, subClassId] = item;
    const qColor = QUALITY_COLORS[quality] || '#f8fafc';
    const iconSrc = getIconUrl(iconId);
    const vendors = idxData.itemVendorsMap.get(itemId) || [];

    // Filter vendors by faction if active
    let visibleVendors = vendors;
    if (state.faction !== 'all') {
      visibleVendors = visibleVendors.filter(([v]) => (v.side || 'Neutral').toLowerCase() === state.faction.toLowerCase());
      if (visibleVendors.length === 0) return '';
    }
    if (state.seenOnly) {
      visibleVendors = visibleVendors.filter(([v]) => v.fv);
      if (visibleVendors.length === 0) return '';
    }
    if (state.limOnly) {
      visibleVendors = visibleVendors.filter(([, s]) => s.lim);
      if (visibleVendors.length === 0) return '';
    }

    const displayedVendors = showAllVendors ? visibleVendors : visibleVendors.slice(0, 6);
    const hasMore = visibleVendors.length > 6 && !showAllVendors;

    const vendorRows = displayedVendors.map(([v, s]) =>
      renderVendorLine(v, s, idxData.currencies, idxData.items)
    ).join('');

    const classification = classifyItem(item);

    return `
      <div class="vd-item-card" data-item-id="${itemId}">
        <div class="vd-item-header">
          <div class="vd-item-identity">
            <img src="${iconSrc}" class="vd-item-icon" alt="" style="border-color:${qColor};" onerror="this.src='images/icons/vendors/134400.webp'">
            <div>
              <div class="vd-item-name" style="color:${qColor};">
                <a href="https://www.wowhead.com/forever/item=${itemId}" target="_blank" rel="noopener noreferrer" style="color:inherit;text-decoration:none;">
                  ${esc(name)}
                </a>
                ${classification.label ? `<span class="vd-badge vd-badge-prof">${esc(classification.label)}</span>` : ''}
              </div>
              <div class="vd-vendor-count-label">
                Sold by ${visibleVendors.length} ${visibleVendors.length === 1 ? 'vendor' : 'vendors'}
              </div>
            </div>
          </div>
        </div>
        <div class="vd-vendor-list">
          ${vendorRows}
          ${hasMore ? `
            <div class="vd-more-row">
              <button type="button" class="vd-more-btn" onclick="vdExpandItemVendors('${itemId}', this)">
                Show all ${visibleVendors.length} vendors ↓
              </button>
            </div>
          ` : ''}
        </div>
      </div>
    `;
  }

  window.vdExpandItemVendors = function (itemId, btn) {
    const idx = ensureIndex();
    if (!idx) return;
    const card = btn.closest('.vd-item-card');
    if (!card) return;
    card.outerHTML = renderItemCard(itemId, idx, true);
  };

  function itemMatchesFilters(id, item, idx) {
    const [name, icon, quality, classId, subClassId] = item;
    const info = classifyItem(item);

    // 1. Quick Chip filter
    if (state.chip !== 'all') {
      if (state.chip === 'limited') {
        const vList = idx.itemVendorsMap.get(id) || [];
        if (!vList.some(([, s]) => s.lim)) return false;
      } else if (state.chip === 'cooking') {
        if (!(classId === 9 && subClassId === 5)) return false;
      } else if (state.chip === 'books') {
        if (!(classId === 9 && subClassId === 0)) return false;
      } else if (state.chip === 'tailoring') {
        if (!(classId === 9 && subClassId === 2)) return false;
      } else if (state.chip === 'leatherworking') {
        if (!(classId === 9 && subClassId === 1)) return false;
      } else if (state.chip === 'blacksmithing') {
        if (!(classId === 9 && subClassId === 4)) return false;
      } else if (state.chip === 'alchemy') {
        if (!(classId === 9 && subClassId === 6)) return false;
      } else if (state.chip === 'engineering') {
        if (!(classId === 9 && subClassId === 3)) return false;
      } else if (state.chip === 'enchanting') {
        if (!(classId === 9 && subClassId === 8)) return false;
      } else if (state.chip === 'bags') {
        if (!(classId === 1 || classId === 11)) return false;
      } else if (state.chip === 'mounts_pets') {
        if (!(classId === 15 && (subClassId === 5 || subClassId === 2))) return false;
      } else if (state.chip === 'weapons') {
        if (classId !== 2) return false;
      } else if (state.chip === 'armor') {
        if (classId !== 4) return false;
      } else if (state.chip === 'food') {
        if (!(classId === 0 && subClassId === 5)) return false;
      } else if (state.chip === 'potions') {
        if (!(classId === 0 && (subClassId === 1 || subClassId === 2))) return false;
      } else if (state.chip === 'poisons') {
        if (!((classId === 0 && subClassId === 8) || (classId === 15 && subClassId === 1))) return false;
      }
    }

    // 2. Primary Category Filter
    if (state.cat !== 'all') {
      if (info.cat !== state.cat) return false;
      // 3. Subcategory Filter
      if (state.subCat !== 'all' && info.sub !== state.subCat) {
        return false;
      }
    }

    // 4. Quality Filter
    if (state.quality !== 'all') {
      if (quality !== Number(state.quality)) return false;
    }

    // 5. Currency / Payment Filter
    if (state.currencyType !== 'all') {
      const vList = idx.itemVendorsMap.get(id) || [];
      const hasSpecialCurrency = vList.some(([, s]) => s.c && s.c.length > 0);
      if (state.currencyType === 'special' && !hasSpecialCurrency) return false;
      if (state.currencyType === 'money' && hasSpecialCurrency) return false;
    }

    return true;
  }

  function renderFindTab(container, idx) {
    const rawTokens = state.q.toLowerCase().split(/\s+/).filter(Boolean);
    let matchingItemIds = [];

    for (const [id, item] of Object.entries(idx.items)) {
      if (!itemMatchesFilters(id, item, idx)) continue;

      if (rawTokens.length === 0) {
        matchingItemIds.push(id);
        continue;
      }

      const itemName = item[0].toLowerCase();
      const matchesItem = rawTokens.every(tok => itemName.includes(tok));
      if (matchesItem) {
        matchingItemIds.push(id);
        continue;
      }

      // Check if query matches vendor name, subtitle, or zone
      const vendors = idx.itemVendorsMap.get(id) || [];
      const matchesVendor = vendors.some(([v]) => {
        const vName = (v.n || '').toLowerCase();
        const vSub = (v.sub || '').toLowerCase();
        const vZone = (v.zone || '').toLowerCase();
        return rawTokens.every(tok => vName.includes(tok) || vSub.includes(tok) || vZone.includes(tok));
      });
      if (matchesVendor) {
        matchingItemIds.push(id);
      }
    }

    // Apply sorting
    if (state.sort === 'name') {
      matchingItemIds.sort((a, b) => idx.items[a][0].localeCompare(idx.items[b][0]));
    } else if (state.sort === 'price-asc' || state.sort === 'price-desc') {
      matchingItemIds.sort((a, b) => {
        const priceA = (idx.itemVendorsMap.get(a)?.[0]?.[1]?.p) || 0;
        const priceB = (idx.itemVendorsMap.get(b)?.[0]?.[1]?.p) || 0;
        return state.sort === 'price-asc' ? priceA - priceB : priceB - priceA;
      });
    } else if (state.sort === 'vendors-desc') {
      matchingItemIds.sort((a, b) => {
        const countA = (idx.itemVendorsMap.get(a) || []).length;
        const countB = (idx.itemVendorsMap.get(b) || []).length;
        return countB - countA;
      });
    }

    const displayCount = rawTokens.length > 0 ? 60 : 36;
    const cardsHtml = matchingItemIds.slice(0, displayCount).map(id => renderItemCard(id, idx)).filter(Boolean).join('');

    const resultsSummary = rawTokens.length > 0
      ? `<div class="vd-results-count">Found <strong>${matchingItemIds.length}</strong> items matching "${esc(state.q)}"</div>`
      : `<div class="vd-results-count">Displaying <strong>${Math.min(matchingItemIds.length, displayCount)}</strong> of <strong>${matchingItemIds.length}</strong> items.</div>`;

    container.innerHTML = `
      ${resultsSummary}
      <div class="vd-cards-grid">
        ${cardsHtml.length > 0 ? cardsHtml : `
          <div class="vd-empty-state">
            <span style="font-size:2.4rem;">🔍</span>
            <h3>No items match your selected filters</h3>
            <p>Try resetting filters or searching for a different keyword (e.g. "Flask", "Pattern", "Copper", "Corina").</p>
            <button type="button" class="vd-btn-reset" onclick="window.vdResetFilters()">Reset All Filters</button>
          </div>
        `}
      </div>
      ${matchingItemIds.length > displayCount ? `
        <div class="vd-truncated-notice">
          Showing top ${displayCount} of ${matchingItemIds.length} items. Use the search box or subcategories to narrow results.
        </div>
      ` : ''}
    `;
  }

  window.vdResetFilters = function () {
    state.chip = 'all';
    state.cat = 'all';
    state.subCat = 'all';
    state.faction = 'all';
    state.quality = 'all';
    state.currencyType = 'all';
    state.limOnly = false;
    state.seenOnly = false;
    state.q = '';
    window.renderVendors();
  };

  function renderRecipesTab(container, idx) {
    const rawTokens = state.q.toLowerCase().split(/\s+/).filter(Boolean);
    const recipeItemIds = Object.keys(idx.items).filter(id => idx.items[id][3] === 9);

    const professionSections = Object.entries(PROFESSION_MAP).map(([subId, profName]) => {
      let items = recipeItemIds.filter(id => idx.items[id][4] === Number(subId));
      if (rawTokens.length > 0) {
        items = items.filter(id => {
          const name = idx.items[id][0].toLowerCase();
          return rawTokens.every(tok => name.includes(tok));
        });
      }
      items.sort((a, b) => idx.items[a][0].localeCompare(idx.items[b][0]));
      return {
        id: subId,
        name: profName,
        items
      };
    }).filter(sec => sec.items.length > 0);

    const accordionsHtml = professionSections.map(sec => `
      <details class="vd-accordion-group" open>
        <summary class="vd-accordion-summary">
          <span class="vd-accordion-title">
            <strong>${esc(sec.name)}</strong>
            <span class="vd-badge vd-badge-count">${sec.items.length} recipes</span>
          </span>
          <span class="vd-accordion-arrow">▾</span>
        </summary>
        <div class="vd-cards-grid vd-cards-compact">
          ${sec.items.map(id => renderItemCard(id, idx)).filter(Boolean).join('')}
        </div>
      </details>
    `).join('');

    container.innerHTML = `
      <div class="vd-tab-intro">
        <p>Complete catalogue of <strong>${recipeItemIds.length} profession recipes, formulas, patterns, and class grimoires</strong> sold by vendors across Azeroth.</p>
      </div>
      ${accordionsHtml.length > 0 ? accordionsHtml : `
        <div class="vd-empty-state">
          <p>No recipes match "${esc(state.q)}".</p>
        </div>
      `}
    `;
  }

  function renderLimitedTab(container, idx) {
    const rawTokens = state.q.toLowerCase().split(/\s+/).filter(Boolean);
    let limitedItemIds = Object.keys(idx.items).filter(id => {
      const vList = idx.itemVendorsMap.get(id) || [];
      return vList.some(([, sell]) => sell.lim);
    });

    if (rawTokens.length > 0) {
      limitedItemIds = limitedItemIds.filter(id => {
        const name = idx.items[id][0].toLowerCase();
        return rawTokens.every(tok => name.includes(tok));
      });
    }

    limitedItemIds.sort((a, b) => idx.items[a][0].localeCompare(idx.items[b][0]));
    const cardsHtml = limitedItemIds.map(id => renderItemCard(id, idx)).filter(Boolean).join('');

    container.innerHTML = `
      <div class="vd-tab-intro">
        <p><strong>Limited-Supply Goods (${limitedItemIds.length} items):</strong> Exotic recipes, rare mount bridles, companion pets, and crafting goods with finite vendor inventories that restock periodically.</p>
      </div>
      <div class="vd-cards-grid">
        ${cardsHtml.length > 0 ? cardsHtml : `
          <div class="vd-empty-state">
            <p>No limited supply items match "${esc(state.q)}".</p>
          </div>
        `}
      </div>
    `;
  }

  function renderZonesTab(container, idx) {
    const rawTokens = state.q.toLowerCase().split(/\s+/).filter(Boolean);
    const zonesList = idx.zones.filter(zone => {
      if (rawTokens.length === 0) return true;
      return rawTokens.every(tok => zone.toLowerCase().includes(tok));
    });

    const zoneAccordions = zonesList.map(zone => {
      let zoneVendors = idx.vendors.filter(v => v.zone === zone);
      if (state.faction !== 'all') {
        zoneVendors = zoneVendors.filter(v => (v.side || 'Neutral').toLowerCase() === state.faction.toLowerCase());
      }
      if (state.seenOnly) {
        zoneVendors = zoneVendors.filter(v => v.fv);
      }
      zoneVendors.sort((a, b) => (a.n || '').localeCompare(b.n || ''));
      if (zoneVendors.length === 0) return '';

      const vendorsHtml = zoneVendors.map(v => {
        const sideColor = FACTION_COLORS[v.side] || '#94a3b8';
        const sellEntries = Object.entries(v.sells || {});
        const displaySells = sellEntries.slice(0, 24);
        const hasMore = sellEntries.length > 24;

        const itemsPills = displaySells.map(([itemId, sell]) => {
          const item = idx.items[itemId];
          if (!item) return '';
          const qColor = QUALITY_COLORS[item[2]] || '#f8fafc';
          const iconSrc = getIconUrl(item[1]);
          return `
            <a class="vd-zone-item-pill" href="https://www.wowhead.com/forever/item=${itemId}" target="_blank" rel="noopener noreferrer" title="${esc(item[0])}${sell.lim ? ` (Limited: ${sell.lim})` : ''}">
              <img src="${iconSrc}" class="vd-pill-icon" alt="" onerror="this.src='images/icons/vendors/134400.webp'">
              <span style="color:${qColor};">${esc(item[0])}</span>
              ${sell.lim ? `<span class="vd-lim-mini">${sell.lim}</span>` : ''}
            </a>
          `;
        }).filter(Boolean).join('');

        return `
          <div class="vd-zone-vendor-card">
            <div class="vd-zone-vendor-header">
              <span class="vd-vendor-title-block">
                <strong>${esc(v.n)}</strong>
                ${v.sub ? `<span class="vd-vendor-sub">&lt;${esc(v.sub)}&gt;</span>` : ''}
                <span class="vd-faction-dot" style="color:${sideColor};">● ${esc(v.side || 'Neutral')}</span>
                ${v.fv ? `<span class="vd-badge vd-badge-fv">Seen in Forever</span>` : ''}
              </span>
              <span class="vd-loc-actions">
                <span class="vd-coords">(${v.x}, ${v.y})</span>
                <button type="button" class="vd-inline-btn" onclick="vdCopyWaypoint('${esc(v.zone)}', ${v.x}, ${v.y}, this)" aria-label="Copy waypoint">📍 /way</button>
                <button type="button" class="vd-inline-btn" onclick="vdCopyMacro('${esc(v.n)}', this)" aria-label="Copy macro">🎯 /tar</button>
              </span>
            </div>
            <div class="vd-zone-vendor-sells">
              ${itemsPills}
              ${hasMore ? `<span class="vd-zone-more-tag">+${sellEntries.length - 24} more goods</span>` : ''}
            </div>
          </div>
        `;
      }).filter(Boolean).join('');

      return `
        <details class="vd-accordion-group">
          <summary class="vd-accordion-summary">
            <span class="vd-accordion-title">
              <strong>${esc(zone)}</strong>
              <span class="vd-badge vd-badge-count">${zoneVendors.length} vendors</span>
            </span>
            <span class="vd-accordion-arrow">▾</span>
          </summary>
          <div class="vd-zone-vendors-container">
            ${vendorsHtml}
          </div>
        </details>
      `;
    }).filter(Boolean).join('');

    container.innerHTML = `
      <div class="vd-tab-intro">
        <p>Explore vendors organized across all <strong>${zonesList.length} zones</strong> in Azeroth with exact coordinate pins, faction alignment, and full merchandise rosters.</p>
      </div>
      ${zoneAccordions.length > 0 ? zoneAccordions : `
        <div class="vd-empty-state">
          <p>No zones match "${esc(state.q)}".</p>
        </div>
      `}
    `;
  }

  function renderSubView() {
    const container = document.getElementById('vd-subview-container');
    if (!container) return;
    const idx = ensureIndex();
    if (!idx) return;

    if (state.tab === 'find') {
      renderFindTab(container, idx);
    } else if (state.tab === 'recipes') {
      renderRecipesTab(container, idx);
    } else if (state.tab === 'limited') {
      renderLimitedTab(container, idx);
    } else if (state.tab === 'zones') {
      renderZonesTab(container, idx);
    }
  }

  window.renderVendors = function () {
    const mount = document.getElementById('vendors-mount');
    if (!mount) return;

    const idx = ensureIndex();
    if (!idx) {
      mount.innerHTML = `
        <div class="vd-loading-state">
          <span>🏪</span>
          <p>Loading WoW Forever Vendor Directory...</p>
        </div>
      `;
      return;
    }

    const { stats } = idx;
    const currentTaxonomy = TAXONOMY[state.cat] || TAXONOMY.all;

    mount.innerHTML = `
      <div class="vd-container">
        <!-- Section Heading & Headline Stats -->
        <div class="section-heading-bar">
          <div>
            <h2><span>🏪</span> WoW Forever Vendor Directory (${stats.vendorCount.toLocaleString('en-US')} Vendors &amp; ${stats.itemCount.toLocaleString('en-US')} Items)</h2>
            <p class="section-subtext">Who sells what in WoW Forever, and where they stand: 931 vendors and 1,896 items, recipes and limited-supply goods included. Complete with (x, y) coordinates, faction verification, and 1-click /tar macros.</p>
            <div class="vd-stats-badges-row">
              <span class="vd-stat-pill"><strong>${stats.vendorCount}</strong> Vendors</span>
              <span class="vd-stat-pill"><strong>${stats.itemCount}</strong> Unique Items</span>
              <span class="vd-stat-pill"><strong>${stats.recipeCount}</strong> Profession Recipes</span>
              <span class="vd-stat-pill"><strong>${stats.limitedCount}</strong> Limited Supply</span>
              <span class="vd-stat-pill"><strong>${stats.zoneCount}</strong> Zones</span>
            </div>
          </div>
        </div>

        <!-- Mode Navigation Sub-Tabs -->
        <div class="vd-subnav-bar" role="tablist" aria-label="Vendor Views">
          ${SUB_TABS.map(tab => `
            <button type="button" class="vd-subnav-btn ${state.tab === tab.id ? 'active' : ''}" data-subtab="${tab.id}" role="tab" aria-selected="${state.tab === tab.id}">
              <span class="vd-subnav-icon">${tab.icon}</span>
              <span class="vd-subnav-label">${tab.label}</span>
            </button>
          `).join('')}
        </div>

        <!-- Quick Filter Exploration Chips -->
        <div class="vd-quick-chips-wrapper">
          <div class="vd-quick-chips-label">Quick Filters:</div>
          <div class="vd-quick-chips-bar" role="group" aria-label="Quick Category Filters">
            ${QUICK_CHIPS.map(chip => `
              <button type="button" class="vd-chip-btn ${state.chip === chip.id ? 'active' : ''}" data-chip="${chip.id}">
                <span class="vd-chip-icon">${chip.icon}</span>
                <span>${chip.label}</span>
              </button>
            `).join('')}
          </div>
        </div>

        <!-- Interactive Search & Filter Toolbar -->
        <div class="vd-filter-toolbar">
          <div class="vd-search-box-wrapper">
            <span class="vd-search-icon">🔍</span>
            <input type="search" id="vd-search-input" class="vd-search-input" placeholder="Search item, recipe, vendor name, or zone (e.g. Flask, Pattern, Corina, Durotar)..." value="${esc(state.q)}" aria-label="Search items and vendors">
            ${state.q ? `<button type="button" id="vd-search-clear" class="vd-search-clear" aria-label="Clear search">✕</button>` : ''}
          </div>

          <!-- Category & Subcategory 2-Tier Bar -->
          <div class="vd-taxonomy-controls">
            <div class="vd-taxonomy-group">
              <label for="vd-cat-select" class="vd-filter-label">Category:</label>
              <select id="vd-cat-select" class="vd-select" aria-label="Select Category">
                ${Object.entries(TAXONOMY).map(([key, cat]) => `
                  <option value="${key}" ${state.cat === key ? 'selected' : ''}>${cat.label}</option>
                `).join('')}
              </select>
            </div>

            <div class="vd-taxonomy-group" id="vd-subcat-wrapper" ${currentTaxonomy.subcategories.length <= 1 ? 'style="display:none;"' : ''}>
              <label for="vd-subcat-select" class="vd-filter-label">Subcategory:</label>
              <select id="vd-subcat-select" class="vd-select" aria-label="Select Subcategory">
                ${currentTaxonomy.subcategories.map(sub => `
                  <option value="${sub.id}" ${state.subCat === sub.id ? 'selected' : ''}>${sub.label}</option>
                `).join('')}
              </select>
            </div>

            <!-- Quality Filter -->
            <div class="vd-taxonomy-group">
              <label for="vd-quality-select" class="vd-filter-label">Rarity:</label>
              <select id="vd-quality-select" class="vd-select" aria-label="Filter by Item Quality">
                <option value="all" ${state.quality === 'all' ? 'selected' : ''}>All Rarities</option>
                <option value="1" ${state.quality === '1' ? 'selected' : ''} style="color:#f8fafc;">Common (White)</option>
                <option value="2" ${state.quality === '2' ? 'selected' : ''} style="color:#1eff00;">Uncommon (Green)</option>
                <option value="3" ${state.quality === '3' ? 'selected' : ''} style="color:#0070dd;">Rare (Blue)</option>
                <option value="4" ${state.quality === '4' ? 'selected' : ''} style="color:#a335ee;">Epic (Purple)</option>
                <option value="0" ${state.quality === '0' ? 'selected' : ''} style="color:#9d9d9d;">Poor (Grey)</option>
              </select>
            </div>

            <!-- Currency / Payment Type Filter -->
            <div class="vd-taxonomy-group">
              <label for="vd-curr-select" class="vd-filter-label">Currency:</label>
              <select id="vd-curr-select" class="vd-select" aria-label="Filter by Currency">
                <option value="all" ${state.currencyType === 'all' ? 'selected' : ''}>All Currencies</option>
                <option value="money" ${state.currencyType === 'money' ? 'selected' : ''}>Gold / Silver Only</option>
                <option value="special" ${state.currencyType === 'special' ? 'selected' : ''}>Special Currencies (Favor/Honor)</option>
              </select>
            </div>
          </div>

          <div class="vd-filter-controls">
            <!-- Faction Pills -->
            <div class="vd-filter-group" role="group" aria-label="Faction Filter">
              <span class="vd-filter-label">Faction:</span>
              <button type="button" class="vd-pill-btn ${state.faction === 'all' ? 'active' : ''}" data-faction="all">All</button>
              <button type="button" class="vd-pill-btn ${state.faction === 'alliance' ? 'active' : ''}" data-faction="alliance" style="--accent:#3b82f6;">Alliance</button>
              <button type="button" class="vd-pill-btn ${state.faction === 'horde' ? 'active' : ''}" data-faction="horde" style="--accent:#ef4444;">Horde</button>
              <button type="button" class="vd-pill-btn ${state.faction === 'neutral' ? 'active' : ''}" data-faction="neutral" style="--accent:#eab308;">Neutral</button>
            </div>

            <!-- Supply Pills -->
            <div class="vd-filter-group" role="group" aria-label="Supply Filter">
              <span class="vd-filter-label">Supply:</span>
              <button type="button" class="vd-pill-btn ${!state.limOnly ? 'active' : ''}" id="vd-toggle-all-supply">All Goods</button>
              <button type="button" class="vd-pill-btn ${state.limOnly ? 'active' : ''}" id="vd-toggle-lim">Limited Stock</button>
              <button type="button" class="vd-pill-btn ${state.seenOnly ? 'active' : ''}" id="vd-toggle-seen">Seen in Forever</button>
            </div>

            <!-- Sort Dropdown -->
            <div class="vd-filter-group">
              <label for="vd-sort-select" class="vd-filter-label">Sort:</label>
              <select id="vd-sort-select" class="vd-select" aria-label="Sort order">
                <option value="default" ${state.sort === 'default' ? 'selected' : ''}>Relevance</option>
                <option value="name" ${state.sort === 'name' ? 'selected' : ''}>Name (A-Z)</option>
                <option value="price-asc" ${state.sort === 'price-asc' ? 'selected' : ''}>Price: Low → High</option>
                <option value="price-desc" ${state.sort === 'price-desc' ? 'selected' : ''}>Price: High → Low</option>
                <option value="vendors-desc" ${state.sort === 'vendors-desc' ? 'selected' : ''}>Most Vendors</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Dynamic Subview Container -->
        <div id="vd-subview-container" class="vd-subview-container"></div>
      </div>
    `;

    bindEvents(mount);
    renderSubView();
  };

  let debounceTimer = null;

  function bindEvents(mount) {
    // Sub-tab switching
    mount.querySelectorAll('.vd-subnav-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const targetTab = btn.getAttribute('data-subtab');
        if (targetTab === state.tab) return;
        state.tab = targetTab;
        mount.querySelectorAll('.vd-subnav-btn').forEach(b => {
          b.classList.toggle('active', b.getAttribute('data-subtab') === targetTab);
          b.setAttribute('aria-selected', b.getAttribute('data-subtab') === targetTab);
        });
        renderSubView();
      });
    });

    // Quick-Filter Chips
    mount.querySelectorAll('.vd-chip-btn').forEach(chipBtn => {
      chipBtn.addEventListener('click', () => {
        const chipId = chipBtn.getAttribute('data-chip');
        state.chip = chipId;

        // Synchronize primary and subcategory dropdowns based on chip
        if (chipId === 'all') {
          state.cat = 'all';
          state.subCat = 'all';
          state.limOnly = false;
        } else if (chipId === 'limited') {
          state.limOnly = true;
          state.cat = 'all';
          state.subCat = 'all';
        } else if (['cooking', 'books', 'tailoring', 'leatherworking', 'blacksmithing', 'alchemy', 'engineering', 'enchanting'].includes(chipId)) {
          state.cat = 'recipes';
          state.subCat = chipId;
          state.limOnly = false;
        } else if (chipId === 'bags') {
          state.cat = 'bags_tools';
          state.subCat = 'bagstool_bags';
          state.limOnly = false;
        } else if (chipId === 'mounts_pets') {
          state.cat = 'mounts_pets';
          state.subCat = 'all';
          state.limOnly = false;
        } else if (chipId === 'weapons') {
          state.cat = 'weapons';
          state.subCat = 'all';
          state.limOnly = false;
        } else if (chipId === 'armor') {
          state.cat = 'armor';
          state.subCat = 'all';
          state.limOnly = false;
        } else if (chipId === 'food') {
          state.cat = 'consumables';
          state.subCat = 'cons_food';
          state.limOnly = false;
        } else if (chipId === 'potions') {
          state.cat = 'consumables';
          state.subCat = 'cons_potions';
          state.limOnly = false;
        } else if (chipId === 'poisons') {
          state.cat = 'consumables';
          state.subCat = 'cons_poisons';
          state.limOnly = false;
        }

        // Re-render to update active chip and taxonomy dropdowns
        window.renderVendors();
      });
    });

    // Primary Category Select
    const catSelect = mount.querySelector('#vd-cat-select');
    if (catSelect) {
      catSelect.addEventListener('change', (e) => {
        state.cat = e.target.value;
        state.subCat = 'all';
        state.chip = 'all';
        window.renderVendors();
      });
    }

    // Subcategory Select
    const subcatSelect = mount.querySelector('#vd-subcat-select');
    if (subcatSelect) {
      subcatSelect.addEventListener('change', (e) => {
        state.subCat = e.target.value;
        renderSubView();
      });
    }

    // Quality Select
    const qualitySelect = mount.querySelector('#vd-quality-select');
    if (qualitySelect) {
      qualitySelect.addEventListener('change', (e) => {
        state.quality = e.target.value;
        renderSubView();
      });
    }

    // Currency Select
    const currSelect = mount.querySelector('#vd-curr-select');
    if (currSelect) {
      currSelect.addEventListener('change', (e) => {
        state.currencyType = e.target.value;
        renderSubView();
      });
    }

    // Search input
    const searchInput = mount.querySelector('#vd-search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        state.q = e.target.value.trim();
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
          renderSubView();
        }, 200);
      });
    }

    // Clear search
    const clearBtn = mount.querySelector('#vd-search-clear');
    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        state.q = '';
        if (searchInput) searchInput.value = '';
        renderSubView();
      });
    }

    // Faction buttons
    mount.querySelectorAll('[data-faction]').forEach(btn => {
      btn.addEventListener('click', () => {
        state.faction = btn.getAttribute('data-faction');
        mount.querySelectorAll('[data-faction]').forEach(b => b.classList.toggle('active', b === btn));
        renderSubView();
      });
    });

    // Supply toggles
    const allSupplyBtn = mount.querySelector('#vd-toggle-all-supply');
    const limBtn = mount.querySelector('#vd-toggle-lim');
    const seenBtn = mount.querySelector('#vd-toggle-seen');

    if (allSupplyBtn) {
      allSupplyBtn.addEventListener('click', () => {
        state.limOnly = false;
        allSupplyBtn.classList.add('active');
        if (limBtn) limBtn.classList.remove('active');
        renderSubView();
      });
    }

    if (limBtn) {
      limBtn.addEventListener('click', () => {
        state.limOnly = !state.limOnly;
        limBtn.classList.toggle('active', state.limOnly);
        if (allSupplyBtn) allSupplyBtn.classList.toggle('active', !state.limOnly);
        renderSubView();
      });
    }

    if (seenBtn) {
      seenBtn.addEventListener('click', () => {
        state.seenOnly = !state.seenOnly;
        seenBtn.classList.toggle('active', state.seenOnly);
        renderSubView();
      });
    }

    // Sort select
    const sortSelect = mount.querySelector('#vd-sort-select');
    if (sortSelect) {
      sortSelect.addEventListener('change', (e) => {
        state.sort = e.target.value;
        renderSubView();
      });
    }
  }

  // Initialize on DOM ready
  document.addEventListener('DOMContentLoaded', () => {
    if (window.WOW_VENDORS_DATA) {
      ensureIndex();
    }
  });

})();
