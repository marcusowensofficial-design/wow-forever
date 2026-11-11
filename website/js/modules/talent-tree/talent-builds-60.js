/**
 * Level 60 Popular Builds for the Talent Calculator.
 *
 * Resolves the name-keyed presets in window.WOW_TALENT_BUILDS_60 (js/data/talent-builds-60-data.js)
 * into talent-id point maps for the active talents-data.js layout, and renders the
 * "Popular Level 60 Builds" picker plus the source strip shown under the calculator header.
 */
(function () {
  'use strict';

  const cache = {};

  function getTalentsData(classId) {
    const data = window.WOW_TALENTS_DATA;
    return data && data[classId] ? data[classId] : null;
  }

  /**
   * Returns the class's level 60 builds with a `points` map ({ [talentId]: rank })
   * resolved against the current talent tree. Builds with any unresolved talent are skipped.
   */
  function getBuilds(classId) {
    if (cache[classId]) return cache[classId];
    const source = window.WOW_TALENT_BUILDS_60;
    const classData = getTalentsData(classId);
    const list = source && source.classes && source.classes[classId];
    if (!list || !classData) return [];

    const byName = {};
    classData.talents.forEach(t => { byName[t.name] = t; });

    const resolved = [];
    list.forEach(build => {
      const points = {};
      let ok = true;
      Object.entries(build.talents || {}).forEach(([name, rank]) => {
        const t = byName[name];
        if (!t || rank > t.maxRank) {
          ok = false;
          return;
        }
        points[t.id] = rank;
      });
      if (ok) {
        resolved.push(Object.assign({}, build, { points }));
      } else if (window.console) {
        console.warn(`[talent-builds-60] Skipped ${classId}/${build.specId}: a talent no longer matches talents-data.js`);
      }
    });
    cache[classId] = resolved;
    return resolved;
  }

  function getBuild(classId, specId) {
    const builds = getBuilds(classId);
    if (!builds.length) return null;
    return builds.find(b => b.specId === specId) || builds[0];
  }

  /**
   * Picker buttons, one per spec. `activeSpecId` highlights the loaded build.
   */
  function renderPresetButtons(classId, activeSpecId, escapeHtml) {
    return getBuilds(classId).map(b => `
      <button type="button" class="bis-talent-pill-btn ${activeSpecId === b.specId ? 'active-mode' : ''}" data-action="load-lvl60" data-spec-id="${escapeHtml(b.specId)}" title="Load the most popular level 60 ${escapeHtml(b.name)} build (${b.split.join('/')})">
        <span>⭐</span> ${escapeHtml(b.name)}
      </button>
    `).join('');
  }

  /**
   * Source strip shown under the header while a level 60 preset is loaded.
   */
  function renderSourceStrip(classId, specId, escapeHtml) {
    const b = getBuild(classId, specId);
    if (!b || b.specId !== specId) return '';
    const agreement = (b.agreement || [])
      .map(a => `${escapeHtml(a.site)} ${a.similarity}%`)
      .join(' · ');
    const keyTalents = (b.keyTalents || []).map(escapeHtml).join(', ');
    return `
      <div class="talent-lvl60-strip" role="note">
        <div class="talent-lvl60-strip-main">
          <span class="talent-lvl60-badge">⭐ Popular Level 60 Build</span>
          <strong>${escapeHtml(b.name)}</strong>
          <span class="talent-lvl60-meta">${escapeHtml(b.role)} · ${b.split.join(' / ')}</span>
          ${keyTalents ? `<span class="talent-lvl60-meta">Key talents: ${keyTalents}</span>` : ''}
        </div>
        <div class="talent-lvl60-strip-src">
          Picked from <a href="${escapeHtml(b.pickedFrom.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(b.pickedFrom.site)}</a> (${escapeHtml(b.pickedFrom.label)})
          ${agreement ? ` · Agreement with other published builds: ${agreement}` : ' · No other legal level 60 build for this spec was published yet'}
          · <a href="${escapeHtml(b.wowheadCalcUrl)}" target="_blank" rel="noopener noreferrer">Open on Wowhead</a>
        </div>
      </div>
    `;
  }

  window.WOW_TALENT_BUILDS_60_API = {
    getBuilds,
    getBuild,
    renderPresetButtons,
    renderSourceStrip
  };
})();
