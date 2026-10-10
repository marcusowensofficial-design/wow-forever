/**
 * World of Warcraft: Forever - World Atlas, Rares & Honor Hub Module
 * Manages the World Atlas tab:
 * 1. 34 World Rares Radar with 1-click /target macro copy & zone filters
 * 2. 40 Hidden Library Books Tracker with localStorage progress & milestone rewards
 * 3. PvP Rank Points Weekly Schedule, Caps, and Battleground Arenas
 */

function initAtlas() {
  setupAtlasSubNav();
  renderRaresRadar();
  renderBooksTracker();
  renderPvPSchedule();
}

function setupAtlasSubNav() {
  const subNavBtns = document.querySelectorAll('.atlas-subnav-btn');
  const panels = document.querySelectorAll('.atlas-subtab-panel');

  subNavBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetSub = btn.getAttribute('data-subtab');
      subNavBtns.forEach(b => b.classList.remove('active'));
      panels.forEach(p => {
        p.classList.remove('active');
        p.setAttribute('hidden', '');
      });

      btn.classList.add('active');
      const targetPanel = document.getElementById(`atlas-subtab-${targetSub}`);
      if (targetPanel) {
        targetPanel.removeAttribute('hidden');
        targetPanel.classList.add('active');
      }
    });
  });
}

/* ==========================================================================
   1. WORLD RARES RADAR
   ========================================================================== */
function renderRaresRadar() {
  const container = document.getElementById('atlas-rares-grid') || document.getElementById('rares-grid-container');
  const searchInput = document.getElementById('atlas-rare-search') || document.getElementById('rares-search-input');
  const zonePills = document.querySelectorAll('#atlas-zone-filters .atlas-pill');
  if (!container || !window.WOW_ATLAS_DATA?.rares) return;

  const rares = window.WOW_ATLAS_DATA.rares;
  let activeZone = 'all';

  function filterAndRender() {
    const query = searchInput ? searchInput.value.toLowerCase().trim() : '';

    const filtered = rares.filter(r => {
      const matchZone = activeZone === 'all' || r.zone.toLowerCase().includes(activeZone.toLowerCase());
      const matchQuery = !query ||
        r.name.toLowerCase().includes(query) ||
        r.zone.toLowerCase().includes(query) ||
        r.lore.toLowerCase().includes(query) ||
        (r.drops && r.drops.some(d => (d.name && d.name.toLowerCase().includes(query)) || (d.stats && d.stats.toLowerCase().includes(query))));
      return matchZone && matchQuery;
    });

    if (filtered.length === 0) {
      container.innerHTML = `
        <div style="grid-column: 1 / -1; padding: 2.5rem; text-align: center; color: var(--text-muted); background: rgba(0,0,0,0.3); border-radius: var(--radius-md);">
          <p>No world rares found matching "${escapeHtml(query || activeZone)}".</p>
        </div>
      `;
      return;
    }

    container.innerHTML = filtered.map(rare => `
      <div class="atlas-rare-card ${rare.elite ? 'is-elite' : ''}">
        <div class="rare-card-header">
          <div>
            <h3 class="rare-name">${escapeHtml(rare.name)}</h3>
            <div class="rare-zone">📍 ${escapeHtml(rare.zone)}</div>
          </div>
          <div class="rare-badge-group">
            <span class="rare-level-pill">Lvl ${rare.level}</span>
            ${rare.elite ? '<span class="rare-elite-pill">Elite</span>' : ''}
            ${rare.tameable ? `<span class="rare-level-pill" style="color: #6ee7b7; border: 1px solid rgba(16, 185, 129, 0.4);">🐾 ${escapeHtml(rare.tameable)}</span>` : ''}
          </div>
        </div>

        <div class="rare-coords-box">
          <strong>Coords:</strong> ${escapeHtml(rare.coords)}
          ${rare.respawn ? `<div style="margin-top: 0.15rem; font-size: 0.76rem; color: #cbd5e1;">⏱️ Respawn: ${escapeHtml(rare.respawn)}</div>` : ''}
        </div>

        <p class="rare-lore-text">${escapeHtml(rare.lore)}</p>

        <div class="atlas-macro-box">
          <span class="atlas-macro-code">${escapeHtml(rare.macro)}</span>
          <button type="button" class="btn-copy-macro" onclick="copyMacroToClipboard('${escapeHtml(rare.macro)}', this)" title="Copy /target macro to clipboard">
            📋 Copy Macro
          </button>
        </div>

        ${rare.drops && rare.drops.length > 0 ? `
          <div class="rare-drops-section">
            <span class="rare-drops-title">Exclusive Drops &amp; Sets:</span>
            ${rare.drops.map(d => `
              <div class="rare-drop-item">
                <div class="rare-drop-top">
                  <strong class="q3" style="font-size: 0.85rem;">✦ ${escapeHtml(d.name)}</strong>
                  <span class="rare-drop-type">${escapeHtml(d.type || '')}</span>
                </div>
                ${d.stats || d.desc ? `<span class="rare-drop-stats">${escapeHtml(d.stats || d.desc)}</span>` : ''}
              </div>
            `).join('')}
          </div>
        ` : ''}
      </div>
    `).join('');
  }

  zonePills.forEach(pill => {
    pill.addEventListener('click', () => {
      zonePills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      activeZone = pill.getAttribute('data-zone') || 'all';
      filterAndRender();
    });
  });

  if (searchInput) searchInput.addEventListener('input', filterAndRender);
  filterAndRender();
}

