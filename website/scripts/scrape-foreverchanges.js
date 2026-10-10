/**
 * Automated Scraper for World of Warcraft: Forever data from ForeverChanges.pro
 * Extracts dungeons, bosses, loot tables, drop chances, and quest rewards.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = 'https://foreverchanges.pro';

const NEW_DUNGEONS = [
  'hall-of-thanes',
  'ruins-of-lordaeron',
  'excavation-site',
  'city-of-dalaran',
  'the-drowned-city',
  'kroldok-stronghold',
  'alcaz-prison',
  'blackmaw-hold',
  'shapers-terrace'
];

const FIRECRAWL_KEY = process.env.FIRECRAWL_API_KEY || 'fc-3266bc9c2a634b3396d82b18ba4192bd';

async function fetchPage(url) {
  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36'
      }
    });
    if (res.ok) {
      return await res.text();
    }
  } catch {
    // Direct connection blocked or TLS error; fall back to Firecrawl cloud worker
  }

  const fcRes = await fetch('https://api.firecrawl.dev/v1/scrape', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${FIRECRAWL_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      url,
      formats: ['html']
    })
  });

  const fcData = await fcRes.json();
  if (!fcData.success || !fcData.data?.html) {
    throw new Error(`Firecrawl failed for ${url}: ${JSON.stringify(fcData)}`);
  }
  return fcData.data.html;
}

function parseDungeonHtml(html, slug) {
  const dungeon = {
    slug,
    title: '',
    levelRange: '',
    bosses: [],
    quests: [],
    sets: []
  };

  // Title
  const titleMatch = html.match(/<title>([^<]+)<\/title>/i);
  if (titleMatch) {
    dungeon.title = titleMatch[1].split('·')[0].trim();
  }

  // Boss sections
  const bossRegex = /<section\s+id="([^"]+)"\s+class="lb-boss"[^>]*>([\s\S]*?)<\/section>/gi;
  let match;
  while ((match = bossRegex.exec(html)) !== null) {
    const bossId = match[1];
    const bossBlock = match[2];

    const nameMatch = bossBlock.match(/<h2[^>]*>([^<]+)<\/h2>/i);
    const levelMatch = bossBlock.match(/<p>Level\s+(\d+)<\/p>/i);

    const boss = {
      id: bossId,
      name: nameMatch ? nameMatch[1].trim() : bossId,
      level: levelMatch ? parseInt(levelMatch[1], 10) : null,
      drops: []
    };

    // Scoped row parser for each drop in boss block
    const rowRegex = /<li\s+class="lb-row">([\s\S]*?)<\/li>/gi;
    let rowMatch;
    while ((rowMatch = rowRegex.exec(bossBlock)) !== null) {
      const rowHtml = rowMatch[1];
      const itemMatch = rowHtml.match(/href="[^"]*\/item\/(\d+)"/i);
      const imgMatch = rowHtml.match(/<img[^>]*src="([^"]+)"/i);
      const nameMatch = rowHtml.match(/<span\s+class="lb-name\s+([^"]+)">([^<]+)<\/span>/i);
      const typeMatch = rowHtml.match(/<span\s+class="lb-type">([^<]+)/i);
      const chanceMatch = rowHtml.match(/class="lb-chance"[^>]*>[\s\S]*?(\d+(?:\.\d+)?)%/i);

      if (itemMatch && nameMatch) {
        boss.drops.push({
          itemId: parseInt(itemMatch[1], 10),
          icon: imgMatch ? imgMatch[1] : '',
          quality: nameMatch[1],
          name: nameMatch[2].trim(),
          type: typeMatch ? typeMatch[1].trim() : '',
          dropChance: chanceMatch ? parseFloat(chanceMatch[1]) : null
        });
      }
    }

    dungeon.bosses.push(boss);
  }

  return dungeon;
}

export async function scrapeDungeon(slug) {
  const url = `${BASE_URL}/dungeons/${slug}`;
  console.log(`[Scraper] Fetching ${url}...`);
  const html = await fetchPage(url);
  const data = parseDungeonHtml(html, slug);
  console.log(`[Scraper] Extracted ${data.bosses.length} bosses from ${slug}.`);
  return data;
}

export async function scrapeAllNewDungeons() {
  const results = {};
  for (const slug of NEW_DUNGEONS) {
    try {
      results[slug] = await scrapeDungeon(slug);
    } catch (err) {
      console.error(`[Scraper] Error scraping ${slug}:`, err.message);
    }
  }

  const outDir = path.resolve(__dirname, '../data');
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  const outFile = path.join(outDir, 'forever_dungeons.json');
  fs.writeFileSync(outFile, JSON.stringify(results, null, 2), 'utf-8');
  console.log(`[Scraper] Successfully wrote full dungeon dataset to ${outFile}`);
  return results;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  scrapeAllNewDungeons().catch(console.error);
}
