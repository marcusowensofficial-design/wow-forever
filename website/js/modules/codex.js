/**
 * World of Warcraft: Forever - Content Codex & Legacy Calculator Module
 * Handles Codex Sub-Panels, Dungeons Explorer, Interactive Level Timeline Slider,
 * Boss Encounters & Loot Atlas Modal, Zones, and Legacy Calculator.
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
      if (panelId === 'matrix') {
        const plannerBtn = document.querySelector('.nav-tab-btn[data-tab="planner"]');
        if (plannerBtn) {
          plannerBtn.click();
          return;
        }
      }
      if (panelId === 'database') {
        const dbBtn = document.querySelector('.nav-tab-btn[data-tab="database"]');
        if (dbBtn) {
          dbBtn.click();
          return;
        }
      }
      if (panelId === 'sets') {
        if (window.initCodexSets) window.initCodexSets();
      }
      if (panelId === 'events') {
        if (window.initCodexEvents) window.initCodexEvents();
      }
      if (panelId === 'reputation') {
        if (window.initCodexReputation) window.initCodexReputation();
      }
      if (panelId === 'books') {
        if (window.initLibraryBooks) window.initLibraryBooks();
      }
      if (panelId === 'mechanics') {
        if (window.initClassMechanics) window.initClassMechanics();
      }
      if (panelId === 'mounts') {
        if (window.initCollectionsExplorer) window.initCollectionsExplorer();
      }
      if (panelId === 'pets') {
        if (window.initHunterPets) window.initHunterPets('hunter-pets-mount');
      }
      codexNavBtns.forEach(b => b.classList.remove('active'));
      codexPanels.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      const targetPanel = document.getElementById(`codex-${panelId}`);
      if (targetPanel) targetPanel.classList.add('active');
    });
  });

  function checkCodexHash() {
    const hash = (window.location.hash || '').toLowerCase();
    if (hash.startsWith('#codex')) {
      const rawSub = hash.split('/')[1]?.split('#')[0];
      const sub = (rawSub || '').replace(/[^a-z0-9_-]/g, '');
      if (sub === 'matrix') {
        const plannerBtn = document.querySelector('.nav-tab-btn[data-tab="planner"]');
        if (plannerBtn) {
          plannerBtn.click();
          return;
        }
      }
      if (sub === 'database') {
        const dbBtn = document.querySelector('.nav-tab-btn[data-tab="database"]');
        if (dbBtn) {
          dbBtn.click();
          return;
        }
      }
      if (sub) {
        const btn = document.querySelector(`.codex-nav-btn[data-codex="${sub}"]`);
        if (btn) btn.click();
      }
    }
  }

  checkCodexHash();
  window.addEventListener('hashchange', checkCodexHash);

  renderClassCombos();
  renderDungeons(WOW_FOREVER_DATA.dungeonsAndRaids);
  renderDungeonTimelineSlider();
  if (typeof window.setupDungeonModalEvents === 'function') window.setupDungeonModalEvents();

  const dungeonFilters = document.querySelectorAll('.dungeon-filter-btn');
  dungeonFilters.forEach(btn => {
    btn.addEventListener('click', () => {
      dungeonFilters.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-dungeon-filter');
      let filtered = WOW_FOREVER_DATA.dungeonsAndRaids;

      if (filter === 'beta1') {
        filtered = filtered.filter(d => d.type.includes('Dungeon') && parseInt(d.levelRange, 10) < 35);
      } else if (filter === 'phase2' || filter === 'endgame') {
        filtered = filtered.filter(d => d.type.includes('Dungeon') && parseInt(d.levelRange, 10) >= 35);
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
  renderMerchantsFavorPanel();
  if (typeof window.renderCodexItemDatabase === 'function') {
    window.renderCodexItemDatabase();
  }
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
    <div class="dungeon-card ${d.playableNow ? 'active-beta' : ''} ${d.type.includes('Raid') ? 'is-raid' : ''}"
         onclick="openDungeonLootModal('${d.id}')">
      <div>
        <div class="dungeon-card-header">
          <span class="dungeon-level-badge">${d.levelRange}</span>
          ${d.playableNow ? '<span class="status-pulse-badge" style="font-size: 0.7rem;"><span class="pulse-dot"></span> Live Now</span>' : (d.type.includes('Raid') ? '<span class="status-pulse-badge" style="font-size: 0.7rem;"><span class="pulse-dot"></span> Opens Dec 9</span>' : '')}
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
        <div style="margin-top: 0.8rem; text-align: right;">
          <span class="dg-inspect-btn">Inspect Boss Loot Tables ➔</span>
        </div>
      </div>
    </div>
  `).join('');
}

/**
 * Interactive Dungeons Timeline Slider (13-60)
 */
