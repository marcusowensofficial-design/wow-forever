/**
 * World of Warcraft: Forever - Content Codex & Legacy Calculator Module
 * Handles Codex Sub-Panels, Dungeons Explorer, Zones, Level Curve, and Legacy Calculator.
 */

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

