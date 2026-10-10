/**
 * World of Warcraft: Forever - Beta BiS Lists Module
 * Handles class and spec navigation, faction switching, interactive gear paper-doll,
 * slot-by-slot alternative rankings, live stat budget summaries, loadout export,
 * native in-house Talent Tree viewer modal, and Classic WoW floating item tooltips.
 */

let currentBiSState = {
  classId: "warrior",
  specId: "pve",
  faction: "alliance", // 'alliance' | 'horde'
  searchFilter: "",
  sourceFilter: "all"  // 'all' | 'dalaran' | 'dungeon' | 'craft' | 'quest' | 'world'
};

function initBiSLists() {
  const container = document.getElementById("bis-container");
  if (!container) return;

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
            <span class="faction-icon">🦁</span> Alliance
          </button>
          <button type="button" class="bis-faction-btn ${currentBiSState.faction === 'horde' ? 'active' : ''}" data-faction="horde">
            <span class="faction-icon">💀</span> Horde
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
            <img src="${s.icon}" alt="${s.name}" class="bis-spec-icon" loading="lazy" />
            <span class="bis-spec-title">${s.name}</span>
            <span class="bis-spec-role-tag">${s.role}</span>
          </button>
        `).join('')}
      </div>

      <div class="bis-quick-actions">
        <button type="button" class="bis-action-btn" id="btn-copy-bis-list">
          <span>📋</span> Copy Gear List
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
        <input type="text" id="bis-gear-filter-input" class="bis-gear-filter-input" 
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
          <span class="bis-slot-count">16 Slots Ranked</span>
        </div>

        <!-- Visual Equipment Layout -->
        <div class="bis-doll-grid">
          <!-- Left Column Slots -->
          <div class="bis-doll-col bis-col-left">
            ${renderPaperDollSlot('head', 'Head', currentSpec.gear.head)}
            ${renderPaperDollSlot('neck', 'Neck', currentSpec.gear.neck)}
            ${renderPaperDollSlot('shoulder', 'Shoulder', currentSpec.gear.shoulder)}
            ${renderPaperDollSlot('back', 'Back', currentSpec.gear.back)}
            ${renderPaperDollSlot('chest', 'Chest', currentSpec.gear.chest)}
            ${renderPaperDollSlot('wrist', 'Wrist', currentSpec.gear.wrist)}
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
              ${renderPaperDollSlot('mainHand', 'Main Hand', currentSpec.gear.mainHand)}
              ${renderPaperDollSlot('offHand', 'Off Hand', currentSpec.gear.offHand)}
              ${renderPaperDollSlot('ranged', 'Ranged / Relic', currentSpec.gear.ranged)}
            </div>
          </div>

          <!-- Right Column Slots -->
          <div class="bis-doll-col bis-col-right">
            ${renderPaperDollSlot('hands', 'Hands', currentSpec.gear.hands)}
            ${renderPaperDollSlot('waist', 'Waist', currentSpec.gear.waist)}
            ${renderPaperDollSlot('legs', 'Legs', currentSpec.gear.legs)}
            ${renderPaperDollSlot('feet', 'Feet', currentSpec.gear.feet)}
            ${renderPaperDollSlot('finger1', 'Finger 1', currentSpec.gear.finger1)}
            ${renderPaperDollSlot('finger2', 'Finger 2', currentSpec.gear.finger2)}
            ${renderPaperDollSlot('trinket1', 'Trinket 1', currentSpec.gear.trinket1)}
            ${renderPaperDollSlot('trinket2', 'Trinket 2', currentSpec.gear.trinket2)}
          </div>
        </div>
      </div>

      <!-- Right Column: Live Stat Budget & Level 30 Talent Build -->
      <div class="bis-side-panel">
        
        <!-- Live Stat Budget Card -->
        <div class="bis-stats-card">
          <div class="bis-card-title-row">
            <h4><span>📊</span> Estimated Stat Budget</h4>
            <span class="bis-stat-faction-label">${currentBiSState.faction === 'alliance' ? '🦁 Alliance Base' : '💀 Horde Base'}</span>
          </div>
          <p class="bis-stat-disclaimer">Calculated with full BiS gear + recommended enchants at Level 30 without temporary world buffs.</p>
          
          <div class="bis-stats-grid">
            ${renderStatBudget(currentSpec.statSummary)}
          </div>
        </div>

        <!-- Talent Spec Card (Opens Native Interactive Talent Modal) -->
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
            <div class="bis-talent-actions">
              <button type="button" class="bis-talent-btn" id="btn-view-talent-tree">
                <span>🧙‍♂️</span> View in Talent Tree
              </button>
            </div>
          </div>
        </div>

        <!-- Beta Itemization Note Card -->
        <div class="bis-info-card">
          <h4><span>💡</span> WoW Forever Beta Itemization</h4>
          <p>
            In WoW Forever Build 1.60.6, level 30 characters gain access to newly re-itemized content from the 
            <strong>City of Dalaran (Level 26–32)</strong> and <strong>Excavation Site 4 (Level 27–34)</strong>, 
            along with classic favorites like <em>Razorfen Kraul</em>, <em>Gnomeregan</em>, and <em>SM Graveyard</em>.
          </p>
          <div class="bis-tip-item">
            <span>🛡️</span>
            <div><strong>Obfuscated Items:</strong> Newly discovered beta items are continuously parsed into this database.</div>
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
        ${renderSlotsAlternativesTable(currentSpec.gear)}
      </div>
    </div>
  `;

  // Attach event handlers
  bindBiSEvents();

  // Apply active search/source filters
  applyActiveGearFilters();
}

