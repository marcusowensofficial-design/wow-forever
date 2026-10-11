const fs = require('fs');

const FIRECRAWL_KEY = process.env.FIRECRAWL_API_KEY || 'fc-3266bc9c2a634b3396d82b18ba4192bd';
const classes = ['hunter', 'mage', 'rogue', 'priest', 'warlock', 'paladin', 'druid', 'shaman'];

async function scrapeClass(className) {
  const url = `https://foreverchanges.pro/class/${className}`;
  console.log(`Scraping ${className}...`);
  try {
    const res = await fetch('https://api.firecrawl.dev/v1/scrape', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${FIRECRAWL_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        url,
        formats: ['markdown']
      })
    });
    const json = await res.json();
    if (json.success && json.data && json.data.markdown) {
      fs.writeFileSync(`scratch/class_${className}.md`, json.data.markdown);
      console.log(`Saved ${className}, length:`, json.data.markdown.length);
    } else {
      console.log(`Failed for ${className}:`, json);
    }
  } catch (err) {
    console.error(`Error scraping ${className}:`, err.message);
  }
}

async function run() {
  for (const c of classes) {
    await scrapeClass(c);
  }
  console.log('Done scraping classes!');
}

run();
