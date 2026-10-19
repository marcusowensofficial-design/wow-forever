/**
 * World of Warcraft: Forever - Beta BiS Lists Module
 * Handles class and spec navigation, faction switching, interactive gear paper-doll,
 * slot-by-slot alternative rankings, live stat budget summaries, loadout export,
 * native in-house Talent Tree viewer modal, and Classic WoW floating item tooltips.
 */

(function () {
  "use strict";

  if (typeof window !== 'undefined') {
    if (typeof WOW_BIS_DATA !== 'undefined' && !window.WOW_BIS_DATA) {
      window.WOW_BIS_DATA = WOW_BIS_DATA;
    }
    if (typeof WOW_BIS_METADATA !== 'undefined' && !window.WOW_BIS_METADATA) {
      window.WOW_BIS_METADATA = WOW_BIS_METADATA;
    }
  }

  const escapeHtml = window.escapeHtml || (s => String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"));

let currentBiSState = {
  classId: "warrior",
  specId: "pve",
  faction: "alliance", // 'alliance' | 'horde'
  searchFilter: "",
  sourceFilter: "all", // 'all' | 'dalaran' | 'dungeon' | 'craft' | 'quest' | 'world'
  customEquipped: {}
};

function initBiSLists() {
  const container = document.getElementById("bis-container");
  if (!container) return;

  try {
    const savedCustom = localStorage.getItem('wow_forever_custom_bis');
    if (savedCustom) currentBiSState.customEquipped = JSON.parse(savedCustom);
    else currentBiSState.customEquipped = {};
  } catch {
    currentBiSState.customEquipped = {};
  }

  // Listen to hash changes if user navigated to #bis or #bis/class/spec
  handleBiSHashRouting();
  window.addEventListener("hashchange", handleBiSHashRouting);

  // Initialize tooltips once on container
  initItemTooltips();

  renderBiSApp();
}

function handleBiSHashRouting() {
  const hash = window.location.hash.toLowerCase();
  if (!hash.startsWith("#bis")) return;

  const parts = hash.split("/");
  if (parts[1] && WOW_BIS_DATA[parts[1]]) {
    currentBiSState.classId = parts[1];
    if (parts[2]) {
      const specExists = WOW_BIS_DATA[parts[1]].specs.some(s => s.id === parts[2]);
      if (specExists) {
        currentBiSState.specId = parts[2];
      } else {
        currentBiSState.specId = WOW_BIS_DATA[parts[1]].specs[0].id;
      }
    } else {
      currentBiSState.specId = WOW_BIS_DATA[parts[1]].specs[0].id;
    }
    renderBiSApp();
  }
}

function renderBiSApp() {
  const container = document.getElementById("bis-container");
  if (!container) return;

  const currentClass = WOW_BIS_DATA.classes.find(c => c.id === currentBiSState.classId) || WOW_BIS_DATA.classes[0];
  const classData = WOW_BIS_DATA[currentBiSState.classId];
  if (!classData || !classData.specs || classData.specs.length === 0) return;

  let currentSpec = classData.specs.find(s => s.id === currentBiSState.specId);
  if (!currentSpec) {
    currentSpec = classData.specs[0];
    currentBiSState.specId = currentSpec.id;
  }

  container.innerHTML = `
    <!-- Top Metadata Banner -->
    <div class="bis-meta-banner">
      <div class="bis-meta-left">
        <span class="bis-badge-beta">✨ BETA PHASE 2 • LEVEL 30 CAP</span>
        <span class="bis-badge-build">Build ${WOW_BIS_METADATA.version}</span>
        <span class="bis-meta-updated">Updated: ${WOW_BIS_METADATA.lastUpdated}</span>
      </div>
      <div class="bis-meta-right">
        <!-- Faction Toggle -->
        <div class="bis-faction-toggle" role="group" aria-label="Select Faction">
          <button type="button" class="bis-faction-btn ${currentBiSState.faction === 'alliance' ? 'active' : ''}" data-faction="alliance">
            <img src="images/icons/faction-alliance.jpg" class="faction-icon" alt="Alliance" onerror="this.src='https://render.worldofwarcraft.com/us/icons/56/achievement_pvp_a_a.jpg'" /> Alliance
          </button>
          <button type="button" class="bis-faction-btn ${currentBiSState.faction === 'horde' ? 'active' : ''}" data-faction="horde">
            <img src="images/icons/faction-horde.jpg" class="faction-icon" alt="Horde" onerror="this.src='https://render.worldofwarcraft.com/us/icons/56/achievement_pvp_h_h.jpg'" /> Horde
          </button>
        </div>
      </div>
    </div>

    <!-- Class Switcher Ribbon -->
    <nav class="bis-class-selector" aria-label="Choose Class">
      ${WOW_BIS_DATA.classes.map(c => `
        <button type="button" 
                class="bis-class-tab ${c.id === currentBiSState.classId ? 'active' : ''}" 
                data-class="${c.id}"
                style="--class-color: ${c.color}">
          <img src="${c.icon}" alt="${c.name}" class="bis-class-icon" loading="lazy" />
          <span class="bis-class-name">${c.name}</span>
        </button>
      `).join('')}
    </nav>

    <!-- Spec Selector Sub-Bar -->
    <div class="bis-spec-bar">
      <div class="bis-spec-pills">
        ${classData.specs.map(s => `
          <button type="button" 
                  class="bis-spec-pill ${s.id === currentBiSState.specId ? 'active' : ''}"
                  data-spec="${s.id}">
            <img src="${s.icon && s.icon.startsWith('http') ? s.icon : (s.icon ? 'https://render.worldofwarcraft.com/us/icons/56/' + s.icon.replace(/\.(jpg|png|webp)$/i, '') + '.jpg' : 'https://render.worldofwarcraft.com/us/icons/56/inv_misc_questionmark.jpg')}" alt="${s.name}" class="bis-spec-icon" loading="lazy" />
            <span class="bis-spec-title">${s.name}</span>
            <span class="bis-spec-role-tag">${s.role}</span>
          </button>
        `).join('')}
      </div>

      <div class="bis-quick-actions">
        <button type="button" class="bis-action-btn" id="btn-copy-bis-list">
          <span>📋</span> Copy Gear List
        </button>
        <button type="button" class="bis-action-btn" id="btn-export-bis-journal" title="Export /fj import command to star BiS drops in ForeverDungeonJournal">
          <span>📖</span> Export to Journal
        </button>
        <button type="button" class="bis-action-btn" id="btn-reset-custom-bis" title="Reset all custom equipped item overrides back to default BiS" onclick="resetCustomBiS()">
          <span>🔄</span> Reset Overrides
        </button>
        <button type="button" class="bis-action-btn" id="btn-share-bis-link">
          <span>🔗</span> Share Link
        </button>
      </div>
    </div>

    <!-- Gear Search and Drop Source Filter Toolbar -->
    <div class="bis-filter-bar">
      <div class="bis-search-box">
        <span class="bis-search-icon">🔍</span>
        <input type="text" id="bis-gear-filter-input" name="bis-gear-filter" aria-label="Filter gear by item name, boss, or dungeon" class="bis-gear-filter-input" 
               placeholder="Filter gear by item name, boss, or dungeon (e.g. Dalaran, RFK, Graveyard, Crafting)..." 
               value="${escapeHtml(currentBiSState.searchFilter || '')}" />
        <button type="button" id="bis-gear-filter-clear" class="bis-filter-clear-btn" ${currentBiSState.searchFilter ? '' : 'hidden'}>✕</button>
      </div>
      <div class="bis-source-chips">
        <button type="button" class="bis-source-chip ${currentBiSState.sourceFilter === 'all' ? 'active' : ''}" data-filter="all">All Sources</button>
        <button type="button" class="bis-source-chip ${currentBiSState.sourceFilter === 'dalaran' ? 'active' : ''}" data-filter="dalaran">🏰 Dalaran & ES4</button>
        <button type="button" class="bis-source-chip ${currentBiSState.sourceFilter === 'dungeon' ? 'active' : ''}" data-filter="dungeon">⚔️ Dungeon Bosses</button>
        <button type="button" class="bis-source-chip ${currentBiSState.sourceFilter === 'craft' ? 'active' : ''}" data-filter="craft">🔨 Crafting</button>
        <button type="button" class="bis-source-chip ${currentBiSState.sourceFilter === 'quest' ? 'active' : ''}" data-filter="quest">📜 Quests</button>
        <button type="button" class="bis-source-chip ${currentBiSState.sourceFilter === 'world' ? 'active' : ''}" data-filter="world">🌍 World Drops</button>
      </div>
    </div>

    <!-- Spec Guide Lede / Rationale -->
    ${currentSpec.description ? `
      <div class="bis-spec-lede">
        <strong>🧭 Spec Itemization Priority:</strong> ${escapeHtml(currentSpec.description)}
      </div>
    ` : ''}

    <!-- Main Spec Content Layout: Paper-Doll + Stat Budget & Talents -->
    <div class="bis-stage-layout">
      
      <!-- Left Column: Character Paper-Doll & Equipment Grid -->
      <div class="bis-paperdoll-panel">
        <div class="bis-panel-header">
          <div>
            <h3 class="bis-panel-title">
              <span style="color: ${currentClass.color};">${currentClass.name}</span>: ${currentSpec.name} Best in Slot
            </h3>
            <p class="bis-panel-subtitle">Equipped for Level 30 Beta Cap • Weapon Preference: ${currentSpec.weaponType || 'Standard'}</p>
          </div>
          <span class="bis-slot-count">${(currentSpec.slots && currentSpec.slots.length) || 16} Slots Ranked</span>
        </div>

        <!-- Visual Equipment Layout -->
        <div class="bis-doll-grid">
          <!-- Left Column Slots -->
          <div class="bis-doll-col bis-col-left">
            ${renderPaperDollSlot('head', 'Head', currentSpec)}
            ${renderPaperDollSlot('neck', 'Neck', currentSpec)}
            ${renderPaperDollSlot('shoulder', 'Shoulder', currentSpec)}
            ${renderPaperDollSlot('back', 'Back', currentSpec)}
            ${renderPaperDollSlot('chest', 'Chest', currentSpec)}
            ${renderPaperDollSlot('wrist', 'Wrist', currentSpec)}
          </div>

          <!-- Center Character Showcase / Silhouette -->
          <div class="bis-doll-center">
            <div class="bis-doll-silhouette" style="--class-color: ${currentClass.color};">
              <img src="${currentClass.icon}" alt="${currentClass.name}" class="bis-silhouette-icon" />
              <div class="bis-silhouette-text">
                <strong>Level 30 ${currentClass.name}</strong>
                <span>${currentBiSState.faction === 'alliance' ? 'Alliance (Human / Dwarf / NElf / Gnome)' : 'Horde (Orc / Undead / Tauren / Troll)'}</span>
              </div>
            </div>

            <!-- Weapons & Relic Row -->
            <div class="bis-weapons-row">
              ${renderPaperDollSlot('mainHand', 'Main Hand', currentSpec)}
              ${renderPaperDollSlot('offHand', 'Off Hand', currentSpec)}
              ${renderPaperDollSlot('ranged', 'Ranged / Relic', currentSpec)}
            </div>
          </div>

          <!-- Right Column Slots -->
          <div class="bis-doll-col bis-col-right">
            ${renderPaperDollSlot('hands', 'Hands', currentSpec)}
            ${renderPaperDollSlot('waist', 'Waist', currentSpec)}
            ${renderPaperDollSlot('legs', 'Legs', currentSpec)}
            ${renderPaperDollSlot('feet', 'Feet', currentSpec)}
            ${renderPaperDollSlot('finger1', 'Finger 1', currentSpec)}
            ${renderPaperDollSlot('finger2', 'Finger 2', currentSpec)}
            ${renderPaperDollSlot('trinket1', 'Trinket 1', currentSpec)}
            ${renderPaperDollSlot('trinket2', 'Trinket 2', currentSpec)}
          </div>
        </div>
      </div>

      <!-- Right Column: Live Stat Budget & Level 30 Talent Build -->
      <div class="bis-side-panel">
        
        <!-- Live Stat Budget Card -->
        <div class="bis-stats-card">
          <div class="bis-card-title-row">
            <h4><span>📊</span> Estimated Stat Budget</h4>
            <span class="bis-stat-faction-label">${currentBiSState.faction === 'alliance' ? '<img src="images/icons/faction-alliance.jpg" class="bis-mini-faction-icon" alt="" onerror="this.src=\'https://render.worldofwarcraft.com/us/icons/56/achievement_pvp_a_a.jpg\'" /> Alliance Base' : '<img src="images/icons/faction-horde.jpg" class="bis-mini-faction-icon" alt="" onerror="this.src=\'https://render.worldofwarcraft.com/us/icons/56/achievement_pvp_h_h.jpg\'" /> Horde Base'}</span>
          </div>
          <p class="bis-stat-disclaimer">Calculated with full BiS gear + recommended enchants at Level 30 without temporary world buffs.</p>
          
          <div class="bis-stats-grid">
            ${renderStatBudget(currentSpec.statSummary)}
          </div>
        </div>

        <!-- Talent Spec Card (Opens Native Interactive Talent Modal & External Calculator) -->
        <div class="bis-talents-card">
          <div class="bis-card-title-row">
            <h4><span>🌟</span> Recommended Talents (Lvl 30)</h4>
            <span class="bis-points-badge">${currentSpec.talents ? currentSpec.talents.points : '26 Points'}</span>
          </div>
          <p class="bis-talents-desc">
            ${currentSpec.talents ? currentSpec.talents.summary : 'Level 30 standard tree build.'}
          </p>
          <div class="bis-talents-meta">
            <span class="bis-perk-note">✨ Includes +5 points from the <em>Talented</em> Legacy Perk!</span>
            <div class="bis-talent-actions" style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
              <button type="button" class="bis-talent-btn" id="btn-view-talent-tree" title="View recommended Level 30 talent allocation">
                <span>🌟</span> View Recommended Build
              </button>
              <button type="button" class="bis-talent-btn bis-calc-blank-btn" id="btn-open-blank-calculator" title="Open empty talent trees to customize your own build from scratch">
                <span>⚡</span> Talent Calculator (Blank Slate)
              </button>
            </div>
          </div>
        </div>

        <!-- Beta Itemization Note Card -->
        <div class="bis-info-card">
          <h4><span>💡</span> WoW Forever Beta Itemization</h4>
          <p>
            In WoW Forever Build 1.60.1, level 30 characters gain access to newly re-itemized content from the 
            <strong>City of Dalaran (Level 26–32)</strong> and <strong>Excavation Site 4 (Level 27–34)</strong>, 
            along with classic favorites like <em>Razorfen Kraul</em>, <em>Gnomeregan</em>, and <em>SM Graveyard</em>.
          </p>
          <div class="bis-tip-item">
            <span>🛡️</span>
            <div><strong>Beta Build 1.60.1.70425:</strong> Full ranked listings with all drop sources and crafting recipes extracted directly.</div>
          </div>
        </div>

      </div>

    </div>

    <!-- Detailed Slot-by-Slot Alternatives Breakdown Table -->
    <div class="bis-alternatives-section">
      <div class="bis-alt-header">
        <div>
          <h3><span>🔍</span> Full Slot-by-Slot Breakdown & Alternatives</h3>
          <p>Every slot ranked with drop sources, alternative items, and materials.</p>
        </div>
      </div>

      <div class="bis-slots-accordion">
        ${renderSlotsAlternativesTable(currentSpec)}
      </div>
    </div>

    <!-- Recommended Enchants & Pre-Fight Consumables Prep Section -->
    <div class="bis-prep-section">
      <!-- Enchants Card -->
      <div class="bis-prep-card bis-enchants-card">
        <div class="bis-prep-header">
          <h4><span>✨</span> Recommended Enchants (Build 1.60.1.70425)</h4>
          <span class="bis-prep-badge">${currentSpec.enchants ? currentSpec.enchants.length : 0} Enchants</span>
        </div>
        <div class="bis-prep-list">
          ${renderEnchantsTable(currentSpec.enchants)}
        </div>
      </div>

      <!-- Pre-Fight Consumables Card -->
      <div class="bis-prep-card bis-consumables-card">
        <div class="bis-prep-header">
          <h4><span>🧪</span> Level 30 Pre-Fight Consumables & Buffs</h4>
          <span class="bis-prep-badge">${currentSpec.consumables ? currentSpec.consumables.length : 0} Consumables</span>
        </div>
        <div class="bis-prep-list">
          ${renderConsumablesTable(currentSpec.consumables)}
        </div>
      </div>
    </div>
  `;

  // Attach event handlers
  bindBiSEvents();

  // Apply active search/source filters
  applyActiveGearFilters();
}

let bisRecipesCache = null;

function getBiSRecipeCache() {
  if (bisRecipesCache) return bisRecipesCache;
  bisRecipesCache = { byId: new Map(), byName: new Map() };
  const profData = window.WOW_PROFESSIONS_DATA;
  if (!profData) return bisRecipesCache;

  for (const profKey of Object.keys(profData)) {
    const prof = profData[profKey];
    if (prof && Array.isArray(prof.recipes)) {
      for (const r of prof.recipes) {
        if (r.id) bisRecipesCache.byId.set(String(r.id), r);
        if (r.name) bisRecipesCache.byName.set(r.name.toLowerCase().trim(), r);
      }
    }
  }
  return bisRecipesCache;
}

function getReagentIconUrl(icon) {
  if (!icon) return 'https://wow.zamimg.com/images/wow/icons/medium/inv_misc_questionmark.jpg';
  if (icon.startsWith('http://') || icon.startsWith('https://')) return icon;
  const clean = icon.replace(/\.(jpg|png|webp)$/i, '');
  return `https://wow.zamimg.com/images/wow/icons/medium/${clean}.jpg`;
}

function getItemReagents(item) {
  if (!item) return null;
  if (item.reagents && Array.isArray(item.reagents) && item.reagents.length > 0) {
    return item.reagents;
  }
  const cache = getBiSRecipeCache();
  const id = item.itemId || item.tipId;
  let recipe = null;
  if (id) {
    recipe = cache.byId.get(String(id));
  }
  if (!recipe && item.tipId && String(item.tipId).length > 6) {
    recipe = cache.byId.get(String(item.tipId).slice(0, 6));
  }
  if (!recipe && item.name) {
    const cleanName = item.name.replace(/\s+of\s+the\s+.*$/i, '').toLowerCase().trim();
    recipe = cache.byName.get(cleanName) || cache.byName.get(item.name.toLowerCase().trim());
  }
  if (recipe && Array.isArray(recipe.reagents) && recipe.reagents.length > 0) {
    return recipe.reagents;
  }
  return null;
}

function renderItemMatsHtml(item, fallbackMats) {
  const reagents = getItemReagents(item);
  if (reagents && reagents.length > 0) {
    return `
      <div class="bis-mats-pill">
        <span class="bis-mats-label">🔨 Mats:</span>
        <span class="bis-mats-chips">
          ${reagents.map(r => `
            <span class="bis-mat-chip"
                  data-mat-name="${escapeHtml(r.name)}"
                  data-mat-count="${r.count}"
                  data-mat-icon="${escapeHtml(r.icon || '')}"
                  data-mat-quality="${r.quality || 1}"
                  title="${r.count}x ${escapeHtml(r.name)}">
              <span class="bis-mat-count">${r.count}</span>
              <img src="${getReagentIconUrl(r.icon)}" alt="${escapeHtml(r.name)}" class="bis-mat-icon q${r.quality || 1}" loading="lazy" />
            </span>
          `).join('')}
        </span>
      </div>
    `;
  }
  if (fallbackMats) {
    return `<div class="bis-mats-pill">🔨 Mats: ${escapeHtml(fallbackMats)}</div>`;
  }
  return '';
}

/**
 * Render individual paper-doll slot card
 */
function renderPaperDollSlot(slotKey, slotLabel, spec) {
  if (!spec) return '';

  const faction = currentBiSState.faction || 'alliance';
  let equipped = null;

  // 0. Check customEquipped overrides
  const customKey = `${currentBiSState.classId}_${currentBiSState.specId}_${slotKey}`;
  if (currentBiSState.customEquipped && currentBiSState.customEquipped[customKey]) {
    equipped = currentBiSState.customEquipped[customKey];
  } else if (slotKey === 'finger1' && currentBiSState.customEquipped && currentBiSState.customEquipped[`${currentBiSState.classId}_${currentBiSState.specId}_finger`]) {
    equipped = currentBiSState.customEquipped[`${currentBiSState.classId}_${currentBiSState.specId}_finger`];
  } else if (slotKey === 'trinket1' && currentBiSState.customEquipped && currentBiSState.customEquipped[`${currentBiSState.classId}_${currentBiSState.specId}_trinket`]) {
    equipped = currentBiSState.customEquipped[`${currentBiSState.classId}_${currentBiSState.specId}_trinket`];
  }

  // 1. Try finding in doll[faction]
  if (!equipped && spec.doll && spec.doll[faction]) {
    const doll = spec.doll[faction];
    if (slotKey === 'finger1') {
      equipped = doll.finger1 || doll.finger || spec.gear?.finger1;
    } else if (slotKey === 'finger2') {
      equipped = doll.finger2 || spec.gear?.finger2;
      if (!equipped) {
        const fSlot = spec.slots?.find(s => s.slotId === 'finger');
        if (fSlot && fSlot.items.length > 1) equipped = fSlot.items[1];
      }
    } else if (slotKey === 'trinket1') {
      equipped = doll.trinket1 || doll.trinket || spec.gear?.trinket1;
    } else if (slotKey === 'trinket2') {
      equipped = doll.trinket2 || spec.gear?.trinket2;
      if (!equipped) {
        const tSlot = spec.slots?.find(s => s.slotId === 'trinket');
        if (tSlot && tSlot.items.length > 1) equipped = tSlot.items[1];
      }
    } else if (slotKey === 'mainHand') {
      equipped = doll.mainHand || doll['two-hand'] || doll['one-hand'] || spec.gear?.twoHand || spec.gear?.mainHand;
    } else if (slotKey === 'offHand') {
      equipped = doll.offHand || spec.gear?.offHand;
    } else if (doll[slotKey] && doll[slotKey].name) {
      equipped = doll[slotKey];
    }
  }

  // 2. Fallback to gear
  if (!equipped && spec.gear) {
    if (slotKey === 'mainHand') equipped = spec.gear.twoHand || spec.gear.mainHand;
    else equipped = spec.gear[slotKey];
  }

  // 3. Fallback to top item in slots
  if (!equipped && spec.slots) {
    const matched = spec.slots.find(s => s.slotId === slotKey || s.slotName.toLowerCase() === slotLabel.toLowerCase());
    if (matched && matched.items.length > 0) {
      equipped = matched.items[0];
    }
  }

  if (!equipped || !equipped.name) {
    const isOffHandEmpty = slotKey === 'offHand';
    return `
      <div class="bis-slot-card empty" data-slot="${slotKey}">
        <span class="bis-slot-label">${slotLabel}</span>
        <div class="bis-slot-main">
          <div class="bis-slot-icon empty"></div>
          <div class="bis-slot-details">
            <span class="bis-item-name q1">${isOffHandEmpty ? 'Off Hand (2H Equipped)' : 'Empty / Optional'}</span>
          </div>
        </div>
      </div>
    `;
  }

  // Look up full item details from slots for complete tooltip & stats
  let fullItem = null;
  if (spec.slots) {
    for (const sl of spec.slots) {
      const found = sl.items.find(i => (equipped.tipId && i.tipId === equipped.tipId) || i.name === equipped.name);
      if (found) { fullItem = found; break; }
    }
  }

  const name = equipped.name;
  const quality = equipped.quality || (fullItem ? fullItem.quality : 'q2');
  const icon = equipped.icon || (fullItem ? fullItem.icon : 'inv_misc_questionmark.jpg');
  const iconUrl = icon.startsWith('http') ? icon : `https://render.worldofwarcraft.com/us/icons/56/${icon}`;
  const enchant = equipped.enchant || '';
  const stats = fullItem ? fullItem.stats : (equipped.stats || '');
  const source = fullItem ? fullItem.source : (equipped.source || '');
  const tipId = equipped.tipId || (fullItem ? fullItem.tipId : '');
  const itemId = equipped.itemId || (fullItem ? fullItem.itemId : '');
  const side = fullItem ? fullItem.side : (equipped.side || 'both');
  const mats = fullItem ? fullItem.mats : (equipped.mats || '');
  const reagents = getItemReagents(fullItem || equipped);
  const reagentsAttr = reagents ? escapeHtml(JSON.stringify(reagents)) : '';
  const matsHtml = renderItemMatsHtml(fullItem || equipped, mats);

  return `
    <div class="bis-slot-card"
         data-slot="${slotKey}"
         data-item-name="${escapeHtml(name)}"
         data-item-quality="${quality}"
         data-item-stats="${escapeHtml(stats)}"
         data-item-enchant="${escapeHtml(enchant)}"
         data-item-source="${escapeHtml(source)}"
         data-item-slot="${slotLabel}"
         data-item-tipid="${tipId}"
         data-item-id="${itemId}"
         data-item-side="${side}"
         data-item-mats="${escapeHtml(mats)}"
         data-item-reagents="${reagentsAttr}">
      <span class="bis-slot-label">${slotLabel}</span>
      <div class="bis-slot-main">
        <img src="${iconUrl}" alt="${escapeHtml(name)}" class="bis-slot-icon ${quality}" loading="lazy" />
        <div class="bis-slot-details">
          <span class="bis-item-name ${quality}">${escapeHtml(name)}</span>
          ${stats ? `<span class="bis-item-stats">${escapeHtml(stats)}</span>` : ''}
          ${enchant && enchant !== 'None' ? `<span class="bis-item-enchant">✨ ${escapeHtml(enchant)}</span>` : ''}
          ${source ? `<span class="bis-item-source">📍 ${escapeHtml(source)}</span>` : ''}
          ${matsHtml}
          ${side === 'alliance' ? `<span class="bis-side-pill alliance"><img src="images/icons/faction-alliance.jpg" class="bis-mini-faction-icon" alt="" onerror="this.src='https://render.worldofwarcraft.com/us/icons/56/achievement_pvp_a_a.jpg'" /> Alliance</span>` : ''}
          ${side === 'horde' ? `<span class="bis-side-pill horde"><img src="images/icons/faction-horde.jpg" class="bis-mini-faction-icon" alt="" onerror="this.src='https://render.worldofwarcraft.com/us/icons/56/achievement_pvp_h_h.jpg'" /> Horde</span>` : ''}
        </div>
      </div>
    </div>
  `;
}

/**
 * Render Stat Budget numbers
 */
function renderStatBudget(statSummary) {
  if (!statSummary) return '<p class="bis-no-stats">Stats pending simulation.</p>';

  const stats = currentBiSState.faction === 'alliance' 
    ? (statSummary.alliance || statSummary.horde || {}) 
    : (statSummary.horde || statSummary.alliance || {});

  const hitNum = parseFloat(stats.hit) || 0;
  const agiNum = parseFloat(stats.agi) || 0;
  const intNum = parseFloat(stats.int) || 0;
  const spiNum = parseFloat(stats.spi) || 0;

  // Level 30 Derived Ratings
  const hitCapStatus = hitNum >= 5 ? `${hitNum}% (Soft Cap Met)` : `${hitNum}% (5% Cap vs Lvl 32)`;
  const estCrit = stats.crit || (agiNum > 0 ? `${(4.5 + (agiNum / 20)).toFixed(1)}%` : (intNum > 0 ? `${(3.2 + (intNum / 59.5)).toFixed(1)}%` : null));
  const spiritTick = spiNum > 0 ? `${Math.round(15 + (spiNum / 5))} / 2s tick` : null;

  const statEntries = [
    { label: "Health (HP)", val: stats.hp, icon: "❤️" },
    { label: "Mana", val: stats.mana, icon: "💧" },
    { label: "Armor", val: stats.armor, icon: "🛡️" },
    { label: "Strength", val: stats.str, icon: "💪" },
    { label: "Agility", val: stats.agi, icon: "🏹" },
    { label: "Stamina", val: stats.sta, icon: "🩸" },
    { label: "Intellect", val: stats.int, icon: "🧠" },
    { label: "Spirit", val: stats.spi, icon: "✨" },
    { label: "Attack Power", val: stats.ap, icon: "⚔️" },
    { label: "Spell Power", val: stats.sp, icon: "🔥" },
    { label: "Hit Rating", val: hitCapStatus, icon: "🎯" },
    { label: "Crit Chance", val: estCrit, icon: "💥" },
    { label: "Spirit 5SR Regen", val: spiritTick, icon: "🧪" },
    { label: "Shadow Res", val: stats.shadowRes, icon: "🟣" },
    { label: "Nature Res", val: stats.natureRes, icon: "🌿" },
    { label: "Fire Res", val: stats.fireRes, icon: "🔥" },
    { label: "Frost Res", val: stats.frostRes, icon: "❄️" },
    { label: "Arcane Res", val: stats.arcaneRes, icon: "🔮" }
  ];

  const valid = statEntries.filter(s => s.val !== undefined && s.val !== null && s.val !== "");
  if (valid.length === 0) {
    return '<p class="bis-no-stats">Stats pending simulation.</p>';
  }

  return valid.map(s => `
    <div class="bis-stat-item">
      <span class="bis-stat-name"><span>${s.icon}</span> ${s.label}</span>
      <span class="bis-stat-value">${s.val}</span>
    </div>
  `).join('');
}

/**
 * Render Slots Alternatives Table with full rankings & drop details
 */
function renderSlotsAlternativesTable(spec) {
  if (!spec) return '';
  if (!spec.slots || spec.slots.length === 0) {
    return '<p class="bis-empty-text">No slot breakdowns available.</p>';
  }

  const faction = currentBiSState.faction || 'alliance';

  return spec.slots.map(slot => {
    const slotId = slot.slotId;
    const slotName = slot.slotName;
    const items = slot.items || [];
    if (items.length === 0) return '';

    // Find the #1 BiS item for this faction
    const factionItems = items.filter(i => i.side === 'both' || i.side === faction);
    const topItem = factionItems.length > 0 ? factionItems[0] : items[0];

    return `
      <div class="bis-slot-alt-group" data-slot-key="${slotId}">
        <div class="bis-alt-slot-heading">
          <div style="display: flex; align-items: center; gap: 0.6rem;">
            <span class="bis-alt-slot-tag">${escapeHtml(slotName)}</span>
            <span class="bis-slot-items-count">${items.length} Options</span>
          </div>
          <span class="bis-alt-bis-summary">
            Top ${faction === 'alliance' ? '<img src="images/icons/faction-alliance.jpg" class="bis-mini-faction-icon" alt="" onerror="this.src=\'https://render.worldofwarcraft.com/us/icons/56/achievement_pvp_a_a.jpg\'" /> Alliance' : '<img src="images/icons/faction-horde.jpg" class="bis-mini-faction-icon" alt="" onerror="this.src=\'https://render.worldofwarcraft.com/us/icons/56/achievement_pvp_h_h.jpg\'" /> Horde'} BiS: 
            <strong class="${topItem.quality || 'q2'}">${escapeHtml(topItem.name)}</strong>
          </span>
        </div>

        <div class="bis-alt-items-list">
          ${items.map(item => {
            const isRank1 = item.name === topItem.name;
            const rankLabel = isRank1 ? '#1 BiS' : `#${item.rank}`;
            const rankBadgeClass = isRank1 ? 'rank-1' : `rank-${item.rank}`;
            const iconUrl = item.icon && item.icon.startsWith('http') 
              ? item.icon 
              : `https://render.worldofwarcraft.com/us/icons/56/${item.icon || 'inv_misc_questionmark.jpg'}`;

            const matchesFaction = item.side === 'both' || item.side === faction;
            const mats = item.mats || '';
            const reagents = getItemReagents(item);
            const reagentsAttr = reagents ? escapeHtml(JSON.stringify(reagents)) : '';
            const matsHtml = renderItemMatsHtml(item, mats);

            const customKey = `${currentBiSState.classId}_${currentBiSState.specId}_${slotId}`;
            const customItem = currentBiSState.customEquipped && currentBiSState.customEquipped[customKey];
            const isEquipped = customItem ? (customItem.name === item.name) : isRank1;

            return `
              <div class="bis-alt-row ${isEquipped ? 'bis-rank-1' : ''} ${matchesFaction ? '' : 'bis-faction-mismatch'}"
                   data-item-name="${escapeHtml(item.name)}"
                   data-item-quality="${item.quality || 'q2'}"
                   data-item-stats="${escapeHtml(item.stats || '')}"
                   data-item-enchant=""
                   data-item-source="${escapeHtml(item.source || '')}"
                   data-item-slot="${escapeHtml(slotName)}"
                   data-item-tipid="${item.tipId || ''}"
                   data-item-id="${item.itemId || ''}"
                   data-item-side="${item.side || 'both'}"
                   data-item-mats="${escapeHtml(mats)}"
                   data-item-reagents="${reagentsAttr}">
                <span class="bis-rank-badge ${rankBadgeClass}">${rankLabel}</span>
                <img src="${iconUrl}" alt="${escapeHtml(item.name)}" class="bis-alt-icon ${item.quality || 'q2'}" loading="lazy" />
                <div class="bis-alt-info">
                  <div style="display: flex; align-items: center; gap: 0.4rem; flex-wrap: wrap;">
                    <span class="bis-alt-name ${item.quality || 'q2'}">${escapeHtml(item.name)}</span>
                    ${item.side === 'alliance' ? `<span class="bis-side-pill alliance"><img src="images/icons/faction-alliance.jpg" class="bis-mini-faction-icon" alt="" onerror="this.src='https://render.worldofwarcraft.com/us/icons/56/achievement_pvp_a_a.jpg'" /> Alliance</span>` : ''}
                    ${item.side === 'horde' ? `<span class="bis-side-pill horde"><img src="images/icons/faction-horde.jpg" class="bis-mini-faction-icon" alt="" onerror="this.src='https://render.worldofwarcraft.com/us/icons/56/achievement_pvp_h_h.jpg'" /> Horde</span>` : ''}
                  </div>
                  <div style="display: flex; align-items: center; gap: 0.6rem; flex-wrap: wrap; margin-top: 0.15rem;">
                    ${item.stats ? `<span class="bis-alt-stats">${escapeHtml(item.stats)}</span>` : ''}
                    ${item.armor ? `<span class="bis-alt-stats" style="color: #94a3b8;">🛡️ ${item.armor} Armor</span>` : ''}
                    ${item.ilvl ? `<span class="bis-alt-stats" style="color: #ca8a04;">ilvl ${item.ilvl}</span>` : ''}
                  </div>
                </div>
                <div class="bis-alt-source" style="display: flex; flex-direction: column; gap: 0.35rem; align-items: flex-end;">
                  <div>📍 ${escapeHtml(item.source || 'Unknown')}</div>
                  ${matsHtml}
                  <button type="button" class="btn-bis-equip ${isEquipped ? 'is-equipped' : ''}" style="${isEquipped ? 'background: rgba(16, 185, 129, 0.2); border: 1px solid #10b981; color: #6ee7b7;' : 'background: rgba(255, 255, 255, 0.08); border: 1px solid rgba(255, 255, 255, 0.2); color: #cbd5e1;'} padding: 0.2rem 0.6rem; border-radius: 4px; font-size: 0.76rem; cursor: pointer;" onclick="event.stopPropagation(); equipBiSItem('${slotId}', '${escapeHtml(item.name).replace(/'/g, "\\'")}')">
                    ${isEquipped ? '✓ Equipped' : '⚡ Equip Item'}
                  </button>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;
  }).join('');
}

/**
 * Render Recommended Enchants List
 */
function renderEnchantsTable(enchants) {
  if (!enchants || enchants.length === 0) {
    return '<p class="bis-empty-text" style="color: var(--text-muted); font-size: 0.85rem; padding: 1rem;">No recommended enchants listed for this spec.</p>';
  }

  return enchants.map(ench => {
    const iconUrl = ench.icon && ench.icon.startsWith("http")
      ? ench.icon
      : `https://render.worldofwarcraft.com/us/icons/56/${ench.icon || 'trade_engraving.jpg'}`;

    return `
      <div class="bis-prep-item">
        <img src="${iconUrl}" alt="${escapeHtml(ench.slot || '')}" class="bis-prep-item-icon q2" loading="lazy" />
        <div class="bis-prep-item-main">
          <div class="bis-prep-item-title">
            <span class="bis-prep-category-tag">${escapeHtml(ench.slot || 'Gear')}</span>
            <span>${escapeHtml(ench.effect || ench.name || '')}</span>
          </div>
          <div class="bis-prep-item-source">📍 ${escapeHtml(ench.source || '')}</div>
          ${ench.materials ? `<div class="bis-prep-item-mats">🔮 Reagents: ${escapeHtml(ench.materials)}</div>` : ''}
        </div>
      </div>
    `;
  }).join('');
}

/**
 * Render Pre-Fight Consumables List
 */
function renderConsumablesTable(consumables) {
  if (!consumables || consumables.length === 0) {
    return '<p class="bis-empty-text" style="color: var(--text-muted); font-size: 0.85rem; padding: 1rem;">No pre-fight consumables listed for this spec.</p>';
  }

  return consumables.map(item => {
    const iconUrl = item.icon && item.icon.startsWith("http")
      ? item.icon
      : `https://render.worldofwarcraft.com/us/icons/56/${item.icon || 'inv_potion_57.jpg'}`;

    return `
      <div class="bis-prep-item">
        <img src="${iconUrl}" alt="${escapeHtml(item.name || '')}" class="bis-prep-item-icon q2" loading="lazy" />
        <div class="bis-prep-item-main">
          <div class="bis-prep-item-title">
            <span class="bis-prep-category-tag">${escapeHtml(item.category || 'Buff')}</span>
            <span>${escapeHtml(item.name || '')}</span>
          </div>
          <div class="bis-prep-item-effect">✨ ${escapeHtml(item.effect || item.desc || '')}</div>
          ${item.source ? `<div class="bis-prep-item-source">📍 ${escapeHtml(item.source)}</div>` : ''}
          ${item.materials ? `<div class="bis-prep-item-mats">🧪 Reagents: ${escapeHtml(item.materials)}</div>` : ''}
        </div>
      </div>
    `;
  }).join('');
}

/**
 * Event Bindings
 */
function bindBiSEvents() {
  // Class Tabs
  document.querySelectorAll(".bis-class-tab").forEach(tab => {
    tab.addEventListener("click", () => {
      const cls = tab.getAttribute("data-class");
      if (cls && WOW_BIS_DATA[cls]) {
        currentBiSState.classId = cls;
        currentBiSState.specId = WOW_BIS_DATA[cls].specs[0].id;
        window.location.hash = `#bis/${cls}/${currentBiSState.specId}`;
        renderBiSApp();
      }
    });
  });

  // Spec Pills
  document.querySelectorAll(".bis-spec-pill").forEach(pill => {
    pill.addEventListener("click", () => {
      const spec = pill.getAttribute("data-spec");
      if (spec) {
        currentBiSState.specId = spec;
        window.location.hash = `#bis/${currentBiSState.classId}/${spec}`;
        renderBiSApp();
      }
    });
  });

  // Faction Toggle
  document.querySelectorAll(".bis-faction-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const faction = btn.getAttribute("data-faction");
      if (faction) {
        currentBiSState.faction = faction;
        renderBiSApp();
      }
    });
  });

  // Copy Gear List Button
  const btnCopy = document.getElementById("btn-copy-bis-list");
  if (btnCopy) {
    btnCopy.addEventListener("click", () => {
      copyBiSListToClipboard();
    });
  }

  // Export BiS to In-Game ForeverDungeonJournal Button
  const btnExportJournal = document.getElementById("btn-export-bis-journal");
  if (btnExportJournal) {
    btnExportJournal.addEventListener("click", () => {
      exportBiSToJournal();
    });
  }

  // Share Link Button
  const btnShare = document.getElementById("btn-share-bis-link");
  if (btnShare) {
    btnShare.addEventListener("click", () => {
      const shareUrl = `${window.location.origin}${window.location.pathname}#bis/${currentBiSState.classId}/${currentBiSState.specId}`;
      const copyFn = window.copyTextToClipboard || ((t, fn) => navigator.clipboard?.writeText(t).then(fn));
      copyFn(shareUrl, () => {
        btnShare.innerHTML = "<span>✅</span> Link Copied!";
        setTimeout(() => {
          btnShare.innerHTML = "<span>🔗</span> Share Link";
        }, 2000);
      });
    });
  }

  // Native Talent Tree Modal Button - Recommended Spec Build
  const btnTalents = document.getElementById("btn-view-talent-tree");
  if (btnTalents) {
    btnTalents.addEventListener("click", () => {
      openBiSTalentModal();
    });
  }

  // Native Talent Calculator - Blank Slate Custom Builder
  const btnBlankCalc = document.getElementById("btn-open-blank-calculator");
  if (btnBlankCalc) {
    btnBlankCalc.addEventListener("click", () => {
      if (window.TalentTreeModule) {
        const classData = WOW_BIS_DATA[currentBiSState.classId];
        const currentSpec = classData ? (classData.specs.find(s => s.id === currentBiSState.specId) || classData.specs[0]) : null;
        window.TalentTreeModule.openModal({
          classId: currentBiSState.classId,
          specId: currentSpec ? currentSpec.id : 'custom',
          specName: currentSpec ? `${currentSpec.name} (Custom Build)` : 'Custom Build',
          blankSlate: true,
          buildUrl: currentSpec?.talents?.buildUrl || '',
          maxPoints: 26
        });
      }
    });
  }

  // Gear Search Input
  const filterInput = document.getElementById("bis-gear-filter-input");
  const filterClear = document.getElementById("bis-gear-filter-clear");
  if (filterInput) {
    filterInput.addEventListener("input", (e) => {
      currentBiSState.searchFilter = e.target.value.trim().toLowerCase();
      if (filterClear) filterClear.hidden = !currentBiSState.searchFilter;
      applyActiveGearFilters();
    });
  }
  if (filterClear) {
    filterClear.addEventListener("click", () => {
      if (filterInput) filterInput.value = "";
      currentBiSState.searchFilter = "";
      filterClear.hidden = true;
      applyActiveGearFilters();
    });
  }

  // Source Filter Chips
  document.querySelectorAll(".bis-source-chip").forEach(chip => {
    chip.addEventListener("click", () => {
      document.querySelectorAll(".bis-source-chip").forEach(c => c.classList.remove("active"));
      chip.classList.add("active");
      currentBiSState.sourceFilter = chip.getAttribute("data-filter") || "all";
      applyActiveGearFilters();
    });
  });
}

