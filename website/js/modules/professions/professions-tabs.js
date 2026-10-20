/**
 * World of Warcraft: Forever - Professions Feature Subtabs
 * Specializations, Containers, Role Pairing Wizard, Master Trainers, Camping Hub, Favor, Fishing
 */
(function () {
  "use strict";

  const core = window.WOW_PROFESSIONS_CORE || {};
  const escapeHtml = core.escapeHtml || window.escapeHtml || (s => String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"));
  const getIconUrl = core.getIconUrl || ((icon) => "https://wow.zamimg.com/images/wow/icons/medium/" + (icon || "inv_misc_questionmark") + ".jpg");
  const getProfessionPassive = core.getProfessionPassive || (() => null);
  const formatWaypointsInHtml = core.formatWaypointsInHtml || (h => h);

  const WOW_TRAINERS_DATA = window.WOW_TRAINERS_DATA || [];
  const CONTAINERS_DATA = window.CONTAINERS_DATA || {};
  const SPECIALIZATIONS_DATA = window.SPECIALIZATIONS_DATA || {};
  const PAIRING_WIZARD_DATA = window.PAIRING_WIZARD_DATA || [];
  const FISHING_SCHEDULE_DATA = window.FISHING_SCHEDULE_DATA || {};

  let activeContainerType = "all";
  let activeRolePairing = "tank";
  let trainerFactionFilter = "all";
  let trainerRankFilter = "all";
  let trainerProfFilter = "all";
  let trainerZoneFilter = "all";
  let trainerSearchQuery = "";
  let searchQuery = "";

  function attachTooltipListeners(container, prof) {
    if (window.WOW_PROFESSIONS_MODAL && window.WOW_PROFESSIONS_MODAL.attachTooltipListeners) {
      window.WOW_PROFESSIONS_MODAL.attachTooltipListeners(container, prof);
    }
  }

  function renderSpecializationsTab(container, prof) {
    const specData = SPECIALIZATIONS_DATA[prof.slug];
    if (!specData) {
      container.innerHTML = `<div style="text-align: center; padding: 3rem; color: #94a3b8;">No specializations available for this profession.</div>`;
      return;
    }

    const savedChecked = JSON.parse(localStorage.getItem(`wowforever_specs_${prof.slug}`) || '{}');

    container.innerHTML = `
      <div class="leveling-header-block">
        <div class="leveling-header-title">
          <h3>
            ${escapeHtml(prof.name)} Specializations
            <span class="beta-cap-tag" style="${specData.isBetaActive ? 'background: rgba(34, 197, 94, 0.2); border-color: #22c55e; color: #86efac;' : 'background: rgba(239, 68, 68, 0.2); border-color: #ef4444; color: #fca5a5;'}">
              ${escapeHtml(specData.phaseNote)}
            </span>
          </h3>
          <p>Explore exclusive crafts, side-by-side spec comparison, quest turn-in checklists, and master trainers.</p>
        </div>
      </div>

      <div class="specs-grid-layout ${specData.specs.length === 3 ? 'cols-3' : 'cols-2'}">
        ${specData.specs.map(spec => `
          <div class="spec-card" data-spec-id="${spec.id}">
            <div class="spec-card-header">
              <img src="${getIconUrl(spec.icon)}" alt="${escapeHtml(spec.name)}" class="spec-card-icon" />
              <div>
                <h4 class="spec-card-title">${escapeHtml(spec.name)}</h4>
                <div class="spec-card-archetype">${escapeHtml(spec.archetype)}</div>
              </div>
            </div>

            <div class="spec-trainer-box">
              <span class="spec-section-label">📍 Master Trainer &amp; Location:</span>
              <div class="spec-trainer-text">${formatWaypointsInHtml(escapeHtml(spec.trainer))}</div>
            </div>

            <div class="spec-quest-box">
              <span class="spec-section-label">📋 Quest Turn-In Checklist: <em>${escapeHtml(spec.questName)}</em></span>
              <div class="spec-checklist-items">
                ${spec.questTurnIns.map(mat => {
                  const checkKey = `${spec.id}_${mat.name.toLowerCase().replace(/[^a-z0-9]/g, '')}`;
                  const isChecked = Boolean(savedChecked[checkKey]);
                  return `
                    <label class="spec-check-item ${isChecked ? 'completed' : ''}" data-check-key="${checkKey}">
                      <input type="checkbox" class="spec-checkbox" ${isChecked ? 'checked' : ''} data-check-key="${checkKey}" />
                      <img src="${getIconUrl(mat.icon, mat.name)}" alt="${escapeHtml(mat.name)}" class="spec-check-icon" />
                      <span class="spec-check-name">${mat.count}x ${escapeHtml(mat.name)}</span>
                      <button type="button" class="spec-mat-lookup-btn" data-reagent-name="${escapeHtml(mat.name)}" title="Look up where to get ${escapeHtml(mat.name)}">🔍</button>
                    </label>
                  `;
                }).join('')}
              </div>
            </div>

            <div class="spec-crafts-box">
              <span class="spec-section-label">⭐ Signature &amp; Exclusive Crafts:</span>
              <div class="spec-crafts-list">
                ${spec.crafts.map(cr => `
                  <div class="spec-craft-row">
                    <img src="${getIconUrl(cr.icon, cr.name)}" alt="${escapeHtml(cr.name)}" class="spec-craft-icon q${cr.quality || 2}" />
                    <div class="spec-craft-info">
                      <div class="spec-craft-name q${cr.quality || 2}">${escapeHtml(cr.name)}</div>
                      <div class="spec-craft-effect">${escapeHtml(cr.effect)}</div>
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    `;

    container.querySelectorAll('.spec-checkbox').forEach(cb => {
      cb.addEventListener('change', () => {
        const key = cb.getAttribute('data-check-key');
        savedChecked[key] = cb.checked;
        localStorage.setItem(`wowforever_specs_${prof.slug}`, JSON.stringify(savedChecked));
        const row = cb.closest('.spec-check-item');
        if (row) row.classList.toggle('completed', cb.checked);
      });
    });

    container.querySelectorAll('.spec-mat-lookup-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const matName = btn.getAttribute('data-reagent-name');
        if (matName && window.WOW_PROFESSIONS_MODAL && window.WOW_PROFESSIONS_MODAL.openReverseReagentLookup) {
          window.WOW_PROFESSIONS_MODAL.openReverseReagentLookup(matName);
        }
      });
    });
  }

  /* ==========================================================================
     SUBTAB: CONTAINERS, BAGS & QUIVERS COMPENDIUM (TAILORING & LEATHERWORKING)
     ========================================================================== */
  function renderContainersTab(container, prof) {
    const contData = CONTAINERS_DATA[prof.slug];
    if (!contData) {
      container.innerHTML = `<div style="text-align: center; padding: 3rem; color: #94a3b8;">No containers recorded for this profession.</div>`;
      return;
    }

    const isTailoring = prof.slug === 'tailoring';

    let itemsToDisplay;
    if (isTailoring) {
      if (activeContainerType === 'general') itemsToDisplay = contData.generalBags;
      else if (activeContainerType === 'reagent') itemsToDisplay = contData.reagentBags;
      else if (activeContainerType === 'specialty') itemsToDisplay = contData.specialtyBags;
      else itemsToDisplay = [...contData.generalBags, ...contData.reagentBags, ...contData.specialtyBags];
    } else {
      if (activeContainerType === 'quivers') itemsToDisplay = contData.quivers;
      else if (activeContainerType === 'pouches') itemsToDisplay = contData.pouches;
      else if (activeContainerType === 'reagent') itemsToDisplay = contData.reagentBags;
      else itemsToDisplay = [...contData.quivers, ...contData.pouches, ...contData.reagentBags];
    }

    container.innerHTML = `
      <div class="leveling-header-block">
        <div class="leveling-header-title">
          <h3>
            ${isTailoring ? 'Containers, Custom Reagent Bags & Specialty Packs' : 'Quivers, Ammo Pouches & Leather Bags'}
            <span class="beta-cap-tag" style="background: rgba(14, 116, 144, 0.2); border-color: #0284c7; color: #38bdf8;">
              ${isTailoring ? 'Mooncloth Verified 18-Slot' : 'Attack Speed Bonus Up to +15%'}
            </span>
          </h3>
          <p>${isTailoring ? 'Craft general inventory bags, 8 custom WoW Forever trade reagent bags, and high-capacity soul, herb, and enchanting specialty containers.' : 'Craft Hunter quivers and ammo pouches granting passive attack speed bonuses (+10% to +13%), and custom leather reagent pouches.'}</p>
        </div>
      </div>

      <div class="prof-category-chips" style="margin-bottom: 1.25rem;">
        <button type="button" class="prof-cat-chip ${activeContainerType === 'all' ? 'active' : ''}" data-cont-type="all">
          All (${isTailoring ? contData.generalBags.length + contData.reagentBags.length + contData.specialtyBags.length : contData.quivers.length + contData.pouches.length + contData.reagentBags.length})
        </button>
        ${isTailoring ? `
          <button type="button" class="prof-cat-chip ${activeContainerType === 'general' ? 'active' : ''}" data-cont-type="general">
            🎒 General Bags (${contData.generalBags.length})
          </button>
          <button type="button" class="prof-cat-chip ${activeContainerType === 'reagent' ? 'active' : ''}" data-cont-type="reagent">
            ✨ Custom Reagent Bags (${contData.reagentBags.length})
          </button>
          <button type="button" class="prof-cat-chip ${activeContainerType === 'specialty' ? 'active' : ''}" data-cont-type="specialty">
            🔮 Specialty Bags (${contData.specialtyBags.length})
          </button>
        ` : `
          <button type="button" class="prof-cat-chip ${activeContainerType === 'quivers' ? 'active' : ''}" data-cont-type="quivers">
            🏹 Quivers (${contData.quivers.length})
          </button>
          <button type="button" class="prof-cat-chip ${activeContainerType === 'pouches' ? 'active' : ''}" data-cont-type="pouches">
            🔫 Ammo Pouches (${contData.pouches.length})
          </button>
          <button type="button" class="prof-cat-chip ${activeContainerType === 'reagent' ? 'active' : ''}" data-cont-type="reagent">
            ✨ Reagent Pouches (${contData.reagentBags.length})
          </button>
        `}
      </div>

      <div class="containers-grid">
        ${itemsToDisplay.map(item => `
          <div class="container-card">
            <div class="container-card-header">
              <img src="${getIconUrl(item.icon)}" alt="${escapeHtml(item.name)}" class="container-icon q${item.quality || 1}" />
              <div class="container-info">
                <h4 class="container-name q${item.quality || 1}">
                  ${escapeHtml(item.name)}
                  ${item.isForeverVerified ? '<span class="verified-tag">18-Slot Verified</span>' : ''}
                </h4>
                <div class="container-badges-row">
                  <span class="container-slot-pill">${item.slots} Slots</span>
                  ${item.speed ? `<span class="container-speed-pill">⚡ ${item.speed} Attack Speed</span>` : ''}
                  ${item.type ? `<span class="container-type-pill">${escapeHtml(item.type)}</span>` : ''}
                  <span class="container-req-pill">Skill ${item.skill}</span>
                </div>
              </div>
            </div>

            <p class="container-desc">${escapeHtml(item.desc)}</p>

            <div class="container-reagents-box">
              <span class="container-source-text"><strong>Source:</strong> ${formatWaypointsInHtml(escapeHtml(item.source))}</span>
              <div class="container-reagents-list">
                ${(item.reagents || []).map(mat => `
                  <span class="reagent-chip" title="${escapeHtml(mat.name)}" data-item-name="${escapeHtml(mat.name)}" style="cursor: pointer;">
                    <img src="${getIconUrl(mat.icon, mat.name)}" alt="${escapeHtml(mat.name)}" />
                    <span class="reagent-count">${mat.count}x</span>
                    <span>${escapeHtml(mat.name)}</span>
                  </span>
                `).join('')}
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    `;

    container.querySelectorAll('.prof-cat-chip').forEach(btn => {
      btn.addEventListener('click', () => {
        activeContainerType = btn.getAttribute('data-cont-type');
        renderContainersTab(container, prof);
      });
    });

    container.querySelectorAll('.reagent-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        const name = chip.getAttribute('data-item-name');
        if (name && window.WOW_PROFESSIONS_MODAL && window.WOW_PROFESSIONS_MODAL.openReverseReagentLookup) {
          window.WOW_PROFESSIONS_MODAL.openReverseReagentLookup(name);
        }
      });
    });
  }

  function renderPairingDetailsCard(activePair) {
    return `
      <div class="pairing-details-card">
        <div class="pairing-details-head">
          <div>
            <div class="pairing-role-label">Recommended for: <strong>${escapeHtml(activePair.roleName)}</strong></div>
            <h3 class="pairing-primary-title">⭐ Optimal Choice: ${escapeHtml(activePair.primaryPair)}</h3>
            <div class="pairing-alt-title">Alternative Option: <strong>${escapeHtml(activePair.altPair)}</strong></div>
          </div>
          <div class="pairing-synergy-stars" title="Synergy Rating: ${activePair.synergyStars}">
            <span class="stars-val">${activePair.synergyStars}</span>
            <span class="stars-lbl">Synergy Rating</span>
          </div>
        </div>

        <div class="pairing-perks-grid">
          <div class="pairing-perk-box combat">
            <span class="perk-box-tag">✨ COMBINED COMBAT PASSIVES</span>
            <p class="perk-box-text">${escapeHtml(activePair.passives)}</p>
          </div>
          <div class="pairing-perk-box camp">
            <span class="perk-box-tag">⛺ CAMPFIRE STATION SYNERGY</span>
            <p class="perk-box-text">${escapeHtml(activePair.campAura)}</p>
          </div>
        </div>

        <div class="pairing-summary-note">
          <strong>Tactical Breakdown:</strong> ${escapeHtml(activePair.summary)}
        </div>
      </div>
    `;
  }

  /* ==========================================================================
     OVERVIEW WIZARD: CLASS & ROLE PAIRING RECOMMENDATION MATRIX
     ========================================================================== */
  function renderRolePairingWizard() {
    const pairings = PAIRING_WIZARD_DATA;
    const activePair = pairings.find(p => p.roleId === activeRolePairing) || pairings[0];

    return `
      <div class="pairing-wizard-container">
        <div class="section-heading-bar" style="margin-top: 1.5rem;">
          <div>
            <h2><span>🧙‍♂️</span> Interactive Class &amp; Role Pairing Recommendation Matrix</h2>
            <p class="section-subtext">Select your character archetype to reveal the optimal profession synergy, combat passives, and campfire station auras</p>
          </div>
        </div>

        <div class="pairing-roles-bar">
          ${pairings.map(p => `
            <button type="button" class="pairing-role-chip ${p.roleId === activePair.roleId ? 'active' : ''}" data-role-id="${p.roleId}">
              <span>${p.icon}</span> ${escapeHtml(p.roleName.split('(')[0].trim())}
            </button>
          `).join('')}
        </div>

        ${renderPairingDetailsCard(activePair)}
      </div>
    `;
  }

  function filterTrainers() {
    return WOW_TRAINERS_DATA.filter(t => {
      if (trainerFactionFilter !== 'all' && t.faction.toLowerCase() !== trainerFactionFilter) return false;
      if (trainerRankFilter !== 'all' && t.rank.toLowerCase() !== trainerRankFilter) return false;
      if (trainerProfFilter !== 'all' && t.profession !== trainerProfFilter) return false;
      if (trainerZoneFilter !== 'all' && t.zone !== trainerZoneFilter) return false;
      if (trainerSearchQuery) {
        const q = trainerSearchQuery.toLowerCase();
        const matchesName = t.name.toLowerCase().includes(q);
        const matchesZone = t.zone.toLowerCase().includes(q);
        const matchesProf = t.profName.toLowerCase().includes(q);
        if (!matchesName && !matchesZone && !matchesProf) return false;
      }
      return true;
    });
  }

  function renderTrainerCardsHtml(filtered) {
    if (filtered.length === 0) {
      return `
        <div style="grid-column: 1 / -1; text-align: center; padding: 2.5rem; color: #94a3b8; background: rgba(15,23,42,0.5); border-radius: 8px;">
          No trainers found matching your search and filter criteria.
        </div>
      `;
    }
    return filtered.map(t => `
      <div class="trainer-card">
        <div class="trainer-card-top">
          <span class="trainer-faction-pill ${t.faction.toLowerCase()}">${t.faction}</span>
          <span class="trainer-rank-pill">${t.rank}</span>
          <span class="trainer-prof-pill">${t.profName}</span>
        </div>
        <h4 class="trainer-name">${escapeHtml(t.name)}</h4>
        <div class="trainer-zone">📍 ${escapeHtml(t.zone)}</div>
        ${t.notes ? `<div class="trainer-notes">💡 ${escapeHtml(t.notes)}</div>` : ''}
        <div class="trainer-footer">
          <button type="button" class="tomtom-way-btn" data-macro="${escapeHtml(t.macro)}" title="Click to copy TomTom macro: ${escapeHtml(t.macro)}">
            📍 <span>${escapeHtml(t.macro)}</span>
          </button>
        </div>
      </div>
    `).join('');
  }

  function updateTrainerGrid(container) {
    const grid = container.querySelector('.trainer-grid');
    if (!grid) return;
    const filtered = filterTrainers();
    grid.innerHTML = renderTrainerCardsHtml(filtered);
  }

  /* ==========================================================================
     OVERVIEW: MASTER TRAINER DIRECTORY & 1-CLICK TOMTOM MACRO HUB
     ========================================================================== */
  function renderMasterTrainerDirectory() {
    const allTrainers = WOW_TRAINERS_DATA;
    const filtered = filterTrainers();

    const distinctProfs = [
      { slug: 'all', name: 'All Professions' },
      { slug: 'alchemy', name: 'Alchemy' },
      { slug: 'blacksmithing', name: 'Blacksmithing' },
      { slug: 'enchanting', name: 'Enchanting' },
      { slug: 'engineering', name: 'Engineering' },
      { slug: 'leatherworking', name: 'Leatherworking' },
      { slug: 'tailoring', name: 'Tailoring' },
      { slug: 'mining', name: 'Mining' },
      { slug: 'herbalism', name: 'Herbalism' },
      { slug: 'skinning', name: 'Skinning' },
      { slug: 'cooking', name: 'Cooking' },
      { slug: 'first-aid', name: 'First Aid' },
      { slug: 'fishing', name: 'Fishing' },
      { slug: 'camping', name: 'Camping' }
    ];

    const distinctZones = ['all', ...new Set(allTrainers.map(t => t.zone))].sort((a, b) => {
      if (a === 'all') return -1;
      if (b === 'all') return 1;
      return a.localeCompare(b);
    });

    return `
      <div class="trainer-directory-container">
        <div class="section-heading-bar" style="margin-top: 1.5rem;">
          <div>
            <h2><span>📍</span> Master Trainer Directory &amp; 1-Click TomTom Macro Hub</h2>
            <p class="section-subtext">Find every Apprentice, Journeyman, Expert, and Artisan trainer across Azeroth with 1-click TomTom /way macros</p>
          </div>
        </div>

        <div class="trainer-filter-bar">
          <input type="text" id="trainer-search-input" class="prof-search-input" placeholder="Search trainer name, city, zone..." value="${escapeHtml(trainerSearchQuery)}" />
          
          <div class="trainer-filter-selects">
            <select id="trainer-prof-select" class="trainer-select" aria-label="Filter by profession">
              ${distinctProfs.map(p => `
                <option value="${p.slug}" ${trainerProfFilter === p.slug ? 'selected' : ''}>${p.name}</option>
              `).join('')}
            </select>

            <select id="trainer-faction-select" class="trainer-select" aria-label="Filter by faction">
              <option value="all" ${trainerFactionFilter === 'all' ? 'selected' : ''}>All Factions</option>
              <option value="alliance" ${trainerFactionFilter === 'alliance' ? 'selected' : ''}>Alliance</option>
              <option value="horde" ${trainerFactionFilter === 'horde' ? 'selected' : ''}>Horde</option>
              <option value="neutral" ${trainerFactionFilter === 'neutral' ? 'selected' : ''}>Neutral</option>
            </select>

            <select id="trainer-rank-select" class="trainer-select" aria-label="Filter by rank">
              <option value="all" ${trainerRankFilter === 'all' ? 'selected' : ''}>All Ranks</option>
              <option value="apprentice" ${trainerRankFilter === 'apprentice' ? 'selected' : ''}>Apprentice (1–75)</option>
              <option value="journeyman" ${trainerRankFilter === 'journeyman' ? 'selected' : ''}>Journeyman (75–150)</option>
              <option value="expert" ${trainerRankFilter === 'expert' ? 'selected' : ''}>Expert (150–225)</option>
              <option value="artisan" ${trainerRankFilter === 'artisan' ? 'selected' : ''}>Artisan (200–300)</option>
            </select>

            <select id="trainer-zone-select" class="trainer-select" aria-label="Filter by zone">
              <option value="all" ${trainerZoneFilter === 'all' ? 'selected' : ''}>All Zones (${distinctZones.length - 1})</option>
              ${distinctZones.filter(z => z !== 'all').map(z => `
                <option value="${escapeHtml(z)}" ${trainerZoneFilter === z ? 'selected' : ''}>${escapeHtml(z)}</option>
              `).join('')}
            </select>
          </div>
        </div>

        <div class="trainer-grid">
          ${renderTrainerCardsHtml(filtered)}
        </div>
      </div>
    `;
  }

  function renderCampPerksTab(container, prof) {
    const camp = prof.campPerks || {};
    const milestones = camp.milestones || [];
    const atCamp = camp.atCamp || [];
    const legacyPerks = camp.legacyPerks || [];
    const passiveData = getProfessionPassive(prof.name || (window.WOW_PROFESSIONS?.getCurrentProfession ? window.WOW_PROFESSIONS.getCurrentProfession() : 'overview'));

    container.innerHTML = `
      <div class="leveling-header-block">
        <div class="leveling-header-title">
          <h3>CAMP, SKILL REWARDS AND PERKS</h3>
          <p>Account-wide Legacy perks, permanent title certifications, and wilderness camp station blueprints provided by ${escapeHtml(prof.name)}.</p>
        </div>
      </div>

      <div class="camp-perks-container">
        <!-- Featured Spotlight: Combat Passive & Campfire Synergy -->
        ${passiveData ? `
          <div class="prof-passive-spotlight-card">
            <div class="spotlight-badge-header">
              <span class="spotlight-tag combat">✨ CORE COMBAT PASSIVE</span>
              <span class="spotlight-tag camp">🔥 CAMPFIRE BLUEPRINTS</span>
              <span class="spotlight-tag legacy">🏆 +3 LEGACY POINTS</span>
            </div>
            <div class="spotlight-body">
              <div class="spotlight-combat-col">
                <div class="spotlight-icon-box">${passiveData.icon || '✨'}</div>
                <div>
                  <h4 class="spotlight-title">${escapeHtml(passiveData.passiveName)}</h4>
                  <p class="spotlight-effect">${escapeHtml(passiveData.passiveEffect)}</p>
                  <small class="spotlight-meta">Permanent character passive active in open world, dungeons, and raids.</small>
                </div>
              </div>
              <div class="spotlight-camp-col">
                <div class="spotlight-icon-box">⛺</div>
                <div>
                  <h4 class="spotlight-title">Wilderness Campfire Synergy</h4>
                  <p class="spotlight-effect">${escapeHtml(passiveData.campBonus || prof.campBuff?.effect || 'Crafts camp workstations providing 1-hour party buffs.')}</p>
                  <small class="spotlight-meta">Deployable at any open-world campfire station.</small>
                </div>
              </div>
            </div>
          </div>
        ` : ''}

        <div class="camp-perks-top-grid">
          <!-- Column 1: Legacy Points & Titles -->
          <div>
            <h4 class="camp-col-header">Legacy points and title</h4>
            <div class="camp-milestone-list">
              ${milestones.length === 0 ? '<div style="color: #94a3b8; font-size: 0.85rem; padding: 1rem 0;">No milestone titles recorded for this skill.</div>' : milestones.map(m => `
                <div class="camp-milestone-item">
                  <img src="${getIconUrl(m.icon)}" alt="${escapeHtml(m.title)}" class="camp-item-icon" loading="lazy" />
                  <div class="camp-item-text">
                    <strong>${escapeHtml(m.title)}</strong>
                    <span>${escapeHtml(m.desc)}</span>
                  </div>
                  <span class="camp-item-reward">${escapeHtml(m.reward)}</span>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Column 2: At Camp Stations -->
          <div>
            <h4 class="camp-col-header">At camp</h4>
            <div class="camp-station-list">
              ${atCamp.length === 0 ? '<div style="color: #94a3b8; font-size: 0.85rem; padding: 1rem 0;">No campfire stations available for this skill.</div>' : atCamp.map(c => `
                <div class="camp-station-item">
                  <img src="${getIconUrl(c.icon)}" alt="${escapeHtml(c.name)}" class="camp-item-icon" loading="lazy" />
                  <div class="camp-item-text">
                    <strong>${escapeHtml(c.name)}</strong>
                    <span>${escapeHtml(c.desc)}</span>
                  </div>
                  <span class="camp-item-skill">${escapeHtml(c.skill)}</span>
                </div>
              `).join('')}
              <a href="#camping" class="camp-how-link" onclick="const b = document.querySelector('.nav-tab-btn[data-tab=\\'camping\\']'); if (b) b.click();">How Camping works ›</a>
            </div>
          </div>
        </div>

        <!-- Bottom: Legacy Perks -->
        <div class="legacy-perks-section">
          <h4 class="camp-col-header">Legacy perks</h4>
          <div class="legacy-perks-list">
            ${legacyPerks.length === 0 ? '<div style="color: #94a3b8; font-size: 0.85rem; padding: 1rem 0;">No trade-specific legacy perks.</div>' : legacyPerks.map(p => `
              <div class="legacy-perk-card">
                <img src="${getIconUrl(p.icon)}" alt="${escapeHtml(p.name)}" class="perk-card-icon" loading="lazy" />
                <div class="perk-card-content">
                  <strong>${escapeHtml(p.name)}</strong>
                  <p>${escapeHtml(p.effect)}</p>
                  <small class="perk-card-meta">${escapeHtml(p.meta)}</small>
                </div>
                <button type="button" class="perk-plan-action" onclick="const b = document.querySelector('.nav-tab-btn[data-tab=\\'legacy\\']'); if (b) b.click();" title="Open Legacy Tree Planner">Plan it ›</button>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;

    attachTooltipListeners(container, prof);
  }

  /* ==========================================================================
     SPECIALIZED TAB: CAMPING SYSTEM (FOREVER CHANGES)
     ========================================================================== */
  function renderCampingProfessionTab(container, prof) {
    const subTab = (window.WOW_PROFESSIONS && window.WOW_PROFESSIONS.getCurrentSubTab) ? window.WOW_PROFESSIONS.getCurrentSubTab() : 'guide';
    if (subTab === 'buffs') {
      renderCampingBuffs(container, prof);
    } else if (subTab === 'upgrades') {
      renderCampingUpgrades(container, prof);
    } else if (subTab === 'perks') {
      renderCampingPerks(container, prof);
    } else if (subTab === 'leveling') {
      if (window.WOW_PROFESSIONS_LEVELING && window.WOW_PROFESSIONS_LEVELING.renderLevelingTab) {
        window.WOW_PROFESSIONS_LEVELING.renderLevelingTab(container, prof);
      }
    } else if (subTab === 'shopping') {
      if (window.WOW_PROFESSIONS_LEVELING && window.WOW_PROFESSIONS_LEVELING.renderShoppingTab) {
        window.WOW_PROFESSIONS_LEVELING.renderShoppingTab(container, prof);
      }
    } else {
      renderCampingGuide(container, prof);
    }
    attachTooltipListeners(container, prof);
  }

  function renderCampingGuide(container, prof) {
    const steps = prof.howItWorks?.steps || [];
    const questNote = prof.howItWorks?.questNote || '';
    const campfires = prof.campfires || [];

    container.innerHTML = `
      <!-- Top System Explanation -->
      <div class="leveling-header-block">
        <div class="leveling-header-title">
          <h3>HOW CAMPING WORKS</h3>
          <p>${escapeHtml(prof.summary || '')}</p>
        </div>
        <div class="leveling-header-meta">
          <a href="#camping" class="prof-pill-link" onclick="const b = document.querySelector('.nav-tab-btn[data-tab=\\'camping\\']'); if (b) b.click();">
            <span>🏕️</span> Open Wilderness Hub ›
          </a>
        </div>
      </div>

      <!-- Quick Jump Banner to Leveling & Shopping -->
      <div class="camping-profession-link-banner" style="margin-bottom: 1.5rem; background: rgba(245, 158, 11, 0.08); border: 1px solid rgba(245, 158, 11, 0.35); border-radius: var(--radius-md, 8px); padding: 1rem 1.25rem; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1rem;">
        <div style="display: flex; align-items: center; gap: 0.85rem;">
          <span style="font-size: 2rem;">📈</span>
          <div>
            <strong style="color: #fcd34d; font-size: 1.05rem;">Looking for the 1–225 Camping Leveling Roadmap?</strong>
            <p style="margin: 0.2rem 0 0 0; font-size: 0.85rem; color: #cbd5e1;">Step-by-step bracket roadmap, interactive checklist, and complete material shopping lists.</p>
          </div>
        </div>
        <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
          <button type="button" class="quick-link-chip" style="background: rgba(243, 192, 67, 0.2); border: 1px solid var(--border-gold-bright, #d4af37); color: #fff; padding: 0.45rem 0.9rem; font-weight: 600; cursor: pointer; border-radius: 4px;" onclick="if (window.WOW_PROFESSIONS) { window.WOW_PROFESSIONS.selectProfession('camping', 'leveling'); }">
            <span>📈</span> Leveling Guide (1–225) ›
          </button>
          <button type="button" class="quick-link-chip" style="background: rgba(255, 255, 255, 0.08); border: 1px solid var(--border-subtle); color: #cbd5e1; padding: 0.45rem 0.85rem; font-size: 0.82rem; cursor: pointer; border-radius: 4px;" onclick="if (window.WOW_PROFESSIONS) { window.WOW_PROFESSIONS.selectProfession('camping', 'shopping'); }">
            <span>🛒</span> Shopping List
          </button>
        </div>
      </div>

      <!-- 3 Core Steps -->
      <div class="camp-steps-grid">
        ${steps.map(s => `
          <div class="camp-step-card">
            <div class="camp-step-head">
              <span class="camp-step-badge">${s.num}</span>
              <img src="${getIconUrl(s.icon)}" alt="${escapeHtml(s.title)}" class="camp-step-icon" loading="lazy" />
              <h4 class="camp-step-title">${escapeHtml(s.title)}</h4>
            </div>
            <p class="camp-step-desc">${escapeHtml(s.desc)}</p>
          </div>
        `).join('')}
      </div>

      <!-- Quest Onboarding Callout -->
      ${questNote ? `
        <div class="camp-quest-box">
          <span class="q-icon">📜</span>
          <div class="camp-quest-text">
            <strong>Starter Quest: The Great Outdoors (Level 5+)</strong>
            <p>${escapeHtml(questNote)}</p>
          </div>
        </div>
      ` : ''}

      <!-- Crafted Campfire Kits -->
      <div class="section-heading-bar" style="margin-bottom: 1rem;">
        <div>
          <h2><span>🔥</span> Crafted Campfire Kits (${campfires.length} Tiers)</h2>
          <p class="section-subtext">Cooks craft campfire kits from wood harvested across Azeroth. Each tier expands object capacity and placement limits</p>
        </div>
      </div>

      <div class="campfires-grid">
        ${campfires.map(c => `
          <div class="campfire-card q${c.quality || 1} camp-tooltip-item" 
               data-item-name="${escapeHtml(c.name)}" 
               data-quality="${c.quality || 1}" 
               data-desc="${escapeHtml(c.desc)}" 
               data-req="${escapeHtml(c.skillReq)}"
               data-effect="Burns for 15 minutes. Holds ${c.capacity} profession stations.">
            <div class="campfire-card-head">
              <img src="${getIconUrl(c.icon)}" alt="${escapeHtml(c.name)}" class="campfire-card-icon q${c.quality || 1}" loading="lazy" />
              <div class="campfire-card-info">
                <h4 class="q${c.quality || 1}">${escapeHtml(c.name)}</h4>
                <small>${escapeHtml(c.skillReq)}</small>
              </div>
              <span class="campfire-capacity-badge">Holds ${c.capacity} Objects</span>
            </div>
            <p style="margin: 0; font-size: 0.88rem; color: #cbd5e1; line-height: 1.4;">${escapeHtml(c.desc)}</p>
            <div style="border-top: 1px solid rgba(255,255,255,0.06); padding-top: 0.75rem;">
              <div style="font-size: 0.72rem; text-transform: uppercase; color: #94a3b8; margin-bottom: 0.4rem; font-weight: 700;">Craft Reagents:</div>
              <div class="campfire-reagents-list">
                ${(c.reagents || []).map(r => `
                  <div class="reagent-chip" data-item-id="${r.itemId}" data-item-name="${escapeHtml(r.name)}" title="${escapeHtml(r.name)}">
                    <img src="${getIconUrl(r.icon, r.name)}" alt="${escapeHtml(r.name)}" loading="lazy" />
                    <span>${r.count}x ${escapeHtml(r.name)}</span>
                  </div>
                `).join('')}
                ${c.blueprint ? `
                  <span class="step-badge-orange" style="margin-left: auto; font-size: 0.72rem;">${escapeHtml(c.blueprint.text)}</span>
                ` : '<span class="step-badge-green" style="margin-left: auto; font-size: 0.72rem;">Trainer Taught</span>'}
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  function renderCampingBuffs(container, prof) {
    const buffObjects = prof.buffObjects || [];
    const q = (searchQuery || '').toLowerCase().trim();

    const filtered = buffObjects.filter(b => {
      if (!q) return true;
      return (
        (b.object && b.object.toLowerCase().includes(q)) ||
        (b.profName && b.profName.toLowerCase().includes(q)) ||
        (b.gives && b.gives.toLowerCase().includes(q)) ||
        (b.restriction && b.restriction.toLowerCase().includes(q)) ||
        (b.reagents && b.reagents.some(r => r.name && r.name.toLowerCase().includes(q)))
      );
    });

    container.innerHTML = `
      <!-- Toolbar -->
      <div class="prof-toolbar">
        <div style="display: flex; gap: 0.75rem; align-items: center; flex-wrap: wrap; flex: 1;">
          <input type="text" id="prof-buff-search-input" aria-label="Search camp buff objects and professions" class="prof-search-input" placeholder="Search buff, profession (e.g. Alchemy, Fishing), or reagent..." value="${escapeHtml(searchQuery)}" />
          <span style="font-size: 0.85rem; color: #94a3b8;">Showing ${filtered.length} of ${buffObjects.length} Buff Objects</span>
        </div>
        <div style="font-size: 0.8rem; color: #38bdf8; display: flex; align-items: center; gap: 0.4rem;">
          <span>⏳</span> 1-Hour Cooldown · 1-Hour Party Buff
        </div>
      </div>

      <!-- Heading -->
      <div class="section-heading-bar" style="margin-bottom: 1.25rem;">
        <div>
          <h2><span>✨</span> 11 Skill 20 Camp Buff Objects</h2>
          <p class="section-subtext">Every profession crafts a station from skill 20 providing 80% potency of class blessings for 1 hour to anyone who rests at camp</p>
        </div>
      </div>

      <!-- Buffs Grid -->
      <div class="camp-buffs-grid">
        ${filtered.map(b => `
          <div class="camp-buff-card camp-tooltip-item"
               data-item-name="${escapeHtml(b.object)}"
               data-quality="2"
               data-desc="${escapeHtml(b.gives)}"
               data-req="${escapeHtml(b.profName)} (Skill ${b.skillReq})"
               data-effect="Provides ${escapeHtml(b.gives)} to party members who rest by the fire for 1 minute. ${escapeHtml(b.restriction)}">
            <div>
              <div class="camp-buff-head">
                <div class="camp-buff-main">
                  <img src="${getIconUrl(b.icon)}" alt="${escapeHtml(b.object)}" class="camp-buff-icon q2" loading="lazy" />
                  <div>
                    <h4 style="margin: 0; font-size: 1.1rem; color: #fff;">${escapeHtml(b.object)}</h4>
                    <small style="color: #94a3b8; font-size: 0.78rem;">Requires ${escapeHtml(b.profName)} ${b.skillReq}</small>
                  </div>
                </div>
                <span class="camp-buff-prof-tag">
                  <img src="${getIconUrl(b.profIcon)}" alt="${escapeHtml(b.profName)}" loading="lazy" />
                  <span>${escapeHtml(b.profName)}</span>
                </span>
              </div>

              <div style="margin-top: 1rem; display: flex; flex-direction: column; gap: 0.6rem;">
                <div class="camp-buff-stats-box">
                  <div class="camp-buff-stats-title">Campfire Aura Granted (1 Hour):</div>
                  <div class="camp-buff-stats-text">${escapeHtml(b.gives)}</div>
                </div>

                ${b.restriction ? `
                  <div class="camp-buff-restriction-pill">
                    <span>⚠️</span>
                    <span>${escapeHtml(b.restriction)}</span>
                  </div>
                ` : ''}
              </div>
            </div>

            <div style="border-top: 1px solid rgba(255,255,255,0.06); padding-top: 0.75rem; margin-top: 0.5rem;">
              <div style="font-size: 0.72rem; text-transform: uppercase; color: #94a3b8; margin-bottom: 0.4rem; font-weight: 700;">Craft Reagents:</div>
              <div class="campfire-reagents-list">
                ${(b.reagents || []).map(r => `
                  <div class="reagent-chip" data-item-id="${r.itemId}" data-item-name="${escapeHtml(r.name)}" title="${escapeHtml(r.name)}">
                    <img src="${getIconUrl(r.icon, r.name)}" alt="${escapeHtml(r.name)}" loading="lazy" />
                    <span>${r.count}x ${escapeHtml(r.name)}</span>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    `;

    const searchInput = container.querySelector('#prof-buff-search-input') || container.querySelector('#prof-search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value;
        renderCampingBuffs(container, prof);
        attachTooltipListeners(container, prof);
      });
    }
  }

  function renderCampingUpgrades(container, prof) {
    const upgrades = prof.upgrades || [];

    container.innerHTML = `
      <!-- Heading -->
      <div class="leveling-header-block">
        <div class="leveling-header-title">
          <h3>22 ADVANCED BLUEPRINT CAMP STATIONS</h3>
          <p>At skill 140 and 300, professions unlock permanent field workstations through blueprints. These replace the skill 20 object, retain its party buff, and unlock on-site advanced crafting, ore/herb spawns, or mobile repair services.</p>
        </div>
      </div>

      <!-- Matrix Table / Cards -->
      <div class="prof-matrix-table-wrap">
        <table class="prof-matrix-table">
          <thead>
            <tr>
              <th style="width: 180px;">Profession</th>
              <th style="width: 41%;">Skill 140 Station (Blueprint)</th>
              <th style="width: 41%;">Skill 300 Master Station (Blueprint)</th>
            </tr>
          </thead>
          <tbody>
            ${upgrades.map(u => `
              <tr>
                <td>
                  <div class="matrix-prof-col" data-slug="${u.profSlug}" title="View ${escapeHtml(u.profName)}">
                    <img src="${getIconUrl(u.profIcon)}" alt="${escapeHtml(u.profName)}" loading="lazy" />
                    <span>${escapeHtml(u.profName)}</span>
                  </div>
                </td>
                <td>
                  <div class="matrix-station-cell camp-tooltip-item" 
                       data-item-name="${escapeHtml(u.s140.name)}" 
                       data-quality="2" 
                       data-desc="${escapeHtml(u.s140.desc)}" 
                       data-req="${escapeHtml(u.s140.skill)}"
                       style="padding: 0.5rem 0; width: 100%;">
                    <img src="${getIconUrl(u.s140.icon)}" alt="${escapeHtml(u.s140.name)}" class="q2" loading="lazy" style="width: 32px; height: 32px;" />
                    <div>
                      <div style="display: flex; align-items: center; gap: 0.5rem;">
                        <strong style="color: #fff; font-size: 0.95rem;">${escapeHtml(u.s140.name)}</strong>
                        <span class="step-badge-orange" style="font-size: 0.7rem;">${escapeHtml(u.s140.skill)}</span>
                      </div>
                      <small style="display: block; margin-top: 0.2rem; color: #94a3b8; font-size: 0.8rem; line-height: 1.4;">${escapeHtml(u.s140.desc)}</small>
                    </div>
                  </div>
                </td>
                <td>
                  <div class="matrix-station-cell camp-tooltip-item" 
                       data-item-name="${escapeHtml(u.s300.name)}" 
                       data-quality="3" 
                       data-desc="${escapeHtml(u.s300.desc)}" 
                       data-req="${escapeHtml(u.s300.skill)}"
                       style="padding: 0.5rem 0; width: 100%;">
                    <img src="${getIconUrl(u.s300.icon)}" alt="${escapeHtml(u.s300.name)}" class="q3" loading="lazy" style="width: 32px; height: 32px;" />
                    <div>
                      <div style="display: flex; align-items: center; gap: 0.5rem;">
                        <strong style="color: #0070dd; font-size: 0.95rem;">${escapeHtml(u.s300.name)}</strong>
                        <span class="step-badge-green" style="font-size: 0.7rem;">${escapeHtml(u.s300.skill)}</span>
                      </div>
                      <small style="display: block; margin-top: 0.2rem; color: #94a3b8; font-size: 0.8rem; line-height: 1.4;">${escapeHtml(u.s300.desc)}</small>
                    </div>
                  </div>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;
  }

  function renderCampingPerks(container, prof) {
    const legacyPerks = prof.legacyPerks || [];
    const rules = prof.rules || [];

    container.innerHTML = `
      <!-- Top: Legacy Perks -->
      <div class="leveling-header-block">
        <div class="leveling-header-title">
          <h3>CAMPING LEGACY PERKS</h3>
          <p>Permanent account-wide legacy tree talents that enhance campfire cooldowns, buff durations, and reagent mechanics across all your characters.</p>
        </div>
      </div>

      <div class="legacy-perks-list" style="margin-bottom: 2.5rem;">
        ${legacyPerks.map(p => `
          <div class="legacy-perk-card">
            <img src="${getIconUrl(p.icon)}" alt="${escapeHtml(p.name)}" class="perk-card-icon" loading="lazy" />
            <div class="perk-card-content">
              <strong style="font-size: 1.05rem; color: #fff;">${escapeHtml(p.name)}</strong>
              <p style="margin: 0.3rem 0; font-size: 0.88rem; color: #cbd5e1; line-height: 1.5;">${escapeHtml(p.effect)}</p>
              <small class="perk-card-meta">${escapeHtml(p.meta)}</small>
            </div>
            <button type="button" class="perk-plan-action" onclick="const b = document.querySelector('.nav-tab-btn[data-tab=\\'legacy\\']'); if (b) b.click();" title="Open Legacy Tree Planner">Plan it ›</button>
          </div>
        `).join('')}
      </div>

      <!-- Bottom: 6 Keep In Mind Rules -->
      <div class="section-heading-bar" style="margin-bottom: 1.25rem;">
        <div>
          <h2><span>⚖️</span> Core Camping Rules & Stacking Mechanics</h2>
          <p class="section-subtext">Essential mechanical guidelines for campfire placement, rested experience generation, and faction alignment</p>
        </div>
      </div>

      <div class="camp-rules-grid">
        ${rules.map(r => `
          <div class="camp-rule-card">
            <h4><span>📌</span> ${escapeHtml(r.title)}</h4>
            <p>${escapeHtml(r.text)}</p>
          </div>
        `).join('')}
      </div>
    `;
  }

  /* ==========================================================================
     SUBTAB 5: MERCHANT'S FAVOR RECIPES & CAMPS
     ========================================================================== */
  function renderFavorTab(container, prof) {
    const favor = prof.favor || {};
    const recipes = favor.recipes || [];
    const camps = favor.camps || {};

    container.innerHTML = `
      <!-- Faction Camp Locations -->
      <div class="favor-camps-row">
        <div class="favor-camp-card alliance">
          <h4>🦁 Alliance: Azeroth Commerce Authority</h4>
          <div class="favor-camp-meta">
            <div><strong>Location:</strong> ${camps.a ? camps.a.place + ', ' + camps.a.zone : 'Three Corners, Redridge Mountains'}</div>
            <div><strong>Coordinates:</strong> ${camps.a ? camps.a.x + ', ' + camps.a.y : '10.5, 72.7'}</div>
            <div><strong>Quartermaster:</strong> ${camps.a ? camps.a.npc : 'Nina Surefire'}</div>
          </div>
        </div>

        <div class="favor-camp-card horde">
          <h4>⚔️ Horde: Durotar Supply and Logistics</h4>
          <div class="favor-camp-meta">
            <div><strong>Location:</strong> ${camps.h ? camps.h.place + ', ' + camps.h.zone : 'outside Crossroads, The Barrens'}</div>
            <div><strong>Coordinates:</strong> ${camps.h ? camps.h.x + ', ' + camps.h.y : '49.7, 29.4'}</div>
            <div><strong>Quartermaster:</strong> ${camps.h ? camps.h.npc : 'Apothecary Durelle'}</div>
          </div>
        </div>
      </div>

      <!-- Favor Recipes Grid -->
      <div class="section-heading-bar" style="margin-bottom: 1rem;">
        <div>
          <h2><span>📦</span> Trade Camp Favor Recipes (${recipes.length})</h2>
          <p class="section-subtext">Filled supply crates returned to your faction's trade outpost unlock exclusive craft formulas</p>
        </div>
      </div>

      <div class="favor-tiers-container">
        ${renderFavorTierBlocks(recipes, prof)}
      </div>

      <!-- Waylaid Supply Crate Tiers Breakdown -->
      <div class="section-heading-bar" style="margin-top: 2rem; margin-bottom: 1rem;">
        <div>
          <h2><span>📦</span> Waylaid Supply Crate Turn-In Tiers</h2>
          <p class="section-subtext">Recovered from world chests and mobs. Fill with gathered or crafted components before turning in to your Quartermaster</p>
        </div>
      </div>

      <div class="favor-crates-grid">
        ${((window.WOW_ATLAS_DATA?.merchantsFavor?.crateTiers) || [
          { tier: 'Apprentice (White)', levelReq: 10, favor: 5, money: '2s 50c', materials: 'Raw Gathered Materials (20 Peacebloom, 20 Copper Ore, 40 Linen)' },
          { tier: 'Apprentice (Green)', levelReq: 10, favor: 10, money: '5s 00c', materials: 'Crafted Components (2 Cured Light Hide, 20 Bolt of Linen, 20 Copper Bar)' },
          { tier: 'Journeyman (White)', levelReq: 10, favor: 10, money: '5s 00c', materials: 'Intermediate Raw Materials (10 Stranglekelp, 20 Iron Ore, 20 Wool Cloth)' },
          { tier: 'Journeyman (Green)', levelReq: 10, favor: 20, money: '10s 00c', materials: 'Intermediate Crafted Goods (6 Bolt of Woolen Cloth, 20 Iron Bar)' },
          { tier: 'Expert (White/Green)', levelReq: 20, favor: '25–35 (Est.)', money: '15s–25s', materials: 'Mithril Ore, Mageweave, Vision Dust, Mithril Bars' },
          { tier: 'Artisan (White/Green)', levelReq: 35, favor: '45–60 (Est.)', money: '35s–50s', materials: 'Thorium Ore, Runecloth, Dream Dust, Truesilver Bars' }
        ]).map(cr => `
          <div class="favor-crate-card">
            <div class="favor-crate-head">
              <span class="favor-crate-badge">${escapeHtml(cr.tier)}</span>
              <span class="favor-crate-lvl">Req Lvl ${cr.levelReq}</span>
            </div>
            <div class="favor-crate-rewards">
              <span class="favor-reward-chip">★ ${escapeHtml(String(cr.favor))} Favor</span>
              <span class="favor-reward-chip money">🪙 ${escapeHtml(cr.money)}</span>
            </div>
            <p class="favor-crate-mats">${escapeHtml(cr.materials)}</p>
          </div>
        `).join('')}
      </div>

      <!-- Trade Writs System Callout -->
      <div class="favor-writs-card">
        <div class="favor-writs-head">
          <span style="font-size: 1.5rem;">📜</span>
          <div>
            <h4>Daily Trade Writs System (150 Total Orders)</h4>
            <p>Crafting professions (Alchemy, Blacksmithing, Engineering, Leatherworking, Tailoring) receive 30 daily work orders per profession across Journeyman (100–170), Expert (180–225), and Artisan (230–310) tiers.</p>
          </div>
        </div>
        <div class="favor-writs-footer">
          <div><strong>Daily Payout:</strong> 22s to 45s Coin Pouch per order + Camp Faction Reputation</div>
          <div><strong>Writs Reroll:</strong> Swap unwanted writs with the <em>Forger's Quill</em> (sold by the Uncertified Scribe south of Three Corners).</div>
        </div>
      </div>
    `;

    attachTooltipListeners(container, prof);
  }

  function renderFavorTierBlocks(recipes, prof = {}) {
    if (!recipes || recipes.length === 0) {
      return `
        <div style="text-align: center; padding: 3rem; color: #94a3b8; background: rgba(15,23,42,0.5); border-radius: 8px;">
          No Merchant's Favor turn-in recipes for this trade.
        </div>
      `;
    }

    const tierMap = new Map();
    recipes.forEach(r => {
      const c = r.cost ? (typeof r.cost === 'number' ? `${r.cost} Merchant's Favor` : r.cost) : '1 Merchant\'s Favor';
      if (!tierMap.has(c)) {
        tierMap.set(c, []);
      }
      tierMap.get(c).push(r);
    });

    return Array.from(tierMap.entries()).map(([costLabel, items]) => {
      const minSkill = Math.min(...items.map(i => i.requiredSkill || 1));
      const maxSkill = Math.max(...items.map(i => i.requiredSkill || 1));
      const skillSpan = minSkill === maxSkill ? `Skill ${minSkill}+` : `Skill ${minSkill} to ${maxSkill}`;
      return `
        <div class="favor-tier-block">
          <div class="favor-tier-header">
            <h4>📦 ${escapeHtml(costLabel)} <small>· ${skillSpan}</small></h4>
          </div>
          <div class="recipe-grid">
            ${items.map(f => {
              const cleanName = (f.name || '').replace(/^(Recipe|Formula|Plans|Pattern|Schematic|Manual):\s*/i, '').trim();
              const match = (prof.recipes || []).find(r => 
                r.name && (
                  r.name.toLowerCase() === cleanName.toLowerCase() ||
                  r.name.toLowerCase() === (f.name || '').toLowerCase() ||
                  (r.source && r.source.toLowerCase().includes((f.name || '').toLowerCase()))
                )
              );
              const quality = f.quality || match?.quality || 1;
              const skillReq = f.requiredSkill || match?.learn || 1;
              const skillPercent = Math.min(100, Math.max(4, Math.round((skillReq / 300) * 100)));
              const reagents = match?.reagents || f.reagents || [];
              const effectText = f.desc || match?.effect || match?.source || '';
              const iconUrl = getIconUrl(f.icon || match?.icon, f.name, 'Merchant Favor');
              const costDisplay = typeof f.cost === 'number' ? `${f.cost} Merchant's Favor` : (f.cost || costLabel);

              const reagentsHtml = reagents.length ? `
                <div class="recipe-reagents-row" style="margin-top: 0.55rem;">
                  ${reagents.map(mat => `
                    <span class="reagent-chip" title="${mat.count}x ${escapeHtml(mat.name)}" data-item-id="${mat.id || ''}" data-item-name="${escapeHtml(mat.name)}">
                      <img src="${getIconUrl(mat.icon, mat.name)}" alt="${escapeHtml(mat.name)}" loading="lazy" />
                      <span class="reagent-count">${mat.count}x</span>
                      <span class="q${mat.quality || 1}">${escapeHtml(mat.name)}</span>
                    </span>
                  `).join('')}
                </div>
              ` : '';

              return `
                <div class="recipe-card favor-recipe-card" 
                     data-recipe-name="${escapeHtml(f.name)}" 
                     data-crafted-name="${escapeHtml(cleanName)}" 
                     data-quality="${quality}" 
                     data-effect="${escapeHtml(effectText)}" 
                     data-skill="${skillReq}" 
                     data-cost="${escapeHtml(costDisplay)}"
                     data-prof="${escapeHtml(prof.name || 'Trade')}">
                  <div>
                    <div class="recipe-card-header">
                      <img src="${iconUrl}" alt="${escapeHtml(f.name)}" class="recipe-item-icon q${quality}" loading="lazy" />
                      <div class="recipe-info">
                        <h4 class="recipe-title q${quality}">${escapeHtml(f.name)}</h4>
                        ${effectText ? `<div class="recipe-effect">${escapeHtml(effectText)}</div>` : ''}
                      </div>
                    </div>

                    <!-- Interactive Skill Requirement Track with Hover Tooltip -->
                    <div class="favor-skill-row">
                      <span class="recipe-skill-badge skill-orange" title="Requires ${escapeHtml(prof.name || 'Trade')} (${skillReq})">Skill ${skillReq}+</span>
                      <div class="favor-skill-track" data-skill="${skillReq}" data-prof="${escapeHtml(prof.name || 'Trade')}">
                        <span class="favor-skill-fill" style="width: ${skillPercent}%;"></span>
                        <span class="favor-skill-cap-marker" style="left: 75%;" title="Beta Cap at 225"></span>
                      </div>
                    </div>

                    ${reagentsHtml}
                  </div>

                  <div class="recipe-source-line">
                    <span>Cost:</span>
                    <span class="recipe-source-badge" style="color: var(--text-gold); font-weight: 700;">${escapeHtml(costDisplay)}</span>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      `;
    }).join('');
  }


  function renderFishingWatersTab(container, prof) {
    const waters = prof.fishingWaters || [];
    const sched = FISHING_SCHEDULE_DATA;

    const currentUtcHour = new Date().getUTCHours();
    const isNightfinPeak = currentUtcHour >= 0 && currentUtcHour < 6;
    const isNightfinActive = currentUtcHour >= 18 || currentUtcHour < 6;
    const isSunscaleActive = currentUtcHour >= 6 && currentUtcHour < 18;

    const timeBadgeText = isNightfinPeak
      ? '🌙 Nightfin Snapper 100% PEAK Active Right Now!'
      : (isSunscaleActive
        ? '☀️ Sunscale Salmon Daylight Window Active Right Now!'
        : (isNightfinActive ? '🌆 Twilight Transition: Nightfin Activity Begun!' : '🎣 Fishing Cycle Active'));

    container.innerHTML = `
      <div class="leveling-header-block">
        <div class="leveling-header-title">
          <h3>
            Fishing Waters, Day/Night Windows &amp; Fish Pools
            <span class="beta-cap-tag" style="background: rgba(14, 116, 144, 0.2); border-color: #0284c7; color: #38bdf8;">
              ${timeBadgeText}
            </span>
          </h3>
          <p>Real-time server time fishing schedule, seasonal fish migrations (Winter Squid vs Summer Bass), coastal fish schools, and zone skill brackets.</p>
        </div>
      </div>

      <!-- Real-time Day/Night Schedule Widget -->
      <div class="fishing-schedule-widget">
        <div class="fishing-clock-card">
          <div class="fishing-clock-head">
            <span class="fishing-clock-icon">🕰️</span>
            <div>
              <div class="fishing-clock-title">Server Time Schedule Tracker</div>
              <div class="fishing-clock-sub">Current Server Hour: <strong>${String(currentUtcHour).padStart(2, '0')}:00 UTC</strong></div>
            </div>
          </div>
          <div class="fishing-cycles-grid">
            ${sched.dayNight.map(dn => {
              const isPeak = dn.peakHours.includes(currentUtcHour);
              const isActive = dn.dayHours.includes(currentUtcHour) || dn.twilightHours.includes(currentUtcHour) || isPeak;
              return `
                <div class="fishing-cycle-card ${isPeak ? 'peak-active' : (isActive ? 'active' : '')}">
                  <div class="fishing-cycle-top">
                    <img src="${getIconUrl(dn.icon)}" alt="${escapeHtml(dn.name)}" class="fishing-fish-icon" />
                    <div>
                      <h4 class="fishing-fish-name">${escapeHtml(dn.name)}</h4>
                      <div class="fishing-fish-window">${escapeHtml(dn.windows)}</div>
                    </div>
                    <span class="fishing-live-status-pill ${isPeak ? 'peak' : (isActive ? 'active' : 'dormant')}">
                      ${isPeak ? '⚡ PEAK ACTIVE' : (isActive ? 'ACTIVE' : 'DORMANT')}
                    </span>
                  </div>
                  <div class="fishing-cycle-buff">✨ ${escapeHtml(dn.buff)}</div>
                  <div class="fishing-cycle-zones">📍 ${escapeHtml(dn.zones)}</div>
                </div>
              `;
            }).join('')}
          </div>
        </div>

        <!-- Seasonal Migration Calendar -->
        <div class="fishing-seasons-card">
          <div class="fishing-seasons-head">
            <span class="fishing-seasons-icon">📅</span>
            <div>
              <div class="fishing-seasons-title">Seasonal Fish Migration Calendar</div>
              <div class="fishing-seasons-sub">Winter Squid vs Summer Bass migration shifts during equinoxes</div>
            </div>
          </div>
          <div class="fishing-seasons-grid">
            ${sched.seasons.map(sn => `
              <div class="fishing-season-card ${sn.isActiveNow ? 'season-active' : ''}">
                <div class="fishing-season-top">
                  <img src="${getIconUrl(sn.icon)}" alt="${escapeHtml(sn.name)}" class="fishing-fish-icon" />
                  <div>
                    <h4 class="fishing-season-name">${escapeHtml(sn.name)}</h4>
                    <span class="fishing-season-dates">${escapeHtml(sn.season)}</span>
                  </div>
                  ${sn.isActiveNow ? '<span class="season-badge-live">🟢 ACTIVE NOW IN BETA</span>' : '<span class="season-badge-inactive">⚪ MIGRATED</span>'}
                </div>
                <div class="fishing-season-buff">${escapeHtml(sn.yieldBuff)}</div>
                <div class="fishing-season-zones">📍 <strong>Best Waters:</strong> ${escapeHtml(sn.bestLocations)}</div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Fish Pools & Wreckage Compendium -->
        <div class="fishing-pools-card">
          <div class="fishing-pools-head">
            <span class="fishing-pools-icon">🌊</span>
            <div>
              <div class="fishing-pools-title">Fish Pools &amp; Floating Wreckage Compendium</div>
              <div class="fishing-pools-sub">Open-world schools require only 1 Fishing Skill to land 100% of catches</div>
            </div>
          </div>
          <div class="fishing-pools-grid">
            ${sched.pools.map(pool => `
              <div class="fishing-pool-item">
                <div class="fishing-pool-top">
                  <img src="${getIconUrl(pool.icon)}" alt="${escapeHtml(pool.name)}" class="fishing-pool-icon" />
                  <div>
                    <h5 class="fishing-pool-name">${escapeHtml(pool.name)}</h5>
                    <div class="fishing-pool-loc">📍 ${escapeHtml(pool.locations)}</div>
                  </div>
                </div>
                <div class="fishing-pool-loot">${escapeHtml(pool.loot)}</div>
                <div class="fishing-pool-mech">💡 ${escapeHtml(pool.mechanic)}</div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>

      <!-- Waters by Skill Bracket List -->
      <div class="section-heading-bar" style="margin-top: 1.5rem;">
        <div>
          <h2><span>🌊</span> Open Waters Skill Requirement Brackets</h2>
          <p class="section-subtext">Minimum fishing skill required to guarantee no "Your fish got away!" failures</p>
        </div>
      </div>

      <div class="waters-list">
        ${waters.map(w => `
          <div class="water-bracket-row">
            <div class="water-skill-badge">
              Skill ${w.skill}
              <small>${escapeHtml(w.note || '100% Catch')}</small>
            </div>
            <div class="water-zones-text">
              <div style="margin-bottom: ${w.biteFrom ? '0.35rem' : '0'}; width: 100%;">${escapeHtml(w.zones)}</div>
              ${w.biteFrom ? `<span class="water-bite-badge">Fish bite starts at ${escapeHtml(w.biteFrom)}</span>` : ''}
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  function renderFishingLuresTab(container, prof) {
    const lures = prof.fishingLures || [];
    container.innerHTML = `
      <div class="leveling-header-block">
        <div class="leveling-header-title">
          <h3>Fishing Lures & Baits (${lures.length})</h3>
          <p>A lure goes on your fishing pole and raises your skill for a few minutes to unlock higher level waters.</p>
        </div>
      </div>

      <div class="lures-grid">
        ${lures.map(l => `
          <div class="lure-card">
            <img src="${getIconUrl(l.icon)}" alt="${escapeHtml(l.name)}" class="lure-icon" loading="lazy" />
            <div class="lure-info">
              <strong>${escapeHtml(l.name)}</strong>
              <span>${escapeHtml(l.bonus)}</span>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  function renderFishingRanksTab(container, prof) {
    const ranks = prof.ranks || [];
    container.innerHTML = `
      <div class="leveling-header-block">
        <div class="leveling-header-title">
          <h3>Fishing Progression & Rank Mastery</h3>
          <p>Everything you need to get started with Fishing in Azeroth, plus milestone trainer certifications and quest books.</p>
        </div>
      </div>

      <div class="fishing-ranks-list">
        ${ranks.map(r => {
          if (r.step) {
            return `
              <div class="fishing-rank-item">
                <div class="fishing-rank-step">${r.step}</div>
                <div class="fishing-rank-content">
                  <strong>${escapeHtml(r.title)}</strong>
                  <p>${escapeHtml(r.desc)}</p>
                </div>
              </div>
            `;
          }
          return `
            <div class="fishing-rank-item">
              <img src="${getIconUrl(r.icon || 'trade_fishing')}" alt="${escapeHtml(r.title)}" width="42" height="42" style="border-radius:6px; border:1px solid rgba(212,175,55,0.4);" loading="lazy" />
              <div class="fishing-rank-content">
                <div style="display: flex; align-items: center; justify-content: space-between; gap: 0.5rem; flex-wrap: wrap;">
                  <strong>${escapeHtml(r.title)}</strong>
                  ${r.cap ? `<span class="node-skill-badge">${escapeHtml(r.cap)}</span>` : ''}
                </div>
                <p>${escapeHtml(r.desc)}</p>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    `;
  }


  window.WOW_PROFESSIONS_TABS = {
    renderSpecializationsTab,
    renderContainersTab,
    renderPairingDetailsCard,
    renderRolePairingWizard,
    filterTrainers,
    renderTrainerCardsHtml,
    updateTrainerGrid,
    renderMasterTrainerDirectory,
    renderCampPerksTab,
    renderCampingProfessionTab,
    renderCampingGuide,
    renderCampingBuffs,
    renderCampingUpgrades,
    renderCampingPerks,
    renderFavorTab,
    renderFavorTierBlocks,
    renderFishingWatersTab,
    renderFishingLuresTab,
    renderFishingRanksTab
  };
})();
