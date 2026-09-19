/**
 * World of Warcraft: Forever - Camping, Mounts & Systems Module
 * Handles Camping Hub, Campfire Recipes, Mounts Gallery, Transmog Demo, and Megarealms.
 */

/* ==========================================================================
   CAMPING & PROFESSIONS HUB CONTROLLER
   ========================================================================== */
function initCampingHub() {
  const kitsContainer = document.getElementById('camping-kits-chips');
  if (kitsContainer && WOW_FOREVER_DATA.campingKits) {
    kitsContainer.innerHTML = WOW_FOREVER_DATA.campingKits.map(kit => `
      <div class="camping-kit-chip">
        <strong style="color: var(--text-gold); font-size: 0.85rem;">⛺ ${escapeHtml(kit.name)}</strong>
        <span style="font-size: 0.75rem; color: #cbd5e1;">(Level ${kit.levelReq}+ • Up to ${kit.maxStations} station${kit.maxStations > 1 ? 's' : ''})</span>
      </div>
    `).join('');
  }

  renderCampingStations('all');

  const filterBtns = document.querySelectorAll('#profession-filter-group .filter-chip');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.getAttribute('data-prof-filter');
      renderCampingStations(filter);
    });
  });

  const passivesContainer = document.getElementById('professions-passives-container');
  if (passivesContainer && WOW_FOREVER_DATA.professionPassives) {
    passivesContainer.innerHTML = WOW_FOREVER_DATA.professionPassives.map(prof => `
      <div class="profession-passive-card">
        <div class="profession-header">
          <div style="display: flex; align-items: center; gap: 0.6rem;">
            <span style="font-size: 1.6rem;">${prof.icon}</span>
            <div>
              <h4 style="color: #fff; font-size: 1.1rem; margin: 0;">${escapeHtml(prof.name)}</h4>
              <span style="font-size: 0.72rem; text-transform: uppercase; color: var(--text-gold); font-weight: 700;">${escapeHtml(prof.type)}</span>
            </div>
          </div>
          <span class="status-badge-highlight" style="font-size: 0.7rem;">Combat Power</span>
        </div>
        <div style="margin: 0.75rem 0;">
          <strong style="color: #34d399; font-size: 0.88rem;">✨ ${escapeHtml(prof.passiveName)}</strong>
          <p style="font-size: 0.84rem; color: #cbd5e1; margin-top: 0.2rem; line-height: 1.4;">${escapeHtml(prof.passiveEffect)}</p>
        </div>
        <div style="background: rgba(0,0,0,0.3); border-radius: var(--radius-sm); padding: 0.5rem 0.75rem; border-left: 2px solid var(--border-gold);">
          <strong style="font-size: 0.78rem; color: var(--text-gold);">🔥 Camping Hub Synergy:</strong>
          <p style="font-size: 0.8rem; color: var(--text-muted); margin-top: 0.15rem;">${escapeHtml(prof.campBonus)}</p>
        </div>
      </div>
    `).join('');
  }
}

