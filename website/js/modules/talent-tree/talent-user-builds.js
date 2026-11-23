/**
 * World of Warcraft: Forever - User Submitted Talent Builds Module
 *
 * Combines site-wide published community builds (window.WOW_USER_SUBMITTED_BUILDS)
 * with browser-local user submissions (localStorage), and provides a native <dialog>
 * UI for browsing, loading, sharing, and submitting custom named talent builds.
 */
(function () {
  'use strict';

  const STORAGE_KEY_USER_BUILDS = 'wow_forever_user_submitted_builds';
  const DIALOG_ID = 'talent-user-builds-dialog';

  const CLASS_META = {
    warrior: { name: 'Warrior', color: '#C79C6E' },
    paladin: { name: 'Paladin', color: '#F58CBA' },
    hunter: { name: 'Hunter', color: '#ABD473' },
    rogue: { name: 'Rogue', color: '#FFF569' },
    priest: { name: 'Priest', color: '#FFFFFF' },
    shaman: { name: 'Shaman', color: '#2B8CFF' },
    mage: { name: 'Mage', color: '#69CCF0' },
    warlock: { name: 'Warlock', color: '#9482C9' },
    druid: { name: 'Druid', color: '#FF7D0A' }
  };

  const CAP_INFO = {
    lvl60: { label: 'Lvl 60 (51p)', maxPoints: 51 },
    lvl30_perk: { label: 'Lvl 30 (26p)', maxPoints: 26 },
    lvl30_base: { label: 'Lvl 30 (21p)', maxPoints: 21 }
  };

  const uiState = {
    activeTab: 'browse', // 'browse' | 'submit'
    showAllClasses: false,
    specFilter: 'all', // 'all' | '0' | '1' | '2'
    lastClassId: null,
    lastSubmitted: null
  };

  let announcerEl = null;
  let announceTimer = null;
  let announcedField = null;
  const flaggedInvalid = new WeakSet();
  const announcedInvalid = new WeakSet();

  function esc(str) {
    if (window.escapeHtml) return window.escapeHtml(str);
    return String(str ?? '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function getClassData(classId) {
    if (window.WOW_TALENT_CORE && window.WOW_TALENT_CORE.getClassData) {
      return window.WOW_TALENT_CORE.getClassData(classId);
    }
    const data = window.WOW_TALENTS_DATA;
    return (data && data[classId]) || null;
  }

  function getCapMaxPoints(capMode) {
    return (CAP_INFO[capMode] && CAP_INFO[capMode].maxPoints) || 51;
  }

  function getCapLabel(capMode) {
    return (CAP_INFO[capMode] && CAP_INFO[capMode].label) || 'Lvl 60 (51p)';
  }

  /**
   * Determine the specialization label & tree icon from the build's tree point split
   * (e.g., Mage 12/0/39 -> Frost) or an explicit spec name override.
   */
  function detectSpecInfo(classId, split, explicitSpec) {
    const classData = getClassData(classId);
    const trees = (classData && Array.isArray(classData.trees)) ? classData.trees : [];
    const safeSplit = Array.isArray(split) ? split : [0, 0, 0];

    let maxPts = -1;
    let primaryIdx = 0;
    for (let i = 0; i < 3; i++) {
      const pts = safeSplit[i] || 0;
      if (pts > maxPts) {
        maxPts = pts;
        primaryIdx = i;
      }
    }

    if (explicitSpec) {
      const clean = String(explicitSpec).trim();
      const matchedIdx = trees.findIndex(t => t.name && t.name.toLowerCase() === clean.toLowerCase());
      const treeObj = matchedIdx !== -1 ? trees[matchedIdx] : trees[primaryIdx];
      return {
        specName: clean,
        specTreeIndex: matchedIdx !== -1 ? matchedIdx : primaryIdx,
        specIcon: treeObj ? treeObj.icon : ''
      };
    }

    if (maxPts <= 0 || !trees.length) {
      return { specName: 'Hybrid', specTreeIndex: -1, specIcon: '' };
    }

    const tiedIndices = [];
    for (let i = 0; i < 3; i++) {
      if ((safeSplit[i] || 0) === maxPts) tiedIndices.push(i);
    }

    if (tiedIndices.length > 1) {
      const names = tiedIndices.map(i => (trees[i] ? trees[i].name : `Tree ${i + 1}`));
      return {
        specName: `Hybrid (${names.join('/')})`,
        specTreeIndex: tiedIndices[0],
        specIcon: trees[tiedIndices[0]] ? trees[tiedIndices[0]].icon : ''
      };
    }

    const primaryTree = trees[primaryIdx];
    return {
      specName: primaryTree ? primaryTree.name : 'Custom',
      specTreeIndex: primaryIdx,
      specIcon: primaryTree ? primaryTree.icon : ''
    };
  }

  function slugify(str) {
    return String(str || '')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .slice(0, 48) || ('build-' + Date.now());
  }

  function getFullShareUrl(classId, buildUrl) {
    const origin = (window.location && window.location.origin && window.location.origin !== 'null')
      ? window.location.origin
      : 'https://wow-forever.onrender.com';
    const pathname = (window.location && window.location.pathname) ? window.location.pathname : '/';
    return `${origin}${pathname}#calculator?class=${encodeURIComponent(classId)}&b=${encodeURIComponent(buildUrl)}`;
  }

  /**
   * Validate talent legality (row tier gates, prerequisites, maxRank, cap).
   */
  function validatePointsLegality(classId, points, maxPoints) {
    const classData = getClassData(classId);
    if (!classData) return { valid: false, errors: ['Unknown class talent tree.'] };

    const errors = [];
    let total = 0;
    const byId = {};
    classData.talents.forEach(t => { byId[t.id] = t; });

    for (const key in points) {
      const pts = points[key] || 0;
      if (pts <= 0) continue;
      const t = byId[key];
      if (!t) {
        errors.push(`Unknown talent ID ${key}.`);
        continue;
      }
      if (pts > t.maxRank) {
        errors.push(`${t.name} exceeds max rank (${pts}/${t.maxRank}).`);
      }
      total += pts;
    }

    if (total === 0) {
      errors.push('Build has 0 allocated talent points.');
    }
    if (total > maxPoints) {
      errors.push(`Total points (${total}) exceed cap (${maxPoints}).`);
    }

    for (let treeIdx = 0; treeIdx < 3; treeIdx++) {
      const treeTalents = classData.talents.filter(t => t.tree === treeIdx);
      for (const t of treeTalents) {
        const pts = points[t.id] || 0;
        if (pts <= 0) continue;
        if (t.row > 1) {
          const reqPts = (t.row - 1) * 5;
          const belowPts = treeTalents
            .filter(other => other.row < t.row)
            .reduce((sum, other) => sum + (points[other.id] || 0), 0);
          if (belowPts < reqPts) {
            errors.push(`${t.name} requires ${reqPts} pts in prior tiers (has ${belowPts}).`);
          }
        }
        if (t.req) {
          const reqTalent = byId[t.req];
          if (reqTalent && (points[reqTalent.id] || 0) < reqTalent.maxRank) {
            errors.push(`${t.name} requires ${reqTalent.maxRank}/${reqTalent.maxRank} ${reqTalent.name}.`);
          }
        }
      }
    }

    return { valid: errors.length === 0, errors, total };
  }

  /**
   * Parse any user-pasted URL, internal /talents/ path, or raw b= talent string.
   */
  function parseSubmittedInput(rawInput, fallbackClassId, capMode) {
    const raw = String(rawInput || '').trim();
    if (!raw) {
      return { ok: false, error: 'Paste a WoW Forever build link or talent string.' };
    }

    let detectedClass = null;
    const classParamMatch = raw.match(/[?&]class=([a-z]+)/i);
    if (classParamMatch && CLASS_META[classParamMatch[1].toLowerCase()]) {
      detectedClass = classParamMatch[1].toLowerCase();
    }

    let unwrapped = raw;
    for (let depth = 0; depth < 3; depth++) {
      if (!detectedClass) {
        const pathMatch = unwrapped.match(/\/talents\/([a-z]+)/i);
        if (pathMatch && CLASS_META[pathMatch[1].toLowerCase()]) {
          detectedClass = pathMatch[1].toLowerCase();
        }
      }
      const bMatch = unwrapped.match(/[?&]b=([^&#]+)/);
      if (bMatch) {
        try {
          unwrapped = decodeURIComponent(bMatch[1]);
        } catch {
          unwrapped = bMatch[1];
        }
      } else {
        break;
      }
    }

    if (!detectedClass) {
      const pathMatch = unwrapped.match(/\/talents\/([a-z]+)/i);
      if (pathMatch && CLASS_META[pathMatch[1].toLowerCase()]) {
        detectedClass = pathMatch[1].toLowerCase();
      }
    }

    const classId = detectedClass || fallbackClassId || 'mage';
    const classData = getClassData(classId);
    if (!classData) {
      return { ok: false, error: `Unknown class "${classId}".` };
    }

    const parseFn = window.WOW_TALENT_BUILDS && window.WOW_TALENT_BUILDS.parseBuildUrl;
    const genFn = window.WOW_TALENT_BUILDS && window.WOW_TALENT_BUILDS.generateBuildUrl;
    if (!parseFn || !genFn) {
      return { ok: false, error: 'Talent codec is not ready yet.' };
    }

    const points = parseFn(classId, raw);
    const split = [0, 1, 2].map(idx =>
      classData.talents.filter(t => t.tree === idx).reduce((sum, t) => sum + (points[t.id] || 0), 0)
    );
    const totalPoints = split[0] + split[1] + split[2];

    const resolvedCapMode = capMode || (totalPoints > 26 ? 'lvl60' : 'lvl30_perk');
    const maxPoints = getCapMaxPoints(resolvedCapMode);
    const legality = validatePointsLegality(classId, points, maxPoints);

    if (totalPoints === 0) {
      return {
        ok: false,
        classId,
        detectedClass,
        error: 'Could not read any allocated talent points from that link or code.'
      };
    }

    const specInfo = detectSpecInfo(classId, split, null);

    return {
      ok: legality.valid,
      error: legality.valid ? '' : legality.errors[0],
      errors: legality.errors,
      classId,
      detectedClass,
      capMode: resolvedCapMode,
      points,
      split,
      totalPoints,
      specName: specInfo.specName,
      specTreeIndex: specInfo.specTreeIndex,
      specIcon: specInfo.specIcon,
      canonicalBuildUrl: genFn(classId, points)
    };
  }

  function getLocalBuilds() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY_USER_BUILDS);
      const parsed = raw ? JSON.parse(raw) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }

  function saveLocalBuilds(list) {
    try {
      localStorage.setItem(STORAGE_KEY_USER_BUILDS, JSON.stringify(list));
      return true;
    } catch {
      return false;
    }
  }

  function resolveBuildEntry(entry, classId, source) {
    const classData = getClassData(classId);
    const parseFn = window.WOW_TALENT_BUILDS && window.WOW_TALENT_BUILDS.parseBuildUrl;
    const genFn = window.WOW_TALENT_BUILDS && window.WOW_TALENT_BUILDS.generateBuildUrl;
    if (!classData || !parseFn) return null;

    const points = entry.points && Object.keys(entry.points).length
      ? Object.assign({}, entry.points)
      : parseFn(classId, entry.buildUrl || '');

    const split = [0, 1, 2].map(idx =>
      classData.talents.filter(t => t.tree === idx).reduce((sum, t) => sum + (points[t.id] || 0), 0)
    );
    const totalPoints = split[0] + split[1] + split[2];
    const capMode = entry.capMode || (totalPoints > 26 ? 'lvl60' : 'lvl30_perk');
    const canonicalBuildUrl = entry.buildUrl || (genFn ? genFn(classId, points) : '');
    const specInfo = detectSpecInfo(classId, split, entry.spec);

    return {
      id: entry.id || `${source}_${classId}_${slugify(entry.name)}`,
      classId,
      name: entry.name || 'Untitled Build',
      author: entry.author || 'Community',
      spec: specInfo.specName,
      specTreeIndex: specInfo.specTreeIndex,
      specIcon: specInfo.specIcon,
      capMode,
      buildUrl: canonicalBuildUrl,
      submittedAt: entry.submittedAt || '',
      notes: entry.notes || '',
      points,
      split,
      totalPoints,
      source
    };
  }

  function getBuilds(classId) {
    const publishedRoot = window.WOW_USER_SUBMITTED_BUILDS || {};
    const publishedRaw = Array.isArray(publishedRoot[classId]) ? publishedRoot[classId] : [];
    const localRaw = getLocalBuilds().filter(b => b && b.classId === classId);

    const out = [];
    publishedRaw.forEach(entry => {
      const r = resolveBuildEntry(entry, classId, 'published');
      if (r) out.push(r);
    });
    localRaw.forEach(entry => {
      const r = resolveBuildEntry(entry, classId, 'local');
      if (r) out.push(r);
    });
    return out;
  }

  function getAllBuilds() {
    const out = [];
    Object.keys(CLASS_META).forEach(cls => {
      getBuilds(cls).forEach(b => out.push(b));
    });
    return out;
  }

  function pointsEqual(a, b) {
    const keysA = Object.keys(a || {}).filter(k => a[k] > 0);
    const keysB = Object.keys(b || {}).filter(k => b[k] > 0);
    return keysA.length === keysB.length && keysA.every(k => a[k] === b[k]);
  }

  function getActiveUserBuild(classId, points, activeUserBuildId) {
    const builds = getBuilds(classId);
    if (!builds.length) return null;
    if (activeUserBuildId) {
      const exact = builds.find(b => b.id === activeUserBuildId);
      if (exact && pointsEqual(exact.points, points)) return exact;
    }
    return builds.find(b => pointsEqual(b.points, points)) || null;
  }

  function formatSiteEntrySnippet(build) {
    const obj = {
      id: build.id,
      name: build.name,
      author: build.author,
      spec: build.spec,
      capMode: build.capMode,
      buildUrl: build.buildUrl,
      submittedAt: build.submittedAt || new Date().toISOString().slice(0, 10),
      notes: build.notes || ''
    };
    return `// Paste under "${build.classId}" in js/data/talent-user-builds-data.js\n${JSON.stringify(obj, null, 2)},`;
  }

  function formatShareMessage(build) {
    const clsName = (CLASS_META[build.classId] && CLASS_META[build.classId].name) || build.classId;
    const shareUrl = getFullShareUrl(build.classId, build.buildUrl);
    const lines = [
      `**WoW Forever User Build Submission**`,
      `• **Name:** ${build.name}`,
      `• **Author:** ${build.author}`,
      `• **Class / Spec:** ${build.spec ? `${build.spec} ` : ''}${clsName} (${build.split.join('/')} • ${getCapLabel(build.capMode)})`
    ];
    if (build.notes) lines.push(`• **Notes:** ${build.notes}`);
    lines.push(`• **Link:** ${shareUrl}`);
    return lines.join('\n');
  }

  function copyWithToast(text, successMsg) {
    const copyFn = window.copyTextToClipboard || ((t, fn) => navigator.clipboard && navigator.clipboard.writeText(t).then(fn));
    copyFn(text, () => {
      if (window.showToast) window.showToast(successMsg, 'success');
    });
  }

  /**
   * Button rendered inside .bis-preset-toggle-group right next to the 3 specs.
   */
  function renderTriggerButton(classId, activeBuild, escapeHtmlFn) {
    const e = escapeHtmlFn || esc;
    const count = getBuilds(classId).length;
    const clsName = (CLASS_META[classId] && CLASS_META[classId].name) || classId;
    return `
      <button type="button"
              class="bis-talent-pill-btn bis-user-builds-btn ${activeBuild ? 'active-mode' : ''}"
              id="btn-open-user-builds"
              title="Browse or submit user-created ${e(clsName)} talent builds">
        <span>👥</span> User Submitted Builds
        <span class="bis-user-builds-count">${count}</span>
      </button>
    `;
  }

  function renderSpecBadge(build, escapeHtmlFn) {
    const e = escapeHtmlFn || esc;
    if (!build || !build.spec) return '';
    return `
      <span class="tub-spec-badge" title="${e(build.spec)} specialization">
        ${build.specIcon ? `<img src="${e(build.specIcon)}" alt="" class="tub-spec-icon" onerror="this.style.display='none'" />` : ''}
        <span>${e(build.spec)}</span>
      </span>
    `;
  }

  /**
   * Info strip displayed beneath the calculator header when a user-submitted build is loaded.
   */
  function renderActiveStrip(activeBuild, escapeHtmlFn) {
    if (!activeBuild) return '';
    const e = escapeHtmlFn || esc;
    const badgeLabel = activeBuild.source === 'local' ? '👤 Local Submitted Build' : '👥 User Submitted Build';
    return `
      <div class="talent-user-strip" role="note">
        <div class="talent-user-strip-main">
          <span class="talent-user-badge">${badgeLabel}</span>
          <strong>${e(activeBuild.name)}</strong>
          ${renderSpecBadge(activeBuild, e)}
          <span class="talent-user-meta">by ${e(activeBuild.author)} · ${activeBuild.split.join(' / ')} · ${e(getCapLabel(activeBuild.capMode))}</span>
        </div>
        <div class="talent-user-strip-sub">
          ${activeBuild.notes ? `<span class="talent-user-notes">${e(activeBuild.notes)}</span>` : ''}
          <button type="button" class="talent-user-strip-btn" data-action="copy-user-build-link" data-build-id="${e(activeBuild.id)}" data-class-id="${e(activeBuild.classId)}">
            🔗 Copy Share Link
          </button>
        </div>
      </div>
    `;
  }

  /* ==========================================================================
     Accessible Form Validation Sync (:user-invalid + aria-invalid / live region)
     ========================================================================== */

  function ensureAnnouncer() {
    if (announcerEl && document.body.contains(announcerEl)) return announcerEl;
    announcerEl = document.createElement('div');
    announcerEl.setAttribute('aria-live', 'polite');
    announcerEl.className = 'visually-hidden';
    document.body.appendChild(announcerEl);
    return announcerEl;
  }

  function linkError(el, shown) {
    const errorId = el.dataset.error;
    if (!errorId) return;
    const ids = (el.getAttribute('aria-describedby') || '')
      .split(/\s+/)
      .filter(id => id && id !== errorId);
    if (shown) ids.push(errorId);
    if (ids.length) el.setAttribute('aria-describedby', ids.join(' '));
    else el.removeAttribute('aria-describedby');
  }

  function spokenText(node) {
    const copy = node.cloneNode(true);
    copy.querySelectorAll('[aria-hidden="true"]').forEach(n => n.remove());
    copy.querySelectorAll('[role="img"][aria-label]').forEach(n => {
      n.replaceWith(`${n.getAttribute('aria-label')}: `);
    });
    return copy.textContent.replace(/\s+/g, ' ').trim();
  }

  function announceFieldError(el) {
    const errorEl = document.getElementById(el.dataset.error);
    if (!errorEl) return;
    const announcer = ensureAnnouncer();
    const label = el.labels && el.labels[0] ? `${spokenText(el.labels[0])}: ` : '';
    clearTimeout(announceTimer);
    announcer.textContent = '';
    announcedField = el;
    announceTimer = setTimeout(() => {
      announcer.textContent = label + spokenText(errorEl);
    }, 500);
  }

  function syncFieldAria(el, announce) {
    if (!el || !el.matches || !el.matches('input, select, textarea')) return;
    let isInvalid;
    try {
      isInvalid = el.matches(':user-invalid');
    } catch {
      isInvalid = !el.validity.valid && el.classList.contains('user-invalid-fallback');
    }

    if (isInvalid) {
      if (announce && !announcedInvalid.has(el)) {
        announceFieldError(el);
        announcedInvalid.add(el);
      }
      el.setAttribute('aria-invalid', 'true');
      linkError(el, true);
      flaggedInvalid.add(el);
    } else if (flaggedInvalid.has(el) || el.getAttribute('aria-invalid') !== 'true') {
      el.setAttribute('aria-invalid', 'false');
      linkError(el, false);
      flaggedInvalid.delete(el);
      announcedInvalid.delete(el);
      if (announcedField === el && announcerEl) {
        clearTimeout(announceTimer);
        announcerEl.textContent = '';
      }
    }
  }

  /* ==========================================================================
     Native <dialog> Modal: Browse & Submit User Builds
     ========================================================================== */

  function ensureDialog() {
    let dialog = document.getElementById(DIALOG_ID);
    if (!dialog) {
      dialog = document.createElement('dialog');
      dialog.id = DIALOG_ID;
      dialog.className = 'talent-user-builds-dialog';
      dialog.setAttribute('closedby', 'any');
      dialog.setAttribute('aria-labelledby', 'talent-user-builds-title');
      document.body.appendChild(dialog);

      // Reset returnValue on close so stale values never leak across openings
      dialog.addEventListener('close', () => {
        dialog.returnValue = '';
      });

      // Fallback light-dismiss for browsers without <dialog closedby="any"> (e.g. Safari)
      if (window.HTMLDialogElement && !('closedBy' in window.HTMLDialogElement.prototype)) {
        const isOutside = (e) => {
          const r = dialog.getBoundingClientRect();
          return e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom;
        };
        let pressedOutside = false;
        dialog.addEventListener('pointerdown', (e) => {
          pressedOutside = isOutside(e);
        });
        dialog.addEventListener('pointerup', (e) => {
          if (pressedOutside && isOutside(e)) {
            dialog.close();
          }
          pressedOutside = false;
        });
      }
    }
    return dialog;
  }

  function loadUserBuildIntoCalculator(build) {
    if (!build) return;
    if (window.WOW_TALENT_CORE && typeof window.WOW_TALENT_CORE.loadUserBuild === 'function') {
      window.WOW_TALENT_CORE.loadUserBuild(build);
    }
    const dialog = document.getElementById(DIALOG_ID);
    if (dialog && dialog.open) {
      dialog.close('loaded');
    }
    if (window.showToast) {
      window.showToast(`Loaded "${build.name}" (${build.split.join('/')})`, 'success');
    }
  }

  function deleteLocalBuild(buildId) {
    const existing = getLocalBuilds();
    const target = existing.find(b => b.id === buildId);
    const next = existing.filter(b => b.id !== buildId);
    saveLocalBuilds(next);
    if (window.showToast) {
      window.showToast(target ? `Removed local submission "${target.name}".` : 'Build removed.', 'info');
    }
    renderDialogContents();
    if (window.WOW_TALENT_CORE && typeof window.WOW_TALENT_CORE.renderModalBody === 'function') {
      window.WOW_TALENT_CORE.renderModalBody();
    }
  }

  function renderBrowsePanel(activeClassId) {
    const clsMeta = CLASS_META[activeClassId] || { name: activeClassId, color: '#facc15' };
    const classData = getClassData(activeClassId);
    const trees = (classData && Array.isArray(classData.trees)) ? classData.trees : [];
    const classBuilds = getBuilds(activeClassId);
    const allBuilds = getAllBuilds();
    const scopedBuilds = uiState.showAllClasses ? allBuilds : classBuilds;

    const visibleBuilds = (!uiState.showAllClasses && uiState.specFilter !== 'all')
      ? scopedBuilds.filter(b => String(b.specTreeIndex) === uiState.specFilter)
      : scopedBuilds;

    const specFilterHtml = (!uiState.showAllClasses && trees.length === 3) ? `
      <div class="tub-spec-filter-bar" role="group" aria-label="Filter ${esc(clsMeta.name)} builds by specialization">
        <button type="button"
                class="tub-spec-filter-btn ${uiState.specFilter === 'all' ? 'active' : ''}"
                aria-pressed="${uiState.specFilter === 'all' ? 'true' : 'false'}"
                data-action="filter-spec"
                data-spec-index="all">
          All Specs (${classBuilds.length})
        </button>
        ${trees.map((tree, idx) => {
          const count = classBuilds.filter(b => b.specTreeIndex === idx).length;
          const isActive = uiState.specFilter === String(idx);
          return `
            <button type="button"
                    class="tub-spec-filter-btn ${isActive ? 'active' : ''}"
                    aria-pressed="${isActive ? 'true' : 'false'}"
                    data-action="filter-spec"
                    data-spec-index="${idx}">
              ${tree.icon ? `<img src="${esc(tree.icon)}" alt="" class="tub-spec-icon" onerror="this.style.display='none'" />` : ''}
              <span>${esc(tree.name)}</span>
              <span class="tub-spec-filter-count">${count}</span>
            </button>
          `;
        }).join('')}
      </div>
    ` : '';

    const filterBar = `
      <div class="tub-filter-row">
        <div class="tub-scope-toggle" role="group" aria-label="Filter builds by class">
          <button type="button" class="tub-scope-btn ${!uiState.showAllClasses ? 'active' : ''}" data-action="scope-class">
            ${esc(clsMeta.name)} Builds (${classBuilds.length})
          </button>
          <button type="button" class="tub-scope-btn ${uiState.showAllClasses ? 'active' : ''}" data-action="scope-all">
            All Classes (${allBuilds.length})
          </button>
        </div>
        <button type="button" class="tub-inline-cta" data-action="switch-tab" data-tab="submit">
          ➕ Submit a Build
        </button>
      </div>
      ${specFilterHtml}
    `;

    if (visibleBuilds.length === 0) {
      const selectedTreeName = (!uiState.showAllClasses && uiState.specFilter !== 'all' && trees[Number(uiState.specFilter)])
        ? `${trees[Number(uiState.specFilter)].name} `
        : '';
      return `
        ${filterBar}
        <div class="tub-empty-state">
          <div class="tub-empty-icon">📜</div>
          <p class="tub-empty-title">No user-submitted ${esc(selectedTreeName)}${esc(clsMeta.name)} builds yet.</p>
          <p class="tub-empty-desc">Have a killer leveling, dungeon, PvP, or Level 60 setup? Submit your current calculator build or paste a link to add it and share it with Marcus for the live site.</p>
          <button type="button" class="tub-btn primary" data-action="switch-tab" data-tab="submit">
            ➕ Submit First ${esc(selectedTreeName)}${esc(clsMeta.name)} Build
          </button>
        </div>
      `;
    }

    const cardsHtml = visibleBuilds.map(b => {
      const meta = CLASS_META[b.classId] || { name: b.classId, color: '#facc15' };
      const isPublished = b.source === 'published';
      return `
        <article class="tub-build-card ${isPublished ? 'is-published' : 'is-local'}">
          <div class="tub-card-top">
            <div class="tub-card-heading">
              <h2 class="tub-card-name">${esc(b.name)}</h2>
              <div class="tub-card-badges">
                <span class="tub-source-badge ${isPublished ? 'published' : 'local'}">
                  ${isPublished ? '★ Site Build' : '💻 Saved Locally'}
                </span>
                <span class="tub-class-badge" style="color: ${meta.color}; border-color: ${meta.color}55; background: ${meta.color}18;">
                  ${esc(meta.name)}
                </span>
                ${renderSpecBadge(b, esc)}
                <span class="tub-cap-badge">${esc(getCapLabel(b.capMode))}</span>
              </div>
            </div>
            <div class="tub-split-pill" title="Tree point distribution">${b.split.join(' / ')}</div>
          </div>
          <div class="tub-card-meta">
            <span>Submitted by <strong>${esc(b.author)}</strong></span>
            ${b.submittedAt ? `<span>• ${esc(b.submittedAt)}</span>` : ''}
            <span>• ${b.totalPoints} pts</span>
          </div>
          ${b.notes ? `<p class="tub-card-notes">${esc(b.notes)}</p>` : ''}
          <div class="tub-card-actions">
            <button type="button" class="tub-btn primary" data-action="load-user-build" data-build-id="${esc(b.id)}" data-class-id="${esc(b.classId)}">
              ▶ Load Build
            </button>
            <button type="button" class="tub-btn" data-action="copy-build-link" data-build-id="${esc(b.id)}" data-class-id="${esc(b.classId)}" title="Copy shareable WoW Forever link">
              🔗 Copy Link
            </button>
            <button type="button" class="tub-btn" data-action="copy-site-entry" data-build-id="${esc(b.id)}" data-class-id="${esc(b.classId)}" title="Copy snippet to publish in talent-user-builds-data.js">
              📋 Copy Site Entry
            </button>
            ${!isPublished ? `
              <button type="button" class="tub-btn danger" data-action="delete-local-build" data-build-id="${esc(b.id)}" title="Delete local submission">
                🗑️
              </button>
            ` : ''}
          </div>
        </article>
      `;
    }).join('');

    return `
      ${filterBar}
      <div class="tub-builds-list">${cardsHtml}</div>
    `;
  }

  function renderSubmitPanel(activeClassId) {
    const state = window.WOW_TALENT_TREE_STATE || {};
    const defaultCap = state.capMode || 'lvl60';
    const last = uiState.lastSubmitted;

    const confirmationHtml = last ? `
      <div class="tub-submit-success" role="status">
        <div class="tub-submit-success-head">
          <strong>✅ "${esc(last.name)}" added to ${esc((CLASS_META[last.classId] || {}).name || last.classId)} builds!</strong>
          <span>Saved in your browser now — copy below to share with friends or publish site-wide.</span>
        </div>
        <div class="tub-submit-success-actions">
          <button type="button" class="tub-btn primary" data-action="load-last-submitted">▶ Load Build Now</button>
          <button type="button" class="tub-btn" data-action="copy-last-share">💬 Copy Message for Marcus / Discord</button>
          <button type="button" class="tub-btn" data-action="copy-last-snippet">📋 Copy Site Entry (JS)</button>
        </div>
      </div>
    ` : '';

    return `
      ${confirmationHtml}
      <div class="tub-import-bar">
        <span>Want to submit the talents currently on your screen?</span>
        <button type="button" class="tub-btn" id="btn-tub-import-current">
          ⚡ Use Current Calculator Build
        </button>
      </div>

      <form id="tub-submit-form" class="tub-form" novalidate>
        <div class="tub-form-grid">
          <div class="tub-field">
            <label for="tub-input-name">Build Name <span aria-hidden="true">*</span></label>
            <span id="tub-name-hint" class="tub-hint">e.g. Marcus 60 frost mage build</span>
            <input type="text"
                   id="tub-input-name"
                   name="buildName"
                   required
                   maxlength="80"
                   placeholder="Enter a build title..."
                   aria-describedby="tub-name-hint"
                   data-error="tub-name-error"
                   autofocus />
            <div id="tub-name-error" class="tub-error-msg">
              <span role="img" aria-label="Error">❌</span> Please enter a name for this build.
            </div>
          </div>

          <div class="tub-field">
            <label for="tub-input-author">Submitted By <span aria-hidden="true">*</span></label>
            <span id="tub-author-hint" class="tub-hint">Your name or in-game character name</span>
            <input type="text"
                   id="tub-input-author"
                   name="author"
                   required
                   maxlength="40"
                   placeholder="e.g. Marcus"
                   aria-describedby="tub-author-hint"
                   data-error="tub-author-error" />
            <div id="tub-author-error" class="tub-error-msg">
              <span role="img" aria-label="Error">❌</span> Please enter who submitted this build.
            </div>
          </div>
        </div>

        <div class="tub-form-grid">
          <div class="tub-field">
            <label for="tub-input-class">Class</label>
            <span id="tub-class-hint" class="tub-hint">Auto-detected when pasting a calculator URL</span>
            <select id="tub-input-class" name="classId" aria-describedby="tub-class-hint">
              ${Object.entries(CLASS_META).map(([id, m]) => `
                <option value="${id}" ${id === activeClassId ? 'selected' : ''}>${esc(m.name)}</option>
              `).join('')}
            </select>
          </div>

          <div class="tub-field">
            <label for="tub-input-cap">Level Bracket</label>
            <span id="tub-cap-hint" class="tub-hint">Level 60 (51 pts) or Level 30 bracket</span>
            <select id="tub-input-cap" name="capMode" aria-describedby="tub-cap-hint">
              <option value="lvl60" ${defaultCap === 'lvl60' ? 'selected' : ''}>Level 60 (51 pts)</option>
              <option value="lvl30_perk" ${defaultCap === 'lvl30_perk' ? 'selected' : ''}>Level 30 + Talented Perk (26 pts)</option>
              <option value="lvl30_base" ${defaultCap === 'lvl30_base' ? 'selected' : ''}>Level 30 Base (21 pts)</option>
            </select>
          </div>
        </div>

        <div class="tub-field">
          <label for="tub-input-url">WoW Forever Build Link or Code <span aria-hidden="true">*</span></label>
          <span id="tub-url-hint" class="tub-hint">Paste a full wow-forever.onrender.com/#calculator?... link, /talents/... path, or raw string like 0500052--053530033121311251</span>
          <input type="text"
                 id="tub-input-url"
                 name="buildUrl"
                 required
                 placeholder="https://wow-forever.onrender.com/#calculator?class=mage&b=..."
                 aria-describedby="tub-url-hint"
                 data-error="tub-url-error" />
          <div id="tub-url-error" class="tub-error-msg">
            <span role="img" aria-label="Error">❌</span> Paste a valid WoW Forever calculator link or talent code.
          </div>
          <div id="tub-url-preview" class="tub-url-preview" aria-live="polite"></div>
        </div>

        <div class="tub-field">
          <label for="tub-input-notes">Notes (Optional)</label>
          <span id="tub-notes-hint" class="tub-hint">Playstyle, PvE/PvP focus, key synergies, or gear tips (max 240 chars)</span>
          <textarea id="tub-input-notes"
                    name="notes"
                    rows="2"
                    maxlength="240"
                    placeholder="Optional notes about how you play this build..."
                    aria-describedby="tub-notes-hint"></textarea>
        </div>

        <div class="tub-form-foot">
          <span class="tub-form-footnote">Saves immediately in your browser &amp; gives you a 1-click copy snippet to upload permanently to the site.</span>
          <button type="submit" class="tub-btn primary">✅ Submit &amp; Save Build</button>
        </div>
      </form>
    `;
  }

  function renderDialogContents() {
    const dialog = ensureDialog();
    const state = window.WOW_TALENT_TREE_STATE || {};
    const activeClassId = state.classId || 'mage';
    if (uiState.lastClassId !== activeClassId) {
      uiState.specFilter = 'all';
      uiState.lastClassId = activeClassId;
    }
    const clsMeta = CLASS_META[activeClassId] || { name: activeClassId, color: '#facc15' };
    const classCount = getBuilds(activeClassId).length;

    dialog.innerHTML = `
      <div class="tub-dialog-shell">
        <header class="tub-dialog-head">
          <div class="tub-dialog-title-wrap">
            <img src="https://render.worldofwarcraft.com/us/icons/56/classicon_${esc(activeClassId)}.jpg"
                 alt=""
                 class="tub-dialog-class-icon"
                 onerror="this.src='https://render.worldofwarcraft.com/us/icons/56/inv_misc_questionmark.jpg'" />
            <div>
              <h1 id="talent-user-builds-title" class="tub-dialog-title" style="color: ${clsMeta.color};">
                User Submitted Talent Builds
              </h1>
              <p class="tub-dialog-subtitle">Browse community builds for ${esc(clsMeta.name)} or submit your own to share and upload to the site.</p>
            </div>
          </div>
          <form method="dialog">
            <button type="submit" class="tub-dialog-close" value="close" aria-label="Close User Submitted Builds dialog">✕</button>
          </form>
        </header>

        <div class="tub-tabs" role="tablist" aria-label="User Submitted Builds views">
          <button type="button"
                  role="tab"
                  class="tub-tab-btn ${uiState.activeTab === 'browse' ? 'active' : ''}"
                  aria-selected="${uiState.activeTab === 'browse' ? 'true' : 'false'}"
                  data-action="switch-tab"
                  data-tab="browse">
            📋 Browse Builds <span class="tub-tab-count">${classCount}</span>
          </button>
          <button type="button"
                  role="tab"
                  class="tub-tab-btn ${uiState.activeTab === 'submit' ? 'active' : ''}"
                  aria-selected="${uiState.activeTab === 'submit' ? 'true' : 'false'}"
                  data-action="switch-tab"
                  data-tab="submit">
            ➕ Submit a Build
          </button>
        </div>

        <div class="tub-dialog-body">
          ${uiState.activeTab === 'browse' ? renderBrowsePanel(activeClassId) : renderSubmitPanel(activeClassId)}
        </div>
      </div>
    `;

    bindDialogEvents(dialog, activeClassId);
  }

  function bindDialogEvents(dialog, activeClassId) {
    // Tab switching
    dialog.querySelectorAll('[data-action="switch-tab"]').forEach(btn => {
      btn.onclick = () => {
        const nextTab = btn.getAttribute('data-tab');
        if (nextTab && nextTab !== uiState.activeTab) {
          uiState.activeTab = nextTab;
          renderDialogContents();
        }
      };
    });

    // Scope filter toggle
    const scopeClassBtn = dialog.querySelector('[data-action="scope-class"]');
    if (scopeClassBtn) {
      scopeClassBtn.onclick = () => {
        uiState.showAllClasses = false;
        renderDialogContents();
      };
    }
    const scopeAllBtn = dialog.querySelector('[data-action="scope-all"]');
    if (scopeAllBtn) {
      scopeAllBtn.onclick = () => {
        uiState.showAllClasses = true;
        uiState.specFilter = 'all';
        renderDialogContents();
      };
    }

    dialog.querySelectorAll('[data-action="filter-spec"]').forEach(btn => {
      btn.onclick = () => {
        const idx = btn.getAttribute('data-spec-index');
        if (idx !== null) {
          uiState.specFilter = idx;
          renderDialogContents();
        }
      };
    });

    // Browse card actions
    const findBuild = (btn) => {
      const id = btn.getAttribute('data-build-id');
      const cls = btn.getAttribute('data-class-id') || activeClassId;
      return getBuilds(cls).find(b => b.id === id) || null;
    };

    dialog.querySelectorAll('[data-action="load-user-build"]').forEach(btn => {
      btn.onclick = () => {
        const b = findBuild(btn);
        if (b) loadUserBuildIntoCalculator(b);
      };
    });

    dialog.querySelectorAll('[data-action="copy-build-link"]').forEach(btn => {
      btn.onclick = () => {
        const b = findBuild(btn);
        if (b) copyWithToast(getFullShareUrl(b.classId, b.buildUrl), `Copied link for "${b.name}"!`);
      };
    });

    dialog.querySelectorAll('[data-action="copy-site-entry"]').forEach(btn => {
      btn.onclick = () => {
        const b = findBuild(btn);
        if (b) copyWithToast(formatSiteEntrySnippet(b), `Copied site entry for "${b.name}"!`);
      };
    });

    dialog.querySelectorAll('[data-action="delete-local-build"]').forEach(btn => {
      btn.onclick = () => {
        const id = btn.getAttribute('data-build-id');
        if (id) deleteLocalBuild(id);
      };
    });

    // Confirmation banner actions
    const loadLastBtn = dialog.querySelector('[data-action="load-last-submitted"]');
    if (loadLastBtn && uiState.lastSubmitted) {
      loadLastBtn.onclick = () => loadUserBuildIntoCalculator(uiState.lastSubmitted);
    }
    const copyLastShareBtn = dialog.querySelector('[data-action="copy-last-share"]');
    if (copyLastShareBtn && uiState.lastSubmitted) {
      copyLastShareBtn.onclick = () => copyWithToast(formatShareMessage(uiState.lastSubmitted), 'Copied shareable build message!');
    }
    const copyLastSnippetBtn = dialog.querySelector('[data-action="copy-last-snippet"]');
    if (copyLastSnippetBtn && uiState.lastSubmitted) {
      copyLastSnippetBtn.onclick = () => copyWithToast(formatSiteEntrySnippet(uiState.lastSubmitted), 'Copied JS entry for talent-user-builds-data.js!');
    }

    // Submit form logic
    const form = dialog.querySelector('#tub-submit-form');
    if (!form) return;

    const nameInput = form.querySelector('#tub-input-name');
    const authorInput = form.querySelector('#tub-input-author');
    const classSelect = form.querySelector('#tub-input-class');
    const capSelect = form.querySelector('#tub-input-cap');
    const urlInput = form.querySelector('#tub-input-url');
    const notesInput = form.querySelector('#tub-input-notes');
    const previewEl = form.querySelector('#tub-url-preview');

    // Initialize aria-invalid="false" on fields per :user-invalid ARIA guidance
    form.querySelectorAll('input, select, textarea').forEach(el => {
      el.setAttribute('aria-invalid', 'false');
    });

    const updateUrlPreview = (autoSyncMeta = true) => {
      const raw = (urlInput.value || '').trim();
      if (!raw) {
        urlInput.setCustomValidity('');
        previewEl.innerHTML = '';
        previewEl.className = 'tub-url-preview';
        return null;
      }

      const prelim = parseSubmittedInput(raw, classSelect.value, null);
      if (autoSyncMeta && prelim.detectedClass && prelim.detectedClass !== classSelect.value) {
        classSelect.value = prelim.detectedClass;
      }
      if (autoSyncMeta && prelim.totalPoints > 26 && capSelect.value !== 'lvl60') {
        capSelect.value = 'lvl60';
      }

      const parsed = parseSubmittedInput(raw, classSelect.value, capSelect.value);
      if (parsed.ok) {
        urlInput.setCustomValidity('');
        const clsName = (CLASS_META[parsed.classId] && CLASS_META[parsed.classId].name) || parsed.classId;
        const specPrefix = parsed.specName ? `${parsed.specName} ` : '';
        previewEl.className = 'tub-url-preview is-valid';
        previewEl.textContent = `✓ Valid ${specPrefix}${clsName} build: ${parsed.split.join(' / ')} (${parsed.totalPoints}/${getCapMaxPoints(parsed.capMode)} pts)`;
      } else {
        urlInput.setCustomValidity(parsed.error || 'Invalid talent build link.');
        previewEl.className = 'tub-url-preview is-invalid';
        previewEl.textContent = `⚠ ${parsed.error}`;
      }
      return parsed;
    };

    const importCurrentBtn = dialog.querySelector('#btn-tub-import-current');
    if (importCurrentBtn) {
      importCurrentBtn.onclick = () => {
        const state = window.WOW_TALENT_TREE_STATE || {};
        const genFn = window.WOW_TALENT_BUILDS && window.WOW_TALENT_BUILDS.generateBuildUrl;
        const total = window.WOW_TALENT_CORE ? window.WOW_TALENT_CORE.getTotalPoints(state.points) : 0;
        if (!genFn || total === 0) {
          if (window.showToast) window.showToast('Allocate at least 1 talent point in the calculator first.', 'warning');
          return;
        }
        const cls = state.classId || activeClassId;
        const buildPath = genFn(cls, state.points);
        classSelect.value = cls;
        capSelect.value = state.capMode || (total > 26 ? 'lvl60' : 'lvl30_perk');
        urlInput.value = getFullShareUrl(cls, buildPath);
        updateUrlPreview(false);
        syncFieldAria(urlInput, false);
        if (!nameInput.value.trim()) {
          nameInput.focus();
        }
        if (window.showToast) window.showToast('Imported your current calculator build!', 'info');
      };
    }

    urlInput.addEventListener('input', () => {
      updateUrlPreview(true);
      syncFieldAria(urlInput, false);
    });
    classSelect.addEventListener('change', () => updateUrlPreview(false));
    capSelect.addEventListener('change', () => updateUrlPreview(false));

    form.addEventListener('blur', (e) => {
      if (e.target === urlInput) updateUrlPreview(false);
      if (e.target.classList && !CSS.supports('selector(:user-invalid)')) {
        e.target.classList.toggle('user-invalid-fallback', !e.target.validity.valid);
      }
      syncFieldAria(e.target, true);
    }, true);

    form.addEventListener('input', (e) => {
      if (e.target.hasAttribute('aria-invalid')) {
        if (!CSS.supports('selector(:user-invalid)')) {
          e.target.classList.toggle('user-invalid-fallback', !e.target.validity.valid);
        }
        syncFieldAria(e.target, false);
      }
    });

    form.addEventListener('invalid', (e) => {
      if (!CSS.supports('selector(:user-invalid)')) {
        e.target.classList.add('user-invalid-fallback');
      }
      announcedInvalid.add(e.target);
      syncFieldAria(e.target, false);
    }, true);

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const parsed = updateUrlPreview(false);

      if (!form.checkValidity() || !parsed || !parsed.ok) {
        const firstInvalid = form.querySelector(':invalid');
        if (firstInvalid) {
          if (!CSS.supports('selector(:user-invalid)')) {
            firstInvalid.classList.add('user-invalid-fallback');
          }
          syncFieldAria(firstInvalid, false);
          firstInvalid.focus();
        }
        return;
      }

      const name = nameInput.value.trim();
      const author = authorInput.value.trim();
      const notes = notesInput.value.trim();
      const nowDate = new Date().toISOString().slice(0, 10);

      const newEntry = {
        id: `${slugify(name)}-${Date.now().toString(36)}`,
        classId: parsed.classId,
        name,
        author,
        spec: parsed.specName,
        capMode: parsed.capMode,
        buildUrl: parsed.canonicalBuildUrl,
        submittedAt: nowDate,
        notes
      };

      const locals = getLocalBuilds();
      locals.unshift(newEntry);
      saveLocalBuilds(locals);

      uiState.lastSubmitted = resolveBuildEntry(newEntry, parsed.classId, 'local');
      if (window.showToast) {
        window.showToast(`Submitted "${name}"!`, 'success');
      }
      renderDialogContents();
      if (window.WOW_TALENT_CORE && typeof window.WOW_TALENT_CORE.renderModalBody === 'function') {
        window.WOW_TALENT_CORE.renderModalBody();
      }
    });
  }

  function openDialog(defaultTab = 'browse') {
    uiState.activeTab = defaultTab === 'submit' ? 'submit' : 'browse';
    uiState.lastSubmitted = null;
    const dialog = ensureDialog();
    renderDialogContents();
    if (!dialog.open) {
      dialog.showModal();
    }
  }

  function copyBuildLinkById(classId, buildId) {
    const b = getBuilds(classId).find(item => item.id === buildId);
    if (b) {
      copyWithToast(getFullShareUrl(b.classId, b.buildUrl), `Copied link for "${b.name}"!`);
    }
  }

  window.WOW_USER_BUILDS_API = {
    parseSubmittedInput,
    getBuilds,
    getAllBuilds,
    getActiveUserBuild,
    renderTriggerButton,
    renderActiveStrip,
    openDialog,
    copyBuildLinkById,
    formatSiteEntrySnippet,
    formatShareMessage
  };
})();
