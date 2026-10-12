const fs = require('fs');

const css = fs.readFileSync('css/professions.css', 'utf8');
const lines = css.split('\n');

console.log('Total lines in css/professions.css:', lines.length);

lines.forEach((l, idx) => {
  if (l.includes('minmax')) {
    console.log(`Line ${idx + 1}: ${l.trim()}`);
  }
});

// Check media queries
const mediaQueries = [];
lines.forEach((l, idx) => {
  if (l.includes('@media')) {
    console.log(`Media query Line ${idx + 1}: ${l.trim()}`);
  }
});
