/**
 * World of Warcraft: Forever - Spell Downranking Calculator Module
 * Calculates rank efficiency, throughput, coefficients, and curves
 * comparing WoW Forever (Build 1.60.6) vs Classic Era (Build 1.15.9).
 */

let drState = {
  selectedClass: 'priest',
  selectedSpellId: 'heal',
  playerLevel: 30,
  bonusPower: 200,
  talentHealPercent: 0,
  talentManaPercent: 0,
  talentCastReduction: 0,
  gameMode: 'forever' // 'forever' | 'classic'
};

function initDownrankCalculator() {
  const container = document.getElementById('downrank-calculator-container') || document.getElementById('downranking-container');
  if (!container) return;
  if (container.id !== 'downrank-calculator-container') container.id = 'downrank-calculator-container';

  renderDownrankCalculator();
}

function renderDownrankCalculator() {
  const container = document.getElementById('downrank-calculator-container') || document.getElementById('downranking-container');
  if (!container) return;
  if (container.id !== 'downrank-calculator-container') container.id = 'downrank-calculator-container';


  const dataset = window.WOW_TOOLS_DATA?.downranking;
  if (!dataset) return;

  const availableSpells = dataset.spells[drState.selectedClass] || [];
  let currentSpell = availableSpells.find(s => s.id === drState.selectedSpellId) || availableSpells[0];
  if (!currentSpell) return;
  drState.selectedSpellId = currentSpell.id;

  container.innerHTML = `
    <!-- Top Hero / Banner -->
    <div class="dr-header-box">
      <div class="dr-class-selector">
        ${dataset.classes.map(cls => `
          <button class="dr-class-chip ${drState.selectedClass === cls.id ? 'active' : ''}" 
                  onclick="setDownrankClass('${cls.id}')">
            <img src="${cls.icon}" alt="${cls.name}" class="dr-chip-icon" />
            <span>${cls.name}</span>
          </button>
        `).join('')}
      </div>

      <div class="dr-mode-switcher">
        <span class="dr-mode-label">Ruleset:</span>
        <button class="dr-mode-btn ${drState.gameMode === 'forever' ? 'active' : ''}" 
                onclick="setDownrankMode('forever')">
          ✦ WoW Forever (1.60.6)
        </button>
        <button class="dr-mode-btn ${drState.gameMode === 'classic' ? 'active' : ''}" 
                onclick="setDownrankMode('classic')">
          Classic Era (1.15.9)
        </button>
      </div>
    </div>

    <!-- Main Workspace Layout -->
    <div class="dr-workspace-grid">
      <!-- Left Column: Spell Picker -->
      <div class="dr-spell-picker-col">
        <h4 class="dr-col-title">Available Spells</h4>
        <div class="dr-spell-list">
          ${availableSpells.map(spell => `
            <button class="dr-spell-item ${drState.selectedSpellId === spell.id ? 'active' : ''}"
                    onclick="setDownrankSpell('${spell.id}')">
              <img src="${spell.icon}" alt="${spell.name}" class="dr-spell-icon" />
              <div class="dr-spell-item-info">
                <strong>${spell.name}</strong>
                <small>${spell.ranks.length} ranks</small>
              </div>
            </button>
          `).join('')}
        </div>

        <!-- Inputs / Stats Configuration -->
        <div class="dr-config-card">
          <h4 class="dr-col-title" style="margin-top: 1rem;">Stats & Modifiers</h4>
          <div class="dr-field-group">
            <label class="dr-field-label">
              <span>Your Level (Cap: 30)</span>
              <strong id="dr-lvl-display">${drState.playerLevel}</strong>
            </label>
            <input type="range" min="1" max="60" value="${drState.playerLevel}" class="dr-slider" 
                   oninput="updateDownrankInput('playerLevel', this.value)" />
          </div>

          <div class="dr-field-group">
            <label class="dr-field-label">
              <span>Bonus Healing / Damage (+heal)</span>
            </label>
            <div class="dr-input-addon">
              <input type="number" min="0" max="2000" step="10" value="${drState.bonusPower}" class="dr-num-input"
                     oninput="updateDownrankInput('bonusPower', this.value)" />
              <span>+SP</span>
            </div>
          </div>

          <!-- Talents Details Dropdown -->
          <details class="dr-talents-accordion">
            <summary>Talents & Cast Modifiers</summary>
            <div class="dr-talents-body">
              <div class="dr-field-row">
                <label>+Healing / Damage:</label>
                <input type="number" min="0" max="30" value="${drState.talentHealPercent}" 
                       oninput="updateDownrankInput('talentHealPercent', this.value)" /> %
              </div>
              <div class="dr-field-row">
                <label>Mana Cost Cut:</label>
                <input type="number" min="0" max="30" value="${drState.talentManaPercent}" 
                       oninput="updateDownrankInput('talentManaPercent', this.value)" /> %
              </div>
              <div class="dr-field-row">
                <label>Cast Time Cut:</label>
                <input type="number" min="0" max="2.0" step="0.1" value="${drState.talentCastReduction}" 
                       oninput="updateDownrankInput('talentCastReduction', this.value)" /> sec
              </div>
            </div>
          </details>
        </div>
      </div>

      <!-- Right Column: Rank Analysis & Scaling Chart -->
      <div class="dr-analysis-col">
        <div class="dr-spell-hero-banner">
          <img src="${currentSpell.icon}" alt="${currentSpell.name}" class="dr-banner-icon" />
          <div>
            <h3 class="dr-banner-title">${currentSpell.name}</h3>
            <p class="dr-banner-desc">${currentSpell.desc}</p>
          </div>
        </div>

        <!-- Calculated Ranks Table -->
        <div class="dr-table-responsive">
          <table class="dr-ranks-table">
            <thead>
              <tr>
                <th>Rank</th>
                <th>Learned</th>
                <th>Heal / Damage</th>
                <th>Mana</th>
                <th>Cast Time</th>
                <th>Per Mana (HPM)</th>
                <th>Per Second (HPS)</th>
                <th>Coefficient</th>
              </tr>
            </thead>
            <tbody id="dr-ranks-tbody">
              <!-- Dynamically Populated -->
            </tbody>
          </table>
        </div>

        <!-- Dynamic Scaling SVG Chart -->
        <div class="dr-chart-wrapper">
          <h4 class="dr-chart-title">Heal Per Mana (HPM) Scaling with Bonus Power</h4>
          <div class="dr-svg-plot-container" id="dr-svg-plot"></div>
        </div>

        <!-- Verified Beta Downranking Mechanics Deep Dive -->
        <div class="dr-rules-callout">
          <h4>⚖️ How Downranking Works in WoW Forever vs Classic Era</h4>
          <p>
            <strong>1. Level 20 Sub-Rank Cut Removed:</strong> In Classic Era, spells learned before level 20 suffered a steep penalty cut (down to 12.3% coefficient for Lesser Heal). In <strong>WoW Forever (Build 1.60.6)</strong>, Blizzard eliminated the sub-20 penalty, giving low ranks their full coefficient!
          </p>
          <p>
            <strong>2. The 17-Level Grace Window:</strong> To prevent level 60 players from spamming Rank 1 spells in raids, WoW Forever introduces a sliding downrank scale: a spell rank retains 100% of its coefficient for <strong>17 levels after you learn it</strong>. After 17 levels, it loses <strong>5% coefficient per level</strong> down to 0% after 37 levels.
          </p>
          <p>
            <strong>3. DoubleZug Beta Telemetry:</strong> In-game tests with Level 19 and Level 30 characters confirmed that Healing Touch Rank 1 and Rejuvenation Rank 1 land within ±1.5 healing of our mathematical models!
          </p>
        </div>
      </div>
    </div>
  `;

  calculateAndRenderTable(currentSpell);
  renderScalingChart(currentSpell);
}

