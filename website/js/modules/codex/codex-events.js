/**
 * World of Warcraft: Forever - World Events & Holiday Calendar
 * Pure Logic Module — Controller, View Renderer, and Event Dispatcher
 */
(function () {
  'use strict';

  let state = {
    filter: 'all', // 'all' | 'battleground' | 'holiday' | 'micro'
    search: '',
    newOnly: false
  };

  function esc(str) {
    return String(str == null ? '' : str).replace(/[&<>"']/g, (ch) => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    }[ch]));
  }

  // Calculate live status for cyclic events based on reference start and interval
  function getEventCycleStatus(sched) {
    if (!sched || !sched.start) {
      return { statusText: 'Scheduled', isActive: false, countdown: 'See dates below' };
    }

    const now = new Date();
    const startDate = new Date(Date.UTC(sched.start.y, sched.start.mo - 1, sched.start.d, sched.start.h, sched.start.mi));
    const nowMs = now.getTime();
    const startMs = startDate.getTime();

    const durationMs = (sched.hours || 168) * 3600 * 1000;
    const cycleMs = (sched.cycle || 504) * 3600 * 1000;

    if (nowMs < startMs) {
      const diffDays = Math.ceil((startMs - nowMs) / (24 * 3600 * 1000));
      return {
        statusText: `Starts in ${diffDays} day${diffDays === 1 ? '' : 's'}`,
        isActive: false,
        countdown: `${sched.text || ''}`
      };
    }

    const elapsed = (nowMs - startMs) % cycleMs;
    if (elapsed < durationMs) {
      const remHours = Math.ceil((durationMs - elapsed) / (3600 * 1000));
      const remDays = Math.floor(remHours / 24);
      return {
        statusText: remDays > 0 ? `Active Now (${remDays}d remaining)` : `Active Now (${remHours}h remaining)`,
        isActive: true,
        countdown: 'Event bonus active across all realms'
      };
    } else {
      const nextCycleMs = cycleMs - elapsed;
      const nextDays = Math.ceil(nextCycleMs / (24 * 3600 * 1000));
      return {
        statusText: `Upcoming in ${nextDays} day${nextDays === 1 ? '' : 's'}`,
        isActive: false,
        countdown: `${sched.text || ''}`
      };
    }
  }

  function getFilteredEvents() {
    const raw = window.WOW_EVENTS_DATA?.events || [];
    return raw.filter(e => {
      if (state.newOnly && !e.isNewInForever) return false;

      if (state.filter === 'battleground' && e.kind !== 'battleground') return false;
      if (state.filter === 'holiday' && e.kind !== 'holiday') return false;
      if (state.filter === 'micro' && e.kind !== 'micro' && e.kind !== 'world-event') return false;

      if (state.search) {
        const q = state.search.toLowerCase();
        const nMatch = (e.name || '').toLowerCase().includes(q);
        const dMatch = (e.desc || '').toLowerCase().includes(q);
        const bgMatch = e.battleground && e.battleground.name.toLowerCase().includes(q);
        const fMatch = (e.factions || []).some(f => f.name.toLowerCase().includes(q));
        if (!nMatch && !dMatch && !bgMatch && !fMatch) return false;
      }
      return true;
    });
  }

  function renderEventCard(e) {
    const primarySched = (e.schedules || [])[0];
    const cycle = getEventCycleStatus(primarySched);
    const kindBadge = e.kind === 'battleground' ? '⚔️ Battleground' : (e.kind === 'holiday' ? '🎄 Holiday Festival' : '🎣 World Event');

    return `
      <div class="collection-item-card" style="background:#0f172a;border:1px solid rgba(255,255,255,0.08);border-radius:8px;padding:1.1rem;display:flex;flex-direction:column;justify-content:space-between;gap:0.9rem;transition:border-color 0.2s ease;">
        <div>
          <!-- Header Bar -->
          <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:0.75rem;margin-bottom:0.6rem;">
            <div>
              <div style="display:flex;align-items:center;gap:0.45rem;margin-bottom:0.25rem;">
                <span style="font-size:1.25rem;">${e.isNewInForever ? '✨' : '📅'}</span>
                <h3 style="margin:0;font-size:1.05rem;color:#f8fafc;font-weight:700;">${esc(e.name)}</h3>
              </div>
              <div style="display:flex;align-items:center;gap:0.4rem;flex-wrap:wrap;">
                <span style="background:rgba(255,255,255,0.06);color:#94a3b8;padding:0.1rem 0.4rem;border-radius:4px;font-size:0.72rem;font-weight:600;">
                  ${kindBadge}
                </span>
                ${e.isNewInForever ? `
                  <span style="background:rgba(16,185,129,0.2);color:#34d399;border:1px solid rgba(16,185,129,0.4);padding:0.1rem 0.45rem;border-radius:4px;font-size:0.7rem;font-weight:800;letter-spacing:0.03em;">
                    NEW IN FOREVER
                  </span>
                ` : ''}
                ${e.minLevel > 1 ? `
                  <span style="color:#64748b;font-size:0.72rem;">Req Level ${e.minLevel}+</span>
                ` : ''}
              </div>
            </div>

            <!-- Active / Upcoming Status Pill -->
            <span style="padding:0.2rem 0.6rem;border-radius:999px;font-size:0.75rem;font-weight:700;flex-shrink:0;${cycle.isActive ? 'background:rgba(16,185,129,0.2);color:#34d399;border:1px solid #10b981;' : 'background:rgba(245,158,11,0.15);color:#fbbf24;border:1px solid rgba(245,158,11,0.3);'}">
              ${cycle.statusText}
            </span>
          </div>

          <!-- Description -->
          <p style="font-size:0.83rem;color:#cbd5e1;line-height:1.5;margin:0 0 0.75rem 0;">
            ${esc(e.desc || 'World event and celebration across Azeroth.')}
          </p>

          <!-- Cycle / Schedule Details -->
          ${primarySched ? `
            <div style="background:rgba(15,23,42,0.6);border:1px solid rgba(255,255,255,0.06);padding:0.5rem 0.75rem;border-radius:6px;font-size:0.77rem;color:#94a3b8;margin-bottom:0.75rem;line-height:1.4;">
              <strong style="color:#e2e8f0;">Schedule:</strong> ${esc(primarySched.text || cycle.countdown)}
            </div>
          ` : ''}

          <!-- Battleground Details (if Call to Arms) -->
          ${e.battleground ? `
            <div style="background:rgba(239,68,68,0.08);border:1px solid rgba(239,68,68,0.25);padding:0.55rem 0.75rem;border-radius:6px;margin-bottom:0.75rem;">
              <div style="display:flex;align-items:center;justify-content:space-between;font-size:0.8rem;font-weight:700;color:#f87171;margin-bottom:0.25rem;">
                <span>⚔️ ${esc(e.battleground.name)}</span>
                <span>${esc(e.battleground.players)} Players (${e.battleground.minLevel}–${e.battleground.maxLevel})</span>
              </div>
              <div style="font-size:0.73rem;color:#cbd5e1;">
                Featured battleground bonus: Increased Honor yield and bonus faction reputation awards upon completion.
              </div>
            </div>
          ` : ''}

          <!-- Factions & Rewards -->
          ${(e.factions && e.factions.length > 0) ? `
            <div style="display:flex;flex-direction:column;gap:0.35rem;margin-bottom:0.6rem;">
              <span style="font-size:0.73rem;color:#64748b;font-weight:700;text-transform:uppercase;">Associated Factions & Standing:</span>
              <div style="display:flex;gap:0.4rem;flex-wrap:wrap;">
                ${e.factions.map(f => `
                  <span style="background:rgba(59,130,246,0.12);color:#60a5fa;border:1px solid rgba(59,130,246,0.25);padding:0.15rem 0.5rem;border-radius:4px;font-size:0.73rem;font-weight:600;">
                    ${esc(f.name)} ${f.rewardsCount ? `(${f.rewardsCount} rewards)` : ''}
                  </span>
                `).join('')}
              </div>
            </div>
          ` : ''}

          <!-- Challenge Feat -->
          ${e.challenge ? `
            <div style="background:rgba(245,158,11,0.08);border:1px solid rgba(245,158,11,0.25);padding:0.45rem 0.65rem;border-radius:6px;font-size:0.75rem;color:#fef08a;">
              <strong>🏆 Feat: ${esc(e.challenge.name)}</strong> — ${esc(e.challenge.desc)}
            </div>
          ` : ''}
        </div>

        <!-- Footer / Dev Post Quotes -->
        <div style="border-top:1px solid rgba(255,255,255,0.06);padding-top:0.5rem;font-size:0.72rem;color:#64748b;display:flex;align-items:center;justify-content:space-between;">
          <span>Official Build ${esc(window.WOW_EVENTS_DATA?.meta?.build || '1.60.1')}</span>
          <span style="color:#94a3b8;">${e.posts && e.posts[0] ? `Ref: ${esc(e.posts[0].title)}` : 'Client Verified'}</span>
        </div>
      </div>
    `;
  }

  function renderEvents() {
    const container = document.getElementById('codex-events-container');
    if (!container) return;

    const events = getFilteredEvents();
    const data = window.WOW_EVENTS_DATA || { meta: {}, events: [] };

    container.innerHTML = `
      <div style="display:flex;flex-direction:column;gap:1.25rem;width:100%;">
        <!-- Header Banner -->
        <div style="background:linear-gradient(135deg, rgba(30,41,59,0.8) 0%, rgba(15,23,42,0.95) 100%);border:1px solid rgba(255,255,255,0.1);border-radius:8px;padding:1.25rem 1.5rem;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:1rem;">
          <div>
            <h2 style="margin:0 0 0.35rem 0;font-size:1.35rem;color:#fde047;font-weight:800;">
              🎉 World Events, Holidays &amp; Battleground Call to Arms
            </h2>
            <p style="margin:0;font-size:0.88rem;color:#94a3b8;line-height:1.5;">
              Active holiday schedules, rotating weekend battleground cycles, bonus honor periods, and seasonal loot tables from client build ${esc(data.meta.build)}.
            </p>
          </div>
          <div style="display:flex;align-items:center;gap:0.5rem;">
            <span style="background:rgba(16,185,129,0.15);color:#34d399;border:1px solid rgba(16,185,129,0.3);padding:0.35rem 0.75rem;border-radius:6px;font-size:0.8rem;font-weight:700;">
              ${data.events.length} Tracked Events
            </span>
          </div>
        </div>

        <!-- Filter Bar -->
        <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:0.75rem;border-bottom:1px solid rgba(255,255,255,0.08);padding-bottom:0.75rem;">
          <div class="atlas-filter-pills">
            <button class="atlas-pill ${state.filter === 'all' ? 'active' : ''}" data-ev-filter="all">All Events (${data.events.length})</button>
            <button class="atlas-pill ${state.filter === 'battleground' ? 'active' : ''}" data-ev-filter="battleground">⚔️ Call to Arms (${data.events.filter(e => e.kind === 'battleground').length})</button>
            <button class="atlas-pill ${state.filter === 'holiday' ? 'active' : ''}" data-ev-filter="holiday">🎄 Seasonal Holidays (${data.events.filter(e => e.kind === 'holiday').length})</button>
            <button class="atlas-pill ${state.filter === 'micro' ? 'active' : ''}" data-ev-filter="micro">🎣 Micro-Events (${data.events.filter(e => e.kind !== 'battleground' && e.kind !== 'holiday').length})</button>
            <button class="atlas-pill ${state.newOnly ? 'active' : ''}" id="ev-new-only" style="${state.newOnly ? 'background:#059669;border-color:#10b981;color:#fff;font-weight:700;' : ''}">
              ✨ New in Forever (${data.events.filter(e => e.isNewInForever).length})
            </button>
          </div>

          <div class="atlas-search-box" style="width:260px;">
            <span class="atlas-search-icon">🔍</span>
            <input type="text" id="ev-search-input" class="atlas-input" placeholder="Search events..." value="${esc(state.search)}" aria-label="Search events">
          </div>
        </div>

        <!-- Events Grid -->
        <div style="display:grid;grid-template-columns:repeat(auto-fill, minmax(340px, 1fr));gap:1rem;">
          ${events.length > 0 ? events.map(renderEventCard).join('') : `
            <div style="grid-column:1/-1;text-align:center;padding:3rem;background:rgba(15,23,42,0.6);border-radius:8px;border:1px dashed rgba(255,255,255,0.1);">
              <p style="color:#94a3b8;font-size:1rem;margin:0;">No events match your selected filters.</p>
            </div>
          `}
        </div>
      </div>
    `;

    attachEvents();
  }

  function attachEvents() {
    document.querySelectorAll('[data-ev-filter]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        state.filter = e.currentTarget.getAttribute('data-ev-filter');
        renderEvents();
      });
    });

    const newBtn = document.getElementById('ev-new-only');
    if (newBtn) {
      newBtn.addEventListener('click', () => {
        state.newOnly = !state.newOnly;
        renderEvents();
      });
    }

    const searchInp = document.getElementById('ev-search-input');
    if (searchInp) {
      searchInp.addEventListener('input', (e) => {
        state.search = e.target.value.trim();
        renderEvents();
        const inp = document.getElementById('ev-search-input');
        if (inp) {
          inp.focus();
          inp.selectionStart = inp.selectionEnd = inp.value.length;
        }
      });
    }
  }

  window.initCodexEvents = renderEvents;
})();
