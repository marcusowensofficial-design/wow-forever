const fs = require('fs');
const path = require('path');

const jsDir = path.join(__dirname, '..', 'js', 'modules');
const jsFiles = fs.readdirSync(jsDir).filter(f => f.endsWith('.js'));

console.log('=== DYNAMIC BUTTONS CREATED IN JS MODULES ===');

const allDynamicButtons = [];

jsFiles.forEach(file => {
  const filePath = path.join(jsDir, file);
  const content = fs.readFileSync(filePath, 'utf8');

  // Match all <button ...> in string literals
  const buttonRegex = /<button\b([^>]*)>([\s\S]*?)<\/button>/gi;
  let match;
  while ((match = buttonRegex.exec(content)) !== null) {
    const attrs = match[1];
    const innerText = match[2].replace(/<[^>]+>/g, '').trim().replace(/\s+/g, ' ');
    const idMatch = attrs.match(/id=["']?([^"'\s>]+)["']?/i);
    const classMatch = attrs.match(/class=["']?([^"'>]+)["']?/i);
    const dataAttrs = [...attrs.matchAll(/data-([a-z0-9_-]+)=["']?([^"'\s>]*)["']?/gi)].map(d => `${d[1]}=${d[2]}`);
    const onclickMatch = attrs.match(/onclick=["']?([^"'>]+)["']?/i);

    allDynamicButtons.push({
      file,
      id: idMatch ? idMatch[1] : null,
      classes: classMatch ? classMatch[1].split(/\s+/) : [],
      innerText: innerText.slice(0, 40),
      dataAttrs,
      onclick: onclickMatch ? onclickMatch[1] : null,
      attrs: attrs.trim()
    });
  }
});

console.log(`Found ${allDynamicButtons.length} dynamic <button> definitions across JS modules.`);

// Now let's group dynamic buttons by (file, selector) and see if listeners are bound in that file or other files
const unhandledDynamic = [];

allDynamicButtons.forEach(btn => {
  if (btn.onclick) return; // inline onclick

  const fileContent = fs.readFileSync(path.join(jsDir, btn.file), 'utf8');
  let bound = false;
  let method = '';

  // Check ID
  if (btn.id && !btn.id.includes('${')) {
    if (fileContent.includes(`'#${btn.id}'`) || fileContent.includes(`"#${btn.id}"`) || fileContent.includes(`getElementById('${btn.id}')`) || fileContent.includes(`getElementById("${btn.id}")`)) {
      bound = true;
      method = `ID ${btn.id}`;
    }
  }

  // Check classes
  if (!bound) {
    for (const c of btn.classes) {
      if (!c || c === 'active' || c.includes('${')) continue;
      if (fileContent.includes(`.${c}`) || fileContent.includes(`'${c}'`) || fileContent.includes(`"${c}"`)) {
        // check if addEventListener or .on is called
        bound = true;
        method = `Class .${c}`;
        break;
      }
    }
  }

  // Check data attributes
  if (!bound) {
    for (const d of btn.dataAttrs) {
      const key = d.split('=')[0];
      if (fileContent.includes(`data-${key}`) || fileContent.includes(`dataset.${key}`)) {
        bound = true;
        method = `data-${key}`;
        break;
      }
    }
  }

  // Also check if document/window event delegation handles it
  if (!bound) {
    unhandledDynamic.push(btn);
  }
});

console.log(`Dynamic buttons without apparent direct event binding in their defining file: ${unhandledDynamic.length}`);
unhandledDynamic.forEach(b => {
  console.log(`[${b.file}] text: "${b.innerText}" | ID: ${b.id} | classes: ${b.classes.join(', ')} | data: ${b.dataAttrs.join(', ')}`);
});
