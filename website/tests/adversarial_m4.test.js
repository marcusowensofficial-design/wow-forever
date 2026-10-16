#!/usr/bin/env node
/* global console, process */

/**
 * Empirical Adversarial Challenger Test Suite for Milestone 4 (Validation Engine & Deep Dive Legality)
 *
 * Exhaustively stress-tests and tamper-tests:
 * 1. Check 51: Client Build Versioning & Stale Build Purge
 * 2. Check 54: Obsolete Weapon Racials Purge across races-classes.js, tools-data.js, deepdives
 * 3. Check 55: Removed Talents Purge (Call of Thunder, Shadow Affinity) in talents-data.js
 * 4. Check 56: New Talent Nodes Presence & Metadata (Elemental Mastery, Arcane Wrath, Dark Inspiration, Grim Reach)
 * 5. Check 57: Replacement Racials Presence & Exact 4-Racial Symmetry across all 9 Races
 * 6. Check 58: Strict Legality Audit across all Level 30 Recommended Builds (budget <= 26, tier gating, prereqs)
 * 7. Live Subprocess Tamper Proof: Running `node scripts/validate.js` on mutated disk files
 */

import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { loadAllData } from './helpers/loader.js';
import { TestCollector, expect } from './helpers/assertions.js';
import {
  parseBuildUrl,
  validateBuildLegality,
  getTotalPoints
} from './helpers/talent-engine.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');

console.log('======================================================================');
console.log('   EMPIRICAL ADVERSARIAL CHALLENGER SUITE: MILESTONE 4');
console.log('   Validation Engine & Deep Dive Legality Stress Testing');
console.log('======================================================================\n');

const collector = new TestCollector('Milestone 4 Adversarial Challenger Suite');
const productionData = loadAllData(ROOT);

// Helper to assert no throw
function assertDoesNotThrow(fn, desc) {
  try {
    fn();
  } catch (err) {
    throw new Error(`${desc || 'Function threw an unexpected error'}: ${err.message}`);
  }
}

// ============================================================================
// SUITE 1: CHECK 51 (BETA BUILD 1.60.1.70425 & STALE BUILDS REJECTION)
// ============================================================================
collector.describe('Suite 1: Check 51 Build Versioning & Stale Builds Mutation Testing', () => {
  function runCheck51(coreCode, indexHtml) {
    const clientBuildMatch = coreCode.match(/"clientBuild":\s*"([^"]+)"/);
    if (!clientBuildMatch || clientBuildMatch[1] !== '1.60.1.70425') {
      throw new Error(`Expected core-data.js clientBuild to be '1.60.1.70425', got '${clientBuildMatch ? clientBuildMatch[1] : 'missing'}'`);
    }
    if (!indexHtml.includes('1.60.1.70425')) {
      throw new Error('index.html missing reference to Beta Build 1.60.1.70425');
    }
    if (indexHtml.includes('71890')) {
      throw new Error('Found stale build 71890 reference in index.html; should be updated to 1.60.1.70425');
    }
    if (indexHtml.includes('72140')) {
      throw new Error('Found stale build 72140 reference in index.html; should be updated to 1.60.1.70425');
    }
  }

  const realCoreCode = fs.readFileSync(path.join(ROOT, 'js', 'data', 'core-data.js'), 'utf8');
  const realIndexHtml = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');

  collector.test('1.1 Baseline unmodified production files pass Check 51', () => {
    assertDoesNotThrow(() => runCheck51(realCoreCode, realIndexHtml), 'Check 51 baseline');
  });

  collector.test('1.2 Mutation: core-data.js clientBuild altered to 1.60.0.71890 throws error', () => {
    const mutated = realCoreCode.replace(/"clientBuild":\s*"1\.60\.1\.70425"/, '"clientBuild": "1.60.0.71890"');
    expect(() => runCheck51(mutated, realIndexHtml)).toThrow(/Expected core-data\.js clientBuild to be '1\.60\.1\.70425'/);
  });

  collector.test('1.3 Mutation: core-data.js clientBuild missing throws error', () => {
    const mutated = realCoreCode.replace(/"clientBuild":\s*"1\.60\.1\.70425"/, '');
    expect(() => runCheck51(mutated, realIndexHtml)).toThrow(/got 'missing'/);
  });

  collector.test('1.4 Mutation: index.html missing 1.60.1.70425 throws error', () => {
    const mutated = realIndexHtml.replaceAll('1.60.1.70425', '1.60.0.00000');
    expect(() => runCheck51(realCoreCode, mutated)).toThrow(/index\.html missing reference to Beta Build 1\.60\.1\.70425/);
  });

  collector.test('1.5 Mutation: index.html contains stale build 71890 throws error', () => {
    const mutated = realIndexHtml + '\n<!-- build 71890 -->';
    expect(() => runCheck51(realCoreCode, mutated)).toThrow(/Found stale build 71890 reference in index\.html/);
  });

  collector.test('1.6 Mutation: index.html contains stale build 72140 throws error', () => {
    const mutated = realIndexHtml + '\n<!-- build 72140 -->';
    expect(() => runCheck51(realCoreCode, mutated)).toThrow(/Found stale build 72140 reference in index\.html/);
  });
});

