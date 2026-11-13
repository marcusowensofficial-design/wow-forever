/**
 * World of Warcraft: Forever - Paladin Class Deep Dive Dataset
 * Primary Source: Sodapoppin video "Paladins Just Got a MASSIVE Revamp in WoW Forever" (beta) — talent values re-checked against live build 1.60.1.70938 on Nov 13, 2026
 * Video URL: https://www.youtube.com/watch?v=CGEOZoZ_8I4
 */

if (typeof window !== 'undefined' && window.WOW_FOREVER_DATA) {
  if (!window.WOW_FOREVER_DATA.classDeepDives) window.WOW_FOREVER_DATA.classDeepDives = {};
  window.WOW_FOREVER_DATA.classDeepDives.paladin = {
    id: "paladin",
    name: "Paladin",
    icon: "🛡️",
    color: "#F58CBA",
    role: "Tank / Healer / Melee DPS",
    specs: "Holy (Light's Vigil/AoE Heals) • Protection (Seal of Fury/Taunt) • Retribution (Unsealed Wrath/Sacred Arbiter)",
    hasData: true,
    videoTitle: "Sodapoppin: Paladins Just Got a MASSIVE Revamp in WoW Forever",
    videoUrl: "https://www.youtube.com/watch?v=CGEOZoZ_8I4",
    sourceAttribution: "Sodapoppin video \"Paladins Just Got a MASSIVE Revamp in WoW Forever\" (beta) — talent values re-checked against live build 1.60.1.70938 on Nov 13, 2026",
    summary: "WoW Forever brings a monumental overhaul to the Paladin class: the historic introduction of Undead Paladins with the custom 'Forsaken Charger' skeletal warhorse, a dedicated single-target taunt via Judgment of Fury, block-based mana regeneration, AoE healing with Light's Vigil and 10s Holy Shock, baseline Holy Strike, 60-minute Blessings, and official seal-twisting mechanics supported by the Unsealed Wrath seal-swapping capstone.",

    subTabs: [
      { id: "overview", label: "Full Dossier", icon: "📑" },
      { id: "core", label: "Core Rules & QoL", icon: "📜" },
      { id: "betaBuilds", label: "Level 20 & 30 Builds", icon: "⚡" },
      { id: "holy", label: "Holy Healer & AoE", icon: "✨" },
      { id: "protection", label: "Protection Tank & Taunt", icon: "🛡️" },
      { id: "retribution", label: "Retribution & Unsealed Wrath", icon: "⚔️" },
      { id: "undead", label: "Undead Testing & Races", icon: "💀" },
      { id: "matrix", label: "Verification Matrix", icon: "🔬" }
    ],

    coreRules: [
      {
        title: "Holy Shield & Redoubt Overhaul",
        status: "verified",
        statusLabel: "Beta Change (Oct 2026)",
        badge: "Tanking Keystone",
        desc: "Redoubt now scales smoothly (4/8/12/16/20% block chance), and Holy Shield grants +30% block chance while retaliating with Holy damage on each blocked attack, cementing Paladins as premier AoE dungeon tanks."
      },
      {
        title: "Champion of the Light Scaling",
        status: "verified",
        statusLabel: "Beta Change (Oct 2026)",
        badge: "Retribution Scaling",
        desc: "Champion of the Light converts 10/20/30% of total Intellect into Spell Damage and Healing (adjusted down from 60%), balancing burst with sustained Holy strike scaling."
      },
      {
        title: "60-Minute Blessings & Kings Baseline",
        status: "verified",
        statusLabel: "Reported in Beta (Oct 2026)",
        badge: "Major QoL",
        desc: "All standard Paladin Blessings (Might, Wisdom, Kings) now have a full 60-minute duration. Notably, Blessing of Kings is trained baseline by ALL Paladins in WoW Forever, while Blessing of Sanctuary, Blessing of Salvation, and Blessing of Light have been permanently removed."
      },
      {
        title: "Consecration Baseline for All Specializations",
        status: "verified",
        statusLabel: "Reported in Beta",
        badge: "Baseline System",
        desc: "Consecration is now learned directly at class trainers by all Paladins baseline, freeing up holy talent points and allowing Protection tanks and Retribution DPS to maintain AoE presence from early leveling."
      },
      {
        title: "Holy Strike Baseline",
        status: "verified",
        statusLabel: "Reported in Beta",
        badge: "Baseline Attack",
        desc: "Holy Strike is available as a baseline melee strike dealing 35% weapon damage plus additional Holy damage on an instant cast. Serves as the core active melee button across all three specializations."
      },
      {
        title: "Righteous Fury at Level 10 & Divine Precision",
        status: "exclusive",
        statusLabel: "✦ Forever Exclusive",
        badge: "Spell Progression",
        desc: "Launch updates introduce refined protection and utility: Righteous Fury is trained at Level 10 (was 16) granting +33% all threat and +90% Holy threat (Blessing of Salvation removed), Divine Precision reduces Silence duration by 10/20% alongside Holy hit, Sacred Duty reduces Forbearance duration, and Shieldsworn empowers Holy Strike to block spells."
      },
      {
        title: "Blessing of Freedom & Kings Mutual Exclusion",
        status: "demo",
        statusLabel: "🎙️ Sodapoppin Demo Finding",
        badge: "Buff Interaction",
        desc: "Using Blessing of Freedom removes Blessing of Kings from the target in the demonstrated build, meaning mobility blessings and stat blessings cannot simultaneously coexist on the same player."
      },
      {
        title: "Semi-Capped Consecration & SP Coefficient",
        status: "verified",
        statusLabel: "Reported in Beta",
        badge: "AoE Balance",
        desc: "Consecration features a semi-capped damage model (first 4 enemies take full damage) with a revised 0.042 Spell Power coefficient per tick."
      },
      {
        title: "Lay on Hands (No Forbearance in Demo)",
        status: "demo",
        statusLabel: "🎙️ Sodapoppin Demo Finding",
        badge: "Emergency Cooldown",
        desc: "Heals for the Paladin's maximum health and restores 250 mana on a 20-minute cooldown. In the demonstrated level-38 build, Lay on Hands did NOT trigger Forbearance, allowing immediate follow-up shields."
      },
      {
        title: "Exorcism Target Restrictions",
        status: "verified",
        statusLabel: "Reported in Beta",
        badge: "Spell Restriction",
        desc: "Exorcism remains strictly restricted to Undead and Demon targets in WoW Forever, and the demo indicates it cannot be cast against enemy players (even Undead Forsaken players) in PvP."
      },
      {
        title: "Level 40 Magic Cleanse",
        status: "demo",
        statusLabel: "🎙️ Sodapoppin Demo Finding",
        badge: "Dispel Progression",
        desc: "The level-38 character only had Purify (poison and disease removal). The presenter confirmed that full Cleanse (removing magic debuffs) is learned at level 40 from class trainers."
      },
      {
        title: "Hammer of Justice Tuning",
        status: "verified",
        statusLabel: "Reported in Beta",
        badge: "Core CC",
        desc: "Hammer of Justice functions as a 4-second single-target stun on a 1-minute cooldown, retaining classic PvP interrupt and lockdown utility."
      },
      {
        title: "Native Cooldown Manager: Paladin Essentials",
        status: "verified",
        statusLabel: "Reported in Beta (Oct 8)",
        badge: "Native UI & Edit Mode",
        desc: "Expanded in Beta Build 1.60.1.70425 directly in default HUD Edit Mode. Rotational Spells Tracked: Holy Strike (6s), Judgment (8-10s), Consecration (8s), Holy Shock (10s), Hammer of Wrath (6s), and Cleanse. Major Defensives & Bursts: Divine Shield (5m), Lay on Hands (20m), Blessing of Protection (3m), Divine Protection (5m), Hand of Freedom (20s), and Hammer of Justice (1m). Active Procs & Buffs: The Art of War (instant cast procs with visual glow), Forbearance timer, active Seal auras, Holy Shield charges (4 charges remaining), and Vengeance stacks."
      }
    ],

    holy: {
      title: "Holy: Light's Vigil, Party AoE Healing & Instant Holy Shock",
      tagline: "Empower targets with Light's Vigil to unleash AoE party heals through a 10-second Holy Shock, protected by silence immunity",
      talents: [
        {
          name: "Light's Vigil",
          type: "New Holy Active Spell",
          cast: "Instant",
          duration: "30 sec Duration",
          status: "verified",
          desc: "Applies Light's Vigil to a friendly target for 30 sec. The caster's next Holy Shock on the target incurs no cooldown and heals the target and their party for 326 to 344. Only one Vigil per Paladin may be active in each party."
        },
        {
          name: "Holy Shock (10s Cooldown)",
          type: "Signature Holy Spell",
          cast: "Instant",
          cd: "10 sec Cooldown",
          status: "verified",
          desc: "Blasts the target with Holy energy, causing 129 to 139 Holy damage to an enemy, or 110 to 118 healing to an ally."
        },
        {
          name: "Holy Shock",
          type: "Throughput Keystone",
          cast: "Passive Talent",
          status: "verified",
          desc: "Blasts the target with Holy energy, causing 129 to 139 Holy damage to an enemy, or 110 to 118 healing to an ally."
        },
        {
          name: "Illumination (50% Base Mana Refund)",
          type: "Mana Sustain Talent",
          cast: "Passive",
          status: "verified",
          desc: "Critical healing strikes from Flash of Light, Holy Light, Light's Vigil, or Holy Shock restore mana equal to 50% of the spell's base mana cost."
        },
        {
          name: "Voice of Truth",
          type: "Defensive Casting Cooldown",
          cast: "Passive / Trigger",
          duration: "6 sec Duration",
          status: "verified",
          desc: "Grants you immunity to Silence and Interrupt effects for 6 sec."
        },
        {
          name: "Spiritual Focus",
          type: "Casting Protection",
          cast: "Passive",
          status: "verified",
          desc: "Gives your Flash of Light, Holy Light, and Light's Vigil spells a 70% chance to not lose casting time when you take damage. (at 5/5)"
        },
        {
          name: "Unyielding Faith",
          type: "Passive Stat Cluster",
          cast: "Passive",
          status: "verified",
          desc: "Reduces the duration of Fear and Disorient effects on you by 30%. (at 2/2)"
        }
      ]
    },

    protection: {
      title: "Protection: Seal of Fury Taunt, Block Mana & Templar's Bulwark",
      tagline: "A fully viable main-tanking vanguard featuring a dedicated 4-second taunt, block-driven mana sustain, and a 100% HP absorb shield",
      talents: [
        {
          name: "Seal of Fury",
          type: "Active Single-Target Taunt",
          cast: "Instant",
          cd: "8 sec Cooldown",
          range: "10 Yards",
          status: "verified",
          desc: "Fills you with divine fury for 30 sec, causing melee attacks to inflict an additional 9 Holy damage. While a shield is equipped, each attack also grants an absorb shield equal to 50% of the Holy damage dealt. Only one Seal can be active on the Paladin at any one time. Unleashing this Seal's energy inflicts 36.9 Holy damage to an enemy and taunts the target to attack you for 3 sec."
        },
        {
          name: "Seal of Fury",
          type: "New Protection Seal",
          cast: "Instant",
          duration: "30 sec Duration",
          status: "verified",
          desc: "Fills you with divine fury for 30 sec, causing melee attacks to inflict an additional 9 Holy damage. While a shield is equipped, each attack also grants an absorb shield equal to 50% of the Holy damage dealt. Only one Seal can be active on the Paladin at any one time. Unleashing this Seal's energy inflicts 36.9 Holy damage to an enemy and taunts the target to attack you for 3 sec."
        },
        {
          name: "Shield Specialization",
          type: "Resource Sustain Keystone",
          cast: "Passive",
          status: "verified",
          desc: "Increases the amount of damage absorbed by your shield by 30%, and gives your blocks a 100% chance to restore 4% of your maximum Mana. May only occur once every 3 sec. (at 2/2)"
        },
        {
          name: "Improved Righteous Fury",
          type: "Passive Mitigation",
          cast: "Passive",
          status: "verified",
          desc: "While Righteous Fury is active, all damage taken is reduced by 9%. (at 3/3)"
        },
        {
          name: "Templar's Bulwark",
          type: "Major Defensive Cooldown",
          cast: "Instant",
          cd: "3 min Cooldown",
          duration: "8 sec Duration",
          status: "verified",
          desc: "Surrounds the Paladin in a sacred bulwark, absorbing damage equal to 100% of maximum health for 8 seconds. Uses and triggers the Forbearance restriction."
        },
        {
          name: "Holy Shield",
          type: "Signature Tank Ability",
          cast: "Instant",
          cd: "10 sec Cooldown",
          charges: "4 Charges",
          status: "verified",
          desc: "Increases chance to block by 30% for 10 seconds. Each blocked attack deals Holy damage to the attacker and generates 20% additional threat."
        },
        {
          name: "Reckoning (Block & Crit Trigger)",
          type: "Extra Attack Talent",
          cast: "Passive",
          status: "verified",
          desc: "Grants a chance to gain an extra melee attack after blocking an attack, and always grants an extra attack after receiving a non-periodic critical strike."
        },
      ]
    },

    retribution: {
      title: "Retribution: Unsealed Wrath, Sacred Arbiter & Hybrid Power",
      tagline: "Rotational seal-swapping via Unsealed Wrath, judgment refreshes with Sacred Arbiter, and 100% Intellect-to-Spell Damage scaling",
      talents: [
        {
          name: "Unsealed Wrath (Seal Swapping Capstone)",
          type: "Playstyle Keystone",
          cast: "Passive Proc",
          status: "verified",
          desc: "Whenever you replace Seal of Command, Righteousness, Fury, or Justice with another seal, you create an 'Echo' of the replaced seal. Your next melee attack consumes that Echo and applies the replaced seal's effect! Modernizes seal twisting without requiring swing-timer add-ons."
        },
        {
          name: "Sacred Arbiter",
          type: "Rotational Synergy",
          cast: "Talent Enhancement",
          status: "verified",
          desc: "Increases the damage of your Holy Strike ability by 20% and causes it to refresh all Judgement effects on the target."
        },
        {
          name: "Champion of the Light",
          type: "Hybrid Scaling Keystone",
          cast: "Passive",
          status: "verified",
          desc: "Increases your spell damage by up to 60% of your Intellect, and reduces the cast time of your Hammer of Wrath by 1.0 sec. (at 5/5)"
        },
        {
          name: "Vengeance",
          type: "Damage Multiplier",
          cast: "Passive (5 Stacks)",
          status: "verified",
          desc: "Increases your Physical and Holy damage dealt by 3% for 30 sec after landing a non-periodic critical strike. Stacks up to 5 times. (at 3/3)"
        },
        {
          name: "Vindication",
          type: "Combat Debuff & Self-Buff",
          cast: "Passive Proc",
          status: "verified",
          desc: "Gives your damaging melee attacks a chance to reduce the target's Attack Power by 200 for 30 sec. (at 3/3; rank 1: 67, 30 sec)"
        },
        {
          name: "Pursuit of Justice",
          type: "Mobility & Mount Speed",
          cast: "Passive",
          status: "verified",
          desc: "Increases movement speed by 15% on foot and increases mounted movement speed, providing crucial gap-closing mobility."
        },
        {
          name: "Repentance",
          type: "Single-Target Crowd Control",
          cast: "Instant",
          cd: "1 min Cooldown",
          duration: "6 sec Incapacitate",
          status: "verified",
          desc: "Puts an enemy target into a meditative state, incapacitating them for up to 6 seconds. Any damage taken will awaken the target."
        },
        {
          name: "Champion of the Light",
          type: "Execute & Threat Management",
          cast: "Passive",
          status: "verified",
          desc: "Increases your spell damage by up to 60% of your Intellect, and reduces the cast time of your Hammer of Wrath by 1.0 sec. (at 5/5)"
        }
      ]
    },

    racialSynergies: {
      undeadDemo: {
        title: "Sodapoppin's Undead Paladin Hands-On Demo Findings",
        subtitle: "Forensic testing of updated Undead racials on a Paladin in the BlizzCon 2026 early access demo",
        items: [
          {
            name: "Will of the Forsaken",
            status: "verified",
            statusLabel: "Reported in Beta",
            desc: "Instantly removes Charm, Fear, and Sleep effects on a 2-minute cooldown. Unmatched PvP anti-crowd control tool for a frontline crusader."
          },
          {
            name: "Cannibalize (7% Health & 7% Mana)",
            status: "verified",
            statusLabel: "Reported in Beta",
            desc: "When activated near a Humanoid or Undead corpse, regenerates 7% of total Health and Mana every 2 sec for 10 sec. Excellent leveling sustain between pulls."
          },
          {
            name: "Touch of the Grave",
            status: "verified",
            statusLabel: "Reported in Beta",
            desc: "Spells and attacks have a 20% chance (for Paladins) to drain Health from the target, up to 5% of your maximum Health. 15 sec internal cooldown."
          },
          {
            name: "Underwater Breathing",
            status: "verified",
            statusLabel: "Reported in Beta",
            desc: "Increases underwater breath duration by 300%, facilitating aquatic questing and sunken treasure discovery."
          }
        ]
      },
      newRaces: [
        {
          race: "Undead (Forsaken) Paladin",
          faction: "Horde",
          badge: "✦ NEW IN FOREVER",
          desc: "Former knights of the Silver Hand whose broken faith now burns with agonizing cleansing light. The Horde's first Paladin! Unlocks the unique 'Forsaken Charger' skeletal warhorse at level 40."
        },
        {
          race: "Human Paladin",
          faction: "Alliance",
          badge: "Classic Standard",
          desc: "Defenders of Stormwind with Ruthless (+1% crit), Perception (stealth detection), and The Human Spirit (+10% Spirit)."
        },
        {
          race: "Dwarf Paladin",
          faction: "Alliance",
          badge: "Classic Standard",
          desc: "Khaz Modan crusaders wielding Stoneform (bleed/poison/disease immunity + 10% physical reduction) and Artisan's Precision (+1% hit chance with spells and attacks)."
        }
      ]
    },

    forensicMatrix: [
      {
        feature: "Judgment of Fury (Taunt)",
        category: "Protection",
        details: "Deals Holy damage and taunts target for 4s; direct single-target taunt",
        status: "Verified in Closed Beta",
        statusType: "verified",
        source: "Sodapoppin Hands-On Demo & Tooltip"
      },
      {
        feature: "Seal of Fury Absorb Shield",
        category: "Protection",
        details: "Holy dmg on melee; 50% absorb shield; mana restored when shield breaks",
        status: "Verified in Closed Beta",
        statusType: "verified",
        source: "Sodapoppin Hands-On Demo"
      },
      {
        feature: "Block Mana Regeneration",
        category: "Protection",
        details: "Restores 6% of maximum mana every 3 seconds on successful block",
        status: "Verified in Closed Beta",
        statusType: "verified",
        source: "Sodapoppin Hands-On Demo"
      },
      {
        feature: "Templar's Bulwark",
        category: "Protection",
        details: "100% max health absorb shield for 8s; triggers Forbearance (3m CD)",
        status: "Verified in Closed Beta",
        statusType: "verified",
        source: "Sodapoppin Hands-On Demo"
      },
      {
        feature: "Righteous Fury -6% Damage",
        category: "Protection",
        details: "Reduces damage taken by 6% while Righteous Fury is active",
        status: "Verified in Closed Beta",
        statusType: "verified",
        source: "Sodapoppin Hands-On Demo"
      },
      {
        feature: "Holy Shield Threat",
        category: "Protection",
        details: "10s CD, 4 charges, Holy dmg on block produces +20% threat",
        status: "Verified in Closed Beta",
        statusType: "verified",
        source: "Sodapoppin Hands-On Demo"
      },
      {
        feature: "Unsealed Wrath (Seal Swapping)",
        category: "Retribution",
        details: "Seal swap creates an Echo consumed by next melee hit; modernizes seal twisting",
        status: "Verified in Closed Beta",
        statusType: "verified",
        source: "Sodapoppin Demo & Retribution Tree"
      },
      {
        feature: "Sacred Arbiter Judgment Refresh",
        category: "Retribution",
        details: "+10% Holy Strike damage; refreshes all Judgment effects on target",
        status: "Verified in Closed Beta",
        statusType: "verified",
        source: "Sodapoppin Hands-On Demo"
      },
      {
        feature: "Sheath of Light (100% Int)",
        category: "Retribution",
        details: "Converts up to 100% of Intellect into spell damage and healing",
        status: "Verified in Closed Beta",
        statusType: "verified",
        source: "Sodapoppin Hands-On Demo"
      },
      {
        feature: "Judgment 60% Mana Refund",
        category: "Retribution",
        details: "100% chance on Judgments to refund 60% of mana cost",
        status: "Verified in Closed Beta",
        statusType: "verified",
        source: "Sodapoppin Hands-On Demo"
      },
      {
        feature: "Light's Vigil AoE Healing",
        category: "Holy",
        details: "30s buff; next Holy Shock has 0 CD, heals party or damages enemies, refunds 75% mana",
        status: "Verified in Closed Beta",
        statusType: "verified",
        source: "Sodapoppin Hands-On Demo"
      },
      {
        feature: "Holy Shock 10s Cooldown",
        category: "Holy",
        details: "Cooldown reduced from 30s to 10s; up to +15% crit chance from talents",
        status: "Verified in Closed Beta",
        statusType: "verified",
        source: "Sodapoppin Hands-On Demo"
      },
      {
        feature: "Unbreakable Concentration",
        category: "Holy",
        details: "6 seconds immunity to silence and interrupt effects",
        status: "Verified in Closed Beta",
        statusType: "verified",
        source: "Sodapoppin Hands-On Demo"
      },
      {
        feature: "60-Minute Blessings",
        category: "Core Mechanics",
        details: "All Blessings extended from 5 minutes to 60 minutes",
        status: "Verified in Closed Beta",
        statusType: "verified",
        source: "Sodapoppin In-Game Tooltip"
      },
      {
        feature: "Holy Strike Baseline",
        category: "Core Mechanics",
        details: "Instant melee attack, 35% weapon damage + Holy damage",
        status: "Verified in Closed Beta",
        statusType: "verified",
        source: "Sodapoppin Hands-On Demo"
      },
      {
        feature: "Freedom Removes Kings",
        category: "Buff Interactions",
        details: "Blessing of Freedom removes Blessing of Kings; cannot coexist",
        status: "🎙️ Sodapoppin Demo Finding",
        statusType: "demo",
        source: "Sodapoppin Live In-Game Buff Test"
      },
      {
        feature: "Semi-Capped Consecration",
        category: "AoE Balance",
        details: "First 4 enemies take full damage; additional targets take reduced damage",
        status: "Verified in Closed Beta",
        statusType: "verified",
        source: "Sodapoppin Hands-On Demo"
      },
      {
        feature: "Undead Cannibalize & Touch",
        category: "Undead Racials",
        details: "Cannibalize 7% HP + 7% Mana; Touch of the Grave 5% chance to drain 5% max HP",
        status: "Verified in Closed Beta",
        statusType: "verified",
        source: "Sodapoppin Hands-On Demo"
      }
    ],
    betaBuilds: {
      season: "Closed Beta Phase 2",
      levelCap: 30,
      talentPointsTotal: 21,
      legacyPointsNotice: "Legacy Milestones allow up to +5 additional points at Level 30 (26 total points).",
      level20: {
        levelCap: 20,
        talentPointsTotal: 11,
        legacyPointsNotice: "Legacy Milestones allow up to +2 to +5 additional points at Level 20.",
        specs: [
          {
            specId: "retribution",
            name: "Retribution (Command & Holy Strike)",
            icon: "⚔️",
            role: "2-Handed Holy Melee DPS",
            wowheadCalcUrl: "https://www.wowhead.com/forever/talent-calc/paladin/--502301",
            tagline: "Burst physical and Holy damage with baseline Holy Strike, Seal of Command, and non-expiring Judgement.",
            statPriority: "Strength > Agility > Attack Power > Intellect",
            bestWeapon: "Slow Two-Handed Mace (Verigan's Fist / Smite's Mighty Hammer / Wolfsbane)",
            talents: [
              { name: "Benediction", points: "5/5", tree: "Retribution (Tier 1)", desc: "Reduces the Mana cost of all instant cast spells and abilities by 10%." },
              { name: "Improved Judgement", points: "2/2", tree: "Retribution (Tier 2)", desc: "Decreases the cooldown of your Judgement ability by 2 sec." },
              { name: "Deflection", points: "3/5", tree: "Retribution (Tier 2)", desc: "Increases your Parry chance by 3%, aiding melee trades." },
              { name: "Seal of Command", points: "1/1", tree: "Retribution (Tier 3)", desc: "Gives the Paladin a chance to deal additional Holy damage equal to 70% of weapon damage." }
            ],
            legacyNotes: "Extra points obtained through the Legacy Talented perk unlock 2/2 Pursuit of Justice (8% movement speed) and 3/3 Conviction (+6% all crit).",
            rotation: [
              { label: "Buff & Seal", desc: "Cast Blessing of Might (60m duration) -> Seal of Command." },
              { label: "Rotational Strike", desc: "Holy Strike (baseline instant physical hit dealing Holy dmg) -> Judgement on cooldown." },
              { label: "Stun Burst", desc: "Hammer of Justice stun -> Holy Strike -> Seal of Command proc execute." },
              { label: "Seal Integrity", desc: "Judgement no longer consumes active seals in Forever; keep swinging without re-sealing every 8 seconds!" }
            ],
            bisGear: [
              { slot: "Two-Hand (Alliance)", item: "Verigan's Fist", source: "Level 20 Class Quest", stats: "+12 Sta, +6 Int, +6 Spi, 23.4 DPS" },
              { slot: "Two-Hand (Horde)", item: "Wolfsbane Greatsword", source: "Bandarion Keep Class Quest", stats: "+12 Sta, +6 Str, 23.4 DPS" },
              { slot: "Two-Hand (Alt)", item: "Smite's Mighty Hammer", source: "Deadmines (Mr. Smite)", stats: "+11 Str, 19.8 DPS" },
              { slot: "Legs", item: "Runed Thane Greaves", source: "Hall of Thanes (Dungeon)", stats: "+7 Str, +5 Sta, 120 Armor" },
              { slot: "Shield (Off-spec)", item: "Silverlaine's Shield", source: "Shadowfang Keep", stats: "420 Armor, 12 Block, +5 Sta" }
            ],
            campingPerk: {
              name: "Sharpening Wheel (Blacksmithing camp object)",
              desc: "Everyone sitting at your camp gains up to +34 Strength (level 60 value; does not stack with Strength of Earth Totem). Requires a Campfire."
            },
            classQuestNote: "Level 20 class quest awards Verigan's Fist (Alliance) or Wolfsbane (Horde Undead) and the Warhorse summon spell."
          },
          {
            specId: "protection",
            name: "Protection (Redoubt & Righteous Fury)",
            icon: "🛡️",
            role: "Holy Dungeon Tank",
            wowheadCalcUrl: "https://www.wowhead.com/forever/talent-calc/paladin/-05330",
            tagline: "Holy threat tanking with Righteous Fury, Judgement ranged taunt, and Redoubt block sustain.",
            statPriority: "Stamina > Armor > Strength > Intellect",
            bestWeapon: "One-Hand + Shield (Cruel Barb / Commander's Crest)",
            talents: [
              { name: "Redoubt", points: "5/5", tree: "Protection (Tier 1)", desc: "Increases your chance to block attacks with a shield by 30% after being struck by a melee or ranged critical strike." },
              { name: "Precision", points: "3/3", tree: "Protection (Tier 2)", desc: "Increases your chance to hit with melee weapons and spells by 3%." },
              { name: "Toughness", points: "3/5", tree: "Protection (Tier 2)", desc: "Increases your armor value from items by 6%." }
            ],
            legacyNotes: "Extra points from the Legacy Talented perk unlock 5/5 Toughness (+10% armor) and Blessing of Sanctuary (flat damage reduction on hit).",
            rotation: [
              { label: "Pull & Threat", desc: "Righteous Fury -> Judgement of Fury (10-yard ranged taunt) -> Holy Strike on pull." },
              { label: "AoE Hold", desc: "Drop Consecration rank 1 (baseline in Forever) for sticky AoE threat on dungeon packs." },
              { label: "Block Mana Engine", desc: "Blocking attacks triggers mana return, allowing sustained dungeon chain-pulling." }
            ],
            bisGear: [
              { slot: "Shield", item: "Commander's Crest", source: "Shadowfang Keep (Springvale)", stats: "542 Armor, 16 Block, +6 Str, +3 Sta" },
              { slot: "Relic / Libram", item: "Silver Hand Relic", source: "Ruins of Lordaeron", stats: "+8 Holy Strike Damage" },
              { slot: "Chest", item: "Ironspine's Ribcage", source: "Ruins of Lordaeron (Crypt)", stats: "+8 Str, +6 Sta" }
            ],
            campingPerk: {
              name: "Enchanted Lute (Enchanting camp object)",
              desc: "Everyone sitting at your camp gains up to +308 Armor, +13 to all stats and +22 to all resistances (level 60 values; does not stack with Mark of the Wild)."
            },
            classQuestNote: "Undead Paladins receive the custom 'Forsaken Charger' skeletal warhorse mount spell at level 20."
          },
          {
            specId: "holy",
            name: "Holy (Spiritual Focus & Divine Intellect)",
            icon: "✨",
            role: "Single-Target & Tank Healer",
            wowheadCalcUrl: "https://www.wowhead.com/forever/talent-calc/paladin/505001",
            tagline: "Uninterruptible healing with 70% pushback resistance on Flash of Light and high Intellect efficiency.",
            statPriority: "Intellect > Healing Power > Spirit",
            bestWeapon: "One-Hand Mace + Off-Hand Tome / Shield",
            talents: [
              { name: "Divine Intellect", points: "5/5", tree: "Holy (Tier 1)", desc: "Increases your total Intellect by 10%." },
              { name: "Spiritual Focus", points: "5/5", tree: "Holy (Tier 1)", desc: "Gives your Flash of Light and Holy Light spells a 70% chance to not lose casting time when you take damage." },
              { name: "Healing Light", points: "1/3", tree: "Holy (Tier 2)", desc: "Increases the amount healed by your Holy Light and Flash of Light spells by 4%." }
            ],
            legacyNotes: "Extra points from the Legacy Talented perk unlock Illumination (100% mana refund on heal crits!) and Light's Vigil (AoE party heal).",
            rotation: [
              { label: "Blessing", desc: "Blessing of Wisdom on self; Blessing of Might/Kings on group." },
              { label: "Heal Cycle", desc: "Flash of Light spam (Spiritual Focus prevents pushback even while taking aggro)." }
            ],
            bisGear: [
              { slot: "Staff / Mace", item: "Emberstone Staff", source: "Deadmines", stats: "+5 Int, +5 Spi, +5 Sta" },
              { slot: "Ring", item: "Thane's Healing Band", source: "Hall of Thanes", stats: "+6 Healing, +4 Spirit" }
            ],
            campingPerk: {
              name: "Mana Well (Alchemy camp object)",
              desc: "Craft a Mana Well."
            },
            classQuestNote: "Level 20 Holy Paladin unlocks Sense Undead and Redemption rank 2."
          }
        ]
      },
      level30: {
        levelCap: 30,
        talentPointsTotal: 21,
        legacyPointsNotice: "Legacy Milestones allow up to +5 additional points at Level 30 (26 total points).",
        specs: [
          {
            specId: "retribution",
            name: "Retribution (Seal of Command & Repentance)",
            icon: "⚔️",
            role: "2-Handed Holy Melee DPS & Seal Twister",
            buildUrl: "/talents/paladin?b=--55230201211301&l=30&tl=5",
            wowheadCalcUrl: "https://www.wowhead.com/forever/talent-calc/paladin/--55230201211301",
            tagline: "Devastating Holy burst with 21-pt Repentance incapacitate, 3/3 Conviction crits, 30% Intellect-to-Spell Damage scaling under Champion of the Light, and 60-minute Blessings.",
            statPriority: "Strength > Intellect > Attack Power > Melee Crit > Hit",
            bestWeapon: "Corpsemaker (RFK) / Strike of the Hydra (BFD) / Verigan's Fist / Wolfsbane Greatsword",
            talents: [
              { name: "Benediction", points: "5/5", tree: "Retribution (Tier 1)", desc: "Reduces the Mana cost of all instant cast spells and abilities by 10%." },
              { name: "Improved Judgement", points: "2/2", tree: "Retribution (Tier 2)", desc: "Decreases the cooldown of your Judgement ability by 2 sec." },
              { name: "Deflection", points: "3/5", tree: "Retribution (Tier 2)", desc: "Increases your Parry chance by 3%." },
              { name: "Seal of Command", points: "1/1", tree: "Retribution (Tier 3 Keystone)", desc: "Gives the Paladin a chance to deal additional Holy damage equal to 70% of weapon damage." },
              { name: "Pursuit of Justice", points: "2/2", tree: "Retribution (Tier 3)", desc: "Increases movement and mounted movement speed by 8%." },
              { name: "Conviction", points: "3/3", tree: "Retribution (Tier 2)", desc: "Increases your chance to get a critical strike with all spells and attacks by 6%." },
              { name: "Repentance", points: "1/1", tree: "Retribution (Tier 5 Keystone)", desc: "Puts the enemy target in a state of meditation, incapacitating them for up to 6 sec. Instant cast crowd control on a 1-minute cooldown." },
              { name: "Vengeance", points: "2/5", tree: "Retribution (Tier 5)", desc: "Increases your Physical and Holy damage dealt by 2% for 30 sec after landing a non-periodic critical strike. Stacks up to 5 times." }
            ],
            legacyNotes: "Extra points from the Legacy Talented perk max out 5/5 Vengeance (+15% Physical and Holy damage) and Unsealed Wrath.",
            rotation: [
              { label: "Buffs & Seal", desc: "Cast 60-minute Blessing of Might or Kings (both baseline!) -> Seal of Command (Judgement does not consume the seal!)." },
              { label: "Strike Priority", desc: "Holy Strike on cooldown -> Judgement on 8s cooldown -> Hammer of Justice stun." },
              { label: "Crowd Control", desc: "Cast Repentance instantly to shut down dangerous caster mobs in Excavation Site and Dalaran." },
              { label: "Execute", desc: "Hammer of Wrath at <20% enemy HP; trigger baseline Victory perks." }
            ],
            bisGear: [
              { slot: "Two-Hand Weapon", item: "Corpsemaker", source: "Razorfen Kraul (Overlord Ramtusk)", stats: "+15 Str, +8 Sta, 28.9 DPS 2H Axe" },
              { slot: "Two-Hand (Alt)", item: "Strike of the Hydra", source: "Blackfathom Deeps (Aku'mai)", stats: "26.3 DPS, Chance on Hit: 150 Shadow Damage" },
              { slot: "Legs", item: "Cobalt Legguards", source: "Blackfathom Deeps", stats: "+14 Str, +8 Sta, Mail" },
              { slot: "Chest", item: "Excavator's Mail Hauberk", source: "Excavation Site: Wetlands", stats: "+15 Str, +10 Sta, 290 Armor" },
              { slot: "Ring", item: "Silverlaine's Family Seal", source: "Shadowfang Keep", stats: "+3 Str, +3 Sta" }
            ],
            campingPerk: {
              name: "Sharpening Wheel (Blacksmithing camp object)",
              desc: "Everyone sitting at your camp gains up to +34 Strength (level 60 value; does not stack with Strength of Earth Totem). Requires a Campfire."
            },
            classQuestNote: "Level 30 Paladins train heavy mail armor and Holy Cleave upgrades."
          },
          {
            specId: "protection",
            name: "Protection (Reckoning & Redoubt Overhaul)",
            icon: "🛡️",
            role: "Holy Dungeon Tank & AoE Anchor",
            buildUrl: "/talents/paladin?b=-55320102313001-&l=30&tl=5",
            wowheadCalcUrl: "https://www.wowhead.com/forever/talent-calc/paladin/-55320102313001-",
            tagline: "Unshakable multi-target tanking with Reckoning banked weapon swings, Redoubt 20% block, Judgement of Fury ranged taunt, and block-based mana return.",
            statPriority: "Stamina > Armor > Shield Block > Strength > Intellect",
            bestWeapon: "Arctic Buckler (BFD) / Commander's Crest + Zealot Blade",
            talents: [
              { name: "Redoubt", points: "5/5", tree: "Protection (Tier 1)", desc: "Damaging melee attacks against you have a 10% chance to increase your chance to block by 30%. Lasts 10 sec or 5 blocks." },
              { name: "Precision", points: "3/3", tree: "Protection (Tier 2)", desc: "Increases your chance to hit with melee weapons and spells by 3%." },
              { name: "Guardian's Favor", points: "2/2", tree: "Protection (Tier 2)", desc: "Reduces cooldown of Blessing of Protection by 120s and increases Blessing of Freedom duration by 6s." },
              { name: "Shield Specialization", points: "2/2", tree: "Protection (Tier 2)", desc: "Increases the amount of damage absorbed by your shield by 30% and gives blocks a 100% chance to restore 4% of your maximum Mana." },
              { name: "Improved Righteous Fury", points: "3/3", tree: "Protection (Tier 3)", desc: "While Righteous Fury is active, all damage taken is reduced by 9%." },
              { name: "Toughness", points: "3/5", tree: "Protection (Tier 3)", desc: "Increases your armor value from items by 6%." },
              { name: "Improved Hammer of Justice", points: "1/3", tree: "Protection (Tier 4)", desc: "Decreases the cooldown of your Hammer of Justice spell by 5 sec." },
              { name: "Reckoning", points: "1/5", tree: "Protection (Tier 5)", desc: "Gives you a 20% chance after taking damage to gain an extra weapon swing on your next attack. Stores up to 4 charges and triggers on weapon swing." }
            ],
            legacyNotes: "Extra points from the Legacy Talented perk unlock 5/5 Reckoning, Templar's Bulwark, and Holy Shield in post-30 tiers.",
            rotation: [
              { label: "Pull & Ranged Taunt", desc: "Righteous Fury -> Judgement of Fury (10-yard ranged taunt) -> Holy Strike on pull." },
              { label: "Bulwark & Consecration", desc: "Activate Templar's Bulwark on pull and drop baseline Consecration; blocked attacks continuously deal holy damage back to all attackers." },
              { label: "Block Mana Engine", desc: "Blocking attacks continuously refunds mana, allowing endless chain-pulling without drink stops." },
              { label: "Single-Target Lock", desc: "Holy Strike and Hammer of Justice on caster mobs." }
            ],
            bisGear: [
              { slot: "Shield", item: "Arctic Buckler", source: "Blackfathom Deeps", stats: "620 Armor, 19 Block, +8 Sta" },
              { slot: "Shield (Alt)", item: "Commander's Crest", source: "Shadowfang Keep", stats: "542 Armor, 16 Block, +6 Str, +3 Sta" },
              { slot: "One-Hand", item: "Zealot Blade", source: "World Drop BoE", stats: "+4 Str, +5 Sta, 20.4 DPS" },
              { slot: "Relic / Libram", item: "Silver Hand Relic", source: "Ruins of Lordaeron", stats: "+8 Holy Strike Damage" },
              { slot: "Chest", item: "Ironspine's Ribcage", source: "Ruins of Lordaeron (Crypt)", stats: "+8 Str, +6 Sta" }
            ],
            campingPerk: {
              name: "Enchanted Lute (Enchanting camp object)",
              desc: "Everyone sitting at your camp gains up to +308 Armor, +13 to all stats and +22 to all resistances (level 60 values; does not stack with Mark of the Wild)."
            },
            classQuestNote: "Forsaken Charger mount and Warhorse speed scale seamlessly into Phase 2 zones."
          },
          {
            specId: "holy",
            name: "Holy (Holy Shock & Illumination Engine)",
            icon: "✨",
            role: "Dungeon Healer & Light's Vigil Engine",
            buildUrl: "/talents/paladin?b=55320015022001--&l=30&tl=5",
            wowheadCalcUrl: "https://www.wowhead.com/forever/talent-calc/paladin/55320015022001--",
            tagline: "Instant emergency triage through Holy Shock (10s cooldown), 100% mana refunds on heal crits via Illumination, and 70% pushback immunity.",
            statPriority: "Healing Power > Intellect > Spell Crit > Spirit > Mp5",
            bestWeapon: "Dalaran Healer Gavel / Rod of the Sleepwalker + Silver Hand Relic",
            talents: [
              { name: "Divine Intellect", points: "5/5", tree: "Holy (Tier 1)", desc: "Increases your total Intellect by 10%." },
              { name: "Spiritual Focus", points: "5/5", tree: "Holy (Tier 1)", desc: "Gives Flash of Light and Holy Light a 70% chance to not lose casting time when taking damage." },
              { name: "Healing Light", points: "3/3", tree: "Holy (Tier 2)", desc: "Increases the amount healed by Holy Light and Flash of Light by 12%." },
              { name: "Illumination", points: "5/5", tree: "Holy (Tier 3 Keystone)", desc: "After getting a critical effect from your Flash of Light, Holy Light, or Holy Shock, gives you a 100% chance to gain Mana equal to 50% of the base cost." },
              { name: "Holy Shock", points: "1/1", tree: "Holy (Tier 5 Keystone)", desc: "Blasts the target with Holy energy, dealing Holy damage to an enemy, or healing an ally. Instant cast on a 10s cooldown." }
            ],
            legacyNotes: "Extra points from the Legacy Talented perk unlock Light's Vigil (AoE party heal) and Divine Favor (guarantees next heal crits).",
            rotation: [
              { label: "Blessings & Auras", desc: "60-minute Blessing of Wisdom on self; Devotion Aura or Concentration Aura on group." },
              { label: "Sustained Heals", desc: "Flash of Light spam (Spiritual Focus prevents pushback even while taking aggro)." },
              { label: "Instant Triage", desc: "Fire Holy Shock instantly while on the run to stabilize spiking tank or party members." },
              { label: "Mana Refund", desc: "Illumination refunds 100% mana on critical heals, resulting in near-infinite healer endurance." }
            ],
            bisGear: [
              { slot: "One-Hand Mace", item: "Gavel of the Crystal Lake", source: "Excavation Site: Wetlands", stats: "+14 Healing Power, +6 Int, +4 Spi" },
              { slot: "Chest", item: "Robes of Dalaran Caretaker", source: "City of Dalaran (Hospital Wing)", stats: "+18 Healing Power, +8 Int, +6 Spi" },
              { slot: "Robe (Alt)", item: "Robes of the Kirin Tor", source: "City of Dalaran", stats: "+14 Spell Power, +10 Int, +6 Spi" },
              { slot: "Hands", item: "Gloves of the Holy", source: "City of Dalaran", stats: "+8 Str, +6 Sta" }
            ],
            campingPerk: {
              name: "Mana Well (Alchemy camp object)",
              desc: "Craft a Mana Well."
            },
            classQuestNote: "Sense Undead and Purify ranks upgraded at Level 30 trainers."
          }
        ]
      },
      specs: []
    }
  };
  if (window.WOW_FOREVER_DATA?.classDeepDives?.paladin?.betaBuilds?.level30) {
    window.WOW_FOREVER_DATA.classDeepDives.paladin.betaBuilds.specs = window.WOW_FOREVER_DATA.classDeepDives.paladin.betaBuilds.level30.specs;
  }
}
