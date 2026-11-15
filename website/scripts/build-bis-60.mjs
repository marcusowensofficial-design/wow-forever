#!/usr/bin/env node
/**
 * Builds js/data/bis-60-data.js: the level 60 pre-raid Best in Slot lists for the BiS tab.
 *
 * Inputs
 *   data/scraped/bis-60-sources.json   Wowhead Forever gear-planner sets (one per spec), item
 *                                      tooltips and item source listviews, collected in the browser.
 *   ../addons/ForeverDungeonJournal/Data/Dungeons.lua
 *                                      Boss loot and quest rewards for every Forever dungeon
 *                                      (preferred source text for dungeon items).
 *
 * Usage
 *   node scripts/build-bis-60.mjs                    rebuild from the committed sources file
 *   node scripts/build-bis-60.mjs --import <dir>     first merge raw scrape files from <dir>
 *                                                    (<class>_<spec>_bis-gear*.json, sources*.json)
 *
 * Every item is classified by where it comes from and whether it can be obtained in Forever today:
 *   available  - dungeon, quest, crafted, vendor, reputation, world drop or PvP rank reward
 *   raid       - Forever raid opening December 9, 2026 (Onyxia, Barrow Deeps, Hyjal Summit, tier sets)
 *   unavailable- only drops in a Classic raid that is not in Forever (MC, BWL, ZG, AQ, Naxx)
 *   unknown    - Wowhead lists no source yet
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const SOURCES_FILE = path.join(ROOT, 'data', 'scraped', 'bis-60-sources.json');
const FDJ_DUNGEONS = path.join(ROOT, '..', 'addons', 'ForeverDungeonJournal', 'Data', 'Dungeons.lua');
const OUT_FILE = path.join(ROOT, 'js', 'data', 'bis-60-data.js');

// ---------------------------------------------------------------------------------------------
// 1. Optional import of raw scrape files
// ---------------------------------------------------------------------------------------------
const importIdx = process.argv.indexOf('--import');
if (importIdx > 0) {
  const dir = process.argv[importIdx + 1];
  const prev = fs.existsSync(SOURCES_FILE) ? JSON.parse(fs.readFileSync(SOURCES_FILE, 'utf8')) : { specs: {}, items: {} };
  const specs = prev.specs || {};
  const items = prev.items || {};
  for (const f of fs.readdirSync(dir)) {
    const full = path.join(dir, f);
    if (/_bis-gear/.test(f)) {
      const d = JSON.parse(fs.readFileSync(full, 'utf8'));
      specs[d.u] = { url: `https://www.wowhead.com/forever/guide/classes/${d.u}`, updated: d.d, sets: d.sets };
    }
  }
  // sources.json first (tooltips + any listviews), then retries (sources2*.json) fill in listviews.
  const srcFiles = fs.readdirSync(dir).filter(f => /^sources.*\.json$|^src2_part\.json$/.test(f)).sort();
  for (const f of srcFiles) {
    for (const rec of JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8'))) {
      if (!rec || !rec.id || rec.err) continue;
      const cur = items[rec.id] || { id: rec.id };
      if (rec.tt && !rec.tt.err && rec.tt.name) cur.tt = rec.tt;
      const lv = {};
      for (const [k, v] of Object.entries(rec)) {
        if (k === 'id' || k === 'tt' || k === 'guides' || k === 'shared-cooldown') continue;
        lv[k] = v;
      }
      if (Object.keys(lv).length) cur.lv = lv;
      cur.fetched = cur.fetched || !!rec.tt || Object.keys(lv).length > 0;
      items[rec.id] = cur;
    }
  }
  const out = { collectedAt: new Date().toISOString().slice(0, 10), source: 'https://www.wowhead.com/forever/guides/classes', specs, items };
  fs.writeFileSync(SOURCES_FILE, JSON.stringify(out, null, 1));
  console.log(`Imported ${Object.keys(specs).length} specs and ${Object.keys(items).length} items into ${path.relative(ROOT, SOURCES_FILE)}`);
}

const SRC = JSON.parse(fs.readFileSync(SOURCES_FILE, 'utf8'));

// ---------------------------------------------------------------------------------------------
// 2. ForeverDungeonJournal loot + quest rewards (item id -> source)
// ---------------------------------------------------------------------------------------------
// Dungeon tables appear as `    ["Name"] = {` inside FDJ.DB, or as `DB["Name"] = {` / `FDJ.DB["Name"] = {`.
const DUNGEON_HEADER = /^(?: {4}|(?:FDJ\.)?DB)\["(.+?)"\] = \{/;

function parseJournal() {
  const map = {};
  if (!fs.existsSync(FDJ_DUNGEONS)) return map;
  const lines = fs.readFileSync(FDJ_DUNGEONS, 'utf8').split(/\r?\n/);
  let dungeon = null;
  let boss = null;
  let quest = null;
  let questFaction = null;
  for (const line of lines) {
    const dm = line.match(DUNGEON_HEADER);
    if (dm) { dungeon = dm[1]; boss = null; quest = null; continue; }
    const nm = line.match(/^\s+name = "(.+?)",/);
    if (nm) {
      // Boss entries carry npcID on the next line; quest names are followed by faction/pickup fields.
      boss = nm[1];
      quest = nm[1];
    }
    const fm = line.match(/^\s+faction = "(\w+)"/);
    if (fm) questFaction = fm[1];
    const rw = line.match(/rewardItems = \{(.+)\},?\s*$/);
    if (rw && dungeon) {
      for (const m of rw[1].matchAll(/\{(\d+), "(.+?)", (\d)\}/g)) {
        map[m[1]] = map[m[1]] || { kind: 'quest', dungeon, pendingQuest: true };
      }
    }
    const lm = line.match(/^\s+\{(\d+), "(.+?)", "(.*?)", (\d)\},?\s*$/);
    if (lm && dungeon && boss) {
      if (!map[lm[1]] || map[lm[1]].pendingQuest) map[lm[1]] = { kind: 'drop', dungeon, boss };
    }
  }
  // Second pass for quest names: rewardItems precede the quest's name line in this file layout.
  let pending = [];
  for (const line of lines) {
    const dm = line.match(DUNGEON_HEADER);
    if (dm) { pending = []; continue; }
    const rw = line.match(/rewardItems = \{(.+)\},?\s*$/);
    if (rw) pending = [...rw[1].matchAll(/\{(\d+), /g)].map(m => m[1]);
    const nm = line.match(/^\s+name = "(.+?)",/);
    if (nm && pending.length) {
      for (const id of pending) if (map[id] && map[id].kind === 'quest') { map[id].quest = nm[1]; delete map[id].pendingQuest; }
      pending = [];
    }
  }
  void quest; void questFaction;
  return map;
}
const JOURNAL = parseJournal();

// ---------------------------------------------------------------------------------------------
// 3. Zones, professions and availability rules
// ---------------------------------------------------------------------------------------------
const ZONES = {
  1: 'Dun Morogh', 3: 'Badlands', 4: 'Blasted Lands', 8: 'Swamp of Sorrows', 10: 'Duskwood', 11: 'Wetlands',
  12: 'Elwynn Forest', 14: 'Durotar', 15: 'Dustwallow Marsh', 16: 'Azshara', 17: 'The Barrens', 28: 'Western Plaguelands',
  33: 'Stranglethorn Vale', 36: 'Alterac Mountains', 38: 'Loch Modan', 40: 'Westfall', 41: 'Deadwind Pass',
  44: 'Redridge Mountains', 45: 'Arathi Highlands', 46: 'Burning Steppes', 47: 'The Hinterlands', 51: 'Searing Gorge',
  85: 'Tirisfal Glades', 130: 'Silverpine Forest', 139: 'Eastern Plaguelands', 141: 'Teldrassil', 148: 'Darkshore',
  215: 'Mulgore', 267: 'Hillsbrad Foothills', 331: 'Ashenvale', 357: 'Feralas', 361: 'Felwood', 400: 'Thousand Needles',
  405: 'Desolace', 406: 'Stonetalon Mountains', 440: 'Tanaris', 490: "Un'Goro Crater", 493: 'Moonglade', 616: 'Mount Hyjal',
  618: 'Winterspring', 1176: "Zul'Farrak", 1337: 'Uldaman', 1377: 'Silithus', 1477: 'Sunken Temple', 1497: 'Undercity',
  1519: 'Stormwind City', 1537: 'Ironforge', 1583: 'Blackrock Spire', 1584: 'Blackrock Depths', 1637: 'Orgrimmar',
  1638: 'Thunder Bluff', 1657: 'Darnassus', 2017: 'Stratholme', 2057: 'Scholomance', 2100: 'Maraudon', 2557: 'Dire Maul',
  2597: 'Alterac Valley', 3277: 'Warsong Gulch', 3358: 'Arathi Basin',
  2717: 'Molten Core', 2677: 'Blackwing Lair', 1977: "Zul'Gurub", 3429: "Ruins of Ahn'Qiraj", 3428: "Temple of Ahn'Qiraj",
  3456: 'Naxxramas', 2159: "Onyxia's Lair",
};
const DUNGEON_ZONES = new Set([1176, 1337, 1477, 1583, 1584, 2017, 2057, 2100, 2557]);
// Classic raids that are not part of WoW Forever (as of the Nov 12, 2026 roadmap).
const REMOVED_RAID_ZONES = new Set([2717, 2677, 1977, 3429, 3428, 3456]);
const FOREVER_RAID_ZONES = new Set([2159]);
// Quest rewards that need an item from a removed raid (Bindings of the Windseeker, Venoxis/Kurinnaxx heads, ...).
const REMOVED_RAID_QUESTS = new Set(['Rise, Thunderfury!', 'The Perfect Poison', 'Thunderaan the Windseeker', 'The Fall of Ossirian', 'Mortal Champions', 'Imperial Qiraji Armaments', 'Imperial Qiraji Regalia', "C'Thun's Legacy", 'The Savior of Kalimdor', 'Echoes of War', 'The Fate of Ramaya']);
// Named items that only exist as Classic raid loot. Used when Wowhead's source page could not be read.
const REMOVED_RAID_NAME = / of Faith$|^(Cryptstalker|Plagueheart|Frostfire|Dreamwalker|Earthshatter|Redemption|Dreadnaught|Bonescythe|Faith|Avenger's|Doomcaller's|Enigma|Stormcaller's|Genesis|Deathdealer's|Striker's|Conqueror's|Oracle|Vestments of the Oracle)\b|of the Fallen God$|Qiraji|Huhuran|Sapphiron|^Sulfuras|^Thunderfury|Kiss of the Spider|Eye of the Dead|Band of Unanswered Prayers|Band of the Inevitable|Ring of the Cryptstalker|Slayer's Crest|Band of Reanimation|Grasp of the Old God|Gem of Trapped Innocents|Eye of Diminution|Band of Unnatural Forces|Gloves of Enforcement|Belt of Never-ending Agony|Mantle of Wicked Revenge|Gauntlets of Annihilation|Dark Storm Gauntlets|Cloak of Clarity|Rejuvenating Gem|Drake Fang Talisman|Master Dragonslayer's Ring|Ancient Sinew Wrapped Lamina|Prestor's Talisman of Connivery|Stormrage's Talisman of Seething|Circlet of Faith|Shoulderpads of Faith|Bracelets of Royal Redemption/;
const PROF_BY_SKILL = { 164: 'Blacksmithing', 165: 'Leatherworking', 171: 'Alchemy', 197: 'Tailoring', 202: 'Engineering', 333: 'Enchanting', 185: 'Cooking', 129: 'First Aid' };
const PVP_TITLES_A = ['Grand Marshal', 'Field Marshal', 'Marshal', 'Commander', 'Lieutenant Commander', 'Knight-Champion', 'Knight-Captain', 'Knight-Lieutenant', 'Knight', 'Sergeant Major', 'Master Sergeant', 'Sergeant', 'Corporal', 'Private'];
const PVP_TITLES_H = ['High Warlord', 'Warlord', 'General', 'Lieutenant General', 'Champion', 'Centurion', 'Legionnaire', 'Blood Guard', 'Stone Guard', 'First Sergeant', 'Senior Sergeant', 'Grunt', 'Scout'];

function pvpSide(name) {
  const base = name.replace(/^Premier /, '');
  if (PVP_TITLES_H.some(t => base.startsWith(t + "'s"))) return 'horde';
  if (PVP_TITLES_A.some(t => base.startsWith(t + "'s"))) return 'alliance';
  return null;
}

// ---------------------------------------------------------------------------------------------
// 4. Tooltip parsing
// ---------------------------------------------------------------------------------------------
function decode(s) {
  return s.replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'");
}
function tooltipLines(html) {
  if (!html) return [];
  const text = decode(html
    .replace(/<!--[^]*?-->/g, '')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/tr>/gi, '\n')
    .replace(/<\/t[dh]>/gi, '\t')
    .replace(/<div class="whtt-sellprice">[^]*?<\/div>/g, '')
    .replace(/<[^>]+>/g, ''));
  return text.split('\n').map(l => l.replace(/\t+/g, '\t').replace(/^\t|\t$/g, '').trim()).filter(Boolean);
}
const STAT_ABBR = { Strength: 'Str', Agility: 'Agi', Stamina: 'Sta', Intellect: 'Int', Spirit: 'Spi' };
function shortEquip(l) {
  let s = l.replace(/^Equip:\s*/, '');
  let m;
  if ((m = s.match(/^Improves your chance to hit by ([\d.]+)%/))) return `+${+m[1]}% Hit`;
  if ((m = s.match(/^Improves your chance to get a critical strike by ([\d.]+)%/))) return `+${+m[1]}% Crit`;
  if ((m = s.match(/^Improves your chance to get a critical strike with spells by ([\d.]+)%/))) return `+${+m[1]}% Spell Crit`;
  if ((m = s.match(/^Improves your chance to hit with spells by ([\d.]+)%/))) return `+${+m[1]}% Spell Hit`;
  if ((m = s.match(/^\+(\d+) (Attack Power|Ranged Attack Power)\b/))) return `+${m[1]} ${m[2] === 'Attack Power' ? 'AP' : 'RAP'}`;
  if ((m = s.match(/^Increases healing done by (?:magical spells and effects by )?up to (\d+)/))) return `+${m[1]} Healing`;
  if ((m = s.match(/^Increases damage done by (\w+) spells and effects by up to (\d+)/))) return `+${m[2]} ${m[1]} Spell Power`;
  if ((m = s.match(/^\+(\d+) Weapon Damage/))) return `+${m[1]} Weapon Damage`;
  if ((m = s.match(/^Increases ranged attack speed by ([\d.]+)%/))) return `+${+m[1]}% Ranged Haste`;
  if ((m = s.match(/^Your spells pierce (\d+) Magical Resistance/))) return `+${m[1]} Spell Pen`;
  if ((m = s.match(/^Allows (\d+)% of your Mana regeneration to continue while casting/))) return `${m[1]}% casting regen`;
  if ((m = s.match(/^Reduces chance to be Dodged or Parried by ([\d.]+)%/))) return `-${+m[1]}% Dodged/Parried`;
  if ((m = s.match(/^Increases damage and healing done by magical spells and effects by up to (\d+)/))) return `+${m[1]} Spell Power`;
  if ((m = s.match(/^Increases healing done by spells and effects by up to (\d+)/))) return `+${m[1]} Healing`;
  if ((m = s.match(/^Restores (\d+) mana per 5 sec/))) return `+${m[1]} MP5`;
  if ((m = s.match(/^Increased Defense \+(\d+)/))) return `+${m[1]} Defense`;
  if ((m = s.match(/^Increases your chance to dodge an attack by ([\d.]+)%/i))) return `+${+m[1]}% Dodge`;
  if ((m = s.match(/^Increases your chance to block attacks with a shield by ([\d.]+)%/))) return `+${+m[1]}% Block`;
  if ((m = s.match(/^Increases the block value of your shield by (\d+)/))) return `+${m[1]} Block Value`;
  if ((m = s.match(/^Increases your attack and casting speed by ([\d.]+)%/))) return `+${+m[1]}% Haste`;
  return null;
}
function parseTooltip(tt) {
  const lines = tooltipLines(tt && tt.html);
  const out = { lines, stats: '', ilvl: 0, reqLevel: 0, slotLine: '' };
  if (!lines.length) return out;
  const html = tt.html;
  out.ilvl = +(html.match(/<!--ilvl-->(\d+)/) || [])[1] || 0;
  out.reqLevel = +(html.match(/<!--rlvl-->(\d+)/) || [])[1] || 0;
  const bits = [];
  for (const l of lines) {
    let m;
    if ((m = l.match(/^\+(\d+) (Strength|Agility|Stamina|Intellect|Spirit)$/))) bits.push(`+${m[1]} ${STAT_ABBR[m[2]]}`);
    else if ((m = l.match(/^\+(\d+) (Fire|Frost|Nature|Shadow|Arcane) Resistance$/))) bits.push(`+${m[1]} ${m[2]} Res`);
    else if ((m = l.match(/^\(([\d.]+) damage per second\)$/))) bits.unshift(`${m[1]} DPS`);
    else if (/^Equip:/.test(l)) { const s = shortEquip(l); if (s) bits.push(s); else bits.push('Equip effect'); }
    else if (/^(Chance on hit|Use):/.test(l)) bits.push(l.startsWith('Use') ? 'Use effect' : 'Chance on hit');
  }
  out.stats = [...new Set(bits)].join(' · ');
  const slot = lines.find(l => /^(Head|Neck|Shoulder|Back|Chest|Wrist|Hands|Waist|Legs|Feet|Finger|Trinket|One-Hand|Two-Hand|Main Hand|Off Hand|Held In Off-hand|Ranged|Relic|Thrown|Shirt|Tabard)\b/.test(l));
  out.slotLine = slot ? slot.replace('\t', ', ') : '';
  return out;
}