window.copyMacroToClipboard = function(macroText, btnElement) {
  navigator.clipboard.writeText(macroText).then(() => {
    const originalText = btnElement.innerHTML;
    btnElement.innerHTML = '✓ Copied!';
    btnElement.classList.add('copied');

    setTimeout(() => {
      btnElement.innerHTML = originalText;
      btnElement.classList.remove('copied');
    }, 1800);
  }).catch(() => {
    btnElement.innerHTML = 'Error';
  });
};

/* ==========================================================================
   2. HIDDEN LIBRARY BOOKS TRACKER
   ========================================================================== */
function renderBooksTracker() {
  const container = document.getElementById('atlas-books-list') || document.getElementById('books-list-container');
  const countBadge = document.getElementById('books-collected-count');
  const pctBadge = document.getElementById('books-collected-pct');
  const progressBar = document.getElementById('books-progress-fill') || document.getElementById('books-progress-bar');
  const searchInput = document.getElementById('atlas-book-search') || document.getElementById('books-search-input');
  const filterPills = document.querySelectorAll('#atlas-book-filters .atlas-pill');
  if (!container || !window.WOW_ATLAS_DATA?.libraryBooks) return;

  const data = window.WOW_ATLAS_DATA.libraryBooks;
  const books = data.books || [];
  let bookFilter = 'all';

  let collectedIds = new Set();
  try {
    const saved = localStorage.getItem('wow_forever_library_books');
    if (saved) {
      collectedIds = new Set(JSON.parse(saved));
    }
  } catch {
    // Ignore storage parse error
  }

  function updateProgress() {
    const count = collectedIds.size;
    const total = books.length || 40;
    const pct = Math.round((count / total) * 100);

    if (countBadge) countBadge.textContent = count;
    if (pctBadge) pctBadge.textContent = `${pct}%`;
    if (progressBar) progressBar.style.width = `${pct}%`;

    // Milestone chips
    document.querySelectorAll('.milestone-chip').forEach(chip => {
      const req = parseInt(chip.getAttribute('data-req'), 10) || 0;
      if (count >= req) {
        chip.classList.add('achieved');
      } else {
        chip.classList.remove('achieved');
      }
    });
  }

  function toggleBook(id) {
    if (collectedIds.has(id)) {
      collectedIds.delete(id);
    } else {
      collectedIds.add(id);
    }
    try {
      localStorage.setItem('wow_forever_library_books', JSON.stringify(Array.from(collectedIds)));
    } catch {}
    updateProgress();
    renderList();
  }

  window.toggleLibraryBook = toggleBook;

  function renderList() {
    const query = searchInput ? searchInput.value.toLowerCase().trim() : '';

    const filtered = books.filter(b => {
      const isCollected = collectedIds.has(b.id);
      if (bookFilter === 'collected' && !isCollected) return false;
      if (bookFilter === 'uncollected' && isCollected) return false;

      return !query ||
        b.name.toLowerCase().includes(query) ||
        b.zone.toLowerCase().includes(query) ||
        b.coords.toLowerCase().includes(query) ||
        b.desc.toLowerCase().includes(query);
    });

    if (filtered.length === 0) {
      container.innerHTML = `
        <div style="padding: 2rem; text-align: center; color: var(--text-muted); background: rgba(0,0,0,0.3); border-radius: var(--radius-md);">
          <p>No library books match your filter.</p>
        </div>
      `;
      return;
    }

    container.innerHTML = filtered.map(book => {
      const isCollected = collectedIds.has(book.id);
      return `
        <div class="atlas-book-row ${isCollected ? 'collected' : ''}" onclick="toggleLibraryBook('${book.id}')">
          <input type="checkbox" class="book-checkbox" ${isCollected ? 'checked' : ''} onclick="event.stopPropagation(); toggleLibraryBook('${book.id}');" />
          <span class="book-number">#${book.id}</span>
          <div class="book-details">
            <div class="book-title-row">
              <span class="book-name">${escapeHtml(book.name)}</span>
              <span class="book-zone">📍 ${escapeHtml(book.zone)}</span>
            </div>
            <div class="book-coords-text">Coords: <strong>${escapeHtml(book.coords)}</strong></div>
            <div style="font-size: 0.78rem; color: #cbd5e1; margin-top: 0.15rem;">${escapeHtml(book.desc)}</div>
          </div>
        </div>
      `;
    }).join('');
  }

  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      filterPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      bookFilter = pill.getAttribute('data-bfilter') || 'all';
      renderList();
    });
  });

  if (searchInput) searchInput.addEventListener('input', renderList);

  updateProgress();
  renderList();
}

