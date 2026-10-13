/**
 * World of Warcraft: Forever - What's Changed Module
 * Comprehensive 753-Change Comparator: New Talents, Changed Talents, Spells,
 * Side-by-Side Classic vs Forever Tooltips, Multi-Rank Inspecting, and Race Matrices.
 */

(function () {
  'use strict';

  let currentClass = 'all';
  let currentCategory = 'all_changes'; // 'all_changes' | 'new_talents' | 'changed_talents' | 'removed_talents' | 'spells' | 'everything'
  let searchQuery = '';
  let selectedItemId = null;
  let selectedRank = 1;
  let detailsExpanded = false;

  const CDN_BASE = 'https://wow.zamimg.com/images/wow/icons/medium/';

  function getIconUrl(icon) {
    if (!icon) return `${CDN_BASE}inv_misc_questionmark.jpg`;
    if (icon.startsWith('http://') || icon.startsWith('https://')) return icon;
    const clean = icon.replace(/\.(jpg|png|webp)$/i, '');
    return `${CDN_BASE}${clean}.jpg`;
  }

  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function getStatusBadge(item) {
    const k = item.reported_change_kind;
    if (k === 'added') return '<span class="change-badge badge-new">New</span>';
    if (k === 'modified') return '<span class="change-badge badge-changed">Changed</span>';
    if (k === 'moved') return '<span class="change-badge badge-moved">Moved</span>';
    if (k === 'removed') return '<span class="change-badge badge-removed">Removed</span>';
    if (k === 'renamed') return '<span class="change-badge badge-changed">Renamed</span>';
    return '<span class="change-badge badge-unchanged">Unchanged</span>';
  }

  function getCategoryLabel(cat) {
    switch (cat) {
      case 'new_talents': return 'New talents';
      case 'changed_talents': return 'Changed talents';
      case 'removed_talents': return 'Removed talents';
      case 'spells': return 'Spells';
      case 'everything': return 'Everything';
      default: return 'All changes';
    }
  }

  function filterEntries(entries, category, query) {
    let result = entries.filter(e => {
      if (category === 'all_changes') {
        return e.reported_change_kind !== 'unchanged';
      }
      if (category === 'new_talents') {
        return e.kind === 'talent' && e.reported_change_kind === 'added';
      }
      if (category === 'changed_talents') {
        return e.kind === 'talent' && ['modified', 'moved', 'renamed'].includes(e.reported_change_kind);
      }
      if (category === 'removed_talents') {
        return e.kind === 'talent' && e.reported_change_kind === 'removed';
      }
      if (category === 'spells') {
        return e.kind === 'spell';
      }
      if (category === 'everything') {
        return true;
      }
      return true;
    });

    if (query) {
      const q = query.toLowerCase().trim();
      result = result.filter(e => {
        const nameMatch = e.name && e.name.toLowerCase().includes(q);
        const summaryMatch = e.summary && e.summary.toLowerCase().includes(q);
        const treeMatch = e.tree_name && e.tree_name.toLowerCase().includes(q);
        const rankMatch = e.rank_texts && Object.values(e.rank_texts).some(t => t.toLowerCase().includes(q));
        return nameMatch || summaryMatch || treeMatch || rankMatch;
      });
    }

    return result;
  }

  function parseHash() {
    const raw = (window.location.hash || '').toLowerCase().replace(/^#+/, '');
    if (!raw.startsWith('changes')) return null;
    const parts = raw.replace(/^changes[/#]?/, '').split(/[/#]/).filter(Boolean);
    const slug = parts[0] || 'all';
    const cat = parts[1] || 'all_changes';
    return { classSlug: slug, category: cat };
  }

  function initChangesModule() {
    const container = document.getElementById('changes-mount-point');
    if (!container) return;

    if (!window.WOW_CHANGES_DATA) {
      console.warn('WOW_CHANGES_DATA not loaded yet.');
      return;
    }

    const hashRoute = parseHash();
    if (hashRoute && window.WOW_CHANGES_DATA.classes[hashRoute.classSlug]) {
      currentClass = hashRoute.classSlug;
      if (hashRoute.category) currentCategory = hashRoute.category;
    }

    renderModule();

    window.addEventListener('hashchange', () => {
      const r = parseHash();
      if (r && window.WOW_CHANGES_DATA.classes[r.classSlug]) {
        currentClass = r.classSlug;
        if (r.category) currentCategory = r.category;
        renderModule();
      }
    });
  }

  function renderModule() {
    const container = document.getElementById('changes-mount-point');
    if (!container) return;

    const data = window.WOW_CHANGES_DATA;
    const classInfo = data.classes[currentClass] || data.classes['all'];
    const allEntries = data.entries;
    const classEntries = currentClass === 'all' ? allEntries : allEntries.filter(e => e.class === currentClass);

    container.innerHTML = `
      <div class="changes-container">
        <!-- 1. Top Class Selector Bar -->
        <nav class="changes-class-bar" aria-label="Class Navigation">
          ${renderClassBar(data.classes)}
        </nav>

        <!-- 2. Hero Header Card -->
        ${renderHeroCard(classInfo)}

        <!-- 3. Workspace Layout -->
        <div class="changes-workspace-grid">
          <!-- Column 1: Sidebar Categories -->
          <aside class="changes-sidebar">
            <div class="changes-subtab-list">
              ${renderSidebarCategories(classInfo.stats)}
            </div>

            <!-- Talent Planner Banner -->
            <div class="changes-planner-banner" id="btn-launch-talent-planner" title="Open Interactive Talent Calculator">
              <div class="changes-planner-title">
                <span>⚡ Talent Calculator</span>
                <span>›</span>
              </div>
              <div class="changes-planner-sub">
                Plan a ${classInfo.name === 'All' ? 'WoW Forever' : classInfo.name} build, level 10 to 60 with complete talent trees.
              </div>
            </div>
          </aside>

          <!-- Column 2: Changes List -->
          <main class="changes-list-column">
            <div class="changes-list-header">
              <h2 class="changes-list-title">
                ${escapeHtml(getCategoryLabel(currentCategory))}: <span style="color: var(--text-gold, #facc15);">${escapeHtml(classInfo.name)}</span>
              </h2>
              <div class="changes-search-wrap">
                <span class="changes-search-icon">🔍</span>
                <input type="text" id="changes-search-input" class="changes-search-input" placeholder="Search spells and talents..." value="${escapeHtml(searchQuery)}" aria-label="Search Forever class and spell changes" />
              </div>
            </div>

            <div class="changes-cards-scroll" id="changes-cards-container">
              ${renderCardsList(classEntries)}
            </div>
          </main>

          <!-- Column 3: Inspector Panel -->
          <aside class="changes-inspector" id="changes-inspector-container">
            ${renderInspectorPanel(classEntries)}
          </aside>
        </div>
      </div>
    `;

    attachEventListeners(container, classEntries);
  }

  function renderClassBar(classes) {
    const list = Object.values(classes);
    return list.map(c => {
      const isActive = c.slug === currentClass;
      return `
        <button type="button" class="changes-class-btn ${isActive ? 'active' : ''}" data-slug="${c.slug}">
          <img src="${getIconUrl(c.icon)}" alt="${escapeHtml(c.name)}" class="changes-class-icon" loading="lazy" />
          <span>${escapeHtml(c.name)}</span>
        </button>
      `;
    }).join('');
  }

  function renderHeroCard(classInfo) {
    const isAll = classInfo.slug === 'all';
    const allianceRaces = (classInfo.races || []).filter(r => r.faction === 'Alliance');
    const hordeRaces = (classInfo.races || []).filter(r => r.faction === 'Horde');

    const crestImg = isAll ? 'inv_misc_book_09' : classInfo.icon;

    return `
      <div class="changes-hero-card">
        <img src="${getIconUrl(crestImg)}" alt="${escapeHtml(classInfo.name)}" class="changes-hero-crest" />
        <div class="changes-hero-body">
          <h1 class="changes-hero-title">${escapeHtml(classInfo.heroTitle)}</h1>
          <p class="changes-hero-desc">${escapeHtml(classInfo.heroDesc)}</p>

          ${!isAll && classInfo.races && classInfo.races.length > 0 ? `
            <div class="changes-hero-races">
              <span style="font-weight: 700; color: #fff;">Playable Races:</span>
              <div class="changes-faction-group">
                <span style="color: #60a5fa; font-weight: 700;">🦁 Alliance:</span>
                ${allianceRaces.map(r => `
                  <span class="changes-race-item">
                    <span>${escapeHtml(r.name)}</span>
                    ${r.isNew ? '<span class="changes-race-new">new</span>' : ''}
                  </span>
                `).join(' · ')}
              </div>
              <div class="changes-faction-group" style="margin-left: 0.5rem;">
                <span style="color: #f87171; font-weight: 700;">⚔️ Horde:</span>
                ${hordeRaces.map(r => `
                  <span class="changes-race-item">
                    <span>${escapeHtml(r.name)}</span>
                    ${r.isNew ? '<span class="changes-race-new">new</span>' : ''}
                  </span>
                `).join(' · ')}
              </div>
            </div>
          ` : ''}
        </div>

        <div class="changes-hero-stats">
          <div class="changes-stat-box">
            <div class="changes-stat-num">${classInfo.stats.talentsChanged}</div>
            <div class="changes-stat-label">Talents changed</div>
          </div>
          <div class="changes-stat-box">
            <div class="changes-stat-num" style="color: #4ade80;">${classInfo.stats.talentsNew}</div>
            <div class="changes-stat-label">New talents</div>
          </div>
          <div class="changes-stat-box">
            <div class="changes-stat-num" style="color: #38bdf8;">${classInfo.stats.spellsChanged}</div>
            <div class="changes-stat-label">Spells changed</div>
          </div>
        </div>
      </div>
    `;
  }

  function renderSidebarCategories(stats) {
    const categories = [
      { id: 'all_changes', label: 'All changes', count: stats.allChanges },
      { id: 'new_talents', label: 'New talents', count: stats.talentsNew },
      { id: 'changed_talents', label: 'Changed talents', count: stats.talentsChanged },
      { id: 'removed_talents', label: 'Removed talents', count: stats.talentsRemoved },
      { id: 'spells', label: 'Spells', count: stats.spellsTotal },
      { id: 'everything', label: 'Everything', count: stats.everything }
    ];

    return categories.map(cat => {
      const isActive = cat.id === currentCategory;
      return `
        <button type="button" class="changes-subtab-btn ${isActive ? 'active' : ''}" data-cat="${cat.id}">
          <span>${escapeHtml(cat.label)}</span>
          <span class="changes-subtab-count">${cat.count}</span>
        </button>
      `;
    }).join('');
  }

  function renderCardsList(entries) {
    const filtered = filterEntries(entries, currentCategory, searchQuery);

    if (filtered.length === 0) {
      return `
        <div style="padding: 2.5rem; text-align: center; color: #94a3b8; background: rgba(15,23,42,0.6); border-radius: 8px;">
          <p style="font-size: 1.1rem; color: #fff; margin-bottom: 0.5rem;">No abilities or talents match your query</p>
          <small>Try clearing your search term or selecting a different category.</small>
        </div>
      `;
    }

    // Default select first item if none or invalid
    if (!selectedItemId || !filtered.some(e => e.id === selectedItemId)) {
      selectedItemId = filtered[0].id;
      selectedRank = 1;
    }

    return filtered.map(item => {
      const isActive = item.id === selectedItemId;
      const typeLabel = item.kind === 'talent' 
        ? `Talent · ${item.tree_name || 'Class'}` 
        : `Spell · ${item.tree_name || 'Baseline'}`;

      return `
        <div class="change-item-card ${isActive ? 'active' : ''}" data-id="${item.id}">
          <img src="${getIconUrl(item.icon)}" alt="${escapeHtml(item.name)}" class="change-item-icon" loading="lazy" />
          <div class="change-item-info">
            <h4 class="change-item-title">${escapeHtml(item.name)}</h4>
            <p class="change-item-summary">${escapeHtml(item.summary || (item.rank_texts ? item.rank_texts['1'] : ''))}</p>
          </div>
          <div class="change-item-meta">
            ${getStatusBadge(item)}
            <span class="change-item-tree-tag">${escapeHtml(typeLabel)}</span>
          </div>
          <span class="change-item-arrow">›</span>
        </div>
      `;
    }).join('');
  }

  function renderInspectorPanel(entries) {
    const item = entries.find(e => e.id === selectedItemId) || entries[0];
    if (!item) {
      return `<div style="color: #94a3b8; padding: 2rem; text-align: center;">Select a spell or talent to inspect comparisons.</div>`;
    }

    const maxRank = item.max_rank || 1;
    const currentR = Math.min(maxRank, selectedRank);

    // Tooltip texts for rank
    const foreverText = item.rank_texts ? (item.rank_texts[String(currentR)] || item.rank_texts['1'] || item.summary || '') : (item.summary || '');
    const classicTexts = item.classic?.rank_texts || {};
    const classicText = classicTexts[String(currentR)] || classicTexts['1'] || 'Not present in Classic Era (New in WoW Forever).';

    return `
      <div class="inspector-header">
        <img src="${getIconUrl(item.icon)}" alt="${escapeHtml(item.name)}" class="inspector-icon" />
        <div class="inspector-title-wrap">
          <div class="inspector-title">
            <span>${escapeHtml(item.name)}</span>
            ${getStatusBadge(item)}
          </div>
          ${item.tree_name ? `
            <a href="#planner" class="inspector-tree-link" data-class="${item.class}" data-tree="${item.tree_name}">
              See it in the ${escapeHtml(item.tree_name)} tree ›
            </a>
          ` : ''}
        </div>
      </div>

      <!-- Rank Selector Bar (if multi-rank) -->
      ${maxRank > 1 ? `
        <div class="inspector-ranks-bar">
          <span>Rank:</span>
          ${Array.from({ length: maxRank }, (_, i) => i + 1).map(r => `
            <button type="button" class="inspector-rank-btn ${r === currentR ? 'active' : ''}" data-rank="${r}">
              ${r}
            </button>
          `).join('')}
        </div>
      ` : ''}

      <!-- Side-by-Side Comparison -->
      <div class="inspector-comparison-grid">
        <div class="comparison-box classic">
          <div class="comparison-label">Classic</div>
          <p class="comparison-text">${escapeHtml(classicText)}</p>
        </div>
        <div class="comparison-box forever">
          <div class="comparison-label">Forever</div>
          <p class="comparison-text">${escapeHtml(foreverText)}</p>
        </div>
      </div>

      <!-- Expandable Details Accordion -->
      <div class="inspector-details-card">
        <div class="inspector-details-summary" id="inspector-toggle-details">
          <span>${detailsExpanded ? '▼' : '▶'} Details</span>
          <span style="font-size: 0.75rem; color: #38bdf8;">${detailsExpanded ? 'Collapse' : 'Expand'}</span>
        </div>

        ${detailsExpanded ? `
          <div class="inspector-details-content">
            <div class="inspector-detail-row">
              <span class="inspector-detail-label">Status:</span>
              <span class="inspector-detail-val" style="color: #4ade80;">Verified in Client Data</span>
            </div>
            <div class="inspector-detail-row">
              <span class="inspector-detail-label">Class & Kind:</span>
              <span class="inspector-detail-val">${escapeHtml(item.class)} (${escapeHtml(item.kind)})</span>
            </div>
            ${item.tree_name ? `
              <div class="inspector-detail-row">
                <span class="inspector-detail-label">Talent Tree:</span>
                <span class="inspector-detail-val">${escapeHtml(item.tree_name)}</span>
              </div>
            ` : ''}
            ${item.structure?.tier !== undefined ? `
              <div class="inspector-detail-row">
                <span class="inspector-detail-label">Grid Position:</span>
                <span class="inspector-detail-val">Tier ${item.structure.tier + 1}, Col ${item.structure.col + 1}</span>
              </div>
            ` : ''}
            ${item.tooltip_metadata?.cast_time ? `
              <div class="inspector-detail-row">
                <span class="inspector-detail-label">Cast Time:</span>
                <span class="inspector-detail-val">${escapeHtml(item.tooltip_metadata.cast_time)}</span>
              </div>
            ` : ''}
            ${item.tooltip_metadata?.cooldown ? `
              <div class="inspector-detail-row">
                <span class="inspector-detail-label">Cooldown:</span>
                <span class="inspector-detail-val">${escapeHtml(item.tooltip_metadata.cooldown)}</span>
              </div>
            ` : ''}
            ${item.tooltip_metadata?.cost ? `
              <div class="inspector-detail-row">
                <span class="inspector-detail-label">Resource Cost:</span>
                <span class="inspector-detail-val">${escapeHtml(item.tooltip_metadata.cost)}</span>
              </div>
            ` : ''}
            ${item.sources && item.sources.length > 0 ? `
              <div class="inspector-detail-row">
                <span class="inspector-detail-label">Primary Source:</span>
                <span class="inspector-detail-val">
                  <a href="${item.sources[0].url}" target="_blank" rel="noopener" class="inspector-source-link">
                    ${escapeHtml(item.sources[0].title || 'Client Data')} ↗
                  </a>
                </span>
              </div>
            ` : ''}
          </div>
        ` : ''}
      </div>
    `;
  }

  function attachEventListeners(container, classEntries) {
    // 1. Class selector clicks
    container.querySelectorAll('.changes-class-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const slug = btn.getAttribute('data-slug');
        if (slug !== currentClass) {
          currentClass = slug;
          selectedItemId = null;
          selectedRank = 1;
          renderModule();
          if (history.replaceState) {
            history.replaceState(null, '', `#changes/${slug}${currentCategory ? '#' + currentCategory : ''}`);
          }
        }
      });
    });

    // 2. Sidebar category clicks
    container.querySelectorAll('.changes-subtab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const cat = btn.getAttribute('data-cat');
        if (cat !== currentCategory) {
          currentCategory = cat;
          selectedItemId = null;
          selectedRank = 1;
          renderModule();
          if (history.replaceState) {
            history.replaceState(null, '', `#changes/${currentClass}#${cat}`);
          }
        }
      });
    });

    // 3. Search input
    const searchInput = container.querySelector('#changes-search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value;
        const cardsContainer = container.querySelector('#changes-cards-container');
        if (cardsContainer) {
          cardsContainer.innerHTML = renderCardsList(classEntries);
          attachCardClickListeners(container, classEntries);
          const inspectorContainer = container.querySelector('#changes-inspector-container');
          if (inspectorContainer) {
            inspectorContainer.innerHTML = renderInspectorPanel(classEntries);
            attachInspectorListeners(container, classEntries);
          }
        }
      });
    }

    // 4. Card clicks
    attachCardClickListeners(container, classEntries);

    // 5. Inspector actions
    attachInspectorListeners(container, classEntries);

    // 6. Launch talent planner button
    const plannerBtn = container.querySelector('#btn-launch-talent-planner');
    if (plannerBtn) {
      plannerBtn.addEventListener('click', () => {
        if (window.TalentTreeModule) {
          const targetClass = currentClass === 'all' ? 'warrior' : currentClass;
          window.TalentTreeModule.openModal({
            classId: targetClass,
            blankSlate: true,
            maxPoints: 26,
            specName: `${targetClass.charAt(0).toUpperCase() + targetClass.slice(1)} Custom Build`
          });
        } else {
          const plannerTabBtn = document.querySelector('.nav-tab-btn[data-tab="planner"]');
          if (plannerTabBtn) plannerTabBtn.click();
        }
      });
    }
  }

  function attachCardClickListeners(container, classEntries) {
    container.querySelectorAll('.change-item-card').forEach(card => {
      card.addEventListener('click', () => {
        const id = card.getAttribute('data-id');
        if (id !== selectedItemId) {
          selectedItemId = id;
          selectedRank = 1;
          container.querySelectorAll('.change-item-card').forEach(c => c.classList.remove('active'));
          card.classList.add('active');
          const inspector = container.querySelector('#changes-inspector-container');
          if (inspector) {
            inspector.innerHTML = renderInspectorPanel(classEntries);
            attachInspectorListeners(container, classEntries);
          }
        }
      });
    });
  }

  function attachInspectorListeners(container, classEntries) {
    // Rank buttons
    container.querySelectorAll('.inspector-rank-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        selectedRank = parseInt(btn.getAttribute('data-rank') || '1', 10);
        const inspector = container.querySelector('#changes-inspector-container');
        if (inspector) {
          inspector.innerHTML = renderInspectorPanel(classEntries);
          attachInspectorListeners(container, classEntries);
        }
      });
    });

    // Toggle details
    const toggleBtn = container.querySelector('#inspector-toggle-details');
    if (toggleBtn) {
      toggleBtn.addEventListener('click', () => {
        detailsExpanded = !detailsExpanded;
        const inspector = container.querySelector('#changes-inspector-container');
        if (inspector) {
          inspector.innerHTML = renderInspectorPanel(classEntries);
          attachInspectorListeners(container, classEntries);
        }
      });
    }

    // See it in the tree link
    const treeLink = container.querySelector('.inspector-tree-link');
    if (treeLink) {
      treeLink.addEventListener('click', (e) => {
        e.preventDefault();
        const cls = treeLink.getAttribute('data-class');
        const item = classEntries.find(i => i.id === selectedItemId);
        if (window.TalentTreeModule) {
          window.TalentTreeModule.openModal({
            classId: cls || 'warrior',
            blankSlate: true,
            maxPoints: 26,
            specName: `${cls.charAt(0).toUpperCase() + cls.slice(1)} Tree`,
            highlightTalent: item?.name || null
          });
        } else {
          const plannerTabBtn = document.querySelector('.nav-tab-btn[data-tab="planner"]');
          if (plannerTabBtn) plannerTabBtn.click();
        }
      });
    }
  }

  // Global export
  window.initChangesModule = initChangesModule;
  window.WOW_CHANGES = {
    selectClass: (slug, category) => {
      currentClass = slug;
      if (category) currentCategory = category;
      selectedItemId = null;
      selectedRank = 1;
      const navBtn = document.querySelector('.nav-tab-btn[data-tab="changes"]');
      if (navBtn) navBtn.click();
      renderModule();
      if (history.replaceState) {
        history.replaceState(null, '', `#changes/${slug}${currentCategory ? '#' + currentCategory : ''}`);
      }
    },
    selectItem: (slug, itemId) => {
      if (slug) currentClass = slug;
      currentCategory = 'everything';
      selectedItemId = itemId;
      selectedRank = 1;
      const navBtn = document.querySelector('.nav-tab-btn[data-tab="changes"]');
      if (navBtn) navBtn.click();
      renderModule();
      if (history.replaceState) {
        history.replaceState(null, '', `#changes/${slug}#everything`);
      }
      setTimeout(() => {
        const targetCard = document.querySelector(`.change-item-card[data-id="${itemId}"]`);
        if (targetCard) {
          targetCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 100);
    }
  };

  // Auto-init on DOMContentLoaded or if container already available
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initChangesModule);
  } else {
    setTimeout(initChangesModule, 50);
  }

})();
