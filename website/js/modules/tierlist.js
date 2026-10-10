/**
 * World of Warcraft: Forever - Interactive Tier List Maker Module
 * Provides drag-and-drop, keyboard hotkeys (S, A, B, C, D, F, Backspace),
 * Canvas PNG export, clipboard copying, state persistence, and categories.
 */

let activeTierCategory = 'specs-dps';
let tierAllocations = {}; // { tokenKey: 'S' | 'A' | 'B' | 'C' | 'D' | 'F' }
let hoveredTokenId = null;

function initTierListMaker() {
  const container = document.getElementById('tierlist-builder-container') || document.getElementById('tierlist-container');
  if (!container) return;
  if (container.id !== 'tierlist-builder-container') container.id = 'tierlist-builder-container';

  loadTierListState();
  renderTierListUI();
  setupTierListEvents();
}

function loadTierListState() {
  const saved = localStorage.getItem(`wow_forever_tierlist_${activeTierCategory}`);
  if (saved) {
    try {
      tierAllocations = JSON.parse(saved);
    } catch (e) {
      tierAllocations = {};
    }
  } else {
    tierAllocations = {};
  }
}

function saveTierListState() {
  localStorage.setItem(`wow_forever_tierlist_${activeTierCategory}`, JSON.stringify(tierAllocations));
}

function getActiveTokens() {
  const tl = window.WOW_TOOLS_DATA?.tierList;
  if (!tl) return [];

  if (activeTierCategory === 'specs-dps') return tl.specs.dps;
  if (activeTierCategory === 'specs-tanks') return tl.specs.tanks;
  if (activeTierCategory === 'specs-healers') return tl.specs.healers;
  if (activeTierCategory === 'specs-all') return [...tl.specs.dps, ...tl.specs.tanks, ...tl.specs.healers];
  if (activeTierCategory === 'classes') return tl.classes;
  if (activeTierCategory === 'races') return tl.races;
  if (activeTierCategory === 'combos') return tl.combosHighlight;
  return tl.specs.dps;
}

