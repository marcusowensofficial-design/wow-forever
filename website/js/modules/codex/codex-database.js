/**
 * World of Warcraft: Forever - Complete Item Database (22,493 Items)
 * Interactive search, category/slot/rarity/class/level/dungeon filtering,
 * vendor/AH price display, and boss drop source attribution.
 */
(function () {
  'use strict';

  const BIND_MAP = { 0: '', 1: 'BoP', 2: 'BoE', 3: 'BoU', 4: 'BoP', 5: 'BoP' };
  const Q_COLORS = {
    0: '#9d9d9d',
    1: '#f8fafc',
    2: '#1eff00',
    3: '#0070dd',
    4: '#a335ee',
    5: '#ff8000'
  };
  const Q_NAMES = ['Poor', 'Common', 'Uncommon', 'Rare', 'Epic', 'Legendary'];
  const ALIAS = { intellect: 'int', strength: 'str', agility: 'agi', stamina: 'sta', spirit: 'spi' };

  let state = {
    q: '',
    cat: 'all',
    cls: -1,
    minQuality: 0,
    bind: '',
    inst: '',
    onlyNew: false,
    onlyDrops: false,
    minLvl: 1,
    maxLvl: 60,
    sort: 'new',
    dir: -1,
    shown: 50
  };

  let indexCache = null;
  let filteredIndices = [];

  function formatCopper(copper) {
    const c = Math.round(Number(copper) || 0);
    if (c <= 0) return '—';
    const g = Math.floor(c / 10000);
    const s = Math.floor((c % 10000) / 100);
    const k = c % 100;
    if (g > 0) return `${g.toLocaleString('en-US')}g${s > 0 ? ` ${s}s` : ''}`;
    if (s > 0) return `${s}s${k > 0 ? ` ${k}c` : ''}`;
    return `${k}c`;
  }

  function esc(str) {
    return String(str == null ? '' : str).replace(/[&<>"']/g, (ch) => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    }[ch]));
  }

  function ensureIndex() {
    if (indexCache) return indexCache;
    const db = window.WOW_ITEM_DATABASE;
    if (!db || !Array.isArray(db.rows)) return null;

    const rows = db.rows;
    const meta = db.meta;
    const n = rows.length;
    const hay = new Array(n);
    const idToRow = new Map();
    const nameToRow = new Map();
    const inst = meta.inst || {};
    const src = meta.src || [];
    const kinds = meta.kinds || [];

    for (let i = 0; i < n; i++) {
      const r = rows[i];
      idToRow.set(Number(r[0]), i);
      if (r[1]) {
        const lower = String(r[1]).toLowerCase();
        if (!nameToRow.has(lower)) nameToRow.set(lower, i);
      }
      const sList = r[13] || [];
      const srcNames = sList.map((k) => {
        const pair = src[k];
        return pair ? `${inst[pair[0]] || ''} ${pair[1]}` : '';
      }).join(' ');
      hay[i] = `${r[1]} ${kinds[r[6]] || ''} ${r[14] || ''} ${srcNames}`.toLowerCase();
    }

    indexCache = { db, rows, meta, n, hay, idToRow, nameToRow };
    return indexCache;
  }

  const BIND_TEXT = {
    0: '',
    1: 'Binds when picked up',
    2: 'Binds when equipped',
    3: 'Binds when used',
    4: 'Quest Item',
    5: 'Quest Item'
  };

  let richLookupCache = null;

  function ensureRichLookup() {
    if (richLookupCache) return richLookupCache;
    const byId = new Map();
    const byName = new Map();
    const cdlById = new Map();
    const recipeById = new Map();
    const recipeByName = new Map();

    const registerItem = (it) => {
      if (!it) return;
      const id = Number(it.itemId || it.id || it.tipId);
      if (id > 0) {
        const ex = byId.get(id);
        if (!ex || (!ex.lines && it.lines) || (!ex.stats && it.stats)) {
          byId.set(id, it);
        }
      }
      if (it.name) {
        const k = String(it.name).toLowerCase().trim();
        const ex = byName.get(k);
        if (!ex || (!ex.lines && it.lines) || (!ex.stats && it.stats)) {
          byName.set(k, it);
        }
      }
    };

    if (window.WOW_PROGRESSION_DATA) {
      const colls = [
        window.WOW_PROGRESSION_DATA.weapons,
        window.WOW_PROGRESSION_DATA.wands,
        window.WOW_PROGRESSION_DATA.offhands
      ];
      for (const coll of colls) {
        if (!coll) continue;
        for (const cKey of Object.keys(coll)) {
          const cData = coll[cKey];
          const sets = [
            cData.levels,
            cData.healingLevels,
            ...(Object.values(cData.tracksData || {}))
          ].filter(Boolean);
          for (const set of sets) {
            for (const step of set) {
              registerItem(step);
              for (const alt of step.alts || []) registerItem(alt);
            }
          }
        }
      }
    }

    if (window.WOW_BIS_DATA) {
      const classes = window.WOW_BIS_DATA.classes || [];
      for (const cls of classes) {
        const cd = window.WOW_BIS_DATA[cls.id];
        if (!cd) continue;
        for (const sp of cd.specs || []) {
          for (const sl of sp.slots || []) {
            for (const it of sl.items || []) registerItem(it);
          }
        }
      }
    }

    if (window.WOW_CLASSIC_DUNGEON_LOOT) {
      for (const dg of Object.values(window.WOW_CLASSIC_DUNGEON_LOOT)) {
        for (const boss of dg?.bosses || []) {
          for (const loot of boss?.loot || []) {
            if (loot?.id && !cdlById.has(Number(loot.id))) {
              cdlById.set(Number(loot.id), loot);
            }
          }
        }
      }
    }

    if (window.WOW_PROFESSIONS_DATA) {
      for (const prof of Object.values(window.WOW_PROFESSIONS_DATA)) {
        if (!prof || typeof prof !== 'object') continue;
        const lists = [prof.recipes, prof.favor?.recipes].filter(Array.isArray);
        for (const list of lists) {
          for (const rec of list) {
            if (!rec) continue;
            const rid = Number(rec.itemId || rec.id);
            if (rid > 0 && !recipeById.has(rid)) recipeById.set(rid, rec);
            if (rec.name) {
              const rk = String(rec.name).toLowerCase().trim();
              if (!recipeByName.has(rk)) recipeByName.set(rk, rec);
            }
          }
        }
      }
    }

    richLookupCache = { byId, byName, cdlById, recipeById, recipeByName };
    return richLookupCache;
  }

  function parseDbStats(statsStr) {
    const primary = [];
    const equip = [];
    let dps = '';
    if (!statsStr) return { primary, equip, dps };

    const STAT_NAMES = {
      Str: 'Strength',
      Agi: 'Agility',
      Sta: 'Stamina',
      Int: 'Intellect',
      Spi: 'Spirit'
    };

    const tokens = String(statsStr).split(' · ').map((t) => t.trim()).filter(Boolean);
    for (const tok of tokens) {
      const dpsMatch = tok.match(/^([\d.]+)\s*dps$/i);
      if (dpsMatch) {
        dps = dpsMatch[1];
        continue;
      }
      const primMatch = tok.match(/^\+(\d+)\s+(Str|Agi|Sta|Int|Spi)$/);
      if (primMatch) {
        primary.push(`+${primMatch[1]} ${STAT_NAMES[primMatch[2]]}`);
        continue;
      }
      if (/^chance on hit$/i.test(tok)) {
        equip.push('Chance on hit: Triggers a weapon proc on melee or ranged strike.');
        continue;
      }
      const apMatch = tok.match(/^\+(\d+)\s+AP$/i);
      if (apMatch) {
        equip.push(`Equip: +${apMatch[1]} Attack Power.`);
        continue;
      }
      const rapMatch = tok.match(/^\+(\d+)\s+Ranged AP$/i);
      if (rapMatch) {
        equip.push(`Equip: +${rapMatch[1]} Ranged Attack Power.`);
        continue;
      }
      const fapMatch = tok.match(/^\+(\d+)\s+Feral AP$/i);
      if (fapMatch) {
        equip.push(`Equip: +${fapMatch[1]} Attack Power in Cat, Bear, and Dire Bear forms only.`);
        continue;
      }
      const critMatch = tok.match(/^\+([\d.]+)%\s+Crit$/i);
      if (critMatch) {
        equip.push(`Equip: Improves your chance to get a critical strike by ${critMatch[1]}%.`);
        continue;
      }
      const hitMatch = tok.match(/^\+([\d.]+)%\s+Hit$/i);
      if (hitMatch) {
        equip.push(`Equip: Improves your chance to hit by ${hitMatch[1]}%.`);
        continue;
      }
      const defMatch = tok.match(/^\+(\d+)\s+Defense$/i);
      if (defMatch) {
        equip.push(`Equip: Increased Defense +${defMatch[1]}.`);
        continue;
      }
      const dodgeMatch = tok.match(/^\+([\d.]+)%\s+Dodge$/i);
      if (dodgeMatch) {
        equip.push(`Equip: Increases your chance to dodge an attack by ${dodgeMatch[1]}%.`);
        continue;
      }
      const parryMatch = tok.match(/^\+([\d.]+)%\s+Parry$/i);
      if (parryMatch) {
        equip.push(`Equip: Increases your chance to parry an attack by ${parryMatch[1]}%.`);
        continue;
      }
      const blockMatch = tok.match(/^\+([\d.]+)%\s+Block$/i);
      if (blockMatch) {
        equip.push(`Equip: Increases your chance to block attacks with a shield by ${blockMatch[1]}%.`);
        continue;
      }
      const expMatch = tok.match(/^\+([\d.]+)%\s+Expertise$/i);
      if (expMatch) {
        equip.push(`Equip: Increases your expertise by ${expMatch[1]}%.`);
        continue;
      }
      const hasteMatch = tok.match(/^\+([\d.]+)%\s+Haste$/i);
      if (hasteMatch) {
        equip.push(`Equip: Increases your attack and casting speed by ${hasteMatch[1]}%.`);
        continue;
      }
      const spMatch = tok.match(/^\+(\d+)\s+Spell$/i);
      if (spMatch) {
        equip.push(`Equip: Increases damage and healing done by magical spells and effects by up to ${spMatch[1]}.`);
        continue;
      }
      const healMatch = tok.match(/^\+(\d+)\s+Healing$/i);
      if (healMatch) {
        equip.push(`Equip: Increases healing done by spells and effects by up to ${healMatch[1]}.`);
        continue;
      }
      const schoolMatch = tok.match(/^\+(\d+)\s+([A-Za-z]+)\s+spell damage$/i);
      if (schoolMatch) {
        equip.push(`Equip: Increases damage done by ${schoolMatch[2]} spells and effects by up to ${schoolMatch[1]}.`);
        continue;
      }
      const mp5Match = tok.match(/^\+(\d+)\s+Mp5$/i);
      if (mp5Match) {
        equip.push(`Equip: Restores ${mp5Match[1]} mana per 5 sec.`);
        continue;
      }
      equip.push(`Equip: ${tok}`);
    }

    return { primary, equip, dps };
  }

  function buildCodexItemTooltipHtml(rowIdx, fallbackItem = null) {
    const idx = ensureIndex();
    const rich = ensureRichLookup();
    if (!idx && !fallbackItem) return '';

    const r = (idx && rowIdx != null && rowIdx >= 0 && idx.rows[rowIdx]) ? idx.rows[rowIdx] : null;
    const meta = idx?.meta || {};
    const db = idx?.db || {};

    const id = r ? r[0] : Number(fallbackItem?.id || 0);
    const name = r ? r[1] : (fallbackItem?.name || 'Item');
    const q = r ? Math.min(r[2], 5) : Number(String(fallbackItem?.quality || 'q3').replace(/\D/g, '') || 3);
    const ilvl = r ? r[3] : (Number(String(fallbackItem?.iLvl || '').replace(/\D/g, '')) || 0);
    const req = r ? r[4] : 0;
    const kind = r ? ((meta.kinds && meta.kinds[r[6]]) || 'Item') : (fallbackItem?.slot || 'Equipment');
    const iconName = r && r[7] >= 0 && meta.icons && meta.icons[r[7]]
      ? meta.icons[r[7]]
      : (rich.cdlById.get(id)?.icon || 'inv_misc_questionmark');
    const bindText = r ? (BIND_TEXT[r[8]] ?? 'Binds when picked up') : 'Binds when picked up';
    const sell = r ? (r[9] || 0) : 0;
    const isNew = r ? (r[10] & 1) !== 0 : false;
    const classMask = r ? (r[4] >= 40 ? r[12] : r[11]) : 511;
    const sList = r ? (r[13] || []) : [];
    const rawStats = r ? (r[14] || '') : (fallbackItem?.stats || '');

    const curatedTip = window.WOW_DUNGEON_LOOT_TOOLTIPS?.[id];
    const richItem = rich.byId.get(id) || (name ? rich.byName.get(String(name).toLowerCase().trim()) : null);
    const cdlItem = rich.cdlById.get(id);
    const recipeItem = rich.recipeById.get(id) || (name ? rich.recipeByName.get(String(name).toLowerCase().trim()) : null);
    const reagentInfo = window.WOW_REAGENT_SOURCES?.[id];
    const marketEntry = window.WOW_MARKET_SCAN_DATA?.prices?.[id];

    // Drop sources list
    const dropSources = [];
    if (sList.length > 0 && meta.src) {
      const seen = new Set();
      for (let k = 0; k < sList.length; k++) {
        const pair = meta.src[sList[k]];
        if (!pair) continue;
        const instName = (meta.inst && meta.inst[pair[0]]) || pair[0];
        const label = `${pair[1]} — ${instName}`;
        if (!seen.has(label)) {
          seen.add(label);
          dropSources.push(label);
        }
      }
    }

    // Header block (icon + item name + badges)
    let html = `
      <div style="display:flex;align-items:flex-start;gap:0.65rem;margin-bottom:0.45rem;">
        <img src="https://wow.zamimg.com/images/wow/icons/medium/${esc(iconName)}.jpg"
             alt="" width="38" height="38"
             style="border-radius:5px;border:1.5px solid ${Q_COLORS[q]};background:#0f172a;flex-shrink:0;box-shadow:0 0 8px rgba(0,0,0,0.6);"
             onerror="this.src='https://wow.zamimg.com/images/wow/icons/medium/inv_misc_questionmark.jpg'">
        <div style="min-width:0;flex:1;">
          <div style="color:${Q_COLORS[q]};font-weight:700;font-size:0.98rem;line-height:1.25;">${esc(name)}</div>
          <div style="display:flex;align-items:center;gap:0.4rem;flex-wrap:wrap;margin-top:0.18rem;">
            ${ilvl ? `<span style="color:#facc15;font-size:0.76rem;font-weight:600;">Item Level ${ilvl}</span>` : ''}
            <span style="color:#64748b;font-size:0.72rem;">#${id}</span>
            ${isNew ? '<span style="background:rgba(16,185,129,0.2);color:#34d399;border:1px solid rgba(16,185,129,0.4);padding:0.03rem 0.35rem;border-radius:4px;font-size:0.64rem;font-weight:800;">✦ NEW IN FOREVER</span>' : ''}
          </div>
        </div>
      </div>
    `;

    // Case 1: Full Blizzard HTML tooltip available in WOW_DUNGEON_LOOT_TOOLTIPS
    if (curatedTip && curatedTip.htmlTooltip) {
      html += `<div class="dungeon-tip-body" style="border-top:1px solid rgba(255,255,255,0.08);padding-top:0.4rem;">${curatedTip.htmlTooltip}</div>`;
    } else if (richItem && Array.isArray(richItem.lines) && richItem.lines.length > 0) {
      // Case 2: Rich progression / BiS item with full lines array
      html += `<div class="wow-tip-lines" style="border-top:1px solid rgba(255,255,255,0.08);padding-top:0.35rem;">`;
      for (const rawLine of richItem.lines) {
        const trimmed = String(rawLine || '').trim();
        if (!trimmed || trimmed === name || trimmed.startsWith('Item Level')) continue;
        if (trimmed.includes('\t')) {
          const [left, right] = trimmed.split('\t');
          html += `<div class="wow-tip-type-row"><span>${esc(left)}</span><span>${esc(right)}</span></div>`;
        } else if (trimmed.startsWith('Binds when') || trimmed === 'Quest Item' || trimmed.startsWith('Unique')) {
          html += `<div class="wow-tip-bind">${esc(trimmed)}</div>`;
        } else if (trimmed.startsWith('(') && trimmed.toLowerCase().includes('damage per second')) {
          html += `<div class="wow-tip-dps">${esc(trimmed)}</div>`;
        } else if (trimmed.startsWith('Equip:') || trimmed.startsWith('Use:') || trimmed.startsWith('Chance on hit:')) {
          html += `<div class="wow-tip-equip">${esc(trimmed)}</div>`;
        } else if (trimmed.startsWith('Requires Level')) {
          html += `<div style="color:#fff;font-size:0.8rem;margin:0.2rem 0;">${esc(trimmed)}</div>`;
        } else if (trimmed.startsWith('Sell Price:')) {
          html += `<div style="color:#94a3b8;font-size:0.75rem;margin-top:0.25rem;">${esc(trimmed)}</div>`;
        } else {
          html += `<div style="color:#fff;font-size:0.82rem;">${esc(trimmed)}</div>`;
        }
      }
      html += `</div>`;
    } else {
      // Case 3: Synthesize complete Classic WoW tooltip from WOW_ITEM_DATABASE row + supplementary datasets
      html += `<div style="border-top:1px solid rgba(255,255,255,0.08);padding-top:0.35rem;">`;
      if (bindText) {
        html += `<div class="wow-tip-bind">${esc(bindText)}</div>`;
      }

      if (kind.includes(' · ')) {
        const [slotPart, subPart] = kind.split(' · ');
        html += `<div class="wow-tip-type-row"><span>${esc(slotPart)}</span><span style="color:#cbd5e1;">${esc(subPart)}</span></div>`;
      } else {
        html += `<div class="wow-tip-type-row"><span>${esc(kind)}</span><span>${esc(Q_NAMES[q] || '')}</span></div>`;
      }

      const { primary, equip, dps } = parseDbStats(rawStats);

      if (richItem?.armor) {
        html += `<div style="color:#fff;font-size:0.82rem;">${esc(String(richItem.armor).includes('Armor') ? richItem.armor : `${richItem.armor} Armor`)}</div>`;
      }
      if (richItem?.block) {
        html += `<div style="color:#fff;font-size:0.82rem;">${esc(String(richItem.block).includes('Block') ? richItem.block : `${richItem.block} Block`)}</div>`;
      }

      if (dps || richItem?.dps) {
        const finalDps = dps || String(richItem.dps).replace(/\s*dps$/i, '');
        const spd = richItem?.speed ? parseFloat(richItem.speed) : 0;
        if (spd > 0) {
          const avg = parseFloat(finalDps) * spd;
          const minD = Math.max(1, Math.round(avg * 0.72));
          const maxD = Math.max(minD + 1, Math.round(avg * 1.28));
          html += `<div class="wow-tip-dmg-row"><span>${minD} - ${maxD} Damage</span><span>Speed ${spd.toFixed(2)}</span></div>`;
        }
        html += `<div class="wow-tip-dps">(${esc(finalDps)} damage per second)</div>`;
      }

      if (primary.length > 0) {
        html += `<div class="wow-tip-stats">${primary.map((s) => `<span>${esc(s)}</span>`).join('')}</div>`;
      }

      // Usable classes if restricted
      if (classMask > 0 && classMask < 511 && Array.isArray(db.classes)) {
        const allowed = db.classes.filter((_, cIdx) => (classMask >> cIdx) & 1);
        if (allowed.length > 0 && allowed.length < db.classes.length) {
          html += `<div style="color:#cbd5e1;font-size:0.78rem;margin:0.2rem 0;">Classes: ${esc(allowed.join(', '))}</div>`;
        }
      }

      if (req && req !== '—' && Number(req) > 0) {
        html += `<div style="color:#fff;font-size:0.8rem;margin:0.2rem 0;">Requires Level ${esc(req)}</div>`;
      }

      if (recipeItem?.req) {
        html += `<div style="color:#ff8000;font-size:0.8rem;font-weight:600;margin:0.2rem 0;">Requires ${esc(recipeItem.req)}</div>`;
      }

      if (equip.length > 0) {
        for (const eq of equip) {
          html += `<div class="wow-tip-equip">${esc(eq)}</div>`;
        }
      }

      if (recipeItem?.effect && equip.length === 0) {
        html += `<div class="wow-tip-equip">${esc(recipeItem.effect)}</div>`;
      }

      if (reagentInfo?.summary) {
        html += `<div style="color:#cbd5e1;font-size:0.78rem;margin-top:0.25rem;line-height:1.35;">${esc(reagentInfo.summary)}</div>`;
      }

      if (recipeItem?.reagents && recipeItem.reagents.length > 0) {
        html += `
          <div style="margin-top:0.35rem;padding-top:0.3rem;border-top:1px dashed rgba(255,255,255,0.1);">
            <div style="font-size:0.72rem;color:#94a3b8;margin-bottom:0.2rem;">Reagents:</div>
            <div style="font-size:0.76rem;color:#e2e8f0;">
              ${recipeItem.reagents.map((rg) => `${esc(rg.count || 1)}x ${esc(rg.name)}`).join(', ')}
            </div>
          </div>
        `;
      }

      if (sell > 0) {
        html += `<div style="color:#94a3b8;font-size:0.76rem;margin-top:0.3rem;">Vendor Sell Price: <strong style="color:#e2e8f0;">${formatCopper(sell)}</strong></div>`;
      }
      html += `</div>`;
    }

    // Best-For Spec Badges (from Classic+ Dungeon Loot table if present)
    const bestFor = cdlItem?.bestFor || fallbackItem?.bestFor || [];
    if (bestFor.length > 0) {
      html += `
        <div style="margin-top:0.4rem;padding-top:0.35rem;border-top:1px dashed rgba(255,255,255,0.1);">
          <div style="font-size:0.7rem;color:#94a3b8;margin-bottom:0.22rem;">Recommended Specs:</div>
          <div style="display:flex;flex-wrap:wrap;gap:0.25rem;">
            ${bestFor.slice(0, 5).map((bf) => `<span style="font-size:0.68rem;padding:0.06rem 0.36rem;border-radius:999px;background:rgba(56,189,248,0.14);border:1px solid rgba(56,189,248,0.32);color:#93c5fd;font-weight:600;">${esc(bf.cls ? bf.cls.charAt(0).toUpperCase() + bf.cls.slice(1) : '')} · ${esc(bf.spec || '')}</span>`).join('')}
          </div>
        </div>
      `;
    }

    // Drop sources & Live AH Market Price footer
    if (dropSources.length > 0 || marketEntry?.minBuyout > 0) {
      html += `<div class="wow-tip-source">`;
      if (dropSources.length > 0) {
        html += `<div style="color:#93c5fd;font-weight:600;">📍 Drops from: ${esc(dropSources.slice(0, 3).join(' • '))}${dropSources.length > 3 ? ` (+${dropSources.length - 3} more)` : ''}</div>`;
      }
      if (marketEntry?.minBuyout > 0) {
        html += `<div style="color:#facc15;margin-top:0.18rem;">🪙 Live Server AH Buyout: <strong>${formatCopper(marketEntry.minBuyout)}</strong></div>`;
      }
      html += `</div>`;
    }

    return html;
  }

  function showCodexItemTooltip(e, rowIdx, fallbackItem = null) {
    if (typeof document === 'undefined') return;
    let tooltip = document.getElementById('wow-item-tooltip');
    if (!tooltip) {
      tooltip = document.createElement('div');
      tooltip.id = 'wow-item-tooltip';
      tooltip.className = 'wow-floating-tooltip';
      document.body.appendChild(tooltip);
    }
    const html = buildCodexItemTooltipHtml(rowIdx, fallbackItem);
    if (!html) return;
    tooltip.innerHTML = html;
    tooltip.removeAttribute('hidden');
    tooltip.style.display = 'block';
    tooltip.style.opacity = '1';
    tooltip.style.pointerEvents = 'none';
    tooltip.style.zIndex = '9999999';
    if (typeof window.positionTooltip === 'function') {
      window.positionTooltip(e, tooltip);
    }
  }

  function hideCodexItemTooltip() {
    if (typeof document === 'undefined') return;
    const tooltip = document.getElementById('wow-item-tooltip');
    if (tooltip) {
      tooltip.setAttribute('hidden', '');
      tooltip.style.display = 'none';
      tooltip.style.opacity = '0';
    }
  }

  window.showCodexItemTooltipById = function (e, itemId, itemName = '', fallbackItem = null) {
    const idx = ensureIndex();
    let rowIdx = -1;
    if (idx) {
      if (itemId && idx.idToRow.has(Number(itemId))) {
        rowIdx = idx.idToRow.get(Number(itemId));
      } else if (itemName && idx.nameToRow.has(String(itemName).toLowerCase().trim())) {
        rowIdx = idx.nameToRow.get(String(itemName).toLowerCase().trim());
      }
    }
    showCodexItemTooltip(e, rowIdx, fallbackItem);
  };
  window.hideCodexItemTooltip = hideCodexItemTooltip;
  window.buildCodexItemTooltipHtml = buildCodexItemTooltipHtml;

  function filterAndSort() {
    const idx = ensureIndex();
    if (!idx) return [];
    const { rows, meta, n, hay } = idx;
    const cats = meta.cats || [];
    const src = meta.src || [];

    const catOk = new Uint8Array(cats.length);
    for (let c = 0; c < cats.length; c++) {
      const key = cats[c];
      catOk[c] = (state.cat === 'all' || key === state.cat || key.startsWith(state.cat + ':')) ? 1 : 0;
    }

    const words = state.q
      .toLowerCase()
      .split(/\s+/)
      .map((w) => w.replace(/^\+/, ''))
      .filter(Boolean)
      .map((w) => ALIAS[w] || w);

    const out = [];
    const minL = state.minLvl || 1;
    const maxL = state.maxLvl || 60;
    const hasLvlFilter = minL > 1 || maxL < 60;

    for (let i = 0; i < n; i++) {
      const r = rows[i];
      const q = Math.min(r[2], 5);
      if (!catOk[r[5]] || q < state.minQuality) continue;

      const b = BIND_MAP[r[8]] ?? 'BoP';
      if (state.bind && b !== state.bind) continue;
      if (state.onlyNew && !(r[10] & 1)) continue;
      if (state.onlyDrops && (!r[13] || r[13].length === 0)) continue;

      const req = r[4] || 1;
      if (hasLvlFilter && (req < minL || req > maxL)) continue;

      if (state.cls >= 0 && r[11] >= 0) {
        const band = hasLvlFilter ? (maxL >= 40 ? 1 : 0) : ((r[4] >= 40 || (!r[4] && r[3] >= 45)) ? 1 : 0);
        const mask = band ? r[12] : r[11];
        if (!((mask >> state.cls) & 1)) continue;
      }

      if (state.inst) {
        const sList = r[13] || [];
        let hit = false;
        for (let k = 0; k < sList.length; k++) {
          const pair = src[sList[k]];
          if (pair && pair[0] === state.inst) {
            hit = true;
            break;
          }
        }
        if (!hit) continue;
      }

      if (words.length > 0) {
        const h = hay[i];
        let matchAll = true;
        for (let wIdx = 0; wIdx < words.length; wIdx++) {
          const w = words[wIdx];
          if (h.indexOf(w) < 0 && !(/^\d+$/.test(w) && r[0] === Number(w))) {
            matchAll = false;
            break;
          }
        }
        if (!matchAll) continue;
      }

      out.push(i);
    }

    const dir = state.dir;
    const sortMode = state.sort;
    out.sort((a, b) => {
      const ra = rows[a];
      const rb = rows[b];
      let va = 0;
      let vb = 0;
      if (sortMode === 'name') {
        return ra[1] < rb[1] ? -1 * dir : ra[1] > rb[1] ? 1 * dir : ra[0] - rb[0];
      } else if (sortMode === 'ilvl') {
        va = ra[3];
        vb = rb[3];
      } else if (sortMode === 'req') {
        va = (ra[4] || 0) * 1000 + ra[3];
        vb = (rb[4] || 0) * 1000 + rb[3];
      } else if (sortMode === 'sell') {
        va = ra[9] || 0;
        vb = rb[9] || 0;
      } else if (sortMode === 'quality') {
        va = ra[2];
        vb = rb[2];
      } else {
        va = (ra[10] & 1) * 1e7 + ra[0];
        vb = (rb[10] & 1) * 1e7 + rb[0];
      }
      if (va !== vb) return (va > vb ? 1 : -1) * dir;
      if (ra[2] !== rb[2]) return rb[2] - ra[2];
      return ra[0] - rb[0];
    });

    return out;
  }

  function renderRow(i) {
    const { rows, meta } = indexCache;
    const r = rows[i];
    const id = r[0];
    const name = r[1];
    const q = Math.min(r[2], 5);
    const ilvl = r[3];
    const req = r[4] || '—';
    const kind = (meta.kinds && meta.kinds[r[6]]) || 'Item';
    const iconName = r[7] >= 0 && meta.icons && meta.icons[r[7]] ? meta.icons[r[7]] : 'inv_misc_questionmark';
    const bind = BIND_MAP[r[8]] ?? 'BoP';
    const sell = r[9] || 0;
    const isNew = (r[10] & 1) !== 0;
    const stats = r[14] || '';
    const sList = r[13] || [];

    let bossStr = '—';
    let instStr = bind === 'BoE' ? 'World / Crafted / BoE' : '';
    let instSlug = '';
    if (sList.length > 0 && meta.src && meta.src[sList[0]]) {
      const s0 = meta.src[sList[0]];
      instSlug = s0[0];
      bossStr = s0[1];
      const extraCount = new Set(sList.map((k) => meta.src[k] && meta.src[k][0])).size - 1;
      instStr = (meta.inst && meta.inst[s0[0]] ? meta.inst[s0[0]] : s0[0]) + (extraCount > 0 ? ` (+${extraCount} more)` : '');
    }

    const marketPrice = window.WOW_MARKET_SCAN_DATA?.prices?.[id]?.minBuyout || 0;
    const priceDisplay = marketPrice > 0
      ? `<span style="color:#facc15;font-weight:700;" title="Live Server AH Scan">${formatCopper(marketPrice)}</span>`
      : `<span style="color:#94a3b8;font-size:0.78rem;">Vendor: ${formatCopper(sell)}</span>`;

    const bindBadge = bind
      ? `<span style="display:inline-block;padding:0.12rem 0.45rem;border-radius:4px;font-size:0.72rem;font-weight:700;background:${bind === 'BoE' ? 'rgba(34,197,94,0.16)' : 'rgba(245,158,11,0.16)'};color:${bind === 'BoE' ? '#4ade80' : '#fbbf24'};">${bind}</span>`
      : `<span style="color:#64748b;font-size:0.75rem;">—</span>`;

    return `
      <tr class="codex-db-row" data-row-idx="${i}" data-item-id="${id}" style="border-bottom:1px solid rgba(255,255,255,0.06);font-size:0.84rem;">
        <td style="padding:0.55rem 0.65rem;">
          <div style="display:flex;align-items:center;gap:0.65rem;">
            <img src="https://wow.zamimg.com/images/wow/icons/medium/${esc(iconName)}.jpg"
                 alt="" width="34" height="34" loading="lazy"
                 style="border-radius:6px;border:1.5px solid ${Q_COLORS[q]};background:#0f172a;flex-shrink:0;"
                 onerror="this.src='https://wow.zamimg.com/images/wow/icons/medium/inv_misc_questionmark.jpg'">
            <div style="min-width:0;">
              <div style="display:flex;align-items:center;gap:0.4rem;flex-wrap:wrap;">
                <a href="https://www.wowhead.com/forever/item=${id}" target="_blank" rel="noopener noreferrer"
                   style="color:${Q_COLORS[q]};font-weight:700;text-decoration:none;">${esc(name)}</a>
                ${isNew ? '<span style="background:rgba(16,185,129,0.2);color:#34d399;border:1px solid rgba(16,185,129,0.4);padding:0.05rem 0.38rem;border-radius:4px;font-size:0.66rem;font-weight:800;letter-spacing:0.04em;">NEW IN FOREVER</span>' : ''}
                <span style="color:#64748b;font-size:0.72rem;">#${id}</span>
              </div>
              <div style="color:#94a3b8;font-size:0.75rem;">
                ${esc(kind)}${stats ? ` • <span style="color:#38bdf8;">${esc(stats)}</span>` : ''}
              </div>
            </div>
          </div>
        </td>
        <td style="padding:0.55rem 0.65rem;color:#cbd5e1;">
          ${instSlug ? `<button type="button" onclick="openDungeonLootModal('${esc(instSlug)}')" style="background:none;border:none;padding:0;color:#60a5fa;font-weight:600;cursor:pointer;text-align:left;font-size:0.82rem;">${esc(bossStr)}</button>` : `<span style="color:#94a3b8;">${esc(bossStr)}</span>`}
          ${instStr ? `<div style="font-size:0.73rem;color:#64748b;">${esc(instStr)}</div>` : ''}
        </td>
        <td style="padding:0.55rem 0.5rem;text-align:center;">${bindBadge}</td>
        <td style="padding:0.55rem 0.5rem;text-align:right;color:#cbd5e1;font-variant-numeric:tabular-nums;">${req}</td>
        <td style="padding:0.55rem 0.5rem;text-align:right;color:#f8fafc;font-weight:600;font-variant-numeric:tabular-nums;">${ilvl}</td>
        <td style="padding:0.55rem 0.65rem;text-align:right;font-variant-numeric:tabular-nums;">${priceDisplay}</td>
      </tr>
    `;
  }

  function updateTableOnly(mount, append = false) {
    const tbody = mount.querySelector('#codex-db-tbody');
    const countEl = mount.querySelector('#codex-db-count');
    const moreBtn = mount.querySelector('#codex-db-more');
    if (!tbody || !countEl || !moreBtn) return;

    const total = filteredIndices.length;
    countEl.textContent = `${total.toLocaleString('en-US')} item${total === 1 ? '' : 's'} matched`;

    if (total === 0) {
      const totalDbItems = (window.WOW_ITEM_DATABASE?.totalItems || 22493).toLocaleString('en-US');
      tbody.innerHTML = `<tr><td colspan="6" style="padding:2rem;text-align:center;color:#94a3b8;">No items match your current filters. Click "Reset Filters" to view all ${totalDbItems} items.</td></tr>`;
      moreBtn.style.display = 'none';
      return;
    }

    const start = append ? Math.max(0, state.shown - 50) : 0;
    const slice = filteredIndices.slice(start, state.shown);
    const html = slice.map(renderRow).join('');
    if (append) {
      tbody.insertAdjacentHTML('beforeend', html);
    } else {
      tbody.innerHTML = html;
    }

    const remaining = total - state.shown;
    if (remaining > 0) {
      moreBtn.style.display = 'inline-flex';
      moreBtn.textContent = `Load ${Math.min(50, remaining)} More Items (${remaining.toLocaleString('en-US')} remaining)`;
    } else {
      moreBtn.style.display = 'none';
    }
  }

  window.renderCodexItemDatabase = function () {
    const mount = document.getElementById('codex-database-mount');
    if (!mount) return;
    const idx = ensureIndex();
    if (!idx) {
      mount.innerHTML = `<div style="padding:2rem;text-align:center;color:#94a3b8;">Item database loading...</div>`;
      return;
    }

    const { db, meta } = idx;
    const instEntries = Object.entries(meta.inst || {});

    mount.innerHTML = `
      <div class="codex-db-wrapper" style="display:flex;flex-direction:column;gap:1.1rem;">
        <div class="section-heading-bar" style="margin-bottom:0.25rem;">
          <div>
            <h2><span>📦</span> WoW Forever Item Database &amp; Market (${db.totalItems.toLocaleString('en-US')} Items)</h2>
            <p class="section-subtext">Search every weapon, armor piece, recipe, reagent, and boss drop extracted directly from the Build 1.60.6 game client — including ${db.newInForeverItems.toLocaleString('en-US')} brand-new Classic+ items, ${db.revealedItems.toLocaleString('en-US')} detailed items, and live BoE auction valuations.</p>
            <div style="display:flex;align-items:center;gap:0.6rem;margin-top:0.4rem;flex-wrap:wrap;">
              <span style="display:inline-flex;align-items:center;gap:0.35rem;padding:0.2rem 0.6rem;border-radius:999px;background:rgba(234,179,8,0.12);border:1px solid rgba(234,179,8,0.3);color:#facc15;font-size:0.75rem;font-weight:600;">
                <span>💰</span> AH Live Pricing Ready (Companion Addon Stream)
              </span>
              <span style="display:inline-flex;align-items:center;gap:0.35rem;padding:0.2rem 0.6rem;border-radius:999px;background:rgba(56,189,248,0.12);border:1px solid rgba(56,189,248,0.3);color:#7dd3fc;font-size:0.75rem;font-weight:600;">
                <span>🏰</span> 28 Dungeon Boss Drop Tables
              </span>
            </div>
          </div>
        </div>

        <!-- Filter Controls Bar -->
        <div style="background:rgba(15,23,42,0.75);border:1px solid var(--border-subtle);border-radius:var(--radius-md);padding:1rem;display:flex;flex-direction:column;gap:0.85rem;">
          <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(190px,1fr));gap:0.65rem;">
            <input type="search" id="codex-db-search" aria-label="Search items by name, stat, type, boss, or ID"
                   placeholder="🔍 Search name, +int, sword, VanCleef, or #ID..."
                   value="${esc(state.q)}"
                   style="grid-column:span 2;background:#0f172a;color:#f8fafc;border:1px solid #334155;border-radius:6px;padding:0.5rem 0.75rem;font-size:0.86rem;">

            <select id="codex-db-cat" aria-label="Filter items by category" style="background:#0f172a;color:#f8fafc;border:1px solid #334155;border-radius:6px;padding:0.5rem;font-size:0.84rem;">
              ${db.tree.map(([k, label]) => `<option value="${esc(k)}" ${state.cat === k ? 'selected' : ''}>${ k.includes(':') ? '— ' + esc(label) : esc(label) }</option>`).join('')}
            </select>

            <select id="codex-db-cls" aria-label="Filter items by usable class" style="background:#0f172a;color:#f8fafc;border:1px solid #334155;border-radius:6px;padding:0.5rem;font-size:0.84rem;">
              <option value="-1">All Classes</option>
              ${db.classes.map((c, i) => `<option value="${i}" ${state.cls === i ? 'selected' : ''}>Usable by ${esc(c)}</option>`).join('')}
            </select>

            <select id="codex-db-inst" aria-label="Filter items by dungeon drop source" style="background:#0f172a;color:#f8fafc;border:1px solid #334155;border-radius:6px;padding:0.5rem;font-size:0.84rem;">
              <option value="">All Sources (World &amp; Dungeons)</option>
              ${instEntries.map(([slug, name]) => `<option value="${esc(slug)}" ${state.inst === slug ? 'selected' : ''}>🏰 ${esc(name)}</option>`).join('')}
            </select>
          </div>

          <div style="display:flex;flex-wrap:wrap;align-items:center;gap:0.65rem;justify-content:space-between;">
            <div style="display:flex;flex-wrap:wrap;align-items:center;gap:0.55rem;">
              <select id="codex-db-rar" aria-label="Filter items by minimum rarity" style="background:#0f172a;color:#f8fafc;border:1px solid #334155;border-radius:6px;padding:0.38rem 0.55rem;font-size:0.8rem;">
                <option value="0">Any Rarity</option>
                <option value="2">Uncommon (Green) &amp; Up</option>
                <option value="3">Rare (Blue) &amp; Up</option>
                <option value="4">Epic (Purple) &amp; Up</option>
                <option value="5">Legendary Only</option>
              </select>

              <select id="codex-db-bind" aria-label="Filter items by binding type" style="background:#0f172a;color:#f8fafc;border:1px solid #334155;border-radius:6px;padding:0.38rem 0.55rem;font-size:0.8rem;">
                <option value="">Any Binding</option>
                <option value="BoP">Bind on Pickup (BoP)</option>
                <option value="BoE">Bind on Equip (BoE)</option>
              </select>

              <div style="display:inline-flex;align-items:center;gap:0.35rem;font-size:0.8rem;color:#cbd5e1;">
                <span>Req Lvl:</span>
                <input type="number" id="codex-db-minlvl" aria-label="Minimum required level" min="1" max="60" value="${state.minLvl}" style="width:52px;background:#0f172a;color:#fff;border:1px solid #334155;border-radius:5px;padding:0.3rem;text-align:center;">
                <span>–</span>
                <input type="number" id="codex-db-maxlvl" aria-label="Maximum required level" min="1" max="60" value="${state.maxLvl}" style="width:52px;background:#0f172a;color:#fff;border:1px solid #334155;border-radius:5px;padding:0.3rem;text-align:center;">
              </div>

              <label style="display:inline-flex;align-items:center;gap:0.35rem;font-size:0.8rem;color:#34d399;font-weight:600;cursor:pointer;">
                <input type="checkbox" id="codex-db-new" aria-label="Only show items new in WoW Forever" ${state.onlyNew ? 'checked' : ''}>
                ✦ New in Forever (${db.newInForeverItems.toLocaleString('en-US')})
              </label>

              <label style="display:inline-flex;align-items:center;gap:0.35rem;font-size:0.8rem;color:#60a5fa;font-weight:600;cursor:pointer;">
                <input type="checkbox" id="codex-db-drops" aria-label="Only show boss drops" ${state.onlyDrops ? 'checked' : ''}>
                ⚔️ Boss Drops Only
              </label>
            </div>

            <div style="display:flex;align-items:center;gap:0.55rem;">
              <select id="codex-db-sort" aria-label="Sort item database results" style="background:#0f172a;color:#f8fafc;border:1px solid #334155;border-radius:6px;padding:0.38rem 0.55rem;font-size:0.8rem;">
                <option value="new">Sort: Newest / Forever First</option>
                <option value="ilvl">Sort: Item Level (High → Low)</option>
                <option value="req">Sort: Req Level (High → Low)</option>
                <option value="quality">Sort: Rarity (High → Low)</option>
                <option value="sell">Sort: Vendor Value (High → Low)</option>
                <option value="name">Sort: Name (A → Z)</option>
              </select>
              <button type="button" id="codex-db-reset" style="background:rgba(239,68,68,0.15);color:#fca5a5;border:1px solid rgba(239,68,68,0.35);border-radius:6px;padding:0.38rem 0.7rem;font-size:0.78rem;font-weight:600;cursor:pointer;">Reset Filters</button>
            </div>
          </div>
        </div>

        <!-- Results Status Bar -->
        <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:0.5rem;padding:0 0.25rem;">
          <strong id="codex-db-count" style="color:#f5d061;font-size:0.92rem;">Loading...</strong>
          <span style="font-size:0.78rem;color:#94a3b8;">💡 Hover any item for its full tooltip, click the item name to view on Wowhead Forever, or click a Boss name to open its Dungeon Loot Table.</span>
        </div>

        <!-- Results Table -->
        <div class="table-responsive-wrapper" style="background:rgba(15,23,42,0.65);border:1px solid var(--border-subtle);border-radius:var(--radius-md);overflow-x:auto;">
          <table style="width:100%;border-collapse:collapse;">
            <thead>
              <tr style="border-bottom:2px solid var(--border-subtle);text-align:left;font-size:0.76rem;color:var(--text-gold);text-transform:uppercase;letter-spacing:0.06em;background:rgba(0,0,0,0.25);">
                <th style="padding:0.65rem;">Item &amp; Stats</th>
                <th style="padding:0.65rem;">Drop Source / Instance</th>
                <th style="padding:0.65rem;text-align:center;">Bind</th>
                <th style="padding:0.65rem;text-align:right;">Req</th>
                <th style="padding:0.65rem;text-align:right;">iLvl</th>
                <th style="padding:0.65rem;text-align:right;">Value / AH</th>
              </tr>
            </thead>
            <tbody id="codex-db-tbody"></tbody>
          </table>
        </div>

        <div style="text-align:center;margin-top:0.4rem;">
          <button type="button" id="codex-db-more" class="btn-primary" style="padding:0.55rem 1.4rem;font-size:0.85rem;border-radius:999px;cursor:pointer;">Load 50 More Items</button>
        </div>
      </div>
    `;

    const tbody = mount.querySelector('#codex-db-tbody');
    if (tbody) {
      let activeRowIdx = -1;

      tbody.addEventListener('mouseover', (e) => {
        const tr = e.target.closest('tr[data-row-idx]');
        if (!tr) {
          activeRowIdx = -1;
          hideCodexItemTooltip();
          return;
        }
        const rowIdx = Number(tr.getAttribute('data-row-idx'));
        if (rowIdx !== activeRowIdx) {
          activeRowIdx = rowIdx;
          showCodexItemTooltip(e, rowIdx);
        }
      });

      tbody.addEventListener('mousemove', (e) => {
        const tooltip = document.getElementById('wow-item-tooltip');
        if (tooltip && !tooltip.hasAttribute('hidden') && typeof window.positionTooltip === 'function') {
          window.positionTooltip(e, tooltip);
        }
      });

      tbody.addEventListener('mouseleave', () => {
        activeRowIdx = -1;
        hideCodexItemTooltip();
      });

      tbody.addEventListener('focusin', (e) => {
        const tr = e.target.closest('tr[data-row-idx]');
        if (!tr) return;
        const rowIdx = Number(tr.getAttribute('data-row-idx'));
        const rect = e.target.getBoundingClientRect ? e.target.getBoundingClientRect() : { right: 120, top: 120 };
        showCodexItemTooltip({ clientX: rect.right, clientY: rect.top }, rowIdx);
      });

      tbody.addEventListener('focusout', () => {
        hideCodexItemTooltip();
      });

      tbody.addEventListener('click', (e) => {
        if (e.target.closest('button')) {
          hideCodexItemTooltip();
        }
      });
    }

    const refresh = () => {
      hideCodexItemTooltip();
      state.shown = 50;
      filteredIndices = filterAndSort();
      updateTableOnly(mount, false);
    };

    let timer = null;
    mount.querySelector('#codex-db-search')?.addEventListener('input', (e) => {
      state.q = e.target.value.trim();
      clearTimeout(timer);
      timer = setTimeout(refresh, 90);
    });
    mount.querySelector('#codex-db-cat')?.addEventListener('change', (e) => { state.cat = e.target.value; refresh(); });
    mount.querySelector('#codex-db-cls')?.addEventListener('change', (e) => { state.cls = Number(e.target.value); refresh(); });
    mount.querySelector('#codex-db-inst')?.addEventListener('change', (e) => { state.inst = e.target.value; refresh(); });
    mount.querySelector('#codex-db-rar')?.addEventListener('change', (e) => { state.minQuality = Number(e.target.value); refresh(); });
    mount.querySelector('#codex-db-bind')?.addEventListener('change', (e) => { state.bind = e.target.value; refresh(); });
    mount.querySelector('#codex-db-minlvl')?.addEventListener('input', (e) => { state.minLvl = Math.max(1, Math.min(60, Number(e.target.value) || 1)); refresh(); });
    mount.querySelector('#codex-db-maxlvl')?.addEventListener('input', (e) => { state.maxLvl = Math.max(1, Math.min(60, Number(e.target.value) || 60)); refresh(); });
    mount.querySelector('#codex-db-new')?.addEventListener('change', (e) => { state.onlyNew = e.target.checked; refresh(); });
    mount.querySelector('#codex-db-drops')?.addEventListener('change', (e) => { state.onlyDrops = e.target.checked; refresh(); });
    mount.querySelector('#codex-db-sort')?.addEventListener('change', (e) => {
      state.sort = e.target.value;
      state.dir = state.sort === 'name' ? 1 : -1;
      refresh();
    });
    mount.querySelector('#codex-db-reset')?.addEventListener('click', () => {
      state = { q: '', cat: 'all', cls: -1, minQuality: 0, bind: '', inst: '', onlyNew: false, onlyDrops: false, minLvl: 1, maxLvl: 60, sort: 'new', dir: -1, shown: 50 };
      window.renderCodexItemDatabase();
    });
    mount.querySelector('#codex-db-more')?.addEventListener('click', () => {
      state.shown += 50;
      updateTableOnly(mount, true);
    });

    refresh();
  };
})();
