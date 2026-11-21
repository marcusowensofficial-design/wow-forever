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

const BIS_LEVEL_KEY = 'wow_forever_bis_level';

let currentBiSState = {
  level: "60", // '60' = level 60 pre-raid lists (js/data/bis-60-data.js) | '30' = level 30 leveling lists
  classId: "warrior",
  specId: "arms",
  faction: "alliance", // 'alliance' | 'horde'
  searchFilter: "",
  sourceFilter: "all", // see getSourceChips()
  customEquipped: {}
};
// bis-modal.js reads the shared state and dataset through these globals.
window.currentBiSState = currentBiSState;

function isLevel60() {
  return currentBiSState.level !== '30' && !!window.WOW_BIS_DATA_60;
}
function activeBisData() {
  return isLevel60() ? window.WOW_BIS_DATA_60 : window.WOW_BIS_DATA;
}
function activeBisMeta() {
  return isLevel60() ? window.WOW_BIS_METADATA_60 : window.WOW_BIS_METADATA;
}
window.activeBisData = activeBisData;
window.activeBisMeta = activeBisMeta;
window.isBisLevel60 = isLevel60;

function bisHash(classId, specId) {
  return `#bis/${classId}/${specId}${isLevel60() ? '' : '/30'}`;
}

function setBiSLevel(level) {
  currentBiSState.level = level === '30' ? '30' : '60';
  try { localStorage.setItem(BIS_LEVEL_KEY, currentBiSState.level); } catch { /* storage unavailable */ }
  if (currentBiSState.level === '30' && !window.WOW_BIS_DATA && window.WOW_DATA_LOADER) {
    window.WOW_DATA_LOADER.ensure('bis30').then(() => {
      if (typeof WOW_BIS_DATA !== 'undefined' && !window.WOW_BIS_DATA) window.WOW_BIS_DATA = WOW_BIS_DATA;
      if (typeof WOW_BIS_METADATA !== 'undefined' && !window.WOW_BIS_METADATA) window.WOW_BIS_METADATA = WOW_BIS_METADATA;
      setBiSLevel('30');
      renderBiSApp();
    }).catch(() => {});
    return;
  }
  const data = activeBisData();
  if (!data || !data.classes) return;
  const classData = data[currentBiSState.classId] || data[data.classes[0].id];
  if (!classData.specs.some(s => s.id === currentBiSState.specId)) {
    currentBiSState.specId = classData.specs[0].id;
  }
  currentBiSState.sourceFilter = 'all';
}

// Source filter chips. Level 60 items carry a `cat`; level 30 items are matched on their source text.
function getSourceChips() {
  if (isLevel60()) {
    return [
      ['all', 'All Sources'], ['dungeon', '⚔️ Dungeons'], ['quest', '📜 Quests'], ['craft', '🔨 Crafting'],
      ['vendor', '🪙 Vendors & Rep'], ['pvp', '🏅 PvP Rank'], ['world', '🌍 World'], ['raid', '👑 Raid / Not Yet'],
    ];
  }
  return [
    ['all', 'All Sources'], ['dalaran', '🏰 Dalaran & ES4'], ['dungeon', '⚔️ Dungeon Bosses'], ['craft', '🔨 Crafting'],
    ['quest', '📜 Quests'], ['world', '🌍 World Drops'],
  ];
}

