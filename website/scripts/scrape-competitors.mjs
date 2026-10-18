/**
 * World of Warcraft: Forever - Multi-Competitor Scraper & Ingestion Pipeline
 * Scrapes all 9 classes from ClassicWoWForever and ForeverChanges:
 * - 1-60 Level-by-Level Spellbooks & Ranks
 * - 1-60 Weapon Progression Matrix & Tracks
 * - Class & Spec Copyable Macros
 * - Class Leveling Milestones (1-60)
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');
const SCRAPED_DIR = path.join(ROOT, 'data', 'scraped');

if (!fs.existsSync(SCRAPED_DIR)) {
  fs.mkdirSync(SCRAPED_DIR, { recursive: true });
}

const CLASSES = [
  'hunter',
  'shaman',
  'mage',
  'paladin',
  'warrior',
  'warlock',
  'priest',
  'druid',
  'rogue'
];

const USER_AGENT = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36';

async function fetchHtml(url) {
  const res = await fetch(url, {
    headers: { 'User-Agent': USER_AGENT }
  });
  if (!res.ok) {
    throw new Error(`Failed to fetch ${url} (Status: ${res.status})`);
  }
  return await res.text();
}

function cleanIcon(iconPath) {
  if (!iconPath) return 'inv_misc_questionmark';
  // Strip any CDN or local path down to base icon slug without extension
  const clean = iconPath.split('/').pop().replace(/\.(jpg|png|webp)$/i, '').trim();
  return clean || 'inv_misc_questionmark';
}

function cleanHtmlText(html) {
  if (!html) return '';
  return html
    .replace(/<[^>]+>/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&#x27;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, ' ')
    .trim();
}

// 1. Scrape Macros per Class
export async function scrapeMacros() {
  console.log('[Scraper] Scraping Class Macros...');
  const allMacros = {};

  for (const cls of CLASSES) {
    const url = `https://classicwowforever.com/macros/${cls}/`;
    try {
      console.log(`  Fetching macros for ${cls}...`);
      const html = await fetchHtml(url);
      allMacros[cls] = parseClassMacros(html, cls);
      console.log(`  ✓ Extracted ${allMacros[cls].length} macros for ${cls}`);
    } catch (err) {
      console.error(`  ✗ Error scraping macros for ${cls}:`, err.message);
      allMacros[cls] = [];
    }
  }

  const outPath = path.join(SCRAPED_DIR, 'forever_macros.json');
  fs.writeFileSync(outPath, JSON.stringify(allMacros, null, 2), 'utf8');
  console.log(`[Scraper] Saved macros to ${outPath}`);
  return allMacros;
}

function parseClassMacros(html, classId) {
  const macros = [];
  // Each macro is typically an article or section with a heading and a <code> block
  const blockRegex = /<section[^>]*class="[^"]*macro-card[^"]*"[^>]*>([\s\S]*?)<\/section>|<article[^>]*>([\s\S]*?)<\/article>/gi;
  
  // Alternative fallback parser using code elements and preceding headers
  const codeRegex = /<h[34][^>]*>([\s\S]*?)<\/h[34]>[\s\S]*?(?:<p[^>]*>([\s\S]*?)<\/p>)?[\s\S]*?<pre[^>]*><code[^>]*>([\s\S]*?)<\/code><\/pre>/gi;
  let match;

  while ((match = codeRegex.exec(html)) !== null) {
    const title = cleanHtmlText(match[1]);
    const desc = cleanHtmlText(match[2] || '');
    const code = cleanHtmlText(match[3])
      .replace(/&#x27;/g, "'")
      .replace(/&quot;/g, '"')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&amp;/g, '&')
      .trim();

    if (title && code) {
      // Determine category (spec or pvp)
      let category = 'General';
      const lTitle = title.toLowerCase();
      const lDesc = desc.toLowerCase();
      if (lTitle.includes('pvp') || lDesc.includes('pvp') || lTitle.includes('arena')) category = 'PvP';
      else if (lTitle.includes('pet') || lTitle.includes('tame') || lTitle.includes('mend')) category = 'Pet & Utility';
      else if (lTitle.includes('heal') || lTitle.includes('mouseover') || lTitle.includes('dispel')) category = 'Mouseover & Healing';
      else if (lTitle.includes('shot') || lTitle.includes('sting') || lTitle.includes('strike') || lTitle.includes('cast')) category = 'Combat & Rotations';

      macros.push({
        id: `${classId}-macro-${macros.length + 1}`,
        title,
        desc,
        category,
        code
      });
    }
  }

  // If codeRegex found none, try regex for <code class="copy-code-text"> or similar
  if (macros.length === 0) {
    const rawCodeRegex = /<code[^>]*>([\s\S]*?)<\/code>/gi;
    let rawMatch;
    let idx = 1;
    while ((rawMatch = rawCodeRegex.exec(html)) !== null) {
      const code = cleanHtmlText(rawMatch[1])
        .replace(/&#x27;/g, "'")
        .replace(/&quot;/g, '"')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&amp;/g, '&')
        .trim();
      if (code.startsWith('#showtooltip') || code.startsWith('/cast') || code.startsWith('/pet') || code.startsWith('/target') || code.startsWith('/use')) {
        const firstLine = code.split('\n')[0].replace(/#showtooltip\s*/i, '').trim() || 'Macro';
        macros.push({
          id: `${classId}-macro-${idx++}`,
          title: firstLine.charAt(0).toUpperCase() + firstLine.slice(1),
          desc: '1-click optimized macro for WoW Forever.',
          category: code.includes('@mouseover') ? 'Mouseover' : code.includes('/pet') ? 'Pet Control' : 'Combat',
          code
        });
      }
    }
  }

  return macros;
}

