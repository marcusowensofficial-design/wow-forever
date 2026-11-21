/**
 * World of Warcraft: Forever - BiS View Renderers & Crafting Reagent Lookup
 * Extracted from js/modules/bis.js for modularity and <1,500-line headroom.
 */
(function () {
  'use strict';

  const escapeHtml = window.escapeHtml || (s => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'));

  let bisRecipesCache = null;

  function resetRecipeCache() {
    bisRecipesCache = null;
  }

  function getBiSRecipeCache() {
    if (bisRecipesCache && bisRecipesCache.byId.size > 0) return bisRecipesCache;
    bisRecipesCache = { byId: new Map(), byName: new Map() };
    const profData = window.WOW_PROFESSIONS_DATA;
    if (!profData) return bisRecipesCache;

    for (const profKey of Object.keys(profData)) {
      const prof = profData[profKey];
      if (prof && Array.isArray(prof.recipes)) {
        for (const r of prof.recipes) {
          if (r.id) bisRecipesCache.byId.set(String(r.id), r);
          if (r.name) bisRecipesCache.byName.set(r.name.toLowerCase().trim(), r);
        }
      }
    }
    return bisRecipesCache;
  }

  function getReagentIconUrl(icon) {
    if (!icon) return 'https://wow.zamimg.com/images/wow/icons/medium/inv_misc_questionmark.jpg';
    if (icon.startsWith('http://') || icon.startsWith('https://')) return icon;
    const clean = icon.replace(/\.(jpg|png|webp)$/i, '');
    return `https://wow.zamimg.com/images/wow/icons/medium/${clean}.jpg`;
  }

  function getItemReagents(item) {
    if (!item) return null;
    if (item.reagents && Array.isArray(item.reagents) && item.reagents.length > 0) {
      return item.reagents;
    }
    const cache = getBiSRecipeCache();
    const id = item.itemId || item.tipId;
    let recipe = null;
    if (id) recipe = cache.byId.get(String(id));
    if (!recipe && item.tipId && String(item.tipId).length > 6) {
      recipe = cache.byId.get(String(item.tipId).slice(0, 6));
    }
    if (!recipe && item.name) {
      const cleanName = item.name.replace(/\s+of\s+the\s+.*$/i, '').toLowerCase().trim();
      recipe = cache.byName.get(cleanName) || cache.byName.get(item.name.toLowerCase().trim());
    }
    if (recipe && Array.isArray(recipe.reagents) && recipe.reagents.length > 0) {
      return recipe.reagents;
    }
    return null;
  }

  function renderItemMatsHtml(item, fallbackMats) {
    const reagents = getItemReagents(item);
    if (reagents && reagents.length > 0) {
      return `
        <div class="bis-mats-pill">
          <span class="bis-mats-label">🔨 Mats:</span>
          <span class="bis-mats-chips">
            ${reagents.map(r => `
              <span class="bis-mat-chip"
                    data-mat-name="${escapeHtml(r.name)}"
                    data-mat-count="${r.count}"
                    data-mat-icon="${escapeHtml(r.icon || '')}"
                    data-mat-quality="${r.quality || 1}"
                    title="${r.count}x ${escapeHtml(r.name)}">
                <span class="bis-mat-count">${r.count}</span>
                <img src="${getReagentIconUrl(r.icon)}" alt="${escapeHtml(r.name)}" class="bis-mat-icon q${r.quality || 1}" loading="lazy" />
              </span>
            `).join('')}
          </span>
        </div>
      `;
    }
    if (fallbackMats) {
      return `<div class="bis-mats-pill">🔨 Mats: ${escapeHtml(fallbackMats)}</div>`;
    }
    return '';
  }

  function renderAvailPill(item) {
    if (!item || !item.avail) return '';
    if (item.avail === 'raid') return '<span class="bis-avail-pill raid" title="Comes from a Forever raid. Raids open December 9, 2026.">👑 Raid · Dec 9</span>';
    if (item.avail === 'unavailable') return '<span class="bis-avail-pill unavailable" title="Only drops in a Classic raid that is not in WoW Forever. Pick the next best item for this slot.">⛔ Not in Forever yet</span>';
    return '';
  }

  function renderSpecStatusNotice(spec, cls, isLvl60) {
    if (!isLvl60 || !spec || spec.status === 'listed') return '';
    const provider = spec.sourceUrl && spec.sourceUrl.includes('foreverdb.net') ? 'ForeverDB' : 'Wowhead';
    const link = spec.sourceUrl ? `<a href="${escapeHtml(spec.sourceUrl)}" target="_blank" rel="noopener">${provider}'s ${escapeHtml(spec.name)} ${escapeHtml(cls.name)} page</a>` : provider;
    const copy = {
      pending: ['⏳ List not published yet', `There's no level 60 list for ${escapeHtml(spec.name)} ${escapeHtml(cls.name)} yet. ${link} will be updated once max-level gear is finalized.`],
      partial: ['🧩 Partial list', `${link} currently lists only Phase 1 raid tier pieces (raids open December 9).`],
      placeholder: ['⚠️ Mostly gear that isn\'t in Forever', `${link} currently fills most slots with Classic raid loot not available in Forever.`],
    }[spec.status] || ['', ''];
    return `
      <div class="bis-status-notice ${spec.status}">
        <strong>${copy[0]}</strong>
        <p>${copy[1]}</p>
      </div>
    `;
  }

  function renderLevel60SidePanel(spec, cls) {
    const items = Object.values((spec.doll && spec.doll.alliance) || {});
    const count = k => items.filter(i => i.avail === k).length;
    const api = window.WOW_TALENT_BUILDS_60_API;
    const build = api && spec.talentSpecId ? api.getBuild(cls.id, spec.talentSpecId) : null;
    const keyTalents = build && build.keyTalents ? build.keyTalents.slice(0, 4).map(escapeHtml).join(', ') : '';
    const isForeverDb = !!(spec.sourceUrl && spec.sourceUrl.includes('foreverdb.net'));
    const providerName = isForeverDb ? 'ForeverDB' : 'Wowhead';

    return `
      <div class="bis-stats-card">
        <div class="bis-card-title-row">
          <h4><span>📊</span> What's in this list</h4>
        </div>
        <div class="bis-avail-summary">
          <div><span class="bis-avail-num">${count('available') + count('unknown')}</span><span>Can be earned now</span></div>
          <div><span class="bis-avail-num raid">${count('raid')}</span><span>Raid · Dec 9</span></div>
          <div><span class="bis-avail-num unavailable">${count('unavailable')}</span><span>Not in Forever yet</span></div>
        </div>
        <p class="bis-stat-disclaimer">Pre-raid level 60 list verified for build 1.60.1.71037. Tier 1 raids open December 9, 2026.</p>
      </div>

      <div class="bis-talents-card">
        <div class="bis-card-title-row">
          <h4><span>🌟</span> Popular Level 60 Talents</h4>
          <span class="bis-points-badge">${build ? build.split.join(' / ') : '51 Points'}</span>
        </div>
        <p class="bis-talents-desc">
          ${build ? `The most-used 51-point ${escapeHtml(build.name)} build${keyTalents ? `. Key talents: ${keyTalents}` : ''}.` : 'No popular level 60 build is recorded for this spec yet.'}
        </p>
        <div class="bis-talents-meta">
          <div class="bis-talent-actions" style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
            <button type="button" class="bis-talent-btn" id="btn-view-talent-tree" ${build ? '' : 'disabled'} title="Open the popular level 60 build in the talent calculator">
              <span>🌟</span> View Level 60 Build
            </button>
            <button type="button" class="bis-talent-btn bis-calc-blank-btn" id="btn-open-blank-calculator" title="Open empty talent trees to customize your own build from scratch">
              <span>⚡</span> Talent Calculator (Blank Slate)
            </button>
          </div>
        </div>
      </div>

      <div class="bis-info-card">
        <h4><span>💡</span> Where this list comes from</h4>
        <p>
          Items follow
          ${spec.sourceUrl ? `<a href="${escapeHtml(spec.sourceUrl)}" target="_blank" rel="noopener">${providerName}'s ${escapeHtml(spec.name)} ${escapeHtml(cls.name)} BiS page</a>` : `${providerName}'s BiS page`}${spec.sourceUpdated ? ` (updated ${escapeHtml(spec.sourceUpdated)})` : ''}.
          Drop sources are verified against ForeverDungeonJournal loot tables, ForeverDB, and Wowhead item pages.
        </p>
        <div class="bis-tip-item">
          <span>📅</span>
          <div><strong>Raids open December 9:</strong> Barrow Deeps (10), Hyjal Summit (20) and Onyxia's Lair (40). Expect these lists to change once raid loot is known.</div>
        </div>
      </div>
    `;
  }

  function renderLevel60ConsumablesNote(spec) {
    const isForeverDb = !!(spec && spec.sourceUrl && spec.sourceUrl.includes('foreverdb.net'));
    const url = spec && spec.sourceUrl
      ? (isForeverDb ? spec.sourceUrl : spec.sourceUrl.replace(/bis-gear(-\w+)?$/, ''))
      : 'https://foreverdb.net/bis';
    const provider = isForeverDb ? 'ForeverDB' : 'Wowhead';
    return `<p class="bis-empty-text" style="color: var(--text-muted); font-size: 0.85rem; padding: 1rem;">See full enchants &amp; pre-raid preparation on <a href="${escapeHtml(url)}" target="_blank" rel="noopener">${provider}'s ${escapeHtml(spec ? spec.name : '')} page</a>.</p>`;
  }

  function renderStatBudget(statSummary, faction) {
    if (!statSummary) return '<p class="bis-no-stats">Stats pending simulation.</p>';

    const stats = faction === 'alliance'
      ? (statSummary.alliance || statSummary.horde || {})
      : (statSummary.horde || statSummary.alliance || {});

    const hitNum = parseFloat(stats.hit) || 0;
    const agiNum = parseFloat(stats.agi) || 0;
    const intNum = parseFloat(stats.int) || 0;
    const spiNum = parseFloat(stats.spi) || 0;

    const hitCapStatus = hitNum >= 5 ? `${hitNum}% (Soft Cap Met)` : `${hitNum}% (5% Cap vs Lvl 32)`;
    const estCrit = stats.crit || (agiNum > 0 ? `${(4.5 + (agiNum / 20)).toFixed(1)}%` : (intNum > 0 ? `${(3.2 + (intNum / 59.5)).toFixed(1)}%` : null));
    const spiritTick = spiNum > 0 ? `${Math.round(15 + (spiNum / 5))} / 2s tick` : null;

    const statEntries = [
      { label: 'Health (HP)', val: stats.hp, icon: '❤️' },
      { label: 'Mana', val: stats.mana, icon: '💧' },
      { label: 'Armor', val: stats.armor, icon: '🛡️' },
      { label: 'Strength', val: stats.str, icon: '💪' },
      { label: 'Agility', val: stats.agi, icon: '🏹' },
      { label: 'Stamina', val: stats.sta, icon: '🩸' },
      { label: 'Intellect', val: stats.int, icon: '🧠' },
      { label: 'Spirit', val: stats.spi, icon: '✨' },
      { label: 'Attack Power', val: stats.ap, icon: '⚔️' },
      { label: 'Spell Power', val: stats.sp, icon: '🔥' },
      { label: 'Hit Rating', val: hitCapStatus, icon: '🎯' },
      { label: 'Crit Chance', val: estCrit, icon: '💥' },
      { label: 'Spirit 5SR Regen', val: spiritTick, icon: '🧪' },
      { label: 'Shadow Res', val: stats.shadowRes, icon: '🟣' },
      { label: 'Nature Res', val: stats.natureRes, icon: '🌿' },
      { label: 'Fire Res', val: stats.fireRes, icon: '🔥' },
      { label: 'Frost Res', val: stats.frostRes, icon: '❄️' },
      { label: 'Arcane Res', val: stats.arcaneRes, icon: '🔮' }
    ];

    const valid = statEntries.filter(s => s.val !== undefined && s.val !== null && s.val !== '');
    if (valid.length === 0) return '<p class="bis-no-stats">Stats pending simulation.</p>';

    return valid.map(s => `
      <div class="bis-stat-item">
        <span class="bis-stat-name"><span>${s.icon}</span> ${s.label}</span>
        <span class="bis-stat-value">${s.val}</span>
      </div>
    `).join('');
  }

  function renderSlotsAlternativesTable(spec, state) {
    if (!spec) return '';
    if (!spec.slots || spec.slots.length === 0) {
      return '<p class="bis-empty-text">No slot breakdowns available.</p>';
    }

    const faction = state.faction || 'alliance';

    return spec.slots.map(slot => {
      const slotId = slot.slotId;
      const slotName = slot.slotName;
      const items = slot.items || [];
      if (items.length === 0) return '';

      const factionItems = items.filter(i => i.side === 'both' || i.side === faction);
      const topItem = factionItems.length > 0 ? factionItems[0] : items[0];

      return `
        <div class="bis-slot-alt-group" data-slot-key="${slotId}">
          <div class="bis-alt-slot-heading">
            <div style="display: flex; align-items: center; gap: 0.6rem;">
              <span class="bis-alt-slot-tag">${escapeHtml(slotName)}</span>
              <span class="bis-slot-items-count">${items.length} Options</span>
            </div>
            <span class="bis-alt-bis-summary">
              Top ${faction === 'alliance' ? '<img src="images/icons/faction-alliance.jpg" class="bis-mini-faction-icon" alt="" onerror="this.src=\'https://render.worldofwarcraft.com/us/icons/56/achievement_pvp_a_a.jpg\'" /> Alliance' : '<img src="images/icons/faction-horde.jpg" class="bis-mini-faction-icon" alt="" onerror="this.src=\'https://render.worldofwarcraft.com/us/icons/56/achievement_pvp_h_h.jpg\'" /> Horde'} BiS: 
              <strong class="${topItem.quality || 'q2'}">${escapeHtml(topItem.name)}</strong>
            </span>
          </div>

          <div class="bis-alt-items-list">
            ${items.map(item => {
              const isRank1 = item.name === topItem.name;
              const rankLabel = isRank1 ? '#1 BiS' : `#${item.rank}`;
              const rankBadgeClass = isRank1 ? 'rank-1' : `rank-${item.rank}`;
              const iconUrl = item.icon && item.icon.startsWith('http')
                ? item.icon
                : `https://render.worldofwarcraft.com/us/icons/56/${item.icon || 'inv_misc_questionmark.jpg'}`;

              const matchesFaction = item.side === 'both' || item.side === faction;
              const mats = item.mats || '';
              const reagents = getItemReagents(item);
              const reagentsAttr = reagents ? escapeHtml(JSON.stringify(reagents)) : '';
              const matsHtml = renderItemMatsHtml(item, mats);

              const customKey = `${state.classId}_${state.specId}_${slotId}`;
              const customItem = state.customEquipped && state.customEquipped[customKey];
              const isEquipped = customItem ? (customItem.name === item.name) : isRank1;

              return `
                <div class="bis-alt-row ${isEquipped ? 'bis-rank-1' : ''} ${matchesFaction ? '' : 'bis-faction-mismatch'}"
                     data-item-name="${escapeHtml(item.name)}"
                     data-item-quality="${item.quality || 'q2'}"
                     data-item-stats="${escapeHtml(item.stats || '')}"
                     data-item-enchant=""
                     data-item-source="${escapeHtml(item.source || '')}"
                     data-item-slot="${escapeHtml(slotName)}"
                     data-item-tipid="${item.tipId || ''}"
                     data-item-id="${item.itemId || ''}"
                     data-item-side="${item.side || 'both'}"
                     data-item-mats="${escapeHtml(mats)}"
                     data-item-cat="${escapeHtml(item.cat || '')}"
                     data-item-avail="${escapeHtml(item.avail || '')}"
                     data-item-reagents="${reagentsAttr}">
                  <span class="bis-rank-badge ${rankBadgeClass}">${rankLabel}</span>
                  <img src="${iconUrl}" alt="${escapeHtml(item.name)}" class="bis-alt-icon ${item.quality || 'q2'}" loading="lazy" />
                  <div class="bis-alt-info">
                    <div style="display: flex; align-items: center; gap: 0.4rem; flex-wrap: wrap;">
                      <span class="bis-alt-name ${item.quality || 'q2'}">${escapeHtml(item.name)}</span>
                      ${item.side === 'alliance' ? `<span class="bis-side-pill alliance"><img src="images/icons/faction-alliance.jpg" class="bis-mini-faction-icon" alt="" onerror="this.src='https://render.worldofwarcraft.com/us/icons/56/achievement_pvp_a_a.jpg'" /> Alliance</span>` : ''}
                      ${item.side === 'horde' ? `<span class="bis-side-pill horde"><img src="images/icons/faction-horde.jpg" class="bis-mini-faction-icon" alt="" onerror="this.src='https://render.worldofwarcraft.com/us/icons/56/achievement_pvp_h_h.jpg'" /> Horde</span>` : ''}
                    </div>
                    <div style="display: flex; align-items: center; gap: 0.6rem; flex-wrap: wrap; margin-top: 0.15rem;">
                      ${item.stats ? `<span class="bis-alt-stats">${escapeHtml(item.stats)}</span>` : ''}
                      ${item.armor ? `<span class="bis-alt-stats" style="color: #94a3b8;">🛡️ ${item.armor} Armor</span>` : ''}
                      ${item.ilvl ? `<span class="bis-alt-stats" style="color: #ca8a04;">ilvl ${item.ilvl}</span>` : ''}
                    </div>
                  </div>
                  <div class="bis-alt-source" style="display: flex; flex-direction: column; gap: 0.35rem; align-items: flex-end;">
                    <div>📍 ${escapeHtml(item.source || 'Unknown')}</div>
                    ${renderAvailPill(item)}
                    ${matsHtml}
                    <button type="button" class="btn-bis-equip ${isEquipped ? 'is-equipped' : ''}" style="${isEquipped ? 'background: rgba(16, 185, 129, 0.2); border: 1px solid #10b981; color: #6ee7b7;' : 'background: rgba(255, 255, 255, 0.08); border: 1px solid rgba(255, 255, 255, 0.2); color: #cbd5e1;'} padding: 0.2rem 0.6rem; border-radius: 4px; font-size: 0.76rem; cursor: pointer;" onclick="event.stopPropagation(); equipBiSItem('${slotId}', '${escapeHtml(item.name).replace(/'/g, "\\'")}')">
                      ${isEquipped ? '✓ Equipped' : '⚡ Equip Item'}
                    </button>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      `;
    }).join('');
  }

  function renderEnchantsTable(enchants, className, specName) {
    if (typeof window.renderBisEnhancements === 'function' && className && specName) {
      return window.renderBisEnhancements(className, specName, enchants);
    }
    if (!enchants || enchants.length === 0) {
      return '<p class="bis-empty-text" style="color: var(--text-muted); font-size: 0.85rem; padding: 1rem;">No recommended enchants listed for this spec.</p>';
    }

    return enchants.map(ench => {
      const iconUrl = ench.icon && ench.icon.startsWith('http')
        ? ench.icon
        : `https://render.worldofwarcraft.com/us/icons/56/${ench.icon || 'trade_engraving.jpg'}`;

      return `
        <div class="bis-prep-item">
          <img src="${iconUrl}" alt="${escapeHtml(ench.slot || '')}" class="bis-prep-item-icon q2" loading="lazy" />
          <div class="bis-prep-item-main">
            <div class="bis-prep-item-title">
              <span class="bis-prep-category-tag">${escapeHtml(ench.slot || 'Gear')}</span>
              <span>${escapeHtml(ench.effect || ench.name || '')}</span>
            </div>
            <div class="bis-prep-item-source">📍 ${escapeHtml(ench.source || '')}</div>
            ${ench.materials ? `<div class="bis-prep-item-mats">🔮 Reagents: ${escapeHtml(ench.materials)}</div>` : ''}
          </div>
        </div>
      `;
    }).join('');
  }

  function renderConsumablesTable(consumables) {
    if (!consumables || consumables.length === 0) {
      return '<p class="bis-empty-text" style="color: var(--text-muted); font-size: 0.85rem; padding: 1rem;">No pre-fight consumables listed for this spec.</p>';
    }

    return consumables.map(item => {
      const iconUrl = item.icon && item.icon.startsWith('http')
        ? item.icon
        : `https://render.worldofwarcraft.com/us/icons/56/${item.icon || 'inv_potion_57.jpg'}`;

      return `
        <div class="bis-prep-item">
          <img src="${iconUrl}" alt="${escapeHtml(item.name || '')}" class="bis-prep-item-icon q2" loading="lazy" />
          <div class="bis-prep-item-main">
            <div class="bis-prep-item-title">
              <span class="bis-prep-category-tag">${escapeHtml(item.category || 'Buff')}</span>
              <span>${escapeHtml(item.name || '')}</span>
            </div>
            <div class="bis-prep-item-effect">✨ ${escapeHtml(item.effect || item.desc || '')}</div>
            ${item.source ? `<div class="bis-prep-item-source">📍 ${escapeHtml(item.source)}</div>` : ''}
            ${item.materials ? `<div class="bis-prep-item-mats">🧪 Reagents: ${escapeHtml(item.materials)}</div>` : ''}
          </div>
        </div>
      `;
    }).join('');
  }

  window.WOW_BIS_RENDERERS = {
    resetRecipeCache,
    getItemReagents,
    renderItemMatsHtml,
    renderAvailPill,
    renderSpecStatusNotice,
    renderLevel60SidePanel,
    renderLevel60ConsumablesNote,
    renderStatBudget,
    renderSlotsAlternativesTable,
    renderEnchantsTable,
    renderConsumablesTable
  };
})();
