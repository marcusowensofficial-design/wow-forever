/**
 * World of Warcraft: Forever - Universal Search & Command Palette Module
 * Keyboard listener for '/' hotkey, instant indexed search, keyboard navigation.
 */

let searchIndex = [];
let searchSelectedIndex = -1;

function initUniversalSearch() {
  buildSearchIndex();
  setupSearchModalEvents();
}

function buildSearchIndex() {
  searchIndex = [];

  // 1. Dungeons
  if (WOW_FOREVER_DATA?.dungeonsAndRaids) {
    WOW_FOREVER_DATA.dungeonsAndRaids.forEach(d => {
      searchIndex.push({
        title: d.name,
        category: 'Dungeon',
        icon: '🏰',
        desc: `${d.levelRange} • ${d.zone} • ${d.status}`,
        tab: 'codex',
        targetId: 'codex-dungeons'
      });
    });
  }

  // 2. Classes & Specs
  if (WOW_TOOLS_DATA?.tierList?.specs) {
    const allSpecs = [...WOW_TOOLS_DATA.tierList.specs.dps, ...WOW_TOOLS_DATA.tierList.specs.tanks, ...WOW_TOOLS_DATA.tierList.specs.healers];
    allSpecs.forEach(s => {
      searchIndex.push({
        title: s.name,
        category: 'Class & Spec',
        icon: '🧙',
        desc: `${s.role} • ${s.class}`,
        tab: 'planner',
        targetId: 'tab-planner'
      });
    });
  }

  // 3. New Combos
  if (WOW_FOREVER_DATA?.newClassCombos) {
    WOW_FOREVER_DATA.newClassCombos.forEach(c => {
      searchIndex.push({
        title: `${c.race} ${c.className}`,
        category: 'New Race/Class Combo',
        icon: '✦',
        desc: `${c.faction} • ${c.role} • ${c.mount || 'New Combination'}`,
        tab: 'codex',
        targetId: 'codex-combos'
      });
    });
  }

  // 4. Tools & Calculators
  searchIndex.push({
    title: 'WoW Forever Tier List Maker',
    category: 'Interactive Tool',
    icon: '📊',
    desc: 'Drag & Drop tier list maker for specs, classes, and races with image export.',
    tab: 'tierlist',
    targetId: 'tab-tierlist'
  });

  // 3. Level 30 Beta BiS Lists
  if (window.WOW_BIS_DATA?.classes) {
    WOW_BIS_DATA.classes.forEach(c => {
      const clsData = WOW_BIS_DATA[c.id];
      if (clsData && clsData.specs) {
        clsData.specs.forEach(s => {
          searchIndex.push({
            title: `${c.name}: ${s.name} BiS List`,
            category: 'Beta BiS Gear',
            icon: '🛡️',
            desc: `Level 30 Phase 2 BiS gear • ${s.role}`,
            tab: 'bis',
            targetId: 'tab-bis',
            bisClass: c.id,
            bisSpec: s.id
          });
        });
      }
    });
  }

  searchIndex.push({
    title: 'Spell Downranking Calculator',
    category: 'Interactive Tool',
    icon: '🧪',
    desc: 'Compare WoW Forever Build 1.60.6 vs Classic Era 1.15.9 downranking efficiency & HPM.',
    tab: 'downrank',
    targetId: 'tab-downrank'
  });

  searchIndex.push({
    title: 'The Items Blizzard is Hiding (Obfuscation Tracker)',
    category: 'Datamining & Gear',
    icon: '🔒',
    desc: 'Interactive 3D flip card & reveal meter for 2,425 obfuscated items.',
    tab: 'codex',
    targetId: 'codex-hidden'
  });

  searchIndex.push({
    title: 'Legacy Calculator (16 Points & Perks)',
    category: 'Progression System',
    icon: '🏆',
    desc: 'Plan Adventure, Resourcefulness, and Professions trees.',
    tab: 'codex',
    targetId: 'codex-legacy'
  });

  // 5. Guides
  if (WOW_TOOLS_DATA?.guides) {
    WOW_TOOLS_DATA.guides.forEach(g => {
      searchIndex.push({
        title: g.title,
        category: 'Guide',
        icon: '📖',
        desc: g.summary,
        tab: 'codex',
        targetId: 'codex-guides',
        guideId: g.id
      });
    });
  }

  // 6. Systems
  searchIndex.push({
    title: 'Native Cooldown Manager (Build 1.60.6)',
    category: 'Systems & Engine',
    icon: '⏱️',
    desc: 'Zero-taint Blizzard HUD Cooldown Manager across all 9 classes.',
    tab: 'systems',
    targetId: 'tab-systems'
  });

  searchIndex.push({
    title: 'Ray-Traced Global Illumination (DX12)',
    category: 'Graphics Engine',
    icon: '✨',
    desc: 'Hardware ray-tracing specs and Classic 2004 toggle.',
    tab: 'systems',
    targetId: 'tab-systems'
  });

  // 7. Squad Members & Presets (including Sploodge)
  searchIndex.push({
    title: 'Sploodge (Demonology Warlock)',
    category: 'Squad Roster',
    icon: '😈',
    desc: 'Horde Undead Demonology Warlock • Ranged DPS guild preset.',
    tab: 'tracker',
    targetId: 'tab-tracker'
  });

  // 8. Class Deep Dives & Level 30 Talent Specs
  const deepDiveClasses = [
    { id: 'warlock', name: 'Warlock', icon: '🔮' },
    { id: 'warrior', name: 'Warrior', icon: '⚔️' },
    { id: 'paladin', name: 'Paladin', icon: '🛡️' },
    { id: 'druid', name: 'Druid', icon: '🐾' },
    { id: 'mage', name: 'Mage', icon: '❄️' },
    { id: 'priest', name: 'Priest', icon: '✨' },
    { id: 'hunter', name: 'Hunter', icon: '🏹' },
    { id: 'rogue', name: 'Rogue', icon: '🗡️' },
    { id: 'shaman', name: 'Shaman', icon: '⚡' }
  ];
  deepDiveClasses.forEach(c => {
    searchIndex.push({
      title: `${c.name}: Level 30 Talent Builds & Rotation`,
      category: 'Class Deep Dive',
      icon: c.icon,
      desc: `21 talent points cap, 8s rotational strikes, combat priorities, and dungeon pre-BiS targets.`,
      tab: 'deepdives',
      targetId: 'tab-deepdives',
      deepDiveClass: c.id
    });
  });

  // 9. Phase 2 Events & Special Dungeons
  searchIndex.push({
    title: '$100,000 Venruki Level 30 Duel Tournament',
    category: 'Esports & PvP',
    icon: '🏆',
    desc: 'Durotar Gates closed beta invitational tournament (Oct 17–18).',
    tab: 'overview',
    targetId: 'tab-overview'
  });

  searchIndex.push({
    title: 'Excavation Site 4 (Level 26–31 Dungeon)',
    category: 'Phase 2 Dungeon',
    icon: '⛏️',
    desc: 'Wetlands Titan dig site with 4 bosses and Classic+ loot.',
    tab: 'overview',
    targetId: 'tab-overview'
  });

  searchIndex.push({
    title: 'City of Dalaran Under Siege (Level 28–33 Dungeon)',
    category: 'Phase 2 Dungeon',
    icon: '🔮',
    desc: 'Alterac Sewers Kirin Tor vault dungeon with 8 bosses.',
    tab: 'overview',
    targetId: 'tab-overview'
  });
}

