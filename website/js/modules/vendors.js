/**
 * World of Warcraft: Forever - Vendor & Merchant Directory Module
 * Interactive directory of every vendor, what they sell, recipe skill and reputation
 * requirements, limited-supply goods, and zone rosters with /way waypoints and /tar macros.
 * Data: js/data/vendors-data.js (scripts/scrape_foreverdb_vendors.js). Taxonomy: js/modules/vendors/vendors-taxonomy.js.
 */
(function () {
  'use strict';

  const { PROFESSION_MAP, TAXONOMY, QUICK_CHIPS, classifyItem } = window.VendorTaxonomy;

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

  const SUB_TABS = [
    { id: 'find', label: 'Find an Item', icon: '🔍' },
    { id: 'recipes', label: 'Recipes', icon: '📜' },
    { id: 'limited', label: 'Limited Supply', icon: '⏳' },
    { id: 'zones', label: 'By Zone', icon: '🗺️' }
  ];

  const PAGE_SIZE = 36;
  const FALLBACK_ICON = 'images/icons/vendors/134400.webp';

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
    sort: 'default',
    limit: PAGE_SIZE
  };

  let indexCache = null;

  function esc(str) {
    if (str === null || str === undefined || str === '') return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function getIconUrl(iconId) {
    const id = Number(iconId) || 134400;
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

  /** One faction rule for every view: neutral vendors serve both factions. */
  function vendorMatchesFaction(v) {
    if (state.faction === 'all') return true;
    const side = (v.side || 'Neutral').toLowerCase();
    if (state.faction === 'neutral') return side === 'neutral';
    return side === state.faction || side === 'neutral';
  }

  /** Vendors of an item that pass the vendor-level filters (faction, seen, limited). */
  function visibleVendorsFor(itemId, idx) {
    return (idx.itemVendorsMap.get(itemId) || []).filter(([v, s]) =>
      vendorMatchesFaction(v) &&
      (!state.seenOnly || v.fv) &&
      (!state.limOnly || s.lim)
    );
  }

  function ensureIndex() {
    if (indexCache) return indexCache;
    const data = window.WOW_VENDORS_DATA;
    if (!data || !data.vendors || !data.items) return null;

    const vendorList = Object.entries(data.vendors).map(([id, v]) => ({ id: Number(id), ...v }));

    // Invert mapping: itemId -> Array of [vendor, sellDetails]
    const itemVendorsMap = new Map();
    for (const v of vendorList) {
      for (const [itemId, sell] of Object.entries(v.sells || {})) {
        if (!itemVendorsMap.has(itemId)) itemVendorsMap.set(itemId, []);
        itemVendorsMap.get(itemId).push([v, sell]);
      }
    }

    // Sort vendors per item: seen in Forever first, then in Forever with Classic stock, then faction, then zone
    const rank = v => (v.fv ? 2 : v.met ? 1 : 0);
    for (const list of itemVendorsMap.values()) {
      list.sort((a, b) => {
        if (rank(b[0]) !== rank(a[0])) return rank(b[0]) - rank(a[0]);
        const sideA = a[0].side || 'Neutral';
        const sideB = b[0].side || 'Neutral';
        if (sideA !== sideB) return sideA.localeCompare(sideB);
        return (a[0].zone || '').localeCompare(b[0].zone || '');
      });
    }

    const req = data.req || {};
    const meta = {};
    const catCounts = {};
    let totalLimited = 0;
    let totalRecipes = 0;
    for (const [itemId, item] of Object.entries(data.items)) {
      const info = classifyItem(item);
      const vendors = itemVendorsMap.get(itemId) || [];
      const goldPrices = vendors.map(([, s]) => s.p || 0).filter(p => p > 0);
      const r = req[itemId] || {};
      meta[itemId] = {
        info,
        minPrice: goldPrices.length ? Math.min(...goldPrices) : null,
        hasToken: vendors.some(([, s]) => s.c && s.c.length > 0),
        hasLim: vendors.some(([, s]) => s.lim),
        search: [item[0], r.t, r.rep && r.rep[0]].filter(Boolean).join(' ').toLowerCase()
      };
      catCounts[info.cat] = catCounts[info.cat] || { all: 0 };
      catCounts[info.cat].all++;
      catCounts[info.cat][info.sub] = (catCounts[info.cat][info.sub] || 0) + 1;
      if (item[3] === 9) totalRecipes++;
      if (meta[itemId].hasLim) totalLimited++;
    }

    const zones = Array.from(new Set(vendorList.map(v => v.zone).filter(Boolean))).sort();

    indexCache = {
      raw: data,
      vendors: vendorList,
      items: data.items,
      req,
      meta,
      catCounts,
      currencies: data.currencies || {},
      costItems: data.costItems || {},
      factions: data.factions || {},
      itemVendorsMap,
      zones,
      stats: {
        vendorCount: vendorList.length,
        seenCount: vendorList.filter(v => v.fv).length,
        itemCount: Object.keys(data.items).length,
        recipeCount: totalRecipes,
        limitedCount: totalLimited,
        zoneCount: zones.length
      }
    };

    return indexCache;
  }

  function renderCosts(costs, idx) {
    if (!costs || !costs.length) return '';
    return costs.map(([type, id, qty]) => {
      if (type === 'c') {
        const cur = idx.currencies[id];
        const name = cur ? cur.n : `Currency #${id}`;
        const desc = cur && cur.d ? ` title="${esc(cur.d)}"` : '';
        const iconSrc = getIconUrl(cur && cur.ic);
        return `<span class="vd-cost-item"${desc}><img src="${iconSrc}" class="vd-cost-icon" alt="" onerror="this.src='${FALLBACK_ICON}'">${qty} × ${esc(name)}</span>`;
      }
      if (type === 'i') {
        const item = idx.items[id];
        const token = idx.costItems[id];
        const name = item ? item[0] : token ? token.n : `Item #${id}`;
        const quality = item ? item[2] : token ? token.q : 1;
        const qColor = QUALITY_COLORS[quality] || '#f8fafc';
        const iconSrc = item ? getIconUrl(item[1]) : token ? `images/icons/vendors/named/${token.icon}.jpg` : FALLBACK_ICON;
        return `<span class="vd-cost-item"><img src="${iconSrc}" class="vd-cost-icon" alt="" onerror="this.src='${FALLBACK_ICON}'">${qty} × <span style="color:${qColor};font-weight:600;">${esc(name)}</span></span>`;
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

  function vendorById(id) {
    const idx = ensureIndex();
    return idx ? idx.vendors.find(v => v.id === Number(id)) : null;
  }

  window.vdCopyMacro = function (vendorId, btn) {
    const v = vendorById(vendorId);
    if (v) copyToClipboard(`/tar ${v.n}`, btn, 'Macro Copied!');
  };

  window.vdCopyWaypoint = function (vendorId, btn) {
    const v = vendorById(vendorId);
    if (v) copyToClipboard(`/way ${v.zone} ${v.x} ${v.y} ${v.n}`, btn, 'Waypoint Copied!');
  };

  function locationHtml(v) {
    if (v.noWay) {
      return `<span class="vd-loc-note" title="ForeverDB only has continent-level coordinates for this vendor">📍 ${esc(v.loc || v.zone)}</span>`;
    }
    return `
      <span class="vd-coords">(${v.x}, ${v.y})</span>
      <button type="button" class="vd-inline-btn" onclick="vdCopyWaypoint(${v.id}, this)" title="Copy /way waypoint command" aria-label="Copy waypoint">📍 /way</button>`;
  }

  function vendorStatusBadge(v) {
    if (v.fv) return `<span class="vd-badge vd-badge-fv" title="A player's ForeverDB addon recorded this vendor's stock in WoW Forever">Seen in Forever</span>`;
    if (v.met) return `<span class="vd-badge vd-badge-met" title="This NPC exists in WoW Forever, but the list shown is its Classic stock">In Forever · Classic stock</span>`;
    return `<span class="vd-badge vd-badge-cl" title="Classic (CMaNGOS) data, not yet confirmed in WoW Forever">Classic Data</span>`;
  }

  function discountHtml(v, idx) {
    const faction = v.rf && idx.factions[v.rf];
    return faction ? `<span class="vd-badge vd-badge-disc" title="Higher reputation with this faction lowers this vendor's prices">Rep discount: ${esc(faction)}</span>` : '';
  }

  function renderVendorLine(vendor, sell, idx) {
    const sideColor = FACTION_COLORS[vendor.side] || '#94a3b8';
    const sideName = vendor.side || 'Neutral';
    const moneyStr = sell && sell.p ? formatMoney(sell.p) : '';
    const costStr = sell && sell.c ? renderCosts(sell.c, idx) : '';
    const priceSeparator = (moneyStr && costStr) ? ' + ' : '';
    const priceHtml = (moneyStr || costStr)
      ? `<span class="vd-price-badge">${moneyStr}${priceSeparator}${costStr}${sell.n > 1 ? ` <small class="vd-qty-sub">for ${sell.n}</small>` : ''}</span>`
      : '';

    const limHtml = sell && sell.lim
      ? `<span class="vd-badge vd-badge-lim" title="Limited vendor supply; restocks over time">Limited: ${sell.lim}</span>`
      : '';
    const goneHtml = sell && sell.cl
      ? `<span class="vd-badge vd-badge-gone" title="Classic sells this in limited supply, but it was missing when a player checked this vendor in Forever: sold out at the time, or removed">May be gone in Forever</span>`
      : '';

    return `
      <div class="vd-vendor-row">
        <div class="vd-vendor-info">
          <span class="vd-vendor-name">
            <strong>${esc(vendor.n)}</strong>
            ${vendor.sub ? `<span class="vd-vendor-title">&lt;${esc(vendor.sub)}&gt;</span>` : ''}
          </span>
          <span class="vd-vendor-loc">
            <span class="vd-zone-pill">${esc(vendor.zone)}${vendor.hub ? ` · ${esc(vendor.hub)}` : ''}</span>
            ${locationHtml(vendor)}
            <button type="button" class="vd-inline-btn" onclick="vdCopyMacro(${vendor.id}, this)" title="Copy /target macro" aria-label="Copy target macro">🎯 /tar</button>
          </span>
          <span class="vd-vendor-faction" style="color:${sideColor};">● ${esc(sideName)}</span>
        </div>
        <div class="vd-vendor-pricing">
          ${priceHtml}
          ${limHtml}
          ${goneHtml}
          ${vendorStatusBadge(vendor)}
          ${discountHtml(vendor, idx)}
        </div>
      </div>
    `;
  }

  function requirementsHtml(itemId, idx) {
    const r = idx.req[itemId];
    if (!r) return '';
    const parts = [];
    if (r.sk) parts.push(`<span class="vd-req" title="Required profession skill">🛠️ ${esc(r.sk[0])} ${r.sk[1]}</span>`);
    if (r.sp) parts.push(`<span class="vd-req" title="Required specialization">⭐ ${esc(r.sp)}</span>`);
    if (r.rep) parts.push(`<span class="vd-badge vd-badge-rep" title="Reputation needed to buy or use this item">${esc(r.rep[0])} · ${esc(r.rep[1])}</span>`);
    if (r.lv && r.lv > 1) parts.push(`<span class="vd-req" title="Required character level">Lvl ${r.lv}</span>`);
    const teaches = r.t ? `<div class="vd-teaches">Teaches: ${esc(r.t)}</div>` : '';
    return (parts.length ? `<div class="vd-req-row">${parts.join('')}</div>` : '') + teaches;
  }

  function renderItemCard(itemId, idx, showAllVendors = false) {
    const item = idx.items[itemId];
    if (!item) return '';

    const [name, iconId, quality] = item;
    const qColor = QUALITY_COLORS[quality] || '#f8fafc';
    const visibleVendors = visibleVendorsFor(itemId, idx);
    if (visibleVendors.length === 0) return '';

    const displayedVendors = showAllVendors ? visibleVendors : visibleVendors.slice(0, 6);
    const hasMore = visibleVendors.length > 6 && !showAllVendors;
    const vendorRows = displayedVendors.map(([v, s]) => renderVendorLine(v, s, idx)).join('');
    const classification = idx.meta[itemId].info;

    return `
      <div class="vd-item-card" data-item-id="${itemId}" data-item-name="${esc(name)}" data-item-quality="q${quality}">
        <div class="vd-item-header">
          <div class="vd-item-identity" data-item-id="${itemId}" data-item-name="${esc(name)}">
            <img src="${getIconUrl(iconId)}" class="vd-item-icon" alt="" style="border-color:${qColor};" onerror="this.src='${FALLBACK_ICON}'">
            <div>
              <div class="vd-item-name" style="color:${qColor};">
                <a href="https://www.wowhead.com/forever/item=${itemId}" target="_blank" rel="noopener noreferrer" style="color:inherit;text-decoration:none;" data-item-id="${itemId}" data-item-name="${esc(name)}">
                  ${esc(name)}
                </a>
                ${classification.label ? `<span class="vd-badge vd-badge-prof">${esc(classification.label)}</span>` : ''}
              </div>
              ${requirementsHtml(itemId, idx)}
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

  /** Item-level filters. Vendor-level filters (faction, seen, limited) go through visibleVendorsFor. */
  function itemMatchesFilters(id, item, idx) {
    const m = idx.meta[id];
    if (state.cat !== 'all') {
      if (m.info.cat !== state.cat) return false;
      if (state.subCat !== 'all' && m.info.sub !== state.subCat) return false;
    }
    if (state.quality !== 'all' && Number(item[2]) !== Number(state.quality)) return false;
    if (state.currencyType === 'special' && !m.hasToken) return false;
    if (state.currencyType === 'money' && m.hasToken) return false;
    return visibleVendorsFor(id, idx).length > 0;
  }

  function queryTokens() {
    return state.q.toLowerCase().split(/\s+/).filter(Boolean);
  }

  /** Matches item name, what a recipe teaches, required reputation, or any vendor's name/title/zone. */
  function itemMatchesQuery(id, idx, tokens) {
    if (tokens.length === 0) return true;
    const text = idx.meta[id].search;
    if (tokens.every(tok => text.includes(tok))) return true;
    return visibleVendorsFor(id, idx).some(([v]) => {
      const hay = `${v.n || ''} ${v.sub || ''} ${v.zone || ''} ${v.hub || ''} ${v.loc || ''}`.toLowerCase();
      return tokens.every(tok => hay.includes(tok));
    });
  }

  function matchingIds(idx, extra) {
    const tokens = queryTokens();
    return Object.keys(idx.items).filter(id =>
      (!extra || extra(id)) &&
      itemMatchesFilters(id, idx.items[id], idx) &&
      itemMatchesQuery(id, idx, tokens)
    );
  }

  function sortIds(ids, idx) {
    const byName = (a, b) => idx.items[a][0].localeCompare(idx.items[b][0]);
    if (state.sort === 'name') return ids.sort(byName);
    if (state.sort === 'price-asc' || state.sort === 'price-desc') {
      // Cheapest gold price across vendors; token-only items always go last
      const dir = state.sort === 'price-asc' ? 1 : -1;
      return ids.sort((a, b) => {
        const pa = idx.meta[a].minPrice;
        const pb = idx.meta[b].minPrice;
        if (pa === null || pb === null) return (pa === null) - (pb === null) || byName(a, b);
        return (pa - pb) * dir || byName(a, b);
      });
    }
    if (state.sort === 'vendors-desc') {
      return ids.sort((a, b) => (idx.itemVendorsMap.get(b) || []).length - (idx.itemVendorsMap.get(a) || []).length || byName(a, b));
    }
    if (state.sort === 'skill') {
      const sk = id => (idx.req[id] && idx.req[id].sk ? idx.req[id].sk[1] : 9999);
      return ids.sort((a, b) => sk(a) - sk(b) || byName(a, b));
    }
    return ids;
  }

  function emptyState(what) {
    return `
      <div class="vd-empty-state">
        <span style="font-size:2.4rem;">🔍</span>
        <h3>No ${what} match your selected filters</h3>
        <p>Try resetting filters or searching for something else (e.g. "Flask", "Timbermaw", "Mithril", "Booty Bay").</p>
        <button type="button" class="vd-btn-reset" onclick="window.vdResetFilters()">Reset All Filters</button>
      </div>`;
  }

  function renderFindTab(container, idx) {
    const ids = sortIds(matchingIds(idx), idx);
    const shown = ids.slice(0, state.limit);
    const cardsHtml = shown.map(id => renderItemCard(id, idx)).join('');
    const q = state.q ? ` matching "${esc(state.q)}"` : '';

    container.innerHTML = `
      <div class="vd-results-count">Showing <strong>${shown.length}</strong> of <strong>${ids.length}</strong> items${q}.</div>
      <div class="vd-cards-grid">
        ${cardsHtml || emptyState('items')}
      </div>
      ${ids.length > shown.length ? `
        <div class="vd-show-more-wrap">
          <button type="button" class="vd-btn-reset" id="vd-show-more">Show ${Math.min(PAGE_SIZE, ids.length - shown.length)} more (${ids.length - shown.length} left)</button>
        </div>
      ` : ''}
    `;
    const more = container.querySelector('#vd-show-more');
    if (more) {
      more.addEventListener('click', () => {
        state.limit += PAGE_SIZE;
        renderSubView();
      });
    }
  }

  window.vdResetFilters = function () {
    Object.assign(state, {
      chip: 'all', cat: 'all', subCat: 'all', faction: 'all', quality: 'all',
      currencyType: 'all', limOnly: false, seenOnly: false, q: '', limit: PAGE_SIZE
    });
    window.renderVendors();
  };

  function renderRecipesTab(container, idx) {
    const recipeIds = matchingIds(idx, id => idx.items[id][3] === 9);
    // Recipes read best in learning order: by required skill, then name
    const skillOf = id => (idx.req[id] && idx.req[id].sk ? idx.req[id].sk[1] : 9999);
    const sections = Object.entries(PROFESSION_MAP).map(([subId, profName]) => {
      const items = recipeIds
        .filter(id => idx.items[id][4] === Number(subId))
        .sort((a, b) => skillOf(a) - skillOf(b) || idx.items[a][0].localeCompare(idx.items[b][0]));
      return { name: profName, items };
    }).filter(sec => sec.items.length > 0);

    const totalMatching = sections.reduce((acc, sec) => acc + sec.items.length, 0);
    const open = sections.length === 1 || !!state.q;

    const accordionsHtml = sections.map(sec => `
      <details class="vd-accordion-group" ${open ? 'open' : ''}>
        <summary class="vd-accordion-summary">
          <span class="vd-accordion-title">
            <strong>${esc(sec.name)}</strong>
            <span class="vd-badge vd-badge-count">${sec.items.length} recipes</span>
          </span>
          <span class="vd-accordion-arrow">▾</span>
        </summary>
        <div class="vd-cards-grid vd-cards-compact" data-lazy-recipes="${esc(sec.name)}">
          ${open ? sec.items.map(id => renderItemCard(id, idx)).join('') : ''}
        </div>
      </details>
    `).join('');

    container.innerHTML = `
      <div class="vd-tab-intro">
        <p><strong>${totalMatching} profession recipes, formulas, patterns and class grimoires</strong> match your filters, listed in skill order with the profession skill, specialization and reputation each one needs.</p>
      </div>
      ${accordionsHtml || emptyState('recipes')}
    `;

    // Render each profession's cards the first time it is opened (hundreds of cards otherwise)
    container.querySelectorAll('details.vd-accordion-group').forEach((det, i) => {
      det.addEventListener('toggle', () => {
        const grid = det.querySelector('[data-lazy-recipes]');
        if (det.open && grid && !grid.childElementCount) {
          grid.innerHTML = sections[i].items.map(id => renderItemCard(id, idx)).join('');
        }
      });
    });
  }

  function renderLimitedTab(container, idx) {
    const ids = matchingIds(idx, id => idx.meta[id].hasLim)
      .sort((a, b) => idx.items[a][0].localeCompare(idx.items[b][0]));
    const cardsHtml = ids.map(id => renderItemCard(id, idx)).join('');

    container.innerHTML = `
      <div class="vd-tab-intro">
        <p><strong>Limited-Supply Goods (${ids.length} items):</strong> recipes, mount bridles, companion pets and crafting goods with a small vendor stock that restocks over time. Items marked "May be gone in Forever" were missing when a player checked that vendor.</p>
      </div>
      <div class="vd-cards-grid">
        ${cardsHtml || emptyState('limited-supply items')}
      </div>
    `;
  }

  function renderZonesTab(container, idx) {
    const tokens = queryTokens();
    const hubsByZone = {};
    idx.vendors.forEach(v => { if (v.hub) hubsByZone[v.zone] = `${hubsByZone[v.zone] || ''} ${v.hub}`; });
    const zonesList = idx.zones.filter(zone => {
      const hay = `${zone} ${hubsByZone[zone] || ''}`.toLowerCase();
      return tokens.every(tok => hay.includes(tok));
    });
    const hasActiveFilters = state.quality !== 'all' || state.cat !== 'all' || state.currencyType !== 'all' || state.limOnly;

    const zoneAccordions = zonesList.map(zone => {
      const zoneVendors = idx.vendors
        .filter(v => v.zone === zone && vendorMatchesFaction(v) && (!state.seenOnly || v.fv))
        .sort((a, b) => (a.n || '').localeCompare(b.n || ''));

      const vendorsHtml = zoneVendors.map(v => {
        const sideColor = FACTION_COLORS[v.side] || '#94a3b8';
        const sellEntries = Object.entries(v.sells || {});
        const filteredSells = hasActiveFilters
          ? sellEntries.filter(([itemId, sell]) => {
              const itm = idx.items[itemId];
              if (!itm || (state.limOnly && !sell.lim)) return false;
              const m = idx.meta[itemId];
              if (state.cat !== 'all' && (m.info.cat !== state.cat || (state.subCat !== 'all' && m.info.sub !== state.subCat))) return false;
              if (state.quality !== 'all' && Number(itm[2]) !== Number(state.quality)) return false;
              if (state.currencyType === 'special' && !(sell.c && sell.c.length)) return false;
              if (state.currencyType === 'money' && sell.c && sell.c.length) return false;
              return true;
            })
          : sellEntries;

        if (filteredSells.length === 0 && hasActiveFilters) return '';

        const displaySells = filteredSells.slice(0, 24);
        const hasMore = filteredSells.length > 24;

        const itemsPills = displaySells.map(([itemId, sell]) => {
          const item = idx.items[itemId];
          if (!item) return '';
          const qColor = QUALITY_COLORS[item[2]] || '#f8fafc';
          return `
            <a class="vd-zone-item-pill" href="https://www.wowhead.com/forever/item=${itemId}" target="_blank" rel="noopener noreferrer" data-item-id="${itemId}" data-item-name="${esc(item[0])}" data-item-quality="q${item[2]}">
              <img src="${getIconUrl(item[1])}" class="vd-pill-icon" alt="" onerror="this.src='${FALLBACK_ICON}'">
              <span style="color:${qColor};">${esc(item[0])}</span>
              ${sell.lim ? `<span class="vd-lim-mini">${sell.lim}</span>` : ''}
            </a>
          `;
        }).join('');

        return `
          <div class="vd-zone-vendor-card">
            <div class="vd-zone-vendor-header">
              <span class="vd-vendor-title-block">
                <strong>${esc(v.n)}</strong>
                ${v.sub ? `<span class="vd-vendor-sub">&lt;${esc(v.sub)}&gt;</span>` : ''}
                ${v.hub ? `<span class="vd-zone-pill">${esc(v.hub)}</span>` : ''}
                <span class="vd-faction-dot" style="color:${sideColor};">● ${esc(v.side || 'Neutral')}</span>
                ${vendorStatusBadge(v)}
                ${discountHtml(v, idx)}
              </span>
              <span class="vd-loc-actions">
                ${locationHtml(v)}
                <button type="button" class="vd-inline-btn" onclick="vdCopyMacro(${v.id}, this)" aria-label="Copy macro">🎯 /tar</button>
              </span>
            </div>
            <div class="vd-zone-vendor-sells">
              ${itemsPills}
              ${hasMore ? `<span class="vd-zone-more-tag">+${filteredSells.length - 24} more goods</span>` : ''}
            </div>
          </div>
        `;
      }).filter(Boolean);

      if (vendorsHtml.length === 0) return '';

      return `
        <details class="vd-accordion-group">
          <summary class="vd-accordion-summary">
            <span class="vd-accordion-title">
              <strong>${esc(zone)}</strong>
              <span class="vd-badge vd-badge-count">${vendorsHtml.length} vendors</span>
            </span>
            <span class="vd-accordion-arrow">▾</span>
          </summary>
          <div class="vd-zone-vendors-container">
            ${vendorsHtml.join('')}
          </div>
        </details>
      `;
    }).filter(Boolean);

    container.innerHTML = `
      <div class="vd-tab-intro">
        <p>Vendors in <strong>${zoneAccordions.length} zones</strong> with coordinates, faction, reputation discounts and full merchandise lists. The search box filters zone and town names on this tab.</p>
      </div>
      ${zoneAccordions.join('') || `
        <div class="vd-empty-state">
          <p>No zones match "${esc(state.q)}" with your current filters.</p>
        </div>
      `}
    `;
  }

  function renderSubView() {
    const container = document.getElementById('vd-subview-container');
    if (!container) return;
    const idx = ensureIndex();
    if (!idx) return;

    if (state.tab === 'find') renderFindTab(container, idx);
    else if (state.tab === 'recipes') renderRecipesTab(container, idx);
    else if (state.tab === 'limited') renderLimitedTab(container, idx);
    else if (state.tab === 'zones') renderZonesTab(container, idx);
  }

  /** Any filter change starts the item list from the first page again. */
  function refresh() {
    state.limit = PAGE_SIZE;
    renderSubView();
  }

  function withCount(label, n) {
    return n ? `${label} (${n.toLocaleString('en-US')})` : label;
  }

  function formatDate(iso) {
    const d = iso ? new Date(iso) : null;
    return d && !isNaN(d) ? d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) : '';
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

    const { stats, catCounts } = idx;
    const n = x => x.toLocaleString('en-US');
    const currentTaxonomy = TAXONOMY[state.cat] || TAXONOMY.all;
    const updated = formatDate(idx.raw.sourceFetchedAt || idx.raw.generatedAt);

    mount.innerHTML = `
      <div class="vd-container">
        <div class="section-heading-bar">
          <div>
            <h2><span>🏪</span> WoW Forever Vendor Directory (${n(stats.vendorCount)} Vendors &amp; ${n(stats.itemCount)} Items)</h2>
            <p class="section-subtext">Who sells what in WoW Forever and where they stand: ${n(stats.vendorCount)} vendors and ${n(stats.itemCount)} items, with recipe skill and reputation requirements, limited-supply goods, coordinates, and 1-click /way and /tar macros.</p>
            <div class="vd-stats-badges-row">
              <span class="vd-stat-pill"><strong>${n(stats.vendorCount)}</strong> Vendors</span>
              <span class="vd-stat-pill" title="Vendors whose stock a player recorded in WoW Forever"><strong>${n(stats.seenCount)}</strong> Seen in Forever</span>
              <span class="vd-stat-pill"><strong>${n(stats.itemCount)}</strong> Unique Items</span>
              <span class="vd-stat-pill"><strong>${n(stats.recipeCount)}</strong> Profession Recipes</span>
              <span class="vd-stat-pill"><strong>${n(stats.limitedCount)}</strong> Limited Supply</span>
              <span class="vd-stat-pill"><strong>${n(stats.zoneCount)}</strong> Zones</span>
            </div>
            <p class="vd-data-note">Vendor stock from <a href="https://foreverdb.net" target="_blank" rel="noopener noreferrer">ForeverDB</a> player scans${updated ? ` (updated ${updated})` : ''}; requirements from Wowhead Forever. Vendors marked "Classic Data" haven't been confirmed in Forever yet.</p>
          </div>
        </div>

        <div class="vd-subnav-bar" role="tablist" aria-label="Vendor Views">
          ${SUB_TABS.map(tab => `
            <button type="button" class="vd-subnav-btn ${state.tab === tab.id ? 'active' : ''}" data-subtab="${tab.id}" role="tab" aria-selected="${state.tab === tab.id}">
              <span class="vd-subnav-icon">${tab.icon}</span>
              <span class="vd-subnav-label">${tab.label}</span>
            </button>
          `).join('')}
        </div>

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

        <div class="vd-filter-toolbar">
          <div class="vd-search-box-wrapper">
            <span class="vd-search-icon">🔍</span>
            <input type="search" id="vd-search-input" class="vd-search-input" placeholder="Search item, what a recipe makes, reputation, vendor or zone (e.g. Mithril, Timbermaw, Corina, Booty Bay)..." value="${esc(state.q)}" aria-label="Search items and vendors">
            ${state.q ? `<button type="button" id="vd-search-clear" class="vd-search-clear" aria-label="Clear search">✕</button>` : ''}
          </div>

          <div class="vd-taxonomy-controls">
            <div class="vd-taxonomy-group">
              <label for="vd-cat-select" class="vd-filter-label">Category:</label>
              <select id="vd-cat-select" class="vd-select" aria-label="Select Category">
                ${Object.entries(TAXONOMY).map(([key, cat]) => `
                  <option value="${key}" ${state.cat === key ? 'selected' : ''}>${withCount(cat.label, key === 'all' ? 0 : (catCounts[key] || {}).all)}</option>
                `).join('')}
              </select>
            </div>

            <div class="vd-taxonomy-group" id="vd-subcat-wrapper" ${currentTaxonomy.subcategories.length <= 1 ? 'style="display:none;"' : ''}>
              <label for="vd-subcat-select" class="vd-filter-label">Subcategory:</label>
              <select id="vd-subcat-select" class="vd-select" aria-label="Select Subcategory">
                ${currentTaxonomy.subcategories.map(sub => `
                  <option value="${sub.id}" ${state.subCat === sub.id ? 'selected' : ''}>${withCount(sub.label, (catCounts[state.cat] || {})[sub.id])}</option>
                `).join('')}
              </select>
            </div>

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

            <div class="vd-taxonomy-group">
              <label for="vd-curr-select" class="vd-filter-label">Currency:</label>
              <select id="vd-curr-select" class="vd-select" aria-label="Filter by Currency">
                <option value="all" ${state.currencyType === 'all' ? 'selected' : ''}>All Currencies</option>
                <option value="money" ${state.currencyType === 'money' ? 'selected' : ''}>Gold / Silver Only</option>
                <option value="special" ${state.currencyType === 'special' ? 'selected' : ''}>Tokens (Favor, Honor, Marks, Tickets)</option>
              </select>
            </div>
          </div>

          <div class="vd-filter-controls">
            <div class="vd-filter-group" role="group" aria-label="Faction Filter">
              <span class="vd-filter-label">Faction:</span>
              <button type="button" class="vd-pill-btn ${state.faction === 'all' ? 'active' : ''}" data-faction="all">All</button>
              <button type="button" class="vd-pill-btn ${state.faction === 'alliance' ? 'active' : ''}" data-faction="alliance" style="--accent:#3b82f6;" title="Alliance and neutral vendors">Alliance</button>
              <button type="button" class="vd-pill-btn ${state.faction === 'horde' ? 'active' : ''}" data-faction="horde" style="--accent:#ef4444;" title="Horde and neutral vendors">Horde</button>
              <button type="button" class="vd-pill-btn ${state.faction === 'neutral' ? 'active' : ''}" data-faction="neutral" style="--accent:#eab308;">Neutral</button>
            </div>

            <div class="vd-filter-group" role="group" aria-label="Supply Filter">
              <span class="vd-filter-label">Supply:</span>
              <button type="button" class="vd-pill-btn ${!state.limOnly ? 'active' : ''}" id="vd-toggle-all-supply">All Goods</button>
              <button type="button" class="vd-pill-btn ${state.limOnly ? 'active' : ''}" id="vd-toggle-lim">Limited Stock</button>
              <button type="button" class="vd-pill-btn ${state.seenOnly ? 'active' : ''}" id="vd-toggle-seen" title="Only vendors whose stock was recorded in WoW Forever">Seen in Forever</button>
            </div>

            <div class="vd-filter-group">
              <label for="vd-sort-select" class="vd-filter-label">Sort:</label>
              <select id="vd-sort-select" class="vd-select" aria-label="Sort order">
                <option value="default" ${state.sort === 'default' ? 'selected' : ''}>Relevance</option>
                <option value="name" ${state.sort === 'name' ? 'selected' : ''}>Name (A-Z)</option>
                <option value="price-asc" ${state.sort === 'price-asc' ? 'selected' : ''}>Price: Low → High</option>
                <option value="price-desc" ${state.sort === 'price-desc' ? 'selected' : ''}>Price: High → Low</option>
                <option value="skill" ${state.sort === 'skill' ? 'selected' : ''}>Required Skill</option>
                <option value="vendors-desc" ${state.sort === 'vendors-desc' ? 'selected' : ''}>Most Vendors</option>
              </select>
            </div>
          </div>
        </div>

        <div id="vd-subview-container" class="vd-subview-container"></div>
      </div>
    `;

    bindEvents(mount);
    renderSubView();
  };

  let debounceTimer = null;

  function bindEvents(mount) {
    mount.querySelectorAll('.vd-subnav-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const targetTab = btn.getAttribute('data-subtab');
        if (targetTab === state.tab) return;
        state.tab = targetTab;
        mount.querySelectorAll('.vd-subnav-btn').forEach(b => {
          b.classList.toggle('active', b.getAttribute('data-subtab') === targetTab);
          b.setAttribute('aria-selected', b.getAttribute('data-subtab') === targetTab);
        });
        refresh();
      });
    });

    mount.querySelectorAll('.vd-chip-btn').forEach(chipBtn => {
      chipBtn.addEventListener('click', () => {
        const chip = QUICK_CHIPS.find(c => c.id === chipBtn.getAttribute('data-chip'));
        if (!chip) return;
        state.chip = chip.id;
        state.cat = chip.cat;
        state.subCat = chip.sub;
        state.limOnly = !!chip.limOnly;
        state.limit = PAGE_SIZE;
        window.renderVendors();
      });
    });

    const catSelect = mount.querySelector('#vd-cat-select');
    if (catSelect) {
      catSelect.addEventListener('change', (e) => {
        state.cat = e.target.value;
        state.subCat = 'all';
        state.chip = 'all';
        state.limit = PAGE_SIZE;
        window.renderVendors();
      });
    }

    const subcatSelect = mount.querySelector('#vd-subcat-select');
    if (subcatSelect) {
      subcatSelect.addEventListener('change', (e) => {
        state.subCat = e.target.value;
        refresh();
      });
    }

    const qualitySelect = mount.querySelector('#vd-quality-select');
    if (qualitySelect) {
      qualitySelect.addEventListener('change', (e) => {
        state.quality = e.target.value;
        refresh();
      });
    }

    const currSelect = mount.querySelector('#vd-curr-select');
    if (currSelect) {
      currSelect.addEventListener('change', (e) => {
        state.currencyType = e.target.value;
        refresh();
      });
    }

    const searchInput = mount.querySelector('#vd-search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        state.q = e.target.value.trim();
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(refresh, 200);
      });
    }

    const clearBtn = mount.querySelector('#vd-search-clear');
    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        state.q = '';
        if (searchInput) searchInput.value = '';
        refresh();
      });
    }

    mount.querySelectorAll('[data-faction]').forEach(btn => {
      btn.addEventListener('click', () => {
        state.faction = btn.getAttribute('data-faction');
        mount.querySelectorAll('[data-faction]').forEach(b => b.classList.toggle('active', b === btn));
        refresh();
      });
    });

    const allSupplyBtn = mount.querySelector('#vd-toggle-all-supply');
    const limBtn = mount.querySelector('#vd-toggle-lim');
    const seenBtn = mount.querySelector('#vd-toggle-seen');

    if (allSupplyBtn) {
      allSupplyBtn.addEventListener('click', () => {
        state.limOnly = false;
        allSupplyBtn.classList.add('active');
        if (limBtn) limBtn.classList.remove('active');
        refresh();
      });
    }

    if (limBtn) {
      limBtn.addEventListener('click', () => {
        state.limOnly = !state.limOnly;
        limBtn.classList.toggle('active', state.limOnly);
        if (allSupplyBtn) allSupplyBtn.classList.toggle('active', !state.limOnly);
        refresh();
      });
    }

    if (seenBtn) {
      seenBtn.addEventListener('click', () => {
        state.seenOnly = !state.seenOnly;
        seenBtn.classList.toggle('active', state.seenOnly);
        refresh();
      });
    }

    const sortSelect = mount.querySelector('#vd-sort-select');
    if (sortSelect) {
      sortSelect.addEventListener('change', (e) => {
        state.sort = e.target.value;
        refresh();
      });
    }

    // Delegated hover tooltips for items
    const subviewContainer = mount.querySelector('#vd-subview-container');
    if (subviewContainer && !subviewContainer._hasTooltipEvents) {
      subviewContainer._hasTooltipEvents = true;

      subviewContainer.addEventListener('mouseover', (e) => {
        const trigger = e.target.closest('[data-item-id]');
        if (!trigger) return;
        const itemId = trigger.getAttribute('data-item-id');
        const itemName = trigger.getAttribute('data-item-name') || '';
        if (typeof window.showCodexItemTooltipById === 'function') {
          window.showCodexItemTooltipById(e, itemId, itemName);
        }
      });

      subviewContainer.addEventListener('mousemove', (e) => {
        const trigger = e.target.closest('[data-item-id]');
        if (!trigger) return;
        const tooltip = document.getElementById('wow-item-tooltip');
        if (tooltip && !tooltip.hasAttribute('hidden') && typeof window.positionTooltip === 'function') {
          window.positionTooltip(e, tooltip);
        }
      });

      subviewContainer.addEventListener('mouseout', (e) => {
        const trigger = e.target.closest('[data-item-id]');
        if (!trigger) return;
        const related = e.relatedTarget ? e.relatedTarget.closest('[data-item-id]') : null;
        if (related === trigger) return;
        if (typeof window.hideCodexItemTooltip === 'function') {
          window.hideCodexItemTooltip();
        }
      });
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    if (window.WOW_VENDORS_DATA) ensureIndex();
  });
})();
