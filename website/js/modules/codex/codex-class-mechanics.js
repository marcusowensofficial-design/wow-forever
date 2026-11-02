/**
 * World of Warcraft: Forever - Class Mechanics Module
 * Renders Mage Scrolls & Weapon Imbues, and Rogue Poisons & Reagent Directory.
 */

(function () {
  'use strict';

  let currentMechanicsTab = 'scrolls'; // 'scrolls' | 'poisons' | 'vendors'
  let scrollCategoryFilter = 'all';
  let poisonLevelFilter = 'all'; // 'all' | 'beta' | 'endgame'
  let searchQuery = '';
  let isInitialized = false;

  const CDN_BASE = 'https://wow.zamimg.com/images/wow/icons/medium/';

  function getIcon(icon) {
    if (!icon) return `${CDN_BASE}inv_scroll_03.jpg`;
    if (icon.startsWith('http://') || icon.startsWith('https://')) return icon;
    const clean = icon.replace(/\.(jpg|png|webp)$/i, '');
    return `${CDN_BASE}${clean.toLowerCase()}.jpg`;
  }

  function initClassMechanics() {
    const container = document.getElementById('codex-mechanics-container');
    if (!container) return;

    if (!isInitialized) {
      renderMechanicsShell(container);
      isInitialized = true;
    }

    renderActiveTab();
  }

  function renderMechanicsShell(container) {
    const data = window.WOW_CLASS_MECHANICS_DATA || { mageScrolls: [], roguePoisons: [], poisonSuppliers: [] };

    container.innerHTML = `
      <div class="section-heading-bar" style="margin-bottom: 1.5rem;">
        <div>
          <h3><span>🔮</span> Class Inventions, Scrolls &amp; Poisons</h3>
          <p class="section-subtext">Comprehensive mechanics compendium: 38 new Mage weapon imbue scrolls &amp; familiars, and 21 Rogue poisons with trainer fees and reagent formulas.</p>
        </div>
      </div>

      <!-- Tab Switcher & Filter Bar -->
      <div style="background: rgba(15, 23, 42, 0.6); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 1.25rem; margin-bottom: 1.5rem; display: flex; flex-direction: column; gap: 1rem;">
        
        <!-- Category Selector -->
        <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; border-bottom: 1px solid rgba(255, 255, 255, 0.08); padding-bottom: 0.75rem;">
          <button class="filter-pill mech-tab-btn active" data-mech-tab="scrolls" style="padding: 0.45rem 1rem; font-weight: 700;">
            🔮 Mage Scrolls (${data.mageScrolls.length})
          </button>
          <button class="filter-pill mech-tab-btn" data-mech-tab="poisons" style="padding: 0.45rem 1rem; font-weight: 700;">
            🗡️ Rogue Poisons (${data.roguePoisons.length})
          </button>
          <button class="filter-pill mech-tab-btn" data-mech-tab="vendors" style="padding: 0.45rem 1rem; font-weight: 700;">
            🧪 Poison Suppliers (${data.poisonSuppliers.length})
          </button>
        </div>

        <!-- Controls Row -->
        <div style="display: flex; gap: 0.75rem; flex-wrap: wrap; justify-content: space-between; align-items: center;">
          <div id="mech-subfilters-group" style="display: flex; gap: 0.4rem; flex-wrap: wrap; align-items: center;">
            <!-- Dynamically injected based on current sub-tab -->
          </div>

          <div>
            <input type="text" id="mech-search-input" placeholder="Search mechanics..."
                   style="background: rgba(0,0,0,0.4); border: 1px solid var(--border-subtle); color: #fff; padding: 0.45rem 0.85rem; border-radius: 6px; font-size: 0.85rem; min-width: 240px;" />
          </div>
        </div>

      </div>

      <!-- Mount Grid for Active Tab -->
      <div id="mech-content-mount">
        <!-- Rendered dynamically -->
      </div>
    `;

    // Event handlers
    container.querySelectorAll('.mech-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        container.querySelectorAll('.mech-tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentMechanicsTab = btn.getAttribute('data-mech-tab');
        renderSubfilters();
        renderActiveTab();
      });
    });

    const searchInput = container.querySelector('#mech-search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value.toLowerCase().trim();
        renderActiveTab();
      });
    }

    renderSubfilters();
  }

  function renderSubfilters() {
    const group = document.getElementById('mech-subfilters-group');
    if (!group) return;

    if (currentMechanicsTab === 'scrolls') {
      group.innerHTML = `
        <span style="font-size: 0.78rem; color: #94a3b8; font-weight: 600;">Category:</span>
        <button class="filter-pill scroll-cat-btn ${scrollCategoryFilter === 'all' ? 'active' : ''}" data-cat="all">All (38)</button>
        <button class="filter-pill scroll-cat-btn ${scrollCategoryFilter === 'imbue' ? 'active' : ''}" data-cat="imbue">Weapon Imbues</button>
        <button class="filter-pill scroll-cat-btn ${scrollCategoryFilter === 'familiar' ? 'active' : ''}" data-cat="familiar">Familiars</button>
        <button class="filter-pill scroll-cat-btn ${scrollCategoryFilter === 'utility' ? 'active' : ''}" data-cat="utility">Utility &amp; Damage</button>
        <button class="filter-pill scroll-cat-btn ${scrollCategoryFilter === 'upgrade' ? 'active' : ''}" data-cat="upgrade">Weapon Upgrades</button>
        <button class="filter-pill scroll-cat-btn ${scrollCategoryFilter === 'comprehension' ? 'active' : ''}" data-cat="comprehension">Comprehension Runes</button>
      `;

      group.querySelectorAll('.scroll-cat-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          group.querySelectorAll('.scroll-cat-btn').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          scrollCategoryFilter = btn.getAttribute('data-cat');
          renderActiveTab();
        });
      });
    } else if (currentMechanicsTab === 'poisons') {
      group.innerHTML = `
        <span style="font-size: 0.78rem; color: #94a3b8; font-weight: 600;">Level Bracket:</span>
        <button class="filter-pill poison-lvl-btn ${poisonLevelFilter === 'all' ? 'active' : ''}" data-lvl="all">All Poisons</button>
        <button class="filter-pill poison-lvl-btn ${poisonLevelFilter === 'beta' ? 'active' : ''}" data-lvl="beta">Level 20–30 (Beta Cap)</button>
        <button class="filter-pill poison-lvl-btn ${poisonLevelFilter === 'endgame' ? 'active' : ''}" data-lvl="endgame">Level 32–60 (Endgame)</button>
      `;

      group.querySelectorAll('.poison-lvl-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          group.querySelectorAll('.poison-lvl-btn').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          poisonLevelFilter = btn.getAttribute('data-lvl');
          renderActiveTab();
        });
      });
    } else {
      group.innerHTML = `
        <span style="font-size: 0.78rem; color: #94a3b8;">Strategic poison reagent vendors for Alliance &amp; Horde</span>
      `;
    }
  }

  function renderActiveTab() {
    const mount = document.getElementById('mech-content-mount');
    if (!mount) return;

    if (currentMechanicsTab === 'scrolls') {
      renderScrolls(mount);
    } else if (currentMechanicsTab === 'poisons') {
      renderPoisons(mount);
    } else {
      renderVendors(mount);
    }
  }

  function renderScrolls(mount) {
    const data = window.WOW_CLASS_MECHANICS_DATA || { mageScrolls: [] };
    let scrolls = data.mageScrolls || [];

    if (scrollCategoryFilter !== 'all') {
      scrolls = scrolls.filter(s => {
        const cat = s.category.toLowerCase();
        if (scrollCategoryFilter === 'imbue') return cat.includes('imbue');
        if (scrollCategoryFilter === 'familiar') return cat.includes('familiar');
        if (scrollCategoryFilter === 'utility') return cat.includes('utility');
        if (scrollCategoryFilter === 'upgrade') return cat.includes('upgrade');
        if (scrollCategoryFilter === 'comprehension') return cat.includes('comprehension');
        return true;
      });
    }

    if (searchQuery) {
      scrolls = scrolls.filter(s => {
        return (s.name && s.name.toLowerCase().includes(searchQuery)) ||
               (s.effect && s.effect.toLowerCase().includes(searchQuery)) ||
               (s.category && s.category.toLowerCase().includes(searchQuery));
      });
    }

    if (scrolls.length === 0) {
      mount.innerHTML = `
        <div style="text-align: center; padding: 3rem; color: #94a3b8; background: rgba(15, 23, 42, 0.4); border-radius: 8px;">
          No scrolls match your current filter.
        </div>
      `;
      return;
    }

    mount.innerHTML = `
      <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(340px, 1fr)); gap: 1rem;">
        ${scrolls.map(s => `
          <div class="scroll-card" style="background: rgba(15, 23, 42, 0.6); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 1.15rem; display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 0.5rem; margin-bottom: 0.6rem;">
                <div style="display: flex; align-items: center; gap: 0.6rem;">
                  <img src="${getIcon(s.icon)}" alt="${escapeHtml(s.name)}"
                       style="width: 40px; height: 40px; border-radius: 6px; border: 1px solid #38bdf8;" />
                  <div>
                    <h4 style="margin: 0; font-size: 0.98rem; color: #fff;">${escapeHtml(s.name)}</h4>
                    <span style="font-size: 0.72rem; color: #38bdf8; font-weight: 600;">${escapeHtml(s.category)}</span>
                  </div>
                </div>
                <span class="deepdive-badge badge-exclusive" style="font-size: 0.68rem; padding: 0.15rem 0.4rem;">✦ Forever</span>
              </div>

              <p style="font-size: 0.8rem; color: #cbd5e1; line-height: 1.45; margin: 0 0 0.75rem 0;">
                ${escapeHtml(s.effect)}
              </p>
            </div>

            <div style="border-top: 1px solid rgba(255,255,255,0.06); padding-top: 0.5rem; display: flex; justify-content: space-between; align-items: center; font-size: 0.74rem;">
              <span style="color: #94a3b8;">Requires Level: <strong style="color: #fcd34d;">${s.reqLevel || 1}</strong></span>
              <a href="https://www.wowhead.com/forever/item=${s.id}" target="_blank" rel="noopener noreferrer"
                 style="color: #38bdf8; text-decoration: none; display: flex; align-items: center; gap: 0.2rem;">
                <span>View Spell</span> ↗
              </a>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  function renderPoisons(mount) {
    const data = window.WOW_CLASS_MECHANICS_DATA || { roguePoisons: [] };
    let poisons = data.roguePoisons || [];

    if (poisonLevelFilter === 'beta') {
      poisons = poisons.filter(p => p.level <= 30);
    } else if (poisonLevelFilter === 'endgame') {
      poisons = poisons.filter(p => p.level > 30);
    }

    if (searchQuery) {
      poisons = poisons.filter(p => {
        return (p.name && p.name.toLowerCase().includes(searchQuery)) ||
               (p.reagents && p.reagents.toLowerCase().includes(searchQuery)) ||
               (p.effect && p.effect.toLowerCase().includes(searchQuery));
      });
    }

    if (poisons.length === 0) {
      mount.innerHTML = `
        <div style="text-align: center; padding: 3rem; color: #94a3b8; background: rgba(15, 23, 42, 0.4); border-radius: 8px;">
          No rogue poisons match your current filter.
        </div>
      `;
      return;
    }

    mount.innerHTML = `
      <div style="background: rgba(15, 23, 42, 0.6); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); overflow-x: auto;">
        <table class="pvp-ranks-table" style="width: 100%; border-collapse: collapse; min-width: 650px;">
          <thead>
            <tr style="border-bottom: 2px solid var(--border-subtle); text-align: left; font-size: 0.8rem; color: var(--text-gold);">
              <th style="padding: 0.75rem;">Poison &amp; Rank</th>
              <th style="padding: 0.75rem;">Level Req</th>
              <th style="padding: 0.75rem;">Skill Bracket</th>
              <th style="padding: 0.75rem;">Reagents Required</th>
              <th style="padding: 0.75rem;">Trainer Fee</th>
              <th style="padding: 0.75rem;">Combat Effect</th>
            </tr>
          </thead>
          <tbody>
            ${poisons.map(p => `
              <tr style="border-bottom: 1px solid rgba(255,255,255,0.05); font-size: 0.82rem;">
                <td style="padding: 0.75rem;">
                  <strong style="color: #4ade80;">${escapeHtml(p.name)}</strong>
                </td>
                <td style="padding: 0.75rem;">
                  <span style="color: ${p.level <= 30 ? '#38bdf8' : '#94a3b8'}; font-weight: 700;">
                    Lvl ${p.level} ${p.level <= 30 ? '✓ Beta' : ''}
                  </span>
                </td>
                <td style="padding: 0.75rem; color: #cbd5e1;">${escapeHtml(p.skill)}</td>
                <td style="padding: 0.75rem; color: #f5d061;">${escapeHtml(p.reagents)}</td>
                <td style="padding: 0.75rem; color: #fcd34d; font-weight: 600;">${escapeHtml(p.cost)}</td>
                <td style="padding: 0.75rem; color: #94a3b8; font-size: 0.78rem;">${escapeHtml(p.effect)}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;
  }

  function renderVendors(mount) {
    const data = window.WOW_CLASS_MECHANICS_DATA || { poisonSuppliers: [] };
    const vendors = data.poisonSuppliers || [];

    mount.innerHTML = `
      <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(340px, 1fr)); gap: 1rem;">
        ${vendors.map(v => {
          const factionColor = v.faction === 'Alliance' ? '#60a5fa' : (v.faction === 'Horde' ? '#f87171' : '#fcd34d');

          return `
            <div class="vendor-card" style="background: rgba(15, 23, 42, 0.6); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 1.25rem; display: flex; flex-direction: column; justify-content: space-between;">
              <div>
                <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.5rem;">
                  <h4 style="margin: 0; font-size: 1.05rem; color: #fff;">${escapeHtml(v.name)}</h4>
                  <span style="font-size: 0.72rem; font-weight: 700; color: ${factionColor}; background: rgba(255,255,255,0.05); padding: 0.15rem 0.45rem; border-radius: 4px;">
                    ${escapeHtml(v.faction)}
                  </span>
                </div>

                <div style="font-size: 0.8rem; color: #38bdf8; margin-bottom: 0.5rem;">
                  📍 ${escapeHtml(v.location)} • <strong style="color: #fcd34d;">${escapeHtml(v.coords)}</strong>
                </div>

                <p style="font-size: 0.8rem; color: #cbd5e1; line-height: 1.45; margin: 0;">
                  ${escapeHtml(v.notes)}
                </p>
              </div>

              <div style="margin-top: 0.75rem; border-top: 1px solid rgba(255,255,255,0.06); padding-top: 0.5rem; font-size: 0.74rem; color: #94a3b8;">
                Supplies: Dusts, Vials, and Deathweed
              </div>
            </div>
          `;
        }).join('')}
      </div>
    `;
  }

  window.initClassMechanics = initClassMechanics;
})();