// Small badge for level 60 items that cannot be obtained yet.
function renderAvailPill(item) {
  if (!item || !item.avail) return '';
  if (item.avail === 'raid') return '<span class="bis-avail-pill raid" title="Comes from a Forever raid. Raids open December 9, 2026.">👑 Raid · Dec 9</span>';
  if (item.avail === 'unavailable') return '<span class="bis-avail-pill unavailable" title="Only drops in a Classic raid that is not in WoW Forever. Pick the next best item for this slot.">⛔ Not in Forever yet</span>';
  return '';
}

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
  try {
    if (localStorage.getItem(BIS_LEVEL_KEY) === '30') setBiSLevel('30');
  } catch { /* storage unavailable */ }

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
  // #bis/<class>/<spec> = level 60, #bis/<class>/<spec>/30 = level 30 leveling list
  if (parts[1] && ((window.WOW_BIS_DATA_60 || {})[parts[1]] || (window.WOW_BIS_DATA || {})[parts[1]])) {
    const wanted = parts[3] === '30' ? '30' : '60';
    if (wanted !== (isLevel60() ? '60' : '30')) setBiSLevel(wanted);
  }
  const curData = activeBisData();
  if (parts[1] && curData && curData[parts[1]]) {
    currentBiSState.classId = parts[1];
    if (parts[2]) {
      const specExists = curData[parts[1]].specs.some(s => s.id === parts[2]);
      if (specExists) {
        currentBiSState.specId = parts[2];
      } else {
        currentBiSState.specId = curData[parts[1]].specs[0].id;
      }
    } else {
      currentBiSState.specId = curData[parts[1]].specs[0].id;
    }
    renderBiSApp();
  }
}

