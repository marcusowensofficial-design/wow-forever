/**
 * World of Warcraft: Forever - Complete Item Database (22,363 Items)
 * Interactive search, category/slot/rarity/class/level/dungeon filtering,
 * vendor/AH price display, and boss drop source attribution.
 */
(function () {
  'use strict';

  const BIND_MAP = { 0: '', 1: 'BoP', 2: 'BoE', 3: 'BoU', 4: 'BoP', 5: 'BoP' };
  const Q_COLORS = {
    0: '#9d9d9d',
    1: '#f8fafc',
    2: '#1eff00',
    3: '#0070dd',
    4: '#a335ee',
    5: '#ff8000'
  };
  const Q_NAMES = ['Poor', 'Common', 'Uncommon', 'Rare', 'Epic', 'Legendary'];
  const ALIAS = { intellect: 'int', strength: 'str', agility: 'agi', stamina: 'sta', spirit: 'spi' };

  let state = {
    q: '',
    cat: 'all',
    cls: -1,
    minQuality: 0,
    bind: '',
    inst: '',
    onlyNew: false,
    onlyDrops: false,
    minLvl: 1,
    maxLvl: 60,
    sort: 'new',
    dir: -1,
    shown: 50
  };

  let indexCache = null;
  let filteredIndices = [];

  function formatCopper(copper) {
    const c = Math.round(Number(copper) || 0);
    if (c <= 0) return '—';
    const g = Math.floor(c / 10000);
    const s = Math.floor((c % 10000) / 100);
    const k = c % 100;
    if (g > 0) return `${g.toLocaleString('en-US')}g${s > 0 ? ` ${s}s` : ''}`;
    if (s > 0) return `${s}s${k > 0 ? ` ${k}c` : ''}`;
    return `${k}c`;
  }

  function esc(str) {
    return String(str == null ? '' : str).replace(/[&<>"']/g, (ch) => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    }[ch]));
  }

  function ensureIndex() {
    if (indexCache) return indexCache;
    const db = window.WOW_ITEM_DATABASE;
    if (!db || !Array.isArray(db.rows)) return null;

    const rows = db.rows;
    const meta = db.meta;
    const n = rows.length;
    const hay = new Array(n);
    const inst = meta.inst || {};
    const src = meta.src || [];
    const kinds = meta.kinds || [];

    for (let i = 0; i < n; i++) {
      const r = rows[i];
      const sList = r[13] || [];
      const srcNames = sList.map((k) => {
        const pair = src[k];
        return pair ? `${inst[pair[0]] || ''} ${pair[1]}` : '';
      }).join(' ');
      hay[i] = `${r[1]} ${kinds[r[6]] || ''} ${r[14] || ''} ${srcNames}`.toLowerCase();
    }

    indexCache = { db, rows, meta, n, hay };
    return indexCache;
  }

  function filterAndSort() {
    const idx = ensureIndex();
    if (!idx) return [];
    const { rows, meta, n, hay } = idx;
    const cats = meta.cats || [];
    const src = meta.src || [];

    const catOk = new Uint8Array(cats.length);
    for (let c = 0; c < cats.length; c++) {
      const key = cats[c];
      catOk[c] = (state.cat === 'all' || key === state.cat || key.startsWith(state.cat + ':')) ? 1 : 0;
    }

    const words = state.q
      .toLowerCase()
      .split(/\s+/)
      .map((w) => w.replace(/^\+/, ''))
      .filter(Boolean)
      .map((w) => ALIAS[w] || w);

    const out = [];
    const minL = state.minLvl || 1;
    const maxL = state.maxLvl || 60;
    const hasLvlFilter = minL > 1 || maxL < 60;

    for (let i = 0; i < n; i++) {
      const r = rows[i];
      const q = Math.min(r[2], 5);
      if (!catOk[r[5]] || q < state.minQuality) continue;

      const b = BIND_MAP[r[8]] ?? 'BoP';
      if (state.bind && b !== state.bind) continue;
      if (state.onlyNew && !(r[10] & 1)) continue;
      if (state.onlyDrops && (!r[13] || r[13].length === 0)) continue;

      const req = r[4] || 1;
      if (hasLvlFilter && (req < minL || req > maxL)) continue;

      if (state.cls >= 0 && r[11] >= 0) {
        const band = hasLvlFilter ? (maxL >= 40 ? 1 : 0) : ((r[4] >= 40 || (!r[4] && r[3] >= 45)) ? 1 : 0);
        const mask = band ? r[12] : r[11];
        if (!((mask >> state.cls) & 1)) continue;
      }

      if (state.inst) {
        const sList = r[13] || [];
        let hit = false;
        for (let k = 0; k < sList.length; k++) {
          const pair = src[sList[k]];
          if (pair && pair[0] === state.inst) {
            hit = true;
            break;
          }
        }
        if (!hit) continue;
      }

      if (words.length > 0) {
        const h = hay[i];
        let matchAll = true;
        for (let wIdx = 0; wIdx < words.length; wIdx++) {
          const w = words[wIdx];
          if (h.indexOf(w) < 0 && !(/^\d+$/.test(w) && r[0] === Number(w))) {
            matchAll = false;
            break;
          }
        }
        if (!matchAll) continue;
      }

      out.push(i);
    }

    const dir = state.dir;
    const sortMode = state.sort;
    out.sort((a, b) => {
      const ra = rows[a];
      const rb = rows[b];
      let va = 0;
      let vb = 0;
      if (sortMode === 'name') {
        return ra[1] < rb[1] ? -1 * dir : ra[1] > rb[1] ? 1 * dir : ra[0] - rb[0];
      } else if (sortMode === 'ilvl') {
        va = ra[3];
        vb = rb[3];
      } else if (sortMode === 'req') {
        va = (ra[4] || 0) * 1000 + ra[3];
        vb = (rb[4] || 0) * 1000 + rb[3];
      } else if (sortMode === 'sell') {
        va = ra[9] || 0;
        vb = rb[9] || 0;
      } else if (sortMode === 'quality') {
        va = ra[2];
        vb = rb[2];
      } else {
        va = (ra[10] & 1) * 1e7 + ra[0];
        vb = (rb[10] & 1) * 1e7 + rb[0];
      }
      if (va !== vb) return (va > vb ? 1 : -1) * dir;
      if (ra[2] !== rb[2]) return rb[2] - ra[2];
      return ra[0] - rb[0];
    });

    return out;
  }

  function renderRow(i) {
    const { rows, meta } = indexCache;
    const r = rows[i];
    const id = r[0];
    const name = r[1];
    const q = Math.min(r[2], 5);
    const ilvl = r[3];
    const req = r[4] || '—';
    const kind = (meta.kinds && meta.kinds[r[6]]) || 'Item';
    const iconName = r[7] >= 0 && meta.icons && meta.icons[r[7]] ? meta.icons[r[7]] : 'inv_misc_questionmark';
    const bind = BIND_MAP[r[8]] ?? 'BoP';
    const sell = r[9] || 0;
    const isNew = (r[10] & 1) !== 0;
    const stats = r[14] || '';
    const sList = r[13] || [];

    let bossStr = '—';
    let instStr = bind === 'BoE' ? 'World / Crafted / BoE' : '';
    let instSlug = '';
    if (sList.length > 0 && meta.src && meta.src[sList[0]]) {
      const s0 = meta.src[sList[0]];
      instSlug = s0[0];
      bossStr = s0[1];
      const extraCount = new Set(sList.map((k) => meta.src[k] && meta.src[k][0])).size - 1;
      instStr = (meta.inst && meta.inst[s0[0]] ? meta.inst[s0[0]] : s0[0]) + (extraCount > 0 ? ` (+${extraCount} more)` : '');
    }

    const marketPrice = window.WOW_MARKET_SCAN_DATA?.prices?.[id]?.minBuyout || 0;
    const priceDisplay = marketPrice > 0
      ? `<span style="color:#facc15;font-weight:700;" title="Live Server AH Scan">${formatCopper(marketPrice)}</span>`
      : `<span style="color:#94a3b8;font-size:0.78rem;">Vendor: ${formatCopper(sell)}</span>`;

    const bindBadge = bind
      ? `<span style="display:inline-block;padding:0.12rem 0.45rem;border-radius:4px;font-size:0.72rem;font-weight:700;background:${bind === 'BoE' ? 'rgba(34,197,94,0.16)' : 'rgba(245,158,11,0.16)'};color:${bind === 'BoE' ? '#4ade80' : '#fbbf24'};">${bind}</span>`
      : `<span style="color:#64748b;font-size:0.75rem;">—</span>`;

    return `
      <tr style="border-bottom:1px solid rgba(255,255,255,0.06);font-size:0.84rem;">
        <td style="padding:0.55rem 0.65rem;">
          <div style="display:flex;align-items:center;gap:0.65rem;">
            <img src="https://wow.zamimg.com/images/wow/icons/medium/${esc(iconName)}.jpg"
                 alt="" width="34" height="34" loading="lazy"
                 style="border-radius:6px;border:1.5px solid ${Q_COLORS[q]};background:#0f172a;flex-shrink:0;"
                 onerror="this.src='https://wow.zamimg.com/images/wow/icons/medium/inv_misc_questionmark.jpg'">
            <div style="min-width:0;">
              <div style="display:flex;align-items:center;gap:0.4rem;flex-wrap:wrap;">
                <a href="https://www.wowhead.com/forever/item=${id}" target="_blank" rel="noopener noreferrer"
                   style="color:${Q_COLORS[q]};font-weight:700;text-decoration:none;">${esc(name)}</a>
                ${isNew ? '<span style="background:rgba(16,185,129,0.2);color:#34d399;border:1px solid rgba(16,185,129,0.4);padding:0.05rem 0.38rem;border-radius:4px;font-size:0.66rem;font-weight:800;letter-spacing:0.04em;">NEW IN FOREVER</span>' : ''}
                <span style="color:#64748b;font-size:0.72rem;">#${id}</span>
              </div>
              <div style="color:#94a3b8;font-size:0.75rem;">
                ${esc(kind)}${stats ? ` • <span style="color:#38bdf8;">${esc(stats)}</span>` : ''}
              </div>
            </div>
          </div>
        </td>
        <td style="padding:0.55rem 0.65rem;color:#cbd5e1;">
          ${instSlug ? `<button type="button" onclick="openDungeonLootModal('${esc(instSlug)}')" style="background:none;border:none;padding:0;color:#60a5fa;font-weight:600;cursor:pointer;text-align:left;font-size:0.82rem;">${esc(bossStr)}</button>` : `<span style="color:#94a3b8;">${esc(bossStr)}</span>`}
          ${instStr ? `<div style="font-size:0.73rem;color:#64748b;">${esc(instStr)}</div>` : ''}
        </td>
        <td style="padding:0.55rem 0.5rem;text-align:center;">${bindBadge}</td>
        <td style="padding:0.55rem 0.5rem;text-align:right;color:#cbd5e1;font-variant-numeric:tabular-nums;">${req}</td>
        <td style="padding:0.55rem 0.5rem;text-align:right;color:#f8fafc;font-weight:600;font-variant-numeric:tabular-nums;">${ilvl}</td>
        <td style="padding:0.55rem 0.65rem;text-align:right;font-variant-numeric:tabular-nums;">${priceDisplay}</td>
      </tr>
    `;
  }

  function updateTableOnly(mount, append = false) {
    const tbody = mount.querySelector('#codex-db-tbody');
    const countEl = mount.querySelector('#codex-db-count');
    const moreBtn = mount.querySelector('#codex-db-more');
    if (!tbody || !countEl || !moreBtn) return;

    const total = filteredIndices.length;
    countEl.textContent = `${total.toLocaleString('en-US')} item${total === 1 ? '' : 's'} matched`;

    if (total === 0) {
      tbody.innerHTML = `<tr><td colspan="6" style="padding:2rem;text-align:center;color:#94a3b8;">No items match your current filters. Click "Reset Filters" to view all 22,363 items.</td></tr>`;
      moreBtn.style.display = 'none';
      return;
    }

    const start = append ? Math.max(0, state.shown - 50) : 0;
    const slice = filteredIndices.slice(start, state.shown);
    const html = slice.map(renderRow).join('');
    if (append) {
      tbody.insertAdjacentHTML('beforeend', html);
    } else {
      tbody.innerHTML = html;
    }

    const remaining = total - state.shown;
    if (remaining > 0) {
      moreBtn.style.display = 'inline-flex';
      moreBtn.textContent = `Load ${Math.min(50, remaining)} More Items (${remaining.toLocaleString('en-US')} remaining)`;
    } else {
      moreBtn.style.display = 'none';
    }
  }

  window.renderCodexItemDatabase = function () {
    const mount = document.getElementById('codex-database-mount');
    if (!mount) return;
    const idx = ensureIndex();
    if (!idx) {
      mount.innerHTML = `<div style="padding:2rem;text-align:center;color:#94a3b8;">Item database loading...</div>`;
      return;
    }

    const { db, meta } = idx;
    const instEntries = Object.entries(meta.inst || {});

    mount.innerHTML = `
      <div class="codex-db-wrapper" style="display:flex;flex-direction:column;gap:1.1rem;">
        <div class="section-heading-bar" style="margin-bottom:0.25rem;">
          <div>
            <h3><span>📚</span> WoW Forever Complete Item Database (${db.totalItems.toLocaleString('en-US')} Items)</h3>
            <p class="section-subtext">Search every weapon, armor piece, recipe, reagent, and boss drop extracted directly from the Build 1.60.6 game client — including ${db.newInForeverItems.toLocaleString('en-US')} brand-new Classic+ items and ${db.revealedItems.toLocaleString('en-US')} detailed items.</p>
          </div>
        </div>

        <!-- Filter Controls Bar -->
        <div style="background:rgba(15,23,42,0.75);border:1px solid var(--border-subtle);border-radius:var(--radius-md);padding:1rem;display:flex;flex-direction:column;gap:0.85rem;">
          <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(190px,1fr));gap:0.65rem;">
            <input type="search" id="codex-db-search" aria-label="Search items by name, stat, type, boss, or ID"
                   placeholder="🔍 Search name, +int, sword, VanCleef, or #ID..."
                   value="${esc(state.q)}"
                   style="grid-column:span 2;background:#0f172a;color:#f8fafc;border:1px solid #334155;border-radius:6px;padding:0.5rem 0.75rem;font-size:0.86rem;">

            <select id="codex-db-cat" aria-label="Filter items by category" style="background:#0f172a;color:#f8fafc;border:1px solid #334155;border-radius:6px;padding:0.5rem;font-size:0.84rem;">
              ${db.tree.map(([k, label]) => `<option value="${esc(k)}" ${state.cat === k ? 'selected' : ''}>${ k.includes(':') ? '— ' + esc(label) : esc(label) }</option>`).join('')}
            </select>

            <select id="codex-db-cls" aria-label="Filter items by usable class" style="background:#0f172a;color:#f8fafc;border:1px solid #334155;border-radius:6px;padding:0.5rem;font-size:0.84rem;">
              <option value="-1">All Classes</option>
              ${db.classes.map((c, i) => `<option value="${i}" ${state.cls === i ? 'selected' : ''}>Usable by ${esc(c)}</option>`).join('')}
            </select>

            <select id="codex-db-inst" aria-label="Filter items by dungeon drop source" style="background:#0f172a;color:#f8fafc;border:1px solid #334155;border-radius:6px;padding:0.5rem;font-size:0.84rem;">
              <option value="">All Sources (World &amp; Dungeons)</option>
              ${instEntries.map(([slug, name]) => `<option value="${esc(slug)}" ${state.inst === slug ? 'selected' : ''}>🏰 ${esc(name)}</option>`).join('')}
            </select>
          </div>

          <div style="display:flex;flex-wrap:wrap;align-items:center;gap:0.65rem;justify-content:space-between;">
            <div style="display:flex;flex-wrap:wrap;align-items:center;gap:0.55rem;">
              <select id="codex-db-rar" aria-label="Filter items by minimum rarity" style="background:#0f172a;color:#f8fafc;border:1px solid #334155;border-radius:6px;padding:0.38rem 0.55rem;font-size:0.8rem;">
                <option value="0">Any Rarity</option>
                <option value="2">Uncommon (Green) &amp; Up</option>
                <option value="3">Rare (Blue) &amp; Up</option>
                <option value="4">Epic (Purple) &amp; Up</option>
                <option value="5">Legendary Only</option>
              </select>

              <select id="codex-db-bind" aria-label="Filter items by binding type" style="background:#0f172a;color:#f8fafc;border:1px solid #334155;border-radius:6px;padding:0.38rem 0.55rem;font-size:0.8rem;">
                <option value="">Any Binding</option>
                <option value="BoP">Bind on Pickup (BoP)</option>
                <option value="BoE">Bind on Equip (BoE)</option>
              </select>

              <div style="display:inline-flex;align-items:center;gap:0.35rem;font-size:0.8rem;color:#cbd5e1;">
                <span>Req Lvl:</span>
                <input type="number" id="codex-db-minlvl" aria-label="Minimum required level" min="1" max="60" value="${state.minLvl}" style="width:52px;background:#0f172a;color:#fff;border:1px solid #334155;border-radius:5px;padding:0.3rem;text-align:center;">
                <span>–</span>
                <input type="number" id="codex-db-maxlvl" aria-label="Maximum required level" min="1" max="60" value="${state.maxLvl}" style="width:52px;background:#0f172a;color:#fff;border:1px solid #334155;border-radius:5px;padding:0.3rem;text-align:center;">
              </div>

              <label style="display:inline-flex;align-items:center;gap:0.35rem;font-size:0.8rem;color:#34d399;font-weight:600;cursor:pointer;">
                <input type="checkbox" id="codex-db-new" aria-label="Only show items new in WoW Forever" ${state.onlyNew ? 'checked' : ''}>
                ✦ New in Forever (${db.newInForeverItems.toLocaleString('en-US')})
              </label>

              <label style="display:inline-flex;align-items:center;gap:0.35rem;font-size:0.8rem;color:#60a5fa;font-weight:600;cursor:pointer;">
                <input type="checkbox" id="codex-db-drops" aria-label="Only show boss drops" ${state.onlyDrops ? 'checked' : ''}>
                ⚔️ Boss Drops Only
              </label>
            </div>

            <div style="display:flex;align-items:center;gap:0.55rem;">
              <select id="codex-db-sort" aria-label="Sort item database results" style="background:#0f172a;color:#f8fafc;border:1px solid #334155;border-radius:6px;padding:0.38rem 0.55rem;font-size:0.8rem;">
                <option value="new">Sort: Newest / Forever First</option>
                <option value="ilvl">Sort: Item Level (High → Low)</option>
                <option value="req">Sort: Req Level (High → Low)</option>
                <option value="quality">Sort: Rarity (High → Low)</option>
                <option value="sell">Sort: Vendor Value (High → Low)</option>
                <option value="name">Sort: Name (A → Z)</option>
              </select>
              <button type="button" id="codex-db-reset" style="background:rgba(239,68,68,0.15);color:#fca5a5;border:1px solid rgba(239,68,68,0.35);border-radius:6px;padding:0.38rem 0.7rem;font-size:0.78rem;font-weight:600;cursor:pointer;">Reset Filters</button>
            </div>
          </div>
        </div>

        <!-- Results Status Bar -->
        <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:0.5rem;padding:0 0.25rem;">
          <strong id="codex-db-count" style="color:#f5d061;font-size:0.92rem;">Loading...</strong>
          <span style="font-size:0.78rem;color:#94a3b8;">💡 Click any item name for full Wowhead Forever tooltip or click a Boss name to open its Dungeon Loot Table.</span>
        </div>

        <!-- Results Table -->
        <div class="table-responsive-wrapper" style="background:rgba(15,23,42,0.65);border:1px solid var(--border-subtle);border-radius:var(--radius-md);overflow-x:auto;">
          <table style="width:100%;border-collapse:collapse;">
            <thead>
              <tr style="border-bottom:2px solid var(--border-subtle);text-align:left;font-size:0.76rem;color:var(--text-gold);text-transform:uppercase;letter-spacing:0.06em;background:rgba(0,0,0,0.25);">
                <th style="padding:0.65rem;">Item &amp; Stats</th>
                <th style="padding:0.65rem;">Drop Source / Instance</th>
                <th style="padding:0.65rem;text-align:center;">Bind</th>
                <th style="padding:0.65rem;text-align:right;">Req</th>
                <th style="padding:0.65rem;text-align:right;">iLvl</th>
                <th style="padding:0.65rem;text-align:right;">Value / AH</th>
              </tr>
            </thead>
            <tbody id="codex-db-tbody"></tbody>
          </table>
        </div>

        <div style="text-align:center;margin-top:0.4rem;">
          <button type="button" id="codex-db-more" class="btn-primary" style="padding:0.55rem 1.4rem;font-size:0.85rem;border-radius:999px;cursor:pointer;">Load 50 More Items</button>
        </div>
      </div>
    `;

    const refresh = () => {
      state.shown = 50;
      filteredIndices = filterAndSort();
      updateTableOnly(mount, false);
    };

    let timer = null;
    mount.querySelector('#codex-db-search')?.addEventListener('input', (e) => {
      state.q = e.target.value.trim();
      clearTimeout(timer);
      timer = setTimeout(refresh, 90);
    });
    mount.querySelector('#codex-db-cat')?.addEventListener('change', (e) => { state.cat = e.target.value; refresh(); });
    mount.querySelector('#codex-db-cls')?.addEventListener('change', (e) => { state.cls = Number(e.target.value); refresh(); });
    mount.querySelector('#codex-db-inst')?.addEventListener('change', (e) => { state.inst = e.target.value; refresh(); });
    mount.querySelector('#codex-db-rar')?.addEventListener('change', (e) => { state.minQuality = Number(e.target.value); refresh(); });
    mount.querySelector('#codex-db-bind')?.addEventListener('change', (e) => { state.bind = e.target.value; refresh(); });
    mount.querySelector('#codex-db-minlvl')?.addEventListener('input', (e) => { state.minLvl = Math.max(1, Math.min(60, Number(e.target.value) || 1)); refresh(); });
    mount.querySelector('#codex-db-maxlvl')?.addEventListener('input', (e) => { state.maxLvl = Math.max(1, Math.min(60, Number(e.target.value) || 60)); refresh(); });
    mount.querySelector('#codex-db-new')?.addEventListener('change', (e) => { state.onlyNew = e.target.checked; refresh(); });
    mount.querySelector('#codex-db-drops')?.addEventListener('change', (e) => { state.onlyDrops = e.target.checked; refresh(); });
    mount.querySelector('#codex-db-sort')?.addEventListener('change', (e) => {
      state.sort = e.target.value;
      state.dir = state.sort === 'name' ? 1 : -1;
      refresh();
    });
    mount.querySelector('#codex-db-reset')?.addEventListener('click', () => {
      state = { q: '', cat: 'all', cls: -1, minQuality: 0, bind: '', inst: '', onlyNew: false, onlyDrops: false, minLvl: 1, maxLvl: 60, sort: 'new', dir: -1, shown: 50 };
      window.renderCodexItemDatabase();
    });
    mount.querySelector('#codex-db-more')?.addEventListener('click', () => {
      state.shown += 50;
      updateTableOnly(mount, true);
    });

    refresh();
  };
})();
