import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');

const dungeonsConfig = [
  {
    slug: 'ragefire-chasm',
    id: 'guide-dungeon-ragefire-chasm',
    title: 'Ragefire Chasm: Full Dungeon Guide & Boss Tactics',
    icon: 'https://render.worldofwarcraft.com/us/icons/56/spell_fire_fire.jpg',
    levelMin: 13,
    levelMax: 18,
    optimalLevel: 15,
    faction: 'Horde',
    zone: 'Orgrimmar (Cleft of Shadow)',
    coords: '50.1, 52.4',
    type: 'classic',
    summary: 'Complete encounter walkthrough, Burning Blade trash priorities, boss mechanics, and Horde-only quest routing for Levels 13–18.'
  },
  {
    slug: 'the-stockade',
    id: 'guide-dungeon-the-stockade',
    title: 'The Stockade: Full Dungeon Guide & Boss Tactics',
    icon: 'https://render.worldofwarcraft.com/us/icons/56/inv_misc_key_03.jpg',
    levelMin: 22,
    levelMax: 30,
    optimalLevel: 25,
    faction: 'Alliance',
    zone: 'Stormwind City (Mage Quarter canal)',
    coords: '40.6, 65.4',
    type: 'classic',
    summary: 'Riot suppression tactics, Defias cell pull strategies, all 6 boss mechanics including Bruegal Ironknuckle, and Alliance quest turn-ins.'
  },
  {
    slug: 'the-deadmines',
    id: 'guide-dungeon-the-deadmines',
    title: 'The Deadmines: Full Dungeon Guide & Defias Overhaul',
    icon: 'https://render.worldofwarcraft.com/us/icons/56/inv_helmet_46.jpg',
    levelMin: 17,
    levelMax: 26,
    optimalLevel: 20,
    faction: 'Alliance',
    zone: 'Westfall (Moonbrook Catacombs)',
    coords: '42.6, 72.2',
    type: 'classic',
    summary: 'Full subterranean foundry walkthrough, Goblin Woodcarver CC, cannon blast event, and all 8 boss strategies culminating in Edwin VanCleef.'
  },
  {
    slug: 'wailing-caverns',
    id: 'guide-dungeon-wailing-caverns',
    title: 'Wailing Caverns: Full Dungeon Guide & Fang Walkthrough',
    icon: 'https://render.worldofwarcraft.com/us/icons/56/inv_misc_monsterfang_01.jpg',
    levelMin: 17,
    levelMax: 24,
    optimalLevel: 20,
    faction: 'Both',
    zone: 'Northern Barrens (Forgotten Pools Cave)',
    coords: '42.2, 38.6',
    type: 'classic',
    summary: 'Labyrinth routing map, Deviate trash interrupts, Disciple escort strategy, and all 9 bosses including Verdan the Everliving and Mutanus.'
  },
  {
    slug: 'shadowfang-keep',
    id: 'guide-dungeon-shadowfang-keep',
    title: 'Shadowfang Keep: Full Dungeon Guide & Worgen Encounters',
    icon: 'https://render.worldofwarcraft.com/us/icons/56/spell_shadow_haunting.jpg',
    levelMin: 22,
    levelMax: 30,
    optimalLevel: 24,
    faction: 'Both',
    zone: 'Silverpine Forest (South of The Sepulcher)',
    coords: '44.8, 67.8',
    type: 'classic',
    summary: 'Courtyard gate mechanics, Son of Arugal avoidance, curse and disease dispels, and all 9 boss strategies leading to Archmage Arugal.'
  },
  {
    slug: 'blackfathom-deeps',
    id: 'guide-dungeon-blackfathom-deeps',
    title: 'Blackfathom Deeps: Full Dungeon Guide & Twilight Cult Tactics',
    icon: 'https://render.worldofwarcraft.com/us/icons/56/inv_misc_monsterscales_07.jpg',
    levelMin: 24,
    levelMax: 32,
    optimalLevel: 26,
    faction: 'Both',
    zone: 'Ashenvale (Zoram Strand Coastline)',
    coords: '14.2, 14.4',
    type: 'classic',
    summary: 'Submerged ruins navigation, brazier lighting event, Shadow protection recommendations, and all 6 bosses culminating in Aku\'mai.'
  },
  {
    slug: 'hall-of-thanes',
    id: 'guide-hall-of-thanes',
    title: 'New Dungeon: Hall of the Thanes (Deep Ironforge Catacombs)',
    icon: 'https://render.worldofwarcraft.com/us/icons/56/inv_hammer_16.jpg',
    levelMin: 13,
    levelMax: 18,
    optimalLevel: 15,
    faction: 'Both',
    zone: 'Old Ironforge (Under the High Seat)',
    coords: 'High Seat Catacomb Seal',
    type: 'custom',
    summary: 'Brand-new Classic+ dungeon walkthrough: Dark Iron delve, magma elementals, secret treasure vaults, and 4 custom boss encounters.'
  },
  {
    slug: 'ruins-of-lordaeron',
    id: 'guide-ruins-of-lordaeron',
    title: 'New Dungeon: Ruins of Lordaeron (Capital City & Royal Crypts)',
    icon: 'https://render.worldofwarcraft.com/us/icons/56/spell_deathknight_strangulate.jpg',
    levelMin: 15,
    levelMax: 20,
    optimalLevel: 17,
    faction: 'Both',
    zone: 'Tirisfal Glades (Under the Royal Throne Room)',
    coords: 'Undercity Entrance Courtyard',
    type: 'custom',
    summary: 'Brand-new Classic+ dungeon walkthrough: Kings Alley spider packs, Royal Crypt crypt-fiends, and 6 custom undead bosses.'
  },
  {
    slug: 'excavation-site-wetlands',
    id: 'guide-excavation-site',
    title: 'New Dungeon: Excavation Site 4 Full Walkthrough',
    icon: 'https://render.worldofwarcraft.com/us/icons/56/inv_misc_bone_06.jpg',
    levelMin: 26,
    levelMax: 31,
    optimalLevel: 28,
    faction: 'Both',
    zone: 'Wetlands (Whelgar\'s Excavation Cliff)',
    coords: '34.8, 47.2',
    type: 'custom',
    summary: 'Brand-new Classic+ dungeon walkthrough: Marsh crocolisks, Dragonmaw thaumaturgists, Titan relics, and 4 custom boss encounters.'
  },
  {
    slug: 'city-of-dalaran',
    id: 'guide-city-of-dalaran',
    title: 'New Dungeon: City of Dalaran (Underbelly & Violet Enclave)',
    icon: 'https://render.worldofwarcraft.com/us/icons/56/inv_misc_book_09.jpg',
    levelMin: 28,
    levelMax: 34,
    optimalLevel: 30,
    faction: 'Both',
    zone: 'Alterac Mountains / Silverpine Border',
    coords: 'Dalaran Purple Dome Breach',
    type: 'custom',
    summary: 'Brand-new Classic+ dungeon walkthrough: Alliance & Horde attunement chains, Sewer Key, Tome of Dalaran secret summon, and 8 arcane bosses.'
  }
];

