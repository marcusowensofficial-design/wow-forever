/**
 * World of Warcraft: Forever - Talent Tree Codecs, Tooltips, Cards & Build Persistence
 */
(function () {
  "use strict";

  const escapeHtml = window.escapeHtml || (s => String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"));

  function getClassData(classId) {
    if (window.WOW_TALENT_CORE && window.WOW_TALENT_CORE.getClassData) {
      return window.WOW_TALENT_CORE.getClassData(classId);
    }
    const data = window.WOW_TALENTS_DATA;
    return (data && data[classId]) || null;
  }

  function getTalentChangeInfo(classId, talentName) {
    if (window.WOW_TALENT_CORE && window.WOW_TALENT_CORE.getTalentChangeInfo) {
      return window.WOW_TALENT_CORE.getTalentChangeInfo(classId, talentName);
    }
    return null;
  }

  function getTreePoints(treeIndex, customPoints = null, customClassId = null) {
    if (window.WOW_TALENT_CORE && window.WOW_TALENT_CORE.getTreePoints) {
      return window.WOW_TALENT_CORE.getTreePoints(treeIndex, customPoints, customClassId);
    }
    return 0;
  }

  function getTotalPoints(customPoints = null) {
    if (window.WOW_TALENT_CORE && window.WOW_TALENT_CORE.getTotalPoints) {
      return window.WOW_TALENT_CORE.getTotalPoints(customPoints);
    }
    return 0;
  }

  function canAddPoint(talent, customPoints = null, customMaxPoints = null, customClassId = null) {
    if (window.WOW_TALENT_CORE && window.WOW_TALENT_CORE.canAddPoint) {
      return window.WOW_TALENT_CORE.canAddPoint(talent, customPoints, customMaxPoints, customClassId);
    }
    return false;
  }

  function canRefundPoint(talent) {
    if (window.WOW_TALENT_CORE && window.WOW_TALENT_CORE.canRefundPoint) {
      return window.WOW_TALENT_CORE.canRefundPoint(talent);
    }
    return false;
  }

  const state = new Proxy({}, {
    get(target, prop) {
      const s = window.WOW_TALENT_TREE_STATE || {};
      return s[prop];
    },
    set(target, prop, val) {
      const s = window.WOW_TALENT_TREE_STATE || {};
      s[prop] = val;
      return true;
    }
  });

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
  function showTalentTooltip(talent, event, customPoints = null, customClassId = null) {
    let tooltip = document.getElementById('wow-item-tooltip');
    if (!tooltip) {
      tooltip = document.createElement('div');
      tooltip.id = 'wow-item-tooltip';
      tooltip.className = 'wow-floating-tooltip';
      document.body.appendChild(tooltip);
    }

    const activeClassId = customClassId || state.classId;
    const classData = getClassData(activeClassId);
    const tree = classData ? classData.trees[talent.tree] : { name: 'Specialization' };
    const ptsMap = customPoints || state.points;
    const pts = ptsMap[talent.id] || 0;
    const isMaxed = pts >= talent.maxRank;
    const hasPoints = pts > 0;
    const requiredTreePoints = (talent.row - 1) * 5;
    const currentTreePoints = getTreePoints(talent.tree, ptsMap, activeClassId);
    const meetsTreeReq = currentTreePoints >= requiredTreePoints;

    let reqTalent = null;
    let meetsPrereq = true;
    if (talent.req && classData) {
      reqTalent = classData.talents.find(t => t.id === talent.req);
      if (reqTalent) {
        meetsPrereq = (ptsMap[reqTalent.id] || 0) >= reqTalent.maxRank;
      }
    }

    const currentDesc = pts > 0 ? (talent.descriptions[pts - 1] || talent.descriptions[0]) : '';
    const nextDesc = pts < talent.maxRank ? (talent.descriptions[pts] || talent.descriptions[0]) : '';

    let rankBadgeHtml;
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

    let diffBannerHtml = '';
    if (state.showClassicDiff) {
      const diffInfo = getTalentChangeInfo(activeClassId, talent.name);
      if (diffInfo && diffInfo.reported_change_kind && diffInfo.reported_change_kind !== 'unchanged') {
        const kind = diffInfo.reported_change_kind;
        const kindLabel = kind === 'added' ? 'New in Forever' : (kind === 'modified' ? 'Modified in Forever' : 'Moved Tier / Tree');
        const badgeClass = kind === 'added' ? 'diff-tag-new' : (kind === 'modified' ? 'diff-tag-mod' : 'diff-tag-moved');
        diffBannerHtml = `
          <div class="wow-tip-diff-banner ${badgeClass}">
            <div class="diff-banner-head">
              <span>⚡ ${kindLabel}</span>
              <span class="diff-badge-status">${escapeHtml(diffInfo.comparison_status || 'Verified vs Classic Era')}</span>
            </div>
            ${diffInfo.summary ? `<div class="diff-banner-summary">${escapeHtml(diffInfo.summary)}</div>` : ''}
            ${Array.isArray(diffInfo.changes) && diffInfo.changes.length > 0 ? `
              <div class="diff-banner-bullets">
                ${diffInfo.changes.map(c => `• ${escapeHtml(c)}`).join(' ')}
              </div>
            ` : ''}
          </div>
        `;
      }
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

      ${diffBannerHtml}

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

  function renderDetailedCardsView(classData, customPoints = null, customQuery = null) {
    const ptsMap = customPoints || state.points;
    const query = (customQuery !== null && customQuery !== undefined ? customQuery : (state.cardSearchQuery || '')).toLowerCase().trim();

    return `
      <div class="bis-talent-cards-container">
        <!-- Search & Filter bar -->
        <div class="bis-cards-filter-bar">
          <input type="search" class="bis-cards-search-input" 
                 placeholder="Search abilities by name or description..." 
                 value="${escapeHtml(query)}"
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

            const treePts = getTreePoints(treeIdx, ptsMap, classData.id);

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
                    const pts = ptsMap[talent.id] || 0;
                    const isMaxed = pts >= talent.maxRank;
                    const hasPoints = pts > 0;
                    const currentDesc = pts > 0 ? (talent.descriptions[pts - 1] || talent.descriptions[0]) : talent.descriptions[0];

                    let cardDiffBadge = '';
                    let cardDiffSummary = '';
                    if (state.showClassicDiff) {
                      const diffInfo = getTalentChangeInfo(classData.id, talent.name);
                      if (diffInfo && diffInfo.reported_change_kind && diffInfo.reported_change_kind !== 'unchanged') {
                        const kind = diffInfo.reported_change_kind;
                        const badgeClass = kind === 'added' ? 'new' : (kind === 'modified' ? 'mod' : 'moved');
                        const label = kind === 'added' ? '+New' : (kind === 'modified' ? '~Mod' : '⇄Moved');
                        cardDiffBadge = `<span class="bis-diff-badge ${badgeClass}" style="position:static; display:inline-block; margin-left:0.4rem; vertical-align:middle;">${label}</span>`;
                        if (diffInfo.summary) {
                          cardDiffSummary = `<div style="font-size: 0.74rem; color: #facc15; margin-top: 0.25rem;">⚡ Classic Diff: ${escapeHtml(diffInfo.summary)}</div>`;
                        }
                      }
                    }

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
                              ${cardDiffBadge}
                            </span>
                            <div class="bis-card-actions">
                              <button type="button" class="bis-card-step-btn" data-action="minus" data-talent-id="${talent.id}" title="Refund point" ${pts <= 0 ? 'disabled' : ''}>-</button>
                              <span class="bis-talent-card-rank">${pts} / ${talent.maxRank}</span>
                              <button type="button" class="bis-card-step-btn" data-action="plus" data-talent-id="${talent.id}" title="Add point" ${!canAddPoint(talent, ptsMap, null, classData.id) ? 'disabled' : ''}>+</button>
                            </div>
                          </div>
                          <div class="bis-node-desc">
                            ${escapeHtml(currentDesc)}
                            ${cardDiffSummary}
                          </div>
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

  const STORAGE_KEY_SAVED_BUILDS = 'wow_forever_saved_talent_builds';

  function getSavedBuilds() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY_SAVED_BUILDS);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      console.warn('Failed to parse saved talent builds from localStorage', e);
      return [];
    }
  }

  function saveSavedBuilds(builds) {
    try {
      localStorage.setItem(STORAGE_KEY_SAVED_BUILDS, JSON.stringify(builds));
      return true;
    } catch (e) {
      console.error('Failed to save talent builds to localStorage', e);
      return false;
    }
  }

  function saveCurrentBuild(classId = state.classId, buildName = null) {
    const classData = getClassData(classId);
    if (!classData) return;
    const totalPoints = getTotalPoints(state.points);
    const defaultName = buildName || (state.specName && state.specName !== 'Custom Build' ? `${state.specName} (${totalPoints}p)` : `${classData.name} Build (${totalPoints}p)`);
    const name = buildName || window.prompt('Enter a title for this custom build:', defaultName);
    if (name === null) return;
    const trimmedName = name.trim();
    if (!trimmedName) {
      if (window.showToast) window.showToast('Build name cannot be empty.', 'warning');
      return;
    }

    state.specName = trimmedName;

    const builds = getSavedBuilds();
    const newBuild = {
      id: 'build_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
      name: trimmedName,
      classId: classId,
      className: classData.name,
      specId: state.specId,
      points: Object.assign({}, state.points),
      totalPoints: totalPoints,
      treePoints: [0, 1, 2].map(idx => getTreePoints(idx)),
      buildCode: generateBuildCode(classId, state.specId, state.points),
      buildUrl: generateBuildUrl(classId, state.points),
      timestamp: new Date().toISOString()
    };

    builds.unshift(newBuild);
    saveSavedBuilds(builds);
    if (window.showToast) {
      window.showToast(`Saved build "${trimmedName}" to browser storage!`, 'success');
    }
    renderModalBody();
    renderSavedBuildsDrawer(true);
  }

  function deleteSavedBuild(buildId) {
    let builds = getSavedBuilds();
    const target = builds.find(b => b.id === buildId);
    builds = builds.filter(b => b.id !== buildId);
    saveSavedBuilds(builds);
    if (window.showToast) {
      window.showToast(target ? `Deleted "${target.name}".` : 'Build deleted.', 'info');
    }
    renderModalBody();
    renderSavedBuildsDrawer(true);
  }

  function loadSavedBuild(buildId) {
    const builds = getSavedBuilds();
    const build = builds.find(b => b.id === buildId);
    if (!build) return;
    state.classId = build.classId;
    state.specId = build.specId || 'custom';
    state.points = Object.assign({}, build.points);
    state.originalPoints = Object.assign({}, build.points);
    const recBuild = getRecommendedBuildForClass(build.classId);
    state.recommendedPoints = recBuild ? Object.assign({}, recBuild.points) : {};
    state.specName = build.name;
    state.isBlankSlate = false;

    // Hide drawer on load so player can immediately view and interact with the 3 trees
    const drawer = document.getElementById('talent-saved-builds-drawer');
    if (drawer) {
      drawer.setAttribute('hidden', '');
    }

    renderModalBody();
    if (window.showToast) {
      window.showToast(`Loaded build "${build.name}"!`, 'success');
    }
  }

  function renderSavedBuildsDrawer(forceOpen = false) {
    const isStandalone = state.targetContainerId === 'talents-standalone-mount';
    const targetParent = isStandalone
      ? document.getElementById('talents-standalone-mount')
      : (document.getElementById('modal-talent-calculator') || document.getElementById('bis-talent-modal-content'));

    let drawer = document.getElementById('talent-saved-builds-drawer');
    if (!drawer) {
      if (targetParent) {
        drawer = document.createElement('div');
        drawer.id = 'talent-saved-builds-drawer';
        drawer.className = 'talent-saved-builds-drawer';
        drawer.setAttribute('aria-label', 'My Saved Talent Builds');
        targetParent.appendChild(drawer);
      }
    } else if (targetParent && drawer.parentElement !== targetParent) {
      targetParent.appendChild(drawer);
    }
    if (!drawer) return;

    if (forceOpen) {
      drawer.removeAttribute('hidden');
    }

    const builds = getSavedBuilds();
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

    drawer.innerHTML = `
      <div class="saved-builds-drawer-head">
        <h4 class="saved-builds-drawer-title">
          <span>📁</span> My Saved Builds <span class="bis-saved-count-chip">${builds.length}</span>
        </h4>
        <button type="button" class="saved-builds-drawer-close" aria-label="Close Saved Builds Drawer">✕</button>
      </div>
      <div class="saved-builds-drawer-body">
        ${builds.length === 0 ? `
          <div class="saved-builds-empty">
            <div class="saved-builds-empty-icon">📂</div>
            <p><strong>No saved builds yet.</strong></p>
            <p style="font-size: 0.8rem; margin-top: 0.35rem;">Allocate talent points and click <strong>"Save Build"</strong> to keep custom theorycrafted setups in your browser.</p>
          </div>
        ` : builds.map(b => {
          const isCurrentClass = b.classId === state.classId;
          const color = classColors[b.classId] || '#facc15';
          const dateStr = b.timestamp ? new Date(b.timestamp).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }) : '';
          const ptsStr = b.treePoints ? b.treePoints.join(' / ') : `${b.totalPoints || 0} pts`;
          return `
            <div class="saved-build-card ${isCurrentClass ? 'is-current-class' : ''}">
              <div class="saved-build-top-row">
                <span class="saved-build-name">${escapeHtml(b.name)}</span>
                <span class="saved-build-class-badge" style="background: ${color}20; color: ${color}; border: 1px solid ${color}60;">
                  ${escapeHtml(b.className || b.classId)}
                </span>
              </div>
              <div class="saved-build-meta-row">
                <span class="saved-build-points-pill">📊 ${ptsStr} (${b.totalPoints || 0} pts)</span>
                <span>${dateStr}</span>
              </div>
              <div class="saved-build-actions-row">
                <button type="button" class="btn-load-saved-build" data-action="load-build" data-build-id="${b.id}">
                  ▶ Load Build
                </button>
                <button type="button" class="btn-delete-saved-build" data-action="delete-build" data-build-id="${b.id}" title="Delete this saved build">
                  🗑️
                </button>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    `;

    // Bind drawer events
    const closeBtn = drawer.querySelector('.saved-builds-drawer-close');
    if (closeBtn) {
      closeBtn.onclick = () => {
        drawer.setAttribute('hidden', '');
      };
    }

    drawer.querySelectorAll('[data-action="load-build"]').forEach(btn => {
      btn.onclick = () => {
        const id = btn.getAttribute('data-build-id');
        loadSavedBuild(id);
      };
    });

    drawer.querySelectorAll('[data-action="delete-build"]').forEach(btn => {
      btn.onclick = () => {
        const id = btn.getAttribute('data-build-id');
        deleteSavedBuild(id);
      };
    });
  }

  /**
   * Render the complete modal body
   */

  window.WOW_TALENT_BUILDS = {
    parseBuildUrl,
    generateBuildUrl,
    generateBuildCode,
    positionTooltip,
    showTalentTooltip,
    hideTalentTooltip,
    renderDetailedCardsView,
    getSavedBuilds,
    saveSavedBuilds,
    saveCurrentBuild,
    deleteSavedBuild,
    loadSavedBuild,
    renderSavedBuildsDrawer
  };
})();
