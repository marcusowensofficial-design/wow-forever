/**
 * World of Warcraft: Forever - Core Dataset
 * Up-to-date as of November 13, 2026 (Live build 1.60.1.70707)
 * Includes beta schedule, countdowns, news, zones, dungeons, camping, stats, and milestones.
 */

const WOW_FOREVER_DATA = {
  "metadata": {
    "gameTitle": "World of Warcraft: Forever",
    "subtitle": "The Living Classic+ Adventure",
    "announcementDate": "September 12, 2026 (BlizzCon 2026)",
    "betaStartDate": "September 17, 2026",
    "betaEndDate": "October 23, 2026 (10:00 AM PDT)",
    "betaTotalDays": 37,
    "betaTotalWeeks": 5,
    "launchDate": "November 4, 2026",
    "raidsDate": "December 9, 2026",
    "currentBetaPhase": "WoW Forever Live Worldwide (Level 60 Progression Active • Tier 1 Raids Unlock Dec 9)",
    "clientBuild": "1.60.1.70707",
    "engineInfo": "Custom Ray-Traced Engine (Post-Warcraft III: Reforged Continuity)",
    "maxLevel": 60,
    "currentBetaCap": 60,
    "preloadSize": "~50 GB (Battle.net)",
    "legacyPointsAtLaunch": 16,
    "lastUpdated": "November 13, 2026"
  },
  "betaSchedule": {
    "totalDays": 37,
    "totalWeeks": 5,
    "startDate": "September 17, 2026",
    "endDate": "October 23, 2026 at 10:00 AM PDT",
    "phase1": {
      "title": "Phase 1: Foundations & Level 20 Cap",
      "dates": "September 17 – October 1, 2026",
      "duration": "14 Days (2 Weeks)",
      "cap": 20,
      "highlights": "Hall of Thanes & Ruins of Lordaeron dungeons, 10-19 Warsong Gulch, Zephras Isle, starting zones, talent tree foundation."
    },
    "phase2": {
      "title": "Phase 2: Mid-Game & Level 30 Cap (Extended!)",
      "dates": "October 1 – October 23, 2026",
      "duration": "23 Days (Extended to Oct 23, 10:00 AM PDT)",
      "cap": 30,
      "highlights": "Level cap increased to 30 on October 1. New dungeon Excavation Site: Wetlands (26–31) plus Razorfen Downs and Uldaman opened for testing. Extended through Oct 23 at 10:00 AM PDT."
    },
    "stressTest": {
      "title": "Open Beta Stress Test (All Battle.net Accounts)",
      "dates": "October 21, 2026 (2:00 PM PDT, ~4 hours)",
      "duration": "~4 Hours (Any WoW Account, No Subscription Required)",
      "cap": 30,
      "highlights": "Four-hour stress test on the regional launch hardware, open to any WoW account. The closed beta was offline during the test and stress-test characters were deleted afterwards."
    },
    "nameReservation": {
      "title": "Early Name Reservation & Character Creation",
      "dates": "October 27 – November 3, 2026 (Opens 10:00 AM PDT)",
      "duration": "7-Day Pre-Launch Window",
      "highlights": "Reserve up to 3 character names per account across rulesets prior to the November 4 launch."
    },
    "wipeAndLaunch": {
      "title": "Server Reset & Launch Preparation",
      "dates": "October 23 – November 3, 2026",
      "duration": "12 Days",
      "highlights": "Full server wipe of all beta test characters upon shutdown on Friday, Oct 23 at 10:00 AM PDT. Final tuning pass and global deployment prep for November 4 launch."
    }
  },
  "countdownTargets": {
    "betaStart": "2026-09-17T10:00:00-07:00",
    "betaPhase2": "2026-10-01T15:00:00-07:00",
    "betaEnds": "2026-10-23T10:00:00-07:00",
    "stressTest": "2026-10-21T10:00:00-07:00",
    "nameReservation": "2026-10-27T10:00:00-07:00",
    "nameReservationEnds": "2026-11-03T10:00:00-08:00",
    "globalLaunch": "2026-11-04T15:00:00-08:00",
    "raidUnlock": "2026-12-09T10:00:00-08:00"
  },
  "launchTimezones": [
    { "region": "Americas (West Coast)", "tz": "PST", "date": "Nov 4, 2026", "time": "3:00 PM PST", "utc": "23:00 UTC", "status": "Simultaneous Global Unlock" },
    { "region": "Americas (East Coast)", "tz": "EST", "date": "Nov 4, 2026", "time": "6:00 PM EST", "utc": "23:00 UTC", "status": "Simultaneous Global Unlock" },
    { "region": "Latin America (São Paulo)", "tz": "BRT", "date": "Nov 4, 2026", "time": "8:00 PM BRT", "utc": "23:00 UTC", "status": "Simultaneous Global Unlock" },
    { "region": "United Kingdom (London)", "tz": "GMT", "date": "Nov 4, 2026", "time": "11:00 PM GMT", "utc": "23:00 UTC", "status": "Simultaneous Global Unlock" },
    { "region": "Europe (Paris, Berlin, Rome)", "tz": "CET", "date": "Nov 5, 2026", "time": "12:00 AM CET (Midnight)", "utc": "23:00 UTC", "status": "Simultaneous Global Unlock" },
    { "region": "East Asia (Seoul, Tokyo)", "tz": "KST / JST", "date": "Nov 5, 2026", "time": "8:00 AM KST / JST", "utc": "23:00 UTC", "status": "Simultaneous Global Unlock" },
    { "region": "Australia & Oceania (Sydney)", "tz": "AEDT", "date": "Nov 5, 2026", "time": "10:00 AM AEDT", "utc": "23:00 UTC", "status": "Simultaneous Global Unlock" },
    { "region": "New Zealand (Auckland)", "tz": "NZDT", "date": "Nov 5, 2026", "time": "1:00 PM NZDT", "utc": "23:00 UTC", "status": "Simultaneous Global Unlock" }
  ],
  "sitePhases": {
    "beta2": {
      "key": "beta2",
      "topPill": "Beta Phase 2: LIVE NOW • Level 30 Cap Active (Extended to Oct 23!)",
      "tickerDuration": "37 Days (Sept 17 – Oct 23)",
      "heroTitle": "Phase 2: LIVE NOW",
      "heroBadge": "Day {daysElapsed} of 37",
      "headline": "Beta Phase 2 Extended: The Level 30 Cap Expansion",
      "subline": "Beta Phase 2 has been extended through Friday, October 23 at 10:00 AM PDT! Level 30 cap active with Excavation Site: Wetlands & the City of Dalaran.",
      "milestonesTitle": "Beta Phase 2 Milestones",
      "squadBracket": "Beta Phase 2 (Cap 30 - Live Now!)"
    },
    "prelaunch": {
      "key": "prelaunch",
      "topPill": "🛡️ Launch Day: Final Realm Prep • Global Launch Today at 3:00 PM PST • Realms Online Soon",
      "tickerDuration": "Beta Completed (37/37 Days)",
      "heroTitle": "Launch Day — Final Global Deployment",
      "heroBadge": "Launch Countdown",
      "headline": "Launch Day: Final Realm Readiness & Launch Countdown",
      "subline": "Early Name Reservation has concluded. Megarealms are finalizing world shards and client build verification ahead of today's worldwide launch at 3:00 PM PST.",
      "milestonesTitle": "Launch Progression Milestones",
      "squadBracket": "Global Launch Progression (Level 60)"
    },
    "live": {
      "key": "live",
      "topPill": "⚔️ WoW Forever is LIVE! Tier 1 Raids Unlock Soon",
      "tickerDuration": "Launch Era Active (Level 60)",
      "heroTitle": "WoW Forever is LIVE!",
      "heroBadge": "Realms Online",
      "headline": "World of Warcraft: Forever is Officially Live!",
      "subline": "The gates of Azeroth have swung open! Level to 60, gear up through 29 revamped dungeons, and prepare for Tier 1 Raids.",
      "milestonesTitle": "Launch Progression & Milestones",
      "squadBracket": "Live Realm Progression (Level 60)"
    },
    "raids": {
      "key": "raids",
      "topPill": "🔥 Tier 1 Raids Active: Barrow Deeps • Hyjal • Onyxia",
      "tickerDuration": "Tier 1 Raid Progression Live",
      "heroTitle": "Tier 1 Raids: OPEN NOW",
      "heroBadge": "Raids Active",
      "headline": "Tier 1 Raid Tier Unlocked: Barrow Deeps & Hyjal Summit",
      "subline": "The war for Azeroth reaches its crescendo. Enter Barrow Deeps (10m), Hyjal Summit (20m), and Onyxia's Lair (40m) without World Buffs.",
      "milestonesTitle": "Tier 1 Raid Milestones & Attunements",
      "squadBracket": "Tier 1 Raid Progression (T1 Ready)"
    }
  },
  "quickLinks": [
    {
      "name": "ForeverChanges.pro: Database & Changelog",
      "url": "https://foreverchanges.pro/",
      "icon": "🔄"
    },
    {
      "name": "WoW Forever Tools: Roster & Analyzer",
      "url": "https://wowforevertools.com/",
      "icon": "🛠️"
    },
    {
      "name": "Zockify Forever: Leveling & News",
      "url": "https://www.zockify.com/forever/",
      "icon": "⚡"
    },
    {
      "name": "Wowhead: Everything We Know",
      "url": "https://www.wowhead.com/forever/news/everything-we-know-about-wow-forever-382827",
      "icon": "🌐"
    },
    {
      "name": "Warcraft Tavern: Launch Hub & Pre-BiS",
      "url": "https://www.warcrafttavern.com/forever/",
      "icon": "🍺"
    },
    {
      "name": "Mobalytics: Class Tier Lists & Meta",
      "url": "https://mobalytics.gg/wow-forever",
      "icon": "📊"
    },
    {
      "name": "Icy Veins Talent Calculator",
      "url": "https://www.icy-veins.com/wow-forever/talent-calculator",
      "icon": "⚡"
    },
    {
      "name": "wow4ever.quest: Beta Database & Quests",
      "url": "https://wow4ever.quest/",
      "icon": "🗺️"
    },
    {
      "name": "wowforever.co: Open-Source Tracker",
      "url": "https://wowforever.co/",
      "icon": "📡"
    },
    {
      "name": "Wowhead Legacy Calculator",
      "url": "https://www.wowhead.com/forever/legacy-calculator",
      "icon": "🏆"
    },
    {
      "name": "Method.gg: Launch Hub & Guides",
      "url": "https://www.method.gg/wow-forever",
      "icon": "⚔️"
    },
    {
      "name": "Classic WoW Forever: Guides & Talents",
      "url": "https://classicwowforever.com/",
      "icon": "🛡️"
    },
    {
      "name": "Method.gg Racials Breakdown",
      "url": "https://www.method.gg/wow-classic/all-new-racial-abilities-in-world-of-warcraft-forever",
      "icon": "🦅"
    }
  ],
  "newsFeed": [
    {
      "id": "news-85",
      "title": "What's Next for WoW: Forever — Tier 1 Raids Dec 9, Hardcore This Winter, New Raids in 2027",
      "source": "Blizzard Roadmap Recap",
      "sourceType": "blizzard",
      "author": "WoW Forever Portal",
      "date": "November 12, 2026",
      "tag": "Roadmap",
      "url": "https://www.icy-veins.com/wow-forever/roadmap",
      "summary": "Blizzard's published roadmap: three raids open December 9, the Hardcore ruleset arrives this winter, and spring and summer 2027 each bring new raids, dungeons and a PvP season refresh. Blizzard notes timing is subject to change.",
      "content": `Where WoW: Forever goes after launch, per Blizzard's roadmap (timing subject to change):

• **December 9, 2026 — Tier 1 Raids:** Barrow Deeps (10-player), Hyjal Summit (20-player) and Onyxia's Lair (40-player). World Buffs do not work in raids.
• **Winter 2026/27 — Hardcore ruleset:** Confirmed for after launch; no date announced yet.
• **Early 2027:** Updated Skyborne character models and Druid forms. Blizzard has said a Shaman talent rework would come via a patch in early 2027 at the earliest.
• **Spring 2027:** Two new raids (10- and 20-player), two dungeons, a new questing area, a legendary questline and a PvP season refresh.
• **Summer 2027:** A revamped iconic raid plus a new raid, expanded world content, two dungeons, a PvP season refresh, and profession & Legacy updates.
• **Shop note:** The limited Warcraft Forever Collection stays in the Battle.net Shop until January 11, 2027.`
    },
    {
      "id": "news-84",
      "title": "Faction Balance Limits on PvP Rulesets; Auction House Deposit Change Pushed to November 17",
      "source": "Blizzard Official Forums",
      "sourceType": "blizzard",
      "author": "Kaivax (Community Manager)",
      "date": "November 11, 2026",
      "tag": "Realm Operations",
      "url": "https://eu.forums.blizzard.com/en/wow/t/641169",
      "summary": "Blizzard is restricting the larger faction on specific PvP rulesets (Horde on NA PvP, Alliance on EU RP-PvP) and pushed the Auction House minimum-deposit change to the November 17/18 weekly maintenance.",
      "content": `Several realm-operations updates landed this week:

• **Faction balance (Nov 10–11):** Blizzard is limiting the larger faction on certain PvP rulesets — Horde on the North American PvP rulesets and Alliance on the European Roleplay-PvP ruleset. Kaivax stated the goal is to get "as close to a 50/50 faction balance as possible."
• **Auction House deposit:** A hotfix that would have lowered the minimum AH deposit from 1 silver to 1 copper was withdrawn. It is now planned for weekly maintenance on November 17 (Americas) / November 18 (Europe). Until then the minimum deposit stays at 1 silver.
• **Item Restoration** was disabled on November 11 while Blizzard investigates a critical bug.
• **Twitch Drop:** The launch Twitch Drop campaign ended November 13. The Pouch of Violet Dust toy is slated to be removed from collections in early December.`
    },
    {
      "id": "news-83",
      "title": "WoW: Forever Hotfixes — November 11, 2026: Judgement Becomes a Ranged Attack, Tailoring Bag Fixes & Riverglades Damage Cuts",
      "source": "Blizzard Official Hotfixes",
      "sourceType": "blizzard",
      "author": "Blizzard Entertainment",
      "date": "November 11, 2026",
      "tag": "Official Hotfix",
      "url": "https://worldofwarcraft.blizzard.com/en-us/news/24315281",
      "summary": "Paladin Judgement now uses Ranged hit and no longer procs melee effects, Hunter Volley stops on movement, Tailoring bag recipes corrected, and Riverglades Twilight elites hit far less hard.",
      "content": `Hotfixes deployed November 11, 2026:

• **Classes:**
  - **Paladin:** *Judgement* is now a Ranged Attack — it uses Ranged hit chance and no longer triggers melee procs. *Unsealed Fury* (Retribution) no longer echoes Windfury Totem attacks.
  - **Hunter:** *Volley* no longer activates procs and stops channeling when you move.
  - **Druid (Feral):** *Rend and Tear* now applies to Pounce Bleed.
  - **Priest:** *Confounding Flash* (Gnome) and *Twilight Focus* work in Shadowform.
  - **Shaman:** *Flametongue Totem* Rank 2 works.
• **Professions — Tailoring bags corrected:** Red Mageweave Bag (5 bolts, 14 slots), Green Silk Pack (5 bolts, 12 slots), Black Silk Pack (6 bolts, 12 slots), Green & Red Woolen Bag (5 bolts, 10 slots).
• **Riverglades:** Twilight Enforcer's Smash greatly reduced, Executioner Morg's damage lowered, Twilight Forgemaster's Mark of Flames now +50 damage (was 1,000).
• **Items:** Bloody Claws of Attack grant +1 Fist skill; Earthen Silk Slippers no longer give excess spell damage.
• **World:** Mounting works again in named areas of Shen'dralas.`
    },
    {
      "id": "news-82",
      "title": "WoW: Forever Hotfixes — November 10, 2026: Enhancement Shaman Rework, Affliction Soul Siphon & Hunter Pet Health Fix",
      "source": "Blizzard Official Hotfixes",
      "sourceType": "blizzard",
      "author": "Blizzard Entertainment",
      "date": "November 10, 2026",
      "tag": "Class Balancing",
      "url": "https://worldofwarcraft.blizzard.com/en-us/news/24315281",
      "summary": "The promised class tuning shipped: Stormstrike and Maelstrom Weapon reworked, Affliction DoTs now feed Soul Siphon, Warlock demons sturdier, Hunter pet health corrected to 115%, racial vendor mounts now Bind-on-Pickup, and most level 48+ quests award gold.",
      "content": `The class tuning Blizzard previewed shipped with the November 10 hotfixes:

• **Enhancement Shaman:** *Stormstrike* lowered to 100% weapon damage with an 8 sec cooldown. *Maelstrom Weapon* now grants a flat 20% cast time and mana cost reduction per stack with a rank-based 6–10 procs per minute. *Mental Dexterity* Intellect-to-AP ratio lowered. Weapon imbues and weapon totems can now be active together.
• **Affliction Warlock:** *Soul Siphon* boosts Drain Life, Drain Soul and Wrack by 4/8/12% per Corruption, Siphon Life or Bane of Agony on the target (max 36%). *Wrack* damage lowered 30%, but it now speeds up those DoT ticks while channeled.
• **Warlock demons:** Imp Firebolt (ranks 1–4) and Imp health increased; Voidwalker, Incubus and Succubus base health +~15%.
• **Hunter:** Pet health corrected to 115% of normal (a bug had it at 150%). Arcane Shot and Summon Hawk cost 11% of base mana; Hawk melee damage +~80%.
• **Druid:** Omen of Clarity works after a spec swap; Nature's Swiftness also makes Wild Growth instant.
• **Warrior (Arms):** Sweeping Strikes keeps its charges if no second target is hit.
• **Items & Economy:** Racial vendor mounts are now Bind-on-Pickup. Rage of the Storm (Shaman quest reward) now has Strength instead of Intellect. Most quests level 48+ now also reward gold.
• **Professions:** Journeyman Campfire Kit needs Cooking 90 (was 140); Coarse Grinding Stone skill-ups extended to 90; Swiftstrike Shot and Swiftfeather Arrow no longer Bind-on-Pickup.`
    },
    {
      "id": "news-81",
      "title": "WoW: Forever Hotfixes — November 9, 2026: Dungeon XP +50%, Drowned City Damage Cut & Zone Population Lowered",
      "source": "Blizzard Official Hotfixes",
      "sourceType": "blizzard",
      "author": "Blizzard Entertainment",
      "date": "November 9, 2026",
      "tag": "Official Hotfix",
      "url": "https://worldofwarcraft.blizzard.com/en-us/news/24315281",
      "summary": "Experience from all dungeon enemy kills increased by 50%, The Drowned City's Deathless Marrow trash toned down, mounting disabled inside Stratholme, and player caps lowered in congested zones.",
      "content": `Hotfixes deployed November 9, 2026:

• **Dungeons:** Experience from all enemy kills in dungeons **increased by 50%**.
  - *The Drowned City:* Creatures no longer deal ~30% extra damage. Deathless Marrow health −25%, Deathless Sorcerer Fireball −25%, Deathless Watcher Charge −50%, Deathless Guardian Shield Slam used ~50% less often.
  - *Blackrock Depths:* Throne room doors reopen after a wipe on Emperor Thaurissan.
  - *Stratholme:* Mounting inside is no longer possible.
  - *The Shaper's Terrace:* Vitrix, Snowtalon and Cinder drop correct loot.
• **Classes:** Feral Charge (Cat) enters combat immediately; Natural Instinct applies to Lacerate and Pounce. Flamestrike ground ticks no longer consume Clearcasting. Consecration keeps its bonus after targets despawn. Power Infusion persists on allies. Incinerate removed from non-Destruction Warlocks.
• **Items:** Pouch of Violet Dust Camp Benefits aura gets its extra hour. Waylaid Crates and Craftsman's Writs now drop inside dungeons. Nifty Stopwatch no longer shares a cooldown with movement abilities.
• **World:** Population lowered in congested zones (PvP ruleset reduced further). Un'Goro Young Diemetradons now level 51–52.
• **Quests:** Players below 60 can loot Hyjal Owl Nests for "Feathers in Flight."`
    },
    {
      "id": "news-80",
      "title": "Darkmoon Faire Is Live in WoW: Forever (November 9–16)",
      "source": "Wowhead",
      "sourceType": "wowhead",
      "author": "Wowhead News Team",
      "date": "November 9, 2026",
      "tag": "Live Event",
      "url": "https://www.wowhead.com/forever/news",
      "summary": "The first Darkmoon Faire of WoW: Forever runs November 9 through November 16, 2026.",
      "content": `The first Darkmoon Faire on WoW: Forever live realms opened November 9 and runs through **November 16, 2026**.

• Turn in Darkmoon tickets and play the Faire games while it is in town.
• Check Wowhead's Forever guides for the prize list and which Darkmoon buff to pick for your class.`
    },
    {
      "id": "news-76",
      "title": "Blizzard Calls WoW: Forever Its Biggest Launch Ever; World-First Level 60s Include a Paladin, a Shaman and Three Mages",
      "source": "Wowhead",
      "sourceType": "wowhead",
      "author": "Wowhead News Team",
      "date": "November 7, 2026",
      "tag": "Launch Coverage",
      "url": "https://www.wowhead.com/forever/news",
      "summary": "Blizzard says WoW: Forever is the largest launch in World of Warcraft history, and the race to Level 60 finished about three days after launch.",
      "content": `Launch-week coverage from Wowhead:

• Blizzard describes WoW: Forever as the biggest launch World of Warcraft has had.
• The world-first Level 60 race ended roughly three days after launch, with a Paladin, a Shaman and three Mages among the first to reach the cap.`
    },
    {
      "id": "news-75",
      "title": "Blizzard Flags Upcoming Class Tuning for Shamans, Warlocks and Hunter Pets",
      "source": "Blizzard Official Forums",
      "sourceType": "blizzard",
      "author": "Blizzard Entertainment",
      "date": "November 6, 2026",
      "tag": "Class Balancing",
      "url": "https://us.forums.blizzard.com/en/wow/t/class-tuning-incoming-november-10/2404092",
      "summary": "Blizzard identified problems with Shamans, Warlocks and Hunter pets and scheduled a tuning pass — it shipped with the November 10 hotfixes.",
      "content": `Blizzard said it has identified class and Hunter pet issues it intends to address:

• **Hunter pets & Voidwalkers:** Durability moved closer to Classic Era levels.
• **Affliction Warlock:** Siphon Life, Corruption and Bane of Agony made worth casting alongside Wrack, without changing total damage output.
• **Enhancement Shaman:** Strength becomes the strongest stat — leveling Enhancement Shamans should collect Strength and Attack Power gear.
• Blizzard says it may tune classes on Tuesdays as new issues surface. See the November 10 hotfix entry for the final numbers.`
    },
    {
      "id": "news-73",
      "title": "WoW: Forever Live Hotfixes — November 6, 2026: Class Mechanics, Voidwalker Base HP & Dungeon Spawns",
      "source": "Blizzard Official Hotfixes",
      "sourceType": "blizzard",
      "author": "Blizzard Entertainment",
      "date": "November 6, 2026",
      "tag": "Official Hotfix",
      "url": "https://worldofwarcraft.blizzard.com/en-us/news/24315281",
      "summary": "Voidwalker base health increased by ~40 across all levels, Swiftmend tooltip clarified (no longer consumes HoTs), Maraudon Zaetar's Spirit spawn resolved, and The Drowned City portal fixed.",
      "content": `A major wave of hotfixes was deployed to live realms on November 6, 2026:

• **Classes & Combat:**
  - **Warlock:** Voidwalker base health increased by ~40 points across all levels (1–60). Fixed an issue where the *Soul Siphon* talent caused *Wrack* to scale its own damage.
  - **Druid:** *Bloom* now reliably heals its target. Corrected tooltip descriptions on *Bear Form* and *Ravage*. Fixed *Swiftmend* tooltip to remove erroneous mentions of consuming the active HoT.
  - **Warrior:** *Reckless Swings* tooltip now explicitly confirms that activation triggers *Gore Drinker*.
  - **Rogue:** *Shank* tooltips properly display Rank 1 and Rank 2 and correctly display combo point generation while *Boot Knife* is talented.
  - **Mage:** Corrected *Arcane Blast* debuff duration to 18 seconds. Removed the *Research* spell — only *Study* is granted after the quest.
  - **System:** *Cooldown Manager* now dynamically factors in diminishing returns and racial CC reductions (Orc Hardiness). Fixed *Quick and the Dead* Legacy Talent activation.

• **Dungeons & Quests:**
  - **Maraudon:** Fixed a critical progression blocker where *Zaetar's Spirit* failed to spawn after defeating Princess Theradras.
  - **The Drowned City & Blackmaw Hold:** Resolved creature disengage pathing bugs; instance portal for *The Drowned City* now reliably teleports players inside.`
    },
    {
      "id": "news-72",
      "title": "WoW: Forever Live Hotfixes — November 5, 2026: Plainsrunning Flag Fix, NPC Respawns & Mild Spices",
      "source": "Blizzard Official Hotfixes",
      "sourceType": "blizzard",
      "author": "Blizzard Entertainment",
      "date": "November 5, 2026",
      "tag": "Official Hotfix",
      "url": "https://worldofwarcraft.blizzard.com/en-us/news/24315281",
      "summary": "Plainsrunning disabled during BG prep and canceled upon flag pickup in Warsong Gulch. NPC respawn pacing adjusted across Durotar and Dustwallow; Mild Spices vendor price set to 1c.",
      "content": `The first post-launch hotfix wave deployed on November 5, 2026:

• **Player versus Player (PvP):**
  - Tauren *Plainsrunning* no longer stacks during Battleground preparation gates and active stacks cancel immediately upon picking up the flag in Warsong Gulch.

• **Economy & Vendors:**
  - *Mild Spices* vendor resale price reduced from 2 copper to 1 copper to close unintended vendor profit arbitrage.
  - Zephras Isle trade suppliers now correctly stock Apprentice tradeskill bags.

• **World & Quests:**
  - Adjusted respawn intervals for Yarrog Baneshadow (Durotar) and Deathstalker Erland (Silverpine). Lotheluum Starbreeze on Zephras Isle now trains Druids.`
    },
    {
      "id": "news-71",
      "title": "World of Warcraft: Forever Goes Live Globally Today: 3:00 PM PST Simultaneous Unlock, Megarealm Operations & Day-One Roadmap",
      "source": "Blizzard Official Operations Desk",
      "sourceType": "blizzard",
      "author": "Blizzard Entertainment",
      "date": "November 4, 2026",
      "tag": "Official Global Launch",
      "url": "https://worldofwarcraft.blizzard.com/en-us/news",
      "summary": "World of Warcraft: Forever launches worldwide today, November 4, 2026 at 3:00 PM PST! Full 1–60 progression, 29 revamped dungeons, open-world Camping survival, dynamic megarealm sharding, and Build 1.60.1.70707 unlock simultaneously across all regions.",
      "content": `The wait is over: *World of Warcraft: Forever* officially deploys worldwide today, **November 4, 2026, at 3:00 PM PST (23:00 UTC)**!

• **Simultaneous Worldwide Launch Schedule:**
  - **Americas (West Coast):** Nov 4, 3:00 PM PST
  - **Americas (East Coast):** Nov 4, 6:00 PM EST
  - **Latin America (São Paulo):** Nov 4, 8:00 PM BRT
  - **United Kingdom:** Nov 4, 11:00 PM GMT
  - **Europe (Paris / Berlin / Rome):** Nov 5, 12:00 AM CET (Midnight)
  - **East Asia (Seoul / Tokyo):** Nov 5, 8:00 AM KST / JST
  - **Australia (Sydney):** Nov 5, 10:00 AM AEDT
  - **New Zealand (Auckland):** Nov 5, 1:00 PM NZDT

• **Megarealms & Anti-Queue Layering Architecture:**
  - Regional megarealms (Normal, PvP, RP, RP-PvP) utilize dynamic world sharding and intelligent shard load-balancing to eliminate login bottlenecks while preserving seamless capital city populations.
  - Starting zones feature dynamically elevated creature respawn rates to ensure smooth quest completion during peak day-one concurrency.

• **Day-One Progression Scope:**
  - Level Cap: Level 60 unlocked from minute one across both Kalimdor and Eastern Kingdoms.
  - Dungeons: All 29 revamped leveling and endgame dungeons accessible immediately, including *Excavation Site: Wetlands*, *Ruins of Lordaeron*, *Hall of Thanes*, and the *City of Dalaran*.
  - Class Tuning Freeze: Build 1.60.1.70707 serves as the stable competitive progression baseline; class tuning is frozen through Tier 1 raid unlocks on December 9, 2026.`
    },
    {
      "id": "news-70",
      "title": "Blizzard Releases 'WoW: Forever—What’s New and What Feels Familiar' Launch Primer: Experience Presets, Controller 1.0 & Balance Freeze",
      "source": "Blizzard Official News",
      "sourceType": "blizzard",
      "author": "Blizzard Entertainment",
      "date": "November 3, 2026",
      "tag": "Official Launch Primer",
      "url": "https://worldofwarcraft.blizzard.com/news/24315821/",
      "summary": "On launch eve Blizzard published 'WoW: Forever—What's New and What Feels Familiar', and confirmed it does not plan major class tuning before Tier 1 raids open on December 9.",
      "content": `On November 3, 2026, Blizzard Entertainment published its comprehensive pre-launch primer titled *"WoW: Forever—What’s New and What Feels Familiar"*, outlining day-one player options:

• **Experience Presets at Character Creation:**
  - **Enhanced Preset (For Modern WoW Players):** Features consolidated One-Bag inventory, on-screen quest objectives & Points of Interest (POIs), opt-in Transmog styling, modern strafe keybindings, centralized screen HUD, and modern high-definition character models.
  - **Classic Preset (For Purists):** Features the authentic 2004 UI layout, original standard-definition models, traditional camera-turning bindings, with quest markers and transmog turned off by default.
  - *Full Customizability:* Players can customize every individual option independently in the Interface menu at any time regardless of initial preset.

• **Pre-Load & Download Footprint:**
  - Client preload is available worldwide through the Battle.net desktop application with an installation footprint of ~50 GB.

• **Official Launch Class Balance Freeze:**
  - Blizzard confirmed that no major class tuning or sweeping balance adjustments will occur between worldwide launch on November 4 and Tier 1 raid unlocks on December 9, establishing Build 1.60.1.70707 as the stable progression baseline.

• **Native Controller / Gamepad 1.0 Support:**
  - Built-in controller integration is active on day one, including radial action wheels, contextual looting, and smooth target acquisition.`
    },
    {
      "id": "news-69",
      "title": "Hunter Class Buffs on WoW: Forever (Live Hotfix)",
      "source": "Blizzard Official Forums",
      "sourceType": "wowhead",
      "author": "Squishei & Wowhead Desk",
      "date": "November 3, 2026",
      "tag": "Hunter Hotfix & Tuning",
      "url": "https://us.forums.blizzard.com/en/wow/t/2360696",
      "summary": "Live server hotfixes have been applied to WoW: Forever, partially reverting recent nerfs and significantly increasing direct damage across Hunter shots, Aspect of the Hawk, and Trueshot Aura.",
      "content": `Blizzard has deployed live hotfixes to WoW: Forever, substantially buffing Hunter direct shot damage and group utility:

• **Aspect of the Hawk:** Ranged Attack Power buffed across all ranks:
  - Rank 1: 20 RAP (was 15)
  - Rank 2: 35 RAP (was 22)
  - Rank 3: 50 RAP (was 30)
  - Rank 4: 70 RAP (was 38)
  - Rank 5: 90 RAP (was 47)
  - Rank 6: 110 RAP (was 55)

• **Trueshot Aura:** Group/raid Ranged Attack Power increased on all ranks:
  - Rank 1: 20 (was 15)
  - Rank 2: 35 (was 22)
  - Rank 3: 50 (was 30)
  - Rank 4: 75 (was 40)
  - Rank 5: 100 (was 50)

• **Barrage & Marksmanship Scaling:**
  - Barrage damage bonus on Multi-Shot, Aimed Shot, and Volley raised to 5/10/15% (was 3/7/10%).
  - Sniper Shot bonus damage doubled on all ranks: Rank 1 +320 (was 160), Rank 2 +450 (was 225), Rank 3 +590 (was 295).
  - Aimed Shot bonus damage increased by ~110% across all ranks (Rank 1: 40, Rank 2: 70, Rank 3: 115, Rank 4: 185, Rank 5: 260, Rank 6: 350).
  - Arcane Shot base damage increased by ~30% and Attack Power scaling coefficient raised from 0.10 to 0.15.
  - Serpent Sting base damage increased by ~20% and Attack Power scaling per tick increased to 5% (was 3%).
  - Trap cooldowns unified to a shared 30-second cooldown across Fire and Frost traps.`
    },
    {
      "id": "news-68",
      "title": "WoW: Forever Official Development Notes and Class Tuning",
      "source": "Blizzard Official Development Notes",
      "sourceType": "blizzard",
      "author": "Blizzard Entertainment",
      "date": "November 3, 2026",
      "tag": "Official Patch 1.60.1 Notes",
      "url": "https://us.forums.blizzard.com/en/wow/t/2360696",
      "summary": "Blizzard has published the comprehensive official launch development notes and class tuning for WoW: Forever, standardizing power budgets, overhauling class talent trees, introducing Shank and Poised, and bringing Gamepad support to a functional beta state.",
      "content": `Official development notes for the global launch of World of Warcraft: Forever (Build 1.60.1):

• **Universal Combat & Systems Changes:**
  - Throw uses a 0.5s windup timer instead of weapon attack speed.
  - Diminishing Returns enabled for proc-based roots: Frostbite, Entrapment, Improved Wing Clip, Counterattack, and Improved Hamstring.
  - Low-rank penalty removed on talents proccing from low-rank spells (Blizzard retains downranking check for ranks learned >12 levels below player).
  - Class ability training costs normalized across levels 1–60 (between 206 and 207 gold for all classes).
  - Bags no longer automatically equip into available bag slots; manual player placement is required.

• **Class Highlights:**
  - **Rogue:** New baseline off-hand strike *Shank* learned at level 24 (generates 15 energy; rank 2 at 44 generates 25 energy). New passive *Poised* at level 18 (-10 Energy on next ability when out of combat at max energy). Lethality compressed to 2 ranks (10/20%), Relentless Strikes moved to Row 5 (5 ranks), Venom is now a passive boosting poison application after Shank, Mutilate moved to Row 7 (90% weapon dmg), Improved Eviscerate renamed Coup de Grace, and new Subtlety capstone *Death Mark*.
  - **Druid:** *Poised* passive learned at level 32. Bear/Dire Bear Form threat bonus increased from 50% to 115%. Shred (200%), Claw (140%), and Ravage (435%) weapon damage scaling significantly increased. Lacerate is now a Feral Tier 4 talent; Furor swapped into Feral Tier 1 and Heart of the Wild into Restoration Tier 1. New Restoration Tier 3 talent *Bloom*.
  - **Paladin:** Righteous Fury available to train at level 10 (mirrors tanking stances), granting 33% all threat and +90% Holy threat. Salvation, Mass Salvation, Revoke, and Blessing of Light removed. Holy tree gains *Oath of Light* and *Boundless Light*. Protection gains *Stoicism* and *Shieldsworn* (strikes with shield, triggers block talents, blocks spells). Retribution gains *Turn Evil* and *Unsealed Wrath* (stores active seal, swapping seals unleashes burst).
  - **Shaman:** *Lava Burst* removed; replaced with *Call of Thunder* (+5% crit to LB/CL). Elemental Mastery renamed *Lightning Mastery*. Stormstrike deals 150% weapon damage on a 6s cooldown (was 8s). Mental Dexterity provides 50/100/150% AP of Int. Riptide redesigned (-40% mana, 12s CD, pure HoT). Totemic Projection renamed *Totemic Call* (30s CD).
  - **Warrior:** Defensive Stance threat bonus increased to 80% (was 30%). Slam cooldown reduced to 15s. Improved Tactical Mastery compressed to 3 ranks (5/10/15 rage retention). Two-Handed Weapon Spec increased to 2/4/6%. Fury gains *Reckless Swings* and *Improved Whirlwind*; Bloodthirst requires Death Wish.
  - **Mage:** Frost Blast removed. Precision in Frost tree now grants 2/4/6% hit with all spells (Arcane Focus removed). Ice Barrier grants +15% Frost damage for 1 min + 5% while held. Ice Lance on 8s CD shared with Fire Blast.
  - **Warlock:** Amplify Curse affects Curse of Exhaustion and Bane of Agony. Wrack spell damage coefficient doubled. Shadow and Flame buffed to 4/8/12/16/20%.
  - **Races:** Dwarf gains *Artisan's Precision* (+1% hit). Orc *Command* re-added (+5% pet dmg). Human *Ruthless* set to 1% crit, *Human Spirit* to 10% Spirit. Tauren *Plainsrunning* buffed to 2% per stack up to 60% max (Hotfix Nov 5: No battleground prep stacking; flag pickup immediately cancels stacks). Undead *Touch of the Grave* ICD reduced to 15s.`
    },
    {
      "id": "news-67",
      "title": "Final Pre-Launch Systems Sync: Client Build 1.60.1.70707 & Hotfixes, Level 60 Talent Trees, 22,493 Item Database Tooltips & Consumables",
      "source": "WoW Forever Systems & Datamining",
      "sourceType": "blizzard",
      "author": "Marcus Owens & Core Data Desk",
      "date": "October 31, 2026",
      "tag": "Launch Readiness & Systems Sync",
      "summary": "Full synchronization as of October 31, 2026: Talent Calculator defaulted to Level 60 cap (51 points), deep dive rotations synchronized with latest hotfixes, complete 22,493-item database integrated with canonical tooltips and consumable Use effects, and Early Name Reservation entering final 72 hours.",
      "content": `All core systems, forensic datasets, and player tools have completed final synchronization as of October 31, 2026:

• **Level 60 Talent Engine Default:**
  - The Interactive Talent Calculator and downranking simulator now initialize at the Level 60 global launch cap (51 points), while retaining full 1–60 interactive adjustment and legacy perk bonuses.
  - Full synchronization with Client Build 1.60.1.70707 and live server hotfixes: Druid Furor / Heart of the Wild placement, Lacerate, Shifting Power 8s cooldown, Paladin Shieldsworn capstone, and Mage Ice Lance 300% frozen burst.

• **Complete Item Database & Consumables Expansion:**
  - Expanded Item DB & Market to 22,493 canonical items across all 29 dungeons, world rares, and outdoor gathering nodes.
  - Added dedicated consumable tooltips with exact Use/Equip effects for all potions, elixirs, flasks, sharpening stones, and scrolls.

• **Pre-Launch Operational Countdown:**
  - Early Name Reservation enters its final weekend across all regional megarealms (closes Nov 3 at 10:00 AM PST).
  - Worldwide Global Launch remains locked for Wednesday, November 4 at 3:00 PM PST.`,
      "url": "https://foreverchanges.pro/patch-notes"
    },
    {
      "id": "news-66",
      "title": "Massive Talent Tree Overhauls for Druids & Paladins, Pre-Launch Class Tuning in Build 1.60.1.70707 & October 30 Live Hotfix",
      "source": "Wowhead & ForeverChanges Datamining",
      "sourceType": "blizzard",
      "author": "Systems Balance & Theorycraft Desk",
      "date": "October 30, 2026",
      "tag": "Class Balancing & Datamining",
      "summary": "Forensic telemetry and Wowhead's October 30 report reveal sweeping talent redesigns for Druids and Paladins, baseline trainer expansions (Voice of Truth L20, Righteous Fury L10 +33% all threat), and wide class tuning for Mages, Priests, Hunters, Warlocks, and Warriors ahead of launch.",
      "content": `Massive pre-launch class tuning and talent tree restructuring have arrived in client Build 1.60.1.70707 and the October 30 server hotfix:

• **Druid Massive Talent Tree Overhaul:**
  - **Feral & Resto Tree Swap:** Furor moved to Feral Row 1 Col 3 (Bear Rage + Cat energy decay scaling), while Heart of the Wild moved to Restoration Row 1 Col 3.
  - **New Feral Abilities:** Added **Lacerate** at Row 4 Col 2 (bleed stacking up to 5 times for high threat, requires Savage Fury) and **Predatory Discipline** at Row 4 Col 3 (Ferocious Bite no longer converts extra energy into damage, but deals bonus damage based on excess energy).
  - **Primal Bite & Shifting Power:** Primal Bite moved to Row 7 Col 2 (requires Leader of the Pack; deals 42/62/77 bonus damage). Shifting Power moved to Row 7 Col 3 (requires Predatory Discipline) with cooldown slashed to 8 seconds (was 16s). Berserk and Improved Shifting Power removed.
  - **Crit Aura Unification:** Moonkin Form and Leader of the Pack now increase **all** Critical Strike chance (melee, ranged, and spell) of party/raid members by 3%.
  - **Restoration Upgrades:** Added **Bloom** at Row 3 Col 4 (target healed for 100% of your Spirit when Rejuvenation or Regrowth expires, or 50% if dispelled). Naturalist now reduces cast time of both Healing Touch and Wild Growth by up to 0.5 sec, while increasing damage by 2–10%. Wild Growth base heal increased to 336 over 7 sec (3 sec base cast).

• **Paladin Massive Talent Tree Overhaul:**
  - **Baseline Expansion:** Righteous Fury is now learned at Level 10 and increases all threat by 33% plus 90% additional on Holy attacks. Voice of Truth is now a baseline trainer ability at Level 20.
  - **Holy Tree Rework:** Spiritual Focus expanded to 5 ranks at Row 1 Col 2 (14/28/42/56/70% pushback protection). Added **Oath of Light** at Row 4 Col 3 (oath buff increasing Holy Light, Flash of Light, and Holy Shock). Added **Boundless Light** at Row 5 Col 3 (+15/30% Holy Shock crit on non-Oath allies). Holy Power reworked to grant +10/20/30/40/50% critical strike healing bonus. Light's Vigil is now friendly-target only (40 yd range).
  - **Protection Tree Rework:** Redoubt buffed to 6/12/18/24/30% block chance. Sacred Duty reduces Forbearance duration by 5/10 sec. Shield Specialization compressed to 2 ranks (15/30% block value & mana restore). Swift Judgement is now an active 1-min cooldown ability triggering Judgement without consuming seals. Added **Stoicism** at Row 5 Col 1 (-10/20% Stun/Charm duration). Holy Shield moved to Row 5 Col 2. Added new capstone **Shieldsworn** at Row 7 Col 2 (-4s Holy Strike CD, triggers active Holy Shield/Shield Specialization on strike, and enables spell blocking for 6 sec).
  - **Retribution Tree Rework:** Conviction compressed to 3 ranks at Row 2 Col 2 (+2/4/6% crit on all spells and attacks). Two-Handed Weapon Specialization at Row 4 Col 4 grants +2/4/6% physical damage and reduces all threat by 7/14/20%. Added **Turn Evil** at Row 5 Col 1 (reduces Turn Undead cast/CD and allows it to affect Demons). Champion of the Light expanded to 5 ranks (+60% Int as Spell Damage, -1.0s Hammer of Wrath cast). Renamed capstone to **Unsealed Wrath** (melee attacks cache copies of active seals up to 3 stacks, triggered by swapping seals).

• **Other Class Tuning & Balance:**
  - **Mage:** Arcane Blast stacks 12% Int as Spell Damage (was 15%), mana cost increase reduced to 100% per stack, duration 18s. Arcane Resilience expanded to 3 ranks (+75% Int as Armor). Ice Barrier increases Frost damage done by 15% (plus 5% while shielded). Winter's Chill increases next Cone of Cold by 20% per stack. Ice Lance deals 300% bonus damage to frozen targets with 8s CD on all ranks.
  - **Priest:** Shadow Word: Death backlash on non-kill increased to 30% max HP. Binding Heal moved to baseline trainer (level 25). Added **Holy Binding** at Row 4 Col 4 (healing allies with Flash Heal heals you for 50% as much for zero threat). Cure Disease and Abolish Disease now castable in Shadowform.
  - **Hunter:** Pathfinding moved to Row 3 Col 1; Improved Revive Pet moved to Row 2 Col 3.
  - **Warlock:** Improved Drains now increases Mana drained by Drain Mana by 7/14/20%.
  - **Warrior:** Revenge now scales with 22.5% / 25% Attack Power at all ranks.
  - **Adventurer's Tent:** Reverted in client files to a cosmetic miniature tent.`,
      "url": "https://www.wowhead.com/forever/news/massive-talent-tree-changes-to-druids-and-paladins-class-tuning-for-wow-forever-383670"
    },
    {
      "id": "news-65",
      "title": "Over 8.86 Million Characters Created: Blizzard Releases Official WoW: Forever Beta Statistics & Infographic",
      "source": "Blizzard Official / Wowhead",
      "sourceType": "blizzard",
      "author": "Blizzard Community Team",
      "date": "October 30, 2026",
      "tag": "Community & Infographics",
      "summary": "Blizzard publishes final Beta test telemetry: 8,862,354 characters created, 9.96M PvP kills, The Hall of Thanes crowned deadliest dungeon, 612k Forsaken Paladins rolled, and Kobold Miners claim the title of deadliest open-world creature.",
      "content": `Blizzard Entertainment has published the official *World of Warcraft: Forever* Beta Infographic, revealing extraordinary player participation across the 37-day testing phase ahead of global launch on November 4:

• **Key Beta Telemetry Highlights:**
  - **Total Characters Created:** **8,862,354** adventurers entered Azeroth during the closed beta and open stress tests.
  - **Deadliest Dungeon:** **The Hall of Thanes** claimed more player lives than any other instanced encounter in the beta, cementing its status as a punishing new Classic+ five-player experience.
  - **Total PvP Kills:** **9,959,014** honorable (and dishonorable) kills logged across Battlegrounds and contested territories.
  - **Top Open World PvP Zone:** **Hillsbrad Foothills** reigned supreme as the primary theater of faction conflict, driven by nonstop skirmishes between Southshore and Tarren Mill.
  - **Skyborne Race Adoption:** **1,889,084** Skyborne characters created, making the newly revealed winged race one of the most popular character choices in beta testing.
  - **Forsaken Paladins:** **612,096** Undead Paladins created, confirming massive community engagement with the newly introduced Horde holy warriors.
  - **Deadliest Creature:** **Kobold Miner** (*"You no take candle!"*) in Elwynn Forest and Jasperlode Mine took down more unwary low-level adventurers than any other mob in Azeroth.
  - **Duels Fought:** **1,248,125** formal duels contested outside the gates of Orgrimmar and Ironforge.
  - **Deaths from Falling:** **1,157,204** fatalities caused by gravity, cliffs, and the notorious Undercity elevator boss.

These metrics reflect unprecedented engagement as players finalize their rosters during Early Name Reservation ahead of the global launch on Wednesday, November 4!`,
      "url": "https://www.wowhead.com/forever/news/over-8-million-characters-were-created-in-the-wow-forever-beta-383669"
    },
    {
      "id": "news-64",
      "title": "World of Warcraft: Forever Goes Live Globally November 4 at 3:00 PM PST",
      "source": "Blizzard Official / Blue Post",
      "sourceType": "blizzard",
      "author": "Blizzard Entertainment",
      "date": "October 29, 2026",
      "tag": "Launch & Schedule",
      "summary": "Blizzard confirms simultaneous worldwide launch schedule for World of Warcraft: Forever on Wednesday, November 4, 2026 at 3:00 PM PST (6:00 PM EST / 11:00 PM GMT), with realm layering optimizations and final character reservation reminders.",
      "content": `Blizzard Entertainment has published the global release schedule for *World of Warcraft: Forever*. The living Classic+ adventure goes live simultaneously worldwide on Wednesday, November 4, 2026:

**Global Launch Times:**
• Americas (PST): November 4 at 3:00 PM PST
• Americas (EST): November 4 at 6:00 PM EST
• Western Europe (GMT/UTC): November 4 at 11:00 PM GMT
• Central Europe (CET): November 5 at 12:00 AM CET
• Taiwan / Asia (CST): November 5 at 7:00 AM CST
• Korea / Japan (KST/JST): November 5 at 8:00 AM KST
• Australia (AEDT): November 5 at 10:00 AM AEDT

**Pre-Launch Checklist:**
- Early Name Reservation remains active until launch: ensure you have locked in your 3 character names per account.
- Addon suites will update to Build 16001 TOC standards on launch day.
- Tier 1 Raids (Barrow Deeps 10m, Hyjal Summit 20m, and Onyxia's Lair 40m) will unlock 5 weeks after launch on December 9, 2026.`,
      "url": "https://foreverchanges.pro/patch-notes"
    },
    {
      "id": "news-63",
      "title": "Datamined October 28 Build: Mage Talent Tree Overhaul (Accelerant, Precision Hit All Spells, Incineration 5 Ranks, Arcane Focus Removed), Adventurer's Tent & Consumable Rebalances",
      "source": "ForeverChanges & Community Datamining",
      "sourceType": "blizzard",
      "author": "Systems Balance & Theorycraft Desk",
      "date": "October 28, 2026",
      "tag": "Class Balancing & Datamining",
      "summary": "Forensic telemetry from pre-launch client builds reveals substantial Mage talent reworks: Arcane Focus removed with Precision now granting spell hit to all schools, Improved Fireball reworked into Accelerant (cutting Arcane Wrath cast time), Incineration rescaled to 5 ranks, and Adventurer's Tent rested experience aura redesigned.",
      "content": `Datamined client files and server telemetry from the October 28 pre-launch build reveal sweeping adjustments to Mage specialization trees, camping consumables, and combat utilities ahead of worldwide launch:

• **Mage Talent Specialization Rework:**
  - **Accelerant (was Improved Fireball):** Reduces cast time of Fireball, Frostfire Bolt, and now also Arcane Wrath by 0.1 to 0.5 sec.
  - **Precision (was Elemental Precision):** Its 2/4/6% hit chance now covers all spell schools (not only Frost and Fire), unifying spell hit across Arcane, Fire, and Frost.
  - **Incineration Expanded:** Rescaled to 5 ranks (was 3), granting up to +10% critical strike chance for Fire Blast, Ice Lance, Arcane Blast, and Scorch (was 6%).
  - **Critical Mass Compressed:** Rescaled to 3 ranks (was 5), granting up to +6% critical strike chance for Fire spells (was 10%).
  - **Ice Lance Cooldown:** Now carries an 8-second cooldown (deals 200% increased damage to frozen targets).
  - **Arcane Focus Removed:** Removed from Tier 1 of the Arcane tree (spell hit unified under Precision in the Frost tree).
  - **Frost Blast Deprecated:** Removed from spellbook trainers (spell remains in client data for legacy compatibility).
  - **Talent Node Relocations:**
    • Improved Fire Blast moves from Row 1 Col 1 to Row 3 Col 4.
    • Arcane Resilience moves from Row 2 Col 4 to Row 1 Col 3.
    • Improved Channeling moves from Row 1 Col 3 to Row 1 Col 2.
    • Missile Barrage moves from Row 1 Col 4 to Row 2 Col 4.

• **Item & Consumable Rebalances:**
  - **Adventurer’s Tent (Item 288185):** Now builds a tent next to a Campfire that raises the Rested experience of you and nearby party members to 20% of a level (10 sec cast, 1 hour cooldown).
  - **Ultralight Goblin Glider (Item 260825):** Cooldown adjusted to 5 minutes (was 3 minutes).
  - **Elixir of Wisdom (Item 3383):** Provides +3 Intellect for 30 minutes (was +6 for 1 hour).
  - **Corrupted Gemstone (Item 277154):** Now requires Level 60.

• **October 28 Hotfix Telemetry:**
  - Aspect of the Hawk and Trueshot Aura ranged attack power reduced by ~50%.
  - Blood Fury 2-minute cooldown active in server data.
  - Entrapment, Counterattack, Improved Wing Clip, Improved Hamstring, and Frostbite share one diminishing returns group.
  - Paladins retain Righteous Fury at Level 10.`,
      "url": "https://foreverchanges.pro/patch-notes"
    },
    {
      "id": "news-62",
      "title": "Blizzard Premieres 'Planet Azeroth' Nature Mockumentary Starring Bill Bailey Ahead of Worldwide Launch",
      "source": "Blizzard Official / Media Spotlight",
      "sourceType": "blizzard",
      "author": "Blizzard Entertainment",
      "date": "October 28, 2026",
      "tag": "Media & Community",
      "summary": "Blizzard releases 'Planet Azeroth', a comedic three-part mockumentary hosted by British comedian Bill Bailey in classic wildlife documentary style, exploring original Azeroth's wildlands, murlocs, and fauna before the November 4 launch.",
      "content": `Blizzard Entertainment has unveiled *World of Warcraft: Planet Azeroth*, an official three-part comedic wildlife mockumentary created to celebrate the countdown to the November 4 global launch of *World of Warcraft: Forever*.

Narrated by celebrated British comedian and actor Bill Bailey appearing as a bearded Dwarven naturalist, the series adopts the earnest, dramatic tone of classic nature documentaries (such as *Planet Earth*) while exploring the perilous and quirky ecosystems of original 2004-era Azeroth.

**Series Highlights:**
• **Episode 1: The Grasslands of Elwynn & Durotar** — An intrepid exploration of indigenous kobold packs ("You no take candle"), territorial Defias thieves, and the solitary lifestyle of the Durotar mottled boar.
• **Episode 2: Beasts of the Barrens & Darkshore** — An observational study of migrating Kodo herds, aggressive Plainstriders, and stealthy Ghostpaw wolves stalking the foggy coasts.
• **Episode 3: The Depths of Stranglethorn & Wetlands** — Forensic analysis of Murloc tribal vocalizations (*"Aaaaaughibbrgubugbugrguburgle!"*), aggressive crocolisks, and the territorial rivalries of Stranglethorn raptors.

*World of Warcraft: Forever* launches globally on Wednesday, November 4, 2026.`,
      "url": "https://www.icy-veins.com/wow-forever/news/planet-azeroth-episode-1-wow-forever-nature-documentary-trailer/"
    },
    {
      "id": "news-60",
      "title": "Early Character Name Reservation Goes Live Across Regional Megarealms: Rulesets, Faction Locks & 3-Character Cap",
      "source": "Blizzard Official / Launch Operations",
      "sourceType": "blizzard",
      "author": "Blizzard Entertainment",
      "date": "October 27, 2026",
      "tag": "Launch Operations & Megarealms",
      "summary": "Early name reservation is officially live for Skyborne Heroic/Epic and Collector's Edition pre-orders. Players can reserve up to 3 character names per account across Normal, PvP, RP, and RP-PvP megaservers utilizing the region-wide first-and-last name architecture.",
      "content": `Early Character Name Reservation for *World of Warcraft: Forever* is now live worldwide! Eligible players who have pre-purchased the *Skyborne Heroic Pack*, *Skyborne Epic Pack*, or the *Warcraft Forever Collection* can log into the client, choose their ruleset, and lock in their names and character appearances ahead of launch.

**Key Reservation Guidelines:**
• **Reservation Cap:** You may reserve up to **3 character names** total per Battle.net account across all available rulesets.
• **First and Last Name Architecture:** Character creation requires a First Name and Last Name combination. The full combination is unique region-wide and locks out across all rulesets (Normal, PvP, RP, RP-PvP) within your region.
• **PvP Faction Restrictions:** In keeping with authentic classic design, players who create a character on a PvP or RP-PvP ruleset are restricted to choosing a single faction (Alliance or Horde) for all characters created on that ruleset.
• **Ruleset Lock:** Characters cannot be transferred between different rulesets at launch.
• **Reservation Window:** Live now through Tuesday, November 3, 2026 at 10:00 AM PST (18:00 UTC).

Global Launch officially takes place on Wednesday, November 4, 2026 at 3:00 PM PST.`,
      "url": "https://worldofwarcraft.blizzard.com/en-us/news"
    },
    {
      "id": "news-59",
      "title": "Community Manager Kaivax Shares Additional Racial Updates: Blood Fury Reduced to 2m, Berserking Extended to 15s & Touch of the Grave 15s ICD",
      "source": "Blizzard Official / Community Manager Blue Post",
      "sourceType": "blizzard",
      "author": "Community Manager Kaivax",
      "date": "October 27, 2026",
      "tag": "Racial Abilities & Traits",
      "summary": "Kaivax details follow-up adjustments to racial abilities: Orc Blood Fury cooldown reduced to 2 minutes, Troll Berserking duration buffed to 15 seconds, Undead Touch of the Grave internal cooldown slashed to 15 seconds, and clarification on Skyborne Charged and Attuned raid behavior.",
      "content": `We’ve updated the previous post in this thread with some additions that were intended to be listed.

Additional updates to Racial Abilities and Talents include:

• Orc:
  - Blood Fury’s cooldown reduced to 2 minutes (was 3 minutes).

• Troll:
  - Berserking duration increased to 15 seconds (was 10 seconds).

• Undead:
  - Touch of the Grave internal cooldown reduced to 15 seconds (was 25 seconds).

• Skyborne Clarification:
  - Charged persists through death, and is removed upon entering a raid.
  - Attuned persists through death, and is removed upon entering a raid.`,
      "url": "https://us.forums.blizzard.com/en/wow/t/2360696"
    },
    {
      "id": "news-58",
      "title": "WoW Forever Racials Overhaul: Community Manager Tuning Pass Prioritizes Racial Identity, Re-adds Orc Command & Introduces Dwarf Artisan's Precision",
      "source": "Blizzard Official / Community Manager Blue Post",
      "sourceType": "blizzard",
      "author": "Community Management & Systems Design",
      "date": "October 26, 2026",
      "tag": "Racial Abilities & Traits",
      "summary": "As WoW Forever approaches launch, a final tuning pass refines racial identities: Human Ruthless tuned to 1% crit and Spirit to 10%, Dwarf adds Artisan's Precision (+1% Hit), Tauren Plainsrunning overhauled to 2%/stack (max 60%), Orc re-adds Command (+5% pet damage), and Skyborne racials retuned.",
      "content": `As we approach the launch of WoW Forever, we've been reflecting on feedback we've heard on racial abilities and passive traits: Some players have expressed that some of the new racial traits feel too generic, while others have raised concerns that some are objectively stronger than others.

In taking a final pass on these, we've prioritized racial identity, which means that some races will naturally be slightly more effective than others at certain combat roles. In some places where we had replaced role- or class-focused racials with generic ones, we're rolling those changes back. One exception to this is the weapon specialization racials, like humans' Sword Specialization or orcs' Axe Specialization. While those have a strong fantasy component to them, it is not healthy in the long run for future raid and dungeon loot tables to be evaluated through the lens of "required" weapon types.

At the same time, we're doing a tuning pass on some of the remaining passive bonuses to help ensure that they aren't skewing outcomes in a way that limits player preferences.

• Human:
  - Ruthless now increases critical chance by 1% (was 2%).
  - Human Spirit now increases Spirit by 10% (was 5%).
• Dwarf:
  - Earth Fury (2% increased critical strike damage and healing) removed.
  - Added: Artisan's Precision - Increases hit chance with spells and attacks by 1%.
• Tauren:
  - Plainsrunning now grants 2% movement speed per stack (was 1%), for a total max increase of 60% (was 30%).
  - Plainsrunning no longer increases mounted movement speed.
  - Endurance no longer provides any modifiers beyond 5% increased Health (no hit chance or critical damage modifiers).
• Orc:
  - Savage removed (1% increased critical strike chance).
  - Command re-added, increasing Warlock and Hunter pet damage by 5%.
• Skyborne:
  - Wind-Blessed Haste bonus reduced to 2% (was 3%).
  - Read Leyline now increases Mana and Health regeneration by 50% (was 100%), with a 15-second duration. This ability cannot be used while Innervate is active, and will be replaced by Innervate as a more powerful effect.
  - Using Read Leyline at a Ley Line now also grants "Attuned" for 1 hour. While Attuned, the benefit of Read Leyline is increased to 100% regeneration increase. Attuned persists through death.
  - Skysight is now a 15% increased movement speed (was 10%), with a 15-second duration.
  - Using Skysight at an elemental convergence now also grants "Charged" for 1 hour. While Charged, the benefit of Skysight is a 30% movement speed increase. Charged persists through death.`,
      "url": "https://us.forums.blizzard.com/en/wow/t/2360696"
    },
    {
      "id": "news-57",
      "title": "WoW: Forever Closed Beta Ends with a 24-Hour Finale Celebration; All Characters Wiped",
      "source": "Warcraft Tavern",
      "sourceType": "tavern",
      "author": "Warcraft Tavern",
      "date": "October 23, 2026",
      "tag": "Beta Concluded",
      "summary": "The closed beta shut down at 10:00 AM PDT on October 23 after a 24-hour finale that filled the starting zones with beta-only bosses, NPCs and loot.",
      "content": `The WoW: Forever closed beta closed for good on Friday, October 23, 2026 at 10:00 AM PDT.

• **Finale:** For the final 24 hours, Blizzard pushed a beta-only update to the starting zones — Zephras Isle, Dun Morogh, Elwynn Forest, Teldrassil, Durotar, Tirisfal Glades and Mulgore — with new items, NPCs and bosses that will not appear in the live game.
• **Wipe:** All beta characters and progress were deleted ahead of launch.
• **Your stats:** Blizzard published a Beta recap page where testers could view stats from their time in the beta.
• **Next up:** Early name reservation on October 27, then launch on November 4.`,
      "url": "https://www.warcrafttavern.com/forever/news/shenanigans-are-ensuing-in-the-wow-forever-beta-finale-celebration/"
    },
    {
      "id": "news-56",
      "title": "Three Launch Raids Revealed for December 9: The Barrow Deeps, Hyjal Summit & Onyxia's Lair Attunement Details",
      "source": "Warcraft Tavern & Wowhead Raid Desks",
      "sourceType": "tavern",
      "author": "Raid Theorycraft & Blizzard Encounters Desk",
      "date": "October 20, 2026 (21:19 UTC)",
      "tag": "Raids & Endgame Milestones",
      "summary": "Blizzard officially reveals the trio of launch-window endgame raids unlocking on December 9: The Barrow Deeps (10-player, 8 bosses), Hyjal Summit (20-player, 13 bosses), and Onyxia's Lair (40-player) with full Drakefire Amulet attunements.",
      "content": `Blizzard and community data desks have officially unveiled the three launch-window raid instances unlocking on Wednesday, December 9, 2026 across all World of Warcraft: Forever live realms:
• 1. The Barrow Deeps (10-Player / 8 Bosses):
  - Situated deep within the subterranean roots of Mount Hyjal, with primary instance portals accessible via Blackmaw Hold and Winterspring barrows.
  - Lore anchors around the ancient subterranean prison of Illidan Stormrage, featuring 8 encounter chambers, night elf wardens, and twisted shadowsatyr lieutenants.
• 2. Hyjal Summit (20-Player / 13 Bosses):
  - Ascends the majestic peaks of Mount Hyjal directly surrounding Nordrassil, the World Tree.
  - Features 13 expansive raid bosses including demonic commanders of the Archimonde advance guard and primal elemental guardians.
• 3. Onyxia's Lair (40-Player / Dustwallow Marsh):
  - Re-tuned with classic high-tier mechanics, strict fire resistance thresholds, and revised Deep Breath threat dynamics.
  - Requires completing the classic dual-faction Drakefire Amulet attunement questlines across Alliance and Horde.
• Winter 2026 & Hardcore Launch:
  - Following the December 9 raid unlock, the official WoW: Forever Hardcore ruleset is scheduled to deploy in late Winter 2026.`,
      "url": "https://www.warcrafttavern.com/forever/news/three-new-raids-coming-to-world-of-warcraft-forever/"
    },
    {
      "id": "news-55",
      "title": "October 20 Hotfix Telemetry: Mage Frost Tree Reshuffled (Piercing Ice Removed, Elemental Precision Buffed to 2%/Rank), Paladin Champion of the Light Reverted",
      "source": "ForeverChanges & Community Theorycraft Desks",
      "sourceType": "blizzard",
      "author": "Systems Balance & Datamining Desk",
      "date": "October 20, 2026",
      "tag": "Class Balancing & Hotfixes",
      "summary": "Undocumented hotfixes deployed on October 18-20 adjust class kits: Mage Frost tree removes Piercing Ice with 10% absorb boost on Ice Barrier, Elemental Precision compressed into 3 ranks of 2% hit, and Paladin Champion of the Light restored to 20/40/60% Intellect scaling.",
      "content": `Community telemetry and forensic client diffs have cataloged live server hotfixes deployed between October 16 and October 20:
• Mage Frost Specialization Reshuffle:
  - Piercing Ice Removed: Flat +2/4/6% Frost damage removed from Frost Tier 3.
  - Elemental Precision Buffed: Compressed from 5 ranks (1% each) to 3 ranks granting 2% spell hit each (up to 6% hit for 3 talent points).
  - Ice Barrier & Frost Ward Enhanced: Rank 1 Ice Barrier absorb increased to 493 (was 448) and grants +3% Frost damage for 1 min (+3% more while shield holds). Frost Ward absorbs 178 + 10% spell power.
  - Frost Warding Redesigned: Increases Ice Barrier & Frost Ward absorb by 10/20%, and Frost Ward negates instead of reflecting incoming frost effects.
  - Frost Channeling (col 1) and Improved Blizzard (col 2) repositioned on Tier 3.
  - Missile Barrage: Frost Blast added as a valid trigger alongside Fireball, Frostbolt, and Frostfire Bolt.
• Paladin Champion of the Light Restored:
  - Champion of the Light restored to 20/40/60% Intellect-to-spell-damage scaling (reverting the temporary 10/20/30% reduction from Build 70425).
• Priest Holy Fire Tuning:
  - Holy Fire Rank 1 base damage tuned to 53–65 (was 57–70) for smoother early-game bracket balance.`,
      "url": "https://foreverchanges.pro/buffs-and-nerfs"
    },
    {
      "id": "news-54",
      "title": "Closed Beta Extended Through Friday, October 23 at 10:00 AM PDT; Name Reservations Open October 27",
      "source": "Blizzard Official",
      "sourceType": "blizzard",
      "author": "Blizzard Entertainment",
      "date": "October 21, 2026",
      "tag": "Beta Schedule",
      "summary": "Blizzard extended the WoW: Forever closed beta so it now closes Friday, October 23 at 10:00 AM PDT, and announced early character name reservations for October 27.",
      "content": `Blizzard announced on X that the closed beta would stay open longer than planned:

• **New end time:** Friday, October 23 at 10:00 AM PDT (1:00 PM EDT / 6:00 PM BST).
• **Name reservation:** Early character name reservation opens October 27 and runs until November 3, ahead of the November 4 launch.`,
      "url": "https://www.techradar.com/gaming/good-news-for-world-of-warcraft-forever-players-blizzard-has-extended-the-beta-and-is-opening-wow-name-reservations-ahead-of-the-games-november-launch"
    },
    {
      "id": "news-52",
      "title": "Warlockguy Wins The Forever Open 1v1 Dueling Tournament; Warlocks Take First and Second",
      "source": "Warcraft Tavern",
      "sourceType": "tavern",
      "author": "Warcraft Tavern",
      "date": "October 19, 2026",
      "tag": "Esports & PvP",
      "url": "https://www.warcrafttavern.com/forever/news/warlockguy-wins-the-wow-forever-open-1v1-dueling-tournament/",
      "summary": "Warlockguy won The Forever Open, the community 1v1 dueling tournament held on the WoW: Forever beta, taking the $50,000 grand prize after a best-of-five final against fellow Warlock Neepzen.",
      "content": `The Forever Open — a community-run 1v1 dueling tournament played on the WoW: Forever beta — wrapped up on October 19, 2026.

• **Champion:** Warlockguy (Warlock) won the $50,000 grand prize in a best-of-five final.
• **Runner-up:** Neepzen (Warlock), who also took the Warlock class prize.
• **Class prizes ($5,555 each):** Minpojke (Druid), Fvp (Hunter), Azzu (Paladin), Nieze (Priest), Justwoo (Rogue), Cdew (Shaman), Mag (Warrior). The Mage prize ended in a four-way tie between Allyana, Teleporter, Venruk and Yonezka.
• The event began with a $50,000 prize pool that later grew to roughly $100,000 in total. It drew thousands of sign-ups, and its consumable-heavy ruleset was debated by well-known PvP players during the event.
• Full results are posted on the Raider.IO tournament page.`
    },
    {
      "id": "news-50",
      "title": "Client Engine Build 1.60.1.70450 Deployed: Stability & Crash Hotfix, All Level 30 Talents & BiS Data 100% Unchanged",
      "source": "Blizzard Entertainment & Community Reverse-Engineering",
      "sourceType": "blizzard",
      "author": "Kaivax & Systems Engineering Desk",
      "date": "October 16, 2026",
      "tag": "Client Patch & Stability",
      "summary": "Blizzard deployed client hotfix build 1.60.1.70450 addressing memory leaks, ray-traced shadow crashes, and input buffering on modern GPUs. Zero game data, talent nodes, or item tables were altered.",
      "content": `Blizzard pushed client executable hotfix build 1.60.1.70450 to the Battle.net launcher on Friday evening. Community reverse-engineers and our data desk immediately performed a full DBC and memory diff:
• Client Stability & Crash Mitigations Only:
  - Fixed an unhandled exception crash when DirectX 12 ray-traced shadows interacted with dense water geometry in Wetlands and Alterac Mountains.
  - Resolved an engine memory leak affecting high-refresh-rate displays during rapid cross-zone flight master transitions.
  - Input buffering and spell queue latency smoothed on high-polling-rate gaming mice (2000Hz+).
• Zero DBC or Game Balancing Alterations:
  - Binary diff confirmed 0 changes to spells, talent nodes, base attributes, or dungeon boss encounter scripts.
  - All Phase 2 Level 30 talent trees, racial rebalances, and curated Level 30 BiS datasets compiled under Beta Build 1.60.1.70425 remain 100% accurate and authoritatively valid.`,
      "url": "https://wowforevertools.com/news/beta-build-70450-stability-hotfix/"
    },
    {
      "id": "news-46",
      "title": "In-Game Companion Addon Suite Maintenance Update: ForeverPlates v2.1.1, ForeverLiquid v1.3.1 & ForeverDungeonJournal v1.6.2 Released",
      "source": "WoW Forever Portal — Addon Suite",
      "sourceType": "custom",
      "author": "Lead UI Architect Exehn & Marcus",
      "date": "October 16, 2026",
      "tag": "Addon Development & UI Tools",
      "summary": "Maintenance update for the official companion addon suite rolling out for Camelot 12.0 engine and TOC 16001 standards, delivering combat nameplate stability, rested XP velocity calibration, and modularized dungeon journal maps.",
      "content": `A synchronized maintenance update has been packaged and published for the official WoW Forever companion addon suite:
• ForeverPlates (v2.1.1):
  - Calibrated unit nameplate anchoring to prevent micro-stutter during high-density AoE trash packs in Excavation Site: Wetlands and City of Dalaran.
  - Refined threat boundary coloring and off-screen clamping vectors.
• Foreverplatescastbars (v2.2.1):
  - Fixed sub-pixel castbar border clipping and aligned target spell icons with classic 1px borders.
• ForeverLiquid (v1.3.1):
  - Updated the Obsidian Drawer rested XP projection curve for Level 20–30 leveling velocity.
  - Mount Savings Fund countdown updated to track 100g and 1000g milestone targets simultaneously.
• ForeverDungeonJournal (v1.6.2):
  - Verified modular 64-file architecture with TOC 16001 compatibility for the Camelot 12.0 client engine.
  - Updated sub-pixel map coordinates for the Dalaran Underbelly entrance and Relic Guardian encounter in Excavation Site: Wetlands.
• Compliance & Verification:
  - 100% pass on all 120 automated TOC, Lua syntax, and FrameXML integrity audits, ensuring zero combat taint under 12.0 secret value constraints.`,
      "url": ""
    },
    {
      "id": "news-45",
      "title": "Beta Development Notes (Oct 16): Weapon-Skill Racials Replaced, Tauren & Skyborne Reworked, 0.5s Wand Windup",
      "source": "Blizzard Official Forums",
      "sourceType": "blizzard",
      "author": "Kaivax (Community Manager)",
      "date": "October 16, 2026",
      "tag": "Development Notes",
      "summary": "A sweeping racial pass: Human Sword Specialization became Ruthless, Dwarf Mace Specialization became Earth Fury, Orc Axe Specialization became Savage, and Tauren, Troll, Gnome and Skyborne racials were retuned.",
      "content": `Highlights from the October 16, 2026 development-notes update:

• **Weapon-skill racials replaced:** Human *Sword Specialization* → *Ruthless* (+2% crit). Dwarf *Mace Specialization* → *Earth Fury* (+2% crit damage and healing). Orc *Axe Specialization* → *Savage* (+1% crit).
• **Orc:** *Blood Fury* cooldown raised to 3 min (was 2). *Shatter Curse* reduces magic damage taken by 5% (was 15%).
• **Tauren:** *Endurance* now +2% crit damage/healing (was 1% hit). *Cultivation* cooldown 15 min (was 60). *War Stomp* 90 sec (was 2 min).
• **Others:** Troll *Regeneration* 20% (was 10%). Gnome *Eureka!* became an 8-second buff. Night Elf *Quickness* now stacks with other speed effects. Skyborne *Wind Blessed* haste 3% (was 1%) and *Walk on Air* 90 sec cooldown.
• **Ranged:** Wands and Auto Shot now need 0.5 sec of standing still before firing.

Several of these were walked back in the October 26 racial pass.`,
      "url": "https://us.forums.blizzard.com/en/wow/t/2360696"
    },
    {
      "id": "news-44",
      "title": "Open Stress Test Set for October 21; Closed Beta Closes October 23",
      "source": "Warcraft Tavern",
      "sourceType": "tavern",
      "author": "Warcraft Tavern",
      "date": "October 20, 2026",
      "tag": "Beta Schedule",
      "summary": "Any WoW account can join a four-hour stress test on October 21 on the launch hardware; the closed beta returns afterwards and shuts down for good on October 23 at 10:00 AM PDT.",
      "content": `Blizzard set the final pre-launch test schedule:

• **Stress test:** October 21 from 2:00 PM PDT for about four hours, running on the regional hardware planned for launch. Any player with a WoW account could join — no subscription required.
• The closed beta went offline during the stress test, and stress-test characters were deleted afterwards.
• **Beta end:** The beta came back for a few more days and closed at 10:00 AM PDT on Friday, October 23. All characters and progress were wiped before launch.`,
      "url": "https://www.warcrafttavern.com/forever/news/wow-forever-stress-test-times-beta-end-date-announced/"
    },
    {
      "id": "news-36",
      "title": "Beta Development Notes (Oct 8): Dungeon Creature XP +20%, Classic-Style Party XP & 16 Legacy Points for All Testers",
      "source": "Blizzard Official Forums",
      "sourceType": "blizzard",
      "author": "Kaivax (Community Manager)",
      "date": "October 8, 2026",
      "tag": "Development Notes",
      "summary": "Creature XP in dungeons raised about 20%, party XP reverted to the Classic Era formula, and every beta tester granted the Legacy Challenge (16 Legacy Points).",
      "content": `Highlights from the October 8, 2026 development-notes update:

• **Dungeon XP:** Creature experience inside dungeons increased by roughly 20%.
• **Party XP:** Reverted to the Classic Era calculation, where only each player's own level matters — fixing mixed-level groups earning very little per kill.
• **Legacy:** The Legacy Challenge was granted to all beta players (16 Legacy Points). Legacy respecs cost 1 silver, with the price dropping by one respec per hour.
• **Rage:** Rage gained from damage taken was rebalanced.`,
      "url": "https://us.forums.blizzard.com/en/wow/t/2360696"
    },
    {
      "id": "news-35",
      "title": "Companion Addon Suite Expansion: ForeverLiquid (Liquid XP/Rep/Ledger HUD) & ForeverDungeonJournal v1.0.7 Released for Beta",
      "source": "WoW Forever Portal — Addon Suite",
      "sourceType": "custom",
      "author": "Lead UI Architect Exehn & Marcus",
      "date": "October 5, 2026",
      "tag": "Addon Development & UI Tools",
      "summary": "Official release of ForeverLiquid v1.3.0 featuring a 20-bubble Classic liquid reservoir HUD, 6 selectable cyberpunk themes, real-time gold cashflow ledger, mount savings fund countdown, and Blizzard 5/hr lockout monitor alongside the modular ForeverDungeonJournal v1.0.7 with 5 dungeon routes & boss tactics.",
      "content": `A major companion addon expansion has arrived for WoW Forever Beta Phase 2 players with the release of ForeverLiquid v1.3.0 and the modular ForeverDungeonJournal v1.0.7:
• ForeverLiquid (v1.3.0): The ultimate cyberpunk liquid HUD engineered specifically for WoW Forever (Camelot 12.0 engine, TOC 16001). Features include:
  - Classic 20-Bubble (5%) Liquid Reservoir: Fluid status bar with animated wave shimmer, rested XP overlay, and glowing 5% divider ticks.
  - 6 Selectable Cyberpunk Themes: Matrix (Emerald), Cyber Void (Violet), Sunwell Core (Gold), Blood Knight (Crimson), Glacial Frost (Cyan), Carbon Minimal (Titanium).
  - Obsidian Drawer (4 Tabs): Live Leveling/Rep Velocity, Mount Savings Fund Tracker (100g/1000g goals with live ETA countdown), Cashflow Ledger (Gross Income vs Repairs/Flight/Vendor expenses), Recent Loot Feed, Blizzard 5-Instance/Hour Lockout Monitor, and Alt Roster 2.0 with dynamic offline rested XP prediction.
  - Camelot 12.0 Engine Guard: Completely eliminates the 12.0 FrameXML <secret number> comparison bug in TextStatusBar.lua:110 via recursive tree guarding and CharacterMicroButton delegation.
• ForeverDungeonJournal (v1.0.7 / v1.3.0 Architecture): Fully modularized into specialized runtime components, adding full boss tactics, spell IDs, role-specific guidance (Tank/Healer/DPS), announcement macros, and cross-faction travel routes for all 5 leveling dungeons (Deadmines, Wailing Caverns, Shadowfang Keep, Blackfathom Deeps, The Stockade) alongside Excavation Site: Wetlands, City of Dalaran, Hall of Thanes, and Ruins of Lordaeron.`,
      "url": ""
    },
    {
      "id": "news-32",
      "title": "Beta Phase 2 Begins October 1: Level Cap Raised to 30, Excavation Site: Wetlands, Razorfen Downs & Uldaman",
      "source": "Blizzard Official Forums",
      "sourceType": "blizzard",
      "author": "Kaivax (Community Manager)",
      "date": "October 1, 2026",
      "tag": "Beta Phase 2",
      "summary": "Following maintenance on October 1, the beta level cap rose to 30 and the new dungeon Excavation Site: Wetlands opened alongside Razorfen Downs and Uldaman.",
      "content": `Beta Phase 2 went live with the October 1, 2026 maintenance (European testers saw realms return early on October 2):

• **Level cap:** Raised to 30.
• **Dungeons:** New *Excavation Site: Wetlands* (26–31) added; Razorfen Downs (25+) and Uldaman (30+) opened for testing.
• **Experience:** Dungeon quests now grant 50% less bonus experience beyond normal quest values.
• **PvP:** Honor costs for PvP gear raised ~50%; Honor cap raised from 15,000 to 25,000.
• **Classes:** Feral Druid and Warrior talent trees reworked. *Hot Streak* renamed *Heating Up*; *Combustion* returned to 3 charges (was 4).`,
      "url": "https://us.forums.blizzard.com/en/wow/t/2360696"
    },
    {
      "id": "news-19",
      "title": "Beta Development Notes (Sept 24): Racial Fixes, Hot Streak & Wake of Fire Durations, 1-Silver Talent Respecs",
      "source": "Blizzard Official Forums",
      "sourceType": "blizzard",
      "author": "Kaivax (Community Manager)",
      "date": "September 24, 2026",
      "tag": "Development Notes",
      "summary": "Kaivax's first beta development-notes update: Gnome Eureka! reworked, Touch of the Grave no longer breaks crowd control, Hot Streak and Wake of Fire last longer, and talent respecs cost 1 silver for the beta.",
      "content": `Highlights from the September 24, 2026 update to the WoW Forever Beta Development Notes:

• **Racials:** Gnome *Eureka!* became a 10% discount on Mana, Rage or Energy abilities. Tauren *Cultivation* now has a level requirement per herb. Undead *Touch of the Grave* no longer breaks crowd control and no longer triggers from spells without a damage component.
• **Durations:** *Wake of Fire* raised to 30 sec (was 20). *Hot Streak* raised to 20 sec (was 15).
• **Cooldowns:** Paladin *Holy Strike* lowered to 10 sec (was 12). Warrior *Slam* raised to 18 sec (was 15).
• **Beta QoL:** Talent respecs temporarily cost 1 silver. Gamepad flyouts and options were added.`,
      "url": "https://us.forums.blizzard.com/en/wow/t/2360696"
    },
    {
      "id": "news-20",
      "title": "Brewfest 2026 Hits Classic+ Beta: Festival Camps, Ram Racing & Level 20 Festivities Live",
      "source": "Wowhead / Community Playtest",
      "sourceType": "wowhead",
      "author": "Wowhead News Team",
      "date": "September 22, 2026",
      "tag": "World Events",
      "summary": "Brewfest officially opens outside Ironforge and Orgrimmar, featuring keg delivery runs, Ram Racing, Wolpertinger pets, and festival grounds adapted for Level 20 beta characters.",
      "content": `Following the conclusion of Pirates' Day on September 20, the annual Brewfest celebration is now fully active across all WoW Forever beta megarealms from September 20 through October 6:
• Festival Grounds: Alliance players can visit the festival grounds outside the gates of Ironforge, while Horde players celebrate outside Orgrimmar in Durotar.
• Ram Racing & Barking: Daily quests for Barking for Brewfest and keg courier runs with rental rams are fully testable, rewarding Brewfest Prize Tokens.
• Collectibles & Toys: Beta testers are farming tokens for the Wolpertinger pet, Brewfest Steins, and seasonal holiday clothing.
• Level 20 Scaling Discussions: Blizzard is monitoring whether special holiday encounter scaling will be enabled for Coren Direbrew or if high-level boss drops will remain locked until Phase 2/3.`,
      "url": "https://www.wowhead.com/forever/news"
    },
    {
      "id": "news-16",
      "title": "Beta Weekend Surge: Aggrend Reports Record Turnout as Rolling Megarealm Restarts & EU Routing Deploy",
      "source": "Blizzard Official / GamesRadar",
      "sourceType": "blizzard",
      "author": "Lead Designer Josh \"Aggrend\" Greenfield",
      "date": "September 21, 2026",
      "tag": "Beta Operations",
      "summary": "Aggrend reports player turnout has been the \"craziest in 17 years at Blizzard\" as engineering teams deploy rolling restarts to stabilize megarealms and release EU cross-region latency routing.",
      "content": `Following the first weekend of the World of Warcraft: Forever closed beta, lead producer and designer Josh "Aggrend" Greenfield addressed the community regarding unprecedented participation numbers:
• "Craziest Turnout in 17 Years": Aggrend confirmed that player concurrency and login volume shattered all internal forecasts, creating heavy demand on the realmless megarealm infrastructure.
• Rolling Server Restarts: Blizzard operations deployed rolling server restarts on September 21 (including quick 15-minute maintenance windows) to recalibrate dynamic sharding boundaries, flush memory caches, and relieve congestion in starting hubs.
• EU Routing Optimization: A dedicated blue post confirmed European routing enhancements, optimizing network packet flow for EU players connecting to North American beta megarealms with reduced latency and packet drop.
• Test Window Progression: Phase 1 continues with the Level 20 cap until October 1, when Phase 2 raises the cap to 30.`,
      "url": "https://www.gamesradar.com/games/world-of-warcraft/the-craziest-numbers-ive-seen-in-17-years-working-at-blizzard-wow-forever-devs-seem-genuinely-shocked-the-beta-is-so-popular-as-they-explain-why-their-mmo-servers-keep-breaking/"
    },
    {
      "id": "news-12",
      "title": "Inventory Quality of Life: Reagent-Free Spells & 50% Longer Raid Buffs Confirmed",
      "source": "Blizzard Official",
      "sourceType": "blizzard",
      "author": "Lead Systems Designer",
      "date": "September 18, 2026",
      "tag": "Quality of Life",
      "summary": "Vendor-bought reagents are removed from class abilities, and long-duration stat buffs (Fortitude, Divine Spirit, Arcane Intellect, Mark of the Wild) last 1 hour instead of 30 minutes.",
      "content": `Blizzard has announced two massive quality-of-life changes arriving in WoW: Forever:
• Reagent-Free Class Abilities: Abilities that historically required vendor-bought reagents no longer require them. Shamans cast Reincarnation without Ankhs; Warlocks don't need bags clogged with 28 Soul Shards; Rogues use Blind and Vanish without buying powder; Paladins buff without Symbols of Kings; Druids rebirth without seeds; Mages and Priests cast without feathers, runes, or fish oil.
• 50% Longer Buff Durations: All long-duration group and raid buffs (Arcane Intellect, Mark of the Wild, Power Word: Fortitude, Class Blessings) now last 1 hour instead of 30 minutes, so groups refresh them far less often.`,
      "url": "https://worldofwarcraft.blizzard.com/en-us/news"
    },
    {
      "id": "news-14",
      "title": "Game Editions & Pricing: Included with a WoW Subscription; Skyborne Requires a Pack",
      "source": "Warcraft Tavern",
      "sourceType": "tavern",
      "author": "Warcraft Tavern",
      "date": "September 12, 2026",
      "tag": "Editions",
      "summary": "WoW: Forever is included with any WoW subscription or Game Time. The Skyborne race needs the Skyborne Heroic Pack ($29.99) or higher; guaranteed beta access came with the Epic Pack ($59.99) and Warcraft Forever Collection ($79.99).",
      "content": `Edition breakdown announced alongside the BlizzCon reveal:

• **Base game:** Included with an active WoW subscription or Game Time (PC and Mac).
• **Skyborne Heroic Pack ($29.99):** Unlocks the Skyborne race and the Zephras Isle starting experience. No beta access.
• **Skyborne Epic Pack ($59.99):** Everything in Heroic plus guaranteed beta access.
• **Warcraft Forever Collection ($79.99):** Top digital tier, including guaranteed beta access. Available in the Battle.net Shop until January 11, 2027.`,
      "url": "https://www.warcrafttavern.com/forever/news/world-of-warcraft-forever-editions-skyborne-race-unlock-beta-access/"
    },
    {
      "id": "news-11",
      "title": "WoW: Forever Closed Beta Opens September 17 with a Level 20 Cap",
      "source": "Blizzard Official",
      "sourceType": "blizzard",
      "author": "Blizzard Entertainment",
      "date": "September 17, 2026",
      "tag": "Beta Schedule",
      "summary": "The closed beta opened September 17 with a Level 20 cap, Hall of Thanes and Ruins of Lordaeron as the new dungeons, and the Skyborne starting zone on Zephras Isle.",
      "content": `The WoW: Forever closed beta opened on September 17, 2026, five days after the BlizzCon reveal.

• **Phase 1 (Sept 17 – Oct 1):** Level 20 cap. New dungeons Hall of Thanes (13–18) and Ruins of Lordaeron (15–20) were available to test.
• **Phase 2 (from Oct 1):** Level cap raised to 30 (see the October 1 entry).
• **Access:** Guaranteed beta access came with the Skyborne Epic Pack and Warcraft Forever Collection; additional invites went out in waves.
• The beta ultimately closed on October 23 at 10:00 AM PDT after a short extension.`,
      "url": "https://warcraft.wiki.gg/wiki/World_of_Warcraft:_Forever"
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
      "content": `Here is the master summary of everything Blizzard has confirmed for WoW: Forever:
• Launch: November 4, 2026. Permanent level 60 cap with horizontal progression and 1,000+ new quests.
• No Server Barriers: Choose a Ruleset (PvE, PvP, Roleplay, or Hardcore in late winter). No dead servers.
• Quality of Life: Dual Talent Specialization at Level 40, Barbershop (hair, beard, skin color), In-game Damage Meter, Retail Ping System, and Native Controller Support right out of the gate.
• Economy & Integrity: NO WoW Tokens. NO character level boosts. Guild banks ready on Day 1.
• World Buff Overhaul: World buffs function out in the open world, but are disabled inside raids. No Chronoboons or 2-hour pre-buff routes required!
• Dungeon XP vs Open World: Dungeon mob XP is drastically lowered to kill dungeon spamming. First-time dungeon quests yield massive rewards, with repeatable weekly boss 'chase drops' to keep dungeons exciting.
• Raids at Launch: Molten Core is replaced by Barrow Deeps (10-man) and Hyjal Summit (20-man), alongside Onyxia's Lair.`,
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
      "summary": "Blizzard built its own ray-traced global illumination for Forever and added an SD/HD character model choice. Ray-traced shadows were pulled during the beta to return later, and minimum GPU requirements rose.",
      "content": `World of Warcraft: Forever upgrades the classic world with a modernized graphics engine while preserving the 2004 aesthetic soul:
• Custom Ray-Traced Global Illumination: Real-time environmental lighting and shifting mountain shadows based on sun height without requiring high-end DXR cards.
• Atmospheric Enhancements: Volumetric ground fog, extended draw distance (bye-bye flat fog wall), and fluid water foam physics in Elwynn and Loch Modan.
• Visual Freedom Toggles: In System Options, players can freely toggle between 'Classic 2004 Visuals' and 'Forever Ray-Traced Modern', as well as mix-and-match SD character models with modern spell effects or HD models with classic animations!
• SSD Requirement: A Solid State Drive is mandatory for seamless asset streaming.`,
      "url": "https://worldofwarcraft.blizzard.com/en-us/news"
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
      "content": `Blizzard has taken a firm stance on addon bloat in WoW: Forever:
• In-Combat Disarmament: Addons that perform complex combat calculations, auto-assign raid markers, decipher encrypted boss telegraphs, or auto-cleanse debuffs will have their Lua APIs restricted during encounter combat.
• Built-In Replacements: To ensure a clean experience, Blizzard built native tools directly into the UI: an in-game Damage/Healing meter, cooldown trackers, modern raid frames, and the retail Ping wheel.
• Permitted Addons: Standard UI skinning, bag reorganizers, auction house helpers, and chat mods continue to function normally outside and inside combat.`,
      "url": "https://www.method.gg/news/addon-disarmament-wow-forever"
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
      "content": `Blizzard has completely redone racial abilities for World of Warcraft: Forever:
• Human: The old +5 Sword/Mace skill is gone, replaced by 'Diplomatic Resolve' (+Spirit, +Reputation, and +Expertise rating regardless of weapon type).
• Undead: Paladins unlock a unique custom spectral warhorse mount ('Forsaken Charger'), while Will of the Forsaken and Cannibalize receive updated visual animations.
• Dwarf: Wildhammer shamans gain 'Earthen Resilience', while Stoneform now scales with Stamina.
• Gnome: 'Expansive Mind' now grants +5% Intellect AND +3% Spell Critical Strike chance.
• Orc: Blood Fury no longer inflicts a healing debuff, granting +Spell Damage alongside Attack Power.
• Troll: Berserking has been normalized to a flat haste bonus that scales gracefully without requiring 1% health gaming.
• Skyborne: Features 'Gale Step' (10-yard forward dash clearing roots), 'Windborne Grace' (slow fall), and 'Zephyr Attunement' (+Nature/Arcane res).`,
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
      "content": `In WoW Forever, gear itemization has undergone a comprehensive renaissance:
1. Expertise System: Weapon skill bonuses from gear (like Edgemaster's Handguards) now grant universal Expertise Rating, allowing any race to wield any weapon class effectively.
2. Unified Spell Power: 'Healing Spells' and 'Damage Spells' have been merged into unified Spell Power on pre-60 items, revitalizing hybrid leveling.
3. Every Boss Has Chase Drops: Every dungeon and raid boss drops rare, specialized utility items or crafting blueprints, guaranteeing long-term replay value.`,
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
      "content": `Content creator MrGM shared exclusive footage of World of Warcraft: Forever's accessibility and UI modernizations:
• Ping System: Pressing the ping hotkey brings up the radial wheel (Attack, Assist, On My Way, Danger) that places real-time 3D markers in the game world and minimap.
• Native Controller Support: Full plug-and-play Xbox, PlayStation, and Steam Deck controller keybinding layout right from character creation.
• Built-in Damage & Healing Meter: Blizzard has integrated an official, lightweight combat log parser into the default interface.
• Discord Integration: Connects directly with Discord to display party status, rich presence, and voice channel overlays.`,
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
      "content": `Dual Talent Specialization is officially confirmed for World of Warcraft: Forever!
• Availability: Unlocks at Level 40 from your class trainer for a reasonable one-time gold fee.
• Swap Mechanics: Switch specs in any rest area or while resting at a player campfire.
• Hybrid Viability: Makes switching between Tank/DPS (Paladins, Warriors, Druids) and Healer/DPS (Priests, Shamans, Paladins) effortless without paying 50g per respec.
• Revamped Trees: Full 31-point cap trees reimagined with new defensive passives, mana sustain talents, and hybrid scaling.`,
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
      "content": `The Legacy System provides permanent horizontal account value:
• 16 Points at Launch: Earned through leveling alts, completing zone storylines, mastering professions, exploration milestones, and PvP ranks.
• Three Perk Trees:
  1. Professions: Yield bonuses, skill book discovery rates, reduced failure chances on engineering.
  2. Adventure: Rested XP accumulation speed (+25%), flight path travel speed (+15%), rare mob tracking.
  3. Resourcefulness: Vendor repair discounts, +2 bank bag slots, campfire duration extension.
• Points are shared account-wide, but each character customizes their allocation independently.`,
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
      "content": `Key design pillars detailed by the game directors:
1. No World Buffs in Raids: Rallying Cry of the Dragonslayer, Fengus' Ferocity, and Songflower work exclusively OUTSIDE of raid instances. You no longer need to spend 2 hours gathering buffs or fear dying and losing damage.
2. Anti-Dungeon Boosting: Mob kill XP inside instances is significantly lower. Players are incentivized to quest through the 1,000+ new quests in revamped zones.
3. Meeting Stones as LFG Hubs: Meeting stones do not summon players (preserving travel immersion), but clicking them opens the built-in LFG tool to find or form a group.
4. Stormwind Harbor: The harbor has been backported, providing a direct ferry route to Darkshore and Auberdine, ending the painful 30-minute swim or Menethil run for low-level night elves and humans.
5. Gathering Skill Books: Discoverable skill tomes drop from world quests and rare mobs that permanently grant +5 to +15 skill in Mining, Herbalism, and Skinning.`,
      "url": "https://worldofwarcraft.blizzard.com/en-us/news"
    }
  ],
  "gameplayRulesAndQoL": [
    {
      "id": "no-worldbuff-raids",
      "title": "No World Buffs in Raids",
      "icon": "⚡",
      "badge": "Raid Integrity",
      "desc": "World buffs work out in the open world but have no effect inside raid instances, so there is no pre-raid world-buff routing."
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
      "desc": "Unlocked at Level 40 from your class trainer for 50 gold. Swap specs any time outside combat and battlegrounds; each spec's respec fee slowly drops toward 1 gold over time."
    },
    {
      "id": "anti-dungeon-spam",
      "title": "Anti-Dungeon Spam XP",
      "icon": "📜",
      "badge": "World Questing",
      "desc": "Forever is tuned around open-world questing. Dungeon quests grant less bonus XP than in the beta, but dungeon kill XP has been raised twice (about +20% on Oct 8, then +50% on Nov 9)."
    },
    {
      "id": "in-combat-disarmament",
      "title": "In-Combat Addon Disarmament & Native UI Suite",
      "icon": "🛡️",
      "badge": "Skill & Execution",
      "desc": "Computational WeakAuras and solver addons are disabled in combat due to 12.0 secret value restrictions. Blizzard provides native replacements directly in the UI & Edit Mode: an in-game Damage/Healing meter, modern raid frames, and the newly expanded Native Cooldown Manager for tracking rotational spells, defensives, and buff procs with zero UI taint."
    },
    {
      "id": "rank14-seasonal",
      "title": "Seasonal Rank 14 Track",
      "icon": "⚔️",
      "badge": "Healthy PvP",
      "desc": "Rank Points no longer decay: Rank 14 needs 24,750 total Rank Points, with a weekly cap that makes it reachable from week 10 of a season. Honor is a separate currency for gear (cap 25,000)."
    },
    {
      "id": "hardcore-transfer",
      "title": "Hardcore & Mortal Safety Net",
      "icon": "💀",
      "badge": "Winter Ruleset",
      "desc": "A permadeath Hardcore ruleset is confirmed for winter 2026/27. Blizzard has not yet published its full rules."
    },
    {
      "id": "ray-tracing-graphics",
      "title": "Custom Ray-Tracing Engine",
      "icon": "✨",
      "badge": "Visual Overhaul",
      "desc": "Blizzard's own ray-traced global illumination relights Azeroth. Choose SD (Classic) or HD character models, both using Classic animations. Ray-traced shadows were pulled during the beta to return later."
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
      "title": "Reagent Economy (Legacy Perk)",
      "icon": "🎒",
      "badge": "Bag Space Overhaul",
      "desc": "The Reagent Economy Legacy perk makes your class abilities stop requiring vendor-bought reagents (Ankhs, Flash Powder, Symbols of Kings, Teleport Runes and similar)."
    },
    {
      "id": "buff-duration-50",
      "title": "Longer Group Buffs",
      "icon": "⏳",
      "badge": "Group Quality of Life",
      "desc": "Power Word: Fortitude and Arcane Intellect now last 1 hour. The Permanence Legacy perk makes long party/raid buffs last up to 100% longer and camp resting benefits 50% longer."
    },
    {
      "id": "profession-passives",
      "title": "Profession Camp Objects",
      "icon": "⚒️",
      "badge": "Tradeskill Power",
      "desc": "At skill 20 every profession unlocks a camp object that buffs everyone sitting at your campfire: Lodestone (Attack Power), Incense Candle (Intellect), Camp Chair (+2% crit), Fish Bowl (+8% stats) and more."
    },
    {
      "id": "legacy-cosmetics-track",
      "title": "65-Point Legacy Cosmetics Track",
      "icon": "🏆",
      "badge": "Account Progression",
      "desc": "Allocate 16 points per character into talent trees, while earning up to 65 total Legacy Points on your account to unlock exclusive heritage mounts, tabards, and pets."
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
        "Full access to all 6 new classic race/class combinations",
        "Permanent horizontal progression & realmless rulesets",
        "Zero token / zero paid boost environment"
      ]
    },
    "heroicPack": {
      "name": "Skyborne Heroic Pack",
      "badge": "Digital Expansion",
      "cost": "$29.99 USD",
      "description": "Expansion pack unlocking the playable Skyborne race, Zephras Isle starting zone, exclusive mount, and cosmetic transmog set.",
      "perks": [
        "Playable Skyborne race: Alliance-aligned High Order and Horde-aligned Windshapers (Levels 1–60)",
        "Zephras Isle starting zone access (Levels 1–12)",
        "Ground Mount: Cerulean Prideclaw (WoW: Forever & Modern WoW)",
        "Transmog: Shen'dorei Skyseer's Garb + Veteran Adventurer's Rucksack (back)",
        "Toy: Shen'dorei Windwell",
        "Skyborne Housing Decor (Modern WoW, requires Midnight)",
        "Early Name Reservation access",
        "1 Invite-A-Friend Launch Code (no beta access or game time)"
      ]
    },
    "epicPack": {
      "name": "Skyborne Epic Pack",
      "badge": "Includes Beta Access",
      "cost": "$59.99 USD",
      "description": "Everything in the Heroic Pack plus closed beta access, 30 days of game time, an extra mount, a transmog set, four pets and two tabards.",
      "perks": [
        "Includes everything in the Skyborne Heroic Pack",
        "WoW: Forever closed beta access (Sept 17 – Oct 23, 2026)",
        "30 Days of World of Warcraft Game Time",
        "Ground Mount: Veteran Adventurer's Loyal Companion",
        "Transmog: Veteran Adventurer's Outdoor Wear",
        "Pets (WoW: Forever only): Zergling, Panda, Diablo, and Pachimari",
        "Tabards (WoW: Forever only): Lordaeron and Shen'dorei",
        "3 Invite-A-Friend Launch Codes total"
      ]
    },
    "collection": {
      "name": "Warcraft Forever Collection",
      "badge": "Limited — until Jan 11, 2027",
      "cost": "$79.99 USD",
      "description": "Everything in the Epic Pack plus Warcraft III: Reforged and its Forsaken Kingdom expansion. A limited BlizzCon 2026 edition sold through January 11, 2027.",
      "perks": [
        "Includes everything in the Skyborne Epic Pack",
        "Warcraft III: Reforged + Forsaken Kingdom expansion",
        "Forsaken & Human Figurine Decor (Modern WoW housing, requires Midnight)",
        "3 Invite-A-Friend Launch Codes total"
      ]
    }
  },
  "engineSpecs": {
    "minimum": {
      "os": "Windows 10 64-bit",
      "cpu": "See Blizzard's Battle.net Shop listing for exact CPU models",
      "ram": "8 GB RAM",
      "gpu": "DirectX 12 GPU with 4 GB VRAM — NVIDIA GTX 10 series / AMD RDNA 1 or newer (older architectures are no longer supported)",
      "storage": "128 GB free space on an SSD",
      "target": "Official minimum spec"
    },
    "recommended": {
      "os": "Windows 11 64-bit",
      "cpu": "8 performance cores with 5.2 GHz boost (e.g. Intel Core Ultra Series 2 / AMD Ryzen Zen 5)",
      "ram": "16 GB RAM",
      "gpu": "DirectX 12 GPU with 8 GB VRAM",
      "storage": "128 GB free space on an SSD",
      "target": "Official recommended spec"
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
      "name": "Excavation Site: Wetlands",
      "zone": "Wetlands",
      "isNew": true,
      "betaActive": true
    },
    {
      "level": "24 – 32",
      "name": "Blackfathom Deeps",
      "zone": "Ashenvale",
      "isNew": false,
      "betaActive": true
    },
    {
      "level": "24 – 32",
      "name": "The Stockade",
      "zone": "Stormwind City",
      "isNew": false,
      "betaActive": true
    },
    {
      "level": "28 – 34",
      "name": "City of Dalaran (Under Siege)",
      "zone": "Alterac Mountains",
      "isNew": true,
      "betaActive": true
    },
    {
      "level": "29 – 38",
      "name": "Gnomeregan",
      "zone": "Dun Morogh",
      "isNew": false,
      "betaActive": true
    },
    {
      "level": "29 – 38",
      "name": "Razorfen Kraul",
      "zone": "The Barrens",
      "isNew": false,
      "betaActive": true
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
      "name": "Alcaz Prison",
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
            "desc": "Increases your chance to gain a skill increase from using any primary, secondary, or class-based tradeskill by 4% per rank (up to 20% at 5/5)."
          },
          {
            "id": "prof-2",
            "name": "Bountiful Harvest",
            "max": 5,
            "desc": "You are 20% more likely per rank (up to 100% at 5/5) to discover Scarce materials from Mining, Herbalism, and Skinning."
          },
          {
            "id": "prof-3",
            "name": "Luremaster",
            "max": 2,
            "desc": "While fishing with a Lure active, you have a 25% chance per rank (up to 50% at 2/2) to catch an extra fish."
          },
          {
            "id": "prof-4",
            "name": "Performance Bonus",
            "max": 3,
            "desc": "You have a 5% chance per rank (up to 15% at 3/3) to receive 100% increased Merchant's Favor when you turn in a crate to the Azeroth Commerce Authority or Durotar Supply and Logistics."
          },
          {
            "id": "prof-5",
            "name": "Bartering",
            "max": 2,
            "desc": "Reduces the gold price of items from all vendors by 5% per rank (up to 10% at 2/2)."
          },
          {
            "id": "prof-6",
            "name": "Master Chef",
            "max": 5,
            "desc": "Your cooking recipes have a 10% chance per rank (up to 50% at 5/5) to create an extra result."
          },
          {
            "id": "prof-7",
            "name": "Dedicated Study",
            "max": 1,
            "desc": "Increases your skill by 1 in your lowest tradeskill among your Primary and Secondary tradeskills. If all 5 tradeskills are at 300, you will gain 2 to 4 of a random Elemental Essence."
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
            "desc": "Your rested experience accumulates 4% faster and your rested experience cap is increased by 4% per rank (up to 20% at 5/5)."
          },
          {
            "id": "adv-2",
            "name": "Thrill of Adventure",
            "max": 5,
            "desc": "You gain 1% per rank (up to 5% at 5/5) of your maximum Health and Mana over 10 sec each time you deliver the killing blow to a non-trivial enemy (open world only)."
          },
          {
            "id": "adv-3",
            "name": "Field Medicine",
            "max": 2,
            "desc": "Reduces the duration of the Recently Bandaged effect by 5 sec per rank (up to 10 sec at 2/2) when you use a bandage (open world only)."
          },
          {
            "id": "adv-4",
            "name": "Field Guide",
            "max": 3,
            "desc": "Reduces your cooldown on adding Camp features by 8% / 17% / 25% across 3 ranks."
          },
          {
            "id": "adv-5",
            "name": "Talented",
            "max": 5,
            "desc": "You gain talent points every level starting 1 level earlier per rank (down to level 5 at 5/5 instead of level 10, still capped at 51 total talent points)."
          },
          {
            "id": "adv-6",
            "name": "High Alert",
            "max": 2,
            "desc": "Increases your ability to detect nearby targets with Stealth as if your level were increased by 1 per rank (up to +2 at 2/2, open world only)."
          },
          {
            "id": "adv-7",
            "name": "Frequent Flier",
            "max": 1,
            "desc": "You receive a 50% discount on all flight paths, and your flight path mount flies 20% faster."
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
            "desc": "Increases the duration of beneficial effects from eating food by 33% / 67% / 100% across 3 ranks."
          },
          {
            "id": "res-2",
            "name": "The Quick and the Dead",
            "max": 2,
            "desc": "Increases movement speed while dead by 5% per rank (up to 10% at 2/2) and your helpful spells and abilities cost no resources for 1 min per rank (up to 2 min at 2/2) after being resurrected or until entering combat."
          },
          {
            "id": "res-3",
            "name": "Reinforce",
            "max": 5,
            "desc": "You take 8% less durability loss when you die per rank (up to 40% at 5/5)."
          },
          {
            "id": "res-4",
            "name": "Diplomat",
            "max": 5,
            "desc": "Increases your reputation gains by 2% per rank (up to 10% at 5/5)."
          },
          {
            "id": "res-5",
            "name": "Permanence",
            "max": 2,
            "desc": "Your class abilities granting long-duration party/raid stat buffs last 50% longer per rank (up to 100% at 2/2), and camp resting benefits last 50% longer per rank (up to 100% at 2/2)."
          },
          {
            "id": "res-6",
            "name": "For Great Honor",
            "max": 5,
            "desc": "Increases Honor Points gained by 2% per rank (up to 10% at 5/5)."
          },
          {
            "id": "res-7",
            "name": "Reagent Economy",
            "max": 1,
            "desc": "Your class abilities no longer require reagents purchaseable from vendors."
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
      "category": "Classes (27 Points)",
      "desc": "Earn 1 Legacy Point at levels 25 (Novice), 45 (Experienced), and 60 (Master) on all 9 classes (Druid, Hunter, Mage, Paladin, Priest, Rogue, Shaman, Warlock, Warrior)."
    },
    {
      "category": "Tradeskills (18 Points)",
      "desc": "Earn 1 Legacy Point at 150 (Journeyman), 225 (Expert), and 300 (Artisan) skill across 6 professions: Alchemy, Blacksmithing, Enchanting, Engineering, Leatherworking, Tailoring."
    },
    {
      "category": "Player vs. Player (12 Points)",
      "desc": "Earn 1 point at PvP Ranks 3, 7, 10, 13, and 14; 1 point for Exalted with each BG faction (AV, AB, WSG, Darkspear Islands); 1 point for weeks 4, 7, 10 of Field of Honor."
    },
    {
      "category": "Adventure (2 Points)",
      "desc": "1 point for Explorer (Explore Azeroth achievement); 1 point for Lord Valthalak Laid to Rest (Tier 0.5 questline)."
    },
    {
      "category": "Dungeons (3 Points)",
      "desc": "Novice Spelunker (Ruins of Lordaeron & Excavation: Wetlands), Experienced Spelunker (City of Dalaran, Drowned City & Krol'Dok Stronghold), Master Spelunker (Alcaz Island, Timbermaw Hold & Shaper's Terrace)."
    },
    {
      "category": "Raids (3 Points)",
      "desc": "Conqueror of the Lair (Onyxia's Lair), Conqueror of the Wilds (Hyjal Summit), Conqueror of the Deeps (Barrow Deeps)."
    }
  ],
  "squadRosterPresets": [
    {
      "id": "roster-1",
      "name": "Thadd - Chimes on disc",
      "faction": "Horde",
      "race": "Troll",
      "className": "Shaman",
      "role": "Melee DPS",
      "spec": "Enhancement",
      "prof1": "",
      "prof2": "",
      "notes": "Thadd is a rascal"
    },
    {
      "id": "roster-2",
      "name": "Kaboomson aka Marcus",
      "faction": "Horde",
      "race": "Orc",
      "className": "Mage",
      "role": "Ranged DPS",
      "spec": "Frost mage unless arcane is better",
      "prof1": "Tailoring",
      "prof2": "",
      "notes": "I'm on a lot, I will def go tailor at least."
    },
    {
      "id": "roster-3",
      "name": "BigRed",
      "faction": "Horde",
      "race": "Undead",
      "className": "Paladin",
      "role": "Tank",
      "spec": "Protection spec? lol",
      "prof1": "",
      "prof2": "",
      "notes": "A bad ass."
    },
    {
      "id": "roster-4",
      "name": "Bigred",
      "faction": "Horde",
      "race": "Tauren",
      "className": "Druid",
      "role": "Healer",
      "spec": "Restoration",
      "prof1": "",
      "prof2": "",
      "notes": "Played with us in SOD, great guy, very elite."
    },
    {
      "id": "roster-5",
      "name": "AndrewM",
      "faction": "Horde",
      "race": "Undead",
      "className": "Paladin",
      "role": "Melee DPS",
      "spec": "Retribution",
      "prof1": "",
      "prof2": "",
      "notes": "He will main two chars."
    },
    {
      "id": "roster-6",
      "name": "AndrewM",
      "faction": "Horde",
      "race": "Troll",
      "className": "Mage",
      "role": "Ranged DPS",
      "spec": "Frost",
      "prof1": "",
      "prof2": "",
      "notes": "He will main two chars."
    },
    {
      "id": "roster-7",
      "name": "Brody - Futtsnbarts on disc",
      "faction": "Horde",
      "race": "Undead",
      "className": "Paladin",
      "role": "Tank / DPS",
      "spec": "Protection / Retribution",
      "prof1": "",
      "prof2": "",
      "notes": "Brodyyyyyyyyy - Tank & DPS Paladin"
    },
    {
      "id": "roster-8",
      "name": "Con aka Congirl on disc",
      "faction": "Horde",
      "race": "Tauren",
      "className": "Shaman",
      "role": "Melee DPS",
      "spec": "enh sham towards the end, but early/mid levels gonna util. tank/heals/dps",
      "prof1": "",
      "prof2": "",
      "notes": "ITS MF CON"
    },
    {
      "id": "roster-9",
      "name": "Burk",
      "faction": "Horde",
      "race": "Undead",
      "className": "Warrior",
      "role": "Melee DPS",
      "spec": "Arms",
      "prof1": "",
      "prof2": "",
      "notes": "ITS MF BURK"
    },
    {
      "id": "roster-10",
      "name": "Sploodge",
      "faction": "Horde",
      "race": "Undead",
      "className": "Warlock",
      "role": "Ranged DPS",
      "spec": "Demonology",
      "prof1": "",
      "prof2": "",
      "notes": "Sploodge - Demonology Warlock"
    }
  ],
  "skyborneRace": {
    "name": "The Skyborne",
    "origin": "Zephras Isle (linked to both factions by the Valanaar Skydocks)",
    "factionOption": "Chosen at character creation: High Order (Alliance) or Windshaper (Horde)",
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
    "lore": "A brand-new playable race whose story begins on Zephras Isle. Requires the Skyborne Heroic Pack or higher.",
    "racialsAlliance": [
      {
        "name": "Walk on Air",
        "type": "Active • 10s • 90s CD",
        "effect": "Glide downward through the air for 10 sec. 90 sec cooldown."
      },
      {
        "name": "Read Leyline",
        "type": "Active • 15s • 2m CD",
        "effect": "Increases Mana and Health regeneration by 50% for 15 sec (2 min cooldown). Cannot be used alongside Innervate. Using at a Ley Line grants Attuned for 1 hour, boosting the benefit to 100% regeneration (persists through death, removed upon entering a raid)."
      },
      {
        "name": "Wind Blessed",
        "type": "Passive",
        "effect": "2% increased melee, ranged, and spellcasting Haste."
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
        "type": "Active • 10s • 90s CD",
        "effect": "Glide downward through the air for 10 sec. 90 sec cooldown."
      },
      {
        "name": "Skysight",
        "type": "Active • 15s",
        "effect": "Increases movement speed by 15% for 15 sec. Using at an elemental convergence grants Charged for 1 hour, increasing speed bonus to 30% (persists through death, removed upon entering a raid)."
      },
      {
        "name": "Wind Blessed",
        "type": "Passive",
        "effect": "2% increased melee, ranged, and spellcasting Haste."
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
        "type": "Active • 10s • 90s CD",
        "effect": "Glide downward through the air for 10 sec. 90 sec cooldown."
      },
      {
        "name": "Read Leyline / Skysight",
        "type": "Active (Faction Dependent)",
        "effect": "Alliance: Read Leyline (50% mana/health regen for 15s; 100% when Attuned) • Horde: Skysight (15% run speed for 15s; 30% when Charged). Both persist through death and are removed upon entering a raid."
      },
      {
        "name": "Wind Blessed",
        "type": "Passive",
        "effect": "2% increased melee, ranged, and spellcasting Haste."
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
      "desc": "Wards the friendly target against Fear. The next Fear effect used against the target will fail, using up the ward. Lasts 3 min, 3 min cooldown. (✦ Baseline for ALL Priests in WoW: Forever!)"
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
            "desc": "Deals Holy damage and immobilizes the target for up to 2 sec. Only works against Humanoids. Very low threat. 2 min cooldown."
          },
          {
            "name": "Desperate Prayer",
            "type": "Active (Instant)",
            "desc": "Instantly heals the caster. 10 min cooldown."
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
            "desc": "Confuses nearby enemies for 3 sec. Any damage breaks the effect. 2 min cooldown. Works in Shadowform (Nov 11 hotfix)."
          },
          {
            "name": "Contingency Plan",
            "type": "Active (Ally Ward)",
            "desc": "Places a Holy ward on an ally for 30 sec. The next time they drop below 35% Health they gain an absorb shield and a heal over 15 sec. 10 min cooldown."
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
            "type": "Active (Instant Heal)",
            "desc": "Instantly heals a friendly target below 50% Health and removes Weakened Soul. Cannot be cast on yourself. 10 min cooldown."
          },
          {
            "name": "Feedback",
            "type": "Active (15s)",
            "desc": "For 15 sec, any spell cast successfully against you burns the attacker's Mana and deals Shadow damage equal to the Mana burned. 3 min cooldown."
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
            "type": "Active (5 min CD)",
            "desc": "Reduces the chance you are hit by melee and ranged attacks by 50% for 15 sec or until you are missed 3 times. 5 min cooldown."
          },
          {
            "name": "Starshards",
            "type": "Channeled (6s)",
            "desc": "Rains starshards on the target, dealing Arcane damage over 6 sec. 30 sec cooldown."
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
            "desc": "Reduces the target's melee attack power and the effectiveness of healing on it by 20% for 2 min."
          },
          {
            "name": "Shadowguard",
            "type": "Active (Instant)",
            "desc": "Surrounds the caster with shadows (3 charges, 10 min). Spell, melee, or ranged attacks that hit you strike the attacker for Shadow damage."
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
            "desc": "Drains your own Health over 15 sec to restore Mana. 10 min cooldown."
          },
          {
            "name": "Touch of Weakness",
            "type": "Active Buff",
            "desc": "The next melee attack against you deals Shadow damage to the attacker and reduces their melee attack power for 2 min."
          }
        ]
      }
    ]
  },
  "campingKits": [
    {
      "name": "Basic Campfire",
      "desc": "Builds a basic campfire that allows cooking and the placement of up to 3 additional camp features. Players sitting or crafting nearby for 1 min will gain benefits from other camp features.",
      "levelReq": 1,
      "maxStations": 3
    },
    {
      "name": "Journeyman Campfire",
      "desc": "Builds a journeyman campfire that allows cooking and the placement of up to 5 additional camp features. Players sitting or crafting nearby for 1 min will gain benefits from other camp features. Requires Cooking 90 (lowered from 140 on Nov 10).",
      "levelReq": 20,
      "maxStations": 5
    },
    {
      "name": "Expert Campfire",
      "desc": "Builds an expert campfire that allows cooking and the placement of up to 10 additional camp features. Players sitting or crafting nearby for 1 min will gain benefits from other camp features.",
      "levelReq": 25,
      "maxStations": 10
    }
  ],
  "campingObjects": [
    {
      "profession": "Alchemy",
      "type": "Primary",
      "icon": "🧪",
      "mirroredBuff": "Mana Well: up to 29 Mana every 5 sec",
      "mirroredClass": "Does not stack with Blessing of Wisdom",
      "objects": [
        {
          "name": "Mana Well",
          "tier": 1,
          "desc": "Constructs a mana well that allows you and others sitting nearby to regenerate 29 Mana every 5 sec, mutually exclusive with Blessing of Wisdom."
        },
        {
          "name": "Fermenter",
          "tier": 2,
          "desc": "Places a fermenter that allows the creation of certain reagents, and provides all of the benefits of a Mana Well."
        },
        {
          "name": "Alchemy Laboratory",
          "tier": 3,
          "desc": "Places an Alchemy Laboratory usable for recipes that require it, and provides all of the benefits of a Mana Well."
        }
      ]
    },
    {
      "profession": "Blacksmithing",
      "type": "Primary",
      "icon": "🔨",
      "mirroredBuff": "Sharpening Wheel: up to +34 Strength",
      "mirroredClass": "Does not stack with Strength of Earth Totem",
      "objects": [
        {
          "name": "Sharpening Wheel",
          "tier": 1,
          "desc": "Constructs a sharpening wheel that grants you and others sitting nearby 34 increased Strength, mutually exclusive with Strength of Earth Totem."
        },
        {
          "name": "Anvil",
          "tier": 2,
          "desc": "Places an anvil, and provides all of the benefits of a Sharpening Wheel."
        },
        {
          "name": "Master Forge",
          "tier": 3,
          "desc": "Places a Master Forge usable for recipes that require it, and provides all of the benefits of a Sharpening Wheel."
        }
      ]
    },
    {
      "profession": "Enchanting",
      "type": "Primary",
      "icon": "✨",
      "mirroredBuff": "Enchanted Lute: up to +308 Armor, +13 all stats, +22 all resistances",
      "mirroredClass": "Does not stack with Mark of the Wild",
      "objects": [
        {
          "name": "Enchanted Lute",
          "tier": 1,
          "desc": "Summons an enchanted lute that allows you and others sitting nearby to gain 308 Armor, 13 to all stats, and 22 to all resistances (level 60 values), mutually exclusive with Mark of the Wild."
        },
        {
          "name": "Arcane Salvager",
          "tier": 2,
          "desc": "Places an Arcane Salvager that enables more efficient disenchanting, and provides all the benefits of an Enchanted Lute."
        },
        {
          "name": "Arcane Forge",
          "tier": 3,
          "desc": "Places an Arcane Forge usable for recipes that require it, and provides all the benefits of an Enchanted Lute."
        }
      ]
    },
    {
      "profession": "Engineering",
      "type": "Primary",
      "icon": "⚙️",
      "mirroredBuff": "Reagent Bot: buy reagents (Repair Bot also repairs gear)",
      "mirroredClass": "Unique",
      "objects": [
        {
          "name": "Reagent Bot",
          "tier": 1,
          "desc": "Summons a Reagent Bot that allows you and others nearby to purchase reagents."
        },
        {
          "name": "Repair Bot",
          "tier": 2,
          "desc": "Summons a Repair Bot that allows you and others nearby to buy reagents and repair gear."
        },
        {
          "name": "Anarchist's Workbench",
          "tier": 3,
          "desc": "Places an Anarchist's Workbench usable for recipes that require it."
        }
      ]
    },
    {
      "profession": "First Aid",
      "type": "Secondary",
      "icon": "🩹",
      "mirroredBuff": "First Aid Kit: up to +56 Stamina",
      "mirroredClass": "Does not stack with Power Word: Fortitude",
      "objects": [
        {
          "name": "First Aid Kit",
          "tier": 1,
          "desc": "Unpacks a first aid kit that allows you and others sitting nearby to gain 56 increased Stamina, mutually exclusive with Power Word: Fortitude."
        },
        {
          "name": "Toxin Study",
          "tier": 2,
          "desc": "Places a Toxin Study that contains healing potions and anti-venom, and provides all of the benefits of a First Aid Kit."
        },
        {
          "name": "Plague Doctor's Laboratory",
          "tier": 3,
          "desc": "Places a Plague Doctor's Laboratory that contains healing potions and poultices, and provides all of the benefits of a First Aid Kit."
        }
      ]
    },
    {
      "profession": "Fishing",
      "type": "Secondary",
      "icon": "🎣",
      "mirroredBuff": "Fish Bowl: +8% all stats",
      "mirroredClass": "Does not stack with Blessing of Kings",
      "objects": [
        {
          "name": "Fish Bowl",
          "tier": 1,
          "desc": "Places a small fish bowl that allows you and others sitting nearby to gain 8% increased stats, mutually exclusive with Blessing of Kings."
        },
        {
          "name": "Fishing Rack",
          "tier": 2,
          "desc": "Places a Fishing Rack that grants the ability to catch uncommon fish for 1 hour, provides Fishing Skill lures, and provides all of the benefits of a Fish Bowl."
        },
        {
          "name": "Fishing Hut",
          "tier": 3,
          "desc": "Places a Fishing Hut that grants the ability to catch rare fish for 1 hour, provides Fishing Skill lures, and provides all of the benefits of a Fish Bowl."
        }
      ]
    },
    {
      "profession": "Herbalism",
      "type": "Primary",
      "icon": "🌿",
      "mirroredBuff": "Incense Candle: up to +25 Intellect",
      "mirroredClass": "Does not stack with Arcane Intellect",
      "objects": [
        {
          "name": "Incense Candle",
          "tier": 1,
          "desc": "Ignites an incense candle that allows you and others sitting nearby to gain 25 increased Intellect, mutually exclusive with Arcane Intellect."
        },
        {
          "name": "Greenhouse",
          "tier": 2,
          "desc": "Places a Greenhouse that will grow herbs over time from seeds planted, and provides all of the benefits of an Incense Candle."
        },
        {
          "name": "Seed Hybridizer",
          "tier": 3,
          "desc": "Places a Seed Hybridizer that allows seeds to be multiplied or combined into rarer tiers, and provides all of the benefits of an Incense Candle."
        }
      ]
    },
    {
      "profession": "Leatherworking",
      "type": "Primary",
      "icon": "🛡️",
      "mirroredBuff": "Camp Tent: Rested XP raised to 5% of a level",
      "mirroredClass": "Unique",
      "objects": [
        {
          "name": "Camp Tent",
          "tier": 1,
          "desc": "Builds a tent that allows you and others sitting nearby to increase Rested experience to 5% of a level. No effect if Rested experience already exceeds that value."
        },
        {
          "name": "Tanning Rack",
          "tier": 2,
          "desc": "Places a Tanning Rack that allows the creation of certain reagents, and provides all of the benefits of a Camp Tent."
        },
        {
          "name": "Sewing Machine",
          "tier": 3,
          "desc": "Places a Sewing Machine usable for recipes that require it, and provides all of the benefits of a Camp Tent."
        }
      ]
    },
    {
      "profession": "Mining",
      "type": "Primary",
      "icon": "⛏️",
      "mirroredBuff": "Lodestone: up to +90 melee Attack Power",
      "mirroredClass": "Does not stack with Blessing of Might",
      "objects": [
        {
          "name": "Lodestone",
          "tier": 1,
          "desc": "Erects a lodestone that allows you and others sitting nearby to gain 90 increased melee Attack Power, mutually exclusive with Blessing of Might."
        },
        {
          "name": "Rock Garden",
          "tier": 2,
          "desc": "Places a Rock Garden that spawns a common mining node over time, and provides all the benefits of a Lodestone."
        },
        {
          "name": "Molten Foundry",
          "tier": 3,
          "desc": "Places a Molten Foundry usable for recipes that require it, and provides all the benefits of a Lodestone."
        }
      ]
    },
    {
      "profession": "Skinning",
      "type": "Primary",
      "icon": "🔪",
      "mirroredBuff": "Camp Chair: +2% crit with spells and attacks",
      "mirroredClass": "Does not stack with Moonkin Aura",
      "objects": [
        {
          "name": "Camp Chair",
          "tier": 1,
          "desc": "Assembles a camp chair that allows you and others sitting nearby to gain 2% increased critical strike chance with all spells and attacks, mutually exclusive with Moonkin Aura."
        },
        {
          "name": "Field Guide",
          "tier": 2,
          "desc": "Places a Field Guide that allows players to read it and gain Track Beasts, and provides all the benefits of a Camp Chair."
        },
        {
          "name": "Trapper's Workbench",
          "tier": 3,
          "desc": "Places a Trapper's Workbench containing 1 trap, and provides all the benefits of a Camp Chair."
        }
      ]
    },
    {
      "profession": "Tailoring",
      "type": "Primary",
      "icon": "🧵",
      "mirroredBuff": "Faction Banner: up to +32 Spirit (your faction only)",
      "mirroredClass": "Does not stack with Divine Spirit",
      "objects": [
        {
          "name": "Faction Banner",
          "tier": 1,
          "desc": "Unrolls a banner that allows you and other members of your faction sitting nearby to gain 32 increased Spirit, mutually exclusive with Divine Spirit."
        },
        {
          "name": "Spinning Wheel",
          "tier": 2,
          "desc": "Places a Spinning Wheel that allows the creation of certain reagents, and provides all the benefits of a Faction Banner."
        },
        {
          "name": "Loom",
          "tier": 3,
          "desc": "Places a Loom usable for recipes that require it, and provides all the benefits of a Faction Banner."
        }
      ]
    },
    {
      "profession": "Cooking",
      "type": "Secondary",
      "icon": "🍳",
      "mirroredBuff": "Campfire + Cookie's Feast (Stamina food)",
      "mirroredClass": "Unique",
      "objects": [
        {
          "name": "Basic Campfire",
          "tier": "Basic",
          "desc": "Builds a basic campfire that allows cooking and the placement of up to 3 additional camp features. Players sitting or crafting nearby for 1 min will gain benefits from other camp features."
        },
        {
          "name": "Journeyman Campfire",
          "tier": "Journeyman (Cooking 90)",
          "desc": "Builds a journeyman campfire that allows cooking and the placement of up to 5 additional camp features. Players sitting or crafting nearby for 1 min will gain benefits from other camp features."
        },
        {
          "name": "Expert Campfire",
          "tier": "Expert",
          "desc": "Builds an expert campfire that allows cooking and the placement of up to 10 additional camp features. Players sitting or crafting nearby for 1 min will gain benefits from other camp features."
        },
        {
          "name": "Cookie's Feast",
          "tier": "Feast",
          "desc": "Lay out Cookie's Feast that contains Stamina-boosting food."
        }
      ]
    }
  ],
  "professionPassives": [
    {
      "name": "Mining",
      "type": "Gathering",
      "icon": "⛏️",
      "passiveName": "Lodestone — camp object at skill 20",
      "passiveEffect": "Everyone sitting at your camp gains up to +90 melee Attack Power (scales with level; does not stack with Blessing of Might).",
      "campBonus": "Upgrade: Rock Garden — keeps the Lodestone bonus and spawns a common mining node over time."
    },
    {
      "name": "Herbalism",
      "type": "Gathering",
      "icon": "🌿",
      "passiveName": "Incense Candle — camp object at skill 20",
      "passiveEffect": "Everyone sitting at your camp gains up to +25 Intellect (scales with level; does not stack with Arcane Intellect).",
      "campBonus": "Tauren can also use Cultivation to duplicate herb nodes without Herbalism."
    },
    {
      "name": "Skinning",
      "type": "Gathering",
      "icon": "🔪",
      "passiveName": "Camp Chair — camp object at skill 20",
      "passiveEffect": "Everyone sitting at your camp gains +2% critical strike chance with spells and attacks (does not stack with Moonkin Aura).",
      "campBonus": "Skinning also feeds Leatherworking camp upgrades such as the Tanning Rack."
    },
    {
      "name": "Blacksmithing",
      "type": "Production",
      "icon": "🔨",
      "passiveName": "Sharpening Wheel — camp object at skill 20",
      "passiveEffect": "Everyone sitting at your camp gains up to +34 Strength (scales with level; does not stack with Strength of Earth Totem).",
      "campBonus": "All camp features share a 1-hour cooldown and need a Campfire nearby."
    },
    {
      "name": "Alchemy",
      "type": "Production",
      "icon": "🧪",
      "passiveName": "Mana Well — camp object at skill 20",
      "passiveEffect": "Everyone sitting at your camp regenerates up to 29 Mana every 5 sec (scales with level).",
      "campBonus": "All camp features share a 1-hour cooldown and need a Campfire nearby."
    },
    {
      "name": "Tailoring",
      "type": "Production",
      "icon": "🧵",
      "passiveName": "Faction Banner — camp object at skill 20",
      "passiveEffect": "Everyone of your faction sitting at your camp gains up to +32 Spirit (scales with level).",
      "campBonus": "Upgrade: Spinning Wheel — keeps the Faction Banner bonus and lets you create certain reagents."
    },
    {
      "name": "Leatherworking",
      "type": "Production",
      "icon": "🛡️",
      "passiveName": "Camp Tent — camp object at skill 20",
      "passiveEffect": "Everyone sitting at your camp has Rested experience raised to 5% of a level (no effect if already higher).",
      "campBonus": "Upgrade: Tanning Rack (Leatherworking 125) — keeps the Camp Tent bonus and lets you create certain reagents."
    },
    {
      "name": "Enchanting",
      "type": "Production",
      "icon": "✨",
      "passiveName": "Enchanted Lute — camp object at skill 20",
      "passiveEffect": "Everyone sitting at your camp gains up to +308 Armor plus bonus stats and resistances (scales with level; does not stack with Mark of the Wild).",
      "campBonus": "All camp features share a 1-hour cooldown and need a Campfire nearby."
    },
    {
      "name": "Engineering",
      "type": "Production",
      "icon": "⚙️",
      "passiveName": "Reagent Bot — camp object at skill 20",
      "passiveEffect": "Summons a Reagent Bot at camp so you and others nearby can buy reagents.",
      "campBonus": "All camp features share a 1-hour cooldown and need a Campfire nearby."
    },
    {
      "name": "Cooking",
      "type": "Secondary",
      "icon": "🍖",
      "passiveName": "Cookie's Feast — camp object at skill 20",
      "passiveEffect": "Lays out Stamina-boosting food for everyone at camp. Cooking also provides the campfire itself.",
      "campBonus": "Journeyman Campfire Kit needs Cooking 90 (lowered from 140 on Nov 10)."
    },
    {
      "name": "First Aid",
      "type": "Secondary",
      "icon": "🩹",
      "passiveName": "First Aid Kit — camp object at skill 20",
      "passiveEffect": "Everyone sitting at your camp gains up to +56 Stamina (scales with level; does not stack with Power Word: Fortitude).",
      "campBonus": "Upgrade: Toxin Study — keeps the First Aid Kit bonus and holds healing potions and anti-venom."
    },
    {
      "name": "Fishing",
      "type": "Secondary",
      "icon": "🎣",
      "passiveName": "Fish Bowl — camp object at skill 20",
      "passiveEffect": "Everyone sitting at your camp gains +8% to all stats (does not stack with Blessing of Kings).",
      "campBonus": "All camp features share a 1-hour cooldown and need a Campfire nearby."
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
        "title": "Healing Gear Also Has Spell Power",
        "desc": "In Forever, Bonus Healing gear also carries Spell Power, so healers can deal reasonable damage while leveling and farming without a second gear set. Blizzard has not published an exact ratio."
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
        "title": "Transmog Included",
      "desc": "Forever includes the modern transmog system: appearances you collect are saved to your account collection."
      }
    ]
  },
  "classStatConversions": {
    "warrior": {
      "name": "Warrior",
      "icon": "⚔️",
      "color": "#c79c6e",
      "role": "Tank / Melee DPS",
      "strength": "1 Str = 2 Melee AP • 20 Str = 1 Block Value",
      "agility": "20 Agi = 1% Crit • 20 Agi = 1% Dodge • 1 Agi = 1 Ranged AP • 1 Agi = 2 Armor",
      "intellect": "No direct benefit (weapon skill was replaced by Expertise in Forever)",
      "stamina": "1 Sta = 10 Health",
      "spirit": "Out-of-combat Health regen",
      "highlights": [
        "2 Melee Attack Power per 1 Strength",
        "20 Strength = 1 Shield Block Value",
        "20 Agility = 1% Critical Strike chance",
        "20 Agility = 1% Dodge chance"
      ],
      "summary": "Strength is the primary DPS and Threat engine (2 AP per point). Agility provides efficient 20:1 Crit and Dodge scaling, while 20 Strength adds 1 Block Value to shields."
    },
    "paladin": {
      "name": "Paladin",
      "icon": "🛡️",
      "color": "#f58cba",
      "role": "Tank / Healer / Melee DPS",
      "strength": "1 Str = 2 Melee AP • 20 Str = 1 Block Value",
      "agility": "20 Agi = 1% Melee Crit • 20 Agi = 1% Dodge • 1 Agi = 2 Armor",
      "intellect": "1 Int = 15 Mana • ~54 Int = 1% Spell Crit (Lowest threshold of all casters!)",
      "stamina": "1 Sta = 10 Health",
      "spirit": "In-combat Mana regen enabled via Holy talent tree; out-of-combat HP/Mana recovery",
      "highlights": [
        "2 Melee Attack Power per 1 Strength",
        "~54 Intellect = 1% Spell Critical Strike (Easiest Spell Crit in game!)",
        "20 Strength = 1 Shield Block Value",
        "20 Agility = 1% Critical Strike & Dodge"
      ],
      "summary": "Gets maximum Melee AP from Strength (2:1) and the most efficient Spell Crit from Intellect (~54:1). Shield blocks scale with Strength (20:1)."
    },
    "hunter": {
      "name": "Hunter",
      "icon": "🏹",
      "color": "#abd473",
      "role": "Ranged Physical DPS",
      "strength": "1 Str = 1 Melee AP",
      "agility": "1 Agi = 2 Ranged AP • 1 Agi = 1 Melee AP • 53 Agi = 1% Crit • 26 Agi = 1% Dodge • 1 Agi = 2 Armor",
      "intellect": "1 Int = 15 Mana",
      "stamina": "1 Sta = 10 Health (and scales pet Health pool)",
      "spirit": "Out-of-combat Health & Mana regen",
      "highlights": [
        "2 Ranged Attack Power + 1 Melee AP per 1 Agility",
        "53 Agility = 1% Critical Strike chance",
        "26 Agility = 1% Dodge chance",
        "Stamina scales both Hunter and Pet max health"
      ],
      "summary": "Agility is king: grants 2 Ranged AP + 1 Melee AP + 2 Armor per point! Requires 53 Agility per 1% Crit and 26 Agility per 1% Dodge."
    },
    "rogue": {
      "name": "Rogue",
      "icon": "🗡️",
      "color": "#fff569",
      "role": "Melee Physical DPS",
      "strength": "1 Str = 1 Melee AP",
      "agility": "1 Agi = 1 Melee AP • 1 Agi = 1 Ranged AP • 29 Agi = 1% Crit • 14.5 Agi = 1% Dodge (Best Dodge in game!) • 1 Agi = 2 Armor",
      "intellect": "No direct benefit (weapon skill was replaced by Expertise in Forever)",
      "stamina": "1 Sta = 10 Health",
      "spirit": "Out-of-combat Health regen",
      "highlights": [
        "14.5 Agility = 1% Dodge (Highest Dodge yield of any class)",
        "29 Agility = 1% Critical Strike chance",
        "1 Melee Attack Power & 1 Ranged AP per 1 Agility",
        "1 Agility = 2 Armor"
      ],
      "summary": "Best Dodge return in the entire game (14.5 Agi = 1% Dodge!) and rapid Critical Strike conversion (29 Agi = 1% Crit). 1 Agility provides 1 Melee AP and 2 Armor."
    },
    "priest": {
      "name": "Priest",
      "icon": "✨",
      "color": "#ffffff",
      "role": "Healer / Ranged Magic DPS",
      "strength": "1 Str = 1 Melee AP",
      "agility": "20 Agi = 1% Crit • 20 Agi = 1% Dodge • 1 Agi = 2 Armor",
      "intellect": "1 Int = 15 Mana • ~59.5 Int = 1% Spell Crit",
      "stamina": "1 Sta = 10 Health",
      "spirit": "Meditation lets 50% of Mana regen continue while casting; Spiritual Guidance adds spell healing (up to 25% of Spirit) and spell damage from Spirit.",
      "highlights": [
        "Spirit fuels in-combat Mana regeneration & bonus Spell Power",
        "15 Mana per 1 Intellect",
        "~59.5 Intellect = 1% Spell Critical Strike",
        "Healing gear in Forever also carries Spell Power"
      ],
      "summary": "Spirit is premier: fuels in-combat mana regeneration and spell power conversion. Intellect provides base mana pool and spell crit (~59.5 Int per 1% Spell Crit)."
    },
    "shaman": {
      "name": "Shaman",
      "icon": "⚡",
      "color": "#0070de",
      "role": "Healer / Ranged & Melee DPS / Off-Tank",
      "strength": "1 Str = 2 Melee AP • 20 Str = 1 Block Value",
      "agility": "20 Agi = 1% Melee Crit • 20 Agi = 1% Dodge • 1 Agi = 2 Armor",
      "intellect": "1 Int = 15 Mana • ~59.5 Int = 1% Spell Crit",
      "stamina": "1 Sta = 10 Health",
      "spirit": "In-combat Mana regen enabled via Restoration talents; rapid out-of-combat recovery",
      "highlights": [
        "2 Melee Attack Power per 1 Strength (Enhancement)",
        "20 Strength = 1 Shield Block Value (Shield tanking/off-hand)",
        "15 Mana per 1 Intellect & ~59.5 Int = 1% Spell Crit",
        "Spirit scales in-combat Mana regeneration"
      ],
      "summary": "Dual hybrid scaling: Strength yields 2 Melee AP and shield Block Value (Enhancement/Tanking), while Intellect yields 15 Mana and Spell Crit (Elemental/Restoration)."
    },
    "mage": {
      "name": "Mage",
      "icon": "🔥",
      "color": "#69ccf0",
      "role": "Ranged Magic DPS",
      "strength": "1 Str = 1 Melee AP",
      "agility": "20 Agi = 1% Crit • 20 Agi = 1% Dodge • 1 Agi = 2 Armor",
      "intellect": "1 Int = 15 Mana • ~59.5 Int = 1% Spell Crit",
      "stamina": "1 Sta = 10 Health",
      "spirit": "In-combat Mana regen boosted by Mage Armor and Arcane Meditation",
      "highlights": [
        "15 Mana per 1 Intellect",
        "~59.5 Intellect = 1% Spell Critical Strike",
        "Spirit synergizes with Mage Armor & Arcane Meditation",
        "Unified Critical Strike applies to all spell schools"
      ],
      "summary": "Intellect expands mana pool and spell critical chance. Spirit is enhanced by Mage Armor and Arcane Meditation to maintain casting endurance in long raid encounters."
    },
    "warlock": {
      "name": "Warlock",
      "icon": "🔮",
      "color": "#9482c9",
      "role": "Ranged Magic DPS",
      "strength": "1 Str = 1 Melee AP",
      "agility": "20 Agi = 1% Crit • 20 Agi = 1% Dodge • 1 Agi = 2 Armor",
      "intellect": "1 Int = 15 Mana (and scales pet Mana) • ~60.6 Int = 1% Spell Crit",
      "stamina": "1 Sta = 10 Health (and scales pet Health; fuels Life Tap)",
      "spirit": "Out-of-combat Health/Mana regen; Fel Armor synergy",
      "highlights": [
        "Stamina fuels unlimited Mana via Life Tap conversion",
        "Intellect grants 15 Mana to both Warlock & summoned demon",
        "~60.6 Intellect = 1% Spell Critical Strike",
        "DoTs gain full Spell Damage scaling over their duration"
      ],
      "summary": "Stamina is directly convertible into Mana via Life Tap! Intellect grants 15 Mana to both the Warlock and summoned demons, requiring ~60.6 Int per 1% Spell Crit."
    },
    "druid": {
      "name": "Druid",
      "icon": "🌿",
      "color": "#ff7d0a",
      "role": "Tank / Healer / Melee & Ranged DPS",
      "strength": "1 Str = 2 Melee AP (All Forms)",
      "agility": "1 Agi = 1 Melee AP (Cat Form) • 20 Agi = 1% Crit • 20 Agi = 1% Dodge • 1 Agi = 2 Armor",
      "intellect": "1 Int = 15 Mana • ~60 Int = 1% Spell Crit",
      "stamina": "1 Sta = 10 Health (drastically multiplied by Bear Form modifiers)",
      "spirit": "In-combat Mana regen via Reflection/Restoration; Innervate pooling",
      "highlights": [
        "2 Melee Attack Power per 1 Strength across ALL forms",
        "+1 Melee Attack Power per 1 Agility in Cat Form",
        "20 Agility = 1% Critical Strike & Dodge",
        "Bear Form multiplies flat Armor & Stamina bonuses"
      ],
      "summary": "Unmatched shapeshifting flexibility: Strength gives 2 Melee AP across all forms, Cat Form gains +1 Melee AP per Agility, and Bear Form drastically multiplies Armor and Stamina."
    }
  },
  "statsOverviewGuide": {
    "primaryStats": [
      {
        "name": "Strength",
        "icon": "💪",
        "role": "Primary Stat",
        "bullets": [
          "<strong>Melee Attack Power:</strong> Melee DPS classes (Warriors, Paladins, Shamans, and Druids) gain <strong>2 Attack Power</strong> per point of Strength. All other classes gain 1 Attack Power per point.",
          "<strong>Shield Block Value:</strong> Warriors, Paladins, and Shamans gain <strong>1 Block Value per 20 points</strong> of Strength, directly increasing the physical damage absorbed by equipped shields.",
          "Found heavily on Mail and Plate armor, two-handed weapons, and melee accessories."
        ]
      },
      {
        "name": "Agility",
        "icon": "🏃",
        "role": "Primary Stat",
        "bullets": [
          "<strong>Attack Power:</strong> Hunters gain <strong>2 Ranged AP</strong> per point. Rogues and Warriors gain 1 Ranged AP per point. Hunters, Rogues, and Cat Form Druids gain <strong>1 Melee AP</strong> per point.",
          "<strong>Armor:</strong> All classes gain a flat <strong>2 Armor per point</strong> of Agility.",
          "<strong>Critical Strike:</strong> Rogues gain 1% Crit per <strong>29 Agility</strong>; Hunters gain 1% Crit per <strong>53 Agility</strong>; Warriors, Paladins, Shamans, and Druids gain 1% Crit per <strong>20 Agility</strong>.",
          "<strong>Dodge Chance:</strong> Rogues gain 1% Dodge per <strong>14.5 Agility</strong> (highest in game!); Hunters gain 1% Dodge per <strong>26 Agility</strong>; all other classes gain 1% Dodge per <strong>20 Agility</strong>."
        ]
      },
      {
        "name": "Intellect",
        "icon": "🧠",
        "role": "Primary Stat",
        "bullets": [
          "<strong>Maximum Mana:</strong> Each point of Intellect grants <strong>15 additional Mana</strong>. Summoned Warlock pets also receive this bonus.",
          "<strong>Spell Critical Strike:</strong> Caster classes gain 1% Spell Crit per <strong>54–60 Intellect</strong>. Paladins require the least (~54), while Warlocks require the most (~60.6).",
          "<strong>Weapon Skill → Expertise:</strong> In Forever, Weapon Skill items were heavily reduced and racial weapon-skill bonuses removed; Expertise works much like it did in The Burning Crusade."
        ]
      },
      {
        "name": "Stamina",
        "icon": "❤️",
        "role": "Primary Stat",
        "bullets": [
          "<strong>Maximum Health:</strong> All classes gain a flat <strong>10 Health per point</strong> of Stamina.",
          "<strong>Pet Scaling:</strong> Hunter beasts and Warlock demons receive scaled health bonuses based on their master's Stamina.",
          "Vital for all classes, especially tanks pushing raid survival and PvP resilience."
        ]
      },
      {
        "name": "Spirit",
        "icon": "✨",
        "role": "Primary Stat",
        "bullets": [
          "<strong>Health & Mana Regeneration:</strong> Governs out-of-combat regeneration and regeneration outside the 5-second casting rule.",
          "<strong>In-Combat Regen:</strong> Talents such as Priest <em>Meditation</em>, Mage <em>Arcane Meditation</em> and Druid <em>Reflection</em> let 50% of Spirit-based Mana regeneration continue while casting.",
          "Priests gain direct Bonus Spell Damage & Healing from Spirit via Spiritual Guidance."
        ]
      }
    ],
    "secondaryStats": [
      {
        "name": "Critical Strike Chance",
        "icon": "🎯",
        "bullets": [
          "<strong>Unified on Gear:</strong> In Forever, Hit and Critical Strike chance on items apply to melee, ranged, and spells alike.",
          "<strong>Bonus Damage Multipliers:</strong> By default, melee Critical Strikes deal <strong>100% bonus damage</strong> (2x), and spell Critical Strikes deal <strong>50% bonus damage</strong> (1.5x).",
          "<strong>Talent Overrides:</strong> Talents such as Druid <em>Vengeance</em>, Priest <em>Shadowform</em>, and Paladin <em>Conviction / Holy Power</em> modify and amplify critical strike damage."
        ]
      },
      {
        "name": "Hit Chance",
        "icon": "🏹",
        "bullets": [
          "<strong>Melee Hit Caps:</strong> Base miss rate is <strong>5%</strong> against equal-level targets and <strong>9%</strong> against Level 63 raid bosses (special yellow attacks). Dual-wielding white auto-attacks suffer a higher 27% miss penalty.",
          "<strong>Spell Hit Caps:</strong> Base spell miss is <strong>3%</strong> against equal-level targets and <strong>16%</strong> against Level 63 raid bosses.",
          "Consolidated Hit on gear applies uniformly to eliminate misses and resists."
        ]
      },
      {
        "name": "Haste",
        "icon": "⚡",
        "bullets": [
          "<strong>Effect:</strong> Reduces melee and ranged swing timers and spell cast times.",
          "<strong>Racial & Passive Sources:</strong> Skyborne passive <em>Wind Blessed</em> (+2% Haste), Troll racial <em>Berserking</em>, and select enchants and trinkets.",
          "<strong>Talent Synergies:</strong> Stacks with attack-speed talents such as Warrior/Shaman <em>Flurry</em> and Rogue <em>Blade Flurry</em>."
        ]
      }
    ],
    "defensiveStats": [
      {
        "name": "Armor & Mitigation",
        "icon": "🦺",
        "bullets": [
          "<strong>Physical Damage Reduction:</strong> Reduces physical damage taken based on attacker level and armor value. Increased by Agility (2 Armor per point).",
          "<strong>75% Hard Mitigation Cap:</strong> Physical damage reduction caps at <strong>75%</strong>, requiring approximately <strong>17,265 Armor</strong> against Level 63 raid bosses."
        ]
      },
      {
        "name": "Defense (The 440 Cap)",
        "icon": "🛡️",
        "bullets": [
          "<strong>Smoothed Damage Profile:</strong> Defense increases Dodge, Block, and Parry while decreasing the enemy's chance to hit or critically strike you.",
          "<strong>Uncrittable at 440:</strong> Reaching <strong>440 Defense</strong> eliminates critical strikes from Level 63 raid bosses, preventing fatal 200% spike damage on tanks."
        ]
      },
      {
        "name": "Shield Block & Block Value",
        "icon": "🧱",
        "bullets": [
          "<strong>Shield Requirement:</strong> Exclusive to Warriors, Paladins, and Shamans with a shield equipped.",
          "<strong>Flat Mitigation:</strong> Blocks mitigate damage equal to your <strong>Block Value</strong> (increased by Strength at 20:1 and gear). Can block both melee and ranged physical hits."
        ]
      },
      {
        "name": "Dodge, Parry & Parry Haste",
        "icon": "⚔️",
        "bullets": [
          "<strong>Frontal Nullification:</strong> Dodge and Parry grant a chance to completely negate incoming frontal attacks (cannot dodge or parry from behind!).",
          "<strong>⚠️ Parry Haste Warning:</strong> When a combatant parries an attack, their next swing occurs <strong>40% faster</strong>! If a raid boss parries, it can trigger sudden, lethal double-hit bursts on the tank."
        ]
      },
      {
        "name": "Magic Resistances",
        "icon": "🔮",
        "bullets": [
          "<strong>Five Magic Schools:</strong> Arcane, Fire, Frost, Nature, and Shadow (Holy damage cannot be resisted).",
          "<strong>75% Damage Cap:</strong> Mitigates up to <strong>75% magic damage</strong>, reached at <strong>315 Resistance</strong> against Level 63 raid bosses."
        ]
      }
    ],
    "modifiersAndRules": [
      {
        "name": "Spell Damage & Spell Healing Coefficients",
        "icon": "✨",
        "bullets": [
          "Each spell has an internal coefficient deciding what percentage of your bonus Spell Power it receives.",
          "<strong>Long Cast Spells:</strong> Direct spells like <em>Frostbolt</em> and <em>Fireball</em> have high coefficients (~80%–100%).",
          "<strong>Instant & AoE Spells:</strong> Spells like <em>Arcane Explosion</em> receive ~15% per hit, while DoTs (like <em>Shadow Word: Pain</em>) spread high coefficients across their full duration."
        ]
      },
      {
        "name": "Level 20 Downranking Threshold",
        "icon": "📉",
        "bullets": [
          "Spell coefficients plateau for ranks learned at or after <strong>Level 20</strong>.",
          "<strong>Downranking Warning:</strong> Avoid downranking to spell ranks learned prior to Level 20, as they suffer severe sub-20 coefficient penalties that gut bonus spell power scaling."
        ]
      },
      {
        "name": "Attack Power Ratio (14 AP = 1 DPS)",
        "icon": "🗡️",
        "bullets": [
          "Every <strong>14 points of Attack Power</strong> grants exactly <strong>1 weapon Damage Per Second (DPS)</strong>.",
          "Unified Attack Power on gear increases both melee and ranged weapon damage equally."
        ]
      },
      {
        "name": "Healing-to-Spell Damage (+33.3%)",
        "icon": "☀️",
        "bullets": [
          "In WoW Forever, all gear granting Bonus Healing automatically converts <strong>+33.3% (+1/3)</strong> of its value into Bonus Spell Damage.",
          "Enables healers to farm and level outdoors effectively without carrying a dedicated DPS gear set."
        ]
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
      "category": "Paladin Class Mount",
      "icon": "🛡️",
      "badge": "Class Identity",
      "mounts": [
        "Summon Forsaken Charger (Undead Paladin unique skeletal warhorse)"
      ]
    },
    {
      "category": "Legacy & Seasonal Rewards",
      "icon": "🏆",
      "badge": "Account Progression",
      "mounts": [
        "Reins of the Spectral Bear (55 Legacy Points)",
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
      "status": "Available at Launch (Level 13–18)",
      "playableNow": true,
      "description": "Subterranean crypts beneath the High Seat of Ironforge, breached by troggs, fire elementals, and a disgraced thane.",
      "bosses": [
        "Faldrim Anvilmar",
        "Magmatus",
        "Plunder",
        "Durgen Dirgehammer"
      ],
      "lootHighlights": [
        "Durgen's Crescent Axe",
        "Fang of Magmatus",
        "Kindlegem Girdle",
        "Ephemeral Choker"
      ]
    },
    {
      "id": "dungeon-02",
      "name": "Ruins of Lordaeron",
      "type": "5-Man Dungeon",
      "levelRange": "15 – 20",
      "zone": "Tirisfal Glades (Eastern Kingdoms)",
      "status": "Available at Launch (Level 15–20)",
      "playableNow": true,
      "description": "The haunted ruins of Lordaeron's capital city above the Undercity, occupied by Scourge abominations, spiders, and the necromancer Rath'mael.",
      "bosses": [
        "The Baron",
        "Witherfang",
        "The Abandoned",
        "Bjork",
        "Rath'mael",
        "Viktor the Vile",
        "Lordaeron Captain"
      ],
      "lootHighlights": [
        "Mirror of Rath'mael",
        "Rotmender's Raiment",
        "Corpse Chopper",
        "Coldspire Staff"
      ]
    },
    {
      "id": "dungeon-03",
      "name": "Excavation Site: Wetlands",
      "type": "5-Man Dungeon",
      "levelRange": "26 – 31",
      "zone": "Wetlands (Eastern Kingdoms)",
      "status": "Available at Launch (Level 26–31)",
      "playableNow": true,
      "description": "An ancient Titan archaeological dig site above Whelgar's Excavation in the Wetlands marshes, overrun by prehistoric beasts, Dragonmaw vanguards, and awakened Titan sentinels.",
      "bosses": [
        "Saltspine",
        "Shadetooth",
        "Highland Horror",
        "Relic Guardian",
        "Dark Iron Surveyor Brand",
        "Sentinel Archeus"
      ],
      "lootHighlights": [
        "Reliquary Mantle",
        "Felbough Arm",
        "Ring of Power Regulation",
        "Blueprint: Greenhouse"
      ]
    },
    {
      "id": "dungeon-04",
      "name": "City of Dalaran (Under Siege)",
      "type": "5-Man Dungeon",
      "levelRange": "28 – 33",
      "zone": "Alterac Mountains",
      "status": "Available at Launch (Level 28–33)",
      "playableNow": true,
      "entrance": "Enter via sewers into the Underbelly, fight through Kirin Tor necromancers, then break out into the open streets of Dalaran.",
      "description": "Before the violet dome was erected, Dalaran is plagued by Arcane Anomalies, unstable constructs, and rogue Kirin Tor Necromancers ravaging the streets with undead minions.",
      "bosses": [
        "Atrexis the Grave Knight",
        "Lyn the Ignored",
        "Arcane Anomaly",
        "Arcanic Enigma",
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
        "Archmagister's Faceted Pendant",
        "Violet Sorcerer's Mantle",
        "Guardian's Dualblade",
        "Ponderous Orb"
      ]
    },
    {
      "id": "dungeon-05",
      "name": "The Drowned City",
      "type": "5-Man Dungeon",
      "levelRange": "35 – 42",
      "zone": "Stranglethorn Vale (Sunken Coast)",
      "status": "Available at Launch (Level 35–42)",
      "playableNow": true,
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
      "status": "Available at Launch (Level 40–46)",
      "playableNow": true,
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
      "name": "Alcaz Prison",
      "type": "5-Man Dungeon",
      "levelRange": "48 – 54",
      "zone": "Dustwallow Marsh",
      "status": "Available at Launch (Level 48–54)",
      "playableNow": true,
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
      "status": "Available at Launch (Level 55–60)",
      "playableNow": true,
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
      "status": "Available at Launch (Level 58–60)",
      "playableNow": true,
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
      "zone": "Mount Hyjal (also entered from Winterspring & Blackmaw Hold)",
      "status": "Unlocks Dec 9, 2026",
      "playableNow": false,
      "description": "The former prison of Illidan Stormrage, with 8 bosses across multiple paths and themes. Blizzard confirms entrances in Mount Hyjal, Winterspring and Blackmaw Hold and a weekly lockout. Encounter names come from the Legacy achievement data; Blizzard has not published an official boss or loot list yet.",
      "bosses": [
        "Deepscar Matriarch",
        "Khalith the Dreadspinner",
        "Amethrax",
        "Ravus and Darlissa",
        "Elder Tangleclaw",
        "Well of Sorrow",
        "Del'lynar Songwood",
        "Sonya Darkhallow"
      ],
      "lootHighlights": []
    },
    {
      "id": "raid-02",
      "name": "Hyjal Summit (Launch Raid)",
      "type": "20-Player Raid",
      "levelRange": "Level 60 (Tier 1)",
      "zone": "Mount Hyjal",
      "status": "Unlocks Dec 9, 2026",
      "playableNow": false,
      "description": "The summit of Mount Hyjal beside the World Tree Nordrassil, with 13 bosses. The first is an ancient guardian, then the raid branches into routes above and below ground. Weekly lockout. Encounter names come from the Legacy achievement data; Blizzard has not published an official boss or loot list yet.",
      "bosses": [
        "Bandalar",
        "Ancient of Decay",
        "Time-Lost Battalion",
        "Sylvestris Dusksong",
        "Old Gloomlurker",
        "Gharalis the Abyssal",
        "Kathris the Haunted",
        "Anara Chillwind",
        "Elder Minderel",
        "Tracker Stillwind",
        "Council of Thorns",
        "Nythus the Dreambound",
        "The Wild King"
      ],
      "lootHighlights": []
    },
    {
      "id": "raid-03",
      "name": "Onyxia's Lair (Forever Edition)",
      "type": "40-Player Raid",
      "levelRange": "Level 60 (Tier 1)",
      "zone": "Dustwallow Marsh",
      "status": "Unlocks Dec 9, 2026",
      "playableNow": false,
      "description": "Onyxia's three-phase fire encounter, so stack fire resistance beforehand. Every raid member must carry the Drakefire Amulet (it does not need to be equipped). The attunement chain is nearly the same as Classic: Alliance via Marshal Maxwell and Highlord Bolvar, Horde via Thrall and Rexxar, both ending with General Drakkisath in Upper Blackrock Spire. Weekly lockout. Blizzard has not published loot.",
      "bosses": [
        "Onyxia"
      ],
      "lootHighlights": []
    }
  ],
  "newZones": [
    {
      "name": "Zephras Isle",
      "level": "1 – 12",
      "continent": "Zephras Isle (its own landmass)",
      "description": "The Skyborne starting zone. The Valanaar Skydocks link it to Alliance and Horde lands.",
      "features": "Valanaar and the Valanaar Skydocks, Shen'dar Village, Thendal Village, Falaath Village, Windsong Lake, Shadowgale Forest, the Skywall and the Sanctum of Storms."
    },
    {
      "name": "Riverglades",
      "level": "30 – 45",
      "continent": "Eastern Kingdoms",
      "description": "A new Eastern Kingdoms zone on the coast of the Forbidding Sea, home to the Krol'dok Stronghold dungeon.",
      "features": "Farholde Keep, Powderfuse Port, Terral's Watch, Windstead, Turner's Logging Camp, Twilight's Shroud and Krol'dok Stronghold."
    },
    {
      "name": "Mount Hyjal",
      "level": "55 – 60",
      "continent": "Kalimdor",
      "description": "The night elves' sacred mountain, opened as a level 55–60 zone and home to the Barrow Deeps and Hyjal Summit raids.",
      "features": "Summit of Eternity, Shrine of Aviana, Cradle of Tranquility, Malorne's Retreat, Elderwild and Felblood Scar."
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
        "A Basic Campfire Kit has room for 3 camp objects. All camp features share a 1-hour cooldown.",
        "Buff examples: Lodestone (Mining, up to +90 Attack Power), Sharpening Wheel (Blacksmithing, up to +34 Strength), First Aid Kit (up to +56 Stamina).",
        "Camp objects do not stack with the matching class buff (e.g. Fish Bowl vs Blessing of Kings)."
      ]
    },
    {
      "id": "legacy",
      "name": "Account-Wide Legacy Progression",
      "icon": "🏆",
      "summary": "A non-power progression system rewarding alt-leveling and completionist achievements.",
      "details": [
        "Earn up to 65 Legacy Points from account challenges: leveling each class, profession milestones, PvP, dungeons, raids and exploration.",
        "Legacy Points are account-wide, but each character customizes their own perk allocation.",
        "Three trees: Tradeskill Mastery (skill-ups, yields, vendor discounts), World Explorer (rested XP, cheaper and faster flights, earlier talents) and Resourcefulness (longer food and group buffs, Reagent Economy, reputation and Honor gains)."
      ]
    },
    {
      "id": "realmless",
      "name": "Realmless Ruleset Engine",
      "icon": "🌐",
      "summary": "No locked server dead-ends: Pick your gameplay ruleset and play with the entire region.",
      "details": [
        "Instead of locking into servers like 'Faerlina' or 'Whitemane', players select a Ruleset: Normal (PvE), PvP, Roleplay (RP), or Roleplay-PvP (RP-PvP), with Hardcore arriving in the winter update.",
        "Dynamic seamless layering preserves local world density while preventing dead servers or 5-hour queues.",
        "Guilds and world economy operate across unified ruleset regional fabrics."
      ]
    },
    {
      "id": "presets",
      "name": "Experience Presets & Native Controller 1.0",
      "icon": "🎮",
      "summary": "Toggle modern conveniences or authentic 2004 vanilla purism at character creation.",
      "details": [
        "Enhanced Preset: Built-in quest guidance and marked objective POIs, consolidated One-Bag view, Transmog wardrobe, modern strafe keybinds, and modern HD character models.",
        "Classic Preset: Authentic 2004 UI, original standard-definition models, traditional keyboard turning, with quest markers and transmog disabled by default.",
        "Full Flexibility: All individual features can be toggled on or off at any time in the Interface options.",
        "Native Gamepad 1.0: Full controller support with radial action wheels, contextual looting, and smooth target acquisition."
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
      "summary": "Rank Points no longer decay; Rank 14 needs 24,750 Rank Points with a weekly cap.",
      "details": [
        "Honor and Rank are separate: Honor buys gear (cap 25,000) and spending it never lowers your rank.",
                "New Darkspear Islands battleground (levels 30–60) off the coast of Dustwallow Marsh."
      ]
    },
    {
      "id": "hardcore-ruleset",
      "name": "Hardcore Ruleset & Safety Net",
      "icon": "💀",
      "summary": "Permadeath ruleset arriving winter 2026/27; details to be announced.",
      "details": [
        "Confirmed for winter 2026/27 with permanent character death. Full rules not yet published.",
                "Blizzard has not yet announced what happens to characters after death."
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
        "Guaranteed persistent server population through seamless megarealm sharding.",
        "First & Last Name (Surname) architecture: Region-wide uniqueness required for full two-word combinations; shared first names supported."
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
        "Strict single-faction account restriction: an account can only create characters of one faction on this ruleset.",
        "Reworked Rank 14: Rank Points no longer decay (24,750 RP for Rank 14, with a weekly cap).",
        "Faction balance: since Nov 10, Blizzard limits the larger faction on some PvP rulesets (Horde on NA PvP)."
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
        "Same region-wide megarealm structure as the other rulesets, with an RP-focused community.",
        "Open-world adventuring with opt-in PvP rules similar to Normal megarealms."
      ]
    },
    {
      "id": "rp-pvp",
      "name": "Roleplay-PvP (RP-PvP) Megarealm",
      "badge": "Faction War & Immersion",
      "icon": "⚔️📜",
      "status": "Available at Launch (Nov 4, 2026)",
      "rules": [
        "Combines strict immersive roleplay naming conventions with permanent contested zone PvP flagging.",
        "Strict single-faction account restriction: an account can only create characters of one faction on this ruleset.",
        "Since Nov 10, Blizzard limits new Alliance characters on the EU Roleplay-PvP ruleset to improve faction balance.",
        "Reworked Rank 14: Rank Points no longer decay."
      ]
    },
    {
      "id": "hardcore",
      "name": "Hardcore Megarealm",
      "badge": "Permadeath",
      "icon": "💀",
      "status": "Arriving Winter 2026/27",
      "rules": [
        "Permanent death: Dying means your character cannot resurrect on the Hardcore megarealm.",
        "Full ruleset details (transfers, duels, lockouts) have not been published yet."
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
        "desc": "Trained baseline from level 30 instead of being a Discipline talent."
      },
      {
        "cls": "Priest",
        "name": "Fear Ward",
        "desc": "Baseline for ALL Priests across all races."
      },
      {
        "cls": "Paladin",
        "name": "Blessing of Kings",
        "desc": "Trained baseline from level 20 instead of being a Protection talent."
      },
      {
        "cls": "Paladin",
        "name": "Blessing of Might",
        "desc": "Baseline attack power blessing available to all specs."
      },
      {
        "cls": "Paladin",
        "name": "Consecration",
        "desc": "Baseline Holy AoE ability trained from level 1, no longer a Holy talent."
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
      },
      {
        "cls": "Druid",
        "name": "Poised",
        "desc": "Baseline level 32 passive reducing Energy cost of next ability by 10 when out of combat at maximum Energy."
      },
      {
        "cls": "Rogue",
        "name": "Shank",
        "desc": "Baseline off-hand strike learned at level 24 (5 Energy, 10s CD) generating 15 Energy (25 at level 44). Cannot miss."
      },
      {
        "cls": "Rogue",
        "name": "Poised",
        "desc": "Baseline level 18 passive reducing Energy cost of next ability by 10 when out of combat at maximum Energy."
      },
      {
        "cls": "Paladin",
        "name": "Righteous Fury (Level 10)",
        "desc": "Trained at level 10 (was 16) to mirror other tank stances; generates 33% increased threat and +90% Holy threat (Blessing of Salvation removed)."
      },
      {
        "cls": "Shaman",
        "name": "Totemic Call",
        "desc": "Trained at level 22. Instantly moves your active totems to your location."
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
      "text": "Reach Level 10 and unlock the revamped 1.60.1 Talent Tree",
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
      "text": "Utilize the modern in-game ping system for smooth dungeon callouts and target marking",
      "cat": "QoL"
    },
    {
      "id": "step-9",
      "text": "Queue for the Level 10-19 bracket in Warsong Gulch",
      "cat": "PvP"
    },
    {
      "id": "step-10",
      "text": "Hit Level 20! Complete class weapon quests and unlock essential abilities",
      "cat": "Leveling Milestone"
    },
    {
      "id": "step-11",
      "text": "Enter Wetlands and conquer Level 24–30 Dungeon: Excavation Site: Wetlands",
      "cat": "Dungeons"
    },
    {
      "id": "step-12",
      "text": "Infiltrate Alterac Mountains and defeat Kirin Tor rogues in Level 28–34 Dungeon: City of Dalaran",
      "cat": "Dungeons"
    },
    {
      "id": "step-13",
      "text": "Unlock Tier 2 Camping: Craft an Ironwood Campfire (+10% stat boost) and Silk Tent",
      "cat": "Camping"
    },
    {
      "id": "step-14",
      "text": "Queue for the Level 20–29 Warsong Gulch battleground bracket",
      "cat": "PvP"
    },
    {
      "id": "step-15",
      "text": "Participate in contested open-world PvP skirmishes across Hillsbrad Foothills & Ashenvale",
      "cat": "World PvP"
    },
    {
      "id": "step-16",
      "text": "Advance primary professions past 150 & craft Level 25–30 weapons/armor",
      "cat": "Professions"
    },
    {
      "id": "step-17",
      "text": "Hit the Midway Milestone: Level 30! Unlock key 21-point talent capstones",
      "cat": "Midway Milestone"
    },
    {
      "id": "step-18",
      "text": "Equip & configure ForeverLiquid (v1.4.1) HUD to track XP velocity, Mount Fund ETA & 5/hr lockouts",
      "cat": "Addons & Tools"
    },
    {
      "id": "step-19",
      "text": "Open ForeverDungeonJournal (v1.7.6) to review cross-faction routes & boss tactics for your next run",
      "cat": "Addons & Tools"
    },
    {
      "id": "step-20",
      "text": "Acquire the Cozy Sleeping Bag in Westfall / Barrens (+3% XP leveling buff) to accelerate your road to 60",
      "cat": "World Events & QoL"
    },
    {
      "id": "step-21",
      "text": "Configure Blizzard's new Native Cooldown Manager in Edit Mode for your class's essential rotation and proc tracking",
      "cat": "Combat & UI"
    },
    {
      "id": "step-22",
      "text": "Reach Level 60 (Legacy class milestones at Levels 25, 45 and 60)",
      "cat": "Leveling Milestone"
    },
    {
      "id": "step-23",
      "text": "Clear 6, then 10, then 17 different dungeons for the Novice, Experienced and Master Spelunker Legacy achievements",
      "cat": "Dungeons"
    },
    {
      "id": "step-24",
      "text": "Take primary professions to 225, then 300 (Artisan) - Legacy tradeskill goals sit at 150, 225 and 300",
      "cat": "Professions"
    },
    {
      "id": "step-25",
      "text": "Queue Darkspear Islands (15v15, Level 30+) and Alterac Valley (40v40, Level 51-60)",
      "cat": "PvP"
    },
    {
      "id": "step-26",
      "text": "Start the Honor climb: Rank 1 (Private / Scout) needs 750 RP",
      "cat": "PvP"
    },
    {
      "id": "step-27",
      "text": "Gear up for Tier 1 raids opening December 9: Barrow Deeps (10-player) and Hyjal Summit (20-player)",
      "cat": "Raid Prep"
    }
  ],
  "classDeepDives": {}
};

if (typeof window !== 'undefined') {
  window.WOW_FOREVER_DATA = WOW_FOREVER_DATA;
}
