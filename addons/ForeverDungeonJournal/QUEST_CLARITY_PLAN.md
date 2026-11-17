# Quest clarity plan (ForeverDungeonJournal)

Goal: every quest and chain step says where it starts, where the objective is and where it is turned in, with a map button for each. Updated 2026-11-11.

## Done

- **An Unholy Alliance**: both parts explain the full chain; Varimathras has map buttons (56.2, 92.6); part 2 has a **Find Ambassador Malcin** button with his main spawn and four alternates. The quest tracker points at Malcin until you have the head, then at Varimathras.
- **Chain bar** under chain quests ("Quest chain: N steps first – click to show"); the chain opens the first time the quest is picked; steps show `>` and a tooltip.
- **"Find <NPC>" button** (`objectiveMap`) on chain steps and main quest pages.
- **Step map buttons from data the addon already had** (QuestUpdates.lua, BEGIN stepmaps): exact, unambiguous NPC-name matches only.
- **`Data/QuestLocations.lua`**: start / turn-in / objective spots from the map data on Wowhead Forever quest pages (Forever spawns) for **567 of the journal's 567** quests and steps. Fills gaps only, never overwrites hand-placed spots. Adds a "Where to go:" list with coordinates to quests that had no notes. Rebuild with `python tools/build_quest_locations.py` after adding pages to `tools/wowhead_quest_spots.json`.
- **Spot corrections** (`FDJ.NPC_SPOT_CORRECTIONS` in QuestLocations.lua), each verified against Wowhead Forever:
  - Tirion Fordring → his hut, 7.6, 43.6 (was 4.3, 36.1 on 7 Argent Dawn steps)
  - Nathanos Blightcaller → Marris Stead, 26.6, 74.8 (was 22.2, 64.3)
  - Haleh → deep in Mazthoril, 54.4, 51.2 (a 57.4, 67.2 copy was wrong)
  - Duke Nicholas Zverenhoff → Light's Hope, 81.4, 59.8 (was 73.7, 50.8)
  - High Explorer Magellas → Hall of Explorers, 69.6, 18.6 (a 77.2, 11.8 copy was wrong)
  - Eastern Plaguelands group that was about 8 points off: Betina Bigglezink, Leonid Barthalomew, Smokey LaRue, Caretaker Alen (Light's Hope), Aurora Skycaller (Northpass Tower), Egan
- Chain steps without a turn-in button: 271 → 16.

## Rules

- Coordinates come from Wowhead Forever (page map data or comments), the Wayback Machine's copies of those pages, or an in-game `/loc`; never guessed.
- **Stormwind is never taken from Wowhead**: Forever's Stormwind map does not line up with Wowhead's (classic) Stormwind coordinates. Stormwind spots need an in-game `/loc`.
- Fetch Wowhead slowly (one page every few seconds, back off for minutes on any 403/429); bulk fetching gets the IP blocked.
- Text format for pickup/turn-in: `NPC, sub-area, zone (x, y)`. NPC name first so the auto-fill can match it.
- When English text changes, clear the translated field so no locale shows the old wording (see the Unholy Alliance block).

## Left to do

### 1. Check in game (`/loc`)

Settled 12 Nov 2026 (Wowhead Forever):
- Archmage Tervosh: 66.0, 49.0, Theramore mage tower (Data/QuestMaps.lua).
- Baros Alexston: 57.6, 47.8, City Hall next to the Argent Dawn building. 49.0, 30.2 is the fallback if he isn't there. Confirm in game which one is right.
- Guard Berton: 21.2, 46.6, by the mailbox left of the Lakeshire inn entrance.
- Dorin Songblade: 25.6, 46.6, Redridge.
- Hammertoe Grez: walking directions added to A Sign of Hope / Amulet of Secrets (WoW Classic 2019 info, may have moved). Pins unchanged: journal 44.3, 12.0 vs Wowhead 37.9, 10.6. The directions' cave entrance (54.5, 57.8) still needs its map confirmed.
- Scout Galiaan: 54.0, 52.8, Sentinel Hill (some players: ~53, 52 outside the inn).
- Wiley the Black: 21.4, 45.2 or 26.6, 45.2, moves between the Lakeshire buildings.
- Alba Fairmoon: 52.4, 53.0 inside the Sentinel Hill inn (or 52.6, 53.2). Wowhead's 38.6, 83.6 is correct too: that's where Destruction in Deadmines ends, at the Deadmines exit.
- Thom Filch: ~32.6, 44.6, across the short bridge from the Hall of Thanes portal, behind a column.

Still to check:

- Nothing outside dungeons (only which Hammertoe Grez pin is right, see above).

### 2. Chain steps still without a turn-in button

Rechecked 12 Nov 2026. Most rows in the old table are covered now:
- 373, 94890, 94973, 94980: Wowhead Forever turn-in spots (Data/QuestLocations.lua).
- 5122 Aurius and 95647 Ardin Grassman: `turnins` pins on the Stratholme and Excavation Site maps.
- 5722 Maur Grimtotem: `turninMap` points at the corpse spot on the Ragefire Chasm map.

Still missing. Neither Wowhead Forever nor Wowhead Classic gives coordinates inside these dungeons, so each one needs a `/loc` reading in game:

| Step | Turn-in | Needs |
|---|---|---|
| 4241, 4264, 4282 | Marshal Windsor (Detention Block) | `DUNGEON_MAPS["Blackrock Depths"].turnins`, floor 1 |
| 4341, 4342 | Kharan Mighthammer (Detention Block) | same |
| 4742 | Vaelan (Scarshield Infiltrator), LBRS | an LBRS map first |
| 4981, 5001 | Bijou, LBRS | an LBRS map first |
| 7643 | Ancient Equine Spirit, Dire Maul | `DUNGEON_MAPS["Dire Maul: East"]` or West, after finding which wing |

### Vague chain steps (short objective, no description yet)

Most of these are done inside a dungeon, so Wowhead has no world coordinates for them. They need a hand-written line on where in the dungeon.

| Step | Belongs to | Objective |
|---|---|---|
| 95787 |  | Make rubbings of the four Tablets of I'lalai in the Drowned City. |
| 95788 |  | Collect 5 I'lalai Fetishes from the trolls in the Drowned City. |
| 4981 |  | Travel to Blackrock Spire and find out what happened to Bijou. |
| 6564 | Blackfathom Deeps :: Allegiance to the Old Gods | Bring the Damp Note to Je'neu Sancrea in Ashenvale. |
| 92346 | Blackmaw Hold :: Get to the Roots of It | Speak with Nara Wildmane on Elder Rise in Thunder Bluff. |
| 4342 | Blackrock Depths :: The Fate of the Kingdom | Listen as Kharan Mighthammer tells his story. |
| 3982 | Blackrock Depths :: The Royal Rescue | Defend Gor'shak. |
| 7641 | Dire Maul: West :: Ancient Equine Spirit | Speak with Grimand Elmore in Stormwind's Dwarven District. |
| 7564 | Dire Maul: West :: Dreadsteed of Xoroth | Bring the Case of Blood to Gorzeeki Wildeyes in the Burning Steppes. |
| 7630 | Dire Maul: West :: Dreadsteed of Xoroth | Bring 3 Arcanite Bars to Gorzeeki in the Burning Steppes. |
| 5244 | Dire Maul: West :: Fragments of the Past | Speak with Jaron Stoneshaper in Starfall Village. |
| 94973 | Krol'dok Stronghold :: Key Ingredients | Find someone in Rog'mar who may know about the mould. |
| 94980 | Krol'dok Stronghold :: Key Ingredients | Find someone in Farholde Keep who may know about the mould. |
| 5001 | Lower Blackrock Spire :: Maxwell's Mission | Find Bijou's Belongings and return them to her. Good luck! |
| 4787 | Lower Blackrock Spire :: The Final Tablets | Bring the Ancient Egg to Yeh'kinya in Tanaris. |
| 1149 | Scarlet Monastery: Library :: Final Passage | If you have faith, leap from the planks overlooking Thousand Needles. |
| 1159 | Scarlet Monastery: Library :: Final Passage | Find Parqual Fintallas in Undercity. |
| 4808 | Scholomance :: Dawn's Gambit | Give Tinkee's Letter to Felnok Steelspring. |
| 4907 | Scholomance :: Dawn's Gambit | Speak with Tinkee Steamboil. |
| 4734 | Scholomance :: Dawn's Gambit | Use the Eggscilloscope Prototype on an egg in the Rookery. |
| 4810 | Scholomance :: Dawn's Gambit | Bring Felnok's Package to Tinkee Steamboil in the Burning Steppes. |
| 5531 | Scholomance :: Dawn's Gambit | Bring the Frozen Eggs to Betina Bigglezink. |
| 95111 | Shadowfang Keep :: Old Fire-Eye | Speak with Ott and ask him to forge your blade. |
| 95125 | Shadowfang Keep :: Old Fire-Eye | Watch as Ott forges your blade. |
| 95126 | Shadowfang Keep :: Old Fire-Eye | Bring Ott's Masterwork to Trevan Rol in Silverpine Forest. |
| 1651 | Shadowfang Keep :: The Test of Righteousness | Defend Daphne Stilwell from the Defias attack. |
| 1652 | Shadowfang Keep :: The Test of Righteousness | Speak to Duthorian Rall in Stormwind. |
| 1653 | Shadowfang Keep :: The Test of Righteousness | Speak to Jordan Stilwell in Ironforge. |
| 5742 | Stratholme: Living :: Of Love and Family | Listen to what Tirion Fordring has to say. |
| 4142 | Sunken Temple :: Haze of Evil | Take a Bloodpetal to Gregan Brewspewer in Feralas. |
| 1450 | Sunken Temple :: Into The Temple of Atal'Hakkar | Speak with Gryphon Master Talonaxe inside the Aerie Peak Aviary. |
| 1451 | Sunken Temple :: Into The Temple of Atal'Hakkar | Seek out Rhapsody Shindigger in The Hinterlands. |
| 1469 | Sunken Temple :: Into The Temple of Atal'Hakkar | Bring the Atal'ai Tablet Fragment to Brohann Caskbelly in Stormwind. |
| 1424 | Sunken Temple :: The Temple of Atal'Hakkar | Fel'zerul in Stonard wants you to gather 10 Atal'ai Artifacts. |
| 1444 | Sunken Temple :: The Temple of Atal'Hakkar | Return to Fel'Zerul in Stonard. |
| 8419 | Sunken Temple :: Trolls of a Feather | Bring a piece of felcloth to Impsy in Felwood. |
| 4147 | Sunken Temple :: Zapper Fuel | Travel to Marvon Rivetseeker's workshop in Ratchet. |
| 629 | The Drowned City :: The Drowned City | Bring a Tablet Shard to Kin'weelay at Grom'gol Base Camp. |
| 738 | Uldaman :: Agmond's Fate | Find Agmond. |
| 721 | Uldaman :: Amulet of Secrets | Find Hammertoe Grez in Uldaman. |
| 720 | Uldaman :: Amulet of Secrets | Find Prospector Ryedol and let him know Hammertoe Grez is alive. |
| 2199 | Uldaman :: Find the Gems | Bring five silver bars to Talvash del Kissel in Ironforge. |
| 2284 | Uldaman :: Find the Gems and Power Source | Find a clue as to the gems' whereabouts in the depths of Uldaman. |
| 723 | Uldaman :: The Lost Tablets of Will | Take Hammertoe's Amulet to Prospector Ryedol in the Badlands. |
| 724 | Uldaman :: The Lost Tablets of Will | Take Hammertoe's Amulet to Historian Karnik in Ironforge. |
| 725 | Uldaman :: The Lost Tablets of Will | Find Advisor Belgrum and give him his note. |
| 726 | Uldaman :: The Lost Tablets of Will | Speak to Historian Karnik. |
| 4186 | Upper Blackrock Spire :: Drakefire Amulet | Take Bolvar's Decree to Magistrate Solomon in Lakeshire. |
| 6403 | Upper Blackrock Spire :: Drakefire Amulet | Follow Reginald Windsor through Stormwind. Protect him from harm! |
| 4223 | Upper Blackrock Spire :: Drakefire Amulet | Speak with Marshal Maxwell in the Burning Steppes. |
| 4242 | Upper Blackrock Spire :: Drakefire Amulet | Give Marshal Maxwell the bad news. |
| 6566 | Upper Blackrock Spire :: Oculus Illusions | Listen to Thrall. |
| 2990 | Zul'Farrak :: Nekrum's Medallion | Bring Sharpbeak's Feather to Thadius Grimshade in the Blasted Lands. |
| 2933 | Zul'Farrak :: The Spider God | Bring a Venom Bottle to an apothecary in Tarren Mill. |
| 2935 | Zul'Farrak :: The Spider God | Speak with Master Gadrin in Sen'jin Village. |

### Main quests without a start or turn-in spot

Quests that start or end inside a dungeon, or start from a dropped item, are left out: they need no world-map spot.

**Alcaz Prison**
- Blood Red Bandanas (Horde): start — Eitrigg, Grommash Hold, Orgrimmar
- A Little Payback (Horde): start/turn-in — Not known yet

**Blackmaw Hold**
- Blackmaw Magic (Horde): turn-in — Not known yet

**City of Dalaran**
- Opportunistic Education (Horde): turn-in — Rexxie Copperclutch, inside the dungeon, near the sewer entrance

**Excavation Site: Wetlands**
- Songblade Search (Alliance): turn-in — Daewyn Songblade, inside Excavation Site: Wetlands
- Lost in the Thicket Things (Alliance): turn-in — Ardin Grassman, inside Excavation Site: Wetlands

**Hall of Thanes**
- An Ancient Grudge (Both): turn-in — Ghostly Attendant, inside the dungeon

**Krol'dok Stronghold**
- Tome of Twilight (Horde): turn-in — Riverglades (not known yet)
- A Token of Vengeance (Horde): turn-in — Riverglades (not known yet)
- Eye of Mugg (Alliance): turn-in — Commander Demar Brant, Farholde Keep, Riverglades
- Key Ingredients (Alliance): turn-in — Alphonse Dumas, Farholde Keep, Riverglades
- Key Ingredients (Horde): turn-in — Kreza Darkthorn, Rog'mar, Riverglades
- Curios of Curiosity (Alliance): turn-in — Melanie Sable (where she stands is not known yet)

**Mallet of Zul'Farrak**
- Mallet of Zul'Farrak (Both): turn-in — The gong at Gahz'rilla's pool, inside Zul'Farrak: use the Mallet of Zu

**Ruins of Lordaeron**
- Abominable Creatures (Alliance): turn-in — Captain Truman, just inside Ruins of Lordaeron

**Shaper's Terrace**
- Essence of Seeping Slimes (Horde): start/turn-in — Not known yet
- The Dark Crystal (Horde): start/turn-in — Not known yet

**The Deadmines**
-  (Both): start/turn-in — 

