import fs from 'node:fs';
import vm from 'node:vm';

const ctx = {
  console: console,
  window: {
    addEventListener: () => {},
    location: { origin: 'http://localhost', pathname: '/' }
  },
  document: {
    getElementById: (id) => {
      return {
        id,
        textContent: '',
        style: {},
        innerHTML: '',
        setAttribute: () => {},
        removeAttribute: () => {},
        querySelectorAll: () => [],
        addEventListener: () => {}
      };
    },
    querySelector: () => ({ classList: { contains: () => false }, click: () => {} }),
    querySelectorAll: () => []
  },
  history: { replaceState: () => {} },
  setTimeout: () => {}
};

vm.createContext(ctx);

// Load data files
const toolsData = fs.readFileSync('js/data/tools-data.js', 'utf8');
vm.runInContext(toolsData, ctx);

const dungData = fs.readFileSync('js/data/dungeons-data.js', 'utf8');
vm.runInContext(dungData, ctx);

// Load guides module
const guidesModule = fs.readFileSync('js/modules/guides.js', 'utf8');
vm.runInContext(guidesModule, ctx);

console.log('Testing guide categories...');
vm.runInContext(`
  console.log('Total guides:', window.WOW_TOOLS_DATA.guides.length);
  
  // Set category to dungeons
  activeGuideCategory = 'dungeons';
  activeDungeonSubfilter = 'all';
  let filtered = getFilteredGuides();
  console.log('Dungeons & Raids (all):', filtered.length);
  if (filtered.length !== 13) throw new Error('Expected 13 dungeon guides, got ' + filtered.length);

  // Subfilter: custom
  activeDungeonSubfilter = 'custom';
  filtered = getFilteredGuides();
  console.log('Dungeons (custom):', filtered.length, filtered.map(g => g.id));
  if (filtered.length !== 4) throw new Error('Expected 4 custom dungeon guides, got ' + filtered.length);

  // Subfilter: alliance
  activeDungeonSubfilter = 'alliance';
  filtered = getFilteredGuides();
  console.log('Dungeons (alliance):', filtered.length, filtered.map(g => g.id));
  if (filtered.length < 5) throw new Error('Expected at least 5 alliance accessible dungeons');

  // Subfilter: horde
  activeDungeonSubfilter = 'horde';
  filtered = getFilteredGuides();
  console.log('Dungeons (horde):', filtered.length, filtered.map(g => g.id));
  if (filtered.length < 5) throw new Error('Expected at least 5 horde accessible dungeons');

  // Subfilter: lvl13-20
  activeDungeonSubfilter = 'lvl13-20';
  filtered = getFilteredGuides();
  console.log('Dungeons (lvl13-20):', filtered.length, filtered.map(g => g.id));

  // Subfilter: lvl21-34
  activeDungeonSubfilter = 'lvl21-34';
  filtered = getFilteredGuides();
  console.log('Dungeons (lvl21-34):', filtered.length, filtered.map(g => g.id));

  // Search query test
  guideSearchQuery = 'Taragaman';
  activeDungeonSubfilter = 'all';
  filtered = getFilteredGuides();
  console.log('Search "Taragaman":', filtered.length, filtered.map(g => g.id));
  if (filtered.length === 0) throw new Error('Search failed to find Taragaman');

  guideSearchQuery = 'Edwin VanCleef';
  filtered = getFilteredGuides();
  console.log('Search "Edwin VanCleef":', filtered.length, filtered.map(g => g.id));
  if (filtered.length === 0) throw new Error('Search failed to find Edwin VanCleef');
`, ctx);

console.log('\nAll Guides module integration tests passed successfully!');
