/** Item lookups and markdown helpers shared by the guide builders in scripts/. */

const BIND_TEXT = { 1: 'Binds when picked up', 2: 'Binds when equipped', 3: 'Binds when used', 4: 'Quest Item', 5: 'Binds when picked up' };

export const esc = (s) => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
export const cell = (s) => String(s ?? '').replace(/\|/g, '/').replace(/\s+/g, ' ').trim();
export const itemUrl = (id) => `https://www.wowhead.com/forever/item=${id}`;
export const questUrl = (id) => `https://www.wowhead.com/forever/quest=${id}`;

/** Item id -> slot text ("Wrist, Plate") from ForeverDungeonJournal's loot tables. */
export function journalSlots(lua) {
  return new Map([...lua.matchAll(/[{] *([0-9]{4,6}), *"[^"]*", *"([^"]+)"/g)]
    .map(m => [Number(m[1]), m[2].replace(', ', ' · ')]));
}

/**
 * Returns itemInfo(id) for a loaded WOW_ITEM_DATABASE. About one item in five there has no slot ("Item");
 * with `slots` those fall back to the journal's slot, then to the database category.
 */
export function createItemInfo(DB, slots = null) {
  const catNames = new Map(DB.tree || []);
  const rows = new Map(DB.rows.map(r => [Number(r[0]), r]));
  return function itemInfo(id) {
    const r = rows.get(Number(id));
    if (!r) return null;
    const info = {
      id: Number(r[0]), name: r[1], q: Math.min(r[2], 5), ilvl: r[3], req: r[4],
      kind: DB.meta.kinds[r[6]] || 'Item', icon: r[7] >= 0 ? DB.meta.icons[r[7]] : 'inv_misc_questionmark',
      bind: r[8], isNew: (r[10] & 1) !== 0, stats: r[14] || ''
    };
    if (slots && info.kind === 'Item') info.kind = slots.get(info.id) || catNames.get(DB.meta.cats[r[5]]) || info.kind;
    return info;
  };
}

export function buildTooltip(i) {
  const lines = [
    `<b class="q${i.q}">${esc(i.name)}</b>`,
    `<span class="q">Item Level ${i.ilvl}</span>`,
    BIND_TEXT[i.bind] ? esc(BIND_TEXT[i.bind]) : '',
    esc(i.kind),
    ...String(i.stats).split(' · ').filter(Boolean).map(s => `<span class="q2">${esc(s)}</span>`),
    i.req ? `Requires Level ${i.req}` : '',
    i.isNew ? '<span class="q2">✦ New in WoW Forever</span>' : ''
  ].filter(Boolean);
  return `<table><tr><td>${lines.join('<br>')}</td></tr></table>`;
}

/** Map of item id -> itemInfo, to the shape WOW_DUNGEON_LOOT_TOOLTIPS uses. */
export function tooltipRecords(tooltips) {
  return Object.fromEntries(Object.values(tooltips).map(i => [String(i.id), {
    id: i.id, name: i.name, quality: `q${i.q}`, qualityNum: i.q, icon: i.icon, iLvl: i.ilvl,
    slot: i.kind, statSummary: i.stats, htmlTooltip: buildTooltip(i)
  }]));
}

/** The browser script that registers generated guides and their item tooltips. */
export function guideBundle({ header, globalName, guides, tooltips, dungeon = false }) {
  return `/**
${header.map(l => ` * ${l}`).join('\n')}
 */
(function () {
  'use strict';
  if (typeof window === 'undefined') return;
  const GUIDES = ${JSON.stringify(guides, null, 2)};
  const TOOLTIPS = ${JSON.stringify(tooltipRecords(tooltips))};

  // Keep any hand-curated tooltip that already exists for an item.
  window.WOW_DUNGEON_LOOT_TOOLTIPS = Object.assign({}, TOOLTIPS, window.WOW_DUNGEON_LOOT_TOOLTIPS || {});

  const ids = new Set(GUIDES.map(g => g.id));
  window.${globalName} = GUIDES;
${dungeon ? '  window.WOW_DUNGEON_GUIDES = (window.WOW_DUNGEON_GUIDES || []).filter(g => !ids.has(g.id)).concat(GUIDES);\n' : ''}  if (window.WOW_TOOLS_DATA) {
    window.WOW_TOOLS_DATA.guides = (window.WOW_TOOLS_DATA.guides || []).filter(g => !ids.has(g.id)).concat(GUIDES);
  }
})();
`;
}
