const fs = require('fs');
const vm = require('vm');

// Mock window and document
const windowMock = {
  WOW_PROFESSIONS_DATA: JSON.parse(fs.readFileSync('data/forever_professions.json', 'utf8')),
  location: { hash: '#professions/enchanting/recipes' },
  history: { replaceState: () => {} },
  addEventListener: () => {}
};
windowMock.window = windowMock;

const context = vm.createContext(windowMock);

// Run professions.js in context to verify syntax and initialization
const code = fs.readFileSync('js/modules/professions.js', 'utf8');

try {
  vm.runInContext(code, context);
  console.log('✓ professions.js syntax and evaluation test passed!');
  console.log('window.WOW_PROFESSIONS exists:', !!windowMock.WOW_PROFESSIONS);
  console.log('window.initProfessionsHub exists:', !!windowMock.initProfessionsHub);
} catch (err) {
  console.error('✗ Evaluation failed:', err);
  process.exit(1);
}
