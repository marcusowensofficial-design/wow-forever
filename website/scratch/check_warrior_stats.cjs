const fs = require('fs');

const entries = JSON.parse(fs.readFileSync('scratch/all_changes_entries.json', 'utf8'));

const warrior = entries.filter(e => e.class === 'warrior');
console.log('Total warrior entries:', warrior.length);

const talents = warrior.filter(e => e.kind === 'talent');
const spells = warrior.filter(e => e.kind === 'spell');

const talentsChanged = talents.filter(e => ['modified', 'moved', 'renamed'].includes(e.reported_change_kind));
const talentsNew = talents.filter(e => e.reported_change_kind === 'added');
const talentsRemoved = talents.filter(e => e.reported_change_kind === 'removed');
const spellsChanged = spells.filter(e => e.reported_change_kind !== 'unchanged');

console.log('Talents changed:', talentsChanged.length);
console.log('Talents new:', talentsNew.length);
console.log('Talents removed:', talentsRemoved.length);
console.log('Spells changed:', spellsChanged.length);

// Compare with screenshot:
// Screenshot has:
// 37 Talents changed
// 10 New talents
// 20 Spells changed
// Sidebar:
// All changes: 77 (37 + 10 + 10 + 20 = 77!)
// New talents: 10
// Changed talents: 37
// Removed talents: 10
// Spells: 33 (or spells changed 20, all spells 33)
// Everything: 95
