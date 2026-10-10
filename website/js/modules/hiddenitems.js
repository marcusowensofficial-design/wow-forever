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
    <div class="hidden-items-banner">
      <div class="hi-hero-text">
        <span style="background: rgba(192, 132, 252, 0.2); border: 1px solid #c084fc; color: #e9d5ff; padding: 0.2rem 0.6rem; border-radius: 4px; font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em;">
          BlizzCon Anti-Datamining System
        </span>
        <h3 style="color: #fff; font-size: 1.4rem; margin: 0.5rem 0 0.35rem; font-family: var(--font-heading);">
          The Items Blizzard is Hiding in WoW Forever
        </h3>
        <p style="color: #cbd5e1; font-size: 0.9rem; line-height: 1.55; max-width: 850px; margin: 0 0 1rem;">
          To preserve the authentic sense of exploration, Blizzard stripped the names, item levels, and stats of thousands of items from client files. In WoW Forever, item stats remain obfuscated on the client until a player on your realm loots and binds them!
        </p>
      </div>

      <div style="margin-top: 1rem;">
        <div style="display: flex; justify-content: space-between; font-size: 0.85rem; color: #e9d5ff; margin-bottom: 0.35rem;">
          <span>New Forever Items Revealed</span>
          <strong>${stats.revealedNewItems} / ${stats.totalNewItems} (${stats.revealedPercent}%)</strong>
        </div>
        <div class="hidden-progress-bar-container">
          <div class="hidden-progress-fill" style="width: ${stats.revealedPercent}%;"></div>
          <span class="hidden-progress-text">${stats.revealedPercent}% Discovered Across Realms</span>
        </div>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 0.75rem; margin-top: 1rem; font-size: 0.8rem; color: #94a3b8; background: rgba(0,0,0,0.3); padding: 0.75rem; border-radius: 8px;">
          <div><span>Classic Items Preserved:</span> <strong style="color: #fff;">${stats.classicRevealed} / ${stats.classicItemsHidden}</strong></div>
          <div><span>SoD Assets Deprecated:</span> <strong style="color: #fff;">${stats.sodLeftovers}</strong></div>
          <div><span>Cache Snapshot:</span> <strong style="color: #c084fc;">${stats.lastUpdated}</strong></div>
        </div>
      </div>
    </div>

    <!-- 3D FLIP CARD DEMO -->
    <div style="background: rgba(13, 17, 26, 0.85); border: 1px solid var(--border-subtle); border-radius: var(--radius-lg); padding: 1.75rem; margin-bottom: 2rem;">
      <div style="text-align: center; margin-bottom: 1rem;">
        <h4 style="color: var(--text-gold); font-size: 1.15rem; margin: 0 0 0.35rem;">Interactive Discovery: Flip the Obfuscated Item</h4>
        <p style="color: #94a3b8; font-size: 0.85rem; max-width: 600px; margin: 0 auto;">
          Hover or tap the card below to see what the client files look like before and after a player loots the item in the closed beta.
        </p>
      </div>

      <div class="flip-card-stage" id="hi-flip-card" onclick="toggleItemFlip()">
        <div class="flip-card-inner" id="hi-flipper-inner">
          <!-- FRONT: OBFUSCATED -->
          <div class="flip-card-front" style="display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="font-size: 0.72rem; text-transform: uppercase; letter-spacing: 0.05em; color: #ef4444; font-weight: 700; margin-bottom: 0.5rem;">
                Client Files (Pre-Loot)
              </div>
              <div style="display: flex; gap: 0.75rem; align-items: center;">
                <img src="${demo.icon}" alt="" style="width: 44px; height: 44px; border-radius: 6px; border: 1px solid #ef4444; object-fit: cover;" />
                <div>
                  <div class="flip-card-obfuscated-text" style="margin: 0; font-weight: 700;">Retrieving item information...</div>
                  <span style="font-size: 0.75rem; color: #94a3b8;">Item ID: ${demo.id}</span>
                </div>
              </div>
              <div style="margin-top: 0.85rem; font-size: 0.82rem; color: #cbd5e1; display: flex; justify-content: space-between;">
                <span>${demo.hidden.slot}</span>
                <span>${demo.hidden.type}</span>
              </div>
              <div style="margin-top: 0.5rem; font-size: 0.78rem; color: #f87171; background: rgba(239, 68, 68, 0.1); padding: 0.4rem; border-radius: 4px;">
                ⚠️ Stats, bonuses & name stripped from client.
              </div>
            </div>
            <div style="font-size: 0.72rem; color: #64748b; text-align: center;">
              👆 Tap / Hover to Reveal Looted Tooltip
            </div>
          </div>

          <!-- BACK: REVEALED -->
          <div class="flip-card-back" style="display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="font-size: 0.72rem; text-transform: uppercase; letter-spacing: 0.05em; color: #38bdf8; font-weight: 700; margin-bottom: 0.5rem;">
                Confirmed In-Game (Build 1.60.6)
              </div>
              <div style="display: flex; gap: 0.75rem; align-items: center;">
                <img src="${demo.icon}" alt="" style="width: 44px; height: 44px; border-radius: 6px; border: 1px solid #38bdf8; object-fit: cover;" />
                <div>
                  <div style="color: #0070dd; font-weight: 700; font-size: 0.95rem;">${demo.revealed.name}</div>
                  <span style="font-size: 0.75rem; color: #94a3b8;">Item Level ${demo.revealed.iLvl} • ${demo.revealed.quality}</span>
                </div>
              </div>
              <div style="margin-top: 0.75rem; font-size: 0.8rem; color: #e2e8f0; display: flex; flex-direction: column; gap: 0.2rem;">
                <div>${demo.revealed.binding} • ${demo.revealed.slot}</div>
                ${demo.revealed.stats.map(s => `<div style="color: #fff;">${s}</div>`).join('')}
                <div style="color: #10b981; font-size: 0.76rem;">${demo.revealed.equipEffect}</div>
              </div>
            </div>
            <div style="font-size: 0.72rem; color: #64748b; text-align: center;">
              👆 Tap to Flip Back to Obfuscated File
            </div>
          </div>
        </div>
      </div>

      <!-- OBFUSCATION LIFECYCLE STEPS -->
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1rem; margin-top: 2rem;">
        <div style="background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.07); border-radius: 8px; padding: 1rem;">
          <span style="display: inline-block; width: 22px; height: 22px; border-radius: 50%; background: #ef4444; color: #fff; text-align: center; line-height: 22px; font-size: 0.75rem; font-weight: 800; margin-bottom: 0.4rem;">1</span>
          <strong style="display: block; color: #fff; font-size: 0.9rem;">In Client Files</strong>
          <p style="font-size: 0.8rem; color: var(--text-muted); margin-top: 0.25rem; line-height: 1.4;">Icon and slot type only. Names, stats, effects, and item levels are completely stripped.</p>
        </div>
        <div style="background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.07); border-radius: 8px; padding: 1rem;">
          <span style="display: inline-block; width: 22px; height: 22px; border-radius: 50%; background: #f59e0b; color: #fff; text-align: center; line-height: 22px; font-size: 0.75rem; font-weight: 800; margin-bottom: 0.4rem;">2</span>
          <strong style="display: block; color: #fff; font-size: 0.9rem;">Server Query</strong>
          <p style="font-size: 0.8rem; color: var(--text-muted); margin-top: 0.25rem; line-height: 1.4;">When a player loots the item or inspects a mob, the client queries Blizzard's realm server.</p>
        </div>
        <div style="background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.07); border-radius: 8px; padding: 1rem;">
          <span style="display: inline-block; width: 22px; height: 22px; border-radius: 50%; background: #38bdf8; color: #fff; text-align: center; line-height: 22px; font-size: 0.75rem; font-weight: 800; margin-bottom: 0.4rem;">3</span>
          <strong style="display: block; color: #fff; font-size: 0.9rem;">Local WDB Cache</strong>
          <p style="font-size: 0.8rem; color: var(--text-muted); margin-top: 0.25rem; line-height: 1.4;">The server returns true stats and caches them in the player's local <code>WDB/itemcache.wdb</code>.</p>
        </div>
        <div style="background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.07); border-radius: 8px; padding: 1rem;">
          <span style="display: inline-block; width: 22px; height: 22px; border-radius: 50%; background: #10b981; color: #fff; text-align: center; line-height: 22px; font-size: 0.75rem; font-weight: 800; margin-bottom: 0.4rem;">4</span>
          <strong style="display: block; color: #fff; font-size: 0.9rem;">Community Confirmed</strong>
          <p style="font-size: 0.8rem; color: var(--text-muted); margin-top: 0.25rem; line-height: 1.4;">Cache telemetry aggregates across all beta testers to confirm stats on our portal!</p>
        </div>
      </div>
    </div>

    <!-- RECENTLY REVEALED DROPS -->
    <div style="background: rgba(13, 17, 26, 0.75); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: var(--radius-lg); padding: 1.5rem; margin-bottom: 2rem;">
      <h4 style="color: var(--text-gold); font-size: 1.1rem; margin: 0 0 1rem;">Recent Phase 2 Confirmed Drops (Excavation Site 4 & Dalaran)</h4>
      <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 0.75rem;">
        ${dataset.recentReveals.map(item => `
          <div style="display: flex; gap: 0.75rem; align-items: center; background: rgba(0,0,0,0.3); border: 1px solid rgba(255,255,255,0.06); padding: 0.6rem 0.8rem; border-radius: 6px;">
            <img src="${item.icon}" alt="${item.name}" style="width: 36px; height: 36px; border-radius: 4px; border: 1px solid rgba(255,255,255,0.1); object-fit: cover;" />
            <div style="flex: 1; min-width: 0;">
              <strong class="${item.quality}" style="display: block; font-size: 0.86rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${item.name}</strong>
              <div style="font-size: 0.75rem; color: #94a3b8; display: flex; gap: 0.4rem;">
                <span>iLvl ${item.iLvl}</span> • <span>${item.slot}</span>
              </div>
              <small style="color: #a855f7; font-size: 0.72rem;">📍 ${item.source}</small>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

window.toggleItemFlip = function() {
  const flipper = document.getElementById('hi-flipper-inner') || document.querySelector('.flip-card-inner');
  if (flipper) {
    flipper.classList.toggle('flipped');
  }
};

window.initHiddenItemsTracker = initHiddenItemsTracker;