// ============================================================================
// SUITE 2: CHECK 54 (OBSOLETE WEAPON RACIALS PURGE MUTATION TESTING)
// ============================================================================
collector.describe('Suite 2: Check 54 Obsolete Weapon Racials Purge Mutation Testing', () => {
  function runCheck54(fileMap) {
    const obsoleteRacials = ['Sword Specialization', 'Mace Specialization', 'Axe Specialization'];
    for (const [filePath, content] of Object.entries(fileMap)) {
      for (const racial of obsoleteRacials) {
        if (content.includes(racial)) {
          throw new Error(`Found obsolete weapon racial "${racial}" in ${filePath}`);
        }
      }
    }
  }

  const deepdiveFiles = fs.readdirSync(path.join(ROOT, 'js', 'data', 'deepdives'))
    .filter(f => f.endsWith('.js'))
    .map(f => path.join('js', 'data', 'deepdives', f));

  const sampleFiles = [
    'js/data/races-classes.js',
    'js/data/tools-data.js',
    ...deepdiveFiles
  ];

  collector.test('2.1 Baseline unmodified production files pass Check 54', () => {
    const fileMap = {};
    for (const file of sampleFiles) {
      fileMap[file] = fs.readFileSync(path.join(ROOT, file), 'utf8');
    }
    assertDoesNotThrow(() => runCheck54(fileMap), 'Check 54 baseline');
  });

  collector.test('2.2 Mutation: Injecting "Sword Specialization" into races-classes.js throws error', () => {
    const fileMap = { 'js/data/races-classes.js': 'const racials = ["Sword Specialization"];' };
    expect(() => runCheck54(fileMap)).toThrow(/Found obsolete weapon racial "Sword Specialization" in js\/data\/races-classes\.js/);
  });

  collector.test('2.3 Mutation: Injecting "Mace Specialization" into tools-data.js throws error', () => {
    const fileMap = { 'js/data/tools-data.js': 'export const data = { note: "Mace Specialization" };' };
    expect(() => runCheck54(fileMap)).toThrow(/Found obsolete weapon racial "Mace Specialization" in js\/data\/tools-data\.js/);
  });

  collector.test('2.4 Mutation: Injecting "Axe Specialization" into warrior deep dive throws error', () => {
    const fileMap = { 'js/data/deepdives/warrior.js': 'export const warriorData = { tip: "Axe Specialization is great" };' };
    expect(() => runCheck54(fileMap)).toThrow(/Found obsolete weapon racial "Axe Specialization" in js\/data\/deepdives\/warrior\.js/);
  });

  collector.test('2.5 Mutation: Injecting "Sword Specialization" into rogue deep dive throws error', () => {
    const fileMap = { 'js/data/deepdives/rogue.js': '// Sword Specialization' };
    expect(() => runCheck54(fileMap)).toThrow(/Found obsolete weapon racial "Sword Specialization" in js\/data\/deepdives\/rogue\.js/);
  });
});

