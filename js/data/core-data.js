/**
 * World of Warcraft: Forever - Core Dataset
 * Includes beta schedule, countdowns, news, zones, dungeons, camping, stats, and milestones.
 */

const WOW_FOREVER_DATA = {
  "metadata": {
    "gameTitle": "World of Warcraft: Forever",
    "subtitle": "The Living Classic+ Adventure",
    "announcementDate": "September 12, 2026 (BlizzCon 2026)",
    "betaStartDate": "September 17, 2026",
    "betaEndDate": "October 21, 2026",
    "betaTotalDays": 35,
    "betaTotalWeeks": 5,
    "launchDate": "November 4, 2026",
    "raidsDate": "December 9, 2026",
    "currentBetaPhase": "Phase 1: Week 1–3 (Level 20 Cap)",
    "engineInfo": "Custom Ray-Traced Engine (Post-Warcraft III: Reforged Continuity)",
    "maxLevel": 60,
    "currentBetaCap": 20,
    "legacyPointsAtLaunch": 16
  },
  "betaSchedule": {
    "totalDays": 35,
    "totalWeeks": 5,
    "startDate": "September 17, 2026",
    "endDate": "October 21, 2026",
    "phase1": {
      "title": "Phase 1: Foundations & Level 20 Cap",
      "dates": "September 17 – October 8, 2026",
      "duration": "21 Days (3 Weeks)",
      "cap": 20,
      "highlights": "Hall of Thanes & Ruins of Lordaeron dungeons, 10-19 Warsong Gulch, Zephras Isle, starting zones, talent tree foundation."
    },
    "phase2": {
      "title": "Phase 2: Mid-Game & Level 30 Cap",
      "dates": "October 8 – October 21, 2026",
      "duration": "14 Days (2 Weeks)",
      "cap": 30,
      "highlights": "Excavation Site 4 (Wetlands), City of Dalaran, Ashenvale & Hillsbrad open world PvP, mid-level profession blueprints."
    },
    "wipeAndLaunch": {
      "title": "Server Reset & Launch Preparation",
      "dates": "October 22 – November 3, 2026",
      "duration": "14 Days (2 Weeks)",
      "highlights": "Full server wipe of all beta test characters. Final tuning pass and global deployment prep for November 4 launch."
    }
  },
  "countdownTargets": {
    "betaPhase2": "2026-10-08T10:00:00-07:00",
    "betaEnds": "2026-10-21T23:59:59-07:00",
    "globalLaunch": "2026-11-04T15:00:00-08:00",
    "raidUnlock": "2026-12-09T10:00:00-08:00"
  },
  "quickLinks": [
    {
      "name": "Wowhead: Everything We Know",
      "url": "https://www.wowhead.com/forever/news/everything-we-know-about-wow-forever-382827",
      "icon": "🌐"
    },
    {
      "name": "Icy Veins Talent Calculator",
      "url": "https://www.icy-veins.com/wow-forever/talent-calculator",
      "icon": "⚡"
    },
    {
      "name": "Wowhead Legacy Calculator",
      "url": "https://www.wowhead.com/forever/legacy-calculator",
      "icon": "🏆"
    },
    {
      "name": "Method.gg Itemization Guide",
      "url": "https://www.method.gg/wow-classic/itemization-updates-in-world-of-warcraft-forever-expertise-spell-damage-more",
      "icon": "⚔️"
    },
    {
      "name": "Method.gg Racials Breakdown",
      "url": "https://www.method.gg/wow-classic/all-new-racial-abilities-in-world-of-warcraft-forever",
      "icon": "🦅"
    },
    {
      "name": "MrGM Ping System Demo",
      "url": "https://x.com/MrGMYT/status/2099139797524902295/video/1",
      "icon": "🎯"
    }
  ],
  "newsFeed": [
    {
      "id": "news-16",
      "title": "Beta Weekend Surge: Aggrend Reports Record Turnout as Rolling Megarealm Restarts & EU Routing Deploy",
      "source": "Blizzard Official / Twitter",
      "sourceType": "blizzard",
      "author": "Lead Designer Josh \"Aggrend\" Greenfield",
      "date": "September 21, 2026",
      "tag": "Beta Operations",
      "summary": "Aggrend reports player turnout has been the \"craziest in 17 years at Blizzard\" as engineering teams deploy rolling restarts to stabilize megarealms and release EU cross-region latency routing.",
      "content": "Following the first weekend of the World of Warcraft: Forever closed beta, lead producer and designer Josh \"Aggrend\" Greenfield addressed the community regarding unprecedented participation numbers:\n• \"Craziest Turnout in 17 Years\": Aggrend confirmed that player concurrency and login volume shattered all internal forecasts, creating heavy demand on the realmless megarealm infrastructure.\n• Rolling Server Restarts: Blizzard operations deployed rolling server restarts on September 21 (including quick 15-minute maintenance windows) to recalibrate dynamic sharding boundaries, flush memory caches, and relieve congestion in starting hubs.\n• EU Routing Optimization: A dedicated blue post confirmed European routing enhancements, optimizing network packet flow for EU players connecting to North American beta megarealms with reduced latency and packet drop.\n• Test Window Progression: Phase 1 continues with the Level 20 cap through October 8, when Phase 2 unlocks the Level 30 cap and the City of Dalaran.",
      "url": "https://news.blizzard.com/en-us/world-of-warcraft/beta-operations-turnout-eu-routing"
    },
    {
      "id": "news-17",
      "title": "Field Testing Dispatch: 60-Minute Camp Benefits, +8% All-Stat Fish Bowl & +5% Kill XP Cooking Buffs Verified",
      "source": "Method.gg / Beta Playtest",
      "sourceType": "method",
      "author": "Beta Theorycrafting Team",
      "date": "September 20, 2026",
      "tag": "Professions & Systems",
      "summary": "Live in-game testing verifies full 'Camp Benefits' buff behavior: 60-minute duration, 1-hour Tent rested cooldown, Tier 1 Fish Bowl +8% All Stats, and +5% monster kill EXP on Well Fed meals.",
      "content": "In-depth open-world playtesting in Durotar and The Barrens has verified exact numbers and mechanics for the new Camping & Campfire integration:\n• \"Camp Benefits\" 60-Minute Aura: Resting near an upgraded campfire applies the unified 'Camp Benefits' buff that persists for a full 60 minutes across outdoor zones.\n• The Tent (Rested XP Mechanics): Entering a crafted Camp Tent grants immediate rest experience in the field with a strict 1-hour cooldown: \"You received a small amount of rest experience. You can only receive this effect once per 1 hour.\"\n• Fishing Tier 1 Fish Bowl: Confirmed to grant all resting party members a flat +8% increase to all primary attributes (Strength, Agility, Stamina, Intellect, Spirit) for 60 minutes right at Tier 1!\n• Blacksmithing Sharpening Wheel: Confirmed to grant +6 Strength directly to equipped weapons for 60 minutes.\n• Cooking +5% Kill XP: Food recipes in the revised Cooking panel (such as 'Herb Baked Egg' under Stamina Food) now grant 15-minute Well Fed buffs that feature: \"Additionally, experience gained from kills is increased by 5%.\"\n• Intro Questlines: Discovered 'Camping 101: Skinning' in Razor Hill alongside new regional quests including 'Forgotten Loa Idols' and 'Practical Prey'.",
      "url": "https://www.method.gg/wow-classic/camping-system-verified-numbers-buffs"
    },
    {
      "id": "news-18",
      "title": "Beta Known Issues Tracker: Addon Persistence Bug, Capital City FPS & Alt Mail Delivery Slated for Next Build",
      "source": "Blizzard Official / Wowhead",
      "sourceType": "blizzard",
      "author": "Blizzard Quality Assurance",
      "date": "September 20, 2026",
      "tag": "Bug Tracker",
      "summary": "Blizzard QA updates the Known Issues tracker for Build 1.60.1.69913, detailing pending fixes for SavedVariables disk flushing, Orgrimmar/Stormwind FPS drops, and cross-character mail.",
      "content": "Blizzard Quality Assurance has updated the public bug tracker for WoW Forever Beta (Build 1.60.1.69913) with roughly eight core technical issues slated for resolution in the next iterative client build:\n• Addon SavedVariables Not Persisting: The client currently fails to flush addon configuration tables to disk upon /reload or normal game exit, requiring addon developers to implement snapshot restoration workarounds. A client-side C++ file I/O fix is queued for the next patch.\n• Capital City Frame Drops: Heavy stuttering and frame dips in Orgrimmar Valley of Strength and Stormwind Trade District are tied to modern DX12 shadow rendering on high-density NPC and player crowds.\n• Character-to-Character Alt Mail: Players have reported being unable to send mail to other characters on the same account under specific megarealm routing conditions.\n• macOS Client Visual Anomalies: Texture flickering on Apple Silicon hardware in coastal zones is currently being patched.\n• Next Build Window: A new beta build is scheduled to deploy early this week to push these engine and interface stability updates.",
      "url": "https://news.blizzard.com/en-us/world-of-warcraft/beta-known-issues-tracker-sep20"
    },
    {
      "id": "news-15",
      "title": "Beta Day 2 Dispatch: Early Hotfixes, Bear Form Armor Stacking Bug & Legacy Turn-in Fixes",
      "source": "Warcraft Tavern / Blizzard Official",
      "sourceType": "blizzard",
      "author": "Community Dispatch",
      "date": "September 19, 2026",
      "tag": "Beta Patch Notes",
      "summary": "Blizzard and community trackers report early Beta Day 2 hotfixes targeting Druid Bear Form armor multiplication, On-Next-Attack queue latency, and Innkeeper Wiley milestone turn-ins.",
      "content": "Forty-eight hours into the World of Warcraft: Forever closed beta, Blizzard and community testing teams have logged the first round of live tuning and hotfixes:\n• Bear Form & Consumable Stacking: Investigating an unintended calculation where Druid Bear Form armor multipliers are exponentially multiplying flat consumable armor bonuses (such as Elixir of Superior Defense) rather than adding them after form calculation.\n• \"On-Next-Attack\" Queue Latency: Fixes in progress for queueing desyncs on abilities like Heroic Strike and Raptor Strike during global cooldown transitions.\n• Innkeeper Wiley Milestone Turn-In: Resolved an issue in Ratchet where players unlocking the 15-point Legacy tier were unable to purchase or receive the 'Holstered Replica Ironforge Air Rifle' toy.\n• Action Bar Cooldown Swipe: Client-side fix incoming for UI cooldown timers occasionally freezing or displaying incorrect decimal second values on the modern graphics renderer.",
      "url": "https://www.warcrafttavern.com/forever/news/beta-day-2-hotfixes-known-issues"
    },
    {
      "id": "news-12",
      "title": "Inventory Quality of Life: Reagent-Free Spells & 50% Longer Raid Buffs Confirmed",
      "source": "Blizzard Official",
      "sourceType": "blizzard",
      "author": "Lead Systems Designer",
      "date": "September 18, 2026",
      "tag": "Quality of Life",
      "summary": "Vendor reagents eliminated for all class abilities (no more Soul Shard or Ankh bags), while long-duration group buffs now last 50% longer (45 to 90 mins).",
      "content": "Blizzard has announced two massive quality-of-life changes arriving in WoW: Forever:\n• Reagent-Free Class Abilities: Abilities that historically required vendor-bought reagents no longer require them. Shamans cast Reincarnation without Ankhs; Warlocks don't need bags clogged with 28 Soul Shards; Rogues use Blind and Vanish without buying powder; Paladins buff without Symbols of Kings; Druids rebirth without seeds; Mages and Priests cast without feathers, runes, or fish oil.\n• 50% Longer Buff Durations: All long-duration group and raid buffs (Arcane Intellect, Mark of the Wild, Power Word: Fortitude, Class Blessings) now last between 45 and 90 minutes. Raid groups will no longer suffer constant mid-boss buff dropouts!",
      "url": "https://news.blizzard.com/en-us/world-of-warcraft/qol-reagents-buffs"
    },
    {
      "id": "news-13",
      "title": "Tradeskill Power: All 9 Primary Professions Gain Unique Combat Passives & 600 New Recipes",
      "source": "Method.gg",
      "sourceType": "method",
      "author": "Method Theorycrafting",
      "date": "September 17, 2026",
      "tag": "Professions & Systems",
      "summary": "Every primary tradeskill provides permanent character power: Mining (+5% HP), Herbalism (+Resistances & Heal), Skinning (+Crit), Alchemy (Mixology 2x Flasks), and Blacksmithing (+AP).",
      "content": "Professions are no longer optional side-hobbies in WoW Forever; they are core pillars of character identity:\n• Unique Combat Passives:\n  - Mining: 'Toughness' grants a flat +5% total Health bonus.\n  - Herbalism: 'Nature's Ward' grants +10 Magic Resistances and an on-use heal.\n  - Skinning: 'Master of Anatomy' grants +1.5% Critical Strike rating.\n  - Blacksmithing: 'Weapon Honing' grants weapon attack power and extra socketing.\n  - Alchemy: 'Mixology' doubles flask duration and boosts potion yields.\n  - Tailoring: 'Spirit Weaving' increases Spirit and mana restoration.\n  - Leatherworking: 'Fur Lining' grants armor reinforcement and stamina.\n  - Enchanting: 'Ring Enchants' grants primary stat finger enchants.\n  - Engineering: Epic goggles and high-tech utility gizmos.\n• 600+ New Blueprints: Discovered from dungeon bosses, world chests, and Camping interactions.",
      "url": "https://www.method.gg/wow-classic/all-9-profession-passives-wow-forever"
    },
    {
      "id": "news-14",
      "title": "Game Editions & Pricing: Included in Standard WoW Sub; Skyborne Epic Pack Detailed",
      "source": "Wowhead",
      "sourceType": "wowhead",
      "author": "Wowhead Staff",
      "date": "September 16, 2026",
      "tag": "Pricing & Editions",
      "summary": "World of Warcraft: Forever is 100% free with any active WoW subscription at launch. The optional Skyborne Epic Pack ($59.99) includes instant beta access, mount, transmog, and 30 days game time.",
      "content": "Blizzard's launch and access model for World of Warcraft: Forever explained:\n• Standard Access: Included at NO additional box cost for all active World of Warcraft subscribers on November 4, 2026.\n• Skyborne Epic Pack ($59.99 USD):\n  - Immediate guaranteed Closed Beta access (plus 3 Invite-a-Friend beta keys).\n  - 30 Days of WoW Game Time included.\n  - Exclusive Ground Mount: Veteran Adventurer's Loyal Companion (armored canine).\n  - Transmog Set: Veteran Adventurer's Outdoor Wear.\n  - 4 Vanity Pets: Zergling, Panda, Diablo, and Pachimari.\n  - High Elf Lordaeron Crest & Shen'dorei Faction Tabards.",
      "url": "https://www.wowhead.com/forever/news/editions-and-pricing-guide"
    },
    {
      "id": "news-11",
      "title": "Official Beta Schedule Revealed: 35 Days of Testing Across 2 Phased Waves",
      "source": "Blizzard Official",
      "sourceType": "blizzard",
      "author": "Community Manager Kaivax",
      "date": "September 18, 2026 (02:00 PM PDT)",
      "tag": "Beta Schedule",
      "summary": "Blizzard confirms the WoW: Forever Beta will run for exactly 35 days (5 weeks) from Sept 17 through Oct 21. Phase 1 runs for 21 days (Cap 20), followed by Phase 2 (Cap 30).",
      "content": "The World of Warcraft: Forever Beta test schedule is officially locked in:\n• Total Duration: Exactly 35 days (5 full weeks), running from September 17 through October 21, 2026.\n• Phase 1 (Sept 17 – Oct 8 | 21 Days): Level cap strictly set at 20. Access to Zephras Isle, early classic zones, Hall of Thanes, Ruins of Lordaeron, and the 10-19 Warsong Gulch bracket.\n• Phase 2 (Oct 8 – Oct 21 | 14 Days): Level cap increases to 30. Unlocks Excavation Site 4 in Wetlands, City of Dalaran in Alterac Mountains, and 20-29 PvP.\n• Server Wipe & Launch (Oct 22 – Nov 4): All beta progress will be wiped on October 21. The team will spend 14 days on final stability tuning before the November 4 global launch!",
      "url": "https://news.blizzard.com/en-us/world-of-warcraft/beta-schedule-duration"
    },
    {
      "id": "news-01",
      "title": "Wowhead Compendium: Everything We Know About World of Warcraft: Forever",
      "source": "Wowhead",
      "sourceType": "wowhead",
      "author": "Wowhead Staff",
      "date": "September 16, 2026",
      "tag": "Comprehensive Guide",
      "summary": "Full compendium of all confirmed features: Nov 4 launch, Skyborne race, 9 dungeons, Dual Talents, 16 Legacy Points, anti-dungeon-spam XP curve, and world buff raid restrictions.",
      "content": "Here is the master summary of everything Blizzard has confirmed for WoW: Forever:\n• Launch: November 4, 2026. Permanent level 60 cap with horizontal progression and 1,000+ new quests.\n• No Server Barriers: Choose a Ruleset (PvE, PvP, Roleplay, or Hardcore in late winter). No dead servers.\n• Quality of Life: Dual Talent Specialization at Level 40, Barbershop (hair, beard, skin color), In-game Damage Meter, Retail Ping System, and Native Controller Support right out of the gate.\n• Economy & Integrity: NO WoW Tokens. NO character level boosts. Guild banks ready on Day 1.\n• World Buff Overhaul: World buffs function out in the open world, but are disabled inside raids. No Chronoboons or 2-hour pre-buff routes required!\n• Dungeon XP vs Open World: Dungeon mob XP is drastically lowered to kill dungeon spamming. First-time dungeon quests yield massive rewards, with repeatable weekly boss 'chase drops' to keep dungeons exciting.\n• Raids at Launch: Molten Core is replaced by Barrow Deeps (10-man) and Hyjal Summit (20-man), alongside Onyxia's Lair.",
      "url": "https://www.wowhead.com/forever/news/everything-we-know-about-wow-forever-382827"
    },
    {
      "id": "news-08",
      "title": "Blizzard Engine Tech Deep Dive: Custom Ray-Tracing & Visual Toggles",
      "source": "Blizzard Official",
      "sourceType": "blizzard",
      "author": "Lead Engine Programmer",
      "date": "September 15, 2026",
      "tag": "Engine & Graphics",
      "summary": "Proprietary software/hardware ray-traced global illumination running smoothly on GTX 10-series/RDNA1 cards, dynamic sun shadows, and SD/HD animation toggles.",
      "content": "World of Warcraft: Forever upgrades the classic world with a modernized graphics engine while preserving the 2004 aesthetic soul:\n• Custom Ray-Traced Global Illumination: Real-time environmental lighting and shifting mountain shadows based on sun height without requiring high-end DXR cards.\n• Atmospheric Enhancements: Volumetric ground fog, extended draw distance (bye-bye flat fog wall), and fluid water foam physics in Elwynn and Loch Modan.\n• Visual Freedom Toggles: In System Options, players can freely toggle between 'Classic 2004 Visuals' and 'Forever Ray-Traced Modern', as well as mix-and-match SD character models with modern spell effects or HD models with classic animations!\n• SSD Requirement: A Solid State Drive is mandatory for seamless asset streaming.",
      "url": "https://news.blizzard.com/en-us/world-of-warcraft/engine-tech"
    },
    {
      "id": "news-09",
      "title": "Addon Policy Clarification: In-Combat Addon Disarmament Explained",
      "source": "Method.gg",
      "sourceType": "method",
      "author": "Scrype",
      "date": "September 15, 2026",
      "tag": "Addons & Combat",
      "summary": "Blizzard confirms computational combat-solver addons and automated WeakAuras scripts will be disabled during boss fights to preserve player execution.",
      "content": "Blizzard has taken a firm stance on addon bloat in WoW: Forever:\n• In-Combat Disarmament: Addons that perform complex combat calculations, auto-assign raid markers, decipher encrypted boss telegraphs, or auto-cleanse debuffs will have their Lua APIs restricted during encounter combat.\n• Built-In Replacements: To ensure a clean experience, Blizzard built native tools directly into the UI: an in-game Damage/Healing meter, cooldown trackers, modern raid frames, and the retail Ping wheel.\n• Permitted Addons: Standard UI skinning, bag reorganizers, auction house helpers, and chat mods continue to function normally outside and inside combat.",
      "url": "https://www.method.gg/news/addon-disarmament-wow-forever"
    },
    {
      "id": "news-10",
      "title": "Seasonal PvP & Rank 14 Overhaul: No More 18-Hour Decay Grinds",
      "source": "Wowhead",
      "sourceType": "wowhead",
      "author": "Perculia",
      "date": "September 14, 2026",
      "tag": "PvP Systems",
      "summary": "Rank 14 is modernized into a milestone-based seasonal track aligned with raid tiers, alongside Darkspear Islands 15v15 and PvP faction locks.",
      "content": "The legendary Rank 14 grind has been completely re-engineered for World of Warcraft: Forever:\n• Milestone Track: Unhealthy 18-hour-a-day bracket stacking and harsh weekly rank decay are abolished. Progression to Grand Marshal / High Warlord is tied to an objective seasonal milestone track that resets each tier.\n• Retuned Rank 14 Gear: PvP weapons and armor have been updated with Classic+ stats and Expertise rating to remain competitive with raid drops.\n• Faction Locking: On the PvP ruleset, players are locked to a single faction (no cross-faction alts on the same ruleset), preserving intense faction rivalry.\n• New 15v15 Battleground: Darkspear Islands introduces coastal artillery cannon control and central flag capture.",
      "url": "https://www.wowhead.com/forever/news/pvp-rank-14-overhaul"
    },
    {
      "id": "news-02",
      "title": "Method.gg Breakdown: All-New Racial Abilities Overhaul",
      "source": "Method.gg",
      "sourceType": "method",
      "author": "Method Theorycrafting",
      "date": "September 16, 2026",
      "tag": "Racials & Balance",
      "summary": "Method evaluates the complete rework of racial abilities across all races, removing the mandatory Human sword/mace supremacy and adding unique perks.",
      "content": "Blizzard has completely redone racial abilities for World of Warcraft: Forever:\n• Human: The old +5 Sword/Mace skill is gone, replaced by 'Diplomatic Resolve' (+Spirit, +Reputation, and +Expertise rating regardless of weapon type).\n• Undead: Paladins unlock a unique custom spectral warhorse mount ('Forsaken Charger'), while Will of the Forsaken and Cannibalize receive updated visual animations.\n• Dwarf: Wildhammer shamans gain 'Earthen Resilience', while Stoneform now scales with Stamina.\n• Gnome: 'Expansive Mind' now grants +5% Intellect AND +3% Spell Critical Strike chance.\n• Orc: Blood Fury no longer inflicts a healing debuff, granting +Spell Damage alongside Attack Power.\n• Troll: Berserking has been normalized to a flat haste bonus that scales gracefully without requiring 1% health gaming.\n• Skyborne: Features 'Gale Step' (10-yard forward dash clearing roots), 'Windborne Grace' (slow fall), and 'Zephyr Attunement' (+Nature/Arcane res).",
      "url": "https://www.method.gg/wow-classic/all-new-racial-abilities-in-world-of-warcraft-forever"
    },
    {
      "id": "news-03",
      "title": "Method.gg Itemization Deep Dive: Expertise, Spell Damage & Unified Stats",
      "source": "Method.gg",
      "sourceType": "method",
      "author": "Kuriisu",
      "date": "September 16, 2026",
      "tag": "Itemization",
      "summary": "How Blizzard solved Classic's itemization rot: Bonus spell damage on hybrid gear, weapon skill converted to Expertise, and melee/spell hit rating streamlined.",
      "content": "In WoW Forever, gear itemization has undergone a comprehensive renaissance:\n1. Expertise System: Weapon skill bonuses from gear (like Edgemaster's Handguards) now grant universal Expertise Rating, allowing any race to wield any weapon class effectively.\n2. Unified Spell Power: 'Healing Spells' and 'Damage Spells' have been merged into unified Spell Power on pre-60 items, revitalizing hybrid leveling.\n3. Every Boss Has Chase Drops: Every dungeon and raid boss drops rare, specialized utility items or crafting blueprints, guaranteeing long-term replay value.",
      "url": "https://www.method.gg/wow-classic/itemization-updates-in-world-of-warcraft-forever-expertise-spell-damage-more"
    },
    {
      "id": "news-04",
      "title": "MrGM Video Reveal: In-Game Ping System & Native Controller Support",
      "source": "MrGM Coverage",
      "sourceType": "blizzard",
      "author": "MrGM (@MrGMYT)",
      "date": "September 13, 2026",
      "tag": "QoL Features",
      "summary": "Video demonstration of the retail ping system functioning inside the Classic+ client, allowing effortless non-verbal party callouts and marker pings.",
      "content": "Content creator MrGM shared exclusive footage of World of Warcraft: Forever's accessibility and UI modernizations:\n• Ping System: Pressing the ping hotkey brings up the radial wheel (Attack, Assist, On My Way, Danger) that places real-time 3D markers in the game world and minimap.\n• Native Controller Support: Full plug-and-play Xbox, PlayStation, and Steam Deck controller keybinding layout right from character creation.\n• Built-in Damage & Healing Meter: Blizzard has integrated an official, lightweight combat log parser into the default interface.\n• Discord Integration: Connects directly with Discord to display party status, rich presence, and voice channel overlays.",
      "url": "https://x.com/MrGMYT/status/2099139797524902295/video/1"
    },
    {
      "id": "news-05",
      "title": "Icy Veins: WoW Forever Talent Calculator & Dual Spec Confirmed",
      "source": "Icy Veins",
      "sourceType": "wowhead",
      "author": "Icy Veins Team",
      "date": "September 14, 2026",
      "tag": "Talents",
      "summary": "Icy Veins launches their 60-point talent calculator for WoW: Forever. Dual Talent Specialization confirmed to be unlocked at Level 40 for a one-time gold fee.",
      "content": "Dual Talent Specialization is officially confirmed for World of Warcraft: Forever!\n• Availability: Unlocks at Level 40 from your class trainer for a reasonable one-time gold fee.\n• Swap Mechanics: Switch specs in any rest area or while resting at a player campfire.\n• Hybrid Viability: Makes switching between Tank/DPS (Paladins, Warriors, Druids) and Healer/DPS (Priests, Shamans, Paladins) effortless without paying 50g per respec.\n• Revamped Trees: Full 31-point cap trees reimagined with new defensive passives, mana sustain talents, and hybrid scaling.",
      "url": "https://www.icy-veins.com/wow-forever/talent-calculator"
    },
    {
      "id": "news-06",
      "title": "Wowhead Legacy Calculator: 16 Points Available at Launch Across 3 Trees",
      "source": "Wowhead",
      "sourceType": "wowhead",
      "author": "Simaia",
      "date": "September 15, 2026",
      "tag": "Legacy System",
      "summary": "Wowhead unveils the 16-point Legacy Calculator. Account-wide progression points spent across Professions, Adventure, and Resourcefulness perk trees.",
      "content": "The Legacy System provides permanent horizontal account value:\n• 16 Points at Launch: Earned through leveling alts, completing zone storylines, mastering professions, exploration milestones, and PvP ranks.\n• Three Perk Trees:\n  1. Professions: Yield bonuses, skill book discovery rates, reduced failure chances on engineering.\n  2. Adventure: Rested XP accumulation speed (+25%), flight path travel speed (+15%), rare mob tracking.\n  3. Resourcefulness: Vendor repair discounts, +2 bank bag slots, campfire duration extension.\n• Points are shared account-wide, but each character customizes their allocation independently.",
      "url": "https://www.wowhead.com/forever/legacy-calculator"
    },
    {
      "id": "news-07",
      "title": "Blizzard Game Rules: No World Buffs in Raids, No Boosting, Stormwind Harbor Returns",
      "source": "Blizzard Official",
      "sourceType": "blizzard",
      "author": "Community Manager Kaivax",
      "date": "September 14, 2026",
      "tag": "Game Rules",
      "summary": "Radical community-first design decisions: World buffs disabled in raids, dungeon XP nerfed to encourage questing, and Stormwind Harbor reinstated.",
      "content": "Key design pillars detailed by the game directors:\n1. No World Buffs in Raids: Rallying Cry of the Dragonslayer, Fengus' Ferocity, and Songflower work exclusively OUTSIDE of raid instances. You no longer need to spend 2 hours gathering buffs or fear dying and losing damage.\n2. Anti-Dungeon Boosting: Mob kill XP inside instances is significantly lower. Players are incentivized to quest through the 1,000+ new quests in revamped zones.\n3. Meeting Stones as LFG Hubs: Meeting stones do not summon players (preserving travel immersion), but clicking them opens the built-in LFG tool to find or form a group.\n4. Stormwind Harbor: The harbor has been backported, providing a direct ferry route to Darkshore and Auberdine, ending the painful 30-minute swim or Menethil run for low-level night elves and humans.\n5. Gathering Skill Books: Discoverable skill tomes drop from world quests and rare mobs that permanently grant +5 to +15 skill in Mining, Herbalism, and Skinning.",
      "url": "https://news.blizzard.com/en-us/world-of-warcraft/gameplay-philosophies"
    }
  ],
  "gameplayRulesAndQoL": [
    {
      "id": "no-worldbuff-raids",
      "title": "No World Buffs in Raids",
      "icon": "⚡",
      "badge": "Raid Integrity",
      "desc": "World buffs work out in the world, but are disabled inside raid instances. No Chronoboons, no 2-hour pre-buff routes, and no griefing dispels in Booty Bay."
    },
    {
      "id": "no-tokens-no-boosts",
      "title": "No WoW Tokens or Boosts",
      "icon": "🚫",
      "badge": "Economy Protection",
      "desc": "100% pure gameplay progression. Zero paid level boosts, zero gold buying via WoW Tokens. All wealth and gear is earned in-game."
    },
    {
      "id": "dual-spec",
      "title": "Dual Talent Specialization",
      "icon": "🔄",
      "badge": "Confirmed at Lvl 40",
      "desc": "Unlocked at Level 40 for a one-time gold fee. Switch between specs in rest areas or around any player campfire."
    },
    {
      "id": "anti-dungeon-spam",
      "title": "Anti-Dungeon Spam XP",
      "icon": "📜",
      "badge": "World Questing",
      "desc": "Mob kill XP inside dungeons is low. First-time dungeon quests yield massive rewards, with repeatable weekly boss chase drops."
    },
    {
      "id": "in-combat-disarmament",
      "title": "In-Combat Addon Disarmament",
      "icon": "🛡️",
      "badge": "Skill & Execution",
      "desc": "Computational WeakAuras and solver addons are disabled in combat. Built-in damage meter, ping wheel, and cooldown timers provided natively."
    },
    {
      "id": "rank14-seasonal",
      "title": "Seasonal Rank 14 Track",
      "icon": "⚔️",
      "badge": "Healthy PvP",
      "desc": "No more 18-hour-a-day decay grind! Reach Rank 14 via an objective seasonal milestone progression track that resets each tier."
    },
    {
      "id": "hardcore-transfer",
      "title": "Hardcore & Mortal Safety Net",
      "icon": "💀",
      "badge": "Winter Ruleset",
      "desc": "True permanent character death with Mak'gora duels. When your Hardcore champion falls, claim a free transfer to PvE or PvP rulesets!"
    },
    {
      "id": "ray-tracing-graphics",
      "title": "Custom Ray-Tracing Engine",
      "icon": "✨",
      "badge": "Visual Overhaul",
      "desc": "Dynamic real-time sun shadows, volumetric fog, and flowing foam water physics, with instant SD/HD model and 2004 animation toggles."
    },
    {
      "id": "sw-harbor",
      "title": "Stormwind Harbor Active",
      "icon": "⛵",
      "badge": "Travel Quality of Life",
      "desc": "Connects Stormwind directly to Auberdine and Darnassus. Night elves and humans no longer need to brave the Wetlands death run."
    },
    {
      "id": "ping-system",
      "title": "Retail Ping System",
      "icon": "🎯",
      "badge": "Modern Communication",
      "desc": "Non-verbal context pinging (Attack, Assist, On My Way, Danger) directly in 3D world space and minimap."
    },
    {
      "id": "built-in-meter",
      "title": "Built-In Damage Meter",
      "icon": "📊",
      "badge": "Native UI Tool",
      "desc": "Integrated lightweight combat log parser. See whether you're pumping DPS or healing without needing third-party addons."
    },
    {
      "id": "controller-barbershop",
      "title": "Controller Support & Barbershop",
      "icon": "🎮",
      "badge": "Accessibility",
      "desc": "Native controller support for cozy handheld/couch leveling. Barbershop available in major capitals for hairstyle, beard, and skin tones."
    },
    {
      "id": "reagent-free-spells",
      "title": "Reagent-Free Class Abilities",
      "icon": "🎒",
      "badge": "Bag Space Overhaul",
      "desc": "Vendor-bought reagents are eliminated! Spells no longer consume Ankhs, 28 Soul Shards, Flash Powder, Symbols of Kings, Wild Berries, or Teleport Runes."
    },
    {
      "id": "buff-duration-50",
      "title": "50% Longer Raid Buffs",
      "icon": "⏳",
      "badge": "Group Quality of Life",
      "desc": "All long-duration group and raid buffs (Arcane Intellect, Mark of the Wild, Fortitude, Blessings) now last 45 to 90 minutes. No mid-dungeon expiration."
    },
    {
      "id": "profession-passives",
      "title": "All 9 Profession Combat Passives",
      "icon": "⚒️",
      "badge": "Tradeskill Power",
      "desc": "Every primary profession grants permanent character power: Mining (+5% HP), Herbalism (+Resistances & Heal), Skinning (+Crit), Alchemy (Mixology 2x Flasks), etc."
    },
    {
      "id": "legacy-cosmetics-track",
      "title": "65-Point Legacy Cosmetics Track",
      "icon": "🏆",
      "badge": "Account Progression",
      "desc": "Allocate 16 points per character into talent trees, while earning up to 65 total Legacy Points on your account to unlock exclusive heritage mounts, tabards, and pets."
    }
  ],
  "professionPassives": [
    {
      "name": "Mining",
      "type": "Gathering",
      "icon": "⛏️",
      "passiveName": "Toughness",
      "passiveEffect": "Increases maximum Health by a flat 5%, scaling dynamically with total Stamina.",
      "campBonus": "Can place Deepstone Crucible: party members gain +15 Mining skill and 10% armor."
    },
    {
      "name": "Herbalism",
      "type": "Gathering",
      "icon": "🌿",
      "passiveName": "Nature's Ward & Lifeblood",
      "passiveEffect": "Increases all Magic Resistances by +10 and grants an on-use 2-minute heal recovering health over 6 seconds.",
      "campBonus": "Can place Incense Candle: party members gain +15 Intellect and 10% movement speed."
    },
    {
      "name": "Skinning",
      "type": "Gathering",
      "icon": "🔪",
      "passiveName": "Master of Anatomy",
      "passiveEffect": "Increases Critical Strike rating by 1.5% across all physical and magical abilities.",
      "campBonus": "Can place Drying Rack: party members gain +10 Agility and 10% dodge chance."
    },
    {
      "name": "Blacksmithing",
      "type": "Production",
      "icon": "🔨",
      "passiveName": "Weapon Honing & Sockets",
      "passiveEffect": "Permanent +16 Attack Power or +12 Spell Damage weapon buff, plus bonus socket in bracers.",
      "campBonus": "Can place Sharpening Wheel / Anvil: party members gain +10% Attack Power for 1 hour."
    },
    {
      "name": "Alchemy",
      "type": "Production",
      "icon": "🧪",
      "passiveName": "Mixology & Elixir Mastery",
      "passiveEffect": "100% increased duration on all Flasks and Elixirs, plus 25% increased health and mana from healing potions.",
      "campBonus": "Can place Alchemist's Still: party members gain +10% potion and elixir effectiveness."
    },
    {
      "name": "Tailoring",
      "type": "Production",
      "icon": "🧵",
      "passiveName": "Spirit Weaving & Spellthread",
      "passiveEffect": "Increases Spirit by +15 and grants chance on spellcast to restore 200 mana or energy.",
      "campBonus": "Can place Faction Banner / Loom: party members gain +Spirit and 8 MP5 mana regeneration."
    },
    {
      "name": "Leatherworking",
      "type": "Production",
      "icon": "🛡️",
      "passiveName": "Fur Lining & Reinforcements",
      "passiveEffect": "Exclusive bracer and chest lining granting +100 Armor and +15 Stamina.",
      "campBonus": "Can place Leatherworker's Stretcher: party members gain +8% physical damage reduction."
    },
    {
      "name": "Enchanting",
      "type": "Production",
      "icon": "✨",
      "passiveName": "Ring Enchantments",
      "passiveEffect": "Exclusive enchantments on finger slots: +8 All Stats, +14 Spell Power, or +24 Attack Power.",
      "campBonus": "Can place Resonating Crystal: party members gain +10 Spell Power and 5% reduced cast pushback."
    },
    {
      "name": "Engineering",
      "type": "Production",
      "icon": "⚙️",
      "passiveName": "Tinkers & Goggles",
      "passiveEffect": "Access to high-powered epic helm goggles, parachute cloak tinkers, and rocket boots with 0% backfire chance in raids.",
      "campBonus": "Can place Field Repair Bot & Alarm Sentry: free repairs and anti-stealth detection."
    }
  ],
  "gameEditions": {
    "standard": {
      "name": "Standard Edition",
      "badge": "Included with WoW Sub",
      "cost": "$0 Box Price",
      "description": "Full access to World of Warcraft: Forever on launch day (Nov 4, 2026) for anyone with an active World of Warcraft monthly subscription or game time.",
      "perks": [
        "Full access to all Level 1–60 content, dungeons, and raids",
        "Playable Skyborne race and all 6 new race/class combinations",
        "Permanent horizontal progression & realmless rulesets",
        "Zero token / zero paid boost environment"
      ]
    },
    "epicPack": {
      "name": "Skyborne Epic Pack",
      "badge": "Digital Pre-Purchase",
      "cost": "$59.99 USD",
      "description": "Collector's digital bundle offering immediate beta access, game time, exclusive cosmetics, and friend invite passes.",
      "perks": [
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
  "engineSpecs": {
    "minimum": {
      "os": "Windows 10 64-bit",
      "cpu": "4-Core Processor (3.0 GHz)",
      "ram": "8 GB RAM",
      "gpu": "DirectX 12 capable 4 GB VRAM (GTX 1060 / AMD RX 5500 / Iris Xe)",
      "storage": "SSD Strictly Required (Solid State Drive)",
      "target": "1080p @ 30–60 FPS (Fair/Low Settings)"
    },
    "recommended": {
      "os": "Windows 11 64-bit",
      "cpu": "8-Core Modern Processor (e.g. Ryzen 7 5800X / Intel i7-12700K)",
      "ram": "16 GB High-Speed RAM",
      "gpu": "DirectX 12 Ray-Tracing capable 8 GB VRAM (RTX 3070 / 4070 / RX 6800)",
      "storage": "NVMe M.2 SSD",
      "target": "1440p / 4K @ 60–144 FPS with Ray-Traced Global Illumination"
    }
  },
  "fullDungeonProgressionCurve": [
    {
      "level": "13 – 18",
      "name": "Hall of Thanes",
      "zone": "Ironforge",
      "isNew": true,
      "betaActive": true
    },
    {
      "level": "13 – 18",
      "name": "Ragefire Chasm",
      "zone": "Orgrimmar",
      "isNew": false,
      "betaActive": true
    },
    {
      "level": "15 – 20",
      "name": "Ruins of Lordaeron",
      "zone": "Tirisfal Glades",
      "isNew": true,
      "betaActive": true
    },
    {
      "level": "17 – 24",
      "name": "The Deadmines",
      "zone": "Westfall",
      "isNew": false,
      "betaActive": true
    },
    {
      "level": "17 – 24",
      "name": "Wailing Caverns",
      "zone": "The Barrens",
      "isNew": false,
      "betaActive": true
    },
    {
      "level": "22 – 30",
      "name": "Shadowfang Keep",
      "zone": "Silverpine Forest",
      "isNew": false,
      "betaActive": true
    },
    {
      "level": "24 – 29",
      "name": "Excavation Site 4",
      "zone": "Wetlands",
      "isNew": true,
      "betaActive": false
    },
    {
      "level": "24 – 32",
      "name": "Blackfathom Deeps",
      "zone": "Ashenvale",
      "isNew": false,
      "betaActive": false
    },
    {
      "level": "24 – 32",
      "name": "The Stockade",
      "zone": "Stormwind City",
      "isNew": false,
      "betaActive": false
    },
    {
      "level": "28 – 34",
      "name": "City of Dalaran (Under Siege)",
      "zone": "Alterac Mountains",
      "isNew": true,
      "betaActive": false
    },
    {
      "level": "29 – 38",
      "name": "Gnomeregan",
      "zone": "Dun Morogh",
      "isNew": false,
      "betaActive": false
    },
    {
      "level": "29 – 38",
      "name": "Razorfen Kraul",
      "zone": "The Barrens",
      "isNew": false,
      "betaActive": false
    },
    {
      "level": "34 – 45",
      "name": "Scarlet Monastery (All 4 Wings)",
      "zone": "Tirisfal Glades",
      "isNew": false,
      "betaActive": false
    },
    {
      "level": "35 – 42",
      "name": "The Drowned City",
      "zone": "Stranglethorn Vale",
      "isNew": true,
      "betaActive": false
    },
    {
      "level": "37 – 46",
      "name": "Razorfen Downs",
      "zone": "The Barrens",
      "isNew": false,
      "betaActive": false
    },
    {
      "level": "40 – 46",
      "name": "Krol'dok Stronghold",
      "zone": "Riverglades (New Zone)",
      "isNew": true,
      "betaActive": false
    },
    {
      "level": "41 – 51",
      "name": "Uldaman",
      "zone": "Badlands",
      "isNew": false,
      "betaActive": false
    },
    {
      "level": "44 – 54",
      "name": "Zul'Farrak",
      "zone": "Tanaris",
      "isNew": false,
      "betaActive": false
    },
    {
      "level": "46 – 55",
      "name": "Maraudon",
      "zone": "Desolace",
      "isNew": false,
      "betaActive": false
    },
    {
      "level": "48 – 54",
      "name": "Alcaz Island Prison",
      "zone": "Dustwallow Marsh",
      "isNew": true,
      "betaActive": false
    },
    {
      "level": "50 – 60",
      "name": "Sunken Temple (Temple of Atal'Hakkar)",
      "zone": "Swamp of Sorrows",
      "isNew": false,
      "betaActive": false
    },
    {
      "level": "52 – 60",
      "name": "Blackrock Depths",
      "zone": "Blackrock Mountain",
      "isNew": false,
      "betaActive": false
    },
    {
      "level": "55 – 60",
      "name": "Blackmaw Hold",
      "zone": "Azshara",
      "isNew": true,
      "betaActive": false
    },
    {
      "level": "55 – 60",
      "name": "Lower Blackrock Spire (LBRS)",
      "zone": "Blackrock Mountain",
      "isNew": false,
      "betaActive": false
    },
    {
      "level": "58 – 60",
      "name": "Shaper's Terrace",
      "zone": "Un'Goro Crater",
      "isNew": true,
      "betaActive": false
    },
    {
      "level": "58 – 60",
      "name": "Stratholme (Live & Dead)",
      "zone": "Eastern Plaguelands",
      "isNew": false,
      "betaActive": false
    },
    {
      "level": "58 – 60",
      "name": "Scholomance",
      "zone": "Western Plaguelands",
      "isNew": false,
      "betaActive": false
    },
    {
      "level": "58 – 60",
      "name": "Dire Maul (East, West, North)",
      "zone": "Feralas",
      "isNew": false,
      "betaActive": false
    },
    {
      "level": "58 – 60",
      "name": "Upper Blackrock Spire (UBRS 10m)",
      "zone": "Blackrock Mountain",
      "isNew": false,
      "betaActive": false
    }
  ],
  "legacyTreesData": {
    "seasonalCap": 65,
    "treeCap": 25,
    "totalPointsAtLaunch": 16,
    "trees": [
      {
        "id": "professions",
        "name": "Tradeskill Mastery",
        "icon": "⚒️",
        "color": "#f59e0b",
        "description": "Enhance your crafting and gathering with rare recipe drops, extra yields, and vendor savings.",
        "perks": [
          {
            "id": "prof-1",
            "name": "Working Overtime",
            "max": 5,
            "desc": "Increases your chance to gain a skill increase from using any primary, secondary, or class-based tradeskill by 10% per rank."
          },
          {
            "id": "prof-2",
            "name": "Bountiful Harvest",
            "max": 5,
            "desc": "You discover 100% more scarce materials from Mining, Herbalism, and Skinning per rank."
          },
          {
            "id": "prof-3",
            "name": "Luremaster",
            "max": 2,
            "desc": "While fishing with a Lure active, you have a 50% chance per rank to catch an extra fish."
          },
          {
            "id": "prof-4",
            "name": "Performance Bonus",
            "max": 3,
            "desc": "You have a 15% chance per rank to receive 100% increased Merchant's Favor when you turn in a crate to the ACA or Durotar Supply."
          },
          {
            "id": "prof-5",
            "name": "Bartering",
            "max": 2,
            "desc": "Reduces the gold price of items from all vendors by 10% per rank."
          },
          {
            "id": "prof-6",
            "name": "Master Chef",
            "max": 5,
            "desc": "Your cooking recipes have a 30% chance per rank to create an extra result."
          },
          {
            "id": "prof-7",
            "name": "Dedicated Study",
            "max": 1,
            "desc": "Increases your skill by 1 in your lowest tradeskill among your Primary and Secondary tradeskills. If all 5 tradeskills are at 300, you will gain 3 of a random Elemental Essence."
          }
        ]
      },
      {
        "id": "adventure",
        "name": "World Explorer",
        "icon": "🧭",
        "color": "#38bdf8",
        "description": "Thrive in the open world with rested XP, faster travel, early talents, and survival perks.",
        "perks": [
          {
            "id": "adv-1",
            "name": "Well Rested",
            "max": 5,
            "desc": "Your rested experience accumulates 4% faster and your rested experience cap is increased by 4% per rank."
          },
          {
            "id": "adv-2",
            "name": "Thrill of Adventure",
            "max": 5,
            "desc": "You gain 5% of your maximum Health and Mana over 10 sec each time you deliver the killing blow to a non-trivial enemy (open world only)."
          },
          {
            "id": "adv-3",
            "name": "Field Medicine",
            "max": 2,
            "desc": "Reduces the duration of the Recently Bandaged effect by 10 sec per rank when you use a bandage (open world only)."
          },
          {
            "id": "adv-4",
            "name": "Field Guide",
            "max": 3,
            "desc": "Reduces your cooldown on adding Camp features by 25% per rank."
          },
          {
            "id": "adv-5",
            "name": "Talented",
            "max": 5,
            "desc": "You gain talent points every level starting at level 5 instead of starting at level 10 (still capped at 51 total talent points)."
          },
          {
            "id": "adv-6",
            "name": "High Alert",
            "max": 2,
            "desc": "Increases your ability to detect nearby targets with Stealth as if your level were increased by 2 per rank (open world only)."
          },
          {
            "id": "adv-7",
            "name": "Frequent Flier",
            "max": 1,
            "desc": "You receive a 50% discount on all flight paths and your flight path mount flies 20% faster."
          }
        ]
      },
      {
        "id": "resourcefulness",
        "name": "Resourcefulness & Economy",
        "icon": "💰",
        "color": "#10b981",
        "description": "Buff endurance, reagent elimination, reduced death penalties, and bonus Honor gains.",
        "perks": [
          {
            "id": "res-1",
            "name": "Gourmand",
            "max": 3,
            "desc": "Increases the duration of beneficial Well Fed food effects by 100% per rank."
          },
          {
            "id": "res-2",
            "name": "The Quick and the Dead",
            "max": 2,
            "desc": "Increases movement speed while dead by 10% per rank and your helpful spells/abilities cost no resources for 2 min after being resurrected or until entering combat."
          },
          {
            "id": "res-3",
            "name": "Reinforce",
            "max": 5,
            "desc": "You take 20% less durability loss when you die per rank."
          },
          {
            "id": "res-4",
            "name": "Diplomat",
            "max": 5,
            "desc": "Increases your Reputation gains by 10% per rank."
          },
          {
            "id": "res-5",
            "name": "Permanence",
            "max": 2,
            "desc": "Class abilities granting long-duration raid buffs last 100% longer, and camp resting benefits last 50% longer per rank."
          },
          {
            "id": "res-6",
            "name": "For Great Honor",
            "max": 5,
            "desc": "Increases Honor Points gained by 10% per rank."
          },
          {
            "id": "res-7",
            "name": "Reagent Economy",
            "max": 1,
            "desc": "Class abilities no longer require vendor-purchased reagents, and Tier 1 camping features cost no reagents to craft."
          }
        ]
      }
    ]
  },
  "legacyMilestoneRewards": [
    {
      "points": 15,
      "name": "Holstered Replica Ironforge Air Rifle",
      "type": "Toy",
      "icon": "🎯",
      "desc": "A fun toy that lets you stun other players and keeps score of your successful marksman shots.",
      "vendor": "Innkeeper Wiley (Ratchet)"
    },
    {
      "points": 25,
      "name": "Spectral Bear Cub",
      "type": "Companion Pet",
      "icon": "🐻",
      "desc": "A tiny ghostly bear cub companion that follows you on your adventures throughout Azeroth.",
      "vendor": "Innkeeper Wiley (Ratchet)"
    },
    {
      "points": 40,
      "name": "Spectral Bear Tabard",
      "type": "Cosmetic Tabard",
      "icon": "🥋",
      "desc": "An ornate tabard emblazoned with the glowing insignia of the celestial spectral bear.",
      "vendor": "Innkeeper Wiley (Ratchet)"
    },
    {
      "points": 55,
      "name": "Reins of the Spectral Bear",
      "type": "100% Speed Mount",
      "icon": "🐻‍❄️",
      "desc": "The ultimate Season 1 prestige mount: a translucent spectral bear charging at 100% ground speed.",
      "vendor": "Innkeeper Wiley (Ratchet)"
    }
  ],
  "legacyChallenges": [
    {
      "category": "Classes (24 Points)",
      "desc": "Earn 1 Legacy Point at levels 25, 45, and 60 on all 8 classes (Druid, Hunter, Mage, Paladin, Priest, Rogue, Shaman, Warlock)."
    },
    {
      "category": "Tradeskills (18 Points)",
      "desc": "Earn 1 Legacy Point at 150, 225, and 300 skill across 6 professions: Alchemy, Blacksmithing, Enchanting, Engineering, Leatherworking, Tailoring."
    },
    {
      "category": "Player vs. Player (12 Points)",
      "desc": "Earn 1 point at PvP Ranks 3, 7, 10, 13, and 14; 1 point for Exalted with each BG faction (AV, AB, WSG, Darkspear Islands); 1 point for weeks 4, 7, 10 of Field of Honor."
    },
    {
      "category": "Adventure (2 Points)",
      "desc": "1 point for Explore Azeroth achievement; 1 point for the Tier 0.5 questline starting with 'An Earnest Proposition' and laying Lord Valthalak to rest."
    },
    {
      "category": "Dungeons (3 Points)",
      "desc": "Novice Spelunker (1 pt for low dungeons), Experienced Spelunker (1 pt for mid dungeons), Master Spelunker (1 pt for high-level dungeons)."
    },
    {
      "category": "Raids (3 Points)",
      "desc": "Conqueror of the Wilds (Hyjal Summit), Conqueror of the Deeps (Barrow Deeps), Conqueror of the Lair (Onyxia's Lair)."
    }
  ],
  "squadRosterPresets": [
    {
      "id": "roster-1",
      "name": "Marcus",
      "faction": "Horde",
      "race": "Undead",
      "className": "Paladin",
      "role": "Tank",
      "spec": "Protection",
      "notes": "Main Tank with custom undead charger mount!"
    },
    {
      "id": "roster-2",
      "name": "Young Hermit Crab",
      "faction": "Horde",
      "race": "Orc",
      "className": "Mage",
      "role": "Ranged DPS",
      "spec": "Frost",
      "notes": "Frost Mage 60 build ready for dungeon grinding"
    },
    {
      "id": "roster-3",
      "name": "Andrewm",
      "faction": "Horde",
      "race": "Troll",
      "className": "Warlock",
      "role": "Ranged DPS",
      "spec": "Affliction",
      "notes": "Warlock summons and DPS"
    }
  ],
  "skyborneRace": {
    "name": "The Skyborne",
    "origin": "Zephras Isle (Floating realm in upper Kalimdor skies)",
    "factionOption": "Neutral (Aligns with Alliance or Horde at Level 10)",
    "allianceTitle": "High Order Skyborne",
    "hordeTitle": "Windshaper Skyborne",
    "classes": [
      "Warrior (Universal)",
      "Hunter (Universal)",
      "Rogue (Universal)",
      "Druid (Universal)",
      "Mage (Alliance High Order Exclusive)",
      "Shaman (Horde Windshaper Exclusive)"
    ],
    "lore": "Descendants of high elves and elemental wind-weavers who took sanctuary on Zephras Isle during the Great Sundering. Their return to Azeroth marks the rekindling of ancient forgotten pacts.",
    "racialsAlliance": [
      {
        "name": "Walk on Air",
        "type": "Active • 10s",
        "effect": "Glide downward through the air for 10 sec."
      },
      {
        "name": "Read Ley Line",
        "type": "Active",
        "effect": "Sense hidden ley conduits, boosting mana regeneration and spell efficiency."
      },
      {
        "name": "Wind Blessed",
        "type": "Passive",
        "effect": "1% increased melee, ranged, and spellcasting Haste."
      },
      {
        "name": "Elemental Insight",
        "type": "Passive",
        "effect": "Damage to Elementals increased by 5%."
      }
    ],
    "racialsHorde": [
      {
        "name": "Walk on Air",
        "type": "Active • 10s",
        "effect": "Glide downward through the air for 10 sec."
      },
      {
        "name": "Skysight",
        "type": "Active",
        "effect": "Receive an Elemental Blessing increasing run speed by 10%."
      },
      {
        "name": "Wind Blessed",
        "type": "Passive",
        "effect": "1% increased melee, ranged, and spellcasting Haste."
      },
      {
        "name": "Elemental Insight",
        "type": "Passive",
        "effect": "Damage to Elementals increased by 5%."
      }
    ],
    "racials": [
      {
        "name": "Walk on Air",
        "type": "Active • 10s",
        "effect": "Glide downward through the air for 10 sec."
      },
      {
        "name": "Read Ley Line / Skysight",
        "type": "Active (Faction Dependent)",
        "effect": "Alliance: Read Ley Line (mana/spells) • Horde: Skysight (+10% run speed)."
      },
      {
        "name": "Wind Blessed",
        "type": "Passive",
        "effect": "1% increased melee, ranged, and spellcasting Haste."
      },
      {
        "name": "Elemental Insight",
        "type": "Passive",
        "effect": "Damage to Elementals increased by 5%."
      }
    ]
  },
  "priestRacials": {
    "baseline": {
      "name": "Fear Ward",
      "desc": "Wards the friendly target against Fear. The next Fear effect used against the target will fail, consuming the ward. Lasts 10 min. (✦ Baseline for ALL Priests in WoW: Forever!)"
    },
    "races": [
      {
        "race": "Dwarf",
        "faction": "Alliance",
        "icon": "⛏️",
        "spells": [
          {
            "name": "Chastise",
            "type": "Active (Instant)",
            "desc": "Chastise the target, dealing Holy damage and disorienting them for up to 3 sec."
          },
          {
            "name": "Desperate Prayer",
            "type": "Active (Instant)",
            "desc": "Instantly heals the caster for a large amount of health without consuming mana. 10 min cooldown."
          }
        ]
      },
      {
        "race": "Gnome",
        "faction": "Alliance",
        "icon": "⚙️",
        "spells": [
          {
            "name": "Confounding Flash",
            "type": "Active (Instant)",
            "desc": "Flashes bright geometric prism-light, reducing the target's chance to hit and disorienting nearby foes."
          },
          {
            "name": "Contingency Plan",
            "type": "Active / Reactive",
            "desc": "Instantly restores 25% Mana and shields the Gnome when taking lethal damage or dropping below 20% Health."
          }
        ]
      },
      {
        "race": "Human",
        "faction": "Alliance",
        "icon": "👤",
        "spells": [
          {
            "name": "Divine Grace",
            "type": "Passive / Buff",
            "desc": "Reduces the cast time and mana cost of your next Holy spell after casting a direct heal."
          },
          {
            "name": "Feedback",
            "type": "Active Buff",
            "desc": "The priest's weapon is imbued with divine resonance: physical attacks burn enemy mana and deal Shadow damage."
          }
        ]
      },
      {
        "race": "Night Elf",
        "faction": "Alliance",
        "icon": "🌙",
        "spells": [
          {
            "name": "Elune's Grace",
            "type": "Active (3 min CD)",
            "desc": "Reduces ranged damage taken by 20% and increases Dodge chance by 20% for 15 sec."
          },
          {
            "name": "Starshards",
            "type": "Channeled (6s)",
            "desc": "Rains celestial starshards down upon the target, dealing heavy Arcane damage over 6 sec."
          }
        ]
      },
      {
        "race": "Troll",
        "faction": "Horde",
        "icon": "🏹",
        "spells": [
          {
            "name": "Hex of Weakness",
            "type": "Active Curse",
            "desc": "Weakens the target, reducing physical attack damage and reducing healing received by 20% for 2 min."
          },
          {
            "name": "Shadowguard",
            "type": "Active (Instant)",
            "desc": "Surrounds the caster with 3 shadow globes. Melee, ranged, and spell attacks against the caster cause Shadow damage."
          }
        ]
      },
      {
        "race": "Undead",
        "faction": "Horde",
        "icon": "💀",
        "spells": [
          {
            "name": "Dark Sacrifice",
            "type": "Active",
            "desc": "Sacrifices a portion of the priest's health to empower dark magic or restore mana to an ally through agonizing light."
          },
          {
            "name": "Touch of Weakness",
            "type": "Active Buff",
            "desc": "The next melee attack against the caster causes Shadow damage and reduces the attacker's attack power for 2 min."
          }
        ]
      }
    ]
  },
  "campingKits": [
    {
      "name": "Basic Campfire Kit",
      "desc": "Initial campfire kit usable by all adventurers to create basic campsites.",
      "levelReq": 1,
      "maxStations": 1
    },
    {
      "name": "Journeyman Campfire Kit",
      "desc": "Enhanced campfire kit allowing placement of 2 concurrent profession features.",
      "levelReq": 20,
      "maxStations": 2
    },
    {
      "name": "Expert Campfire Kit",
      "desc": "Master encampment kit supporting 3 concurrent profession features and longer rest buffs.",
      "levelReq": 40,
      "maxStations": 3
    }
  ],
  "campingObjects": [
    {
      "profession": "Alchemy",
      "type": "Primary",
      "icon": "🧪",
      "mirroredBuff": "Blessing of Wisdom (~8% Mana Regen)",
      "mirroredClass": "Paladin",
      "objects": [
        {
          "name": "Mana Well",
          "tier": 1,
          "desc": "Restores mana over time to resting allies."
        },
        {
          "name": "Fermenter",
          "tier": 2,
          "desc": "Brew specialty camp concoctions and elixirs on-site."
        },
        {
          "name": "Alchemy Laboratory",
          "tier": 3,
          "desc": "Full field laboratory allowing flask and advanced potion brewing without Scholomance/BWL labs."
        }
      ]
    },
    {
      "profession": "Blacksmithing",
      "type": "Primary",
      "icon": "🔨",
      "mirroredBuff": "Strength of Earth Totem (~8% Strength/AP)",
      "mirroredClass": "Shaman",
      "objects": [
        {
          "name": "Sharpening Wheel",
          "tier": 1,
          "desc": "Field sharpening wheel granting +6 Strength (or scaling with weapon tier) for 60 minutes."
        },
        {
          "name": "Anvil",
          "tier": 2,
          "desc": "Portable anvil allowing blacksmiths to forge and repair gear on-site in the open world."
        },
        {
          "name": "Master Forge",
          "tier": 3,
          "desc": "High-heat forge granting party members +10% Attack Power for 1 hour."
        }
      ]
    },
    {
      "profession": "Enchanting",
      "type": "Primary",
      "icon": "✨",
      "mirroredBuff": "Mark of the Wild (~8% Stats & Res)",
      "mirroredClass": "Druid",
      "objects": [
        {
          "name": "Enchanted Lute",
          "tier": 1,
          "desc": "Plays soothing magical chords, increasing stat recovery."
        },
        {
          "name": "Arcane Salvager",
          "tier": 2,
          "desc": "Disenchants items on-site with a bonus chance to yield rare essences."
        },
        {
          "name": "Arcane Forge",
          "tier": 3,
          "desc": "Grants party members +All Stats and Magic Resistances for 1 hour."
        }
      ]
    },
    {
      "profession": "Engineering",
      "type": "Primary",
      "icon": "⚙️",
      "mirroredBuff": "Field Utility & Zero Gadget Malfunction",
      "mirroredClass": "General",
      "objects": [
        {
          "name": "Reagent Bot",
          "tier": 1,
          "desc": "Vendors common components and basic ammo/food."
        },
        {
          "name": "Repair Bot",
          "tier": 2,
          "desc": "Provides full field equipment repairs for party members."
        },
        {
          "name": "Anarchist's Workbench",
          "tier": 3,
          "desc": "Craft explosives on-site and grants 0% malfunction rate on engineering gadgets in raids."
        }
      ]
    },
    {
      "profession": "First Aid",
      "type": "Secondary",
      "icon": "🩹",
      "mirroredBuff": "Power Word: Fortitude (~8% Stamina)",
      "mirroredClass": "Priest",
      "objects": [
        {
          "name": "First Aid Kit",
          "tier": 1,
          "desc": "Provides field bandages and minor health recovery."
        },
        {
          "name": "Toxin Study",
          "tier": 2,
          "desc": "Grants immunity to natural poisons encountered while resting."
        },
        {
          "name": "Plague Doctor's Laboratory",
          "tier": 3,
          "desc": "Increases party Stamina by +8% and provides disease cleansing."
        }
      ]
    },
    {
      "profession": "Fishing",
      "type": "Secondary",
      "icon": "🎣",
      "mirroredBuff": "Blessing of Kings (~8% All Attributes)",
      "mirroredClass": "Paladin",
      "objects": [
        {
          "name": "Fish Bowl",
          "tier": 1,
          "desc": "Stores live bait and grants party members +8% to all primary stats for 60 minutes."
        },
        {
          "name": "Fishing Rack",
          "tier": 2,
          "desc": "Dries catches into stamina-boosting rations."
        },
        {
          "name": "Fishing Hut",
          "tier": 3,
          "desc": "Grants party members an 8% increase to all primary attributes for 1 hour."
        }
      ]
    },
    {
      "profession": "Herbalism",
      "type": "Primary",
      "icon": "🌿",
      "mirroredBuff": "Arcane Intellect (~8% Intellect)",
      "mirroredClass": "Mage",
      "objects": [
        {
          "name": "Incense Candle",
          "tier": 1,
          "desc": "Burns calming herbal aroma, boosting spirit."
        },
        {
          "name": "Greenhouse",
          "tier": 2,
          "desc": "Cultivates rare herbs while resting in the campsite."
        },
        {
          "name": "Seed Hybridizer",
          "tier": 3,
          "desc": "Grants party members +8% Intellect and +10 Magic Resistances for 1 hour."
        }
      ]
    },
    {
      "profession": "Leatherworking",
      "type": "Primary",
      "icon": "🛡️",
      "mirroredBuff": "Physical Damage Reduction & Armor",
      "mirroredClass": "General",
      "objects": [
        {
          "name": "Camp Tent",
          "tier": 1,
          "desc": "Provides canvas shelter granting a burst of rested experience (can only be received once per 1 hour)."
        },
        {
          "name": "Tanning Rack",
          "tier": 2,
          "desc": "Allows processing heavy leathers and hides on-site."
        },
        {
          "name": "Sewing Machine",
          "tier": 3,
          "desc": "Reinforces party armor, providing +8% physical damage reduction for 1 hour."
        }
      ]
    },
    {
      "profession": "Mining",
      "type": "Primary",
      "icon": "⛏️",
      "mirroredBuff": "Blessing of Might (~8% Attack Power)",
      "mirroredClass": "Paladin",
      "objects": [
        {
          "name": "Lodestone",
          "tier": 1,
          "desc": "Tracks nearby metal veins and increases mining yield."
        },
        {
          "name": "Rock Garden",
          "tier": 2,
          "desc": "Excavates rough stones and gems while resting."
        },
        {
          "name": "Molten Foundry",
          "tier": 3,
          "desc": "Smelts ores in the field and grants party members +Attack Power for 1 hour."
        }
      ]
    },
    {
      "profession": "Skinning",
      "type": "Primary",
      "icon": "🔪",
      "mirroredBuff": "Moonkin Aura (~2% Crit Chance)",
      "mirroredClass": "Druid",
      "objects": [
        {
          "name": "Camp Chair",
          "tier": 1,
          "desc": "A cozy hide chair granting resting comfort."
        },
        {
          "name": "Field Guide",
          "tier": 2,
          "desc": "Documents beast weaknesses, granting +5% beast damage."
        },
        {
          "name": "Trapper's Workbench",
          "tier": 3,
          "desc": "Grants party members +2% Critical Strike chance for 1 hour."
        }
      ]
    },
    {
      "profession": "Tailoring",
      "type": "Primary",
      "icon": "🧵",
      "mirroredBuff": "Divine Spirit (~8% Spirit & Mana)",
      "mirroredClass": "Priest",
      "objects": [
        {
          "name": "Faction Banner",
          "tier": 1,
          "desc": "Inspires resting party members with faction pride."
        },
        {
          "name": "Spinning Wheel",
          "tier": 2,
          "desc": "Spins thread and bolts in the field without needing a loom."
        },
        {
          "name": "Loom",
          "tier": 3,
          "desc": "Grants party members +8% Spirit and bonus mana regeneration for 1 hour."
        }
      ]
    },
    {
      "profession": "Cooking",
      "type": "Secondary",
      "icon": "🍳",
      "mirroredBuff": "Well Fed (+Stats & +5% Kill XP)",
      "mirroredClass": "General",
      "objects": [
        {
          "name": "Basic Campfire & Spit",
          "tier": 1,
          "desc": "Field cook everyday and stamina meals; Well Fed meals grant +5% bonus experience from monster kills."
        },
        {
          "name": "Iron Cauldron",
          "tier": 2,
          "desc": "Prepares hearty banquets restoring party health and mana rapidly."
        },
        {
          "name": "Master Encampment Feast Table",
          "tier": 3,
          "desc": "Provides high-tier raid feasts granting +Stamina and primary stats to all raid members."
        }
      ]
    }
  ],
  "statCapsAndMechanics": {
    "title": "Endgame Stat Caps & Combat Formulas",
    "subtitle": "Verified raid boss caps and formula coefficients for Level 60 content",
    "caps": [
      {
        "name": "Defense Cap",
        "value": "440 Defense",
        "target": "Bosses (L63)",
        "desc": "Renders tanks completely uncrittable by Level 63 raid bosses (eliminates deadly 200% damage spikes).",
        "icon": "🛡️"
      },
      {
        "name": "Magic Resistance Cap",
        "value": "315 Resistance",
        "target": "75% Reduction",
        "desc": "Achieves maximum 75% magic damage reduction against Level 63 raid bosses across Fire, Frost, Nature, Shadow, Arcane.",
        "icon": "✨"
      },
      {
        "name": "Armor Cap",
        "value": "17,265 Armor",
        "target": "75% Mitigation",
        "desc": "Achieves maximum 75% physical damage reduction against Level 63 raid bosses.",
        "icon": "🦺"
      },
      {
        "name": "Melee Hit Cap",
        "value": "9% Hit (Bosses)",
        "target": "Zero Miss",
        "desc": "5% required vs equal-level targets; 9% required to eliminate all misses on special yellow attacks against Level 63 raid bosses.",
        "icon": "🎯"
      },
      {
        "name": "Spell Hit Cap",
        "value": "16% Spell Hit",
        "target": "Zero Miss",
        "desc": "3% required vs equal-level targets; 16% required against Level 63 raid bosses (note: 1% innate miss chance may remain).",
        "icon": "🔮"
      },
      {
        "name": "Attack Power Ratio",
        "value": "14 AP = 1 DPS",
        "target": "Melee & Ranged",
        "desc": "Unified across melee and ranged weapons. Derived from Strength and Agility depending on class proficiencies.",
        "icon": "⚔️"
      }
    ],
    "rules": [
      {
        "title": "Healing-to-Spell Damage Conversion (+33.3%)",
        "desc": "All equipment granting Bonus Healing automatically converts +33.3% (+1/3) of that value into Bonus Spell Damage. Healers wearing healing gear automatically deal viable offensive spell damage for solo leveling and open-world farming without carrying a secondary DPS gear set."
      },
      {
        "title": "Unified Critical Strike",
        "desc": "Critical strike on gear is no longer split between melee and spell crit. Items grant unified 'Critical Strike Chance' that enhances both physical hits (100% bonus damage) and spell hits (50% bonus damage)."
      },
      {
        "title": "Unified Hit & Spell Hit Scaling",
        "desc": "Hit chance (melee, ranged, and spell) is consolidated on itemization. Gear granting +Hit applies uniformly across physical attacks (9% cap vs L63 raid bosses) and spell attacks (16% cap vs L63 raid bosses)."
      },
      {
        "title": "Spell Downranking Threshold",
        "desc": "Spell coefficients plateau after the spell rank learned at Level 20. Downranking spells learned at or after Level 20 retains high spell power scaling, but ranks learned prior to Level 20 suffer heavy coefficient penalties."
      },
      {
        "title": "Guaranteed Boss Loot & Automatic Transmog",
        "desc": "Every dungeon and raid boss drops a guaranteed Rare (Blue) item. Any item looted automatically unlocks its appearance in your account transmog collection if you are an eligible wearer."
      }
    ]
  },
  "dataminedMounts": [
    {
      "category": "Skyborne Racial Mounts (Galestriders)",
      "icon": "🦅",
      "badge": "Skyborne Race",
      "mounts": [
        "Empyrean Galestrider (Level 40)",
        "Regal Galestrider (Level 40)",
        "Stormy Galestrider (Level 40)",
        "Umber Galestrider (Level 40)",
        "Swift Empyrean Galestrider (Level 60)",
        "Swift Regal Galestrider (Level 60)",
        "Swift Stormy Galestrider (Level 60)",
        "Swift Umber Galestrider (Level 60)"
      ]
    },
    {
      "category": "Paladin & Shaman Class Mounts",
      "icon": "🛡️",
      "badge": "Class Identity",
      "mounts": [
        "Summon Forsaken Charger (Undead Paladin unique skeletal warhorse)",
        "Armored War Ram of the Storm (Wildhammer Dwarf Shaman)"
      ]
    },
    {
      "category": "Legacy & Seasonal Rewards",
      "icon": "🏆",
      "badge": "Account Progression",
      "mounts": [
        "Reins of the Spectral Bear (55 Legacy Points seasonal milestone)",
        "Swift Hyjal Stag (Mount Hyjal open world explorer)",
        "Veteran Adventurer's Loyal Companion (Skyborne Epic Pack hound)"
      ]
    },
    {
      "category": "Warden Sabers & Prideclaws",
      "icon": "🐆",
      "badge": "Reputation & Drops",
      "mounts": [
        "Cerulean Prideclaw",
        "Black Warden Saber",
        "Brown Warden Saber",
        "Gray Warden Saber",
        "White Warden Saber"
      ]
    },
    {
      "category": "Devilsaurs & Druid Moose Mounts",
      "icon": "🦖",
      "badge": "Endgame Beasts",
      "mounts": [
        "Devilsaur Mounts (Black, Blue, Green, Purple, White)",
        "Druid Moose Mounts (Black, White, Green, Gray)"
      ]
    },
    {
      "category": "Classic Faction Recolors",
      "icon": "🐎",
      "badge": "Faction Mounts",
      "mounts": [
        "Ochre Skeletal Warhorse",
        "Black Skeletal Horse",
        "Caravan Kodo",
        "Lavender Kodo",
        "Pack Kodo",
        "White Kodo"
      ]
    }
  ],
  "dungeonsAndRaids": [
    {
      "id": "dungeon-01",
      "name": "Hall of Thanes",
      "type": "5-Man Dungeon",
      "levelRange": "13 – 18",
      "zone": "Ironforge Depths (Khaz Modan)",
      "status": "Active in Beta Phase 1",
      "playableNow": true,
      "description": "Subterranean crypts beneath the Great Forge, breached by deepstone troggs and corrupted elemental constructs.",
      "bosses": [
        "Thane Magni's Remnant",
        "Deepstone Overlord Gorn",
        "Foreman Baelok",
        "The Lithic Golem"
      ],
      "lootHighlights": [
        "Thane's Runic Ring",
        "Forgewarden Buckler",
        "Trogg-Cracker Mallet"
      ]
    },
    {
      "id": "dungeon-02",
      "name": "Ruins of Lordaeron",
      "type": "5-Man Dungeon",
      "levelRange": "15 – 20",
      "zone": "Tirisfal Glades (Eastern Kingdoms)",
      "status": "Active in Beta Phase 1",
      "playableNow": true,
      "description": "The haunted outer bastions of Lordaeron's capital, overrun by Scarlet Crusaders and vengeful spectral royal guards.",
      "bosses": [
        "Commander Valerius",
        "Archmage Aethelred's Echo",
        "Scarlet Prelate Joshua",
        "The Royal Apparition"
      ],
      "lootHighlights": [
        "Crown of the Lost Kingdom",
        "Lordaeron Crested Shield",
        "Mantle of the Penitent"
      ]
    },
    {
      "id": "dungeon-03",
      "name": "Excavation Site 4",
      "type": "5-Man Dungeon",
      "levelRange": "24 – 29",
      "zone": "Wetlands (Eastern Kingdoms)",
      "status": "Unlocks in Beta Phase 2 (Oct 8)",
      "playableNow": false,
      "description": "A Titan archaeological dig site in the Wetlands marshes overrun by Dark Iron saboteurs and awakened Titan sentinels.",
      "bosses": [
        "Dark Iron Surveyor Brand",
        "Sentinel Archeus",
        "Overseer Mogok",
        "The Relic Core"
      ],
      "lootHighlights": [
        "Archeus Core Talisman",
        "Titan-Forged Greaves"
      ]
    },
    {
      "id": "dungeon-04",
      "name": "City of Dalaran (Under Siege)",
      "type": "5-Man Dungeon",
      "levelRange": "28 – 34",
      "zone": "Alterac Mountains",
      "status": "Unlocks in Beta Phase 2 (Oct 8)",
      "playableNow": false,
      "entrance": "Enter via sewers into the Underbelly, fight through Kirin Tor necromancers, then break out into the open streets of Dalaran.",
      "description": "Before the violet dome was erected, Dalaran is plagued by Arcane Anomalies and rogue Kirin Tor Necromancers ravaging the streets with undead minions.",
      "bosses": [
        "Arcane Anomaly",
        "Unstable Sentinel",
        "Shade of the Archmage"
      ],
      "mobPacks": [
        "Skeleton Variants",
        "Kirin Tor Necromancers",
        "Fragmented Sentries",
        "Mana Fiends",
        "Arcane Elementals"
      ],
      "lootHighlights": [
        "Kirin Tor Robe of Sparks",
        "Syndicate Dagger of Shadows",
        "Arcane Core Band"
      ]
    },
    {
      "id": "dungeon-05",
      "name": "The Drowned City",
      "type": "5-Man Dungeon",
      "levelRange": "35 – 42",
      "zone": "Stranglethorn Vale (Sunken Coast)",
      "status": "Launch Day Content",
      "playableNow": false,
      "entrance": "Sunken Gurubashi coastal city with non-linear layout; players can dive underwater immediately to fight Zin'aka or delve deep into inner ruins.",
      "description": "An ancient Gurubashi coastal city reclaimed by the tide and infested by Makrura, Risen Sentries, and sea monstrosities. Bosses possess deadly enrage mechanics.",
      "bosses": [
        "Zul'Alai (Near-Death Enrage)",
        "Zin'aka (Aquatic Depths)",
        "Deathless Marrow",
        "Min'loth the Serpent"
      ],
      "mobPacks": [
        "Makrura",
        "Risen Sentry",
        "Brinescale Explorer",
        "Deathless Sorcerer",
        "Deathless Guardian"
      ],
      "lootHighlights": [
        "Tidecaller Trinket",
        "Trident of the Gurubashi Depths",
        "Whitemane's Chapeau (Upgraded Rare)"
      ]
    },
    {
      "id": "dungeon-06",
      "name": "Krol'dok Stronghold",
      "type": "5-Man Dungeon",
      "levelRange": "40 – 46",
      "zone": "Riverglades (New Zone)",
      "status": "Launch Day Content",
      "playableNow": false,
      "description": "A massive multi-tiered ogre fortress towering over the eastern Riverglades, uniting renegade centaurs and ogre magi.",
      "bosses": [
        "Warboss Krol'dok",
        "Magi Lord Gorgor",
        "Chieftain Vark"
      ],
      "lootHighlights": [
        "Colossal Ogre Greataxe",
        "Riverglades Windcloak"
      ]
    },
    {
      "id": "dungeon-07",
      "name": "Alcaz Island Prison",
      "type": "5-Man Dungeon",
      "levelRange": "48 – 54",
      "zone": "Dustwallow Marsh",
      "status": "Launch Day Content",
      "playableNow": false,
      "description": "The secret island fortress where high-value political prisoners and draconic experiments are guarded by elite Defias and black drakes.",
      "bosses": [
        "Warden Bloodthorn",
        "Draconian Overseer",
        "Shadow Priestess Vivian"
      ],
      "lootHighlights": [
        "Prisoner's Broken Manacles",
        "Shadowfang Band"
      ]
    },
    {
      "id": "dungeon-08",
      "name": "Blackmaw Hold",
      "type": "5-Man Dungeon",
      "levelRange": "55 – 60",
      "zone": "Azshara (Kalimdor)",
      "status": "Launch Day Content",
      "playableNow": false,
      "description": "The ancient timbermaw furbolg stronghold deep within Azshara, now corrupted by subterranean void fissures.",
      "bosses": [
        "Chieftain Winterhoof",
        "Void-Touched Ursa",
        "Shamaness Karr"
      ],
      "lootHighlights": [
        "Furbolg War Totem",
        "Garb of the Corrupted Elder"
      ]
    },
    {
      "id": "dungeon-09",
      "name": "Shaper's Terrace",
      "type": "5-Man Dungeon",
      "levelRange": "58 – 60",
      "zone": "Un'Goro Crater",
      "status": "Launch Day Content",
      "playableNow": false,
      "description": "The deepest Titan testing facility beneath Fire Plume Ridge, harboring primal genetic strains and ancient defense platforms.",
      "bosses": [
        "Prime Warden Aurelius",
        "The Primordial Hydra",
        "Genesis Core 07"
      ],
      "lootHighlights": [
        "Crown of the Shapers",
        "Primordial Crystal Blade"
      ]
    },
    {
      "id": "raid-01",
      "name": "Barrow Deeps (Launch Raid)",
      "type": "10-Player Raid",
      "levelRange": "Level 60 (Tier 1)",
      "zone": "Mount Hyjal / Blackmaw Underworld",
      "status": "Unlocks Dec 9, 2026",
      "playableNow": false,
      "description": "The subterranean prison where Illidan Stormrage was bound for ten millennia. Ancient Wardens and Shadowed Horrors guard forbidden vaults.",
      "bosses": [
        "Warden Avatar Maiev's Vigil",
        "Shadow Fiend Tenebrous",
        "The Slumbering Druid",
        "Tormentor Grazz"
      ],
      "lootHighlights": [
        "Tier 1 Classic+ Shoulders & Helms",
        "Glaive of the Slumbering Watcher"
      ]
    },
    {
      "id": "raid-02",
      "name": "Hyjal Summit (Launch Raid)",
      "type": "20-Player Raid",
      "levelRange": "Level 60 (Tier 1)",
      "zone": "Mount Hyjal",
      "status": "Unlocks Dec 9, 2026",
      "playableNow": false,
      "description": "The scorched roots of Nordrassil following Archimonde's defeat, clearing rogue Burning Legion stragglers and corrupted world-tree roots.",
      "bosses": [
        "Dreadlord Mal'Ganis Avatar",
        "Anetheron the Defiler",
        "Corrupted Nordrassil Sapling",
        "General Kaz'rogal"
      ],
      "lootHighlights": [
        "World-Tree Heart Trinket",
        "Crown of Nordrassil"
      ]
    },
    {
      "id": "raid-03",
      "name": "Onyxia's Lair (Forever Edition)",
      "type": "40-Player Raid",
      "levelRange": "Level 60 (Tier 1)",
      "zone": "Dustwallow Marsh",
      "status": "Unlocks Dec 9, 2026",
      "playableNow": false,
      "description": "The classic broodmother encounter retuned for WoW: Forever's new itemization and class balance, with new Deep Breath phase mechanics.",
      "bosses": [
        "Onyxia, Broodmother of the Black Dragonflight"
      ],
      "lootHighlights": [
        "Shard of the Scale",
        "Vis'kag the Bloodletter",
        "Head of Onyxia"
      ]
    }
  ],
  "newZones": [
    {
      "name": "Zephras Isle",
      "level": "1 – 12",
      "continent": "Kalimdor Skywall Skies",
      "description": "A breathtaking cluster of floating islands suspended high above the western seas of Kalimdor. Home to the newly revealed Skyborne elves.",
      "features": "Wind currents for rapid gliding, Skywall elemental spires, cloud-strider bird sanctuaries, and the neutral capital Zephras Haven."
    },
    {
      "name": "Riverglades",
      "level": "30 – 45",
      "continent": "Eastern Kingdoms",
      "description": "A vast, lush wetland and forest river-delta spanning between the Arathi Highlands and Loch Modan. Filled with over 150 brand new quests.",
      "features": "Contested territory with Alliance expedition outposts, Horde lumber camps, Krol'dok Ogre Stronghold, and scenic waterway boating."
    },
    {
      "name": "Mount Hyjal (Renewed)",
      "level": "55 – 60",
      "continent": "Kalimdor",
      "description": "The sacred ancestral mountain of the night elves, now accessible as an open-world endgame progression zone after Archimonde's defeat.",
      "features": "Emerald Dragon portals, Twilight Cultist camps, Barrow Deeps dungeon entrance, and Nordrassil healing rituals."
    }
  ],
  "gameSystems": [
    {
      "id": "camping",
      "name": "The Camping & Campfire System",
      "icon": "🔥",
      "summary": "Rest, repair, gain 1-hour buffs, and foster social cooperation in the open world.",
      "details": [
        "Evolves the basic Cooking Fire into a cooperative hub in any outdoor zone.",
        "Up to 3 player-crafted profession items can be placed around a campfire (1 per player).",
        "Buff examples: Blacksmith's Anvil (+10% Melee/Ranged AP), Weaver's Loom (+Spirit & Mana Regen), Leatherworker's Stretcher (+Armor & Stamina).",
        "Over 600 new profession recipes added across all primary and secondary tradeskills."
      ]
    },
    {
      "id": "legacy",
      "name": "Account-Wide Legacy Progression (16 Points at Launch)",
      "icon": "🏆",
      "summary": "A non-power progression system rewarding alt-leveling and completionist achievements.",
      "details": [
        "Earn 16 Legacy Points at launch by leveling different classes, mastering professions, exploration, and PvP.",
        "Legacy Points are account-wide, but each character customizes their own perk allocation.",
        "Three distinct trees: Adventure (rested XP boost, flight path speed, gathering tracker), Profession (crafting yield, speed), and Resourcefulness (vendor discount, bag slot bonus)."
      ]
    },
    {
      "id": "realmless",
      "name": "Realmless Ruleset Engine",
      "icon": "🌐",
      "summary": "No locked server dead-ends: Pick your gameplay ruleset and play with the entire region.",
      "details": [
        "Instead of locking into servers like 'Faerlina' or 'Whitemane', players select a Ruleset: Normal (PvE), PvP, Roleplaying (RP), or Hardcore (coming in later winter update).",
        "Dynamic seamless layering preserves local world density while preventing dead servers or 5-hour queues.",
        "Guilds and world economy operate across unified ruleset regional fabrics."
      ]
    },
    {
      "id": "addon-policy",
      "name": "In-Combat Addon Disarmament",
      "icon": "🛡️",
      "summary": "Combat calculations and automated solver macros disabled during boss fights.",
      "details": [
        "Heavy computational WeakAuras and auto-assignment scripts are blocked in combat to preserve genuine execution skill.",
        "Blizzard provides native UI tools: Built-in Damage/Healing Meter, Ping System, and Cooldown Trackers.",
        "Cosmetic and inventory addons outside combat remain fully functional."
      ]
    },
    {
      "id": "pvp-season",
      "name": "Seasonal Rank 14 Progression",
      "icon": "⚔️",
      "badge": "PvP Overhaul",
      "summary": "Milestone-based Rank 14 track that resets each tier with no weekly decay grind.",
      "details": [
        "No more 18-hour-a-day bracket stacking: reach High Warlord / Grand Marshal through clear seasonal objectives.",
        "Rank 14 weapons retuned with modern Expertise and unified spell damage stats.",
        "Darkspear Islands 15v15 battleground and strict faction-locking on PvP rulesets."
      ]
    },
    {
      "id": "hardcore-ruleset",
      "name": "Hardcore Ruleset & Safety Net",
      "icon": "💀",
      "summary": "Permadeath with Mak'gora duels, with free mortal transfer upon death.",
      "details": [
        "Coming in the later winter update. Features permanent character death and Soul of Iron.",
        "Mak'gora (Duel to the Death) rewards cosmetic Ear Trophies.",
        "Upon character death, players are granted a FREE transfer to continue playing as a mortal on Normal or PvP rulesets!"
      ]
    }
  ],
  "megarealmsAndRulesets": [
    {
      "id": "normal",
      "name": "Normal (PvE) Megarealm",
      "badge": "Standard Adventuring",
      "icon": "🌍",
      "status": "Available at Launch (Nov 4, 2026)",
      "rules": [
        "Unrestricted open-world questing and exploration without forced faction PvP flags.",
        "Opt-in PvP enabled via /pvp flag or entering enemy capitals/territories.",
        "Full access to Warsong Gulch, Arathi Basin, and Alterac Valley battlegrounds.",
        "Guaranteed persistent server population through seamless megarealm sharding."
      ]
    },
    {
      "id": "pvp",
      "name": "PvP Megarealm",
      "badge": "Faction Warfare",
      "icon": "⚔️",
      "status": "Available at Launch (Nov 4, 2026)",
      "rules": [
        "Contested zones are permanently PvP-flagged for authentic open-world warfare.",
        "Reworked Rank 14 Honor System: No weekly decay, predictable milestone progression.",
        "World PvP objectives in Hillsbrad, Silithus, and Eastern Plaguelands award honor tokens.",
        "Faction balance enforced through dynamic login queues and layering."
      ]
    },
    {
      "id": "rp",
      "name": "Roleplay (RP) Megarealm",
      "badge": "Immersive Lore",
      "icon": "📜",
      "status": "Available at Launch (Nov 4, 2026)",
      "rules": [
        "Strict character naming rules and immersive community guidelines enforced.",
        "Dedicated tavern and campsite gathering zones with spatial roleplay chat layers.",
        "Open-world adventuring with opt-in PvP rules similar to Normal megarealms.",
        "Enhanced emotes, camping interactions, and community storytelling support."
      ]
    },
    {
      "id": "hardcore",
      "name": "Hardcore Megarealm",
      "badge": "Permadeath",
      "icon": "💀",
      "status": "Arriving Winter 2026",
      "rules": [
        "Permanent death: Dying means your character cannot resurrect on the Hardcore megarealm.",
        "Free character transfer upon death to the Normal (PvE) Megarealm to keep your progress.",
        "Mak'gora: Official duels to the death supported with cosmetic ear trophy bounties.",
        "Dungeon lockout restrictions: 24-hour dungeon lockout per dungeon while leveling under 60."
      ]
    }
  ],
  "classTalentOverhauls": {
    "title": "Class Talent Milestones & Global Reworks",
    "milestones": [
      {
        "pts": 11,
        "label": "11-Point Tier",
        "desc": "Classic utility or signature early-spec active ability."
      },
      {
        "pts": 16,
        "label": "16-Point Tier (✦ New in Forever)",
        "desc": "Build-defining hybrid milestone talent. Unlocks major spec mechanics without deep 21+ point investment, enabling 31/16/4 or 16/16/19 hybrid configurations at Level 60."
      },
      {
        "pts": 21,
        "label": "21-Point Tier",
        "desc": "Mid-tree core power spike (e.g. Consecration was moved baseline, freeing 21-pt holy slot)."
      },
      {
        "pts": 31,
        "label": "31-Point Capstone",
        "desc": "Ultimate specialization capstone defining deep-tree mastery."
      }
    ],
    "baselineAbilities": [
      {
        "cls": "Priest",
        "name": "Divine Spirit",
        "desc": "Grants party-wide Spirit buff without requiring 31 points in Discipline."
      },
      {
        "cls": "Priest",
        "name": "Fear Ward",
        "desc": "Baseline for ALL Priests across all races."
      },
      {
        "cls": "Paladin",
        "name": "Blessing of Kings",
        "desc": "10% all-stat blessing is baseline, no longer requiring 31 Retribution/Prot."
      },
      {
        "cls": "Paladin",
        "name": "Blessing of Might",
        "desc": "Baseline attack power blessing available to all specs."
      },
      {
        "cls": "Paladin",
        "name": "Consecration",
        "desc": "Baseline Holy AoE damage ability for all Paladins, no longer an 11-point Holy talent."
      },
      {
        "cls": "Paladin",
        "name": "Seal of Fury & Judgement Taunt",
        "desc": "Seal of Fury generates high Holy threat, and Judgement serves as a 10-yard ranged taunt when used with tanking seals."
      },
      {
        "cls": "Druid",
        "name": "Improved Mark of the Wild",
        "desc": "Baseline maximum stat and resistance buff scaling without talent point taxes."
      }
    ]
  },
  "betaLevel20Checklist": [
    {
      "id": "step-1",
      "text": "Create your first WoW: Forever character (Try Skyborne or new class combo)",
      "cat": "Character"
    },
    {
      "id": "step-2",
      "text": "Reach Level 10 and unlock the revamped 1.15.8 Talent Tree",
      "cat": "Leveling"
    },
    {
      "id": "step-3",
      "text": "Explore starting zone & locate first Camping campfire Blueprint",
      "cat": "Camping"
    },
    {
      "id": "step-4",
      "text": "Enter Ironforge depths & complete Level 13-18 Dungeon: Hall of Thanes",
      "cat": "Dungeons"
    },
    {
      "id": "step-5",
      "text": "Travel to Tirisfal Glades & defeat bosses in Level 15-20 Dungeon: Ruins of Lordaeron",
      "cat": "Dungeons"
    },
    {
      "id": "step-6",
      "text": "Run classic low-level staples: Deadmines, Wailing Caverns, or Shadowfang Keep",
      "cat": "Dungeons"
    },
    {
      "id": "step-7",
      "text": "Deploy a player-crafted campfire item and share a 1-hour buff with your party",
      "cat": "Camping"
    },
    {
      "id": "step-8",
      "text": "Test the Retail In-Game Ping system during a dungeon run",
      "cat": "QoL"
    },
    {
      "id": "step-9",
      "text": "Queue for the Level 10-19 bracket in Warsong Gulch",
      "cat": "PvP"
    },
    {
      "id": "step-10",
      "text": "Hit the Phase 1 Cap: Level 20! Secure pre-BiS weapons for Phase 2",
      "cat": "Milestone"
    }
  ],
  "classDeepDives": {}
};

if (typeof window !== 'undefined') {
  window.WOW_FOREVER_DATA = WOW_FOREVER_DATA;
}
