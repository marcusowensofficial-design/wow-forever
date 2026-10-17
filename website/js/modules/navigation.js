/**
 * World of Warcraft: Forever - Navigation & Live Timers Module
 * Handles Countdowns, Beta Duration Tracker, and Top-Level Tab Switching.
 */

/* ==========================================================================
   1. REAL-TIME COUNTDOWN TIMERS
   ========================================================================== */
function initCountdowns() {
  const targets = {
    launch: new Date(WOW_FOREVER_DATA.countdownTargets.globalLaunch).getTime(),
    phase2: new Date(WOW_FOREVER_DATA.countdownTargets.betaPhase2).getTime(),
    betaEnds: new Date(WOW_FOREVER_DATA.countdownTargets.betaEnds).getTime(),
    raids: new Date(WOW_FOREVER_DATA.countdownTargets.raidUnlock).getTime()
  };

  function update() {
    const now = new Date().getTime();

    // 1. Beta Conclusion Countdown (Oct 21, 2026)
    const diffBetaEnds = Math.max(0, targets.betaEnds - now);
    renderTimerDigits('betaends', diffBetaEnds);

    // 2. Global Launch Countdown (Nov 4, 2026)
    const diffLaunch = Math.max(0, targets.launch - now);
    renderTimerDigits('launch', diffLaunch);

    // 3. Raid Unlock Countdown (Dec 9, 2026)
    const diffRaids = Math.max(0, targets.raids - now);
    renderTimerDigits('raids', diffRaids);
  }

  function renderTimerDigits(prefix, diff) {
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    const dElem = document.getElementById(`${prefix}-days`);
    const hElem = document.getElementById(`${prefix}-hours`);
    const mElem = document.getElementById(`${prefix}-mins`);
    const sElem = document.getElementById(`${prefix}-secs`);

    if (dElem) dElem.textContent = String(days).padStart(2, '0');
    if (hElem) hElem.textContent = String(hours).padStart(2, '0');
    if (mElem) mElem.textContent = String(minutes).padStart(2, '0');
    if (sElem) sElem.textContent = String(seconds).padStart(2, '0');
  }

  update();
  setInterval(update, 1000);
}

/* ==========================================================================
   2. BETA DURATION TRACKER & TIMELINE WIDGET
   ========================================================================== */
function initBetaDurationTracker() {
  const targets = (typeof WOW_FOREVER_DATA !== 'undefined' && WOW_FOREVER_DATA.countdownTargets) ? WOW_FOREVER_DATA.countdownTargets : {};
  const start = new Date(targets.betaStart || "2026-09-17T10:00:00-07:00").getTime();
  const end = new Date(targets.betaEnds || "2026-10-21T23:59:59-07:00").getTime();
  const now = new Date().getTime();

  const totalDuration = end - start;
  const elapsed = Math.max(0, now - start);
  const percent = Math.min(100, Math.round((elapsed / totalDuration) * 100));

  // Clamped days elapsed calculation (strictly 1 to 35)
  const isPostBeta = now >= end;
  const daysElapsed = Math.min(35, Math.max(1, Math.floor(elapsed / (1000 * 60 * 60 * 24)) + 1));
  const daysRemaining = Math.max(0, Math.ceil((end - now) / (1000 * 60 * 60 * 24)));

  const progressFill = document.getElementById('beta-duration-progress-fill');
  const progressText = document.getElementById('beta-duration-progress-text');
  const daysBadge = document.getElementById('beta-days-badge');
  const phase2DayBadge = document.getElementById('beta-phase2-day-badge');
  const topTickerDayBadge = document.getElementById('top-ticker-day-elapsed');
  const weekStatusText = document.getElementById('beta-week-status-text');
  const currentWeek = Math.min(5, Math.max(1, Math.ceil(daysElapsed / 7)));

  if (progressFill) progressFill.style.width = `${percent}%`;
  if (progressText) {
    if (isPostBeta) {
      progressText.textContent = `Beta Concluded (35 of 35 Days • All 4 Phases Complete • Preparing for Launch)`;
    } else {
      progressText.textContent = `Day ${daysElapsed} of 35 Days (${percent}% elapsed • ${daysRemaining} days remaining)`;
    }
  }
  if (daysBadge) daysBadge.textContent = isPostBeta ? 'Beta Complete' : `${daysRemaining} Days Left`;
  if (phase2DayBadge) phase2DayBadge.textContent = isPostBeta ? 'Beta Concluded' : `Day ${daysElapsed} of 35`;
  if (topTickerDayBadge) topTickerDayBadge.textContent = isPostBeta ? 'Beta Complete (35/35)' : `Day ${daysElapsed} of 35`;
  if (weekStatusText) weekStatusText.textContent = isPostBeta ? 'Completed (5 of 5 Weeks)' : `Week ${currentWeek} of 5`;
}

