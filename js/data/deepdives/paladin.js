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
      { id: "holy", label: "Holy Healer & AoE", icon: "✨" },
      { id: "protection", label: "Protection Tank & Taunt", icon: "🛡️" },
      { id: "retribution", label: "Retribution & Twist of Light", icon: "⚔️" },
      { id: "undead", label: "Undead Testing & Races", icon: "💀" },
      { id: "matrix", label: "Verification Matrix", icon: "🔬" }
    ],

    coreRules: [
      {
        title: "60-Minute Blessings",
        status: "verified",
        statusLabel: "Verified in Beta",
        badge: "Major QoL",
        desc: "All standard Paladin Blessings (Might, Wisdom, Kings, Sanctuary, Salvation, Light) now have a full 60-minute duration, permanently eliminating the tedious 5-minute buffing tax from classic 2004."
      },
      {
        title: "Holy Strike Baseline",
        status: "verified",
        statusLabel: "Verified in Beta",
        badge: "Baseline Attack",
        desc: "Holy Strike is available as a baseline melee strike dealing 35% weapon damage plus additional Holy damage on an instant cast. Serves as the core active melee button across all three specializations."
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
    ]
  };
}
