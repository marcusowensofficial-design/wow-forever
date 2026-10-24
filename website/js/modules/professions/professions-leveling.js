/**
 * World of Warcraft: Forever - Professions 1-300 Leveling Roadmaps & Shopping Calculator
 */
(function () {
  "use strict";

  const core = window.WOW_PROFESSIONS_CORE || {};
  const escapeHtml = core.escapeHtml || window.escapeHtml || (s => String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"));
  const getIconUrl = core.getIconUrl || ((icon) => "https://wow.zamimg.com/images/wow/icons/medium/" + (icon || "inv_misc_questionmark") + ".jpg");
  const formatWaypointsInHtml = core.formatWaypointsInHtml || (h => h);

  function attachTooltipListeners(container, prof) {
    if (window.WOW_PROFESSIONS_MODAL && window.WOW_PROFESSIONS_MODAL.attachTooltipListeners) {
      window.WOW_PROFESSIONS_MODAL.attachTooltipListeners(container, prof);
    }
  }

  function resolveStepCraftedItem(item, prof) {
    if (!item) return { name: '', icon: null, quality: 1, effect: '', reagents: null, learn: '1', source: 'Trainer', id: null, targetSubtab: 'recipes', recipeObj: null };
    const name = item.recipeName || item.name || '';
    if (!name) return { name: '', icon: null, quality: 1, effect: '', reagents: null, learn: '1', source: 'Trainer', id: null, targetSubtab: 'recipes', recipeObj: null };

    const cleanName = name.toLowerCase()
      .replace(/^make (a|an) /i, '')
      .replace(/\s*\(smelting bypass\)$/i, '')
      .trim();
    const smeltTarget = cleanName.startsWith('smelt ') ? `${cleanName.replace(/^smelt\s+/, '')} bar` : null;
    const recipesList = (prof && prof.recipes) || [];

    // 1. Exact name or Smelt Bar match first
    let match = recipesList.find(r => {
      if (!r || !r.name) return false;
      const rn = r.name.toLowerCase();
      return rn === name.toLowerCase() || rn === cleanName || (smeltTarget && rn === smeltTarget);
    });

    // 2. Fallback to itemId match
    if (!match && item.itemId) {
      match = recipesList.find(r => r && (String(r.id) === String(item.itemId) || String(r.itemId) === String(item.itemId)));
    }

    // 3. Fallback to substring match
    if (!match) {
      match = recipesList.find(r => {
        if (!r || !r.name) return false;
        const rn = r.name.toLowerCase();
        return rn.includes(cleanName) || cleanName.includes(rn);
      });
    }

    if (match) {
      return {
        name: match.name,
        icon: match.icon,
        quality: match.quality || 1,
        effect: match.effect || item.advice || item.source || '',
        reagents: match.reagents || item.reagents || null,
        learn: match.learn !== undefined ? match.learn : (item.from !== undefined ? `${item.from}–${item.to}` : '1'),
        source: match.source || item.source || 'Trainer',
        id: match.id || item.itemId || null,
        targetSubtab: 'recipes',
        recipeObj: match
      };
    }

    // 4. Camping station, campfire & upgrade lookup
    if (prof && prof.slug === 'camping') {
      const campingAliasMap = {
        'basic campfire kit': { subtab: 'guide', target: 'Basic Campfire Kit' },
        'journeyman campfire kit': { subtab: 'guide', target: 'Journeyman Campfire Kit' },
        'expert campfire kit': { subtab: 'guide', target: 'Expert Campfire Kit' },
        'lean-to shelter': { subtab: 'buffs', target: 'Camp Tent' },
        'linen wall tent': { subtab: 'buffs', target: 'Camp Tent' },
        'silk trail pavilion': { subtab: 'buffs', target: 'Camp Tent' },
        'field tanning rack': { subtab: 'upgrades', target: 'Tanning Rack' },
        'field spinning wheel': { subtab: 'upgrades', target: 'Spinning Wheel' },
        'portable blacksmithing anvil': { subtab: 'upgrades', target: 'Anvil' },
        'field alchemy cauldron': { subtab: 'upgrades', target: 'Fermenter' },
        "cookie's feast": { subtab: 'upgrades', target: "Cookie's Feast" }
      };
      const alias = campingAliasMap[cleanName];
      const lookupKey = alias ? alias.target.toLowerCase() : cleanName;

      const cf = (prof.campfires || []).find(c => c && c.name && (c.name.toLowerCase() === lookupKey || lookupKey.includes(c.name.toLowerCase()) || c.name.toLowerCase().includes(lookupKey)));
      if (cf) {
        return {
          name: item.recipeName || cf.name,
          targetName: alias?.target || cf.name,
          icon: cf.icon || 'inv_camelot_camping_welcomingcampfire',
          quality: cf.quality || 2,
          effect: `${cf.desc || ''} (Holds ${cf.capacity || 3} stations)`,
          learn: cf.skillReq || (item.from !== undefined ? `${item.from}–${item.to}` : '1'),
          source: cf.blueprint ? cf.blueprint.text : (item.source || 'Camping Trainer'),
          reagents: item.reagents || cf.reagents || null,
          id: item.itemId || null,
          targetSubtab: 'guide',
          recipeObj: null
        };
      }

      const bf = (prof.buffObjects || []).find(b => b && b.object && (b.object.toLowerCase() === lookupKey || lookupKey.includes(b.object.toLowerCase())));
      if (bf) {
        return {
          name: item.recipeName || bf.object,
          targetName: alias?.target || bf.object,
          icon: bf.icon || 'inv_misc_pelt_wolf_01',
          quality: cleanName.includes('silk') ? 3 : 2,
          effect: item.advice ? `${item.advice} (${bf.object}: ${bf.gives})` : bf.gives,
          learn: (item.from !== undefined && item.to !== undefined) ? `${item.from}–${item.to}` : `${bf.profName || 'Camping'} ${bf.skillReq || ''}`.trim(),
          source: item.source || 'Camping Trainer',
          reagents: item.reagents || bf.reagents || null,
          id: item.itemId || null,
          targetSubtab: 'buffs',
          recipeObj: null
        };
      }

      if (prof.upgrades) {
        for (const u of prof.upgrades) {
          if (u.s140?.name && (u.s140.name.toLowerCase() === lookupKey || lookupKey.includes(u.s140.name.toLowerCase()))) {
            return {
              name: item.recipeName || u.s140.name,
              targetName: alias?.target || u.s140.name,
              icon: u.s140.icon,
              quality: 2,
              effect: item.advice ? `${item.advice} (${u.s140.desc})` : u.s140.desc,
              learn: (item.from !== undefined && item.to !== undefined) ? `${item.from}–${item.to}` : u.s140.skill,
              source: item.source || 'Camping Blueprint',
              reagents: item.reagents || null,
              id: item.itemId || null,
              targetSubtab: 'upgrades',
              recipeObj: null
            };
          }
          if (u.s300?.name && (u.s300.name.toLowerCase() === lookupKey || lookupKey.includes(u.s300.name.toLowerCase()))) {
            return {
              name: item.recipeName || u.s300.name,
              targetName: alias?.target || u.s300.name,
              icon: u.s300.icon,
              quality: 3,
              effect: item.advice ? `${item.advice} (${u.s300.desc})` : u.s300.desc,
              learn: (item.from !== undefined && item.to !== undefined) ? `${item.from}–${item.to}` : u.s300.skill,
              source: item.source || 'Camping Blueprint',
              reagents: item.reagents || null,
              id: item.itemId || null,
              targetSubtab: 'upgrades',
              recipeObj: null
            };
          }
        }
      }
    }

    // 5. Fallback against window.WOW_REAGENT_SOURCES
    if (window.WOW_REAGENT_SOURCES) {
      const rSources = window.WOW_REAGENT_SOURCES;
      const rEntry = Object.values(rSources).find(r => r && ((r.name && r.name.toLowerCase() === cleanName) || (item.itemId && String(r.id) === String(item.itemId))));
      if (rEntry) {
        return {
          name: rEntry.name,
          icon: rEntry.icon || null,
          quality: rEntry.quality || 1,
          effect: rEntry.summary || '',
          reagents: item.reagents || null,
          learn: (item.from !== undefined && item.to !== undefined) ? `${item.from}–${item.to}` : '1',
          source: item.source || 'Trainer',
          id: rEntry.id,
          targetSubtab: 'recipes',
          recipeObj: null
        };
      }
    }

    // 6. Generic Fallback
    return {
      name: item.recipeName || item.name || name,
      icon: item.icon || null,
      quality: item.vendorDetails ? 2 : (item.quality || 1),
      effect: item.advice || item.source || '',
      reagents: item.reagents || null,
      learn: (item.from !== undefined && item.to !== undefined) ? `${item.from}–${item.to}` : '1',
      source: item.source || 'Trainer',
      id: item.itemId || null,
      targetSubtab: 'recipes',
      recipeObj: null
    };
  }

  function renderLevelingTab(container, prof) {
    const leveling = prof.leveling || {};
    const steps = leveling.steps || [];

    if (steps.length === 0) {
      container.innerHTML = `
        <div style="text-align: center; padding: 3rem; color: #94a3b8; background: rgba(15,23,42,0.5); border-radius: 8px;">
          Leveling roadmap for ${escapeHtml(prof.name)} is based on open-world node harvesting and gathering skill gains.
        </div>
      `;
      return;
    }

    const levelingStorageKey = `wowforever_leveling_${prof.slug}`;
    let completedSteps = [];
    try {
      completedSteps = JSON.parse(localStorage.getItem(levelingStorageKey) || '[]');
      if (!Array.isArray(completedSteps)) completedSteps = [];
    } catch {
      completedSteps = [];
    }

    const actionableSteps = steps.filter(s => s.type === 'step' || s.type === 'gather-step');
    const totalStepsCount = actionableSteps.length;
    const initialCompletedCount = steps.filter((s, i) => (s.type === 'step' || s.type === 'gather-step') && completedSteps.includes(`${prof.slug}_step_${i}`)).length;
    const initialPct = totalStepsCount > 0 ? Math.round((initialCompletedCount / totalStepsCount) * 100) : 0;

    const guideCallouts = leveling.guideCallouts || [];
    const calloutsHtml = guideCallouts.length ? `
      <div class="leveling-guide-callouts">
        ${guideCallouts.map(c => `
          <div class="leveling-guide-callout-card">
            <span class="callout-icon">${c.icon || '💡'}</span>
            <div class="callout-body">
              <strong>${escapeHtml(c.title)}</strong>
              <p>${escapeHtml(c.text)}</p>
            </div>
          </div>
        `).join('')}
      </div>
    ` : '';

    container.innerHTML = `
      <div class="leveling-header-block">
        <div class="leveling-header-title">
          <h3>
            ${escapeHtml(leveling.title || 'LEVELING FROM 1 TO 300')}
            <span class="beta-cap-tag">${escapeHtml(leveling.capNote || "225 is the beta's cap for now")}</span>
          </h3>
          <p>${escapeHtml(leveling.desc || "At each point, you get the cheapest recipe to skill up, whether you learn it from the trainer or buy it from a vendor. Counts are averages, so buy a few more. There are no prices until launch, so each reagent counts for what a vendor pays you for it.")}</p>
        </div>
        <div style="display: flex; gap: 0.5rem; align-items: center; flex-wrap: wrap;">
          <button type="button" class="shopping-copy-btn shopping-reset-btn" id="leveling-reset-btn" aria-label="Reset leveling checklist" title="Reset all checked leveling crafts">
            <span>↺</span> Reset Checklist
          </button>
        </div>
      </div>

      ${calloutsHtml}

      <!-- Interactive Leveling Checklist Progress Bar -->
      <div class="shopping-checklist-bar leveling-checklist-bar">
        <div class="shopping-progress-labels">
          <span>
            <strong>Leveling Milestones Completed:</strong> 
            <span id="leveling-progress-count">${initialCompletedCount}</span> / ${totalStepsCount} (<span id="leveling-progress-pct">${initialPct}%</span>)
          </span>
          <span style="font-size: 0.75rem; color: #94a3b8;">Check off each recipe or bracket as you advance in-game</span>
        </div>
        <div class="shopping-progress-track">
          <div class="shopping-progress-fill leveling-progress-fill" id="leveling-progress-fill" style="width: ${initialPct}%;"></div>
        </div>
      </div>

      <div class="leveling-roadmap-list">
        ${steps.map((item, idx) => {
          const stepId = `${prof.slug}_step_${idx}`;
          const isCompleted = completedSteps.includes(stepId);

          if (item.type === 'rank') {
            const isArtisan = item.rank && item.rank.toLowerCase().includes('artisan');
            return `
              ${isArtisan && !steps.some(s => s.type === 'beta-stop') ? `
                <div class="leveling-beta-stop-banner">
                  <div class="beta-stop-title">🔒 THE BETA STOPS AT 225 (REQUIRES LEVEL 35)</div>
                  <p>In Closed Beta Phase 2, player level is capped at 30. Artisan training requires Character Level 35 and skill 200+. These 225–300 steps outline the fastest path once Phase 3 unlocks.</p>
                </div>
              ` : ''}
              <div class="leveling-rank-divider">
                <strong class="rank-name">${escapeHtml(item.rank)}</strong>
                <span class="rank-details">${formatWaypointsInHtml(escapeHtml(item.details))}</span>
                ${isArtisan ? `<span class="rank-phase-badge" style="background: rgba(239, 68, 68, 0.2); border: 1px solid #ef4444; color: #fca5a5; font-size: 0.72rem; padding: 2px 8px; border-radius: 4px; font-weight: 700; margin-left: auto;">Phase 3 (Req Lvl 35)</span>` : ''}
              </div>
            `;
          }
          if (item.type === 'beta-stop') {
            return `
              <div class="leveling-beta-stop-banner">
                <div class="beta-stop-title">ARTISAN TRAINING (SKILL 225–300)</div>
                <p>Advance past 225 by learning Artisan from your master trainer (Character Level 35 required). Full 225–300 leveling route detailed below.</p>
              </div>
            `;
          }
          if (item.type === 'step') {
            const rangeStr = (item.from !== null && item.from !== undefined)
              ? (item.to !== null && item.to !== undefined && item.to !== item.from ? `${item.from}–${item.to}` : `${item.from}`)
              : '';
            const leftPercent = item.bar?.iLeft || '0%';
            const widthPercent = item.bar?.iWidth || '10%';
            const craftsNum = item.crafts || 1;
            const vd = item.vendorDetails;
            const supplyClass = vd?.supply
              ? (vd.supply.toLowerCase().includes('unlimited') ? 'unlimited' : (vd.supply.toLowerCase().includes('limited') ? 'limited' : 'drop'))
              : '';
            const resolved = resolveStepCraftedItem(item, prof);
            const craftedIconUrl = getIconUrl(resolved.icon, resolved.name, resolved.source);
            const qualityClass = `q${resolved.quality || 1}`;

            return `
              <div class="leveling-step-row ${isCompleted ? 'completed' : ''}" data-step-id="${stepId}" data-step-idx="${idx}">
                <div class="step-check-col">
                  <input type="checkbox" class="leveling-step-check" ${isCompleted ? 'checked' : ''} aria-label="Mark ${escapeHtml(item.recipeName)} as completed" />
                </div>
                <div class="step-range-col">
                  <span class="step-range-text">${rangeStr}</span>
                  <div class="step-progress-track">
                    <span class="step-progress-fill" style="left: ${leftPercent}; width: ${widthPercent};"></span>
                    <span class="step-progress-cap-marker" style="left: 74.67%;" title="Beta Cap at 225"></span>
                  </div>
                </div>
                <div class="step-info-col">
                  <div class="step-recipe-header">
                    <div class="step-crafted-icon-wrap ${qualityClass}" data-recipe-name="${escapeHtml(item.recipeName)}" data-step-idx="${idx}" role="button" tabindex="0" aria-label="View ${escapeHtml(item.recipeName)} in catalog" title="Click to view in catalog · Hover for full item stats">
                      <img src="${craftedIconUrl}" alt="${escapeHtml(item.recipeName)}" class="step-crafted-icon ${qualityClass}" loading="lazy" />
                    </div>
                    <div class="step-recipe-name ${qualityClass} is-clickable" role="button" tabindex="0" data-item-id="${item.itemId || resolved.id || ''}" data-recipe-name="${escapeHtml(item.recipeName)}" data-step-idx="${idx}" aria-label="View ${escapeHtml(item.recipeName)} in catalog" title="Click to view in catalog · Hover for full recipe details">
                      <span>${escapeHtml(item.recipeName)}</span>
                      <span class="step-recipe-jump-hint">↗</span>
                    </div>
                  </div>
                  <div class="step-source-line">${escapeHtml(item.source)}</div>
                  ${vd ? `
                    <div class="step-vendor-meta">
                      <span class="vendor-meta-chip">📍 ${formatWaypointsInHtml(escapeHtml(vd.location))}</span>
                      ${vd.cost ? `<span class="vendor-meta-chip cost">🪙 ${escapeHtml(vd.cost)}</span>` : ''}
                      ${vd.supply ? `<span class="vendor-meta-chip supply ${supplyClass}">${escapeHtml(vd.supply)}</span>` : ''}
                    </div>
                  ` : ''}
                  ${item.trainerAlternative ? `<div class="step-trainer-backup">🔄 ${formatWaypointsInHtml(escapeHtml(item.trainerAlternative))}</div>` : ''}
                  ${item.advice ? `<div class="step-advice-note">💡 ${formatWaypointsInHtml(escapeHtml(item.advice))}</div>` : ''}
                </div>
                <div class="step-crafts-col">
                  <div class="step-crafts-count">~${craftsNum}</div>
                  <div class="step-crafts-label">crafts</div>
                </div>
                <div class="step-reagents-col">
                  ${(item.reagents || []).map(mat => {
                    const perCraft = mat.count || 1;
                    const totalForStep = craftsNum * perCraft;
                    const tooltipTitle = craftsNum > 1
                      ? `${perCraft}x ${mat.name} per craft (${totalForStep}x total for ~${craftsNum} crafts)`
                      : `${perCraft}x ${mat.name}`;
                    return `
                      <div class="step-reagent-badge has-total-math" data-item-id="${mat.itemId}" data-item-name="${escapeHtml(mat.name)}" data-per-craft="${perCraft}" data-total-step="${totalForStep}" data-crafts="${craftsNum}" title="${escapeHtml(tooltipTitle)}">
                        <div class="step-reagent-icon-wrap">
                          <img src="${getIconUrl(mat.icon, mat.name)}" alt="${escapeHtml(mat.name)}" class="step-reagent-img q${mat.quality || 1}" loading="lazy" />
                          <span class="step-reagent-qty" title="${perCraft}x per craft">${perCraft}x</span>
                        </div>
                        ${craftsNum > 1 ? `<span class="step-reagent-total-pill" title="${totalForStep}x total across ~${craftsNum} crafts">=${totalForStep}</span>` : ''}
                      </div>
                    `;
                  }).join('')}
                </div>
              </div>
            `;
          }
          if (item.type === 'gather-step') {
            const rangeStr = (item.from !== null && item.from !== undefined)
              ? (item.to && item.to !== item.from ? `${item.from}–${item.to}` : `${item.from}`)
              : '1–300';
            const leftPercent = item.bar?.iLeft || '0%';
            const widthPercent = item.bar?.iWidth || '12%';
            return `
              <div class="leveling-step-row ${isCompleted ? 'completed' : ''}" data-step-id="${stepId}">
                <div class="step-check-col">
                  <input type="checkbox" class="leveling-step-check" ${isCompleted ? 'checked' : ''} aria-label="Mark ${escapeHtml(item.title)} as completed" />
                </div>
                <div class="step-range-col">
                  <span class="step-range-text">${rangeStr}</span>
                  <div class="step-progress-track">
                    <span class="step-progress-fill" style="left: ${leftPercent}; width: ${widthPercent};"></span>
                    <span class="step-progress-cap-marker" style="left: 74.67%;" title="Beta Cap at 225"></span>
                  </div>
                </div>
                <div class="step-info-col">
                  <strong style="color: var(--text-gold, #facc15); font-size: 1.05rem;">${escapeHtml(item.title)}</strong>
                  <div class="step-source-line" style="color: #cbd5e1; margin-top: 0.25rem;">${formatWaypointsInHtml(escapeHtml(item.zones))}</div>
                </div>
                <div class="step-reagents-col" style="grid-column: 4 / -1;">
                  ${(item.icons || []).map(ic => `
                    <div class="step-reagent-badge" title="${escapeHtml(ic.name)}" data-item-id="${ic.itemId || ''}" data-item-name="${escapeHtml(ic.name)}">
                      <img src="${getIconUrl(ic.icon, ic.name)}" alt="${escapeHtml(ic.name)}" class="step-reagent-img" loading="lazy" />
                    </div>
                  `).join('')}
                </div>
              </div>
            `;
          }
          return '';
        }).join('')}
      </div>
    `;

    function updateLevelingProgress() {
      const curCompleted = steps.filter((s, i) => (s.type === 'step' || s.type === 'gather-step') && completedSteps.includes(`${prof.slug}_step_${i}`)).length;
      const curPct = totalStepsCount > 0 ? Math.round((curCompleted / totalStepsCount) * 100) : 0;
      const countEl = container.querySelector('#leveling-progress-count');
      const pctEl = container.querySelector('#leveling-progress-pct');
      const fillEl = container.querySelector('#leveling-progress-fill');
      if (countEl) countEl.textContent = curCompleted;
      if (pctEl) pctEl.textContent = `${curPct}%`;
      if (fillEl) fillEl.style.width = `${curPct}%`;
    }

    container.querySelectorAll('.leveling-step-check').forEach(chk => {
      chk.addEventListener('change', (e) => {
        e.stopPropagation();
        const row = chk.closest('.leveling-step-row');
        const stepId = row?.getAttribute('data-step-id');
        if (!stepId) return;
        if (chk.checked) {
          if (!completedSteps.includes(stepId)) completedSteps.push(stepId);
          row.classList.add('completed');
        } else {
          completedSteps = completedSteps.filter(x => x !== stepId);
          row.classList.remove('completed');
        }
        try { localStorage.setItem(levelingStorageKey, JSON.stringify(completedSteps)); } catch {}
        updateLevelingProgress();
      });
    });

    const resetBtn = container.querySelector('#leveling-reset-btn');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        if (!completedSteps.length) return;
        completedSteps = [];
        try { localStorage.removeItem(levelingStorageKey); } catch {}
        container.querySelectorAll('.leveling-step-check').forEach(chk => { chk.checked = false; });
        container.querySelectorAll('.leveling-step-row').forEach(r => { r.classList.remove('completed'); });
        updateLevelingProgress();
        if (typeof window.showToast === 'function') {
          window.showToast(`${prof.name} leveling checklist reset.`, 'info');
        }
      });
    }

    attachTooltipListeners(container, prof);
  }

  /* ==========================================================================
     SUBTAB 3: REAGENT SHOPPING LIST (GROUPED BY VENDOR, FARMED, CRAFTED)
     ========================================================================== */
  function renderShoppingTab(container, prof) {
    const shopping = prof.shopping || {};
    const groups = shopping.groups || [];

    if (groups.length === 0) {
      container.innerHTML = `
        <div style="text-align: center; padding: 3rem; color: #94a3b8; background: rgba(15,23,42,0.5); border-radius: 8px;">
          No pre-calculated reagent shopping list for this tradeskill.
        </div>
      `;
      return;
    }

    const storageKey = `wowforever_shopping_${prof.slug}`;
    const syncStorageKey = `wowforever_shopping_sync_${prof.slug}`;
    const levelingStorageKey = `wowforever_leveling_${prof.slug}`;

    let acquiredItems = [];
    try {
      acquiredItems = JSON.parse(localStorage.getItem(storageKey) || '[]');
      if (!Array.isArray(acquiredItems)) acquiredItems = [];
    } catch {
      acquiredItems = [];
    }

    let syncWithLeveling = false;
    try {
      syncWithLeveling = localStorage.getItem(syncStorageKey) === 'true';
    } catch {
      syncWithLeveling = false;
    }

    let completedSteps = [];
    try {
      completedSteps = JSON.parse(localStorage.getItem(levelingStorageKey) || '[]');
      if (!Array.isArray(completedSteps)) completedSteps = [];
    } catch {
      completedSteps = [];
    }

    const steps = prof.leveling?.steps || [];
    const recipes = prof.recipes || [];
    const hasPostBetaSplit = groups.length > 3
      || groups.some(g => g.title && g.title.toLowerCase().includes('after the beta'))
      || (groups.length === 3 && groups[1]?.title === groups[2]?.title);

    function isPost225GroupAt(idx, g) {
      if (!hasPostBetaSplit) return false;
      return idx >= 3 || (groups.length === 3 && idx === 2) || Boolean(g?.title && g.title.toLowerCase().includes('after the beta'));
    }

    const rawNamesByBracket = { false: new Set(), true: new Set() };
    groups.forEach((g, idx) => {
      const post225 = isPost225GroupAt(idx, g);
      if (!g.title || !g.title.toLowerCase().includes('made along the way')) {
        (g.items || []).forEach(rItem => rawNamesByBracket[post225].add((rItem.name || '').toLowerCase()));
      }
    });

    function getStepConsumedCount(itemObj, isPost225Group, groupObj) {
      if (!syncWithLeveling || !completedSteps.length) return 0;
      const isMadeAlongWayGroup = Boolean(groupObj?.title && groupObj.title.toLowerCase().includes('made along the way'));
      const targetName = (itemObj.name || '').toLowerCase();
      const targetId = itemObj.itemId;

      let directCraftedChecked = 0;
      let directConsumedChecked = 0;
      let totalCraftedInBracket = 0;

      steps.forEach((s, sIdx) => {
        if (s.type !== 'step') return;
        const stepPost225 = (s.from || 1) >= 225;
        if (hasPostBetaSplit && stepPost225 !== isPost225Group) return;
        const crafts = s.crafts || 1;
        const isTargetRecipe = (s.recipeName && s.recipeName.toLowerCase() === targetName) || (targetId && s.itemId === targetId);
        if (isTargetRecipe) {
          totalCraftedInBracket += crafts;
        }

        const stepId = `${prof.slug}_step_${sIdx}`;
        if (!completedSteps.includes(stepId)) return;

        if (isTargetRecipe) {
          directCraftedChecked += crafts;
        }
        (s.reagents || []).forEach(r => {
          if ((targetId && r.itemId === targetId) || (r.name && r.name.toLowerCase() === targetName)) {
            directConsumedChecked += crafts * (r.count || 1);
          }
        });
      });

      const rawSet = rawNamesByBracket[Boolean(isPost225Group)];
      if (isMadeAlongWayGroup) {
        if (rawSet.has(targetName) && totalCraftedInBracket === itemObj.count) {
          return directCraftedChecked;
        }
        return directConsumedChecked;
      }

      // Raw / Vendor group item:
      // For Blacksmithing Solid Stone (where 8 Solid Grinding Stones are for 1-225 and 4 are for 225-300, crafted at 200-206):
      let totalRaw = directConsumedChecked;
      if (prof.slug === 'blacksmithing' && targetName === 'solid stone') {
        const sgsStepIdx = steps.findIndex(s => s.type === 'step' && s.recipeName === 'Solid Grinding Stone');
        if (sgsStepIdx >= 0 && completedSteps.includes(`${prof.slug}_step_${sgsStepIdx}`)) {
          if (!isPost225Group) {
            totalRaw = Math.max(0, totalRaw - 16); // 4x Solid Grinding Stone (16 Solid Stone) belong to 225-300
          } else {
            totalRaw += 16;
          }
        }
      }

      groups.forEach((g, idx) => {
        if (isPost225GroupAt(idx, g) !== isPost225Group) return;
        if (g.title && g.title.toLowerCase().includes('made along the way')) {
          (g.items || []).forEach(mItem => {
            const mName = (mItem.name || '').toLowerCase();
            if (mName === targetName) {
              totalRaw = Math.max(0, totalRaw - directCraftedChecked);
              return;
            }
            if (rawSet.has(mName)) return;

            let mCraftedTotal = 0;
            let mConsumedChecked = 0;
            steps.forEach((s, sIdx) => {
              if (s.type !== 'step') return;
              const stepPost225 = (s.from || 1) >= 225;
              if (hasPostBetaSplit && stepPost225 !== isPost225Group) return;
              const crafts = s.crafts || 1;
              if ((s.recipeName && s.recipeName.toLowerCase() === mName) || (mItem.itemId && s.itemId === mItem.itemId)) {
                mCraftedTotal += crafts;
              }
              const stepId = `${prof.slug}_step_${sIdx}`;
              if (!completedSteps.includes(stepId)) return;
              (s.reagents || []).forEach(r => {
                if ((mItem.itemId && r.itemId === mItem.itemId) || (r.name && r.name.toLowerCase() === mName)) {
                  mConsumedChecked += crafts * (r.count || 1);
                }
              });
            });

            const yieldPerCraft = mName === 'stonescale oil' ? 2 : 1;
            const extraMCraftsUsed = Math.ceil(Math.max(0, mConsumedChecked - (mCraftedTotal * yieldPerCraft)) / yieldPerCraft);
            if (extraMCraftsUsed > 0) {
              const rec = recipes.find(r => r.name && r.name.toLowerCase() === mName);
              if (rec) {
                (rec.reagents || []).forEach(subR => {
                  if ((targetId && subR.id === targetId) || (subR.name && subR.name.toLowerCase() === targetName)) {
                    totalRaw += extraMCraftsUsed * (subR.count || 1);
                  }
                });
              }
            }
          });
        }
      });

      return totalRaw;
    }

    const allItemsWithGroup = groups.flatMap((g, idx) => (g.items || []).map(it => ({ it, g, isPost225Group: isPost225GroupAt(idx, g) })));
    const allItems = allItemsWithGroup.map(x => x.it);
    const totalItems = allItems.length;
    function countAcquiredItems() {
      return allItemsWithGroup.filter(({ it, g, isPost225Group }) => {
        if (acquiredItems.includes(it.name)) return true;
        if (syncWithLeveling) {
          const used = getStepConsumedCount(it, isPost225Group, g);
          if (used > 0 && Math.max(0, it.count - used) === 0) return true;
        }
        return false;
      }).length;
    }
    const initialAcquired = countAcquiredItems();
    const initialPct = totalItems > 0 ? Math.round((initialAcquired / totalItems) * 100) : 0;

    container.innerHTML = `
      <div class="leveling-header-block">
        <div class="leveling-header-title">
          <h3>${escapeHtml(shopping.title || 'SHOPPING LIST, 1 TO 225')}</h3>
          <p>${escapeHtml(shopping.subtitle || 'Trade goods, looted supplies, and crafted components needed to level.')}</p>
        </div>
        <div style="display: flex; gap: 0.5rem; align-items: center; flex-wrap: wrap;">
          <button type="button" class="shopping-copy-btn shopping-sync-btn ${syncWithLeveling ? 'active' : ''}" id="shopping-sync-btn" aria-pressed="${syncWithLeveling}" title="Subtract reagents already used in checked-off Leveling 1–300 steps">
            <span>🔄</span> ${syncWithLeveling ? 'Showing Remaining Only (Synced)' : 'Sync with Leveling Checklist'}
          </button>
          <button type="button" class="shopping-copy-btn" id="shopping-copy-btn" aria-label="Copy shopping list to clipboard">
            <span class="copy-icon">📋</span> Copy Shopping List
          </button>
          <button type="button" class="shopping-copy-btn shopping-reset-btn" id="shopping-reset-btn" aria-label="Reset acquired materials checklist" title="Reset all checked items">
            <span>↺</span> Reset Checklist
          </button>
        </div>
      </div>

      ${syncWithLeveling ? `
        <div class="shopping-sync-active-banner">
          <span>🔄 <strong>Synced with Leveling Checklist (${completedSteps.length} steps checked):</strong> Displaying remaining required materials after subtracting completed leveling brackets.</span>
        </div>
      ` : ''}

      <!-- Interactive Checklist Progress Bar -->
      <div class="shopping-checklist-bar">
        <div class="shopping-progress-labels">
          <span>
            <strong>Materials Acquired:</strong> 
            <span id="shopping-progress-count">${initialAcquired}</span> / ${totalItems} (<span id="shopping-progress-pct">${initialPct}%</span>)
          </span>
          <span style="font-size: 0.75rem; color: #94a3b8;">Click checkbox or card to track in your bags</span>
        </div>
        <div class="shopping-progress-track">
          <div class="shopping-progress-fill" id="shopping-progress-fill" style="width: ${initialPct}%;"></div>
        </div>
      </div>

      <div class="shopping-groups-container">
        ${groups.map((g, idx) => {
          const isPost225Group = isPost225GroupAt(idx, g);
          const isFirstPost225Group = isPost225Group && (idx === 0 || !isPost225GroupAt(idx - 1, groups[idx - 1]));
          return `
            ${isFirstPost225Group ? `
              <div class="shopping-beta-divider">
                <h4><span>⚡</span> Artisan Reagents &amp; Components (225 to 300)</h4>
                <p>Trade goods, looted supplies, and crafted components needed for Artisan progression to 300 at launch.</p>
              </div>
            ` : ''}
            <div class="shopping-group-section">
              <div class="shopping-group-header">
                <h4 class="shopping-group-title">
                  ${escapeHtml(g.title)}
                  ${g.note ? `<small class="shopping-group-note">${escapeHtml(g.note)}</small>` : ''}
                </h4>
              </div>
              <div class="shopping-rows-grid">
                ${g.items.map(it => {
                  const usedBySteps = getStepConsumedCount(it, isPost225Group, g);
                  const remainingCount = syncWithLeveling ? Math.max(0, it.count - usedBySteps) : it.count;
                  const isStepDepleted = syncWithLeveling && remainingCount === 0 && usedBySteps > 0;
                  const isAcquired = acquiredItems.includes(it.name) || isStepDepleted;
                  return `
                    <div class="shopping-row-card ${isAcquired ? 'is-acquired' : ''} ${isStepDepleted ? 'is-step-completed' : ''}" data-item-id="${it.itemId}" data-item-name="${escapeHtml(it.name)}" data-remaining-count="${remainingCount}" data-base-count="${it.count}">
                      <input type="checkbox" class="shopping-item-check" ${isAcquired ? 'checked' : ''} aria-label="Mark ${escapeHtml(it.name)} as acquired" />
                      <div class="shopping-row-left">
                        <img src="${getIconUrl(it.icon, it.name)}" alt="${escapeHtml(it.name)}" class="shopping-icon q${it.quality || 1}" loading="lazy" />
                        <span class="shopping-name q${it.quality || 1}">${escapeHtml(it.name)}</span>
                      </div>
                      <div class="shopping-count-box">
                        <b class="shopping-count">${remainingCount}</b>
                        ${syncWithLeveling && usedBySteps > 0 ? `<small class="shopping-used-sub">of ${it.count}</small>` : ''}
                      </div>
                    </div>
                  `;
                }).join('')}
              </div>
            </div>
          `;
        }).join('')}
      </div>
    `;

    function updateShoppingProgress() {
      const curAcquired = countAcquiredItems();
      const curPct = totalItems > 0 ? Math.round((curAcquired / totalItems) * 100) : 0;
      const countEl = container.querySelector('#shopping-progress-count');
      const pctEl = container.querySelector('#shopping-progress-pct');
      const fillEl = container.querySelector('#shopping-progress-fill');
      if (countEl) countEl.textContent = curAcquired;
      if (pctEl) pctEl.textContent = `${curPct}%`;
      if (fillEl) fillEl.style.width = `${curPct}%`;
    }

    const syncBtn = container.querySelector('#shopping-sync-btn');
    if (syncBtn) {
      syncBtn.addEventListener('click', () => {
        syncWithLeveling = !syncWithLeveling;
        try { localStorage.setItem(syncStorageKey, String(syncWithLeveling)); } catch {}
        renderShoppingTab(container, prof);
      });
    }

    container.querySelectorAll('.shopping-item-check').forEach(chk => {
      chk.addEventListener('change', (e) => {
        e.stopPropagation();
        const card = chk.closest('.shopping-row-card');
        const name = card?.getAttribute('data-item-name');
        if (!name) return;
        if (chk.checked) {
          if (!acquiredItems.includes(name)) acquiredItems.push(name);
          card.classList.add('is-acquired');
        } else {
          acquiredItems = acquiredItems.filter(x => x !== name);
          card.classList.remove('is-acquired');
        }
        try { localStorage.setItem(storageKey, JSON.stringify(acquiredItems)); } catch {}
        updateShoppingProgress();
      });
    });

    const resetBtn = container.querySelector('#shopping-reset-btn');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        if (!acquiredItems.length) return;
        acquiredItems = [];
        try { localStorage.removeItem(storageKey); } catch {}
        container.querySelectorAll('.shopping-item-check').forEach(chk => { chk.checked = false; });
        container.querySelectorAll('.shopping-row-card').forEach(c => { c.classList.remove('is-acquired'); });
        updateShoppingProgress();
        if (typeof window.showToast === 'function') {
          window.showToast(`${prof.name} shopping checklist reset.`, 'info');
        }
      });
    }

    const copyBtn = container.querySelector('#shopping-copy-btn');
    if (copyBtn) {
      copyBtn.addEventListener('click', () => {
        let text = `=== ${prof.name} — ${shopping.title || 'Reagent Shopping List (1 to 225)'}${syncWithLeveling ? ' [Remaining Synced]' : ''} ===\n\n`;
        groups.forEach((g, idx) => {
          const isPost225Group = isPost225GroupAt(idx, g);
          text += `${g.title}${g.note ? ' (' + g.note + ')' : ''}:\n`;
          (g.items || []).forEach(it => {
            const usedBySteps = getStepConsumedCount(it, isPost225Group, g);
            const qty = syncWithLeveling ? Math.max(0, it.count - usedBySteps) : it.count;
            const mark = (acquiredItems.includes(it.name) || (syncWithLeveling && qty === 0)) ? '[x]' : '[ ]';
            text += `  ${mark} ${qty}x ${it.name}${syncWithLeveling && usedBySteps > 0 ? ` (of ${it.count})` : ''}\n`;
          });
          text += '\n';
        });
        if (typeof window.copyTextToClipboard === 'function') {
          window.copyTextToClipboard(text.trim(), () => {
            copyBtn.classList.add('copied');
            copyBtn.innerHTML = '<span class="copy-icon">✓</span> Copied to Clipboard!';
            if (typeof window.showToast === 'function') {
              window.showToast(`${prof.name} shopping list copied!`, 'success');
            }
            setTimeout(() => {
              copyBtn.classList.remove('copied');
              copyBtn.innerHTML = '<span class="copy-icon">📋</span> Copy Shopping List';
            }, 2500);
          });
        }
      });
    }

    attachTooltipListeners(container, prof);
  }


  window.WOW_PROFESSIONS_LEVELING = {
    resolveStepCraftedItem,
    renderLevelingTab,
    renderShoppingTab
  };
})();