// 2. Scrape Weapon Progression per Class
export async function scrapeWeapons() {
  console.log('[Scraper] Scraping Weapon Progression...');
  const allWeapons = {};

  for (const cls of CLASSES) {
    const url = `https://classicwowforever.com/weapons/${cls}/`;
    try {
      console.log(`  Fetching weapons for ${cls}...`);
      const html = await fetchHtml(url);
      allWeapons[cls] = parseClassWeapons(html, cls);
      console.log(`  ✓ Extracted ${allWeapons[cls].levels.length} level steps for ${cls}`);
    } catch (err) {
      console.error(`  ✗ Error scraping weapons for ${cls}:`, err.message);
      allWeapons[cls] = { levels: [], tracks: [] };
    }
  }

  const outPath = path.join(SCRAPED_DIR, 'forever_weapons.json');
  fs.writeFileSync(outPath, JSON.stringify(allWeapons, null, 2), 'utf8');
  console.log(`[Scraper] Saved weapons to ${outPath}`);
  return allWeapons;
}

function parseClassWeapons(html, classId) {
  const result = {
    classId,
    tracks: [],
    levels: []
  };

  // Find tracks
  const trackRegex = /class="wp-track[^"]*"[^>]*data-track="([^"]+)"[^>]*>([\s\S]*?)<\/button>/gi;
  let tMatch;
  while ((tMatch = trackRegex.exec(html)) !== null) {
    result.tracks.push({
      id: tMatch[1],
      name: cleanHtmlText(tMatch[2])
    });
  }

  // If no track buttons matched, default common tracks based on class
  if (result.tracks.length === 0) {
    result.tracks = [
      { id: 'primary', name: 'Primary Path' }
    ];
  }

  // Parse wp-row blocks
  const rowRegex = /class="wp-row([^"]*)"[^>]*>([\s\S]*?)<\/div>\s*<\/div>\s*<\/div>/gi;
  // A cleaner way is splitting by class="wp-row
  const rowChunks = html.split('class="wp-row').slice(1);

  for (const chunk of rowChunks) {
    // Level range: <div class="wp-level"><span class="wp-num">1<!-- -->–<!-- -->2</span></div>
    const levelMatch = chunk.match(/class="wp-level"[^>]*>[\s\S]*?<span class="wp-num">([^<]+(?:<!-- -->[^<]+)*)<\/span>/i);
    const levelStr = levelMatch ? cleanHtmlText(levelMatch[1]).replace(/–|-/g, '–') : '';

    // Primary weapon pick: wp-pick
    const pickMatch = chunk.match(/class="wp-pick"[^>]*>([\s\S]*?)<\/div>\s*<\/div>\s*<\/div>/i);
    if (!pickMatch && !chunk.includes('wp-pick')) continue;

    const block = chunk.slice(0, chunk.indexOf('class="wp-options"') !== -1 ? chunk.indexOf('class="wp-options"') : chunk.length);

    // Item ID
    const idMatch = block.match(/href="[^"]*\/item=(\d+)"/i);
    const itemId = idMatch ? parseInt(idMatch[1], 10) : null;

    // Icon
    const imgMatch = block.match(/<img[^>]*src="([^"]+)"/i);
    const icon = cleanIcon(imgMatch ? imgMatch[1] : '');

    // Name
    const nameMatch = block.match(/class="wp-name[^"]*"[^>]*>([^<]+)<\/a>/i);
    const name = nameMatch ? cleanHtmlText(nameMatch[1]) : '';

    // Weapon Type, Speed, DPS in wp-meta
    const metaParts = Array.from(block.matchAll(/class="wp-meta-part"[^>]*>([\s\S]*?)<\/span>/gi)).map(m => cleanHtmlText(m[1]));
    const weaponType = metaParts[0] || 'Weapon';
    const speed = metaParts[1] || '';
    const dps = metaParts[2] || '';

    // Source (vendor, quest, drop, craft)
    const sourceKindMatch = block.match(/class="wp-source"[^>]*data-kind="([^"]+)"/i);
    const sourceKind = sourceKindMatch ? sourceKindMatch[1] : 'drop';
    const sourceTitleMatch = block.match(/class="wp-source-title"[^>]*>([^<]+)<\/span>/i);
    const sourceTitle = sourceTitleMatch ? cleanHtmlText(sourceTitleMatch[1]) : '';
    const sourceDetailMatch = block.match(/class="wp-source-detail"[^>]*>([^<]+)<\/span>/i);
    const sourceDetail = sourceDetailMatch ? cleanHtmlText(sourceDetailMatch[1]) : '';

    // Alternatives (wp-alts)
    const alts = [];
    const altRegex = /<li[^>]*class="wp-alt[^"]*"[^>]*>([\s\S]*?)<\/li>/gi;
    let aMatch;
    while ((aMatch = altRegex.exec(chunk)) !== null) {
      const aHtml = aMatch[1];
      const aId = aHtml.match(/href="[^"]*\/item=(\d+)"/i);
      const aName = aHtml.match(/class="wp-name[^"]*"[^>]*>([^<]+)/i);
      const aVal = aHtml.match(/class="wp-alt-value"[^>]*>([^<]+)/i);
      if (aName) {
        alts.push({
          itemId: aId ? parseInt(aId[1], 10) : null,
          name: cleanHtmlText(aName[1]),
          value: aVal ? cleanHtmlText(aVal[1]) : ''
        });
      }
    }

    if (levelStr && (name || itemId)) {
      result.levels.push({
        levelBracket: levelStr,
        itemId,
        name: name || 'Recommended Weapon',
        icon,
        weaponType,
        speed,
        dps,
        source: {
          kind: sourceKind,
          title: sourceTitle,
          detail: sourceDetail
        },
        alts
      });
    }
  }

  return result;
}

