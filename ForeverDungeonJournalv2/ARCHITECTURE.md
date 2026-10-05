# Forever Dungeon Journal Architecture (v1.5.0)

Forever Dungeon Journal is engineered for World of Warcraft Forever Beta (Interface `16001` / 12.0 engine branch). It provides a full-featured, zero-taint, standalone Dungeon Journal covering Classic dungeons and custom beta encounters.

---

## 1. Directory Structure

```
ForeverDungeonJournal/
├── Core/
│   ├── Bootstrap.lua           # Addon namespace, SavedVariables migration, keybindings, security watcher
│   └── Journal.lua             # Event dispatcher, instance detection, lifecycle management, slash commands
├── Data/
│   ├── Dungeons.lua            # Authoritative dungeon DB, bosses, loot, and quests (FDJ.DB, FDJ.ORDER)
│   ├── ItemReqLevels.lua       # Required level fallbacks for dungeon items
│   ├── DropRates.lua           # Curated drop rate percentages for Classic & beta boss loot
│   ├── DungeonEntrances.lua    # Outdoor entrance coordinates and waypoints
│   ├── DungeonRoutes.lua       # Step-by-step route guide walkthroughs
│   ├── DungeonMaps.lua         # Custom multi-floor vector maps & pin data (FDJ.DUNGEON_MAPS)
│   ├── Bosses.lua              # Boss levels, display IDs, and static portrait overrides
│   ├── BossTactics.lua         # Boss mechanics, ability descriptions, and role tips (Tank/Healer/DPS)
│   ├── QuestMaps.lua           # Quest pickup and turn-in map coordinates
│   ├── QuestChains.lua         # Prerequisite chain structures and step descriptions
│   ├── QuestRewards.lua        # XP, money, and item reward fallbacks
│   ├── QuestShareability.lua   # In-depth shareability audit and quest requirement data
│   └── DungeonPreparation.lua  # Authoritative dungeon keys, party dispels, and consumables
├── Systems/
│   └── MapMarkers.lua          # WorldMap pin rendering, route line overlays, combat-lockdown safe
├── UI/
│   ├── ThemeData.lua           # Dungeon artwork themes, header textures, and color schemes
│   ├── ItemComparisonData.lua  # Equipment slot mapping and stat weights
│   ├── Utilities.lua           # Shared UI helpers (scrollbars, backdrops, tab styling, language dropdowns)
│   ├── Minimap.lua             # Draggable minimap button with angle persistence and menu
│   ├── Portraits.lua           # 3D boss model rendering, 2D fallbacks, prewarm cache, combat safe
│   ├── Tooltips.lua            # Custom tooltip hooks, comparison tooltips, wishlist badge rendering
│   ├── DungeonMapsTab.lua      # Multi-floor vector maps, boss pin navigation, interactive floor buttons
│   ├── SearchWishlist.lua      # Full-text item search and wishlist manager panel
│   ├── LootExplorer.lua        # Multi-dungeon loot explorer with class/slot filtering
│   ├── HomeTab.lua             # Dungeon cards, active dungeon detection badge, progress tracking
│   ├── BossTab.lua             # Boss list, 3D model frame, tactics viewer, loot table with class/slot filters
│   ├── QuestsTab.lua           # Quest tree, prerequisite chains, shareability badges, reward previews
│   ├── MainFrame.lua           # Master frame container, header, navigation tabs, window dragging/resizing
│   └── DungeonPrep.lua         # Interactive preparation checklist (keys, party dispels audit, consumables)
├── Localization/
│   ├── Localization.lua        # Master string registry and enUS/deDE base strings
│   ├── Locale_*.lua            # Interface UI strings (frFR, esES, ruRU, itIT, ptBR, koKR, zhCN, zhTW)
│   └── Content_*.lua           # Dungeon, boss, quest, and tactic translations
└── tools/
    ├── validate_lua.py         # Syntax, block nesting, and bracket matching validator
    └── audit_globals.py        # AST-style lexical analyzer auditing undeclared global writes
```

---

## 2. Core Engineering Principles

### Single Source of Truth
All static facts (dungeon definitions, loot tables, quest metadata, coordinates, tactics, and routes) reside exclusively in `Data/`. UI components must never hardcode instance facts inline; they consume data through the shared `FDJ` namespace.

### Zero Global Namespace Pollution
All modules communicate strictly via the private addon table injected by the WoW client:
```lua
local ADDON_NAME, FDJ = ...
FDJ = FDJ or _G.ForeverDungeonJournal_NS
_G.ForeverDungeonJournal_NS = FDJ
```
No temporary variables or internal functions leak into `_G`. The only global symbols exposed are:
- `ForeverDungeonJournalDB`: The persistent SavedVariables table.
- `ForeverDungeonJournal_Toggle`: Backward-compatible public API toggle.
- Standard Blizzard slash commands (`/fj`, `/fdj`).
- Keybinding headers (`BINDING_HEADER_FOREVERDUNGEONJOURNAL`, `BINDING_NAME_FOREVERDUNGEONJOURNAL_TOGGLE`).

