/* global module */
/**
 * World of Warcraft: Forever - Site Lifecycle Management Engine
 * Automatically transitions the portal through Beta Phase 2, Pre-Launch, Launch, and Raid Tiers
 * based on verified timeline dates in WOW_FOREVER_DATA.countdownTargets.
 */

function getSitePhase(now = Date.now(), targets = (typeof WOW_FOREVER_DATA !== 'undefined' ? WOW_FOREVER_DATA.countdownTargets : null)) {
  if (!targets) return 'beta2';
  const parse = (k) => new Date(targets[k] || 0).getTime();
  const betaEnds = parse('betaEnds');
  const globalLaunch = parse('globalLaunch');
  const raidUnlock = parse('raidUnlock');

  if (now < betaEnds) return 'beta2';
  if (now < globalLaunch) return 'prelaunch';
  if (now < raidUnlock) return 'live';
  return 'raids';
}

function applySitePhase(forcedPhase = null) {
  if (typeof WOW_FOREVER_DATA === 'undefined' || !WOW_FOREVER_DATA.sitePhases) return;
  const now = Date.now();
  const targets = WOW_FOREVER_DATA.countdownTargets || {};
  const currentPhase = forcedPhase || getSitePhase(now, targets);
  const phaseData = WOW_FOREVER_DATA.sitePhases[currentPhase];
  if (!phaseData) return;

  const start = new Date(targets.betaStart || "2026-09-17T10:00:00-07:00").getTime();
  const elapsed = Math.max(0, now - start);
  const totalDays = (typeof WOW_FOREVER_DATA !== 'undefined' && WOW_FOREVER_DATA.metadata?.betaTotalDays) ? WOW_FOREVER_DATA.metadata.betaTotalDays : 37;
  const daysElapsed = Math.min(totalDays, Math.max(1, Math.floor(elapsed / (1000 * 60 * 60 * 24)) + 1));

  // 1. Update elements with data-phase-key
  const phaseElements = document.querySelectorAll('[data-phase-key]');
  phaseElements.forEach((el) => {
    const key = el.getAttribute('data-phase-key');
    let value = phaseData[key];
    if (value !== undefined) {
      if (typeof value === 'string' && value.includes('{daysElapsed}')) {
        value = value.replace('{daysElapsed}', daysElapsed);
      }
      el.textContent = value;
    }
  });

  // 2. Toggle phase-conditional blocks with data-phase-only
  const conditionalElements = document.querySelectorAll('[data-phase-only]');
  conditionalElements.forEach((el) => {
    const allowed = el.getAttribute('data-phase-only').split(',').map(s => s.trim());
    if (allowed.includes(currentPhase)) {
      el.removeAttribute('hidden');
      el.style.display = '';
    } else {
      el.setAttribute('hidden', 'true');
      el.style.display = 'none';
    }
  });

  document.documentElement.setAttribute('data-active-phase', currentPhase);
}

if (typeof window !== 'undefined') {
  window.getSitePhase = getSitePhase;
  window.applySitePhase = applySitePhase;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { getSitePhase, applySitePhase };
}
