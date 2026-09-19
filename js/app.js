/**
 * World of Warcraft: Forever - Main Application Controller
 * Handles Navigation, Live Timers (including Beta Ends Oct 21), News Rendering,
 * Codex Filters, 16-Point Legacy Calculator, Full Dungeon Curve, Engine Specs,
 * and 35-Day Beta Duration Tracking.
 */

document.addEventListener('DOMContentLoaded', () => {
  initCountdowns();
  initNavigation();
  initNewsHub();
  initCodex();
  initClassRacePlanner();
  initLegacyCalculator();
  initCampingHub();
  renderMountsGallery();
  renderStatsAndCaps();
  initTransmogDemo();
  initEngineVisualDemo();
  initBetaDurationTracker();
  renderQoLGrid();
  renderDungeonCurve();
  renderEngineSpecs();
  renderProfessionPassives();
  renderGameEditions();
});

/* ==========================================================================
   1. REAL-TIME COUNTDOWN TIMERS
   ========================================================================== */
function initCountdowns() {
  const targets = {
    launch: new Date(WOW_FOREVER_DATA.countdownTargets.globalLaunch).getTime(),
    phase2: new Date(WOW_FOREVER_DATA.countdownTargets.betaPhase2).getTime(),
    betaEnds: new Date(WOW_FOREVER_DATA.countdownTargets.betaEnds).getTime(),
    raids: new Date(WOW_FOREVER_DATA.countdownTargets.raidUnlock).getTime()
  };

  function update() {
    const now = new Date().getTime();

    // 1. Beta Conclusion Countdown (Oct 21, 2026)
    const diffBetaEnds = Math.max(0, targets.betaEnds - now);
    renderTimerDigits('betaends', diffBetaEnds);

    // 2. Global Launch Countdown (Nov 4, 2026)
    const diffLaunch = Math.max(0, targets.launch - now);
    renderTimerDigits('launch', diffLaunch);

    // 3. Beta Phase 2 Countdown (Oct 8, 2026)
    const diffPhase2 = Math.max(0, targets.phase2 - now);
    renderTimerDigits('phase2', diffPhase2);

    // 4. Raid Unlock Countdown (Dec 9, 2026)
    const diffRaids = Math.max(0, targets.raids - now);
    renderTimerDigits('raids', diffRaids);
  }

  function renderTimerDigits(prefix, diff) {
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    const dElem = document.getElementById(`${prefix}-days`);
    const hElem = document.getElementById(`${prefix}-hours`);
    const mElem = document.getElementById(`${prefix}-mins`);
    const sElem = document.getElementById(`${prefix}-secs`);

    if (dElem) dElem.textContent = String(days).padStart(2, '0');
    if (hElem) hElem.textContent = String(hours).padStart(2, '0');
    if (mElem) mElem.textContent = String(minutes).padStart(2, '0');
    if (sElem) sElem.textContent = String(seconds).padStart(2, '0');
  }

  update();
  setInterval(update, 1000);
}

/* ==========================================================================
   2. BETA DURATION TRACKER & TIMELINE WIDGET
   ========================================================================== */
function initBetaDurationTracker() {
  const start = new Date("2026-09-17T10:00:00-07:00").getTime();
  const end = new Date("2026-10-21T23:59:59-07:00").getTime();
  const now = new Date().getTime();

  const totalDuration = end - start;
  const elapsed = Math.max(0, now - start);
  const percent = Math.min(100, Math.round((elapsed / totalDuration) * 100));

  // Days elapsed calculation
  const daysElapsed = Math.floor(elapsed / (1000 * 60 * 60 * 24)) + 1; // e.g. Day 2
  const daysRemaining = Math.max(0, Math.ceil((end - now) / (1000 * 60 * 60 * 24)));

  const progressFill = document.getElementById('beta-duration-progress-fill');
  const progressText = document.getElementById('beta-duration-progress-text');
  const daysBadge = document.getElementById('beta-days-badge');

  if (progressFill) progressFill.style.width = `${percent}%`;
  if (progressText) progressText.textContent = `Day ${daysElapsed} of 35 Days (${percent}% elapsed • ${daysRemaining} days remaining)`;
  if (daysBadge) daysBadge.textContent = `${daysRemaining} Days Left`;
}

/* ==========================================================================
   3. MAIN TAB NAVIGATION
   ========================================================================== */
function initNavigation() {
  const tabButtons = document.querySelectorAll('.nav-tab-btn');
  const tabPanels = document.querySelectorAll('.tab-content');

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTab = btn.getAttribute('data-tab');

      tabButtons.forEach(b => b.classList.remove('active'));
      tabPanels.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      const targetPanel = document.getElementById(`tab-${targetTab}`);
      if (targetPanel) {
        targetPanel.classList.add('active');
      }

      const navBar = document.querySelector('.nav-tab-bar');
      if (navBar && window.scrollY > navBar.offsetTop + 100) {
        navBar.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}

/* ==========================================================================
   4. NEWS & DISPATCH HUB
   ========================================================================== */
let allNewsItems = [];

function initNewsHub() {
  const customNews = JSON.parse(localStorage.getItem('wow_forever_custom_news') || '[]');
  allNewsItems = [...customNews, ...WOW_FOREVER_DATA.newsFeed];

  renderNewsGrid(allNewsItems);

  const filterChips = document.querySelectorAll('.filter-chip[data-source]');
  filterChips.forEach(chip => {
    chip.addEventListener('click', () => {
      filterChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      applyNewsFilters();
    });
  });

  const searchInput = document.getElementById('news-search-input');
  if (searchInput) {
    searchInput.addEventListener('input', () => {
      applyNewsFilters();
    });
  }

  const customForm = document.getElementById('add-custom-intel-form');
  if (customForm) {
    customForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const title = document.getElementById('custom-title').value.trim();
      const author = document.getElementById('custom-author').value.trim() || 'Community Intel';
      const category = document.getElementById('custom-category').value;
      const summary = document.getElementById('custom-summary').value.trim();
      const content = document.getElementById('custom-content').value.trim();

      if (!title || !summary) return;

      const newArticle = {
        id: 'custom-' + Date.now(),
        title,
        source: 'Personal Log',
        sourceType: 'custom',
        author,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        tag: category,
        summary,
        content: content || summary,
        url: '#'
      };

      const stored = JSON.parse(localStorage.getItem('wow_forever_custom_news') || '[]');
      stored.unshift(newArticle);
      localStorage.setItem('wow_forever_custom_news', JSON.stringify(stored));

      allNewsItems.unshift(newArticle);
      applyNewsFilters();
      customForm.reset();

      alert('Intel logged and saved to your personal local records!');
    });
  }

  const modalClose = document.getElementById('news-modal-close');
  const modalBackdrop = document.getElementById('news-modal-backdrop');
  if (modalClose && modalBackdrop) {
    modalClose.addEventListener('click', () => {
      modalBackdrop.classList.remove('open');
    });
    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) modalBackdrop.classList.remove('open');
    });
  }
}

function applyNewsFilters() {
  const activeChip = document.querySelector('.filter-chip[data-source].active');
  const selectedSource = activeChip ? activeChip.getAttribute('data-source') : 'all';
  const query = (document.getElementById('news-search-input')?.value || '').toLowerCase();

  const filtered = allNewsItems.filter(item => {
    const matchesSource = (selectedSource === 'all') || (item.sourceType === selectedSource);
    const matchesSearch = !query || 
      item.title.toLowerCase().includes(query) || 
      item.summary.toLowerCase().includes(query) || 
      item.content.toLowerCase().includes(query) ||
      item.tag.toLowerCase().includes(query);

    return matchesSource && matchesSearch;
  });

  renderNewsGrid(filtered);
}