function setupSearchModalEvents() {
  const modal = document.getElementById('search-palette-modal') || document.getElementById('universal-search-modal');
  const input = document.getElementById('search-palette-input') || document.getElementById('universal-search-input');
  const triggerBtn = document.getElementById('btn-open-search') || document.getElementById('header-search-trigger');
  const closeBtn = document.getElementById('search-palette-close') || document.getElementById('universal-search-close');

  if (!modal || !input) return;

  // Open modal
  const openModal = () => {
    modal.classList.add('is-open');
    modal.removeAttribute('hidden');
    input.value = '';
    searchSelectedIndex = -1;
    performSearch('');
    setTimeout(() => input.focus(), 50);
  };

  // Close modal
  const closeModal = () => {
    modal.classList.remove('is-open');
    modal.setAttribute('hidden', '');
  };

  if (triggerBtn) triggerBtn.addEventListener('click', openModal);
  if (closeBtn) closeBtn.addEventListener('click', closeModal);


  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  // Hotkey listener '/' and 'Escape'
  document.addEventListener('keydown', (e) => {
    if (e.key === '/' && !['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName)) {
      e.preventDefault();
      openModal();
    } else if (e.key === 'Escape' && modal.classList.contains('is-open')) {
      e.preventDefault();
      closeModal();
    }
  });

  // Live input
  input.addEventListener('input', () => {
    searchSelectedIndex = -1;
    performSearch(input.value.trim());
  });

  // Keyboard navigation inside search results: Up, Down, Enter
  input.addEventListener('keydown', (e) => {
    const resultsContainer = document.getElementById('search-palette-results') || document.getElementById('universal-search-results');
    const items = resultsContainer?.querySelectorAll('.search-result-item') || [];

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (items.length === 0) return;
      searchSelectedIndex = (searchSelectedIndex + 1) % items.length;
      updateSelectedResult(items);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (items.length === 0) return;
      searchSelectedIndex = (searchSelectedIndex - 1 + items.length) % items.length;
      updateSelectedResult(items);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (searchSelectedIndex >= 0 && items[searchSelectedIndex]) {
        items[searchSelectedIndex].click();
      } else if (items.length > 0) {
        items[0].click();
      }
    }
  });
}

