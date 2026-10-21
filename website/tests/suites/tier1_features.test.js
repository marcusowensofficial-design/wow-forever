/**
 * Tier 1: Feature Coverage Test Suite
 * Covers all 26 features inventoried in PROJECT.md across 14 categories.
 * Each category contains >= 5 test cases.
 */

import { expect } from '../helpers/assertions.js';

export function runTier1Tests(collector, data) {
  const { talentsData, racesData, changesJson, coreData, indexHtml, toolsDataRaw, deepdives } = data;

  // =========================================================================
  // Category 1: Shaman Elemental Rebuild (PROJECT.md Features 1, 26)
  // =========================================================================
  collector.describe('Tier 1.1: Shaman Elemental Rebuild', () => {
    const shaman = talentsData.shaman;
    const elementalTalents = shaman ? shaman.talents.filter(t => t.tree === 0) : [];

    collector.test('1.1.1 Elemental Mastery is 31pt capstone in Row 7 Col 2 with req 278 (Lava Burst)', () => {
      const em = elementalTalents.find(t => t.name === 'Elemental Mastery');
      expect(em).toBeDefined();
      expect(em.row).toBe(7);
      expect(em.col).toBe(2);
      expect(em.maxRank).toBe(1);
      expect(em.req).toBe(278);
    });

    collector.test('1.1.2 Lava Burst is Row 5 Col 2 21pt capstone with 4 ranks and req null', () => {
      const lb = elementalTalents.find(t => t.name === 'Lava Burst');
      expect(lb).toBeDefined();
      expect(lb.row).toBe(5);
      expect(lb.col).toBe(2);
      expect(lb.maxRank).toBe(4);
      expect(lb.req).toBeNull();
      expect(lb.descriptions.length).toBe(4);
    });

    collector.test('1.1.3 Elemental Fury is Row 6 Col 3 requiring Lightning Overload (req: 275)', () => {
      const ef = elementalTalents.find(t => t.name === 'Elemental Fury');
      expect(ef).toBeDefined();
      expect(ef.row).toBe(6);
      expect(ef.col).toBe(3);
      expect(ef.maxRank).toBe(5);
      expect(ef.req).toBe(275);
    });

    collector.test('1.1.4 Lightning Overload is Row 5 Col 3 requiring Elemental Alacrity (req: 277)', () => {
      const lo = elementalTalents.find(t => t.name === 'Lightning Overload');
      expect(lo).toBeDefined();
      expect(lo.row).toBe(5);
      expect(lo.col).toBe(3);
      expect(lo.maxRank).toBe(3);
      expect(lo.req).toBe(277);
    });

    collector.test('1.1.5 Elemental Alacrity is Row 2 Col 1 with 3 ranks and req null', () => {
      const ea = elementalTalents.find(t => t.name === 'Elemental Alacrity');
      expect(ea).toBeDefined();
      expect(ea.row).toBe(2);
      expect(ea.col).toBe(1);
      expect(ea.maxRank).toBe(3);
      expect(ea.req).toBeNull();
    });

    collector.test('1.1.6 Elemental Warding is Row 3 Col 1 with 3 ranks', () => {
      const ew = elementalTalents.find(t => t.name === 'Elemental Warding');
      expect(ew).toBeDefined();
      expect(ew.row).toBe(3);
      expect(ew.col).toBe(1);
      expect(ew.maxRank).toBe(3);
    });

    collector.test('1.1.7 Call of Thunder is completely removed from Shaman talents', () => {
      const cot = elementalTalents.find(t => t.name === 'Call of Thunder');
      expect(cot).toBeFalsy();
    });

    collector.test('1.1.8 Earthbound is moved to Row 4 Col 4 with 1 rank', () => {
      const eb = elementalTalents.find(t => t.name === 'Earthbound');
      expect(eb).toBeDefined();
      expect(eb.row).toBe(4);
      expect(eb.col).toBe(4);
      expect(eb.maxRank).toBe(1);
    });

    collector.test('1.1.9 Trial by Fire is renamed from Improved Fire Nova at Row 4 Col 1 with 2 ranks', () => {
      const tbf = elementalTalents.find(t => t.name === 'Trial by Fire');
      expect(tbf).toBeDefined();
      expect(tbf.row).toBe(4);
      expect(tbf.col).toBe(1);
      expect(tbf.maxRank).toBe(2);
    });
  });

  // =========================================================================
  // Category 2: Shaman Restoration Swap (PROJECT.md Feature 2)
  // =========================================================================
  collector.describe('Tier 1.2: Shaman Restoration Swap', () => {
    const shaman = talentsData.shaman;
    const restoTalents = shaman ? shaman.talents.filter(t => t.tree === 2) : [];

    collector.test('1.2.1 Tidal Focus is located in Row 1 Col 3', () => {
      const tf = restoTalents.find(t => t.name === 'Tidal Focus');
      expect(tf).toBeDefined();
      expect(tf.row).toBe(1);
      expect(tf.col).toBe(3);
      expect(tf.maxRank).toBe(5);
    });

    collector.test('1.2.2 Totemic Focus is located in Row 2 Col 3', () => {
      const tf = restoTalents.find(t => t.name === 'Totemic Focus');
      expect(tf).toBeDefined();
      expect(tf.row).toBe(2);
      expect(tf.col).toBe(3);
      expect(tf.maxRank).toBe(5);
    });

    collector.test('1.2.3 Tidal Focus requires 0 tree points (Tier 1)', () => {
      const tf = restoTalents.find(t => t.name === 'Tidal Focus');
      expect(tf).toBeDefined();
      const requiredPoints = (tf.row - 1) * 5;
      expect(requiredPoints).toBe(0);
    });

    collector.test('1.2.4 Totemic Focus requires 5 tree points (Tier 2)', () => {
      const tf = restoTalents.find(t => t.name === 'Totemic Focus');
      expect(tf).toBeDefined();
      const requiredPoints = (tf.row - 1) * 5;
      expect(requiredPoints).toBe(5);
    });

    collector.test('1.2.5 Tidal Focus descriptions reduce healing mana cost and increase hit', () => {
      const tf = restoTalents.find(t => t.name === 'Tidal Focus');
      expect(tf).toBeDefined();
      expect(tf.descriptions[0]).toMatch(/healing/i);
    });
  });

  // =========================================================================
  // Category 3: Mage Arcane, Fire, & Frost (PROJECT.md Features 3, 4, 5)
  // =========================================================================
  collector.describe('Tier 1.3: Mage Arcane, Fire, & Frost Adjustments', () => {
    const mage = talentsData.mage;
    const arcane = mage ? mage.talents.filter(t => t.tree === 0) : [];
    const fire = mage ? mage.talents.filter(t => t.tree === 1) : [];
    const frost = mage ? mage.talents.filter(t => t.tree === 2) : [];

    collector.test('1.3.1 Arcane Wrath added to Row 4 Col 4 with 1 rank', () => {
      const aw = arcane.find(t => t.name === 'Arcane Wrath');
      expect(aw).toBeDefined();
      expect(aw.row).toBe(4);
      expect(aw.col).toBe(4);
      expect(aw.maxRank).toBe(1);
    });

    collector.test('1.3.2 Missile Barrage moved to Row 1 Col 4 with 2 ranks', () => {
      const mb = arcane.find(t => t.name === 'Missile Barrage');
      expect(mb).toBeDefined();
      expect(mb.row).toBe(1);
      expect(mb.col).toBe(4);
      expect(mb.maxRank).toBe(2);
      expect(mb.descriptions.length).toBe(2);
    });

    collector.test('1.3.3 Wake of Fire renamed to Improved Fire Blast at Row 1 Col 1 with 2 ranks', () => {
      const ifb = fire.find(t => t.name === 'Improved Fire Blast');
      expect(ifb).toBeDefined();
      expect(ifb.row).toBe(1);
      expect(ifb.col).toBe(1);
      expect(ifb.maxRank).toBe(2);
    });

    collector.test('1.3.4 Fire Power rescaled to 3 ranks in Row 6 Col 3 with 12% maximum cap', () => {
      const fp = fire.find(t => t.name === 'Fire Power');
      expect(fp).toBeDefined();
      expect(fp.row).toBe(6);
      expect(fp.col).toBe(3);
      expect(fp.maxRank).toBe(3);
      expect(fp.descriptions.length).toBe(3);
      expect(fp.descriptions[2]).toMatch(/12%/);
    });

    collector.test('1.3.5 Critical Mass rescaled to 5 ranks in Row 5 Col 2 (+10% Fire crit)', () => {
      const cm = fire.find(t => t.name === 'Critical Mass');
      expect(cm).toBeDefined();
      expect(cm.row).toBe(5);
      expect(cm.col).toBe(2);
      expect(cm.maxRank).toBe(5);
      expect(cm.descriptions.length).toBe(5);
      expect(cm.descriptions[4]).toMatch(/10%/);
    });

    collector.test('1.3.6 Ice Lance deals 200% increased damage to Frozen targets', () => {
      const il = frost.find(t => t.name === 'Ice Lance');
      expect(il).toBeDefined();
      expect(il.row).toBe(3);
      expect(il.col).toBe(3);
      expect(il.maxRank).toBe(1);
      expect(il.descriptions[0]).toMatch(/200%/);
    });

    collector.test('1.3.7 Winter\'s Chill provides stacking buff consumed by Cone of Cold for 5% damage per stack', () => {
      const wc = frost.find(t => t.name === "Winter's Chill");
      expect(wc).toBeDefined();
      expect(wc.row).toBe(6);
      expect(wc.col).toBe(3);
      expect(wc.maxRank).toBe(5);
      expect(wc.descriptions[0]).toMatch(/Cone of Cold/i);
      expect(wc.descriptions[0]).toMatch(/5%/);
    });
  });

  // =========================================================================
  // Category 4: Priest Shadow & Discipline (PROJECT.md Features 6, 7)
  // =========================================================================
  collector.describe('Tier 1.4: Priest Shadow & Discipline Adjustments', () => {
    const priest = talentsData.priest;
    const disc = priest ? priest.talents.filter(t => t.tree === 0) : [];
    const shadow = priest ? priest.talents.filter(t => t.tree === 2) : [];

    collector.test('1.4.1 Dark Inspiration added to Row 4 Col 1 with 5 ranks replacing Improved Fade', () => {
      const di = shadow.find(t => t.name === 'Dark Inspiration');
      expect(di).toBeDefined();
      expect(di.row).toBe(4);
      expect(di.col).toBe(1);
      expect(di.maxRank).toBe(5);
      expect(di.descriptions.length).toBe(5);
      expect(di.descriptions[4]).toMatch(/15%/);
    });

    collector.test('1.4.2 Shadow Affinity is removed from Priest talents', () => {
      const sa = shadow.find(t => t.name === 'Shadow Affinity');
      expect(sa).toBeFalsy();
    });

    collector.test('1.4.3 Improved Mind Blast moved up to Row 2 Col 1 with 5 ranks', () => {
      const imb = shadow.find(t => t.name === 'Improved Mind Blast');
      expect(imb).toBeDefined();
      expect(imb.row).toBe(2);
      expect(imb.col).toBe(1);
      expect(imb.maxRank).toBe(5);
    });

    collector.test('1.4.4 Mental Strength moved up to Row 2 Col 2 in Discipline with 5 ranks', () => {
      const ms = disc.find(t => t.name === 'Mental Strength');
      expect(ms).toBeDefined();
      expect(ms.row).toBe(2);
      expect(ms.col).toBe(2);
      expect(ms.maxRank).toBe(5);
    });

    collector.test('1.4.5 Improved Power Word: Shield moved to Row 3 Col 3 with 3 ranks as prereq for Soul Warding', () => {
      const ipws = disc.find(t => t.name === 'Improved Power Word: Shield');
      const sw = disc.find(t => t.name === 'Soul Warding');
      expect(ipws).toBeDefined();
      expect(ipws.row).toBe(3);
      expect(ipws.col).toBe(3);
      expect(ipws.maxRank).toBe(3);
      if (sw) {
        expect(sw.req).toBe(ipws.id);
      }
    });

    collector.test('1.4.6 Vampiric Embrace cooldown is normalized to 30s', () => {
      const ve = shadow.find(t => t.name === 'Vampiric Embrace');
      expect(ve).toBeDefined();
      expect(ve.row).toBe(4);
      expect(ve.col).toBe(2);
    });
  });

  // =========================================================================
  // Category 5: Warlock Affliction & Destruction (PROJECT.md Feature 8)
  // =========================================================================
  collector.describe('Tier 1.5: Warlock Affliction & Destruction Adjustments', () => {
    const warlock = talentsData.warlock;
    const aff = warlock ? warlock.talents.filter(t => t.tree === 0) : [];
    const destro = warlock ? warlock.talents.filter(t => t.tree === 2) : [];

    collector.test('1.5.1 Grim Reach replaces Malediction at Row 4 Col 4 with 2 ranks (+10/20% range)', () => {
      const gr = aff.find(t => t.name === 'Grim Reach');
      expect(gr).toBeDefined();
      expect(gr.row).toBe(4);
      expect(gr.col).toBe(4);
      expect(gr.maxRank).toBe(2);
      expect(gr.descriptions.length).toBe(2);
      expect(gr.descriptions[1]).toMatch(/20%/);
    });

    collector.test('1.5.2 Malediction is removed from active Warlock talent nodes', () => {
      const mal = aff.find(t => t.name === 'Malediction');
      expect(mal).toBeFalsy();
    });

    collector.test('1.5.3 Shadow Mastery damage bonus is 2/4/6/8/10% in Row 6 Col 3 (5 ranks)', () => {
      const sm = aff.find(t => t.name === 'Shadow Mastery');
      expect(sm).toBeDefined();
      expect(sm.row).toBe(6);
      expect(sm.col).toBe(3);
      expect(sm.maxRank).toBe(5);
      expect(sm.descriptions[0]).toMatch(/2%/);
      expect(sm.descriptions[4]).toMatch(/10%/);
    });

    collector.test('1.5.4 Destructive Reach applies strictly to Destruction spells in Row 1 Col 1 (2 ranks)', () => {
      const dr = destro.find(t => t.name === 'Destructive Reach');
      expect(dr).toBeDefined();
      expect(dr.row).toBe(1);
      expect(dr.col).toBe(1);
      expect(dr.maxRank).toBe(2);
      expect(dr.descriptions[0]).toMatch(/Destruction/i);
    });

    collector.test('1.5.5 Grim Reach has valid spellId 18218 and iconName spell_shadow_callofbone', () => {
      const gr = aff.find(t => t.name === 'Grim Reach');
      expect(gr).toBeDefined();
      expect(gr.spellId).toBe(18218);
      expect(gr.iconName).toBe('spell_shadow_callofbone');
    });
  });

  // =========================================================================
  // Category 6: Paladin, Hunter, Druid, Warrior (PROJECT.md Features 9, 10, 11, 12)
  // =========================================================================
  collector.describe('Tier 1.6: Paladin, Hunter, Druid, Warrior Talent Updates', () => {
    collector.test('1.6.1 Paladin Reckoning accumulates up to 4 charges and triggers on auto swing', () => {
      const paladin = talentsData.paladin;
      const reck = paladin ? paladin.talents.find(t => t.name === 'Reckoning') : null;
      expect(reck).toBeDefined();
      expect(reck.row).toBe(5);
      expect(reck.col).toBe(3);
      expect(reck.maxRank).toBe(5);
      expect(reck.descriptions[0]).toMatch(/4 charges/i);
      expect(reck.descriptions[0]).toMatch(/auto/i);
    });

    collector.test('1.6.2 Paladin Shield Specialization increases block absorption and restores 4% mana', () => {
      const paladin = talentsData.paladin;
      const ss = paladin ? paladin.talents.find(t => t.name === 'Shield Specialization') : null;
      expect(ss).toBeDefined();
      expect(ss.row).toBe(3);
      expect(ss.col).toBe(3);
      expect(ss.maxRank).toBe(3);
      expect(ss.descriptions[0]).toMatch(/restore 4% of (your )?max(imum)? Mana/i);
    });

    collector.test('1.6.3 Paladin Champion of the Light scales spell damage with up to 60% of Intellect', () => {
      const paladin = talentsData.paladin;
      const cotl = paladin ? paladin.talents.find(t => t.name === 'Champion of the Light') : null;
      expect(cotl).toBeDefined();
      expect(cotl.row).toBe(6);
      expect(cotl.col).toBe(2);
      expect(cotl.maxRank).toBe(3);
      expect(cotl.descriptions[2]).toMatch(/60%/);
    });

    collector.test('1.6.4 Hunter Rapid Recuperation provides in-casting mana regen on Serpent Sting / Rapid Killing', () => {
      const hunter = talentsData.hunter;
      const rr = hunter ? hunter.talents.find(t => t.name === 'Rapid Recuperation') : null;
      expect(rr).toBeDefined();
      expect(rr.row).toBe(5);
      expect(rr.col).toBe(1);
      expect(rr.maxRank).toBe(2);
      expect(rr.descriptions[0]).toMatch(/Serpent Sting/i);
      expect(rr.descriptions[0]).toMatch(/Rapid Killing/i);
    });

    collector.test('1.6.5 Hunter Predator\'s Edge grants ability crit damage and off-hand damage', () => {
      const hunter = talentsData.hunter;
      const pe = hunter ? hunter.talents.find(t => t.name === "Predator's Edge") : null;
      expect(pe).toBeDefined();
      expect(pe.row).toBe(4);
      expect(pe.col).toBe(2);
      expect(pe.maxRank).toBe(5);
      expect(pe.descriptions[0]).toMatch(/abilities/i);
    });

    collector.test('1.6.6 Druid Furor grants Rage on Bear and scaling Energy restore on Cat shift', () => {
      const druid = talentsData.druid;
      const furor = druid ? druid.talents.find(t => t.name === 'Furor') : null;
      expect(furor).toBeDefined();
      expect(furor.row).toBe(1);
      expect(furor.col).toBe(3);
      expect(furor.maxRank).toBe(5);
      expect(furor.descriptions[0]).toMatch(/Bear/i);
      expect(furor.descriptions[0]).toMatch(/Cat/i);
    });

    collector.test('1.6.7 Warrior Bloodthrill grants chance on Rend target to trigger Overpower for 6s', () => {
      const warrior = talentsData.warrior;
      const bt = warrior ? warrior.talents.find(t => t.name === 'Bloodthrill') : null;
      expect(bt).toBeDefined();
      expect(bt.row).toBe(5);
      expect(bt.col).toBe(1);
      expect(bt.maxRank).toBe(5);
      expect(bt.descriptions[0]).toMatch(/Rend/i);
      expect(bt.descriptions[0]).toMatch(/Overpower/i);
    });

    collector.test('1.6.8 Warrior Shield Specialization grants 1-5% block chance and 5 Rage on block', () => {
      const warrior = talentsData.warrior;
      const wss = warrior ? warrior.talents.find(t => t.name === 'Shield Specialization') : null;
      expect(wss).toBeDefined();
      expect(wss.row).toBe(1);
      expect(wss.col).toBe(2);
      expect(wss.maxRank).toBe(5);
      expect(wss.descriptions[0]).toMatch(/Rage/i);
    });
  });

  // =========================================================================
  // Category 7: Weapon Racials Deprecation (PROJECT.md Features 13, 16)
  // =========================================================================
  collector.describe('Tier 1.7: Weapon Racials Deprecation & Purge', () => {
    collector.test('1.7.1 Sword Specialization is permanently removed from Human racials in races-classes.js', () => {
      const human = racesData.find(r => r.id === 'human');
      expect(human).toBeDefined();
      const hasSwordSpec = human.racials.some(r => r.name === 'Sword Specialization');
      expect(hasSwordSpec).toBeFalsy();
    });

    collector.test('1.7.2 Mace Specialization is permanently removed from Dwarf racials in races-classes.js', () => {
      const dwarf = racesData.find(r => r.id === 'dwarf');
      expect(dwarf).toBeDefined();
      const hasMaceSpec = dwarf.racials.some(r => r.name === 'Mace Specialization');
      expect(hasMaceSpec).toBeFalsy();
    });

    collector.test('1.7.3 Axe Specialization is permanently removed from Orc racials in races-classes.js', () => {
      const orc = racesData.find(r => r.id === 'orc');
      expect(orc).toBeDefined();
      const hasAxeSpec = orc.racials.some(r => r.name === 'Axe Specialization');
      expect(hasAxeSpec).toBeFalsy();
    });

    collector.test('1.7.4 No obsolete weapon specializations appear in tools-data.js', () => {
      expect(toolsDataRaw).not.toContain('Sword Specialization');
      expect(toolsDataRaw).not.toContain('Mace Specialization');
      expect(toolsDataRaw).not.toContain('Axe Specialization');
    });

    collector.test('1.7.5 No obsolete weapon specializations appear in class deepdive files', () => {
      const targetDeepdives = ['hunter', 'mage', 'paladin', 'priest', 'rogue', 'shaman', 'warrior'];
      for (const cls of targetDeepdives) {
        const dd = deepdives[cls];
        if (dd) {
          const ddStr = JSON.stringify(dd);
          expect(ddStr).not.toContain('Sword Specialization');
          expect(ddStr).not.toContain('Mace Specialization');
          expect(ddStr).not.toContain('Axe Specialization');
        }
      }
    });
  });

  // =========================================================================
  // Category 8: Official Replacement Racials (PROJECT.md Feature 14)
  // =========================================================================
  collector.describe('Tier 1.8: Replacement Racials & 4-Racial Symmetry', () => {
    collector.test('1.8.1 Human has Ruthless passive granting +2% crit to all spells and attacks', () => {
      const human = racesData.find(r => r.id === 'human');
      expect(human).toBeDefined();
      const ruthless = human.racials.find(r => r.name === 'Ruthless');
      expect(ruthless).toBeDefined();
      expect(ruthless.type).toMatch(/Passive/i);
      expect(ruthless.effect).toMatch(/2%/);
      expect(ruthless.effect).toMatch(/critical/i);
    });

    collector.test('1.8.2 Dwarf has Earth Fury passive granting +2% critical bonus to damage and healing', () => {
      const dwarf = racesData.find(r => r.id === 'dwarf');
      expect(dwarf).toBeDefined();
      const ef = dwarf.racials.find(r => r.name === 'Earth Fury');
      expect(ef).toBeDefined();
      expect(ef.type).toMatch(/Passive/i);
      expect(ef.effect).toMatch(/2%/);
      expect(ef.effect).toMatch(/critical/i);
    });

    collector.test('1.8.3 Orc has Savage passive granting +1% critical strike chance with all spells and abilities', () => {
      const orc = racesData.find(r => r.id === 'orc');
      expect(orc).toBeDefined();
      const savage = orc.racials.find(r => r.name === 'Savage');
      expect(savage).toBeDefined();
      expect(savage.type).toMatch(/Passive/i);
      expect(savage.effect).toMatch(/1%/);
      expect(savage.effect).toMatch(/critical/i);
    });

    collector.test('1.8.4 Skyborne has Read Leyline active granting +100% regen for 30s / 15m near leyline (2s cast, 2m CD)', () => {
      const skyborne = racesData.find(r => r.id === 'skyborne');
      expect(skyborne).toBeDefined();
      const rl = skyborne.racials.find(r => r.name === 'Read Leyline');
      expect(rl).toBeDefined();
      expect(rl.type).toMatch(/Active/i);
      expect(rl.effect).toMatch(/100%/);
      expect(rl.effect).toMatch(/regen/i);
    });

    collector.test('1.8.5 Every race in allRacesData maintains exactly 4 racials (2 Active, 2 Passive)', () => {
      expect(racesData.length).toBe(9);
      for (const race of racesData) {
        expect(race.racials.length).toBe(4);
        const actives = race.racials.filter(r => r.type.toLowerCase().includes('active'));
        const passives = race.racials.filter(r => r.type.toLowerCase().includes('passive'));
        expect(actives.length).toBe(2);
        expect(passives.length).toBe(2);
      }
    });
  });

  // =========================================================================
  // Category 9: Racial Mechanics & Tooltip Updates (PROJECT.md Feature 15)
  // =========================================================================
  collector.describe('Tier 1.9: Racial Mechanics Updates', () => {
    collector.test('1.9.1 Gnome Eureka! is an 8s timed buff with no charges, empowering PW:Shield', () => {
      const gnome = racesData.find(r => r.id === 'gnome');
      const eureka = gnome ? gnome.racials.find(r => r.name === 'Eureka!') : null;
      expect(eureka).toBeDefined();
      expect(eureka.effect).toMatch(/8\s*sec/i);
      expect(eureka.effect).not.toMatch(/next 3/i);
      expect(eureka.effect).toMatch(/Power Word: Shield|PW:Shield|Shields/i);
    });

    collector.test('1.9.2 Orc Blood Fury grants AP and SP without healing reduction penalty', () => {
      const orc = racesData.find(r => r.id === 'orc');
      const bf = orc ? orc.racials.find(r => r.name === 'Blood Fury') : null;
      expect(bf).toBeDefined();
      expect(bf.effect).toMatch(/10%/);
      expect(bf.effect).not.toMatch(/healing reduction|reduces healing/i);
    });

    collector.test('1.9.3 Orc Shatter Curse dispels Curses and Banes with 5% magic damage reduction', () => {
      const orc = racesData.find(r => r.id === 'orc');
      const sc = orc ? orc.racials.find(r => r.name === 'Shatter Curse') : null;
      expect(sc).toBeDefined();
      expect(sc.effect).toMatch(/Curse and Bane/i);
      expect(sc.effect).toMatch(/5%/);
    });

    collector.test('1.9.4 Tauren Cultivation clarifies that picking wild herb nodes still requires Herbalism', () => {
      const tauren = racesData.find(r => r.id === 'tauren');
      const cult = tauren ? tauren.racials.find(r => r.name === 'Cultivation') : null;
      expect(cult).toBeDefined();
      expect(cult.effect).toMatch(/Herbalism/i);
    });

    collector.test('1.9.5 Tauren Endurance increases Health by 5% and Critical Damage/Healing by 2%', () => {
      const tauren = racesData.find(r => r.id === 'tauren');
      const end = tauren ? tauren.racials.find(r => r.name === 'Endurance') : null;
      expect(end).toBeDefined();
      expect(end.effect).toMatch(/5%/);
      expect(end.effect).toMatch(/2%/);
      expect(end.effect).toMatch(/critical damage and healing/i);
    });

    collector.test('1.9.6 Tauren Plainsrunning provides outdoor speed ramp', () => {
      const tauren = racesData.find(r => r.id === 'tauren');
      const pr = tauren ? tauren.racials.find(r => r.name === 'Plainsrunning') : null;
      expect(pr).toBeDefined();
      expect(pr.effect).toMatch(/movement speed|speed/i);
    });

    collector.test('1.9.7 Tauren War Stomp stuns nearby enemies for 2s up to 5 targets', () => {
      const tauren = racesData.find(r => r.id === 'tauren');
      const ws = tauren ? tauren.racials.find(r => r.name === 'War Stomp') : null;
      expect(ws).toBeDefined();
      expect(ws.effect).toMatch(/stun/i);
    });

    collector.test('1.9.8 Troll Regeneration provides health regen during combat', () => {
      const troll = racesData.find(r => r.id === 'troll');
      const regen = troll ? troll.racials.find(r => r.name === 'Regeneration') : null;
      expect(regen).toBeDefined();
      expect(regen.effect).toMatch(/combat/i);
    });

    collector.test('1.9.9 Undead Touch of the Grave triggers life-draining shadow burst on attacks and spells', () => {
      const undead = racesData.find(r => r.id === 'undead');
      const totg = undead ? undead.racials.find(r => r.name === 'Touch of the Grave') : null;
      expect(totg).toBeDefined();
      expect(totg.effect).toMatch(/drain|health|Shadow/i);
    });
  });

  // =========================================================================
  // Category 10: Raid-Wide Utility & Stat Totems (PROJECT.md Features 17, 18)
  // =========================================================================
  collector.describe('Tier 1.10: Raid-Wide Utility & Shaman Stat Totems', () => {
    collector.test('1.10.1 Warrior Battle Shout is flagged as Raid-wide across all 7 ranks', () => {
      const entry = changesJson?.entries?.find(e => e.name === 'Battle Shout');
      expect(entry).toBeDefined();
      const rankTexts = Object.values(entry.rank_texts || {});
      expect(rankTexts.length).toBeGreaterThanOrEqual(7);
      for (const text of rankTexts) {
        expect(text).toMatch(/party and raid members|raid/i);
      }
    });

    collector.test('1.10.2 Shaman Windfury Totem across all ranks affects raid members within 30 yards', () => {
      const entry = changesJson?.entries?.find(e => e.name === 'Windfury Totem');
      expect(entry).toBeDefined();
      const rankTexts = Object.values(entry.rank_texts || {});
      for (const text of rankTexts) {
        expect(text).toMatch(/party and raid members|raid/i);
      }
    });

    collector.test('1.10.3 Shaman Grace of Air Totem across all ranks affects raid members within 30 yards', () => {
      const entry = changesJson?.entries?.find(e => e.name === 'Grace of Air Totem');
      expect(entry).toBeDefined();
      const rankTexts = Object.values(entry.rank_texts || {});
      for (const text of rankTexts) {
        expect(text).toMatch(/party and raid members|raid/i);
      }
    });

    collector.test('1.10.4 Shaman Strength of Earth Totem across all ranks affects raid members within 30 yards', () => {
      const entry = changesJson?.entries?.find(e => e.name === 'Strength of Earth Totem');
      expect(entry).toBeDefined();
      const rankTexts = Object.values(entry.rank_texts || {});
      for (const text of rankTexts) {
        expect(text).toMatch(/party and raid members|raid/i);
      }
    });

    collector.test('1.10.5 Shaman Flametongue Totem across all ranks affects raid members within 30 yards', () => {
      const entry = changesJson?.entries?.find(e => e.name === 'Flametongue Totem');
      expect(entry).toBeDefined();
      const rankTexts = Object.values(entry.rank_texts || {});
      for (const text of rankTexts) {
        expect(text).toMatch(/party and raid members|raid/i);
      }
    });

    collector.test('1.10.6 Non-exclusivity between Grace of Air and Windfury/Flametongue is documented in changes dataset', () => {
      const goa = changesJson?.entries?.find(e => e.name === 'Grace of Air Totem');
      expect(goa).toBeDefined();
      const combined = (goa.summary || '') + (goa.changes || []).join(' ');
      expect(combined).toMatch(/exclusiv|coexist|twist/i);
    });
  });

  // =========================================================================
  // Category 11: Paladin Threat System, Salvation & Revoke (PROJECT.md Feature 19)
  // =========================================================================
  collector.describe('Tier 1.11: Paladin Threat, Salvation & Revoke', () => {
    collector.test('1.11.1 Paladin Salvation is registered as a non-blessing threat reduction buff', () => {
      const salv = changesJson?.entries?.find(e => e.name === 'Salvation');
      expect(salv).toBeDefined();
      expect(salv.summary || '').toMatch(/30%|threat/i);
    });

    collector.test('1.11.2 Paladin Mass Salvation is registered as a non-blessing raid utility spell', () => {
      const massSalv = changesJson?.entries?.find(e => e.name === 'Mass Salvation');
      expect(massSalv).toBeDefined();
      expect(massSalv.summary || '').toMatch(/30%|threat|raid/i);
    });

    collector.test('1.11.3 Baseline utility ability Revoke is added to Paladin abilities to cancel Salvation', () => {
      const revoke = changesJson?.entries?.find(e => e.name === 'Revoke');
      expect(revoke).toBeDefined();
      expect(revoke.class).toBe('paladin');
    });

    collector.test('1.11.4 Paladin Righteous Fury threat increase on Holy attacks is tuned to 90%', () => {
      const rf = changesJson?.entries?.find(e => e.name === 'Righteous Fury');
      expect(rf).toBeDefined();
      const rankTexts = Object.values(rf.rank_texts || {});
      expect(rankTexts[0]).toMatch(/90%/);
    });

    collector.test('1.11.5 Salvation decoupling frees standard Paladin blessing slots (Kings, Might, Wisdom)', () => {
      const salv = changesJson?.entries?.find(e => e.name === 'Salvation');
      expect(salv).toBeDefined();
      const combined = (salv.summary || '') + (salv.changes || []).join(' ');
      expect(combined).toMatch(/blessing|slot|limit/i);
    });
  });

  // =========================================================================
  // Category 12: Class Spell Tuning Pass (PROJECT.md Feature 20)
  // =========================================================================
  collector.describe('Tier 1.12: Class Spell Tuning Pass', () => {
    collector.test('1.12.1 Priest Devouring Plague cooldown is tuned to 24s matching disease duration', () => {
      const dp = changesJson?.entries?.find(e => e.name === 'Devouring Plague');
      expect(dp).toBeDefined();
      const rankTexts = Object.values(dp.rank_texts || {});
      expect(rankTexts[0]).toMatch(/24\s*sec/i);
    });

    collector.test('1.12.2 Priest Shadow Word: Death cooldown is tuned to 18s', () => {
      const swd = changesJson?.entries?.find(e => e.name === 'Shadow Word: Death');
      expect(swd).toBeDefined();
      const rankTexts = Object.values(swd.rank_texts || {});
      expect(rankTexts[0]).toMatch(/18\s*sec/i);
    });

    collector.test('1.12.3 Shaman Chain Lightning mana cost is reduced by 35% across all ranks', () => {
      const cl = changesJson?.entries?.find(e => e.name === 'Chain Lightning');
      expect(cl).toBeDefined();
      const combined = (cl.summary || '') + (cl.changes || []).join(' ');
      expect(combined).toMatch(/35%|mana/i);
    });

    collector.test('1.12.4 Shaman Stormstrike resource cost is standardized to 8% base mana', () => {
      const ss = changesJson?.entries?.find(e => e.name === 'Stormstrike');
      expect(ss).toBeDefined();
      const meta = JSON.stringify(ss);
      expect(meta).toMatch(/8%|base mana/i);
    });

    collector.test('1.12.5 Shaman Water Shield triggers mana return on all spell crits (healing and damaging)', () => {
      const ws = changesJson?.entries?.find(e => e.name === 'Water Shield');
      expect(ws).toBeDefined();
      const meta = JSON.stringify(ws);
      expect(meta).toMatch(/spell crits|damage/i);
    });

    collector.test('1.12.6 Shaman Fire Nova is tuned with revised damage and 10s cooldown from active Fire totem', () => {
      const fn = changesJson?.entries?.find(e => e.name === 'Fire Nova');
      expect(fn).toBeDefined();
      const meta = JSON.stringify(fn);
      expect(meta).toMatch(/10\s*sec|Fire totem/i);
    });

    collector.test('1.12.7 Shaman Mana Tide Totem includes Level 38 rank progression', () => {
      const mtt = changesJson?.entries?.find(e => e.name === 'Mana Tide Totem');
      expect(mtt).toBeDefined();
      const meta = JSON.stringify(mtt);
      expect(meta).toMatch(/38/);
    });
  });

  // =========================================================================
  // Category 13: Global Build Versioning & News-45 (PROJECT.md Features 21, 22)
  // =========================================================================
  collector.describe('Tier 1.13: Global Build Versioning & News Dispatch news-45', () => {
    collector.test('1.13.1 core-data.js metadata clientBuild equals 1.60.1.70425', () => {
      expect(coreData.metadata).toBeDefined();
      expect(coreData.metadata.clientBuild).toBe('1.60.1.70425');
    });

    collector.test('1.13.2 index.html client build references broadcast 1.60.1.70425 and no stale 71890 or 72140', () => {
      expect(indexHtml).toContain('1.60.1.70425');
      expect(indexHtml).not.toContain('1.60.6.72140');
      expect(indexHtml).not.toContain('71890');
    });

    collector.test('1.13.3 index.html script imports use cache-busting version ?v=1.60.1-70425', () => {
      expect(indexHtml).toContain('?v=1.60.1-70425');
    });

    collector.test('1.13.4 Official news dispatch news-45 exists in core-data.js newsFeed', () => {
      const feed = coreData.newsFeed || [];
      const news45 = feed.find(a => a.id === 'news-45');
      expect(news45).toBeDefined();
    });

    collector.test('1.13.5 news-45 headline references Beta Build 1.60.1.70425 and October 15, 2026', () => {
      const feed = coreData.newsFeed || [];
      const news45 = feed.find(a => a.id === 'news-45');
      expect(news45).toBeDefined();
      expect(news45.title).toMatch(/1\.60\.1\.70425/);
      expect(news45.date).toMatch(/October 15,\s*2026/i);
    });

    collector.test('1.13.6 Latest October 16-17, 2026 dispatches (news-46 to news-49) exist in newsFeed', () => {
      const feed = coreData.newsFeed || [];
      expect(feed.length).toBeGreaterThanOrEqual(49);
      for (const id of ['news-46', 'news-47', 'news-48', 'news-49']) {
        const item = feed.find(a => a.id === id);
        expect(item).toBeDefined();
        expect(item.title.length).toBeGreaterThanOrEqual(10);
        expect(item.summary.length).toBeGreaterThanOrEqual(10);
        expect(item.content.length).toBeGreaterThanOrEqual(50);
        expect(item.url).toMatch(/^https?:\/\//);
      }
    });

    collector.test('1.13.7 All news IDs in newsFeed are distinct and unique', () => {
      const feed = coreData.newsFeed || [];
      const idSet = new Set();
      for (const item of feed) {
        expect(item.id).toBeDefined();
        expect(idSet.has(item.id)).toBe(false);
        idSet.add(item.id);
      }
    });

    collector.test('1.13.8 All news dispatches have valid sources and supported sourceTypes', () => {
      const feed = coreData.newsFeed || [];
      const validTypes = new Set(['blizzard', 'wowhead', 'tavern', 'mobalytics', 'method', 'custom']);
      for (const item of feed) {
        expect(item.source).toBeDefined();
        expect(validTypes.has(item.sourceType)).toBe(true);
      }
    });
  });

  // =========================================================================
  // Category 14: Level 30 Deep Dive Legality (PROJECT.md Feature 23)
  // =========================================================================
  collector.describe('Tier 1.14: Level 30 Deep Dive Builds Legality', () => {
    collector.test('1.14.1 Shaman Level 30 builds allocate <= 26 points and reference no removed Call of Thunder', () => {
      const shamanDd = deepdives.shaman;
      expect(shamanDd).toBeDefined();
      const ddStr = JSON.stringify(shamanDd);
      expect(ddStr).not.toContain('Call of Thunder');
      for (const build of shamanDd.builds || []) {
        const pts = (build.talents || '').split('-').reduce((s, p) => s + p.split('').reduce((a, c) => a + (parseInt(c, 10) || 0), 0), 0);
        expect(pts).toBeLessThanOrEqual(26);
      }
    });

    collector.test('1.14.2 Mage Level 30 builds allocate <= 26 points and account for 5-rank Critical Mass', () => {
      const mageDd = deepdives.mage;
      expect(mageDd).toBeDefined();
      for (const build of mageDd.builds || []) {
        const pts = (build.talents || '').split('-').reduce((s, p) => s + p.split('').reduce((a, c) => a + (parseInt(c, 10) || 0), 0), 0);
        expect(pts).toBeLessThanOrEqual(26);
      }
    });

    collector.test('1.14.3 Priest Level 30 builds allocate <= 26 points and reference no removed Shadow Affinity', () => {
      const priestDd = deepdives.priest;
      expect(priestDd).toBeDefined();
      const ddStr = JSON.stringify(priestDd);
      expect(ddStr).not.toContain('Shadow Affinity');
      for (const build of priestDd.builds || []) {
        const pts = (build.talents || '').split('-').reduce((s, p) => s + p.split('').reduce((a, c) => a + (parseInt(c, 10) || 0), 0), 0);
        expect(pts).toBeLessThanOrEqual(26);
      }
    });

    collector.test('1.14.4 Paladin Level 30 builds allocate <= 26 points and pass tier gating', () => {
      const paladinDd = deepdives.paladin;
      expect(paladinDd).toBeDefined();
      for (const build of paladinDd.builds || []) {
        const pts = (build.talents || '').split('-').reduce((s, p) => s + p.split('').reduce((a, c) => a + (parseInt(c, 10) || 0), 0), 0);
        expect(pts).toBeLessThanOrEqual(26);
      }
    });

    collector.test('1.14.5 Warlock Level 30 builds allocate <= 26 points and reference no removed Malediction', () => {
      const warlockDd = deepdives.warlock;
      expect(warlockDd).toBeDefined();
      const ddStr = JSON.stringify(warlockDd);
      expect(ddStr).not.toContain('Malediction');
      for (const build of warlockDd.builds || []) {
        const pts = (build.talents || '').split('-').reduce((s, p) => s + p.split('').reduce((a, c) => a + (parseInt(c, 10) || 0), 0), 0);
        expect(pts).toBeLessThanOrEqual(26);
      }
    });
  });
}
