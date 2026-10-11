/**
 * World of Warcraft: Forever - Professions & Trade Economy Hub Module
 * Comprehensive 1-300 Leveling Guides, Merchant's Favor Turn-Ins, Recipe Index, and Camp Synergies.
 */

(function () {
  'use strict';

  let currentProfession = 'alchemy';
  let currentSubTab = 'recipes';
  let currentCategory = 'all';
  let searchQuery = '';
  let filterNewOnly = false;
  let playerSkill = null;

  const CDN_BASE = 'https://wow.zamimg.com/images/wow/icons/medium/';

  function getIconUrl(icon) {
    if (!icon) return `${CDN_BASE}inv_misc_questionmark.jpg`;
    const clean = icon.replace(/\.(jpg|png|webp)$/i, '');
    return `${CDN_BASE}${clean}.jpg`;
  }

  function getSkillClass(recipe, skill) {
    if (skill === null || skill === undefined || isNaN(skill)) {
      return 'skill-orange';
    }
    const s = Number(skill);
    if (s < recipe.learn) return 'skill-grey';
    if (s < recipe.yellow) return 'skill-orange';
    if (s < recipe.green) return 'skill-yellow';
    if (s < recipe.grey) return 'skill-green';
    return 'skill-grey';
  }

  function initProfessionsHub() {
    const container = document.getElementById('tab-professions');
    if (!container) return;

    // Check if professions data is loaded
    if (!window.WOW_PROFESSIONS_DATA) {
      console.warn('WOW_PROFESSIONS_DATA not loaded yet.');
      return;
    }

    // Read URL hash on load (e.g. #professions/engineering or #professions/blacksmithing/leveling)
    const hash = window.location.hash.toLowerCase().replace('#', '');
    if (hash.startsWith('professions')) {
      const parts = hash.split('/');
      if (parts[1] && window.WOW_PROFESSIONS_DATA[parts[1]]) {
        currentProfession = parts[1];
      }
      if (parts[2] && ['recipes', 'leveling', 'shopping', 'favor', 'camping'].includes(parts[2])) {
        currentSubTab = parts[2];
      }
    }

    renderMasterLayout(container);
  }

  function renderMasterLayout(container) {
    // Preserve existing header & camping components if present
    const existingHeading = container.querySelector('.section-heading-bar');
    const existingCampingOverview = container.querySelector('.camping-overview-card');
    const existingSleepingBag = container.querySelector('#cozy-sleeping-bag-container');
    const existingStationsContainer = container.querySelector('#camping-stations-container');
    const existingPassivesHeading = container.querySelectorAll('.section-heading-bar')[1];
    const existingPassivesContainer = container.querySelector('#professions-passives-container');

    // Create or locate the interactive professions mount point
    let mount = document.getElementById('professions-interactive-mount');
    if (!mount) {
      mount = document.createElement('div');
      mount.id = 'professions-interactive-mount';
      mount.className = 'professions-interactive-hub';
      
      // Insert right after the section heading
      if (existingHeading && existingHeading.nextSibling) {
        container.insertBefore(mount, existingHeading.nextSibling);
      } else {
        container.prepend(mount);
      }
    }

    mount.innerHTML = `
      <!-- Profession Selector Toolbar -->
      <div class="prof-selector-container">
        <div class="prof-selector-grid" id="prof-selector-buttons"></div>
      </div>

      <!-- Active Profession Viewport -->
      <div id="prof-viewport-container"></div>
    `;

    renderSelectorButtons();
    renderActiveProfession();
  }

  function renderSelectorButtons() {
    const grid = document.getElementById('prof-selector-buttons');
    if (!grid) return;

    const data = window.WOW_PROFESSIONS_DATA;
    const slugs = Object.keys(data);

    let html = '';
    slugs.forEach(slug => {
      const p = data[slug];
      const isActive = slug === currentProfession;
      const isNewTrade = slug === 'camping';

      html += `
        <button type="button" class="prof-tile-btn ${isActive ? 'active' : ''}" data-slug="${slug}">
          ${isNewTrade ? '<span class="prof-tile-badge">NEW</span>' : ''}
          <img src="${getIconUrl(p.icon)}" alt="${p.name}" class="prof-tile-icon" loading="lazy" />
          <span class="prof-tile-name">${p.name}</span>
        </button>
      `;
    });

    grid.innerHTML = html;

    // Attach click events
    grid.querySelectorAll('.prof-tile-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const slug = btn.getAttribute('data-slug');
        if (slug !== currentProfession) {
          currentProfession = slug;
          currentCategory = 'all';
          searchQuery = '';
          grid.querySelectorAll('.prof-tile-btn').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          renderActiveProfession();
          
          // Update hash non-intrusively
          if (history.replaceState) {
            history.replaceState(null, '', `#professions/${slug}/${currentSubTab}`);
          }
        }
      });
    });
  }

  function renderActiveProfession() {
    const viewport = document.getElementById('prof-viewport-container');
    if (!viewport) return;

    const prof = window.WOW_PROFESSIONS_DATA[currentProfession];
    if (!prof) return;

    const campBuffHtml = prof.campBuff ? `
      <div class="prof-camp-buff-pill">
        <img src="${getIconUrl(prof.campBuff.icon)}" alt="${prof.campBuff.name}" />
        <div class="prof-camp-buff-text">
          <strong>${prof.campBuff.name} (Campfire Skill ${prof.campBuff.skill}+):</strong> ${prof.campBuff.effect}
        </div>
      </div>
    ` : '';

    viewport.innerHTML = `
      <!-- Hero Banner -->
      <div class="prof-hero-card">
        <div class="prof-hero-main">
          <img src="${getIconUrl(prof.icon)}" alt="${prof.name}" class="prof-hero-large-icon" />
          <div class="prof-hero-title">
            <h3>${prof.name} <span style="font-size: 0.9rem; font-weight: 500; color: #94a3b8;">(${prof.category})</span></h3>
            <p>${prof.summary}</p>
            ${campBuffHtml}
          </div>
        </div>
        <div class="prof-hero-stats">
          <div class="prof-stat-box">
            <div class="prof-stat-num">${prof.stats.recipeCount}</div>
            <div class="prof-stat-label">Recipes</div>
          </div>
          <div class="prof-stat-box">
            <div class="prof-stat-num" style="color: #38bdf8;">${prof.stats.newInForever}</div>
            <div class="prof-stat-label">New in Forever</div>
          </div>
          <div class="prof-stat-box">
            <div class="prof-stat-num" style="color: #4ade80;">${prof.stats.favorRecipes}</div>
            <div class="prof-stat-label">Favor Recipes</div>
          </div>
        </div>
      </div>

      <!-- Sub-Navigation Bar -->
      <nav class="prof-subnav-bar">
        <button type="button" class="prof-subnav-btn ${currentSubTab === 'recipes' ? 'active' : ''}" data-subtab="recipes">
          <span>📜</span> Recipes & Enchants (${prof.stats.recipeCount})
        </button>
        <button type="button" class="prof-subnav-btn ${currentSubTab === 'leveling' ? 'active' : ''}" data-subtab="leveling">
          <span>📈</span> Leveling 1–300 Guide
        </button>
        <button type="button" class="prof-subnav-btn ${currentSubTab === 'shopping' ? 'active' : ''}" data-subtab="shopping">
          <span>🛒</span> Reagent Shopping List
        </button>
        <button type="button" class="prof-subnav-btn ${currentSubTab === 'favor' ? 'active' : ''}" data-subtab="favor">
          <span>📦</span> Merchant's Favor (${prof.stats.favorRecipes})
        </button>
      </nav>

      <!-- Subtab Content Body -->
      <div id="prof-subtab-body"></div>
    `;

    // Subtab click handlers
    viewport.querySelectorAll('.prof-subnav-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        currentSubTab = btn.getAttribute('data-subtab');
        viewport.querySelectorAll('.prof-subnav-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderSubTabContent(prof);

        if (history.replaceState) {
          history.replaceState(null, '', `#professions/${currentProfession}/${currentSubTab}`);
        }
      });
    });

    renderSubTabContent(prof);
  }

  function renderSubTabContent(prof) {
    const body = document.getElementById('prof-subtab-body');
    if (!body) return;

    if (currentSubTab === 'recipes') {
      renderRecipesTab(body, prof);
    } else if (currentSubTab === 'leveling') {
      renderLevelingTab(body, prof);
    } else if (currentSubTab === 'shopping') {
      renderShoppingTab(body, prof);
    } else if (currentSubTab === 'favor') {
      renderFavorTab(body, prof);
    }
  }

  /* ==========================================================================
     SUBTAB 1: RECIPES BROWSER
     ========================================================================== */
  function renderRecipesTab(container, prof) {
    const groups = prof.groups || [];

    // Filter recipes
    const filtered = prof.recipes.filter(r => {
      // Category filter
      if (currentCategory !== 'all' && r.cat !== currentCategory) {
        return false;
      }
      // New in Forever filter
      if (filterNewOnly && !r.isNew) {
        return false;
      }
      // Search query
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const matchesName = r.name.toLowerCase().includes(q);
        const matchesEffect = r.effect && r.effect.toLowerCase().includes(q);
        const matchesReagents = r.reagents && r.reagents.some(m => m.name.toLowerCase().includes(q));
        const matchesSource = r.source && r.source.toLowerCase().includes(q);
        if (!matchesName && !matchesEffect && !matchesReagents && !matchesSource) {
          return false;
        }
      }
      return true;
    });

    container.innerHTML = `
      <!-- Toolbar -->
      <div class="prof-toolbar">
        <div style="display: flex; gap: 0.75rem; align-items: center; flex-wrap: wrap;">
          <input type="text" id="prof-search-input" class="prof-search-input" placeholder="Search recipe, reagent, drop zone..." value="${searchQuery}" />
          <button type="button" id="prof-new-toggle" class="filter-chip ${filterNewOnly ? 'active' : ''}">
            <span>✨</span> New in Forever Only
          </button>
        </div>
        <div class="prof-skill-calc">
          <span>Simulate Your Skill:</span>
          <input type="number" id="prof-skill-input" class="prof-skill-input" min="1" max="300" placeholder="1-300" value="${playerSkill !== null ? playerSkill : ''}" />
        </div>
      </div>

      <!-- Category Filter Chips -->
      <div class="prof-category-chips" id="prof-category-chips">
        <button type="button" class="prof-cat-chip ${currentCategory === 'all' ? 'active' : ''}" data-cat="all">
          All Categories (${prof.recipes.length})
        </button>
        ${groups.map(g => `
          <button type="button" class="prof-cat-chip ${currentCategory === g.key ? 'active' : ''}" data-cat="${g.key}">
            <img src="${getIconUrl(g.icon)}" alt="${g.label}" />
            ${g.label} (${g.count})
          </button>
        `).join('')}
      </div>

      <!-- Recipes Grid -->
      <div class="recipe-grid">
        ${filtered.length === 0 ? `
          <div style="grid-column: 1 / -1; text-align: center; padding: 3rem; color: #94a3b8; background: rgba(15,23,42,0.5); border-radius: 8px;">
            No recipes found matching your search and filter criteria.
          </div>
        ` : filtered.map(r => renderRecipeCard(r)).join('')}
      </div>
    `;

    // Event listeners
    const searchInput = container.querySelector('#prof-search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value.trim();
        renderRecipesTab(container, prof);
      });
    }

    const newToggle = container.querySelector('#prof-new-toggle');
    if (newToggle) {
      newToggle.addEventListener('click', () => {
        filterNewOnly = !filterNewOnly;
        renderRecipesTab(container, prof);
      });
    }

    const skillInput = container.querySelector('#prof-skill-input');
    if (skillInput) {
      skillInput.addEventListener('input', (e) => {
        const val = parseInt(e.target.value, 10);
        playerSkill = !isNaN(val) ? val : null;
        renderRecipesTab(container, prof);
      });
    }

    container.querySelectorAll('.prof-cat-chip').forEach(btn => {
      btn.addEventListener('click', () => {
        currentCategory = btn.getAttribute('data-cat');
        renderRecipesTab(container, prof);
      });
    });
  }

  function renderRecipeCard(r) {
    const qualityClass = `q${r.quality || 1}`;
    const skillClass = getSkillClass(r, playerSkill);
    const skillDisplay = playerSkill !== null ? `Skill ${r.learn} (${skillClass.replace('skill-', '')})` : `Skill ${r.learn}`;

    const reagentsHtml = (r.reagents || []).map(mat => `
      <span class="reagent-chip" title="${mat.name}">
        <img src="${getIconUrl(mat.icon)}" alt="${mat.name}" loading="lazy" />
        <span class="reagent-count">${mat.count}x</span>
        <span class="q${mat.quality}">${mat.name}</span>
      </span>
    `).join('');

    return `
      <div class="recipe-card">
        <div>
          <div class="recipe-card-header">
            <img src="${getIconUrl(r.icon)}" alt="${r.name}" class="recipe-item-icon ${qualityClass}" loading="lazy" />
            <div class="recipe-info">
              <h4 class="recipe-title ${qualityClass}">
                ${r.name}
                ${r.isNew ? '<span class="recipe-new-tag">New</span>' : ''}
              </h4>
              ${r.effect ? `<div class="recipe-effect">${r.effect}</div>` : ''}
            </div>
            <span class="recipe-skill-badge ${skillClass}" title="Learn: ${r.learn} | Yellow: ${r.yellow} | Green: ${r.green} | Grey: ${r.grey}">
              ${skillDisplay}
            </span>
          </div>

          <div class="recipe-reagents-row">
            ${reagentsHtml || '<span style="font-size:0.75rem; color:#94a3b8;">No reagents required</span>'}
          </div>
        </div>

        <div class="recipe-source-line">
          <span>Source:</span>
          <span class="recipe-source-badge">${r.source || 'Trainer'}</span>
        </div>
      </div>
    `;
  }

  /* ==========================================================================
     SUBTAB 2: LEVELING 1-300 ROADMAP
     ========================================================================== */
  function renderLevelingTab(container, prof) {
    const leveling = prof.leveling || {};
    const steps = leveling.steps || [];

    if (steps.length === 0) {
      container.innerHTML = `
        <div style="text-align: center; padding: 3rem; color: #94a3b8; background: rgba(15,23,42,0.5); border-radius: 8px;">
          Leveling roadmap for ${prof.name} is based on open-world node harvesting and gathering skill gains.
        </div>
      `;
      return;
    }

    container.innerHTML = `
      <div class="leveling-note-banner">
        <strong>⚡ Official Phase 2 Beta Strategy:</strong> ${leveling.note || 'Level 225 is the current Phase 2 Beta Cap. Unlocks to 300 at launch.'}
      </div>

      <div class="leveling-roadmap-container">
        ${steps.map((step, idx) => {
          let rankLabel = 'Apprentice';
          if (step.from >= 225) rankLabel = 'Artisan';
          else if (step.from >= 150) rankLabel = 'Expert';
          else if (step.from >= 75) rankLabel = 'Journeyman';

          return `
            <div class="leveling-bracket-card">
              <div class="bracket-range">
                <span>${step.from}–${step.to}</span>
                <span class="bracket-rank-sub">${rankLabel}</span>
              </div>
              <div class="bracket-content">
                <img src="${getIconUrl(step.icon)}" alt="${step.name}" class="bracket-icon" loading="lazy" />
                <div class="bracket-details">
                  <h4>${step.name}</h4>
                  <p>${step.source || 'Learned from Trainer'}</p>
                </div>
              </div>
              <div class="bracket-crafts">
                ~${step.crafts}
                <span>approx. crafts</span>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    `;
  }

  /* ==========================================================================
     SUBTAB 3: REAGENT SHOPPING LIST
     ========================================================================== */
  function renderShoppingTab(container, prof) {
    const shopping = (prof.leveling && prof.leveling.shopping) || [];

    if (shopping.length === 0) {
      container.innerHTML = `
        <div style="text-align: center; padding: 3rem; color: #94a3b8; background: rgba(15,23,42,0.5); border-radius: 8px;">
          No pre-calculated reagent shopping list for this tradeskill.
        </div>
      `;
      return;
    }

    container.innerHTML = `
      <div class="leveling-note-banner">
        <strong>📦 Reagents Required:</strong> Estimated trade goods and materials needed to level ${prof.name} smoothly through the current beta cap.
      </div>

      <div class="shopping-grid">
        ${shopping.map(item => `
          <div class="shopping-card">
            <div class="shopping-card-main">
              <img src="${getIconUrl(item.icon)}" alt="${item.name}" class="shopping-icon q${item.quality}" loading="lazy" />
              <span class="shopping-name q${item.quality}">${item.name}</span>
            </div>
            <div class="shopping-count">${item.count}x</div>
          </div>
        `).join('')}
      </div>
    `;
  }

  /* ==========================================================================
     SUBTAB 4: MERCHANT'S FAVOR RECIPES & CAMPS
     ========================================================================== */
  function renderFavorTab(container, prof) {
    const favor = prof.favor || {};
    const recipes = favor.recipes || [];
    const camps = favor.camps || {};

    container.innerHTML = `
      <!-- Faction Camp Locations -->
      <div class="favor-camps-row">
        <div class="favor-camp-card alliance">
          <h4>🦁 Alliance: Azeroth Commerce Authority</h4>
          <div class="favor-camp-meta">
            <div><strong>Location:</strong> ${camps.a ? camps.a.place + ', ' + camps.a.zone : 'Three Corners, Redridge Mountains'}</div>
            <div><strong>Coordinates:</strong> ${camps.a ? camps.a.x + ', ' + camps.a.y : '10.5, 72.7'}</div>
            <div><strong>Quartermaster:</strong> ${camps.a ? camps.a.npc : 'Nina Surefire'}</div>
          </div>
        </div>

        <div class="favor-camp-card horde">
          <h4>⚔️ Horde: Durotar Supply and Logistics</h4>
          <div class="favor-camp-meta">
            <div><strong>Location:</strong> ${camps.h ? camps.h.place + ', ' + camps.h.zone : 'outside Crossroads, The Barrens'}</div>
            <div><strong>Coordinates:</strong> ${camps.h ? camps.h.x + ', ' + camps.h.y : '49.7, 29.4'}</div>
            <div><strong>Quartermaster:</strong> ${camps.h ? camps.h.npc : 'Apothecary Durelle'}</div>
          </div>
        </div>
      </div>

      <!-- Favor Recipes Grid -->
      <div class="section-heading-bar" style="margin-bottom: 1rem;">
        <div>
          <h2><span>📦</span> Trade Camp Favor Recipes (${recipes.length})</h2>
          <p class="section-subtext">Filled supply crates returned to your faction's trade outpost unlock exclusive craft formulas</p>
        </div>
      </div>

      <div class="recipe-grid">
        ${recipes.length === 0 ? `
          <div style="grid-column: 1 / -1; text-align: center; padding: 3rem; color: #94a3b8; background: rgba(15,23,42,0.5); border-radius: 8px;">
            No Merchant's Favor turn-in recipes for this trade.
          </div>
        ` : recipes.map(f => `
          <div class="recipe-card">
            <div>
              <div class="recipe-card-header">
                <img src="${getIconUrl(f.icon)}" alt="${f.name}" class="recipe-item-icon q${f.quality}" loading="lazy" />
                <div class="recipe-info">
                  <h4 class="recipe-title q${f.quality}">${f.name}</h4>
                  ${f.desc ? `<div class="recipe-effect">${f.desc}</div>` : ''}
                </div>
                <span class="recipe-skill-badge skill-orange">Skill ${f.requiredSkill}+</span>
              </div>
            </div>
            <div class="recipe-source-line">
              <span>Cost:</span>
              <span class="recipe-source-badge" style="color: var(--text-gold);">${f.cost}</span>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  // Export module globally
  window.initProfessionsHub = initProfessionsHub;

})();
