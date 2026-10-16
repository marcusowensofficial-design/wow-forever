/**
 * World of Warcraft: Forever - Hunter Pet Beast Radar Module
 * Handles complete explorer for all 502 beasts across 18 families:
 * - Family modifiers (+10% Dmg, Armor, HP), Diets, New in Forever abilities
 * - Filter by Attack Speed (1.0s fast-pets, 2.0s normal), Faction, Level (1-30 Beta Cap), New Classic+ spawns
 * - 1-Click TomTom /way coordinates copy & /target macro generation
 */

(function () {
  'use strict';

  let selectedFamily = 'all';
  let searchQuery = '';
  let speedFilter = 'all'; // 'all' | 'fast' (<=1.5s) | 'normal' (1.6-2.0s) | 'slow' (>=2.1s)
  let factionFilter = 'all'; // 'all' | 'alliance' | 'horde' | 'contested'
  let maxLevelFilter = 60; // 30 for beta cap, 60 for all
  let newSpawnsOnly = false;

  const escapeHtml = window.escapeHtml;

  function getPetData() {
    return window.WOW_ATLAS_DATA?.hunterPets || null;
  }

  function copyPetMacro(text, btnElement, successLabel = 'Copied!') {
    let handled = false;
    const onDone = () => {
      if (handled) return;
      handled = true;
      if (typeof window.showToast === 'function') {
        window.showToast(`Copied: ${text}`);
      }
      if (btnElement) {
        const orig = btnElement.innerHTML;
        btnElement.innerHTML = `✓ ${successLabel}`;
        btnElement.classList.add('copied');
        setTimeout(() => {
          btnElement.innerHTML = orig;
          btnElement.classList.remove('copied');
        }, 1500);
      }
    };

    const res = window.copyTextToClipboard ? window.copyTextToClipboard(text, onDone) : null;
    if (res && typeof res.then === 'function') {
      res.then(onDone).catch(() => {});
    }
  }
  window.copyPetMacro = copyPetMacro;

  function normalizePetFamily(str) {
    if (!str) return 'all';
    const s = String(str).toLowerCase().trim().replace(/[-_\s]+/g, '');
    if (s === 'all') return 'all';
    if (s === 'carrionbird' || s === 'carrion' || s === 'vulture' || s === 'vultures') return 'carrion-bird';
    if (s === 'birdofprey' || s === 'owl' || s === 'owls' || s === 'bird' || s === 'birds') return 'bird-of-prey';
    if (s === 'windserpent' || s === 'serpent' || s === 'serpents') return 'wind-serpent';
    if (s === 'tallstrider' || s === 'tallstriders') return 'tallstrider';
    if (s === 'bat' || s === 'bats') return 'bat';
    if (s === 'bear' || s === 'bears') return 'bear';
    if (s === 'boar' || s === 'boars') return 'boar';
    if (s === 'cat' || s === 'cats') return 'cat';
    if (s === 'crab' || s === 'crabs') return 'crab';
    if (s === 'crocolisk' || s === 'crocolisks' || s === 'croc' || s === 'crocs') return 'crocolisk';
    if (s === 'fox' || s === 'foxes') return 'fox';
    if (s === 'gorilla' || s === 'gorillas') return 'gorilla';
    if (s === 'hyena' || s === 'hyenas') return 'hyena';
    if (s === 'raptor' || s === 'raptors') return 'raptor';
    if (s === 'scorpid' || s === 'scorpids' || s === 'scorpion' || s === 'scorpions') return 'scorpid';
    if (s === 'spider' || s === 'spiders') return 'spider';
    if (s === 'turtle' || s === 'turtles') return 'turtle';
    if (s === 'wolf' || s === 'wolves') return 'wolf';
    return s;
  }
  window.normalizePetFamily = normalizePetFamily;

  function initHunterPets() {
    const mountContainers = [
      document.getElementById('hunter-pets-mount'),
      document.getElementById('atlas-hunter-pets-mount')
    ].filter(Boolean);

    if (mountContainers.length === 0) return;

    renderPetHub();

    window.addEventListener('hashchange', checkHashRoute);
    checkHashRoute();
  }

  function checkHashRoute() {
    const hash = (window.location.hash || '').toLowerCase();
    if (hash.includes('pets') || hash.includes('hunter-pets')) {
      const parts = hash.split('/');
      if (parts[2]) {
        selectedFamily = normalizePetFamily(parts[2]);
      }
      renderPetHub();
    }
  }

  function renderPetHub() {
    const data = getPetData();
    const containers = [
      document.getElementById('hunter-pets-mount'),
      document.getElementById('atlas-hunter-pets-mount')
    ].filter(Boolean);

    if (!data || containers.length === 0) return;

    const totalBeastsCount = data.allBeasts?.length || 520;

    containers.forEach(container => {
      const pfx = container.id === 'atlas-hunter-pets-mount' ? 'atlas-' : '';
      const html = `
      <div class="pet-hub-wrapper">
        <!-- 1. Header Banner -->
        <div class="pet-hero-banner">
          <div class="pet-hero-info">
            <span class="pet-hero-badge">🐾 Official WoW Forever Beast Companion Registry</span>
            <h2 class="pet-hero-title">Hunter Pet Radar (${totalBeastsCount} Tameable Beasts)</h2>
            <p class="pet-hero-desc">
              Complete index of all 18 families, including the new <strong>Fox</strong> family and 9 new/reworked abilities.
              Find authentic 1.0s attack speed beasts (Broken Tooth pushback), dietary needs, and exact Classic+ tame coordinates.
            </p>
          </div>
          <div class="pet-stats-summary">
            <div class="pet-stat-pill"><strong>${totalBeastsCount}</strong><span>Total Beasts</span></div>
            <div class="pet-stat-pill"><strong>${data.families?.length || 18}</strong><span>Families</span></div>
            <div class="pet-stat-pill"><strong>9</strong><span>New Spells</span></div>
            <div class="pet-stat-pill"><strong>1.0s</strong><span>Fastest AS</span></div>
          </div>
        </div>

        <!-- 2. Family Quick Selector Grid -->
        <div class="pet-family-selector-bar">
          <button type="button" class="pet-family-btn ${normalizePetFamily(selectedFamily) === 'all' ? 'active' : ''}" data-family="all">
            <span class="pet-fam-icon">🐾</span>
            <span class="pet-fam-name">All Families</span>
            <small class="pet-fam-count">${totalBeastsCount}</small>
          </button>
          ${data.families.map(f => {
            const count = data.allBeasts?.filter(b => normalizePetFamily(b.family) === normalizePetFamily(f.id)).length || 0;
            return `
              <button type="button" class="pet-family-btn ${normalizePetFamily(selectedFamily) === normalizePetFamily(f.id) ? 'active' : ''}" data-family="${f.id}">
                <img src="${f.icon}" alt="${escapeHtml(f.name)}" class="pet-fam-img" loading="lazy" />
                <span class="pet-fam-name">${escapeHtml(f.name)}</span>
                <small class="pet-fam-count">${count}</small>
              </button>
            `;
          }).join('')}
        </div>

        <!-- 3. Active Family Profile Card (if single family selected) -->
        ${renderActiveFamilyProfile(data)}

        <!-- 4. Interactive Filters -->
        <div class="pet-filters-box">
          <div class="pet-search-input-wrap">
            <span class="search-lens-icon">🔍</span>
            <input type="text" id="${pfx}pet-search-input" class="pet-search-input" placeholder="Search beast name, zone, or ability (e.g. Broken Tooth, Bite 4, Wetlands)..." value="${escapeHtml(searchQuery)}" aria-label="Search hunter beasts" />
          </div>

          <div class="pet-filters-row">
            <!-- Attack Speed Filter -->
            <div class="pet-filter-group">
              <label for="${pfx}pet-filter-speed">Attack Speed:</label>
              <select id="${pfx}pet-filter-speed" class="pet-select" aria-label="Filter by attack speed">
                <option value="all" ${speedFilter === 'all' ? 'selected' : ''}>All Speeds</option>
                <option value="fast" ${speedFilter === 'fast' ? 'selected' : ''}>⚡ Fast (1.0s – 1.5s)</option>
                <option value="normal" ${speedFilter === 'normal' ? 'selected' : ''}>Normal (1.6s – 2.0s)</option>
                <option value="slow" ${speedFilter === 'slow' ? 'selected' : ''}>Slow (2.1s+)</option>
              </select>
            </div>

            <!-- Faction Filter -->
            <div class="pet-filter-group">
              <label for="${pfx}pet-filter-faction">Faction Zone:</label>
              <select id="${pfx}pet-filter-faction" class="pet-select" aria-label="Filter by zone faction">
                <option value="all" ${factionFilter === 'all' ? 'selected' : ''}>All Factions</option>
                <option value="alliance" ${factionFilter === 'alliance' ? 'selected' : ''}>Alliance Zones</option>
                <option value="horde" ${factionFilter === 'horde' ? 'selected' : ''}>Horde Zones</option>
                <option value="contested" ${factionFilter === 'contested' ? 'selected' : ''}>Contested Zones</option>
              </select>
            </div>

            <!-- Level Cap Filter -->
            <div class="pet-filter-group">
              <label for="${pfx}pet-filter-level">Level Cap:</label>
              <select id="${pfx}pet-filter-level" class="pet-select" aria-label="Filter by level bracket">
                <option value="60" ${maxLevelFilter === 60 ? 'selected' : ''}>All Levels (1–60)</option>
                <option value="30" ${maxLevelFilter === 30 ? 'selected' : ''}>🛡️ Beta Phase 2 (1–30 Cap)</option>
                <option value="20" ${maxLevelFilter === 20 ? 'selected' : ''}>Phase 1 (1–20 Cap)</option>
              </select>
            </div>

            <!-- New Spawns Toggle -->
            <label class="pet-toggle-label">
              <input type="checkbox" id="${pfx}pet-filter-new" class="pet-filter-new" aria-label="New Classic+ spawns only" ${newSpawnsOnly ? 'checked' : ''} />
              <span>✦ New Classic+ Spawns Only</span>
            </label>
          </div>
        </div>

        <!-- 5. Beast Results Grid -->
        <div class="pet-results-container" id="${pfx}pet-results-grid">
          ${renderBeastCards(data)}
        </div>
      </div>
    `;

      container.innerHTML = html;
      attachEventListeners(container, pfx);
    });
  }

  function renderActiveFamilyProfile(data) {
    if (normalizePetFamily(selectedFamily) === 'all') return '';
    const fam = data.families.find(f => normalizePetFamily(f.id) === normalizePetFamily(selectedFamily));
    if (!fam) return '';

    return `
      <div class="pet-family-hero-card">
        <div class="pet-fam-hero-left">
          <img src="${fam.icon}" alt="${escapeHtml(fam.name)}" class="pet-fam-big-icon" />
          <div>
            <h3 class="pet-fam-title">${escapeHtml(fam.name)} Family</h3>
            <p class="pet-fam-highlight">${escapeHtml(fam.highlight || '')}</p>
            <div class="pet-fam-tags">
              <span class="pet-mod-badge dmg">Dmg: ${fam.damageMod}</span>
              <span class="pet-mod-badge arm">Armor: ${fam.armorMod}</span>
              <span class="pet-mod-badge hp">HP: ${fam.healthMod}</span>
              <span class="pet-diet-pill">🍎 Diets: ${fam.diet.join(', ')}</span>
            </div>
          </div>
        </div>

        ${fam.newAbility ? `
          <div class="pet-new-ability-box">
            <div class="pet-ability-header">
              <img src="${fam.newAbility.icon}" alt="${escapeHtml(fam.newAbility.name)}" class="pet-ability-icon" />
              <div>
                <strong class="pet-ability-name">${escapeHtml(fam.newAbility.name)}</strong>
                <span class="pet-ability-badge">${escapeHtml(fam.newAbility.badge)}</span>
              </div>
            </div>
            <p class="pet-ability-desc">${escapeHtml(fam.newAbility.desc)}</p>
            <div class="pet-ability-meta">
              <span>Cost: ${escapeHtml(fam.newAbility.cost)}</span>
              <span>CD: ${escapeHtml(fam.newAbility.cd)}</span>
            </div>
          </div>
        ` : ''}
      </div>
    `;
  }

  function getFilteredBeasts(data) {
    let beasts = data.allBeasts || [];

    // Family filter
    if (normalizePetFamily(selectedFamily) !== 'all') {
      beasts = beasts.filter(b => normalizePetFamily(b.family) === normalizePetFamily(selectedFamily));
    }

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const normQ = normalizePetFamily(q);
      beasts = beasts.filter(b => {
        const matchesFamilyAlias = normQ !== 'all' && normalizePetFamily(b.family) === normQ;
        return matchesFamilyAlias ||
          b.name.toLowerCase().includes(q) ||
          b.zone.toLowerCase().includes(q) ||
          (b.subzone && b.subzone.toLowerCase().includes(q)) ||
          (b.teaches && b.teaches.toLowerCase().includes(q)) ||
          (b.family && b.family.toLowerCase().includes(q)) ||
          (b.notes && b.notes.toLowerCase().includes(q));
      });
    }

    // Attack Speed
    if (speedFilter === 'fast') {
      beasts = beasts.filter(b => b.speedNum && b.speedNum <= 1.5);
    } else if (speedFilter === 'normal') {
      beasts = beasts.filter(b => !b.speedNum || (b.speedNum > 1.5 && b.speedNum <= 2.0));
    } else if (speedFilter === 'slow') {
      beasts = beasts.filter(b => b.speedNum && b.speedNum >= 2.1);
    }

    // Faction
    if (factionFilter !== 'all') {
      beasts = beasts.filter(b => b.faction && b.faction.toLowerCase() === factionFilter.toLowerCase());
    }

    // Max Level
    if (maxLevelFilter < 60) {
      beasts = beasts.filter(b => {
        if (!b.minLevel) return true;
        return b.minLevel <= maxLevelFilter;
      });
    }

    // New spawns only
    if (newSpawnsOnly) {
      beasts = beasts.filter(b => b.isNew === true);
    }

    return beasts;
  }

  function renderBeastCards(data) {
    const filtered = getFilteredBeasts(data);

    if (filtered.length === 0) {
      return `
        <div class="pet-empty-state">
          <p>No hunter beasts found matching your filter criteria.</p>
          <button type="button" class="btn-secondary" onclick="window.resetPetFilters()">Reset All Filters</button>
        </div>
      `;
    }

    return `
      <div class="pet-results-header">
        <span>Showing <strong>${filtered.length}</strong> of ${data.allBeasts.length} beasts</span>
      </div>
      <div class="pet-cards-grid">
        ${filtered.map(b => {
          const isFast = b.speedNum && b.speedNum <= 1.5;
          const factionClass = (b.faction || 'contested').toLowerCase();
          const tomtomMacro = `/way ${b.zone} ${b.name}`;
          const targetMacro = `/target ${b.name}`;

          return `
            <div class="pet-beast-card ${b.isNew ? 'is-new-spawn' : ''} ${isFast ? 'is-fast-pet' : ''}">
              <div class="pet-card-top">
                <div>
                  <h4 class="pet-beast-name">${escapeHtml(b.name)}</h4>
                  <div class="pet-zone-line">📍 ${escapeHtml(b.zone)}${b.subzone ? ` (${escapeHtml(b.subzone)})` : ''}</div>
                </div>
                <div class="pet-badge-stack">
                  <span class="pet-level-badge">Lvl ${escapeHtml(b.level)}</span>
                  ${b.isNew ? '<span class="pet-new-tag">✦ Classic+</span>' : ''}
                </div>
              </div>

              <div class="pet-metrics-bar">
                <span class="pet-speed-badge ${isFast ? 'fast' : ''}">
                  ${isFast ? '⚡' : '⏱️'} ${escapeHtml(b.speed || '2.0s')} Speed
                </span>
                <span class="pet-faction-pill ${factionClass}">${escapeHtml(b.faction || 'Contested')}</span>
                <span class="pet-fam-tag">${escapeHtml(b.family)}</span>
              </div>

              ${b.teaches ? `
                <div class="pet-teaches-box">
                  <span class="pet-teaches-label">Teaches Skill:</span>
                  <span class="pet-teaches-val">📖 ${escapeHtml(b.teaches)}</span>
                </div>
              ` : ''}

              ${b.notes ? `
                <p class="pet-notes-text">${escapeHtml(b.notes)}</p>
              ` : ''}

              <div class="pet-actions-row">
                <button type="button" class="btn-copy-macro" onclick="window.copyPetMacro('${escapeHtml(targetMacro)}', this, 'Copied /target!')" title="Copy /target macro">
                  📋 /target
                </button>
                <button type="button" class="btn-copy-macro tomtom" onclick="window.copyPetMacro('${escapeHtml(tomtomMacro)}', this, 'Copied /way!')" title="Copy TomTom waypoint macro">
                  📍 /way
                </button>
                ${b.npcUrl ? `
                  <a href="${b.npcUrl}" target="_blank" rel="noopener" class="pet-external-link" title="View on Database">↗ DB</a>
                ` : ''}
              </div>
            </div>
          `;
        }).join('')}
      </div>
    `;
  }

  function attachEventListeners(container, pfx = '') {
    // Family Buttons
    const famBtns = container.querySelectorAll('.pet-family-btn');
    famBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        selectedFamily = normalizePetFamily(btn.getAttribute('data-family') || 'all');
        renderPetHub();
      });
    });

    // Search input
    const searchInp = container.querySelector(`#${pfx}pet-search-input`) || container.querySelector('.pet-search-input');
    if (searchInp) {
      searchInp.addEventListener('input', (e) => {
        searchQuery = e.target.value;
        const grid = container.querySelector(`#${pfx}pet-results-grid`) || container.querySelector('.pet-results-container');
        if (grid) grid.innerHTML = renderBeastCards(getPetData());
      });
    }

    // Speed filter
    const speedSelect = container.querySelector(`#${pfx}pet-filter-speed`) || container.querySelector('.pet-select');
    if (speedSelect) {
      speedSelect.addEventListener('change', (e) => {
        speedFilter = e.target.value;
        const grid = container.querySelector(`#${pfx}pet-results-grid`) || container.querySelector('.pet-results-container');
        if (grid) grid.innerHTML = renderBeastCards(getPetData());
      });
    }

    // Faction filter
    const factSelect = container.querySelector(`#${pfx}pet-filter-faction`);
    if (factSelect) {
      factSelect.addEventListener('change', (e) => {
        factionFilter = e.target.value;
        const grid = container.querySelector(`#${pfx}pet-results-grid`) || container.querySelector('.pet-results-container');
        if (grid) grid.innerHTML = renderBeastCards(getPetData());
      });
    }

    // Level filter
    const lvlSelect = container.querySelector(`#${pfx}pet-filter-level`);
    if (lvlSelect) {
      lvlSelect.addEventListener('change', (e) => {
        maxLevelFilter = parseInt(e.target.value, 10);
        const grid = container.querySelector(`#${pfx}pet-results-grid`) || container.querySelector('.pet-results-container');
        if (grid) grid.innerHTML = renderBeastCards(getPetData());
      });
    }

    // New Spawns toggle
    const newToggle = container.querySelector(`#${pfx}pet-filter-new`) || container.querySelector('.pet-filter-new');
    if (newToggle) {
      newToggle.addEventListener('change', (e) => {
        newSpawnsOnly = e.target.checked;
        const grid = container.querySelector(`#${pfx}pet-results-grid`) || container.querySelector('.pet-results-container');
        if (grid) grid.innerHTML = renderBeastCards(getPetData());
      });
    }
  }

  window.resetPetFilters = function () {
    selectedFamily = 'all';
    searchQuery = '';
    speedFilter = 'all';
    factionFilter = 'all';
    maxLevelFilter = 60;
    newSpawnsOnly = false;
    renderPetHub();
  };

  // Expose init
  window.initHunterPets = initHunterPets;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initHunterPets);
  } else {
    setTimeout(initHunterPets, 50);
  }
})();
