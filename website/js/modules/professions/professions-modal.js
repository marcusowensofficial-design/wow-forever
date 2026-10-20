/**
 * World of Warcraft: Forever - Professions Item Tooltips & Reverse Reagent Modal
 */
(function () {
  "use strict";

  const core = window.WOW_PROFESSIONS_CORE || {};
  const escapeHtml = core.escapeHtml || window.escapeHtml || (s => String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"));
  const getIconUrl = core.getIconUrl || ((icon) => "https://wow.zamimg.com/images/wow/icons/medium/" + (icon || "inv_misc_questionmark") + ".jpg");
  const CDN_BASE = core.CDN_BASE || "https://wow.zamimg.com/images/wow/icons/medium/";
  const isDisenchantMaterial = core.isDisenchantMaterial || (() => false);

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
          showItemTooltip(e, title, 2, desc, null, {
            type: 'Campfire Profession Station',
            use: 'Provides 80% potency of class blessings to nearby party members for 1 hour.'
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

    // Main Recipes Catalog cards hover
    container.querySelectorAll('.recipe-card .recipe-item-icon, .recipe-card .recipe-title').forEach(el => {
      const name = el.getAttribute('data-recipe-name') || '';
      if (!name) return;
      const match = (prof.recipes || []).find(r => r.name && r.name.toLowerCase() === name.toLowerCase());
      if (!match) return;

      const extra = {
        type: `${prof.name || 'Crafted'} Item`,
        skillReq: `${prof.name} (${match.learn})`,
        source: match.source || 'Trainer'
      };

      el.addEventListener('mouseenter', (e) => {
        showItemTooltip(e, match.name, match.quality || 1, match.effect || '', match.reagents || null, extra);
      });
      el.addEventListener('mousemove', (e) => {
        const tt = document.getElementById('wow-item-tooltip');
        if (tt) positionTooltip(e, tt);
      });
      el.addEventListener('mouseleave', hideItemTooltip);
    });

    // Recipes / steps (with exact recipe lookup, Mining Smelt -> Bar mapping, Camping station lookup & click-to-inspect)
    container.querySelectorAll('.step-recipe-name, .step-crafted-icon-wrap').forEach(el => {
      const name = el.getAttribute('data-recipe-name') || el.textContent.replace(/↗$/, '').trim();
      const stepIdx = parseInt(el.getAttribute('data-step-idx') || '-1', 10);
      const stepObj = (stepIdx >= 0 && prof.leveling?.steps) ? prof.leveling.steps[stepIdx] : null;
      const resolveFn = window.WOW_PROFESSIONS_LEVELING?.resolveStepCraftedItem || (step => ({ recipeObj: step }));
      const resolved = resolveFn(stepObj || { recipeName: name, itemId: el.getAttribute('data-item-id') }, prof);
      const match = resolved.recipeObj;
      const targetSubtab = resolved.targetSubtab || 'recipes';

      const ttQuality = resolved.quality || (stepObj?.vendorDetails ? 2 : 1);
      const ttDesc = (match && match.effect) ? match.effect : (resolved.effect || stepObj?.advice || stepObj?.source || match?.source || '');
      const ttReagents = stepObj?.reagents || resolved.reagents || match?.reagents || null;
      const ttExtra = {
        type: `${prof.name || 'Tradeskill'} Step${stepObj?.crafts > 1 ? ` (~${stepObj.crafts} Crafts)` : ''}`,
        skillReq: resolved.learn ? `${prof.name} (${resolved.learn})` : (match?.learn ? `${prof.name} (${match.learn})` : (stepObj ? `${prof.name} (${stepObj.from}–${stepObj.to})` : '')),
        source: stepObj?.source || resolved.source || match?.source || 'Trainer',
        cost: stepObj?.vendorDetails?.cost || '',
        crafts: stepObj?.crafts || 1
      };

      el.addEventListener('mouseenter', (e) => {
        showItemTooltip(e, resolved.name || name, ttQuality, ttDesc, ttReagents, ttExtra);
      });
      el.addEventListener('mousemove', (e) => {
        const tt = document.getElementById('wow-item-tooltip');
        if (tt) positionTooltip(e, tt);
      });
      el.addEventListener('mouseleave', hideItemTooltip);
      el.addEventListener('focus', (e) => {
        showItemTooltip(e, resolved.name || name, ttQuality, ttDesc, ttReagents, ttExtra);
        const tt = document.getElementById('wow-item-tooltip');
        if (tt) positionTooltip(e, tt, el);
      });
      el.addEventListener('blur', hideItemTooltip);

      const handleStepRecipeClick = (e) => {
        e.stopPropagation();
        hideItemTooltip();
        if (window.setReturnTarget) {
          window.setReturnTarget({
            label: `${prof.name || 'Leveling'} Roadmap`,
            tab: 'professions',
            profession: prof.slug,
            subtab: 'leveling',
            scrollY: window.scrollY
          });
        }
        if (prof.slug === 'camping') {
          const destTab = targetSubtab === 'recipes' ? 'guide' : targetSubtab;
          if (window.WOW_PROFESSIONS?.selectProfession) {
            window.WOW_PROFESSIONS.selectProfession('camping', destTab, '');
            const targetItemName = resolved.targetName || resolved.name || name;
            setTimeout(() => {
              const cardEl = Array.from(document.querySelectorAll('.camp-tooltip-item')).find(
                c => (c.getAttribute('data-item-name') || '').toLowerCase() === targetItemName.toLowerCase()
              );
              if (cardEl) {
                cardEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
                cardEl.classList.add('recipe-card-highlight');
                setTimeout(() => cardEl.classList.remove('recipe-card-highlight'), 2500);
              }
            }, 150);
          }
          return;
        }
        if (prof.recipes && prof.recipes.length > 0) {
          const lookupQuery = resolved.name || name.replace(/^Make (a|an) /i, '').replace(/\s*\(Smelting Bypass\)$/i, '').trim();
          if (window.WOW_PROFESSIONS?.selectProfession) {
            window.WOW_PROFESSIONS.selectProfession(prof.slug, 'recipes', lookupQuery, resolved.id || match?.id || '');
          }
        } else {
          const itemId = el.getAttribute('data-item-id') || resolved.id || '';
          openReverseReagentLookup((resolved.name || name).replace(/\s*\(Smelting Bypass\)$/i, '').trim(), itemId);
        }
      };

      el.addEventListener('click', handleStepRecipeClick);
      el.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleStepRecipeClick(e);
        }
      });
    });

    // Merchant's Favor recipe card/bar hover
    container.querySelectorAll('.favor-recipe-card').forEach(el => {
      const name = el.getAttribute('data-recipe-name') || '';
      const crafted = el.getAttribute('data-crafted-name') || '';
      const quality = parseInt(el.getAttribute('data-quality') || '1', 10);
      const effect = el.getAttribute('data-effect') || '';
      const skill = el.getAttribute('data-skill') || '1';
      const cost = el.getAttribute('data-cost') || '';
      const profName = el.getAttribute('data-prof') || prof.name || 'Trade';

      const match = (prof.recipes || []).find(r => 
        r.name && (
          r.name.toLowerCase() === crafted.toLowerCase() ||
          r.name.toLowerCase() === name.toLowerCase() ||
          (r.source && r.source.toLowerCase().includes(name.toLowerCase()))
        )
      );

      const reagents = match?.reagents || null;
      const extra = {
        bop: 'Binds when picked up',
        type: `${profName} Formula`,
        skillReq: `${profName} (${skill})`,
        use: effect ? `Teaches ${crafted || name}. ${effect}` : `Teaches ${crafted || name}.`,
        cost: cost,
        source: 'Merchant\'s Favor Quartermaster'
      };

      el.addEventListener('mouseenter', (e) => {
        showItemTooltip(e, name, quality, effect, reagents, extra);
      });
      el.addEventListener('mousemove', (e) => {
        const tt = document.getElementById('wow-item-tooltip');
        if (tt) positionTooltip(e, tt);
      });
      el.addEventListener('mouseleave', hideItemTooltip);
    });

    // Merchant's Favor Skill Requirement Progress Bars hover
    container.querySelectorAll('.favor-skill-track').forEach(el => {
      const skill = el.getAttribute('data-skill') || '1';
      const profName = el.getAttribute('data-prof') || prof.name || 'Trade';
      const percent = Math.min(100, Math.round((parseInt(skill, 10) / 300) * 100));

      el.addEventListener('mouseenter', (e) => {
        e.stopPropagation();
        showItemTooltip(
          e, 
          `${profName} Skill Requirement: ${skill} / 300`, 
          2, 
          `Requires ${skill} ${profName} skill to learn and craft. Leveling progression is currently capped at 225 during the beta phase (${percent}% toward 300 mastery).`, 
          null, 
          { type: 'Skill Milestone', skillReq: `${profName} (${skill})` }
        );
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

    // Stacking exclusion lookup for camp stations
    const campBuffStackingNotes = {
      'Mana Well': 'Does not stack with Blessing of Wisdom or Mana Spring Totem.',
      'Sharpening Wheel': 'Does not stack with Strength of Earth Totem.',
      'Enchanted Lute': 'Does not stack with Mark of the Wild.',
      'Faction Banner': 'Does not stack with Divine Spirit.',
      'Lodestone': 'Does not stack with Blessing of Might or Battle Shout.',
      'Incense Candle': 'Does not stack with Arcane Intellect.',
      'Fish Bowl': 'Does not stack with Blessing of Kings.',
      'First Aid Kit': 'Does not stack with Power Word: Fortitude.'
    };

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

  /* ==========================================================================
     REVERSE REAGENT SEARCH & ACQUISITION SOURCE MODAL ENGINE
     ========================================================================== */
  function resolveReagentSource(rawName, explicitId = null) {
    const sources = window.WOW_REAGENT_SOURCES || {};
    if (explicitId && sources[explicitId]) {
      return sources[explicitId];
    }
    if (!rawName) return null;
    const cleanName = rawName.replace(/^\d+x\s*/i, '').trim().toLowerCase();
    for (const src of Object.values(sources)) {
      if (src.name && src.name.toLowerCase() === cleanName) {
        return src;
      }
    }
    for (const src of Object.values(sources)) {
      if (src.name && (src.name.toLowerCase().includes(cleanName) || cleanName.includes(src.name.toLowerCase()))) {
        return src;
      }
    }
    return null;
  }

  function openReverseReagentLookup(rawName, explicitId = null, initialTab = null) {
    if (!rawName) return;
    const cleanName = rawName.replace(/^\d+x\s*/i, '').trim();
    const cleanLower = cleanName.toLowerCase();
    const data = window.WOW_PROFESSIONS_DATA || {};

    const matches = [];
    let matIcon = '';
    let matQuality = 1;
    let resolvedId = explicitId ? Number(explicitId) : null;

    Object.entries(data).forEach(([slug, p]) => {
      (p.recipes || []).forEach(r => {
        const mat = (r.reagents || []).find(m => {
          if (!m.name) return false;
          const mn = m.name.replace(/^\d+x\s*/i, '').trim().toLowerCase();
          return mn === cleanLower || mn.includes(cleanLower) || cleanLower.includes(mn);
        });
        if (mat) {
          if (!matIcon && mat.icon) matIcon = mat.icon;
          if (mat.quality) matQuality = mat.quality;
          if (!resolvedId && (mat.id || mat.itemId)) resolvedId = Number(mat.id || mat.itemId);
          matches.push({
            profSlug: slug,
            profName: p.name,
            profIcon: p.icon,
            recipe: r,
            neededCount: mat.count || 1
          });
        }
      });
    });

    const sourceData = resolveReagentSource(cleanName, resolvedId);
    if (!resolvedId && sourceData?.id) {
      resolvedId = sourceData.id;
    }

    let modal = document.getElementById('prof-reagent-lookup-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'prof-reagent-lookup-modal';
      modal.className = 'reagent-lookup-backdrop';
      modal.setAttribute('role', 'dialog');
      modal.setAttribute('aria-modal', 'true');
      document.body.appendChild(modal);

      modal.addEventListener('click', (e) => {
        if (e.target === modal) closeReagentModal();
      });
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('is-open')) {
          closeReagentModal();
        }
      });
    }

    function closeReagentModal() {
      hideItemTooltip();
      modal.classList.remove('is-open');
      modal.setAttribute('hidden', '');
    }

    const profCounts = {};
    matches.forEach(m => {
      profCounts[m.profName] = (profCounts[m.profName] || 0) + 1;
    });
    const profNames = Object.keys(profCounts);
    const iconUrl = matIcon ? getIconUrl(matIcon) : `${CDN_BASE}inv_misc_questionmark.jpg`;

    const hasFishing = Boolean(sourceData?.fishedIn && sourceData.fishedIn.length > 0);
    const hasDrops = Boolean(sourceData?.drops && sourceData.drops.length > 0);
    const hasVendors = Boolean(sourceData?.vendors && sourceData.vendors.length > 0);
    const validMinedFrom = (sourceData?.minedFrom || []).filter(o => o.pct > 0);
    const validGatheredFrom = (sourceData?.gatheredFrom || []).filter(o => o.pct > 0);
    const nodeObjects = validMinedFrom.concat(validGatheredFrom);
    const hasNodes = Boolean(nodeObjects.length > 0 || sourceData?.herbNode || sourceData?.miningNode);
    const hasSkinning = Boolean(sourceData?.skinnedFrom && sourceData.skinnedFrom.length > 0);
    const hasDisenchant = Boolean(sourceData?.primaryType === 'disenchant' || sourceData?.disenchant || isDisenchantMaterial(cleanName));

    let activeFilter = 'all';
    let activeModalView = initialTab;

    if (!activeModalView) {
      if ((sourceData?.primaryType === 'disenchant' || isDisenchantMaterial(cleanName)) && hasDisenchant) {
        activeModalView = 'disenchant';
      } else if (sourceData?.primaryType === 'fished' && hasFishing) {
        activeModalView = 'fishing';
      } else if (sourceData?.primaryType === 'mob_drop' && hasDrops) {
        activeModalView = 'drops';
      } else if (sourceData?.primaryType === 'vendor' && hasVendors) {
        activeModalView = 'vendors';
      } else if (sourceData?.primaryType === 'herb' || sourceData?.primaryType === 'ore') {
        activeModalView = 'nodes';
      } else if (sourceData?.primaryType === 'skinned' && hasSkinning) {
        activeModalView = 'skinning';
      } else if (matches.length > 0) {
        activeModalView = 'recipes';
      } else if (hasFishing) {
        activeModalView = 'fishing';
      } else if (hasDrops) {
        activeModalView = 'drops';
      } else if (hasVendors) {
        activeModalView = 'vendors';
      } else {
        activeModalView = 'recipes';
      }
    } else if (activeModalView === 'sources') {
      if (sourceData?.primaryType === 'fished' && hasFishing) {
        activeModalView = 'fishing';
      } else if (sourceData?.primaryType === 'mob_drop' && hasDrops) {
        activeModalView = 'drops';
      } else if (sourceData?.primaryType === 'vendor' && hasVendors) {
        activeModalView = 'vendors';
      } else if (hasFishing) {
        activeModalView = 'fishing';
      } else if (hasDrops) {
        activeModalView = 'drops';
      } else {
        activeModalView = 'all';
      }
    }

    function renderAcquisitionView(src, viewMode = 'all') {
      if (!src && !hasDisenchant) {
        return `
          <div class="reagent-lookup-empty">
            No specific open-world drop table recorded for this reagent.
            ${resolvedId ? `<div style="margin-top:0.75rem;"><a href="https://www.wowhead.com/forever/item=${resolvedId}" target="_blank" rel="noopener" class="reagent-wowhead-ext-btn">🌐 View on Wowhead Forever ↗</a></div>` : ''}
          </div>
        `;
      }
      if (!src && hasDisenchant) {
        src = { name: cleanName, primaryType: 'disenchant' };
      }

      // Summary Banner + Internal Jump Buttons
      let internalJumpHtml = '';
      if ((viewMode === 'all' || viewMode === 'nodes') && src.primaryType === 'herb' && src.herbNode) {
        internalJumpHtml += `
          <button type="button" class="reagent-internal-jump-btn" data-jump-prof="herbalism" data-jump-subtab="nodes">
            <span>🌿</span> View ${escapeHtml(src.herbNode.name)} in Herbalism Nodes (Skill ${src.herbNode.skill}+) ›
          </button>
        `;
      }
      if ((viewMode === 'all' || viewMode === 'nodes') && src.primaryType === 'ore' && src.miningNode) {
        internalJumpHtml += `
          <button type="button" class="reagent-internal-jump-btn" data-jump-prof="mining" data-jump-subtab="nodes">
            <span>⛏️</span> View ${escapeHtml(src.miningNode.name)} in Mining Nodes (Skill ${src.miningNode.skill}+) ›
          </button>
        `;
      }
      if ((viewMode === 'all' || viewMode === 'fishing') && src.fishedIn && src.fishedIn.length > 0) {
        internalJumpHtml += `
          <button type="button" class="reagent-internal-jump-btn" data-jump-prof="fishing" data-jump-subtab="waters">
            <span>🌊</span> View Fishing Waters & Skill Brackets ›
          </button>
        `;
      }
      if ((viewMode === 'all' || viewMode === 'skinning') && src.primaryType === 'skinned' && src.skinnedFrom && src.skinnedFrom.length > 0) {
        internalJumpHtml += `
          <button type="button" class="reagent-internal-jump-btn" data-jump-prof="skinning" data-jump-subtab="leveling">
            <span>🔪</span> View Skinning Beast Level Brackets ›
          </button>
        `;
      }

      let summaryTitle = `How to Acquire ${escapeHtml(cleanName)} in WoW Forever`;
      let summaryText = src.summary || 'Looted, gathered, or purchased across Azeroth.';
      let summaryIcon = src.ctaIcon || '📍';

      if (viewMode === 'fishing') {
        summaryTitle = `Where to Fish ${escapeHtml(cleanName)}`;
        summaryIcon = '🎣';
        const topZ = (src.fishedIn || []).slice(0, 3).map(f => `${f.zone}${f.pct ? ` (${f.pct}%)` : ''}`).join(', ');
        summaryText = topZ ? `Catch from open waters in ${topZ}. Minimum fishing skill and zone waters listed below.` : 'Fished in open waters across Azeroth.';
      } else if (viewMode === 'drops') {
        summaryTitle = `Top Mobs Dropping ${escapeHtml(cleanName)}`;
        summaryIcon = '⚔️';
        const mobTotal = src.totalDropMobs || (src.drops ? src.drops.length : 0);
        summaryText = `Farmed from ${mobTotal} mobs across Azeroth. Drop rates, spawn zones, and mob levels listed below.`;
      } else if (viewMode === 'vendors') {
        summaryTitle = `Vendors Selling ${escapeHtml(cleanName)}`;
        summaryIcon = '🪙';
        const totalV = src.totalVendors || (src.vendors ? src.vendors.length : 0);
        summaryText = `Purchased from ${totalV} trade vendors across Azeroth. Prices, stock limits, and locations listed below.`;
      }

      const summaryBoxHtml = `
        <div class="reagent-source-summary-box">
          <div class="reagent-source-summary-main">
            <span class="reagent-source-summary-icon">${summaryIcon}</span>
            <div>
              <div class="reagent-source-summary-title">${summaryTitle}</div>
              <p class="reagent-source-summary-text">${escapeHtml(summaryText)}</p>
            </div>
          </div>
          ${internalJumpHtml ? `<div class="reagent-source-internal-jumps">${internalJumpHtml}</div>` : ''}
        </div>
      `;

      // Fishing Waters Section ('fished-in')
      const fishingWatersData = window.WOW_PROFESSIONS_DATA?.fishing?.fishingWaters || [];
      const zoneSkillMap = {};
      fishingWatersData.forEach(w => {
        (w.zones || '').split(',').forEach(z => {
          zoneSkillMap[z.trim().toLowerCase()] = w.skill;
        });
      });

      const fishingSectionHtml = (src.fishedIn && src.fishedIn.length > 0) ? `
        <div class="reagent-source-section">
          <div class="reagent-source-sec-head">
            <h4 class="reagent-source-sec-title"><span>🎣</span> Best Fishing Zones (${src.fishedIn.length})</h4>
            <a href="https://www.wowhead.com/forever/item=${src.id}#fished-in" target="_blank" rel="noopener" class="reagent-sec-wowhead-link">
              Full fishing table on Wowhead ↗
            </a>
          </div>
          <div class="reagent-source-grid">
            ${src.fishedIn.map(f => {
              const pctVal = f.pct !== null && f.pct !== undefined ? `${f.pct}%` : 'Catch';
              const pctClass = f.pct >= 35 ? 'high' : (f.pct >= 15 ? 'med' : 'low');
              const lvlStr = f.minLevel ? `Zone Lvl ${f.minLevel}–${f.maxLevel || f.minLevel}` : 'Open Water';
              const reqSkill = zoneSkillMap[(f.zone || '').trim().toLowerCase()];
              const skillBadge = reqSkill ? ` · <span class="reagent-row-skill">Fishing ${reqSkill}</span>` : '';
              return `
                <div class="reagent-source-card">
                  <div class="reagent-source-card-left">
                    <span class="reagent-drop-pct-badge ${pctClass}">${pctVal}</span>
                    <div>
                      <div class="reagent-source-name">🌊 ${escapeHtml(f.zone)}</div>
                      <div class="reagent-source-sub">${escapeHtml(lvlStr)}${skillBadge}</div>
                    </div>
                  </div>
                  <a href="https://www.wowhead.com/forever/zone=${f.id}" target="_blank" rel="noopener" class="reagent-npc-map-btn" title="View ${escapeHtml(f.zone)} fishing water map on Wowhead Forever">
                    Map ↗
                  </a>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      ` : '';

      // Mob Drops Table ('dropped-by')
      const totalMobs = src.totalDropMobs || (src.drops ? src.drops.length : 0);
      const dropsSectionHtml = (src.drops && src.drops.length > 0) ? `
        <div class="reagent-source-section">
          <div class="reagent-source-sec-head">
            <h4 class="reagent-source-sec-title"><span>⚔️</span> Top Farming Mobs (${src.drops.length} of ${totalMobs} Mobs)</h4>
            <a href="https://www.wowhead.com/forever/item=${src.id}#dropped-by" target="_blank" rel="noopener" class="reagent-sec-wowhead-link">
              See all ${totalMobs} mobs & spawn maps on Wowhead ↗
            </a>
          </div>
          <div class="reagent-source-grid">
            ${src.drops.map(d => {
              const lvlStr = d.minLevel ? (d.maxLevel && d.maxLevel !== d.minLevel ? `Lvl ${d.minLevel}–${d.maxLevel}` : `Lvl ${d.minLevel}`) : '';
              const zoneStr = (d.zones && d.zones.length) ? d.zones.join(', ') : 'Azeroth';
              const pctVal = d.pct !== null && d.pct !== undefined ? `${d.pct}%` : 'Drop';
              const pctClass = d.pct >= 50 ? 'high' : (d.pct >= 20 ? 'med' : 'low');
              return `
                <div class="reagent-source-card">
                  <div class="reagent-source-card-left">
                    <span class="reagent-drop-pct-badge ${pctClass}" title="Estimated Drop Chance">${pctVal}</span>
                    <div>
                      <div class="reagent-source-name">
                        ${escapeHtml(d.name)}
                        ${d.elite ? '<span class="reagent-mob-tag elite">Elite</span>' : ''}
                        ${d.rare ? '<span class="reagent-mob-tag rare">Rare</span>' : ''}
                        ${d.isNew ? '<span class="recipe-new-tag">New</span>' : ''}
                      </div>
                      <div class="reagent-source-sub">
                        ${lvlStr ? `<span class="reagent-mob-lvl">${lvlStr}</span> · ` : ''}
                        <span class="reagent-mob-zone">📍 ${escapeHtml(zoneStr)}</span>
                      </div>
                    </div>
                  </div>
                  <a href="https://www.wowhead.com/forever/npc=${d.id}" target="_blank" rel="noopener" class="reagent-npc-map-btn" title="View ${escapeHtml(d.name)} spawn map on Wowhead Forever">
                    Map ↗
                  </a>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      ` : '';

      // Vendors ('sold-by')
      const totalV = src.totalVendors || (src.vendors ? src.vendors.length : 0);
      const vendorsSectionHtml = (src.vendors && src.vendors.length > 0) ? `
        <div class="reagent-source-section">
          <div class="reagent-source-sec-head">
            <h4 class="reagent-source-sec-title"><span>🪙</span> Sold By Vendors (${src.vendors.length} of ${totalV} Vendors)</h4>
            <a href="https://www.wowhead.com/forever/item=${src.id}#sold-by" target="_blank" rel="noopener" class="reagent-sec-wowhead-link">
              All ${totalV} vendors on Wowhead ↗
            </a>
          </div>
          <div class="reagent-source-grid">
            ${src.vendors.map(v => {
              const zoneStr = (v.zones && v.zones.length) ? v.zones.join(', ') : 'Camp / Major Cities';
              const fClass = (v.faction || 'Neutral').toLowerCase();
              return `
                <div class="reagent-source-card">
                  <div class="reagent-source-card-left">
                    <span class="reagent-vendor-faction-badge ${fClass}">${escapeHtml(v.faction || 'Neutral')}</span>
                    <div>
                      <div class="reagent-source-name">
                        ${escapeHtml(v.name)}
                        ${v.tag ? `<small style="color:#94a3b8; font-weight:500;">&lt;${escapeHtml(v.tag)}&gt;</small>` : ''}
                        ${v.isNew ? '<span class="recipe-new-tag">New</span>' : ''}
                      </div>
                      <div class="reagent-source-sub">
                        📍 ${escapeHtml(zoneStr)}
                        ${v.cost ? ` · <strong style="color:#facc15;">${escapeHtml(v.cost)}</strong>` : ''}
                        · ${v.stock ? `<span style="color:#fb923c;">Limited (${v.stock})</span>` : '<span style="color:#4ade80;">Unlimited</span>'}
                      </div>
                    </div>
                  </div>
                  <a href="https://www.wowhead.com/forever/npc=${v.id}" target="_blank" rel="noopener" class="reagent-npc-map-btn">
                    Map ↗
                  </a>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      ` : '';

      // Mined / Gathered Nodes Section
      const validMined = (src.minedFrom || []).filter(o => o.pct > 0);
      const validGathered = (src.gatheredFrom || []).filter(o => o.pct > 0);
      const nodesList = validMined.concat(validGathered);
      const nodesSectionHtml = (nodesList.length > 0) ? `
        <div class="reagent-source-section">
          <div class="reagent-source-sec-head">
            <h4 class="reagent-source-sec-title"><span>${validMined.length ? '⛏️' : '🌿'}</span> Harvested From World Nodes (${nodesList.length})</h4>
            <a href="https://www.wowhead.com/forever/item=${src.id}#${validMined.length ? 'mined-from-object' : 'gathered-from-object'}" target="_blank" rel="noopener" class="reagent-sec-wowhead-link">
              Node spawn maps on Wowhead ↗
            </a>
          </div>
          <div class="reagent-source-grid">
            ${nodesList.map(o => {
              const zoneStr = (o.zones && o.zones.length) ? o.zones.join(', ') : (src.herbNode?.zones || src.miningNode?.zones || 'Azeroth');
              const pctVal = o.pct !== null && o.pct !== undefined && o.pct > 0 ? `${o.pct}%` : '100%';
              return `
                <div class="reagent-source-card">
                  <div class="reagent-source-card-left">
                    <span class="reagent-drop-pct-badge high">${pctVal}</span>
                    <div>
                      <div class="reagent-source-name">${escapeHtml(o.name)}</div>
                      <div class="reagent-source-sub">📍 ${escapeHtml(zoneStr)}</div>
                    </div>
                  </div>
                  <a href="https://www.wowhead.com/forever/object=${o.id}" target="_blank" rel="noopener" class="reagent-npc-map-btn">
                    Map ↗
                  </a>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      ` : '';

      // Beasts to Skin Section
      const skinningSectionHtml = (src.skinnedFrom && src.skinnedFrom.length > 0) ? `
        <div class="reagent-source-section">
          <div class="reagent-source-sec-head">
            <h4 class="reagent-source-sec-title"><span>🔪</span> Best Beasts to Skin (${src.skinnedFrom.length})</h4>
            <a href="https://www.wowhead.com/forever/item=${src.id}#skinned-from" target="_blank" rel="noopener" class="reagent-sec-wowhead-link">
              All skinnable beasts on Wowhead ↗
            </a>
          </div>
          <div class="reagent-source-grid">
            ${src.skinnedFrom.map(s => {
              const lvlStr = s.minLevel ? (s.maxLevel && s.maxLevel !== s.minLevel ? `Lvl ${s.minLevel}–${s.maxLevel}` : `Lvl ${s.minLevel}`) : '';
              const zoneStr = (s.zones && s.zones.length) ? s.zones.join(', ') : 'Azeroth';
              const pctVal = s.pct !== null && s.pct !== undefined ? `${s.pct}%` : 'Skin';
              return `
                <div class="reagent-source-card">
                  <div class="reagent-source-card-left">
                    <span class="reagent-drop-pct-badge high">${pctVal}</span>
                    <div>
                      <div class="reagent-source-name">${escapeHtml(s.name)}</div>
                      <div class="reagent-source-sub">${lvlStr ? `${lvlStr} · ` : ''}📍 ${escapeHtml(zoneStr)}</div>
                    </div>
                  </div>
                  <a href="https://www.wowhead.com/forever/npc=${s.id}" target="_blank" rel="noopener" class="reagent-npc-map-btn">
                    Map ↗
                  </a>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      ` : '';

      // Crafted By Section
      const craftedSectionHtml = (src.craftedBy && src.craftedBy.length > 0) ? `
        <div class="reagent-source-section">
          <h4 class="reagent-source-sec-title"><span>🔨</span> Crafted By Profession (${src.craftedBy.length})</h4>
          <div class="reagent-source-grid">
            ${src.craftedBy.map(c => `
              <div class="reagent-source-card">
                <div class="reagent-source-card-left">
                  <img src="${getIconUrl(c.profIcon)}" alt="${escapeHtml(c.profName)}" class="reagent-source-mini-icon" />
                  <div>
                    <div class="reagent-source-name">${escapeHtml(c.recipeName)}</div>
                    <div class="reagent-source-sub">${escapeHtml(c.profName)} · <span class="reagent-row-skill">Skill ${c.learn}</span> · ${escapeHtml(c.source)}</div>
                  </div>
                </div>
                <button type="button" class="reagent-jump-btn" data-slug="${c.profSlug}" data-recipe-id="${c.recipeId || ''}" data-recipe-name="${escapeHtml(c.recipeName)}">
                  Craft in ${escapeHtml(c.profName)} ›
                </button>
              </div>
            `).join('')}
          </div>
        </div>
      ` : '';

      // Contained In Clams / Objects Section
      const containedSectionHtml = (src.containedIn && src.containedIn.length > 0) ? `
        <div class="reagent-source-section">
          <h4 class="reagent-source-sec-title"><span>🐚</span> Contained Inside Clams & Objects (${src.containedIn.length})</h4>
          <div class="reagent-source-grid">
            ${src.containedIn.map(c => `
              <div class="reagent-source-card">
                <div class="reagent-source-card-left">
                  <span class="reagent-drop-pct-badge high">${c.pct ? c.pct + '%' : 'Loot'}</span>
                  <div>
                    <div class="reagent-source-name">${escapeHtml(c.name)}</div>
                    <div class="reagent-source-sub">Open in inventory or world container</div>
                  </div>
                </div>
                <a href="https://www.wowhead.com/forever/item=${c.id}" target="_blank" rel="noopener" class="reagent-npc-map-btn">
                  Item ↗
                </a>
              </div>
            `).join('')}
          </div>
        </div>
      ` : '';

      // Disenchanting Section & Yield Matrix
      const disenchantSectionHtml = (hasDisenchant || src.disenchant) ? `
        <div class="reagent-source-section">
          <div class="reagent-source-sec-head">
            <h4 class="reagent-source-sec-title"><span>✨</span> Disenchanting Yield &amp; Item-Level Matrix</h4>
            <span class="beta-cap-tag" style="background: rgba(147, 51, 234, 0.2); border-color: #a855f7; color: #d8b4fe;">
              Armor vs Weapon Rates
            </span>
          </div>

          <div class="reagent-source-summary-box" style="margin-bottom: 0.85rem;">
            <div class="reagent-source-summary-main">
              <span class="reagent-source-summary-icon">✨</span>
              <div>
                <div class="reagent-source-summary-title">How Disenchanting Works</div>
                <p class="reagent-source-summary-text">
                  Disenchanting converts Green (Uncommon), Blue (Rare), and Purple (Epic) equipment into magical enchanting materials based on Item Level (iLvl).
                  Weapons favor <strong>Essences (~75%)</strong>, while Armor favors <strong>Dusts (~75%)</strong>. Rare equipment guarantees <strong>100% Shard yields</strong>.
                </p>
              </div>
            </div>
          </div>

          <div class="de-salvager-callout">
            <span class="de-salvager-icon">⛺</span>
            <div>
              <strong>Camp Arcane Salvager (Camp Skill 140 Station Blueprint):</strong>
              Allows Enchanters to disenchant equipment anywhere in the wild at your party's campfire with <strong>+15% yield efficiency</strong> and provides the party-wide <em>Enchanted Lute</em> aura (+308 Armor, +13 All Stats, +22 Resists)!
            </div>
          </div>

          <div class="de-matrix-table-wrap">
            <table class="de-matrix-table">
              <thead>
                <tr>
                  <th>Equipment iLvl</th>
                  <th>Dust Yield (Armor ~75%)</th>
                  <th>Essence Yield (Weapons ~75%)</th>
                  <th>Rare / Epic Shard (100%)</th>
                  <th>Notes</th>
                </tr>
              </thead>
              <tbody>
                ${(window.DISENCHANT_BRACKETS_DATA || []).map(b => {
                  const isHighlighted = (cleanLower.includes('strange dust') && (b.ilvl.includes('5–15') || b.ilvl.includes('16–25'))) ||
                    (cleanLower.includes('soul dust') && b.ilvl.includes('26–35')) ||
                    (cleanLower.includes('vision dust') && b.ilvl.includes('36–45')) ||
                    (cleanLower.includes('dream dust') && b.ilvl.includes('46–50')) ||
                    (cleanLower.includes('illusion dust') && b.ilvl.includes('51–60')) ||
                    (cleanLower.includes('magic essence') && (b.ilvl.includes('5–15') || b.ilvl.includes('16–25'))) ||
                    (cleanLower.includes('astral essence') && b.ilvl.includes('26–35')) ||
                    (cleanLower.includes('mystic essence') && b.ilvl.includes('36–45')) ||
                    (cleanLower.includes('nether essence') && b.ilvl.includes('46–50')) ||
                    (cleanLower.includes('eternal essence') && b.ilvl.includes('51–60')) ||
                    (cleanLower.includes('glimmering') && b.ilvl.includes('16–25')) ||
                    (cleanLower.includes('glowing') && b.ilvl.includes('26–35')) ||
                    (cleanLower.includes('radiant') && (b.ilvl.includes('36–45') || b.ilvl.includes('46–50'))) ||
                    (cleanLower.includes('brilliant') && b.ilvl.includes('51–60')) ||
                    (cleanLower.includes('nexus') && b.ilvl.includes('51–60'));
                  return `
                    <tr class="${isHighlighted ? 'de-row-highlight' : ''}">
                      <td><span class="de-ilvl-badge">${escapeHtml(b.ilvl)}</span></td>
                      <td>${escapeHtml(b.dust)}</td>
                      <td>${escapeHtml(b.essence)}</td>
                      <td>${escapeHtml(b.shard)}</td>
                      <td><small>${escapeHtml(b.notes)}</small></td>
                    </tr>
                  `;
                }).join('')}
              </tbody>
            </table>
          </div>

          ${src?.disenchant?.sampleItems?.length ? `
            <div class="reagent-source-section" style="margin-top: 1rem;">
              <h4 class="reagent-source-sec-title"><span>🗡️</span> Sample Disenchantable Items for ${escapeHtml(cleanName)} (${src.disenchant.sampleItems.length})</h4>
              <div class="reagent-source-grid">
                ${src.disenchant.sampleItems.map(it => `
                  <div class="reagent-source-card">
                    <div class="reagent-source-card-left">
                      <span class="reagent-drop-pct-badge med">iLvl ${it.ilvl || '?'}</span>
                      <div>
                        <div class="reagent-source-name q${it.quality || 2}">${escapeHtml(it.name)}</div>
                        <div class="reagent-source-sub">Disenchant gear or use Camp Arcane Salvager</div>
                      </div>
                    </div>
                    <a href="https://www.wowhead.com/forever/item=${it.id}" target="_blank" rel="noopener" class="reagent-npc-map-btn">
                      Item ↗
                    </a>
                  </div>
                `).join('')}
              </div>
            </div>
          ` : ''}
        </div>
      ` : '';

      // 1. Dedicated single-view modes (strictly separates fishing from mobs, etc.)
      if (viewMode === 'disenchant') {
        return `<div class="reagent-acquisition-body">${disenchantSectionHtml}</div>`;
      }
      if (viewMode === 'fishing') {
        return `<div class="reagent-acquisition-body">${summaryBoxHtml}${fishingSectionHtml || '<div class="reagent-lookup-empty">No fishing waters recorded for this item.</div>'}</div>`;
      }
      if (viewMode === 'drops') {
        return `<div class="reagent-acquisition-body">${summaryBoxHtml}${dropsSectionHtml || '<div class="reagent-lookup-empty">No mob drops recorded for this item.</div>'}</div>`;
      }
      if (viewMode === 'vendors') {
        return `<div class="reagent-acquisition-body">${summaryBoxHtml}${vendorsSectionHtml || '<div class="reagent-lookup-empty">No vendors recorded for this item.</div>'}</div>`;
      }
      if (viewMode === 'nodes') {
        return `<div class="reagent-acquisition-body">${summaryBoxHtml}${nodesSectionHtml || '<div class="reagent-lookup-empty">No world nodes recorded for this item.</div>'}</div>`;
      }
      if (viewMode === 'skinning') {
        return `<div class="reagent-acquisition-body">${summaryBoxHtml}${skinningSectionHtml || '<div class="reagent-lookup-empty">No skinnable beasts recorded for this item.</div>'}</div>`;
      }

      // 2. Multi-source views ("all" / "sources"): Dynamically prioritize sections based on primaryType
      const orderedSections = [summaryBoxHtml];
      if (src.primaryType === 'fished' || (src.fishedIn && src.fishedIn.length > 0 && !src.herbNode && !src.miningNode)) {
        // Fishing is strictly #1 at the top!
        if (fishingSectionHtml) orderedSections.push(fishingSectionHtml);
        if (vendorsSectionHtml) orderedSections.push(vendorsSectionHtml);
        if (containedSectionHtml) orderedSections.push(containedSectionHtml);
        if (dropsSectionHtml) orderedSections.push(dropsSectionHtml);
        if (craftedSectionHtml) orderedSections.push(craftedSectionHtml);
        if (nodesSectionHtml) orderedSections.push(nodesSectionHtml);
        if (skinningSectionHtml) orderedSections.push(skinningSectionHtml);
        if (disenchantSectionHtml) orderedSections.push(disenchantSectionHtml);
      } else if (src.primaryType === 'herb' || src.primaryType === 'ore') {
        if (nodesSectionHtml) orderedSections.push(nodesSectionHtml);
        if (vendorsSectionHtml) orderedSections.push(vendorsSectionHtml);
        if (dropsSectionHtml) orderedSections.push(dropsSectionHtml);
        if (craftedSectionHtml) orderedSections.push(craftedSectionHtml);
        if (fishingSectionHtml) orderedSections.push(fishingSectionHtml);
        if (skinningSectionHtml) orderedSections.push(skinningSectionHtml);
        if (disenchantSectionHtml) orderedSections.push(disenchantSectionHtml);
      } else if (src.primaryType === 'skinned') {
        if (skinningSectionHtml) orderedSections.push(skinningSectionHtml);
        if (dropsSectionHtml) orderedSections.push(dropsSectionHtml);
        if (vendorsSectionHtml) orderedSections.push(vendorsSectionHtml);
        if (containedSectionHtml) orderedSections.push(containedSectionHtml);
        if (disenchantSectionHtml) orderedSections.push(disenchantSectionHtml);
      } else if (src.primaryType === 'vendor') {
        if (vendorsSectionHtml) orderedSections.push(vendorsSectionHtml);
        if (dropsSectionHtml) orderedSections.push(dropsSectionHtml);
        if (containedSectionHtml) orderedSections.push(containedSectionHtml);
        if (craftedSectionHtml) orderedSections.push(craftedSectionHtml);
        if (disenchantSectionHtml) orderedSections.push(disenchantSectionHtml);
      } else {
        // Default mob_drop / crafted
        if (craftedSectionHtml) orderedSections.push(craftedSectionHtml);
        if (dropsSectionHtml) orderedSections.push(dropsSectionHtml);
        if (fishingSectionHtml) orderedSections.push(fishingSectionHtml);
        if (skinningSectionHtml) orderedSections.push(skinningSectionHtml);
        if (nodesSectionHtml) orderedSections.push(nodesSectionHtml);
        if (vendorsSectionHtml) orderedSections.push(vendorsSectionHtml);
        if (containedSectionHtml) orderedSections.push(containedSectionHtml);
        if (disenchantSectionHtml) orderedSections.push(disenchantSectionHtml);
      }

      return `<div class="reagent-acquisition-body">${orderedSections.join('')}</div>`;
    }

    function renderModalContent() {
      const filteredMatches = activeFilter === 'all' 
        ? matches 
        : matches.filter(m => m.profSlug === activeFilter);

      const wowheadHref = sourceData?.wowheadUrl || (resolvedId ? `https://www.wowhead.com/forever/item=${resolvedId}` : `https://www.wowhead.com/forever/search?q=${encodeURIComponent(cleanName)}`);

      // View Switcher Tabs Bar
      const viewTabs = [];
      if (hasDisenchant) {
        viewTabs.push(`
          <button type="button" class="reagent-view-tab-btn ${activeModalView === 'disenchant' ? 'active' : ''}" data-view="disenchant">
            <span>✨</span> Disenchanting Matrix
          </button>
        `);
      }
      if (hasFishing) {
        viewTabs.push(`
          <button type="button" class="reagent-view-tab-btn ${activeModalView === 'fishing' ? 'active' : ''}" data-view="fishing">
            <span>🎣</span> Where to Fish (${sourceData.fishedIn.length})
          </button>
        `);
      }
      if (hasDrops) {
        const dropCount = sourceData.totalDropMobs || sourceData.drops.length;
        viewTabs.push(`
          <button type="button" class="reagent-view-tab-btn ${activeModalView === 'drops' ? 'active' : ''}" data-view="drops">
            <span>⚔️</span> Mob Drops (${dropCount})
          </button>
        `);
      }
      if (hasVendors) {
        const vCount = sourceData.totalVendors || sourceData.vendors.length;
        viewTabs.push(`
          <button type="button" class="reagent-view-tab-btn ${activeModalView === 'vendors' ? 'active' : ''}" data-view="vendors">
            <span>🪙</span> Vendors (${vCount})
          </button>
        `);
      }
      if (hasNodes) {
        const isMine = sourceData.primaryType === 'ore';
        viewTabs.push(`
          <button type="button" class="reagent-view-tab-btn ${activeModalView === 'nodes' ? 'active' : ''}" data-view="nodes">
            <span>${isMine ? '⛏️' : '🌿'}</span> ${isMine ? 'Mining Veins' : 'Herb Nodes'}
          </button>
        `);
      }
      if (hasSkinning) {
        viewTabs.push(`
          <button type="button" class="reagent-view-tab-btn ${activeModalView === 'skinning' ? 'active' : ''}" data-view="skinning">
            <span>🔪</span> Beast Skinning (${sourceData.skinnedFrom.length})
          </button>
        `);
      }
      if (matches.length > 0) {
        viewTabs.push(`
          <button type="button" class="reagent-view-tab-btn ${activeModalView === 'recipes' ? 'active' : ''}" data-view="recipes">
            <span>📜</span> Used in Recipes (${matches.length})
          </button>
        `);
      }
      const numSources = (hasFishing ? 1 : 0) + (hasDrops ? 1 : 0) + (hasVendors ? 1 : 0) + (hasNodes ? 1 : 0) + (hasSkinning ? 1 : 0);
      if (numSources > 1) {
        viewTabs.push(`
          <button type="button" class="reagent-view-tab-btn ${activeModalView === 'all' || activeModalView === 'sources' ? 'active' : ''}" data-view="all">
            <span>📋</span> All Sources
          </button>
        `);
      }

      modal.innerHTML = `
        <div class="reagent-lookup-dialog">
          <div class="reagent-lookup-head">
            <div class="reagent-lookup-title-box">
              <img src="${iconUrl}" alt="${escapeHtml(cleanName)}" class="reagent-lookup-img q${matQuality}" />
              <div>
                <h3 class="q${matQuality}">
                  ${escapeHtml(cleanName)}
                  ${sourceData?.isForeverNew ? '<span class="recipe-new-tag" style="vertical-align:middle; margin-left:0.35rem;">New</span>' : ''}
                </h3>
                <p>Required in <strong>${matches.length}</strong> recipe${matches.length === 1 ? '' : 's'} across <strong>${profNames.length || 1}</strong> trade${profNames.length === 1 ? '' : 's'}</p>
              </div>
            </div>

            <div class="reagent-lookup-head-actions">
              <a href="${wowheadHref}" target="_blank" rel="noopener" class="reagent-head-wowhead-btn" title="Open ${escapeHtml(cleanName)} on Wowhead Forever Database">
                <span>🌐</span> Wowhead ↗
              </a>
              <button type="button" class="reagent-lookup-close" id="reagent-lookup-close-btn" aria-label="Close dialog">✕</button>
            </div>
          </div>

          <!-- Multi-Source View Switcher Bar -->
          <div class="reagent-modal-view-tabs">
            ${viewTabs.join('')}
          </div>

          ${activeModalView === 'recipes' ? `
            ${profNames.length > 1 ? `
              <div class="reagent-lookup-chips">
                <button type="button" class="reagent-filter-chip ${activeFilter === 'all' ? 'active' : ''}" data-prof="all">
                  All Trades (${matches.length})
                </button>
                ${Object.entries(profCounts).map(([name, count]) => {
                  const slug = Object.keys(data).find(k => data[k].name === name);
                  return `
                    <button type="button" class="reagent-filter-chip ${activeFilter === slug ? 'active' : ''}" data-prof="${slug}">
                      ${escapeHtml(name)} (${count})
                    </button>
                  `;
                }).join('')}
              </div>
            ` : ''}

            <div class="reagent-lookup-list">
              ${filteredMatches.length === 0 ? `
                <div class="reagent-lookup-empty">No recipes found using this component.</div>
              ` : filteredMatches.map((m, idx) => {
                const r = m.recipe;
                const qClass = `q${r.quality || 1}`;
                return `
                  <div class="reagent-lookup-row" data-recipe-idx="${idx}">
                    <div class="reagent-lookup-row-main" style="cursor: pointer;" data-slug="${m.profSlug}" data-recipe-id="${r.id || ''}" data-recipe-name="${escapeHtml(r.name)}" title="Click to view full recipe details card in ${escapeHtml(m.profName)}">
                      <img src="${getIconUrl(r.icon, r.name, r.source)}" alt="${escapeHtml(r.name)}" class="reagent-row-icon ${qClass}" data-recipe-idx="${idx}" />
                      <div>
                        <div class="reagent-row-name ${qClass}" data-recipe-idx="${idx}">${escapeHtml(r.name)}</div>
                        <div class="reagent-row-meta">
                          <span class="reagent-row-prof">
                            <img src="${getIconUrl(m.profIcon)}" alt="${escapeHtml(m.profName)}" />
                            ${escapeHtml(m.profName)}
                          </span>
                          <span class="reagent-row-skill">Skill ${r.learn}</span>
                          <span class="reagent-row-qty">Requires: <strong>${m.neededCount}x</strong></span>
                        </div>
                      </div>
                    </div>
                    <button type="button" class="reagent-jump-btn" data-slug="${m.profSlug}" data-recipe-id="${r.id || ''}" data-recipe-name="${escapeHtml(r.name)}">
                      View in ${escapeHtml(m.profName)} ›
                    </button>
                  </div>
                `;
              }).join('')}
            </div>
          ` : `
            <div class="reagent-lookup-list reagent-sources-scroll">
              ${renderAcquisitionView(sourceData, activeModalView)}
            </div>
          `}
        </div>
      `;

      const closeBtn = modal.querySelector('#reagent-lookup-close-btn');
      if (closeBtn) closeBtn.addEventListener('click', closeReagentModal);

      modal.querySelectorAll('.reagent-view-tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          activeModalView = btn.getAttribute('data-view');
          renderModalContent();
        });
      });

      modal.querySelectorAll('.reagent-filter-chip').forEach(btn => {
        btn.addEventListener('click', () => {
          activeFilter = btn.getAttribute('data-prof');
          renderModalContent();
        });
      });

      // Recipe icon and title hover tooltips + card click inside reagent lookup dialog
      modal.querySelectorAll('.reagent-lookup-row').forEach(row => {
        const idx = parseInt(row.getAttribute('data-recipe-idx') || '-1', 10);
        const m = filteredMatches[idx];
        if (!m) return;
        const r = m.recipe;

        const mainEl = row.querySelector('.reagent-lookup-row-main');
        const iconEl = row.querySelector('.reagent-row-icon');
        const nameEl = row.querySelector('.reagent-row-name');

        const extra = {
          type: `${m.profName || 'Crafted'} Item`,
          skillReq: `${m.profName} (${r.learn})`,
          source: r.source || 'Trainer'
        };

        const onEnter = (e) => {
          showItemTooltip(e, r.name, r.quality || 1, r.effect || '', r.reagents || null, extra);
        };
        const onMove = (e) => {
          const tt = document.getElementById('wow-item-tooltip');
          if (tt) positionTooltip(e, tt);
        };
        const onLeave = () => hideItemTooltip();

        [iconEl, nameEl].forEach(el => {
          if (!el) return;
          el.addEventListener('mouseenter', onEnter);
          el.addEventListener('mousemove', onMove);
          el.addEventListener('mouseleave', onLeave);
        });

        if (mainEl) {
          mainEl.addEventListener('click', (e) => {
            if (e.target.closest('.reagent-jump-btn')) return;
            hideItemTooltip();
            closeReagentModal();
            if (window.setReturnTarget) {
              window.setReturnTarget({
                label: `Reagent: ${cleanName}`,
                tab: 'professions',
                profession: (window.WOW_PROFESSIONS?.getCurrentProfession ? window.WOW_PROFESSIONS.getCurrentProfession() : 'overview'),
                subtab: (window.WOW_PROFESSIONS?.getCurrentSubTab ? window.WOW_PROFESSIONS.getCurrentSubTab() : 'recipes'),
                reagentModal: cleanName,
                scrollY: window.scrollY
              });
            }
            if (window.WOW_PROFESSIONS && window.WOW_PROFESSIONS.selectProfession) {
              window.WOW_PROFESSIONS.selectProfession(m.profSlug, 'recipes', r.name, r.id ? `recipe-${r.id}` : undefined);
            }
          });
        }
      });

      modal.querySelectorAll('.reagent-jump-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const targetSlug = btn.getAttribute('data-slug');
          const targetName = btn.getAttribute('data-recipe-name');
          const targetId = btn.getAttribute('data-recipe-id');
          hideItemTooltip();
          closeReagentModal();
          if (window.setReturnTarget) {
            window.setReturnTarget({
              label: `Reagent: ${cleanName}`,
              tab: 'professions',
              profession: (window.WOW_PROFESSIONS?.getCurrentProfession ? window.WOW_PROFESSIONS.getCurrentProfession() : 'overview'),
              subtab: (window.WOW_PROFESSIONS?.getCurrentSubTab ? window.WOW_PROFESSIONS.getCurrentSubTab() : 'recipes'),
              reagentModal: cleanName,
              scrollY: window.scrollY
            });
          }
          if (window.WOW_PROFESSIONS && window.WOW_PROFESSIONS.selectProfession) {
            window.WOW_PROFESSIONS.selectProfession(targetSlug, 'recipes', targetName, targetId ? `recipe-${targetId}` : undefined);
          }
        });
      });

      modal.querySelectorAll('.reagent-internal-jump-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const targetSlug = btn.getAttribute('data-jump-prof');
          const targetSub = btn.getAttribute('data-jump-subtab');
          hideItemTooltip();
          closeReagentModal();
          if (window.setReturnTarget) {
            window.setReturnTarget({
              label: `Reagent: ${cleanName}`,
              tab: 'professions',
              profession: (window.WOW_PROFESSIONS?.getCurrentProfession ? window.WOW_PROFESSIONS.getCurrentProfession() : 'overview'),
              subtab: (window.WOW_PROFESSIONS?.getCurrentSubTab ? window.WOW_PROFESSIONS.getCurrentSubTab() : 'recipes'),
              reagentModal: cleanName,
              scrollY: window.scrollY
            });
          }
          if (window.WOW_PROFESSIONS && window.WOW_PROFESSIONS.selectProfession) {
            window.WOW_PROFESSIONS.selectProfession(targetSlug, targetSub);
          }
        });
      });
    }

    renderModalContent();
    modal.classList.add('is-open');
    modal.removeAttribute('hidden');
  }

  // Dismiss tooltips when tapping outside on touch devices
  if (typeof document !== 'undefined' && typeof document.addEventListener === 'function') {
    document.addEventListener('pointerdown', (e) => {
      const tt = document.getElementById('wow-item-tooltip');
      if (tt && !e.target.closest('.reagent-chip, .recipe-item-icon, .recipe-title, .favor-recipe-card, .camp-tooltip-item, .step-recipe-name, .shopping-row-card')) {
        hideItemTooltip();
      }
    });
  }

  // Global listeners for TomTom /way copy and BiS badge jump
  if (typeof document !== 'undefined' && typeof document.addEventListener === 'function') {
    document.addEventListener('click', (e) => {
      const tomtomBtn = e.target.closest('.tomtom-way-btn');
      if (tomtomBtn) {
        e.preventDefault();
        e.stopPropagation();
        const macro = tomtomBtn.getAttribute('data-macro');
        if (macro) {
          if (typeof window.copyMacroToClipboard === 'function') {
            window.copyMacroToClipboard(macro, tomtomBtn);
            if (typeof window.showToast === 'function') {
              window.showToast(`✓ Copied TomTom macro: ${macro}`, 'success');
            }
          } else if (typeof window.copyTextToClipboard === 'function') {
            window.copyTextToClipboard(macro, () => {
              tomtomBtn.classList.add('copied');
              setTimeout(() => tomtomBtn.classList.remove('copied'), 1800);
              if (typeof window.showToast === 'function') {
                window.showToast(`✓ Copied TomTom macro: ${macro}`, 'success');
              }
            });
          } else if (navigator.clipboard) {
            navigator.clipboard.writeText(macro).then(() => {
              tomtomBtn.classList.add('copied');
              setTimeout(() => tomtomBtn.classList.remove('copied'), 1800);
              if (typeof window.showToast === 'function') {
                window.showToast(`✓ Copied TomTom macro: ${macro}`, 'success');
              }
            }).catch(() => {});
          }
        }
        return;
      }

      const bisBtn = e.target.closest('.recipe-bis-badge');
      if (bisBtn) {
        e.preventDefault();
        e.stopPropagation();
        const cls = bisBtn.getAttribute('data-class');
        const sp = bisBtn.getAttribute('data-spec');
        if (cls && sp) {
          if (window.setReturnTarget) {
            const currentProfObj = window.WOW_PROFESSIONS_DATA && window.WOW_PROFESSIONS_DATA[(window.WOW_PROFESSIONS?.getCurrentProfession ? window.WOW_PROFESSIONS.getCurrentProfession() : 'overview')];
            const profLabel = currentProfObj ? currentProfObj.name : 'Professions';
            window.setReturnTarget({
              label: `${profLabel} Recipes`,
              tab: 'professions',
              profession: (window.WOW_PROFESSIONS?.getCurrentProfession ? window.WOW_PROFESSIONS.getCurrentProfession() : 'overview'),
              subtab: (window.WOW_PROFESSIONS?.getCurrentSubTab ? window.WOW_PROFESSIONS.getCurrentSubTab() : 'recipes'),
              scrollY: window.scrollY
            });
          }
          const bisTabBtn = document.querySelector('.nav-tab-btn[data-tab="bis"]');
          if (bisTabBtn) bisTabBtn.click();
          window.location.hash = `#bis/${cls}/${sp}`;
          if (typeof window.showToast === 'function') {
            window.showToast(`Navigating to ${cls} (${sp}) BiS gear list...`, 'info');
          }
        }
        return;
      }
    });
  }

  window.WOW_PROFESSIONS_MODAL = {
    parseRecipeEffect,
    showItemTooltip,
    positionTooltip,
    hideItemTooltip,
    attachTooltipListeners,
    resolveReagentSource,
    openReverseReagentLookup
  };
})();
