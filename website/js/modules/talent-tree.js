/**
 * WoW Forever Beta Build 1.60.1.70425 Authentic Talent Tree Module
 * 
 * Provides an authentic 3-tree Classic WoW interactive calculator:
 * - 4-column x 7-row visual grid matrix per specialization tree
 * - Prerequisite SVG connection arrows with live requirement status
 * - Interactive point allocation: Left-click (learn) / Right-click (unlearn)
 * - Authentic rank badges (e.g. 5/5, 2/2, 0/5) with maxed/active/locked glowing states
 * - Rich Blizzard floating tooltips with rank descriptions, next-rank previews, and tier gates
 * - Build URL encoder/decoder matching standard WoW Forever / Classic client formats
 * - Dual view modes: Visual Tree Matrix vs Detailed Cards
 */

(function () {
  'use strict';

  // Global State for the Active Talent Calculator Session
  const state = {
    isOpen: false,
    targetContainerId: 'bis-talent-modal-content',
    classId: 'priest',
    specId: 'pve',
    specName: 'Shadow PvE',
    maxPoints: 26, // Default Level 30 cap (21 + 5 Talented legacy perk)
    capMode: 'lvl30_perk', // 'lvl30_perk' (26) | 'lvl30_base' (21) | 'lvl60' (51)
    viewMode: 'grid', // 'grid' | 'cards'
    showClassicDiff: false, // Highlights +New, ~Mod, ⇄Moved talents vs Classic Era
    cardSearchQuery: '',
    points: {}, // { [talentId]: number }
    recommendedPoints: {}, // Snapshot for "Load Recommended Spec"
    originalPoints: {}, // Snapshot when opened
    isBlankSlate: false,
    buildCode: '',
    buildUrl: ''
  };

  /**
   * Helper to look up Classic vs Forever change data for a talent
   */
  function getTalentChangeInfo(classId, talentName) {
    const changesData = window.WOW_CHANGES_DATA;
    if (!changesData || !changesData.entries || !talentName) return null;
    const cleanName = String(talentName).trim().toLowerCase();
    const targetClass = String(classId || state.classId).toLowerCase();
    return changesData.entries.find(e => {
      if (e.class !== targetClass || e.kind !== 'talent') return false;
      const matchCurrent = (e.name || '').trim().toLowerCase() === cleanName;
      const matchPrev = e.reported_previous_name && e.reported_previous_name.trim().toLowerCase() === cleanName;
      return matchCurrent || matchPrev;
    }) || null;
  }

  const CLASS_LIST = [
    { id: 'warrior', name: 'Warrior', color: '#C79C6E' },
    { id: 'paladin', name: 'Paladin', color: '#F58CBA' },
    { id: 'hunter', name: 'Hunter', color: '#ABD473' },
    { id: 'rogue', name: 'Rogue', color: '#FFF569' },
    { id: 'priest', name: 'Priest', color: '#FFFFFF' },
    { id: 'shaman', name: 'Shaman', color: '#2B8CFF' },
    { id: 'mage', name: 'Mage', color: '#69CCF0' },
    { id: 'warlock', name: 'Warlock', color: '#9482C9' },
    { id: 'druid', name: 'Druid', color: '#FF7D0A' }
  ];

  /**
   * Resolve recommended build for a class from WOW_BIS_DATA
   */
  function getRecommendedBuildForClass(classId, preferredSpecId = null) {
    const bisData = window.WOW_BIS_DATA || (typeof WOW_BIS_DATA !== 'undefined' ? WOW_BIS_DATA : null);
    if (!bisData || !bisData[classId] || !bisData[classId].specs) return null;
    const specs = bisData[classId].specs;
    let targetSpec = preferredSpecId ? specs.find(s => s.id === preferredSpecId) : null;
    if (!targetSpec) targetSpec = specs[0];
    if (targetSpec && targetSpec.talents && targetSpec.talents.buildUrl) {
      return {
        specId: targetSpec.id,
        specName: targetSpec.name,
        buildUrl: targetSpec.talents.buildUrl,
        points: parseBuildUrl(classId, targetSpec.talents.buildUrl)
      };
    }
    return null;
  }

  /**
   * Escape HTML entities to prevent injection
   */
  const escapeHtml = window.escapeHtml;

  /**
   * Get class data from WOW_TALENTS_DATA with safe fallback
   */
  function getClassData(classId) {
    const data = window.WOW_TALENTS_DATA || (typeof WOW_TALENTS_DATA !== 'undefined' ? WOW_TALENTS_DATA : null);
    if (data && data[classId]) {
      return data[classId];
    }
    return null;
  }

  /**
   * Calculate points allocated in a specific tree (0, 1, or 2)
   */
  function getTreePoints(treeIndex, customPoints = null, customClassId = null) {
    const classData = getClassData(customClassId || state.classId);
    if (!classData) return 0;
    const ptsMap = customPoints || state.points;
    let sum = 0;
    classData.talents.forEach(t => {
      if (t.tree === treeIndex) {
        sum += (ptsMap[t.id] || 0);
      }
    });
    return sum;
  }

  /**
   * Calculate total points allocated across all trees
   */
  function getTotalPoints(customPoints = null) {
    const ptsMap = customPoints || state.points;
    let sum = 0;
    for (const id in ptsMap) {
      sum += (ptsMap[id] || 0);
    }
    return sum;
  }

  /**
   * Check if a talent can have an additional point added
   */
  function canAddPoint(talent, customPoints = null, customMaxPoints = null, customClassId = null) {
    const ptsMap = customPoints || state.points;
    const currentRank = ptsMap[talent.id] || 0;
    if (currentRank >= talent.maxRank) return false;
    const maxPts = (customMaxPoints !== null && customMaxPoints !== undefined) ? customMaxPoints : state.maxPoints;
    if (getTotalPoints(ptsMap) >= maxPts) return false;

    // 1. Tier Gate: (row - 1) * 5 points required in this tree
    const requiredTreePoints = (talent.row - 1) * 5;
    const currentTreePoints = getTreePoints(talent.tree, ptsMap, customClassId);
    if (currentTreePoints < requiredTreePoints) return false;

    // 2. Prerequisite Talent: must be maxed
    if (talent.req) {
      const classData = getClassData(customClassId || state.classId);
      const reqTalent = classData ? classData.talents.find(t => t.id === talent.req) : null;
      if (reqTalent) {
        const reqRank = ptsMap[reqTalent.id] || 0;
        if (reqRank < reqTalent.maxRank) return false;
      }
    }

    return true;
  }

  /**
   * Check if a talent can have a point refunded
   */
  function canRefundPoint(talent) {
    const currentRank = state.points[talent.id] || 0;
    if (currentRank <= 0) return false;

    const classData = getClassData(state.classId);
    if (!classData) return false;

    // 1. Dependent Talents: If any talent has this as requirement and has points, cannot refund below maxRank
    const dependentTalents = classData.talents.filter(t => t.req === talent.id && (state.points[t.id] || 0) > 0);
    if (dependentTalents.length > 0 && currentRank <= talent.maxRank) {
      return false;
    }

    // 2. Tier Gate Protection: Cannot refund if doing so breaks required points for higher tier talents
    // For every tier T > talent.row that has points invested in this tree:
    // Points in tiers <= T-1 must remain >= (T-1) * 5 AFTER refunding 1 point.
    const treeTalents = classData.talents.filter(t => t.tree === talent.tree);
    for (let r = talent.row + 1; r <= 7; r++) {
      const pointsInOrAboveRow = treeTalents
        .filter(t => t.row >= r)
        .reduce((sum, t) => sum + (state.points[t.id] || 0), 0);

      if (pointsInOrAboveRow > 0) {
        // Tiers below row r must contain at least (r - 1) * 5 points
        const pointsBelowRow = treeTalents
          .filter(t => t.row < r)
          .reduce((sum, t) => sum + (state.points[t.id] || 0), 0);

        // If we refund 1 point from this talent (which is in row < r), pointsBelowRow decreases by 1
        if (pointsBelowRow - 1 < (r - 1) * 5) {
          return false;
        }
      }
    }

    return true;
  }

  /**
   * Parse build URL (e.g. /talents/priest?b=--30532200120131201&l=30&tl=5)
   * into points map
   */

  window.WOW_TALENT_TREE_STATE = state;
  window.WOW_TALENT_CORE = {
    getClassData,
    getTalentChangeInfo,
    getRecommendedBuildForClass,
    getTreePoints,
    getTotalPoints,
    canAddPoint,
    canRefundPoint,
    renderModalBody: () => renderModalBody()
  };

  function parseBuildUrl(classId, buildUrl) {
    return window.WOW_TALENT_BUILDS?.parseBuildUrl ? window.WOW_TALENT_BUILDS.parseBuildUrl(classId, buildUrl) : {};
  }
  function generateBuildUrl(classId, points) {
    return window.WOW_TALENT_BUILDS?.generateBuildUrl ? window.WOW_TALENT_BUILDS.generateBuildUrl(classId, points) : "";
  }
  function generateBuildCode(classId, specId, points) {
    return window.WOW_TALENT_BUILDS?.generateBuildCode ? window.WOW_TALENT_BUILDS.generateBuildCode(classId, specId, points) : "";
  }
  function positionTooltip(event, tooltip) {
    if (window.WOW_TALENT_BUILDS?.positionTooltip) window.WOW_TALENT_BUILDS.positionTooltip(event, tooltip);
  }
  function showTalentTooltip(talent, event, customPoints = null, customClassId = null) {
    if (window.WOW_TALENT_BUILDS?.showTalentTooltip) window.WOW_TALENT_BUILDS.showTalentTooltip(talent, event, customPoints, customClassId);
  }
  function hideTalentTooltip() {
    if (window.WOW_TALENT_BUILDS?.hideTalentTooltip) window.WOW_TALENT_BUILDS.hideTalentTooltip();
  }
  function renderDetailedCardsView(classData, customPoints = null, customQuery = null) {
    return window.WOW_TALENT_BUILDS?.renderDetailedCardsView ? window.WOW_TALENT_BUILDS.renderDetailedCardsView(classData, customPoints, customQuery) : "";
  }
  function getSavedBuilds() {
    return window.WOW_TALENT_BUILDS?.getSavedBuilds ? window.WOW_TALENT_BUILDS.getSavedBuilds() : [];
  }
  function saveCurrentBuild(classId = state.classId, buildName = null) {
    if (window.WOW_TALENT_BUILDS?.saveCurrentBuild) window.WOW_TALENT_BUILDS.saveCurrentBuild(classId, buildName);
  }
  function deleteSavedBuild(buildId) {
    if (window.WOW_TALENT_BUILDS?.deleteSavedBuild) window.WOW_TALENT_BUILDS.deleteSavedBuild(buildId);
  }
  function loadSavedBuild(buildId) {
    if (window.WOW_TALENT_BUILDS?.loadSavedBuild) window.WOW_TALENT_BUILDS.loadSavedBuild(buildId);
  }
  function renderSavedBuildsDrawer(forceOpen = false) {
    if (window.WOW_TALENT_BUILDS?.renderSavedBuildsDrawer) window.WOW_TALENT_BUILDS.renderSavedBuildsDrawer(forceOpen);
  }

  function renderTreeDependencyArrows(classData, treeIndex, customPoints = null) {
    const treeTalents = classData.talents.filter(t => t.tree === treeIndex);
    const dependentTalents = treeTalents.filter(t => t.req);
    if (dependentTalents.length === 0) return '';
    const ptsMap = customPoints || state.points;

    // Cell geometry: each slot is roughly 52px width/height + gap in grid
    // We compute positions normalized in percentage or coordinate space
    // 4 columns: center of column c (1..4) is (c - 0.5) * 25%
    // 7 rows: center of row r (1..7) is (r - 0.5) * (100% / 7)
    const lines = dependentTalents.map(target => {
      const source = treeTalents.find(t => t.id === target.req);
      if (!source) return '';

      const x1 = ((source.col - 0.5) / 4) * 100;
      const y1 = ((source.row - 0.5) / 7) * 100;
      const x2 = ((target.col - 0.5) / 4) * 100;
      const y2 = ((target.row - 0.5) / 7) * 100;

      const sourcePoints = ptsMap[source.id] || 0;
      const isFulfilled = sourcePoints >= source.maxRank;
      const strokeColor = isFulfilled ? '#facc15' : 'rgba(255, 255, 255, 0.22)';
      const markerId = isFulfilled ? 'arrowhead-active' : 'arrowhead-locked';

      // If straight down, draw direct line with offset for node padding
      return `
        <line x1="${x1}%" y1="${y1 + 4.5}%" x2="${x2}%" y2="${y2 - 5}%" 
              stroke="${strokeColor}" stroke-width="2.5" 
              stroke-linecap="round" marker-end="url(#${markerId})" />
      `;
    }).join('');

    return `
      <svg class="bis-tree-arrows-svg" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <defs>
          <marker id="arrowhead-active" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <polygon points="0 0, 6 3, 0 6" fill="#facc15" />
          </marker>
          <marker id="arrowhead-locked" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <polygon points="0 0, 6 3, 0 6" fill="rgba(255,255,255,0.25)" />
          </marker>
        </defs>
        ${lines}
      </svg>
    `;
  }

  /**
   * Render 4x7 Visual Grid Matrix for a tree
   */
  function renderTreeVisualMatrix(classData, treeIndex, customPoints = null) {
    const treeTalents = classData.talents.filter(t => t.tree === treeIndex);
    const ptsMap = customPoints || state.points;

    // Map by "row-col" for instant coordinate lookup
    const slotMap = {};
    treeTalents.forEach(t => {
      slotMap[`${t.row}-${t.col}`] = t;
    });

    const cellsHtml = [];
    for (let r = 1; r <= 7; r++) {
      for (let c = 1; c <= 4; c++) {
        const talent = slotMap[`${r}-${c}`];
        if (!talent) {
          cellsHtml.push(`<div class="bis-talent-slot-empty" data-row="${r}" data-col="${c}"></div>`);
          continue;
        }

        const pts = ptsMap[talent.id] || 0;
        const isMaxed = pts >= talent.maxRank;
        const hasPoints = pts > 0;
        const available = canAddPoint(talent, ptsMap, null, classData.id);

        let statusClass = 'is-locked';
        if (isMaxed) {
          statusClass = 'is-maxed';
        } else if (hasPoints) {
          statusClass = 'is-active';
        } else if (available) {
          statusClass = 'is-available';
        }

        let diffClass = '';
        let diffBadge = '';
        if (state.showClassicDiff) {
          const diffInfo = getTalentChangeInfo(classData.id, talent.name);
          if (diffInfo && diffInfo.reported_change_kind && diffInfo.reported_change_kind !== 'unchanged') {
            const kind = diffInfo.reported_change_kind;
            if (kind === 'added') {
              diffClass = 'diff-highlight-new';
              diffBadge = '<span class="bis-diff-badge new" title="New talent in WoW Forever">+New</span>';
            } else if (kind === 'modified') {
              diffClass = 'diff-highlight-mod';
              diffBadge = '<span class="bis-diff-badge mod" title="Modified numbers or mechanics vs Classic Era">~Mod</span>';
            } else if (kind === 'moved') {
              diffClass = 'diff-highlight-moved';
              diffBadge = '<span class="bis-diff-badge moved" title="Tier or tree position moved vs Classic Era">⇄Moved</span>';
            }
          }
        }

        cellsHtml.push(`
          <div class="bis-talent-slot ${statusClass} ${diffClass}"
               data-talent-id="${talent.id}"
               data-tree="${treeIndex}"
               data-row="${talent.row}"
               data-col="${talent.col}"
               tabindex="0"
               role="button"
               aria-label="${escapeHtml(talent.name)} ${pts}/${talent.maxRank}">
            <img src="${talent.icon}" alt="${escapeHtml(talent.name)}" class="bis-talent-slot-icon" loading="lazy" onerror="this.src='https://render.worldofwarcraft.com/us/icons/56/inv_misc_questionmark.jpg'" />
            ${diffBadge}
            <span class="bis-talent-rank-overlay ${isMaxed ? 'rank-maxed' : (hasPoints ? 'rank-active' : 'rank-unallocated')}">
              ${pts}/${talent.maxRank}
            </span>
          </div>
        `);
      }
    }

    return `
      <div class="bis-tree-matrix-container">
        ${renderTreeDependencyArrows(classData, treeIndex, ptsMap)}
        <div class="bis-tree-visual-matrix">
          ${cellsHtml.join('')}
        </div>
      </div>
    `;
  }

  /**
   * Render Detailed Cards View with descriptions & quick filters
   */

  function setCapMode(mode) {
    state.capMode = mode;
    if (mode === 'lvl60') {
      state.maxPoints = 51;
    } else if (mode === 'lvl30_base') {
      state.maxPoints = 21;
    } else {
      state.maxPoints = 26; // lvl30_perk
    }

    // Prune points if current allocated exceeds new cap
    const classData = getClassData(state.classId);
    if (classData && getTotalPoints() > state.maxPoints) {
      const sorted = classData.talents
        .filter(t => (state.points[t.id] || 0) > 0)
        .sort((a, b) => b.row - a.row || b.col - a.col);

      for (const t of sorted) {
        while ((state.points[t.id] || 0) > 0 && getTotalPoints() > state.maxPoints) {
          if (canRefundPoint(t)) {
            if (state.points[t.id] > 1) {
              state.points[t.id]--;
            } else {
              delete state.points[t.id];
            }
          } else {
            break;
          }
        }
      }
    }
    renderModalBody();
  }

  /* ==========================================================================
     My Saved Builds (LocalStorage System)
     ========================================================================== */

  function renderModalBody() {
    const targetId = state.targetContainerId || 'bis-talent-modal-content';
    const content = document.getElementById(targetId) || document.getElementById('bis-talent-modal-content');
    if (!content) return;
    const isModal = targetId === 'bis-talent-modal-content';

    const classData = getClassData(state.classId);
    if (!classData) {
      content.innerHTML = `<div style="padding: 2rem; color: #f87171; text-align: center;">Unable to load talent database for ${escapeHtml(state.classId)}.</div>`;
      return;
    }

    const totalPoints = getTotalPoints();
    const treePoints = [0, 1, 2].map(idx => getTreePoints(idx));
    const buildCode = generateBuildCode(state.classId, state.specId, state.points);
    const pointsRemaining = Math.max(0, state.maxPoints - totalPoints);

    const bisData = window.WOW_BIS_DATA || (typeof WOW_BIS_DATA !== 'undefined' ? WOW_BIS_DATA : null);
    const availableSpecs = (bisData && bisData[state.classId] && bisData[state.classId].specs) ? bisData[state.classId].specs : [];

    // Class meta styling
    const classColors = {
      warrior: '#C79C6E',
      paladin: '#F58CBA',
      hunter: '#ABD473',
      rogue: '#FFF569',
      priest: '#FFFFFF',
      shaman: '#2B8CFF',
      mage: '#69CCF0',
      warlock: '#9482C9',
      druid: '#FF7D0A'
    };
    const classColor = classColors[state.classId] || '#facc15';
    const classIcon = `https://render.worldofwarcraft.com/us/icons/56/classicon_${state.classId}.jpg`;

    content.innerHTML = `
      <!-- Class Switcher Ribbon -->
      <div class="bis-talent-class-ribbon" role="tablist" aria-label="Select Class">
        ${CLASS_LIST.map(cls => `
          <button type="button" 
                  class="bis-modal-class-chip ${state.classId === cls.id ? 'active' : ''}" 
                  data-class-id="${cls.id}"
                  style="--class-color: ${cls.color};"
                  title="${cls.name} Talent Trees">
            <img src="https://render.worldofwarcraft.com/us/icons/56/classicon_${cls.id}.jpg" alt="${cls.name}" class="bis-modal-class-icon" onerror="this.src='https://render.worldofwarcraft.com/us/icons/56/inv_misc_questionmark.jpg'" />
            <span class="bis-modal-class-name">${cls.name}</span>
          </button>
        `).join('')}
      </div>

      <!-- Header & Theorycrafting Controls -->
      <div class="bis-talent-modal-head">
        <div class="bis-talent-head-left">
          <img src="${classIcon}" alt="${classData.name}" class="bis-talent-crest-icon" onerror="this.src='https://render.worldofwarcraft.com/us/icons/56/inv_misc_questionmark.jpg'" />
          <div>
            <div style="display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap;">
              <h3 class="bis-talent-title" style="color: ${classColor};">
                ${classData.name}: ${escapeHtml(state.specName)}
              </h3>
              ${state.isBlankSlate && totalPoints === 0 ? `<span class="bis-blank-slate-tag">✨ Blank Slate</span>` : ''}
            </div>
            <div class="bis-talent-subtitle">
              ${state.capMode === 'lvl60' 
                ? 'Level 60 Endgame Cap • 51 Talent Points' 
                : (state.capMode === 'lvl30_base' 
                    ? 'Level 30 Base Cap • 21 Talent Points (Standard Progression)' 
                    : 'Phase 2 Level 30 Beta Cap • 26 Talent Points (21 Standard + 5 \'Talented\' Legacy Perk)')}
            </div>
          </div>
        </div>

        <div class="bis-talent-head-actions">
          <!-- Remaining Points Hero Badge -->
          <div class="bis-points-left-badge ${pointsRemaining > 0 ? 'has-points' : 'capped'}" title="Unallocated Talent Points Remaining">
            <span class="pts-number">${pointsRemaining}</span>
            <span class="pts-label">Points Left</span>
          </div>

          <!-- Total Allocated Points Badge -->
          <div class="bis-talent-points-pill" title="Points allocated: Tree 1 / Tree 2 / Tree 3">
            Build: ${treePoints[0]} / ${treePoints[1]} / ${treePoints[2]} (${totalPoints}/${state.maxPoints})
          </div>

          <!-- Preset Switcher: Blank Slate vs Available Class Specs -->
          <div class="bis-preset-toggle-group" style="display: flex; gap: 0.35rem; flex-wrap: wrap;">
            <button type="button" class="bis-talent-pill-btn ${state.isBlankSlate && totalPoints === 0 ? 'active-mode' : ''}" id="btn-toggle-blank-slate" title="Start with empty talent trees (0 points)">
              <span>✨</span> Blank Slate
            </button>
            ${availableSpecs.map(s => `
              <button type="button" class="bis-talent-pill-btn ${!state.isBlankSlate && state.specId === s.id ? 'active-mode' : ''}" data-action="load-spec" data-spec-id="${s.id}" title="Load ${escapeHtml(s.name)} recommended build">
                <span>⚔️</span> ${escapeHtml(s.name.replace(/\s*\(.*\)/, ''))}
              </button>
            `).join('')}
          </div>

          <!-- Theorycrafting Cap Selector -->
          <div class="bis-cap-selector-group" title="Select theorycrafting points cap">
            <button type="button" class="bis-cap-btn ${state.capMode === 'lvl30_perk' ? 'active' : ''}" data-cap="lvl30_perk" title="Level 30 Beta Cap (26 pts with Talented perk)">Lvl 30 (26p)</button>
            <button type="button" class="bis-cap-btn ${state.capMode === 'lvl30_base' ? 'active' : ''}" data-cap="lvl30_base" title="Level 30 Standard Cap (21 pts without perk)">Lvl 30 (21p)</button>
            <button type="button" class="bis-cap-btn ${state.capMode === 'lvl60' ? 'active' : ''}" data-cap="lvl60" title="Level 60 Endgame Theorycrafting (51 pts)">Lvl 60 (51p)</button>
          </div>

          <!-- Classic Diff Toggle Switch -->
          <button type="button" class="bis-diff-toggle-btn ${state.showClassicDiff ? 'active' : ''}" id="btn-toggle-classic-diff" title="Highlight talents changed or added compared to Classic Era (+New, ~Mod, ⇄Moved)">
            <span>⚡</span> Classic Diff: ${state.showClassicDiff ? 'ON' : 'OFF'}
          </button>

          <!-- View Mode Switcher -->
          <div class="bis-talent-view-controls">
            <button type="button" class="bis-view-toggle-btn ${state.viewMode === 'grid' ? 'active' : ''}" data-view="grid" title="Classic 4x7 Visual Trees">
              <span>🔲</span> Matrix
            </button>
            <button type="button" class="bis-view-toggle-btn ${state.viewMode === 'cards' ? 'active' : ''}" data-view="cards" title="Detailed Cards with Full Descriptions">
              <span>📜</span> Cards
            </button>
          </div>

          <!-- Clear All Points Button -->
          <button type="button" class="bis-talent-pill-btn danger" id="btn-clear-all-talents" title="Clear all allocated talent points">
            ✕ Clear
          </button>
        </div>
      </div>

      <!-- Main Body: 3-Column Talent Grid or Detailed Cards List -->
      ${state.viewMode === 'grid' ? `
        <div class="bis-talent-tree-grid">
          ${classData.trees.map((tree, treeIdx) => `
            <div class="bis-tree-col">
              <div class="bis-tree-head">
                <div class="bis-tree-title-group">
                  <img src="${tree.icon}" alt="${escapeHtml(tree.name)}" class="bis-tree-icon" />
                  <span class="bis-tree-name">${escapeHtml(tree.name)}</span>
                </div>
                <div style="display: flex; align-items: center; gap: 0.35rem;">
                  <span class="bis-tree-points-badge">${getTreePoints(treeIdx)} pts</span>
                  <button type="button" class="bis-tree-reset-mini" data-action="reset-tree" data-tree="${treeIdx}" title="Reset ${escapeHtml(tree.name)} tree">↺</button>
                </div>
              </div>

              ${renderTreeVisualMatrix(classData, treeIdx)}
            </div>
          `).join('')}
        </div>
      ` : renderDetailedCardsView(classData)}

      <!-- Modal Footer Actions -->
      <div class="bis-talent-modal-foot">
        <div class="bis-talent-foot-left">
          <button type="button" class="bis-talent-foot-btn primary" id="btn-save-talent-build" title="Save current build to browser local storage">
            <span>💾</span> Save Build
          </button>
          <button type="button" class="bis-talent-foot-btn" id="btn-toggle-saved-builds" title="View your saved custom builds">
            <span>📁</span> My Saved Builds <span class="bis-saved-count-chip">${getSavedBuilds().length}</span>
          </button>
          <button type="button" class="bis-talent-foot-btn" id="btn-modal-copy-code" title="Copy talent build code">
            <span>📋</span> Copy Build Code (<code style="color: #facc15;">${escapeHtml(buildCode)}</code>)
          </button>
          <button type="button" class="bis-talent-foot-btn" id="btn-modal-copy-url" title="Copy shareable calculator link">
            <span>🔗</span> Copy Build Link
          </button>
          <button type="button" class="bis-talent-foot-btn" id="btn-modal-export-discord" title="Copy build summary formatted for Discord">
            <span>📋</span> Export Discord Build
          </button>
          <button type="button" class="bis-talent-foot-btn" id="btn-modal-deepdive">
            <span>🎯</span> Explore ${classData.name} Deep Dive
          </button>
        </div>
        <div style="display: flex; align-items: center; gap: 0.85rem; flex-wrap: wrap;">
          <span class="bis-talent-controls-hint">💡 Left-Click (+1) • Shift+Click (Max) • Right-Click (-1) • Shift+Right-Click (Clear)</span>
          ${isModal ? `
            <button type="button" class="bis-talent-foot-btn" id="btn-modal-close-foot">
              ✕ Close Window
            </button>
          ` : ''}
        </div>
      </div>
    `;

    bindModalEvents();
  }

  /**
   * Bind DOM events for the modal interactions
   */
  function bindModalEvents() {
    const targetId = state.targetContainerId || 'bis-talent-modal-content';
    const content = document.getElementById(targetId) || document.getElementById('bis-talent-modal-content');
    if (!content) return;
    const isModal = targetId === 'bis-talent-modal-content';
    const modal = isModal ? document.getElementById('bis-talent-modal') : null;

    const classData = getClassData(state.classId);
    if (!classData) return;

    // 1. Close buttons (Modal mode only)
    if (isModal && modal) {
      const closeBtn = document.getElementById('bis-talent-modal-close');
      const closeFootBtn = content.querySelector('#btn-modal-close-foot');
      const closeModal = () => {
        state.isOpen = false;
        modal.classList.remove('open');
        modal.setAttribute('hidden', '');
        hideTalentTooltip();
      };

      if (closeBtn) closeBtn.onclick = closeModal;
      if (closeFootBtn) closeFootBtn.onclick = closeModal;

      modal.onclick = (e) => {
        if (e.target === modal) closeModal();
      };
    }

    // 1a. Classic Diff Toggle Button
    const diffToggleBtn = content.querySelector('#btn-toggle-classic-diff');
    if (diffToggleBtn) {
      diffToggleBtn.onclick = () => {
        hideTalentTooltip();
        state.showClassicDiff = !state.showClassicDiff;
        renderModalBody();
      };
    }

    // 1b. Class Ribbon Selection
    content.querySelectorAll('.bis-modal-class-chip').forEach(btn => {
      btn.onclick = () => {
        const newClassId = btn.getAttribute('data-class-id');
        if (newClassId && newClassId !== state.classId) {
          hideTalentTooltip();
          state.classId = newClassId;
          const recBuild = getRecommendedBuildForClass(newClassId);
          if (recBuild) {
            state.recommendedPoints = Object.assign({}, recBuild.points);
          } else {
            state.recommendedPoints = {};
          }
          if (state.isBlankSlate) {
            state.points = {};
            const clsData = getClassData(newClassId);
            state.specName = clsData ? `${clsData.name} Custom Build` : 'Custom Blank Slate';
          } else if (recBuild) {
            state.points = Object.assign({}, recBuild.points);
            state.specName = recBuild.specName;
          } else {
            state.points = {};
            state.specName = 'Custom Build';
          }
          state.originalPoints = Object.assign({}, state.points);
          renderModalBody();
        }
      };
    });

    // 1c. Preset Switcher Buttons (Blank Slate vs Recommended Spec)
    const toggleBlankBtn = content.querySelector('#btn-toggle-blank-slate');
    if (toggleBlankBtn) {
      toggleBlankBtn.onclick = () => {
        hideTalentTooltip();
        state.isBlankSlate = true;
        state.points = {};
        const clsData = getClassData(state.classId);
        state.specName = clsData ? `${clsData.name} Custom Build` : 'Custom Blank Slate';
        renderModalBody();
      };
    }

    content.querySelectorAll('[data-action="load-spec"]').forEach(btn => {
      btn.onclick = () => {
        hideTalentTooltip();
        const specId = btn.getAttribute('data-spec-id');
        const bisData = window.WOW_BIS_DATA || (typeof WOW_BIS_DATA !== 'undefined' ? WOW_BIS_DATA : null);
        const availableSpecs = (bisData && bisData[state.classId] && bisData[state.classId].specs) ? bisData[state.classId].specs : [];
        const specObj = availableSpecs.find(s => s.id === specId);
        if (specObj && specObj.talents && specObj.talents.buildUrl) {
          state.isBlankSlate = false;
          state.specId = specObj.id;
          state.specName = specObj.name;
          state.points = parseBuildUrl(state.classId, specObj.talents.buildUrl);
          renderModalBody();
          if (window.showToast) {
            window.showToast(`Loaded ${specObj.name} talent build!`, 'info');
          }
        }
      };
    });


    // 1d. Theorycrafting Cap Selector Buttons
    content.querySelectorAll('.bis-cap-btn').forEach(btn => {
      btn.onclick = () => {
        const cap = btn.getAttribute('data-cap');
        if (cap) {
          hideTalentTooltip();
          setCapMode(cap);
        }
      };
    });

    // 2. View Mode Switcher
    content.querySelectorAll('.bis-view-toggle-btn').forEach(btn => {
      btn.onclick = () => {
        const view = btn.getAttribute('data-view');
        if (view && view !== state.viewMode) {
          hideTalentTooltip();
          state.viewMode = view;
          renderModalBody();
        }
      };
    });

    // 3. Search Filter in Cards Mode
    const searchInput = content.querySelector('#bis-talent-search-input');
    if (searchInput) {
      searchInput.oninput = (e) => {
        state.cardSearchQuery = e.target.value;
        const listContainer = content.querySelector('.bis-cards-tree-columns');
        if (listContainer) {
          listContainer.outerHTML = renderDetailedCardsView(classData).match(/<div class="bis-cards-tree-columns">[\s\S]*<\/div>\s*<\/div>/)?.[0] || '';
          bindModalEvents();
        }
      };
    }

    // 4. Reset & Clear Buttons

    const clearAllBtn = content.querySelector('#btn-clear-all-talents');
    if (clearAllBtn) {
      clearAllBtn.onclick = () => {
        hideTalentTooltip();
        state.points = {};
        renderModalBody();
      };
    }

    // 5. Tree Mini Reset Buttons
    content.querySelectorAll('[data-action="reset-tree"]').forEach(btn => {
      btn.onclick = (e) => {
        e.stopPropagation();
        hideTalentTooltip();
        const treeIdx = parseInt(btn.getAttribute('data-tree'), 10);
        classData.talents.forEach(t => {
          if (t.tree === treeIdx) {
            delete state.points[t.id];
          }
        });
        renderModalBody();
      };
    });

    // 6. Interactive Talent Slots in Grid Mode (with Shift fast-actions)
    content.querySelectorAll('.bis-talent-slot').forEach(slot => {
      const talentId = parseInt(slot.getAttribute('data-talent-id'), 10);
      const talent = classData.talents.find(t => t.id === talentId);
      if (!talent) return;

      // Tooltip Hover
      slot.addEventListener('mouseenter', (e) => {
        showTalentTooltip(talent, e);
      });
      slot.addEventListener('mousemove', (e) => {
        const tooltip = document.getElementById('wow-item-tooltip');
        if (tooltip && !tooltip.hasAttribute('hidden')) {
          positionTooltip(e, tooltip);
        }
      });
      slot.addEventListener('mouseleave', () => {
        hideTalentTooltip();
      });

      // Left-Click: Learn point (Shift+Click: max out)
      slot.addEventListener('click', (e) => {
        e.preventDefault();
        let changed = false;
        if (e.shiftKey) {
          while (canAddPoint(talent)) {
            state.points[talent.id] = (state.points[talent.id] || 0) + 1;
            changed = true;
          }
        } else if (canAddPoint(talent)) {
          state.points[talent.id] = (state.points[talent.id] || 0) + 1;
          changed = true;
        }
        if (changed) {
          renderModalBody();
          const refreshedSlot = content.querySelector(`.bis-talent-slot[data-talent-id="${talent.id}"]`);
          if (refreshedSlot) showTalentTooltip(talent, e);
        }
      });

      // Right-Click: Refund point (Shift+Right-Click: refund all points in node)
      slot.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        let changed = false;
        if (e.shiftKey) {
          while (canRefundPoint(talent)) {
            const current = state.points[talent.id] || 0;
            if (current > 1) {
              state.points[talent.id] = current - 1;
              changed = true;
            } else if (current === 1) {
              delete state.points[talent.id];
              changed = true;
              break;
            } else {
              break;
            }
          }
        } else if (canRefundPoint(talent)) {
          const current = state.points[talent.id] || 0;
          if (current > 1) {
            state.points[talent.id] = current - 1;
          } else {
            delete state.points[talent.id];
          }
          changed = true;
        }
        if (changed) {
          renderModalBody();
          const refreshedSlot = content.querySelector(`.bis-talent-slot[data-talent-id="${talent.id}"]`);
          if (refreshedSlot) showTalentTooltip(talent, e);
        }
      });
    });

    // 7. Card Mode Plus/Minus Buttons & Hover Tooltips
    content.querySelectorAll('.bis-talent-card-icon-wrap').forEach(wrap => {
      const parent = wrap.closest('.bis-tree-node-visual');
      if (!parent) return;
      const talentId = parseInt(parent.getAttribute('data-talent-id'), 10);
      const talent = classData.talents.find(t => t.id === talentId);
      if (!talent) return;

      wrap.addEventListener('mouseenter', (e) => {
        showTalentTooltip(talent, e);
      });
      wrap.addEventListener('mousemove', (e) => {
        const tooltip = document.getElementById('wow-item-tooltip');
        if (tooltip && !tooltip.hasAttribute('hidden')) {
          positionTooltip(e, tooltip);
        }
      });
      wrap.addEventListener('mouseleave', () => {
        hideTalentTooltip();
      });
    });

    content.querySelectorAll('.bis-card-step-btn').forEach(btn => {
      btn.onclick = (e) => {
        e.stopPropagation();
        const action = btn.getAttribute('data-action');
        const talentId = parseInt(btn.getAttribute('data-talent-id'), 10);
        const talent = classData.talents.find(t => t.id === talentId);
        if (!talent) return;

        if (action === 'plus' && canAddPoint(talent)) {
          state.points[talent.id] = (state.points[talent.id] || 0) + 1;
          renderModalBody();
          const refreshedWrap = content.querySelector(`.bis-tree-node-visual[data-talent-id="${talent.id}"] .bis-talent-card-icon-wrap`);
          if (refreshedWrap) showTalentTooltip(talent, e);
        } else if (action === 'minus' && canRefundPoint(talent)) {
          const current = state.points[talent.id] || 0;
          if (current > 1) {
            state.points[talent.id] = current - 1;
          } else {
            delete state.points[talent.id];
          }
          renderModalBody();
          const refreshedWrap = content.querySelector(`.bis-tree-node-visual[data-talent-id="${talent.id}"] .bis-talent-card-icon-wrap`);
          if (refreshedWrap) showTalentTooltip(talent, e);
        }
      };
    });

    // 8. Footer Copy Buttons - 100% In-House WoW Forever Links
    const copyCodeBtn = content.querySelector('#btn-modal-copy-code');
    if (copyCodeBtn) {
      copyCodeBtn.onclick = () => {
        const code = generateBuildCode(state.classId, state.specId, state.points);
        if (navigator.clipboard) {
          navigator.clipboard.writeText(code).then(() => {
            copyCodeBtn.innerHTML = `<span>✅</span> Copied Code!`;
            setTimeout(() => {
              if (copyCodeBtn) copyCodeBtn.innerHTML = `<span>📋</span> Copy Build Code (<code style="color: #facc15;">${escapeHtml(code)}</code>)`;
            }, 2000);
          });
        }
      };
    }

    const copyUrlBtn = content.querySelector('#btn-modal-copy-url');
    if (copyUrlBtn) {
      copyUrlBtn.onclick = () => {
        const urlPath = generateBuildUrl(state.classId, state.points);
        // Pure in-house WoW Forever URL format - zero competitor references
        const fullUrl = `${window.location.origin}${window.location.pathname}#calculator?class=${state.classId}&b=${encodeURIComponent(urlPath)}`;
        if (navigator.clipboard) {
          navigator.clipboard.writeText(fullUrl).then(() => {
            copyUrlBtn.innerHTML = `<span>✅</span> Copied WoW Forever Link!`;
            setTimeout(() => {
              if (copyUrlBtn) copyUrlBtn.innerHTML = `<span>🔗</span> Copy Build Link`;
            }, 2000);
          });
        }
      };
    }

    const exportDiscordBtn = content.querySelector('#btn-modal-export-discord');
    if (exportDiscordBtn) {
      exportDiscordBtn.onclick = () => {
        const classObj = getClassData(state.classId);
        const className = classObj ? classObj.name : state.classId;
        const treeNames = classObj ? classObj.trees.map(t => t.name) : ['Tree 1', 'Tree 2', 'Tree 3'];
        const p1 = getTreePoints(0);
        const p2 = getTreePoints(1);
        const p3 = getTreePoints(2);

        let md = `**🌲 WoW Forever — Level 30 ${className} Build (${p1}/${p2}/${p3})**\n`;
        md += `*Spec: ${state.specName || 'Custom Build'} • ${p1 + p2 + p3}/${state.maxPoints} Points Allocated*\n`;

        [0, 1, 2].forEach(treeIdx => {
          const tName = treeNames[treeIdx];
          const tPoints = getTreePoints(treeIdx);
          if (tPoints > 0) {
            md += `\n**${tName} (${tPoints} pts):**\n`;
            const allocatedTalents = [];
            classObj.trees[treeIdx].talents.forEach(t => {
              const pts = state.points[t.id] || 0;
              if (pts > 0) {
                allocatedTalents.push(`• ${t.name} (${pts}/${t.maxRank})`);
              }
            });
            md += allocatedTalents.join('\n') + '\n';
          }
        });

        const fullUrl = `${window.location.origin}${window.location.pathname}#calculator?class=${state.classId}&b=${encodeURIComponent(generateBuildUrl(state.classId, state.points))}`;
        md += `\n🔗 View Interactive Tree: ${fullUrl}\n`;

        const copyFn = window.copyTextToClipboard || ((t, fn) => navigator.clipboard?.writeText(t).then(fn));
        copyFn(md, () => {
          const orig = exportDiscordBtn.innerHTML;
          exportDiscordBtn.innerHTML = `<span>✅</span> Export Copied!`;
          setTimeout(() => {
            if (exportDiscordBtn) exportDiscordBtn.innerHTML = orig;
          }, 2000);
          if (window.showToast) {
            window.showToast('Build summary formatted for Discord copied!', 'success');
          }
        });
      };
    }

    // 9. Deep Dive Navigation
    const deepdiveBtn = content.querySelector('#btn-modal-deepdive');
    if (deepdiveBtn) {
      deepdiveBtn.onclick = () => {
        if (isModal && modal) {
          state.isOpen = false;
          modal.classList.remove('open');
          modal.setAttribute('hidden', '');
        }
        hideTalentTooltip();
        const navTabBtn = document.querySelector('.nav-tab-btn[data-tab="deepdives"]');
        if (navTabBtn) navTabBtn.click();
        if (typeof window.switchDeepDiveClass === 'function') {
          window.switchDeepDiveClass(state.classId);
        }
      };
    }

    // 10. Saved Builds Event Listeners
    const saveBuildBtn = content.querySelector('#btn-save-talent-build');
    if (saveBuildBtn) {
      saveBuildBtn.onclick = () => {
        saveCurrentBuild();
      };
    }

    const toggleSavedBtn = content.querySelector('#btn-toggle-saved-builds');
    if (toggleSavedBtn) {
      toggleSavedBtn.onclick = () => {
        const drawer = document.getElementById('talent-saved-builds-drawer');
        if (drawer && !drawer.hasAttribute('hidden')) {
          drawer.setAttribute('hidden', '');
        } else {
          renderSavedBuildsDrawer(true);
        }
      };
    }
  }

  /**
   * Public API to render the complete 3-tree calculator standalone into any DOM container
   */
  function renderStandalone(containerId = 'talents-standalone-mount', classId = 'warrior', options = {}) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const drawer = document.getElementById('talent-saved-builds-drawer');
    if (drawer && drawer.parentElement !== container) {
      container.appendChild(drawer);
    }
    if (drawer) drawer.setAttribute('hidden', '');

    state.targetContainerId = containerId;
    state.classId = classId || 'warrior';
    state.capMode = options.capMode || state.capMode || 'lvl30_perk';
    state.maxPoints = state.capMode === 'lvl60' ? 51 : (state.capMode === 'lvl30_base' ? 21 : 26);
    state.isBlankSlate = options.blankSlate !== undefined ? !!options.blankSlate : false;

    const recBuild = getRecommendedBuildForClass(state.classId, options.specId);
    if (recBuild) {
      state.recommendedPoints = Object.assign({}, recBuild.points);
    } else {
      state.recommendedPoints = {};
    }

    if (options.buildUrl) {
      state.points = parseBuildUrl(state.classId, options.buildUrl);
      state.specName = options.specName || (recBuild ? recBuild.specName : 'Custom Build');
    } else if (state.isBlankSlate) {
      state.points = {};
      const clsData = getClassData(state.classId);
      state.specName = clsData ? `${clsData.name} Custom Build` : 'Custom Blank Slate';
    } else if (recBuild) {
      state.points = Object.assign({}, recBuild.points);
      state.specName = recBuild.specName;
    } else {
      state.points = {};
      state.specName = 'Custom Build';
    }

    state.originalPoints = Object.assign({}, state.points);
    renderModalBody();
  }

  /**
   * Public API to open the Talent Tree Modal
   */
  function openModal(options = {}) {
    state.targetContainerId = 'bis-talent-modal-content';
    if (typeof options === 'string') {
      options = { classId: options };
    }
    state.classId = options.classId || 'priest';
    state.specId = options.specId || 'custom';
    state.capMode = options.capMode || 'lvl30_perk';
    state.maxPoints = options.maxPoints || (state.capMode === 'lvl60' ? 51 : (state.capMode === 'lvl30_base' ? 21 : 26));
    state.buildUrl = options.buildUrl || '';
    state.buildCode = options.buildCode || '';
    state.isBlankSlate = !!options.blankSlate;

    const recBuild = getRecommendedBuildForClass(state.classId, options.specId);
    if (recBuild) {
      state.recommendedPoints = Object.assign({}, recBuild.points);
    } else if (options.buildUrl) {
      state.recommendedPoints = parseBuildUrl(state.classId, options.buildUrl);
    } else {
      state.recommendedPoints = {};
    }

    if (state.isBlankSlate) {
      state.points = {};
      const classData = getClassData(state.classId);
      state.specName = options.specName || (classData ? `${classData.name} Custom Build` : 'Custom Blank Slate');
    } else if (options.buildUrl) {
      state.points = parseBuildUrl(state.classId, options.buildUrl);
      state.specName = options.specName || (recBuild ? recBuild.specName : 'Recommended Build');
    } else if (options.points) {
      state.points = Object.assign({}, options.points);
      state.specName = options.specName || 'Custom Build';
    } else if (recBuild) {
      state.points = Object.assign({}, recBuild.points);
      state.specName = options.specName || recBuild.specName;
    } else {
      state.points = {};
      state.specName = 'Custom Build';
    }

    // Save snapshot for "Reset"
    state.originalPoints = Object.assign({}, state.points);

    const modal = document.getElementById('bis-talent-modal');
    if (!modal) return;

    const modalCalc = document.getElementById('modal-talent-calculator') || document.getElementById('bis-talent-modal-content');
    const drawer = document.getElementById('talent-saved-builds-drawer');
    if (drawer && modalCalc && drawer.parentElement !== modalCalc) {
      modalCalc.appendChild(drawer);
    }
    if (drawer) drawer.setAttribute('hidden', '');

    modal.removeAttribute('hidden');
    modal.classList.add('open');
    state.isOpen = true;

    renderModalBody();

    if (options.highlightTalent) {
      setTimeout(() => {
        const slots = document.querySelectorAll('.bis-talent-slot');
        const target = Array.from(slots).find(s => {
          const aria = (s.getAttribute('aria-label') || '').toLowerCase();
          const tid = (s.getAttribute('data-talent-id') || '').toLowerCase();
          const q = options.highlightTalent.toLowerCase();
          return aria.includes(q) || tid.includes(q);
        });
        if (target) {
          target.classList.add('pulse-highlight');
          target.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          setTimeout(() => target.classList.remove('pulse-highlight'), 4500);
        }
      }, 150);
    }
  }

  /**
   * Support opening calculator directly from URL hash (e.g. #calculator?class=paladin&b=...)
   */
  function openFromHash(hashString) {
    if (!hashString) return false;
    const clean = hashString.replace(/^#/, '');
    if (!clean.startsWith('calculator') && !clean.startsWith('talents')) return false;

    const qIndex = clean.indexOf('?');
    let classId = 'warrior';
    let buildUrl = '';
    let blankSlate = false;

    if (qIndex !== -1) {
      const query = clean.substring(qIndex + 1);
      const params = new URLSearchParams(query);
      if (params.get('class')) classId = params.get('class').toLowerCase();
      if (params.get('b')) buildUrl = decodeURIComponent(params.get('b'));
      if (params.get('blank') === 'true' || params.get('empty') === 'true' || !buildUrl) {
        blankSlate = true;
      }
    } else {
      const parts = clean.split('/');
      if (parts[1]) classId = parts[1].toLowerCase();
      blankSlate = true;
    }

    openModal({
      classId,
      buildUrl,
      blankSlate,
      specName: blankSlate ? 'Custom Build (Blank Slate)' : 'Custom Build'
    });
    return true;
  }

  // Global keydown handler for Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const drawer = document.getElementById('talent-saved-builds-drawer');
      if (drawer && !drawer.hasAttribute('hidden')) {
        drawer.setAttribute('hidden', '');
        return;
      }
      if (state.isOpen) {
        const modal = document.getElementById('bis-talent-modal');
        if (modal) {
          state.isOpen = false;
          modal.classList.remove('open');
          modal.setAttribute('hidden', '');
          hideTalentTooltip();
        }
      }
    }
  });

  /**
   * Helper: Parse spec talent list format (e.g. [{ name: "Deflection", points: "5/5" }])
   * into points dictionary { [talentId]: number }
   */
  function parseSpecTalents(classId, talentsArray) {
    const points = {};
    const classData = getClassData(classId);
    if (!classData || !Array.isArray(talentsArray)) return points;

    talentsArray.forEach(t => {
      if (!t || !t.name) return;
      const cleanName = t.name.toLowerCase().trim();
      const matched = classData.talents.find(item => item.name.toLowerCase().trim() === cleanName);
      if (matched) {
        const ptsParts = String(t.points || t.rank || '1/1').split('/');
        const pts = parseInt(ptsParts[0], 10) || 1;
        points[matched.id] = Math.min(pts, matched.maxRank);
      }
    });

    return points;
  }

  /**
   * Render complete 3-tree HTML structure for inline display in Deep Dives
   */
  function renderSpecTreesHtml({ classId, points = {}, viewMode = 'grid', cardSearchQuery = '' } = {}) {
    const classData = getClassData(classId);
    if (!classData) {
      return '<div class="bis-talent-empty-state">Talent data unavailable for this class.</div>';
    }

    if (viewMode === 'cards') {
      return renderDetailedCardsView(classData, points, cardSearchQuery);
    }

    return `
      <div class="bis-talent-tree-grid">
        ${classData.trees.map((tree, treeIdx) => {
          const treePts = getTreePoints(treeIdx, points, classId);
          return `
            <div class="bis-tree-col">
              <div class="bis-tree-head">
                <div class="bis-tree-title-group">
                  <img src="${tree.icon}" alt="${escapeHtml(tree.name)}" class="bis-tree-icon" />
                  <span class="bis-tree-name">${escapeHtml(tree.name)}</span>
                </div>
                <span class="bis-tree-points-badge">${treePts} pts</span>
              </div>

              ${renderTreeVisualMatrix(classData, treeIdx, points)}
            </div>
          `;
        }).join('')}
      </div>
    `;
  }

  /**
   * Bind hover tooltips and interactive events for inline talent tree displays
   */
  function bindInlineTreeEvents(container, { classId, getPoints } = {}) {
    if (!container) return;
    const classData = getClassData(classId);
    if (!classData) return;

    const resolvePoints = () => (typeof getPoints === 'function' ? getPoints() : (getPoints || {}));

    container.querySelectorAll('.bis-talent-slot').forEach(slot => {
      const talentId = parseInt(slot.getAttribute('data-talent-id'), 10);
      const talent = classData.talents.find(t => t.id === talentId);
      if (!talent) return;

      slot.addEventListener('mouseenter', (e) => {
        showTalentTooltip(talent, e, resolvePoints(), classId);
      });
      slot.addEventListener('mousemove', (e) => {
        const tooltip = document.getElementById('wow-item-tooltip');
        if (tooltip && !tooltip.hasAttribute('hidden')) {
          positionTooltip(e, tooltip);
        }
      });
      slot.addEventListener('mouseleave', () => {
        hideTalentTooltip();
      });
    });

    container.querySelectorAll('.bis-tree-node-visual').forEach(card => {
      const talentId = parseInt(card.getAttribute('data-talent-id'), 10);
      const talent = classData.talents.find(t => t.id === talentId);
      if (!talent) return;

      card.addEventListener('mouseenter', (e) => {
        showTalentTooltip(talent, e, resolvePoints(), classId);
      });
      card.addEventListener('mouseleave', () => {
        hideTalentTooltip();
      });
    });
  }

  // Expose module globally
  window.TalentTreeModule = {
    openModal,
    openFromHash,
    renderStandalone,
    getTalentChangeInfo,
    toggleClassicDiff: () => {
      state.showClassicDiff = !state.showClassicDiff;
      renderModalBody();
      return state.showClassicDiff;
    },
    parseBuildUrl,
    parseSpecTalents,
    renderSpecTreesHtml,
    bindInlineTreeEvents,
    generateBuildUrl,
    generateBuildCode,
    canAddPoint,
    canRefundPoint,
    getTreePoints,
    getTotalPoints,
    showTalentTooltip,
    hideTalentTooltip,
    getState: () => state,
    loadSavedBuilds: getSavedBuilds,
    saveCurrentBuild,
    loadSavedBuild,
    deleteSavedBuild,
    renderSavedBuildsMenu: renderSavedBuildsDrawer
  };

})();