/**
 * Filter paper doll and alternatives table by search keyword and source
 */
function applyActiveGearFilters() {
  const query = (currentBiSState.searchFilter || '').toLowerCase();
  const sourceFilter = currentBiSState.sourceFilter || 'all';

  const matchesFilter = (sourceText, nameText) => {
    const s = (sourceText || '').toLowerCase();
    const n = (nameText || '').toLowerCase();

    // Text query check
    if (query) {
      const queryMatch = s.includes(query) || n.includes(query);
      if (!queryMatch) return false;
    }

    // Source chip check
    if (sourceFilter === 'all') return true;
    if (sourceFilter === 'dalaran') return s.includes('dalaran') || s.includes('excavation') || s.includes('site 4');
    if (sourceFilter === 'dungeon') return s.includes('kraul') || s.includes('gnomeregan') || s.includes('graveyard') || s.includes('bfd') || s.includes('boss');
    if (sourceFilter === 'craft') return s.includes('blacksmithing') || s.includes('leatherworking') || s.includes('tailoring') || s.includes('engineering') || s.includes('craft');
    if (sourceFilter === 'quest') return s.includes('quest');
    if (sourceFilter === 'world') return s.includes('world drop') || s.includes('sold at the auction');

    return true;
  };

  const isFilterActive = !!query || sourceFilter !== 'all';

  // 1. Paper-Doll Slot Cards
  document.querySelectorAll(".bis-slot-card:not(.empty)").forEach(card => {
    const src = card.getAttribute("data-item-source") || '';
    const name = card.getAttribute("data-item-name") || '';
    const match = matchesFilter(src, name);

    if (isFilterActive) {
      if (match) {
        card.classList.add("highlighted");
        card.classList.remove("dimmed");
      } else {
        card.classList.remove("highlighted");
        card.classList.add("dimmed");
      }
    } else {
      card.classList.remove("highlighted", "dimmed");
    }
  });

  // 2. Alternatives Table Rows
  document.querySelectorAll(".bis-alt-row").forEach(row => {
    const src = row.getAttribute("data-item-source") || '';
    const name = row.getAttribute("data-item-name") || '';
    const match = matchesFilter(src, name);

    if (isFilterActive) {
      if (match) {
        row.classList.remove("dimmed");
        row.classList.add("highlighted");
      } else {
        row.classList.add("dimmed");
        row.classList.remove("highlighted");
      }
    } else {
      row.classList.remove("dimmed", "highlighted");
    }
  });
}