// ============================================================================
// SUITE 3: CHECK 55 (REMOVED TALENTS PURGE MUTATION TESTING)
// ============================================================================
collector.describe('Suite 3: Check 55 Removed Talents Purge Mutation Testing', () => {
  function runCheck55(talentsData) {
    const removedTalents = ['Call of Thunder', 'Shadow Affinity'];
    for (const [cls, cData] of Object.entries(talentsData)) {
      for (const t of cData.talents || []) {
        if (removedTalents.includes(t.name)) {
          throw new Error(`Found removed talent "${t.name}" in active ${cls} talent tree in talents-data.js`);
        }
      }
    }
  }

  collector.test('3.1 Baseline unmodified talentsData passes Check 55', () => {
    assertDoesNotThrow(() => runCheck55(productionData.talentsData), 'Check 55 baseline');
  });

  collector.test('3.2 Mutation: Injecting "Call of Thunder" into Shaman talents throws error', () => {
    const mutated = JSON.parse(JSON.stringify(productionData.talentsData));
    mutated.shaman.talents.push({ id: 9991, name: 'Call of Thunder', tree: 0, row: 3, col: 3, maxRank: 5 });
    expect(() => runCheck55(mutated)).toThrow(/Found removed talent "Call of Thunder" in active shaman talent tree/);
  });

  collector.test('3.3 Mutation: Injecting "Shadow Affinity" into Priest talents throws error', () => {
    const mutated = JSON.parse(JSON.stringify(productionData.talentsData));
    mutated.priest.talents.push({ id: 9992, name: 'Shadow Affinity', tree: 2, row: 1, col: 2, maxRank: 3 });
    expect(() => runCheck55(mutated)).toThrow(/Found removed talent "Shadow Affinity" in active priest talent tree/);
  });

  collector.test('3.4 Mutation: Injecting "Call of Thunder" into Druid talents throws error', () => {
    const mutated = JSON.parse(JSON.stringify(productionData.talentsData));
    mutated.druid.talents.push({ id: 9993, name: 'Call of Thunder', tree: 1, row: 2, col: 2, maxRank: 1 });
    expect(() => runCheck55(mutated)).toThrow(/Found removed talent "Call of Thunder" in active druid talent tree/);
  });
});