const scratchDir = 'C:/Users/marco/.gemini/antigravity/brain/36315a22-a155-4a5f-b1d2-7fc209310dbd/scratch';
const imagesBaseDir = path.join(ROOT, 'images', 'dungeons');

async function downloadFile(url, destPath) {
  if (fs.existsSync(destPath) && fs.statSync(destPath).size > 0) {
    return;
  }
  try {
    const res = await fetch(url);
    if (!res.ok) {
      console.error(`Failed ${url}: ${res.status}`);
      return;
    }
    const buf = Buffer.from(await res.arrayBuffer());
    fs.writeFileSync(destPath, buf);
  } catch (e) {
    console.error(`Failed ${url}:`, e.message);
  }
}

function slugify(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

function cleanHtmlText(html) {
  if (!html) return '';
  return html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
}

function formatItemTitle(url) {
  const match = url.match(/item=(\d+)(?:\/([^"'\s]+))?/);
  if (!match) return 'Notable Item';
  const rawSlug = match[2] || '';
  if (!rawSlug) return `Item #${match[1]}`;
  return rawSlug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}

async function processAll() {
  const generatedGuides = [];

  for (const cfg of dungeonsConfig) {
    const slug = cfg.slug;
    const dungeonDir = path.join(imagesBaseDir, slug);
    if (!fs.existsSync(dungeonDir)) {
      fs.mkdirSync(dungeonDir, { recursive: true });
    }

    const html = fs.readFileSync(path.join(scratchDir, `${slug}.html`), 'utf8');

    // 1. Intro & Overview
    const introMatch = html.match(/id="introduction"[\s\S]*?<div class="section-content">([\s\S]*?)<\/div>\s*<\/div>/i);
    const introText = introMatch ? cleanHtmlText(introMatch[1]) : cfg.summary;

    // 2. Location
    const locMatch = html.match(/id="location"[\s\S]*?<div class="section-content">([\s\S]*?)<\/div>\s*<\/div>/i);
    const locText = locMatch ? cleanHtmlText(locMatch[1]) : '';
    const locImgs = locMatch ? [...locMatch[1].matchAll(/<img[^>]+src=["']([^"']+)["']/gi)].map(m => m[1]) : [];
    const localEntranceImgs = [];
    for (let i = 0; i < locImgs.length; i++) {
      let u = locImgs[i];
      if (u.startsWith('/')) u = 'https://www.method.gg' + u;
      const ext = path.extname(u.split('?')[0]) || '.jpg';
      const filename = `entrance-${i + 1}${ext}`;
      const dest = path.join(dungeonDir, filename);
      await downloadFile(u, dest);
      localEntranceImgs.push(`images/dungeons/${slug}/${filename}`);
    }

    // 3. Dungeon Maps
    const mapMatch = html.match(/id="dungeon-map"[\s\S]*?<div class="section-content">([\s\S]*?)<\/div>\s*<\/div>/i);
    const mapImgs = mapMatch ? [...mapMatch[1].matchAll(/<img[^>]+src=["']([^"']+)["']/gi)].map(m => m[1]) : [];
    const localMapImgs = [];
    for (let i = 0; i < mapImgs.length; i++) {
      let u = mapImgs[i];
      if (u.startsWith('/')) u = 'https://www.method.gg' + u;
      const ext = path.extname(u.split('?')[0]) || '.png';
      const filename = `map-${i + 1}${ext}`;
      const dest = path.join(dungeonDir, filename);
      await downloadFile(u, dest);
      localMapImgs.push(`images/dungeons/${slug}/${filename}`);
    }

    // 4. Quests & Attunements
    const questRows = [];
    const questsSectionMatch = html.match(/id="dungeon-quests[^"]*"[\s\S]*?(?=<div id="dungeon-map"|<div id="important-trash"|<div id="bosses"|$)/i);
    if (questsSectionMatch) {
      const qSection = questsSectionMatch[0];
      const tableMatches = [...qSection.matchAll(/<table[^>]*>([\s\S]*?)<\/table>/gi)];
      for (const t of tableMatches) {
        const trs = [...t[1].matchAll(/<tr[^>]*>([\s\S]*?)<\/tr>/gi)].slice(1);
        for (const tr of trs) {
          const tds = [...tr[1].matchAll(/<td[^>]*>([\s\S]*?)<\/td>/gi)].map(td => td[1].trim());
          if (tds.length >= 3) {
            const name = cleanHtmlText(tds[0]);
            const linkMatch = tds[0].match(/href=["']([^"']+)["']/);
            const link = linkMatch ? linkMatch[1] : '';
            const faction = tds.length >= 4 ? cleanHtmlText(tds[1]) : cfg.faction;
            const level = tds.length >= 4 ? cleanHtmlText(tds[2]) : cleanHtmlText(tds[1]);
            const location = tds.length >= 4 ? cleanHtmlText(tds[3]) : cleanHtmlText(tds[2]);
            if (name && !name.toLowerCase().includes('quest')) {
              questRows.push({ name, link, faction, level, location });
            }
          }
        }
      }
    }

    // 5. Important Trash Mobs
    const trashMobs = [];
    const trashSectionMatch = html.match(/id="important-trash"[\s\S]*?<div class="section-mobs">([\s\S]*?)<\/div>\s*<\/div>\s*<\/div>/i);
    if (trashSectionMatch) {
      const mobTiles = [...trashSectionMatch[1].matchAll(/<div class="mob-tile\s*">([\s\S]*?)(?=<div class="mob-tile\s*"|$)/gi)];
      for (const tile of mobTiles) {
        const nameMatch = tile[1].match(/<h3 class="mob-name">([\s\S]*?)<\/h3>/i);
        const name = nameMatch ? cleanHtmlText(nameMatch[1]) : '';
        const infoMatch = tile[1].match(/<div class="mob-info">([\s\S]*?)<\/div>/i);
        const bullets = infoMatch ? [...infoMatch[1].matchAll(/<li[^>]*>([\s\S]*?)<\/li>/gi)].map(li => cleanHtmlText(li[1])) : [];
        const imgMatch = tile[1].match(/<img[^>]+src=["']([^"']+)["']/i);
        let localImg = '';
        if (imgMatch) {
          let u = imgMatch[1];
          if (u.startsWith('/')) u = 'https://www.method.gg' + u;
          const ext = path.extname(u.split('?')[0]) || '.jpg';
          const filename = `trash-${slugify(name)}${ext}`;
          const dest = path.join(dungeonDir, filename);
          await downloadFile(u, dest);
          localImg = `images/dungeons/${slug}/${filename}`;
        }
        if (name) {
          trashMobs.push({ name, bullets, img: localImg });
        }
      }
    }

    // 6. Bosses with Verbatim Tactics
    const bosses = [];
    const bossesStart = html.indexOf('id="bosses"');
    const lootStart = html.indexOf('id="dungeon-loot"');
    const bossesSection = bossesStart !== -1 ? (lootStart !== -1 ? html.substring(bossesStart, lootStart) : html.substring(bossesStart)) : '';
    const bossPanes = bossesSection.split(/<div role="tabpanel"/i).slice(1);

    for (let i = 0; i < bossPanes.length; i++) {
      const pane = bossPanes[i];
      const nameMatch = pane.match(/<h3 class="mob-name">([\s\S]*?)<\/h3>/i);
      const name = nameMatch ? cleanHtmlText(nameMatch[1]) : `Boss ${i + 1}`;
      
      const infoMatch = pane.match(/<div class="mob-info">([\s\S]*?)<\/div>/i);
      let stratText = '';
      if (infoMatch) {
        stratText = infoMatch[1]
          .replace(/<p>/gi, '')
          .replace(/<\/p>/gi, '\n\n')
          .replace(/<a[^>]+href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi, (m, u, txt) => `**${cleanHtmlText(txt)}**`)
          .replace(/<[^>]+>/g, ' ')
          .replace(/[ \t]+/g, ' ')
          .trim();
      }

      const imgMatch = pane.match(/<img[^>]+src=["']([^"']+)["']/i);
      let localImg = '';
      if (imgMatch) {
        let u = imgMatch[1];
        if (u.startsWith('/')) u = 'https://www.method.gg' + u;
        const ext = path.extname(u.split('?')[0]) || '.jpg';
        const filename = `boss-${slugify(name)}${ext}`;
        const dest = path.join(dungeonDir, filename);
        await downloadFile(u, dest);
        localImg = `images/dungeons/${slug}/${filename}`;
      }

      bosses.push({ index: i + 1, name, strat: stratText, img: localImg });
    }

    // 7. Loot Tables
    const lootTables = [];
    const lootSection = lootStart !== -1 ? html.substring(lootStart) : '';
    const lootPanes = lootSection.split(/<div role="tabpanel"/i).slice(1);

    for (const pane of lootPanes) {
      const nameMatch = pane.match(/<h3 class="mob-name">([\s\S]*?)<\/h3>/i);
      const bossName = nameMatch ? cleanHtmlText(nameMatch[1]).replace(/\s+Loot$/i, '') : 'Boss Drops';
      const items = [];
      const trs = [...pane.matchAll(/<tr>([\s\S]*?)<\/tr>/gi)].slice(1);
      for (const tr of trs) {
        const tds = [...tr[1].matchAll(/<td[^>]*>([\s\S]*?)<\/td>/gi)].map(td => td[1].trim());
        if (tds.length >= 2) {
          const type = cleanHtmlText(tds[0]);
          const linkMatch = tds[1].match(/href=["']([^"']+)["']/);
          const link = linkMatch ? linkMatch[1] : '';
          const itemName = formatItemTitle(link);
          items.push({ type, name: itemName, link });
        }
      }
      if (items.length > 0) {
        lootTables.push({ boss: bossName, items });
      }
    }

    // SPECIAL ATTUNEMENT HANDLING FOR DALARAN
    let attunementMarkdown = '';
    if (slug === 'city-of-dalaran') {
      attunementMarkdown = `### Key to the Dalaran Sewers Attunement & Secret Boss

To access the City of Dalaran dungeon, party members require the **Dalaran Sewer Key**:

| Faction | Attunement Route | Step-by-Step Instructions |
|---|---|---|
| **Alliance** | Southshore Town Hall | Speak with **Emissary Jacques** in Southshore (\`50.8, 56.4\`) to receive *An Alarming Request*, which leads directly to **Archmage Modera** outside the dungeon entrance for *Heart of Disruption* and your key. |
| **Horde** | Tarren Mill to Alterac | Speak with **Magus Wordeen Voidglare** in Tarren Mill (\`61.4, 19.8\`) to start the multi-part arcane attunement chain recovering residual focus crystals across Alterac Mountains. |

💡 **Secret Encounter: Lyn the Ignored**  
Carrying the **Tome of Dalaran** through the Violet Enclave allows your group to interact with the discarded pedestal in the archives, summoning the optional arcane shade boss **Lyn the Ignored** for bonus high-tier caster loot!

---

`;
    }

    // BUILD THE FORMATTED MARKDOWN & UI CONTENT
    let content = `### Overview: ${cfg.title.split(':')[0].trim()}\n\n`;
    content += `${introText}\n\n`;

    content += `| Parameter | Dungeon Profile |\n`;
    content += `|---|---|\n`;
    content += `| **Level Range** | ${cfg.levelMin}–${cfg.levelMax} (Optimal: ${cfg.optimalLevel}) |\n`;
    content += `| **Zone & Entrance** | ${cfg.zone} (\`${cfg.coords}\`) |\n`;
    content += `| **Faction** | ${cfg.faction === 'Both' ? 'Alliance & Horde' : cfg.faction} (Accessible to Undead Paladins) |\n`;
    content += `| **Boss Encounters** | ${bosses.length} Encounters |\n`;
    content += `| **Dungeon Quests** | ${questRows.length} Total Quests |\n\n`;

    content += `---\n\n`;

    // Attunement if present
    if (attunementMarkdown) {
      content += attunementMarkdown;
    }

    // Location & Entrance
    content += `### Location & Dungeon Entrance\n\n`;
    content += `${locText}\n\n`;
    if (localEntranceImgs.length > 0) {
      content += `<div class="dungeon-images-grid">\n`;
      localEntranceImgs.forEach((src, idx) => {
        content += `  <figure class="dungeon-media-figure">\n`;
        content += `    <img src="${src}" alt="${cfg.title} Entrance ${idx + 1}" class="dungeon-media-img" loading="lazy" />\n`;
        content += `    <figcaption class="dungeon-media-caption">📍 Entrance & Access Point ${idx + 1}</figcaption>\n`;
        content += `  </figure>\n`;
      });
      content += `</div>\n\n`;
    }

    // Maps
    if (localMapImgs.length > 0) {
      content += `### Dungeon Map & Boss Route\n\n`;
      content += `<div class="dungeon-map-grid">\n`;
      localMapImgs.forEach((src, idx) => {
        content += `  <figure class="dungeon-media-figure">\n`;
        content += `    <img src="${src}" alt="${cfg.title} Layout Map ${idx + 1}" class="dungeon-media-img map-img" loading="lazy" />\n`;
        content += `    <figcaption class="dungeon-media-caption">🗺️ Instance Map & Navigation Route (Floor ${idx + 1})</figcaption>\n`;
        content += `  </figure>\n`;
      });
      content += `</div>\n\n`;
    }

    // Quests Table
    if (questRows.length > 0) {
      content += `### Dungeon Quests & Prerequisites\n\n`;
      content += `Gather these quests before entering to maximize your single-run leveling yield:\n\n`;
      content += `| Quest | Faction | Req Lvl | Quest-Giver & Location |\n`;
      content += `|---|---|---|---|\n`;
      questRows.forEach(q => {
        content += `| [${q.name}](${q.link}) | ${q.faction} | ${q.level} | ${q.location} |\n`;
      });
      content += `\n---\n\n`;
    }

    // Important Trash Mobs
    if (trashMobs.length > 0) {
      content += `### Important Trash Mechanics & Priority Targets\n\n`;
      content += `Heed these priority CC and interrupt recommendations to ensure smooth pulls:\n\n`;
      trashMobs.forEach(mob => {
        content += `<div class="dungeon-trash-card">\n`;
        if (mob.img) {
          content += `  <img src="${mob.img}" alt="${mob.name}" class="dungeon-trash-thumb" loading="lazy" />\n`;
        }
        content += `  <div class="dungeon-trash-content">\n`;
        content += `    <h4 class="dungeon-trash-title">⚠️ Priority: ${mob.name}</h4>\n`;
        if (mob.bullets.length > 0) {
          content += `    <ul class="guide-bullet-list">\n`;
          mob.bullets.forEach(b => {
            content += `      <li>${b}</li>\n`;
          });
          content += `    </ul>\n`;
        }
        content += `  </div>\n`;
        content += `</div>\n\n`;
      });
      content += `---\n\n`;
    }

    // Boss Tactics (VERBATIM STRATS)
    content += `### Boss Encounters & Verbatim Strategies\n\n`;
    bosses.forEach(b => {
      content += `#### ${b.index}. ${b.name}\n\n`;
      content += `<div class="dungeon-boss-card">\n`;
      if (b.img) {
        content += `  <img src="${b.img}" alt="${b.name}" class="dungeon-boss-portrait" loading="lazy" />\n`;
      }
      content += `  <div class="dungeon-boss-content">\n`;
      content += `    <div class="dungeon-boss-badge">Encounter ${b.index} of ${bosses.length}</div>\n`;
      content += `    <h4 class="dungeon-boss-title">${b.name}</h4>\n`;
      content += `    <div class="dungeon-boss-tactics">\n`;
      // Insert verbatim tactics
      b.strat.split('\n\n').forEach(p => {
        if (p.trim()) {
          content += `      <p class="guide-paragraph">${p.trim()}</p>\n`;
        }
      });
      content += `    </div>\n`;
      content += `  </div>\n`;
      content += `</div>\n\n`;
    });

    // Loot Tables
    if (lootTables.length > 0) {
      content += `### Notable Dungeon Drops & Loot Matrix\n\n`;
      lootTables.forEach(lt => {
        content += `#### Drops from ${lt.boss}\n\n`;
        content += `| Item Slot / Type | Drop Item | Boss |\n`;
        content += `|---|---|---|\n`;
        lt.items.forEach(it => {
          content += `| ${it.type} | [${it.name}](${it.link}) | ${lt.boss} |\n`;
        });
        content += `\n`;
      });
    }

    generatedGuides.push({
      id: cfg.id,
      title: cfg.title,
      category: 'Dungeons & Raids',
      source: 'Method.gg · Wowhead · Classic+',
      icon: cfg.icon,
      summary: cfg.summary,
      dungeonMeta: {
        slug: cfg.slug,
        levelMin: cfg.levelMin,
        levelMax: cfg.levelMax,
        optimalLevel: cfg.optimalLevel,
        faction: cfg.faction,
        zone: cfg.zone,
        coords: cfg.coords,
        bossCount: bosses.length,
        type: cfg.type
      },
      content: content.trim()
    });

    console.log(`Successfully generated guide for [${cfg.slug}]: ${bosses.length} bosses, ${questRows.length} quests, ${lootTables.length} loot tables.`);
  }

  // Write out to js/data/dungeons-data.js
  const fileContent = `/**
 * World of Warcraft: Forever - Curated Dungeon Guides Dataset
 * Extracted from Method.gg & Wowhead Classic+ Forensics
 * Contains complete Phase 2 dungeon walkthroughs, boss encounters with verbatim strats,
 * maps, quests, and loot matrices.
 */

if (typeof window !== 'undefined') {
  window.WOW_DUNGEON_GUIDES = ${JSON.stringify(generatedGuides, null, 2)};

  // Seamlessly merge into WOW_TOOLS_DATA.guides
  if (!window.WOW_TOOLS_DATA) {
    window.WOW_TOOLS_DATA = { guides: [] };
  } else if (!window.WOW_TOOLS_DATA.guides) {
    window.WOW_TOOLS_DATA.guides = [];
  }

  // Remove any legacy duplicate/placeholder dungeon guides to avoid collisions
  const existingIds = new Set(window.WOW_DUNGEON_GUIDES.map(g => g.id));
  window.WOW_TOOLS_DATA.guides = window.WOW_TOOLS_DATA.guides.filter(g => !existingIds.has(g.id));

  // Prepend or append curated dungeon guides
  window.WOW_TOOLS_DATA.guides.push(...window.WOW_DUNGEON_GUIDES);
}
`;

  const outputPath = path.join(ROOT, 'js', 'data', 'dungeons-data.js');
  fs.writeFileSync(outputPath, fileContent, 'utf8');
  console.log(`\nWritten ${generatedGuides.length} dungeon guides to ${outputPath}`);
}

processAll().catch(console.error);
