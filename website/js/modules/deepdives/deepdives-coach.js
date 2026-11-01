/**
 * World of Warcraft: Forever - Spec Rotation & Priority Coach Module
 * Datamined from WoW Forever Client (Build 1.60.1.70707) & Closed Beta Simulations
 * Renders bracketed priority ladders, reaction radar, and simulation benchmarks in Class Deep Dives.
 */

(function () {
  'use strict';

  const escapeHtml = window.escapeHtml || (s => String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;'));

  function resolveSpecKey(classId, specId) {
    const c = String(classId || '').toLowerCase().trim();
    let s = String(specId || '').toLowerCase().trim().replace(/[^a-z0-9]+/g, '-');
    if (s.startsWith('feral')) s = 'feral';
    if (s.startsWith('combat')) s = 'combat';
    if (s === 'bm') s = 'beast-mastery';
    if (s === 'marks') s = 'marksmanship';
    return `${c}-${s}`;
  }

  function getConditionLabel(when) {
    switch (when) {
      case 'buff_missing':
        return { label: 'Keep Buff Active', tag: 'cond-buff', icon: '🛡️' };
      case 'debuff_missing_or_ending':
        return { label: 'Debuff Expiring / Missing', tag: 'cond-debuff', icon: '⏳' };
      case 'ready':
        return { label: 'On Cooldown / Ready', tag: 'cond-ready', icon: '⚡' };
      case 'filler':
        return { label: 'Primary Filler', tag: 'cond-filler', icon: '🔄' };
      case 'proc':
        return { label: 'Proc Reactive', tag: 'cond-proc', icon: '✨' };
      case 'after_dodge':
        return { label: 'After Dodge Reaction', tag: 'cond-reaction', icon: '⚔️' };
      default:
        return { label: when || 'Situational', tag: 'cond-default', icon: '🔹' };
    }
  }

  function renderSpecRotationCoach(container, classId, specId, initialLevel) {
    if (!container) return;

    const coachData = window.WOW_SPEC_COACH_DATA || {};
    const specKey = resolveSpecKey(classId, specId);
    const profile = coachData[specKey];

    if (!profile || !profile.brackets || profile.brackets.length === 0) {
      // Fallback: If no coach profile exists, keep existing fallback or simple message
      container.innerHTML = `
        <div style="padding: 1.5rem; text-align: center; color: var(--text-muted); background: rgba(0,0,0,0.25); border-radius: var(--radius-sm);">
          <p>Rotational priorities for this specialization are compiling from the live beta client.</p>
        </div>
      `;
      return;
    }

    // Determine initial bracket based on initialLevel ('20' -> '20-29', '30' -> '30-39', default '30-39')
    let defaultBracketIdx = 1; // 30-39 by default
    if (String(initialLevel) === '20') {
      defaultBracketIdx = 0;
    }

    function renderBracketView(bracketIdx) {
      const bracket = profile.brackets[bracketIdx] || profile.brackets[0];
      const levels = bracket.levels || [30, 39];
      const bracketLabel = levels[0] === levels[1] ? `Level ${levels[0]}` : `Levels ${levels[0]}–${levels[1]}`;
      const isBetaCap = levels[1] === 30 || levels[0] === 30;
      const isSpeculation = Boolean(bracket.speculation || levels[0] > 30);

      const priorities = bracket.priority || [];
      const triggers = bracket.triggers || [];
      const prepull = bracket.prepull || [];
      const cooldowns = bracket.cooldowns || [];
      const sim = bracket.sim || null;

      container.innerHTML = `
        <div class="spec-coach-wrapper">
          <!-- Top Row: Bracket Selector Pills -->
          <div class="coach-bracket-bar">
            <div class="coach-bracket-pills">
              ${profile.brackets.map((b, idx) => {
                const bLevels = b.levels || [];
                const bLbl = bLevels[0] === bLevels[1] ? `Level ${bLevels[0]}` : `Lv ${bLevels[0]}–${bLevels[1]}`;
                const isSelected = idx === bracketIdx;
                const badge = bLevels[0] === 30 ? ' (Beta Cap)' : (bLevels[0] >= 40 ? ' (Launch)' : '');
                return `
                  <button type="button" class="coach-bracket-btn ${isSelected ? 'active' : ''}" data-idx="${idx}">
                    ${bLbl}${badge}
                  </button>
                `;
              }).join('')}
            </div>

            ${sim && sim.dps ? `
              <div class="coach-sim-badge" title="Estimated single-target DPS from 60s simulated boss encounter">
                <span style="color: var(--text-muted); font-size: 0.75rem;">Simulated DPS:</span>
                <strong style="color: #34d399; font-size: 0.95rem; font-family: var(--font-mono, monospace);">${sim.dps} DPS</strong>
              </div>
            ` : ''}
          </div>

          ${isSpeculation ? `
            <div class="coach-speculation-notice">
              <span>⚠️</span>
              <span>${escapeHtml(bracket.reason || 'Calculated for post-beta launch brackets based on datamined talent scaling and spell ranks.')}</span>
            </div>
          ` : ''}

          <!-- Main Layout: Left Priority Ladder, Right Radar & Prep -->
          <div class="coach-main-grid">
            <!-- Left: Numbered Priority Queue -->
            <div class="coach-priority-col">
              <h5 class="coach-col-title">
                <span>🎯</span> ${bracketLabel} Combat Priority Queue
              </h5>

              <ol class="coach-priority-list">
                ${priorities.map((item, pIdx) => {
                  const cond = getConditionLabel(item.when);
                  const dpsShare = item.value ? Math.round(item.value * 1000) / 10 : null;
                  const wowheadUrl = `https://www.wowhead.com/forever/spell=${item.spell}`;

                  return `
                    <li class="coach-priority-item">
                      <div class="coach-priority-rank">${pIdx + 1}</div>
                      <div class="coach-priority-content">
                        <div class="coach-priority-header">
                          <a href="${wowheadUrl}" target="_blank" rel="noopener noreferrer" class="coach-spell-link">
                            ${escapeHtml(item.name)}
                          </a>
                          <span class="coach-cond-badge ${cond.tag}">
                            <span>${cond.icon}</span> ${cond.label}
                          </span>
                        </div>

                        ${item.why ? `
                          <p class="coach-priority-why">${escapeHtml(item.why)}</p>
                        ` : ''}

                        ${dpsShare !== null ? `
                          <div class="coach-dps-meter-wrap">
                            <div class="coach-dps-meter-bar" style="width: ${Math.min(100, Math.max(8, dpsShare))}%;"></div>
                            <span class="coach-dps-meter-val">${dpsShare}% of DPS</span>
                          </div>
                        ` : ''}
                      </div>
                    </li>
                  `;
                }).join('')}
              </ol>
            </div>

            <!-- Right: Reaction Triggers, Cooldowns & Pre-Pull -->
            <div class="coach-sidebar-col">
              ${triggers && triggers.length > 0 ? `
                <div class="coach-panel-card triggers-card">
                  <h5 class="coach-panel-title">
                    <span>⚡</span> Reactive Proc &amp; Trigger Radar
                  </h5>
                  <div class="coach-triggers-list">
                    ${triggers.map(trig => `
                      <div class="coach-trigger-item">
                        <div class="coach-trigger-top">
                          <strong style="color: #6ee7b7;">${escapeHtml(trig.name)}</strong>
                          ${trig.within_s ? `<span class="coach-timer-tag">Within ${trig.within_s}s</span>` : ''}
                        </div>
                        <p style="font-size: 0.78rem; color: #cbd5e1; margin: 0.2rem 0 0;">
                          ${escapeHtml(trig.why || `Cast ${trig.do_name || 'spell'} immediately upon trigger.`)}
                        </p>
                      </div>
                    `).join('')}
                  </div>
                </div>
              ` : ''}

              ${cooldowns && cooldowns.length > 0 ? `
                <div class="coach-panel-card cooldowns-card">
                  <h5 class="coach-panel-title">
                    <span>⏳</span> Strategic Cooldown Timing
                  </h5>
                  <div class="coach-cooldowns-list">
                    ${cooldowns.map(cd => `
                      <div class="coach-cooldown-item">
                        <div class="coach-cd-top">
                          <strong style="color: #fef08a;">${escapeHtml(cd.name)}</strong>
                          <span class="coach-use-tag">${escapeHtml(cd.use || 'as needed')}</span>
                        </div>
                        <p style="font-size: 0.78rem; color: #94a3b8; margin: 0.2rem 0 0;">
                          ${escapeHtml(cd.why || 'Deploy strategically in encounter.')}
                        </p>
                      </div>
                    `).join('')}
                  </div>
                </div>
              ` : ''}

              ${prepull && prepull.length > 0 ? `
                <div class="coach-panel-card prepull-card">
                  <h5 class="coach-panel-title">
                    <span>🧪</span> Pre-Pull Prep &amp; Buffs
                  </h5>
                  <div class="coach-prepull-list">
                    ${prepull.map(prep => {
                      const isConsumable = prep.kind === 'consumable';
                      const url = isConsumable && prep.id ? `https://www.wowhead.com/forever/item=${prep.id}` : '#';
                      return `
                        <div class="coach-prepull-item">
                          <span style="font-size: 1rem;">${isConsumable ? '🧪' : '🛡️'}</span>
                          <div>
                            <a href="${url}" target="_blank" rel="noopener noreferrer" style="color: #93c5fd; font-size: 0.82rem; font-weight: 600;">
                              ${escapeHtml(prep.name)}
                            </a>
                            ${prep.value ? `<span style="font-size: 0.72rem; color: #34d399; margin-left: 0.4rem;">+${Math.round(prep.value * 1000) / 10}% DPS</span>` : ''}
                          </div>
                        </div>
                      `;
                    }).join('')}
                  </div>
                </div>
              ` : ''}
            </div>
          </div>
        </div>
      `;

      // Wire bracket buttons
      const btns = container.querySelectorAll('.coach-bracket-btn');
      btns.forEach(b => {
        b.addEventListener('click', () => {
          const idx = parseInt(b.getAttribute('data-idx'), 10);
          renderBracketView(idx);
        });
      });
    }

    renderBracketView(defaultBracketIdx);
  }

  window.renderSpecRotationCoach = renderSpecRotationCoach;
})();
