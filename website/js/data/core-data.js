/**
 * World of Warcraft: Forever - Core Dataset
 * Up-to-date as of October 28, 2026 (Launch Pre-Release Candidate Build 1.60.1.70425)
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
    "currentBetaPhase": "Pre-Launch Window: Early Name Reservation LIVE NOW (Oct 27 – Nov 3 • Launch: Nov 4)",
    "clientBuild": "1.60.1.70425",
    "engineInfo": "Custom Ray-Traced Engine (Post-Warcraft III: Reforged Continuity)",
    "maxLevel": 60,
    "currentBetaCap": 30,
    "legacyPointsAtLaunch": 16,
    "lastUpdated": "October 28, 2026"
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
      "highlights": "Level cap increased to 30! Extended through Oct 23 at 10:00 AM PDT. Excavation Site 4 (Wetlands), City of Dalaran (Alterac), Ashenvale & Hillsbrad open world PvP, Warsong Gulch 20–29 bracket, Tier 2 Camping (Ironwood & Silk Tents)."
    },
    "stressTest": {
      "title": "Open Beta Stress Test (All Battle.net Accounts)",
      "dates": "October 21 – October 22, 2026",
      "duration": "Extended Window (No Invite / Active Sub Required)",
      "cap": 30,
      "highlights": "Stress testing server infrastructure and dynamic megarealm layering ahead of global launch. Free for all Battle.net accounts without invite or active subscription."
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
  "sitePhases": {
    "beta2": {
      "key": "beta2",
      "topPill": "Beta Phase 2: LIVE NOW • Level 30 Cap Active (Extended to Oct 23!)",
      "tickerDuration": "37 Days (Sept 17 – Oct 23)",
      "heroTitle": "Phase 2: LIVE NOW",
      "heroBadge": "Day {daysElapsed} of 37",
      "headline": "Beta Phase 2 Extended: The Level 30 Cap Expansion",
      "subline": "Beta Phase 2 has been extended through Friday, October 23 at 10:00 AM PDT! Level 30 cap active with Excavation Site 4 & the City of Dalaran.",
      "milestonesTitle": "Beta Phase 2 Milestones",
      "squadBracket": "Beta Phase 2 (Cap 30 - Live Now!)"
    },
    "prelaunch": {
      "key": "prelaunch",
      "topPill": "🛡️ Pre-Launch Active • Name Reservation LIVE NOW (Oct 27 – Nov 3) • Global Launch Nov 4",
      "tickerDuration": "Beta Completed (37/37 Days)",
      "heroTitle": "Pre-Launch Window — Name Reservation Live",
      "heroBadge": "Launch Countdown",
      "headline": "Early Name Reservation Active: Pre-Launch Readiness Pass",
      "subline": "Early Name Reservation is live across all regional rulesets through November 3. Lock in up to 3 character names ahead of the November 4 Global Launch.",
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
      "url": "https://news.blizzard.com/en-us/world-of-warcraft/planet-azeroth-mockumentary-bill-bailey"
    },
    {
      "id": "news-61",
      "title": "Community Manager Kaivax Deploys Hotfix for Over-Restrictive Name Filter Bug ('con' Substring) & Megaserver Queue Stability",
      "source": "Blizzard Official / Community Manager Blue Post",
      "sourceType": "blizzard",
      "author": "Community Manager Kaivax",
      "date": "October 28, 2026",
      "tag": "Hotfixes & Platform Tuning",
      "summary": "Following opening-day queues, Blizzard deployed regional rolling hotfixes to address an erroneous profanity filter rejection that blocked non-profane names containing 'con' substrings (such as Falcon, Bacon, and Conflag), while optimizing regional megaserver authentication flow.",
      "content": `We’ve just completed rolling realm restarts and backend hotfixes across all regional WoW Forever megaservers (Americas, Europe, Korea, and Taiwan) to address issues encountered during the first 24 hours of Early Name Reservation.

**Name Reservation Hotfix Details:**
• **Naming Filter Over-Restriction Fixed:** Resolved an issue with the automated character naming validation engine that erroneously triggered the *"That name is restricted"* error on legitimate, non-profane character names containing the letter string **'c-o-n'** (for example: *Falcon*, *Bacon*, *Conflag*, *Connor*, *Constantine*). Players whose desired names were rejected under this condition can now successfully retry and claim them.
• **Login Queue & Authentication Pipeline:** Deployed concurrency load balancing across the Battle.net character creation proxy to eliminate transient "No realms available" disconnects during peak evening reservation hours.
• **RP Ruleset Validation:** Refined roleplaying filter dictionaries to prevent naming collisions while preserving fantasy naming conventions on the Roleplaying and RP-PvP megaservers.

Early Character Name Reservation remains active for all pre-purchase edition holders through Tuesday, November 3, 2026 at 10:00 AM PST.`,
      "url": "https://news.blizzard.com/en-us/world-of-warcraft/wow-forever-name-reservation-hotfixes-october-28"
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
      "url": "https://news.blizzard.com/en-us/world-of-warcraft/early-name-reservation-now-live-wow-forever"
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
      "url": "https://news.blizzard.com/en-us/world-of-warcraft/wow-forever-racial-abilities-and-traits-update-part-2"
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
      "url": "https://news.blizzard.com/en-us/world-of-warcraft/wow-forever-racial-abilities-and-traits-update"
    },
    {
      "id": "news-57",
      "title": "WoW Forever Closed Beta Concludes with Global Wipe: Blizzard Commences Infrastructure Prep for October 27 Name Reservation",
      "source": "Blizzard Official & Server Operations",
      "sourceType": "blizzard",
      "author": "Josh \"Aggrend\" Greenfield & Realm Operations",
      "date": "October 23, 2026 (10:00 AM PDT)",
      "tag": "Beta Concluded & Launch Prep",
      "summary": "Following 37 days of intensive community playtesting and the climactic 'Twilight of the First Realm' invasion, closed beta realms have officially powered down. A comprehensive database reset is underway ahead of early name reservations on October 27.",
      "content": `At 10:00 AM PDT on Friday, October 23, 2026, Blizzard operations officially brought down the World of Warcraft: Forever closed beta megarealms, concluding a historic 37-day public playtest across two milestone caps and a high-concurrency open stress test:
• 250,000+ Player Reports & Telemetry Logged:
  - Over 250,000 bug reports, balance tickets, and combat log traces were ingested throughout Beta Phase 1 (Level 20 cap) and Phase 2 (Level 30 cap).
  - Data gathered directly drove the final tuning pass on the Camelot 12.0 ray-tracing pipeline, racial trait adjustments, and modern cooldown UI integration.
• Comprehensive Character Wipe Underway:
  - In accordance with launch protocol, all characters, guilds, bank storage, and temporary beta items created during the test window are undergoing a complete server-side database wipe.
  - No character progress or gold carries over into the live game environment.
• What Comes Next — Pre-Launch Timeline:
  - Tuesday, October 27 at 10:00 AM PDT: Early Character Name Reservation and appearance customization opens across all rulesets (PvP, PvE, RP, Hardcore). Players may lock in up to 3 character names per Battle.net account.
  - Wednesday, November 4 at 15:00 PST: World of Warcraft: Forever officially launches worldwide! Full 1–60 leveling, 29 revamped dungeons, and open-world survival camping unlock globally.
  - Wednesday, December 9 at 10:00 AM PST: Tier 1 Raids unlock (The Barrow Deeps 10m, Hyjal Summit 20m, and Onyxia's Lair 40m).`,
      "url": "https://news.blizzard.com/en-us/world-of-warcraft/forever-closed-beta-concludes-launch-prep"
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
      "title": "Closed Beta Extended Through Friday, October 23 at 10:00 AM PDT: Blizzard Grants Additional 48 Hours for Testing & Reschedules End-of-Beta Finale",
      "source": "Blizzard Official / Blue Post",
      "sourceType": "blizzard",
      "author": "Executive Producer Holly Longdale & Josh \"Aggrend\" Greenfield",
      "date": "October 21, 2026 (09:30 AM PDT)",
      "tag": "Beta Schedule & Extension",
      "summary": "Blizzard officially extends the WoW: Forever closed beta through Friday, October 23 at 10:00 AM PDT, granting players approximately 34 extra hours of Level 30 cap testing, Hallow's End activities, and rescheduling the 'Twilight of the First Realm' finale.",
      "content": `Blizzard operations announced this morning that the World of Warcraft: Forever Closed Beta has been officially extended through Friday, October 23, 2026 at 10:00 AM PDT (19:00 CEST):
• 34-Hour Test Window Extension:
  - Originally scheduled to conclude at 23:59 PDT on October 21, test realms will remain fully online through Friday, October 23 at 10:00 AM PDT.
  - The development team cited massive player turnout, rich feedback following Build 1.60.1.70425 talent/racial overhauls, and the desire to give players ample time to experience the Level 30 Hallow's End holiday event and dungeon pre-BiS loops.
• Rescheduled End-of-Beta Finale — 'Twilight of the First Realm':
  - The catastrophic end-of-beta world boss invasions (featuring colossal avatars of Ragnaros, Onyxia, and Mal'Ganis attacking Stormwind, Orgrimmar, and Southshore) will now commence Thursday evening, October 22 at 18:00 PDT and persist through the Friday morning shutdown.
  - Slaying an invading world boss awards the account-wide 'Vanguard of the Living World' commemorative feat of strength on live realms.
• Character Wipe & Launch Schedule Intact:
  - Test megarealms will go dark at 10:00 AM PDT on Friday, October 23, initiating the comprehensive database wipe of all beta characters and guild rosters.
  - Early Character Name Reservation remains firmly locked for Tuesday, October 27 at 10:00 AM PDT, leading directly into the global launch on Wednesday, November 4 at 15:00 PST.
• Open Stress Testing Extended:
  - All Battle.net accounts without active beta access or active subscriptions may continue logging into open stress test shards throughout Thursday, October 22.`,
      "url": "https://news.blizzard.com/en-us/world-of-warcraft/forever-beta-extended-to-october-23"
    },
    {
      "id": "news-53",
      "title": "Hallow's End Phase 2 Telemetry: Shade of the Headless Rider Defeated, 16-Slot Pumpkin Bag Farming & Wickerman Buff Stacking Verified",
      "source": "Wowhead Seasonal Desk",
      "sourceType": "wowhead",
      "author": "Wowhead Playtest Desk",
      "date": "October 20, 2026",
      "tag": "World Events & Holidays",
      "summary": "Over 80,000 players battle the Level 30 Shade of the Headless Rider in Scarlet Monastery Graveyard as testers confirm the +10% XP/Rep Wickerman buff stacks with the Cozy Sleeping Bag for late-beta speed-leveling.",
      "content": `With Hallow's End fully underway across Beta Phase 2 megarealms, data logs and community trackers highlight high engagement around the final seasonal holiday:
• Scarlet Monastery Graveyard Headless Rider:
  - Thousands of 5-man groups have summoned the Level 30 Shade of the Headless Rider inside the courtyard, testing encounter pacing and mob add spawns.
  - Drops for the 3 rare iLvl 35 signet rings (+8 Stamina, +12 Attack Power / +9 Spell Power) have shown balanced item budgets, and the cosmetic 'Hallowed Pumpkin Lantern' off-hand has become a staple across capital cities.
• Invocation of the Wickerman Buff Stacking:
  - Field testing confirms that 'Invocation of the Wickerman' (+25% Stamina/Spirit regen, +10% Experience/Reputation for 2 hours) cleanly stacks with the Cozy Sleeping Bag (+3% per stack up to 4 stacks) and regional Camp Benefits (+5% kill XP).
  - Leveling players have leveraged this triple-stack synergy to power alt characters from Level 20 to 30 in record time.
• 16-Slot Pumpkin Bag Rates:
  - Innkeeper trick-or-treating telemetry indicates an approximate 8.5% drop rate on the coveted 16-slot Pumpkin Bag from hourly treat bags.`,
      "url": "https://www.wowhead.com/forever/news/hallows-end-phase-2-telemetry-headless-rider-pumpkin-bags"
    },
    {
      "id": "news-52",
      "title": "Venruki $100,000 Duel Championship Grand Finals: Snutz Crowned Champion in 7-Game Epic, Level 30 Duel Meta Final Review",
      "source": "Method.gg & Warcraft Tavern",
      "sourceType": "method",
      "author": "Venruki & Method Esports Desk",
      "date": "October 19, 2026",
      "tag": "Esports & Competitive Meta",
      "summary": "Snutz captures the inaugural $100,000 WoW Forever Duel Championship with a thrilling 4-3 Grand Finals victory over Mes outside the Gates of Orgrimmar, cementing Affliction Warlock and Arms Warrior atop the Level 30 1v1 pantheon.",
      "content": `The inaugural $100,000 Level 30 Duel Championship concluded Sunday evening in dramatic fashion before a peak concurrent audience of 98,000 viewers:
• Championship Grand Finals:
  - Snutz (Affliction Warlock) defeated Mes (Arms Warrior) 4-3 in a tense Best-of-7 series decided inside the Durotar chalk ring.
  - Mes pushed Snutz to the brink with Spearing Strike gap-closers and Overpower burst, but Snutz's calculated Drain Life attrition and Curse of Exhaustion kiting sealed game 7 with only 12% health remaining.
• Key Meta Takeaways from the 64-Player Field:
  - Build 1.60.1.70425 Racial Overhauls: Alliance gladiators with Human 'Ruthless' (+2% all crit) and Dwarf 'Earth Fury' (+2% crit bonus) accounted for 6 of the Top 8 slots, validating the retirement of legacy weapon specialization racials.
  - Hybrid Viability: Bean (Feral Druid) took 3rd place, demonstrating that 21-point feral capstones combined with Travel Form powershifting offer unprecedented sustained pressure at Level 30.
• Broadcast Success:
  - Tournament organizer Venruki praised the stability of the dedicated duel arena phase, noting zero crashes or latency spikes during all 63 matches.`,
      "url": "https://www.method.gg/wow-classic/venruki-100k-duel-championship-grand-finals-recap"
    },
    {
      "id": "news-51",
      "title": "Venruki $100,000 Duel Championship Day 2: Durotar Arena Addition, Final 8 Bracket & 2-Hour High-Value Trade Hold Anti-RMT Safeguards",
      "source": "Warcraft Tavern & Method.gg",
      "sourceType": "tavern",
      "author": "Venruki & Blizzard Integrity Desk",
      "date": "October 17, 2026",
      "tag": "Esports & Competitive Meta",
      "summary": "Day 2 of Venruki's $100k duel tournament introduces dedicated Durotar arena staging while Blizzard activates a mandatory 2-hour trade hold on high-value items and gold transfers as anti-RMT safeguards.",
      "content": `The penultimate day of Venruki's $100,000 Level 30 Duel Championship brought crucial arena improvements and anti-exploit enforcement:
• Dedicated Durotar Duel Arena:
  - Blizzard operations spawned physical barricades and referee boundaries outside Orgrimmar to eliminate spectator interference and guarantee flawless duel line-of-sight.
  - Spectators and duelists alike praised the reduced server latency and dedicated combat phase zone.
• 2-Hour High-Value Trade Hold Anti-RMT Safeguards:
  - Blizzard deployed an aggressive live integrity protection: any high-value trade or excessive gold transfer triggers a 2-hour escrow hold with automated flag checks.
  - Ensures tournament stakes and public realm economies remain strictly insulated from third-party gold sellers and illicit wagering.
• Final 8 Championship Bracket:
  - Snutz (Warlock), Mes (Warrior), Bean (Druid), and Sonii (Paladin) advance to Championship Sunday, demonstrating master-class cooldown usage at the Level 30 cap.`,
      "url": "https://www.warcrafttavern.com/forever/news/venruki-100k-duel-championship-day-2-anti-rmt/"
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
      "id": "news-49",
      "title": "Venruki $100,000 Duel Championship Day 1 Kicks Off: Opening Round Upsets, Ruthless Human & Earth Fury Dwarf Meta in Durotar",
      "source": "Warcraft Tavern & Method.gg",
      "sourceType": "tavern",
      "author": "Venruki & Method Esports Desk",
      "date": "October 17, 2026",
      "tag": "Esports & Competitive Meta",
      "summary": "The $100,000 Level 30 Duel Championship is officially underway outside Orgrimmar, with 64 gladiators battling inside the chalk ring as the newly overhauled racial abilities and Build 1.60.1.70425 class rebalances redefine competitive 1v1 pacing.",
      "content": `The opening day of Venruki's $100,000 Level 30 Duel Championship has kicked off outside the Gates of Orgrimmar before a live Twitch audience of over 85,000 concurrent viewers:
• Marquee Day 1 Matchup Highlights:
  - Snutz (Affliction Drain Warlock) def. Whaazz (Subtlety Stunlock Rogue) 2-1: In an epic game 3 duel, Snutz survived a 14-second stunlock chain with 84 health remaining before Siphon Life and Death Coil attrition turned the tide.
  - Mes (Arms Spearing Strike Warrior) def. Ziqo (Battle Mage) 2-0: Mes utilized Deep Wounds bleed tick timing and Shield Block to mitigate Shatter combos.
  - Bean (Feral Powershift Druid) def. Pikaboo (Combat/Subtlety Hybrid) 2-1: Travel Form kiting inside the 40-yard chalk circle outlasted Rogue cooldown resets.
• Racial & Rebalance Meta Analysis:
  - The permanent removal of weapon specialization racials in Build 1.60.1.70425 has dramatically reshaped tournament loadouts.
  - Alliance competitors utilizing Human 'Ruthless' (+2% all crit) and Dwarf 'Earth Fury' (+2% crit bonus) displayed lethal burst potential against Horde endurance setups.
  - Shaman gladiators leveraging Lava Burst at Row 5 produced the highest single-GCD damage spikes of the tournament.
• Championship Sunday Schedule:
  - Upper Bracket Quarterfinals, Lower Bracket elimination rounds, and the Best-of-7 Grand Finals will broadcast tomorrow, Sunday, October 18 at 10:00 PDT on Twitch.tv/Venruki.`,
      "url": "https://www.warcrafttavern.com/forever/news/venruki-100k-duel-championship-day-1-recap/"
    },
    {
      "id": "news-48",
      "title": "Tradeskill Compendium: Complete 1-300 Leveling Roadmaps, Reagent Acquisition Engine & 48 Classic Gathering Circuit Maps Live",
      "source": "Wowhead Tradeskill Wire",
      "sourceType": "wowhead",
      "author": "Wowhead Professions & Economy Team",
      "date": "October 17, 2026",
      "tag": "Professions & Economy",
      "summary": "All 13 primary and secondary professions receive comprehensive 1-300 leveling roadmaps, hybrid vendor and mob-drop reagent acquisition trees, and 48 classic terrain gathering route maps with curved flightpaths ahead of November 4 launch.",
      "content": `Ahead of the November 4 global launch, Wowhead and the community tradeskill guild network have deployed the definitive Level 1–300 Professions Engine:
• Complete 1–300 Step-by-Step Leveling Guides:
  - Master leveling roadmaps across all 13 professions (Blacksmithing, Engineering, Alchemy, Leatherworking, Tailoring, Enchanting, Mining, Herbalism, Skinning, Cooking, First Aid, Fishing, and Survival).
  - Exact material shopping lists, optimal orange/yellow craft spans, and minimal-waste training tiers from Apprentice through Artisan.
• Interactive Classic Gathering Circuit Maps:
  - 48 hand-calibrated classic zone route maps featuring smooth Bezier curved vectors optimized for Herbalism, Mining, and Skinning.
  - High-density node loops covering Elwynn, Durotar, Westfall, Barrens, Hillsbrad Foothills, Arathi Highlands, and Stranglethorn Vale.
• Hybrid Reagent Acquisition Engine:
  - Full coordinate breakdowns for 80+ specialty tradeskill vendors (fluxes, thread, vials, bleaching powder, and limited-stock recipes).
  - Mob drop rate tables and dedicated fishing waters tabs separating inland freshwater pools from coastal saltwater yields.
• Launch Preparation Tips:
  - Economic guidance on day-one gathering specializations and deterministic Merchant's Favor quartermaster investments.`,
      "url": "https://www.wowhead.com/forever/news/tradeskill-compendium-1-300-leveling-roadmaps-gathering-circuits"
    },
    {
      "id": "news-47",
      "title": "Beta Build 1.60.1.70425 Post-Deployment Hotfixes: Shaman Lava Burst & Water Shield Polish, Dark Inspiration Persistence & Megarealm Capacity",
      "source": "Blizzard Official / Blue Post",
      "sourceType": "blizzard",
      "author": "Community Manager Kaivax",
      "date": "October 17, 2026",
      "tag": "Patch Notes & Hotfixes",
      "summary": "Blizzard operations deploy server-side hotfixes across all beta realms, refining Shaman spell interactions, fixing Priest Dark Inspiration persistence through resurrection, and expanding realm capacity for weekend tournament traffic and tomorrow's Hallow's End launch.",
      "content": `Blizzard engineers rolled out targeted server hotfixes this morning across all active test megarealms following telemetry from Thursday's Build 1.60.1.70425 deployment:
• Class Mechanics & Spell Tuning:
  - Shaman: Fixed an interaction where Water Shield charges did not consistently replenish on certain Nature spell critical strikes. Smoothed damage progression for Lava Burst across ranks 1–4.
  - Priest: Corrected an issue where the Dark Inspiration 5-rank spell damage aura could drop upon resurrection or cross-zone teleportation.
  - Paladin: Revoke threat reduction now registers immediately on threat-tracking frames without requiring a target cycle.
  - Racials: Verified that Human 'Ruthless' (+2% crit) and Dwarf 'Earth Fury' (+2% crit damage/healing bonus) scale accurately with off-hand weapon swings and hybrid healing spells.
• Megarealm Infrastructure & Spectator Tuning:
  - Scaled public test realm capacity and reduced input queuing latency outside the Gates of Orgrimmar to accommodate high spectator traffic during the Venruki $100k Tournament.
• Seasonal Event Deployment:
  - Staged encounter data and loot tables for the Level 30 'Shade of the Headless Rider' in Scarlet Monastery Graveyard, scheduled to unlock tomorrow, Sunday, October 18 at 10:00 PDT for Hallow's End!`,
      "url": "https://news.blizzard.com/en-us/world-of-warcraft/beta-build-1601-70425-hotfixes-oct17"
    },
    {
      "id": "news-46",
      "title": "In-Game Companion Addon Suite Maintenance Update: ForeverPlates v2.1.1, ForeverLiquid v1.3.1 & ForeverDungeonJournal v1.6.2 Released",
      "source": "WoW Forever Addon Engineering",
      "sourceType": "blizzard",
      "author": "Lead UI Architect Exehn & Marcus",
      "date": "October 16, 2026",
      "tag": "Addon Development & UI Tools",
      "summary": "Maintenance update for the official companion addon suite rolling out for Camelot 12.0 engine and TOC 16001 standards, delivering combat nameplate stability, rested XP velocity calibration, and modularized dungeon journal maps.",
      "content": `A synchronized maintenance update has been packaged and published for the official WoW Forever companion addon suite:
• ForeverPlates (v2.1.1):
  - Calibrated unit nameplate anchoring to prevent micro-stutter during high-density AoE trash packs in Excavation Site 4 and City of Dalaran.
  - Refined threat boundary coloring and off-screen clamping vectors.
• Foreverplatescastbars (v2.2.1):
  - Fixed sub-pixel castbar border clipping and aligned target spell icons with classic 1px borders.
• ForeverLiquid (v1.3.1):
  - Updated the Obsidian Drawer rested XP projection curve for Level 20–30 leveling velocity.
  - Mount Savings Fund countdown updated to track 100g and 1000g milestone targets simultaneously.
• ForeverDungeonJournal (v1.6.2):
  - Verified modular 64-file architecture with TOC 16001 compatibility for the Camelot 12.0 client engine.
  - Updated sub-pixel map coordinates for the Dalaran Underbelly entrance and Relic Guardian encounter in Excavation Site 4.
• Compliance & Verification:
  - 100% pass on all 120 automated TOC, Lua syntax, and FrameXML integrity audits, ensuring zero combat taint under 12.0 secret value constraints.`,
      "url": "https://news.blizzard.com/en-us/world-of-warcraft/companion-addon-suite-v211-release-oct16"
    },
    {
      "id": "news-45",
      "title": "Beta Build 1.60.1.70425 Deployed: Sixteenth Beta Build Delivers 128 System Updates, Major Talent Tree Rebalancing & Racial Ability Overhaul",
      "source": "Blizzard Official / Blue Post",
      "sourceType": "blizzard",
      "author": "Community Manager Kaivax & Lead Systems Designer",
      "date": "October 15, 2026",
      "tag": "Patch Notes & Class Tuning",
      "summary": "The sixteenth official WoW Forever beta client build (1.60.1.70425) rolls out today, delivering 128 datamined updates across all classes: complete reworks to Shaman, Mage, Priest, and Warlock talent trees, retirement of weapon specialization racials in favor of Ruthless, Earth Fury, and Savage, and raid-wide utility for Battle Shout and Shaman stat totems.",
      "content": `Blizzard operations deployed Beta Build 1.60.1.70425 (Sixteenth Beta Build) across all public test megarealms today, October 15, 2026. This monumental update synchronizes 128 balance and systems adjustments cataloged by Talents Forever:

• Section 1: Talent Tree Overhauls (69 Talent Modifications):
  - Shaman (Elemental Rebuild & Restoration Quality-of-Life):
    * Elemental Mastery restored to its rightful place as the 31-point capstone talent (Row 7).
    * Lava Burst moved to Row 5 (4 ranks, 21-point capstone) with its prerequisite requirement removed, enabling Level 30 Elemental Shamans to access this signature burst spell.
    * Prerequisite chain updated: Elemental Fury now requires Lightning Overload (Row 5), which requires Elemental Alacrity (Row 2).
    * Elemental Alacrity repositioned to Row 2; Elemental Warding moved to Row 3.
    * Call of Thunder permanently removed from the Elemental talent tree.
    * Earthbound repositioned to Row 4; Improved Fire Nova renamed to Trial by Fire.
    * Restoration: Swapped Tidal Focus (now Row 2) and Totemic Focus (now Row 1) to streamline early healing efficiency.
  - Mage (Arcane & Fire Realignment):
    * New talent Arcane Wrath added to Row 4 (1 rank).
    * Missile Barrage relocated to Row 1 (2 ranks) for rapid early-game rotation empowerment.
    * Wake of Fire renamed to Improved Fire Blast.
    * Rescaled Fire Power to 3 ranks and Critical Mass to 5 ranks.
    * Winter's Chill and Ice Lance updated to guarantee unresisted debuff application.
  - Priest (Shadow & Discipline Restructuring):
    * New talent Dark Inspiration added to Row 4 (5 ranks), replacing Improved Fade.
    * Shadow Affinity permanently removed.
    * Improved Mind Blast and Mental Strength moved to Row 2.
    * Improved Power Word: Shield relocated to Row 3.
    * Vampiric Embrace cooldown slashed to 30 seconds.
  - Warlock (Affliction Range & Mobility):
    * Malediction replaced by Grim Reach (Row 4, 2 ranks, increasing Affliction spell range by 10/20%).
    * Shadow Mastery and Destructive Reach updated.
  - Paladin, Hunter, Druid & Warrior:
    * Reckoning updated: stores up to 4 extra charges and triggers on weapon swing.
    * Tuning passes to Shield Specialization, Champion of the Light, Rapid Recuperation, Predator's Edge, Furor, and Bloodthrill.

• Section 2: Racial Abilities Rework (12 Major Adjustments):
  - Removal of Legacy Weapon Racials: Sword Specialization (Human), Mace Specialization (Dwarf), and Axe Specialization (Orc) have been permanently retired to eliminate weapon-type pigeonholing.
  - Modern Universal Replacement Racials:
    * Human: 'Ruthless' (+2% critical strike chance with all spells and physical attacks).
    * Dwarf: 'Earth Fury' (+2% critical strike bonus to damage and healing).
    * Orc: 'Savage' (+1% critical strike chance with all spells and abilities).
    * Skyborne: 'Read Leyline' (2-second cast, 2-minute cooldown; grants +100% mana/health regeneration for 30s, extended to 15m near active leylines).
  - Racial Mechanical Refinements:
    * Gnome: Eureka! revamped into an 8-second active buff with no charges that amplifies damage, healing, and Power Word: Shield absorb values.
    * Refined mechanics for Blood Fury, Shatter Curse, Cultivation, Endurance, Plainsrunning, War Stomp, Regeneration, and Touch of the Grave.

• Section 3: Spells, Baseline Abilities & Raid Utility (47 System Changes):
  - Battle Shout is now Raid-wide (40 yards).
  - Shaman Stat Totems (Windfury, Grace of Air, Strength of Earth, Flametongue) are now Raid-wide, and mutual exclusivity between Grace of Air and Windfury/Flametongue has been removed.
  - Paladin Salvation & Mass Salvation now replace passive threat blessings, accompanied by the new threat-clearing utility spell Revoke.
  - Righteous Fury baseline Holy threat amplification increased to 90%.
  - Devouring Plague cooldown reduced to 24s; Shadow Word: Death cooldown reduced to 18s.
  - Chain Lightning mana cost reduced by 35%; Fire Nova tuned; Stormstrike base mana cost set to 8%; Water Shield charges now trigger on all spell critical strikes.`,
      "url": "https://news.blizzard.com/en-us/world-of-warcraft/beta-build-1601-70425-patch-notes-oct15"
    },
    {
      "id": "news-44",
      "title": "Final Week of Closed Beta Begins: End-of-Beta World Finale Announced for October 21 & Global Launch Name Reservation Details",
      "source": "Blizzard Official / Blue Post",
      "sourceType": "blizzard",
      "author": "Executive Producer Holly Longdale & Kaivax",
      "date": "October 15, 2026",
      "tag": "Official Announcement",
      "summary": "With 6 days remaining in the 35-day Closed Beta, Blizzard announces the 'Twilight of the First Realm' End-of-Beta finale event for October 21 and confirms the pre-launch character wipe and ruleset name reservation timeline ahead of November 4.",
      "content": `As World of Warcraft: Forever enters the 5th and final week of Closed Beta (Day 29 of 35), Blizzard has published the closing beta schedule and launch transition roadmap:
• End-of-Beta Finale Event — 'Twilight of the First Realm' (October 21, 18:00 PDT):
  - Colossal Ragnaros, Onyxia, and Dreadlord Mal'Ganis world bosses will invade Stormwind, Orgrimmar, Southshore, and the Dalaran perimeter during the final 6 hours of Beta.
  - Participating at Level 30 during the finale awards the account-wide 'Vanguard of the Living World' commemorative feat of strength on live realms.
• Server Reset & Launch Preparation (October 22 – November 3):
  - All Beta characters, banks, and test realms will be wiped at 23:59 PDT on October 21.
  - Global Character Name Reservation opens October 30 at 10:00 PDT for active subscribers across the 3 launch megarealm rulesets (Normal PvE, PvP, and Roleplay).
• Global Launch Confirmation:
  - World of Warcraft: Forever launches globally on November 4, 2026 at 15:00 PST with the full Level 60 cap, 9 new Forever dungeons, and 16 account-wide Legacy Points.`,
      "url": "https://news.blizzard.com/en-us/world-of-warcraft/forever-final-beta-week-and-launch-schedule"
    },
    {
      "id": "news-43",
      "title": "Hallow's End Arrives October 18 in Closed Beta: Wickerman Embers (+10% XP/Rep), Scarlet Graveyard Specter & Pumpkin Treat Bags",
      "source": "Wowhead",
      "sourceType": "wowhead",
      "author": "Wowhead Seasonal Events Team",
      "date": "October 14, 2026",
      "tag": "World Events & Holidays",
      "summary": "Hallow's End goes live across all Beta megarealms this Sunday, October 18, featuring the Classic+ Headless Specter encounter in Scarlet Monastery Graveyard, 16-slot Pumpkin Bags, and the +25% Stamina/Spirit Wickerman festival buff.",
      "content": `The final seasonal test event of Closed Beta — Hallow's End — activates this Sunday, October 18 at 10:00 PDT:
• Classic+ Scarlet Monastery Graveyard Event:
  - A specially scaled Level 30 'Shade of the Headless Rider' can be summoned once daily inside the Scarlet Monastery Graveyard courtyard during Hallow's End.
  - Drops 3 guaranteed Rare (iLvl 35) signet rings (+8 Stamina, +12 Attack Power or +9 Spell Power) and the 'Hallowed Pumpkin Lantern' off-hand.
• Invocation of the Wickerman (Tirisfal Glades & Southshore Border):
  - Visiting the burning Wickerman ceremony at dusk grants 'Invocation of the Wickerman' (+25% Stamina & Spirit regeneration and +10% Experience/Reputation for 2 hours), stacking with the Cozy Sleeping Bag!
• Innkeeper Trick-or-Treating & 16-Slot Pumpkin Bags:
  - Speak with capital and town innkeepers every 60 minutes for Treat Bags containing Hallowed Wands, weighted Jack-o'-Lanterns, and a heightened beta drop rate on the 16-Slot Pumpkin Bag.`,
      "url": "https://www.wowhead.com/forever/news/hallows-end-october-18-beta-preview-wickerman-rewards"
    },
    {
      "id": "news-42",
      "title": "Venruki $100k Duel Championship Gear Lock-In Complete: Final BiS Loadouts & Matchup Odds Ahead of Saturday Kickoff",
      "source": "Warcraft Tavern & Method.gg",
      "sourceType": "tavern",
      "author": "Warcraft Tavern Competitive Desk",
      "date": "October 13, 2026",
      "tag": "Esports & Competitive Meta",
      "summary": "All 64 competitors have locked in their final Level 30 equipment profiles for this weekend's $100,000 Durotar Duel Championship, with 88% of casters equipping Lorekeeper's Binding and melee gladiators favoring Enchant Weapon - Revelation.",
      "content": `Equipment inspection lock-in has concluded for all 64 competitors ahead of Saturday's $100,000 Level 30 Duel Championship (October 17–18):
• Universal BiS Trends Across the 64-Player Field:
  - Lorekeeper's Binding (+7 All Stats Ring from 40/40 Library Books) is equipped by 56 of the 64 tournament qualifiers (87.5% adoption rate).
  - Rank 4 Sergeant's Cloak and Insignia trinket are mandatory across every single profile following Phase 2 Honor cap completion.
  - Enchant Weapon - Revelation (45 Merchant's Favor) is the #1 weapon enchant among Hybrid Paladins, Feral Druids, and Battle Mages.
• Marquee Opening Round Matchups (Saturday, Oct 17 at 10:00 PDT):
  - Snutz (Affliction Drain Warlock) vs. Whaazz (Subtlety Stunlock Rogue)
  - Ziqo (Battle Mage / Coldflame Saber) vs. Mes (Arms Spearing Strike Warrior)
  - Bean (Feral Powershift Druid) vs. Pikaboo (Combat/Subtlety Hybrid Rogue)`,
      "url": "https://www.warcrafttavern.com/forever/news/venruki-100k-tournament-gear-lock-in-analysis/"
    },
    {
      "id": "news-41",
      "title": "Hotfix Build 1.60.6.72140: Excavation Site 4 Threat Reset Window Increased, Dalaran Spell Reflect Reduction & Warsong Overtime Tuning",
      "source": "Blizzard Official / Blue Post",
      "sourceType": "blizzard",
      "author": "Community Manager Kaivax",
      "date": "October 12, 2026",
      "tag": "Maintenance & Hotfixes",
      "summary": "Blizzard deploys server hotfixes today addressing Relic Guardian threat mechanics in Excavation Site 4, reducing Overseer Kaelen's spell reflection in City of Dalaran, and introducing diminishing returns to flag carrier survival stalls in Warsong Gulch.",
      "content": `Blizzard operations deployed server hotfix Build 1.60.6.72140 across all beta megarealms this morning following Phase 2 encounter feedback:
• Excavation Site 4 Boss Tuning:
  - Relic Guardian: The internal cooldown between 'Threat Protocol Reset' casts was increased from 20 seconds to 30 seconds, giving tanks sufficient GCD recovery time to taunt before burst DPS take lethal damage.
  - Titan Relic Quest Item: Now drops with 100% certainty for every eligible party member on the kill rather than requiring individual group rolls.
• City of Dalaran (Alterac Mountains) Adjustments:
  - Overseer Kaelen: 'Arcane Barrier' spell reflection was lowered from 50% down to 35% damage return, reducing caster self-kill spikes during execute windows.
  - Violet Leyline Crystals: Leyline resonance power buff duration inside the catacombs was increased from 10 minutes to 15 minutes.
• Warsong Gulch Flag Carrier Balancing:
  - Added escalating physical vulnerability (+10% damage taken per stack) after 5 stacks of Focused Assault to prevent prolonged Feral Druid bear stall matches in overtime.
• Profession & Downranking Tooltip Polish:
  - Corrected reagent cost displays for 150+ Blacksmithing and Engineering crafts, ensuring live inventory counts accurately reflect required bars and fluxes.`,
      "url": "https://news.blizzard.com/en-us/world-of-warcraft/beta-hotfixes-build-72140-oct12"
    },
    {
      "id": "news-40",
      "title": "Venruki $100,000 Level 30 Duel Championship: Official 64-Player Bracket & Seeding Revealed for October 17–18",
      "source": "Method.gg & Warcraft Tavern",
      "sourceType": "method",
      "author": "Method Esports & Venruki",
      "date": "October 11, 2026",
      "tag": "Esports & Competitive Meta",
      "summary": "Host Venruki and tournament organizers reveal the official 64-gladiator bracket for the upcoming $100,000 Level 30 Duel Championship outside Orgrimmar, detailing class breakdown, seeding matchups, and chalk-ring tournament rules.",
      "content": `The championship bracket for the $100,000 Level 30 Duel Championship hosted by Venruki has been officially unveiled:
• Tournament Schedule & Broadcast: Streaming live October 17–18, 2026 starting at 10:00 PDT on Twitch.tv/Venruki with casting desk commentary from Cdew and Ziqo.
• 64-Player Class Distribution Breakdown:
  - Feral Druid: 14 gladiators (dominant bracket favorite with Travel Form and Frenzied Regeneration).
  - Arms Warrior: 12 gladiators (leveraging Mortal Strike, Deep Wounds, and Spearing Strike).
  - Retribution Paladin: 10 gladiators (Voice of Truth silence immunity and 5s Hammer of Justice).
  - Frost Mage: 9 gladiators (Cold Snap double Ice Block and Shatter burst).
  - Subtlety Rogue: 8 gladiators (14-second stunlock control chains).
  - Affliction Warlock: 6 gladiators (Siphon Life and Fear attrition).
  - Elemental Shaman: 3 gladiators (Lava Burst overload burst).
  - Shadow Priest: 2 gladiators (Mind Blast and SW:P attrition).
• Ring Rules & Sanctions:
  - Duels occur inside a 40-yard chalk circle at the Durotar Gates. Exiting the circle for more than 5 seconds results in an automatic match loss.
  - Zero open-world consumables (no potions, healthstones, or engineering gadgets). Only class-conjured items permitted.`,
      "url": "https://www.method.gg/wow-classic/venruki-100k-duel-tournament-bracket-reveal"
    },
    {
      "id": "news-39",
      "title": "Phase 2 Trade Economy Telemetry: 150,000 Supply Crates Logged, Pack Kodo Mount Surge & Phase 3 Stockpile Trends",
      "source": "Wowhead Economy Wire",
      "sourceType": "wowhead",
      "author": "Wowhead Economy Team",
      "date": "October 10, 2026",
      "tag": "Economy & Market Analysis",
      "summary": "Telemetry across Beta megarealms logs over 150,000 Supply Crate hand-ins at Three Corners and Crossroads, driving Heavy Leather and Iron Bar market spikes while players stockpile Phase 3 Artisan reagents.",
      "content": `Telemetry analysis from the second week of Beta Phase 2 highlights a roaring deterministic economy powered by Merchant's Favor:
• Supply Crate Ingestion Milestone:
  - Over 150,000 Supply Crates have been filled and redeemed at the Azeroth Commerce Authority (Redridge Mountains) and Durotar Supply Logistics (The Barrens).
  - Top Redeemed Quartermaster Items: The 14-Slot Kirin Tor Satchel (Account-Bound) accounts for 42% of total Favor spent, followed by the Pack Kodo Ground Mount (6,000 Favor, 28%) and blue Level 28–30 pre-BiS weapons (18%).
• Commodity Market Fluctuations:
  - Heavy Leather: Reached peak demand as leatherworkers craft camping field stations, stabilizing at 18 Silver per piece.
  - Iron Bars & Heavy Stone: Heavy Blasting Powder and dynamite manufacturing for Warsong Gulch keep Iron prices elevated across all realm auction houses.
• Phase 3 Stockpiling Strategy:
  - Forward-thinking guilds have begun filling bank alts with Mithril Ore, Mageweave Cloth, and Thick Leather ahead of the anticipated Phase 3 Level 35 Artisan tradeskill expansion.`,
      "url": "https://www.wowhead.com/forever/news/phase-2-economy-telemetry-supply-crates-pack-kodo"
    },
    {
      "id": "news-38",
      "title": "Warcraft Tavern Field Report: First Realm 40/40 Library Books Completed & Lorekeeper's Binding Ring Claimed",
      "source": "Warcraft Tavern",
      "sourceType": "tavern",
      "author": "Warcraft Tavern Exploration Team",
      "date": "October 9, 2026",
      "tag": "Exploration & Secrets",
      "summary": "An intrepid guild expedition team on the NA megarealm achieves the world's first complete collection of all 40 hidden library books across Stormwind, Ironforge, Undercity, and Dalaran, unlocking the +7 All Stats Lorekeeper's Binding ring.",
      "content": `The mystery of Azeroth's hidden ancient tomes has reached a historic milestone:
• 40/40 Tomes Discovered: An exploration guild team successfully mapped and collected all 40 hidden manuscripts across Stormwind Royal Library, Ironforge Hall of Explorers, Undercity Apothecarium, and the Dalaran Underbelly sewer intake.
• Scholar of the First Realm Unlocked:
  - Claimed the unique server feat of strength achievement 'Scholar of the First Realm'.
  - Awarded the coveted 'Lorekeeper's Binding' (Rare Ring: +7 Strength, +7 Agility, +7 Stamina, +7 Intellect, +7 Spirit) — currently the highest item-budget ring in Phase 2.
• Interactive Guide Released:
  - Warcraft Tavern published complete coordinate markers, interact-key guidance, and navigation paths for all 40 tomes to assist leveling players in claiming the 10, 20, and 30-book milestone accessories.`,
      "url": "https://www.warcrafttavern.com/forever/news/first-realm-40-library-books-lorekeepers-binding/"
    },
    {
      "id": "news-36",
      "title": "Beta Build 1.60.6 Deployed: Blizzard Expands Native Cooldown Manager Across All Classes, Elevating Essential Cooldown & Buff Tracking Without UI Taint",
      "source": "Blizzard Official / Patch Notes",
      "sourceType": "blizzard",
      "author": "Lead Systems Designer & UI Team",
      "date": "October 8, 2026",
      "tag": "Major Engine & UI Patch",
      "summary": "Beta Build 1.60.6.71890 rolls out across megarealms today, delivering the highly anticipated expansion of Blizzard's native Cooldown Manager to all 9 classes with Edit Mode customization, proc tracking, and zero in-combat UI taint.",
      "content": `Blizzard Entertainment has deployed client Build 1.60.6.71890 for World of Warcraft: Forever closed beta, bringing a monumental expansion to the game's native combat user interface:
• Native Cooldown Manager Expanded Across All Classes: Originally tested in prototype builds for select classes, Blizzard's built-in 'Essential Cooldowns & Buffs Manager' is now fully active across all 9 classes (Warrior, Paladin, Hunter, Rogue, Priest, Shaman, Mage, Warlock, and Druid).
• Built Directly into Default UI & HUD Edit Mode: Players can freely reposition, rescale, snap, and customize their Essential Cooldown dock above action bars or beneath the Personal Resource Display.
• Comprehensive Rotational & Defensive Tracking:
  - Rotational Abilities: Tracks key rotational cooldowns (such as Mortal Strike, Bloodthirst, Shield Slam, Holy Strike, Consecration, Aimed Shot, Strider Kick, Mutilate, Penance, Mind Blast, Stormstrike 8s CD, Lava Burst, Fire Blast, Shadowburn, and Swiftmend).
  - Signature Defensives & Bursts: Monitors major survival cooldowns (Shield Wall, Retaliation, Divine Shield, Lay on Hands, Bestial Wrath, Deterrence, Vanish, Preparation, Pain Suppression, Power Infusion, Bloodlust, Ice Block, and Innervate).
  - Procs & Buff Uptimes: Displays active buff states with stacks and glowing visual highlights (Overpower ready procs, Flurry charges, The Art of War, Lock and Load, Slice and Dice timers, Surge of Light, Maelstrom Weapon 1–5 stacks, Fingers of Frost, Hot Streak, Nightfall/Shadow Trance, and Eclipse transitions).
• Immune to 12.0 <secret value> Taint: Because the Cooldown Manager executes within Blizzard's secure C++ FrameXML engine core, it formats text and renders cooldown swipes natively (via FontString:SetFormattedText and CooldownFrame_SetAura). It completely avoids the fatal Lua arithmetic errors that break third-party WeakAuras during combat encounters!`,
      "url": "https://news.blizzard.com/en-us/world-of-warcraft/beta-build-1606-patch-notes-cooldown-manager-oct8"
    },
    {
      "id": "news-37",
      "title": "Systems Theorycrafting: How Blizzard's Native Cooldown Manager Complements Companion Addons & Bypasses 12.0 Secret Value Constraints",
      "source": "Method.gg / Addon Engineering Wire",
      "sourceType": "method",
      "author": "Method Addon & Systems Lab",
      "date": "October 8, 2026",
      "tag": "Addon Architecture & Theorycrafting",
      "summary": "Technical deep dive into why addon authors should embrace Blizzard's internal Cooldown Manager for combat rotation clarity instead of rebuilding complex Lua aura frameworks, and how secret values protect against automation.",
      "content": `Following today's release of Beta Build 1.60.6, the addon development and theorycrafting community has conducted an architectural audit of the new Cooldown Manager:
• Symbiotic Addon Architecture: Addon developers are advised not to build redundant combat cooldown timers or complex aura-math engines. With In-Combat Addon Disarmament active, attempts to calculate combat aura durations in Lua crash due to 12.0 <secret value> restrictions. Leaving rotational combat widgets to Blizzard's native manager guarantees zero-taint stability.
• Specialization of Companion Addons: Custom in-house addons thrive by focusing on their core strengths:
  - ForeverPlates & Forever Nameplates Castbars: High-visibility pixel nameplates, latency tolerance markers, and dynamic threat coloring.
  - ForeverLiquid: Immersion 20-bubble liquid reservoir, leveling/rep velocity, mount savings countdown, and 5-instance/hour lockout monitor.
  - ForeverDungeonJournal: Comprehensive encounter guides, loot tables, sub-pixel calibrated maps, and boss tactics.
  - ForeverBlessings: 60-minute Paladin blessing coordinator, class assignment matrix, and live missing buff alerts.
  - EchoTwist: High-precision Windfury proc alerts, 0.4s golden Seal Twisting cadence indicator, and sub-pixel melee swing timer.
• Non-Intrusive Cosmetic Skinning: Addons can safely skin Blizzard's Cooldown Manager frames (adding crisp 1px borders via WHITE8X8 or Cyberpunk palette tints via BackdropTemplate and hooksecurefunc) without modifying combat logic or incurring execution taint.
• AI & Automation Boundary: Blizzard's secret value system intentionally locks out AI combat rotation bots and automated priority solvers. Cooldown numbers and aura durations are rendered purely via C-side formatting, making them human visual aids rather than queryable Lua APIs.`,
      "url": "https://www.method.gg/wow-classic/native-cooldown-manager-architecture-wow-forever"
    },
    {
      "id": "news-35",
      "title": "Companion Addon Suite Expansion: ForeverLiquid (Liquid XP/Rep/Ledger HUD) & ForeverDungeonJournal v1.0.7 Released for Beta",
      "source": "WoW Forever Addon Engineering / Community Spotlight",
      "sourceType": "blizzard",
      "author": "Lead UI Architect Exehn & Marcus",
      "date": "October 5, 2026",
      "tag": "Addon Development & UI Tools",
      "summary": "Official release of ForeverLiquid v1.3.0 featuring a 20-bubble Classic liquid reservoir HUD, 6 selectable cyberpunk themes, real-time gold cashflow ledger, mount savings fund countdown, and Blizzard 5/hr lockout monitor alongside the modular ForeverDungeonJournal v1.0.7 with 5 dungeon routes & boss tactics.",
      "content": "A major companion addon expansion has arrived for WoW Forever Beta Phase 2 players with the release of ForeverLiquid v1.3.0 and the modular ForeverDungeonJournal v1.0.7:\n• ForeverLiquid (v1.3.0): The ultimate cyberpunk liquid HUD engineered specifically for WoW Forever (Camelot 12.0 engine, TOC 16001). Features include:\n  - Classic 20-Bubble (5%) Liquid Reservoir: Fluid status bar with animated wave shimmer, rested XP overlay, and glowing 5% divider ticks.\n  - 6 Selectable Cyberpunk Themes: Matrix (Emerald), Cyber Void (Violet), Sunwell Core (Gold), Blood Knight (Crimson), Glacial Frost (Cyan), Carbon Minimal (Titanium).\n  - Obsidian Drawer (4 Tabs): Live Leveling/Rep Velocity, Mount Savings Fund Tracker (100g/1000g goals with live ETA countdown), Cashflow Ledger (Gross Income vs Repairs/Flight/Vendor expenses), Recent Loot Feed, Blizzard 5-Instance/Hour Lockout Monitor, and Alt Roster 2.0 with dynamic offline rested XP prediction.\n  - Camelot 12.0 Engine Guard: Completely eliminates the 12.0 FrameXML <secret number> comparison bug in TextStatusBar.lua:110 via recursive tree guarding and CharacterMicroButton delegation.\n• ForeverDungeonJournal (v1.0.7 / v1.3.0 Architecture): Fully modularized into specialized runtime components, adding full boss tactics, spell IDs, role-specific guidance (Tank/Healer/DPS), announcement macros, and cross-faction travel routes for all 5 leveling dungeons (Deadmines, Wailing Caverns, Shadowfang Keep, Blackfathom Deeps, The Stockade) alongside Excavation Site 4, City of Dalaran, Hall of Thanes, and Ruins of Lordaeron.",
      "url": "https://news.blizzard.com/en-us/world-of-warcraft/companion-addons-foreverliquid-foreverjournal-oct5"
    },
    {
      "id": "news-34",
      "title": "Beta Phase 2 First Weekend Telemetry: Excavation Site 4 Saboteur Encounters, Dalaran Violet Vaults & Level 30 Pre-BiS Meta",
      "source": "Wowhead & Warcraft Tavern",
      "sourceType": "wowhead",
      "author": "Wowhead Theorycrafting Team",
      "date": "October 3, 2026",
      "tag": "Dungeons & Theorycrafting",
      "summary": "Following the first 48 hours of Level 30 cap progression, players uncover powerful Excavation Site 4 Titan relics, Kirin Tor vault secrets under Dalaran, and the dominance of 21-point capstones in the Warsong Gulch 20–29 bracket.",
      "content": "Telemetry analysis from the first weekend of Phase 2 testing reveals significant progression milestones and meta shifts across beta megarealms:\n• Excavation Site 4 (Wetlands): Sentinel Archeus has emerged as a premier gear check. The rare caster trinket 'Archeus Core Talisman' (+14 Arcane/Nature spell damage + mana on cast) is currently ranked best-in-slot for Balance Druids and Arcane Mages. Dark Iron Saboteurs require focused crowd control due to high-damage explosive dynamite volleys.\n• City of Dalaran - Under Siege (Alterac Mountains): The Kirin Tor subterranean vaults present complex encounter mechanics: Shade of the Archmage's channeled Blizzard demands rapid positional rotation, while the Arcane Anomaly's 'Mana Singularity' forces mana users to spread beyond 15 yards to avoid group-wide detonation.\n• 21-Point Talent Spike: The expansion to 21 talent points has radically altered class dynamics. Arms Warriors wielding Mortal Strike, Rogues with Preparation resets, and Paladins utilizing Consecration / Holy Shock are dominating the active 20–29 Warsong Gulch battleground bracket.\n• Tier 2 Camping in High Demand: Groups entering Excavation Site 4 and Dalaran are actively seeking Survivalists with Ironwood Campfires for the +10% primary stat feast buff and 90-minute campfire aura.",
      "url": "https://www.wowhead.com/forever/news/phase-2-first-weekend-telemetry-excavation-site-4-dalaran"
    },
    {
      "id": "news-33",
      "title": "Hotfix Build 1.60.5.71210: Dark Iron Saboteur Respawn Tuning & Brewfest Final Weekend Alert",
      "source": "Blizzard Official / Blue Post",
      "sourceType": "blizzard",
      "author": "Community Manager Kaivax",
      "date": "October 2, 2026",
      "tag": "Maintenance & Hotfixes",
      "summary": "Blizzard deploys server hotfixes adjusting Saboteur density in Excavation Site 4, smoothing Alterac Mountain terrain collisions, and issuing a reminder that Brewfest activities conclude on Tuesday, October 6.",
      "content": "Blizzard deployed client hotfix Build 1.60.5.71210 following player feedback during Phase 2 opening hours:\n• Excavation Site 4 Saboteur Tuning: The respawn interval for Dark Iron Saboteur patrols inside the excavation trenches has been lengthened from 90 seconds to 180 seconds, ensuring wiping groups have adequate time to recover without being cornered at the entrance.\n• City of Dalaran Geometry Polish: Resolved terrain collision snags along the southern Kirin Tor gate in Alterac Mountains where players could become stuck while navigating toward the dungeon portal.\n• Brewfest Final Notice: Brewfest celebration grounds outside Ironforge and Orgrimmar will officially pack up at 23:59 realm time on Tuesday, October 6. Players are advised to turn in outstanding Brewfest Prize Tokens for commemorative steins and trinkets before maintenance.",
      "url": "https://news.blizzard.com/en-us/world-of-warcraft/beta-hotfixes-build-71210-oct2"
    },
    {
      "id": "news-32",
      "title": "Phase 2 Deploys Today: Level Cap Raised to 30, Patch 1.60.5 Maintenance & Content Unlock",
      "source": "Blizzard Official / Blue Post",
      "sourceType": "blizzard",
      "author": "Lead Designer Josh \"Aggrend\" Greenfield",
      "date": "October 1, 2026",
      "tag": "Maintenance & Patch Notes",
      "summary": "Blizzard announces Beta Phase 2 goes live today, October 1, 2026! Realm maintenance later today deploys Build 1.60.5.71180, raising the level cap to 30, opening Excavation Site 4 and City of Dalaran, and activating the 20–29 Warsong Gulch bracket.",
      "content": "Blizzard operations announced that Beta Phase 2 is launching today, October 1, 2026, following a brief scheduled maintenance window scheduled for 14:00–16:00 PDT:\n• Level Cap Raised to 30: The level cap immediately increases from 20 to 30 across all beta megarealms upon realm startup. Existing Level 20 characters will begin accumulating experience immediately toward Level 30 without requiring character resets.\n• Client Build 1.60.5.71180: Deploys performance optimizations for ray-traced lighting, memory handling during multi-zone shard transfers, and upgraded 12.0 Lua API bindings for addon authors.\n• Two New Leveling Dungeons:\n  - Excavation Site 4 (Level 24–30): Located deep in the Wetlands marshes, featuring Dark Iron saboteurs, Titan constructs, and Sentinel Archeus.\n  - City of Dalaran - Under Siege (Level 28–34): Located in Alterac Mountains, delving into the Kirin Tor subterranean vaults and arcane anomalies before the violet bubble was constructed.\n• Warsong Gulch 20–29 Bracket: The 20–29 battleground queue is now live, featuring updated Phase 2 PvP insignias and honor calculations.\n• Tier 2 Camping Blueprints: Survivalists can now acquire Ironwood Campfires (+10% stat boost bowls, 90-minute aura) and Silk Tents from profession trainers starting at Level 20 with 75 skill.\n• Wave 4 Beta Invitations: Another batch of beta invitations has been dispatched to accommodate the higher level zones and dungeon testing concurrency.",
      "url": "https://news.blizzard.com/en-us/world-of-warcraft/beta-phase-2-level-30-cap-patch-1605-oct1"
    },
    {
      "id": "news-31",
      "title": "Wowhead Patch 1.60.5 Datamining: Excavation Site 4 Loot Tables, Level 30 Talent Builds & Dalaran Mechanics",
      "source": "Wowhead",
      "sourceType": "wowhead",
      "author": "Wowhead Datamining Team",
      "date": "October 1, 2026",
      "tag": "Datamining & Patch Notes",
      "summary": "Full datamining breakdown of today's Phase 2 client patch: Titan-forged weapon procs in Excavation Site 4, Kirin Tor vault encounters in Dalaran, Level 21–30 talent allocations, and 150 profession caps.",
      "content": "Datamining of client build 1.60.5.71180 deployed for today's Phase 2 level cap unlock reveals critical itemization and class mechanics:\n• Excavation Site 4 Loot Tables:\n  - Archeus Core Talisman: Rare caster trinket granting +14 Arcane/Nature spell damage and mana restoration on spell cast.\n  - Titan-Forged Greaves: Heavy plate boots with +7 Strength, +6 Stamina, and +1% Hit.\n  - Relic Smasher: 2H Mace with high top-end damage and a 2% chance on hit to trigger an Earth Ward.\n• City of Dalaran (Alterac Mountains) Boss Abilities:\n  - Arcane Anomaly: Casts Mana Singularity, draining mana from ranged casters and empowering nearby constructs.\n  - Shade of the Archmage: Channels Blizzard and Mass Invisibility, requiring precise positioning and group crowd control.\n• Level 21–30 Talent Expansion: Players now have access to 21 total talent points (up from 11), unlocking pivotal 21-point capstones like Mortal Strike (Warrior), Preparation (Rogue), Consecration/Holy Shock (Paladin), and Shadowform (Priest).\n• Profession Cap 150 (Expert): Trainers across Ironforge, Stormwind, Orgrimmar, and Undercity now train Expert recipes (75–150), enabling Iron weapons, Silk bandages, and Greater Healing Potions.",
      "url": "https://www.wowhead.com/forever/news/patch-1605-datamining-excavation-site-4-loot-level-30-talents"
    },
    {
      "id": "news-30",
      "title": "Tuesday Maintenance & Build 1.60.4 Hotfixes: Hall of Thanes Tuning, Warsong Honor Rollover & Shard Consolidation",
      "source": "Blizzard Official / Blue Post",
      "sourceType": "blizzard",
      "author": "Community Manager Kaivax",
      "date": "September 29, 2026",
      "tag": "Maintenance & Patch Notes",
      "summary": "Blizzard completes Tuesday weekly maintenance and rolls out Build 1.60.4 hotfixes: Hall of Thanes boss ability adjustments, the first Phase 1 Warsong Gulch honor rollover, dynamic shard layering optimizations, and Harvest Festival conclusion notices.",
      "content": "Blizzard operations completed scheduled Tuesday weekly maintenance across all North American and European WoW Forever beta megarealms, deploying client hotfix Build 1.60.4.70615:\n• Hall of Thanes Encounter Tuning: High Thane Thauris' 'Shattering Stomp' physical vulnerability debuff duration was reduced from 45 seconds down to 30 seconds to ease spike damage taken by Level 20 tanks. In addition, Ironforge Sentry patrol speed was reduced by 15% to prevent accidental multi-pulls during hallway clearing.\n• Phase 1 Warsong Gulch Honor Rollover: The beta realms processed their first weekly honor calculations for the Level 10–19 Warsong Gulch bracket. Active skirmishers can now inspect their initial rank standings (Private / Scout) and purchase rank-appropriate PvP insignias from faction vendors.\n• Dynamic Shard Consolidation: Starting zones (Zephras Isle, Tirisfal Glades, Elwynn Forest, and Dun Morogh) received enhanced clustering logic to automatically group party members and guildmates onto matching shards upon zone transitions.\n• Harvest Festival Notice: Festive food offerings and honorific quests outside Ironforge and Orgrimmar conclude at 23:59 realm time tonight (September 29). Brewfest activities remain active through October 6.",
      "url": "https://news.blizzard.com/en-us/world-of-warcraft/beta-weekly-maintenance-hotfixes-sep29"
    },
    {
      "id": "news-29",
      "title": "Warcraft Tavern Phase 2 Economy Guide: Essential Reagents & Materials to Stockpile Before October 8",
      "source": "Warcraft Tavern",
      "sourceType": "tavern",
      "author": "Warcraft Tavern Trade Team",
      "date": "September 29, 2026",
      "tag": "Economy & Gathering",
      "summary": "With 9 days remaining until the Level 30 cap unlock, Warcraft Tavern outlines top trade goods, gathering routes, and profession bottlenecks to farm during Phase 1 for maximum launch efficiency.",
      "content": "With the Phase 2 countdown ticking down to 9 days remaining, Warcraft Tavern published its economy and material stockpiling handbook for players preparing for the October 8 Level 30 cap expansion:\n• Key Trade Goods to Hoard:\n  - Heavy Leather & Medium Leather: Leatherworkers and Survivalists capping skill at 75 will require significant quantities of Heavy Leather to immediately craft Tier 2 Silk Tents and medium combat armor upon Level 20+ trainer availability.\n  - Iron Ore & Heavy Stone: Wetlands (The Green Belt) and Stonetalon Mountains offer rich Iron nodes. Blacksmiths require iron bars for introductory Level 25 weapons and Excavation Site 4 key components.\n  - Silk Cloth: Primary bottleneck for 100–150 Tailoring and the Robes of Arcana quest chains across Duskwood and Darkshore.\n• Tier 2 Camping Preparation: Survivalists are advised to stockpile Hardened Timber and Wild Camping Supplies to immediately craft Tier 2 Ironwood Campfires (granting +10% primary stat fish buffs and 90-minute campfire auras).\n• Dungeon Attunements: Blizzard confirmed introductory investigation quests for Excavation Site 4 will start in Menethil Harbor (Alliance) and Hammerfall (Horde) at Level 24.",
      "url": "https://www.warcrafttavern.com/forever/guides/phase-2-economy-stockpile-guide/"
    },
    {
      "id": "news-28",
      "title": "Developer Update: +15% Open-World Elite Quest EXP Buff & Anti-Dungeon Boosting Clarification",
      "source": "Blizzard Official / Blue Post",
      "sourceType": "blizzard",
      "author": "Lead Designer Josh \"Aggrend\" Greenfield",
      "date": "September 28, 2026",
      "tag": "Game Rules & Balancing",
      "summary": "Blizzard introduces a permanent +15% experience boost to all outdoor elite quest chains to encourage open-world exploration over repetitive dungeon spamming, while reaffirming strict anti-boosting XP penalties.",
      "content": "In a detailed developer dispatch posted on September 28, Lead Designer Josh \"Aggrend\" Greenfield addressed player leveling patterns observed across the first 12 days of closed beta:\n• +15% Outdoor Elite Quest EXP: To incentivize venturing into high-danger open-world zones rather than grinding Deadmines or Hall of Thanes exclusively, all outdoor elite quest objectives across both continents (including Redridge elite chains, Darrow Hill, Loch Modan Trogg strongholds, and Stonetalon peak quests) now grant +15% more base experience.\n• Anti-Dungeon Boosting Diminishing Returns: Blizzard reiterated that characters grouped with party members significantly higher in level receive virtually zero XP from mob kills. The team is committed to preserving the organic group-finding and outdoor world experience of Classic+.\n• Open-World Group Dynamics: Field reports indicate open-world party formations for elite quests have surged across Westfall, Darkshore, Silverpine, and The Barrens as a result of these adjustments.",
      "url": "https://news.blizzard.com/en-us/world-of-warcraft/beta-dev-update-open-world-exp-tuning-sep28"
    },
    {
      "id": "news-27",
      "title": "Mobalytics Beta Census: 68% Reach Level 20 Cap; Skyborne & Undead Paladins Surge",
      "source": "Mobalytics / Meta Analytics",
      "sourceType": "mobalytics",
      "author": "Mobalytics Analytics Team",
      "date": "September 28, 2026",
      "tag": "Census & Demographics",
      "summary": "Mobalytics analytics reveal that 68% of active beta testers have reached the Level 20 cap. Warriors and Paladins dominate class choices, while the new Skyborne race represents 22.4% of all characters created.",
      "content": "Mobalytics telemetry gathered from over 250,000 player hours across the WoW Forever closed beta highlights the evolving character demographic breakdown as of September 28:\n• 68% Level 20 Completion: More than two-thirds of active beta accounts have reached the Level 20 Phase 1 cap, focusing their gameplay on dungeon pre-BiS farming, Warsong Gulch skirmishes, and profession grinding.\n• Class Popularity Census:\n  - Warrior: 18.2% (Top overall class, driven by Arms scaling and strong tank viability)\n  - Paladin: 15.4% (Massive surge driven by the debut of Undead Paladins on Horde and Forsaken Charger mounts)\n  - Hunter: 14.0% (Dominated by Beast Mastery levelers and Skyborne archers)\n  - Mage: 11.8% (High AoE clear speed in Hall of Thanes)\n  - Rogue: 11.2% (Strong PvP burst and stealth utility)\n  - Priest: 10.1% (Undisputed king of Level 20 dungeon and Warsong Gulch healing)\n  - Warlock: 7.6% (Consistent pet-based leveling with zero reagent requirements)\n  - Druid: 6.8% (Popular among Skyborne Druid testers)\n  - Shaman: 4.9% (Wildhammer Dwarf Shamans gaining momentum)\n• Skyborne Phenomenon: The new Skyborne race alone accounts for 22.4% of all newly created characters, marking the highest initial adoption rate of any allied or standalone race in WoW history.",
      "url": "https://mobalytics.gg/wow-forever/beta-census-demographics-sep28"
    },
    {
      "id": "news-26",
      "title": "Warcraft Tavern Phase 2 Preview: Level 20–30 Route, Wetlands Excavation Site 4 & Dalaran Guide",
      "source": "Warcraft Tavern",
      "sourceType": "tavern",
      "author": "Warcraft Tavern Leveling Team",
      "date": "September 27, 2026",
      "tag": "Leveling & Dungeons",
      "summary": "Warcraft Tavern publishes its strategic guide for Phase 2's Level 30 cap unlock on October 8, detailing pre-quest turn-in routes, Excavation Site 4 dungeon mechanics, and Tier 2 Camping upgrades.",
      "content": "With only 10 days remaining until Beta Phase 2 unlocks the Level 30 cap on October 8, Warcraft Tavern has released a comprehensive roadmap for players preparing their leveling trajectories:\n• Pre-Quest Turn-In Stacking: Detailed routes for banking 20 completed quests across Redridge Mountains, Duskwood, Stonetalon Mountains, and Ashenvale to immediately jump from Level 20 toward Level 22 upon Phase 2 launch.\n• Excavation Site 4 (Level 24–30): Preview of the Wetlands titan dig site dungeon. Players will battle corrupted Ironband miners, earthen constructs, and a shadowy titan relic boss ('Archon Kaelen') dropping mail, leather, and two-handed polearms with unique proc effects.\n• City of Dalaran (Alterac Mountains): Deep dive into the violet barrier perimeter and the subterranean Kirin Tor archives dungeon, featuring arcane anomalies and anti-magic elite mechanics.\n• Tier 2 Camping Upgrades: Survivalists can collect Ironwood Campfire frames and Silk Tents starting at Level 20 (with 75 profession skill), unlocking +10% stat fish bowls and 90-minute campfire auras.",
      "url": "https://www.warcrafttavern.com/forever/guides/phase-2-leveling-route-excavation-site-4/"
    },
    {
      "id": "news-25",
      "title": "Wowhead Beta Build 1.60.3 Datamining: Level 30 Spells, Secret Value Addon Protections & Dual Spec",
      "source": "Wowhead",
      "sourceType": "wowhead",
      "author": "Wowhead Datamining Team",
      "date": "September 27, 2026",
      "tag": "Datamining & Patch Notes",
      "summary": "Datamining of client build 1.60.3.70420 reveals datamined Level 30 class abilities, refined 12.0 secret value Lua APIs for addon authors, and full UI string confirmations for Level 40 Dual Spec.",
      "content": "Wowhead datamining of the latest WoW Forever beta build (1.60.3.70420) has uncovered crucial upcoming features and systems code:\n• Secret Value Addon Protections: Blizzard engineers added dedicated C++ helper utilities (`issecure()`, `C_AddOns` API namespace, and secure text formatters) to resolve in-combat UI taint for custom nameplates and castbars. Addon developers can now safely display decoupled castbars and friendly target auras without triggering fatal Lua execution halts.\n• Datamined Level 30 Class Abilities:\n  - Warriors: Berserker Stance questline ('The Island of Fray') and Whirlwind weapon rewards datamined with updated Classic+ weapon stats.\n  - Paladins: Blessing of Kings confirmed baseline at Level 20/30 rather than deep Retribution/Protection.\n  - Druids: Travel Form (40% outdoor movement speed) questline unlocked in Moonglade.\n  - Mages: Ice Block baseline and Teleport spell additions.\n  - Shamans: Windfury Weapon imbue ranks tuned for 2H maces and axes.\n• Dual Talent Specialization: Client strings confirm Dual Spec unlocks at Level 40 for a one-time fee of 50 gold, storing talent distribution, action bar button placements, and keybind profiles.",
      "url": "https://www.wowhead.com/forever/news/beta-build-1603-datamining-level-30-spells-dual-spec-addon-apis"
    },
    {
      "id": "news-24",
      "title": "Mobalytics Phase 1 Meta Tier List: Level 20 Speedrun Comps & Warsong Gulch Rankings",
      "source": "Mobalytics / Meta Analytics",
      "sourceType": "mobalytics",
      "author": "Mobalytics Theorycrafting",
      "date": "September 26, 2026",
      "tag": "PvP & Systems",
      "summary": "Mobalytics releases its first comprehensive meta tier list for Phase 1 Level 20 cap, ranking top dungeon speedrun compositions, single-target DPS, and 10-19 / 20 bracket Warsong Gulch performers.",
      "content": "Analyzing performance metrics across 120,000 dungeon encounters and 15,000 battleground matches, Mobalytics has published the official Beta Phase 1 Meta Tier List:\n• Dungeon Speedrun & DPS Tier List:\n  - S-Tier (DPS): Arms Warrior (dominant Cleave/Sweeping Strikes with Smite's Mighty Hammer or Cruel Barb), Beast Mastery Hunter (pet scaling + Aspect of the Hawk burst), Fire Mage (Ignite AoE cleave in Hall of Thanes trash pulls).\n  - A-Tier (DPS): Combat Rogue (consistent Sinister Strike energy cycling), Destruction Warlock (Shadowburn burst), Enhancement Shaman (Flametongue/Rockbiter burst).\n  - S-Tier (Tanks): Protection Paladin (Consecration AoE threat leads all clear speeds) and Protection Warrior (reliable single-target taunt and Shield Slam mitigation).\n  - S-Tier (Healers): Discipline Priest (Power Word: Shield + Penance) and Holy Paladin (unmatched mana efficiency with Flash of Light).\n• Warsong Gulch (10–19 / 20 Bracket) Tier List:\n  - S-Tier: Discipline Priest (flag runner survival), Affliction Warlock (multi-dot attrition), Subtlety Rogue (flag disruption & Sprint resets).\n  - A-Tier: Arms Warrior, Beast Mastery Hunter, Frost Mage.",
      "url": "https://mobalytics.gg/wow-forever/tier-lists/beta-phase-1-level-20-meta"
    },
    {
      "id": "news-23",
      "title": "Blizzard Operations: Phase 2 Level 30 Cap Locked for Oct 8; Wave 3 Beta Invites Dispatched",
      "source": "Blizzard Official",
      "sourceType": "blizzard",
      "author": "Community Manager Kaivax",
      "date": "September 25, 2026",
      "tag": "Beta Schedule",
      "summary": "Blizzard confirms Beta Phase 2 launches on Thursday, October 8 at 10:00 AM PDT, unlocking Level 30 cap, Excavation Site 4, City of Dalaran, and sending out Wave 3 beta invitations.",
      "content": "In a community update on the official forums, Community Manager Kaivax provided operational timelines for the next milestone of the closed beta test:\n• Phase 2 Unlock Date Confirmed: Phase 2 will officially commence on Thursday, October 8, 2026 at 10:00 AM PDT (19:00 CEST). The level cap will increase from 20 to 30 immediately without requiring character resets.\n• Phase 2 Content Scope:\n  - Level 24–30 Dungeon: Excavation Site 4 (Wetlands).\n  - Level 26–32 Dungeon: City of Dalaran (Subterranean Kirin Tor Vaults in Alterac Mountains).\n  - Warsong Gulch 20–29 Bracket unlocked.\n  - Ashenvale and Hillsbrad Foothills open-world PvP hot spots.\n• Wave 3 Beta Invitations: To prepare servers for increased player concurrency, Blizzard has dispatched a third massive wave of beta invites to opted-in Battle.net accounts and Skyborne Epic Pack holders.",
      "url": "https://news.blizzard.com/en-us/world-of-warcraft/beta-phase-2-announcement-wave-3-invites"
    },
    {
      "id": "news-22",
      "title": "Warcraft Tavern Pre-BiS Compendium: Top Level 20 Gear Drops for Hall of Thanes & Ruins of Lordaeron",
      "source": "Warcraft Tavern",
      "sourceType": "tavern",
      "author": "Warcraft Tavern Gear Team",
      "date": "September 24, 2026",
      "tag": "Loot & Drops",
      "summary": "Complete loot tables and pre-BiS itemization lists for Level 20 characters, spotlighting new Classic+ weapons and armor from Hall of Thanes and Ruins of Lordaeron alongside classic dungeon staples.",
      "content": "Warcraft Tavern has assembled the definitive Level 20 pre-BiS gear compendium for all 9 classes in Beta Phase 1:\n• Hall of Thanes Highlights (Level 13–18):\n  - Thane's Runic Ring: +4 Strength, +3 Stamina (Best-in-slot melee DPS and tank finger item).\n  - Ironforge Sentry Shield: High armor shield with block value and +5 Stamina.\n  - Molten Core Fragment (Trinket): On-use +12 Fire spell damage for 20 seconds.\n• Ruins of Lordaeron Highlights (Level 15–20):\n  - Blighted Dagger: Fast 1.40 attack speed with chance on hit to inflict plague damage (BiS offhand for Rogues and Hunters).\n  - Gravekeeper's Robes: +6 Intellect, +5 Spirit, +4 Spell Power (Top caster chestpiece).\n  - Pauldrons of the Fallen Order: Rare Level 20 mail shoulders with +5 Strength, +4 Agility.\n• Classic Dungeon Staples: Deadmines (Cruel Barb, Smite's Mighty Hammer, Blackened Defias armor), Shadowfang Keep (Shadowfang, Silverlaine's Family Seal, Commander's Crest), and Wailing Caverns (Armor of the Fang set).",
      "url": "https://www.warcrafttavern.com/forever/guides/level-20-pre-bis-gear-compendium/"
    },
    {
      "id": "news-19",
      "title": "Tuesday Maintenance & Beta Build 1.60.2: Addon Persistence C++ Fix, Druid Bear Form Armor & Ray-Tracing Passes",
      "source": "Blizzard Official / Patch Notes",
      "sourceType": "blizzard",
      "author": "Blizzard Quality Assurance",
      "date": "September 22, 2026",
      "tag": "Beta Patch Notes",
      "summary": "Weekly maintenance deploys client build 1.60.2.70114, resolving the C++ SavedVariables disk flush bug, fixing Druid Bear Form armor multiplication, and smoothing DX12 ray-tracing stutters in major cities.",
      "content": "Blizzard Entertainment has deployed the first scheduled Tuesday weekly maintenance build (1.60.2.70114) for the World of Warcraft: Forever closed beta:\n• Addon SavedVariables Restored: Fixed a client-side C++ file I/O bug where addon SavedVariables tables failed to flush to disk upon /reload or game exit. Addon developers no longer require emergency snapshot restoration workarounds.\n• 12.0 Lua Security & Secret Values: Blizzard engineers reiterated that WoW Forever operates on the Retail 12.0 (Camelot) engine. In-combat protective boundaries (<secret number> and <secret string>) are fully active; addon developers must utilize C++ SetFormattedText methods and isolated data registries to avoid fatal UI taint.\n• Bear Form Armor Multiplier Fix: Addressed an unintended calculation where Druid Bear Form armor multipliers were exponentially compounding flat consumable bonuses (like Elixir of Superior Defense) rather than adding them post-multiplier.\n• Capital City DX12 Shadow Optimization: Performance optimization pass for ray-traced shadows in Orgrimmar (Valley of Strength) and Stormwind (Trade District), eliminating stuttering in high player density areas.\n• Phase 1 Testing On Schedule: Phase 1 Level 20 cap testing enters Day 6 with smooth server concurrency.",
      "url": "https://news.blizzard.com/en-us/world-of-warcraft/beta-build-1602-patch-notes-sep22"
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
      "content": "Following the conclusion of Pirates' Day on September 20, the annual Brewfest celebration is now fully active across all WoW Forever beta megarealms from September 20 through October 6:\n• Festival Grounds: Alliance players can visit the festival grounds outside the gates of Ironforge, while Horde players celebrate outside Orgrimmar in Durotar.\n• Ram Racing & Barking: Daily quests for Barking for Brewfest and keg courier runs with rental rams are fully testable, rewarding Brewfest Prize Tokens.\n• Collectibles & Toys: Beta testers are farming tokens for the Wolpertinger pet, Brewfest Steins, and seasonal holiday clothing.\n• Level 20 Scaling Discussions: Blizzard is monitoring whether special holiday encounter scaling will be enabled for Coren Direbrew or if high-level boss drops will remain locked until Phase 2/3.",
      "url": "https://www.wowhead.com/forever/news/brewfest-2026-event-guide-beta-level-20"
    },
    {
      "id": "news-21",
      "title": "Phase 1 Theorycrafting Surge: Level 20 Warsong Gulch Skirmishes & Pre-BiS Dungeon Routes",
      "source": "Method.gg / Beta Theorycrafting",
      "sourceType": "method",
      "author": "Method Theorycrafting Team",
      "date": "September 22, 2026",
      "tag": "PvP & Systems",
      "summary": "Over 65% of closed beta testers have reached the Level 20 cap, sparking intense Warsong Gulch battleground skirmishes, 16-point Legacy talent builds, and dungeon pre-BiS optimization.",
      "content": "As Beta Phase 1 enters Day 6, the community meta has rapidly coalesced around max-level 20 optimization:\n• Level 20 Warsong Gulch (10–19 / 20 Bracket): Intense faction skirmishes highlight the impact of classic racials alongside modern class mechanics. Beast Mastery Hunters, Discipline Priests, and Arms Warriors are emerging as early front-runners.\n• 16-Point Legacy Milestones: Testers are heavily validating utility bonuses in the Legacy talent system, confirming that movement speed, mount speed, and camping perks drastically accelerate world navigation.\n• Dungeon Pre-BiS Farming: Deadmines (Defias set, Smite's Mighty Hammer, Cruel Barb), Wailing Caverns (Armor of the Fang), and Shadowfang Keep (Silverlaine's Family Seal, Shadowfang) are running continuously as players prepare for Phase 2's Level 30 cap unlock on October 8.",
      "url": "https://www.method.gg/wow-classic/beta-phase-1-level-20-meta-dungeon-routes"
    },
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
        "type": "Active • 10s • 90s CD",
        "effect": "Glide downward through the air for 10 sec. 90 sec cooldown."
      },
      {
        "name": "Read Leyline",
        "type": "Active • 15s • 2m CD",
        "effect": "Increases Mana and Health regeneration by 50% for 15 sec (2 min cooldown). Cannot be used while Innervate is active and is replaced by Innervate. Using at a Ley Line grants Attuned for 1 hour, boosting the benefit to 100% regeneration (persists through death, removed upon entering a raid)."
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
      "desc": "Enhanced campfire kit allowing placement of 2 concurrent profession features (45 min duration).",
      "levelReq": 20,
      "maxStations": 2
    },
    {
      "name": "Ironwood Campfire Blueprint",
      "desc": "Phase 2 Beta Blueprint: 25-yard aura radius, 60-min duration, 2 station slots with +15% enhanced party buff efficiency.",
      "levelReq": 25,
      "maxStations": 2
    },
    {
      "name": "Silk Encampment Tent",
      "desc": "Crafted via Tailoring (125). Shelters party members, accelerating Rested XP to 200% and compounding with Cozy Sleeping Bag for +5% stacking monster kill XP for 2 hours.",
      "levelReq": 25,
      "maxStations": 1
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
      "mirroredBuff": "Well Fed (+Stats, +6 MP5 & +5% Kill XP)",
      "mirroredClass": "General",
      "objects": [
        {
          "name": "Basic Campfire & Spit",
          "tier": 1,
          "desc": "Cook everyday stamina meals; Well Fed meals grant +5% bonus experience from monster kills."
        },
        {
          "name": "Iron Cauldron & Sagefish Braiser",
          "tier": 2,
          "desc": "Prepares Level 25-30 banquets including Bristle Whisker Catfish (+Stamina) and Sagefish Delight (+6 MP5 party food)."
        },
        {
          "name": "Master Encampment Feast Table",
          "tier": 3,
          "desc": "Provides high-tier raid feasts granting +Stamina and primary stats to all raid members."
        }
      ]
    }
  ],
  "professionPassives": [
    {
      "name": "Mining",
      "type": "Gathering",
      "icon": "⛏️",
      "passiveName": "Toughness",
      "passiveEffect": "Increases maximum Health by a flat 5%, scaling dynamically with total Stamina.",
      "campBonus": "Can place Deepstone Crucible / Lodestone: party members gain +15 Mining skill and 10% armor."
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
      "campBonus": "Can place Drying Rack / Trapper's Workbench: party members gain +10 Agility and +2% Critical Strike."
    },
    {
      "name": "Blacksmithing",
      "type": "Production",
      "icon": "🔨",
      "passiveName": "Weapon Honing & Sockets",
      "passiveEffect": "Permanent +16 Attack Power or +12 Spell Damage weapon buff, plus bonus socket in bracers.",
      "campBonus": "Can place Sharpening Wheel / Portable Anvil: party members gain +8-10% Attack Power for 1 hour."
    },
    {
      "name": "Alchemy",
      "type": "Production",
      "icon": "🧪",
      "passiveName": "Mixology & Elixir Mastery",
      "passiveEffect": "100% increased duration on all Flasks and Elixirs, plus 25% increased health and mana from healing potions.",
      "campBonus": "Can place Mana Well / Fermenter: party members gain +8% Mana Regen (mirrors Blessing of Wisdom)."
    },
    {
      "name": "Tailoring",
      "type": "Production",
      "icon": "🧵",
      "passiveName": "Spirit Weaving & Spellthread",
      "passiveEffect": "Increases Spirit by +15 and grants chance on spellcast to restore 200 mana or energy.",
      "campBonus": "Can place Silk Encampment Tent / Loom: party members gain +8% Spirit and 200% accelerated Rested XP."
    },
    {
      "name": "Leatherworking",
      "type": "Production",
      "icon": "🛡️",
      "passiveName": "Fur Lining & Reinforcements",
      "passiveEffect": "Exclusive bracer and chest lining granting +100 Armor and +15 Stamina.",
      "campBonus": "Can place Camp Tent / Tanning Rack: party members gain +8% physical damage reduction."
    },
    {
      "name": "Enchanting",
      "type": "Production",
      "icon": "✨",
      "passiveName": "Ring Enchantments",
      "passiveEffect": "Exclusive enchantments on finger slots: +8 All Stats, +14 Spell Power, or +24 Attack Power.",
      "campBonus": "Can place Enchanted Lute / Arcane Forge: party members gain +8% All Stats and Resistances (mirrors Mark of the Wild)."
    },
    {
      "name": "Engineering",
      "type": "Production",
      "icon": "⚙️",
      "passiveName": "Tinkers & Goggles",
      "passiveEffect": "Access to high-powered epic helm goggles, parachute cloak tinkers, and rocket boots with 0% backfire chance in raids.",
      "campBonus": "Can place Reagent Bot / Field Repair Bot: on-site repairs and zero engineering gadget malfunctions."
    },
    {
      "name": "Cooking",
      "type": "Secondary",
      "icon": "🍖",
      "passiveName": "Well Fed Experience Surge",
      "passiveEffect": "Beneficial food buffs grant +5% bonus experience from monster kills, and Well Fed durations double when eaten at camp.",
      "campBonus": "Can place Basic Campfire Kit & Cookie's Feast: party members gain +Stamina and outdoor cooking hub."
    },
    {
      "name": "First Aid",
      "type": "Secondary",
      "icon": "🩹",
      "passiveName": "Field Medic & Potion Crafting",
      "passiveEffect": "Enables crafting of instant Healing Potions and specialized Anti-Venoms; Heavy Runecloth Bandages heal for 2,000 HP.",
      "campBonus": "Can place First Aid Kit / Plague Doctor's Lab: party members gain +56 Stamina and triage stations."
    },
    {
      "name": "Fishing",
      "type": "Secondary",
      "icon": "🎣",
      "passiveName": "Master Angler & Water Breathing",
      "passiveEffect": "Access to special fish-based consumables, rare school tracking, and high-efficiency stat buffs for cooking.",
      "campBonus": "Can place Fish Bowl / Fishing Hut: party members gain +8% All Stats and rare bait caches."
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
  "classStatConversions": {
    "warrior": {
      "name": "Warrior",
      "icon": "⚔️",
      "color": "#c79c6e",
      "role": "Tank / Melee DPS",
      "strength": "1 Str = 2 Melee AP • 20 Str = 1 Block Value",
      "agility": "20 Agi = 1% Crit • 20 Agi = 1% Dodge • 1 Agi = 1 Ranged AP • 1 Agi = 2 Armor",
      "intellect": "Increases weapon skill acquisition rate",
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
      "intellect": "Increases weapon skill acquisition rate",
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
      "spirit": "Tier 1 Stat: Meditation talents enable 100% in-combat Mana Regen; Spiritual Guidance converts Spirit into Bonus Spell Damage & Healing!",
      "highlights": [
        "Spirit fuels in-combat Mana regeneration & bonus Spell Power",
        "15 Mana per 1 Intellect",
        "~59.5 Intellect = 1% Spell Critical Strike",
        "+33.3% Healing converted directly to offensive Spell Damage"
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
          "<strong>Weapon Skill:</strong> Intellect slightly accelerates your chance to improve weapon skills during melee and ranged combat."
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
          "<strong>Universal Healer In-Combat Regen:</strong> In WoW Forever, <strong>all healer specs</strong> have in-combat Mana Regeneration talents available (Meditation-style), making Spirit a premium healer stat!",
          "Priests gain direct Bonus Spell Damage & Healing from Spirit via Spiritual Guidance."
        ]
      }
    ],
    "secondaryStats": [
      {
        "name": "Critical Strike Chance",
        "icon": "🎯",
        "bullets": [
          "<strong>Unified on Gear:</strong> Critical Strike is no longer strictly separated into melee vs. spell crit on items. Gear grants unified 'Critical Strike Chance'.",
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
          "<strong>Phase 2 Beta Scaling:</strong> Multiplicatively reduces melee/ranged weapon swing timers and spell cast times across all classes.",
          "<strong>Racial & Passive Sources:</strong> Present on the Skyborne passive <em>Wind Blessed</em> (+1% Haste), Troll racial <em>Berserking</em>, and select Phase 2 enchants and trinkets.",
          "<strong>Talent Synergies:</strong> Stacks with class flurry talents (Warrior/Shaman <em>Flurry</em>, Rogue <em>Blade Flurry</em>, Paladin <em>Vengeance Haste</em>)."
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
      "name": "Excavation Site 4",
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
      "text": "Enter Wetlands and conquer Level 24–30 Dungeon: Excavation Site 4",
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
      "text": "Equip & configure ForeverLiquid (v1.3.1) HUD to track XP velocity, Mount Fund ETA & 5/hr lockouts",
      "cat": "Addons & Tools"
    },
    {
      "id": "step-19",
      "text": "Open ForeverDungeonJournal (v1.0.7) to review cross-faction routes & boss tactics for your next run",
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
    }
  ],
  "classDeepDives": {}
};

if (typeof window !== 'undefined') {
  window.WOW_FOREVER_DATA = WOW_FOREVER_DATA;
}
