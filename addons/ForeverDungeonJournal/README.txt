Forever Dungeon Journal v1.7.5 by Exehn
======================================

INSTALL
Extract the ForeverDungeonJournal folder into the WoW Forever client's
Interface/AddOns folder, replacing the previous addon files. Then /reload.
Keep your WTF folder / SavedVariables: no settings reset is required.
Open with /fj or /fdj. Open Deadmines directly with /fj dm.

CHANGES IN 1.7.5
- Added Data/QuestLocations.lua with verified start, turn-in, and objective map
  coordinates across dungeon quests and prerequisite chain steps.
- Added "Find <NPC>" objective map buttons (objectiveMap) in QuestsTab and
  QuestText tracker routing for out-of-dungeon quest steps.
- Added expandable inline quest chain bar in the quest list and refined dungeon
  route/chain metadata.

CHANGES IN 1.7.4
- Fixed the green [Owned] badge never appearing on boss loot, Loot Explorer and
  Wishlist rows: GetItemCount() no longer exists on Forever's modern API, so the
  journal now uses C_Item.GetItemCount().
- Fixed item quality colours always falling back to blue (GetItemQualityColor
  removed), and favourites/loot-filter icons and names that relied on the removed
  GetItemInfo()/GetItemIcon() globals. Same fix for GetItemStats, GetSpellTexture,
  GetAddOnMetadata, IsQuestFlaggedCompleted and GetQuestLogIndexByID fallbacks.
- Fixed the favourites right-click menu not detecting the mouse (MouseIsOver was
  removed; Region:IsMouseOver() is used instead).
- Fixed raw key names (OWNED, SHARE_WISHLIST, ITEM_REQ_LEVEL, WAYPOINT_CLEAR_TIP,
  NO_LOOT_RECORDED, ...) showing in the UI: 18 missing strings added in all 10 languages.
- Fixed the RPG Mode progress bar fallback calling BuildOldBar before it existed.
- Dungeon Preparation: the player is no longer listed twice in a raid, and secret
  unit names/classes during encounters are ignored instead of erroring.
- Version check: no addon messages are sent during chat-messaging lockdown, and
  secret addon-message payloads are ignored.
- Boss tactics: 57 Classic boss entries rewritten so their abilities match what the
  bosses actually cast (checked against creature spell data and the Forever 1.60.1
  spell database). Removed invented mechanics such as Aku'mai's "Void Spray",
  Ghamoo-ra's "Triple Chomp" and Gelihast's "Shadow Bubble"; role tips now refer to
  the real abilities. 17 more abilities renamed to their in-game names.
- Loot: 11 Forever recipe drops seen on live servers added to their bosses
  (Deadmines, Wailing Caverns, Shadowfang Keep, Stockade, Razorfen Kraul), and
  Dextren Ward added as a source of Defender's Leather Helm.
- Loot Explorer is now translated into all 10 languages (filters, headers, sort
  options, counts and empty messages). New file: UI/LootExplorerLocale.lua.

CHANGES IN 1.5.0
- Added authoritative Boss Loot Drop Rates across Classic & Forever beta dungeons.
- Added native UI Window Scaling: presets dropdown (85% to 130%) and /fj scale <val>.
- Added native 12.0 Minimap Addon Compartment integration (left-click journal, right-click wishlist).
- Fixed combat log (CLEU) registration in 12.0 Camelot engine for reliable mob & rare death tracking.
- Defeated boss progress now persists across /reload during active dungeon lockouts.
- Added ## AllowLoadGameType: camelot directive to prevent inappropriate loading on Retail.
- Added .pkgmeta release rules for clean, bloat-free distribution.

CHANGES IN 1.0.3
- Fixed the blank item-tooltip regression introduced in 1.0.2.
- Replaced Blizzard shopping-tooltip comparison calls with deterministic comparisons
  against the player's actual equipped inventory slots.
- Shields/off-hands now compare only against slot 17; if that slot is empty, no
  comparison box is shown. Rings/trinkets compare only against their two real slots.
- The hovered journal item is always the first/left-most tooltip.
- Empty comparison rectangles are suppressed.
- Snakeskin Bag is explicitly forced to its confirmed Uncommon/green rarity.

CHANGES IN 1.0.2
- Fixed item comparison layout and slot selection in boss loot and quest rewards.
- Shift-hover now uses Forever's native compare helper so shields/off-hands compare
  only against the correct equipped slot and one-hand/ring/trinket pairs are handled natively.
- The hovered journal item stays first/left-most; equipped comparisons are placed after it.
- Added a minimum width to the primary item tooltip for a cleaner, consistent layout.
- Fixed rarity coloring when a beta item link contains a stale color code; numeric client
  quality now wins, with the journal's curated quality as fallback (fixes Snakeskin Bag).

RELEASE 1.0
- First public release build.
- Dungeon home page with level-ordered dungeon covers.
- Boss, loot and quest pages with faction/class quest handling.
- Live quest XP/item data used when available from the client.
- Quest-giver map markers for recorded starts.

CHANGES IN 0.7.1
- Fixed repeated/wrong Deadmines portraits caused by a shared asynchronous model.
- Every NPC now owns a separate model frame, and its display is read after loading.
- Old derived portrait IDs are cleared automatically once; settings are retained.
- Late callbacks from cancelled requests cannot populate another NPC's portrait.
- Added checks for delayed loads, immediate loads, missing model events, timeouts
  and rescanning, with distinct simulated NPC display IDs.

CHANGES IN 0.7.0
- Fixed the quest-data request / refresh loop that caused C stack overflow.
- Requests are deduplicated before calling the client; events refresh next frame.
- Failed requests retry only on a later selection/open after a 30-second cooldown.
- Quest rows grow to fit wrapped titles, including The Treaty of Understanding.
- Scroll height follows the actual row heights; all text stays inside each row.
- Quest detail header grows with the title; body and rewards fit the viewport.
- Quest IDs are hidden in both the list and the details.
- Empty faction lists clear the old quest title and rewards.
- Added The Deadmines: seven quests, nine boss/rare/phase entries and a trash
  category, with 40 loot entries including six new Forever items.
- Supports Deadmines auto-detection and the existing portrait resolver.

DATA
Deadmines includes the new Destruction in Deadmines quest and the beta's new
reward choices. Item tooltips use your game client for current stats. Loot and
quest data can change during beta; sources and remaining limits are in SOURCES.txt.
XP is read from the client when available. Observed beta fallbacks are used only
where recorded; unverified base-cache XP is not presented as current live XP.

VALIDATION
Lua loaded and exercised in a mocked game API: synchronous quest-data callbacks,
100 repeated quest clicks, all dungeon/quest/boss selections, faction changes,
empty lists, live XP, failed-request cooldowns and event bursts. The wrapped-title
height and scroll extent were checked with simulated font metrics.
The actual Forever client is not available here; in-game appearance and API
behavior still require verification in the beta.

0.8.0
-----
- Added Blackfathom Deeps with bosses, loot and Alliance/Horde dungeon quests.
- Added Show on Map support for recorded Blackfathom quest givers.
- Added /fj bfd shortcut.


v0.10.0
- Added a Dungeon Home page with large clickable dungeon cards.
- The journal now opens on Home by default.
- Added a persistent Home button to return from a dungeon page.


Developer note (v1.3.0): the addon is now separated into data, systems, UI data, and core runtime modules. See ARCHITECTURE.md.


Localization:
/fj lang de / fr / es / ru / it   - force German UI
/fj lang en   - force English UI
/fj lang auto - follow the WoW client locale
/fj lang      - show the active setting
The test currently localizes addon interface labels; dungeon/quest source content remains English.
