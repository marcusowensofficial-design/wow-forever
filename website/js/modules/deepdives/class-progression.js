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
  let activeWandFaction = 'all';
  let activeOffhandFaction = 'all';
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
      { id: 'all', label: 'All Levels (1–60)' },
      { id: '1-10', label: 'Levels 1–10', min: 1, max: 10 },
      { id: '11-20', label: 'Levels 11–20', min: 11, max: 20 },
      { id: '21-30', label: 'Levels 21–30', min: 21, max: 30 },
      { id: '31-40', label: 'Levels 31–40', min: 31, max: 40 },
      { id: '41-50', label: 'Levels 41–50', min: 41, max: 50 },
      { id: '51-60', label: 'Levels 51–60', min: 51, max: 60 }
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
    if (/^[+-]\d+%?\s+(strength|agility|stamina|intellect|spirit|str|agi|sta|int|spi|spell power|sp|attack power|ap|healing|armor|crit|hit|defense|res|penetration|fire|frost|shadow|nature|arcane|holy|mana regeneration|health regeneration|spell damage|healing spells)/i.test(s)) return true;
    if (/^\d+%?\s+(mp5|sp|ap|crit|hit|spell power|healing)/i.test(s)) return true;
    if (/^(strength|agility|stamina|intellect|spirit|str|agi|sta|int|spi|spell power|sp|attack power|ap|defense|armor)\s+[+-]\d+/i.test(s)) return true;
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
            for (const step of cData.levels || []) {
              registerItem(step);
              for (const alt of step.alts || []) {
                registerItem(alt);
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
    return `<div class="wow-tip-stat" style="color: #fff;">${escapeHtml(s)}</div>`;
  }

  function parseStatsTokens(statsStr, altValStr, detailStr) {
    if (statsStr) {
      const tokens = statsStr.split(/,(?=\s*(?:[+-]|\d+\s*(?:mp5|sp|ap|crit|hit)|equip|use|chance on hit|\b(?:strength|agility|stamina|intellect|spirit|str|agi|sta|int|spi)\b))/i)
        .map(s => s.trim())
        .filter(Boolean);
      const valid = tokens.filter(isRealStatToken);
      if (valid.length > 0) return valid;
    }
    const src = altValStr || detailStr || '';
    if (!src) return [];
    const paren = src.match(/\(([^)]+)\)/);
    if (paren) {
      const tokens = paren[1].split(/,(?=\s*(?:[+-]|\d+\s*(?:mp5|sp|ap|crit|hit)|equip|use|chance on hit|\b(?:strength|agility|stamina|intellect|spirit|str|agi|sta|int|spi)\b))/i)
        .map(s => s.trim())
        .filter(Boolean);
      const valid = tokens.filter(isRealStatToken);
      if (valid.length > 0) return valid;
    }
    const left = src.split(/\s*[-–—:]\s*/)[0] || '';
    const tokens = left.split(/,(?=\s*(?:[+-]|\d+\s*(?:mp5|sp|ap|crit|hit)|equip|use|chance on hit|\b(?:strength|agility|stamina|intellect|spirit|str|agi|sta|int|spi)\b))/i)
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
      const subTokens = trimmed.split(/,(?=\s*(?:[+-]|\d+\s*(?:mp5|sp|ap|crit|hit)|equip|use|chance on hit|\b(?:strength|agility|stamina|intellect|spirit|str|agi|sta|int|spi)\b))/i)
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

      html += `<div class="wow-tip-lines">`;
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
        } else if (trimmed.startsWith('(') && trimmed.endsWith(')') && trimmed.toLowerCase().includes('damage per second')) {
          html += `<div class="wow-tip-dps">${escapeHtml(trimmed)}</div>`;
          if (!linesHasStats && !statsInjected && statTokens.length > 0) {
            statTokens.forEach(st => {
              html += formatStatLine(st);
            });
            statsInjected = true;
          }
        } else if (trimmed.startsWith('Binds when')) {
          html += `<div class="wow-tip-bind">${escapeHtml(trimmed)}</div>`;
        } else if (trimmed.startsWith('Requires Level')) {
          if (!linesHasStats && !statsInjected && statTokens.length > 0) {
            statTokens.forEach(st => {
              html += formatStatLine(st);
            });
            statsInjected = true;
          }
          html += `<div class="wow-tip-req" style="color: #fff; font-size: 0.8rem; margin: 0.2rem 0;">${escapeHtml(trimmed)}</div>`;
        } else if (trimmed.startsWith('Equip:') || trimmed.startsWith('Chance on hit:') || trimmed.startsWith('Use:')) {
          if (!linesHasStats && !statsInjected && statTokens.length > 0) {
            statTokens.forEach(st => {
              html += formatStatLine(st);
            });
            statsInjected = true;
          }
          html += `<div class="wow-tip-equip">${escapeHtml(trimmed)}</div>`;
        } else if (trimmed.startsWith('Sell Price:')) {
          html += `<div class="wow-tip-price" style="color: #94a3b8; font-size: 0.75rem; margin-top: 0.25rem;">${escapeHtml(trimmed)}</div>`;
        } else if (trimmed.startsWith('+') || /Strength|Agility|Stamina|Intellect|Spirit/.test(trimmed)) {
          html += `<div class="wow-tip-stat" style="color: #fff;">${escapeHtml(trimmed)}</div>`;
        } else {
          html += `<div class="wow-tip-generic" style="color: #cbd5e1;">${escapeHtml(trimmed)}</div>`;
        }
      });
      if (!linesHasStats && !statsInjected && statTokens.length > 0) {
        statTokens.forEach(st => {
          html += formatStatLine(st);
        });
        statsInjected = true;
      }
      html += `</div>`;
    } else {
      const isVendorOrCraft = (sourceTitle + ' ' + sourceDetail + ' ' + altVal).toLowerCase();
      const isBindsEquip = isVendorOrCraft.includes('world drop') || isVendorOrCraft.includes('auction') || isVendorOrCraft.includes('craft') || isVendorOrCraft.includes('vendor');
      if (qualClass !== 'q1') {
        html += `<div class="wow-tip-bind">${isBindsEquip ? 'Binds when equipped' : 'Binds when picked up'}</div>`;
      }

      const slotText = getWeaponSlotText(weaponType);
      html += `
        <div class="wow-tip-type-row">
          <span>${escapeHtml(slotText)}</span>
          <span>${escapeHtml(weaponType || 'Weapon')}</span>
        </div>
      `;

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

  // 2. Generic Item Timeline Renderer (Weapons, Wands, Off-Hands)
  function renderItemTimeline(classId, datasetKey, cfg) {
    const data = window.WOW_PROGRESSION_DATA?.[datasetKey]?.[classId];
    if (!data || !data.levels || data.levels.length === 0) {
      return `
        <div class="progression-empty-state">
          <p>${escapeHtml(cfg.emptyMsg || '⚠️ No progression roadmap recorded for this class yet.')}</p>
        </div>
      `;
    }

    const currentTrack = activeWeaponTrack[`${classId}_${datasetKey}`] || data.tracks?.[0]?.id || 'primary';
    const activeLevelList = (currentTrack === 'healer' && data.healingLevels)
      ? data.healingLevels
      : ((data.tracksData && data.tracksData[currentTrack]) || data.levels);

    // Faction restrictions for faction-exclusive classes
    const isPaladin = classId === 'paladin';
    const isShaman = classId === 'shaman';
    let effectiveFaction = cfg.getFaction ? cfg.getFaction() : 'all';
    if (isPaladin && effectiveFaction === 'horde') effectiveFaction = 'alliance';
    if (isShaman && effectiveFaction === 'alliance') effectiveFaction = 'horde';

    // Build timeline items with faction awareness
    let displayedCount = 0;
    const stepCards = activeLevelList.map((step, idx) => {
      let displayStep = { ...step };
      let displayAlts = (step.alts || []).slice();

      if (effectiveFaction !== 'all') {
        const stepFaction = step.faction || 'both';
        let matchIdx = -1;

        if (stepFaction !== 'both' && stepFaction !== effectiveFaction) {
          // If primary does not match active faction, look for a matching alt to promote:
          // 1. Prefer alt matching effectiveFaction
          // 2. Fallback to neutral alt available to both factions
          matchIdx = displayAlts.findIndex(a => a.faction === effectiveFaction);
          if (matchIdx === -1) {
            matchIdx = displayAlts.findIndex(a => (a.faction || 'both') === 'both');
          }
        } else if (effectiveFaction === 'horde') {
          // For Horde: promote Staff of Orgrimmar (Horde BiS Caster Staff) over neutral staves in brackets 13-18
          matchIdx = displayAlts.findIndex(a => a.faction === 'horde' && (a.itemId === 15444 || a.name === 'Staff of Orgrimmar'));
        }

        if (matchIdx !== -1) {
          const altMatch = displayAlts[matchIdx];
          const valStr = altMatch.value || '';
          const dpsMatch = altMatch.dps || valStr.match(/([\d.]+\s*DPS)/i)?.[1] || '';
          const spdMatch = altMatch.speed || valStr.match(/([\d.]+s)/i)?.[1]?.replace('s', '') || '';

          const demotedStep = {
            name: step.name,
            itemId: step.itemId,
            icon: step.icon,
            weaponType: step.weaponType,
            speed: step.speed,
            dps: step.dps,
            stats: step.stats,
            lines: step.lines,
            source: step.source,
            faction: step.faction || 'both',
            quality: step.quality,
            iLvl: step.iLvl,
            reqLevel: step.reqLevel,
            value: `${step.dps || ''}, ${step.speed ? step.speed + 's' : ''} - ${step.source?.title || ''}`
          };

          displayStep = {
            ...step,
            itemId: altMatch.itemId || null,
            name: altMatch.name,
            icon: altMatch.icon || step.icon,
            weaponType: altMatch.weaponType || step.weaponType,
            speed: spdMatch || altMatch.speed || step.speed,
            dps: dpsMatch || (altMatch.dps ? `${altMatch.dps} DPS` : step.dps),
            stats: altMatch.stats || step.stats,
            lines: altMatch.lines || null,
            source: altMatch.source || { kind: 'quest', title: altMatch.name, detail: altMatch.value || '' },
            faction: altMatch.faction || effectiveFaction,
            quality: altMatch.quality || step.quality,
            iLvl: altMatch.iLvl || step.iLvl,
            reqLevel: altMatch.reqLevel || step.reqLevel
          };
          displayAlts = displayAlts.filter((_, i) => i !== matchIdx);
          if (stepFaction === 'both') {
            displayAlts.push(demotedStep);
          }
        } else if (stepFaction !== 'both' && stepFaction !== effectiveFaction) {
          return '';
        }
        // Filter alts to only show active faction or both
        displayAlts = displayAlts.filter(alt => {
          const f = alt.faction || 'both';
          return f === 'both' || f === effectiveFaction;
        });
      }

      displayedCount++;
      const sourceKindClass = `source-${displayStep.source?.kind || 'drop'}`;
      const wowheadUrl = displayStep.itemId ? `https://www.wowhead.com/forever/item=${displayStep.itemId}` : '#';
      const primaryFaction = displayStep.faction || 'both';
      const factionBadgeHtml = primaryFaction === 'alliance'
        ? `<span class="item-faction-badge faction-alliance" title="Alliance Only">${FACTION_ICONS.alliance} Alliance</span>`
        : primaryFaction === 'horde'
        ? `<span class="item-faction-badge faction-horde" title="Horde Only">${FACTION_ICONS.horde} Horde</span>`
        : '';

      return `
        <div class="weapon-step-card ${primaryFaction !== 'both' ? 'faction-' + primaryFaction : ''}">
          <div class="weapon-step-bracket">
            <span class="bracket-num">Lvl ${escapeHtml(displayStep.levelBracket)}</span>
            <span class="step-seq">#${idx + 1}</span>
          </div>

          <div class="weapon-main-content">
            <div class="weapon-item-hero"
                 data-weapon-target="true"
                 data-item-name="${escapeHtml(displayStep.name)}"
                 data-item-id="${displayStep.itemId || ''}"
                 data-quality="${escapeHtml(displayStep.quality || '')}"
                 data-ilvl="${displayStep.iLvl || ''}"
                 data-req-level="${displayStep.reqLevel || ''}"
                 data-weapon-type="${escapeHtml(displayStep.weaponType || '')}"
                 data-speed="${escapeHtml(displayStep.speed || '')}"
                 data-dps="${escapeHtml(displayStep.dps || '')}"
                 data-stats="${escapeHtml(displayStep.stats || '')}"
                 data-source-title="${escapeHtml(displayStep.source?.title || '')}"
                 data-source-detail="${escapeHtml(displayStep.source?.detail || '')}"
                 data-source-kind="${escapeHtml(displayStep.source?.kind || '')}"
                 data-faction="${escapeHtml(primaryFaction)}">
              <a href="${wowheadUrl}" target="_blank" rel="noopener noreferrer" class="weapon-icon-link" data-wowhead="domain=forever&item=${displayStep.itemId || ''}">
                <img src="${getIconUrl(displayStep.icon)}" alt="${escapeHtml(displayStep.name)}" class="weapon-icon" loading="lazy" />
              </a>
              <div class="weapon-item-info">
                <div class="weapon-item-header">
                  <a href="${wowheadUrl}" target="_blank" rel="noopener noreferrer" class="weapon-title-link" data-wowhead="domain=forever&item=${displayStep.itemId || ''}">
                    ${escapeHtml(displayStep.name)}
                  </a>
                  <span class="weapon-type-badge">${escapeHtml(displayStep.weaponType)}</span>
                  ${factionBadgeHtml}
                </div>
                <div class="weapon-stats-row">
                  ${displayStep.speed ? `<span class="stat-pill">Speed: ${escapeHtml(displayStep.speed)}</span>` : ''}
                  ${displayStep.dps ? `<span class="stat-pill dps-pill">DPS: ${escapeHtml(displayStep.dps)}</span>` : ''}
                  ${displayStep.stats ? (() => {
                    const isHeal = /healing\s+(?:done\s+by\s+(?:up\s+to\s+)?)?(\d+)/i.test(displayStep.stats);
                    return `<span class="stat-pill stats-pill ${isHeal ? 'healing-highlight-pill' : ''}" title="${isHeal ? 'Optimal Healing item (Healing > Spell Damage)' : ''}">${isHeal ? '💚 ' : ''}${escapeHtml(displayStep.stats)}</span>`;
                  })() : ''}
                </div>
              </div>
            </div>

            <div class="weapon-source-block ${sourceKindClass}">
              <span class="source-tag">${escapeHtml((displayStep.source?.kind || 'drop').toUpperCase())}</span>
              <span class="source-title"><strong>${escapeHtml(displayStep.source?.title || 'Unknown Source')}</strong></span>
              ${displayStep.source?.detail ? `<span class="source-detail">${escapeHtml(displayStep.source.detail)}</span>` : ''}
            </div>

            ${displayAlts && displayAlts.length > 0 ? `
              <div class="weapon-alts-block">
                <span class="alts-label">Alternative Upgrades:</span>
                <div class="alts-tags">
                  ${displayAlts.map(alt => {
                    const altUrl = alt.itemId ? `https://www.wowhead.com/forever/item=${alt.itemId}` : null;
                    const altFaction = alt.faction || 'both';
                    const altBadge = altFaction === 'alliance'
                      ? `<span class="item-faction-badge faction-alliance" title="Alliance Only">${FACTION_ICONS.alliance}</span>`
                      : altFaction === 'horde'
                      ? `<span class="item-faction-badge faction-horde" title="Horde Only">${FACTION_ICONS.horde}</span>`
                      : '';
                    const altStats = alt.stats || alt.value || '';
                    const isAltHeal = /healing\s+(?:done\s+by\s+(?:up\s+to\s+)?)?(\d+)/i.test(altStats);
                    return `
                      <span class="alt-tag ${altFaction !== 'both' ? 'alt-faction-' + altFaction : ''} ${isAltHeal ? 'alt-healing-tag' : ''}"
                            data-weapon-target="true"
                            data-item-name="${escapeHtml(alt.name)}"
                            data-item-id="${alt.itemId || ''}"
                            data-quality="${escapeHtml(alt.quality || '')}"
                            data-ilvl="${alt.iLvl || ''}"
                            data-req-level="${alt.reqLevel || ''}"
                            data-weapon-type="${escapeHtml(alt.weaponType || '')}"
                            data-speed="${escapeHtml(alt.speed || '')}"
                            data-dps="${escapeHtml(alt.dps || '')}"
                            data-stats="${escapeHtml(alt.stats || '')}"
                            data-alt-val="${escapeHtml(alt.value || '')}"
                            data-faction="${escapeHtml(altFaction)}">
                        ${altBadge}
                        ${isAltHeal ? '<span class="alt-healer-icon" title="Optimal for Healers">💚</span> ' : ''}
                        ${altUrl ? `
                          <a href="${altUrl}" target="_blank" rel="noopener noreferrer" class="alt-link" data-wowhead="domain=forever&item=${alt.itemId || ''}">
                            ${escapeHtml(alt.name)}
                          </a>
                        ` : `
                          <span class="alt-name">${escapeHtml(alt.name)}</span>
                        `}
                        ${alt.value ? `<span class="alt-val">(${escapeHtml(alt.value)})</span>` : ''}
                      </span>
                    `;
                  }).join('')}
                </div>
              </div>
            ` : ''}
          </div>
        </div>
      `;
    }).filter(Boolean).join('');

    return `
      <div class="progression-section-wrap">
        <div class="progression-header-banner">
          <div class="progression-header-info">
            <h3><span>${cfg.icon}</span> ${escapeHtml(cfg.title)}</h3>
            <p>${escapeHtml(cfg.desc)}</p>
          </div>
          <div class="progression-header-badge ${currentTrack === 'healer' ? 'healer-header-badge' : ''}">${currentTrack === 'healer' ? '💚 ' : ''}${displayedCount} Progression Steps</div>
        </div>

        <!-- Controls Bar with Faction Filter & Track Selection -->
        <div class="progression-controls-bar weapon-controls-bar">
          <div class="faction-filter-toggle" id="${cfg.filterId}">
            <span class="filter-toggle-label">Faction:</span>
            <button type="button" class="faction-chip ${effectiveFaction === 'all' ? 'active' : ''}" data-faction="all" aria-label="Show all items">
              <span class="faction-icon">🌐</span> All
            </button>
            <button type="button" class="faction-chip faction-alliance ${effectiveFaction === 'alliance' ? 'active' : ''}" data-faction="alliance" ${isShaman ? 'disabled style="opacity:0.35;cursor:not-allowed;" title="Shamans are exclusive to the Horde"' : 'aria-label="Filter to Alliance items"'}>
              <span class="faction-icon">${FACTION_ICONS.alliance}</span> Alliance
            </button>
            <button type="button" class="faction-chip faction-horde ${effectiveFaction === 'horde' ? 'active' : ''}" data-faction="horde" ${isPaladin ? 'disabled style="opacity:0.35;cursor:not-allowed;" title="Paladins are exclusive to the Alliance"' : 'aria-label="Filter to Horde items"'}>
              <span class="faction-icon">${FACTION_ICONS.horde}</span> Horde
            </button>
          </div>

          ${data.tracks && data.tracks.length > 1 ? `
            <div class="progression-track-tabs role-pill-box">
              <span class="track-tab-label">Role:</span>
              ${data.tracks.map(tr => `
                <button type="button" class="progression-track-btn ${tr.id === 'healer' ? 'track-btn-healer' : 'track-btn-dps'} ${currentTrack === tr.id ? 'active' : ''}" data-track="${tr.id}" data-key="${datasetKey}" data-class="${classId}">
                  ${escapeHtml(tr.name)}
                </button>
              `).join('')}
            </div>
          ` : ''}
        </div>

        <!-- Timeline Grid -->
        <div class="weapon-timeline-container">
          ${stepCards || `
            <div class="progression-empty-state">
              <p>No items found matching the selected faction filter.</p>
            </div>
          `}
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
      getFaction: () => activeWeaponFaction
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
      getFaction: () => activeWandFaction
    });
  }

  // Off-Hand / Shield Progression Renderer
  function renderOffhands(classId) {
    const isShieldClass = ['warrior', 'paladin', 'shaman'].includes(classId);
    const isDruid = classId === 'druid';
    return renderItemTimeline(classId, 'offhands', {
      title: isShieldClass ? 'Level 1 to 60 Shield Upgrade Path' : (isDruid ? 'Level 1 to 60 Off-Hand & Idol Progression' : 'Level 1 to 60 Caster Off-Hand Progression'),
      icon: isShieldClass ? '🛡️' : '🔮',
      desc: isShieldClass
        ? 'Best-in-slot shields for leveling and tanking: optimal armor, block value, stamina, and key dungeon boss drops.'
        : (isDruid
            ? 'Held-in-off-hand tomes, furbolg pouches, and class idols for leveling Feral, Balance, and Restoration Druids.'
            : 'Best-in-slot held in off-hand frills, grimoires, orbs, and tomes for leveling casters: spell power, intellect, spirit, and mana regeneration.'),
      emptyMsg: isShieldClass ? '⚠️ No shield progression recorded for this class in current Beta Build.' : '⚠️ No off-hand progression recorded for this class in current Beta Build.',
      filterId: 'offhand-faction-toggle',
      getFaction: () => activeOffhandFaction
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
    setWandFaction: (f) => { activeWandFaction = f; },
    setOffhandFaction: (f) => { activeOffhandFaction = f; }
  };

})();
