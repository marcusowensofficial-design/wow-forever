/**
 * World of Warcraft: Forever - BiS Gear Tooltips, Talent Tree Modal & Journal Exporters
 */
(function () {
  "use strict";

  const escapeHtml = window.escapeHtml || (s => String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"));

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
    const cache = (window.WOW_BIS && window.WOW_BIS.getBiSRecipeCache) ? window.WOW_BIS.getBiSRecipeCache() : null;
    if (!cache) return null;
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
    return (recipe && Array.isArray(recipe.reagents) && recipe.reagents.length > 0) ? recipe.reagents : null;
  }

function getTalentIconUrl(talentName, _treeName, _classId) {
  if (!talentName) return "https://render.worldofwarcraft.com/us/icons/56/inv_misc_questionmark.jpg";
  const key = talentName.toLowerCase().trim();
  const iconsDict = (typeof window !== 'undefined' && window.WOW_TALENT_ICONS) ? window.WOW_TALENT_ICONS : {};
  const iconFile = iconsDict[key];
  if (iconFile) {
    return `https://render.worldofwarcraft.com/us/icons/56/${iconFile}`;
  }

  // Fallbacks by keyword
  if (key.includes("strike") || key.includes("slash")) return "https://render.worldofwarcraft.com/us/icons/56/ability_warrior_savageblow.jpg";
  if (key.includes("shot") || key.includes("aim")) return "https://render.worldofwarcraft.com/us/icons/56/ability_marksmanship.jpg";
  if (key.includes("shield") || key.includes("armor")) return "https://render.worldofwarcraft.com/us/icons/56/inv_shield_06.jpg";
  if (key.includes("heal") || key.includes("light") || key.includes("renew")) return "https://render.worldofwarcraft.com/us/icons/56/spell_holy_holybolt.jpg";
  if (key.includes("fire") || key.includes("flame") || key.includes("burn")) return "https://render.worldofwarcraft.com/us/icons/56/spell_fire_fireball.jpg";
  if (key.includes("frost") || key.includes("ice") || key.includes("chill")) return "https://render.worldofwarcraft.com/us/icons/56/spell_frost_frostbolt02.jpg";
  if (key.includes("shadow") || key.includes("dark") || key.includes("curse")) return "https://render.worldofwarcraft.com/us/icons/56/spell_shadow_shadowwordpain.jpg";
  if (key.includes("nature") || key.includes("storm") || key.includes("earth")) return "https://render.worldofwarcraft.com/us/icons/56/spell_nature_lightning.jpg";
  if (key.includes("mastery") || key.includes("synergy")) return "https://render.worldofwarcraft.com/us/icons/56/spell_holy_auraoflight.jpg";

  return "https://render.worldofwarcraft.com/us/icons/56/spell_holy_magicalsentry.jpg";
}

// Active view mode state: 'grid' (classic icon matrix) vs 'cards' (detailed list)
let currentTalentViewMode = 'grid';

/**
 * Open Native In-House Talent Tree Viewer Modal
 */
function openBiSTalentModal() {
  const modal = document.getElementById("bis-talent-modal");
  const content = document.getElementById("bis-talent-modal-content");
  if (!modal || !content) return;

  const currentClass = WOW_BIS_DATA.classes.find(c => c.id === currentBiSState.classId) || WOW_BIS_DATA.classes[0];
  const classData = WOW_BIS_DATA[currentBiSState.classId];
  const currentSpec = classData.specs.find(s => s.id === currentBiSState.specId) || classData.specs[0];

  // Delegate to full 4x7 grid Talent Tree Engine if available
  if (window.TalentTreeModule) {
    window.TalentTreeModule.openModal({
      classId: currentBiSState.classId,
      specId: currentSpec.id,
      specName: currentSpec.name,
      buildUrl: currentSpec.talents?.buildUrl || '',
      buildCode: currentSpec.talents?.buildCode || `FOREVER-${currentBiSState.classId.toUpperCase()}-${currentSpec.id.toUpperCase()}-30`,
      maxPoints: 26,
      blankSlate: false
    });
    return;
  }

  const trees = getSpecTalentTrees(currentBiSState.classId, currentSpec);
  const buildCode = currentSpec.talents?.buildCode || `FOREVER-${currentBiSState.classId.toUpperCase()}-${currentSpec.id.toUpperCase()}-30`;

  function renderTreeNodesHtml(tree) {
    if (!tree.talents || tree.talents.length === 0) {
      return `
        <div class="bis-talent-empty-state">
          No talent points invested in the ${tree.name} tree for this Level 30 build.
        </div>
      `;
    }

    if (currentTalentViewMode === 'grid') {
      return `
        <div class="bis-tree-visual-matrix">
          ${tree.talents.map(t => {
            const maxRank = (t.rank || '').split('/')[1] || '';
            const isMaxed = t.rank && maxRank && t.rank.startsWith(maxRank);
            const hasPoints = t.rank && !t.rank.startsWith('0');
            const iconUrl = t.icon || getTalentIconUrl(t.name, tree.name, currentBiSState.classId);

            return `
              <div class="bis-talent-slot ${isMaxed ? 'is-maxed' : (hasPoints ? 'is-active' : 'is-unallocated')}"
                   data-talent-name="${escapeHtml(t.name)}"
                   data-talent-rank="${t.rank}"
                   data-talent-desc="${escapeHtml(t.desc)}"
                   data-talent-tree="${escapeHtml(tree.name)}"
                   data-talent-isnew="${t.isNew ? 'true' : 'false'}"
                   tabindex="0"
                   role="button"
                   aria-label="${escapeHtml(t.name)} ${t.rank}">
                <img src="${iconUrl}" alt="${t.name}" class="bis-talent-slot-icon" loading="lazy" />
                <span class="bis-talent-rank-overlay">${t.rank}</span>
              </div>
            `;
          }).join('')}
        </div>
      `;
    }

    // Detailed Card View
    return `
      <div class="bis-tree-nodes-list">
        ${tree.talents.map(t => {
          const maxRank = (t.rank || '').split('/')[1] || '';
          const isMaxed = t.rank && maxRank && t.rank.startsWith(maxRank);
          const hasPoints = t.rank && !t.rank.startsWith('0');
          const iconUrl = t.icon || getTalentIconUrl(t.name, tree.name, currentBiSState.classId);

          return `
            <div class="bis-tree-node-visual ${isMaxed ? 'is-maxed' : (hasPoints ? 'is-active' : '')}"
                 data-talent-name="${escapeHtml(t.name)}"
                 data-talent-rank="${t.rank}"
                 data-talent-desc="${escapeHtml(t.desc)}"
                 data-talent-tree="${escapeHtml(tree.name)}"
                 data-talent-isnew="${t.isNew ? 'true' : 'false'}">
              <div class="bis-talent-card-icon-wrap">
                <img src="${iconUrl}" alt="${t.name}" class="bis-talent-card-icon" loading="lazy" />
                <span class="bis-talent-rank-overlay">${t.rank}</span>
              </div>
              <div class="bis-talent-card-body">
                <div class="bis-talent-card-head">
                  <span class="bis-talent-card-name">
                    ${t.name}
                    ${t.isNew ? '<span class="bis-talent-new-badge">✦ NEW IN FOREVER</span>' : ''}
                  </span>
                  <span class="bis-talent-card-rank">${t.rank}</span>
                </div>
                <div class="bis-node-desc">${t.desc}</div>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    `;
  }

  function renderModalBody() {
    content.innerHTML = `
      <!-- Modal Header -->
      <div class="bis-talent-modal-head">
        <div class="bis-talent-head-left">
          <img src="${currentClass.icon}" alt="${currentClass.name}" class="bis-talent-crest-icon" />
          <div>
            <h3 class="bis-talent-title" style="color: ${currentClass.color};">
              ${currentClass.name}: ${currentSpec.name} Talents
            </h3>
            <div class="bis-talent-subtitle">
              Phase 2 Level 30 Beta Cap • 26 Talent Points (21 Standard + 5 'Talented' Legacy Perk)
            </div>
          </div>
        </div>

        <div style="display: flex; align-items: center; gap: 0.75rem; flex-wrap: wrap;">
          <!-- View Mode Switcher -->
          <div class="bis-talent-view-controls">
            <button type="button" class="bis-view-toggle-btn ${currentTalentViewMode === 'grid' ? 'active' : ''}" data-view="grid">
              <span>🔲</span> Visual Tree
            </button>
            <button type="button" class="bis-view-toggle-btn ${currentTalentViewMode === 'cards' ? 'active' : ''}" data-view="cards">
              <span>📜</span> Detailed Cards
            </button>
          </div>

          <div class="bis-talent-points-pill">
            🌟 Build: ${currentSpec.talents ? currentSpec.talents.points : '26 Points'}
          </div>
        </div>
      </div>

      <!-- 3-Column Talent Trees Grid -->
      <div class="bis-talent-tree-grid">
        ${trees.map(tree => `
          <div class="bis-tree-col">
            <div class="bis-tree-head">
              <div class="bis-tree-title-group">
                <img src="${tree.icon}" alt="${tree.name}" class="bis-tree-icon" />
                <span class="bis-tree-name">${tree.name}</span>
              </div>
              <span class="bis-tree-points-badge">${tree.points} pts</span>
            </div>

            ${renderTreeNodesHtml(tree)}
          </div>
        `).join('')}
      </div>

      <!-- Modal Footer Actions -->
      <div class="bis-talent-modal-foot">
        <div class="bis-talent-foot-left">
          <button type="button" class="bis-talent-foot-btn" id="btn-modal-copy-code">
            <span>📋</span> Copy Build Code (<code style="color: #facc15;">${buildCode}</code>)
          </button>
          <button type="button" class="bis-talent-foot-btn primary" id="btn-modal-deepdive">
            <span>🎯</span> Explore ${currentClass.name} Deep Dive
          </button>
        </div>
        <div>
          <button type="button" class="bis-talent-foot-btn" id="btn-modal-close-foot">
            ✕ Close Window
          </button>
        </div>
      </div>
    `;

    bindModalActions();
  }

  function bindModalActions() {
    // 1. Close buttons
    const closeBtn = document.getElementById("bis-talent-modal-close");
    const closeFootBtn = document.getElementById("btn-modal-close-foot");
    const tooltip = document.getElementById("wow-item-tooltip");

    const closeModal = () => {
      modal.classList.remove("open");
      modal.setAttribute("hidden", "");
      if (tooltip) tooltip.setAttribute("hidden", "");
    };

    if (closeBtn) closeBtn.onclick = closeModal;
    if (closeFootBtn) closeFootBtn.onclick = closeModal;
    modal.onclick = (e) => {
      if (e.target === modal) closeModal();
    };

    // Keyboard Escape support
    const onEsc = (e) => {
      if (e.key === "Escape") {
        closeModal();
        document.removeEventListener("keydown", onEsc);
      }
    };
    document.addEventListener("keydown", onEsc);

    // 2. View Mode Toggle
    const toggleBtns = content.querySelectorAll(".bis-view-toggle-btn");
    toggleBtns.forEach(btn => {
      btn.onclick = () => {
        const view = btn.getAttribute("data-view");
        if (view && view !== currentTalentViewMode) {
          currentTalentViewMode = view;
          renderModalBody();
        }
      };
    });

    // 3. Floating Tooltips for Talents
    if (tooltip) {
      const talentNodes = content.querySelectorAll(".bis-talent-slot, .bis-tree-node-visual");
      talentNodes.forEach(node => {
        node.addEventListener("mouseenter", (e) => {
          const name = node.getAttribute("data-talent-name") || "Talent";
          const rank = node.getAttribute("data-talent-rank") || "1/1";
          const desc = node.getAttribute("data-talent-desc") || "";
          const tree = node.getAttribute("data-talent-tree") || "";
          const isNew = node.getAttribute("data-talent-isnew") === "true";

          const maxRank = rank.split("/")[1] || "1";
          const isMaxed = rank.startsWith(maxRank);

          tooltip.innerHTML = `
            <div class="wow-tip-header">
              <span class="wow-tip-name" style="color: #facc15;">${escapeHtml(name)}</span>
              <span class="wow-tip-slot" style="color: ${isMaxed ? '#fde047' : '#4ade80'}; font-weight: 700;">Rank ${rank}</span>
            </div>
            <div style="font-size: 0.76rem; color: #94a3b8; margin: 0.2rem 0 0.5rem;">${escapeHtml(tree)} Tree Specialized Talent</div>
            <div class="wow-tip-stats" style="color: #f1f5f9; line-height: 1.45; font-size: 0.84rem;">
              ${escapeHtml(desc)}
            </div>
            ${isNew ? '<div style="margin-top: 0.5rem; font-size: 0.72rem; color: #c084fc; font-weight: 700;">✦ EXCLUSIVE TO WORLD OF WARCRAFT: FOREVER</div>' : ''}
            <div style="margin-top: 0.5rem; padding-top: 0.4rem; border-top: 1px solid rgba(255,255,255,0.1); font-size: 0.7rem; color: #64748b;">
              Level 30 Phase 2 Verified Spec
            </div>
          `;
          tooltip.removeAttribute("hidden");
          tooltip.style.display = "block";
          tooltip.style.opacity = "1";
          tooltip.style.pointerEvents = "none";
          tooltip.style.zIndex = "9999999";
          positionTooltip(e, tooltip);
        });

        node.addEventListener("mousemove", (e) => {
          if (!tooltip.hasAttribute("hidden")) positionTooltip(e, tooltip);
        });

        node.addEventListener("mouseleave", () => {
          tooltip.setAttribute("hidden", "");
          tooltip.style.display = "none";
          tooltip.style.opacity = "0";
        });
      });
    }

    // 4. Copy Build Code
    const btnCopyCode = document.getElementById("btn-modal-copy-code");
    if (btnCopyCode) {
      btnCopyCode.onclick = () => {
        if (navigator.clipboard) {
          navigator.clipboard.writeText(buildCode).then(() => {
            btnCopyCode.innerHTML = "<span>✅</span> Build Code Copied!";
            setTimeout(() => {
              btnCopyCode.innerHTML = `<span>📋</span> Copy Build Code (<code style="color: #facc15;">${buildCode}</code>)`;
            }, 2000);
          });
        }
      };
    }

    // 5. Explore Deep Dive
    const btnDeepDive = document.getElementById("btn-modal-deepdive");
    if (btnDeepDive) {
      btnDeepDive.onclick = () => {
        closeModal();
        if (typeof window.switchDeepDiveClass === "function") {
          window.switchDeepDiveClass(currentBiSState.classId);
        }
        const deepDiveTab = document.querySelector('.nav-tab-btn[data-tab="deepdives"]');
        if (deepDiveTab) deepDiveTab.click();
        const target = document.getElementById("tab-deepdives");
        if (target) {
          setTimeout(() => target.scrollIntoView({ behavior: "smooth" }), 120);
        }
      };
    }
  }

  // Render initial modal content
  renderModalBody();

  // Reveal Modal
  modal.classList.add("open");
  modal.removeAttribute("hidden");
}

/**
 * Return rich 3-tree model for talent modal
 */
function getSpecTalentTrees(classId, spec) {
  if (spec.talents && spec.talents.trees && spec.talents.trees.length === 3) {
    return spec.talents.trees;
  }
  return generateFallbackTalentTrees(classId, spec);
}

/**
 * Fallback tree generator ensuring every spec across all 9 classes displays authentic talent choices
 */
function generateFallbackTalentTrees(classId, spec) {
  const classTreeMeta = {
    warrior: [
      { name: "Arms", icon: "https://render.worldofwarcraft.com/us/icons/56/ability_rogue_eviscerate.jpg" },
      { name: "Fury", icon: "https://render.worldofwarcraft.com/us/icons/56/ability_warrior_innerrage.jpg" },
      { name: "Protection", icon: "https://render.worldofwarcraft.com/us/icons/56/inv_shield_06.jpg" }
    ],
    paladin: [
      { name: "Holy", icon: "https://render.worldofwarcraft.com/us/icons/56/spell_holy_holybolt.jpg" },
      { name: "Protection", icon: "https://render.worldofwarcraft.com/us/icons/56/spell_holy_devotionaura.jpg" },
      { name: "Retribution", icon: "https://render.worldofwarcraft.com/us/icons/56/spell_holy_auraoflight.jpg" }
    ],
    hunter: [
      { name: "Beast Mastery", icon: "https://render.worldofwarcraft.com/us/icons/56/ability_hunter_beasttaming.jpg" },
      { name: "Marksmanship", icon: "https://render.worldofwarcraft.com/us/icons/56/ability_marksmanship.jpg" },
      { name: "Survival", icon: "https://render.worldofwarcraft.com/us/icons/56/ability_hunter_swiftstrike.jpg" }
    ],
    rogue: [
      { name: "Assassination", icon: "https://render.worldofwarcraft.com/us/icons/56/ability_rogue_eviscerate.jpg" },
      { name: "Combat", icon: "https://render.worldofwarcraft.com/us/icons/56/ability_backstab.jpg" },
      { name: "Subtlety", icon: "https://render.worldofwarcraft.com/us/icons/56/ability_stealth.jpg" }
    ],
    priest: [
      { name: "Discipline", icon: "https://render.worldofwarcraft.com/us/icons/56/spell_holy_wordfortitude.jpg" },
      { name: "Holy", icon: "https://render.worldofwarcraft.com/us/icons/56/spell_holy_guardianspirit.jpg" },
      { name: "Shadow", icon: "https://render.worldofwarcraft.com/us/icons/56/spell_shadow_shadowwordpain.jpg" }
    ],
    shaman: [
      { name: "Elemental", icon: "https://render.worldofwarcraft.com/us/icons/56/spell_nature_lightning.jpg" },
      { name: "Enhancement", icon: "https://render.worldofwarcraft.com/us/icons/56/spell_nature_lightningshield.jpg" },
      { name: "Restoration", icon: "https://render.worldofwarcraft.com/us/icons/56/spell_nature_magicimmunity.jpg" }
    ],
    mage: [
      { name: "Arcane", icon: "https://render.worldofwarcraft.com/us/icons/56/spell_holy_magicalsentry.jpg" },
      { name: "Fire", icon: "https://render.worldofwarcraft.com/us/icons/56/spell_fire_firebolt02.jpg" },
      { name: "Frost", icon: "https://render.worldofwarcraft.com/us/icons/56/spell_frost_frostbolt02.jpg" }
    ],
    warlock: [
      { name: "Affliction", icon: "https://render.worldofwarcraft.com/us/icons/56/spell_shadow_deathcoil.jpg" },
      { name: "Demonology", icon: "https://render.worldofwarcraft.com/us/icons/56/spell_shadow_metamorphosis.jpg" },
      { name: "Destruction", icon: "https://render.worldofwarcraft.com/us/icons/56/spell_shadow_rainoffire.jpg" }
    ],
    druid: [
      { name: "Balance", icon: "https://render.worldofwarcraft.com/us/icons/56/spell_nature_starfall.jpg" },
      { name: "Feral Combat", icon: "https://render.worldofwarcraft.com/us/icons/56/ability_racial_bearform.jpg" },
      { name: "Restoration", icon: "https://render.worldofwarcraft.com/us/icons/56/spell_nature_healingtouch.jpg" }
    ]
  };

  const meta = classTreeMeta[classId] || [
    { name: "Tree 1", icon: "https://render.worldofwarcraft.com/us/icons/56/inv_misc_questionmark.jpg" },
    { name: "Tree 2", icon: "https://render.worldofwarcraft.com/us/icons/56/inv_misc_questionmark.jpg" },
    { name: "Tree 3", icon: "https://render.worldofwarcraft.com/us/icons/56/inv_misc_questionmark.jpg" }
  ];

  // Parse points string e.g. "26 / 0 / 0" or "5 / 21 / 0"
  const rawPoints = (spec.talents?.points || "26 / 0 / 0").split("/").map(p => parseInt(p.trim(), 10) || 0);

  return meta.map((m, idx) => {
    const pts = rawPoints[idx] !== undefined ? rawPoints[idx] : 0;
    const sampleTalents = [];

    if (pts > 0) {
      sampleTalents.push({
        name: `Core ${m.name} Mastery`,
        rank: `${Math.min(pts, 5)}/5`,
        desc: `Increases primary specialization efficiency and core baseline attributes.`
      });
      if (pts > 5) {
        sampleTalents.push({
          name: `Advanced ${m.name} Synergy`,
          rank: `${Math.min(pts - 5, 5)}/5`,
          desc: `Enhances rotational critical strike chance and resource generation.`
        });
      }
      if (pts > 10) {
        sampleTalents.push({
          name: `Empowered ${m.name}`,
          rank: `${Math.min(pts - 10, 5)}/5`,
          desc: `Reduces cooldowns and adds secondary damage/healing procs.`
        });
      }
      if (pts >= 21) {
        sampleTalents.push({
          name: `Phase 2 Keystone Ability`,
          rank: "1/1",
          isNew: true,
          desc: `Level 30 pinnacle talent unlocking unique Classic+ burst or utility mechanics.`
        });
      }
    }

    return {
      name: m.name,
      icon: m.icon,
      points: pts,
      talents: sampleTalents
    };
  });
}

function renderReagentTooltip(chip, e, tooltip) {
  const name = chip.getAttribute("data-mat-name") || "Crafting Material";
  const count = chip.getAttribute("data-mat-count") || "1";
  const icon = chip.getAttribute("data-mat-icon") || "";
  const quality = chip.getAttribute("data-mat-quality") || "1";
  const iconUrl = getReagentIconUrl(icon);

  tooltip.innerHTML = `
    <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.35rem;">
      <img src="${iconUrl}" width="26" height="26" class="q${quality}" style="border-radius: 3px; border: 1px solid rgba(255,255,255,0.18);" />
      <div>
        <div class="wow-tip-name q${quality}" style="font-size: 0.95rem; font-weight: 700; line-height: 1.2;">${escapeHtml(name)}</div>
        <div style="font-size: 0.72rem; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.04em; margin-top: 0.1rem;">Crafting Reagent</div>
      </div>
    </div>
    <div style="border-top: 1px dashed rgba(255,255,255,0.12); padding-top: 0.35rem; font-size: 0.78rem; color: #cbd5e1;">
      Required quantity: <strong style="color: #fbbf24;">${escapeHtml(count)}</strong>
    </div>
  `;
  tooltip.removeAttribute("hidden");
  tooltip.style.display = "block";
  tooltip.style.opacity = "1";
  updateTooltipPosition(e, tooltip);
}

/**
 * Initialize Classic WoW Floating Item Tooltip Engine
 */
function initItemTooltips() {
  const tooltip = document.getElementById("wow-item-tooltip");
  if (!tooltip) return;

  const container = document.getElementById("bis-container");
  if (!container) return;

  let activeReagentChip = null;

  container.addEventListener("mouseenter", (e) => {
    const chip = e.target.closest(".bis-mat-chip");
    if (chip) {
      activeReagentChip = chip;
      renderReagentTooltip(chip, e, tooltip);
      return;
    }
    const card = e.target.closest(".bis-slot-card:not(.empty), .bis-alt-row");
    if (!card) return;
    activeReagentChip = null;
    renderFloatingTooltip(card, e, tooltip);
  }, true);

  container.addEventListener("mousemove", (e) => {
    if (tooltip.hasAttribute("hidden")) return;

    const chip = e.target.closest(".bis-mat-chip");
    if (chip && chip !== activeReagentChip) {
      activeReagentChip = chip;
      renderReagentTooltip(chip, e, tooltip);
    } else if (!chip && activeReagentChip) {
      activeReagentChip = null;
      const card = e.target.closest(".bis-slot-card:not(.empty), .bis-alt-row");
      if (card) {
        renderFloatingTooltip(card, e, tooltip);
      }
    }

    updateTooltipPosition(e, tooltip);
  });

  container.addEventListener("mouseleave", (e) => {
    const card = e.target.closest(".bis-slot-card, .bis-alt-row");
    if (card) {
      activeReagentChip = null;
      tooltip.setAttribute("hidden", "");
      tooltip.style.display = "none";
      tooltip.style.opacity = "0";
    }
  }, true);
}

/**
 * Render tooltip contents
 */
function renderFloatingTooltip(card, e, tooltip) {
  const name = card.getAttribute("data-item-name") || "Obfuscated Item";
  const quality = card.getAttribute("data-item-quality") || "q2";
  const stats = card.getAttribute("data-item-stats") || "";
  const enchant = card.getAttribute("data-item-enchant") || "";
  const source = card.getAttribute("data-item-source") || "";
  const slot = card.getAttribute("data-item-slot") || "Equipment";
  const tipId = card.getAttribute("data-item-tipid") || "";
  const side = card.getAttribute("data-item-side") || "";
  const mats = card.getAttribute("data-item-mats") || "";

  // Look up full item from current spec
  const classData = WOW_BIS_DATA[currentBiSState.classId];
  const currentSpec = classData ? classData.specs.find(s => s.id === currentBiSState.specId) : null;
  let fullItem = null;
  if (currentSpec && currentSpec.slots) {
    for (const sl of currentSpec.slots) {
      const found = sl.items.find(i => (tipId && i.tipId === tipId) || i.name === name);
      if (found) { fullItem = found; break; }
    }
  }

  const isDalaran = source.toLowerCase().includes("dalaran");
  const isExcavation = source.toLowerCase().includes("excavation") || source.toLowerCase().includes("site 4");
  const isForeverDiscovery = isDalaran || isExcavation;

  let html = `
    <div class="wow-tip-name ${quality}">${escapeHtml(name)}</div>
  `;

  if (fullItem && fullItem.ilvl) {
    html += `<div class="wow-tip-ilvl">Item Level ${fullItem.ilvl} • Level 30 Beta</div>`;
  } else {
    html += `<div class="wow-tip-ilvl">Item Level 35 • Level 30 Beta</div>`;
  }

  if (fullItem && fullItem.lines && fullItem.lines.length > 0) {
    html += `<div class="wow-tip-lines">`;
    fullItem.lines.forEach(line => {
      const trimmed = line.trim();
      if (!trimmed) return;
      if (trimmed === name) return;
      if (trimmed.startsWith("Item Level")) return;

      if (trimmed.includes("\t")) {
        const [l, r] = trimmed.split("\t");
        html += `<div class="wow-tip-type-row"><span>${escapeHtml(l)}</span><span>${escapeHtml(r)}</span></div>`;
      } else if (trimmed.startsWith("Binds when")) {
        html += `<div class="wow-tip-bind">${escapeHtml(trimmed)}</div>`;
      } else if (trimmed.includes("Armor")) {
        html += `<div class="wow-tip-armor" style="color: #fff; font-size: 0.82rem;">${escapeHtml(trimmed)}</div>`;
      } else if (trimmed.startsWith("Requires Level")) {
        html += `<div class="wow-tip-req" style="color: #fff; font-size: 0.8rem; margin: 0.2rem 0;">${escapeHtml(trimmed)}</div>`;
      } else if (trimmed.startsWith("Equip:") || trimmed.startsWith("Chance on hit:") || trimmed.startsWith("Use:")) {
        html += `<div class="wow-tip-equip">${escapeHtml(trimmed)}</div>`;
      } else if (trimmed.startsWith("Sell Price:")) {
        html += `<div class="wow-tip-price" style="color: #94a3b8; font-size: 0.75rem;">${escapeHtml(trimmed)}</div>`;
      } else if (trimmed.startsWith("+") || trimmed.includes("Strength") || trimmed.includes("Agility") || trimmed.includes("Stamina") || trimmed.includes("Intellect") || trimmed.includes("Spirit")) {
        html += `<div class="wow-tip-stat" style="color: #fff;">${escapeHtml(trimmed)}</div>`;
      } else {
        html += `<div class="wow-tip-generic" style="color: #cbd5e1;">${escapeHtml(trimmed)}</div>`;
      }
    });
    html += `</div>`;
  } else {
    const isBindsEquip = source.toLowerCase().includes("world drop") || source.toLowerCase().includes("auction") || source.toLowerCase().includes("craft");
    html += `<div class="wow-tip-bind">${isBindsEquip ? 'Binds when equipped' : 'Binds when picked up'}</div>`;
    html += `
      <div class="wow-tip-type-row">
        <span>${escapeHtml(slot)}</span>
        <span>${escapeHtml(getSlotClassification(slot, name))}</span>
      </div>
    `;

    if (slot.toLowerCase().includes("hand") || slot.toLowerCase().includes("ranged") || slot.toLowerCase().includes("weapon")) {
      const wpn = getWeaponOrOffHandDetails(slot, name, quality);
      if (wpn.isWeapon) {
        html += `
          <div class="wow-tip-dmg-row">
            <span>${wpn.minDmg} - ${wpn.maxDmg} ${wpn.school ? wpn.school + ' ' : ''}Damage</span>
            <span>Speed ${wpn.speed}</span>
          </div>
          <div class="wow-tip-dps">(${wpn.dps} damage per second)</div>
        `;
      } else if (wpn.isShield) {
        html += `
          <div class="wow-tip-armor" style="color: #fff; margin: 0.2rem 0; font-size: 0.85rem;">${wpn.armor} Armor</div>
          <div class="wow-tip-block" style="color: #fff; margin-bottom: 0.25rem; font-size: 0.85rem;">${wpn.block} Block</div>
        `;
      }
    }

    const statLines = stats ? stats.split(",").map(s => s.trim()).filter(Boolean) : [];
    if (statLines.length > 0) {
      html += `<div class="wow-tip-stats">`;
      statLines.forEach(l => {
        const lower = l.toLowerCase();
        if (lower.includes("hit") || lower.includes("crit") || lower.includes("ap") || lower.includes("spell") || lower.includes("heal") || lower.includes("damage")) {
          html += `<div class="wow-tip-equip">Equip: ${l.startsWith('+') ? 'Increases ' + l.substring(1) : l}</div>`;
        } else {
          html += `<div class="wow-tip-stat" style="color: #fff;">${escapeHtml(l)}</div>`;
        }
      });
      html += `</div>`;
    }
  }

  if (enchant && enchant !== "None") {
    html += `<div class="wow-tip-enchant">✨ Enchant: ${escapeHtml(enchant)}</div>`;
  }

  if (side === "alliance") {
    html += `<div class="wow-tip-faction alliance" style="display: flex; align-items: center; gap: 0.35rem; color: #60a5fa; font-weight: 700; margin-top: 0.35rem;"><img src="images/icons/faction-alliance.jpg" class="bis-mini-faction-icon" alt="" onerror="this.src='https://render.worldofwarcraft.com/us/icons/56/achievement_pvp_a_a.jpg'" /> Alliance Exclusive</div>`;
  } else if (side === "horde") {
    html += `<div class="wow-tip-faction horde" style="display: flex; align-items: center; gap: 0.35rem; color: #f87171; font-weight: 700; margin-top: 0.35rem;"><img src="images/icons/faction-horde.jpg" class="bis-mini-faction-icon" alt="" onerror="this.src='https://render.worldofwarcraft.com/us/icons/56/achievement_pvp_h_h.jpg'" /> Horde Exclusive</div>`;
  }

  if (source) {
    html += `<div class="wow-tip-source">📍 Source: ${escapeHtml(source)}</div>`;
  }

  const reagentsRaw = card.getAttribute("data-item-reagents");
  let reagents = null;
  if (reagentsRaw) {
    try {
      reagents = JSON.parse(reagentsRaw);
    } catch {
      // Ignored
    }
  }
  if (!reagents && fullItem) {
    reagents = getItemReagents(fullItem);
  }

  if (reagents && reagents.length > 0) {
    html += `
      <div class="wow-tip-mats" style="margin-top: 0.45rem; padding-top: 0.4rem; border-top: 1px dashed rgba(255, 255, 255, 0.12);">
        <div style="color: #fbbf24; font-size: 0.78rem; font-weight: 700; margin-bottom: 0.3rem;">🔨 Materials Required:</div>
        <div class="bis-tip-reagents-list">
          ${reagents.map(r => `
            <span class="bis-tip-reagent-badge">
              <span style="color: #fff; font-weight: 700;">${r.count}x</span>
              <img src="${getReagentIconUrl(r.icon)}" width="16" height="16" class="q${r.quality || 1}" style="border-radius: 2px;" loading="lazy" />
              <span class="q${r.quality || 1}">${escapeHtml(r.name)}</span>
            </span>
          `).join('')}
        </div>
      </div>
    `;
  } else if (mats) {
    html += `<div class="wow-tip-mats" style="color: #fbbf24; font-size: 0.78rem; margin-top: 0.2rem;">🔨 Materials: ${escapeHtml(mats)}</div>`;
  }

  if (isForeverDiscovery) {
    html += `<div class="wow-tip-source" style="color: #c084fc; font-weight: 700; border-top-color: #a855f7;">🏰 WoW Forever Beta Discovery (Build 1.60.1.70425)</div>`;
  }

  tooltip.innerHTML = html;
  tooltip.removeAttribute("hidden");
  tooltip.style.display = "block";
  tooltip.style.opacity = "1";
  updateTooltipPosition(e, tooltip);
}

/**
 * Position tooltip keeping within window bounds
 */
function updateTooltipPosition(e, tooltip) {
  const pad = 14;
  let left = e.clientX + pad;
  let top = e.clientY + pad;

  const tipWidth = tooltip.offsetWidth || 280;
  const tipHeight = tooltip.offsetHeight || 160;

  if (left + tipWidth > window.innerWidth - 12) {
    left = e.clientX - tipWidth - pad;
  }
  if (top + tipHeight > window.innerHeight - 12) {
    top = window.innerHeight - tipHeight - 12;
  }

  tooltip.style.left = `${Math.max(8, left)}px`;
  tooltip.style.top = `${Math.max(8, top)}px`;
}

function getWeaponOrOffHandDetails(slot, name, _quality) {
  const l = (slot || '').toLowerCase();
  const n = (name || '').toLowerCase();

  // If Shield
  if (n.includes('shield') || n.includes('buckler') || n.includes('targe') || n.includes('wall') || n.includes('barrier') || n.includes('aegis') || n.includes('crest')) {
    return {
      isShield: true,
      armor: 680,
      block: 23
    };
  }

  // If Relic or Tome / Off-hand frill
  if (n.includes('tome') || n.includes('orb') || n.includes('libram') || n.includes('totem') || n.includes('idol') || n.includes('relic') || n.includes('rod') && l.includes('off') || n.includes('chalice') || (l.includes('off hand') && !n.includes('blade') && !n.includes('dagger') && !n.includes('axe') && !n.includes('mace') && !n.includes('sword'))) {
    return { isHeldInOffhand: true };
  }

  // Two-Handed
  if (l.includes('two') || n.includes('whirlwind') || n.includes('ravager') || n.includes('bonebiter') || n.includes('corpsemaker') || n.includes('archeus') || n.includes('greatsword') || n.includes('halberd') || n.includes('staff') || n.includes('polearm') || (n.includes('hammer') && l.includes('main'))) {
    const minDmg = 84;
    const maxDmg = 132;
    const speed = 3.60;
    const dps = ((minDmg + maxDmg) / (2 * speed)).toFixed(1);
    return { isWeapon: true, minDmg, maxDmg, speed: speed.toFixed(2), dps, type: 'Two-Hand' };
  }

  // Daggers
  if (n.includes('dagger') || n.includes('shard') || n.includes('knife') || n.includes('dirk') || n.includes('shank')) {
    const minDmg = 29;
    const maxDmg = 56;
    const speed = 1.70;
    const dps = ((minDmg + maxDmg) / (2 * speed)).toFixed(1);
    return { isWeapon: true, minDmg, maxDmg, speed: speed.toFixed(2), dps, type: 'Dagger' };
  }

  // Wand
  if (l.includes('ranged') && (n.includes('wand') || n.includes('scepter') || n.includes('torch') || n.includes('rod'))) {
    const minDmg = 42;
    const maxDmg = 78;
    const speed = 1.60;
    const dps = ((minDmg + maxDmg) / (2 * speed)).toFixed(1);
    return { isWeapon: true, minDmg, maxDmg, speed: speed.toFixed(2), dps, type: 'Wand', school: 'Shadow' };
  }

  // Bow / Gun / Crossbow
  if (l.includes('ranged')) {
    const minDmg = 34;
    const maxDmg = 65;
    const speed = 2.60;
    const dps = ((minDmg + maxDmg) / (2 * speed)).toFixed(1);
    return { isWeapon: true, minDmg, maxDmg, speed: speed.toFixed(2), dps, type: 'Ranged' };
  }

  // Standard 1H Weapon (Sword, Axe, Mace)
  const minDmg = 42;
  const maxDmg = 79;
  const speed = 2.50;
  const dps = ((minDmg + maxDmg) / (2 * speed)).toFixed(1);
  return { isWeapon: true, minDmg, maxDmg, speed: speed.toFixed(2), dps, type: 'One-Hand' };
}

function getSlotClassification(slotLabel, itemName) {
  const l = (slotLabel || '').toLowerCase();
  const n = (itemName || '').toLowerCase();

  if (l.includes("main hand") || l.includes("off hand")) {
    if (n.includes("sword")) return "Sword";
    if (n.includes("axe")) return "Axe";
    if (n.includes("mace")) return "Mace";
    if (n.includes("dagger")) return "Dagger";
    if (n.includes("shield")) return "Shield";
    return "One-Hand";
  }
  if (l.includes("ranged")) {
    if (n.includes("bow")) return "Bow";
    if (n.includes("gun")) return "Gun";
    if (n.includes("wand")) return "Wand";
    return "Ranged";
  }
  if (l.includes("finger")) return "Finger";
  if (l.includes("neck")) return "Neck";
  if (l.includes("trinket")) return "Trinket";
  if (l.includes("back")) return "Cloth";

  if (n.includes("chain") || n.includes("mail")) return "Mail";
  if (n.includes("leather") || n.includes("tiger") || n.includes("cutthroat")) return "Leather";
  if (n.includes("silk") || n.includes("robe") || n.includes("cloth") || n.includes("tunic of westfall")) return "Cloth";

  return "Armor";
}

/**
 * Format and copy current BiS list as plain text
 */
function copyBiSListToClipboard() {
  const currentClass = WOW_BIS_DATA.classes.find(c => c.id === currentBiSState.classId);
  const classData = WOW_BIS_DATA[currentBiSState.classId];
  const currentSpec = classData.specs.find(s => s.id === currentBiSState.specId);

  let text = `World of Warcraft: Forever — Level 30 Beta BiS List\n`;
  text += `Class: ${currentClass.name} | Spec: ${currentSpec.name} (${currentBiSState.faction.toUpperCase()})\n`;
  text += `Build: ${WOW_BIS_METADATA.version} (${WOW_BIS_METADATA.lastUpdated})\n\n`;

  if (currentSpec.slots && currentSpec.slots.length > 0) {
    currentSpec.slots.forEach(slot => {
      const activeItems = slot.items.filter(i => i.side === 'both' || i.side === currentBiSState.faction);
      const top = activeItems.length > 0 ? activeItems[0] : slot.items[0];
      if (top) {
        text += `${slot.slotName.toUpperCase()}: ${top.name}${top.stats ? ' (' + top.stats + ')' : ''} - ${top.source || 'N/A'}\n`;
      }
    });
  } else if (currentSpec.gear) {
    const gear = currentSpec.gear;
    for (const [slotKey, slotData] of Object.entries(gear)) {
      let item = slotData;
      if (currentBiSState.faction === 'alliance' && slotData.allianceBis) item = slotData.allianceBis;
      else if (currentBiSState.faction === 'horde' && slotData.hordeBis) item = slotData.hordeBis;

      text += `${slotKey.toUpperCase()}: ${item.name} (${item.stats || 'No stats'}) - ${item.source || 'N/A'}\n`;
      if (item.enchant && item.enchant !== 'None') {
        text += `  Enchant: ${item.enchant}\n`;
      }
    }
  }

  if (currentSpec.enchants && currentSpec.enchants.length > 0) {
    text += `\nRECOMMENDED ENCHANTS:\n`;
    currentSpec.enchants.forEach(e => {
      text += `- [${e.slot}] ${e.effect || e.name}: ${e.source || ''}\n`;
    });
  }

  if (currentSpec.consumables && currentSpec.consumables.length > 0) {
    text += `\nLEVEL 30 CONSUMABLES & BUFFS:\n`;
    currentSpec.consumables.forEach(c => {
      text += `- [${c.category}] ${c.name}: ${c.effect || c.desc || ''}\n`;
    });
  }

  const copyFn = window.copyTextToClipboard || ((t, fn) => navigator.clipboard?.writeText(t).then(fn));
  copyFn(text, () => {
    const btn = document.getElementById("btn-copy-bis-list");
    if (btn) {
      btn.innerHTML = "<span>✅</span> Gear Copied!";
      setTimeout(() => {
        btn.innerHTML = "<span>📋</span> Copy Gear List";
      }, 2000);
    }
  });
}

/**
 * Extracts unique item IDs for current spec build, taking into account custom equipped overrides
 */
function extractBiSItemIds(currentSpec, faction) {
  const ids = [];
  const customEquipped = currentBiSState.customEquipped || {};
  const prefix = `${currentBiSState.classId}_${currentBiSState.specId}_`;

  // First collect any custom equipped items for this spec
  for (const [key, item] of Object.entries(customEquipped)) {
    if (key.startsWith(prefix) && item) {
      const rawId = item.itemId || item.id || (item.tipId ? item.tipId.replace(/\D/g, "").slice(0, 6) : null);
      if (rawId && !ids.includes(String(rawId))) {
        ids.push(String(rawId));
      }
    }
  }

  // Then add default BiS items for slots that haven't been overridden or to complete the list
  if (currentSpec.gear) {
    for (const [slotKey, slotData] of Object.entries(currentSpec.gear)) {
      if (customEquipped[`${prefix}${slotKey}`]) continue;
      let item = slotData;
      if (faction === "alliance" && slotData.allianceBis) item = slotData.allianceBis;
      else if (faction === "horde" && slotData.hordeBis) item = slotData.hordeBis;

      const rawId = item.itemId || item.id || (item.tipId ? item.tipId.replace(/\D/g, "").slice(0, 6) : null);
      if (rawId && !ids.includes(String(rawId))) {
        ids.push(String(rawId));
      }
    }
  } else if (currentSpec.slots) {
    currentSpec.slots.forEach(slot => {
      if (customEquipped[`${prefix}${slot.slotId}`]) return;
      const activeItems = slot.items.filter(i => i.side === "both" || i.side === faction);
      const top = activeItems.length > 0 ? activeItems[0] : slot.items[0];
      const rawId = top?.itemId || top?.id;
      if (rawId && !ids.includes(String(rawId))) {
        ids.push(String(rawId));
      }
    });
  }
  return ids;
}

/**
 * Formats and copies `/fj import <ids>` command to clipboard for ForeverDungeonJournal
 */
function exportBiSToJournal() {
  const classData = WOW_BIS_DATA[currentBiSState.classId];
  if (!classData || !classData.specs) return;
  const currentSpec = classData.specs.find(s => s.id === currentBiSState.specId);
  if (!currentSpec) return;

  const ids = extractBiSItemIds(currentSpec, currentBiSState.faction);
  if (ids.length === 0) {
    if (window.showToast) window.showToast("No item IDs found for this spec build.", "error");
    return;
  }

  const slashCommand = `/fj import ${ids.join(",")}`;
  const copyFn = window.copyTextToClipboard || ((t, fn) => navigator.clipboard?.writeText(t).then(fn));

  copyFn(slashCommand, () => {
    const btn = document.getElementById("btn-export-bis-journal");
    if (btn) {
      const origHtml = btn.innerHTML;
      btn.innerHTML = "<span>✅</span> /fj import Copied!";
      setTimeout(() => { btn.innerHTML = origHtml; }, 2500);
    }
    if (window.showToast) {
      window.showToast(`Copied /fj import command with ${ids.length} items! Paste in-game to star your BiS gear in ForeverDungeonJournal.`, "success");
    }
  });
}

/**
 * Equips a specific alternative item into the paper-doll build and saves to localStorage
 */

  window.WOW_BIS_MODAL = {
    getTalentIconUrl,
    openBiSTalentModal,
    getSpecTalentTrees,
    generateFallbackTalentTrees,
    renderReagentTooltip,
    initItemTooltips,
    renderFloatingTooltip,
    updateTooltipPosition,
    getWeaponOrOffHandDetails,
    getSlotClassification,
    copyBiSListToClipboard,
    extractBiSItemIds,
    exportBiSToJournal
  };
})();
