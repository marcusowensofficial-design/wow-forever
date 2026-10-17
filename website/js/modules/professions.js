/**
 * World of Warcraft: Forever - Professions & Trade Economy Hub Module
 * Comprehensive 1-300 Leveling Roadmaps, Reagent Requirements, Reagent Shopping Lists,
 * Recipe Catalogs, Merchant's Favor Turn-Ins, and Camp & Perks Integration.
 */

(function () {
  'use strict';

  let currentProfession = 'overview';
  let currentSubTab = 'recipes';
  let currentCategory = 'all';
  let searchQuery = '';
  let filterNewOnly = false;
  let filterBetaCap = false;
  let playerSkill = null;

  const CDN_BASE = 'https://wow.zamimg.com/images/wow/icons/medium/';

  function getIconUrl(icon, name = '', source = '') {
    if (!icon || icon === 'inv_misc_questionmark' || icon.includes('inv_misc_questionmark')) {
      const n = (name || '').toLowerCase();
      const s = (source || '').toLowerCase();
      if (n.includes('enchant') || n.includes('formula') || currentProfession === 'enchanting') {
        if (s.includes('drop') || s.includes('formula') || s.includes('vendor') || s.includes('merchant') || s.includes('favor') || n.includes('formula')) {
          return `${CDN_BASE}inv_scroll_03.jpg`;
        }
        return `${CDN_BASE}inv_scroll_04.jpg`;
      }
      return `${CDN_BASE}inv_misc_questionmark.jpg`;
    }
    if (icon.startsWith('http://') || icon.startsWith('https://')) return icon;
    const clean = icon.replace(/\.(jpg|png|webp)$/i, '');
    return `${CDN_BASE}${clean}.jpg`;
  }

  const escapeHtml = window.escapeHtml;

  function getProfessionPassive(nameOrSlug) {
    if (!nameOrSlug) return null;
    const clean = String(nameOrSlug).toLowerCase().replace(/[^a-z0-9]/g, '');
    const list = (window.WOW_FOREVER_DATA && window.WOW_FOREVER_DATA.professionPassives) || [];
    return list.find(p => {
      const pClean = p.name.toLowerCase().replace(/[^a-z0-9]/g, '');
      return pClean === clean;
    }) || null;
  }

  function getSkillClass(recipe, skill) {
    if (skill === null || skill === undefined || isNaN(skill)) {
      return 'skill-orange';
    }
    const s = Number(skill);
    if (s < recipe.learn) return 'skill-grey';
    if (s < recipe.yellow) return 'skill-orange';
    if (s < recipe.green) return 'skill-yellow';
    if (s < recipe.grey) return 'skill-green';
    return 'skill-grey';
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

          if (history.replaceState) {
            if (slug === 'overview') {
              history.replaceState(null, '', '#professions');
            } else {
              history.replaceState(null, '', `#professions/${slug}/${currentSubTab}`);
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
      tabs.push({ id: 'nodes', icon: '⛏️', label: `Mining Nodes (${prof.nodes?.length || 10})` });
      tabs.push({ id: 'recipes', icon: '🔥', label: `Smelting (${prof.recipes?.length || 14})` });
      tabs.push({ id: 'camp', icon: '⛺', label: 'Camp & Perks' });
    } else if (isHerbalism) {
      tabs.push({ id: 'leveling', icon: '📈', label: 'Leveling Route' });
      tabs.push({ id: 'nodes', icon: '🌿', label: `Herb Nodes (${prof.nodes?.length || 28})` });
      tabs.push({ id: 'camp', icon: '⛺', label: 'Camp & Perks' });
    } else if (isSkinning) {
      tabs.push({ id: 'leveling', icon: '📈', label: 'Skinning by Level' });
      tabs.push({ id: 'camp', icon: '⛺', label: 'Camp & Perks' });
    } else if (isFishing) {
      tabs.push({ id: 'waters', icon: '🌊', label: 'Waters by Skill' });
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

        if (history.replaceState) {
          history.replaceState(null, '', `#professions/${currentProfession}/${currentSubTab}`);
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
      </div>
    `;

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
          if (history.replaceState) {
            history.replaceState(null, '', `#professions/${slug}/${currentSubTab}`);
          }
          window.scrollTo({ top: container.offsetTop - 80, behavior: 'smooth' });
        }
      });
    });

    attachTooltipListeners(container, null);
  }

  function renderSubTabContent(prof) {
    const body = document.getElementById('prof-subtab-body');
    if (!body) return;

    if (prof.slug === 'camping') {
      renderCampingProfessionTab(body, prof);
      return;
    }

    if (currentSubTab === 'recipes') {
      renderRecipesTab(body, prof);
    } else if (currentSubTab === 'leveling') {
      renderLevelingTab(body, prof);
    } else if (currentSubTab === 'shopping') {
      renderShoppingTab(body, prof);
    } else if (currentSubTab === 'favor') {
      renderFavorTab(body, prof);
    } else if (currentSubTab === 'camp') {
      renderCampPerksTab(body, prof);
    } else if (currentSubTab === 'nodes') {
      renderNodesTab(body, prof);
    } else if (currentSubTab === 'waters') {
      renderFishingWatersTab(body, prof);
    } else if (currentSubTab === 'lures') {
      renderFishingLuresTab(body, prof);
    } else if (currentSubTab === 'ranks') {
      renderFishingRanksTab(body, prof);
    }
  }

  let recipeSearchDebounceTimer = null;
  function debounce(fn, delay) {
    return function (...args) {
      if (recipeSearchDebounceTimer) clearTimeout(recipeSearchDebounceTimer);
      recipeSearchDebounceTimer = setTimeout(() => fn.apply(this, args), delay);
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
          <input type="text" id="prof-search-input" aria-label="Search recipes, reagents, or zones" class="prof-search-input" placeholder="Search recipe, reagent, drop zone..." value="${escapeHtml(searchQuery)}" />
          <button type="button" id="prof-new-toggle" class="filter-chip ${filterNewOnly ? 'active' : ''}">
            <span>✨</span> New in Forever Only
          </button>
          <button type="button" id="prof-beta-cap-toggle" class="filter-chip ${filterBetaCap ? 'active' : ''}" title="Filter to recipes learnable within Phase 2 beta level cap (Skill 1–225)">
            <span>🔒</span> Beta Cap (≤225)
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

    const searchInput = container.querySelector('#prof-search-input');
    if (searchInput) {
      searchInput.addEventListener('input', debounce((e) => {
        searchQuery = e.target.value.trim();
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
        currentCategory = btn.getAttribute('data-cat');
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
        <img src="${getIconUrl(mat.icon)}" alt="${escapeHtml(mat.name)}" loading="lazy" />
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

  /* ==========================================================================
     SUBTAB 2: LEVELING 1-300 ROADMAP (WITH REAGENT BADGES & PROGRESS TRACKS)
     ========================================================================== */
  function renderLevelingTab(container, prof) {
    const leveling = prof.leveling || {};
    const steps = leveling.steps || [];

    if (steps.length === 0) {
      container.innerHTML = `
        <div style="text-align: center; padding: 3rem; color: #94a3b8; background: rgba(15,23,42,0.5); border-radius: 8px;">
          Leveling roadmap for ${escapeHtml(prof.name)} is based on open-world node harvesting and gathering skill gains.
        </div>
      `;
      return;
    }

    const levelingStorageKey = `wowforever_leveling_${prof.slug}`;
    let completedSteps = [];
    try {
      completedSteps = JSON.parse(localStorage.getItem(levelingStorageKey) || '[]');
      if (!Array.isArray(completedSteps)) completedSteps = [];
    } catch {
      completedSteps = [];
    }

    const actionableSteps = steps.filter(s => s.type === 'step' || s.type === 'gather-step');
    const totalStepsCount = actionableSteps.length;
    const initialCompletedCount = steps.filter((s, i) => (s.type === 'step' || s.type === 'gather-step') && completedSteps.includes(`${prof.slug}_step_${i}`)).length;
    const initialPct = totalStepsCount > 0 ? Math.round((initialCompletedCount / totalStepsCount) * 100) : 0;

    const guideCallouts = leveling.guideCallouts || [];
    const calloutsHtml = guideCallouts.length ? `
      <div class="leveling-guide-callouts">
        ${guideCallouts.map(c => `
          <div class="leveling-guide-callout-card">
            <span class="callout-icon">${c.icon || '💡'}</span>
            <div class="callout-body">
              <strong>${escapeHtml(c.title)}</strong>
              <p>${escapeHtml(c.text)}</p>
            </div>
          </div>
        `).join('')}
      </div>
    ` : '';

    container.innerHTML = `
      <div class="leveling-header-block">
        <div class="leveling-header-title">
          <h3>
            ${escapeHtml(leveling.title || 'LEVELING FROM 1 TO 300')}
            <span class="beta-cap-tag">${escapeHtml(leveling.capNote || "225 is the beta's cap for now")}</span>
          </h3>
          <p>${escapeHtml(leveling.desc || "At each point, you get the cheapest recipe to skill up, whether you learn it from the trainer or buy it from a vendor. Counts are averages, so buy a few more. There are no prices until launch, so each reagent counts for what a vendor pays you for it.")}</p>
        </div>
        <div style="display: flex; gap: 0.5rem; align-items: center; flex-wrap: wrap;">
          <button type="button" class="shopping-copy-btn shopping-reset-btn" id="leveling-reset-btn" aria-label="Reset leveling checklist" title="Reset all checked leveling crafts">
            <span>↺</span> Reset Checklist
          </button>
        </div>
      </div>

      ${calloutsHtml}

      <!-- Interactive Leveling Checklist Progress Bar -->
      <div class="shopping-checklist-bar leveling-checklist-bar">
        <div class="shopping-progress-labels">
          <span>
            <strong>Leveling Milestones Completed:</strong> 
            <span id="leveling-progress-count">${initialCompletedCount}</span> / ${totalStepsCount} (<span id="leveling-progress-pct">${initialPct}%</span>)
          </span>
          <span style="font-size: 0.75rem; color: #94a3b8;">Check off each recipe or bracket as you advance in-game</span>
        </div>
        <div class="shopping-progress-track">
          <div class="shopping-progress-fill leveling-progress-fill" id="leveling-progress-fill" style="width: ${initialPct}%;"></div>
        </div>
      </div>

      <div class="leveling-roadmap-list">
        ${steps.map((item, idx) => {
          const stepId = `${prof.slug}_step_${idx}`;
          const isCompleted = completedSteps.includes(stepId);

          if (item.type === 'rank') {
            const isArtisan = item.rank && item.rank.toLowerCase().includes('artisan');
            return `
              ${isArtisan && !steps.some(s => s.type === 'beta-stop') ? `
                <div class="leveling-beta-stop-banner">
                  <div class="beta-stop-title">🔒 THE BETA STOPS AT 225 (REQUIRES LEVEL 35)</div>
                  <p>In Closed Beta Phase 2, player level is capped at 30. Artisan training requires Character Level 35 and skill 200+. These 225–300 steps outline the fastest path once Phase 3 unlocks.</p>
                </div>
              ` : ''}
              <div class="leveling-rank-divider">
                <strong class="rank-name">${escapeHtml(item.rank)}</strong>
                <span class="rank-details">${escapeHtml(item.details)}</span>
                ${isArtisan ? `<span class="rank-phase-badge" style="background: rgba(239, 68, 68, 0.2); border: 1px solid #ef4444; color: #fca5a5; font-size: 0.72rem; padding: 2px 8px; border-radius: 4px; font-weight: 700; margin-left: auto;">Phase 3 (Req Lvl 35)</span>` : ''}
              </div>
            `;
          }
          if (item.type === 'beta-stop') {
            return `
              <div class="leveling-beta-stop-banner">
                <div class="beta-stop-title">${escapeHtml(item.title)}</div>
                <p>${escapeHtml(item.text)}</p>
              </div>
            `;
          }
          if (item.type === 'step') {
            const rangeStr = (item.from !== null && item.from !== undefined)
              ? (item.to !== null && item.to !== undefined && item.to !== item.from ? `${item.from}–${item.to}` : `${item.from}`)
              : '';
            const leftPercent = item.bar?.iLeft || '0%';
            const widthPercent = item.bar?.iWidth || '10%';
            const craftsNum = item.crafts || 1;
            const vd = item.vendorDetails;
            const supplyClass = vd?.supply
              ? (vd.supply.toLowerCase().includes('unlimited') ? 'unlimited' : (vd.supply.toLowerCase().includes('limited') ? 'limited' : 'drop'))
              : '';
            return `
              <div class="leveling-step-row ${isCompleted ? 'completed' : ''}" data-step-id="${stepId}" data-step-idx="${idx}">
                <div class="step-check-col">
                  <input type="checkbox" class="leveling-step-check" ${isCompleted ? 'checked' : ''} aria-label="Mark ${escapeHtml(item.recipeName)} as completed" />
                </div>
                <div class="step-range-col">
                  <span class="step-range-text">${rangeStr}</span>
                  <div class="step-progress-track">
                    <span class="step-progress-fill" style="left: ${leftPercent}; width: ${widthPercent};"></span>
                    <span class="step-progress-cap-marker" style="left: 74.67%;" title="Beta Cap at 225"></span>
                  </div>
                </div>
                <div class="step-info-col">
                  <div class="step-recipe-name is-clickable" role="button" tabindex="0" data-item-id="${item.itemId || ''}" data-recipe-name="${escapeHtml(item.recipeName)}" data-step-idx="${idx}" title="Click to view in catalog · Hover for full recipe details">
                    <span>${escapeHtml(item.recipeName)}</span>
                    <span class="step-recipe-jump-hint">↗</span>
                  </div>
                  <div class="step-source-line">${escapeHtml(item.source)}</div>
                  ${vd ? `
                    <div class="step-vendor-meta">
                      <span class="vendor-meta-chip">📍 ${escapeHtml(vd.location)}</span>
                      ${vd.cost ? `<span class="vendor-meta-chip cost">🪙 ${escapeHtml(vd.cost)}</span>` : ''}
                      ${vd.supply ? `<span class="vendor-meta-chip supply ${supplyClass}">${escapeHtml(vd.supply)}</span>` : ''}
                    </div>
                  ` : ''}
                  ${item.trainerAlternative ? `<div class="step-trainer-backup">🔄 ${escapeHtml(item.trainerAlternative)}</div>` : ''}
                  ${item.advice ? `<div class="step-advice-note">💡 ${escapeHtml(item.advice)}</div>` : ''}
                </div>
                <div class="step-crafts-col">
                  <div class="step-crafts-count">~${craftsNum}</div>
                  <div class="step-crafts-label">crafts</div>
                </div>
                <div class="step-reagents-col">
                  ${(item.reagents || []).map(mat => {
                    const perCraft = mat.count || 1;
                    const totalForStep = craftsNum * perCraft;
                    const tooltipTitle = craftsNum > 1
                      ? `${perCraft}x ${mat.name} per craft (${totalForStep}x total for ~${craftsNum} crafts)`
                      : `${perCraft}x ${mat.name}`;
                    return `
                      <div class="step-reagent-badge has-total-math" data-item-id="${mat.itemId}" data-item-name="${escapeHtml(mat.name)}" data-per-craft="${perCraft}" data-total-step="${totalForStep}" data-crafts="${craftsNum}" title="${escapeHtml(tooltipTitle)}">
                        <div class="step-reagent-icon-wrap">
                          <img src="${getIconUrl(mat.icon)}" alt="${escapeHtml(mat.name)}" class="step-reagent-img q${mat.quality || 1}" loading="lazy" />
                          <span class="step-reagent-qty" title="${perCraft}x per craft">${perCraft}x</span>
                        </div>
                        ${craftsNum > 1 ? `<span class="step-reagent-total-pill" title="${totalForStep}x total across ~${craftsNum} crafts">=${totalForStep}</span>` : ''}
                      </div>
                    `;
                  }).join('')}
                </div>
              </div>
            `;
          }
          if (item.type === 'gather-step') {
            const rangeStr = (item.from !== null && item.from !== undefined)
              ? (item.to && item.to !== item.from ? `${item.from}–${item.to}` : `${item.from}`)
              : '1–300';
            const leftPercent = item.bar?.iLeft || '0%';
            const widthPercent = item.bar?.iWidth || '12%';
            return `
              <div class="leveling-step-row ${isCompleted ? 'completed' : ''}" data-step-id="${stepId}">
                <div class="step-check-col">
                  <input type="checkbox" class="leveling-step-check" ${isCompleted ? 'checked' : ''} aria-label="Mark ${escapeHtml(item.title)} as completed" />
                </div>
                <div class="step-range-col">
                  <span class="step-range-text">${rangeStr}</span>
                  <div class="step-progress-track">
                    <span class="step-progress-fill" style="left: ${leftPercent}; width: ${widthPercent};"></span>
                    <span class="step-progress-cap-marker" style="left: 74.67%;" title="Beta Cap at 225"></span>
                  </div>
                </div>
                <div class="step-info-col">
                  <strong style="color: var(--text-gold, #facc15); font-size: 1.05rem;">${escapeHtml(item.title)}</strong>
                  <div class="step-source-line" style="color: #cbd5e1; margin-top: 0.25rem;">${escapeHtml(item.zones)}</div>
                </div>
                <div class="step-reagents-col" style="grid-column: 4 / -1;">
                  ${(item.icons || []).map(ic => `
                    <div class="step-reagent-badge" title="${escapeHtml(ic.name)}" data-item-id="${ic.itemId || ''}" data-item-name="${escapeHtml(ic.name)}">
                      <img src="${getIconUrl(ic.icon)}" alt="${escapeHtml(ic.name)}" class="step-reagent-img" loading="lazy" />
                    </div>
                  `).join('')}
                </div>
              </div>
            `;
          }
          return '';
        }).join('')}
      </div>
    `;

    function updateLevelingProgress() {
      const curCompleted = steps.filter((s, i) => (s.type === 'step' || s.type === 'gather-step') && completedSteps.includes(`${prof.slug}_step_${i}`)).length;
      const curPct = totalStepsCount > 0 ? Math.round((curCompleted / totalStepsCount) * 100) : 0;
      const countEl = container.querySelector('#leveling-progress-count');
      const pctEl = container.querySelector('#leveling-progress-pct');
      const fillEl = container.querySelector('#leveling-progress-fill');
      if (countEl) countEl.textContent = curCompleted;
      if (pctEl) pctEl.textContent = `${curPct}%`;
      if (fillEl) fillEl.style.width = `${curPct}%`;
    }

    container.querySelectorAll('.leveling-step-check').forEach(chk => {
      chk.addEventListener('change', (e) => {
        e.stopPropagation();
        const row = chk.closest('.leveling-step-row');
        const stepId = row?.getAttribute('data-step-id');
        if (!stepId) return;
        if (chk.checked) {
          if (!completedSteps.includes(stepId)) completedSteps.push(stepId);
          row.classList.add('completed');
        } else {
          completedSteps = completedSteps.filter(x => x !== stepId);
          row.classList.remove('completed');
        }
        try { localStorage.setItem(levelingStorageKey, JSON.stringify(completedSteps)); } catch {}
        updateLevelingProgress();
      });
    });

    const resetBtn = container.querySelector('#leveling-reset-btn');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        if (!completedSteps.length) return;
        completedSteps = [];
        try { localStorage.removeItem(levelingStorageKey); } catch {}
        container.querySelectorAll('.leveling-step-check').forEach(chk => { chk.checked = false; });
        container.querySelectorAll('.leveling-step-row').forEach(r => { r.classList.remove('completed'); });
        updateLevelingProgress();
        if (typeof window.showToast === 'function') {
          window.showToast(`${prof.name} leveling checklist reset.`, 'info');
        }
      });
    }

    attachTooltipListeners(container, prof);
  }

  /* ==========================================================================
     SUBTAB 3: REAGENT SHOPPING LIST (GROUPED BY VENDOR, FARMED, CRAFTED)
     ========================================================================== */
  function renderShoppingTab(container, prof) {
    const shopping = prof.shopping || {};
    const groups = shopping.groups || [];

    if (groups.length === 0) {
      container.innerHTML = `
        <div style="text-align: center; padding: 3rem; color: #94a3b8; background: rgba(15,23,42,0.5); border-radius: 8px;">
          No pre-calculated reagent shopping list for this tradeskill.
        </div>
      `;
      return;
    }

    const storageKey = `wowforever_shopping_${prof.slug}`;
    const syncStorageKey = `wowforever_shopping_sync_${prof.slug}`;
    const levelingStorageKey = `wowforever_leveling_${prof.slug}`;

    let acquiredItems = [];
    try {
      acquiredItems = JSON.parse(localStorage.getItem(storageKey) || '[]');
      if (!Array.isArray(acquiredItems)) acquiredItems = [];
    } catch {
      acquiredItems = [];
    }

    let syncWithLeveling = false;
    try {
      syncWithLeveling = localStorage.getItem(syncStorageKey) === 'true';
    } catch {
      syncWithLeveling = false;
    }

    let completedSteps = [];
    try {
      completedSteps = JSON.parse(localStorage.getItem(levelingStorageKey) || '[]');
      if (!Array.isArray(completedSteps)) completedSteps = [];
    } catch {
      completedSteps = [];
    }

    const steps = prof.leveling?.steps || [];
    const recipes = prof.recipes || [];
    const hasPostBetaSplit = groups.length > 3
      || groups.some(g => g.title && g.title.toLowerCase().includes('after the beta'))
      || (groups.length === 3 && groups[1]?.title === groups[2]?.title);

    function isPost225GroupAt(idx, g) {
      if (!hasPostBetaSplit) return false;
      return idx >= 3 || (groups.length === 3 && idx === 2) || Boolean(g?.title && g.title.toLowerCase().includes('after the beta'));
    }

    const rawNamesByBracket = { false: new Set(), true: new Set() };
    groups.forEach((g, idx) => {
      const post225 = isPost225GroupAt(idx, g);
      if (!g.title || !g.title.toLowerCase().includes('made along the way')) {
        (g.items || []).forEach(rItem => rawNamesByBracket[post225].add((rItem.name || '').toLowerCase()));
      }
    });

    function getStepConsumedCount(itemObj, isPost225Group, groupObj) {
      if (!syncWithLeveling || !completedSteps.length) return 0;
      const isMadeAlongWayGroup = Boolean(groupObj?.title && groupObj.title.toLowerCase().includes('made along the way'));
      const targetName = (itemObj.name || '').toLowerCase();
      const targetId = itemObj.itemId;

      let directCraftedChecked = 0;
      let directConsumedChecked = 0;
      let totalCraftedInBracket = 0;

      steps.forEach((s, sIdx) => {
        if (s.type !== 'step') return;
        const stepPost225 = (s.from || 1) >= 225;
        if (hasPostBetaSplit && stepPost225 !== isPost225Group) return;
        const crafts = s.crafts || 1;
        const isTargetRecipe = (s.recipeName && s.recipeName.toLowerCase() === targetName) || (targetId && s.itemId === targetId);
        if (isTargetRecipe) {
          totalCraftedInBracket += crafts;
        }

        const stepId = `${prof.slug}_step_${sIdx}`;
        if (!completedSteps.includes(stepId)) return;

        if (isTargetRecipe) {
          directCraftedChecked += crafts;
        }
        (s.reagents || []).forEach(r => {
          if ((targetId && r.itemId === targetId) || (r.name && r.name.toLowerCase() === targetName)) {
            directConsumedChecked += crafts * (r.count || 1);
          }
        });
      });

      const rawSet = rawNamesByBracket[Boolean(isPost225Group)];
      if (isMadeAlongWayGroup) {
        if (rawSet.has(targetName) && totalCraftedInBracket === itemObj.count) {
          return directCraftedChecked;
        }
        return directConsumedChecked;
      }

      // Raw / Vendor group item:
      // For Blacksmithing Solid Stone (where 8 Solid Grinding Stones are for 1-225 and 4 are for 225-300, crafted at 200-206):
      let totalRaw = directConsumedChecked;
      if (prof.slug === 'blacksmithing' && targetName === 'solid stone') {
        const sgsStepIdx = steps.findIndex(s => s.type === 'step' && s.recipeName === 'Solid Grinding Stone');
        if (sgsStepIdx >= 0 && completedSteps.includes(`${prof.slug}_step_${sgsStepIdx}`)) {
          if (!isPost225Group) {
            totalRaw = Math.max(0, totalRaw - 16); // 4x Solid Grinding Stone (16 Solid Stone) belong to 225-300
          } else {
            totalRaw += 16;
          }
        }
      }

      groups.forEach((g, idx) => {
        if (isPost225GroupAt(idx, g) !== isPost225Group) return;
        if (g.title && g.title.toLowerCase().includes('made along the way')) {
          (g.items || []).forEach(mItem => {
            const mName = (mItem.name || '').toLowerCase();
            if (mName === targetName) {
              totalRaw = Math.max(0, totalRaw - directCraftedChecked);
              return;
            }
            if (rawSet.has(mName)) return;

            let mCraftedTotal = 0;
            let mConsumedChecked = 0;
            steps.forEach((s, sIdx) => {
              if (s.type !== 'step') return;
              const stepPost225 = (s.from || 1) >= 225;
              if (hasPostBetaSplit && stepPost225 !== isPost225Group) return;
              const crafts = s.crafts || 1;
              if ((s.recipeName && s.recipeName.toLowerCase() === mName) || (mItem.itemId && s.itemId === mItem.itemId)) {
                mCraftedTotal += crafts;
              }
              const stepId = `${prof.slug}_step_${sIdx}`;
              if (!completedSteps.includes(stepId)) return;
              (s.reagents || []).forEach(r => {
                if ((mItem.itemId && r.itemId === mItem.itemId) || (r.name && r.name.toLowerCase() === mName)) {
                  mConsumedChecked += crafts * (r.count || 1);
                }
              });
            });

            const yieldPerCraft = mName === 'stonescale oil' ? 2 : 1;
            const extraMCraftsUsed = Math.ceil(Math.max(0, mConsumedChecked - (mCraftedTotal * yieldPerCraft)) / yieldPerCraft);
            if (extraMCraftsUsed > 0) {
              const rec = recipes.find(r => r.name && r.name.toLowerCase() === mName);
              if (rec) {
                (rec.reagents || []).forEach(subR => {
                  if ((targetId && subR.id === targetId) || (subR.name && subR.name.toLowerCase() === targetName)) {
                    totalRaw += extraMCraftsUsed * (subR.count || 1);
                  }
                });
              }
            }
          });
        }
      });

      return totalRaw;
    }

    const allItemsWithGroup = groups.flatMap((g, idx) => (g.items || []).map(it => ({ it, g, isPost225Group: isPost225GroupAt(idx, g) })));
    const allItems = allItemsWithGroup.map(x => x.it);
    const totalItems = allItems.length;
    function countAcquiredItems() {
      return allItemsWithGroup.filter(({ it, g, isPost225Group }) => {
        if (acquiredItems.includes(it.name)) return true;
        if (syncWithLeveling) {
          const used = getStepConsumedCount(it, isPost225Group, g);
          if (used > 0 && Math.max(0, it.count - used) === 0) return true;
        }
        return false;
      }).length;
    }
    const initialAcquired = countAcquiredItems();
    const initialPct = totalItems > 0 ? Math.round((initialAcquired / totalItems) * 100) : 0;

    container.innerHTML = `
      <div class="leveling-header-block">
        <div class="leveling-header-title">
          <h3>${escapeHtml(shopping.title || 'SHOPPING LIST, 1 TO 225')}</h3>
          <p>${escapeHtml(shopping.subtitle || 'Trade goods, looted supplies, and crafted components needed to level.')}</p>
        </div>
        <div style="display: flex; gap: 0.5rem; align-items: center; flex-wrap: wrap;">
          <button type="button" class="shopping-copy-btn shopping-sync-btn ${syncWithLeveling ? 'active' : ''}" id="shopping-sync-btn" aria-pressed="${syncWithLeveling}" title="Subtract reagents already used in checked-off Leveling 1–300 steps">
            <span>🔄</span> ${syncWithLeveling ? 'Showing Remaining Only (Synced)' : 'Sync with Leveling Checklist'}
          </button>
          <button type="button" class="shopping-copy-btn" id="shopping-copy-btn" aria-label="Copy shopping list to clipboard">
            <span class="copy-icon">📋</span> Copy Shopping List
          </button>
          <button type="button" class="shopping-copy-btn shopping-reset-btn" id="shopping-reset-btn" aria-label="Reset acquired materials checklist" title="Reset all checked items">
            <span>↺</span> Reset Checklist
          </button>
        </div>
      </div>

      ${syncWithLeveling ? `
        <div class="shopping-sync-active-banner">
          <span>🔄 <strong>Synced with Leveling Checklist (${completedSteps.length} steps checked):</strong> Displaying remaining required materials after subtracting completed leveling brackets.</span>
        </div>
      ` : ''}

      <!-- Interactive Checklist Progress Bar -->
      <div class="shopping-checklist-bar">
        <div class="shopping-progress-labels">
          <span>
            <strong>Materials Acquired:</strong> 
            <span id="shopping-progress-count">${initialAcquired}</span> / ${totalItems} (<span id="shopping-progress-pct">${initialPct}%</span>)
          </span>
          <span style="font-size: 0.75rem; color: #94a3b8;">Click checkbox or card to track in your bags</span>
        </div>
        <div class="shopping-progress-track">
          <div class="shopping-progress-fill" id="shopping-progress-fill" style="width: ${initialPct}%;"></div>
        </div>
      </div>

      <div class="shopping-groups-container">
        ${groups.map((g, idx) => {
          const isPost225Group = isPost225GroupAt(idx, g);
          const isFirstPost225Group = isPost225Group && (idx === 0 || !isPost225GroupAt(idx - 1, groups[idx - 1]));
          return `
            ${isFirstPost225Group ? `
              <div class="shopping-beta-divider">
                <h4><span>⏳</span> Reagents for Leveling Past Phase 2 Beta Cap (225 to 300)</h4>
                <p>Trade goods, looted supplies, and crafted components needed once Artisan training opens post-beta.</p>
              </div>
            ` : ''}
            <div class="shopping-group-section">
              <div class="shopping-group-header">
                <h4 class="shopping-group-title">
                  ${escapeHtml(g.title)}
                  ${g.note ? `<small class="shopping-group-note">${escapeHtml(g.note)}</small>` : ''}
                </h4>
              </div>
              <div class="shopping-rows-grid">
                ${g.items.map(it => {
                  const usedBySteps = getStepConsumedCount(it, isPost225Group, g);
                  const remainingCount = syncWithLeveling ? Math.max(0, it.count - usedBySteps) : it.count;
                  const isStepDepleted = syncWithLeveling && remainingCount === 0 && usedBySteps > 0;
                  const isAcquired = acquiredItems.includes(it.name) || isStepDepleted;
                  return `
                    <div class="shopping-row-card ${isAcquired ? 'is-acquired' : ''} ${isStepDepleted ? 'is-step-completed' : ''}" data-item-id="${it.itemId}" data-item-name="${escapeHtml(it.name)}" data-remaining-count="${remainingCount}" data-base-count="${it.count}">
                      <input type="checkbox" class="shopping-item-check" ${isAcquired ? 'checked' : ''} aria-label="Mark ${escapeHtml(it.name)} as acquired" />
                      <div class="shopping-row-left">
                        <img src="${getIconUrl(it.icon)}" alt="${escapeHtml(it.name)}" class="shopping-icon q${it.quality || 1}" loading="lazy" />
                        <span class="shopping-name q${it.quality || 1}">${escapeHtml(it.name)}</span>
                      </div>
                      <div class="shopping-count-box">
                        <b class="shopping-count">${remainingCount}</b>
                        ${syncWithLeveling && usedBySteps > 0 ? `<small class="shopping-used-sub">of ${it.count}</small>` : ''}
                      </div>
                    </div>
                  `;
                }).join('')}
              </div>
            </div>
          `;
        }).join('')}
      </div>
    `;

    function updateShoppingProgress() {
      const curAcquired = countAcquiredItems();
      const curPct = totalItems > 0 ? Math.round((curAcquired / totalItems) * 100) : 0;
      const countEl = container.querySelector('#shopping-progress-count');
      const pctEl = container.querySelector('#shopping-progress-pct');
      const fillEl = container.querySelector('#shopping-progress-fill');
      if (countEl) countEl.textContent = curAcquired;
      if (pctEl) pctEl.textContent = `${curPct}%`;
      if (fillEl) fillEl.style.width = `${curPct}%`;
    }

    const syncBtn = container.querySelector('#shopping-sync-btn');
    if (syncBtn) {
      syncBtn.addEventListener('click', () => {
        syncWithLeveling = !syncWithLeveling;
        try { localStorage.setItem(syncStorageKey, String(syncWithLeveling)); } catch {}
        renderShoppingTab(container, prof);
      });
    }

    container.querySelectorAll('.shopping-item-check').forEach(chk => {
      chk.addEventListener('change', (e) => {
        e.stopPropagation();
        const card = chk.closest('.shopping-row-card');
        const name = card?.getAttribute('data-item-name');
        if (!name) return;
        if (chk.checked) {
          if (!acquiredItems.includes(name)) acquiredItems.push(name);
          card.classList.add('is-acquired');
        } else {
          acquiredItems = acquiredItems.filter(x => x !== name);
          card.classList.remove('is-acquired');
        }
        try { localStorage.setItem(storageKey, JSON.stringify(acquiredItems)); } catch {}
        updateShoppingProgress();
      });
    });

    const resetBtn = container.querySelector('#shopping-reset-btn');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        if (!acquiredItems.length) return;
        acquiredItems = [];
        try { localStorage.removeItem(storageKey); } catch {}
        container.querySelectorAll('.shopping-item-check').forEach(chk => { chk.checked = false; });
        container.querySelectorAll('.shopping-row-card').forEach(c => { c.classList.remove('is-acquired'); });
        updateShoppingProgress();
        if (typeof window.showToast === 'function') {
          window.showToast(`${prof.name} shopping checklist reset.`, 'info');
        }
      });
    }

    const copyBtn = container.querySelector('#shopping-copy-btn');
    if (copyBtn) {
      copyBtn.addEventListener('click', () => {
        let text = `=== ${prof.name} — ${shopping.title || 'Reagent Shopping List (1 to 225)'}${syncWithLeveling ? ' [Remaining Synced]' : ''} ===\n\n`;
        groups.forEach((g, idx) => {
          const isPost225Group = isPost225GroupAt(idx, g);
          text += `${g.title}${g.note ? ' (' + g.note + ')' : ''}:\n`;
          (g.items || []).forEach(it => {
            const usedBySteps = getStepConsumedCount(it, isPost225Group, g);
            const qty = syncWithLeveling ? Math.max(0, it.count - usedBySteps) : it.count;
            const mark = (acquiredItems.includes(it.name) || (syncWithLeveling && qty === 0)) ? '[x]' : '[ ]';
            text += `  ${mark} ${qty}x ${it.name}${syncWithLeveling && usedBySteps > 0 ? ` (of ${it.count})` : ''}\n`;
          });
          text += '\n';
        });
        if (typeof window.copyTextToClipboard === 'function') {
          window.copyTextToClipboard(text.trim(), () => {
            copyBtn.classList.add('copied');
            copyBtn.innerHTML = '<span class="copy-icon">✓</span> Copied to Clipboard!';
            if (typeof window.showToast === 'function') {
              window.showToast(`${prof.name} shopping list copied!`, 'success');
            }
            setTimeout(() => {
              copyBtn.classList.remove('copied');
              copyBtn.innerHTML = '<span class="copy-icon">📋</span> Copy Shopping List';
            }, 2500);
          });
        }
      });
    }

    attachTooltipListeners(container, prof);
  }

  /* ==========================================================================
     SUBTAB 4: CAMP, SKILL REWARDS AND PERKS
     ========================================================================== */
  function renderCampPerksTab(container, prof) {
    const camp = prof.campPerks || {};
    const milestones = camp.milestones || [];
    const atCamp = camp.atCamp || [];
    const legacyPerks = camp.legacyPerks || [];
    const passiveData = getProfessionPassive(prof.name || currentProfession);

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
    if (currentSubTab === 'buffs') {
      renderCampingBuffs(container, prof);
    } else if (currentSubTab === 'upgrades') {
      renderCampingUpgrades(container, prof);
    } else if (currentSubTab === 'perks') {
      renderCampingPerks(container, prof);
    } else if (currentSubTab === 'leveling') {
      renderLevelingTab(container, prof);
    } else if (currentSubTab === 'shopping') {
      renderShoppingTab(container, prof);
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
                    <img src="${getIconUrl(r.icon)}" alt="${escapeHtml(r.name)}" loading="lazy" />
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
                    <img src="${getIconUrl(r.icon)}" alt="${escapeHtml(r.name)}" loading="lazy" />
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
                      <img src="${getIconUrl(mat.icon)}" alt="${escapeHtml(mat.name)}" loading="lazy" />
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

  /* ==========================================================================
     SUBTAB 6: GATHERING NODES (HERBALISM & MINING)
     ========================================================================== */
  function renderNodesTab(container, prof) {
    const nodes = prof.nodes || [];
    container.innerHTML = `
      <div class="leveling-header-block">
        <div class="leveling-header-title">
          <h3>${escapeHtml(prof.name)} Resource Nodes (${nodes.length})</h3>
          <p>Every harvestable resource node across Azeroth, required skill levels, best farming locations, and item yield.</p>
        </div>
      </div>

      <div class="nodes-grid">
        ${nodes.map(n => `
          <div class="node-card">
            <div class="node-header">
              <img src="${getIconUrl(n.icon)}" alt="${escapeHtml(n.name)}" class="node-icon" loading="lazy" />
              <div class="node-title-box">
                <h4>${escapeHtml(n.name)}</h4>
                <small>${escapeHtml(n.zones)}</small>
              </div>
              <span class="node-skill-badge">Skill ${n.skill}</span>
            </div>
            ${n.drops && n.drops.length ? `
              <div class="node-drops-row">
                ${n.drops.map(d => `
                  <div class="step-reagent-badge" title="${escapeHtml(d.name)}" data-item-id="${d.itemId}" data-item-name="${escapeHtml(d.name)}">
                    <img src="${getIconUrl(d.icon)}" alt="${escapeHtml(d.name)}" class="step-reagent-img q${d.quality || 1}" loading="lazy" />
                  </div>
                `).join('')}
              </div>
            ` : ''}
          </div>
        `).join('')}
      </div>
    `;

    attachTooltipListeners(container, prof);
  }

  /* ==========================================================================
     SUBTAB 7: FISHING WATERS & LURES
     ========================================================================== */
  function renderFishingWatersTab(container, prof) {
    const waters = prof.fishingWaters || [];
    container.innerHTML = `
      <div class="leveling-header-block">
        <div class="leveling-header-title">
          <h3>Fishing Waters by Skill Bracket</h3>
          <p>Minimum fishing skill required in each zone to guarantee every catch lands without losing fish.</p>
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

  /* ==========================================================================
     INTERACTIVE FLOATING ITEM & REAGENT TOOLTIP ENGINE
     ========================================================================== */
  function showItemTooltip(e, name, quality = 1, desc = '', reagents = null, extra = null) {
    let tooltip = document.getElementById('wow-item-tooltip');
    if (!tooltip) {
      tooltip = document.createElement('div');
      tooltip.id = 'wow-item-tooltip';
      tooltip.className = 'wow-floating-tooltip';
      document.body.appendChild(tooltip);
    }

    let extraTop = '';
    if (extra && (extra.bop || extra.type)) {
      extraTop = `
        <div style="font-size: 0.76rem; color: #94a3b8; display: flex; justify-content: space-between; margin-top: 0.2rem;">
          <span>${escapeHtml(extra.bop || 'Binds when picked up')}</span>
          ${extra.type ? `<span>${escapeHtml(extra.type)}</span>` : ''}
        </div>
      `;
    }

    let extraSkill = '';
    if (extra && extra.skillReq) {
      extraSkill = `
        <div style="font-size: 0.8rem; color: #fff; margin-top: 0.35rem;">
          Requires <span style="color: var(--wow-skill-orange, #ff8000); font-weight: 600;">${escapeHtml(extra.skillReq)}</span>
        </div>
      `;
    }

    let extraUse = '';
    if (extra && extra.use) {
      extraUse = `
        <div style="font-size: 0.8rem; color: #4ade80; margin-top: 0.35rem; line-height: 1.35;">
          <strong>Use:</strong> ${escapeHtml(extra.use)}
        </div>
      `;
    }

    let extraCost = '';
    if (extra && extra.cost) {
      extraCost = `
        <div style="margin-top: 0.45rem; padding-top: 0.35rem; border-top: 1px dashed rgba(255,255,255,0.12); font-size: 0.78rem; display: flex; justify-content: space-between; color: #cbd5e1;">
          <span>Cost: <strong style="color: var(--text-gold, #facc15);">${escapeHtml(extra.cost)}</strong></span>
          ${extra.source ? `<span style="color: #94a3b8;">${escapeHtml(extra.source)}</span>` : ''}
        </div>
      `;
    }

    let reagentsHtml = '';
    if (reagents && reagents.length) {
      const craftsCount = extra && extra.crafts && extra.crafts > 1 ? Number(extra.crafts) : 1;
      reagentsHtml = `
        <div style="margin-top: 0.5rem; border-top: 1px dashed rgba(255,255,255,0.1); padding-top: 0.4rem;">
          <div style="font-size: 0.72rem; color: #94a3b8; margin-bottom: 0.3rem;">
            Reagents Required${craftsCount > 1 ? ` <span style="color: #38bdf8;">(Per Craft · Total for ~${craftsCount} Crafts)</span>` : ':'}
          </div>
          <div style="display: flex; gap: 0.35rem; flex-wrap: wrap;">
            ${reagents.map(r => {
              const perCraft = r.count || 1;
              const totalBracket = craftsCount * perCraft;
              return `
                <span style="display: inline-flex; align-items: center; gap: 0.25rem; background: rgba(0,0,0,0.4); padding: 0.15rem 0.35rem; border-radius: 3px; font-size: 0.72rem;">
                  <img src="${getIconUrl(r.icon)}" width="16" height="16" style="border-radius: 2px;" />
                  <span style="color: #fff; font-weight:700;">${perCraft}x</span>
                  <span class="q${r.quality || 1}">${escapeHtml(r.name)}</span>
                  ${craftsCount > 1 ? `<span style="color: #38bdf8; font-weight: 700; margin-left: 0.15rem;">(=${totalBracket} total)</span>` : ''}
                </span>
              `;
            }).join('')}
          </div>
        </div>
      `;
    }

    tooltip.innerHTML = `
      <div style="min-width: 220px; max-width: 340px; padding: 0.65rem 0.85rem; background: rgba(10, 14, 26, 0.96); border: 1px solid rgba(212, 175, 55, 0.5); border-radius: 6px; box-shadow: 0 8px 24px rgba(0,0,0,0.8); pointer-events: none;">
        <div class="q${quality}" style="font-weight: 700; font-size: 0.95rem; line-height: 1.3;">${escapeHtml(name)}</div>
        ${extraTop}
        ${extraSkill}
        ${extraUse}
        ${desc && !extraUse ? `<div style="font-size: 0.8rem; color: #cbd5e1; margin-top: 0.35rem; line-height: 1.4;">${escapeHtml(desc)}</div>` : ''}
        ${reagentsHtml}
        ${extraCost}
      </div>
    `;

    tooltip.removeAttribute('hidden');
    tooltip.style.display = 'block';
    tooltip.style.opacity = '1';
    tooltip.style.pointerEvents = 'none';
    tooltip.style.position = 'fixed';
    tooltip.style.zIndex = '9999999';

    positionTooltip(e, tooltip);
  }

  function positionTooltip(e, tooltip) {
    const x = e.clientX + 15;
    const y = e.clientY + 15;
    const pad = 12;
    const ttWidth = tooltip.offsetWidth || 220;
    const ttHeight = tooltip.offsetHeight || 100;

    let left = x;
    let top = y;
    if (left + ttWidth > window.innerWidth - pad) {
      left = e.clientX - ttWidth - 10;
    }
    if (top + ttHeight > window.innerHeight - pad) {
      top = e.clientY - ttHeight - 10;
    }
    tooltip.style.left = `${Math.max(pad, left)}px`;
    tooltip.style.top = `${Math.max(pad, top)}px`;
  }

  function hideItemTooltip() {
    const tooltip = document.getElementById('wow-item-tooltip');
    if (tooltip) {
      tooltip.style.display = 'none';
      tooltip.style.opacity = '0';
    }
  }

  function attachTooltipListeners(container, prof) {
    if (!prof) {
      // Overview Hub tooltips for camp buff cards and camp matrix stations
      container.querySelectorAll('.prof-dir-camp-box').forEach(el => {
        const strong = el.querySelector('strong');
        const text = el.textContent || '';
        const title = strong ? strong.textContent.replace(/:$/, '').trim() : 'Campfire Station Buff';
        el.addEventListener('mouseenter', (e) => {
          showItemTooltip(e, title, 2, text, null, {
            type: 'Camp Utility Station',
            use: 'Constructed at camp to grant party-wide benefits.'
          });
        });
        el.addEventListener('mousemove', (e) => {
          const tt = document.getElementById('wow-item-tooltip');
          if (tt) positionTooltip(e, tt);
        });
        el.addEventListener('mouseleave', hideItemTooltip);
      });

      container.querySelectorAll('.matrix-station-cell').forEach(el => {
        const strong = el.querySelector('strong');
        const small = el.querySelector('small');
        const title = strong ? strong.textContent.trim() : 'Profession Station';
        const desc = small ? small.textContent.replace(/^·\s*/, '').trim() : (el.getAttribute('title') || '');
        el.addEventListener('mouseenter', (e) => {
          showItemTooltip(e, title, 2, desc, null, {
            type: 'Campfire Profession Station',
            use: 'Provides 80% potency of class blessings to nearby party members for 1 hour.'
          });
        });
        el.addEventListener('mousemove', (e) => {
          const tt = document.getElementById('wow-item-tooltip');
          if (tt) positionTooltip(e, tt);
        });
        el.addEventListener('mouseleave', hideItemTooltip);
      });
      return;
    }

    // Main Recipes Catalog cards hover
    container.querySelectorAll('.recipe-card .recipe-item-icon, .recipe-card .recipe-title').forEach(el => {
      const name = el.getAttribute('data-recipe-name') || '';
      if (!name) return;
      const match = (prof.recipes || []).find(r => r.name && r.name.toLowerCase() === name.toLowerCase());
      if (!match) return;

      const extra = {
        type: `${prof.name || 'Crafted'} Item`,
        skillReq: `${prof.name} (${match.learn})`,
        source: match.source || 'Trainer'
      };

      el.addEventListener('mouseenter', (e) => {
        showItemTooltip(e, match.name, match.quality || 1, match.effect || '', match.reagents || null, extra);
      });
      el.addEventListener('mousemove', (e) => {
        const tt = document.getElementById('wow-item-tooltip');
        if (tt) positionTooltip(e, tt);
      });
      el.addEventListener('mouseleave', hideItemTooltip);
    });

    // Recipes / steps (with exact recipe lookup, Mining Smelt -> Bar mapping, Camping station lookup & click-to-inspect)
    container.querySelectorAll('.step-recipe-name').forEach(el => {
      const name = el.getAttribute('data-recipe-name') || el.textContent.replace(/↗$/, '').trim();
      const stepIdx = parseInt(el.getAttribute('data-step-idx') || '-1', 10);
      const stepObj = (stepIdx >= 0 && prof.leveling?.steps) ? prof.leveling.steps[stepIdx] : null;
      const cleanName = name.toLowerCase()
        .replace(/^make (a|an) /i, '')
        .replace(/\s*\(smelting bypass\)$/i, '')
        .trim();
      const smeltTarget = cleanName.startsWith('smelt ') ? `${cleanName.replace(/^smelt\s+/, '')} bar` : null;
      const recipesList = prof.recipes || [];

      // 1. Exact name or Smelt Bar match first (prevents "Heavy Linen Bandage" from matching "Linen Bandage")
      let match = recipesList.find(r => {
        if (!r.name) return false;
        const rn = r.name.toLowerCase();
        return rn === name.toLowerCase() || rn === cleanName || (smeltTarget && rn === smeltTarget);
      });
      // 2. Fallback to itemId match
      if (!match && stepObj?.itemId) {
        match = recipesList.find(r => r.id === stepObj.itemId || r.itemId === stepObj.itemId);
      }
      // 3. Fallback to substring match only if still unmatched
      if (!match) {
        match = recipesList.find(r => {
          if (!r.name) return false;
          const rn = r.name.toLowerCase();
          return rn.includes(cleanName) || cleanName.includes(rn);
        });
      }

      let targetSubtab = 'recipes';
      if (!match && prof.slug === 'camping') {
        const campingAliasMap = {
          'lean-to shelter': { subtab: 'buffs', target: 'Camp Tent' },
          'linen wall tent': { subtab: 'buffs', target: 'Camp Tent' },
          'silk trail pavilion': { subtab: 'buffs', target: 'Camp Tent' },
          'field tanning rack': { subtab: 'upgrades', target: 'Tanning Rack' },
          'field spinning wheel': { subtab: 'upgrades', target: 'Spinning Wheel' },
          'portable blacksmithing anvil': { subtab: 'upgrades', target: 'Anvil' },
          'field alchemy cauldron': { subtab: 'upgrades', target: 'Fermenter' }
        };
        const alias = campingAliasMap[cleanName];
        const lookupKey = alias ? alias.target.toLowerCase() : cleanName;

        const cf = (prof.campfires || []).find(c => c.name && (c.name.toLowerCase() === lookupKey || lookupKey.includes(c.name.toLowerCase()) || c.name.toLowerCase().includes(lookupKey)));
        if (cf) {
          targetSubtab = 'guide';
          match = {
            name: cf.name,
            quality: cf.quality || 2,
            effect: `${cf.desc || ''} (Holds ${cf.capacity || 3} stations)`,
            learn: cf.skillReq || (stepObj ? `${stepObj.from}–${stepObj.to}` : '1'),
            source: cf.blueprint ? cf.blueprint.text : (stepObj?.source || 'Camping Trainer'),
            reagents: stepObj?.reagents || cf.reagents || null
          };
        }
        if (!match) {
          const bf = (prof.buffObjects || []).find(b => b.object && (b.object.toLowerCase() === lookupKey || lookupKey.includes(b.object.toLowerCase())));
          if (bf) {
            targetSubtab = 'buffs';
            match = {
              name: bf.object,
              quality: 2,
              effect: stepObj?.advice ? `${stepObj.advice} (${bf.object}: ${bf.gives})` : bf.gives,
              learn: stepObj ? `${stepObj.from}–${stepObj.to}` : `${bf.profName} ${bf.skillReq}`,
              source: stepObj?.source || 'Camping Trainer',
              reagents: stepObj?.reagents || bf.reagents || null
            };
          }
        }
        if (!match && prof.upgrades) {
          for (const u of prof.upgrades) {
            if (u.s140?.name && (u.s140.name.toLowerCase() === lookupKey || lookupKey.includes(u.s140.name.toLowerCase()))) {
              targetSubtab = 'upgrades';
              match = {
                name: u.s140.name,
                quality: 2,
                effect: stepObj?.advice ? `${stepObj.advice} (${u.s140.desc})` : u.s140.desc,
                learn: stepObj ? `${stepObj.from}–${stepObj.to}` : u.s140.skill,
                source: stepObj?.source || 'Camping Blueprint',
                reagents: stepObj?.reagents || null
              };
              break;
            }
            if (u.s300?.name && (u.s300.name.toLowerCase() === lookupKey || lookupKey.includes(u.s300.name.toLowerCase()))) {
              targetSubtab = 'upgrades';
              match = {
                name: u.s300.name,
                quality: 3,
                effect: stepObj?.advice ? `${stepObj.advice} (${u.s300.desc})` : u.s300.desc,
                learn: stepObj ? `${stepObj.from}–${stepObj.to}` : u.s300.skill,
                source: stepObj?.source || 'Camping Blueprint',
                reagents: stepObj?.reagents || null
              };
              break;
            }
          }
        }
      }

      const ttQuality = match?.quality || (stepObj?.vendorDetails ? 2 : 1);
      const ttDesc = match?.effect || stepObj?.advice || stepObj?.source || match?.source || '';
      const ttReagents = stepObj?.reagents || match?.reagents || null;
      const ttExtra = {
        type: `${prof.name || 'Tradeskill'} Step${stepObj?.crafts > 1 ? ` (~${stepObj.crafts} Crafts)` : ''}`,
        skillReq: match?.learn ? `${prof.name} (${match.learn})` : (stepObj ? `${prof.name} (${stepObj.from}–${stepObj.to})` : ''),
        source: stepObj?.source || match?.source || 'Trainer',
        cost: stepObj?.vendorDetails?.cost || '',
        crafts: stepObj?.crafts || 1
      };

      el.addEventListener('mouseenter', (e) => {
        showItemTooltip(e, name, ttQuality, ttDesc, ttReagents, ttExtra);
      });
      el.addEventListener('mousemove', (e) => {
        const tt = document.getElementById('wow-item-tooltip');
        if (tt) positionTooltip(e, tt);
      });
      el.addEventListener('mouseleave', hideItemTooltip);

      const handleStepRecipeClick = (e) => {
        e.stopPropagation();
        hideItemTooltip();
        if (prof.slug === 'camping') {
          const destTab = targetSubtab === 'recipes' ? 'guide' : targetSubtab;
          if (window.WOW_PROFESSIONS?.selectProfession) {
            window.WOW_PROFESSIONS.selectProfession('camping', destTab, '');
            const targetItemName = match?.name || name;
            setTimeout(() => {
              const cardEl = Array.from(document.querySelectorAll('.camp-tooltip-item')).find(
                c => (c.getAttribute('data-item-name') || '').toLowerCase() === targetItemName.toLowerCase()
              );
              if (cardEl) {
                cardEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
                cardEl.classList.add('recipe-card-highlight');
                setTimeout(() => cardEl.classList.remove('recipe-card-highlight'), 2500);
              }
            }, 150);
          }
          return;
        }
        if (prof.recipes && prof.recipes.length > 0) {
          const lookupQuery = match?.name || name.replace(/^Make (a|an) /i, '').replace(/\s*\(Smelting Bypass\)$/i, '').trim();
          if (window.WOW_PROFESSIONS?.selectProfession) {
            window.WOW_PROFESSIONS.selectProfession(prof.slug, 'recipes', lookupQuery, match?.id || '');
          }
        } else {
          const itemId = el.getAttribute('data-item-id') || '';
          openReverseReagentLookup(itemId, name.replace(/\s*\(Smelting Bypass\)$/i, '').trim());
        }
      };

      el.addEventListener('click', handleStepRecipeClick);
      el.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleStepRecipeClick(e);
        }
      });
    });

    // Merchant's Favor recipe card/bar hover
    container.querySelectorAll('.favor-recipe-card').forEach(el => {
      const name = el.getAttribute('data-recipe-name') || '';
      const crafted = el.getAttribute('data-crafted-name') || '';
      const quality = parseInt(el.getAttribute('data-quality') || '1', 10);
      const effect = el.getAttribute('data-effect') || '';
      const skill = el.getAttribute('data-skill') || '1';
      const cost = el.getAttribute('data-cost') || '';
      const profName = el.getAttribute('data-prof') || prof.name || 'Trade';

      const match = (prof.recipes || []).find(r => 
        r.name && (
          r.name.toLowerCase() === crafted.toLowerCase() ||
          r.name.toLowerCase() === name.toLowerCase() ||
          (r.source && r.source.toLowerCase().includes(name.toLowerCase()))
        )
      );

      const reagents = match?.reagents || null;
      const extra = {
        bop: 'Binds when picked up',
        type: `${profName} Formula`,
        skillReq: `${profName} (${skill})`,
        use: effect ? `Teaches ${crafted || name}. ${effect}` : `Teaches ${crafted || name}.`,
        cost: cost,
        source: 'Merchant\'s Favor Quartermaster'
      };

      el.addEventListener('mouseenter', (e) => {
        showItemTooltip(e, name, quality, effect, reagents, extra);
      });
      el.addEventListener('mousemove', (e) => {
        const tt = document.getElementById('wow-item-tooltip');
        if (tt) positionTooltip(e, tt);
      });
      el.addEventListener('mouseleave', hideItemTooltip);
    });

    // Merchant's Favor Skill Requirement Progress Bars hover
    container.querySelectorAll('.favor-skill-track').forEach(el => {
      const skill = el.getAttribute('data-skill') || '1';
      const profName = el.getAttribute('data-prof') || prof.name || 'Trade';
      const percent = Math.min(100, Math.round((parseInt(skill, 10) / 300) * 100));

      el.addEventListener('mouseenter', (e) => {
        e.stopPropagation();
        showItemTooltip(
          e, 
          `${profName} Skill Requirement: ${skill} / 300`, 
          2, 
          `Requires ${skill} ${profName} skill to learn and craft. Leveling progression is currently capped at 225 during the beta phase (${percent}% toward 300 mastery).`, 
          null, 
          { type: 'Skill Milestone', skillReq: `${profName} (${skill})` }
        );
      });
      el.addEventListener('mousemove', (e) => {
        const tt = document.getElementById('wow-item-tooltip');
        if (tt) positionTooltip(e, tt);
      });
      el.addEventListener('mouseleave', (e) => {
        e.stopPropagation();
        hideItemTooltip();
      });
    });

    // Stacking exclusion lookup for camp stations
    const campBuffStackingNotes = {
      'Mana Well': 'Does not stack with Blessing of Wisdom or Mana Spring Totem.',
      'Sharpening Wheel': 'Does not stack with Strength of Earth Totem.',
      'Enchanted Lute': 'Does not stack with Mark of the Wild.',
      'Faction Banner': 'Does not stack with Divine Spirit.',
      'Lodestone': 'Does not stack with Blessing of Might or Battle Shout.',
      'Incense Candle': 'Does not stack with Arcane Intellect.',
      'Fish Bowl': 'Does not stack with Blessing of Kings.',
      'First Aid Kit': 'Does not stack with Power Word: Fortitude.'
    };

    // Camping object and kit cards hover
    container.querySelectorAll('.camp-tooltip-item').forEach(el => {
      const name = el.getAttribute('data-item-name') || '';
      const quality = parseInt(el.getAttribute('data-quality') || '1', 10);
      const effect = el.getAttribute('data-effect') || '';
      const req = el.getAttribute('data-req') || '';
      const desc = el.getAttribute('data-desc') || '';
      if (!name) return;

      const stackNote = campBuffStackingNotes[name] ? ` (${campBuffStackingNotes[name]})` : '';
      const fullUse = (effect ? `Place near a campfire. ${effect}` : desc) + stackNote;

      const triggerTooltip = (e) => {
        showItemTooltip(e, name, quality, effect || desc, null, {
          type: 'Camp Utility Object',
          skillReq: req,
          use: fullUse
        });
      };

      el.addEventListener('mouseenter', triggerTooltip);
      el.addEventListener('click', triggerTooltip);
      el.addEventListener('mousemove', (e) => {
        const tt = document.getElementById('wow-item-tooltip');
        if (tt) positionTooltip(e, tt);
      });
      el.addEventListener('mouseleave', hideItemTooltip);
    });

    // Reagent source quick action buttons on recipe cards
    container.querySelectorAll('.recipe-reagent-cta-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        hideItemTooltip();
        const name = btn.getAttribute('data-reagent-name');
        const rawId = btn.getAttribute('data-reagent-id') || '';
        const targetTab = btn.getAttribute('data-reagent-tab') || 'fishing';
        openReverseReagentLookup(name, rawId, targetTab);
      });
    });

    // Reagent chips, badges & shopping rows - hover for tooltip, click for reverse lookup modal
    container.querySelectorAll('.reagent-chip, .step-reagent-badge, .shopping-row-card').forEach(el => {
      const name = el.getAttribute('data-item-name') || el.getAttribute('title') || '';
      const rawId = el.getAttribute('data-item-id') || '';
      const perCraft = parseInt(el.getAttribute('data-per-craft') || '0', 10);
      const totalStep = parseInt(el.getAttribute('data-total-step') || '0', 10);
      const stepCrafts = parseInt(el.getAttribute('data-crafts') || '0', 10);
      if (!name) return;
      const triggerTooltip = (e) => {
        e.stopPropagation();
        const src = resolveReagentSource(name, rawId);
        let summaryDesc = src && src.summary ? src.summary : 'Crafting Reagent / Material';
        if (perCraft > 0 && stepCrafts > 1) {
          summaryDesc = `${perCraft}x per craft × ~${stepCrafts} crafts = ${totalStep}x total for this bracket. ${summaryDesc}`;
        } else if (perCraft > 0) {
          summaryDesc = `${perCraft}x required for this step. ${summaryDesc}`;
        }
        let useHint = 'Click to find all recipes across professions that use this material.';
        if (src) {
          if (src.primaryType === 'fished' && src.fishedIn && src.fishedIn.length > 0) {
            useHint = `🎣 Click to view where to fish this (${src.fishedIn.length} Waters), mob drops & recipes.`;
          } else {
            useHint = `${src.ctaIcon || '📍'} Click to view farming sources, drop rates, vendors & recipes.`;
          }
        }
        showItemTooltip(e, name, 1, summaryDesc, null, { 
          type: perCraft > 0 && stepCrafts > 1 ? `Bracket Reagent (${perCraft}x · =${totalStep} Total)` : 'Crafting Component',
          use: useHint
        });
      };
      el.addEventListener('mouseenter', triggerTooltip);
      el.addEventListener('click', (e) => {
        if (e.target.classList.contains('shopping-item-check')) return;
        e.stopPropagation();
        hideItemTooltip();
        const src = resolveReagentSource(name, rawId);
        let defaultTab = null;
        if (src?.primaryType === 'fished' && src.fishedIn?.length) defaultTab = 'fishing';
        else if (src?.primaryType === 'mob_drop' && src.drops?.length) defaultTab = 'drops';
        else if (src?.primaryType === 'vendor' && src.vendors?.length) defaultTab = 'vendors';
        else if (src?.primaryType === 'herb' || src?.primaryType === 'ore') defaultTab = 'nodes';
        else if (src?.primaryType === 'skinned' && src.skinnedFrom?.length) defaultTab = 'skinning';
        openReverseReagentLookup(name, rawId, defaultTab);
      });
      el.addEventListener('mousemove', (e) => {
        const tt = document.getElementById('wow-item-tooltip');
        if (tt) positionTooltip(e, tt);
      });
      el.addEventListener('mouseleave', (e) => {
        e.stopPropagation();
        hideItemTooltip();
      });
    });
  }

  /* ==========================================================================
     REVERSE REAGENT SEARCH & ACQUISITION SOURCE MODAL ENGINE
     ========================================================================== */
  function resolveReagentSource(rawName, explicitId = null) {
    const sources = window.WOW_REAGENT_SOURCES || {};
    if (explicitId && sources[explicitId]) {
      return sources[explicitId];
    }
    if (!rawName) return null;
    const cleanName = rawName.replace(/^\d+x\s*/i, '').trim().toLowerCase();
    for (const src of Object.values(sources)) {
      if (src.name && src.name.toLowerCase() === cleanName) {
        return src;
      }
    }
    for (const src of Object.values(sources)) {
      if (src.name && (src.name.toLowerCase().includes(cleanName) || cleanName.includes(src.name.toLowerCase()))) {
        return src;
      }
    }
    return null;
  }

  function openReverseReagentLookup(rawName, explicitId = null, initialTab = null) {
    if (!rawName) return;
    const cleanName = rawName.replace(/^\d+x\s*/i, '').trim();
    const cleanLower = cleanName.toLowerCase();
    const data = window.WOW_PROFESSIONS_DATA || {};

    const matches = [];
    let matIcon = '';
    let matQuality = 1;
    let resolvedId = explicitId ? Number(explicitId) : null;

    Object.entries(data).forEach(([slug, p]) => {
      (p.recipes || []).forEach(r => {
        const mat = (r.reagents || []).find(m => {
          if (!m.name) return false;
          const mn = m.name.replace(/^\d+x\s*/i, '').trim().toLowerCase();
          return mn === cleanLower || mn.includes(cleanLower) || cleanLower.includes(mn);
        });
        if (mat) {
          if (!matIcon && mat.icon) matIcon = mat.icon;
          if (mat.quality) matQuality = mat.quality;
          if (!resolvedId && (mat.id || mat.itemId)) resolvedId = Number(mat.id || mat.itemId);
          matches.push({
            profSlug: slug,
            profName: p.name,
            profIcon: p.icon,
            recipe: r,
            neededCount: mat.count || 1
          });
        }
      });
    });

    const sourceData = resolveReagentSource(cleanName, resolvedId);
    if (!resolvedId && sourceData?.id) {
      resolvedId = sourceData.id;
    }

    let modal = document.getElementById('prof-reagent-lookup-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'prof-reagent-lookup-modal';
      modal.className = 'reagent-lookup-backdrop';
      modal.setAttribute('role', 'dialog');
      modal.setAttribute('aria-modal', 'true');
      document.body.appendChild(modal);

      modal.addEventListener('click', (e) => {
        if (e.target === modal) closeReagentModal();
      });
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('is-open')) {
          closeReagentModal();
        }
      });
    }

    function closeReagentModal() {
      modal.classList.remove('is-open');
      modal.setAttribute('hidden', '');
    }

    const profCounts = {};
    matches.forEach(m => {
      profCounts[m.profName] = (profCounts[m.profName] || 0) + 1;
    });
    const profNames = Object.keys(profCounts);
    const iconUrl = matIcon ? getIconUrl(matIcon) : `${CDN_BASE}inv_misc_questionmark.jpg`;

    const hasFishing = Boolean(sourceData?.fishedIn && sourceData.fishedIn.length > 0);
    const hasDrops = Boolean(sourceData?.drops && sourceData.drops.length > 0);
    const hasVendors = Boolean(sourceData?.vendors && sourceData.vendors.length > 0);
    const validMinedFrom = (sourceData?.minedFrom || []).filter(o => o.pct > 0);
    const validGatheredFrom = (sourceData?.gatheredFrom || []).filter(o => o.pct > 0);
    const nodeObjects = validMinedFrom.concat(validGatheredFrom);
    const hasNodes = Boolean(nodeObjects.length > 0 || sourceData?.herbNode || sourceData?.miningNode);
    const hasSkinning = Boolean(sourceData?.skinnedFrom && sourceData.skinnedFrom.length > 0);

    let activeFilter = 'all';
    let activeModalView = initialTab;

    if (!activeModalView) {
      if (sourceData?.primaryType === 'fished' && hasFishing) {
        activeModalView = 'fishing';
      } else if (sourceData?.primaryType === 'mob_drop' && hasDrops) {
        activeModalView = 'drops';
      } else if (sourceData?.primaryType === 'vendor' && hasVendors) {
        activeModalView = 'vendors';
      } else if (sourceData?.primaryType === 'herb' || sourceData?.primaryType === 'ore') {
        activeModalView = 'nodes';
      } else if (sourceData?.primaryType === 'skinned' && hasSkinning) {
        activeModalView = 'skinning';
      } else if (matches.length > 0) {
        activeModalView = 'recipes';
      } else if (hasFishing) {
        activeModalView = 'fishing';
      } else if (hasDrops) {
        activeModalView = 'drops';
      } else if (hasVendors) {
        activeModalView = 'vendors';
      } else {
        activeModalView = 'recipes';
      }
    } else if (activeModalView === 'sources') {
      if (sourceData?.primaryType === 'fished' && hasFishing) {
        activeModalView = 'fishing';
      } else if (sourceData?.primaryType === 'mob_drop' && hasDrops) {
        activeModalView = 'drops';
      } else if (sourceData?.primaryType === 'vendor' && hasVendors) {
        activeModalView = 'vendors';
      } else if (hasFishing) {
        activeModalView = 'fishing';
      } else if (hasDrops) {
        activeModalView = 'drops';
      } else {
        activeModalView = 'all';
      }
    }

    function renderAcquisitionView(src, viewMode = 'all') {
      if (!src) {
        return `
          <div class="reagent-lookup-empty">
            No specific open-world drop table recorded for this reagent.
            ${resolvedId ? `<div style="margin-top:0.75rem;"><a href="https://www.wowhead.com/forever/item=${resolvedId}" target="_blank" rel="noopener" class="reagent-wowhead-ext-btn">🌐 View on Wowhead Forever ↗</a></div>` : ''}
          </div>
        `;
      }

      // Summary Banner + Internal Jump Buttons
      let internalJumpHtml = '';
      if ((viewMode === 'all' || viewMode === 'nodes') && src.primaryType === 'herb' && src.herbNode) {
        internalJumpHtml += `
          <button type="button" class="reagent-internal-jump-btn" data-jump-prof="herbalism" data-jump-subtab="nodes">
            <span>🌿</span> View ${escapeHtml(src.herbNode.name)} in Herbalism Nodes (Skill ${src.herbNode.skill}+) ›
          </button>
        `;
      }
      if ((viewMode === 'all' || viewMode === 'nodes') && src.primaryType === 'ore' && src.miningNode) {
        internalJumpHtml += `
          <button type="button" class="reagent-internal-jump-btn" data-jump-prof="mining" data-jump-subtab="nodes">
            <span>⛏️</span> View ${escapeHtml(src.miningNode.name)} in Mining Nodes (Skill ${src.miningNode.skill}+) ›
          </button>
        `;
      }
      if ((viewMode === 'all' || viewMode === 'fishing') && src.fishedIn && src.fishedIn.length > 0) {
        internalJumpHtml += `
          <button type="button" class="reagent-internal-jump-btn" data-jump-prof="fishing" data-jump-subtab="waters">
            <span>🌊</span> View Fishing Waters & Skill Brackets ›
          </button>
        `;
      }
      if ((viewMode === 'all' || viewMode === 'skinning') && src.primaryType === 'skinned' && src.skinnedFrom && src.skinnedFrom.length > 0) {
        internalJumpHtml += `
          <button type="button" class="reagent-internal-jump-btn" data-jump-prof="skinning" data-jump-subtab="leveling">
            <span>🔪</span> View Skinning Beast Level Brackets ›
          </button>
        `;
      }

      let summaryTitle = `How to Acquire ${escapeHtml(cleanName)} in WoW Forever`;
      let summaryText = src.summary || 'Looted, gathered, or purchased across Azeroth.';
      let summaryIcon = src.ctaIcon || '📍';

      if (viewMode === 'fishing') {
        summaryTitle = `Where to Fish ${escapeHtml(cleanName)}`;
        summaryIcon = '🎣';
        const topZ = (src.fishedIn || []).slice(0, 3).map(f => `${f.zone}${f.pct ? ` (${f.pct}%)` : ''}`).join(', ');
        summaryText = topZ ? `Catch from open waters in ${topZ}. Minimum fishing skill and zone waters listed below.` : 'Fished in open waters across Azeroth.';
      } else if (viewMode === 'drops') {
        summaryTitle = `Top Mobs Dropping ${escapeHtml(cleanName)}`;
        summaryIcon = '⚔️';
        const mobTotal = src.totalDropMobs || (src.drops ? src.drops.length : 0);
        summaryText = `Farmed from ${mobTotal} mobs across Azeroth. Drop rates, spawn zones, and mob levels listed below.`;
      } else if (viewMode === 'vendors') {
        summaryTitle = `Vendors Selling ${escapeHtml(cleanName)}`;
        summaryIcon = '🪙';
        const totalV = src.totalVendors || (src.vendors ? src.vendors.length : 0);
        summaryText = `Purchased from ${totalV} trade vendors across Azeroth. Prices, stock limits, and locations listed below.`;
      }

      const summaryBoxHtml = `
        <div class="reagent-source-summary-box">
          <div class="reagent-source-summary-main">
            <span class="reagent-source-summary-icon">${summaryIcon}</span>
            <div>
              <div class="reagent-source-summary-title">${summaryTitle}</div>
              <p class="reagent-source-summary-text">${escapeHtml(summaryText)}</p>
            </div>
          </div>
          ${internalJumpHtml ? `<div class="reagent-source-internal-jumps">${internalJumpHtml}</div>` : ''}
        </div>
      `;

      // Fishing Waters Section ('fished-in')
      const fishingWatersData = window.WOW_PROFESSIONS_DATA?.fishing?.fishingWaters || [];
      const zoneSkillMap = {};
      fishingWatersData.forEach(w => {
        (w.zones || '').split(',').forEach(z => {
          zoneSkillMap[z.trim().toLowerCase()] = w.skill;
        });
      });

      const fishingSectionHtml = (src.fishedIn && src.fishedIn.length > 0) ? `
        <div class="reagent-source-section">
          <div class="reagent-source-sec-head">
            <h4 class="reagent-source-sec-title"><span>🎣</span> Best Fishing Zones (${src.fishedIn.length})</h4>
            <a href="https://www.wowhead.com/forever/item=${src.id}#fished-in" target="_blank" rel="noopener" class="reagent-sec-wowhead-link">
              Full fishing table on Wowhead ↗
            </a>
          </div>
          <div class="reagent-source-grid">
            ${src.fishedIn.map(f => {
              const pctVal = f.pct !== null && f.pct !== undefined ? `${f.pct}%` : 'Catch';
              const pctClass = f.pct >= 35 ? 'high' : (f.pct >= 15 ? 'med' : 'low');
              const lvlStr = f.minLevel ? `Zone Lvl ${f.minLevel}–${f.maxLevel || f.minLevel}` : 'Open Water';
              const reqSkill = zoneSkillMap[(f.zone || '').trim().toLowerCase()];
              const skillBadge = reqSkill ? ` · <span class="reagent-row-skill">Fishing ${reqSkill}</span>` : '';
              return `
                <div class="reagent-source-card">
                  <div class="reagent-source-card-left">
                    <span class="reagent-drop-pct-badge ${pctClass}">${pctVal}</span>
                    <div>
                      <div class="reagent-source-name">🌊 ${escapeHtml(f.zone)}</div>
                      <div class="reagent-source-sub">${escapeHtml(lvlStr)}${skillBadge}</div>
                    </div>
                  </div>
                  <a href="https://www.wowhead.com/forever/zone=${f.id}" target="_blank" rel="noopener" class="reagent-npc-map-btn" title="View ${escapeHtml(f.zone)} fishing water map on Wowhead Forever">
                    Map ↗
                  </a>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      ` : '';

      // Mob Drops Table ('dropped-by')
      const totalMobs = src.totalDropMobs || (src.drops ? src.drops.length : 0);
      const dropsSectionHtml = (src.drops && src.drops.length > 0) ? `
        <div class="reagent-source-section">
          <div class="reagent-source-sec-head">
            <h4 class="reagent-source-sec-title"><span>⚔️</span> Top Farming Mobs (${src.drops.length} of ${totalMobs} Mobs)</h4>
            <a href="https://www.wowhead.com/forever/item=${src.id}#dropped-by" target="_blank" rel="noopener" class="reagent-sec-wowhead-link">
              See all ${totalMobs} mobs & spawn maps on Wowhead ↗
            </a>
          </div>
          <div class="reagent-source-grid">
            ${src.drops.map(d => {
              const lvlStr = d.minLevel ? (d.maxLevel && d.maxLevel !== d.minLevel ? `Lvl ${d.minLevel}–${d.maxLevel}` : `Lvl ${d.minLevel}`) : '';
              const zoneStr = (d.zones && d.zones.length) ? d.zones.join(', ') : 'Azeroth';
              const pctVal = d.pct !== null && d.pct !== undefined ? `${d.pct}%` : 'Drop';
              const pctClass = d.pct >= 50 ? 'high' : (d.pct >= 20 ? 'med' : 'low');
              return `
                <div class="reagent-source-card">
                  <div class="reagent-source-card-left">
                    <span class="reagent-drop-pct-badge ${pctClass}" title="Estimated Drop Chance">${pctVal}</span>
                    <div>
                      <div class="reagent-source-name">
                        ${escapeHtml(d.name)}
                        ${d.elite ? '<span class="reagent-mob-tag elite">Elite</span>' : ''}
                        ${d.rare ? '<span class="reagent-mob-tag rare">Rare</span>' : ''}
                        ${d.isNew ? '<span class="recipe-new-tag">New</span>' : ''}
                      </div>
                      <div class="reagent-source-sub">
                        ${lvlStr ? `<span class="reagent-mob-lvl">${lvlStr}</span> · ` : ''}
                        <span class="reagent-mob-zone">📍 ${escapeHtml(zoneStr)}</span>
                      </div>
                    </div>
                  </div>
                  <a href="https://www.wowhead.com/forever/npc=${d.id}" target="_blank" rel="noopener" class="reagent-npc-map-btn" title="View ${escapeHtml(d.name)} spawn map on Wowhead Forever">
                    Map ↗
                  </a>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      ` : '';

      // Vendors ('sold-by')
      const totalV = src.totalVendors || (src.vendors ? src.vendors.length : 0);
      const vendorsSectionHtml = (src.vendors && src.vendors.length > 0) ? `
        <div class="reagent-source-section">
          <div class="reagent-source-sec-head">
            <h4 class="reagent-source-sec-title"><span>🪙</span> Sold By Vendors (${src.vendors.length} of ${totalV} Vendors)</h4>
            <a href="https://www.wowhead.com/forever/item=${src.id}#sold-by" target="_blank" rel="noopener" class="reagent-sec-wowhead-link">
              All ${totalV} vendors on Wowhead ↗
            </a>
          </div>
          <div class="reagent-source-grid">
            ${src.vendors.map(v => {
              const zoneStr = (v.zones && v.zones.length) ? v.zones.join(', ') : 'Camp / Major Cities';
              const fClass = (v.faction || 'Neutral').toLowerCase();
              return `
                <div class="reagent-source-card">
                  <div class="reagent-source-card-left">
                    <span class="reagent-vendor-faction-badge ${fClass}">${escapeHtml(v.faction || 'Neutral')}</span>
                    <div>
                      <div class="reagent-source-name">
                        ${escapeHtml(v.name)}
                        ${v.tag ? `<small style="color:#94a3b8; font-weight:500;">&lt;${escapeHtml(v.tag)}&gt;</small>` : ''}
                        ${v.isNew ? '<span class="recipe-new-tag">New</span>' : ''}
                      </div>
                      <div class="reagent-source-sub">
                        📍 ${escapeHtml(zoneStr)}
                        ${v.cost ? ` · <strong style="color:#facc15;">${escapeHtml(v.cost)}</strong>` : ''}
                        · ${v.stock ? `<span style="color:#fb923c;">Limited (${v.stock})</span>` : '<span style="color:#4ade80;">Unlimited</span>'}
                      </div>
                    </div>
                  </div>
                  <a href="https://www.wowhead.com/forever/npc=${v.id}" target="_blank" rel="noopener" class="reagent-npc-map-btn">
                    Map ↗
                  </a>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      ` : '';

      // Mined / Gathered Nodes Section
      const validMined = (src.minedFrom || []).filter(o => o.pct > 0);
      const validGathered = (src.gatheredFrom || []).filter(o => o.pct > 0);
      const nodesList = validMined.concat(validGathered);
      const nodesSectionHtml = (nodesList.length > 0) ? `
        <div class="reagent-source-section">
          <div class="reagent-source-sec-head">
            <h4 class="reagent-source-sec-title"><span>${validMined.length ? '⛏️' : '🌿'}</span> Harvested From World Nodes (${nodesList.length})</h4>
            <a href="https://www.wowhead.com/forever/item=${src.id}#${validMined.length ? 'mined-from-object' : 'gathered-from-object'}" target="_blank" rel="noopener" class="reagent-sec-wowhead-link">
              Node spawn maps on Wowhead ↗
            </a>
          </div>
          <div class="reagent-source-grid">
            ${nodesList.map(o => {
              const zoneStr = (o.zones && o.zones.length) ? o.zones.join(', ') : (src.herbNode?.zones || src.miningNode?.zones || 'Azeroth');
              const pctVal = o.pct !== null && o.pct !== undefined && o.pct > 0 ? `${o.pct}%` : '100%';
              return `
                <div class="reagent-source-card">
                  <div class="reagent-source-card-left">
                    <span class="reagent-drop-pct-badge high">${pctVal}</span>
                    <div>
                      <div class="reagent-source-name">${escapeHtml(o.name)}</div>
                      <div class="reagent-source-sub">📍 ${escapeHtml(zoneStr)}</div>
                    </div>
                  </div>
                  <a href="https://www.wowhead.com/forever/object=${o.id}" target="_blank" rel="noopener" class="reagent-npc-map-btn">
                    Map ↗
                  </a>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      ` : '';

      // Beasts to Skin Section
      const skinningSectionHtml = (src.skinnedFrom && src.skinnedFrom.length > 0) ? `
        <div class="reagent-source-section">
          <div class="reagent-source-sec-head">
            <h4 class="reagent-source-sec-title"><span>🔪</span> Best Beasts to Skin (${src.skinnedFrom.length})</h4>
            <a href="https://www.wowhead.com/forever/item=${src.id}#skinned-from" target="_blank" rel="noopener" class="reagent-sec-wowhead-link">
              All skinnable beasts on Wowhead ↗
            </a>
          </div>
          <div class="reagent-source-grid">
            ${src.skinnedFrom.map(s => {
              const lvlStr = s.minLevel ? (s.maxLevel && s.maxLevel !== s.minLevel ? `Lvl ${s.minLevel}–${s.maxLevel}` : `Lvl ${s.minLevel}`) : '';
              const zoneStr = (s.zones && s.zones.length) ? s.zones.join(', ') : 'Azeroth';
              const pctVal = s.pct !== null && s.pct !== undefined ? `${s.pct}%` : 'Skin';
              return `
                <div class="reagent-source-card">
                  <div class="reagent-source-card-left">
                    <span class="reagent-drop-pct-badge high">${pctVal}</span>
                    <div>
                      <div class="reagent-source-name">${escapeHtml(s.name)}</div>
                      <div class="reagent-source-sub">${lvlStr ? `${lvlStr} · ` : ''}📍 ${escapeHtml(zoneStr)}</div>
                    </div>
                  </div>
                  <a href="https://www.wowhead.com/forever/npc=${s.id}" target="_blank" rel="noopener" class="reagent-npc-map-btn">
                    Map ↗
                  </a>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      ` : '';

      // Crafted By Section
      const craftedSectionHtml = (src.craftedBy && src.craftedBy.length > 0) ? `
        <div class="reagent-source-section">
          <h4 class="reagent-source-sec-title"><span>🔨</span> Crafted By Profession (${src.craftedBy.length})</h4>
          <div class="reagent-source-grid">
            ${src.craftedBy.map(c => `
              <div class="reagent-source-card">
                <div class="reagent-source-card-left">
                  <img src="${getIconUrl(c.profIcon)}" alt="${escapeHtml(c.profName)}" class="reagent-source-mini-icon" />
                  <div>
                    <div class="reagent-source-name">${escapeHtml(c.recipeName)}</div>
                    <div class="reagent-source-sub">${escapeHtml(c.profName)} · <span class="reagent-row-skill">Skill ${c.learn}</span> · ${escapeHtml(c.source)}</div>
                  </div>
                </div>
                <button type="button" class="reagent-jump-btn" data-slug="${c.profSlug}" data-recipe-id="${c.recipeId || ''}" data-recipe-name="${escapeHtml(c.recipeName)}">
                  Craft in ${escapeHtml(c.profName)} ›
                </button>
              </div>
            `).join('')}
          </div>
        </div>
      ` : '';

      // Contained In Clams / Objects Section
      const containedSectionHtml = (src.containedIn && src.containedIn.length > 0) ? `
        <div class="reagent-source-section">
          <h4 class="reagent-source-sec-title"><span>🐚</span> Contained Inside Clams & Objects (${src.containedIn.length})</h4>
          <div class="reagent-source-grid">
            ${src.containedIn.map(c => `
              <div class="reagent-source-card">
                <div class="reagent-source-card-left">
                  <span class="reagent-drop-pct-badge high">${c.pct ? c.pct + '%' : 'Loot'}</span>
                  <div>
                    <div class="reagent-source-name">${escapeHtml(c.name)}</div>
                    <div class="reagent-source-sub">Open in inventory or world container</div>
                  </div>
                </div>
                <a href="https://www.wowhead.com/forever/item=${c.id}" target="_blank" rel="noopener" class="reagent-npc-map-btn">
                  Item ↗
                </a>
              </div>
            `).join('')}
          </div>
        </div>
      ` : '';

      // Disenchanting Section
      const disenchantSectionHtml = (src.disenchant) ? `
        <div class="reagent-source-section">
          <div class="reagent-source-sec-head">
            <h4 class="reagent-source-sec-title"><span>✨</span> Disenchanted From Gear (iLvl ${src.disenchant.minIlvl}–${src.disenchant.maxIlvl})</h4>
            <a href="https://www.wowhead.com/forever/item=${src.id}#disenchanted-from" target="_blank" rel="noopener" class="reagent-sec-wowhead-link">
              View ${src.disenchant.count}+ items on Wowhead ↗
            </a>
          </div>
          <div class="reagent-source-grid">
            ${(src.disenchant.sampleItems || []).map(it => `
              <div class="reagent-source-card">
                <div class="reagent-source-card-left">
                  <span class="reagent-drop-pct-badge med">iLvl ${it.ilvl || '?'}</span>
                  <div>
                    <div class="reagent-source-name q${it.quality || 2}">${escapeHtml(it.name)}</div>
                    <div class="reagent-source-sub">Disenchant Uncommon/Rare gear or use Camp Arcane Salvager</div>
                  </div>
                </div>
                <a href="https://www.wowhead.com/forever/item=${it.id}" target="_blank" rel="noopener" class="reagent-npc-map-btn">
                  Item ↗
                </a>
              </div>
            `).join('')}
          </div>
        </div>
      ` : '';

      // 1. Dedicated single-view modes (strictly separates fishing from mobs, etc.)
      if (viewMode === 'fishing') {
        return `<div class="reagent-acquisition-body">${summaryBoxHtml}${fishingSectionHtml || '<div class="reagent-lookup-empty">No fishing waters recorded for this item.</div>'}</div>`;
      }
      if (viewMode === 'drops') {
        return `<div class="reagent-acquisition-body">${summaryBoxHtml}${dropsSectionHtml || '<div class="reagent-lookup-empty">No mob drops recorded for this item.</div>'}</div>`;
      }
      if (viewMode === 'vendors') {
        return `<div class="reagent-acquisition-body">${summaryBoxHtml}${vendorsSectionHtml || '<div class="reagent-lookup-empty">No vendors recorded for this item.</div>'}</div>`;
      }
      if (viewMode === 'nodes') {
        return `<div class="reagent-acquisition-body">${summaryBoxHtml}${nodesSectionHtml || '<div class="reagent-lookup-empty">No world nodes recorded for this item.</div>'}</div>`;
      }
      if (viewMode === 'skinning') {
        return `<div class="reagent-acquisition-body">${summaryBoxHtml}${skinningSectionHtml || '<div class="reagent-lookup-empty">No skinnable beasts recorded for this item.</div>'}</div>`;
      }

      // 2. Multi-source views ("all" / "sources"): Dynamically prioritize sections based on primaryType
      const orderedSections = [summaryBoxHtml];
      if (src.primaryType === 'fished' || (src.fishedIn && src.fishedIn.length > 0 && !src.herbNode && !src.miningNode)) {
        // Fishing is strictly #1 at the top!
        if (fishingSectionHtml) orderedSections.push(fishingSectionHtml);
        if (vendorsSectionHtml) orderedSections.push(vendorsSectionHtml);
        if (containedSectionHtml) orderedSections.push(containedSectionHtml);
        if (dropsSectionHtml) orderedSections.push(dropsSectionHtml);
        if (craftedSectionHtml) orderedSections.push(craftedSectionHtml);
        if (nodesSectionHtml) orderedSections.push(nodesSectionHtml);
        if (skinningSectionHtml) orderedSections.push(skinningSectionHtml);
        if (disenchantSectionHtml) orderedSections.push(disenchantSectionHtml);
      } else if (src.primaryType === 'herb' || src.primaryType === 'ore') {
        if (nodesSectionHtml) orderedSections.push(nodesSectionHtml);
        if (vendorsSectionHtml) orderedSections.push(vendorsSectionHtml);
        if (dropsSectionHtml) orderedSections.push(dropsSectionHtml);
        if (craftedSectionHtml) orderedSections.push(craftedSectionHtml);
        if (fishingSectionHtml) orderedSections.push(fishingSectionHtml);
        if (skinningSectionHtml) orderedSections.push(skinningSectionHtml);
        if (disenchantSectionHtml) orderedSections.push(disenchantSectionHtml);
      } else if (src.primaryType === 'skinned') {
        if (skinningSectionHtml) orderedSections.push(skinningSectionHtml);
        if (dropsSectionHtml) orderedSections.push(dropsSectionHtml);
        if (vendorsSectionHtml) orderedSections.push(vendorsSectionHtml);
        if (containedSectionHtml) orderedSections.push(containedSectionHtml);
        if (disenchantSectionHtml) orderedSections.push(disenchantSectionHtml);
      } else if (src.primaryType === 'vendor') {
        if (vendorsSectionHtml) orderedSections.push(vendorsSectionHtml);
        if (dropsSectionHtml) orderedSections.push(dropsSectionHtml);
        if (containedSectionHtml) orderedSections.push(containedSectionHtml);
        if (craftedSectionHtml) orderedSections.push(craftedSectionHtml);
        if (disenchantSectionHtml) orderedSections.push(disenchantSectionHtml);
      } else {
        // Default mob_drop / crafted
        if (craftedSectionHtml) orderedSections.push(craftedSectionHtml);
        if (dropsSectionHtml) orderedSections.push(dropsSectionHtml);
        if (fishingSectionHtml) orderedSections.push(fishingSectionHtml);
        if (skinningSectionHtml) orderedSections.push(skinningSectionHtml);
        if (nodesSectionHtml) orderedSections.push(nodesSectionHtml);
        if (vendorsSectionHtml) orderedSections.push(vendorsSectionHtml);
        if (containedSectionHtml) orderedSections.push(containedSectionHtml);
        if (disenchantSectionHtml) orderedSections.push(disenchantSectionHtml);
      }

      return `<div class="reagent-acquisition-body">${orderedSections.join('')}</div>`;
    }

    function renderModalContent() {
      const filteredMatches = activeFilter === 'all' 
        ? matches 
        : matches.filter(m => m.profSlug === activeFilter);

      const wowheadHref = sourceData?.wowheadUrl || (resolvedId ? `https://www.wowhead.com/forever/item=${resolvedId}` : `https://www.wowhead.com/forever/search?q=${encodeURIComponent(cleanName)}`);

      // View Switcher Tabs Bar
      const viewTabs = [];
      if (hasFishing) {
        viewTabs.push(`
          <button type="button" class="reagent-view-tab-btn ${activeModalView === 'fishing' ? 'active' : ''}" data-view="fishing">
            <span>🎣</span> Where to Fish (${sourceData.fishedIn.length})
          </button>
        `);
      }
      if (hasDrops) {
        const dropCount = sourceData.totalDropMobs || sourceData.drops.length;
        viewTabs.push(`
          <button type="button" class="reagent-view-tab-btn ${activeModalView === 'drops' ? 'active' : ''}" data-view="drops">
            <span>⚔️</span> Mob Drops (${dropCount})
          </button>
        `);
      }
      if (hasVendors) {
        const vCount = sourceData.totalVendors || sourceData.vendors.length;
        viewTabs.push(`
          <button type="button" class="reagent-view-tab-btn ${activeModalView === 'vendors' ? 'active' : ''}" data-view="vendors">
            <span>🪙</span> Vendors (${vCount})
          </button>
        `);
      }
      if (hasNodes) {
        const isMine = sourceData.primaryType === 'ore';
        viewTabs.push(`
          <button type="button" class="reagent-view-tab-btn ${activeModalView === 'nodes' ? 'active' : ''}" data-view="nodes">
            <span>${isMine ? '⛏️' : '🌿'}</span> ${isMine ? 'Mining Veins' : 'Herb Nodes'}
          </button>
        `);
      }
      if (hasSkinning) {
        viewTabs.push(`
          <button type="button" class="reagent-view-tab-btn ${activeModalView === 'skinning' ? 'active' : ''}" data-view="skinning">
            <span>🔪</span> Beast Skinning (${sourceData.skinnedFrom.length})
          </button>
        `);
      }
      if (matches.length > 0) {
        viewTabs.push(`
          <button type="button" class="reagent-view-tab-btn ${activeModalView === 'recipes' ? 'active' : ''}" data-view="recipes">
            <span>📜</span> Used in Recipes (${matches.length})
          </button>
        `);
      }
      const numSources = (hasFishing ? 1 : 0) + (hasDrops ? 1 : 0) + (hasVendors ? 1 : 0) + (hasNodes ? 1 : 0) + (hasSkinning ? 1 : 0);
      if (numSources > 1) {
        viewTabs.push(`
          <button type="button" class="reagent-view-tab-btn ${activeModalView === 'all' || activeModalView === 'sources' ? 'active' : ''}" data-view="all">
            <span>📋</span> All Sources
          </button>
        `);
      }

      modal.innerHTML = `
        <div class="reagent-lookup-dialog">
          <div class="reagent-lookup-head">
            <div class="reagent-lookup-title-box">
              <img src="${iconUrl}" alt="${escapeHtml(cleanName)}" class="reagent-lookup-img q${matQuality}" />
              <div>
                <h3 class="q${matQuality}">
                  ${escapeHtml(cleanName)}
                  ${sourceData?.isForeverNew ? '<span class="recipe-new-tag" style="vertical-align:middle; margin-left:0.35rem;">New</span>' : ''}
                </h3>
                <p>Required in <strong>${matches.length}</strong> recipe${matches.length === 1 ? '' : 's'} across <strong>${profNames.length || 1}</strong> trade${profNames.length === 1 ? '' : 's'}</p>
              </div>
            </div>

            <div class="reagent-lookup-head-actions">
              <a href="${wowheadHref}" target="_blank" rel="noopener" class="reagent-head-wowhead-btn" title="Open ${escapeHtml(cleanName)} on Wowhead Forever Database">
                <span>🌐</span> Wowhead ↗
              </a>
              <button type="button" class="reagent-lookup-close" id="reagent-lookup-close-btn" aria-label="Close dialog">✕</button>
            </div>
          </div>

          <!-- Multi-Source View Switcher Bar -->
          <div class="reagent-modal-view-tabs">
            ${viewTabs.join('')}
          </div>

          ${activeModalView === 'recipes' ? `
            ${profNames.length > 1 ? `
              <div class="reagent-lookup-chips">
                <button type="button" class="reagent-filter-chip ${activeFilter === 'all' ? 'active' : ''}" data-prof="all">
                  All Trades (${matches.length})
                </button>
                ${Object.entries(profCounts).map(([name, count]) => {
                  const slug = Object.keys(data).find(k => data[k].name === name);
                  return `
                    <button type="button" class="reagent-filter-chip ${activeFilter === slug ? 'active' : ''}" data-prof="${slug}">
                      ${escapeHtml(name)} (${count})
                    </button>
                  `;
                }).join('')}
              </div>
            ` : ''}

            <div class="reagent-lookup-list">
              ${filteredMatches.length === 0 ? `
                <div class="reagent-lookup-empty">No recipes found using this component.</div>
              ` : filteredMatches.map(m => {
                const r = m.recipe;
                const qClass = `q${r.quality || 1}`;
                return `
                  <div class="reagent-lookup-row">
                    <div class="reagent-lookup-row-main">
                      <img src="${getIconUrl(r.icon, r.name, r.source)}" alt="${escapeHtml(r.name)}" class="reagent-row-icon ${qClass}" />
                      <div>
                        <div class="reagent-row-name ${qClass}">${escapeHtml(r.name)}</div>
                        <div class="reagent-row-meta">
                          <span class="reagent-row-prof">
                            <img src="${getIconUrl(m.profIcon)}" alt="${escapeHtml(m.profName)}" />
                            ${escapeHtml(m.profName)}
                          </span>
                          <span class="reagent-row-skill">Skill ${r.learn}</span>
                          <span class="reagent-row-qty">Requires: <strong>${m.neededCount}x</strong></span>
                        </div>
                      </div>
                    </div>
                    <button type="button" class="reagent-jump-btn" data-slug="${m.profSlug}" data-recipe-id="${r.id || ''}" data-recipe-name="${escapeHtml(r.name)}">
                      View in ${escapeHtml(m.profName)} ›
                    </button>
                  </div>
                `;
              }).join('')}
            </div>
          ` : `
            <div class="reagent-lookup-list reagent-sources-scroll">
              ${renderAcquisitionView(sourceData, activeModalView)}
            </div>
          `}
        </div>
      `;

      const closeBtn = modal.querySelector('#reagent-lookup-close-btn');
      if (closeBtn) closeBtn.addEventListener('click', closeReagentModal);

      modal.querySelectorAll('.reagent-view-tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          activeModalView = btn.getAttribute('data-view');
          renderModalContent();
        });
      });

      modal.querySelectorAll('.reagent-filter-chip').forEach(btn => {
        btn.addEventListener('click', () => {
          activeFilter = btn.getAttribute('data-prof');
          renderModalContent();
        });
      });

      modal.querySelectorAll('.reagent-jump-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const targetSlug = btn.getAttribute('data-slug');
          const targetName = btn.getAttribute('data-recipe-name');
          const targetId = btn.getAttribute('data-recipe-id');
          closeReagentModal();
          if (window.WOW_PROFESSIONS && window.WOW_PROFESSIONS.selectProfession) {
            window.WOW_PROFESSIONS.selectProfession(targetSlug, 'recipes', targetName, targetId);
          }
        });
      });

      modal.querySelectorAll('.reagent-internal-jump-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const targetSlug = btn.getAttribute('data-jump-prof');
          const targetSub = btn.getAttribute('data-jump-subtab');
          closeReagentModal();
          if (window.WOW_PROFESSIONS && window.WOW_PROFESSIONS.selectProfession) {
            window.WOW_PROFESSIONS.selectProfession(targetSlug, targetSub);
          }
        });
      });
    }

    renderModalContent();
    modal.classList.add('is-open');
    modal.removeAttribute('hidden');
  }

  // Dismiss tooltips when tapping outside on touch devices
  if (typeof document !== 'undefined') {
    document.addEventListener('pointerdown', (e) => {
      const tt = document.getElementById('wow-item-tooltip');
      if (tt && !e.target.closest('.reagent-chip, .recipe-item-icon, .recipe-title, .favor-recipe-card, .camp-tooltip-item, .step-recipe-name, .shopping-row-card')) {
        hideItemTooltip();
      }
    });
  }

  // Export module globally
  window.initProfessionsHub = initProfessionsHub;
  window.WOW_PROFESSIONS = {
    openReagentModal: openReverseReagentLookup,
    selectProfession: (slug, subtab, query, targetId) => {
      currentProfession = slug || 'overview';
      if (subtab) currentSubTab = subtab;
      if (query !== undefined && query !== null) searchQuery = query;
      const navBtn = document.querySelector('.nav-tab-btn[data-tab="professions"]');
      if (navBtn) navBtn.click();
      const grid = document.getElementById('prof-selector-buttons');
      if (grid) {
        grid.querySelectorAll('.prof-tile-btn').forEach(b => {
          b.classList.toggle('active', b.getAttribute('data-slug') === currentProfession);
        });
      }
      renderActiveProfession();
      if (history.replaceState) {
        history.replaceState(null, '', `#professions/${currentProfession}${currentSubTab ? '/' + currentSubTab : ''}`);
      }
      if (targetId) {
        setTimeout(() => {
          const el = document.getElementById(targetId) || document.getElementById(`recipe-${targetId}`);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'center' });
            el.classList.add('recipe-card-highlight');
            setTimeout(() => el.classList.remove('recipe-card-highlight'), 2500);
          }
        }, 150);
      }
    }
  };

})();

