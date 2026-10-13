const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, '..', 'index.html');
const jsDir = path.join(__dirname, '..', 'js');

const html = fs.readFileSync(htmlPath, 'utf8');

console.log('=== 1. MAIN NAVIGATION TABS AUDIT ===');
const tabMatches = [...html.matchAll(/class="[^"]*nav-tab-btn[^"]*"[^>]*data-tab="([^"]+)"/g)];
const tabs = tabMatches.map(m => m[1]);

tabs.forEach(tab => {
  const panelExists = html.includes(`id="tab-${tab}"`);
  console.log(`Tab [${tab}]: Panel #tab-${tab} exists? ${panelExists}`);
});

console.log('\n=== 2. ALL BUTTONS IN INDEX.HTML ===');
// Match all button tags
const buttonRegex = /<button\b([^>]*)>([\s\S]*?)<\/button>/gi;
let match;
const buttons = [];
while ((match = buttonRegex.exec(html)) !== null) {
  const attrs = match[1];
  const innerText = match[2].replace(/<[^>]+>/g, '').trim().replace(/\s+/g, ' ');
  const idMatch = attrs.match(/id="([^"]+)"/i);
  const classMatch = attrs.match(/class="([^"]+)"/i);
  const dataAttrs = [...attrs.matchAll(/data-([a-z0-9_-]+)="([^"]*)"/gi)].map(d => `${d[1]}=${d[2]}`);
  const onclickMatch = attrs.match(/onclick="([^"]+)"/i);
  buttons.push({
    id: idMatch ? idMatch[1] : null,
    className: classMatch ? classMatch[1] : null,
    innerText: innerText.slice(0, 40),
    dataAttrs,
    onclick: onclickMatch ? onclickMatch[1] : null,
    rawAttrs: attrs.trim()
  });
}

console.log(`Total <button> elements in index.html: ${buttons.length}`);

// Read all JS files
function getAllJsFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      if (file !== 'node_modules' && file !== 'scratch') {
        results = results.concat(getAllJsFiles(fullPath));
      }
    } else if (file.endsWith('.js')) {
      results.push(fullPath);
    }
  });
  return results;
}

const jsFiles = getAllJsFiles(jsDir);
console.log(`Found ${jsFiles.length} JS files to scan.`);

const jsContents = jsFiles.map(f => ({
  file: path.relative(path.join(__dirname, '..'), f),
  content: fs.readFileSync(f, 'utf8')
}));

console.log('\n=== 3. BUTTONS WITH NO OBVIOUS LISTENER OR HANDLER ===');
const unhandledButtons = [];

buttons.forEach(btn => {
  if (btn.onclick) return; // has inline onclick

  let handled = false;
  let reason = '';

  // If button has ID
  if (btn.id) {
    for (const js of jsContents) {
      if (js.content.includes(btn.id)) {
        handled = true;
        reason = `Referenced by ID in ${js.file}`;
        break;
      }
    }
  }

  // If button has class that might be querySelectorAll'd
  if (!handled && btn.className) {
    const classes = btn.className.split(/\s+/).filter(c => c && c !== 'active');
    for (const cls of classes) {
      for (const js of jsContents) {
        if (js.content.includes(cls)) {
          handled = true;
          reason = `Class .${cls} referenced in ${js.file}`;
          break;
        }
      }
      if (handled) break;
    }
  }

  // If button has data attributes
  if (!handled && btn.dataAttrs.length > 0) {
    for (const da of btn.dataAttrs) {
      const key = da.split('=')[0];
      for (const js of jsContents) {
        if (js.content.includes(`data-${key}`) || js.content.includes(`dataset.${key}`) || js.content.includes(`getAttribute('data-${key}')`)) {
          handled = true;
          reason = `data-${key} referenced in ${js.file}`;
          break;
        }
      }
      if (handled) break;
    }
  }

  if (!handled) {
    unhandledButtons.push(btn);
  }
});

console.log(`Buttons without obvious JS reference (${unhandledButtons.length}):`);
unhandledButtons.forEach(b => {
  console.log(`- ID: ${b.id || 'none'} | Class: ${b.className || 'none'} | Text: "${b.innerText}" | Attrs: ${b.rawAttrs}`);
});
