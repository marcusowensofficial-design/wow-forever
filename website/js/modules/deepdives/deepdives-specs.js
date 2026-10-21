/**
 * World of Warcraft: Forever - Class Specialization & Racial Synergy Section Renderers
 */
(function () {
  "use strict";

  const escapeHtml = window.escapeHtml || (s => String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"));
  const racesModule = window.WOW_DEEPDIVES_RACES || {};
  const renderTaurenRacesSection = (...args) => (window.WOW_DEEPDIVES_RACES?.renderTaurenRacesSection || racesModule.renderTaurenRacesSection || (() => ""))(...args);
  const renderDwarfRacesSection = (...args) => (window.WOW_DEEPDIVES_RACES?.renderDwarfRacesSection || racesModule.renderDwarfRacesSection || (() => ""))(...args);
  const renderOrcMageRacesSection = (...args) => (window.WOW_DEEPDIVES_RACES?.renderOrcMageRacesSection || racesModule.renderOrcMageRacesSection || (() => ""))(...args);
  const renderUndeadPaladinRacesSection = (...args) => (window.WOW_DEEPDIVES_RACES?.renderUndeadPaladinRacesSection || racesModule.renderUndeadPaladinRacesSection || (() => ""))(...args);
  const renderHumanWarriorRacesSection = (...args) => (window.WOW_DEEPDIVES_RACES?.renderHumanWarriorRacesSection || racesModule.renderHumanWarriorRacesSection || (() => ""))(...args);
  const renderGnomeWarlockRacesSection = (...args) => (window.WOW_DEEPDIVES_RACES?.renderGnomeWarlockRacesSection || racesModule.renderGnomeWarlockRacesSection || (() => ""))(...args);
  const renderNightElfPriestRacesSection = (...args) => (window.WOW_DEEPDIVES_RACES?.renderNightElfPriestRacesSection || racesModule.renderNightElfPriestRacesSection || (() => ""))(...args);
  const renderSkyElfDruidRacesSection = (...args) => (window.WOW_DEEPDIVES_RACES?.renderSkyElfDruidRacesSection || racesModule.renderSkyElfDruidRacesSection || (() => ""))(...args);
  const renderTrollRogueRacesSection = (...args) => (window.WOW_DEEPDIVES_RACES?.renderTrollRogueRacesSection || racesModule.renderTrollRogueRacesSection || (() => ""))(...args);


  function renderCoreRulesSection(cData) {
    return `
      <div class="deepdive-cards-grid">
        ${cData.coreRules.map(rule => `
          <div class="deepdive-rule-card">
            <div class="rule-card-header">
              <strong class="rule-card-title">${escapeHtml(rule.title)}</strong>
              <span class="deepdive-badge ${rule.status === 'exclusive' ? 'badge-exclusive' : 'badge-verified'}">
                ${escapeHtml(rule.statusLabel)}
              </span>
            </div>
            <span class="rule-card-badge">${escapeHtml(rule.badge)}</span>
            <p class="rule-card-desc">${escapeHtml(rule.desc)}</p>
          </div>
        `).join('')}
      </div>
    `;
  }

  function renderSurvivalSection(cData) {
    return `
      <div>
        <div class="spec-overview-banner">
          <div>
            <h4 style="color: #abd473; font-size: 1.25rem; margin: 0 0 0.25rem;">${escapeHtml(cData.survival.title)}</h4>
            <p style="font-size: 0.9rem; color: #cbd5e1; margin: 0;">${escapeHtml(cData.survival.tagline)}</p>
          </div>
          <span class="status-badge-highlight" style="background: rgba(171, 212, 115, 0.15); border-color: #abd473; color: #d9f99d;">
            Melee Viability Achieved
          </span>
        </div>

        <!-- Survival Talents Grid -->
        <div class="deepdive-talents-grid">
          ${cData.survival.talents.map(t => `
            <div class="talent-feature-card ${t.name === 'Strider Kick' ? 'featured-talent' : ''}">
              <div class="talent-card-top">
                <div>
                  <strong class="talent-name" style="color: ${t.name === 'Strider Kick' ? '#f5d061' : '#fff'};">${escapeHtml(t.name)}</strong>
                  <span class="talent-type">${escapeHtml(t.type)}</span>
                </div>
                <span class="deepdive-badge badge-verified"><span>✓</span> Verified</span>
              </div>
              <div class="talent-specs-chips">
                ${t.cast ? `<span class="talent-chip">⏱️ ${escapeHtml(t.cast)}</span>` : ''}
                ${t.cd ? `<span class="talent-chip">⌛ ${escapeHtml(t.cd)}</span>` : ''}
                ${t.cost ? `<span class="talent-chip">💧 ${escapeHtml(t.cost)}</span>` : ''}
                ${t.duration ? `<span class="talent-chip">⏳ ${escapeHtml(t.duration)}</span>` : ''}
              </div>
              <p class="talent-desc">${escapeHtml(t.desc)}</p>
            </div>
          `).join('')}
        </div>

        <!-- Melee Hunter Baseline Toolkit Box -->
        <div class="melee-toolkit-box" style="margin-top: 1.5rem;">
          <h4 style="color: var(--text-gold); font-size: 1.05rem; margin-bottom: 0.8rem; display: flex; align-items: center; gap: 0.5rem;">
            <span>🗡️</span> Melee Hunter Baseline Tools & Pet Interaction
          </h4>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1rem;">
            ${cData.meleeToolkit.map(tool => `
              <div style="background: rgba(0,0,0,0.35); padding: 0.8rem 1rem; border-radius: var(--radius-sm); border-left: 3px solid #abd473;">
                <strong style="color: #fff; font-size: 0.95rem;">${escapeHtml(tool.name)}</strong>
                <p style="font-size: 0.84rem; color: #cbd5e1; margin: 0.3rem 0 0; line-height: 1.4;">${escapeHtml(tool.desc)}</p>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  }

  function renderMarksmanshipSection(cData) {
    return `
      <div>
        <div class="spec-overview-banner">
          <div>
            <h4 style="color: #60a5fa; font-size: 1.25rem; margin: 0 0 0.25rem;">${escapeHtml(cData.marksmanship.title)}</h4>
            <p style="font-size: 0.9rem; color: #cbd5e1; margin: 0;">${escapeHtml(cData.marksmanship.tagline)}</p>
          </div>
          <span class="status-badge-highlight" style="background: rgba(96, 165, 250, 0.15); border-color: #60a5fa; color: #93c5fd;">
            Lone Wolf & Heavy Burst
          </span>
        </div>

        <div class="deepdive-talents-grid">
          ${cData.marksmanship.talents.map(t => `
            <div class="talent-feature-card ${t.name === 'Lone Wolf' || t.name === 'Sniper Shot' ? 'featured-talent' : ''}">
              <div class="talent-card-top">
                <div>
                  <strong class="talent-name" style="color: ${t.name === 'Lone Wolf' ? '#60a5fa' : t.name === 'Sniper Shot' ? '#f5d061' : '#fff'};">${escapeHtml(t.name)}</strong>
                  <span class="talent-type">${escapeHtml(t.type)}</span>
                </div>
                <span class="deepdive-badge badge-verified"><span>✓</span> Verified</span>
              </div>
              <div class="talent-specs-chips">
                ${t.cast ? `<span class="talent-chip">⏱️ ${escapeHtml(t.cast)}</span>` : ''}
                ${t.cd ? `<span class="talent-chip">⌛ ${escapeHtml(t.cd)}</span>` : ''}
                ${t.range ? `<span class="talent-chip">🎯 ${escapeHtml(t.range)}</span>` : ''}
                ${t.duration ? `<span class="talent-chip">⏳ ${escapeHtml(t.duration)}</span>` : ''}
              </div>
              <p class="talent-desc">${escapeHtml(t.desc)}</p>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  function renderBeastMasterySection(cData) {
    return `
      <div>
        <div class="spec-overview-banner">
          <div>
            <h4 style="color: #f59e0b; font-size: 1.25rem; margin: 0 0 0.25rem;">${escapeHtml(cData.beastMastery.title)}</h4>
            <p style="font-size: 0.9rem; color: #cbd5e1; margin: 0;">${escapeHtml(cData.beastMastery.tagline)}</p>
          </div>
          <span class="status-badge-highlight" style="background: rgba(245, 158, 11, 0.15); border-color: #f59e0b; color: #fcd34d;">
            Multi-Pet Command
          </span>
        </div>

        <div class="deepdive-talents-grid">
          ${cData.beastMastery.talents.map(t => `
            <div class="talent-feature-card ${t.name === 'Summon Hawk' || t.name.includes('Enrage') ? 'featured-talent' : ''}">
              <div class="talent-card-top">
                <div>
                  <strong class="talent-name" style="color: ${t.name === 'Summon Hawk' ? '#f5d061' : '#fff'};">${escapeHtml(t.name)}</strong>
                  <span class="talent-type">${escapeHtml(t.type)}</span>
                </div>
                <span class="deepdive-badge badge-verified"><span>✓</span> Verified</span>
              </div>
              <div class="talent-specs-chips">
                ${t.cast ? `<span class="talent-chip">⏱️ ${escapeHtml(t.cast)}</span>` : ''}
                ${t.cd ? `<span class="talent-chip">⌛ ${escapeHtml(t.cd)}</span>` : ''}
                ${t.duration ? `<span class="talent-chip">⏳ ${escapeHtml(t.duration)}</span>` : ''}
              </div>
              <p class="talent-desc">${escapeHtml(t.desc)}</p>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }



  function renderEnhancementSection(cData) {
    return `
      <div>
        <div class="spec-overview-banner">
          <div>
            <h4 style="color: #0070DE; font-size: 1.25rem; margin: 0 0 0.25rem;">${escapeHtml(cData.enhancement.title)}</h4>
            <p style="font-size: 0.9rem; color: #cbd5e1; margin: 0;">${escapeHtml(cData.enhancement.tagline)}</p>
          </div>
          <span class="status-badge-highlight" style="background: rgba(0, 112, 222, 0.15); border-color: #0070DE; color: #7dd3fc;">
            8s Stormstrike & Reset Procs
          </span>
        </div>

        <div class="deepdive-talents-grid">
          ${cData.enhancement.talents.map(t => `
            <div class="talent-feature-card ${t.name.includes('Stormstrike') || t.name.includes('Farseer') ? 'featured-talent' : ''}">
              <div class="talent-card-top">
                <div>
                  <strong class="talent-name" style="color: ${t.name.includes('Stormstrike') ? '#0070DE' : t.name.includes('Farseer') ? '#f5d061' : '#fff'};">${escapeHtml(t.name)}</strong>
                  <span class="talent-type">${escapeHtml(t.type)}</span>
                </div>
                <span class="deepdive-badge badge-verified"><span>✓</span> Verified</span>
              </div>
              <div class="talent-specs-chips">
                ${t.cast ? `<span class="talent-chip">⏱️ ${escapeHtml(t.cast)}</span>` : ''}
                ${t.cd ? `<span class="talent-chip">⌛ ${escapeHtml(t.cd)}</span>` : ''}
                ${t.duration ? `<span class="talent-chip">⏳ ${escapeHtml(t.duration)}</span>` : ''}
              </div>
              <p class="talent-desc">${escapeHtml(t.desc)}</p>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  function renderShamanTankingSection(cData) {
    return `
      <div>
        <div class="spec-overview-banner" style="background: rgba(56, 189, 248, 0.06); border-color: rgba(56, 189, 248, 0.3);">
          <div>
            <h4 style="color: #38bdf8; font-size: 1.25rem; margin: 0 0 0.25rem;">${escapeHtml(cData.tanking.title)}</h4>
            <p style="font-size: 0.9rem; color: #cbd5e1; margin: 0;">${escapeHtml(cData.tanking.tagline)}</p>
          </div>
          <span class="status-badge-highlight" style="background: rgba(56, 189, 248, 0.15); border-color: #38bdf8; color: #7dd3fc;">
            Spirit Weapons +30% Threat
          </span>
        </div>

        <div class="deepdive-cards-grid">
          ${cData.tanking.tools.map(tool => `
            <div class="deepdive-rule-card" style="${tool.name.includes('Verdict') ? 'border-color: rgba(245, 158, 11, 0.45); background: rgba(245, 158, 11, 0.05);' : ''}">
              <div class="rule-card-header">
                <strong class="rule-card-title">${escapeHtml(tool.name)}</strong>
                <span class="deepdive-badge ${tool.status === 'demo' ? 'badge-demo' : 'badge-verified'}">
                  ${escapeHtml(tool.statusLabel)}
                </span>
              </div>
              <p class="rule-card-desc" style="margin-top: 0.5rem;">${escapeHtml(tool.desc)}</p>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  function renderElementalSection(cData) {
    return `
      <div>
        <div class="spec-overview-banner">
          <div>
            <h4 style="color: #69CCF0; font-size: 1.25rem; margin: 0 0 0.25rem;">${escapeHtml(cData.elemental.title)}</h4>
            <p style="font-size: 0.9rem; color: #cbd5e1; margin: 0;">${escapeHtml(cData.elemental.tagline)}</p>
          </div>
          <span class="status-badge-highlight" style="background: rgba(105, 204, 240, 0.15); border-color: #69CCF0; color: #bae6fd;">
            Lava Burst & Overload
          </span>
        </div>

        <div class="deepdive-talents-grid">
          ${cData.elemental.talents.map(t => `
            <div class="talent-feature-card ${t.name === 'Lava Burst' || t.name === 'Elemental Overload' ? 'featured-talent' : ''}">
              <div class="talent-card-top">
                <div>
                  <strong class="talent-name" style="color: ${t.name === 'Lava Burst' ? '#f5d061' : t.name === 'Elemental Overload' ? '#69CCF0' : '#fff'};">${escapeHtml(t.name)}</strong>
                  <span class="talent-type">${escapeHtml(t.type)}</span>
                </div>
                <span class="deepdive-badge ${t.status === 'demo' ? 'badge-demo' : 'badge-verified'}">
                  ${t.status === 'demo' ? '<span>🎙️</span> Forensic' : '<span>✓</span> Verified'}
                </span>
              </div>
              <div class="talent-specs-chips">
                ${t.cast ? `<span class="talent-chip">⏱️ ${escapeHtml(t.cast)}</span>` : ''}
                ${t.cd ? `<span class="talent-chip">⌛ ${escapeHtml(t.cd)}</span>` : ''}
              </div>
              <p class="talent-desc">${escapeHtml(t.desc)}</p>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  function renderRestorationSection(cData) {
    return `
      <div>
        <div class="spec-overview-banner">
          <div>
            <h4 style="color: #10b981; font-size: 1.25rem; margin: 0 0 0.25rem;">${escapeHtml(cData.restoration.title)}</h4>
            <p style="font-size: 0.9rem; color: #cbd5e1; margin: 0;">${escapeHtml(cData.restoration.tagline)}</p>
          </div>
          <span class="status-badge-highlight" style="background: rgba(16, 185, 129, 0.15); border-color: #10b981; color: #6ee7b7;">
            Riptide +25% Chain Heal
          </span>
        </div>

        <div class="deepdive-talents-grid">
          ${cData.restoration.talents.map(t => `
            <div class="talent-feature-card ${t.name === 'Riptide' || t.name === 'Water Shield' ? 'featured-talent' : ''}">
              <div class="talent-card-top">
                <div>
                  <strong class="talent-name" style="color: ${t.name === 'Riptide' ? '#6ee7b7' : t.name === 'Water Shield' ? '#38bdf8' : '#fff'};">${escapeHtml(t.name)}</strong>
                  <span class="talent-type">${escapeHtml(t.type)}</span>
                </div>
                <span class="deepdive-badge ${t.status === 'demo' ? 'badge-demo' : 'badge-verified'}">
                  ${t.status === 'demo' ? '<span>🎙️</span> Forensic' : '<span>✓</span> Verified'}
                </span>
              </div>
              <div class="talent-specs-chips">
                ${t.cast ? `<span class="talent-chip">⏱️ ${escapeHtml(t.cast)}</span>` : ''}
                ${t.cd ? `<span class="talent-chip">⌛ ${escapeHtml(t.cd)}</span>` : ''}
                ${t.charges ? `<span class="talent-chip">🛡️ ${escapeHtml(t.charges)}</span>` : ''}
                ${t.duration ? `<span class="talent-chip">⏳ ${escapeHtml(t.duration)}</span>` : ''}
              </div>
              <p class="talent-desc">${escapeHtml(t.desc)}</p>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }


  function renderArcaneSection(cData) {
    return `
      <div>
        <div class="spec-overview-banner" style="background: rgba(168, 85, 247, 0.08); border-color: rgba(168, 85, 247, 0.3);">
          <div>
            <h4 style="color: #c084fc; font-size: 1.25rem; margin: 0 0 0.25rem;">${escapeHtml(cData.arcane.title)}</h4>
            <p style="font-size: 0.9rem; color: #cbd5e1; margin: 0;">${escapeHtml(cData.arcane.tagline)}</p>
          </div>
          <span class="status-badge-highlight" style="background: rgba(168, 85, 247, 0.15); border-color: #a855f7; color: #e9d5ff;">
            Arcane Blast + Missile Barrage
          </span>
        </div>

        <div class="deepdive-talents-grid">
          ${cData.arcane.talents.map(t => `
            <div class="talent-feature-card ${t.name.includes('Arcane Blast') || t.name.includes('Missile Barrage') ? 'featured-talent' : ''}">
              <div class="talent-card-top">
                <div>
                  <strong class="talent-name" style="color: ${t.name.includes('Arcane Blast') ? '#c084fc' : t.name.includes('Missile Barrage') ? '#f5d061' : '#fff'};">${escapeHtml(t.name)}</strong>
                  <span class="talent-type">${escapeHtml(t.type)}</span>
                </div>
                <span class="deepdive-badge badge-verified"><span>✓</span> Verified</span>
              </div>
              <div class="talent-specs-chips">
                ${t.cast ? `<span class="talent-chip">⏱️ ${escapeHtml(t.cast)}</span>` : ''}
                ${t.cd ? `<span class="talent-chip">⌛ ${escapeHtml(t.cd)}</span>` : ''}
              </div>
              <p class="talent-desc">${escapeHtml(t.desc)}</p>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  function renderFireSection(cData) {
    return `
      <div>
        <div class="spec-overview-banner" style="background: rgba(239, 68, 68, 0.08); border-color: rgba(239, 68, 68, 0.3);">
          <div>
            <h4 style="color: #f87171; font-size: 1.25rem; margin: 0 0 0.25rem;">${escapeHtml(cData.fire.title)}</h4>
            <p style="font-size: 0.9rem; color: #cbd5e1; margin: 0;">${escapeHtml(cData.fire.tagline)}</p>
          </div>
          <span class="status-badge-highlight" style="background: rgba(239, 68, 68, 0.15); border-color: #ef4444; color: #fca5a5;">
            1.5s Hot Streak Pyroblasts
          </span>
        </div>

        <div class="deepdive-talents-grid">
          ${cData.fire.talents.map(t => `
            <div class="talent-feature-card ${t.name.includes('Hot Streak') || t.name.includes('Combustion') ? 'featured-talent' : ''}">
              <div class="talent-card-top">
                <div>
                  <strong class="talent-name" style="color: ${t.name.includes('Hot Streak') ? '#f5d061' : t.name.includes('Combustion') ? '#f87171' : '#fff'};">${escapeHtml(t.name)}</strong>
                  <span class="talent-type">${escapeHtml(t.type)}</span>
                </div>
                <span class="deepdive-badge badge-verified"><span>✓</span> Verified</span>
              </div>
              <div class="talent-specs-chips">
                ${t.cast ? `<span class="talent-chip">⏱️ ${escapeHtml(t.cast)}</span>` : ''}
                ${t.cd ? `<span class="talent-chip">⌛ ${escapeHtml(t.cd)}</span>` : ''}
                ${t.duration ? `<span class="talent-chip">⏳ ${escapeHtml(t.duration)}</span>` : ''}
              </div>
              <p class="talent-desc">${escapeHtml(t.desc)}</p>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  function renderFrostSection(cData) {
    return `
      <div>
        <div class="spec-overview-banner" style="background: rgba(14, 165, 233, 0.08); border-color: rgba(14, 165, 233, 0.3);">
          <div>
            <h4 style="color: #38bdf8; font-size: 1.25rem; margin: 0 0 0.25rem;">${escapeHtml(cData.frost.title)}</h4>
            <p style="font-size: 0.9rem; color: #cbd5e1; margin: 0;">${escapeHtml(cData.frost.tagline)}</p>
          </div>
          <span class="status-badge-highlight" style="background: rgba(14, 165, 233, 0.15); border-color: #0ea5e9; color: #7dd3fc;">
            Ice Lance & Fingers of Frost
          </span>
        </div>

        <div class="deepdive-talents-grid">
          ${cData.frost.talents.map(t => `
            <div class="talent-feature-card ${t.name.includes('Ice Lance') || t.name.includes('Fingers of Frost') ? 'featured-talent' : ''}">
              <div class="talent-card-top">
                <div>
                  <strong class="talent-name" style="color: ${t.name.includes('Ice Lance') ? '#38bdf8' : t.name.includes('Fingers of Frost') ? '#f5d061' : '#fff'};">${escapeHtml(t.name)}</strong>
                  <span class="talent-type">${escapeHtml(t.type)}</span>
                </div>
                <span class="deepdive-badge badge-verified"><span>✓</span> Verified</span>
              </div>
              <div class="talent-specs-chips">
                ${t.cast ? `<span class="talent-chip">⏱️ ${escapeHtml(t.cast)}</span>` : ''}
                ${t.cd ? `<span class="talent-chip">⌛ ${escapeHtml(t.cd)}</span>` : ''}
                ${t.cost ? `<span class="talent-chip">💧 ${escapeHtml(t.cost)}</span>` : ''}
              </div>
              <p class="talent-desc">${escapeHtml(t.desc)}</p>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }


  function renderHolyPaladinSection(cData) {
    return `
      <div>
        <div class="spec-overview-banner" style="background: rgba(245, 140, 186, 0.08); border-color: rgba(245, 140, 186, 0.3);">
          <div>
            <h4 style="color: #f472b6; font-size: 1.25rem; margin: 0 0 0.25rem;">${escapeHtml(cData.holy.title)}</h4>
            <p style="font-size: 0.9rem; color: #cbd5e1; margin: 0;">${escapeHtml(cData.holy.tagline)}</p>
          </div>
          <span class="status-badge-highlight" style="background: rgba(245, 140, 186, 0.15); border-color: #f472b6; color: #fbcfe8;">
            Light's Vigil & 10s Holy Shock
          </span>
        </div>

        <div class="deepdive-talents-grid">
          ${cData.holy.talents.map(t => `
            <div class="talent-feature-card ${t.name.includes("Light's Vigil") || t.name.includes("Holy Shock") || t.name.includes("Unbreakable") ? 'featured-talent' : ''}">
              <div class="talent-card-top">
                <div>
                  <strong class="talent-name" style="color: ${t.name.includes("Light's Vigil") ? '#f5d061' : t.name.includes("Holy Shock") ? '#f472b6' : '#fff'};">${escapeHtml(t.name)}</strong>
                  <span class="talent-type">${escapeHtml(t.type)}</span>
                </div>
                <span class="deepdive-badge badge-verified"><span>✓</span> Verified</span>
              </div>
              <div class="talent-specs-chips">
                ${t.cast ? `<span class="talent-chip">⏱️ ${escapeHtml(t.cast)}</span>` : ''}
                ${t.cd ? `<span class="talent-chip">⌛ ${escapeHtml(t.cd)}</span>` : ''}
                ${t.duration ? `<span class="talent-chip">⏳ ${escapeHtml(t.duration)}</span>` : ''}
              </div>
              <p class="talent-desc">${escapeHtml(t.desc)}</p>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  function renderProtectionPaladinSection(cData) {
    return `
      <div>
        <div class="spec-overview-banner" style="background: rgba(245, 140, 186, 0.08); border-color: rgba(245, 140, 186, 0.3);">
          <div>
            <h4 style="color: #f472b6; font-size: 1.25rem; margin: 0 0 0.25rem;">${escapeHtml(cData.protection.title)}</h4>
            <p style="font-size: 0.9rem; color: #cbd5e1; margin: 0;">${escapeHtml(cData.protection.tagline)}</p>
          </div>
          <span class="status-badge-highlight" style="background: rgba(245, 140, 186, 0.15); border-color: #f472b6; color: #fbcfe8;">
            Dedicated Taunt & Block Mana Sustain
          </span>
        </div>

        <div class="deepdive-talents-grid">
          ${cData.protection.talents.map(t => `
            <div class="talent-feature-card ${t.name.includes("Judgment of Fury") || t.name.includes("Seal of Fury") || t.name.includes("Templar's Bulwark") ? 'featured-talent' : ''}">
              <div class="talent-card-top">
                <div>
                  <strong class="talent-name" style="color: ${t.name.includes("Judgment of Fury") ? '#f5d061' : t.name.includes("Templar's Bulwark") ? '#38bdf8' : '#fff'};">${escapeHtml(t.name)}</strong>
                  <span class="talent-type">${escapeHtml(t.type)}</span>
                </div>
                <span class="deepdive-badge badge-verified"><span>✓</span> Verified</span>
              </div>
              <div class="talent-specs-chips">
                ${t.cast ? `<span class="talent-chip">⏱️ ${escapeHtml(t.cast)}</span>` : ''}
                ${t.cd ? `<span class="talent-chip">⌛ ${escapeHtml(t.cd)}</span>` : ''}
                ${t.range ? `<span class="talent-chip">🎯 ${escapeHtml(t.range)}</span>` : ''}
                ${t.duration ? `<span class="talent-chip">⏳ ${escapeHtml(t.duration)}</span>` : ''}
                ${t.charges ? `<span class="talent-chip">🛡️ ${escapeHtml(t.charges)}</span>` : ''}
              </div>
              <p class="talent-desc">${escapeHtml(t.desc)}</p>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  function renderRetributionPaladinSection(cData) {
    return `
      <div>
        <div class="spec-overview-banner" style="background: rgba(245, 140, 186, 0.08); border-color: rgba(245, 140, 186, 0.3);">
          <div>
            <h4 style="color: #f472b6; font-size: 1.25rem; margin: 0 0 0.25rem;">${escapeHtml(cData.retribution.title)}</h4>
            <p style="font-size: 0.9rem; color: #cbd5e1; margin: 0;">${escapeHtml(cData.retribution.tagline)}</p>
          </div>
          <span class="status-badge-highlight" style="background: rgba(245, 140, 186, 0.15); border-color: #f472b6; color: #fbcfe8;">
            Twist of Light Echoes & Sacred Arbiter
          </span>
        </div>

        <div class="deepdive-talents-grid">
          ${cData.retribution.talents.map(t => `
            <div class="talent-feature-card ${t.name.includes("Twist of Light") || t.name.includes("Sacred Arbiter") || t.name.includes("Sheath of Light") ? 'featured-talent' : ''}">
              <div class="talent-card-top">
                <div>
                  <strong class="talent-name" style="color: ${t.name.includes("Twist of Light") ? '#f5d061' : t.name.includes("Sacred Arbiter") ? '#f472b6' : '#fff'};">${escapeHtml(t.name)}</strong>
                  <span class="talent-type">${escapeHtml(t.type)}</span>
                </div>
                <span class="deepdive-badge badge-verified"><span>✓</span> Verified</span>
              </div>
              <div class="talent-specs-chips">
                ${t.cast ? `<span class="talent-chip">⏱️ ${escapeHtml(t.cast)}</span>` : ''}
                ${t.cd ? `<span class="talent-chip">⌛ ${escapeHtml(t.cd)}</span>` : ''}
                ${t.duration ? `<span class="talent-chip">⏳ ${escapeHtml(t.duration)}</span>` : ''}
              </div>
              <p class="talent-desc">${escapeHtml(t.desc)}</p>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }


  function renderArmsWarriorSection(cData) {
    return `
      <div>
        <div class="spec-overview-banner" style="background: rgba(199, 156, 110, 0.08); border-color: rgba(199, 156, 110, 0.3);">
          <div>
            <h4 style="color: #fed7aa; font-size: 1.25rem; margin: 0 0 0.25rem;">${escapeHtml(cData.arms.title)}</h4>
            <p style="font-size: 0.9rem; color: #cbd5e1; margin: 0;">${escapeHtml(cData.arms.tagline)}</p>
          </div>
          <span class="status-badge-highlight" style="background: rgba(199, 156, 110, 0.15); border-color: #c79c6e; color: #fed7aa;">
            Spearing Strike & Unified Weaponmaster
          </span>
        </div>

        <div class="deepdive-talents-grid">
          ${cData.arms.talents.map(t => `
            <div class="talent-feature-card ${t.name.includes("Spearing Strike") || t.name.includes("Weaponmaster") || t.name.includes("Improved Slam") ? 'featured-talent' : ''}">
              <div class="talent-card-top">
                <div>
                  <strong class="talent-name" style="color: ${t.name.includes("Spearing Strike") ? '#f5d061' : t.name.includes("Weaponmaster") ? '#fed7aa' : '#fff'};">${escapeHtml(t.name)}</strong>
                  <span class="talent-type">${escapeHtml(t.type)}</span>
                </div>
                <span class="deepdive-badge badge-verified"><span>✓</span> Verified</span>
              </div>
              <div class="talent-specs-chips">
                ${t.cast ? `<span class="talent-chip">⏱️ ${escapeHtml(t.cast)}</span>` : ''}
                ${t.cost ? `<span class="talent-chip">🔴 ${escapeHtml(t.cost)}</span>` : ''}
                ${t.cd ? `<span class="talent-chip">⌛ ${escapeHtml(t.cd)}</span>` : ''}
                ${t.duration ? `<span class="talent-chip">⏳ ${escapeHtml(t.duration)}</span>` : ''}
              </div>
              <p class="talent-desc">${escapeHtml(t.desc)}</p>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  function renderFuryWarriorSection(cData) {
    return `
      <div>
        <div class="spec-overview-banner" style="background: rgba(239, 68, 68, 0.08); border-color: rgba(239, 68, 68, 0.3);">
          <div>
            <h4 style="color: #f87171; font-size: 1.25rem; margin: 0 0 0.25rem;">${escapeHtml(cData.fury.title)}</h4>
            <p style="font-size: 0.9rem; color: #cbd5e1; margin: 0;">${escapeHtml(cData.fury.tagline)}</p>
          </div>
          <span class="status-badge-highlight" style="background: rgba(239, 68, 68, 0.15); border-color: #ef4444; color: #fca5a5;">
            Raging Blows & Berserker Rage Mobility
          </span>
        </div>

        <div class="deepdive-talents-grid">
          ${cData.fury.talents.map(t => `
            <div class="talent-feature-card ${t.name.includes("Raging Blows") || t.name.includes("Dual Wield") || t.name.includes("Berserker Rage") ? 'featured-talent' : ''}">
              <div class="talent-card-top">
                <div>
                  <strong class="talent-name" style="color: ${t.name.includes("Raging Blows") ? '#f5d061' : t.name.includes("Berserker Rage") ? '#f87171' : '#fff'};">${escapeHtml(t.name)}</strong>
                  <span class="talent-type">${escapeHtml(t.type)}</span>
                </div>
                <span class="deepdive-badge badge-verified"><span>✓</span> Verified</span>
              </div>
              <div class="talent-specs-chips">
                ${t.cast ? `<span class="talent-chip">⏱️ ${escapeHtml(t.cast)}</span>` : ''}
                ${t.cost ? `<span class="talent-chip">🔴 ${escapeHtml(t.cost)}</span>` : ''}
                ${t.cd ? `<span class="talent-chip">⌛ ${escapeHtml(t.cd)}</span>` : ''}
                ${t.duration ? `<span class="talent-chip">⏳ ${escapeHtml(t.duration)}</span>` : ''}
              </div>
              <p class="talent-desc">${escapeHtml(t.desc)}</p>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  function renderProtectionWarriorSection(cData) {
    return `
      <div>
        <div class="spec-overview-banner" style="background: rgba(59, 130, 246, 0.08); border-color: rgba(59, 130, 246, 0.3);">
          <div>
            <h4 style="color: #60a5fa; font-size: 1.25rem; margin: 0 0 0.25rem;">${escapeHtml(cData.protection.title)}</h4>
            <p style="font-size: 0.9rem; color: #cbd5e1; margin: 0;">${escapeHtml(cData.protection.tagline)}</p>
          </div>
          <span class="status-badge-highlight" style="background: rgba(59, 130, 246, 0.15); border-color: #3b82f6; color: #93c5fd;">
            Defensive Charge & Shield Bash Silence
          </span>
        </div>

        <div class="deepdive-talents-grid">
          ${cData.protection.talents.map(t => `
            <div class="talent-feature-card ${t.name.includes("Charge in Defensive") || t.name.includes("Shield Avoidance") || t.name.includes("Shield Bash Silence") ? 'featured-talent' : ''}">
              <div class="talent-card-top">
                <div>
                  <strong class="talent-name" style="color: ${t.name.includes("Charge in Defensive") ? '#f5d061' : t.name.includes("Shield Bash Silence") ? '#60a5fa' : '#fff'};">${escapeHtml(t.name)}</strong>
                  <span class="talent-type">${escapeHtml(t.type)}</span>
                </div>
                <span class="deepdive-badge badge-verified"><span>✓</span> Verified</span>
              </div>
              <div class="talent-specs-chips">
                ${t.cast ? `<span class="talent-chip">⏱️ ${escapeHtml(t.cast)}</span>` : ''}
                ${t.cost ? `<span class="talent-chip">🔴 ${escapeHtml(t.cost)}</span>` : ''}
                ${t.cd ? `<span class="talent-chip">⌛ ${escapeHtml(t.cd)}</span>` : ''}
                ${t.duration ? `<span class="talent-chip">⏳ ${escapeHtml(t.duration)}</span>` : ''}
              </div>
              <p class="talent-desc">${escapeHtml(t.desc)}</p>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }


  function renderAfflictionWarlockSection(cData) {
    return `
      <div>
        <div class="spec-overview-banner" style="background: rgba(168, 85, 247, 0.08); border-color: rgba(168, 85, 247, 0.3);">
          <div>
            <h4 style="color: #c084fc; font-size: 1.25rem; margin: 0 0 0.25rem;">${escapeHtml(cData.affliction.title)}</h4>
            <p style="font-size: 0.9rem; color: #cbd5e1; margin: 0;">${escapeHtml(cData.affliction.tagline)}</p>
          </div>
          <span class="status-badge-highlight" style="background: rgba(168, 85, 247, 0.15); border-color: #a855f7; color: #e9d5ff;">
            Pandemic Critical DoTs & Drain Hope
          </span>
        </div>

        <div class="deepdive-talents-grid">
          ${cData.affliction.talents.map(t => `
            <div class="talent-feature-card ${t.name.includes("Pandemic") || t.name.includes("Drain Hope") || t.name.includes("Soul Harvest") ? 'featured-talent' : ''}">
              <div class="talent-card-top">
                <div>
                  <strong class="talent-name" style="color: ${t.name.includes("Pandemic") ? '#f5d061' : t.name.includes("Drain Hope") ? '#c084fc' : '#fff'};">${escapeHtml(t.name)}</strong>
                  <span class="talent-type">${escapeHtml(t.type)}</span>
                </div>
                <span class="deepdive-badge badge-verified"><span>✓</span> Verified</span>
              </div>
              <div class="talent-specs-chips">
                ${t.cast ? `<span class="talent-chip">⏱️ ${escapeHtml(t.cast)}</span>` : ''}
                ${t.cd ? `<span class="talent-chip">⌛ ${escapeHtml(t.cd)}</span>` : ''}
                ${t.duration ? `<span class="talent-chip">⏳ ${escapeHtml(t.duration)}</span>` : ''}
                ${t.range ? `<span class="talent-chip">🎯 ${escapeHtml(t.range)}</span>` : ''}
              </div>
              <p class="talent-desc">${escapeHtml(t.desc)}</p>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  function renderDemonologyWarlockSection(cData) {
    return `
      <div>
        <div class="spec-overview-banner" style="background: rgba(148, 130, 201, 0.08); border-color: rgba(148, 130, 201, 0.3);">
          <div>
            <h4 style="color: #ddd6fe; font-size: 1.25rem; margin: 0 0 0.25rem;">${escapeHtml(cData.demonology.title)}</h4>
            <p style="font-size: 0.9rem; color: #cbd5e1; margin: 0;">${escapeHtml(cData.demonology.tagline)}</p>
          </div>
          <span class="status-badge-highlight" style="background: rgba(148, 130, 201, 0.15); border-color: #9482c9; color: #ddd6fe;">
            Demonic Pact & SL/SL 30% Damage Transfer
          </span>
        </div>

        <div class="deepdive-talents-grid">
          ${cData.demonology.talents.map(t => `
            <div class="talent-feature-card ${t.name.includes("Demonic Pact") || t.name.includes("Soul Link") || t.name.includes("Spell Lock") ? 'featured-talent' : ''}">
              <div class="talent-card-top">
                <div>
                  <strong class="talent-name" style="color: ${t.name.includes("Demonic Pact") ? '#f5d061' : t.name.includes("Soul Link") ? '#ddd6fe' : '#fff'};">${escapeHtml(t.name)}</strong>
                  <span class="talent-type">${escapeHtml(t.type)}</span>
                </div>
                <span class="deepdive-badge badge-verified"><span>✓</span> Verified</span>
              </div>
              <div class="talent-specs-chips">
                ${t.cast ? `<span class="talent-chip">⏱️ ${escapeHtml(t.cast)}</span>` : ''}
                ${t.cost ? `<span class="talent-chip">💎 ${escapeHtml(t.cost)}</span>` : ''}
                ${t.cd ? `<span class="talent-chip">⌛ ${escapeHtml(t.cd)}</span>` : ''}
                ${t.duration ? `<span class="talent-chip">⏳ ${escapeHtml(t.duration)}</span>` : ''}
              </div>
              <p class="talent-desc">${escapeHtml(t.desc)}</p>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  function renderDestructionWarlockSection(cData) {
    return `
      <div>
        <div class="spec-overview-banner" style="background: rgba(239, 68, 68, 0.08); border-color: rgba(239, 68, 68, 0.3);">
          <div>
            <h4 style="color: #f87171; font-size: 1.25rem; margin: 0 0 0.25rem;">${escapeHtml(cData.destruction.title)}</h4>
            <p style="font-size: 0.9rem; color: #cbd5e1; margin: 0;">${escapeHtml(cData.destruction.tagline)}</p>
          </div>
          <span class="status-badge-highlight" style="background: rgba(239, 68, 68, 0.15); border-color: #ef4444; color: #fca5a5;">
            Bane of Havoc 50% Transfer & Shadow/Flame
          </span>
        </div>

        <div class="deepdive-talents-grid">
          ${cData.destruction.talents.map(t => `
            <div class="talent-feature-card ${t.name.includes("Bane of Havoc") || t.name.includes("Shadow and Flame") || t.name.includes("Incinerate") ? 'featured-talent' : ''}">
              <div class="talent-card-top">
                <div>
                  <strong class="talent-name" style="color: ${t.name.includes("Bane of Havoc") ? '#f5d061' : t.name.includes("Shadow and Flame") ? '#f87171' : '#fff'};">${escapeHtml(t.name)}</strong>
                  <span class="talent-type">${escapeHtml(t.type)}</span>
                </div>
                <span class="deepdive-badge badge-verified"><span>✓</span> Verified</span>
              </div>
              <div class="talent-specs-chips">
                ${t.cast ? `<span class="talent-chip">⏱️ ${escapeHtml(t.cast)}</span>` : ''}
                ${t.cost ? `<span class="talent-chip">🔥 ${escapeHtml(t.cost)}</span>` : ''}
                ${t.cd ? `<span class="talent-chip">⌛ ${escapeHtml(t.cd)}</span>` : ''}
                ${t.duration ? `<span class="talent-chip">⏳ ${escapeHtml(t.duration)}</span>` : ''}
              </div>
              <p class="talent-desc">${escapeHtml(t.desc)}</p>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }


  function renderDisciplinePriestSection(cData) {
    return `
      <div>
        <div class="spec-overview-banner" style="background: rgba(255, 255, 255, 0.08); border-color: rgba(255, 255, 255, 0.3);">
          <div>
            <h4 style="color: #ffffff; font-size: 1.25rem; margin: 0 0 0.25rem;">${escapeHtml(cData.discipline.title)}</h4>
            <p style="font-size: 0.9rem; color: #cbd5e1; margin: 0;">${escapeHtml(cData.discipline.tagline)}</p>
          </div>
          <span class="status-badge-highlight" style="background: rgba(255, 255, 255, 0.15); border-color: #ffffff; color: #ffffff;">
            Penance & Soul Warding Shield Spam
          </span>
        </div>

        <div class="deepdive-talents-grid">
          ${cData.discipline.talents.map(t => `
            <div class="talent-feature-card ${t.name.includes("Penance") || t.name.includes("Soul Warding") || t.name.includes("Divine Aegis") ? 'featured-talent' : ''}">
              <div class="talent-card-top">
                <div>
                  <strong class="talent-name" style="color: ${t.name.includes("Penance") ? '#f5d061' : t.name.includes("Soul Warding") ? '#38bdf8' : '#fff'};">${escapeHtml(t.name)}</strong>
                  <span class="talent-type">${escapeHtml(t.type)}</span>
                </div>
                <span class="deepdive-badge badge-verified"><span>✓</span> Verified</span>
              </div>
              <div class="talent-specs-chips">
                ${t.cast ? `<span class="talent-chip">⏱️ ${escapeHtml(t.cast)}</span>` : ''}
                ${t.cd ? `<span class="talent-chip">⌛ ${escapeHtml(t.cd)}</span>` : ''}
                ${t.duration ? `<span class="talent-chip">⏳ ${escapeHtml(t.duration)}</span>` : ''}
              </div>
              <p class="talent-desc">${escapeHtml(t.desc)}</p>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  function renderHolyPriestSection(cData) {
    return `
      <div>
        <div class="spec-overview-banner" style="background: rgba(243, 192, 67, 0.08); border-color: rgba(243, 192, 67, 0.3);">
          <div>
            <h4 style="color: #f5d061; font-size: 1.25rem; margin: 0 0 0.25rem;">${escapeHtml(cData.holy.title)}</h4>
            <p style="font-size: 0.9rem; color: #cbd5e1; margin: 0;">${escapeHtml(cData.holy.tagline)}</p>
          </div>
          <span class="status-badge-highlight" style="background: rgba(243, 192, 67, 0.15); border-color: #f5d061; color: #fde68a;">
            Prayer of Mending & Litany of Light
          </span>
        </div>

        <div class="deepdive-talents-grid">
          ${cData.holy.talents.map(t => `
            <div class="talent-feature-card ${t.name.includes("Prayer of Mending") || t.name.includes("Litany of Light") || t.name.includes("Spirit-to-Spell") ? 'featured-talent' : ''}">
              <div class="talent-card-top">
                <div>
                  <strong class="talent-name" style="color: ${t.name.includes("Prayer of Mending") ? '#f5d061' : t.name.includes("Litany of Light") ? '#38bdf8' : '#fff'};">${escapeHtml(t.name)}</strong>
                  <span class="talent-type">${escapeHtml(t.type)}</span>
                </div>
                <span class="deepdive-badge badge-verified"><span>✓</span> Verified</span>
              </div>
              <div class="talent-specs-chips">
                ${t.cast ? `<span class="talent-chip">⏱️ ${escapeHtml(t.cast)}</span>` : ''}
                ${t.cd ? `<span class="talent-chip">⌛ ${escapeHtml(t.cd)}</span>` : ''}
                ${t.duration ? `<span class="talent-chip">⏳ ${escapeHtml(t.duration)}</span>` : ''}
              </div>
              <p class="talent-desc">${escapeHtml(t.desc)}</p>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  function renderShadowPriestSection(cData) {
    return `
      <div>
        <div class="spec-overview-banner" style="background: rgba(148, 130, 201, 0.08); border-color: rgba(148, 130, 201, 0.3);">
          <div>
            <h4 style="color: #c084fc; font-size: 1.25rem; margin: 0 0 0.25rem;">${escapeHtml(cData.shadow.title)}</h4>
            <p style="font-size: 0.9rem; color: #cbd5e1; margin: 0;">${escapeHtml(cData.shadow.tagline)}</p>
          </div>
          <span class="status-badge-highlight" style="background: rgba(148, 130, 201, 0.15); border-color: #9482c9; color: #ddd6fe;">
            Shadowform -50% Mana & Devouring Plague
          </span>
        </div>

        <div class="deepdive-talents-grid">
          ${cData.shadow.talents.map(t => `
            <div class="talent-feature-card ${t.name.includes("Shadowform") || t.name.includes("Devouring Plague") || t.name.includes("Vampiric Embrace") ? 'featured-talent' : ''}">
              <div class="talent-card-top">
                <div>
                  <strong class="talent-name" style="color: ${t.name.includes("Shadowform") ? '#f5d061' : t.name.includes("Devouring Plague") ? '#c084fc' : '#fff'};">${escapeHtml(t.name)}</strong>
                  <span class="talent-type">${escapeHtml(t.type)}</span>
                </div>
                <span class="deepdive-badge badge-verified"><span>✓</span> Verified</span>
              </div>
              <div class="talent-specs-chips">
                ${t.cast ? `<span class="talent-chip">⏱️ ${escapeHtml(t.cast)}</span>` : ''}
                ${t.cd ? `<span class="talent-chip">⌛ ${escapeHtml(t.cd)}</span>` : ''}
                ${t.duration ? `<span class="talent-chip">⏳ ${escapeHtml(t.duration)}</span>` : ''}
                ${t.range ? `<span class="talent-chip">🎯 ${escapeHtml(t.range)}</span>` : ''}
              </div>
              <p class="talent-desc">${escapeHtml(t.desc)}</p>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }


  function renderBalanceDruidSection(cData) {
    return `
      <div>
        <div class="spec-overview-banner" style="background: rgba(56, 189, 248, 0.08); border-color: rgba(56, 189, 248, 0.3);">
          <div>
            <h4 style="color: #38bdf8; font-size: 1.25rem; margin: 0 0 0.25rem;">${escapeHtml(cData.balance.title)}</h4>
            <p style="font-size: 0.9rem; color: #cbd5e1; margin: 0;">${escapeHtml(cData.balance.tagline)}</p>
          </div>
          <span class="status-badge-highlight" style="background: rgba(56, 189, 248, 0.15); border-color: #38bdf8; color: #7dd3fc;">
            Eclipse 4 Charges & Balance of Nature
          </span>
        </div>

        <div class="deepdive-talents-grid">
          ${cData.balance.talents.map(t => `
            <div class="talent-feature-card ${t.name.includes("Eclipse") || t.name.includes("Balance of Nature") || t.name.includes("Moonkin Form") ? 'featured-talent' : ''}">
              <div class="talent-card-top">
                <div>
                  <strong class="talent-name" style="color: ${t.name.includes("Eclipse") ? '#f5d061' : t.name.includes("Balance of Nature") ? '#38bdf8' : '#fff'};">${escapeHtml(t.name)}</strong>
                  <span class="talent-type">${escapeHtml(t.type)}</span>
                </div>
                <span class="deepdive-badge badge-verified"><span>✓</span> Verified</span>
              </div>
              <div class="talent-specs-chips">
                ${t.cast ? `<span class="talent-chip">⏱️ ${escapeHtml(t.cast)}</span>` : ''}
                ${t.charges ? `<span class="talent-chip">⚡ ${escapeHtml(t.charges)}</span>` : ''}
                ${t.cd ? `<span class="talent-chip">⌛ ${escapeHtml(t.cd)}</span>` : ''}
                ${t.duration ? `<span class="talent-chip">⏳ ${escapeHtml(t.duration)}</span>` : ''}
              </div>
              <p class="talent-desc">${escapeHtml(t.desc)}</p>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  function renderFeralDruidSection(cData) {
    return `
      <div>
        <div class="spec-overview-banner" style="background: rgba(239, 68, 68, 0.08); border-color: rgba(239, 68, 68, 0.3);">
          <div>
            <h4 style="color: #f87171; font-size: 1.25rem; margin: 0 0 0.25rem;">${escapeHtml(cData.feral.title)}</h4>
            <p style="font-size: 0.9rem; color: #cbd5e1; margin: 0;">${escapeHtml(cData.feral.tagline)}</p>
          </div>
          <span class="status-badge-highlight" style="background: rgba(239, 68, 68, 0.15); border-color: #ef4444; color: #fca5a5;">
            King of Jungle & Bear Defense Scaling
          </span>
        </div>

        <div class="deepdive-talents-grid">
          ${cData.feral.talents.map(t => `
            <div class="talent-feature-card ${t.name.includes("King of the Jungle") || t.name.includes("Berserk") || t.name.includes("Bear Defense-to-Armor") || t.name.includes("Feral Charge") ? 'featured-talent' : ''}">
              <div class="talent-card-top">
                <div>
                  <strong class="talent-name" style="color: ${t.name.includes("King of the Jungle") ? '#f5d061' : t.name.includes("Bear Defense") ? '#38bdf8' : t.name.includes("Berserk") ? '#f87171' : '#fff'};">${escapeHtml(t.name)}</strong>
                  <span class="talent-type">${escapeHtml(t.type)}</span>
                </div>
                <span class="deepdive-badge badge-verified"><span>✓</span> Verified</span>
              </div>
              <div class="talent-specs-chips">
                ${t.cast ? `<span class="talent-chip">⏱️ ${escapeHtml(t.cast)}</span>` : ''}
                ${t.cost ? `<span class="talent-chip">🐾 ${escapeHtml(t.cost)}</span>` : ''}
                ${t.range ? `<span class="talent-chip">🎯 ${escapeHtml(t.range)}</span>` : ''}
                ${t.cd ? `<span class="talent-chip">⌛ ${escapeHtml(t.cd)}</span>` : ''}
                ${t.duration ? `<span class="talent-chip">⏳ ${escapeHtml(t.duration)}</span>` : ''}
              </div>
              <p class="talent-desc">${escapeHtml(t.desc)}</p>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  function renderRestorationDruidSection(cData) {
    return `
      <div>
        <div class="spec-overview-banner" style="background: rgba(74, 222, 128, 0.08); border-color: rgba(74, 222, 128, 0.3);">
          <div>
            <h4 style="color: #4ade80; font-size: 1.25rem; margin: 0 0 0.25rem;">${escapeHtml(cData.restoration.title)}</h4>
            <p style="font-size: 0.9rem; color: #cbd5e1; margin: 0;">${escapeHtml(cData.restoration.tagline)}</p>
          </div>
          <span class="status-badge-highlight" style="background: rgba(74, 222, 128, 0.15); border-color: #4ade80; color: #86efac;">
            Wild Growth & 0.5s GCD Reduction
          </span>
        </div>

        <div class="deepdive-talents-grid">
          ${cData.restoration.talents.map(t => `
            <div class="talent-feature-card ${t.name.includes("Wild Growth") || t.name.includes("Swiftmend") || t.name.includes("0.5s Global Cooldown") ? 'featured-talent' : ''}">
              <div class="talent-card-top">
                <div>
                  <strong class="talent-name" style="color: ${t.name.includes("Wild Growth") ? '#f5d061' : t.name.includes("Swiftmend") ? '#4ade80' : '#fff'};">${escapeHtml(t.name)}</strong>
                  <span class="talent-type">${escapeHtml(t.type)}</span>
                </div>
                <span class="deepdive-badge badge-verified"><span>✓</span> Verified</span>
              </div>
              <div class="talent-specs-chips">
                ${t.cast ? `<span class="talent-chip">⏱️ ${escapeHtml(t.cast)}</span>` : ''}
                ${t.cd ? `<span class="talent-chip">⌛ ${escapeHtml(t.cd)}</span>` : ''}
                ${t.duration ? `<span class="talent-chip">⏳ ${escapeHtml(t.duration)}</span>` : ''}
              </div>
              <p class="talent-desc">${escapeHtml(t.desc)}</p>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }


  function renderAssassinationRogueSection(cData) {
    return `
      <div>
        <div class="spec-overview-banner" style="background: rgba(239, 68, 68, 0.08); border-color: rgba(239, 68, 68, 0.3);">
          <div>
            <h4 style="color: #f87171; font-size: 1.25rem; margin: 0 0 0.25rem;">${escapeHtml(cData.assassination.title)}</h4>
            <p style="font-size: 0.9rem; color: #cbd5e1; margin: 0;">${escapeHtml(cData.assassination.tagline)}</p>
          </div>
          <span class="status-badge-highlight" style="background: rgba(239, 68, 68, 0.15); border-color: #ef4444; color: #fca5a5;">
            Daggerless Mutilate & AP/Crit Poisons
          </span>
        </div>

        <div class="deepdive-talents-grid">
          ${cData.assassination.talents.map(t => `
            <div class="talent-feature-card ${t.name.includes("Mutilate") || t.name.includes("Venom Maintenance") || t.name.includes("Kidney Shot") ? 'featured-talent' : ''}">
              <div class="talent-card-top">
                <div>
                  <strong class="talent-name" style="color: ${t.name.includes("Mutilate") ? '#f5d061' : t.name.includes("Venom") ? '#4ade80' : '#fff'};">${escapeHtml(t.name)}</strong>
                  <span class="talent-type">${escapeHtml(t.type)}</span>
                </div>
                <span class="deepdive-badge badge-verified"><span>✓</span> Verified</span>
              </div>
              <div class="talent-specs-chips">
                ${t.cast ? `<span class="talent-chip">⏱️ ${escapeHtml(t.cast)}</span>` : ''}
                ${t.cost ? `<span class="talent-chip">🟡 ${escapeHtml(t.cost)}</span>` : ''}
                ${t.cd ? `<span class="talent-chip">⌛ ${escapeHtml(t.cd)}</span>` : ''}
                ${t.duration ? `<span class="talent-chip">⏳ ${escapeHtml(t.duration)}</span>` : ''}
              </div>
              <p class="talent-desc">${escapeHtml(t.desc)}</p>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  function renderCombatRogueSection(cData) {
    return `
      <div>
        <div class="spec-overview-banner" style="background: rgba(245, 240, 105, 0.08); border-color: rgba(245, 240, 105, 0.3);">
          <div>
            <h4 style="color: #fef08a; font-size: 1.25rem; margin: 0 0 0.25rem;">${escapeHtml(cData.combat.title)}</h4>
            <p style="font-size: 0.9rem; color: #cbd5e1; margin: 0;">${escapeHtml(cData.combat.tagline)}</p>
          </div>
          <span class="status-badge-highlight" style="background: rgba(245, 240, 105, 0.15); border-color: #fef08a; color: #fef08a;">
            Restless Blades Cooldown Cycling
          </span>
        </div>

        <div class="deepdive-talents-grid">
          ${cData.combat.talents.map(t => `
            <div class="talent-feature-card ${t.name.includes("Restless Blades") || t.name.includes("Blade Flurry") || t.name.includes("Adrenaline Rush") || t.name.includes("Improved Kick") ? 'featured-talent' : ''}">
              <div class="talent-card-top">
                <div>
                  <strong class="talent-name" style="color: ${t.name.includes("Restless Blades") ? '#f5d061' : t.name.includes("Blade Flurry") ? '#fef08a' : '#fff'};">${escapeHtml(t.name)}</strong>
                  <span class="talent-type">${escapeHtml(t.type)}</span>
                </div>
                <span class="deepdive-badge badge-verified"><span>✓</span> Verified</span>
              </div>
              <div class="talent-specs-chips">
                ${t.cast ? `<span class="talent-chip">⏱️ ${escapeHtml(t.cast)}</span>` : ''}
                ${t.cost ? `<span class="talent-chip">🟡 ${escapeHtml(t.cost)}</span>` : ''}
                ${t.cd ? `<span class="talent-chip">⌛ ${escapeHtml(t.cd)}</span>` : ''}
                ${t.duration ? `<span class="talent-chip">⏳ ${escapeHtml(t.duration)}</span>` : ''}
              </div>
              <p class="talent-desc">${escapeHtml(t.desc)}</p>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  function renderSubtletyRogueSection(cData) {
    return `
      <div>
        <div class="spec-overview-banner" style="background: rgba(168, 85, 247, 0.08); border-color: rgba(168, 85, 247, 0.3);">
          <div>
            <h4 style="color: #c084fc; font-size: 1.25rem; margin: 0 0 0.25rem;">${escapeHtml(cData.subtlety.title)}</h4>
            <p style="font-size: 0.9rem; color: #cbd5e1; margin: 0;">${escapeHtml(cData.subtlety.tagline)}</p>
          </div>
          <span class="status-badge-highlight" style="background: rgba(168, 85, 247, 0.15); border-color: #a855f7; color: #e9d5ff;">
            Thousand Cuts Rupture Engine & Preparation
          </span>
        </div>

        <div class="deepdive-talents-grid">
          ${cData.subtlety.talents.map(t => `
            <div class="talent-feature-card ${t.name.includes("Thousand Cuts") || t.name.includes("Serrated Strike") || t.name.includes("Dirty Deeds") || t.name.includes("Preparation") ? 'featured-talent' : ''}">
              <div class="talent-card-top">
                <div>
                  <strong class="talent-name" style="color: ${t.name.includes("Thousand Cuts") ? '#f5d061' : t.name.includes("Dirty Deeds") ? '#c084fc' : '#fff'};">${escapeHtml(t.name)}</strong>
                  <span class="talent-type">${escapeHtml(t.type)}</span>
                </div>
                <span class="deepdive-badge badge-verified"><span>✓</span> Verified</span>
              </div>
              <div class="talent-specs-chips">
                ${t.cast ? `<span class="talent-chip">⏱️ ${escapeHtml(t.cast)}</span>` : ''}
                ${t.cost ? `<span class="talent-chip">🟡 ${escapeHtml(t.cost)}</span>` : ''}
                ${t.cd ? `<span class="talent-chip">⌛ ${escapeHtml(t.cd)}</span>` : ''}
                ${t.duration ? `<span class="talent-chip">⏳ ${escapeHtml(t.duration)}</span>` : ''}
              </div>
              <p class="talent-desc">${escapeHtml(t.desc)}</p>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }


  /**
   * Helper: Open interactive talent modal from Deep Dives
   */

  window.WOW_DEEPDIVES_SPECS = {
    renderCoreRulesSection,
    renderSurvivalSection,
    renderMarksmanshipSection,
    renderBeastMasterySection,
    renderTaurenRacesSection,
    renderEnhancementSection,
    renderShamanTankingSection,
    renderElementalSection,
    renderRestorationSection,
    renderDwarfRacesSection,
    renderArcaneSection,
    renderFireSection,
    renderFrostSection,
    renderOrcMageRacesSection,
    renderHolyPaladinSection,
    renderProtectionPaladinSection,
    renderRetributionPaladinSection,
    renderUndeadPaladinRacesSection,
    renderArmsWarriorSection,
    renderFuryWarriorSection,
    renderProtectionWarriorSection,
    renderHumanWarriorRacesSection,
    renderAfflictionWarlockSection,
    renderDemonologyWarlockSection,
    renderDestructionWarlockSection,
    renderGnomeWarlockRacesSection,
    renderDisciplinePriestSection,
    renderHolyPriestSection,
    renderShadowPriestSection,
    renderNightElfPriestRacesSection,
    renderBalanceDruidSection,
    renderFeralDruidSection,
    renderRestorationDruidSection,
    renderSkyElfDruidRacesSection,
    renderAssassinationRogueSection,
    renderCombatRogueSection,
    renderSubtletyRogueSection,
    renderTrollRogueRacesSection
  };
})();
