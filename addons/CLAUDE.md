# WoW Forever addon suite

All addons here target **WoW Forever** (Camelot, 12.x engine, `## Interface: 16001`).
The `wow-forever-addon-development` skill holds the full engine rules (TOC, taint,
secret values, SavedVariables, map pins). Load it before any addon work.

## Ground truth, in priority order
1. **Forever's own UI source** – `C:\Users\marco\wow-tools\framexml\forever` (Gethe/wow-ui-source,
   branch `forever`, check `git -C ... describe --tags` for the build). Retail reference: `framexml\live`.
   Search: `python C:\Users\marco\wow-tools\scripts\wow_framexml_search.py --func X | --template X | --mixin X | --event X [--compare]`.
   Update: `git -C C:\Users\marco\wow-tools\framexml\forever pull --depth 1`.
   (`/console ExportInterfaceFiles code` does nothing on the Forever client – use this repo instead.)
2. **API annotations** – `C:\Users\marco\wow-tools\api-stubs` (Ketho/vscode-wow-api + NumyAddon FrameXML
   submodule). These are Retail-based: Classic-only frames (`LFGParentFrame`, `QuestFramePushQuestButton`…)
   show as undefined but may exist on Forever – confirm in `framexml\forever` before "fixing".
3. **Spells** – `python C:\Users\marco\wow-tools\scripts\wow_spell_db.py <name|id>`.
4. **Game data on the web** – wowhead.com/forever is the main source; the ranked list of backups
   (and which ones to treat with care) is at the top of `ForeverDungeonJournal/SOURCES.txt`.
   Record every source you use in that file's changelog.
5. **Forever's live hotfix values** – `wow-hotfix` (`C:\Users\marco\wow-tools\scripts\wow_hotfix_cache.py`)
   decodes the client's `Cache\ADB\enUS\DBCache.bin` with WoWDBDefs layouts (`wow-tools\WoWDBDefs`,
   `git pull` it after a client patch). This is the most authoritative offline source for anything the
   Forever server changed: `wow-hotfix tables`, `wow-hotfix get ItemSparse 6341`,
   `wow-hotfix dump ItemSparse --out ...\wow-tools\data\hotfix\ItemSparse.json`, `wow-hotfix find Spell "Pounce"`.
   A record missing from the cache means it wasn't hotfixed (the base client value applies).
   Cross-check single items with `https://nether.wowhead.com/forever/tooltip/item/<id>` (plain JSON).
   `tools/compare_hotfix_items.py` reports where the journal's loot data disagrees with it.
   Read-only by design: game files are opened for reading only; never write to the game folder.

## Checking code
- Each addon folder has `.luarc.json` (Lua 5.1 + annotations). Static check:
  `lua-language-server --check <addon dir> --checklevel=Warning --check_out_path=<scratch>\check.json`
  Compare against a baseline – don't chase pre-existing warnings unprompted.
- ForeverDungeonJournal also has `tools/validate_lua.py`, `tools/audit_addon_health.py`, `tools/audit_globals.py`.

## In-game errors
BugGrabber/BugSack are installed. After the user `/reload`s or logs out, read
`C:\Program Files (x86)\World of Warcraft\_forever_\WTF\Account\54273602#2\SavedVariables\BugSack.lua`
(and `!BugGrabber.lua`) for real stack traces. Never edit files under `WTF` while the game is running.

## Layout
- `_forever_\Interface\AddOns\<Addon>` are NTFS junctions to the folders here – edits are live after `/reload`.
- Only `ForeverDungeonJournal` is a git repo; other addons are unversioned – be careful with destructive edits.
- `addons\SKILL.md` is hard-linked to `.agents\skills\…`, `~\.claude\skills\…` and `~\.gemini\…`.
  Edit it in place (don't replace the file, or the links break).
