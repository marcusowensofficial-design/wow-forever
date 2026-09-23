/**
 * World of Warcraft: Forever - Rogue Class Deep Dive Dataset
 * Primary Source: Sodapoppin Level-38 Troll Rogue Hands-On Early Access Demo & Closed Beta Forensics
 * Video URL: https://www.youtube.com/watch?v=FiNZrJ24shk
 */

if (typeof window !== 'undefined' && window.WOW_FOREVER_DATA) {
  if (!window.WOW_FOREVER_DATA.classDeepDives) window.WOW_FOREVER_DATA.classDeepDives = {};
  window.WOW_FOREVER_DATA.classDeepDives.rogue = {
    id: "rogue",
    name: "Rogue",
    icon: "🗡️",
    color: "#FFF569",
    role: "Melee DPS / Physical & Poison Burst",
    specs: "Assassination (Mutilate/Crit Poisons) • Combat (Restless Blades/Blade Flurry) • Subtlety (Thousand Cuts Rupture Engine/Preparation)",
    hasData: true,
    videoTitle: "WoW Forever Rogue Class Deep Dive & Troll Racials",
    videoUrl: "https://www.youtube.com/watch?v=FiNZrJ24shk",
    sourceAttribution: "Sodapoppin Level-38 Troll Rogue BlizzCon Early Access Demo & Closed Beta Forensics",
    summary: "WoW Forever preserves the classic Rogue control kit while introducing major modernizations: Mutilate usable without daggers, critical-strike and AP-scaling poisons, Restless Blades cooldown cycling for Adrenaline Rush and Vanish, and a transformative Thousand Cuts Rupture engine in Subtlety that refunds up to 15 Energy for Backstab and Hemorrhage.",

    subTabs: [
      { id: "overview", label: "Full Dossier", icon: "📑" },
      { id: "core", label: "Core Rules & Control", icon: "📜" },
      { id: "betaBuilds", label: "⚡ Beta L20 Builds", icon: "⚡" },
      { id: "assassination", label: "Assassination & Mutilate", icon: "🩸" },
      { id: "combat", label: "Combat & Restless Blades", icon: "⚔️" },
      { id: "subtlety", label: "Subtlety & Rupture Engine", icon: "👤" },
      { id: "troll", label: "Troll Testing & Races", icon: "🏹" },
      { id: "matrix", label: "Verification Matrix", icon: "🔬" }
    ],

    coreRules: [
      {
        title: "Poisons Scale with Attack Power & Crit",
        status: "verified",
        statusLabel: "Verified in Beta",
        badge: "Damage Scaling",
        desc: "Deadly, Instant, and Wound poisons can now critically strike! Furthermore, poison damage scales with Attack Power, allowing poison builds to remain lethal across all gear tiers."
      },
      {
        title: "Blind Classified as Poison",
        status: "verified",
        statusLabel: "Verified in Beta",
        badge: "PvP Counterplay",
        desc: "Blind remains classified as a Poison effect in this build, meaning poison-cleansing effects (Abolish Poison, Stoneform, Purify) can cleanse it, maintaining classic counterplay."
      },
      {
        title: "Absence of Cloak of Shadows",
        status: "verified",
        statusLabel: "Verified in Beta",
        badge: "Toolkit Boundary",
        desc: "Cloak of Shadows is NOT present in the accessible level-38 toolkit. Rogues rely on classic defensive cooldowns (Vanish, Evasion, Sprint) rather than total magic immunity."
      },
      {
        title: "Seal Fate 100% Extra Combo Point",
        status: "verified",
        statusLabel: "Verified in Beta",
        badge: "Combo Engine",
        desc: "Critical strikes from combo-point-generating abilities (Sinister Strike, Backstab, Mutilate, Hemorrhage) have a 100% chance to grant 1 additional combo point."
      },
      {
        title: "Heightened Senses (+3 Levels Stealth Detection)",
        status: "verified",
        statusLabel: "Verified in Beta",
        badge: "Stealth Supremacy",
        desc: "Treats the Rogue as 3 levels higher for stealth detection and reduces the chance of being hit by spells and ranged attacks by 4%."
      },
      {
        title: "Improved Distract (Stealth Degradation)",
        status: "verified",
        statusLabel: "Verified in Beta",
        badge: "Tactical Utility",
        desc: "Expands Distract's radius and lowers affected enemies' stealth detection as though they were 1 level lower, allowing precision stealth bypasses."
      },
      {
        title: "Setup (Dodge/Resist Combo Points)",
        status: "verified",
        statusLabel: "Verified in Beta",
        badge: "Defensive Synergy",
        desc: "Grants a combo point whenever the Rogue dodges an incoming physical attack or fully resists an enemy spell."
      }
    ],

    assassination: {
      title: "Assassination: Daggerless Mutilate, Critical Poisons & Poison Maintenance",
      tagline: "Unleash dual-weapon Mutilate without dagger restrictions, stack lethal critical poisons, and amplify execution damage",
      talents: [
        {
          name: "Mutilate (No Dagger Requirement!)",
          type: "Signature Dual Strike",
          cost: "60 Energy",
          cast: "Instant",
          status: "verified",
          desc: "Instantly attacks with both weapons for 75% weapon damage plus additional flat damage from each weapon. Deals 20% more damage if the target is poisoned and awards 2 combo points. Crucially, the tooltip does NOT require daggers!"
        },
        {
          name: "Venom Maintenance Finisher",
          type: "Finishing Move",
          cost: "25 Energy",
          cast: "Instant",
          duration: "Up to 30 sec Duration",
          status: "verified",
          desc: "Finishing move that increases poison damage dealt by 30% and poison-application chance by 10%. Acts as an essential maintenance steroid for sustained poison pressure."
        },
        {
          name: "Mutilate Critical 3-Combo Point Generation",
          type: "Synergy Mechanic",
          cast: "Passive Proc",
          status: "verified",
          desc: "With Seal Fate's 100% combo point proc on critical strikes, a critical Mutilate awards 3 total combo points (2 base + 1 from crit), supercharging finisher cadence."
        },
        {
          name: "Kidney Shot Damage Vulnerability",
          type: "Stun Debuff",
          cost: "25 Energy",
          cast: "Instant",
          cd: "20 sec Cooldown",
          status: "verified",
          desc: "Stuns the target for up to 6 seconds. Targets stunned by Kidney Shot take up to 10% more damage from the Rogue's poisons and physical attacks."
        },
        {
          name: "Poison Charge Conservation (50% Chance)",
          type: "Poison Mastery",
          cast: "Passive",
          status: "verified",
          desc: "Poison applications have a 50% chance not to consume a charge, increases poison damage and application rate, and grants 30% dispel resistance to all applied poisons."
        },
        {
          name: "Improved Expose Armor",
          type: "Armor Shred QoL",
          cost: "20 Energy",
          cast: "Instant",
          status: "verified",
          desc: "Reduces Expose Armor's Energy cost by 5 and refunds 1 combo point when executed at 5 combo points, facilitating easier raid armor debuffing."
        },
        {
          name: "Vile Poisons & Malice",
          type: "Passive Scaling",
          cast: "Passive",
          status: "verified",
          desc: "Increases critical-strike chance for all melee attacks and poisons by 5%, and increases the damage of Deadly, Instant, and Wound poisons by 20%."
        },
        {
          name: "Relentless Strikes",
          type: "Finisher Energy Refund",
          cast: "Passive",
          status: "verified",
          desc: "Finishing moves have a 20% chance per combo point (100% at 5 CP) to restore 25 Energy, keeping the Assassination rotation fluid."
        }
      ]
    },

    combat: {
      title: "Combat: Restless Blades Cooldown Cycling, Blade Flurry & Axe Mastery",
      tagline: "Rapidly reset Adrenaline Rush, Blade Flurry, Evasion, Sprint, and Vanish with every finisher, cleaving with Blade Flurry",
      talents: [
        {
          name: "Restless Blades (2s CDR per Combo Point)",
          type: "Signature Combat Engine",
          cast: "Passive",
          status: "verified",
          desc: "Damaging finishing moves reduce the remaining cooldown of Adrenaline Rush, Blade Flurry, Evasion, Sprint, and Vanish by 2 seconds per combo point spent (10s reduction at 5 CP!). In later beta, iterates into Flawless Execution."
        },
        {
          name: "Blade Flurry (20% Haste & Cleave)",
          type: "Burst & Cleave Cooldown",
          cost: "25 Energy",
          cast: "Instant",
          cd: "2 min Cooldown",
          duration: "15 sec Duration",
          status: "verified",
          desc: "Increases attack speed by 20% and causes melee attacks to strike 1 additional nearby target for 15 seconds. Cooldown is rapidly cycled by Restless Blades."
        },
        {
          name: "Adrenaline Rush (100% Energy Regen)",
          type: "Major Combat Cooldown",
          cast: "Instant",
          cd: "5 min Cooldown",
          duration: "15 sec Duration",
          status: "verified",
          desc: "Increases Energy regeneration rate by 100% for 15 seconds. Combined with Restless Blades, the effective cooldown drops to roughly 2 to 2.5 minutes in active combat."
        },
        {
          name: "Improved Kick (2s Blanket Silence)",
          type: "Combat Control",
          cost: "25 Energy",
          cast: "Instant",
          cd: "10 sec Cooldown",
          status: "verified",
          desc: "Interrupts spellcasting, locking that school for 5 seconds, and gives Kick an additional 2-second blanket silence, giving Combat Rogues a hard caster lockout."
        },
        {
          name: "Axe Specialization (5% Extra Attack)",
          type: "Weapon Mastery",
          cast: "Passive",
          status: "verified",
          desc: "Gives you a 5% chance to get an extra attack on the same target after dealing damage with an Axe or Two-Handed weapon, rivaling classic Sword Specialization."
        },
        {
          name: "Weapon Expertise (Dodge/Parry Reduction)",
          type: "Expertise Scaling",
          cast: "Passive",
          status: "verified",
          desc: "Reduces the chance that your attacks will be dodged or parried by up to 5%, virtually eliminating glancing blow and dodge penalties against raid bosses."
        },
        {
          name: "Backstab & Mutilate Crit Synergy",
          type: "Rotational Synergies",
          cast: "Passive",
          status: "verified",
          desc: "Increases Backstab and Mutilate critical-strike chance by up to 15%, and gives Backstab up to a 45% chance to generate an extra combo point."
        },
        {
          name: "Riposte (Weapon Disarm & Damage)",
          type: "Defensive Counterattack",
          cost: "10 Energy",
          cast: "Instant",
          cd: "6 sec Cooldown",
          status: "verified",
          desc: "A strike that becomes active after parrying an opponent's attack. Deals 150% weapon damage and disarms the target for 6 seconds."
        }
      ]
    },

    subtlety: {
      title: "Subtlety: Thousand Cuts Rupture Engine, Frontal Garrote & Preparation",
      tagline: "Turn Rupture into an energy generator with Thousand Cuts, strike from the front with Dirty Deeds Garrote, and double all cooldowns with Preparation",
      talents: [
        {
          name: "Thousand Cuts (Rupture Energy Engine)",
          type: "Signature Subtlety Keystone",
          cast: "Passive",
          duration: "10 sec Buff",
          status: "verified",
          desc: "Rupture periodic damage ticks reduce the Energy cost of your next Hemorrhage or Backstab within 10 seconds by 3, stacking up to 5 times (up to 15 Energy cost discount!)."
        },
        {
          name: "Serrated Strike (+50% Rupture Damage)",
          type: "Bleed Amplification Strike",
          cost: "35 Energy",
          cast: "Instant",
          status: "verified",
          desc: "Strikes the target for 100% weapon damage (145% with a dagger) and causes the target to take 50% more Rupture damage from the Rogue! Also adds passive armor penetration and +30% Rupture damage."
        },
        {
          name: "Dirty Deeds (Frontal Garrote & -20% Cost)",
          type: "Stealth Opener Overhaul",
          cast: "Passive",
          status: "verified",
          desc: "Reduces the Energy cost of Cheap Shot and Garrote by 20%, and permanently removes Garrote's requirement to be behind the target! Allows frontal stealth openers."
        },
        {
          name: "Preparation (Full Cooldown Reset)",
          type: "Signature Subtlety Cooldown",
          cast: "Instant",
          cd: "10 min Cooldown",
          status: "verified",
          desc: "When activated, this ability immediately finishes the cooldown on your Evasion, Sprint, Vanish, Cold Blood, Shadowstep, and Blind abilities."
        },
        {
          name: "Sub-35% Execute Damage",
          type: "Execution Passive",
          cast: "Passive",
          status: "verified",
          desc: "Sinister Strike, Ghostly Strike, and Hemorrhage deal 10% more damage against targets below 35% health, providing high Subtlety execute throughput."
        },
        {
          name: "Ghostly Strike (15% Dodge & Strike)",
          type: "Evasive Strike",
          cost: "40 Energy",
          cast: "Instant",
          cd: "20 sec Cooldown",
          status: "verified",
          desc: "A strike that deals 125% weapon damage and increases your chance to dodge by 15% for 7 seconds. Awards 1 combo point and triggers Setup."
        },
        {
          name: "Elusiveness (50% Sap/Blind Cost & CDR)",
          type: "Control Efficiency",
          cast: "Passive",
          status: "verified",
          desc: "Reduces the Energy cost of Sap and Blind by 50%, while reducing the cooldown of Vanish and Blind by up to 90 seconds."
        },
        {
          name: "Initiative (Bonus Opener Combo Points)",
          type: "Combo Acceleration",
          cast: "Passive",
          status: "verified",
          desc: "Gives you a 75% chance to add an additional combo point to your target when using Ambush, Garrote, or Cheap Shot from stealth."
        }
      ]
    },

    racialSynergies: {
      trollDemo: {
        title: "Sodapoppin's Troll Rogue Hands-On Demo Findings",
        subtitle: "Forensic testing of the Troll Rogue in the BlizzCon 2026 early access demo",
        items: [
          {
            name: "Berserking (Flat 10% Attack/Cast Speed)",
            status: "verified",
            statusLabel: "Verified in Beta",
            desc: "Increases melee attack speed and spellcasting speed by a flat 10% for 10 seconds, without scaling from missing health, providing consistent on-demand burst."
          },
          {
            name: "Cannibalize / Ritual Rest (50% Max HP Heal)",
            status: "verified",
            statusLabel: "Verified in Beta",
            desc: "Active racial channeling 50% of maximum health over 6 seconds. Movement, taking damage, or actions cancel it immediately, and activation breaks Stealth."
          },
          {
            name: "Beast Slaying (+5% Damage to Beasts)",
            status: "verified",
            statusLabel: "Verified in Beta",
            desc: "Passive racial granting +5% damage to all Beast-type enemies, boosting leveling and dungeon speed in beast-heavy zones."
          },
          {
            name: "Troll Regeneration (+10% & In-Combat)",
            status: "verified",
            statusLabel: "Verified in Beta",
            desc: "Passive health regeneration increased by 10%, with 10% of total health regeneration continuing during combat."
          }
        ]
      },
      newRaces: [
        {
          race: "Troll Rogue",
          faction: "Horde",
          badge: "Tested Demo Race",
          desc: "Berserking (+10% flat attack speed), 50% HP active regeneration channel, Beast Slaying (+5%), and in-combat health regen."
        },
        {
          race: "Orc Rogue",
          faction: "Horde",
          badge: "Classic Favorite",
          desc: "Blood Fury (+10% AP, no healing penalty), Hardiness (-20% stun duration), and Axe Specialization synergy with Combat."
        },
        {
          race: "Undead Rogue",
          faction: "Horde",
          badge: "PvP Powerhouse",
          desc: "Will of the Forsaken (2m charm/fear/sleep break), Cannibalize (7% HP/Mana), and Touch of the Grave drain."
        },
        {
          race: "Human Rogue",
          faction: "Alliance",
          badge: "Classic Favorite",
          desc: "Will to Survive (3m stun break), Perception (+stealth detection), Sword Specialization (+2% crit), and The Human Spirit."
        },
        {
          race: "Gnome Rogue",
          faction: "Alliance",
          badge: "PvP Elusive",
          desc: "Escape Artist (2m root/snare break + 3s immunity), Engineering bonus, and +5% Intellect."
        },
        {
          race: "Dwarf Rogue",
          faction: "Alliance",
          badge: "Defensive Utility",
          desc: "Stoneform (removes bleeds/poisons/diseases, +10% physical DR), Mace Specialization (+1% crit), and Find Treasure."
        },
        {
          race: "Night Elf Rogue",
          faction: "Alliance",
          badge: "Stealth Master",
          desc: "Shadowmeld in-combat target drop, Elune's Light (+10% crit for 15s), and Quickness (+1% dodge, +2% run speed)."
        }
      ]
    },

    forensicMatrix: [
      {
        feature: "Daggerless Mutilate",
        category: "Assassination",
        details: "Mutilate strikes with both weapons (75% dmg), +20% on poisoned targets; no dagger requirement",
        status: "Verified in Closed Beta",
        statusType: "verified",
        source: "Sodapoppin Hands-On Demo & Tooltip"
      },
      {
        feature: "Poisons Scale with AP & Crit",
        category: "Assassination",
        details: "Deadly, Instant, and Wound poisons can critically strike and scale with Attack Power",
        status: "Verified in Closed Beta",
        statusType: "verified",
        source: "Sodapoppin Hands-On Demo"
      },
      {
        feature: "Venom Maintenance Finisher",
        category: "Assassination",
        details: "Finishing move grants +30% poison damage and +10% poison application chance",
        status: "Verified in Closed Beta",
        statusType: "verified",
        source: "Sodapoppin Hands-On Demo"
      },
      {
        feature: "Seal Fate 3-CP Mutilate",
        category: "Assassination",
        details: "100% chance on generator crits for +1 combo point; Mutilate crit awards 3 combo points",
        status: "Verified in Closed Beta",
        statusType: "verified",
        source: "Sodapoppin Hands-On Demo"
      },
      {
        feature: "Kidney Shot 10% Vulnerability",
        category: "Assassination",
        details: "Stunned target takes up to 10% more damage from Rogue's poisons and attacks",
        status: "Verified in Closed Beta",
        statusType: "verified",
        source: "Sodapoppin Hands-On Demo"
      },
      {
        feature: "Improved Expose Armor QoL",
        category: "Assassination",
        details: "-5 Energy cost and refunds 1 combo point when used at 5 combo points",
        status: "Verified in Closed Beta",
        statusType: "verified",
        source: "Sodapoppin Hands-On Demo"
      },
      {
        feature: "Poison Charge Conservation",
        category: "Assassination",
        details: "50% chance on application not to consume a charge; +30% dispel resistance",
        status: "Verified in Closed Beta",
        statusType: "verified",
        source: "Sodapoppin Hands-On Demo"
      },
      {
        feature: "Restless Blades Cooldown Cycling",
        category: "Combat",
        details: "Finishing moves reduce AR, Blade Flurry, Evasion, Sprint, Vanish CD by 2s per CP spent",
        status: "Verified in Closed Beta",
        statusType: "verified",
        source: "Sodapoppin Hands-On Demo (Later iterated to Flawless Execution)"
      },
      {
        feature: "Blade Flurry (20% Haste & Cleave)",
        category: "Combat",
        details: "2m CD, +20% attack speed, melee strikes hit 1 additional nearby target for 15s",
        status: "Verified in Closed Beta",
        statusType: "verified",
        source: "Sodapoppin Hands-On Demo"
      },
      {
        feature: "Improved Kick (2s Silence)",
        category: "Combat",
        details: "Kick gains a 2-second blanket silence in addition to normal spell school lockout",
        status: "Verified in Closed Beta",
        statusType: "verified",
        source: "Sodapoppin Hands-On Demo"
      },
      {
        feature: "Combat Axe Specialization",
        category: "Combat",
        details: "5% chance on melee hit to trigger an additional attack with Axes",
        status: "Verified in Closed Beta",
        statusType: "verified",
        source: "Sodapoppin Hands-On Demo"
      },
      {
        feature: "Weapon Expertise",
        category: "Combat",
        details: "Reduces enemy dodge and parry chances against the Rogue by up to 5%",
        status: "Verified in Closed Beta",
        statusType: "verified",
        source: "Sodapoppin Hands-On Demo"
      },
      {
        feature: "Thousand Cuts Rupture Engine",
        category: "Subtlety",
        details: "Rupture ticks reduce Hemorrhage/Backstab Energy cost by 3 (stacks up to 5 = -15 Energy)",
        status: "Verified in Closed Beta",
        statusType: "verified",
        source: "Sodapoppin Hands-On Demo"
      },
      {
        feature: "Serrated Strike (+50% Rupture Dmg)",
        category: "Subtlety",
        details: "100% weapon dmg (145% dagger); target takes 50% more Rupture damage from Rogue",
        status: "Verified in Closed Beta",
        statusType: "verified",
        source: "Sodapoppin Hands-On Demo"
      },
      {
        feature: "Dirty Deeds Frontal Garrote",
        category: "Subtlety",
        details: "-20% Cheap Shot/Garrote Energy cost; removes Garrote behind-target requirement",
        status: "Verified in Closed Beta",
        statusType: "verified",
        source: "Sodapoppin Hands-On Demo"
      },
      {
        feature: "Blind Classified as Poison",
        category: "Subtlety / Utility",
        details: "5-min CD, cleansable by poison dispels, 50% cost reduction from Elusiveness",
        status: "Verified in Closed Beta",
        statusType: "verified",
        source: "Sodapoppin Hands-On Demo"
      },
      {
        feature: "Absence of Cloak of Shadows",
        category: "Core Mechanics",
        details: "Cloak of Shadows is not in the accessible toolkit in this build",
        status: "Verified in Closed Beta",
        statusType: "verified",
        source: "Sodapoppin Hands-On Demo"
      },
      {
        feature: "Troll Berserking Flat 10%",
        category: "Troll Racials",
        details: "Flat 10% attack and cast speed without missing-health scaling",
        status: "Verified in Closed Beta",
        statusType: "verified",
        source: "Sodapoppin Hands-On Demo"
      }
    ],
    betaBuilds: {
      season: "Closed Beta Phase 1",
      levelCap: 20,
      talentPointsTotal: 11,
      legacyPointsNotice: "Legacy Milestones allow up to +2 to +5 additional points at Level 20.",
      specs: [
        {
          specId: "combat_swords",
          name: "Combat Swords (Precision & Slice)",
          icon: "⚔️",
          role: "Sustained Melee DPS",
          wowheadCalcUrl: "https://www.wowhead.com/forever/talent-calc/rogue/-0230501",
          tagline: "Top leveling and dungeon DPS through 40-energy Sinister Strike, +5% hit, and high-speed sword attacks.",
          statPriority: "Agility > Melee Hit (to 5%) > Strength > Stamina",
          bestWeapon: "Slow Main-Hand Sword (Cruel Barb) + Fast Off-Hand (Thief's Blade)",
          talents: [
            { name: "Improved Sinister Strike", points: "2/2", tree: "Combat (Tier 1)", desc: "Reduces Energy cost of Sinister Strike by 5, allowing attacks at a baseline 40 Energy cost." },
            { name: "Lightning Reflexes", points: "3/5", tree: "Combat (Tier 1)", desc: "Increases your Dodge chance by 3%, aiding solo survivability against dungeon elites." },
            { name: "Precision", points: "5/5", tree: "Combat (Tier 2)", desc: "Increases your chance to hit with melee weapons by 5%, neutralizing miss penalties against +3 level mobs." },
            { name: "Deflection", points: "1/5", tree: "Combat (Tier 2)", desc: "Increases your Parry chance by 1%, triggering Riposte counters if unlocked." }
          ],
          legacyNotes: "Extra points obtained through Legacy Discovery unlock Riposte (10 Energy disarm + burst strike) and 5/5 Dual Wield Specialization.",
          rotation: [
            { label: "Opener", desc: "Stealth -> Cheap Shot for 4-second stun or Garrote against high-armor targets (Sap no longer breaks stealth!)." },
            { label: "Slice and Dice Upkeep", desc: "Sinister Strike x2 -> Slice and Dice (1-2 combo points) to boost auto-attack speed by 30%." },
            { label: "Finisher", desc: "Sinister Strike to 4-5 combo points -> Eviscerate finisher; drink Thistle Tea for an instant 100 Energy surge." },
            { label: "Defensive Reset", desc: "Evasion when tanking multiple mobs -> Gouge into bandage if health drops." }
          ],
          bisGear: [
            { slot: "Main Hand", item: "Cruel Barb", source: "Deadmines (Edwin VanCleef)", stats: "+12 Attack Power, 18.2 DPS" },
            { slot: "Off Hand", item: "Thief's Blade", source: "Deadmines (Mr. Smite)", stats: "+6 Agility, 15.6 DPS" },
            { slot: "Off Hand (Alt)", item: "Wingblade", source: "Wailing Caverns (Leaders Quest)", stats: "+5 Agi, +2 Sta, 14.1 DPS" },
            { slot: "Dagger (New)", item: "Thane's Swift Stiletto", source: "Hall of Thanes (Ironforge)", stats: "+5 Agi, 1.4 Speed, 16.5 DPS" },
            { slot: "Armor Set", item: "Defias Leather (Chest/Legs/Gloves)", source: "Deadmines Defias Bosses", stats: "+10 Attack Power bonus" }
          ],
          campingPerk: {
            name: "Shadowed Agility (+5% Agility)",
            desc: "Setting camp with a Cozy Sleeping Bag provides 200% rested XP rate and grants the 'Shadow Stalker' 2-hour +5% Agility buff."
          },
          classQuestNote: "Level 20 Rogue unlocks the Poisons questline (Instant & Crippling Poison) and Thistle Tea recipe (100 Energy restore)."
        },
        {
          specId: "combat_daggers",
          name: "Combat Daggers (Backstab Burst)",
          icon: "🗡️",
          role: "Positional Melee Burst DPS",
          wowheadCalcUrl: "https://www.wowhead.com/forever/talent-calc/rogue/005-02301",
          tagline: "Devastating burst damage with 41-energy Backstabs and +20% Ambush critical strikes.",
          statPriority: "Agility > Attack Power > Crit",
          bestWeapon: "Slow High-End Damage Dagger (Meteor Shard / Shadowfang)",
          talents: [
            { name: "Opportunity", points: "5/5", tree: "Subtlety (Tier 1)", desc: "Increases damage dealt with Backstab, Garrote, and Ambush by 20%." },
            { name: "Improved Sinister Strike", points: "2/2", tree: "Combat (Tier 1)", desc: "Reduces Sinister Strike Energy cost to 40 for when you cannot get behind targets." },
            { name: "Puncturing Wounds", points: "3/3", tree: "Combat (Tier 2)", desc: "Reduces the Energy cost of Backstab to 41, matching Sinister Strike efficiency!" },
            { name: "Remorseless Attacks", points: "1/2", tree: "Assassination (Tier 1)", desc: "After killing an opponent, your next Sinister Strike, Backstab, or Ambush has +20% crit chance." }
          ],
          legacyNotes: "Extra Legacy points unlock 5/5 Lethality (+30% crit damage bonus) and Cold Blood (guaranteed 100% crit).",
          rotation: [
            { label: "Opener", desc: "Stealth -> Ambush from behind for massive physical hit." },
            { label: "Gouge-Backstab Loop", desc: "Gouge enemy -> walk behind during incapacitate -> Backstab -> Eviscerate." }
          ],
          bisGear: [
            { slot: "Main Hand", item: "Meteor Shard", source: "Shadowfang Keep (Arugal)", stats: "Chance on Hit: 35 Fire Dmg, 18.5 DPS" },
            { slot: "Off Hand", item: "Tail Spike", source: "Wailing Caverns (Skum)", stats: "+4 Agi, 13.9 DPS" }
          ],
          campingPerk: {
            name: "Lethal Edge (+5% Melee Crit)",
            desc: "Resting beside an active Campfire grants +5% melee critical strike chance for 1 hour."
          },
          classQuestNote: "Level 20 unlocks Crippling Poison to prevent fleeing dungeon runners."
        },
        {
          specId: "subtlety",
          name: "Subtlety (Stealth Master & Ambush)",
          icon: "👤",
          role: "PvP Ambush & Control",
          wowheadCalcUrl: "https://www.wowhead.com/forever/talent-calc/rogue/--502202",
          tagline: "Undetectable stealth speed, +40% critical strikes from Remorseless Attacks, and sprint cooldown resets.",
          statPriority: "Agility > Stamina > Attack Power",
          bestWeapon: "Slow Dagger / Sword with High Top-End",
          talents: [
            { name: "Master of Deception", points: "5/5", tree: "Subtlety (Tier 1)", desc: "Reduces the chance enemies have to detect you while in Stealth, letting you pass inches from elites." },
            { name: "Camouflage", points: "2/2", tree: "Subtlety (Tier 2)", desc: "Increases your movement speed while stealthed by 15% and reduces Stealth cooldown by 2 sec." },
            { name: "Remorseless Attacks", points: "2/2", tree: "Assassination (Tier 1)", desc: "After killing an opponent, grants +40% critical strike chance on your next strike." },
            { name: "Elusiveness", points: "2/2", tree: "Subtlety (Tier 2)", desc: "Reduces the cooldown of Evasion and Vanish by 45 sec." }
          ],
          legacyNotes: "Extra Legacy points unlock Ghostly Strike (15% dodge + strike) and Preparation (instant cooldown reset).",
          rotation: [
            { label: "Chain Kill Loop", desc: "Kill mob -> Remorseless Attacks (+40% crit) active -> Ambush next target with ~60% crit chance -> Eviscerate -> Repeat." }
          ],
          bisGear: [
            { slot: "Boots", item: "Footpads of the Fang", source: "Wailing Caverns", stats: "+4 Agi, +4 Sta, +4 Int" },
            { slot: "Chest", item: "Tunic of Westfall", source: "Deadmines Quest", stats: "+11 Agi, +5 Sta" }
          ],
          campingPerk: {
            name: "Silent Camouflage (+20% Stealth Speed)",
            desc: "Camp rest bonus increases stealth movement speed by an additional 20% for 2 hours."
          },
          classQuestNote: "Vanish and Pickpocket quests grant valuable lockboxes and poison ingredients."
        }
      ]
    }
  };
}
