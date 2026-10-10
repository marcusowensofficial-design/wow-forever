/**
 * WoW Forever Beta 1.60.1 (Build 70291) Authentic Talent Tree Module
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

  // Global State for the Active Talent Modal Session
  const state = {
    isOpen: false,
    classId: 'priest',
    specId: 'pve',
    specName: 'Shadow PvE',
    maxPoints: 26, // Default Level 30 cap (21 + 5 Talented legacy perk)
    capMode: 'lvl30_perk', // 'lvl30_perk' (26) | 'lvl30_base' (21) | 'lvl60' (51)
    viewMode: 'grid', // 'grid' | 'cards'
    cardSearchQuery: '',
    points: {}, // { [talentId]: number }
    recommendedPoints: {}, // Snapshot for "Load Recommended Spec"
    originalPoints: {}, // Snapshot when opened
    isBlankSlate: false,
    buildCode: '',
    buildUrl: ''
  };

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
  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

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
  function getTreePoints(treeIndex) {
    const classData = getClassData(state.classId);
    if (!classData) return 0;
    let sum = 0;
    classData.talents.forEach(t => {
      if (t.tree === treeIndex) {
        sum += (state.points[t.id] || 0);
      }
    });
    return sum;
  }

  /**
   * Calculate total points allocated across all trees
   */
  function getTotalPoints() {
    let sum = 0;
    for (const id in state.points) {
      sum += (state.points[id] || 0);
    }
    return sum;
  }

  /**
   * Check if a talent can have an additional point added
   */
  function canAddPoint(talent) {
    const currentRank = state.points[talent.id] || 0;
    if (currentRank >= talent.maxRank) return false;
    if (getTotalPoints() >= state.maxPoints) return false;

    // 1. Tier Gate: (row - 1) * 5 points required in this tree
    const requiredTreePoints = (talent.row - 1) * 5;
    const currentTreePoints = getTreePoints(talent.tree);
    if (currentTreePoints < requiredTreePoints) return false;

    // 2. Prerequisite Talent: must be maxed
    if (talent.req) {
      const classData = getClassData(state.classId);
      const reqTalent = classData ? classData.talents.find(t => t.id === talent.req) : null;
      if (reqTalent) {
        const reqRank = state.points[reqTalent.id] || 0;
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
  function parseBuildUrl(classId, buildUrl) {
    const points = {};
    const classData = getClassData(classId);
    if (!classData || !buildUrl) return points;

    let buildStr = '';
    const match = buildUrl.match(/[?&]b=([^&]+)/);
    if (match) {
      buildStr = decodeURIComponent(match[1]);
    } else if (buildUrl.includes('-') || /^\d+/.test(buildUrl)) {
      buildStr = decodeURIComponent(buildUrl);
    }
    if (!buildStr) return points;

    const treeParts = buildStr.split('-');

    treeParts.forEach((part, treeIdx) => {
      if (treeIdx >= classData.trees.length) return;
      // Talents in this tree sorted by row, col
      const treeTalents = classData.talents
        .filter(t => t.tree === treeIdx)
        .sort((a, b) => a.row - b.row || a.col - b.col);

      for (let i = 0; i < part.length && i < treeTalents.length; i++) {
        const val = parseInt(part[i], 10);
        if (!isNaN(val) && val > 0) {
          const t = treeTalents[i];
          points[t.id] = Math.min(val, t.maxRank);
        }
      }
    });

    return points;
  }

  /**
   * Generate canonical build URL string
   */
  function generateBuildUrl(classId, points) {
    const classData = getClassData(classId);
    if (!classData) return '';

    const parts = [];
    for (let treeIdx = 0; treeIdx < classData.trees.length; treeIdx++) {
      const treeTalents = classData.talents
        .filter(t => t.tree === treeIdx)
        .sort((a, b) => a.row - b.row || a.col - b.col);

      let treeStr = '';
      treeTalents.forEach(t => {
        const pts = points[t.id] || 0;
        treeStr += pts.toString();
      });

      // Trim trailing zeroes for brevity
      treeStr = treeStr.replace(/0+$/, '');
      parts.push(treeStr);
    }

    return `/talents/${classId}?b=${parts.join('-')}&l=30&tl=5`;
  }

  /**
   * Generate human-readable build code (e.g. FOREVER-PRIEST-SHADOW-30-0-0-26)
   */
  function generateBuildCode(classId, specId, points) {
    const classData = getClassData(classId);
    if (!classData) return `FOREVER-${classId.toUpperCase()}-30`;

    const treePoints = [0, 1, 2].map(idx => {
      return classData.talents
        .filter(t => t.tree === idx)
        .reduce((sum, t) => sum + (points[t.id] || 0), 0);
    });

    return `FOREVER-${classId.toUpperCase()}-${specId.toUpperCase()}-30-${treePoints.join('-')}`;
  }

  /**
   * Position floating tooltip safely within viewport
   */
  function positionTooltip(event, tooltip) {
    if (!tooltip) return;
    const padding = 16;
    const ttWidth = tooltip.offsetWidth || 340;
    const ttHeight = tooltip.offsetHeight || 220;

    let left = event.clientX + 16;
    let top = event.clientY + 16;

    if (left + ttWidth > window.innerWidth - padding) {
      left = event.clientX - ttWidth - 16;
    }
    if (top + ttHeight > window.innerHeight - padding) {
      top = event.clientY - ttHeight - 16;
    }

    if (left < padding) left = padding;
    if (top < padding) top = padding;

    tooltip.style.left = `${left}px`;
    tooltip.style.top = `${top}px`;
  }

  /**
   * Render rich floating tooltip content for a talent
   */
  function showTalentTooltip(talent, event) {
    let tooltip = document.getElementById('wow-item-tooltip');
    if (!tooltip) {
      tooltip = document.createElement('div');
      tooltip.id = 'wow-item-tooltip';
      tooltip.className = 'wow-floating-tooltip';
      document.body.appendChild(tooltip);
    }

    const classData = getClassData(state.classId);
    const tree = classData ? classData.trees[talent.tree] : { name: 'Specialization' };
    const pts = state.points[talent.id] || 0;
    const isMaxed = pts >= talent.maxRank;
    const hasPoints = pts > 0;
    const requiredTreePoints = (talent.row - 1) * 5;
    const currentTreePoints = getTreePoints(talent.tree);
    const meetsTreeReq = currentTreePoints >= requiredTreePoints;

    let reqTalent = null;
    let meetsPrereq = true;
    if (talent.req && classData) {
      reqTalent = classData.talents.find(t => t.id === talent.req);
      if (reqTalent) {
        meetsPrereq = (state.points[reqTalent.id] || 0) >= reqTalent.maxRank;
      }
    }

    const currentDesc = pts > 0 ? (talent.descriptions[pts - 1] || talent.descriptions[0]) : '';
    const nextDesc = pts < talent.maxRank ? (talent.descriptions[pts] || talent.descriptions[0]) : '';

    let rankBadgeHtml = '';
    if (isMaxed) {
      rankBadgeHtml = `<span style="color: #facc15; font-weight: 700; font-size: 0.78rem; background: rgba(250, 204, 21, 0.15); padding: 0.15rem 0.45rem; border-radius: 4px; border: 1px solid rgba(250, 204, 21, 0.35);">Rank ${pts} / ${talent.maxRank} (Max)</span>`;
    } else if (hasPoints) {
      rankBadgeHtml = `<span style="color: #4ade80; font-weight: 700; font-size: 0.78rem; background: rgba(74, 222, 128, 0.12); padding: 0.15rem 0.45rem; border-radius: 4px; border: 1px solid rgba(74, 222, 128, 0.3);">Rank ${pts} / ${talent.maxRank}</span>`;
    } else {
      rankBadgeHtml = `<span style="color: #94a3b8; font-weight: 600; font-size: 0.78rem; background: rgba(255, 255, 255, 0.05); padding: 0.15rem 0.45rem; border-radius: 4px; border: 1px solid rgba(255, 255, 255, 0.1);">Not Learned (0 / ${talent.maxRank})</span>`;
    }

    let requirementsHtml = '';
    if (requiredTreePoints > 0) {
      const color = meetsTreeReq ? '#4ade80' : '#f87171';
      requirementsHtml += `
        <div style="color: ${color}; font-size: 0.74rem; margin-top: 0.35rem; display: flex; align-items: center; gap: 0.3rem;">
          <span>${meetsTreeReq ? '✓' : '✗'}</span>
          <span>Requires ${requiredTreePoints} points in ${escapeHtml(tree.name)} Talents (${currentTreePoints}/${requiredTreePoints})</span>
        </div>
      `;
    }
    if (reqTalent) {
      const color = meetsPrereq ? '#4ade80' : '#f87171';
      requirementsHtml += `
        <div style="color: ${color}; font-size: 0.74rem; margin-top: 0.2rem; display: flex; align-items: center; gap: 0.3rem;">
          <span>${meetsPrereq ? '✓' : '✗'}</span>
          <span>Requires ${reqTalent.maxRank} point${reqTalent.maxRank > 1 ? 's' : ''} in ${escapeHtml(reqTalent.name)}</span>
        </div>
      `;
    }

    // Rank progression list for all ranks
    let rankProgressionHtml = '';
    if (talent.maxRank > 1 && Array.isArray(talent.descriptions) && talent.descriptions.length > 0) {
      rankProgressionHtml = `
        <div class="wow-tip-rank-progression">
          <div class="wow-tip-rank-progression-head">
            <span>Rank Progression</span>
            <span style="color: #64748b; font-weight: 600;">${talent.maxRank} Ranks</span>
          </div>
          <div class="wow-tip-rank-list">
            ${talent.descriptions.map((desc, idx) => {
              const rNum = idx + 1;
              const isCur = rNum === pts;
              const isNxt = rNum === pts + 1;
              const itemClass = isCur ? 'is-active' : (isNxt ? 'is-next' : '');
              const tagColor = isCur ? '#4ade80' : (isNxt ? '#facc15' : '#64748b');
              const statusText = isCur ? ' (Active)' : (isNxt ? ' (Next)' : '');

              return `
                <div class="wow-tip-rank-item ${itemClass}">
                  <strong style="color: ${tagColor}; font-weight: 700;">Rank ${rNum}${statusText}:</strong> ${escapeHtml(desc)}
                </div>
              `;
            }).join('')}
          </div>
        </div>
      `;
    }

    tooltip.innerHTML = `
      <div class="wow-tip-header" style="display: flex; align-items: center; justify-content: space-between; gap: 0.6rem;">
        <div style="display: flex; align-items: center; gap: 0.5rem; min-width: 0;">
          <img src="${talent.icon}" alt="" style="width: 26px; height: 26px; border-radius: 4px; border: 1px solid rgba(250, 204, 21, 0.4); object-fit: cover; flex-shrink: 0;" onerror="this.src='https://render.worldofwarcraft.com/us/icons/56/inv_misc_questionmark.jpg'" />
          <span class="wow-tip-name" style="color: #ffd100; font-size: 1.05rem; font-weight: 700; line-height: 1.2; text-shadow: 0 1px 2px rgba(0,0,0,0.8); margin: 0;">
            ${escapeHtml(talent.name)}
          </span>
        </div>
        ${rankBadgeHtml}
      </div>

      <div style="font-size: 0.74rem; color: #94a3b8; margin: 0.35rem 0 0.35rem;">
        ${escapeHtml(tree.name)} Tree • Tier ${talent.row}
      </div>

      ${requirementsHtml}

      ${hasPoints ? `
        <div style="margin-top: 0.5rem;">
          <div style="font-size: 0.72rem; color: #4ade80; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 0.2rem;">
            ${isMaxed ? 'Current Effect (Max Rank):' : `Current Effect (Rank ${pts} / ${talent.maxRank}):`}
          </div>
          <div class="wow-tip-stats" style="color: #f8fafc; font-size: 0.84rem; line-height: 1.45; margin: 0;">
            ${escapeHtml(currentDesc)}
          </div>
        </div>
      ` : ''}

      ${!isMaxed ? `
        <div style="margin-top: 0.5rem; padding-top: 0.45rem; border-top: 1px solid rgba(255, 255, 255, 0.08);">
          <div style="font-size: 0.72rem; color: #facc15; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 0.2rem;">
            ${hasPoints ? `Next Rank (${pts + 1} / ${talent.maxRank}):` : (talent.maxRank === 1 ? 'Effect to Learn:' : 'Rank 1 Preview:')}
          </div>
          <div style="color: #cbd5e1; font-size: 0.82rem; line-height: 1.45;">
            ${escapeHtml(nextDesc)}
          </div>
        </div>
      ` : ''}

      ${rankProgressionHtml}

      <div style="margin-top: 0.65rem; padding-top: 0.4rem; border-top: 1px solid rgba(255,255,255,0.08); font-size: 0.7rem; color: #64748b; display: flex; justify-content: space-between;">
        <span>Left-Click to learn (+1)</span>
        <span>Right-Click to refund (-1)</span>
      </div>
    `;

    // Ensure tooltip is fully visible and not hidden by previous operations
    tooltip.removeAttribute('hidden');
    tooltip.style.display = 'block';
    tooltip.style.opacity = '1';
    tooltip.style.pointerEvents = 'none';
    tooltip.style.zIndex = '9999999';

    positionTooltip(event, tooltip);
  }

  function hideTalentTooltip() {
    const tooltip = document.getElementById('wow-item-tooltip');
    if (tooltip) {
      tooltip.setAttribute('hidden', '');
      tooltip.style.display = 'none';
      tooltip.style.opacity = '0';
    }
  }

  /**
   * Render SVG connection lines/arrows for prerequisite talent dependencies
   */
  function renderTreeDependencyArrows(classData, treeIndex) {
    const treeTalents = classData.talents.filter(t => t.tree === treeIndex);
    const dependentTalents = treeTalents.filter(t => t.req);
    if (dependentTalents.length === 0) return '';

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

      const sourcePoints = state.points[source.id] || 0;
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
  function renderTreeVisualMatrix(classData, treeIndex) {
    const tree = classData.trees[treeIndex];
    const treeTalents = classData.talents.filter(t => t.tree === treeIndex);

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

        const pts = state.points[talent.id] || 0;
        const isMaxed = pts >= talent.maxRank;
        const hasPoints = pts > 0;
        const available = canAddPoint(talent);

        let statusClass = 'is-locked';
        if (isMaxed) {
          statusClass = 'is-maxed';
        } else if (hasPoints) {
          statusClass = 'is-active';
        } else if (available) {
          statusClass = 'is-available';
        }

        cellsHtml.push(`
          <div class="bis-talent-slot ${statusClass}"
               data-talent-id="${talent.id}"
               data-tree="${treeIndex}"
               data-row="${talent.row}"
               data-col="${talent.col}"
               tabindex="0"
               role="button"
               aria-label="${escapeHtml(talent.name)} ${pts}/${talent.maxRank}">
            <img src="${talent.icon}" alt="${escapeHtml(talent.name)}" class="bis-talent-slot-icon" loading="lazy" onerror="this.src='https://render.worldofwarcraft.com/us/icons/56/inv_misc_questionmark.jpg'" />
            <span class="bis-talent-rank-overlay ${isMaxed ? 'rank-maxed' : (hasPoints ? 'rank-active' : 'rank-unallocated')}">
              ${pts}/${talent.maxRank}
            </span>
          </div>
        `);
      }
    }

    return `
      <div class="bis-tree-matrix-container">
        ${renderTreeDependencyArrows(classData, treeIndex)}
        <div class="bis-tree-visual-matrix">
          ${cellsHtml.join('')}
        </div>
      </div>
    `;
  }

  /**
   * Render Detailed Cards View with descriptions & quick filters
   */
  function renderDetailedCardsView(classData) {
    const query = (state.cardSearchQuery || '').toLowerCase().trim();

    return `
      <div class="bis-talent-cards-container">
        <!-- Search & Filter bar -->
        <div class="bis-cards-filter-bar">
          <input type="search" class="bis-cards-search-input" 
                 placeholder="Search abilities by name or description..." 
                 value="${escapeHtml(state.cardSearchQuery)}"
                 id="bis-talent-search-input" />
          <span style="font-size: 0.8rem; color: #94a3b8;">
            Showing abilities across all 3 specialization trees
          </span>
        </div>

        <div class="bis-cards-tree-columns">
          ${classData.trees.map((tree, treeIdx) => {
            const treeTalents = classData.talents
              .filter(t => t.tree === treeIdx)
              .filter(t => {
                if (!query) return true;
                const matchName = t.name.toLowerCase().includes(query);
                const matchDesc = t.descriptions.some(d => d.toLowerCase().includes(query));
                return matchName || matchDesc;
              })
              .sort((a, b) => a.row - b.row || a.col - b.col);

            const treePts = getTreePoints(treeIdx);

            return `
              <div class="bis-cards-tree-group">
                <div class="bis-cards-group-head">
                  <div style="display: flex; align-items: center; gap: 0.5rem;">
                    <img src="${tree.icon}" alt="${escapeHtml(tree.name)}" class="bis-tree-icon" />
                    <strong>${escapeHtml(tree.name)}</strong>
                  </div>
                  <span class="bis-tree-points-badge">${treePts} pts</span>
                </div>

                <div class="bis-tree-nodes-list">
                  ${treeTalents.length === 0 ? `
                    <div style="padding: 1.5rem; text-align: center; color: #64748b; font-size: 0.82rem;">
                      No talents match your search in this tree.
                    </div>
                  ` : treeTalents.map(talent => {
                    const pts = state.points[talent.id] || 0;
                    const isMaxed = pts >= talent.maxRank;
                    const hasPoints = pts > 0;
                    const currentDesc = pts > 0 ? (talent.descriptions[pts - 1] || talent.descriptions[0]) : talent.descriptions[0];

                    return `
                      <div class="bis-tree-node-visual ${isMaxed ? 'is-maxed' : (hasPoints ? 'is-active' : '')}"
                           data-talent-id="${talent.id}">
                        <div class="bis-talent-card-icon-wrap">
                          <img src="${talent.icon}" alt="${escapeHtml(talent.name)}" class="bis-talent-card-icon" loading="lazy" />
                          <span class="bis-talent-rank-overlay">${pts}/${talent.maxRank}</span>
                        </div>
                        <div class="bis-talent-card-body">
                          <div class="bis-talent-card-head">
                            <span class="bis-talent-card-name">
                              ${escapeHtml(talent.name)}
                              <span style="font-size: 0.72rem; color: #94a3b8; font-weight: normal; margin-left: 0.35rem;">Tier ${talent.row}</span>
                            </span>
                            <div class="bis-card-actions">
                              <button type="button" class="bis-card-step-btn" data-action="minus" data-talent-id="${talent.id}" title="Refund point" ${pts <= 0 ? 'disabled' : ''}>-</button>
                              <span class="bis-talent-card-rank">${pts} / ${talent.maxRank}</span>
                              <button type="button" class="bis-card-step-btn" data-action="plus" data-talent-id="${talent.id}" title="Add point" ${!canAddPoint(talent) ? 'disabled' : ''}>+</button>
                            </div>
                          </div>
                          <div class="bis-node-desc">${escapeHtml(currentDesc)}</div>
                        </div>
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

  /**
   * Set theorycrafting cap mode: lvl30_perk (26p), lvl30_base (21p), lvl60 (51p)
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

  /**
   * Render the complete modal body
   */
  function renderModalBody() {
    const modal = document.getElementById('bis-talent-modal');
    const content = document.getElementById('bis-talent-modal-content');
    if (!modal || !content) return;

    const classData = getClassData(state.classId);
    if (!classData) {
      content.innerHTML = `<div style="padding: 2rem; color: #f87171; text-align: center;">Unable to load talent database for ${escapeHtml(state.classId)}.</div>`;
      return;
    }

    const totalPoints = getTotalPoints();
    const treePoints = [0, 1, 2].map(idx => getTreePoints(idx));
    const buildCode = generateBuildCode(state.classId, state.specId, state.points);
    const buildUrl = generateBuildUrl(state.classId, state.points);
    const pointsRemaining = Math.max(0, state.maxPoints - totalPoints);

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

      <!-- Modal Header -->
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

          <!-- Preset Switcher: Blank Slate vs Recommended Spec -->
          <div class="bis-preset-toggle-group">
            <button type="button" class="bis-talent-pill-btn ${state.isBlankSlate && totalPoints === 0 ? 'active-mode' : ''}" id="btn-toggle-blank-slate" title="Start with empty talent trees (0 points)">
              <span>✨</span> Blank Slate
            </button>
            <button type="button" class="bis-talent-pill-btn ${!state.isBlankSlate ? 'active-mode' : ''}" id="btn-toggle-spec-build" title="Load curated recommended talent build">
              <span>🌟</span> Recommended Build
            </button>
          </div>

          <!-- Theorycrafting Cap Selector -->
          <div class="bis-cap-selector-group" title="Select theorycrafting points cap">
            <button type="button" class="bis-cap-btn ${state.capMode === 'lvl30_perk' ? 'active' : ''}" data-cap="lvl30_perk" title="Level 30 Beta Cap (26 pts with Talented perk)">Lvl 30 (26p)</button>
            <button type="button" class="bis-cap-btn ${state.capMode === 'lvl30_base' ? 'active' : ''}" data-cap="lvl30_base" title="Level 30 Standard Cap (21 pts without perk)">Lvl 30 (21p)</button>
            <button type="button" class="bis-cap-btn ${state.capMode === 'lvl60' ? 'active' : ''}" data-cap="lvl60" title="Level 60 Endgame Theorycrafting (51 pts)">Lvl 60 (51p)</button>
          </div>

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
          <button type="button" class="bis-talent-foot-btn" id="btn-modal-copy-code" title="Copy talent build code">
            <span>📋</span> Copy Build Code (<code style="color: #facc15;">${escapeHtml(buildCode)}</code>)
          </button>
          <button type="button" class="bis-talent-foot-btn" id="btn-modal-copy-url" title="Copy shareable calculator link">
            <span>🔗</span> Copy Build Link
          </button>
          <button type="button" class="bis-talent-foot-btn primary" id="btn-modal-deepdive">
            <span>🎯</span> Explore ${classData.name} Deep Dive
          </button>
        </div>
        <div style="display: flex; align-items: center; gap: 0.85rem; flex-wrap: wrap;">
          <span class="bis-talent-controls-hint">💡 Left-Click (+1) • Shift+Click (Max) • Right-Click (-1) • Shift+Right-Click (Clear)</span>
          <button type="button" class="bis-talent-foot-btn" id="btn-modal-close-foot">
            ✕ Close Window
          </button>
        </div>
      </div>
    `;

    bindModalEvents();
  }

  /**
   * Bind DOM events for the modal interactions
   */
  function bindModalEvents() {
    const modal = document.getElementById('bis-talent-modal');
    const content = document.getElementById('bis-talent-modal-content');
    if (!content) return;

    const classData = getClassData(state.classId);
    if (!classData) return;

    // 1. Close buttons
    const closeBtn = document.getElementById('bis-talent-modal-close');
    const closeFootBtn = document.getElementById('btn-modal-close-foot');
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
    const toggleBlankBtn = document.getElementById('btn-toggle-blank-slate');
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

    const toggleSpecBtn = document.getElementById('btn-toggle-spec-build');
    if (toggleSpecBtn) {
      toggleSpecBtn.onclick = () => {
        hideTalentTooltip();
        state.isBlankSlate = false;
        const recBuild = getRecommendedBuildForClass(state.classId, state.specId);
        if (recBuild) {
          state.points = Object.assign({}, recBuild.points);
          state.specName = recBuild.specName;
        } else {
          state.points = Object.assign({}, state.recommendedPoints);
        }
        renderModalBody();
      };
    }

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
    const searchInput = document.getElementById('bis-talent-search-input');
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
    const resetSpecBtn = document.getElementById('btn-reset-spec-talents');
    if (resetSpecBtn) {
      resetSpecBtn.onclick = () => {
        hideTalentTooltip();
        state.points = Object.assign({}, state.originalPoints);
        renderModalBody();
      };
    }

    const clearAllBtn = document.getElementById('btn-clear-all-talents');
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
    const copyCodeBtn = document.getElementById('btn-modal-copy-code');
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

    const copyUrlBtn = document.getElementById('btn-modal-copy-url');
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

    // 9. Deep Dive Navigation
    const deepdiveBtn = document.getElementById('btn-modal-deepdive');
    if (deepdiveBtn) {
      deepdiveBtn.onclick = () => {
        closeModal();
        if (window.switchTab) {
          window.switchTab('deepdives');
          if (window.switchDeepDiveClass) {
            window.switchDeepDiveClass(state.classId);
          }
        }
      };
    }
  }

  /**
   * Public API to open the Talent Tree Modal
   */
  function openModal(options = {}) {
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

    modal.removeAttribute('hidden');
    modal.classList.add('open');
    state.isOpen = true;

    renderModalBody();
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
    if (e.key === 'Escape' && state.isOpen) {
      const modal = document.getElementById('bis-talent-modal');
      if (modal) {
        state.isOpen = false;
        modal.classList.remove('open');
        modal.setAttribute('hidden', '');
        hideTalentTooltip();
      }
    }
  });

  // Expose module globally
  window.TalentTreeModule = {
    openModal,
    openFromHash,
    parseBuildUrl,
    generateBuildUrl,
    generateBuildCode,
    canAddPoint,
    canRefundPoint,
    getState: () => state
  };

})();