/* ==========================================================================
   3. MAIN TAB NAVIGATION
   ========================================================================== */
let isRestoringHistoryState = false;

function initNavigation() {
  const tabButtons = document.querySelectorAll('.nav-tab-btn');
  const tabPanels = document.querySelectorAll('.tab-content');

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTab = btn.getAttribute('data-tab');

      tabButtons.forEach(b => b.classList.remove('active'));
      tabPanels.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      const targetPanel = document.getElementById(`tab-${targetTab}`);
      if (targetPanel) {
        targetPanel.classList.add('active');
      }

      if (targetTab === 'talents') {
        const mount = document.getElementById('talents-standalone-mount');
        if (mount && (!mount.hasChildNodes() || mount.children.length === 0)) {
          if (window.TalentTreeModule && typeof window.TalentTreeModule.renderStandalone === 'function') {
            window.TalentTreeModule.renderStandalone('talents-standalone-mount', 'warrior');
          }
        }
      }

      if (!isRestoringHistoryState) {
        const currentHash = (window.location.hash || '').toLowerCase().replace(/^#+/, '');
        const targetHash = (targetTab || '').toLowerCase();
        if (currentHash !== targetHash && !currentHash.startsWith(targetHash + '/')) {
          try {
            history.pushState({ tab: targetTab }, '', `#${targetTab}`);
          } catch {
            // Ignore pushState environment errors
          }
        }
      }

      const navBar = document.querySelector('.nav-tab-bar');
      if (navBar && window.scrollY > navBar.offsetTop + 100) {
        navBar.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Support URL hash routing to tabs (e.g. #bis, #tierlist, #codex) and native talent calculator (#calculator, #talents)
  function checkUrlHashTab() {
    const rawHash = window.location.hash;
    const hash = rawHash.toLowerCase().replace('#', '');
    
    // When URL hash is empty (e.g. root or user clicked browser Back to initial state), restore default tab (overview)
    if (!hash) {
      const defaultTab = 'overview';
      tabButtons.forEach(b => b.classList.toggle('active', b.getAttribute('data-tab') === defaultTab));
      tabPanels.forEach(p => p.classList.toggle('active', p.id === `tab-${defaultTab}`));
      return;
    }

    if (hash.startsWith('calculator') || hash.startsWith('talents')) {
      const parts = hash.split('?')[0].split('/');
      const selectedClass = parts[1] || 'warrior';

      const talentsTabBtn = document.querySelector('.nav-tab-btn[data-tab="talents"]');
      if (talentsTabBtn && !talentsTabBtn.classList.contains('active')) {
        talentsTabBtn.click();
      }

      const qIndex = rawHash.indexOf('?');
      let buildUrl = '';
      if (qIndex !== -1) {
        const params = new URLSearchParams(rawHash.substring(qIndex + 1));
        if (params.get('b')) buildUrl = decodeURIComponent(params.get('b'));
        if (params.get('class')) {
          const cls = params.get('class').toLowerCase();
          if (cls && window.TalentTreeModule?.renderStandalone) {
            window.TalentTreeModule.renderStandalone('talents-standalone-mount', cls, { buildUrl });
            return;
          }
        }
      }

      if (window.TalentTreeModule && typeof window.TalentTreeModule.renderStandalone === 'function') {
        window.TalentTreeModule.renderStandalone('talents-standalone-mount', selectedClass, { buildUrl });
      }
      return;
    }

    let tabName = (hash.split('/')[0].split('#')[0].split('?')[0] || '').replace(/[^a-z0-9_-]/g, '');
    if (!tabName) return;

    const professionSlugs = ['professions', 'alchemy', 'blacksmithing', 'enchanting', 'engineering', 'leatherworking', 'tailoring', 'mining', 'herbalism', 'skinning', 'cooking', 'fishing', 'first-aid'];
    if (professionSlugs.includes(tabName)) {
      tabName = 'professions';
    } else if (tabName === 'squad' || tabName === 'roster') {
      tabName = 'tracker';
    } else if (tabName === 'checklist' || tabName === 'milestone') {
      tabName = 'milestones';
    } else if (tabName === 'legacy' || tabName === 'legacytree' || tabName === 'legacycalc') {
      tabName = 'legacy';
    } else if (tabName === 'guides' || tabName === 'guide') {
      tabName = 'guides';
    }

    // Switch tab safely
    try {
      const safeTabSelector = window.CSS && CSS.escape ? CSS.escape(tabName) : tabName;
      const targetBtn = document.querySelector(`.nav-tab-btn[data-tab="${safeTabSelector}"]`);
      if (targetBtn && !targetBtn.classList.contains('active')) {
        targetBtn.click();
      }

      // Sub-route deep-linking coordination
      const rawSub = hash.split('/')[1]?.split('#')[0];
      const subRoute = (rawSub || '').replace(/[^a-z0-9_-]/g, '');
      const rawSubSub = hash.split('/')[2]?.split('#')[0];
      const subSubRoute = (rawSubSub || '').replace(/[^a-z0-9_-]/g, '');

      if (tabName === 'professions') {
        const profSlug = subRoute || (professionSlugs.includes(hash.split('/')[0]) ? hash.split('/')[0] : 'overview');
        const profSubtab = subSubRoute || 'recipes';
        if (window.WOW_PROFESSIONS && typeof window.WOW_PROFESSIONS.selectProfession === 'function') {
          window.WOW_PROFESSIONS.selectProfession(profSlug, profSubtab, undefined, undefined, { noPush: true });
        }
      } else if (tabName === 'bis') {
        if (typeof window.handleBiSHashRouting === 'function') {
          window.handleBiSHashRouting();
        }
      } else if (subRoute) {
        const safeSubSelector = window.CSS && CSS.escape ? CSS.escape(subRoute) : subRoute;
        if (tabName === 'deepdives' && typeof window.switchDeepDiveClass === 'function') {
          window.switchDeepDiveClass(subRoute);
        } else if (tabName === 'guides' && typeof window.navigateToGuide === 'function') {
          window.navigateToGuide(subRoute);
        } else if (tabName === 'codex') {
          const codexBtn = document.querySelector(`.codex-nav-btn[data-codex="${safeSubSelector}"]`);
          if (codexBtn) codexBtn.click();
        } else if (tabName === 'atlas') {
          const atlasBtn = document.querySelector(`.atlas-subnav-btn[data-subtab="${safeSubSelector}"]`);
          if (atlasBtn) atlasBtn.click();
        }
      }
    } catch (err) {
      console.warn('Invalid navigation hash route:', err);
    }
  }

  // Header quick link to in-house Talent Calculator (Blank Slate)
  const quickLinkTalentCalc = document.getElementById('quick-link-talent-calc');
  if (quickLinkTalentCalc) {
    quickLinkTalentCalc.addEventListener('click', (e) => {
      e.preventDefault();
      const talentsTabBtn = document.querySelector('.nav-tab-btn[data-tab="talents"]');
      if (talentsTabBtn) {
        talentsTabBtn.click();
      }
      if (window.TalentTreeModule && typeof window.TalentTreeModule.renderStandalone === 'function') {
        window.TalentTreeModule.renderStandalone('talents-standalone-mount', 'warrior', { blankSlate: true });
      }
    });
  }

  checkUrlHashTab();
  window.addEventListener('hashchange', checkUrlHashTab);
  window.addEventListener('popstate', () => {
    isRestoringHistoryState = true;
    try {
      // Dismiss any open modal dialogs and hide active tooltips on browser Back/Forward
      const reagentModal = document.getElementById('prof-reagent-lookup-modal');
      if (reagentModal && reagentModal.classList.contains('is-open')) {
        reagentModal.classList.remove('is-open');
        reagentModal.setAttribute('hidden', '');
      }
      const tt = document.getElementById('wow-item-tooltip');
      if (tt) {
        tt.style.display = 'none';
      }

      checkUrlHashTab();
      if (window.checkReturnPillState) {
        window.checkReturnPillState();
      }
    } finally {
      isRestoringHistoryState = false;
    }
  });
}

/* ==========================================================================
   FLOATING RETURN PILL BUTTON & CROSS-NAV TRACKER
   ========================================================================== */
let activeReturnTarget = null;

function renderReturnPill() {
  let pill = document.getElementById('wow-return-pill-btn');
  if (!activeReturnTarget) {
    if (pill) {
      pill.style.display = 'none';
      pill.setAttribute('hidden', '');
    }
    return;
  }

  if (!pill) {
    pill = document.createElement('button');
    pill.id = 'wow-return-pill-btn';
    pill.type = 'button';
    pill.className = 'wow-return-pill-btn';
    pill.setAttribute('aria-label', 'Return to previous view');
    document.body.appendChild(pill);
  }

  const escapeFn = window.escapeHtml || (s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])));
  const label = activeReturnTarget.label || 'Previous View';
  pill.innerHTML = `
    <span class="return-pill-icon">←</span>
    <span>Return to <strong>${escapeFn(label)}</strong></span>
    <span class="return-pill-dismiss" title="Dismiss" role="button" aria-label="Dismiss return shortcut">✕</span>
  `;
  pill.removeAttribute('hidden');
  pill.style.display = 'inline-flex';

  pill.onclick = (e) => {
    if (e.target.closest('.return-pill-dismiss')) {
      e.stopPropagation();
      window.clearReturnTarget();
      return;
    }
    executeReturn();
  };
}

