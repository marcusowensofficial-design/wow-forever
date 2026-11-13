/**
 * World of Warcraft: Forever - Druid Class Deep Dive Dataset
 * Primary Source: Sodapoppin video "WoW Forever's Druid Looks Absolutely Insane!" (beta) — talent values re-checked against live build 1.60.1.70938 on Nov 13, 2026
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
    videoTitle: "Sodapoppin: WoW Forever's Druid Looks Absolutely Insane!",
    videoUrl: "https://www.youtube.com/watch?v=neTPC3rkJRs",
    sourceAttribution: "Sodapoppin video \"WoW Forever's Druid Looks Absolutely Insane!\" (beta) — talent values re-checked against live build 1.60.1.70938 on Nov 13, 2026",
    summary: "WoW Forever transforms the Druid experience across all roles: baseline Omen of Clarity and Nature's Grasp, smooth energy regeneration and reworked Furor shifting mechanics, standard out-of-combat resurrection via Revive, alternating-school Eclipse and Balance of Nature in Balance, early Swiftmend and Wild Growth in Restoration, and defense-scaling Bear tanking with King of the Jungle Cat DPS.",

    subTabs: [
      { id: "overview", label: "Full Dossier", icon: "📑" },
      { id: "core", label: "Core Rules & Shifting", icon: "📜" },
      { id: "betaBuilds", label: "Level 20 & 30 Builds", icon: "⚡" },
      { id: "balance", label: "Balance & Eclipse", icon: "🌙" },
      { id: "feral", label: "Feral Cat & Bear Tank", icon: "🐾" },
      { id: "restoration", label: "Restoration & Wild Growth", icon: "🌱" },
      { id: "skyelf", label: "Skyborne Testing & Races", icon: "🪶" },
      { id: "matrix", label: "Verification Matrix", icon: "🔬" }
    ],

    coreRules: [
      {
        title: "Bear Form Critical Rage Generation (+75%)",
        status: "verified",
        statusLabel: "Reported in Beta",
        badge: "Rage Engine (Oct 2026)",
        desc: "In the Phase 2 Level 30 patch, Bear Form and Dire Bear Form generate 75% increased Rage whenever the Druid lands a Critical Strike, solving rage starvation during boss encounters."
      },
      {
        title: "New Talent: Shifting Power (Level 60 Row 7 Capstone)",
        status: "verified",
        statusLabel: "Reported in Beta",
        badge: "Energy Surge (Oct 2026)",
        desc: "Tiger's Fury and King of the Jungle have been removed and replaced by Shifting Power on Row 7 Col 3: instantly converts 55% of Base Mana into 40 Energy on an 8-second cooldown (was 16s), supercharging Cat burn phases!"
      },
      {
        title: "Shapeshift Disarm Immunity & Swing Timers",
        status: "verified",
        statusLabel: "Reported in Beta",
        badge: "Combat QoL (Oct 2026)",
        desc: "All Druid shapeshift forms are now fully immune to Disarm effects! Additionally, casting Faerie Fire in form no longer resets the melee swing timer."
      },
      {
        title: "Swipe Attack Power Scaling (+3%) & Primal Bite Threat",
        status: "verified",
        statusLabel: "Reported in Beta",
        badge: "Threat Scaling (Oct 2026)",
        desc: "Swipe correctly benefits from 3% of the Druid's total Attack Power, and Primal Bite threat generation has been roughly doubled for dungeon tanking."
      },
      {
        title: "Baseline Omen of Clarity",
        status: "verified",
        statusLabel: "Reported in Beta",
        badge: "Baseline Keystone",
        desc: "Omen of Clarity is now baseline for all Druids! Clearcasting is not consumed by Wrath or by abilities that cost no resources, functioning cleanly across casting and melee forms."
      },
      {
        title: "Baseline Nature's Grasp",
        status: "verified",
        statusLabel: "Reported in Beta",
        badge: "Baseline Utility",
        desc: "Nature's Grasp is now baseline and no longer requires a talent point, giving all Druids reactive entangling roots when struck by melee attackers."
      },
      {
        title: "Revive (Standard Resurrection)",
        status: "verified",
        statusLabel: "Reported in Beta",
        badge: "Major QoL",
        desc: "Druids now have Revive, a standard out-of-combat resurrection spell, permanently solving the classic 30-minute Rebirth limitation for 5-man dungeon groups."
      },
      {
        title: "Smooth Energy Regeneration",
        status: "verified",
        statusLabel: "Reported in Beta",
        badge: "Resource Modernization",
        desc: "Cat Form energy now regenerates in a smooth, continuous flow rather than discrete, rigid 2-second ticks, providing fluid combat rhythm."
      },
      {
        title: "Furor & Power-Shifting Rework",
        status: "verified",
        statusLabel: "Reported in Beta",
        badge: "Form Architecture",
        desc: "Shapeshifting into Bear/Dire Bear generates 10 Rage. Shifting into Cat Form restores 20% of Energy held when last in Cat Form, plus 2 Energy per second spent outside Bear Form. Furor now allows retaining Cat Energy even when shifting into Bear/Dire Bear Form."
      },
      {
        title: "Shapeshifting Mana Cost",
        status: "demo",
        statusLabel: "🎙️ Sodapoppin Demo Finding",
        badge: "Mana Budget",
        desc: "Shapeshifting costs 445 mana at level 38 with demo gear, requiring thoughtful form management rather than reckless spam shifting."
      },
      {
        title: "Lacerate Feral Progression",
        status: "verified",
        statusLabel: "✦ Launch Build 1.60.1.70707",
        badge: "Skill Progression",
        desc: "Lacerate is confirmed as a Tier 4 Feral Combat talent (Row 4, Col 2 under Savage Fury). Rank 1 is learned via talent, with Rank 2 learned at level 34 from trainers."
      },
      {
        title: "Native Cooldown Manager: Druid Essentials",
        status: "verified",
        statusLabel: "Reported in Beta (Oct 8)",
        badge: "Native UI & Edit Mode",
        desc: "Expanded in Beta Build 1.60.1.70425 directly in default HUD Edit Mode. Rotational Spells Tracked: Swiftmend (15s), Wild Growth (6s), Feral Charge (15s), and Bash (1m). Major Defensives & Bursts: Innervate (6m), Rebirth (30m), Barkskin (1m), Frenzied Regeneration (3m), Nature's Swiftness (3m), Tranquility (5m), and Dash (5m). Active Procs & Buffs: Eclipse charges (stores up to 4 rapid Starfire charges), Omen of Clarity / Clearcasting procs, Predator's Swiftness instant-cast procs, Furor energy/rage retention, and Lifebloom stacks."
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
          name: "Moonkin Form",
          type: "Signature Shapeshift",
          cast: "Instant",
          status: "verified",
          desc: "Shapeshift into Moonkin Form, increasing Omen of Clarity's chance to trigger by 100%, Armor contribution from items by 360%, and all party or raid members within 45 yards have their Critical Strike chance increased by 3%. Also protects the caster from Polymorph effects and prevents the use of healing spells.\n\nThe act of shapeshifting frees the caster of Polymorph and Movement Impairing effects."
        },
        {
          name: "Insect Swarm",
          type: "DoT Relocation",
          cast: "Instant",
          cd: "No Cooldown",
          duration: "12 sec Duration",
          status: "verified",
          desc: "The enemy target is swarmed by insects, decreasing their chance to hit with attacks by 2% and causing 48 Nature damage over 12 sec."
        },
        {
          name: "Nature's Splendor (Extended DoTs/HoTs)",
          type: "Duration Keystone",
          cast: "Passive",
          status: "verified",
          desc: "Increases the duration of Moonfire and Regrowth by 3 seconds, Rejuvenation by 6 seconds, and extends Insect Swarm duration for sustained multi-target pressure."
        },
        {
          name: "Nature's Grace",
          type: "Burst Haste Talent",
          cast: "Passive Proc",
          duration: "6 sec Duration",
          status: "verified",
          desc: "All non-periodic spell criticals grace you with a blessing of nature, increasing your spellcasting speed and reducing your global cooldown by 10% for 3 sec."
        },
        {
          name: "Improved Entangling Roots",
          type: "Control Utility",
          cast: "Passive",
          status: "verified",
          desc: "Increases the number of simultaneous rooted targets and allows Entangling Roots to absorb damage without immediately breaking."
        },
        {
          name: "Improved Wrath",
          type: "Rotational Foundation",
          cast: "Passive",
          status: "verified",
          desc: "Reduces the cast time of your Wrath spell by 0.5 sec and its Mana cost by 50%. (at 5/5)"
        }
      ]
    },

    feral: {
      title: "Feral: King of the Jungle, Cat Feral Charge & Bear Defense Scaling",
      tagline: "Leap as a Cat with Feral Charge, execute Predatory Discipline excess-energy finishers, and scale Bear armor directly from Defense rating",
      talents: [
        {
          name: "Predatory Discipline",
          type: "Feral Finisher Keystone",
          cast: "Passive",
          status: "verified",
          desc: "Your Ferocious Bite ability no longer converts extra Energy into damage, preserving energy while still dealing extra bonus damage based on your excess Energy."
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
          name: "Thick Hide",
          type: "Tank Mitigation Keystone",
          cast: "Passive",
          status: "verified",
          desc: "While in Bear Form, Cat Form, Dire Bear Form, or Moonkin Form, you gain 180 additional base Armor per level and another 2.00 base Armor for each point of defense skill beyond five times your level. This amount can be further increased by multipliers from those forms. (at 3/3)"
        },
        {
          name: "Heart of the Wild (Early Placement)",
          type: "Hybrid Stat Keystone",
          cast: "Passive",
          status: "verified",
          desc: "Moved significantly earlier in the Feral tree: increases total Intellect by 10%, Bear Form Stamina by 20%, and Cat Form Strength by 10%."
        },
        {
          name: "Leader of the Pack (3% Crit)",
          type: "Raid Aura",
          cast: "Passive Aura",
          status: "verified",
          desc: "Now Raid wide: increases Melee and Ranged critical strike chance of all raid members within 45 yards by 3% while in Cat, Bear, or Dire Bear form."
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
      title: "Restoration: Wild Growth, Swiftmend & Bloom Expiration Heals",
      tagline: "Blanket the party in Wild Growth, burst-heal with non-consuming Swiftmend, and trigger burst heals on HoT expirations via Bloom",
      talents: [
        {
          name: "Wild Growth (Level 40 Party HoT)",
          type: "New Signature AoE HoT",
          cast: "3 sec Cast",
          cd: "6 sec Cooldown",
          duration: "7 sec Duration",
          status: "verified",
          desc: "Heals the target and their party for 336 over 7 sec. Party members must be within 43.5 yards of target. The amount healed is applied quickly at first, and slows down as Wild Growth reaches its full duration."
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
          name: "Bloom (Spirit Expiration Heal)",
          type: "HoT Expiration Keystone",
          cast: "Passive",
          status: "verified",
          desc: "When your Rejuvenation or Regrowth spell expires naturally due to its duration, the target is instantly healed for an amount equal to 100% of your Spirit (or 50% if dispelled)."
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
          desc: "Reduces the cast time of your Healing Touch and Wild Growth spells by 0.5 sec and increases all damage you deal by 10%. (at 5/5; rank 1: 0.1 sec, 2%)"
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
          desc: "When activated, your next Nature spell becomes an instant cast spell."
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
        title: "Sodapoppin's Skyborne Druid Hands-On Demo Findings",
        subtitle: "Testing the new Skyborne race on a Druid in Sodapoppin's beta video",
        items: [
          {
            name: "Walk on Air (10s Directional Glide)",
            status: "verified",
            statusLabel: "Reported in Beta",
            desc: "Glide downward through the air for 10 sec while controlling your direction. 90 sec cooldown."
          },
          {
            name: "Wind Blessed (+2% Haste)",
            status: "verified",
            statusLabel: "Reported in Beta",
            desc: "Passive racial granting +2% haste to melee, ranged, and spellcasting."
          },
          {
            name: "Elemental Insight (+5% Elemental Damage)",
            status: "verified",
            statusLabel: "Reported in Beta",
            desc: "Increases damage dealt to Elemental creatures by 5%, aiding in dungeon and raid progression."
          },
          {
            name: "Skyborne Druid Forms (Planned)",
            status: "verified",
            statusLabel: "Reported in Beta",
            desc: "Blizzard's roadmap lists updated Skyborne character models and Druid forms for early 2027. Final visuals have not been shown."
          }
        ]
      },
      newRaces: [
        {
          race: "Skyborne Druid",
          faction: "Neutral (Alliance / Horde)",
          badge: "✦ NEW IN FOREVER",
          desc: "Avian-infused scholars with Walk on Air (glide), Wind Blessed (+2% haste), and unique feathered shapeshift forms. Can choose either faction."
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
          desc: "Endurance (+5% base HP -> multiplies with Bear Form Stamina), War Stomp (90s CD AoE stun), Plainsrunning (up to +60% outdoor speed ramp), and Cultivation (15m CD)."
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
        details: "Bear gains 10 Rage; Cat retains Energy even when shifting to Bear/Dire Bear",
        status: "Verified in Closed Beta",
        statusType: "verified",
        source: "Beta Patch Build 1.60.1.70425"
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
        feature: "Moonkin Form (360% Armor)",
        category: "Balance",
        details: "360% armor from items, +3% raid crit, Polymorph immunity",
        status: "Verified in Closed Beta",
        statusType: "verified",
        source: "Beta Patch Build 1.60.1.70425"
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
        feature: "Bloom (Spirit Expiration Heal)",
        category: "Restoration",
        details: "Heals for 100% of Spirit when Rejuvenation or Regrowth expires (50% if dispelled)",
        status: "Verified in Launch Build",
        statusType: "verified",
        source: "Build 1.60.1.70707"
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
        feature: "Predatory Discipline",
        category: "Feral",
        details: "Ferocious Bite preserves excess Energy while still adding bonus damage",
        status: "Verified in Launch Build",
        statusType: "verified",
        source: "Build 1.60.1.70707"
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
        feature: "Thick Hide",
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
        feature: "Skyborne Walk on Air",
        category: "Skyborne Racials",
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
            bestWeapon: "Two-Handed Mace / Staff (Smite's Mighty Hammer / Staff of Orgrimmar / Manual Crowd Pummeler prep)",
            talents: [
              { name: "Ferocity", points: "5/5", tree: "Feral (Tier 1)", desc: "Reduces the cost of your Maul, Swipe, Claw, and Rake abilities by 5 Rage or Energy." },
              { name: "Furor", points: "5/5", tree: "Feral (Tier 1)", desc: "Gives you a 100% chance to gain 10 Rage when shifting into Bear Form, or 40 Energy when shifting into Cat Form." },
              { name: "Feral Instinct", points: "1/5", tree: "Feral (Tier 2)", desc: "Increases threat in Bear Form by 3% and reduces chance for enemies to detect you while Prowling." }
            ],
            legacyNotes: "Extra points obtained through the Legacy Talented perk unlock Sharpened Claws (+6% crit) and Blood Frenzy (combo point generation).",
            rotation: [
              { label: "Prowl Opener", desc: "Prowl -> Ravage or Shred from behind (Sap no longer breaks stealth in party play)." },
              { label: "Bleed & Build", desc: "Rake bleed upkeep -> Claw (now only 40 Energy with Ferocity) to 4-5 combo points." },
              { label: "Execute", desc: "Ferocious Bite finisher; weapon damage scaling directly enhances Bite output in Forever." },
              { label: "Viper Form Bonus", desc: "Wearing the complete 5-piece Embrace of the Viper set from WC unlocks cosmetic serpent shifting!" }
            ],
            bisGear: [
              { slot: "Two-Hand Weapon", item: "Smite's Mighty Hammer", source: "Deadmines (Mr. Smite)", stats: "+11 Strength, 19.8 DPS" },
              { slot: "Armor Set", item: "Embrace of the Viper (5-Piece)", source: "Wailing Caverns Leaders", stats: "+10 Agility, +5 Intellect, Serpent Form" },
              { slot: "Staff (Horde Quest)", item: "Staff of Orgrimmar", source: "Ragefire Chasm (Hidden Enemies Quest)", stats: "+6 Agi, +6 Int, +18 Spell Dmg, 11.8 DPS" },
              { slot: "Staff (Alt)", item: "Wild Thane Staff", source: "Hall of Thanes (Dungeon Boss)", stats: "+6 Agi, +6 Str, 18.0 DPS" },
              { slot: "Ring", item: "Lavishly Jeweled Ring", source: "Deadmines (Gilnid)", stats: "+6 Agi, +2 Int" }
            ],
            campingPerk: {
              name: "Sharpening Wheel (Blacksmithing camp object)",
              desc: "Everyone sitting at your camp gains up to +34 Strength (level 60 value; does not stack with Strength of Earth Totem). Requires a Campfire."
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
              { name: "Thick Hide", points: "5/5", tree: "Feral (Tier 1)", desc: "While in Bear Form, Cat Form, Dire Bear Form, or Moonkin Form, you gain 180 additional base Armor per level and another 2.00 base Armor for each point of defense skill beyond five times your level. This amount can be further increased by multipliers from those forms. (at 3/3; rank 1: 178, 0.67)" },
              { name: "Brutal Impact", points: "1/2", tree: "Feral (Tier 2)", desc: "Increases the stun duration of your Bash and Pounce abilities by 0.5 sec." }
            ],
            legacyNotes: "Extra points from the Legacy Talented perk unlock Feral Charge (interrupt/root in Bear Form) and Heart of the Wild (+20% Stamina).",
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
              name: "Enchanted Lute (Enchanting camp object)",
              desc: "Everyone sitting at your camp gains up to +308 Armor, +13 to all stats and +22 to all resistances (level 60 values; does not stack with Mark of the Wild)."
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
            bestWeapon: "Two-Handed Staff (Staff of Orgrimmar / Staff of Westfall / Emberstone Staff)",
            talents: [
              { name: "Eclipse", points: "5/5", tree: "Balance (Tier 1)", desc: "Your Wrath spell reduces the cast time of your next 2 Starfire spells by 0.50 sec. Stores up to 4 charges. Lasts 15 sec. (at 3/3)" },
              { name: "Improved Moonfire", points: "5/5", tree: "Balance (Tier 1)", desc: "Increases the damage and critical strike chance of Moonfire by 10%." },
              { name: "Nature's Reach", points: "1/2", tree: "Balance (Tier 2)", desc: "Increases the range of your Wrath, Entangling Roots, Faerie Fire, and Moonfire by 10%." }
            ],
            legacyNotes: "Extra points from the Legacy Talented perk unlock 2/2 Nature's Grace (-0.5s cast after spell crit) and Moonkin Form.",
            rotation: [
              { label: "Rotation", desc: "Faerie Fire (decreases enemy armor) -> Moonfire -> Wrath spam." },
              { label: "Outdoor Kite", desc: "Entangling Roots rank 1 to root melee mobs while casting Wrath at 33 yards." }
            ],
            bisGear: [
              { slot: "Staff (Horde)", item: "Staff of Orgrimmar", source: "Ragefire Chasm (Hidden Enemies Quest)", stats: "+6 Int, +6 Agi, +18 Spell Dmg" },
              { slot: "Staff (Alliance)", item: "Staff of Westfall", source: "Deadmines Quest", stats: "+11 Int, +5 Spi" },
              { slot: "Robe", item: "Robe of Arugal", source: "Shadowfang Keep", stats: "+10 Int, +5 Spi, +3 Agi" }
            ],
            campingPerk: {
              name: "Incense Candle (Herbalism camp object)",
              desc: "Everyone sitting at your camp gains up to +25 Intellect (level 60 value; does not stack with Arcane Intellect). Requires a Campfire."
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
            name: "Feral DPS (Cat Form Agility & Furor Powershifting)",
            icon: "🐾",
            role: "Melee Bleed & Energy Engine",
            buildUrl: "/talents/druid?b=-552000321230111-&l=30&tl=5",
            wowheadCalcUrl: "https://www.wowhead.com/forever/talent-calc/druid/-552000321230111-",
            tagline: "Uncapped Energy pooling via baseline powershifting and Tier 1 Furor (40 Energy on Cat shift), disarm immunity, and vicious Ferocious Bite crits.",
            statPriority: "Weapon Top-End DPS > Agility > Strength > Hit",
            bestWeapon: "Manual Crowd Pummeler (Gnomeregan) / Smite's Mighty Hammer / Excavation Heavy Mallet",
            talents: [
              { name: "Ferocity", points: "5/5", tree: "Feral (Tier 1)", desc: "Reduces the cost of your Maul, Swipe, Claw, and Rake abilities by 5 Rage or Energy." },
              { name: "Furor", points: "5/5", tree: "Feral (Tier 1)", desc: "Gives you a 100% chance to gain 10 Rage when shifting into Bear Form, or 40 Energy when shifting into Cat Form." },
              { name: "Sharpened Claws", points: "3/3", tree: "Feral (Tier 2)", desc: "Increases your critical strike chance while in Bear, Dire Bear, or Cat Form by 6%." },
              { name: "Savage Fury", points: "2/2", tree: "Feral (Tier 3)", desc: "Increases the damage caused by your Claw, Rake, Shred, Maul, and Swipe abilities by 10%." },
              { name: "Blood Frenzy", points: "2/2", tree: "Feral (Tier 3)", desc: "Your critical strikes from Cat Form abilities that add combo points have a 100% chance to add an additional combo point." },
              { name: "Predatory Strikes", points: "3/3", tree: "Feral (Tier 4)", desc: "Increases your melee attack power in Cat, Bear, and Dire Bear Forms by 150% of your level." },
              { name: "Faerie Fire (Feral)", points: "1/1", tree: "Feral (Tier 4 Keystone)", desc: "Instant ranged armor reduction usable in form that does not reset your melee swing timer." },
              { name: "Feral Charge", points: "1/1", tree: "Feral (Tier 3)", desc: "Causes you to charge an enemy, immobilizing them for 4 sec and interrupting any spellcasting." }
            ],
            legacyNotes: "Extra points from the Legacy Talented perk unlock Heart of the Wild in Restoration Tier 1 (+10% Strength / +20% Stamina). Shifting Power is the Level 60 Row 7 capstone (8s cooldown) converting 55% base mana into 40 Energy.",
            rotation: [
              { label: "Opener", desc: "Prowl -> Ravage / Shred from behind (Shapeshift forms are now fully immune to Disarm!)." },
              { label: "Faerie Fire & Bleed", desc: "Apply Faerie Fire (Feral) instantly without interrupting swing timer -> Rake bleed." },
              { label: "Energy Engine", desc: "Claw to 4-5 CP -> Powershift: macro out and into Cat Form with Tier 1 Furor to immediately gain +40 Energy on shift." },
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
              name: "Sharpening Wheel (Blacksmithing camp object)",
              desc: "Everyone sitting at your camp gains up to +34 Strength (level 60 value; does not stack with Strength of Earth Totem). Requires a Campfire."
            },
            classQuestNote: "Level 30 Druids gain Travel Form (40% outdoor movement speed) at trainers across Moonglade and capital cities."
          },
          {
            specId: "feral_bear",
            name: "Feral Tank (Bear Form +75% Rage Crits & Meatshield)",
            icon: "🐻",
            role: "Dungeon Main Tank",
            buildUrl: "/talents/druid?b=-550303021231001-&l=30&tl=5",
            wowheadCalcUrl: "https://www.wowhead.com/forever/talent-calc/druid/-550303021231001-",
            tagline: "Massive +75% Rage on critical strikes, 3% AP Swipe scaling, Disarm immunity, and unshakeable threat from doubled Primal Bite threat multipliers.",
            statPriority: "Stamina > Armor > Strength > Agility > Defense",
            bestWeapon: "Manual Crowd Pummeler / Living Root / Excavation Site Ironwood Maul",
            talents: [
              { name: "Ferocity", points: "5/5", tree: "Feral (Tier 1)", desc: "Reduces the Rage cost of Maul and Swipe by 5, enabling smooth spam threat." },
              { name: "Thick Hide", points: "5/5", tree: "Feral (Tier 1)", desc: "While in Bear Form, Cat Form, Dire Bear Form, or Moonkin Form, you gain 180 additional base Armor per level and another 2.00 base Armor for each point of defense skill beyond five times your level. This amount can be further increased by multipliers from those forms. (at 3/3; rank 1: 178, 0.67)" },
              { name: "Feral Instinct", points: "3/5", tree: "Feral (Tier 2)", desc: "Increases damage done by your Swipe ability by 30% and reduces the chance enemies have to detect you while Prowling as if you were 3 levels higher." },
              { name: "Brutal Impact", points: "2/2", tree: "Feral (Tier 2)", desc: "Increases the stun duration of your Bash and Pounce abilities by 1.0 sec." },
              { name: "Feral Charge", points: "1/1", tree: "Feral (Tier 3 Keystone)", desc: "Charges an enemy, immobilizing for 4s and interrupting casts with a 15s cooldown." },
              { name: "Sharpened Claws", points: "3/3", tree: "Feral (Tier 2)", desc: "Increases your critical strike chance while in Bear Form, Dire Bear Form, or Cat Form by 6%. (at 2/2; rank 1: 3%)" },
              { name: "Blood Frenzy", points: "2/2", tree: "Feral (Tier 3)", desc: "Gives you a 100% chance to gain an additional 5 Rage any time you get a critical strike while in Bear Form or Dire Bear Form. In addition, your non-periodic critical strikes from Cat Form abilities that generate Combo Points have a 100% chance to add an additional Combo Point. (at 2/2)" }
            ],
            legacyNotes: "Extra points from the Legacy Talented perk unlock Heart of the Wild (+20% Stamina) for immense 2,000+ HP dungeon tank pools.",
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
              name: "Enchanted Lute (Enchanting camp object)",
              desc: "Everyone sitting at your camp gains up to +308 Armor, +13 to all stats and +22 to all resistances (level 60 values; does not stack with Mark of the Wild)."
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
            tagline: "Signature Moonkin Form (+360% item Armor, +3% party all-crit), alternating Eclipse procs, and rapid-fire Starfire nukes.",
            statPriority: "Spell Power > Nature / Arcane Damage > Intellect > Spirit",
            bestWeapon: "Rod of the Sleepwalker (BFD) / Staff of the Blessed Seer / Staff of Westfall / Staff of Orgrimmar",
            talents: [
              { name: "Eclipse", points: "5/5", tree: "Balance (Tier 1)", desc: "Your Wrath spell reduces the cast time of your next 2 Starfire spells by 0.50 sec. Stores up to 4 charges. Lasts 15 sec. (at 3/3)" },
              { name: "Improved Moonfire", points: "5/5", tree: "Balance (Tier 1)", desc: "Increases the damage and critical strike chance of Moonfire by 10%." },
              { name: "Nature's Reach", points: "2/2", tree: "Balance (Tier 2)", desc: "Increases the range of your Wrath, Entangling Roots, Faerie Fire, and Moonfire by 20%." },
              { name: "Nature's Grace", points: "1/1", tree: "Balance (Tier 3 Keystone)", desc: "All non-periodic spell criticals grace you with a blessing of nature, increasing your spellcasting speed and reducing your global cooldown by 10% for 3 sec." },
              { name: "Moonglow", points: "3/3", tree: "Balance (Tier 3)", desc: "Reduces the Mana cost of your damaging spells by 25%." },
              { name: "Moonkin Form", points: "1/1", tree: "Balance (Tier 5 Keystone)", desc: "Shapeshift into Moonkin Form, increasing Omen of Clarity's chance to trigger by 100%, Armor contribution from items by 360%, and all party or raid members within 45 yards have their Critical Strike chance increased by 3%. Also protects the caster from Polymorph effects and prevents the use of healing spells.\n\nThe act of shapeshifting frees the caster of Polymorph and Movement Impairing effects." },
              { name: "Vengeance", points: "4/5", tree: "Balance (Tier 4)", desc: "Increases the critical strike damage bonus of your Starfire, Moonfire, and Wrath spells by 80%." }
            ],
            legacyNotes: "Extra points from the Legacy Talented perk max out 5/5 Vengeance (+100% crit damage) and Balance of Nature school weaving.",
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
              name: "Incense Candle (Herbalism camp object)",
              desc: "Everyone sitting at your camp gains up to +25 Intellect (level 60 value; does not stack with Arcane Intellect). Requires a Campfire."
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
              { name: "Naturalist", points: "5/5", tree: "Restoration (Tier 2)", desc: "Reduces the cast time of your Healing Touch and Wild Growth spells by 0.5 sec and increases all damage you deal by 10%. (at 5/5)" },
              { name: "Reflection", points: "3/3", tree: "Restoration (Tier 3)", desc: "Allows 50% of your Mana regeneration to continue while casting." },
              { name: "Insect Swarm", points: "1/1", tree: "Restoration (Tier 3 Keystone)", desc: "Deals Nature damage over 12 sec and reduces target's physical hit chance by 2% for tank damage mitigation." },
              { name: "Swiftmend", points: "1/1", tree: "Restoration (Tier 5 Keystone)", desc: "Consumes a Rejuvenation or Regrowth effect on a friendly target to instantly heal them for an immense burst amount." },
              { name: "Subtlety", points: "1/5", tree: "Restoration (Tier 2)", desc: "Reduces the threat generated by your Nature and Arcane spells by 10%." }
            ],
            legacyNotes: "Extra points from the Legacy Talented perk unlock Nature's Swiftness (instant cast heal on 3-minute cooldown) and Gift of Nature (+10% healing).",
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
              name: "Mana Well (Alchemy camp object)",
              desc: "Craft a Mana Well."
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