function renderNewsGrid(items) {
  const container = document.getElementById('news-cards-container');
  if (!container) return;

  if (items.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 3rem; color: var(--text-muted);">
        <p style="font-size: 1.2rem;">No dispatches found matching your filter criteria.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = items.map(item => `
    <article class="news-card">
      <div>
        <div class="news-card-top">
          <span class="source-badge source-${item.sourceType}">${item.source}</span>
          <span class="news-date">${item.date}</span>
        </div>
        <h3 class="news-title">${escapeHtml(item.title)}</h3>
        <p class="news-summary">${escapeHtml(item.summary)}</p>
      </div>
      <div class="news-card-bottom">
        <span class="news-author">By ${escapeHtml(item.author)}</span>
        <button class="news-read-btn" onclick="openNewsModal('${item.id}')">
          Read Full Intel <span>→</span>
        </button>
      </div>
    </article>
  `).join('');
}

window.openNewsModal = function(id) {
  const article = allNewsItems.find(a => a.id === id);
  if (!article) return;

  const modalBackdrop = document.getElementById('news-modal-backdrop');
  const modalSource = document.getElementById('modal-source');
  const modalDate = document.getElementById('modal-date');
  const modalTitle = document.getElementById('modal-title');
  const modalAuthor = document.getElementById('modal-author');
  const modalBody = document.getElementById('modal-body');

  if (modalBackdrop) {
    if (modalSource) {
      modalSource.textContent = article.source;
      modalSource.className = `source-badge source-${article.sourceType}`;
    }
    if (modalDate) modalDate.textContent = article.date;
    if (modalTitle) modalTitle.textContent = article.title;
    if (modalAuthor) modalAuthor.textContent = `Author: ${article.author}`;
    
    let bodyContent = escapeHtml(article.content);
    if (article.url && article.url !== '#') {
      bodyContent += `\n\n🔗 Official Link: <a href="${article.url}" target="_blank" rel="noopener" style="color: var(--color-sky); text-decoration: underline;">${article.url}</a>`;
    }
    if (modalBody) modalBody.innerHTML = bodyContent.replace(/\n/g, '<br>');

    modalBackdrop.classList.add('open');
  }
};

/* ==========================================================================
   5. CONTENT CODEX & DUNGEONS EXPLORER
   ========================================================================== */
function initCodex() {
  const codexNavBtns = document.querySelectorAll('.codex-nav-btn');
  const codexPanels = document.querySelectorAll('.codex-panel');

  codexNavBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const panelId = btn.getAttribute('data-codex');
      codexNavBtns.forEach(b => b.classList.remove('active'));
      codexPanels.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      const targetPanel = document.getElementById(`codex-${panelId}`);
      if (targetPanel) targetPanel.classList.add('active');
    });
  });

  renderClassCombos();
  renderDungeons(WOW_FOREVER_DATA.dungeonsAndRaids);

  const dungeonFilters = document.querySelectorAll('.dungeon-filter-btn');
  dungeonFilters.forEach(btn => {
    btn.addEventListener('click', () => {
      dungeonFilters.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-dungeon-filter');
      let filtered = WOW_FOREVER_DATA.dungeonsAndRaids;

      if (filter === 'beta1') {
        filtered = filtered.filter(d => d.playableNow === true);
      } else if (filter === 'phase2') {
        filtered = filtered.filter(d => d.status.includes('Phase 2'));
      } else if (filter === 'dungeons') {
        filtered = filtered.filter(d => d.type.includes('Dungeon'));
      } else if (filter === 'raids') {
        filtered = filtered.filter(d => d.type.includes('Raid'));
      }

      renderDungeons(filtered);
    });
  });

  renderZones();
  initClassRacePlanner();
}

function renderClassCombos() {
  const container = document.getElementById('class-combos-container');
  if (!container) return;

  container.innerHTML = WOW_FOREVER_DATA.newClassCombos.map(combo => `
    <div class="combo-card">
      <span class="combo-badge ${combo.faction.toLowerCase()}">${combo.faction} • ${combo.role}</span>
      <h3 class="combo-title">${combo.race} ${combo.className}</h3>
      <p class="combo-role">${combo.mount ? `🐎 Mount: ${combo.mount}` : 'New Official Forever Combination'}</p>
      <p class="combo-lore">${combo.lore}</p>
    </div>
  `).join('');
}

function renderDungeons(items) {
  const container = document.getElementById('dungeons-grid-container');
  if (!container) return;

  container.innerHTML = items.map(d => `
    <div class="dungeon-card ${d.playableNow ? 'active-beta' : ''} ${d.type.includes('Raid') ? 'is-raid' : ''}">
      <div>
        <div class="dungeon-card-header">
          <span class="dungeon-level-badge">${d.levelRange}</span>
          ${d.playableNow ? '<span class="status-pulse-badge" style="font-size: 0.7rem;"><span class="pulse-dot"></span> In Beta Now</span>' : ''}
        </div>
        <h3 class="dungeon-name">${escapeHtml(d.name)}</h3>
        <p class="dungeon-zone">📍 ${escapeHtml(d.zone)} • ${escapeHtml(d.type)}</p>
        <p class="dungeon-desc">${escapeHtml(d.description)}</p>
      </div>

      <div>
        <div class="dungeon-boss-box">
          <strong>Key Encounters:</strong>
          <span>${d.bosses.join(', ')}</span>
        </div>
        <div class="loot-tags">
          ${d.lootHighlights.map(loot => `<span class="loot-tag">✦ ${escapeHtml(loot)}</span>`).join('')}
        </div>
      </div>
    </div>
  `).join('');
}

function renderZones() {
  const container = document.getElementById('new-zones-container');
  if (!container) return;

  container.innerHTML = WOW_FOREVER_DATA.newZones.map(zone => `
    <div class="dungeon-card" style="border-color: rgba(56, 189, 248, 0.4);">
      <div>
        <div class="dungeon-card-header">
          <span class="dungeon-level-badge">Levels ${zone.level}</span>
          <span style="font-size: 0.75rem; color: var(--color-sky); font-weight: 700;">${zone.continent}</span>
        </div>
        <h3 class="dungeon-name">${escapeHtml(zone.name)}</h3>
        <p class="dungeon-desc" style="margin-top: 0.5rem;">${escapeHtml(zone.description)}</p>
      </div>
      <div class="dungeon-boss-box" style="margin-top: 1rem;">
        <strong>Zone Highlights & Quests:</strong>
        <span>${escapeHtml(zone.features)}</span>
      </div>
    </div>
  `).join('');
}

function renderDungeonCurve() {
  const container = document.getElementById('dungeon-curve-container');
  if (!container) return;

  container.innerHTML = WOW_FOREVER_DATA.fullDungeonProgressionCurve.map(d => `
    <div class="curve-row ${d.isNew ? 'is-new' : ''} ${d.betaActive ? 'is-beta' : ''}">
      <span class="curve-lvl">${d.level}</span>
      <div class="curve-info">
        <strong class="curve-name">${escapeHtml(d.name)}</strong>
        <span class="curve-zone">${escapeHtml(d.zone)}</span>
      </div>
      <div class="curve-badges">
        ${d.isNew ? '<span class="badge-forever-new">✦ New Forever Dungeon</span>' : '<span class="badge-classic-staple">Classic Staple</span>'}
        ${d.betaActive ? '<span class="badge-beta-active">Beta Active</span>' : ''}
      </div>
    </div>
  `).join('');
}

/* ==========================================================================
   6. GAME RULES & QUALITY OF LIFE GRID
   ========================================================================== */
function renderQoLGrid() {
  const container = document.getElementById('qol-features-container');
  if (!container) return;

  container.innerHTML = WOW_FOREVER_DATA.gameplayRulesAndQoL.map(qol => `
    <div class="qol-feature-card">
      <div class="qol-card-top">
        <span class="qol-icon">${qol.icon}</span>
        <div>
          <span class="qol-badge">${qol.badge}</span>
          <h4 class="qol-title">${qol.title}</h4>
        </div>
      </div>
      <p class="qol-desc">${qol.desc}</p>
    </div>
  `).join('');
}

