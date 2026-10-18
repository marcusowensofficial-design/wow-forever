/**
 * World of Warcraft: Forever - Hunter Pet Stable & Mechanics Deep Dive Submodule
 */
(function () {
  "use strict";

  const escapeHtml = window.escapeHtml || (s => String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"));

  function setupHunterPetMasterModal() {
    const modal = document.getElementById('hunter-pets-master-modal');
    const closeBtn = document.getElementById('hunter-pets-modal-close');
    const tableContainer = document.getElementById('modal-pet-table-container');
    const searchInput = document.getElementById('modal-pet-search');
    const familySelect = document.getElementById('modal-filter-family');
    const levelSelect = document.getElementById('modal-filter-level');
    const speedSelect = document.getElementById('modal-filter-speed');
    const factionSelect = document.getElementById('modal-filter-faction');
    const abilitySelect = document.getElementById('modal-filter-ability');
    const countBadge = document.getElementById('modal-pet-count-badge');

    if (!modal || !tableContainer) return;

    const petData = (typeof window !== 'undefined' && window.WOW_ATLAS_DATA && window.WOW_ATLAS_DATA.hunterPets) || null;
    const allBeasts = (petData && petData.allBeasts) || [];
    const families = (petData && petData.families) || [];
    const familyIconMap = new Map();
    families.forEach(f => {
      familyIconMap.set(f.name.toLowerCase(), f.icon);
    });

    function renderModalTable() {
      const q = (searchInput?.value || '').trim().toLowerCase();
      const selFam = familySelect?.value || 'all';
      const selLvl = levelSelect?.value || 'all';
      const selSpeed = speedSelect?.value || 'all';
      const selFaction = factionSelect?.value || 'all';
      const selAbility = abilitySelect?.value || 'all';

      const normSelFam = typeof window.normalizePetFamily === 'function' ? window.normalizePetFamily(selFam) : selFam.toLowerCase().replace(/[-_\s]+/g, '');

      const filtered = allBeasts.filter(b => {
        const normFam = typeof window.normalizePetFamily === 'function' ? window.normalizePetFamily(b.family) : (b.family || '').toLowerCase().replace(/[-_\s]+/g, '');
        // Family filter
        if (normSelFam !== 'all' && normFam !== normSelFam) return false;

        // Level filter
        const minL = b.minLevel || 1;
        const maxL = b.maxLevel || 60;
        if (selLvl === '1-9' && (minL > 9 || maxL < 1)) return false;
        if (selLvl === '10-19' && (minL > 19 || maxL < 10)) return false;
        if (selLvl === '20-30' && (minL > 30 || maxL < 20)) return false;
        if (selLvl === '30plus' && maxL < 30) return false;
        if (selLvl === '30-49' && (minL > 49 || maxL < 30)) return false;
        if (selLvl === '50-60' && maxL < 50) return false;

        // Speed filter
        if (selSpeed === 'fast' && !b.isFast) return false;
        if (selSpeed === '1.0' && b.speed !== '1.0s') return false;
        if (selSpeed === '1.2' && b.speed !== '1.2s') return false;
        if (selSpeed === '1.3' && b.speed !== '1.3s') return false;

        // Faction filter
        if (selFaction !== 'all' && b.faction !== selFaction) return false;

        // Ability filter
        if (selAbility === 'teaches' && (!b.teaches || !b.teaches.trim())) return false;
        if (selAbility === 'none' && (b.teaches && b.teaches.trim())) return false;
        if (selAbility !== 'all' && selAbility !== 'teaches' && selAbility !== 'none') {
          if (!b.teaches || !b.teaches.toLowerCase().includes(selAbility.toLowerCase())) return false;
        }

        // Search text
        if (q) {
          const normQ = typeof window.normalizePetFamily === 'function' ? window.normalizePetFamily(q) : q.replace(/[-_\s]+/g, '');
          const matchesFamilyAlias = normQ !== 'all' && normFam === normQ;
          const str = `${b.name} ${b.family} ${b.zone} ${b.subzone || ''} ${b.teaches || ''} ${b.notes || ''}`.toLowerCase();
          if (!matchesFamilyAlias && !str.includes(q)) return false;
        }

        return true;
      });

      if (countBadge) {
        countBadge.textContent = `Showing ${filtered.length} / ${allBeasts.length} Beasts`;
      }

      tableContainer.innerHTML = `
        <table class="pet-master-table">
          <thead>
            <tr>
              <th>Family</th>
              <th>Beast Name</th>
              <th>Level Range</th>
              <th>Speed</th>
              <th>Zone / Subzone</th>
              <th>Faction</th>
              <th>Teaches</th>
              <th>Notes / Beta Tag</th>
            </tr>
          </thead>
          <tbody>
            ${filtered.length === 0 ? `
              <tr>
                <td colspan="8" style="text-align: center; padding: 2rem; color: #94a3b8;">
                  No beasts matched your filter criteria. Try clearing search or selecting All Families.
                </td>
              </tr>
            ` : filtered.map(b => {
              const icon = familyIconMap.get(b.family.toLowerCase()) || 'https://wow.zamimg.com/images/wow/icons/medium/ability_hunter_pet_cat.jpg';
              const zoneText = b.zone || 'WoW Forever Beta Spawn';
              return `
                <tr>
                  <td>
                    <span class="pet-table-fam-badge">
                      <img src="${icon}" alt="${escapeHtml(b.family)}" onerror="this.style.display='none'">
                      <span>${escapeHtml(b.family)}</span>
                    </span>
                  </td>
                  <td>
                    ${b.npcUrl ? `
                      <a href="${escapeHtml(b.npcUrl)}" target="_blank" rel="noopener" style="color: #6ee7b7; font-weight: 700; text-decoration: none; display: inline-flex; align-items: center; gap: 0.25rem;">
                        ${escapeHtml(b.name)} <span style="font-size: 0.65rem; color: #38bdf8;">↗</span>
                      </a>
                    ` : `
                      <strong style="color: #fff;">${escapeHtml(b.name)}</strong>
                    `}
                  </td>
                  <td>
                    <span class="tbr-level">Lvl ${escapeHtml(b.level)}</span>
                  </td>
                  <td>
                    <span class="tbr-speed ${b.isFast ? 'fast' : ''}">${b.isFast ? '⚡ ' : ''}${escapeHtml(b.speed)}</span>
                  </td>
                  <td>
                    <span style="color: #cbd5e1; font-weight: 600;">📍 ${escapeHtml(zoneText)}</span>
                    ${b.subzone ? `<span style="font-size: 0.74rem; color: #94a3b8; display: block;">${escapeHtml(b.subzone)}</span>` : ''}
                  </td>
                  <td>
                    <span class="tbr-faction ${escapeHtml(b.faction)}">${escapeHtml(b.faction)}</span>
                  </td>
                  <td>
                    ${b.teaches ? `
                      <span style="color: #fcd34d; font-size: 0.78rem; font-weight: 600; display: inline-flex; align-items: center; gap: 0.25rem;">
                        <span>📖</span> <span>${escapeHtml(b.teaches)}</span>
                      </span>
                    ` : `
                      <span class="pet-untaught-badge" title="No innate ability taught upon tame. Learn skills from other beasts or trainers to train this pet.">
                        <span style="opacity: 0.5;">⚪</span> <span>Untaught</span>
                      </span>
                    `}
                  </td>
                  <td>
                    ${b.isNew ? '<span class="deepdive-badge badge-exclusive" style="font-size: 0.65rem; margin-right: 0.3rem;">✦ New in Forever</span>' : ''}
                    <span style="font-size: 0.74rem; color: #94a3b8;">${escapeHtml(b.notes || '')}</span>
                  </td>
                </tr>
              `;
            }).join('')}
          </tbody>
        </table>
      `;
    }

    window.openHunterPetMasterModal = function(initialFamily, initialLevelOrSpeed) {
      modal.removeAttribute('hidden');
      modal.classList.add('open');
      if (initialFamily && familySelect) {
        const normInit = typeof window.normalizePetFamily === 'function' ? window.normalizePetFamily(initialFamily) : initialFamily.toLowerCase().replace(/[-_\s]+/g, '');
        let matched = false;
        for (let i = 0; i < familySelect.options.length; i++) {
          const opt = familySelect.options[i];
          const normVal = typeof window.normalizePetFamily === 'function' ? window.normalizePetFamily(opt.value) : opt.value.toLowerCase().replace(/[-_\s]+/g, '');
          if (normVal === normInit) {
            familySelect.selectedIndex = i;
            matched = true;
            break;
          }
        }
        if (!matched) {
          familySelect.value = initialFamily;
        }
      }
      if (initialLevelOrSpeed) {
        if (initialLevelOrSpeed === 'fast') {
          if (speedSelect) speedSelect.value = 'fast';
        } else if (levelSelect) {
          levelSelect.value = initialLevelOrSpeed;
        }
      }
      renderModalTable();
    };

    function closeModal() {
      modal.classList.remove('open');
      modal.setAttribute('hidden', '');
    }

    if (closeBtn) closeBtn.onclick = closeModal;
    modal.onclick = (e) => {
      if (e.target === modal) closeModal();
    };

    [searchInput, familySelect, levelSelect, speedSelect, factionSelect, abilitySelect].forEach(el => {
      if (el) {
        el.oninput = renderModalTable;
        el.onchange = renderModalTable;
      }
    });
  }


  function renderHunterPetChangesPage(cData) {
    const changes = (cData && cData.petChanges) || {};

    const newAbilities = changes.newAbilities || [
      {
        family: "Bat",
        icon: "https://wow.zamimg.com/images/wow/icons/medium/ability_vehicle_sonicshockwave.jpg",
        name: "Sonic Blast",
        rank: "Rank 2",
        desc: "Emits a piercing shriek, inflicting 33 to 39 Nature damage and increasing the casting time of all spells by 30% for 20 sec.",
        cost: "80 Focus",
        cd: "60 sec cooldown"
      },
      {
        family: "Bear",
        icon: "https://wow.zamimg.com/images/wow/icons/medium/inv_misc_monsterclaw_03.jpg",
        name: "Swipe",
        rank: "Rank 2",
        desc: "Swipe 3 nearby enemies, inflicting 8 to 10 damage.",
        cost: "20 Focus",
        cd: "5 sec cooldown"
      },
      {
        family: "Bird of Prey",
        familyNote: "Owl in Classic",
        icon: "https://wow.zamimg.com/images/wow/icons/medium/spell_nature_natureswrath.jpg",
        name: "Mine!",
        rank: "Rank 3",
        desc: "Grabs an enemy's weapon with its talons, causing 20 to 24 damage and disarming them for 3 sec.",
        cost: "20 Focus",
        cd: "90 sec cooldown"
      },
      {
        family: "Crab",
        icon: "https://wow.zamimg.com/images/wow/icons/medium/ability_hunter_pet_crab.jpg",
        name: "Pinch",
        rank: "Rank 2",
        desc: "Pinches an enemy's legs for 32 to 36 damage and reduces movement speed by 50% for 9 sec.",
        cost: "50 Focus",
        cd: "30 sec cooldown"
      },
      {
        family: "Crocolisk",
        icon: "https://wow.zamimg.com/images/wow/icons/medium/ability_hunter_pet_crocolisk.jpg",
        name: "Dismember",
        rank: "Rank 2",
        desc: "Viciously bites enemy appendages for 18 to 20 damage and reduces the effectiveness of any healing by 25% for 6 sec.",
        cost: "35 Focus",
        cd: "15 sec cooldown"
      },
      {
        family: "Fox",
        familyNote: "New Family",
        icon: "https://wow.zamimg.com/images/wow/icons/medium/ability_hunter_aspectofthefox.jpg",
        name: "Trickster's Dance",
        rank: "Rank 1",
        desc: "Increases your pet's chance to Dodge by 50% and decreases the time between your pet's attacks by 30% for 12 sec.",
        cost: "10 Focus",
        cd: "3 min cooldown"
      },
      {
        family: "Hyena",
        icon: "https://wow.zamimg.com/images/wow/icons/medium/ability_hunter_pet_hyena.jpg",
        name: "Tendon Rip",
        rank: "Rank 2",
        desc: "Tears at an enemy's legs for 21 damage over 9 sec and reduces movement speed by 50% for 9 sec.",
        cost: "25 Focus",
        cd: "30 sec cooldown"
      },
      {
        family: "Raptor",
        icon: "https://wow.zamimg.com/images/wow/icons/medium/ability_hunter_pet_raptor.jpg",
        name: "Savage Rend",
        rank: "Rank 2",
        desc: "Slash an enemy with razor talons, causing the target to Bleed for 54 damage over 18 sec.",
        cost: "50 Focus",
        cd: "1 min cooldown"
      },
      {
        family: "Spider",
        icon: "https://wow.zamimg.com/images/wow/icons/medium/spell_nature_web.jpg",
        name: "Web",
        rank: "Rank 2",
        desc: "Entangles an enemy in a corrosive web, immobilizing them and dealing 20 Nature damage over 4 sec.",
        cost: "20 Focus",
        cd: "40 sec cooldown"
      },
      {
        family: "Tallstrider",
        icon: "https://wow.zamimg.com/images/wow/icons/medium/spell_nature_sleep.jpg",
        name: "Dust Cloud",
        rank: "Rank 2",
        desc: "Your tallstrider kicks up an abrasive cloud of dust, reducing the target's Armor by 175 for 30 sec.",
        cost: "10 Focus",
        cd: "Instant"
      }
    ];

    const changedAbilities = changes.changedAbilities || [];
    const universalMechanics = changes.universalMechanics || [];
    const trainingGuide = changes.trainingGuide || {};
    const dashInfo = changes.dashExpansion || {
      newFamilies: ["Bear", "Crab", "Crocolisk", "Gorilla", "Raptor", "Scorpid", "Spider", "Turtle"],
      classicFamilies: ["Boar", "Cat", "Hyena", "Tallstrider", "Wolf"]
    };
    const removedAbilities = changes.removedAbilities || [
      { family: "Bat", ability: "Screech" },
      { family: "Bird of Prey", ability: "Screech" },
      { family: "Raptor", ability: "Cobra Reflexes" }
    ];

    return `
      <div class="hunter-pet-changes-wrapper">
        <div class="spec-overview-banner" style="background: rgba(245, 158, 11, 0.08); border-color: rgba(245, 158, 11, 0.35);">
          <div>
            <h4 style="color: #fbbf24; font-size: 1.3rem; margin: 0 0 0.25rem;">⚡ What Changed for Pets in WoW Forever</h4>
            <p style="font-size: 0.9rem; color: #cbd5e1; margin: 0;">
              ${escapeHtml(changes.betaCapNotice || "Read from the beta client and set against Classic’s. Each ability is shown at the rank a pet can have at level 30, the beta’s cap.")}
            </p>
          </div>
          <span class="deepdive-badge badge-exclusive" style="align-self: flex-start;"><span>✦</span> Beta Cap Level 30</span>
        </div>

        <!-- Cross-Navigation Action Bar -->
        <div class="pet-changes-top-actions">
          <div style="display: flex; align-items: center; gap: 0.5rem; color: #cbd5e1; font-size: 0.86rem;">
            <span>🐾</span>
            <span>Browse individual beast spawns, stats, and taming locations:</span>
          </div>
          <div style="display: flex; gap: 0.6rem; align-items: center; flex-wrap: wrap;">
            <button class="btn-switch-pet-tab pet-cta-secondary-btn" data-target-subtab="pets" type="button">
              🐾 CLICK HERE TO VIEW 502 TAMABLE BEASTS DIRECTORY ➔
            </button>
            <button class="pet-master-directory-btn btn-open-modal-trigger" type="button" title="Open master modal of 502 beasts">
              <span class="pmd-btn-title">🐾 Open 502 Beasts Table</span>
              <span class="pmd-badge">Open Table ↗</span>
            </button>
          </div>
        </div>

        <!-- Quick Section Jump Navigation -->
        <div class="pet-quick-nav">
          <a href="#pet-sec-changes" class="pet-nav-pill"><span>🦊</span> New Fox & Owl Rename</a>
          <a href="#pet-sec-new-abilities" class="pet-nav-pill"><span>⚡</span> 10 New Abilities (Beta Cap)</a>
          <a href="#pet-sec-dash-removed" class="pet-nav-pill"><span>💨</span> Dash Expansion & Removed</a>
          <a href="#pet-sec-changed-diff" class="pet-nav-pill"><span>⚖️</span> Abilities Changed (Classic Diff)</a>
          <a href="#pet-sec-universal" class="pet-nav-pill"><span>📊</span> Universal Pet Mechanics</a>
          <a href="#pet-sec-training" class="pet-nav-pill"><span>📖</span> Training & Speed Guide</a>
        </div>

        <!-- SECTION 1: Fox & Owl Spotlights -->
        <div id="pet-sec-changes" style="margin-top: 1.25rem;">
          <div style="display: flex; align-items: baseline; justify-content: space-between; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 0.5rem;">
            <h4 style="color: var(--text-gold); font-size: 1.15rem; margin: 0; display: flex; align-items: center; gap: 0.5rem;">
              <span>🦊</span> New Fox Family & Bird of Prey
            </h4>
            <span style="font-size: 0.8rem; color: #94a3b8; font-style: italic;">
              ${escapeHtml(changes.betaCapNotice || "Read from the beta client and set against Classic’s. Each ability is shown at the rank a pet can have at level 30, the beta’s cap.")}
            </span>
          </div>

          <div class="pet-spotlight-grid">
            <!-- Fox Family Card -->
            <div class="pet-spotlight-card">
              <div class="pet-spotlight-header">
                <span style="font-size: 1.5rem;">🦊</span>
                <div>
                  <h5 style="color: #fff; margin: 0; font-size: 1rem;">A New Family: The Fox</h5>
                  <span style="font-size: 0.76rem; color: #fbbf24;">🍖 Eats Meat • Baseline Bite & Dash</span>
                </div>
              </div>
              <p style="font-size: 0.82rem; color: #cbd5e1; margin: 0.5rem 0;">
                Besides Bite and Dash, the Fox has a unique evasive signature ability:
              </p>
              <div class="pet-spotlight-ability">
                <div class="spotlight-ability-name">
                  <span style="color: #6ee7b7; font-weight: 700;">Trickster's Dance</span>
                  <span class="spotlight-rank-badge">Rank 1</span>
                </div>
                <p class="spotlight-ability-desc">
                  Increases your pet's chance to Dodge by 50% and decreases the time between your pet's attacks by 30% for 12 sec.
                </p>
                <div class="spotlight-ability-meta">
                  <span>⚡ 10 Focus</span>
                  <span>⌛ 3 min cooldown</span>
                </div>
              </div>
            </div>

            <!-- Bird of Prey Card -->
            <div class="pet-spotlight-card">
              <div class="pet-spotlight-header">
                <span style="font-size: 1.5rem;">🦅</span>
                <div>
                  <h5 style="color: #fff; margin: 0; font-size: 1rem;">Owl is now Bird of Prey</h5>
                  <span style="font-size: 0.76rem; color: #38bdf8;">Same beasts, a new name, and a weapon disarm ability</span>
                </div>
              </div>
              <p style="font-size: 0.82rem; color: #cbd5e1; margin: 0.5rem 0;">
                Gains the exclusive PvP disarm ability to neutralize enemy weapons:
              </p>
              <div class="pet-spotlight-ability">
                <div class="spotlight-ability-name">
                  <span style="color: #6ee7b7; font-weight: 700;">Mine!</span>
                  <span class="spotlight-rank-badge">Rank 3</span>
                </div>
                <p class="spotlight-ability-desc">
                  Grabs an enemy's weapon with its talons, causing 20 to 24 damage and disarming them for 4 sec.
                </p>
                <div class="spotlight-ability-meta">
                  <span>⚡ 20 Focus</span>
                  <span>⌛ 1 min cooldown</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- SECTION 2: 10 New Family Abilities -->
        <div id="pet-sec-new-abilities" style="margin-top: 2rem;">
          <div style="display: flex; align-items: baseline; justify-content: space-between; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 0.75rem;">
            <div>
              <h4 style="color: var(--text-gold); font-size: 1.15rem; margin: 0; display: flex; align-items: center; gap: 0.5rem;">
                <span>⚡</span> 10 New Family Abilities Added in Forever
              </h4>
              <p style="font-size: 0.82rem; color: #94a3b8; margin: 0.2rem 0 0;">
                Each ability is shown at the rank a pet can have at level 30, the closed beta's level cap.
              </p>
            </div>
            <span class="deepdive-badge badge-exclusive"><span>✦</span> 10 Abilities Total</span>
          </div>

          <div class="pet-diff-grid">
            ${newAbilities.map(a => `
              <div class="pet-new-ability-card">
                <div class="pet-new-ability-top">
                  <img src="${a.icon}" alt="${escapeHtml(a.name)}" class="pet-ability-icon-img" onerror="this.src='https://wow.zamimg.com/images/wow/icons/medium/ability_hunter_pet_wolf.jpg'">
                  <div>
                    <div style="display: flex; align-items: center; gap: 0.4rem; flex-wrap: wrap;">
                      <span class="ability-card-family">${escapeHtml(a.family)}</span>
                      ${a.familyNote ? `<span style="font-size: 0.7rem; color: #fbbf24; font-style: italic;">(${escapeHtml(a.familyNote)})</span>` : ''}
                    </div>
                    <div style="display: flex; align-items: center; gap: 0.4rem;">
                      <span class="ability-card-name">${escapeHtml(a.name)}</span>
                      <span class="ability-card-rank">${escapeHtml(a.rank)}</span>
                    </div>
                  </div>
                </div>
                <p class="pet-new-ability-desc">${escapeHtml(a.desc)}</p>
                <div class="pet-new-ability-meta">
                  <span class="pna-meta-tag">⚡ ${escapeHtml(a.cost)}</span>
                  <span class="pna-meta-tag">⌛ ${escapeHtml(a.cd)}</span>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- SECTION 3: Dash Expansion & Removed Abilities -->
        <div id="pet-sec-dash-removed" style="margin-top: 2rem;">
          <div class="pet-dash-banner">
            <div class="dash-banner-header">
              <div>
                <strong style="color: #6ee7b7; font-size: 1rem; display: flex; align-items: center; gap: 0.4rem;">
                  <span>💨</span> Dash for 8 More Families
                </strong>
                <p style="font-size: 0.82rem; color: #cbd5e1; margin: 0.25rem 0 0.5rem;">
                  Classic already gave Dash to Boar, Cat, Hyena, Tallstrider, and Wolf. Its first rank is learned at Level 30. Forever expands Dash to:
                </p>
              </div>
              <span class="dash-level-badge">Rank 1 Learned at Level 30</span>
            </div>

            <div class="pet-dash-pills">
              ${dashInfo.newFamilies.map(fam => `
                <span class="pet-dash-pill"><span>🐾</span> ${escapeHtml(fam)}</span>
              `).join('')}
            </div>

            <div class="pet-removed-banner">
              <strong style="color: #ef4444; font-size: 0.82rem; text-transform: uppercase; letter-spacing: 0.5px;">Gone from Forever:</strong>
              <div class="pet-removed-pills">
                ${removedAbilities.map(r => `
                  <span class="pet-removed-pill">❌ ${escapeHtml(r.family)}: ${escapeHtml(r.ability)}</span>
                `).join('')}
              </div>
            </div>
          </div>
        </div>

        <!-- SECTION 4: Abilities Forever Changed (Side-by-Side Diff) -->
        <div id="pet-sec-changed-diff" style="margin-top: 2rem;">
          <div style="display: flex; align-items: baseline; justify-content: space-between; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 0.75rem;">
            <div>
              <h4 style="color: var(--text-gold); font-size: 1.15rem; margin: 0; display: flex; align-items: center; gap: 0.5rem;">
                <span>⚖️</span> Abilities Forever Changed (Beta vs Classic Side-by-Side)
              </h4>
              <p style="font-size: 0.82rem; color: #94a3b8; margin: 0.2rem 0 0;">
                Same abilities as in Classic, with altered numbers. Each is shown at Level 30 beta cap rank: Classic above, Forever below.
              </p>
            </div>
            <span class="deepdive-badge badge-demo"><span>🔍</span> Forensic Diff</span>
          </div>

          <div class="pet-diff-grid">
            ${changedAbilities.map(ca => `
              <div class="pet-diff-card">
                <div class="pet-diff-card-header">
                  <img src="${ca.icon}" alt="${escapeHtml(ca.ability)}" class="pet-ability-icon-img" onerror="this.src='https://wow.zamimg.com/images/wow/icons/medium/ability_hunter_pet_wolf.jpg'">
                  <div>
                    <span class="diff-card-fam">${escapeHtml(ca.family)}</span>
                    <div style="display: flex; align-items: center; gap: 0.4rem;">
                      <span class="diff-card-title">${escapeHtml(ca.ability)}</span>
                      <span class="diff-card-rank">${escapeHtml(ca.rank)}</span>
                      ${ca.classicName ? `<span style="font-size: 0.7rem; color: #94a3b8;">(${escapeHtml(ca.classicName)})</span>` : ''}
                    </div>
                  </div>
                </div>

                <div class="diff-versions">
                  <!-- Classic Version (Above) -->
                  <div class="diff-version classic">
                    <div class="diff-version-label">
                      <span>Classic Era</span>
                    </div>
                    <p class="diff-version-text">${escapeHtml(ca.classic)}</p>
                  </div>

                  <!-- Forever Version (Below) -->
                  <div class="diff-version forever">
                    <div class="diff-version-label">
                      <span>✦ Forever Beta</span>
                    </div>
                    <p class="diff-version-text">${escapeHtml(ca.forever)}</p>
                  </div>
                </div>

                ${ca.delta ? `
                  <div class="pet-diff-delta">
                    <strong>Delta:</strong> ${escapeHtml(ca.delta)}
                  </div>
                ` : ''}
              </div>
            `).join('')}
          </div>
        </div>

        <!-- SECTION 5: What Changed for Every Pet (Universal Systems) -->
        <div id="pet-sec-universal" style="margin-top: 2rem;">
          <div style="display: flex; align-items: baseline; justify-content: space-between; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 0.75rem;">
            <div>
              <h4 style="color: var(--text-gold); font-size: 1.15rem; margin: 0; display: flex; align-items: center; gap: 0.5rem;">
                <span>📊</span> What Changed for Every Pet (Universal Systems)
              </h4>
              <p style="font-size: 0.82rem; color: #94a3b8; margin: 0.2rem 0 0;">
                Found by beta players & gathered on the Forever Hunter wiki (github.com/classic-hunter/forever-hunter).
              </p>
            </div>
          </div>

          <div class="pet-mechanics-grid">
            ${universalMechanics.map(m => `
              <div class="pet-mechanic-card">
                <div class="pet-mechanic-top">
                  <span style="font-size: 1.25rem;">${m.icon}</span>
                  <div style="flex: 1;">
                    <strong style="color: #fff; font-size: 0.92rem; display: block;">${escapeHtml(m.title)}</strong>
                  </div>
                  <span class="pet-mechanic-badge">${escapeHtml(m.badge)}</span>
                </div>
                <p class="pet-mechanic-desc">${escapeHtml(m.desc)}</p>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- SECTION 6: Beast Training Guide & Attack Speeds -->
        <div id="pet-sec-training" class="pet-training-box" style="margin-top: 2rem;">
          <div style="display: flex; align-items: baseline; justify-content: space-between; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 0.75rem;">
            <div>
              <h4 style="color: #6ee7b7; font-size: 1.15rem; margin: 0; display: flex; align-items: center; gap: 0.5rem;">
                <span>📖</span> Beast Training in WoW Forever & Attack Speed Mechanics
              </h4>
              <p style="font-size: 0.82rem; color: #cbd5e1; margin: 0;">
                Training still works as in Classic Era through a 3-step loop. Loyalty gates progression and swing speeds remain non-normalized.
              </p>
            </div>
            <span class="deepdive-badge badge-demo"><span>🎙️</span> Beta Forensics Guide</span>
          </div>

          <div class="pet-steps-grid">
            ${(trainingGuide.steps || []).map(s => `
              <div class="pet-step-card">
                <span class="pet-step-num">${s.num}</span>
                <strong style="color: #fff; font-size: 0.88rem; display: block; margin-bottom: 0.25rem;">${escapeHtml(s.title)}</strong>
                <p style="font-size: 0.78rem; color: #cbd5e1; margin: 0; line-height: 1.45;">${escapeHtml(s.desc)}</p>
              </div>
            `).join('')}
          </div>

          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 0.85rem; margin-top: 0.5rem;">
            <div style="background: rgba(30, 41, 59, 0.4); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 6px; padding: 0.8rem 1rem;">
              <strong style="color: #fcd34d; font-size: 0.85rem; display: block; margin-bottom: 0.25rem;">🔒 Loyalty Gates Training:</strong>
              <p style="font-size: 0.78rem; color: #cbd5e1; margin: 0; line-height: 1.45;">
                ${escapeHtml(trainingGuide.loyaltyNote || "Your pet must gain a loyalty level before higher rank abilities can be taught. Beta players report loyalty progresses very slowly.")}
              </p>
              <p style="font-size: 0.76rem; color: #94a3b8; margin: 0.4rem 0 0;">
                ${escapeHtml(trainingGuide.tameRules || "You can tame beasts up to 2 levels above your character level. Beast Lore is learned at Level 24.")}
              </p>
            </div>

            <div class="pet-beta-bug-alert">
              ${escapeHtml(trainingGuide.betaBugAlert || "⚠️ Beta Bug Notice: Pets tamed from Skyborne territory (such as Vuldren foxes or cranes) have been reported spontaneously losing abilities after being dismissed or relogging. This is a recognized beta bug, not intended design.")}
            </div>
          </div>

          <div class="pet-speed-box">
            <strong style="color: #38bdf8; font-size: 0.85rem; display: block; margin-bottom: 0.25rem;">⚡ Attack Speed & Damage Mechanics in Beta:</strong>
            <p style="font-size: 0.79rem; color: #bae6fd; margin: 0; line-height: 1.45;">
              ${escapeHtml(trainingGuide.attackSpeedInfo || "All pets swing at 2.0s base, modified by innate Faster Attack I–VII passives (Broken Tooth 1.0s, Savannah Cub 1.2s, Ravage 1.3s, Mystmane 1.6s). Because individual hits are not penalized for fast swings in beta, faster-swinging pets deal higher sustained DPS.")}
            </p>
          </div>
        </div>

        <!-- Return CTA Box -->
        <div class="pet-changes-return-box">
          <div>
            <h4 style="color: #6ee7b7; margin: 0 0 0.25rem; font-size: 1.05rem;">Ready to tame your companion?</h4>
            <p style="color: #cbd5e1; margin: 0; font-size: 0.84rem;">
              Filter all 18 families, check zone spawns, verify level brackets, and view all 520 beasts.
            </p>
          </div>
          <div style="display: flex; gap: 0.6rem; align-items: center; flex-wrap: wrap;">
            <button class="btn-switch-pet-tab pet-cta-primary-btn" data-target-subtab="pets" type="button">
              🐾 EXPLORE 18 FAMILIES & 520 BEASTS DIRECTORY ➔
            </button>
            <button class="pet-master-directory-btn btn-open-modal-trigger" type="button">
              <span class="pmd-btn-title">🐾 Open 520 Beasts Table</span>
              <span class="pmd-badge">Open Table ↗</span>
            </button>
          </div>
        </div>
      </div>
    `;
  }

  const NEW_SIGNATURE_ABILITY_FAMILIES = new Set([
    'bat', 'bear', 'bird-of-prey', 'crab', 'crocolisk', 'fox', 'hyena', 'raptor', 'spider'
  ]);

  function renderHunterPetStable(_cData) {
    const petData = (typeof window !== 'undefined' && window.WOW_ATLAS_DATA && window.WOW_ATLAS_DATA.hunterPets) || null;
    const families = (petData && petData.families) || [];
    const totalBeastsCount = (petData && petData.allBeasts && petData.allBeasts.length) || 520;

    return `
      <div class="hunter-pet-stable-wrapper">
        <div class="spec-overview-banner" style="background: rgba(16, 185, 129, 0.08); border-color: rgba(16, 185, 129, 0.3);">
          <div>
            <h4 style="color: #6ee7b7; font-size: 1.3rem; margin: 0 0 0.25rem;">🐾 Pet Stable & ${totalBeastsCount} Tamable Beasts Directory</h4>
            <p style="font-size: 0.9rem; color: #cbd5e1; margin: 0;">
              Classic pet mechanics preserved and expanded: 18 families, native swing speed inheritance (Broken Tooth 1.0s, Mystmane 1.6s bear), and ${totalBeastsCount} authentic tamable beasts in WoW Forever.
            </p>
          </div>
          <span class="deepdive-badge badge-exclusive" style="align-self: flex-start;"><span>✦</span> Living Classic+ Pets</span>
        </div>

        <!-- Prominent Callout Banner to What's Changed for Pets -->
        <div class="pet-changes-cta-banner">
          <div class="pet-changes-cta-content">
            <div class="pet-changes-cta-title">
              <span>⚡</span>
              <span>Looking for Closed Beta Pet Changes & Reworks?</span>
              <span class="pet-changes-cta-tag">Beta Cap Lvl 30 Diff</span>
            </div>
            <p class="pet-changes-cta-desc">
              Explore the brand new Fox family, Bird of Prey rename, 10 new family abilities, Dash expansion on 8 families, pruned abilities, side-by-side Classic vs Forever ability diffs, and universal pet mechanics.
            </p>
          </div>
          <div class="pet-changes-cta-actions">
            <button class="btn-switch-pet-tab pet-cta-primary-btn" data-target-subtab="petchanges" type="button" title="View all changes and new abilities">
              ⚡ CLICK HERE TO SEE WHAT'S CHANGED ➔
            </button>
            <button class="btn-open-modal-trigger pet-master-directory-btn" type="button" title="Open master modal of ${totalBeastsCount} beasts">
              <span class="pmd-btn-title">🐾 View ${totalBeastsCount} Beasts Table</span>
              <span class="pmd-badge">Open Table ↗</span>
            </button>
          </div>
        </div>

        <!-- SECTION: All 18 Pet Families & Beast Directory (${totalBeastsCount} Beasts) -->
        <div id="pet-sec-families" class="pet-filter-bar" style="margin-top: 1rem;">
          <div class="filter-controls-header">
            <div>
              <h4 style="color: #fff; margin: 0; font-size: 1.05rem;">All 18 Pet Families & Beast Taming Directory (${totalBeastsCount} Beasts)</h4>
              <span style="font-size: 0.8rem; color: #94a3b8;">Filter by role, level progression bracket, zone, or fast attack speeds</span>
            </div>
            <div style="display: flex; gap: 0.5rem; align-items: center; flex-wrap: wrap;">
              <button class="pet-master-directory-btn" id="btn-open-master-beasts" type="button" title="Click to open the master directory of all ${totalBeastsCount} tamable beasts">
                <span class="pmd-btn-title">🐾 Click Here to View All ${totalBeastsCount} Tamable Beasts Directory Table</span>
                <span class="pmd-badge">Open Table ↗</span>
              </button>
              <button class="pet-toggle-all-btn" id="pet-toggle-all-drawers" data-state="collapsed" type="button">
                <span>📍 Expand All Taming Guides</span>
              </button>
            </div>
          </div>

          <!-- Role Filter Chips -->
          <div class="pet-filter-chips">
            <button class="filter-chip pet-family-filter-btn active" data-pet-filter="all">All Families (18)</button>
            <button class="filter-chip pet-family-filter-btn" data-pet-filter="damage">Offense & DPS (+Dmg)</button>
            <button class="filter-chip pet-family-filter-btn" data-pet-filter="tank">Tank & Survival (+Armor/HP)</button>
            <button class="filter-chip pet-family-filter-btn" data-pet-filter="utility">Crowd Control & Debuffs</button>
            <button class="filter-chip pet-family-filter-btn" data-pet-filter="new">✦ New / Reworked Abilities (9)</button>
          </div>

          <!-- Level Progression & Speed Chips -->
          <div class="pet-level-chips">
            <span style="font-size: 0.72rem; color: #94a3b8; align-self: center; font-weight: 600; margin-right: 0.2rem;">Level Bracket:</span>
            <button class="pet-level-filter-btn active" data-level-filter="all">All Levels</button>
            <button class="pet-level-filter-btn" data-level-filter="10-19">Lvl 10–19 (Starters)</button>
            <button class="pet-level-filter-btn" data-level-filter="20-30">Lvl 20–30 (Beta Cap)</button>
            <button class="pet-level-filter-btn" data-level-filter="30plus">Lvl 30+ (Endgame)</button>
            <button class="pet-level-filter-btn" data-level-filter="fast">⚡ Fast Swing (≤1.6s)</button>
            <span id="pet-results-counter-badge" class="pet-results-counter-badge" style="display: none;"></span>
          </div>

          <!-- Live Search Bar -->
          <div class="pet-search-bar-row">
            <div class="pet-search-input-wrap">
              <span class="pet-search-icon">🔍</span>
              <input type="text" id="pet-beast-search" class="pet-search-input" placeholder="Search beasts, zones (e.g. Westfall, Badlands, Mulgore), or abilities..." aria-label="Search hunter beasts, zones, or abilities">
            </div>
          </div>
        </div>

        <!-- New Abilities Filter Notice Banner -->
        <div id="pet-new-filter-banner" class="pet-filter-notice-banner" style="display: none;">
          <div class="pnfb-text">
            <strong>✦ Showing 9 Pet Families with Brand-New Signature Abilities in WoW Forever:</strong>
            <span>Bat (Sonic Blast), Bear (Swipe), Bird of Prey (Mine!), Crab (Pinch), Crocolisk (Dismember), Fox (Trickster's Dance), Hyena (Tendon Rip), Raptor (Savage Rend), Spider (Web).</span>
          </div>
          <button class="btn-switch-pet-tab pnfb-link-btn" data-target-subtab="petchanges" type="button">
            ⚡ View Full Forensic Changes & Ability Diffs ➔
          </button>
        </div>

        <!-- 18 Families Grid -->
        <div class="pet-families-grid" style="margin-top: 1rem;">
          ${families.map(fam => {
            const famBeasts = fam.tameLocations || [];
            const minFamLvl = famBeasts.length > 0 ? Math.min(...famBeasts.map(b => b.minLevel || 60)) : 1;
            const maxFamLvl = famBeasts.length > 0 ? Math.max(...famBeasts.map(b => b.maxLevel || 1)) : 60;
            const hasNew = NEW_SIGNATURE_ABILITY_FAMILIES.has(fam.id);
            const isDmg = fam.damageMod.startsWith('+');
            const isTank = fam.armorMod.startsWith('+') || fam.healthMod.startsWith('+');
            const role = isDmg ? 'damage' : (isTank ? 'tank' : 'utility');

            return `
              <div class="pet-family-card ${fam.id === 'fox' ? 'featured-family' : ''}" data-family-id="${fam.id}" data-family-role="${role}" data-has-new="${hasNew}">
                <div class="family-card-top">
                  <div class="family-title-row">
                    <img src="${fam.icon}" alt="${escapeHtml(fam.name)}" class="family-icon-img" onerror="this.style.display='none'">
                    <div>
                      <strong class="family-name">${escapeHtml(fam.name)}</strong>
                      ${fam.id === 'fox' ? '<span class="deepdive-badge badge-exclusive" style="font-size: 0.68rem; margin-left: 0.3rem;">✦ New Family</span>' : ''}
                      ${fam.fastestTame ? `<span class="fastest-tame-badge">⚡ ${escapeHtml(fam.fastestTame)}</span>` : ''}
                    </div>
                  </div>
                  <div class="family-stat-mods">
                    <span class="mod-pill ${fam.damageMod.startsWith('+') ? 'mod-pos' : (fam.damageMod.startsWith('-') ? 'mod-neg' : 'mod-neutral')}">
                      Dmg: ${escapeHtml(fam.damageMod)}
                    </span>
                    <span class="mod-pill ${fam.armorMod.startsWith('+') ? 'mod-pos' : (fam.armorMod.startsWith('-') ? 'mod-neg' : 'mod-neutral')}">
                      Arm: ${escapeHtml(fam.armorMod)}
                    </span>
                    <span class="mod-pill ${fam.healthMod.startsWith('+') ? 'mod-pos' : (fam.healthMod.startsWith('-') ? 'mod-neg' : 'mod-neutral')}">
                      HP: ${escapeHtml(fam.healthMod)}
                    </span>
                  </div>
                </div>

                <div class="family-diet-row">
                  <span class="diet-label">🍖 Diet:</span>
                  <div class="diet-tags">
                    ${(fam.diet || []).map(d => `<span class="diet-tag">${escapeHtml(d)}</span>`).join('')}
                  </div>
                </div>

                <p class="family-highlight-p">${escapeHtml(fam.highlight)}</p>

                ${fam.newAbility ? `
                  <div class="family-new-ability-box">
                    <div class="fna-header">
                      <img src="${fam.newAbility.icon}" alt="" class="fna-icon" onerror="this.style.display='none'">
                      <strong style="color: #fcd34d; font-size: 0.86rem;">${escapeHtml(fam.newAbility.name)}</strong>
                      <span class="fna-badge">${escapeHtml(fam.newAbility.badge)}</span>
                    </div>
                    <div class="fna-specs">
                      ${fam.newAbility.cost ? `<span>${escapeHtml(fam.newAbility.cost)}</span>` : ''}
                      ${fam.newAbility.cd ? `<span>${escapeHtml(fam.newAbility.cd)}</span>` : ''}
                    </div>
                    <p class="fna-desc">${escapeHtml(fam.newAbility.desc)}</p>
                  </div>
                ` : ''}

                <div class="family-abilities-list">
                  <span style="font-size: 0.75rem; color: #94a3b8; font-weight: 600;">Learnable Abilities:</span>
                  <div class="family-ability-chips">
                    ${(fam.abilities || []).map(ab => `<span class="ability-mini-chip">${escapeHtml(ab)}</span>`).join('')}
                  </div>
                </div>

                <!-- Where to Tame Drawer -->
                <button class="tame-toggle-btn" data-target-family="${fam.id}">
                  <span>📍 Where to Tame (${famBeasts.length} Beasts)</span>
                  <span class="tame-toggle-arrow">▾</span>
                </button>

                <div class="pet-tame-drawer" id="tame-drawer-${fam.id}">
                  <div class="tame-drawer-header">
                    <div class="tdh-summary">
                      <span>🐾 <strong>${famBeasts.length} Beasts</strong> Available</span>
                      <span class="tdh-levels">Progression: Lvl ${minFamLvl}–${maxFamLvl}</span>
                    </div>
                    <button class="tdh-view-all-modal-btn" type="button" data-filter-fam="${escapeHtml(fam.name)}">
                      <span>🔍 Open in Master Table ↗</span>
                    </button>
                  </div>
                  ${famBeasts.map(b => {
                    const famAliases = fam.id === 'bird-of-prey' ? 'owl owls bird of prey' :
                                       fam.id === 'carrion-bird' ? 'vulture vultures carrion bird' :
                                       fam.id === 'wind-serpent' ? 'wind serpent windserpent' : fam.name;
                    const searchStr = `${b.name} ${b.zone || ''} ${b.subzone || ''} ${b.teaches || ''} ${fam.name} ${famAliases}`.toLowerCase();
                    const zoneDisplay = b.zone ? b.zone : 'WoW Forever Beta Spawn';
                    return `
                      <div class="tame-beast-row" 
                        data-min-level="${b.minLevel || 1}" 
                        data-max-level="${b.maxLevel || 60}" 
                        data-is-fast="${b.isFast ? 'true' : 'false'}" 
                        data-search-text="${escapeHtml(searchStr)}">
                        <div class="tbr-header">
                          <div class="tbr-name-wrap">
                            ${b.npcUrl ? `
                              <a href="${escapeHtml(b.npcUrl)}" target="_blank" rel="noopener" class="tbr-name" style="text-decoration: none; color: #fff; display: inline-flex; align-items: center; gap: 0.25rem;">
                                ${escapeHtml(b.name)} <span style="font-size: 0.68rem; color: #38bdf8;">↗</span>
                              </a>
                            ` : `
                              <span class="tbr-name">${escapeHtml(b.name)}</span>
                            `}
                            ${b.isNew ? '<span class="deepdive-badge badge-exclusive" style="font-size: 0.62rem; padding: 0.05rem 0.3rem;">✦ New</span>' : ''}
                          </div>
                          <div class="tbr-badges">
                            <span class="tbr-level">Lvl ${escapeHtml(b.level)}</span>
                            <span class="tbr-speed ${b.isFast ? 'fast' : ''}">${b.isFast ? '⚡ ' : ''}${escapeHtml(b.speed)}</span>
                            <span class="tbr-faction ${escapeHtml(b.faction)}">${escapeHtml(b.faction)}</span>
                          </div>
                        </div>
                        <div class="tbr-loc">
                          <span>📍</span> <strong>${escapeHtml(zoneDisplay)}</strong>${b.subzone ? ` — <span>${escapeHtml(b.subzone)}</span>` : ''}
                        </div>
                        ${b.teaches ? `
                          <div class="tbr-teaches">
                            <span>📖</span> <span>${escapeHtml(b.teaches)}</span>
                          </div>
                        ` : `
                          <div class="tbr-teaches tbr-untaught" title="No innate ability taught upon tame. Learn skills from other beasts or trainers to train this pet.">
                            <span style="opacity: 0.5;">⚪</span> <span>Untaught (Blank Slate)</span>
                          </div>
                        `}
                        ${b.notes ? `
                          <div class="tbr-notes">${escapeHtml(b.notes)}</div>
                        ` : ''}
                      </div>
                    `;
                  }).join('')}
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;
  }


  window.WOW_DEEPDIVES_HUNTER = {
    setupHunterPetMasterModal,
    renderHunterPetChangesPage,
    renderHunterPetStable
  };
})();
