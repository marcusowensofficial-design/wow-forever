const fs = require('fs');
const vm = require('vm');

const bisCode = fs.readFileSync('js/data/bis-data.js', 'utf8');
const context = { window: {}, console: console };
vm.createContext(context);
vm.runInContext(bisCode + '\n; window.WOW_BIS_DATA = WOW_BIS_DATA; window.WOW_BIS_METADATA = WOW_BIS_METADATA;', context);

const bisData = context.window.WOW_BIS_DATA;
const bisMetadata = context.window.WOW_BIS_METADATA;

console.log('bisMetadata:', bisMetadata ? 'OK' : 'MISSING');
console.log('bisData classes count:', bisData.classes ? bisData.classes.length : 'MISSING');

let totalSpecs = 0;
let totalSlots = 0;
let totalItems = 0;
let missingFields = 0;
let missingTooltips = 0;

for (const c of bisData.classes) {
  const clsData = bisData[c.id];
  if (!clsData || !clsData.specs) {
    console.log('Missing clsData or specs for:', c.id);
    continue;
  }
  totalSpecs += clsData.specs.length;
  for (const s of clsData.specs) {
    if (!s.doll || !s.doll.alliance || !s.doll.horde) {
      console.log(`Missing doll in ${c.id}/${s.id}`);
    }
    if (!s.slots) {
      console.log(`Missing slots in ${c.id}/${s.id}`);
      continue;
    }
    totalSlots += s.slots.length;
    for (const sl of s.slots) {
      if (!sl.items) continue;
      totalItems += sl.items.length;
      for (const it of sl.items) {
        if (!it.name || !it.quality || !it.icon) {
          missingFields++;
        }
        if (!it.lines || it.lines.length === 0) {
          missingTooltips++;
        }
      }
    }
  }
}

console.log({
  totalSpecs,
  totalSlots,
  totalItems,
  missingFields,
  missingTooltips
});
