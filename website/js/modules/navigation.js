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
  const start = new Date("2026-09-17T10:00:00-07:00").getTime();
  const end = new Date("2026-10-21T23:59:59-07:00").getTime();
  const now = new Date().getTime();

  const totalDuration = end - start;
  const elapsed = Math.max(0, now - start);
  const percent = Math.min(100, Math.round((elapsed / totalDuration) * 100));

  // Days elapsed calculation
  const daysElapsed = Math.floor(elapsed / (1000 * 60 * 60 * 24)) + 1; // e.g. Day 2
  const daysRemaining = Math.max(0, Math.ceil((end - now) / (1000 * 60 * 60 * 24)));

  const progressFill = document.getElementById('beta-duration-progress-fill');
  const progressText = document.getElementById('beta-duration-progress-text');
  const daysBadge = document.getElementById('beta-days-badge');
  const phase2DayBadge = document.getElementById('beta-phase2-day-badge');
  const topTickerDayBadge = document.getElementById('top-ticker-day-elapsed');

  if (progressFill) progressFill.style.width = `${percent}%`;
  if (progressText) progressText.textContent = `Day ${daysElapsed} of 35 Days (${percent}% elapsed • ${daysRemaining} days remaining)`;
  if (daysBadge) daysBadge.textContent = `${daysRemaining} Days Left`;
  if (phase2DayBadge) phase2DayBadge.textContent = `Day ${daysElapsed} of 35`;
  if (topTickerDayBadge) topTickerDayBadge.textContent = `Day ${daysElapsed} of 35`;
}

/* ==========================================================================
   3. MAIN TAB NAVIGATION
   ========================================================================== */
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
    if (!hash) return;

    if (hash.startsWith('calculator') || hash.startsWith('talents')) {
      if (window.TalentTreeModule && typeof window.TalentTreeModule.openFromHash === 'function') {
        window.TalentTreeModule.openFromHash(rawHash);
      }
      return;
    }

    const tabName = hash.split('/')[0];
    const targetBtn = document.querySelector(`.nav-tab-btn[data-tab="${tabName}"]`);
    if (targetBtn && !targetBtn.classList.contains('active')) {
      targetBtn.click();
    }
  }

  // Header quick link to in-house Talent Calculator (Blank Slate)
  const quickLinkTalentCalc = document.getElementById('quick-link-talent-calc');
  if (quickLinkTalentCalc) {
    quickLinkTalentCalc.addEventListener('click', () => {
      if (window.TalentTreeModule) {
        window.TalentTreeModule.openModal({
          classId: 'warrior',
          blankSlate: true,
          maxPoints: 26,
          specName: 'Warrior Custom Build'
        });
      }
    });
  }

  checkUrlHashTab();
  window.addEventListener('hashchange', checkUrlHashTab);
}

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



