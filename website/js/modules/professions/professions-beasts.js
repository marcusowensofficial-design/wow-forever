/**
 * World of Warcraft: Forever - Skinnable Beasts Directory & Skinning Calculator
 * Enables live mob level threshold calculation and zone density exploration for Skinning (#professions/skinning/beasts).
 */

(function () {
  "use strict";

  let playerSkill = 1;
  let searchQuery = "";
  let selectedZone = "all";

  function getMaxBeastLevel(skill) {
    if (skill <= 100) {
      if (skill <= 10) return 10;
      return 10 + Math.floor(skill / 10);
    }
    return Math.floor(skill / 5);
  }

  function getSkillDifficulty(beastSkill, currentSkill) {
    const diff = currentSkill - beastSkill;
    if (diff < 0) return { label: "Too High", color: "#e57373" };
    if (diff < 20) return { label: "Orange", color: "#ff8c00" };
    if (diff < 40) return { label: "Yellow", color: "#ffd700" };
    if (diff < 60) return { label: "Green", color: "#4caf50" };
    return { label: "Grey", color: "#9e9e9e" };
  }

  function renderSkinningBeastsView(container, prof) {
    const beasts = window.WOW_SKINNABLE_BEASTS_DATA || [];
    const zones = window.WOW_SKINNING_ZONES || [];
    if (!container) return;

    const maxLevel = getMaxBeastLevel(playerSkill);

    // Extract unique zones for filter
    const zoneOptions = ["all", ...new Set(beasts.map(b => b.primaryZone).filter(Boolean))].sort();

    // Filter beasts
    const filtered = beasts.filter(b => {
      if (selectedZone !== "all" && b.primaryZone !== selectedZone) return false;
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const matchesName = b.name.toLowerCase().includes(q);
        const matchesZone = (b.primaryZone || "").toLowerCase().includes(q);
        const matchesDrops = (b.drops || []).some(d => d.toLowerCase().includes(q));
        if (!matchesName && !matchesZone && !matchesDrops) return false;
      }
      return true;
    });

    // Best zones for player's skill
    const optimalZones = zones.filter(z => {
      const parts = z.bestForSkill.split("–").map(n => parseInt(n, 10));
      return playerSkill >= parts[0] - 15 && playerSkill <= (parts[1] || 300) + 15;
    });

    let html = `
      <div class="skinning-beasts-hub" style="margin-top: 1rem;">
        <!-- Header Banner & Interactive Calculator -->
        <div style="background: linear-gradient(180deg, rgba(22,34,52,0.95) 0%, rgba(14,22,36,0.98) 100%); border: 1px solid rgba(197,160,89,0.3); border-radius: 8px; padding: 1.5rem; margin-bottom: 1.5rem;">
          <div style="display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 1rem; margin-bottom: 1.25rem;">
            <div>
              <h2 style="font-family: 'Cinzel', serif; font-size: 1.4rem; color: #f0e6d2; margin: 0 0 0.3rem 0;">
                Skinnable Beasts & Level Formula
              </h2>
              <p style="font-size: 0.85rem; color: #9cb0c4; margin: 0; line-height: 1.4;">
                Skinning formula: Level 1–10 needs Skill 1 · Level 11–20 needs (Level − 10) × 10 · Level 21+ needs Level × 5.
              </p>
            </div>
            <div style="background: rgba(0,0,0,0.3); border: 1px solid rgba(197,160,89,0.4); padding: 0.6rem 1.2rem; border-radius: 8px; text-align: center;">
              <div style="font-size: 0.72rem; text-transform: uppercase; color: #c5a059; font-weight: bold;">Max Skinnable Mob Level</div>
              <div style="font-size: 1.7rem; font-weight: bold; color: #4caf50; font-family: monospace;">Level ${maxLevel}</div>
            </div>
          </div>

          <!-- Interactive Slider -->
          <div style="background: rgba(0,0,0,0.25); padding: 1rem; border-radius: 6px; border: 1px solid rgba(255,255,255,0.06);">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
              <label for="skinning-skill-range" style="font-size: 0.9rem; font-weight: 600; color: #cbd5e1;">Your Skinning Skill: <span id="skinning-skill-val" style="color: #c5a059; font-size: 1.1rem; font-family: monospace;">${playerSkill}</span> / 300</label>
              <span style="font-size: 0.75rem; color: #8899aa;">Drag slider to see mob difficulty & recommended zones</span>
            </div>
            <input type="range" id="skinning-skill-range" min="1" max="300" value="${playerSkill}" style="width: 100%; cursor: pointer; accent-color: #c5a059;" />
          </div>

          <!-- Dynamic Best Zones Recommendation -->
          <div style="margin-top: 1.25rem;">
            <div style="font-size: 0.8rem; font-weight: bold; text-transform: uppercase; color: #c5a059; margin-bottom: 0.5rem;">
              Recommended Hunting Zones at Skill ${playerSkill}:
            </div>
            <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
              ${optimalZones.length ? optimalZones.map(z => `
                <div style="background: rgba(197,160,89,0.15); border: 1px solid rgba(197,160,89,0.35); padding: 0.4rem 0.8rem; border-radius: 6px; font-size: 0.85rem;">
                  <strong style="color: #f0e6d2;">${z.zone}</strong>
                  <span style="color: #9cb0c4; font-size: 0.75rem; margin-left: 0.3rem;">(Mobs: ${z.levels} · ${z.faction})</span>
                </div>
              `).join('') : '<span style="color: #8899aa; font-size: 0.85rem;">Check endgame contested zones (Un\'Goro, Winterspring, Plaguelands).</span>'}
            </div>
          </div>
        </div>

        <!-- Filter & Search Controls -->
        <div style="display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 0.75rem; margin-bottom: 1rem; background: rgba(14,24,38,0.7); padding: 0.75rem 1rem; border-radius: 6px; border: 1px solid rgba(255,255,255,0.06);">
          <div style="display: flex; align-items: center; gap: 0.75rem; flex: 1; max-width: 480px;">
            <input type="text" id="skinning-search-input" value="${searchQuery}" placeholder="Search beast name, zone, or leather type..." style="width: 100%; background: rgba(0,0,0,0.3); border: 1px solid rgba(255,255,255,0.15); border-radius: 4px; padding: 0.45rem 0.75rem; color: #fff; font-size: 0.85rem;" />
          </div>
          <div style="display: flex; align-items: center; gap: 0.5rem;">
            <label for="skinning-zone-select" style="font-size: 0.8rem; color: #9cb0c4;">Zone:</label>
            <select id="skinning-zone-select" style="background: #0f172a; border: 1px solid rgba(255,255,255,0.15); border-radius: 4px; padding: 0.4rem 0.6rem; color: #cbd5e1; font-size: 0.82rem;">
              ${zoneOptions.map(z => `<option value="${z}" ${selectedZone === z ? 'selected' : ''}>${z === 'all' ? 'All Zones' : z}</option>`).join('')}
            </select>
          </div>
        </div>

        <!-- Beasts Table -->
        <div style="overflow-x: auto; background: rgba(14,24,38,0.6); border: 1px solid rgba(255,255,255,0.08); border-radius: 8px;">
          <table style="width: 100%; border-collapse: collapse; text-align: left; font-size: 0.85rem;">
            <thead>
              <tr style="background: rgba(255,255,255,0.04); border-bottom: 1px solid rgba(255,255,255,0.1); color: #c5a059; text-transform: uppercase; font-size: 0.75rem; letter-spacing: 0.5px;">
                <th style="padding: 0.75rem 1rem;">Beast Name</th>
                <th style="padding: 0.75rem 0.75rem;">Mob Level</th>
                <th style="padding: 0.75rem 0.75rem;">Req. Skill</th>
                <th style="padding: 0.75rem 0.75rem;">Difficulty</th>
                <th style="padding: 0.75rem 1rem;">Primary Leather / Hides Yielded</th>
                <th style="padding: 0.75rem 1rem;">Primary Zone</th>
                <th style="padding: 0.75rem 0.75rem; text-align: right;">Spawns</th>
              </tr>
            </thead>
            <tbody>
              ${filtered.length ? filtered.map(b => {
                const diff = getSkillDifficulty(b.skill, playerSkill);
                const isSkinnable = playerSkill >= b.skill;
                return `
                  <tr style="border-bottom: 1px solid rgba(255,255,255,0.04); opacity: ${isSkinnable ? '1' : '0.65'};">
                    <td style="padding: 0.65rem 1rem; font-weight: 600; color: #f0e6d2;">
                      ${b.name}
                      ${b.seenInForever ? '<span style="font-size: 0.68rem; color: #4caf50; margin-left: 0.4rem; background: rgba(76,175,80,0.15); padding: 0.1rem 0.35rem; border-radius: 3px;">Forever</span>' : ''}
                    </td>
                    <td style="padding: 0.65rem 0.75rem; color: #94a3b8; font-family: monospace;">
                      ${b.minLevel === b.maxLevel ? b.minLevel : `${b.minLevel}–${b.maxLevel}`}
                    </td>
                    <td style="padding: 0.65rem 0.75rem; font-family: monospace; font-weight: bold; color: ${b.skill <= playerSkill ? '#c5a059' : '#e57373'};">
                      ${b.skill}
                    </td>
                    <td style="padding: 0.65rem 0.75rem;">
                      <span style="display: inline-block; padding: 0.15rem 0.45rem; border-radius: 3px; font-size: 0.72rem; font-weight: bold; color: #fff; background: ${diff.color};">
                        ${diff.label}
                      </span>
                    </td>
                    <td style="padding: 0.65rem 1rem;">
                      <div style="display: flex; flex-wrap: wrap; gap: 0.35rem;">
                        ${(b.drops || []).map(d => `<span style="background: rgba(255,255,255,0.06); padding: 0.15rem 0.45rem; border-radius: 3px; font-size: 0.75rem; color: #cbd5e1;">${d}</span>`).join('')}
                      </div>
                    </td>
                    <td style="padding: 0.65rem 1rem; color: #64b5f6;">
                      ${b.primaryZone}
                    </td>
                    <td style="padding: 0.65rem 0.75rem; text-align: right; color: #94a3b8; font-family: monospace;">
                      ${b.spawns}
                    </td>
                  </tr>
                `;
              }).join('') : `
                <tr>
                  <td colspan="7" style="padding: 2rem; text-align: center; color: #8899aa;">
                    No skinnable beasts found matching your filter criteria.
                  </td>
                </tr>
              `}
            </tbody>
          </table>
        </div>
      </div>
    `;

    container.innerHTML = html;

    // Attach listeners
    const slider = container.querySelector('#skinning-skill-range');
    if (slider) {
      slider.addEventListener('input', (e) => {
        playerSkill = parseInt(e.target.value, 10);
        renderSkinningBeastsView(container, prof);
      });
    }

    const searchInput = container.querySelector('#skinning-search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value;
        renderSkinningBeastsView(container, prof);
      });
    }

    const zoneSelect = container.querySelector('#skinning-zone-select');
    if (zoneSelect) {
      zoneSelect.addEventListener('change', (e) => {
        selectedZone = e.target.value;
        renderSkinningBeastsView(container, prof);
      });
    }
  }

  window.WOW_PROFESSIONS_BEASTS = {
    renderSkinningBeastsView
  };
})();