function renderDungeonTimelineSlider() {
  const container = document.getElementById('dungeon-timeline-slider-container');
  if (!container) return;

  const entries = WOW_FOREVER_DATA.fullDungeonProgressionCurve.map(d => {
    const [min, max] = d.level.split('–').map(n => parseInt(n, 10));
    return { ...d, min, max };
  });
  const newForeverDungeons = entries.filter(d => d.isNew);
  const classicDungeons = entries.filter(d => !d.isNew);

  let currentLevel = 30;

  const renderTimeline = (lvl) => {
    container.innerHTML = `
      <div class="timeline-control-bar">
        <div class="timeline-slider-label">
          <span>Filter by Player Level:</span>
          <strong class="timeline-level-val">Level ${lvl}</strong>
        </div>
        <input type="range" min="13" max="60" value="${lvl}" class="timeline-slider-input" id="dg-timeline-range" name="dg-timeline-range" aria-label="Filter dungeons by player level" />
      </div>

      <!-- LANE 1: NEW IN FOREVER -->
      <div class="timeline-lane-block">
        <h4 class="timeline-lane-title">
          <span class="badge-forever-new">✦ ${newForeverDungeons.length} New in Forever</span>
          <small>Original dungeons built for Classic+</small>
        </h4>
        <div class="timeline-bars-track">
          ${newForeverDungeons.map(d => {
            const inRange = lvl >= d.min && lvl <= d.max;
            const leftPct = ((d.min - 13) / (60 - 13)) * 100;
            const widthPct = Math.max(8, ((d.max - d.min) / (60 - 13)) * 100);

            return `
              <div class="timeline-bar-pill new-forever ${inRange ? 'is-active-range' : ''}"
                   style="left: ${leftPct}%; width: ${widthPct}%;"
                   data-min="${d.min}" data-max="${d.max}" title="${d.name} (${d.min}–${d.max}) • ${d.zone}"
                   onclick="openDungeonLootModal('${d.id}')">
                <span class="timeline-bar-text">${d.name} (${d.min}–${d.max})</span>
              </div>
            `;
          }).join('')}
        </div>
      </div>

      <!-- LANE 2: FROM CLASSIC -->
      <div class="timeline-lane-block">
        <h4 class="timeline-lane-title">
          <span class="badge-classic-staple">Classic Staples (${classicDungeons.length})</span>
          <small>Preserved and retuned for Classic+</small>
        </h4>
        <div class="timeline-bars-track classic-track">
          ${classicDungeons.map(d => {
            const inRange = lvl >= d.min && lvl <= d.max;
            const leftPct = ((d.min - 13) / (60 - 13)) * 100;
            const widthPct = Math.max(6, ((d.max - d.min) / (60 - 13)) * 100);

            return `
              <div class="timeline-bar-pill classic ${inRange ? 'is-active-range' : ''}"
                   style="left: ${leftPct}%; width: ${widthPct}%;"
                   data-min="${d.min}" data-max="${d.max}" title="${d.name} (${d.min}–${d.max}) • ${d.zone}"
                   onclick="openDungeonLootModal('${d.id}')">
                <span class="timeline-bar-text">${d.name} (${d.min}–${d.max})</span>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;

    const slider = document.getElementById('dg-timeline-range');
    if (slider) {
      slider.addEventListener('input', (e) => {
        currentLevel = parseInt(e.target.value, 10);
        // Update in place: rebuilding would replace the slider while it is being dragged.
        container.querySelector('.timeline-level-val').textContent = `Level ${currentLevel}`;
        container.querySelectorAll('.timeline-bar-pill').forEach(bar => {
          bar.classList.toggle('is-active-range', currentLevel >= Number(bar.dataset.min) && currentLevel <= Number(bar.dataset.max));
        });
      });
    }
  };

  renderTimeline(currentLevel);
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
    </div>
    <div class="spec-card recommended">
      <h4 style="color: #38bdf8; font-size: 1.1rem; margin-bottom: 0.8rem;">Recommended Specifications</h4>
      <div class="spec-row"><span>OS:</span> <strong>${rec.os}</strong></div>
      <div class="spec-row"><span>Processor:</span> <strong>${rec.cpu}</strong></div>
      <div class="spec-row"><span>Memory:</span> <strong>${rec.ram}</strong></div>
      <div class="spec-row"><span>Graphics:</span> <strong>${rec.gpu}</strong></div>
      <div class="spec-row"><span>Storage:</span> <strong style="color: #10b981;">${rec.storage}</strong></div>
    </div>
  `;
}



/* ==========================================================================
   MERCHANT'S FAVOR CURRENCY & SUPPLY CRATES PANEL
   ========================================================================== */
function formatFavorCoin(silverFloat) {
  const totalCopper = Math.round((Number(silverFloat) || 0) * 100);
  const gold = Math.floor(totalCopper / 10000);
  const silver = Math.floor((totalCopper % 10000) / 100);
  const copper = String(totalCopper % 100).padStart(2, '0');
  return gold > 0 ? `${gold}g ${silver}s ${copper}c` : `${silver}s ${copper}c`;
}

function renderMerchantsFavorPanel() {
  const container = document.getElementById('codex-commerce-container');
  if (!container) return;

  const mfData = (typeof window !== 'undefined' && window.WOW_ATLAS_DATA && window.WOW_ATLAS_DATA.merchantsFavor) || null;
  const camps = (mfData && mfData.camps) || {};
  const allianceCamp = camps.alliance || {
    name: 'Azeroth Commerce Authority',
    location: 'Three Corners, Redridge Mountains',
    coords: '10.5, 72.7 (Meeting of Elwynn, Duskwood & Lakeshire roads)',
    quartermaster: 'Marcy Baker (9.5, 71.1)'
  };
  const hordeCamp = camps.horde || {
    name: 'Durotar Supply and Logistics',
    location: 'West of Crossroads, The Barrens',
    coords: '49.7, 29.4 (On the road to Stonetalon Mountains)',
    quartermaster: 'Dokimi (50.0, 29.2)'
  };
  const vendors = (mfData && mfData.vendors) || [];
  const crateTiers = (mfData && mfData.crateTiers) || [];
  const priorities = (mfData && mfData.priorityPurchases) || [];
  const writs = (mfData && mfData.writsGuide) || {};

  container.innerHTML = `
    <div class="merchants-favor-panel-wrapper">
      <div class="section-heading-bar" style="margin-bottom: 1.5rem;">
        <div>
          <h3><span>🪙</span> Merchant's Favor Currency &amp; Supply Crates Ledger</h3>
          <p class="section-subtext">The complete guide to the Azeroth Commerce Authority, Durotar Supply and Logistics, Waylaid Crates, and 317 exclusive recipes</p>
        </div>
      </div>

      <!-- Trade Camps Quick Overview -->
      <div class="mf-camps-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 1rem; margin-bottom: 1.5rem;">
        <!-- Alliance Camp -->
        <div class="mf-camp-card" style="background: rgba(30, 58, 138, 0.15); border: 1px solid #3b82f6; border-radius: var(--radius-md); padding: 1.25rem;">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.5rem;">
            <div style="display: flex; align-items: center; gap: 0.5rem;">
              <span style="font-size: 1.5rem;">🦁</span>
              <strong style="color: #93c5fd; font-size: 1.1rem;">${escapeHtml(allianceCamp.name)}</strong>
            </div>
            <span class="deepdive-badge badge-exclusive" style="font-size: 0.72rem;">Alliance Camp</span>
          </div>
          <div style="font-size: 0.85rem; color: #cbd5e1; line-height: 1.5;">
            <div><strong>Location:</strong> ${escapeHtml(allianceCamp.location)}</div>
            <div><strong>Coordinates:</strong> ${escapeHtml(allianceCamp.coords)}</div>
            <div><strong>Turn-in Officer:</strong> ${escapeHtml(allianceCamp.quartermaster)}</div>
            <div style="color: #f87171; margin-top: 0.25rem; font-size: 0.78rem;">⚠️ Contested Territory: Watch for Horde on PvP realms.</div>
          </div>
        </div>

        <!-- Horde Camp -->
        <div class="mf-camp-card" style="background: rgba(153, 27, 27, 0.15); border: 1px solid #ef4444; border-radius: var(--radius-md); padding: 1.25rem;">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.5rem;">
            <div style="display: flex; align-items: center; gap: 0.5rem;">
              <span style="font-size: 1.5rem;">🦅</span>
              <strong style="color: #fca5a5; font-size: 1.1rem;">${escapeHtml(hordeCamp.name)}</strong>
            </div>
            <span class="deepdive-badge badge-demo" style="font-size: 0.72rem;">Horde Camp</span>
          </div>
          <div style="font-size: 0.85rem; color: #cbd5e1; line-height: 1.5;">
            <div><strong>Location:</strong> ${escapeHtml(hordeCamp.location)}</div>
            <div><strong>Coordinates:</strong> ${escapeHtml(hordeCamp.coords)}</div>
            <div><strong>Turn-in Officer:</strong> ${escapeHtml(hordeCamp.quartermaster)}</div>
            <div style="color: #34d399; margin-top: 0.25rem; font-size: 0.78rem;">🛡️ Safe Horde Territory: Protected by Crossroads guards.</div>
          </div>
        </div>
      </div>

      <!-- Shipping Label First Turn-in Banner -->
      <div class="mf-shipping-banner" style="background: rgba(202, 138, 4, 0.12); border: 1px solid var(--border-gold); border-radius: var(--radius-sm); padding: 0.85rem 1.25rem; display: flex; align-items: center; gap: 1rem; margin-bottom: 1.5rem;">
        <span style="font-size: 2rem;">🏷️</span>
        <div>
          <strong style="color: #fef08a; font-size: 0.95rem;">First Turn-In Discovery: Shipping Label (+50 Bonus Favor)</strong>
          <p style="font-size: 0.82rem; color: #cbd5e1; margin: 0.2rem 0 0;">
            Filling your very first Waylaid Crate awards a <strong>Shipping Label</strong>. This starts a one-time quest leading to your faction's trade camp, granting an instant <strong>50 Merchant's Favor</strong> boost!
          </p>
        </div>
      </div>

      <!-- Crates Turn-in Ledger & Interactive Calculator -->
      <div class="mf-crates-section" style="background: rgba(15, 23, 42, 0.6); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 1.25rem; margin-bottom: 1.5rem;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; flex-wrap: wrap; gap: 0.5rem;">
          <div>
            <h4 style="color: #fff; font-size: 1.1rem; margin: 0;">📦 Waylaid Supply Crates Ledger</h4>
            <span style="font-size: 0.8rem; color: #94a3b8;">White crates take raw gathered materials; Green crates take crafted goods and pay double Favor!</span>
          </div>
        </div>

        <div class="table-responsive-wrapper" style="overflow-x: auto;">
          <table class="pvp-ranks-table" style="width: 100%; border-collapse: collapse;">
            <thead>
              <tr style="border-bottom: 2px solid var(--border-subtle); text-align: left; font-size: 0.8rem; color: var(--text-gold);">
                <th style="padding: 0.6rem;">Crate Tier &amp; Quality</th>
                <th style="padding: 0.6rem;">Req. Level</th>
                <th style="padding: 0.6rem;">Merchant's Favor</th>
                <th style="padding: 0.6rem;">Money Reward</th>
                <th style="padding: 0.6rem;">Accepted Materials (Choose One)</th>
              </tr>
            </thead>
            <tbody>
              ${crateTiers.map(c => `
                <tr style="border-bottom: 1px solid rgba(255,255,255,0.05); font-size: 0.83rem;">
                  <td style="padding: 0.65rem;">
                    <strong style="color: ${c.tier.includes('Green') ? '#4ade80' : '#f8fafc'};">${escapeHtml(c.tier)}</strong>
                  </td>
                  <td style="padding: 0.65rem; color: #cbd5e1;">Level ${c.levelReq}+</td>
                  <td style="padding: 0.65rem;">
                    <span style="background: rgba(245, 158, 11, 0.2); color: #fcd34d; padding: 0.15rem 0.45rem; border-radius: 4px; font-weight: 700;">
                      🪙 ${c.favor} Favor
                    </span>
                  </td>
                  <td style="padding: 0.65rem; color: #cbd5e1;">💰 ${escapeHtml(c.money)}</td>
                  <td style="padding: 0.65rem; color: #94a3b8; font-size: 0.8rem;">${escapeHtml(c.materials)}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>

        <!-- Interactive Crate Favor Calculator -->
        <div class="mf-calculator-bar" style="margin-top: 1.25rem; background: rgba(0,0,0,0.3); border-radius: 6px; padding: 1rem; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1rem;">
          <div style="display: flex; align-items: center; gap: 0.75rem; flex-wrap: wrap;">
            <label style="font-size: 0.85rem; color: #fff; font-weight: 600;">Crate Calculator:</label>
            <select id="mf-calc-tier" aria-label="Select Favor crate tier" style="background: #1e293b; color: #fff; border: 1px solid var(--border-subtle); padding: 0.4rem 0.6rem; border-radius: 4px; font-size: 0.85rem;">
              <option value="5" data-money="2.5">Apprentice White (5 Favor / 2s 50c)</option>
              <option value="10" data-money="5">Apprentice Green (10 Favor / 5s 00c)</option>
              <option value="10" data-money="5">Journeyman White (10 Favor / 5s 00c)</option>
              <option value="20" data-money="10" selected>Journeyman Green (20 Favor / 10s 00c)</option>
            </select>
            <div style="display: flex; align-items: center; gap: 0.4rem;">
              <span style="font-size: 0.85rem; color: #cbd5e1;">Count:</span>
              <input type="number" id="mf-calc-qty" aria-label="Favor crate quantity" min="1" max="100" value="5" style="width: 60px; background: #1e293b; color: #fff; border: 1px solid var(--border-subtle); padding: 0.4rem; border-radius: 4px; text-align: center; font-size: 0.85rem;">
            </div>
          </div>
          <div style="display: flex; align-items: center; gap: 1rem;">
            <div style="text-align: right;">
              <span style="font-size: 0.75rem; color: #94a3b8; display: block;">Total Earned:</span>
              <strong id="mf-calc-result" style="color: #fcd34d; font-size: 1.1rem;">100 Favor • 50s 00c</strong>
            </div>
          </div>
        </div>
      </div>

      <!-- Craftsman's Writs & Priority Purchases Dual Column -->
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 1.25rem; margin-bottom: 1.5rem;">
        
        <!-- Craftsman's Writs -->
        <div style="background: rgba(15, 23, 42, 0.6); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 1.25rem;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
            <h4 style="color: #fff; font-size: 1.05rem; margin: 0; display: flex; align-items: center; gap: 0.4rem;">
              <span>📜</span> 150 Craftsman's Writs (Reputation)
            </h4>
            <span class="deepdive-badge badge-verified" style="font-size: 0.72rem;">Daily Orders</span>
          </div>
          <p style="font-size: 0.82rem; color: #cbd5e1; margin-bottom: 0.75rem; line-height: 1.4;">
            Monsters drop sealed envelopes (<strong>Sealed Craftsman's Writ</strong>). Right-click to accept a crafting commission. Deliver the item to the client for Camp Reputation and a <strong>Coin Pouch (5s to about 74s, by tier)</strong>.
          </p>
          <div style="display: flex; flex-direction: column; gap: 0.5rem;">
            ${(writs.tiers || []).map(t => `
              <div style="background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.06); border-radius: 4px; padding: 0.5rem 0.75rem; display: flex; justify-content: space-between; align-items: center;">
                <div>
                  <strong style="color: #e2e8f0; font-size: 0.85rem;">${escapeHtml(t.level)} Writs (${t.count} total)</strong>
                  <span style="font-size: 0.75rem; color: #94a3b8; display: block;">Skill ${escapeHtml(t.skillReq)}</span>
                </div>
                <span style="background: rgba(59, 130, 246, 0.2); color: #93c5fd; padding: 0.2rem 0.5rem; border-radius: 4px; font-weight: 700; font-size: 0.78rem;">
                  +${t.rep} Rep
                </span>
              </div>
            `).join('')}
          </div>
          <div style="margin-top: 0.75rem; padding: 0.5rem; background: rgba(202, 138, 4, 0.08); border-left: 2px solid var(--border-gold); font-size: 0.78rem; color: #cbd5e1;">
            💡 <strong>Forger's Quill:</strong> Uncertified Scribe (south of Three Corners) sells a quill to reroll any writ you cannot craft!
          </div>
        </div>

        <!-- High Priority Vendor Purchases -->
        <div style="background: rgba(15, 23, 42, 0.6); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 1.25rem;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
            <h4 style="color: #fff; font-size: 1.05rem; margin: 0; display: flex; align-items: center; gap: 0.4rem;">
              <span>⭐</span> High-Priority Vendor Purchases
            </h4>
            <span class="deepdive-badge badge-exclusive" style="font-size: 0.72rem;">Best Value</span>
          </div>
          <div style="display: flex; flex-direction: column; gap: 0.6rem;">
            ${priorities.map(p => `
              <div style="background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.06); border-radius: 6px; padding: 0.6rem 0.75rem;">
                <div style="display: flex; justify-content: space-between; align-items: baseline;">
                  <strong style="color: #f5d061; font-size: 0.86rem;">${escapeHtml(p.item)}</strong>
                  <span style="color: #fcd34d; font-size: 0.78rem; font-weight: 700;">${escapeHtml(p.cost)}</span>
                </div>
                <div style="font-size: 0.74rem; color: #38bdf8; margin: 0.15rem 0;">${escapeHtml(p.profs)}</div>
                <p style="font-size: 0.78rem; color: #cbd5e1; margin: 0.2rem 0 0; line-height: 1.35;">${escapeHtml(p.note)}</p>
              </div>
            `).join('')}
          </div>
        </div>

      </div>

      ${vendors.length > 0 ? `
        <!-- Camp Vendor Directory -->
        <div style="background: rgba(15, 23, 42, 0.6); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 1.25rem;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem; flex-wrap: wrap; gap: 0.5rem;">
            <h4 style="color: #fff; font-size: 1.05rem; margin: 0;">🧭 Camp Specialist Vendors &amp; Coordinates (${vendors.length} NPCs)</h4>
            <span style="font-size: 0.78rem; color: #94a3b8;">Redridge Three Corners (Alliance) • Crossroads West (Horde)</span>
          </div>
          <div class="table-responsive-wrapper" style="overflow-x: auto;">
            <table class="pvp-ranks-table" style="width: 100%; border-collapse: collapse;">
              <thead>
                <tr style="border-bottom: 2px solid var(--border-subtle); text-align: left; font-size: 0.8rem; color: var(--text-gold);">
                  <th style="padding: 0.55rem;">Specialist Role</th>
                  <th style="padding: 0.55rem;">🦁 Alliance Vendor (Redridge)</th>
                  <th style="padding: 0.55rem;">🦅 Horde Vendor (The Barrens)</th>
                </tr>
              </thead>
              <tbody>
                ${vendors.map(v => `
                  <tr style="border-bottom: 1px solid rgba(255,255,255,0.05); font-size: 0.82rem;">
                    <td style="padding: 0.55rem; color: #f8fafc; font-weight: 600;">${escapeHtml(v.role)}</td>
                    <td style="padding: 0.55rem; color: #93c5fd;">${escapeHtml(v.alliance)}</td>
                    <td style="padding: 0.55rem; color: #fca5a5;">${escapeHtml(v.horde)}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      ` : ''}
    </div>
  `;

  // Attach calculator event listeners
  const selTier = container.querySelector('#mf-calc-tier');
  const inpQty = container.querySelector('#mf-calc-qty');
  const resDisplay = container.querySelector('#mf-calc-result');

  function updateCalc() {
    if (!selTier || !inpQty || !resDisplay) return;
    const favorPer = parseInt(selTier.value, 10) || 0;
    const moneyPer = parseFloat(selTier.options[selTier.selectedIndex].getAttribute('data-money') || '0');
    const qty = Math.max(1, parseInt(inpQty.value, 10) || 1);
    const totalFavor = favorPer * qty;
    resDisplay.textContent = `${totalFavor} Favor • ${formatFavorCoin(moneyPer * qty)}`;
  }

  if (selTier) selTier.addEventListener('change', updateCalc);
  if (inpQty) inpQty.addEventListener('input', updateCalc);
}
