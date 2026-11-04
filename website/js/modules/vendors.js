/**
 * World of Warcraft: Forever - Vendor & Merchant Directory Module
 * Interactive directory of 931 vendors, 1,896 items, profession recipes,
 * limited-supply goods, and zone rosters with coordinate waypoints and /tar macros.
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

  let state = {
    tab: 'find',
    q: '',
    faction: 'all',
    limOnly: false,
    seenOnly: false,
    cat: 'all',
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
        const iconSrc = cur && cur.ic ? `https://foreverdb.net/icons/${cur.ic}.webp` : 'https://foreverdb.net/icons/134400.webp';
        return `<span class="vd-cost-item"${desc}><img src="${iconSrc}" class="vd-cost-icon" alt="" onerror="this.src='https://foreverdb.net/icons/134400.webp'">${qty} × ${esc(name)}</span>`;
      }
      if (type === 'i') {
        const item = items[id];
        const name = item ? item[0] : `Item #${id}`;
        const qColor = item ? QUALITY_COLORS[item[2]] || '#f8fafc' : '#f8fafc';
        const iconSrc = item && item[1] ? `https://foreverdb.net/icons/${item[1]}.webp` : 'https://foreverdb.net/icons/134400.webp';
        return `<span class="vd-cost-item"><img src="${iconSrc}" class="vd-cost-icon" alt="" onerror="this.src='https://foreverdb.net/icons/134400.webp'">${qty} × <span style="color:${qColor};font-weight:600;">${esc(name)}</span></span>`;
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
    const iconSrc = iconId ? `https://foreverdb.net/icons/${iconId}.webp` : 'https://foreverdb.net/icons/134400.webp';
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

    const isRecipe = classId === 9;
    const professionLabel = isRecipe ? (PROFESSION_MAP[subClassId] || 'Recipe') : null;

    return `
      <div class="vd-item-card" data-item-id="${itemId}">
        <div class="vd-item-header">
          <div class="vd-item-identity">
            <img src="${iconSrc}" class="vd-item-icon" alt="" style="border-color:${qColor};" onerror="this.src='https://foreverdb.net/icons/134400.webp'">
            <div>
              <div class="vd-item-name" style="color:${qColor};">
                <a href="https://www.wowhead.com/forever/item=${itemId}" target="_blank" rel="noopener noreferrer" style="color:inherit;text-decoration:none;">
                  ${esc(name)}
                </a>
                ${professionLabel ? `<span class="vd-badge vd-badge-prof">${esc(professionLabel)}</span>` : ''}
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

  function renderFindTab(container, idx) {
    const rawTokens = state.q.toLowerCase().split(/\s+/).filter(Boolean);
    let matchingItemIds = [];

    if (rawTokens.length > 0) {
      for (const [id, item] of Object.entries(idx.items)) {
        const itemName = item[0].toLowerCase();
        const matchesItem = rawTokens.every(tok => itemName.includes(tok));
        if (matchesItem) {
          matchingItemIds.push(id);
          continue;
        }

        // Check if query matches vendor name or zone
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
    } else {
      // Default: show featured recipes & limited goods
      matchingItemIds = Object.keys(idx.items).slice(0, 40);
    }

    // Apply category filter
    if (state.cat !== 'all') {
      matchingItemIds = matchingItemIds.filter(id => {
        const item = idx.items[id];
        if (state.cat === 'recipes') return item[3] === 9;
        if (state.cat === 'gear') return [2, 4].includes(item[3]);
        if (state.cat === 'consumables') return [0, 5, 7].includes(item[3]);
        if (state.cat === 'books') return item[3] === 9 && item[4] === 0;
        return true;
      });
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
    }

    const displayCount = rawTokens.length > 0 ? 50 : 25;
    const cardsHtml = matchingItemIds.slice(0, displayCount).map(id => renderItemCard(id, idx)).filter(Boolean).join('');

    const resultsSummary = rawTokens.length > 0
      ? `<div class="vd-results-count">Found <strong>${matchingItemIds.length}</strong> items matching "${esc(state.q)}"</div>`
      : `<div class="vd-results-count">Showing <strong>${Math.min(matchingItemIds.length, displayCount)}</strong> popular vendor items. Use the search bar above to look up any item or vendor.</div>`;

    container.innerHTML = `
      ${resultsSummary}
      <div class="vd-cards-grid">
        ${cardsHtml.length > 0 ? cardsHtml : `
          <div class="vd-empty-state">
            <span style="font-size:2.2rem;">🔍</span>
            <h3>No vendor items found</h3>
            <p>Try searching for a different item name (e.g. "Flask", "Pattern", "Copper"), vendor name, or zone.</p>
          </div>
        `}
      </div>
      ${matchingItemIds.length > displayCount ? `
        <div class="vd-truncated-notice">
          Showing top ${displayCount} of ${matchingItemIds.length} items. Refine your search query to narrow results.
        </div>
      ` : ''}
    `;
  }

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
          const iconSrc = item[1] ? `https://foreverdb.net/icons/${item[1]}.webp` : 'https://foreverdb.net/icons/134400.webp';
          return `
            <a class="vd-zone-item-pill" href="https://www.wowhead.com/forever/item=${itemId}" target="_blank" rel="noopener noreferrer" title="${esc(item[0])}${sell.lim ? ` (Limited: ${sell.lim})` : ''}">
              <img src="${iconSrc}" class="vd-pill-icon" alt="" onerror="this.src='https://foreverdb.net/icons/134400.webp'">
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

        <!-- Interactive Search & Filter Toolbar -->
        <div class="vd-filter-toolbar">
          <div class="vd-search-box-wrapper">
            <span class="vd-search-icon">🔍</span>
            <input type="search" id="vd-search-input" class="vd-search-input" placeholder="Search item, recipe, vendor name, or zone (e.g. Flask, Pattern, Corina, Durotar)..." value="${esc(state.q)}" aria-label="Search items and vendors">
            ${state.q ? `<button type="button" id="vd-search-clear" class="vd-search-clear" aria-label="Clear search">✕</button>` : ''}
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
