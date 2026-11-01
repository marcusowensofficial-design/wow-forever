/**
 * World of Warcraft: Forever - BiS Slot Enhancements & Optimal Enchants
 * Pure Logic Module — Controller and View Renderer for BiS Paper-Doll Enhancements
 */
(function () {
  'use strict';

  let activeProfile = 'raid'; // 'raid' or 'lvl'

  const SLOT_DISPLAY = {
    head: 'Head (Arcanum)',
    shoulder: 'Shoulder (Mantle / Inscription)',
    back: 'Cloak / Back',
    chest: 'Chest Armor',
    wrist: 'Bracers',
    hands: 'Gloves',
    legs: 'Legs (Arcanum / Armor Kit)',
    feet: 'Boots',
    w1h: 'One-Hand Weapon',
    w2h: 'Two-Hand Weapon',
    rng: 'Ranged Weapon (Scope)',
    shield: 'Shield / Off-Hand',
    held: 'Held In Off-Hand',
    neck: 'Necklace'
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

  window.setBisEnhancementProfile = function (profile) {
    activeProfile = profile;
    if (typeof window.renderCurrentBiSView === 'function') {
      window.renderCurrentBiSView();
    }
  };

  window.renderBisEnhancements = function (className, specName, fallbackEnchants) {
    const data = window.WOW_BIS_ENHANCEMENTS;
    if (!data || !data.specs) {
      // Fallback to legacy enchants
      return (fallbackEnchants || []).map(ench => `
        <div class="bis-prep-item">
          <img src="${ench.icon || 'https://render.worldofwarcraft.com/us/icons/56/trade_engraving.jpg'}" alt="" class="bis-prep-item-icon q2" loading="lazy" />
          <div class="bis-prep-item-main">
            <div class="bis-prep-item-title">
              <span class="bis-prep-category-tag">${esc(ench.slot || 'Gear')}</span>
              <span>${esc(ench.effect || ench.name || '')}</span>
            </div>
            <div class="bis-prep-item-source">📍 ${esc(ench.source || '')}</div>
          </div>
        </div>
      `).join('');
    }

    const upperCls = (className || '').toUpperCase();
    const classSpecs = data.specs[upperCls] || {};
    const specData = classSpecs[specName] || Object.values(classSpecs)[0];

    if (!specData || !specData[activeProfile]) {
      return '<p class="bis-empty-text" style="color:var(--text-muted);font-size:0.85rem;padding:1rem;">No enhancements found for this spec.</p>';
    }

    const slotMap = specData[activeProfile];
    const slotKeys = Object.keys(slotMap);

    if (slotKeys.length === 0) {
      return '<p class="bis-empty-text" style="color:var(--text-muted);font-size:0.85rem;padding:1rem;">No recommended enhancements for this profile.</p>';
    }

    const profileToggle = `
      <div style="display:flex;align-items:center;justify-content:space-between;padding:0.4rem 0.6rem;background:rgba(255,255,255,0.03);border-radius:6px;margin-bottom:0.75rem;">
        <span style="font-size:0.75rem;color:#94a3b8;font-weight:600;">Enhancement Profile:</span>
        <div style="display:flex;gap:0.35rem;">
          <button type="button" onclick="setBisEnhancementProfile('raid')"
                  style="background:${activeProfile === 'raid' ? '#3b82f6' : 'rgba(255,255,255,0.06)'};color:${activeProfile === 'raid' ? '#fff' : '#cbd5e1'};border:none;padding:0.2rem 0.6rem;border-radius:4px;font-size:0.72rem;font-weight:700;cursor:pointer;">
            🛡️ Raid BiS
          </button>
          <button type="button" onclick="setBisEnhancementProfile('lvl')"
                  style="background:${activeProfile === 'lvl' ? '#3b82f6' : 'rgba(255,255,255,0.06)'};color:${activeProfile === 'lvl' ? '#fff' : '#cbd5e1'};border:none;padding:0.2rem 0.6rem;border-radius:4px;font-size:0.72rem;font-weight:700;cursor:pointer;">
            ⚔️ Pre-Raid / Leveling
          </button>
        </div>
      </div>
    `;

    const itemsHtml = slotKeys.map(slotKey => {
      const items = slotMap[slotKey] || [];
      const best = items[0];
      if (!best) return '';
      const slotLabel = SLOT_DISPLAY[slotKey] || slotKey.toUpperCase();
      const hasAlts = items.length > 1;

      return `
        <div class="bis-prep-item" style="border-bottom:1px solid rgba(255,255,255,0.05);padding:0.6rem 0.4rem;">
          <div style="width:34px;height:34px;border-radius:6px;background:#1e293b;border:1.5px solid #a855f7;display:flex;align-items:center;justify-content:center;font-size:1.1rem;flex-shrink:0;">
            ✨
          </div>
          <div class="bis-prep-item-main" style="margin-left:0.65rem;flex:1;min-width:0;">
            <div class="bis-prep-item-title" style="display:flex;align-items:center;gap:0.4rem;flex-wrap:wrap;">
              <span class="bis-prep-category-tag" style="background:rgba(168,85,247,0.18);color:#c084fc;border:1px solid rgba(168,85,247,0.3);padding:0.05rem 0.35rem;border-radius:4px;font-size:0.7rem;font-weight:700;">
                ${esc(slotLabel)}
              </span>
              <strong style="color:#f8fafc;font-size:0.86rem;">${esc(best.name)}</strong>
              ${hasAlts ? `<span style="color:#64748b;font-size:0.72rem;">(+${items.length - 1} alts)</span>` : ''}
            </div>
            ${best.stats ? `<div style="font-size:0.78rem;color:#38bdf8;margin-top:0.15rem;font-weight:600;">✦ ${esc(best.stats)}</div>` : ''}
            ${best.source ? `<div class="bis-prep-item-source" style="font-size:0.74rem;color:#94a3b8;margin-top:0.15rem;">📜 ${esc(best.source)}</div>` : ''}
          </div>
        </div>
      `;
    }).join('');

    return profileToggle + itemsHtml;
  };

})();