function calculateAndRenderTable(spell) {
  const tbody = document.getElementById('dr-ranks-tbody');
  if (!tbody) return;

  const ranksData = computeRankValues(spell);

  // Find max efficiency and max throughput
  let maxHpm = 0;
  let maxHps = 0;
  ranksData.forEach(r => {
    if (r.hpm > maxHpm) maxHpm = r.hpm;
    if (r.hps > maxHps) maxHps = r.hps;
  });

  tbody.innerHTML = ranksData.map(r => {
    const isTopHpm = r.hpm === maxHpm;
    const isTopHps = r.hps === maxHps;
    const isLocked = r.level > drState.playerLevel;

    return `
      <tr class="${isLocked ? 'is-locked-rank' : ''}">
        <td>
          <strong>Rank ${r.rank}</strong>
          ${isLocked ? '<span class="dr-tag-locked">Above Level</span>' : ''}
        </td>
        <td>Level ${r.level}</td>
        <td>
          <span class="dr-val-primary">${r.totalVal}</span>
          <small class="dr-val-range">(${r.baseMin}–${r.baseMax} base)</small>
        </td>
        <td>${r.manaCost}</td>
        <td>${r.castTime}s</td>
        <td class="${isTopHpm && !isLocked ? 'dr-cell-highlight green' : ''}">
          <strong>${r.hpm.toFixed(2)}</strong>
          ${isTopHpm && !isLocked ? '<span class="dr-badge-win">★ Most Efficient</span>' : ''}
        </td>
        <td class="${isTopHps && !isLocked ? 'dr-cell-highlight blue' : ''}">
          <strong>${r.hps.toFixed(1)}</strong>
          ${isTopHps && !isLocked ? '<span class="dr-badge-win blue">⚡ Top HPS</span>' : ''}
        </td>
        <td>
          <span class="dr-coef-text">${(r.effectiveCoef * 100).toFixed(1)}%</span>
        </td>
      </tr>
    `;
  }).join('');
}

