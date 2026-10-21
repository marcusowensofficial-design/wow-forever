/**
 * World of Warcraft: Forever - Class Progression Sub-Module
 * Handles 1-60 Spellbooks, Level-by-Level Weapon Paths, 1-Click Copyable Macros,
 * and Leveling Milestones across all 9 classes.
 */

(function() {
  'use strict';

  const escapeHtml = window.escapeHtml || (s => String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"));

  // State
  let activeSpellFilterLevel = 'all';
  let activeSpellSearchQuery = '';
  let activeWeaponTrack = {};
  let activeWeaponFaction = 'all'; // 'all' | 'alliance' | 'horde'
  let activeWeaponSource = 'all'; // 'all' | 'dungeon' | 'quest' | 'vendor-craft' | 'world'
  let activeWeaponSlot = 'all'; // 'all' | 'one-hand' | 'main-hand' | 'two-hand' | 'ranged'
  let activeWandFaction = 'all';
  let activeWandSource = 'all';
  let activeOffhandFaction = 'all';
  let activeOffhandSource = 'all';
  let activeMacroCategory = 'all';
  let activeMacroSearchQuery = '';

  const FACTION_ICONS = {
    alliance: `<img src="images/icons/faction-alliance.jpg" class="progression-faction-crest" alt="Alliance" onerror="this.src='https://render.worldofwarcraft.com/us/icons/56/achievement_pvp_a_a.jpg'" />`,
    horde: `<img src="images/icons/faction-horde.jpg" class="progression-faction-crest" alt="Horde" onerror="this.src='https://render.worldofwarcraft.com/us/icons/56/achievement_pvp_h_h.jpg'" />`
  };

  function getIconUrl(icon) {
    const clean = (icon || 'inv_misc_questionmark').replace(/\.(jpg|png|webp)$/i, '');
    return `https://wow.zamimg.com/images/wow/icons/medium/${clean}.jpg`;
  }

  // 1. Spellbook Renderer
  function renderSpellbook(classId) {
    const data = window.WOW_PROGRESSION_DATA?.spellbooks?.[classId];
    if (!data || !data.levels || data.levels.length === 0) {
      return `
        <div class="progression-empty-state">
          <p>⚠️ No spellbook data available for this class in current Beta Build.</p>
        </div>
      `;
    }

    const levelTiers = [
      { id: 'all', label: 'All Levels (1–60)' }, { id: '1-10', label: 'Levels 1–10', min: 1, max: 10 }, { id: '11-20', label: 'Levels 11–20', min: 11, max: 20 },
      { id: '21-30', label: 'Levels 21–30', min: 21, max: 30 }, { id: '31-40', label: 'Levels 31–40', min: 31, max: 40 }, { id: '41-50', label: 'Levels 41–50', min: 41, max: 50 }, { id: '51-60', label: 'Levels 51–60', min: 51, max: 60 }
    ];

    let filteredLevels = data.levels;
    if (activeSpellFilterLevel !== 'all') {
      const tier = levelTiers.find(t => t.id === activeSpellFilterLevel);
      if (tier) {
        filteredLevels = filteredLevels.filter(lvl => lvl.level >= tier.min && lvl.level <= tier.max);
      }
    }

    const q = activeSpellSearchQuery.trim().toLowerCase();

    return `
      <div class="progression-section-wrap">
        <div class="progression-header-banner">
          <div class="progression-header-info">
            <h3><span>📖</span> 1–60 Class Spellbook & Ability Ranks</h3>
            <p>Every ability, spell rank, and passive trained from your Class Trainer from Level 1 to 60 in WoW Forever.</p>
          </div>
          <div class="progression-header-badge">Build 70425 Verified</div>
        </div>

        <!-- Controls Bar -->
        <div class="progression-controls-bar">
          <div class="progression-filter-chips" id="spellbook-tier-chips">
            ${levelTiers.map(t => `
              <button type="button" class="progression-chip ${activeSpellFilterLevel === t.id ? 'active' : ''}" data-tier="${t.id}">
                ${t.label}
              </button>
            `).join('')}
          </div>
          <div class="progression-search-box">
            <input type="text" id="spellbook-search-input" placeholder="Search spells or schools..." value="${escapeHtml(activeSpellSearchQuery)}" aria-label="Search spells" />
            ${activeSpellSearchQuery ? `<button type="button" id="btn-clear-spell-search" class="btn-clear-search">✕</button>` : ''}
          </div>
        </div>

        <!-- Levels Timeline Grid -->
        <div class="spellbook-levels-container">
          ${filteredLevels.map(lvl => {
            const matchingSpells = lvl.spells.filter(sp => {
              if (!q) return true;
              return sp.name.toLowerCase().includes(q) || sp.school.toLowerCase().includes(q) || sp.desc.toLowerCase().includes(q);
            });

            if (matchingSpells.length === 0) return '';

            return `
              <div class="spellbook-level-block">
                <div class="spellbook-level-header">
                  <div class="spellbook-level-badge">Level ${lvl.level}</div>
                  ${lvl.note ? `<span class="spellbook-level-note">${escapeHtml(lvl.note)}</span>` : ''}
                  <span class="spellbook-count-badge">${matchingSpells.length} ${matchingSpells.length === 1 ? 'Spell' : 'Spells'}</span>
                </div>
                <div class="spellbook-cards-grid">
                  ${matchingSpells.map(spell => `
                    <div class="spellbook-card">
                      <div class="spellbook-card-top">
                        <img class="spellbook-card-icon" src="${getIconUrl(spell.icon)}" alt="${escapeHtml(spell.name)}" loading="lazy" />
                        <div class="spellbook-card-meta">
                          <div class="spellbook-card-title">${escapeHtml(spell.name)}</div>
                          <span class="spellbook-school-badge">${escapeHtml(spell.school)}</span>
                        </div>
                      </div>
                      ${spell.desc ? `<div class="spellbook-card-desc">${escapeHtml(spell.desc)}</div>` : ''}
                    </div>
                  `).join('')}
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;
  }

  // Tooltip Helper Utilities for Weapon Progression
  let weaponLookupCache = null;

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

      // 1. Prioritize WOW_PROGRESSION_DATA (curated leveling items with full lines and custom stats)
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

      // 2. Supplement remaining items from WOW_BIS_DATA
      if (window.WOW_BIS_DATA) {
        const classes = window.WOW_BIS_DATA.classes || [];
        for (const cls of classes) {
          const cd = window.WOW_BIS_DATA[cls.id];
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
    if (statsStr) {
      const tokens = statsStr.split(/,(?=\s*(?:[+-]|\d+\s*(?:mp5|sp|ap|crit|hit|armor|block)|equip|use|chance on hit|\b(?:strength|agility|stamina|intellect|spirit|str|agi|sta|int|spi|armor|block)\b))/i)
        .map(s => s.trim())
        .filter(Boolean);
      const valid = tokens.filter(isRealStatToken);
      if (valid.length > 0) return valid;
    }
    const src = altValStr || detailStr || '';
    if (!src) return [];
    const paren = src.match(/\(([^)]+)\)/);
    if (paren) {
      const tokens = paren[1].split(/,(?=\s*(?:[+-]|\d+\s*(?:mp5|sp|ap|crit|hit|armor|block)|equip|use|chance on hit|\b(?:strength|agility|stamina|intellect|spirit|str|agi|sta|int|spi|armor|block)\b))/i)
        .map(s => s.trim())
        .filter(Boolean);
      const valid = tokens.filter(isRealStatToken);
      if (valid.length > 0) return valid;
    }
    const left = src.split(/\s*[-–—:]\s*/)[0] || '';
    const tokens = left.split(/,(?=\s*(?:[+-]|\d+\s*(?:mp5|sp|ap|crit|hit|armor|block)|equip|use|chance on hit|\b(?:strength|agility|stamina|intellect|spirit|str|agi|sta|int|spi|armor|block)\b))/i)
      .map(s => s.trim())
      .filter(Boolean);
    return tokens.filter(isRealStatToken);
  }

  function extractSourceAndStats(valStr) {
    if (!valStr) return { stats: [], source: '' };
    const parts = valStr.split(/\s*[-–—]\s*/);
    if (parts.length <= 1) return { stats: [], source: valStr };
    
    const rest = parts.slice(1);
    const statParts = [];
    const sourceParts = [];

    for (const p of rest) {
      const trimmed = p.trim();
      if (!trimmed) continue;
      const subTokens = trimmed.split(/,(?=\s*(?:[+-]|\d+\s*(?:mp5|sp|ap|crit|hit|armor|block)|equip|use|chance on hit|\b(?:strength|agility|stamina|intellect|spirit|str|agi|sta|int|spi|armor|block)\b))/i)
        .map(s => s.trim())
        .filter(Boolean);
      const allStats = subTokens.length > 0 && subTokens.every(isRealStatToken);
      if (allStats) {
        statParts.push(...subTokens);
      } else {
        sourceParts.push(trimmed);
      }
    }

    return {
      stats: statParts,
      source: sourceParts.join(' — ')
    };
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

      html += `<div class="wow-tip-lines">`;
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
      html += `</div>`;
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
        html += `<div class="wow-tip-stats">`;
        statTokens.forEach(st => {
          html += formatStatLine(st);
        });
        html += `</div>`;
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
      const cleanParts = parts.filter(p => !isRealStatToken(p.trim()));
      srcText = cleanParts.join(' — ').trim();
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

  // Source & Slot Filter Helpers
  function itemMatchesSource(item, filter) {
    if (!filter || filter === 'all') return true;
    const kind = item?.source?.kind || '';
    if (filter === 'dungeon') {
      if (kind === 'dungeon' || kind === 'dungeon_drop') return true;
      const text = ((item?.source?.title || '') + ' ' + (item?.source?.detail || '') + ' ' + (item?.source || '') + ' ' + (item?.value || '')).toLowerCase();
      return /dungeon|boss|instance|ragefire|wailing caverns|deadmines|shadowfang|blackfathom|stockade|gnomeregan|razorfen|scarlet monastery|monastery|armory|cathedral|graveyard|library|uldaman|zul'farrak|maraudon|sunken temple|atal'hakkar|blackrock depths|scholomance|stratholme|dire maul|ruins of lordaeron|excavation site|hall of thanes|city of dalaran|\brfc\b|\bsfk\b|\bbfd\b|\brfk\b|\brfd\b|\bsm\b|\bzf\b|\bst\b|\bbrd\b|\bdm\b|rhahk'zor|sneed|smite|cookie|greenskin|vancleef|kresh|pythas|serpentis|skum|verdan|springvale|odo|arugal|butcher|gelihast|serra'kis|aku'mai|kelris|deepfury|ironknuckle|thermaplugg|fallout|electrocutioner|pummeler|grubbis|ramtusk|jargba|agathelos|halmgar|blind hunter|vishas|thalnos|azshir|doan|loksey|herod|mograine|whitemane|mordresh|glutton|amnennar|archaedas|grimlok|ironaya|galgann|antu'sul|zum'rah|sandscalp|gahz'rilla|noxxion|gizlock|theradras|hakkar|eranikus|morphaz|angerforge|flamelash|grebmar|loregrain|ironfoe|spazzring|taragaman|jergosh|bazzalan|krastinov|hydrospawn|polkelt/i.test(text);
    }
    if (filter === 'quest') {
      if (kind === 'quest') return true;
      const text = ((item?.source?.title || '') + ' ' + (item?.source?.detail || '') + ' ' + (item?.source || '') + ' ' + (item?.value || '')).toLowerCase();
      return /quest|reward|wanted:|chain\b|turn-in|task:|contract|return to|in the name of|the fate of|hidden enemies|leaders of the fang|test of|battle of|assault on/i.test(text);
    }
    if (filter === 'vendor-craft') {
      if (kind === 'vendor' || kind === 'crafted' || kind === 'craft' || kind === 'pvp') return true;
      const text = ((item?.source?.title || '') + ' ' + (item?.source?.detail || '') + ' ' + (item?.source || '') + ' ' + (item?.value || '')).toLowerCase();
      return /vendor|purchased|sold by|blacksmithing|engineering|leatherworking|tailoring|crafted|crafting|merchant|provisioner|supply officer|sergeant|officer|starter/i.test(text);
    }
    if (filter === 'world') {
      if (kind === 'world' || kind === 'world_drop' || kind === 'drop' || kind === 'rare' || kind === 'raid') return true;
      const text = ((item?.source?.title || '') + ' ' + (item?.source?.detail || '') + ' ' + (item?.source || '') + ' ' + (item?.value || '')).toLowerCase();
      return /world drop|zone drop|rare drop|rare spawn|chest|leveling drop/i.test(text);
    }
    return true;
  }

  function getItemExplicitSlot(item) {
    const lines = Array.isArray(item?.lines) ? item.lines : [];
    for (let i = 0; i < lines.length; i++) {
      if (/binds\s+when\s+(picked\s+up|equipped)/i.test(lines[i])) {
        return (lines[i + 1] || '').split('\t')[0].trim().toLowerCase();
      }
    }
    return (item?.inventorySlot || '').trim().toLowerCase() ||
      (lines.map(l => l.split('\t')[0].trim().toLowerCase()).find(f => ['main hand', 'one-hand', 'two-hand', 'off hand', 'ranged'].includes(f)) || '');
  }

  function itemMatchesSlot(item, filter) {
    if (!filter || filter === 'all') return true;
    const explicitSlot = getItemExplicitSlot(item);
    const type = (item?.weaponType || '').toLowerCase();
    const slot = (item?.inventorySlot || '').toLowerCase();
    const linesStr = Array.isArray(item?.lines) ? item.lines.join(' ').toLowerCase() : '';

    const isTwoHand = explicitSlot === 'two-hand' || type.includes('two-hand') || type.includes('2h') || type.includes('staff') || type.includes('polearm') || slot.includes('two-hand') || linesStr.includes('two-hand');
    const isRanged = explicitSlot === 'ranged' || type.includes('bow') || type.includes('gun') || type.includes('crossbow') || type.includes('wand') || type.includes('ranged') || linesStr.includes('ranged') || slot.includes('ranged');
    const isMainHandOnly = explicitSlot === 'main hand' || slot.includes('main hand') || linesStr.includes('main hand') || type.includes('main hand');
    const isOffHandOnly = explicitSlot === 'off hand' || slot.includes('off hand') || linesStr.includes('off hand') || type.includes('off hand') || type.includes('shield') || type.includes('held in off-hand');

    if (filter === 'main-hand') return !isTwoHand && !isRanged && !isOffHandOnly && explicitSlot !== 'one-hand' && isMainHandOnly;
    if (filter === 'one-hand') {
      if (isTwoHand || isRanged || isMainHandOnly || isOffHandOnly || explicitSlot === 'main hand') return false;
      return explicitSlot === 'one-hand' || type.includes('one-hand') || type.includes('1h') || type.includes('dagger') || type.includes('fist') || type.includes('sword') || type.includes('mace') || type.includes('axe') || slot.includes('one-hand') || linesStr.includes('one-hand');
    }
    if (filter === 'two-hand') return isTwoHand;
    if (filter === 'ranged') return isRanged;
    return true;
  }

  function itemMatchesAll(item, faction, source, slot, classId) {
    if (!item) return false;
    const f = item.faction || 'both';
    if (classId === 'shaman' && f === 'alliance') return false;
    if (faction !== 'all') {
      if (f !== 'both' && f !== faction) return false;
    }
    if (!itemMatchesSource(item, source)) return false;
    if (!itemMatchesSlot(item, slot)) return false;
    if (window.WOW_PROGRESSION_FILTER && !window.WOW_PROGRESSION_FILTER.itemMatchesFilter(item)) return false;
    return true;
  }

  function renderAltTag(alt) {
    const altUrl = alt.itemId ? `https://www.wowhead.com/forever/item=${alt.itemId}` : null;
    const altFaction = alt.faction || 'both';
    const altBadge = altFaction === 'alliance' ? `<span class="item-faction-badge faction-alliance" title="Alliance Only">${FACTION_ICONS.alliance}</span>` : (altFaction === 'horde' ? `<span class="item-faction-badge faction-horde" title="Horde Only">${FACTION_ICONS.horde}</span>` : '');
    const altStats = alt.stats || alt.value || '';
    const isAltHeal = /healing\s+(?:done\s+by\s+(?:up\s+to\s+)?)?(\d+)/i.test(altStats);
    return `
      <span class="alt-tag ${altFaction !== 'both' ? 'alt-faction-' + altFaction : ''} ${isAltHeal ? 'alt-healing-tag' : ''}"
            data-weapon-target="true" data-item-name="${escapeHtml(alt.name)}" data-item-id="${alt.itemId || ''}"
            data-quality="${escapeHtml(alt.quality || '')}" data-ilvl="${alt.iLvl || ''}" data-req-level="${alt.reqLevel || ''}"
            data-weapon-type="${escapeHtml(alt.weaponType || '')}" data-speed="${escapeHtml(alt.speed || '')}"
            data-dps="${escapeHtml(alt.dps || '')}" data-stats="${escapeHtml(alt.stats || '')}"
            data-armor="${alt.armor || ''}" data-block="${alt.block || ''}"
            data-alt-val="${escapeHtml(alt.value || '')}" data-faction="${escapeHtml(altFaction)}">
        ${altBadge}${isAltHeal ? '<span class="alt-healer-icon" title="Optimal for Healers">💚</span> ' : ''}${altUrl ? `<a href="${altUrl}" target="_blank" rel="noopener noreferrer" class="alt-link" data-wowhead="domain=forever&item=${alt.itemId || ''}">${escapeHtml(alt.name)}</a>` : `<span class="alt-name">${escapeHtml(alt.name)}</span>`}${alt.value ? ` <span class="alt-val">(${escapeHtml(alt.value)})</span>` : ''}
      </span>
    `;
  }

  function normalizeHeroItem(alt, baseStep, targetFaction) {
    if (!alt) return null;
    const valStr = alt.value || '';
    const dpsMatch = alt.dps || valStr.match(/([\d.]+\s*DPS)/i)?.[1] || '';
    const spdMatch = alt.speed || valStr.match(/([\d.]+s)/i)?.[1]?.replace('s', '') || '';
    const altSourceObj = (typeof alt.source === 'object' && alt.source !== null) ? alt.source : {
      kind: itemMatchesSource(alt, 'dungeon') ? 'dungeon' : (itemMatchesSource(alt, 'vendor-craft') ? 'vendor' : 'quest'),
      title: typeof alt.source === 'string' ? alt.source : (alt.name || 'Leveling Item'),
      detail: typeof alt.value === 'string' ? alt.value : 'Leveling Drop / Reward'
    };
    return {
      ...baseStep,
      itemId: alt.itemId || null, name: alt.name, icon: alt.icon || baseStep?.icon,
      weaponType: alt.weaponType || baseStep?.weaponType, speed: spdMatch || alt.speed || baseStep?.speed,
      dps: dpsMatch || (alt.dps ? `${alt.dps} DPS` : baseStep?.dps), stats: alt.stats || baseStep?.stats,
      armor: alt.armor || baseStep?.armor, block: alt.block || baseStep?.block, lines: alt.lines || null,
      source: altSourceObj, faction: alt.faction || targetFaction, quality: alt.quality || baseStep?.quality,
      iLvl: alt.iLvl || baseStep?.iLvl, reqLevel: alt.reqLevel || baseStep?.reqLevel, levelBracket: baseStep?.levelBracket
    };
  }

  function renderHeroEntry(item, isPromoted, isTopPick, factionLabel) {
    const rawKind = item.source?.kind || 'drop';
    const canonicalKind = (rawKind === 'dungeon_drop' || rawKind === 'dungeon') ? 'dungeon' : ((rawKind === 'crafted' || rawKind === 'craft' || rawKind === 'vendor') ? 'vendor' : ((rawKind === 'world_drop' || rawKind === 'world') ? 'world' : rawKind));
    const sourceKindClass = `source-${canonicalKind}`;
    const displaySourceTag = (rawKind === 'dungeon_drop') ? 'DUNGEON DROP' : ((rawKind === 'world_drop') ? 'WORLD DROP' : rawKind.toUpperCase());
    let srcTitle = (item.source?.title || 'Unknown Source').replace(/undefined\s*/g, '').trim() || 'Dungeon Boss';
    let srcDetail = (item.source?.detail || '').replace(/undefined\s*/g, '').replace(/\(\s*\)/g, '').trim();

    const wowheadUrl = item.itemId ? `https://www.wowhead.com/forever/item=${item.itemId}` : '#';
    const itemFaction = item.faction || 'both';
    const displayFaction = factionLabel || itemFaction;
    const factionBadgeHtml = displayFaction === 'alliance'
      ? `<span class="item-faction-badge faction-alliance" title="${itemFaction === 'both' ? 'Alliance Top Pick' : 'Alliance Only'}">${FACTION_ICONS.alliance} Alliance</span>`
      : displayFaction === 'horde'
      ? `<span class="item-faction-badge faction-horde" title="${itemFaction === 'both' ? 'Horde Top Pick' : 'Horde Only'}">${FACTION_ICONS.horde} Horde</span>`
      : '';

    const isPromotedBadge = isPromoted || item.isAltPromoted || item.isPromoted;
    const promotedBadgeHtml = isPromotedBadge ? '<span class="item-promoted-badge" title="Promoted alternative matching your active filters">⭐ Alt Promoted</span>' : '';
    const isTop = !isPromotedBadge && (isTopPick || item.rank === 1 || item.isTopPick || item.rank === undefined);
    const topPickBadgeHtml = isTop ? '<span class="item-top-pick-badge" title="Highest scoring item for this level bracket">⭐ Top Pick</span>' : '';
    const isHeal = item.stats ? /healing\s+(?:done\s+by\s+(?:up\s+to\s+)?)?(\d+)/i.test(item.stats) : false;

    return `
      <div class="weapon-hero-entry">
        <div class="weapon-item-hero" data-weapon-target="true"
             data-item-name="${escapeHtml(item.name)}" data-item-id="${item.itemId || ''}" data-quality="${escapeHtml(item.quality || '')}"
             data-ilvl="${item.iLvl || ''}" data-req-level="${item.reqLevel || ''}" data-weapon-type="${escapeHtml(item.weaponType || '')}"
             data-speed="${escapeHtml(item.speed || '')}" data-dps="${escapeHtml(item.dps || '')}" data-stats="${escapeHtml(item.stats || '')}"
             data-armor="${item.armor || ''}" data-block="${item.block || ''}" data-source-title="${escapeHtml(srcTitle)}"
             data-source-detail="${escapeHtml(srcDetail)}" data-source-kind="${escapeHtml(canonicalKind)}" data-faction="${escapeHtml(itemFaction)}">
          <a href="${wowheadUrl}" target="_blank" rel="noopener noreferrer" class="weapon-icon-link" data-wowhead="domain=forever&item=${item.itemId || ''}">
            <img src="${getIconUrl(item.icon)}" alt="${escapeHtml(item.name)}" class="weapon-icon" loading="lazy" />
          </a>
          <div class="weapon-item-info">
            <div class="weapon-item-header">
              <a href="${wowheadUrl}" target="_blank" rel="noopener noreferrer" class="weapon-title-link" data-wowhead="domain=forever&item=${item.itemId || ''}">
                ${escapeHtml(item.name)}
              </a>
              <span class="weapon-type-badge">${escapeHtml(item.weaponType)}</span>
              ${factionBadgeHtml}
              ${promotedBadgeHtml || topPickBadgeHtml}
            </div>
            <div class="weapon-stats-row">
              ${item.speed ? `<span class="stat-pill">Speed: ${escapeHtml(item.speed)}</span>` : ''}
              ${item.dps ? `<span class="stat-pill dps-pill">DPS: ${escapeHtml(item.dps)}</span>` : ''}
              ${item.stats ? `<span class="stat-pill stats-pill ${isHeal ? 'healing-highlight-pill' : ''}" title="${isHeal ? 'Optimal Healing item (Healing > Spell Damage)' : ''}">${isHeal ? '💚 ' : ''}${escapeHtml(item.stats)}</span>` : ''}
            </div>
          </div>
        </div>
        <div class="weapon-source-block ${sourceKindClass}">
          <span class="source-tag">${escapeHtml(displaySourceTag)}</span>
          <span class="source-title"><strong>${escapeHtml(srcTitle)}</strong></span>
          ${srcDetail ? `<span class="source-detail">${escapeHtml(srcDetail)}</span>` : ''}
        </div>
      </div>
    `;
  }

  // 2. Generic Item Timeline Renderer (Weapons, Wands, Off-Hands)
  let lastTimelineContext = null;

  function generateTimelineCards(classId, datasetKey, cfg) {
    const data = window.WOW_PROGRESSION_DATA?.[datasetKey]?.[classId];
    if (!data || !data.levels || data.levels.length === 0) {
      return { stepCards: '', displayedCount: 0, currentTrack: 'primary' };
    }

    const isShaman = classId === 'shaman';
    let effectiveFaction = cfg.getFaction ? cfg.getFaction() : 'all';
    if (isShaman && effectiveFaction === 'alliance') effectiveFaction = 'horde';
    const effectiveSource = cfg.getSource ? cfg.getSource() : 'all';
    let effectiveSlot = cfg.getSlot ? cfg.getSlot() : 'all';
    if (classId === 'rogue' && effectiveSlot === 'two-hand') effectiveSlot = 'all';
    if (!['hunter', 'warrior', 'rogue'].includes(classId) && effectiveSlot === 'ranged') effectiveSlot = 'all';

    let currentTrack = activeWeaponTrack[`${classId}_${datasetKey}`] || data.tracks?.[0]?.id || 'primary';
    if (classId === 'hunter' && datasetKey === 'weapons') {
      if (effectiveSlot === 'two-hand' && currentTrack === 'primary') currentTrack = 'twohand';
      else if (effectiveSlot === 'ranged' && currentTrack === 'twohand') currentTrack = 'primary';
    }
    const activeLevelList = (currentTrack === 'healer' && data.healingLevels)
      ? data.healingLevels
      : ((data.tracksData && data.tracksData[currentTrack]) || data.levels);

    let displayedCount = 0;
    const stepCards = activeLevelList.map((step, idx) => {
      if (step && step.levelBracket && window.WOW_PROGRESSION_FILTER && typeof window.WOW_PROGRESSION_FILTER.bracketMatchesFilter === 'function') {
        if (!window.WOW_PROGRESSION_FILTER.bracketMatchesFilter(step.levelBracket)) {
          return '';
        }
      }

      let displayStep = { ...step };
      let allAlts = Array.isArray(step.alts) ? step.alts.slice() : [];
      const poolItems = Array.isArray(step.pool) ? step.pool : (Array.isArray(displayStep.pool) ? displayStep.pool : []);
      if (poolItems.length > 0) {
        const existingIds = new Set(allAlts.map(a => a.itemId || a.name));
        for (const p of poolItems) {
          if (!existingIds.has(p.itemId || p.name)) {
            allAlts.push(p);
            existingIds.add(p.itemId || p.name);
          }
        }
      }
      let displayAlts = allAlts.slice();

      const primaryMatches = itemMatchesAll(displayStep, effectiveFaction, effectiveSource, effectiveSlot, classId);

      // Check for Horde BiS promotion (Staff of Orgrimmar in brackets 13-18)
      let hordeBisIdx = -1;
      if (effectiveFaction === 'horde' && (effectiveSource === 'all' || effectiveSource === 'quest') && (effectiveSlot === 'all' || effectiveSlot === 'two-hand')) {
        hordeBisIdx = displayAlts.findIndex(a => 
          a.faction === 'horde' && 
          (a.itemId === 15444 || a.name === 'Staff of Orgrimmar') && 
          itemMatchesAll(a, effectiveFaction, effectiveSource, effectiveSlot, classId)
        );
      }

      let matchIdx = -1;
      if (hordeBisIdx !== -1) {
        matchIdx = hordeBisIdx;
      } else if (!primaryMatches) {
        if (effectiveFaction !== 'all') {
          matchIdx = displayAlts.findIndex(a => (a.faction || 'both') === effectiveFaction && itemMatchesAll(a, effectiveFaction, effectiveSource, effectiveSlot, classId));
        }
        if (matchIdx === -1) {
          matchIdx = displayAlts.findIndex(a => itemMatchesAll(a, effectiveFaction, effectiveSource, effectiveSlot, classId));
        }
      }

      let isPromoted = false;
      if (matchIdx !== -1) {
        const altMatch = displayAlts[matchIdx];
        const demotedStep = {
          name: step.name, itemId: step.itemId, icon: step.icon, weaponType: step.weaponType,
          speed: step.speed, dps: step.dps, stats: step.stats, armor: step.armor, block: step.block,
          lines: step.lines, source: step.source, faction: step.faction || 'both', quality: step.quality,
          iLvl: step.iLvl, reqLevel: step.reqLevel, value: `${step.dps || ''}, ${step.speed ? step.speed + 's' : ''} - ${step.source?.title || ''}`
        };

        displayStep = normalizeHeroItem(altMatch, step, effectiveFaction);
        displayStep.isAltPromoted = true;
        displayStep.isPromoted = true;

        displayAlts = displayAlts.filter((_, i) => i !== matchIdx);
        if (primaryMatches) {
          displayAlts.push(demotedStep);
        }
        isPromoted = true;
      } else if (!primaryMatches) {
        return '';
      }

      // Dual-faction top pick resolution when viewing 'all' factions
      let isDualPick = false, alliancePick = null, hordePick = null;
      const primaryFaction = displayStep.faction || 'both';

      if (effectiveFaction === 'all' && (primaryFaction === 'alliance' || primaryFaction === 'horde')) {
        const counterpartFaction = primaryFaction === 'alliance' ? 'horde' : 'alliance';
        let cpIdx = -1;
        if (counterpartFaction === 'horde' && (effectiveSource === 'all' || effectiveSource === 'quest') && (effectiveSlot === 'all' || effectiveSlot === 'two-hand')) {
          cpIdx = displayAlts.findIndex(a => a.faction === 'horde' && (a.itemId === 15444 || a.name === 'Staff of Orgrimmar') && itemMatchesAll(a, 'horde', effectiveSource, effectiveSlot, classId));
        }
        if (cpIdx === -1) {
          cpIdx = displayAlts.findIndex(a => (a.faction || 'both') === counterpartFaction && itemMatchesAll(a, counterpartFaction, effectiveSource, effectiveSlot, classId));
        }
        if (cpIdx === -1) {
          cpIdx = displayAlts.findIndex(a => itemMatchesAll(a, counterpartFaction, effectiveSource, effectiveSlot, classId));
        }

        if (cpIdx !== -1) {
          const cpRaw = displayAlts[cpIdx];
          const cpStep = normalizeHeroItem(cpRaw, step, counterpartFaction);
          cpStep.isTopPick = true;
          displayAlts = displayAlts.filter((_, i) => i !== cpIdx);

          isDualPick = true;
          alliancePick = primaryFaction === 'alliance' ? displayStep : cpStep;
          hordePick = primaryFaction === 'alliance' ? cpStep : displayStep;
        }
      }

      // Filter alts to only show items that match all active filters
      displayAlts = displayAlts.filter(alt => itemMatchesAll(alt, effectiveFaction, effectiveSource, effectiveSlot, classId));

      displayedCount++;
      const isTopPick = !isPromoted && (displayStep.rank === 1 || displayStep.isTopPick || displayStep.rank === undefined);

      // Stack Horde on top, Alliance below per user preference
      const heroContentHtml = isDualPick
        ? `${renderHeroEntry(hordePick, false, true, 'horde')}
           <div class="weapon-hero-divider"></div>
           ${renderHeroEntry(alliancePick, false, true, 'alliance')}`
        : renderHeroEntry(displayStep, isPromoted, isTopPick);

      const cardFactionClass = isDualPick
        ? 'faction-dual'
        : (primaryFaction !== 'both' ? 'faction-' + primaryFaction : '');

      const visibleAlts = displayAlts.slice(0, 5);
      const overflowAlts = displayAlts.slice(5);

      return `
        <div class="weapon-step-card ${cardFactionClass}">
          <div class="weapon-step-bracket">
            <span class="bracket-num">Lvl ${escapeHtml(displayStep.levelBracket)}</span>
            <span class="step-seq">#${idx + 1}</span>
          </div>

          <div class="weapon-main-content">
            ${heroContentHtml}

            ${displayAlts && displayAlts.length > 0 ? `
              <div class="weapon-alts-block">
                <span class="alts-label">Alternative Upgrades:</span>
                <div class="alts-tags">
                  ${visibleAlts.map(renderAltTag).join('')}
                </div>
                ${overflowAlts.length > 0 ? `
                  <button type="button" class="alts-expand-toggle" aria-expanded="false" data-count="${overflowAlts.length}" onclick="const p=this.nextElementSibling;const exp=this.getAttribute('aria-expanded')==='true';this.setAttribute('aria-expanded',String(!exp));p.style.display=exp?'none':'flex';this.textContent=exp?'Click Here to see ${overflowAlts.length} more alternatives':'− Show fewer alternatives';">Click Here to see ${overflowAlts.length} more alternatives</button>
                  <div class="alts-pool-container" data-count="${overflowAlts.length}" style="display: none; flex-wrap: wrap; gap: 0.4rem; margin-top: 0.35rem; padding-top: 0.35rem; border-top: 1px dashed rgba(255, 255, 255, 0.08);">
                    ${overflowAlts.map(renderAltTag).join('')}
                  </div>
                ` : ''}
              </div>
            ` : ''}
          </div>
        </div>
      `;
    }).filter(Boolean).join('');

    return { stepCards, displayedCount, currentTrack };
  }

  function renderItemTimeline(classId, datasetKey, cfg) {
    const data = window.WOW_PROGRESSION_DATA?.[datasetKey]?.[classId];
    if (!data || !data.levels || data.levels.length === 0) {
      return `
        <div class="progression-empty-state">
          <p>${escapeHtml(cfg.emptyMsg || '⚠️ No progression roadmap recorded for this class yet.')}</p>
        </div>
      `;
    }

    lastTimelineContext = { classId, datasetKey, cfg };
    const { stepCards, displayedCount, currentTrack } = generateTimelineCards(classId, datasetKey, cfg);

    const isShaman = classId === 'shaman';
    let effectiveFaction = cfg.getFaction ? cfg.getFaction() : 'all';
    if (isShaman && effectiveFaction === 'alliance') effectiveFaction = 'horde';
    const effectiveSource = cfg.getSource ? cfg.getSource() : 'all';
    let effectiveSlot = cfg.getSlot ? cfg.getSlot() : 'all';
    if (classId === 'rogue' && effectiveSlot === 'two-hand') effectiveSlot = 'all';
    if (!['hunter', 'warrior', 'rogue'].includes(classId) && effectiveSlot === 'ranged') effectiveSlot = 'all';

    return `
      <div class="progression-section-wrap">
        <div class="progression-header-banner">
          <div class="progression-header-info">
            <h3><span>${cfg.icon}</span> ${escapeHtml(cfg.title)}</h3>
            <p>${escapeHtml(cfg.desc)}</p>
          </div>
          <div class="progression-header-badge ${currentTrack === 'healer' ? 'healer-header-badge' : currentTrack === 'tank' ? 'tank-header-badge' : ''}">${currentTrack === 'healer' ? '💚 ' : currentTrack === 'tank' ? '🛡️ ' : ''}${displayedCount} Progression Steps</div>
        </div>

        <!-- Controls Bar with Faction, Source, Slot Filter & Track Selection -->
        <div class="progression-controls-bar weapon-controls-bar">
          <div class="faction-filter-toggle" id="${cfg.filterId}">
            <span class="filter-toggle-label">Faction:</span>
            <button type="button" class="faction-chip ${effectiveFaction === 'all' ? 'active' : ''}" data-faction="all" aria-label="Show all items">
              <span class="faction-icon">🌐</span> All
            </button>
            <button type="button" class="faction-chip faction-alliance ${effectiveFaction === 'alliance' ? 'active' : ''}" data-faction="alliance" ${isShaman ? 'disabled style="opacity:0.35;cursor:not-allowed;" title="Shamans are exclusive to the Horde"' : 'aria-label="Filter to Alliance items"'}>
              <span class="faction-icon">${FACTION_ICONS.alliance}</span> Alliance
            </button>
            <button type="button" class="faction-chip faction-horde ${effectiveFaction === 'horde' ? 'active' : ''}" data-faction="horde" aria-label="Filter to Horde items">
              <span class="faction-icon">${FACTION_ICONS.horde}</span> Horde
            </button>
          </div>

          <div class="source-filter-toggle" id="${cfg.sourceFilterId || 'weapon-source-toggle'}">
            <span class="filter-toggle-label">Source:</span>
            <button type="button" class="source-chip ${effectiveSource === 'all' ? 'active' : ''}" data-source="all">
              All Sources
            </button>
            <button type="button" class="source-chip source-dungeon ${effectiveSource === 'dungeon' ? 'active' : ''}" data-source="dungeon">
              🏰 Dungeon Bosses
            </button>
            <button type="button" class="source-chip source-quest ${effectiveSource === 'quest' ? 'active' : ''}" data-source="quest">
              📜 Quests
            </button>
            <button type="button" class="source-chip source-vendor ${effectiveSource === 'vendor-craft' ? 'active' : ''}" data-source="vendor-craft">
              🔨 Vendor &amp; Craft
            </button>
            <button type="button" class="source-chip source-world ${effectiveSource === 'world' ? 'active' : ''}" data-source="world">
              🌍 World &amp; Rares
            </button>
          </div>

          ${datasetKey === 'weapons' ? `
            <div class="slot-filter-toggle" id="weapon-slot-toggle">
              <span class="filter-toggle-label">Slot:</span>
              <button type="button" class="slot-chip ${effectiveSlot === 'all' ? 'active' : ''}" data-slot="all">
                All Slots
              </button>
              <button type="button" class="slot-chip ${effectiveSlot === 'one-hand' ? 'active' : ''}" data-slot="one-hand" title="${['warrior', 'rogue', 'hunter'].includes(classId) ? 'Equippable in Off-Hand (Dual Wield) or Main Hand' : 'One-Handed Weapons (Main Hand + Shield)'}">
                🗡️ One-Hand
              </button>
              <button type="button" class="slot-chip ${effectiveSlot === 'main-hand' ? 'active' : ''}" data-slot="main-hand" title="Main Hand Weapons">
                ⚔️ Main Hand
              </button>
              ${classId !== 'rogue' ? `
                <button type="button" class="slot-chip ${effectiveSlot === 'two-hand' ? 'active' : ''}" data-slot="two-hand">
                  Two-Hand
                </button>
              ` : ''}
              ${['hunter', 'warrior', 'rogue'].includes(classId) ? `
                <button type="button" class="slot-chip ${effectiveSlot === 'ranged' ? 'active' : ''}" data-slot="ranged">
                  🏹 Ranged
                </button>
              ` : ''}
            </div>
          ` : ''}

          ${data.tracks && data.tracks.length > 1 ? `
            <div class="progression-track-tabs role-pill-box">
              <span class="track-tab-label">Role:</span>
              ${data.tracks.map(tr => `
                <button type="button" class="progression-track-btn ${tr.id === 'healer' ? 'track-btn-healer' : tr.id === 'tank' ? 'track-btn-tank' : 'track-btn-dps'} ${currentTrack === tr.id ? 'active' : ''}" data-track="${tr.id}" data-key="${datasetKey}" data-class="${classId}">
                  ${escapeHtml(tr.name)}
                </button>
              `).join('')}
            </div>
          ` : ''}
        </div>

        ${window.WOW_PROGRESSION_FILTER ? window.WOW_PROGRESSION_FILTER.renderDrawerHtml() : ''}

        <!-- Timeline Grid -->
        <div class="weapon-timeline-container">
          ${stepCards || (window.WOW_PROGRESSION_FILTER ? window.WOW_PROGRESSION_FILTER.renderEmptyStateHtml() : `
            <div class="progression-empty-state">
              <p>No items found matching the selected filters.</p>
            </div>
          `)}
        </div>
      </div>
    `;
  }

  // Weapon Progression Renderer
  function renderWeapons(classId) {
    return renderItemTimeline(classId, 'weapons', {
      title: 'Level 1 to 60 Weapon Upgrade Path',
      icon: '⚔️',
      desc: 'Optimal weapon progression every 2–4 levels: exact quest rewards, dungeon boss drops, vendor purchases, and craftable spikes.',
      emptyMsg: '⚠️ No weapon progression roadmap recorded for this class yet.',
      filterId: 'weapon-faction-toggle',
      sourceFilterId: 'weapon-source-toggle',
      getFaction: () => activeWeaponFaction,
      getSource: () => activeWeaponSource,
      getSlot: () => activeWeaponSlot
    });
  }

  // Wand Progression Renderer
  function renderWands(classId) {
    return renderItemTimeline(classId, 'wands', {
      title: 'Level 1 to 60 Wand Upgrade Path',
      icon: '🪄',
      desc: 'Dedicated wand progression for spellcasters: optimal wand spikes every bracket, fast shoot speeds, quest rewards, and high-DPS crafting.',
      emptyMsg: '⚠️ No wand progression recorded for this class in current Beta Build.',
      filterId: 'wand-faction-toggle',
      sourceFilterId: 'wand-source-toggle',
      getFaction: () => activeWandFaction,
      getSource: () => activeWandSource
    });
  }

  // Off-Hand / Shield Progression Renderer
  function renderOffhands(classId) {
    const isShieldClass = ['warrior', 'paladin', 'shaman'].includes(classId);
    const isDruid = classId === 'druid';
    const isRogue = classId === 'rogue';
    const isHunter = classId === 'hunter';

    let title = 'Level 1 to 60 Caster Off-Hand Progression';
    let icon = '🔮';
    let desc = 'Best-in-slot held in off-hand frills, grimoires, orbs, and tomes for leveling casters: spell power, intellect, spirit, and mana regeneration.';
    let emptyMsg = '⚠️ No off-hand progression recorded for this class in current Beta Build.';

    if (isShieldClass) {
      title = 'Level 1 to 60 Shield Upgrade Path';
      icon = '🛡️';
      desc = 'Best-in-slot shields for leveling and tanking: optimal armor, block value, stamina, and key dungeon boss drops.';
      emptyMsg = '⚠️ No shield progression recorded for this class in current Beta Build.';
    } else if (isDruid) {
      title = 'Level 1 to 60 Off-Hand & Idol Progression';
      icon = '🔮';
      desc = 'Held-in-off-hand tomes, furbolg pouches, and class idols for leveling Feral, Balance, and Restoration Druids.';
    } else if (isRogue) {
      return `
        <div class="progression-empty-state">
          <div style="font-size: 2rem; margin-bottom: 8px;">🗡️</div>
          <p><strong>Rogues dual-wield One-Hand weapons in their off-hand!</strong></p>
          <p style="color: var(--text-secondary, #9da3af); max-width: 540px; margin: 8px auto 0;">
            Use the <strong>Weapon Path</strong> tab with the <strong>🗡️ One-Hand</strong> slot filter to view all fast off-hand daggers and swords optimized for poison application and energy efficiency.
          </p>
        </div>
      `;
    } else if (isHunter) {
      return `
        <div class="progression-empty-state">
          <div style="font-size: 2rem; margin-bottom: 8px;">🏹</div>
          <p><strong>Hunters equip ranged weapons and two-handed stat-sticks!</strong></p>
          <p style="color: var(--text-secondary, #9da3af); max-width: 540px; margin: 8px auto 0;">
            Use the <strong>Weapon Path</strong> tab with the <strong>Two-Hand</strong> or <strong>🏹 Ranged</strong> slot filter to view your optimal leveling firepower.
          </p>
        </div>
      `;
    }

    return renderItemTimeline(classId, 'offhands', {
      title,
      icon,
      desc,
      emptyMsg,
      filterId: 'offhand-faction-toggle',
      sourceFilterId: 'offhand-source-toggle',
      getFaction: () => activeOffhandFaction,
      getSource: () => activeOffhandSource
    });
  }

  // 3. Macros Renderer
  function renderMacros(classId) {
    const macros = window.WOW_PROGRESSION_DATA?.macros?.[classId] || [];
    if (macros.length === 0) {
      return `
        <div class="progression-empty-state">
          <p>⚠️ No macros recorded for this class yet.</p>
        </div>
      `;
    }

    const categories = ['all', 'Combat', 'Mouseover', 'Pet Control', 'General'];
    const filteredMacros = macros.filter(m => {
      if (activeMacroCategory !== 'all' && m.category !== activeMacroCategory) {
        return false;
      }
      if (activeMacroSearchQuery) {
        const q = activeMacroSearchQuery.toLowerCase();
        return m.title.toLowerCase().includes(q) || m.code.toLowerCase().includes(q) || m.desc.toLowerCase().includes(q);
      }
      return true;
    });

    return `
      <div class="progression-section-wrap">
        <div class="progression-header-banner">
          <div class="progression-header-info">
            <h3><span>📜</span> 1-Click Copyable Class & Spec Macros</h3>
            <p>Battle-tested macros for PvE rotations, mouseover healing, stance management, pet control, and PvP burst modifiers.</p>
          </div>
          <div class="progression-header-badge">${macros.length} Macros Available</div>
        </div>

        <div class="progression-controls-bar">
          <div class="progression-filter-chips" id="macro-category-chips">
            ${categories.map(cat => `
              <button type="button" class="progression-chip ${activeMacroCategory === cat ? 'active' : ''}" data-cat="${cat}">
                ${cat === 'all' ? 'All Macros' : cat}
              </button>
            `).join('')}
          </div>
          <div class="progression-search-box">
            <input type="text" id="macro-search-input" placeholder="Search macros..." value="${escapeHtml(activeMacroSearchQuery)}" aria-label="Search macros" />
            ${activeMacroSearchQuery ? `<button type="button" id="btn-clear-macro-search" class="btn-clear-search">✕</button>` : ''}
          </div>
        </div>

        <!-- Macro Cards Grid -->
        <div class="macro-cards-grid">
          ${filteredMacros.map(macro => `
            <div class="macro-card">
              <div class="macro-card-header">
                <div>
                  <h4 class="macro-card-title">${escapeHtml(macro.title)}</h4>
                  <span class="macro-category-badge">${escapeHtml(macro.category)}</span>
                </div>
                <button type="button" class="btn-copy-macro" data-code="${escapeHtml(macro.code)}">
                  <span>📋</span> Copy Macro
                </button>
              </div>

              ${macro.desc ? `<p class="macro-card-desc">${escapeHtml(macro.desc)}</p>` : ''}

              <div class="macro-code-wrapper">
                <pre class="macro-code-block"><code>${escapeHtml(macro.code)}</code></pre>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  // 4. Milestones Renderer
  function renderMilestones(classId) {
    const brackets = window.WOW_PROGRESSION_DATA?.milestones?.[classId] || [];
    if (brackets.length === 0) {
      return `
        <div class="progression-empty-state">
          <p>⚠️ No milestones recorded for this class yet.</p>
        </div>
      `;
    }

    return `
      <div class="progression-section-wrap">
        <div class="progression-header-banner">
          <div class="progression-header-info">
            <h3><span>🗺️</span> 1 to 60 Leveling Milestones & Class Quests</h3>
            <p>Every critical quest unlock, form training, totem trial, mount speed milestone, and dungeon tier progression from Level 1 to 60.</p>
          </div>
          <div class="progression-header-badge">Interactive Roadmap</div>
        </div>

        <div class="milestones-timeline-grid">
          ${brackets.map((b, idx) => `
            <div class="milestone-bracket-card">
              <div class="milestone-bracket-header">
                <div class="milestone-step-marker">${idx + 1}</div>
                <div class="milestone-bracket-title">
                  <h4>Level ${escapeHtml(b.bracket)}: ${escapeHtml(b.title)}</h4>
                </div>
              </div>
              <ul class="milestone-items-list">
                ${b.universal.map((item, itemIdx) => {
                  const checkId = `milestone-${classId}-${idx}-${itemIdx}`;
                  return `
                    <li class="milestone-check-item">
                      <label class="milestone-label" for="${checkId}">
                        <input type="checkbox" id="${checkId}" class="milestone-checkbox" data-milestone-key="${checkId}" />
                        <span class="milestone-text">${escapeHtml(item)}</span>
                      </label>
                    </li>
                  `;
                }).join('')}
              </ul>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  // Master Subtab Dispatcher
  function renderProgressionSubtab(subtab, cData) {
    hideWeaponTooltip();
    const classId = cData.id;
    if (subtab === 'spellbook') return renderSpellbook(classId);
    if (subtab === 'weapons') return renderWeapons(classId);
    if (subtab === 'wands') return renderWands(classId);
    if (subtab === 'offhands') return renderOffhands(classId);
    if (subtab === 'macros') return renderMacros(classId);
    if (subtab === 'milestones') return renderMilestones(classId);
    return '';
  }

  // Setup Event Listeners
  function setupEventListeners(scope = document, onUpdate = null) {
    const root = scope || document;
    const triggerUpdate = () => {
      if (typeof onUpdate === 'function') {
        onUpdate();
      } else {
        window.renderDeepDiveContent?.();
      }
    };

    // 1. Spellbook filters
    root.querySelectorAll('#spellbook-tier-chips .progression-chip').forEach(btn => {
      btn.addEventListener('click', () => {
        hideWeaponTooltip();
        activeSpellFilterLevel = btn.getAttribute('data-tier');
        triggerUpdate();
      });
    });

    const spellSearchInput = root.querySelector ? root.querySelector('#spellbook-search-input') : document.getElementById('spellbook-search-input');
    if (spellSearchInput) {
      spellSearchInput.addEventListener('input', (e) => {
        hideWeaponTooltip();
        activeSpellSearchQuery = e.target.value;
        triggerUpdate();
      });
    }

    const clearSpellSearch = root.querySelector ? root.querySelector('#btn-clear-spell-search') : document.getElementById('btn-clear-spell-search');
    if (clearSpellSearch) {
      clearSpellSearch.addEventListener('click', () => {
        hideWeaponTooltip();
        activeSpellSearchQuery = '';
        triggerUpdate();
      });
    }

    // 2. Weapon & Item controls (Faction filter & Track buttons)
    root.querySelectorAll('#weapon-faction-toggle .faction-chip').forEach(btn => {
      btn.addEventListener('click', () => {
        hideWeaponTooltip();
        activeWeaponFaction = btn.getAttribute('data-faction') || 'all';
        triggerUpdate();
      });
    });

    root.querySelectorAll('#wand-faction-toggle .faction-chip').forEach(btn => {
      btn.addEventListener('click', () => {
        hideWeaponTooltip();
        activeWandFaction = btn.getAttribute('data-faction') || 'all';
        triggerUpdate();
      });
    });

    root.querySelectorAll('#offhand-faction-toggle .faction-chip').forEach(btn => {
      btn.addEventListener('click', () => {
        hideWeaponTooltip();
        activeOffhandFaction = btn.getAttribute('data-faction') || 'all';
        triggerUpdate();
      });
    });

    root.querySelectorAll('#weapon-source-toggle .source-chip').forEach(btn => {
      btn.addEventListener('click', () => {
        hideWeaponTooltip();
        activeWeaponSource = btn.getAttribute('data-source') || 'all';
        triggerUpdate();
      });
    });

    root.querySelectorAll('#wand-source-toggle .source-chip').forEach(btn => {
      btn.addEventListener('click', () => {
        hideWeaponTooltip();
        activeWandSource = btn.getAttribute('data-source') || 'all';
        triggerUpdate();
      });
    });

    root.querySelectorAll('#offhand-source-toggle .source-chip').forEach(btn => {
      btn.addEventListener('click', () => {
        hideWeaponTooltip();
        activeOffhandSource = btn.getAttribute('data-source') || 'all';
        triggerUpdate();
      });
    });

    root.querySelectorAll('#weapon-slot-toggle .slot-chip').forEach(btn => {
      btn.addEventListener('click', () => {
        hideWeaponTooltip();
        activeWeaponSlot = btn.getAttribute('data-slot') || 'all';
        triggerUpdate();
      });
    });

    root.querySelectorAll('.progression-track-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        hideWeaponTooltip();
        const track = btn.getAttribute('data-track');
        const key = btn.getAttribute('data-key') || 'weapons';
        const cId = btn.getAttribute('data-class') || window.selectedDeepDiveClassId || 'hunter';
        activeWeaponTrack[`${cId}_${key}`] = track;
        triggerUpdate();
      });
    });

    // 2.5 Advanced Progression Filter Engine Delegation
    if (window.WOW_PROGRESSION_FILTER && window.WOW_PROGRESSION_FILTER.setupEventListeners) {
      window.WOW_PROGRESSION_FILTER.setupEventListeners(root, (isFilterOnly) => {
        if (isFilterOnly && lastTimelineContext) {
          const { stepCards, displayedCount, currentTrack } = generateTimelineCards(
            lastTimelineContext.classId,
            lastTimelineContext.datasetKey,
            lastTimelineContext.cfg
          );
          const timelineEl = root.querySelector ? root.querySelector('.weapon-timeline-container') : null;
          if (timelineEl) {
            timelineEl.innerHTML = stepCards || (window.WOW_PROGRESSION_FILTER.renderEmptyStateHtml ? window.WOW_PROGRESSION_FILTER.renderEmptyStateHtml() : '<div class="progression-empty-state"><p>No items found matching the selected filters.</p></div>');
            const emptyResetBtn = timelineEl.querySelector('#btn-empty-reset-filters');
            if (emptyResetBtn) {
              emptyResetBtn.onclick = () => {
                const drawerReset = root.querySelector('#btn-reset-advanced-filters');
                if (drawerReset) drawerReset.click();
                else {
                  window.WOW_PROGRESSION_FILTER.resetFilters();
                  triggerUpdate();
                }
              };
            }
            timelineEl.querySelectorAll('.alts-expand-toggle').forEach(btn => {
              btn.onclick = (e) => {
                e.stopPropagation();
                const container = btn.nextElementSibling;
                if (!container) return;
                const isExp = btn.getAttribute('aria-expanded') === 'true';
                btn.setAttribute('aria-expanded', String(!isExp));
                container.style.display = isExp ? 'none' : 'flex';
                const count = btn.getAttribute('data-count') || '';
                btn.textContent = isExp ? `Click Here to see ${count} more alternatives` : '− Show fewer alternatives';
              };
            });
            timelineEl.querySelectorAll('[data-weapon-target="true"]').forEach(el => {
              el.addEventListener('mouseenter', (e) => showWeaponTooltip(e, el));
              el.addEventListener('mousemove', (e) => moveWeaponTooltip(e));
              el.addEventListener('mouseleave', hideWeaponTooltip);
            });
            if (typeof window !== 'undefined' && window.$WowheadPower && typeof window.$WowheadPower.refreshLinks === 'function') {
              try { window.$WowheadPower.refreshLinks(); } catch {}
            }
          }
          const badgeEl = root.querySelector ? root.querySelector('.progression-header-badge') : null;
          if (badgeEl) {
            badgeEl.className = `progression-header-badge ${currentTrack === 'healer' ? 'healer-header-badge' : currentTrack === 'tank' ? 'tank-header-badge' : ''}`;
            badgeEl.innerHTML = `${currentTrack === 'healer' ? '💚 ' : currentTrack === 'tank' ? '🛡️ ' : ''}${displayedCount} Progression Steps`;
          }
        } else {
          triggerUpdate();
        }
      });
    }

    // Expandable alternatives toggle buttons
    root.querySelectorAll('.alts-expand-toggle').forEach(btn => {
      btn.onclick = (e) => {
        e.stopPropagation();
        const container = btn.nextElementSibling;
        if (!container) return;
        const isExp = btn.getAttribute('aria-expanded') === 'true';
        btn.setAttribute('aria-expanded', String(!isExp));
        container.style.display = isExp ? 'none' : 'flex';
        const count = btn.getAttribute('data-count') || '';
        btn.textContent = isExp ? `Click Here to see ${count} more alternatives` : '− Show fewer alternatives';
      };
    });

    // Weapon progression rich mouseover tooltips
    root.querySelectorAll('[data-weapon-target="true"]').forEach(el => {
      el.addEventListener('mouseenter', (e) => showWeaponTooltip(e, el));
      el.addEventListener('mousemove', (e) => moveWeaponTooltip(e));
      el.addEventListener('mouseleave', hideWeaponTooltip);
    });

    // Refresh Wowhead tooltips if Wowhead power.js script is loaded
    if (typeof window !== 'undefined' && window.$WowheadPower && typeof window.$WowheadPower.refreshLinks === 'function') {
      try {
        window.$WowheadPower.refreshLinks();
      } catch {
        // Safe no-op
      }
    }

    // 3. Macro category filters & copy button
    root.querySelectorAll('#macro-category-chips .progression-chip').forEach(btn => {
      btn.addEventListener('click', () => {
        hideWeaponTooltip();
        activeMacroCategory = btn.getAttribute('data-cat');
        triggerUpdate();
      });
    });

    const macroSearchInput = root.querySelector ? root.querySelector('#macro-search-input') : document.getElementById('macro-search-input');
    if (macroSearchInput) {
      macroSearchInput.addEventListener('input', (e) => {
        activeMacroSearchQuery = e.target.value;
        triggerUpdate();
      });
    }

    const clearMacroSearch = root.querySelector ? root.querySelector('#btn-clear-macro-search') : document.getElementById('btn-clear-macro-search');
    if (clearMacroSearch) {
      clearMacroSearch.addEventListener('click', () => {
        activeMacroSearchQuery = '';
        triggerUpdate();
      });
    }

    // Copy macro action
    root.querySelectorAll('.btn-copy-macro').forEach(btn => {
      btn.addEventListener('click', async () => {
        const code = btn.getAttribute('data-code');
        if (code) {
          try {
            await (window.copyTextToClipboard ? window.copyTextToClipboard(code) : navigator.clipboard.writeText(code));
            const originalText = btn.innerHTML;
            btn.innerHTML = '<span>✓</span> Copied!';
            btn.classList.add('copied');
            if (window.showToast) window.showToast('Macro copied to clipboard!');
            setTimeout(() => {
              btn.innerHTML = originalText;
              btn.classList.remove('copied');
            }, 2000);
          } catch {
            if (window.showToast) window.showToast('Failed to copy macro.');
          }
        }
      });
    });

    // 4. Milestone persistent checkboxes
    root.querySelectorAll('.milestone-checkbox').forEach(cb => {
      const key = cb.getAttribute('data-milestone-key');
      const saved = localStorage.getItem(`wow_milestone_${key}`);
      if (saved === '1') cb.checked = true;

      cb.addEventListener('change', () => {
        if (cb.checked) {
          localStorage.setItem(`wow_milestone_${key}`, '1');
        } else {
          localStorage.removeItem(`wow_milestone_${key}`);
        }
      });
    });
  }

  // Export module
  window.WOW_DEEPDIVES_PROGRESSION = {
    renderProgressionSubtab,
    renderWeapons,
    renderWands,
    renderOffhands,
    setupEventListeners,
    hideWeaponTooltip,
    setWeaponFaction: (f) => { activeWeaponFaction = f; },
    setWeaponSource: (s) => { activeWeaponSource = s; },
    setWeaponSlot: (s) => { activeWeaponSlot = s; },
    setWandFaction: (f) => { activeWandFaction = f; },
    setWandSource: (s) => { activeWandSource = s; },
    setOffhandFaction: (f) => { activeOffhandFaction = f; },
    setOffhandSource: (s) => { activeOffhandSource = s; }
  };

})();
