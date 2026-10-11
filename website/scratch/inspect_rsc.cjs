const fs = require('fs');

const rsc = fs.readFileSync('scratch/changes_rsc.txt', 'utf8');

// Let's find JSON objects or arrays inside the RSC stream.
// Typically in Next.js App router, props are passed to client components like ChangesView, ClassChanges, etc.
const lines = rsc.split('\n');
console.log('Total RSC lines:', lines.length);

// Look for lines that contain JSON arrays or objects
for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  if (line.includes('Improved Heroic Strike')) {
    console.log(`Line ${i} length ${line.length}:`, line.substring(0, 300));
  }
}