function renderBiSApp() {
  const container = document.getElementById("bis-container");
  if (!container) return;

  const currentClass = activeBisData().classes.find(c => c.id === currentBiSState.classId) || activeBisData().classes[0];
  const classData = activeBisData()[currentBiSState.classId];
  if (!classData || !classData.specs || classData.specs.length === 0) return;

  let currentSpec = classData.specs.find(s => s.id === currentBiSState.specId);
  if (!currentSpec) {
    currentSpec = classData.specs[0];
    currentBiSState.specId = currentSpec.id;
  }
  const lvl60 = isLevel60();
  const meta = activeBisMeta() || {};
  const levelLabel = lvl60 ? 'Level 60' : 'Level 30';

  container.innerHTML = `
    <!-- Top Metadata Banner -->
    <div class="bis-meta-banner">
      <div class="bis-meta-left">
        <span class="bis-badge-beta">${lvl60 ? '👑 LEVEL 60 PRE-RAID BiS' : '⚡ LEVEL 30 LEVELING BiS'}</span>
        <span class="bis-badge-build">Build ${escapeHtml(meta.version)}</span>
        <span class="bis-meta-updated">Updated: ${escapeHtml(meta.lastUpdated)}</span>
      </div>
      <div class="bis-meta-right">
        <div class="bis-level-toggle" role="group" aria-label="Select list level">
          <button type="button" class="bis-level-btn ${lvl60 ? 'active' : ''}" data-level="60" aria-pressed="${lvl60}">Level 60 Pre-Raid</button>
          <button type="button" class="bis-level-btn ${lvl60 ? '' : 'active'}" data-level="30" aria-pressed="${!lvl60}">Level 30 Leveling</button>
        </div>
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

    <!-- List Context Callout -->
    <div class="bis-leveling-callout" style="background: rgba(14, 116, 144, 0.15); border: 1px solid rgba(56, 189, 248, 0.3); border-radius: 6px; padding: 0.6rem 1rem; margin-bottom: 1rem; display: flex; align-items: center; justify-content: space-between; gap: 1rem;">
      <div style="font-size: 0.86rem; color: #cbd5e1;">
        ${lvl60
          ? `<strong style="color: #38bdf8;">👑 Level 60 pre-raid gear:</strong> one list per spec, following Wowhead's Forever gear planners. Raids open <strong>December 9</strong>. Items marked <em>Raid · Dec 9</em> or <em>Not in Forever yet</em> can't be earned today, so fill those slots from the dungeon, crafted and PvP options.`
          : `<strong style="color: #38bdf8;">⚡ Level 30 leveling gear:</strong> the beta-era list for characters around level 25–30 (Excavation Site, City of Dalaran, Razorfen Kraul, Gnomeregan). Switch to <em>Level 60 Pre-Raid</em> for max-level gear.`}
      </div>
    </div>

    <!-- Class Switcher Ribbon -->
    <nav class="bis-class-selector" aria-label="Choose Class">
      ${activeBisData().classes.map(c => `
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
               placeholder="Filter gear by item name, boss, or dungeon (e.g. ${lvl60 ? 'Stratholme, Dire Maul, Tailoring' : 'Dalaran, RFK, Graveyard, Crafting'})..." 
               value="${escapeHtml(currentBiSState.searchFilter || '')}" />
        <button type="button" id="bis-gear-filter-clear" class="bis-filter-clear-btn" ${currentBiSState.searchFilter ? '' : 'hidden'}>✕</button>
      </div>
      <div class="bis-source-chips">
        ${getSourceChips().map(([key, label]) => `<button type="button" class="bis-source-chip ${currentBiSState.sourceFilter === key ? 'active' : ''}" data-filter="${key}">${label}</button>`).join('')}
      </div>
    </div>

    <!-- Spec Guide Lede / Rationale -->
    ${currentSpec.description ? `
      <div class="bis-spec-lede">
        <strong>🧭 Spec Itemization Priority:</strong> ${escapeHtml(currentSpec.description)}
      </div>
    ` : ''}
    ${renderSpecStatusNotice(currentSpec, currentClass)}

    <!-- Main Spec Content Layout: Paper-Doll + Stat Budget & Talents -->
    <div class="bis-stage-layout">
      
      <!-- Left Column: Character Paper-Doll & Equipment Grid -->
      <div class="bis-paperdoll-panel">
        <div class="bis-panel-header">
          <div>
            <h3 class="bis-panel-title">
              <span style="color: ${currentClass.color};">${currentClass.name}</span>: ${currentSpec.name} Best in Slot
            </h3>
            <p class="bis-panel-subtitle">${lvl60 ? 'Level 60 pre-raid gear' : 'Level 30 leveling milestone gear'} • Weapon Preference: ${currentSpec.weaponType || 'Standard'}</p>
          </div>
          <span class="bis-slot-count">${(currentSpec.slots && currentSpec.slots.length) || 0} Slots Ranked</span>
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
                <strong>${levelLabel} ${currentClass.name}</strong>
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
        ${lvl60 ? renderLevel60SidePanel(currentSpec, currentClass) : `
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

        <!-- Level 30 Itemization Note Card -->
        <div class="bis-info-card">
          <h4><span>💡</span> WoW Forever Level 30 Itemization</h4>
          <p>
            In WoW Forever Build 1.60.1, level 30 characters gain access to newly re-itemized content from the 
            <strong>City of Dalaran (Level 26–32)</strong> and <strong>Excavation Site: Wetlands (Level 27–34)</strong>, 
            along with classic favorites like <em>Razorfen Kraul</em>, <em>Gnomeregan</em>, and <em>SM Graveyard</em>.
          </p>
          <div class="bis-tip-item">
            <span>🛡️</span>
            <div><strong>Live Build 1.60.1.71037:</strong> Full ranked listings with all drop sources and crafting recipes extracted directly.</div>
          </div>
        </div>
        `}

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
          <h4><span>✨</span> Recommended Enchants</h4>
          <span class="bis-prep-badge">${currentSpec.enchants ? currentSpec.enchants.length : 0} Enchants</span>
        </div>
        <div class="bis-prep-list">
          ${lvl60 ? renderEnchantsTable(currentSpec.enchants) : renderEnchantsTable(currentSpec.enchants, currentClass.name, currentSpec.name)}
        </div>
      </div>

      <!-- Pre-Fight Consumables Card -->
      <div class="bis-prep-card bis-consumables-card">
        <div class="bis-prep-header">
          <h4><span>🧪</span> ${levelLabel} Pre-Fight Consumables & Buffs</h4>
          <span class="bis-prep-badge">${currentSpec.consumables ? currentSpec.consumables.length : 0} Consumables</span>
        </div>
        <div class="bis-prep-list">
          ${lvl60 && !(currentSpec.consumables || []).length ? renderLevel60ConsumablesNote(currentSpec) : renderConsumablesTable(currentSpec.consumables)}
        </div>
      </div>
    </div>
  `;

  // Attach event handlers
  bindBiSEvents();

  // Apply active search/source filters
  applyActiveGearFilters();
}

// Pure view renderers & reagent helpers delegated to js/modules/bis/bis-renderers.js
function getItemReagents(item) {
  return window.WOW_BIS_RENDERERS ? window.WOW_BIS_RENDERERS.getItemReagents(item) : null;
}
function renderItemMatsHtml(item, fallbackMats) {
  return window.WOW_BIS_RENDERERS ? window.WOW_BIS_RENDERERS.renderItemMatsHtml(item, fallbackMats) : '';
}
function renderSpecStatusNotice(spec, cls) {
  return window.WOW_BIS_RENDERERS ? window.WOW_BIS_RENDERERS.renderSpecStatusNotice(spec, cls, isLevel60()) : '';
}
function renderLevel60SidePanel(spec, cls) {
  return window.WOW_BIS_RENDERERS ? window.WOW_BIS_RENDERERS.renderLevel60SidePanel(spec, cls) : '';
}
function renderLevel60ConsumablesNote(spec) {
  return window.WOW_BIS_RENDERERS ? window.WOW_BIS_RENDERERS.renderLevel60ConsumablesNote(spec) : '';
}

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
         data-item-cat="${escapeHtml((fullItem || equipped).cat || '')}"
         data-item-avail="${escapeHtml((fullItem || equipped).avail || '')}"
         data-item-reagents="${reagentsAttr}">
      <span class="bis-slot-label">${slotLabel}</span>
      <div class="bis-slot-main">
        <img src="${iconUrl}" alt="${escapeHtml(name)}" class="bis-slot-icon ${quality}" loading="lazy" />
        <div class="bis-slot-details">
          <span class="bis-item-name ${quality}">${escapeHtml(name)}</span>
          ${stats ? `<span class="bis-item-stats">${escapeHtml(stats)}</span>` : ''}
          ${enchant && enchant !== 'None' ? `<span class="bis-item-enchant">✨ ${escapeHtml(enchant)}</span>` : ''}
          ${source ? `<span class="bis-item-source">📍 ${escapeHtml(source)}</span>` : ''}
          ${renderAvailPill(fullItem || equipped)}
          ${matsHtml}
          ${side === 'alliance' ? `<span class="bis-side-pill alliance"><img src="images/icons/faction-alliance.jpg" class="bis-mini-faction-icon" alt="" onerror="this.src='https://render.worldofwarcraft.com/us/icons/56/achievement_pvp_a_a.jpg'" /> Alliance</span>` : ''}
          ${side === 'horde' ? `<span class="bis-side-pill horde"><img src="images/icons/faction-horde.jpg" class="bis-mini-faction-icon" alt="" onerror="this.src='https://render.worldofwarcraft.com/us/icons/56/achievement_pvp_h_h.jpg'" /> Horde</span>` : ''}
        </div>
      </div>
    </div>
  `;
}

