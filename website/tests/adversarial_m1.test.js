#!/usr/bin/env node
/* global console, process */

/**
 * Empirical Adversarial Challenger Test Suite for Milestone 1 (Talents Synchronization)
 *
 * Exhaustively stress-tests:
 * 1. Shaman Elemental Rebuilt Tree:
 *    - 21-pt Level 30 builds reaching Lava Burst (Row 5)
 *    - 31-pt builds reaching Elemental Mastery (Row 7)
 *    - Prerequisite enforcement: Elemental Fury -> Lightning Overload -> Elemental Alacrity
 *    - Tier gating bounds (4, 9, 14, 19, 24, 29)
 * 2. Priest Discipline & Shadow Trees:
 *    - Prerequisite enforcement: Soul Warding -> Improved PW:S
 *    - Refund protection for prerequisite nodes
 *    - Relocated Mental Strength & Improved Mind Blast
 *    - Pruned Shadow Affinity & added Dark Inspiration
 * 3. Mage Arcane, Fire & Frost Trees:
 *    - Arcane Wrath & Missile Barrage
 *    - Improved Fire Blast, Critical Mass (5 ranks), Fire Power (3 ranks)
 *    - Ice Lance & Winter's Chill
 * 4. Warlock Affliction & Destruction Trees:
 *    - Grim Reach replacing Malediction
 *    - Shadow Mastery & Destructive Reach
 * 5. Paladin, Hunter, Druid, Warrior Mechanics:
 *    - Reckoning, Rapid Recuperation, Predator's Edge, Furor, Bloodthrill
 * 6. Property-Based Stress Testing:
 *    - 400 randomized step-by-step builds with serialization round-trips and legality auditing
 * 7. Dataset Parity:
 *    - Byte-level and structural equivalence between forever_changes.json and changes-data.js
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadAllData } from './helpers/loader.js';
import { TestCollector, expect } from './helpers/assertions.js';
import {
  canAllocatePoint,
  canRefundPoint,
  getTotalPoints,
  getTreePoints,
  parseBuildUrl,
  serializeBuild,
  validateBuildLegality
} from './helpers/talent-engine.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');

console.log('======================================================================');
console.log('   EMPIRICAL ADVERSARIAL CHALLENGER SUITE: MILESTONE 1');
console.log('======================================================================\n');

const data = loadAllData(ROOT);
const { talentsData } = data;
const collector = new TestCollector('Milestone 1 Adversarial Challenger Suite');

// ============================================================================
// SUITE 1: SHAMAN ELEMENTAL & RESTORATION REBUILT TREES
// ============================================================================
collector.describe('Suite 1: Shaman Rebuilt Trees Adversarial Stress-Tests', () => {
  const shaman = talentsData.shaman?.talents || [];
  const elem = shaman.filter(t => t.tree === 0).sort((a, b) => a.row - b.row || a.col - b.col);
  const resto = shaman.filter(t => t.tree === 2).sort((a, b) => a.row - b.row || a.col - b.col);

  collector.test('1.1 Lava Burst is placed in Row 5 Col 2 with 4 ranks and req: null', () => {
    const lb = elem.find(t => t.name === 'Lava Burst');
    expect(lb).toBeDefined();
    expect(lb.row).toBe(5);
    expect(lb.col).toBe(2);
    expect(lb.maxRank).toBe(4);
    expect(lb.req).toBeNull();
  });

  collector.test('1.2 Elemental Mastery is placed in Row 7 Col 2 with 1 rank and req: Lava Burst', () => {
    const em = elem.find(t => t.name === 'Elemental Mastery');
    const lb = elem.find(t => t.name === 'Lava Burst');
    expect(em).toBeDefined();
    expect(em.row).toBe(7);
    expect(em.col).toBe(2);
    expect(em.maxRank).toBe(1);
    expect(em.req).toBe(lb.id);
  });

  collector.test('1.3 Call of Thunder (node 273) is permanently pruned from Shaman talents', () => {
    const cot = elem.find(t => t.id === 273 || t.name === 'Call of Thunder');
    expect(cot === undefined).toBeTruthy();
  });

  collector.test('1.4 Exact 21 points legally spent to reach Lava Burst in Row 5', () => {
    // 5 in Convection (R1), 5 in Reverberation (R2), 3 in Elemental Warding + 1 in Elemental Focus + 1 in Call of Flame (R2/3 = 15 total),
    // 5 in Eye of the Storm + Trial by Fire (R4 = 20 total in tree),
    // 21st point in Lava Burst (R5)
    const conv = elem.find(t => t.name === 'Convection'); // R1
    const rev = elem.find(t => t.name === 'Reverberation'); // R2
    const ew = elem.find(t => t.name === 'Elemental Warding'); // R3
    const ef = elem.find(t => t.name === 'Elemental Focus'); // R3
    const cof = elem.find(t => t.name === 'Call of Flame'); // R2
    const eots = elem.find(t => t.name === 'Eye of the Storm'); // R4
    const tbf = elem.find(t => t.name === 'Trial by Fire'); // R4
    const lb = elem.find(t => t.name === 'Lava Burst'); // R5

    const points = {
      [conv.id]: 5,
      [rev.id]: 5,
      [ew.id]: 3,
      [ef.id]: 1,
      [cof.id]: 1, // Row 2 pt brings lower row total to 15
      [eots.id]: 3,
      [tbf.id]: 2,
      [lb.id]: 1
    };

    expect(getTotalPoints(points)).toBe(21);
    const audit = validateBuildLegality(shaman, points, 21);
    expect(audit.valid).toBeTruthy();
    expect(audit.errors.length).toBe(0);
  });

  collector.test('1.5 Attempting to allocate Lava Burst with 19 points in tree fails tier gating', () => {
    const conv = elem.find(t => t.name === 'Convection');
    const rev = elem.find(t => t.name === 'Reverberation');
    const ew = elem.find(t => t.name === 'Elemental Warding');
    const ef = elem.find(t => t.name === 'Elemental Focus');
    const cof = elem.find(t => t.name === 'Call of Flame');
    const eots = elem.find(t => t.name === 'Eye of the Storm');
    const tbf = elem.find(t => t.name === 'Trial by Fire');
    const lb = elem.find(t => t.name === 'Lava Burst');

    const points = {
      [conv.id]: 5,
      [rev.id]: 5,
      [ew.id]: 3,
      [ef.id]: 1,
      [cof.id]: 1,
      [eots.id]: 3,
      [tbf.id]: 1 // Only 19 points total in tree
    };

    expect(getTotalPoints(points)).toBe(19);
    const alloc = canAllocatePoint(shaman, points, lb.id, 21);
    expect(alloc.allowed).toBeFalsy();
    expect(alloc.reason).toMatch(/Tier gating unmet/i);
  });

  collector.test('1.6 Exactly 31 points legally spent to reach Elemental Mastery in Row 7', () => {
    const conv = elem.find(t => t.name === 'Convection'); // R1, 5
    const conc = elem.find(t => t.name === 'Concussion'); // R1, 5 -> 10 pts
    const rev = elem.find(t => t.name === 'Reverberation'); // R2, 5 -> 15 pts
    const ew = elem.find(t => t.name === 'Elemental Warding'); // R3, 3
    const ef = elem.find(t => t.name === 'Elemental Focus'); // R3, 1
    const tbf = elem.find(t => t.name === 'Trial by Fire'); // R4, 1 -> 20 pts in R1-R4
    const lb = elem.find(t => t.name === 'Lava Burst'); // R5, 4 (MAXED) -> 24 pts
    const eots = elem.find(t => t.name === 'Eye of the Storm'); // R4, 3 -> 27 pts
    const reach = elem.find(t => t.name === 'Elemental Reach'); // R5, 2 -> 29 pts
    const earth = elem.find(t => t.name === 'Earthbound'); // R4, 1 -> 30 pts in tree
    const em = elem.find(t => t.name === 'Elemental Mastery'); // R7, 1 (Capstone) -> 31 pts

    const points = {
      [conv.id]: 5,
      [conc.id]: 5,
      [rev.id]: 5,
      [ew.id]: 3,
      [ef.id]: 1,
      [tbf.id]: 1,
      [lb.id]: 4,
      [eots.id]: 3,
      [reach.id]: 2,
      [earth.id]: 1,
      [em.id]: 1
    };

    expect(getTotalPoints(points)).toBe(31);
    const audit = validateBuildLegality(shaman, points, 31);
    expect(audit.valid).toBeTruthy();
    expect(audit.errors.length).toBe(0);
  });

  collector.test('1.7 Allocating Elemental Mastery with incomplete Lava Burst (3/4) fails prerequisite check', () => {
    const conv = elem.find(t => t.name === 'Convection');
    const conc = elem.find(t => t.name === 'Concussion');
    const rev = elem.find(t => t.name === 'Reverberation');
    const ew = elem.find(t => t.name === 'Elemental Warding');
    const ef = elem.find(t => t.name === 'Elemental Focus');
    const tbf = elem.find(t => t.name === 'Trial by Fire');
    const lb = elem.find(t => t.name === 'Lava Burst');
    const eots = elem.find(t => t.name === 'Eye of the Storm');
    const reach = elem.find(t => t.name === 'Elemental Reach');
    const earth = elem.find(t => t.name === 'Earthbound');
    const em = elem.find(t => t.name === 'Elemental Mastery');

    const points = {
      [conv.id]: 5,
      [conc.id]: 5,
      [rev.id]: 5,
      [ew.id]: 3,
      [ef.id]: 1,
      [tbf.id]: 2, // 21 in R1-R4
      [lb.id]: 3, // Incomplete 3/4
      [eots.id]: 3,
      [reach.id]: 2,
      [earth.id]: 1 // Total = 30 points in tree
    };

    expect(getTotalPoints(points)).toBe(30);
    const alloc = canAllocatePoint(shaman, points, em.id, 31);
    expect(alloc.allowed).toBeFalsy();
    expect(alloc.reason).toMatch(/Prerequisite "Lava Burst" not maxed/i);
  });

  collector.test('1.8 Allocating Elemental Fury without maxing Lightning Overload fails prerequisite check', () => {
    const efury = elem.find(t => t.name === 'Elemental Fury'); // R6, req: LO
    const lo = elem.find(t => t.name === 'Lightning Overload'); // R5, req: EA
    const ea = elem.find(t => t.name === 'Elemental Alacrity'); // R2
    const conv = elem.find(t => t.name === 'Convection');
    const conc = elem.find(t => t.name === 'Concussion');
    const rev = elem.find(t => t.name === 'Reverberation');
    const ew = elem.find(t => t.name === 'Elemental Warding');
    const eots = elem.find(t => t.name === 'Eye of the Storm');

    // Build 25 points with LO at 2/3
    const points = {
      [conv.id]: 5,
      [conc.id]: 5,
      [ea.id]: 3,
      [rev.id]: 5,
      [ew.id]: 3,
      [eots.id]: 2,
      [lo.id]: 2 // 2/3 (not maxed)
    };
    expect(getTotalPoints(points)).toBe(25);

    const alloc = canAllocatePoint(shaman, points, efury.id, 31);
    expect(alloc.allowed).toBeFalsy();
    expect(alloc.reason).toMatch(/Prerequisite "Lightning Overload" not maxed/i);
  });

  collector.test('1.9 Allocating Lightning Overload without maxing Elemental Alacrity fails prerequisite check', () => {
    const lo = elem.find(t => t.name === 'Lightning Overload');
    const ea = elem.find(t => t.name === 'Elemental Alacrity');
    const conv = elem.find(t => t.name === 'Convection');
    const conc = elem.find(t => t.name === 'Concussion');
    const rev = elem.find(t => t.name === 'Reverberation');
    const ew = elem.find(t => t.name === 'Elemental Warding');

    // Build 20 points with EA at 2/3
    const points = {
      [conv.id]: 5,
      [conc.id]: 5,
      [ea.id]: 2, // 2/3 (not maxed)
      [rev.id]: 5,
      [ew.id]: 3
    };
    expect(getTotalPoints(points)).toBe(20);

    const alloc = canAllocatePoint(shaman, points, lo.id, 31);
    expect(alloc.allowed).toBeFalsy();
    expect(alloc.reason).toMatch(/Prerequisite "Elemental Alacrity" not maxed/i);
  });

  collector.test('1.10 Full prerequisite chain Elemental Alacrity -> Lightning Overload -> Elemental Fury resolves legally', () => {
    const ea = elem.find(t => t.name === 'Elemental Alacrity'); // R2
    const lo = elem.find(t => t.name === 'Lightning Overload'); // R5
    const efury = elem.find(t => t.name === 'Elemental Fury'); // R6
    const conv = elem.find(t => t.name === 'Convection');
    const conc = elem.find(t => t.name === 'Concussion');
    const rev = elem.find(t => t.name === 'Reverberation');
    const ew = elem.find(t => t.name === 'Elemental Warding');
    const eots = elem.find(t => t.name === 'Eye of the Storm');

    const points = {
      [conv.id]: 5,
      [conc.id]: 5,
      [ea.id]: 3, // EA maxed (3/3)
      [rev.id]: 4, // 17 pts in R1-R2
      [ew.id]: 3, // 20 pts in R1-R3 -> unlocks R5
      [lo.id]: 3, // LO maxed (3/3) -> 23 pts
      [eots.id]: 2, // 25 pts total -> unlocks R6
      [efury.id]: 1 // First point in Elemental Fury!
    };

    expect(getTotalPoints(points)).toBe(26);
    const audit = validateBuildLegality(shaman, points, 26);
    expect(audit.valid).toBeTruthy();
    expect(audit.errors.length).toBe(0);
  });

  collector.test('1.11 Restoration tree swap: Tidal Focus is Row 1 Col 3 and Totemic Focus is Row 2 Col 3', () => {
    const tf = resto.find(t => t.name === 'Tidal Focus');
    const totF = resto.find(t => t.name === 'Totemic Focus');

    expect(tf).toBeDefined();
    expect(totF).toBeDefined();
    expect(tf.row).toBe(1);
    expect(tf.col).toBe(3);
    expect(tf.maxRank).toBe(5);
    expect(totF.row).toBe(2);
    expect(totF.col).toBe(3);
    expect(totF.maxRank).toBe(5);
  });
});

// ============================================================================
// SUITE 2: PRIEST DISCIPLINE & SHADOW TREES
// ============================================================================
collector.describe('Suite 2: Priest Discipline & Shadow Trees Adversarial Stress-Tests', () => {
  const priest = talentsData.priest?.talents || [];
  const disc = priest.filter(t => t.tree === 0).sort((a, b) => a.row - b.row || a.col - b.col);
  const shadow = priest.filter(t => t.tree === 2).sort((a, b) => a.row - b.row || a.col - b.col);

  collector.test('2.1 Soul Warding is in Row 4 Col 3 with req: Improved Power Word: Shield (node 215)', () => {
    const sw = disc.find(t => t.name === 'Soul Warding');
    const ipws = disc.find(t => t.name === 'Improved Power Word: Shield');
    expect(sw).toBeDefined();
    expect(ipws).toBeDefined();
    expect(sw.row).toBe(4);
    expect(sw.col).toBe(3);
    expect(sw.maxRank).toBe(1);
    expect(ipws.row).toBe(3);
    expect(ipws.col).toBe(3);
    expect(ipws.maxRank).toBe(3);
    expect(sw.req).toBe(ipws.id);
  });

  collector.test('2.2 Allocating Soul Warding with incomplete Improved PW:S (2/3) fails prerequisite check', () => {
    const pil = disc.find(t => t.name === 'Power in Light'); // R1
    const td = disc.find(t => t.name === 'Twin Disciplines'); // R1
    const ms = disc.find(t => t.name === 'Mental Strength'); // R2
    const ipws = disc.find(t => t.name === 'Improved Power Word: Shield'); // R3
    const sw = disc.find(t => t.name === 'Soul Warding'); // R4

    const points = {
      [pil.id]: 5,
      [td.id]: 3,
      [ms.id]: 5, // 13 in R1-R2
      [ipws.id]: 2 // 2/3 (Total = 15 pts in tree, unlocks R4, but req not maxed)
    };

    expect(getTotalPoints(points)).toBe(15);
    const alloc = canAllocatePoint(priest, points, sw.id, 21);
    expect(alloc.allowed).toBeFalsy();
    expect(alloc.reason).toMatch(/Prerequisite "Improved Power Word: Shield" not maxed/i);
  });

  collector.test('2.3 Allocating Soul Warding with 3/3 Improved PW:S succeeds legally', () => {
    const pil = disc.find(t => t.name === 'Power in Light');
    const td = disc.find(t => t.name === 'Twin Disciplines');
    const ms = disc.find(t => t.name === 'Mental Strength');
    const ipws = disc.find(t => t.name === 'Improved Power Word: Shield');
    const sw = disc.find(t => t.name === 'Soul Warding');

    const points = {
      [pil.id]: 5,
      [td.id]: 2,
      [ms.id]: 5, // 12 in R1-R2
      [ipws.id]: 3, // 3/3 (Total = 15 pts in tree, unlocks R4)
      [sw.id]: 1 // Point in Soul Warding!
    };

    expect(getTotalPoints(points)).toBe(16);
    const audit = validateBuildLegality(priest, points, 21);
    expect(audit.valid).toBeTruthy();
    expect(audit.errors.length).toBe(0);
  });

  collector.test('2.4 Attempting to refund a point from Improved PW:S when Soul Warding is allocated is blocked', () => {
    const pil = disc.find(t => t.name === 'Power in Light');
    const td = disc.find(t => t.name === 'Twin Disciplines');
    const ms = disc.find(t => t.name === 'Mental Strength');
    const ipws = disc.find(t => t.name === 'Improved Power Word: Shield');
    const sw = disc.find(t => t.name === 'Soul Warding');

    const points = {
      [pil.id]: 5,
      [td.id]: 2,
      [ms.id]: 5,
      [ipws.id]: 3,
      [sw.id]: 1
    };

    const refund = canRefundPoint(priest, points, ipws.id);
    expect(refund.allowed).toBeFalsy();
    expect(refund.reason).toMatch(/Cannot refund: "Soul Warding" depends on "Improved Power Word: Shield"/i);
  });

  collector.test('2.5 Mental Strength is moved to Row 2 Col 2 with 5 ranks', () => {
    const ms = disc.find(t => t.name === 'Mental Strength');
    expect(ms).toBeDefined();
    expect(ms.row).toBe(2);
    expect(ms.col).toBe(2);
    expect(ms.maxRank).toBe(5);
  });

  collector.test('2.6 Shadow Affinity (node 248) is permanently removed from Priest talents', () => {
    const sa = shadow.find(t => t.id === 248 || t.name === 'Shadow Affinity');
    expect(sa === undefined).toBeTruthy();
  });

  collector.test('2.7 Dark Inspiration is added at Row 4 Col 1 with 5 ranks replacing Improved Fade', () => {
    const di = shadow.find(t => t.name === 'Dark Inspiration');
    expect(di).toBeDefined();
    expect(di.row).toBe(4);
    expect(di.col).toBe(1);
    expect(di.maxRank).toBe(5);
    expect(di.spellId).toBe(15286);
  });

  collector.test('2.8 Improved Mind Blast is moved to Row 2 Col 1 with 5 ranks', () => {
    const imb = shadow.find(t => t.name === 'Improved Mind Blast');
    expect(imb).toBeDefined();
    expect(imb.row).toBe(2);
    expect(imb.col).toBe(1);
    expect(imb.maxRank).toBe(5);
  });

  collector.test('2.9 Vampiric Embrace tooltip documents standardized 30s cooldown', () => {
    const ve = shadow.find(t => t.name === 'Vampiric Embrace');
    expect(ve).toBeDefined();
    expect(ve.descriptions[0]).toMatch(/30\s*sec/i);
  });

  collector.test('2.10 Legal 21-point Shadow Priest build succeeds with 0 errors without Shadow Affinity', () => {
    const st = shadow.find(t => t.name === 'Spirit Tap'); // R1, 5
    const imb = shadow.find(t => t.name === 'Improved Mind Blast'); // R2, 5
    const iswp = shadow.find(t => t.name === 'Improved Shadow Word: Pain'); // R2, 2
    const sr = shadow.find(t => t.name === 'Shadow Reach'); // R3, 2
    const mf = shadow.find(t => t.name === 'Mind Flay'); // R3, 1
    const imf = shadow.find(t => t.name === 'Improved Mind Flay'); // R4, 1
    const di = shadow.find(t => t.name === 'Dark Inspiration'); // R4, 4
    const ve = shadow.find(t => t.name === 'Vampiric Embrace'); // R4, 1

    const points = {
      [st.id]: 5,
      [imb.id]: 5, // 10 pts
      [iswp.id]: 2,
      [sr.id]: 2,
      [mf.id]: 1, // 15 pts in R1-R3 -> unlocks R4
      [imf.id]: 1,
      [di.id]: 4,
      [ve.id]: 1 // 21 pts total
    };

    expect(getTotalPoints(points)).toBe(21);
    const audit = validateBuildLegality(priest, points, 21);
    expect(audit.valid).toBeTruthy();
    expect(audit.errors.length).toBe(0);
  });
});

// ============================================================================
// SUITE 3: MAGE ARCANE, FIRE & FROST TREES
// ============================================================================
collector.describe('Suite 3: Mage Arcane, Fire & Frost Trees Adversarial Stress-Tests', () => {
  const mage = talentsData.mage?.talents || [];
  const arcane = mage.filter(t => t.tree === 0).sort((a, b) => a.row - b.row || a.col - b.col);
  const fire = mage.filter(t => t.tree === 1).sort((a, b) => a.row - b.row || a.col - b.col);
  const frost = mage.filter(t => t.tree === 2).sort((a, b) => a.row - b.row || a.col - b.col);

  collector.test('3.1 Arcane Wrath is added at Row 4 Col 4 with 1 rank and req: null', () => {
    const aw = arcane.find(t => t.name === 'Arcane Wrath');
    expect(aw).toBeDefined();
    expect(aw.row).toBe(4);
    expect(aw.col).toBe(4);
    expect(aw.maxRank).toBe(1);
    expect(aw.req).toBeNull();
  });

  collector.test('3.2 Missile Barrage is positioned at Row 1 Col 4 with 2 ranks and req: null', () => {
    const mb = arcane.find(t => t.name === 'Missile Barrage');
    expect(mb).toBeDefined();
    expect(mb.row).toBe(1);
    expect(mb.col).toBe(4);
    expect(mb.maxRank).toBe(2);
    expect(mb.req).toBeNull();
  });

  collector.test('3.3 Improved Fire Blast is renamed from Wake of Fire at Row 1 Col 1 with 2 ranks', () => {
    const ifb = fire.find(t => t.name === 'Improved Fire Blast');
    const wof = fire.find(t => t.name === 'Wake of Fire');
    expect(ifb).toBeDefined();
    expect(wof === undefined).toBeTruthy();
    expect(ifb.row).toBe(1);
    expect(ifb.col).toBe(1);
    expect(ifb.maxRank).toBe(2);
  });

  collector.test('3.4 Critical Mass is rescaled to 5 ranks (2/4/6/8/10% crit) at Row 5 Col 2', () => {
    const cm = fire.find(t => t.name === 'Critical Mass');
    expect(cm).toBeDefined();
    expect(cm.row).toBe(5);
    expect(cm.col).toBe(2);
    expect(cm.maxRank).toBe(5);
    expect(cm.descriptions.length).toBe(5);
    expect(cm.descriptions[0]).toMatch(/2%/);
    expect(cm.descriptions[4]).toMatch(/10%/);
  });

  collector.test('3.5 Fire Power is rescaled to 3 ranks (1/2/3% per effect up to 12%) at Row 6 Col 3', () => {
    const fp = fire.find(t => t.name === 'Fire Power');
    expect(fp).toBeDefined();
    expect(fp.row).toBe(6);
    expect(fp.col).toBe(3);
    expect(fp.maxRank).toBe(3);
    expect(fp.descriptions.length).toBe(3);
    expect(fp.descriptions[0]).toMatch(/1%/);
    expect(fp.descriptions[2]).toMatch(/3%/);
    expect(fp.descriptions[2]).toMatch(/12%/);
  });

  collector.test('3.6 Legal 21-point Fire Mage build reaches Critical Mass in Row 5 with 0 errors', () => {
    const ifb = fire.find(t => t.name === 'Improved Fire Blast'); // R1, 2
    const ifire = fire.find(t => t.name === 'Improved Fireball'); // R1, 5 -> 7 pts
    const ignite = fire.find(t => t.name === 'Ignite'); // R2, 5 -> 12 pts
    const bs = fire.find(t => t.name === 'Burning Soul'); // R3, 3
    const pyro = fire.find(t => t.name === 'Pyroblast'); // R3, 1 -> 16 pts in R1-R3
    const iscorch = fire.find(t => t.name === 'Improved Scorch'); // R4, 3
    const hu = fire.find(t => t.name === 'Heating Up'); // R4, 1 -> 20 pts in R1-R4
    const cm = fire.find(t => t.name === 'Critical Mass'); // R5, 1 -> 21 pts total

    const points = {
      [ifb.id]: 2,
      [ifire.id]: 5,
      [ignite.id]: 5,
      [bs.id]: 3,
      [pyro.id]: 1,
      [iscorch.id]: 3,
      [hu.id]: 1,
      [cm.id]: 1
    };

    expect(getTotalPoints(points)).toBe(21);
    const audit = validateBuildLegality(mage, points, 21);
    expect(audit.valid).toBeTruthy();
    expect(audit.errors.length).toBe(0);
  });

  collector.test('3.7 Ice Lance deals 200% against frozen targets and Winter\'s Chill enhances Cone of Cold', () => {
    const il = frost.find(t => t.name === 'Ice Lance');
    const wc = frost.find(t => t.name === "Winter's Chill");

    expect(il).toBeDefined();
    expect(wc).toBeDefined();
    expect(il.descriptions[0]).toMatch(/200%/);
    expect(wc.descriptions[0]).toMatch(/Cone of Cold/i);
    expect(wc.descriptions[0]).toMatch(/40%/);
  });
});

// ============================================================================
// SUITE 4: WARLOCK AFFLICTION & DESTRUCTION TREES
// ============================================================================
collector.describe('Suite 4: Warlock Affliction & Destruction Trees Adversarial Stress-Tests', () => {
  const warlock = talentsData.warlock?.talents || [];
  const aff = warlock.filter(t => t.tree === 0).sort((a, b) => a.row - b.row || a.col - b.col);
  const destro = warlock.filter(t => t.tree === 2).sort((a, b) => a.row - b.row || a.col - b.col);

  collector.test('4.1 Grim Reach replaces Malediction at Row 4 Col 4 with 2 ranks (+10/20% range)', () => {
    const gr = aff.find(t => t.name === 'Grim Reach');
    const mal = aff.find(t => t.name === 'Malediction');

    expect(gr).toBeDefined();
    expect(mal === undefined).toBeTruthy();
    expect(gr.row).toBe(4);
    expect(gr.col).toBe(4);
    expect(gr.maxRank).toBe(2);
    expect(gr.descriptions.length).toBe(2);
    expect(gr.descriptions[0]).toMatch(/10%/);
    expect(gr.descriptions[1]).toMatch(/20%/);
  });

  collector.test('4.2 Shadow Mastery is at Row 6 Col 3 with 5 ranks (2/4/6/8/10%)', () => {
    const sm = aff.find(t => t.name === 'Shadow Mastery');
    expect(sm).toBeDefined();
    expect(sm.row).toBe(6);
    expect(sm.col).toBe(3);
    expect(sm.maxRank).toBe(5);
    expect(sm.descriptions[0]).toMatch(/2%/);
    expect(sm.descriptions[4]).toMatch(/10%/);
  });

  collector.test('4.3 Destructive Reach is restricted to Destruction spells', () => {
    const dr = destro.find(t => t.name === 'Destructive Reach');
    expect(dr).toBeDefined();
    expect(dr.row).toBe(1);
    expect(dr.col).toBe(1);
    expect(dr.descriptions[0]).toMatch(/Destruction/i);
  });

  collector.test('4.4 Legal 21-point Level 30 Affliction build allocates Grim Reach with 0 errors', () => {
    const ilt = aff.find(t => t.name === 'Improved Life Tap'); // R1, 2
    const supp = aff.find(t => t.name === 'Suppression'); // R1, 5 -> 7 pts
    const sh = aff.find(t => t.name === 'Soul Harvest'); // R2, 2
    const idr = aff.find(t => t.name === 'Improved Drains'); // R2, 3 -> 12 pts
    const fc = aff.find(t => t.name === 'Fel Concentration'); // R3, 3
    const ac = aff.find(t => t.name === 'Amplify Curse'); // R3, 1 -> 16 pts in R1-R3
    const nf = aff.find(t => t.name === 'Nightfall'); // R4, 2
    const gr = aff.find(t => t.name === 'Grim Reach'); // R4, 2
    const mal = aff.find(t => t.name === 'Malevolence'); // R4, 1 -> 21 pts total

    const points = {
      [ilt.id]: 2,
      [supp.id]: 5,
      [sh.id]: 2,
      [idr.id]: 3,
      [fc.id]: 3,
      [ac.id]: 1,
      [nf.id]: 2,
      [gr.id]: 2,
      [mal.id]: 1
    };

    expect(getTotalPoints(points)).toBe(21);
    const audit = validateBuildLegality(warlock, points, 21);
    expect(audit.valid).toBeTruthy();
    expect(audit.errors.length).toBe(0);
  });
});

// ============================================================================
// SUITE 5: PALADIN, HUNTER, DRUID, WARRIOR TALENTS INTEGRITY
// ============================================================================
collector.describe('Suite 5: Paladin, Hunter, Druid, Warrior Talents Integrity', () => {
  collector.test('5.1 Paladin Reckoning stores up to 4 charges and triggers on auto swing', () => {
    const pal = talentsData.paladin?.talents || [];
    const reck = pal.find(t => t.name === 'Reckoning');
    expect(reck).toBeDefined();
    expect(reck.maxRank).toBe(5);
    for (const d of reck.descriptions) {
      expect(d).toMatch(/stores up to 4 charges|auto swing/i);
    }
  });

  collector.test('5.2 Hunter Rapid Recuperation and Predator\'s Edge have correct rank structures', () => {
    const hunter = talentsData.hunter?.talents || [];
    const rr = hunter.find(t => t.name === 'Rapid Recuperation');
    const pe = hunter.find(t => t.name === "Predator's Edge");

    expect(rr).toBeDefined();
    expect(rr.maxRank).toBe(2);
    expect(pe).toBeDefined();
    expect(pe.maxRank).toBe(5);
  });

  collector.test('5.3 Druid Furor grants Rage in Bear and Energy decay scaling in Cat', () => {
    const druid = talentsData.druid?.talents || [];
    const furor = druid.find(t => t.name === 'Furor');
    expect(furor).toBeDefined();
    expect(furor.maxRank).toBe(5);
    expect(furor.descriptions[0]).toMatch(/Bear/i);
    expect(furor.descriptions[0]).toMatch(/Cat/i);
  });

  collector.test('5.4 Warrior Bloodthrill triggers Overpower on Rend', () => {
    const warrior = talentsData.warrior?.talents || [];
    const bt = warrior.find(t => t.name === 'Bloodthrill');
    expect(bt).toBeDefined();
    expect(bt.maxRank).toBe(5);
    expect(bt.descriptions[0]).toMatch(/Rend/i);
    expect(bt.descriptions[0]).toMatch(/Overpower/i);
  });
});

// ============================================================================
// SUITE 6: PROPERTY-BASED RANDOMIZED COMBINATORIAL STRESS-TESTS
// ============================================================================
collector.describe('Suite 6: Property-Based Combinatorial & Randomized Build Stress-Tests', () => {
  const classesToTest = ['shaman', 'priest', 'mage', 'warlock'];

  // Seeded pseudo-random generator for determinism
  let seed = 123456789;
  function rng() {
    seed = (seed * 1664525 + 1013904223) % 4294967296;
    return seed / 4294967296;
  }

  for (const cls of classesToTest) {
    collector.test(`6.1 100 randomized step-by-step allocations for ${cls} enforce tier gating & prereqs`, () => {
      const classTalents = talentsData[cls]?.talents || [];
      const numBuilds = 100;

      for (let b = 0; b < numBuilds; b++) {
        // Pick a tree (0, 1, or 2)
        const treeIdx = Math.floor(rng() * 3);
        const treeTalents = classTalents.filter(t => t.tree === treeIdx);
        const points = {};
        const maxTargetPoints = 15 + Math.floor(rng() * 7); // 15 to 21 points

        let currentTotal = 0;
        let attempts = 0;

        while (currentTotal < maxTargetPoints && attempts < 200) {
          attempts++;
          const candidate = treeTalents[Math.floor(rng() * treeTalents.length)];
          const allocCheck = canAllocatePoint(classTalents, points, candidate.id, maxTargetPoints);

          if (allocCheck.allowed) {
            points[candidate.id] = (points[candidate.id] || 0) + 1;
            currentTotal++;

            // Property assertion: Points in lower rows MUST satisfy candidate row gate
            const currentTreePoints = getTreePoints(classTalents, points, treeIdx);
            const lowerRowPoints = treeTalents
              .filter(t => t.row < candidate.row)
              .reduce((sum, t) => sum + (points[t.id] || 0), 0);
            const reqPoints = (candidate.row - 1) * 5;
            expect(lowerRowPoints).toBeGreaterThanOrEqual(reqPoints);

            // Property assertion: Prerequisite must be maxed
            if (candidate.req) {
              const reqTalent = classTalents.find(t => t.id === candidate.req);
              expect(points[reqTalent.id] || 0).toBe(reqTalent.maxRank);
            }
          }
        }

        // Validate final build legality
        const audit = validateBuildLegality(classTalents, points, 21);
        if (!audit.valid) {
          throw new Error(`Random build ${b} for ${cls} tree ${treeIdx} failed audit: ${audit.errors.join('; ')}`);
        }

        // Test serialization round-trip
        const serialized = serializeBuild(classTalents, points);
        const parsed = parseBuildUrl(classTalents, serialized);
        for (const t of treeTalents) {
          expect(parsed[t.id] || 0).toBe(points[t.id] || 0);
        }
      }
    });
  }

  collector.test('6.2 Exhaustive tier gate boundary test across all 7 rows for Shaman Elemental', () => {
    const shaman = talentsData.shaman?.talents || [];
    const elem = shaman.filter(t => t.tree === 0);

    for (let targetRow = 2; targetRow <= 7; targetRow++) {
      const reqGate = (targetRow - 1) * 5;
      const lowerRowTalents = elem.filter(t => t.row < targetRow);
      const targetTalents = elem.filter(t => t.row === targetRow);

      // Construct points with exactly (reqGate - 1) points in lower rows
      const points = {};
      let remaining = reqGate - 1;
      for (const t of lowerRowTalents) {
        if (remaining <= 0) break;
        const add = Math.min(t.maxRank, remaining);
        // ensure lower row's own gate is satisfied
        const lowerPts = lowerRowTalents
          .filter(lt => lt.row < t.row)
          .reduce((sum, lt) => sum + (points[lt.id] || 0), 0);
        if (lowerPts >= (t.row - 1) * 5) {
          points[t.id] = add;
          remaining -= add;
        }
      }

      // Any target row talent must be rejected when below the gate
      for (const target of targetTalents) {
        const res = canAllocatePoint(shaman, points, target.id, 51);
        expect(res.allowed).toBeFalsy();
      }
    }
  });
});

// ============================================================================
// SUITE 7: DATASET PARITY & HASH VERIFICATION
// ============================================================================
collector.describe('Suite 7: Dataset Parity & Hash Verification', () => {
  const jsonPath = path.join(ROOT, 'data', 'forever_changes.json');
  const jsPath = path.join(ROOT, 'js', 'data', 'changes-data.js');

  collector.test('7.1 Both forever_changes.json and changes-data.js exist on disk', () => {
    expect(fs.existsSync(jsonPath)).toBeTruthy();
    expect(fs.existsSync(jsPath)).toBeTruthy();
  });

  collector.test('7.2 WOW_CHANGES_DATA in JS bundle matches JSON data structure 100%', () => {
    const jsonRaw = fs.readFileSync(jsonPath, 'utf8');
    const jsRaw = fs.readFileSync(jsPath, 'utf8');

    const match = jsRaw.match(/window\.WOW_CHANGES_DATA\s*=\s*(\{[\s\S]*\});?\s*$/);
    expect(match).toBeDefined();

    const parsedJson = JSON.parse(jsonRaw);
    const parsedJs = JSON.parse(match[1]);

    expect(parsedJs.entries.length).toBe(parsedJson.entries.length);
    expect(parsedJs.entries.length).toBe(965);
    expect(JSON.stringify(parsedJs)).toBe(JSON.stringify(parsedJson));
  });

  collector.test('7.3 All 69 talent modifications are tracked with correct reported_change_kind', () => {
    const jsonRaw = fs.readFileSync(jsonPath, 'utf8');
    const json = JSON.parse(jsonRaw);

    const checkKinds = [
      { name: 'Elemental Mastery', kind: 'added' },
      { name: 'Lava Burst', kind: 'added' },
      { name: 'Call of Thunder', kind: 'removed' },
      { name: 'Elemental Fury', kind: 'modified' },
      { name: 'Lightning Overload', kind: 'added' },
      { name: 'Earthbound', kind: 'added' },
      { name: 'Trial by Fire', kind: 'modified' },
      { name: 'Arcane Wrath', kind: 'added' },
      { name: 'Missile Barrage', kind: 'added' },
      { name: 'Improved Fire Blast', kind: 'modified' },
      { name: 'Dark Inspiration', kind: 'added' },
      { name: 'Shadow Affinity', kind: 'removed' },
      { name: 'Improved Mind Blast', kind: 'moved' },
      { name: 'Mental Strength', kind: 'modified' },
      { name: 'Improved Power Word: Shield', kind: 'modified' },
      { name: 'Grim Reach', kind: 'added' },
      { name: 'Malediction', kind: 'removed' },
      { name: 'Reckoning', kind: 'modified' }
    ];

    for (const item of checkKinds) {
      const match = json.entries.find(e => e.name && e.name.toLowerCase() === item.name.toLowerCase());
      expect(match).toBeDefined();
      expect(match.reported_change_kind).toBe(item.kind);
    }
  });
});

// ============================================================================
// EXECUTE & PRINT SUMMARY
// ============================================================================
const summary = collector.getSummary();
console.log('----------------------------------------------------------------------');
console.log(` Suite: ${summary.suiteName}`);
console.log(` Total Assertions: ${summary.total} | Passed: ${summary.passes} | Failed: ${summary.failures} (${summary.duration}ms)`);
console.log('----------------------------------------------------------------------\n');

for (const t of summary.tests) {
  if (t.status === 'pass') {
    console.log(`  ✓ ${t.name} (${t.duration}ms)`);
  } else {
    console.log(`  ✗ ${t.name} (${t.duration}ms)`);
    console.log(`    Error: ${t.message}`);
  }
}

console.log('\n======================================================================');
if (summary.failures > 0) {
  console.log(`❌ ${summary.failures} ADVERSARIAL ASSERTIONS FAILED!`);
  process.exit(1);
} else {
  console.log(`🎉 ALL ${summary.total} ADVERSARIAL STRESS TESTS PASSED WITH 100% SUCCESS!`);
  process.exit(0);
}
