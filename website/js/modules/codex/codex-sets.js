/**
 * World of Warcraft: Forever - Armor Sets & Set Bonuses Explorer (228 Sets)
 * Pure Logic Module — Controller, View Renderer, and Event Dispatcher
 */
(function () {
  'use strict';

  const KIND_LABELS = {
    all: 'All Sets',
    t1: 'Tier 1 (MC)',
    t2: 'Tier 2 (BWL)',
    t3: 'Tier 3 (Naxx)',
    dungeon: 'Dungeon Sets',
    pvp: 'PvP Armor',
    forever: 'Custom Forever Sets',
    other: 'Crafted & World Sets'
  };

  const Q_COLORS = {
    0: '#9d9d9d',
    1: '#f8fafc',
    2: '#1eff00',
    3: '#0070dd',
    4: '#a335ee',
    5: '#ff8000'
  };

  let state = {
    search: '',
    kind: 'all',
    cls: 'all',
    shown: 24
  };

  function esc(str) {
    return String(str == null ? '' : str).replace(/[&<>"']/g, (ch) => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    }[ch]));
  }

  function getFilteredSets() {
    const raw = window.WOW_GEAR_SETS || [];
    return raw.filter((s) => {
      if (state.kind !== 'all' && s.kind !== state.kind) return false;
      if (state.cls !== 'all') {
        const clsLower = state.cls.toLowerCase();
        const setCls = (s.className || '').toLowerCase();
        if (setCls !== 'all' && !setCls.includes(clsLower)) return false;
      }
      if (state.search) {
        const q = state.search.toLowerCase();
        const matchesName = s.name.toLowerCase().includes(q);
        const matchesPiece = s.pieces.some(p => p.name.toLowerCase().includes(q));
        if (!matchesName && !matchesPiece) return false;
      }
      return true;
    });
  }

  function renderSetCard(s) {
    const kindBadge = KIND_LABELS[s.kind] || s.kind;
    const isForever = s.kind === 'forever' || s.pieces.some(p => p.isNew);
    const clsBadge = s.className && s.className !== 'All' ? s.className : 'All Classes';
    const factionBadge = s.faction === 'Horde' ? '<span style="color:#ef4444;background:rgba(239,68,68,0.15);padding:0.1rem 0.4rem;border-radius:4px;font-size:0.7rem;font-weight:700;">Horde</span>'
      : (s.faction === 'Alliance' ? '<span style="color:#3b82f6;background:rgba(59,130,246,0.15);padding:0.1rem 0.4rem;border-radius:4px;font-size:0.7rem;font-weight:700;">Alliance</span>' : '');

    const piecesHtml = s.pieces.map((p) => {
      const qColor = Q_COLORS[p.quality] || '#0070dd';
      return `
        <div style="display:flex;align-items:center;justify-content:space-between;padding:0.35rem 0.5rem;border-radius:4px;background:rgba(255,255,255,0.03);margin-bottom:0.25rem;font-size:0.8rem;">
          <div style="display:flex;align-items:center;gap:0.45rem;min-width:0;">
            <span style="font-size:0.7rem;color:#94a3b8;width:70px;flex-shrink:0;">${esc(p.slotName)}</span>
            <a href="https://www.wowhead.com/forever/item=${p.itemId}" target="_blank" rel="noopener noreferrer"
               style="color:${qColor};font-weight:600;text-decoration:none;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${esc(p.name)}</a>
            ${p.isNew ? '<span style="background:rgba(16,185,129,0.2);color:#34d399;font-size:0.62rem;padding:0 0.3rem;border-radius:3px;font-weight:800;">NEW</span>' : ''}
          </div>
          <span style="font-size:0.72rem;color:#64748b;text-align:right;white-space:nowrap;margin-left:0.5rem;">${esc(p.source)}</span>
        </div>
      `;
    }).join('');

    return `
      <div class="gear-set-card" style="background:#0f172a;border:1px solid ${isForever ? 'rgba(52,211,153,0.35)' : 'rgba(255,255,255,0.08)'};border-radius:8px;padding:1rem;display:flex;flex-direction:column;gap:0.75rem;">
        <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:0.5rem;border-bottom:1px solid rgba(255,255,255,0.06);padding-bottom:0.6rem;">
          <div>
            <div style="display:flex;align-items:center;gap:0.5rem;flex-wrap:wrap;">
              <h4 style="margin:0;font-size:1.05rem;color:#f8fafc;font-weight:700;">${esc(s.name)}</h4>
              ${isForever ? '<span style="background:rgba(16,185,129,0.25);color:#34d399;border:1px solid rgba(16,185,129,0.4);font-size:0.65rem;font-weight:800;padding:0.1rem 0.4rem;border-radius:4px;">FOREVER EXCLUSIVE</span>' : ''}
            </div>
            <div style="display:flex;align-items:center;gap:0.5rem;margin-top:0.3rem;font-size:0.75rem;color:#94a3b8;flex-wrap:wrap;">
              <span style="color:#a855f7;font-weight:600;">${esc(kindBadge)}</span>
              <span>•</span>
              <span style="color:#38bdf8;">${esc(clsBadge)}</span>
              ${s.reqLevel > 0 ? `<span>•</span><span>Req Level ${s.reqLevel}</span>` : ''}
              ${factionBadge ? `<span>•</span>${factionBadge}` : ''}
            </div>
          </div>
          <span style="background:rgba(255,255,255,0.06);color:#cbd5e1;padding:0.2rem 0.5rem;border-radius:4px;font-size:0.72rem;font-weight:700;white-space:nowrap;">
            ${s.piecesCount} Pieces
          </span>
        </div>
        <div class="gear-set-pieces-list">
          ${piecesHtml}
        </div>
      </div>
    `;
  }

  function renderView() {
    const mount = document.getElementById('codex-sets-container');
    if (!mount) return;

    const filtered = getFilteredSets();
    const slice = filtered.slice(0, state.shown);
    const hasMore = filtered.length > state.shown;

    const cardsHtml = slice.map(renderSetCard).join('');

    mount.innerHTML = `
      <div style="display:flex;flex-direction:column;gap:1.25rem;">
        <!-- Controls Bar -->
        <div style="background:rgba(15,23,42,0.8);border:1px solid rgba(255,255,255,0.08);border-radius:8px;padding:0.85rem;display:flex;flex-wrap:wrap;gap:0.75rem;align-items:center;justify-content:space-between;">
          <div style="display:flex;flex-wrap:wrap;gap:0.6rem;align-items:center;flex:1;min-width:280px;">
            <input type="text" id="codex-sets-search-input" placeholder="Search 228 armor sets or piece names..."
                   value="${esc(state.search)}"
                   aria-label="Search armor sets"
                   style="background:#1e293b;border:1px solid rgba(255,255,255,0.12);color:#f8fafc;padding:0.45rem 0.75rem;border-radius:6px;font-size:0.85rem;min-width:220px;flex:1;">
            
            <select id="codex-sets-kind-select" aria-label="Filter sets by tier"
                    style="background:#1e293b;border:1px solid rgba(255,255,255,0.12);color:#cbd5e1;padding:0.45rem 0.65rem;border-radius:6px;font-size:0.85rem;">
              ${Object.entries(KIND_LABELS).map(([k, label]) => `<option value="${k}" ${state.kind === k ? 'selected' : ''}>${label}</option>`).join('')}
            </select>

            <select id="codex-sets-class-select" aria-label="Filter sets by class"
                    style="background:#1e293b;border:1px solid rgba(255,255,255,0.12);color:#cbd5e1;padding:0.45rem 0.65rem;border-radius:6px;font-size:0.85rem;">
              <option value="all" ${state.cls === 'all' ? 'selected' : ''}>All Classes</option>
              <option value="Warrior" ${state.cls === 'Warrior' ? 'selected' : ''}>Warrior</option>
              <option value="Paladin" ${state.cls === 'Paladin' ? 'selected' : ''}>Paladin</option>
              <option value="Hunter" ${state.cls === 'Hunter' ? 'selected' : ''}>Hunter</option>
              <option value="Rogue" ${state.cls === 'Rogue' ? 'selected' : ''}>Rogue</option>
              <option value="Priest" ${state.cls === 'Priest' ? 'selected' : ''}>Priest</option>
              <option value="Shaman" ${state.cls === 'Shaman' ? 'selected' : ''}>Shaman</option>
              <option value="Mage" ${state.cls === 'Mage' ? 'selected' : ''}>Mage</option>
              <option value="Warlock" ${state.cls === 'Warlock' ? 'selected' : ''}>Warlock</option>
              <option value="Druid" ${state.cls === 'Druid' ? 'selected' : ''}>Druid</option>
            </select>
          </div>
          <div style="font-size:0.8rem;color:#94a3b8;font-weight:600;">
            Showing <span style="color:#f8fafc;">${slice.length}</span> of <span style="color:#38bdf8;">${filtered.length}</span> sets
          </div>
        </div>

        <!-- Sets Grid -->
        <div style="display:grid;grid-template-columns:repeat(auto-fill, minmax(340px, 1fr));gap:1rem;">
          ${cardsHtml || '<div style="grid-column:1/-1;text-align:center;padding:3rem 1rem;color:#64748b;">No armor sets found matching your criteria.</div>'}
        </div>

        ${hasMore ? `
          <div style="text-align:center;margin-top:1rem;">
            <button type="button" id="codex-sets-load-more"
                    style="background:#3b82f6;color:#ffffff;border:none;padding:0.6rem 1.5rem;border-radius:6px;font-weight:700;font-size:0.85rem;cursor:pointer;">
              Load More Sets (+24)
            </button>
          </div>
        ` : ''}
      </div>
    `;

    // Wire listeners
    const searchInput = document.getElementById('codex-sets-search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        state.search = e.target.value.trim();
        state.shown = 24;
        renderView();
      });
    }

    const kindSelect = document.getElementById('codex-sets-kind-select');
    if (kindSelect) {
      kindSelect.addEventListener('change', (e) => {
        state.kind = e.target.value;
        state.shown = 24;
        renderView();
      });
    }

    const clsSelect = document.getElementById('codex-sets-class-select');
    if (clsSelect) {
      clsSelect.addEventListener('change', (e) => {
        state.cls = e.target.value;
        state.shown = 24;
        renderView();
      });
    }

    const loadMoreBtn = document.getElementById('codex-sets-load-more');
    if (loadMoreBtn) {
      loadMoreBtn.addEventListener('click', () => {
        state.shown += 24;
        renderView();
      });
    }
  }

  window.openGearSetModal = function (setId) {
    const raw = window.WOW_GEAR_SETS || [];
    const s = raw.find(x => x.id === Number(setId));
    if (!s) return;

    let modal = document.getElementById('gear-set-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'gear-set-modal';
      modal.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.75);display:flex;align-items:center;justify-content:center;z-index:9999;padding:1rem;backdrop-filter:blur(4px);';
      modal.innerHTML = `
        <div id="gear-set-modal-box" style="background:#0b1120;border:1px solid rgba(255,255,255,0.15);border-radius:12px;max-width:600px;width:100%;max-height:85vh;overflow-y:auto;padding:1.5rem;position:relative;box-shadow:0 25px 50px -12px rgba(0,0,0,0.5);">
          <button type="button" onclick="document.getElementById('gear-set-modal').style.display='none'"
                  style="position:absolute;top:1rem;right:1rem;background:none;border:none;color:#94a3b8;font-size:1.5rem;cursor:pointer;">&times;</button>
          <div id="gear-set-modal-content"></div>
        </div>
      `;
      document.body.appendChild(modal);
      modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.style.display = 'none';
      });
    }

    const content = document.getElementById('gear-set-modal-content');
    if (content) {
      content.innerHTML = renderSetCard(s);
    }
    modal.style.display = 'flex';
  };

  window.initCodexSets = function () {
    renderView();
  };

})();
