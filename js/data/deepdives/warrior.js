/**
 * World of Warcraft: Forever - Warrior Class Deep Dive Dataset
 * Primary Source: Sodapoppin Level-38 Human Warrior Hands-On Early Access Demo & Closed Beta Forensics
 * Video URL: https://www.youtube.com/watch?v=NxlK8bDPSrw
 */

if (typeof window !== 'undefined' && window.WOW_FOREVER_DATA) {
  if (!window.WOW_FOREVER_DATA.classDeepDives) window.WOW_FOREVER_DATA.classDeepDives = {};
  window.WOW_FOREVER_DATA.classDeepDives.warrior = {
    id: "warrior",
    name: "Warrior",
    icon: "⚔️",
    color: "#C79C6E",
    role: "Tank / Melee DPS",
    specs: "Arms (Spearing Strike/Weaponmaster) • Fury (Raging Blows/Dual-Wield Scaling) • Protection (Defensive Charge/Shield Bash Silence)",
    hasData: true,
    videoTitle: "WoW Forever Warrior Class Deep Dive & Human Racials",
    videoUrl: "https://www.youtube.com/watch?v=NxlK8bDPSrw",
    sourceAttribution: "Sodapoppin Level-38 Human Warrior BlizzCon Early Access Demo & Closed Beta Forensics",
    summary: "WoW Forever preserves the iconic weight and stance-dancing rhythm of the Classic Warrior while delivering surgical quality-of-life upgrades: baseline Tactical Mastery (10 Rage retained) and Victory Rush, a consolidated Weaponmaster talent tree, the anti-mount Spearing Strike in Arms, massive dual-wield scaling with Raging Blows in Fury, and Defensive Stance Charge with Shield Bash silencing in Protection.",

    subTabs: [
      { id: "overview", label: "Full Dossier", icon: "📑" },
      { id: "core", label: "Core Rules & Baseline", icon: "📜" },
      { id: "arms", label: "Arms & Spearing Strike", icon: "🗡️" },
      { id: "fury", label: "Fury & Dual Wield", icon: "⚡" },
      { id: "protection", label: "Protection Tank & Shield", icon: "🛡️" },
      { id: "human", label: "Human Testing & Races", icon: "👑" },
      { id: "matrix", label: "Verification Matrix", icon: "🔬" }
    ],

    coreRules: [
      {
        title: "Baseline Tactical Mastery (10 Rage)",
        status: "verified",
        statusLabel: "Verified in Beta",
        badge: "Baseline Mechanic",
        desc: "Tactical Mastery is now baseline for all Warriors, retaining 10 Rage upon changing stances without requiring talent investment. Stance dancing is fluid from level 1."
      },
      {
        title: "Baseline Victory Rush",
        status: "verified",
        statusLabel: "Verified in Beta",
        badge: "Leveling Sustain",
        desc: "Victory Rush is baseline: deals instant physical damage and heals the Warrior for 10% of maximum health. Usable within 20 seconds of landing the killing blow on an experience or honor-yielding target."
      },
      {
        title: "3-Minute Shouts",
        status: "verified",
        statusLabel: "Verified in Beta",
        badge: "Major QoL",
        desc: "Battle Shout and Demoralizing Shout durations have been extended to a full 3 minutes (up from Classic's 2 minutes), drastically improving raid and dungeon uptime."
      },
      {
        title: "15-Minute Retaliation",
        status: "verified",
        statusLabel: "Verified in Beta",
        badge: "Cooldown Reduction",
        desc: "Retaliation's cooldown has been reduced from Classic's 30 minutes to 15 minutes, allowing more frequent use during dungeon pulls and elite encounters."
      },
      {
        title: "Shield Block (75% / 2 Charges)",
        status: "verified",
        statusLabel: "Verified in Beta",
        badge: "Active Mitigation",
        desc: "Increases shield block chance by 75% for 7 seconds, blocking up to 2 attacks. Provides deterministic defense against crushing blows when timed correctly."
      },
      {
        title: "Taunt & Mocking Blow Cooldowns",
        status: "verified",
        statusLabel: "Verified in Beta",
        badge: "Core Threat",
        desc: "Taunt operates on an 8-second cooldown in Defensive Stance. Mocking Blow serves as an emergency 6-second fixate on a 2-minute cooldown in Battle Stance."
      },
      {
        title: "Charge (15-Second Cooldown)",
        status: "verified",
        statusLabel: "Verified in Beta",
        badge: "Mobility Tool",
        desc: "Generates Rage and stuns an enemy for 1 second on a 15-second cooldown. Usable in Battle Stance (or Defensive Stance with Protection talents)."
      },
      {
        title: "Level 40 Recklessness Progression",
        status: "demo",
        statusLabel: "🎙️ Sodapoppin Demo Finding",
        badge: "Skill Progression",
        desc: "The level-38 character did not yet have Recklessness; the presenter confirmed it is trained at level 40 from class trainers alongside other major capstones."
      }
    ],

    arms: {
      title: "Arms: Spearing Strike, Unified Weaponmaster & Slam Flow",
      tagline: "Unleash devastating two-handed burst, dismount riders with Spearing Strike, and maintain smooth swing-timer Slam rotations",
      talents: [
        {
          name: "Spearing Strike (Anti-Mount Melee)",
          type: "New Arms Active Ability",
          cast: "Instant",
          cost: "15 Rage",
          cd: "20 sec Cooldown",
          status: "verified",
          desc: "A brutal melee attack dealing 40% weapon damage. Deals an additional 80% weapon damage against Giants, Dragonkin, and mounted targets, and forcibly dismounts mounted enemies in PvP!"
        },
        {
          name: "Weaponmaster (Unified Weapon Mastery)",
          type: "Consolidated Talent Keystone",
          cast: "Passive",
          status: "verified",
          desc: "Replaces separate Axe, Sword, and Mace specialization talents with a single adaptive talent. Maces and Staves grant 15% armor penetration, while Swords grant extra swing procs."
        },
        {
          name: "Rend Overpower Procs (Taste for Blood)",
          type: "Rotational Synergies",
          cast: "Passive Proc",
          duration: "6 sec Duration",
          status: "verified",
          desc: "Attacking a target afflicted by Rend gives melee attacks a 10% chance to activate Overpower on that target for 6 seconds, providing constant guaranteed crits."
        },
        {
          name: "Improved Slam (No Swing Reset)",
          type: "Rotational QoL Keystone",
          cast: "Passive",
          status: "verified",
          desc: "Reduces Slam's global cooldown and cast time by 0.5 seconds and prevents Slam from resetting the melee swing timer, enabling seamless weave rotations."
        },
        {
          name: "Mortal Strike",
          type: "Signature Arms Ability",
          cast: "Instant",
          cost: "30 Rage",
          cd: "6 sec Cooldown",
          status: "verified",
          desc: "A vicious strike that deals weapon damage plus bonus damage and wounds the target, reducing the effectiveness of any healing by 50% for 10 seconds."
        },
        {
          name: "Improved Tactical Mastery",
          type: "Stance Dance Keystone",
          cast: "Passive",
          status: "verified",
          desc: "Increases the amount of Rage retained when changing stances by up to 15, allowing up to 25 total Rage to carry over seamlessly across stance dances."
        },
        {
          name: "Improved Rend (+35% Damage)",
          type: "Damage Scaling",
          cast: "Passive",
          status: "verified",
          desc: "Increases the bleed damage dealt by Rend by 35%, making Rend an essential rotational bleeder that fuels Overpower procs."
        },
        {
          name: "Improved Hamstring",
          type: "Crowd Control Utility",
          cast: "Passive",
          status: "verified",
          desc: "Gives Hamstring a 5% chance to immobilize the target for 5 seconds, locking down slippery runners."
        }
      ]
    },

    fury: {
      title: "Fury: Raging Blows, Dual-Wield Scaling & Berserker Rage",
      tagline: "Whirlwind with both weapons, generate double off-hand rage, and break movement snares instantly with Berserker Rage",
      talents: [
        {
          name: "Raging Blows (Dual-Wield Whirlwind)",
          type: "Signature Fury Keystone",
          cast: "Passive",
          status: "verified",
          desc: "Causes Whirlwind to strike with both your main-hand and off-hand weapons simultaneously, and reduces the Rage cost of Cleave by 2 for explosive AoE scaling."
        },
        {
          name: "Dual Wield Specialization Overhaul",
          type: "Dual Wield Scaling",
          cast: "Passive",
          status: "verified",
          desc: "Increases off-hand weapon damage by 25%, off-hand Rage generation by 100%, and off-hand hit chance by 10%, resolving Classic's off-hand penalty."
        },
        {
          name: "Berserker Rage (10 Rage + Snare Removal)",
          type: "Active Mobility & CC Break",
          cast: "Instant",
          cd: "30 sec Cooldown",
          status: "verified",
          desc: "The Warrior enters a berserker rage, instantly generating up to 10 Rage, removing all movement-impairing effects, and granting immunity to Fear and Incapacitate for 10 seconds on a 30s cooldown!"
        },
        {
          name: "Bloodthirst & 10% Movement Speed",
          type: "Signature Fury Ability",
          cast: "Instant",
          cost: "30 Rage",
          cd: "6 sec Cooldown",
          status: "verified",
          desc: "Instantly attacks the target for 35% of Attack Power plus base damage, grants +10% movement speed, and triggers Blood Craze healing."
        },
        {
          name: "Blood Craze (Self-Healing)",
          type: "Sustain Passive",
          cast: "Passive",
          duration: "6 sec Duration",
          status: "verified",
          desc: "Restores 1% of maximum health over 6 seconds after being critically struck or after casting Bloodthirst, providing continuous in-combat recovery."
        },
        {
          name: "Enrage / Reactive Damage Steroid",
          type: "Damage Multiplier",
          cast: "Passive Proc",
          duration: "12 sec Duration",
          status: "verified",
          desc: "Taking any damaging hit has a 30% chance to grant 10% increased physical damage dealt for 12 seconds."
        },
        {
          name: "Fury Rage Amplification (+10 Max Rage)",
          type: "Resource Keystone",
          cast: "Passive",
          status: "verified",
          desc: "Increases maximum Rage by 10 and gives a 12% chance to generate 1 extra Rage on melee hits (increased to 2 Rage when wielding a two-handed weapon)."
        },
        {
          name: "Improved Cleave (Rage Reduction)",
          type: "AoE Efficiency",
          cast: "Passive",
          status: "verified",
          desc: "Directly reduces Cleave's Rage cost instead of just increasing damage, allowing frequent multi-target cleaving."
        }
      ]
    },

    protection: {
      title: "Protection: Defensive Charge, Shield Bash Silence & 9.5m Shield Wall",
      tagline: "The premier vanguard tank with Defensive Stance Charge, dodge/parry Rage generation, and silencing Shield Bashes",
      talents: [
        {
          name: "Charge in Defensive Stance",
          type: "Tank Mobility Keystone",
          cast: "Passive Talent",
          status: "verified",
          desc: "Enables Charge to be used while in Defensive Stance, removing the need to stance dance into Battle Stance before pulling trash packs and raid bosses."
        },
        {
          name: "Shield Avoidance Rage Generation",
          type: "Resource Sustain Keystone",
          cast: "Passive",
          status: "verified",
          desc: "While a shield is equipped, grants up to a 100% chance to generate Rage whenever you successfully dodge or parry an attack, solving tank Rage starvation."
        },
        {
          name: "Shield Bash Silence",
          type: "Caster Lockdown Utility",
          cast: "Talent Enhancement",
          status: "verified",
          desc: "Causes Shield Bash to inflict a true Silence effect on the target rather than merely an interrupt, locking out spellcasting even if the target wasn't actively channeling."
        },
        {
          name: "Improved Shield Wall (9.5m Cooldown)",
          type: "Major Defensive Cooldown",
          cast: "Instant",
          cd: "9.5 min Cooldown",
          duration: "10 sec Duration",
          status: "verified",
          desc: "Reduces Shield Wall's baseline 15-minute cooldown by 5.5 minutes down to ~9.5 minutes, providing 75% damage reduction for 10 seconds."
        },
        {
          name: "Concussion Blow (5s Stun)",
          type: "Single-Target Lockdown",
          cast: "Instant",
          cost: "15 Rage",
          cd: "45 sec Cooldown",
          duration: "5 sec Stun",
          status: "verified",
          desc: "Stuns the target for 5 seconds on a 45-second cooldown, providing reliable lockouts and crowd control during difficult dungeon pulls."
        },
        {
          name: "Shield Slam (Block Value & Dispel)",
          type: "Signature Tank Attack",
          cast: "Instant",
          cost: "20 Rage",
          cd: "6 sec Cooldown",
          status: "verified",
          desc: "Slams the target with your shield, dealing damage based on Shield Block Value, generating high threat, and dispelling 1 beneficial magic effect."
        },
        {
          name: "One-Handed & Shield Mastery",
          type: "Damage & Threat Scaling",
          cast: "Passive",
          status: "verified",
          desc: "Increases all damage dealt by 10% while a shield is equipped and significantly improves Revenge damage."
        },
        {
          name: "Protection Stat & Rage Baseline",
          type: "Passive Cluster",
          cast: "Passive",
          status: "verified",
          desc: "Grants 10% additional Stamina and Strength, plus a flat 3-Rage cost reduction across all offensive abilities."
        }
      ]
    },

    racialSynergies: {
      humanDemo: {
        title: "Sodapoppin's Human Warrior Hands-On Demo Findings",
        subtitle: "Forensic testing of updated Human racials on a Warrior in the BlizzCon 2026 early access demo",
        items: [
          {
            name: "Will to Survive (Stun Removal)",
            status: "verified",
            statusLabel: "Verified in Beta",
            desc: "Instantly removes all stun effects on a 3-minute cooldown. Essential PvP anti-CC tool allowing Warriors to break free without PvP trinkets."
          },
          {
            name: "Sword Specialization (+2% Crit)",
            status: "verified",
            statusLabel: "Verified in Beta",
            desc: "Grants 2% critical-strike chance to all attacks and spells while wielding a one-handed or two-handed sword, maximizing Flurry and Deep Wounds procs."
          },
          {
            name: "Perception (Stealth Detection)",
            status: "verified",
            statusLabel: "Verified in Beta",
            desc: "Greatly increases stealth detection for 20 seconds on a 3-minute cooldown. Invaluable against enemy Rogues and Druids opening in PvP."
          },
          {
            name: "The Human Spirit (+5% Spirit)",
            status: "verified",
            statusLabel: "Verified in Beta",
            desc: "Increases total Spirit by 5%, boosting out-of-combat health regeneration between leveling pulls."
          }
        ]
      },
      newRaces: [
        {
          race: "Human Warrior",
          faction: "Alliance",
          badge: "Classic Vanguard",
          desc: "Frontline champions of the Grand Alliance combining Sword Specialization (+2% crit) and Will to Survive stun breaks."
        },
        {
          race: "Orc Warrior",
          faction: "Horde",
          badge: "Berserker Juggernaut",
          desc: "Horde warlords utilizing Blood Fury (+10% AP, no healing penalty in Forever), Axe Specialization (+1% crit), and Hardiness (-20% stun duration)."
        },
        {
          race: "Tauren Warrior",
          faction: "Horde",
          badge: "Colossal Wall",
          desc: "Endurance (+5% base HP), War Stomp (2s AoE stun up to 5 targets), and Plains Running mobility."
        },
        {
          race: "Dwarf Warrior",
          faction: "Alliance",
          badge: "Mountain Defender",
          desc: "Stoneform (bleed/poison/disease immunity + 10% physical reduction) and Mace Specialization (+1% crit to all spells and attacks)."
        }
      ]
    },

    forensicMatrix: [
      {
        feature: "Baseline Tactical Mastery",
        category: "Core Mechanics",
        details: "Retains 10 Rage baseline across stance changes; no talent points required",
        status: "Verified in Closed Beta",
        statusType: "verified",
        source: "Sodapoppin Hands-On Demo & Tooltip"
      },
      {
        feature: "Baseline Victory Rush",
        category: "Core Mechanics",
        details: "Instant strike heals 10% max HP within 20s of killing blow",
        status: "Verified in Closed Beta",
        statusType: "verified",
        source: "Sodapoppin Hands-On Demo"
      },
      {
        feature: "Spearing Strike (Anti-Mount)",
        category: "Arms",
        details: "15 Rage, 20s CD; 40% wpn dmg, +80% vs Giants/Dragonkin/Mounted; dismounts riders",
        status: "Verified in Closed Beta",
        statusType: "verified",
        source: "Sodapoppin Hands-On Demo & Arms Tree"
      },
      {
        feature: "Unified Weaponmaster",
        category: "Arms",
        details: "Single talent replaces separate weapon specs; Maces/Staves grant 15% ArP",
        status: "Verified in Closed Beta",
        statusType: "verified",
        source: "Sodapoppin Hands-On Demo"
      },
      {
        feature: "Rend Overpower (Taste for Blood)",
        category: "Arms",
        details: "Attacks on Rend target give 10% chance to trigger Overpower for 6s",
        status: "Verified in Closed Beta",
        statusType: "verified",
        source: "Sodapoppin Hands-On Demo"
      },
      {
        feature: "Improved Slam (No Swing Reset)",
        category: "Arms",
        details: "-0.5s cast/GCD and does NOT reset weapon swing timer",
        status: "Verified in Closed Beta",
        statusType: "verified",
        source: "Sodapoppin Hands-On Demo"
      },
      {
        feature: "Raging Blows (Dual Whirlwind)",
        category: "Fury",
        details: "Whirlwind strikes with main and off-hand; reduces Cleave cost by 2 Rage",
        status: "Verified in Closed Beta",
        statusType: "verified",
        source: "Sodapoppin Hands-On Demo"
      },
      {
        feature: "Dual Wield Overhaul",
        category: "Fury",
        details: "+25% offhand damage, +100% offhand rage generation, +10% offhand hit",
        status: "Verified in Closed Beta",
        statusType: "verified",
        source: "Sodapoppin Hands-On Demo"
      },
      {
        feature: "Berserker Rage Snare Removal",
        category: "Fury",
        details: "Generates 10 Rage, removes movement impairing effects; 30s cooldown",
        status: "Verified in Closed Beta",
        statusType: "verified",
        source: "Sodapoppin Hands-On Demo"
      },
      {
        feature: "Bloodthirst Movement Speed",
        category: "Fury",
        details: "Deals 35% AP + base damage, grants +10% movement speed, triggers Blood Craze",
        status: "Verified in Closed Beta",
        statusType: "verified",
        source: "Sodapoppin Hands-On Demo"
      },
      {
        feature: "Charge in Defensive Stance",
        category: "Protection",
        details: "Allows Charge to be cast from Defensive Stance via Protection talent",
        status: "Verified in Closed Beta",
        statusType: "verified",
        source: "Sodapoppin Hands-On Demo"
      },
      {
        feature: "Shield Avoidance Rage",
        category: "Protection",
        details: "Up to 100% chance to generate Rage on dodge/parry with shield equipped",
        status: "Verified in Closed Beta",
        statusType: "verified",
        source: "Sodapoppin Hands-On Demo"
      },
      {
        feature: "Shield Bash Silence",
        category: "Protection",
        details: "Shield Bash inflicts true silence rather than interrupt only",
        status: "Verified in Closed Beta",
        statusType: "verified",
        source: "Sodapoppin Hands-On Demo"
      },
      {
        feature: "Improved Shield Wall (9.5m CD)",
        category: "Protection",
        details: "15m baseline cooldown reduced by 5.5m to ~9.5 minutes via talent",
        status: "Verified in Closed Beta",
        statusType: "verified",
        source: "Sodapoppin Hands-On Demo"
      },
      {
        feature: "3-Minute Shouts",
        category: "Core Mechanics",
        details: "Battle Shout and Demoralizing Shout extended to 3 minutes",
        status: "Verified in Closed Beta",
        statusType: "verified",
        source: "Sodapoppin Hands-On Demo"
      },
      {
        feature: "15-Minute Retaliation",
        category: "Core Mechanics",
        details: "Cooldown reduced from 30 minutes to 15 minutes",
        status: "Verified in Closed Beta",
        statusType: "verified",
        source: "Sodapoppin Hands-On Demo"
      },
      {
        feature: "Human Will to Survive",
        category: "Human Racials",
        details: "Instantly removes stun effects on a 3-minute cooldown",
        status: "Verified in Closed Beta",
        statusType: "verified",
        source: "Sodapoppin Hands-On Demo"
      },
      {
        feature: "Rage Generation Formula",
        category: "Unconfirmed",
        details: "Underlying Rage generation formula changes remain unverified in level-38 build",
        status: "🎙️ Open Balance Question",
        statusType: "demo",
        source: "Sodapoppin Commentary"
      }
    ]
  };
}
