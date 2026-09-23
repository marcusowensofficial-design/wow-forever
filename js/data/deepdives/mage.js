/**
 * World of Warcraft: Forever - Mage Class Deep Dive Dataset
 * Primary Source: Sodapoppin Level-38 Orc Mage Hands-On Early Access Demo & Closed Beta Forensics
 */

if (typeof window !== 'undefined' && window.WOW_FOREVER_DATA) {
  if (!window.WOW_FOREVER_DATA.classDeepDives) window.WOW_FOREVER_DATA.classDeepDives = {};
  window.WOW_FOREVER_DATA.classDeepDives.mage = {
  "id": "mage",
  "name": "Mage",
  "icon": "🔥",
  "color": "#69CCF0",
  "role": "Ranged DPS",
  "specs": "Arcane (Blast/Barrage) • Fire (Hot Streak/Ignite) • Frost (Ice Lance/Shatter)",
  "hasData": true,
  "videoTitle": "WoW Forever Mage Class Deep Dive & Orc Racials",
  "videoUrl": "https://www.youtube.com/watch?v=y2j8C277C_g",
  "sourceAttribution": "Sodapoppin Level-38 Orc Mage BlizzCon Early Access Demo & Closed Beta Forensics",
  "summary": "WoW Forever delivers transformative evolution to the Mage: the historic arrival of Orc Mages wielding Blood Fury (+10% Spell Power) and Axe Specialization (+1% spell crit), the return of Downranking, baseline Comprehend Scroll mechanics, Frostfire Bolt dual-school integration, Arcane Blast stacking loops with free Missile Barrage procs, Hot Streak 3-stack cast-time reductions for 1.5s Pyroblasts, instant Ice Lance with Fingers of Frost shatter combos, and rebalanced uncapped Blizzard AoE farming.",
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
      "label": "⚡ Beta L20 Builds",
      "icon": "⚡"
    },
    {
      "id": "arcane",
      "label": "Arcane Specialization",
      "icon": "✨"
    },
    {
      "id": "fire",
      "label": "Fire Specialization",
      "icon": "🔥"
    },
    {
      "id": "frost",
      "label": "Frost Specialization",
      "icon": "❄️"
    },
    {
      "id": "racials",
      "label": "Orc Testing & Races",
      "icon": "🪓"
    },
    {
      "id": "matrix",
      "label": "Verification Matrix",
      "icon": "🔬"
    }
  ],
  "coreRules": [
    {
      "title": "Spell Downranking Retained",
      "status": "verified",
      "statusLabel": "Verified in Beta",
      "badge": "Classic Pillar",
      "desc": "Spell downranking remains fully functional and accessible in WoW Forever. Lower ranks of Frostbolt (for quick kiting slows), Fireball, and utility spells can still be dragged to action bars and cast for conservative mana expenditure."
    },
    {
      "title": "Frostfire Bolt Dual-School Magic",
      "status": "verified",
      "statusLabel": "Verified in Beta",
      "badge": "New Baseline/Vendor Spell",
      "desc": "Frostfire Bolt returns as a dual-school Fire and Frost spell learned later from a Mage trainer/vendor. Supported across all three talent trees, it can simultaneously benefit from Fire (Ignite, Fire power) and Frost (Fingers of Frost, chill slows) mechanics."
    },
    {
      "title": "Comprehend Scroll (Decipher)",
      "status": "verified",
      "statusLabel": "Verified in Beta",
      "badge": "Class Flavor & Utility",
      "desc": "A new Mage-specific ability, 'Decipher an untranslated scroll' (Comprehend Scroll), appears in the General spellbook tab, allowing Mages to unlock ancient arcane scrolls found throughout the world for unique lore, buffs, or spells."
    },
    {
      "title": "Reagent-Free Teleportation & Portals",
      "status": "exclusive",
      "statusLabel": "✦ Forever Exclusive",
      "badge": "Major QoL",
      "desc": "Teleports, Portals, and Arcane Intellect/Brilliance no longer consume vendor-purchased Rune of Teleportation, Rune of Portals, or Arcane Powder reagents in WoW Forever, freeing vital bag slots."
    },
    {
      "title": "Uncapped Blizzard AoE with Adjusted Slow",
      "status": "verified",
      "statusLabel": "Verified in Beta",
      "badge": "AoE Balance",
      "desc": "Blizzard remains strictly uncapped in terms of target count (unlike modern retail AoE caps). However, the chill slow from Improved Blizzard has been rebalanced to 15% (reaching ~50% with Permafrost, down from Classic's 75%), curbing degenerate solo dungeon farming."
    },
    {
      "title": "Dedicated Reagent Bag Slot",
      "status": "verified",
      "statusLabel": "Verified in Beta",
      "badge": "Inventory QoL",
      "desc": "An additional 6th bag slot is dedicated to trade goods and consumables, ensuring Mage bags have room for conjured water, food, mana gems, and dungeon drops."
    }
  ],
  "arcane": {
    "title": "Arcane: High-Risk Mana Burn & Missile Barrage",
    "tagline": "Stack Arcane Blast damage multipliers for heavy burst, then channel free instant-frequency Missile Barrage procs",
    "talents": [
      {
        "name": "Arcane Blast (Stacking Steroid)",
        "type": "Signature Arcane Spell",
        "cast": "2.5 sec Cast",
        "cd": "None",
        "status": "verified",
        "desc": "Deals Arcane damage and increases the damage of the Mage's other spells by 10% per cast, stacking up to 4 times (for +40% bonus spell damage) for 8 seconds. However, each stack increases Arcane Blast's own mana cost by 175%, heavily discouraging mindless single-spell spam."
      },
      {
        "name": "Missile Barrage",
        "type": "Rotational Proc Keystone",
        "cast": "Passive Proc",
        "status": "verified",
        "desc": "Gives Arcane Blast a 40% chance (and Fireball, Frostbolt, and Frostfire Bolt a 20% chance) to make your next Arcane Missiles channel 50% faster, cost 0 mana, and fire missiles every 0.5 seconds."
      },
      {
        "name": "Arcane Critical Strike Damage",
        "type": "Burst Damage Passive",
        "cast": "Passive",
        "status": "verified",
        "desc": "Doubles the critical-strike damage bonus of all Arcane spells (increasing crit damage from 150% to 200%), allowing Arcane Blast and Arcane Missiles to hit devastating crits."
      },
      {
        "name": "Arcane Mind & Spell Impact",
        "type": "Stat Multiplier Talent",
        "cast": "Passive",
        "status": "verified",
        "desc": "Increases total Intellect by 10%, increases damage dealt by all spells by 1%, and grants an additional 3% critical-strike chance across all spell schools."
      },
      {
        "name": "Arcane Focus & Subtlety",
        "type": "Hit & Threat Management",
        "cast": "Passive",
        "status": "verified",
        "desc": "Reduces enemy spell resistance against all Mage spells by 8, grants spell-hit chance, and reduces threat generated by Arcane spells by 30%."
      },
      {
        "name": "Arcane Shielding & Mage Armor",
        "type": "Defensive Synergy",
        "cast": "Passive",
        "status": "verified",
        "desc": "Reduces Mana Shield's mana loss per point of damage absorbed, and significantly enhances the magic resistance bonus granted by Mage Armor."
      },
      {
        "name": "Mind Mastery (Armor from Intellect)",
        "type": "Physical Mitigation",
        "cast": "Passive",
        "status": "verified",
        "desc": "Increases your physical Armor value by an amount equal to 50% of your total Intellect, giving cloth-wearing Arcane Mages substantial passive physical durability."
      },
      {
        "name": "Improved Counterspell (2s Silence)",
        "type": "Utility & PvP Lockdown",
        "cast": "Talent Enhancement",
        "status": "verified",
        "desc": "Adds a guaranteed 2-second Silence effect to Counterspell, ensuring the target cannot cast spells of any school even if not actively casting when interrupted."
      },
      {
        "name": "Magic Absorption & Arcane Range",
        "type": "Utility & Reach",
        "cast": "Passive",
        "status": "verified",
        "desc": "Increases the range of all Arcane spells by 6 yards, improves wand damage, and grants interruption resistance to Arcane Missiles channels."
      }
    ]
  },
  "fire": {
    "title": "Fire: Explosive Ignite & Hot Streak Pyroblasts",
    "tagline": "Accumulate non-periodic critical strikes to stack Hot Streak for a 1.5s rapid Pyroblast execution window",
    "talents": [
      {
        "name": "Hot Streak (3-Stack Cast Reduction)",
        "type": "Signature Fire Keystone",
        "cast": "Passive Proc",
        "duration": "15 sec Duration",
        "status": "verified",
        "desc": "Non-periodic critical strikes from Fireball, Frostfire Bolt, Fire Blast, or Scorch grant a stack of Hot Streak. Each stack reduces the cast time of your next Pyroblast by 25% (up to 3 stacks = 75% reduction). At 3 stacks, Pyroblast's 6.0-second cast becomes a lightning-fast 1.5 seconds! Crucially, stacks are NOT lost if a subsequent spell fails to crit."
      },
      {
        "name": "Ignite",
        "type": "Core Damage Passive",
        "cast": "Passive",
        "duration": "4 sec Duration",
        "status": "verified",
        "desc": "Causes Fire-spell critical strikes to ignite the target, dealing an additional 40% of the spell damage dealt over 4 seconds. Forms the cornerstone of Fire DPS rolling dot damage."
      },
      {
        "name": "Improved Fireball & Frostfire Bolt",
        "type": "Cast Speed Talent",
        "cast": "Passive",
        "status": "verified",
        "desc": "Reduces the cast time of your Fireball and Frostfire Bolt spells by up to 0.5 seconds, lowering standard Fireball from 3.5s to 3.0s."
      },
      {
        "name": "Combustion",
        "type": "Active Critical Cooldown",
        "cast": "Instant",
        "cd": "3 min Cooldown",
        "status": "verified",
        "desc": "When activated, increases your Fire spell critical-strike chance by 10% after each Fire damage hit. This effect compounds until you score 4 non-periodic Fire spell critical strikes."
      },
      {
        "name": "Improved Scorch (15% Fire Vulnerability)",
        "type": "Raid Debuff Talent",
        "cast": "Talent Enhancement",
        "status": "verified",
        "desc": "Your Scorch spells have a 100% chance to apply Fire Vulnerability to the target, increasing Fire damage taken by 3% per application, stacking up to 5 times for a massive 15% Fire damage increase."
      },
      {
        "name": "Blast Wave (6s Daze)",
        "type": "Active AoE & Control",
        "cast": "Instant",
        "cd": "30 sec Cooldown",
        "status": "verified",
        "desc": "Unleashes a wave of flame radiating from the Mage, dealing heavy Fire damage and applying a 6-second Daze effect (slows movement by 50%). Note: The demo confirms it does NOT knock back targets, preventing unwanted dungeon mob scattering."
      },
      {
        "name": "Impact (3% Stun Chance)",
        "type": "RNG Control Passive",
        "cast": "Passive",
        "status": "verified",
        "desc": "Gives your Fire spells a 3% chance to stun the target for 2 seconds upon landing."
      },
      {
        "name": "Master of Elements & Fire Threat",
        "type": "Efficiency & Threat",
        "cast": "Passive Cluster",
        "status": "verified",
        "desc": "Includes talents for Flamestrike critical-strike chance, Fire spell range extension (+6 yards), Fire damage pushback protection, and a 30% reduction in Fire spell threat generation."
      },
      {
        "name": "Executioner Fire Blast",
        "type": "Leveling & Dungeon Finish",
        "cast": "Passive Proc",
        "status": "verified",
        "desc": "Killing a non-trivial enemy that yields experience or honor grants your next Fire Blast a 50% additional critical-strike chance."
      }
    ]
  },
  "frost": {
    "title": "Frost: Ice Lance Burst, Fingers of Frost & Controlled AoE",
    "tagline": "Instant Ice Lance burst into Shatter combos, backed by Ice Block, Cold Snap, and rebalanced uncapped Blizzard",
    "talents": [
      {
        "name": "Ice Lance",
        "type": "New Instant Frost Spell",
        "cast": "Instant",
        "cd": "None",
        "cost": "Low Mana",
        "status": "verified",
        "desc": "Deals Frost damage to an enemy target. Deals triple (3x) damage against frozen targets. Available directly through the Frost talent tree, providing essential instant-cast mobility and shatter burst."
      },
      {
        "name": "Fingers of Frost",
        "type": "Keystone Proc",
        "cast": "Passive Proc",
        "status": "verified",
        "desc": "Gives your Chill effects a chance to grant the Fingers of Frost buff, causing your next 2 spells to treat the target as if it were frozen. Enables full Shatter critical-strike combos against immune dungeon and raid bosses!"
      },
      {
        "name": "Shatter",
        "type": "Synergy Keystone",
        "cast": "Passive (5 Ranks)",
        "status": "verified",
        "desc": "Increases the critical-strike chance of all spells against frozen targets by up to 50%. Synergizes with Frost Nova, Frostbite, and Fingers of Frost for near-guaranteed crits."
      },
      {
        "name": "Winter's Chill",
        "type": "Debuff Talent",
        "cast": "Passive (5 Stacks)",
        "status": "verified",
        "desc": "Increases the critical-strike chance of Ice Lance and Frostbite against the target by 2% per stack, stacking up to 5 times for a total of +10% bonus critical-strike chance."
      },
      {
        "name": "Permafrost & Improved Blizzard",
        "type": "AoE Balance Rework",
        "cast": "Passive Cluster",
        "status": "verified",
        "desc": "Improved Blizzard adds a 15% chill slow to Blizzard waves; with Permafrost (+33% duration and +10% slow), the effective movement slow caps at ~50% (down from Classic's 75%). Blizzard remains uncapped in target count, but the slower kite speeds curb degenerate solo farming."
      },
      {
        "name": "Ice Barrier & Cold Snap",
        "type": "Defensive Mastery",
        "cast": "Instant Cooldowns",
        "status": "verified",
        "desc": "Frost retains its complete arsenal of premier defensives: Ice Barrier (absorbs damage and prevents spell pushback), Cold Snap (instantly resets all Frost cooldowns), and Ice Block (invulnerability)."
      },
      {
        "name": "Arctic Reach & Frost Range",
        "type": "Reach & Area Expansion",
        "cast": "Passive",
        "status": "verified",
        "desc": "Increases the range of Frostbolt and Blizzard, and expands the radius of Frost Nova and Cone of Cold, giving Frost unmatched battlefield kiting control."
      },
      {
        "name": "Frostbite & Piercing Ice",
        "type": "Control & Throughput",
        "cast": "Passive",
        "status": "verified",
        "desc": "Gives Chill effects a 15% chance to freeze the target in place for 5 seconds (Frostbite), increases Frost damage by 6%, reduces Frost spell mana costs by 15%, and lowers Frost threat by 30%."
      }
    ]
  },
  "racialSynergies": {
    "orcDemo": {
      "title": "Sodapoppin's Orc Mage Hands-On Demo Findings",
      "subtitle": "Forensic testing of updated Orc racials on a Mage in the BlizzCon 2026 early access demo",
      "items": [
        {
          "name": "Hardiness (-20% Stun Duration)",
          "status": "verified",
          "statusLabel": "Verified in Beta",
          "desc": "Reduces the duration of all stun effects by 20%. Replaces Classic's controversial RNG resist mechanic with a consistent, reliable 20% duration reduction, providing predictable PvP counterplay."
        },
        {
          "name": "Axe Specialization (+1% All Crit)",
          "status": "verified",
          "statusLabel": "Verified in Beta",
          "desc": "Orcs gain +1% critical-strike chance for ALL spells and abilities while wielding an axe or two-handed axe. Note: While Mages do not natively equip axes, this racial provides unprecedented cross-spec scaling for Orcs across all spellcasters."
        },
        {
          "name": "Shatter Curse",
          "status": "verified",
          "statusLabel": "Verified in Beta",
          "desc": "Active racial ability that instantly removes all curses and banes, grants immunity to them for 8 seconds, and reduces magical damage taken by 15% during its duration. Exceptional defensive tool in PvP and curse-heavy raids."
        },
        {
          "name": "Blood Fury (+10% AP & Spell Power)",
          "status": "verified",
          "statusLabel": "Verified in Beta",
          "desc": "Increases Attack Power AND Spell Power by 10% for 15 seconds. Crucially, the old Classic penalty that reduced healing received by 50% has been completely removed! Turns Orc Mages into terrifying burst machines during Combustion or Arcane Power."
        }
      ]
    },
    "newRaces": [
      {
        "race": "Orc Mage",
        "faction": "Horde",
        "badge": "✦ NEW IN FOREVER",
        "desc": "Students of ancient clan scrolls studying ley lines beneath Durotar. Combines Blood Fury (+10% Spell Power) with devastating Pyroblasts, Arcane Blast stacking, and Shatter Curse magic mitigation."
      },
      {
        "race": "The Skyborne Mage (High Order)",
        "faction": "Alliance",
        "badge": "✦ NEW IN FOREVER",
        "desc": "Alliance High Order ley scholars from Zephras Isle. Harnesses Walk on Air (glide), Skysight (+10% speed), Wind Blessed (+1% casting Haste), and Elemental Insight (+5% damage to Elementals)."
      }
    ]
  },
  "forensicMatrix": [
    {
      "feature": "Spell Downranking",
      "category": "Core Mechanics",
      "details": "Lower ranks of spells remain accessible and castable for mana efficiency",
      "status": "Verified in Closed Beta",
      "statusType": "verified",
      "source": "Sodapoppin Hands-On Demo"
    },
    {
      "feature": "Frostfire Bolt",
      "category": "Core Spells",
      "details": "Dual-school Fire/Frost spell learned from vendor; triggers Ignite and Fingers of Frost",
      "status": "Verified in Closed Beta",
      "statusType": "verified",
      "source": "Sodapoppin Demo & Vendor Intel"
    },
    {
      "feature": "Comprehend Scroll",
      "category": "Class Flavor",
      "details": "Decipher untranslated scrolls found in the world via General tab ability",
      "status": "Verified in Closed Beta",
      "statusType": "verified",
      "source": "Sodapoppin Demo Spellbook & Mobalytics"
    },
    {
      "feature": "Arcane Blast Stacks",
      "category": "Arcane",
      "details": "+10% damage to other spells per stack (up to 4x, 8s); +175% mana cost per stack to AB",
      "status": "Verified in Closed Beta",
      "statusType": "verified",
      "source": "Sodapoppin Hands-On Demo"
    },
    {
      "feature": "Missile Barrage",
      "category": "Arcane",
      "details": "40% proc from AB, 20% from Fireball/Frostbolt/FFB; 0 mana, -50% channel, 0.5s rate",
      "status": "Verified in Closed Beta",
      "statusType": "verified",
      "source": "Sodapoppin Hands-On Demo"
    },
    {
      "feature": "Arcane Crit Multiplier",
      "category": "Arcane",
      "details": "Doubles Arcane critical-strike damage bonus (200% crit damage)",
      "status": "Verified in Closed Beta",
      "statusType": "verified",
      "source": "Sodapoppin Hands-On Demo"
    },
    {
      "feature": "Improved Counterspell Silence",
      "category": "Arcane",
      "details": "Adds 2-second guaranteed silence effect to Counterspell",
      "status": "Verified in Closed Beta",
      "statusType": "verified",
      "source": "Sodapoppin Hands-On Demo"
    },
    {
      "feature": "Hot Streak Stacks",
      "category": "Fire",
      "details": "-25% Pyroblast cast time per non-periodic crit (up to 3 = 1.5s cast); non-crits don't drop stacks",
      "status": "Verified in Closed Beta",
      "statusType": "verified",
      "source": "Sodapoppin Hands-On Demo"
    },
    {
      "feature": "Combustion",
      "category": "Fire",
      "details": "+10% crit per hit until 4 non-periodic Fire crits occur",
      "status": "Verified in Closed Beta",
      "statusType": "verified",
      "source": "Sodapoppin Hands-On Demo"
    },
    {
      "feature": "Blast Wave No Knockback",
      "category": "Fire",
      "details": "Applies 6s daze slow; knockback removed to prevent mob scattering in dungeons",
      "status": "Verified in Closed Beta",
      "statusType": "verified",
      "source": "Sodapoppin Hands-On Demo"
    },
    {
      "feature": "Ice Lance",
      "category": "Frost",
      "details": "Instant cast in Frost tree; deals 3x damage to frozen targets",
      "status": "Verified in Closed Beta",
      "statusType": "verified",
      "source": "Sodapoppin Hands-On Demo"
    },
    {
      "feature": "Fingers of Frost",
      "category": "Frost",
      "details": "Procs from Chill; next 2 spells treat targets as frozen for Shatter combos",
      "status": "Verified in Closed Beta",
      "statusType": "verified",
      "source": "Sodapoppin Hands-On Demo"
    },
    {
      "feature": "Winter's Chill",
      "category": "Frost",
      "details": "Stacks up to 5 times; +2% crit for Ice Lance and Frostbite per stack (up to 10%)",
      "status": "Verified in Closed Beta",
      "statusType": "verified",
      "source": "Sodapoppin Hands-On Demo"
    },
    {
      "feature": "Blizzard Slow Rebalance",
      "category": "Frost",
      "details": "AoE remains uncapped, but slow reduced to 15% base (~50% with Permafrost, down from 75%)",
      "status": "Verified in Closed Beta",
      "statusType": "verified",
      "source": "Sodapoppin Hands-On Demo"
    },
    {
      "feature": "Orc Hardiness Flat Reduction",
      "category": "Orc Racials",
      "details": "-20% stun duration replaces RNG resist mechanic",
      "status": "Verified in Closed Beta",
      "statusType": "verified",
      "source": "Sodapoppin Hands-On Demo"
    },
    {
      "feature": "Orc Blood Fury Buff",
      "category": "Orc Racials",
      "details": "+10% AP and +10% Spell Power; healing debuff completely removed",
      "status": "Verified in Closed Beta",
      "statusType": "verified",
      "source": "Sodapoppin Hands-On Demo"
    },
    {
      "feature": "Orc Shatter Curse",
      "category": "Orc Racials",
      "details": "Removes curses/banes, grants immunity for 8s, -15% magic damage taken",
      "status": "Verified in Closed Beta",
      "statusType": "verified",
      "source": "Sodapoppin Hands-On Demo"
    }
  ],
  "betaBuilds": {
    "season": "Closed Beta Phase 1",
    "levelCap": 20,
    "talentPointsTotal": 11,
    "legacyPointsNotice": "Legacy Milestones allow up to +2 to +5 additional points at Level 20.",
    "specs": [
      {
        "specId": "frost",
        "name": "Frost (Shatter & Ice Lance)",
        "icon": "❄️",
        "role": "Ranged DPS & AoE Control",
        "wowheadCalcUrl": "https://www.wowhead.com/forever/talent-calc/mage/--50500101",
        "tagline": "Unmatched solo kiting, instant Ice Lance shatter combos, and dungeon AoE slow dominance.",
        "statPriority": "Spell Power > Spell Hit (to 3%) > Intellect > Spirit > Stamina",
        "bestWeapon": "Staff / Wand (Wands scale with 30% Spell Power)",
        "talents": [
          { "name": "Improved Frostbolt", "points": "5/5", "tree": "Frost (Tier 1)", "desc": "Reduces cast time of Frostbolt by 0.5 sec. Fundamental for weaving casts before mobs reach melee range." },
          { "name": "Frostbite", "points": "3/3", "tree": "Frost (Tier 2)", "desc": "Gives Chill effects a 15% chance to freeze targets for 5 sec. Triggers high-damage Shatter combos." },
          { "name": "Permafrost", "points": "2/2", "tree": "Frost (Tier 2)", "desc": "Increases slow duration by 3 sec and slows target movement speed by an additional 10%." },
          { "name": "Ice Shards", "points": "1/5", "tree": "Frost (Tier 2)", "desc": "Increases critical strike damage bonus of Frost spells by 20%. First point into exponential shatter damage." }
        ],
        "legacyNotes": "Extra points obtained through Legacy Discovery should be placed directly into 5/5 Ice Shards and Cold Snap (Tier 3 unlock at lvl 20+2).",
        "rotation": [
          { "label": "Pull / Opener", "desc": "Max range Frostbolt rank 3 -> cast second Frostbolt while projectile travels." },
          { "label": "Freeze Shatter Loop", "desc": "When Frostbite or Frost Nova procs Freeze, immediately weave instant Ice Lance for triple damage crit multiplier." },
          { "label": "Close Quarters", "desc": "If target closes distance: Frost Nova -> strafe 15 yards -> Frostbolt -> Ice Lance finisher." },
          { "label": "Mana Efficient Finish", "desc": "At <15% enemy HP, switch to Wand attacks to activate Spirit regeneration rules (5-second rule)." },
          { "label": "Dungeon AoE", "desc": "Coordinate Blizzard rank 1 downranking for slows, letting tanks group mobs before casting max-rank Blizzard." }
        ],
        "bisGear": [
          { "slot": "Two-Hand / Staff", "item": "Emberstone Staff", "source": "Deadmines (Captain Greenskin)", "stats": "+5 Int, +5 Spi, +5 Sta" },
          { "slot": "Chest", "item": "Robe of Arugal", "source": "Shadowfang Keep (Arugal)", "stats": "+10 Int, +5 Spi, +3 Agi" },
          { "slot": "Chest (New)", "item": "Thane's Rune-Carved Robes", "source": "Hall of Thanes (Ironforge)", "stats": "+7 Frost SP, +6 Int" },
          { "slot": "Ranged / Wand", "item": "Necromantic Wand", "source": "Ruins of Lordaeron (Crypt)", "stats": "Shadow Wand, +3 Shadow/Frost SP" },
          { "slot": "Shoulders", "item": "Feline Mantle", "source": "Shadowfang Keep (Shadowfang)", "stats": "+10 Int, +3 Spi" }
        ],
        "campingPerk": {
          "name": "Cozy Rested Intellect (+5% Total Int)",
          "desc": "Setting camp with a Cozy Sleeping Bag provides 200% rested XP rate and grants the 'Mind Cleared' 2-hour +5% Intellect buff."
        },
        "classQuestNote": "Level 20 Mage quest unlocks Comprehend Language and Mage Robe questline, awarding Robes of Arcane Might."
      },
      {
        "specId": "fire",
        "name": "Fire (Hot Streak Burst)",
        "icon": "🔥",
        "role": "Burst Ranged DPS",
        "wowheadCalcUrl": "https://www.wowhead.com/forever/talent-calc/mage/-505001",
        "tagline": "Explosive single-target burst fueled by Ignite rolling DoTs and Hot Streak reduced-cast Pyroblasts.",
        "statPriority": "Spell Power > Spell Crit > Intellect > Stamina",
        "bestWeapon": "Staff / Wand with Fire Spell Damage",
        "talents": [
          { "name": "Improved Fireball", "points": "5/5", "tree": "Fire (Tier 1)", "desc": "Reduces Fireball cast time by 0.5 sec, bringing it to a crisp 3.0 sec cast." },
          { "name": "Ignite", "points": "5/5", "tree": "Fire (Tier 2)", "desc": "Critical strikes with Fire damage spells cause the target to burn for an additional 40% damage over 4 sec." },
          { "name": "Flame Throwing", "points": "1/2", "tree": "Fire (Tier 2)", "desc": "Increases the range of your Fire spells by 3 yards, allowing safe 38-yard openers." }
        ],
        "legacyNotes": "Extra Legacy points unlock Pyroblast and 5/5 Impact (giving Fire spells a 10% stun chance).",
        "rotation": [
          { "label": "Opener", "desc": "Max range Fireball -> Fire Blast on approach -> Fireball." },
          { "label": "Hot Streak Burn", "desc": "On back-to-back crits, consume Hot Streak for a 1.5s cast Pyroblast or instant Scorch." },
          { "label": "Execute", "desc": "Fire Blast -> Wand attacks to maintain ignite while restoring mana." }
        ],
        "bisGear": [
          { "slot": "Staff", "item": "Emberstone Staff", "source": "Deadmines (Greenskin)", "stats": "+5 Int, +5 Spi, +5 Sta" },
          { "slot": "Finger", "item": "Lavishly Jeweled Ring", "source": "Deadmines (Gilnid)", "stats": "+6 Agi, +2 Int" },
          { "slot": "Chest", "item": "Robes of Arcane Might", "source": "Level 20 Mage Class Quest", "stats": "+7 Fire/Frost SP, +5 Int" }
        ],
        "campingPerk": {
          "name": "Warmth of the Hearth (+4% Fire Crit)",
          "desc": "Resting beside an active Campfire grants +4% spell critical strike chance with Fire spells for 1 hour."
        },
        "classQuestNote": "Level 20 Mage unlocks the Mage Armor preview quest and Evocation mana recovery."
      },
      {
        "specId": "arcane",
        "name": "Arcane (Missile Barrage)",
        "icon": "✨",
        "role": "Ranged DPS & Threat Control",
        "wowheadCalcUrl": "https://www.wowhead.com/forever/talent-calc/mage/505001",
        "tagline": "Controlled threat and high-efficiency Arcane Missiles with Arcane Concentration Clearcasting loops.",
        "statPriority": "Intellect > Spirit > Spell Power",
        "bestWeapon": "High-Spirit Staff (Living Root / Staff of Westfall)",
        "talents": [
          { "name": "Arcane Subtlety", "points": "5/5", "tree": "Arcane (Tier 1)", "desc": "Reduces target magic resistance by 10 and reduces threat caused by Arcane spells by 40%." },
          { "name": "Arcane Focus", "points": "5/5", "tree": "Arcane (Tier 1)", "desc": "Reduces the chance that the opponent can resist or dodge your Arcane spells by 10%." },
          { "name": "Arcane Concentration", "points": "1/5", "tree": "Arcane (Tier 2)", "desc": "Gives you a 2% chance per point of entering a Clearcasting state after any damage spell." }
        ],
        "legacyNotes": "Extra Legacy points max 5/5 Arcane Concentration (10% Clearcasting) and unlock Arcane Impact (+6% crit).",
        "rotation": [
          { "label": "Single Target", "desc": "Arcane Missiles -> Fire Blast -> Arcane Missiles. On Clearcasting proc, cast highest rank spell free." },
          { "label": "Dungeon Clear", "desc": "Arcane Subtlety enables high burst without ripping threat from early tanks." }
        ],
        "bisGear": [
          { "slot": "Two-Hand", "item": "Staff of Westfall", "source": "Deadmines (Defias Quest)", "stats": "+11 Int, +5 Spi" },
          { "slot": "Chest", "item": "Robe of Arugal", "source": "Shadowfang Keep", "stats": "+10 Int, +5 Spi" }
        ],
        "campingPerk": {
          "name": "Arcane Meditation (+15% Spirit Regen in Combat)",
          "desc": "Camp rest aura allows 15% of mana regeneration to continue while casting for 2 hours."
        },
        "classQuestNote": "Comprehend Language unlocks from trainer at level 20, letting Mages translate enemy faction whispers."
      }
    ]
  }
};
}