// ============================================================================
// SUITE 4: CHECK 56 (NEW TALENT NODES & METADATA MUTATION TESTING)
// ============================================================================
collector.describe('Suite 4: Check 56 New Talent Nodes Presence & Metadata Mutation Testing', () => {
  function runCheck56(talentsData) {
    const expectedNodes = [
      { cls: 'shaman', name: 'Elemental Mastery', tree: 0, row: 7, col: 2, maxRank: 1, req: 278 },
      { cls: 'mage', name: 'Arcane Wrath', tree: 0, row: 4, col: 4, maxRank: 1, req: null },
      { cls: 'priest', name: 'Dark Inspiration', tree: 2, row: 4, col: 1, maxRank: 5, req: null },
      { cls: 'warlock', name: 'Grim Reach', tree: 0, row: 4, col: 4, maxRank: 2, req: null }
    ];

    for (const expected of expectedNodes) {
      const classTalents = talentsData[expected.cls]?.talents || [];
      const node = classTalents.find(t => t.name === expected.name);
      if (!node) {
        throw new Error(`Missing expected new talent "${expected.name}" in ${expected.cls}`);
      }
      if (node.tree !== expected.tree || node.row !== expected.row || node.col !== expected.col) {
        throw new Error(`Talent "${expected.name}" position mismatch: expected tree ${expected.tree} row ${expected.row} col ${expected.col}, got tree ${node.tree} row ${node.row} col ${node.col}`);
      }
      if (node.maxRank !== expected.maxRank) {
        throw new Error(`Talent "${expected.name}" maxRank mismatch: expected ${expected.maxRank}, got ${node.maxRank}`);
      }
      if (node.req !== expected.req) {
        throw new Error(`Talent "${expected.name}" req mismatch: expected ${expected.req}, got ${node.req}`);
      }
      if (!Array.isArray(node.descriptions) || node.descriptions.length !== expected.maxRank) {
        throw new Error(`Talent "${expected.name}" descriptions count mismatch: expected ${expected.maxRank}, got ${node.descriptions?.length}`);
      }
    }
  }

  collector.test('4.1 Baseline unmodified talentsData passes Check 56', () => {
    assertDoesNotThrow(() => runCheck56(productionData.talentsData), 'Check 56 baseline');
  });

  collector.test('4.2 Mutation: Deleting "Elemental Mastery" from Shaman throws missing error', () => {
    const mutated = JSON.parse(JSON.stringify(productionData.talentsData));
    mutated.shaman.talents = mutated.shaman.talents.filter(t => t.name !== 'Elemental Mastery');
    expect(() => runCheck56(mutated)).toThrow(/Missing expected new talent "Elemental Mastery" in shaman/);
  });

  collector.test('4.3 Mutation: Altering "Arcane Wrath" row from 4 to 3 throws position mismatch error', () => {
    const mutated = JSON.parse(JSON.stringify(productionData.talentsData));
    const aw = mutated.mage.talents.find(t => t.name === 'Arcane Wrath');
    aw.row = 3;
    expect(() => runCheck56(mutated)).toThrow(/Talent "Arcane Wrath" position mismatch/);
  });

  collector.test('4.4 Mutation: Altering "Dark Inspiration" maxRank to 3 throws maxRank mismatch error', () => {
    const mutated = JSON.parse(JSON.stringify(productionData.talentsData));
    const di = mutated.priest.talents.find(t => t.name === 'Dark Inspiration');
    di.maxRank = 3;
    expect(() => runCheck56(mutated)).toThrow(/Talent "Dark Inspiration" maxRank mismatch: expected 5, got 3/);
  });

  collector.test('4.5 Mutation: Altering "Elemental Mastery" req to null throws req mismatch error', () => {
    const mutated = JSON.parse(JSON.stringify(productionData.talentsData));
    const em = mutated.shaman.talents.find(t => t.name === 'Elemental Mastery');
    em.req = null;
    expect(() => runCheck56(mutated)).toThrow(/Talent "Elemental Mastery" req mismatch: expected 278, got null/);
  });

  collector.test('4.6 Mutation: Truncating "Grim Reach" descriptions length throws descriptions count mismatch error', () => {
    const mutated = JSON.parse(JSON.stringify(productionData.talentsData));
    const gr = mutated.warlock.talents.find(t => t.name === 'Grim Reach');
    gr.descriptions = ['Only 1 rank description'];
    expect(() => runCheck56(mutated)).toThrow(/Talent "Grim Reach" descriptions count mismatch: expected 2, got 1/);
  });
});

