import fs from 'node:fs';

const window = {};
globalThis.window = window;

// Read and eval all data files
eval(fs.readFileSync('js/data/core-data.js', 'utf8'));
eval(fs.readFileSync('js/data/races-classes.js', 'utf8'));
eval(fs.readFileSync('js/data/tools-data.js', 'utf8'));
eval(fs.readFileSync('js/data/atlas-data.js', 'utf8'));
eval(fs.readFileSync('js/data/professions-data.js', 'utf8'));
eval(fs.readFileSync('js/data/changes-data.js', 'utf8'));
eval(fs.readFileSync('js/data/bis-data.js', 'utf8'));
eval(fs.readFileSync('js/data/talents-data.js', 'utf8'));

globalThis.WOW_FOREVER_DATA = window.WOW_FOREVER_DATA;
globalThis.WOW_TOOLS_DATA = window.WOW_TOOLS_DATA;

globalThis.document = {
  getElementById: () => null,
  addEventListener: () => {}
};

let searchCode = fs.readFileSync('js/modules/search.js', 'utf8');
eval(searchCode);
window.initUniversalSearch();

const index = window.getSearchIndex();
console.log('Search Index total length:', index.length);
const categories = {};
index.forEach(s => {
  categories[s.category] = (categories[s.category] || 0) + 1;
});
console.log('Categories breakdown:');
console.log(categories);

const spearing = index.filter(s => s.title.toLowerCase().includes('spearing'));
console.log('Spearing strike found:', spearing.length, spearing[0]);

const brokenTooth = index.filter(s => s.title.toLowerCase().includes('broken tooth'));
console.log('Broken tooth found:', brokenTooth.length, brokenTooth[0]);