/* ==========================================================================
   3. PVP RANK POINTS SCHEDULE & GEAR SETS
   ========================================================================== */
function renderPvPSchedule() {
  const tbody = document.getElementById('pvp-ranks-tbody') || document.getElementById('pvp-ranks-table-body');
  const setsGrid = document.getElementById('pvp-sets-grid');
  if (!tbody || !window.WOW_ATLAS_DATA?.pvp) return;

  const pvp = window.WOW_ATLAS_DATA.pvp;
  const ranks = pvp.ranks || [];
  const battlegrounds = pvp.battlegrounds || [];

  tbody.innerHTML = ranks.map(r => {
    const levelReq = r.rank <= 3 ? 'Level 10+' : (r.rank <= 6 ? 'Level 30+' : (r.rank <= 10 ? 'Level 40+' : 'Level 60'));
    const isBetaUnlocked = r.rank <= 3;
    return `
      <tr>
        <td><span class="pvp-rank-pill">Rank ${r.rank}</span></td>
        <td><span class="pvp-alliance-title">${escapeHtml(r.titleA)}</span></td>
        <td><span class="pvp-horde-title">${escapeHtml(r.titleH)}</span></td>
        <td><strong>${r.rpNeeded.toLocaleString()} RP</strong></td>
        <td>
          <span style="color: ${isBetaUnlocked ? '#34d399' : '#94a3b8'}; font-weight: 600;">
            ${levelReq} ${isBetaUnlocked ? '✓ Phase 1' : '🔒 Phase 2+'}
          </span>
        </td>
        <td><span style="color: #cbd5e1;">${escapeHtml(r.unlock)}</span></td>
      </tr>
    `;
  }).join('');

  if (setsGrid && battlegrounds.length > 0) {
    setsGrid.innerHTML = battlegrounds.map(bg => `
      <div class="pvp-set-card">
        <div class="pvp-set-header">
          <span class="pvp-set-name">⚔️ ${escapeHtml(bg.name)}</span>
          <span class="pvp-set-rank-req">${escapeHtml(bg.players)}</span>
        </div>
        <div style="font-size: 0.82rem; color: #f59e0b; font-weight: 600;">Bracket Levels: ${escapeHtml(bg.levels)}</div>
        <p class="pvp-set-items">${escapeHtml(bg.type)}</p>
      </div>
    `).join('');
  }
}

window.initAtlas = initAtlas;
