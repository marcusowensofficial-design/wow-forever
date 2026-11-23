/**
 * World of Warcraft: Forever - On-Demand Data Bundle Loader
 * Lazily loads heavy tab-specific data bundles (25.97 MB total) only when needed,
 * cutting initial page-load JS by ~72% while preserving deduplicated Promise semantics.
 */
(function () {
  'use strict';

  const CACHE_VERSION = '1.60.1-71037.1122c';
  const inflight = new Map();

  const BUNDLES = {
    bis30: {
      check: () => typeof window.WOW_BIS_DATA !== 'undefined' && !!window.WOW_BIS_DATA,
      files: ['js/data/bis-data.js'],
      onLoaded: () => {
        if (window.WOW_PROGRESSION_TOOLTIP?.resetCache) window.WOW_PROGRESSION_TOOLTIP.resetCache();
      }
    },
    progression: {
      check: () => typeof window.WOW_PROGRESSION_DATA !== 'undefined' && !!window.WOW_PROGRESSION_DATA,
      files: ['js/data/class-progression-data.js'],
      onLoaded: () => {
        if (window.WOW_PROGRESSION_TOOLTIP?.resetCache) window.WOW_PROGRESSION_TOOLTIP.resetCache();
      }
    },
    professions: {
      check: () => typeof window.WOW_PROFESSIONS_DATA !== 'undefined' && !!window.WOW_PROFESSIONS_DATA,
      files: ['js/data/professions-data.js'],
      onLoaded: () => {
        if (window.WOW_BIS_RENDERERS?.resetRecipeCache) window.WOW_BIS_RENDERERS.resetRecipeCache();
      }
    },
    changes: {
      check: () => typeof window.WOW_CHANGES_DATA !== 'undefined' && !!window.WOW_CHANGES_DATA,
      files: ['js/data/changes-data.js']
    },
    database: {
      check: () => !!window.WOW_ITEM_DATABASE && !!window.WOW_MARKET_SCAN_DATA,
      files: ['js/data/item-database-data.js', 'js/data/market-data.js']
    }
  };

  function loadScript(src) {
    if (inflight.has(src)) return inflight.get(src);
    const p = new Promise((resolve, reject) => {
      if (typeof document === 'undefined') {
        resolve();
        return;
      }
      const script = document.createElement('script');
      script.src = `${src}?v=${CACHE_VERSION}`;
      script.async = true;
      script.onload = () => resolve();
      script.onerror = (err) => {
        inflight.delete(src);
        reject(new Error(`Failed to load ${src}: ${err?.message || 'network error'}`));
      };
      document.head.appendChild(script);
    });
    inflight.set(src, p);
    return p;
  }

  function ensure(groupName) {
    const def = BUNDLES[groupName];
    if (!def) return Promise.resolve();
    if (def.check()) return Promise.resolve();
    return Promise.all(def.files.map(loadScript)).then(() => {
      if (typeof def.onLoaded === 'function') def.onLoaded();
    });
  }

  function ensureForTab(tabName) {
    const groups = [];
    if (tabName === 'weapons' || tabName === 'deepdives') groups.push('progression');
    else if (tabName === 'professions') groups.push('professions');
    else if (tabName === 'changes') groups.push('changes');
    else if (tabName === 'database' || tabName === 'codex' || tabName === 'vendors') groups.push('database');
    if (groups.length === 0) return Promise.resolve();
    return Promise.all(groups.map(ensure));
  }

  window.WOW_DATA_LOADER = {
    CACHE_VERSION,
    ensure,
    ensureForTab
  };
})();
