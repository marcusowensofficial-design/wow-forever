import fs from 'node:fs';

const d = JSON.parse(fs.readFileSync('data/scraped/forever_weapons.json', 'utf8'));

const illegalItems = [];

for (const [cls, cData] of Object.entries(d)) {
  cData.levels.forEach(lvl => {
    const list = [
      { ...lvl, isAlt: false },
      ...(lvl.alts || []).map(a => ({ ...a, levelBracket: lvl.levelBracket, isAlt: true }))
    ];

    list.forEach(item => {
      const type = (item.weaponType || '').toLowerCase();
      const name = item.name.toLowerCase();
      const val = (item.value || '').toLowerCase();
      const text = `${type} ${name} ${val}`;

      function fail(reason) {
        illegalItems.push({ cls, bracket: item.levelBracket, name: item.name, isAlt: item.isAlt, reason, type: item.weaponType });
      }

      // Rogue
      if (cls === 'rogue') {
        if (text.includes('two-handed') || text.includes('2h ') || text.includes('2-hand') || text.includes('polearm') || text.includes('staff')) {
          fail('Rogue cannot use 2H / Staff / Polearm');
        }
        if (text.includes('axe')) {
          fail('Rogue cannot use Axe');
        }
      }

      // Druid
      if (cls === 'druid') {
        if (text.includes('sword')) fail('Druid cannot use Sword');
        if (text.includes('axe') && !text.includes('poleaxe') && !text.includes('polearm')) fail('Druid cannot use Axe');
      }

      // Shaman
      if (cls === 'shaman') {
        if (text.includes('sword')) fail('Shaman cannot use Sword');
      }

      // Paladin
      if (cls === 'paladin') {
        if (text.includes('axe')) fail('Paladin cannot use Axe');
        if (text.includes('staff')) fail('Paladin cannot use Staff');
      }

      // Mage / Warlock
      if (cls === 'mage' || cls === 'warlock') {
        if (text.includes('mace') || text.includes('hammer') || text.includes('club') || text.includes('maul')) fail(`${cls} cannot use Mace`);
        if (text.includes('axe')) fail(`${cls} cannot use Axe`);
        if (text.includes('two-handed sword') || text.includes('2h sword')) fail(`${cls} cannot use 2H Sword`);
      }

      // Priest
      if (cls === 'priest') {
        if (text.includes('sword')) fail('Priest cannot use Sword');
        if (text.includes('axe')) fail('Priest cannot use Axe');
        if (text.includes('two-handed mace') || text.includes('2h mace')) fail('Priest cannot use 2H Mace');
      }
    });
  });
}

console.log(`Found ${illegalItems.length} illegal item assignments:`);
illegalItems.forEach(i => console.log(`  [${i.cls} ${i.bracket}] ${i.isAlt ? 'ALT' : 'PRIMARY'} "${i.name}" (${i.type}): ${i.reason}`));
