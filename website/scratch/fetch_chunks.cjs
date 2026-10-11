const fs = require('fs');

const scripts = [
  'https://foreverchanges.pro/_next/static/chunks/2i51e627rllld.js',
  'https://foreverchanges.pro/_next/static/chunks/3g4px251sg85e.js',
  'https://foreverchanges.pro/_next/static/chunks/1ypnz7b6iqy09.js',
  'https://foreverchanges.pro/_next/static/chunks/turbopack-1khqyajpyewl7.js',
  'https://foreverchanges.pro/_next/static/chunks/37xvujgqftf45.js',
  'https://foreverchanges.pro/_next/static/chunks/1hc3twsata04q.js',
  'https://foreverchanges.pro/_next/static/chunks/23vsr_yth_rm-.js',
  'https://foreverchanges.pro/_next/static/chunks/22aay76ki5q8k.js',
  'https://foreverchanges.pro/_next/static/chunks/3wejvgwzxdzuq.js',
  'https://foreverchanges.pro/_next/static/chunks/33-gz2l6m2031.js',
  'https://foreverchanges.pro/_next/static/chunks/0cz1d0mv5g_q7.js',
  'https://foreverchanges.pro/_next/static/chunks/3yfl9fgvivx3-.js'
];

async function check() {
  for (const url of scripts) {
    try {
      const res = await fetch(url);
      if (res.ok) {
        const text = await res.text();
        if (text.includes('Spearing Strike') || text.includes('CHANGES IN WOW FOREVER') || text.includes('Arms adds')) {
          console.log('FOUND MATCH IN:', url, 'Length:', text.length);
          fs.writeFileSync('scratch/matched_chunk.js', text);
        }
      }
    } catch (e) {
      console.log('Error fetching:', url, e.message);
    }
  }
}

check();