// ============================================================================
// SUITE 5: CHECK 57 (REPLACEMENT RACIALS & 4-RACIAL SYMMETRY MUTATION TESTING)
// ============================================================================
collector.describe('Suite 5: Check 57 Replacement Racials & 4-Racial Symmetry Mutation Testing', () => {
  function runCheck57(races) {
    if (!Array.isArray(races) || races.length !== 9) {
      throw new Error(`Expected exactly 9 playable races in allRacesData, got ${races ? races.length : 0}`);
    }

    for (const race of races) {
      if (!Array.isArray(race.racials) || race.racials.length !== 4) {
        throw new Error(`Race ${race.name} does not have exactly 4 racials (got ${race.racials?.length})`);
      }
      const actives = race.racials.filter(r => (r.type || '').toLowerCase().includes('active'));
      const passives = race.racials.filter(r => (r.type || '').toLowerCase().includes('passive'));
      if (actives.length !== 2 || passives.length !== 2) {
        throw new Error(`Race ${race.name} violates 4-racial symmetry: expected 2 active and 2 passive, got ${actives.length} active and ${passives.length} passive`);
      }
    }

    const replacements = [
      { raceId: 'human', racialName: 'Ruthless' },
      { raceId: 'dwarf', racialName: 'Earth Fury' },
      { raceId: 'orc', racialName: 'Savage' },
      { raceId: 'skyborne', racialName: 'Read Leyline' }
    ];

    for (const req of replacements) {
      const race = races.find(r => r.id === req.raceId);
      if (!race) throw new Error(`Missing race ${req.raceId} in allRacesData`);
      const found = race.racials.find(r => r.name === req.racialName);
      if (!found) {
        throw new Error(`Missing replacement racial "${req.racialName}" on race ${race.name}`);
      }
    }
  }

  collector.test('5.1 Baseline unmodified racesData passes Check 57', () => {
    assertDoesNotThrow(() => runCheck57(productionData.racesData), 'Check 57 baseline');
  });

  collector.test('5.2 Mutation: Removing a race (length = 8) throws error', () => {
    const mutated = productionData.racesData.slice(1);
    expect(() => runCheck57(mutated)).toThrow(/Expected exactly 9 playable races in allRacesData, got 8/);
  });

  collector.test('5.3 Mutation: Adding a 5th racial to Human throws error', () => {
    const mutated = JSON.parse(JSON.stringify(productionData.racesData));
    const human = mutated.find(r => r.id === 'human');
    human.racials.push({ name: 'Extra Racial', type: 'Passive' });
    expect(() => runCheck57(mutated)).toThrow(/Race Human does not have exactly 4 racials \(got 5\)/);
  });

  collector.test('5.4 Mutation: Breaking 2A/2P symmetry (3 active, 1 passive on Dwarf) throws error', () => {
    const mutated = JSON.parse(JSON.stringify(productionData.racesData));
    const dwarf = mutated.find(r => r.id === 'dwarf');
    dwarf.racials[0].type = 'Active';
    dwarf.racials[1].type = 'Active';
    dwarf.racials[2].type = 'Active';
    dwarf.racials[3].type = 'Passive';
    expect(() => runCheck57(mutated)).toThrow(/Race Dwarf violates 4-racial symmetry: expected 2 active and 2 passive, got 3 active and 1 passive/);
  });

  collector.test('5.5 Mutation: Removing "Ruthless" from Human throws error', () => {
    const mutated = JSON.parse(JSON.stringify(productionData.racesData));
    const human = mutated.find(r => r.id === 'human');
    human.racials = human.racials.filter(r => r.name !== 'Ruthless');
    human.racials.push({ name: 'Dummy Passive', type: 'Passive' });
    expect(() => runCheck57(mutated)).toThrow(/Missing replacement racial "Ruthless" on race Human/);
  });

  collector.test('5.6 Mutation: Removing "Earth Fury" from Dwarf throws error', () => {
    const mutated = JSON.parse(JSON.stringify(productionData.racesData));
    const dwarf = mutated.find(r => r.id === 'dwarf');
    dwarf.racials = dwarf.racials.filter(r => r.name !== 'Earth Fury');
    dwarf.racials.push({ name: 'Dummy Passive', type: 'Passive' });
    expect(() => runCheck57(mutated)).toThrow(/Missing replacement racial "Earth Fury" on race Dwarf/);
  });

  collector.test('5.7 Mutation: Removing "Savage" from Orc throws error', () => {
    const mutated = JSON.parse(JSON.stringify(productionData.racesData));
    const orc = mutated.find(r => r.id === 'orc');
    orc.racials = orc.racials.filter(r => r.name !== 'Savage');
    orc.racials.push({ name: 'Dummy Passive', type: 'Passive' });
    expect(() => runCheck57(mutated)).toThrow(/Missing replacement racial "Savage" on race Orc/);
  });

  collector.test('5.8 Mutation: Removing "Read Leyline" from Skyborne throws error', () => {
    const mutated = JSON.parse(JSON.stringify(productionData.racesData));
    const skyborne = mutated.find(r => r.id === 'skyborne');
    skyborne.racials = skyborne.racials.filter(r => r.name !== 'Read Leyline');
    skyborne.racials.push({ name: 'Dummy Active', type: 'Active' });
    expect(() => runCheck57(mutated)).toThrow(/Missing replacement racial "Read Leyline" on race/);
  });
});

