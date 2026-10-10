/**
 * World of Warcraft: Forever - Shaman Class Deep Dive Dataset
 * Primary Source: Sodapoppin Level-38 Dwarf Shaman Hands-On Early Access Demo & Closed Beta Forensics
 */

if (typeof window !== 'undefined' && window.WOW_FOREVER_DATA) {
  if (!window.WOW_FOREVER_DATA.classDeepDives) window.WOW_FOREVER_DATA.classDeepDives = {};
  window.WOW_FOREVER_DATA.classDeepDives.shaman = {
  "id": "shaman",
  "name": "Shaman",
  "icon": "⚡",
  "color": "#0070DE",
  "role": "Healer / Melee & Ranged DPS / Off-Tank",
  "specs": "Enhancement (Melee/Off-Tank) • Elemental (Caster DPS) • Restoration (Healer)",
  "hasData": true,
  "videoTitle": "WoW Forever Shaman Class Deep Dive",
  "videoUrl": "https://www.youtube.com/watch?v=WfB5HLAZxwg",
  "sourceAttribution": "Sodapoppin Level-38 Dwarf Shaman BlizzCon Early Access Demo & Closed Beta Forensics",
  "summary": "WoW Forever introduces historic milestones for the Shaman: Dwarf Shamans (Wildhammer) bringing Bloodlust and Windfury to the Alliance, an 8-second Stormstrike cooldown with dodge/parry reset procs, Spirit Weapons dual-threat scaling for 5-man dungeon tanking, indoor Ghost Wolf, 60-minute weapon imbues, Call of the Ancestors 4-totem dropping, and modern rotation additions like Lava Burst and Riptide.",
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
      "label": "⚡ Level 20 & 30 Builds",
      "icon": "⚡"
    },
    {
      "id": "enhancement",
      "label": "Enhancement Melee",
      "icon": "⚡"
    },
    {
      "id": "tanking",
      "label": "Tanking Tools & Viability",
      "icon": "🛡️"
    },
    {
      "id": "elemental",
      "label": "Elemental Caster",
      "icon": "🔥"
    },
    {
      "id": "restoration",
      "label": "Restoration Healer",
      "icon": "💧"
    },
    {
      "id": "racials",
      "label": "Dwarf Testing & Races",
      "icon": "⛏️"
    },
    {
      "id": "matrix",
      "label": "Verification Matrix",
      "icon": "🔬"
    }
  ],
  "coreRules": [
    {
      "title": "Call of the Ancestors: 4-Totem Drop",
      "status": "verified",
      "statusLabel": "Verified in Beta",
      "badge": "Major QoL",
      "desc": "Allows the Shaman to simultaneously place up to four totems (Earth, Fire, Water, Air) in a single global cooldown, supporting customizable saved totem loadout sets for instant situational deployment in PvE and PvP."
    },
    {
      "title": "60-Minute Weapon Imbues",
      "status": "verified",
      "statusLabel": "Verified in Beta",
      "badge": "Major QoL",
      "desc": "Weapon imbues (Rockbiter, Windfury, Flametongue, Frostbrand) now have a full 60-minute duration, eliminating the frustrating 5-minute recast tax from classic 2004."
    },
    {
      "title": "Indoor Ghost Wolf & 2s Reduction",
      "status": "verified",
      "statusLabel": "Verified in Beta",
      "badge": "Mobility",
      "desc": "Ghost Wolf can now be cast indoors across all zones and dungeons. Furthermore, the cast time can be reduced by 2 seconds through talents, making Ghost Wolf an instant-cast form."
    },
    {
      "title": "Ankh-Free Reincarnation",
      "status": "exclusive",
      "statusLabel": "✦ Forever Exclusive",
      "badge": "Reagent Free",
      "desc": "Reincarnation no longer consumes vendor-purchased Ankh reagents in WoW Forever, freeing inventory space and removing unnecessary death penalties."
    },
    {
      "title": "Comprehensive Weapon Proficiencies",
      "status": "verified",
      "statusLabel": "Verified in Beta",
      "badge": "Arsenal",
      "desc": "Visible proficiencies include One-Handed Maces, Two-Handed Maces, One-Handed Axes, Two-Handed Axes, Daggers, Staves, and Fist/Unarmed weapons, alongside Shields for defense."
    },
    {
      "title": "Dual Wield Status: 2H Favored",
      "status": "demo",
      "statusLabel": "🎙️ Sodapoppin Demo Finding",
      "badge": "Spec Design",
      "desc": "Dual Wield was not visible in the accessible level-38 build. The current beta emphasizes Two-Handed weapon synergy with Stormstrike and Windfury, keeping the classic big-burst fantasy alive."
    },
    {
      "title": "Dedicated Reagent Bag Slot",
      "status": "verified",
      "statusLabel": "Verified in Beta",
      "badge": "Inventory QoL",
      "desc": "Equip an extra 6th bag purely for tradeskill and profession reagents, allowing Shamans to carry quest items and consumables without bag bloat."
    },
    {
      "title": "Unified Spell & Attack Hit/Crit Ratings",
      "status": "exclusive",
      "statusLabel": "✦ Forever Exclusive",
      "badge": "Hybrid Stat",
      "desc": "Consolidated combat stats allow Enhancement and Elemental Shamans to scale both physical weapon strikes and nature spells simultaneously without conflicting itemization."
    },
    {
      "title": "Native Cooldown Manager: Shaman Essentials",
      "status": "verified",
      "statusLabel": "Verified in Beta (Oct 8)",
      "badge": "Native UI & Edit Mode",
      "desc": "Expanded in Beta Build 1.60.6.71890 directly in default HUD Edit Mode. Rotational Spells Tracked: Stormstrike (snappy 8s CD with dodge/parry reset flash), Lava Burst (8s), shared Shock spells (5-6s), Riptide (6s), and Chain Lightning (6s). Major Defensives & Bursts: Bloodlust / Heroism (5m), Elemental Mastery (3m), Nature's Swiftness (3m), Shamanistic Rage (2m), and Grounding Totem (15s). Active Procs & Buffs: Maelstrom Weapon charges (1–5 with screen edge glow at 5 stacks), Clearcasting/Elemental Focus, Flurry charges (1–3), and Lightning/Water Shield charges."
    },
    {
      "title": "Totemic Recall Added Baseline",
      "status": "verified",
      "statusLabel": "Phase 2 Beta Baseline",
      "badge": "Mana Recovery",
      "desc": "Shamans now learn Totemic Recall baseline from trainers. Instantly destroys active totems, immediately refunding 25% of their base mana costs and preventing wandering patrol pulls in Excavation Site and Dalaran dungeons."
    },
    {
      "title": "Two-Handed Enhancement Swing Timing Fix",
      "status": "verified",
      "statusLabel": "Phase 2 Engine Fix",
      "badge": "Combat Engine",
      "desc": "Spell-shock casting no longer inadvertently resets or pauses the 2H weapon swing timer in Phase 2, allowing seamless weaving of instant Shocks and Stormstrike between massive slow weapon strikes."
    },
    {
      "title": "Rockbiter & Spirit Weapons Tank Multiplier",
      "status": "verified",
      "statusLabel": "Phase 2 Calibrated",
      "badge": "Dungeon Tanking",
      "desc": "Spirit Weapons combined with Rockbiter Weapon provides a calibrated +30% threat bonus and unlocks shield parry mitigation, establishing the Shaman as a top-tier physical and magical dungeon tank for level 30 content."
    }
  ],
  "enhancement": {
    "title": "Enhancement: The Thunderous Melee & Spellhance Striker",
    "tagline": "Fast-paced 8-second Stormstrike rotations, dodge/parry reset procs, Maelstrom cast reduction, and Rage of the Farseer",
    "talents": [
      {
        "name": "Stormstrike (8s Cooldown)",
        "type": "Signature Melee Strike",
        "cast": "Instant",
        "cd": "8 sec Cooldown",
        "status": "verified",
        "desc": "Instantly attacks with your weapon, dealing physical damage and causing the next 2 sources of Nature damage dealt to the target to be increased by 20%. Cooldown reduced from 20 seconds to a snappy 8 seconds."
      },
      {
        "name": "Improved Stormstrike",
        "type": "Keystone Talent",
        "cast": "Passive",
        "status": "verified",
        "desc": "Grants 100% mana regeneration while casting for a duration after Stormstrike, and provides a 100% chance to immediately reset Stormstrike's cooldown whenever the Shaman dodges or parries an incoming attack."
      },
      {
        "name": "Rage of the Farseer",
        "type": "Active Burst Cooldown",
        "cast": "Instant",
        "cd": "3 min Cooldown",
        "duration": "25 sec Duration",
        "status": "verified",
        "desc": "Unleashes ancient elemental fury, increasing melee attack speed by 30% and spellcasting speed by 30% for 25 seconds. Serves as a major offensive power spike."
      },
      {
        "name": "Maelstrom Weapon / Lightning Reduction",
        "type": "Melee-to-Spell Synergy",
        "cast": "Passive Proc",
        "status": "verified",
        "desc": "Melee attacks have a chance to trigger a stacking buff reducing the cast time and mana cost of your next Lightning Bolt by 20% per stack, up to 5 stacks (granting a 100% instant, free Lightning Bolt)."
      },
      {
        "name": "Shock & Lightning Shield Mana Reduction",
        "type": "Resource Conservation",
        "cast": "Passive",
        "status": "verified",
        "desc": "Reduces the mana cost of all Shock spells (Earth Shock, Flame Shock, Frost Shock) and Lightning Shield by up to 45%, solving classic Enhancement mana starvation."
      },
      {
        "name": "Spirit Weapons",
        "type": "Mitigation & Threat Stance",
        "cast": "Passive",
        "status": "verified",
        "desc": "Grants the ability to Parry melee attacks. Reduces weapon attack threat by 30% when Rockbiter is inactive (DPS stance), and increases weapon attack threat by 30% when Rockbiter is active (Tank stance)."
      },
      {
        "name": "Elemental Devastation",
        "type": "Hybrid Spellhance Talent",
        "cast": "Passive",
        "status": "verified",
        "desc": "Grants up to 9% melee critical-strike chance for 10 seconds whenever you score a critical strike with an offensive spell (Shock, Lightning Bolt, Chain Lightning)."
      },
      {
        "name": "Improved Ghost Wolf",
        "type": "Mobility Talent",
        "cast": "Passive (2 Ranks)",
        "status": "verified",
        "desc": "Reduces the cast time of Ghost Wolf by 1.0/2.0 seconds, allowing for instant-cast indoor wolf transformations for unmatched kiting and dungeon repositioning."
      },
      {
        "name": "Core Enhancement Retentions",
        "type": "Baseline Stat Modifiers",
        "cast": "Passive",
        "status": "verified",
        "desc": "Enhancement retains bonuses to Stoneclaw Totem health, Earthbind Totem radius, melee/spell crit, Intellect-to-Attack Power scaling, Lightning Shield damage, and Dodge."
      }
    ]
  },
  "tanking": {
    "title": "Tanking Tools & Dungeon Off-Tank Viability",
    "tagline": "Viable 5-man dungeon tanking through Rockbiter threat, parry mitigation, and Earth Shock interrupts — but no player-targeted taunt for raids",
    "tools": [
      {
        "name": "Spirit Weapons Threat Stance",
        "status": "verified",
        "statusLabel": "Verified in Beta",
        "desc": "The cornerstone of Shaman tanking: grants Parry chance, and when Rockbiter Weapon is active, boosts weapon-attack threat generation by +30%."
      },
      {
        "name": "Rockbiter Weapon",
        "status": "verified",
        "statusLabel": "Verified in Beta",
        "desc": "Imbues your weapon with earth power, increasing Attack Power and causing every melee strike to generate significant extra threat."
      },
      {
        "name": "Earth Shock",
        "status": "verified",
        "statusLabel": "Verified in Beta",
        "desc": "Instant nature spell that interrupts enemy casting, locks out that spell school, and deals high damage with a built-in high threat multiplier. Note: It is NOT a taunt."
      },
      {
        "name": "Stoneclaw Totem",
        "status": "verified",
        "statusLabel": "Verified in Beta",
        "desc": "Pulses threat within 8 yards, forcing nearby hostile creatures to attack the totem. Extremely useful for grouping trash, but cannot withstand boss melee hits."
      },
      {
        "name": "Windwall Totem Mitigation",
        "status": "verified",
        "statusLabel": "Verified in Beta",
        "desc": "Reduces physical damage taken from ranged and melee attacks by a flat amount (32 damage reduction shown in demo tooltip at level 38)."
      },
      {
        "name": "Raid Tanking Verdict",
        "status": "demo",
        "statusLabel": "🎙️ Sodapoppin Demo Finding",
        "desc": "No player-targeted taunt (like Taunt or Growl) was found in the accessible build. Shamans are fully capable 5-man dungeon tanks and off-tanks, but main-tanking raid bosses with tank-swap mechanics remains unconfirmed."
      }
    ]
  },
  "elemental": {
    "title": "Elemental: Fury of the Storm & Lava",
    "tagline": "Devastating nature and fire spellcasting with Lava Burst, Elemental Overload double-casts, and shock haste",
    "talents": [
      {
        "name": "Lava Burst",
        "type": "New Fire Active Spell",
        "cast": "2.0 sec Cast (1.5s Talented)",
        "cd": "8 sec Cooldown",
        "status": "verified",
        "desc": "Hurls molten lava at the target, dealing heavy Fire damage. If the target is affected by Flame Shock, Lava Burst deals 20% increased damage. Core rotational fire spell."
      },
      {
        "name": "Elemental Overload",
        "type": "Double-Cast Mastery",
        "cast": "Passive (9% Chance)",
        "status": "verified",
        "desc": "Gives Lightning Bolt and Chain Lightning a 9% chance to instantly trigger a second, duplicate cast at the same target for 50% damage with zero mana cost and zero threat."
      },
      {
        "name": "Cast Time Reductions",
        "type": "Haste Talent",
        "cast": "Passive",
        "status": "verified",
        "desc": "Reduces the cast times of Lightning Bolt, Chain Lightning, and Lava Burst by 0.5 seconds, making Lightning Bolt 2.5s and Lava Burst 1.5s."
      },
      {
        "name": "Shock Cooldown & Pushback Reduction",
        "type": "Spell Weaving Talent",
        "cast": "Passive",
        "status": "verified",
        "desc": "Shortens the cooldown of all Shock spells by 1 second and reduces the casting pushback from damage taken by up to 70%."
      },
      {
        "name": "Clearcasting (Elemental Focus)",
        "type": "Resource Management",
        "cast": "Passive (10% Chance)",
        "status": "verified",
        "desc": "Offensive spell critical strikes have a 10% chance to enter a Clearcasting state, reducing the mana cost of your next 2 damage spells by 100%."
      },
      {
        "name": "Elemental Mana Solution Analysis",
        "type": "Forensic Finding",
        "cast": "Analysis",
        "status": "demo",
        "desc": "Sodapoppin noted the absence of a deep dedicated Elemental mana battery in the talent tree, meaning Elemental Shamans will rely on Clearcasting procs, Shamanistic Focus, and Water Shield swaps for sustained mana."
      }
    ]
  },
  "restoration": {
    "title": "Restoration: Tides of Healing & Water Shield",
    "tagline": "Sustained single-target and chain healing powered by Riptide and on-hit Water Shield mana replenishment",
    "talents": [
      {
        "name": "Riptide",
        "type": "New Instant Healing Spell",
        "cast": "Instant",
        "cd": "6 sec Cooldown",
        "status": "verified",
        "desc": "Heals a friendly target instantly and an additional amount over 15 seconds. In addition, your next Chain Heal cast on that target has its healing effectiveness increased by 25%."
      },
      {
        "name": "Water Shield",
        "type": "Mana Sustain Shield",
        "cast": "Instant",
        "duration": "10 min Duration",
        "charges": "3 Charges",
        "status": "verified",
        "desc": "Surrounds the Shaman with 3 globes of water. When struck by a critical hit from a spell, melee, or ranged attack, a globe is consumed to instantly restore 2% of total mana (short lockout between triggers). Does not grant passive Mp5."
      },
      {
        "name": "Restoration Core Passives",
        "type": "Healing Enhancements",
        "cast": "Passive Cluster",
        "status": "verified",
        "desc": "Includes increased healing spell critical-strike chance, shorter Healing Wave cast times, reduced healing threat generation, lower healing mana costs, and spell-hit bonuses."
      },
      {
        "name": "Earth Shield Status",
        "type": "Forensic Finding",
        "cast": "Analysis",
        "status": "demo",
        "desc": "Earth Shield was not visible in the accessible level-38 build or talent tree, keeping Restoration focused on Water Shield management and Riptide-empowered Chain Heals."
      },
      {
        "name": "Deep Tree Tradeoff",
        "type": "Hybrid Talent Structure",
        "cast": "Analysis",
        "status": "demo",
        "desc": "The accessible talent layout appears to force a distinct choice between deep Restoration capstones (such as Nature's Swiftness) and deep Elemental capstones (such as Lava Burst), preventing overpowered hybrid burst."
      }
    ]
  },
  "racialSynergies": {
    "dwarfDemo": {
      "title": "Sodapoppin's Dwarf Shaman Hands-On Demo Findings",
      "subtitle": "Forensic testing of Dwarf racials on a Shaman in the BlizzCon 2026 early access demo",
      "items": [
        {
          "name": "Stoneform",
          "status": "verified",
          "statusLabel": "Verified in Beta",
          "desc": "Instantly removes and grants full immunity to bleed, poison, and disease effects, while also reducing physical damage taken by 10% for 8 seconds. Extraordinary synergy for Shaman tanking and PvP."
        },
        {
          "name": "Mace Specialization",
          "status": "verified",
          "statusLabel": "Verified in Beta",
          "desc": "Grants +1% critical-strike chance to ALL spells and attacks while a one-handed or two-handed mace is equipped. Synergizes perfectly with Enhancement melee crits and Restoration healing crits!"
        },
        {
          "name": "Find Treasure",
          "status": "verified",
          "statusLabel": "Verified in Beta",
          "desc": "Allows the Dwarf Shaman to sense nearby treasure, displaying chests and containers as dots on the minimap."
        },
        {
          "name": "Big Game Hunter",
          "status": "verified",
          "statusLabel": "Verified in Beta",
          "desc": "Increases all damage dealt to Beasts by 5%, providing strong leveling throughput in beast-heavy zones."
        }
      ]
    },
    "newRaces": [
      {
        "race": "Dwarf Shaman (Wildhammer)",
        "faction": "Alliance",
        "badge": "✦ NEW IN FOREVER",
        "desc": "Brings Bloodlust, Windfury Totem, Mana Spring, and Chain Lightning to the Alliance for the first time in Classic history! Features custom Wildhammer gryphon feathers and stormhammer totems."
      },
      {
        "race": "The Skyborne Shaman (Windshapers)",
        "faction": "Horde",
        "badge": "✦ NEW IN FOREVER",
        "desc": "Horde allegiance guided by Tauren shamanism and Skywall elementals. Channels wind-infused totems, aerial lightning surges, and unique Zephras wind totems."
      }
    ]
  },
  "forensicMatrix": [
    {
      "feature": "Stormstrike Cooldown (8s)",
      "category": "Enhancement",
      "details": "Cooldown reduced from 20s to 8s; increases Nature damage by 20%",
      "status": "Verified in Closed Beta",
      "statusType": "verified",
      "source": "Sodapoppin Hands-On Demo & Talent Tree"
    },
    {
      "feature": "Improved Stormstrike Reset",
      "category": "Enhancement",
      "details": "100% mana regen while casting; 100% CD reset chance on dodge/parry",
      "status": "Verified in Closed Beta",
      "statusType": "verified",
      "source": "Sodapoppin Hands-On Demo"
    },
    {
      "feature": "Rage of the Farseer",
      "category": "Enhancement",
      "details": "3m CD, +30% melee and +30% spellcast speed for 25s",
      "status": "Verified in Closed Beta",
      "statusType": "verified",
      "source": "Sodapoppin Hands-On Demo"
    },
    {
      "feature": "Maelstrom Lightning Reduction",
      "category": "Enhancement",
      "details": "Melee hits reduce next Lightning Bolt cast time and mana by 20% (up to 5 stacks)",
      "status": "Verified in Closed Beta",
      "statusType": "verified",
      "source": "Sodapoppin Hands-On Demo"
    },
    {
      "feature": "Spirit Weapons Threat Stance",
      "category": "Tanking",
      "details": "+Parry chance; -30% threat without Rockbiter, +30% threat with Rockbiter",
      "status": "Verified in Closed Beta",
      "statusType": "verified",
      "source": "Sodapoppin Hands-On Demo"
    },
    {
      "feature": "Rockbiter Weapon Threat",
      "category": "Tanking",
      "details": "Increased Attack Power and high bonus threat on melee attacks",
      "status": "Verified in Closed Beta",
      "statusType": "verified",
      "source": "Sodapoppin Hands-On Demo"
    },
    {
      "feature": "Earth Shock Taunt Status",
      "category": "Tanking",
      "details": "Interrupts and causes high threat, but is NOT a taunt",
      "status": "Verified in Closed Beta",
      "statusType": "verified",
      "source": "Sodapoppin Live Combat Test"
    },
    {
      "feature": "Raid Tanking Viability",
      "category": "Tanking",
      "details": "No player-targeted taunt in accessible build; dungeon tanking viable, raid tanking uncertain",
      "status": "🎙️ Sodapoppin Demo Finding",
      "statusType": "demo",
      "source": "Sodapoppin Forensic Assessment"
    },
    {
      "feature": "Call of the Ancestors",
      "category": "Totem Management",
      "details": "Drops up to 4 totems simultaneously in 1 GCD; supports saved totem sets",
      "status": "Verified in Closed Beta",
      "statusType": "verified",
      "source": "Sodapoppin Hands-On Demo"
    },
    {
      "feature": "60-Minute Weapon Imbues",
      "category": "Core QoL",
      "details": "Imbue duration extended from 5 minutes to 60 minutes",
      "status": "Verified in Closed Beta",
      "statusType": "verified",
      "source": "Sodapoppin Live In-Game Tooltip"
    },
    {
      "feature": "Indoor Ghost Wolf",
      "category": "Core QoL",
      "details": "Castable indoors; talents reduce cast time by up to 2 seconds",
      "status": "Verified in Closed Beta",
      "statusType": "verified",
      "source": "Sodapoppin Hands-On Demo"
    },
    {
      "feature": "Lava Burst + Flame Shock",
      "category": "Elemental",
      "details": "+20% damage if Flame Shock is on target (not guaranteed crit)",
      "status": "Verified in Closed Beta",
      "statusType": "verified",
      "source": "Sodapoppin Hands-On Demo"
    },
    {
      "feature": "Elemental Overload",
      "category": "Elemental",
      "details": "9% chance for free duplicate Lightning Bolt / Chain Lightning at 50% dmg, 0 threat",
      "status": "Verified in Closed Beta",
      "statusType": "verified",
      "source": "Sodapoppin Hands-On Demo"
    },
    {
      "feature": "Riptide + Chain Heal",
      "category": "Restoration",
      "details": "Instant HoT heal; increases next Chain Heal on target by 25%",
      "status": "Verified in Closed Beta",
      "statusType": "verified",
      "source": "Sodapoppin Hands-On Demo"
    },
    {
      "feature": "Water Shield On-Crit Regen",
      "category": "Restoration",
      "details": "3 charges, 10m duration; critical hits received restore 2% max mana (reactive)",
      "status": "Verified in Closed Beta",
      "statusType": "verified",
      "source": "Sodapoppin Hands-On Demo"
    },
    {
      "feature": "Dwarf Stoneform + Mace Spec",
      "category": "Dwarf Racials",
      "details": "Stoneform 10% phys reduction; Mace Spec +1% crit to all spells and attacks",
      "status": "Verified in Closed Beta",
      "statusType": "verified",
      "source": "Sodapoppin Hands-On Demo"
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
      "specs": [
        {
          "specId": "enhancement",
          "name": "Enhancement (Rockbiter & Thundering)",
          "icon": "⚡",
          "role": "Melee Physical & Spell DPS",
          "wowheadCalcUrl": "https://www.wowhead.com/forever/talent-calc/shaman/-500501",
          "tagline": "Thunderous melee power with flat Rockbiter Attack Power, +5% melee crit, and shock burst.",
          "statPriority": "Strength > Agility > Attack Power > Intellect",
          "bestWeapon": "Slow Two-Handed Mace / Axe (Smite's Mighty Hammer / Axe of Orgrimmar)",
          "talents": [
            { "name": "Ancestral Knowledge", "points": "5/5", "tree": "Enhancement (Tier 1)", "desc": "Increases your maximum Mana by 5%." },
            { "name": "Thundering Strikes", "points": "5/5", "tree": "Enhancement (Tier 2)", "desc": "Improves your chance to get a critical strike with melee weapons by 5%." },
            { "name": "Enhancing Totems", "points": "1/2", "tree": "Enhancement (Tier 2)", "desc": "Increases the effect of your Strength of Earth and Grace of Air Totems by 8%." }
          ],
          "legacyNotes": "Extra points obtained through Legacy Discovery unlock Flurry (+30% attack speed on crits) and 8-second Stormstrike.",
          "rotation": [
            { "label": "Imbue & Totem", desc: "Imbue weapon with Rockbiter Weapon (60-minute duration) -> drop Strength of Earth and Searing Totem." },
            { "label": "Rotational Strike", desc: "Melee auto-attack swing -> Earth Shock on cooldown -> Lightning Shield refresh." },
            { "label": "Interrupt", desc: "Earth Shock rank 1 downranked to interrupt enemy casts at minimal mana cost." }
          ],
          "bisGear": [
            { "slot": "Two-Hand Weapon", item: "Smite's Mighty Hammer", source: "Deadmines (Mr. Smite)", stats: "+11 Strength, 19.8 DPS" },
            { "slot": "Two-Hand (Horde)", item: "Axe of Orgrimmar (Rare)", source: "Leaders of the Fang Quest", stats: "+9 Str, +3 Sta, 21.4 DPS" },
            { "slot": "Boots", item: "Thane's Mail Boots", source: "Hall of Thanes (Ironforge)", stats: "+6 Str, +5 Sta" },
            { "slot": "Gloves", item: "Cobrahn's Grasp", source: "Wailing Caverns", stats: "+6 Agi, +3 Sta" }
          ],
          "campingPerk": {
            "name": "Totemic Guidance (+5% Strength & Intellect)",
            "desc": "Setting camp with a Cozy Sleeping Bag provides 200% rested XP rate and grants the 'Ancestral Blessing' 2-hour +5% Str/Int buff."
          },
          "classQuestNote": "Level 20 Shaman unlocks the Water Totem questline and Ghost Wolf indoor shifting."
        },
        {
          "specId": "shaman_tank",
          "name": "Shaman Tank (Rockbiter & Shield)",
          "icon": "🛡️",
          "role": "Dungeon Off-Tank / Main Tank",
          "wowheadCalcUrl": "https://www.wowhead.com/forever/talent-calc/shaman/-050501",
          "tagline": "Dungeon-viable tanking via Rockbiter threat multiplier, Earth Shock aggro, and 5/5 Shield Specialization.",
          "statPriority": "Stamina > Armor > Strength > Agility",
          "bestWeapon": "One-Hand Mace/Axe + Shield (Commander's Crest / Kresh's Back)",
          "talents": [
            { "name": "Shield Specialization", "points": "5/5", "tree": "Enhancement (Tier 1)", "desc": "Increases your chance to block attacks with a shield by 5% and increases block value by 25%." },
            { "name": "Ancestral Knowledge", "points": "5/5", "tree": "Enhancement (Tier 1)", "desc": "Increases maximum mana pool by 5% to fuel high-threat shocks." },
            { "name": "Guardian Totems", "points": "1/2", "tree": "Enhancement (Tier 2)", "desc": "Increases armor provided by Stoneskin Totem and reduces Grounding Totem cooldown." }
          ],
          "legacyNotes": "Extra Legacy points unlock Spirit Weapons (parry chance and 20% threat bonus on Rockbiter).",
          "rotation": [
            { "label": "Pull & Hold", desc: "Rockbiter Weapon -> Earth Shock max rank (massive threat multiplier) -> Stoneskin Totem drop." },
            { "label": "Mitigation", desc: "Shield Block on physical hits; use Stoneform (Dwarf) or War Stomp (Tauren) for pack control." }
          ],
          "bisGear": [
            { "slot": "Shield", item: "Commander's Crest", source: "Shadowfang Keep (Springvale)", stats: "542 Armor, 16 Block, +6 Str, +3 Sta" },
            { "slot": "One-Hand", item: "Thief's Blade", source: "Deadmines (Mr. Smite)", stats: "+6 Agility, 15.6 DPS" },
            { "slot": "Chest", item: "Totemic Vestments", source: "Ruins of Lordaeron", stats: "+7 Str, +6 Sta" }
          ],
          "campingPerk": {
            "name": "Earthen Wall (+10% Shield Block Value)",
            "desc": "Camp rest bonus increases Shield Block Value by 10% and Stoneskin Totem armor by 15% for 2 hours."
          },
          "classQuestNote": "Water Totem questline grants Healing Stream Totem and Mana Spring Totem."
        },
        {
          "specId": "elemental",
          "name": "Elemental (Storm & Flame Shocks)",
          "icon": "🌋",
          "role": "Ranged Nature & Fire DPS",
          "wowheadCalcUrl": "https://www.wowhead.com/forever/talent-calc/shaman/505001",
          "tagline": "Long-range Lightning Bolts combined with low-cost shocks via Convection and Conduction.",
          "statPriority": "Spell Power > Nature Damage > Intellect > Spirit",
          "bestWeapon": "Two-Handed Staff (Staff of Westfall / Emberstone Staff)",
          "talents": [
            { "name": "Convection", "points": "5/5", "tree": "Elemental (Tier 1)", "desc": "Reduces the Mana cost of your Shock, Lightning Bolt, and Chain Lightning spells by 10%." },
            { "name": "Conduction", "points": "5/5", "tree": "Elemental (Tier 2)", "desc": "Increases the damage done by your Lightning Bolt, Chain Lightning, and Shock spells by 5%." },
            { "name": "Earth's Grasp", "points": "1/2", "tree": "Elemental (Tier 2)", "desc": "Increases the health of your Stoneclaw Totem and the radius of your Earthbind Totem by 25%." }
          ],
          "legacyNotes": "Extra Legacy points unlock Call of Thunder (+6% Lightning crit) and Elemental Focus (Clearcasting).",
          "rotation": [
            { "label": "Opener", desc: "Max range Lightning Bolt -> Flame Shock DoT -> Earthbind Totem kiting." },
            { "label": "Burst", desc: "Lightning Bolt -> Earth Shock finisher on closing targets." }
          ],
          "bisGear": [
            { "slot": "Staff", item: "Staff of Westfall", source: "Deadmines Quest", stats: "+11 Int, +5 Spi" },
            { "slot": "Chest", item: "Robe of Arugal", source: "Shadowfang Keep", stats: "+10 Int, +5 Spi, +3 Agi" }
          ],
          "campingPerk": {
            "name": "Fury of the Elements (+5% Spell Crit)",
            "desc": "Resting beside an active Campfire grants +5% spell critical strike chance with Nature and Fire spells for 1 hour."
          },
          "classQuestNote": "Level 20 unlocks Fire Nova Totem and Water Totem mastery."
        },
        {
          "specId": "restoration",
          "name": "Restoration (Ancestral Healing)",
          "icon": "💧",
          "role": "Healer / Dungeon Support",
          "wowheadCalcUrl": "https://www.wowhead.com/forever/talent-calc/shaman/--50501",
          "tagline": "Mana-efficient healing via Tidal Focus and party totem mana reductions.",
          "statPriority": "Healing Power > MP5 > Intellect > Spirit",
          "bestWeapon": "One-Hand Mace + Shield / Off-hand",
          "talents": [
            { "name": "Tidal Focus", "points": "5/5", "tree": "Restoration (Tier 1)", "desc": "Reduces the Mana cost of your healing spells by 5%." },
            { "name": "Totemic Focus", "points": "5/5", "tree": "Restoration (Tier 2)", "desc": "Reduces the Mana cost of your totems by 25%." },
            { "name": "Nature's Guidance", "points": "1/3", "tree": "Restoration (Tier 2)", "desc": "Increases your chance to hit with melee attacks and spells by 1%." }
          ],
          "legacyNotes": "Extra Legacy points unlock Healing Focus (anti-pushback) and Nature's Swiftness.",
          "rotation": [
            { "label": "Totem Setup", desc: "Drop Healing Stream Totem and Stoneskin Totem before pulls." },
            { "label": "Direct Heals", desc: "Downranked Healing Wave rank 2/3 for sustained party preservation." }
          ],
          "bisGear": [
            { "slot": "Weapon", item: "Luminescent Rod", source: "Blackfathom Deeps", stats: "+8 Int, +4 Spi" },
            { "slot": "Chest", item: "Robe of Arugal", source: "Shadowfang Keep", stats: "+10 Int, +5 Spi, +3 Agi" }
          ],
          "campingPerk": {
            "name": "Spring of Life (+10% Healing)",
            "desc": "Camp rest grants +10% bonus healing done and +12 MP5 for 2 hours."
          },
          "classQuestNote": "Level 20 completes Water Totem mastery for all four fundamental totems."
        }
      ]
    },
    "level30": {
      "levelCap": 30,
      "talentPointsTotal": 21,
      "specs": [
        {
          "specId": "enhancement_30",
          "name": "Enhancement (Stormstrike & Flurry)",
          "icon": "⚡",
          "role": "Melee Physical & Spell DPS",
          "wowheadCalcUrl": "https://www.wowhead.com/forever/talent-calc/shaman/-505003010501",
          "tagline": "Thunderous 8-second Stormstrike rotations paired with 30% Flurry attack speed and Spirit Weapons.",
          "statPriority": "Strength > Agility > Attack Power > Hit Rating > Intellect",
          "bestWeapon": "Slow Two-Handed Mace or Axe (Corpsemaker 3.8 speed)",
          "talents": [
            { "name": "Ancestral Knowledge", "points": "5/5", "tree": "Enhancement (Tier 1)", "desc": "Increases maximum Mana by 5% to sustain high-frequency shocks and totems." },
            { "name": "Thundering Strikes", "points": "5/5", "tree": "Enhancement (Tier 2)", "desc": "Improves your chance to get a critical strike with melee weapons by 5%." },
            { "name": "Improved Ghost Wolf", "points": "2/2", "tree": "Enhancement (Tier 2)", "desc": "Reduces the cast time of Ghost Wolf by 2 sec, making it instant-cast indoors!" },
            { "name": "Spirit Weapons", "points": "1/1", "tree": "Enhancement (Tier 3)", "desc": "Grants a chance to parry melee attacks and reduces threat generated by 30%." },
            { "name": "Flurry", "points": "5/5", "tree": "Enhancement (Tier 4)", "desc": "Increases your attack speed by 30% for your next 3 swings after dealing a melee critical strike." },
            { "name": "Stormstrike", "points": "1/1", "tree": "Enhancement (Tier 5)", "desc": "Snappy 8-second cooldown melee strike that boosts the target's next 2 Nature damage hits by 20%." },
            { "name": "Elemental Devastation", "points": "2/3", "tree": "Elemental (Tier 2)", "desc": "Offensive spell crits increase your melee critical strike chance by 6% for 10 seconds." }
          ],
          "legacyNotes": "Legacy Discovery points enable Elemental Focus Clearcasting and Shamanistic Rage mana batteries.",
          "rotation": [
            { "label": "Opener", desc: "Windfury / Rockbiter Weapon -> Call of the Ancestors 4-totem drop -> Charge into melee." },
            { "label": "Rotational Burst", desc: "Stormstrike (8s CD) -> Earth Shock weave (amplified +20% by Stormstrike) -> Flurry proc." },
            { "label": "Mobility & Reposition", desc: "Instant Ghost Wolf cast indoors to dodge AoE sweeps and reposition instantly." }
          ],
          "bisGear": [
            { "slot": "Two-Hand Weapon", "item": "Corpsemaker", "source": "Razorfen Kraul (Overlord Ramtusk)", "stats": "28.9 DPS, +15 Str, +8 Sta, 3.8s speed" },
            { "slot": "Chest", "item": "Triprunner Dungarees", "source": "Gnomeregan Quest", "stats": "+18 Agi, +4 Str, 128 Armor" },
            { "slot": "Ring", "item": "Charged Gear of the Monkey", "source": "Gnomeregan World Drop", "stats": "+6 Str, +6 Agi" },
            { "slot": "Trinket", "item": "Insignia of the Horde / Alliance", "source": "PvP Officer (Warsong Gulch)", "stats": "Removes Stun, Charm, and Fear effects" }
          ],
          "campingPerk": {
            "name": "Fury of the Wildhammer (+6% Attack & Spell Crit)",
            "desc": "Setting camp at a Cozy Fire provides +6% critical strike chance across both physical attacks and nature spells for 2 hours."
          },
          "classQuestNote": "Level 30 unlocks Air Totem mastery (Windfury Totem and Grace of Air Totem) and Windfury Weapon imbue."
        },
        {
          "specId": "shaman_tank_30",
          "name": "Shaman Tank (Spirit Weapons & Shield Mastery)",
          "icon": "🛡️",
          "role": "Dungeon Main Tank / Off-Tank",
          "wowheadCalcUrl": "https://www.wowhead.com/forever/talent-calc/shaman/-05051000501",
          "tagline": "High-threat dungeon tanking with 30% Rockbiter aggro, Shield Block Value, and Spirit Weapons Parry.",
          "statPriority": "Stamina > Armor > Strength > Block Value > Agility",
          "bestWeapon": "One-Hand Mace/Axe + Shield (Thermaplugg's Central Core / Tortusk Shield)",
          "talents": [
            { "name": "Shield Specialization", "points": "5/5", "tree": "Enhancement (Tier 1)", "desc": "Increases block chance by 5% and block value by 25%." },
            { "name": "Ancestral Knowledge", "points": "5/5", "tree": "Enhancement (Tier 1)", "desc": "Increases maximum Mana pool by 5% to support repeated high-threat Earth Shocks." },
            { "name": "Thundering Strikes", "points": "5/5", "tree": "Enhancement (Tier 2)", "desc": "Improves melee critical strike chance by 5% for threat generation." },
            { "name": "Spirit Weapons", "points": "1/1", "tree": "Enhancement (Tier 3)", "desc": "Unlocks Parry mitigation and amplifies Rockbiter Weapon threat generation by 30%." },
            { "name": "Anticipation", "points": "4/5", "tree": "Enhancement (Tier 3)", "desc": "Increases Defense skill by 8, reducing chance to be critically struck." },
            { "name": "Toughness", "points": "1/5", "tree": "Enhancement (Tier 4)", "desc": "Increases armor value from items by 2%." }
          ],
          "legacyNotes": "Legacy Milestones allow investing points into Flurry and Improved Ghost Wolf for dungeon speed pulls.",
          "rotation": [
            { "label": "Pull & Engage", desc: "Rockbiter Weapon imbue -> Earth Shock max rank (massive threat) -> Stoneskin Totem & Searing Totem." },
            { "label": "Active Mitigation", desc: "Hold shield facing front to proc Parry and Shield Block -> Grounding Totem to absorb caster spikes." },
            { "label": "Snap Aggro", desc: "Earth Shock on caster adds -> Stoneclaw Totem to peel secondary loose mobs." }
          ],
          "bisGear": [
            { "slot": "Shield", "item": "Thermaplugg's Central Core", "source": "Gnomeregan (Mekgineer Thermaplugg)", "stats": "842 Armor, 23 Block, +7 Sta, Nature Res" },
            { "slot": "One-Hand", "item": "Toxic Revenger", "source": "Gnomeregan (Techbot)", "stats": "19.6 DPS, Poison Proc" },
            { "slot": "Ring", "item": "Electrocutioner Lagnut", "source": "Gnomeregan", "stats": "+9 Sta, +4 Str" },
            { "slot": "Chest", "item": "Mail Combat Armor", "source": "Excavation Site: Wetlands", "stats": "224 Armor, +12 Str, +8 Sta" }
          ],
          "campingPerk": {
            "name": "Earthen Bastion (+15% Shield Block & +200 Armor)",
            "desc": "Camp rest grants +15% Shield Block Value and +200 flat armor for 2 hours in dungeons."
          },
          "classQuestNote": "Air Totem questline grants Grounding Totem, indispensable for deflecting boss magical burst."
        },
        {
          "specId": "elemental_30",
          "name": "Elemental (Elemental Focus & Call of Thunder)",
          "icon": "🌋",
          "role": "Ranged Nature & Fire DPS",
          "wowheadCalcUrl": "https://www.wowhead.com/forever/talent-calc/shaman/50500101501",
          "tagline": "Ranged artillery with 100% Clearcasting mana refund, +6% Lightning crit, and low-cost 5s Shocks.",
          "statPriority": "Spell Power > Nature Damage > Spell Crit > Intellect > MP5",
          "bestWeapon": "Two-Handed Staff (Rod of the Sleepwalker / Staff of Westfall)",
          "talents": [
            { "name": "Convection", "points": "5/5", "tree": "Elemental (Tier 1)", "desc": "Reduces Mana cost of Shock, Lightning Bolt, and Chain Lightning spells by 10%." },
            { "name": "Conduction", "points": "5/5", "tree": "Elemental (Tier 2)", "desc": "Increases damage of Lightning Bolt, Chain Lightning, and Shock spells by 5%." },
            { "name": "Call of Thunder", "points": "5/5", "tree": "Elemental (Tier 3)", "desc": "Increases critical strike chance of Lightning Bolt and Chain Lightning spells by 6%." },
            { "name": "Elemental Focus", "points": "1/1", "tree": "Elemental (Tier 3)", "desc": "Spell crits enter a Clearcasting state, reducing the mana cost of your next 2 damage spells by 100%!" },
            { "name": "Reverberation", "points": "5/5", "tree": "Elemental (Tier 3)", "desc": "Reduces the cooldown of your Shock spells by 1 second (down to a rapid 5-second CD)." }
          ],
          "legacyNotes": "Extra Legacy points unlock Elemental Devastation and Lightning Mastery cast time reduction.",
          "rotation": [
            { "label": "Opener", desc: "Max range Lightning Bolt -> Flame Shock DoT -> Searing Totem drop." },
            { "label": "Clearcasting Engine", desc: "Lightning Bolt crit procs Elemental Focus -> Free Chain Lightning or Earth Shock finisher." },
            { "label": "AoE Burst", desc: "Chain Lightning -> Fire Nova Totem -> Earthbind Totem for slow kite." }
          ],
          "bisGear": [
            { "slot": "Staff", "item": "Rod of the Sleepwalker", "source": "Blackfathom Deeps (Twilight Lord Kelris)", "stats": "+11 Spell Power, +7 Int, +5 Spi" },
            { "slot": "Robe", "item": "Robe of the Dragon Slayer", "source": "Excavation Site: Wetlands", "stats": "+14 Nature/Fire Damage, +9 Int" },
            { "slot": "Wand / Relic", "item": "Totem of the Storm", "source": "Dalaran Classic+ Vendor (Merchant's Favor)", "stats": "+12 Lightning Bolt Damage" }
          ],
          "campingPerk": {
            "name": "Fury of the Storm (+7% Nature & Fire Crit)",
            "desc": "Camp rest grants +7% spell critical strike chance with Nature and Fire spells for 2 hours."
          },
          "classQuestNote": "Level 30 unlocks Chain Lightning and Fire Nova Totem rank 2."
        },
        {
          "specId": "restoration_30",
          "name": "Restoration (Nature's Swiftness & Tidal Waves)",
          "icon": "💧",
          "role": "Healer / Dungeon & Raid Support",
          "wowheadCalcUrl": "https://www.wowhead.com/forever/talent-calc/shaman/--50503001501",
          "tagline": "Master healer with 70% anti-pushback, 25% totem mana reduction, and instant Nature's Swiftness clutch save.",
          "statPriority": "Healing Power > MP5 > Intellect > Spirit",
          "bestWeapon": "One-Hand Mace + Off-hand / Shield (Luminescent Rod)",
          "talents": [
            { "name": "Tidal Focus", "points": "5/5", "tree": "Restoration (Tier 1)", "desc": "Reduces the Mana cost of your healing spells by 5%." },
            { "name": "Totemic Focus", "points": "5/5", "tree": "Restoration (Tier 2)", "desc": "Reduces the Mana cost of your totems by 25%." },
            { "name": "Healing Focus", "points": "5/5", "tree": "Restoration (Tier 2)", "desc": "Gives you a 70% chance to avoid interruption caused by damage while casting healing spells." },
            { "name": "Nature's Guidance", "points": "3/3", "tree": "Restoration (Tier 3)", "desc": "Increases your chance to hit with melee attacks and spells by 3%." },
            { "name": "Restorative Totems", "points": "2/5", "tree": "Restoration (Tier 3)", "desc": "Increases the effect of Mana Spring Totem and Healing Stream Totem by 10%." },
            { "name": "Nature's Swiftness", "points": "1/1", "tree": "Restoration (Tier 5)", "desc": "Instant-cast 3m cooldown: When activated, makes your next Nature spell with cast time under 10 sec instant!" }
          ],
          "legacyNotes": "Legacy Milestones allow investing points into Tidal Mastery (+5% heal crit) and Purification.",
          "rotation": [
            { "label": "Totem Buff Grid", desc: "Drop Healing Stream Totem + Mana Spring Totem + Stoneskin Totem before pulls." },
            { "label": "Sustained Triage", desc: "Downranked Healing Wave rank 3/4 for low mana cost party stabilization." },
            { "label": "Clutch Emergency", desc: "Nature's Swiftness -> Instant max-rank Healing Wave on tank spike." }
          ],
          "bisGear": [
            { "slot": "Staff / 1H", "item": "Staff of the Blessed Seer", "source": "Razorfen Kraul (Charlga Razorflank)", "stats": "+16 Healing Power, +10 Int, +7 Spi" },
            { "slot": "Chest", "item": "Robe of Arugal", "source": "Shadowfang Keep", "stats": "+10 Int, +5 Spi, +3 Agi" },
            { "slot": "Neck", "item": "Glowing Green Talisman", "source": "Gnomeregan World Drop", "stats": "+8 Int, +4 Sta" }
          ],
          "campingPerk": {
            "name": "Spring of Life (+12% Healing & +15 MP5)",
            "desc": "Camp rest grants +12% bonus healing done and +15 MP5 for 2 hours in dungeons."
          },
          "classQuestNote": "Level 30 completes Air Totem mastery, unlocking Grounding and Windfury totems."
        }
      ]
    },
    "specs": []
  }
};

// Default specs array points to level30 builds
if (typeof window !== 'undefined' && window.WOW_FOREVER_DATA && window.WOW_FOREVER_DATA.classDeepDives && window.WOW_FOREVER_DATA.classDeepDives.shaman) {
  window.WOW_FOREVER_DATA.classDeepDives.shaman.betaBuilds.specs = window.WOW_FOREVER_DATA.classDeepDives.shaman.betaBuilds.level30.specs;
}
}

