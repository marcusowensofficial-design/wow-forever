/**
 * World of Warcraft: Forever - Secret Quests, Riddles & Mysteries Explorer
 * Pure Logic Module — Controller, View Renderer, and Event Dispatcher
 */
(function () {
  'use strict';

  let state = {
    filter: 'all', // 'all' | 'Secret' | 'Collections' | 'Camping' | 'Secret pets'
    search: '',
    selectedChainKey: 'sleeping-bag'
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

  function getChains() {
    const raw = window.WOW_SPECIAL_QUESTS_DATA || [];
    return raw.filter(c => {
      if (state.filter !== 'all') {
        if (state.filter === 'Camping' && !c.category.includes('Camping')) return false;
        if (state.filter === 'Secret' && !c.category.includes('Secret')) return false;
        if (state.filter === 'pets' && !c.category.includes('pets')) return false;
      }
      if (state.search) {
        const q = state.search.toLowerCase();
        const mName = c.name.toLowerCase().includes(q);
        const mLoc = (c.startLocation || '').toLowerCase().includes(q);
        const mSummary = (c.summary || '').toLowerCase().includes(q);
        if (!mName && !mLoc && !mSummary) return false;
      }
      return true;
    });
  }

  function renderSecretsExplorer(containerId) {
    const container = document.getElementById(containerId || 'special-quests-explorer-mount');
    if (!container) return;

    const chains = getChains();
    const activeChain = chains.find(c => c.key === state.selectedChainKey) || chains[0] || null;

    container.innerHTML = `
      <div class="secrets-explorer-card" style="background:#0f172a;border:1px solid rgba(245,158,11,0.3);border-radius:10px;padding:1.25rem;display:flex;flex-direction:column;gap:1.25rem;">
        <!-- Header -->
        <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:1rem;border-bottom:1px solid rgba(255,255,255,0.08);padding-bottom:0.75rem;">
          <div style="display:flex;align-items:center;gap:0.75rem;">
            <span style="font-size:1.8rem;">🗺️</span>
            <div>
              <h3 style="margin:0;font-size:1.25rem;color:#f8fafc;font-weight:800;">Classic+ Secrets, Riddles &amp; Unsolved Mysteries</h3>
              <p style="margin:0.2rem 0 0 0;font-size:0.82rem;color:#94a3b8;">
                Datamined hidden questlines from WoW Forever: Keystone Fragments, Lyn the Ignored in Dalaran, the Sleeping Bag trail, and starter camping tutorials.
              </p>
            </div>
          </div>

          <!-- Category Pills -->
          <div class="atlas-filter-pills">
            <button class="atlas-pill ${state.filter === 'all' ? 'active' : ''}" data-secret-filter="all">All (${chains.length})</button>
            <button class="atlas-pill ${state.filter === 'Secret' ? 'active' : ''}" data-secret-filter="Secret">🕵️ Mysteries</button>
            <button class="atlas-pill ${state.filter === 'pets' ? 'active' : ''}" data-secret-filter="pets">🐾 Secret Pets</button>
            <button class="atlas-pill ${state.filter === 'Camping' ? 'active' : ''}" data-secret-filter="Camping">⛺ Camping 101</button>
          </div>
        </div>

        <!-- Master / Detail Grid -->
        <div style="display:grid;grid-template-columns:minmax(260px, 320px) 1fr;gap:1.25rem;align-items:start;">
          <!-- Left Column: Chains List -->
          <div style="display:flex;flex-direction:column;gap:0.4rem;max-height:550px;overflow-y:auto;padding-right:0.4rem;">
            ${chains.map(c => {
              const isSelected = activeChain && activeChain.key === c.key;
              return `
                <div class="secret-chain-pill" data-chain-key="${esc(c.key)}" style="cursor:pointer;padding:0.6rem 0.8rem;border-radius:6px;background:${isSelected ? 'rgba(245,158,11,0.18)' : 'rgba(255,255,255,0.03)'};border:1px solid ${isSelected ? '#f59e0b' : 'rgba(255,255,255,0.06)'};transition:all 0.15s ease;">
                  <div style="display:flex;align-items:center;justify-content:space-between;gap:0.4rem;">
                    <strong style="color:${isSelected ? '#fef08a' : '#f8fafc'};font-size:0.88rem;">${esc(c.name)}</strong>
                    <span style="font-size:0.7rem;color:#94a3b8;background:rgba(255,255,255,0.05);padding:0.1rem 0.35rem;border-radius:3px;">${esc(c.steps?.length || 0)} steps</span>
                  </div>
                  <div style="font-size:0.75rem;color:#94a3b8;margin-top:0.2rem;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">
                    ${esc(c.startLocation)}
                  </div>
                </div>
              `;
            }).join('')}
          </div>

          <!-- Right Column: Detail Walkthrough -->
          ${activeChain ? `
            <div style="background:rgba(0,0,0,0.25);border:1px solid rgba(255,255,255,0.08);border-radius:8px;padding:1.1rem;display:flex;flex-direction:column;gap:1rem;">
              <div style="border-bottom:1px solid rgba(255,255,255,0.08);padding-bottom:0.75rem;">
                <div style="display:flex;align-items:center;justify-content:space-between;gap:0.5rem;flex-wrap:wrap;">
                  <h4 style="margin:0;font-size:1.2rem;color:#facc15;font-weight:800;">${esc(activeChain.name)}</h4>
                  <div style="display:flex;align-items:center;gap:0.4rem;">
                    <span style="background:rgba(59,130,246,0.15);color:#60a5fa;padding:0.1rem 0.45rem;border-radius:4px;font-size:0.72rem;font-weight:700;">
                      ${esc(activeChain.category)}
                    </span>
                    <span style="background:rgba(255,255,255,0.06);color:#cbd5e1;padding:0.1rem 0.45rem;border-radius:4px;font-size:0.72rem;">
                      Faction: ${esc(activeChain.faction)}
                    </span>
                  </div>
                </div>
                <p style="color:#cbd5e1;font-size:0.88rem;line-height:1.5;margin:0.5rem 0 0 0;">
                  ${esc(activeChain.summary)}
                </p>
                ${activeChain.startLocation ? `
                  <div style="margin-top:0.4rem;font-size:0.8rem;color:#94a3b8;">
                    <strong>Starting Point:</strong> ${esc(activeChain.startLocation)}
                  </div>
                ` : ''}
              </div>

              <!-- Steps List -->
              <div>
                <div style="font-size:0.8rem;color:#94a3b8;font-weight:700;text-transform:uppercase;margin-bottom:0.6rem;">
                  Step-by-Step Discovery Walkthrough:
                </div>
                <div style="display:flex;flex-direction:column;gap:0.6rem;">
                  ${(activeChain.steps || []).map((step, idx) => `
                    <div style="display:flex;gap:0.75rem;background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.05);padding:0.65rem 0.85rem;border-radius:6px;align-items:flex-start;">
                      <div style="width:24px;height:24px;border-radius:50%;background:rgba(245,158,11,0.2);color:#f59e0b;border:1px solid rgba(245,158,11,0.4);display:flex;align-items:center;justify-content:center;font-size:0.75rem;font-weight:800;flex-shrink:0;">
                        ${idx + 1}
                      </div>
                      <div style="flex:1;">
                        <div style="display:flex;align-items:center;justify-content:space-between;gap:0.5rem;flex-wrap:wrap;">
                          <strong style="color:#f8fafc;font-size:0.86rem;">${esc(step.title || `Step ${idx + 1}`)}</strong>
                          ${step.coords ? `<span style="color:#38bdf8;font-family:monospace;font-size:0.75rem;">📍 ${esc(step.coords)}</span>` : ''}
                        </div>
                        <p style="margin:0.25rem 0 0 0;font-size:0.82rem;color:#cbd5e1;line-height:1.4;">
                          ${esc(step.instruction)}
                        </p>
                        ${step.tip ? `
                          <div style="margin-top:0.25rem;font-size:0.75rem;color:#eab308;background:rgba(234,179,8,0.1);padding:0.2rem 0.45rem;border-radius:4px;">
                            💡 <strong>Tip:</strong> ${esc(step.tip)}
                          </div>
                        ` : ''}
                      </div>
                    </div>
                  `).join('')}
                </div>
              </div>
            </div>
          ` : ''}
        </div>
      </div>
    `;

    attachEvents(containerId);
  }

  function attachEvents(containerId) {
    document.querySelectorAll('[data-secret-filter]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        state.filter = e.currentTarget.getAttribute('data-secret-filter');
        renderSecretsExplorer(containerId);
      });
    });

    document.querySelectorAll('[data-chain-key]').forEach(item => {
      item.addEventListener('click', (e) => {
        state.selectedChainKey = e.currentTarget.getAttribute('data-chain-key');
        renderSecretsExplorer(containerId);
      });
    });
  }

  window.renderSpecialQuestsExplorer = renderSecretsExplorer;
})();
