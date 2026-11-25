/**
 * World of Warcraft: Forever - Dungeon encounter and loot pop-up
 * New dungeons use js/data/codex-dungeons-data.js (generated); older instances use the client export;
 * unreleased raids show boss names only.
 */
(function () {
  'use strict';

  const CLASSIC_SLUGS = {
    'c-rfc': 'ragefire-chasm', 'c-dm': 'deadmines', 'c-wc': 'wailing-caverns', 'c-sfk': 'shadowfang-keep',
    'c-bfd': 'blackfathom-deeps', 'c-stocks': 'stormwind-stockade', 'c-gnomer': 'gnomeregan', 'c-rfk': 'razorfen-kraul',
    'c-sm': 'scarlet-monastery', 'c-rfd': 'razorfen-downs', 'c-ulda': 'uldaman', 'c-zf': 'zul-farrak', 'c-mara': 'maraudon',
    'c-st': 'sunken-temple', 'c-brd': 'blackrock-depths', 'c-lbrs': 'blackrock-spire', 'c-ubrs': 'blackrock-spire',
    'c-scholo': 'scholomance', 'c-strat': 'stratholme', 'c-dm-all': 'dire-maul',
    'onyxia-s-lair': 'raid-03'
  };

  let itemRows = null;

  /** Name, quality, level and stats from the item database, when that bundle has loaded. */
  function itemFromDatabase(id) {
    const db = window.WOW_ITEM_DATABASE;
    if (!db) return null;
    if (!itemRows) itemRows = new Map(db.rows.map(r => [Number(r[0]), r]));
    const r = itemRows.get(Number(id));
    if (!r) return null;
    return { quality: `q${Math.min(r[2], 5)}`, iLvl: r[3] > 1 ? r[3] : 0, slot: db.meta.kinds[r[6]] || '', stats: r[14] || '' };
  }

  function findNewDungeon(key) {
    const all = window.WOW_CODEX_DUNGEONS || {};
    if (all[key]) return all[key];
    const clean = String(key).replace(/^the-/, '').replace(/-wetlands$/, '');
    return Object.values(all).find(d => d.slug.replace(/^the-/, '') === clean) || null;
  }

  function findInstance(key) {
    const q = String(key).toLowerCase();
    return (window.WOW_FOREVER_INSTANCES_DATA || []).find(d => d.slug === q || String(d.id) === q || d.name.toLowerCase() === q) || null;
  }

  /** Everything the pop-up shows, from whichever source covers this instance. Null when nothing does. */
  function getDungeonView(dungeonId) {
    const key = CLASSIC_SLUGS[dungeonId] || dungeonId;
    const card = (window.WOW_FOREVER_DATA?.dungeonsAndRaids || []).find(d => d.id === key) || null;
    const fresh = findNewDungeon(key);
    if (fresh) {
      return {
        name: fresh.name, levelRange: fresh.levels.join('–'), zone: fresh.zone, entrance: fresh.entrance || '',
        source: fresh.source, guideId: fresh.guideId, bosses: fresh.bosses, shared: fresh.trash, sharedLabel: 'Trash drops',
        expanded: window.WOW_ATLAS_DATA?.expandedDungeons?.[fresh.slug] || null, note: ''
      };
    }
    if (card) {
      return {
        name: card.name, levelRange: card.levelRange, zone: card.zone, entrance: '', guideId: '',
        source: 'Boss names only', bosses: card.bosses.map(name => ({ name, drops: [] })), shared: [], sharedLabel: '', expanded: null,
        note: card.type.includes('Raid') ? 'This raid opens December 9, 2026. Blizzard has not published its loot, so none is listed yet.' : ''
      };
    }
    const inst = findInstance(key);
    if (!inst) return null;
    const drop = (l) => ({ id: l.itemId, name: l.name, quality: 'q1', iLvl: 0, slot: '', stats: '', ...itemFromDatabase(l.itemId) });
    const loot = inst.loot || [];
    const orders = new Set((inst.bosses || []).map(b => b.order));
    return {
      name: inst.name, levelRange: inst.levelDisplay, zone: inst.zone, entrance: inst.entrance || '', guideId: '',
      source: `Client data${window.WOW_EVENTS_DATA?.meta?.build ? `, build ${window.WOW_EVENTS_DATA.meta.build}` : ''}`,
      bosses: (inst.bosses || []).map(b => ({ name: b.name, drops: loot.filter(l => l.bossOrder === b.order).map(drop) })),
      // Order 0 means the client lists the item for the instance, not for a boss.
      shared: loot.filter(l => !orders.has(l.bossOrder)).map(drop),
      sharedLabel: 'Other drops in this instance (no boss listed)', expanded: null,
      note: loot.length ? '' : 'No loot is recorded for this instance yet.'
    };
  }

  function lootCard(item) {
    const e = escapeHtml;
    return `
      <div class="dg-loot-item-card" data-item-id="${item.id || ''}" data-item-name="${e(item.name)}" data-item-quality="${e(item.quality)}" data-item-ilvl="${item.iLvl || ''}" data-item-slot="${e(item.slot || '')}" data-item-stats="${e(item.stats || '')}">
        <div class="dg-loot-item-top">
          <strong class="dg-loot-name ${item.quality}">${e(item.name)}</strong>
          ${item.iLvl ? `<span class="dg-loot-ilvl">iLvl ${item.iLvl}</span>` : ''}
        </div>
        <div class="dg-loot-slot">${e(item.slot || '')}</div>
        <p class="dg-loot-stats">${e(item.stats || '')}</p>
      </div>`;
  }

  function lootHtml(view) {
    const e = escapeHtml;
    const hasLoot = view.bosses.some(b => b.drops.length);
    return `
      <div class="dg-modal-boss-list">
        ${view.note ? `<p style="color: #fcd34d; font-size: 0.85rem;">${e(view.note)}</p>` : ''}
        ${view.bosses.map(b => `
          <div class="dg-boss-block">
            <div class="dg-boss-name-row">
              <h4>${e(b.name)}</h4>
              ${hasLoot ? `<span class="dg-boss-title">${b.drops.length ? `${b.drops.length} drop${b.drops.length === 1 ? '' : 's'}` : 'No drops recorded'}</span>` : ''}
            </div>
            ${b.drops.length ? `<div class="dg-loot-table-grid">${b.drops.map(lootCard).join('')}</div>` : ''}
          </div>`).join('')}
        ${view.shared.length ? `
          <details class="dg-boss-block">
            <summary style="cursor: pointer; color: var(--text-gold); font-weight: 700;">${e(view.sharedLabel)} (${view.shared.length})</summary>
            <div class="dg-loot-table-grid" style="margin-top: 0.75rem;">${view.shared.map(lootCard).join('')}</div>
          </details>` : ''}
      </div>`;
  }

  function tacticsHtml(bosses) {
    const e = escapeHtml;
    return `
      <div class="dg-tactics-list">
        ${bosses.map(boss => `
          <div class="dg-tactics-card">
            <div class="dg-tactics-boss-header">
              ${boss.portrait ? `<img src="${boss.portrait}" class="dg-boss-portrait" alt="${e(boss.name)}" onerror="this.style.display='none'">` : ''}
              <div>
                <h3 class="dg-tactics-boss-name">${e(boss.name)} <span class="dg-boss-lvl">Lvl ${boss.level || '?'}</span></h3>
                <p class="dg-tactics-summary">${e(boss.roleSummary || boss.mechanics || '')}</p>
              </div>
            </div>
            ${boss.abilities && boss.abilities.length > 0 ? `
              <div class="dg-abilities-list">
                <h4 class="dg-abilities-header">Encounter Mechanics &amp; Role Assignments</h4>
                ${boss.abilities.map(ab => `
                  <div class="dg-ability-item">
                    <div class="dg-ability-top">
                      <strong class="dg-ability-name">${e(ab.name)}</strong>
                      <span class="role-badge role-${ab.role.toLowerCase().replace(/[^a-z0-9]/g, '')}">[${e(ab.role)}]</span>
                      <span class="ability-type-badge">${e(ab.type)}</span>
                    </div>
                    <p class="dg-ability-desc">${e(ab.desc)}</p>
                  </div>`).join('')}
              </div>` : ''}
          </div>`).join('')}
      </div>`;
  }

  function questsHtml(quests) {
    const e = escapeHtml;
    return `
      <div class="dg-quests-list">
        ${quests.map(q => `
          <div class="dg-quest-card">
            <div class="dg-quest-top">
              <div class="dg-quest-title-wrap"><span class="dg-quest-icon">📜</span><strong class="dg-quest-name">${e(q.name)}</strong></div>
              <span class="quest-faction-badge faction-${q.faction.toLowerCase()}">${e(q.faction)}</span>
            </div>
            <div class="dg-quest-meta">
              <span>Level Req: <strong>${q.levelReq}+</strong></span>
              <span>Reward XP: <strong style="color: #60a5fa;">${e(q.xp)}</strong></span>
            </div>
            <div class="dg-quest-giver"><strong>Quest Giver / Location:</strong> <span>${e(q.source)}</span></div>
            <div class="dg-quest-rewards"><strong>Rewards:</strong> <span>${e(q.rewards)}</span></div>
          </div>`).join('')}
      </div>`;
  }

  function bindTooltips(body) {
    body.querySelectorAll('.dg-loot-item-card').forEach(card => {
      card.addEventListener('mouseenter', (ev) => {
        if (typeof window.showCodexItemTooltipById !== 'function') return;
        const get = (k) => card.getAttribute(`data-item-${k}`) || '';
        window.showCodexItemTooltipById(ev, get('id'), get('name'), {
          id: get('id'), name: get('name'), quality: get('quality') || 'q3', iLvl: get('ilvl'), slot: get('slot'), stats: get('stats')
        });
      });
      card.addEventListener('mousemove', (ev) => {
        const tooltip = document.getElementById('wow-item-tooltip');
        if (tooltip && !tooltip.hasAttribute('hidden') && typeof window.positionTooltip === 'function') window.positionTooltip(ev, tooltip);
      });
      card.addEventListener('mouseleave', () => {
        if (typeof window.hideCodexItemTooltip === 'function') window.hideCodexItemTooltip();
      });
    });
  }

  function closeModal(modal) {
    modal.classList.remove('is-open', 'open');
    modal.setAttribute('hidden', '');
    if (typeof window.hideCodexItemTooltip === 'function') window.hideCodexItemTooltip();
  }

  function render(body, view, dungeonId) {
    const e = escapeHtml;
    const quests = view.expanded?.quests || [];
    const tactics = view.expanded?.bosses || [];
    const entrance = view.entrance || view.expanded?.entrance || '';
    const loot = lootHtml(view);
    body.setAttribute('data-dungeon-id', dungeonId);
    body.innerHTML = `
      <div class="dg-modal-header">
        <span class="dungeon-level-badge">${e(view.levelRange)}</span>
        <h2 class="dg-modal-title">${e(view.name)}</h2>
        <p class="dg-modal-zone">📍 ${e(view.zone)}</p>
        ${entrance ? `<div class="dg-modal-entrance"><strong>Entrance Route:</strong> <span>${e(entrance)}</span></div>` : ''}
        <div class="dg-modal-meta-row">
          <span>Bosses: <strong>${view.bosses.filter(b => !b.rare).length}</strong></span>
          ${quests.length ? `<span>Quests: <strong>${quests.length}</strong></span>` : ''}
          <span style="color: var(--text-muted);">Source: ${e(view.source)}</span>
          ${view.guideId ? `<a href="#guides/${e(view.guideId)}" data-dg-guide style="color: #38bdf8;">Open full guide ➔</a>` : ''}
        </div>
      </div>
      ${view.expanded ? `
        <div class="dg-modal-tabs">
          <button class="dg-modal-tab-btn active" data-dgtab="tactics">⚔️ Boss Tactics &amp; Abilities</button>
          <button class="dg-modal-tab-btn" data-dgtab="loot">🎁 Loot Tables</button>
          ${quests.length ? `<button class="dg-modal-tab-btn" data-dgtab="quests">📜 Pre-Dungeon Quests (${quests.length})</button>` : ''}
        </div>
        <div id="dg-tab-tactics" class="dg-modal-tab-pane active">${tacticsHtml(tactics)}</div>
        <div id="dg-tab-loot" class="dg-modal-tab-pane" hidden>${loot}</div>
        ${quests.length ? `<div id="dg-tab-quests" class="dg-modal-tab-pane" hidden>${questsHtml(quests)}</div>` : ''}
      ` : loot}
    `;
    bindTooltips(body);
    const tabs = body.querySelectorAll('.dg-modal-tab-btn');
    tabs.forEach(btn => btn.addEventListener('click', () => {
      tabs.forEach(b => b.classList.toggle('active', b === btn));
      body.querySelectorAll('.dg-modal-tab-pane').forEach(pane => {
        const on = pane.id === `dg-tab-${btn.getAttribute('data-dgtab')}`;
        pane.classList.toggle('active', on);
        pane.toggleAttribute('hidden', !on);
      });
    }));
    const guideLink = body.querySelector('[data-dg-guide]');
    if (guideLink) {
      guideLink.addEventListener('click', (ev) => {
        ev.preventDefault();
        closeModal(document.getElementById('boss-loot-modal'));
        if (typeof window.navigateToGuide === 'function') window.navigateToGuide(view.guideId);
      });
    }
  }

  window.openDungeonLootModal = function (dungeonId) {
    const modal = document.getElementById('boss-loot-modal');
    const body = document.getElementById('boss-loot-modal-content');
    if (!modal || !body) return;
    const view = getDungeonView(dungeonId);
    if (view) {
      render(body, view, dungeonId);
      // The client export only has names; fill in stats once the item database arrives.
      if (!window.WOW_ITEM_DATABASE && window.WOW_DATA_LOADER) {
        window.WOW_DATA_LOADER.ensure('database').then(() => {
          const stillOpen = modal.classList.contains('is-open') && body.getAttribute('data-dungeon-id') === String(dungeonId);
          if (stillOpen && !view.expanded) render(body, getDungeonView(dungeonId), dungeonId);
        }).catch(() => {});
      }
    } else {
      body.innerHTML = '<div style="padding: 1.5rem; text-align: center;"><h3>No data for this instance yet</h3></div>';
    }
    modal.removeAttribute('hidden');
    modal.classList.add('open', 'is-open');
  };

  window.setupDungeonModalEvents = function () {
    const modal = document.getElementById('boss-loot-modal');
    if (!modal) return;
    const closeBtn = document.getElementById('boss-loot-close');
    if (closeBtn) closeBtn.addEventListener('click', () => closeModal(modal));
    modal.addEventListener('click', (ev) => { if (ev.target === modal) closeModal(modal); });
  };

  window.WOW_CODEX_DUNGEON_MODAL = { getDungeonView };
})();
