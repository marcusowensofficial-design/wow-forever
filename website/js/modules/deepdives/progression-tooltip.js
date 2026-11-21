/**
 * World of Warcraft: Forever - Class Progression Weapon/Item Tooltip Renderer
 * Extracted from js/modules/deepdives/class-progression.js for modularity and <1,500-line headroom.
 */
(function () {
  'use strict';

  const escapeHtml = window.escapeHtml || (s => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'));

  let weaponLookupCache = null;

  function resetCache() {
    weaponLookupCache = null;
  }

  function isRealStatToken(tok) {
    const s = String(tok ?? '').trim();
    if (!s) return false;
    if (/^(equip|use|chance on hit):/i.test(s)) return true;
    if (/^\d+\s+(armor|block)\b/i.test(s)) return true;
    if (/^[+-]\d+%?\s+(strength|agility|stamina|intellect|spirit|str|agi|sta|int|spi|spell power|sp|attack power|ap|healing|armor|block|crit|hit|defense|res|penetration|fire|frost|shadow|nature|arcane|holy|mana regeneration|health regeneration|spell damage|healing spells)/i.test(s)) return true;
    if (/^\d+%?\s+(mp5|sp|ap|crit|hit|spell power|healing|armor|block)/i.test(s)) return true;
    if (/^(strength|agility|stamina|intellect|spirit|str|agi|sta|int|spi|spell power|sp|attack power|ap|defense|armor|block)\s+[+-]\d+/i.test(s)) return true;
    if (/proc on hit|on hit/i.test(s) && /[+-]?\d+/.test(s)) return true;
    return false;
  }

  function getProgressionOrBisItem(itemId, name) {
    if (typeof window === 'undefined') return null;
    if (!weaponLookupCache) {
      weaponLookupCache = { byId: new Map(), byName: new Map() };

      const registerItem = (it) => {
        if (!it) return;
        if (it.itemId) {
          const ex = weaponLookupCache.byId.get(String(it.itemId));
          if (!ex || (!ex.lines && it.lines) || (!ex.stats && it.stats)) {
            weaponLookupCache.byId.set(String(it.itemId), it);
          }
        }
        if (it.name) {
          const k = it.name.toLowerCase().trim();
          const ex = weaponLookupCache.byName.get(k);
          if (!ex || (!ex.lines && it.lines) || (!ex.stats && it.stats)) {
            weaponLookupCache.byName.set(k, it);
          }
        }
      };

      if (window.WOW_PROGRESSION_DATA) {
        const collections = [
          window.WOW_PROGRESSION_DATA.weapons,
          window.WOW_PROGRESSION_DATA.wands,
          window.WOW_PROGRESSION_DATA.offhands
        ];
        for (const coll of collections) {
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
                for (const alt of step.alts || []) {
                  registerItem(alt);
                }
              }
            }
          }
        }
      }

      const bisSources = [window.WOW_BIS_DATA_60, window.WOW_BIS_DATA].filter(Boolean);
      for (const bisDb of bisSources) {
        const classes = bisDb.classes || [];
        for (const cls of classes) {
          const cd = bisDb[cls.id];
          if (!cd) continue;
          for (const sp of cd.specs || []) {
            for (const sl of sp.slots || []) {
              for (const it of sl.items || []) {
                registerItem(it);
              }
            }
          }
        }
      }
    }

    if (itemId && weaponLookupCache.byId.has(String(itemId))) {
      return weaponLookupCache.byId.get(String(itemId));
    }
    if (name && weaponLookupCache.byName.has(name.toLowerCase().trim())) {
      return weaponLookupCache.byName.get(name.toLowerCase().trim());
    }
    return null;
  }

  function getWeaponSlotText(type) {
    const t = (type || '').toLowerCase();
    if (t.includes('two-hand') || t.includes('staff') || t.includes('polearm')) return 'Two-Hand';
    if (t.includes('wand') || t.includes('bow') || t.includes('gun') || t.includes('crossbow') || t.includes('ranged')) return 'Ranged';
    if (t.includes('dagger') || t.includes('main hand')) return 'Main Hand';
    if (t.includes('off hand') || t.includes('shield')) return 'Off Hand';
    return 'One-Hand';
  }

  function calculateDmgRange(dpsStr, speedStr) {
    const dps = parseFloat(dpsStr) || 0;
    const speed = parseFloat(speedStr) || 2.0;
    if (!dps || !speed) return '';
    const avg = dps * speed;
    const min = Math.max(1, Math.round(avg * 0.72));
    const max = Math.max(min + 1, Math.round(avg * 1.28));
    return `${min} - ${max}`;
  }

  function formatStatLine(stat) {
    const s = stat.trim();
    if (!s) return '';
    if (/^(equip|use|chance on hit):/i.test(s)) {
      return `<div class="wow-tip-equip">${escapeHtml(s)}</div>`;
    }
    if (/^\d+\s*mp5/i.test(s) || /mana regeneration/i.test(s)) {
      const equipText = s.startsWith('Equip:') ? s : `Equip: +${s.replace(/^\+/, '')}`;
      return `<div class="wow-tip-equip">${escapeHtml(equipText)}</div>`;
    }
    if (/\barmor\b/i.test(s)) {
      return `<div class="wow-tip-armor" style="color: #fff;">${escapeHtml(s)}</div>`;
    }
    if (/\bblock\b/i.test(s)) {
      return `<div class="wow-tip-block" style="color: #fff;">${escapeHtml(s)}</div>`;
    }
    return `<div class="wow-tip-stat" style="color: #fff;">${escapeHtml(s)}</div>`;
  }

  function parseStatsTokens(statsStr, altValStr, detailStr) {
    const splitRe = /,(?=\s*(?:[+-]|\d+\s*(?:mp5|sp|ap|crit|hit|armor|block)|equip|use|chance on hit|\b(?:strength|agility|stamina|intellect|spirit|str|agi|sta|int|spi|armor|block)\b))/i;
    if (statsStr) {
      const valid = statsStr.split(splitRe).map(s => s.trim()).filter(Boolean).filter(isRealStatToken);
      if (valid.length > 0) return valid;
    }
    const src = altValStr || detailStr || '';
    if (!src) return [];
    const paren = src.match(/\(([^)]+)\)/);
    if (paren) {
      const valid = paren[1].split(splitRe).map(s => s.trim()).filter(Boolean).filter(isRealStatToken);
      if (valid.length > 0) return valid;
    }
    const left = src.split(/\s*[-–—:]\s*/)[0] || '';
    return left.split(splitRe).map(s => s.trim()).filter(Boolean).filter(isRealStatToken);
  }

  function extractSourceAndStats(valStr) {
    if (!valStr) return { stats: [], source: '' };
    const parts = valStr.split(/\s*[-–—]\s*/);
    if (parts.length <= 1) return { stats: [], source: valStr };

    const rest = parts.slice(1);
    const statParts = [];
    const sourceParts = [];
    const splitRe = /,(?=\s*(?:[+-]|\d+\s*(?:mp5|sp|ap|crit|hit|armor|block)|equip|use|chance on hit|\b(?:strength|agility|stamina|intellect|spirit|str|agi|sta|int|spi|armor|block)\b))/i;

    for (const p of rest) {
      const trimmed = p.trim();
      if (!trimmed) continue;
      const subTokens = trimmed.split(splitRe).map(s => s.trim()).filter(Boolean);
      if (subTokens.length > 0 && subTokens.every(isRealStatToken)) {
        statParts.push(...subTokens);
      } else {
        sourceParts.push(trimmed);
      }
    }

    return { stats: statParts, source: sourceParts.join(' — ') };
  }

  function renderWeaponTooltipHtml(target) {
    const name = target.getAttribute('data-item-name') || 'Weapon';
    const itemId = target.getAttribute('data-item-id') || '';
    const fullItem = getProgressionOrBisItem(itemId, name);

    const quality = target.getAttribute('data-quality') || fullItem?.quality || 'q2';
    const ilvl = target.getAttribute('data-ilvl') || fullItem?.iLvl || fullItem?.ilvl || '';
    const reqLevel = target.getAttribute('data-req-level') || fullItem?.reqLevel || '';
    const weaponType = target.getAttribute('data-weapon-type') || fullItem?.weaponType || 'Weapon';
    const armor = target.getAttribute('data-armor') || fullItem?.armor || '';
    const block = target.getAttribute('data-block') || fullItem?.block || '';
    const speed = target.getAttribute('data-speed') || fullItem?.speed || '';
    const dps = target.getAttribute('data-dps') || fullItem?.dps || '';
    const stats = target.getAttribute('data-stats') || fullItem?.stats || '';
    const sourceTitle = target.getAttribute('data-source-title') || '';
    const sourceDetail = target.getAttribute('data-source-detail') || '';
    const altVal = target.getAttribute('data-alt-val') || '';
    const faction = target.getAttribute('data-faction') || 'both';

    const parsedFromAlt = extractSourceAndStats(altVal);
    let statTokens = parseStatsTokens(stats, altVal, sourceDetail);
    if (statTokens.length === 0 && parsedFromAlt.stats.length > 0) {
      statTokens = parsedFromAlt.stats;
    }

    let html = '';
    const qualClass = fullItem?.quality || quality || 'q2';
    html += `<div class="wow-tip-name ${qualClass}">${escapeHtml(name)}</div>`;

    const itemLevel = fullItem?.iLvl || fullItem?.ilvl || ilvl;
    if (itemLevel) {
      html += `<div class="wow-tip-ilvl">Item Level ${escapeHtml(itemLevel)}</div>`;
    }

    if (fullItem && fullItem.lines && fullItem.lines.length > 0) {
      const linesHasStats = fullItem.lines.some(line => {
        const trimmed = line.trim();
        return trimmed.startsWith('+') || /Strength|Agility|Stamina|Intellect|Spirit|Armor|Spell Damage|Healing|Attack Power|\bAP\b|\bSP\b/i.test(trimmed);
      });
      let statsInjected = false;
      const injectStats = () => {
        if (!linesHasStats && !statsInjected && statTokens.length > 0) {
          statTokens.forEach(st => { html += formatStatLine(st); });
          statsInjected = true;
        }
      };

      html += '<div class="wow-tip-lines">';
      if (armor && !fullItem.lines.some(l => l.includes('Armor'))) {
        html += `<div class="wow-tip-armor" style="color: #fff;">${escapeHtml(armor)} Armor</div>`;
      }
      if (block && !fullItem.lines.some(l => l.includes('Block'))) {
        html += `<div class="wow-tip-block" style="color: #fff;">${escapeHtml(block)} Block</div>`;
      }
      fullItem.lines.forEach(line => {
        const trimmed = line.trim();
        if (!trimmed || trimmed === name || trimmed.startsWith('Item Level')) return;
        if (trimmed.includes('\t')) {
          const [l, r] = trimmed.split('\t');
          if (trimmed.includes('Damage') || trimmed.includes('Speed')) {
            html += `<div class="wow-tip-dmg-row"><span>${escapeHtml(l)}</span><span>${escapeHtml(r)}</span></div>`;
          } else {
            html += `<div class="wow-tip-type-row"><span>${escapeHtml(l)}</span><span>${escapeHtml(r)}</span></div>`;
          }
        } else if (trimmed.includes('Armor') && !trimmed.startsWith('Equip:') && !trimmed.startsWith('Use:') && !trimmed.startsWith('Chance on hit:')) {
          html += `<div class="wow-tip-armor" style="color: #fff;">${escapeHtml(trimmed)}</div>`;
        } else if (trimmed.includes('Block') && !trimmed.startsWith('Equip:') && !trimmed.startsWith('Use:') && !trimmed.startsWith('Chance on hit:')) {
          html += `<div class="wow-tip-block" style="color: #fff;">${escapeHtml(trimmed)}</div>`;
        } else if (trimmed.startsWith('(') && trimmed.endsWith(')') && trimmed.toLowerCase().includes('damage per second')) {
          html += `<div class="wow-tip-dps">${escapeHtml(trimmed)}</div>`;
          injectStats();
        } else if (trimmed.startsWith('Binds when')) {
          html += `<div class="wow-tip-bind">${escapeHtml(trimmed)}</div>`;
        } else if (trimmed.startsWith('Requires Level')) {
          injectStats();
          html += `<div class="wow-tip-req" style="color: #fff; font-size: 0.8rem; margin: 0.2rem 0;">${escapeHtml(trimmed)}</div>`;
        } else if (trimmed.startsWith('Equip:') || trimmed.startsWith('Chance on hit:') || trimmed.startsWith('Use:')) {
          injectStats();
          html += `<div class="wow-tip-equip">${escapeHtml(trimmed)}</div>`;
        } else if (trimmed.startsWith('Sell Price:')) {
          html += `<div class="wow-tip-price" style="color: #94a3b8; font-size: 0.75rem; margin-top: 0.25rem;">${escapeHtml(trimmed)}</div>`;
        } else if (trimmed.startsWith('+') || /Strength|Agility|Stamina|Intellect|Spirit/.test(trimmed)) {
          html += `<div class="wow-tip-stat" style="color: #fff;">${escapeHtml(trimmed)}</div>`;
        } else if (/^Speed\s+[\d.]+/i.test(trimmed)) {
          const sVal = trimmed.replace(/^Speed\s+/i, '');
          const dmg = calculateDmgRange(dps, sVal);
          html += `<div class="wow-tip-dmg-row"><span>${dmg ? escapeHtml(dmg) + ' Damage' : 'Weapon Damage'}</span><span>${escapeHtml(trimmed)}</span></div>`;
        } else if (/^(Two-Hand|One-Hand|Main Hand|Off Hand|Ranged)$/i.test(trimmed)) {
          html += `<div class="wow-tip-type-row"><span>${escapeHtml(trimmed)}</span><span>${escapeHtml(weaponType || 'Weapon')}</span></div>`;
        } else if (weaponType && trimmed.toLowerCase() === weaponType.toLowerCase()) {
          const slot = getWeaponSlotText(weaponType);
          html += `<div class="wow-tip-type-row"><span>${escapeHtml(slot)}</span><span>${escapeHtml(trimmed)}</span></div>`;
        } else if (/mana per 5 sec/i.test(trimmed)) {
          html += formatStatLine(trimmed);
        } else {
          html += `<div class="wow-tip-generic" style="color: #cbd5e1;">${escapeHtml(trimmed)}</div>`;
        }
      });
      injectStats();
      html += '</div>';
    } else {
      const isVendorOrCraft = (sourceTitle + ' ' + sourceDetail + ' ' + altVal).toLowerCase();
      const isBindsEquip = isVendorOrCraft.includes('world drop') || isVendorOrCraft.includes('auction') || isVendorOrCraft.includes('craft') || isVendorOrCraft.includes('vendor');
      if (qualClass !== 'q1') {
        html += `<div class="wow-tip-bind">${isBindsEquip ? 'Binds when equipped' : 'Binds when picked up'}</div>`;
      }

      const slotText = getWeaponSlotText(weaponType);
      const isShield = weaponType.toLowerCase() === 'shield';
      html += `
        <div class="wow-tip-type-row">
          <span>${escapeHtml(isShield ? 'Off Hand' : slotText)}</span>
          <span>${escapeHtml(weaponType || 'Weapon')}</span>
        </div>
      `;

      if (armor) {
        html += `<div class="wow-tip-armor" style="color: #fff;">${escapeHtml(armor)} Armor</div>`;
      }
      if (block) {
        html += `<div class="wow-tip-block" style="color: #fff;">${escapeHtml(block)} Block</div>`;
      }

      if (speed || dps) {
        const dmg = calculateDmgRange(dps, speed);
        html += `
          <div class="wow-tip-dmg-row">
            <span>${dmg ? escapeHtml(dmg) + ' Damage' : 'Weapon Damage'}</span>
            <span>Speed ${escapeHtml(speed || '2.00')}</span>
          </div>
        `;
        if (dps) {
          const cleanDps = dps.replace(/\s*dps$/i, '').trim();
          html += `<div class="wow-tip-dps">(${escapeHtml(cleanDps)} damage per second)</div>`;
        }
      }

      if (statTokens.length > 0) {
        html += '<div class="wow-tip-stats">';
        statTokens.forEach(st => { html += formatStatLine(st); });
        html += '</div>';
      }

      const rLvl = reqLevel ? parseInt(reqLevel, 10) : 0;
      if (rLvl > 1) {
        html += `<div class="wow-tip-req" style="color: #fff; font-size: 0.8rem; margin: 0.2rem 0;">Requires Level ${rLvl}</div>`;
      }
    }

    if (faction === 'alliance') {
      html += `<div class="wow-tip-faction alliance" style="display: flex; align-items: center; gap: 0.35rem; color: #60a5fa; font-weight: 700; margin-top: 0.35rem;"><img src="images/icons/faction-alliance.jpg" width="14" height="14" style="border-radius: 2px;" alt="" onerror="this.src='https://render.worldofwarcraft.com/us/icons/56/achievement_pvp_a_a.jpg'" /> Alliance Exclusive</div>`;
    } else if (faction === 'horde') {
      html += `<div class="wow-tip-faction horde" style="display: flex; align-items: center; gap: 0.35rem; color: #f87171; font-weight: 700; margin-top: 0.35rem;"><img src="images/icons/faction-horde.jpg" width="14" height="14" style="border-radius: 2px;" alt="" onerror="this.src='https://render.worldofwarcraft.com/us/icons/56/achievement_pvp_h_h.jpg'" /> Horde Exclusive</div>`;
    }

    let srcText = fullItem?.source || '';
    if (typeof srcText === 'object' && srcText !== null) {
      srcText = srcText.title ? `${srcText.title}${srcText.detail ? ' — ' + srcText.detail : ''}` : '';
    }
    if (!srcText) {
      if (sourceTitle) {
        srcText = sourceTitle;
        if (sourceDetail) {
          const cleanDetail = sourceDetail.replace(/\s*\([^)]*\)/g, '').trim();
          if (cleanDetail) srcText += ` — ${cleanDetail}`;
        }
      } else if (altVal) {
        srcText = parsedFromAlt.source;
      }
    }
    if (srcText) {
      const parts = srcText.split(/\s*[-–—]\s*/);
      srcText = parts.filter(p => !isRealStatToken(p.trim())).join(' — ').trim();
    }
    if (srcText.trim()) {
      html += `<div class="wow-tip-source">📍 Source: ${escapeHtml(srcText.trim())}</div>`;
    }

    if (itemId) {
      html += `
        <div class="wow-tip-wowhead-hint" style="margin-top: 0.5rem; padding-top: 0.35rem; border-top: 1px dashed rgba(255, 255, 255, 0.12); font-size: 0.72rem; color: #f3c043; display: flex; align-items: center; justify-content: space-between;">
          <span>Click weapon to view on Wowhead</span>
          <span style="font-size: 0.75rem;">↗</span>
        </div>
      `;
    }

    return html;
  }

  function showWeaponTooltip(e, target) {
    if (typeof document === 'undefined') return;
    const tgt = (target && typeof target.getAttribute === 'function') ? target : (e?.currentTarget || e?.target);
    if (!tgt || typeof tgt.getAttribute !== 'function') return;
    let tooltip = document.getElementById('wow-item-tooltip');
    if (!tooltip) {
      tooltip = document.createElement('div');
      tooltip.id = 'wow-item-tooltip';
      tooltip.className = 'wow-floating-tooltip';
      document.body.appendChild(tooltip);
    }
    tooltip.innerHTML = renderWeaponTooltipHtml(tgt);
    tooltip.removeAttribute('hidden');
    tooltip.style.display = 'block';
    tooltip.style.opacity = '1';
    tooltip.style.pointerEvents = 'none';
    tooltip.style.zIndex = '9999999';
    if (typeof window !== 'undefined' && window.positionTooltip) {
      window.positionTooltip(e, tooltip);
    }
  }

  function moveWeaponTooltip(e) {
    if (typeof document === 'undefined') return;
    const tooltip = document.getElementById('wow-item-tooltip');
    if (tooltip && !tooltip.hasAttribute('hidden') && typeof window !== 'undefined' && window.positionTooltip) {
      window.positionTooltip(e, tooltip);
    }
  }

  function hideWeaponTooltip() {
    if (typeof document === 'undefined') return;
    const tooltip = document.getElementById('wow-item-tooltip');
    if (tooltip) {
      tooltip.setAttribute('hidden', '');
      tooltip.style.display = 'none';
      tooltip.style.opacity = '0';
    }
  }

  window.WOW_PROGRESSION_TOOLTIP = {
    resetCache,
    isRealStatToken,
    getProgressionOrBisItem,
    renderWeaponTooltipHtml,
    showWeaponTooltip,
    moveWeaponTooltip,
    hideWeaponTooltip
  };
})();
