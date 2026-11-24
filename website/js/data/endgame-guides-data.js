/**
 * World of Warcraft: Forever - Endgame Guides (Level 60 & Tier 1 raid prep)
 * Onyxia attunement (Drakefire Amulet) for both factions, a level 60 checklist,
 * Barrow Deeps & Hyjal Summit prep (boss rosters, Hyjal flasks) and the Onyxia encounter
 * (Classic baseline). Raid guides label every claim: Confirmed / Game data / Classic / Unknown.
 *
 * Sources (checked November 22, 2026):
 *  - Blizzard: "World of Warcraft: Forever Raid Overview — Locations, Raid Sizes and Attunement" (Oct 20, 2026)
 *  - Wowhead Forever quest data (quest names, objectives and quest levels for every step)
 *  - Fan guides for level requirements and coordinates Blizzard has not published
 *    (Timesaver, Conquest Capped, wow4ever.quest, MMONerds, wowforeverleveling.com)
 *  - This site's own hotfix log (core-data.js) and reputation data (reputation-data.js)
 */
(function () {
  'use strict';
  if (typeof window === 'undefined') return;

  const q = (id, name) => `[${name}](https://www.wowhead.com/forever/quest=${id})`;
  const g = (id, label) => `[${label}](#guides/${id})`;

  const ONYXIA = {
    id: 'guide-onyxia-attunement',
    pinned: 5, pinLabel: 'Raid Prep', raid: true,
    title: 'Onyxia Attunement: Drakefire Amulet Quest Chain (Alliance & Horde)',
    category: 'Dungeons & Raids',
    source: 'Blizzard raid overview · Wowhead Forever quest data · community attunement guides',
    icon: 'https://render.worldofwarcraft.com/us/icons/56/inv_jewelry_talisman_11.jpg',
    summary: 'Every step of the Drakefire Amulet chain for both factions. Every raider needs the amulet in their bags to enter Onyxia\'s Lair when it opens on December 9, so start now.',
    content: `### Overview: Why Start Now

**Onyxia's Lair** (40-player, Dustwallow Marsh) opens on **December 9, 2026** with the other Tier 1 raids. Blizzard requires **each member of the raid to carry the Drakefire Amulet** to enter. It only has to be in your bags, not equipped. The chain sends you through Blackrock Depths and Blackrock Spire several times, so most players need a week or two of runs.

| Parameter | Drakefire Amulet Attunement |
|---|---|
| **Reward** | [Drakefire Amulet](https://www.wowhead.com/forever/item=16309): Neck, item level 63, +10 Stamina, +15 Fire Resistance, requires level 50 |
| **Alliance start** | Helendis Riverhorn, Morgan's Vigil, Burning Steppes (about \`85.7, 69.0\`) |
| **Horde start** | Warlord Goretooth, Kargath, Badlands (\`5.8, 47.5\`) |
| **Dungeons involved** | ${g('guide-dungeon-blackrock-depths', 'Blackrock Depths')} (Alliance), ${g('guide-dungeon-lower-blackrock-spire', 'Lower Blackrock Spire')} (Horde), ${g('guide-dungeon-upper-blackrock-spire', 'Upper Blackrock Spire')} (both) |
| **Final boss** | General Drakkisath, Upper Blackrock Spire |
| **Raid lockout** | Weekly (Blizzard's current plan for all raids) |

⚠️ **Level requirements:** Blizzard has not published the minimum levels. Community guides report **48** to start the Alliance chain (most later steps need **50**) and **55** for every Horde step. Quest levels on Wowhead run from 54 to 60, so plan to finish at 60 either way.

🔒 **No shortcut:** Community guides report that the Chipped Drakefire Amulet skip from Classic is not sold in Forever. Every raider runs the full chain on each character.

---

### Alliance Chain (16 Quests)

#### Part 1: The True Masters (Burning Steppes, Redridge, Stormwind)
1. ${q(4182, 'Dragonkin Menace')}: **Helendis Riverhorn** at Morgan's Vigil. Kill 15 Black Broodlings, 10 Black Dragonspawn, 4 Black Wyrmkin and 1 Black Drake in the Burning Steppes. Shareable.
2. ${q(4183, 'The True Masters')} (part 1): take Helendis's letter to **Magistrate Solomon** in the Lakeshire town hall, Redridge Mountains.
3. ${q(4184, 'The True Masters')} (part 2): take Solomon's Plea to **Highlord Bolvar Fordragon** in Stormwind Keep.
4. ${q(4185, 'The True Masters')} (part 3): speak with **Lady Katrana Prestor** next to Bolvar, then with Bolvar again.
5. ${q(4186, 'The True Masters')} (part 4): bring Bolvar's Decree back to Solomon in Lakeshire.
6. ${q(4223, 'The True Masters')} (part 5): Solomon sends you to **Marshal Maxwell** at Morgan's Vigil (about \`84.7, 68.9\`).
7. ${q(4224, 'The True Masters')} (part 6): find **Ragged John** in the north of the Burning Steppes (about \`65.0, 23.6\`), hear his story, then report to Maxwell.

#### Part 2: Marshal Windsor (Blackrock Depths)
8. ${q(4241, 'Marshal Windsor')}: find Windsor in the **Detention Block** of ${g('guide-dungeon-blackrock-depths', 'Blackrock Depths')}. High Interrogator Gerstahn drops the Prison Cell Key; rogues can pick the cell doors.
9. ${q(4242, 'Abandoned Hope')}: give Maxwell the bad news.
10. ${q(4264, 'A Crumpled Up Note')}: a rare drop from Blackrock Depths mobs starts this quest. Bring it to Windsor in his cell. Not shareable, so anyone who sees it drop should loot it.
11. ${q(4282, 'A Shred of Hope')}: recover Windsor's Lost Information from **Golem Lord Argelmach** and **General Angerforge** (Shadowforge City, past the Shadowforge Key gate).
12. ${q(4322, 'Jail Break!')}: escort Windsor to his confiscated gear and free his friends on the way. The quest fails if he dies. Return to Maxwell.

#### Part 3: The Great Masquerade (Stormwind)
13. ${q(6402, 'Stormwind Rendezvous')}: go to the Stormwind city gates and speak with **Squire Rowe** so Windsor knows you have arrived.
14. ${q(6403, 'The Great Masquerade')}: follow and protect Reginald Windsor through Stormwind to the keep, where Lady Prestor is unmasked. If Windsor does not appear, talk to Squire Rowe again.
15. ${q(6501, 'The Dragon\'s Eye')}: Bolvar gives you the Fragment of the Dragon's Eye. Find someone who can restore its power: **Haleh** at the top of Mazthoril, Winterspring (about \`54.5, 51.2\`).
16. ${q(6502, 'Drakefire Amulet')}: Haleh sends you to kill **General Drakkisath** in ${g('guide-dungeon-upper-blackrock-spire', 'Upper Blackrock Spire')} for the Blood of the Black Dragon Champion. Bring it back to her for the amulet.

---

### Horde Chain (15 Quests)

#### Part 1: Blackrock Spire & Orgrimmar
1. ${q(98325, 'Blood and Thunder')} (new in Forever): speak to **Warlord Goretooth** in Kargath, Badlands, to join the Kargath Expeditionary Force.
2. ${q(4903, 'Warlord\'s Command')}: kill **Highlord Omokk**, **War Master Voone** and **Overlord Wyrmthalak** in ${g('guide-dungeon-lower-blackrock-spire', 'Lower Blackrock Spire')} and recover the Important Blackrock Documents. Return to Goretooth. Not shareable.
3. ${q(4941, 'Eitrigg\'s Wisdom')}: speak with **Eitrigg**, then **Thrall**, in Thrall's chamber in Orgrimmar.
4. ${q(4974, 'For The Horde!')}: kill **Warchief Rend Blackhand** and bring his head to Thrall. The head drops for everyone on the quest.
5. ${q(6566, 'What the Wind Carries')}: listen to Thrall's story.
6. ${q(6567, 'The Champion of the Horde')}: find **Rexxar**, who walks the roads of Desolace between the Stonetalon Mountains and Feralas.
7. ${q(6568, 'The Testament of Rexxar')}: deliver Rexxar's Testament to **Myranda the Hag** at Sorrow Hill, Western Plaguelands (\`50.8, 77.8\`).

#### Part 2: The Disguise
8. ${q(6569, 'Oculus Illusions')}: collect **20 Black Dragonspawn Eyes** in Upper Blackrock Spire. Rookery Hatchers and Guardians, Rage Talon Dragonspawn and Flamescales drop them most often.
9. ${q(6570, 'Emberstrife')}: Myranda gives you the Amulet of Draconic Subversion. Go to **Emberstrife's Den** in the Wyrmbog, southern Dustwallow Marsh (about \`56.6, 87.6\`). Equip the amulet **inside the den** (it does not work outside), then speak with Emberstrife.

#### Part 3: The Test of Skulls (elite drakes: bring a group)
10. ${q(6582, 'The Test of Skulls, Scryer')}: blue drake **Scryer** in Mazthoril, Winterspring.
11. ${q(6583, 'The Test of Skulls, Somnus')}: green drake **Somnus** in the Swamp of Sorrows, near the Sunken Temple.
12. ${q(6584, 'The Test of Skulls, Chronalis')}: bronze drake **Chronalis** at the Caverns of Time entrance, Tanaris.
13. ${q(6585, 'The Test of Skulls, Axtroz')}: red drake **Axtroz** at the gates of Grim Batol, Wetlands. Emberstrife only offers this one after the other three.

Each skull drops for everyone on the quest, so one group can finish all four together.

#### Part 4: Ascension
14. ${q(6601, 'Ascension...')}: Emberstrife gives you the Dull Drakefire Amulet. Take it to **Rexxar** in Desolace.
15. ${q(6602, 'Blood of the Black Dragon Champion')}: kill **General Drakkisath** in ${g('guide-dungeon-upper-blackrock-spire', 'Upper Blackrock Spire')} (the disguise does not work there), loot his blood and return to Rexxar, who turns the Dull amulet into the Drakefire Amulet.

⚠️ **Where is Rend?** Blizzard's Forever raid overview says you fight Rend in **Lower** Blackrock Spire. In Classic, and in Wowhead's Forever loot data, he is in **Upper** Blackrock Spire. If he is not where you expect, check the other wing.

---

### Group Planning Tips

- **Batch Drakkisath kills:** both factions end on Drakkisath, and community guides report the blood drops for everyone on the quest. One Upper Blackrock Spire run can finish the whole guild.
- **Escorts:** Jail Break! and The Great Masquerade fail if Windsor dies. Bring a healer and clear ahead of him.
- **Upper Blackrock Spire access:** Classic needed a Seal of Ascension to open the door. Blizzard has not confirmed whether Forever still does, so bring someone who has one (see the ${g('guide-dungeon-lower-blackrock-spire', 'Lower Blackrock Spire guide')}).
- **Fire resistance:** Blizzard advises building fire resistance before Onyxia but gives no target. The amulet itself adds +15. See the ${g('guide-level-60-checklist', 'Level 60 Checklist')} for prep.

📦 Sources: quest names, objectives and order are checked against Wowhead Forever quest data and Blizzard's raid overview. Level requirements and NPC coordinates come from community guides and may change.`
  };

  const CHECKLIST = {
    id: 'guide-level-60-checklist',
    pinned: 2, pinLabel: 'Raid Prep', raid: true,
    title: 'Level 60 Checklist: What to Do Before Tier 1 Raids Open (December 9)',
    category: 'Dungeons & Raids',
    source: 'Blizzard hotfix notes · this site\'s data · community level 60 guides',
    icon: 'https://render.worldofwarcraft.com/us/icons/56/achievement_level_60.jpg',
    summary: 'Just hit 60? The priority order for the weeks before raids: Onyxia attunement, riding, pre-raid gear, fire resistance, reputations, Legacy points and gold.',
    content: `### Overview: The Order That Matters

Barrow Deeps (10-player), Hyjal Summit (20-player) and Onyxia's Lair (40-player) all open on **December 9, 2026** and reset weekly. Barrow Deeps and Hyjal Summit only need level 60. Onyxia needs an attunement, so it comes first.

| Priority | Task | Why now |
|---|---|---|
| **1** | Onyxia attunement | The only task with a hard deadline: no amulet, no entry |
| **2** | Journeyman Riding | Saves hours on every attunement and dungeon trip |
| **3** | Pre-raid gear | Fill your weakest slots and your weapon first |
| **4** | Fire resistance & consumables | Onyxia is a fire fight; world buffs don't work in raids |
| **5** | Reputations, Legacy points, gold | Steady progress you can do between runs |

---

### 1. Start the Onyxia Attunement

Every raider needs the Drakefire Amulet in their bags. The chain runs through Blackrock Depths and Blackrock Spire, so start it on your first day at 60.

🎯 Full step-by-step chain for both factions: ${g('guide-onyxia-attunement', 'Onyxia Attunement guide')}.

---

### 2. Train Journeyman Riding

Every trainer, the Honored discount and the free first mount: ${g('guide-riding-first-mount', 'Riding & Your First Mount')}.

- **Cost (community reports from the client):** about **1,000 gold** for Journeyman Riding (mount speed 60% → 100%), plus about **200 gold** for a swift mount.
- **Discount:** reaching **Honored** with your home faction gives 10% off riding training. Skyborne get it from Genn Fairweather on Zephras Isle (fixed in the Nov 19 hotfix).
- **Class mounts:** Paladins and Warlocks have class quests for their level 60 mounts.

---

### 3. Collect Pre-Raid Gear

- **BiS lists:** open the BiS tab and pick **Level 60 Pre-Raid** for your spec's full list, with drop sources.
- **Classic dungeons:** ${g('guide-dungeon-stratholme', 'Stratholme')}, ${g('guide-dungeon-scholomance', 'Scholomance')}, ${g('guide-dungeon-dire-maul', 'Dire Maul')}, ${g('guide-dungeon-blackrock-depths', 'Blackrock Depths')}, ${g('guide-dungeon-lower-blackrock-spire', 'Lower')} and ${g('guide-dungeon-upper-blackrock-spire', 'Upper Blackrock Spire')}. Each guide lists the BiS items it drops and which specs want them.
- **New Forever dungeons:** ${g('guide-blackmaw-hold', 'Blackmaw Hold')} (55–60, Azshara) and ${g('guide-shapers-terrace', 'Shaper\'s Terrace')} (58–60, Un'Goro Crater; bring Power Crystals).
- **Upgrade order:** weapon first, then your weakest slots. Don't chase every BiS piece before raids open.
- **Reset cap:** since the Nov 20 hotfix you can enter each dungeon **5 times per hour** (was 10). Plan farming runs around it.

⏰ **Time-limited:** since the Nov 13 hotfix, you can permanently exchange a **Blessed Band of Light** for a **Channeler's Ring** at Pix Xizzix's vendor, but only **until raids open**.

---

### 4. Fire Resistance & Consumables

- **Fire resistance:** Blizzard advises building it before Onyxia but has not given a target. The Drakefire Amulet adds +15. Crafted fire resistance gear and the cloak enchant are the easiest additions.
- **World buffs:** they still work in the open world but have **no effect inside raids**. Spend that time on flasks, elixirs and food instead, and bring spares for wipes.
- **Camp buffs:** player campfires still matter. The Permanence and Gourmand Legacy perks make party and food buffs last longer (see ${g('guide-camping-master', 'Camping')}).

---

### 5. Reputations Worth Starting

| Faction | Where | Why |
|---|---|---|
| **Argent Dawn** | Quartermasters in Eastern Plaguelands (\`71.8, 50.2\`) and Western Plaguelands (Chillwind Camp \`42.8, 83.7\`; the Bulwark \`26.6, 55.2\`) | Scourgestones from Stratholme and Scholomance; recipes at Honored and Revered |
| **Timbermaw Hold** | Meilosh, Felwood (\`65.7, 2.8\`) | Recipes and gear from furbolg turn-ins |
| **Thorium Brotherhood** | Searing Gorge / Blackrock Depths | Classic source of fire resistance crafting recipes |
| **Guardians of Hyjal** (new) | Mount Hyjal | Forever faction tied to the Hyjal raids; rewards not confirmed yet |

---

### 6. Legacy Points

- Reaching **60** awards your third class Legacy milestone (after 25 and 45).
- **Dungeons:** clear 6, 10 and then 17 different dungeons for the Novice, Experienced and Master Spelunker challenges. Since the Nov 13 hotfix, Balnazzar in Stratholme counts.
- **Professions:** crafting professions award Legacy points at 150, 225 and 300.
- **Raids:** Onyxia and the Tier 1 raid bosses have their own challenges from December 9.

See the ${g('guide-legacy-talents', 'Legacy System guide')} for the perk trees.

---

### 7. Gold Without XP-to-Gold

- At 60, finished quests **do not** turn XP into gold. To make up for it, most **level 48+ quests now reward gold** directly (since the Nov 10 hotfix).
- **Save your 55–60 quests** and do them at 60 for both gold and gear.
- **Sell what raiders need:** flasks, elixirs, fire resistance gear and enchanting materials will be in demand in the week before December 9.
- **Dual Spec** costs 50 gold at a trainer (unlocked at level 40). It's worth having a raid spec and a farming or PvP spec (${g('guide-dual-spec-economics', 'Dual Spec guide')}).

---

### 8. PvP at 60 (Optional)

- **Alterac Valley** (40v40) is open to levels 51–60. Since the Nov 17 hotfix, its quests are level 58.
- **Darkspear Islands** (15v15) and Warsong Gulch also have a level 60 bracket.
- Honor buys a blue PvP set, which makes a solid pre-raid backup (${g('guide-pvp-ranks', 'PvP Honor Ranks guide')}).

---

### Countdown to December 9

| When | Goal |
|---|---|
| **This week** | Ding 60, train riding, start the attunement (Alliance: Dragonkin Menace; Horde: Blood and Thunder) |
| **Next week** | Blackrock Depths / Blackrock Spire runs for attunement steps and pre-raid gear |
| **Dec 1–8** | Drakkisath kill for the amulet, fire resistance and consumables, Pix Xizzix ring swap if needed |
| **Dec 9** | Raids open: Barrow Deeps, Hyjal Summit and Onyxia's Lair |

📦 Sources: hotfix dates come from Blizzard's notes in this site's news feed. Riding costs and some reputation details come from community guides and may change.`
  };

  const it = (id, name) => `[${name}](https://www.wowhead.com/forever/item=${id})`;

  // Status legend used by the raid guides below. Upgrade a line to ✅ only after it is seen in game.
  const LEGEND = `| Label | Meaning |
|---|---|
| ✅ **Confirmed** | Published by Blizzard or verified in game |
| 📋 **Game data** | Found in the game files (Legacy achievements, Wowhead Forever), not yet seen in the raid |
| 📜 **Classic baseline** | How it worked in Classic; Forever may have changed it |
| ❓ **Unknown** | Not published yet. We update these after December 9 |`;

  const HYJAL_RAIDS = {
    id: 'guide-tier1-barrow-deeps-hyjal-prep',
    pinned: 3, pinLabel: 'Raid Prep', raid: true,
    title: 'Barrow Deeps & Hyjal Summit: Boss Rosters and Raid Prep (December 9)',
    category: 'Dungeons & Raids',
    source: 'Blizzard raid overview · Legacy achievement data · Wowhead Forever item data (checked Nov 23, 2026)',
    icon: 'https://render.worldofwarcraft.com/us/icons/56/inv_misc_herb_heartblossom.jpg',
    summary: 'Everything we can confirm before the two new Mount Hyjal raids open: sizes, entrances, boss names from the game files, the Hyjal-only flasks with recipes and live prices, and a prep checklist. Mechanics and loot are added after launch.',
    content: `### Overview: What We Know and What We Don't

The two brand-new Tier 1 raids, **The Barrow Deeps** (10-player) and **Hyjal Summit** (20-player), open on **December 9, 2026** alongside ${g('guide-onyxia-encounter', 'Onyxia\'s Lair')}. Neither is a Classic raid, so there is no old guide to copy. Blizzard has not published boss abilities or loot tables.

This guide only states what can be checked today, and labels everything:

${LEGEND}

| | The Barrow Deeps | Hyjal Summit |
|---|---|---|
| **Size** | ✅ 10-player | ✅ 20-player |
| **Bosses** | ✅ 8 | ✅ 13 |
| **Where** | ✅ Mount Hyjal. Entrances also in Winterspring and Blackmaw Hold | ✅ Mount Hyjal, beside Nordrassil |
| **Attunement** | ✅ None announced | ✅ None announced |
| **Lockout** | ✅ Weekly | ✅ Weekly |
| **Layout** | ✅ Several paths with different themes | ✅ An ancient guardian first, then routes above and below ground |
| **World buffs** | ✅ No effect inside raids | ✅ No effect inside raids |
| **Mechanics & loot** | ❓ | ❓ |

🗺️ Getting there and the zone quests: ${g('guide-zone-mount-hyjal', 'Mount Hyjal zone guide')}. The road in has elite level 57–58 mobs, so travel in a group.

---

### The Barrow Deeps: Boss Roster (8)

📋 These names come from the **Conqueror of the Deeps** Legacy challenge in the game files. The kill order is ❓: Blizzard says the raid has several paths.

| # | Encounter | Notes |
|---|---|---|
| 1 | **Deepscar Matriarch** | ❓ |
| 2 | **Khalith the Dreadspinner** | ❓ |
| 3 | **Amethrax** | ❓ |
| 4 | **Ravus and Darlissa** | Two names: likely a two-boss fight ❓ |
| 5 | **Elder Tangleclaw** | ❓ |
| 6 | **Well of Sorrow** | Not a creature name: possibly an event encounter ❓ |
| 7 | **Del'lynar Songwood** | ❓ |
| 8 | **Sonya Darkhallow** | ❓ |

---

### Hyjal Summit: Boss Roster (13)

📋 These names come from the **Conqueror of the Wilds** Legacy challenge. Blizzard says the first boss is an ancient guardian and the raid then splits into routes above and below ground. The order beyond that is ❓.

| # | Encounter | Notes |
|---|---|---|
| 1 | **Bandalar** | ❓ |
| 2 | **Ancient of Decay** | ❓ |
| 3 | **Time-Lost Battalion** | Not a single name: likely a group or wave fight ❓ |
| 4 | **Sylvestris Dusksong** | ❓ |
| 5 | **Old Gloomlurker** | ❓ |
| 6 | **Gharalis the Abyssal** | ❓ |
| 7 | **Kathris the Haunted** | ❓ |
| 8 | **Anara Chillwind** | ❓ |
| 9 | **Elder Minderel** | ❓ |
| 10 | **Tracker Stillwind** | ❓ |
| 11 | **Council of Thorns** | "Council" suggests a multi-boss fight ❓ |
| 12 | **Nythus the Dreambound** | ❓ |
| 13 | **The Wild King** | ❓ |

---

### Hyjal-Only Flasks (New in Forever)

📋 Four new Alchemy flasks give **+30 Stamina** everywhere, plus a bonus that **only works in Mount Hyjal, Hyjal Summit and the Barrow Deeps**. They are not useful in Onyxia's Lair. Each lasts **2 hours**, persists through death, and requires level 55. Only one flask can be active at a time. Stats were checked against Wowhead Forever's item data on November 23.

| Flask | Hyjal bonus | Reagents |
|---|---|---|
| ${it(274273, 'Flask of Natural Accuracy')} | +2% Hit Chance | 1 ${it(248822, 'Death Lotus')}, 12 ${it(248821, 'Demonsage')}, 9 ${it(13464, 'Golden Sansam')}, 1 ${it(18256, 'Imbued Vial')} |
| ${it(274274, 'Flask of Natural Aggression')} | +2% Critical Strike Chance | 1 Death Lotus, 18 Demonsage, 6 ${it(13465, 'Mountain Silversage')}, 1 Imbued Vial |
| ${it(274275, 'Flask of Natural Precision')} | 2% less chance to be dodged or parried | 1 Death Lotus, 12 ${it(248823, 'Marefoil')}, 9 ${it(13463, 'Dreamfoil')}, 1 Imbued Vial |
| ${it(274276, 'Flask of Natural Swiftness')} | +2% Haste | 1 Death Lotus, 18 Marefoil, 6 ${it(13467, 'Icecap')}, 1 Imbued Vial |

Recipes: ${it(274277, 'Accuracy')}, ${it(274278, 'Aggression')}, ${it(274279, 'Precision')}, ${it(274280, 'Swiftness')}. Where to get them is ❓ on this site so far.

💰 **Gold tip:** Death Lotus, Demonsage and Marefoil are new Forever herbs and every flask needs a Death Lotus. Herbalists should start stockpiling now. See the ${g('guide-zone-mount-hyjal', 'Mount Hyjal guide')} for where they grow.

---

### Prep Checklist (Safe to Do Now)

1. **Gear:** fill your weakest slots from the BiS tab's **Level 60 Pre-Raid** lists. Weapon first.
2. **Flasks:** decide which Hyjal flask fits your spec. Hit suits casters and physical DPS below the hit cap, Haste or Crit suits everyone else, and Precision suits melee.
3. **Other consumables:** they work inside raids even though world buffs don't. Forever added new elixirs, food and potions for every role. Full lists: ${g('guide-tier1-raid-consumables', 'Tier 1 Raid Consumables by Role')}.
4. **Reputation:** start **Guardians of Hyjal** (new in Forever). Its rewards are ❓, but it is the raid zone's faction.
5. **Group:** plan a 10-player and a 20-player roster. With the weekly lockout, a guild can run both raids every week.

---

### Day-One Update Plan

After the raids open on December 9, this guide will be updated in this order:
1. Confirm the boss order and paths (📋 → ✅).
2. Add loot tables from Wowhead Forever's item data as soon as drops are recorded.
3. Write up key mechanics for each boss, with the roles that matter.

📦 Sources: sizes, entrances, layout and dates come from Blizzard's raid overview in this site's news feed. Boss names come from the Legacy achievement data. Flask stats and recipes come from Wowhead Forever's item data, checked November 23, 2026.`
  };

  const ONYXIA_FIGHT = {
    id: 'guide-onyxia-encounter',
    pinned: 6, pinLabel: 'Raid Prep', raid: true,
    title: 'Onyxia\'s Lair Encounter Guide: Phases, Roles and Fire Prep (Classic Baseline)',
    category: 'Dungeons & Raids',
    source: 'Classic encounter mechanics · Blizzard raid overview · this site\'s item data',
    icon: 'https://render.worldofwarcraft.com/us/icons/56/achievement_boss_onyxia.jpg',
    summary: 'How the Onyxia fight worked in Classic, phase by phase, so your 40 players arrive on December 9 knowing their jobs. Clearly labelled: Forever may have retuned parts of it.',
    content: `### Overview: Read This First

**Onyxia's Lair** (40-player, Dustwallow Marsh) is the one Tier 1 raid with a Classic history. Every raider needs the **Drakefire Amulet** (${g('guide-onyxia-attunement', 'attunement guide')}).

⚠️ **Classic baseline:** Blizzard has not published Forever's version of the fight. Everything below is 📜 how Onyxia worked in Classic. Expect the structure to hold, but numbers and timings may change. We update this page after December 9.

${LEGEND}

| | Onyxia's Lair |
|---|---|
| **Size** | ✅ 40-player |
| **Entry** | ✅ Drakefire Amulet in your bags |
| **Lockout** | ✅ Weekly |
| **World buffs** | ✅ No effect inside raids |
| **Fire resistance target** | ❓ Blizzard advises building some, with no number given |
| **Loot** | ❓ Not published for Forever |
| **Legacy challenge** | 📋 Conqueror of the Lair |

---

### Phase 1: On the Ground (100% to 65%) 📜

- **Tank:** pull Onyxia to the back of the room and turn her so her head faces the wall, away from the raid.
- **Everyone else:** stand at her **sides**. Never stand in front of her (**Flame Breath**) or behind her (**Tail Sweep** knocks you into the whelp caves).
- **Wing Buffet** knocks the tank back and lowers threat, so DPS should give the tank a few seconds before going all out.
- **Melee:** attack from her side, between the front legs and the tail.

---

### Phase 2: In the Air (65% to 40%) 📜

- She lifts off and circles the room. **Ranged DPS** carry this phase. Melee switch to whelps.
- **Fireball** hits a random player and splashes anyone close by. Spread out and keep a few yards from each other.
- **Deep Breath** is the raid killer: she flies to one side of the room and breathes fire across the whole middle. When her emote appears, **run to the sides of the room**, out of her path.
- **Onyxian Whelps** pour out of the two side caves in waves. Assign off-tanks and area-of-effect damage to each side, and don't let whelps reach the healers.

---

### Phase 3: Back on the Ground (40% to 0%) 📜

- She lands and the tank picks her up again, facing away from the raid as in Phase 1.
- **Bellowing Roar** fears the whole raid every so often. Feared players run into **lava eruptions** from the floor cracks. Fear counters are the key to this phase:
  - **Priests:** Fear Ward on the main tank
  - **Shamans:** Tremor Totem in melee groups
  - **Warriors:** Berserker Rage, timed for the Roar
- Stack the tank's healers so the fear does not run them out of range.
- Whelps keep coming from the caves, so leave a few players on whelp duty.

---

### Role Checklist 📜

| Role | Job |
|---|---|
| **Main tank** | Face her away from everyone. Keep a Fear Ward or Berserker Rage for Phase 3 |
| **Off-tanks** | Whelp duty in Phase 2 and 3, one per cave |
| **Ranged DPS** | Main damage in Phase 2. Spread for Fireball |
| **Melee DPS** | Her sides only. Whelps in Phase 2 |
| **Healers** | Spread in Phase 2. Watch whoever gets hit by Fireball. Stay in range of the tank in Phase 3 |
| **Raid leader** | Call Deep Breath and the landing |

---

### Fire Resistance & Consumables

- The **Drakefire Amulet** itself gives +15 Fire Resistance.
- ${it(13457, 'Greater Fire Protection Potion')} and ${it(6049, 'Fire Protection Potion')} absorb fire damage. Tanks and healers should bring several.
- **Flasks:** the new Hyjal flasks only work in Mount Hyjal's raids. For Onyxia, use Classic flasks such as ${it(13510, 'Flask of the Titans')}, ${it(13511, 'Flask of Distilled Wisdom')} and ${it(13512, 'Flask of Supreme Power')}.
- **Everything else by role:** ${g('guide-tier1-raid-consumables', 'Tier 1 Raid Consumables by Role')}, including the new Forever elixirs and potions.
- More prep: ${g('guide-level-60-checklist', 'Level 60 Checklist')} and ${g('guide-tier1-barrow-deeps-hyjal-prep', 'Barrow Deeps & Hyjal Summit prep')}.

📦 Sources: the fight structure is Classic's (📜). Entry, lockout and the no-world-buffs rule come from Blizzard's raid overview. Item names come from this site's Wowhead Forever item data.`
  };

  const CONSUMABLES = {
    id: 'guide-tier1-raid-consumables',
    pinned: 4, pinLabel: 'Raid Prep', raid: true,
    title: 'Tier 1 Raid Consumables by Role: What to Bring on December 9 (New Forever Items Included)',
    category: 'Dungeons & Raids',
    source: 'Wowhead Forever item tooltips (checked Nov 23, 2026) · this site\'s AH scans · community raid-prep lists',
    icon: 'https://render.worldofwarcraft.com/us/icons/56/inv_potion_97.jpg',
    summary: 'The flasks, elixirs, food, potions and class items each role should bring to Onyxia, Hyjal Summit and the Barrow Deeps, plus engineering explosives and the many consumables that are new in Forever. Every item shows today\'s AH price.',
    content: `### Overview: Save Them for December 9

World buffs do nothing inside Forever raids, so consumables are the main way to boost your raid performance. Forever added a set of **new consumables** (marked 🆕) that most players haven't heard of yet. Many of them replace or beat the Classic options.

- **Don't drink them early.** Buy or craft now while prices are low, then save them for raid night.
- **Prices:** each item shows its live AH price from this site's latest scan.
- **Stats** were checked against Wowhead Forever's item data on November 23, 2026.

| Tier | What to bring |
|---|---|
| **Casual** | Food, potions and your class reagents |
| **Serious** | Add the main elixirs for your role |
| **Max** | Add burst potions, runes, scrolls and a flask |

---

### Physical DPS (Warrior, Rogue, Hunter, Feral, Enhancement, Retribution)

| Item | Effect | Who |
|---|---|---|
| ${it(13452, 'Elixir of the Mongoose')} | +25 Agility, +2% crit, 30 min | Agility users |
| 🆕 ${it(250328, 'Elixir of Cunning')} | +25 Agility and +25 Intellect, 30 min | Hunters (instead of Mongoose) |
| 🆕 ${it(250351, 'Elixir of the Grizzly')} | +25 Strength, +2% crit, 30 min | Strength users |
| 🆕 ${it(250350, 'Elixir of Ferocity')} | +18 Strength and +18 Agility, 30 min | Hybrids that use both (Feral, Enhancement) |
| ${it(12820, 'Winterfall Firewater')} | +35 melee attack power, 20 min | Melee |
| 🆕 ${it(246948, 'Distilled Firewater')} | +35 melee attack power, 20 min | Melee. A craftable version of Winterfall Firewater, same effect |
| 🆕 ${it(250069, 'Flank au Poivre')} / ${it(250072, 'Swiftstrike Steak')} | Well Fed: +20 Agility | Agility users |
| ${it(20452, 'Smoked Desert Dumplings')} / 🆕 ${it(250070, 'Bear Bruscitti')} / 🆕 ${it(250071, 'Steaming Stag Steak')} | Well Fed: +20 Strength | Strength users. Buy whichever is cheapest |
| 🆕 ${it(250943, 'Major Frenzy Potion')} | +80 attack power for 30 sec | Burst, uses the potion cooldown |
| ${it(13442, 'Mighty Rage Potion')} | 45–75 rage and +60 Strength for 20 sec | Warriors |
| ${it(10309, 'Scroll of Agility IV')} / ${it(10310, 'Scroll of Strength IV')} | +17 Agility / Strength, 30 min | Stacks with elixirs |
| ${it(18262, 'Elemental Sharpening Stone')} | +2% melee crit, 30 min | Melee weapons |
| ${it(12643, 'Dense Weightstone')} | +8 damage, 30 min | Blunt weapons. Cheaper filler for an off-hand mace |
| ${it(13510, 'Flask of the Titans')} | +1,200 max health, 2 hr | Max tier |

**Class items:** Rogues bring ${it(7676, 'Thistle Tea')} and ${it(8928, 'Instant Poison VI')}. Hunters bring 2–3 stacks of ${it(18042, 'Thorium Headed Arrow')}.

---

### Caster DPS (Mage, Warlock, Shadow Priest, Balance, Elemental)

| Item | Effect | Who |
|---|---|---|
| ${it(13454, 'Greater Arcane Elixir')} | +35 spell damage, 1 hr | All casters |
| ${it(9264, 'Elixir of Shadow Power')} | +40 Shadow damage, 30 min | Warlock, Shadow Priest |
| 🆕 ${it(250343, 'Elixir of Nature Power')} | +40 Nature damage, 30 min | Balance, Elemental |
| 🆕 ${it(250337, 'Elixir of the Owl')} | +25 Intellect, +2% crit, 30 min | Mages and healers |
| ${it(21546, 'Elixir of Holy Power')} | +40 Holy damage, 30 min | Holy damage dealers |
| ${it(17708, 'Elixir of Frost Power')} | +15 Frost damage, 30 min | Frost mages |
| ${it(20749, 'Brilliant Wizard Oil')} | +36 spell damage and healing, +1% spell crit, 30 min | All casters. One of the biggest boosts on this list |
| ${it(13933, 'Lobster Stew')} | Well Fed: +28 spell damage | All casters |
| ${it(13931, 'Nightfin Soup')} | Well Fed: +22 spell damage | Cheaper Lobster Stew alternative |
| 🆕 ${it(250075, 'Prehistoric Pulled Raptor')} / ${it(250067, 'Bat Hachee')} / ${it(250066, 'Soaring Pamplona')} | Well Fed: +20 Intellect | Casters short on mana |
| 🆕 ${it(250937, 'Major Spellblasting Potion')} | +47 spell damage for 30 sec | Burst, uses the potion cooldown |
| ${it(13444, 'Major Mana Potion')} | Restores 1,350–2,250 mana | All casters |
| ${it(20520, 'Dark Rune')} / ${it(12662, 'Demonic Rune')} | Mana for health, own cooldown | Use right after a potion |
| ${it(13512, 'Flask of Supreme Power')} | +150 spell damage, 2 hr | Max tier |

**Class items:** Warlocks should farm 20+ Soul Shards before raid night. Demonic Runes drop from satyrs in Felwood and Azshara.

**Fire mages:** Forever's item data has no Elixir of Greater Firepower, so there is no Fire elixir at level 60 yet. Use Greater Arcane Elixir and Brilliant Wizard Oil.

---

### Healers (Holy/Discipline Priest, Holy Paladin, Restoration Druid and Shaman)

| Item | Effect |
|---|---|
| 🆕 ${it(250333, 'Greater Cleric\'s Elixir')} | +40 healing, 30 min |
| 🆕 ${it(250337, 'Elixir of the Owl')} | +25 Intellect, +2% crit, 30 min |
| 🆕 ${it(250341, 'Greater Mageblood Elixir')} | +20 mana every 5 sec, 30 min |
| 🆕 ${it(250348, 'Elixir of the Whale')} | +25 Spirit, +2% crit, 30 min |
| 🆕 ${it(250336, 'Elixir of Wicked Regeneration')} | 9 health and 10 mana every 5 sec, 30 min |
| ${it(20007, 'Mageblood Elixir')} | 12 mana every 5 sec, 1 hr (cheaper than Greater Mageblood) |
| ${it(20748, 'Brilliant Mana Oil')} | +30 healing and 15 mana every 5 sec, 30 min |
| 🆕 ${it(249870, 'Sage\'s Tea')} | Well Fed: +44 healing |
| 🆕 ${it(250949, 'Major Mender\'s Potion')} | +88 healing for 30 sec (uses the potion cooldown) |
| ${it(13444, 'Major Mana Potion')} + ${it(20520, 'Dark Rune')} | Separate cooldowns: use both |
| ${it(13511, 'Flask of Distilled Wisdom')} | +2,000 max mana, 2 hr (max tier) |

**Class reagents:** Priests bring Sacred Candles, Paladins Symbols of Kings, Druids Wild Thornroot and Shamans Ankhs.

⚠️ **Don't buy both:** 🆕 ${it(250338, 'Elixir of Sages')} has exactly the same tooltip as Elixir of the Whale (+25 Spirit, +2% crit). They probably share one buff and won't stack, so buy whichever is cheaper ❓.

---

### Tanks (Protection Warrior and Paladin, Bear Druid)

| Item | Effect |
|---|---|
| 🆕 ${it(250329, 'Elixir of the Phalanx')} | +400 max health and +500 armor, 30 min |
| ${it(13453, 'Elixir of Brute Force')} | +18 Strength and Stamina, 1 hr |
| ${it(13445, 'Elixir of Greater Defense')} | +450 armor, 1 hr |
| 🆕 ${it(250335, 'Elixir of Greater Fortitude')} | +400 max health, 30 min |
| ${it(20004, 'Major Troll\'s Blood Elixir')} | 20 health every 5 sec, 1 hr |
| ${it(21023, 'Dirge\'s Kickin\' Chimaerok Chops')} | Well Fed: +25 Stamina (best Stamina food) |
| 🆕 ${it(250068, 'Savory Turtle Stew')} | Well Fed: +20 Stamina (cheaper option) |
| 🆕 ${it(286152, 'Plated Armorfish')} | Well Fed: +150 armor |
| ${it(13455, 'Greater Stoneshield Potion')} | +2,000 armor for 2 min |
| ${it(13510, 'Flask of the Titans')} | +1,200 max health, 2 hr (max tier) |

---

### Everyone

| Item | Effect | Notes |
|---|---|---|
| ${it(13457, 'Greater Fire Protection Potion')} | Absorbs 1,950–3,250 fire damage | **Onyxia**. Tanks and healers especially |
| ${it(13446, 'Major Healing Potion')} | Restores 1,050–1,750 health | Emergency |
| 🆕 ${it(241650, 'Major Discolored Healing Potion')} | Restores 2,625–2,975 health, then you lose 75% of it over time | A big heal that buys time for healers |
| ${it(9421, 'Major Healthstone')} | Restores health, on its own cooldown | Ask a warlock |
| ${it(5634, 'Free Action Potion')} | Immune to stun and movement impairing effects, 30 sec | Situational |
| ${it(3387, 'Limited Invulnerability Potion')} | Immune to physical attacks for 6 sec | Dropping aggro, or surviving a bad pull |
| 🆕 ${it(255722, 'Surgical Tourniquet')} / 🆕 ${it(255719, 'Powerful Poultice')} | Cures bleeds / diseases on a target. Out of combat only | Clear lingering effects between pulls |
| 🆕 ${it(275688, 'Power Recycler')} | Turns 20% of max health into 20% of max mana, energy or rage. 2 min cooldown, 5 charges | Reward from the quest ${q(92011, 'Rubble Rummage')} |
| ${it(18297, 'Thornling Seed')} | Plants a Thornling that pulls enemies | Free from Dire Maul |

**Hyjal Summit and Barrow Deeps only:** the four new Hyjal flasks (+30 Stamina, +2% Hit, Crit, Haste or Precision). Their bonus only works in Mount Hyjal and its two raids. See ${g('guide-tier1-barrow-deeps-hyjal-prep', 'Barrow Deeps & Hyjal Summit prep')}.

**Check after December 9 ❓:** 🆕 ${it(250954, 'Potion of Elemental Purging')} (+105 spell damage against Elementals, 5 min) and 🆕 ${it(250955, 'Potion of Beast Slaying')} (+180 attack power against Beasts, 5 min) are huge if a boss is the right creature type. Hyjal's boss types aren't known yet.

---

### Engineers: Explosives

Engineers can add a lot of area damage, especially on **Onyxia's whelps**. 📜 In Classic, explosives shared their own 1-minute cooldown, separate from potions.

| Item | Effect | Notes |
|---|---|---|
| ${it(10646, 'Goblin Sapper Charge')} | 450–750 Fire damage to all nearby enemies, 375–625 to you | The biggest burst. Have a healer ready |
| 🆕 ${it(260817, 'EZ-Thro Dark Bomb')} | 225–675 Fire damage and a 4 sec stun, 5 yd radius | Any damage breaks the stun |
| ${it(15993, 'Thorium Grenade')} / 🆕 ${it(260816, 'EZ-Thro Thorium Grenade')} | 300–500 Fire damage and a 3 sec stun, 3 yd radius | Same effect, buy whichever is cheaper |
| ${it(18641, 'Dense Dynamite')} / 🆕 ${it(260814, 'SAF-T Clever Dynamite')} | 340–460 Fire damage, 5 yd radius | Same effect, buy whichever is cheaper |

---

### Best Food by Class

You can only have one Well Fed buff, so pick the best one for your spec. Forever reworked many foods, so Classic food lists are often wrong. Mightfish Steak, for example, now gives attack power instead of Stamina. Any food below level 45 is a leveling food: ${it(274971, 'Briny Seafood Stew')} (+14 spell damage, level 25) looks like a raid food but gives only half of the best one.

| Class / spec | Best food | Buff | Cheaper or other option |
|---|---|---|---|
| **Mage, Warlock, Shadow Priest, Balance, Elemental** | ${it(13933, 'Lobster Stew')} / ${it(13935, 'Baked Salmon')} | +28 spell damage | ${it(13931, 'Nightfin Soup')} / ${it(6887, 'Spotted Yellowtail')} (+22) |
| **Casters short on mana** | 🆕 ${it(250075, 'Prehistoric Pulled Raptor')} | +20 Intellect | 🆕 ${it(250067, 'Bat Hachee')} / ${it(250066, 'Soaring Pamplona')} (same buff) |
| **Healers (all classes)** | 🆕 ${it(249870, 'Sage\'s Tea')} | +44 healing | 🆕 ${it(249876, 'Wicked Smoothie')} (+20 Spirit) if you run out of mana |
| **Rogue, Hunter, Feral cat** | 🆕 ${it(250069, 'Flank au Poivre')} / ${it(250072, 'Swiftstrike Steak')} | +20 Agility | Agility also gives crit, so it beats attack power food for these classes |
| **Warrior (DPS), Retribution, Enhancement** | ${it(13934, 'Mightfish Steak')} / ${it(13932, 'Poached Sunscale Salmon')} | +40 attack power | ${it(20452, 'Smoked Desert Dumplings')}, 🆕 ${it(250070, 'Bear Bruscitti')}, 🆕 ${it(250071, 'Steaming Stag Steak')} (+20 Strength = 40 AP for these classes, so buy whichever is cheaper) |
| **Tanks (Warrior, Paladin, Bear)** | ${it(21023, 'Dirge\'s Kickin\' Chimaerok Chops')} | +25 Stamina | 🆕 ${it(250068, 'Savory Turtle Stew')} (+20 Stamina), or 🆕 ${it(286152, 'Plated Armorfish')} (+150 armor) when armor matters more |

❓ In Classic, attack power food only boosted melee attacks, so Hunters should stick with Agility food until this is tested in Forever.

---

### How Consumables Stack 📜

These are Classic rules. We'll confirm them in Forever raids after launch.

| Type | Rule |
|---|---|
| **Flask** | One at a time. Lasts 2 hours and stays on through death |
| **Food** | One Well Fed buff at a time. Eat right before the pull |
| **Potions** | All potions share one 2-minute cooldown, including healing, mana, protection and burst potions |
| **Runes & Healthstone** | Dark Rune and Demonic Rune share their own cooldown, separate from potions. Healthstones have another. Use a rune right after a potion |
| **Scrolls** | Intellect, Stamina and Spirit scrolls do nothing if you already have Arcane Intellect, Fortitude or Divine Spirit. Agility and Strength scrolls stack with elixirs |
| **Weapon oils & stones** | One per weapon. Oils, stones and rogue poisons replace each other |
| **World buffs** | ✅ No effect inside Forever raids, including Dire Maul tributes and Darkmoon Faire |
| **Juju & Blasted Lands buffs** | ❓ Juju Power, R.O.I.D.S. and similar items aren't in Forever's crafting data yet. Unknown whether they exist |

📦 Sources: every item's effect comes from Wowhead Forever's tooltips, checked November 23, 2026. Prices come from this site's latest AH scan. The role picks follow community raid-prep lists, and we checked every item against game data.`
  };

  const GUIDES = [ONYXIA, CHECKLIST, HYJAL_RAIDS, ONYXIA_FIGHT, CONSUMABLES];
  const ids = new Set(GUIDES.map(x => x.id));
  window.WOW_ENDGAME_GUIDES = GUIDES;
  if (window.WOW_TOOLS_DATA) {
    window.WOW_TOOLS_DATA.guides = (window.WOW_TOOLS_DATA.guides || []).filter(x => !ids.has(x.id)).concat(GUIDES);
  }
})();
