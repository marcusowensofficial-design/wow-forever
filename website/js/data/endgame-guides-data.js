/**
 * World of Warcraft: Forever - Endgame Guides (Level 60 & Tier 1 raid prep)
 * Onyxia attunement (Drakefire Amulet) for both factions and a level 60 checklist.
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
    title: 'Level 60 Checklist: What to Do Before Tier 1 Raids Open (December 9)',
    category: 'Leveling & Quests',
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

  const GUIDES = [ONYXIA, CHECKLIST];
  const ids = new Set(GUIDES.map(x => x.id));
  window.WOW_ENDGAME_GUIDES = GUIDES;
  if (window.WOW_TOOLS_DATA) {
    window.WOW_TOOLS_DATA.guides = (window.WOW_TOOLS_DATA.guides || []).filter(x => !ids.has(x.id)).concat(GUIDES);
  }
})();
