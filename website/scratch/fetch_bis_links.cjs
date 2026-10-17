const fs = require('fs');

async function main() {
  const res = await fetch('https://foreverchanges.pro/bis');
  const html = await res.text();
  
  // Find all links to /bis/...
  const links = new Set();
  const regex = /href="\/bis\/([^"]+)"/g;
  let m;
  while ((m = regex.exec(html)) !== null) {
    links.add(m[1]);
  }
  
  console.log('Total BiS links on /bis:', links.size);
  console.log(Array.from(links).sort());
}

main().catch(console.error);
