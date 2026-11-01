/**
 * World of Warcraft: Forever - Atlas Dungeons & Raids Explorer
 * Datamined from WoW Forever Client (Build 1.60.1.70707)
 * Renders the 14 custom Classic+ instances and revamped dungeon/raid catalog.
 */

(function() {
  'use strict';

  function initAtlasDungeons() {
    const mount = document.getElementById('atlas-dungeons-mount');
    if (!mount) return;

    renderAtlasDungeons(mount);
  }

  function renderAtlasDungeons(mount) {
    const instances = window.WOW_FOREVER_INSTANCES_DATA || [];
    if (!instances || instances.length === 0) {
      mount.innerHTML = '<div class="atlas-empty-state"><p>Dungeon data loading or unavailable.</p></div>';
      return;
    }

    let activeFilter = 'all';
    let searchQuery = '';

    mount.innerHTML = `
      <div class="atlas-dungeons-header">
        <div class="dungeons-filter-bar">
          <div class="dungeons-filter-pills" id="atlas-dungeon-pills">
            <button type="button" class="atlas-pill active" data-filter="all">All Instances (${instances.length})</button>
            <button type="button" class="atlas-pill" data-filter="custom">⭐ Custom Classic+ (14)</button>
            <button type="button" class="atlas-pill" data-filter="leveling">Leveling (10–35)</button>
            <button type="button" class="atlas-pill" data-filter="maxlevel">Endgame (Level 60)</button>
            <button type="button" class="atlas-pill" data-filter="raids">Raids (20/40)</button>
          </div>
          <div class="dungeons-search-wrap">
            <input type="text" id="atlas-dungeons-search" class="search-input-field" placeholder="Search dungeons, bosses, zones, or loot..." autocomplete="off">
          </div>
        </div>
      </div>
      <div class="atlas-dungeons-grid" id="atlas-dungeons-grid"></div>
    `;

    const grid = mount.querySelector('#atlas-dungeons-grid');
    const searchInput = mount.querySelector('#atlas-dungeons-search');
    const filterPills = mount.querySelectorAll('#atlas-dungeon-pills .atlas-pill');

    function applyFilterAndRender() {
      const q = searchQuery.toLowerCase().trim();

      const filtered = instances.filter(inst => {
        let matchCat = true;
        if (activeFilter === 'custom') {
          matchCat = inst.isCustomForever;
        } else if (activeFilter === 'leveling') {
          matchCat = inst.kind === 'dungeon' && inst.maxLevel <= 35 && inst.minLevel > 0;
        } else if (activeFilter === 'maxlevel') {
          matchCat = inst.maxLevel === 60 || inst.minLevel === 60;
        } else if (activeFilter === 'raids') {
          matchCat = inst.kind === 'raid' || inst.size >= 20;
        }

        let matchSearch = true;
        if (q) {
          const matchName = inst.name.toLowerCase().includes(q);
          const matchZone = (inst.zone || '').toLowerCase().includes(q);
          const matchBoss = (inst.bosses || []).some(b => b.name.toLowerCase().includes(q));
          const matchLoot = (inst.loot || []).some(l => l.name.toLowerCase().includes(q));
          matchSearch = matchName || matchZone || matchBoss || matchLoot;
        }

        return matchCat && matchSearch;
      });

      if (filtered.length === 0) {
        grid.innerHTML = `
          <div style="grid-column: 1 / -1; padding: 3rem 1.5rem; text-align: center; color: var(--text-muted); background: rgba(0,0,0,0.3); border-radius: var(--radius-md);">
            <p style="font-size: 1.1rem; color: #cbd5e1; margin-bottom: 0.5rem;">No instances found matching "${escapeHtml(q || activeFilter)}".</p>
            <small style="color: var(--text-muted);">Try searching for Dalaran, Lordaeron, Crypts, or boss names like Azgaloth.</small>
          </div>
        `;
        return;
      }

      grid.innerHTML = filtered.map(inst => {
        const isRaid = inst.kind === 'raid' || inst.size >= 20;
        const sizeBadge = isRaid ? `${inst.size}-Man Raid` : `${inst.size}-Man Dungeon`;
        const customBadge = inst.isCustomForever ?
          '<span class="dungeon-tag tag-new">★ Classic+ New</span>' :
          '<span class="dungeon-tag tag-revamped">Revamped</span>';

        const bossesList = (inst.bosses || []).slice(0, 6);
        const extraBosses = (inst.bosses || []).length - bossesList.length;

        const lootList = (inst.loot || []).slice(0, 5);
        const extraLoot = (inst.loot || []).length - lootList.length;

        return `
          <div class="atlas-dungeon-card ${inst.isCustomForever ? 'is-custom' : ''} ${isRaid ? 'is-raid' : ''}" data-slug="${escapeHtml(inst.slug)}">
            <div class="dungeon-card-header">
              <div class="dungeon-header-main">
                <div class="dungeon-badges">
                  ${customBadge}
                  <span class="dungeon-level-badge">${escapeHtml(inst.levelDisplay)}</span>
                  <span class="dungeon-size-badge ${isRaid ? 'is-raid' : ''}">${sizeBadge}</span>
                </div>
                <h3 class="dungeon-card-title">${escapeHtml(inst.name)}</h3>
                <div class="dungeon-card-loc">📍 ${escapeHtml(inst.zone)}</div>
              </div>
            </div>

            <div class="dungeon-card-body">
              <div class="dungeon-entrance-row">
                <strong style="color: var(--text-gold); font-size: 0.78rem;">Entrance Route:</strong>
                <p style="font-size: 0.8rem; color: #cbd5e1; margin: 0.15rem 0 0.5rem; line-height: 1.35;">
                  ${escapeHtml(inst.entrance)}
                </p>
              </div>

              ${inst.bosses && inst.bosses.length > 0 ? `
                <div class="dungeon-bosses-section">
                  <div class="dungeon-section-label">
                    <span>Encounter Bosses (${inst.bosses.length}):</span>
                  </div>
                  <div class="dungeon-bosses-pills">
                    ${bossesList.map(b => `
                      <span class="boss-chip" title="Creature ID: ${b.creatureId}">
                        <span class="boss-order">${b.order}</span> ${escapeHtml(b.name)}
                      </span>
                    `).join('')}
                    ${extraBosses > 0 ? `<span class="boss-chip extra">+${extraBosses} more bosses</span>` : ''}
                  </div>
                </div>
              ` : ''}

              ${inst.loot && inst.loot.length > 0 ? `
                <div class="dungeon-loot-section">
                  <div class="dungeon-section-label">
                    <span>Confirmed Drops (${inst.loot.length}):</span>
                  </div>
                  <div class="dungeon-loot-chips">
                    ${lootList.map(item => `
                      <a href="${item.wowheadUrl}" target="_blank" rel="noopener noreferrer" class="loot-chip" data-item-id="${item.itemId}">
                        ${escapeHtml(item.name)}
                      </a>
                    `).join('')}
                    ${extraLoot > 0 ? `<span class="loot-chip extra">+${extraLoot} more items</span>` : ''}
                  </div>
                </div>
              ` : ''}
            </div>

            <div class="dungeon-card-footer">
              <button type="button" class="btn-dungeon-codex" onclick="window.openDungeonLootModal('${escapeHtml(inst.slug)}')">
                <span>⚔️</span> View Encounter Codex &amp; Loot
              </button>
            </div>
          </div>
        `;
      }).join('');
    }

    filterPills.forEach(btn => {
      btn.addEventListener('click', () => {
        filterPills.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        activeFilter = btn.getAttribute('data-filter') || 'all';
        applyFilterAndRender();
      });
    });

    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value;
        applyFilterAndRender();
      });
    }

    applyFilterAndRender();
  }

  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  window.initAtlasDungeons = initAtlasDungeons;
})();
