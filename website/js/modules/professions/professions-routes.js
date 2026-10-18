/**
 * World of Warcraft: Forever - Gathering Routes, SVG Circuit Overlays & Map Modal
 */
(function () {
  "use strict";

  const core = window.WOW_PROFESSIONS_CORE || {};
  const escapeHtml = core.escapeHtml || window.escapeHtml || (s => String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"));
  const getIconUrl = core.getIconUrl || ((icon) => "https://wow.zamimg.com/images/wow/icons/medium/" + (icon || "inv_misc_questionmark") + ".jpg");

  const ZONE_MAP_IDS = window.ZONE_MAP_IDS || {};
  const CIRCUIT_ROUTE_PATHS = window.CIRCUIT_ROUTE_PATHS || {};
  const MINING_CIRCUITS = window.MINING_CIRCUITS || [];
  const HERBALISM_CIRCUITS = window.HERBALISM_CIRCUITS || [];

  let gatheringViewMode = "routes";
  let activeMiningTier = "copper";
  let activeHerbTier = "herb_tier1";

  function attachTooltipListeners(container, prof) {
    if (window.WOW_PROFESSIONS_MODAL && window.WOW_PROFESSIONS_MODAL.attachTooltipListeners) {
      window.WOW_PROFESSIONS_MODAL.attachTooltipListeners(container, prof);
    }
  }

  function getZoneMapUrl(zoneName, isEnlarged = false) {
    const id = ZONE_MAP_IDS[zoneName];
    if (id) {
      const folder = isEnlarged ? 'original' : 'zoom';
      return `https://wow.zamimg.com/images/wow/classic/maps/enus/${folder}/${id}.jpg`;
    }
    return '';
  }

  function buildSmoothClosedPathAndArrows(points) {
    const unique = points.length > 1 && points[0].x === points[points.length - 1].x && points[0].y === points[points.length - 1].y
      ? points.slice(0, -1)
      : points.slice();
    const n = unique.length;
    if (n < 3) {
      const d = points.map((p, i) => (i === 0 ? 'M' : 'L') + ' ' + p.x.toFixed(1) + ' ' + p.y.toFixed(1)).join(' ') + ' Z';
      return { pathD: d, arrows: [] };
    }

    const tension = 0.16;
    const segments = [`M ${unique[0].x.toFixed(2)} ${unique[0].y.toFixed(2)}`];
    const arrows = [];

    for (let i = 0; i < n; i++) {
      const pPrev = unique[(i - 1 + n) % n];
      const pCurr = unique[i];
      const pNext = unique[(i + 1) % n];
      const pNext2 = unique[(i + 2) % n];

      const cp1x = pCurr.x + (pNext.x - pPrev.x) * tension;
      const cp1y = pCurr.y + (pNext.y - pPrev.y) * tension;
      const cp2x = pNext.x - (pNext2.x - pCurr.x) * tension;
      const cp2y = pNext.y - (pNext2.y - pCurr.y) * tension;

      segments.push(`C ${cp1x.toFixed(2)} ${cp1y.toFixed(2)}, ${cp2x.toFixed(2)} ${cp2y.toFixed(2)}, ${pNext.x.toFixed(2)} ${pNext.y.toFixed(2)}`);

      // Place directional chevron at midpoint (t = 0.5) of every other segment (or long segments)
      const dist = Math.hypot(pNext.x - pCurr.x, pNext.y - pCurr.y);
      if (i % 2 === 0 && dist >= 7) {
        const mx = 0.125 * pCurr.x + 0.375 * cp1x + 0.375 * cp2x + 0.125 * pNext.x;
        const my = 0.125 * pCurr.y + 0.375 * cp1y + 0.375 * cp2y + 0.125 * pNext.y;
        const dx = 0.75 * (cp1x - pCurr.x) + 1.5 * (cp2x - cp1x) + 0.75 * (pNext.x - cp2x);
        const dy = 0.75 * (cp1y - pCurr.y) + 1.5 * (cp2y - cp1y) + 0.75 * (pNext.y - cp2y);
        const deg = Math.atan2(dy, dx) * 180 / Math.PI;
        arrows.push({ x: mx, y: my, deg });
      }
    }

    segments.push('Z');
    return { pathD: segments.join(' '), arrows };
  }

  function renderRouteSvgOverlay(route, isMining, isEnlarged = false) {
    const points = CIRCUIT_ROUTE_PATHS[route.id];
    if (!points || points.length === 0) return '';

    const { pathD, arrows } = buildSmoothClosedPathAndArrows(points);
    const mainStroke = isMining ? '#facc15' : '#4ade80';
    const glowColor = isMining ? 'rgba(250, 204, 21, 0.45)' : 'rgba(74, 222, 128, 0.45)';
    const startPt = points[0];
    const filterId = `route-glow-${route.id}${isEnlarged ? '-lg' : ''}`;

    return `
      <svg class="circuit-map-svg" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        <defs>
          <filter id="${filterId}" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="0" stdDeviation="${isEnlarged ? '1.1' : '0.8'}" flood-color="${glowColor}" />
          </filter>
        </defs>
        
        <!-- Dark contrast underlay so line is visible against any terrain -->
        <path d="${pathD}" fill="none" stroke="rgba(2, 6, 23, 0.88)" stroke-width="${isEnlarged ? '3.4' : '4.2'}" stroke-linejoin="round" stroke-linecap="round" />
        
        <!-- Glowing animated route line -->
        <path class="circuit-svg-track" d="${pathD}" fill="none" stroke="${mainStroke}" stroke-width="${isEnlarged ? '1.6' : '2.1'}" stroke-dasharray="4 2" stroke-linejoin="round" stroke-linecap="round" filter="url(#${filterId})" />
        
        <!-- Directional Chevron Arrows along the route -->
        ${arrows.map(a => `
          <g transform="translate(${a.x.toFixed(2)}, ${a.y.toFixed(2)}) rotate(${a.deg.toFixed(1)})">
            <path d="${isEnlarged ? 'M -1.4 -1.3 L 1.5 0 L -1.4 1.3' : 'M -1.7 -1.5 L 1.8 0 L -1.7 1.5'}" fill="none" stroke="rgba(2, 6, 23, 0.95)" stroke-width="${isEnlarged ? '1.3' : '1.6'}" stroke-linecap="round" stroke-linejoin="round" />
            <path d="${isEnlarged ? 'M -1.4 -1.3 L 1.5 0 L -1.4 1.3' : 'M -1.7 -1.5 L 1.8 0 L -1.7 1.5'}" fill="none" stroke="#ffffff" stroke-width="${isEnlarged ? '0.75' : '0.95'}" stroke-linecap="round" stroke-linejoin="round" />
          </g>
        `).join('')}

        <!-- Waypoint cluster pins along the terrain loop -->
        ${points.slice(1, -1).map((p, idx) => isEnlarged ? `
          <g class="circuit-svg-wp-node" transform="translate(${p.x.toFixed(1)}, ${p.y.toFixed(1)})">
            <circle cx="0" cy="0" r="1.9" fill="#0f172a" stroke="${mainStroke}" stroke-width="0.55" />
            <text x="0" y="0.65" fill="#ffffff" font-size="2.0" font-weight="700" text-anchor="middle" font-family="system-ui, sans-serif">${idx + 2}</text>
            ${p.label ? `<title>Stop ${idx + 2}: ${escapeHtml(p.label)} (${p.x.toFixed(1)}, ${p.y.toFixed(1)})</title>` : ''}
          </g>
        ` : `
          <circle cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="1.25" fill="#ffffff" stroke="rgba(2, 6, 23, 0.9)" stroke-width="0.5" />
        `).join('')}
        
        <!-- Start Point Marker -->
        <g transform="translate(${startPt.x.toFixed(1)}, ${startPt.y.toFixed(1)})">
          <circle cx="0" cy="0" r="${isEnlarged ? '2.2' : '2.0'}" fill="#ef4444" stroke="#ffffff" stroke-width="0.65">
            <title>Stop 1 (Start): ${escapeHtml(startPt.label || 'Start')} (${startPt.x.toFixed(1)}, ${startPt.y.toFixed(1)})</title>
          </circle>
          ${isEnlarged ? `<text x="0" y="0.7" fill="#ffffff" font-size="2.1" font-weight="800" text-anchor="middle" font-family="system-ui, sans-serif">1</text>` : ''}
        </g>
        
        ${isEnlarged ? `
          <g class="circuit-svg-pin-label" transform="translate(${startPt.x.toFixed(1)}, ${Math.max(4.5, startPt.y - 3.8).toFixed(1)})">
            <rect x="-8.5" y="-3.4" width="17" height="4.2" rx="1.1" fill="rgba(15, 23, 42, 0.92)" stroke="${mainStroke}" stroke-width="0.35" />
            <text x="0" y="-0.5" fill="#ffffff" font-size="2.2" font-weight="700" text-anchor="middle" font-family="system-ui, sans-serif">START</text>
          </g>
        ` : ''}
      </svg>
    `;
  }

  let activeRouteModal = null;
  let activeModalCleanup = null;

  function openGatheringRouteModal(route, isMining) {
    if (!route) return;

    if (activeRouteModal && typeof activeModalCleanup === 'function') {
      activeModalCleanup();
    }

    let modal = document.getElementById('gathering-route-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'gathering-route-modal';
      modal.className = 'gathering-route-modal-backdrop';
      modal.setAttribute('role', 'dialog');
      modal.setAttribute('aria-modal', 'true');
      document.body.appendChild(modal);
    }
    activeRouteModal = modal;

    const zoneName = route.zone;
    const mapUrl = getZoneMapUrl(zoneName, true);
    const mainColor = isMining ? '#facc15' : '#4ade80';
    const profLabel = isMining ? 'Mining Circuit' : 'Herbalism Circuit';
    const points = CIRCUIT_ROUTE_PATHS[route.id] || [];

    modal.innerHTML = `
      <div class="gathering-route-dialog" role="document">
        <div class="gathering-route-header">
          <div class="gathering-route-title-box">
            <div class="gathering-route-meta-pills">
              <span class="circuit-faction-badge ${route.faction.toLowerCase()}">${escapeHtml(route.faction)}</span>
              <span class="circuit-direction-badge">🔄 ${escapeHtml(route.direction)}</span>
              <span class="circuit-lap-badge">⏱️ ${escapeHtml(route.lapMinutes)}</span>
              <span class="circuit-zone-badge">📍 ${escapeHtml(zoneName)}</span>
              <span class="circuit-hostile-badge" style="color: #f87171;">Hostile: ${escapeHtml(route.hostileLevel)}</span>
            </div>
            <h3 class="gathering-route-title">${escapeHtml(route.name)}</h3>
          </div>
          <button type="button" class="gathering-route-close-btn" id="gathering-route-close" aria-label="Close enlarged route map">✕</button>
        </div>

        <div class="gathering-route-toolbar">
          <div class="gathering-zoom-group">
            <button type="button" class="gathering-zoom-btn" id="gathering-zoom-out" title="Zoom Out" aria-label="Zoom Out">−</button>
            <span class="gathering-zoom-level" id="gathering-zoom-display">100%</span>
            <button type="button" class="gathering-zoom-btn" id="gathering-zoom-in" title="Zoom In" aria-label="Zoom In">+</button>
            <button type="button" class="gathering-zoom-btn text-btn" id="gathering-zoom-reset" title="Reset View">↺ Reset</button>
          </div>
          <div class="gathering-toolbar-hint">
            <span class="hint-icon">🖐️</span> Click &amp; drag to pan · Scroll to zoom
          </div>
          <button type="button" class="gathering-tomtom-btn" id="gathering-copy-tomtom" title="Copy TomTom waypoint macro">
            📋 Copy TomTom Macro
          </button>
        </div>

        <div class="gathering-route-viewport" id="gathering-map-viewport">
          <div class="gathering-route-canvas" id="gathering-map-canvas">
            <img src="${mapUrl}" alt="${escapeHtml(zoneName)} Parchment Map" class="gathering-route-large-img" draggable="false" />
            ${renderRouteSvgOverlay(route, isMining, true)}
          </div>
        </div>

        <div class="gathering-route-drawer">
          <div class="gathering-drawer-stats">
            <span class="gathering-drawer-pill"><strong>Density:</strong> ${escapeHtml(route.density)}</span>
            <span class="gathering-drawer-pill"><strong>Best For:</strong> ${escapeHtml(route.bestFor)}</span>
            <span class="gathering-drawer-pill" style="border-color: ${mainColor}; color: ${mainColor};"><strong>Type:</strong> ${profLabel}</span>
          </div>
          <p class="gathering-drawer-desc">${escapeHtml(route.description)}</p>
          ${route.tips ? `<div class="gathering-drawer-tip"><strong>💡 Pro-Tip:</strong> ${escapeHtml(route.tips)}</div>` : ''}
          ${points.length > 0 ? `
            <div class="gathering-drawer-waypoints">
              <span class="gathering-wp-heading">Terrain Waypoint Sequence (${points.length} stops):</span>
              <div class="gathering-wp-list">
                ${points.map((p, i) => `
                  <button type="button" class="gathering-wp-chip ${i === 0 ? 'start-chip' : ''}" data-x="${p.x}" data-y="${p.y}" title="Click to copy /way coordinate">
                    <span class="wp-num">${i + 1}</span>
                    <span class="wp-label">${escapeHtml(p.label || 'Waypoint')}</span>
                    <span class="wp-coords">(${p.x.toFixed(1)}, ${p.y.toFixed(1)})</span>
                  </button>
                `).join('')}
              </div>
            </div>
          ` : ''}
        </div>
      </div>
    `;

    let zoom = 1.0;
    const minZoom = 1.0;
    const maxZoom = 3.5;
    const zoomStep = 0.5;
    let panX = 0;
    let panY = 0;
    let isDragging = false;
    let startX = 0;
    let startY = 0;

    const viewport = modal.querySelector('#gathering-map-viewport');
    const canvas = modal.querySelector('#gathering-map-canvas');
    const zoomDisplay = modal.querySelector('#gathering-zoom-display');
    const zoomInBtn = modal.querySelector('#gathering-zoom-in');
    const zoomOutBtn = modal.querySelector('#gathering-zoom-out');
    const zoomResetBtn = modal.querySelector('#gathering-zoom-reset');
    const closeBtn = modal.querySelector('#gathering-route-close');
    const tomtomBtn = modal.querySelector('#gathering-copy-tomtom');

    function updateTransform() {
      if (zoom <= 1.0) {
        panX = 0;
        panY = 0;
        if (viewport) viewport.style.cursor = 'default';
      } else {
        if (viewport) viewport.style.cursor = isDragging ? 'grabbing' : 'grab';
        const vw = viewport ? viewport.clientWidth || 800 : 800;
        const vh = viewport ? viewport.clientHeight || 500 : 500;
        const maxPanX = (vw * (zoom - 1)) / 2;
        const maxPanY = (vh * (zoom - 1)) / 2;
        panX = Math.max(-maxPanX, Math.min(maxPanX, panX));
        panY = Math.max(-maxPanY, Math.min(maxPanY, panY));
      }
      if (canvas) {
        canvas.style.transform = `translate(${panX}px, ${panY}px) scale(${zoom})`;
      }
      if (zoomDisplay) {
        zoomDisplay.textContent = `${Math.round(zoom * 100)}%`;
      }
      if (zoomInBtn) zoomInBtn.disabled = zoom >= maxZoom;
      if (zoomOutBtn) zoomOutBtn.disabled = zoom <= minZoom;
    }

    function setZoom(newZoom) {
      zoom = Math.max(minZoom, Math.min(maxZoom, Math.round(newZoom * 10) / 10));
      updateTransform();
    }

    zoomInBtn?.addEventListener('click', () => setZoom(zoom + zoomStep));
    zoomOutBtn?.addEventListener('click', () => setZoom(zoom - zoomStep));
    zoomResetBtn?.addEventListener('click', () => {
      panX = 0;
      panY = 0;
      setZoom(1.0);
    });

    function onWheel(e) {
      e.preventDefault();
      const delta = e.deltaY < 0 ? 0.25 : -0.25;
      setZoom(zoom + delta);
    }
    viewport?.addEventListener('wheel', onWheel, { passive: false });

    function onMouseDown(e) {
      if (zoom <= 1.0) return;
      isDragging = true;
      startX = e.clientX - panX;
      startY = e.clientY - panY;
      if (viewport) viewport.style.cursor = 'grabbing';
    }
    function onMouseMove(e) {
      if (!isDragging) return;
      panX = e.clientX - startX;
      panY = e.clientY - startY;
      updateTransform();
    }
    function onMouseUp() {
      if (!isDragging) return;
      isDragging = false;
      if (viewport) viewport.style.cursor = zoom > 1.0 ? 'grab' : 'default';
    }

    viewport?.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    function copyMacro(macroText, triggerEl) {
      if (!macroText) return;
      if (typeof window.copyMacroToClipboard === 'function') {
        window.copyMacroToClipboard(macroText, triggerEl);
        if (typeof window.showToast === 'function') {
          window.showToast('✓ Copied TomTom macro', 'success');
        }
      } else if (typeof window.copyTextToClipboard === 'function') {
        window.copyTextToClipboard(macroText, () => {
          if (triggerEl) {
            triggerEl.classList.add('copied');
            setTimeout(() => triggerEl.classList.remove('copied'), 1800);
          }
          if (typeof window.showToast === 'function') {
            window.showToast('✓ Copied TomTom macro', 'success');
          }
        });
      } else if (navigator.clipboard) {
        navigator.clipboard.writeText(macroText).then(() => {
          if (triggerEl) {
            triggerEl.classList.add('copied');
            setTimeout(() => triggerEl.classList.remove('copied'), 1800);
          }
          if (typeof window.showToast === 'function') {
            window.showToast('✓ Copied TomTom macro', 'success');
          }
        }).catch(() => {});
      }
    }

    tomtomBtn?.addEventListener('click', () => {
      const macro = points.map(p => `/way ${zoneName} ${p.x.toFixed(1)} ${p.y.toFixed(1)} ${p.label || ''}`).join('\n');
      copyMacro(macro, tomtomBtn);
    });

    modal.querySelectorAll('.gathering-wp-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        const x = Number(chip.getAttribute('data-x'));
        const y = Number(chip.getAttribute('data-y'));
        const label = chip.querySelector('.wp-label')?.textContent || '';
        const macro = `/way ${zoneName} ${x.toFixed(1)} ${y.toFixed(1)} ${label}`;
        copyMacro(macro, chip);
      });
    });

    function closeModal() {
      modal.classList.remove('is-open');
      modal.setAttribute('hidden', '');
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('keydown', onKeyDown);
      viewport?.removeEventListener('wheel', onWheel);
      activeRouteModal = null;
      activeModalCleanup = null;
    }
    activeModalCleanup = closeModal;

    function onKeyDown(e) {
      if (e.key === 'Escape') closeModal();
    }
    document.addEventListener('keydown', onKeyDown);

    closeBtn?.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });

    modal.removeAttribute('hidden');
    requestAnimationFrame(() => {
      modal.classList.add('is-open');
      updateTransform();
    });
  }

  /* ==========================================================================
     SUBTAB 6: GATHERING NODES (HERBALISM & MINING)
     ========================================================================== */
  function renderNodesTab(container, prof) {
    const isMining = prof.slug === 'mining';
    const isHerbalism = prof.slug === 'herbalism';
    const circuits = isMining ? MINING_CIRCUITS : (isHerbalism ? HERBALISM_CIRCUITS : null);
    const nodes = prof.nodes || [];

    if (!circuits) {
      container.innerHTML = `
        <div class="leveling-header-block">
          <div class="leveling-header-title">
            <h3>${escapeHtml(prof.name)} Resource Nodes (${nodes.length})</h3>
            <p>Every harvestable resource node across Azeroth, required skill levels, best farming locations, and item yield.</p>
          </div>
        </div>

        <div class="nodes-grid">
          ${nodes.map(n => `
            <div class="node-card">
              <div class="node-header">
                <img src="${getIconUrl(n.icon)}" alt="${escapeHtml(n.name)}" class="node-icon" loading="lazy" />
                <div class="node-title-box">
                  <h4>${escapeHtml(n.name)}</h4>
                  <small>${escapeHtml(n.zones)}</small>
                </div>
                <span class="node-skill-badge">Skill ${n.skill}</span>
              </div>
              ${n.drops && n.drops.length ? `
                <div class="node-drops-row">
                  ${n.drops.map(d => `
                    <div class="step-reagent-badge" title="${escapeHtml(d.name)}" data-item-id="${d.itemId}" data-item-name="${escapeHtml(d.name)}">
                      <img src="${getIconUrl(d.icon, d.name)}" alt="${escapeHtml(d.name)}" class="step-reagent-img q${d.quality || 1}" loading="lazy" />
                    </div>
                  `).join('')}
                </div>
              ` : ''}
            </div>
          `).join('')}
        </div>
      `;
      attachTooltipListeners(container, prof);
      return;
    }

    const currentTierId = isMining ? activeMiningTier : activeHerbTier;
    const activeTier = circuits.find(c => c.tierId === currentTierId) || circuits[0];

    container.innerHTML = `
      <div class="leveling-header-block">
        <div class="leveling-header-title">
          <h3>
            ${escapeHtml(prof.name)} Gathering Authority &amp; Circuit Routes
            <span class="beta-cap-tag" style="background: rgba(234, 179, 8, 0.2); border-color: #eab308; color: #fef08a;">
              Multiple Routes per Tier
            </span>
          </h3>
          <p>Choose between high-density zone circuit farming routes (Alliance, Horde, Contested, and Cave loops with lap times &amp; directions) or the full raw node list.</p>
        </div>
        <div class="gathering-view-toggle-bar">
          <button type="button" class="gathering-toggle-btn ${gatheringViewMode === 'routes' ? 'active' : ''}" data-view="routes">
            <span>🗺️</span> Circuit Routes (${circuits.reduce((acc, c) => acc + c.routes.length, 0)} Routes)
          </button>
          <button type="button" class="gathering-toggle-btn ${gatheringViewMode === 'nodes' ? 'active' : ''}" data-view="nodes">
            <span>${isMining ? '⛏️' : '🌿'}</span> Resource Nodes List (${nodes.length})
          </button>
        </div>
      </div>

      ${gatheringViewMode === 'routes' ? `
        <!-- Tier Navigation Chips -->
        <div class="prof-category-chips" style="margin-bottom: 1.25rem;">
          ${circuits.map(tier => {
            const tierNum = (tier.tierName.match(/Tier\s+(\d+)/i) || [])[1] || '';
            const skill = (tier.tierName.match(/\(Skill\s+([^)]+)\)/i) || [])[1] || '';
            const firstMat = (tier.ores && tier.ores[0]) || (tier.herbs && tier.herbs[0]) || '';
            const shortMat = firstMat.replace(/\s+Ore$/i, '');
            const chipLabel = `Tier ${tierNum}: ${shortMat}${skill ? ' (' + skill.replace(/\s*\/\s*\d+/, '') + ')' : ''}`;
            return `
              <button type="button" class="prof-cat-chip ${tier.tierId === activeTier.tierId ? 'active' : ''}" data-tier-id="${tier.tierId}">
                ${escapeHtml(chipLabel)}
              </button>
            `;
          }).join('')}
        </div>

        <!-- Tier Header Banner -->
        <div class="circuit-tier-header">
          <div class="circuit-tier-title">${escapeHtml(activeTier.tierName)}</div>
          <div class="circuit-tier-mats">
            <span>Harvestable Yields:</span>
            ${(activeTier.ores || activeTier.herbs || []).map(mat => `
              <span class="circuit-mat-pill">${escapeHtml(mat)}</span>
            `).join('')}
          </div>
        </div>

        <!-- Multi-Route Grid (4 Distinct Routes) -->
        <div class="circuit-routes-grid">
          ${activeTier.routes.map((rt, rIdx) => `
            <div class="circuit-route-card">
              <div class="circuit-route-head">
                <div class="circuit-route-badge-row">
                  <span class="circuit-faction-badge ${rt.faction.toLowerCase()}">${escapeHtml(rt.faction)}</span>
                  <span class="circuit-direction-badge">🔄 ${escapeHtml(rt.direction)}</span>
                  <span class="circuit-lap-badge">⏱️ ${escapeHtml(rt.lapMinutes)}</span>
                </div>
                <h4 class="circuit-route-name">${rIdx + 1}. ${escapeHtml(rt.name)}</h4>
                <div class="circuit-route-zone">📍 ${escapeHtml(rt.zone)} · <span style="color: #f87171;">Hostile: ${escapeHtml(rt.hostileLevel)}</span></div>
              </div>

              <div class="circuit-route-stats">
                <div class="circuit-stat-pill">
                  <strong>Density:</strong> ${escapeHtml(rt.density)}
                </div>
                <div class="circuit-stat-pill">
                  <strong>Best For:</strong> ${escapeHtml(rt.bestFor)}
                </div>
              </div>

              <div class="circuit-route-body">
                <p class="circuit-desc">${escapeHtml(rt.description)}</p>
                ${rt.tips ? `<div class="circuit-pro-tip"><strong>💡 Pro-Tip:</strong> ${escapeHtml(rt.tips)}</div>` : ''}
              </div>

              <!-- Terrain Gathering Route Map Preview -->
              <div class="circuit-route-map-preview" data-route-id="${rt.id}" role="button" tabindex="0" title="Click route map to see an enlarged route map version">
                <div class="circuit-map-img-wrap">
                  <img src="${getZoneMapUrl(rt.zone)}" alt="${escapeHtml(rt.zone)} Terrain Route Map" class="circuit-map-img" loading="lazy" />
                  ${renderRouteSvgOverlay(rt, isMining, false)}
                </div>
                <div class="circuit-map-zoom-badge">
                  <span class="zoom-icon">🔍</span> Click route map to see an enlarged route map version
                </div>
              </div>

              <div class="circuit-route-footer">
                <span class="circuit-waypoint-label">Strategic Waypoint:</span>
                ${formatWaypointsInHtml(escapeHtml(rt.waypoint), rt.zone)}
              </div>
            </div>
          `).join('')}
        </div>
      ` : `
        <!-- Raw Resource Nodes Grid -->
        <div class="nodes-grid">
          ${nodes.map(n => `
            <div class="node-card">
              <div class="node-header">
                <img src="${getIconUrl(n.icon)}" alt="${escapeHtml(n.name)}" class="node-icon" loading="lazy" />
                <div class="node-title-box">
                  <h4>${escapeHtml(n.name)}</h4>
                  <small>${escapeHtml(n.zones)}</small>
                </div>
                <span class="node-skill-badge">Skill ${n.skill}</span>
              </div>
              ${n.drops && n.drops.length ? `
                <div class="node-drops-row">
                  ${n.drops.map(d => `
                    <div class="step-reagent-badge" title="${escapeHtml(d.name)}" data-item-id="${d.itemId}" data-item-name="${escapeHtml(d.name)}">
                      <img src="${getIconUrl(d.icon, d.name)}" alt="${escapeHtml(d.name)}" class="step-reagent-img q${d.quality || 1}" loading="lazy" />
                    </div>
                  `).join('')}
                </div>
              ` : ''}
            </div>
          `).join('')}
        </div>
      `}
    `;

    container.querySelectorAll('.gathering-toggle-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        gatheringViewMode = btn.getAttribute('data-view');
        renderNodesTab(container, prof);
      });
    });

    container.querySelectorAll('.prof-cat-chip').forEach(btn => {
      btn.addEventListener('click', () => {
        const tid = btn.getAttribute('data-tier-id');
        if (isMining) activeMiningTier = tid;
        else activeHerbTier = tid;
        renderNodesTab(container, prof);
      });
    });

    container.querySelectorAll('.circuit-route-map-preview').forEach(preview => {
      preview.addEventListener('click', () => {
        const routeId = preview.getAttribute('data-route-id');
        const rt = (activeTier?.routes || []).find(r => r.id === routeId);
        if (rt) openGatheringRouteModal(rt, isMining);
      });
      preview.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          const routeId = preview.getAttribute('data-route-id');
          const rt = (activeTier?.routes || []).find(r => r.id === routeId);
          if (rt) openGatheringRouteModal(rt, isMining);
        }
      });
    });

    attachTooltipListeners(container, prof);
  }

  window.WOW_PROFESSIONS_ROUTES = {
    getZoneMapUrl,
    buildSmoothClosedPathAndArrows,
    renderRouteSvgOverlay,
    openGatheringRouteModal,
    renderNodesTab
  };
})();
