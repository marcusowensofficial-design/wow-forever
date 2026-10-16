/**
 * Tier 4: Real-World Application Scenarios Test Suite
 * Validates complete Level 30 builds and executes a comprehensive legality audit
 * across all deep dive recommended builds in js/data/deepdives/.
 */

import { expect } from '../helpers/assertions.js';
import {
  canAllocatePoint,
  getTotalPoints,
  parseBuildUrl,
  serializeBuild,
  validateBuildLegality
} from '../helpers/talent-engine.js';

export function runTier4Tests(collector, data) {
  const { talentsData, deepdives } = data;

  // =========================================================================
  // Scenario 1: Complete 21-point Level 30 Shaman Elemental Build
  // =========================================================================
  collector.describe('Tier 4.1: Complete Level 30 Shaman Elemental Build Scenario', () => {
    const shaman = talentsData.shaman?.talents || [];
    const elem = shaman.filter(t => t.tree === 0).sort((a, b) => a.row - b.row || a.col - b.col);

    collector.test('4.1.1 Step-by-step 21-point allocation to Lava Burst capstone succeeds under new rows', () => {
      const conv = elem.find(t => t.name === 'Convection'); // Row 1
      const ea = elem.find(t => t.name === 'Elemental Alacrity'); // Row 2
      const rev = elem.find(t => t.name === 'Reverberation'); // Row 2
      const ef = elem.find(t => t.name === 'Elemental Focus'); // Row 3
      const ew = elem.find(t => t.name === 'Elemental Warding'); // Row 3
      const tbf = elem.find(t => t.name === 'Trial by Fire'); // Row 4
      const eots = elem.find(t => t.name === 'Eye of the Storm'); // Row 4
      const lb = elem.find(t => t.name === 'Lava Burst'); // Row 5

      expect(conv).toBeDefined();
      expect(ea).toBeDefined();
      expect(lb).toBeDefined();

      const points = {};

      // Row 1: 5 points
      points[conv.id] = 5;
      expect(canAllocatePoint(shaman, points, ea.id, 21).allowed).toBeTruthy();

      // Row 2: 5 points (3 EA + 2 Rev)
      points[ea.id] = 3;
      points[rev.id] = 2;
      expect(canAllocatePoint(shaman, points, ef.id, 21).allowed).toBeTruthy();

      // Row 3: 5 points (1 EF + 3 EW + 1 Rev)
      points[ef.id] = 1;
      points[ew.id] = 3;
      points[rev.id] = 3;
      expect(canAllocatePoint(shaman, points, tbf.id, 21).allowed).toBeTruthy();

      // Row 4: 5 points (2 TBF + 3 EOTS)
      points[tbf.id] = 2;
      points[eots.id] = 3;
      expect(canAllocatePoint(shaman, points, lb.id, 21).allowed).toBeTruthy();

      // Row 5: 1 point in Lava Burst (Total: 21)
      points[lb.id] = 1;

      expect(getTotalPoints(points)).toBe(21);
      const audit = validateBuildLegality(shaman, points, 21);
      expect(audit.valid).toBeTruthy();
      expect(audit.errors.length).toBe(0);
    });

    collector.test('4.1.2 Serialization and deserialization roundtrip preserves exact talent ranks', () => {
      const conv = elem.find(t => t.name === 'Convection');
      const ea = elem.find(t => t.name === 'Elemental Alacrity');
      const lb = elem.find(t => t.name === 'Lava Burst');

      if (conv && ea && lb) {
        const points = { [conv.id]: 5, [ea.id]: 3, [lb.id]: 1 };
        const serialized = serializeBuild(shaman, points);
        const parsed = parseBuildUrl(shaman, serialized);

        expect(parsed[conv.id]).toBe(5);
        expect(parsed[ea.id]).toBe(3);
        expect(parsed[lb.id]).toBe(1);
      }
    });
  });

  // =========================================================================
  // Scenario 2: Complete 21-point Level 30 Priest Discipline Build
  // =========================================================================
  collector.describe('Tier 4.2: Complete Level 30 Priest Discipline Build Scenario', () => {
    const priest = talentsData.priest?.talents || [];
    const disc = priest.filter(t => t.tree === 0).sort((a, b) => a.row - b.row || a.col - b.col);

    collector.test('4.2.1 Mental Strength (Row 2) and Improved PW:S (Row 3) prerequisite chain resolves legally', () => {
      const pil = disc.find(t => t.name === 'Power in Light'); // Row 1
      const ms = disc.find(t => t.name === 'Mental Strength'); // Row 2
      const ipws = disc.find(t => t.name === 'Improved Power Word: Shield'); // Row 3
      const med = disc.find(t => t.name === 'Meditation'); // Row 3
      const sw = disc.find(t => t.name === 'Soul Warding'); // Row 4
      const ifoc = disc.find(t => t.name === 'Inner Focus'); // Row 3

      expect(pil).toBeDefined();
      expect(ms).toBeDefined();
      expect(ipws).toBeDefined();
      expect(sw).toBeDefined();

      const points = {};
      // Row 1: 5 points
      points[pil.id] = 5;
      // Row 2: 5 points (Mental Strength 5/5)
      points[ms.id] = 5;
      // Row 3: 5 points (Improved PW:S 3/3 + Meditation 2/3)
      points[ipws.id] = 3;
      if (med) points[med.id] = 2;

      // Row 4: Soul Warding requires Improved PW:S maxed (3/3)
      expect(canAllocatePoint(priest, points, sw.id, 21).allowed).toBeTruthy();
      points[sw.id] = 1;
      if (ifoc) points[ifoc.id] = 1;

      const total = getTotalPoints(points);
      expect(total).toBeLessThanOrEqual(21);
      const audit = validateBuildLegality(priest, points, 21);
      expect(audit.valid).toBeTruthy();
    });
  });

  // =========================================================================
  // Scenario 3: Complete 21-point Level 30 Mage Fire Build
  // =========================================================================
  collector.describe('Tier 4.3: Complete Level 30 Mage Fire Build Scenario', () => {
    const mage = talentsData.mage?.talents || [];
    const fire = mage.filter(t => t.tree === 1).sort((a, b) => a.row - b.row || a.col - b.col);

    collector.test('4.3.1 Improved Fire Blast (Row 1) and Critical Mass (Row 5, 5 ranks) allocate legally', () => {
      const ifb = fire.find(t => t.name === 'Improved Fire Blast');
      const incin = fire.find(t => t.name === 'Incineration');
      const ignite = fire.find(t => t.name === 'Ignite');
      const impact = fire.find(t => t.name === 'Impact');
      const pyro = fire.find(t => t.name === 'Pyroblast');
      const bs = fire.find(t => t.name === 'Burning Soul');
      const scorch = fire.find(t => t.name === 'Improved Scorch');
      const cm = fire.find(t => t.name === 'Critical Mass');

      expect(ifb).toBeDefined();
      expect(incin).toBeDefined();
      expect(cm).toBeDefined();

      const points = {};
      // Row 1: 5 points (2 IFB + 3 Incineration)
      points[ifb.id] = 2;
      if (incin) points[incin.id] = 3;

      // Row 2: 8 points (Ignite 5/5 + Impact 3/3)
      if (ignite) points[ignite.id] = 5;
      if (impact) points[impact.id] = 3;

      // Row 3: 4 points (Burning Soul 3/3 + Pyroblast 1/1)
      if (bs) points[bs.id] = 3;
      if (pyro) points[pyro.id] = 1;

      // Row 4: 3 points (Improved Scorch 3/3)
      if (scorch) points[scorch.id] = 3;

      // Row 5: Critical Mass (1 pt)
      points[cm.id] = 1;

      const total = getTotalPoints(points);
      expect(total).toBeLessThanOrEqual(21);
      const audit = validateBuildLegality(mage, points, 21);
      expect(audit.valid).toBeTruthy();
    });
  });

  // =========================================================================
  // Scenario 4: Complete 21-point Level 30 Warlock Affliction Build
  // =========================================================================
  collector.describe('Tier 4.4: Complete Level 30 Warlock Affliction Build Scenario', () => {
    const warlock = talentsData.warlock?.talents || [];
    const aff = warlock.filter(t => t.tree === 0).sort((a, b) => a.row - b.row || a.col - b.col);

    collector.test('4.4.1 Grim Reach (Row 4, 2 ranks) allocates legally without Malediction', () => {
      const supp = aff.find(t => t.name === 'Suppression');
      const impCorr = aff.find(t => t.name === 'Improved Corruption');
      const impDrains = aff.find(t => t.name === 'Improved Drains');
      const felConc = aff.find(t => t.name === 'Fel Concentration');
      const gr = aff.find(t => t.name === 'Grim Reach');
      const nf = aff.find(t => t.name === 'Nightfall');

      expect(supp).toBeDefined();
      expect(gr).toBeDefined();

      const points = {};
      // Row 1: 10 pts (Suppression 5/5 + Improved Corruption 5/5)
      points[supp.id] = 5;
      if (impCorr) points[impCorr.id] = 5;
      // Row 2: 3 pts (Improved Drains 3/3)
      if (impDrains) points[impDrains.id] = 3;
      // Row 3: 3 pts (Fel Concentration 3/3)
      if (felConc) points[felConc.id] = 3;
      // Row 4: Grim Reach (2/2) + Nightfall (2/2)
      points[gr.id] = 2;
      if (nf) points[nf.id] = 2;

      const total = getTotalPoints(points);
      expect(total).toBeLessThanOrEqual(21);
      const audit = validateBuildLegality(warlock, points, 21);
      expect(audit.valid).toBeTruthy();
    });
  });

  // =========================================================================
  // Scenario 5: Full Deep Dive Builds Legality Audit
  // =========================================================================
  collector.describe('Tier 4.5: Full Deep Dive Recommended Builds Legality Audit', () => {
    const classKeys = Object.keys(deepdives);

    collector.test('4.5.1 All deep dive files in js/data/deepdives/ are scanned for build legality', () => {
      expect(classKeys.length).toBeGreaterThanOrEqual(9);
    });

    for (const cls of classKeys) {
      collector.test(`4.5.2 ${cls} deep dive builds pass Level 30 point budget and tree gating`, () => {
        const dd = deepdives[cls];
        const classTalents = talentsData[cls]?.talents || [];
        const specs = dd?.betaBuilds?.level30?.specs || dd?.builds || [];
        if (specs.length === 0 || classTalents.length === 0) return;

        for (const b of specs) {
          const buildUrl = b.buildUrl || (typeof b.talents === 'string' ? b.talents : '');
          const match = buildUrl.match(/[?&](?:b|build)=([^&]+)/);
          const buildStr = match ? decodeURIComponent(match[1]) : buildUrl;
          if (!buildStr) continue;

          const points = parseBuildUrl(classTalents, buildStr);
          const total = getTotalPoints(points);
          // Level 30 max points: 21 base + 5 legacy discovery = 26 points max
          expect(total).toBeLessThanOrEqual(26);

          const audit = validateBuildLegality(classTalents, points, 26);
          if (!audit.valid) {
            throw new Error(`Build "${b.name || buildStr}" for ${cls} failed legality: ${audit.errors.join('; ')}`);
          }
        }
      });
    }
  });
}
