/**
 * World of Warcraft: Forever - Class Racial Synergy Section Renderers
 */
(function () {
  "use strict";

  const escapeHtml = window.escapeHtml || (s => String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"));

  function renderTaurenRacesSection(cData) {
    const tData = cData.racialSynergies.taurenDemo;
    const newRaces = cData.racialSynergies.newRaces;

    return `
      <div>
        <!-- Tauren Hands-On Demo Findings -->
        <div class="tauren-demo-block">
          <div class="spec-overview-banner" style="background: rgba(239, 68, 68, 0.08); border-color: rgba(239, 68, 68, 0.3);">
            <div>
              <h4 style="color: #fca5a5; font-size: 1.25rem; margin: 0 0 0.25rem;">${escapeHtml(tData.title)}</h4>
              <p style="font-size: 0.9rem; color: #cbd5e1; margin: 0;">${escapeHtml(tData.subtitle)}</p>
            </div>
            <span class="deepdive-badge badge-demo"><span>🎙️</span> In-Game Stopwatch & Speed Tests</span>
          </div>

          <div class="deepdive-cards-grid" style="margin-top: 1rem;">
            ${tData.items.map(item => `
              <div class="deepdive-rule-card">
                <div class="rule-card-header">
                  <strong class="rule-card-title">${escapeHtml(item.name)}</strong>
                  <span class="deepdive-badge ${item.status === 'demo' ? 'badge-demo' : 'badge-verified'}">
                    ${escapeHtml(item.statusLabel)}
                  </span>
                </div>
                <p class="rule-card-desc" style="margin-top: 0.5rem;">${escapeHtml(item.desc)}</p>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- New Playable Races for Hunter -->
        <div style="margin-top: 2rem;">
          <h4 style="color: var(--text-gold); font-size: 1.15rem; margin-bottom: 0.8rem; display: flex; align-items: center; gap: 0.5rem;">
            <span>🏹</span> New Playable Races for Hunter in WoW Forever
          </h4>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 1rem;">
            ${newRaces.map(r => `
              <div class="deepdive-rule-card" style="border-left: 3px solid ${r.faction === 'Alliance' ? '#3b82f6' : '#a78bfa'};">
                <div class="rule-card-header">
                  <strong class="rule-card-title">${escapeHtml(r.race)}</strong>
                  <span class="deepdive-badge badge-exclusive">${escapeHtml(r.badge)}</span>
                </div>
                <span class="role-pill" style="margin: 0.3rem 0; display: inline-block;">${escapeHtml(r.faction)}</span>
                <p class="rule-card-desc">${escapeHtml(r.desc)}</p>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  }
  function renderDwarfRacesSection(cData) {
    const dData = cData.racialSynergies.dwarfDemo;
    const newRaces = cData.racialSynergies.newRaces;

    return `
      <div>
        <div class="tauren-demo-block">
          <div class="spec-overview-banner" style="background: rgba(59, 130, 246, 0.08); border-color: rgba(59, 130, 246, 0.3);">
            <div>
              <h4 style="color: #93c5fd; font-size: 1.25rem; margin: 0 0 0.25rem;">${escapeHtml(dData.title)}</h4>
              <p style="font-size: 0.9rem; color: #cbd5e1; margin: 0;">${escapeHtml(dData.subtitle)}</p>
            </div>
            <span class="deepdive-badge badge-demo"><span>🎙️</span> Level-38 Dwarf Hands-On Test</span>
          </div>

          <div class="deepdive-cards-grid" style="margin-top: 1rem;">
            ${dData.items.map(item => `
              <div class="deepdive-rule-card">
                <div class="rule-card-header">
                  <strong class="rule-card-title">${escapeHtml(item.name)}</strong>
                  <span class="deepdive-badge badge-verified">${escapeHtml(item.statusLabel)}</span>
                </div>
                <p class="rule-card-desc" style="margin-top: 0.5rem;">${escapeHtml(item.desc)}</p>
              </div>
            `).join('')}
          </div>
        </div>

        <div style="margin-top: 2rem;">
          <h4 style="color: var(--text-gold); font-size: 1.15rem; margin-bottom: 0.8rem; display: flex; align-items: center; gap: 0.5rem;">
            <span>⚡</span> New Playable Races for Shaman in WoW Forever
          </h4>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 1rem;">
            ${newRaces.map(r => `
              <div class="deepdive-rule-card" style="border-left: 3px solid ${r.faction === 'Alliance' ? '#3b82f6' : '#ef4444'};">
                <div class="rule-card-header">
                  <strong class="rule-card-title">${escapeHtml(r.race)}</strong>
                  <span class="deepdive-badge badge-exclusive">${escapeHtml(r.badge)}</span>
                </div>
                <span class="role-pill" style="margin: 0.3rem 0; display: inline-block;">${escapeHtml(r.faction)}</span>
                <p class="rule-card-desc">${escapeHtml(r.desc)}</p>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  }
  function renderOrcMageRacesSection(cData) {
    const oData = cData.racialSynergies.orcDemo;
    const newRaces = cData.racialSynergies.newRaces;

    return `
      <div>
        <div class="tauren-demo-block">
          <div class="spec-overview-banner" style="background: rgba(220, 38, 38, 0.08); border-color: rgba(220, 38, 38, 0.3);">
            <div>
              <h4 style="color: #f87171; font-size: 1.25rem; margin: 0 0 0.25rem;">${escapeHtml(oData.title)}</h4>
              <p style="font-size: 0.9rem; color: #cbd5e1; margin: 0;">${escapeHtml(oData.subtitle)}</p>
            </div>
            <span class="deepdive-badge badge-demo"><span>🎙️</span> Level-38 Orc Hands-On Test</span>
          </div>

          <div class="deepdive-cards-grid" style="margin-top: 1rem;">
            ${oData.items.map(item => `
              <div class="deepdive-rule-card">
                <div class="rule-card-header">
                  <strong class="rule-card-title">${escapeHtml(item.name)}</strong>
                  <span class="deepdive-badge badge-verified">${escapeHtml(item.statusLabel)}</span>
                </div>
                <p class="rule-card-desc" style="margin-top: 0.5rem;">${escapeHtml(item.desc)}</p>
              </div>
            `).join('')}
          </div>
        </div>

        <div style="margin-top: 2rem;">
          <h4 style="color: var(--text-gold); font-size: 1.15rem; margin-bottom: 0.8rem; display: flex; align-items: center; gap: 0.5rem;">
            <span>🔥</span> New Playable Races for Mage in WoW Forever
          </h4>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 1rem;">
            ${newRaces.map(r => `
              <div class="deepdive-rule-card" style="border-left: 3px solid ${r.faction === 'Alliance' ? '#3b82f6' : '#ef4444'};">
                <div class="rule-card-header">
                  <strong class="rule-card-title">${escapeHtml(r.race)}</strong>
                  <span class="deepdive-badge badge-exclusive">${escapeHtml(r.badge)}</span>
                </div>
                <span class="role-pill" style="margin: 0.3rem 0; display: inline-block;">${escapeHtml(r.faction)}</span>
                <p class="rule-card-desc">${escapeHtml(r.desc)}</p>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  }
  function renderUndeadPaladinRacesSection(cData) {
    const uData = cData.racialSynergies.undeadDemo;
    const newRaces = cData.racialSynergies.newRaces;

    return `
      <div>
        <div class="tauren-demo-block">
          <div class="spec-overview-banner" style="background: rgba(168, 85, 247, 0.08); border-color: rgba(168, 85, 247, 0.3);">
            <div>
              <h4 style="color: #c084fc; font-size: 1.25rem; margin: 0 0 0.25rem;">${escapeHtml(uData.title)}</h4>
              <p style="font-size: 0.9rem; color: #cbd5e1; margin: 0;">${escapeHtml(uData.subtitle)}</p>
            </div>
            <span class="deepdive-badge badge-demo"><span>🎙️</span> Level-38 Undead Hands-On Test</span>
          </div>

          <div class="deepdive-cards-grid" style="margin-top: 1rem;">
            ${uData.items.map(item => `
              <div class="deepdive-rule-card">
                <div class="rule-card-header">
                  <strong class="rule-card-title">${escapeHtml(item.name)}</strong>
                  <span class="deepdive-badge badge-verified">${escapeHtml(item.statusLabel)}</span>
                </div>
                <p class="rule-card-desc" style="margin-top: 0.5rem;">${escapeHtml(item.desc)}</p>
              </div>
            `).join('')}
          </div>
        </div>

        <div style="margin-top: 2rem;">
          <h4 style="color: var(--text-gold); font-size: 1.15rem; margin-bottom: 0.8rem; display: flex; align-items: center; gap: 0.5rem;">
            <span>🛡️</span> Playable Races for Paladin in WoW Forever
          </h4>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 1rem;">
            ${newRaces.map(r => `
              <div class="deepdive-rule-card" style="border-left: 3px solid ${r.faction === 'Alliance' ? '#3b82f6' : '#ef4444'};">
                <div class="rule-card-header">
                  <strong class="rule-card-title">${escapeHtml(r.race)}</strong>
                  <span class="deepdive-badge badge-exclusive">${escapeHtml(r.badge)}</span>
                </div>
                <span class="role-pill" style="margin: 0.3rem 0; display: inline-block;">${escapeHtml(r.faction)}</span>
                <p class="rule-card-desc">${escapeHtml(r.desc)}</p>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  }
  function renderHumanWarriorRacesSection(cData) {
    const hData = cData.racialSynergies.humanDemo;
    const newRaces = cData.racialSynergies.newRaces;

    return `
      <div>
        <div class="tauren-demo-block">
          <div class="spec-overview-banner" style="background: rgba(199, 156, 110, 0.08); border-color: rgba(199, 156, 110, 0.3);">
            <div>
              <h4 style="color: #fed7aa; font-size: 1.25rem; margin: 0 0 0.25rem;">${escapeHtml(hData.title)}</h4>
              <p style="font-size: 0.9rem; color: #cbd5e1; margin: 0;">${escapeHtml(hData.subtitle)}</p>
            </div>
            <span class="deepdive-badge badge-demo"><span>🎙️</span> Level-38 Human Hands-On Test</span>
          </div>

          <div class="deepdive-cards-grid" style="margin-top: 1rem;">
            ${hData.items.map(item => `
              <div class="deepdive-rule-card">
                <div class="rule-card-header">
                  <strong class="rule-card-title">${escapeHtml(item.name)}</strong>
                  <span class="deepdive-badge badge-verified">${escapeHtml(item.statusLabel)}</span>
                </div>
                <p class="rule-card-desc" style="margin-top: 0.5rem;">${escapeHtml(item.desc)}</p>
              </div>
            `).join('')}
          </div>
        </div>

        <div style="margin-top: 2rem;">
          <h4 style="color: var(--text-gold); font-size: 1.15rem; margin-bottom: 0.8rem; display: flex; align-items: center; gap: 0.5rem;">
            <span>⚔️</span> Playable Races for Warrior in WoW Forever
          </h4>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 1rem;">
            ${newRaces.map(r => `
              <div class="deepdive-rule-card" style="border-left: 3px solid ${r.faction === 'Alliance' ? '#3b82f6' : '#ef4444'};">
                <div class="rule-card-header">
                  <strong class="rule-card-title">${escapeHtml(r.race)}</strong>
                  <span class="deepdive-badge badge-exclusive">${escapeHtml(r.badge)}</span>
                </div>
                <span class="role-pill" style="margin: 0.3rem 0; display: inline-block;">${escapeHtml(r.faction)}</span>
                <p class="rule-card-desc">${escapeHtml(r.desc)}</p>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  }
  function renderGnomeWarlockRacesSection(cData) {
    const gData = cData.racialSynergies.gnomeDemo;
    const newRaces = cData.racialSynergies.newRaces;

    return `
      <div>
        <div class="tauren-demo-block">
          <div class="spec-overview-banner" style="background: rgba(148, 130, 201, 0.08); border-color: rgba(148, 130, 201, 0.3);">
            <div>
              <h4 style="color: #ddd6fe; font-size: 1.25rem; margin: 0 0 0.25rem;">${escapeHtml(gData.title)}</h4>
              <p style="font-size: 0.9rem; color: #cbd5e1; margin: 0;">${escapeHtml(gData.subtitle)}</p>
            </div>
            <span class="deepdive-badge badge-demo"><span>🎙️</span> Level-38 Gnome Hands-On Test</span>
          </div>

          <div class="deepdive-cards-grid" style="margin-top: 1rem;">
            ${gData.items.map(item => `
              <div class="deepdive-rule-card">
                <div class="rule-card-header">
                  <strong class="rule-card-title">${escapeHtml(item.name)}</strong>
                  <span class="deepdive-badge badge-verified">${escapeHtml(item.statusLabel)}</span>
                </div>
                <p class="rule-card-desc" style="margin-top: 0.5rem;">${escapeHtml(item.desc)}</p>
              </div>
            `).join('')}
          </div>
        </div>

        <div style="margin-top: 2rem;">
          <h4 style="color: var(--text-gold); font-size: 1.15rem; margin-bottom: 0.8rem; display: flex; align-items: center; gap: 0.5rem;">
            <span>🔮</span> Playable Races for Warlock in WoW Forever
          </h4>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 1rem;">
            ${newRaces.map(r => `
              <div class="deepdive-rule-card" style="border-left: 3px solid ${r.faction === 'Alliance' ? '#3b82f6' : '#ef4444'};">
                <div class="rule-card-header">
                  <strong class="rule-card-title">${escapeHtml(r.race)}</strong>
                  <span class="deepdive-badge badge-exclusive">${escapeHtml(r.badge)}</span>
                </div>
                <span class="role-pill" style="margin: 0.3rem 0; display: inline-block;">${escapeHtml(r.faction)}</span>
                <p class="rule-card-desc">${escapeHtml(r.desc)}</p>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  }
  function renderNightElfPriestRacesSection(cData) {
    const nData = cData.racialSynergies.nightElfDemo;
    const newRaces = cData.racialSynergies.newRaces;

    return `
      <div>
        <div class="tauren-demo-block">
          <div class="spec-overview-banner" style="background: rgba(96, 165, 250, 0.08); border-color: rgba(96, 165, 250, 0.3);">
            <div>
              <h4 style="color: #93c5fd; font-size: 1.25rem; margin: 0 0 0.25rem;">${escapeHtml(nData.title)}</h4>
              <p style="font-size: 0.9rem; color: #cbd5e1; margin: 0;">${escapeHtml(nData.subtitle)}</p>
            </div>
            <span class="deepdive-badge badge-demo"><span>🎙️</span> Level-38 Night Elf Hands-On Test</span>
          </div>

          <div class="deepdive-cards-grid" style="margin-top: 1rem;">
            ${nData.items.map(item => `
              <div class="deepdive-rule-card">
                <div class="rule-card-header">
                  <strong class="rule-card-title">${escapeHtml(item.name)}</strong>
                  <span class="deepdive-badge badge-verified">${escapeHtml(item.statusLabel)}</span>
                </div>
                <p class="rule-card-desc" style="margin-top: 0.5rem;">${escapeHtml(item.desc)}</p>
              </div>
            `).join('')}
          </div>
        </div>

        <div style="margin-top: 2rem;">
          <h4 style="color: var(--text-gold); font-size: 1.15rem; margin-bottom: 0.8rem; display: flex; align-items: center; gap: 0.5rem;">
            <span>✨</span> Playable Races for Priest in WoW Forever
          </h4>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 1rem;">
            ${newRaces.map(r => `
              <div class="deepdive-rule-card" style="border-left: 3px solid ${r.faction === 'Alliance' ? '#3b82f6' : '#ef4444'};">
                <div class="rule-card-header">
                  <strong class="rule-card-title">${escapeHtml(r.race)}</strong>
                  <span class="deepdive-badge badge-exclusive">${escapeHtml(r.badge)}</span>
                </div>
                <span class="role-pill" style="margin: 0.3rem 0; display: inline-block;">${escapeHtml(r.faction)}</span>
                <p class="rule-card-desc">${escapeHtml(r.desc)}</p>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  }
  function renderSkyElfDruidRacesSection(cData) {
    const sData = cData.racialSynergies.skyElfDemo;
    const newRaces = cData.racialSynergies.newRaces;

    return `
      <div>
        <div class="tauren-demo-block">
          <div class="spec-overview-banner" style="background: rgba(56, 189, 248, 0.08); border-color: rgba(56, 189, 248, 0.3);">
            <div>
              <h4 style="color: #38bdf8; font-size: 1.25rem; margin: 0 0 0.25rem;">${escapeHtml(sData.title)}</h4>
              <p style="font-size: 0.9rem; color: #cbd5e1; margin: 0;">${escapeHtml(sData.subtitle)}</p>
            </div>
            <span class="deepdive-badge badge-demo"><span>🎙️</span> Level-38 Sky Elf Hands-On Test</span>
          </div>

          <div class="deepdive-cards-grid" style="margin-top: 1rem;">
            ${sData.items.map(item => `
              <div class="deepdive-rule-card">
                <div class="rule-card-header">
                  <strong class="rule-card-title">${escapeHtml(item.name)}</strong>
                  <span class="deepdive-badge badge-verified">${escapeHtml(item.statusLabel)}</span>
                </div>
                <p class="rule-card-desc" style="margin-top: 0.5rem;">${escapeHtml(item.desc)}</p>
              </div>
            `).join('')}
          </div>
        </div>

        <div style="margin-top: 2rem;">
          <h4 style="color: var(--text-gold); font-size: 1.15rem; margin-bottom: 0.8rem; display: flex; align-items: center; gap: 0.5rem;">
            <span>🌿</span> Playable Races for Druid in WoW Forever
          </h4>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 1rem;">
            ${newRaces.map(r => `
              <div class="deepdive-rule-card" style="border-left: 3px solid ${r.faction.includes('Neutral') ? '#10b981' : r.faction === 'Alliance' ? '#3b82f6' : '#ef4444'};">
                <div class="rule-card-header">
                  <strong class="rule-card-title">${escapeHtml(r.race)}</strong>
                  <span class="deepdive-badge badge-exclusive">${escapeHtml(r.badge)}</span>
                </div>
                <span class="role-pill" style="margin: 0.3rem 0; display: inline-block;">${escapeHtml(r.faction)}</span>
                <p class="rule-card-desc">${escapeHtml(r.desc)}</p>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  }
  function renderTrollRogueRacesSection(cData) {
    const tData = cData.racialSynergies.trollDemo;
    const newRaces = cData.racialSynergies.newRaces;

    return `
      <div>
        <div class="tauren-demo-block">
          <div class="spec-overview-banner" style="background: rgba(245, 240, 105, 0.08); border-color: rgba(245, 240, 105, 0.3);">
            <div>
              <h4 style="color: #fef08a; font-size: 1.25rem; margin: 0 0 0.25rem;">${escapeHtml(tData.title)}</h4>
              <p style="font-size: 0.9rem; color: #cbd5e1; margin: 0;">${escapeHtml(tData.subtitle)}</p>
            </div>
            <span class="deepdive-badge badge-demo"><span>🎙️</span> Level-38 Troll Hands-On Test</span>
          </div>

          <div class="deepdive-cards-grid" style="margin-top: 1rem;">
            ${tData.items.map(item => `
              <div class="deepdive-rule-card">
                <div class="rule-card-header">
                  <strong class="rule-card-title">${escapeHtml(item.name)}</strong>
                  <span class="deepdive-badge badge-verified">${escapeHtml(item.statusLabel)}</span>
                </div>
                <p class="rule-card-desc" style="margin-top: 0.5rem;">${escapeHtml(item.desc)}</p>
              </div>
            `).join('')}
          </div>
        </div>

        <div style="margin-top: 2rem;">
          <h4 style="color: var(--text-gold); font-size: 1.15rem; margin-bottom: 0.8rem; display: flex; align-items: center; gap: 0.5rem;">
            <span>🗡️</span> Playable Races for Rogue in WoW Forever
          </h4>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 1rem;">
            ${newRaces.map(r => `
              <div class="deepdive-rule-card" style="border-left: 3px solid ${r.faction === 'Alliance' ? '#3b82f6' : '#ef4444'};">
                <div class="rule-card-header">
                  <strong class="rule-card-title">${escapeHtml(r.race)}</strong>
                  <span class="deepdive-badge badge-exclusive">${escapeHtml(r.badge)}</span>
                </div>
                <span class="role-pill" style="margin: 0.3rem 0; display: inline-block;">${escapeHtml(r.faction)}</span>
                <p class="rule-card-desc">${escapeHtml(r.desc)}</p>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  }

  window.WOW_DEEPDIVES_RACES = {
    renderTaurenRacesSection,
    renderDwarfRacesSection,
    renderOrcMageRacesSection,
    renderUndeadPaladinRacesSection,
    renderHumanWarriorRacesSection,
    renderGnomeWarlockRacesSection,
    renderNightElfPriestRacesSection,
    renderSkyElfDruidRacesSection,
    renderTrollRogueRacesSection,
  };
})();
