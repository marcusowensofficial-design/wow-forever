/**
 * World of Warcraft: Forever - Druid Class Deep Dive Dataset
 * Primary Source: Sodapoppin Level-38 Sky Elf Druid Hands-On Early Access Demo & Closed Beta Forensics
 * Video URL: https://www.youtube.com/watch?v=neTPC3rkJRs
 */

if (typeof window !== 'undefined' && window.WOW_FOREVER_DATA) {
  if (!window.WOW_FOREVER_DATA.classDeepDives) window.WOW_FOREVER_DATA.classDeepDives = {};
  window.WOW_FOREVER_DATA.classDeepDives.druid = {
    id: "druid",
    name: "Druid",
    icon: "🌿",
    color: "#FF7D0A",
    role: "Tank / Healer / Melee & Ranged DPS",
    specs: "Balance (Eclipse/Balance of Nature) • Feral (King of the Jungle/Bear Defense Scaling) • Restoration (Wild Growth/Swiftmend)",
    hasData: true,
    videoTitle: "WoW Forever Druid Class Deep Dive & Sky Elf Racials",
    videoUrl: "https://www.youtube.com/watch?v=neTPC3rkJRs",
    sourceAttribution: "Sodapoppin Level-38 Sky Elf Druid BlizzCon Early Access Demo & Closed Beta Forensics",
    summary: "WoW Forever transforms the Druid experience across all roles: baseline Omen of Clarity and Nature's Grasp, smooth energy regeneration and reworked Furor shifting mechanics, standard out-of-combat resurrection via Revive, alternating-school Eclipse and Balance of Nature in Balance, early Swiftmend and Wild Growth in Restoration, and defense-scaling Bear tanking with King of the Jungle Cat DPS.",

    subTabs: [
      { id: "overview", label: "Full Dossier", icon: "📑" },
      { id: "core", label: "Core Rules & Shifting", icon: "📜" },
      { id: "betaBuilds", label: "Level 20 & 30 Builds", icon: "⚡" },
      { id: "balance", label: "Balance & Eclipse", icon: "🌙" },
      { id: "feral", label: "Feral Cat & Bear Tank", icon: "🐾" },
      { id: "restoration", label: "Restoration & Wild Growth", icon: "🌱" },
      { id: "skyelf", label: "Sky Elf Testing & Races", icon: "🪶" },
      { id: "matrix", label: "Verification Matrix", icon: "🔬" }
    ],

    coreRules: [
      {
        title: "Bear Form Critical Rage Generation (+75%)",
        status: "verified",
        statusLabel: "Verified in Phase 2",
        badge: "Rage Engine (Oct 2026)",
        desc: "In the Phase 2 Level 30 patch, Bear Form and Dire Bear Form generate 75% increased Rage whenever the Druid lands a Critical Strike, solving rage starvation during boss encounters."
      },
      {
        title: "New Talent: Shifting Power (Cat Form)",
        status: "verified",
        statusLabel: "Verified in Phase 2",
        badge: "Energy Surge (Oct 2026)",
        desc: "Tiger's Fury and King of the Jungle have been removed and replaced by Shifting Power (Cat Form only): instantly converts 55% of Base Mana into 40 Energy, supercharging powershifting openers!"
      },
      {
        title: "Shapeshift Disarm Immunity & Swing Timers",
        status: "verified",
        statusLabel: "Verified in Phase 2",
        badge: "Combat QoL (Oct 2026)",
        desc: "All Druid shapeshift forms are now fully immune to Disarm effects! Additionally, casting Faerie Fire in form no longer resets the melee swing timer."
      },
      {
        title: "Swipe Attack Power Scaling (+3%) & Primal Bite Threat",
        status: "verified",
        statusLabel: "Verified in Phase 2",
        badge: "Threat Scaling (Oct 2026)",
        desc: "Swipe correctly benefits from 3% of the Druid's total Attack Power, and Primal Bite threat generation has been roughly doubled for dungeon tanking."
      },
      {
        title: "Baseline Omen of Clarity",
        status: "verified",
        statusLabel: "Verified in Beta",
        badge: "Baseline Keystone",
        desc: "Omen of Clarity is now baseline for all Druids! Clearcasting is not consumed by Wrath or by abilities that cost no resources, functioning cleanly across casting and melee forms."
      },
      {
        title: "Baseline Nature's Grasp",
        status: "verified",
        statusLabel: "Verified in Beta",
        badge: "Baseline Utility",
        desc: "Nature's Grasp is now baseline and no longer requires a talent point, giving all Druids reactive entangling roots when struck by melee attackers."
      },
      {
        title: "Revive (Standard Resurrection)",
        status: "verified",
        statusLabel: "Verified in Beta",
        badge: "Major QoL",
        desc: "Druids now have Revive, a standard out-of-combat resurrection spell, permanently solving the classic 30-minute Rebirth limitation for 5-man dungeon groups."
      },
      {
        title: "Smooth Energy Regeneration",
        status: "verified",
        statusLabel: "Verified in Beta",
        badge: "Resource Modernization",
        desc: "Cat Form energy now regenerates in a smooth, continuous flow rather than discrete, rigid 2-second ticks, providing fluid combat rhythm."
      },
      {
        title: "Furor & Power-Shifting Rework",
        status: "verified",
        statusLabel: "Verified in Beta",
        badge: "Form Architecture",
        desc: "Shapeshifting into Bear/Dire Bear generates 10 Rage. Shifting into Cat Form restores 20% of Energy held when last in Cat Form, plus 2 Energy per second spent outside Bear Form (capped at 20 additional Energy). Traditional Wolfshead power-shifting is completely overhauled."
      },
      {
        title: "Shapeshifting Mana Cost",
        status: "demo",
        statusLabel: "🎙️ Sodapoppin Demo Finding",
        badge: "Mana Budget",
        desc: "Shapeshifting costs 445 mana at level 38 with demo gear, requiring thoughtful form management rather than reckless spam shifting."
      },
      {
        title: "Lacerate Progression Status",
        status: "demo",
        statusLabel: "🎙️ Sodapoppin Demo Finding",
        badge: "Skill Progression",
        desc: "Lacerate was not available on the level-38 character and could not be tested; expected to become available at level 40 or through later trainer ranks."
      },
      {
        title: "Native Cooldown Manager: Druid Essentials",
        status: "verified",
        statusLabel: "Verified in Beta (Oct 8)",
        badge: "Native UI & Edit Mode",
        desc: "Expanded in Beta Build 1.60.6.71890 directly in default HUD Edit Mode. Rotational Spells Tracked: Swiftmend (15s), Wild Growth (6s), Feral Charge (15s), and Bash (1m). Major Defensives & Bursts: Innervate (6m), Rebirth (20m), Barkskin (1m), Frenzied Regeneration (3m), Nature's Swiftness (3m), Tranquility (5m), and Dash (5m). Active Procs & Buffs: Eclipse charges (stores up to 4 rapid Starfire charges), Omen of Clarity / Clearcasting procs, Predator's Swiftness instant-cast procs, Furor energy/rage retention, and Lifebloom stacks."
      }
    ],

    balance: {
      title: "Balance: Eclipse Charges, Balance of Nature & Moonkin Form",
      tagline: "Weave Arcane and Nature spells for alternating damage bonuses, store Eclipse charges for instant Starfires, and armor up in Moonkin Form",
      talents: [
        {
          name: "Eclipse (Starfire Cast Reduction)",
          type: "Signature Balance Keystone",
          cast: "Passive Proc",
          charges: "Up to 4 Charges",
          status: "verified",
          desc: "Casting Wrath reduces the cast time of your next two Starfires. This effect can store up to 4 charges, allowing back-to-back rapid-fire Starfire nukes during heavy burst windows."
        },
        {
          name: "Balance of Nature (School Weaving)",
          type: "Rotational Keystone",
          cast: "Passive",
          status: "verified",
          desc: "Rewards alternating schools: casting Nature spells increases the damage of your next Arcane spell, while casting Arcane spells increases the damage of your next Nature spell!"
        },
        {
          name: "Moonkin Form (306% Armor & 3% Crit)",
          type: "Signature Shapeshift",
          cast: "Instant",
          status: "verified",
          desc: "Shapeshift into Moonkin Form: increases armor contribution from items by 306%, grants +3% spell critical-strike chance to nearby party members, and grants immunity to Polymorph effects."
        },
        {
          name: "Insect Swarm in Balance Tree",
          type: "DoT Relocation",
          cast: "Instant",
          cd: "No Cooldown",
          duration: "12 sec Duration",
          status: "verified",
          desc: "Moved directly into the Balance talent tree: afflicts the target with an insect swarm, dealing Nature damage over 12 seconds and reducing their chance to hit by 2%."
        },
        {
          name: "Nature's Splendor (Extended DoTs/HoTs)",
          type: "Duration Keystone",
          cast: "Passive",
          status: "verified",
          desc: "Increases the duration of Moonfire and Regrowth by 3 seconds, Rejuvenation by 6 seconds, and extends Insect Swarm duration for sustained multi-target pressure."
        },
        {
          name: "Spell Haste & 10% GCD Reduction",
          type: "Burst Haste Talent",
          cast: "Passive Proc",
          duration: "6 sec Duration",
          status: "verified",
          desc: "Non-periodic spell critical strikes increase casting speed and reduce the global cooldown by 10% for 6 seconds."
        },
        {
          name: "Improved Entangling Roots",
          type: "Control Utility",
          cast: "Passive",
          status: "verified",
          desc: "Increases the number of simultaneous rooted targets and allows Entangling Roots to absorb damage without immediately breaking."
        },
        {
          name: "Wrath Cast & Mana Efficiency",
          type: "Rotational Foundation",
          cast: "Passive",
          status: "verified",
          desc: "Reduces Wrath's cast time and mana cost, while increasing periodic spell damage and healing by 5%."
        }
      ]
    },

    feral: {
      title: "Feral: King of the Jungle, Cat Feral Charge & Bear Defense Scaling",
      tagline: "Leap as a Cat with Feral Charge, execute 100% crit Berserk finishers, and scale Bear armor directly from Defense rating",
      talents: [
        {
          name: "King of the Jungle & Tiger's Fury",
          type: "Cat Burst Keystone",
          cast: "Instant",
          cd: "30 sec Cooldown",
          status: "verified",
          desc: "Tiger's Fury increases physical damage by 15% for 6 seconds on a 30s cooldown. King of the Jungle further raises all melee damage against bleeding targets by up to 10%!"
        },
        {
          name: "Berserk (100% Generator Crit)",
          type: "Major Feral Cooldown",
          cast: "Instant",
          cd: "3 min Cooldown",
          duration: "15 sec Duration",
          status: "verified",
          desc: "Removes Mangle's cooldown and gives all combo-point-generating abilities (Claw, Rake, Shred) a 100% critical-strike chance for 15 seconds. Does not apply guaranteed crit to Ferocious Bite."
        },
        {
          name: "Feral Charge (Cat Form Leap)",
          type: "Cat Mobility Keystone",
          cast: "Instant",
          range: "8-25 Yards",
          cd: "15 sec Cooldown",
          status: "verified",
          desc: "Cat Form now gains its own dedicated version of Feral Charge! Leaps behind the target, dazing them and allowing immediate Shred positioning."
        },
        {
          name: "Bear Defense-to-Armor Scaling",
          type: "Tank Mitigation Keystone",
          cast: "Passive",
          status: "verified",
          desc: "Grants additional base armor per level and converts Defense rating above the normal 5x level threshold into additional armor, amplified by Bear Form multipliers. Makes Defense rating a premier Bear tank stat!"
        },
        {
          name: "Heart of the Wild (Early Placement)",
          type: "Hybrid Stat Keystone",
          cast: "Passive",
          status: "verified",
          desc: "Moved significantly earlier in the Feral tree: increases total Intellect by 10%, Bear Form Stamina by 20%, and Cat Form Strength by 10%."
        },
        {
          name: "Mangle (Bear & Dire Bear)",
          type: "Signature Tank Attack",
          cast: "Instant",
          cost: "15 Rage",
          cd: "6 sec Cooldown",
          status: "verified",
          desc: "Delivers a ferocious strike in Bear/Dire Bear form, dealing high physical damage, generating massive threat, and increasing bleed damage taken by the target."
        },
        {
          name: "Leader of the Pack (3% Crit)",
          type: "Party Aura",
          cast: "Passive Aura",
          status: "verified",
          desc: "Increases ranged and melee critical-strike chance of all party members within 45 yards by 3% while in Cat, Bear, or Dire Bear form."
        },
        {
          name: "Feral Instinct (Swipe & Stealth)",
          type: "Utility & AoE",
          cast: "Passive",
          status: "verified",
          desc: "Increases Swipe damage and lowers enemy stealth detection while prowling; no longer lists increased threat generation."
        }
      ]
    },

    restoration: {
      title: "Restoration: Wild Growth, Swiftmend & 0.5s GCD Reduction",
      tagline: "Blanket the party in Wild Growth, burst-heal with non-consuming Swiftmend, and slash HoT global cooldowns by 0.5 seconds",
      talents: [
        {
          name: "Wild Growth (Level 40 Party HoT)",
          type: "New Signature AoE HoT",
          cast: "Instant",
          cd: "6 sec Cooldown",
          duration: "7 sec Duration",
          status: "verified",
          desc: "Heals the target and up to 4 injured party members within 15 yards over 7 seconds. The amount healed is highest initially and rolls off over time, providing massive emergency group throughput."
        },
        {
          name: "Swiftmend (Early Placement)",
          type: "Instant Burst Heal",
          cast: "Instant",
          cd: "15 sec Cooldown",
          status: "verified",
          desc: "Moved much earlier in the Restoration tree: instantly heals a friendly target affected by Rejuvenation or Regrowth for burst healing without consuming the underlying HoT effect."
        },
        {
          name: "0.5s Global Cooldown Reduction",
          type: "Rotational Acceleration",
          cast: "Passive",
          status: "verified",
          desc: "Reduces the global cooldown of Rejuvenation, Swiftmend, and Wild Growth by 0.5 seconds (down to 1.0s), enabling lightning-fast multi-target HoT blanketing."
        },
        {
          name: "Improved Tranquility (5m CD & Low Threat)",
          type: "Raid Cooldown Enhancement",
          cast: "Channeled",
          cd: "5 min Cooldown",
          status: "verified",
          desc: "Reduces Tranquility's baseline 5-minute cooldown and significantly lowers the threat generated by its powerful party-wide channeled heals."
        },
        {
          name: "Naturalist (Cast Time & Damage)",
          type: "Dual-Role Scaling",
          cast: "Passive",
          status: "verified",
          desc: "Reduces the cast time of Healing Touch by up to 0.5 seconds and increases all physical and spell damage dealt by 1% per talent rank."
        },
        {
          name: "Nature's Focus (Anti-Pushback)",
          type: "Casting Protection",
          cast: "Passive",
          status: "verified",
          desc: "Gives your Healing Touch, Regrowth, and Tranquility a 70% chance not to lose casting time when taking damage from Nature and Arcane sources."
        },
        {
          name: "Nature's Swiftness",
          type: "Emergency Cooldown",
          cast: "Instant",
          cd: "3 min Cooldown",
          status: "verified",
          desc: "When activated, makes your next Nature spell with a casting time less than 10 seconds become an instant cast, pairing perfectly with max-rank Healing Touch."
        },
        {
          name: "Subtlety & Improved Rejuvenation",
          type: "Threat & HoT Power",
          cast: "Passive",
          status: "verified",
          desc: "Reduces threat generated by healing spells by 20% and increases the healing done by Rejuvenation by 15%."
        }
      ]
    },

    racialSynergies: {
      skyElfDemo: {
        title: "Sodapoppin's Sky Elf Druid Hands-On Demo Findings",
        subtitle: "Forensic testing of the new Skyborne (Sky Elf) race on a Druid in the BlizzCon 2026 early access demo",
        items: [
          {
            name: "Walk on Air (10s Directional Glide)",
            status: "verified",
            statusLabel: "Verified in Beta",
            desc: "Active racial granting a 10-second directional glide on a 2-minute cooldown. Allows traversal over chasms and high cliffs without fall damage."
          },
          {
            name: "Wind Blessed (Speed & 1% Haste)",
            status: "verified",
            statusLabel: "Verified in Beta",
            desc: "Blessing granting +10% movement and mount speed (lasts 30s normally or 15m after finding an elemental convergence), plus a passive 1% haste to melee, ranged, and spellcasting."
          },
          {
            name: "Elemental Insight (+5% Elemental Damage)",
            status: "verified",
            statusLabel: "Verified in Beta",
            desc: "Increases damage dealt to Elemental creatures by 5%, aiding in dungeon and raid progression."
          },
          {
            name: "Avian Shapeshift Customizations",
            status: "verified",
            statusLabel: "Verified in Beta",
            desc: "Features unique visual customizations for Bear, Cat, Moonkin, and Travel forms with feathers, runes, and elemental glowing accents."
          }
        ]
      },
      newRaces: [
        {
          race: "Sky Elf (Skyborne) Druid",
          faction: "Neutral (Alliance / Horde)",
          badge: "✦ NEW IN FOREVER",
          desc: "Avian-infused scholars with Walk on Air (glide), Wind Blessed (+10% speed / +1% haste), and unique feathered shapeshift forms. Can choose either faction."
        },
        {
          race: "Night Elf Druid",
          faction: "Alliance",
          badge: "Classic Standard",
          desc: "In-combat Shadowmeld threat drop, Elune's Light (+10% crit burst for 15s), Quickness (+1% dodge, +2% run speed), and Starshards."
        },
        {
          race: "Tauren Druid",
          faction: "Horde",
          badge: "Classic Standard",
          desc: "Endurance (+5% base HP -> multiplies with Bear Form Stamina), War Stomp (2s AoE stun), and Plains Running mobility."
        }
      ]
    },

    forensicMatrix: [
      {
        feature: "Baseline Omen of Clarity",
        category: "Core Mechanics",
        details: "Omen of Clarity is baseline; Clearcasting not consumed by Wrath or free spells",
        status: "Verified in Closed Beta",
        statusType: "verified",
        source: "Sodapoppin Hands-On Demo & Tooltip"
      },
      {
        feature: "Baseline Nature's Grasp",
        category: "Core Mechanics",
        details: "Learned as a baseline class spell; no talent points required",
        status: "Verified in Closed Beta",
        statusType: "verified",
        source: "Sodapoppin Hands-On Demo"
      },
      {
        feature: "Revive (Standard Resurrection)",
        category: "Core Mechanics",
        details: "Standard out-of-combat resurrection spell for 5-man dungeon groups",
        status: "Verified in Closed Beta",
        statusType: "verified",
        source: "Sodapoppin Hands-On Demo"
      },
      {
        feature: "Smooth Energy Regeneration",
        category: "Core Mechanics",
        details: "Cat Form energy regenerates smoothly rather than in 2-second 20-energy ticks",
        status: "Verified in Closed Beta",
        statusType: "verified",
        source: "Sodapoppin Hands-On Demo"
      },
      {
        feature: "Furor Shifting Rework",
        category: "Core Mechanics",
        details: "Bear gains 10 Rage; Cat restores 20% held Energy + 2 Energy/s outside Bear (max +20)",
        status: "Verified in Closed Beta",
        statusType: "verified",
        source: "Sodapoppin Hands-On Demo"
      },
      {
        feature: "Eclipse Starfire Reduction",
        category: "Balance",
        details: "Wrath reduces cast time of next 2 Starfires; stores up to 4 charges",
        status: "Verified in Closed Beta",
        statusType: "verified",
        source: "Sodapoppin Hands-On Demo"
      },
      {
        feature: "Balance of Nature",
        category: "Balance",
        details: "Nature spells buff next Arcane spell; Arcane spells buff next Nature spell",
        status: "Verified in Closed Beta",
        statusType: "verified",
        source: "Sodapoppin Hands-On Demo"
      },
      {
        feature: "Moonkin Form (306% Armor)",
        category: "Balance",
        details: "306% armor from items, +3% party spell crit, Polymorph immunity",
        status: "Verified in Closed Beta",
        statusType: "verified",
        source: "Sodapoppin Hands-On Demo"
      },
      {
        feature: "Insect Swarm in Balance",
        category: "Balance",
        details: "Moved from Restoration into the Balance talent tree",
        status: "Verified in Closed Beta",
        statusType: "verified",
        source: "Sodapoppin Hands-On Demo"
      },
      {
        feature: "Wild Growth (Level 40)",
        category: "Restoration",
        details: "Instant-cast party HoT over 7 seconds; high throughput",
        status: "Verified in Closed Beta",
        statusType: "verified",
        source: "Sodapoppin Hands-On Demo"
      },
      {
        feature: "Swiftmend Early Placement",
        category: "Restoration",
        details: "Placed early in Restoration; does not consume active HoTs",
        status: "Verified in Closed Beta",
        statusType: "verified",
        source: "Sodapoppin Hands-On Demo"
      },
      {
        feature: "0.5s GCD Reduction on HoTs",
        category: "Restoration",
        details: "Lowers GCD of Rejuvenation, Swiftmend, and Wild Growth by 0.5 seconds",
        status: "Verified in Closed Beta",
        statusType: "verified",
        source: "Sodapoppin Hands-On Demo"
      },
      {
        feature: "King of the Jungle & Tiger's Fury",
        category: "Feral",
        details: "Tiger's Fury +15% phys dmg (6s/30s CD); King of Jungle +10% dmg on bleeding targets",
        status: "Verified in Closed Beta",
        statusType: "verified",
        source: "Sodapoppin Hands-On Demo"
      },
      {
        feature: "Berserk (100% Generator Crit)",
        category: "Feral",
        details: "Removes Mangle CD and grants 100% crit to combo generators for 15s",
        status: "Verified in Closed Beta",
        statusType: "verified",
        source: "Sodapoppin Hands-On Demo"
      },
      {
        feature: "Cat Form Feral Charge",
        category: "Feral",
        details: "Dedicated Cat Form leap behind target; dazes enemy",
        status: "Verified in Closed Beta",
        statusType: "verified",
        source: "Sodapoppin Hands-On Demo"
      },
      {
        feature: "Bear Defense-to-Armor Scaling",
        category: "Feral Tanking",
        details: "Defense rating above cap converts to armor, multiplied by Bear Form",
        status: "Verified in Closed Beta",
        statusType: "verified",
        source: "Sodapoppin Hands-On Demo"
      },
      {
        feature: "Heart of the Wild Early Placement",
        category: "Feral",
        details: "Available earlier: +10% Int, +20% Bear Stamina, +10% Cat Strength",
        status: "Verified in Closed Beta",
        statusType: "verified",
        source: "Sodapoppin Hands-On Demo"
      },
      {
        feature: "Sky Elf Walk on Air",
        category: "Sky Elf Racials",
        details: "10-second directional glide on a 2-minute cooldown",
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
            specId: "feral_cat",
            name: "Feral DPS (Cat Form Agility)",
            icon: "🐾",
            role: "Melee Bleed & Burst DPS",
            buildUrl: "/talents/druid?b=-551000--&l=20",
            wowheadCalcUrl: "https://www.wowhead.com/forever/talent-calc/druid/-505001",
            tagline: "Weapon DPS scaling, energy efficiency, and Ferocious Bite crits inside the new level-20 Cat Form.",
            statPriority: "Weapon DPS > Agility > Strength > Hit",
            bestWeapon: "Two-Handed Mace / Staff with High Top-End (Smite's Mighty Hammer / Manual Crowd Pummeler prep)",
            talents: [
              { name: "Ferocity", points: "5/5", tree: "Feral (Tier 1)", desc: "Reduces the cost of your Maul, Swipe, Claw, and Rake abilities by 5 Rage or Energy." },
              { name: "Feral Aggression", points: "5/5", tree: "Feral (Tier 1)", desc: "Increases damage dealt by Ferocious Bite by 15% and Demoralizing Roar attack power reduction by 40%." },
              { name: "Feral Instinct", points: "1/5", tree: "Feral (Tier 2)", desc: "Increases threat in Bear Form by 3% and reduces chance for enemies to detect you while Prowling." }
            ],
            legacyNotes: "Extra points obtained through Legacy Discovery unlock Sharpened Claws (+6% crit) and Blood Frenzy (combo point generation).",
            rotation: [
              { label: "Prowl Opener", desc: "Prowl -> Ravage or Shred from behind (Sap no longer breaks stealth in party play)." },
              { label: "Bleed & Build", desc: "Rake bleed upkeep -> Claw (now only 40 Energy with Ferocity) to 4-5 combo points." },
              { label: "Execute", desc: "Ferocious Bite finisher; weapon damage scaling directly enhances Bite output in Forever." },
              { label: "Viper Form Bonus", desc: "Wearing the complete 5-piece Embrace of the Viper set from WC unlocks cosmetic serpent shifting!" }
            ],
            bisGear: [
              { slot: "Two-Hand Weapon", item: "Smite's Mighty Hammer", source: "Deadmines (Mr. Smite)", stats: "+11 Strength, 19.8 DPS" },
              { slot: "Armor Set", item: "Embrace of the Viper (5-Piece)", source: "Wailing Caverns Leaders", stats: "+10 Agility, +5 Intellect, Serpent Form" },
              { slot: "Staff (Alt)", item: "Wild Thane Staff", source: "Hall of Thanes (Dungeon Boss)", stats: "+6 Agi, +6 Str, 18.0 DPS" },
              { slot: "Ring", item: "Lavishly Jeweled Ring", source: "Deadmines (Gilnid)", stats: "+6 Agi, +2 Int" }
            ],
            campingPerk: {
              name: "Primal Instinct (+5% Agility & Strength)",
              desc: "Setting camp with a Cozy Sleeping Bag provides 200% rested XP rate and grants the 'Wild Senses' 2-hour +5% Agi/Str buff."
            },
            classQuestNote: "Cat Form is granted at level 20 via dedicated trial quest; Aquatic Form unlocked at level 16 in Moonglade."
          },
          {
            specId: "feral_bear",
            name: "Feral Tank (Bear Form Meatshield)",
            icon: "🐻",
            role: "Dungeon Main Tank",
            buildUrl: "/talents/druid?b=-550100--&l=20",
            wowheadCalcUrl: "https://www.wowhead.com/forever/talent-calc/druid/-500501",
            tagline: "Unbreakable armor scaling (+10% items armor) and massive health pool holding dungeon trash effortlessly.",
            statPriority: "Stamina > Armor > Strength > Agility",
            bestWeapon: "Two-Handed Mace / Staff with High Stamina",
            talents: [
              { name: "Ferocity", points: "5/5", tree: "Feral (Tier 1)", desc: "Reduces the Rage cost of Maul and Swipe by 5, enabling smooth threat on every swing." },
              { name: "Thick Hide", points: "5/5", tree: "Feral (Tier 1)", desc: "Increases your Armor rating from items by 10% (amplified to over +28% total armor in Bear Form!)." },
              { name: "Brutal Impact", points: "1/2", tree: "Feral (Tier 2)", desc: "Increases the stun duration of your Bash and Pounce abilities by 0.5 sec." }
            ],
            legacyNotes: "Extra Legacy points unlock Feral Charge (interrupt/root in Bear Form) and Heart of the Wild (+20% Stamina).",
            rotation: [
              { label: "Pull & Group", desc: "Enrage -> Bear Form Charge -> Demoralizing Roar to lower enemy physical damage." },
              { label: "Threat Cycle", desc: "Maul on primary target -> Swipe on multiple dungeon adds -> Bash caster mobs." }
            ],
            bisGear: [
              { slot: "Two-Hand", item: "Living Root", source: "Wailing Caverns (Verdan)", stats: "+6 Spi, +5 Sta, 14.8 DPS" },
              { slot: "Chest", item: "Mutant Scale Breastplate", source: "Wailing Caverns", stats: "+9 Agi, +4 Sta" },
              { slot: "Back", item: "Kresh's Back", source: "Wailing Caverns (Kresh)", stats: "450 Armor, 13 Block, +7 Sta" }
            ],
            campingPerk: {
              name: "Hearth of Iron (+12% Armor in Bear Form)",
              desc: "Camp rest bonus increases Bear Form armor contribution by an extra 12% for 2 hours."
            },
            classQuestNote: "Bear Form quest grants the level-10 Bear Form; level 20 unlocks Frenzied Regeneration."
          },
          {
            specId: "balance",
            name: "Balance (Starlight Wrath Caster)",
            icon: "🌙",
            role: "Ranged Nature & Arcane DPS",
            buildUrl: "/talents/druid?b=551000--&l=20",
            wowheadCalcUrl: "https://www.wowhead.com/forever/talent-calc/druid/505001",
            tagline: "Rapid Wrath casting (-0.5s cast) and empowered Moonfire critical DoTs.",
            statPriority: "Spell Power > Nature Damage > Intellect > Spirit",
            bestWeapon: "Two-Handed Staff (Emberstone Staff / Staff of Westfall)",
            talents: [
              { name: "Starlight Wrath", points: "5/5", tree: "Balance (Tier 1)", desc: "Reduces the cast time of your Wrath and Starfire spells by 0.5 sec." },
              { name: "Improved Moonfire", points: "5/5", tree: "Balance (Tier 1)", desc: "Increases the damage and critical strike chance of Moonfire by 10%." },
              { name: "Nature's Reach", points: "1/2", tree: "Balance (Tier 2)", desc: "Increases the range of your Wrath, Entangling Roots, Faerie Fire, and Moonfire by 10%." }
            ],
            legacyNotes: "Extra Legacy points unlock 2/2 Nature's Grace (-0.5s cast after spell crit) and Moonkin Form.",
            rotation: [
              { label: "Rotation", desc: "Faerie Fire (decreases enemy armor) -> Moonfire -> Wrath spam." },
              { label: "Outdoor Kite", desc: "Entangling Roots rank 1 to root melee mobs while casting Wrath at 33 yards." }
            ],
            bisGear: [
              { slot: "Staff", item: "Staff of Westfall", source: "Deadmines Quest", stats: "+11 Int, +5 Spi" },
              { slot: "Robe", item: "Robe of Arugal", source: "Shadowfang Keep", stats: "+10 Int, +5 Spi, +3 Agi" }
            ],
            campingPerk: {
              name: "Lunar Guidance (+5% Spell Power)",
              desc: "Camp resting grants +5% bonus Spell Power and 10% Nature damage increase for 2 hours."
            },
            classQuestNote: "Level 20 unlocks Teleport: Moonglade rank 2 and herbalism synergy perks."
          }
        ]
      },
      level30: {
        levelCap: 30,
        talentPointsTotal: 21,
        legacyPointsNotice: "Legacy Milestones allow up to +5 additional points at Level 30 (26 total points).",
        specs: [
          {
            specId: "feral_cat",
            name: "Feral DPS (Cat Form Agility & Shifting Power)",
            icon: "🐾",
            role: "Melee Bleed & Energy Engine",
            buildUrl: "/talents/druid?b=-50230021231022110001-&l=30&tl=5",
            wowheadCalcUrl: "https://www.wowhead.com/forever/talent-calc/druid/-505001",
            tagline: "Uncapped Energy pooling via the new Shifting Power keystone (converts 55% base mana into 40 Energy in Cat Form), disarm immunity, and vicious Ferocious Bite crits.",
            statPriority: "Weapon Top-End DPS > Agility > Strength > Hit",
            bestWeapon: "Manual Crowd Pummeler (Gnomeregan) / Smite's Mighty Hammer / Excavation Heavy Mallet",
            talents: [
              { name: "Ferocity", points: "5/5", tree: "Feral (Tier 1)", desc: "Reduces the cost of your Maul, Swipe, Claw, and Rake abilities by 5 Rage or Energy." },
              { name: "Feral Aggression", points: "5/5", tree: "Feral (Tier 1)", desc: "Increases damage dealt by Ferocious Bite by 15% and Demoralizing Roar attack power reduction by 40%." },
              { name: "Sharpened Claws", points: "3/3", tree: "Feral (Tier 2)", desc: "Increases your critical strike chance while in Bear, Dire Bear, or Cat Form by 6%." },
              { name: "Shifting Power", points: "1/1", tree: "Feral (Tier 3 Keystone - NEW)", desc: "Druid Classic+ Keystone: In Cat Form, instantly converts 55% base mana into 40 Energy on a 45s cooldown. Provides immense sustained DPS during boss burn windows." },
              { name: "Blood Frenzy", points: "2/2", tree: "Feral (Tier 3)", desc: "Your critical strikes from Cat Form abilities that add combo points have a 100% chance to add an additional combo point." },
              { name: "Predatory Strikes", points: "3/3", tree: "Feral (Tier 4)", desc: "Increases your melee attack power in Cat, Bear, and Dire Bear Forms by 150% of your level." },
              { name: "Faerie Fire (Feral)", points: "1/1", tree: "Feral (Tier 4 Keystone)", desc: "Instant ranged armor reduction usable in form that does not reset your melee swing timer." },
              { name: "Feral Charge", points: "1/1", tree: "Feral (Tier 3)", desc: "Causes you to charge an enemy, immobilizing them for 4 sec and interrupting any spellcasting." }
            ],
            legacyNotes: "Extra Legacy discovery points unlock Heart of the Wild (+10% Strength / +20% Stamina) and Furor (retains 40 Energy on shift).",
            rotation: [
              { label: "Opener", desc: "Prowl -> Ravage / Shred from behind (Shapeshift forms are now fully immune to Disarm!)." },
              { label: "Faerie Fire & Bleed", desc: "Apply Faerie Fire (Feral) instantly without interrupting swing timer -> Rake bleed." },
              { label: "Energy Engine", desc: "Claw to 4-5 CP -> When energy dips below 20, activate NEW Shifting Power to gain +40 Energy immediately." },
              { label: "Execute", desc: "Ferocious Bite finisher with full AP bonus from Predatory Strikes." }
            ],
            bisGear: [
              { slot: "Two-Hand Weapon", item: "Manual Crowd Pummeler", source: "Gnomeregan (Crowd Pummeler 9-60)", stats: "31.5 DPS, +50% Attack Speed 3-use charge" },
              { slot: "Legs", item: "Triprunner Dungarees", source: "Gnomeregan Quest", stats: "+18 Agility, +2 Strength" },
              { slot: "Chest", item: "Excavator's Tunic", source: "Excavation Site: Wetlands", stats: "+12 Agi, +8 Sta" },
              { slot: "Shoulders", item: "Forest Tracker Shoulders", source: "Blackfathom Deeps", stats: "+8 Agi, +6 Sta" },
              { slot: "Ring", item: "Lavishly Jeweled Ring", source: "Deadmines (Gilnid)", stats: "+6 Agi, +2 Int" }
            ],
            campingPerk: {
              name: "Primal Instinct (+5% Agility & Strength)",
              desc: "Setting camp with a Cozy Sleeping Bag provides 200% rested XP rate and grants the 'Wild Senses' 2-hour +5% Agi/Str buff."
            },
            classQuestNote: "Level 30 Druids gain Travel Form (40% outdoor movement speed) at trainers across Moonglade and capital cities."
          },
          {
            specId: "feral_bear",
            name: "Feral Tank (Bear Form +75% Rage Crits & Meatshield)",
            icon: "🐻",
            role: "Dungeon Main Tank",
            buildUrl: "/talents/druid?b=-552300212210201-&l=30&tl=5",
            wowheadCalcUrl: "https://www.wowhead.com/forever/talent-calc/druid/-500501",
            tagline: "Massive +75% Rage on critical strikes, 3% AP Swipe scaling, Disarm immunity, and unshakeable threat from doubled Primal Bite threat multipliers.",
            statPriority: "Stamina > Armor > Strength > Agility > Defense",
            bestWeapon: "Manual Crowd Pummeler / Living Root / Excavation Site Ironwood Maul",
            talents: [
              { name: "Ferocity", points: "5/5", tree: "Feral (Tier 1)", desc: "Reduces the Rage cost of Maul and Swipe by 5, enabling smooth spam threat." },
              { name: "Thick Hide", points: "5/5", tree: "Feral (Tier 1)", desc: "Increases your Armor rating from items by 10% (amplified to over +28% total armor in Bear Form)." },
              { name: "Feral Instinct", points: "3/5", tree: "Feral (Tier 2)", desc: "Increases threat generated in Bear Form by 9%." },
              { name: "Brutal Impact", points: "2/2", tree: "Feral (Tier 2)", desc: "Increases the stun duration of your Bash and Pounce abilities by 1.0 sec." },
              { name: "Feral Charge", points: "1/1", tree: "Feral (Tier 3 Keystone)", desc: "Charges an enemy, immobilizing for 4s and interrupting casts with a 15s cooldown." },
              { name: "Sharpened Claws", points: "3/3", tree: "Feral (Tier 2)", desc: "Increases critical strike chance by 6%, supercharging the +75% Rage generated on crits." },
              { name: "Primal Fury", points: "2/2", tree: "Feral (Tier 3)", desc: "Gives you a 100% chance to gain an additional 5 Rage whenever you score a critical strike in Bear Form." }
            ],
            legacyNotes: "Extra Legacy discovery points unlock Heart of the Wild (+20% Stamina) for immense 2,000+ HP dungeon tank pools.",
            rotation: [
              { label: "Pull & Gap-Close", desc: "Enrage -> Feral Charge -> Demoralizing Roar (Forms are now immune to Disarm!)." },
              { label: "Rage Generation", desc: "Auto-attack crits now generate +75% Rage; every crit gives bonus Rage to fund constant Maul attacks." },
              { label: "AoE Multi-Mob", desc: "Swipe on cooldown (Swipe now scales directly with 3% Attack Power in Phase 2!)." },
              { label: "Interruption", desc: "Bash or Feral Charge to lock down elite spellcasters in Dalaran and Excavation Site." }
            ],
            bisGear: [
              { slot: "Two-Hand", item: "Manual Crowd Pummeler", source: "Gnomeregan", stats: "31.5 DPS, +50% Attack Speed activation for huge snap threat" },
              { slot: "Chest", item: "Tortoise Armor", source: "Excavation Site: Wetlands (Boss)", stats: "260 Armor, +14 Sta, +6 Str" },
              { slot: "Back", item: "Kresh's Back", source: "Wailing Caverns (Kresh)", stats: "450 Armor, 13 Block, +7 Sta" },
              { slot: "Shield / Offhand", item: "Living Root", source: "Wailing Caverns", stats: "+6 Spi, +5 Sta, 14.8 DPS" }
            ],
            campingPerk: {
              name: "Hearth of Iron (+12% Armor in Bear Form)",
              desc: "Camp rest bonus increases Bear Form armor contribution by an extra 12% for 2 hours."
            },
            classQuestNote: "Bear Form Frenzied Regeneration and Barkskin available for emergency tank damage smoothing."
          },
          {
            specId: "balance",
            name: "Balance (Moonkin Form & Starlight Wrath)",
            icon: "🌙",
            role: "Ranged Nature & Arcane DPS",
            buildUrl: "/talents/druid?b=50322201140213--&l=30&tl=5",
            wowheadCalcUrl: "https://www.wowhead.com/forever/talent-calc/druid/505001",
            tagline: "Signature Moonkin Form (+306% Armor, +3% party spell crit), alternating Eclipse procs, and rapid-fire Starfire nukes.",
            statPriority: "Spell Power > Nature / Arcane Damage > Intellect > Spirit",
            bestWeapon: "Rod of the Sleepwalker (BFD) / Staff of the Blessed Seer / Staff of Westfall",
            talents: [
              { name: "Starlight Wrath", points: "5/5", tree: "Balance (Tier 1)", desc: "Reduces the cast time of your Wrath and Starfire spells by 0.5 sec." },
              { name: "Improved Moonfire", points: "5/5", tree: "Balance (Tier 1)", desc: "Increases the damage and critical strike chance of Moonfire by 10%." },
              { name: "Nature's Reach", points: "2/2", tree: "Balance (Tier 2)", desc: "Increases the range of your Wrath, Entangling Roots, Faerie Fire, and Moonfire by 20%." },
              { name: "Nature's Grace", points: "1/1", tree: "Balance (Tier 3 Keystone)", desc: "All spell criticals grace you with a blessing of nature, reducing the cast time of your next spell by 0.5 sec." },
              { name: "Moonglow", points: "3/3", tree: "Balance (Tier 3)", desc: "Reduces the Mana cost of your Moonfire, Starfire, Wrath, Healing Touch, Regrowth and Rejuvenation by 9%." },
              { name: "Moonkin Form", points: "1/1", tree: "Balance (Tier 5 Keystone)", desc: "Shapeshift into Moonkin Form: increases armor contribution from items by 306% and grants +3% spell critical chance to party." },
              { name: "Vengeance", points: "4/5", tree: "Balance (Tier 4)", desc: "Increases the critical strike damage bonus of your Starfire, Moonfire, and Wrath spells by 80%." }
            ],
            legacyNotes: "Extra Legacy discovery points max out 5/5 Vengeance (+100% crit damage) and Balance of Nature school weaving.",
            rotation: [
              { label: "School Weaving", desc: "Faerie Fire -> Moonfire (DoT + crit debuff) -> Wrath spam until Eclipse charges proc." },
              { label: "Eclipse Burst", desc: "Spend stored Eclipse charges to cast instantaneous/rapid-fire Starfire nukes with Vengeance bonus." },
              { label: "Armor & Utility", desc: "Moonkin Form provides massive armor against physical dungeon mobs and polymorph immunity." }
            ],
            bisGear: [
              { slot: "Staff", item: "Rod of the Sleepwalker", source: "Blackfathom Deeps (Twilight Lord Kelris)", stats: "+11 Spell Power, +7 Int, +4 Sta" },
              { slot: "Robe", item: "Robes of the Kirin Tor", source: "City of Dalaran (Archmage Boss)", stats: "+14 Spell Power, +10 Int, +6 Spi" },
              { slot: "Shoulders", item: "Feline Mantle", source: "Shadowfang Keep", stats: "+10 Int, +3 Spi, +2 Sta" }
            ],
            campingPerk: {
              name: "Lunar Guidance (+5% Spell Power)",
              desc: "Camp resting grants +5% bonus Spell Power and 10% Nature damage increase for 2 hours."
            },
            classQuestNote: "Moonglade Teleport provides instant access to Phase 2 trainer upgrades and herbalism reagents."
          },
          {
            specId: "restoration",
            name: "Restoration (Swiftmend & Wild Growth HoTs)",
            icon: "🌿",
            role: "Dungeon Healer & Sustained Regeneration",
            buildUrl: "/talents/druid?b=--5050035103112&l=30&tl=5",
            wowheadCalcUrl: "https://www.wowhead.com/forever/talent-calc/druid/--505001",
            tagline: "Instant emergency triage through Swiftmend, multi-target party stabilization, and high mana regen under Reflection.",
            statPriority: "Healing Power > Spirit > Intellect > Mp5",
            bestWeapon: "Dalaran Healer Gavel + Cursed Shadow Tome / Rod of the Sleepwalker",
            talents: [
              { name: "Improved Mark of the Wild", points: "5/5", tree: "Restoration (Tier 1)", desc: "Increases the effects of your Mark of the Wild and Gift of the Wild spells by 35%." },
              { name: "Nature's Focus", points: "5/5", tree: "Restoration (Tier 1)", desc: "Gives you a 70% chance to avoid interruption caused by damage while casting Healing Touch or Regrowth." },
              { name: "Improved Healing Touch", points: "5/5", tree: "Restoration (Tier 2)", desc: "Reduces the cast time of your Healing Touch spell by 0.5 sec." },
              { name: "Reflection", points: "3/3", tree: "Restoration (Tier 3)", desc: "Allows 15% of your Mana regeneration to continue while casting." },
              { name: "Insect Swarm", points: "1/1", tree: "Restoration (Tier 3 Keystone)", desc: "Deals Nature damage over 12 sec and reduces target's physical hit chance by 2% for tank damage mitigation." },
              { name: "Swiftmend", points: "1/1", tree: "Restoration (Tier 5 Keystone)", desc: "Consumes a Rejuvenation or Regrowth effect on a friendly target to instantly heal them for an immense burst amount." },
              { name: "Subtlety", points: "1/5", tree: "Restoration (Tier 2)", desc: "Reduces threat generated by your healing spells by 4%." }
            ],
            legacyNotes: "Extra Legacy discovery points unlock Nature's Swiftness (instant cast heal on 3-minute cooldown) and Gift of Nature (+10% healing).",
            rotation: [
              { label: "HoT Blanket", desc: "Pre-cast Rejuvenation on the tank before pulling -> Regrowth for direct heal + secondary HoT." },
              { label: "Swiftmend Triage", desc: "When the tank or party spikes low, consume an active HoT with Swiftmend for instant massive burst recovery." },
              { label: "Mana Sustain", desc: "Take advantage of Reflection to regenerate mana during low damage phases." }
            ],
            bisGear: [
              { slot: "One-Hand Mace", item: "Gavel of the Crystal Lake", source: "Excavation Site: Wetlands", stats: "+14 Healing Power, +6 Int, +4 Spi" },
              { slot: "Chest", item: "Robes of Dalaran Caretaker", source: "City of Dalaran (Hospital Wing)", stats: "+18 Healing Power, +8 Int, +6 Spi" },
              { slot: "Hands", item: "Gloves of the Fang", source: "Wailing Caverns", stats: "+4 Agi, +4 Int, +4 Spi" }
            ],
            campingPerk: {
              name: "Grove Blessing (+8% Healing Power)",
              desc: "Resting beside an active Campfire grants +8% bonus Healing Power and 10% faster Mana regeneration while out of combat."
            },
            classQuestNote: "Level 20 unlocks Aquatic Form and Level 30 unlocks Travel Form for swift outdoor positioning."
          }
        ]
      },
      specs: []
    }
  };
  WOW_FOREVER_DATA.classDeepDives.druid.betaBuilds.specs = WOW_FOREVER_DATA.classDeepDives.druid.betaBuilds.level30.specs;
}