/**
 * Spell and Talent Icon Dictionary
 * Maps talent ability names to authentic Blizzard CDN icon filenames
 */
const WOW_TALENT_ICONS = {
  // Warrior
  "deflection": "ability_parry.jpg",
  "improved rend": "ability_gouge.jpg",
  "tactical mastery": "spell_nature_enchantarmor.jpg",
  "improved overpower": "ability_meleedamage.jpg",
  "deep wounds": "ability_backstab.jpg",
  "two-handed weapon spec": "inv_axe_09.jpg",
  "impale": "ability_searingarrow.jpg",
  "sweeping strikes": "ability_rogue_eviscerate.jpg",
  "sword specialization": "inv_sword_27.jpg",
  "mortal strike": "ability_warrior_savageblow.jpg",
  "cruelty": "ability_rogue_eviscerate.jpg",
  "unbridled wrath": "spell_nature_stoneclawtotem.jpg",
  "improved demoralizing shout": "ability_warrior_warcry.jpg",
  "blood craze": "spell_shadow_summonimp.jpg",
  "piercing howl": "spell_shadow_deathscream.jpg",
  "enrage": "spell_shadow_unholyfrenzy.jpg",
  "flurry": "ability_ghoulfrenzy.jpg",
  "death wish": "spell_shadow_deathpact.jpg",
  "bloodthirst": "spell_nature_bloodlust.jpg",
  "shield specialization": "inv_shield_06.jpg",
  "anticipation": "spell_nature_mirrorimage.jpg",
  "improved bloodrage": "ability_racial_bloodrage.jpg",
  "toughness": "spell_holy_devotion.jpg",
  "iron will": "spell_magic_magearmor.jpg",
  "last stand": "spell_holy_ashestoashes.jpg",
  "shield slam": "inv_shield_05.jpg",
  "concussion blow": "ability_thunderbolt.jpg",

  // Paladin
  "divine intellect": "spell_nature_sleep.jpg",
  "divine strength": "ability_golemstorm.jpg",
  "spiritual focus": "spell_arcane_blink.jpg",
  "healing light": "spell_holy_holybolt.jpg",
  "consecration": "spell_holy_innerfire.jpg",
  "illumination": "spell_holy_greaterheal.jpg",
  "holy shock": "spell_holy_searinglight.jpg",
  "redoubt": "ability_defend.jpg",
  "precision": "ability_marksmanship.jpg",
  "shield of righteousness": "ability_paladin_shieldofvengeance.jpg",
  "blessing of sanctuary": "spell_nature_lightningshield.jpg",
  "holy shield": "classic_spell_holy_blessingofprotection.jpg",
  "benediction": "spell_frost_windwalkon.jpg",
  "judgement of command": "ability_warrior_innerrage.jpg",
  "seal of command": "ability_warrior_innerrage.jpg",
  "conviction": "spell_holy_retributionaura.jpg",
  "pursuit of justice": "spell_holy_persuitofjustice.jpg",
  "eye for an eye": "spell_holy_eyeforaneye.jpg",
  "vengeance": "ability_racial_avatar.jpg",

  // Hunter
  "endurance training": "spell_nature_reincarnation.jpg",
  "improved eyes of the beast": "ability_hunter_beastcall.jpg",
  "thick hide": "inv_misc_pelt_bear_03.jpg",
  "unleashed fury": "ability_bullrush.jpg",
  "ferocity": "inv_misc_monsterclaw_04.jpg",
  "intimidation": "ability_devour.jpg",
  "efficiency": "spell_frost_wizardmark.jpg",
  "lethal shots": "ability_searingarrow.jpg",
  "aimed shot": "inv_spear_07.jpg",
  "hawk eye": "ability_townwatch.jpg",
  "mortal shots": "ability_piercingdamage.jpg",
  "barrage": "ability_upgrademoonglaive.jpg",
  "monster slaying": "inv_misc_head_dragon_black.jpg",
  "humanoid slaying": "spell_holy_prayerofhealing.jpg",
  "surefooted": "ability_kick.jpg",
  "killer instinct": "spell_holy_blessingofstamina.jpg",

  // Rogue
  "malice": "ability_racial_bloodrage.jpg",
  "ruthlessness": "ability_druid_disembowel.jpg",
  "murder": "spell_shadow_deathscream.jpg",
  "relentless strikes": "ability_warrior_decisivestrike.jpg",
  "lethality": "ability_criticalstrike.jpg",
  "cold blood": "spell_ice_lament.jpg",
  "seal fate": "spell_shadow_chilltouch.jpg",
  "improved sinister strike": "spell_shadow_ritualofsacrifice.jpg",
  "lightning reflexes": "spell_nature_invisibilty.jpg",
  "dual wield specialization": "ability_dualwield.jpg",
  "blade flurry": "ability_warrior_punishingblow.jpg",
  "adrenaline rush": "spell_shadow_shadowworddominate.jpg",
  "master of deception": "spell_shadow_charm.jpg",
  "opportunity": "ability_warrior_warcry.jpg",
  "initiative": "spell_shadow_fumble.jpg",
  "ghostly strike": "spell_shadow_curse.jpg",
  "preparation": "spell_shadow_antimagicshell.jpg",
  "hemorrhage": "spell_shadow_lifedrain.jpg",

  // Priest
  "unbreakable will": "spell_magic_magearmor.jpg",
  "silent resolve": "spell_nature_manaregain.jpg",
  "improved power word: shield": "spell_holy_powerwordshield.jpg",
  "meditation": "spell_nature_sleep.jpg",
  "inner focus": "spell_frost_windwalkon.jpg",
  "divine spirit": "spell_holy_divinespirit.jpg",
  "holy specialization": "spell_holy_sealofsalvation.jpg",
  "divine fury": "spell_holy_sealofwrath.jpg",
  "holy nova": "spell_holy_holynova.jpg",
  "spiritual guidance": "spell_holy_spiritualguidence.jpg",
  "spiritual healing": "spell_holy_spiritualhealing.jpg",
  "spirit tap": "spell_shadow_requiem.jpg",
  "blackout": "spell_shadow_gathershadows.jpg",
  "shadow affinity": "spell_shadow_shadowward.jpg",
  "improved shadow word: pain": "spell_shadow_shadowwordpain.jpg",
  "shadow focus": "spell_shadow_burningspirit.jpg",
  "mind flay": "spell_shadow_siphonmana.jpg",
  "shadow weaving": "spell_shadow_blackplague.jpg",
  "silence": "spell_shadow_impphysicscream.jpg",
  "vampiric embrace": "spell_shadow_unsummon.jpg",
  "darkness": "spell_shadow_twilight.jpg",
  "shadowform": "spell_shadow_shadowform.jpg",

  // Mage
  "arcane subtlety": "spell_holy_dispelmagic.jpg",
  "arcane focus": "spell_holy_devotion.jpg",
  "arcane concentration": "spell_shadow_manaburn.jpg",
  "arcane meditation": "spell_shadow_siphonmana.jpg",
  "presence of mind": "spell_nature_enchantarmor.jpg",
  "arcane power": "spell_nature_lightning.jpg",
  "improved fireball": "spell_fire_flamebolt.jpg",
  "ignite": "spell_fire_incinerate.jpg",
  "pyroblast": "spell_fire_fireball02.jpg",
  "critical mass": "spell_nature_wispheal.jpg",
  "blast wave": "spell_fire_selfdestruct.jpg",
  "fire power": "spell_fire_immolation.jpg",
  "combustion": "spell_fire_sealoffire.jpg",
  "improved frostbolt": "spell_frost_frostbolt02.jpg",
  "ice shards": "spell_frost_iceshard.jpg",
  "frostbite": "spell_frost_frostarmor.jpg",
  "cold snap": "spell_frost_wizardmark.jpg",
  "improved blizzard": "spell_frost_glacier.jpg",
  "arctic reach": "spell_shadow_darksummoning.jpg",
  "frost channeling": "spell_frost_stun.jpg",
  "shatter": "spell_frost_frostshock.jpg",
  "ice block": "spell_frost_frost.jpg",
  "ice barrier": "spell_ice_lament.jpg",

  // Warlock
  "suppression": "spell_shadow_unsummon.jpg",
  "improved corruption": "spell_shadow_abominationexplosion.jpg",
  "improved life tap": "spell_shadow_burningspirit.jpg",
  "fel concentration": "spell_shadow_fingerofdeath.jpg",
  "amplify curse": "spell_shadow_contagion.jpg",
  "nightfall": "spell_shadow_twilight.jpg",
  "siphon life": "spell_shadow_requiem.jpg",
  "shadow mastery": "spell_shadow_shademagic.jpg",
  "demonic embracing": "spell_shadow_metamorphosis.jpg",
  "improved imp": "spell_shadow_summonimp.jpg",
  "demonic aegis": "spell_shadow_ragingscream.jpg",
  "improved voidwalker": "spell_shadow_summonvoidwalker.jpg",
  "fel domination": "spell_nature_removecurse.jpg",
  "soul link": "spell_shadow_gathershadows.jpg",
  "improved shadow bolt": "spell_shadow_shadowbolt.jpg",
  "bane": "spell_shadow_deathpact.jpg",
  "shadowburn": "spell_shadow_scourgebuild.jpg",
  "ruin": "spell_shadow_shadowwordpain.jpg",

  // Shaman
  "convection": "spell_nature_wispsplodegreen.jpg",
  "concussion": "spell_fire_fireball.jpg",
  "elemental focus": "spell_shadow_manaburn.jpg",
  "call of thunder": "spell_nature_callstorm.jpg",
  "elemental fury": "spell_fire_volcano.jpg",
  "ancestral knowledge": "spell_shadow_grimward.jpg",
  "thundering strikes": "ability_thunderbolt.jpg",
  "two-handed axes and maces": "inv_axe_10.jpg",
  "stormstrike": "spell_holy_sealofmight.jpg",
  "tidal focus": "spell_nature_healingwavelesser.jpg",
  "improved healing wave": "spell_nature_magicimmunity.jpg",
  "nature's swiftness": "spell_nature_ravenform.jpg",
  "mana tide totem": "spell_frost_summonwaterelemental.jpg",

  // Druid
  "nature's grasp": "spell_nature_natureswrath.jpg",
  "improved moonfire": "spell_nature_starfall.jpg",
  "omen of clarity": "spell_nature_crystalball.jpg",
  "moonfury": "spell_nature_moonglow.jpg",
  "moonkin form": "spell_nature_forceofnature.jpg",
  "feral aggression": "ability_druid_demoralizingroar.jpg",
  "feral charge": "ability_hunter_pet_bear.jpg",
  "sharpened claws": "inv_misc_monsterclaw_04.jpg",
  "predatory strikes": "ability_hunter_pet_cat.jpg",
  "leader of the pack": "spell_nature_unyeildingstamina.jpg",
  "heart of the wild": "spell_holy_blessingofagility.jpg",
  "improved mark of the wild": "spell_nature_regeneration.jpg",
  "furor": "spell_nature_stoneclawtotem.jpg",
  "naturalist": "spell_nature_healingtouch.jpg",
  "swiftmend": "inv_relics_idolofrejuvenation.jpg",
  "innervate": "spell_nature_lightning.jpg"
};

