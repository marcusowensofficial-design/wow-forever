/**
 * World of Warcraft: Forever - Hidden Items & Obfuscation Tracker Module
 * Tracks Blizzard's anti-datamining item obfuscation, 3D flip card,
 * and live beta discovery feeds.
 */

function initHiddenItemsTracker() {
  const container = document.getElementById('hidden-items-tracker-container');
  if (!container) return;

  renderHiddenItemsUI();
}

function renderHiddenItemsUI() {
  const container = document.getElementById('hidden-items-tracker-container');
  if (!container) return;

  const dataset = window.WOW_TOOLS_DATA?.hiddenItems;
  if (!dataset) return;

  const stats = dataset.stats;
  const demo = dataset.demoItem;

  container.innerHTML = `
    <!-- Top Progress Overview -->
    <div class="hi-hero-card">
      <div class="hi-hero-text">
        <span class="hi-badge-alert">BlizzCon Anti-Datamining System</span>
        <h3 class="hi-hero-title">The Items Blizzard is Hiding in WoW Forever</h3>
        <p class="hi-hero-desc">
          To preserve the authentic sense of discovery, Blizzard stripped the names and stats of thousands of items from client files. In WoW Forever, you won't enter raid tiers with pre-calculated BiS lists—item stats remain completely hidden on the client until someone on your server loots them!
        </p>
      </div>

      <div class="hi-progress-block">
        <div class="hi-progress-label-row">
          <span>New Forever Items Revealed</span>
          <strong>${stats.revealedNewItems} / ${stats.totalNewItems} (${stats.revealedPercent}%)</strong>
        </div>
        <div class="hi-progress-bar-track">
          <div class="hi-progress-bar-fill" style="width: ${stats.revealedPercent}%;"></div>
        </div>
        <div class="hi-stats-mini-grid">
          <div><span>Classic Items Preserved:</span> <strong>${stats.classicRevealed} / ${stats.classicItemsHidden}</strong></div>
          <div><span>SoD Assets Deprecated:</span> <strong>${stats.sodLeftovers}</strong></div>
          <div><span>Updated:</span> <strong>${stats.lastUpdated}</strong></div>
        </div>
      </div>
    </div>

    <!-- 3D FLIP CARD DEMO -->
    <div class="hi-flip-section">
      <div class="hi-flip-intro">
        <h4>Interactive Discovery: Flip the Obfuscated Item</h4>
        <p>Click the card below to see what the client files look like before and after a player loots the item in the beta.</p>
      </div>

      <div class="hi-flip-container" id="hi-flip-card" onclick="toggleItemFlip()">
        <div class="hi-flipper">
          <!-- FRONT: OBFUSCATED -->
          <div class="hi-card-face hi-card-front">
            <div class="hi-client-label">Client Files (Before Looting)</div>
            <div class="hi-item-header">
              <img src="${demo.icon}" alt="" class="hi-item-icon" />
              <div>
                <strong class="hi-retrieving-text">Retrieving item information...</strong>
                <span class="hi-meta-sub">Item ID: ${demo.id}</span>
              </div>
            </div>
            <div class="hi-item-body">
              <div class="hi-body-line"><span>${demo.hidden.slot}</span><span>${demo.hidden.type}</span></div>
              <div class="hi-body-notice">⚠️ Stats & Name are server-side only.</div>
            </div>
            <div class="hi-card-footer">👆 Click or Tap to Reveal In-Game Tooltip</div>
          </div>

          <!-- BACK: REVEALED -->
          <div class="hi-card-face hi-card-back">
            <div class="hi-client-label in-game">Confirmed In-Game (Build 1.60.6)</div>
            <div class="hi-item-header">
              <img src="${demo.icon}" alt="" class="hi-item-icon" />
              <div>
                <strong class="hi-item-title ${demo.revealed.qualityClass}">${demo.revealed.name}</strong>
                <span class="hi-meta-sub">Item Level ${demo.revealed.iLvl} • ${demo.revealed.quality}</span>
              </div>
            </div>
            <div class="hi-item-body">
              <div class="hi-body-line"><span>${demo.revealed.binding}</span></div>
              <div class="hi-body-line"><span>${demo.revealed.slot}</span></div>
              ${demo.revealed.stats.map(s => `<div class="hi-body-line"><span>${s}</span></div>`).join('')}
              <div class="hi-body-line effect"><span>${demo.revealed.equipEffect}</span></div>
              <div class="hi-body-line effect"><span>${demo.revealed.useEffect}</span></div>
              <div class="hi-body-line price"><span>Sell Price: ${demo.revealed.sellPrice}</span></div>
            </div>
            <div class="hi-card-footer">👆 Click to Flip Back to Obfuscated File</div>
          </div>
        </div>
      </div>
    </div>

    <!-- OBFUSCATION LIFECYCLE STEPS -->
    <div class="hi-lifecycle-grid">
      <div class="hi-step-card">
        <span class="hi-step-num">1</span>
        <strong>In Client Files</strong>
        <p>Item icon and slot type only. Names, stats, effects, and item levels are completely stripped.</p>
      </div>
      <div class="hi-step-card">
        <span class="hi-step-num">2</span>
        <strong>Server Query</strong>
        <p>When a player loots the item or inspects a mob, the client queries Blizzard's realm server.</p>
      </div>
      <div class="hi-step-card">
        <span class="hi-step-num">3</span>
        <strong>Local WDB Cache</strong>
        <p>The server returns true stats and caches them in the player's local <code>WDB/itemcache.wdb</code>.</p>
      </div>
      <div class="hi-step-card">
        <span class="hi-step-num">4</span>
        <strong>Community Confirmed</strong>
        <p>Cache telemetry aggregates across all beta testers to confirm stats on our community portal!</p>
      </div>
    </div>

    <!-- RECENTLY REVEALED DROPS -->
    <div class="hi-reveals-table-wrap">
      <h4 class="hi-table-title">Recent Phase 2 Confirmed Drops (Excavation Site 4 & Dalaran)</h4>
      <div class="hi-reveals-grid">
        ${dataset.recentReveals.map(item => `
          <div class="hi-drop-chip">
            <img src="${item.icon}" alt="${item.name}" class="hi-drop-icon" />
            <div class="hi-drop-info">
              <strong class="${item.quality}">${item.name}</strong>
              <div class="hi-drop-meta">
                <span>iLvl ${item.iLvl}</span> • <span>${item.slot}</span>
              </div>
              <small class="hi-drop-source">📍 ${item.source}</small>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

window.toggleItemFlip = function() {
  const card = document.getElementById('hi-flip-card');
  if (card) {
    card.classList.toggle('is-flipped');
  }
};

window.initHiddenItemsTracker = initHiddenItemsTracker;