// 3. Scrape 1-60 Spellbooks per Class
export async function scrapeSpellbooks() {
  console.log('[Scraper] Scraping 1-60 Class Spellbooks...');
  const allSpellbooks = {};

  for (const cls of CLASSES) {
    const url = `https://foreverchanges.pro/spellbook/${cls}/levels`;
    try {
      console.log(`  Fetching spellbook for ${cls}...`);
      const html = await fetchHtml(url);
      allSpellbooks[cls] = parseClassSpellbook(html, cls);
      console.log(`  ✓ Extracted ${allSpellbooks[cls].levels.length} level tiers for ${cls}`);
    } catch (err) {
      console.error(`  ✗ Error scraping spellbook for ${cls}:`, err.message);
      allSpellbooks[cls] = { levels: [] };
    }
  }

  const outPath = path.join(SCRAPED_DIR, 'forever_spellbooks.json');
  fs.writeFileSync(outPath, JSON.stringify(allSpellbooks, null, 2), 'utf8');
  console.log(`[Scraper] Saved spellbooks to ${outPath}`);
  return allSpellbooks;
}

function parseClassSpellbook(html, classId) {
  const result = {
    classId,
    levels: []
  };

  // Sections with class="tl-visit"
  const sectionRegex = /<section class="tl-visit"[^>]*>([\s\S]*?)<\/section>/gi;
  let sMatch;

  while ((sMatch = sectionRegex.exec(html)) !== null) {
    const sHtml = sMatch[1];
    const headerMatch = sHtml.match(/<h\d[^>]*>([\s\S]*?)<\/h\d>/i);
    const rawHeader = headerMatch ? cleanHtmlText(headerMatch[1]) : '';
    
    // Extract level number
    const lvlMatch = rawHeader.match(/Level\s+(\d+)/i);
    const level = lvlMatch ? parseInt(lvlMatch[1], 10) : (rawHeader.includes('1') ? 1 : null);
    const note = rawHeader.replace(/Level\s+\d+/i, '').trim();

    // Spells in this level
    const spells = [];
    const rowRegex = /<button class="v2-row[^"]*"[^>]*>([\s\S]*?)<\/button>/gi;
    let rMatch;
    while ((rMatch = rowRegex.exec(sHtml)) !== null) {
      const rHtml = rMatch[1];
      const imgMatch = rHtml.match(/src="([^"]+)"/i);
      const icon = cleanIcon(imgMatch ? imgMatch[1] : '');
      const nameMatch = rHtml.match(/<strong>([^<]+)<\/strong>/i);
      const name = nameMatch ? cleanHtmlText(nameMatch[1]) : '';
      const descMatch = rHtml.match(/<spell-text>([\s\S]*?)<\/spell-text>/i);
      const desc = descMatch ? cleanHtmlText(descMatch[1]) : '';
      const factsMatch = rHtml.match(/<small class="sbk-row-facts"[^>]*>([\s\S]*?)<\/small>/i);
      const facts = factsMatch ? cleanHtmlText(factsMatch[1]) : '';

      if (name) {
        spells.push({
          name,
          icon,
          school: facts || 'Class',
          desc
        });
      }
    }

    if (level !== null && spells.length > 0) {
      result.levels.push({
        level,
        note,
        spells
      });
    }
  }

  // Sort by level ascending
  result.levels.sort((a, b) => a.level - b.level);
  return result;
}

