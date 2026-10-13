const fs = require('fs');
const path = require('path');

const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');

const buttonRegex = /<button\b([^>]*)>([\s\S]*?)<\/button>/gi;
let match;
let i = 1;
while ((match = buttonRegex.exec(html)) !== null) {
  const attrs = match[1];
  const text = match[2].replace(/<[^>]+>/g, '').trim().replace(/\s+/g, ' ');
  const idMatch = attrs.match(/id="([^"]+)"/i);
  const classMatch = attrs.match(/class="([^"]+)"/i);
  const dataAttrs = [...attrs.matchAll(/data-([a-z0-9_-]+)="([^"]*)"/gi)].map(d => `${d[1]}="${d[2]}"`).join(' ');
  const onclickMatch = attrs.match(/onclick="([^"]+)"/i);
  
  // Find which section/container it belongs to
  const index = match.index;
  const before = html.substring(0, index);
  const mainMatch = [...before.matchAll(/<(?:main|section|header|div)\b[^>]*(?:id="([^"]+)"|class="([^"]+)")/gi)].pop();
  const parent = mainMatch ? (mainMatch[1] ? `#${mainMatch[1]}` : `.${mainMatch[2].split(' ')[0]}`) : 'unknown';

  console.log(`${i++}. [${parent}] id="${idMatch ? idMatch[1] : ''}" class="${classMatch ? classMatch[1] : ''}" data="${dataAttrs}" onclick="${onclickMatch ? onclickMatch[1] : ''}" text="${text.slice(0, 35)}"`);
}
