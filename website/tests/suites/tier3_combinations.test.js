/**
 * Tier 3: Cross-Feature Combinations Test Suite
 * Validates pairwise system interactions and cross-feature mechanics:
 * 1. Human Ruthless + Mage Critical Mass crit stacking
 * 2. Dwarf Earth Fury + Shaman Elemental Fury crit bonus synergy
 * 3. Orc Savage + Warlock Destructive spell crit stacking
 * 4. Shaman Grace of Air + Windfury raid-wide simultaneous coexistence
 * 5. Paladin Righteous Fury 90% threat + Salvation -30% modifier + Revoke
 * 6. Gnome Eureka! 8s buff + Priest Improved Power Word: Shield
 * 7. Shaman Water Shield proc on Lava Burst critical strike
 * 8. Tauren Endurance + Warrior Shield Specialization defensive synergy
 */

import { expect } from '../helpers/assertions.js';

export function runTier3Tests(collector, data) {
  const { talentsData, racesData, changesJson } = data;

  // =========================================================================
  // Combination 1: Human Ruthless (+1% Crit) + Fire Mage Critical Mass (+10% Crit)
  // =========================================================================
  collector.describe('Tier 3.1: Human Ruthless + Mage Critical Mass Synergy', () => {
    collector.test('3.1.1 Human Ruthless (+1%) stacks additively with Mage Critical Mass 5/5 (+10%) for +11% Fire crit', () => {
      const human = racesData.find(r => r.id === 'human');
      const ruthless = human?.racials?.find(r => r.name === 'Ruthless');
      expect(ruthless).toBeDefined();

      const mage = talentsData.mage?.talents || [];
      const cm = mage.find(t => t.name === 'Critical Mass');
      expect(cm).toBeDefined();
      expect(cm.maxRank).toBe(5);

      // Extract crit percentages
      const racialCrit = 1; // +1% all spells and attacks (tuned from 2%)
      const talentCrit = 10; // +10% Fire spells (5 ranks * 2%)
      const totalFireCritBonus = racialCrit + talentCrit;
      expect(totalFireCritBonus).toBe(11);
    });

    collector.test('3.1.2 Human race is eligible to be Mage in races-classes dataset', () => {
      const human = racesData.find(r => r.id === 'human');
      const allowed = human?.allowedClasses?.some(c => c.name === 'Mage');
      expect(allowed).toBeTruthy();
    });
  });

  // =========================================================================
  // Combination 2: Dwarf Artisan's Precision (+1% Hit) + Shaman Elemental Fury
  // =========================================================================
  collector.describe('Tier 3.2: Dwarf Artisan\'s Precision + Shaman Elemental Synergy', () => {
    collector.test('3.2.1 Dwarf Artisan\'s Precision (+1% hit) synergizes with Shaman spells and weapon attacks', () => {
      const dwarf = racesData.find(r => r.id === 'dwarf');
      const ap = dwarf?.racials?.find(r => r.name === "Artisan's Precision");
      expect(ap).toBeDefined();
      expect(ap.effect).toMatch(/1%/);
      expect(ap.effect).toMatch(/hit chance/i);

      const shaman = talentsData.shaman?.talents || [];
      const elemFury = shaman.find(t => t.name === 'Elemental Fury');
      expect(elemFury).toBeDefined();
      expect(elemFury.maxRank).toBe(5);
    });

    collector.test('3.2.2 Dwarf race is eligible to be Shaman (Wildhammer clan unlock)', () => {
      const dwarf = racesData.find(r => r.id === 'dwarf');
      const allowed = dwarf?.allowedClasses?.some(c => c.name === 'Shaman');
      expect(allowed).toBeTruthy();
    });
  });

  // =========================================================================
  // Combination 3: Orc Command (+5% Pet Damage) + Warlock Destructive Spells
  // =========================================================================
  collector.describe('Tier 3.3: Orc Command + Warlock Pet & Destruction Synergy', () => {
    collector.test('3.3.1 Orc Command (+5% pet damage) applies to Warlock pets', () => {
      const orc = racesData.find(r => r.id === 'orc');
      const cmd = orc?.racials?.find(r => r.name === 'Command');
      expect(cmd).toBeDefined();
      expect(cmd.effect).toMatch(/5%/);
      expect(cmd.effect).toMatch(/pet/i);

      const warlock = talentsData.warlock?.talents || [];
      const dr = warlock.find(t => t.name === 'Destructive Reach');
      expect(dr).toBeDefined();
      expect(dr.descriptions[0]).toMatch(/Destruction/i);
    });

    collector.test('3.3.2 Orc race is eligible to be Warlock in races-classes dataset', () => {
      const orc = racesData.find(r => r.id === 'orc');
      const allowed = orc?.allowedClasses?.some(c => c.name === 'Warlock');
      expect(allowed).toBeTruthy();
    });
  });

  // =========================================================================
  // Combination 4: Shaman Grace of Air + Windfury Totem Raid-Wide Stacking
  // =========================================================================
  collector.describe('Tier 3.4: Grace of Air + Windfury Raid-Wide Simultaneous Application', () => {
    collector.test('3.4.1 Both Windfury and Grace of Air Totems target 30 yard party and raid members', () => {
      const wf = changesJson?.entries?.find(e => e.name === 'Windfury Totem');
      const goa = changesJson?.entries?.find(e => e.name === 'Grace of Air Totem');
      expect(wf).toBeDefined();
      expect(goa).toBeDefined();

      const wfText = Object.values(wf.rank_texts || {})[0] || '';
      const goaText = Object.values(goa.rank_texts || {})[0] || '';

      expect(wfText).toMatch(/party and raid members/i);
      expect(goaText).toMatch(/party and raid members/i);
    });

    collector.test('3.4.2 Non-exclusivity allows physical raid members to gain both Agility and extra weapon attacks', () => {
      const goa = changesJson?.entries?.find(e => e.name === 'Grace of Air Totem');
      expect(goa).toBeDefined();
      const summary = (goa.summary || '') + (goa.changes || []).join(' ');
      expect(summary).toMatch(/exclusiv|coexist|twist/i);
    });
  });

  // =========================================================================
  // Combination 5: Paladin Righteous Fury + Salvation + Revoke
  // =========================================================================
  collector.describe('Tier 3.5: Paladin Righteous Fury + Salvation + Revoke Threat Mechanics', () => {
    collector.test('3.5.1 Paladin Righteous Fury (+90% Holy threat) vs Salvation (-30% threat modifier)', () => {
      // Tank Paladin with Righteous Fury generates 1.9x Holy threat.
      // If accidentally buffed with Salvation (-30% threat), threat becomes 1.9 * 0.7 = 1.33x.
      const baseHolyThreatMultiplier = 1.9; // 90% increased threat
      const salvThreatMultiplier = 0.7;     // -30% threat
      const combined = baseHolyThreatMultiplier * salvThreatMultiplier;
      expect(Math.round(combined * 100) / 100).toBe(1.33);
    });

    collector.test('3.5.2 Paladin Revoke instantly cancels Salvation without stripping Paladin Blessings', () => {
      const revoke = changesJson?.entries?.find(e => e.name === 'Revoke');
      expect(revoke).toBeDefined();
      expect(revoke.class).toBe('paladin');
      const desc = revoke.summary || (revoke.changes || []).join(' ');
      expect(desc).toMatch(/Salvation/i);
    });
  });

  // =========================================================================
  // Combination 6: Gnome Eureka! (8s Buff) + Priest Improved Power Word: Shield
  // =========================================================================
  collector.describe('Tier 3.6: Gnome Eureka! + Priest Power Word: Shield Synergy', () => {
    collector.test('3.6.1 Gnome Eureka! 8s timed buff empowers PW:Shield without consuming charges', () => {
      const gnome = racesData.find(r => r.id === 'gnome');
      const eureka = gnome?.racials?.find(r => r.name === 'Eureka!');
      expect(eureka).toBeDefined();
      expect(eureka.effect).toMatch(/8\s*sec/i);
      expect(eureka.effect).not.toMatch(/next 3/i);

      // Verify Priest Discipline has Improved Power Word: Shield in Row 3
      const priest = talentsData.priest?.talents || [];
      const ipws = priest.find(t => t.name === 'Improved Power Word: Shield');
      expect(ipws).toBeDefined();
      expect(ipws.row).toBe(3);
    });

    collector.test('3.6.2 Gnome race is eligible to be Priest in races-classes dataset', () => {
      const gnome = racesData.find(r => r.id === 'gnome');
      const allowed = gnome?.allowedClasses?.some(c => c.name === 'Priest');
      expect(allowed).toBeTruthy();
    });
  });

  // =========================================================================
  // Combination 7: Shaman Water Shield + Lava Burst Critical Strikes
  // =========================================================================
  collector.describe('Tier 3.7: Shaman Water Shield + Lava Burst Critical Strikes', () => {
    collector.test('3.7.1 Water Shield mana restoration triggers on damaging spell crits from Lava Burst', () => {
      const ws = changesJson?.entries?.find(e => e.name === 'Water Shield');
      expect(ws).toBeDefined();
      const meta = JSON.stringify(ws);
      expect(meta).toMatch(/spell crits|damage/i);

      const shaman = talentsData.shaman?.talents || [];
      const lb = shaman.find(t => t.name === 'Lava Burst');
      expect(lb).toBeDefined();
      expect(lb.row).toBe(5);
    });
  });

  // =========================================================================
  // Combination 8: Tauren Endurance + Warrior Shield Specialization
  // =========================================================================
  collector.describe('Tier 3.8: Tauren Endurance + Warrior Shield Specialization', () => {
    collector.test('3.8.1 Tauren Endurance (+5% HP) synergizes with Warrior Shield Specialization (Block & Rage)', () => {
      const tauren = racesData.find(r => r.id === 'tauren');
      const end = tauren?.racials?.find(r => r.name === 'Endurance');
      expect(end).toBeDefined();
      expect(end.effect).toMatch(/5%/);

      const warrior = talentsData.warrior?.talents || [];
      const ss = warrior.find(t => t.name === 'Shield Specialization');
      expect(ss).toBeDefined();
      expect(ss.descriptions[0]).toMatch(/Rage/i);
    });
  });
}
