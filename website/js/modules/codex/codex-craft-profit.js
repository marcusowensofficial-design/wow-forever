/**
 * World of Warcraft: Forever - Craft Profit Finder
 * Ranks every profession recipe by what it earns right now: reagent cost (cheapest of the
 * live AH scan or a vendor) against what the crafted item sells for (AH after the 5% cut,
 * or the vendor sell price). Renders into the Item Database mount as an alternate view.
 *
 * Data: WOW_PROFESSIONS_DATA (lazy 'professions' bundle), WOW_MARKET_SCAN_DATA and
 * WOW_ITEM_DATABASE (lazy 'database' bundle), WOW_VENDORS_DATA (loaded eagerly).
 */
(function () {
  'use strict';

  const AH_CUT = 0.05;
  const PREFS_KEY = 'wowf.craftProfit.prefs';
  const Q_COLORS = { 0: '#9d9d9d', 1: '#f8fafc', 2: '#1eff00', 3: '#0070dd', 4: '#a335ee', 5: '#ff8000' };
  // Item-database bind codes that make an item unsellable on the AH.
  const BOP_CODES = new Set([1, 4, 5]);

  const DEFAULT_STATE = { prof: 'all', skill: 300, minProfit: 0, minListed: 3, q: '', sort: 'profit', includeVendor: true, showSpec: false, shown: 50 };
  let state = loadPrefs();
  let cache = null; // { rows, scanTime } computed once per data load
  let lastRows = new Map(); // "slug:id" -> row, for the shopping-list buttons

  function loadPrefs() {
    try {
      const saved = JSON.parse(localStorage.getItem(PREFS_KEY) || '{}');
      return { ...DEFAULT_STATE, ...saved, q: '', shown: 50 };
    } catch (_) {
      return { ...DEFAULT_STATE };
    }
  }

  function savePrefs() {
    try {
      const { prof, skill, minProfit, minListed, sort, includeVendor } = state;
      localStorage.setItem(PREFS_KEY, JSON.stringify({ prof, skill, minProfit, minListed, sort, includeVendor }));
    } catch (_) { /* storage blocked: prefs just won't persist */ }
  }

  function formatCopper(copper) {
    const neg = copper < 0;
    const c = Math.abs(Math.round(Number(copper) || 0));
    const g = Math.floor(c / 10000);
    const s = Math.floor((c % 10000) / 100);
    const k = c % 100;
    let out;
    if (g > 0) out = `${g.toLocaleString('en-US')}g${s > 0 ? ` ${s}s` : ''}`;
    else if (s > 0) out = `${s}s${k > 0 ? ` ${k}c` : ''}`;
    else out = `${k}c`;
    return neg ? `-${out}` : out;
  }

  function esc(str) {
    return String(str == null ? '' : str).replace(/[&<>"']/g, (ch) => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    }[ch]));
  }

  function iconUrl(icon) {
    return `https://wow.zamimg.com/images/wow/icons/medium/${esc(icon || 'inv_misc_questionmark')}.jpg`;
  }

  /** Cheapest per-unit vendor price for each item. Vendor `p` is the price for a stack of `n`. */
  function buildVendorPrices() {
    const out = {};
    const vendors = window.WOW_VENDORS_DATA?.vendors || {};
    for (const v of Object.values(vendors)) {
      for (const [id, s] of Object.entries(v.sells || {})) {
        if (s.c || !(s.p > 0)) continue; // token/currency costs aren't gold
        const unit = s.p / (s.n || 1);
        if (out[id] == null || unit < out[id]) out[id] = unit;
      }
    }
    return out;
  }

  /**
   * What one reagent unit costs. AH price is the current lowest buyout, but if the AH doesn't
   * have enough units for one craft we fall back to the higher of lowest/median so a single
   * cheap listing doesn't make a recipe look better than it is.
   */
  function reagentUnitCost(reagent, prices, vendorPrices) {
    const ah = prices[reagent.id];
    let unit = Infinity;
    let src = '';
    if (ah && ah.minBuyout > 0) {
      unit = ah.qty >= reagent.count ? ah.minBuyout : Math.max(ah.minBuyout, ah.med14 || 0);
      src = 'AH';
    }
    const vend = vendorPrices[reagent.id];
    if (vend != null && vend <= unit) {
      unit = vend;
      src = 'Vendor';
    }
    return { unit, src };
  }

  function compute() {
    const profs = window.WOW_PROFESSIONS_DATA;
    const market = window.WOW_MARKET_SCAN_DATA;
    if (!profs || !market?.prices) return null;
    const prices = market.prices;
    const vendorPrices = buildVendorPrices();

    const dbRows = {};
    for (const r of window.WOW_ITEM_DATABASE?.rows || []) dbRows[r[0]] = r;

    const rows = [];
    for (const [slug, prof] of Object.entries(profs)) {
      for (const recipe of prof.recipes || []) {
        if (recipe.isCamp || !Array.isArray(recipe.reagents) || recipe.reagents.length === 0) continue;

        // Some recipe entries (mostly enchants) carry the Formula/Pattern item's id, not a crafted
        // item. Only trust the id when the item it points to has the recipe's own name.
        const dbRow = dbRows[recipe.id];
        const ah = prices[recipe.id];
        const itemName = (dbRow?.[1] || ah?.name || '').toLowerCase().trim();
        if (!itemName || itemName !== String(recipe.name).toLowerCase().trim()) continue;

        let cost = 0;
        let missing = 0;
        const parts = [];
        for (const g of recipe.reagents) {
          const { unit, src } = reagentUnitCost(g, prices, vendorPrices);
          if (!isFinite(unit)) { missing++; parts.push({ ...g, unit: 0, src: '?' }); continue; }
          cost += unit * g.count;
          parts.push({ ...g, unit, src });
        }
        if (missing > 0) continue;

        const bop = dbRow ? BOP_CODES.has(Number(dbRow[8])) : false;
        // Sell at the lower of current lowest buyout and 14-day median, so one overpriced
        // listing doesn't inflate the result.
        const ahSell = !bop && ah?.minBuyout > 0 ? Math.min(ah.minBuyout, ah.med14 || ah.minBuyout) : 0;
        const ahNet = ahSell * (1 - AH_CUT);
        const vendorSell = Number(dbRow?.[9]) || 0;
        const sellVia = ahNet >= vendorSell ? 'AH' : 'Vendor';
        const makes = Math.max(1, Number(recipe.createCount) || 1);
        // Everything below is per craft: one craft can make several items (ammo makes 200).
        const net = Math.max(ahNet, vendorSell) * makes;
        if (net <= 0) continue;
        const mt = window.WOW_MARKET_TOOLS;
        const listedNow = mt ? (mt.isListed(ah) ? ah.qty : 0) : ah?.qty || 0;

        rows.push({
          slug,
          profName: prof.name || slug,
          profIcon: prof.icon,
          id: recipe.id,
          name: recipe.name,
          icon: recipe.icon,
          quality: Math.min(Number(recipe.quality) || 1, 5),
          learn: Number(recipe.learn) || 1,
          source: recipe.source || '',
          isNew: !!recipe.isNew,
          parts,
          cost,
          ahSell,
          vendorSell,
          sellVia,
          makes,
          net,
          profit: net - cost,
          margin: cost > 0 ? (net - cost) / cost : 0,
          listed: listedNow,
          bop
        });
      }
    }
    return { rows, scanTime: market.lastScanTime || 0 };
  }

  /** AH sales backed by fewer than `minListed` listings are speculative: one listing sets the price. */
  function isSpeculative(r) {
    return r.sellVia === 'AH' && r.listed < state.minListed;
  }

  function filtered() {
    const q = state.q.toLowerCase();
    const list = cache.rows.filter((r) => {
      if (state.prof !== 'all' && r.slug !== state.prof) return false;
      if (r.learn > state.skill) return false;
      if (r.profit < state.minProfit * 10000) return false;
      if (!state.includeVendor && r.sellVia === 'Vendor') return false;
      if (q && !r.name.toLowerCase().includes(q) && !r.parts.some((p) => String(p.name).toLowerCase().includes(q))) return false;
      return true;
    });
    const by = {
      profit: (a, b) => b.profit - a.profit,
      margin: (a, b) => b.margin - a.margin,
      skill: (a, b) => b.learn - a.learn || b.profit - a.profit,
      name: (a, b) => a.name.localeCompare(b.name)
    }[state.sort] || ((a, b) => b.profit - a.profit);
    list.sort(by);
    return { main: list.filter((r) => !isSpeculative(r)), spec: list.filter(isSpeculative) };
  }

  function renderRow(r) {
    const color = Q_COLORS[r.quality];
    const profitColor = r.profit > 0 ? '#4ade80' : '#f87171';
    const reagents = r.parts.map((p) => `
      <span style="display:inline-flex;align-items:center;gap:0.25rem;white-space:nowrap;" title="${esc(p.name)}: ${esc(formatCopper(p.unit))} each (${esc(p.src)})">
        <img src="${iconUrl(p.icon)}" alt="" width="16" height="16" loading="lazy" style="border-radius:3px;">
        <span style="color:#cbd5e1;">${p.count}× ${esc(p.name)}</span>
        <span style="color:${p.src === 'Vendor' ? '#7dd3fc' : '#facc15'};">${esc(formatCopper(p.unit * p.count))}</span>
      </span>`).join('<span style="color:#475569;"> · </span>');

    const thin = isSpeculative(r);
    const sellNote = r.sellVia === 'AH'
      ? `<span style="display:block;color:${thin ? '#fbbf24' : '#64748b'};font-size:0.72rem;" title="${thin ? 'Very few listed: the price may not hold' : 'Listings currently on the AH'}">${r.listed} listed${thin ? ' ⚠' : ''}</span>`
      : `<span style="display:block;color:#7dd3fc;font-size:0.72rem;">vendor it</span>`;
    const makesNote = r.makes > 1
      ? `<span style="display:block;color:#94a3b8;font-size:0.72rem;" title="One craft makes ${r.makes}">${r.makes}× ${esc(formatCopper(r.net / r.makes))}</span>`
      : '';
    const shopBtn = window.WOW_MARKET_TOOLS
      ? `<button type="button" data-shop-key="${esc(r.slug)}:${r.id}" title="Add one craft's reagents to your shopping list" style="margin-top:0.35rem;background:rgba(56,189,248,0.12);border:1px solid rgba(56,189,248,0.35);color:#7dd3fc;border-radius:999px;padding:0.08rem 0.5rem;font-size:0.68rem;font-weight:700;cursor:pointer;">🛒 Add reagents</button>`
      : '';

    return `
      <tr class="craft-profit-row" style="border-bottom:1px solid rgba(255,255,255,0.06);font-size:0.84rem;vertical-align:top;">
        <td style="padding:0.55rem 0.65rem;min-width:220px;">
          <div style="display:flex;align-items:flex-start;gap:0.6rem;">
            <img src="${iconUrl(r.icon)}" alt="" width="32" height="32" loading="lazy"
                 style="border-radius:6px;border:1.5px solid ${color};background:#0f172a;flex-shrink:0;"
                 onerror="this.src='https://wow.zamimg.com/images/wow/icons/medium/inv_misc_questionmark.jpg'">
            <div style="min-width:0;">
              <a href="https://www.wowhead.com/forever/item=${r.id}" target="_blank" rel="noopener noreferrer"
                 class="craft-profit-item" data-item-id="${r.id}" data-item-name="${esc(r.name)}"
                 style="color:${color};font-weight:700;text-decoration:none;">${esc(r.name)}</a>
              ${r.isNew ? '<span style="margin-left:0.3rem;background:rgba(16,185,129,0.2);color:#34d399;border:1px solid rgba(16,185,129,0.4);padding:0.03rem 0.32rem;border-radius:4px;font-size:0.64rem;font-weight:800;">NEW</span>' : ''}
              <div style="color:#94a3b8;font-size:0.74rem;">${esc(r.profName)} ${r.learn} · ${esc(r.source || 'Unknown source')}</div>
              <div style="display:flex;flex-wrap:wrap;gap:0.15rem 0.35rem;margin-top:0.3rem;font-size:0.72rem;">${reagents}</div>
              ${shopBtn}
            </div>
          </div>
        </td>
        <td style="padding:0.55rem 0.5rem;text-align:right;color:#cbd5e1;font-variant-numeric:tabular-nums;white-space:nowrap;">${formatCopper(r.cost)}</td>
        <td style="padding:0.55rem 0.5rem;text-align:right;font-variant-numeric:tabular-nums;white-space:nowrap;">
          <span style="color:#facc15;font-weight:600;" title="${r.sellVia === 'AH' ? `AH ${formatCopper(r.ahSell)} minus 5% cut` : 'Vendor sell price'}">${formatCopper(r.net)}</span>
          ${makesNote}
          ${sellNote}
        </td>
        <td style="padding:0.55rem 0.65rem;text-align:right;font-variant-numeric:tabular-nums;white-space:nowrap;">
          <span style="color:${profitColor};font-weight:800;">${r.profit > 0 ? '+' : ''}${formatCopper(r.profit)}</span>
          <span style="display:block;color:#64748b;font-size:0.72rem;">${r.cost > 0 ? `${Math.round(r.margin * 100)}% margin` : ''}</span>
        </td>
      </tr>`;
  }

  function updateTable(mount, append) {
    const tbody = mount.querySelector('#craft-profit-tbody');
    const countEl = mount.querySelector('#craft-profit-count');
    const moreBtn = mount.querySelector('#craft-profit-more');
    if (!tbody) return;
    const { main: list, spec } = filtered();
    lastRows = new Map([...list, ...spec].map((r) => [`${r.slug}:${r.id}`, r]));
    const winners = list.filter((r) => r.profit > 0).length;
    countEl.textContent = (winners === list.length
      ? `${list.length.toLocaleString('en-US')} profitable recipe${list.length === 1 ? '' : 's'}`
      : `${list.length.toLocaleString('en-US')} recipes · ${winners.toLocaleString('en-US')} profitable`)
      + (spec.length ? ` · ${spec.length} speculative` : '');

    if (list.length === 0 && spec.length === 0) {
      tbody.innerHTML = '<tr><td colspan="4" style="padding:2rem;text-align:center;color:#94a3b8;">No recipes match. Try a higher skill level, a lower minimum profit, or another profession.</td></tr>';
      moreBtn.style.display = 'none';
      return;
    }
    const start = append ? Math.max(0, state.shown - 50) : 0;
    const html = list.slice(start, state.shown).map(renderRow).join('');
    if (append) {
      tbody.querySelector('.craft-spec-start')?.insertAdjacentHTML('beforebegin', html);
    } else {
      const specHtml = spec.length
        ? `<tr class="craft-spec-start"><td colspan="4" style="padding:0.7rem 0.65rem;background:rgba(251,191,36,0.07);border-top:2px solid rgba(251,191,36,0.3);">
            <button type="button" id="craft-spec-toggle" aria-expanded="${state.showSpec}" style="background:none;border:none;color:#fbbf24;font-weight:700;font-size:0.84rem;cursor:pointer;padding:0;">
              ${state.showSpec ? '▾' : '▸'} Speculative: ${spec.length} recipe${spec.length === 1 ? '' : 's'} with fewer than ${state.minListed} listed
            </button>
            <div style="color:#94a3b8;font-size:0.74rem;margin-top:0.2rem;">With so few listings, one seller sets the price. These can pay off, but the price may not hold when you list yours.</div>
          </td></tr>${state.showSpec ? spec.slice(0, 100).map(renderRow).join('') : ''}`
        : '';
      tbody.innerHTML = html + specHtml;
    }

    const remaining = list.length - state.shown;
    moreBtn.style.display = remaining > 0 ? 'inline-flex' : 'none';
    if (remaining > 0) moreBtn.textContent = `Load ${Math.min(50, remaining)} More (${remaining.toLocaleString('en-US')} remaining)`;
  }

  function renderView(mount) {
    const profs = window.WOW_PROFESSIONS_DATA;
    const profOptions = [...new Set(cache.rows.map((r) => r.slug))]
      .map((slug) => [slug, profs[slug]?.name || slug])
      .sort((a, b) => a[1].localeCompare(b[1]));
    if (state.prof !== 'all' && !profOptions.some(([s]) => s === state.prof)) state.prof = 'all';

    const scanAgeDays = cache.scanTime ? Math.floor((Date.now() / 1000 - cache.scanTime) / 86400) : null;
    const scanStr = cache.scanTime
      ? new Date(cache.scanTime * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
      : 'unknown';
    const stale = scanAgeDays != null && scanAgeDays >= 3;
    const inputStyle = 'background:#0f172a;color:#f8fafc;border:1px solid #334155;border-radius:6px;padding:0.45rem 0.55rem;font-size:0.84rem;';

    mount.innerHTML = `
      <div class="craft-profit-wrapper" style="display:flex;flex-direction:column;gap:1.1rem;">
        <div class="section-heading-bar" style="margin-bottom:0.25rem;">
          <div>
            <button type="button" id="craft-profit-back" style="background:none;border:none;color:#7dd3fc;font-size:0.82rem;font-weight:600;cursor:pointer;padding:0;margin-bottom:0.4rem;">← Back to Item Database</button>
            <h2><span>⚒️</span> Craft Profit Finder</h2>
            <p class="section-subtext">Every recipe ranked by what it earns right now. Reagents are priced at the cheapest of the AH or a vendor; crafted items sell at the lower of the current AH price and its 14-day median, minus the 5% AH cut (or to a vendor, if that pays more).</p>
            <div style="display:flex;align-items:center;gap:0.6rem;margin-top:0.4rem;flex-wrap:wrap;">
              <span style="display:inline-flex;align-items:center;gap:0.35rem;padding:0.2rem 0.6rem;border-radius:999px;background:${stale ? 'rgba(239,68,68,0.14)' : 'rgba(234,179,8,0.12)'};border:1px solid ${stale ? 'rgba(239,68,68,0.4)' : 'rgba(234,179,8,0.3)'};color:${stale ? '#fca5a5' : '#facc15'};font-size:0.75rem;font-weight:600;">
                💰 AH scan from ${esc(scanStr)}${scanAgeDays != null ? ` (${scanAgeDays === 0 ? 'today' : `${scanAgeDays} day${scanAgeDays === 1 ? '' : 's'} ago`})` : ''}${stale ? ' · prices may have moved' : ''}
              </span>
            </div>
          </div>
        </div>

        <div style="background:rgba(15,23,42,0.75);border:1px solid var(--border-subtle);border-radius:var(--radius-md);padding:1rem;display:flex;flex-wrap:wrap;gap:0.65rem;align-items:center;">
          <input type="search" id="craft-profit-search" aria-label="Search recipes or reagents" placeholder="🔍 Recipe or reagent..." value="${esc(state.q)}" style="${inputStyle}flex:1 1 200px;min-width:0;">
          <select id="craft-profit-prof" aria-label="Profession" style="${inputStyle}">
            <option value="all">All Professions</option>
            ${profOptions.map(([slug, name]) => `<option value="${esc(slug)}" ${state.prof === slug ? 'selected' : ''}>${esc(name)}</option>`).join('')}
          </select>
          <label style="display:inline-flex;align-items:center;gap:0.35rem;font-size:0.8rem;color:#cbd5e1;">
            My skill
            <input type="number" id="craft-profit-skill" aria-label="Your profession skill" min="1" max="300" value="${state.skill}" style="${inputStyle}width:64px;text-align:center;">
          </label>
          <label style="display:inline-flex;align-items:center;gap:0.35rem;font-size:0.8rem;color:#cbd5e1;">
            Min profit (g)
            <input type="number" id="craft-profit-min" aria-label="Minimum profit in gold" min="0" step="0.5" value="${state.minProfit}" style="${inputStyle}width:64px;text-align:center;">
          </label>
          <label style="display:inline-flex;align-items:center;gap:0.35rem;font-size:0.8rem;color:#cbd5e1;" title="Recipes whose item has fewer listings than this go in the Speculative section">
            Min listed
            <input type="number" id="craft-profit-minlisted" aria-label="Minimum AH listings" min="1" max="50" value="${state.minListed}" style="${inputStyle}width:56px;text-align:center;">
          </label>
          <label style="display:inline-flex;align-items:center;gap:0.35rem;font-size:0.8rem;color:#7dd3fc;cursor:pointer;">
            <input type="checkbox" id="craft-profit-vendor" ${state.includeVendor ? 'checked' : ''}> Include vendor sales
          </label>
          <select id="craft-profit-sort" aria-label="Sort recipes" style="${inputStyle}">
            <option value="profit" ${state.sort === 'profit' ? 'selected' : ''}>Sort: Profit per craft</option>
            <option value="margin" ${state.sort === 'margin' ? 'selected' : ''}>Sort: Margin %</option>
            <option value="skill" ${state.sort === 'skill' ? 'selected' : ''}>Sort: Skill required</option>
            <option value="name" ${state.sort === 'name' ? 'selected' : ''}>Sort: Name (A → Z)</option>
          </select>
        </div>

        <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:0.5rem;padding:0 0.25rem;">
          <strong id="craft-profit-count" style="color:#f5d061;font-size:0.92rem;"></strong>
          <span style="font-size:0.76rem;color:#94a3b8;">Reagent costs: <span style="color:#facc15;">AH</span> · <span style="color:#7dd3fc;">vendor</span>. Prices are per craft (ammo makes 200 at once).</span>
        </div>

        <div class="table-responsive-wrapper" style="background:rgba(15,23,42,0.65);border:1px solid var(--border-subtle);border-radius:var(--radius-md);overflow-x:auto;">
          <table style="width:100%;border-collapse:collapse;">
            <thead>
              <tr style="border-bottom:2px solid var(--border-subtle);text-align:left;font-size:0.76rem;color:var(--text-gold);text-transform:uppercase;letter-spacing:0.06em;background:rgba(0,0,0,0.25);">
                <th style="padding:0.65rem;">Recipe &amp; Reagents</th>
                <th style="padding:0.65rem;text-align:right;">Cost</th>
                <th style="padding:0.65rem;text-align:right;">You Get</th>
                <th style="padding:0.65rem;text-align:right;">Profit</th>
              </tr>
            </thead>
            <tbody id="craft-profit-tbody"></tbody>
          </table>
        </div>

        <div style="text-align:center;margin-top:0.4rem;">
          <button type="button" id="craft-profit-more" class="btn-primary" style="padding:0.55rem 1.4rem;font-size:0.85rem;border-radius:999px;cursor:pointer;">Load More</button>
        </div>
      </div>`;

    const refresh = () => { state.shown = 50; savePrefs(); updateTable(mount, false); };
    let timer = null;
    mount.querySelector('#craft-profit-search').addEventListener('input', (e) => {
      state.q = e.target.value.trim();
      clearTimeout(timer);
      timer = setTimeout(refresh, 90);
    });
    mount.querySelector('#craft-profit-prof').addEventListener('change', (e) => { state.prof = e.target.value; refresh(); });
    mount.querySelector('#craft-profit-skill').addEventListener('input', (e) => { state.skill = Math.max(1, Math.min(300, Number(e.target.value) || 300)); refresh(); });
    mount.querySelector('#craft-profit-min').addEventListener('input', (e) => { state.minProfit = Math.max(0, Number(e.target.value) || 0); refresh(); });
    mount.querySelector('#craft-profit-vendor').addEventListener('change', (e) => { state.includeVendor = e.target.checked; refresh(); });
    mount.querySelector('#craft-profit-minlisted').addEventListener('input', (e) => { state.minListed = Math.max(1, Math.min(50, Number(e.target.value) || 3)); refresh(); });
    mount.querySelector('#craft-profit-sort').addEventListener('change', (e) => { state.sort = e.target.value; refresh(); });
    mount.querySelector('#craft-profit-more').addEventListener('click', () => { state.shown += 50; updateTable(mount, true); });
    mount.querySelector('#craft-profit-back').addEventListener('click', () => {
      if (typeof window.hideCodexItemTooltip === 'function') window.hideCodexItemTooltip();
      if (typeof window.renderCodexItemDatabase === 'function') window.renderCodexItemDatabase();
    });

    // Reuse the Item Database's rich tooltip on the crafted item's name.
    const tbody = mount.querySelector('#craft-profit-tbody');
    tbody.addEventListener('click', (e) => {
      if (e.target.closest('#craft-spec-toggle')) {
        state.showSpec = !state.showSpec;
        updateTable(mount, false);
        return;
      }
      const btn = e.target.closest('[data-shop-key]');
      const r = btn && lastRows.get(btn.dataset.shopKey);
      if (r && window.WOW_MARKET_TOOLS) {
        for (const p of r.parts) {
          // Vendor reagents are cheapest from a vendor, so they don't go on an AH shopping list.
          if (p.src === 'AH') window.WOW_MARKET_TOOLS.shopping.add(p.id, p.count, 0, p.name);
        }
        btn.textContent = '✓ Added';
        btn.disabled = true;
      }
    });
    tbody.addEventListener('mouseover', (e) => {
      const a = e.target.closest('.craft-profit-item');
      if (a && typeof window.showCodexItemTooltipById === 'function') {
        window.showCodexItemTooltipById(e, Number(a.dataset.itemId), a.dataset.itemName);
      }
    });
    tbody.addEventListener('mousemove', (e) => {
      const tooltip = document.getElementById('wow-item-tooltip');
      if (tooltip && !tooltip.hasAttribute('hidden') && typeof window.positionTooltip === 'function') {
        window.positionTooltip(e, tooltip);
      }
    });
    tbody.addEventListener('mouseout', (e) => {
      if (e.target.closest('.craft-profit-item') && typeof window.hideCodexItemTooltip === 'function') {
        window.hideCodexItemTooltip();
      }
    });

    updateTable(mount, false);
  }

  window.renderCraftProfitFinder = function () {
    const mount = document.getElementById('codex-database-mount');
    if (!mount) return;
    mount.innerHTML = '<div style="padding:3rem 1rem;text-align:center;color:#94a3b8;">⚒️ Loading recipes and pricing every craft...</div>';
    const loader = window.WOW_DATA_LOADER;
    const ready = loader
      ? Promise.all([loader.ensure('professions'), loader.ensure('database')])
      : Promise.resolve();
    ready.then(() => {
      if (!cache) cache = compute();
      if (!cache) {
        mount.innerHTML = '<div style="padding:3rem 1rem;text-align:center;color:#fca5a5;">Recipe or market data is missing, so profits can\'t be calculated.</div>';
        return;
      }
      renderView(mount);
    }).catch((err) => {
      mount.innerHTML = `<div style="padding:3rem 1rem;text-align:center;color:#fca5a5;">Couldn't load recipe data: ${esc(err?.message || 'network error')}</div>`;
    });
  };

  // Exposed for scripts/validation and debugging.
  window.WOW_CRAFT_PROFIT = { compute, resetCache: () => { cache = null; } };
})();
