import fs from 'node:fs';

async function run() {
  try {
    const res = await fetch('https://foreverchanges.pro', {
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
    });
    console.log('Status:', res.status);
    const html = await res.text();
    console.log('HTML Length:', html.length);
    const regex = /href="(\/[^"#?]+)"/g;
    const links = new Set();
    let m;
    while ((m = regex.exec(html)) !== null) {
      links.add(m[1]);
    }
    console.log('All links on foreverchanges.pro homepage:');
    console.log(JSON.stringify(Array.from(links).sort(), null, 2));

    // Also check sitemap.xml or robots.txt
    const robots = await fetch('https://foreverchanges.pro/robots.txt');
    console.log('robots.txt status:', robots.status);
    if (robots.ok) {
      console.log('robots.txt:\n', await robots.text());
    }

    const sitemap = await fetch('https://foreverchanges.pro/sitemap.xml');
    console.log('sitemap.xml status:', sitemap.status);
    if (sitemap.ok) {
      const sitemapText = await sitemap.text();
      fs.writeFileSync('scratch/fc_sitemap.xml', sitemapText);
      console.log('Saved sitemap, length:', sitemapText.length);
    }
  } catch (err) {
    console.error('Error:', err);
  }
}
run();