function computeRankValues(spell) {
  return spell.ranks.map(r => {
    let coef = (drState.gameMode === 'forever') ? r.coefForever : r.coefClassic;

    // Apply Forever's 17-level penalty window if in Forever mode
    if (drState.gameMode === 'forever') {
      const levelsPast = drState.playerLevel - r.level;
      if (levelsPast > 17) {
        const penalty = (levelsPast - 17) * 0.05;
        coef = Math.max(0, coef * (1 - penalty));
      }
    }

    const avgBase = (r.minVal + r.maxVal) / 2;
    const healMod = 1 + (drState.talentHealPercent / 100);
    const manaMod = 1 - (drState.talentManaPercent / 100);
    const totalVal = Math.round((avgBase + (coef * drState.bonusPower)) * healMod);
    const manaCost = Math.round(r.mana * manaMod);

    const baseCast = r.cast || spell.baseCast || 1.5;
    const castTime = Math.max(1.5, baseCast - drState.talentCastReduction);
    const hpm = manaCost > 0 ? (totalVal / manaCost) : 0;
    const hps = castTime > 0 ? (totalVal / castTime) : 0;

    return {
      rank: r.rank,
      level: r.level,
      baseMin: r.minVal,
      baseMax: r.maxVal,
      totalVal,
      manaCost,
      castTime: castTime.toFixed(1),
      hpm,
      hps,
      effectiveCoef: coef
    };
  });
}