// ---------------------------------------------------------------------------------------------
// 5. Source classification
// ---------------------------------------------------------------------------------------------
// Sources checked by hand on Wowhead Forever item pages (2026-11-15) for items whose listviews were
// not captured in the scrape (CloudFront rate limit). Only add entries you have verified.
const MANUAL_SOURCES = {
  12640: { cat: 'craft', avail: 'available', source: 'Blacksmithing (Plans: Lionheart Helm)' },
  19169: { cat: 'craft', avail: 'available', source: 'Blacksmithing (Plans: Nightfall)' },
  21997: { cat: 'quest', avail: 'available', source: 'Quest: Saving the Best for Last' },
  18404: { cat: 'raid', avail: 'raid', source: "Quest reward for turning in the Head of Onyxia. Onyxia's Lair opens December 9" },
};

function classify(id, name) {
  if (MANUAL_SOURCES[id]) return { side: 'both', details: [], ...MANUAL_SOURCES[id] };
  const rec = SRC.items[id] || {};
  const lv = rec.lv || {};
  const j = JOURNAL[id];
  const side = pvpSide(name || '');
  const res = { cat: 'unknown', avail: 'unknown', source: '', details: [], side: side || 'both' };

  if (/^Premier |^(Grand Marshal|Field Marshal|Marshal|Knight-Captain|Knight-Champion|Knight-Lieutenant|Lieutenant Commander|Commander|High Warlord|Warlord|General|Lieutenant General|Champion|Centurion|Legionnaire|Blood Guard)'s /.test(name || '')) {
    res.cat = 'pvp'; res.avail = 'available';
    res.source = `PvP rank reward${side ? ` (${side === 'alliance' ? 'Alliance' : 'Horde'})` : ''}: bought with Honor from the PvP vendors in Stormwind / Orgrimmar`;
    return res;
  }
  if (j && j.kind === 'drop') {
    res.cat = 'dungeon'; res.avail = 'available'; res.source = `${j.boss}, ${j.dungeon}`;
    return res;
  }
  if (j && j.kind === 'quest' && j.quest) {
    res.cat = 'quest'; res.avail = 'available'; res.source = `Quest: ${j.quest} (${j.dungeon})`;
    return res;
  }

  const drops = lv['dropped-by'] || [];
  const quests = lv['reward-from-q'] || [];
  const crafted = lv['created-by-spell'] || [];
  const taught = lv['taught-by-item'] || [];
  const sold = lv['sold-by'] || [];

  if (crafted.length) {
    const skillId = (crafted[0].skill || [])[0];
    const prof = PROF_BY_SKILL[skillId] || (taught[0] && /^Plans/.test(taught[0].n) ? 'Blacksmithing' : taught[0] && /^Schematic/.test(taught[0].n) ? 'Engineering' : taught[0] && /^Formula/.test(taught[0].n) ? 'Enchanting' : 'Crafted');
    const skill = taught[0] && taught[0].skill ? taught[0].skill : (taught[0] && taught[0].lvl ? '' : '');
    res.cat = 'craft'; res.avail = 'available';
    res.source = `${prof}${taught[0] ? ` (${taught[0].n})` : ''}`;
    void skill;
    return res;
  }
  if (quests.length) {
    const q = quests[0];
    if (REMOVED_RAID_QUESTS.has(q.n)) {
      res.cat = 'raid'; res.avail = 'unavailable';
      res.source = `Quest: ${q.n}. Needs an item from a Classic raid that is not in Forever`;
      return res;
    }
    res.cat = 'quest'; res.avail = 'available';
    const qSide = q.side === 1 ? ' (Alliance)' : q.side === 2 ? ' (Horde)' : '';
    const zone = q.cat > 0 && ZONES[q.cat] ? `, ${ZONES[q.cat]}` : q.cat === -364 ? ', Darkmoon Faire' : '';
    res.source = `Quest: ${q.n}${zone}${qSide}`;
    if (q.side === 1) res.side = 'alliance';
    if (q.side === 2) res.side = 'horde';
    return res;
  }
  if (drops.length) {
    const live = drops.filter(d => !(d.loc || []).every(z => REMOVED_RAID_ZONES.has(z)) || !(d.loc || []).length);
    const pick = live[0] || drops[0];
    const zoneId = (pick.loc || [])[0];
    const zone = ZONES[zoneId] || (zoneId ? `zone ${zoneId}` : '');
    const pct = pick.pct ? ` (${pick.pct}%)` : '';
    if (!live.length) {
      res.cat = 'raid'; res.avail = 'unavailable';
      res.source = `${pick.n}, ${zone}. This raid is not in Forever`;
      return res;
    }
    if (FOREVER_RAID_ZONES.has(zoneId)) {
      res.cat = 'raid'; res.avail = 'raid'; res.source = `${pick.n}, ${zone}${pct}. Raid opens December 9`;
      return res;
    }
    res.cat = DUNGEON_ZONES.has(zoneId) ? 'dungeon' : 'world';
    res.avail = 'available';
    res.source = `${pick.n}${zone ? `, ${zone}` : ''}${pct}`;
    return res;
  }
  if (sold.length) {
    const v = sold[0];
    const zone = (v.loc || []).map(z => ZONES[z]).filter(Boolean)[0] || '';
    res.cat = 'vendor'; res.avail = 'available';
    const isUndermine = v.n === 'Pix Xizzix';
    res.source = `Sold by ${v.n}${zone ? `, ${zone}` : ''}${isUndermine ? ' (Tarnished Undermine Real)' : ''}`;
    if (v.side === 1) res.side = 'alliance';
    if (v.side === 2) res.side = 'horde';
    return res;
  }
  if (REMOVED_RAID_NAME.test(name || '')) {
    res.cat = 'raid'; res.avail = 'unavailable';
    res.source = 'Classic raid loot. This raid is not in Forever';
    return res;
  }
  if (!rec.tt) {
    res.cat = 'raid'; res.avail = 'raid';
    res.source = 'Phase 1 raid tier piece. Stats are still hidden; raids open December 9';
    return res;
  }
  res.source = 'Source not checked yet: see the item on Wowhead';
  return res;
}