// ============================================================================
// SUITE 6: CHECK 58 (DEEP DIVE LEGALITY AUDIT & ADVERSARIAL STRESS TESTING)
// ============================================================================
collector.describe('Suite 6: Check 58 Deep Dive Build Legality & Talent Engine Stress Testing', () => {
  function runCheck58(deepdives, talentsData) {
    const targetClasses = ['druid', 'hunter', 'mage', 'paladin', 'priest', 'rogue', 'shaman', 'warlock', 'warrior'];
    let buildsAudited = 0;

    for (const cls of targetClasses) {
      const dd = deepdives[cls];
      if (!dd) throw new Error(`Missing deep dive dataset for class: ${cls}`);
      const classTalents = talentsData[cls]?.talents || [];
      if (classTalents.length === 0) throw new Error(`Missing talent database for class: ${cls}`);

      const specs = dd.betaBuilds?.level30?.specs || [];
      if (specs.length === 0) throw new Error(`No level 30 specs found in deep dive for ${cls}`);

      for (const spec of specs) {
        const buildUrl = spec.buildUrl || '';
        const match = buildUrl.match(/[?&](?:b|build)=([^&]+)/);
        const buildStr = match ? decodeURIComponent(match[1]) : buildUrl;
        if (!buildStr) {
          throw new Error(`Spec ${spec.name || spec.specId} in ${cls} has empty buildUrl`);
        }

        const points = parseBuildUrl(classTalents, buildStr);
        const totalPoints = getTotalPoints(points);

        if (totalPoints > 26) {
          throw new Error(`Build "${spec.name}" for ${cls} exceeds Level 30 cap (${totalPoints} > 26 points)`);
        }

        const audit = validateBuildLegality(classTalents, points, 26);
        if (!audit.valid) {
          throw new Error(`Build "${spec.name}" for ${cls} failed legality audit: ${audit.errors.join('; ')}`);
        }

        buildsAudited++;
      }
    }

    if (buildsAudited < 29) {
      throw new Error(`Insufficient builds audited: expected >= 29, got ${buildsAudited}`);
    }
    return buildsAudited;
  }

  collector.test('6.1 Baseline unmodified deep dives pass Check 58 and audits at least 29 builds', () => {
    const audited = runCheck58(productionData.deepdives, productionData.talentsData);
    expect(audited >= 29).toBeTruthy();
  });

  collector.test('6.2 Mutation: Build exceeding 26 points (27 allocated) is rejected by Check 58', () => {
    const mutatedDD = JSON.parse(JSON.stringify(productionData.deepdives));
    const shamanSpec = mutatedDD.shaman.betaBuilds.level30.specs[0];
    // Add extra point into tier 1 Ancestral Knowledge (-1500320311051122- gives 27 points)
    shamanSpec.buildUrl = '/talents/shaman?b=-1500320311051122-&l=30&tl=5';
    expect(() => runCheck58(mutatedDD, productionData.talentsData)).toThrow(/exceeds Level 30 cap \(27 > 26 points\)/);
  });

  collector.test('6.3 Mutation: Tier gating violation (Row 3 talent with only 5 points in tree) is rejected', () => {
    const shamanTalents = productionData.talentsData.shaman.talents;
    const testPoints = {};
    const conv = shamanTalents.find(t => t.tree === 0 && t.name === 'Convection');
    const ef = shamanTalents.find(t => t.tree === 0 && t.name === 'Elemental Focus');
    testPoints[conv.id] = 5;
    testPoints[ef.id] = 1;

    const audit = validateBuildLegality(shamanTalents, testPoints, 26);
    expect(audit.valid).toBe(false);
    expect(audit.errors.some(e => e.includes('Tree 0 Row 3 has 1 points allocated, but only 5 points in prior rows (requires 10)'))).toBeTruthy();
  });

  collector.test('6.4 Mutation: Tier gating violation in deep dive spec triggers Check 58 failure', () => {
    const mutatedDD = JSON.parse(JSON.stringify(productionData.deepdives));
    const shamanSpec = mutatedDD.shaman.betaBuilds.level30.specs[0];
    // Row 5 Stormstrike allocated with 0 points in tier 1-4
    shamanSpec.buildUrl = '/talents/shaman?b=-0000000000100000-&l=30&tl=5';
    expect(() => runCheck58(mutatedDD, productionData.talentsData)).toThrow(/failed legality audit: Tree 1 Row \d has 1 points allocated, but only 0 points in prior rows/);
  });

  collector.test('6.5 Mutation: Prerequisite violation (Elemental Mastery allocated without Lava Burst) is rejected', () => {
    const shamanTalents = productionData.talentsData.shaman.talents;
    const em = shamanTalents.find(t => t.name === 'Elemental Mastery');
    const testPoints = { [em.id]: 1 };

    const audit = validateBuildLegality(shamanTalents, testPoints, 51);
    expect(audit.valid).toBe(false);
    expect(audit.errors.some(e => e.includes('Talent "Elemental Mastery" requires maxed "Lava Burst" (0/4)'))).toBeTruthy();
  });

  collector.test('6.6 Mutation: Empty buildUrl in deep dive spec triggers Check 58 failure', () => {
    const mutatedDD = JSON.parse(JSON.stringify(productionData.deepdives));
    mutatedDD.warrior.betaBuilds.level30.specs[0].buildUrl = '';
    expect(() => runCheck58(mutatedDD, productionData.talentsData)).toThrow(/has empty buildUrl/);
  });

  collector.test('6.7 Mutation: Fewer than 25 builds audited triggers Check 58 failure', () => {
    const mutatedDD = JSON.parse(JSON.stringify(productionData.deepdives));
    mutatedDD.druid.betaBuilds.level30.specs = [];
    mutatedDD.hunter.betaBuilds.level30.specs = [];
    mutatedDD.mage.betaBuilds.level30.specs = [];
    expect(() => runCheck58(mutatedDD, productionData.talentsData)).toThrow(/No level 30 specs found in deep dive for druid/);
  });
});

