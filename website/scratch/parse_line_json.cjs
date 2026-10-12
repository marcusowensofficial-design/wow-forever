const fs = require('fs');

let line = fs.readFileSync('scratch/fc_enchanting_line.txt', 'utf8').trim();
// Remove leading `57:`
const colonIdx = line.indexOf(':');
line = line.slice(colonIdx + 1);

const parsed = JSON.parse(line);
// In RSC, format is ["$", "$L58", null, props]
const props = parsed[3];
console.log('Props keys:', Object.keys(props));
console.log('Profession object keys:', Object.keys(props.profession));

fs.writeFileSync('scratch/fc_enchanting_data.json', JSON.stringify(props, null, 2));
console.log('Successfully written full parsed data to scratch/fc_enchanting_data.json!');