// ---------------------------------------------------------------------------------------------
// 6. Spec catalogue (one entry per level 60 talent spec; feral split into cat and bear)
// ---------------------------------------------------------------------------------------------
const ICON = n => `https://render.worldofwarcraft.com/us/icons/56/${n}.jpg`;
const SPECS = {
  warrior: [['arms', 'Arms', 'Melee DPS', 'ability_warrior_savageblow', 'warrior/arms/bis-gear', 'arms'], ['fury', 'Fury', 'Melee DPS', 'ability_warrior_innerrage', 'warrior/fury/bis-gear', 'fury'], ['protection', 'Protection', 'Tank', 'inv_shield_06', 'warrior/protection/bis-gear', 'protection']],
  paladin: [['holy', 'Holy', 'Healer', 'spell_holy_holybolt', 'paladin/holy/bis-gear', 'holy'], ['protection', 'Protection', 'Tank', 'spell_holy_devotionaura', 'paladin/protection/bis-gear', 'protection'], ['retribution', 'Retribution', 'Melee DPS', 'spell_holy_auraoflight', 'paladin/retribution/bis-gear', 'retribution']],
  hunter: [['beast-mastery', 'Beast Mastery', 'Ranged DPS', 'ability_hunter_beasttaming', 'hunter/beast-mastery/bis-gear', 'beast-mastery'], ['marksmanship', 'Marksmanship', 'Ranged DPS', 'ability_marksmanship', 'hunter/marksmanship/bis-gear', 'marksmanship'], ['survival', 'Survival', 'Ranged DPS', 'ability_hunter_swiftstrike', 'hunter/survival/bis-gear', 'survival']],
  rogue: [['assassination', 'Assassination', 'Melee DPS', 'ability_rogue_eviscerate', 'rogue/assassination/bis-gear', 'assassination'], ['combat', 'Combat', 'Melee DPS', 'ability_backstab', 'rogue/combat/bis-gear', 'combat'], ['subtlety', 'Subtlety', 'Melee DPS', 'ability_stealth', 'rogue/subtlety/bis-gear', 'subtlety']],
  priest: [['discipline', 'Discipline', 'Healer', 'spell_holy_wordfortitude', 'priest/discipline/bis-gear', 'discipline'], ['holy', 'Holy', 'Healer', 'spell_holy_guardianspirit', 'priest/holy/bis-gear', 'holy'], ['shadow', 'Shadow', 'Caster DPS', 'spell_shadow_shadowwordpain', 'priest/shadow/bis-gear', 'shadow']],
  shaman: [['elemental', 'Elemental', 'Caster DPS', 'spell_nature_lightning', 'shaman/elemental/bis-gear', 'elemental'], ['enhancement', 'Enhancement', 'Melee DPS', 'spell_nature_lightningshield', 'shaman/enhancement/bis-gear', 'enhancement'], ['restoration', 'Restoration', 'Healer', 'spell_nature_magicimmunity', 'shaman/restoration/bis-gear', 'restoration']],
  mage: [['arcane', 'Arcane', 'Caster DPS', 'spell_holy_magicalsentry', 'mage/arcane/bis-gear', 'arcane'], ['fire', 'Fire', 'Caster DPS', 'spell_fire_firebolt02', 'mage/fire/bis-gear', 'fire'], ['frost', 'Frost', 'Caster DPS', 'spell_frost_frostbolt02', 'mage/frost/bis-gear', 'frost']],
  warlock: [['affliction', 'Affliction', 'Caster DPS', 'spell_shadow_deathcoil', 'warlock/affliction/bis-gear', 'affliction'], ['demonology', 'Demonology', 'Caster DPS', 'spell_shadow_metamorphosis', 'warlock/demonology/bis-gear', 'demonology'], ['destruction', 'Destruction', 'Caster DPS', 'spell_shadow_rainoffire', 'warlock/destruction/bis-gear', 'destruction']],
  druid: [['balance', 'Balance', 'Caster DPS', 'spell_nature_starfall', 'druid/balance/bis-gear', 'balance'], ['feral', 'Feral (Cat)', 'Melee DPS', 'ability_druid_catform', 'druid/feral/bis-gear-dps', 'feral'], ['feral-tank', 'Feral (Bear)', 'Tank', 'ability_racial_bearform', 'druid/feral/bis-gear-tank', 'feral'], ['restoration', 'Restoration', 'Healer', 'spell_nature_healingtouch', 'druid/restoration/bis-gear', 'restoration']],
};
const CLASSES = [
  ['warrior', 'Warrior', '#C79C6E', 'classicon_warrior'], ['paladin', 'Paladin', '#F58CBA', 'classicon_paladin'],
  ['hunter', 'Hunter', '#ABD473', 'classicon_hunter'], ['rogue', 'Rogue', '#FFF569', 'classicon_rogue'],
  ['priest', 'Priest', '#FFFFFF', 'classicon_priest'], ['shaman', 'Shaman', '#0070DE', 'classicon_shaman'],
  ['mage', 'Mage', '#69CCF0', 'classicon_mage'], ['warlock', 'Warlock', '#9482C9', 'classicon_warlock'],
  ['druid', 'Druid', '#FF7D0A', 'classicon_druid'],
];
// Own-words stat guidance per role (what the gear in each list is chasing).
const ROLE_NOTES = {
  'Melee DPS': 'Pre-raid level 60 list. Melee gear chases hit up to the cap first, then critical strike, attack power and your main stat.',
  'Ranged DPS': 'Pre-raid level 60 list. Hunters want Agility, hit up to the cap, then critical strike and attack power, with a strong ranged weapon above all.',
  'Caster DPS': 'Pre-raid level 60 list. Casters want spell hit up to the cap, then spell power and spell critical strike, with Intellect for mana.',
  Healer: 'Pre-raid level 60 list. Healers want healing power first, then mana regeneration (MP5 and Spirit) and Intellect.',
  Tank: 'Pre-raid level 60 list. Tanks balance Stamina, armor and avoidance with enough hit and threat stats to hold aggro.',
};

