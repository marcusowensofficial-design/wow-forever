/**
 * World of Warcraft: Forever - Factions & Reputation Directory
 * Pure Logic Module — Controller, View Renderer, and Event Dispatcher
 */
(function () {
  'use strict';

  let state = {
    allegiance: 'all', // 'all' | 'alliance' | 'horde' | 'neutral'
    search: '',
    newOnly: false,
    selectedRank: 'all'
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

  function getFilteredFactions() {
    const raw = window.WOW_REPUTATION_DATA?.factions || [];
    return raw.filter(f => {
      if (state.newOnly && !f.isNewInForever) return false;

      if (state.allegiance === 'alliance' && f.side !== 'Alliance' && f.side !== 'Neutral') return false;
      if (state.allegiance === 'horde' && f.side !== 'Horde' && f.side !== 'Neutral') return false;
      if (state.allegiance === 'neutral' && f.side !== 'Neutral') return false;

      if (state.search) {
        const q = state.search.toLowerCase();
        const nMatch = (f.name || '').toLowerCase().includes(q);
        const dMatch = (f.desc || '').toLowerCase().includes(q);
        const qmMatch = (f.quartermasters || []).some(qm => qm.name.toLowerCase().includes(q) || (qm.zone && qm.zone.toLowerCase().includes(q)));
        const rMatch = (f.rewards || []).some(r => r.name.toLowerCase().includes(q));
        if (!nMatch && !dMatch && !qmMatch && !rMatch) return false;
      }
      return true;
    });
  }

  function renderFactionCard(f) {
    const sideIcon = f.side === 'Horde' ? '🦅' : (f.side === 'Alliance' ? '🦁' : '🕊️');
    const sideColor = f.side === 'Horde' ? '#ef4444' : (f.side === 'Alliance' ? '#3b82f6' : '#94a3b8');

    return `
      <div class="collection-item-card" style="background:#0f172a;border:1px solid rgba(255,255,255,0.08);border-radius:8px;padding:1.1rem;display:flex;flex-direction:column;justify-content:space-between;gap:0.9rem;transition:border-color 0.2s ease;">
        <div>
          <!-- Header Bar -->
          <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:0.75rem;margin-bottom:0.5rem;">
            <div>
              <div style="display:flex;align-items:center;gap:0.45rem;margin-bottom:0.25rem;">
                <span style="font-size:1.25rem;">📜</span>
                <h3 style="margin:0;font-size:1.05rem;color:#f8fafc;font-weight:700;">${esc(f.name)}</h3>
              </div>
              <div style="display:flex;align-items:center;gap:0.4rem;flex-wrap:wrap;">
                <span style="color:${sideColor};font-size:0.75rem;font-weight:700;">
                  ${sideIcon} ${esc(f.side)}
                </span>
                <span style="color:#64748b;font-size:0.72rem;">• ${esc(f.category)}</span>
                ${f.isNewInForever ? `
                  <span style="background:rgba(16,185,129,0.2);color:#34d399;border:1px solid rgba(16,185,129,0.4);padding:0.1rem 0.45rem;border-radius:4px;font-size:0.7rem;font-weight:800;letter-spacing:0.03em;">
                    NEW IN FOREVER
                  </span>
                ` : ''}
              </div>
            </div>

            <span style="background:rgba(59,130,246,0.12);color:#60a5fa;border:1px solid rgba(59,130,246,0.3);padding:0.2rem 0.5rem;border-radius:6px;font-size:0.74rem;font-weight:700;flex-shrink:0;">
              ID #${f.id}
            </span>
          </div>

          <!-- Description -->
          <p style="font-size:0.83rem;color:#cbd5e1;line-height:1.5;margin:0 0 0.75rem 0;">
            ${esc(f.desc || 'Renowned faction active in World of Warcraft: Forever with quartermasters and progression rewards.')}
          </p>

          <!-- Quartermaster NPCs -->
          ${(f.quartermasters && f.quartermasters.length > 0) ? `
            <div style="background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.06);padding:0.5rem 0.75rem;border-radius:6px;margin-bottom:0.75rem;">
              <span style="font-size:0.73rem;color:#94a3b8;font-weight:700;text-transform:uppercase;display:block;margin-bottom:0.3rem;">Quartermasters &amp; Officers:</span>
              <div style="display:flex;flex-direction:column;gap:0.25rem;">
                ${f.quartermasters.map(qm => `
                  <div style="display:flex;align-items:center;justify-content:space-between;font-size:0.77rem;color:#cbd5e1;">
                    <span><strong>${esc(qm.name)}</strong> <span style="color:#64748b;">(${esc(qm.zone || 'Outpost')})</span></span>
                    ${qm.x && qm.y ? `<code style="color:#fbbf24;background:rgba(0,0,0,0.3);padding:0.1rem 0.35rem;border-radius:3px;">/way ${qm.x}, ${qm.y}</code>` : ''}
                  </div>
                `).join('')}
              </div>
            </div>
          ` : ''}

          <!-- Known Rewards Preview -->
          ${(f.rewards && f.rewards.length > 0) ? `
            <div>
              <span style="font-size:0.73rem;color:#64748b;font-weight:700;text-transform:uppercase;display:block;margin-bottom:0.35rem;">Quartermaster Offerings:</span>
              <div style="display:flex;gap:0.35rem;flex-wrap:wrap;">
                ${f.rewards.map(r => `
                  <span style="background:rgba(15,23,42,0.8);border:1px solid rgba(255,255,255,0.1);padding:0.2rem 0.5rem;border-radius:4px;font-size:0.73rem;color:${r.quality === 4 ? '#c084fc' : (r.quality === 3 ? '#60a5fa' : '#34d399')};">
                    ${esc(r.name)} <span style="color:#94a3b8;font-size:0.68rem;">[${esc(r.standing)}]</span>
                  </span>
                `).join('')}
              </div>
            </div>
          ` : ''}
        </div>

        <!-- Footer -->
        <div style="border-top:1px solid rgba(255,255,255,0.06);padding-top:0.45rem;font-size:0.72rem;color:#64748b;display:flex;align-items:center;justify-content:space-between;">
          <span>${f.rewardsCount ? `${f.rewardsCount} Distinct Rewards` : 'Reputation Progression'}</span>
          <a href="https://www.wowhead.com/forever/faction=${f.id}" target="_blank" rel="noopener noreferrer" style="color:#f59e0b;font-weight:600;text-decoration:none;">
            Wowhead ↗
          </a>
        </div>
      </div>
    `;
  }

  function renderReputation() {
    const container = document.getElementById('codex-reputation-container');
    if (!container) return;

    const factions = getFilteredFactions();
    const data = window.WOW_REPUTATION_DATA || { meta: {}, factions: [] };
    const newCount = data.factions.filter(f => f.isNewInForever).length;

    container.innerHTML = `
      <div style="display:flex;flex-direction:column;gap:1.25rem;width:100%;">
        <!-- Header Banner -->
        <div style="background:linear-gradient(135deg, rgba(30,41,59,0.8) 0%, rgba(15,23,42,0.95) 100%);border:1px solid rgba(255,255,255,0.1);border-radius:8px;padding:1.25rem 1.5rem;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:1rem;">
          <div>
            <h2 style="margin:0 0 0.35rem 0;font-size:1.35rem;color:#fde047;font-weight:800;">
              📜 Factions &amp; Standing Matrix
            </h2>
            <p style="margin:0;font-size:0.88rem;color:#94a3b8;line-height:1.5;">
              Directory of all ${data.factions.length} factions in World of Warcraft: Forever, highlighting the <strong>${newCount} brand-new Forever factions</strong>, quartermaster coordinates, and standing tiers.
            </p>
          </div>
          <div style="display:flex;align-items:center;gap:0.5rem;">
            <span style="background:rgba(16,185,129,0.15);color:#34d399;border:1px solid rgba(16,185,129,0.3);padding:0.35rem 0.75rem;border-radius:6px;font-size:0.8rem;font-weight:700;">
              ${newCount} New Forever Factions
            </span>
          </div>
        </div>

        <!-- Filter Bar -->
        <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:0.75rem;border-bottom:1px solid rgba(255,255,255,0.08);padding-bottom:0.75rem;">
          <div class="atlas-filter-pills">
            <button class="atlas-pill ${state.allegiance === 'all' ? 'active' : ''}" data-rep-side="all">All Factions (${data.factions.length})</button>
            <button class="atlas-pill ${state.allegiance === 'alliance' ? 'active' : ''}" data-rep-side="alliance">🦁 Alliance</button>
            <button class="atlas-pill ${state.allegiance === 'horde' ? 'active' : ''}" data-rep-side="horde">🦅 Horde</button>
            <button class="atlas-pill ${state.allegiance === 'neutral' ? 'active' : ''}" data-rep-side="neutral">🕊️ Neutral</button>
            <button class="atlas-pill ${state.newOnly ? 'active' : ''}" id="rep-new-only" style="${state.newOnly ? 'background:#059669;border-color:#10b981;color:#fff;font-weight:700;' : ''}">
              ✨ New in Forever (${newCount})
            </button>
          </div>

          <div class="atlas-search-box" style="width:260px;">
            <span class="atlas-search-icon">🔍</span>
            <input type="text" id="rep-search-input" class="atlas-input" placeholder="Search factions..." value="${esc(state.search)}" aria-label="Search factions">
          </div>
        </div>

        <!-- Standing Tiers Scale Visualizer -->
        <div style="background:rgba(15,23,42,0.6);border:1px solid rgba(255,255,255,0.06);padding:0.85rem 1rem;border-radius:8px;display:flex;flex-direction:column;gap:0.5rem;">
          <span style="font-size:0.75rem;color:#94a3b8;font-weight:700;text-transform:uppercase;">WoW Forever Standing Thresholds &amp; Multipliers:</span>
          <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(110px, 1fr));gap:0.5rem;font-size:0.74rem;text-align:center;">
            <div style="background:rgba(239,68,68,0.15);color:#fca5a5;padding:0.35rem;border-radius:4px;border:1px solid rgba(239,68,68,0.3);">
              <strong>Hated</strong><br><span style="font-size:0.68rem;color:#94a3b8;">-42k to -6k</span>
            </div>
            <div style="background:rgba(239,68,68,0.1);color:#f87171;padding:0.35rem;border-radius:4px;border:1px solid rgba(239,68,68,0.2);">
              <strong>Hostile</strong><br><span style="font-size:0.68rem;color:#94a3b8;">-6k to -3k</span>
            </div>
            <div style="background:rgba(245,158,11,0.1);color:#fbbf24;padding:0.35rem;border-radius:4px;border:1px solid rgba(245,158,11,0.2);">
              <strong>Unfriendly</strong><br><span style="font-size:0.68rem;color:#94a3b8;">-3k to 0</span>
            </div>
            <div style="background:rgba(255,255,255,0.05);color:#cbd5e1;padding:0.35rem;border-radius:4px;border:1px solid rgba(255,255,255,0.1);">
              <strong>Neutral</strong><br><span style="font-size:0.68rem;color:#94a3b8;">0 to 3k</span>
            </div>
            <div style="background:rgba(16,185,129,0.1);color:#6ee7b7;padding:0.35rem;border-radius:4px;border:1px solid rgba(16,185,129,0.2);">
              <strong>Friendly</strong><br><span style="font-size:0.68rem;color:#94a3b8;">3k to 9k</span>
            </div>
            <div style="background:rgba(16,185,129,0.15);color:#34d399;padding:0.35rem;border-radius:4px;border:1px solid rgba(16,185,129,0.3);">
              <strong>Honored</strong><br><span style="font-size:0.68rem;color:#94a3b8;">9k to 21k</span>
            </div>
            <div style="background:rgba(59,130,246,0.15);color:#60a5fa;padding:0.35rem;border-radius:4px;border:1px solid rgba(59,130,246,0.3);">
              <strong>Revered</strong><br><span style="font-size:0.68rem;color:#94a3b8;">21k to 42k</span>
            </div>
            <div style="background:rgba(168,85,247,0.2);color:#c084fc;padding:0.35rem;border-radius:4px;border:1px solid rgba(168,85,247,0.4);">
              <strong>Exalted</strong><br><span style="font-size:0.68rem;color:#94a3b8;">42k to 43k (Cap)</span>
            </div>
          </div>
        </div>

        <!-- Factions Grid -->
        <div style="display:grid;grid-template-columns:repeat(auto-fill, minmax(340px, 1fr));gap:1rem;">
          ${factions.length > 0 ? factions.map(renderFactionCard).join('') : `
            <div style="grid-column:1/-1;text-align:center;padding:3rem;background:rgba(15,23,42,0.6);border-radius:8px;border:1px dashed rgba(255,255,255,0.1);">
              <p style="color:#94a3b8;font-size:1rem;margin:0;">No factions match your selected filters.</p>
            </div>
          `}
        </div>
      </div>
    `;

    attachEvents();
  }

  function attachEvents() {
    document.querySelectorAll('[data-rep-side]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        state.allegiance = e.currentTarget.getAttribute('data-rep-side');
        renderReputation();
      });
    });

    const newBtn = document.getElementById('rep-new-only');
    if (newBtn) {
      newBtn.addEventListener('click', () => {
        state.newOnly = !state.newOnly;
        renderReputation();
      });
    }

    const searchInp = document.getElementById('rep-search-input');
    if (searchInp) {
      searchInp.addEventListener('input', (e) => {
        state.search = e.target.value.trim();
        renderReputation();
        const inp = document.getElementById('rep-search-input');
        if (inp) {
          inp.focus();
          inp.selectionStart = inp.selectionEnd = inp.value.length;
        }
      });
    }
  }

  window.initCodexReputation = renderReputation;
})();
