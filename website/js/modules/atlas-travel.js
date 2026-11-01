/**
 * World of Warcraft: Forever - Azeroth Flight Network & New Taxi Nodes
 * Pure Logic Module — Controller, View Renderer, and Event Dispatcher
 */
(function () {
  'use strict';

  let state = {
    search: '',
    side: 'all',
    continent: 'all',
    onlyNew: false,
    selectedNodeId: null
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

  function getFilteredNodes() {
    const raw = window.WOW_TRAVEL_DATA?.nodes || [];
    return raw.filter(n => {
      if (state.side !== 'all' && n.side.toLowerCase() !== state.side.toLowerCase()) return false;
      if (state.continent !== 'all' && String(n.continent) !== String(state.continent)) return false;
      if (state.onlyNew && !n.isNewInForever) return false;
      if (state.search) {
        const q = state.search.toLowerCase();
        const matchesName = n.name.toLowerCase().includes(q);
        const matchesZone = n.zone.toLowerCase().includes(q);
        const matchesConn = n.connections.some(c => c.toName.toLowerCase().includes(q));
        if (!matchesName && !matchesZone && !matchesConn) return false;
      }
      return true;
    });
  }

  function renderNodeCard(n) {
    const isSelected = state.selectedNodeId === n.id;
    const sideColor = n.side === 'Horde' ? '#ef4444' : (n.side === 'Alliance' ? '#3b82f6' : '#f59e0b');
    const sideBg = n.side === 'Horde' ? 'rgba(239,68,68,0.15)' : (n.side === 'Alliance' ? 'rgba(59,130,246,0.15)' : 'rgba(245,158,11,0.15)');
    const sideIcon = n.side === 'Horde' ? '🦅' : (n.side === 'Alliance' ? '🦁' : '🕊️');

    const connRows = n.connections.map(c => `
      <div style="display:flex;align-items:center;justify-content:space-between;padding:0.35rem 0.6rem;background:rgba(255,255,255,0.03);border-radius:4px;margin-bottom:0.25rem;font-size:0.78rem;">
        <div style="display:flex;align-items:center;gap:0.4rem;min-width:0;">
          <span style="color:#cbd5e1;font-weight:600;">➔ ${esc(c.toName)}</span>
          <span style="color:#64748b;font-size:0.7rem;">(${esc(c.toZone)})</span>
        </div>
        <div style="display:flex;align-items:center;gap:0.75rem;flex-shrink:0;">
          <span style="color:#38bdf8;font-size:0.72rem;font-weight:600;">⏱️ ${esc(c.timeText)}</span>
          <span style="color:#facc15;font-size:0.72rem;font-weight:700;">🪙 ${esc(c.costText)}</span>
        </div>
      </div>
    `).join('');

    return `
      <div class="atlas-travel-card" style="background:#0f172a;border:1px solid ${n.isNewInForever ? 'rgba(52,211,153,0.4)' : (isSelected ? '#3b82f6' : 'rgba(255,255,255,0.08)')};border-radius:8px;padding:1rem;display:flex;flex-direction:column;gap:0.75rem;transition:border-color 0.15s ease;">
        <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:0.5rem;border-bottom:1px solid rgba(255,255,255,0.06);padding-bottom:0.6rem;">
          <div>
            <div style="display:flex;align-items:center;gap:0.45rem;flex-wrap:wrap;">
              <span style="font-size:1.1rem;">${sideIcon}</span>
              <h4 style="margin:0;font-size:1.05rem;color:#f8fafc;font-weight:700;">${esc(n.name)}</h4>
              ${n.isNewInForever ? '<span style="background:rgba(16,185,129,0.25);color:#34d399;border:1px solid rgba(16,185,129,0.4);font-size:0.65rem;font-weight:800;padding:0.1rem 0.4rem;border-radius:4px;">NEW TAXI NODE</span>' : ''}
            </div>
            <div style="display:flex;align-items:center;gap:0.5rem;margin-top:0.3rem;font-size:0.75rem;color:#94a3b8;flex-wrap:wrap;">
              <span style="color:${sideColor};background:${sideBg};padding:0.1rem 0.4rem;border-radius:4px;font-weight:700;">${esc(n.side)}</span>
              <span>•</span>
              <span style="color:#cbd5e1;">📍 ${esc(n.zone)}</span>
              <span>•</span>
              <span>${esc(n.continentName)}</span>
              <span>•</span>
              <span style="color:#64748b;">Coords: ${n.coords.x}, ${n.coords.y}</span>
            </div>
          </div>
          <button type="button" class="btn-copy-macro tomtom"
                  onclick="copyMacroToClipboard('/way ${esc(n.zone)} ${n.coords.x} ${n.coords.y} ${esc(n.name)} Flight Master', this)"
                  style="flex-shrink:0;padding:0.3rem 0.6rem;font-size:0.75rem;"
                  title="Copy TomTom waypoint to clipboard">
            📍 /way
          </button>
        </div>

        <div>
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:0.4rem;">
            <span style="font-size:0.75rem;color:#94a3b8;font-weight:700;text-transform:uppercase;letter-spacing:0.04em;">
              Direct Flight Paths (${n.connections.length})
            </span>
          </div>
          ${connRows || '<div style="font-size:0.75rem;color:#64748b;font-style:italic;">No direct outbound flight routes recorded.</div>'}
        </div>
      </div>
    `;
  }

  function renderView() {
    const mount = document.getElementById('atlas-travel-mount');
    if (!mount) return;

    const filtered = getFilteredNodes();
    const cardsHtml = filtered.map(renderNodeCard).join('');

    mount.innerHTML = `
      <div style="display:flex;flex-direction:column;gap:1.25rem;">
        <!-- Controls Bar -->
        <div style="background:rgba(15,23,42,0.8);border:1px solid rgba(255,255,255,0.08);border-radius:8px;padding:0.85rem;display:flex;flex-wrap:wrap;gap:0.75rem;align-items:center;justify-content:space-between;">
          <div style="display:flex;flex-wrap:wrap;gap:0.6rem;align-items:center;flex:1;min-width:280px;">
            <input type="text" id="atlas-travel-search-input" placeholder="Search 82 flight masters, zones, or destinations..."
                   value="${esc(state.search)}"
                   aria-label="Search flight masters"
                   style="background:#1e293b;border:1px solid rgba(255,255,255,0.12);color:#f8fafc;padding:0.45rem 0.75rem;border-radius:6px;font-size:0.85rem;min-width:220px;flex:1;">
            
            <select id="atlas-travel-side-select" aria-label="Filter flight masters by faction"
                    style="background:#1e293b;border:1px solid rgba(255,255,255,0.12);color:#cbd5e1;padding:0.45rem 0.65rem;border-radius:6px;font-size:0.85rem;">
              <option value="all" ${state.side === 'all' ? 'selected' : ''}>All Factions</option>
              <option value="Alliance" ${state.side === 'Alliance' ? 'selected' : ''}>Alliance Flight Masters</option>
              <option value="Horde" ${state.side === 'Horde' ? 'selected' : ''}>Horde Flight Masters</option>
              <option value="Neutral" ${state.side === 'Neutral' ? 'selected' : ''}>Neutral Flight Masters</option>
            </select>

            <select id="atlas-travel-continent-select" aria-label="Filter flight masters by continent"
                    style="background:#1e293b;border:1px solid rgba(255,255,255,0.12);color:#cbd5e1;padding:0.45rem 0.65rem;border-radius:6px;font-size:0.85rem;">
              <option value="all" ${state.continent === 'all' ? 'selected' : ''}>Both Continents</option>
              <option value="0" ${state.continent === '0' ? 'selected' : ''}>Eastern Kingdoms</option>
              <option value="1" ${state.continent === '1' ? 'selected' : ''}>Kalimdor</option>
            </select>

            <label style="display:inline-flex;align-items:center;gap:0.35rem;font-size:0.8rem;color:#34d399;font-weight:600;cursor:pointer;">
              <input type="checkbox" id="atlas-travel-only-new" aria-label="Only show new flight nodes in WoW Forever" ${state.onlyNew ? 'checked' : ''}>
              ✦ New Forever Nodes (7)
            </label>
          </div>
          <div style="font-size:0.8rem;color:#94a3b8;font-weight:600;">
            Showing <span style="color:#f8fafc;">${filtered.length}</span> flight hubs
          </div>
        </div>

        <!-- Flight Hubs Grid -->
        <div style="display:grid;grid-template-columns:repeat(auto-fill, minmax(360px, 1fr));gap:1rem;">
          ${cardsHtml || '<div style="grid-column:1/-1;text-align:center;padding:3rem 1rem;color:#64748b;">No flight masters found matching your criteria.</div>'}
        </div>
      </div>
    `;

    // Listeners
    const searchInput = document.getElementById('atlas-travel-search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        state.search = e.target.value.trim();
        renderView();
      });
    }

    const sideSelect = document.getElementById('atlas-travel-side-select');
    if (sideSelect) {
      sideSelect.addEventListener('change', (e) => {
        state.side = e.target.value;
        renderView();
      });
    }

    const contSelect = document.getElementById('atlas-travel-continent-select');
    if (contSelect) {
      contSelect.addEventListener('change', (e) => {
        state.continent = e.target.value;
        renderView();
      });
    }

    const newToggle = document.getElementById('atlas-travel-only-new');
    if (newToggle) {
      newToggle.addEventListener('change', (e) => {
        state.onlyNew = e.target.checked;
        renderView();
      });
    }
  }

  window.initAtlasTravel = function () {
    renderView();
  };

})();