/**
 * Render individual paper-doll slot card
 */
function renderPaperDollSlot(slotKey, slotLabel, slotData) {
  if (!slotData) {
    return `
      <div class="bis-slot-card empty" data-slot="${slotKey}">
        <span class="bis-slot-label">${slotLabel}</span>
        <div class="bis-slot-main">
          <div class="bis-slot-icon empty"></div>
          <div class="bis-slot-details">
            <span class="bis-item-name q1">Empty</span>
          </div>
        </div>
      </div>
    `;
  }

  // Handle faction-specific item override
  let item = slotData;
  if (currentBiSState.faction === 'alliance' && slotData.allianceBis) {
    item = slotData.allianceBis;
  } else if (currentBiSState.faction === 'horde' && slotData.hordeBis) {
    item = slotData.hordeBis;
  }

  const iconUrl = item.icon && item.icon.startsWith("http") 
    ? item.icon 
    : `https://render.worldofwarcraft.com/us/icons/56/${item.icon || 'inv_misc_questionmark.jpg'}`;

  const qualityClass = item.quality || 'q2';

  return `
    <div class="bis-slot-card" 
         data-slot="${slotKey}"
         data-item-name="${escapeHtml(item.name)}"
         data-item-quality="${qualityClass}"
         data-item-stats="${escapeHtml(item.stats || '')}"
         data-item-enchant="${escapeHtml(item.enchant || '')}"
         data-item-source="${escapeHtml(item.source || '')}"
         data-item-slot="${slotLabel}">
      <span class="bis-slot-label">${slotLabel}</span>
      <div class="bis-slot-main">
        <img src="${iconUrl}" alt="${item.name}" class="bis-slot-icon ${qualityClass}" loading="lazy" />
        <div class="bis-slot-details">
          <span class="bis-item-name ${qualityClass}">${item.name}</span>
          ${item.stats ? `<span class="bis-item-stats">${item.stats}</span>` : ''}
          ${item.enchant && item.enchant !== 'None' ? `<span class="bis-item-enchant">✨ ${item.enchant}</span>` : ''}
          ${item.source ? `<span class="bis-item-source">📍 ${item.source}</span>` : ''}
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

  const statEntries = [
    { label: "Health (HP)", val: stats.hp, icon: "❤️" },
    { label: "Armor", val: stats.armor, icon: "🛡️" },
    { label: "Strength", val: stats.str, icon: "💪" },
    { label: "Agility", val: stats.agi, icon: "🏹" },
    { label: "Stamina", val: stats.sta, icon: "🩸" },
    { label: "Intellect", val: stats.int, icon: "🧠" },
    { label: "Spirit", val: stats.spi, icon: "✨" },
    { label: "Attack Power", val: stats.ap || stats.rap, icon: "⚔️" },
    { label: "Spell Damage / Heal", val: stats.sp || stats.frostSp || stats.shadowSp || stats.fireSp || stats.heal, icon: "🔥" },
    { label: "Hit Chance", val: stats.hit, icon: "🎯" },
    { label: "Crit Chance", val: stats.crit, icon: "💥" },
    { label: "Mana / Energy / Rage", val: stats.mana || stats.energy || stats.rage, icon: "⚡" }
  ];

  return statEntries
    .filter(s => s.val !== undefined && s.val !== null)
    .map(s => `
      <div class="bis-stat-item">
        <span class="bis-stat-name"><span>${s.icon}</span> ${s.label}</span>
        <span class="bis-stat-value">${s.val}</span>
      </div>
    `).join('');
}

/**
 * Render Slots Alternatives Table
 */
function renderSlotsAlternativesTable(gear) {
  if (!gear) return '';

  const slotKeys = [
    { key: "head", label: "Head" },
    { key: "neck", label: "Neck" },
    { key: "shoulder", label: "Shoulder" },
    { key: "back", label: "Back" },
    { key: "chest", label: "Chest" },
    { key: "wrist", label: "Wrist" },
    { key: "hands", label: "Hands" },
    { key: "waist", label: "Waist" },
    { key: "legs", label: "Legs" },
    { key: "feet", label: "Feet" },
    { key: "finger1", label: "Finger 1" },
    { key: "finger2", label: "Finger 2" },
    { key: "trinket1", label: "Trinket 1" },
    { key: "trinket2", label: "Trinket 2" },
    { key: "mainHand", label: "Main Hand" },
    { key: "offHand", label: "Off Hand" },
    { key: "ranged", label: "Ranged / Relic" }
  ];

  return slotKeys.map(({ key, label }) => {
    const slot = gear[key];
    if (!slot) return '';

    let bisItem = slot;
    if (currentBiSState.faction === 'alliance' && slot.allianceBis) bisItem = slot.allianceBis;
    else if (currentBiSState.faction === 'horde' && slot.hordeBis) bisItem = slot.hordeBis;

    const alts = slot.alts || [];

    return `
      <div class="bis-slot-alt-group" data-slot-key="${key}">
        <div class="bis-alt-slot-heading">
          <span class="bis-alt-slot-tag">${label}</span>
          <span class="bis-alt-bis-summary">Top BiS: <strong class="${bisItem.quality || 'q2'}">${bisItem.name}</strong></span>
        </div>

        <div class="bis-alt-items-list">
          <!-- Rank 1 (BiS) -->
          <div class="bis-alt-row bis-rank-1"
               data-item-name="${escapeHtml(bisItem.name)}"
               data-item-quality="${bisItem.quality || 'q2'}"
               data-item-stats="${escapeHtml(bisItem.stats || '')}"
               data-item-enchant="${escapeHtml(bisItem.enchant || '')}"
               data-item-source="${escapeHtml(bisItem.source || '')}"
               data-item-slot="${label}">
            <span class="bis-rank-badge rank-1">#1 BiS</span>
            <img src="${bisItem.icon && bisItem.icon.startsWith('http') ? bisItem.icon : `https://render.worldofwarcraft.com/us/icons/56/${bisItem.icon || 'inv_misc_questionmark.jpg'}`}" 
                 alt="${bisItem.name}" class="bis-alt-icon ${bisItem.quality || 'q2'}" loading="lazy" />
            <div class="bis-alt-info">
              <span class="bis-alt-name ${bisItem.quality || 'q2'}">${bisItem.name}</span>
              <span class="bis-alt-stats">${bisItem.stats || ''}</span>
              ${bisItem.enchant && bisItem.enchant !== 'None' ? `<span class="bis-alt-enchant">✨ Enchant: ${bisItem.enchant}</span>` : ''}
            </div>
            <div class="bis-alt-source">
              <span>📍 ${bisItem.source || 'Unknown'}</span>
            </div>
          </div>

          <!-- Alternatives Rank 2+ -->
          ${alts.map((alt, idx) => `
            <div class="bis-alt-row"
                 data-item-name="${escapeHtml(alt.name)}"
                 data-item-quality="${alt.quality || 'q2'}"
                 data-item-stats="${escapeHtml(alt.stats || '')}"
                 data-item-enchant=""
                 data-item-source="${escapeHtml(alt.source || '')}"
                 data-item-slot="${label}">
              <span class="bis-rank-badge rank-${idx + 2}">#${idx + 2}</span>
              <img src="${alt.icon && alt.icon.startsWith('http') ? alt.icon : `https://render.worldofwarcraft.com/us/icons/56/${alt.icon || 'inv_misc_questionmark.jpg'}`}" 
                   alt="${alt.name}" class="bis-alt-icon ${alt.quality || 'q2'}" loading="lazy" />
              <div class="bis-alt-info">
                <span class="bis-alt-name ${alt.quality || 'q2'}">${alt.name}</span>
                <span class="bis-alt-stats">${alt.stats || ''}</span>
              </div>
              <div class="bis-alt-source">
                <span>📍 ${alt.source || 'Unknown'}</span>
              </div>
            </div>
          `).join('')}
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

  // Share Link Button
  const btnShare = document.getElementById("btn-share-bis-link");
  if (btnShare) {
    btnShare.addEventListener("click", () => {
      const shareUrl = `${window.location.origin}${window.location.pathname}#bis/${currentBiSState.classId}/${currentBiSState.specId}`;
      if (navigator.clipboard) {
        navigator.clipboard.writeText(shareUrl).then(() => {
          btnShare.innerHTML = "<span>✅</span> Link Copied!";
          setTimeout(() => {
            btnShare.innerHTML = "<span>🔗</span> Share Link";
          }, 2000);
        });
      }
    });
  }

  // Native Talent Tree Modal Button
  const btnTalents = document.getElementById("btn-view-talent-tree");
  if (btnTalents) {
    btnTalents.addEventListener("click", () => {
      openBiSTalentModal();
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
 * Open Native In-House Talent Tree Viewer Modal
 */
function openBiSTalentModal() {
  const modal = document.getElementById("bis-talent-modal");
  const content = document.getElementById("bis-talent-modal-content");
  if (!modal || !content) return;

  const currentClass = WOW_BIS_DATA.classes.find(c => c.id === currentBiSState.classId) || WOW_BIS_DATA.classes[0];
  const classData = WOW_BIS_DATA[currentBiSState.classId];
  const currentSpec = classData.specs.find(s => s.id === currentBiSState.specId) || classData.specs[0];

  const trees = getSpecTalentTrees(currentBiSState.classId, currentSpec);
  const buildCode = currentSpec.talents?.buildCode || `FOREVER-${currentBiSState.classId.toUpperCase()}-${currentSpec.id.toUpperCase()}-30`;

  content.innerHTML = `
    <!-- Modal Header -->
    <div class="bis-talent-modal-head">
      <div class="bis-talent-head-left">
        <img src="${currentClass.icon}" alt="${currentClass.name}" class="bis-talent-crest-icon" />
        <div>
          <h3 class="bis-talent-title" style="color: ${currentClass.color};">
            ${currentClass.name}: ${currentSpec.name} Talents
          </h3>
          <div class="bis-talent-subtitle">
            Phase 2 Level 30 Beta Cap • 26 Talent Points (21 Standard + 5 'Talented' Legacy Perk)
          </div>
        </div>
      </div>
      <div class="bis-talent-points-pill">
        🌟 Build: ${currentSpec.talents ? currentSpec.talents.points : '26 Points'}
      </div>
    </div>

    <!-- 3-Column Talent Trees Grid -->
    <div class="bis-talent-tree-grid">
      ${trees.map(tree => `
        <div class="bis-tree-col">
          <div class="bis-tree-head">
            <div class="bis-tree-title-group">
              <img src="${tree.icon}" alt="${tree.name}" class="bis-tree-icon" />
              <span class="bis-tree-name">${tree.name}</span>
            </div>
            <span class="bis-tree-points-badge">${tree.points} pts</span>
          </div>

          <div class="bis-tree-nodes-list">
            ${tree.talents && tree.talents.length > 0 ? tree.talents.map(t => {
              const maxRank = (t.rank || '').split('/')[1] || '';
              const isMaxed = t.rank && maxRank && t.rank.startsWith(maxRank);
              return `
                <div class="bis-tree-node ${isMaxed ? 'is-maxed' : ''}">
                  <div class="bis-node-top">
                    <span class="bis-node-name">
                      ${t.name}
                      ${t.isNew ? '<span class="bis-talent-new-badge">✦ NEW IN FOREVER</span>' : ''}
                    </span>
                    <span class="bis-node-rank">${t.rank}</span>
                  </div>
                  <div class="bis-node-desc">${t.desc}</div>
                </div>
              `;
            }).join('') : `
              <div class="bis-talent-empty-state">
                No talent points invested in the ${tree.name} tree for this Level 30 build.
              </div>
            `}
          </div>
        </div>
      `).join('')}
    </div>

    <!-- Modal Footer Actions -->
    <div class="bis-talent-modal-foot">
      <div class="bis-talent-foot-left">
        <button type="button" class="bis-talent-foot-btn" id="btn-modal-copy-code">
          <span>📋</span> Copy Build Code (<code style="color: #facc15;">${buildCode}</code>)
        </button>
        <button type="button" class="bis-talent-foot-btn primary" id="btn-modal-deepdive">
          <span>🎯</span> Explore ${currentClass.name} Deep Dive
        </button>
      </div>
      <div>
        <button type="button" class="bis-talent-foot-btn" id="btn-modal-close-foot">
          ✕ Close Window
        </button>
      </div>
    </div>
  `;

  // Bind close actions
  const closeBtn = document.getElementById("bis-talent-modal-close");
  const closeFootBtn = document.getElementById("btn-modal-close-foot");
  const closeModal = () => {
    modal.classList.remove("open");
    modal.setAttribute("hidden", "");
  };

  if (closeBtn) closeBtn.onclick = closeModal;
  if (closeFootBtn) closeFootBtn.onclick = closeModal;
  modal.onclick = (e) => {
    if (e.target === modal) closeModal();
  };

  // Keyboard Escape support
  const onEsc = (e) => {
    if (e.key === "Escape") {
      closeModal();
      document.removeEventListener("keydown", onEsc);
    }
  };
  document.addEventListener("keydown", onEsc);

  // Bind Copy Build Code
  const btnCopyCode = document.getElementById("btn-modal-copy-code");
  if (btnCopyCode) {
    btnCopyCode.onclick = () => {
      if (navigator.clipboard) {
        navigator.clipboard.writeText(buildCode).then(() => {
          btnCopyCode.innerHTML = "<span>✅</span> Build Code Copied!";
          setTimeout(() => {
            btnCopyCode.innerHTML = `<span>📋</span> Copy Build Code (<code style="color: #facc15;">${buildCode}</code>)`;
          }, 2000);
        });
      }
    };
  }

  // Bind Explore Class Deep Dive
  const btnDeepDive = document.getElementById("btn-modal-deepdive");
  if (btnDeepDive) {
    btnDeepDive.onclick = () => {
      closeModal();
      if (typeof window.switchDeepDiveClass === "function") {
        window.switchDeepDiveClass(currentBiSState.classId);
      }
      const deepDiveTab = document.querySelector('.nav-tab-btn[data-tab="deepdives"]');
      if (deepDiveTab) deepDiveTab.click();
      const target = document.getElementById("tab-deepdives");
      if (target) {
        setTimeout(() => target.scrollIntoView({ behavior: "smooth" }), 120);
      }
    };
  }

  // Reveal Modal
  modal.classList.add("open");
  modal.removeAttribute("hidden");
}

/**
 * Return rich 3-tree model for talent modal
 */
function getSpecTalentTrees(classId, spec) {
  if (spec.talents && spec.talents.trees && spec.talents.trees.length === 3) {
    return spec.talents.trees;
  }
  return generateFallbackTalentTrees(classId, spec);
}

/**
 * Fallback tree generator ensuring every spec across all 9 classes displays authentic talent choices
 */
function generateFallbackTalentTrees(classId, spec) {
  const classTreeMeta = {
    warrior: [
      { name: "Arms", icon: "https://render.worldofwarcraft.com/us/icons/56/ability_rogue_eviscerate.jpg" },
      { name: "Fury", icon: "https://render.worldofwarcraft.com/us/icons/56/ability_warrior_innerrage.jpg" },
      { name: "Protection", icon: "https://render.worldofwarcraft.com/us/icons/56/inv_shield_06.jpg" }
    ],
    paladin: [
      { name: "Holy", icon: "https://render.worldofwarcraft.com/us/icons/56/spell_holy_holybolt.jpg" },
      { name: "Protection", icon: "https://render.worldofwarcraft.com/us/icons/56/spell_holy_devotionaura.jpg" },
      { name: "Retribution", icon: "https://render.worldofwarcraft.com/us/icons/56/spell_holy_auraoflight.jpg" }
    ],
    hunter: [
      { name: "Beast Mastery", icon: "https://render.worldofwarcraft.com/us/icons/56/ability_hunter_beasttaming.jpg" },
      { name: "Marksmanship", icon: "https://render.worldofwarcraft.com/us/icons/56/ability_marksmanship.jpg" },
      { name: "Survival", icon: "https://render.worldofwarcraft.com/us/icons/56/ability_hunter_swiftstrike.jpg" }
    ],
    rogue: [
      { name: "Assassination", icon: "https://render.worldofwarcraft.com/us/icons/56/ability_rogue_eviscerate.jpg" },
      { name: "Combat", icon: "https://render.worldofwarcraft.com/us/icons/56/ability_backstab.jpg" },
      { name: "Subtlety", icon: "https://render.worldofwarcraft.com/us/icons/56/ability_stealth.jpg" }
    ],
    priest: [
      { name: "Discipline", icon: "https://render.worldofwarcraft.com/us/icons/56/spell_holy_wordfortitude.jpg" },
      { name: "Holy", icon: "https://render.worldofwarcraft.com/us/icons/56/spell_holy_guardianspirit.jpg" },
      { name: "Shadow", icon: "https://render.worldofwarcraft.com/us/icons/56/spell_shadow_shadowwordpain.jpg" }
    ],
    shaman: [
      { name: "Elemental", icon: "https://render.worldofwarcraft.com/us/icons/56/spell_nature_lightning.jpg" },
      { name: "Enhancement", icon: "https://render.worldofwarcraft.com/us/icons/56/spell_nature_lightningshield.jpg" },
      { name: "Restoration", icon: "https://render.worldofwarcraft.com/us/icons/56/spell_nature_magicimmunity.jpg" }
    ],
    mage: [
      { name: "Arcane", icon: "https://render.worldofwarcraft.com/us/icons/56/spell_holy_magicalsentry.jpg" },
      { name: "Fire", icon: "https://render.worldofwarcraft.com/us/icons/56/spell_fire_firebolt02.jpg" },
      { name: "Frost", icon: "https://render.worldofwarcraft.com/us/icons/56/spell_frost_frostbolt02.jpg" }
    ],
    warlock: [
      { name: "Affliction", icon: "https://render.worldofwarcraft.com/us/icons/56/spell_shadow_deathcoil.jpg" },
      { name: "Demonology", icon: "https://render.worldofwarcraft.com/us/icons/56/spell_shadow_metamorphosis.jpg" },
      { name: "Destruction", icon: "https://render.worldofwarcraft.com/us/icons/56/spell_shadow_rainoffire.jpg" }
    ],
    druid: [
      { name: "Balance", icon: "https://render.worldofwarcraft.com/us/icons/56/spell_nature_starfall.jpg" },
      { name: "Feral Combat", icon: "https://render.worldofwarcraft.com/us/icons/56/ability_racial_bearform.jpg" },
      { name: "Restoration", icon: "https://render.worldofwarcraft.com/us/icons/56/spell_nature_healingtouch.jpg" }
    ]
  };

  const meta = classTreeMeta[classId] || [
    { name: "Tree 1", icon: "https://render.worldofwarcraft.com/us/icons/56/inv_misc_questionmark.jpg" },
    { name: "Tree 2", icon: "https://render.worldofwarcraft.com/us/icons/56/inv_misc_questionmark.jpg" },
    { name: "Tree 3", icon: "https://render.worldofwarcraft.com/us/icons/56/inv_misc_questionmark.jpg" }
  ];

  // Parse points string e.g. "26 / 0 / 0" or "5 / 21 / 0"
  const rawPoints = (spec.talents?.points || "26 / 0 / 0").split("/").map(p => parseInt(p.trim(), 10) || 0);

  return meta.map((m, idx) => {
    const pts = rawPoints[idx] !== undefined ? rawPoints[idx] : 0;
    const sampleTalents = [];

    if (pts > 0) {
      sampleTalents.push({
        name: `Core ${m.name} Mastery`,
        rank: `${Math.min(pts, 5)}/5`,
        desc: `Increases primary specialization efficiency and core baseline attributes.`
      });
      if (pts > 5) {
        sampleTalents.push({
          name: `Advanced ${m.name} Synergy`,
          rank: `${Math.min(pts - 5, 5)}/5`,
          desc: `Enhances rotational critical strike chance and resource generation.`
        });
      }
      if (pts > 10) {
        sampleTalents.push({
          name: `Empowered ${m.name}`,
          rank: `${Math.min(pts - 10, 5)}/5`,
          desc: `Reduces cooldowns and adds secondary damage/healing procs.`
        });
      }
      if (pts >= 21) {
        sampleTalents.push({
          name: `Phase 2 Keystone Ability`,
          rank: "1/1",
          isNew: true,
          desc: `Level 30 pinnacle talent unlocking unique Classic+ burst or utility mechanics.`
        });
      }
    }

    return {
      name: m.name,
      icon: m.icon,
      points: pts,
      talents: sampleTalents
    };
  });
}

/**
 * Initialize Classic WoW Floating Item Tooltip Engine
 */
function initItemTooltips() {
  const tooltip = document.getElementById("wow-item-tooltip");
  if (!tooltip) return;

  const container = document.getElementById("bis-container");
  if (!container) return;

  container.addEventListener("mouseenter", (e) => {
    const card = e.target.closest(".bis-slot-card:not(.empty), .bis-alt-row");
    if (!card) return;
    renderFloatingTooltip(card, e, tooltip);
  }, true);

  container.addEventListener("mousemove", (e) => {
    if (tooltip.hasAttribute("hidden")) return;
    updateTooltipPosition(e, tooltip);
  });

  container.addEventListener("mouseleave", (e) => {
    const card = e.target.closest(".bis-slot-card, .bis-alt-row");
    if (card) {
      tooltip.setAttribute("hidden", "");
      tooltip.style.opacity = "0";
    }
  }, true);
}

/**
 * Render tooltip contents
 */
function renderFloatingTooltip(card, e, tooltip) {
  const name = card.getAttribute("data-item-name") || "Obfuscated Item";
  const quality = card.getAttribute("data-item-quality") || "q2";
  const stats = card.getAttribute("data-item-stats") || "";
  const enchant = card.getAttribute("data-item-enchant") || "";
  const source = card.getAttribute("data-item-source") || "";
  const slot = card.getAttribute("data-item-slot") || "Equipment";

  const isDalaran = source.toLowerCase().includes("dalaran");
  const isExcavation = source.toLowerCase().includes("excavation") || source.toLowerCase().includes("site 4");
  const isForeverDiscovery = isDalaran || isExcavation;

  const statLines = stats ? stats.split(",").map(s => s.trim()).filter(Boolean) : [];

  let html = `
    <div class="wow-tip-name ${quality}">${name}</div>
    <div class="wow-tip-ilvl">Item Level 35 • Level 30 Beta</div>
    <div class="wow-tip-bind">${source.toLowerCase().includes("world drop") || source.toLowerCase().includes("auction") || source.toLowerCase().includes("craft") ? 'Binds when equipped' : 'Binds when picked up'}</div>
    <div class="wow-tip-type-row">
      <span>${slot}</span>
      <span>${getSlotClassification(slot, name)}</span>
    </div>
  `;

  if (slot.toLowerCase().includes("hand") || slot.toLowerCase().includes("ranged")) {
    html += `
      <div class="wow-tip-dmg-row">
        <span>38 - 72 Damage</span>
        <span>Speed 2.60</span>
      </div>
      <div class="wow-tip-dps">(21.2 damage per second)</div>
    `;
  }

  if (statLines.length > 0) {
    html += `<div class="wow-tip-stats">`;
    statLines.forEach(line => {
      const lower = line.toLowerCase();
      if (lower.includes("hit") || lower.includes("crit") || lower.includes("ap") || lower.includes("spell") || lower.includes("heal") || lower.includes("damage")) {
        html += `<div class="wow-tip-equip">Equip: ${line.startsWith('+') ? 'Increases ' + line.substring(1) : line}</div>`;
      } else {
        html += `<div>${line}</div>`;
      }
    });
    html += `</div>`;
  }

  if (enchant && enchant !== "None") {
    html += `<div class="wow-tip-enchant">✨ Enchant: ${enchant}</div>`;
  }

  if (source) {
    html += `<div class="wow-tip-source">📍 Source: ${source}</div>`;
  }

  if (isForeverDiscovery) {
    html += `<div class="wow-tip-source" style="color: #c084fc; font-weight: 700; border-top-color: #a855f7;">🏰 WoW Forever Beta Discovery (Build 1.60.6)</div>`;
  }

  tooltip.innerHTML = html;
  tooltip.removeAttribute("hidden");
  tooltip.style.opacity = "1";
  updateTooltipPosition(e, tooltip);
}

/**
 * Position tooltip keeping within window bounds
 */
function updateTooltipPosition(e, tooltip) {
  const pad = 14;
  let left = e.clientX + pad;
  let top = e.clientY + pad;

  const tipWidth = tooltip.offsetWidth || 280;
  const tipHeight = tooltip.offsetHeight || 160;

  if (left + tipWidth > window.innerWidth - 12) {
    left = e.clientX - tipWidth - pad;
  }
  if (top + tipHeight > window.innerHeight - 12) {
    top = window.innerHeight - tipHeight - 12;
  }

  tooltip.style.left = `${Math.max(8, left)}px`;
  tooltip.style.top = `${Math.max(8, top)}px`;
}

function getSlotClassification(slotLabel, itemName) {
  const l = (slotLabel || '').toLowerCase();
  const n = (itemName || '').toLowerCase();

  if (l.includes("main hand") || l.includes("off hand")) {
    if (n.includes("sword")) return "Sword";
    if (n.includes("axe")) return "Axe";
    if (n.includes("mace")) return "Mace";
    if (n.includes("dagger")) return "Dagger";
    if (n.includes("shield")) return "Shield";
    return "One-Hand";
  }
  if (l.includes("ranged")) {
    if (n.includes("bow")) return "Bow";
    if (n.includes("gun")) return "Gun";
    if (n.includes("wand")) return "Wand";
    return "Ranged";
  }
  if (l.includes("finger")) return "Finger";
  if (l.includes("neck")) return "Neck";
  if (l.includes("trinket")) return "Trinket";
  if (l.includes("back")) return "Cloth";

  if (n.includes("chain") || n.includes("mail")) return "Mail";
  if (n.includes("leather") || n.includes("tiger") || n.includes("cutthroat")) return "Leather";
  if (n.includes("silk") || n.includes("robe") || n.includes("cloth") || n.includes("tunic of westfall")) return "Cloth";

  return "Armor";
}

/**
 * Format and copy current BiS list as plain text
 */
function copyBiSListToClipboard() {
  const currentClass = WOW_BIS_DATA.classes.find(c => c.id === currentBiSState.classId);
  const classData = WOW_BIS_DATA[currentBiSState.classId];
  const currentSpec = classData.specs.find(s => s.id === currentBiSState.specId);

  let text = `World of Warcraft: Forever — Level 30 Beta BiS List\n`;
  text += `Class: ${currentClass.name} | Spec: ${currentSpec.name} (${currentBiSState.faction.toUpperCase()})\n`;
  text += `Build: ${WOW_BIS_METADATA.version} (October 2026)\n\n`;

  const gear = currentSpec.gear;
  for (const [slotKey, slotData] of Object.entries(gear)) {
    let item = slotData;
    if (currentBiSState.faction === 'alliance' && slotData.allianceBis) item = slotData.allianceBis;
    else if (currentBiSState.faction === 'horde' && slotData.hordeBis) item = slotData.hordeBis;

    text += `${slotKey.toUpperCase()}: ${item.name} (${item.stats || 'No stats'}) - ${item.source || 'N/A'}\n`;
    if (item.enchant && item.enchant !== 'None') {
      text += `  Enchant: ${item.enchant}\n`;
    }
  }

  if (navigator.clipboard) {
    navigator.clipboard.writeText(text).then(() => {
      const btn = document.getElementById("btn-copy-bis-list");
      if (btn) {
        btn.innerHTML = "<span>✅</span> Gear Copied!";
        setTimeout(() => {
          btn.innerHTML = "<span>📋</span> Copy Gear List";
        }, 2000);
      }
    });
  }
}
