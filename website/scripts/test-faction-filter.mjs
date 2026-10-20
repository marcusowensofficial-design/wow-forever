import fs from 'node:fs';
import path from 'node:path';

const progPath = path.resolve('data', 'scraped', 'forever_weapons.json');
const progData = JSON.parse(fs.readFileSync(progPath, 'utf8'));

console.log('Testing Faction Filtering with class-progression.js engine logic:');

const factions = ['all', 'alliance', 'horde'];

let allPass = true;

for (const [cls, cData] of Object.entries(progData)) {
  const totalSteps = cData.levels.length;
  console.log(`\n=== Class: ${cls} (Total steps: ${totalSteps}) ===`);

  for (const f of factions) {
    const isShaman = cls === 'shaman';
    let effectiveFaction = f;
    if (isShaman && effectiveFaction === 'alliance') effectiveFaction = 'horde';

    const visibleSteps = [];
    const brokenAlts = [];

    cData.levels.forEach((step, _idx) => {
      let displayStep = { ...step };
      const alts = (step.alts || []).slice();

      if (effectiveFaction !== 'all') {
        const stepFaction = step.faction || 'both';
        if (stepFaction !== 'both' && stepFaction !== effectiveFaction) {
          let matchIdx = alts.findIndex(a => a.faction === effectiveFaction);
          if (matchIdx === -1) {
            matchIdx = alts.findIndex(a => (a.faction || 'both') === 'both');
          }

          if (matchIdx !== -1) {
            const altMatch = alts[matchIdx];
            const valStr = altMatch.value || '';
            const dpsMatch = altMatch.dps || valStr.match(/([\d.]+\s*DPS)/i)?.[1] || '';
            const spdMatch = altMatch.speed || valStr.match(/([\d.]+s)/i)?.[1]?.replace('s', '') || '';

            displayStep = {
              ...step,
              itemId: altMatch.itemId || null,
              name: altMatch.name,
              icon: altMatch.icon || step.icon,
              weaponType: altMatch.weaponType || step.weaponType,
              speed: spdMatch || altMatch.speed || step.speed,
              dps: dpsMatch || (altMatch.dps ? `${altMatch.dps} DPS` : step.dps),
              source: altMatch.source || { kind: 'quest', title: altMatch.name, detail: altMatch.value || '' },
              faction: altMatch.faction || effectiveFaction
            };
          } else {
            return;
          }
        }
      }

      if (!displayStep.dps || displayStep.dps === '') {
        brokenAlts.push({ bracket: step.levelBracket, name: displayStep.name });
      }
      visibleSteps.push(step.levelBracket);
    });

    console.log(`  Filter: ${f.padEnd(8)} (Effective: ${effectiveFaction.padEnd(8)}) => Visible: ${visibleSteps.length}/${totalSteps} steps | Broken stats: ${brokenAlts.length}`);
    if (visibleSteps.length < totalSteps) {
      allPass = false;
      const missing = cData.levels.map(l => l.levelBracket).filter(b => !visibleSteps.includes(b));
      console.log(`    ⚠️ Missing brackets:`, missing);
    }
  }
}

if (allPass) {
  console.log('\n✓ ALL 9 CLASSES PASS FACTION FILTERING WITH 100% STEPS VISIBLE AND 0 MISSING BRACKETS!');
} else {
  console.log('\n✗ SOME BRACKETS ARE STILL MISSING');
}
