const fs = require('fs');

const entries = JSON.parse(fs.readFileSync('scratch/all_changes_entries.json', 'utf8'));
console.log('Total entries:', entries.length);

const talents = entries.filter(e => e.kind === 'talent');
const spells = entries.filter(e => e.kind === 'spell');

const talentsChanged = talents.filter(e => ['modified', 'moved', 'renamed'].includes(e.reported_change_kind));
const talentsNew = talents.filter(e => e.reported_change_kind === 'added');
const talentsRemoved = talents.filter(e => e.reported_change_kind === 'removed');
const spellsChanged = spells.filter(e => e.reported_change_kind !== 'unchanged');

console.log('Talents changed:', talentsChanged.length);
console.log('Talents new:', talentsNew.length);
console.log('Talents removed:', talentsRemoved.length);
console.log('Spells changed:', spellsChanged.length);
console.log('Total changes (talentsChanged + talentsNew + talentsRemoved + spellsChanged):',
  talentsChanged.length + talentsNew.length + talentsRemoved.length + spellsChanged.length);
