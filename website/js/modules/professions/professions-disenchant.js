/**
 * World of Warcraft: Forever - Disenchanting Yields Calculator & Matrix Controller
 * Provides interactive yield simulations, skill requirements, and full tables.
 */

(function () {
  'use strict';

  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function getIconUrl(iconName) {
    if (!iconName) return 'https://wow.zamimg.com/images/wow/icons/large/inv_misc_questionmark.jpg';
    const clean = iconName.replace(/\.(jpg|png|webp)$/i, '').toLowerCase().trim();
    return `https://wow.zamimg.com/images/wow/icons/large/${clean}.jpg`;
  }

  // Material icon mapping for clean visual cards
  const MATERIAL_ICONS = {
    'strange dust': 'inv_enchant_duststrange',
    'soul dust': 'inv_enchant_dustsoul',
    'vision dust': 'inv_enchant_dustvision',
    'dream dust': 'inv_enchant_dustdream',
    'illusion dust': 'inv_enchant_dustillusion',
    'lesser magic essence': 'inv_enchant_essencemagicsmall',
    'greater magic essence': 'inv_enchant_essencemagiclarge',
    'lesser astral essence': 'inv_enchant_essenceastralsmall',
    'greater astral essence': 'inv_enchant_essenceastrallarge',
    'lesser mystic essence': 'inv_enchant_essencemysticsmall',
    'greater mystic essence': 'inv_enchant_essencemysticlarge',
    'lesser nether essence': 'inv_enchant_essencenethersmall',
    'greater nether essence': 'inv_enchant_essencenetherlarge',
    'lesser eternal essence': 'inv_enchant_essenceeternalsmall',
    'greater eternal essence': 'inv_enchant_essenceeternallarge',
    'small glimmering shard': 'inv_enchant_shardglimmeringsmall',
    'large glimmering shard': 'inv_enchant_shardglimmeringlarge',
    'small glowing shard': 'inv_enchant_shardglowingsmall',
    'large glowing shard': 'inv_enchant_shardglowinglarge',
    'small radiant shard': 'inv_enchant_shardradiantsmall',
    'large radiant shard': 'inv_enchant_shardradiantlarge',
    'small brilliant shard': 'inv_enchant_shardbrilliantsmall',
    'large brilliant shard': 'inv_enchant_shardbrilliantlarge',
    'nexus crystal': 'inv_enchant_shardnexuslarge'
  };

  function resolveMaterialIcon(name) {
    const n = (name || '').toLowerCase();
    for (const [key, icon] of Object.entries(MATERIAL_ICONS)) {
      if (n.includes(key)) return icon;
    }
    return 'inv_enchant_duststrange';
  }

  function formatCopper(c) {
    if (!c || c <= 0) return '0c';
    const g = Math.floor(c / 10000);
    const s = Math.floor((c % 10000) / 100);
    const cp = Math.floor(c % 100);
    const parts = [];
    if (g > 0) parts.push(`${g}g`);
    if (s > 0 || g > 0) parts.push(`${s}s`);
    if (cp > 0 || parts.length === 0) parts.push(`${cp}c`);
    return parts.join(' ');
  }

  function getMaterialAHPrice(name) {
    if (!name || name === '—') return null;
    const lower = name.toLowerCase();
    const market = window.WOW_MARKET_SCAN_DATA;
    if (!market || !market.byName) return null;
    for (const key of Object.keys(MATERIAL_ICONS)) {
      if (lower.includes(key)) {
        return market.byName[key] || null;
      }
    }
    return null;
  }

  function renderDisenchantingTab(container, _prof) {
    const tableData = window.WOW_DISENCHANT_TABLE || [];

    let state = {
      quality: 'uncommon', // uncommon, rare, epic
      slotType: 'armor',    // armor, weapon
      ilvl: 45,
      filterRarity: 'all'
    };

    container.innerHTML = `
      <div class="leveling-header-block">
        <div class="leveling-header-title">
          <h3>DISENCHANTING TABLES &amp; YIELD CALCULATOR</h3>
          <p>Skill requirements, item level brackets, and exact dust, essence, and shard probabilities for all 1–300 gear.</p>
        </div>
      </div>

      <!-- Interactive Calculator Section -->
      <div class="disenchant-calc-card">
        <div class="disenchant-calc-header">
          <div class="calc-header-title">
            <span class="calc-icon">🔮</span>
            <div>
              <h4>Interactive Disenchant Calculator</h4>
              <p>Select item quality, slot, and item level to simulate exact yield odds.</p>
            </div>
          </div>
          <div class="disenchant-quality-toggle" role="group" aria-label="Select item rarity">
            <button type="button" class="disenchant-btn ${state.quality === 'uncommon' ? 'active' : ''}" data-quality="uncommon">Uncommon (Green)</button>
            <button type="button" class="disenchant-btn ${state.quality === 'rare' ? 'active' : ''}" data-quality="rare">Rare (Blue)</button>
            <button type="button" class="disenchant-btn ${state.quality === 'epic' ? 'active' : ''}" data-quality="epic">Epic (Purple)</button>
          </div>
        </div>

        <div class="disenchant-calc-controls">
          <div class="calc-control-group">
            <label for="disenchant-slot-select">Item Slot Type:</label>
            <div class="disenchant-slot-toggle" role="group">
              <button type="button" class="slot-btn ${state.slotType === 'armor' ? 'active' : ''}" data-slot="armor">🛡️ Armor (Favors Dust)</button>
              <button type="button" class="slot-btn ${state.slotType === 'weapon' ? 'active' : ''}" data-slot="weapon">⚔️ Weapon (Favors Essence)</button>
            </div>
          </div>

          <div class="calc-control-group slider-group">
            <div class="slider-label-row">
              <label for="disenchant-ilvl-slider">Item Level (iLvl):</label>
              <div class="ilvl-badge-input">
                <span class="ilvl-display-val" id="ilvl-display-val">iLvl ${state.ilvl}</span>
                <input type="number" id="disenchant-ilvl-input" min="5" max="80" value="${state.ilvl}" aria-label="Item level number input" />
              </div>
            </div>
            <input type="range" id="disenchant-ilvl-slider" min="5" max="80" value="${state.ilvl}" class="ilvl-slider" aria-label="Item level slider" />
            <div class="slider-ticks">
              <span>iLvl 5</span>
              <span>20</span>
              <span>35</span>
              <span>50</span>
              <span>60</span>
              <span>80</span>
            </div>
          </div>
        </div>

        <!-- Real-Time Calculated Yield Display -->
        <div id="disenchant-yield-output" class="disenchant-yield-output">
          <!-- Dynamic Yield Output -->
        </div>
      </div>

      <!-- Disenchanting Skill Brackets Summary -->
      <div class="disenchant-summary-section">
        <h4 class="summary-section-title"><span>📜</span> Disenchanting Skill Requirement Progression</h4>
        <div class="disenchant-tiers-grid">
          <div class="disenchant-tier-card">
            <div class="tier-head"><span class="badge-skill">Skill 1</span> iLvl 5–20</div>
            <p>Starter green equipment from starter lands, Deadmines, and Wailing Caverns.</p>
          </div>
          <div class="disenchant-tier-card">
            <div class="tier-head"><span class="badge-skill">Skill 25</span> iLvl 21–25</div>
            <p>Blackfathom Deeps, Shadowfang Keep, and early 20s quest rewards.</p>
          </div>
          <div class="disenchant-tier-card">
            <div class="tier-head"><span class="badge-skill">Skill 50</span> iLvl 26–30</div>
            <p>Gnomeregan, Razorfen Kraul, and level 25–30 open world greens.</p>
          </div>
          <div class="disenchant-tier-card">
            <div class="tier-head"><span class="badge-skill">Skill 75</span> iLvl 31–35</div>
            <p>Scarlet Monastery (Graveyard/Library) and early 30s greens.</p>
          </div>
          <div class="disenchant-tier-card">
            <div class="tier-head"><span class="badge-skill">Skill 100</span> iLvl 36–40</div>
            <p>Scarlet Monastery (Armory/Cathedral) and Razorfen Downs.</p>
          </div>
          <div class="disenchant-tier-card">
            <div class="tier-head"><span class="badge-skill">Skill 125</span> iLvl 41–45</div>
            <p>Uldaman, Zul'Farrak early drops, and level 40 world blues.</p>
          </div>
          <div class="disenchant-tier-card">
            <div class="tier-head"><span class="badge-skill">Skill 150</span> iLvl 46–50</div>
            <p>Maraudon, Sunken Temple, and late level 40 dungeon gear.</p>
          </div>
          <div class="disenchant-tier-card">
            <div class="tier-head"><span class="badge-skill">Skill 175</span> iLvl 51–55</div>
            <p>Blackrock Depths, Stratholme live, and level 50+ world drops.</p>
          </div>
          <div class="disenchant-tier-card">
            <div class="tier-head"><span class="badge-skill">Skill 200+</span> iLvl 56–60+</div>
            <p>Scholomance, Stratholme undead, Upper Blackrock Spire, and raid epics.</p>
          </div>
        </div>
      </div>

      <!-- Full Disenchanting Table -->
      <div class="disenchant-table-section">
        <div class="table-section-header">
          <h4 class="table-title"><span>📊</span> Complete Disenchanting Yield Probability Matrix</h4>
          <div class="table-filter-group" role="group" aria-label="Filter rarity">
            <button type="button" class="filter-chip active" data-filter="all">All Items</button>
            <button type="button" class="filter-chip" data-filter="uncommon">Greens Only</button>
            <button type="button" class="filter-chip" data-filter="rare">Blues Only</button>
            <button type="button" class="filter-chip" data-filter="epic">Epics Only</button>
          </div>
        </div>

        <div class="disenchant-table-wrapper">
          <table class="disenchant-data-table">
            <thead>
              <tr>
                <th>Item Level</th>
                <th>Rarity</th>
                <th>Req Skill</th>
                <th>Armor Yields</th>
                <th>Weapon Yields</th>
                <th>Shard Odds</th>
              </tr>
            </thead>
            <tbody id="disenchant-table-body">
              <!-- Rendered via JS -->
            </tbody>
          </table>
        </div>
      </div>
    `;

    function computeYield(ilvl, quality) {
      // Find matching row in WOW_DISENCHANT_TABLE
      const match = tableData.find(row => {
        const isGreen = row.rarity.toLowerCase().includes('green') || row.rarity.toLowerCase().includes('uncommon');
        const isBlue = row.rarity.toLowerCase().includes('blue') || row.rarity.toLowerCase().includes('rare');
        const isPurple = row.rarity.toLowerCase().includes('epic') || row.rarity.toLowerCase().includes('purple');

        if (quality === 'uncommon' && !isGreen) return false;
        if (quality === 'rare' && !isBlue) return false;
        if (quality === 'epic' && !isPurple) return false;

        const parts = row.ilvlRange.replace('+', '').split('–');
        const min = parseInt(parts[0], 10) || 1;
        const max = parts[1] ? parseInt(parts[1], 10) : 999;
        return ilvl >= min && ilvl <= max;
      }) || tableData[tableData.length - 1];

      return match;
    }

    function updateCalculator() {
      const yieldOutput = container.querySelector('#disenchant-yield-output');
      const ilvlDisplay = container.querySelector('#ilvl-display-val');
      const ilvlInput = container.querySelector('#disenchant-ilvl-input');
      const slider = container.querySelector('#disenchant-ilvl-slider');

      if (ilvlDisplay) ilvlDisplay.textContent = `iLvl ${state.ilvl}`;
      if (ilvlInput && parseInt(ilvlInput.value, 10) !== state.ilvl) ilvlInput.value = state.ilvl;
      if (slider && parseInt(slider.value, 10) !== state.ilvl) slider.value = state.ilvl;

      if (!yieldOutput) return;

      const result = computeYield(state.ilvl, state.quality, state.slotType);
      const isWeapon = state.slotType === 'weapon';
      const yieldStr = isWeapon ? (result.weaponYield || result.armorYield) : result.armorYield;
      const primaryPriceObj = getMaterialAHPrice(yieldStr);
      const shardPriceObj = getMaterialAHPrice(result.shardYield);

      yieldOutput.innerHTML = `
        <div class="yield-result-panel">
          <div class="yield-meta-bar">
            <div class="yield-skill-chip">
              <span>Required Enchanting:</span>
              <strong style="color: var(--text-gold, #facc15);">Skill ${result.reqSkill}+</strong>
            </div>
            <div class="yield-quality-chip quality-${state.quality}">
              <span>Target:</span>
              <strong>${state.quality.toUpperCase()} ${state.slotType.toUpperCase()} (iLvl ${state.ilvl})</strong>
            </div>
            ${primaryPriceObj?.minBuyout > 0 ? `
              <div class="yield-skill-chip" style="background: rgba(250, 204, 21, 0.1); border-color: rgba(250, 204, 21, 0.3);">
                <span>PvE AH Sync:</span>
                <strong style="color: #facc15;">Active</strong>
              </div>
            ` : ''}
          </div>

          <div class="yield-cards-row">
            <div class="yield-card primary">
              <div class="yield-card-badge">Primary Material Yield</div>
              <div class="yield-card-content">
                <img src="${getIconUrl(resolveMaterialIcon(yieldStr))}" alt="Material" class="yield-mat-icon" loading="lazy" />
                <div class="yield-text-block">
                  <span class="yield-headline">${escapeHtml(yieldStr)}</span>
                  ${primaryPriceObj?.minBuyout > 0 ? `<div style="color: #facc15; font-size: 0.8rem; font-weight: 700; margin-top: 0.2rem;">🪙 Live PvE AH: ${formatCopper(primaryPriceObj.minBuyout)} / unit</div>` : ''}
                  <p class="yield-desc">${isWeapon ? 'Weapons heavily prioritize Essences over Dusts.' : 'Armor heavily prioritizes Dusts over Essences.'}</p>
                </div>
              </div>
            </div>

            <div class="yield-card shard">
              <div class="yield-card-badge">Shard / Rare Material Yield</div>
              <div class="yield-card-content">
                <img src="${getIconUrl(resolveMaterialIcon(result.shardYield))}" alt="Shard" class="yield-mat-icon" loading="lazy" />
                <div class="yield-text-block">
                  <span class="yield-headline">${escapeHtml(result.shardYield || '—')}</span>
                  ${shardPriceObj?.minBuyout > 0 ? `<div style="color: #facc15; font-size: 0.8rem; font-weight: 700; margin-top: 0.2rem;">🪙 Live PvE AH: ${formatCopper(shardPriceObj.minBuyout)} / unit</div>` : ''}
                  <p class="yield-desc">${result.shardYield && result.shardYield !== '—' ? 'Bonus roll on uncommon items; 100% guaranteed on rare & epic crafts.' : 'No shard roll in this early tier.'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      `;
    }

    function renderTable() {
      const tbody = container.querySelector('#disenchant-table-body');
      if (!tbody) return;

      const filtered = tableData.filter(row => {
        if (state.filterRarity === 'all') return true;
        const r = row.rarity.toLowerCase();
        if (state.filterRarity === 'uncommon') return r.includes('green') || r.includes('uncommon');
        if (state.filterRarity === 'rare') return r.includes('blue') || r.includes('rare');
        if (state.filterRarity === 'epic') return r.includes('purple') || r.includes('epic');
        return true;
      });

      tbody.innerHTML = filtered.map(row => {
        const isGreen = row.rarity.toLowerCase().includes('green');
        const isBlue = row.rarity.toLowerCase().includes('blue');
        const qClass = isGreen ? 'q2' : (isBlue ? 'q3' : 'q4');
        return `
          <tr>
            <td><strong>iLvl ${escapeHtml(row.ilvlRange)}</strong></td>
            <td><span class="rarity-badge ${qClass}">${escapeHtml(row.rarity)}</span></td>
            <td><span class="skill-req-pill">Skill ${row.reqSkill}</span></td>
            <td>${escapeHtml(row.armorYield)}</td>
            <td>${escapeHtml(row.weaponYield)}</td>
            <td><span class="shard-pill">${escapeHtml(row.shardYield)}</span></td>
          </tr>
        `;
      }).join('');
    }

    // Attach listeners
    const qualityBtns = container.querySelectorAll('.disenchant-quality-toggle .disenchant-btn');
    qualityBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        qualityBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        state.quality = btn.dataset.quality;
        updateCalculator();
      });
    });

    const slotBtns = container.querySelectorAll('.disenchant-slot-toggle .slot-btn');
    slotBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        slotBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        state.slotType = btn.dataset.slot;
        updateCalculator();
      });
    });

    const slider = container.querySelector('#disenchant-ilvl-slider');
    const ilvlInput = container.querySelector('#disenchant-ilvl-input');

    if (slider) {
      slider.addEventListener('input', (e) => {
        state.ilvl = parseInt(e.target.value, 10);
        updateCalculator();
      });
    }

    if (ilvlInput) {
      ilvlInput.addEventListener('change', (e) => {
        let val = parseInt(e.target.value, 10);
        if (isNaN(val)) val = 5;
        if (val < 5) val = 5;
        if (val > 80) val = 80;
        state.ilvl = val;
        updateCalculator();
      });
    }

    const filterBtns = container.querySelectorAll('.table-filter-group .filter-chip');
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        state.filterRarity = btn.dataset.filter;
        renderTable();
      });
    });

    // Initial render
    updateCalculator();
    renderTable();
  }

  window.WOW_PROFESSIONS_DISENCHANT = {
    renderDisenchantingTab
  };
})();
