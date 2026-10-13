const fs = require('fs');
const path = require('path');

const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');

console.log('=== 1. CODEX SUBTABS ===');
const codexMatches = [...html.matchAll(/class="[^"]*codex-nav-btn[^"]*"[^>]*data-codex="([^"]+)"/g)].map(m => m[1]);
codexMatches.forEach(sub => {
  const exists = html.includes(`id="codex-${sub}"`);
  console.log(`Codex [${sub}]: #codex-${sub} exists? ${exists}`);
});

console.log('\n=== 2. ATLAS SUBTABS ===');
const atlasMatches = [...html.matchAll(/class="[^"]*atlas-subnav-btn[^"]*"[^>]*data-subtab="([^"]+)"/g)].map(m => m[1]);
atlasMatches.forEach(sub => {
  const exists = html.includes(`id="atlas-subpanel-${sub}"`) || html.includes(`id="atlas-${sub}"`);
  console.log(`Atlas [${sub}]: panel exists? ${exists}`);
});

console.log('\n=== 3. GUIDES SUBTABS ===');
const guidesMatches = [...html.matchAll(/class="[^"]*guides-subtab-btn[^"]*"[^>]*data-guide-filter="([^"]+)"/g)].map(m => m[1]);
guidesMatches.forEach(sub => {
  console.log(`Guides filter [${sub}]`);
});

console.log('\n=== 4. CHANGES FILTER BUTTONS ===');
const changesMatches = [...html.matchAll(/class="[^"]*changes-[^"]*"[^>]*data-([^=]+)="([^"]+)"/g)].map(m => `${m[1]}=${m[2]}`);
console.log('Changes buttons:', changesMatches);

console.log('\n=== 5. CHECKING ALL ONCLICK AND BUTTON IDS IN JS FILES ===');
const jsFiles = ['app.js', 'tracker.js', 'utils.js', ...fs.readdirSync(path.join(__dirname, '..', 'js', 'modules'))];

// Check all button IDs in HTML against JS
const htmlButtonIds = [...html.matchAll(/<button[^>]*\bid="([^"]+)"/gi)].map(m => m[1]);
console.log(`Total buttons with explicit ID in index.html: ${htmlButtonIds.length}`);

htmlButtonIds.forEach(id => {
  let foundIn = [];
  jsFiles.forEach(jf => {
    const p = path.join(__dirname, '..', 'js', jf.includes('/') ? jf : (fs.existsSync(path.join(__dirname, '..', 'js', jf)) ? jf : path.join('modules', jf)));
    if (fs.existsSync(p)) {
      const code = fs.readFileSync(p, 'utf8');
      if (code.includes(id)) {
        foundIn.push(jf);
      }
    }
  });
  if (foundIn.length === 0) {
    console.log(`[ORPHAN ID BUTTON] ID: "${id}" is NOT referenced in any JS file!`);
  }
});
