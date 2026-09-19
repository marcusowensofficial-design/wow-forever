/**
 * World of Warcraft: Forever - Main Application Orchestrator
 * Bootstraps all feature modules on DOMContentLoaded.
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Navigation & Countdown Timers
  if (typeof initCountdowns === 'function') initCountdowns();
  if (typeof initNavigation === 'function') initNavigation();
  if (typeof initBetaDurationTracker === 'function') initBetaDurationTracker();

  // 2. News & Dispatch Hub
  if (typeof initNewsHub === 'function') initNewsHub();

  // 3. Content Codex & Dungeons Explorer
  if (typeof initCodex === 'function') initCodex();
  if (typeof initLegacyCalculator === 'function') initLegacyCalculator();
  if (typeof renderDungeonCurve === 'function') renderDungeonCurve();
  if (typeof renderQoLGrid === 'function') renderQoLGrid();
  if (typeof renderEngineSpecs === 'function') renderEngineSpecs();

  // 4. Camping & Professions Hub
  if (typeof initCampingHub === 'function') initCampingHub();
  if (typeof renderMountsGallery === 'function') renderMountsGallery();
  if (typeof renderStatsAndCaps === 'function') renderStatsAndCaps();
  if (typeof initTransmogDemo === 'function') initTransmogDemo();
  if (typeof initEngineVisualDemo === 'function') initEngineVisualDemo();
  if (typeof renderProfessionPassives === 'function') renderProfessionPassives();
  if (typeof renderGameEditions === 'function') renderGameEditions();
  if (typeof renderMegarealms === 'function') renderMegarealms();

  // 5. Interactive Class & Race Planner
  if (typeof initClassRacePlanner === 'function') initClassRacePlanner();

  // 6. Class Deep Dives
  if (typeof initClassDeepDives === 'function') initClassDeepDives();
});