function renderTierListUI() {
  const container = document.getElementById('tierlist-builder-container');
  if (!container) return;

  const tokens = getActiveTokens();
  const tiers = ['S', 'A', 'B', 'C', 'D', 'F'];
  const tierColors = {
    S: '#FF7F7F',
    A: '#FFBF7F',
    B: '#FFDF7F',
    C: '#FFFF7F',
    D: '#BFFF7F',
    F: '#7FFF7F'
  };

  const defaultTitles = {
    'specs-dps': 'WoW Forever DPS Tier List (Beta Phase 2)',
    'specs-tanks': 'WoW Forever Tank Tier List (Level 30 Meta)',
    'specs-healers': 'WoW Forever Healer Efficiency Tier List',
    'specs-all': 'WoW Forever All 27 Specs Leveling Tier List',
    'classes': 'WoW Forever Class Tier List (Phase 2)',
    'races': 'WoW Forever Racial Traits Tier List',
    'combos': 'WoW Forever New Combinations Tier List'
  };

  container.innerHTML = `
    <div class="tierlist-header-bar">
      <div class="tl-category-tabs">
        <button class="tl-cat-btn ${activeTierCategory === 'specs-dps' ? 'active' : ''}" data-cat="specs-dps">DPS (${window.WOW_TOOLS_DATA?.tierList.specs.dps.length || 20})</button>
        <button class="tl-cat-btn ${activeTierCategory === 'specs-tanks' ? 'active' : ''}" data-cat="specs-tanks">Tanks (${window.WOW_TOOLS_DATA?.tierList.specs.tanks.length || 3})</button>
        <button class="tl-cat-btn ${activeTierCategory === 'specs-healers' ? 'active' : ''}" data-cat="specs-healers">Healers (${window.WOW_TOOLS_DATA?.tierList.specs.healers.length || 5})</button>
        <button class="tl-cat-btn ${activeTierCategory === 'specs-all' ? 'active' : ''}" data-cat="specs-all">All 27 Specs</button>
        <button class="tl-cat-btn ${activeTierCategory === 'classes' ? 'active' : ''}" data-cat="classes">Classes (9)</button>
        <button class="tl-cat-btn ${activeTierCategory === 'races' ? 'active' : ''}" data-cat="races">Races (10)</button>
        <button class="tl-cat-btn ${activeTierCategory === 'combos' ? 'active' : ''}" data-cat="combos">New Combos</button>
      </div>
      <div class="tl-controls-row">
        <input type="text" id="tierlist-custom-title" name="tierlist-title" aria-label="Tier list custom title" class="tl-title-input" value="${defaultTitles[activeTierCategory] || 'WoW Forever Tier List'}" placeholder="Enter Tier List Title..." />
        <div class="tl-action-buttons">
          <button id="tl-btn-save-image" class="tl-act-btn tl-btn-primary">
            <span>💾</span> Save Image
          </button>
          <button id="tl-btn-copy-image" class="tl-act-btn">
            <span>📋</span> Copy Image
          </button>
          <button id="tl-btn-copy-link" class="tl-act-btn">
            <span>🔗</span> Share Link
          </button>
          <button id="tl-btn-reset" class="tl-act-btn tl-btn-danger">
            <span>↺</span> Reset
          </button>
        </div>
      </div>
    </div>

    <!-- TIER BOARD -->
    <div class="tier-board" id="tier-board-rows">
      ${tiers.map(tier => {
        const rowTokens = tokens.filter(t => tierAllocations[t.id] === tier);
        return `
          <div class="tier-row" data-tier="${tier}" style="--tier-color: ${tierColors[tier]}">
            <div class="tier-label" style="background-color: ${tierColors[tier]};">${tier}</div>
            <div class="tier-dropzone" data-tier="${tier}">
              ${rowTokens.map(token => renderTokenHTML(token)).join('')}
            </div>
          </div>
        `;
      }).join('')}
    </div>

    <!-- UNRANKED POOL -->
    <div class="tier-pool-wrapper">
      <div class="tier-pool-header">
        <h4>Unranked Tokens</h4>
        <span class="tier-pool-hint">
          💡 Drag into rows, or hover any token and press <strong>S</strong>, <strong>A</strong>, <strong>B</strong>, <strong>C</strong>, <strong>D</strong>, <strong>F</strong> (or <strong>Backspace</strong> to reset).
        </span>
      </div>
      <div class="tier-dropzone tier-pool-dropzone" data-tier="pool">
        ${tokens.filter(t => !tierAllocations[t.id]).map(token => renderTokenHTML(token)).join('')}
      </div>
    </div>
  `;

  attachInteractiveTokenEvents();
}

function renderTokenHTML(token) {
  return `
    <div class="tl-token-card" 
         id="token-${token.id}" 
         data-token-id="${token.id}" 
         draggable="true" 
         title="${token.name}${token.class ? ` (${token.class})` : ''}"
         style="--token-accent: ${token.color || 'var(--text-gold)'}">
      <img src="${token.icon}" alt="${token.name}" class="tl-token-icon" draggable="false" />
      <span class="tl-token-name">${token.name}</span>
    </div>
  `;
}