function renderCampingStations(filter) {
  const container = document.getElementById('camping-stations-container');
  if (!container || !WOW_FOREVER_DATA.campingObjects) return;

  let list = WOW_FOREVER_DATA.campingObjects;
  if (filter === 'Primary') {
    list = list.filter(p => p.type === 'Primary');
  } else if (filter === 'Secondary') {
    list = list.filter(p => p.type === 'Secondary');
  }

  container.innerHTML = list.map(p => `
    <div class="camping-station-card">
      <div class="station-card-header">
        <div style="display: flex; align-items: center; gap: 0.6rem;">
          <span style="font-size: 1.8rem;">${p.icon}</span>
          <div>
            <h4 style="color: #fff; font-size: 1.15rem; margin: 0;">${escapeHtml(p.profession)}</h4>
            <span style="font-size: 0.72rem; text-transform: uppercase; color: var(--text-gold); font-weight: 700;">${escapeHtml(p.type)} Profession</span>
          </div>
        </div>
        <div class="mirrored-buff-badge">
          <span>Mirrored Buff:</span>
          <strong>${escapeHtml(p.mirroredBuff)}</strong>
        </div>
      </div>

      <div class="station-tiers-list">
        ${p.objects.map(obj => `
          <div class="station-tier-row">
            <span class="tier-pill">Tier ${obj.tier}</span>
            <div class="tier-info">
              <strong style="color: #e2e8f0; font-size: 0.88rem;">${escapeHtml(obj.name)}</strong>
              <p style="font-size: 0.78rem; color: var(--text-muted); margin: 0.15rem 0 0;">${escapeHtml(obj.desc)}</p>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `).join('');
}

/* ==========================================================================
   MOUNTS GALLERY & STATS CAPS CONTROLLER
   ========================================================================== */
function renderMountsGallery() {
  const container = document.getElementById('mounts-gallery-container');
  if (!container || !WOW_FOREVER_DATA.dataminedMounts) return;

  container.innerHTML = WOW_FOREVER_DATA.dataminedMounts.map(cat => `
    <div class="mount-category-card">
      <div class="mount-cat-header">
        <div style="display: flex; align-items: center; gap: 0.6rem;">
          <span style="font-size: 1.8rem;">${cat.icon}</span>
          <div>
            <h4 style="color: #fff; font-size: 1.15rem; margin: 0;">${escapeHtml(cat.category)}</h4>
            <span class="status-badge-highlight" style="font-size: 0.7rem; margin-top: 0.2rem;">${escapeHtml(cat.badge)}</span>
          </div>
        </div>
      </div>
      <ul class="mount-items-list">
        ${cat.mounts.map(m => `
          <li class="mount-item">
            <span style="color: var(--text-gold); font-size: 0.9rem;">🐎</span>
            <span>${escapeHtml(m)}</span>
          </li>
        `).join('')}
      </ul>
    </div>
  `).join('');
}

function renderStatsAndCaps() {
  const capsContainer = document.getElementById('stats-caps-container');
  const rulesContainer = document.getElementById('combat-rules-container');
  if (!WOW_FOREVER_DATA.statCapsAndMechanics) return;

  const { caps, rules } = WOW_FOREVER_DATA.statCapsAndMechanics;

  if (capsContainer) {
    capsContainer.innerHTML = caps.map(cap => `
      <div class="stat-cap-card">
        <div class="stat-cap-top">
          <span style="font-size: 1.8rem;">${cap.icon}</span>
          <span class="cap-target-badge">${escapeHtml(cap.target)}</span>
        </div>
        <div class="stat-cap-value">${escapeHtml(cap.value)}</div>
        <h4 class="stat-cap-name">${escapeHtml(cap.name)}</h4>
        <p class="stat-cap-desc">${escapeHtml(cap.desc)}</p>
      </div>
    `).join('');
  }

  if (rulesContainer) {
    rulesContainer.innerHTML = rules.map(rule => `
      <div class="combat-rule-card">
        <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.4rem;">
          <span style="color: var(--text-gold); font-size: 1.1rem;">⚖️</span>
          <h4 style="color: #fff; font-size: 1.05rem; margin: 0;">${escapeHtml(rule.title)}</h4>
        </div>
        <p style="font-size: 0.85rem; color: #cbd5e1; line-height: 1.5; margin: 0;">${escapeHtml(rule.desc)}</p>
      </div>
    `).join('');
  }
}

/* ==========================================================================
   8. TRANSMOG & ENGINE VISUAL DEMO TOGGLES
   ========================================================================= */
function initTransmogDemo() {
  const toggle = document.getElementById('purist-toggle-input');
  const modeStatus = document.getElementById('purist-status-label');
  const transmogView = document.getElementById('gear-inspect-view');

  if (!toggle) return;

  toggle.addEventListener('change', () => {
    const isPurist = toggle.checked;

    if (isPurist) {
      if (modeStatus) modeStatus.textContent = 'Classic Purist Mode: ACTIVE (Seeing actual equipped items)';
      modeStatus.style.color = '#10b981';

      if (transmogView) {
        transmogView.innerHTML = `
          <h4 style="color: #10b981;">🛡️ Player Inspect View (Purist Mode: On)</h4>
          <p style="font-size: 0.8rem; color: var(--text-muted); margin-bottom: 0.8rem;">You see the true mismatched leveling gear earned through quests & dungeons:</p>
          <div class="gear-slot-item"><span>Head</span><span style="color: #10b981;">Green Tinted Goggles</span></div>
          <div class="gear-slot-item"><span>Shoulders</span><span style="color: #cbd5e1;">Brawler's Rough Pauldrons</span></div>
          <div class="gear-slot-item"><span>Chest</span><span style="color: #3b82f6;">Tunic of Westfall (Blue)</span></div>
          <div class="gear-slot-item"><span>Hands</span><span style="color: #cbd5e1;">Lizard Hide Gloves (Green)</span></div>
          <div class="gear-slot-item"><span>Legs</span><span style="color: #10b981;">Chausses of Westfall</span></div>
          <div class="gear-slot-item"><span>Main Hand</span><span style="color: #3b82f6;">Cruel Barb (Deadmines)</span></div>
          <div class="gear-slot-item"><span>Off Hand</span><span style="color: #cbd5e1;">Hardened Iron Shortsword</span></div>
        `;
      }
    } else {
      if (modeStatus) modeStatus.textContent = 'Modern Transmog: ACTIVE (Seeing player cosmetic override)';
      modeStatus.style.color = 'var(--text-gold)';

      if (transmogView) {
        transmogView.innerHTML = `
          <h4 style="color: var(--text-gold);">✨ Player Inspect View (Modern Transmog)</h4>
          <p style="font-size: 0.8rem; color: var(--text-muted); margin-bottom: 0.8rem;">The player has transmogrified their set into a unified epic appearance:</p>
          <div class="gear-slot-item"><span>Head</span><span style="color: #a78bfa;">Zephras Sky-Crown [Transmog]</span></div>
          <div class="gear-slot-item"><span>Shoulders</span><span style="color: #a78bfa;">Skyborne Wind-Mantle [Transmog]</span></div>
          <div class="gear-slot-item"><span>Chest</span><span style="color: #a78bfa;">Skyborne Cloud-Robe [Transmog]</span></div>
          <div class="gear-slot-item"><span>Hands</span><span style="color: #a78bfa;">Zephyr Silken Grips [Transmog]</span></div>
          <div class="gear-slot-item"><span>Legs</span><span style="color: #a78bfa;">Breezewalker Leggings [Transmog]</span></div>
          <div class="gear-slot-item"><span>Main Hand</span><span style="color: #f59e0b;">Thunderfury, Blessed Blade [Transmog]</span></div>
          <div class="gear-slot-item"><span>Off Hand</span><span style="color: #a78bfa;">Aegis of the Zephyr [Transmog]</span></div>
        `;
      }
    }
  });
}

function initEngineVisualDemo() {
  const toggle = document.getElementById('engine-preset-toggle');
  const label = document.getElementById('engine-preset-label');
  const details = document.getElementById('engine-preset-details');

  if (!toggle) return;

  toggle.addEventListener('change', () => {
    const isRayTraced = toggle.checked;

    if (isRayTraced) {
      if (label) {
        label.textContent = 'Ray-Traced Global Illumination: ACTIVE';
        label.style.color = '#38bdf8';
      }
      if (details) {
        details.innerHTML = `
          <div style="border-left: 3px solid #38bdf8; padding-left: 1rem;">
            <strong style="color: #38bdf8;">Forever Ray-Traced Engine Mode</strong>
            <ul style="margin-top: 0.4rem; list-style: none; font-size: 0.85rem; color: #cbd5e1; display: flex; flex-direction: column; gap: 0.3rem;">
              <li>✦ Real-time shifting mountain and tree shadows matching sun angle.</li>
              <li>✦ Volumetric morning fog across Westfall, Elwynn, and Duskwood.</li>
              <li>✦ Re-engineered river flow with foam collision physics along riverbanks.</li>
              <li>✦ HD Character models with enhanced polygon meshes.</li>
            </ul>
          </div>
        `;
      }
    } else {
      if (label) {
        label.textContent = 'Classic 2004 Preset: ACTIVE';
        label.style.color = 'var(--text-gold)';
      }
      if (details) {
        details.innerHTML = `
          <div style="border-left: 3px solid var(--border-gold-bright); padding-left: 1rem;">
            <strong style="color: var(--text-gold);">Classic 2004 Pure Preset</strong>
            <ul style="margin-top: 0.4rem; list-style: none; font-size: 0.85rem; color: #cbd5e1; display: flex; flex-direction: column; gap: 0.3rem;">
              <li>✦ Original 2004 vertex lighting and fixed terrain shadows.</li>
              <li>✦ Standard atmospheric distance fog.</li>
              <li>✦ Low-poly classic character models (SD) with original combat animations.</li>
              <li>✦ Lightweight performance targeting maximum FPS on older laptops.</li>
            </ul>
          </div>
        `;
      }
    }
  });
}

function escapeHtml(string) {
  const div = document.createElement('div');
  div.textContent = string;
  return div.innerHTML;
}

/* ==========================================================================
   10. PROFESSION COMBAT PASSIVES & CAMPING MATRIX
   ========================================================================== */
function renderProfessionPassives() {
  const container = document.getElementById('professions-matrix-grid');
  if (!container || !WOW_FOREVER_DATA.professionPassives) return;

  container.innerHTML = WOW_FOREVER_DATA.professionPassives.map(prof => `
    <div class="profession-passive-card">
      <div class="profession-header">
        <div style="display: flex; align-items: center; gap: 0.6rem;">
          <span style="font-size: 1.6rem;">${prof.icon}</span>
          <div>
            <h4 style="color: #fff; font-size: 1.1rem; margin: 0;">${escapeHtml(prof.name)}</h4>
            <span style="font-size: 0.72rem; text-transform: uppercase; color: var(--text-gold); font-weight: 700;">${escapeHtml(prof.type)}</span>
          </div>
        </div>
        <span class="status-badge-highlight" style="font-size: 0.7rem;">Passive Combat Power</span>
      </div>
      <div style="margin: 0.75rem 0;">
        <strong style="color: #34d399; font-size: 0.88rem;">✨ ${escapeHtml(prof.passiveName)}</strong>
        <p style="font-size: 0.84rem; color: #cbd5e1; margin-top: 0.2rem; line-height: 1.4;">${escapeHtml(prof.passiveEffect)}</p>
      </div>
      <div style="background: rgba(0,0,0,0.3); border-radius: var(--radius-sm); padding: 0.5rem 0.75rem; border-left: 2px solid var(--border-gold);">
        <strong style="font-size: 0.78rem; color: var(--text-gold);">🔥 Camping Hub Synergy:</strong>
        <p style="font-size: 0.8rem; color: var(--text-muted); margin-top: 0.15rem;">${escapeHtml(prof.campBonus)}</p>
      </div>
    </div>
  `).join('');
}

/* ==========================================================================
   11. GAME EDITIONS & ACCESS MODEL
   ========================================================================== */
function renderGameEditions() {
  const container = document.getElementById('game-editions-container');
  if (!container || !WOW_FOREVER_DATA.gameEditions) return;

  const { standard, epicPack } = WOW_FOREVER_DATA.gameEditions;

  container.innerHTML = `
    <div class="edition-card standard">
      <div>
        <span class="edition-badge" style="background: rgba(16, 185, 129, 0.2); border: 1px solid #10b981; color: #6ee7b7;">${escapeHtml(standard.badge)}</span>
        <h3 style="color: #fff; font-size: 1.4rem; margin: 0.5rem 0 0.2rem;">${escapeHtml(standard.name)}</h3>
        <div style="font-size: 1.6rem; font-weight: 800; color: #34d399; font-family: var(--font-heading);">${escapeHtml(standard.cost)}</div>
        <p style="font-size: 0.84rem; color: var(--text-muted); margin-top: 0.35rem; line-height: 1.4;">${escapeHtml(standard.description)}</p>
        <ul class="edition-perks-list">
          ${standard.perks.map(p => `<li><span style="color: #10b981; font-weight: 700;">✓</span> <span>${escapeHtml(p)}</span></li>`).join('')}
        </ul>
      </div>
      <div style="margin-top: 1.5rem; padding-top: 0.75rem; border-top: 1px solid var(--border-subtle); font-size: 0.82rem; color: var(--text-muted);">
        Access through standard Battle.net Client with monthly active subscription.
      </div>
    </div>

    <div class="edition-card epic">
      <div>
        <span class="edition-badge" style="background: rgba(243, 192, 67, 0.2); border: 1px solid var(--border-gold); color: var(--text-gold);">${escapeHtml(epicPack.badge)}</span>
        <h3 style="color: #fff; font-size: 1.4rem; margin: 0.5rem 0 0.2rem;">${escapeHtml(epicPack.name)}</h3>
        <div style="font-size: 1.6rem; font-weight: 800; color: var(--text-gold); font-family: var(--font-heading);">${escapeHtml(epicPack.cost)}</div>
        <p style="font-size: 0.84rem; color: var(--text-muted); margin-top: 0.35rem; line-height: 1.4;">${escapeHtml(epicPack.description)}</p>
        <ul class="edition-perks-list">
          ${epicPack.perks.map(p => `<li><span style="color: var(--text-gold); font-weight: 700;">★</span> <span>${escapeHtml(p)}</span></li>`).join('')}
        </ul>
      </div>
      <div style="margin-top: 1.5rem; padding-top: 0.75rem; border-top: 1px solid var(--border-subtle); font-size: 0.82rem; color: var(--text-gold);">
        Includes instant Beta access & 3 invite passes for your squad.
      </div>
    </div>
  `;
}

function renderMegarealms() {
  const container = document.getElementById('megarealms-container');
  if (!container || !WOW_FOREVER_DATA.megarealmsAndRulesets) return;

  container.innerHTML = WOW_FOREVER_DATA.megarealmsAndRulesets.map(realm => `
    <div class="megarealm-card">
      <div>
        <div class="megarealm-header">
          <div>
            <span class="status-badge-highlight" style="font-size: 0.72rem;">${escapeHtml(realm.badge)}</span>
            <h3 class="megarealm-title">${realm.icon} ${escapeHtml(realm.name)}</h3>
          </div>
        </div>
        <span class="megarealm-status">${escapeHtml(realm.status)}</span>
        <ul class="megarealm-rules-list">
          ${realm.rules.map(rule => `<li>${escapeHtml(rule)}</li>`).join('')}
        </ul>
      </div>
    </div>
  `).join('');
}

