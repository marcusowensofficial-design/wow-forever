/**
 * World of Warcraft: Forever - Collections Directory (Mounts, Vanity Pets, Titles)
 * Pure Logic Module — Controller, View Renderer, and Event Dispatcher
 */
(function () {
  'use strict';

  let state = {
    tab: 'mounts', // 'mounts' | 'pets' | 'titles'
    search: '',
    faction: 'all', // 'all' | 'alliance' | 'horde' | 'neutral'
    mountSource: 'all', // 'all' | 'vendor' | 'drop' | 'quest' | 'class'
    mountLevel: 'all', // 'all' | '40' | '60'
    petSource: 'all', // 'all' | 'vendor' | 'drop' | 'quest' | 'craft' | 'container'
    petCategory: 'all',
    newOnly: false,
    page: 1,
    pageSize: 24
  };

  function esc(str) {
    return String(str == null ? '' : str).replace(/[&<>"']/g, (ch) => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    }[ch]));
  }

  function getFilteredMounts() {
    const raw = window.WOW_COLLECTIONS_DATA?.mounts || [];
    return raw.filter(m => {
      // New in Forever toggle
      if (state.newOnly && !m.isNewInForever) return false;

      // Faction filter
      if (state.faction === 'alliance' && m.faction !== 'Alliance' && m.faction !== 'Neutral') return false;
      if (state.faction === 'horde' && m.faction !== 'Horde' && m.faction !== 'Neutral') return false;
      if (state.faction === 'neutral' && m.faction !== 'Neutral') return false;

      // Source filter
      if (state.mountSource === 'vendor' && m.sourceType !== 'Vendor') return false;
      if (state.mountSource === 'drop' && m.sourceType !== 'Boss Drop' && m.sourceType !== 'World Drop') return false;
      if (state.mountSource === 'quest' && m.sourceType !== 'Quest Reward') return false;
      if (state.mountSource === 'class' && !m.classRestriction) return false;

      // Level filter
      if (state.mountLevel === '40' && m.level !== 40) return false;
      if (state.mountLevel === '60' && m.level !== 60) return false;

      // Search text
      if (state.search) {
        const q = state.search.toLowerCase();
        const mName = (m.name || '').toLowerCase().includes(q);
        const mDetail = (m.sourceDetail || '').toLowerCase().includes(q);
        const mNotes = (m.notes || '').toLowerCase().includes(q);
        const mSpec = (m.speculationReason || '').toLowerCase().includes(q);
        const mRiding = (m.ridingSkill || '').toLowerCase().includes(q);
        const mClass = (m.classRestriction || '').toLowerCase().includes(q);
        if (!mName && !mDetail && !mNotes && !mSpec && !mRiding && !mClass) return false;
      }

      return true;
    });
  }

  function getFilteredPets() {
    const raw = window.WOW_COLLECTIONS_DATA?.vanityPets || [];
    return raw.filter(p => {
      // New in Forever toggle
      if (state.newOnly && !p.isNewInForever) return false;

      // Faction filter
      if (state.faction === 'alliance' && p.faction !== 'Alliance' && p.faction !== 'Neutral') return false;
      if (state.faction === 'horde' && p.faction !== 'Horde' && p.faction !== 'Neutral') return false;
      if (state.faction === 'neutral' && p.faction !== 'Neutral') return false;

      // Source filter
      if (state.petSource === 'vendor' && p.sourceType !== 'Vendor') return false;
      if (state.petSource === 'drop' && p.sourceType !== 'World Drop' && p.sourceType !== 'Boss Drop') return false;
      if (state.petSource === 'quest' && p.sourceType !== 'Quest') return false;
      if (state.petSource === 'craft' && p.sourceType !== 'Crafted') return false;
      if (state.petSource === 'container' && p.sourceType !== 'Container') return false;

      // Category filter
      if (state.petCategory && state.petCategory !== 'all' && p.category !== state.petCategory) return false;

      // Search text
      if (state.search) {
        const q = state.search.toLowerCase();
        const mName = (p.name || '').toLowerCase().includes(q);
        const mDetail = (p.sourceDetail || '').toLowerCase().includes(q);
        const mNotes = (p.notes || '').toLowerCase().includes(q);
        const mCat = (p.category || '').toLowerCase().includes(q);
        if (!mName && !mDetail && !mNotes && !mCat) return false;
      }
      return true;
    });
  }

  function getFilteredTitles() {
    const raw = window.WOW_COLLECTIONS_DATA?.titles || [];
    return raw.filter(t => {
      if (state.search) {
        const q = state.search.toLowerCase();
        const mName = t.name.toLowerCase().includes(q);
        const mReq = (t.requirements || '').toLowerCase().includes(q);
        if (!mName && !mReq) return false;
      }
      return true;
    });
  }

  function renderMountCard(m) {
    const sideIcon = m.faction === 'Horde' ? '🦅' : (m.faction === 'Alliance' ? '🦁' : '🕊️');
    const sideColor = m.faction === 'Horde' ? '#ef4444' : (m.faction === 'Alliance' ? '#3b82f6' : '#94a3b8');
    const displayImg = m.image || 'images/mounts/brown-horse.webp';

    return `
      <div class="collection-item-card" style="background:#0f172a;border:1px solid rgba(255,255,255,0.08);border-radius:8px;padding:0.9rem;display:flex;flex-direction:column;justify-content:space-between;gap:0.75rem;transition:border-color 0.15s ease,transform 0.15s ease;">
        <div>
          <!-- Creature 3D Image Preview -->
          <div style="position:relative;width:100%;height:130px;background:#050914;border-radius:6px;overflow:hidden;display:flex;align-items:center;justify-content:center;border:1px solid rgba(255,255,255,0.06);margin-bottom:0.6rem;">
            <img src="${esc(displayImg)}" alt="${esc(m.name)}" loading="lazy" style="max-height:92%;max-width:92%;object-fit:contain;transition:transform 0.25s ease;" onerror="this.onerror=null;this.src='https://wow.zamimg.com/images/wow/icons/large/ability_mount_ridinghorse.jpg';" onmouseover="this.style.transform='scale(1.08)'" onmouseout="this.style.transform='scale(1)'">
            ${m.isNewInForever ? `
              <span style="position:absolute;top:6px;left:6px;background:rgba(16,185,129,0.92);backdrop-filter:blur(4px);color:#fff;font-size:0.62rem;font-weight:800;padding:0.15rem 0.45rem;border-radius:4px;letter-spacing:0.04em;text-transform:uppercase;box-shadow:0 2px 5px rgba(0,0,0,0.5);">
                ✨ New in Forever
              </span>
            ` : ''}
            ${m.cost ? `
              <span style="position:absolute;bottom:6px;left:6px;background:rgba(15,23,42,0.85);backdrop-filter:blur(4px);color:#fbbf24;border:1px solid rgba(251,191,36,0.3);font-size:0.68rem;font-weight:700;padding:0.1rem 0.4rem;border-radius:4px;">
                💰 ${esc(m.cost)}
              </span>
            ` : ''}
            <span style="position:absolute;bottom:6px;right:6px;background:rgba(15,23,42,0.85);backdrop-filter:blur(4px);color:#38bdf8;border:1px solid rgba(56,189,248,0.35);font-size:0.68rem;font-weight:700;padding:0.1rem 0.4rem;border-radius:4px;">
              ${esc(m.speed || (m.level === 60 ? '100% speed' : '60% speed'))}
            </span>
          </div>

          <!-- Header & Badges -->
          <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:0.5rem;margin-bottom:0.35rem;">
            <div>
              <h4 style="margin:0;font-size:0.98rem;color:#f8fafc;font-weight:700;line-height:1.3;">${esc(m.name)}</h4>
              <div style="display:flex;align-items:center;gap:0.35rem;margin-top:0.2rem;flex-wrap:wrap;">
                <span style="color:${sideColor};font-size:0.72rem;font-weight:700;">${sideIcon} ${esc(m.faction)}</span>
                ${m.classRestriction ? `<span style="background:rgba(234,179,8,0.15);color:#facc15;padding:0.05rem 0.35rem;border-radius:3px;font-size:0.68rem;font-weight:700;">${esc(m.classRestriction)}</span>` : ''}
                ${m.ridingSkill ? `<span style="color:#94a3b8;font-size:0.7rem;">• ${esc(m.ridingSkill)}</span>` : ''}
              </div>
            </div>
            ${m.level > 0 ? `
              <span style="background:rgba(59,130,246,0.15);color:#60a5fa;border:1px solid rgba(59,130,246,0.3);padding:0.1rem 0.4rem;border-radius:4px;font-size:0.72rem;font-weight:700;flex-shrink:0;">
                Req Lvl ${m.level}
              </span>
            ` : '<span style="background:rgba(16,185,129,0.15);color:#34d399;padding:0.1rem 0.4rem;border-radius:4px;font-size:0.72rem;font-weight:700;flex-shrink:0;">Class Spell</span>'}
          </div>

          <!-- Source & Details -->
          <div style="background:rgba(255,255,255,0.02);padding:0.45rem 0.6rem;border-radius:6px;font-size:0.78rem;line-height:1.4;margin-top:0.4rem;">
            <div style="color:#cbd5e1;">
              <strong style="color:#94a3b8;">Source:</strong> ${esc(m.sourceDetail || m.sourceType)}
            </div>
            ${m.speculationReason ? `<div style="color:#fbbf24;font-size:0.72rem;margin-top:0.25rem;">⚠️ ${esc(m.speculationReason)}</div>` : (m.notes ? `<div style="color:#94a3b8;font-size:0.72rem;margin-top:0.2rem;">ℹ️ ${esc(m.notes)}</div>` : '')}
          </div>
        </div>

        <!-- Footer -->
        <div style="display:flex;align-items:center;justify-content:space-between;border-top:1px solid rgba(255,255,255,0.06);padding-top:0.45rem;font-size:0.75rem;">
          <span style="color:#64748b;">${m.isSpeculation ? '⚠️ Post-Cap Speculation' : '✅ Live Client Datamined'}</span>
          <a href="${esc(m.wowheadUrl)}" target="_blank" rel="noopener noreferrer" style="color:#f59e0b;font-weight:600;text-decoration:none;">
            Wowhead ↗
          </a>
        </div>
      </div>
    `;
  }

  function renderPetCard(p) {
    const sideIcon = p.faction === 'Horde' ? '🦅' : (p.faction === 'Alliance' ? '🦁' : '🕊️');
    const sideColor = p.faction === 'Horde' ? '#ef4444' : (p.faction === 'Alliance' ? '#3b82f6' : '#94a3b8');
    const displayImg = p.image || 'images/pets/4401.webp';

    return `
      <div class="collection-item-card" style="background:#0f172a;border:1px solid rgba(255,255,255,0.08);border-radius:8px;padding:0.9rem;display:flex;flex-direction:column;justify-content:space-between;gap:0.75rem;transition:border-color 0.15s ease,transform 0.15s ease;">
        <div>
          <!-- Pet Image Preview -->
          <div style="position:relative;width:100%;height:110px;background:#050914;border-radius:6px;overflow:hidden;display:flex;align-items:center;justify-content:center;border:1px solid rgba(255,255,255,0.06);margin-bottom:0.6rem;">
            <img src="${esc(displayImg)}" alt="${esc(p.name)}" loading="lazy" style="height:64px;width:64px;object-fit:contain;transition:transform 0.25s ease;border-radius:8px;border:1px solid rgba(255,255,255,0.15);box-shadow:0 4px 12px rgba(0,0,0,0.5);" onerror="this.onerror=null;this.src='https://wow.zamimg.com/images/wow/icons/large/inv_box_01.jpg';" onmouseover="this.style.transform='scale(1.12)'" onmouseout="this.style.transform='scale(1)'">
            ${p.isNewInForever ? `
              <span style="position:absolute;top:6px;left:6px;background:rgba(16,185,129,0.92);backdrop-filter:blur(4px);color:#fff;font-size:0.62rem;font-weight:800;padding:0.15rem 0.45rem;border-radius:4px;letter-spacing:0.04em;text-transform:uppercase;box-shadow:0 2px 5px rgba(0,0,0,0.5);">
                ✨ New in Forever
              </span>
            ` : ''}
            <span style="position:absolute;bottom:6px;right:6px;background:rgba(15,23,42,0.85);backdrop-filter:blur(4px);color:#a855f7;border:1px solid rgba(168,85,247,0.35);font-size:0.68rem;font-weight:700;padding:0.1rem 0.4rem;border-radius:4px;">
              ${esc(p.category || 'Companion')}
            </span>
          </div>

          <!-- Header & Badges -->
          <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:0.5rem;margin-bottom:0.35rem;">
            <div>
              <h4 style="margin:0;font-size:0.98rem;color:#f8fafc;font-weight:700;line-height:1.3;">${esc(p.name)}</h4>
              <div style="display:flex;align-items:center;gap:0.35rem;margin-top:0.2rem;flex-wrap:wrap;">
                <span style="color:${sideColor};font-size:0.72rem;font-weight:700;">${sideIcon} ${esc(p.faction)}</span>
                <span style="color:#94a3b8;font-size:0.7rem;">• ${esc(p.sourceType)}</span>
              </div>
            </div>
            <span style="background:rgba(168,85,247,0.15);color:#c084fc;border:1px solid rgba(168,85,247,0.3);padding:0.1rem 0.4rem;border-radius:4px;font-size:0.72rem;font-weight:700;flex-shrink:0;">
              Vanity Pet
            </span>
          </div>

          <!-- Source & Details -->
          <div style="background:rgba(255,255,255,0.02);padding:0.45rem 0.6rem;border-radius:6px;font-size:0.78rem;line-height:1.4;margin-top:0.4rem;">
            <div style="color:#cbd5e1;">
              <strong style="color:#94a3b8;">Source:</strong> ${esc(p.sourceDetail || p.sourceType)}
            </div>
            ${p.speculationReason ? `<div style="color:#fbbf24;font-size:0.72rem;margin-top:0.25rem;">⚠️ ${esc(p.speculationReason)}</div>` : (p.notes ? `<div style="color:#94a3b8;font-size:0.72rem;margin-top:0.2rem;">ℹ️ ${esc(p.notes)}</div>` : '')}
          </div>
        </div>

        <!-- Footer -->
        <div style="display:flex;align-items:center;justify-content:space-between;border-top:1px solid rgba(255,255,255,0.06);padding-top:0.45rem;font-size:0.75rem;">
          <span style="color:#64748b;">${p.isSpeculation ? '⚠️ Post-Cap Speculation' : '✅ Live Client Datamined'}</span>
          <a href="${esc(p.wowheadUrl)}" target="_blank" rel="noopener noreferrer" style="color:#f59e0b;font-weight:600;text-decoration:none;">
            Wowhead ↗
          </a>
        </div>
      </div>
    `;
  }

  function renderTitleCard(t) {
    return `
      <div class="collection-item-card" style="background:#0f172a;border:1px solid rgba(255,255,255,0.08);border-radius:8px;padding:1rem;display:flex;flex-direction:column;justify-content:space-between;gap:0.75rem;">
        <div>
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:0.4rem;">
            <div style="display:flex;align-items:center;gap:0.45rem;">
              <span style="font-size:1.3rem;">👑</span>
              <h4 style="margin:0;font-size:1.02rem;color:#fde047;font-weight:800;">&lt;${esc(t.name)}&gt;</h4>
            </div>
            <span style="background:rgba(245,158,11,0.15);color:#f59e0b;padding:0.1rem 0.4rem;border-radius:4px;font-size:0.72rem;font-weight:700;">
              ${esc(t.category)}
            </span>
          </div>
          <div style="background:rgba(255,255,255,0.02);padding:0.5rem 0.6rem;border-radius:6px;font-size:0.8rem;color:#cbd5e1;line-height:1.4;">
            ${esc(t.requirements || 'Unlocked via progression.')}
          </div>
        </div>
        <div style="font-size:0.72rem;color:#64748b;border-top:1px solid rgba(255,255,255,0.06);padding-top:0.4rem;">
          ${t.level > 0 ? `Required Character Level: ${t.level}` : 'Account-Wide Feat'}
        </div>
      </div>
    `;
  }

  function renderCollections() {
    const container = document.getElementById('mounts-gallery-container');
    if (!container) return;

    const data = window.WOW_COLLECTIONS_DATA || { mounts: [], vanityPets: [], titles: [] };
    const filteredMounts = getFilteredMounts();
    const filteredPets = getFilteredPets();
    const filteredTitles = getFilteredTitles();

    let activeItems = [];
    if (state.tab === 'mounts') activeItems = filteredMounts;
    else if (state.tab === 'pets') activeItems = filteredPets;
    else if (state.tab === 'titles') activeItems = filteredTitles;

    const totalCount = activeItems.length;
    const totalPages = Math.max(1, Math.ceil(totalCount / state.pageSize));
    if (state.page > totalPages) state.page = 1;

    const startIdx = (state.page - 1) * state.pageSize;
    const pagedItems = activeItems.slice(startIdx, startIdx + state.pageSize);

    container.innerHTML = `
      <div class="collections-explorer-root" style="display:flex;flex-direction:column;gap:1.25rem;width:100%;">
        <!-- Subtab Navigator -->
        <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:0.75rem;border-bottom:1px solid rgba(255,255,255,0.08);padding-bottom:0.75rem;">
          <div class="atlas-subnav-bar" style="margin:0;">
            <button class="atlas-subnav-btn ${state.tab === 'mounts' ? 'active' : ''}" data-col-tab="mounts">
              <span>🐎</span> Mounts (${data.mounts?.length || 141})
            </button>
            <button class="atlas-subnav-btn ${state.tab === 'pets' ? 'active' : ''}" data-col-tab="pets">
              <span>🐾</span> Companion Pets (${data.vanityPets?.length || 73})
            </button>
            <button class="atlas-subnav-btn ${state.tab === 'titles' ? 'active' : ''}" data-col-tab="titles">
              <span>👑</span> Character Titles (${data.titles?.length || 41})
            </button>
          </div>

          <!-- Search Bar -->
          <div class="atlas-search-box" style="width:280px;">
            <span class="atlas-search-icon">🔍</span>
            <input type="text" id="col-search-input" class="atlas-input" placeholder="Search collection..." value="${esc(state.search)}" aria-label="Search collection">
          </div>
        </div>

        ${state.tab === 'mounts' ? `
          <!-- Mount Filters -->
          <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:0.6rem;">
            <div class="atlas-filter-pills">
              <button class="atlas-pill ${state.faction === 'all' ? 'active' : ''}" data-col-faction="all">All Factions</button>
              <button class="atlas-pill ${state.faction === 'alliance' ? 'active' : ''}" data-col-faction="alliance">🦁 Alliance</button>
              <button class="atlas-pill ${state.faction === 'horde' ? 'active' : ''}" data-col-faction="horde">🦅 Horde</button>
              <button class="atlas-pill ${state.faction === 'neutral' ? 'active' : ''}" data-col-faction="neutral">🕊️ Neutral</button>
              <button class="atlas-pill ${state.newOnly ? 'active' : ''}" id="col-new-only" style="${state.newOnly ? 'background:#059669;border-color:#10b981;color:#fff;font-weight:700;' : ''}">
                ✨ New in Forever (39)
              </button>
            </div>

            <div style="display:flex;align-items:center;gap:0.5rem;flex-wrap:wrap;">
              <select id="col-source-filter" aria-label="Mount Source Filter" style="background:rgba(15,23,42,0.85);color:#fff;border:1px solid rgba(255,255,255,0.15);padding:0.4rem 0.6rem;border-radius:6px;font-size:0.82rem;">
                <option value="all" ${state.mountSource === 'all' ? 'selected' : ''}>All Sources</option>
                <option value="vendor" ${state.mountSource === 'vendor' ? 'selected' : ''}>Vendor Purchased</option>
                <option value="drop" ${state.mountSource === 'drop' ? 'selected' : ''}>Boss / World Drops</option>
                <option value="quest" ${state.mountSource === 'quest' ? 'selected' : ''}>Quest Rewards</option>
                <option value="class" ${state.mountSource === 'class' ? 'selected' : ''}>Class Specific (Paladin / Lock)</option>
              </select>

              <select id="col-lvl-filter" aria-label="Mount Level Filter" style="background:rgba(15,23,42,0.85);color:#fff;border:1px solid rgba(255,255,255,0.15);padding:0.4rem 0.6rem;border-radius:6px;font-size:0.82rem;">
                <option value="all" ${state.mountLevel === 'all' ? 'selected' : ''}>All Speeds</option>
                <option value="40" ${state.mountLevel === '40' ? 'selected' : ''}>Level 40 (60% Speed)</option>
                <option value="60" ${state.mountLevel === '60' ? 'selected' : ''}>Level 60 (100% Epic Speed)</option>
              </select>
            </div>
          </div>
        ` : ''}

        ${state.tab === 'pets' ? `
          <!-- Companion Pet Filters -->
          <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:0.6rem;">
            <div class="atlas-filter-pills">
              <button class="atlas-pill ${state.faction === 'all' ? 'active' : ''}" data-col-faction="all">All Factions</button>
              <button class="atlas-pill ${state.faction === 'alliance' ? 'active' : ''}" data-col-faction="alliance">🦁 Alliance</button>
              <button class="atlas-pill ${state.faction === 'horde' ? 'active' : ''}" data-col-faction="horde">🦅 Horde</button>
              <button class="atlas-pill ${state.faction === 'neutral' ? 'active' : ''}" data-col-faction="neutral">🕊️ Neutral</button>
              <button class="atlas-pill ${state.newOnly ? 'active' : ''}" id="col-new-only" style="${state.newOnly ? 'background:#059669;border-color:#10b981;color:#fff;font-weight:700;' : ''}">
                ✨ New in Forever (25)
              </button>
            </div>

            <div style="display:flex;align-items:center;gap:0.5rem;flex-wrap:wrap;">
              <select id="col-pet-cat-filter" aria-label="Pet Category Filter" style="background:rgba(15,23,42,0.85);color:#fff;border:1px solid rgba(255,255,255,0.15);padding:0.4rem 0.6rem;border-radius:6px;font-size:0.82rem;">
                <option value="all" ${state.petCategory === 'all' ? 'selected' : ''}>All Pet Families</option>
                <option value="Cats" ${state.petCategory === 'Cats' ? 'selected' : ''}>Cats & Kittens</option>
                <option value="Canines" ${state.petCategory === 'Canines' ? 'selected' : ''}>Canines & Wolves</option>
                <option value="Dragons" ${state.petCategory === 'Dragons' ? 'selected' : ''}>Whelplings & Dragons</option>
                <option value="Birds" ${state.petCategory === 'Birds' ? 'selected' : ''}>Birds & Owls</option>
                <option value="Reptiles & Amphibians" ${state.petCategory === 'Reptiles & Amphibians' ? 'selected' : ''}>Reptiles & Amphibians</option>
                <option value="Mechanical" ${state.petCategory === 'Mechanical' ? 'selected' : ''}>Mechanical & Tinkered</option>
                <option value="Insects" ${state.petCategory === 'Insects' ? 'selected' : ''}>Insects & Crawlers</option>
                <option value="Strange Companions" ${state.petCategory === 'Strange Companions' ? 'selected' : ''}>Slimes & Elementals</option>
                <option value="Exotic Companions" ${state.petCategory === 'Exotic Companions' ? 'selected' : ''}>Exotic & Seasonal</option>
              </select>

              <select id="col-pet-source-filter" aria-label="Pet Source Filter" style="background:rgba(15,23,42,0.85);color:#fff;border:1px solid rgba(255,255,255,0.15);padding:0.4rem 0.6rem;border-radius:6px;font-size:0.82rem;">
                <option value="all" ${state.petSource === 'all' ? 'selected' : ''}>All Sources</option>
                <option value="vendor" ${state.petSource === 'vendor' ? 'selected' : ''}>Vendor Purchased</option>
                <option value="drop" ${state.petSource === 'drop' ? 'selected' : ''}>World / Boss Drops</option>
                <option value="quest" ${state.petSource === 'quest' ? 'selected' : ''}>Quest Rewards</option>
                <option value="craft" ${state.petSource === 'craft' ? 'selected' : ''}>Crafted (Engineering)</option>
                <option value="container" ${state.petSource === 'container' ? 'selected' : ''}>Container Finds</option>
              </select>
            </div>
          </div>
        ` : ''}

        <!-- Items Grid -->
        <div style="display:grid;grid-template-columns:repeat(auto-fill, minmax(290px, 1fr));gap:0.9rem;">
          ${pagedItems.length > 0 ? (
            state.tab === 'mounts' ? pagedItems.map(renderMountCard).join('') :
            state.tab === 'pets' ? pagedItems.map(renderPetCard).join('') :
            pagedItems.map(renderTitleCard).join('')
          ) : `
            <div style="grid-column:1/-1;text-align:center;padding:3rem;background:rgba(15,23,42,0.6);border-radius:8px;border:1px dashed rgba(255,255,255,0.1);">
              <p style="color:#94a3b8;font-size:1rem;margin:0;">No collection items match your selected filters.</p>
            </div>
          `}
        </div>

        <!-- Pagination -->
        ${totalPages > 1 ? `
          <div style="display:flex;align-items:center;justify-content:center;gap:0.5rem;margin-top:1rem;">
            <button id="col-prev-page" class="atlas-pill" ${state.page <= 1 ? 'disabled style="opacity:0.4;cursor:not-allowed;"' : ''}>
              ◀ Previous
            </button>
            <span style="color:#94a3b8;font-size:0.85rem;padding:0 0.5rem;">
              Page <strong>${state.page}</strong> of <strong>${totalPages}</strong> (${totalCount} items)
            </span>
            <button id="col-next-page" class="atlas-pill" ${state.page >= totalPages ? 'disabled style="opacity:0.4;cursor:not-allowed;"' : ''}>
              Next ▶
            </button>
          </div>
        ` : ''}
      </div>
    `;

    attachEvents();
  }

  function attachEvents() {
    document.querySelectorAll('[data-col-tab]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        state.tab = e.currentTarget.getAttribute('data-col-tab');
        state.page = 1;
        renderCollections();
      });
    });

    document.querySelectorAll('[data-col-faction]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        state.faction = e.currentTarget.getAttribute('data-col-faction');
        state.page = 1;
        renderCollections();
      });
    });

    const newOnlyBtn = document.getElementById('col-new-only');
    if (newOnlyBtn) {
      newOnlyBtn.addEventListener('click', () => {
        state.newOnly = !state.newOnly;
        state.page = 1;
        renderCollections();
      });
    }

    const searchInp = document.getElementById('col-search-input');
    if (searchInp) {
      searchInp.addEventListener('input', (e) => {
        state.search = e.target.value.trim();
        state.page = 1;
        renderCollections();
        const inp = document.getElementById('col-search-input');
        if (inp) {
          inp.focus();
          inp.selectionStart = inp.selectionEnd = inp.value.length;
        }
      });
    }

    const srcFilter = document.getElementById('col-source-filter');
    if (srcFilter) {
      srcFilter.addEventListener('change', (e) => {
        state.mountSource = e.target.value;
        state.page = 1;
        renderCollections();
      });
    }

    const lvlFilter = document.getElementById('col-lvl-filter');
    if (lvlFilter) {
      lvlFilter.addEventListener('change', (e) => {
        state.mountLevel = e.target.value;
        state.page = 1;
        renderCollections();
      });
    }

    const petSrcFilter = document.getElementById('col-pet-source-filter');
    if (petSrcFilter) {
      petSrcFilter.addEventListener('change', (e) => {
        state.petSource = e.target.value;
        state.page = 1;
        renderCollections();
      });
    }

    const petCatFilter = document.getElementById('col-pet-cat-filter');
    if (petCatFilter) {
      petCatFilter.addEventListener('change', (e) => {
        state.petCategory = e.target.value;
        state.page = 1;
        renderCollections();
      });
    }

    const prevBtn = document.getElementById('col-prev-page');
    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        if (state.page > 1) {
          state.page--;
          renderCollections();
        }
      });
    }

    const nextBtn = document.getElementById('col-next-page');
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        state.page++;
        renderCollections();
      });
    }
  }

  // Hook globally to override camping.js old stub
  window.renderMountsGallery = renderCollections;
  window.initCollectionsExplorer = renderCollections;
})();
