const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, '..', 'index.html');
const jsDir = path.join(__dirname, '..', 'js');

const html = fs.readFileSync(htmlPath, 'utf8');

// Get all JS files
function getJsFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getJsFiles(fullPath));
    } else if (file.endsWith('.js')) {
      results.push(fullPath);
    }
  });
  return results;
}

const jsFiles = getJsFiles(jsDir);
const jsContents = jsFiles.map(f => ({
  path: f,
  relPath: path.relative(path.join(__dirname, '..'), f),
  content: fs.readFileSync(f, 'utf8')
}));

// Find all buttons in HTML
const buttonRegex = /<button\b([^>]*)>([\s\S]*?)<\/button>/gi;
let match;
const buttons = [];
let idx = 0;

while ((match = buttonRegex.exec(html)) !== null) {
  idx++;
  const attrs = match[1];
  const innerHtml = match[2].trim();
  const text = innerHtml.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
  
  const idMatch = attrs.match(/id=["']([^"']+)["']/i);
  const classMatch = attrs.match(/class=["']([^"']+)["']/i);
  const onclickMatch = attrs.match(/onclick=["']([^"']+)["']/i);
  const typeMatch = attrs.match(/type=["']([^"']+)["']/i);
  const roleMatch = attrs.match(/role=["']([^"']+)["']/i);
  const dataTabMatch = attrs.match(/data-tab=["']([^"']+)["']/i);
  const dataSubtabMatch = attrs.match(/data-subtab=["']([^"']+)["']/i);
  const dataCatMatch = attrs.match(/data-guide-category=["']([^"']+)["']/i);

  const id = idMatch ? idMatch[1] : null;
  const classes = classMatch ? classMatch[1].split(/\s+/).filter(Boolean) : [];
  const onclick = onclickMatch ? onclickMatch[1] : null;
  const type = typeMatch ? typeMatch[1] : null;

  buttons.push({
    index: idx,
    id,
    classes,
    onclick,
    type,
    text: text.slice(0, 50),
    dataTab: dataTabMatch ? dataTabMatch[1] : null,
    dataSubtab: dataSubtabMatch ? dataSubtabMatch[1] : null,
    dataCat: dataCatMatch ? dataCatMatch[1] : null,
    rawAttrs: attrs
  });
}

console.log(`Total buttons found in index.html: ${buttons.length}`);

// For each button, determine if it has a direct handler, ID handler, class handler, or delegation
const audited = buttons.map(btn => {
  let handlerFound = [];

  if (btn.onclick) {
    handlerFound.push(`inline: onclick="${btn.onclick.slice(0, 30)}..."`);
  }

  if (btn.id) {
    jsContents.forEach(js => {
      if (js.content.includes(`'${btn.id}'`) || js.content.includes(`"${btn.id}"`) || js.content.includes(`#${btn.id}`)) {
        handlerFound.push(`ID in ${js.relPath}`);
      }
    });
  }

  // Common class-based event delegators / handlers
  const knownHandledClasses = [
    'nav-tab-btn', 'subtab-btn', 'codex-subtab-btn', 'atlas-subtab-btn',
    'guides-subtab-btn', 'deepdive-class-btn', 'tierlist-tab-btn',
    'tierlist-slot-btn', 'bis-class-tab', 'bis-spec-btn', 'bis-faction-btn',
    'modal-close-btn', 'filter-chip', 'btn-filter-role', 'btn-sort-filter',
    'planner-talent-tree-btn', 'talent-calc-class-btn', 'btn-copy-build',
    'btn-reset-build', 'tab-btn', 'segmented-btn', 'squad-role-btn',
    'squad-faction-btn', 'diff-pill'
  ];

  btn.classes.forEach(cls => {
    if (knownHandledClasses.includes(cls)) {
      handlerFound.push(`Class: .${cls}`);
    } else {
      jsContents.forEach(js => {
        if (js.content.includes(`.${cls}`) || js.content.includes(`'${cls}'`) || js.content.includes(`"${cls}"`)) {
          handlerFound.push(`Class .${cls} in ${js.relPath}`);
        }
      });
    }
  });

  // Deduplicate
  const uniqueHandlers = [...new Set(handlerFound)];

  return {
    ...btn,
    handlers: uniqueHandlers,
    isDeadCandidate: uniqueHandlers.length === 0
  };
});

const deadCandidates = audited.filter(b => b.isDeadCandidate);
console.log(`\nPotential dead buttons without detected JS reference: ${deadCandidates.length}`);
deadCandidates.forEach(b => {
  console.log(`- [#${b.id || 'NO_ID'}] .${b.classes.join('.')} | "${b.text}" (type: ${b.type || 'none'})`);
});
