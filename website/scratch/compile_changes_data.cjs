const fs = require('fs');

const entries = JSON.parse(fs.readFileSync('scratch/all_changes_entries.json', 'utf8'));
const classSummaries = JSON.parse(fs.readFileSync('scratch/all_class_summaries.json', 'utf8'));

// Races from parsed RSC
const rsc = fs.readFileSync('scratch/changes_rsc.txt', 'utf8');
const lines = rsc.split('\n');
const line43 = lines[43];
const jsonStart = line43.indexOf('{');
const jsonEnd = line43.lastIndexOf('}');
const parsed = JSON.parse(line43.substring(jsonStart, jsonEnd + 1));
const racesByClass = parsed.children[0][3].racesByClass || {};

const classDefs = [
  { slug: 'all', name: 'All', icon: 'inv_misc_book_09' },
  { slug: 'warrior', name: 'Warrior', icon: 'classicon_warrior' },
  { slug: 'hunter', name: 'Hunter', icon: 'classicon_hunter' },
  { slug: 'mage', name: 'Mage', icon: 'classicon_mage' },
  { slug: 'rogue', name: 'Rogue', icon: 'classicon_rogue' },
  { slug: 'priest', name: 'Priest', icon: 'classicon_priest' },
  { slug: 'warlock', name: 'Warlock', icon: 'classicon_warlock' },
  { slug: 'paladin', name: 'Paladin', icon: 'classicon_paladin' },
  { slug: 'druid', name: 'Druid', icon: 'classicon_druid' },
  { slug: 'shaman', name: 'Shaman', icon: 'classicon_shaman' }
];

const classMetadata = {};

for (const c of classDefs) {
  const slug = c.slug;
  const isAll = slug === 'all';
  const classEntries = isAll ? entries : entries.filter(e => e.class === slug);

  const talents = classEntries.filter(e => e.kind === 'talent');
  const spells = classEntries.filter(e => e.kind === 'spell');

  const talentsChanged = talents.filter(e => ['modified', 'moved', 'renamed'].includes(e.reported_change_kind));
  const talentsNew = talents.filter(e => e.reported_change_kind === 'added');
  const talentsRemoved = talents.filter(e => e.reported_change_kind === 'removed');
  const spellsChanged = spells.filter(e => e.reported_change_kind !== 'unchanged');
  const allChanges = talentsChanged.length + talentsNew.length + talentsRemoved.length + spellsChanged.length;

  const stats = {
    allChanges,
    talentsChanged: talentsChanged.length,
    talentsNew: talentsNew.length,
    talentsRemoved: talentsRemoved.length,
    spellsChanged: spellsChanged.length,
    spellsTotal: spells.length,
    everything: classEntries.length
  };

  const heroTitle = isAll
    ? 'WOW FOREVER CHANGES VS CLASSIC'
    : `${c.name.toUpperCase()} CHANGES IN WOW FOREVER`;

  const heroDesc = isAll
    ? 'Every World of Warcraft: Forever talent and spell change, compared with Classic: 113 new talents, 300 changed talents and 261 changed spells across the nine classes. Pick a class to read its changes.'
    : (classSummaries[slug] || `Every ${c.name} talent and spell change in World of Warcraft: Forever, compared with Classic, with its source.`);

  const races = racesByClass[slug] || [];

  classMetadata[slug] = {
    slug,
    name: c.name,
    icon: c.icon,
    heroTitle,
    heroDesc,
    races,
    stats
  };

  console.log(`${slug.padEnd(10)}: AllChanges=${stats.allChanges}, TalentsChanged=${stats.talentsChanged}, New=${stats.talentsNew}, Removed=${stats.talentsRemoved}, Spells=${stats.spellsChanged}, Total=${stats.everything}`);
}

const compiledData = {
  classes: classMetadata,
  entries: entries
};

// Write JSON file
fs.writeFileSync('data/forever_changes.json', JSON.stringify(compiledData, null, 2));
console.log('Saved data/forever_changes.json');

// Write JS file for direct fast browser loading
const jsContent = `/**
 * World of Warcraft: Forever - Class & Spell Changes Dataset
 * 753 Total Changes (113 New Talents, 300 Changed Talents, 261 Spells) across all 9 classes.
 * Public client datamined changes compared directly with Classic Era client data.
 */

window.WOW_CHANGES_DATA = ${JSON.stringify(compiledData)};
`;

fs.writeFileSync('js/data/changes-data.js', jsContent);
console.log('Saved js/data/changes-data.js');