function renderEngineSpecs() {
  const container = document.getElementById('engine-specs-container');
  if (!container) return;

  const min = WOW_FOREVER_DATA.engineSpecs.minimum;
  const rec = WOW_FOREVER_DATA.engineSpecs.recommended;

  container.innerHTML = `
    <div class="spec-card">
      <h4 style="color: var(--text-gold); font-size: 1.1rem; margin-bottom: 0.8rem;">Minimum Specifications</h4>
      <div class="spec-row"><span>OS:</span> <strong>${min.os}</strong></div>
      <div class="spec-row"><span>Processor:</span> <strong>${min.cpu}</strong></div>
      <div class="spec-row"><span>Memory:</span> <strong>${min.ram}</strong></div>
      <div class="spec-row"><span>Graphics:</span> <strong>${min.gpu}</strong></div>
      <div class="spec-row"><span>Storage:</span> <strong style="color: #ef4444;">${min.storage}</strong></div>
      <div class="spec-row"><span>Target:</span> <strong>${min.target}</strong></div>
    </div>
    <div class="spec-card recommended">
      <h4 style="color: #38bdf8; font-size: 1.1rem; margin-bottom: 0.8rem;">Recommended (Ray-Tracing Target)</h4>
      <div class="spec-row"><span>OS:</span> <strong>${rec.os}</strong></div>
      <div class="spec-row"><span>Processor:</span> <strong>${rec.cpu}</strong></div>
      <div class="spec-row"><span>Memory:</span> <strong>${rec.ram}</strong></div>
      <div class="spec-row"><span>Graphics:</span> <strong>${rec.gpu}</strong></div>
      <div class="spec-row"><span>Storage:</span> <strong style="color: #10b981;">${rec.storage}</strong></div>
      <div class="spec-row"><span>Target:</span> <strong>${rec.target}</strong></div>
    </div>
  `;
}

/* ==========================================================================
   7. INTERACTIVE LEGACY (PARAGON) CALCULATOR & MILESTONES
   ========================================================================== */
let legacyAllocations = JSON.parse(localStorage.getItem('wow_forever_legacy_allocations') || '{}');
let simCapActive = false;

function initLegacyCalculator() {
  const container = document.getElementById('legacy-calc-container');
  if (!container) return;

  renderLegacyCalculator();

  const resetBtn = document.getElementById('reset-legacy-calc-btn');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      legacyAllocations = {};
      localStorage.setItem('wow_forever_legacy_allocations', JSON.stringify(legacyAllocations));
      renderLegacyCalculator();
    });
  }

  const simBtn = document.getElementById('toggle-sim-cap-btn');
  if (simBtn) {
    simBtn.addEventListener('click', () => {
      simCapActive = !simCapActive;
      simBtn.textContent = simCapActive ? 'Switch to 16 Launch Points' : 'Simulate 65 Cap';
      renderLegacyCalculator();
    });
  }
}

function renderLegacyCalculator() {
  const container = document.getElementById('legacy-trees-wrapper');
  const pointsCounter = document.getElementById('legacy-points-remaining');
  const milestoneGrid = document.getElementById('milestone-rewards-grid');
  const milestoneText = document.getElementById('milestone-progress-text');
  const challengesGrid = document.getElementById('legacy-challenges-grid');
  if (!container) return;

  const totalAllowed = simCapActive 
    ? (WOW_FOREVER_DATA.legacyTreesData.seasonalCap || 65)
    : (WOW_FOREVER_DATA.legacyTreesData.totalPointsAtLaunch || 16);

  const spentPoints = Object.values(legacyAllocations).reduce((a, b) => a + b, 0);
  const remaining = Math.max(0, totalAllowed - spentPoints);

  if (pointsCounter) {
    pointsCounter.textContent = `${remaining} / ${totalAllowed} Points Remaining ${simCapActive ? '(Sim 65 Cap)' : '(16 Launch)'}`;
    pointsCounter.style.color = remaining === 0 ? '#ef4444' : '#10b981';
  }

  if (milestoneText) {
    milestoneText.textContent = `${spentPoints} Points Allocated across Trees`;
  }

  // Render Milestone Rewards
  if (milestoneGrid && WOW_FOREVER_DATA.legacyMilestoneRewards) {
    milestoneGrid.innerHTML = WOW_FOREVER_DATA.legacyMilestoneRewards.map(m => {
      const unlocked = spentPoints >= m.points;
      return `
        <div class="milestone-reward-card ${unlocked ? 'unlocked' : ''}">
          <div class="milestone-points-badge ${unlocked ? 'unlocked' : ''}">
            ${unlocked ? '✓ UNLOCKED' : `${m.points} Points`}
          </div>
          <div class="milestone-card-body">
            <span style="font-size: 1.8rem;">${m.icon}</span>
            <div>
              <strong style="color: ${unlocked ? '#34d399' : '#fff'}; font-size: 0.95rem;">${escapeHtml(m.name)}</strong>
              <div style="font-size: 0.72rem; color: var(--text-gold);">${escapeHtml(m.type)} • ${escapeHtml(m.vendor)}</div>
              <p style="font-size: 0.78rem; color: var(--text-muted); margin-top: 0.2rem;">${escapeHtml(m.desc)}</p>
            </div>
          </div>
        </div>
      `;
    }).join('');
  }

  // Render Challenges
  if (challengesGrid && WOW_FOREVER_DATA.legacyChallenges) {
    challengesGrid.innerHTML = WOW_FOREVER_DATA.legacyChallenges.map(c => `
      <div class="challenge-item-card">
        <strong style="color: var(--color-sky); font-size: 0.9rem;">${escapeHtml(c.category)}</strong>
        <p style="font-size: 0.8rem; color: #cbd5e1; margin-top: 0.2rem;">${escapeHtml(c.desc)}</p>
      </div>
    `).join('');
  }

  // Render Trees
  container.innerHTML = WOW_FOREVER_DATA.legacyTreesData.trees.map(tree => {
    const treeSpent = getTreeSpent(tree);
    const treeCap = WOW_FOREVER_DATA.legacyTreesData.treeCap || 25;

    return `
      <div class="legacy-tree-col" style="border-top: 3px solid ${tree.color};">
        <div class="legacy-tree-header">
          <span style="font-size: 1.5rem;">${tree.icon}</span>
          <div>
            <h4 style="color: #fff; font-size: 1.1rem;">${tree.name}</h4>
            <span style="font-size: 0.75rem; color: var(--text-gold);">
              ${treeSpent} / ${treeCap} Points (Max)
            </span>
          </div>
        </div>
        <p style="font-size: 0.78rem; color: var(--text-muted); margin-bottom: 0.8rem;">${escapeHtml(tree.description || '')}</p>

        <div class="legacy-perks-list">
          ${tree.perks.map(perk => {
            const current = legacyAllocations[perk.id] || 0;
            const canAdd = current < perk.max && remaining > 0 && treeSpent < treeCap;
            const canSub = current > 0;

            return `
              <div class="legacy-perk-box">
                <div class="perk-info-row">
                  <span class="perk-name">${escapeHtml(perk.name)}</span>
                  <span class="perk-rank ${current > 0 ? 'active' : ''}">${current}/${perk.max}</span>
                </div>
                <p class="perk-desc">${escapeHtml(perk.desc)}</p>
                <div class="perk-btn-group">
                  <button class="perk-step-btn" onclick="adjustLegacyPerk('${perk.id}', -1)" ${!canSub ? 'disabled' : ''}>−</button>
                  <button class="perk-step-btn add" onclick="adjustLegacyPerk('${perk.id}', 1)" ${!canAdd ? 'disabled' : ''}>+</button>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;
  }).join('');
}

function getTreeSpent(tree) {
  return tree.perks.reduce((sum, p) => sum + (legacyAllocations[p.id] || 0), 0);
}

