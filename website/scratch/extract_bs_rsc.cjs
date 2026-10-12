const fs = require('fs');

const html = fs.readFileSync('C:/Users/marco/.gemini/antigravity-ide/brain/a3609b6e-2221-4ccb-ae94-18127d24d6d2/.system_generated/steps/291/content.md', 'utf8');

// Find all self.__next_f.push([1, "..."])
const fRegex = /self\.__next_f\.push\(\[1,"([\s\S]*?)"\]\)/g;
let match;
let fullRsc = '';

while ((match = fRegex.exec(html)) !== null) {
  let str = match[1];
  try {
    str = JSON.parse('"' + str + '"');
  } catch (e) {
    str = str.replace(/\\"/g, '"').replace(/\\n/g, '\n').replace(/\\\\/g, '\\');
  }
  fullRsc += str;
}

const lines = fullRsc.split('\n');
console.log('Total lines in Blacksmithing RSC:', lines.length);

for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('"slug":"blacksmithing"')) {
    console.log(`Line ${i} length: ${lines[i].length}`);
    let line = lines[i].trim();
    const colonIdx = line.indexOf(':');
    line = line.slice(colonIdx + 1);
    const parsed = JSON.parse(line);
    const props = parsed[3];
    console.log('BS Props keys:', Object.keys(props));
    fs.writeFileSync('scratch/fc_bs_data.json', JSON.stringify(props, null, 2));
    console.log('Saved BS data to scratch/fc_bs_data.json');
    break;
  }
}