function renderStatBudget(statSummary) {
  return window.WOW_BIS_RENDERERS ? window.WOW_BIS_RENDERERS.renderStatBudget(statSummary, currentBiSState.faction) : '';
}
function renderSlotsAlternativesTable(spec) {
  return window.WOW_BIS_RENDERERS ? window.WOW_BIS_RENDERERS.renderSlotsAlternativesTable(spec, currentBiSState) : '';
}
function renderEnchantsTable(enchants, className, specName) {
  return window.WOW_BIS_RENDERERS ? window.WOW_BIS_RENDERERS.renderEnchantsTable(enchants, className, specName) : '';
}
function renderConsumablesTable(consumables) {
  return window.WOW_BIS_RENDERERS ? window.WOW_BIS_RENDERERS.renderConsumablesTable(consumables) : '';
}

/**
 * Event Bindings
 */
function bindBiSEvents() {
  // Class Tabs
  document.querySelectorAll(".bis-class-tab").forEach(tab => {
    tab.addEventListener("click", () => {
      const cls = tab.getAttribute("data-class");
      if (cls && activeBisData()[cls]) {
        currentBiSState.classId = cls;
        currentBiSState.specId = activeBisData()[cls].specs[0].id;
        window.location.hash = bisHash(cls, currentBiSState.specId);
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
        window.location.hash = bisHash(currentBiSState.classId, spec);
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

  // Level Toggle (60 pre-raid / 30 leveling)
  document.querySelectorAll(".bis-level-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const level = btn.getAttribute("data-level");
      if (!level || level === currentBiSState.level) return;
      setBiSLevel(level);
      history.replaceState(null, '', bisHash(currentBiSState.classId, currentBiSState.specId));
      renderBiSApp();
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
      const shareUrl = `${window.location.origin}${window.location.pathname}${bisHash(currentBiSState.classId, currentBiSState.specId)}`;
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
      if (isLevel60()) {
        openLevel60TalentModal();
        return;
      }
      openBiSTalentModal();
    });
  }

  // Native Talent Calculator - Blank Slate Custom Builder
  const btnBlankCalc = document.getElementById("btn-open-blank-calculator");
  if (btnBlankCalc) {
    btnBlankCalc.addEventListener("click", () => {
      if (window.TalentTreeModule) {
        const classData = activeBisData()[currentBiSState.classId];
        const currentSpec = classData ? (classData.specs.find(s => s.id === currentBiSState.specId) || classData.specs[0]) : null;
        window.TalentTreeModule.openModal({
          classId: currentBiSState.classId,
          specId: currentSpec ? currentSpec.id : 'custom',
          specName: currentSpec ? `${currentSpec.name} (Custom Build)` : 'Custom Build',
          blankSlate: true,
          buildUrl: isLevel60() ? '' : (currentSpec?.talents?.buildUrl || ''),
          capMode: isLevel60() ? 'lvl60' : 'lvl30_perk',
          maxPoints: isLevel60() ? 51 : 26
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

  const matchesFilter = (sourceText, nameText, cat, avail) => {
    const s = (sourceText || '').toLowerCase();
    const n = (nameText || '').toLowerCase();

    // Text query check
    if (query) {
      const queryMatch = s.includes(query) || n.includes(query);
      if (!queryMatch) return false;
    }

    // Source chip check
    if (sourceFilter === 'all') return true;
    if (isLevel60()) {
      if (sourceFilter === 'raid') return cat === 'raid' || avail === 'raid' || avail === 'unavailable';
      return cat === sourceFilter;
    }
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
    const match = matchesFilter(src, name, card.getAttribute("data-item-cat") || '', card.getAttribute("data-item-avail") || '');

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
    const match = matchesFilter(src, name, row.getAttribute("data-item-cat") || '', row.getAttribute("data-item-avail") || '');

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
  function openLevel60TalentModal() {
    const spec = activeBisData()[currentBiSState.classId].specs.find(s => s.id === currentBiSState.specId);
    const api = window.WOW_TALENT_BUILDS_60_API;
    const build = api && spec ? api.getBuild(currentBiSState.classId, spec.talentSpecId) : null;
    if (!build || !window.TalentTreeModule) return;
    window.TalentTreeModule.openModal({
      classId: currentBiSState.classId,
      specId: build.specId,
      specName: `${build.name} (Popular Lvl 60)`,
      capMode: 'lvl60',
      maxPoints: 51,
      points: build.points
    });
  }

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
  const classData = activeBisData()[currentBiSState.classId];
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
  window.renderCurrentBiSView = renderBiSApp;
  window.WOW_TALENT_ICONS = WOW_TALENT_ICONS;
})();