function executeReturn() {
  if (!activeReturnTarget) return;
  const target = activeReturnTarget;
  activeReturnTarget = null;
  renderReturnPill();

  isRestoringHistoryState = true;
  try {
    if (target.tab) {
      const tabBtn = document.querySelector(`.nav-tab-btn[data-tab="${target.tab}"]`);
      if (tabBtn) tabBtn.click();
    }
    if (target.profession && window.WOW_PROFESSIONS && window.WOW_PROFESSIONS.selectProfession) {
      window.WOW_PROFESSIONS.selectProfession(target.profession, target.subtab || 'recipes', '', undefined, { noPush: true });
    }
    if (target.reagentModal && window.WOW_PROFESSIONS && window.WOW_PROFESSIONS.openReagentModal) {
      setTimeout(() => {
        window.WOW_PROFESSIONS.openReagentModal(target.reagentModal);
      }, 120);
    }
    if (typeof target.scrollY === 'number') {
      setTimeout(() => {
        window.scrollTo({ top: target.scrollY, behavior: 'smooth' });
      }, 150);
    }
  } finally {
    isRestoringHistoryState = false;
  }
}

window.setReturnTarget = function (target) {
  if (!target) return;
  activeReturnTarget = target;
  renderReturnPill();
};

window.clearReturnTarget = function () {
  activeReturnTarget = null;
  renderReturnPill();
};

