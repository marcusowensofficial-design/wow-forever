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
  "coreRules": [
    {
      "title": "Pet Ability Retention Fixed",
      "status": "verified",
      "statusLabel": "Phase 2 Beta Update (Oct 2026)",
      "badge": "Pet Mechanics Fix",
      "desc": "Resolved the critical bug where tamed pets spontaneously forgot trained abilities (Bite, Claw, Dash, Growl) upon zoning into instanced dungeons or being dismissed."
    },
    {
      "title": "Aggressive Pet Stance Restored",
      "status": "verified",
      "statusLabel": "Phase 2 Beta Update (Oct 2026)",
      "badge": "Pet UI Restoration",
      "desc": "Aggressive Stance has been officially restored to the Hunter pet action bar and spellbook, giving pet commanders full tactical autonomy in outdoor combat."
    },
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
    },
    {
      "title": "Native Cooldown Manager: Hunter Essentials",
      "status": "verified",
      "statusLabel": "Verified in Beta (Oct 8)",
      "badge": "Native UI & Edit Mode",
      "desc": "Expanded in Beta Build 1.60.6.71890 directly in default HUD Edit Mode. Rotational Spells Tracked: Aimed Shot (6s), Arcane Shot (6s), Multi-Shot (10s), Strider Kick (8s melee strike), Mongoose Bite (5s dodge proc), and Concussive Shot (12s). Major Defensives & Bursts: Bestial Wrath (2m), Rapid Fire (3m), Deterrence (5m), Feign Death (30s), Intimidation (1m), Scatter Shot (30s), and shared Trap cooldowns (30s). Active Procs & Buffs: Lock and Load procs, Pet Frenzy stacks (1–5), Improved Aspect of the Hawk haste buff, and Aspect state monitoring."
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
      "id": "betaBuilds",
      "label": "Level 20 & 30 Builds",
      "icon": "⚡"
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
  ],
  "betaBuilds": {
    "season": "Closed Beta Phase 2",
    "levelCap": 30,
    "talentPointsTotal": 21,
    "legacyPointsNotice": "Legacy Milestones allow up to +5 additional points at Level 30 (26 total points).",
    "level20": {
      "levelCap": 20,
      "talentPointsTotal": 11,
      "legacyPointsNotice": "Legacy Milestones allow up to +2 to +5 additional points at Level 20.",
      "specs": [
        {
          "specId": "survival",
          "name": "Survival (Melee Vanguard)",
          "icon": "⚔️",
          "role": "Melee DPS & Trapper",
          "wowheadCalcUrl": "https://www.wowhead.com/forever/talent-calc/hunter/--500501",
          "tagline": "High-sustain melee brawler exploiting Strider Kick, Mongoose Bite bleed stacking, and in-combat traps.",
          "statPriority": "Agility > Melee Attack Power > Stamina > Hit",
          "bestWeapon": "Two-Handed Axe/Mace or Dual-Wield (Smite's Mighty Hammer / Cruel Barb)",
          "talents": [
            { "name": "Monster Slaying", "points": "3/3", "tree": "Survival (Tier 1)", "desc": "Increases all damage taken by and critical strike chance against Beasts by 3%." },
            { "name": "Humanoid Slaying", "points": "2/2", "tree": "Survival (Tier 1)", "desc": "Increases all damage taken by and critical strike chance against Humanoids by 3%." },
            { "name": "Savage Strikes", "points": "5/5", "tree": "Survival (Tier 2)", "desc": "Increases critical strike chance of Raptor Strike and Mongoose Bite by 20%." },
            { "name": "Deflection", "points": "1/5", "tree": "Survival (Tier 2)", "desc": "Increases parry chance by 1%, setting up Mongoose Bite and Counterattack procs." }
          ],
          "legacyNotes": "Use Legacy Discovery bonus points to max 5/5 Deflection and unlock Counterattack (5-sec root & physical burst).",
          "rotation": [
            { "label": "Opener", "desc": "Drop Freezing Trap in-combat directly beneath target -> Wing Clip to establish melee supremacy." },
            { "label": "Core Melee Loop", "desc": "Raptor Strike on cooldown -> Strider Kick (instant 100% weapon dmg) -> Mongoose Bite immediately on parry." },
            { "label": "Bleed Upkeep", "desc": "Mongoose Bite applies a 21-second bleed equal to 40% damage dealt; maintain bleed on elites." },
            { "label": "AoE Engagements", "desc": "Explosive Trap into Immolation Trap weave while cleaving with Carve/Raptor." }
          ],
          "bisGear": [
            { "slot": "Two-Hand Weapon", "item": "Smite's Mighty Hammer", "source": "Deadmines (Mr. Smite)", "stats": "+11 Strength, 19.8 DPS" },
            { "slot": "Main Hand (Dual-Wield)", "item": "Cruel Barb", "source": "Deadmines (Edwin VanCleef)", "stats": "+12 Attack Power, 18.2 DPS" },
            { "slot": "Off Hand", "item": "Wingblade", "source": "Wailing Caverns (Leaders Quest)", "stats": "+5 Agi, +2 Sta, 14.1 DPS" },
            { "slot": "Chest", "item": "Mutant Scale Breastplate", "source": "Wailing Caverns (Deviate Faerie)", "stats": "+9 Agility, +4 Stamina" },
            { "slot": "Ranged", "item": "Venomstrike", "source": "Wailing Caverns (Lord Cobrahn)", "stats": "12.3 DPS, Chance on Hit: 31-45 Poison" }
          ],
          "campingPerk": {
            "name": "Trapper's Focus (+5% Agility)",
            "desc": "Resting inside a Camping Tent or Cozy Sleeping Bag grants a 2-hour +5% Agility buff and 10% faster trap arming."
          },
          "classQuestNote": "Level 20 Hunter unlocks Aspect of the Cheetah and Dual-Wielding trainer quest, enabling double 1-handed weapons."
        },
        {
          "specId": "marksmanship",
          "name": "Marksmanship (Sniper)",
          "icon": "🏹",
          "role": "Ranged Physical DPS",
          "wowheadCalcUrl": "https://www.wowhead.com/forever/talent-calc/hunter/-505001",
          "tagline": "Devastating single-target ranged burst opening with baseline Aimed Shot and tight auto-shot clipping.",
          "statPriority": "Agility > Ranged AP > Intellect > Stamina",
          "bestWeapon": "Bow or Gun (Venomstrike / Dwarven Blunderbuss)",
          "talents": [
            { "name": "Efficiency", "points": "5/5", "tree": "Marksmanship (Tier 1)", "desc": "Reduces the mana cost of all Shots and Stings by 10%, sustaining boss DPS." },
            { "name": "Lethal Shots", "points": "5/5", "tree": "Marksmanship (Tier 2)", "desc": "Increases your ranged critical strike chance by 5%." },
            { "name": "Concussive Barrage", "points": "1/5", "tree": "Marksmanship (Tier 3)", "desc": "Gives Chimera/Auto shots a 4% chance to daze the target for 4 seconds." }
          ],
          "legacyNotes": "Extra Legacy points unlock 5/5 Improved Arcane Shot and Mortal Shots (+30% ranged crit damage).",
          "rotation": [
            { "label": "Opener", "desc": "Hunter's Mark -> baseline Aimed Shot cast from 35 yards -> Serpent Sting." },
            { "label": "Rotational Cycle", "desc": "Auto Shot swing timer clipping -> Arcane Shot -> Multi-Shot on cooldown." },
            { "label": "Dead-Zone Management", "desc": "Concussive Shot to snare approaching enemies; drop Frost Trap if breached." }
          ],
          "bisGear": [
            { "slot": "Ranged Weapon", "item": "Venomstrike", "source": "Wailing Caverns (Lord Cobrahn)", "stats": "12.3 DPS, Nature Proc" },
            { "slot": "Ranged (Alt)", "item": "Dwarven Mountaineer Blunderbuss", "source": "Hall of Thanes (Ironforge)", "stats": "+4 Agility, 13.0 DPS" },
            { "slot": "Gloves", "item": "Cobrahn's Grasp", "source": "Wailing Caverns (Lord Cobrahn)", "stats": "+6 Agility, +3 Stamina" },
            { "slot": "Legs", "item": "Chausses of Westfall", "source": "Deadmines (Defias Quest)", "stats": "+11 Agility, +5 Stamina" }
          ],
          "campingPerk": {
            "name": "Eagle Sight (+5% Ranged Crit)",
            "desc": "Camp rest bonus increases maximum shot range by 3 yards and grants +5% Ranged Critical Strike chance."
          },
          "classQuestNote": "Level 20 Hunter unlocks Tranquilizing Shot preview and upgraded Heavy Quivers (+12% Ranged Attack Speed)."
        },
        {
          "specId": "beastmastery",
          "name": "Beast Mastery (Pet Commander)",
          "icon": "🐾",
          "role": "Ranged DPS / Solo Tanking",
          "wowheadCalcUrl": "https://www.wowhead.com/forever/talent-calc/hunter/500501",
          "tagline": "Unbreakable solo survivability through hardened pets with direct ground-placement command.",
          "statPriority": "Agility > Stamina > Spirit",
          "bestWeapon": "Bow / Polearm with Pet Support Stats",
          "talents": [
            { "name": "Endurance Training", "points": "5/5", "tree": "Beast Mastery (Tier 1)", "desc": "Increases the health of your pets by 15% and your health by 5%." },
            { "name": "Thick Hide", "points": "5/5", "tree": "Beast Mastery (Tier 2)", "desc": "Increases the armor rating of your pets by 30%, holding dungeon trash effortlessly." },
            { "name": "Bestial Swiftness", "points": "1/1", "tree": "Beast Mastery (Tier 3)", "desc": "Increases outdoor movement speed of your pets by 30%." }
          ],
          "legacyNotes": "Extra Legacy points push towards Unleashed Fury (+20% pet damage) and Ferocity (+15% pet crit).",
          "rotation": [
            { "label": "Pull", "desc": "Direct pet ground-click command into pack -> Hunter's Mark -> Growl." },
            { "label": "Sustained DPS", "desc": "Auto Shot -> Serpent Sting -> keep Mend Pet rolling to sustain pet tanking." }
          ],
          "bisGear": [
            { "slot": "Chest", "item": "Armor of the Fang (3-Piece)", "source": "Wailing Caverns (Fang Bosses)", "stats": "+20 Attack Power bonus" },
            { "slot": "Boots", "item": "Footpads of the Fang", "source": "Wailing Caverns (Lord Pythas)", "stats": "+4 Agi, +4 Sta, +4 Int" }
          ],
          "campingPerk": {
            "name": "Bond of the Pack (+10% Pet Damage)",
            "desc": "Camping grants a bonded aura that raises Pet Attack Power and health regeneration by 15."
          },
          "classQuestNote": "Level 20 Beast Mastery quest unlocks Summon Hawk (aerial scout & blind utility) and Call Pet slot 2."
        }
      ]
    },
    "level30": {
      "levelCap": 30,
      "talentPointsTotal": 21,
      "legacyPointsNotice": "Legacy Milestones allow up to +5 additional points at Level 30 (26 total points).",
      "specs": [
        {
          "specId": "survival",
          "name": "Survival (Melee Counterattack & Bleed Vanguard)",
          "icon": "⚔️",
          "role": "Melee Agility DPS & Combat Trapper",
          "wowheadCalcUrl": "https://www.wowhead.com/forever/talent-calc/hunter/--500501",
          "tagline": "Unprecedented melee dominance with Counterattack (5s root on parry), 20% Raptor/Mongoose crit, Mongoose Bite rolling bleeds, and in-combat Freezing Trap drops.",
          "statPriority": "Agility > Melee Attack Power > Stamina > Melee Hit",
          "bestWeapon": "Corpsemaker (RFK) / Strike of the Hydra (BFD) / Outlaw Sabre + Cruel Barb",
          "talents": [
            { "name": "Monster Slaying", "points": "3/3", "tree": "Survival (Tier 1)", "desc": "Increases all damage taken by and critical strike chance against Beasts by 3%." },
            { "name": "Humanoid Slaying", "points": "2/2", "tree": "Survival (Tier 1)", "desc": "Increases all damage taken by and critical strike chance against Humanoids by 3%." },
            { "name": "Deflection", "points": "5/5", "tree": "Survival (Tier 2)", "desc": "Increases your Parry chance by 5%." },
            { "name": "Savage Strikes", "points": "5/5", "tree": "Survival (Tier 2)", "desc": "Increases the critical strike chance of Raptor Strike and Mongoose Bite by 20%." },
            { "name": "Survivalist", "points": "5/5", "tree": "Survival (Tier 3)", "desc": "Increases total health by 10%." },
            { "name": "Counterattack", "points": "1/1", "tree": "Survival (Tier 4 Keystone)", "desc": "A strike that becomes active after parrying an opponent's attack. Deals physical damage and immobilizes the target for 5 sec on a 5s cooldown." }
          ],
          "legacyNotes": "Extra Legacy discovery points unlock Deterrence (+25% dodge and parry for 10s) and Surefooted (+5% hit and snare resistance).",
          "rotation": [
            { "label": "Trap Opener", desc: "Drop Freezing Trap in-combat directly beneath target -> Wing Clip to lock them into melee range." },
            { "label": "Parry & Counter", desc: "On parry proc, immediately fire Counterattack to immobilize target for 5 sec." },
            { "label": "Mongoose Bleed Stack", desc: "Mongoose Bite applies a 21-second bleed equal to 40% damage dealt; weave Strider Kick on cooldown." },
            { "label": "Raptor Strike Cleave", desc: "Queue Raptor Strike on next swing with +20% crit chance from Savage Strikes." }
          ],
          "bisGear": [
            { "slot": "Two-Hand Weapon", "item": "Corpsemaker", "source": "Razorfen Kraul (Overlord Ramtusk)", "stats": "+15 Str, +8 Sta, 28.9 DPS 2H Axe" },
            { "slot": "Legs", "item": "Triprunner Dungarees", "source": "Gnomeregan Quest", "stats": "+18 Agility, +2 Strength" },
            { "slot": "Chest", "item": "Excavator's Tunic", "source": "Excavation Site: Wetlands", "stats": "+12 Agi, +8 Sta" },
            { "slot": "Shoulders", "item": "Forest Tracker Shoulders", "source": "Blackfathom Deeps", "stats": "+8 Agi, +6 Sta" }
          ],
          "campingPerk": {
            "name": "Trapper's Focus (+5% Agility)",
            "desc": "Resting inside a Camping Tent or Cozy Sleeping Bag grants a 2-hour +5% Agility buff and 10% faster trap arming."
          },
          "classQuestNote": "Level 30 Hunter trains heavy mail armor at trainer and unlocks upgraded Aspect of the Cheetah."
        },
        {
          "specId": "marksmanship",
          "name": "Marksmanship (Scatter Shot & 41-Yard Sniper)",
          "icon": "🏹",
          "role": "Ranged Physical DPS & Kiting Specialist",
          "wowheadCalcUrl": "https://www.wowhead.com/forever/talent-calc/hunter/-505001",
          "tagline": "Unrivaled 41-yard sniping with Hawk Eye, 30% bonus Mortal Shots crit damage, baseline Aimed Shot, and Scatter Shot instant disorient.",
          "statPriority": "Agility > Ranged AP > Ranged Hit > Intellect",
          "bestWeapon": "Master Hunter's Bow (BFD) / Venomstrike / Excavator's Boomstick",
          "talents": [
            { "name": "Efficiency", "points": "5/5", "tree": "Marksmanship (Tier 1)", "desc": "Reduces the Mana cost of your Shots and Stings by 10%." },
            { "name": "Lethal Shots", "points": "5/5", "tree": "Marksmanship (Tier 2)", "desc": "Increases your ranged critical strike chance by 5%." },
            { "name": "Aimed Shot", "points": "1/1", "tree": "Marksmanship (Tier 3 Keystone)", "desc": "An aimed shot that increases ranged damage by 70 and reduces healing done to target by 50% for 10 sec." },
            { "name": "Hawk Eye", "points": "3/3", "tree": "Marksmanship (Tier 3)", "desc": "Increases the range of your ranged weapons by 6 yards (out to 41 yards total!)." },
            { "name": "Mortal Shots", "points": "5/5", "tree": "Marksmanship (Tier 4)", "desc": "Increases the critical strike damage bonus of your ranged weapon abilities by 30%." },
            { "name": "Scatter Shot", "points": "1/1", "tree": "Marksmanship (Tier 3 Keystone)", "desc": "A short-range shot that deals 50% weapon damage and disorients the target for 4 sec on an instant cast (30s cooldown)." },
            { "name": "Barrage", "points": "1/3", "tree": "Marksmanship (Tier 4)", "desc": "Increases the damage done by your Multi-Shot and Volley spells by 5%." }
          ],
          "legacyNotes": "Extra Legacy discovery points unlock Trueshot Aura (+50 Attack Power to all party members) and 3/3 Barrage.",
          "rotation": [
            { "label": "41-Yard Opener", desc: "Hunter's Mark -> Cast Aimed Shot from maximum 41-yard range -> Serpent Sting." },
            { "label": "Auto-Shot Weaving", desc: "Clip Auto Shot swing timer with Multi-Shot and Arcane Shot; Mortal Shots adds +30% critical damage." },
            { "label": "Dead-Zone Reset", desc: "If enemy rushes your 8-yard dead zone, fire instant Scatter Shot, take 5 steps back, and resumed ranged bombardment." }
          ],
          "bisGear": [
            { "slot": "Ranged Weapon", "item": "Master Hunter's Bow", "source": "Blackfathom Deeps Quest", stats: "+8 Agi, 19.4 DPS Bow" },
            { "slot": "One-Hand (Stat Stick)", "item": "Outlaw Sabre", "source": "Blackfathom Deeps Quest", stats: "+10 Agility, 21.8 DPS" },
            { "slot": "Off-Hand (Stat Stick)", "item": "Thief's Blade", "source": "Deadmines", stats: "+6 Agility" },
            { "slot": "Legs", "item": "Triprunner Dungarees", "source": "Gnomeregan Quest", stats: "+18 Agility, +2 Strength" }
          ],
          "campingPerk": {
            "name": "Eagle Sight (+5% Ranged Crit)",
            "desc": "Camp rest bonus increases maximum shot range by 3 yards and grants +5% Ranged Critical Strike chance."
          },
          "classQuestNote": "Level 30 Hunter unlocks upgraded Rapid Fire ranks and Concussive Shot rank 2."
        },
        {
          "specId": "beastmastery",
          "name": "Beast Mastery (Intimidation & Frenzy Commander)",
          "icon": "🐾",
          "role": "Pet DPS & Stun Lock Commander",
          "wowheadCalcUrl": "https://www.wowhead.com/forever/talent-calc/hunter/500501",
          "tagline": "Unbreakable pet agro with restored Aggressive stance, Intimidation 3-second hard stun, +20% Unleashed Fury pet damage, and Summon Hawk aerial scouting.",
          "statPriority": "Agility > Stamina > Pet Attack Power > Intellect",
          "bestWeapon": "Master Hunter's Bow / Venomstrike",
          "talents": [
            { "name": "Endurance Training", "points": "5/5", "tree": "Beast Mastery (Tier 1)", "desc": "Increases the health of your pets by 15% and your health by 5%." },
            { "name": "Thick Hide", "points": "3/3", "tree": "Beast Mastery (Tier 2)", "desc": "Increases the armor rating of your pets by 30%." },
            { "name": "Improved Revive Pet", "points": "2/2", "tree": "Beast Mastery (Tier 2)", "desc": "Revive Pet takes 6 sec less to cast and consumes 40% less mana." },
            { "name": "Unleashed Fury", "points": "5/5", "tree": "Beast Mastery (Tier 3)", "desc": "Increases the damage dealt by your pets by 20%." },
            { "name": "Ferocity", "points": "5/5", "tree": "Beast Mastery (Tier 4)", "desc": "Increases the critical strike chance of your pets by 15%." },
            { "name": "Intimidation", "points": "1/1", "tree": "Beast Mastery (Tier 5 Keystone)", "desc": "Command your pet to intimidate the target on the next melee attack, stunning them for 3 sec on a 1-minute cooldown." }
          ],
          "legacyNotes": "Extra Legacy discovery points unlock Bestial Wrath (+50% pet damage and crowd-control immunity) and Frenzy (+30% pet attack speed).",
          "rotation": [
            { "label": "Pet Assault", desc: "Send pet in on restored Aggressive mode -> Hunter's Mark -> Cast Intimidation on elite casters for 3s stun." },
            { "label": "Hawk Scout Weave", desc: "Summon Hawk blinds secondary targets while pet tears through primary mob with +20% Unleashed Fury damage." },
            { "label": "Sustain & Mend", desc: "Keep Mend Pet ticking; pet ability retention fix guarantees Growl and Bite never drop off." }
          ],
          "bisGear": [
            { "slot": "Ranged Weapon", "item": "Master Hunter's Bow", "source": "Blackfathom Deeps", stats: "+8 Agi, 19.4 DPS" },
            { "slot": "Chest", "item": "Armor of the Fang (3-Piece)", "source": "Wailing Caverns", stats: "+20 Attack Power bonus" },
            { "slot": "Belt", "item": "Belt of the Fang", "source": "Wailing Caverns (Lord Cobrahn)", stats: "+3 Agi, +3 Sta, +2 Int" }
          ],
          "campingPerk": {
            "name": "Bond of the Pack (+10% Pet Damage)",
            "desc": "Camping grants a bonded aura that raises Pet Attack Power and health regeneration by 15%."
          },
          "classQuestNote": "Level 30 Hunter trains mail armor and Beast Lore rank 2."
        }
      ]
    },
    "specs": []
  }
};
if (typeof window !== 'undefined' && window.WOW_FOREVER_DATA && window.WOW_FOREVER_DATA.classDeepDives && window.WOW_FOREVER_DATA.classDeepDives.hunter) {
  window.WOW_FOREVER_DATA.classDeepDives.hunter.betaBuilds.specs = window.WOW_FOREVER_DATA.classDeepDives.hunter.betaBuilds.level30.specs;
}
}
