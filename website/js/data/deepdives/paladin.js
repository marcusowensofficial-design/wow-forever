/**
 * World of Warcraft: Forever - Paladin Class Deep Dive Dataset
 * Primary Source: Sodapoppin Level-38 Undead Paladin Hands-On Early Access Demo & Closed Beta Forensics
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
    specs: "Holy (Light's Vigil/AoE Heals) • Protection (Seal of Fury/Taunt) • Retribution (Twist of Light/Sacred Arbiter)",
    hasData: true,
    videoTitle: "WoW Forever Paladin Class Deep Dive & Undead Racials",
    videoUrl: "https://www.youtube.com/watch?v=CGEOZoZ_8I4",
    sourceAttribution: "Sodapoppin Level-38 Undead Paladin BlizzCon Early Access Demo & Closed Beta Forensics",
    summary: "WoW Forever brings a monumental overhaul to the Paladin class: the historic introduction of Undead Paladins with the custom 'Forsaken Charger' skeletal warhorse, a dedicated single-target taunt via Judgment of Fury, block-based mana regeneration, AoE healing with Light's Vigil and 10s Holy Shock, baseline Holy Strike, 60-minute Blessings, and official seal-twisting mechanics supported by the Twist of Light capstone.",

    subTabs: [
      { id: "overview", label: "Full Dossier", icon: "📑" },
      { id: "core", label: "Core Rules & QoL", icon: "📜" },
      { id: "betaBuilds", label: "Level 20 & 30 Builds", icon: "⚡" },
      { id: "holy", label: "Holy Healer & AoE", icon: "✨" },
      { id: "protection", label: "Protection Tank & Taunt", icon: "🛡️" },
      { id: "retribution", label: "Retribution & Twist of Light", icon: "⚔️" },
      { id: "undead", label: "Undead Testing & Races", icon: "💀" },
      { id: "matrix", label: "Verification Matrix", icon: "🔬" }
    ],

    coreRules: [
      {
        title: "Holy Shield & Redoubt Overhaul",
        status: "verified",
        statusLabel: "Phase 2 Beta Update (Oct 2026)",
        badge: "Tanking Keystone",
        desc: "Redoubt now scales smoothly (4/8/12/16/20% block chance), and Holy Shield grants +30% block chance while retaliating with Holy damage on each blocked attack, cementing Paladins as premier AoE dungeon tanks."
      },
      {
        title: "Champion of the Light Scaling",
        status: "verified",
        statusLabel: "Phase 2 Beta Update (Oct 2026)",
        badge: "Retribution Scaling",
        desc: "Champion of the Light now converts 20/40/60% of total Intellect into Spell Damage and Healing, bridging the gap between Strength-based weapon strikes and Holy spell damage."
      },
      {
        title: "60-Minute Blessings & Kings Baseline",
        status: "verified",
        statusLabel: "Verified in Beta (Oct 2026)",
        badge: "Major QoL",
        desc: "All standard Paladin Blessings (Might, Wisdom, Kings, Salvation, Light) now have a full 60-minute duration. Notably, Blessing of Kings is trained baseline by ALL Paladins in WoW Forever, while Blessing of Sanctuary has been permanently removed."
      },
      {
        title: "Consecration Baseline for All Specializations",
        status: "verified",
        statusLabel: "Verified in Beta",
        badge: "Baseline System",
        desc: "Consecration is now learned directly at class trainers by all Paladins baseline, freeing up holy talent points and allowing Protection tanks and Retribution DPS to maintain AoE presence from early leveling."
      },
      {
        title: "Holy Strike Baseline",
        status: "verified",
        statusLabel: "Verified in Beta",
        badge: "Baseline Attack",
        desc: "Holy Strike is available as a baseline melee strike dealing 35% weapon damage plus additional Holy damage on an instant cast. Serves as the core active melee button across all three specializations."
      },
      {
        title: "New Talents: Voice of Truth & Infusion of Light",
        status: "exclusive",
        statusLabel: "✦ Forever Exclusive",
        badge: "Talent Rework",
        desc: "Beta introduces potent talents: Voice of Truth (complete immunity to Silence and Interrupt mechanics), Reverence (in-combat mana regeneration while casting), Purifying Power (reduced costs/cooldowns for Cleanse/Exorcism), and Infusion of Light (holy crits make next Holy Light fast or instant)."
      },
      {
        title: "Blessing of Freedom & Kings Mutual Exclusion",
        status: "demo",
        statusLabel: "🎙️ Sodapoppin Demo Finding",
        badge: "Buff Interaction",
        desc: "Using Blessing of Freedom removes Blessing of Kings from the target in the demonstrated build, meaning mobility blessings and stat blessings cannot simultaneously coexist on the same player."
      },
      {
        title: "Semi-Capped Consecration",
        status: "verified",
        statusLabel: "Verified in Beta",
        badge: "AoE Balance",
        desc: "Consecration features a semi-capped damage model: the first 4 enemies take full additional damage, while secondary targets beyond that threshold receive reduced scaling damage to prevent degenerate AoE farming."
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
        statusLabel: "Verified in Beta",
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
        statusLabel: "Verified in Beta",
        badge: "Core CC",
        desc: "Hammer of Justice functions as a 4-second single-target stun on a 1-minute cooldown, retaining classic PvP interrupt and lockdown utility."
      },
      {
        title: "Native Cooldown Manager: Paladin Essentials",
        status: "verified",
        statusLabel: "Verified in Beta (Oct 8)",
        badge: "Native UI & Edit Mode",
        desc: "Expanded in Beta Build 1.60.6.71890 directly in default HUD Edit Mode. Rotational Spells Tracked: Holy Strike (6s), Judgment (8-10s), Consecration (8s), Holy Shock (10s), Hammer of Wrath (6s), and Cleanse. Major Defensives & Bursts: Divine Shield (5m), Lay on Hands (20m), Blessing of Protection (3m), Divine Protection (5m), Hand of Freedom (20s), and Hammer of Justice (1m). Active Procs & Buffs: The Art of War (instant cast procs with visual glow), Forbearance timer, active Seal auras, Holy Shield charges (4 charges remaining), and Vengeance stacks."
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
          desc: "Places a 30-second blessing on a target. Your next Holy Shock on that target has no cooldown, triggers an AoE heal to the target's entire party (or Holy damage if cast on an enemy), and refunds 75% of Light's Vigil's mana cost! Limited to 1 active Light's Vigil per party per Paladin."
        },
        {
          name: "Holy Shock (10s Cooldown)",
          type: "Signature Holy Spell",
          cast: "Instant",
          cd: "10 sec Cooldown",
          status: "verified",
          desc: "Blasts a target with Holy energy, dealing Holy damage to an enemy or healing an ally. Cooldown drastically shortened from Classic's 30 seconds to a snappy 10 seconds."
        },
        {
          name: "Holy Shock & Spell Critical Bonus",
          type: "Throughput Keystone",
          cast: "Passive Talent",
          status: "verified",
          desc: "Grants up to +15% critical-strike chance specifically for Holy Shock, and an additional +5% critical-strike chance across all other Paladin spells."
        },
        {
          name: "Illumination (50% Base Mana Refund)",
          type: "Mana Sustain Talent",
          cast: "Passive",
          status: "verified",
          desc: "Critical healing strikes from Flash of Light, Holy Light, Light's Vigil, or Holy Shock restore mana equal to 50% of the spell's base mana cost."
        },
        {
          name: "Unbreakable Concentration (Silence Immunity)",
          type: "Defensive Casting Cooldown",
          cast: "Passive / Trigger",
          duration: "6 sec Duration",
          status: "verified",
          desc: "Grants 6 seconds of complete immunity to silence and interrupt effects, providing Holy Paladins with an essential caster-protection window during high-damage raid spikes and PvP encounters."
        },
        {
          name: "Healing Pushback Resistance",
          type: "Casting Protection",
          cast: "Passive",
          status: "verified",
          desc: "Gives Flash of Light, Holy Light, and Light's Vigil a 7% chance per rank not to lose casting progress from damage taken."
        },
        {
          name: "Holy Stat & Seal Amplification",
          type: "Passive Stat Cluster",
          cast: "Passive",
          status: "verified",
          desc: "Increases total Intellect by 10%, total Strength by 10%, reduces the duration of fear and disorient effects on the Paladin by 30%, and increases Seal and Judgment damage by 15%."
        }
      ]
    },

    protection: {
      title: "Protection: Seal of Fury Taunt, Block Mana & Templar's Bulwark",
      tagline: "A fully viable main-tanking vanguard featuring a dedicated 4-second taunt, block-driven mana sustain, and a 100% HP absorb shield",
      talents: [
        {
          name: "Judgment of Fury (Direct Taunt)",
          type: "Active Single-Target Taunt",
          cast: "Instant",
          cd: "8 sec Cooldown",
          range: "10 Yards",
          status: "verified",
          desc: "Judging Seal of Fury deals Holy damage and taunts the target to attack you for 4 seconds. Finally grants Protection Paladins a direct single-target taunt required for raid boss mechanics and dungeon control!"
        },
        {
          name: "Seal of Fury & Absorb Shield",
          type: "New Protection Seal",
          cast: "Instant",
          duration: "30 sec Duration",
          status: "verified",
          desc: "Fills the Paladin with righteous fury, adding Holy damage to all melee attacks. While a shield is equipped, each attack generates an absorb shield equal to 50% of the added Holy damage. When the shield fully absorbs damage, it restores mana (scaling higher with attacker level)."
        },
        {
          name: "Block Mana Restoration",
          type: "Resource Sustain Keystone",
          cast: "Passive",
          status: "verified",
          desc: "Successfully blocking a melee attack restores 6% of maximum mana every 3 seconds, solving the infamous Classic Protection Paladin mana starvation issue while tanking multiple mobs."
        },
        {
          name: "Righteous Fury Damage Reduction",
          type: "Passive Mitigation",
          cast: "Passive",
          status: "verified",
          desc: "While Righteous Fury is active, reduces all damage taken by 6% in addition to its standard high Holy threat multiplier."
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
          name: "Swift Judgment",
          type: "Rotational Cooldown Reset",
          cast: "Talent Enhancement",
          status: "verified",
          desc: "Instantly completes Judgment's remaining cooldown and reduces the mana cost of your next Judgment, enabling rapid follow-up Judgments or an immediate emergency taunt."
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
        {
          name: "Protection Defensive Foundations",
          type: "Stat Enhancements",
          cast: "Passive Cluster",
          status: "verified",
          desc: "Includes increased total Armor, Defense skill, Stamina, Spell-Hit rating, Shield Block value, and flat cooldown reduction on defensive tools."
        }
      ]
    },

    retribution: {
      title: "Retribution: Twist of Light, Sacred Arbiter & Hybrid Power",
      tagline: "Rotational seal-twisting via Twist of Light Echoes, judgment refreshes with Sacred Arbiter, and 100% Intellect-to-Spell Damage scaling",
      talents: [
        {
          name: "Twist of Light (Seal Twisting Capstone)",
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
          desc: "Increases Holy Strike damage by 10% and causes Holy Strike to refresh all active Judgment effects on the target, maintaining constant judgment uptime without mana drain."
        },
        {
          name: "Sheath of Light (100% Int to Spell Damage)",
          type: "Hybrid Scaling Keystone",
          cast: "Passive",
          status: "verified",
          desc: "Increases your spell damage and healing by an amount equal to up to 100% of your total Intellect, cementing Retribution's identity as a devastating Holy/Physical hybrid."
        },
        {
          name: "Judgment Mana Refund",
          type: "Resource Management",
          cast: "Passive",
          status: "verified",
          desc: "Judgments have a 100% chance to refund 60% of their mana cost, solving Retribution's classic mana burn during sustained boss encounters."
        },
        {
          name: "Vengeance / Critical Stacks",
          type: "Damage Multiplier",
          cast: "Passive (5 Stacks)",
          status: "verified",
          desc: "Landing a physical or spell critical strike grants a stacking buff increasing physical and Holy damage dealt by 1% per stack, up to 5 stacks (+5% total damage)."
        },
        {
          name: "Vindication",
          type: "Combat Debuff & Self-Buff",
          cast: "Passive Proc",
          status: "verified",
          desc: "Damaging melee attacks have a chance to lower the target's attack power while simultaneously raising the Paladin's attack power by 3%."
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
          name: "Crusade",
          type: "Damage Multiplier",
          cast: "Passive",
          status: "verified",
          desc: "Increases all damage dealt by 2%, with an additional 2% increase (4% total) against Undead and Demon targets."
        },
        {
          name: "Hammer of Wrath & Threat Reduction",
          type: "Execute & Threat Management",
          cast: "Passive",
          status: "verified",
          desc: "Reduces Hammer of Wrath's cast time by 1.0 second and lowers all threat generated by 20% while Righteous Fury is inactive."
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
            statusLabel: "Verified in Beta",
            desc: "Instantly removes Charm, Fear, and Sleep effects on a 2-minute cooldown. Unmatched PvP anti-crowd control tool for a frontline crusader."
          },
          {
            name: "Cannibalize (7% Health & 7% Mana)",
            status: "verified",
            statusLabel: "Verified in Beta",
            desc: "When activated near a humanoid or undead corpse, regenerates 7% of total health and 7% of total mana. Excellent leveling sustain between pulls."
          },
          {
            name: "Touch of the Grave",
            status: "verified",
            statusLabel: "Verified in Beta",
            desc: "Attacks and spells have a 5% chance to drain health from the target for up to 5% of the Paladin's maximum health, offering passive self-healing during melee combat."
          },
          {
            name: "Underwater Breathing",
            status: "verified",
            statusLabel: "Verified in Beta",
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
          desc: "Defenders of Stormwind with Sword Specialization (+2% crit), Perception (stealth detection), and The Human Spirit (+5% Spirit)."
        },
        {
          race: "Dwarf Paladin",
          faction: "Alliance",
          badge: "Classic Standard",
          desc: "Khaz Modan crusaders wielding Stoneform (bleed/poison/disease immunity + 10% physical reduction) and Mace Specialization (+1% crit to all spells and attacks)."
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
        feature: "Twist of Light (Echo)",
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
              { name: "Benediction", points: "5/5", tree: "Retribution (Tier 1)", desc: "Reduces the Mana cost of your Judgement and Seal spells by 15%." },
              { name: "Improved Judgement", points: "2/2", tree: "Retribution (Tier 2)", desc: "Decreases the cooldown of your Judgement spell by 2 sec (down to 8 sec)." },
              { name: "Deflection", points: "3/5", tree: "Retribution (Tier 2)", desc: "Increases your Parry chance by 3%, aiding melee trades." },
              { name: "Seal of Command", points: "1/1", tree: "Retribution (Tier 3)", desc: "Gives the Paladin a chance to deal additional Holy damage equal to 70% of weapon damage." }
            ],
            legacyNotes: "Extra points obtained through Legacy Discovery unlock 2/2 Pursuit of Justice (8% movement speed) and Conviction (5% melee crit).",
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
              name: "Crusader's Vow (+5% Total Strength)",
              desc: "Setting camp with a Cozy Sleeping Bag provides 200% rested XP rate and grants the 'Holy Fervor' 2-hour +5% Strength buff."
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
            legacyNotes: "Extra Legacy points unlock 5/5 Toughness (+10% armor) and Blessing of Sanctuary (flat damage reduction on hit).",
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
              name: "Bastion of Light (+10% Shield Block Value)",
              desc: "Camp rest bonus increases Shield Block Value by 10% and armor contribution by 8% for 2 hours."
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
            legacyNotes: "Extra Legacy points unlock Illumination (100% mana refund on heal crits!) and Light's Vigil (AoE party heal).",
            rotation: [
              { label: "Blessing", desc: "Blessing of Wisdom on self; Blessing of Might/Kings on group." },
              { label: "Heal Cycle", desc: "Flash of Light spam (Spiritual Focus prevents pushback even while taking aggro)." }
            ],
            bisGear: [
              { slot: "Staff / Mace", item: "Emberstone Staff", source: "Deadmines", stats: "+5 Int, +5 Spi, +5 Sta" },
              { slot: "Ring", item: "Thane's Healing Band", source: "Hall of Thanes", stats: "+6 Healing, +4 Spirit" }
            ],
            campingPerk: {
              name: "Aura of Purity (+15% Mana Pool)",
              desc: "Camp resting grants a sustained 15% maximum mana boost and 10% reduced pushback for 2 hours."
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
            buildUrl: "/talents/paladin?b=--35205001200021&l=30&tl=5",
            wowheadCalcUrl: "https://www.wowhead.com/forever/talent-calc/paladin/--35205001200021",
            tagline: "Devastating Holy burst with 21-pt Repentance incapacitate, 5/5 Conviction crits, 60% Intellect-to-Spell Damage scaling under Champion of the Light, and 60-minute Blessings.",
            statPriority: "Strength > Intellect > Attack Power > Melee Crit > Hit",
            bestWeapon: "Corpsemaker (RFK) / Strike of the Hydra (BFD) / Verigan's Fist / Wolfsbane Greatsword",
            talents: [
              { name: "Benediction", points: "5/5", tree: "Retribution (Tier 1)", desc: "Reduces the Mana cost of your Judgement and Seal spells by 15%." },
              { name: "Improved Judgement", points: "2/2", tree: "Retribution (Tier 2)", desc: "Decreases the cooldown of your Judgement spell by 2 sec (down to 8 sec)." },
              { name: "Deflection", points: "3/5", tree: "Retribution (Tier 2)", desc: "Increases your Parry chance by 3%." },
              { name: "Seal of Command", points: "1/1", tree: "Retribution (Tier 3 Keystone)", desc: "Gives the Paladin a chance to deal additional Holy damage equal to 70% of weapon damage." },
              { name: "Pursuit of Justice", points: "2/2", tree: "Retribution (Tier 3)", desc: "Increases movement and mounted movement speed by 8%." },
              { name: "Conviction", points: "5/5", tree: "Retribution (Tier 4)", desc: "Increases your chance to get a critical strike with melee weapons by 5%." },
              { name: "Repentance", points: "1/1", tree: "Retribution (Tier 5 Keystone)", desc: "Puts the enemy target in a state of meditation, incapacitating them for up to 6 sec. Instant cast crowd control on a 1-minute cooldown." },
              { name: "Vengeance", points: "2/5", tree: "Retribution (Tier 5)", desc: "Gives you a 6% bonus to Physical and Holy damage you deal for 8 sec after dealing a critical strike." }
            ],
            legacyNotes: "Extra Legacy discovery points max out 5/5 Vengeance (+15% Physical and Holy damage) and Twist of Light.",
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
              name: "Crusader's Vow (+5% Total Strength)",
              desc: "Setting camp with a Cozy Sleeping Bag provides 200% rested XP rate and grants the 'Holy Fervor' 2-hour +5% Strength buff."
            },
            classQuestNote: "Level 30 Paladins train heavy mail armor and Holy Cleave upgrades."
          },
          {
            specId: "protection",
            name: "Protection (Holy Shield & Redoubt Overhaul)",
            icon: "🛡️",
            role: "Holy Dungeon Tank & AoE Anchor",
            buildUrl: "/talents/paladin?b=-5530000300000001-&l=30&tl=5",
            wowheadCalcUrl: "https://www.wowhead.com/forever/talent-calc/paladin/-5530000300000001-",
            tagline: "Unshakable multi-target tanking with Holy Shield (+30% block & holy retaliation damage), Redoubt 20% block, Judgement of Fury ranged taunt, and block-based mana return.",
            statPriority: "Stamina > Armor > Shield Block > Strength > Intellect",
            bestWeapon: "Arctic Buckler (BFD) / Commander's Crest + Outlaw Sabre",
            talents: [
              { name: "Redoubt", points: "5/5", tree: "Protection (Tier 1)", desc: "Increases your chance to block attacks with a shield by 20% after being struck by a melee or ranged attack." },
              { name: "Precision", points: "3/3", tree: "Protection (Tier 2)", desc: "Increases your chance to hit with melee weapons and spells by 3%." },
              { name: "Toughness", points: "5/5", tree: "Protection (Tier 2)", desc: "Increases your armor value from items by 10%." },
              { name: "Improved Righteous Fury", points: "3/3", tree: "Protection (Tier 3)", desc: "Increases the amount of threat generated by your Righteous Fury spell by 50%." },
              { name: "Shield Specialization", points: "3/3", tree: "Protection (Tier 3)", desc: "Increases the amount of damage absorbed by your shield by 30%." },
              { name: "Holy Shield", points: "1/1", tree: "Protection (Tier 5 Keystone)", desc: "Increases chance to block by 30% for 10 sec and damages attackers for 65 Holy damage on block. Generates massive AoE threat!" },
              { name: "One-Handed Specialization", points: "1/5", tree: "Protection (Tier 4)", desc: "Increases all damage dealt with one-handed melee weapons by 2%." }
            ],
            legacyNotes: "Extra Legacy discovery points unlock 5/5 One-Handed Specialization and Anticipation (+10 Defense).",
            rotation: [
              { label: "Pull & Ranged Taunt", desc: "Righteous Fury -> Judgement of Fury (10-yard ranged taunt) -> Holy Strike on pull." },
              { label: "Holy Shield & Consecration", desc: "Activate Holy Shield on pull and drop baseline Consecration; blocked attacks continuously deal holy damage back to all attackers." },
              { label: "Block Mana Engine", desc: "Blocking attacks continuously refunds mana, allowing endless chain-pulling without drink stops." },
              { label: "Single-Target Lock", desc: "Holy Strike and Hammer of Justice on caster mobs." }
            ],
            bisGear: [
              { slot: "Shield", item: "Arctic Buckler", source: "Blackfathom Deeps", stats: "620 Armor, 19 Block, +8 Sta" },
              { slot: "Shield (Alt)", item: "Commander's Crest", source: "Shadowfang Keep", stats: "542 Armor, 16 Block, +6 Str, +3 Sta" },
              { slot: "One-Hand", item: "Outlaw Sabre", source: "Blackfathom Deeps Quest", stats: "+10 Agi, 21.8 DPS" },
              { slot: "Relic / Libram", item: "Silver Hand Relic", source: "Ruins of Lordaeron", stats: "+8 Holy Strike Damage" },
              { slot: "Chest", item: "Ironspine's Ribcage", source: "Ruins of Lordaeron (Crypt)", stats: "+8 Str, +6 Sta" }
            ],
            campingPerk: {
              name: "Bastion of Light (+10% Shield Block Value)",
              desc: "Camp rest bonus increases Shield Block Value by 10% and armor contribution by 8% for 2 hours."
            },
            classQuestNote: "Forsaken Charger mount and Warhorse speed scale seamlessly into Phase 2 zones."
          },
          {
            specId: "holy",
            name: "Holy (Holy Shock & Illumination Engine)",
            icon: "✨",
            role: "Dungeon Healer & Light's Vigil Engine",
            buildUrl: "/talents/paladin?b=05350000005001--&l=30&tl=5",
            wowheadCalcUrl: "https://www.wowhead.com/forever/talent-calc/paladin/05350000005001--",
            tagline: "Instant emergency triage through Holy Shock (10s cooldown), 100% mana refunds on heal crits via Illumination, and 70% pushback immunity.",
            statPriority: "Healing Power > Intellect > Spell Crit > Spirit > Mp5",
            bestWeapon: "Dalaran Healer Gavel / Rod of the Sleepwalker + Silver Hand Relic",
            talents: [
              { name: "Divine Intellect", points: "5/5", tree: "Holy (Tier 1)", desc: "Increases your total Intellect by 10%." },
              { name: "Spiritual Focus", points: "5/5", tree: "Holy (Tier 1)", desc: "Gives Flash of Light and Holy Light a 70% chance to not lose casting time when taking damage." },
              { name: "Healing Light", points: "3/3", tree: "Holy (Tier 2)", desc: "Increases the amount healed by Holy Light and Flash of Light by 12%." },
              { name: "Illumination", points: "5/5", tree: "Holy (Tier 3 Keystone)", desc: "After getting a critical effect from your Flash of Light, Holy Light, or Holy Shock, gives you a 100% chance to gain Mana equal to the base cost!" },
              { name: "Improved Lay on Hands", points: "2/2", tree: "Holy (Tier 3)", desc: "Gives the target of Lay on Hands a 30% bonus to Armor for 2 min." },
              { name: "Holy Shock", points: "1/1", tree: "Holy (Tier 5 Keystone)", desc: "Blasts the target with Holy energy, dealing Holy damage to an enemy, or healing an ally. Instant cast on a 10s cooldown." }
            ],
            legacyNotes: "Extra Legacy discovery points unlock Light's Vigil (AoE party heal) and Divine Favor (guarantees next heal crits).",
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
              name: "Aura of Purity (+15% Mana Pool)",
              desc: "Camp resting grants a sustained 15% maximum mana boost and 10% reduced pushback for 2 hours."
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
