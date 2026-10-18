/**
 * World of Warcraft: Forever - Class Deep Dives Talent Modals, Beta Builds & Forensics Matrix
 */
(function () {
  "use strict";

  const escapeHtml = window.escapeHtml || (s => String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"));

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

  window.WOW_DEEPDIVES_BUILDS = {
    openDeepDiveTalentModal,
    openDeepDiveBlankCalculator,
    renderBetaBuildsSection,
    renderForensicMatrixSection
  };
})();