function renderScalingChart(spell) {
  const container = document.getElementById('dr-svg-plot');
  if (!container) return;

  const ranks = spell.ranks.filter(r => r.level <= drState.playerLevel);
  if (ranks.length === 0) {
    container.innerHTML = '<p style="color: var(--text-muted); text-align: center; padding: 2rem;">No ranks available at your level.</p>';
    return;
  }

  const svgWidth = 720;
  const svgHeight = 220;
  const padding = { top: 20, right: 90, bottom: 35, left: 45 };
  const plotW = svgWidth - padding.left - padding.right;
  const plotH = svgHeight - padding.top - padding.bottom;

  const bonusPoints = [0, 100, 200, 300, 400, 500];
  const rankColors = ['#38bdf8', '#34d399', '#fbbf24', '#f87171', '#a855f7', '#ec4899'];

  // Calculate HPM values at each point
  let maxHpmFound = 1;
  const rankSeries = ranks.map((r, idx) => {
    let coef = (drState.gameMode === 'forever') ? r.coefForever : r.coefClassic;
    if (drState.gameMode === 'forever') {
      const levelsPast = drState.playerLevel - r.level;
      if (levelsPast > 17) {
        coef = Math.max(0, coef * (1 - (levelsPast - 17) * 0.05));
      }
    }
    const avgBase = (r.minVal + r.maxVal) / 2;
    const mana = r.mana;

    const points = bonusPoints.map(bp => {
      const total = avgBase + (coef * bp);
      const hpm = total / mana;
      if (hpm > maxHpmFound) maxHpmFound = hpm;
      return { bp, hpm };
    });

    return { rank: r.rank, color: rankColors[idx % rankColors.length], points };
  });

  const yScale = (val) => padding.top + plotH - (val / (maxHpmFound * 1.15)) * plotH;
  const xScale = (bp) => padding.left + (bp / 500) * plotW;

  const linesSvg = rankSeries.map(series => {
    const d = series.points.map((pt, i) => `${i === 0 ? 'M' : 'L'} ${xScale(pt.bp)} ${yScale(pt.hpm)}`).join(' ');
    const lastPt = series.points[series.points.length - 1];
    return `
      <path d="${d}" fill="none" stroke="${series.color}" stroke-width="2.5" />
      <text x="${xScale(lastPt.bp) + 8}" y="${yScale(lastPt.hpm) + 4}" fill="${series.color}" font-size="12px" font-weight="bold">Rank ${series.rank}</text>
    `;
  }).join('');

  // Player position line
  const playerX = xScale(Math.min(500, drState.bonusPower));

  container.innerHTML = `
    <svg viewBox="0 0 ${svgWidth} ${svgHeight}" class="dr-svg-canvas">
      <!-- Grid lines -->
      <line x1="${padding.left}" y1="${padding.top + plotH}" x2="${padding.left + plotW}" y2="${padding.top + plotH}" stroke="#334155" />
      <line x1="${padding.left}" y1="${padding.top}" x2="${padding.left}" y2="${padding.top + plotH}" stroke="#334155" />

      <!-- X Axis Ticks -->
      ${bonusPoints.map(bp => `
        <text x="${xScale(bp)}" y="${padding.top + plotH + 20}" fill="#94a3b8" font-size="11px" text-anchor="middle">+${bp}</text>
      `).join('')}

      <!-- Player Marker -->
      <line x1="${playerX}" y1="${padding.top}" x2="${playerX}" y2="${padding.top + plotH}" stroke="#f6d88e" stroke-dasharray="4,4" stroke-width="1.5" />
      <text x="${playerX}" y="${padding.top - 5}" fill="#f6d88e" font-size="11px" text-anchor="middle">You (+${drState.bonusPower})</text>

      <!-- Lines -->
      ${linesSvg}
    </svg>
  `;
}

// Global hook helpers
window.setDownrankClass = function(classId) {
  drState.selectedClass = classId;
  const dataset = window.WOW_TOOLS_DATA?.downranking;
  if (dataset && dataset.spells[classId]) {
    drState.selectedSpellId = dataset.spells[classId][0].id;
  }
  renderDownrankCalculator();
};

window.setDownrankSpell = function(spellId) {
  drState.selectedSpellId = spellId;
  renderDownrankCalculator();
};

window.setDownrankMode = function(mode) {
  drState.gameMode = mode;
  renderDownrankCalculator();
};

window.updateDownrankInput = function(key, val) {
  drState[key] = parseFloat(val) || 0;
  if (key === 'playerLevel') {
    const disp = document.getElementById('dr-lvl-display');
    if (disp) disp.textContent = val;
  }
  const dataset = window.WOW_TOOLS_DATA?.downranking;
  const currentSpell = dataset?.spells[drState.selectedClass]?.find(s => s.id === drState.selectedSpellId);
  if (currentSpell) {
    calculateAndRenderTable(currentSpell);
    renderScalingChart(currentSpell);
  }
};

window.initDownrankCalculator = initDownrankCalculator;
