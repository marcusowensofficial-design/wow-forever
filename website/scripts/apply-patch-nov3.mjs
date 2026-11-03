/**
 * Automated script to apply all November 2/3 official patch updates and hotfixes.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');

console.log('--- APPLYING NOVEMBER 2 & 3 PATCH UPDATES ---');

// 1. UPDATE TALENTS DATA (js/data/talents-data.js)
const talentsPath = path.join(ROOT, 'js', 'data', 'talents-data.js');
let talentsRaw = fs.readFileSync(talentsPath, 'utf8');

// Match window.WOW_TALENTS_DATA = { ... };
const talentsMatch = talentsRaw.match(/window\.WOW_TALENTS_DATA\s*=\s*(\{[\s\S]*\});?\s*$/);
if (!talentsMatch) {
  throw new Error('Failed to match WOW_TALENTS_DATA in talents-data.js');
}

// We can safely parse by running in VM or using Function
const getTalents = new Function(`return ${talentsMatch[1]}`);
const talentsData = getTalents();

// --- A. DRUID ---
{
  const druid = talentsData.druid;
  // Genesis: 2/4/6/8/10%
  const genesis = druid.talents.find(t => t.name === 'Genesis');
  if (genesis) {
    genesis.descriptions = [
      'Increases the periodic damage and healing done by your spells and abilities by 2%.',
      'Increases the periodic damage and healing done by your spells and abilities by 4%.',
      'Increases the periodic damage and healing done by your spells and abilities by 6%.',
      'Increases the periodic damage and healing done by your spells and abilities by 8%.',
      'Increases the periodic damage and healing done by your spells and abilities by 10%.'
    ];
  }
  // Rend and Tear: 3/6/9/12/15%
  const rendAndTear = druid.talents.find(t => t.name === 'Rend and Tear');
  if (rendAndTear) {
    rendAndTear.descriptions = [
      'Increases damage done by your melee abilities on Bleeding targets by 3%.',
      'Increases damage done by your melee abilities on Bleeding targets by 6%.',
      'Increases damage done by your melee abilities on Bleeding targets by 9%.',
      'Increases damage done by your melee abilities on Bleeding targets by 12%.',
      'Increases damage done by your melee abilities on Bleeding targets by 15%.'
    ];
  }
}

// --- B. HUNTER ---
{
  const hunter = talentsData.hunter;
  // Barrage: 5/10/15%
  const barrage = hunter.talents.find(t => t.name === 'Barrage');
  if (barrage) {
    barrage.descriptions = [
      'Increases the damage done by your Multi-Shot, Aimed Shot, and Volley abilities by 5%.',
      'Increases the damage done by your Multi-Shot, Aimed Shot, and Volley abilities by 10%.',
      'Increases the damage done by your Multi-Shot, Aimed Shot, and Volley abilities by 15%.'
    ];
  }
  // Sniper Shot: Rank 1: 320, Rank 2: 450, Rank 3: 590
  const sniperShot = hunter.talents.find(t => t.name === 'Sniper Shot');
  if (sniperShot) {
    sniperShot.descriptions = [
      'A long-range shot that deals ranged damage plus 320 and increases the range of your next 3 Shots by 10 yards for 10 sec.',
      'A long-range shot that deals ranged damage plus 450 and increases the range of your next 3 Shots by 10 yards for 10 sec.',
      'A long-range shot that deals ranged damage plus 590 and increases the range of your next 3 Shots by 10 yards for 10 sec.'
    ];
    // if sniperShot has maxRank 1 in the data currently, keep its maxRank or update descriptions
    if (sniperShot.maxRank === 1) {
      sniperShot.descriptions = [
        'A long-range shot that deals ranged damage plus 320 and increases the range of your next 3 Shots by 10 yards for 10 sec.'
      ];
    }
  }
  // Trueshot Aura: 20, 35, 50, 75, 100
  const trueshotAura = hunter.talents.find(t => t.name === 'Trueshot Aura');
  if (trueshotAura) {
    trueshotAura.descriptions = [
      'Increases the Ranged Attack Power of party or raid members within 45 yds by 20.'
    ];
  }
  // Lightning Reflexes: 3/6/9/12/15%
  const lightningReflexes = hunter.talents.find(t => t.name === 'Lightning Reflexes');
  if (lightningReflexes) {
    lightningReflexes.descriptions = [
      'Increases your Agility by 3%.',
      'Increases your Agility by 6%.',
      'Increases your Agility by 9%.',
      'Increases your Agility by 12%.',
      'Increases your Agility by 15%.'
    ];
  }
}

// --- C. MAGE ---
{
  const mage = talentsData.mage;
  const wc = mage.talents.find(t => t.name === "Winter's Chill");
  if (wc) {
    wc.descriptions = [
      "Gives your Frostbolt and Fingers of Frost empowered Ice Lance spells a 20% chance to apply Winter's Chill, increasing the target's damage taken from your next Cone of Cold by 20% and it gains an additional 7% of your spell damage, stacking up to 5 times.",
      "Gives your Frostbolt and Fingers of Frost empowered Ice Lance spells a 40% chance to apply Winter's Chill, increasing the target's damage taken from your next Cone of Cold by 20% and it gains an additional 7% of your spell damage, stacking up to 5 times.",
      "Gives your Frostbolt and Fingers of Frost empowered Ice Lance spells a 60% chance to apply Winter's Chill, increasing the target's damage taken from your next Cone of Cold by 20% and it gains an additional 7% of your spell damage, stacking up to 5 times.",
      "Gives your Frostbolt and Fingers of Frost empowered Ice Lance spells a 80% chance to apply Winter's Chill, increasing the target's damage taken from your next Cone of Cold by 20% and it gains an additional 7% of your spell damage, stacking up to 5 times.",
      "Gives your Frostbolt and Fingers of Frost empowered Ice Lance spells a 100% chance to apply Winter's Chill, increasing the target's damage taken from your next Cone of Cold by 20% and it gains an additional 7% of your spell damage, stacking up to 5 times."
    ];
  }
}

// --- D. PALADIN ---
{
  const paladin = talentsData.paladin;
  const thw = paladin.talents.find(t => t.name === 'Two-Handed Weapon Specialization');
  if (thw) {
    thw.descriptions = [
      'Increases both Holy and physical damage you deal by 2%, and reduces all threat you generate by 7% while a two-handed melee weapon is equipped.',
      'Increases both Holy and physical damage you deal by 4%, and reduces all threat you generate by 14% while a two-handed melee weapon is equipped.',
      'Increases both Holy and physical damage you deal by 6%, and reduces all threat you generate by 20% while a two-handed melee weapon is equipped.'
    ];
  }
}

// --- E. ROGUE ---
{
  const rogue = talentsData.rogue;
  
  // 1. Remove Murder (id 161)
  rogue.talents = rogue.talents.filter(t => t.name !== 'Murder');
  
  // 2. Improved Expose Armor (id 164) moved to Row 2 (was Row 3)
  const impEA = rogue.talents.find(t => t.name === 'Improved Expose Armor');
  if (impEA) {
    impEA.row = 2;
    impEA.col = 2;
  }

  // 3. Lethality (id 165) -> 2 points (10/20%)
  const lethality = rogue.talents.find(t => t.name === 'Lethality');
  if (lethality) {
    lethality.maxRank = 2;
    lethality.descriptions = [
      'Increases the critical strike damage bonus of your Sinister Strike, Gouge, Backstab, Mutilate, Ghostly Strike, and Hemorrhage abilities by 10%.',
      'Increases the critical strike damage bonus of your Sinister Strike, Gouge, Backstab, Mutilate, Ghostly Strike, and Hemorrhage abilities by 20%.'
    ];
  }

  // 4. Vigor (id 169) moved to Row 3 (was Row 5)
  const vigor = rogue.talents.find(t => t.name === 'Vigor');
  if (vigor) {
    vigor.row = 3;
    vigor.col = 1;
    vigor.maxRank = 1;
    vigor.descriptions = ['Increases your maximum Energy by 10.'];
  }

  // 5. Blood Splatter: New 1-point talent in Row 3
  const bloodSplatter = {
    id: 501,
    tree: 0,
    treeId: 8,
    name: 'Blood Splatter',
    icon: 'https://render.worldofwarcraft.com/us/icons/56/ability_rogue_bloodyeye.jpg',
    iconName: 'ability_rogue_bloodyeye',
    row: 3,
    col: 2,
    maxRank: 1,
    spellId: 47168,
    req: null,
    descriptions: [
      'Increases the duration of your Rupture ability by 6 seconds and your Garrote ability by 9 seconds.'
    ]
  };
  if (!rogue.talents.some(t => t.name === 'Blood Splatter')) {
    rogue.talents.push(bloodSplatter);
  }

  // 6. Relentless Strikes (id 163) moved to Row 5 (was Row 3), 5 ranks (4/8/12/16/20%)
  const relStrikes = rogue.talents.find(t => t.name === 'Relentless Strikes');
  if (relStrikes) {
    relStrikes.row = 5;
    relStrikes.col = 1;
    relStrikes.maxRank = 5;
    relStrikes.descriptions = [
      'Your finishing moves have a 4% chance per combo point to restore 25 Energy.',
      'Your finishing moves have a 8% chance per combo point to restore 25 Energy.',
      'Your finishing moves have a 12% chance per combo point to restore 25 Energy.',
      'Your finishing moves have a 16% chance per combo point to restore 25 Energy.',
      'Your finishing moves have a 20% chance per combo point to restore 25 Energy.'
    ];
  }

  // 7. Venom (id 173) moved to Row 5 (was Row 7), Passive
  const venom = rogue.talents.find(t => t.name === 'Venom');
  if (venom) {
    venom.row = 5;
    venom.col = 2;
    venom.maxRank = 1;
    venom.req = null;
    venom.descriptions = [
      'Your Shank ability increases your Poison damage by 30% and your chance to apply Poisons by 20% for 6 seconds.'
    ];
  }

  // 8. Seal Fate (id 172) -> 3 points (33/66/100%)
  const sealFate = rogue.talents.find(t => t.name === 'Seal Fate');
  if (sealFate) {
    sealFate.maxRank = 3;
    sealFate.descriptions = [
      'Your critical strikes from abilities that add combo points have a 33% chance to add an additional combo point.',
      'Your critical strikes from abilities that add combo points have a 66% chance to add an additional combo point.',
      'Your critical strikes from abilities that add combo points have a 100% chance to add an additional combo point.'
    ];
  }

  // 9. Mutilate (id 170) moved to Row 7 (was Row 5)
  const mutilate = rogue.talents.find(t => t.name === 'Mutilate');
  if (mutilate) {
    mutilate.row = 7;
    mutilate.col = 2;
    mutilate.req = null;
    mutilate.descriptions = [
      'Instantly attacks with both weapons for 90% weapon damage plus an additional 60 with each weapon. Damage is increased by 20% against Poisoned targets. Awards 2 combo points.'
    ];
  }

  // --- COMBAT TREE ---
  // Coup de Grace (renamed from Improved Eviscerate id 174)
  const impEvis = rogue.talents.find(t => t.name === 'Improved Eviscerate' || t.name === 'Coup de Grace');
  if (impEvis) {
    impEvis.name = 'Coup de Grace';
    impEvis.descriptions = [
      'Increases the damage done by your Eviscerate ability by 7%, and the damage and storage rate of your Death Mark ability by 7%.',
      'Increases the damage done by your Eviscerate ability by 13%, and the damage and storage rate of your Death Mark ability by 13%.',
      'Increases the damage done by your Eviscerate ability by 20%, and the damage and storage rate of your Death Mark ability by 20%.'
    ];
  }

  // Efficient Strikes (renamed from Improved Sinister Strike id 175)
  const impSS = rogue.talents.find(t => t.name === 'Improved Sinister Strike' || t.name === 'Efficient Strikes');
  if (impSS) {
    impSS.name = 'Efficient Strikes';
    impSS.descriptions = [
      'Reduces the Energy cost of your Sinister Strike and Hemorrhage abilities by 3.',
      'Reduces the Energy cost of your Sinister Strike and Hemorrhage abilities by 5.'
    ];
  }

  // Improved Sprint (id 182) moved to Row 2 (was Row 3)
  const impSprint = rogue.talents.find(t => t.name === 'Improved Sprint');
  if (impSprint) {
    impSprint.row = 2;
    impSprint.col = 4;
  }

  // Composure: New 2-point talent in Row 3
  const composure = {
    id: 502,
    tree: 1,
    treeId: 7,
    name: 'Composure',
    icon: 'https://render.worldofwarcraft.com/us/icons/56/ability_rogue_stayingfocused.jpg',
    iconName: 'ability_rogue_stayingfocused',
    row: 3,
    col: 4,
    maxRank: 2,
    spellId: 47169,
    req: null,
    descriptions: [
      'Increases the Energy cost reduction of your Poised ability by 5.',
      'Increases the Energy cost reduction of your Poised ability by 10.'
    ]
  };
  if (!rogue.talents.some(t => t.name === 'Composure')) {
    rogue.talents.push(composure);
  }

  // Flawless Execution (id 184) -> -15 energy
  const flawlessExec = rogue.talents.find(t => t.name === 'Flawless Execution');
  if (flawlessExec) {
    flawlessExec.descriptions = [
      'Reduces the Energy cost of your Finishing Moves by 15.'
    ];
  }

  // Weapon Expertise (id 188) moved to Row 4 (was Row 6)
  const weaponExp = rogue.talents.find(t => t.name === 'Weapon Expertise');
  if (weaponExp) {
    weaponExp.row = 4;
    weaponExp.col = 3;
    weaponExp.req = null;
  }

  // Aggression (id 189) moved to Row 4 (was Row 6), 5/10/15% SS and Evis
  const aggression = rogue.talents.find(t => t.name === 'Aggression');
  if (aggression) {
    aggression.row = 4;
    aggression.col = 4;
    aggression.descriptions = [
      'Increases the damage of your Sinister Strike and Eviscerate abilities by 5%.',
      'Increases the damage of your Sinister Strike and Eviscerate abilities by 10%.',
      'Increases the damage of your Sinister Strike and Eviscerate abilities by 15%.'
    ];
  }

  // Dual Wield Specialization (id 185) moved to Row 5 (was Row 4), 2 points (25/50%)
  const dwSpec = rogue.talents.find(t => t.name === 'Dual Wield Specialization');
  if (dwSpec) {
    dwSpec.row = 5;
    dwSpec.col = 1;
    dwSpec.maxRank = 2;
    dwSpec.req = null;
    dwSpec.descriptions = [
      'Increases the damage done by your off-hand weapon by 25%.',
      'Increases the damage done by your off-hand weapon by 50%.'
    ];
  }

  // Flash of Steel: New 5-point talent in Row 6
  const flashOfSteel = {
    id: 503,
    tree: 1,
    treeId: 7,
    name: 'Flash of Steel',
    icon: 'https://render.worldofwarcraft.com/us/icons/56/ability_rogue_shadowstrikes.jpg',
    iconName: 'ability_rogue_shadowstrikes',
    row: 6,
    col: 2,
    maxRank: 5,
    spellId: 47170,
    req: null,
    descriptions: [
      'Increases the energy generated by your Shank ability by 3 and reduces its cooldown by 0.4 seconds.',
      'Increases the energy generated by your Shank ability by 6 and reduces its cooldown by 0.8 seconds.',
      'Increases the energy generated by your Shank ability by 9 and reduces its cooldown by 1.2 seconds.',
      'Increases the energy generated by your Shank ability by 12 and reduces its cooldown by 1.6 seconds.',
      'Increases the energy generated by your Shank ability by 15 and reduces its cooldown by 2.0 seconds.'
    ]
  };
  if (!rogue.talents.some(t => t.name === 'Flash of Steel')) {
    rogue.talents.push(flashOfSteel);
  }

  // --- SUBTLETY TREE ---
  // Setup (id 194) moved to Row 1 (was Row 2), 15/30/45%
  const setup = rogue.talents.find(t => t.name === 'Setup');
  if (setup) {
    setup.row = 1;
    setup.col = 1;
    setup.descriptions = [
      'Gives you a 15% chance to add a combo point to your target after dodging their attack or fully resisting one of their spells.',
      'Gives you a 30% chance to add a combo point to your target after dodging their attack or fully resisting one of their spells.',
      'Gives you a 45% chance to add a combo point to your target after dodging their attack or fully resisting one of their spells.'
    ];
  }

  // Opportunity (id 193) changed to 5 points (4/8/12/16/20%)
  const opp = rogue.talents.find(t => t.name === 'Opportunity');
  if (opp) {
    opp.maxRank = 5;
    opp.descriptions = [
      'Increases the damage dealt when striking from behind with your Backstab, Garrote, Ambush, or Mutilate abilities by 4%.',
      'Increases the damage dealt when striking from behind with your Backstab, Garrote, Ambush, or Mutilate abilities by 8%.',
      'Increases the damage dealt when striking from behind with your Backstab, Garrote, Ambush, or Mutilate abilities by 12%.',
      'Increases the damage dealt when striking from behind with your Backstab, Garrote, Ambush, or Mutilate abilities by 16%.',
      'Increases the damage dealt when striking from behind with your Backstab, Garrote, Ambush, or Mutilate abilities by 20%.'
    ];
  }

  // Camouflage (id 191) moved to Row 2 (was Row 1), 3 points (5/10/15% speed, -2/4/6s CD)
  const camo = rogue.talents.find(t => t.name === 'Camouflage');
  if (camo) {
    camo.row = 2;
    camo.col = 1;
    camo.maxRank = 3;
    camo.descriptions = [
      'Increases your speed while stealthed by 5% and reduces the cooldown of your Stealth ability by 2 sec.',
      'Increases your speed while stealthed by 10% and reduces the cooldown of your Stealth ability by 4 sec.',
      'Increases your speed while stealthed by 15% and reduces the cooldown of your Stealth ability by 6 sec.'
    ];
  }

  // Dirty Deeds (id 204) moved to Row 2 (was Row 5)
  const dd = rogue.talents.find(t => t.name === 'Dirty Deeds');
  if (dd) {
    dd.row = 2;
    dd.col = 2;
  }

  // Premeditation (id 202) moved to Row 3 (was Row 4)
  const premed = rogue.talents.find(t => t.name === 'Premeditation');
  if (premed) {
    premed.row = 3;
    premed.col = 2;
  }

  // Serrated Blades (id 203) moved to Row 3 (was Row 4)
  const serrated = rogue.talents.find(t => t.name === 'Serrated Blades');
  if (serrated) {
    serrated.row = 3;
    serrated.col = 3;
  }

  // Elusiveness (id 195) moved to Row 4 (was Row 2)
  const elusiveness = rogue.talents.find(t => t.name === 'Elusiveness');
  if (elusiveness) {
    elusiveness.row = 4;
    elusiveness.col = 1;
  }

  // Ghostly Strike (id 199) moved to Row 4 (was Row 3), unstealthed Ambush/Garrote within 7s
  const ghostly = rogue.talents.find(t => t.name === 'Ghostly Strike');
  if (ghostly) {
    ghostly.row = 4;
    ghostly.col = 2;
    ghostly.descriptions = [
      'A strike that deals 125% weapon damage and increases your chance to dodge by 15% for 7 sec. In addition, causes your next Ambush or Garrote cast within 7 seconds to not require Stealth. Awards 1 combo point.'
    ];
  }

  // Remove Improved Distract (id 200)
  rogue.talents = rogue.talents.filter(t => t.name !== 'Improved Distract');

  // Quick Getaway: New 2-point talent in Row 4
  const quickGetaway = {
    id: 504,
    tree: 2,
    treeId: 9,
    name: 'Quick Getaway',
    icon: 'https://render.worldofwarcraft.com/us/icons/56/ability_rogue_sprint.jpg',
    iconName: 'ability_rogue_sprint',
    row: 4,
    col: 3,
    maxRank: 2,
    spellId: 47171,
    req: null,
    descriptions: [
      'Increases the maximum number of targets you may have Sapped by 1 and increases your movement speed by 15% for 3 seconds after sapping a target.',
      'Increases the maximum number of targets you may have Sapped by 1 and increases your movement speed by 30% for 3 seconds after sapping a target.'
    ]
  };
  if (!rogue.talents.some(t => t.name === 'Quick Getaway')) {
    rogue.talents.push(quickGetaway);
  }

  // Heightened Senses (id 201) moved to Row 5 (was Row 4)
  const hs = rogue.talents.find(t => t.name === 'Heightened Senses');
  if (hs) {
    hs.row = 5;
    hs.col = 1;
  }

  // Hemorrhage (id 206) -> increases Rupture and Garrote by 15%
  const hemo = rogue.talents.find(t => t.name === 'Hemorrhage');
  if (hemo) {
    hemo.descriptions = [
      'An instant strike that damages the opponent and causes the target to hemorrhage, increasing the physical damage dealt to the target by up to 3. Lasts 30 charges or 15 sec. In addition, increases the damage of the caster\'s Rupture and Garrote abilities by 15%. Awards 1 combo point.'
    ];
  }

  // Purge Quietus (id 207), Cutthroat (id 208), Thousand Cuts (id 209)
  rogue.talents = rogue.talents.filter(t => !['Quietus', 'Cutthroat', 'Thousand Cuts'].includes(t.name));

  // Boot Knife: New 5-point talent in Row 6
  const bootKnife = {
    id: 505,
    tree: 2,
    treeId: 9,
    name: 'Boot Knife',
    icon: 'https://render.worldofwarcraft.com/us/icons/56/inv_throwingknife_04.jpg',
    iconName: 'inv_throwingknife_04',
    row: 6,
    col: 2,
    maxRank: 5,
    spellId: 47172,
    req: null,
    descriptions: [
      'Gives your Shank ability a 20% chance to add 2 combo points to the target.',
      'Gives your Shank ability a 40% chance to add 2 combo points to the target.',
      'Gives your Shank ability a 60% chance to add 2 combo points to the target.',
      'Gives your Shank ability a 80% chance to add 2 combo points to the target.',
      'Gives your Shank ability a 100% chance to add 2 combo points to the target.'
    ]
  };
  if (!rogue.talents.some(t => t.name === 'Boot Knife')) {
    rogue.talents.push(bootKnife);
  }

  // Death Mark: New Row 7 capstone
  const deathMark = {
    id: 506,
    tree: 2,
    treeId: 9,
    name: 'Death Mark',
    icon: 'https://render.worldofwarcraft.com/us/icons/56/spell_shadow_deathmark.jpg',
    iconName: 'spell_shadow_deathmark',
    row: 7,
    col: 2,
    maxRank: 1,
    spellId: 47173,
    req: 205, // Preparation
    descriptions: [
      '25 Energy, 20 yd range, Instant, 10 sec cooldown. Finishing move that marks the target, storing a portion of the damage dealt by your attacks per Combo Point. Garrote and Rupture damage is stored at twice the rate. After 6 sec, the stored damage is dealt up to a maximum increased by Attack Power and Critical Strike chance.'
    ]
  };
  if (!rogue.talents.some(t => t.name === 'Death Mark')) {
    rogue.talents.push(deathMark);
  }
}

// --- F. SHAMAN ---
{
  const shaman = talentsData.shaman;
  // Lightning Overload (id 275) -> 10/20/30%
  const lo = shaman.talents.find(t => t.name === 'Lightning Overload');
  if (lo) {
    lo.descriptions = [
      'Gives your Lightning Bolt and Chain Lightning spells a 10% chance to cast a second, similar spell on the same target at no additional cost that causes half damage and no threat.',
      'Gives your Lightning Bolt and Chain Lightning spells a 20% chance to cast a second, similar spell on the same target at no additional cost that causes half damage and no threat.',
      'Gives your Lightning Bolt and Chain Lightning spells a 30% chance to cast a second, similar spell on the same target at no additional cost that causes half damage and no threat.'
    ];
  }

  // Lava Burst (id 278) -> Replace with Call of Thunder
  const lavaBurst = shaman.talents.find(t => t.name === 'Lava Burst' || t.name === 'Call of Thunder');
  if (lavaBurst) {
    lavaBurst.name = 'Call of Thunder';
    lavaBurst.iconName = 'spell_nature_callstorm';
    lavaBurst.icon = 'https://render.worldofwarcraft.com/us/icons/56/spell_nature_callstorm.jpg';
    lavaBurst.descriptions = [
      'Increases the critical strike chance of your Lightning Bolt and Chain Lightning spells by 5%.'
    ];
  }

  // Elemental Mastery (id 474) -> Rename to Lightning Mastery
  const em = shaman.talents.find(t => t.name === 'Elemental Mastery' || t.name === 'Lightning Mastery');
  if (em) {
    em.name = 'Lightning Mastery';
    em.iconName = 'spell_nature_lightning';
    em.icon = 'https://render.worldofwarcraft.com/us/icons/56/spell_nature_lightning.jpg';
  }

  // Call of Flame (id 267) -> remove Lava Burst mention
  const callOfFlame = shaman.talents.find(t => t.name === 'Call of Flame');
  if (callOfFlame) {
    callOfFlame.descriptions = [
      'Increases the damage done by your Fire Totems and by your Flame Shock and Fire Nova spells by 5%, as well as increases the duration of your Flame Shock spell by 3 sec.',
      'Increases the damage done by your Fire Totems and by your Flame Shock and Fire Nova spells by 10%, as well as increases the duration of your Flame Shock spell by 6 sec.',
      'Increases the damage done by your Fire Totems and by your Flame Shock and Fire Nova spells by 15%, as well as increases the duration of your Flame Shock spell by 9 sec.'
    ];
  }

  // Elemental Reach (id 274) -> remove Totemic Projection CD reduction
  const eleReach = shaman.talents.find(t => t.name === 'Elemental Reach');
  if (eleReach) {
    eleReach.descriptions = [
      'Increases the range of your Lightning Bolt and Chain Lightning spells by 3 yards and Earth Shock, Flame Shock, and Frost Shock by 3 yards.',
      'Increases the range of your Lightning Bolt and Chain Lightning spells by 6 yards and Earth Shock, Flame Shock, and Frost Shock by 6 yards.'
    ];
  }

  // Improved Ghost Wolf (id 284) moved to Row 4 (was Row 2)
  const impGW = shaman.talents.find(t => t.name === 'Improved Ghost Wolf');
  if (impGW) {
    impGW.row = 4;
    impGW.col = 4;
  }

  // Maelstrom Weapon (id 295) -> proc chance doubled
  const maelstrom = shaman.talents.find(t => t.name === 'Maelstrom Weapon');
  if (maelstrom) {
    maelstrom.descriptions = [
      'When you deal damage with a melee weapon, you have a chance (doubled in Forever) to reduce the cast time of your next Lightning Bolt, Chain Lightning, Lesser Healing Wave, or Healing Wave spell by 20%. Stacks up to 5 times. Lasts 30 sec.',
      'When you deal damage with a melee weapon, you have a chance (doubled in Forever) to reduce the cast time of your next Lightning Bolt, Chain Lightning, Lesser Healing Wave, or Healing Wave spell by 40%. Stacks up to 5 times. Lasts 30 sec.',
      'When you deal damage with a melee weapon, you have a chance (doubled in Forever) to reduce the cast time of your next Lightning Bolt, Chain Lightning, Lesser Healing Wave, or Healing Wave spell by 60%. Stacks up to 5 times. Lasts 30 sec.',
      'When you deal damage with a melee weapon, you have a chance (doubled in Forever) to reduce the cast time of your next Lightning Bolt, Chain Lightning, Lesser Healing Wave, or Healing Wave spell by 80%. Stacks up to 5 times. Lasts 30 sec.',
      'When you deal damage with a melee weapon, you have a chance (doubled in Forever) to reduce the cast time of your next Lightning Bolt, Chain Lightning, Lesser Healing Wave, or Healing Wave spell by 100%. Stacks up to 5 times. Lasts 30 sec.'
    ];
  }

  // Stormstrike (id 291) -> 150% weapon dmg, 6s CD
  const stormstrike = shaman.talents.find(t => t.name === 'Stormstrike');
  if (stormstrike) {
    stormstrike.descriptions = [
      'Instantly strike with both weapons for 150% weapon damage and increase the damage you deal to the target with your next Lightning Bolt, Chain Lightning, or Earth Shock spell by 20% for 12 sec. 6 sec cooldown.'
    ];
  }

  // Mental Dexterity (id 283) -> 50/100/150%
  const mentalDex = shaman.talents.find(t => t.name === 'Mental Dexterity');
  if (mentalDex) {
    mentalDex.descriptions = [
      'Increases your Attack Power by an amount equal to 50% of your Intellect.',
      'Increases your Attack Power by an amount equal to 100% of your Intellect.',
      'Increases your Attack Power by an amount equal to 150% of your Intellect.'
    ];
  }

  // Flurry (id 290) -> 6/12/18/24/30%
  const flurryShaman = shaman.talents.find(t => t.tree === 1 && t.name === 'Flurry');
  if (flurryShaman) {
    flurryShaman.descriptions = [
      'Increases your attack speed by 6% for your next 3 swings after dealing a melee critical strike.',
      'Increases your attack speed by 12% for your next 3 swings after dealing a melee critical strike.',
      'Increases your attack speed by 18% for your next 3 swings after dealing a melee critical strike.',
      'Increases your attack speed by 24% for your next 3 swings after dealing a melee critical strike.',
      'Increases your attack speed by 30% for your next 3 swings after dealing a melee critical strike.'
    ];
  }

  // Riptide (id 312) -> -40% mana, 12s CD, HoT only
  const riptide = shaman.talents.find(t => t.name === 'Riptide');
  if (riptide) {
    riptide.descriptions = [
      'Heals a friendly target for 445 over 15 sec, and increases the effectiveness of your Chain Heal casts directly on that target by 25%. 12 sec cooldown.'
    ];
  }
}

// --- G. WARLOCK ---
{
  const warlock = talentsData.warlock;
  const shadowAndFlame = warlock.talents.find(t => t.name === 'Shadow and Flame');
  if (shadowAndFlame) {
    shadowAndFlame.descriptions = [
      'Hitting an enemy with Conflagrate increases all Shadow damage you deal by 4% for 20 sec, and hitting an enemy with Shadowburn increases all Fire damage you deal by 4% for 20 sec. In addition, Conflagrate has a 20% chance not to consume Immolate, and Shadowburn has a 20% chance to instantly refund a Soul Shard.',
      'Hitting an enemy with Conflagrate increases all Shadow damage you deal by 8% for 20 sec, and hitting an enemy with Shadowburn increases all Fire damage you deal by 8% for 20 sec. In addition, Conflagrate has a 40% chance not to consume Immolate, and Shadowburn has a 40% chance to instantly refund a Soul Shard.',
      'Hitting an enemy with Conflagrate increases all Shadow damage you deal by 12% for 20 sec, and hitting an enemy with Shadowburn increases all Fire damage you deal by 12% for 20 sec. In addition, Conflagrate has a 60% chance not to consume Immolate, and Shadowburn has a 60% chance to instantly refund a Soul Shard.',
      'Hitting an enemy with Conflagrate increases all Shadow damage you deal by 16% for 20 sec, and hitting an enemy with Shadowburn increases all Fire damage you deal by 16% for 20 sec. In addition, Conflagrate has a 80% chance not to consume Immolate, and Shadowburn has a 80% chance to instantly refund a Soul Shard.',
      'Hitting an enemy with Conflagrate increases all Shadow damage you deal by 20% for 20 sec, and hitting an enemy with Shadowburn increases all Fire damage you deal by 20% for 20 sec. In addition, Conflagrate has a 100% chance not to consume Immolate, and Shadowburn has a 100% chance to instantly refund a Soul Shard.'
    ];
  }
}

// --- H. WARRIOR ---
{
  const warrior = talentsData.warrior;
  
  // Improved Tactical Mastery (id 5) -> 3 points (5/10/15)
  const impTM = warrior.talents.find(t => t.name === 'Improved Tactical Mastery');
  if (impTM) {
    impTM.maxRank = 3;
    impTM.descriptions = [
      'Tactical Mastery lets you retain up to an additional 5 Rage when you change stances.',
      'Tactical Mastery lets you retain up to an additional 10 Rage when you change stances.',
      'Tactical Mastery lets you retain up to an additional 15 Rage when you change stances.'
    ];
  }

  // Two-Handed Weapon Specialization (id 10) -> 2/4/6%
  const thwWarrior = warrior.talents.find(t => t.name === 'Two-Handed Weapon Specialization');
  if (thwWarrior) {
    thwWarrior.descriptions = [
      'Increases the damage you deal with two-handed melee weapons by 2%.',
      'Increases the damage you deal with two-handed melee weapons by 4%.',
      'Increases the damage you deal with two-handed melee weapons by 6%.'
    ];
  }

  // Bloodthrill (id 12) -> 2 points (10/20%)
  const bloodthrill = warrior.talents.find(t => t.name === 'Bloodthrill');
  if (bloodthrill) {
    bloodthrill.maxRank = 2;
    bloodthrill.descriptions = [
      'Grants your Main Hand melee attacks against enemies afflicted by your Rend a 10% chance to allow an activation of Overpower.',
      'Grants your Main Hand melee attacks against enemies afflicted by your Rend a 20% chance to allow an activation of Overpower.'
    ];
  }

  // Improved Slam (id 15) -> Slam cooldown reduced by 2.5/5.0 sec
  const impSlam = warrior.talents.find(t => t.name === 'Improved Slam');
  if (impSlam) {
    impSlam.descriptions = [
      'Reduces the global cooldown and cast time of your Slam ability by 0.25 sec. In addition, Slam no longer interrupts or delays your melee swing and Slam\'s cooldown is reduced by 2.5 sec.',
      'Reduces the global cooldown and cast time of your Slam ability by 0.50 sec. In addition, Slam no longer interrupts or delays your melee swing and Slam\'s cooldown is reduced by 5.0 sec.'
    ];
  }

  // Booming Voice (id 18) -> reduces Piercing Howl cost by 5/10/15/20/25%
  const booming = warrior.talents.find(t => t.name === 'Booming Voice');
  if (booming) {
    booming.descriptions = [
      'Increases the area of effect and duration of your Battle Shout and Demoralizing Shout by 10%, and reduces the Rage cost of Piercing Howl by 5%.',
      'Increases the area of effect and duration of your Battle Shout and Demoralizing Shout by 20%, and reduces the Rage cost of Piercing Howl by 10%.',
      'Increases the area of effect and duration of your Battle Shout and Demoralizing Shout by 30%, and reduces the Rage cost of Piercing Howl by 15%.',
      'Increases the area of effect and duration of your Battle Shout and Demoralizing Shout by 40%, and reduces the Rage cost of Piercing Howl by 20%.',
      'Increases the area of effect and duration of your Battle Shout and Demoralizing Shout by 50%, and reduces the Rage cost of Piercing Howl by 25%.'
    ];
  }

  // Enrage (id 28) moved to Row 3 (was Row 4)
  const enrage = warrior.talents.find(t => t.name === 'Enrage');
  if (enrage) {
    enrage.row = 3;
    enrage.col = 4;
  }

  // Reckless Swings: New Row 4 1-point talent
  const recklessSwings = {
    id: 507,
    tree: 1,
    treeId: 4,
    name: 'Reckless Swings',
    icon: 'https://render.worldofwarcraft.com/us/icons/56/ability_warrior_decisivestrike.jpg',
    iconName: 'ability_warrior_decisivestrike',
    row: 4,
    col: 3,
    maxRank: 1,
    spellId: 47174,
    req: null,
    descriptions: [
      '15 sec cooldown. Costs 25% of base health. Your next 4 melee attacks generate 5 additional Rage. Lasts 8 seconds.'
    ]
  };
  if (!warrior.talents.some(t => t.name === 'Reckless Swings')) {
    warrior.talents.push(recklessSwings);
  }

  // Gore Drinker (id 471) moved to Row 5 (was Row 6) and connected to Blood Craze (id 24)
  const goreDrinker = warrior.talents.find(t => t.name === 'Gore Drinker');
  if (goreDrinker) {
    goreDrinker.row = 5;
    goreDrinker.col = 3;
    goreDrinker.req = 24; // Blood Craze
  }

  // Flurry (id 34) -> 3 points (10/20/30%), req: null
  const flurry = warrior.talents.find(t => t.name === 'Flurry');
  if (flurry) {
    flurry.maxRank = 3;
    flurry.req = null;
    flurry.descriptions = [
      'Increases your melee attack speed by 10% for your next 3 swings after dealing a melee critical strike.',
      'Increases your melee attack speed by 20% for your next 3 swings after dealing a melee critical strike.',
      'Increases your melee attack speed by 30% for your next 3 swings after dealing a melee critical strike.'
    ];
  }

  // Improved Whirlwind: New Row 6 2-point talent
  const impWW = {
    id: 508,
    tree: 1,
    treeId: 4,
    name: 'Improved Whirlwind',
    icon: 'https://render.worldofwarcraft.com/us/icons/56/ability_whirlwind.jpg',
    iconName: 'ability_whirlwind',
    row: 6,
    col: 3,
    maxRank: 2,
    spellId: 47175,
    req: null,
    descriptions: [
      'Reduces the cooldown of your Whirlwind ability by 1 sec and increases the damage it deals to the closest enemy by 15%.',
      'Reduces the cooldown of your Whirlwind ability by 2 sec and increases the damage it deals to the closest enemy by 30%.'
    ]
  };
  if (!warrior.talents.some(t => t.name === 'Improved Whirlwind')) {
    warrior.talents.push(impWW);
  }

  // Bloodthirst (id 35) -> requires Death Wish (id 31)
  const bloodthirst = warrior.talents.find(t => t.name === 'Bloodthirst');
  if (bloodthirst) {
    bloodthirst.req = 31;
  }

  // Defiance (id 44) -> 7/13/20%
  const defiance = warrior.talents.find(t => t.name === 'Defiance');
  if (defiance) {
    defiance.descriptions = [
      'Increases all threat generated in Defensive stance by an additional 7% while a shield is equipped.',
      'Increases all threat generated in Defensive stance by an additional 13% while a shield is equipped.',
      'Increases all threat generated in Defensive stance by an additional 20% while a shield is equipped.'
    ];
  }
}

// Write back updated talents
const newTalentsJs = `/**
 * World of Warcraft: Forever - Interactive Talent Tree Calculator Dataset
 * Updated through November 3, 2026 (Launch Tuning & Class Buff Hotfixes).
 */

if (typeof window !== 'undefined') {
  window.WOW_TALENTS_DATA = ${JSON.stringify(talentsData, null, 2)};
}
`;

fs.writeFileSync(talentsPath, newTalentsJs, 'utf8');
console.log('Successfully written updated js/data/talents-data.js');
