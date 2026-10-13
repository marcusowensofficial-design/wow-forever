const fs = require('fs');
const path = require('path');

const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');

console.log('=== AUDITING 18 MAIN TABS ===');
const tabs = ['overview', 'guides', 'bis', 'talents', 'news', 'codex', 'atlas', 'tierlist', 'downrank', 'planner', 'deepdives', 'changes', 'professions', 'camping', 'legacy', 'systems', 'tracker', 'milestones'];

tabs.forEach(tab => {
  const startTag = `id="tab-${tab}"`;
  const idx = html.indexOf(startTag);
  if (idx === -1) {
    console.log(`[MISSING] Tab: ${tab}`);
  } else {
    // find section length
    const nextMain = html.indexOf('id="tab-', idx + startTag.length);
    const content = nextMain !== -1 ? html.substring(idx, nextMain) : html.substring(idx);
    const textOnly = content.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
    const isPlaceholder = textOnly.toLowerCase().includes('coming soon') || textOnly.toLowerCase().includes('placeholder') || textOnly.length < 50;
    console.log(`Tab [${tab}]: Content Length = ${content.length}, Text Length = ${textOnly.length}, Placeholder? ${isPlaceholder}`);
  }
});

console.log('\n=== SCANNING ALL SUB-TABS & SELECTORS IN HTML ===');

// Find all buttons with data-* attributes
const buttonMatches = [...html.matchAll(/<button\b([^>]*)>([\s\S]*?)<\/button>/gi)];

const buttonCategories = {};

buttonMatches.forEach(b => {
  const attrs = b[1];
  const text = b[2].replace(/<[^>]+>/g, '').trim().replace(/\s+/g, ' ');
  const classMatch = attrs.match(/class="([^"]+)"/);
  const classes = classMatch ? classMatch[1].split(/\s+/) : [];
  const idMatch = attrs.match(/id="([^"]+)"/);
  const id = idMatch ? idMatch[1] : '';
  const dataAttrs = [...attrs.matchAll(/data-([a-z0-9_-]+)="([^"]*)"/gi)].map(d => `${d[1]}=${d[2]}`);

  classes.forEach(c => {
    if (!buttonCategories[c]) buttonCategories[c] = [];
    buttonCategories[c].push({ id, text: text.slice(0, 30), dataAttrs, attrs });
  });
});

console.log('Distinct Button Classes found:');
Object.keys(buttonCategories).sort().forEach(c => {
  console.log(`- .${c} (${buttonCategories[c].length} instances)`);
});