function updateSelectedResult(items) {
  items.forEach((item, idx) => {
    item.classList.toggle('is-selected', idx === searchSelectedIndex);
    if (idx === searchSelectedIndex) {
      item.scrollIntoView({ block: 'nearest' });
    }
  });
}

function performSearch(query) {
  const container = document.getElementById('search-palette-results') || document.getElementById('universal-search-results');
  if (!container) return;

  let results = searchIndex;
  if (query) {
    const qLower = query.toLowerCase();
    results = searchIndex.filter(item => 
      item.title.toLowerCase().includes(qLower) ||
      item.category.toLowerCase().includes(qLower) ||
      item.desc.toLowerCase().includes(qLower)
    );
  }

  if (results.length === 0) {
    container.innerHTML = `
      <div class="search-empty-state">
        <span style="font-size: 2rem;">🔍</span>
        <p>No results found for "<strong>${escapeHtml(query)}</strong>"</p>
        <small>Try searching for "Dalaran", "Tier List", "Downrank", "Paladin", or "Sleeping Bag".</small>
      </div>
    `;
    return;
  }

  container.innerHTML = results.slice(0, 12).map((item, idx) => `
    <div class="search-result-item ${idx === 0 ? 'is-selected' : ''}" 
         data-tab="${item.tab}" 
         data-target="${item.targetId}"
         ${item.bisClass ? `data-bis-class="${item.bisClass}" data-bis-spec="${item.bisSpec}"` : ''}
         ${item.guideId ? `data-guide-id="${item.guideId}"` : ''}
         ${item.deepDiveClass ? `data-deep-dive-class="${item.deepDiveClass}"` : ''}
         onclick="handleSearchResultClick(this)">
      <span class="search-item-icon">${item.icon}</span>
      <div class="search-item-details">
        <div class="search-item-top">
          <strong class="search-item-title">${highlightMatch(item.title, query)}</strong>
          <span class="search-item-cat">${item.category}</span>
        </div>
        <p class="search-item-desc">${highlightMatch(item.desc, query)}</p>
      </div>
      <span class="search-item-jump">Jump ↵</span>
    </div>
  `).join('');

  searchSelectedIndex = 0;
}

function highlightMatch(text, query) {
  if (!query) return escapeHtml(text);
  const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
  return escapeHtml(text).replace(regex, '<mark>$1</mark>');
}

window.handleSearchResultClick = function(elem) {
  const modal = document.getElementById('search-palette-modal') || document.getElementById('universal-search-modal');
  if (modal) {
    modal.classList.remove('is-open');
    modal.setAttribute('hidden', '');
  }

  const tab = elem.getAttribute('data-tab');
  const targetId = elem.getAttribute('data-target');
  const guideId = elem.getAttribute('data-guide-id');
  const bisClass = elem.getAttribute('data-bis-class');
  const bisSpec = elem.getAttribute('data-bis-spec');
  const deepDiveClass = elem.getAttribute('data-deep-dive-class');

  // Switch to target tab
  const tabBtn = document.querySelector(`.nav-tab-btn[data-tab="${tab}"]`);
  if (tabBtn) tabBtn.click();

  // If selecting a BiS spec
  if (bisClass && bisSpec && typeof currentBiSState !== 'undefined') {
    currentBiSState.classId = bisClass;
    currentBiSState.specId = bisSpec;
    if (typeof renderBiSApp === 'function') renderBiSApp();
  }

  // If selecting a deep dive class
  if (deepDiveClass && typeof window.switchDeepDiveClass === 'function') {
    window.switchDeepDiveClass(deepDiveClass);
  }

  // If sub-codex panel
  if (tab === 'codex') {
    const codexBtn = document.querySelector(`.codex-nav-btn[data-codex="${targetId.replace('codex-', '')}"]`);
    if (codexBtn) codexBtn.click();
  }

  // Scroll to element
  setTimeout(() => {
    const target = document.getElementById(targetId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    // If opening a specific guide
    if (guideId && typeof window.openGuideModal === 'function') {
      window.openGuideModal(guideId);
    }
  }, 100);
};


window.initUniversalSearch = initUniversalSearch;
