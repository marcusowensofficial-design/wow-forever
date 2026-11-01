import fs from 'node:fs';

const dungText = fs.readFileSync('scratch/Dungeons.lua', 'utf8');
const entries = [...dungText.matchAll(/\[(\d+)\]\s*=\s*\{([^}]+)\}/g)];

console.log('Total entries matched:', entries.length);

const parsedDungeons = entries.map(match => {
  const id = parseInt(match[1], 10);
  const body = match[2];

  // Parse simple key-values
  const getField = (field) => {
    const m = body.match(new RegExp(`${field}=(?:"([^"]*)"|(\\d+))`));
    if (!m) return null;
    return m[1] !== undefined ? m[1] : parseInt(m[2], 10);
  };

  const name = getField('n');
  const kind = getField('kind');
  const size = getField('size');
  const lv = getField('lv') || '0:0:0';
  const [minLevel, maxLevel, practicalLevel] = lv.split(':').map(Number);
  const ent = getField('ent');
  const zone = getField('zone');
  const bossRaw = getField('boss') || '';
  const lootRaw = getField('loot') || '';
  const questsRaw = getField('q') || '';
  const guide = getField('guide') || '';

  const bosses = bossRaw.split('|').filter(Boolean).map(b => {
    const [order, creatureId, bName] = b.split(':');
    return {
      order: parseInt(order, 10),
      creatureId: parseInt(creatureId, 10),
      name: bName
    };
  });

  const loot = lootRaw.split(' ').filter(Boolean).map(l => {
    const [itemId, bossOrder, source] = l.split(':');
    return {
      itemId: parseInt(itemId, 10),
      bossOrder: parseInt(bossOrder, 10),
      source: source === 's' ? 'seen' : 'client'
    };
  });

  const quests = questsRaw.split(' ').filter(Boolean).map(q => parseInt(q, 10));

  return {
    id,
    name,
    kind,
    size,
    minLevel,
    maxLevel,
    practicalLevel,
    entrance: ent,
    zone,
    bosses,
    loot,
    quests,
    guide
  };
});

console.log('Parsed dungeons count:', parsedDungeons.length);
console.log('Custom / high ID instances:');
const custom = parsedDungeons.filter(d => d.id >= 2000);
for (const c of custom) {
  console.log(`- [${c.id}] ${c.name} (${c.kind}, ${c.size}-man, Lv ${c.minLevel}-${c.maxLevel}) in ${c.zone} with ${c.bosses.length} bosses, ${c.loot.length} loot items`);
}
