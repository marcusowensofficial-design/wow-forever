/**
 * World of Warcraft: Forever - Disenchant Flips
 * Green, blue and purple gear on the AH whose expected disenchant value (dust, essence,
 * shards and Nexus Crystals at AH prices, minus the 5% cut) beats its lowest buyout.
 * Renders into the Item Database mount, like the Craft Profit Finder.
 *
 * Data: WOW_ITEM_DATABASE + WOW_MARKET_SCAN_DATA (lazy 'database' bundle),
 * WOW_DISENCHANT_YIELDS (js/data/disenchant-yields-data.js), WOW_MARKET_TOOLS for pricing.
 */
(function () {
  'use strict';

  const PREFS_KEY = 'wowf.deFlips.prefs';
  const Q_COLORS = { 2: '#1eff00', 3: '#0070dd', 4: '#a335ee' };
  const Q_NAMES = { 2: 'Uncommon', 3: 'Rare', 4: 'Epic' };
  const DEFAULTS = { skill: 300, minProfit: 0, quality: 0, q: '', sort: 'profit' };
  let state = load();
  let shown = 50;
  let lastRows = new Map();

  function load() {
    try { return { ...DEFAULTS, ...JSON.parse(localStorage.getItem(PREFS_KEY) || '{}'), q: '' }; } catch (_) { return { ...DEFAULTS }; }
  }
  function save() {
    try {
      const { skill, minProfit, quality, sort } = state;
      localStorage.setItem(PREFS_KEY, JSON.stringify({ skill, minProfit, quality, sort }));
    } catch (_) { /* not persisted */ }
  }

  /** Every listed, disenchantable item with its expected value. Recomputed per open (cheap). */
  function compute() {
    const t = window.WOW_MARKET_TOOLS;
    const db = window.WOW_ITEM_DATABASE;
    if (!t || !db?.rows || !window.WOW_DISENCHANT_YIELDS) return null;
    const cats = db.meta?.cats || [];
    const icons = db.meta?.icons || [];
    const rows = [];
    for (const r of db.rows) {
      const q = Number(r[2]);
      if (q < 2 || q > 4) continue;
      const cat = cats[r[5]] || '';
      const isWeapon = cat.startsWith('weapons');
      if (!isWeapon && !cat.startsWith('armor') && cat !== 'jewelry' && cat !== 'offhand') continue;
      const e = t.price(r[0]);
      if (!t.isListed(e)) continue;
      const v = t.disenchantValue(q, Number(r[3]), isWeapon);
      if (!v) continue;
      rows.push({
        id: r[0],
        name: r[1],
        q,
        ilvl: Number(r[3]),
        icon: r[7] >= 0 ? icons[r[7]] : '',
        isWeapon,
        buyout: e.minBuyout,
        listed: e.qty,
        ev: v.ev,
        skill: v.skill,
        parts: v.parts,
        profit: v.ev - e.minBuyout,
        margin: e.minBuyout > 0 ? (v.ev - e.minBuyout) / e.minBuyout : 0
      });
    }
    return rows;
  }

  function filtered(all) {
    const q = state.q.toLowerCase();
    const list = all.filter((r) => r.profit > 0
      && r.skill <= state.skill
      && r.profit >= state.minProfit * 10000
      && (!state.quality || r.q === state.quality)
      && (!q || r.name.toLowerCase().includes(q)));
    const by = {
      profit: (a, b) => b.profit - a.profit,
      margin: (a, b) => b.margin - a.margin,
      ilvl: (a, b) => b.ilvl - a.ilvl
    }[state.sort] || ((a, b) => b.profit - a.profit);
    return list.sort(by);
  }

  function renderRow(r) {
    const t = window.WOW_MARKET_TOOLS;
    const f = t.formatCopper;
    const esc = t.esc;
    const mats = r.parts.map((p) => {
      const pct = p.chance >= 0.995 ? '' : `${Math.round(p.chance * 1000) / 10}% `;
      const cnt = p.min === p.max ? `${p.min}` : `${p.min}–${p.max}`;
      return `<span style="white-space:nowrap;color:#cbd5e1;" title="${esc(p.name)} sells for about ${esc(f(p.unit))} each">${pct}${cnt}× ${esc(p.name)} <span style="color:#facc15;">${esc(f(p.unit))}</span></span>`;
    }).join('<span style="color:#475569;"> · </span>');
    const icon = r.icon ? `https://wow.zamimg.com/images/wow/icons/medium/${esc(r.icon)}.jpg` : 'https://wow.zamimg.com/images/wow/icons/medium/inv_misc_questionmark.jpg';
    return `
      <tr style="border-bottom:1px solid rgba(255,255,255,0.06);font-size:0.84rem;vertical-align:top;">
        <td style="padding:0.55rem 0.65rem;min-width:220px;">
          <div style="display:flex;gap:0.6rem;align-items:flex-start;">
            <img src="${icon}" alt="" width="32" height="32" loading="lazy" style="border-radius:6px;border:1.5px solid ${Q_COLORS[r.q]};background:#0f172a;flex-shrink:0;">
            <div style="min-width:0;">
              <a href="https://www.wowhead.com/forever/item=${r.id}" target="_blank" rel="noopener noreferrer" class="de-flip-item" data-item-id="${r.id}" data-item-name="${esc(r.name)}" style="color:${Q_COLORS[r.q]};font-weight:700;text-decoration:none;">${esc(r.name)}</a>
              <div style="color:#94a3b8;font-size:0.74rem;">${Q_NAMES[r.q]} ${r.isWeapon ? 'weapon' : 'armor'} · iLvl ${r.ilvl} · Enchanting ${r.skill}</div>
              <div style="display:flex;flex-wrap:wrap;gap:0.15rem 0.35rem;margin-top:0.3rem;font-size:0.72rem;">${mats}</div>
              <button type="button" data-de-shop="${r.id}" style="margin-top:0.35rem;background:rgba(56,189,248,0.12);border:1px solid rgba(56,189,248,0.35);color:#7dd3fc;border-radius:999px;padding:0.08rem 0.5rem;font-size:0.68rem;font-weight:700;cursor:pointer;">🛒 Add to list</button>
            </div>
          </div>
        </td>
        <td style="padding:0.55rem 0.5rem;text-align:right;white-space:nowrap;font-variant-numeric:tabular-nums;">
          <span style="color:#facc15;font-weight:600;">${f(r.buyout)}</span>
          <span style="display:block;color:#64748b;font-size:0.72rem;">${r.listed} listed</span>
        </td>
        <td style="padding:0.55rem 0.5rem;text-align:right;white-space:nowrap;color:#c084fc;font-variant-numeric:tabular-nums;" title="Average over many disenchants, after the 5% AH cut">${f(r.ev)}</td>
        <td style="padding:0.55rem 0.65rem;text-align:right;white-space:nowrap;font-variant-numeric:tabular-nums;">
          <span style="color:#4ade80;font-weight:800;">${f(r.profit, { sign: true })}</span>
          <span style="display:block;color:#64748b;font-size:0.72rem;">${Math.round(r.margin * 100)}% margin</span>
        </td>
      </tr>`;
  }

  function update(mount, all, append) {
    const list = filtered(all);
    lastRows = new Map(list.map((r) => [r.id, r]));
    const tbody = mount.querySelector('#de-flips-tbody');
    const more = mount.querySelector('#de-flips-more');
    mount.querySelector('#de-flips-count').textContent = `${list.length.toLocaleString('en-US')} profitable item${list.length === 1 ? '' : 's'} to disenchant`;
    if (list.length === 0) {
      tbody.innerHTML = '<tr><td colspan="4" style="padding:2rem;text-align:center;color:#94a3b8;">Nothing is worth more disenchanted than it costs right now. Try a higher Enchanting skill or check back after the next scan.</td></tr>';
      more.style.display = 'none';
      return;
    }
    const start = append ? shown - 50 : 0;
    const html = list.slice(start, shown).map(renderRow).join('');
    if (append) tbody.insertAdjacentHTML('beforeend', html); else tbody.innerHTML = html;
    const remaining = list.length - shown;
    more.style.display = remaining > 0 ? 'inline-flex' : 'none';
    if (remaining > 0) more.textContent = `Load ${Math.min(50, remaining)} More (${remaining} remaining)`;
  }

  function render(mount, all) {
    const t = window.WOW_MARKET_TOOLS;
    const age = t.scanAge();
    const inp = 'background:#0f172a;color:#f8fafc;border:1px solid #334155;border-radius:6px;padding:0.45rem 0.55rem;font-size:0.84rem;';
    mount.innerHTML = `
      <div style="display:flex;flex-direction:column;gap:1.1rem;">
        <div class="section-heading-bar" style="margin-bottom:0.25rem;"><div>
          <button type="button" id="de-flips-back" style="background:none;border:none;color:#7dd3fc;font-size:0.82rem;font-weight:600;cursor:pointer;padding:0;margin-bottom:0.4rem;">← Back to Item Database</button>
          <h2><span>✨</span> Disenchant Flips</h2>
          <p class="section-subtext">Gear on the AH that's worth more disenchanted than it costs. "Disenchant value" is the average you get per item over many disenchants: each material's chance × count × its AH price (the lower of current and 14-day median), minus the 5% AH cut. Yields follow Classic disenchanting rates. Single disenchants vary; the average holds over volume.</p>
          ${age ? `<div style="margin-top:0.4rem;"><span style="display:inline-flex;padding:0.2rem 0.6rem;border-radius:999px;font-size:0.75rem;font-weight:600;background:${age.stale ? 'rgba(239,68,68,0.14)' : 'rgba(234,179,8,0.12)'};border:1px solid ${age.stale ? 'rgba(239,68,68,0.4)' : 'rgba(234,179,8,0.3)'};color:${age.stale ? '#fca5a5' : '#facc15'};">💰 AH scan from ${t.esc(age.dateStr)} (${t.esc(age.ago)})${age.stale ? ' · prices may have moved' : ''}</span></div>` : ''}
        </div></div>
        <div style="background:rgba(15,23,42,0.75);border:1px solid var(--border-subtle);border-radius:var(--radius-md);padding:1rem;display:flex;flex-wrap:wrap;gap:0.65rem;align-items:center;">
          <input type="search" id="de-flips-search" aria-label="Search items" placeholder="🔍 Item name..." value="${t.esc(state.q)}" style="${inp}flex:1 1 200px;min-width:0;">
          <select id="de-flips-quality" aria-label="Quality" style="${inp}">
            <option value="0">All qualities</option>
            ${[2, 3, 4].map((q) => `<option value="${q}" ${state.quality === q ? 'selected' : ''}>${Q_NAMES[q]}</option>`).join('')}
          </select>
          <label style="display:inline-flex;align-items:center;gap:0.35rem;font-size:0.8rem;color:#cbd5e1;">My Enchanting
            <input type="number" id="de-flips-skill" aria-label="Your Enchanting skill" min="1" max="300" value="${state.skill}" style="${inp}width:64px;text-align:center;"></label>
          <label style="display:inline-flex;align-items:center;gap:0.35rem;font-size:0.8rem;color:#cbd5e1;">Min profit (g)
            <input type="number" id="de-flips-min" aria-label="Minimum profit in gold" min="0" step="0.1" value="${state.minProfit}" style="${inp}width:64px;text-align:center;"></label>
          <select id="de-flips-sort" aria-label="Sort" style="${inp}">
            <option value="profit" ${state.sort === 'profit' ? 'selected' : ''}>Sort: Profit</option>
            <option value="margin" ${state.sort === 'margin' ? 'selected' : ''}>Sort: Margin %</option>
            <option value="ilvl" ${state.sort === 'ilvl' ? 'selected' : ''}>Sort: Item level</option>
          </select>
        </div>
        <strong id="de-flips-count" style="color:#f5d061;font-size:0.92rem;padding:0 0.25rem;"></strong>
        <div class="table-responsive-wrapper" style="background:rgba(15,23,42,0.65);border:1px solid var(--border-subtle);border-radius:var(--radius-md);overflow-x:auto;">
          <table style="width:100%;border-collapse:collapse;">
            <thead><tr style="border-bottom:2px solid var(--border-subtle);text-align:left;font-size:0.76rem;color:var(--text-gold);text-transform:uppercase;letter-spacing:0.06em;background:rgba(0,0,0,0.25);">
              <th style="padding:0.65rem;">Item &amp; Expected Materials</th><th style="padding:0.65rem;text-align:right;">Buy For</th>
              <th style="padding:0.65rem;text-align:right;">Disenchant Value</th><th style="padding:0.65rem;text-align:right;">Profit</th>
            </tr></thead>
            <tbody id="de-flips-tbody"></tbody>
          </table>
        </div>
        <div style="text-align:center;"><button type="button" id="de-flips-more" class="btn-primary" style="padding:0.55rem 1.4rem;font-size:0.85rem;border-radius:999px;cursor:pointer;">Load More</button></div>
      </div>`;

    const refresh = () => { shown = 50; save(); update(mount, all, false); };
    let timer = null;
    mount.querySelector('#de-flips-search').addEventListener('input', (e) => { state.q = e.target.value.trim(); clearTimeout(timer); timer = setTimeout(refresh, 90); });
    mount.querySelector('#de-flips-quality').addEventListener('change', (e) => { state.quality = Number(e.target.value); refresh(); });
    mount.querySelector('#de-flips-skill').addEventListener('input', (e) => { state.skill = Math.max(1, Math.min(300, Number(e.target.value) || 300)); refresh(); });
    mount.querySelector('#de-flips-min').addEventListener('input', (e) => { state.minProfit = Math.max(0, Number(e.target.value) || 0); refresh(); });
    mount.querySelector('#de-flips-sort').addEventListener('change', (e) => { state.sort = e.target.value; refresh(); });
    mount.querySelector('#de-flips-more').addEventListener('click', () => { shown += 50; update(mount, all, true); });
    mount.querySelector('#de-flips-back').addEventListener('click', () => {
      window.hideCodexItemTooltip?.();
      window.renderCodexItemDatabase?.();
    });
    const tbody = mount.querySelector('#de-flips-tbody');
    tbody.addEventListener('click', (e) => {
      const b = e.target.closest('[data-de-shop]');
      const r = b && lastRows.get(Number(b.dataset.deShop));
      if (!r) return;
      // Max price each = the disenchant value, so you never pay more than it's worth.
      t.shopping.add(r.id, 1, Math.floor(r.ev), r.name);
      b.textContent = '✓ Added';
      b.disabled = true;
    });
    tbody.addEventListener('mouseover', (e) => {
      const a = e.target.closest('.de-flip-item');
      if (a) window.showCodexItemTooltipById?.(e, Number(a.dataset.itemId), a.dataset.itemName);
    });
    tbody.addEventListener('mousemove', (e) => {
      const tip = document.getElementById('wow-item-tooltip');
      if (tip && !tip.hasAttribute('hidden')) window.positionTooltip?.(e, tip);
    });
    tbody.addEventListener('mouseout', (e) => { if (e.target.closest('.de-flip-item')) window.hideCodexItemTooltip?.(); });
    update(mount, all, false);
  }

  window.renderDisenchantFlips = function () {
    const mount = document.getElementById('codex-database-mount');
    if (!mount) return;
    mount.innerHTML = '<div style="padding:3rem 1rem;text-align:center;color:#94a3b8;">✨ Pricing every disenchant...</div>';
    const ready = window.WOW_DATA_LOADER ? window.WOW_DATA_LOADER.ensure('database') : Promise.resolve();
    ready.then(() => {
      const all = compute();
      if (!all) {
        mount.innerHTML = '<div style="padding:3rem 1rem;text-align:center;color:#fca5a5;">Market or item data is missing, so disenchant values can\'t be calculated.</div>';
        return;
      }
      render(mount, all);
    }).catch((err) => {
      mount.innerHTML = `<div style="padding:3rem 1rem;text-align:center;color:#fca5a5;">Couldn't load item data: ${String(err?.message || 'network error').replace(/[<>&]/g, '')}</div>`;
    });
  };
})();
