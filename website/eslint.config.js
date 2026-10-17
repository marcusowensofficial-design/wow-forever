import js from '@eslint/js';

export default [
  js.configs.recommended,
  {
    ignores: [
      'node_modules/**',
      '.agents/**',
      '.playwright-mcp/**',
      'images/**'
    ]
  },
  {
    files: ['js/**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'script',
      globals: {
        window: 'readonly',
        document: 'readonly',
        console: 'readonly',
        fetch: 'readonly',
        localStorage: 'readonly',
        sessionStorage: 'readonly',
        setTimeout: 'readonly',
        clearTimeout: 'readonly',
        setInterval: 'readonly',
        clearInterval: 'readonly',
        requestAnimationFrame: 'readonly',
        cancelAnimationFrame: 'readonly',
        navigator: 'readonly',
        location: 'readonly',
        history: 'readonly',
        URL: 'readonly',
        URLSearchParams: 'readonly',
        Event: 'readonly',
        CustomEvent: 'readonly',
        MouseEvent: 'readonly',
        DOMParser: 'readonly',
        CSS: 'readonly',
        IntersectionObserver: 'readonly',
        MutationObserver: 'readonly',
        ResizeObserver: 'readonly',
        HTMLElement: 'readonly',
        HTMLInputElement: 'readonly',
        Image: 'readonly',
        alert: 'readonly',
        confirm: 'readonly',
        prompt: 'readonly',
        atob: 'readonly',
        btoa: 'readonly',
        ClipboardItem: 'readonly',
        // In-app shared globals loaded sequentially via script tags
        escapeHtml: 'readonly',
        copyTextToClipboard: 'readonly',
        showToast: 'readonly',
        positionTooltip: 'readonly',
        WOW_CORE_DATA: 'writable',
        WOW_RACES_DATA: 'writable',
        WOW_CLASSES_DATA: 'writable',
        WOW_TOOLS_DATA: 'writable',
        WOW_ATLAS_DATA: 'writable',
        WOW_PROFESSIONS_DATA: 'writable',
        WOW_CHANGES_DATA: 'writable',
        WOW_BIS_DATA: 'writable',
        WOW_BIS_METADATA: 'writable',
        WOW_TALENTS_DATA: 'writable',
        WOW_FOREVER_DATA: 'writable',
        WOW_FOREVER: 'writable',
        currentBiSState: 'writable',
        renderBiSApp: 'writable',
        updateBiSSummary: 'writable',
        initClassRacePlanner: 'readonly',
        getTalentIconUrl: 'readonly',
        // Module orchestrations in app.js
        initCountdowns: 'readonly',
        initNavigation: 'readonly',
        initBetaDurationTracker: 'readonly',
        initNewsHub: 'readonly',
        initCodex: 'readonly',
        initAtlas: 'readonly',
        initLegacyCalculator: 'readonly',
        renderDungeonCurve: 'readonly',
        renderQoLGrid: 'readonly',
        renderEngineSpecs: 'readonly',
        initProfessionsHub: 'readonly',
        initCampingHub: 'readonly',
        renderMountsGallery: 'readonly',
        renderStatsAndCaps: 'readonly',
        initTransmogDemo: 'readonly',
        initEngineVisualDemo: 'readonly',
        renderProfessionPassives: 'readonly',
        renderGameEditions: 'readonly',
        renderMegarealms: 'readonly',
        initClassDeepDives: 'readonly',
        initBiSLists: 'readonly',
        initTierListMaker: 'readonly',
        initDownrankCalculator: 'readonly',
        initHiddenItemsTracker: 'readonly',
        initUniversalSearch: 'readonly',
        initGuidesHub: 'readonly',
        initMurlocCounter: 'readonly'
      }
    },
    rules: {
      'no-unused-vars': ['warn', {
        'argsIgnorePattern': '^_',
        'varsIgnorePattern': '^(_|WOW_|init[A-Z]|render(MountsGallery|StatsAndCaps|ProfessionPassives|GameEditions|Megarealms|DungeonCurve|QoLGrid|EngineSpecs)$)'
      }],
      'no-undef': 'error',
      'no-redeclare': 'off',
      'no-dupe-keys': 'error',
      'no-constant-condition': 'warn',
      'no-empty': ['warn', { 'allowEmptyCatch': true }]
    }
  },
  {
    files: ['scripts/**/*.{js,mjs}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        process: 'readonly',
        console: 'readonly',
        fetch: 'readonly',
        setTimeout: 'readonly',
        clearTimeout: 'readonly',
        Buffer: 'readonly'
      }
    },
    rules: {
      'no-unused-vars': ['warn', { 'argsIgnorePattern': '^_', 'varsIgnorePattern': '^_' }],
      'no-undef': 'error'
    }
  }
];