window.checkReturnPillState = function () {
  if (!activeReturnTarget) return;
  const rawHash = (window.location.hash || '').toLowerCase();
  const currentTab = document.querySelector('.nav-tab-btn.active')?.getAttribute('data-tab');
  if (activeReturnTarget.tab === currentTab && !activeReturnTarget.reagentModal) {
    if (!activeReturnTarget.profession || rawHash.includes(activeReturnTarget.profession)) {
      window.clearReturnTarget();
    }
  }
};


/* ==========================================================================
   4. MURLOC ONLINE COUNTER & AUDIO-VISUAL MICRO-INTERACTION
   ========================================================================== */
function initMurlocCounter() {
  const btn = document.getElementById("murloc-camp-btn");
  const countEl = document.getElementById("murloc-count");
  if (!btn || !countEl) return;

  const murlocQuotes = [
    "Mrrrgggll!",
    "Aaaaaughibbrgubugbugrguburgle!",
    "Rwrlwrlwrl!",
    "You pulled 3 more murlocs!",
    "Flglrgl glrgl!",
    "Tidehunter approaches!"
  ];

  let currentCount = 3840 + Math.floor(Math.random() * 320);
  countEl.textContent = currentCount.toLocaleString();

  btn.addEventListener("click", () => {
    currentCount += Math.floor(Math.random() * 4) + 1;
    countEl.textContent = currentCount.toLocaleString();

    const quote = murlocQuotes[Math.floor(Math.random() * murlocQuotes.length)];
    const bubble = document.createElement("span");
    bubble.className = "murloc-speech-bubble";
    bubble.textContent = quote;
    btn.appendChild(bubble);

    setTimeout(() => {
      bubble.remove();
    }, 1800);
  });
}



