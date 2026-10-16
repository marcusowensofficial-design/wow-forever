/**
 * World of Warcraft: Forever - Class Deep Dives Module
 * Handles Class Selector Chips, Sub-Tab Filtering, Dossiers, Spec Renderers, and Forensics Matrix.
 */

function initClassDeepDives() {
  let selectedDeepDiveClassId = 'hunter';
  let selectedDeepDiveSubTab = 'overview'; // 'overview' | 'core' | 'survival' | 'marksmanship' | 'beastmastery' | 'tauren' | 'matrix'

  const chipsContainer = document.getElementById('deepdive-class-chips');
  const contentContainer = document.getElementById('deepdive-content-container');
  if (!chipsContainer || !contentContainer) return;

  // Header quick-link button hooks
  const quickLinkClassMap = {
    'quick-link-deepdives': 'hunter',
    'quick-link-shaman-deepdive': 'shaman',
    'quick-link-mage-deepdive': 'mage',
    'quick-link-paladin-deepdive': 'paladin',
    'quick-link-warrior-deepdive': 'warrior',
    'quick-link-warlock-deepdive': 'warlock',
    'quick-link-priest-deepdive': 'priest',
    'quick-link-druid-deepdive': 'druid',
    'quick-link-rogue-deepdive': 'rogue'
  };

  Object.entries(quickLinkClassMap).forEach(([id, classSlug]) => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener('click', () => {
        const deepDiveTabBtn = document.querySelector('.nav-tab-btn[data-tab="deepdives"]');
        if (deepDiveTabBtn) deepDiveTabBtn.click();
        window.switchDeepDiveClass(classSlug);
        const target = document.getElementById('tab-deepdives');
        if (target) {
          setTimeout(() => target.scrollIntoView({ behavior: 'smooth' }), 100);
        }
      });
    }
  });

  // Global helper for switching class externally
  window.switchDeepDiveClass = function(classId) {
    if (WOW_FOREVER_DATA.classDeepDives[classId]) {
      selectedDeepDiveClassId = classId;
      selectedDeepDiveSubTab = 'overview';
      renderDeepDiveChips();
      renderDeepDiveContent();
    }
  };

  function renderDeepDiveChips() {
    const classes = Object.values(WOW_FOREVER_DATA.classDeepDives);
    chipsContainer.innerHTML = classes.map(c => `
      <button class="selector-chip-btn ${c.id === selectedDeepDiveClassId ? 'active' : ''}" data-class-id="${c.id}" style="${c.id === selectedDeepDiveClassId ? `border-color: ${c.color}; box-shadow: 0 0 14px ${c.color}45;` : ''}">
        <span>${c.icon}</span>
        <span>${escapeHtml(c.name)}</span>
        ${c.hasData 
          ? '<span class="chip-status-badge ready">✦ Deep Dive Ready</span>' 
          : '<span class="chip-status-badge pending">Pending</span>'}
      </button>
    `).join('');

    chipsContainer.querySelectorAll('.selector-chip-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        selectedDeepDiveClassId = btn.getAttribute('data-class-id');
        selectedDeepDiveSubTab = 'overview';
        renderDeepDiveChips();
        renderDeepDiveContent();
      });
    });
  }

  function renderDeepDiveContent() {
    const cData = WOW_FOREVER_DATA.classDeepDives[selectedDeepDiveClassId];
    if (!cData) return;

    if (!cData.hasData) {
      contentContainer.innerHTML = `
        <div class="deepdive-pending-card">
          <span style="font-size: 3.5rem; display: block; margin-bottom: 0.5rem;">${cData.icon}</span>
          <h2 style="color: ${cData.color}; font-size: 2rem; margin-bottom: 0.5rem;">${escapeHtml(cData.name)} Deep Dive</h2>
          <span class="role-pill" style="margin-bottom: 1rem; display: inline-block;">${escapeHtml(cData.role)}</span>
          <p style="font-size: 1.05rem; color: #cbd5e1; max-width: 600px; margin: 0.5rem auto 1.5rem; line-height: 1.6;">
            ${escapeHtml(cData.pendingText || "Sodapoppin's BlizzCon early access hands-on video transcription is in progress for this class.")}
          </p>
          <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
            <button type="button" class="btn-primary" id="pending-switch-hunter-btn" style="background: linear-gradient(135deg, #4d7c0f, #65a30d); border: none; cursor: pointer;">
              <span>🏹</span> Explore Hunter Deep Dive (Live Now)
            </button>
            <button type="button" class="btn-primary" style="background: rgba(255,255,255,0.08); border: 1px solid var(--border-subtle); color: #fff; cursor: pointer;" onclick="document.querySelector('.nav-tab-btn[data-tab=\\'news\\']').click();">
              <span>📰</span> Check News & Dispatches
            </button>
          </div>
        </div>
      `;

      const switchBtn = document.getElementById('pending-switch-hunter-btn');
      if (switchBtn) {
        switchBtn.addEventListener('click', () => {
          window.switchDeepDiveClass('hunter');
        });
      }
      return;
    }

    // Build the rich view for Hunter (and any future populated class)
    let html = `
      <!-- Deep Dive Class Hero Header -->
      <div class="deepdive-hero-card" style="border-left: 4px solid ${cData.color};">
        <div class="deepdive-hero-top">
          <div style="display: flex; align-items: center; gap: 1rem; flex-wrap: wrap;">
            <span style="font-size: 2.8rem;">${cData.icon}</span>
            <div>
              <div style="display: flex; align-items: center; gap: 0.75rem; flex-wrap: wrap;">
                <h2 style="color: ${cData.color}; font-size: 2rem; margin: 0;">${escapeHtml(cData.name)} Deep Dive</h2>
                <span class="deepdive-badge badge-verified"><span>✓</span> Hands-On Verified</span>
                <span class="deepdive-badge badge-exclusive"><span>✦</span> Living Classic+</span>
              </div>
              <span style="font-size: 0.95rem; color: var(--text-gold); font-weight: 600; display: block; margin-top: 0.2rem;">
                ${escapeHtml(cData.specs)}
              </span>
            </div>
          </div>
          <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
            <span class="role-pill">${escapeHtml(cData.role)}</span>
          </div>
        </div>

        <!-- Video Attribution Callout Box -->
        <div class="deepdive-video-callout">
          <div class="video-callout-icon">📺</div>
          <div class="video-callout-text">
            <div style="display: flex; align-items: center; gap: 0.6rem; flex-wrap: wrap;">
              <strong style="color: #fff; font-size: 1rem;">Primary Source: "${escapeHtml(cData.videoTitle)}"</strong>
              <span class="deepdive-badge badge-demo"><span>🎙️</span> Sodapoppin Early Access</span>
            </div>
            <p style="font-size: 0.85rem; color: #cbd5e1; margin: 0.2rem 0 0;">
              ${escapeHtml(cData.videoSubtitle || cData.sourceAttribution || "Hands-on early access playtest at BlizzCon 2026 covering class changes and live racials testing.")}
            </p>
          </div>
          <a href="${cData.videoUrl}" target="_blank" rel="noopener" class="video-callout-btn">
            <span>▶</span> Watch Video (Timestamped) ↗
          </a>
        </div>

        <p class="deepdive-summary-p">${escapeHtml(cData.summary)}</p>

        <!-- Sub Navigation Bar -->
        <div class="deepdive-subnav-bar">
          ${(cData.subTabs || [
            { id: "overview", label: "Full Dossier", icon: "📑" },
            { id: "core", label: `Core Rules & QoL (${cData.coreRules ? cData.coreRules.length : 0})`, icon: "📜" },
            { id: "matrix", label: `Verification Matrix (${cData.forensicMatrix ? cData.forensicMatrix.length : 0})`, icon: "🔬" }
          ]).map(tab => {
            let label = (tab.label || '').trim();
            if (tab.icon && label.startsWith(tab.icon)) {
              label = label.substring(tab.icon.length).trim();
            }
            label = label.replace(/^[⚡\u26A1]\s*/, '');
            return `
              <button class="deepdive-subnav-btn ${selectedDeepDiveSubTab === tab.id ? 'active' : ''}" data-subtab="${tab.id}">
                <span>${tab.icon}</span> ${escapeHtml(label)}
              </button>
            `;
          }).join('')}
        </div>
      </div>

      <!-- Tab Content Area -->
      <div class="deepdive-tab-body">
        ${renderDeepDiveSubTabBody(cData, selectedDeepDiveSubTab)}
      </div>
    `;

    contentContainer.innerHTML = html;

    // Attach sub-tab event listeners
    contentContainer.querySelectorAll('.deepdive-subnav-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        selectedDeepDiveSubTab = btn.getAttribute('data-subtab');
        renderDeepDiveContent();
      });
    });

    // Attach beta spec tab event listeners
    contentContainer.querySelectorAll('.beta-spec-tab-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const specIdx = parseInt(btn.getAttribute('data-spec-index'), 10);
        window.selectedBetaBuildSpecIndex = window.selectedBetaBuildSpecIndex || {};
        window.selectedBetaBuildSpecIndex[cData.id] = specIdx;
        renderDeepDiveContent();
      });
    });

    // Attach level bracket toggle event listeners
    contentContainer.querySelectorAll('.level-bracket-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        window.selectedBuildLevel = btn.getAttribute('data-build-level');
        renderDeepDiveContent();
      });
    });

    // Attach Deep Dive talent tree view toggle listeners
    contentContainer.querySelectorAll('.deepdive-view-toggle-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        window.deepDiveTalentViewMode = btn.getAttribute('data-view') || 'tree';
        renderDeepDiveContent();
      });
    });

    // Attach Open Interactive Calculator listener
    contentContainer.querySelectorAll('.deepdive-open-calc-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const activeBuildContainer = (window.selectedBuildLevel === '30' && cData.betaBuilds && cData.betaBuilds.level30) 
          ? cData.betaBuilds.level30 
          : ((cData.betaBuilds && cData.betaBuilds.level20) || cData.betaBuilds);
        const activeSpecs = (activeBuildContainer && activeBuildContainer.specs) || (cData.betaBuilds && cData.betaBuilds.specs) || [];
        const currentSpecIdx = (window.selectedBetaBuildSpecIndex && window.selectedBetaBuildSpecIndex[cData.id]) || 0;
        const currentSpec = activeSpecs[currentSpecIdx] || {};
        
        openDeepDiveTalentModal(
          cData.id,
          currentSpec.specId || currentSpec.id || 'custom',
          `${cData.name} - ${currentSpec.name || 'Build'}`,
          currentSpec.buildUrl || currentSpec.wowheadCalcUrl || ''
        );
      });
    });

    // Attach Blank Slate Calculator listener
    contentContainer.querySelectorAll('.deepdive-blank-calc-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        openDeepDiveBlankCalculator(cData.id, cData.name);
      });
    });

    // Attach inline talent tree events & tooltips via TalentTreeModule
    if (window.TalentTreeModule && typeof window.TalentTreeModule.bindInlineTreeEvents === 'function') {
      window.TalentTreeModule.bindInlineTreeEvents(contentContainer, {
        classId: cData.id,
        getPoints: () => (window.currentDeepDivePointsMap || {})
      });
    }

    // Attach search filter listener in Cards mode
    const searchInput = contentContainer.querySelector('#bis-talent-search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        window.deepDiveCardSearchQuery = e.target.value;
        const container = contentContainer.querySelector('#deepdive-inline-talents-container');
        if (container && window.TalentTreeModule) {
          container.innerHTML = window.TalentTreeModule.renderSpecTreesHtml({
            classId: cData.id,
            points: window.currentDeepDivePointsMap || {},
            viewMode: 'cards',
            cardSearchQuery: window.deepDiveCardSearchQuery
          });
          window.TalentTreeModule.bindInlineTreeEvents(container, {
            classId: cData.id,
            getPoints: () => (window.currentDeepDivePointsMap || {})
          });
        }
      });
    }

    // Attach Hunter Pet Stable Filters, Search & Taming Guide Drawer Listeners
    const petSearchInput = contentContainer.querySelector('#pet-beast-search');
    const roleFilterBtns = contentContainer.querySelectorAll('.pet-family-filter-btn');
    const levelFilterBtns = contentContainer.querySelectorAll('.pet-level-filter-btn');
    const toggleAllBtn = contentContainer.querySelector('#pet-toggle-all-drawers');
    const familyCards = contentContainer.querySelectorAll('.pet-family-card');

    let currentRole = 'all';
    let currentLevel = 'all';
    let currentQuery = '';

    function applyPetFilters() {
      const noticeBanner = contentContainer.querySelector('#pet-new-filter-banner');
      if (noticeBanner) {
        noticeBanner.style.display = currentRole === 'new' ? 'flex' : 'none';
      }

      let totalMatchingBeasts = 0;
      let totalMatchingFamilies = 0;
      const isFiltering = (currentLevel !== 'all') || (currentQuery.length > 0) || (currentRole !== 'all');
      const isBracketOrSearchFiltering = (currentLevel !== 'all') || (currentQuery.length > 0);

      familyCards.forEach(card => {
        const role = card.getAttribute('data-family-role') || '';
        const hasNew = card.getAttribute('data-has-new') === 'true';

        // Check role match
        const matchesRole = (currentRole === 'all') ||
          (currentRole === 'damage' && role === 'damage') ||
          (currentRole === 'tank' && role === 'tank') ||
          (currentRole === 'utility' && role === 'utility') ||
          (currentRole === 'new' && hasNew);

        // Highlight new ability callout if filtered by new
        const abilityBox = card.querySelector('.family-new-ability-box');
        if (abilityBox) {
          abilityBox.classList.toggle('filter-highlight', currentRole === 'new' && hasNew);
        }

        // Check beast rows within this card
        const beastRows = card.querySelectorAll('.tame-beast-row');
        let matchingBeastsCount = 0;

        beastRows.forEach(row => {
          const minLvl = parseInt(row.getAttribute('data-min-level'), 10) || 1;
          const maxLvl = parseInt(row.getAttribute('data-max-level'), 10) || 60;
          const isFast = row.getAttribute('data-is-fast') === 'true';
          const searchText = row.getAttribute('data-search-text') || '';

          // Level match
          let matchesLevel = false;
          if (currentLevel === 'all') {
            matchesLevel = true;
          } else if (currentLevel === '10-19') {
            matchesLevel = (minLvl <= 19 && maxLvl >= 10) || (minLvl < 10 && maxLvl >= 10);
          } else if (currentLevel === '20-30') {
            matchesLevel = (minLvl <= 30 && maxLvl >= 20);
          } else if (currentLevel === '30plus') {
            matchesLevel = (maxLvl > 30);
          } else if (currentLevel === 'fast') {
            matchesLevel = isFast;
          }

          // Search match
          const matchesSearch = !currentQuery || searchText.includes(currentQuery);

          if (matchesLevel && matchesSearch) {
            row.style.display = 'flex';
            matchingBeastsCount++;
          } else {
            row.style.display = 'none';
          }
        });

        const drawer = card.querySelector('.pet-tame-drawer');
        const toggleBtn = card.querySelector('.tame-toggle-btn');
        const countSpan = toggleBtn ? toggleBtn.querySelector('span:first-child') : null;
        const totalInFamily = beastRows.length;

        // Family visibility
        const cardVisible = matchesRole && (!isBracketOrSearchFiltering || matchingBeastsCount > 0);

        if (cardVisible) {
          card.style.display = 'flex';
          totalMatchingFamilies++;
          totalMatchingBeasts += matchingBeastsCount;

          if (countSpan) {
            countSpan.textContent = isBracketOrSearchFiltering
              ? `📍 Where to Tame (${matchingBeastsCount} of ${totalInFamily} Beasts)`
              : `📍 Where to Tame (${totalInFamily} Beasts)`;
          }

          const drawerHeaderSummary = card.querySelector('.tdh-summary');
          if (drawerHeaderSummary) {
            drawerHeaderSummary.innerHTML = isBracketOrSearchFiltering
              ? `<span>🐾 <strong>${matchingBeastsCount} of ${totalInFamily} Beasts</strong> Matching Filter</span>`
              : `<span>🐾 <strong>${totalInFamily} Beasts</strong> Available</span>`;
          }

          // Auto-open drawer if user is actively searching or filtering by level/speed so they see results immediately
          if (isBracketOrSearchFiltering) {
            if (drawer && toggleBtn) {
              drawer.classList.add('open');
              toggleBtn.classList.add('open');
            }
          } else {
            // Restore collapsed state when resetting to All Levels unless user explicitly expanded all
            const isAllExpanded = toggleAllBtn && toggleAllBtn.getAttribute('data-state') === 'expanded';
            if (!isAllExpanded && drawer && toggleBtn) {
              drawer.classList.remove('open');
              toggleBtn.classList.remove('open');
            }
          }
        } else {
          card.style.display = 'none';
        }
      });

      // Update global results badge
      const counterBadge = contentContainer.querySelector('#pet-results-counter-badge');
      if (counterBadge) {
        if (isFiltering) {
          counterBadge.style.display = 'inline-flex';
          let filterLabel = '';
          if (currentLevel === '10-19') filterLabel = 'Lvl 10–19';
          else if (currentLevel === '20-30') filterLabel = 'Lvl 20–30';
          else if (currentLevel === '30plus') filterLabel = 'Lvl 30+';
          else if (currentLevel === 'fast') filterLabel = 'Fast Swing ≤1.6s';

          counterBadge.innerHTML = `<span>✓</span> Showing <strong>${totalMatchingBeasts}</strong> beasts across <strong>${totalMatchingFamilies}</strong> families ${filterLabel ? `(${filterLabel})` : ''}`;
        } else {
          counterBadge.style.display = 'none';
        }
      }
    }

    // Role filter clicks
    roleFilterBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        currentRole = btn.getAttribute('data-pet-filter') || 'all';
        roleFilterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        applyPetFilters();
      });
    });

    // Level filter clicks
    levelFilterBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        currentLevel = btn.getAttribute('data-level-filter') || 'all';
        levelFilterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        applyPetFilters();
      });
    });

    // Search input
    if (petSearchInput) {
      petSearchInput.addEventListener('input', (e) => {
        currentQuery = (e.target.value || '').trim().toLowerCase();
        applyPetFilters();
      });
    }

    // Toggle individual drawer
    contentContainer.querySelectorAll('.tame-toggle-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const familyId = btn.getAttribute('data-target-family');
        const drawer = contentContainer.querySelector(`#tame-drawer-${familyId}`);
        if (drawer) {
          const isOpen = drawer.classList.contains('open');
          if (isOpen) {
            drawer.classList.remove('open');
            btn.classList.remove('open');
          } else {
            drawer.classList.add('open');
            btn.classList.add('open');
          }
        }
      });
    });

    // Toggle All drawers
    if (toggleAllBtn) {
      toggleAllBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const isCollapsed = toggleAllBtn.getAttribute('data-state') === 'collapsed';
        contentContainer.querySelectorAll('.pet-tame-drawer').forEach(d => {
          if (isCollapsed) d.classList.add('open');
          else d.classList.remove('open');
        });
        contentContainer.querySelectorAll('.tame-toggle-btn').forEach(b => {
          if (isCollapsed) b.classList.add('open');
          else b.classList.remove('open');
        });
        toggleAllBtn.setAttribute('data-state', isCollapsed ? 'expanded' : 'collapsed');
        toggleAllBtn.innerHTML = isCollapsed ? '<span>📍 Collapse All Taming Guides</span>' : '<span>📍 Expand All Taming Guides</span>';
      });
    }

    // Master Hunter Pet Directory Modal Setup & Binding
    setupHunterPetMasterModal();

    // Master Modal Triggers (Buttons with .btn-open-modal-trigger or #btn-open-master-beasts)
    contentContainer.querySelectorAll('#btn-open-master-beasts, .btn-open-modal-trigger').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        if (typeof window.openHunterPetMasterModal === 'function') {
          window.openHunterPetMasterModal('all', currentLevel !== 'all' ? currentLevel : undefined);
        }
      });
    });

    // Subtab switch buttons (e.g. "CLICK HERE TO SEE WHAT'S CHANGED" or "RETURN TO 502 BEASTS")
    contentContainer.querySelectorAll('.btn-switch-pet-tab').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const targetSub = btn.getAttribute('data-target-subtab');
        if (targetSub) {
          selectedDeepDiveSubTab = targetSub;
          renderDeepDiveContent();
          window.scrollTo({ top: contentContainer.offsetTop - 60, behavior: 'smooth' });
        }
      });
    });

    contentContainer.querySelectorAll('.tdh-view-all-modal-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const famName = btn.getAttribute('data-filter-fam');
        if (typeof window.openHunterPetMasterModal === 'function') {
          window.openHunterPetMasterModal(famName || 'all');
        }
      });
    });

    // Smooth scroll for hunter pet quick-nav pills
    contentContainer.querySelectorAll('.pet-nav-pill').forEach(pill => {
      pill.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = pill.getAttribute('href');
        if (targetId) {
          const el = contentContainer.querySelector(targetId);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }
      });
    });
  }

  function setupHunterPetMasterModal() {
    const modal = document.getElementById('hunter-pets-master-modal');
    const closeBtn = document.getElementById('hunter-pets-modal-close');
    const tableContainer = document.getElementById('modal-pet-table-container');
    const searchInput = document.getElementById('modal-pet-search');
    const familySelect = document.getElementById('modal-filter-family');
    const levelSelect = document.getElementById('modal-filter-level');
    const speedSelect = document.getElementById('modal-filter-speed');
    const factionSelect = document.getElementById('modal-filter-faction');
    const abilitySelect = document.getElementById('modal-filter-ability');
    const countBadge = document.getElementById('modal-pet-count-badge');

    if (!modal || !tableContainer) return;

    const petData = (typeof window !== 'undefined' && window.WOW_ATLAS_DATA && window.WOW_ATLAS_DATA.hunterPets) || null;
    const allBeasts = (petData && petData.allBeasts) || [];
    const families = (petData && petData.families) || [];
    const familyIconMap = new Map();
    families.forEach(f => {
      familyIconMap.set(f.name.toLowerCase(), f.icon);
    });

    function renderModalTable() {
      const q = (searchInput?.value || '').trim().toLowerCase();
      const selFam = familySelect?.value || 'all';
      const selLvl = levelSelect?.value || 'all';
      const selSpeed = speedSelect?.value || 'all';
      const selFaction = factionSelect?.value || 'all';
      const selAbility = abilitySelect?.value || 'all';

      const normSelFam = typeof window.normalizePetFamily === 'function' ? window.normalizePetFamily(selFam) : selFam.toLowerCase().replace(/[-_\s]+/g, '');

      const filtered = allBeasts.filter(b => {
        const normFam = typeof window.normalizePetFamily === 'function' ? window.normalizePetFamily(b.family) : (b.family || '').toLowerCase().replace(/[-_\s]+/g, '');
        // Family filter
        if (normSelFam !== 'all' && normFam !== normSelFam) return false;

        // Level filter
        const minL = b.minLevel || 1;
        const maxL = b.maxLevel || 60;
        if (selLvl === '1-9' && (minL > 9 || maxL < 1)) return false;
        if (selLvl === '10-19' && (minL > 19 || maxL < 10)) return false;
        if (selLvl === '20-30' && (minL > 30 || maxL < 20)) return false;
        if (selLvl === '30plus' && maxL < 30) return false;
        if (selLvl === '30-49' && (minL > 49 || maxL < 30)) return false;
        if (selLvl === '50-60' && maxL < 50) return false;

        // Speed filter
        if (selSpeed === 'fast' && !b.isFast) return false;
        if (selSpeed === '1.0' && b.speed !== '1.0s') return false;
        if (selSpeed === '1.2' && b.speed !== '1.2s') return false;
        if (selSpeed === '1.3' && b.speed !== '1.3s') return false;

        // Faction filter
        if (selFaction !== 'all' && b.faction !== selFaction) return false;

        // Ability filter
        if (selAbility === 'teaches' && (!b.teaches || !b.teaches.trim())) return false;
        if (selAbility === 'none' && (b.teaches && b.teaches.trim())) return false;
        if (selAbility !== 'all' && selAbility !== 'teaches' && selAbility !== 'none') {
          if (!b.teaches || !b.teaches.toLowerCase().includes(selAbility.toLowerCase())) return false;
        }

        // Search text
        if (q) {
          const normQ = typeof window.normalizePetFamily === 'function' ? window.normalizePetFamily(q) : q.replace(/[-_\s]+/g, '');
          const matchesFamilyAlias = normQ !== 'all' && normFam === normQ;
          const str = `${b.name} ${b.family} ${b.zone} ${b.subzone || ''} ${b.teaches || ''} ${b.notes || ''}`.toLowerCase();
          if (!matchesFamilyAlias && !str.includes(q)) return false;
        }

        return true;
      });

      if (countBadge) {
        countBadge.textContent = `Showing ${filtered.length} / ${allBeasts.length} Beasts`;
      }

      tableContainer.innerHTML = `
        <table class="pet-master-table">
          <thead>
            <tr>
              <th>Family</th>
              <th>Beast Name</th>
              <th>Level Range</th>
              <th>Speed</th>
              <th>Zone / Subzone</th>
              <th>Faction</th>
              <th>Teaches</th>
              <th>Notes / Beta Tag</th>
            </tr>
          </thead>
          <tbody>
            ${filtered.length === 0 ? `
              <tr>
                <td colspan="8" style="text-align: center; padding: 2rem; color: #94a3b8;">
                  No beasts matched your filter criteria. Try clearing search or selecting All Families.
                </td>
              </tr>
            ` : filtered.map(b => {
              const icon = familyIconMap.get(b.family.toLowerCase()) || 'https://wow.zamimg.com/images/wow/icons/medium/ability_hunter_pet_cat.jpg';
              const zoneText = b.zone || 'WoW Forever Beta Spawn';
              return `
                <tr>
                  <td>
                    <span class="pet-table-fam-badge">
                      <img src="${icon}" alt="${escapeHtml(b.family)}" onerror="this.style.display='none'">
                      <span>${escapeHtml(b.family)}</span>
                    </span>
                  </td>
                  <td>
                    ${b.npcUrl ? `
                      <a href="${escapeHtml(b.npcUrl)}" target="_blank" rel="noopener" style="color: #6ee7b7; font-weight: 700; text-decoration: none; display: inline-flex; align-items: center; gap: 0.25rem;">
                        ${escapeHtml(b.name)} <span style="font-size: 0.65rem; color: #38bdf8;">↗</span>
                      </a>
                    ` : `
                      <strong style="color: #fff;">${escapeHtml(b.name)}</strong>
                    `}
                  </td>
                  <td>
                    <span class="tbr-level">Lvl ${escapeHtml(b.level)}</span>
                  </td>
                  <td>
                    <span class="tbr-speed ${b.isFast ? 'fast' : ''}">${b.isFast ? '⚡ ' : ''}${escapeHtml(b.speed)}</span>
                  </td>
                  <td>
                    <span style="color: #cbd5e1; font-weight: 600;">📍 ${escapeHtml(zoneText)}</span>
                    ${b.subzone ? `<span style="font-size: 0.74rem; color: #94a3b8; display: block;">${escapeHtml(b.subzone)}</span>` : ''}
                  </td>
                  <td>
                    <span class="tbr-faction ${escapeHtml(b.faction)}">${escapeHtml(b.faction)}</span>
                  </td>
                  <td>
                    ${b.teaches ? `
                      <span style="color: #fcd34d; font-size: 0.78rem; font-weight: 600; display: inline-flex; align-items: center; gap: 0.25rem;">
                        <span>📖</span> <span>${escapeHtml(b.teaches)}</span>
                      </span>
                    ` : `
                      <span class="pet-untaught-badge" title="No innate ability taught upon tame. Learn skills from other beasts or trainers to train this pet.">
                        <span style="opacity: 0.5;">⚪</span> <span>Untaught</span>
                      </span>
                    `}
                  </td>
                  <td>
                    ${b.isNew ? '<span class="deepdive-badge badge-exclusive" style="font-size: 0.65rem; margin-right: 0.3rem;">✦ New in Forever</span>' : ''}
                    <span style="font-size: 0.74rem; color: #94a3b8;">${escapeHtml(b.notes || '')}</span>
                  </td>
                </tr>
              `;
            }).join('')}
          </tbody>
        </table>
      `;
    }

    window.openHunterPetMasterModal = function(initialFamily, initialLevelOrSpeed) {
      modal.removeAttribute('hidden');
      modal.classList.add('open');
      if (initialFamily && familySelect) {
        const normInit = typeof window.normalizePetFamily === 'function' ? window.normalizePetFamily(initialFamily) : initialFamily.toLowerCase().replace(/[-_\s]+/g, '');
        let matched = false;
        for (let i = 0; i < familySelect.options.length; i++) {
          const opt = familySelect.options[i];
          const normVal = typeof window.normalizePetFamily === 'function' ? window.normalizePetFamily(opt.value) : opt.value.toLowerCase().replace(/[-_\s]+/g, '');
          if (normVal === normInit) {
            familySelect.selectedIndex = i;
            matched = true;
            break;
          }
        }
        if (!matched) {
          familySelect.value = initialFamily;
        }
      }
      if (initialLevelOrSpeed) {
        if (initialLevelOrSpeed === 'fast') {
          if (speedSelect) speedSelect.value = 'fast';
        } else if (levelSelect) {
          levelSelect.value = initialLevelOrSpeed;
        }
      }
      renderModalTable();
    };

    function closeModal() {
      modal.classList.remove('open');
      modal.setAttribute('hidden', '');
    }

    if (closeBtn) closeBtn.onclick = closeModal;
    modal.onclick = (e) => {
      if (e.target === modal) closeModal();
    };

    [searchInput, familySelect, levelSelect, speedSelect, factionSelect, abilitySelect].forEach(el => {
      if (el) {
        el.oninput = renderModalTable;
        el.onchange = renderModalTable;
      }
    });
  }

  function renderDeepDiveSubTabBody(cData, subtab) {
    if (subtab === 'betaBuilds' && cData.betaBuilds) {
      return renderBetaBuildsSection(cData);
    } else if (subtab === 'core') {
      return renderCoreRulesSection(cData);
    } else if (subtab === 'matrix') {
      return renderForensicMatrixSection(cData);
    } else if (subtab === 'survival' && cData.survival) {
      return renderSurvivalSection(cData);
    } else if (subtab === 'marksmanship' && cData.marksmanship) {
      return renderMarksmanshipSection(cData);
    } else if (subtab === 'beastmastery' && cData.beastMastery) {
      return renderBeastMasterySection(cData);
    } else if (subtab === 'pets' && cData.id === 'hunter') {
      return renderHunterPetStable(cData);
    } else if (subtab === 'petchanges' && cData.id === 'hunter') {
      return renderHunterPetChangesPage(cData);
    } else if (subtab === 'tauren' && cData.racialSynergies) {
      return renderTaurenRacesSection(cData);
    } else if (subtab === 'enhancement' && cData.enhancement) {
      return renderEnhancementSection(cData);
    } else if (subtab === 'tanking' && cData.tanking) {
      return renderShamanTankingSection(cData);
    } else if (subtab === 'elemental' && cData.elemental) {
      return renderElementalSection(cData);
    } else if (subtab === 'restoration' && cData.id === 'shaman' && cData.restoration) {
      return renderRestorationSection(cData);
    } else if (subtab === 'racials' && cData.id === 'shaman') {
      return renderDwarfRacesSection(cData);
    } else if (subtab === 'arcane' && cData.arcane) {
      return renderArcaneSection(cData);
    } else if (subtab === 'fire' && cData.fire) {
      return renderFireSection(cData);
    } else if (subtab === 'frost' && cData.frost) {
      return renderFrostSection(cData);
    } else if (subtab === 'racials' && cData.id === 'mage') {
      return renderOrcMageRacesSection(cData);
    } else if (subtab === 'holy' && cData.id === 'paladin' && cData.holy) {
      return renderHolyPaladinSection(cData);
    } else if (subtab === 'protection' && cData.id === 'paladin' && cData.protection) {
      return renderProtectionPaladinSection(cData);
    } else if (subtab === 'retribution' && cData.retribution) {
      return renderRetributionPaladinSection(cData);
    } else if (subtab === 'undead' && cData.id === 'paladin') {
      return renderUndeadPaladinRacesSection(cData);
    } else if (subtab === 'arms' && cData.arms) {
      return renderArmsWarriorSection(cData);
    } else if (subtab === 'fury' && cData.fury) {
      return renderFuryWarriorSection(cData);
    } else if (subtab === 'protection' && cData.id === 'warrior' && cData.protection) {
      return renderProtectionWarriorSection(cData);
    } else if (subtab === 'human' && cData.id === 'warrior') {
      return renderHumanWarriorRacesSection(cData);
    } else if (subtab === 'affliction' && cData.affliction) {
      return renderAfflictionWarlockSection(cData);
    } else if (subtab === 'demonology' && cData.demonology) {
      return renderDemonologyWarlockSection(cData);
    } else if (subtab === 'destruction' && cData.destruction) {
      return renderDestructionWarlockSection(cData);
    } else if (subtab === 'gnome' && cData.id === 'warlock') {
      return renderGnomeWarlockRacesSection(cData);
    } else if (subtab === 'discipline' && cData.discipline) {
      return renderDisciplinePriestSection(cData);
    } else if (subtab === 'holy' && cData.id === 'priest' && cData.holy) {
      return renderHolyPriestSection(cData);
    } else if (subtab === 'shadow' && cData.shadow) {
      return renderShadowPriestSection(cData);
    } else if (subtab === 'nightelf' && cData.id === 'priest') {
      return renderNightElfPriestRacesSection(cData);
    } else if (subtab === 'balance' && cData.balance) {
      return renderBalanceDruidSection(cData);
    } else if (subtab === 'feral' && cData.feral) {
      return renderFeralDruidSection(cData);
    } else if (subtab === 'restoration' && cData.id === 'druid' && cData.restoration) {
      return renderRestorationDruidSection(cData);
    } else if (subtab === 'skyelf' && cData.id === 'druid') {
      return renderSkyElfDruidRacesSection(cData);
    } else if (subtab === 'assassination' && cData.assassination) {
      return renderAssassinationRogueSection(cData);
    } else if (subtab === 'combat' && cData.combat) {
      return renderCombatRogueSection(cData);
    } else if (subtab === 'subtlety' && cData.subtlety) {
      return renderSubtletyRogueSection(cData);
    } else if (subtab === 'troll' && cData.id === 'rogue') {
      return renderTrollRogueRacesSection(cData);
    } else {
      // 'overview' - Render complete dossier
      if (cData.id === 'hunter') {
        return `
          <div class="deepdive-dossier-wrapper">
            <div class="dossier-section-block">
              <div class="dossier-block-header">
                <h3><span>📜</span> 1. Core Hunter Rules & Quality of Life</h3>
                <p>Fundamental gameplay systems, trap mechanics, resource handling, and baseline adjustments</p>
              </div>
              ${renderCoreRulesSection(cData)}
            </div>

            <div class="dossier-section-block">
              <div class="dossier-block-header">
                <h3><span>⚔️</span> 2. Survival: The Melee & Trap Vanguard</h3>
                <p>${escapeHtml(cData.survival.tagline)}</p>
              </div>
              ${renderSurvivalSection(cData)}
            </div>

            <div class="dossier-section-block">
              <div class="dossier-block-header">
                <h3><span>🏹</span> 3. Marksmanship: Precision Sniper & Lone Wolf</h3>
                <p>${escapeHtml(cData.marksmanship.tagline)}</p>
              </div>
              ${renderMarksmanshipSection(cData)}
            </div>

            <div class="dossier-section-block">
              <div class="dossier-block-header">
                <h3><span>🐾</span> 4. Beast Mastery: Beast Commander</h3>
                <p>${escapeHtml(cData.beastMastery.tagline)}</p>
              </div>
              ${renderBeastMasterySection(cData)}
            </div>

            <div class="dossier-section-block">
              <div class="dossier-block-header">
                <h3><span>🐾</span> 5. Pet Stable & Beast Abilities Matrix</h3>
                <p>18 pet families, the new Fox family, 9 reworked/new beast abilities, and swing speed inheritances</p>
              </div>
              ${renderHunterPetStable(cData)}
            </div>

            <div class="dossier-section-block">
              <div class="dossier-block-header">
                <h3><span>🐂</span> 6. Sodapoppin's Tauren Testing & New Playable Races</h3>
                <p>Empirical in-game speed tests, herb harvest duplication, and new faction race combinations</p>
              </div>
              ${renderTaurenRacesSection(cData)}
            </div>

            <div class="dossier-section-block">
              <div class="dossier-block-header">
                <h3><span>🔬</span> 7. Forensics & Verification Matrix</h3>
                <p>Cross-referenced validation of all claims from BlizzCon hands-on demo against WoW: Forever closed beta</p>
              </div>
              ${renderForensicMatrixSection(cData)}
            </div>
          </div>
        `;
      } else if (cData.id === 'shaman') {
        return `
          <div class="deepdive-dossier-wrapper">
            <div class="dossier-section-block">
              <div class="dossier-block-header">
                <h3><span>📜</span> 1. Core Shaman Rules & Totemic Systems</h3>
                <p>Call of the Ancestors 4-totem dropping, 60-minute imbues, indoor Ghost Wolf, and reagent-free Reincarnation</p>
              </div>
              ${renderCoreRulesSection(cData)}
            </div>

            <div class="dossier-section-block">
              <div class="dossier-block-header">
                <h3><span>⚡</span> 2. Enhancement: The Thunderous Melee & Spellhance Striker</h3>
                <p>${escapeHtml(cData.enhancement.tagline)}</p>
              </div>
              ${renderEnhancementSection(cData)}
            </div>

            <div class="dossier-section-block">
              <div class="dossier-block-header">
                <h3><span>🛡️</span> 3. Tanking Tools & Dungeon Off-Tank Viability</h3>
                <p>${escapeHtml(cData.tanking.tagline)}</p>
              </div>
              ${renderShamanTankingSection(cData)}
            </div>

            <div class="dossier-section-block">
              <div class="dossier-block-header">
                <h3><span>🔥</span> 4. Elemental: Fury of the Storm & Lava</h3>
                <p>${escapeHtml(cData.elemental.tagline)}</p>
              </div>
              ${renderElementalSection(cData)}
            </div>

            <div class="dossier-section-block">
              <div class="dossier-block-header">
                <h3><span>💧</span> 5. Restoration: Tides of Healing & Water Shield</h3>
                <p>${escapeHtml(cData.restoration.tagline)}</p>
              </div>
              ${renderRestorationSection(cData)}
            </div>

            <div class="dossier-section-block">
              <div class="dossier-block-header">
                <h3><span>⛏️</span> 6. Sodapoppin's Dwarf Shaman Testing & New Faction Races</h3>
                <p>Stoneform, Mace Spec +1% spell/attack crit, and Wildhammer Dwarves bringing Windfury to Alliance</p>
              </div>
              ${renderDwarfRacesSection(cData)}
            </div>

            <div class="dossier-section-block">
              <div class="dossier-block-header">
                <h3><span>🔬</span> 7. Forensics & Verification Matrix</h3>
                <p>Cross-referenced validation of all Shaman claims from BlizzCon hands-on demo against WoW: Forever closed beta</p>
              </div>
              ${renderForensicMatrixSection(cData)}
            </div>
          </div>
        `;
      } else if (cData.id === 'mage') {
        return `
          <div class="deepdive-dossier-wrapper">
            <div class="dossier-section-block">
              <div class="dossier-block-header">
                <h3><span>📜</span> 1. Core Mage Rules & Systems</h3>
                <p>Downranking, dual-school Frostfire Bolt, Comprehend Scroll, and rebalanced uncapped Blizzard AoE</p>
              </div>
              ${renderCoreRulesSection(cData)}
            </div>

            <div class="dossier-section-block">
              <div class="dossier-block-header">
                <h3><span>✨</span> 2. Arcane: High-Risk Mana Burn & Missile Barrage</h3>
                <p>${escapeHtml(cData.arcane.tagline)}</p>
              </div>
              ${renderArcaneSection(cData)}
            </div>

            <div class="dossier-section-block">
              <div class="dossier-block-header">
                <h3><span>🔥</span> 3. Fire: Explosive Ignite & Hot Streak Pyroblasts</h3>
                <p>${escapeHtml(cData.fire.tagline)}</p>
              </div>
              ${renderFireSection(cData)}
            </div>

            <div class="dossier-section-block">
              <div class="dossier-block-header">
                <h3><span>❄️</span> 4. Frost: Ice Lance Burst, Fingers of Frost & Controlled AoE</h3>
                <p>${escapeHtml(cData.frost.tagline)}</p>
              </div>
              ${renderFrostSection(cData)}
            </div>

            <div class="dossier-section-block">
              <div class="dossier-block-header">
                <h3><span>🪓</span> 5. Sodapoppin's Orc Mage Testing & New Faction Races</h3>
                <p>Hardiness stun reduction, Blood Fury +10% Spell Power (no heal penalty), and Durotar ley line masters</p>
              </div>
              ${renderOrcMageRacesSection(cData)}
            </div>

            <div class="dossier-section-block">
              <div class="dossier-block-header">
                <h3><span>🔬</span> 6. Forensics & Verification Matrix</h3>
                <p>Cross-referenced validation of all Mage claims from BlizzCon hands-on demo against WoW: Forever closed beta</p>
              </div>
              ${renderForensicMatrixSection(cData)}
            </div>
          </div>
        `;
      } else if (cData.id === 'paladin') {
        return `
          <div class="deepdive-dossier-wrapper">
            <div class="dossier-section-block">
              <div class="dossier-block-header">
                <h3><span>📜</span> 1. Core Paladin Rules & Systems</h3>
                <p>60-minute Blessings, baseline Holy Strike, semi-capped Consecration, and level-40 Cleanse progression</p>
              </div>
              ${renderCoreRulesSection(cData)}
            </div>

            <div class="dossier-section-block">
              <div class="dossier-block-header">
                <h3><span>✨</span> 2. Holy: Light's Vigil, Party AoE Healing & Instant Holy Shock</h3>
                <p>${escapeHtml(cData.holy.tagline)}</p>
              </div>
              ${renderHolyPaladinSection(cData)}
            </div>

            <div class="dossier-section-block">
              <div class="dossier-block-header">
                <h3><span>🛡️</span> 3. Protection: Seal of Fury Taunt, Block Mana & Templar's Bulwark</h3>
                <p>${escapeHtml(cData.protection.tagline)}</p>
              </div>
              ${renderProtectionPaladinSection(cData)}
            </div>

            <div class="dossier-section-block">
              <div class="dossier-block-header">
                <h3><span>⚔️</span> 4. Retribution: Twist of Light, Sacred Arbiter & Hybrid Power</h3>
                <p>${escapeHtml(cData.retribution.tagline)}</p>
              </div>
              ${renderRetributionPaladinSection(cData)}
            </div>

            <div class="dossier-section-block">
              <div class="dossier-block-header">
                <h3><span>💀</span> 5. Sodapoppin's Undead Paladin Testing & New Faction Races</h3>
                <p>Cannibalize (7% HP/Mana), Touch of the Grave drain, and the Horde's first Paladin with the Forsaken Charger mount</p>
              </div>
              ${renderUndeadPaladinRacesSection(cData)}
            </div>

            <div class="dossier-section-block">
              <div class="dossier-block-header">
                <h3><span>🔬</span> 6. Forensics & Verification Matrix</h3>
                <p>Cross-referenced validation of all Paladin claims from BlizzCon hands-on demo against WoW: Forever closed beta</p>
              </div>
              ${renderForensicMatrixSection(cData)}
            </div>
          </div>
        `;
      } else if (cData.id === 'warrior') {
        return `
          <div class="deepdive-dossier-wrapper">
            <div class="dossier-section-block">
              <div class="dossier-block-header">
                <h3><span>📜</span> 1. Core Warrior Rules & Baseline Systems</h3>
                <p>Baseline Tactical Mastery (10 Rage), Victory Rush sustain, 3-minute shouts, and 15-minute Retaliation</p>
              </div>
              ${renderCoreRulesSection(cData)}
            </div>

            <div class="dossier-section-block">
              <div class="dossier-block-header">
                <h3><span>🗡️</span> 2. Arms: Spearing Strike, Unified Weaponmaster & Slam Flow</h3>
                <p>${escapeHtml(cData.arms.tagline)}</p>
              </div>
              ${renderArmsWarriorSection(cData)}
            </div>

            <div class="dossier-section-block">
              <div class="dossier-block-header">
                <h3><span>⚡</span> 3. Fury: Raging Blows, Dual-Wield Scaling & Berserker Rage</h3>
                <p>${escapeHtml(cData.fury.tagline)}</p>
              </div>
              ${renderFuryWarriorSection(cData)}
            </div>

            <div class="dossier-section-block">
              <div class="dossier-block-header">
                <h3><span>🛡️</span> 4. Protection: Defensive Charge, Shield Bash Silence & 9.5m Shield Wall</h3>
                <p>${escapeHtml(cData.protection.tagline)}</p>
              </div>
              ${renderProtectionWarriorSection(cData)}
            </div>

            <div class="dossier-section-block">
              <div class="dossier-block-header">
                <h3><span>👑</span> 5. Sodapoppin's Human Warrior Testing & Playable Races</h3>
                <p>Will to Survive stun break, Sword Specialization (+2% crit), Perception stealth detection, and cross-faction vanguards</p>
              </div>
              ${renderHumanWarriorRacesSection(cData)}
            </div>

            <div class="dossier-section-block">
              <div class="dossier-block-header">
                <h3><span>🔬</span> 6. Forensics & Verification Matrix</h3>
                <p>Cross-referenced validation of all Warrior claims from BlizzCon hands-on demo against WoW: Forever closed beta</p>
              </div>
              ${renderForensicMatrixSection(cData)}
            </div>
          </div>
        `;
      } else if (cData.id === 'warlock') {
        return `
          <div class="deepdive-dossier-wrapper">
            <div class="dossier-section-block">
              <div class="dossier-block-header">
                <h3><span>📜</span> 1. Core Warlock Rules & Demon Stones</h3>
                <p>Modernized Firestone & Spellstone, 0-shard Demonic Sacrifice, Bane rules, and Soul Shard economy</p>
              </div>
              ${renderCoreRulesSection(cData)}
            </div>

            <div class="dossier-section-block">
              <div class="dossier-block-header">
                <h3><span>💀</span> 2. Affliction: Pandemic Critical DoTs, Drain Hope & Soul Harvest</h3>
                <p>${escapeHtml(cData.affliction.tagline)}</p>
              </div>
              ${renderAfflictionWarlockSection(cData)}
            </div>

            <div class="dossier-section-block">
              <div class="dossier-block-header">
                <h3><span>😈</span> 3. Demonology: Demonic Pact, Dual-Pet Synergy & SL/SL Viability</h3>
                <p>${escapeHtml(cData.demonology.tagline)}</p>
              </div>
              ${renderDemonologyWarlockSection(cData)}
            </div>

            <div class="dossier-section-block">
              <div class="dossier-block-header">
                <h3><span>🔥</span> 4. Destruction: Bane of Havoc, Shadow & Flame Weaving & Incinerate</h3>
                <p>${escapeHtml(cData.destruction.tagline)}</p>
              </div>
              ${renderDestructionWarlockSection(cData)}
            </div>

            <div class="dossier-section-block">
              <div class="dossier-block-header">
                <h3><span>⚙️</span> 5. Sodapoppin's Gnome Warlock Testing & Playable Races</h3>
                <p>Escape Artist snare immunity, -50% mana burst racial, Gnomish Ingenuity, and cross-faction fel scholars</p>
              </div>
              ${renderGnomeWarlockRacesSection(cData)}
            </div>

            <div class="dossier-section-block">
              <div class="dossier-block-header">
                <h3><span>🔬</span> 6. Forensics & Verification Matrix</h3>
                <p>Cross-referenced validation of all Warlock claims from BlizzCon hands-on demo against WoW: Forever closed beta</p>
              </div>
              ${renderForensicMatrixSection(cData)}
            </div>
          </div>
        `;
      } else if (cData.id === 'priest') {
        return `
          <div class="deepdive-dossier-wrapper">
            <div class="dossier-section-block">
              <div class="dossier-block-header">
                <h3><span>📜</span> 1. Core Priest Rules & Shared Spells</h3>
                <p>Universal Devouring Plague & Fear Ward, baseline Divine Spirit, and critical-strike DoTs</p>
              </div>
              ${renderCoreRulesSection(cData)}
            </div>

            <div class="dossier-section-block">
              <div class="dossier-block-header">
                <h3><span>🛡️</span> 2. Discipline: Penance, Soul Warding & Divine Aegis</h3>
                <p>${escapeHtml(cData.discipline.tagline)}</p>
              </div>
              ${renderDisciplinePriestSection(cData)}
            </div>

            <div class="dossier-section-block">
              <div class="dossier-block-header">
                <h3><span>✨</span> 3. Holy: Prayer of Mending, Litany of Light & Spirit Scaling</h3>
                <p>${escapeHtml(cData.holy.tagline)}</p>
              </div>
              ${renderHolyPriestSection(cData)}
            </div>

            <div class="dossier-section-block">
              <div class="dossier-block-header">
                <h3><span>🌑</span> 4. Shadow: Shadowform 50% Mana, Devouring Plague & Vampiric Embrace</h3>
                <p>${escapeHtml(cData.shadow.tagline)}</p>
              </div>
              ${renderShadowPriestSection(cData)}
            </div>

            <div class="dossier-section-block">
              <div class="dossier-block-header">
                <h3><span>🌙</span> 5. Sodapoppin's Night Elf Priest Testing & Playable Races</h3>
                <p>In-combat Shadowmeld threat dropping, Elune's Light (+10% crit burst), Elune's Grace, and cross-faction clergy</p>
              </div>
              ${renderNightElfPriestRacesSection(cData)}
            </div>

            <div class="dossier-section-block">
              <div class="dossier-block-header">
                <h3><span>🔬</span> 6. Forensics & Verification Matrix</h3>
                <p>Cross-referenced validation of all Priest claims from BlizzCon hands-on demo against WoW: Forever closed beta</p>
              </div>
              ${renderForensicMatrixSection(cData)}
            </div>
          </div>
        `;
      } else if (cData.id === 'druid') {
        return `
          <div class="deepdive-dossier-wrapper">
            <div class="dossier-section-block">
              <div class="dossier-block-header">
                <h3><span>📜</span> 1. Core Druid Rules & Shifting Systems</h3>
                <p>Baseline Omen of Clarity & Nature's Grasp, Revive resurrection, smooth energy, and Furor power-shifting overhaul</p>
              </div>
              ${renderCoreRulesSection(cData)}
            </div>

            <div class="dossier-section-block">
              <div class="dossier-block-header">
                <h3><span>🌙</span> 2. Balance: Eclipse Charges, Balance of Nature & Moonkin Form</h3>
                <p>${escapeHtml(cData.balance.tagline)}</p>
              </div>
              ${renderBalanceDruidSection(cData)}
            </div>

            <div class="dossier-section-block">
              <div class="dossier-block-header">
                <h3><span>🐾</span> 3. Feral: King of the Jungle, Cat Feral Charge & Bear Defense Scaling</h3>
                <p>${escapeHtml(cData.feral.tagline)}</p>
              </div>
              ${renderFeralDruidSection(cData)}
            </div>

            <div class="dossier-section-block">
              <div class="dossier-block-header">
                <h3><span>🌱</span> 4. Restoration: Wild Growth, Swiftmend & 0.5s GCD Reduction</h3>
                <p>${escapeHtml(cData.restoration.tagline)}</p>
              </div>
              ${renderRestorationDruidSection(cData)}
            </div>

            <div class="dossier-section-block">
              <div class="dossier-block-header">
                <h3><span>🪶</span> 5. Sodapoppin's Sky Elf Druid Testing & Playable Races</h3>
                <p>Walk on Air 10s glide, Wind Blessed (+10% speed / +1% haste), unique avian shapeshift forms, and faction choices</p>
              </div>
              ${renderSkyElfDruidRacesSection(cData)}
            </div>

            <div class="dossier-section-block">
              <div class="dossier-block-header">
                <h3><span>🔬</span> 6. Forensics & Verification Matrix</h3>
                <p>Cross-referenced validation of all Druid claims from BlizzCon hands-on demo against WoW: Forever closed beta</p>
              </div>
              ${renderForensicMatrixSection(cData)}
            </div>
          </div>
        `;
      } else if (cData.id === 'rogue') {
        return `
          <div class="deepdive-dossier-wrapper">
            <div class="dossier-section-block">
              <div class="dossier-block-header">
                <h3><span>📜</span> 1. Core Rogue Rules & Control Toolkit</h3>
                <p>AP and critical poison scaling, Blind poison classification, absence of Cloak of Shadows, and stealth bonuses</p>
              </div>
              ${renderCoreRulesSection(cData)}
            </div>

            <div class="dossier-section-block">
              <div class="dossier-block-header">
                <h3><span>🩸</span> 2. Assassination: Daggerless Mutilate & Crit Poisons</h3>
                <p>${escapeHtml(cData.assassination.tagline)}</p>
              </div>
              ${renderAssassinationRogueSection(cData)}
            </div>

            <div class="dossier-section-block">
              <div class="dossier-block-header">
                <h3><span>⚔️</span> 3. Combat: Restless Blades Cooldown Cycling & Cleave</h3>
                <p>${escapeHtml(cData.combat.tagline)}</p>
              </div>
              ${renderCombatRogueSection(cData)}
            </div>

            <div class="dossier-section-block">
              <div class="dossier-block-header">
                <h3><span>👤</span> 4. Subtlety: Thousand Cuts Rupture Engine</h3>
                <p>${escapeHtml(cData.subtlety.tagline)}</p>
              </div>
              ${renderSubtletyRogueSection(cData)}
            </div>

            <div class="dossier-section-block">
              <div class="dossier-block-header">
                <h3><span>🏹</span> 5. Sodapoppin's Troll Testing & Playable Races</h3>
                <p>Flat 10% Berserking, 50% HP active regeneration channel, Beast Slaying, and in-combat regeneration</p>
              </div>
              ${renderTrollRogueRacesSection(cData)}
            </div>

            <div class="dossier-section-block">
              <div class="dossier-block-header">
                <h3><span>🔬</span> 6. Forensics & Verification Matrix</h3>
                <p>Cross-referenced validation of all Rogue claims from BlizzCon hands-on demo against WoW: Forever closed beta</p>
              </div>
              ${renderForensicMatrixSection(cData)}
            </div>
          </div>
        `;
      }
      return '';
    }
  }

  function renderCoreRulesSection(cData) {
    return `
      <div class="deepdive-cards-grid">
        ${cData.coreRules.map(rule => `
          <div class="deepdive-rule-card">
            <div class="rule-card-header">
              <strong class="rule-card-title">${escapeHtml(rule.title)}</strong>
              <span class="deepdive-badge ${rule.status === 'exclusive' ? 'badge-exclusive' : 'badge-verified'}">
                ${escapeHtml(rule.statusLabel)}
              </span>
            </div>
            <span class="rule-card-badge">${escapeHtml(rule.badge)}</span>
            <p class="rule-card-desc">${escapeHtml(rule.desc)}</p>
          </div>
        `).join('')}
      </div>
    `;
  }

  function renderSurvivalSection(cData) {
    return `
      <div>
        <div class="spec-overview-banner">
          <div>
            <h4 style="color: #abd473; font-size: 1.25rem; margin: 0 0 0.25rem;">${escapeHtml(cData.survival.title)}</h4>
            <p style="font-size: 0.9rem; color: #cbd5e1; margin: 0;">${escapeHtml(cData.survival.tagline)}</p>
          </div>
          <span class="status-badge-highlight" style="background: rgba(171, 212, 115, 0.15); border-color: #abd473; color: #d9f99d;">
            Melee Viability Achieved
          </span>
        </div>

        <!-- Survival Talents Grid -->
        <div class="deepdive-talents-grid">
          ${cData.survival.talents.map(t => `
            <div class="talent-feature-card ${t.name === 'Strider Kick' ? 'featured-talent' : ''}">
              <div class="talent-card-top">
                <div>
                  <strong class="talent-name" style="color: ${t.name === 'Strider Kick' ? '#f5d061' : '#fff'};">${escapeHtml(t.name)}</strong>
                  <span class="talent-type">${escapeHtml(t.type)}</span>
                </div>
                <span class="deepdive-badge badge-verified"><span>✓</span> Verified</span>
              </div>
              <div class="talent-specs-chips">
                ${t.cast ? `<span class="talent-chip">⏱️ ${escapeHtml(t.cast)}</span>` : ''}
                ${t.cd ? `<span class="talent-chip">⌛ ${escapeHtml(t.cd)}</span>` : ''}
                ${t.cost ? `<span class="talent-chip">💧 ${escapeHtml(t.cost)}</span>` : ''}
                ${t.duration ? `<span class="talent-chip">⏳ ${escapeHtml(t.duration)}</span>` : ''}
              </div>
              <p class="talent-desc">${escapeHtml(t.desc)}</p>
            </div>
          `).join('')}
        </div>

        <!-- Melee Hunter Baseline Toolkit Box -->
        <div class="melee-toolkit-box" style="margin-top: 1.5rem;">
          <h4 style="color: var(--text-gold); font-size: 1.05rem; margin-bottom: 0.8rem; display: flex; align-items: center; gap: 0.5rem;">
            <span>🗡️</span> Melee Hunter Baseline Tools & Pet Interaction
          </h4>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1rem;">
            ${cData.meleeToolkit.map(tool => `
              <div style="background: rgba(0,0,0,0.35); padding: 0.8rem 1rem; border-radius: var(--radius-sm); border-left: 3px solid #abd473;">
                <strong style="color: #fff; font-size: 0.95rem;">${escapeHtml(tool.name)}</strong>
                <p style="font-size: 0.84rem; color: #cbd5e1; margin: 0.3rem 0 0; line-height: 1.4;">${escapeHtml(tool.desc)}</p>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  }

  function renderMarksmanshipSection(cData) {
    return `
      <div>
        <div class="spec-overview-banner">
          <div>
            <h4 style="color: #60a5fa; font-size: 1.25rem; margin: 0 0 0.25rem;">${escapeHtml(cData.marksmanship.title)}</h4>
            <p style="font-size: 0.9rem; color: #cbd5e1; margin: 0;">${escapeHtml(cData.marksmanship.tagline)}</p>
          </div>
          <span class="status-badge-highlight" style="background: rgba(96, 165, 250, 0.15); border-color: #60a5fa; color: #93c5fd;">
            Lone Wolf & Heavy Burst
          </span>
        </div>

        <div class="deepdive-talents-grid">
          ${cData.marksmanship.talents.map(t => `
            <div class="talent-feature-card ${t.name === 'Lone Wolf' || t.name === 'Sniper Shot' ? 'featured-talent' : ''}">
              <div class="talent-card-top">
                <div>
                  <strong class="talent-name" style="color: ${t.name === 'Lone Wolf' ? '#60a5fa' : t.name === 'Sniper Shot' ? '#f5d061' : '#fff'};">${escapeHtml(t.name)}</strong>
                  <span class="talent-type">${escapeHtml(t.type)}</span>
                </div>
                <span class="deepdive-badge badge-verified"><span>✓</span> Verified</span>
              </div>
              <div class="talent-specs-chips">
                ${t.cast ? `<span class="talent-chip">⏱️ ${escapeHtml(t.cast)}</span>` : ''}
                ${t.cd ? `<span class="talent-chip">⌛ ${escapeHtml(t.cd)}</span>` : ''}
                ${t.range ? `<span class="talent-chip">🎯 ${escapeHtml(t.range)}</span>` : ''}
                ${t.duration ? `<span class="talent-chip">⏳ ${escapeHtml(t.duration)}</span>` : ''}
              </div>
              <p class="talent-desc">${escapeHtml(t.desc)}</p>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  function renderBeastMasterySection(cData) {
    return `
      <div>
        <div class="spec-overview-banner">
          <div>
            <h4 style="color: #f59e0b; font-size: 1.25rem; margin: 0 0 0.25rem;">${escapeHtml(cData.beastMastery.title)}</h4>
            <p style="font-size: 0.9rem; color: #cbd5e1; margin: 0;">${escapeHtml(cData.beastMastery.tagline)}</p>
          </div>
          <span class="status-badge-highlight" style="background: rgba(245, 158, 11, 0.15); border-color: #f59e0b; color: #fcd34d;">
            Multi-Pet Command
          </span>
        </div>

        <div class="deepdive-talents-grid">
          ${cData.beastMastery.talents.map(t => `
            <div class="talent-feature-card ${t.name === 'Summon Hawk' || t.name.includes('Enrage') ? 'featured-talent' : ''}">
              <div class="talent-card-top">
                <div>
                  <strong class="talent-name" style="color: ${t.name === 'Summon Hawk' ? '#f5d061' : '#fff'};">${escapeHtml(t.name)}</strong>
                  <span class="talent-type">${escapeHtml(t.type)}</span>
                </div>
                <span class="deepdive-badge badge-verified"><span>✓</span> Verified</span>
              </div>
              <div class="talent-specs-chips">
                ${t.cast ? `<span class="talent-chip">⏱️ ${escapeHtml(t.cast)}</span>` : ''}
                ${t.cd ? `<span class="talent-chip">⌛ ${escapeHtml(t.cd)}</span>` : ''}
                ${t.duration ? `<span class="talent-chip">⏳ ${escapeHtml(t.duration)}</span>` : ''}
              </div>
              <p class="talent-desc">${escapeHtml(t.desc)}</p>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  function renderHunterPetChangesPage(cData) {
    const changes = (cData && cData.petChanges) || {};

    const newAbilities = changes.newAbilities || [
      {
        family: "Bat",
        icon: "https://wow.zamimg.com/images/wow/icons/medium/ability_vehicle_sonicshockwave.jpg",
        name: "Sonic Blast",
        rank: "Rank 2",
        desc: "Emits a piercing shriek, inflicting 33 to 39 Nature damage and increasing the casting time of all spells by 60% for 30 sec.",
        cost: "80 Focus",
        cd: "30 sec cooldown"
      },
      {
        family: "Bear",
        icon: "https://wow.zamimg.com/images/wow/icons/medium/inv_misc_monsterclaw_03.jpg",
        name: "Swipe",
        rank: "Rank 2",
        desc: "Swipe 3 nearby enemies, inflicting 8 to 10 damage.",
        cost: "20 Focus",
        cd: "5 sec cooldown"
      },
      {
        family: "Bird of Prey",
        familyNote: "Owl in Classic",
        icon: "https://wow.zamimg.com/images/wow/icons/medium/spell_nature_natureswrath.jpg",
        name: "Mine!",
        rank: "Rank 3",
        desc: "Grabs an enemy's weapon with its talons, causing 20 to 24 damage and disarming them for 4 sec.",
        cost: "20 Focus",
        cd: "1 min cooldown"
      },
      {
        family: "Crab",
        icon: "https://wow.zamimg.com/images/wow/icons/medium/ability_hunter_pet_crab.jpg",
        name: "Pinch",
        rank: "Rank 2",
        desc: "Pinches an enemy's legs for 32 to 36 damage and reduces movement speed by 50% for 9 sec.",
        cost: "50 Focus",
        cd: "30 sec cooldown"
      },
      {
        family: "Crocolisk",
        icon: "https://wow.zamimg.com/images/wow/icons/medium/ability_hunter_pet_crocolisk.jpg",
        name: "Dismember",
        rank: "Rank 2",
        desc: "Viciously bites enemy appendages for 18 to 20 damage and reduces the effectiveness of any healing by 50% for 10 sec.",
        cost: "35 Focus",
        cd: "6 sec cooldown"
      },
      {
        family: "Fox",
        familyNote: "New Family",
        icon: "https://wow.zamimg.com/images/wow/icons/medium/ability_hunter_aspectofthefox.jpg",
        name: "Trickster's Dance",
        rank: "Rank 1",
        desc: "Increases your pet's chance to Dodge by 50% and decreases the time between your pet's attacks by 30% for 12 sec.",
        cost: "10 Focus",
        cd: "3 min cooldown"
      },
      {
        family: "Hyena",
        icon: "https://wow.zamimg.com/images/wow/icons/medium/ability_hunter_pet_hyena.jpg",
        name: "Tendon Rip",
        rank: "Rank 2",
        desc: "Tears at an enemy's legs for 21 damage over 9 sec and reduces movement speed by 50% for 9 sec.",
        cost: "25 Focus",
        cd: "30 sec cooldown"
      },
      {
        family: "Raptor",
        icon: "https://wow.zamimg.com/images/wow/icons/medium/ability_hunter_pet_raptor.jpg",
        name: "Savage Rend",
        rank: "Rank 2",
        desc: "Slash an enemy with razor talons, causing the target to Bleed for 54 damage over 18 sec.",
        cost: "50 Focus",
        cd: "1 min cooldown"
      },
      {
        family: "Spider",
        icon: "https://wow.zamimg.com/images/wow/icons/medium/spell_nature_web.jpg",
        name: "Web",
        rank: "Rank 2",
        desc: "Entangles an enemy in a corrosive web, immobilizing them and dealing 20 Nature damage over 4 sec.",
        cost: "20 Focus",
        cd: "40 sec cooldown"
      },
      {
        family: "Tallstrider",
        icon: "https://wow.zamimg.com/images/wow/icons/medium/spell_nature_sleep.jpg",
        name: "Dust Cloud",
        rank: "Rank 2",
        desc: "Your tallstrider kicks up an abrasive cloud of dust, reducing the target's Armor by 175 for 30 sec.",
        cost: "10 Focus",
        cd: "Instant"
      }
    ];

    const changedAbilities = changes.changedAbilities || [];
    const universalMechanics = changes.universalMechanics || [];
    const trainingGuide = changes.trainingGuide || {};
    const dashInfo = changes.dashExpansion || {
      newFamilies: ["Bear", "Crab", "Crocolisk", "Gorilla", "Raptor", "Scorpid", "Spider", "Turtle"],
      classicFamilies: ["Boar", "Cat", "Hyena", "Tallstrider", "Wolf"]
    };
    const removedAbilities = changes.removedAbilities || [
      { family: "Bat", ability: "Screech" },
      { family: "Bird of Prey", ability: "Screech" },
      { family: "Raptor", ability: "Cobra Reflexes" }
    ];

    return `
      <div class="hunter-pet-changes-wrapper">
        <div class="spec-overview-banner" style="background: rgba(245, 158, 11, 0.08); border-color: rgba(245, 158, 11, 0.35);">
          <div>
            <h4 style="color: #fbbf24; font-size: 1.3rem; margin: 0 0 0.25rem;">⚡ What Changed for Pets in WoW Forever</h4>
            <p style="font-size: 0.9rem; color: #cbd5e1; margin: 0;">
              ${escapeHtml(changes.betaCapNotice || "Read from the beta client and set against Classic’s. Each ability is shown at the rank a pet can have at level 30, the beta’s cap.")}
            </p>
          </div>
          <span class="deepdive-badge badge-exclusive" style="align-self: flex-start;"><span>✦</span> Beta Cap Level 30</span>
        </div>

        <!-- Cross-Navigation Action Bar -->
        <div class="pet-changes-top-actions">
          <div style="display: flex; align-items: center; gap: 0.5rem; color: #cbd5e1; font-size: 0.86rem;">
            <span>🐾</span>
            <span>Browse individual beast spawns, stats, and taming locations:</span>
          </div>
          <div style="display: flex; gap: 0.6rem; align-items: center; flex-wrap: wrap;">
            <button class="btn-switch-pet-tab pet-cta-secondary-btn" data-target-subtab="pets" type="button">
              🐾 CLICK HERE TO VIEW 502 TAMABLE BEASTS DIRECTORY ➔
            </button>
            <button class="pet-master-directory-btn btn-open-modal-trigger" type="button" title="Open master modal of 502 beasts">
              <span class="pmd-btn-title">🐾 Open 502 Beasts Table</span>
              <span class="pmd-badge">Open Table ↗</span>
            </button>
          </div>
        </div>

        <!-- Quick Section Jump Navigation -->
        <div class="pet-quick-nav">
          <a href="#pet-sec-changes" class="pet-nav-pill"><span>🦊</span> New Fox & Owl Rename</a>
          <a href="#pet-sec-new-abilities" class="pet-nav-pill"><span>⚡</span> 10 New Abilities (Beta Cap)</a>
          <a href="#pet-sec-dash-removed" class="pet-nav-pill"><span>💨</span> Dash Expansion & Removed</a>
          <a href="#pet-sec-changed-diff" class="pet-nav-pill"><span>⚖️</span> Abilities Changed (Classic Diff)</a>
          <a href="#pet-sec-universal" class="pet-nav-pill"><span>📊</span> Universal Pet Mechanics</a>
          <a href="#pet-sec-training" class="pet-nav-pill"><span>📖</span> Training & Speed Guide</a>
        </div>

        <!-- SECTION 1: Fox & Owl Spotlights -->
        <div id="pet-sec-changes" style="margin-top: 1.25rem;">
          <div style="display: flex; align-items: baseline; justify-content: space-between; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 0.5rem;">
            <h4 style="color: var(--text-gold); font-size: 1.15rem; margin: 0; display: flex; align-items: center; gap: 0.5rem;">
              <span>🦊</span> New Fox Family & Bird of Prey
            </h4>
            <span style="font-size: 0.8rem; color: #94a3b8; font-style: italic;">
              ${escapeHtml(changes.betaCapNotice || "Read from the beta client and set against Classic’s. Each ability is shown at the rank a pet can have at level 30, the beta’s cap.")}
            </span>
          </div>

          <div class="pet-spotlight-grid">
            <!-- Fox Family Card -->
            <div class="pet-spotlight-card">
              <div class="pet-spotlight-header">
                <span style="font-size: 1.5rem;">🦊</span>
                <div>
                  <h5 style="color: #fff; margin: 0; font-size: 1rem;">A New Family: The Fox</h5>
                  <span style="font-size: 0.76rem; color: #fbbf24;">🍖 Eats Meat • Baseline Bite & Dash</span>
                </div>
              </div>
              <p style="font-size: 0.82rem; color: #cbd5e1; margin: 0.5rem 0;">
                Besides Bite and Dash, the Fox has a unique evasive signature ability:
              </p>
              <div class="pet-spotlight-ability">
                <div class="spotlight-ability-name">
                  <span style="color: #6ee7b7; font-weight: 700;">Trickster's Dance</span>
                  <span class="spotlight-rank-badge">Rank 1</span>
                </div>
                <p class="spotlight-ability-desc">
                  Increases your pet's chance to Dodge by 50% and decreases the time between your pet's attacks by 30% for 12 sec.
                </p>
                <div class="spotlight-ability-meta">
                  <span>⚡ 10 Focus</span>
                  <span>⌛ 3 min cooldown</span>
                </div>
              </div>
            </div>

            <!-- Bird of Prey Card -->
            <div class="pet-spotlight-card">
              <div class="pet-spotlight-header">
                <span style="font-size: 1.5rem;">🦅</span>
                <div>
                  <h5 style="color: #fff; margin: 0; font-size: 1rem;">Owl is now Bird of Prey</h5>
                  <span style="font-size: 0.76rem; color: #38bdf8;">Same beasts, a new name, and a weapon disarm ability</span>
                </div>
              </div>
              <p style="font-size: 0.82rem; color: #cbd5e1; margin: 0.5rem 0;">
                Gains the exclusive PvP disarm ability to neutralize enemy weapons:
              </p>
              <div class="pet-spotlight-ability">
                <div class="spotlight-ability-name">
                  <span style="color: #6ee7b7; font-weight: 700;">Mine!</span>
                  <span class="spotlight-rank-badge">Rank 3</span>
                </div>
                <p class="spotlight-ability-desc">
                  Grabs an enemy's weapon with its talons, causing 20 to 24 damage and disarming them for 4 sec.
                </p>
                <div class="spotlight-ability-meta">
                  <span>⚡ 20 Focus</span>
                  <span>⌛ 1 min cooldown</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- SECTION 2: 10 New Family Abilities -->
        <div id="pet-sec-new-abilities" style="margin-top: 2rem;">
          <div style="display: flex; align-items: baseline; justify-content: space-between; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 0.75rem;">
            <div>
              <h4 style="color: var(--text-gold); font-size: 1.15rem; margin: 0; display: flex; align-items: center; gap: 0.5rem;">
                <span>⚡</span> 10 New Family Abilities Added in Forever
              </h4>
              <p style="font-size: 0.82rem; color: #94a3b8; margin: 0.2rem 0 0;">
                Each ability is shown at the rank a pet can have at level 30, the closed beta's level cap.
              </p>
            </div>
            <span class="deepdive-badge badge-exclusive"><span>✦</span> 10 Abilities Total</span>
          </div>

          <div class="pet-diff-grid">
            ${newAbilities.map(a => `
              <div class="pet-new-ability-card">
                <div class="pet-new-ability-top">
                  <img src="${a.icon}" alt="${escapeHtml(a.name)}" class="pet-ability-icon-img" onerror="this.src='https://wow.zamimg.com/images/wow/icons/medium/ability_hunter_pet_wolf.jpg'">
                  <div>
                    <div style="display: flex; align-items: center; gap: 0.4rem; flex-wrap: wrap;">
                      <span class="ability-card-family">${escapeHtml(a.family)}</span>
                      ${a.familyNote ? `<span style="font-size: 0.7rem; color: #fbbf24; font-style: italic;">(${escapeHtml(a.familyNote)})</span>` : ''}
                    </div>
                    <div style="display: flex; align-items: center; gap: 0.4rem;">
                      <span class="ability-card-name">${escapeHtml(a.name)}</span>
                      <span class="ability-card-rank">${escapeHtml(a.rank)}</span>
                    </div>
                  </div>
                </div>
                <p class="pet-new-ability-desc">${escapeHtml(a.desc)}</p>
                <div class="pet-new-ability-meta">
                  <span class="pna-meta-tag">⚡ ${escapeHtml(a.cost)}</span>
                  <span class="pna-meta-tag">⌛ ${escapeHtml(a.cd)}</span>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- SECTION 3: Dash Expansion & Removed Abilities -->
        <div id="pet-sec-dash-removed" style="margin-top: 2rem;">
          <div class="pet-dash-banner">
            <div class="dash-banner-header">
              <div>
                <strong style="color: #6ee7b7; font-size: 1rem; display: flex; align-items: center; gap: 0.4rem;">
                  <span>💨</span> Dash for 8 More Families
                </strong>
                <p style="font-size: 0.82rem; color: #cbd5e1; margin: 0.25rem 0 0.5rem;">
                  Classic already gave Dash to Boar, Cat, Hyena, Tallstrider, and Wolf. Its first rank is learned at Level 30. Forever expands Dash to:
                </p>
              </div>
              <span class="dash-level-badge">Rank 1 Learned at Level 30</span>
            </div>

            <div class="pet-dash-pills">
              ${dashInfo.newFamilies.map(fam => `
                <span class="pet-dash-pill"><span>🐾</span> ${escapeHtml(fam)}</span>
              `).join('')}
            </div>

            <div class="pet-removed-banner">
              <strong style="color: #ef4444; font-size: 0.82rem; text-transform: uppercase; letter-spacing: 0.5px;">Gone from Forever:</strong>
              <div class="pet-removed-pills">
                ${removedAbilities.map(r => `
                  <span class="pet-removed-pill">❌ ${escapeHtml(r.family)}: ${escapeHtml(r.ability)}</span>
                `).join('')}
              </div>
            </div>
          </div>
        </div>

        <!-- SECTION 4: Abilities Forever Changed (Side-by-Side Diff) -->
        <div id="pet-sec-changed-diff" style="margin-top: 2rem;">
          <div style="display: flex; align-items: baseline; justify-content: space-between; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 0.75rem;">
            <div>
              <h4 style="color: var(--text-gold); font-size: 1.15rem; margin: 0; display: flex; align-items: center; gap: 0.5rem;">
                <span>⚖️</span> Abilities Forever Changed (Beta vs Classic Side-by-Side)
              </h4>
              <p style="font-size: 0.82rem; color: #94a3b8; margin: 0.2rem 0 0;">
                Same abilities as in Classic, with altered numbers. Each is shown at Level 30 beta cap rank: Classic above, Forever below.
              </p>
            </div>
            <span class="deepdive-badge badge-demo"><span>🔍</span> Forensic Diff</span>
          </div>

          <div class="pet-diff-grid">
            ${changedAbilities.map(ca => `
              <div class="pet-diff-card">
                <div class="pet-diff-card-header">
                  <img src="${ca.icon}" alt="${escapeHtml(ca.ability)}" class="pet-ability-icon-img" onerror="this.src='https://wow.zamimg.com/images/wow/icons/medium/ability_hunter_pet_wolf.jpg'">
                  <div>
                    <span class="diff-card-fam">${escapeHtml(ca.family)}</span>
                    <div style="display: flex; align-items: center; gap: 0.4rem;">
                      <span class="diff-card-title">${escapeHtml(ca.ability)}</span>
                      <span class="diff-card-rank">${escapeHtml(ca.rank)}</span>
                      ${ca.classicName ? `<span style="font-size: 0.7rem; color: #94a3b8;">(${escapeHtml(ca.classicName)})</span>` : ''}
                    </div>
                  </div>
                </div>

                <div class="diff-versions">
                  <!-- Classic Version (Above) -->
                  <div class="diff-version classic">
                    <div class="diff-version-label">
                      <span>Classic Era</span>
                    </div>
                    <p class="diff-version-text">${escapeHtml(ca.classic)}</p>
                  </div>

                  <!-- Forever Version (Below) -->
                  <div class="diff-version forever">
                    <div class="diff-version-label">
                      <span>✦ Forever Beta</span>
                    </div>
                    <p class="diff-version-text">${escapeHtml(ca.forever)}</p>
                  </div>
                </div>

                ${ca.delta ? `
                  <div class="pet-diff-delta">
                    <strong>Delta:</strong> ${escapeHtml(ca.delta)}
                  </div>
                ` : ''}
              </div>
            `).join('')}
          </div>
        </div>

        <!-- SECTION 5: What Changed for Every Pet (Universal Systems) -->
        <div id="pet-sec-universal" style="margin-top: 2rem;">
          <div style="display: flex; align-items: baseline; justify-content: space-between; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 0.75rem;">
            <div>
              <h4 style="color: var(--text-gold); font-size: 1.15rem; margin: 0; display: flex; align-items: center; gap: 0.5rem;">
                <span>📊</span> What Changed for Every Pet (Universal Systems)
              </h4>
              <p style="font-size: 0.82rem; color: #94a3b8; margin: 0.2rem 0 0;">
                Found by beta players & gathered on the Forever Hunter wiki (github.com/classic-hunter/forever-hunter).
              </p>
            </div>
          </div>

          <div class="pet-mechanics-grid">
            ${universalMechanics.map(m => `
              <div class="pet-mechanic-card">
                <div class="pet-mechanic-top">
                  <span style="font-size: 1.25rem;">${m.icon}</span>
                  <div style="flex: 1;">
                    <strong style="color: #fff; font-size: 0.92rem; display: block;">${escapeHtml(m.title)}</strong>
                  </div>
                  <span class="pet-mechanic-badge">${escapeHtml(m.badge)}</span>
                </div>
                <p class="pet-mechanic-desc">${escapeHtml(m.desc)}</p>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- SECTION 6: Beast Training Guide & Attack Speeds -->
        <div id="pet-sec-training" class="pet-training-box" style="margin-top: 2rem;">
          <div style="display: flex; align-items: baseline; justify-content: space-between; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 0.75rem;">
            <div>
              <h4 style="color: #6ee7b7; font-size: 1.15rem; margin: 0; display: flex; align-items: center; gap: 0.5rem;">
                <span>📖</span> Beast Training in WoW Forever & Attack Speed Mechanics
              </h4>
              <p style="font-size: 0.82rem; color: #cbd5e1; margin: 0;">
                Training still works as in Classic Era through a 3-step loop. Loyalty gates progression and swing speeds remain non-normalized.
              </p>
            </div>
            <span class="deepdive-badge badge-demo"><span>🎙️</span> Beta Forensics Guide</span>
          </div>

          <div class="pet-steps-grid">
            ${(trainingGuide.steps || []).map(s => `
              <div class="pet-step-card">
                <span class="pet-step-num">${s.num}</span>
                <strong style="color: #fff; font-size: 0.88rem; display: block; margin-bottom: 0.25rem;">${escapeHtml(s.title)}</strong>
                <p style="font-size: 0.78rem; color: #cbd5e1; margin: 0; line-height: 1.45;">${escapeHtml(s.desc)}</p>
              </div>
            `).join('')}
          </div>

          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 0.85rem; margin-top: 0.5rem;">
            <div style="background: rgba(30, 41, 59, 0.4); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 6px; padding: 0.8rem 1rem;">
              <strong style="color: #fcd34d; font-size: 0.85rem; display: block; margin-bottom: 0.25rem;">🔒 Loyalty Gates Training:</strong>
              <p style="font-size: 0.78rem; color: #cbd5e1; margin: 0; line-height: 1.45;">
                ${escapeHtml(trainingGuide.loyaltyNote || "Your pet must gain a loyalty level before higher rank abilities can be taught. Beta players report loyalty progresses very slowly.")}
              </p>
              <p style="font-size: 0.76rem; color: #94a3b8; margin: 0.4rem 0 0;">
                ${escapeHtml(trainingGuide.tameRules || "You can tame beasts up to 2 levels above your character level. Beast Lore is learned at Level 24.")}
              </p>
            </div>

            <div class="pet-beta-bug-alert">
              ${escapeHtml(trainingGuide.betaBugAlert || "⚠️ Beta Bug Notice: Pets tamed from Skyborne territory (such as Vuldren foxes or cranes) have been reported spontaneously losing abilities after being dismissed or relogging. This is a recognized beta bug, not intended design.")}
            </div>
          </div>

          <div class="pet-speed-box">
            <strong style="color: #38bdf8; font-size: 0.85rem; display: block; margin-bottom: 0.25rem;">⚡ Attack Speed & Damage Mechanics in Beta:</strong>
            <p style="font-size: 0.79rem; color: #bae6fd; margin: 0; line-height: 1.45;">
              ${escapeHtml(trainingGuide.attackSpeedInfo || "All pets swing at 2.0s base, modified by innate Faster Attack I–VII passives (Broken Tooth 1.0s, Savannah Cub 1.2s, Ravage 1.3s, Mystmane 1.6s). Because individual hits are not penalized for fast swings in beta, faster-swinging pets deal higher sustained DPS.")}
            </p>
          </div>
        </div>

        <!-- Return CTA Box -->
        <div class="pet-changes-return-box">
          <div>
            <h4 style="color: #6ee7b7; margin: 0 0 0.25rem; font-size: 1.05rem;">Ready to tame your companion?</h4>
            <p style="color: #cbd5e1; margin: 0; font-size: 0.84rem;">
              Filter all 18 families, check zone spawns, verify level brackets, and view all 520 beasts.
            </p>
          </div>
          <div style="display: flex; gap: 0.6rem; align-items: center; flex-wrap: wrap;">
            <button class="btn-switch-pet-tab pet-cta-primary-btn" data-target-subtab="pets" type="button">
              🐾 EXPLORE 18 FAMILIES & 520 BEASTS DIRECTORY ➔
            </button>
            <button class="pet-master-directory-btn btn-open-modal-trigger" type="button">
              <span class="pmd-btn-title">🐾 Open 520 Beasts Table</span>
              <span class="pmd-badge">Open Table ↗</span>
            </button>
          </div>
        </div>
      </div>
    `;
  }

  const NEW_SIGNATURE_ABILITY_FAMILIES = new Set([
    'bat', 'bear', 'bird-of-prey', 'crab', 'crocolisk', 'fox', 'hyena', 'raptor', 'spider'
  ]);

  function renderHunterPetStable(_cData) {
    const petData = (typeof window !== 'undefined' && window.WOW_ATLAS_DATA && window.WOW_ATLAS_DATA.hunterPets) || null;
    const families = (petData && petData.families) || [];
    const totalBeastsCount = (petData && petData.allBeasts && petData.allBeasts.length) || 520;

    return `
      <div class="hunter-pet-stable-wrapper">
        <div class="spec-overview-banner" style="background: rgba(16, 185, 129, 0.08); border-color: rgba(16, 185, 129, 0.3);">
          <div>
            <h4 style="color: #6ee7b7; font-size: 1.3rem; margin: 0 0 0.25rem;">🐾 Pet Stable & ${totalBeastsCount} Tamable Beasts Directory</h4>
            <p style="font-size: 0.9rem; color: #cbd5e1; margin: 0;">
              Classic pet mechanics preserved and expanded: 18 families, native swing speed inheritance (Broken Tooth 1.0s, Mystmane 1.6s bear), and ${totalBeastsCount} authentic tamable beasts in WoW Forever.
            </p>
          </div>
          <span class="deepdive-badge badge-exclusive" style="align-self: flex-start;"><span>✦</span> Living Classic+ Pets</span>
        </div>

        <!-- Prominent Callout Banner to What's Changed for Pets -->
        <div class="pet-changes-cta-banner">
          <div class="pet-changes-cta-content">
            <div class="pet-changes-cta-title">
              <span>⚡</span>
              <span>Looking for Closed Beta Pet Changes & Reworks?</span>
              <span class="pet-changes-cta-tag">Beta Cap Lvl 30 Diff</span>
            </div>
            <p class="pet-changes-cta-desc">
              Explore the brand new Fox family, Bird of Prey rename, 10 new family abilities, Dash expansion on 8 families, pruned abilities, side-by-side Classic vs Forever ability diffs, and universal pet mechanics.
            </p>
          </div>
          <div class="pet-changes-cta-actions">
            <button class="btn-switch-pet-tab pet-cta-primary-btn" data-target-subtab="petchanges" type="button" title="View all changes and new abilities">
              ⚡ CLICK HERE TO SEE WHAT'S CHANGED ➔
            </button>
            <button class="btn-open-modal-trigger pet-master-directory-btn" type="button" title="Open master modal of ${totalBeastsCount} beasts">
              <span class="pmd-btn-title">🐾 View ${totalBeastsCount} Beasts Table</span>
              <span class="pmd-badge">Open Table ↗</span>
            </button>
          </div>
        </div>

        <!-- SECTION: All 18 Pet Families & Beast Directory (${totalBeastsCount} Beasts) -->
        <div id="pet-sec-families" class="pet-filter-bar" style="margin-top: 1rem;">
          <div class="filter-controls-header">
            <div>
              <h4 style="color: #fff; margin: 0; font-size: 1.05rem;">All 18 Pet Families & Beast Taming Directory (${totalBeastsCount} Beasts)</h4>
              <span style="font-size: 0.8rem; color: #94a3b8;">Filter by role, level progression bracket, zone, or fast attack speeds</span>
            </div>
            <div style="display: flex; gap: 0.5rem; align-items: center; flex-wrap: wrap;">
              <button class="pet-master-directory-btn" id="btn-open-master-beasts" type="button" title="Click to open the master directory of all ${totalBeastsCount} tamable beasts">
                <span class="pmd-btn-title">🐾 Click Here to View All ${totalBeastsCount} Tamable Beasts Directory Table</span>
                <span class="pmd-badge">Open Table ↗</span>
              </button>
              <button class="pet-toggle-all-btn" id="pet-toggle-all-drawers" data-state="collapsed" type="button">
                <span>📍 Expand All Taming Guides</span>
              </button>
            </div>
          </div>

          <!-- Role Filter Chips -->
          <div class="pet-filter-chips">
            <button class="filter-chip pet-family-filter-btn active" data-pet-filter="all">All Families (18)</button>
            <button class="filter-chip pet-family-filter-btn" data-pet-filter="damage">Offense & DPS (+Dmg)</button>
            <button class="filter-chip pet-family-filter-btn" data-pet-filter="tank">Tank & Survival (+Armor/HP)</button>
            <button class="filter-chip pet-family-filter-btn" data-pet-filter="utility">Crowd Control & Debuffs</button>
            <button class="filter-chip pet-family-filter-btn" data-pet-filter="new">✦ New / Reworked Abilities (9)</button>
          </div>

          <!-- Level Progression & Speed Chips -->
          <div class="pet-level-chips">
            <span style="font-size: 0.72rem; color: #94a3b8; align-self: center; font-weight: 600; margin-right: 0.2rem;">Level Bracket:</span>
            <button class="pet-level-filter-btn active" data-level-filter="all">All Levels</button>
            <button class="pet-level-filter-btn" data-level-filter="10-19">Lvl 10–19 (Starters)</button>
            <button class="pet-level-filter-btn" data-level-filter="20-30">Lvl 20–30 (Beta Cap)</button>
            <button class="pet-level-filter-btn" data-level-filter="30plus">Lvl 30+ (Endgame)</button>
            <button class="pet-level-filter-btn" data-level-filter="fast">⚡ Fast Swing (≤1.6s)</button>
            <span id="pet-results-counter-badge" class="pet-results-counter-badge" style="display: none;"></span>
          </div>

          <!-- Live Search Bar -->
          <div class="pet-search-bar-row">
            <div class="pet-search-input-wrap">
              <span class="pet-search-icon">🔍</span>
              <input type="text" id="pet-beast-search" class="pet-search-input" placeholder="Search beasts, zones (e.g. Westfall, Badlands, Mulgore), or abilities..." aria-label="Search hunter beasts, zones, or abilities">
            </div>
          </div>
        </div>

        <!-- New Abilities Filter Notice Banner -->
        <div id="pet-new-filter-banner" class="pet-filter-notice-banner" style="display: none;">
          <div class="pnfb-text">
            <strong>✦ Showing 9 Pet Families with Brand-New Signature Abilities in WoW Forever:</strong>
            <span>Bat (Sonic Blast), Bear (Swipe), Bird of Prey (Mine!), Crab (Pinch), Crocolisk (Dismember), Fox (Trickster's Dance), Hyena (Tendon Rip), Raptor (Savage Rend), Spider (Web).</span>
          </div>
          <button class="btn-switch-pet-tab pnfb-link-btn" data-target-subtab="petchanges" type="button">
            ⚡ View Full Forensic Changes & Ability Diffs ➔
          </button>
        </div>

        <!-- 18 Families Grid -->
        <div class="pet-families-grid" style="margin-top: 1rem;">
          ${families.map(fam => {
            const famBeasts = fam.tameLocations || [];
            const minFamLvl = famBeasts.length > 0 ? Math.min(...famBeasts.map(b => b.minLevel || 60)) : 1;
            const maxFamLvl = famBeasts.length > 0 ? Math.max(...famBeasts.map(b => b.maxLevel || 1)) : 60;
            const hasNew = NEW_SIGNATURE_ABILITY_FAMILIES.has(fam.id);
            const isDmg = fam.damageMod.startsWith('+');
            const isTank = fam.armorMod.startsWith('+') || fam.healthMod.startsWith('+');
            const role = isDmg ? 'damage' : (isTank ? 'tank' : 'utility');

            return `
              <div class="pet-family-card ${fam.id === 'fox' ? 'featured-family' : ''}" data-family-id="${fam.id}" data-family-role="${role}" data-has-new="${hasNew}">
                <div class="family-card-top">
                  <div class="family-title-row">
                    <img src="${fam.icon}" alt="${escapeHtml(fam.name)}" class="family-icon-img" onerror="this.style.display='none'">
                    <div>
                      <strong class="family-name">${escapeHtml(fam.name)}</strong>
                      ${fam.id === 'fox' ? '<span class="deepdive-badge badge-exclusive" style="font-size: 0.68rem; margin-left: 0.3rem;">✦ New Family</span>' : ''}
                      ${fam.fastestTame ? `<span class="fastest-tame-badge">⚡ ${escapeHtml(fam.fastestTame)}</span>` : ''}
                    </div>
                  </div>
                  <div class="family-stat-mods">
                    <span class="mod-pill ${fam.damageMod.startsWith('+') ? 'mod-pos' : (fam.damageMod.startsWith('-') ? 'mod-neg' : 'mod-neutral')}">
                      Dmg: ${escapeHtml(fam.damageMod)}
                    </span>
                    <span class="mod-pill ${fam.armorMod.startsWith('+') ? 'mod-pos' : (fam.armorMod.startsWith('-') ? 'mod-neg' : 'mod-neutral')}">
                      Arm: ${escapeHtml(fam.armorMod)}
                    </span>
                    <span class="mod-pill ${fam.healthMod.startsWith('+') ? 'mod-pos' : (fam.healthMod.startsWith('-') ? 'mod-neg' : 'mod-neutral')}">
                      HP: ${escapeHtml(fam.healthMod)}
                    </span>
                  </div>
                </div>

                <div class="family-diet-row">
                  <span class="diet-label">🍖 Diet:</span>
                  <div class="diet-tags">
                    ${(fam.diet || []).map(d => `<span class="diet-tag">${escapeHtml(d)}</span>`).join('')}
                  </div>
                </div>

                <p class="family-highlight-p">${escapeHtml(fam.highlight)}</p>

                ${fam.newAbility ? `
                  <div class="family-new-ability-box">
                    <div class="fna-header">
                      <img src="${fam.newAbility.icon}" alt="" class="fna-icon" onerror="this.style.display='none'">
                      <strong style="color: #fcd34d; font-size: 0.86rem;">${escapeHtml(fam.newAbility.name)}</strong>
                      <span class="fna-badge">${escapeHtml(fam.newAbility.badge)}</span>
                    </div>
                    <div class="fna-specs">
                      ${fam.newAbility.cost ? `<span>${escapeHtml(fam.newAbility.cost)}</span>` : ''}
                      ${fam.newAbility.cd ? `<span>${escapeHtml(fam.newAbility.cd)}</span>` : ''}
                    </div>
                    <p class="fna-desc">${escapeHtml(fam.newAbility.desc)}</p>
                  </div>
                ` : ''}

                <div class="family-abilities-list">
                  <span style="font-size: 0.75rem; color: #94a3b8; font-weight: 600;">Learnable Abilities:</span>
                  <div class="family-ability-chips">
                    ${(fam.abilities || []).map(ab => `<span class="ability-mini-chip">${escapeHtml(ab)}</span>`).join('')}
                  </div>
                </div>

                <!-- Where to Tame Drawer -->
                <button class="tame-toggle-btn" data-target-family="${fam.id}">
                  <span>📍 Where to Tame (${famBeasts.length} Beasts)</span>
                  <span class="tame-toggle-arrow">▾</span>
                </button>

                <div class="pet-tame-drawer" id="tame-drawer-${fam.id}">
                  <div class="tame-drawer-header">
                    <div class="tdh-summary">
                      <span>🐾 <strong>${famBeasts.length} Beasts</strong> Available</span>
                      <span class="tdh-levels">Progression: Lvl ${minFamLvl}–${maxFamLvl}</span>
                    </div>
                    <button class="tdh-view-all-modal-btn" type="button" data-filter-fam="${escapeHtml(fam.name)}">
                      <span>🔍 Open in Master Table ↗</span>
                    </button>
                  </div>
                  ${famBeasts.map(b => {
                    const famAliases = fam.id === 'bird-of-prey' ? 'owl owls bird of prey' :
                                       fam.id === 'carrion-bird' ? 'vulture vultures carrion bird' :
                                       fam.id === 'wind-serpent' ? 'wind serpent windserpent' : fam.name;
                    const searchStr = `${b.name} ${b.zone || ''} ${b.subzone || ''} ${b.teaches || ''} ${fam.name} ${famAliases}`.toLowerCase();
                    const zoneDisplay = b.zone ? b.zone : 'WoW Forever Beta Spawn';
                    return `
                      <div class="tame-beast-row" 
                        data-min-level="${b.minLevel || 1}" 
                        data-max-level="${b.maxLevel || 60}" 
                        data-is-fast="${b.isFast ? 'true' : 'false'}" 
                        data-search-text="${escapeHtml(searchStr)}">
                        <div class="tbr-header">
                          <div class="tbr-name-wrap">
                            ${b.npcUrl ? `
                              <a href="${escapeHtml(b.npcUrl)}" target="_blank" rel="noopener" class="tbr-name" style="text-decoration: none; color: #fff; display: inline-flex; align-items: center; gap: 0.25rem;">
                                ${escapeHtml(b.name)} <span style="font-size: 0.68rem; color: #38bdf8;">↗</span>
                              </a>
                            ` : `
                              <span class="tbr-name">${escapeHtml(b.name)}</span>
                            `}
                            ${b.isNew ? '<span class="deepdive-badge badge-exclusive" style="font-size: 0.62rem; padding: 0.05rem 0.3rem;">✦ New</span>' : ''}
                          </div>
                          <div class="tbr-badges">
                            <span class="tbr-level">Lvl ${escapeHtml(b.level)}</span>
                            <span class="tbr-speed ${b.isFast ? 'fast' : ''}">${b.isFast ? '⚡ ' : ''}${escapeHtml(b.speed)}</span>
                            <span class="tbr-faction ${escapeHtml(b.faction)}">${escapeHtml(b.faction)}</span>
                          </div>
                        </div>
                        <div class="tbr-loc">
                          <span>📍</span> <strong>${escapeHtml(zoneDisplay)}</strong>${b.subzone ? ` — <span>${escapeHtml(b.subzone)}</span>` : ''}
                        </div>
                        ${b.teaches ? `
                          <div class="tbr-teaches">
                            <span>📖</span> <span>${escapeHtml(b.teaches)}</span>
                          </div>
                        ` : `
                          <div class="tbr-teaches tbr-untaught" title="No innate ability taught upon tame. Learn skills from other beasts or trainers to train this pet.">
                            <span style="opacity: 0.5;">⚪</span> <span>Untaught (Blank Slate)</span>
                          </div>
                        `}
                        ${b.notes ? `
                          <div class="tbr-notes">${escapeHtml(b.notes)}</div>
                        ` : ''}
                      </div>
                    `;
                  }).join('')}
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;
  }

  function renderTaurenRacesSection(cData) {
    const tData = cData.racialSynergies.taurenDemo;
    const newRaces = cData.racialSynergies.newRaces;

    return `
      <div>
        <!-- Tauren Hands-On Demo Findings -->
        <div class="tauren-demo-block">
          <div class="spec-overview-banner" style="background: rgba(239, 68, 68, 0.08); border-color: rgba(239, 68, 68, 0.3);">
            <div>
              <h4 style="color: #fca5a5; font-size: 1.25rem; margin: 0 0 0.25rem;">${escapeHtml(tData.title)}</h4>
              <p style="font-size: 0.9rem; color: #cbd5e1; margin: 0;">${escapeHtml(tData.subtitle)}</p>
            </div>
            <span class="deepdive-badge badge-demo"><span>🎙️</span> In-Game Stopwatch & Speed Tests</span>
          </div>

          <div class="deepdive-cards-grid" style="margin-top: 1rem;">
            ${tData.items.map(item => `
              <div class="deepdive-rule-card">
                <div class="rule-card-header">
                  <strong class="rule-card-title">${escapeHtml(item.name)}</strong>
                  <span class="deepdive-badge ${item.status === 'demo' ? 'badge-demo' : 'badge-verified'}">
                    ${escapeHtml(item.statusLabel)}
                  </span>
                </div>
                <p class="rule-card-desc" style="margin-top: 0.5rem;">${escapeHtml(item.desc)}</p>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- New Playable Races for Hunter -->
        <div style="margin-top: 2rem;">
          <h4 style="color: var(--text-gold); font-size: 1.15rem; margin-bottom: 0.8rem; display: flex; align-items: center; gap: 0.5rem;">
            <span>🏹</span> New Playable Races for Hunter in WoW Forever
          </h4>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 1rem;">
            ${newRaces.map(r => `
              <div class="deepdive-rule-card" style="border-left: 3px solid ${r.faction === 'Alliance' ? '#3b82f6' : '#a78bfa'};">
                <div class="rule-card-header">
                  <strong class="rule-card-title">${escapeHtml(r.race)}</strong>
                  <span class="deepdive-badge badge-exclusive">${escapeHtml(r.badge)}</span>
                </div>
                <span class="role-pill" style="margin: 0.3rem 0; display: inline-block;">${escapeHtml(r.faction)}</span>
                <p class="rule-card-desc">${escapeHtml(r.desc)}</p>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  }

  function renderEnhancementSection(cData) {
    return `
      <div>
        <div class="spec-overview-banner">
          <div>
            <h4 style="color: #0070DE; font-size: 1.25rem; margin: 0 0 0.25rem;">${escapeHtml(cData.enhancement.title)}</h4>
            <p style="font-size: 0.9rem; color: #cbd5e1; margin: 0;">${escapeHtml(cData.enhancement.tagline)}</p>
          </div>
          <span class="status-badge-highlight" style="background: rgba(0, 112, 222, 0.15); border-color: #0070DE; color: #7dd3fc;">
            8s Stormstrike & Reset Procs
          </span>
        </div>

        <div class="deepdive-talents-grid">
          ${cData.enhancement.talents.map(t => `
            <div class="talent-feature-card ${t.name.includes('Stormstrike') || t.name.includes('Farseer') ? 'featured-talent' : ''}">
              <div class="talent-card-top">
                <div>
                  <strong class="talent-name" style="color: ${t.name.includes('Stormstrike') ? '#0070DE' : t.name.includes('Farseer') ? '#f5d061' : '#fff'};">${escapeHtml(t.name)}</strong>
                  <span class="talent-type">${escapeHtml(t.type)}</span>
                </div>
                <span class="deepdive-badge badge-verified"><span>✓</span> Verified</span>
              </div>
              <div class="talent-specs-chips">
                ${t.cast ? `<span class="talent-chip">⏱️ ${escapeHtml(t.cast)}</span>` : ''}
                ${t.cd ? `<span class="talent-chip">⌛ ${escapeHtml(t.cd)}</span>` : ''}
                ${t.duration ? `<span class="talent-chip">⏳ ${escapeHtml(t.duration)}</span>` : ''}
              </div>
              <p class="talent-desc">${escapeHtml(t.desc)}</p>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  function renderShamanTankingSection(cData) {
    return `
      <div>
        <div class="spec-overview-banner" style="background: rgba(56, 189, 248, 0.06); border-color: rgba(56, 189, 248, 0.3);">
          <div>
            <h4 style="color: #38bdf8; font-size: 1.25rem; margin: 0 0 0.25rem;">${escapeHtml(cData.tanking.title)}</h4>
            <p style="font-size: 0.9rem; color: #cbd5e1; margin: 0;">${escapeHtml(cData.tanking.tagline)}</p>
          </div>
          <span class="status-badge-highlight" style="background: rgba(56, 189, 248, 0.15); border-color: #38bdf8; color: #7dd3fc;">
            Spirit Weapons +30% Threat
          </span>
        </div>

        <div class="deepdive-cards-grid">
          ${cData.tanking.tools.map(tool => `
            <div class="deepdive-rule-card" style="${tool.name.includes('Verdict') ? 'border-color: rgba(245, 158, 11, 0.45); background: rgba(245, 158, 11, 0.05);' : ''}">
              <div class="rule-card-header">
                <strong class="rule-card-title">${escapeHtml(tool.name)}</strong>
                <span class="deepdive-badge ${tool.status === 'demo' ? 'badge-demo' : 'badge-verified'}">
                  ${escapeHtml(tool.statusLabel)}
                </span>
              </div>
              <p class="rule-card-desc" style="margin-top: 0.5rem;">${escapeHtml(tool.desc)}</p>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  function renderElementalSection(cData) {
    return `
      <div>
        <div class="spec-overview-banner">
          <div>
            <h4 style="color: #69CCF0; font-size: 1.25rem; margin: 0 0 0.25rem;">${escapeHtml(cData.elemental.title)}</h4>
            <p style="font-size: 0.9rem; color: #cbd5e1; margin: 0;">${escapeHtml(cData.elemental.tagline)}</p>
          </div>
          <span class="status-badge-highlight" style="background: rgba(105, 204, 240, 0.15); border-color: #69CCF0; color: #bae6fd;">
            Lava Burst & Overload
          </span>
        </div>

        <div class="deepdive-talents-grid">
          ${cData.elemental.talents.map(t => `
            <div class="talent-feature-card ${t.name === 'Lava Burst' || t.name === 'Elemental Overload' ? 'featured-talent' : ''}">
              <div class="talent-card-top">
                <div>
                  <strong class="talent-name" style="color: ${t.name === 'Lava Burst' ? '#f5d061' : t.name === 'Elemental Overload' ? '#69CCF0' : '#fff'};">${escapeHtml(t.name)}</strong>
                  <span class="talent-type">${escapeHtml(t.type)}</span>
                </div>
                <span class="deepdive-badge ${t.status === 'demo' ? 'badge-demo' : 'badge-verified'}">
                  ${t.status === 'demo' ? '<span>🎙️</span> Forensic' : '<span>✓</span> Verified'}
                </span>
              </div>
              <div class="talent-specs-chips">
                ${t.cast ? `<span class="talent-chip">⏱️ ${escapeHtml(t.cast)}</span>` : ''}
                ${t.cd ? `<span class="talent-chip">⌛ ${escapeHtml(t.cd)}</span>` : ''}
              </div>
              <p class="talent-desc">${escapeHtml(t.desc)}</p>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  function renderRestorationSection(cData) {
    return `
      <div>
        <div class="spec-overview-banner">
          <div>
            <h4 style="color: #10b981; font-size: 1.25rem; margin: 0 0 0.25rem;">${escapeHtml(cData.restoration.title)}</h4>
            <p style="font-size: 0.9rem; color: #cbd5e1; margin: 0;">${escapeHtml(cData.restoration.tagline)}</p>
          </div>
          <span class="status-badge-highlight" style="background: rgba(16, 185, 129, 0.15); border-color: #10b981; color: #6ee7b7;">
            Riptide +25% Chain Heal
          </span>
        </div>

        <div class="deepdive-talents-grid">
          ${cData.restoration.talents.map(t => `
            <div class="talent-feature-card ${t.name === 'Riptide' || t.name === 'Water Shield' ? 'featured-talent' : ''}">
              <div class="talent-card-top">
                <div>
                  <strong class="talent-name" style="color: ${t.name === 'Riptide' ? '#6ee7b7' : t.name === 'Water Shield' ? '#38bdf8' : '#fff'};">${escapeHtml(t.name)}</strong>
                  <span class="talent-type">${escapeHtml(t.type)}</span>
                </div>
                <span class="deepdive-badge ${t.status === 'demo' ? 'badge-demo' : 'badge-verified'}">
                  ${t.status === 'demo' ? '<span>🎙️</span> Forensic' : '<span>✓</span> Verified'}
                </span>
              </div>
              <div class="talent-specs-chips">
                ${t.cast ? `<span class="talent-chip">⏱️ ${escapeHtml(t.cast)}</span>` : ''}
                ${t.cd ? `<span class="talent-chip">⌛ ${escapeHtml(t.cd)}</span>` : ''}
                ${t.charges ? `<span class="talent-chip">🛡️ ${escapeHtml(t.charges)}</span>` : ''}
                ${t.duration ? `<span class="talent-chip">⏳ ${escapeHtml(t.duration)}</span>` : ''}
              </div>
              <p class="talent-desc">${escapeHtml(t.desc)}</p>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  function renderDwarfRacesSection(cData) {
    const dData = cData.racialSynergies.dwarfDemo;
    const newRaces = cData.racialSynergies.newRaces;

    return `
      <div>
        <div class="tauren-demo-block">
          <div class="spec-overview-banner" style="background: rgba(59, 130, 246, 0.08); border-color: rgba(59, 130, 246, 0.3);">
            <div>
              <h4 style="color: #93c5fd; font-size: 1.25rem; margin: 0 0 0.25rem;">${escapeHtml(dData.title)}</h4>
              <p style="font-size: 0.9rem; color: #cbd5e1; margin: 0;">${escapeHtml(dData.subtitle)}</p>
            </div>
            <span class="deepdive-badge badge-demo"><span>🎙️</span> Level-38 Dwarf Hands-On Test</span>
          </div>

          <div class="deepdive-cards-grid" style="margin-top: 1rem;">
            ${dData.items.map(item => `
              <div class="deepdive-rule-card">
                <div class="rule-card-header">
                  <strong class="rule-card-title">${escapeHtml(item.name)}</strong>
                  <span class="deepdive-badge badge-verified">${escapeHtml(item.statusLabel)}</span>
                </div>
                <p class="rule-card-desc" style="margin-top: 0.5rem;">${escapeHtml(item.desc)}</p>
              </div>
            `).join('')}
          </div>
        </div>

        <div style="margin-top: 2rem;">
          <h4 style="color: var(--text-gold); font-size: 1.15rem; margin-bottom: 0.8rem; display: flex; align-items: center; gap: 0.5rem;">
            <span>⚡</span> New Playable Races for Shaman in WoW Forever
          </h4>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 1rem;">
            ${newRaces.map(r => `
              <div class="deepdive-rule-card" style="border-left: 3px solid ${r.faction === 'Alliance' ? '#3b82f6' : '#ef4444'};">
                <div class="rule-card-header">
                  <strong class="rule-card-title">${escapeHtml(r.race)}</strong>
                  <span class="deepdive-badge badge-exclusive">${escapeHtml(r.badge)}</span>
                </div>
                <span class="role-pill" style="margin: 0.3rem 0; display: inline-block;">${escapeHtml(r.faction)}</span>
                <p class="rule-card-desc">${escapeHtml(r.desc)}</p>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  }

  function renderArcaneSection(cData) {
    return `
      <div>
        <div class="spec-overview-banner" style="background: rgba(168, 85, 247, 0.08); border-color: rgba(168, 85, 247, 0.3);">
          <div>
            <h4 style="color: #c084fc; font-size: 1.25rem; margin: 0 0 0.25rem;">${escapeHtml(cData.arcane.title)}</h4>
            <p style="font-size: 0.9rem; color: #cbd5e1; margin: 0;">${escapeHtml(cData.arcane.tagline)}</p>
          </div>
          <span class="status-badge-highlight" style="background: rgba(168, 85, 247, 0.15); border-color: #a855f7; color: #e9d5ff;">
            Arcane Blast + Missile Barrage
          </span>
        </div>

        <div class="deepdive-talents-grid">
          ${cData.arcane.talents.map(t => `
            <div class="talent-feature-card ${t.name.includes('Arcane Blast') || t.name.includes('Missile Barrage') ? 'featured-talent' : ''}">
              <div class="talent-card-top">
                <div>
                  <strong class="talent-name" style="color: ${t.name.includes('Arcane Blast') ? '#c084fc' : t.name.includes('Missile Barrage') ? '#f5d061' : '#fff'};">${escapeHtml(t.name)}</strong>
                  <span class="talent-type">${escapeHtml(t.type)}</span>
                </div>
                <span class="deepdive-badge badge-verified"><span>✓</span> Verified</span>
              </div>
              <div class="talent-specs-chips">
                ${t.cast ? `<span class="talent-chip">⏱️ ${escapeHtml(t.cast)}</span>` : ''}
                ${t.cd ? `<span class="talent-chip">⌛ ${escapeHtml(t.cd)}</span>` : ''}
              </div>
              <p class="talent-desc">${escapeHtml(t.desc)}</p>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  function renderFireSection(cData) {
    return `
      <div>
        <div class="spec-overview-banner" style="background: rgba(239, 68, 68, 0.08); border-color: rgba(239, 68, 68, 0.3);">
          <div>
            <h4 style="color: #f87171; font-size: 1.25rem; margin: 0 0 0.25rem;">${escapeHtml(cData.fire.title)}</h4>
            <p style="font-size: 0.9rem; color: #cbd5e1; margin: 0;">${escapeHtml(cData.fire.tagline)}</p>
          </div>
          <span class="status-badge-highlight" style="background: rgba(239, 68, 68, 0.15); border-color: #ef4444; color: #fca5a5;">
            1.5s Hot Streak Pyroblasts
          </span>
        </div>

        <div class="deepdive-talents-grid">
          ${cData.fire.talents.map(t => `
            <div class="talent-feature-card ${t.name.includes('Hot Streak') || t.name.includes('Combustion') ? 'featured-talent' : ''}">
              <div class="talent-card-top">
                <div>
                  <strong class="talent-name" style="color: ${t.name.includes('Hot Streak') ? '#f5d061' : t.name.includes('Combustion') ? '#f87171' : '#fff'};">${escapeHtml(t.name)}</strong>
                  <span class="talent-type">${escapeHtml(t.type)}</span>
                </div>
                <span class="deepdive-badge badge-verified"><span>✓</span> Verified</span>
              </div>
              <div class="talent-specs-chips">
                ${t.cast ? `<span class="talent-chip">⏱️ ${escapeHtml(t.cast)}</span>` : ''}
                ${t.cd ? `<span class="talent-chip">⌛ ${escapeHtml(t.cd)}</span>` : ''}
                ${t.duration ? `<span class="talent-chip">⏳ ${escapeHtml(t.duration)}</span>` : ''}
              </div>
              <p class="talent-desc">${escapeHtml(t.desc)}</p>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  function renderFrostSection(cData) {
    return `
      <div>
        <div class="spec-overview-banner" style="background: rgba(14, 165, 233, 0.08); border-color: rgba(14, 165, 233, 0.3);">
          <div>
            <h4 style="color: #38bdf8; font-size: 1.25rem; margin: 0 0 0.25rem;">${escapeHtml(cData.frost.title)}</h4>
            <p style="font-size: 0.9rem; color: #cbd5e1; margin: 0;">${escapeHtml(cData.frost.tagline)}</p>
          </div>
          <span class="status-badge-highlight" style="background: rgba(14, 165, 233, 0.15); border-color: #0ea5e9; color: #7dd3fc;">
            Ice Lance & Fingers of Frost
          </span>
        </div>

        <div class="deepdive-talents-grid">
          ${cData.frost.talents.map(t => `
            <div class="talent-feature-card ${t.name.includes('Ice Lance') || t.name.includes('Fingers of Frost') ? 'featured-talent' : ''}">
              <div class="talent-card-top">
                <div>
                  <strong class="talent-name" style="color: ${t.name.includes('Ice Lance') ? '#38bdf8' : t.name.includes('Fingers of Frost') ? '#f5d061' : '#fff'};">${escapeHtml(t.name)}</strong>
                  <span class="talent-type">${escapeHtml(t.type)}</span>
                </div>
                <span class="deepdive-badge badge-verified"><span>✓</span> Verified</span>
              </div>
              <div class="talent-specs-chips">
                ${t.cast ? `<span class="talent-chip">⏱️ ${escapeHtml(t.cast)}</span>` : ''}
                ${t.cd ? `<span class="talent-chip">⌛ ${escapeHtml(t.cd)}</span>` : ''}
                ${t.cost ? `<span class="talent-chip">💧 ${escapeHtml(t.cost)}</span>` : ''}
              </div>
              <p class="talent-desc">${escapeHtml(t.desc)}</p>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  function renderOrcMageRacesSection(cData) {
    const oData = cData.racialSynergies.orcDemo;
    const newRaces = cData.racialSynergies.newRaces;

    return `
      <div>
        <div class="tauren-demo-block">
          <div class="spec-overview-banner" style="background: rgba(220, 38, 38, 0.08); border-color: rgba(220, 38, 38, 0.3);">
            <div>
              <h4 style="color: #f87171; font-size: 1.25rem; margin: 0 0 0.25rem;">${escapeHtml(oData.title)}</h4>
              <p style="font-size: 0.9rem; color: #cbd5e1; margin: 0;">${escapeHtml(oData.subtitle)}</p>
            </div>
            <span class="deepdive-badge badge-demo"><span>🎙️</span> Level-38 Orc Hands-On Test</span>
          </div>

          <div class="deepdive-cards-grid" style="margin-top: 1rem;">
            ${oData.items.map(item => `
              <div class="deepdive-rule-card">
                <div class="rule-card-header">
                  <strong class="rule-card-title">${escapeHtml(item.name)}</strong>
                  <span class="deepdive-badge badge-verified">${escapeHtml(item.statusLabel)}</span>
                </div>
                <p class="rule-card-desc" style="margin-top: 0.5rem;">${escapeHtml(item.desc)}</p>
              </div>
            `).join('')}
          </div>
        </div>

        <div style="margin-top: 2rem;">
          <h4 style="color: var(--text-gold); font-size: 1.15rem; margin-bottom: 0.8rem; display: flex; align-items: center; gap: 0.5rem;">
            <span>🔥</span> New Playable Races for Mage in WoW Forever
          </h4>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 1rem;">
            ${newRaces.map(r => `
              <div class="deepdive-rule-card" style="border-left: 3px solid ${r.faction === 'Alliance' ? '#3b82f6' : '#ef4444'};">
                <div class="rule-card-header">
                  <strong class="rule-card-title">${escapeHtml(r.race)}</strong>
                  <span class="deepdive-badge badge-exclusive">${escapeHtml(r.badge)}</span>
                </div>
                <span class="role-pill" style="margin: 0.3rem 0; display: inline-block;">${escapeHtml(r.faction)}</span>
                <p class="rule-card-desc">${escapeHtml(r.desc)}</p>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  }

  function renderHolyPaladinSection(cData) {
    return `
      <div>
        <div class="spec-overview-banner" style="background: rgba(245, 140, 186, 0.08); border-color: rgba(245, 140, 186, 0.3);">
          <div>
            <h4 style="color: #f472b6; font-size: 1.25rem; margin: 0 0 0.25rem;">${escapeHtml(cData.holy.title)}</h4>
            <p style="font-size: 0.9rem; color: #cbd5e1; margin: 0;">${escapeHtml(cData.holy.tagline)}</p>
          </div>
          <span class="status-badge-highlight" style="background: rgba(245, 140, 186, 0.15); border-color: #f472b6; color: #fbcfe8;">
            Light's Vigil & 10s Holy Shock
          </span>
        </div>

        <div class="deepdive-talents-grid">
          ${cData.holy.talents.map(t => `
            <div class="talent-feature-card ${t.name.includes("Light's Vigil") || t.name.includes("Holy Shock") || t.name.includes("Unbreakable") ? 'featured-talent' : ''}">
              <div class="talent-card-top">
                <div>
                  <strong class="talent-name" style="color: ${t.name.includes("Light's Vigil") ? '#f5d061' : t.name.includes("Holy Shock") ? '#f472b6' : '#fff'};">${escapeHtml(t.name)}</strong>
                  <span class="talent-type">${escapeHtml(t.type)}</span>
                </div>
                <span class="deepdive-badge badge-verified"><span>✓</span> Verified</span>
              </div>
              <div class="talent-specs-chips">
                ${t.cast ? `<span class="talent-chip">⏱️ ${escapeHtml(t.cast)}</span>` : ''}
                ${t.cd ? `<span class="talent-chip">⌛ ${escapeHtml(t.cd)}</span>` : ''}
                ${t.duration ? `<span class="talent-chip">⏳ ${escapeHtml(t.duration)}</span>` : ''}
              </div>
              <p class="talent-desc">${escapeHtml(t.desc)}</p>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  function renderProtectionPaladinSection(cData) {
    return `
      <div>
        <div class="spec-overview-banner" style="background: rgba(245, 140, 186, 0.08); border-color: rgba(245, 140, 186, 0.3);">
          <div>
            <h4 style="color: #f472b6; font-size: 1.25rem; margin: 0 0 0.25rem;">${escapeHtml(cData.protection.title)}</h4>
            <p style="font-size: 0.9rem; color: #cbd5e1; margin: 0;">${escapeHtml(cData.protection.tagline)}</p>
          </div>
          <span class="status-badge-highlight" style="background: rgba(245, 140, 186, 0.15); border-color: #f472b6; color: #fbcfe8;">
            Dedicated Taunt & Block Mana Sustain
          </span>
        </div>

        <div class="deepdive-talents-grid">
          ${cData.protection.talents.map(t => `
            <div class="talent-feature-card ${t.name.includes("Judgment of Fury") || t.name.includes("Seal of Fury") || t.name.includes("Templar's Bulwark") ? 'featured-talent' : ''}">
              <div class="talent-card-top">
                <div>
                  <strong class="talent-name" style="color: ${t.name.includes("Judgment of Fury") ? '#f5d061' : t.name.includes("Templar's Bulwark") ? '#38bdf8' : '#fff'};">${escapeHtml(t.name)}</strong>
                  <span class="talent-type">${escapeHtml(t.type)}</span>
                </div>
                <span class="deepdive-badge badge-verified"><span>✓</span> Verified</span>
              </div>
              <div class="talent-specs-chips">
                ${t.cast ? `<span class="talent-chip">⏱️ ${escapeHtml(t.cast)}</span>` : ''}
                ${t.cd ? `<span class="talent-chip">⌛ ${escapeHtml(t.cd)}</span>` : ''}
                ${t.range ? `<span class="talent-chip">🎯 ${escapeHtml(t.range)}</span>` : ''}
                ${t.duration ? `<span class="talent-chip">⏳ ${escapeHtml(t.duration)}</span>` : ''}
                ${t.charges ? `<span class="talent-chip">🛡️ ${escapeHtml(t.charges)}</span>` : ''}
              </div>
              <p class="talent-desc">${escapeHtml(t.desc)}</p>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  function renderRetributionPaladinSection(cData) {
    return `
      <div>
        <div class="spec-overview-banner" style="background: rgba(245, 140, 186, 0.08); border-color: rgba(245, 140, 186, 0.3);">
          <div>
            <h4 style="color: #f472b6; font-size: 1.25rem; margin: 0 0 0.25rem;">${escapeHtml(cData.retribution.title)}</h4>
            <p style="font-size: 0.9rem; color: #cbd5e1; margin: 0;">${escapeHtml(cData.retribution.tagline)}</p>
          </div>
          <span class="status-badge-highlight" style="background: rgba(245, 140, 186, 0.15); border-color: #f472b6; color: #fbcfe8;">
            Twist of Light Echoes & Sacred Arbiter
          </span>
        </div>

        <div class="deepdive-talents-grid">
          ${cData.retribution.talents.map(t => `
            <div class="talent-feature-card ${t.name.includes("Twist of Light") || t.name.includes("Sacred Arbiter") || t.name.includes("Sheath of Light") ? 'featured-talent' : ''}">
              <div class="talent-card-top">
                <div>
                  <strong class="talent-name" style="color: ${t.name.includes("Twist of Light") ? '#f5d061' : t.name.includes("Sacred Arbiter") ? '#f472b6' : '#fff'};">${escapeHtml(t.name)}</strong>
                  <span class="talent-type">${escapeHtml(t.type)}</span>
                </div>
                <span class="deepdive-badge badge-verified"><span>✓</span> Verified</span>
              </div>
              <div class="talent-specs-chips">
                ${t.cast ? `<span class="talent-chip">⏱️ ${escapeHtml(t.cast)}</span>` : ''}
                ${t.cd ? `<span class="talent-chip">⌛ ${escapeHtml(t.cd)}</span>` : ''}
                ${t.duration ? `<span class="talent-chip">⏳ ${escapeHtml(t.duration)}</span>` : ''}
              </div>
              <p class="talent-desc">${escapeHtml(t.desc)}</p>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  function renderUndeadPaladinRacesSection(cData) {
    const uData = cData.racialSynergies.undeadDemo;
    const newRaces = cData.racialSynergies.newRaces;

    return `
      <div>
        <div class="tauren-demo-block">
          <div class="spec-overview-banner" style="background: rgba(168, 85, 247, 0.08); border-color: rgba(168, 85, 247, 0.3);">
            <div>
              <h4 style="color: #c084fc; font-size: 1.25rem; margin: 0 0 0.25rem;">${escapeHtml(uData.title)}</h4>
              <p style="font-size: 0.9rem; color: #cbd5e1; margin: 0;">${escapeHtml(uData.subtitle)}</p>
            </div>
            <span class="deepdive-badge badge-demo"><span>🎙️</span> Level-38 Undead Hands-On Test</span>
          </div>

          <div class="deepdive-cards-grid" style="margin-top: 1rem;">
            ${uData.items.map(item => `
              <div class="deepdive-rule-card">
                <div class="rule-card-header">
                  <strong class="rule-card-title">${escapeHtml(item.name)}</strong>
                  <span class="deepdive-badge badge-verified">${escapeHtml(item.statusLabel)}</span>
                </div>
                <p class="rule-card-desc" style="margin-top: 0.5rem;">${escapeHtml(item.desc)}</p>
              </div>
            `).join('')}
          </div>
        </div>

        <div style="margin-top: 2rem;">
          <h4 style="color: var(--text-gold); font-size: 1.15rem; margin-bottom: 0.8rem; display: flex; align-items: center; gap: 0.5rem;">
            <span>🛡️</span> Playable Races for Paladin in WoW Forever
          </h4>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 1rem;">
            ${newRaces.map(r => `
              <div class="deepdive-rule-card" style="border-left: 3px solid ${r.faction === 'Alliance' ? '#3b82f6' : '#ef4444'};">
                <div class="rule-card-header">
                  <strong class="rule-card-title">${escapeHtml(r.race)}</strong>
                  <span class="deepdive-badge badge-exclusive">${escapeHtml(r.badge)}</span>
                </div>
                <span class="role-pill" style="margin: 0.3rem 0; display: inline-block;">${escapeHtml(r.faction)}</span>
                <p class="rule-card-desc">${escapeHtml(r.desc)}</p>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  }

  function renderArmsWarriorSection(cData) {
    return `
      <div>
        <div class="spec-overview-banner" style="background: rgba(199, 156, 110, 0.08); border-color: rgba(199, 156, 110, 0.3);">
          <div>
            <h4 style="color: #fed7aa; font-size: 1.25rem; margin: 0 0 0.25rem;">${escapeHtml(cData.arms.title)}</h4>
            <p style="font-size: 0.9rem; color: #cbd5e1; margin: 0;">${escapeHtml(cData.arms.tagline)}</p>
          </div>
          <span class="status-badge-highlight" style="background: rgba(199, 156, 110, 0.15); border-color: #c79c6e; color: #fed7aa;">
            Spearing Strike & Unified Weaponmaster
          </span>
        </div>

        <div class="deepdive-talents-grid">
          ${cData.arms.talents.map(t => `
            <div class="talent-feature-card ${t.name.includes("Spearing Strike") || t.name.includes("Weaponmaster") || t.name.includes("Improved Slam") ? 'featured-talent' : ''}">
              <div class="talent-card-top">
                <div>
                  <strong class="talent-name" style="color: ${t.name.includes("Spearing Strike") ? '#f5d061' : t.name.includes("Weaponmaster") ? '#fed7aa' : '#fff'};">${escapeHtml(t.name)}</strong>
                  <span class="talent-type">${escapeHtml(t.type)}</span>
                </div>
                <span class="deepdive-badge badge-verified"><span>✓</span> Verified</span>
              </div>
              <div class="talent-specs-chips">
                ${t.cast ? `<span class="talent-chip">⏱️ ${escapeHtml(t.cast)}</span>` : ''}
                ${t.cost ? `<span class="talent-chip">🔴 ${escapeHtml(t.cost)}</span>` : ''}
                ${t.cd ? `<span class="talent-chip">⌛ ${escapeHtml(t.cd)}</span>` : ''}
                ${t.duration ? `<span class="talent-chip">⏳ ${escapeHtml(t.duration)}</span>` : ''}
              </div>
              <p class="talent-desc">${escapeHtml(t.desc)}</p>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  function renderFuryWarriorSection(cData) {
    return `
      <div>
        <div class="spec-overview-banner" style="background: rgba(239, 68, 68, 0.08); border-color: rgba(239, 68, 68, 0.3);">
          <div>
            <h4 style="color: #f87171; font-size: 1.25rem; margin: 0 0 0.25rem;">${escapeHtml(cData.fury.title)}</h4>
            <p style="font-size: 0.9rem; color: #cbd5e1; margin: 0;">${escapeHtml(cData.fury.tagline)}</p>
          </div>
          <span class="status-badge-highlight" style="background: rgba(239, 68, 68, 0.15); border-color: #ef4444; color: #fca5a5;">
            Raging Blows & Berserker Rage Mobility
          </span>
        </div>

        <div class="deepdive-talents-grid">
          ${cData.fury.talents.map(t => `
            <div class="talent-feature-card ${t.name.includes("Raging Blows") || t.name.includes("Dual Wield") || t.name.includes("Berserker Rage") ? 'featured-talent' : ''}">
              <div class="talent-card-top">
                <div>
                  <strong class="talent-name" style="color: ${t.name.includes("Raging Blows") ? '#f5d061' : t.name.includes("Berserker Rage") ? '#f87171' : '#fff'};">${escapeHtml(t.name)}</strong>
                  <span class="talent-type">${escapeHtml(t.type)}</span>
                </div>
                <span class="deepdive-badge badge-verified"><span>✓</span> Verified</span>
              </div>
              <div class="talent-specs-chips">
                ${t.cast ? `<span class="talent-chip">⏱️ ${escapeHtml(t.cast)}</span>` : ''}
                ${t.cost ? `<span class="talent-chip">🔴 ${escapeHtml(t.cost)}</span>` : ''}
                ${t.cd ? `<span class="talent-chip">⌛ ${escapeHtml(t.cd)}</span>` : ''}
                ${t.duration ? `<span class="talent-chip">⏳ ${escapeHtml(t.duration)}</span>` : ''}
              </div>
              <p class="talent-desc">${escapeHtml(t.desc)}</p>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  function renderProtectionWarriorSection(cData) {
    return `
      <div>
        <div class="spec-overview-banner" style="background: rgba(59, 130, 246, 0.08); border-color: rgba(59, 130, 246, 0.3);">
          <div>
            <h4 style="color: #60a5fa; font-size: 1.25rem; margin: 0 0 0.25rem;">${escapeHtml(cData.protection.title)}</h4>
            <p style="font-size: 0.9rem; color: #cbd5e1; margin: 0;">${escapeHtml(cData.protection.tagline)}</p>
          </div>
          <span class="status-badge-highlight" style="background: rgba(59, 130, 246, 0.15); border-color: #3b82f6; color: #93c5fd;">
            Defensive Charge & Shield Bash Silence
          </span>
        </div>

        <div class="deepdive-talents-grid">
          ${cData.protection.talents.map(t => `
            <div class="talent-feature-card ${t.name.includes("Charge in Defensive") || t.name.includes("Shield Avoidance") || t.name.includes("Shield Bash Silence") ? 'featured-talent' : ''}">
              <div class="talent-card-top">
                <div>
                  <strong class="talent-name" style="color: ${t.name.includes("Charge in Defensive") ? '#f5d061' : t.name.includes("Shield Bash Silence") ? '#60a5fa' : '#fff'};">${escapeHtml(t.name)}</strong>
                  <span class="talent-type">${escapeHtml(t.type)}</span>
                </div>
                <span class="deepdive-badge badge-verified"><span>✓</span> Verified</span>
              </div>
              <div class="talent-specs-chips">
                ${t.cast ? `<span class="talent-chip">⏱️ ${escapeHtml(t.cast)}</span>` : ''}
                ${t.cost ? `<span class="talent-chip">🔴 ${escapeHtml(t.cost)}</span>` : ''}
                ${t.cd ? `<span class="talent-chip">⌛ ${escapeHtml(t.cd)}</span>` : ''}
                ${t.duration ? `<span class="talent-chip">⏳ ${escapeHtml(t.duration)}</span>` : ''}
              </div>
              <p class="talent-desc">${escapeHtml(t.desc)}</p>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  function renderHumanWarriorRacesSection(cData) {
    const hData = cData.racialSynergies.humanDemo;
    const newRaces = cData.racialSynergies.newRaces;

    return `
      <div>
        <div class="tauren-demo-block">
          <div class="spec-overview-banner" style="background: rgba(199, 156, 110, 0.08); border-color: rgba(199, 156, 110, 0.3);">
            <div>
              <h4 style="color: #fed7aa; font-size: 1.25rem; margin: 0 0 0.25rem;">${escapeHtml(hData.title)}</h4>
              <p style="font-size: 0.9rem; color: #cbd5e1; margin: 0;">${escapeHtml(hData.subtitle)}</p>
            </div>
            <span class="deepdive-badge badge-demo"><span>🎙️</span> Level-38 Human Hands-On Test</span>
          </div>

          <div class="deepdive-cards-grid" style="margin-top: 1rem;">
            ${hData.items.map(item => `
              <div class="deepdive-rule-card">
                <div class="rule-card-header">
                  <strong class="rule-card-title">${escapeHtml(item.name)}</strong>
                  <span class="deepdive-badge badge-verified">${escapeHtml(item.statusLabel)}</span>
                </div>
                <p class="rule-card-desc" style="margin-top: 0.5rem;">${escapeHtml(item.desc)}</p>
              </div>
            `).join('')}
          </div>
        </div>

        <div style="margin-top: 2rem;">
          <h4 style="color: var(--text-gold); font-size: 1.15rem; margin-bottom: 0.8rem; display: flex; align-items: center; gap: 0.5rem;">
            <span>⚔️</span> Playable Races for Warrior in WoW Forever
          </h4>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 1rem;">
            ${newRaces.map(r => `
              <div class="deepdive-rule-card" style="border-left: 3px solid ${r.faction === 'Alliance' ? '#3b82f6' : '#ef4444'};">
                <div class="rule-card-header">
                  <strong class="rule-card-title">${escapeHtml(r.race)}</strong>
                  <span class="deepdive-badge badge-exclusive">${escapeHtml(r.badge)}</span>
                </div>
                <span class="role-pill" style="margin: 0.3rem 0; display: inline-block;">${escapeHtml(r.faction)}</span>
                <p class="rule-card-desc">${escapeHtml(r.desc)}</p>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  }

  function renderAfflictionWarlockSection(cData) {
    return `
      <div>
        <div class="spec-overview-banner" style="background: rgba(168, 85, 247, 0.08); border-color: rgba(168, 85, 247, 0.3);">
          <div>
            <h4 style="color: #c084fc; font-size: 1.25rem; margin: 0 0 0.25rem;">${escapeHtml(cData.affliction.title)}</h4>
            <p style="font-size: 0.9rem; color: #cbd5e1; margin: 0;">${escapeHtml(cData.affliction.tagline)}</p>
          </div>
          <span class="status-badge-highlight" style="background: rgba(168, 85, 247, 0.15); border-color: #a855f7; color: #e9d5ff;">
            Pandemic Critical DoTs & Drain Hope
          </span>
        </div>

        <div class="deepdive-talents-grid">
          ${cData.affliction.talents.map(t => `
            <div class="talent-feature-card ${t.name.includes("Pandemic") || t.name.includes("Drain Hope") || t.name.includes("Soul Harvest") ? 'featured-talent' : ''}">
              <div class="talent-card-top">
                <div>
                  <strong class="talent-name" style="color: ${t.name.includes("Pandemic") ? '#f5d061' : t.name.includes("Drain Hope") ? '#c084fc' : '#fff'};">${escapeHtml(t.name)}</strong>
                  <span class="talent-type">${escapeHtml(t.type)}</span>
                </div>
                <span class="deepdive-badge badge-verified"><span>✓</span> Verified</span>
              </div>
              <div class="talent-specs-chips">
                ${t.cast ? `<span class="talent-chip">⏱️ ${escapeHtml(t.cast)}</span>` : ''}
                ${t.cd ? `<span class="talent-chip">⌛ ${escapeHtml(t.cd)}</span>` : ''}
                ${t.duration ? `<span class="talent-chip">⏳ ${escapeHtml(t.duration)}</span>` : ''}
                ${t.range ? `<span class="talent-chip">🎯 ${escapeHtml(t.range)}</span>` : ''}
              </div>
              <p class="talent-desc">${escapeHtml(t.desc)}</p>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  function renderDemonologyWarlockSection(cData) {
    return `
      <div>
        <div class="spec-overview-banner" style="background: rgba(148, 130, 201, 0.08); border-color: rgba(148, 130, 201, 0.3);">
          <div>
            <h4 style="color: #ddd6fe; font-size: 1.25rem; margin: 0 0 0.25rem;">${escapeHtml(cData.demonology.title)}</h4>
            <p style="font-size: 0.9rem; color: #cbd5e1; margin: 0;">${escapeHtml(cData.demonology.tagline)}</p>
          </div>
          <span class="status-badge-highlight" style="background: rgba(148, 130, 201, 0.15); border-color: #9482c9; color: #ddd6fe;">
            Demonic Pact & SL/SL 30% Damage Transfer
          </span>
        </div>

        <div class="deepdive-talents-grid">
          ${cData.demonology.talents.map(t => `
            <div class="talent-feature-card ${t.name.includes("Demonic Pact") || t.name.includes("Soul Link") || t.name.includes("Spell Lock") ? 'featured-talent' : ''}">
              <div class="talent-card-top">
                <div>
                  <strong class="talent-name" style="color: ${t.name.includes("Demonic Pact") ? '#f5d061' : t.name.includes("Soul Link") ? '#ddd6fe' : '#fff'};">${escapeHtml(t.name)}</strong>
                  <span class="talent-type">${escapeHtml(t.type)}</span>
                </div>
                <span class="deepdive-badge badge-verified"><span>✓</span> Verified</span>
              </div>
              <div class="talent-specs-chips">
                ${t.cast ? `<span class="talent-chip">⏱️ ${escapeHtml(t.cast)}</span>` : ''}
                ${t.cost ? `<span class="talent-chip">💎 ${escapeHtml(t.cost)}</span>` : ''}
                ${t.cd ? `<span class="talent-chip">⌛ ${escapeHtml(t.cd)}</span>` : ''}
                ${t.duration ? `<span class="talent-chip">⏳ ${escapeHtml(t.duration)}</span>` : ''}
              </div>
              <p class="talent-desc">${escapeHtml(t.desc)}</p>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  function renderDestructionWarlockSection(cData) {
    return `
      <div>
        <div class="spec-overview-banner" style="background: rgba(239, 68, 68, 0.08); border-color: rgba(239, 68, 68, 0.3);">
          <div>
            <h4 style="color: #f87171; font-size: 1.25rem; margin: 0 0 0.25rem;">${escapeHtml(cData.destruction.title)}</h4>
            <p style="font-size: 0.9rem; color: #cbd5e1; margin: 0;">${escapeHtml(cData.destruction.tagline)}</p>
          </div>
          <span class="status-badge-highlight" style="background: rgba(239, 68, 68, 0.15); border-color: #ef4444; color: #fca5a5;">
            Bane of Havoc 50% Transfer & Shadow/Flame
          </span>
        </div>

        <div class="deepdive-talents-grid">
          ${cData.destruction.talents.map(t => `
            <div class="talent-feature-card ${t.name.includes("Bane of Havoc") || t.name.includes("Shadow and Flame") || t.name.includes("Incinerate") ? 'featured-talent' : ''}">
              <div class="talent-card-top">
                <div>
                  <strong class="talent-name" style="color: ${t.name.includes("Bane of Havoc") ? '#f5d061' : t.name.includes("Shadow and Flame") ? '#f87171' : '#fff'};">${escapeHtml(t.name)}</strong>
                  <span class="talent-type">${escapeHtml(t.type)}</span>
                </div>
                <span class="deepdive-badge badge-verified"><span>✓</span> Verified</span>
              </div>
              <div class="talent-specs-chips">
                ${t.cast ? `<span class="talent-chip">⏱️ ${escapeHtml(t.cast)}</span>` : ''}
                ${t.cost ? `<span class="talent-chip">🔥 ${escapeHtml(t.cost)}</span>` : ''}
                ${t.cd ? `<span class="talent-chip">⌛ ${escapeHtml(t.cd)}</span>` : ''}
                ${t.duration ? `<span class="talent-chip">⏳ ${escapeHtml(t.duration)}</span>` : ''}
              </div>
              <p class="talent-desc">${escapeHtml(t.desc)}</p>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  function renderGnomeWarlockRacesSection(cData) {
    const gData = cData.racialSynergies.gnomeDemo;
    const newRaces = cData.racialSynergies.newRaces;

    return `
      <div>
        <div class="tauren-demo-block">
          <div class="spec-overview-banner" style="background: rgba(148, 130, 201, 0.08); border-color: rgba(148, 130, 201, 0.3);">
            <div>
              <h4 style="color: #ddd6fe; font-size: 1.25rem; margin: 0 0 0.25rem;">${escapeHtml(gData.title)}</h4>
              <p style="font-size: 0.9rem; color: #cbd5e1; margin: 0;">${escapeHtml(gData.subtitle)}</p>
            </div>
            <span class="deepdive-badge badge-demo"><span>🎙️</span> Level-38 Gnome Hands-On Test</span>
          </div>

          <div class="deepdive-cards-grid" style="margin-top: 1rem;">
            ${gData.items.map(item => `
              <div class="deepdive-rule-card">
                <div class="rule-card-header">
                  <strong class="rule-card-title">${escapeHtml(item.name)}</strong>
                  <span class="deepdive-badge badge-verified">${escapeHtml(item.statusLabel)}</span>
                </div>
                <p class="rule-card-desc" style="margin-top: 0.5rem;">${escapeHtml(item.desc)}</p>
              </div>
            `).join('')}
          </div>
        </div>

        <div style="margin-top: 2rem;">
          <h4 style="color: var(--text-gold); font-size: 1.15rem; margin-bottom: 0.8rem; display: flex; align-items: center; gap: 0.5rem;">
            <span>🔮</span> Playable Races for Warlock in WoW Forever
          </h4>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 1rem;">
            ${newRaces.map(r => `
              <div class="deepdive-rule-card" style="border-left: 3px solid ${r.faction === 'Alliance' ? '#3b82f6' : '#ef4444'};">
                <div class="rule-card-header">
                  <strong class="rule-card-title">${escapeHtml(r.race)}</strong>
                  <span class="deepdive-badge badge-exclusive">${escapeHtml(r.badge)}</span>
                </div>
                <span class="role-pill" style="margin: 0.3rem 0; display: inline-block;">${escapeHtml(r.faction)}</span>
                <p class="rule-card-desc">${escapeHtml(r.desc)}</p>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  }

  function renderDisciplinePriestSection(cData) {
    return `
      <div>
        <div class="spec-overview-banner" style="background: rgba(255, 255, 255, 0.08); border-color: rgba(255, 255, 255, 0.3);">
          <div>
            <h4 style="color: #ffffff; font-size: 1.25rem; margin: 0 0 0.25rem;">${escapeHtml(cData.discipline.title)}</h4>
            <p style="font-size: 0.9rem; color: #cbd5e1; margin: 0;">${escapeHtml(cData.discipline.tagline)}</p>
          </div>
          <span class="status-badge-highlight" style="background: rgba(255, 255, 255, 0.15); border-color: #ffffff; color: #ffffff;">
            Penance & Soul Warding Shield Spam
          </span>
        </div>

        <div class="deepdive-talents-grid">
          ${cData.discipline.talents.map(t => `
            <div class="talent-feature-card ${t.name.includes("Penance") || t.name.includes("Soul Warding") || t.name.includes("Divine Aegis") ? 'featured-talent' : ''}">
              <div class="talent-card-top">
                <div>
                  <strong class="talent-name" style="color: ${t.name.includes("Penance") ? '#f5d061' : t.name.includes("Soul Warding") ? '#38bdf8' : '#fff'};">${escapeHtml(t.name)}</strong>
                  <span class="talent-type">${escapeHtml(t.type)}</span>
                </div>
                <span class="deepdive-badge badge-verified"><span>✓</span> Verified</span>
              </div>
              <div class="talent-specs-chips">
                ${t.cast ? `<span class="talent-chip">⏱️ ${escapeHtml(t.cast)}</span>` : ''}
                ${t.cd ? `<span class="talent-chip">⌛ ${escapeHtml(t.cd)}</span>` : ''}
                ${t.duration ? `<span class="talent-chip">⏳ ${escapeHtml(t.duration)}</span>` : ''}
              </div>
              <p class="talent-desc">${escapeHtml(t.desc)}</p>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  function renderHolyPriestSection(cData) {
    return `
      <div>
        <div class="spec-overview-banner" style="background: rgba(243, 192, 67, 0.08); border-color: rgba(243, 192, 67, 0.3);">
          <div>
            <h4 style="color: #f5d061; font-size: 1.25rem; margin: 0 0 0.25rem;">${escapeHtml(cData.holy.title)}</h4>
            <p style="font-size: 0.9rem; color: #cbd5e1; margin: 0;">${escapeHtml(cData.holy.tagline)}</p>
          </div>
          <span class="status-badge-highlight" style="background: rgba(243, 192, 67, 0.15); border-color: #f5d061; color: #fde68a;">
            Prayer of Mending & Litany of Light
          </span>
        </div>

        <div class="deepdive-talents-grid">
          ${cData.holy.talents.map(t => `
            <div class="talent-feature-card ${t.name.includes("Prayer of Mending") || t.name.includes("Litany of Light") || t.name.includes("Spirit-to-Spell") ? 'featured-talent' : ''}">
              <div class="talent-card-top">
                <div>
                  <strong class="talent-name" style="color: ${t.name.includes("Prayer of Mending") ? '#f5d061' : t.name.includes("Litany of Light") ? '#38bdf8' : '#fff'};">${escapeHtml(t.name)}</strong>
                  <span class="talent-type">${escapeHtml(t.type)}</span>
                </div>
                <span class="deepdive-badge badge-verified"><span>✓</span> Verified</span>
              </div>
              <div class="talent-specs-chips">
                ${t.cast ? `<span class="talent-chip">⏱️ ${escapeHtml(t.cast)}</span>` : ''}
                ${t.cd ? `<span class="talent-chip">⌛ ${escapeHtml(t.cd)}</span>` : ''}
                ${t.duration ? `<span class="talent-chip">⏳ ${escapeHtml(t.duration)}</span>` : ''}
              </div>
              <p class="talent-desc">${escapeHtml(t.desc)}</p>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  function renderShadowPriestSection(cData) {
    return `
      <div>
        <div class="spec-overview-banner" style="background: rgba(148, 130, 201, 0.08); border-color: rgba(148, 130, 201, 0.3);">
          <div>
            <h4 style="color: #c084fc; font-size: 1.25rem; margin: 0 0 0.25rem;">${escapeHtml(cData.shadow.title)}</h4>
            <p style="font-size: 0.9rem; color: #cbd5e1; margin: 0;">${escapeHtml(cData.shadow.tagline)}</p>
          </div>
          <span class="status-badge-highlight" style="background: rgba(148, 130, 201, 0.15); border-color: #9482c9; color: #ddd6fe;">
            Shadowform -50% Mana & Devouring Plague
          </span>
        </div>

        <div class="deepdive-talents-grid">
          ${cData.shadow.talents.map(t => `
            <div class="talent-feature-card ${t.name.includes("Shadowform") || t.name.includes("Devouring Plague") || t.name.includes("Vampiric Embrace") ? 'featured-talent' : ''}">
              <div class="talent-card-top">
                <div>
                  <strong class="talent-name" style="color: ${t.name.includes("Shadowform") ? '#f5d061' : t.name.includes("Devouring Plague") ? '#c084fc' : '#fff'};">${escapeHtml(t.name)}</strong>
                  <span class="talent-type">${escapeHtml(t.type)}</span>
                </div>
                <span class="deepdive-badge badge-verified"><span>✓</span> Verified</span>
              </div>
              <div class="talent-specs-chips">
                ${t.cast ? `<span class="talent-chip">⏱️ ${escapeHtml(t.cast)}</span>` : ''}
                ${t.cd ? `<span class="talent-chip">⌛ ${escapeHtml(t.cd)}</span>` : ''}
                ${t.duration ? `<span class="talent-chip">⏳ ${escapeHtml(t.duration)}</span>` : ''}
                ${t.range ? `<span class="talent-chip">🎯 ${escapeHtml(t.range)}</span>` : ''}
              </div>
              <p class="talent-desc">${escapeHtml(t.desc)}</p>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  function renderNightElfPriestRacesSection(cData) {
    const nData = cData.racialSynergies.nightElfDemo;
    const newRaces = cData.racialSynergies.newRaces;

    return `
      <div>
        <div class="tauren-demo-block">
          <div class="spec-overview-banner" style="background: rgba(96, 165, 250, 0.08); border-color: rgba(96, 165, 250, 0.3);">
            <div>
              <h4 style="color: #93c5fd; font-size: 1.25rem; margin: 0 0 0.25rem;">${escapeHtml(nData.title)}</h4>
              <p style="font-size: 0.9rem; color: #cbd5e1; margin: 0;">${escapeHtml(nData.subtitle)}</p>
            </div>
            <span class="deepdive-badge badge-demo"><span>🎙️</span> Level-38 Night Elf Hands-On Test</span>
          </div>

          <div class="deepdive-cards-grid" style="margin-top: 1rem;">
            ${nData.items.map(item => `
              <div class="deepdive-rule-card">
                <div class="rule-card-header">
                  <strong class="rule-card-title">${escapeHtml(item.name)}</strong>
                  <span class="deepdive-badge badge-verified">${escapeHtml(item.statusLabel)}</span>
                </div>
                <p class="rule-card-desc" style="margin-top: 0.5rem;">${escapeHtml(item.desc)}</p>
              </div>
            `).join('')}
          </div>
        </div>

        <div style="margin-top: 2rem;">
          <h4 style="color: var(--text-gold); font-size: 1.15rem; margin-bottom: 0.8rem; display: flex; align-items: center; gap: 0.5rem;">
            <span>✨</span> Playable Races for Priest in WoW Forever
          </h4>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 1rem;">
            ${newRaces.map(r => `
              <div class="deepdive-rule-card" style="border-left: 3px solid ${r.faction === 'Alliance' ? '#3b82f6' : '#ef4444'};">
                <div class="rule-card-header">
                  <strong class="rule-card-title">${escapeHtml(r.race)}</strong>
                  <span class="deepdive-badge badge-exclusive">${escapeHtml(r.badge)}</span>
                </div>
                <span class="role-pill" style="margin: 0.3rem 0; display: inline-block;">${escapeHtml(r.faction)}</span>
                <p class="rule-card-desc">${escapeHtml(r.desc)}</p>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  }

  function renderBalanceDruidSection(cData) {
    return `
      <div>
        <div class="spec-overview-banner" style="background: rgba(56, 189, 248, 0.08); border-color: rgba(56, 189, 248, 0.3);">
          <div>
            <h4 style="color: #38bdf8; font-size: 1.25rem; margin: 0 0 0.25rem;">${escapeHtml(cData.balance.title)}</h4>
            <p style="font-size: 0.9rem; color: #cbd5e1; margin: 0;">${escapeHtml(cData.balance.tagline)}</p>
          </div>
          <span class="status-badge-highlight" style="background: rgba(56, 189, 248, 0.15); border-color: #38bdf8; color: #7dd3fc;">
            Eclipse 4 Charges & Balance of Nature
          </span>
        </div>

        <div class="deepdive-talents-grid">
          ${cData.balance.talents.map(t => `
            <div class="talent-feature-card ${t.name.includes("Eclipse") || t.name.includes("Balance of Nature") || t.name.includes("Moonkin Form") ? 'featured-talent' : ''}">
              <div class="talent-card-top">
                <div>
                  <strong class="talent-name" style="color: ${t.name.includes("Eclipse") ? '#f5d061' : t.name.includes("Balance of Nature") ? '#38bdf8' : '#fff'};">${escapeHtml(t.name)}</strong>
                  <span class="talent-type">${escapeHtml(t.type)}</span>
                </div>
                <span class="deepdive-badge badge-verified"><span>✓</span> Verified</span>
              </div>
              <div class="talent-specs-chips">
                ${t.cast ? `<span class="talent-chip">⏱️ ${escapeHtml(t.cast)}</span>` : ''}
                ${t.charges ? `<span class="talent-chip">⚡ ${escapeHtml(t.charges)}</span>` : ''}
                ${t.cd ? `<span class="talent-chip">⌛ ${escapeHtml(t.cd)}</span>` : ''}
                ${t.duration ? `<span class="talent-chip">⏳ ${escapeHtml(t.duration)}</span>` : ''}
              </div>
              <p class="talent-desc">${escapeHtml(t.desc)}</p>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  function renderFeralDruidSection(cData) {
    return `
      <div>
        <div class="spec-overview-banner" style="background: rgba(239, 68, 68, 0.08); border-color: rgba(239, 68, 68, 0.3);">
          <div>
            <h4 style="color: #f87171; font-size: 1.25rem; margin: 0 0 0.25rem;">${escapeHtml(cData.feral.title)}</h4>
            <p style="font-size: 0.9rem; color: #cbd5e1; margin: 0;">${escapeHtml(cData.feral.tagline)}</p>
          </div>
          <span class="status-badge-highlight" style="background: rgba(239, 68, 68, 0.15); border-color: #ef4444; color: #fca5a5;">
            King of Jungle & Bear Defense Scaling
          </span>
        </div>

        <div class="deepdive-talents-grid">
          ${cData.feral.talents.map(t => `
            <div class="talent-feature-card ${t.name.includes("King of the Jungle") || t.name.includes("Berserk") || t.name.includes("Bear Defense-to-Armor") || t.name.includes("Feral Charge") ? 'featured-talent' : ''}">
              <div class="talent-card-top">
                <div>
                  <strong class="talent-name" style="color: ${t.name.includes("King of the Jungle") ? '#f5d061' : t.name.includes("Bear Defense") ? '#38bdf8' : t.name.includes("Berserk") ? '#f87171' : '#fff'};">${escapeHtml(t.name)}</strong>
                  <span class="talent-type">${escapeHtml(t.type)}</span>
                </div>
                <span class="deepdive-badge badge-verified"><span>✓</span> Verified</span>
              </div>
              <div class="talent-specs-chips">
                ${t.cast ? `<span class="talent-chip">⏱️ ${escapeHtml(t.cast)}</span>` : ''}
                ${t.cost ? `<span class="talent-chip">🐾 ${escapeHtml(t.cost)}</span>` : ''}
                ${t.range ? `<span class="talent-chip">🎯 ${escapeHtml(t.range)}</span>` : ''}
                ${t.cd ? `<span class="talent-chip">⌛ ${escapeHtml(t.cd)}</span>` : ''}
                ${t.duration ? `<span class="talent-chip">⏳ ${escapeHtml(t.duration)}</span>` : ''}
              </div>
              <p class="talent-desc">${escapeHtml(t.desc)}</p>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  function renderRestorationDruidSection(cData) {
    return `
      <div>
        <div class="spec-overview-banner" style="background: rgba(74, 222, 128, 0.08); border-color: rgba(74, 222, 128, 0.3);">
          <div>
            <h4 style="color: #4ade80; font-size: 1.25rem; margin: 0 0 0.25rem;">${escapeHtml(cData.restoration.title)}</h4>
            <p style="font-size: 0.9rem; color: #cbd5e1; margin: 0;">${escapeHtml(cData.restoration.tagline)}</p>
          </div>
          <span class="status-badge-highlight" style="background: rgba(74, 222, 128, 0.15); border-color: #4ade80; color: #86efac;">
            Wild Growth & 0.5s GCD Reduction
          </span>
        </div>

        <div class="deepdive-talents-grid">
          ${cData.restoration.talents.map(t => `
            <div class="talent-feature-card ${t.name.includes("Wild Growth") || t.name.includes("Swiftmend") || t.name.includes("0.5s Global Cooldown") ? 'featured-talent' : ''}">
              <div class="talent-card-top">
                <div>
                  <strong class="talent-name" style="color: ${t.name.includes("Wild Growth") ? '#f5d061' : t.name.includes("Swiftmend") ? '#4ade80' : '#fff'};">${escapeHtml(t.name)}</strong>
                  <span class="talent-type">${escapeHtml(t.type)}</span>
                </div>
                <span class="deepdive-badge badge-verified"><span>✓</span> Verified</span>
              </div>
              <div class="talent-specs-chips">
                ${t.cast ? `<span class="talent-chip">⏱️ ${escapeHtml(t.cast)}</span>` : ''}
                ${t.cd ? `<span class="talent-chip">⌛ ${escapeHtml(t.cd)}</span>` : ''}
                ${t.duration ? `<span class="talent-chip">⏳ ${escapeHtml(t.duration)}</span>` : ''}
              </div>
              <p class="talent-desc">${escapeHtml(t.desc)}</p>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  function renderSkyElfDruidRacesSection(cData) {
    const sData = cData.racialSynergies.skyElfDemo;
    const newRaces = cData.racialSynergies.newRaces;

    return `
      <div>
        <div class="tauren-demo-block">
          <div class="spec-overview-banner" style="background: rgba(56, 189, 248, 0.08); border-color: rgba(56, 189, 248, 0.3);">
            <div>
              <h4 style="color: #38bdf8; font-size: 1.25rem; margin: 0 0 0.25rem;">${escapeHtml(sData.title)}</h4>
              <p style="font-size: 0.9rem; color: #cbd5e1; margin: 0;">${escapeHtml(sData.subtitle)}</p>
            </div>
            <span class="deepdive-badge badge-demo"><span>🎙️</span> Level-38 Sky Elf Hands-On Test</span>
          </div>

          <div class="deepdive-cards-grid" style="margin-top: 1rem;">
            ${sData.items.map(item => `
              <div class="deepdive-rule-card">
                <div class="rule-card-header">
                  <strong class="rule-card-title">${escapeHtml(item.name)}</strong>
                  <span class="deepdive-badge badge-verified">${escapeHtml(item.statusLabel)}</span>
                </div>
                <p class="rule-card-desc" style="margin-top: 0.5rem;">${escapeHtml(item.desc)}</p>
              </div>
            `).join('')}
          </div>
        </div>

        <div style="margin-top: 2rem;">
          <h4 style="color: var(--text-gold); font-size: 1.15rem; margin-bottom: 0.8rem; display: flex; align-items: center; gap: 0.5rem;">
            <span>🌿</span> Playable Races for Druid in WoW Forever
          </h4>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 1rem;">
            ${newRaces.map(r => `
              <div class="deepdive-rule-card" style="border-left: 3px solid ${r.faction.includes('Neutral') ? '#10b981' : r.faction === 'Alliance' ? '#3b82f6' : '#ef4444'};">
                <div class="rule-card-header">
                  <strong class="rule-card-title">${escapeHtml(r.race)}</strong>
                  <span class="deepdive-badge badge-exclusive">${escapeHtml(r.badge)}</span>
                </div>
                <span class="role-pill" style="margin: 0.3rem 0; display: inline-block;">${escapeHtml(r.faction)}</span>
                <p class="rule-card-desc">${escapeHtml(r.desc)}</p>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  }

  function renderAssassinationRogueSection(cData) {
    return `
      <div>
        <div class="spec-overview-banner" style="background: rgba(239, 68, 68, 0.08); border-color: rgba(239, 68, 68, 0.3);">
          <div>
            <h4 style="color: #f87171; font-size: 1.25rem; margin: 0 0 0.25rem;">${escapeHtml(cData.assassination.title)}</h4>
            <p style="font-size: 0.9rem; color: #cbd5e1; margin: 0;">${escapeHtml(cData.assassination.tagline)}</p>
          </div>
          <span class="status-badge-highlight" style="background: rgba(239, 68, 68, 0.15); border-color: #ef4444; color: #fca5a5;">
            Daggerless Mutilate & AP/Crit Poisons
          </span>
        </div>

        <div class="deepdive-talents-grid">
          ${cData.assassination.talents.map(t => `
            <div class="talent-feature-card ${t.name.includes("Mutilate") || t.name.includes("Venom Maintenance") || t.name.includes("Kidney Shot") ? 'featured-talent' : ''}">
              <div class="talent-card-top">
                <div>
                  <strong class="talent-name" style="color: ${t.name.includes("Mutilate") ? '#f5d061' : t.name.includes("Venom") ? '#4ade80' : '#fff'};">${escapeHtml(t.name)}</strong>
                  <span class="talent-type">${escapeHtml(t.type)}</span>
                </div>
                <span class="deepdive-badge badge-verified"><span>✓</span> Verified</span>
              </div>
              <div class="talent-specs-chips">
                ${t.cast ? `<span class="talent-chip">⏱️ ${escapeHtml(t.cast)}</span>` : ''}
                ${t.cost ? `<span class="talent-chip">🟡 ${escapeHtml(t.cost)}</span>` : ''}
                ${t.cd ? `<span class="talent-chip">⌛ ${escapeHtml(t.cd)}</span>` : ''}
                ${t.duration ? `<span class="talent-chip">⏳ ${escapeHtml(t.duration)}</span>` : ''}
              </div>
              <p class="talent-desc">${escapeHtml(t.desc)}</p>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  function renderCombatRogueSection(cData) {
    return `
      <div>
        <div class="spec-overview-banner" style="background: rgba(245, 240, 105, 0.08); border-color: rgba(245, 240, 105, 0.3);">
          <div>
            <h4 style="color: #fef08a; font-size: 1.25rem; margin: 0 0 0.25rem;">${escapeHtml(cData.combat.title)}</h4>
            <p style="font-size: 0.9rem; color: #cbd5e1; margin: 0;">${escapeHtml(cData.combat.tagline)}</p>
          </div>
          <span class="status-badge-highlight" style="background: rgba(245, 240, 105, 0.15); border-color: #fef08a; color: #fef08a;">
            Restless Blades Cooldown Cycling
          </span>
        </div>

        <div class="deepdive-talents-grid">
          ${cData.combat.talents.map(t => `
            <div class="talent-feature-card ${t.name.includes("Restless Blades") || t.name.includes("Blade Flurry") || t.name.includes("Adrenaline Rush") || t.name.includes("Improved Kick") ? 'featured-talent' : ''}">
              <div class="talent-card-top">
                <div>
                  <strong class="talent-name" style="color: ${t.name.includes("Restless Blades") ? '#f5d061' : t.name.includes("Blade Flurry") ? '#fef08a' : '#fff'};">${escapeHtml(t.name)}</strong>
                  <span class="talent-type">${escapeHtml(t.type)}</span>
                </div>
                <span class="deepdive-badge badge-verified"><span>✓</span> Verified</span>
              </div>
              <div class="talent-specs-chips">
                ${t.cast ? `<span class="talent-chip">⏱️ ${escapeHtml(t.cast)}</span>` : ''}
                ${t.cost ? `<span class="talent-chip">🟡 ${escapeHtml(t.cost)}</span>` : ''}
                ${t.cd ? `<span class="talent-chip">⌛ ${escapeHtml(t.cd)}</span>` : ''}
                ${t.duration ? `<span class="talent-chip">⏳ ${escapeHtml(t.duration)}</span>` : ''}
              </div>
              <p class="talent-desc">${escapeHtml(t.desc)}</p>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  function renderSubtletyRogueSection(cData) {
    return `
      <div>
        <div class="spec-overview-banner" style="background: rgba(168, 85, 247, 0.08); border-color: rgba(168, 85, 247, 0.3);">
          <div>
            <h4 style="color: #c084fc; font-size: 1.25rem; margin: 0 0 0.25rem;">${escapeHtml(cData.subtlety.title)}</h4>
            <p style="font-size: 0.9rem; color: #cbd5e1; margin: 0;">${escapeHtml(cData.subtlety.tagline)}</p>
          </div>
          <span class="status-badge-highlight" style="background: rgba(168, 85, 247, 0.15); border-color: #a855f7; color: #e9d5ff;">
            Thousand Cuts Rupture Engine & Preparation
          </span>
        </div>

        <div class="deepdive-talents-grid">
          ${cData.subtlety.talents.map(t => `
            <div class="talent-feature-card ${t.name.includes("Thousand Cuts") || t.name.includes("Serrated Strike") || t.name.includes("Dirty Deeds") || t.name.includes("Preparation") ? 'featured-talent' : ''}">
              <div class="talent-card-top">
                <div>
                  <strong class="talent-name" style="color: ${t.name.includes("Thousand Cuts") ? '#f5d061' : t.name.includes("Dirty Deeds") ? '#c084fc' : '#fff'};">${escapeHtml(t.name)}</strong>
                  <span class="talent-type">${escapeHtml(t.type)}</span>
                </div>
                <span class="deepdive-badge badge-verified"><span>✓</span> Verified</span>
              </div>
              <div class="talent-specs-chips">
                ${t.cast ? `<span class="talent-chip">⏱️ ${escapeHtml(t.cast)}</span>` : ''}
                ${t.cost ? `<span class="talent-chip">🟡 ${escapeHtml(t.cost)}</span>` : ''}
                ${t.cd ? `<span class="talent-chip">⌛ ${escapeHtml(t.cd)}</span>` : ''}
                ${t.duration ? `<span class="talent-chip">⏳ ${escapeHtml(t.duration)}</span>` : ''}
              </div>
              <p class="talent-desc">${escapeHtml(t.desc)}</p>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  function renderTrollRogueRacesSection(cData) {
    const tData = cData.racialSynergies.trollDemo;
    const newRaces = cData.racialSynergies.newRaces;

    return `
      <div>
        <div class="tauren-demo-block">
          <div class="spec-overview-banner" style="background: rgba(245, 240, 105, 0.08); border-color: rgba(245, 240, 105, 0.3);">
            <div>
              <h4 style="color: #fef08a; font-size: 1.25rem; margin: 0 0 0.25rem;">${escapeHtml(tData.title)}</h4>
              <p style="font-size: 0.9rem; color: #cbd5e1; margin: 0;">${escapeHtml(tData.subtitle)}</p>
            </div>
            <span class="deepdive-badge badge-demo"><span>🎙️</span> Level-38 Troll Hands-On Test</span>
          </div>

          <div class="deepdive-cards-grid" style="margin-top: 1rem;">
            ${tData.items.map(item => `
              <div class="deepdive-rule-card">
                <div class="rule-card-header">
                  <strong class="rule-card-title">${escapeHtml(item.name)}</strong>
                  <span class="deepdive-badge badge-verified">${escapeHtml(item.statusLabel)}</span>
                </div>
                <p class="rule-card-desc" style="margin-top: 0.5rem;">${escapeHtml(item.desc)}</p>
              </div>
            `).join('')}
          </div>
        </div>

        <div style="margin-top: 2rem;">
          <h4 style="color: var(--text-gold); font-size: 1.15rem; margin-bottom: 0.8rem; display: flex; align-items: center; gap: 0.5rem;">
            <span>🗡️</span> Playable Races for Rogue in WoW Forever
          </h4>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 1rem;">
            ${newRaces.map(r => `
              <div class="deepdive-rule-card" style="border-left: 3px solid ${r.faction === 'Alliance' ? '#3b82f6' : '#ef4444'};">
                <div class="rule-card-header">
                  <strong class="rule-card-title">${escapeHtml(r.race)}</strong>
                  <span class="deepdive-badge badge-exclusive">${escapeHtml(r.badge)}</span>
                </div>
                <span class="role-pill" style="margin: 0.3rem 0; display: inline-block;">${escapeHtml(r.faction)}</span>
                <p class="rule-card-desc">${escapeHtml(r.desc)}</p>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  }

  /**
   * Helper: Open interactive talent modal from Deep Dives
   */
  function openDeepDiveTalentModal(classId, specId, specName, buildUrl) {
    if (window.TalentTreeModule) {
      window.TalentTreeModule.openModal({
        classId: classId,
        specId: specId,
        specName: specName,
        buildUrl: buildUrl,
        maxPoints: (window.selectedBuildLevel === '20') ? 16 : 26,
        blankSlate: false
      });
    } else {
      console.warn("TalentTreeModule is not loaded.");
    }
  }

  function openDeepDiveBlankCalculator(classId, className) {
    if (window.TalentTreeModule) {
      window.TalentTreeModule.openModal({
        classId: classId,
        specName: `${className} Custom Build`,
        blankSlate: true,
        maxPoints: (window.selectedBuildLevel === '20') ? 16 : 26
      });
    }
  }

  function renderBetaBuildsSection(cData) {
    if (!cData.betaBuilds) {
      return `
        <div class="beta-builds-wrapper">
          <div class="beta-builds-header-callout">
            <h3 style="color: #fff; font-size: 1.3rem;">⚡ Level 20 & 30 Closed Beta Spec Builds</h3>
            <p style="color: #cbd5e1; font-size: 0.95rem; margin-top: 0.4rem;">
              Theorycrafted talent builds and dungeon rotations for this class are currently being compiled from closed beta testing.
            </p>
          </div>
        </div>
      `;
    }

    window.selectedBuildLevel = window.selectedBuildLevel || '30';
    const activeLevel = window.selectedBuildLevel;
    const hasLevelVariants = !!(cData.betaBuilds.level30 || cData.betaBuilds.level20);
    const activeBuildContainer = (activeLevel === '30' && cData.betaBuilds.level30) 
      ? cData.betaBuilds.level30 
      : (cData.betaBuilds.level20 || cData.betaBuilds);
    const activeSpecs = activeBuildContainer.specs || cData.betaBuilds.specs || [];

    window.selectedBetaBuildSpecIndex = window.selectedBetaBuildSpecIndex || {};
    let currentSpecIdx = window.selectedBetaBuildSpecIndex[cData.id] || 0;
    if (currentSpecIdx >= activeSpecs.length) currentSpecIdx = 0;
    const currentSpec = activeSpecs[currentSpecIdx] || {};

    // 1. Resolve authentic points map for this spec
    let pointsMap = {};
    if (window.TalentTreeModule) {
      if (currentSpec.buildUrl) {
        pointsMap = window.TalentTreeModule.parseBuildUrl(cData.id, currentSpec.buildUrl);
      } else if (currentSpec.wowheadCalcUrl) {
        pointsMap = window.TalentTreeModule.parseBuildUrl(cData.id, currentSpec.wowheadCalcUrl);
      }
      if ((!pointsMap || Object.keys(pointsMap).length === 0) && currentSpec.talents) {
        pointsMap = window.TalentTreeModule.parseSpecTalents(cData.id, currentSpec.talents);
      }
    }
    window.currentDeepDivePointsMap = pointsMap;

    const classTalentsData = (window.WOW_TALENTS_DATA && window.WOW_TALENTS_DATA[cData.id]) ? window.WOW_TALENTS_DATA[cData.id] : null;
    const treePointCounts = classTalentsData ? classTalentsData.trees.map((_, idx) => {
      return window.TalentTreeModule ? window.TalentTreeModule.getTreePoints(idx, pointsMap, cData.id) : 0;
    }) : [0, 0, 0];
    const totalAllocatedPoints = treePointCounts.reduce((sum, p) => sum + p, 0);
    const treePointsSummary = treePointCounts.join(' / ');
    window.deepDiveTalentViewMode = window.deepDiveTalentViewMode || 'tree';
    const currentViewMode = window.deepDiveTalentViewMode;

    const inlineTreesHtml = window.TalentTreeModule 
      ? window.TalentTreeModule.renderSpecTreesHtml({
          classId: cData.id,
          points: pointsMap,
          viewMode: currentViewMode === 'cards' ? 'cards' : 'grid',
          cardSearchQuery: window.deepDiveCardSearchQuery || ''
        })
      : '<div class="bis-talent-empty-state">Talent tree module loading...</div>';

    return `
      <div class="beta-builds-wrapper">
        <!-- Beta Phase 2 Header Callout -->
        <div class="beta-builds-header-callout">
          <div class="beta-callout-top">
            <div style="display: flex; align-items: center; gap: 0.6rem; flex-wrap: wrap;">
              <h3 style="font-size: 1.35rem; color: #fff; margin: 0;">⚡ Level 20 & Level 30 Closed Beta Theorycraft & Spec Builds</h3>
              <span class="beta-disclaimer-badge">Closed Beta Phase 2 • Level 30 Cap (Live Today!)</span>
              <span class="deepdive-badge badge-verified"><span>✓</span> 21 Talent Points Active</span>
            </div>
            <div style="display: flex; gap: 0.5rem; align-items: center; flex-wrap: wrap;">
              <button type="button" class="talent-calc-link-btn" onclick="window.navigateToGuide ? window.navigateToGuide((({hunter: 'guide-hunter-pets', warrior: 'guide-class-warrior', paladin: 'guide-class-paladin', rogue: 'guide-class-rogue', priest: 'guide-class-priest', shaman: 'guide-class-shaman', mage: 'guide-battle-mage', warlock: 'guide-class-warlock', druid: 'guide-druid-forms'}[cData.id]) || ('guide-class-' + cData.id))) : (document.querySelector('.nav-tab-btn[data-tab=&quot;guides&quot;]')?.click())" style="padding: 0.35rem 0.75rem; font-size: 0.78rem; background: linear-gradient(135deg, rgba(243, 192, 67, 0.25), rgba(180, 83, 9, 0.4)); border-color: var(--border-gold); color: #fff; cursor: pointer;">
                <span>📖</span> ${escapeHtml(cData.name)} Guide ➔
              </button>
              <a href="https://www.wowhead.com/forever/guides" target="_blank" rel="noopener" class="talent-calc-link-btn" style="padding: 0.35rem 0.75rem; font-size: 0.78rem;">
                <span>📚</span> Wowhead Guides ↗
              </a>
              <a href="https://www.warcrafttavern.com/forever/" target="_blank" rel="noopener" class="talent-calc-link-btn" style="padding: 0.35rem 0.75rem; font-size: 0.78rem; background: linear-gradient(135deg, #854d0e, #ca8a04);">
                <span>🍺</span> Warcraft Tavern ↗
              </a>
            </div>
          </div>
          <p style="font-size: 0.9rem; color: #cbd5e1; margin: 0.5rem 0 0.8rem; line-height: 1.55;">
            In <strong>WoW: Forever Closed Beta Phase 2</strong>, the level cap expands to <strong>Level 30</strong> with today's patch, unlocking up to <strong>21 talent points</strong> (levels 10–30). Additional talent points (+2 to +5) can also be unlocked early via <strong>Legacy Discovery Milestones</strong>. Below are the optimal leveling, dungeon speed-clearing, and PvP specs datamined and verified from beta testers.
          </p>
          <div style="font-size: 0.78rem; color: #94a3b8; display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap;">
            <span>⚠️ <em>Beta Notice: Talent tree positions, spell values, and weapon scaling are actively tuned weekly before the official November 4th launch.</em></span>
          </div>
        </div>

        <!-- Level Bracket Toggle -->
        ${hasLevelVariants ? `
          <div class="level-bracket-toggle-wrap">
            <span class="level-toggle-label">Active Bracket:</span>
            <button class="level-bracket-btn ${activeLevel === '30' ? 'active' : ''}" data-build-level="30">
              <span class="bracket-badge">Live Phase 2</span> Level 30 Cap (21 Talent Points)
            </button>
            <button class="level-bracket-btn ${activeLevel === '20' ? 'active' : ''}" data-build-level="20">
              <span class="bracket-badge">Phase 1</span> Level 20 Cap (11 Talent Points)
            </button>
          </div>
        ` : ''}

        <!-- Spec Switcher Bar -->
        <div class="beta-spec-tabs-bar">
          <span style="font-size: 0.82rem; font-weight: 700; color: var(--text-gold); text-transform: uppercase; letter-spacing: 0.05em; margin-right: 0.4rem;">Select Spec:</span>
          ${activeSpecs.map((spec, idx) => `
            <button class="beta-spec-tab-btn ${idx === currentSpecIdx ? 'active' : ''}" data-spec-index="${idx}">
              <span>${spec.icon}</span> ${escapeHtml(spec.name)}
              <span style="font-size: 0.72rem; opacity: 0.75; font-weight: normal;">• ${escapeHtml(spec.role)}</span>
            </button>
          `).join('')}
        </div>

        <!-- Active Spec Detail Panel -->
        <div class="beta-spec-detail-panel">
          <!-- Hero Banner -->
          <div class="spec-hero-banner" style="border-left: 4px solid ${cData.color || '#eab308'};">
            <div>
              <div style="display: flex; align-items: center; gap: 0.75rem; flex-wrap: wrap; margin-bottom: 0.35rem;">
                <span style="font-size: 2rem;">${currentSpec.icon}</span>
                <div>
                  <h3 style="font-size: 1.5rem; color: #fff; margin: 0;">${escapeHtml(currentSpec.name)}</h3>
                  <span style="font-size: 0.85rem; color: var(--text-gold); font-weight: 600;">${escapeHtml(currentSpec.role)}</span>
                </div>
              </div>
              <p style="font-size: 0.95rem; color: #cbd5e1; margin: 0.4rem 0 0; max-width: 650px;">
                ${escapeHtml(currentSpec.tagline)}
              </p>
            </div>

            <div style="display: flex; flex-direction: column; align-items: flex-end; gap: 0.6rem;">
              <div class="spec-hero-meta">
                <span class="role-pill" style="font-size: 0.8rem;">Stat: ${escapeHtml(currentSpec.statPriority || 'Intellect / Spirit')}</span>
                <span class="role-pill" style="font-size: 0.8rem; background: rgba(59, 130, 246, 0.2); border-color: #3b82f6; color: #93c5fd;">Weapon: ${escapeHtml(currentSpec.bestWeapon || 'Two-Hand')}</span>
              </div>
              <div style="display: flex; gap: 0.4rem; flex-wrap: wrap;">
                <button type="button" class="talent-calc-link-btn deepdive-open-calc-btn" data-class="${cData.id}" data-spec="${currentSpec.specId || currentSpec.id}" style="padding: 0.35rem 0.75rem; font-size: 0.78rem;">
                  <span>🌟</span> Full Calculator
                </button>
                ${currentSpec.wowheadCalcUrl ? `
                  <a href="${currentSpec.wowheadCalcUrl}" target="_blank" rel="noopener" class="talent-calc-link-btn" style="padding: 0.35rem 0.75rem; font-size: 0.78rem;">
                    <span>🔗</span> Wowhead ↗
                  </a>
                ` : ''}
              </div>
            </div>
          </div>

          <!-- Full-Width Talent Tree Box -->
          <div class="build-feature-box deepdive-talent-box" id="deepdive-talent-tree-section">
            <div class="deepdive-talent-head-row">
              <div class="deepdive-talent-title-wrap">
                <h4>
                  <span>🧬</span> ${(activeBuildContainer.talentPointsTotal || (activeLevel === '30' ? 21 : 11))}-Point Talent Allocation
                </h4>
                <span class="bis-points-badge" style="font-size: 0.78rem; padding: 0.2rem 0.5rem; background: rgba(234, 179, 8, 0.15); border: 1px solid #eab308; color: #fef08a; border-radius: 4px; font-weight: 700;">
                  ${treePointsSummary} (${totalAllocatedPoints} Pts)
                </span>
              </div>

              <div class="deepdive-talent-header-controls">
                <!-- View Mode Toggle -->
                <div style="display: flex; gap: 0.25rem;">
                  <button type="button" class="deepdive-view-toggle-btn ${currentViewMode === 'tree' ? 'active' : ''}" data-view="tree" title="View 3-Tree Visual Matrix">
                    <span>🔲</span> Visual Trees
                  </button>
                  <button type="button" class="deepdive-view-toggle-btn ${currentViewMode === 'cards' ? 'active' : ''}" data-view="cards" title="View Detailed Talent Cards">
                    <span>📜</span> Cards
                  </button>
                </div>

                <!-- Open Interactive Calculator Modals -->
                <div style="display: flex; gap: 0.4rem; flex-wrap: wrap;">
                  <button type="button" class="deepdive-open-calc-btn talent-calc-link-btn" data-class="${cData.id}" data-spec="${currentSpec.specId || currentSpec.id}" style="padding: 0.35rem 0.75rem; font-size: 0.78rem;" title="Open full 4x7 interactive calculator in dedicated modal">
                    <span>🌟</span> Full Calculator
                  </button>
                  <button type="button" class="deepdive-blank-calc-btn talent-calc-link-btn" data-class="${cData.id}" style="padding: 0.35rem 0.75rem; font-size: 0.78rem; background: rgba(255, 255, 255, 0.08); border-color: rgba(255, 255, 255, 0.2);" title="Customize your own talent build from scratch">
                    <span>⚡</span> Blank Slate
                  </button>
                </div>
              </div>
            </div>

            <!-- Full 3-Tree Grid Container -->
            <div id="deepdive-inline-talents-container" class="deepdive-inline-talents-wrapper">
              ${inlineTreesHtml}
            </div>

            ${currentSpec.legacyNotes ? `
              <div style="background: rgba(56, 189, 248, 0.1); border: 1px solid rgba(56, 189, 248, 0.3); border-radius: var(--radius-sm); padding: 0.75rem 0.9rem; margin-top: 1rem; font-size: 0.82rem; color: #bae6fd;">
                <strong style="color: #38bdf8; display: flex; align-items: center; gap: 0.4rem; margin-bottom: 0.2rem;">
                  <span>✨</span> Legacy Discovery Extra Points (+2 to +5):
                </strong>
                ${escapeHtml(currentSpec.legacyNotes)}
              </div>
            ` : ''}
          </div>

          <!-- Combat Priority & Rotational Loop (Pushed Down Below Talents, Full Width!) -->
          <div class="build-feature-box deepdive-rotation-box">
            <h4>
              <span>⚔️</span> Level ${activeBuildContainer.levelCap || activeLevel} Combat Priority & Rotational Loop
            </h4>
            <div class="deepdive-rotation-wrap">
              <ol class="rotation-step-list deepdive-rotation-step-list">
                ${(currentSpec.rotation || []).map(r => `
                  <li class="rotation-step-item">
                    <div>
                      <strong style="color: #fff; font-size: 0.92rem; display: block; margin-bottom: 0.2rem;">${escapeHtml(r.label)}</strong>
                      <span style="font-size: 0.88rem; line-height: 1.5; color: #cbd5e1;">${escapeHtml(r.desc)}</span>
                    </div>
                  </li>
                `).join('')}
              </ol>
            </div>
          </div>

          <!-- Bottom Row: Dungeon BiS & Camping / Class Quests -->
          <div class="beta-build-grid-2col">
            <!-- Dungeon BiS Gear -->
            <div class="build-feature-box">
              <h4>
                <span>🛡️</span> Level ${activeLevel === '30' ? '25–33 (Dalaran, Excavation Site 4, RFK, BFD)' : '15–20 (SFK, Deadmines, WC)'} Dungeon Pre-BiS Targets
              </h4>
              <div class="dungeon-bis-table-wrap">
                <table class="dungeon-bis-table">
                  <thead>
                    <tr>
                      <th>Slot</th>
                      <th>Item Name</th>
                      <th>Source Dungeon / Boss</th>
                      <th>Key Stats & Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${(currentSpec.bisGear || []).map(g => `
                      <tr>
                        <td style="font-weight: 600; color: #fff;">${escapeHtml(g.slot)}</td>
                        <td><span class="${g.item.includes('Thane') || g.item.includes('Necromantic') || g.item.includes('Arugal') || g.item.includes('Smite') || g.item.includes('Cruel') || g.item.includes('Barb') || g.item.includes('Venomstrike') || g.item.includes('Dalaran') || g.item.includes('Excavation') || g.item.includes('Kirin') || g.item.includes('Triprunner') ? 'item-quality-blue' : 'item-quality-green'}">${escapeHtml(g.item)}</span></td>
                        <td style="color: var(--text-gold); font-size: 0.82rem;">${escapeHtml(g.source)}</td>
                        <td style="font-size: 0.8rem; color: #94a3b8;">${escapeHtml(g.stats)}</td>
                      </tr>
                    `).join('')}
                  </tbody>
                </table>
              </div>
            </div>

            <!-- Camping Perk & Class Quests -->
            <div class="build-feature-box">
              <h4>
                <span>⛺</span> Camping Perks & Level ${activeBuildContainer.levelCap || activeLevel} Class Mechanics
              </h4>
              <div style="display: flex; flex-direction: column; gap: 1rem;">
                ${currentSpec.campingPerk ? `
                  <div style="background: rgba(0, 0, 0, 0.35); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: var(--radius-sm); padding: 0.85rem;">
                    <div style="margin-bottom: 0.4rem;">
                      <span class="camping-perk-badge">⛺ ${escapeHtml(currentSpec.campingPerk.name)}</span>
                    </div>
                    <p style="font-size: 0.84rem; color: #cbd5e1; margin: 0; line-height: 1.45;">
                      ${escapeHtml(currentSpec.campingPerk.desc)}
                    </p>
                  </div>
                ` : ''}

                ${currentSpec.classQuestNote ? `
                  <div style="background: rgba(234, 179, 8, 0.08); border: 1px solid rgba(234, 179, 8, 0.25); border-radius: var(--radius-sm); padding: 0.85rem;">
                    <strong style="color: var(--text-gold); font-size: 0.88rem; display: flex; align-items: center; gap: 0.4rem; margin-bottom: 0.3rem;">
                      <span>📜</span> Level 20 Milestone Class Quest
                    </strong>
                    <p style="font-size: 0.84rem; color: #cbd5e1; margin: 0; line-height: 1.45;">
                      ${escapeHtml(currentSpec.classQuestNote)}
                    </p>
                  </div>
                ` : ''}

                <div style="background: rgba(16, 185, 129, 0.08); border: 1px solid rgba(16, 185, 129, 0.25); border-radius: var(--radius-sm); padding: 0.85rem;">
                  <strong style="color: #6ee7b7; font-size: 0.88rem; display: flex; align-items: center; gap: 0.4rem; margin-bottom: 0.3rem;">
                    <span>🏰</span> Dungeon XP & Quest Policy in WoW Forever
                  </strong>
                  <p style="font-size: 0.82rem; color: #94a3b8; margin: 0; line-height: 1.45;">
                    Raw trash mob experience inside dungeons is reduced to prevent repetitive dungeon boosting. However, completed <strong>Dungeon Quests grant massive bonus XP (up to 40% of a level per quest) and upgraded Rare (Blue) gear</strong>. Always collect every dungeon quest before entering!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  function renderForensicMatrixSection(cData) {
    return `
      <div class="forensic-matrix-wrapper">
        <div class="table-responsive-container">
          <table class="forensic-table">
            <thead>
              <tr>
                <th>Feature / Ability</th>
                <th>Category</th>
                <th>Tested Mechanics & Values</th>
                <th>Verification Status</th>
                <th>Primary Source</th>
              </tr>
            </thead>
            <tbody>
              ${cData.forensicMatrix.map(row => `
                <tr>
                  <td><strong style="color: #fff;">${escapeHtml(row.feature)}</strong></td>
                  <td><span class="matrix-cat-pill">${escapeHtml(row.category)}</span></td>
                  <td style="color: #cbd5e1; font-size: 0.88rem;">${escapeHtml(row.details)}</td>
                  <td>
                    <span class="deepdive-badge ${row.statusType === 'verified' ? 'badge-verified' : row.statusType === 'demo' ? 'badge-demo' : 'badge-exclusive'}">
                      ${escapeHtml(row.status)}
                    </span>
                  </td>
                  <td style="color: var(--text-gold); font-size: 0.82rem;">${escapeHtml(row.source)}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  // Initial render
  renderDeepDiveChips();
  renderDeepDiveContent();
}