window.adjustLegacyPerk = function(perkId, delta) {
  let targetPerk = null;
  let targetTree = null;
  for (const tree of WOW_FOREVER_DATA.legacyTreesData.trees) {
    const found = tree.perks.find(p => p.id === perkId);
    if (found) { targetPerk = found; targetTree = tree; break; }
  }
  if (!targetPerk || !targetTree) return;

  const current = legacyAllocations[perkId] || 0;
  const spentPoints = Object.values(legacyAllocations).reduce((a, b) => a + b, 0);
  const totalAllowed = simCapActive 
    ? (WOW_FOREVER_DATA.legacyTreesData.seasonalCap || 65)
    : (WOW_FOREVER_DATA.legacyTreesData.totalPointsAtLaunch || 16);
  const treeSpent = getTreeSpent(targetTree);
  const treeCap = WOW_FOREVER_DATA.legacyTreesData.treeCap || 25;

  if (delta > 0) {
    if (spentPoints >= totalAllowed) return;
    if (treeSpent >= treeCap) return;
    if (current >= targetPerk.max) return;
    legacyAllocations[perkId] = current + 1;
  } else if (delta < 0) {
    if (current <= 0) return;
    legacyAllocations[perkId] = current - 1;
  }

  localStorage.setItem('wow_forever_legacy_allocations', JSON.stringify(legacyAllocations));
  renderLegacyCalculator();
};

/* ==========================================================================
   CAMPING & PROFESSIONS HUB CONTROLLER
   ========================================================================== */
function initCampingHub() {
  const kitsContainer = document.getElementById('camping-kits-chips');
  if (kitsContainer && WOW_FOREVER_DATA.campingKits) {
    kitsContainer.innerHTML = WOW_FOREVER_DATA.campingKits.map(kit => `
      <div class="camping-kit-chip">
        <strong style="color: var(--text-gold); font-size: 0.85rem;">⛺ ${escapeHtml(kit.name)}</strong>
        <span style="font-size: 0.75rem; color: #cbd5e1;">(Level ${kit.levelReq}+ • Up to ${kit.maxStations} station${kit.maxStations > 1 ? 's' : ''})</span>
      </div>
    `).join('');
  }

  renderCampingStations('all');

  const filterBtns = document.querySelectorAll('#profession-filter-group .filter-chip');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.getAttribute('data-prof-filter');
      renderCampingStations(filter);
    });
  });

  const passivesContainer = document.getElementById('professions-passives-container');
  if (passivesContainer && WOW_FOREVER_DATA.professionPassives) {
    passivesContainer.innerHTML = WOW_FOREVER_DATA.professionPassives.map(prof => `
      <div class="profession-passive-card">
        <div class="profession-header">
          <div style="display: flex; align-items: center; gap: 0.6rem;">
            <span style="font-size: 1.6rem;">${prof.icon}</span>
            <div>
              <h4 style="color: #fff; font-size: 1.1rem; margin: 0;">${escapeHtml(prof.name)}</h4>
              <span style="font-size: 0.72rem; text-transform: uppercase; color: var(--text-gold); font-weight: 700;">${escapeHtml(prof.type)}</span>
            </div>
          </div>
          <span class="status-badge-highlight" style="font-size: 0.7rem;">Combat Power</span>
        </div>
        <div style="margin: 0.75rem 0;">
          <strong style="color: #34d399; font-size: 0.88rem;">✨ ${escapeHtml(prof.passiveName)}</strong>
          <p style="font-size: 0.84rem; color: #cbd5e1; margin-top: 0.2rem; line-height: 1.4;">${escapeHtml(prof.passiveEffect)}</p>
        </div>
        <div style="background: rgba(0,0,0,0.3); border-radius: var(--radius-sm); padding: 0.5rem 0.75rem; border-left: 2px solid var(--border-gold);">
          <strong style="font-size: 0.78rem; color: var(--text-gold);">🔥 Camping Hub Synergy:</strong>
          <p style="font-size: 0.8rem; color: var(--text-muted); margin-top: 0.15rem;">${escapeHtml(prof.campBonus)}</p>
        </div>
      </div>
    `).join('');
  }
}