function attachInteractiveTokenEvents() {
  const tokenCards = document.querySelectorAll('.tl-token-card');
  const dropzones = document.querySelectorAll('.tier-dropzone');

  // Drag start & end
  tokenCards.forEach(card => {
    card.addEventListener('dragstart', (e) => {
      e.dataTransfer.setData('text/plain', card.getAttribute('data-token-id'));
      card.classList.add('is-dragging');
    });

    card.addEventListener('dragend', () => {
      card.classList.remove('is-dragging');
    });

    // Track hovered token for keyboard shortcuts
    card.addEventListener('mouseenter', () => {
      hoveredTokenId = card.getAttribute('data-token-id');
    });
    card.addEventListener('mouseleave', () => {
      if (hoveredTokenId === card.getAttribute('data-token-id')) {
        hoveredTokenId = null;
      }
    });

    // Touch tap support: tap token then tap tier
    card.addEventListener('click', (e) => {
      e.stopPropagation();
      document.querySelectorAll('.tl-token-card').forEach(c => c.classList.remove('is-selected'));
      card.classList.add('is-selected');
      hoveredTokenId = card.getAttribute('data-token-id');
    });
  });

  // Dropzone dragover & drop
  dropzones.forEach(zone => {
    zone.addEventListener('dragover', (e) => {
      e.preventDefault();
      zone.classList.add('is-drag-target');
    });

    zone.addEventListener('dragleave', () => {
      zone.classList.remove('is-drag-target');
    });

    zone.addEventListener('drop', (e) => {
      e.preventDefault();
      zone.classList.remove('is-drag-target');
      const tokenId = e.dataTransfer.getData('text/plain');
      const targetTier = zone.getAttribute('data-tier');
      moveTokenToTier(tokenId, targetTier);
    });

    zone.addEventListener('click', () => {
      const selected = document.querySelector('.tl-token-card.is-selected');
      if (selected) {
        const tokenId = selected.getAttribute('data-token-id');
        const targetTier = zone.getAttribute('data-tier');
        moveTokenToTier(tokenId, targetTier);
        selected.classList.remove('is-selected');
      }
    });
  });
}

function moveTokenToTier(tokenId, tier) {
  if (!tokenId) return;
  if (tier === 'pool') {
    delete tierAllocations[tokenId];
  } else {
    tierAllocations[tokenId] = tier;
  }
  saveTierListState();
  renderTierListUI();
}

let tierListEventsInitialized = false;

