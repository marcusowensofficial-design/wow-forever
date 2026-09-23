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
      "label": "⚡ Beta L20 Builds",
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
    "season": "Closed Beta Phase 1",
    "levelCap": 20,
    "talentPointsTotal": 11,
    "legacyPointsNotice": "Legacy Milestones allow up to +2 to +5 additional points at Level 20.",
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
        "statPriority: ": "Stamina > Armor > Strength > Agility",
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
          { "name": "Convection", "points": "5/5", "tree": "Elemental (Tier 1)", desc: "Reduces the Mana cost of your Shock, Lightning Bolt, and Chain Lightning spells by 10%." },
          { "name": "Conduction", "points": "5/5", tree: "Elemental (Tier 2)", desc: "Increases the damage done by your Lightning Bolt, Chain Lightning, and Shock spells by 5%." },
          { "name": "Earth's Grasp", "points": "1/2", tree: "Elemental (Tier 2)", desc: "Increases the health of your Stoneclaw Totem and the radius of your Earthbind Totem by 25%." }
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
      }
    ]
  }
};
}
