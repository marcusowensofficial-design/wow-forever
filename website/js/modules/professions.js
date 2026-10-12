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

  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
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
      tabs.push({ id: 'leveling', icon: '📈', label: 'Leveling Route' });
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

    const campBuffHtml = prof.campBuff ? `
      <div class="prof-camp-buff-pill">
        <img src="${getIconUrl(prof.campBuff.icon)}" alt="${escapeHtml(prof.campBuff.name)}" />
        <div class="prof-camp-buff-text">
          <strong>${escapeHtml(prof.campBuff.name)} (Campfire Skill ${prof.campBuff.skill}+):</strong> ${escapeHtml(prof.campBuff.effect)}
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
            ${campBuffHtml}
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

                  ${p.campBuff ? `
                    <div class="prof-dir-camp-box" style="margin-top: 0.85rem;">
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
                <th style="width: 200px;">Profession</th>
                <th>Skill 20 Station (Party Buff)</th>
                <th>Skill 140 Station</th>
                <th>Skill 300 Master Station</th>
              </tr>
            </thead>
            <tbody>
              ${matrixRows.map(r => `
                <tr>
                  <td>
                    <div class="matrix-prof-col" data-slug="${r.slug}" title="View ${r.name}">
                      <img src="${getIconUrl(r.icon)}" alt="${r.name}" loading="lazy" />
                      <span>${r.name}</span>
                    </div>
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
              `).join('')}
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

    container.innerHTML = `
      <div class="leveling-header-block">
        <div class="leveling-header-title">
          <h3>
            ${escapeHtml(leveling.title || 'LEVELING FROM 1 TO 300')}
            <span class="beta-cap-tag">${escapeHtml(leveling.capNote || "225 is the beta's cap for now")}</span>
          </h3>
          <p>${escapeHtml(leveling.desc || "At each point, you get the cheapest recipe to skill up, whether you learn it from the trainer or buy it from a vendor. Counts are averages, so buy a few more. There are no prices until launch, so each reagent counts for what a vendor pays you for it.")}</p>
        </div>
      </div>

      <div class="leveling-roadmap-list">
        ${steps.map(item => {
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
            return `
              <div class="leveling-step-row">
                <div class="step-range-col">
                  <span class="step-range-text">${rangeStr}</span>
                  <div class="step-progress-track">
                    <span class="step-progress-fill" style="left: ${leftPercent}; width: ${widthPercent};"></span>
                    <span class="step-progress-cap-marker" style="left: 74.67%;" title="Beta Cap at 225"></span>
                  </div>
                </div>
                <div class="step-info-col">
                  <div class="step-recipe-name" data-item-id="${item.itemId || ''}" data-recipe-name="${escapeHtml(item.recipeName)}">
                    ${escapeHtml(item.recipeName)}
                  </div>
                  <div class="step-source-line">${escapeHtml(item.source)}</div>
                  ${item.advice ? `<div class="step-advice-note">💡 ${escapeHtml(item.advice)}</div>` : ''}
                </div>
                <div class="step-crafts-col">
                  <div class="step-crafts-count">~${item.crafts}</div>
                  <div class="step-crafts-label">crafts</div>
                </div>
                <div class="step-reagents-col">
                  ${(item.reagents || []).map(mat => `
                    <div class="step-reagent-badge" data-item-id="${mat.itemId}" data-item-name="${escapeHtml(mat.name)}" title="${mat.count > 1 ? mat.count + ' ' : ''}${escapeHtml(mat.name)}">
                      <img src="${getIconUrl(mat.icon)}" alt="${escapeHtml(mat.name)}" class="step-reagent-img q${mat.quality || 1}" loading="lazy" />
                      ${mat.count > 1 ? `<span class="step-reagent-qty">${mat.count}</span>` : ''}
                    </div>
                  `).join('')}
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
              <div class="leveling-step-row">
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
                <div class="step-reagents-col" style="grid-column: 3 / -1;">
                  ${(item.icons || []).map(ic => `
                    <div class="step-reagent-badge" title="${escapeHtml(ic.name)}" data-item-name="${escapeHtml(ic.name)}">
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
    let acquiredItems = [];
    try {
      acquiredItems = JSON.parse(localStorage.getItem(storageKey) || '[]');
      if (!Array.isArray(acquiredItems)) acquiredItems = [];
    } catch (e) {
      acquiredItems = [];
    }

    const allItems = groups.flatMap(g => g.items || []);
    const totalItems = allItems.length;
    const initialAcquired = allItems.filter(it => acquiredItems.includes(it.name)).length;
    const initialPct = totalItems > 0 ? Math.round((initialAcquired / totalItems) * 100) : 0;

    container.innerHTML = `
      <div class="leveling-header-block">
        <div class="leveling-header-title">
          <h3>${escapeHtml(shopping.title || 'SHOPPING LIST, 1 TO 225')}</h3>
          <p>${escapeHtml(shopping.subtitle || 'Trade goods, looted supplies, and crafted components needed to level.')}</p>
        </div>
        <div style="display: flex; gap: 0.5rem; align-items: center; flex-wrap: wrap;">
          <button type="button" class="shopping-copy-btn" id="shopping-copy-btn" aria-label="Copy shopping list to clipboard">
            <span class="copy-icon">📋</span> Copy Shopping List
          </button>
          <button type="button" class="shopping-copy-btn shopping-reset-btn" id="shopping-reset-btn" aria-label="Reset acquired materials checklist" title="Reset all checked items">
            <span>↺</span> Reset Checklist
          </button>
        </div>
      </div>

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
        ${groups.map((g, idx) => `
          ${idx === 3 || (g.title && g.title.toLowerCase().includes('after the beta')) ? `
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
                const isAcquired = acquiredItems.includes(it.name);
                return `
                  <div class="shopping-row-card ${isAcquired ? 'is-acquired' : ''}" data-item-id="${it.itemId}" data-item-name="${escapeHtml(it.name)}">
                    <input type="checkbox" class="shopping-item-check" ${isAcquired ? 'checked' : ''} aria-label="Mark ${escapeHtml(it.name)} as acquired" />
                    <div class="shopping-row-left">
                      <img src="${getIconUrl(it.icon)}" alt="${escapeHtml(it.name)}" class="shopping-icon q${it.quality || 1}" loading="lazy" />
                      <span class="shopping-name q${it.quality || 1}">${escapeHtml(it.name)}</span>
                    </div>
                    <b class="shopping-count">${it.count}</b>
                  </div>
                `;
              }).join('')}
            </div>
          </div>
        `).join('')}
      </div>
    `;

    function updateShoppingProgress() {
      const curAcquired = allItems.filter(it => acquiredItems.includes(it.name)).length;
      const curPct = totalItems > 0 ? Math.round((curAcquired / totalItems) * 100) : 0;
      const countEl = container.querySelector('#shopping-progress-count');
      const pctEl = container.querySelector('#shopping-progress-pct');
      const fillEl = container.querySelector('#shopping-progress-fill');
      if (countEl) countEl.textContent = curAcquired;
      if (pctEl) pctEl.textContent = `${curPct}%`;
      if (fillEl) fillEl.style.width = `${curPct}%`;
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
        try { localStorage.setItem(storageKey, JSON.stringify(acquiredItems)); } catch (err) {}
        updateShoppingProgress();
      });
    });

    const resetBtn = container.querySelector('#shopping-reset-btn');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        if (!acquiredItems.length) return;
        acquiredItems = [];
        try { localStorage.removeItem(storageKey); } catch (err) {}
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
        let text = `=== ${prof.name} — ${shopping.title || 'Reagent Shopping List (1 to 225)'} ===\n\n`;
        groups.forEach(g => {
          text += `${g.title}${g.note ? ' (' + g.note + ')' : ''}:\n`;
          (g.items || []).forEach(it => {
            const mark = acquiredItems.includes(it.name) ? '[x]' : '[ ]';
            text += `  ${mark} ${it.count}x ${it.name}\n`;
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

    container.innerHTML = `
      <div class="leveling-header-block">
        <div class="leveling-header-title">
          <h3>CAMP, SKILL REWARDS AND PERKS</h3>
          <p>Account-wide Legacy perks, permanent title certifications, and wilderness camp station blueprints provided by ${escapeHtml(prof.name)}.</p>
        </div>
      </div>

      <div class="camp-perks-container">
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
                <button type="button" class="perk-plan-action" onclick="const b = document.querySelector('.nav-tab-btn[data-tab=\\'systems\\']'); if (b) b.click();" title="Open Legacy Tree Planner">Plan it ›</button>
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
            <button type="button" class="perk-plan-action" onclick="const b = document.querySelector('.nav-tab-btn[data-tab=\\'systems\\']'); if (b) b.click();" title="Open Legacy Tree Planner">Plan it ›</button>
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
      reagentsHtml = `
        <div style="margin-top: 0.5rem; border-top: 1px dashed rgba(255,255,255,0.1); padding-top: 0.4rem;">
          <div style="font-size: 0.72rem; color: #94a3b8; margin-bottom: 0.3rem;">Reagents Required:</div>
          <div style="display: flex; gap: 0.35rem; flex-wrap: wrap;">
            ${reagents.map(r => `
              <span style="display: inline-flex; align-items: center; gap: 0.25rem; background: rgba(0,0,0,0.4); padding: 0.15rem 0.35rem; border-radius: 3px; font-size: 0.72rem;">
                <img src="${getIconUrl(r.icon)}" width="16" height="16" style="border-radius: 2px;" />
                <span style="color: #fff; font-weight:700;">${r.count}x</span>
                <span class="q${r.quality || 1}">${escapeHtml(r.name)}</span>
              </span>
            `).join('')}
          </div>
        </div>
      `;
    }

    tooltip.innerHTML = `
      <div style="min-width: 220px; max-width: 330px; padding: 0.65rem 0.85rem; background: rgba(10, 14, 26, 0.96); border: 1px solid rgba(212, 175, 55, 0.5); border-radius: 6px; box-shadow: 0 8px 24px rgba(0,0,0,0.8); pointer-events: none;">
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

    // Recipes / steps
    container.querySelectorAll('.step-recipe-name').forEach(el => {
      const name = el.getAttribute('data-recipe-name') || el.textContent.trim();
      const cleanName = name.toLowerCase().replace(/^make (a|an) /i, '');
      const match = (prof.recipes || []).find(r => {
        if (!r.name) return false;
        const rn = r.name.toLowerCase();
        return rn === name.toLowerCase() || rn === cleanName || rn.includes(cleanName) || cleanName.includes(rn);
      });
      el.addEventListener('mouseenter', (e) => {
        showItemTooltip(e, name, match?.quality || 1, match?.effect || match?.source || '', match?.reagents || null);
      });
      el.addEventListener('mousemove', (e) => {
        const tt = document.getElementById('wow-item-tooltip');
        if (tt) positionTooltip(e, tt);
      });
      el.addEventListener('mouseleave', hideItemTooltip);
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

    // Reagent chips, badges & shopping rows - hover for tooltip, click for reverse lookup modal
    container.querySelectorAll('.reagent-chip, .step-reagent-badge, .shopping-row-card').forEach(el => {
      const name = el.getAttribute('data-item-name') || el.getAttribute('title') || '';
      if (!name) return;
      const triggerTooltip = (e) => {
        e.stopPropagation();
        showItemTooltip(e, name, 1, 'Crafting Reagent / Material', null, { 
          type: 'Crafting Component',
          use: 'Click to find all recipes across professions that use this material.'
        });
      };
      el.addEventListener('mouseenter', triggerTooltip);
      el.addEventListener('click', (e) => {
        if (e.target.classList.contains('shopping-item-check')) return;
        e.stopPropagation();
        hideItemTooltip();
        openReverseReagentLookup(name);
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
     REVERSE REAGENT SEARCH MODAL ENGINE
     ========================================================================== */
  function openReverseReagentLookup(rawName) {
    if (!rawName) return;
    const cleanName = rawName.replace(/^\d+x\s*/i, '').trim();
    const cleanLower = cleanName.toLowerCase();
    const data = window.WOW_PROFESSIONS_DATA || {};

    const matches = [];
    let matIcon = '';
    let matQuality = 1;

    Object.entries(data).forEach(([slug, p]) => {
      (p.recipes || []).forEach(r => {
        const mat = (r.reagents || []).find(m => {
          if (!m.name) return false;
          const mn = m.name.toLowerCase();
          return mn === cleanLower || mn.includes(cleanLower) || cleanLower.includes(mn);
        });
        if (mat) {
          if (!matIcon && mat.icon) matIcon = mat.icon;
          if (mat.quality) matQuality = mat.quality;
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

    let activeFilter = 'all';

    function renderModalContent() {
      const filteredMatches = activeFilter === 'all' 
        ? matches 
        : matches.filter(m => m.profSlug === activeFilter);

      modal.innerHTML = `
        <div class="reagent-lookup-dialog">
          <div class="reagent-lookup-head">
            <div class="reagent-lookup-title-box">
              <img src="${iconUrl}" alt="${escapeHtml(cleanName)}" class="reagent-lookup-img q${matQuality}" />
              <div>
                <h3 class="q${matQuality}">${escapeHtml(cleanName)}</h3>
                <p>Required in <strong>${matches.length}</strong> recipe${matches.length === 1 ? '' : 's'} across <strong>${profNames.length}</strong> trade${profNames.length === 1 ? '' : 's'}</p>
              </div>
            </div>
            <button type="button" class="reagent-lookup-close" id="reagent-lookup-close-btn" aria-label="Close dialog">✕</button>
          </div>

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
        </div>
      `;

      const closeBtn = modal.querySelector('#reagent-lookup-close-btn');
      if (closeBtn) closeBtn.addEventListener('click', closeReagentModal);

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