function renderCampingStations(filter) {
  const container = document.getElementById('camping-stations-container');
  if (!container || !WOW_FOREVER_DATA.campingObjects) return;

  let list = WOW_FOREVER_DATA.campingObjects;
  if (filter === 'Primary') {
    list = list.filter(p => p.type === 'Primary');
  } else if (filter === 'Secondary') {
    list = list.filter(p => p.type === 'Secondary');
  }

  container.innerHTML = list.map(p => `
    <div class="camping-station-card">
      <div class="station-card-header">
        <div style="display: flex; align-items: center; gap: 0.6rem;">
          <span style="font-size: 1.8rem;">${p.icon}</span>
          <div>
            <h4 style="color: #fff; font-size: 1.15rem; margin: 0;">${escapeHtml(p.profession)}</h4>
            <span style="font-size: 0.72rem; text-transform: uppercase; color: var(--text-gold); font-weight: 700;">${escapeHtml(p.type)} Profession</span>
          </div>
        </div>
        <div class="mirrored-buff-badge">
          <span>Mirrored Buff:</span>
          <strong>${escapeHtml(p.mirroredBuff)}</strong>
        </div>
      </div>

      <div class="station-tiers-list">
        ${p.objects.map(obj => `
          <div class="station-tier-row">
            <span class="tier-pill">Tier ${obj.tier}</span>
            <div class="tier-info">
              <strong style="color: #e2e8f0; font-size: 0.88rem;">${escapeHtml(obj.name)}</strong>
              <p style="font-size: 0.78rem; color: var(--text-muted); margin: 0.15rem 0 0;">${escapeHtml(obj.desc)}</p>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `).join('');
}

/* ==========================================================================
   MOUNTS GALLERY & STATS CAPS CONTROLLER
   ========================================================================== */
function renderMountsGallery() {
  const container = document.getElementById('mounts-gallery-container');
  if (!container || !WOW_FOREVER_DATA.dataminedMounts) return;

  container.innerHTML = WOW_FOREVER_DATA.dataminedMounts.map(cat => `
    <div class="mount-category-card">
      <div class="mount-cat-header">
        <div style="display: flex; align-items: center; gap: 0.6rem;">
          <span style="font-size: 1.8rem;">${cat.icon}</span>
          <div>
            <h4 style="color: #fff; font-size: 1.15rem; margin: 0;">${escapeHtml(cat.category)}</h4>
            <span class="status-badge-highlight" style="font-size: 0.7rem; margin-top: 0.2rem;">${escapeHtml(cat.badge)}</span>
          </div>
        </div>
      </div>
      <ul class="mount-items-list">
        ${cat.mounts.map(m => `
          <li class="mount-item">
            <span style="color: var(--text-gold); font-size: 0.9rem;">🐎</span>
            <span>${escapeHtml(m)}</span>
          </li>
        `).join('')}
      </ul>
    </div>
  `).join('');
}

function renderStatsAndCaps() {
  const capsContainer = document.getElementById('stats-caps-container');
  const rulesContainer = document.getElementById('combat-rules-container');
  if (!WOW_FOREVER_DATA.statCapsAndMechanics) return;

  const { caps, rules } = WOW_FOREVER_DATA.statCapsAndMechanics;

  if (capsContainer) {
    capsContainer.innerHTML = caps.map(cap => `
      <div class="stat-cap-card">
        <div class="stat-cap-top">
          <span style="font-size: 1.8rem;">${cap.icon}</span>
          <span class="cap-target-badge">${escapeHtml(cap.target)}</span>
        </div>
        <div class="stat-cap-value">${escapeHtml(cap.value)}</div>
        <h4 class="stat-cap-name">${escapeHtml(cap.name)}</h4>
        <p class="stat-cap-desc">${escapeHtml(cap.desc)}</p>
      </div>
    `).join('');
  }

  if (rulesContainer) {
    rulesContainer.innerHTML = rules.map(rule => `
      <div class="combat-rule-card">
        <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.4rem;">
          <span style="color: var(--text-gold); font-size: 1.1rem;">⚖️</span>
          <h4 style="color: #fff; font-size: 1.05rem; margin: 0;">${escapeHtml(rule.title)}</h4>
        </div>
        <p style="font-size: 0.85rem; color: #cbd5e1; line-height: 1.5; margin: 0;">${escapeHtml(rule.desc)}</p>
      </div>
    `).join('');
  }
}

/* ==========================================================================
   8. TRANSMOG & ENGINE VISUAL DEMO TOGGLES
   ========================================================================= */
function initTransmogDemo() {
  const toggle = document.getElementById('purist-toggle-input');
  const modeStatus = document.getElementById('purist-status-label');
  const transmogView = document.getElementById('gear-inspect-view');

  if (!toggle) return;

  toggle.addEventListener('change', () => {
    const isPurist = toggle.checked;

    if (isPurist) {
      if (modeStatus) modeStatus.textContent = 'Classic Purist Mode: ACTIVE (Seeing actual equipped items)';
      modeStatus.style.color = '#10b981';

      if (transmogView) {
        transmogView.innerHTML = `
          <h4 style="color: #10b981;">🛡️ Player Inspect View (Purist Mode: On)</h4>
          <p style="font-size: 0.8rem; color: var(--text-muted); margin-bottom: 0.8rem;">You see the true mismatched leveling gear earned through quests & dungeons:</p>
          <div class="gear-slot-item"><span>Head</span><span style="color: #10b981;">Green Tinted Goggles</span></div>
          <div class="gear-slot-item"><span>Shoulders</span><span style="color: #cbd5e1;">Brawler's Rough Pauldrons</span></div>
          <div class="gear-slot-item"><span>Chest</span><span style="color: #3b82f6;">Tunic of Westfall (Blue)</span></div>
          <div class="gear-slot-item"><span>Hands</span><span style="color: #cbd5e1;">Lizard Hide Gloves (Green)</span></div>
          <div class="gear-slot-item"><span>Legs</span><span style="color: #10b981;">Chausses of Westfall</span></div>
          <div class="gear-slot-item"><span>Main Hand</span><span style="color: #3b82f6;">Cruel Barb (Deadmines)</span></div>
          <div class="gear-slot-item"><span>Off Hand</span><span style="color: #cbd5e1;">Hardened Iron Shortsword</span></div>
        `;
      }
    } else {
      if (modeStatus) modeStatus.textContent = 'Modern Transmog: ACTIVE (Seeing player cosmetic override)';
      modeStatus.style.color = 'var(--text-gold)';

      if (transmogView) {
        transmogView.innerHTML = `
          <h4 style="color: var(--text-gold);">✨ Player Inspect View (Modern Transmog)</h4>
          <p style="font-size: 0.8rem; color: var(--text-muted); margin-bottom: 0.8rem;">The player has transmogrified their set into a unified epic appearance:</p>
          <div class="gear-slot-item"><span>Head</span><span style="color: #a78bfa;">Zephras Sky-Crown [Transmog]</span></div>
          <div class="gear-slot-item"><span>Shoulders</span><span style="color: #a78bfa;">Skyborne Wind-Mantle [Transmog]</span></div>
          <div class="gear-slot-item"><span>Chest</span><span style="color: #a78bfa;">Skyborne Cloud-Robe [Transmog]</span></div>
          <div class="gear-slot-item"><span>Hands</span><span style="color: #a78bfa;">Zephyr Silken Grips [Transmog]</span></div>
          <div class="gear-slot-item"><span>Legs</span><span style="color: #a78bfa;">Breezewalker Leggings [Transmog]</span></div>
          <div class="gear-slot-item"><span>Main Hand</span><span style="color: #f59e0b;">Thunderfury, Blessed Blade [Transmog]</span></div>
          <div class="gear-slot-item"><span>Off Hand</span><span style="color: #a78bfa;">Aegis of the Zephyr [Transmog]</span></div>
        `;
      }
    }
  });
}

function initEngineVisualDemo() {
  const toggle = document.getElementById('engine-preset-toggle');
  const label = document.getElementById('engine-preset-label');
  const details = document.getElementById('engine-preset-details');

  if (!toggle) return;

  toggle.addEventListener('change', () => {
    const isRayTraced = toggle.checked;

    if (isRayTraced) {
      if (label) {
        label.textContent = 'Ray-Traced Global Illumination: ACTIVE';
        label.style.color = '#38bdf8';
      }
      if (details) {
        details.innerHTML = `
          <div style="border-left: 3px solid #38bdf8; padding-left: 1rem;">
            <strong style="color: #38bdf8;">Forever Ray-Traced Engine Mode</strong>
            <ul style="margin-top: 0.4rem; list-style: none; font-size: 0.85rem; color: #cbd5e1; display: flex; flex-direction: column; gap: 0.3rem;">
              <li>✦ Real-time shifting mountain and tree shadows matching sun angle.</li>
              <li>✦ Volumetric morning fog across Westfall, Elwynn, and Duskwood.</li>
              <li>✦ Re-engineered river flow with foam collision physics along riverbanks.</li>
              <li>✦ HD Character models with enhanced polygon meshes.</li>
            </ul>
          </div>
        `;
      }
    } else {
      if (label) {
        label.textContent = 'Classic 2004 Preset: ACTIVE';
        label.style.color = 'var(--text-gold)';
      }
      if (details) {
        details.innerHTML = `
          <div style="border-left: 3px solid var(--border-gold-bright); padding-left: 1rem;">
            <strong style="color: var(--text-gold);">Classic 2004 Pure Preset</strong>
            <ul style="margin-top: 0.4rem; list-style: none; font-size: 0.85rem; color: #cbd5e1; display: flex; flex-direction: column; gap: 0.3rem;">
              <li>✦ Original 2004 vertex lighting and fixed terrain shadows.</li>
              <li>✦ Standard atmospheric distance fog.</li>
              <li>✦ Low-poly classic character models (SD) with original combat animations.</li>
              <li>✦ Lightweight performance targeting maximum FPS on older laptops.</li>
            </ul>
          </div>
        `;
      }
    }
  });
}

function escapeHtml(string) {
  const div = document.createElement('div');
  div.textContent = string;
  return div.innerHTML;
}

/* ==========================================================================
   10. PROFESSION COMBAT PASSIVES & CAMPING MATRIX
   ========================================================================== */
function renderProfessionPassives() {
  const container = document.getElementById('professions-matrix-grid');
  if (!container || !WOW_FOREVER_DATA.professionPassives) return;

  container.innerHTML = WOW_FOREVER_DATA.professionPassives.map(prof => `
    <div class="profession-passive-card">
      <div class="profession-header">
        <div style="display: flex; align-items: center; gap: 0.6rem;">
          <span style="font-size: 1.6rem;">${prof.icon}</span>
          <div>
            <h4 style="color: #fff; font-size: 1.1rem; margin: 0;">${escapeHtml(prof.name)}</h4>
            <span style="font-size: 0.72rem; text-transform: uppercase; color: var(--text-gold); font-weight: 700;">${escapeHtml(prof.type)}</span>
          </div>
        </div>
        <span class="status-badge-highlight" style="font-size: 0.7rem;">Passive Combat Power</span>
      </div>
      <div style="margin: 0.75rem 0;">
        <strong style="color: #34d399; font-size: 0.88rem;">✨ ${escapeHtml(prof.passiveName)}</strong>
        <p style="font-size: 0.84rem; color: #cbd5e1; margin-top: 0.2rem; line-height: 1.4;">${escapeHtml(prof.passiveEffect)}</p>
      </div>
      <div style="background: rgba(0,0,0,0.3); border-radius: var(--radius-sm); padding: 0.5rem 0.75rem; border-left: 2px solid var(--border-gold);">
        <strong style="font-size: 0.78rem; color: var(--text-gold);">🔥 Camping Hub Synergy:</strong>
        <p style="font-size: 0.8rem; color: var(--text-muted); margin-top: 0.15rem;">${escapeHtml(prof.campBonus)}</p>
      </div>
    </div>
  `).join('');
}

/* ==========================================================================
   11. GAME EDITIONS & ACCESS MODEL
   ========================================================================== */
function renderGameEditions() {
  const container = document.getElementById('game-editions-container');
  if (!container || !WOW_FOREVER_DATA.gameEditions) return;

  const { standard, epicPack } = WOW_FOREVER_DATA.gameEditions;

  container.innerHTML = `
    <div class="edition-card standard">
      <div>
        <span class="edition-badge" style="background: rgba(16, 185, 129, 0.2); border: 1px solid #10b981; color: #6ee7b7;">${escapeHtml(standard.badge)}</span>
        <h3 style="color: #fff; font-size: 1.4rem; margin: 0.5rem 0 0.2rem;">${escapeHtml(standard.name)}</h3>
        <div style="font-size: 1.6rem; font-weight: 800; color: #34d399; font-family: var(--font-heading);">${escapeHtml(standard.cost)}</div>
        <p style="font-size: 0.84rem; color: var(--text-muted); margin-top: 0.35rem; line-height: 1.4;">${escapeHtml(standard.description)}</p>
        <ul class="edition-perks-list">
          ${standard.perks.map(p => `<li><span style="color: #10b981; font-weight: 700;">✓</span> <span>${escapeHtml(p)}</span></li>`).join('')}
        </ul>
      </div>
      <div style="margin-top: 1.5rem; padding-top: 0.75rem; border-top: 1px solid var(--border-subtle); font-size: 0.82rem; color: var(--text-muted);">
        Access through standard Battle.net Client with monthly active subscription.
      </div>
    </div>

    <div class="edition-card epic">
      <div>
        <span class="edition-badge" style="background: rgba(243, 192, 67, 0.2); border: 1px solid var(--border-gold); color: var(--text-gold);">${escapeHtml(epicPack.badge)}</span>
        <h3 style="color: #fff; font-size: 1.4rem; margin: 0.5rem 0 0.2rem;">${escapeHtml(epicPack.name)}</h3>
        <div style="font-size: 1.6rem; font-weight: 800; color: var(--text-gold); font-family: var(--font-heading);">${escapeHtml(epicPack.cost)}</div>
        <p style="font-size: 0.84rem; color: var(--text-muted); margin-top: 0.35rem; line-height: 1.4;">${escapeHtml(epicPack.description)}</p>
        <ul class="edition-perks-list">
          ${epicPack.perks.map(p => `<li><span style="color: var(--text-gold); font-weight: 700;">★</span> <span>${escapeHtml(p)}</span></li>`).join('')}
        </ul>
      </div>
      <div style="margin-top: 1.5rem; padding-top: 0.75rem; border-top: 1px solid var(--border-subtle); font-size: 0.82rem; color: var(--text-gold);">
        Includes instant Beta access & 3 invite passes for your squad.
      </div>
    </div>
  `;
}

/* ==========================================================================
   12. INTERACTIVE CLASS & ALLOWED RACES PLANNER
   ========================================================================== */
function initClassRacePlanner() {
  let currentMode = 'class'; // 'class' | 'race' | 'table'
  let selectedClassId = 'paladin'; // default to Paladin
  let selectedRaceId = 'skyborne'; // default to Skyborne
  let factionFilter = 'all'; // 'all' | 'alliance' | 'horde' | 'new'

  const chipsContainers = document.querySelectorAll('.planner-selector-chips');
  const heroContainers = document.querySelectorAll('.planner-hero-card');
  const resultsContainers = document.querySelectorAll('.planner-allowed-results');
  if (chipsContainers.length === 0 || heroContainers.length === 0 || resultsContainers.length === 0) return;

  // Mode buttons across all instances (both in Codex and in dedicated tab)
  const modeBtns = document.querySelectorAll('.planner-mode-btn');
  modeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const mode = btn.getAttribute('data-planner-mode');
      currentMode = mode;
      modeBtns.forEach(b => {
        b.classList.toggle('active', b.getAttribute('data-planner-mode') === mode);
      });
      renderPlannerView();
    });
  });

  // Faction filter buttons across all instances
  const filterBtns = document.querySelectorAll('.planner-filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-faction-filter');
      factionFilter = filter;
      filterBtns.forEach(b => {
        b.classList.toggle('active', b.getAttribute('data-faction-filter') === filter);
      });
      renderPlannerView();
    });
  });

  // Quick link button hook in header
  const quickLinkBtn = document.getElementById('quick-link-race-planner');
  if (quickLinkBtn) {
    quickLinkBtn.addEventListener('click', () => {
      const plannerTabBtn = document.querySelector('.nav-tab-btn[data-tab="planner"]');
      if (plannerTabBtn) {
        plannerTabBtn.click();
      } else {
        const codexTabBtn = document.querySelector('.nav-tab-btn[data-tab="codex"]');
        if (codexTabBtn) codexTabBtn.click();
        const matrixCodexBtn = document.querySelector('.codex-nav-btn[data-codex="matrix"]');
        if (matrixCodexBtn) matrixCodexBtn.click();
      }
      const target = document.getElementById('tab-planner') || document.getElementById('codex-matrix');
      if (target) {
        setTimeout(() => target.scrollIntoView({ behavior: 'smooth' }), 100);
      }
    });
  }

  function renderPlannerView() {
    if (currentMode === 'class') {
      renderClassMode();
    } else if (currentMode === 'race') {
      renderRaceMode();
    } else if (currentMode === 'table') {
      renderTableMode();
    }
  }

  function renderClassMode() {
    // 1. Selector chips
    const chipsHtml = WOW_FOREVER_DATA.allClassesData.map(cls => `
      <button class="selector-chip-btn ${cls.id === selectedClassId ? 'active' : ''}" data-class-id="${cls.id}" style="${cls.id === selectedClassId ? `border-color: ${cls.color}; box-shadow: 0 0 12px ${cls.color}40;` : ''}">
        <span>${cls.icon}</span>
        <span>${cls.name}</span>
      </button>
    `).join('');

    chipsContainers.forEach(c => {
      c.style.display = 'flex';
      c.innerHTML = chipsHtml;
      c.querySelectorAll('.selector-chip-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          selectedClassId = btn.getAttribute('data-class-id');
          renderClassMode();
        });
      });
    });

    // 2. Hero Card for selected class
    const cls = WOW_FOREVER_DATA.allClassesData.find(c => c.id === selectedClassId) || WOW_FOREVER_DATA.allClassesData[0];
    let heroHtml = `
      <div class="planner-hero-top">
        <div style="display: flex; align-items: center; gap: 0.8rem;">
          <span style="font-size: 2.2rem;">${cls.icon}</span>
          <div>
            <h2 style="color: ${cls.color}; font-size: 1.8rem; margin: 0;">${escapeHtml(cls.name)}</h2>
            <span style="font-size: 0.85rem; color: var(--text-gold); font-weight: 600;">${escapeHtml(cls.specs)}</span>
          </div>
        </div>
        <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
          <span class="role-pill">${escapeHtml(cls.role)}</span>
          <span class="status-badge-highlight" style="font-size: 0.75rem;">Armor: ${escapeHtml(cls.armor)}</span>
          <span class="status-badge-highlight" style="font-size: 0.75rem; background: rgba(56, 189, 248, 0.15); border-color: #38bdf8; color: #7dd3fc;">Resource: ${escapeHtml(cls.resource)}</span>
        </div>
      </div>
      <p style="font-size: 0.95rem; color: #cbd5e1; line-height: 1.5; margin: 0.5rem 0 0;">${escapeHtml(cls.description)}</p>
    `;

    if (cls.id === 'priest' && WOW_FOREVER_DATA.priestRacials) {
      const pData = WOW_FOREVER_DATA.priestRacials;
      heroHtml += `
        <div class="priest-racials-feature-box" style="margin-top: 1.2rem; padding: 1rem 1.2rem; background: rgba(56, 189, 248, 0.08); border: 1px solid rgba(56, 189, 248, 0.35); border-radius: var(--radius-sm);">
          <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 0.4rem;">
            <div style="display: flex; align-items: center; gap: 0.5rem;">
              <span style="font-size: 1.4rem;">✨</span>
              <strong style="color: #38bdf8; font-size: 1.05rem;">Priest Racials Overhaul: ${escapeHtml(pData.baseline.name)} is Baseline!</strong>
            </div>
            <span class="status-badge-highlight" style="font-size: 0.72rem;">All Races Get Fear Ward</span>
          </div>
          <p style="font-size: 0.85rem; color: #cbd5e1; margin: 0 0 0.8rem; line-height: 1.4;">${escapeHtml(pData.baseline.desc)} In addition, each eligible race receives 2 unique Priest spells:</p>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 0.75rem;">
            ${pData.races.map(r => `
              <div style="background: rgba(0,0,0,0.35); padding: 0.65rem 0.85rem; border-radius: 4px; border-left: 3px solid ${r.faction === 'Alliance' ? '#0078FF' : '#C41E3A'};">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.3rem;">
                  <strong style="color: #fff; font-size: 0.9rem;">${r.icon} ${escapeHtml(r.race)} Priest</strong>
                  <span style="font-size: 0.68rem; text-transform: uppercase; color: ${r.faction === 'Alliance' ? '#60a5fa' : '#f87171'}; font-weight: 700;">${escapeHtml(r.faction)}</span>
                </div>
                ${r.spells.map(s => `
                  <div style="font-size: 0.78rem; color: #cbd5e1; margin-top: 0.25rem;">
                    <strong style="color: var(--text-gold);">${escapeHtml(s.name)}</strong> <span style="color: var(--text-muted); font-size: 0.7rem;">(${escapeHtml(s.type)})</span>: ${escapeHtml(s.desc)}
                  </div>
                `).join('')}
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }

    heroContainers.forEach(h => {
      h.style.display = 'block';
      h.innerHTML = heroHtml;
    });

    // 3. Allowed Races Cards
    let races = cls.allowedRaces;
    if (factionFilter === 'alliance') {
      races = races.filter(r => r.faction.includes('Alliance') || r.faction.includes('Neutral'));
    } else if (factionFilter === 'horde') {
      races = races.filter(r => r.faction.includes('Horde') || r.faction.includes('Neutral'));
    } else if (factionFilter === 'new') {
      races = races.filter(r => r.isNew);
    }

    let resultsHtml = '';
    if (races.length === 0) {
      resultsHtml = `
        <div style="text-align: center; padding: 3rem; color: var(--text-muted);">
          <p style="font-size: 1.1rem;">No races match the active faction filter for ${cls.name}. Try selecting "All Combos".</p>
        </div>
      `;
    } else {
      resultsHtml = `
        <div class="allowed-cards-grid">
          ${races.map(raceEntry => {
            const raceData = WOW_FOREVER_DATA.allRacesData.find(r => r.id === raceEntry.id);
            if (!raceData) return '';

            return `
              <div class="allowed-entity-card ${raceEntry.isNew ? 'is-new-combo' : ''}">
                <div>
                  <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.5rem;">
                    <div style="display: flex; align-items: center; gap: 0.6rem;">
                      <span style="font-size: 1.8rem;">${raceData.icon}</span>
                      <div>
                        <h3 style="color: #fff; font-size: 1.3rem; margin: 0;">${escapeHtml(raceEntry.name || raceData.name)}</h3>
                        <span class="combo-badge ${(raceEntry.faction || raceData.faction).toLowerCase().includes('alliance') ? 'alliance' : ((raceEntry.faction || raceData.faction).toLowerCase().includes('horde') ? 'horde' : '')}" style="margin: 0.2rem 0 0; font-size: 0.7rem;">
                          ${raceData.crest} ${escapeHtml(raceEntry.faction || raceData.faction)}
                        </span>
                      </div>
                    </div>
                    ${raceEntry.isNew ? `
                      <span class="cell-new-badge">✦ NEW IN FOREVER</span>
                    ` : `
                      <span class="badge-classic-staple" style="font-size: 0.72rem;">Classic Staple</span>
                    `}
                  </div>

                  ${raceEntry.note ? `
                    <div style="background: rgba(16, 185, 129, 0.15); border: 1px solid #10b981; border-radius: var(--radius-sm); padding: 0.4rem 0.65rem; margin: 0.6rem 0; font-size: 0.8rem; color: #6ee7b7; font-weight: 600;">
                      ${escapeHtml(raceEntry.note)}
                    </div>
                  ` : ''}

                  <div style="font-size: 0.82rem; color: var(--text-gold); margin: 0.4rem 0 0.8rem;">
                    🐎 <strong>Racial Mount:</strong> ${escapeHtml(raceData.mount)}
                  </div>

                  <div style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 0.75rem;">
                    <strong>Racial Abilities (2 Active + 2 Passive):</strong>
                  </div>

                  <div class="racials-card-list">
                    ${raceData.racials.map(racial => `
                      <div class="racial-pill-item">
                        <div class="racial-pill-head">
                          <strong style="color: var(--color-sky); font-size: 0.88rem;">${escapeHtml(racial.name)}</strong>
                          <span style="font-size: 0.68rem; text-transform: uppercase; color: var(--text-muted); font-weight: 700;">${escapeHtml(racial.type)}</span>
                        </div>
                        <p style="font-size: 0.8rem; color: #cbd5e1; margin: 0; line-height: 1.35;">${escapeHtml(racial.effect)}</p>
                      </div>
                    `).join('')}
                  </div>
                </div>

                <div style="margin-top: 1rem; padding-top: 0.75rem; border-top: 1px solid var(--border-subtle); font-size: 0.82rem; color: var(--text-muted);">
                  Lore: ${escapeHtml(raceData.lore)}
                </div>
              </div>
            `;
          }).join('')}
        </div>
      `;
    }

    resultsContainers.forEach(r => {
      r.innerHTML = resultsHtml;
    });
  }

  function renderRaceMode() {
    let racesList = WOW_FOREVER_DATA.allRacesData;
    if (factionFilter === 'alliance') {
      racesList = racesList.filter(r => r.faction.includes('Alliance') || r.faction.includes('Neutral'));
    } else if (factionFilter === 'horde') {
      racesList = racesList.filter(r => r.faction.includes('Horde') || r.faction.includes('Neutral'));
    }

    const chipsHtml = racesList.map(r => `
      <button class="selector-chip-btn ${r.id === selectedRaceId ? 'active' : ''}" data-race-id="${r.id}">
        <span>${r.icon}</span>
        <span>${r.name}</span>
      </button>
    `).join('');

    chipsContainers.forEach(c => {
      c.style.display = 'flex';
      c.innerHTML = chipsHtml;
      c.querySelectorAll('.selector-chip-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          selectedRaceId = btn.getAttribute('data-race-id');
          renderRaceMode();
        });
      });
    });

    const race = WOW_FOREVER_DATA.allRacesData.find(r => r.id === selectedRaceId) || WOW_FOREVER_DATA.allRacesData[0];

    let heroHtml = `
      <div class="planner-hero-top">
        <div style="display: flex; align-items: center; gap: 0.8rem;">
          <span style="font-size: 2.2rem;">${race.icon}</span>
          <div>
            <h2 style="color: #fff; font-size: 1.8rem; margin: 0;">${escapeHtml(race.name)}</h2>
            <span class="combo-badge ${race.faction.toLowerCase().includes('alliance') ? 'alliance' : (race.faction.toLowerCase().includes('horde') ? 'horde' : '')}" style="font-size: 0.75rem;">
              ${race.crest} ${escapeHtml(race.faction)}
            </span>
          </div>
        </div>
        <div style="display: flex; gap: 0.6rem; align-items: center; flex-wrap: wrap;">
          <span style="color: var(--text-gold); font-size: 0.85rem;">🐎 Racial Mount: <strong>${escapeHtml(race.mount)}</strong></span>
        </div>
      </div>
      <p style="font-size: 0.95rem; color: #cbd5e1; line-height: 1.5; margin: 0.5rem 0 1rem;">${escapeHtml(race.lore)}</p>

      <h4 style="color: var(--text-gold); font-size: 0.95rem; margin-bottom: 0.5rem;">All 4 Racial Abilities (Standardized 2 Active + 2 Passive Rework):</h4>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 0.75rem;">
        ${race.racials.map(rcl => `
          <div style="background: rgba(0,0,0,0.4); border: 1px solid rgba(255,255,255,0.08); border-radius: var(--radius-sm); padding: 0.65rem 0.85rem;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.2rem;">
              <strong style="color: var(--color-sky); font-size: 0.88rem;">${escapeHtml(rcl.name)}</strong>
              <span style="font-size: 0.68rem; text-transform: uppercase; color: var(--text-muted); font-weight: 700;">${escapeHtml(rcl.type)}</span>
            </div>
            <p style="font-size: 0.8rem; color: #cbd5e1; margin: 0; line-height: 1.35;">${escapeHtml(rcl.effect)}</p>
          </div>
        `).join('')}
      </div>

      ${race.id === 'skyborne' ? `
        <div style="margin-top: 1rem; padding: 0.75rem 1rem; background: rgba(56, 189, 248, 0.08); border: 1px solid rgba(56, 189, 248, 0.25); border-radius: var(--radius-sm);">
          <strong style="color: #38bdf8; font-size: 0.88rem;">✦ Faction Racials Difference:</strong>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 0.6rem; margin-top: 0.4rem;">
            <div style="background: rgba(0, 120, 255, 0.1); border-left: 2px solid #0078FF; padding: 0.4rem 0.6rem; border-radius: 3px;">
              <strong style="color: #60a5fa; font-size: 0.8rem;">High Order (Alliance):</strong>
              <div style="font-size: 0.76rem; color: #e2e8f0; margin-top: 0.15rem;">Active: <strong>Read Ley Line</strong> (Arcane mana restore & intellect) + Walk on Air, Wind Blessed, Elemental Insight</div>
            </div>
            <div style="background: rgba(196, 30, 58, 0.1); border-left: 2px solid #C41E3A; padding: 0.4rem 0.6rem; border-radius: 3px;">
              <strong style="color: #f87171; font-size: 0.8rem;">Windshaper (Horde):</strong>
              <div style="font-size: 0.76rem; color: #e2e8f0; margin-top: 0.15rem;">Active: <strong>Skysight</strong> (+10% run speed boost) + Walk on Air, Wind Blessed, Elemental Insight</div>
            </div>
          </div>
        </div>
      ` : ''}
    `;

    heroContainers.forEach(h => {
      h.style.display = 'block';
      h.innerHTML = heroHtml;
    });

    // 3. Allowed Classes for this Race
    let classes = race.allowedClasses;
    if (factionFilter === 'alliance') {
      classes = classes.filter(c => !c.note || !c.note.includes('HORDE EXCLUSIVE'));
    } else if (factionFilter === 'horde') {
      classes = classes.filter(c => !c.note || !c.note.includes('ALLIANCE EXCLUSIVE'));
    }
    if (factionFilter === 'new') {
      classes = classes.filter(c => c.isNew);
    }

    const resultsHtml = `
      <div class="section-heading-bar" style="margin-top: 1rem;">
        <div>
          <h3 style="color: #fff; font-size: 1.25rem;">Allowed Classes for ${race.name} (${classes.length})</h3>
          <p class="section-subtext">Select a class below to explore specialization and role options:</p>
        </div>
      </div>

      <div class="allowed-cards-grid">
        ${classes.map(cEntry => {
          const classData = WOW_FOREVER_DATA.allClassesData.find(c => c.name.toLowerCase() === cEntry.name.toLowerCase());
          if (!classData) return '';

          return `
            <div class="allowed-entity-card ${cEntry.isNew ? 'is-new-combo' : ''}">
              <div>
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
                  <div style="display: flex; align-items: center; gap: 0.6rem;">
                    <span style="font-size: 1.8rem;">${classData.icon}</span>
                    <div>
                      <h4 style="color: ${classData.color}; font-size: 1.25rem; margin: 0;">${escapeHtml(classData.name)}</h4>
                      <span style="font-size: 0.78rem; color: var(--text-gold); font-weight: 600;">${escapeHtml(classData.specs)}</span>
                    </div>
                  </div>
                  ${cEntry.isNew ? `
                    <span class="cell-new-badge">✦ NEW IN FOREVER</span>
                  ` : `
                    <span class="badge-classic-staple">Classic</span>
                  `}
                </div>

                ${cEntry.note ? `
                  <div style="background: rgba(16, 185, 129, 0.15); border: 1px solid #10b981; border-radius: var(--radius-sm); padding: 0.4rem 0.65rem; margin: 0.6rem 0; font-size: 0.8rem; color: #6ee7b7; font-weight: 600;">
                    ${escapeHtml(cEntry.note)}
                  </div>
                ` : ''}

                <div style="display: flex; gap: 0.4rem; margin: 0.6rem 0; flex-wrap: wrap;">
                  <span class="role-pill">${escapeHtml(classData.role)}</span>
                  <span class="status-badge-highlight" style="font-size: 0.72rem;">${escapeHtml(classData.armor)}</span>
                </div>

                <p style="font-size: 0.85rem; color: #cbd5e1; line-height: 1.4; margin-top: 0.5rem;">${escapeHtml(classData.description)}</p>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    `;

    resultsContainers.forEach(r => {
      r.innerHTML = resultsHtml;
    });
  }

  function renderTableMode() {
    chipsContainers.forEach(c => c.style.display = 'none');
    heroContainers.forEach(h => h.style.display = 'none');

    let races = WOW_FOREVER_DATA.allRacesData;
    if (factionFilter === 'alliance') {
      races = races.filter(r => r.faction.includes('Alliance') || r.faction.includes('Neutral'));
    } else if (factionFilter === 'horde') {
      races = races.filter(r => r.faction.includes('Horde') || r.faction.includes('Neutral'));
    }

    const classes = WOW_FOREVER_DATA.allClassesData;

    const tableHtml = `
      <div class="matrix-table-wrap">
        <table class="matrix-table">
          <thead>
            <tr>
              <th style="text-align: left; padding-left: 1rem;">Race / Class</th>
              ${classes.map(c => `
                <th>
                  <div>${c.icon}</div>
                  <div style="color: ${c.color}; font-size: 0.82rem;">${c.name}</div>
                </th>
              `).join('')}
            </tr>
          </thead>
          <tbody>
            ${races.map(race => `
              <tr>
                <td class="matrix-race-cell" style="padding-left: 1rem;">
                  <span>${race.icon}</span>
                  <div>
                    <div>${escapeHtml(race.name)}</div>
                    <span style="font-size: 0.68rem; color: var(--text-muted); font-weight: 400;">${race.faction}</span>
                  </div>
                </td>
                ${classes.map(cls => {
                  const match = race.allowedClasses.find(ac => ac.name.toLowerCase() === cls.name.toLowerCase());
                  if (match) {
                    if (match.isNew) {
                      if (match.note && match.note.includes('ALLIANCE EXCLUSIVE')) {
                        if (factionFilter === 'horde') return `<td><span class="cell-empty">—</span></td>`;
                        return `<td><span class="cell-new-badge" style="background: rgba(59, 130, 246, 0.25); border-color: #3b82f6; color: #93c5fd;" title="${escapeHtml(match.note)}">✦ ALLIANCE</span></td>`;
                      }
                      if (match.note && match.note.includes('HORDE EXCLUSIVE')) {
                        if (factionFilter === 'alliance') return `<td><span class="cell-empty">—</span></td>`;
                        return `<td><span class="cell-new-badge" style="background: rgba(239, 68, 68, 0.25); border-color: #ef4444; color: #fca5a5;" title="${escapeHtml(match.note)}">✦ HORDE</span></td>`;
                      }
                      return `<td><span class="cell-new-badge" title="${escapeHtml(match.note || 'New in Forever')}">✦ NEW</span></td>`;
                    } else {
                      if (factionFilter === 'new') {
                        return `<td><span class="cell-empty">—</span></td>`;
                      }
                      return `<td><span class="cell-classic-badge" title="Classic Combination">✓</span></td>`;
                    }
                  } else {
                    return `<td><span class="cell-empty">—</span></td>`;
                  }
                }).join('')}
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
      <div style="display: flex; gap: 1.5rem; justify-content: center; font-size: 0.85rem; color: var(--text-muted); margin-bottom: 2rem; flex-wrap: wrap;">
        <span><span class="cell-new-badge">✦ NEW</span> = New in WoW Forever (Classic+)</span>
        <span><span class="cell-classic-badge">✓</span> = Standard Classic Combination</span>
        <span><span class="cell-empty">—</span> = Class Unavailable for this Race</span>
      </div>
    `;

    resultsContainers.forEach(r => {
      r.innerHTML = tableHtml;
    });
  }

  // Initial render
  renderPlannerView();
}
