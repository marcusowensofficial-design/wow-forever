const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');
const lines = html.split('\n');
lines.forEach((l, i) => {
  if (l.includes('class="app-container"') || l.includes('</main>') || l.includes('id="tab-changes"')) {
    console.log(i + 1, l);
  }
});
