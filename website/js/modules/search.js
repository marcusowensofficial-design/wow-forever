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

  const foreverData = window.WOW_FOREVER_DATA || (typeof WOW_FOREVER_DATA !== 'undefined' ? WOW_FOREVER_DATA : null);
  const toolsData = window.WOW_TOOLS_DATA || (typeof WOW_TOOLS_DATA !== 'undefined' ? WOW_TOOLS_DATA : null);

  // 1. Dungeons
  if (foreverData?.dungeonsAndRaids) {
    foreverData.dungeonsAndRaids.forEach(d => {
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
  if (toolsData?.tierList?.specs) {
    const allSpecs = [...toolsData.tierList.specs.dps, ...toolsData.tierList.specs.tanks, ...toolsData.tierList.specs.healers];
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
  if (foreverData?.newClassCombos) {
    foreverData.newClassCombos.forEach(c => {
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
            category: 'Midway BiS Gear',
            icon: '🛡️',
            desc: `Midway Level 30 progression BiS gear • ${s.role}`,
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
    tab: 'systems',
    targetId: 'hidden-items-tracker-container'
  });

  // 1–60 Weapon & Shield Upgrade Paths Hub
  searchIndex.push({
    title: '1–60 Weapon & Shield Upgrade Paths',
    category: 'Progression Hub',
    icon: '⚔️',
    desc: 'Level 1 to 60 weapon, wand, and shield leveling upgrade paths across all 9 classes.',
    tab: 'weapons',
    targetId: 'tab-weapons'
  });

  const weaponClasses = [
    { id: 'warrior', name: 'Warrior', desc: 'Two-Hand, Dual-Wield, and Tanking Shield upgrades from level 1 to 60.' },
    { id: 'paladin', name: 'Paladin', desc: 'Two-Hand Retribution, One-Hand + Shield Protection and Holy healing paths.' },
    { id: 'hunter', name: 'Hunter', desc: 'Bows, Guns, Crossbows, and stat-stick melee weapons from level 1 to 60.' },
    { id: 'rogue', name: 'Rogue', desc: 'Combat Swords and Assassination/Subtlety Daggers weapon upgrade paths.' },
    { id: 'shaman', name: 'Shaman', desc: 'Two-Hand Enhancement, One-Hand caster weapons, and elemental shields.' },
    { id: 'mage', name: 'Mage', desc: 'Caster staves, one-hand daggers/swords, wands, and off-hand tomes.' },
    { id: 'warlock', name: 'Warlock', desc: 'Caster staves, wands, and spell-damage off-hand upgrade tracks.' },
    { id: 'priest', name: 'Priest', desc: 'Healing and Shadow staves, early wands (Lesser Magic Wand), and off-hands.' },
    { id: 'druid', name: 'Druid', desc: 'Feral feral-attack-power maces/staves, Resto/Balance staves, and idols.' }
  ];

  weaponClasses.forEach(wc => {
    searchIndex.push({
      title: `${wc.name} 1–60 Weapon Paths`,
      category: 'Weapon Progression',
      icon: '⚔️',
      desc: wc.desc,
      tab: 'weapons',
      targetId: 'tab-weapons',
      weaponClass: wc.id
    });
  });

  // Companion Addons & All-in-One Suite
  [
    {
      title: "Marcus's All-in-One WoW Forever Addon Suite (v2.2.1)",
      icon: '🧩',
      desc: 'Complete 6-addon pack: ForeverPlates, Castbars, ForeverLiquid, ForeverDungeonJournal, ForeverBlessings, and EchoTwist.',
      targetId: 'tab-addons'
    },
    {
      title: 'ForeverPlates (v2.1.1) — Zero-Taint Pixel Nameplate Engine',
      icon: '🎯',
      desc: 'C-side health formatting on <secret number> values, threat colors, execute borders, and /fp test mode.',
      targetId: 'card-foreverplates'
    },
    {
      title: 'Forever Nameplates Castbars (v2.2.1) — Sub-Pixel Castbar & Latency HUD',
      icon: '⚡',
      desc: 'Enemy nameplate castbars with uninterruptible shield detection and lag queue window (/bcb, /fpc).',
      targetId: 'card-forevercastbars'
    },
    {
      title: 'ForeverLiquid (v1.3.1) — Cyberpunk Neon Fluid XP & Gold Ledger HUD',
      icon: '🧪',
      desc: '20-bubble fluid XP bar, live gold/hr cashflow ledger, mount fund ETA, and 5-instance/hr lockout radar (/fl).',
      targetId: 'card-foreverliquid'
    },
    {
      title: 'ForeverDungeonJournal (v1.6.2) — Classic+ Encounter Atlas & BiS Wishlist',
      icon: '📖',
      desc: 'All 13 Classic+ dungeons, 3D boss viewer, calibrated maps, and /fj import in-game BiS wishlist starring.',
      targetId: 'card-foreverjournal'
    },
    {
      title: 'ForeverBlessings (v1.1.0) — 60-Minute Paladin Blessing Coordinator',
      icon: '👑',
      desc: 'Class assignment matrix, reagent-free 1-hour Greater Blessing tracking, and one-click raid audit (/fb).',
      targetId: 'card-foreverblessings'
    },
    {
      title: 'EchoTwist (v1.0.0) — Windfury Proc Echo & 0.4s Seal Twist Window HUD',
      icon: '🌪️',
      desc: 'High-precision main-hand swing timer, 0.4s golden Ret Paladin twist window, and Windfury proc alerts (/et).',
      targetId: 'card-echotwist'
    }
  ].forEach(addon => {
    searchIndex.push({
      title: addon.title,
      category: 'Companion Addon',
      icon: addon.icon,
      desc: addon.desc,
      tab: 'addons',
      targetId: addon.targetId
    });
  });

  searchIndex.push({
    title: 'Complete Item Database (22,493 Items & 28 Dungeon Loot Tables)',
    category: 'Database & Loot',
    icon: '📚',
    desc: 'Search all 22,493 items, 4,121 new Forever items, and 28 dungeon boss drop tables.',
    tab: 'codex',
    targetId: 'codex-database'
  });

  searchIndex.push({
    title: 'Legacy Tree Planner (16 Launch & 65 Season Cap)',
    category: 'Progression System',
    icon: '🏆',
    desc: 'Plan account-wide Tradeskill Mastery, World Explorer, and Resourcefulness trees. Export builds & track challenges.',
    tab: 'legacy',
    targetId: 'tab-legacy'
  });

  searchIndex.push({
    title: 'Tradeskill Mastery Legacy Tree',
    category: 'Progression System',
    icon: '⚒️',
    desc: 'Bountiful Harvest, Working Overtime, Bartering vendor cuts, and Performance Bonus favor crates.',
    tab: 'legacy',
    targetId: 'tab-legacy'
  });

  searchIndex.push({
    title: 'World Explorer Legacy Tree',
    category: 'Progression System',
    icon: '🧭',
    desc: 'Talented (+5 talent points from L5), Rested XP boosts, Thrill of Adventure, and Frequent Flier.',
    tab: 'legacy',
    targetId: 'tab-legacy'
  });

  searchIndex.push({
    title: 'Resourcefulness & Economy Legacy Tree',
    category: 'Progression System',
    icon: '💰',
    desc: 'Zero-cost vendor reagents, Well Fed extension, death durability cuts, and raid buff permanence.',
    tab: 'legacy',
    targetId: 'tab-legacy'
  });

  searchIndex.push({
    title: 'Season 1 Legacy Milestone Rewards (Innkeeper Wiley)',
    category: 'Progression System',
    icon: '🎁',
    desc: 'Replica Ironforge Air Rifle (15 pts), Spectral Bear Cub (25 pts), Tabard (40 pts), and Mount (55 pts).',
    tab: 'legacy',
    targetId: 'tab-legacy'
  });

  // 5. Guides
  if (WOW_TOOLS_DATA?.guides) {
    WOW_TOOLS_DATA.guides.forEach(g => {
      searchIndex.push({
        title: g.title,
        category: `Guide • ${g.category}`,
        icon: '📖',
        desc: g.summary,
        tab: 'guides',
        targetId: 'tab-guides',
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
    title: 'Our Forever Squad (Discord Roster)',
    category: 'Squad Roster',
    icon: '🛡️',
    desc: 'View our Discord friend group roster, class roles, specs, and professions.',
    tab: 'tracker',
    targetId: 'tab-tracker'
  });
  searchIndex.push({
    title: 'Sploodge (Demonology Warlock)',
    category: 'Squad Roster',
    icon: '😈',
    desc: 'Horde Undead Demonology Warlock • Ranged DPS guild preset.',
    tab: 'tracker',
    targetId: 'tab-tracker'
  });
  searchIndex.push({
    title: 'Launch Milestones & Character Profile',
    category: 'Progression',
    icon: '📋',
    desc: 'Track Launch Day 1–30 rapid progression milestones and configure personal character profile.',
    tab: 'milestones',
    targetId: 'tab-milestones'
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
    desc: 'Durotar Gates invitational tournament VOD and forensic duel analysis.',
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

  // 10. World Rares (Atlas)
  if (window.WOW_ATLAS_DATA?.rares) {
    window.WOW_ATLAS_DATA.rares.forEach(r => {
      searchIndex.push({
        title: `${r.name} (Lvl ${r.level}${r.elite ? ' Elite' : ''} Rare)`,
        category: 'World Rare',
        icon: '💀',
        desc: `${r.zone} • Coords: ${r.coords} • Drops: ${r.drops ? r.drops.map(d => d.name).join(', ') : 'Merchant\'s Favor'}`,
        tab: 'atlas',
        targetId: 'tab-atlas',
        atlasSub: 'rares'
      });
    });
  }

  // 11. Hidden Library Books (Atlas)
  const libBooks = window.WOW_ATLAS_DATA?.libraryBooks?.books || [];
  libBooks.forEach(b => {
    searchIndex.push({
      title: `${b.name} (Library Book #${b.id})`,
      category: 'Hidden Library Book',
      icon: '📖',
      desc: `${b.zone} • Coords: ${b.coords} • ${b.desc}`,
      tab: 'atlas',
      targetId: 'atlas-subtab-books',
      atlasSub: 'books'
    });
  });

  // 12. Professions & Key Recipes
  if (window.WOW_PROFESSIONS_DATA) {
    Object.keys(window.WOW_PROFESSIONS_DATA).forEach(slug => {
      const p = window.WOW_PROFESSIONS_DATA[slug];
      if (p && p.name) {
        searchIndex.push({
          title: `${p.name} (1–300 Guide & Recipes)`,
          category: 'Profession Hub',
          icon: '🔨',
          desc: `Full recipe catalog, leveling guide 1–150/300, reagents, and camp buffs.`,
          tab: 'professions',
          targetId: 'tab-professions',
          profession: slug
        });
        if (Array.isArray(p.recipes)) {
          p.recipes.forEach(rec => {
            searchIndex.push({
              title: `${rec.name} (${p.name} Recipe)`,
              category: 'Profession Recipe',
              icon: '📜',
              desc: `Requires ${p.name} (${rec.learn}) • ${rec.source || 'Trainer / Drop'}`,
              tab: 'professions',
              targetId: rec.id ? `recipe-${rec.id}` : 'tab-professions',
              profession: slug,
              recipeName: rec.name,
              recipeId: rec.id
            });
          });
        }
      }
    });
  }

  // 13. Camping Stations & Sleeping Bag
  if (window.WOW_FOREVER_DATA?.campingStations) {
    window.WOW_FOREVER_DATA.campingStations.forEach(st => {
      searchIndex.push({
        title: `${st.name} (Camping Station)`,
        category: 'Camping Hub',
        icon: '⛺',
        desc: `${st.profReq} • ${st.buffDesc || st.effect}`,
        tab: 'camping',
        targetId: 'tab-camping'
      });
    });
  }
  searchIndex.push({
    title: 'Cozy Sleeping Bag (+3% XP Stacking Buff)',
    category: 'Leveling & Utility',
    icon: '⛺',
    desc: 'Westfall & Barrens discovery questline. Rest for 3 min to gain stacking +3% XP for 2 hours.',
    tab: 'camping',
    targetId: 'cozy-sleeping-bag-container'
  });

  // 14. Datamined Spells & Talents (753 Changes)
  if (window.WOW_CHANGES_DATA?.entries) {
    const classLabels = {
      warrior: 'Warrior', paladin: 'Paladin', hunter: 'Hunter', rogue: 'Rogue',
      priest: 'Priest', shaman: 'Shaman', mage: 'Mage', warlock: 'Warlock', druid: 'Druid'
    };
    window.WOW_CHANGES_DATA.entries.forEach(e => {
      const clsName = classLabels[e.class] || e.class;
      const typeLabel = e.kind === 'talent' ? `Talent (${e.tree_name || 'Class'})` : `Spell (${e.tree_name || 'Baseline'})`;
      const changeKind = e.reported_change_kind === 'added' ? 'New' : (e.reported_change_kind === 'modified' ? 'Changed' : (e.reported_change_kind === 'removed' ? 'Removed' : 'Updated'));
      const summaryText = e.summary || (e.rank_texts ? e.rank_texts['1'] : '') || '';

      searchIndex.push({
        title: `${e.name} (${clsName} ${changeKind} ${e.kind === 'talent' ? 'Talent' : 'Spell'})`,
        category: `What's Changed • ${clsName}`,
        icon: '🔄',
        desc: `${typeLabel} • ${summaryText}`,
        tab: 'changes',
        targetId: 'changes-mount-point',
        changeClass: e.class,
        changeId: e.id
      });
    });
  }

  // 15. Hunter Pets & Pet Families
  if (window.WOW_ATLAS_DATA?.hunterPets?.families) {
    window.WOW_ATLAS_DATA.hunterPets.families.forEach(f => {
      const aliasTitle = f.id === 'bird-of-prey' ? 'Bird of Prey / Owls (Hunter Pet Family)' :
                         f.id === 'carrion-bird' ? 'Carrion Bird / Vultures (Hunter Pet Family)' :
                         `${f.name} (Hunter Pet Family)`;
      searchIndex.push({
        title: aliasTitle,
        category: 'Hunter Pet Directory',
        icon: '🐾',
        desc: `Diet: ${f.diet ? f.diet.join(', ') : 'Meat'} • Modifiers: Dmg ${f.damageMod}, Arm ${f.armorMod}, HP ${f.healthMod}`,
        tab: 'codex',
        targetId: 'codex-pets',
        petFamily: f.id
      });
    });
  }

  // 16. All 520 Hunter Beasts
  if (window.WOW_ATLAS_DATA?.hunterPets?.allBeasts) {
    window.WOW_ATLAS_DATA.hunterPets.allBeasts.forEach(b => {
      const isFast = b.speedNum && b.speedNum <= 1.5;
      const famSlug = typeof window.normalizePetFamily === 'function' ? window.normalizePetFamily(b.family) : (b.family ? b.family.toLowerCase().replace(/[-_\s]+/g, '') : 'all');
      searchIndex.push({
        title: `${b.name} (Lvl ${b.level} ${b.family})`,
        category: `Hunter Beast • ${b.family}`,
        icon: isFast ? '⚡' : '🐾',
        desc: `${b.zone}${b.subzone ? ' • ' + b.subzone : ''} • Speed: ${b.speed || '2.0s'}${b.teaches ? ' • Teaches: ' + b.teaches : ''} • ${b.faction || 'Contested'}`,
        tab: 'codex',
        targetId: 'codex-pets',
        petFamily: famSlug,
        petName: b.name
      });
    });
  }
}

function setupSearchModalEvents() {
  const modal = document.getElementById('search-palette-modal') || document.getElementById('universal-search-modal');
  const input = document.getElementById('search-palette-input') || document.getElementById('universal-search-input');
  const triggerBtn = document.getElementById('btn-open-search') || document.getElementById('header-search-trigger');
  const closeBtn = document.getElementById('search-palette-close') || document.getElementById('universal-search-close');

  if (!modal || !input) return;

  // Open modal
  const openModal = () => {
    if (searchIndex.length < 500) {
      buildSearchIndex();
    }
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

  // Hotkey listener '/' and 'Escape', plus Ctrl+K / Cmd+K
  document.addEventListener('keydown', (e) => {
    if ((e.key === '/' && !['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName)) ||
        ((e.key === 'k' || e.key === 'K') && (e.ctrlKey || e.metaKey))) {
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
         ${item.atlasSub ? `data-atlas-sub="${item.atlasSub}"` : ''}
         ${item.profession ? `data-profession="${item.profession}"` : ''}
         ${item.recipeName ? `data-recipe-name="${escapeHtml(item.recipeName)}"` : ''}
         ${item.recipeId ? `data-recipe-id="${item.recipeId}"` : ''}
         ${item.changeClass ? `data-change-class="${item.changeClass}" data-change-id="${item.changeId}"` : ''}
         ${item.weaponClass ? `data-weapon-class="${item.weaponClass}"` : ''}
         ${item.weaponCategory ? `data-weapon-category="${item.weaponCategory}"` : ''}
         ${item.petFamily ? `data-pet-family="${escapeHtml(item.petFamily)}"` : ''}
         ${item.petName ? `data-pet-name="${escapeHtml(item.petName)}"` : ''}
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
  if (!text) return '';
  const escapedText = escapeHtml(text);
  if (!query || !query.trim()) return escapedText;
  const escapedQuery = escapeHtml(query.trim());
  const regex = new RegExp(`(${escapedQuery.replace(/[.*+?^${}()|[\\]\\]/g, '\\$&')})`, 'gi');
  return escapedText.replace(regex, '<mark>$1</mark>');
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
  const profession = elem.getAttribute('data-profession');
  const recipeName = elem.getAttribute('data-recipe-name');
  const recipeId = elem.getAttribute('data-recipe-id');
  const atlasSub = elem.getAttribute('data-atlas-sub');
  const changeClass = elem.getAttribute('data-change-class');
  const changeId = elem.getAttribute('data-change-id');
  const weaponClass = elem.getAttribute('data-weapon-class');
  const weaponCategory = elem.getAttribute('data-weapon-category');
  const petFamily = elem.getAttribute('data-pet-family');
  const petName = elem.getAttribute('data-pet-name');

  // Switch to target tab
  const tabBtn = document.querySelector(`.nav-tab-btn[data-tab="${tab}"]`);
  if (tabBtn) tabBtn.click();

  // If selecting a BiS spec
  if (bisClass && bisSpec && typeof currentBiSState !== 'undefined') {
    currentBiSState.classId = bisClass;
    currentBiSState.specId = bisSpec;
    window.location.hash = `#bis/${bisClass}/${bisSpec}`;
    if (typeof renderBiSApp === 'function') renderBiSApp();
  }

  // If selecting a deep dive class
  if (deepDiveClass && typeof window.switchDeepDiveClass === 'function') {
    window.switchDeepDiveClass(deepDiveClass);
  }

  // If selecting a What's Changed ability
  if (tab === 'changes' && changeClass && window.WOW_CHANGES) {
    if (changeId && typeof window.WOW_CHANGES.selectItem === 'function') {
      window.WOW_CHANGES.selectItem(changeClass, changeId);
    } else if (typeof window.WOW_CHANGES.selectClass === 'function') {
      window.WOW_CHANGES.selectClass(changeClass, 'everything');
    }
  }

  // If sub-codex panel
  if (tab === 'codex' && targetId) {
    const codexBtn = document.querySelector(`.codex-nav-btn[data-codex="${targetId.replace('codex-', '')}"]`);
    if (codexBtn) codexBtn.click();
    if (targetId === 'codex-pets' && (petFamily || petName)) {
      setTimeout(() => {
        const searchInput = document.getElementById('modal-pet-search') || document.getElementById('pet-search-input') || document.querySelector('.pet-search-input');
        if (searchInput && petName) {
          searchInput.value = petName;
          searchInput.dispatchEvent(new Event('input'));
        }
      }, 150);
    }
  }

  // If atlas subtab
  if (tab === 'atlas' && atlasSub) {
    const atlasBtn = document.querySelector(`.atlas-subnav-btn[data-subtab="${atlasSub}"]`);
    if (atlasBtn) atlasBtn.click();
  }

  // If profession sub-route
  if (tab === 'professions' && profession) {
    if (window.WOW_PROFESSIONS && typeof window.WOW_PROFESSIONS.selectProfession === 'function') {
      window.WOW_PROFESSIONS.selectProfession(profession, 'recipes', recipeName || '', targetId || (recipeId ? `recipe-${recipeId}` : null));
    } else {
      window.location.hash = `#professions/${profession}/recipes`;
    }
  }

  // If weapon progression route
  if (tab === 'weapons' && (weaponClass || weaponCategory)) {
    if (window.WOW_WEAPONS_HUB && typeof window.WOW_WEAPONS_HUB.selectClass === 'function') {
      window.WOW_WEAPONS_HUB.selectClass(weaponClass || 'warrior', weaponCategory || null);
    }
  }

  // Scroll to element
  setTimeout(() => {
    const target = document.getElementById(targetId);
    if (target && tab !== 'changes') {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    // If opening a specific guide
    if (guideId) {
      if (typeof window.navigateToGuide === 'function') {
        window.navigateToGuide(guideId);
      } else if (typeof window.openGuideModal === 'function') {
        window.openGuideModal(guideId);
      }
    }
  }, 100);
};


window.initUniversalSearch = initUniversalSearch;
window.getSearchIndex = () => searchIndex;
