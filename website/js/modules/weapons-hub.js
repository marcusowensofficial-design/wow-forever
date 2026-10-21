/**
 * World of Warcraft: Forever - Weapons Progression Hub Module
 * Dedicated 1:1 Top-Level Surface for 1–60 Weapon, Wand, and Shield Progression.
 * Reuses the single source of truth: window.WOW_DEEPDIVES_PROGRESSION.
 */

(function() {
  'use strict';

  const escapeHtml = window.escapeHtml || (s => String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"));

  let activeClassId = 'warrior';
  let activeCategory = 'weapons'; // 'weapons' | 'wands' | 'offhands'

  const CLASS_ORDER = ['warrior', 'paladin', 'hunter', 'rogue', 'shaman', 'mage', 'warlock', 'priest', 'druid'];

  function getAvailableCategories(classId) {
    const cats = [{ id: 'weapons', label: 'Weapons', icon: '⚔️' }];
    if (['mage', 'priest', 'warlock'].includes(classId)) {
      cats.push({ id: 'wands', label: 'Wands', icon: '🪄' });
    }
    if (['warrior', 'paladin', 'shaman'].includes(classId)) {
      cats.push({ id: 'offhands', label: 'Shields', icon: '🛡️' });
    } else if (classId === 'druid') {
      cats.push({ id: 'offhands', label: 'Off-Hand & Idols', icon: '🔮' });
    } else if (['priest', 'mage', 'warlock'].includes(classId)) {
      cats.push({ id: 'offhands', label: 'Off-Hands', icon: '🔮' });
    }
    return cats;
  }

  function getWeaponCountForClass(classId) {
    let count = 0;
    const countItems = (arr) => {
      if (!Array.isArray(arr)) return;
      arr.forEach(step => {
        count += 1;
        if (Array.isArray(step.alts)) count += step.alts.length;
        if (Array.isArray(step.alternatives)) count += step.alternatives.length;
      });
    };
    const pData = window.WOW_PROGRESSION_DATA;
    if (!pData) return 0;
    countItems(pData.weapons?.[classId]?.levels);
    countItems(pData.weapons?.[classId]?.healingLevels);
    if (pData.weapons?.[classId]?.tracksData) {
      Object.entries(pData.weapons[classId].tracksData).forEach(([trackId, arr]) => {
        if (trackId !== 'primary' && trackId !== 'dps') {
          countItems(arr);
        }
      });
    }
    countItems(pData.offhands?.[classId]?.levels);
    countItems(pData.offhands?.[classId]?.healingLevels);
    countItems(pData.wands?.[classId]?.levels);
    return count;
  }

  function renderClassChips() {
    const container = document.getElementById('weapons-class-chips');
    if (!container) return;

    const classDataMap = window.WOW_FOREVER_DATA?.classDeepDives || {};

    container.innerHTML = CLASS_ORDER.map(cid => {
      const c = classDataMap[cid] || { id: cid, name: cid.charAt(0).toUpperCase() + cid.slice(1), icon: '⚔️', color: '#c79c6e' };
      const isActive = cid === activeClassId;
      const totalCount = getWeaponCountForClass(cid);
      const activeStyle = isActive ? `border-color: ${c.color}; box-shadow: 0 0 14px ${c.color}45;` : '';

      return `
        <button type="button" class="selector-chip-btn ${isActive ? 'active' : ''}" data-class-id="${c.id}" style="${activeStyle}">
          <span>${c.icon}</span>
          <span>${escapeHtml(c.name)}</span>
          <span class="chip-status-badge ready">${totalCount} Items</span>
        </button>
      `;
    }).join('');

    container.querySelectorAll('.selector-chip-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const cId = btn.getAttribute('data-class-id');
        selectClass(cId);
      });
    });
  }

  function renderCategoryChips() {
    const bar = document.getElementById('weapons-category-container');
    const container = document.getElementById('weapons-category-chips');
    if (!bar || !container) return;

    const availableCats = getAvailableCategories(activeClassId);

    // If only weapons exist for this class, hide the secondary subcategory bar
    if (availableCats.length <= 1) {
      bar.style.display = 'none';
      activeCategory = 'weapons';
      return;
    }

    bar.style.display = 'flex';
    container.innerHTML = availableCats.map(cat => `
      <button type="button" class="weapons-cat-btn ${cat.id === activeCategory ? 'active' : ''}" data-cat="${cat.id}">
        <span>${cat.icon}</span>
        <span>${escapeHtml(cat.label)}</span>
      </button>
    `).join('');

    container.querySelectorAll('.weapons-cat-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const cat = btn.getAttribute('data-cat');
        selectCategory(cat);
      });
    });
  }

  function renderContent() {
    const mount = document.getElementById('weapons-hub-mount');
    if (!mount) return;

    if (!window.WOW_DEEPDIVES_PROGRESSION || typeof window.WOW_DEEPDIVES_PROGRESSION.renderProgressionSubtab !== 'function') {
      mount.innerHTML = `<div class="progression-empty-state"><p>Loading weapon progression...</p></div>`;
      return;
    }

    const cData = window.WOW_FOREVER_DATA?.classDeepDives?.[activeClassId] || {
      id: activeClassId,
      name: activeClassId.charAt(0).toUpperCase() + activeClassId.slice(1)
    };

    mount.innerHTML = window.WOW_DEEPDIVES_PROGRESSION.renderProgressionSubtab(activeCategory, cData);

    // Wire mouseover tooltips, track switching, and faction toggle with scoped re-rendering
    window.WOW_DEEPDIVES_PROGRESSION.setupEventListeners(mount, () => {
      renderContent();
    });
  }

  function selectClass(classId, category = null, options = {}) {
    const normalized = (classId || '').toLowerCase().trim();
    if (CLASS_ORDER.includes(normalized)) {
      activeClassId = normalized;
    }

    const availableCats = getAvailableCategories(activeClassId);
    if (category && availableCats.some(c => c.id === category)) {
      activeCategory = category;
    } else if (!availableCats.some(c => c.id === activeCategory)) {
      activeCategory = 'weapons';
    }

    renderClassChips();
    renderCategoryChips();
    renderContent();

    if (!options.noPushState && typeof history !== 'undefined' && history.replaceState) {
      const hash = activeCategory === 'weapons' ? `#weapons/${activeClassId}` : `#weapons/${activeClassId}/${activeCategory}`;
      try {
        history.replaceState({ tab: 'weapons', class: activeClassId, category: activeCategory }, '', hash);
      } catch {
        // Safe no-op
      }
    }
  }

  function selectCategory(category, options = {}) {
    const availableCats = getAvailableCategories(activeClassId);
    if (availableCats.some(c => c.id === category)) {
      activeCategory = category;
      renderCategoryChips();
      renderContent();

      if (!options.noPushState && typeof history !== 'undefined' && history.replaceState) {
        const hash = activeCategory === 'weapons' ? `#weapons/${activeClassId}` : `#weapons/${activeClassId}/${activeCategory}`;
        try {
          history.replaceState({ tab: 'weapons', class: activeClassId, category: activeCategory }, '', hash);
        } catch {
          // Safe no-op
        }
      }
    }
  }

  function initWeaponsHub() {
    renderClassChips();
    renderCategoryChips();
    renderContent();
  }

  window.initWeaponsHub = initWeaponsHub;
  window.WOW_WEAPONS_HUB = {
    init: initWeaponsHub,
    selectClass,
    selectCategory,
    getActiveClass: () => activeClassId,
    getActiveCategory: () => activeCategory
  };

})();
