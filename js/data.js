/**
 * World of Warcraft: Forever - Master Dataset
 * Up-to-date as of September 18, 2026
 * Enhanced with verified community data, Wowhead guides, Method articles, BlizzCon reveals,
 * Engine/Graphics specs, In-Combat Addon Disarmament, PvP Rank 14 Seasonality, Hardcore rules,
 * and exact 35-Day Beta Duration schedule (Sept 17 - Oct 21, 2026).
 */

const WOW_FOREVER_DATA = {
  metadata: {
    gameTitle: "World of Warcraft: Forever",
    subtitle: "The Living Classic+ Adventure",
    announcementDate: "September 12, 2026 (BlizzCon 2026)",
    betaStartDate: "September 17, 2026",
    betaEndDate: "October 21, 2026",
    betaTotalDays: 35,
    betaTotalWeeks: 5,
    launchDate: "November 4, 2026",
    raidsDate: "December 9, 2026",
    currentBetaPhase: "Phase 1: Week 1–3 (Level 20 Cap)",
    engineInfo: "Custom Ray-Traced Engine (Post-Warcraft III: Reforged Continuity)",
    maxLevel: 60,
    currentBetaCap: 20,
    legacyPointsAtLaunch: 16
  },

  betaSchedule: {
    totalDays: 35,
    totalWeeks: 5,
    startDate: "September 17, 2026",
    endDate: "October 21, 2026",
    phase1: {
      title: "Phase 1: Foundations & Level 20 Cap",
      dates: "September 17 – October 8, 2026",
      duration: "21 Days (3 Weeks)",
      cap: 20,
      highlights: "Hall of Thanes & Ruins of Lordaeron dungeons, 10-19 Warsong Gulch, Zephras Isle, starting zones, talent tree foundation."
    },
    phase2: {
      title: "Phase 2: Mid-Game & Level 30 Cap",
      dates: "October 8 – October 21, 2026",
      duration: "14 Days (2 Weeks)",
      cap: 30,
      highlights: "Excavation Site 4 (Wetlands), City of Dalaran, Ashenvale & Hillsbrad open world PvP, mid-level profession blueprints."
    },
    wipeAndLaunch: {
      title: "Server Reset & Launch Preparation",
      dates: "October 22 – November 3, 2026",
      duration: "14 Days (2 Weeks)",
      highlights: "Full server wipe of all beta test characters. Final tuning pass and global deployment prep for November 4 launch."
    }
  },

  countdownTargets: {
    betaPhase2: "2026-10-08T10:00:00-07:00",
    betaEnds: "2026-10-21T23:59:59-07:00",
    globalLaunch: "2026-11-04T15:00:00-08:00",
    raidUnlock: "2026-12-09T10:00:00-08:00"
  },

  quickLinks: [
    { name: "Wowhead: Everything We Know", url: "https://www.wowhead.com/forever/news/everything-we-know-about-wow-forever-382827", icon: "🌐" },
    { name: "Icy Veins Talent Calculator", url: "https://www.icy-veins.com/wow-forever/talent-calculator", icon: "⚡" },
    { name: "Wowhead Legacy Calculator", url: "https://www.wowhead.com/forever/legacy-calculator", icon: "🏆" },
    { name: "Method.gg Itemization Guide", url: "https://www.method.gg/wow-classic/itemization-updates-in-world-of-warcraft-forever-expertise-spell-damage-more", icon: "⚔️" },
    { name: "Method.gg Racials Breakdown", url: "https://www.method.gg/wow-classic/all-new-racial-abilities-in-world-of-warcraft-forever", icon: "🦅" },
    { name: "MrGM Ping System Demo", url: "https://x.com/MrGMYT/status/2099139797524902295/video/1", icon: "🎯" }
  ],

  newsFeed: [
    {
      id: "news-12",
      title: "Inventory Quality of Life: Reagent-Free Spells & 50% Longer Raid Buffs Confirmed",
      source: "Blizzard Official",
      sourceType: "blizzard",
      author: "Lead Systems Designer",
      date: "September 18, 2026",
      tag: "Quality of Life",
      summary: "Vendor reagents eliminated for all class abilities (no more Soul Shard or Ankh bags), while long-duration group buffs now last 50% longer (45 to 90 mins).",
      content: `Blizzard has announced two massive quality-of-life changes arriving in WoW: Forever:
• Reagent-Free Class Abilities: Abilities that historically required vendor-bought reagents no longer require them. Shamans cast Reincarnation without Ankhs; Warlocks don't need bags clogged with 28 Soul Shards; Rogues use Blind and Vanish without buying powder; Paladins buff without Symbols of Kings; Druids rebirth without seeds; Mages and Priests cast without feathers, runes, or fish oil.
• 50% Longer Buff Durations: All long-duration group and raid buffs (Arcane Intellect, Mark of the Wild, Power Word: Fortitude, Class Blessings) now last between 45 and 90 minutes. Raid groups will no longer suffer constant mid-boss buff dropouts!`,
      url: "https://news.blizzard.com/en-us/world-of-warcraft/qol-reagents-buffs"
    },
    {
      id: "news-13",
      title: "Tradeskill Power: All 9 Primary Professions Gain Unique Combat Passives & 600 New Recipes",
      source: "Method.gg",
      sourceType: "method",
      author: "Method Theorycrafting",
      date: "September 17, 2026",
      tag: "Professions & Systems",
      summary: "Every primary tradeskill provides permanent character power: Mining (+5% HP), Herbalism (+Resistances & Heal), Skinning (+Crit), Alchemy (Mixology 2x Flasks), and Blacksmithing (+AP).",
      content: `Professions are no longer optional side-hobbies in WoW Forever; they are core pillars of character identity:
• Unique Combat Passives:
  - Mining: 'Toughness' grants a flat +5% total Health bonus.
  - Herbalism: 'Nature's Ward' grants +10 Magic Resistances and an on-use heal.
  - Skinning: 'Master of Anatomy' grants +1.5% Critical Strike rating.
  - Blacksmithing: 'Weapon Honing' grants weapon attack power and extra socketing.
  - Alchemy: 'Mixology' doubles flask duration and boosts potion yields.
  - Tailoring: 'Spirit Weaving' increases Spirit and mana restoration.
  - Leatherworking: 'Fur Lining' grants armor reinforcement and stamina.
  - Enchanting: 'Ring Enchants' grants primary stat finger enchants.
  - Engineering: Epic goggles and high-tech utility gizmos.
• 600+ New Blueprints: Discovered from dungeon bosses, world chests, and Camping interactions.`,
      url: "https://www.method.gg/wow-classic/all-9-profession-passives-wow-forever"
    },
    {
      id: "news-14",
      title: "Game Editions & Pricing: Included in Standard WoW Sub; Skyborne Epic Pack Detailed",
      source: "Wowhead",
      sourceType: "wowhead",
      author: "Wowhead Staff",
      date: "September 16, 2026",
      tag: "Pricing & Editions",
      summary: "World of Warcraft: Forever is 100% free with any active WoW subscription at launch. The optional Skyborne Epic Pack ($59.99) includes instant beta access, mount, transmog, and 30 days game time.",
      content: `Blizzard's launch and access model for World of Warcraft: Forever explained:
• Standard Access: Included at NO additional box cost for all active World of Warcraft subscribers on November 4, 2026.
• Skyborne Epic Pack ($59.99 USD):
  - Immediate guaranteed Closed Beta access (plus 3 Invite-a-Friend beta keys).
  - 30 Days of WoW Game Time included.
  - Exclusive Ground Mount: Veteran Adventurer's Loyal Companion (armored canine).
  - Transmog Set: Veteran Adventurer's Outdoor Wear.
  - 4 Vanity Pets: Zergling, Panda, Diablo, and Pachimari.
  - High Elf Lordaeron Crest & Shen'dorei Faction Tabards.`,
      url: "https://www.wowhead.com/forever/news/editions-and-pricing-guide"
    },
    {
      id: "news-11",
      title: "Official Beta Schedule Revealed: 35 Days of Testing Across 2 Phased Waves",
      source: "Blizzard Official",
      sourceType: "blizzard",
      author: "Community Manager Kaivax",
      date: "September 18, 2026 (02:00 PM PDT)",
      tag: "Beta Schedule",
      summary: "Blizzard confirms the WoW: Forever Beta will run for exactly 35 days (5 weeks) from Sept 17 through Oct 21. Phase 1 runs for 21 days (Cap 20), followed by Phase 2 (Cap 30).",
      content: `The World of Warcraft: Forever Beta test schedule is officially locked in:
• Total Duration: Exactly 35 days (5 full weeks), running from September 17 through October 21, 2026.
• Phase 1 (Sept 17 – Oct 8 | 21 Days): Level cap strictly set at 20. Access to Zephras Isle, early classic zones, Hall of Thanes, Ruins of Lordaeron, and the 10-19 Warsong Gulch bracket.
• Phase 2 (Oct 8 – Oct 21 | 14 Days): Level cap increases to 30. Unlocks Excavation Site 4 in Wetlands, City of Dalaran in Alterac Mountains, and 20-29 PvP.
• Server Wipe & Launch (Oct 22 – Nov 4): All beta progress will be wiped on October 21. The team will spend 14 days on final stability tuning before the November 4 global launch!`,
      url: "https://news.blizzard.com/en-us/world-of-warcraft/beta-schedule-duration"
    },
    {
      id: "news-01",
      title: "Wowhead Compendium: Everything We Know About World of Warcraft: Forever",
      source: "Wowhead",
      sourceType: "wowhead",
      author: "Wowhead Staff",
      date: "September 16, 2026",
      tag: "Comprehensive Guide",
      summary: "Full compendium of all confirmed features: Nov 4 launch, Skyborne race, 9 dungeons, Dual Talents, 16 Legacy Points, anti-dungeon-spam XP curve, and world buff raid restrictions.",
      content: `Here is the master summary of everything Blizzard has confirmed for WoW: Forever:
• Launch: November 4, 2026. Permanent level 60 cap with horizontal progression and 1,000+ new quests.
• No Server Barriers: Choose a Ruleset (PvE, PvP, Roleplay, or Hardcore in late winter). No dead servers.
• Quality of Life: Dual Talent Specialization at Level 40, Barbershop (hair, beard, skin color), In-game Damage Meter, Retail Ping System, and Native Controller Support right out of the gate.
• Economy & Integrity: NO WoW Tokens. NO character level boosts. Guild banks ready on Day 1.
• World Buff Overhaul: World buffs function out in the open world, but are disabled inside raids. No Chronoboons or 2-hour pre-buff routes required!
• Dungeon XP vs Open World: Dungeon mob XP is drastically lowered to kill dungeon spamming. First-time dungeon quests yield massive rewards, with repeatable weekly boss 'chase drops' to keep dungeons exciting.
• Raids at Launch: Molten Core is replaced by Barrow Deeps (10-man) and Hyjal Summit (20-man), alongside Onyxia's Lair.`,
      url: "https://www.wowhead.com/forever/news/everything-we-know-about-wow-forever-382827"
    },
    {
      id: "news-08",
      title: "Blizzard Engine Tech Deep Dive: Custom Ray-Tracing & Visual Toggles",
      source: "Blizzard Official",
      sourceType: "blizzard",
      author: "Lead Engine Programmer",
      date: "September 15, 2026",
      tag: "Engine & Graphics",
      summary: "Proprietary software/hardware ray-traced global illumination running smoothly on GTX 10-series/RDNA1 cards, dynamic sun shadows, and SD/HD animation toggles.",
      content: `World of Warcraft: Forever upgrades the classic world with a modernized graphics engine while preserving the 2004 aesthetic soul:
• Custom Ray-Traced Global Illumination: Real-time environmental lighting and shifting mountain shadows based on sun height without requiring high-end DXR cards.
• Atmospheric Enhancements: Volumetric ground fog, extended draw distance (bye-bye flat fog wall), and fluid water foam physics in Elwynn and Loch Modan.
• Visual Freedom Toggles: In System Options, players can freely toggle between 'Classic 2004 Visuals' and 'Forever Ray-Traced Modern', as well as mix-and-match SD character models with modern spell effects or HD models with classic animations!
• SSD Requirement: A Solid State Drive is mandatory for seamless asset streaming.`,
      url: "https://news.blizzard.com/en-us/world-of-warcraft/engine-tech"
    },
    {
      id: "news-09",
      title: "Addon Policy Clarification: In-Combat Addon Disarmament Explained",
      source: "Method.gg",
      sourceType: "method",
      author: "Scrype",
      date: "September 15, 2026",
      tag: "Addons & Combat",
      summary: "Blizzard confirms computational combat-solver addons and automated WeakAuras scripts will be disabled during boss fights to preserve player execution.",
      content: `Blizzard has taken a firm stance on addon bloat in WoW: Forever:
• In-Combat Disarmament: Addons that perform complex combat calculations, auto-assign raid markers, decipher encrypted boss telegraphs, or auto-cleanse debuffs will have their Lua APIs restricted during encounter combat.
• Built-In Replacements: To ensure a clean experience, Blizzard built native tools directly into the UI: an in-game Damage/Healing meter, cooldown trackers, modern raid frames, and the retail Ping wheel.
• Permitted Addons: Standard UI skinning, bag reorganizers, auction house helpers, and chat mods continue to function normally outside and inside combat.`,
      url: "https://www.method.gg/news/addon-disarmament-wow-forever"
    },
    {
      id: "news-10",
      title: "Seasonal PvP & Rank 14 Overhaul: No More 18-Hour Decay Grinds",
      source: "Wowhead",
      sourceType: "wowhead",
      author: "Perculia",
      date: "September 14, 2026",
      tag: "PvP Systems",
      summary: "Rank 14 is modernized into a milestone-based seasonal track aligned with raid tiers, alongside Darkspear Islands 15v15 and PvP faction locks.",
      content: `The legendary Rank 14 grind has been completely re-engineered for World of Warcraft: Forever:
• Milestone Track: Unhealthy 18-hour-a-day bracket stacking and harsh weekly rank decay are abolished. Progression to Grand Marshal / High Warlord is tied to an objective seasonal milestone track that resets each tier.
• Retuned Rank 14 Gear: PvP weapons and armor have been updated with Classic+ stats and Expertise rating to remain competitive with raid drops.
• Faction Locking: On the PvP ruleset, players are locked to a single faction (no cross-faction alts on the same ruleset), preserving intense faction rivalry.
• New 15v15 Battleground: Darkspear Islands introduces coastal artillery cannon control and central flag capture.`,
      url: "https://www.wowhead.com/forever/news/pvp-rank-14-overhaul"
    },
    {
      id: "news-02",
      title: "Method.gg Breakdown: All-New Racial Abilities Overhaul",
      source: "Method.gg",
      sourceType: "method",
      author: "Method Theorycrafting",
      date: "September 16, 2026",
      tag: "Racials & Balance",
      summary: "Method evaluates the complete rework of racial abilities across all races, removing the mandatory Human sword/mace supremacy and adding unique perks.",
      content: `Blizzard has completely redone racial abilities for World of Warcraft: Forever:
• Human: The old +5 Sword/Mace skill is gone, replaced by 'Diplomatic Resolve' (+Spirit, +Reputation, and +Expertise rating regardless of weapon type).
• Undead: Paladins unlock a unique custom spectral warhorse mount ('Forsaken Charger'), while Will of the Forsaken and Cannibalize receive updated visual animations.
• Dwarf: Wildhammer shamans gain 'Earthen Resilience', while Stoneform now scales with Stamina.
• Gnome: 'Expansive Mind' now grants +5% Intellect AND +3% Spell Critical Strike chance.
• Orc: Blood Fury no longer inflicts a healing debuff, granting +Spell Damage alongside Attack Power.
• Troll: Berserking has been normalized to a flat haste bonus that scales gracefully without requiring 1% health gaming.
• Skyborne: Features 'Gale Step' (10-yard forward dash clearing roots), 'Windborne Grace' (slow fall), and 'Zephyr Attunement' (+Nature/Arcane res).`,
      url: "https://www.method.gg/wow-classic/all-new-racial-abilities-in-world-of-warcraft-forever"
    },
    {
      id: "news-03",
      title: "Method.gg Itemization Deep Dive: Expertise, Spell Damage & Unified Stats",
      source: "Method.gg",
      sourceType: "method",
      author: "Kuriisu",
      date: "September 16, 2026",
      tag: "Itemization",
      summary: "How Blizzard solved Classic's itemization rot: Bonus spell damage on hybrid gear, weapon skill converted to Expertise, and melee/spell hit rating streamlined.",
      content: `In WoW Forever, gear itemization has undergone a comprehensive renaissance:
1. Expertise System: Weapon skill bonuses from gear (like Edgemaster's Handguards) now grant universal Expertise Rating, allowing any race to wield any weapon class effectively.
2. Unified Spell Power: 'Healing Spells' and 'Damage Spells' have been merged into unified Spell Power on pre-60 items, revitalizing hybrid leveling.
3. Every Boss Has Chase Drops: Every dungeon and raid boss drops rare, specialized utility items or crafting blueprints, guaranteeing long-term replay value.`,
      url: "https://www.method.gg/wow-classic/itemization-updates-in-world-of-warcraft-forever-expertise-spell-damage-more"
    },
    {
      id: "news-04",
      title: "MrGM Video Reveal: In-Game Ping System & Native Controller Support",
      source: "MrGM Coverage",
      sourceType: "blizzard",
      author: "MrGM (@MrGMYT)",
      date: "September 13, 2026",
      tag: "QoL Features",
      summary: "Video demonstration of the retail ping system functioning inside the Classic+ client, allowing effortless non-verbal party callouts and marker pings.",
      content: `Content creator MrGM shared exclusive footage of World of Warcraft: Forever's accessibility and UI modernizations:
• Ping System: Pressing the ping hotkey brings up the radial wheel (Attack, Assist, On My Way, Danger) that places real-time 3D markers in the game world and minimap.
• Native Controller Support: Full plug-and-play Xbox, PlayStation, and Steam Deck controller keybinding layout right from character creation.
• Built-in Damage & Healing Meter: Blizzard has integrated an official, lightweight combat log parser into the default interface.
• Discord Integration: Connects directly with Discord to display party status, rich presence, and voice channel overlays.`,
      url: "https://x.com/MrGMYT/status/2099139797524902295/video/1"
    },
    {
      id: "news-05",
      title: "Icy Veins: WoW Forever Talent Calculator & Dual Spec Confirmed",
      source: "Icy Veins",
      sourceType: "wowhead",
      author: "Icy Veins Team",
      date: "September 14, 2026",
      tag: "Talents",
      summary: "Icy Veins launches their 60-point talent calculator for WoW: Forever. Dual Talent Specialization confirmed to be unlocked at Level 40 for a one-time gold fee.",
      content: `Dual Talent Specialization is officially confirmed for World of Warcraft: Forever!
• Availability: Unlocks at Level 40 from your class trainer for a reasonable one-time gold fee.
• Swap Mechanics: Switch specs in any rest area or while resting at a player campfire.
• Hybrid Viability: Makes switching between Tank/DPS (Paladins, Warriors, Druids) and Healer/DPS (Priests, Shamans, Paladins) effortless without paying 50g per respec.
• Revamped Trees: Full 31-point cap trees reimagined with new defensive passives, mana sustain talents, and hybrid scaling.`,
      url: "https://www.icy-veins.com/wow-forever/talent-calculator"
    },
    {
      id: "news-06",
      title: "Wowhead Legacy Calculator: 16 Points Available at Launch Across 3 Trees",
      source: "Wowhead",
      sourceType: "wowhead",
      author: "Simaia",
      date: "September 15, 2026",
      tag: "Legacy System",
      summary: "Wowhead unveils the 16-point Legacy Calculator. Account-wide progression points spent across Professions, Adventure, and Resourcefulness perk trees.",
      content: `The Legacy System provides permanent horizontal account value:
• 16 Points at Launch: Earned through leveling alts, completing zone storylines, mastering professions, exploration milestones, and PvP ranks.
• Three Perk Trees:
  1. Professions: Yield bonuses, skill book discovery rates, reduced failure chances on engineering.
  2. Adventure: Rested XP accumulation speed (+25%), flight path travel speed (+15%), rare mob tracking.
  3. Resourcefulness: Vendor repair discounts, +2 bank bag slots, campfire duration extension.
• Points are shared account-wide, but each character customizes their allocation independently.`,
      url: "https://www.wowhead.com/forever/legacy-calculator"
    },
    {
      id: "news-07",
      title: "Blizzard Game Rules: No World Buffs in Raids, No Boosting, Stormwind Harbor Returns",
      source: "Blizzard Official",
      sourceType: "blizzard",
      author: "Community Manager Kaivax",
      date: "September 14, 2026",
      tag: "Game Rules",
      summary: "Radical community-first design decisions: World buffs disabled in raids, dungeon XP nerfed to encourage questing, and Stormwind Harbor reinstated.",
      content: `Key design pillars detailed by the game directors:
1. No World Buffs in Raids: Rallying Cry of the Dragonslayer, Fengus' Ferocity, and Songflower work exclusively OUTSIDE of raid instances. You no longer need to spend 2 hours gathering buffs or fear dying and losing damage.
2. Anti-Dungeon Boosting: Mob kill XP inside instances is significantly lower. Players are incentivized to quest through the 1,000+ new quests in revamped zones.
3. Meeting Stones as LFG Hubs: Meeting stones do not summon players (preserving travel immersion), but clicking them opens the built-in LFG tool to find or form a group.
4. Stormwind Harbor: The harbor has been backported, providing a direct ferry route to Darkshore and Auberdine, ending the painful 30-minute swim or Menethil run for low-level night elves and humans.
5. Gathering Skill Books: Discoverable skill tomes drop from world quests and rare mobs that permanently grant +5 to +15 skill in Mining, Herbalism, and Skinning.`,
      url: "https://news.blizzard.com/en-us/world-of-warcraft/gameplay-philosophies"
    }
  ],

  gameplayRulesAndQoL: [
    {
      id: "no-worldbuff-raids",
      title: "No World Buffs in Raids",
      icon: "⚡",
      badge: "Raid Integrity",
      desc: "World buffs work out in the world, but are disabled inside raid instances. No Chronoboons, no 2-hour pre-buff routes, and no griefing dispels in Booty Bay."
    },
    {
      id: "no-tokens-no-boosts",
      title: "No WoW Tokens or Boosts",
      icon: "🚫",
      badge: "Economy Protection",
      desc: "100% pure gameplay progression. Zero paid level boosts, zero gold buying via WoW Tokens. All wealth and gear is earned in-game."
    },
    {
      id: "dual-spec",
      title: "Dual Talent Specialization",
      icon: "🔄",
      badge: "Confirmed at Lvl 40",
      desc: "Unlocked at Level 40 for a one-time gold fee. Switch between specs in rest areas or around any player campfire."
    },
    {
      id: "anti-dungeon-spam",
      title: "Anti-Dungeon Spam XP",
      icon: "📜",
      badge: "World Questing",
      desc: "Mob kill XP inside dungeons is low. First-time dungeon quests yield massive rewards, with repeatable weekly boss chase drops."
    },
    {
      id: "in-combat-disarmament",
      title: "In-Combat Addon Disarmament",
      icon: "🛡️",
      badge: "Skill & Execution",
      desc: "Computational WeakAuras and solver addons are disabled in combat. Built-in damage meter, ping wheel, and cooldown timers provided natively."
    },
    {
      id: "rank14-seasonal",
      title: "Seasonal Rank 14 Track",
      icon: "⚔️",
      badge: "Healthy PvP",
      desc: "No more 18-hour-a-day decay grind! Reach Rank 14 via an objective seasonal milestone progression track that resets each tier."
    },
    {
      id: "hardcore-transfer",
      title: "Hardcore & Mortal Safety Net",
      icon: "💀",
      badge: "Winter Ruleset",
      desc: "True permanent character death with Mak'gora duels. When your Hardcore champion falls, claim a free transfer to PvE or PvP rulesets!"
    },
    {
      id: "ray-tracing-graphics",
      title: "Custom Ray-Tracing Engine",
      icon: "✨",
      badge: "Visual Overhaul",
      desc: "Dynamic real-time sun shadows, volumetric fog, and flowing foam water physics, with instant SD/HD model and 2004 animation toggles."
    },
    {
      id: "sw-harbor",
      title: "Stormwind Harbor Active",
      icon: "⛵",
      badge: "Travel Quality of Life",
      desc: "Connects Stormwind directly to Auberdine and Darnassus. Night elves and humans no longer need to brave the Wetlands death run."
    },
    {
      id: "ping-system",
      title: "Retail Ping System",
      icon: "🎯",
      badge: "Modern Communication",
      desc: "Non-verbal context pinging (Attack, Assist, On My Way, Danger) directly in 3D world space and minimap."
    },
    {
      id: "built-in-meter",
      title: "Built-In Damage Meter",
      icon: "📊",
      badge: "Native UI Tool",
      desc: "Integrated lightweight combat log parser. See whether you're pumping DPS or healing without needing third-party addons."
    },
    {
      id: "controller-barbershop",
      title: "Controller Support & Barbershop",
      icon: "🎮",
      badge: "Accessibility",
      desc: "Native controller support for cozy handheld/couch leveling. Barbershop available in major capitals for hairstyle, beard, and skin tones."
    },
    {
      id: "reagent-free-spells",
      title: "Reagent-Free Class Abilities",
      icon: "🎒",
      badge: "Bag Space Overhaul",
      desc: "Vendor-bought reagents are eliminated! Spells no longer consume Ankhs, 28 Soul Shards, Flash Powder, Symbols of Kings, Wild Berries, or Teleport Runes."
    },
    {
      id: "buff-duration-50",
      title: "50% Longer Raid Buffs",
      icon: "⏳",
      badge: "Group Quality of Life",
      desc: "All long-duration group and raid buffs (Arcane Intellect, Mark of the Wild, Fortitude, Blessings) now last 45 to 90 minutes. No mid-dungeon expiration."
    },
    {
      id: "profession-passives",
      title: "All 9 Profession Combat Passives",
      icon: "⚒️",
      badge: "Tradeskill Power",
      desc: "Every primary profession grants permanent character power: Mining (+5% HP), Herbalism (+Resistances & Heal), Skinning (+Crit), Alchemy (Mixology 2x Flasks), etc."
    },
    {
      id: "legacy-cosmetics-track",
      title: "65-Point Legacy Cosmetics Track",
      icon: "🏆",
      badge: "Account Progression",
      desc: "Allocate 16 points per character into talent trees, while earning up to 65 total Legacy Points on your account to unlock exclusive heritage mounts, tabards, and pets."
    }
  ],

  professionPassives: [
    {
      name: "Mining",
      type: "Gathering",
      icon: "⛏️",
      passiveName: "Toughness",
      passiveEffect: "Increases maximum Health by a flat 5%, scaling dynamically with total Stamina.",
      campBonus: "Can place Deepstone Crucible: party members gain +15 Mining skill and 10% armor."
    },
    {
      name: "Herbalism",
      type: "Gathering",
      icon: "🌿",
      passiveName: "Nature's Ward & Lifeblood",
      passiveEffect: "Increases all Magic Resistances by +10 and grants an on-use 2-minute heal recovering health over 6 seconds.",
      campBonus: "Can place Incense Candle: party members gain +15 Intellect and 10% movement speed."
    },
    {
      name: "Skinning",
      type: "Gathering",
      icon: "🔪",
      passiveName: "Master of Anatomy",
      passiveEffect: "Increases Critical Strike rating by 1.5% across all physical and magical abilities.",
      campBonus: "Can place Drying Rack: party members gain +10 Agility and 10% dodge chance."
    },
    {
      name: "Blacksmithing",
      type: "Production",
      icon: "🔨",
      passiveName: "Weapon Honing & Sockets",
      passiveEffect: "Permanent +16 Attack Power or +12 Spell Damage weapon buff, plus bonus socket in bracers.",
      campBonus: "Can place Sharpening Wheel / Anvil: party members gain +10% Attack Power for 1 hour."
    },
    {
      name: "Alchemy",
      type: "Production",
      icon: "🧪",
      passiveName: "Mixology & Elixir Mastery",
      passiveEffect: "100% increased duration on all Flasks and Elixirs, plus 25% increased health and mana from healing potions.",
      campBonus: "Can place Alchemist's Still: party members gain +10% potion and elixir effectiveness."
    },
    {
      name: "Tailoring",
      type: "Production",
      icon: "🧵",
      passiveName: "Spirit Weaving & Spellthread",
      passiveEffect: "Increases Spirit by +15 and grants chance on spellcast to restore 200 mana or energy.",
      campBonus: "Can place Faction Banner / Loom: party members gain +Spirit and 8 MP5 mana regeneration."
    },
    {
      name: "Leatherworking",
      type: "Production",
      icon: "🛡️",
      passiveName: "Fur Lining & Reinforcements",
      passiveEffect: "Exclusive bracer and chest lining granting +100 Armor and +15 Stamina.",
      campBonus: "Can place Leatherworker's Stretcher: party members gain +8% physical damage reduction."
    },
    {
      name: "Enchanting",
      type: "Production",
      icon: "✨",
      passiveName: "Ring Enchantments",
      passiveEffect: "Exclusive enchantments on finger slots: +8 All Stats, +14 Spell Power, or +24 Attack Power.",
      campBonus: "Can place Resonating Crystal: party members gain +10 Spell Power and 5% reduced cast pushback."
    },
    {
      name: "Engineering",
      type: "Production",
      icon: "⚙️",
      passiveName: "Tinkers & Goggles",
      passiveEffect: "Access to high-powered epic helm goggles, parachute cloak tinkers, and rocket boots with 0% backfire chance in raids.",
      campBonus: "Can place Field Repair Bot & Alarm Sentry: free repairs and anti-stealth detection."
    }
  ],

  gameEditions: {
    standard: {
      name: "Standard Edition",
      badge: "Included with WoW Sub",
      cost: "$0 Box Price",
      description: "Full access to World of Warcraft: Forever on launch day (Nov 4, 2026) for anyone with an active World of Warcraft monthly subscription or game time.",
      perks: [
        "Full access to all Level 1–60 content, dungeons, and raids",
        "Playable Skyborne race and all 6 new race/class combinations",
        "Permanent horizontal progression & realmless rulesets",
        "Zero token / zero paid boost environment"
      ]
    },
    epicPack: {
      name: "Skyborne Epic Pack",
      badge: "Digital Pre-Purchase",
      cost: "$59.99 USD",
      description: "Collector's digital bundle offering immediate beta access, game time, exclusive cosmetics, and friend invite passes.",
      perks: [
        "Guaranteed Closed Beta Access (Live Now!)",
        "Three (3) Invite-A-Friend Launch & Beta Keys",
        "30 Days of World of Warcraft Game Time included",
        "Exclusive Ground Mount: Veteran Adventurer's Loyal Companion (Canine Hound)",
        "Transmog Ensemble: Veteran Adventurer's Outdoor Wear",
        "Four (4) Vanity Pets: Zergling, Panda, Diablo, and Pachimari",
        "Faction Tabards: High Elf Lordaeron Crest & Shen'dorei Sun-Embroidered Tabards"
      ]
    }
  },

  engineSpecs: {
    minimum: {
      os: "Windows 10 64-bit",
      cpu: "4-Core Processor (3.0 GHz)",
      ram: "8 GB RAM",
      gpu: "DirectX 12 capable 4 GB VRAM (GTX 1060 / AMD RX 5500 / Iris Xe)",
      storage: "SSD Strictly Required (Solid State Drive)",
      target: "1080p @ 30–60 FPS (Fair/Low Settings)"
    },
    recommended: {
      os: "Windows 11 64-bit",
      cpu: "8-Core Modern Processor (e.g. Ryzen 7 5800X / Intel i7-12700K)",
      ram: "16 GB High-Speed RAM",
      gpu: "DirectX 12 Ray-Tracing capable 8 GB VRAM (RTX 3070 / 4070 / RX 6800)",
      storage: "NVMe M.2 SSD",
      target: "1440p / 4K @ 60–144 FPS with Ray-Traced Global Illumination"
    }
  },

  fullDungeonProgressionCurve: [
    { level: "13 – 18", name: "Hall of Thanes", zone: "Ironforge", isNew: true, betaActive: true },
    { level: "13 – 18", name: "Ragefire Chasm", zone: "Orgrimmar", isNew: false, betaActive: true },
    { level: "15 – 20", name: "Ruins of Lordaeron", zone: "Tirisfal Glades", isNew: true, betaActive: true },
    { level: "17 – 24", name: "The Deadmines", zone: "Westfall", isNew: false, betaActive: true },
    { level: "17 – 24", name: "Wailing Caverns", zone: "The Barrens", isNew: false, betaActive: true },
    { level: "22 – 30", name: "Shadowfang Keep", zone: "Silverpine Forest", isNew: false, betaActive: true },
    { level: "24 – 29", name: "Excavation Site 4", zone: "Wetlands", isNew: true, betaActive: false },
    { level: "24 – 32", name: "Blackfathom Deeps", zone: "Ashenvale", isNew: false, betaActive: false },
    { level: "24 – 32", name: "The Stockade", zone: "Stormwind City", isNew: false, betaActive: false },
    { level: "28 – 34", name: "City of Dalaran (Under Siege)", zone: "Alterac Mountains", isNew: true, betaActive: false },
    { level: "29 – 38", name: "Gnomeregan", zone: "Dun Morogh", isNew: false, betaActive: false },
    { level: "29 – 38", name: "Razorfen Kraul", zone: "The Barrens", isNew: false, betaActive: false },
    { level: "34 – 45", name: "Scarlet Monastery (All 4 Wings)", zone: "Tirisfal Glades", isNew: false, betaActive: false },
    { level: "35 – 42", name: "The Drowned City", zone: "Stranglethorn Vale", isNew: true, betaActive: false },
    { level: "37 – 46", name: "Razorfen Downs", zone: "The Barrens", isNew: false, betaActive: false },
    { level: "40 – 46", name: "Krol'dok Stronghold", zone: "Riverglades (New Zone)", isNew: true, betaActive: false },
    { level: "41 – 51", name: "Uldaman", zone: "Badlands", isNew: false, betaActive: false },
    { level: "44 – 54", name: "Zul'Farrak", zone: "Tanaris", isNew: false, betaActive: false },
    { level: "46 – 55", name: "Maraudon", zone: "Desolace", isNew: false, betaActive: false },
    { level: "48 – 54", name: "Alcaz Island Prison", zone: "Dustwallow Marsh", isNew: true, betaActive: false },
    { level: "50 – 60", name: "Sunken Temple (Temple of Atal'Hakkar)", zone: "Swamp of Sorrows", isNew: false, betaActive: false },
    { level: "52 – 60", name: "Blackrock Depths", zone: "Blackrock Mountain", isNew: false, betaActive: false },
    { level: "55 – 60", name: "Blackmaw Hold", zone: "Azshara", isNew: true, betaActive: false },
    { level: "55 – 60", name: "Lower Blackrock Spire (LBRS)", zone: "Blackrock Mountain", isNew: false, betaActive: false },
    { level: "58 – 60", name: "Shaper's Terrace", zone: "Un'Goro Crater", isNew: true, betaActive: false },
    { level: "58 – 60", name: "Stratholme (Live & Dead)", zone: "Eastern Plaguelands", isNew: false, betaActive: false },
    { level: "58 – 60", name: "Scholomance", zone: "Western Plaguelands", isNew: false, betaActive: false },
    { level: "58 – 60", name: "Dire Maul (East, West, North)", zone: "Feralas", isNew: false, betaActive: false },
    { level: "58 – 60", name: "Upper Blackrock Spire (UBRS 10m)", zone: "Blackrock Mountain", isNew: false, betaActive: false }
  ],

  legacyTreesData: {
    totalPoints: 16,
    trees: [
      {
        id: "professions",
        name: "Tradeskill Mastery",
        icon: "⚒️",
        color: "#f59e0b",
        perks: [
          { id: "prof-1", name: "Artisan's Eye", max: 3, desc: "+5% chance to discover rare crafting recipes and gathering books." },
          { id: "prof-2", name: "Resourceful Forge", max: 3, desc: "10% chance to not consume primary metal or cloth when crafting." },
          { id: "prof-3", name: "Campfire Crafting", max: 2, desc: "Crafting speed increased by 50% while resting at any campfire." }
        ]
      },
      {
        id: "adventure",
        name: "World Explorer",
        icon: "🧭",
        color: "#38bdf8",
        perks: [
          { id: "adv-1", name: "Deep Rest", max: 3, desc: "Rested experience accumulates 25% faster while logged out." },
          { id: "adv-2", name: "Swift Wind", max: 3, desc: "Flight path travel velocity increased by +15% across all taxi routes." },
          { id: "adv-3", name: "Pathfinder Instinct", max: 2, desc: "Unlocks subtle minimap tracking for rare creatures and treasure chests." }
        ]
      },
      {
        id: "resourcefulness",
        name: "Resourcefulness & Economy",
        icon: "💰",
        color: "#10b981",
        perks: [
          { id: "res-1", name: "Merchant's Favor", max: 3, desc: "Reduces vendor purchase and repair costs by 5% per point." },
          { id: "res-2", name: "Vault Expansion", max: 2, desc: "Grants +2 permanent bank bag storage slots." },
          { id: "res-3", name: "Enduring Campfire", max: 3, desc: "Extends campfire and placed profession station duration by 30 mins." }
        ]
      }
    ]
  },

  squadRosterPresets: [
    { id: "roster-1", name: "Marcus", faction: "Horde", race: "Undead", className: "Paladin", role: "Tank", spec: "Protection", notes: "Main Tank with custom undead charger mount!" },
    { id: "roster-2", name: "Young Hermit Crab", faction: "Horde", race: "Orc", className: "Mage", role: "Ranged DPS", spec: "Frost", notes: "Frost Mage 60 build ready for dungeon grinding" },
    { id: "roster-3", name: "Andrewm", faction: "Horde", race: "Troll", className: "Warlock", role: "Ranged DPS", spec: "Affliction", notes: "Warlock summons and DPS" }
  ],

  skyborneRace: {
    name: "The Skyborne",
    origin: "Zephras Isle (Floating realm in upper Kalimdor skies)",
    factionOption: "Neutral (Aligns with Alliance or Horde at Level 10)",
    allianceTitle: "High Order Skyborne",
    hordeTitle: "Windshaper Skyborne",
    classes: ["Warrior", "Hunter", "Rogue", "Druid"],
    lore: "Descendants of high elves and elemental wind-weavers who took sanctuary on Zephras Isle during the Great Sundering. Their return to Azeroth marks the rekindling of ancient forgotten pacts.",
    racials: [
      {
        name: "Gale Step",
        type: "Active (2 Min Cooldown)",
        effect: "Harness a thermal updraft to dash forward 10 yards, instantly breaking all snare and immobilize effects."
      },
      {
        name: "Windborne Grace",
        type: "Passive",
        effect: "Reduces falling velocity by 30% and diminishes falling damage by 50%."
      },
      {
        name: "Zephyr Attunement",
        type: "Passive",
        effect: "Increases Nature and Arcane Resistance by 10, and enhances baseline out-of-combat regeneration by 5%."
      },
      {
        name: "Feathercraft",
        type: "Passive",
        effect: "Increases skill in Tailoring and Leatherworking by +5."
      }
    ]
  },

  newClassCombos: [
    {
      race: "Undead (Forsaken)",
      className: "Paladin",
      faction: "Horde",
      role: "Tank / Healer / DPS",
      lore: "Former knights of the Silver Hand whose broken faith now burns with agonizing cleansing light. Unlocks the unique 'Forsaken Charger' skeletal warhorse mount at level 40!",
      icon: "paladin-undead",
      badgeColor: "#C41E3A",
      mount: "Forsaken Charger (Unique Skeletal Warhorse)"
    },
    {
      race: "Dwarf",
      className: "Shaman",
      faction: "Alliance",
      role: "Healer / DPS / Tank",
      lore: "Wildhammer clan emissaries from the Aerie Peak who commune with storm elementals and Khaz Modan stone. Brings Bloodlust and totems to Alliance.",
      icon: "shaman-dwarf",
      badgeColor: "#0078FF",
      mount: "Armored Ram of the Storm"
    },
    {
      race: "Gnome",
      className: "Priest",
      faction: "Alliance",
      role: "Healer / DPS",
      lore: "Tinkers and scholars of Gnomeregan who analyze the divine geometry of the Light and psychological frequencies of Shadow.",
      icon: "priest-gnome",
      badgeColor: "#0078FF",
      mount: "Mechanostrider of Clarity"
    },
    {
      race: "Orc",
      className: "Mage",
      faction: "Horde",
      role: "Ranged DPS",
      lore: "Students of ancient clan scrolls studying ley lines beneath Durotar, combining Blood Fury with devastating pyroblasts and arcane torrents.",
      icon: "mage-orc",
      badgeColor: "#C41E3A",
      mount: "Arcane-Runed War Wolf"
    },
    {
      race: "Human",
      className: "Hunter",
      faction: "Alliance",
      role: "Ranged / Melee DPS",
      lore: "Frontiersmen, royal gamekeepers, and marksmen from the Elwynn woods, accompanied by guard mastiffs and redridge cougars.",
      icon: "hunter-human",
      badgeColor: "#0078FF",
      mount: "Elwynn Steed"
    },
    {
      race: "Troll",
      className: "Warlock",
      faction: "Horde",
      role: "Ranged DPS",
      lore: "Shadow hunters and witch doctors who delve past Loa spirits into nether pacts, binding felhounds and succubi through ancient voodoo mojo.",
      icon: "warlock-troll",
      badgeColor: "#C41E3A",
      mount: "Shadow-Marked Raptor"
    }
  ],

  allRacesData: [
    {
      id: "human",
      name: "Human",
      faction: "Alliance",
      icon: "👤",
      crest: "🦁",
      mount: "Elwynn Steed (Horse)",
      lore: "Resilient and adaptive defenders of the Kingdom of Stormwind. Their mastery of swords, diplomatic spirit, and indomitable will make them natural leaders.",
      allowedClasses: [
        { name: "Warrior", isNew: false },
        { name: "Paladin", isNew: false },
        { name: "Hunter", isNew: true, note: "✦ NEW IN FOREVER: Royal gamekeepers and marksmen" },
        { name: "Rogue", isNew: false },
        { name: "Priest", isNew: false },
        { name: "Mage", isNew: false },
        { name: "Warlock", isNew: false }
      ],
      racials: [
        { name: "Will to Survive", type: "Active • 2m CD", effect: "Instantly removes all stun effects from your character." },
        { name: "Perception", type: "Active • 3m CD", effect: "Dramatically enhances stealth detection for 20 seconds." },
        { name: "Sword Specialization", type: "Passive", effect: "Increases spell and ability critical strike chance by +2% when wielding 1H or 2H Swords." },
        { name: "The Human Spirit", type: "Passive", effect: "Increases total Spirit by 5% and boosts reputation gains by +10%." }
      ]
    },
    {
      id: "dwarf",
      name: "Dwarf",
      faction: "Alliance",
      icon: "⛏️",
      crest: "🛡️",
      mount: "Mountain Ram / Armored Storm Ram (Shaman)",
      lore: "Hardy mountain-dwellers of Ironforge and the Wildhammer peaks of Aerie Peak. Master miners and storm-callers who draw resilience from Khaz Modan stone.",
      allowedClasses: [
        { name: "Warrior", isNew: false },
        { name: "Paladin", isNew: false },
        { name: "Hunter", isNew: false },
        { name: "Rogue", isNew: false },
        { name: "Priest", isNew: false },
        { name: "Shaman", isNew: true, note: "✦ NEW IN FOREVER: Wildhammer shamans bringing Bloodlust and totems to Alliance" }
      ],
      racials: [
        { name: "Stoneform", type: "Active • 2m CD", effect: "Removes bleed, poison, and disease effects, and grants flat 10% damage reduction for 8 seconds." },
        { name: "Find Treasure", type: "Active • Toggle", effect: "Enables sensory tracking of nearby treasure chests on your minimap." },
        { name: "Mace Specialization", type: "Passive", effect: "Increases spell and ability critical strike chance by +1% when wielding 1H or 2H Maces." },
        { name: "Big Game Hunter", type: "Passive", effect: "Increases damage dealt to Beasts by +5% and grants +10 Frost Resistance." }
      ]
    },
    {
      id: "nightelf",
      name: "Night Elf",
      faction: "Alliance",
      icon: "🌙",
      crest: "🏹",
      mount: "Nightsaber",
      lore: "Ancient, reclusive protectors of Darnassus and Teldrassil attuned to the goddess Elune and the emerald dream.",
      allowedClasses: [
        { name: "Warrior", isNew: false },
        { name: "Hunter", isNew: false },
        { name: "Rogue", isNew: false },
        { name: "Priest", isNew: false },
        { name: "Druid", isNew: false }
      ],
      racials: [
        { name: "Shadowmeld", type: "Active • 10s CD", effect: "Blend into shadows while stationary, breaking hostile combat tracking and stealthing." },
        { name: "Elune's Light", type: "Active • 3m CD", effect: "Calls down celestial radiance, increasing physical and spell critical chance by +10% for 15 seconds." },
        { name: "Quickness", type: "Passive", effect: "Grants +1% Dodge chance and +2% passive out-of-combat movement speed." },
        { name: "Wisp Spirit", type: "Passive", effect: "Increases movement speed while dead by 50% and grants +10 Nature Resistance." }
      ]
    },
    {
      id: "gnome",
      name: "Gnome",
      faction: "Alliance",
      icon: "⚙️",
      crest: "🔧",
      mount: "Mechanostrider of Clarity",
      lore: "Brilliant, eccentric inventors of Gnomeregan who analyze arcane calculus, mechanical wizardry, and divine geometry.",
      allowedClasses: [
        { name: "Warrior", isNew: false },
        { name: "Rogue", isNew: false },
        { name: "Priest", isNew: true, note: "✦ NEW IN FOREVER: Tinkers of the Light and psychological Shadow mechanics" },
        { name: "Mage", isNew: false },
        { name: "Warlock", isNew: false }
      ],
      racials: [
        { name: "Escape Artist", type: "Active • 1m CD", effect: "Instantly breaks all immobilizing and movement-impairing snares or roots." },
        { name: "Eureka!", type: "Active • 2m CD", effect: "Reduces resource costs of your next 3 spells/abilities by 50% and boosts potency." },
        { name: "Expansive Mind", type: "Passive", effect: "Increases total Intellect by +5% and increases max Energy/Rage resource pools by +5%." },
        { name: "Engineering Specialist", type: "Passive", effect: "Increases Engineering skill by +15 and grants +10 Arcane Resistance." }
      ]
    },
    {
      id: "skyborne",
      name: "The Skyborne",
      faction: "Neutral (Alliance or Horde at L10)",
      icon: "🦅",
      crest: "💨",
      mount: "Cloudrunner / Sky-Strider",
      lore: "A majestic neutral race of high elven wind-weavers who took refuge on Zephras Isle during the Great Sundering. Masters of aerodynamics and aerial combat.",
      allowedClasses: [
        { name: "Warrior", isNew: true, note: "✦ NEW PLAYABLE RACE" },
        { name: "Hunter", isNew: true, note: "✦ NEW PLAYABLE RACE" },
        { name: "Rogue", isNew: true, note: "✦ NEW PLAYABLE RACE" },
        { name: "Druid", isNew: true, note: "✦ NEW PLAYABLE RACE: Alliance & Horde get new Druid option!" }
      ],
      racials: [
        { name: "Gale Step", type: "Active • 2m CD", effect: "Harness a thermal updraft to dash forward 10 yards, instantly breaking all snare and immobilize effects." },
        { name: "Zephyr Glide", type: "Active • 1m CD", effect: "Conjures updrafts that slow falling speed by 50% and increase forward jump distance." },
        { name: "Windborne Grace", type: "Passive", effect: "Diminishes falling damage by 50% and grants +5% baseline out-of-combat regeneration." },
        { name: "Zephyr Attunement", type: "Passive", effect: "Increases Nature and Arcane Resistance by +10 and grants +5 Tailoring/Leatherworking skill." }
      ]
    },
    {
      id: "orc",
      name: "Orc",
      faction: "Horde",
      icon: "🐺",
      crest: "🪓",
      mount: "War Wolf / Arcane-Runed Wolf (Mage)",
      lore: "Fierce warriors and shamans of Durotar who have forged a noble destiny under Thrall's Horde, embracing elemental honor and ley line magics.",
      allowedClasses: [
        { name: "Warrior", isNew: false },
        { name: "Hunter", isNew: false },
        { name: "Rogue", isNew: false },
        { name: "Shaman", isNew: false },
        { name: "Mage", isNew: true, note: "✦ NEW IN FOREVER: Durotar ley line scholars combining Blood Fury with Pyroblasts" },
        { name: "Warlock", isNew: false }
      ],
      racials: [
        { name: "Blood Fury", type: "Active • 2m CD", effect: "Increases both Attack Power and Spell Power based on character level for 15 sec with NO healing reduction!" },
        { name: "Hardiness", type: "Passive / Break", effect: "Increases passive resistance to Stun effects by +15%." },
        { name: "Command", type: "Passive", effect: "Increases damage dealt by combat pets and summoned minions by +5%." },
        { name: "Axe Specialization", type: "Passive", effect: "Increases critical strike chance with 1H and 2H Axes by +1.5%." }
      ]
    },
    {
      id: "undead",
      name: "Undead (Forsaken)",
      faction: "Horde",
      icon: "💀",
      crest: "☣️",
      mount: "Skeletal Warhorse / Forsaken Charger (Paladin)",
      lore: "Free-willed undead of Lordaeron who broke free from the Lich King's grasp under Queen Sylvanas. Dark vengeance and agonizing holy light guide their crusade.",
      allowedClasses: [
        { name: "Warrior", isNew: false },
        { name: "Paladin", isNew: true, note: "✦ NEW IN FOREVER: Horde's first Paladin! Features custom Forsaken Charger skeletal warhorse" },
        { name: "Rogue", isNew: false },
        { name: "Priest", isNew: false },
        { name: "Mage", isNew: false },
        { name: "Warlock", isNew: false }
      ],
      racials: [
        { name: "Cannibalize", type: "Active • 2m CD", effect: "Consume a nearby humanoid or undead corpse to regenerate 35% total Health and Mana over 10 seconds." },
        { name: "Will of the Forsaken", type: "Active • 2m CD", effect: "Provides an active break against Charm, Fear, and Sleep effects." },
        { name: "Touch of the Grave", type: "Passive", effect: "Damaging attacks have a chance to drain shadow energy, inflicting shadow damage and healing you for the same amount." },
        { name: "Shadow Resistance", type: "Passive", effect: "Increases Shadow Resistance by +10 and grants unlimited underwater breathing." }
      ]
    },
    {
      id: "tauren",
      name: "Tauren",
      faction: "Horde",
      icon: "🐂",
      crest: "🌾",
      mount: "Kodo",
      lore: "Spiritual, towering nomads of Mulgore dedicated to the Earth Mother, shamanic balance, and ancestral strength.",
      allowedClasses: [
        { name: "Warrior", isNew: false },
        { name: "Hunter", isNew: false },
        { name: "Shaman", isNew: false },
        { name: "Druid", isNew: false }
      ],
      racials: [
        { name: "War Stomp", type: "Active • 2m CD", effect: "Stuns up to 5 enemies within 8 yards for 2 seconds (0.5s cast)." },
        { name: "Plains Running", type: "Active • Toggle", effect: "Engage ancestral running gait, increasing out-of-combat movement speed by +40% when dismounted." },
        { name: "Endurance", type: "Passive", effect: "Increases total maximum Health by a flat +5%." },
        { name: "Cultivation", type: "Passive", effect: "Increases Herbalism skill by +15 and grants +10 Nature Resistance." }
      ]
    },
    {
      id: "troll",
      name: "Troll (Darkspear)",
      faction: "Horde",
      icon: "🏹",
      crest: "🌴",
      mount: "Raptor",
      lore: "Exiled island hunters and witch doctors led by Vol'jin who commune with Loa spirits, master voodoo hexes, and nether demonology.",
      allowedClasses: [
        { name: "Warrior", isNew: false },
        { name: "Hunter", isNew: false },
        { name: "Rogue", isNew: false },
        { name: "Priest", isNew: false },
        { name: "Shaman", isNew: false },
        { name: "Mage", isNew: false },
        { name: "Warlock", isNew: true, note: "✦ NEW IN FOREVER: Voodoo witch doctors binding nether demons through Loa mojo" }
      ],
      racials: [
        { name: "Berserking", type: "Active • 2m CD", effect: "Increases melee, ranged, and spell casting speed by a flat 15% for 10 seconds (no health penalty!)." },
        { name: "Regeneration", type: "Passive", effect: "Increases total health regeneration rate by 10%, and allows 10% of health regen to continue during combat." },
        { name: "Beast Slaying", type: "Passive", effect: "Increases damage dealt against Beasts by +5%." },
        { name: "Bow & Thrown Specialization", type: "Passive", effect: "Increases Critical Strike chance with Bows and Thrown weapons by +1%." }
      ]
    }
  ],

  allClassesData: [
    {
      id: "warrior",
      name: "Warrior",
      icon: "⚔️",
      role: "Tank / Melee DPS",
      specs: "Arms • Fury • Protection",
      armor: "Plate (Lvl 40), Mail (1–39), Shields",
      resource: "Rage",
      color: "#C79C6E",
      description: "Masters of physical combat who wield heavy plate armor and devastating two-handed weapons. Unstoppable frontline tanks and berserkers.",
      allowedRaces: [
        { id: "human", name: "Human", faction: "Alliance", isNew: false },
        { id: "dwarf", name: "Dwarf", faction: "Alliance", isNew: false },
        { id: "nightelf", name: "Night Elf", faction: "Alliance", isNew: false },
        { id: "gnome", name: "Gnome", faction: "Alliance", isNew: false },
        { id: "skyborne", name: "The Skyborne", faction: "Alliance & Horde", isNew: true, note: "✦ New in Forever: Aerial mobility & root-breaking charge" },
        { id: "orc", name: "Orc", faction: "Horde", isNew: false },
        { id: "undead", name: "Undead", faction: "Horde", isNew: false },
        { id: "tauren", name: "Tauren", faction: "Horde", isNew: false },
        { id: "troll", name: "Troll", faction: "Horde", isNew: false }
      ]
    },
    {
      id: "paladin",
      name: "Paladin",
      icon: "🛡️",
      role: "Tank / Healer / Melee DPS",
      specs: "Holy • Protection • Retribution",
      armor: "Plate (Lvl 40), Mail (1–39), Shields",
      resource: "Mana",
      color: "#F58CBA",
      description: "Holy crusaders who protect allies with blessings, auras, and shields while smiting demons and undead with righteous light. Now receives Hand of Reckoning taunt.",
      allowedRaces: [
        { id: "human", name: "Human", faction: "Alliance", isNew: false },
        { id: "dwarf", name: "Dwarf", faction: "Alliance", isNew: false },
        { id: "undead", name: "Undead (Forsaken)", faction: "Horde", isNew: true, note: "✦ NEW IN FOREVER: Horde's first Paladin! Features custom Forsaken Charger skeletal warhorse" }
      ]
    },
    {
      id: "hunter",
      name: "Hunter",
      icon: "🏹",
      role: "Ranged / Melee DPS",
      specs: "Beast Mastery • Marksmanship • Survival",
      armor: "Mail (Lvl 40), Leather (1–39)",
      resource: "Mana",
      color: "#ABD473",
      description: "Deadly trackers and marksmen of the wilderness who tame savage beasts, lay tactical traps, and unleash barrages of arrows and bullets.",
      allowedRaces: [
        { id: "human", name: "Human", faction: "Alliance", isNew: true, note: "✦ NEW IN FOREVER: Elwynn forest gamekeepers and marksmen" },
        { id: "dwarf", name: "Dwarf", faction: "Alliance", isNew: false },
        { id: "nightelf", name: "Night Elf", faction: "Alliance", isNew: false },
        { id: "skyborne", name: "The Skyborne", faction: "Alliance & Horde", isNew: true, note: "✦ New in Forever: Wind-guided archery and cloud-falcon taming" },
        { id: "orc", name: "Orc", faction: "Horde", isNew: false },
        { id: "tauren", name: "Tauren", faction: "Horde", isNew: false },
        { id: "troll", name: "Troll", faction: "Horde", isNew: false }
      ]
    },
    {
      id: "rogue",
      name: "Rogue",
      icon: "🗡️",
      role: "Melee DPS",
      specs: "Assassination • Combat • Subtlety",
      armor: "Leather",
      resource: "Energy / Combo Points",
      color: "#FFF569",
      description: "Silent stalkers who strike from the shadows with dual daggers, lockpicking expertise, and deadly poisons. In Forever, poisons and abilities do not require vendor reagents.",
      allowedRaces: [
        { id: "human", name: "Human", faction: "Alliance", isNew: false },
        { id: "dwarf", name: "Dwarf", faction: "Alliance", isNew: false },
        { id: "nightelf", name: "Night Elf", faction: "Alliance", isNew: false },
        { id: "gnome", name: "Gnome", faction: "Alliance", isNew: false },
        { id: "skyborne", name: "The Skyborne", faction: "Alliance & Horde", isNew: true, note: "✦ New in Forever: Gliding backstabs and thermal shadow maneuvers" },
        { id: "orc", name: "Orc", faction: "Horde", isNew: false },
        { id: "undead", name: "Undead", faction: "Horde", isNew: false },
        { id: "troll", name: "Troll", faction: "Horde", isNew: false }
      ]
    },
    {
      id: "priest",
      name: "Priest",
      icon: "✨",
      role: "Healer / Ranged DPS",
      specs: "Discipline • Holy • Shadow",
      armor: "Cloth",
      resource: "Mana",
      color: "#FFFFFF",
      description: "Masters of divine prayer and mind-bending shadow. Supreme group healers with Power Word shields, or devastating Shadowform damage dealers.",
      allowedRaces: [
        { id: "human", name: "Human", faction: "Alliance", isNew: false },
        { id: "dwarf", name: "Dwarf", faction: "Alliance", isNew: false },
        { id: "nightelf", name: "Night Elf", faction: "Alliance", isNew: false },
        { id: "gnome", name: "Gnome", faction: "Alliance", isNew: true, note: "✦ NEW IN FOREVER: Mechanostrider of Clarity mount; geometric Light and mental Shadow" },
        { id: "undead", name: "Undead", faction: "Horde", isNew: false },
        { id: "troll", name: "Troll", faction: "Horde", isNew: false }
      ]
    },
    {
      id: "shaman",
      name: "Shaman",
      icon: "⚡",
      role: "Healer / Melee & Ranged DPS / Off-Tank",
      specs: "Elemental • Enhancement • Restoration",
      armor: "Mail (Lvl 40), Leather (1–39), Shields",
      resource: "Mana",
      color: "#0070DE",
      description: "Spiritual masters who commune with fire, earth, water, and air. Drop powerful totems and unleash chain lightning and healing rains.",
      allowedRaces: [
        { id: "dwarf", name: "Dwarf (Wildhammer)", faction: "Alliance", isNew: true, note: "✦ NEW IN FOREVER: Brings Bloodlust, Windfury, and totems to Alliance!" },
        { id: "orc", name: "Orc", faction: "Horde", isNew: false },
        { id: "tauren", name: "Tauren", faction: "Horde", isNew: false },
        { id: "troll", name: "Troll", faction: "Horde", isNew: false }
      ]
    },
    {
      id: "mage",
      name: "Mage",
      icon: "🔥",
      role: "Ranged DPS",
      specs: "Arcane • Fire • Frost",
      armor: "Cloth",
      resource: "Mana",
      color: "#69CCF0",
      description: "Masters of the arcane elements who conjure food, teleport across continents with no rune cost, freeze foes in place, and unleash volcanic pyroblasts.",
      allowedRaces: [
        { id: "human", name: "Human", faction: "Alliance", isNew: false },
        { id: "gnome", name: "Gnome", faction: "Alliance", isNew: false },
        { id: "orc", name: "Orc", faction: "Horde", isNew: true, note: "✦ NEW IN FOREVER: Ley line masters combining Blood Fury with devastating Pyroblasts" },
        { id: "undead", name: "Undead", faction: "Horde", isNew: false },
        { id: "troll", name: "Troll", faction: "Horde", isNew: false }
      ]
    },
    {
      id: "warlock",
      name: "Warlock",
      icon: "🔮",
      role: "Ranged DPS",
      specs: "Affliction • Demonology • Destruction",
      armor: "Cloth",
      resource: "Mana / Health (Life Tap)",
      color: "#9482C9",
      description: "Dark practitioners who enslave demonic minions, curse enemies with lingering afflictions, and summon allies without burning endless soul shards.",
      allowedRaces: [
        { id: "human", name: "Human", faction: "Alliance", isNew: false },
        { id: "gnome", name: "Gnome", faction: "Alliance", isNew: false },
        { id: "orc", name: "Orc", faction: "Horde", isNew: false },
        { id: "undead", name: "Undead", faction: "Horde", isNew: false },
        { id: "troll", name: "Troll (Darkspear)", faction: "Horde", isNew: true, note: "✦ NEW IN FOREVER: Voodoo witch doctors binding nether demons through Loa mojo" }
      ]
    },
    {
      id: "druid",
      name: "Druid",
      icon: "🌿",
      role: "Tank / Healer / Melee & Ranged DPS",
      specs: "Balance • Feral Combat • Restoration",
      armor: "Leather",
      resource: "Mana / Rage (Bear) / Energy (Cat)",
      color: "#FF7D0A",
      description: "Shape-shifting keepers of nature who transform into ferocious bears, swift feline stalkers, aquatic sea-beasts, or moonkin spellcasters.",
      allowedRaces: [
        { id: "nightelf", name: "Night Elf", faction: "Alliance", isNew: false },
        { id: "skyborne", name: "The Skyborne", faction: "Alliance & Horde", isNew: true, note: "✦ NEW IN FOREVER: Sky-eagle flight forms and wind-weave nature magic" },
        { id: "tauren", name: "Tauren", faction: "Horde", isNew: false }
      ]
    }
  ],

  dungeonsAndRaids: [
    {
      id: "dungeon-01",
      name: "Hall of Thanes",
      type: "5-Man Dungeon",
      levelRange: "13 – 18",
      zone: "Ironforge Depths (Khaz Modan)",
      status: "Active in Beta Phase 1",
      playableNow: true,
      description: "Subterranean crypts beneath the Great Forge, breached by deepstone troggs and corrupted elemental constructs.",
      bosses: ["Thane Magni's Remnant", "Deepstone Overlord Gorn", "Foreman Baelok", "The Lithic Golem"],
      lootHighlights: ["Thane's Runic Ring", "Forgewarden Buckler", "Trogg-Cracker Mallet"]
    },
    {
      id: "dungeon-02",
      name: "Ruins of Lordaeron",
      type: "5-Man Dungeon",
      levelRange: "15 – 20",
      zone: "Tirisfal Glades (Eastern Kingdoms)",
      status: "Active in Beta Phase 1",
      playableNow: true,
      description: "The haunted outer bastions of Lordaeron's capital, overrun by Scarlet Crusaders and vengeful spectral royal guards.",
      bosses: ["Commander Valerius", "Archmage Aethelred's Echo", "Scarlet Prelate Joshua", "The Royal Apparition"],
      lootHighlights: ["Crown of the Lost Kingdom", "Lordaeron Crested Shield", "Mantle of the Penitent"]
    },
    {
      id: "dungeon-03",
      name: "Excavation Site 4",
      type: "5-Man Dungeon",
      levelRange: "24 – 29",
      zone: "Wetlands (Eastern Kingdoms)",
      status: "Unlocks in Beta Phase 2 (Oct 8)",
      playableNow: false,
      description: "A Titan archaeological dig site in the Wetlands marshes overrun by Dark Iron saboteurs and awakened Titan sentinels.",
      bosses: ["Dark Iron Surveyor Brand", "Sentinel Archeus", "Overseer Mogok", "The Relic Core"],
      lootHighlights: ["Archeus Core Talisman", "Titan-Forged Greaves"]
    },
    {
      id: "dungeon-04",
      name: "City of Dalaran (Under Siege)",
      type: "5-Man Dungeon",
      levelRange: "28 – 34",
      zone: "Alterac Mountains",
      status: "Unlocks in Beta Phase 2 (Oct 8)",
      playableNow: false,
      description: "Before the violet dome was erected, remnants of Kirin Tor sorcerers repel Syndicate mercenaries and rogue elementals.",
      bosses: ["Syndicate Enforcer Raven", "Rogue Sorcerer Malick", "Unstable Mana Conduit", "Archmage Danielle"],
      lootHighlights: ["Kirin Tor Robe of Sparks", "Syndicate Dagger of Shadows"]
    },
    {
      id: "dungeon-05",
      name: "The Drowned City",
      type: "5-Man Dungeon",
      levelRange: "35 – 42",
      zone: "Stranglethorn Vale (Sunken Coast)",
      status: "Launch Day Content",
      playableNow: false,
      description: "An ancient Gurubashi coastal city reclaimed by the tide and infested by Bloodscalp sirens and abyssal sea beasts.",
      bosses: ["Tidestalker Kraash", "Priestess Hethriss", "Abyssal Leviathan"],
      lootHighlights: ["Tidecaller Trinket", "Trident of the Gurubashi Depths"]
    },
    {
      id: "dungeon-06",
      name: "Krol'dok Stronghold",
      type: "5-Man Dungeon",
      levelRange: "40 – 46",
      zone: "Riverglades (New Zone)",
      status: "Launch Day Content",
      playableNow: false,
      description: "A massive multi-tiered ogre fortress towering over the eastern Riverglades, uniting renegade centaurs and ogre magi.",
      bosses: ["Warboss Krol'dok", "Magi Lord Gorgor", "Chieftain Vark"],
      lootHighlights: ["Colossal Ogre Greataxe", "Riverglades Windcloak"]
    },
    {
      id: "dungeon-07",
      name: "Alcaz Island Prison",
      type: "5-Man Dungeon",
      levelRange: "48 – 54",
      zone: "Dustwallow Marsh",
      status: "Launch Day Content",
      playableNow: false,
      description: "The secret island fortress where high-value political prisoners and draconic experiments are guarded by elite Defias and black drakes.",
      bosses: ["Warden Bloodthorn", "Draconian Overseer", "Shadow Priestess Vivian"],
      lootHighlights: ["Prisoner's Broken Manacles", "Shadowfang Band"]
    },
    {
      id: "dungeon-08",
      name: "Blackmaw Hold",
      type: "5-Man Dungeon",
      levelRange: "55 – 60",
      zone: "Azshara (Kalimdor)",
      status: "Launch Day Content",
      playableNow: false,
      description: "The ancient timbermaw furbolg stronghold deep within Azshara, now corrupted by subterranean void fissures.",
      bosses: ["Chieftain Winterhoof", "Void-Touched Ursa", "Shamaness Karr"],
      lootHighlights: ["Furbolg War Totem", "Garb of the Corrupted Elder"]
    },
    {
      id: "dungeon-09",
      name: "Shaper's Terrace",
      type: "5-Man Dungeon",
      levelRange: "58 – 60",
      zone: "Un'Goro Crater",
      status: "Launch Day Content",
      playableNow: false,
      description: "The deepest Titan testing facility beneath Fire Plume Ridge, harboring primal genetic strains and ancient defense platforms.",
      bosses: ["Prime Warden Aurelius", "The Primordial Hydra", "Genesis Core 07"],
      lootHighlights: ["Crown of the Shapers", "Primordial Crystal Blade"]
    },
    {
      id: "raid-01",
      name: "Barrow Deeps (Launch Raid)",
      type: "10-Player Raid",
      levelRange: "Level 60 (Tier 1)",
      zone: "Mount Hyjal / Blackmaw Underworld",
      status: "Unlocks Dec 9, 2026",
      playableNow: false,
      description: "The subterranean prison where Illidan Stormrage was bound for ten millennia. Ancient Wardens and Shadowed Horrors guard forbidden vaults.",
      bosses: ["Warden Avatar Maiev's Vigil", "Shadow Fiend Tenebrous", "The Slumbering Druid", "Tormentor Grazz"],
      lootHighlights: ["Tier 1 Classic+ Shoulders & Helms", "Glaive of the Slumbering Watcher"]
    },
    {
      id: "raid-02",
      name: "Hyjal Summit (Launch Raid)",
      type: "20-Player Raid",
      levelRange: "Level 60 (Tier 1)",
      zone: "Mount Hyjal",
      status: "Unlocks Dec 9, 2026",
      playableNow: false,
      description: "The scorched roots of Nordrassil following Archimonde's defeat, clearing rogue Burning Legion stragglers and corrupted world-tree roots.",
      bosses: ["Dreadlord Mal'Ganis Avatar", "Anetheron the Defiler", "Corrupted Nordrassil Sapling", "General Kaz'rogal"],
      lootHighlights: ["World-Tree Heart Trinket", "Crown of Nordrassil"]
    },
    {
      id: "raid-03",
      name: "Onyxia's Lair (Forever Edition)",
      type: "40-Player Raid",
      levelRange: "Level 60 (Tier 1)",
      zone: "Dustwallow Marsh",
      status: "Unlocks Dec 9, 2026",
      playableNow: false,
      description: "The classic broodmother encounter retuned for WoW: Forever's new itemization and class balance, with new Deep Breath phase mechanics.",
      bosses: ["Onyxia, Broodmother of the Black Dragonflight"],
      lootHighlights: ["Shard of the Scale", "Vis'kag the Bloodletter", "Head of Onyxia"]
    }
  ],

  newZones: [
    {
      name: "Zephras Isle",
      level: "1 – 12",
      continent: "Kalimdor Skywall Skies",
      description: "A breathtaking cluster of floating islands suspended high above the western seas of Kalimdor. Home to the newly revealed Skyborne elves.",
      features: "Wind currents for rapid gliding, Skywall elemental spires, cloud-strider bird sanctuaries, and the neutral capital Zephras Haven."
    },
    {
      name: "Riverglades",
      level: "30 – 45",
      continent: "Eastern Kingdoms",
      description: "A vast, lush wetland and forest river-delta spanning between the Arathi Highlands and Loch Modan. Filled with over 150 brand new quests.",
      features: "Contested territory with Alliance expedition outposts, Horde lumber camps, Krol'dok Ogre Stronghold, and scenic waterway boating."
    },
    {
      name: "Mount Hyjal (Renewed)",
      level: "55 – 60",
      continent: "Kalimdor",
      description: "The sacred ancestral mountain of the night elves, now accessible as an open-world endgame progression zone after Archimonde's defeat.",
      features: "Emerald Dragon portals, Twilight Cultist camps, Barrow Deeps dungeon entrance, and Nordrassil healing rituals."
    }
  ],

  gameSystems: [
    {
      id: "camping",
      name: "The Camping & Campfire System",
      icon: "🔥",
      summary: "Rest, repair, gain 1-hour buffs, and foster social cooperation in the open world.",
      details: [
        "Evolves the basic Cooking Fire into a cooperative hub in any outdoor zone.",
        "Up to 3 player-crafted profession items can be placed around a campfire (1 per player).",
        "Buff examples: Blacksmith's Anvil (+10% Melee/Ranged AP), Weaver's Loom (+Spirit & Mana Regen), Leatherworker's Stretcher (+Armor & Stamina).",
        "Over 600 new profession recipes added across all primary and secondary tradeskills."
      ]
    },
    {
      id: "legacy",
      name: "Account-Wide Legacy Progression (16 Points at Launch)",
      icon: "🏆",
      summary: "A non-power progression system rewarding alt-leveling and completionist achievements.",
      details: [
        "Earn 16 Legacy Points at launch by leveling different classes, mastering professions, exploration, and PvP.",
        "Legacy Points are account-wide, but each character customizes their own perk allocation.",
        "Three distinct trees: Adventure (rested XP boost, flight path speed, gathering tracker), Profession (crafting yield, speed), and Resourcefulness (vendor discount, bag slot bonus)."
      ]
    },
    {
      id: "realmless",
      name: "Realmless Ruleset Engine",
      icon: "🌐",
      summary: "No locked server dead-ends: Pick your gameplay ruleset and play with the entire region.",
      details: [
        "Instead of locking into servers like 'Faerlina' or 'Whitemane', players select a Ruleset: Normal (PvE), PvP, Roleplaying (RP), or Hardcore (coming in later winter update).",
        "Dynamic seamless layering preserves local world density while preventing dead servers or 5-hour queues.",
        "Guilds and world economy operate across unified ruleset regional fabrics."
      ]
    },
    {
      id: "addon-policy",
      name: "In-Combat Addon Disarmament",
      icon: "🛡️",
      summary: "Combat calculations and automated solver macros disabled during boss fights.",
      details: [
        "Heavy computational WeakAuras and auto-assignment scripts are blocked in combat to preserve genuine execution skill.",
        "Blizzard provides native UI tools: Built-in Damage/Healing Meter, Ping System, and Cooldown Trackers.",
        "Cosmetic and inventory addons outside combat remain fully functional."
      ]
    },
    {
      id: "pvp-season",
      name: "Seasonal Rank 14 Progression",
      icon: "⚔️",
      badge: "PvP Overhaul",
      summary: "Milestone-based Rank 14 track that resets each tier with no weekly decay grind.",
      details: [
        "No more 18-hour-a-day bracket stacking: reach High Warlord / Grand Marshal through clear seasonal objectives.",
        "Rank 14 weapons retuned with modern Expertise and unified spell damage stats.",
        "Darkspear Islands 15v15 battleground and strict faction-locking on PvP rulesets."
      ]
    },
    {
      id: "hardcore-ruleset",
      name: "Hardcore Ruleset & Safety Net",
      icon: "💀",
      summary: "Permadeath with Mak'gora duels, with free mortal transfer upon death.",
      details: [
        "Coming in the later winter update. Features permanent character death and Soul of Iron.",
        "Mak'gora (Duel to the Death) rewards cosmetic Ear Trophies.",
        "Upon character death, players are granted a FREE transfer to continue playing as a mortal on Normal or PvP rulesets!"
      ]
    }
  ],

  betaLevel20Checklist: [
    { id: "step-1", text: "Create your first WoW: Forever character (Try Skyborne or new class combo)", cat: "Character" },
    { id: "step-2", text: "Reach Level 10 and unlock the revamped 1.15.8 Talent Tree", cat: "Leveling" },
    { id: "step-3", text: "Explore starting zone & locate first Camping campfire Blueprint", cat: "Camping" },
    { id: "step-4", text: "Enter Ironforge depths & complete Level 13-18 Dungeon: Hall of Thanes", cat: "Dungeons" },
    { id: "step-5", text: "Travel to Tirisfal Glades & defeat bosses in Level 15-20 Dungeon: Ruins of Lordaeron", cat: "Dungeons" },
    { id: "step-6", text: "Run classic low-level staples: Deadmines, Wailing Caverns, or Shadowfang Keep", cat: "Dungeons" },
    { id: "step-7", text: "Deploy a player-crafted campfire item and share a 1-hour buff with your party", cat: "Camping" },
    { id: "step-8", text: "Test the Retail In-Game Ping system during a dungeon run", cat: "QoL" },
    { id: "step-9", text: "Queue for the Level 10-19 bracket in Warsong Gulch", cat: "PvP" },
    { id: "step-10", text: "Hit the Phase 1 Cap: Level 20! Secure pre-BiS weapons for Phase 2", cat: "Milestone" }
  ]
};

if (typeof window !== 'undefined') {
  window.WOW_FOREVER_DATA = WOW_FOREVER_DATA;
}
