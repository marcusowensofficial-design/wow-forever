/**
 * World of Warcraft: Forever - Class Progression Sub-Module
 * Handles 1-60 Spellbooks, Level-by-Level Weapon Paths, 1-Click Copyable Macros,
 * and Leveling Milestones across all 9 classes.
 */

(function() {
  'use strict';

  const escapeHtml = window.escapeHtml || (s => String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"));

  // State
  let activeSpellFilterLevel = 'all';
  let activeSpellSearchQuery = '';
  let activeWeaponTrack = {};
  let activeMacroCategory = 'all';
  let activeMacroSearchQuery = '';

  function getIconUrl(icon) {
    const clean = (icon || 'inv_misc_questionmark').replace(/\.(jpg|png|webp)$/i, '');
    return `https://wow.zamimg.com/images/wow/icons/medium/${clean}.jpg`;
  }

  // 1. Spellbook Renderer
  function renderSpellbook(classId) {
    const data = window.WOW_PROGRESSION_DATA?.spellbooks?.[classId];
    if (!data || !data.levels || data.levels.length === 0) {
      return `
        <div class="progression-empty-state">
          <p>⚠️ No spellbook data available for this class in current Beta Build.</p>
        </div>
      `;
    }

    const levelTiers = [
      { id: 'all', label: 'All Levels (1–60)' },
      { id: '1-10', label: 'Levels 1–10', min: 1, max: 10 },
      { id: '11-20', label: 'Levels 11–20', min: 11, max: 20 },
      { id: '21-30', label: 'Levels 21–30', min: 21, max: 30 },
      { id: '31-40', label: 'Levels 31–40', min: 31, max: 40 },
      { id: '41-50', label: 'Levels 41–50', min: 41, max: 50 },
      { id: '51-60', label: 'Levels 51–60', min: 51, max: 60 }
    ];

    let filteredLevels = data.levels;
    if (activeSpellFilterLevel !== 'all') {
      const tier = levelTiers.find(t => t.id === activeSpellFilterLevel);
      if (tier) {
        filteredLevels = filteredLevels.filter(lvl => lvl.level >= tier.min && lvl.level <= tier.max);
      }
    }

    const q = activeSpellSearchQuery.trim().toLowerCase();

    return `
      <div class="progression-section-wrap">
        <div class="progression-header-banner">
          <div class="progression-header-info">
            <h3><span>📖</span> 1–60 Class Spellbook & Ability Ranks</h3>
            <p>Every ability, spell rank, and passive trained from your Class Trainer from Level 1 to 60 in WoW Forever.</p>
          </div>
          <div class="progression-header-badge">Build 70425 Verified</div>
        </div>

        <!-- Controls Bar -->
        <div class="progression-controls-bar">
          <div class="progression-filter-chips" id="spellbook-tier-chips">
            ${levelTiers.map(t => `
              <button type="button" class="progression-chip ${activeSpellFilterLevel === t.id ? 'active' : ''}" data-tier="${t.id}">
                ${t.label}
              </button>
            `).join('')}
          </div>
          <div class="progression-search-box">
            <input type="text" id="spellbook-search-input" placeholder="Search spells or schools..." value="${escapeHtml(activeSpellSearchQuery)}" aria-label="Search spells" />
            ${activeSpellSearchQuery ? `<button type="button" id="btn-clear-spell-search" class="btn-clear-search">✕</button>` : ''}
          </div>
        </div>

        <!-- Levels Timeline Grid -->
        <div class="spellbook-levels-container">
          ${filteredLevels.map(lvl => {
            const matchingSpells = lvl.spells.filter(sp => {
              if (!q) return true;
              return sp.name.toLowerCase().includes(q) || sp.school.toLowerCase().includes(q) || sp.desc.toLowerCase().includes(q);
            });

            if (matchingSpells.length === 0) return '';

            return `
              <div class="spellbook-level-block">
                <div class="spellbook-level-header">
                  <div class="spellbook-level-badge">Level ${lvl.level}</div>
                  ${lvl.note ? `<span class="spellbook-level-note">${escapeHtml(lvl.note)}</span>` : ''}
                  <span class="spellbook-count-badge">${matchingSpells.length} ${matchingSpells.length === 1 ? 'Spell' : 'Spells'}</span>
                </div>
                <div class="spellbook-cards-grid">
                  ${matchingSpells.map(spell => `
                    <div class="spellbook-card">
                      <div class="spellbook-card-top">
                        <img class="spellbook-card-icon" src="${getIconUrl(spell.icon)}" alt="${escapeHtml(spell.name)}" loading="lazy" />
                        <div class="spellbook-card-meta">
                          <div class="spellbook-card-title">${escapeHtml(spell.name)}</div>
                          <span class="spellbook-school-badge">${escapeHtml(spell.school)}</span>
                        </div>
                      </div>
                      ${spell.desc ? `<div class="spellbook-card-desc">${escapeHtml(spell.desc)}</div>` : ''}
                    </div>
                  `).join('')}
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;
  }

  // 2. Weapon Progression Renderer
  function renderWeapons(classId) {
    const data = window.WOW_PROGRESSION_DATA?.weapons?.[classId];
    if (!data || !data.levels || data.levels.length === 0) {
      return `
        <div class="progression-empty-state">
          <p>⚠️ No weapon progression roadmap recorded for this class yet.</p>
        </div>
      `;
    }

    const currentTrack = activeWeaponTrack[classId] || data.tracks?.[0]?.id || 'primary';

    return `
      <div class="progression-section-wrap">
        <div class="progression-header-banner">
          <div class="progression-header-info">
            <h3><span>⚔️</span> Level 1 to 60 Weapon Upgrade Path</h3>
            <p>Optimal weapon progression every 2–4 levels: exact quest rewards, dungeon boss drops, vendor purchases, and craftable spikes.</p>
          </div>
          <div class="progression-header-badge">${data.levels.length} Progression Steps</div>
        </div>

        ${data.tracks && data.tracks.length > 1 ? `
          <div class="progression-track-tabs">
            <span class="track-tab-label">Weapon Track:</span>
            ${data.tracks.map(tr => `
              <button type="button" class="progression-track-btn ${currentTrack === tr.id ? 'active' : ''}" data-track="${tr.id}">
                ${escapeHtml(tr.name)}
              </button>
            `).join('')}
          </div>
        ` : ''}

        <!-- Weapon Timeline Grid -->
        <div class="weapon-timeline-container">
          ${data.levels.map((step, idx) => {
            const sourceKindClass = `source-${step.source?.kind || 'drop'}`;
            const wowheadUrl = step.itemId ? `https://www.wowhead.com/forever/item=${step.itemId}` : '#';

            return `
              <div class="weapon-step-card">
                <div class="weapon-step-bracket">
                  <span class="bracket-num">Lvl ${escapeHtml(step.levelBracket)}</span>
                  <span class="step-seq">#${idx + 1}</span>
                </div>

                <div class="weapon-main-content">
                  <div class="weapon-item-hero">
                    <a href="${wowheadUrl}" target="_blank" rel="noopener noreferrer" class="weapon-icon-link">
                      <img src="${getIconUrl(step.icon)}" alt="${escapeHtml(step.name)}" class="weapon-icon" loading="lazy" />
                    </a>
                    <div class="weapon-item-info">
                      <div class="weapon-item-header">
                        <a href="${wowheadUrl}" target="_blank" rel="noopener noreferrer" class="weapon-title-link">
                          ${escapeHtml(step.name)}
                        </a>
                        <span class="weapon-type-badge">${escapeHtml(step.weaponType)}</span>
                      </div>
                      <div class="weapon-stats-row">
                        ${step.speed ? `<span class="stat-pill">Speed: ${escapeHtml(step.speed)}</span>` : ''}
                        ${step.dps ? `<span class="stat-pill dps-pill">DPS: ${escapeHtml(step.dps)}</span>` : ''}
                      </div>
                    </div>
                  </div>

                  <div class="weapon-source-block ${sourceKindClass}">
                    <span class="source-tag">${escapeHtml((step.source?.kind || 'drop').toUpperCase())}</span>
                    <span class="source-title"><strong>${escapeHtml(step.source?.title || 'Unknown Source')}</strong></span>
                    ${step.source?.detail ? `<span class="source-detail">${escapeHtml(step.source.detail)}</span>` : ''}
                  </div>

                  ${step.alts && step.alts.length > 0 ? `
                    <div class="weapon-alts-block">
                      <span class="alts-label">Alternative Upgrades:</span>
                      <div class="alts-tags">
                        ${step.alts.map(alt => {
                          const altUrl = alt.itemId ? `https://www.wowhead.com/forever/item=${alt.itemId}` : null;
                          return `
                            <span class="alt-tag">
                              ${altUrl ? `
                                <a href="${altUrl}" target="_blank" rel="noopener noreferrer" class="alt-link">
                                  ${escapeHtml(alt.name)}
                                </a>
                              ` : `
                                <span class="alt-name">${escapeHtml(alt.name)}</span>
                              `}
                              ${alt.value ? `<span class="alt-val">(${escapeHtml(alt.value)})</span>` : ''}
                            </span>
                          `;
                        }).join('')}
                      </div>
                    </div>
                  ` : ''}
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;
  }

  // 3. Macros Renderer
  function renderMacros(classId) {
    const macros = window.WOW_PROGRESSION_DATA?.macros?.[classId] || [];
    if (macros.length === 0) {
      return `
        <div class="progression-empty-state">
          <p>⚠️ No macros recorded for this class yet.</p>
        </div>
      `;
    }

    const categories = ['all', 'Combat', 'Mouseover', 'Pet Control', 'General'];
    const filteredMacros = macros.filter(m => {
      if (activeMacroCategory !== 'all' && m.category !== activeMacroCategory) {
        return false;
      }
      if (activeMacroSearchQuery) {
        const q = activeMacroSearchQuery.toLowerCase();
        return m.title.toLowerCase().includes(q) || m.code.toLowerCase().includes(q) || m.desc.toLowerCase().includes(q);
      }
      return true;
    });

    return `
      <div class="progression-section-wrap">
        <div class="progression-header-banner">
          <div class="progression-header-info">
            <h3><span>📜</span> 1-Click Copyable Class & Spec Macros</h3>
            <p>Battle-tested macros for PvE rotations, mouseover healing, stance management, pet control, and PvP burst modifiers.</p>
          </div>
          <div class="progression-header-badge">${macros.length} Macros Available</div>
        </div>

        <div class="progression-controls-bar">
          <div class="progression-filter-chips" id="macro-category-chips">
            ${categories.map(cat => `
              <button type="button" class="progression-chip ${activeMacroCategory === cat ? 'active' : ''}" data-cat="${cat}">
                ${cat === 'all' ? 'All Macros' : cat}
              </button>
            `).join('')}
          </div>
          <div class="progression-search-box">
            <input type="text" id="macro-search-input" placeholder="Search macros..." value="${escapeHtml(activeMacroSearchQuery)}" aria-label="Search macros" />
            ${activeMacroSearchQuery ? `<button type="button" id="btn-clear-macro-search" class="btn-clear-search">✕</button>` : ''}
          </div>
        </div>

        <!-- Macro Cards Grid -->
        <div class="macro-cards-grid">
          ${filteredMacros.map(macro => `
            <div class="macro-card">
              <div class="macro-card-header">
                <div>
                  <h4 class="macro-card-title">${escapeHtml(macro.title)}</h4>
                  <span class="macro-category-badge">${escapeHtml(macro.category)}</span>
                </div>
                <button type="button" class="btn-copy-macro" data-code="${escapeHtml(macro.code)}">
                  <span>📋</span> Copy Macro
                </button>
              </div>

              ${macro.desc ? `<p class="macro-card-desc">${escapeHtml(macro.desc)}</p>` : ''}

              <div class="macro-code-wrapper">
                <pre class="macro-code-block"><code>${escapeHtml(macro.code)}</code></pre>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  // 4. Milestones Renderer
  function renderMilestones(classId) {
    const brackets = window.WOW_PROGRESSION_DATA?.milestones?.[classId] || [];
    if (brackets.length === 0) {
      return `
        <div class="progression-empty-state">
          <p>⚠️ No milestones recorded for this class yet.</p>
        </div>
      `;
    }

    return `
      <div class="progression-section-wrap">
        <div class="progression-header-banner">
          <div class="progression-header-info">
            <h3><span>🗺️</span> 1 to 60 Leveling Milestones & Class Quests</h3>
            <p>Every critical quest unlock, form training, totem trial, mount speed milestone, and dungeon tier progression from Level 1 to 60.</p>
          </div>
          <div class="progression-header-badge">Interactive Roadmap</div>
        </div>

        <div class="milestones-timeline-grid">
          ${brackets.map((b, idx) => `
            <div class="milestone-bracket-card">
              <div class="milestone-bracket-header">
                <div class="milestone-step-marker">${idx + 1}</div>
                <div class="milestone-bracket-title">
                  <h4>Level ${escapeHtml(b.bracket)}: ${escapeHtml(b.title)}</h4>
                </div>
              </div>
              <ul class="milestone-items-list">
                ${b.universal.map((item, itemIdx) => {
                  const checkId = `milestone-${classId}-${idx}-${itemIdx}`;
                  return `
                    <li class="milestone-check-item">
                      <label class="milestone-label" for="${checkId}">
                        <input type="checkbox" id="${checkId}" class="milestone-checkbox" data-milestone-key="${checkId}" />
                        <span class="milestone-text">${escapeHtml(item)}</span>
                      </label>
                    </li>
                  `;
                }).join('')}
              </ul>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  // Master Subtab Dispatcher
  function renderProgressionSubtab(subtab, cData) {
    const classId = cData.id;
    if (subtab === 'spellbook') return renderSpellbook(classId);
    if (subtab === 'weapons') return renderWeapons(classId);
    if (subtab === 'macros') return renderMacros(classId);
    if (subtab === 'milestones') return renderMilestones(classId);
    return '';
  }

  // Setup Event Listeners
  function setupEventListeners() {
    // 1. Spellbook filters
    document.querySelectorAll('#spellbook-tier-chips .progression-chip').forEach(btn => {
      btn.addEventListener('click', () => {
        activeSpellFilterLevel = btn.getAttribute('data-tier');
        window.renderDeepDiveContent?.();
      });
    });

    const spellSearchInput = document.getElementById('spellbook-search-input');
    if (spellSearchInput) {
      spellSearchInput.addEventListener('input', (e) => {
        activeSpellSearchQuery = e.target.value;
        window.renderDeepDiveContent?.();
      });
    }

    const clearSpellSearch = document.getElementById('btn-clear-spell-search');
    if (clearSpellSearch) {
      clearSpellSearch.addEventListener('click', () => {
        activeSpellSearchQuery = '';
        window.renderDeepDiveContent?.();
      });
    }

    // 2. Weapon track buttons
    document.querySelectorAll('.progression-track-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const track = btn.getAttribute('data-track');
        const cId = window.selectedDeepDiveClassId || 'hunter';
        activeWeaponTrack[cId] = track;
        window.renderDeepDiveContent?.();
      });
    });

    // 3. Macro category filters & copy button
    document.querySelectorAll('#macro-category-chips .progression-chip').forEach(btn => {
      btn.addEventListener('click', () => {
        activeMacroCategory = btn.getAttribute('data-cat');
        window.renderDeepDiveContent?.();
      });
    });

    const macroSearchInput = document.getElementById('macro-search-input');
    if (macroSearchInput) {
      macroSearchInput.addEventListener('input', (e) => {
        activeMacroSearchQuery = e.target.value;
        window.renderDeepDiveContent?.();
      });
    }

    const clearMacroSearch = document.getElementById('btn-clear-macro-search');
    if (clearMacroSearch) {
      clearMacroSearch.addEventListener('click', () => {
        activeMacroSearchQuery = '';
        window.renderDeepDiveContent?.();
      });
    }

    // Copy macro action
    document.querySelectorAll('.btn-copy-macro').forEach(btn => {
      btn.addEventListener('click', async () => {
        const code = btn.getAttribute('data-code');
        if (code) {
          try {
            await (window.copyTextToClipboard ? window.copyTextToClipboard(code) : navigator.clipboard.writeText(code));
            const originalText = btn.innerHTML;
            btn.innerHTML = '<span>✓</span> Copied!';
            btn.classList.add('copied');
            if (window.showToast) window.showToast('Macro copied to clipboard!');
            setTimeout(() => {
              btn.innerHTML = originalText;
              btn.classList.remove('copied');
            }, 2000);
          } catch {
            if (window.showToast) window.showToast('Failed to copy macro.');
          }
        }
      });
    });

    // 4. Milestone persistent checkboxes
    document.querySelectorAll('.milestone-checkbox').forEach(cb => {
      const key = cb.getAttribute('data-milestone-key');
      const saved = localStorage.getItem(`wow_milestone_${key}`);
      if (saved === '1') cb.checked = true;

      cb.addEventListener('change', () => {
        if (cb.checked) {
          localStorage.setItem(`wow_milestone_${key}`, '1');
        } else {
          localStorage.removeItem(`wow_milestone_${key}`);
        }
      });
    });
  }

  // Export module
  window.WOW_DEEPDIVES_PROGRESSION = {
    renderProgressionSubtab,
    setupEventListeners
  };

})();