function setupTierListEvents() {
  const container = document.getElementById('tierlist-builder-container') || document.getElementById('tierlist-container');
  if (!container || tierListEventsInitialized) return;
  tierListEventsInitialized = true;

  // Delegated click handler on container so dynamic re-renders never drop events
  container.addEventListener('click', (e) => {
    // Category switching
    const catBtn = e.target.closest('.tl-cat-btn');
    if (catBtn) {
      const cat = catBtn.getAttribute('data-cat');
      if (cat && cat !== activeTierCategory) {
        activeTierCategory = cat;
        loadTierListState();
        renderTierListUI();
      }
      return;
    }

    // Reset button
    const resetBtn = e.target.closest('#tl-btn-reset');
    if (resetBtn) {
      if (confirm('Reset this tier list back to unranked?')) {
        tierAllocations = {};
        saveTierListState();
        renderTierListUI();
      }
      return;
    }

    // Save Image (Canvas download)
    const saveImgBtn = e.target.closest('#tl-btn-save-image');
    if (saveImgBtn) {
      exportTierListImage(false);
      return;
    }

    // Copy Image (Clipboard)
    const copyImgBtn = e.target.closest('#tl-btn-copy-image');
    if (copyImgBtn) {
      exportTierListImage(true);
      return;
    }

    // Share Link
    const shareBtn = e.target.closest('#tl-btn-copy-link');
    if (shareBtn) {
      const state = btoa(JSON.stringify({ cat: activeTierCategory, alloc: tierAllocations }));
      const url = `${window.location.origin}${window.location.pathname}#tierlist=${state}`;
      navigator.clipboard.writeText(url).then(() => {
        alert('Tier list link copied to clipboard!');
      }).catch(() => {
        prompt('Copy your tier list link:', url);
      });
      return;
    }
  });

  // Global Keyboard shortcuts: S, A, B, C, D, F, Backspace
  document.addEventListener('keydown', (e) => {
    // Ignore if typing inside text input
    if (['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName)) return;

    if (!hoveredTokenId) return;

    const key = e.key.toUpperCase();
    if (['S', 'A', 'B', 'C', 'D', 'F'].includes(key)) {
      e.preventDefault();
      moveTokenToTier(hoveredTokenId, key);
    } else if (e.key === 'Backspace' || e.key === 'Delete') {
      e.preventDefault();
      moveTokenToTier(hoveredTokenId, 'pool');
    }
  });
}

/**
 * High-definition Canvas Export
 */
function exportTierListImage(copyToClipboard) {
  const title = document.getElementById('tierlist-custom-title')?.value || 'WoW Forever Tier List';
  const tiers = ['S', 'A', 'B', 'C', 'D', 'F'];
  const tierColors = { S: '#FF7F7F', A: '#FFBF7F', B: '#FFDF7F', C: '#FFFF7F', D: '#BFFF7F', F: '#7FFF7F' };
  const tokens = getActiveTokens();

  const canvas = document.createElement('canvas');
  const width = 1200;
  const rowHeight = 90;
  const headerHeight = 110;
  const footerHeight = 50;
  const height = headerHeight + (tiers.length * rowHeight) + footerHeight;

  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');

  // Background
  ctx.fillStyle = '#0a0d14';
  ctx.fillRect(0, 0, width, height);

  // Header Title
  ctx.fillStyle = '#f6d88e';
  ctx.font = 'bold 32px Cinzel, Georgia, serif';
  ctx.textAlign = 'left';
  ctx.fillText(title, 40, 50);

  // Subtitle / Date
  ctx.fillStyle = '#94a3b8';
  ctx.font = '16px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
  ctx.fillText(`World of Warcraft: Forever (Beta Build 1.60.6) • Generated ${new Date().toLocaleDateString()}`, 40, 80);

  // Draw Tiers
  tiers.forEach((tier, index) => {
    const y = headerHeight + (index * rowHeight);
    const color = tierColors[tier];

    // Row background
    ctx.fillStyle = '#111726';
    ctx.fillRect(40, y, width - 80, rowHeight - 6);

    // Tier Label Box
    ctx.fillStyle = color;
    ctx.fillRect(40, y, 80, rowHeight - 6);
    ctx.fillStyle = '#0a0d14';
    ctx.font = 'bold 36px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(tier, 80, y + (rowHeight - 6) / 2);

    // Row tokens
    const rowTokens = tokens.filter(t => tierAllocations[t.id] === tier);
    rowTokens.forEach((token, tIdx) => {
      const tx = 135 + (tIdx * 105);
      if (tx + 95 < width - 50) {
        // Token card badge
        ctx.fillStyle = '#1e293b';
        ctx.strokeStyle = token.color || '#f6d88e';
        ctx.lineWidth = 1.5;
        ctx.fillRect(tx, y + 8, 95, rowHeight - 22);
        ctx.strokeRect(tx, y + 8, 95, rowHeight - 22);

        // Token name text
        ctx.fillStyle = '#f8fafc';
        ctx.font = 'bold 12px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        const displayName = token.name.length > 12 ? token.name.substring(0, 11) + '…' : token.name;
        ctx.fillText(displayName, tx + 47, y + (rowHeight - 6) / 2);
      }
    });
  });

  // Footer branding
  const footY = height - 20;
  ctx.fillStyle = '#64748b';
  ctx.font = '14px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('⚡ World of Warcraft: Forever — Community Hub & Classic+ Tracker (https://wow-forever.onrender.com)', width / 2, footY);

  if (copyToClipboard && navigator.clipboard && window.ClipboardItem) {
    canvas.toBlob(blob => {
      navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })])
        .then(() => alert('Tier list image copied to clipboard!'))
        .catch(() => alert('Could not copy image directly. Use "Save Image" instead.'));
    });
  } else {
    const link = document.createElement('a');
    link.download = `wow-forever-tier-list-${activeTierCategory}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  }
}

// Export to window
if (typeof window !== 'undefined') {
  window.initTierListMaker = initTierListMaker;
}
