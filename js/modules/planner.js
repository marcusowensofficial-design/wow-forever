/**
 * World of Warcraft: Forever - Interactive Class & Allowed Races Planner
 * Handles Class Mode, Race Mode, Full Allowed Matrix Table, and Faction Filtering.
 */

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

    // Stat Conversion Highlights for selected class
    if (WOW_FOREVER_DATA.classStatConversions && WOW_FOREVER_DATA.classStatConversions[cls.id]) {
      const sc = WOW_FOREVER_DATA.classStatConversions[cls.id];
      heroHtml += `
        <div class="class-stat-mini-bar" style="margin-top: 1rem; padding: 0.85rem 1.1rem; background: rgba(0,0,0,0.35); border: 1px solid rgba(255,255,255,0.08); border-left: 3px solid ${cls.color}; border-radius: var(--radius-sm); display: flex; flex-direction: column; gap: 0.5rem;">
          <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.5rem;">
            <div style="display: flex; align-items: center; gap: 0.4rem;">
              <span style="font-size: 1rem;">📊</span>
              <strong style="color: #fff; font-size: 0.88rem; text-transform: uppercase; letter-spacing: 0.05em;">${escapeHtml(cls.name)} Stat Scaling Formulas:</strong>
            </div>
            <button type="button" class="btn-goto-stat-guide" style="background: none; border: none; color: var(--text-gold); font-size: 0.78rem; cursor: pointer; text-decoration: underline; padding: 0;">
              View Full Stats & Attributes Guide →
            </button>
          </div>
          <div style="display: flex; gap: 0.4rem; flex-wrap: wrap;">
            ${sc.highlights.map(h => `
              <span class="status-badge-highlight" style="font-size: 0.72rem; background: rgba(255,255,255,0.05); border-color: rgba(255,255,255,0.12); color: #cbd5e1;">
                ✦ ${escapeHtml(h)}
              </span>
            `).join('')}
          </div>
        </div>
      `;
    }

    // Deep Dive CTA banner if available
    const deepDiveData = WOW_FOREVER_DATA.classDeepDives && WOW_FOREVER_DATA.classDeepDives[cls.id];
    if (deepDiveData && deepDiveData.hasData) {
      heroHtml += `
        <div class="planner-deepdive-cta" style="margin-top: 1.2rem; padding: 1rem 1.25rem; background: linear-gradient(135deg, ${cls.color}15, rgba(16, 185, 129, 0.08)); border: 1px solid ${cls.color}50; border-radius: var(--radius-sm); display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1rem;">
          <div style="flex: 1; min-width: 260px;">
            <div style="display: flex; align-items: center; gap: 0.6rem;">
              <span style="font-size: 1.3rem;">${cls.icon}</span>
              <strong style="color: ${cls.color}; font-size: 1.02rem;">Sodapoppin BlizzCon Hands-On Deep Dive Available!</strong>
              <span class="deepdive-badge badge-verified" style="font-size: 0.7rem;">Verified Beta Intel</span>
            </div>
            <p style="font-size: 0.86rem; color: #cbd5e1; margin: 0.3rem 0 0; line-height: 1.4;">
              ${escapeHtml(deepDiveData.summary || `Complete forensic breakdown on ${cls.name} talent trees, ability updates, and racials testing.`)}
            </p>
          </div>
          <button type="button" class="btn-primary jump-to-deepdive-btn" data-class-id="${cls.id}" style="padding: 0.5rem 1rem; font-size: 0.85rem; background: linear-gradient(135deg, ${cls.color}cc, ${cls.color}88); border: none; cursor: pointer; display: flex; align-items: center; gap: 0.4rem; color: #fff; text-shadow: 0 1px 2px rgba(0,0,0,0.8);">
            <span>${cls.icon}</span> View ${escapeHtml(cls.name)} Deep Dive →
          </button>
        </div>
      `;
    }

    heroContainers.forEach(h => {
      h.style.display = 'block';
      h.innerHTML = heroHtml;
      h.querySelectorAll('.btn-goto-stat-guide').forEach(btn => {
        btn.addEventListener('click', () => {
          const codexTabBtn = document.querySelector('.nav-tab-btn[data-tab="codex"]');
          if (codexTabBtn) codexTabBtn.click();
          const statsCodexBtn = document.querySelector('.codex-nav-btn[data-codex="stats"]');
          if (statsCodexBtn) statsCodexBtn.click();
          const target = document.getElementById('codex-stats');
          if (target) {
            setTimeout(() => target.scrollIntoView({ behavior: 'smooth' }), 100);
          }
        });
      });
      h.querySelectorAll('.jump-to-deepdive-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const classId = btn.getAttribute('data-class-id');
          const deepDiveTabBtn = document.querySelector('.nav-tab-btn[data-tab="deepdives"]');
          if (deepDiveTabBtn) deepDiveTabBtn.click();
          if (typeof window.switchDeepDiveClass === 'function') {
            window.switchDeepDiveClass(classId);
          }
          const target = document.getElementById('tab-deepdives');
          if (target) {
            setTimeout(() => target.scrollIntoView({ behavior: 'smooth' }), 100);
          }
        });
      });
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

/* ==========================================================================
   17. CLASS DEEP DIVES & HANDS-ON FORENSICS
   ========================================================================== */