// ============================================================================
// SUITE 7: LIVE SUBPROCESS TAMPER PROOF ON SCRIPTS/VALIDATE.JS
// ============================================================================
collector.describe('Suite 7: Live Subprocess Tamper Proof on scripts/validate.js', () => {
  collector.test('7.1 Subprocess execution of scripts/validate.js on clean repo exits with code 0', () => {
    let stdout = '';
    let exitCode = 0;
    try {
      stdout = execSync('node scripts/validate.js', { cwd: ROOT, encoding: 'utf8', stdio: 'pipe' });
    } catch (err) {
      exitCode = err.status || 1;
      stdout = err.stdout;
    }
    expect(exitCode).toBe(0);
    expect(stdout).toContain('Ran 58 checks. Failures: 0');
    expect(stdout).toContain('✓ All integrity and build checks passed!');
  });

  collector.test('7.2 Subprocess tamper: Injecting "Sword Specialization" into tools-data.js causes scripts/validate.js to fail with exit code 1 and trigger Check 54', () => {
    const toolsDataPath = path.join(ROOT, 'js', 'data', 'tools-data.js');
    const originalContent = fs.readFileSync(toolsDataPath, 'utf8');
    const corruptedContent = originalContent + '\n// Tamper test: Sword Specialization\n';
    try {
      fs.writeFileSync(toolsDataPath, corruptedContent, 'utf8');
      let failed = false;
      let errorOutput = '';
      try {
        execSync('node scripts/validate.js', { cwd: ROOT, encoding: 'utf8', stdio: 'pipe' });
      } catch (err) {
        failed = true;
        errorOutput = (err.stdout || '') + (err.stderr || '');
      }
      expect(failed).toBe(true);
      expect(errorOutput).toContain('✗ Obsolete weapon racials purge across races-classes.js, tools-data.js, and deep dive files: Found obsolete weapon racial "Sword Specialization" in js\\data\\tools-data.js');
      expect(errorOutput).toContain('Failures: 1');
    } finally {
      // Guaranteed restoration of original file
      fs.writeFileSync(toolsDataPath, originalContent, 'utf8');
    }
  });

  collector.test('7.3 Subprocess tamper: Injecting stale build 71890 into index.html causes scripts/validate.js to fail with exit code 1 and trigger Check 51', () => {
    const indexHtmlPath = path.join(ROOT, 'index.html');
    const originalContent = fs.readFileSync(indexHtmlPath, 'utf8');
    const corruptedContent = originalContent + '\n<!-- Stale build 71890 tamper test -->\n';
    try {
      fs.writeFileSync(indexHtmlPath, corruptedContent, 'utf8');
      let failed = false;
      let errorOutput = '';
      try {
        execSync('node scripts/validate.js', { cwd: ROOT, encoding: 'utf8', stdio: 'pipe' });
      } catch (err) {
        failed = true;
        errorOutput = (err.stdout || '') + (err.stderr || '');
      }
      expect(failed).toBe(true);
      expect(errorOutput).toContain('✗ Beta Build 1.60.1.70425 consistency across core-data.js and index.html without stale builds: Found stale build 71890 reference in index.html');
      expect(errorOutput).toContain('Failures: 1');
    } finally {
      // Guaranteed restoration of original file
      fs.writeFileSync(indexHtmlPath, originalContent, 'utf8');
    }
  });

  collector.test('7.4 Subprocess tamper: Corrupting shaman Level 30 build in deepdives/shaman.js causes scripts/validate.js to fail with exit code 1 and trigger Check 58', () => {
    const shamanDeepDivePath = path.join(ROOT, 'js', 'data', 'deepdives', 'shaman.js');
    const originalContent = fs.readFileSync(shamanDeepDivePath, 'utf8');
    const targetPattern = '"buildUrl": "/talents/shaman?b=-0500320311051122-&l=30&tl=5"';
    if (!originalContent.includes(targetPattern)) {
      throw new Error('Could not find target buildUrl pattern in shaman.js');
    }
    // Corrupt the buildUrl in shaman.js to overspent 27 points (-1500320311051122-)
    const corruptedContent = originalContent.replace(
      targetPattern,
      '"buildUrl": "/talents/shaman?b=-1500320311051122-&l=30&tl=5"'
    );
    try {
      fs.writeFileSync(shamanDeepDivePath, corruptedContent, 'utf8');
      let failed = false;
      let errorOutput = '';
      try {
        execSync('node scripts/validate.js', { cwd: ROOT, encoding: 'utf8', stdio: 'pipe' });
      } catch (err) {
        failed = true;
        errorOutput = (err.stdout || '') + (err.stderr || '');
      }
      expect(failed).toBe(true);
      expect(errorOutput).toContain('✗ Strict legality check on all Level 30 deep dive recommended builds in js/data/deepdives/');
      expect(errorOutput).toContain('exceeds Level 30 cap (27 > 26 points)');
      expect(errorOutput).toContain('Failures: 1');
    } finally {
      // Guaranteed restoration of original file
      fs.writeFileSync(shamanDeepDivePath, originalContent, 'utf8');
    }
  });
});

// ============================================================================
// EXECUTION SUMMARY & VERDICT
// ============================================================================
const summary = collector.getSummary();

console.log('----------------------------------------------------------------------');
console.log(` Suite: ${summary.suiteName}`);
console.log(` Tests: ${summary.total} | Passed: ${summary.passes} | Failed: ${summary.failures} (${summary.duration}ms)`);
console.log('----------------------------------------------------------------------\n');

if (summary.failures > 0) {
  console.error('======================================================================');
  console.error('   ADVERSARIAL CHALLENGER SUITE FAILED!');
  console.error('======================================================================\n');
  for (const t of summary.tests) {
    if (t.status === 'fail') {
      console.error(`✗ FAIL: ${t.name}`);
      console.error(`  Error: ${t.message}\n`);
    }
  }
  process.exit(1);
} else {
  console.log('======================================================================');
  console.log('   🎉 ALL ADVERSARIAL STRESS & MUTATION TESTS PASSED 100%!');
  console.log('======================================================================\n');
  process.exit(0);
}
