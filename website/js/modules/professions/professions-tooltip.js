/**
 * World of Warcraft: Forever - Professions Item Tooltips Engine
 * Parses recipe effects, renders floating WoW-style tooltips, and binds hover triggers.
 */
(function () {
  "use strict";

  const core = window.WOW_PROFESSIONS_CORE || {};
  const escapeHtml = core.escapeHtml || window.escapeHtml || (s => String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"));
  const getIconUrl = core.getIconUrl || ((icon) => "https://wow.zamimg.com/images/wow/icons/medium/" + (icon || "inv_misc_questionmark") + ".jpg");

  function parseRecipeEffect(effect) {
    if (!effect) return null;
    let rem = String(effect).trim();

    let bind = null;
    const bm = rem.match(/^(Binds when (?:equipped|picked up|used))\s*/i);
    if (bm) {
      bind = bm[1];
      rem = rem.substring(bm[0].length).trim();
    }

    let slot = null;
    let subType = null;
    const tabMatch = rem.match(/^([A-Za-z0-9&/ -]+)\t([A-Za-z0-9&/ -]+?)(?=\s+(?:\d+\s+Armor|\d+\s*-\s*\d+|\+?\d+\s+Damage|Speed|\+?\d+\s+(?:Stamina|Strength|Agility|Intellect|Spirit)|Requires|Equip|Use|Chance|Sell Price|"|$))/);
    if (tabMatch) {
      slot = tabMatch[1].trim();
      subType = tabMatch[2].trim();
      rem = rem.substring(tabMatch[0].length).trim();
    } else if (rem.startsWith('\t')) {
      const m = rem.match(/^\t([A-Za-z0-9&/ -]+?)(?=\s+(?:\d+\s+Armor|Requires|Use|Equip|Sell Price|"|$))/);
      if (m) {
        subType = m[1].trim();
        rem = rem.substring(m[0].length).trim();
      }
    }

    let dmgRow = null;
    let dps = null;
    const dmgM = rem.match(/^(\d+\s*-\s*\d+(?:\s+[A-Za-z]+)?\s+Damage)\s*(?:\t|\s+)(Speed\s+[\d.]+)\s*(\([\d.]+\s+damage per second\))/i);
    if (dmgM) {
      dmgRow = { dmg: dmgM[1], speed: dmgM[2] };
      dps = dmgM[3];
      rem = rem.substring(dmgM[0].length).trim();
    }

    let armor = null;
    const armM = rem.match(/^(\d+\s+Armor)\b/i);
    if (armM) {
      armor = armM[1];
      rem = rem.substring(armM[0].length).trim();
    }

    const stats = [];
    const statRe = /\+([0-9]+)\s+(Stamina|Strength|Agility|Intellect|Spirit|All Stats|Armor)/gi;
    let sm;
    while ((sm = statRe.exec(rem)) !== null) {
      stats.push(sm[0]);
    }
    rem = rem.replace(/\+([0-9]+)\s+(Stamina|Strength|Agility|Intellect|Spirit|All Stats|Armor)\s*/gi, '').trim();

    let reqLevel = null;
    const reqLM = rem.match(/Requires Level (\d+)/i);
    if (reqLM) {
      reqLevel = reqLM[0];
      rem = rem.replace(/Requires Level \d+\s*/i, '').trim();
    }

    let reqClass = null;
    const reqCM = rem.match(/Classes:\s*([A-Za-z, ]+)/i);
    if (reqCM) {
      reqClass = reqCM[0];
      rem = rem.replace(/Classes:\s*[A-Za-z, ]+\s*/i, '').trim();
    }

    let equip = null;
    const eqM = rem.match(/Equip:\s*([^]+?)(?=(?:Sell Price:|$))/i);
    if (eqM) {
      equip = eqM[1].trim();
      rem = rem.replace(/Equip:\s*[^]+?(?=(?:Sell Price:|$))/i, '').trim();
    }

    let use = null;
    const useM = rem.match(/Use:\s*([^]+?)(?=(?:Sell Price:|$))/i);
    if (useM) {
      use = useM[1].trim();
      rem = rem.replace(/Use:\s*[^]+?(?=(?:Sell Price:|$))/i, '').trim();
    }

    let sellPrice = null;
    const spM = rem.match(/Sell Price:\s*([0-9a-z ]+)/i);
    if (spM) {
      sellPrice = spM[1].trim();
      rem = rem.replace(/Sell Price:\s*[0-9a-z ]+/i, '').trim();
    }

    let generic = rem.trim();

    return { bind, slot, subType, dmgRow, dps, armor, stats, reqLevel, reqClass, equip, use, sellPrice, generic };
  }

  function showItemTooltip(e, name, quality = 1, desc = '', reagents = null, extra = null) {
    let tooltip = document.getElementById('wow-item-tooltip');
    if (!tooltip) {
      tooltip = document.createElement('div');
      tooltip.id = 'wow-item-tooltip';
      tooltip.className = 'wow-floating-tooltip';
      document.body.appendChild(tooltip);
    }

    const parsed = desc ? parseRecipeEffect(desc) : null;
    const hasStructuredStats = Boolean(parsed && (parsed.bind || parsed.slot || parsed.armor || parsed.dmgRow || parsed.stats.length || parsed.equip || parsed.reqLevel));

    let extraTop = '';
    if (extra && (extra.bop || extra.type) && !hasStructuredStats) {
      extraTop = `
        <div style="font-size: 0.76rem; color: #94a3b8; display: flex; justify-content: space-between; margin-top: 0.2rem;">
          <span>${escapeHtml(extra.bop || 'Binds when picked up')}</span>
          ${extra.type ? `<span>${escapeHtml(extra.type)}</span>` : ''}
        </div>
      `;
    }

    let extraSkill = '';
    if (extra && extra.skillReq) {
      extraSkill = `
        <div style="font-size: 0.8rem; color: #fff; margin-top: 0.35rem;">
          Requires <span style="color: var(--wow-skill-orange, #ff8000); font-weight: 600;">${escapeHtml(extra.skillReq)}</span>
        </div>
      `;
    }

    let extraUse = '';
    if (extra && extra.use) {
      extraUse = `
        <div style="font-size: 0.8rem; color: #4ade80; margin-top: 0.35rem; line-height: 1.35;">
          <strong>Use:</strong> ${escapeHtml(extra.use)}
        </div>
      `;
    }

    let extraCost = '';
    if (extra && (extra.cost || extra.source)) {
      extraCost = `
        <div style="margin-top: 0.45rem; padding-top: 0.35rem; border-top: 1px dashed rgba(255,255,255,0.12); font-size: 0.78rem; display: flex; justify-content: space-between; color: #cbd5e1;">
          <span>${extra.cost ? `Cost: <strong style="color: var(--text-gold, #facc15);">${escapeHtml(extra.cost)}</strong>` : ''}</span>
          ${extra.source ? `<span style="color: #94a3b8;">Source: <strong style="color: #e2e8f0;">${escapeHtml(extra.source)}</strong></span>` : ''}
        </div>
      `;
    }

    let structuredHtml = '';
    if (hasStructuredStats && parsed) {
      structuredHtml = `
        ${parsed.bind ? `<div style="font-size: 0.8rem; color: #fff; margin-top: 0.2rem;">${escapeHtml(parsed.bind)}</div>` : ''}
        ${(parsed.slot || parsed.subType) ? `
          <div style="font-size: 0.82rem; color: #fff; display: flex; justify-content: space-between; margin-top: 0.15rem;">
            <span>${escapeHtml(parsed.slot || '')}</span>
            <span>${escapeHtml(parsed.subType || '')}</span>
          </div>
        ` : ''}
        ${parsed.dmgRow ? `
          <div style="font-size: 0.82rem; color: #fff; display: flex; justify-content: space-between; margin-top: 0.25rem;">
            <span>${escapeHtml(parsed.dmgRow.dmg)}</span>
            <span>${escapeHtml(parsed.dmgRow.speed)}</span>
          </div>
          <div style="font-size: 0.78rem; color: #fff; margin-bottom: 0.2rem;">${escapeHtml(parsed.dps || '')}</div>
        ` : ''}
        ${parsed.armor ? `<div style="font-size: 0.82rem; color: #fff; margin: 0.2rem 0; font-weight: 600;">${escapeHtml(parsed.armor)}</div>` : ''}
        ${parsed.stats && parsed.stats.length ? `
          <div style="margin: 0.25rem 0;">
            ${parsed.stats.map(s => `<div style="font-size: 0.82rem; color: #fff;">${escapeHtml(s)}</div>`).join('')}
          </div>
        ` : ''}
        ${parsed.reqClass ? `<div style="font-size: 0.8rem; color: #fff; margin-top: 0.2rem;">${escapeHtml(parsed.reqClass)}</div>` : ''}
        ${parsed.reqLevel ? `<div style="font-size: 0.8rem; color: #fff; margin: 0.2rem 0;">${escapeHtml(parsed.reqLevel)}</div>` : ''}
        ${parsed.equip ? `<div style="font-size: 0.8rem; color: #1eff00; margin-top: 0.35rem; line-height: 1.35;">Equip: ${escapeHtml(parsed.equip)}</div>` : ''}
        ${(parsed.use || (extra && extra.use)) ? `<div style="font-size: 0.8rem; color: #4ade80; margin-top: 0.35rem; line-height: 1.35;"><strong>Use:</strong> ${escapeHtml(parsed.use || extra.use)}</div>` : ''}
        ${parsed.generic ? `<div style="font-size: 0.8rem; color: #cbd5e1; margin-top: 0.35rem; line-height: 1.4;">${escapeHtml(parsed.generic)}</div>` : ''}
        ${parsed.sellPrice ? `<div style="font-size: 0.75rem; color: #94a3b8; margin-top: 0.35rem;">Sell Price: ${escapeHtml(parsed.sellPrice)}</div>` : ''}
      `;
    }

    let reagentsHtml = '';
    if (reagents && reagents.length) {
      const craftsCount = extra && extra.crafts && extra.crafts > 1 ? Number(extra.crafts) : 1;
      reagentsHtml = `
        <div style="margin-top: 0.5rem; border-top: 1px dashed rgba(255,255,255,0.1); padding-top: 0.4rem;">
          <div style="font-size: 0.72rem; color: #94a3b8; margin-bottom: 0.3rem;">
            Reagents Required${craftsCount > 1 ? ` <span style="color: #38bdf8;">(Per Craft · Total for ~${craftsCount} Crafts)</span>` : ':'}
          </div>
          <div style="display: flex; gap: 0.35rem; flex-wrap: wrap;">
            ${reagents.map(r => {
              const perCraft = r.count || 1;
              const totalBracket = craftsCount * perCraft;
              return `
                <span style="display: inline-flex; align-items: center; gap: 0.25rem; background: rgba(0,0,0,0.4); padding: 0.15rem 0.35rem; border-radius: 3px; font-size: 0.72rem;">
                  <img src="${getIconUrl(r.icon)}" width="16" height="16" style="border-radius: 2px;" />
                  <span style="color: #fff; font-weight:700;">${perCraft}x</span>
                  <span class="q${r.quality || 1}">${escapeHtml(r.name)}</span>
                  ${craftsCount > 1 ? `<span style="color: #38bdf8; font-weight: 700; margin-left: 0.15rem;">(=${totalBracket} total)</span>` : ''}
                </span>
              `;
            }).join('')}
          </div>
        </div>
      `;
    }

    tooltip.innerHTML = `
      <div style="min-width: 240px; max-width: 360px; padding: 0.65rem 0.85rem; background: rgba(10, 14, 26, 0.96); border: 1px solid rgba(212, 175, 55, 0.5); border-radius: 6px; box-shadow: 0 8px 24px rgba(0,0,0,0.8); pointer-events: none;">
        <div class="q${quality}" style="font-weight: 700; font-size: 0.95rem; line-height: 1.3;">${escapeHtml(name)}</div>
        ${extraTop}
        ${extraSkill}
        ${hasStructuredStats ? structuredHtml : `
          ${extraUse}
          ${desc && !extraUse ? `<div style="font-size: 0.8rem; color: #cbd5e1; margin-top: 0.35rem; line-height: 1.4;">${escapeHtml(desc)}</div>` : ''}
        `}
        ${reagentsHtml}
        ${extraCost}
      </div>
    `;

    tooltip.removeAttribute('hidden');
    tooltip.style.display = 'block';
    tooltip.style.opacity = '1';
    tooltip.style.pointerEvents = 'none';
    tooltip.style.position = 'fixed';
    tooltip.style.zIndex = '9999999';

    positionTooltip(e, tooltip);
  }

  function positionTooltip(e, tooltip, targetEl = null) {
    const pad = 12;
    const ttWidth = tooltip.offsetWidth || 220;
    const ttHeight = tooltip.offsetHeight || 100;

    let x, y;
    if (e && typeof e.clientX === 'number' && !isNaN(e.clientX)) {
      x = e.clientX + 15;
      y = e.clientY + 15;
    } else {
      const el = targetEl || (e && e.target && e.target.getBoundingClientRect ? e.target : null);
      if (el) {
        const rect = el.getBoundingClientRect();
        x = rect.right + 10;
        y = rect.top;
      } else {
        x = pad;
        y = pad;
      }
    }

    let left = x;
    let top = y;
    if (left + ttWidth > window.innerWidth - pad) {
      left = (e && typeof e.clientX === 'number' && !isNaN(e.clientX)) ? e.clientX - ttWidth - 10 : window.innerWidth - ttWidth - pad;
    }
    if (top + ttHeight > window.innerHeight - pad) {
      top = (e && typeof e.clientY === 'number' && !isNaN(e.clientY)) ? e.clientY - ttHeight - 10 : window.innerHeight - ttHeight - pad;
    }
    tooltip.style.left = `${Math.max(pad, left)}px`;
    tooltip.style.top = `${Math.max(pad, top)}px`;
  }

  function hideItemTooltip() {
    const tooltip = document.getElementById('wow-item-tooltip');
    if (tooltip) {
      tooltip.style.display = 'none';
      tooltip.style.opacity = '0';
    }
  }

  function attachTooltipListeners(container, prof) {
    const resolveReagentSource = (name, id) => window.WOW_PROFESSIONS_MODAL?.resolveReagentSource?.(name, id) || null;
    const openReverseReagentLookup = (name, id, tab) => window.WOW_PROFESSIONS_MODAL?.openReverseReagentLookup?.(name, id, tab);

    if (!prof) {
      // Overview Hub tooltips for camp buff cards and camp matrix stations
      container.querySelectorAll('.prof-dir-camp-box').forEach(el => {
        const strong = el.querySelector('strong');
        const text = el.textContent || '';
        const title = strong ? strong.textContent.replace(/:$/, '').trim() : 'Campfire Station Buff';
        el.addEventListener('mouseenter', (e) => {
          showItemTooltip(e, title, 2, text, null, {
            type: 'Camp Utility Station',
            use: 'Constructed at camp to grant party-wide benefits.'
          });
        });
        el.addEventListener('mousemove', (e) => {
          const tt = document.getElementById('wow-item-tooltip');
          if (tt) positionTooltip(e, tt);
        });
        el.addEventListener('mouseleave', hideItemTooltip);
      });

      container.querySelectorAll('.matrix-station-cell').forEach(el => {
        const strong = el.querySelector('strong');
        const small = el.querySelector('small');
        const title = strong ? strong.textContent.trim() : 'Profession Station';
        const desc = small ? small.textContent.replace(/^·\s*/, '').trim() : (el.getAttribute('title') || '');
        el.addEventListener('mouseenter', (e) => {
          showItemTooltip(e, title, 1, desc, null, {
            type: 'World Profession Object',
            use: 'Required craft fixture out in the world or placed at camp.'
          });
        });
        el.addEventListener('mousemove', (e) => {
          const tt = document.getElementById('wow-item-tooltip');
          if (tt) positionTooltip(e, tt);
        });
        el.addEventListener('mouseleave', hideItemTooltip);
      });
      return;
    }

    // Common tooltip helpers
    const campBuffStackingNotes = {
      'Campfire Pot': 'Stacks with food well-fed and elixir buffs',
      'Sleeping Mat': 'Applies rested XP accrual in the open world',
      'Comfortable Bedroll': 'Applies rested XP accrual in the open world',
      'Tanning Rack': 'Enables field leatherworking and tanning without city anvil/forge',
      'Spinning Wheel': 'Enables field tailoring thread spinning anywhere in the world',
      'Field Anvil': 'Enables field blacksmithing repairs and item crafting',
      'Herbalist Dryer': 'Accelerates herb drying for potent apothecary tinctures',
      'Tool Sharpening Stone': '+2 weapon damage buff stacking with rogue poisons',
      'Ironwood Tent Kit': 'Expands party rest radius to 30 yards with +5% spirit regen',
      'Silk Tent Kit': 'Expands party rest radius to 40 yards with +10% spirit regen'
    };

    // Recipe rows hover
    container.querySelectorAll('.recipe-row-card').forEach(el => {
      const name = el.getAttribute('data-recipe-name') || '';
      const quality = parseInt(el.getAttribute('data-quality') || '1', 10);
      const effect = el.getAttribute('data-effect') || '';
      const req = el.getAttribute('data-req') || '';
      const source = el.getAttribute('data-source') || '';
      const cost = el.getAttribute('data-cost') || '';
      const bop = el.getAttribute('data-bop') || '';
      const crafts = el.getAttribute('data-crafts') || '';

      if (!name) return;

      const triggerTooltip = (e) => {
        showItemTooltip(e, name, quality, effect, null, {
          skillReq: req,
          source: source,
          cost: cost,
          bop: bop,
          crafts: crafts
        });
      };

      el.addEventListener('mouseenter', triggerTooltip);
      el.addEventListener('mousemove', (e) => {
        const tt = document.getElementById('wow-item-tooltip');
        if (tt) positionTooltip(e, tt);
      });
      el.addEventListener('mouseleave', hideItemTooltip);
    });

    // Specialization card hover
    container.querySelectorAll('.spec-summary-card').forEach(el => {
      const name = el.getAttribute('data-spec-name') || '';
      const summary = el.getAttribute('data-spec-summary') || '';
      const trainer = el.getAttribute('data-spec-trainer') || '';
      const bopItems = el.getAttribute('data-spec-bop') || '';
      const quest = el.getAttribute('data-spec-quest') || '';
      if (!name) return;

      const desc = `${summary}${quest ? ` | Quest: ${quest}` : ''}${bopItems ? ` | Key Crafts: ${bopItems}` : ''}`;
      el.addEventListener('mouseenter', (e) => {
        showItemTooltip(e, name, 3, desc, null, {
          type: 'Profession Specialization Path',
          source: trainer || 'Master Trainer'
        });
      });
      el.addEventListener('mousemove', (e) => {
        const tt = document.getElementById('wow-item-tooltip');
        if (tt) positionTooltip(e, tt);
      });
      el.addEventListener('mouseleave', hideItemTooltip);
    });

    // Leveling step items hover
    container.querySelectorAll('.leveling-item-hover').forEach(el => {
      const name = el.getAttribute('data-item-name') || '';
      const quality = parseInt(el.getAttribute('data-quality') || '1', 10);
      const effect = el.getAttribute('data-effect') || '';
      const req = el.getAttribute('data-req') || '';
      const crafts = el.getAttribute('data-crafts') || '';
      const reagentsRaw = el.getAttribute('data-reagents') || '';
      if (!name) return;

      let reagents = null;
      if (reagentsRaw) {
        try {
          reagents = JSON.parse(reagentsRaw);
        } catch {
          reagents = null;
        }
      }

      const triggerTooltip = (e) => {
        showItemTooltip(e, name, quality, effect, reagents, {
          skillReq: req,
          crafts: crafts,
          type: 'Leveling Path Recipe'
        });
      };

      el.addEventListener('mouseenter', triggerTooltip);
      el.addEventListener('mousemove', (e) => {
        const tt = document.getElementById('wow-item-tooltip');
        if (tt) positionTooltip(e, tt);
      });
      el.addEventListener('mouseleave', hideItemTooltip);
    });

    // Camping object and kit cards hover
    container.querySelectorAll('.camp-tooltip-item').forEach(el => {
      const name = el.getAttribute('data-item-name') || '';
      const quality = parseInt(el.getAttribute('data-quality') || '1', 10);
      const effect = el.getAttribute('data-effect') || '';
      const req = el.getAttribute('data-req') || '';
      const desc = el.getAttribute('data-desc') || '';
      if (!name) return;

      const stackNote = campBuffStackingNotes[name] ? ` (${campBuffStackingNotes[name]})` : '';
      const fullUse = (effect ? `Place near a campfire. ${effect}` : desc) + stackNote;

      const triggerTooltip = (e) => {
        showItemTooltip(e, name, quality, effect || desc, null, {
          type: 'Camp Utility Object',
          skillReq: req,
          use: fullUse
        });
      };

      el.addEventListener('mouseenter', triggerTooltip);
      el.addEventListener('click', triggerTooltip);
      el.addEventListener('mousemove', (e) => {
        const tt = document.getElementById('wow-item-tooltip');
        if (tt) positionTooltip(e, tt);
      });
      el.addEventListener('mouseleave', hideItemTooltip);
    });

    // Reagent source quick action buttons on recipe cards
    container.querySelectorAll('.recipe-reagent-cta-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        hideItemTooltip();
        const name = btn.getAttribute('data-reagent-name');
        const rawId = btn.getAttribute('data-reagent-id') || '';
        const targetTab = btn.getAttribute('data-reagent-tab') || 'fishing';
        openReverseReagentLookup(name, rawId, targetTab);
      });
    });

    // Reagent chips, badges & shopping rows - hover for tooltip, click for reverse lookup modal
    container.querySelectorAll('.reagent-chip, .step-reagent-badge, .shopping-row-card').forEach(el => {
      const name = el.getAttribute('data-item-name') || el.getAttribute('title') || '';
      const rawId = el.getAttribute('data-item-id') || '';
      const perCraft = parseInt(el.getAttribute('data-per-craft') || '0', 10);
      const totalStep = parseInt(el.getAttribute('data-total-step') || '0', 10);
      const stepCrafts = parseInt(el.getAttribute('data-crafts') || '0', 10);
      if (!name) return;
      const triggerTooltip = (e) => {
        e.stopPropagation();
        const src = resolveReagentSource(name, rawId);
        let summaryDesc = src && src.summary ? src.summary : 'Crafting Reagent / Material';
        if (perCraft > 0 && stepCrafts > 1) {
          summaryDesc = `${perCraft}x per craft × ~${stepCrafts} crafts = ${totalStep}x total for this bracket. ${summaryDesc}`;
        } else if (perCraft > 0) {
          summaryDesc = `${perCraft}x required for this step. ${summaryDesc}`;
        }
        let useHint = 'Click to find all recipes across professions that use this material.';
        if (src) {
          if (src.primaryType === 'fished' && src.fishedIn && src.fishedIn.length > 0) {
            useHint = `🎣 Click to view where to fish this (${src.fishedIn.length} Waters), mob drops & recipes.`;
          } else {
            useHint = `${src.ctaIcon || '📍'} Click to view farming sources, drop rates, vendors & recipes.`;
          }
        }
        showItemTooltip(e, name, 1, summaryDesc, null, { 
          type: perCraft > 0 && stepCrafts > 1 ? `Bracket Reagent (${perCraft}x · =${totalStep} Total)` : 'Crafting Component',
          use: useHint
        });
      };
      el.addEventListener('mouseenter', triggerTooltip);
      el.addEventListener('click', (e) => {
        if (e.target.classList.contains('shopping-item-check')) return;
        e.stopPropagation();
        hideItemTooltip();
        const src = resolveReagentSource(name, rawId);
        let defaultTab = null;
        if (src?.primaryType === 'fished' && src.fishedIn?.length) defaultTab = 'fishing';
        else if (src?.primaryType === 'mob_drop' && src.drops?.length) defaultTab = 'drops';
        else if (src?.primaryType === 'vendor' && src.vendors?.length) defaultTab = 'vendors';
        else if (src?.primaryType === 'herb' || src?.primaryType === 'ore') defaultTab = 'nodes';
        else if (src?.primaryType === 'skinned' && src.skinnedFrom?.length) defaultTab = 'skinning';
        openReverseReagentLookup(name, rawId, defaultTab);
      });
      el.addEventListener('mousemove', (e) => {
        const tt = document.getElementById('wow-item-tooltip');
        if (tt) positionTooltip(e, tt);
      });
      el.addEventListener('mouseleave', (e) => {
        e.stopPropagation();
        hideItemTooltip();
      });
    });
  }

  window.WOW_PROFESSIONS_TOOLTIP = {
    parseRecipeEffect,
    showItemTooltip,
    positionTooltip,
    hideItemTooltip,
    attachTooltipListeners
  };
})();
