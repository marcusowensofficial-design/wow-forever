import fs from 'node:fs';

const html = fs.readFileSync('index.html', 'utf8');

// Nav links
const navMatches = html.match(/href="#([a-zA-Z0-9_\-\/]+)"/g) || [];
const navLinks = [...new Set(navMatches.map(m => m.replace(/href="#|"/g, '')))];

// Sections
const sectionMatches = html.match(/<section[^>]+id="([^"]+)"/g) || [];
const sections = sectionMatches.map(s => s.match(/id="([^"]+)"/)[1]);

console.log('--- SECTIONS IN INDEX.HTML ---');
console.log(sections);

console.log('--- HASH ROUTES IN INDEX.HTML ---');
console.log(navLinks);

// Modules
const modules = fs.readdirSync('js/modules');
console.log('--- JS MODULES ---');
console.log(modules);

// Data files
const dataFiles = fs.readdirSync('data');
console.log('--- DATA FILES & SIZES ---');
for (const f of dataFiles) {
  const stat = fs.statSync('data/' + f);
  console.log(`${f}: ${(stat.size / 1024).toFixed(1)} KB`);
}