const WH_SLOT = { 1: 'head', 2: 'neck', 3: 'shoulder', 5: 'chest', 6: 'waist', 7: 'legs', 8: 'feet', 9: 'wrist', 10: 'hands', 11: 'finger1', 12: 'finger2', 13: 'trinket1', 14: 'trinket2', 15: 'back', 16: 'mainHand', 17: 'offHand', 18: 'ranged' };
const SLOT_ORDER = [['head', 'Head'], ['neck', 'Neck'], ['shoulder', 'Shoulder'], ['back', 'Back'], ['chest', 'Chest'], ['wrist', 'Wrist'], ['hands', 'Hands'], ['waist', 'Waist'], ['legs', 'Legs'], ['feet', 'Feet'], ['finger', 'Finger'], ['trinket', 'Trinket'], ['mainHand', 'Main Hand'], ['offHand', 'Off Hand'], ['ranged', 'Ranged / Relic']];
const QUALITY = q => `q${Math.max(0, Math.min(5, q || 1))}`;

function titleCaseSlug(slug) {
  return slug.split('-').map(w => (['of', 'the'].includes(w) ? w : w.charAt(0).toUpperCase() + w.slice(1))).join(' ');
}
function enchantName(token) {
  // token: "spell:20034:enchant-weapon-crusader" | "item:18330:arcanum-of-focus"
  const [, , slug] = token.split(':');
  return slug ? titleCaseSlug(slug).replace(/^Enchant /, '') : '';
}

