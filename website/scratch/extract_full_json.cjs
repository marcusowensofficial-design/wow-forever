const fs = require('fs');

const rsc = fs.readFileSync('scratch/fc_enchanting_rsc.txt', 'utf8');

// Find the line that starts with 57: or contains "slug":"enchanting"
const match = rsc.match(/\d+:\["\$","\$L\d+",null,(\{[\s\S]*?\n\d+:|\{[\s\S]*?$)/);
if (match) {
  console.log('Match found, length:', match[0].length);
  // Let's parse the JSON part after `...null,`
  const prefixIdx = match[0].indexOf('null,{');
  if (prefixIdx !== -1) {
    let jsonStr = match[0].slice(prefixIdx + 5);
    // Find matching closing brace/bracket
    // Let's trim trailing line markers if any
    const lastBrace = jsonStr.lastIndexOf('}');
    if (lastBrace !== -1) {
      jsonStr = jsonStr.slice(0, lastBrace + 1);
    }
    try {
      const data = JSON.parse(jsonStr);
      console.log('Successfully parsed profession JSON!');
      console.log('Top keys:', Object.keys(data));
      if (data.profession) {
        console.log('data.profession keys:', Object.keys(data.profession));
      }
      fs.writeFileSync('scratch/fc_enchanting_full.json', JSON.stringify(data, null, 2));
      console.log('Saved to scratch/fc_enchanting_full.json');
    } catch (e) {
      console.log('JSON parse error:', e.message);
      // Let's save jsonStr to scratch to inspect
      fs.writeFileSync('scratch/raw_json_chunk.txt', jsonStr);
    }
  }
} else {
  console.log('Pattern not matched directly');
}
