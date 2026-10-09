/**
 * World of Warcraft: Forever - Beta BiS Lists Module
 * Handles class and spec navigation, faction switching, interactive gear paper-doll,
 * slot-by-slot alternative rankings, live stat budget summaries, and loadout export.
 */

let currentBiSState = {
  classId: "warrior",
  specId: "pve",
  faction: "alliance" // 'alliance' | 'horde'
};

function initBiSLists() {
  const container = document.getElementById("bis-container");
  if (!container) return;

  // Listen to hash changes if user navigated to #bis or #bis/class/spec
  handleBiSHashRouting();
  window.addEventListener("hashchange", handleBiSHashRouting);

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

        <!-- Talent Spec Card -->
        <div class="bis-talents-card">
          <div class="bis-card-title-row">
            <h4><span>🌟</span> Recommended Talents (Lvl 30)</h4>
            <span class="bis-points-badge">26 Talent Points</span>
          </div>
          <p class="bis-talents-desc">
            ${currentSpec.talents ? currentSpec.talents.summary : 'Level 30 standard tree build.'}
          </p>
          <div class="bis-talents-meta">
            <span class="bis-perk-note">✨ Includes +5 points from the <em>Talented</em> Legacy Perk!</span>
            <div class="bis-talent-actions">
              <a href="${currentSpec.talents ? currentSpec.talents.url : '#'}" target="_blank" rel="noopener" class="bis-talent-btn">
                <span>🧙</span> View in Talent Tree
              </a>
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
}

/**
 * Render individual paper-doll slot card
 */
function renderPaperDollSlot(slotKey, slotLabel, slotData) {
  if (!slotData) {
    return `
      <div class="bis-slot-card empty">
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
    <div class="bis-slot-card" data-slot="${slotKey}">
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
    { label: "Spell Damage / Heal", val: stats.sp || stats.frostSp || stats.shadowSp || stats.heal, icon: "🔥" },
    { label: "Hit Chance", val: stats.hit, icon: "🎯" },
    { label: "Crit Chance", val: stats.crit, icon: "💥" },
    { label: "Mana / Energy", val: stats.mana || stats.energy, icon: "⚡" }
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
      <div class="bis-slot-alt-group">
        <div class="bis-alt-slot-heading">
          <span class="bis-alt-slot-tag">${label}</span>
          <span class="bis-alt-bis-summary">Top BiS: <strong class="${bisItem.quality || 'q2'}">${bisItem.name}</strong></span>
        </div>

        <div class="bis-alt-items-list">
          <!-- Rank 1 (BiS) -->
          <div class="bis-alt-row bis-rank-1">
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
            <div class="bis-alt-row">
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
