/**
 * World of Warcraft: Forever - Library Books Interactive Tracker
 * Renders the 40 Ancient Tomes, Coordinates, Zone Filters, and Milestone Rewards.
 */

(function () {
  'use strict';

  const STORAGE_KEY = 'wowforever_collected_books';
  let searchQuery = '';
  let selectedZone = 'all';
  let isInitialized = false;

  const CDN_BASE = 'https://wow.zamimg.com/images/wow/icons/medium/';

  function getIcon(icon) {
    if (!icon) return `${CDN_BASE}inv_misc_book_09.jpg`;
    if (icon.startsWith('http://') || icon.startsWith('https://')) return icon;
    const clean = icon.replace(/\.(jpg|png|webp)$/i, '');
    return `${CDN_BASE}${clean.toLowerCase()}.jpg`;
  }

  function getCollectedBooks() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  }

  function saveCollectedBooks(list) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    } catch {
      // LocalStorage errors suppressed
    }
  }

  function toggleBook(bookId) {
    let collected = getCollectedBooks();
    if (collected.includes(bookId)) {
      collected = collected.filter(id => id !== bookId);
    } else {
      collected.push(bookId);
    }
    saveCollectedBooks(collected);
    updateTrackerProgress();
  }

  function initLibraryBooks() {
    const container = document.getElementById('codex-books-container');
    if (!container) return;

    if (!isInitialized) {
      renderBooksShell(container);
      isInitialized = true;
    }

    renderBooksList();
    updateTrackerProgress();
  }

  function renderBooksShell(container) {
    const data = window.WOW_LIBRARY_BOOKS_DATA || { books: [], rewards: [], librarians: {} };
    const zones = [...new Set((data.books || []).map(b => b.zone))].sort();

    container.innerHTML = `
      <div class="section-heading-bar" style="margin-bottom: 1.5rem;">
        <div>
          <h3><span>📚</span> Ancient Library Books &amp; Collectibles Radar</h3>
          <p class="section-subtext">Discover 40 rare tomes hidden throughout Azeroth and deliver them to your faction's Head Librarian for prestigious rewards.</p>
        </div>
      </div>

      <!-- Turn-in Librarians & Milestone Tracker Banner -->
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 1rem; margin-bottom: 1.5rem;">
        
        <!-- Progress Card -->
        <div style="background: rgba(15, 23, 42, 0.7); border: 1px solid var(--border-gold); border-radius: var(--radius-md); padding: 1.25rem;">
          <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 0.5rem;">
            <span style="font-size: 0.76rem; font-weight: 700; color: #f5d061; text-transform: uppercase;">Recovery Progress</span>
            <span id="books-count-badge" style="font-size: 0.95rem; font-weight: 700; color: #fff;">0 / 40 Books</span>
          </div>
          
          <div style="width: 100%; height: 8px; background: rgba(0,0,0,0.5); border-radius: 4px; overflow: hidden; margin-bottom: 0.75rem;">
            <div id="books-progress-bar" style="height: 100%; width: 0%; background: linear-gradient(90deg, #ca8a04, #f5d061); transition: width 0.3s ease;"></div>
          </div>

          <div style="display: flex; justify-content: space-between; font-size: 0.72rem; color: #94a3b8;">
            <span id="tier-10-badge">10: Pendant/Amulet</span>
            <span id="tier-20-badge">20: Scholar's Ring</span>
            <span id="tier-25-badge">25: Bow / Shield / Light</span>
          </div>
        </div>

        <!-- Head Librarians Card -->
        <div style="background: rgba(15, 23, 42, 0.7); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 1.25rem; display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <span style="font-size: 0.76rem; font-weight: 700; color: #38bdf8; text-transform: uppercase;">Turn-In Locations</span>
            <div style="margin-top: 0.5rem; display: flex; flex-direction: column; gap: 0.4rem; font-size: 0.8rem;">
              <div style="display: flex; justify-content: space-between;">
                <span style="color: #60a5fa; font-weight: 600;">🦁 Garion Wendell:</span>
                <span style="color: #cbd5e1;">Stormwind City (37.6, 80.8)</span>
              </div>
              <div style="display: flex; justify-content: space-between;">
                <span style="color: #f87171; font-weight: 600;">🦅 Owen Thadd:</span>
                <span style="color: #cbd5e1;">Undercity Magic Quarter (73.4, 33.0)</span>
              </div>
            </div>
          </div>
          <div style="font-size: 0.72rem; color: #94a3b8; margin-top: 0.5rem; border-top: 1px solid rgba(255,255,255,0.06); padding-top: 0.4rem;">
            💡 Books are unique collectibles that bind upon pickup and unlock hand-in quests.
          </div>
        </div>

      </div>

      <!-- Milestone Rewards Gallery -->
      <div style="background: rgba(15, 23, 42, 0.5); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 1.25rem; margin-bottom: 1.5rem;">
        <h4 style="margin: 0 0 0.75rem 0; font-size: 0.95rem; color: #fff;">🏆 Library Milestone Rewards (Choose 1 at Each Tier)</h4>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1rem;">
          ${(data.rewards || []).map(r => `
            <div style="background: rgba(0,0,0,0.3); border: 1px solid rgba(255,255,255,0.06); border-radius: 6px; padding: 0.75rem;">
              <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 0.4rem;">
                <span style="font-size: 0.76rem; font-weight: 700; color: #f5d061;">${escapeHtml(r.title)}</span>
                <span style="font-size: 0.7rem; color: #94a3b8;">${escapeHtml(r.req)}</span>
              </div>
              <div style="display: flex; flex-direction: column; gap: 0.4rem;">
                ${r.items.map(it => `
                  <div style="display: flex; align-items: center; justify-content: space-between; background: rgba(255,255,255,0.02); padding: 0.35rem 0.5rem; border-radius: 4px;">
                    <div style="display: flex; align-items: center; gap: 0.5rem;">
                      <img src="${getIcon(it.icon)}" alt="${escapeHtml(it.name)}" style="width: 24px; height: 24px; border-radius: 4px; border: 1px solid #0070dd;" />
                      <div>
                        <div style="font-size: 0.8rem; font-weight: 600; color: #0070dd;">${escapeHtml(it.name)}</div>
                        <div style="font-size: 0.7rem; color: #94a3b8;">${escapeHtml(it.stats)}</div>
                      </div>
                    </div>
                    <span style="font-size: 0.7rem; color: #cbd5e1;">${escapeHtml(it.slot)}</span>
                  </div>
                `).join('')}
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Filters & Controls Bar -->
      <div style="background: rgba(15, 23, 42, 0.6); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 1rem 1.25rem; margin-bottom: 1.5rem; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.75rem;">
        <div style="display: flex; gap: 0.5rem; align-items: center; flex-wrap: wrap;">
          <span style="font-size: 0.78rem; color: #94a3b8; font-weight: 600;">Zone Filter:</span>
          <select id="books-zone-select" style="background: rgba(0,0,0,0.5); border: 1px solid var(--border-subtle); color: #fff; padding: 0.4rem 0.75rem; border-radius: 6px; font-size: 0.82rem;">
            <option value="all">All Zones (${data.books.length} Books)</option>
            ${zones.map(z => `<option value="${escapeHtml(z)}">${escapeHtml(z)}</option>`).join('')}
          </select>
        </div>

        <div>
          <input type="text" id="books-search-input" placeholder="Search book, zone, or notes..."
                 style="background: rgba(0,0,0,0.4); border: 1px solid var(--border-subtle); color: #fff; padding: 0.45rem 0.85rem; border-radius: 6px; font-size: 0.85rem; min-width: 240px;" />
        </div>
      </div>

      <!-- Books Grid -->
      <div id="books-grid-mount" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(340px, 1fr)); gap: 1rem;">
        <!-- Injected dynamically -->
      </div>
    `;

    // Event handlers
    const zoneSelect = container.querySelector('#books-zone-select');
    if (zoneSelect) {
      zoneSelect.addEventListener('change', (e) => {
        selectedZone = e.target.value;
        renderBooksList();
      });
    }

    const searchInput = container.querySelector('#books-search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value.toLowerCase().trim();
        renderBooksList();
      });
    }
  }

  function renderBooksList() {
    const grid = document.getElementById('books-grid-mount');
    if (!grid) return;

    const data = window.WOW_LIBRARY_BOOKS_DATA || { books: [] };
    let books = data.books || [];
    const collected = getCollectedBooks();

    if (selectedZone !== 'all') {
      books = books.filter(b => b.zone === selectedZone);
    }

    if (searchQuery) {
      books = books.filter(b => {
        return (b.name && b.name.toLowerCase().includes(searchQuery)) ||
               (b.zone && b.zone.toLowerCase().includes(searchQuery)) ||
               (b.detail && b.detail.toLowerCase().includes(searchQuery)) ||
               (b.desc && b.desc.toLowerCase().includes(searchQuery));
      });
    }

    if (books.length === 0) {
      grid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 3rem; color: #94a3b8; background: rgba(15, 23, 42, 0.4); border-radius: 8px;">
          No ancient library books found matching your current filter.
        </div>
      `;
      return;
    }

    grid.innerHTML = books.map(b => {
      const isCollected = collected.includes(b.id);
      const factionColor = b.faction === 'Alliance' ? '#60a5fa' : (b.faction === 'Horde' ? '#f87171' : '#fcd34d');

      return `
        <div class="book-card ${isCollected ? 'collected' : ''}" style="background: ${isCollected ? 'rgba(30, 41, 59, 0.85)' : 'rgba(15, 23, 42, 0.6)'}; border: 1px solid ${isCollected ? '#22c55e' : 'var(--border-subtle)'}; border-radius: var(--radius-md); padding: 1.15rem; display: flex; flex-direction: column; justify-content: space-between; transition: all 0.2s;">
          <div>
            <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 0.5rem; margin-bottom: 0.6rem;">
              <div style="display: flex; align-items: center; gap: 0.6rem;">
                <label style="cursor: pointer; display: flex; align-items: center;">
                  <input type="checkbox" class="book-checkbox" data-book-id="${b.id}" ${isCollected ? 'checked' : ''}
                         style="width: 18px; height: 18px; cursor: pointer; accent-color: #22c55e;" />
                </label>
                <div>
                  <h4 style="margin: 0; font-size: 0.95rem; color: ${isCollected ? '#86efac' : '#fff'}; line-height: 1.3;">
                    ${escapeHtml(b.name)}
                  </h4>
                  <div style="font-size: 0.74rem; color: #38bdf8; margin-top: 0.15rem;">
                    📍 ${escapeHtml(b.zone)} • <span style="color: #fcd34d;">${escapeHtml(b.coords)}</span>
                  </div>
                </div>
              </div>
              <span style="font-size: 0.7rem; font-weight: 700; color: ${factionColor}; background: rgba(255,255,255,0.05); padding: 0.15rem 0.4rem; border-radius: 4px;">
                ${escapeHtml(b.faction)}
              </span>
            </div>

            <p style="font-size: 0.78rem; color: #cbd5e1; line-height: 1.4; margin: 0 0 0.5rem 0;">
              <strong>Discovery Spot:</strong> ${escapeHtml(b.detail)}
            </p>
            <p style="font-size: 0.74rem; color: #94a3b8; font-style: italic; margin: 0 0 0.6rem 0;">
              &ldquo;${escapeHtml(b.desc)}&rdquo;
            </p>
          </div>

          <div style="border-top: 1px solid rgba(255,255,255,0.06); padding-top: 0.5rem; display: flex; justify-content: space-between; align-items: center; font-size: 0.72rem;">
            <span style="color: ${isCollected ? '#4ade80' : '#64748b'}; font-weight: 600;">
              ${isCollected ? '✓ Recovered' : '○ Not yet collected'}
            </span>
            <a href="https://www.wowhead.com/forever/item=${b.itemId}" target="_blank" rel="noopener noreferrer"
               style="color: #38bdf8; text-decoration: none; display: flex; align-items: center; gap: 0.2rem;">
              <span>Inspect Tome</span> ↗
            </a>
          </div>
        </div>
      `;
    }).join('');

    // Attach checkbox events
    grid.querySelectorAll('.book-checkbox').forEach(cb => {
      cb.addEventListener('change', () => {
        const bookId = cb.getAttribute('data-book-id');
        toggleBook(bookId);
        renderBooksList();
      });
    });
  }

  function updateTrackerProgress() {
    const collected = getCollectedBooks();
    const count = collected.length;
    const countBadge = document.getElementById('books-count-badge');
    const progressBar = document.getElementById('books-progress-bar');
    const t10 = document.getElementById('tier-10-badge');
    const t20 = document.getElementById('tier-20-badge');
    const t25 = document.getElementById('tier-25-badge');

    if (countBadge) countBadge.textContent = `${count} / 40 Books`;
    if (progressBar) progressBar.style.width = `${Math.min(100, Math.round((count / 40) * 100))}%`;

    if (t10) t10.style.color = count >= 10 ? '#4ade80' : '#94a3b8';
    if (t20) t20.style.color = count >= 20 ? '#4ade80' : '#94a3b8';
    if (t25) t25.style.color = count >= 25 ? '#4ade80' : '#94a3b8';
  }

  window.initLibraryBooks = initLibraryBooks;
})();