function buildItem(slotEntry, rank) {
  const [, id, whName, quality, ench] = slotEntry;
  const rec = SRC.items[id] || {};
  const tt = rec.tt || null;
  const name = (tt && tt.name) || whName || `Item ${id}`;
  const tip = parseTooltip(tt);
  const cls = classify(id, name);
  const unrevealed = !tt;
  return {
    rank,
    quality: QUALITY(tt ? tt.q : quality || 4),
    itemId: String(id),
    tipId: String(id),
    name: unrevealed && /^(Head|Shoulders|Chest|Legs|Feet|Hands)$/.test(name) ? `Tier set ${name.toLowerCase()} (unrevealed)` : name,
    icon: tt && tt.icon ? `${tt.icon}.jpg` : 'inv_misc_questionmark.jpg',
    side: cls.side,
    source: cls.source,
    sourceDetails: [cls.source],
    cat: cls.cat,
    avail: cls.avail,
    stats: tip.stats,
    ilvl: tip.ilvl,
    reqLevel: tip.reqLevel,
    lines: tip.lines,
    enchant: (ench || []).map(enchantName).filter(Boolean).join(', '),
    mats: '',
  };
}

// ---------------------------------------------------------------------------------------------
// 7. Assemble
// ---------------------------------------------------------------------------------------------
const data = { classes: CLASSES.map(([id, name, color, icon]) => ({ id, name, color, icon: ICON(icon) })) };
const stats = { specs: 0, listed: 0, pending: 0, partial: 0, items: 0, unavailable: 0, raid: 0, unknown: 0 };

