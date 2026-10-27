/**
 * World of Warcraft: Forever - Class Deep Dives Module
 * Handles Class Selector Chips, Sub-Tab Filtering, Dossiers, Spec Renderers, and Forensics Matrix.
 */

function initClassDeepDives() {
  const escapeHtml = window.escapeHtml || (s => String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"));

  function openDeepDiveTalentModal(...args) {
    if (window.WOW_DEEPDIVES_BUILDS && window.WOW_DEEPDIVES_BUILDS.openDeepDiveTalentModal) {
      window.WOW_DEEPDIVES_BUILDS.openDeepDiveTalentModal(...args);
    }
  }

  function openDeepDiveBlankCalculator(...args) {
    if (window.WOW_DEEPDIVES_BUILDS && window.WOW_DEEPDIVES_BUILDS.openDeepDiveBlankCalculator) {
      window.WOW_DEEPDIVES_BUILDS.openDeepDiveBlankCalculator(...args);
    }
  }

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
    window.selectedDeepDiveClassId = selectedDeepDiveClassId;
    if (window.WOW_DEEPDIVES_PROGRESSION?.hideWeaponTooltip) {
      window.WOW_DEEPDIVES_PROGRESSION.hideWeaponTooltip();
    }
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
          ${(() => {
            const tabs = (cData.subTabs || [
              { id: "overview", label: "Full Dossier", icon: "📑" },
              { id: "core", label: `Core Rules & QoL (${cData.coreRules ? cData.coreRules.length : 0})`, icon: "📜" },
              { id: "matrix", label: `Verification Matrix (${cData.forensicMatrix ? cData.forensicMatrix.length : 0})`, icon: "🔬" }
            ]).slice();

            const progTabs = [
              { id: "spellbook", label: "1–60 Spellbook", icon: "📖" },
              { id: "weapons", label: "Weapon Path", icon: "⚔️" }
            ];

            if (['mage', 'priest', 'warlock'].includes(cData.id)) {
              progTabs.push({ id: "wands", label: "Wand Path", icon: "🪄" });
            }

            if (['mage', 'priest', 'warlock', 'druid', 'shaman', 'paladin', 'warrior'].includes(cData.id)) {
              const isShield = ['warrior', 'paladin', 'shaman'].includes(cData.id);
              const isDruid = cData.id === 'druid';
              progTabs.push({
                id: "offhands",
                label: isShield ? "Shield Path" : (isDruid ? "Off-Hand & Idols" : "Off-Hand Path"),
                icon: isShield ? "🛡️" : "🔮"
              });
            }

            progTabs.push(
              { id: "macros", label: "Macros", icon: "📜" },
              { id: "milestones", label: "Leveling Milestones", icon: "🗺️" }
            );
            for (const pt of progTabs) {
              if (!tabs.some(t => t.id === pt.id)) tabs.push(pt);
            }

            return tabs.map(tab => {
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
            }).join('');
          })()}
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

    if (window.WOW_DEEPDIVES_PROGRESSION && window.WOW_DEEPDIVES_PROGRESSION.setupEventListeners) {
      window.WOW_DEEPDIVES_PROGRESSION.setupEventListeners(contentContainer, () => renderDeepDiveContent());
    }
  }

  window.renderDeepDiveContent = renderDeepDiveContent;

  function renderDeepDiveSubTabBody(cData, subtab) {
    if (['spellbook', 'weapons', 'wands', 'offhands', 'macros', 'milestones'].includes(subtab)) {
      return window.WOW_DEEPDIVES_PROGRESSION?.renderProgressionSubtab(subtab, cData) || '<div class="deepdive-loading">Loading progression...</div>';
    } else if (subtab === 'betaBuilds' && cData.betaBuilds) {
      return (window.WOW_DEEPDIVES_BUILDS?.renderBetaBuildsSection || renderBetaBuildsSection)(cData);
    } else if (subtab === 'core') {
      return (window.WOW_DEEPDIVES_SPECS?.renderCoreRulesSection || renderCoreRulesSection)(cData);
    } else if (subtab === 'matrix') {
      return (window.WOW_DEEPDIVES_BUILDS?.renderForensicMatrixSection || renderForensicMatrixSection)(cData);
    } else if (subtab === 'survival' && cData.survival) {
      return (window.WOW_DEEPDIVES_SPECS?.renderSurvivalSection || renderSurvivalSection)(cData);
    } else if (subtab === 'marksmanship' && cData.marksmanship) {
      return (window.WOW_DEEPDIVES_SPECS?.renderMarksmanshipSection || renderMarksmanshipSection)(cData);
    } else if (subtab === 'beastmastery' && cData.beastMastery) {
      return (window.WOW_DEEPDIVES_SPECS?.renderBeastMasterySection || renderBeastMasterySection)(cData);
    } else if (subtab === 'pets' && cData.id === 'hunter') {
      return (window.WOW_DEEPDIVES_HUNTER?.renderHunterPetStable || renderHunterPetStable)(cData);
    } else if (subtab === 'petchanges' && cData.id === 'hunter') {
      return (window.WOW_DEEPDIVES_HUNTER?.renderHunterPetChangesPage || renderHunterPetChangesPage)(cData);
    } else if (subtab === 'tauren' && cData.racialSynergies) {
      return (window.WOW_DEEPDIVES_SPECS?.renderTaurenRacesSection || renderTaurenRacesSection)(cData);
    } else if (subtab === 'enhancement' && cData.enhancement) {
      return (window.WOW_DEEPDIVES_SPECS?.renderEnhancementSection || renderEnhancementSection)(cData);
    } else if (subtab === 'tanking' && cData.tanking) {
      return (window.WOW_DEEPDIVES_SPECS?.renderShamanTankingSection || renderShamanTankingSection)(cData);
    } else if (subtab === 'elemental' && cData.elemental) {
      return (window.WOW_DEEPDIVES_SPECS?.renderElementalSection || renderElementalSection)(cData);
    } else if (subtab === 'restoration' && cData.id === 'shaman' && cData.restoration) {
      return (window.WOW_DEEPDIVES_SPECS?.renderRestorationSection || renderRestorationSection)(cData);
    } else if (subtab === 'racials' && cData.id === 'shaman') {
      return (window.WOW_DEEPDIVES_SPECS?.renderDwarfRacesSection || renderDwarfRacesSection)(cData);
    } else if (subtab === 'arcane' && cData.arcane) {
      return (window.WOW_DEEPDIVES_SPECS?.renderArcaneSection || renderArcaneSection)(cData);
    } else if (subtab === 'fire' && cData.fire) {
      return (window.WOW_DEEPDIVES_SPECS?.renderFireSection || renderFireSection)(cData);
    } else if (subtab === 'frost' && cData.frost) {
      return (window.WOW_DEEPDIVES_SPECS?.renderFrostSection || renderFrostSection)(cData);
    } else if (subtab === 'racials' && cData.id === 'mage') {
      return (window.WOW_DEEPDIVES_SPECS?.renderOrcMageRacesSection || renderOrcMageRacesSection)(cData);
    } else if (subtab === 'holy' && cData.id === 'paladin' && cData.holy) {
      return (window.WOW_DEEPDIVES_SPECS?.renderHolyPaladinSection || renderHolyPaladinSection)(cData);
    } else if (subtab === 'protection' && cData.id === 'paladin' && cData.protection) {
      return (window.WOW_DEEPDIVES_SPECS?.renderProtectionPaladinSection || renderProtectionPaladinSection)(cData);
    } else if (subtab === 'retribution' && cData.retribution) {
      return (window.WOW_DEEPDIVES_SPECS?.renderRetributionPaladinSection || renderRetributionPaladinSection)(cData);
    } else if (subtab === 'undead' && cData.id === 'paladin') {
      return (window.WOW_DEEPDIVES_SPECS?.renderUndeadPaladinRacesSection || renderUndeadPaladinRacesSection)(cData);
    } else if (subtab === 'arms' && cData.arms) {
      return (window.WOW_DEEPDIVES_SPECS?.renderArmsWarriorSection || renderArmsWarriorSection)(cData);
    } else if (subtab === 'fury' && cData.fury) {
      return (window.WOW_DEEPDIVES_SPECS?.renderFuryWarriorSection || renderFuryWarriorSection)(cData);
    } else if (subtab === 'protection' && cData.id === 'warrior' && cData.protection) {
      return (window.WOW_DEEPDIVES_SPECS?.renderProtectionWarriorSection || renderProtectionWarriorSection)(cData);
    } else if (subtab === 'human' && cData.id === 'warrior') {
      return (window.WOW_DEEPDIVES_SPECS?.renderHumanWarriorRacesSection || renderHumanWarriorRacesSection)(cData);
    } else if (subtab === 'affliction' && cData.affliction) {
      return (window.WOW_DEEPDIVES_SPECS?.renderAfflictionWarlockSection || renderAfflictionWarlockSection)(cData);
    } else if (subtab === 'demonology' && cData.demonology) {
      return (window.WOW_DEEPDIVES_SPECS?.renderDemonologyWarlockSection || renderDemonologyWarlockSection)(cData);
    } else if (subtab === 'destruction' && cData.destruction) {
      return (window.WOW_DEEPDIVES_SPECS?.renderDestructionWarlockSection || renderDestructionWarlockSection)(cData);
    } else if (subtab === 'gnome' && cData.id === 'warlock') {
      return (window.WOW_DEEPDIVES_SPECS?.renderGnomeWarlockRacesSection || renderGnomeWarlockRacesSection)(cData);
    } else if (subtab === 'discipline' && cData.discipline) {
      return (window.WOW_DEEPDIVES_SPECS?.renderDisciplinePriestSection || renderDisciplinePriestSection)(cData);
    } else if (subtab === 'holy' && cData.id === 'priest' && cData.holy) {
      return (window.WOW_DEEPDIVES_SPECS?.renderHolyPriestSection || renderHolyPriestSection)(cData);
    } else if (subtab === 'shadow' && cData.shadow) {
      return (window.WOW_DEEPDIVES_SPECS?.renderShadowPriestSection || renderShadowPriestSection)(cData);
    } else if (subtab === 'nightelf' && cData.id === 'priest') {
      return (window.WOW_DEEPDIVES_SPECS?.renderNightElfPriestRacesSection || renderNightElfPriestRacesSection)(cData);
    } else if (subtab === 'balance' && cData.balance) {
      return (window.WOW_DEEPDIVES_SPECS?.renderBalanceDruidSection || renderBalanceDruidSection)(cData);
    } else if (subtab === 'feral' && cData.feral) {
      return (window.WOW_DEEPDIVES_SPECS?.renderFeralDruidSection || renderFeralDruidSection)(cData);
    } else if (subtab === 'restoration' && cData.id === 'druid' && cData.restoration) {
      return (window.WOW_DEEPDIVES_SPECS?.renderRestorationDruidSection || renderRestorationDruidSection)(cData);
    } else if (subtab === 'skyelf' && cData.id === 'druid') {
      return (window.WOW_DEEPDIVES_SPECS?.renderSkyElfDruidRacesSection || renderSkyElfDruidRacesSection)(cData);
    } else if (subtab === 'assassination' && cData.assassination) {
      return (window.WOW_DEEPDIVES_SPECS?.renderAssassinationRogueSection || renderAssassinationRogueSection)(cData);
    } else if (subtab === 'combat' && cData.combat) {
      return (window.WOW_DEEPDIVES_SPECS?.renderCombatRogueSection || renderCombatRogueSection)(cData);
    } else if (subtab === 'subtlety' && cData.subtlety) {
      return (window.WOW_DEEPDIVES_SPECS?.renderSubtletyRogueSection || renderSubtletyRogueSection)(cData);
    } else if (subtab === 'troll' && cData.id === 'rogue') {
      return (window.WOW_DEEPDIVES_SPECS?.renderTrollRogueRacesSection || renderTrollRogueRacesSection)(cData);
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
              ${(window.WOW_DEEPDIVES_SPECS?.renderCoreRulesSection || renderCoreRulesSection)(cData)}
            </div>

            <div class="dossier-section-block">
              <div class="dossier-block-header">
                <h3><span>⚔️</span> 2. Survival: The Melee & Trap Vanguard</h3>
                <p>${escapeHtml(cData.survival.tagline)}</p>
              </div>
              ${(window.WOW_DEEPDIVES_SPECS?.renderSurvivalSection || renderSurvivalSection)(cData)}
            </div>

            <div class="dossier-section-block">
              <div class="dossier-block-header">
                <h3><span>🏹</span> 3. Marksmanship: Precision Sniper & Lone Wolf</h3>
                <p>${escapeHtml(cData.marksmanship.tagline)}</p>
              </div>
              ${(window.WOW_DEEPDIVES_SPECS?.renderMarksmanshipSection || renderMarksmanshipSection)(cData)}
            </div>

            <div class="dossier-section-block">
              <div class="dossier-block-header">
                <h3><span>🐾</span> 4. Beast Mastery: Beast Commander</h3>
                <p>${escapeHtml(cData.beastMastery.tagline)}</p>
              </div>
              ${(window.WOW_DEEPDIVES_SPECS?.renderBeastMasterySection || renderBeastMasterySection)(cData)}
            </div>

            <div class="dossier-section-block">
              <div class="dossier-block-header">
                <h3><span>🐾</span> 5. Pet Stable & Beast Abilities Matrix</h3>
                <p>18 pet families, the new Fox family, 9 reworked/new beast abilities, and swing speed inheritances</p>
              </div>
              ${(window.WOW_DEEPDIVES_HUNTER?.renderHunterPetStable || renderHunterPetStable)(cData)}
            </div>

            <div class="dossier-section-block">
              <div class="dossier-block-header">
                <h3><span>🐂</span> 6. Sodapoppin's Tauren Testing & New Playable Races</h3>
                <p>Empirical in-game speed tests, herb harvest duplication, and new faction race combinations</p>
              </div>
              ${(window.WOW_DEEPDIVES_SPECS?.renderTaurenRacesSection || renderTaurenRacesSection)(cData)}
            </div>

            <div class="dossier-section-block">
              <div class="dossier-block-header">
                <h3><span>🔬</span> 7. Forensics & Verification Matrix</h3>
                <p>Cross-referenced validation of all claims from BlizzCon hands-on demo against WoW: Forever closed beta</p>
              </div>
              ${(window.WOW_DEEPDIVES_BUILDS?.renderForensicMatrixSection || renderForensicMatrixSection)(cData)}
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
              ${(window.WOW_DEEPDIVES_SPECS?.renderCoreRulesSection || renderCoreRulesSection)(cData)}
            </div>

            <div class="dossier-section-block">
              <div class="dossier-block-header">
                <h3><span>⚡</span> 2. Enhancement: The Thunderous Melee & Spellhance Striker</h3>
                <p>${escapeHtml(cData.enhancement.tagline)}</p>
              </div>
              ${(window.WOW_DEEPDIVES_SPECS?.renderEnhancementSection || renderEnhancementSection)(cData)}
            </div>

            <div class="dossier-section-block">
              <div class="dossier-block-header">
                <h3><span>🛡️</span> 3. Tanking Tools & Dungeon Off-Tank Viability</h3>
                <p>${escapeHtml(cData.tanking.tagline)}</p>
              </div>
              ${(window.WOW_DEEPDIVES_SPECS?.renderShamanTankingSection || renderShamanTankingSection)(cData)}
            </div>

            <div class="dossier-section-block">
              <div class="dossier-block-header">
                <h3><span>🔥</span> 4. Elemental: Fury of the Storm & Lava</h3>
                <p>${escapeHtml(cData.elemental.tagline)}</p>
              </div>
              ${(window.WOW_DEEPDIVES_SPECS?.renderElementalSection || renderElementalSection)(cData)}
            </div>

            <div class="dossier-section-block">
              <div class="dossier-block-header">
                <h3><span>💧</span> 5. Restoration: Tides of Healing & Water Shield</h3>
                <p>${escapeHtml(cData.restoration.tagline)}</p>
              </div>
              ${(window.WOW_DEEPDIVES_SPECS?.renderRestorationSection || renderRestorationSection)(cData)}
            </div>

            <div class="dossier-section-block">
              <div class="dossier-block-header">
                <h3><span>⛏️</span> 6. Sodapoppin's Dwarf Shaman Testing & New Faction Races</h3>
                <p>Stoneform, Artisan's Precision +1% hit chance with spells and attacks, and Wildhammer Dwarves bringing Windfury to Alliance</p>
              </div>
              ${(window.WOW_DEEPDIVES_SPECS?.renderDwarfRacesSection || renderDwarfRacesSection)(cData)}
            </div>

            <div class="dossier-section-block">
              <div class="dossier-block-header">
                <h3><span>🔬</span> 7. Forensics & Verification Matrix</h3>
                <p>Cross-referenced validation of all Shaman claims from BlizzCon hands-on demo against WoW: Forever closed beta</p>
              </div>
              ${(window.WOW_DEEPDIVES_BUILDS?.renderForensicMatrixSection || renderForensicMatrixSection)(cData)}
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
              ${(window.WOW_DEEPDIVES_SPECS?.renderCoreRulesSection || renderCoreRulesSection)(cData)}
            </div>

            <div class="dossier-section-block">
              <div class="dossier-block-header">
                <h3><span>✨</span> 2. Arcane: High-Risk Mana Burn & Missile Barrage</h3>
                <p>${escapeHtml(cData.arcane.tagline)}</p>
              </div>
              ${(window.WOW_DEEPDIVES_SPECS?.renderArcaneSection || renderArcaneSection)(cData)}
            </div>

            <div class="dossier-section-block">
              <div class="dossier-block-header">
                <h3><span>🔥</span> 3. Fire: Explosive Ignite & Hot Streak Pyroblasts</h3>
                <p>${escapeHtml(cData.fire.tagline)}</p>
              </div>
              ${(window.WOW_DEEPDIVES_SPECS?.renderFireSection || renderFireSection)(cData)}
            </div>

            <div class="dossier-section-block">
              <div class="dossier-block-header">
                <h3><span>❄️</span> 4. Frost: Ice Lance Burst, Fingers of Frost & Controlled AoE</h3>
                <p>${escapeHtml(cData.frost.tagline)}</p>
              </div>
              ${(window.WOW_DEEPDIVES_SPECS?.renderFrostSection || renderFrostSection)(cData)}
            </div>

            <div class="dossier-section-block">
              <div class="dossier-block-header">
                <h3><span>🪓</span> 5. Sodapoppin's Orc Mage Testing & New Faction Races</h3>
                <p>Hardiness stun reduction, Blood Fury +10% Spell Power (no heal penalty), and Durotar ley line masters</p>
              </div>
              ${(window.WOW_DEEPDIVES_SPECS?.renderOrcMageRacesSection || renderOrcMageRacesSection)(cData)}
            </div>

            <div class="dossier-section-block">
              <div class="dossier-block-header">
                <h3><span>🔬</span> 6. Forensics & Verification Matrix</h3>
                <p>Cross-referenced validation of all Mage claims from BlizzCon hands-on demo against WoW: Forever closed beta</p>
              </div>
              ${(window.WOW_DEEPDIVES_BUILDS?.renderForensicMatrixSection || renderForensicMatrixSection)(cData)}
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
              ${(window.WOW_DEEPDIVES_SPECS?.renderCoreRulesSection || renderCoreRulesSection)(cData)}
            </div>

            <div class="dossier-section-block">
              <div class="dossier-block-header">
                <h3><span>✨</span> 2. Holy: Light's Vigil, Party AoE Healing & Instant Holy Shock</h3>
                <p>${escapeHtml(cData.holy.tagline)}</p>
              </div>
              ${(window.WOW_DEEPDIVES_SPECS?.renderHolyPaladinSection || renderHolyPaladinSection)(cData)}
            </div>

            <div class="dossier-section-block">
              <div class="dossier-block-header">
                <h3><span>🛡️</span> 3. Protection: Seal of Fury Taunt, Block Mana & Templar's Bulwark</h3>
                <p>${escapeHtml(cData.protection.tagline)}</p>
              </div>
              ${(window.WOW_DEEPDIVES_SPECS?.renderProtectionPaladinSection || renderProtectionPaladinSection)(cData)}
            </div>

            <div class="dossier-section-block">
              <div class="dossier-block-header">
                <h3><span>⚔️</span> 4. Retribution: Twist of Light, Sacred Arbiter & Hybrid Power</h3>
                <p>${escapeHtml(cData.retribution.tagline)}</p>
              </div>
              ${(window.WOW_DEEPDIVES_SPECS?.renderRetributionPaladinSection || renderRetributionPaladinSection)(cData)}
            </div>

            <div class="dossier-section-block">
              <div class="dossier-block-header">
                <h3><span>💀</span> 5. Sodapoppin's Undead Paladin Testing & New Faction Races</h3>
                <p>Cannibalize (7% HP/Mana), Touch of the Grave drain, and the Horde's first Paladin with the Forsaken Charger mount</p>
              </div>
              ${(window.WOW_DEEPDIVES_SPECS?.renderUndeadPaladinRacesSection || renderUndeadPaladinRacesSection)(cData)}
            </div>

            <div class="dossier-section-block">
              <div class="dossier-block-header">
                <h3><span>🔬</span> 6. Forensics & Verification Matrix</h3>
                <p>Cross-referenced validation of all Paladin claims from BlizzCon hands-on demo against WoW: Forever closed beta</p>
              </div>
              ${(window.WOW_DEEPDIVES_BUILDS?.renderForensicMatrixSection || renderForensicMatrixSection)(cData)}
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
              ${(window.WOW_DEEPDIVES_SPECS?.renderCoreRulesSection || renderCoreRulesSection)(cData)}
            </div>

            <div class="dossier-section-block">
              <div class="dossier-block-header">
                <h3><span>🗡️</span> 2. Arms: Spearing Strike, Unified Weaponmaster & Slam Flow</h3>
                <p>${escapeHtml(cData.arms.tagline)}</p>
              </div>
              ${(window.WOW_DEEPDIVES_SPECS?.renderArmsWarriorSection || renderArmsWarriorSection)(cData)}
            </div>

            <div class="dossier-section-block">
              <div class="dossier-block-header">
                <h3><span>⚡</span> 3. Fury: Raging Blows, Dual-Wield Scaling & Berserker Rage</h3>
                <p>${escapeHtml(cData.fury.tagline)}</p>
              </div>
              ${(window.WOW_DEEPDIVES_SPECS?.renderFuryWarriorSection || renderFuryWarriorSection)(cData)}
            </div>

            <div class="dossier-section-block">
              <div class="dossier-block-header">
                <h3><span>🛡️</span> 4. Protection: Defensive Charge, Shield Bash Silence & 9.5m Shield Wall</h3>
                <p>${escapeHtml(cData.protection.tagline)}</p>
              </div>
              ${(window.WOW_DEEPDIVES_SPECS?.renderProtectionWarriorSection || renderProtectionWarriorSection)(cData)}
            </div>

            <div class="dossier-section-block">
              <div class="dossier-block-header">
                <h3><span>👑</span> 5. Sodapoppin's Human Warrior Testing & Playable Races</h3>
                <p>Will to Survive stun break, Ruthless (+1% crit), Perception stealth detection, and cross-faction vanguards</p>
              </div>
              ${(window.WOW_DEEPDIVES_SPECS?.renderHumanWarriorRacesSection || renderHumanWarriorRacesSection)(cData)}
            </div>

            <div class="dossier-section-block">
              <div class="dossier-block-header">
                <h3><span>🔬</span> 6. Forensics & Verification Matrix</h3>
                <p>Cross-referenced validation of all Warrior claims from BlizzCon hands-on demo against WoW: Forever closed beta</p>
              </div>
              ${(window.WOW_DEEPDIVES_BUILDS?.renderForensicMatrixSection || renderForensicMatrixSection)(cData)}
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
              ${(window.WOW_DEEPDIVES_SPECS?.renderCoreRulesSection || renderCoreRulesSection)(cData)}
            </div>

            <div class="dossier-section-block">
              <div class="dossier-block-header">
                <h3><span>💀</span> 2. Affliction: Pandemic Critical DoTs, Drain Hope & Soul Harvest</h3>
                <p>${escapeHtml(cData.affliction.tagline)}</p>
              </div>
              ${(window.WOW_DEEPDIVES_SPECS?.renderAfflictionWarlockSection || renderAfflictionWarlockSection)(cData)}
            </div>

            <div class="dossier-section-block">
              <div class="dossier-block-header">
                <h3><span>😈</span> 3. Demonology: Demonic Pact, Dual-Pet Synergy & SL/SL Viability</h3>
                <p>${escapeHtml(cData.demonology.tagline)}</p>
              </div>
              ${(window.WOW_DEEPDIVES_SPECS?.renderDemonologyWarlockSection || renderDemonologyWarlockSection)(cData)}
            </div>

            <div class="dossier-section-block">
              <div class="dossier-block-header">
                <h3><span>🔥</span> 4. Destruction: Bane of Havoc, Shadow & Flame Weaving & Incinerate</h3>
                <p>${escapeHtml(cData.destruction.tagline)}</p>
              </div>
              ${(window.WOW_DEEPDIVES_SPECS?.renderDestructionWarlockSection || renderDestructionWarlockSection)(cData)}
            </div>

            <div class="dossier-section-block">
              <div class="dossier-block-header">
                <h3><span>⚙️</span> 5. Sodapoppin's Gnome Warlock Testing & Playable Races</h3>
                <p>Escape Artist snare immunity, -50% mana burst racial, Gnomish Ingenuity, and cross-faction fel scholars</p>
              </div>
              ${(window.WOW_DEEPDIVES_SPECS?.renderGnomeWarlockRacesSection || renderGnomeWarlockRacesSection)(cData)}
            </div>

            <div class="dossier-section-block">
              <div class="dossier-block-header">
                <h3><span>🔬</span> 6. Forensics & Verification Matrix</h3>
                <p>Cross-referenced validation of all Warlock claims from BlizzCon hands-on demo against WoW: Forever closed beta</p>
              </div>
              ${(window.WOW_DEEPDIVES_BUILDS?.renderForensicMatrixSection || renderForensicMatrixSection)(cData)}
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
              ${(window.WOW_DEEPDIVES_SPECS?.renderCoreRulesSection || renderCoreRulesSection)(cData)}
            </div>

            <div class="dossier-section-block">
              <div class="dossier-block-header">
                <h3><span>🛡️</span> 2. Discipline: Penance, Soul Warding & Divine Aegis</h3>
                <p>${escapeHtml(cData.discipline.tagline)}</p>
              </div>
              ${(window.WOW_DEEPDIVES_SPECS?.renderDisciplinePriestSection || renderDisciplinePriestSection)(cData)}
            </div>

            <div class="dossier-section-block">
              <div class="dossier-block-header">
                <h3><span>✨</span> 3. Holy: Prayer of Mending, Litany of Light & Spirit Scaling</h3>
                <p>${escapeHtml(cData.holy.tagline)}</p>
              </div>
              ${(window.WOW_DEEPDIVES_SPECS?.renderHolyPriestSection || renderHolyPriestSection)(cData)}
            </div>

            <div class="dossier-section-block">
              <div class="dossier-block-header">
                <h3><span>🌑</span> 4. Shadow: Shadowform 50% Mana, Devouring Plague & Vampiric Embrace</h3>
                <p>${escapeHtml(cData.shadow.tagline)}</p>
              </div>
              ${(window.WOW_DEEPDIVES_SPECS?.renderShadowPriestSection || renderShadowPriestSection)(cData)}
            </div>

            <div class="dossier-section-block">
              <div class="dossier-block-header">
                <h3><span>🌙</span> 5. Sodapoppin's Night Elf Priest Testing & Playable Races</h3>
                <p>In-combat Shadowmeld threat dropping, Elune's Light (+10% crit burst), Elune's Grace, and cross-faction clergy</p>
              </div>
              ${(window.WOW_DEEPDIVES_SPECS?.renderNightElfPriestRacesSection || renderNightElfPriestRacesSection)(cData)}
            </div>

            <div class="dossier-section-block">
              <div class="dossier-block-header">
                <h3><span>🔬</span> 6. Forensics & Verification Matrix</h3>
                <p>Cross-referenced validation of all Priest claims from BlizzCon hands-on demo against WoW: Forever closed beta</p>
              </div>
              ${(window.WOW_DEEPDIVES_BUILDS?.renderForensicMatrixSection || renderForensicMatrixSection)(cData)}
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
              ${(window.WOW_DEEPDIVES_SPECS?.renderCoreRulesSection || renderCoreRulesSection)(cData)}
            </div>

            <div class="dossier-section-block">
              <div class="dossier-block-header">
                <h3><span>🌙</span> 2. Balance: Eclipse Charges, Balance of Nature & Moonkin Form</h3>
                <p>${escapeHtml(cData.balance.tagline)}</p>
              </div>
              ${(window.WOW_DEEPDIVES_SPECS?.renderBalanceDruidSection || renderBalanceDruidSection)(cData)}
            </div>

            <div class="dossier-section-block">
              <div class="dossier-block-header">
                <h3><span>🐾</span> 3. Feral: King of the Jungle, Cat Feral Charge & Bear Defense Scaling</h3>
                <p>${escapeHtml(cData.feral.tagline)}</p>
              </div>
              ${(window.WOW_DEEPDIVES_SPECS?.renderFeralDruidSection || renderFeralDruidSection)(cData)}
            </div>

            <div class="dossier-section-block">
              <div class="dossier-block-header">
                <h3><span>🌱</span> 4. Restoration: Wild Growth, Swiftmend & 0.5s GCD Reduction</h3>
                <p>${escapeHtml(cData.restoration.tagline)}</p>
              </div>
              ${(window.WOW_DEEPDIVES_SPECS?.renderRestorationDruidSection || renderRestorationDruidSection)(cData)}
            </div>

            <div class="dossier-section-block">
              <div class="dossier-block-header">
                <h3><span>🪶</span> 5. Sodapoppin's Sky Elf Druid Testing & Playable Races</h3>
                <p>Walk on Air 10s glide, Wind Blessed (+10% speed / +1% haste), unique avian shapeshift forms, and faction choices</p>
              </div>
              ${(window.WOW_DEEPDIVES_SPECS?.renderSkyElfDruidRacesSection || renderSkyElfDruidRacesSection)(cData)}
            </div>

            <div class="dossier-section-block">
              <div class="dossier-block-header">
                <h3><span>🔬</span> 6. Forensics & Verification Matrix</h3>
                <p>Cross-referenced validation of all Druid claims from BlizzCon hands-on demo against WoW: Forever closed beta</p>
              </div>
              ${(window.WOW_DEEPDIVES_BUILDS?.renderForensicMatrixSection || renderForensicMatrixSection)(cData)}
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
              ${(window.WOW_DEEPDIVES_SPECS?.renderCoreRulesSection || renderCoreRulesSection)(cData)}
            </div>

            <div class="dossier-section-block">
              <div class="dossier-block-header">
                <h3><span>🩸</span> 2. Assassination: Daggerless Mutilate & Crit Poisons</h3>
                <p>${escapeHtml(cData.assassination.tagline)}</p>
              </div>
              ${(window.WOW_DEEPDIVES_SPECS?.renderAssassinationRogueSection || renderAssassinationRogueSection)(cData)}
            </div>

            <div class="dossier-section-block">
              <div class="dossier-block-header">
                <h3><span>⚔️</span> 3. Combat: Restless Blades Cooldown Cycling & Cleave</h3>
                <p>${escapeHtml(cData.combat.tagline)}</p>
              </div>
              ${(window.WOW_DEEPDIVES_SPECS?.renderCombatRogueSection || renderCombatRogueSection)(cData)}
            </div>

            <div class="dossier-section-block">
              <div class="dossier-block-header">
                <h3><span>👤</span> 4. Subtlety: Thousand Cuts Rupture Engine</h3>
                <p>${escapeHtml(cData.subtlety.tagline)}</p>
              </div>
              ${(window.WOW_DEEPDIVES_SPECS?.renderSubtletyRogueSection || renderSubtletyRogueSection)(cData)}
            </div>

            <div class="dossier-section-block">
              <div class="dossier-block-header">
                <h3><span>🏹</span> 5. Sodapoppin's Troll Testing & Playable Races</h3>
                <p>Flat 10% Berserking, 50% HP active regeneration channel, Beast Slaying, and in-combat regeneration</p>
              </div>
              ${(window.WOW_DEEPDIVES_SPECS?.renderTrollRogueRacesSection || renderTrollRogueRacesSection)(cData)}
            </div>

            <div class="dossier-section-block">
              <div class="dossier-block-header">
                <h3><span>🔬</span> 6. Forensics & Verification Matrix</h3>
                <p>Cross-referenced validation of all Rogue claims from BlizzCon hands-on demo against WoW: Forever closed beta</p>
              </div>
              ${(window.WOW_DEEPDIVES_BUILDS?.renderForensicMatrixSection || renderForensicMatrixSection)(cData)}
            </div>
          </div>
        `;
      }
      return '';
    }
  }


  function setupHunterPetMasterModal() {
    if (window.WOW_DEEPDIVES_HUNTER && window.WOW_DEEPDIVES_HUNTER.setupHunterPetMasterModal) {
      window.WOW_DEEPDIVES_HUNTER.setupHunterPetMasterModal();
    }
  }

  // Initial render
  renderDeepDiveChips();
  renderDeepDiveContent();
}
