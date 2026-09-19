/**
 * World of Warcraft: Forever - Class Deep Dives Module
 * Handles Class Selector Chips, Sub-Tab Filtering, Dossiers, Spec Renderers, and Forensics Matrix.
 */

function initClassDeepDives() {
  let selectedDeepDiveClassId = 'hunter';
  let selectedDeepDiveSubTab = 'overview'; // 'overview' | 'core' | 'survival' | 'marksmanship' | 'beastmastery' | 'tauren' | 'matrix'

  const chipsContainer = document.getElementById('deepdive-class-chips');
  const contentContainer = document.getElementById('deepdive-content-container');
  if (!chipsContainer || !contentContainer) return;

  // Header quick-link buttons
  const quickLinkDeepDives = document.getElementById('quick-link-deepdives');
  if (quickLinkDeepDives) {
    quickLinkDeepDives.addEventListener('click', () => {
      const deepDiveTabBtn = document.querySelector('.nav-tab-btn[data-tab="deepdives"]');
      if (deepDiveTabBtn) deepDiveTabBtn.click();
      window.switchDeepDiveClass('hunter');
      const target = document.getElementById('tab-deepdives');
      if (target) {
        setTimeout(() => target.scrollIntoView({ behavior: 'smooth' }), 100);
      }
    });
  }

  const quickLinkShaman = document.getElementById('quick-link-shaman-deepdive');
  if (quickLinkShaman) {
    quickLinkShaman.addEventListener('click', () => {
      const deepDiveTabBtn = document.querySelector('.nav-tab-btn[data-tab="deepdives"]');
      if (deepDiveTabBtn) deepDiveTabBtn.click();
      window.switchDeepDiveClass('shaman');
      const target = document.getElementById('tab-deepdives');
      if (target) {
        setTimeout(() => target.scrollIntoView({ behavior: 'smooth' }), 100);
      }
    });
  }

  const quickLinkMage = document.getElementById('quick-link-mage-deepdive');
  if (quickLinkMage) {
    quickLinkMage.addEventListener('click', () => {
      const deepDiveTabBtn = document.querySelector('.nav-tab-btn[data-tab="deepdives"]');
      if (deepDiveTabBtn) deepDiveTabBtn.click();
      window.switchDeepDiveClass('mage');
      const target = document.getElementById('tab-deepdives');
      if (target) {
        setTimeout(() => target.scrollIntoView({ behavior: 'smooth' }), 100);
      }
    });
  }

  const quickLinkPaladin = document.getElementById('quick-link-paladin-deepdive');
  if (quickLinkPaladin) {
    quickLinkPaladin.addEventListener('click', () => {
      const deepDiveTabBtn = document.querySelector('.nav-tab-btn[data-tab="deepdives"]');
      if (deepDiveTabBtn) deepDiveTabBtn.click();
      window.switchDeepDiveClass('paladin');
      const target = document.getElementById('tab-deepdives');
      if (target) {
        setTimeout(() => target.scrollIntoView({ behavior: 'smooth' }), 100);
      }
    });
  }

  const quickLinkWarrior = document.getElementById('quick-link-warrior-deepdive');
  if (quickLinkWarrior) {
    quickLinkWarrior.addEventListener('click', () => {
      const deepDiveTabBtn = document.querySelector('.nav-tab-btn[data-tab="deepdives"]');
      if (deepDiveTabBtn) deepDiveTabBtn.click();
      window.switchDeepDiveClass('warrior');
      const target = document.getElementById('tab-deepdives');
      if (target) {
        setTimeout(() => target.scrollIntoView({ behavior: 'smooth' }), 100);
      }
    });
  }

  const quickLinkWarlock = document.getElementById('quick-link-warlock-deepdive');
  if (quickLinkWarlock) {
    quickLinkWarlock.addEventListener('click', () => {
      const deepDiveTabBtn = document.querySelector('.nav-tab-btn[data-tab="deepdives"]');
      if (deepDiveTabBtn) deepDiveTabBtn.click();
      window.switchDeepDiveClass('warlock');
      const target = document.getElementById('tab-deepdives');
      if (target) {
        setTimeout(() => target.scrollIntoView({ behavior: 'smooth' }), 100);
      }
    });
  }

  const quickLinkPriest = document.getElementById('quick-link-priest-deepdive');
  if (quickLinkPriest) {
    quickLinkPriest.addEventListener('click', () => {
      const deepDiveTabBtn = document.querySelector('.nav-tab-btn[data-tab="deepdives"]');
      if (deepDiveTabBtn) deepDiveTabBtn.click();
      window.switchDeepDiveClass('priest');
      const target = document.getElementById('tab-deepdives');
      if (target) {
        setTimeout(() => target.scrollIntoView({ behavior: 'smooth' }), 100);
      }
    });
  }

  const quickLinkDruid = document.getElementById('quick-link-druid-deepdive');
  if (quickLinkDruid) {
    quickLinkDruid.addEventListener('click', () => {
      const deepDiveTabBtn = document.querySelector('.nav-tab-btn[data-tab="deepdives"]');
      if (deepDiveTabBtn) deepDiveTabBtn.click();
      window.switchDeepDiveClass('druid');
      const target = document.getElementById('tab-deepdives');
      if (target) {
        setTimeout(() => target.scrollIntoView({ behavior: 'smooth' }), 100);
      }
    });
  }

  const quickLinkRogue = document.getElementById('quick-link-rogue-deepdive');
  if (quickLinkRogue) {
    quickLinkRogue.addEventListener('click', () => {
      const deepDiveTabBtn = document.querySelector('.nav-tab-btn[data-tab="deepdives"]');
      if (deepDiveTabBtn) deepDiveTabBtn.click();
      window.switchDeepDiveClass('rogue');
      const target = document.getElementById('tab-deepdives');
      if (target) {
        setTimeout(() => target.scrollIntoView({ behavior: 'smooth' }), 100);
      }
    });
  }

  // Global helper for switching class externally
  window.switchDeepDiveClass = function(classId) {
    if (WOW_FOREVER_DATA.classDeepDives[classId]) {
      selectedDeepDiveClassId = classId;
      selectedDeepDiveSubTab = 'overview';
      renderDeepDiveChips();
      renderDeepDiveContent();
    }
  };

  function renderDeepDiveChips() {
    const classes = Object.values(WOW_FOREVER_DATA.classDeepDives);
    chipsContainer.innerHTML = classes.map(c => `
      <button class="selector-chip-btn ${c.id === selectedDeepDiveClassId ? 'active' : ''}" data-class-id="${c.id}" style="${c.id === selectedDeepDiveClassId ? `border-color: ${c.color}; box-shadow: 0 0 14px ${c.color}45;` : ''}">
        <span>${c.icon}</span>
        <span>${escapeHtml(c.name)}</span>
        ${c.hasData 
          ? '<span class="chip-status-badge ready">✦ Deep Dive Ready</span>' 
          : '<span class="chip-status-badge pending">Pending</span>'}
      </button>
    `).join('');

    chipsContainer.querySelectorAll('.selector-chip-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        selectedDeepDiveClassId = btn.getAttribute('data-class-id');
        selectedDeepDiveSubTab = 'overview';
        renderDeepDiveChips();
        renderDeepDiveContent();
      });
    });
  }

  function renderDeepDiveContent() {
    const cData = WOW_FOREVER_DATA.classDeepDives[selectedDeepDiveClassId];
    if (!cData) return;

    if (!cData.hasData) {
      contentContainer.innerHTML = `
        <div class="deepdive-pending-card">
          <span style="font-size: 3.5rem; display: block; margin-bottom: 0.5rem;">${cData.icon}</span>
          <h2 style="color: ${cData.color}; font-size: 2rem; margin-bottom: 0.5rem;">${escapeHtml(cData.name)} Deep Dive</h2>
          <span class="role-pill" style="margin-bottom: 1rem; display: inline-block;">${escapeHtml(cData.role)}</span>
          <p style="font-size: 1.05rem; color: #cbd5e1; max-width: 600px; margin: 0.5rem auto 1.5rem; line-height: 1.6;">
            ${escapeHtml(cData.pendingText || "Sodapoppin's BlizzCon early access hands-on video transcription is in progress for this class.")}
          </p>
          <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
            <button type="button" class="btn-primary" id="pending-switch-hunter-btn" style="background: linear-gradient(135deg, #4d7c0f, #65a30d); border: none; cursor: pointer;">
              <span>🏹</span> Explore Hunter Deep Dive (Live Now)
            </button>
            <button type="button" class="btn-primary" style="background: rgba(255,255,255,0.08); border: 1px solid var(--border-subtle); color: #fff; cursor: pointer;" onclick="document.querySelector('.nav-tab-btn[data-tab=\\'news\\']').click();">
              <span>📰</span> Check News & Dispatches
            </button>
          </div>
        </div>
      `;

      const switchBtn = document.getElementById('pending-switch-hunter-btn');
      if (switchBtn) {
        switchBtn.addEventListener('click', () => {
          window.switchDeepDiveClass('hunter');
        });
      }
      return;
    }

    // Build the rich view for Hunter (and any future populated class)
    let html = `
      <!-- Deep Dive Class Hero Header -->
      <div class="deepdive-hero-card" style="border-left: 4px solid ${cData.color};">
        <div class="deepdive-hero-top">
          <div style="display: flex; align-items: center; gap: 1rem; flex-wrap: wrap;">
            <span style="font-size: 2.8rem;">${cData.icon}</span>
            <div>
              <div style="display: flex; align-items: center; gap: 0.75rem; flex-wrap: wrap;">
                <h2 style="color: ${cData.color}; font-size: 2rem; margin: 0;">${escapeHtml(cData.name)} Deep Dive</h2>
                <span class="deepdive-badge badge-verified"><span>✓</span> Hands-On Verified</span>
                <span class="deepdive-badge badge-exclusive"><span>✦</span> Living Classic+</span>
              </div>
              <span style="font-size: 0.95rem; color: var(--text-gold); font-weight: 600; display: block; margin-top: 0.2rem;">
                ${escapeHtml(cData.specs)}
              </span>
            </div>
          </div>
          <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
            <span class="role-pill">${escapeHtml(cData.role)}</span>
          </div>
        </div>

        <!-- Video Attribution Callout Box -->
        <div class="deepdive-video-callout">
          <div class="video-callout-icon">📺</div>
          <div class="video-callout-text">
            <div style="display: flex; align-items: center; gap: 0.6rem; flex-wrap: wrap;">
              <strong style="color: #fff; font-size: 1rem;">Primary Source: "${escapeHtml(cData.videoTitle)}"</strong>
              <span class="deepdive-badge badge-demo"><span>🎙️</span> Sodapoppin Early Access</span>
            </div>
            <p style="font-size: 0.85rem; color: #cbd5e1; margin: 0.2rem 0 0;">
              ${escapeHtml(cData.videoSubtitle || cData.sourceAttribution || "Hands-on early access playtest at BlizzCon 2026 covering class changes and live racials testing.")}
            </p>
          </div>
          <a href="${cData.videoUrl}" target="_blank" rel="noopener" class="video-callout-btn">
            <span>▶</span> Watch Video (Timestamped) ↗
          </a>
        </div>

        <p class="deepdive-summary-p">${escapeHtml(cData.summary)}</p>

        <!-- Sub Navigation Bar -->
        <div class="deepdive-subnav-bar">
          ${(cData.subTabs || [
            { id: "overview", label: "Full Dossier", icon: "📑" },
            { id: "core", label: `Core Rules & QoL (${cData.coreRules ? cData.coreRules.length : 0})`, icon: "📜" },
            { id: "matrix", label: `Verification Matrix (${cData.forensicMatrix ? cData.forensicMatrix.length : 0})`, icon: "🔬" }
          ]).map(tab => `
            <button class="deepdive-subnav-btn ${selectedDeepDiveSubTab === tab.id ? 'active' : ''}" data-subtab="${tab.id}">
              <span>${tab.icon}</span> ${escapeHtml(tab.label)}
            </button>
          `).join('')}
        </div>
      </div>

      <!-- Tab Content Area -->
      <div class="deepdive-tab-body">
        ${renderDeepDiveSubTabBody(cData, selectedDeepDiveSubTab)}
      </div>
    `;

    contentContainer.innerHTML = html;

    // Attach sub-tab event listeners
    contentContainer.querySelectorAll('.deepdive-subnav-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        selectedDeepDiveSubTab = btn.getAttribute('data-subtab');
        renderDeepDiveContent();
      });
    });
  }

  function renderDeepDiveSubTabBody(cData, subtab) {
    if (subtab === 'core') {
      return renderCoreRulesSection(cData);
    } else if (subtab === 'matrix') {
      return renderForensicMatrixSection(cData);
    } else if (subtab === 'survival' && cData.survival) {
      return renderSurvivalSection(cData);
    } else if (subtab === 'marksmanship' && cData.marksmanship) {
      return renderMarksmanshipSection(cData);
    } else if (subtab === 'beastmastery' && cData.beastMastery) {
      return renderBeastMasterySection(cData);
    } else if (subtab === 'tauren' && cData.racialSynergies) {
      return renderTaurenRacesSection(cData);
    } else if (subtab === 'enhancement' && cData.enhancement) {
      return renderEnhancementSection(cData);
    } else if (subtab === 'tanking' && cData.tanking) {
      return renderShamanTankingSection(cData);
    } else if (subtab === 'elemental' && cData.elemental) {
      return renderElementalSection(cData);
    } else if (subtab === 'restoration' && cData.id === 'shaman' && cData.restoration) {
      return renderRestorationSection(cData);
    } else if (subtab === 'racials' && cData.id === 'shaman') {
      return renderDwarfRacesSection(cData);
    } else if (subtab === 'arcane' && cData.arcane) {
      return renderArcaneSection(cData);
    } else if (subtab === 'fire' && cData.fire) {
      return renderFireSection(cData);
    } else if (subtab === 'frost' && cData.frost) {
      return renderFrostSection(cData);
    } else if (subtab === 'racials' && cData.id === 'mage') {
      return renderOrcMageRacesSection(cData);
    } else if (subtab === 'holy' && cData.id === 'paladin' && cData.holy) {
      return renderHolyPaladinSection(cData);
    } else if (subtab === 'protection' && cData.id === 'paladin' && cData.protection) {
      return renderProtectionPaladinSection(cData);
    } else if (subtab === 'retribution' && cData.retribution) {
      return renderRetributionPaladinSection(cData);
    } else if (subtab === 'undead' && cData.id === 'paladin') {
      return renderUndeadPaladinRacesSection(cData);
    } else if (subtab === 'arms' && cData.arms) {
      return renderArmsWarriorSection(cData);
    } else if (subtab === 'fury' && cData.fury) {
      return renderFuryWarriorSection(cData);
    } else if (subtab === 'protection' && cData.id === 'warrior' && cData.protection) {
      return renderProtectionWarriorSection(cData);
    } else if (subtab === 'human' && cData.id === 'warrior') {
      return renderHumanWarriorRacesSection(cData);
    } else if (subtab === 'affliction' && cData.affliction) {
      return renderAfflictionWarlockSection(cData);
    } else if (subtab === 'demonology' && cData.demonology) {
      return renderDemonologyWarlockSection(cData);
    } else if (subtab === 'destruction' && cData.destruction) {
      return renderDestructionWarlockSection(cData);
    } else if (subtab === 'gnome' && cData.id === 'warlock') {
      return renderGnomeWarlockRacesSection(cData);
    } else if (subtab === 'discipline' && cData.discipline) {
      return renderDisciplinePriestSection(cData);
    } else if (subtab === 'holy' && cData.id === 'priest' && cData.holy) {
      return renderHolyPriestSection(cData);
    } else if (subtab === 'shadow' && cData.shadow) {
      return renderShadowPriestSection(cData);
    } else if (subtab === 'nightelf' && cData.id === 'priest') {
      return renderNightElfPriestRacesSection(cData);
    } else if (subtab === 'balance' && cData.balance) {
      return renderBalanceDruidSection(cData);
    } else if (subtab === 'feral' && cData.feral) {
      return renderFeralDruidSection(cData);
    } else if (subtab === 'restoration' && cData.id === 'druid' && cData.restoration) {
      return renderRestorationDruidSection(cData);
    } else if (subtab === 'skyelf' && cData.id === 'druid') {
      return renderSkyElfDruidRacesSection(cData);
    } else if (subtab === 'assassination' && cData.assassination) {
      return renderAssassinationRogueSection(cData);
    } else if (subtab === 'combat' && cData.combat) {
      return renderCombatRogueSection(cData);
    } else if (subtab === 'subtlety' && cData.subtlety) {
      return renderSubtletyRogueSection(cData);
    } else if (subtab === 'troll' && cData.id === 'rogue') {
      return renderTrollRogueRacesSection(cData);
    } else {
      // 'overview' - Render complete dossier
      if (cData.id === 'hunter') {
        return `
          <div class="deepdive-dossier-wrapper">
            <div class="dossier-section-block">
              <div class="dossier-block-header">
                <h3><span>📜</span> 1. Core Hunter Rules & Quality of Life</h3>
                <p>Fundamental gameplay systems, trap mechanics, resource handling, and baseline adjustments</p>
              </div>
              ${renderCoreRulesSection(cData)}
            </div>

            <div class="dossier-section-block">
              <div class="dossier-block-header">
                <h3><span>⚔️</span> 2. Survival: The Melee & Trap Vanguard</h3>
                <p>${escapeHtml(cData.survival.tagline)}</p>
              </div>
              ${renderSurvivalSection(cData)}
            </div>

            <div class="dossier-section-block">
              <div class="dossier-block-header">
                <h3><span>🏹</span> 3. Marksmanship: Precision Sniper & Lone Wolf</h3>
                <p>${escapeHtml(cData.marksmanship.tagline)}</p>
              </div>
              ${renderMarksmanshipSection(cData)}
            </div>

            <div class="dossier-section-block">
              <div class="dossier-block-header">
                <h3><span>🐾</span> 4. Beast Mastery: Beast Commander</h3>
                <p>${escapeHtml(cData.beastMastery.tagline)}</p>
              </div>
              ${renderBeastMasterySection(cData)}
            </div>

            <div class="dossier-section-block">
              <div class="dossier-block-header">
                <h3><span>🐂</span> 5. Sodapoppin's Tauren Testing & New Playable Races</h3>
                <p>Empirical in-game speed tests, herb harvest duplication, and new faction race combinations</p>
              </div>
              ${renderTaurenRacesSection(cData)}
            </div>

            <div class="dossier-section-block">
              <div class="dossier-block-header">
                <h3><span>🔬</span> 6. Forensics & Verification Matrix</h3>
                <p>Cross-referenced validation of all claims from BlizzCon hands-on demo against WoW: Forever closed beta</p>
              </div>
              ${renderForensicMatrixSection(cData)}
            </div>
          </div>
        `;
      } else if (cData.id === 'shaman') {
        return `
          <div class="deepdive-dossier-wrapper">
            <div class="dossier-section-block">
              <div class="dossier-block-header">
                <h3><span>📜</span> 1. Core Shaman Rules & Totemic Systems</h3>
                <p>Call of the Ancestors 4-totem dropping, 60-minute imbues, indoor Ghost Wolf, and reagent-free Reincarnation</p>
              </div>
              ${renderCoreRulesSection(cData)}
            </div>

            <div class="dossier-section-block">
              <div class="dossier-block-header">
                <h3><span>⚡</span> 2. Enhancement: The Thunderous Melee & Spellhance Striker</h3>
                <p>${escapeHtml(cData.enhancement.tagline)}</p>
              </div>
              ${renderEnhancementSection(cData)}
            </div>

            <div class="dossier-section-block">
              <div class="dossier-block-header">
                <h3><span>🛡️</span> 3. Tanking Tools & Dungeon Off-Tank Viability</h3>
                <p>${escapeHtml(cData.tanking.tagline)}</p>
              </div>
              ${renderShamanTankingSection(cData)}
            </div>

            <div class="dossier-section-block">
              <div class="dossier-block-header">
                <h3><span>🔥</span> 4. Elemental: Fury of the Storm & Lava</h3>
                <p>${escapeHtml(cData.elemental.tagline)}</p>
              </div>
              ${renderElementalSection(cData)}
            </div>

            <div class="dossier-section-block">
              <div class="dossier-block-header">
                <h3><span>💧</span> 5. Restoration: Tides of Healing & Water Shield</h3>
                <p>${escapeHtml(cData.restoration.tagline)}</p>
              </div>
              ${renderRestorationSection(cData)}
            </div>

            <div class="dossier-section-block">
              <div class="dossier-block-header">
                <h3><span>⛏️</span> 6. Sodapoppin's Dwarf Shaman Testing & New Faction Races</h3>
                <p>Stoneform, Mace Spec +1% spell/attack crit, and Wildhammer Dwarves bringing Windfury to Alliance</p>
              </div>
              ${renderDwarfRacesSection(cData)}
            </div>

            <div class="dossier-section-block">
              <div class="dossier-block-header">
                <h3><span>🔬</span> 7. Forensics & Verification Matrix</h3>
                <p>Cross-referenced validation of all Shaman claims from BlizzCon hands-on demo against WoW: Forever closed beta</p>
              </div>
              ${renderForensicMatrixSection(cData)}
            </div>
          </div>
        `;
      } else if (cData.id === 'mage') {
        return `
          <div class="deepdive-dossier-wrapper">
            <div class="dossier-section-block">
              <div class="dossier-block-header">
                <h3><span>📜</span> 1. Core Mage Rules & Systems</h3>
                <p>Downranking, dual-school Frostfire Bolt, Comprehend Scroll, and rebalanced uncapped Blizzard AoE</p>
              </div>
              ${renderCoreRulesSection(cData)}
            </div>

            <div class="dossier-section-block">
              <div class="dossier-block-header">
                <h3><span>✨</span> 2. Arcane: High-Risk Mana Burn & Missile Barrage</h3>
                <p>${escapeHtml(cData.arcane.tagline)}</p>
              </div>
              ${renderArcaneSection(cData)}
            </div>

            <div class="dossier-section-block">
              <div class="dossier-block-header">
                <h3><span>🔥</span> 3. Fire: Explosive Ignite & Hot Streak Pyroblasts</h3>
                <p>${escapeHtml(cData.fire.tagline)}</p>
              </div>
              ${renderFireSection(cData)}
            </div>

            <div class="dossier-section-block">
              <div class="dossier-block-header">
                <h3><span>❄️</span> 4. Frost: Ice Lance Burst, Fingers of Frost & Controlled AoE</h3>
                <p>${escapeHtml(cData.frost.tagline)}</p>
              </div>
              ${renderFrostSection(cData)}
            </div>

            <div class="dossier-section-block">
              <div class="dossier-block-header">
                <h3><span>🪓</span> 5. Sodapoppin's Orc Mage Testing & New Faction Races</h3>
                <p>Hardiness stun reduction, Blood Fury +10% Spell Power (no heal penalty), and Durotar ley line masters</p>
              </div>
              ${renderOrcMageRacesSection(cData)}
            </div>

            <div class="dossier-section-block">
              <div class="dossier-block-header">
                <h3><span>🔬</span> 6. Forensics & Verification Matrix</h3>
                <p>Cross-referenced validation of all Mage claims from BlizzCon hands-on demo against WoW: Forever closed beta</p>
              </div>
              ${renderForensicMatrixSection(cData)}
            </div>
          </div>
        `;
      } else if (cData.id === 'paladin') {
        return `
          <div class="deepdive-dossier-wrapper">
            <div class="dossier-section-block">
              <div class="dossier-block-header">
                <h3><span>📜</span> 1. Core Paladin Rules & Systems</h3>
                <p>60-minute Blessings, baseline Holy Strike, semi-capped Consecration, and level-40 Cleanse progression</p>
              </div>
              ${renderCoreRulesSection(cData)}
            </div>

            <div class="dossier-section-block">
              <div class="dossier-block-header">
                <h3><span>✨</span> 2. Holy: Light's Vigil, Party AoE Healing & Instant Holy Shock</h3>
                <p>${escapeHtml(cData.holy.tagline)}</p>
              </div>
              ${renderHolyPaladinSection(cData)}
            </div>

            <div class="dossier-section-block">
              <div class="dossier-block-header">
                <h3><span>🛡️</span> 3. Protection: Seal of Fury Taunt, Block Mana & Templar's Bulwark</h3>
                <p>${escapeHtml(cData.protection.tagline)}</p>
              </div>
              ${renderProtectionPaladinSection(cData)}
            </div>

            <div class="dossier-section-block">
              <div class="dossier-block-header">
                <h3><span>⚔️</span> 4. Retribution: Twist of Light, Sacred Arbiter & Hybrid Power</h3>
                <p>${escapeHtml(cData.retribution.tagline)}</p>
              </div>
              ${renderRetributionPaladinSection(cData)}
            </div>

            <div class="dossier-section-block">
              <div class="dossier-block-header">
                <h3><span>💀</span> 5. Sodapoppin's Undead Paladin Testing & New Faction Races</h3>
                <p>Cannibalize (7% HP/Mana), Touch of the Grave drain, and the Horde's first Paladin with the Forsaken Charger mount</p>
              </div>
              ${renderUndeadPaladinRacesSection(cData)}
            </div>

            <div class="dossier-section-block">
              <div class="dossier-block-header">
                <h3><span>🔬</span> 6. Forensics & Verification Matrix</h3>
                <p>Cross-referenced validation of all Paladin claims from BlizzCon hands-on demo against WoW: Forever closed beta</p>
              </div>
              ${renderForensicMatrixSection(cData)}
            </div>
          </div>
        `;
      } else if (cData.id === 'warrior') {
        return `
          <div class="deepdive-dossier-wrapper">
            <div class="dossier-section-block">
              <div class="dossier-block-header">
                <h3><span>📜</span> 1. Core Warrior Rules & Baseline Systems</h3>
                <p>Baseline Tactical Mastery (10 Rage), Victory Rush sustain, 3-minute shouts, and 15-minute Retaliation</p>
              </div>
              ${renderCoreRulesSection(cData)}
            </div>

            <div class="dossier-section-block">
              <div class="dossier-block-header">
                <h3><span>🗡️</span> 2. Arms: Spearing Strike, Unified Weaponmaster & Slam Flow</h3>
                <p>${escapeHtml(cData.arms.tagline)}</p>
              </div>
              ${renderArmsWarriorSection(cData)}
            </div>

            <div class="dossier-section-block">
              <div class="dossier-block-header">
                <h3><span>⚡</span> 3. Fury: Raging Blows, Dual-Wield Scaling & Berserker Rage</h3>
                <p>${escapeHtml(cData.fury.tagline)}</p>
              </div>
              ${renderFuryWarriorSection(cData)}
            </div>

            <div class="dossier-section-block">
              <div class="dossier-block-header">
                <h3><span>🛡️</span> 4. Protection: Defensive Charge, Shield Bash Silence & 9.5m Shield Wall</h3>
                <p>${escapeHtml(cData.protection.tagline)}</p>
              </div>
              ${renderProtectionWarriorSection(cData)}
            </div>

            <div class="dossier-section-block">
              <div class="dossier-block-header">
                <h3><span>👑</span> 5. Sodapoppin's Human Warrior Testing & Playable Races</h3>
                <p>Will to Survive stun break, Sword Specialization (+2% crit), Perception stealth detection, and cross-faction vanguards</p>
              </div>
              ${renderHumanWarriorRacesSection(cData)}
            </div>

            <div class="dossier-section-block">
              <div class="dossier-block-header">
                <h3><span>🔬</span> 6. Forensics & Verification Matrix</h3>
                <p>Cross-referenced validation of all Warrior claims from BlizzCon hands-on demo against WoW: Forever closed beta</p>
              </div>
              ${renderForensicMatrixSection(cData)}
            </div>
          </div>
        `;
      } else if (cData.id === 'warlock') {
        return `
          <div class="deepdive-dossier-wrapper">
            <div class="dossier-section-block">
              <div class="dossier-block-header">
                <h3><span>📜</span> 1. Core Warlock Rules & Demon Stones</h3>
                <p>Modernized Firestone & Spellstone, 0-shard Demonic Sacrifice, Bane rules, and Soul Shard economy</p>
              </div>
              ${renderCoreRulesSection(cData)}
            </div>

            <div class="dossier-section-block">
              <div class="dossier-block-header">
                <h3><span>💀</span> 2. Affliction: Pandemic Critical DoTs, Drain Hope & Soul Harvest</h3>
                <p>${escapeHtml(cData.affliction.tagline)}</p>
              </div>
              ${renderAfflictionWarlockSection(cData)}
            </div>

            <div class="dossier-section-block">
              <div class="dossier-block-header">
                <h3><span>😈</span> 3. Demonology: Demonic Pact, Dual-Pet Synergy & SL/SL Viability</h3>
                <p>${escapeHtml(cData.demonology.tagline)}</p>
              </div>
              ${renderDemonologyWarlockSection(cData)}
            </div>

            <div class="dossier-section-block">
              <div class="dossier-block-header">
                <h3><span>🔥</span> 4. Destruction: Bane of Havoc, Shadow & Flame Weaving & Incinerate</h3>
                <p>${escapeHtml(cData.destruction.tagline)}</p>
              </div>
              ${renderDestructionWarlockSection(cData)}
            </div>

            <div class="dossier-section-block">
              <div class="dossier-block-header">
                <h3><span>⚙️</span> 5. Sodapoppin's Gnome Warlock Testing & Playable Races</h3>
                <p>Escape Artist snare immunity, -50% mana burst racial, Gnomish Ingenuity, and cross-faction fel scholars</p>
              </div>
              ${renderGnomeWarlockRacesSection(cData)}
            </div>

            <div class="dossier-section-block">
              <div class="dossier-block-header">
                <h3><span>🔬</span> 6. Forensics & Verification Matrix</h3>
                <p>Cross-referenced validation of all Warlock claims from BlizzCon hands-on demo against WoW: Forever closed beta</p>
              </div>
              ${renderForensicMatrixSection(cData)}
            </div>
          </div>
        `;
      } else if (cData.id === 'priest') {
        return `
          <div class="deepdive-dossier-wrapper">
            <div class="dossier-section-block">
              <div class="dossier-block-header">
                <h3><span>📜</span> 1. Core Priest Rules & Shared Spells</h3>
                <p>Universal Devouring Plague & Fear Ward, baseline Divine Spirit, and critical-strike DoTs</p>
              </div>
              ${renderCoreRulesSection(cData)}
            </div>

            <div class="dossier-section-block">
              <div class="dossier-block-header">
                <h3><span>🛡️</span> 2. Discipline: Penance, Soul Warding & Divine Aegis</h3>
                <p>${escapeHtml(cData.discipline.tagline)}</p>
              </div>
              ${renderDisciplinePriestSection(cData)}
            </div>

            <div class="dossier-section-block">
              <div class="dossier-block-header">
                <h3><span>✨</span> 3. Holy: Prayer of Mending, Litany of Light & Spirit Scaling</h3>
                <p>${escapeHtml(cData.holy.tagline)}</p>
              </div>
              ${renderHolyPriestSection(cData)}
            </div>

            <div class="dossier-section-block">
              <div class="dossier-block-header">
                <h3><span>🌑</span> 4. Shadow: Shadowform 50% Mana, Devouring Plague & Vampiric Embrace</h3>
                <p>${escapeHtml(cData.shadow.tagline)}</p>
              </div>
              ${renderShadowPriestSection(cData)}
            </div>

            <div class="dossier-section-block">
              <div class="dossier-block-header">
                <h3><span>🌙</span> 5. Sodapoppin's Night Elf Priest Testing & Playable Races</h3>
                <p>In-combat Shadowmeld threat dropping, Elune's Light (+10% crit burst), Elune's Grace, and cross-faction clergy</p>
              </div>
              ${renderNightElfPriestRacesSection(cData)}
            </div>

            <div class="dossier-section-block">
              <div class="dossier-block-header">
                <h3><span>🔬</span> 6. Forensics & Verification Matrix</h3>
                <p>Cross-referenced validation of all Priest claims from BlizzCon hands-on demo against WoW: Forever closed beta</p>
              </div>
              ${renderForensicMatrixSection(cData)}
            </div>
          </div>
        `;
      } else if (cData.id === 'druid') {
        return `
          <div class="deepdive-dossier-wrapper">
            <div class="dossier-section-block">
              <div class="dossier-block-header">
                <h3><span>📜</span> 1. Core Druid Rules & Shifting Systems</h3>
                <p>Baseline Omen of Clarity & Nature's Grasp, Revive resurrection, smooth energy, and Furor power-shifting overhaul</p>
              </div>
              ${renderCoreRulesSection(cData)}
            </div>

            <div class="dossier-section-block">
              <div class="dossier-block-header">
                <h3><span>🌙</span> 2. Balance: Eclipse Charges, Balance of Nature & Moonkin Form</h3>
                <p>${escapeHtml(cData.balance.tagline)}</p>
              </div>
              ${renderBalanceDruidSection(cData)}
            </div>

            <div class="dossier-section-block">
              <div class="dossier-block-header">
                <h3><span>🐾</span> 3. Feral: King of the Jungle, Cat Feral Charge & Bear Defense Scaling</h3>
                <p>${escapeHtml(cData.feral.tagline)}</p>
              </div>
              ${renderFeralDruidSection(cData)}
            </div>

            <div class="dossier-section-block">
              <div class="dossier-block-header">
                <h3><span>🌱</span> 4. Restoration: Wild Growth, Swiftmend & 0.5s GCD Reduction</h3>
                <p>${escapeHtml(cData.restoration.tagline)}</p>
              </div>
              ${renderRestorationDruidSection(cData)}
            </div>

            <div class="dossier-section-block">
              <div class="dossier-block-header">
                <h3><span>🪶</span> 5. Sodapoppin's Sky Elf Druid Testing & Playable Races</h3>
                <p>Walk on Air 10s glide, Wind Blessed (+10% speed / +1% haste), unique avian shapeshift forms, and faction choices</p>
              </div>
              ${renderSkyElfDruidRacesSection(cData)}
            </div>

            <div class="dossier-section-block">
              <div class="dossier-block-header">
                <h3><span>🔬</span> 6. Forensics & Verification Matrix</h3>
                <p>Cross-referenced validation of all Druid claims from BlizzCon hands-on demo against WoW: Forever closed beta</p>
              </div>
              ${renderForensicMatrixSection(cData)}
            </div>
          </div>
        `;
      } else if (cData.id === 'rogue') {
        return `
          <div class="deepdive-dossier-wrapper">
            <div class="dossier-section-block">
              <div class="dossier-block-header">
                <h3><span>📜</span> 1. Core Rogue Rules & Control Toolkit</h3>
                <p>AP and critical poison scaling, Blind poison classification, absence of Cloak of Shadows, and stealth bonuses</p>
              </div>
              ${renderCoreRulesSection(cData)}
            </div>

            <div class="dossier-section-block">
              <div class="dossier-block-header">
                <h3><span>🩸</span> 2. Assassination: Daggerless Mutilate & Crit Poisons</h3>
                <p>${escapeHtml(cData.assassination.tagline)}</p>
              </div>
              ${renderAssassinationRogueSection(cData)}
            </div>

            <div class="dossier-section-block">
              <div class="dossier-block-header">
                <h3><span>⚔️</span> 3. Combat: Restless Blades Cooldown Cycling & Cleave</h3>
                <p>${escapeHtml(cData.combat.tagline)}</p>
              </div>
              ${renderCombatRogueSection(cData)}
            </div>

            <div class="dossier-section-block">
              <div class="dossier-block-header">
                <h3><span>👤</span> 4. Subtlety: Thousand Cuts Rupture Engine</h3>
                <p>${escapeHtml(cData.subtlety.tagline)}</p>
              </div>
              ${renderSubtletyRogueSection(cData)}
            </div>

            <div class="dossier-section-block">
              <div class="dossier-block-header">
                <h3><span>🏹</span> 5. Sodapoppin's Troll Testing & Playable Races</h3>
                <p>Flat 10% Berserking, 50% HP active regeneration channel, Beast Slaying, and in-combat regeneration</p>
              </div>
              ${renderTrollRogueRacesSection(cData)}
            </div>

            <div class="dossier-section-block">
              <div class="dossier-block-header">
                <h3><span>🔬</span> 6. Forensics & Verification Matrix</h3>
                <p>Cross-referenced validation of all Rogue claims from BlizzCon hands-on demo against WoW: Forever closed beta</p>
              </div>
              ${renderForensicMatrixSection(cData)}
            </div>
          </div>
        `;
      }
      return '';
    }
  }

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

  function renderForensicMatrixSection(cData) {
    return `
      <div class="forensic-matrix-wrapper">
        <div class="table-responsive-container">
          <table class="forensic-table">
            <thead>
              <tr>
                <th>Feature / Ability</th>
                <th>Category</th>
                <th>Tested Mechanics & Values</th>
                <th>Verification Status</th>
                <th>Primary Source</th>
              </tr>
            </thead>
            <tbody>
              ${cData.forensicMatrix.map(row => `
                <tr>
                  <td><strong style="color: #fff;">${escapeHtml(row.feature)}</strong></td>
                  <td><span class="matrix-cat-pill">${escapeHtml(row.category)}</span></td>
                  <td style="color: #cbd5e1; font-size: 0.88rem;">${escapeHtml(row.details)}</td>
                  <td>
                    <span class="deepdive-badge ${row.statusType === 'verified' ? 'badge-verified' : row.statusType === 'demo' ? 'badge-demo' : 'badge-exclusive'}">
                      ${escapeHtml(row.status)}
                    </span>
                  </td>
                  <td style="color: var(--text-gold); font-size: 0.82rem;">${escapeHtml(row.source)}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  // Initial render
  renderDeepDiveChips();
  renderDeepDiveContent();
}