for (const [classId] of CLASSES) {
  data[classId] = { specs: [] };
  for (const [specId, specName, role, icon, whPath, talentSpec] of SPECS[classId]) {
    const raw = SRC.specs[whPath];
    const set = raw && raw.sets && raw.sets.find(s => s.slots && s.slots.length) || null;
    const doll = {};
    const slots = {};
    const enchants = [];
    if (set) {
      for (const entry of set.slots) {
        const key = WH_SLOT[entry[0]];
        if (!key) continue;
        const item = buildItem(entry, 1);
        doll[key] = item;
        const group = key.replace(/[12]$/, '');
        slots[group] = slots[group] || [];
        item.rank = slots[group].length + 1;
        slots[group].push(item);
        if (item.enchant) enchants.push({ slot: SLOT_ORDER.find(s => s[0] === group)?.[1] || group, effect: item.enchant, source: `On ${item.name}`, materials: '', icon: 'trade_engraving.jpg' });
        stats.items++;
        if (item.avail === 'unavailable') stats.unavailable++;
        if (item.avail === 'raid') stats.raid++;
        if (item.avail === 'unknown') stats.unknown++;
      }
    }
    const filled = Object.keys(doll).length;
    const raidOnly = filled > 0 && Object.values(doll).every(i => i.avail === 'raid');
    const unavailable = Object.values(doll).filter(i => i.avail === 'unavailable').length;
    // A list that is mostly Classic raid loot (Naxxramas, AQ, ...) is Wowhead's placeholder, not a pre-raid list.
    const status = filled === 0 ? 'pending'
      : raidOnly || filled < 10 ? 'partial'
        : unavailable / filled >= 0.5 ? 'placeholder'
          : 'listed';
    stats.specs++;
    stats[status] = (stats[status] || 0) + 1;
    data[classId].specs.push({
      id: specId,
      name: specName,
      role,
      icon: ICON(icon),
      level: 60,
      status,
      talentSpecId: talentSpec,
      sourceUrl: `https://www.wowhead.com/forever/guide/classes/${whPath}`,
      sourceUpdated: raw && raw.updated ? raw.updated.replace(/\//g, '-') : null,
      description: ROLE_NOTES[role],
      doll: { alliance: doll, horde: doll },
      slots: SLOT_ORDER.filter(([k]) => slots[k]).map(([k, label]) => ({ slotId: k, slotName: label, items: slots[k] })),
      enchants,
      consumables: [],
    });
  }
}

const meta = {
  version: '1.60.1.70938',
  level: 60,
  title: 'Level 60 Pre-Raid BiS',
  phase: 'Pre-raid (raids open December 9, 2026)',
  lastUpdated: SRC.collectedAt,
  source: 'Wowhead WoW: Forever class guides (gear planner on each spec\'s BiS page)',
  sourceUrl: 'https://www.wowhead.com/forever/guides/classes',
  stats,
};

const banner = `/**
 * World of Warcraft: Forever - Level 60 Pre-Raid Best in Slot lists.
 * GENERATED by scripts/build-bis-60.mjs from data/scraped/bis-60-sources.json and the
 * ForeverDungeonJournal loot tables. Do not edit by hand: re-scrape, then rebuild.
 * Lists follow Wowhead's Forever gear planners (collected ${SRC.collectedAt}). Each item carries
 * avail = available | raid | unavailable | unknown, so the page can flag gear you cannot get yet.
 */
`;
fs.writeFileSync(OUT_FILE, `${banner}if (typeof window !== 'undefined') {\n  window.WOW_BIS_METADATA_60 = ${JSON.stringify(meta, null, 2)};\n  window.WOW_BIS_DATA_60 = ${JSON.stringify(data)};\n}\n`);
console.log(`Wrote ${path.relative(ROOT, OUT_FILE)}`);
console.log(stats);
