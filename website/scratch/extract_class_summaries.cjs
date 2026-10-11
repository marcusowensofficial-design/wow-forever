const fs = require('fs');

const classes = ['warrior', 'paladin', 'hunter', 'rogue', 'priest', 'shaman', 'mage', 'warlock', 'druid'];

const classSummaries = {};

for (const c of classes) {
  let file = `scratch/class_${c}.md`;
  if (c === 'warrior') {
    file = 'C:/Users/marco/.gemini/antigravity-ide/brain/f0a6c862-566a-4448-8f6e-440d4a3e2b51/.system_generated/steps/549/output.txt';
    const json = JSON.parse(fs.readFileSync(file, 'utf8'));
    const md = json.markdown || '';
    extractFromMd(c, md);
  } else {
    const md = fs.readFileSync(file, 'utf8');
    extractFromMd(c, md);
  }
}

function extractFromMd(className, md) {
  // Look for "# [ClassName] changes in WoW Forever" or similar heading
  const lines = md.split('\n');
  let headingIdx = -1;
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes(`changes in WoW Forever`) || lines[i].includes(`changes vs Classic`)) {
      headingIdx = i;
      break;
    }
  }

  let summary = '';
  if (headingIdx !== -1) {
    // Collect next non-empty lines before "Races in Forever:" or "##" or buttons
    for (let j = headingIdx + 1; j < lines.length; j++) {
      const line = lines[j].trim();
      if (!line) continue;
      if (line.startsWith('Races in Forever') || line.startsWith('#') || line.startsWith('![')) break;
      summary += (summary ? ' ' : '') + line;
      if (line.includes('with its source.') || line.includes('compared with Classic')) break;
    }
  }

  // Clean markdown image syntax like ![](https://foreverchanges.pro/icon/...)
  const cleanSummary = summary.replace(/!\[.*?\]\(.*?\)/g, '').replace(/\s+/g, ' ').trim();
  classSummaries[className] = cleanSummary;
  console.log(`=== ${className.toUpperCase()} ===\n`, cleanSummary, '\n');
}

fs.writeFileSync('scratch/all_class_summaries.json', JSON.stringify(classSummaries, null, 2));