/**
 * Resolve authentic CDN icon for any talent ability name
 */

  // BiS Modal, Tooltips & Exporters (delegated to js/modules/bis/bis-modal.js)
  function openBiSTalentModal() {
    if (window.WOW_BIS_MODAL && window.WOW_BIS_MODAL.openBiSTalentModal) {
      window.WOW_BIS_MODAL.openBiSTalentModal();
    }
  }

  function initItemTooltips() {
    if (window.WOW_BIS_MODAL && window.WOW_BIS_MODAL.initItemTooltips) {
      window.WOW_BIS_MODAL.initItemTooltips();
    }
  }

  function copyBiSListToClipboard() {
    if (window.WOW_BIS_MODAL && window.WOW_BIS_MODAL.copyBiSListToClipboard) {
      window.WOW_BIS_MODAL.copyBiSListToClipboard();
    }
  }

  function exportBiSToJournal() {
    if (window.WOW_BIS_MODAL && window.WOW_BIS_MODAL.exportBiSToJournal) {
      window.WOW_BIS_MODAL.exportBiSToJournal();
    }
  }

function equipBiSItem(slotId, itemName) {
  const classData = WOW_BIS_DATA[currentBiSState.classId];
  if (!classData || !classData.specs) return;
  const currentSpec = classData.specs.find(s => s.id === currentBiSState.specId);
  if (!currentSpec || !currentSpec.slots) return;

  const slot = currentSpec.slots.find(s => s.slotId === slotId);
  if (!slot || !slot.items) return;

  const item = slot.items.find(i => i.name === itemName);
  if (!item) return;

  if (!currentBiSState.customEquipped) {
    currentBiSState.customEquipped = {};
  }

  const customKey = `${currentBiSState.classId}_${currentBiSState.specId}_${slotId}`;
  currentBiSState.customEquipped[customKey] = item;

  try {
    localStorage.setItem('wow_forever_custom_bis', JSON.stringify(currentBiSState.customEquipped));
  } catch {
    // ignore
  }

  renderBiSApp();

  if (window.showToast) {
    window.showToast(`Equipped ${item.name} for ${slot.slotName || slotId}!`, "success");
  }
}

/**
 * Resets all custom equipped items back to default BiS for the current spec
 */
function resetCustomBiS() {
  if (!currentBiSState.customEquipped) return;
  const prefix = `${currentBiSState.classId}_${currentBiSState.specId}_`;
  let changed = false;
  for (const k of Object.keys(currentBiSState.customEquipped)) {
    if (k.startsWith(prefix)) {
      delete currentBiSState.customEquipped[k];
      changed = true;
    }
  }
  if (changed) {
    try {
      localStorage.setItem('wow_forever_custom_bis', JSON.stringify(currentBiSState.customEquipped));
    } catch {
      // ignore
    }
    renderBiSApp();
    if (window.showToast) {
      window.showToast("Reset custom equipped gear back to default BiS.", "info");
    }
  }
}

  window.initBiSLists = initBiSLists;
  window.exportBiSToJournal = exportBiSToJournal;
  window.equipBiSItem = equipBiSItem;
  window.resetCustomBiS = resetCustomBiS;
})();