### Taint & Protected Frame Isolation
- **WorldMapFrame Safety**: `Systems/MapMarkers.lua` guards all map interactions with `InCombatLockdown()`. The addon never mutates or sets tainted script handlers on protected Blizzard UI frames.
- **EncounterJournal Safety**: Boss portrait prewarming in `UI/Portraits.lua` uses safe pcalls and skips execution if the player is in combat.
- **Security Watcher**: `Core/Bootstrap.lua` monitors `ADDON_ACTION_FORBIDDEN` and `ADDON_ACTION_BLOCKED` to immediately surface any execution violations in chat during development.

### Defensive SavedVariables Schema Migration
- On `PLAYER_LOGIN` (and during bootstrap), `FDJ.MigrateDatabase()` executes `FDJ.MergeDefaults()`.
- Default fields (`lastDungeon`, `lastBoss`, `lastQuest`, `lastMode`, `questFaction`, `showItemTooltips`, `language`, `minimap`, `wishlists`, `displayIDs`, `hiddenDungeons`) are initialized without clobbering user state.
- Deprecated keys from earlier beta versions (`learnedNpcIDs`, `portraitFileIDs`) are systematically pruned.

### Advanced In-Game Features (v1.5.0)
- **Wishlist Party/Raid Sharing**: `FDJ.ShareWishlistToParty()` formats wishlisted drops into clickable in-game item links and broadcasts to `PARTY` or `RAID` chat with chat-length protection (or personal chat if solo).
- **Wishlist Scoping**: Filter chips on the Wishlist panel allow instant switching between `[All Dungeons]` and `[This Dungeon]`.
- **Inventory Awareness (`[Owned]`)**: Real-time bag, equipment, and bank queries (`GetItemCount`) surface a green `[Owned]` indicator on boss loot rows, the Loot Explorer, and Wishlist rows.
- **Header Quick-Access**: Global golden star (`★`), Loot Explorer, and Dungeon Preparation (`Prep`) icons in the top header bar allow opening panels from any dungeon tab without losing page state.
- **Waypoint Navigation**: `FDJ.SetDungeonWaypoint(dungeonName)` integrates with Blizzard native SuperTrack user waypoints (`C_Map.SetUserWaypoint`) and TomTom (`_G.TomTom.AddWaypoint`). Accessible via `/fj wp [dungeon]` or Right-Clicking the entrance map button.
- **Dungeon Preparation Checklist**: `FDJ.ShowDungeonPrep()` evaluates required keys with inventory ownership (`[Owned]` vs `[Missing]`), performs a live party class audit to verify critical dispels (Poison, Curse, Disease, Magic), and counts essential consumables directly in players' bags.
- **Zone Trash & Rare Drops Coverage**: Curated BoE blue/epic world drops, rare recipes, and chest findings across all 13 dungeons accessible via a dedicated `Trash Drops` entry in the boss list.
- **Handcrafted Boss Medallions**: Custom 256×256 32-bit runic medallion portraits for unique beta bosses without native Blizzard artwork (e.g., `Highland Horror`, `Magmatus`, `Mana Elemental`, `Lordaeron Captain`).
- **Boss Loot Drop Rates**: Curated drop rate percentages from authoritative Classic and Forever beta telemetry surfaced alongside item slot badges (`Data/DropRates.lua`).
- **Native 12.0 UI Window Scaling**: Header zoom button with presets (85%, 100%, 110%, 120%, 130%) and `/fj scale <val>` slash command with persistent state in `ForeverDungeonJournalDB.scale`.
- **Native Addon Compartment Integration**: Full integration with the modern 12.0 minimap addon drawer (`## AddonCompartmentFunc`) for quick access to the journal and wishlist.
- **Persistent Dungeon Defeat Tracking**: Boss kill progress is preserved across UI `/reload` and disconnects during active lockouts, automatically resetting when entering a new dungeon or upon party instance reset.

---

## 3. Slash Commands

| Command | Description |
| :--- | :--- |
| `/fj` or `/fdj` | Toggle main journal window |
| `/fj help` | Display list of available commands |
| `/fj <dungeon>` | Direct jump to dungeon (e.g., `rfc`, `hot`, `dm`, `rol`, `wc`, `sfk`, `bfd`, `stocks`, `gnomer`, `rfk`, `smgy`, `dalaran`, `excavation`) |
| `/fj wp [dungeon]` | Set entrance waypoint & world map pin (e.g., `/fj wp dm` or `/fj wp` for current dungeon) |
| `/fj scale <val>` | Set window UI scale (e.g., `/fj scale 1.1`, `/fj scale 0.85`, or `/fj scale reset`) |
| `/fj prep` | Toggle Dungeon Preparation & readiness checklist panel |
| `/fj wl` | Toggle Wishlist panel directly |
| `/fj loot` | Toggle Loot Explorer panel directly |
| `/fj minimap` | Show / restore minimap button |
| `/fj lang <locale>` | Set language (`enUS`, `deDE`, `frFR`, `esES`, `ruRU`, `itIT`, `ptBR`, `koKR`, `zhCN`, `zhTW`, or `auto`) |
| `/fj rescan` | Rescan Encounter Journal for updated boss portraits |
| `/fj portraitids` | Print resolved boss display IDs to chat |