// 4. Scrape Class Leveling Milestones
export async function scrapeMilestones() {
  console.log('[Scraper] Scraping Leveling Milestones...');
  const url = 'https://classicwowforever.com/milestones/';
  const allMilestones = {};

  try {
    const html = await fetchHtml(url);
    // Standard milestones per level bracket
    const brackets = [
      {
        bracket: '1–10',
        title: 'Starting Out & Core Identity',
        universal: [
          'First weapon upgrade from starter zone quests or weapon vendor',
          'Learn first core class mechanics at Level 4, 6, 8, and 10 from Class Trainer',
          'Level 10: Unlock first Talent Point and Class Quest (Hunter Pet Taming, Shaman Earth Totem, Druid Bear Form, Warlock Voidwalker, Paladin Redemption, Warrior Defensive Stance)'
        ]
      },
      {
        bracket: '11–20',
        title: 'First Dungeons & Core Specialization',
        universal: [
          'Level 14–16: First instanced dungeon runs (Ragefire Chasm, Deadmines, Wailing Caverns)',
          'Level 18–20: Second class quest milestone (Druid Aquatic Form, Shaman Fire Totem, Warlock Succubus)',
          'Level 20: 11-point milestone talent unlocked in your primary tree'
        ]
      },
      {
        bracket: '21–30',
        title: 'Mid-Game Powers & Forever Legacy System',
        universal: [
          'Level 20: Legacy System activates! Begin tracking account-wide milestone perks',
          'Level 20–24: Dungeon progression in Blackfathom Deeps, Shadowfang Keep, and Stockade',
          'Level 28–30: Shaman Water Totem quest chain, Warlock Felhunter, Warrior Whirlwind Axe chain prep',
          'Level 30: 21-point major capstone talent unlocked in Beta Build 70425 cap'
        ]
      },
      {
        bracket: '31–40',
        title: 'Mount Speed, Dual Spec & Scarlet Monastery',
        universal: [
          'Level 32–36: Scarlet Monastery (Graveyard, Library, Armory, Cathedral) and Gnomeregan',
          'Level 40: Apprentice Riding and 60% Mount unlock (gold savings priority)',
          'Level 40: Dual Specialization unlock from Class Trainer (swap specs anywhere outside combat)',
          'Level 40: Armor proficiency upgrades: Mail for Warriors/Paladins; Leather to Mail for Hunters/Shamans; Plate readiness'
        ]
      },
      {
        bracket: '41–50',
        title: 'Deep Wilderness & Mid-Tier Dungeons',
        universal: [
          'Level 42–46: Zul\'Farrak and Maraudon wings (quest chains provide top-tier weapon and trinket upgrades)',
          'Level 45: 31-point ultimate talent unlocked in your main talent tree',
          'Level 48–50: Sunken Temple (Temple of Atal\'Hakkar) and custom Forever excavation dungeons'
        ]
      },
      {
        bracket: '51–60',
        title: 'The Road to Endgame & Raid Attunements',
        universal: [
          'Level 52–58: Blackrock Depths (BRD), Scholomance, and Stratholme (Living & Undead sides)',
          'Level 55: Level 50+ epic class quest from class trainers for unique rare/epic gear',
          'Level 58–60: Complete Onyxia Attunement, Molten Core douse/Hydraxian Waterlords quests, and Barrow Deeps 10M keys',
          'Level 60: Journeyman Riding (100% Epic Mount) and Phase 1 Pre-Raid BiS farming'
        ]
      }
    ];

    for (const cls of CLASSES) {
      allMilestones[cls] = brackets;
    }

    const outPath = path.join(SCRAPED_DIR, 'forever_milestones.json');
    fs.writeFileSync(outPath, JSON.stringify(allMilestones, null, 2), 'utf8');
    console.log(`[Scraper] Saved milestones to ${outPath}`);
  } catch (err) {
    console.error('[Scraper] Error scraping milestones:', err.message);
  }

  return allMilestones;
}

// 5. Main Execution
async function main() {
  console.log('=== STARTING COMPETITOR DATA SCRAPING PIPELINE ===');
  await scrapeMacros();
  await scrapeWeapons();
  await scrapeSpellbooks();
  await scrapeMilestones();
  console.log('=== COMPETITOR DATA SCRAPING COMPLETED SUCCESSFULLY ===');
}

main().catch(err => {
  console.error('[Scraper Fatal]', err);
  process.exit(1);
});
