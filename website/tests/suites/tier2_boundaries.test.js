/**
 * Tier 2: Boundary & Corner Cases Test Suite
 * Covers 5 boundary categories with >= 5 test cases each:
 * 1. 0-point trees
 * 2. 21-point exact allocations
 * 3. Capstones without prerequisites
 * 4. Maximum rank edge cases
 * 5. Level 30 bounds & tier gating
 */

import { expect } from '../helpers/assertions.js';
import {
  canAllocatePoint,
  canRefundPoint,
  getTotalPoints,
  parseBuildUrl,
  serializeBuild,
  validateBuildLegality
} from '../helpers/talent-engine.js';

export function runTier2Tests(collector, data) {
  const { talentsData } = data;

  // =========================================================================
  // Category 1: 0-Point Trees
  // =========================================================================
  collector.describe('Tier 2.1: 0-Point Trees', () => {
    const warrior = talentsData.warrior?.talents || [];

    collector.test('2.1.1 Empty points map returns total points of 0', () => {
      const points = {};
      expect(getTotalPoints(points)).toBe(0);
    });

    collector.test('2.1.2 Serializing empty points map outputs empty tree segments "--"', () => {
      const points = {};
      const serialized = serializeBuild(warrior, points);
      expect(serialized).toBe('--');
    });

    collector.test('2.1.3 Parsing empty build string produces 0 total allocated points', () => {
      const parsed = parseBuildUrl(warrior, '--');
      expect(getTotalPoints(parsed)).toBe(0);
    });

    collector.test('2.1.4 Refunding point on a 0-point talent is blocked by canRefundPoint', () => {
      const points = {};
      const firstTalent = warrior[0];
      const result = canRefundPoint(warrior, points, firstTalent.id);
      expect(result.allowed).toBeFalsy();
      expect(result.reason).toMatch(/No points invested/i);
    });

    collector.test('2.1.5 Empty 0-point build passes full legality audit without errors', () => {
      const points = {};
      const result = validateBuildLegality(warrior, points, 26);
      expect(result.valid).toBeTruthy();
      expect(result.errors.length).toBe(0);
    });
  });

  // =========================================================================
  // Category 2: 21-Point Exact Allocations (Level 30 Baseline Cap)
  // =========================================================================
  collector.describe('Tier 2.2: 21-Point Exact Allocations', () => {
    collector.test('2.2.1 Exactly 21 points allocated to Warrior Arms tree passes legality audit', () => {
      const warrior = talentsData.warrior?.talents || [];
      const points = {
        2: 3,  // Deflection (3/5) -> Row 1 has 6 (with Imp Rend)
        3: 3,  // Imp Rend (3/3)
        5: 5,  // Imp Tactical Mastery (5/5) -> Row 2 has 5
        7: 1,  // Anger Management (1/1)
        8: 3,  // Deep Wounds (3/3)
        10: 3, // Two-Handed Weapon Spec (3/3)
        11: 2, // Impale (2/2) -> Row 4 has 5
        13: 1  // Sweeping Strikes (1/1) -> Row 5 has 1
      };
      expect(getTotalPoints(points)).toBe(21);
      const audit = validateBuildLegality(warrior, points, 21);
      expect(audit.valid).toBeTruthy();
    });

    collector.test('2.2.2 Exactly 21 points allocated to Mage Frost tree passes legality audit', () => {
      const mage = talentsData.mage?.talents || [];
      const points = {
        349: 5, // Improved Frostbolt (5/5) -> Row 1 has 5
        351: 5, // Ice Shards (5/5) -> Row 2 has 5
        356: 3, // Frost Channeling (3/3)
        357: 1, // Ice Lance (1/1)
        358: 1, // Improved Blizzard (1/3) -> Row 3 has 5
        360: 1, // Ice Block (1/1)
        361: 3, // Shatter (3/3)
        359: 1, // Arctic Reach (1/2) -> Row 4 has 5
        363: 1  // Cold Snap (1/1) -> Row 5 has 1
      };
      expect(getTotalPoints(points)).toBe(21);
      const audit = validateBuildLegality(mage, points, 21);
      expect(audit.valid).toBeTruthy();
    });

    collector.test('2.2.3 Exactly 21 points allocated to Priest Shadow passes legality audit', () => {
      const priest = talentsData.priest?.talents || [];
      const points = {
        247: 5, // Spirit Tap (5/5) -> Row 1 has 5
        249: 2, // Imp SW:P (2/2)
        250: 2, // Shadow Reach (2/2)
        251: 5, // Imp Mind Blast (5/5) -> Row 2 has 9
        253: 1, // Mind Flay (1/1)
        254: 1, // Imp Mind Flay (1/2) -> Row 3 has 2
        256: 1, // Vampiric Embrace (1/1)
        257: 3, // Shadow Weaving (3/3) -> Row 4 has 4
        258: 1  // Silence (1/1) -> Row 5 has 1
      };
      expect(getTotalPoints(points)).toBe(21);
      const audit = validateBuildLegality(priest, points, 21);
      expect(audit.valid).toBeTruthy();
    });

    collector.test('2.2.4 Exactly 21 points allocated to Rogue Assassination passes legality audit', () => {
      const rogue = talentsData.rogue?.talents || [];
      const points = {
        159: 5, // Malice (5/5) -> Row 1 has 5
        160: 3, // Ruthlessness (3/3)
        161: 2, // Murder (2/2) -> Row 2 has 5
        163: 1, // Relentless Strikes (1/1)
        165: 4, // Lethality (4/5) -> Row 3 has 5
        167: 1, // Cold Blood (1/1)
        166: 4, // Vile Poisons (4/5) -> Row 4 has 5
        170: 1  // Mutilate (1/1) -> Row 5 has 1
      };
      expect(getTotalPoints(points)).toBe(21);
      const audit = validateBuildLegality(rogue, points, 21);
      expect(audit.valid).toBeTruthy();
    });

    collector.test('2.2.5 Allocating a 22nd point when maxBudget is 21 is blocked by canAllocatePoint', () => {
      const warrior = talentsData.warrior?.talents || [];
      const arms = warrior.filter(t => t.tree === 0).sort((a, b) => a.row - b.row || a.col - b.col);
      const points = {};
      points[arms[0].id] = 3;
      points[arms[1].id] = 2;
      points[arms[2].id] = 5;
      points[arms[5].id] = 5;
      points[arms[7].id] = 5;
      points[arms[9].id] = 1; // Exactly 21

      const result = canAllocatePoint(warrior, points, arms[3].id, 21);
      expect(result.allowed).toBeFalsy();
      expect(result.reason).toMatch(/Exceeds max talent budget/i);
    });
  });

  // =========================================================================
  // Category 3: Capstones Without Prerequisites
  // =========================================================================
  collector.describe('Tier 2.3: Capstones Without Prerequisites', () => {
    collector.test('2.3.1 Investing in Shaman Elemental Mastery (Row 7) without 4/4 Lava Burst is blocked', () => {
      const shaman = talentsData.shaman?.talents || [];
      const em = shaman.find(t => t.name === 'Elemental Mastery');
      expect(em).toBeDefined();

      // Set up 30 points in Elemental, but 0 in Lava Burst
      const points = {};
      const elem = shaman.filter(t => t.tree === 0 && t.name !== 'Lava Burst' && t.name !== 'Elemental Mastery');
      let allocated = 0;
      for (const t of elem) {
        if (allocated >= 30) break;
        const add = Math.min(t.maxRank, 30 - allocated);
        // Ensure tier gate
        if (allocated >= (t.row - 1) * 5) {
          points[t.id] = add;
          allocated += add;
        }
      }

      const res = canAllocatePoint(shaman, points, em.id, 51);
      expect(res.allowed).toBeFalsy();
      expect(res.reason).toMatch(/Prerequisite/i);
    });

    collector.test('2.3.2 Investing in Shaman Elemental Fury (Row 6) without 3/3 Lightning Overload is blocked', () => {
      const shaman = talentsData.shaman?.talents || [];
      const ef = shaman.find(t => t.name === 'Elemental Fury');
      expect(ef).toBeDefined();

      // Allocate 25 points in Elemental without Lightning Overload
      const points = {};
      const elem = shaman.filter(t => t.tree === 0 && t.name !== 'Lightning Overload' && t.row < 6);
      let allocated = 0;
      for (const t of elem) {
        if (allocated >= 25) break;
        const add = Math.min(t.maxRank, 25 - allocated);
        if (allocated >= (t.row - 1) * 5) {
          points[t.id] = add;
          allocated += add;
        }
      }

      const res = canAllocatePoint(shaman, points, ef.id, 51);
      expect(res.allowed).toBeFalsy();
      expect(res.reason).toMatch(/Prerequisite/i);
    });

    collector.test('2.3.3 Investing in Shaman Lightning Overload (Row 5) without 3/3 Elemental Alacrity is blocked', () => {
      const shaman = talentsData.shaman?.talents || [];
      const lo = shaman.find(t => t.name === 'Lightning Overload');
      expect(lo).toBeDefined();

      const points = {};
      const elem = shaman.filter(t => t.tree === 0 && t.name !== 'Elemental Alacrity' && t.row < 5);
      let allocated = 0;
      for (const t of elem) {
        if (allocated >= 20) break;
        const add = Math.min(t.maxRank, 20 - allocated);
        if (allocated >= (t.row - 1) * 5) {
          points[t.id] = add;
          allocated += add;
        }
      }

      const res = canAllocatePoint(shaman, points, lo.id, 51);
      expect(res.allowed).toBeFalsy();
      expect(res.reason).toMatch(/Prerequisite/i);
    });

    collector.test('2.3.4 Investing in Priest Soul Warding (Row 4) with incomplete Improved PW:S (2/3) is blocked', () => {
      const priest = talentsData.priest?.talents || [];
      const sw = priest.find(t => t.name === 'Soul Warding');
      const ipws = priest.find(t => t.name === 'Improved Power Word: Shield');
      expect(sw).toBeDefined();
      expect(ipws).toBeDefined();

      const points = {};
      const disc = priest.filter(t => t.tree === 0 && t.id !== sw.id && t.id !== ipws.id);
      let allocated = 0;
      for (const t of disc) {
        if (allocated >= 13) break;
        const add = Math.min(t.maxRank, 13 - allocated);
        if (allocated >= (t.row - 1) * 5) {
          points[t.id] = add;
          allocated += add;
        }
      }
      points[ipws.id] = 2; // Incomplete (2/3)

      const res = canAllocatePoint(priest, points, sw.id, 51);
      expect(res.allowed).toBeFalsy();
      expect(res.reason).toMatch(/Prerequisite/i);
    });

    collector.test('2.3.5 Investing in Hunter Rapid Recuperation (Row 5) without 2/2 Rapid Killing is blocked', () => {
      const hunter = talentsData.hunter?.talents || [];
      const rr = hunter.find(t => t.name === 'Rapid Recuperation');
      const rk = hunter.find(t => t.name === 'Rapid Killing');
      expect(rr).toBeDefined();
      expect(rk).toBeDefined();

      const points = {};
      const mm = hunter.filter(t => t.tree === 1 && t.id !== rr.id && t.id !== rk.id);
      let allocated = 0;
      for (const t of mm) {
        if (allocated >= 20) break;
        const add = Math.min(t.maxRank, 20 - allocated);
        if (allocated >= (t.row - 1) * 5) {
          points[t.id] = add;
          allocated += add;
        }
      }

      const res = canAllocatePoint(hunter, points, rr.id, 51);
      expect(res.allowed).toBeFalsy();
      expect(res.reason).toMatch(/Prerequisite/i);
    });
  });

  // =========================================================================
  // Category 4: Maximum Rank Edge Cases
  // =========================================================================
  collector.describe('Tier 2.4: Maximum Rank Edge Cases', () => {
    collector.test('2.4.1 Overspending on 1-rank talent (attempting rank 2/1) is blocked', () => {
      const mage = talentsData.mage?.talents || [];
      const aw = mage.find(t => t.name === 'Arcane Wrath');
      expect(aw).toBeDefined();
      expect(aw.maxRank).toBe(1);

      const points = { [aw.id]: 1 };
      const res = canAllocatePoint(mage, points, aw.id, 51);
      expect(res.allowed).toBeFalsy();
      expect(res.reason).toMatch(/Already at maxRank/i);
    });

    collector.test('2.4.2 Overspending on 2-rank talent (attempting rank 3/2 on Grim Reach) is blocked', () => {
      const warlock = talentsData.warlock?.talents || [];
      const gr = warlock.find(t => t.name === 'Grim Reach');
      expect(gr).toBeDefined();
      expect(gr.maxRank).toBe(2);

      const points = { [gr.id]: 2 };
      const res = canAllocatePoint(warlock, points, gr.id, 51);
      expect(res.allowed).toBeFalsy();
      expect(res.reason).toMatch(/Already at maxRank/i);
    });

    collector.test('2.4.3 Overspending on 3-rank talent (attempting rank 4/3 on Fire Power) is blocked', () => {
      const mage = talentsData.mage?.talents || [];
      const fp = mage.find(t => t.name === 'Fire Power');
      expect(fp).toBeDefined();
      expect(fp.maxRank).toBe(3);

      const points = { [fp.id]: 3 };
      const res = canAllocatePoint(mage, points, fp.id, 51);
      expect(res.allowed).toBeFalsy();
      expect(res.reason).toMatch(/Already at maxRank/i);
    });

    collector.test('2.4.4 Overspending on 4-rank talent (attempting rank 5/4 on Lava Burst) is blocked', () => {
      const shaman = talentsData.shaman?.talents || [];
      const lb = shaman.find(t => t.name === 'Lava Burst');
      expect(lb).toBeDefined();
      expect(lb.maxRank).toBe(4);

      const points = { [lb.id]: 4 };
      const res = canAllocatePoint(shaman, points, lb.id, 51);
      expect(res.allowed).toBeFalsy();
      expect(res.reason).toMatch(/Already at maxRank/i);
    });

    collector.test('2.4.5 Overspending on 3-rank talent (attempting rank 4/3 on Critical Mass) is blocked', () => {
      const mage = talentsData.mage?.talents || [];
      const cm = mage.find(t => t.name === 'Critical Mass');
      expect(cm).toBeDefined();
      expect(cm.maxRank).toBe(3);

      const points = { [cm.id]: 3 };
      const res = canAllocatePoint(mage, points, cm.id, 51);
      expect(res.allowed).toBeFalsy();
      expect(res.reason).toMatch(/Already at maxRank/i);
    });
  });

  // =========================================================================
  // Category 5: Level 30 Bounds & Tier Gating
  // =========================================================================
  collector.describe('Tier 2.5: Level 30 Bounds & Tier Gating Bounds', () => {
    const shaman = talentsData.shaman?.talents || [];
    const elem = shaman.filter(t => t.tree === 0);

    collector.test('2.5.1 Row 2 Gating Bound: spending in Row 2 with 4 tree points (requires 5) is rejected', () => {
      const r1 = elem.find(t => t.row === 1);
      const r2 = elem.find(t => t.row === 2);
      const points = { [r1.id]: 4 };

      const res = canAllocatePoint(shaman, points, r2.id, 26);
      expect(res.allowed).toBeFalsy();
      expect(res.reason).toMatch(/Tier gating unmet/i);
    });

    collector.test('2.5.2 Row 3 Gating Bound: spending in Row 3 with 9 tree points (requires 10) is rejected', () => {
      const r1 = elem.filter(t => t.row === 1);
      const r2 = elem.filter(t => t.row === 2);
      const r3 = elem.find(t => t.row === 3);

      const points = { [r1[0].id]: 5, [r2[0].id]: 4 }; // 9 total
      const res = canAllocatePoint(shaman, points, r3.id, 26);
      expect(res.allowed).toBeFalsy();
      expect(res.reason).toMatch(/Tier gating unmet/i);
    });

    collector.test('2.5.3 Row 4 Gating Bound: spending in Row 4 with 14 tree points (requires 15) is rejected', () => {
      const r1 = elem.filter(t => t.row === 1);
      const r2 = elem.filter(t => t.row === 2);
      const r3 = elem.filter(t => t.row === 3);
      const r4 = elem.find(t => t.row === 4);

      const points = { [r1[0].id]: 5, [r2[0].id]: 5, [r3[0].id]: 4 }; // 14 total
      const res = canAllocatePoint(shaman, points, r4.id, 26);
      expect(res.allowed).toBeFalsy();
      expect(res.reason).toMatch(/Tier gating unmet/i);
    });

    collector.test('2.5.4 Row 5 Gating Bound: spending in Row 5 with 19 tree points (requires 20) is rejected', () => {
      const r1 = elem.filter(t => t.row === 1);
      const r2 = elem.filter(t => t.row === 2);
      const r3 = elem.filter(t => t.row === 3);
      const r4 = elem.filter(t => t.row === 4);
      const r5 = elem.find(t => t.row === 5);

      const points = { [r1[0].id]: 5, [r2[0].id]: 5, [r3[0].id]: 5, [r4[0].id]: 4 }; // 19 total
      const res = canAllocatePoint(shaman, points, r5.id, 26);
      expect(res.allowed).toBeFalsy();
      expect(res.reason).toMatch(/Tier gating unmet/i);
    });

    collector.test('2.5.5 Level 30 Max Bound: spending 27th point when maxBudget is 26 is rejected', () => {
      const r1 = elem.filter(t => t.row === 1);
      const r2 = elem.filter(t => t.row === 2);
      const r3 = elem.filter(t => t.row === 3);
      const r4 = elem.filter(t => t.row === 4);
      const r5 = elem.filter(t => t.row === 5);

      const points = {
        [r1[0].id]: 5,
        [r1[1].id]: 5,
        [r2[0].id]: 5,
        [r2[1].id]: 5,
        [r3[0].id]: 3,
        [r4[0].id]: 3
      }; // 26 total

      expect(getTotalPoints(points)).toBe(26);
      const res = canAllocatePoint(shaman, points, r5[0].id, 26);
      expect(res.allowed).toBeFalsy();
      expect(res.reason).toMatch(/Exceeds max talent budget/i);
    });
  });
}
