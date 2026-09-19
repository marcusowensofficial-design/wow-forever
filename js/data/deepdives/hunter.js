/**
 * World of Warcraft: Forever - Hunter Class Deep Dive Dataset
 * Primary Source: Sodapoppin BlizzCon 2026 Hands-On Early Access Demo & Closed Beta Forensics
 */

if (typeof window !== 'undefined' && window.WOW_FOREVER_DATA) {
  if (!window.WOW_FOREVER_DATA.classDeepDives) window.WOW_FOREVER_DATA.classDeepDives = {};
  window.WOW_FOREVER_DATA.classDeepDives.hunter = {
  "id": "hunter",
  "name": "Hunter",
  "icon": "🏹",
  "color": "#ABD473",
  "role": "Ranged / Melee DPS",
  "specs": "Survival (Melee/Traps) • Marksmanship (Ranged/Lone Wolf) • Beast Mastery (Pets/Hawks)",
  "hasData": true,
  "videoTitle": "Hunter Gets Some Big Changes in WoW Forever",
  "videoUrl": "https://www.youtube.com/watch?v=9RdIJQQpggM&t=449s",
  "sourceAttribution": "Sodapoppin Hands-On BlizzCon Early Access Demo & Closed Beta Forensics",
  "summary": "WoW Forever delivers an unprecedented overhaul to the Hunter class: full viability for a dedicated Melee Survival spec (featuring Strider Kick, Mongoose Bite bleeds, and dual-wielding), in-combat Freezing Trap placement without Feign Death, a true Lone Wolf archetype in Marksmanship, and multi-pet command in Beast Mastery with Summon Hawk.",
  "coreRules": [
    {
      "title": "In-Combat Freezing Trap",
      "status": "verified",
      "statusLabel": "Verified in Beta",
      "badge": "Major QoL",
      "desc": "Hunters can now drop Freezing Trap directly while in combat. The cumbersome macro requirement of Feign Death -> Drop Combat -> Place Trap is completely eliminated, dramatically smoothing PvP and dungeon crowd control."
    },
    {
      "title": "8-Yard Dead Zone Retained",
      "status": "verified",
      "statusLabel": "Verified in Beta",
      "badge": "Classic Pillar",
      "desc": "The classic 8-yard dead zone (where neither ranged shots nor melee attacks can occur without adjusting distance) is retained to preserve classic spacing tactics and PvP counterplay."
    },
    {
      "title": "Disengage as Threat Reduction",
      "status": "verified",
      "statusLabel": "Verified in Beta",
      "badge": "Classic Mechanic",
      "desc": "Disengage remains a melee threat-reduction tool rather than modern retail's backward acrobatics leap. Hunters must manage positioning rather than relying on an instant escape button."
    },
    {
      "title": "Ammunition & Quivers Still Required",
      "status": "verified",
      "statusLabel": "Verified in Beta",
      "badge": "Authenticity",
      "desc": "Physical ammunition (arrows and bullets) and quivers/ammo pouches remain in full effect. Heavy quivers and arrow counts were clearly visible in the inventory during the demo, retaining Hunter RPG flavor."
    },
    {
      "title": "Single Active Trap Limit & Shared Cooldowns",
      "status": "verified",
      "statusLabel": "Verified in Beta",
      "badge": "Balance Rule",
      "desc": "Only one trap can be active at any given time. Additionally, Fire traps (Immolation, Explosive) and Frost traps (Freezing, Frost) share cooldown categories, requiring strategic trap selection."
    },
    {
      "title": "Direct Pet Movement Command",
      "status": "verified",
      "statusLabel": "Verified in Beta",
      "badge": "Micro Control",
      "desc": "Hunters can directly command pets to move to a designated target location on the ground, allowing precise pre-pull placement, line-of-sight baiting, and trap routing."
    },
    {
      "title": "Dedicated Reagent Bag Slot",
      "status": "verified",
      "statusLabel": "Verified in Beta",
      "badge": "Inventory QoL",
      "desc": "An additional dedicated reagent bag slot is visible in the character inventory, freeing up general container space for adventuring gear and ammunition."
    },
    {
      "title": "Aimed Shot Baseline in WoW Forever",
      "status": "exclusive",
      "statusLabel": "✦ Forever Exclusive",
      "badge": "Baseline Rework",
      "desc": "Aimed Shot is granted as a baseline hunter ability rather than locking up talent points, while the Marksmanship tree provides deep damage multipliers and cast enhancements."
    }
  ],
  "survival": {
    "title": "Survival: The Melee & Trap Vanguard",
    "tagline": "A fully realized melee brawler specializing in traps, parry counter-attacks, bleeds, and dual-wielding",
    "talents": [
      {
        "name": "Strider Kick",
        "type": "New Melee Active Ability",
        "cast": "Instant",
        "cd": "8 sec Cooldown",
        "cost": "Low Mana",
        "status": "verified",
        "desc": "A brand new rotational melee strike dealing 100% weapon damage on an 8-second cooldown. Fills a major gap in the Melee Hunter's active button rotation."
      },
      {
        "name": "Mongoose Bite Bleed",
        "type": "Talent Enhancement",
        "cast": "Passive",
        "status": "verified",
        "desc": "Adds a 21-second bleed effect equal to 40% of the Mongoose Bite damage dealt. Transforms Mongoose Bite from a simple reactive hit into a devastating sustained damage bleed."
      },
      {
        "name": "Counterattack",
        "type": "Reactive Melee Strike",
        "cast": "Instant",
        "cd": "5 sec Cooldown",
        "status": "verified",
        "desc": "Becomes available immediately after parrying a melee attack. Deals full weapon damage and immobilizes the target for 5 seconds."
      },
      {
        "name": "Deflection",
        "type": "Defensive Passive",
        "cast": "Passive (5 Ranks)",
        "status": "verified",
        "desc": "Increases your Parry chance by up to 10% (2% per rank). Core foundation for unlocking Counterattack and Mongoose Bite triggers."
      },
      {
        "name": "Deterrence",
        "type": "Defensive Cooldown",
        "cast": "Instant",
        "cd": "5 min Cooldown",
        "duration": "10 sec Duration",
        "status": "verified",
        "desc": "When activated, increases your Dodge and Parry chance by 25% for 10 seconds. Essential emergency survival button against melee burst."
      },
      {
        "name": "Wing Clip Immobilize",
        "type": "Utility Talent",
        "cast": "Passive",
        "status": "verified",
        "desc": "Gives your Wing Clip ability a 7% chance to completely immobilize the target for 5 seconds."
      },
      {
        "name": "Trap Specialization",
        "type": "Talent",
        "cast": "Passive",
        "status": "verified",
        "desc": "Increases the duration of Freezing and Frost Traps by 30%, and increases the damage dealt by Immolation and Explosive Traps by 15%."
      },
      {
        "name": "Melee Critical & Off-Hand Mastery",
        "type": "Talent",
        "cast": "Passive",
        "status": "verified",
        "desc": "Increases melee critical-strike damage by 30% and increases off-hand weapon damage by 50%. Cementing dual-wielding Melee Hunter as a high-DPS build."
      },
      {
        "name": "Survival Resource Conservation",
        "type": "Mana Sustain Talent",
        "cast": "Passive",
        "status": "verified",
        "desc": "Reduces trap and melee ability mana costs by up to 60%, and gives critical strikes a 6% chance to maintain 100% mana regeneration while casting."
      }
    ]
  },
  "marksmanship": {
    "title": "Marksmanship: Precision Sniper & Lone Wolf",
    "tagline": "Devastating ranged burst from maximum distance, featuring pet-free Lone Wolf playstyles and high-impact shots",
    "talents": [
      {
        "name": "Lone Wolf",
        "type": "Playstyle Keystone",
        "cast": "Passive",
        "status": "verified",
        "desc": "Increases all attack damage by 20% whenever the Hunter has no active pet. Enables a dedicated pet-free sniper fantasy without losing combat throughput."
      },
      {
        "name": "Sniper Shot",
        "type": "Capstone Ranged Shot",
        "cast": "4.0 sec Cast",
        "cd": "15 sec Cooldown",
        "range": "35–41 Yards",
        "status": "verified",
        "desc": "A devastating high-caliber shot described in the demo as a massive Aimed Shot-style burst ability. Punishing 4-second cast time rewarded with catastrophic damage."
      },
      {
        "name": "Scatter Shot",
        "type": "Ranged Disorient",
        "cast": "Instant",
        "cd": "30 sec Cooldown",
        "range": "15 Yards",
        "duration": "4 sec Disorient",
        "status": "verified",
        "desc": "Short-range shot that deals 50% weapon damage and disorients the target for 4 seconds. Any damage taken breaks the effect."
      },
      {
        "name": "Sting Enhancements",
        "type": "Talent Cluster",
        "cast": "Passive",
        "status": "verified",
        "desc": "Provides direct damage increases to Serpent Sting, reduces the cooldown of Viper Sting (mana drain), and extends the duration of Scorpid Sting (strength/agility debuff)."
      },
      {
        "name": "Marksmanship Mana Sustain",
        "type": "Regeneration Talent",
        "cast": "Passive",
        "status": "verified",
        "desc": "Grants 25% mana regeneration after Serpent Sting hits a target, and 50% mana regeneration after consuming the Rapid Killing buff."
      },
      {
        "name": "Aimed Shot & Multi-Shot Damage Scaling",
        "type": "Talent",
        "cast": "Passive",
        "status": "verified",
        "desc": "Substantial direct damage multipliers for both Aimed Shot (single-target burst) and Multi-Shot (cleave and AoE)."
      }
    ]
  },
  "beastMastery": {
    "title": "Beast Mastery: Beast Commander",
    "tagline": "Unleash untamed wildlife, dual hawks, enraged predators, and lethal haste procs",
    "talents": [
      {
        "name": "Summon Hawk",
        "type": "Active Companion Spell",
        "cast": "Instant",
        "duration": "18 sec Duration",
        "cd": "Shares Cooldown with Arcane Shot",
        "status": "verified",
        "desc": "Calls down a loyal hawk to relentlessly attack your current target for 18 seconds. Up to two hawks can be active simultaneously, sharing a cooldown with Arcane Shot."
      },
      {
        "name": "Aspect of the Hawk Haste Proc",
        "type": "Aspect Enhancement",
        "cast": "Passive Proc",
        "status": "verified",
        "desc": "While Aspect of the Hawk is active, normal ranged auto-attacks have a chance to trigger 30% increased ranged attack speed for a short duration."
      },
      {
        "name": "Aspect of the Beast Melee Haste Proc",
        "type": "Aspect Enhancement",
        "cast": "Passive Proc",
        "status": "verified",
        "desc": "While Aspect of the Beast is active, melee auto-attacks have a chance to trigger increased melee attack speed, harmonizing with Melee Hunter builds."
      },
      {
        "name": "Bestial Wrath / Pet Enrage",
        "type": "Signature Cooldown",
        "cast": "Instant",
        "cd": "2 min Cooldown",
        "duration": "18 sec Duration",
        "status": "verified",
        "desc": "Sends the pet into a berserk rage, granting 50% additional damage and making the pet completely immune to all crowd control effects unless it is killed."
      },
      {
        "name": "Intimidation Crit Synergy",
        "type": "Control Cooldown",
        "cast": "Instant",
        "cd": "1 min Cooldown",
        "status": "verified",
        "desc": "Commands the pet to intimidate the target on its next attack, stunning it for 3 seconds while also granting a 100% critical-strike chance effect."
      },
      {
        "name": "Pet Disarm",
        "type": "Pet Utility Ability",
        "cast": "Instant",
        "status": "verified",
        "desc": "Specialized pet command/talent that physically disarms an enemy combatant by snatching their weapon for several seconds."
      },
      {
        "name": "Trap Entrapment",
        "type": "Talent",
        "cast": "Passive",
        "status": "verified",
        "desc": "When a trap triggers, affected enemies are rooted in place for 5 seconds, providing supreme kiting distance."
      },
      {
        "name": "Pack Bond",
        "type": "Talent",
        "cast": "Passive",
        "status": "verified",
        "desc": "Increases all Hunter damage by 1% while a pet is actively summoned and by your side."
      }
    ]
  },
  "meleeToolkit": [
    {
      "name": "Aspect of the Beast",
      "status": "verified",
      "desc": "Makes the Hunter untrackable on the minimap and adds a flat +50 melee attack power bonus, serving as the default stance for melee combat."
    },
    {
      "name": "Raptor Strike",
      "status": "verified",
      "desc": "Operates on a 6-second cooldown (queue-on-next-melee), delivering strong physical damage with your main-hand weapon."
    },
    {
      "name": "Mend Pet",
      "status": "verified",
      "desc": "Requires channeling and heals the pet for a fixed amount per tick rather than modern percentage-based scaling."
    }
  ],
  "racialSynergies": {
    "taurenDemo": {
      "title": "Sodapoppin's Tauren Hands-On Demo Findings",
      "subtitle": "Forensic testing of Tauren racials in the BlizzCon 2026 early access demo",
      "items": [
        {
          "name": "Plains Running Ramp & Mechanics",
          "status": "demo",
          "statusLabel": "🎙️ Sodapoppin Demo Finding",
          "desc": "Plains Running builds 1% bonus movement speed every 5 seconds while continually moving, capping at 30% speed. In Sodapoppin's hands-on test, it took roughly 2 minutes and 30 seconds to reach the full 30% bonus. Standing still or taking damage rapidly strips all stacks."
        },
        {
          "name": "Plains Running vs. Aspect of the Cheetah",
          "status": "demo",
          "statusLabel": "🎙️ Sodapoppin Demo Finding",
          "desc": "The test confirmed Plains Running does NOT stack with Aspect of the Cheetah. Displayed movement speed remained strictly capped at the expected 30% maximum increase."
        },
        {
          "name": "Anti-Exploit: Wall Running",
          "status": "demo",
          "statusLabel": "🎙️ Sodapoppin Demo Finding",
          "desc": "Autorunning into a wall or collision boundary did not generate Plains Running stacks. The game verifies actual displacement."
        },
        {
          "name": "War Stomp",
          "status": "verified",
          "statusLabel": "Verified in Beta",
          "desc": "Instant AoE stun that affects up to 5 enemies for 2 seconds with an 8-yard radius and a 2-minute cooldown."
        },
        {
          "name": "Tauren Endurance",
          "status": "verified",
          "statusLabel": "Verified in Beta",
          "desc": "Grants +5% total Health and +1% Hit chance across all attacks."
        },
        {
          "name": "Tauren Cultivation",
          "status": "verified",
          "statusLabel": "Verified in Beta",
          "desc": "Can create a duplicate harvest from a nearby herb node once per herb. Notably, the duplicate can be gathered even without having the Herbalism profession!"
        }
      ]
    },
    "newRaces": [
      {
        "race": "Human Hunter",
        "faction": "Alliance",
        "badge": "✦ New in Forever",
        "desc": "Royal gamekeepers and marksmen of Elwynn Forest and Westfall. Gains Perception (stealth detection), The Human Spirit (+5% Spirit for mana regen), Sword/Mace Specialization, and Diplomacy (+10% reputation)."
      },
      {
        "race": "The Skyborne Hunter",
        "faction": "Both Factions",
        "badge": "✦ New Playable Race",
        "desc": "Wind-guided archers and cloud-falcon tamers from Zephras Isle. Gains Walk on Air (glide), Skysight (+10% run speed), Wind Blessed (+1% Haste across melee/ranged/spells), and Elemental Insight (+5% damage to Elementals)."
      }
    ]
  },
  "forensicMatrix": [
    {
      "feature": "In-Combat Freezing Trap",
      "category": "Core Mechanics",
      "details": "Can drop Freezing Trap while in combat; no Feign Death required",
      "status": "Verified in Closed Beta",
      "statusType": "verified",
      "source": "Sodapoppin Demo & Beta Build 1.15.8"
    },
    {
      "feature": "8-Yard Dead Zone",
      "category": "Core Mechanics",
      "details": "Dead zone retained between 5 and 8 yards",
      "status": "Verified in Closed Beta",
      "statusType": "verified",
      "source": "Sodapoppin Hands-On Demo"
    },
    {
      "feature": "Strider Kick",
      "category": "Survival (Melee)",
      "details": "Instant melee attack, 100% weapon damage, 8s cooldown",
      "status": "Verified in Closed Beta",
      "statusType": "verified",
      "source": "Sodapoppin Demo & Talent Tree Datamining"
    },
    {
      "feature": "Mongoose Bite Bleed",
      "category": "Survival (Melee)",
      "details": "21-second bleed equal to 40% of Mongoose Bite damage",
      "status": "Verified in Closed Beta",
      "statusType": "verified",
      "source": "Sodapoppin Hands-On Demo"
    },
    {
      "feature": "Melee Dual-Wield / Crit",
      "category": "Survival (Melee)",
      "details": "+30% melee crit damage, +50% off-hand weapon damage",
      "status": "Verified in Closed Beta",
      "statusType": "verified",
      "source": "Sodapoppin Hands-On Demo"
    },
    {
      "feature": "Lone Wolf",
      "category": "Marksmanship",
      "details": "+20% all attack damage when no active pet is summoned",
      "status": "Verified in Closed Beta",
      "statusType": "verified",
      "source": "Sodapoppin Demo & Icy-Veins Talent Calculator"
    },
    {
      "feature": "Sniper Shot",
      "category": "Marksmanship",
      "details": "4.0s cast, 15s cooldown high-impact burst shot",
      "status": "Verified in Closed Beta",
      "statusType": "verified",
      "source": "Sodapoppin Hands-On Demo"
    },
    {
      "feature": "Summon Hawk",
      "category": "Beast Mastery",
      "details": "Summons hawk for 18s (max 2), shares cooldown with Arcane Shot",
      "status": "Verified in Closed Beta",
      "statusType": "verified",
      "source": "Sodapoppin Hands-On Demo"
    },
    {
      "feature": "Plains Running Ramp",
      "category": "Tauren Racials",
      "details": "1% speed every 5s to 30%; ~2.5 min ramp; resets on stop/dmg",
      "status": "🎙️ Sodapoppin Demo Finding",
      "statusType": "demo",
      "source": "Sodapoppin Live In-Game Stopwatch Test"
    },
    {
      "feature": "Plains Running + Cheetah",
      "category": "Tauren Racials",
      "details": "Does not stack with Aspect of the Cheetah (capped at 30%)",
      "status": "🎙️ Sodapoppin Demo Finding",
      "statusType": "demo",
      "source": "Sodapoppin Live In-Game Speed Test"
    },
    {
      "feature": "Tauren Herb Duplication",
      "category": "Tauren Racials",
      "details": "Duplicate harvest from herb once per node; gatherable without Herbalism",
      "status": "🎙️ Sodapoppin Demo Finding",
      "statusType": "demo",
      "source": "Sodapoppin Hands-On Demo"
    },
    {
      "feature": "Aimed Shot Baseline",
      "category": "WoW Forever Rework",
      "details": "Aimed Shot is baseline for all Hunters in WoW Forever",
      "status": "✦ WoW Forever Exclusive",
      "statusType": "exclusive",
      "source": "Blizzard Systems Dispatch & Beta Build"
    },
    {
      "feature": "Dedicated Reagent Bag",
      "category": "Inventory Systems",
      "details": "Extra 6th bag slot purely for reagents and tradeskill items",
      "status": "Verified in Closed Beta",
      "statusType": "verified",
      "source": "Sodapoppin Demo & Blizzard QoL Notes"
    }
  ],
  "subTabs": [
    {
      "id": "overview",
      "label": "Full Dossier",
      "icon": "📑"
    },
    {
      "id": "core",
      "label": "Core Rules & QoL",
      "icon": "📜"
    },
    {
      "id": "survival",
      "label": "Survival Melee",
      "icon": "⚔️"
    },
    {
      "id": "marksmanship",
      "label": "Marksmanship Sniper",
      "icon": "🏹"
    },
    {
      "id": "beastmastery",
      "label": "Beast Mastery",
      "icon": "🐾"
    },
    {
      "id": "tauren",
      "label": "Tauren Testing & Races",
      "icon": "🐂"
    },
    {
      "id": "matrix",
      "label": "Verification Matrix",
      "icon": "🔬"
    }
  ]
};
}
