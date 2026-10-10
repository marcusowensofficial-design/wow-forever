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

  renderCozySleepingBag();
}

function renderCozySleepingBag() {
  const container = document.getElementById('cozy-sleeping-bag-container');
  if (!container) return;

  const bagData = (typeof window !== 'undefined' && window.WOW_ATLAS_DATA && window.WOW_ATLAS_DATA.cozySleepingBag) || null;
  const roadmap = (bagData && bagData.questRoadmap) || [];

  container.innerHTML = `
    <div class="sleeping-bag-hero-card" style="background: rgba(15, 23, 42, 0.7); border: 1px solid var(--border-gold); border-radius: var(--radius-md); padding: 1.5rem; margin-bottom: 2rem;">
      <div class="sb-header-row">
        <div style="display: flex; align-items: center; gap: 0.8rem; flex-wrap: wrap;">
          <span style="font-size: 2.2rem;">⛺</span>
          <div>
            <div style="display: flex; align-items: center; gap: 0.6rem; flex-wrap: wrap;">
              <h3 style="color: #f5d061; font-size: 1.35rem; margin: 0;">Cozy Sleeping Bag & Leveling Efficiency Engine</h3>
              <span class="deepdive-badge badge-exclusive"><span>✦</span> Level 14+ Essential</span>
            </div>
            <p style="font-size: 0.85rem; color: #cbd5e1; margin: 0.2rem 0 0;">
              Deploy anywhere outdoors or inside camp: rest for 3 minutes to gain <strong>+3% Experience from all sources (Monsters & Quests) for 2 hours</strong>.
            </p>
          </div>
        </div>
      </div>

      <!-- Main Showcase Grid: Left Item/Simulator, Right Quest Chain -->
      <div class="sb-content-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 1.25rem; margin-top: 1.25rem;">
        
        <!-- Left: Item Card & Interactive Rest Simulator -->
        <div class="sb-left-col">
          <div class="wow-tooltip-mock" style="background: rgba(10, 15, 29, 0.95); border: 2px solid #a335ee; border-radius: 8px; padding: 1rem; box-shadow: 0 4px 20px rgba(0,0,0,0.5);">
            <div style="display: flex; justify-content: space-between; align-items: baseline;">
              <strong style="color: #a335ee; font-size: 1.1rem;">Cozy Sleeping Bag</strong>
              <span style="color: #94a3b8; font-size: 0.8rem;">Item Level 40</span>
            </div>
            <div style="font-size: 0.82rem; color: #fff; margin-top: 0.25rem;">Binds when picked up</div>
            <div style="font-size: 0.82rem; color: #fff;">Unique</div>
            <p style="color: #00ff00; font-size: 0.85rem; margin: 0.6rem 0 0.3rem; line-height: 1.4;">
              Use: Unfurl a sleeping bag. Resting inside for at least one minute will provide a bonus to experience earned, stacking up to 3 times. (60 Min Cooldown)
            </p>
            <div style="font-style: italic; color: #ffd100; font-size: 0.8rem;">"Old, but still good"</div>
          </div>

          <!-- Interactive Rest Simulator -->
          <div class="sb-simulator-box" style="margin-top: 1rem; background: rgba(255,255,255,0.03); border: 1px solid var(--border-subtle); border-radius: 8px; padding: 1rem;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
              <strong style="color: #fff; font-size: 0.9rem;">Interactive Rest Simulator</strong>
              <span id="sb-buff-display" class="deepdive-badge badge-demo">Unbuffed</span>
            </div>
            <div class="sb-progress-bar-bg" style="width: 100%; height: 10px; background: rgba(0,0,0,0.4); border-radius: 5px; overflow: hidden; margin: 0.5rem 0;">
              <div id="sb-progress-fill" style="width: 0%; height: 100%; background: linear-gradient(90deg, #ca8a04, #22c55e); transition: width 0.4s ease;"></div>
            </div>
            <div style="display: flex; justify-content: space-between; font-size: 0.78rem; color: #94a3b8; margin-bottom: 0.75rem;">
              <span>0m: +0% XP</span>
              <span>1m: +1% XP</span>
              <span>2m: +2% XP</span>
              <span>3m: +3% (2h)</span>
            </div>
            <div style="display: flex; gap: 0.5rem;">
              <button type="button" class="btn-primary" id="btn-simulate-bag-rest" style="flex: 1; padding: 0.5rem; font-size: 0.85rem; cursor: pointer; background: linear-gradient(135deg, #ca8a04, #eab308); color: #000; font-weight: 700; border: none; border-radius: 4px;">
                <span>⛺</span> Rest (+1 Minute)
              </button>
              <button type="button" class="btn-primary" id="btn-reset-bag-rest" style="padding: 0.5rem 0.8rem; font-size: 0.85rem; cursor: pointer; background: rgba(255,255,255,0.08); border: 1px solid var(--border-subtle); color: #cbd5e1; border-radius: 4px;">
                Reset
              </button>
            </div>
            <div id="sb-sim-status" style="font-size: 0.8rem; color: #38bdf8; margin-top: 0.6rem; text-align: center;">
              Click "Rest" to simulate lying in the bag.
            </div>
          </div>

          <!-- Student Fodder Spotlight -->
          <div style="margin-top: 1rem; background: rgba(16, 185, 129, 0.06); border: 1px solid rgba(16, 185, 129, 0.25); border-radius: 8px; padding: 0.85rem;">
            <div style="display: flex; align-items: center; gap: 0.5rem;">
              <span style="font-size: 1.4rem;">🥜</span>
              <div>
                <strong style="color: #6ee7b7; font-size: 0.9rem;">Student Fodder (New Forever Rework)</strong>
                <span style="font-size: 0.75rem; color: #94a3b8; display: block;">Trail food, not rested XP</span>
              </div>
            </div>
            <p style="font-size: 0.8rem; color: #cbd5e1; margin: 0.4rem 0 0; line-height: 1.4;">
              Heals <strong>500 HP</strong> immediately + <strong>1,050 over 12s</strong>, and restores <strong>900 mana / 50 rage / 100 energy</strong> on a 5-minute cooldown. You earn 12 free bags across the questline!
            </p>
          </div>
        </div>

        <!-- Right: 5-Step Scavenger Quest Roadmap -->
        <div class="sb-right-col">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.75rem;">
            <h4 style="color: #fff; font-size: 1rem; margin: 0; display: flex; align-items: center; gap: 0.4rem;">
              <span>🗺️</span> 5-Step Scavenger Questline Roadmap
            </h4>
            <span class="deepdive-badge badge-verified" style="font-size: 0.75rem;">Alliance & Horde (Lvl 14+)</span>
          </div>

          <div class="sb-roadmap-list" style="display: flex; flex-direction: column; gap: 0.75rem;">
            ${roadmap.map(step => `
              <div class="sb-step-card" style="background: rgba(255,255,255,0.02); border: 1px solid var(--border-subtle); border-radius: 6px; padding: 0.75rem;">
                <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 0.5rem;">
                  <div>
                    <span style="background: rgba(202, 138, 4, 0.2); color: #fef08a; padding: 0.15rem 0.4rem; border-radius: 3px; font-size: 0.7rem; font-weight: 700; text-transform: uppercase;">
                      Step ${step.step}
                    </span>
                    <strong style="color: #fff; font-size: 0.9rem; margin-left: 0.4rem;">${escapeHtml(step.name)}</strong>
                  </div>
                  <span style="font-size: 0.75rem; color: #94a3b8;">${escapeHtml(step.location || 'Cross-Continent')}</span>
                </div>

                ${step.factionStart ? `
                  <div style="font-size: 0.78rem; color: #cbd5e1; margin-top: 0.4rem; line-height: 1.35;">
                    <div style="color: #60a5fa;"><strong>Alliance:</strong> ${escapeHtml(step.factionStart.alliance)}</div>
                    <div style="color: #f87171; margin-top: 0.2rem;"><strong>Horde:</strong> ${escapeHtml(step.factionStart.horde)}</div>
                  </div>
                ` : `
                  <div style="font-size: 0.78rem; color: #cbd5e1; margin-top: 0.35rem; line-height: 1.35;">
                    ${escapeHtml(step.task)}
                  </div>
                `}

                <div style="margin-top: 0.4rem; padding-top: 0.4rem; border-top: 1px dashed rgba(255,255,255,0.08); font-size: 0.78rem; color: #34d399;">
                  <strong>🎁 Rewards:</strong> ${escapeHtml(step.rewards)}
                </div>
              </div>
            `).join('')}
          </div>
        </div>

      </div>
    </div>
  `;

  // Attach Rest Simulator logic
  let currentRestMinutes = 0;
  const btnRest = container.querySelector('#btn-simulate-bag-rest');
  const btnReset = container.querySelector('#btn-reset-bag-rest');
  const progressFill = container.querySelector('#sb-progress-fill');
  const buffDisplay = container.querySelector('#sb-buff-display');
  const simStatus = container.querySelector('#sb-sim-status');

  if (btnRest) {
    btnRest.addEventListener('click', () => {
      if (currentRestMinutes < 3) {
        currentRestMinutes++;
        const pct = Math.round((currentRestMinutes / 3) * 100);
        if (progressFill) progressFill.style.width = `${pct}%`;
        
        if (buffDisplay) {
          buffDisplay.className = 'deepdive-badge badge-exclusive';
          buffDisplay.textContent = `Well-Rested (+${currentRestMinutes}% XP)`;
        }
        if (simStatus) {
          if (currentRestMinutes === 3) {
            simStatus.innerHTML = `<strong>Max Bonus Active!</strong> +3% XP from all sources for 2 hours (7,200s).`;
          } else {
            simStatus.textContent = `Resting in bag: ${currentRestMinutes} min complete (+${currentRestMinutes}% XP). Keep resting!`;
          }
        }
      }
    });
  }

  if (btnReset) {
    btnReset.addEventListener('click', () => {
      currentRestMinutes = 0;
      if (progressFill) progressFill.style.width = '0%';
      if (buffDisplay) {
        buffDisplay.className = 'deepdive-badge badge-demo';
        buffDisplay.textContent = 'Unbuffed';
      }
      if (simStatus) simStatus.textContent = 'Click "Rest" to simulate lying in the bag.';
    });
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

      ${(() => {
        const profLower = (p.profession || '').toLowerCase();
        let fieldRecipes = null;
        let stationLabel = '';
        if (profLower.includes('leatherworking')) {
          const rack = window.WOW_ATLAS_DATA?.campingRecipes?.tanningRack;
          fieldRecipes = rack?.highlightRecipes || (Array.isArray(rack) ? rack : []);
          stationLabel = `Tanning Rack (${rack?.totalRecipes || 48} Recipes)`;
        } else if (profLower.includes('tailoring')) {
          const wheel = window.WOW_ATLAS_DATA?.campingRecipes?.spinningWheel;
          fieldRecipes = wheel?.highlightRecipes || (Array.isArray(wheel) ? wheel : []);
          stationLabel = `Spinning Wheel (${wheel?.totalRecipes || 74} Recipes)`;
        }

        if (!fieldRecipes || fieldRecipes.length === 0) return '';
        const profSlug = profLower.replace(/[^a-z0-9]/g, '');

        return `
          <div class="station-recipes-section">
            <button id="recipes-btn-${profSlug}" class="btn-station-recipes" onclick="toggleCampingRecipes('${profSlug}')">
              📜 View Field Recipes: ${stationLabel}
            </button>
            <div id="recipes-drawer-${profSlug}" class="station-recipes-drawer" hidden>
              <div class="recipes-drawer-scroll">
                ${fieldRecipes.map(r => `
                  <div class="field-recipe-item">
                    <div class="field-recipe-top">
                      <strong class="field-recipe-name">${escapeHtml(r.name)}</strong>
                      <span class="field-recipe-skill">Skill ${r.skill}</span>
                    </div>
                    <div class="field-recipe-mats"><strong>Mats:</strong> ${escapeHtml(r.reagents || r.mats || '')}</div>
                    ${r.produces ? `<div class="field-recipe-produces"><strong>Produces:</strong> ${escapeHtml(r.produces)}</div>` : ''}
                    ${r.type ? `<div style="font-size: 0.72rem; color: #f59e0b;">✦ ${escapeHtml(r.type)}</div>` : ''}
                  </div>
                `).join('')}
              </div>
            </div>
          </div>
        `;
      })()}
    </div>
  `).join('');
}

window.toggleCampingRecipes = function(profSlug) {
  const drawer = document.getElementById(`recipes-drawer-${profSlug}`);
  const btn = document.getElementById(`recipes-btn-${profSlug}`);
  if (!drawer) return;
  const isHidden = drawer.hasAttribute('hidden');
  if (isHidden) {
    drawer.removeAttribute('hidden');
    if (btn) btn.innerHTML = '▲ Hide Field Recipes';
  } else {
    drawer.setAttribute('hidden', '');
    const count = profSlug.includes('leather') ? 48 : 74;
    const label = profSlug.includes('leather') ? 'Tanning Rack' : 'Spinning Wheel';
    if (btn) btn.innerHTML = `📜 View ${count} Field Recipes (${label})`;
  }
};

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
  const matrixContainer = document.getElementById('class-stat-matrix-container');
  const tableContainer = document.getElementById('all-class-stat-table-container');
  const toggleTableBtn = document.getElementById('toggle-all-class-table-btn');
  const tableCollapsible = document.getElementById('all-class-table-collapsible');
  const primaryContainer = document.getElementById('primary-stats-container');
  const secondaryContainer = document.getElementById('secondary-stats-container');
  const defensiveContainer = document.getElementById('defensive-stats-container');
  const modifiersContainer = document.getElementById('modifiers-rules-container');

  // 1. Interactive Class Stat Conversion Matrix
  if (matrixContainer && WOW_FOREVER_DATA.classStatConversions) {
    const classes = Object.keys(WOW_FOREVER_DATA.classStatConversions);
    let selectedClassKey = 'warrior';

    function renderClassStatExplorer() {
      const cls = WOW_FOREVER_DATA.classStatConversions[selectedClassKey] || WOW_FOREVER_DATA.classStatConversions.warrior;

      matrixContainer.innerHTML = `
        <div class="stat-matrix-selector-bar">
          ${classes.map(k => {
            const c = WOW_FOREVER_DATA.classStatConversions[k];
            const isActive = k === selectedClassKey;
            return `
              <button type="button" class="stat-class-btn ${isActive ? 'active' : ''}" data-stat-class="${k}" style="${isActive ? `border-color: ${c.color}; color: #fff;` : ''}">
                <span>${c.icon}</span>
                <span>${escapeHtml(c.name)}</span>
              </button>
            `;
          }).join('')}
        </div>

        <div class="class-stat-display-card" style="border-left: 4px solid ${cls.color};">
          <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.75rem; margin-bottom: 1rem;">
            <div style="display: flex; align-items: center; gap: 0.75rem;">
              <span style="font-size: 2rem;">${cls.icon}</span>
              <div>
                <h4 style="color: ${cls.color}; font-size: 1.4rem; margin: 0; font-family: var(--font-heading);">${escapeHtml(cls.name)} Stat Scaling</h4>
                <span class="role-pill" style="font-size: 0.75rem;">${escapeHtml(cls.role)}</span>
              </div>
            </div>
            <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
              ${cls.highlights.map(h => `
                <span class="status-badge-highlight" style="font-size: 0.75rem; background: rgba(255,255,255,0.06); border-color: rgba(255,255,255,0.15); color: #e2e8f0;">
                  ✦ ${escapeHtml(h)}
                </span>
              `).join('')}
            </div>
          </div>

          <div class="class-stat-grid-5">
            <div class="class-stat-cell">
              <div class="class-stat-cell-title" style="color: #ef4444;">
                <span>💪</span> Strength
              </div>
              <div class="class-stat-cell-value">${escapeHtml(cls.strength)}</div>
            </div>
            <div class="class-stat-cell">
              <div class="class-stat-cell-title" style="color: #10b981;">
                <span>🏃</span> Agility
              </div>
              <div class="class-stat-cell-value">${escapeHtml(cls.agility)}</div>
            </div>
            <div class="class-stat-cell">
              <div class="class-stat-cell-title" style="color: #38bdf8;">
                <span>🧠</span> Intellect
              </div>
              <div class="class-stat-cell-value">${escapeHtml(cls.intellect)}</div>
            </div>
            <div class="class-stat-cell">
              <div class="class-stat-cell-title" style="color: #f59e0b;">
                <span>❤️</span> Stamina
              </div>
              <div class="class-stat-cell-value">${escapeHtml(cls.stamina)}</div>
            </div>
            <div class="class-stat-cell">
              <div class="class-stat-cell-title" style="color: #c084fc;">
                <span>✨</span> Spirit
              </div>
              <div class="class-stat-cell-value">${escapeHtml(cls.spirit)}</div>
            </div>
          </div>

          <div style="background: rgba(0,0,0,0.3); border: 1px dashed rgba(255,255,255,0.15); border-radius: 6px; padding: 0.85rem 1.1rem; margin-top: 1rem;">
            <p style="font-size: 0.88rem; color: #cbd5e1; line-height: 1.5; margin: 0;">
              <strong style="color: var(--text-gold);">Tactical Summary:</strong> ${escapeHtml(cls.summary)}
            </p>
          </div>
        </div>
      `;

      matrixContainer.querySelectorAll('.stat-class-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          selectedClassKey = btn.getAttribute('data-stat-class');
          renderClassStatExplorer();
        });
      });
    }

    renderClassStatExplorer();

    // 2. Full 9-Class Comparison Table
    if (tableContainer) {
      tableContainer.innerHTML = `
        <div class="stat-comparison-table-wrapper">
          <table class="stat-comparison-table">
            <thead>
              <tr>
                <th>Class</th>
                <th>Strength → Melee AP / Block</th>
                <th>Agility → AP / Armor</th>
                <th>Agility → 1% Crit</th>
                <th>Agility → 1% Dodge</th>
                <th>Intellect → 1% Spell Crit</th>
                <th>Stamina & Spirit Notes</th>
              </tr>
            </thead>
            <tbody>
              ${classes.map(k => {
                const c = WOW_FOREVER_DATA.classStatConversions[k];
                return `
                  <tr>
                    <td>
                      <strong style="color: ${c.color}; display: flex; align-items: center; gap: 0.35rem;">
                        <span>${c.icon}</span> ${escapeHtml(c.name)}
                      </strong>
                    </td>
                    <td>${escapeHtml(c.strength)}</td>
                    <td>${escapeHtml(c.agility.split('•')[0] || c.agility)}</td>
                    <td><strong style="color: var(--text-gold);">${escapeHtml(c.agility.includes('Crit') ? c.agility.match(/[0-9.]+ Agi = 1% [A-Za-z ]*Crit/)?.[0] || '20 Agi = 1% Crit' : '20 Agi = 1% Crit')}</strong></td>
                    <td><strong style="color: #6ee7b7;">${escapeHtml(c.agility.includes('Dodge') ? c.agility.match(/[0-9.]+ Agi = 1% Dodge/)?.[0] || '20 Agi = 1% Dodge' : '20 Agi = 1% Dodge')}</strong></td>
                    <td><strong style="color: #7dd3fc;">${escapeHtml(c.intellect.includes('Spell Crit') ? c.intellect.match(/~?[0-9.]+ Int = 1% Spell Crit/)?.[0] || 'N/A' : 'N/A')}</strong></td>
                    <td style="font-size: 0.8rem; color: #94a3b8;">${escapeHtml(c.spirit)}</td>
                  </tr>
                `;
              }).join('')}
            </tbody>
          </table>
        </div>
      `;
    }

    // Toggle button for all-class table
    if (toggleTableBtn && tableCollapsible) {
      toggleTableBtn.addEventListener('click', () => {
        const isHidden = tableCollapsible.style.display === 'none';
        tableCollapsible.style.display = isHidden ? 'block' : 'none';
        toggleTableBtn.innerHTML = isHidden 
          ? `<span>✕</span> Hide Comparison Table` 
          : `<span>📋</span> View Full 9-Class Comparison Table`;
      });
    }
  }

  // 3. Render Stats Guide Sections
  const guide = WOW_FOREVER_DATA.statsOverviewGuide;

  if (guide) {
    function renderCards(container, list) {
      if (!container || !list) return;
      container.innerHTML = list.map(item => `
        <div class="stat-detail-card">
          <div class="stat-detail-top">
            <div class="stat-detail-header">
              <span class="stat-detail-icon">${item.icon}</span>
              <div>
                <h4 class="stat-detail-name">${escapeHtml(item.name)}</h4>
                ${item.role ? `<span style="font-size: 0.72rem; text-transform: uppercase; color: var(--text-gold); font-weight: 700;">${escapeHtml(item.role)}</span>` : ''}
              </div>
            </div>
          </div>
          <ul class="stat-bullet-list">
            ${item.bullets.map(b => `<li>${b}</li>`).join('')}
          </ul>
        </div>
      `).join('');
    }

    renderCards(primaryContainer, guide.primaryStats);
    renderCards(secondaryContainer, guide.secondaryStats);
    renderCards(defensiveContainer, guide.defensiveStats);
    renderCards(modifiersContainer, guide.modifiersAndRules);
  }

  // 4. Endgame Stat Caps Cards
  if (WOW_FOREVER_DATA.statCapsAndMechanics) {
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

