/**
 * World of Warcraft: Forever - Professions & Trade Economy Hub Module (Orchestrator)
 * Coordinates subtab routing, master layout, recipe filtering, and delegates to specialized sub-modules:
 * - professions-core.js: Shared icon formatting, passive lookups, skill tiers, and BiS metadata.
 * - professions-modal.js: Interactive floating tooltips and reverse reagent lookup modal.
 * - professions-leveling.js: 1-300 Leveling roadmaps and dynamic shopping list shortfall calculator.
 * - professions-tabs.js: Specializations, Bag Containers, Role Pairing Wizard, Trainers, Camping & Fishing.
 * - professions-routes.js: Gathering node circuits, interactive SVG route curves & map modal.
 */

(function () {
  "use strict";

  let currentProfession = 'overview';
  let currentSubTab = 'recipes';
  let currentCategory = 'all';
  let searchQuery = '';
  let filterNewOnly = false;
  let filterBetaCap = false;
  let filterDungeonOnly = false;
  let filterBlueprintOnly = false;
  let playerSkill = null;
  let gatheringViewMode = 'routes';
  let activeMiningTier = 'copper';
  let activeHerbTier = 'herb_tier1';
  let activeContainerType = 'all';
  let activeRolePairing = 'tank';
  let trainerFactionFilter = 'all';
  let trainerRankFilter = 'all';
  let trainerProfFilter = 'all';
  let trainerZoneFilter = 'all';
  let trainerSearchQuery = '';


  const core = window.WOW_PROFESSIONS_CORE || {};
  const escapeHtml = core.escapeHtml || window.escapeHtml || (s => String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"));
  const getIconUrl = core.getIconUrl || ((icon) => "https://wow.zamimg.com/images/wow/icons/medium/" + (icon || "inv_misc_questionmark") + ".jpg");
  const getPlaceholderIcon = core.getPlaceholderIcon || (() => null);
  const getProfessionPassive = core.getProfessionPassive || (() => null);
  const getSkillClass = core.getSkillClass || (() => "skill-orange");
  const isDungeonRecipe = core.isDungeonRecipe || (() => false);
  const isBlueprintRecipe = core.isBlueprintRecipe || (() => false);
  const getBiSInfo = core.getBiSInfo || (() => null);
  const buildBiSLookupMap = core.buildBiSLookupMap || (() => new Map());

  function attachTooltipListeners(container, prof) {
    if (window.WOW_PROFESSIONS_MODAL && window.WOW_PROFESSIONS_MODAL.attachTooltipListeners) {
      window.WOW_PROFESSIONS_MODAL.attachTooltipListeners(container, prof);
    }
  }

  function renderRolePairingWizard() {
    return window.WOW_PROFESSIONS_TABS?.renderRolePairingWizard ? window.WOW_PROFESSIONS_TABS.renderRolePairingWizard() : "";
  }

  function renderMasterTrainerDirectory() {
    return window.WOW_PROFESSIONS_TABS?.renderMasterTrainerDirectory ? window.WOW_PROFESSIONS_TABS.renderMasterTrainerDirectory() : "";
  }

  function parseHashRoute() {
    const raw = (window.location.hash || '').toLowerCase();
    if (!raw) return { profession: 'overview', subtab: 'recipes' };

    let cleaned = raw.replace(/^#+/, '');
    if (cleaned.startsWith('professions')) {
      cleaned = cleaned.replace(/^professions[/#]?/, '');
    }

    if (!cleaned || cleaned === 'overview') {
      return { profession: 'overview', subtab: 'recipes' };
    }

    // Replace '#' with '/' to treat formats like "alchemy#leveling" same as "alchemy/leveling"
    const parts = cleaned.replace(/#/g, '/').split('/').filter(Boolean);
    const slug = parts[0] || 'overview';
    const subtab = parts[1] || 'recipes';

    return { profession: slug, subtab };
  }

  function handleProfessionsHashRoute() {
    const route = parseHashRoute();
    if (route.profession === 'overview' || (window.WOW_PROFESSIONS_DATA && window.WOW_PROFESSIONS_DATA[route.profession])) {
      currentProfession = route.profession;
      currentSubTab = route.subtab;
      currentCategory = 'all';
      searchQuery = '';
      renderSelectorButtons();
      renderActiveProfession();
    }
  }

  function initProfessionsHub() {
    const container = document.getElementById('tab-professions');
    if (!container) return;

    if (!window.WOW_PROFESSIONS_DATA) {
      console.warn('WOW_PROFESSIONS_DATA not loaded yet.');
      return;
    }

    // Read URL hash on load
    const route = parseHashRoute();
    if (route.profession === 'overview' || window.WOW_PROFESSIONS_DATA[route.profession]) {
      currentProfession = route.profession;
      currentSubTab = route.subtab;
    } else {
      currentProfession = 'overview';
    }

    renderMasterLayout(container);

    // Live hash listener for seamless subtab/profession browsing
    window.addEventListener('hashchange', () => {
      const targetHash = (window.location.hash || '').toLowerCase();
      if (targetHash.includes('professions') || (window.WOW_PROFESSIONS_DATA && Object.keys(window.WOW_PROFESSIONS_DATA).some(k => targetHash.includes(k)))) {
        handleProfessionsHashRoute();
      }
    });
  }

  function renderMasterLayout(container) {
    let mount = document.getElementById('professions-interactive-mount');
    if (!mount) {
      mount = document.createElement('div');
      mount.id = 'professions-interactive-mount';
      mount.className = 'professions-interactive-hub';
      container.appendChild(mount);
    }

    mount.innerHTML = `
      <!-- Profession Selector Toolbar -->
      <div class="prof-selector-container">
        <div class="prof-selector-grid" id="prof-selector-buttons"></div>
      </div>

      <!-- Active Profession Viewport -->
      <div id="prof-viewport-container"></div>
    `;

    renderSelectorButtons();
    renderActiveProfession();
  }

  function renderSelectorButtons() {
    const grid = document.getElementById('prof-selector-buttons');
    if (!grid) return;

    const data = window.WOW_PROFESSIONS_DATA;
    const slugs = Object.keys(data);

    // Always include Overview button first
    let html = `
      <button type="button" class="prof-tile-btn ${currentProfession === 'overview' ? 'active' : ''}" data-slug="overview">
        <span style="font-size: 1.3rem; display: inline-flex; align-items: center; justify-content: center; height: 32px;">🌐</span>
        <span class="prof-tile-name">All Professions</span>
      </button>
    `;

    slugs.forEach(slug => {
      const p = data[slug];
      const isActive = slug === currentProfession;
      const isNewTrade = slug === 'camping';

      html += `
        <button type="button" class="prof-tile-btn ${isActive ? 'active' : ''}" data-slug="${slug}">
          ${isNewTrade ? '<span class="prof-tile-badge">NEW</span>' : ''}
          <img src="${getIconUrl(p.icon)}" alt="${escapeHtml(p.name)}" class="prof-tile-icon" loading="lazy" />
          <span class="prof-tile-name">${escapeHtml(p.name)}</span>
        </button>
      `;
    });

    grid.innerHTML = html;

    // Attach click events
    grid.querySelectorAll('.prof-tile-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const slug = btn.getAttribute('data-slug');
        if (slug !== currentProfession) {
          currentProfession = slug;
          currentCategory = 'all';
          searchQuery = '';
          grid.querySelectorAll('.prof-tile-btn').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          renderActiveProfession();

          const targetHash = slug === 'overview' ? '#professions' : `#professions/${slug}/${currentSubTab}`;
          if ((window.location.hash || '').toLowerCase() !== targetHash.toLowerCase()) {
            try {
              history.pushState({ tab: 'professions', profession: slug, subtab: currentSubTab }, '', targetHash);
            } catch {
              if (history.replaceState) history.replaceState(null, '', targetHash);
            }
          }
        }
      });
    });
  }

  function getAvailableSubTabs(prof) {
    const slug = currentProfession;
    const isCrafting = ['alchemy', 'blacksmithing', 'enchanting', 'engineering', 'leatherworking', 'tailoring', 'cooking', 'first-aid'].includes(slug);
    const isMining = slug === 'mining';
    const isHerbalism = slug === 'herbalism';
    const isSkinning = slug === 'skinning';
    const isFishing = slug === 'fishing';
    const isCamping = slug === 'camping';

    const tabs = [];

    if (isCrafting) {
      const count = prof.stats?.recipeCount || prof.recipes?.length || 0;
      tabs.push({ id: 'recipes', icon: '📜', label: `Recipes (${count})` });
      tabs.push({ id: 'leveling', icon: '📈', label: 'Leveling 1–300' });
      tabs.push({ id: 'shopping', icon: '🛒', label: 'Shopping List' });
      if (['engineering', 'blacksmithing', 'leatherworking'].includes(slug)) {
        tabs.push({ id: 'specs', icon: '⭐', label: 'Specializations' });
      }
      if (['tailoring', 'leatherworking'].includes(slug)) {
        tabs.push({ id: 'containers', icon: '🎒', label: slug === 'tailoring' ? 'Containers & Bags' : 'Quivers & Pouches' });
      }
      const favorCount = prof.stats?.favorRecipes || (prof.favor && prof.favor.recipes && prof.favor.recipes.length) || 0;
      if (favorCount > 0) {
        tabs.push({ id: 'favor', icon: '📦', label: `Merchant's Favor (${favorCount})` });
      }
      tabs.push({ id: 'camp', icon: '⛺', label: 'Camp & Perks' });
    } else if (isMining) {
      tabs.push({ id: 'leveling', icon: '📈', label: 'Leveling & Smelting Route' });
      if (prof.shopping?.groups?.length) {
        tabs.push({ id: 'shopping', icon: '🛒', label: 'Smelting Shopping List' });
      }
      tabs.push({ id: 'nodes', icon: '⛏️', label: `Mining Nodes & Routes (${prof.nodes?.length || 10})` });
      tabs.push({ id: 'recipes', icon: '🔥', label: `Smelting (${prof.recipes?.length || 14})` });
      tabs.push({ id: 'camp', icon: '⛺', label: 'Camp & Perks' });
    } else if (isHerbalism) {
      tabs.push({ id: 'leveling', icon: '📈', label: 'Leveling Route' });
      tabs.push({ id: 'nodes', icon: '🌿', label: `Herb Nodes & Routes (${prof.nodes?.length || 28})` });
      tabs.push({ id: 'camp', icon: '⛺', label: 'Camp & Perks' });
    } else if (isSkinning) {
      tabs.push({ id: 'leveling', icon: '📈', label: 'Skinning by Level' });
      tabs.push({ id: 'camp', icon: '⛺', label: 'Camp & Perks' });
    } else if (isFishing) {
      tabs.push({ id: 'waters', icon: '🌊', label: 'Waters & Schedule' });
      tabs.push({ id: 'lures', icon: '🪱', label: `Fishing Lures (${prof.fishingLures?.length || 14})` });
      tabs.push({ id: 'ranks', icon: '🎖️', label: `Ranks (${prof.ranks?.length || 8})` });
      tabs.push({ id: 'camp', icon: '⛺', label: 'Camp & Perks' });
    } else if (isCamping) {
      tabs.push({ id: 'guide', icon: '⛺', label: 'How It Works & Campfires' });
      tabs.push({ id: 'leveling', icon: '📈', label: 'Leveling 1–225' });
      tabs.push({ id: 'shopping', icon: '🛒', label: 'Shopping List' });
      tabs.push({ id: 'buffs', icon: '✨', label: 'Camp Buffs (11)' });
      tabs.push({ id: 'upgrades', icon: '🛠️', label: 'Upgrades (140 & 300)' });
      tabs.push({ id: 'perks', icon: '🏆', label: 'Legacy Perks & Rules' });
      tabs.push({ id: 'hub', icon: '🏕️', label: 'Wilderness Hub ›' });
    }

    return tabs;
  }

  function renderActiveProfession() {
    const viewport = document.getElementById('prof-viewport-container');
    if (!viewport) return;

    if (currentProfession === 'overview') {
      renderOverviewHub(viewport);
      return;
    }

    const prof = window.WOW_PROFESSIONS_DATA[currentProfession];
    if (!prof) {
      currentProfession = 'overview';
      renderOverviewHub(viewport);
      return;
    }

    const availableTabs = getAvailableSubTabs(prof);
    const validTabIds = availableTabs.map(t => t.id);
    if (!validTabIds.includes(currentSubTab)) {
      currentSubTab = availableTabs[0].id;
    }

    const passiveData = getProfessionPassive(prof.name || currentProfession);
    const combatBuffHtml = passiveData ? `
      <div class="prof-combat-buff-pill" title="Permanent Character Combat Passive granted by ${escapeHtml(prof.name)}">
        <span class="prof-buff-icon-badge">${passiveData.icon || '✨'}</span>
        <div class="prof-combat-buff-text">
          <span class="prof-buff-tag">✨ COMBAT PASSIVE</span>
          <strong>${escapeHtml(passiveData.passiveName)}:</strong> ${escapeHtml(passiveData.passiveEffect)}
        </div>
      </div>
    ` : '';

    const campBuffHtml = prof.campBuff ? `
      <div class="prof-camp-buff-pill" title="Wilderness Campfire Station Aura granted by ${escapeHtml(prof.name)}">
        <span class="prof-buff-icon-badge">⛺</span>
        <div class="prof-camp-buff-text">
          <span class="prof-buff-tag camp">🔥 CAMPFIRE AURA (${escapeHtml(prof.campBuff.name)})</span>
          <strong>Camp Skill ${prof.campBuff.skill}+:</strong> ${escapeHtml(prof.campBuff.effect)}
        </div>
      </div>
    ` : '';

    const isCamping = currentProfession === 'camping';
    const recipeCountDisplay = isCamping ? (prof.stats?.campfires || 3) : (prof.stats?.recipeCount || prof.recipes?.length || (prof.nodes ? prof.nodes.length : '1-300'));
    const recipeLabelDisplay = isCamping ? 'Campfires' : (prof.category === 'Gathering' ? 'Nodes' : 'Recipes');
    const newCountDisplay = isCamping ? (prof.stats?.campObjects || 35) : (prof.stats?.newInForever || (prof.category === 'Gathering' ? 'Phase 2' : 'New'));
    const newLabelDisplay = isCamping ? 'Camp Objects' : 'Forever Changes';
    const favorCountDisplay = isCamping ? (prof.stats?.legacyPerks || 3) : (prof.stats?.favorRecipes || (prof.campPerks?.milestones?.length ? 'Account' : '0'));
    const favorLabelDisplay = isCamping ? 'Legacy Perks' : 'Trade Rewards';

    viewport.innerHTML = `
      <!-- Hero Banner -->
      <div class="prof-hero-card">
        <div class="prof-hero-main">
          <img src="${getIconUrl(prof.icon)}" alt="${escapeHtml(prof.name)}" class="prof-hero-large-icon" />
          <div class="prof-hero-title">
            <h3>${escapeHtml(prof.name)} <span style="font-size: 0.9rem; font-weight: 500; color: #94a3b8;">(${escapeHtml(prof.category)})</span></h3>
            <p>${escapeHtml(prof.summary)}</p>
            ${prof.synergy ? `<div style="font-size: 0.82rem; color: #38bdf8; margin-top: 0.35rem; font-style: italic;">🔗 ${escapeHtml(prof.synergy)}</div>` : ''}
            <div class="prof-hero-buffs-container">
              ${combatBuffHtml}
              ${campBuffHtml}
            </div>
          </div>
        </div>
        <div class="prof-hero-stats">
          <div class="prof-stat-box">
            <div class="prof-stat-num">${recipeCountDisplay}</div>
            <div class="prof-stat-label">${recipeLabelDisplay}</div>
          </div>
          <div class="prof-stat-box">
            <div class="prof-stat-num" style="color: #38bdf8;">${newCountDisplay}</div>
            <div class="prof-stat-label">${newLabelDisplay}</div>
          </div>
          <div class="prof-stat-box">
            <div class="prof-stat-num" style="color: #4ade80;">${favorCountDisplay}</div>
            <div class="prof-stat-label">${favorLabelDisplay}</div>
          </div>
        </div>
      </div>

      <!-- Sub-Navigation Bar -->
      <nav class="prof-subnav-bar">
        ${availableTabs.map(t => `
          <button type="button" class="prof-subnav-btn ${currentSubTab === t.id ? 'active' : ''}" data-subtab="${t.id}">
            <span>${t.icon}</span> ${t.label}
          </button>
        `).join('')}
      </nav>

      <!-- Subtab Content Body -->
      <div id="prof-subtab-body"></div>
    `;

    // Subtab click handlers
    viewport.querySelectorAll('.prof-subnav-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const sub = btn.getAttribute('data-subtab');
        if (sub === 'hub') {
          const b = document.querySelector('.nav-tab-btn[data-tab="camping"]');
          if (b) b.click();
          window.location.hash = 'camping';
          return;
        }
        currentSubTab = sub;
        viewport.querySelectorAll('.prof-subnav-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderSubTabContent(prof);

        const targetHash = `#professions/${currentProfession}/${currentSubTab}`;
        if ((window.location.hash || '').toLowerCase() !== targetHash.toLowerCase()) {
          try {
            history.pushState({ tab: 'professions', profession: currentProfession, subtab: currentSubTab }, '', targetHash);
          } catch {
            if (history.replaceState) history.replaceState(null, '', targetHash);
          }
        }
      });
    });

    renderSubTabContent(prof);
  }

  function renderOverviewHub(container) {
    const data = window.WOW_PROFESSIONS_DATA || {};
    const allSlugs = Object.keys(data);
    const slugs = allSlugs.filter(s => s !== 'camping');

    const totalRecipes = allSlugs.reduce((acc, s) => acc + (data[s]?.recipes?.length || 0), 0);
    const totalNew = allSlugs.reduce((acc, s) => acc + (data[s]?.recipes?.filter(r => r.isNew)?.length || 0), 0);
    const totalFavor = allSlugs.reduce((acc, s) => acc + (data[s]?.favor?.recipes?.length || 0), 0);

    const matrixRows = [
      { slug: 'alchemy', name: 'Alchemy', icon: 'trade_alchemy', s20: 'Mana Well', s20Desc: '29 Mana every 5 sec to everyone sitting nearby', s20Icon: 'spell_arcane_manatap', s140: 'Fermenter', s140Desc: 'Makes certain Alchemy reagents, gives Mana Well buff', s140Icon: 'inv_alchemy_90_cauldron', s300: 'Alchemy Laboratory', s300Desc: 'Needed for advanced recipes, gives Mana Well buff', s300Icon: '10prof_portabletable_alchemy01' },
      { slug: 'blacksmithing', name: 'Blacksmithing', icon: 'trade_blacksmithing', s20: 'Sharpening Wheel', s20Desc: '34 Strength to everyone sitting nearby', s20Icon: 'inv_stone_grindingstone_01', s140: 'Anvil', s140Desc: 'An anvil at camp, gives Sharpening Wheel buff', s140Icon: 'trade_blacksmithing', s300: 'Master Forge', s300Desc: 'Needed for advanced recipes, gives Sharpening Wheel buff', s300Icon: 'inv_misc_firestone_01' },
      { slug: 'enchanting', name: 'Enchanting', icon: 'trade_engraving', s20: 'Enchanted Lute', s20Desc: '308 Armor, 13 to all stats and 22 to all resistances', s20Icon: 'inv_10_enchanting2_magicswirl_bronze', s140: 'Arcane Salvager', s140Desc: 'Disenchants more efficiently, gives Enchanted Lute buff', s140Icon: 'inv_misc_gem_sapphire_02', s300: 'Arcane Forge', s300Desc: 'Needed for advanced recipes, gives Enchanted Lute buff', s300Icon: 'inv_enchant_disenchant' },
      { slug: 'engineering', name: 'Engineering', icon: 'trade_engineering', s20: 'Reagent Bot', s20Desc: 'Sells reagents to everyone at camp', s20Icon: 'inv_misc_enggizmos_13', s140: 'Repair Bot', s140Desc: 'Sells reagents and repairs gear', s140Icon: 'inv_gizmo_01', s300: "Anarchist's Workbench", s300Desc: 'Needed for the most advanced Engineering recipes', s300Icon: 'inv_misc_bomb_02' },
      { slug: 'leatherworking', name: 'Leatherworking', icon: 'trade_leatherworking', s20: 'Camp Tent', s20Desc: 'Rested experience up to 5% of a level', s20Icon: 'inv_misc_leatherscrap_01', s140: 'Tanning Rack', s140Desc: 'Makes certain Leatherworking reagents, gives Camp Tent bonus', s140Icon: 'inv_misc_pelt_wolf_ruin_03', s300: 'Sewing Machine', s300Desc: 'Needed for advanced recipes, gives Camp Tent bonus', s300Icon: 'inv_misc_monsterscales_11' },
      { slug: 'tailoring', name: 'Tailoring', icon: 'trade_tailoring', s20: 'Faction Banner', s20Desc: '32 Spirit to everyone of your faction sitting nearby', s20Icon: 'inv_banner_03', s140: 'Spinning Wheel', s140Desc: 'Makes certain Tailoring reagents, gives Faction Banner buff', s140Icon: 'inv_fabric_linen_01', s300: 'Loom', s300Desc: 'Needed for advanced recipes, gives Faction Banner buff', s300Icon: 'inv_fabric_mageweave_01' },
      { slug: 'mining', name: 'Mining', icon: 'trade_mining', s20: 'Lodestone', s20Desc: '90 melee Attack Power to everyone sitting nearby', s20Icon: 'inv_misc_rune_06', s140: 'Rock Garden', s140Desc: 'Spawns a common mining node over time, gives Lodestone buff', s140Icon: 'inv_ore_iron_01', s300: 'Molten Foundry', s300Desc: 'Needed for recipes that require it, gives Lodestone buff', s300Icon: 'inv_ore_thorium_02' },
      { slug: 'herbalism', name: 'Herbalism', icon: 'trade_herbalism', s20: 'Incense Candle', s20Desc: '25 Intellect to everyone sitting nearby', s20Icon: 'inv_misc_candle_02', s140: 'Greenhouse', s140Desc: 'Grows herbs over time from planted seeds, gives Incense Candle buff', s140Icon: 'inv_misc_flower_02', s300: 'Seed Hybridizer', s300Desc: 'Multiplies seeds or combines them into rarer tiers, gives Incense Candle buff', s300Icon: 'inv_misc_herb_sansamroot' },
      { slug: 'skinning', name: 'Skinning', icon: 'inv_misc_pelt_wolf_01', s20: 'Camp Chair', s20Desc: '2% critical strike chance with spells and attacks', s20Icon: 'inv_crate_01', s140: 'Field Guide', s140Desc: 'Grants Track Beasts to whoever reads it, gives Camp Chair buff', s140Icon: 'inv_misc_book_03', s300: "Trapper's Workbench", s300Desc: 'Holds one trap, gives Camp Chair buff', s300Icon: 'inv_misc_monsterscales_08' },
      { slug: 'cooking', name: 'Cooking', icon: 'inv_misc_food_15', s20: 'Basic Campfire Kit', s20Desc: 'A campfire for cooking, with room for 3 camp objects', s20Icon: 'inv_camelot_camping_welcomingcampfire', s140: "Cookie's Feast", s140Desc: 'Stamina food for everyone at camp', s140Icon: 'inv_misc_food_54', s300: 'Iron Oven', s300Desc: 'Needed for the most advanced Cooking recipes', s300Icon: 'inv_misc_food_11' },
      { slug: 'fishing', name: 'Fishing', icon: 'trade_fishing', s20: 'Fish Bowl', s20Desc: '8% to all stats for everyone sitting nearby', s20Icon: 'inv_magicalfishpet', s140: 'Fishing Rack', s140Desc: 'Uncommon fish for 1 hr and Fishing Skill lures, gives Fish Bowl buff', s140Icon: 'inv_10_fishing_bait_color1', s300: 'Fishing Hut', s300Desc: 'Rare fish for 1 hr and Fishing Skill lures, gives Fish Bowl buff', s300Icon: 'inv_helm_armor_buckledhat_b_01_black' },
      { slug: 'first-aid', name: 'First Aid', icon: 'spell_holy_sealofsacrifice', s20: 'First Aid Kit', s20Desc: '56 Stamina to everyone sitting nearby', s20Icon: 'inv_misc_bandage_11', s140: 'Toxin Study', s140Desc: 'Holds healing potions and anti-venom, gives First Aid Kit buff', s140Icon: 'inv_potion_19', s300: "Plague Doctor's Laboratory", s300Desc: 'Holds healing potions and poultices, gives First Aid Kit buff', s300Icon: 'inv_misc_bandage_15' }
    ];

    container.innerHTML = `
      <div class="prof-overview-container">
        <!-- Hero Header -->
        <div class="prof-overview-hero">
          <div class="prof-overview-title">
            <h3>Professions & Trade Economy in WoW Forever</h3>
            <p>Professions level from 1 to 300 with rich Classic progression, expanded with open-world utility: tradeskills add 1-hour party auras to shared campfires, supply crates unlock exclusive recipes at trade camps, and hundreds of items are brand new.</p>
          </div>
          <div class="prof-overview-stats">
            <div class="prof-overview-stat-card">
              <div class="stat-val">${totalRecipes.toLocaleString()}</div>
              <div class="stat-lbl">Total Recipes</div>
            </div>
            <div class="prof-overview-stat-card">
              <div class="stat-val" style="color: #38bdf8;">${totalNew}</div>
              <div class="stat-lbl">New in Forever</div>
            </div>
            <div class="prof-overview-stat-card">
              <div class="stat-val" style="color: #4ade80;">${totalFavor}</div>
              <div class="stat-lbl">Merchant's Favor</div>
            </div>
          </div>
        </div>

        <!-- 4 Core Innovation Pillars -->
        <div class="prof-pillars-grid">
          <div class="prof-pillar-card">
            <div class="prof-pillar-head">
              <span class="prof-pillar-icon">⛺</span>
              <h4>The Campfire System</h4>
            </div>
            <p>A campfire gives vendors, repairs, workspaces and 1-hour aura buffs to players sitting by it. Cooks build it, and each profession adds its own objects.</p>
          </div>
          <div class="prof-pillar-card">
            <div class="prof-pillar-head">
              <span class="prof-pillar-icon">📦</span>
              <h4>Merchant's Favor</h4>
            </div>
            <p>Fill supply crates found across Azeroth and hand them in at faction trade outposts. 317 exclusive recipes are sold across seven trades.</p>
          </div>
          <div class="prof-pillar-card">
            <div class="prof-pillar-head">
              <span class="prof-pillar-icon">🏆</span>
              <h4>Legacy Points & Perks</h4>
            </div>
            <p>Crafting professions award 1 Legacy point at skill 150, 225, and 300, once per account. 11 perks enhance skill-ups, gathering, crates, and camps.</p>
          </div>
          <div class="prof-pillar-card">
            <div class="prof-pillar-head">
              <span class="prof-pillar-icon">🍖</span>
              <h4>Experience Food Buffs</h4>
            </div>
            <p>While Well Fed with Forever cooking meals, your character gains +5% more experience from monster kills, stacking with rest bonuses.</p>
          </div>
        </div>

        <!-- All Professions Directory Grid -->
        <div class="section-heading-bar" style="margin-top: 1rem;">
          <div>
            <h2><span>🔨</span> Explore Every Profession (13)</h2>
            <p class="section-subtext">Click any trade to explore its recipe catalog, 1–300 leveling roadmap, reagent shopping list, and Merchant's Favor turn-ins</p>
          </div>
        </div>

        <div class="prof-overview-grid">
          ${slugs.map(slug => {
            const p = data[slug];
            const recipeCount = p.stats?.recipeCount || p.recipes?.length || (p.nodes ? p.nodes.length : '1-300');
            const newCount = p.stats?.newInForever || (p.category === 'Gathering' ? 'Phase 2' : 'New');
            const favorCount = p.stats?.favorRecipes || (p.campPerks?.milestones?.length ? 'Account' : '0');
            const cardPassive = getProfessionPassive(p.name || slug);
            return `
              <div class="prof-directory-card" data-slug="${slug}">
                <div>
                  <div class="prof-dir-head">
                    <img src="${getIconUrl(p.icon)}" alt="${escapeHtml(p.name)}" class="prof-dir-icon" loading="lazy" />
                    <div class="prof-dir-title-box">
                      <h4>
                        ${escapeHtml(p.name)}
                        <span class="prof-dir-cat-badge">${escapeHtml(p.category)}</span>
                      </h4>
                      <p class="prof-dir-summary">${escapeHtml(p.summary)}</p>
                      ${p.synergy ? `<div class="prof-dir-synergy">${escapeHtml(p.synergy)}</div>` : ''}
                    </div>
                  </div>

                  ${cardPassive ? `
                    <div class="prof-dir-passive-box" style="margin-top: 0.75rem;" title="${escapeHtml(cardPassive.passiveEffect)}">
                      <span style="font-size: 1.15rem; flex-shrink: 0;">${cardPassive.icon || '✨'}</span>
                      <div>
                        <strong style="color: #34d399; font-size: 0.8rem;">✨ ${escapeHtml(cardPassive.passiveName)}:</strong>
                        <span style="color: #cbd5e1; font-size: 0.76rem; display: block; line-height: 1.35; margin-top: 0.1rem;">${escapeHtml(cardPassive.passiveEffect)}</span>
                      </div>
                    </div>
                  ` : ''}

                  ${p.campBuff ? `
                    <div class="prof-dir-camp-box" style="margin-top: 0.65rem;">
                      <img src="${getIconUrl(p.campBuff.icon)}" alt="${escapeHtml(p.campBuff.name)}" loading="lazy" />
                      <div>
                        <strong>${escapeHtml(p.campBuff.name)} (Skill ${p.campBuff.skill}+):</strong> ${escapeHtml(p.campBuff.effect)}
                      </div>
                    </div>
                  ` : ''}
                </div>

                <div class="prof-dir-footer">
                  <div class="prof-dir-metrics">
                    <strong>${recipeCount}</strong> ${p.category === 'Gathering' ? 'Nodes' : 'Recipes'} · <span style="color:#38bdf8;">${newCount} New</span> · <span style="color:var(--text-gold,#facc15);">${favorCount} Favor</span>
                  </div>
                  <button type="button" class="prof-dir-explore-btn" data-slug="${slug}">
                    Explore ${escapeHtml(p.name)} ›
                  </button>
                </div>
              </div>
            `;
          }).join('')}
        </div>

        <!-- Master Camp Station Matrix Table -->
        <div class="section-heading-bar" style="margin-top: 1.5rem;">
          <div>
            <h2><span>⛺</span> Campfire Profession Station Matrix (Skill 20 / 140 / 300)</h2>
            <p class="section-subtext">Every profession constructs camp stations around shared campfires, providing party-wide buffs mirroring class blessings at 80% potency</p>
          </div>
        </div>

        <div class="prof-matrix-table-wrap">
          <table class="prof-matrix-table">
            <thead>
              <tr>
                <th style="width: 170px;">Profession</th>
                <th style="width: 220px;">Combat Passive</th>
                <th>Skill 20 Station (Party Buff)</th>
                <th>Skill 140 Station</th>
                <th>Skill 300 Master Station</th>
              </tr>
            </thead>
            <tbody>
              ${matrixRows.map(r => {
                const pass = getProfessionPassive(r.name || r.slug);
                return `
                <tr>
                  <td>
                    <div class="matrix-prof-col" data-slug="${r.slug}" title="View ${r.name}">
                      <img src="${getIconUrl(r.icon)}" alt="${r.name}" loading="lazy" />
                      <span>${r.name}</span>
                    </div>
                  </td>
                  <td>
                    ${pass ? `
                      <strong style="color: #34d399; font-size: 0.85rem; display: block;">✨ ${escapeHtml(pass.passiveName)}</strong>
                      <span style="font-size: 0.76rem; color: #cbd5e1; line-height: 1.35; display: block; margin-top: 0.15rem;">${escapeHtml(pass.passiveEffect)}</span>
                    ` : '<span style="color: var(--text-muted); font-size: 0.8rem;">—</span>'}
                  </td>
                  <td>
                    <div class="matrix-station-cell" title="${escapeHtml(r.s20Desc)}">
                      <img src="${getIconUrl(r.s20Icon)}" alt="${r.s20}" loading="lazy" />
                      <div>
                        <strong>${r.s20}</strong>
                        <small>· ${r.s20Desc}</small>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div class="matrix-station-cell" title="${escapeHtml(r.s140Desc)}">
                      <img src="${getIconUrl(r.s140Icon)}" alt="${r.s140}" loading="lazy" />
                      <div>
                        <strong>${r.s140}</strong>
                        <small>· ${r.s140Desc}</small>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div class="matrix-station-cell" title="${escapeHtml(r.s300Desc)}">
                      <img src="${getIconUrl(r.s300Icon)}" alt="${r.s300}" loading="lazy" />
                      <div>
                        <strong>${r.s300}</strong>
                        <small>· ${r.s300Desc}</small>
                      </div>
                    </div>
                  </td>
                </tr>
              `;
              }).join('')}
            </tbody>
          </table>
        </div>

        ${renderRolePairingWizard()}

        ${renderMasterTrainerDirectory()}
      </div>
    `;

    // Role pairing wizard listeners
    container.querySelectorAll('.pairing-role-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        activeRolePairing = chip.getAttribute('data-role-id');
        container.querySelectorAll('.pairing-role-chip').forEach(c => {
          c.classList.toggle('active', c.getAttribute('data-role-id') === activeRolePairing);
        });
        const detailsMount = container.querySelector('.pairing-details-card');
        if (detailsMount) {
          const activePair = PAIRING_WIZARD_DATA.find(p => p.roleId === activeRolePairing) || PAIRING_WIZARD_DATA[0];
          detailsMount.outerHTML = renderPairingDetailsCard(activePair);
        }
      });
    });

    // Trainer directory filter listeners
    const trSearch = container.querySelector('#trainer-search-input');
    if (trSearch) {
      trSearch.addEventListener('input', debounce((e) => {
        trainerSearchQuery = e.target.value.trim();
        updateTrainerGrid(container);
      }, 150));
    }

    const trProf = container.querySelector('#trainer-prof-select');
    if (trProf) {
      trProf.addEventListener('change', (e) => {
        trainerProfFilter = e.target.value;
        updateTrainerGrid(container);
      });
    }

    const trFac = container.querySelector('#trainer-faction-select');
    if (trFac) {
      trFac.addEventListener('change', (e) => {
        trainerFactionFilter = e.target.value;
        updateTrainerGrid(container);
      });
    }

    const trRank = container.querySelector('#trainer-rank-select');
    if (trRank) {
      trRank.addEventListener('change', (e) => {
        trainerRankFilter = e.target.value;
        updateTrainerGrid(container);
      });
    }

    const trZone = container.querySelector('#trainer-zone-select');
    if (trZone) {
      trZone.addEventListener('change', (e) => {
        trainerZoneFilter = e.target.value;
        updateTrainerGrid(container);
      });
    }

    // Click handlers for cards and table rows
    container.querySelectorAll('.prof-dir-explore-btn, .prof-directory-card, .matrix-prof-col').forEach(el => {
      el.addEventListener('click', () => {
        const slug = el.getAttribute('data-slug');
        if (slug && data[slug]) {
          currentProfession = slug;
          currentCategory = 'all';
          searchQuery = '';
          const grid = document.getElementById('prof-selector-buttons');
          if (grid) {
            grid.querySelectorAll('.prof-tile-btn').forEach(b => {
              b.classList.toggle('active', b.getAttribute('data-slug') === slug);
            });
          }
          renderActiveProfession();
          const targetHash = `#professions/${slug}/${currentSubTab}`;
          if ((window.location.hash || '').toLowerCase() !== targetHash.toLowerCase()) {
            try {
              history.pushState({ tab: 'professions', profession: slug, subtab: currentSubTab }, '', targetHash);
            } catch {
              if (history.replaceState) history.replaceState(null, '', targetHash);
            }
          }
          window.scrollTo({ top: container.offsetTop - 80, behavior: 'smooth' });
        }
      });
    });

    attachTooltipListeners(container, null);
  }


  function renderSubTabContent(prof) {
    const body = document.getElementById("prof-subtab-body");
    if (!body) return;

    const tabs = window.WOW_PROFESSIONS_TABS || {};
    const leveling = window.WOW_PROFESSIONS_LEVELING || {};
    const routes = window.WOW_PROFESSIONS_ROUTES || {};

    if (prof.slug === "camping") {
      if (tabs.renderCampingProfessionTab) tabs.renderCampingProfessionTab(body, prof);
      return;
    }

    if (currentSubTab === "recipes") {
      renderRecipesTab(body, prof);
    } else if (currentSubTab === "leveling") {
      if (leveling.renderLevelingTab) leveling.renderLevelingTab(body, prof);
    } else if (currentSubTab === "shopping") {
      if (leveling.renderShoppingTab) leveling.renderShoppingTab(body, prof);
    } else if (currentSubTab === "specs") {
      if (tabs.renderSpecializationsTab) tabs.renderSpecializationsTab(body, prof);
    } else if (currentSubTab === "containers") {
      if (tabs.renderContainersTab) tabs.renderContainersTab(body, prof);
    } else if (currentSubTab === "favor") {
      if (tabs.renderFavorTab) tabs.renderFavorTab(body, prof);
    } else if (currentSubTab === "camp") {
      if (tabs.renderCampPerksTab) tabs.renderCampPerksTab(body, prof);
    } else if (currentSubTab === "nodes") {
      if (routes.renderNodesTab) routes.renderNodesTab(body, prof);
    } else if (currentSubTab === "waters") {
      if (tabs.renderFishingWatersTab) tabs.renderFishingWatersTab(body, prof);
    } else if (currentSubTab === "lures") {
      if (tabs.renderFishingLuresTab) tabs.renderFishingLuresTab(body, prof);
    } else if (currentSubTab === "ranks") {
      if (tabs.renderFishingRanksTab) tabs.renderFishingRanksTab(body, prof);
    }
  }

  function debounce(fn, delay) {
    let timer = null;
    return function (...args) {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => fn.apply(this, args), delay);
    };
  }

  /* ==========================================================================
     SUBTAB 1: RECIPES BROWSER
     ========================================================================== */
  function updateRecipeGrid(container, prof) {
    const grid = container.querySelector('.recipe-grid');
    if (!grid) return;

    const filtered = (prof.recipes || []).filter(r => {
      if (currentCategory !== 'all' && r.cat !== currentCategory) {
        return false;
      }
      if (filterNewOnly && !r.isNew) {
        return false;
      }
      if (filterBetaCap && r.learn > 225) {
        return false;
      }
      if (filterDungeonOnly && !isDungeonRecipe(r)) {
        return false;
      }
      if (filterBlueprintOnly && !isBlueprintRecipe(r)) {
        return false;
      }
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const matchesName = r.name && r.name.toLowerCase().includes(q);
        const matchesEffect = r.effect && r.effect.toLowerCase().includes(q);
        const matchesReagents = r.reagents && r.reagents.some(m => m.name && m.name.toLowerCase().includes(q));
        const matchesSource = r.source && r.source.toLowerCase().includes(q);
        if (!matchesName && !matchesEffect && !matchesReagents && !matchesSource) {
          return false;
        }
      }
      return true;
    });

    if (filtered.length === 0) {
      grid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 3rem; color: #94a3b8; background: rgba(15,23,42,0.5); border-radius: 8px;">
          No recipes found matching your search and filter criteria.
        </div>
      `;
    } else {
      grid.innerHTML = filtered.map(r => renderRecipeCard(r)).join('');
    }

    container.querySelectorAll('.prof-cat-chip').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-cat') === currentCategory);
    });

    const newToggle = container.querySelector('#prof-new-toggle');
    if (newToggle) {
      newToggle.classList.toggle('active', filterNewOnly);
    }

    const betaToggle = container.querySelector('#prof-beta-cap-toggle');
    if (betaToggle) {
      betaToggle.classList.toggle('active', filterBetaCap);
    }

    const dungeonToggle = container.querySelector('#prof-dungeon-toggle');
    if (dungeonToggle) {
      dungeonToggle.classList.toggle('active', filterDungeonOnly);
    }

    const blueprintToggle = container.querySelector('#prof-blueprint-toggle');
    if (blueprintToggle) {
      blueprintToggle.classList.toggle('active', filterBlueprintOnly);
    }

    container.querySelectorAll('.prof-preset-btn').forEach(btn => {
      const s = parseInt(btn.getAttribute('data-skill'), 10);
      btn.classList.toggle('active', playerSkill === s);
    });

    attachTooltipListeners(grid, prof);
  }

  function renderRecipesTab(container, prof) {
    const groups = prof.groups || [];

    container.innerHTML = `
      <!-- Toolbar -->
      <div class="prof-toolbar">
        <div style="display: flex; gap: 0.75rem; align-items: center; flex-wrap: wrap;">
          <div class="prof-search-wrap">
            <input type="text" id="prof-search-input" aria-label="Search recipes, reagents, or zones" class="prof-search-input" placeholder="Search recipe, reagent, drop zone..." value="${escapeHtml(searchQuery)}" />
            ${searchQuery ? '<button type="button" class="prof-search-clear-btn" id="prof-search-clear" aria-label="Clear search" title="Clear search">✕</button>' : ''}
          </div>
          <button type="button" id="prof-new-toggle" class="filter-chip ${filterNewOnly ? 'active' : ''}">
            <span>✨</span> New in Forever Only
          </button>
          <button type="button" id="prof-beta-cap-toggle" class="filter-chip ${filterBetaCap ? 'active' : ''}" title="Filter to recipes learnable within Phase 2 beta level cap (Skill 1–225)">
            <span>🔒</span> Beta Cap (≤225)
          </button>
          <button type="button" id="prof-dungeon-toggle" class="filter-chip ${filterDungeonOnly ? 'active' : ''}" title="Filter to recipes dropped in dungeons or by instance bosses">
            <span>🏰</span> Dungeon Drops Only
          </button>
          <button type="button" id="prof-blueprint-toggle" class="filter-chip ${filterBlueprintOnly ? 'active' : ''}" title="Filter to campfire station blueprints">
            <span>⛺</span> Camp Blueprints Only
          </button>
        </div>
        <div class="prof-skill-calc">
          <span class="prof-skill-calc-label">Skill Simulator:</span>
          <div class="prof-skill-presets">
            <button type="button" class="prof-preset-btn ${playerSkill === 75 ? 'active' : ''}" data-skill="75" title="Apprentice Skill Cap (75)">75</button>
            <button type="button" class="prof-preset-btn ${playerSkill === 150 ? 'active' : ''}" data-skill="150" title="Journeyman Skill Cap (150)">150</button>
            <button type="button" class="prof-preset-btn ${playerSkill === 225 ? 'active' : ''}" data-skill="225" title="Beta Phase 2 Cap (225)">225</button>
            <button type="button" class="prof-preset-btn ${playerSkill === 300 ? 'active' : ''}" data-skill="300" title="Artisan Mastery (300)">300</button>
          </div>
          <input type="number" id="prof-skill-input" aria-label="Custom skill level simulator" class="prof-skill-input" min="1" max="300" placeholder="Custom" value="${playerSkill !== null ? playerSkill : ''}" />
        </div>
      </div>

      <!-- Category Filter Chips -->
      <div class="prof-category-chips" id="prof-category-chips">
        <button type="button" class="prof-cat-chip ${currentCategory === 'all' ? 'active' : ''}" data-cat="all">
          All Categories (${(prof.recipes || []).length})
        </button>
        ${groups.map(g => `
          <button type="button" class="prof-cat-chip ${currentCategory === g.key ? 'active' : ''}" data-cat="${g.key}">
            <img src="${getIconUrl(g.icon)}" alt="${escapeHtml(g.label)}" />
            ${escapeHtml(g.label)} (${g.count})
          </button>
        `).join('')}
      </div>

      <!-- Recipes Grid -->
      <div class="recipe-grid"></div>
    `;

    updateRecipeGrid(container, prof);

    const clearSearchInp = () => {
      searchQuery = '';
      const inp = container.querySelector('#prof-search-input');
      if (inp) inp.value = '';
      const clearBtn = container.querySelector('#prof-search-clear');
      if (clearBtn) clearBtn.remove();
    };

    const attachClearBtnListener = () => {
      const clearBtn = container.querySelector('#prof-search-clear');
      if (clearBtn) {
        clearBtn.onclick = () => {
          clearSearchInp();
          updateRecipeGrid(container, prof);
        };
      }
    };
    attachClearBtnListener();

    const searchInput = container.querySelector('#prof-search-input');
    if (searchInput) {
      searchInput.addEventListener('input', debounce((e) => {
        searchQuery = e.target.value.trim();
        const wrap = container.querySelector('.prof-search-wrap');
        let clearBtn = container.querySelector('#prof-search-clear');
        if (searchQuery && !clearBtn && wrap) {
          clearBtn = document.createElement('button');
          clearBtn.type = 'button';
          clearBtn.className = 'prof-search-clear-btn';
          clearBtn.id = 'prof-search-clear';
          clearBtn.setAttribute('aria-label', 'Clear search');
          clearBtn.setAttribute('title', 'Clear search');
          clearBtn.textContent = '✕';
          wrap.appendChild(clearBtn);
          attachClearBtnListener();
        } else if (!searchQuery && clearBtn) {
          clearBtn.remove();
        }
        updateRecipeGrid(container, prof);
      }, 120));
    }

    const newToggle = container.querySelector('#prof-new-toggle');
    if (newToggle) {
      newToggle.addEventListener('click', () => {
        filterNewOnly = !filterNewOnly;
        updateRecipeGrid(container, prof);
      });
    }

    const betaToggle = container.querySelector('#prof-beta-cap-toggle');
    if (betaToggle) {
      betaToggle.addEventListener('click', () => {
        filterBetaCap = !filterBetaCap;
        updateRecipeGrid(container, prof);
      });
    }

    const dungeonToggle = container.querySelector('#prof-dungeon-toggle');
    if (dungeonToggle) {
      dungeonToggle.addEventListener('click', () => {
        filterDungeonOnly = !filterDungeonOnly;
        updateRecipeGrid(container, prof);
      });
    }

    const blueprintToggle = container.querySelector('#prof-blueprint-toggle');
    if (blueprintToggle) {
      blueprintToggle.addEventListener('click', () => {
        filterBlueprintOnly = !filterBlueprintOnly;
        updateRecipeGrid(container, prof);
      });
    }

    const skillInput = container.querySelector('#prof-skill-input');
    if (skillInput) {
      skillInput.addEventListener('input', debounce((e) => {
        const val = parseInt(e.target.value, 10);
        playerSkill = !isNaN(val) ? val : null;
        updateRecipeGrid(container, prof);
      }, 120));
    }

    container.querySelectorAll('.prof-preset-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const s = parseInt(btn.getAttribute('data-skill'), 10);
        playerSkill = playerSkill === s ? null : s;
        const skillInp = container.querySelector('#prof-skill-input');
        if (skillInp) skillInp.value = playerSkill !== null ? playerSkill : '';
        updateRecipeGrid(container, prof);
      });
    });

    container.querySelectorAll('.prof-cat-chip').forEach(btn => {
      btn.addEventListener('click', () => {
        const targetCat = btn.getAttribute('data-cat') || 'all';

        // Intuitive toggling and collision clearing
        if (targetCat.toLowerCase() === currentCategory.toLowerCase()) {
          if (searchQuery) {
            clearSearchInp();
          } else if (targetCat.toLowerCase() !== 'all') {
            currentCategory = 'all';
            updateRecipeGrid(container, prof);
            return;
          }
        } else if (targetCat.toLowerCase() === 'all') {
          if (searchQuery) {
            clearSearchInp();
          }
          currentCategory = 'all';
        } else {
          // Specific category clicked: check if active searchQuery yields 0 matches in this category
          if (searchQuery) {
            const q = searchQuery.toLowerCase();
            const hasMatch = (prof.recipes || []).some(r => {
              if ((r.cat || '').toLowerCase() !== targetCat.toLowerCase()) return false;
              if (filterNewOnly && !r.isNew) return false;
              if (filterBetaCap && r.learn > 225) return false;
              if (filterDungeonOnly && !isDungeonRecipe(r)) return false;
              if (filterBlueprintOnly && !isBlueprintRecipe(r)) return false;
              const matchesName = r.name && r.name.toLowerCase().includes(q);
              const matchesEffect = r.effect && r.effect.toLowerCase().includes(q);
              const matchesReagents = r.reagents && r.reagents.some(m => m.name && m.name.toLowerCase().includes(q));
              const matchesSource = r.source && r.source.toLowerCase().includes(q);
              return matchesName || matchesEffect || matchesReagents || matchesSource;
            });
            if (!hasMatch) {
              // Automatically clear the conflicting search query so all recipes in that category immediately display
              clearSearchInp();
            }
          }
          currentCategory = targetCat;
        }

        updateRecipeGrid(container, prof);
      });
    });
  }

  function renderRecipeCard(r) {
    const qualityClass = `q${r.quality || 1}`;
    const skillClass = getSkillClass(r, playerSkill);
    const skillDisplay = playerSkill !== null ? `Skill ${r.learn} (${skillClass.replace('skill-', '')})` : `Skill ${r.learn}`;
    const cardId = r.id ? `recipe-${r.id}` : `recipe-${(r.name || '').toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;

    const reagentsHtml = (r.reagents || []).map(mat => `
      <span class="reagent-chip" title="${escapeHtml(mat.name)}" data-item-id="${mat.id || ''}" data-item-name="${escapeHtml(mat.name)}">
        <img src="${getIconUrl(mat.icon, mat.name)}" alt="${escapeHtml(mat.name)}" loading="lazy" />
        <span class="reagent-count">${mat.count}x</span>
        <span class="q${mat.quality || 1}">${escapeHtml(mat.name)}</span>
      </span>
    `).join('');

    // Quick source CTA actions for reagents (e.g. fishing waters or farming mob drops)
    const quickSources = [];
    const farmableReagents = (r.reagents || []).map(mat => {
      const src = resolveReagentSource(mat.name, mat.id);
      return { mat, src };
    }).filter(item => item.src && (item.src.fishedIn?.length || item.src.drops?.length));

    farmableReagents.forEach(({ mat, src }) => {
      const isMulti = farmableReagents.length > 1;
      const cleanReagentName = mat.name.replace(/^\d+x\s*/i, '').trim();

      if (src.primaryType === 'fished' && src.fishedIn && src.fishedIn.length > 0) {
        const fishLabel = isMulti
          ? `Click here to see where to fish ${escapeHtml(cleanReagentName)} (${src.fishedIn.length} Waters)`
          : `Click here to see where to fish this (${src.fishedIn.length} Waters)`;
        quickSources.push(`
          <button type="button" class="recipe-reagent-cta-btn fishing" data-reagent-name="${escapeHtml(mat.name)}" data-reagent-id="${mat.id || ''}" data-reagent-tab="fishing" title="Click here to see where to fish ${escapeHtml(cleanReagentName)}">
            <span class="cta-icon">🎣</span> ${fishLabel}
          </button>
        `);
        if (src.drops && src.drops.length > 0) {
          const mobCount = src.totalDropMobs || src.drops.length;
          const dropLabel = isMulti
            ? `Farm ${escapeHtml(cleanReagentName)} drops (${mobCount} Mobs)`
            : `Farm from drops (${mobCount} Mobs)`;
          quickSources.push(`
            <button type="button" class="recipe-reagent-cta-btn drops secondary" data-reagent-name="${escapeHtml(mat.name)}" data-reagent-id="${mat.id || ''}" data-reagent-tab="drops" title="Click here to see which mobs drop ${escapeHtml(cleanReagentName)}">
              <span class="cta-icon">⚔️</span> ${dropLabel}
            </button>
          `);
        }
      } else if (src.drops && src.drops.length > 0 && farmableReagents.length <= 3) {
        const mobCount = src.totalDropMobs || src.drops.length;
        const dropLabel = isMulti
          ? `Farm ${escapeHtml(cleanReagentName)} (${mobCount} Mobs)`
          : `Farm from drops (${mobCount} Mobs)`;
        quickSources.push(`
          <button type="button" class="recipe-reagent-cta-btn drops" data-reagent-name="${escapeHtml(mat.name)}" data-reagent-id="${mat.id || ''}" data-reagent-tab="drops" title="Click here to see which mobs drop ${escapeHtml(cleanReagentName)}">
            <span class="cta-icon">${src.ctaIcon || '🍖'}</span> ${dropLabel}
          </button>
        `);
      }
    });

    return `
      <div class="recipe-card" id="${cardId}" data-recipe-id="${r.id || ''}" data-recipe-name="${escapeHtml(r.name || '')}">
        <div>
          <div class="recipe-card-header">
            <img src="${getIconUrl(r.icon, r.name, r.source)}" alt="${escapeHtml(r.name)}" class="recipe-item-icon ${qualityClass}" data-recipe-name="${escapeHtml(r.name)}" style="cursor: pointer;" loading="lazy" />
            <div class="recipe-info">
              <h4 class="recipe-title ${qualityClass}" data-recipe-name="${escapeHtml(r.name)}" style="cursor: pointer;">
                ${escapeHtml(r.name)}
                ${r.isNew ? '<span class="recipe-new-tag">New</span>' : ''}
                ${(() => {
                  const bisMatch = getBiSInfo(r.name);
                  if (!bisMatch) return '';
                  return `<button type="button" class="recipe-bis-badge" data-class="${bisMatch.classId}" data-spec="${bisMatch.specId}" title="Phase 2 BiS Item for ${escapeHtml(bisMatch.className)} (${escapeHtml(bisMatch.specName)}) — Click to view in BiS Planner">⭐ Phase 2 BiS</button>`;
                })()}
                ${isDungeonRecipe(r) ? '<span class="recipe-dungeon-tag" title="Dropped by dungeon mobs or bosses">🏰 Dungeon Drop</span>' : ''}
                ${isBlueprintRecipe(r) ? '<span class="recipe-blueprint-tag" title="Campfire Station Blueprint">⛺ Camp Blueprint</span>' : ''}
              </h4>
              ${r.effect ? `<div class="recipe-effect">${escapeHtml(r.effect)}</div>` : ''}
            </div>
            <span class="recipe-skill-badge ${skillClass}" title="Learn: ${r.learn} | Yellow: ${r.yellow} | Green: ${r.green} | Grey: ${r.grey}">
              ${skillDisplay}
            </span>
          </div>

          <div class="recipe-reagents-row">
            ${reagentsHtml || '<span style="font-size:0.75rem; color:#94a3b8;">No reagents required</span>'}
          </div>
          ${quickSources.length ? `<div class="recipe-reagent-sources-bar">${quickSources.join('')}</div>` : ''}
        </div>

        <div class="recipe-source-line">
          <span>Source:</span>
          <span class="recipe-source-badge">${escapeHtml(r.source || 'Trainer')}</span>
        </div>
      </div>
    `;
  }

  // Export module globally
  window.initProfessionsHub = initProfessionsHub;
  window.WOW_PROFESSIONS = {
    getCurrentProfession: () => currentProfession,
    getCurrentSubTab: () => currentSubTab,
    openReagentModal: (rawName, explicitId, initialTab) => {
      if (window.WOW_PROFESSIONS_MODAL && window.WOW_PROFESSIONS_MODAL.openReverseReagentLookup) {
        window.WOW_PROFESSIONS_MODAL.openReverseReagentLookup(rawName, explicitId, initialTab);
      }
    },
    selectProfession: (slug, subtab, query, targetId, options = {}) => {
      currentProfession = slug || "overview";
      if (subtab) currentSubTab = subtab;
      currentCategory = options.category || "all";
      if (query !== undefined && query !== null) searchQuery = query;
      if (options.clearFilters || query || targetId) {
        filterNewOnly = false;
        filterBetaCap = false;
        filterDungeonOnly = false;
        filterBlueprintOnly = false;
      }
      const navBtn = document.querySelector('.nav-tab-btn[data-tab="professions"]');
      if (navBtn && !navBtn.classList.contains("active")) {
        const tabButtons = document.querySelectorAll(".nav-tab-btn");
        const tabPanels = document.querySelectorAll(".tab-content");
        tabButtons.forEach(b => b.classList.remove("active"));
        tabPanels.forEach(p => p.classList.remove("active"));
        navBtn.classList.add("active");
        const targetPanel = document.getElementById("tab-professions");
        if (targetPanel) targetPanel.classList.add("active");
      }
      const grid = document.getElementById("prof-selector-buttons");
      if (grid) {
        grid.querySelectorAll(".prof-tile-btn").forEach(b => {
          b.classList.toggle("active", b.getAttribute("data-slug") === currentProfession);
        });
      }
      renderActiveProfession();
      const newHash = `#professions/${currentProfession}${currentSubTab ? "/" + currentSubTab : ""}`;
      if (!options.noPush) {
        const curHash = (window.location.hash || "").toLowerCase();
        if (curHash !== newHash.toLowerCase()) {
          try {
            history.pushState({ tab: "professions", profession: currentProfession, subtab: currentSubTab }, "", newHash);
          } catch {
            if (history.replaceState) history.replaceState(null, "", newHash);
          }
        }
      } else if (history.replaceState) {
        history.replaceState(null, "", newHash);
      }
      if (targetId) {
        setTimeout(() => {
          const el = document.getElementById(targetId) || document.getElementById(`recipe-${targetId}`);
          if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "center" });
            el.classList.add("recipe-card-highlight");
            setTimeout(() => el.classList.remove("recipe-card-highlight"), 2500);
          }
        }, 150);
      }
    }
  };

})();
