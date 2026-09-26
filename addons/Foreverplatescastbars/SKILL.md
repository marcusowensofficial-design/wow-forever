---
name: wow-forever-addon-development
description: |
  Comprehensive guide and rules for creating and editing World of Warcraft addons specifically for WoW Forever (Camelot / 12.0 engine) and modern WoW clients.
  Covers 16001 TOC standards, Single-TOC architecture, AllowLoadGameType filters, XML and Lua frame design, secret values / UI taint, ruleset realm substitution, SavedVariables beta workarounds, and nameplate/unit frame mechanics.
license: Apache-2.0
metadata:
  version: v3
  publisher: user
---

# WoW Forever & Modern Addon Development Guide

This skill provides critical domain knowledge, architectural standards, and debugging rules for developing and maintaining World of Warcraft addons for **WoW Forever** (the 12.0 / Camelot beta engine) and modern Retail clients.

---

## 1. Engine Identity, Versioning & TOC Architecture

### 1.1 Key Engine Facts
- **Interface Version**: `16001` (TOC header: `## Interface: 16001`).
- **Engine Flavor**: WoW Forever (internal project code "Camelot") runs on the **Retail Midnight (12.0)** engine with Classic assets and mechanics.
- **Mainline Classification**: Forever is officially classed by the game client as `mainline`. **This is intentional.**

### 1.2 Multi-TOC Issues vs The Recommended 1-TOC Setup
Because Forever is classed as `mainline`, any `_Mainline.toc` will **also load on Forever**. This causes conflicts, duplicate executions, or broken overrides when maintaining separate `_Mainline.toc` and `_Camelot.toc` files.
- While patch 12.1.5 introduces `_Standard.toc` as a mechanism to load strictly on Retail, **moving to a unified Single-TOC (1 TOC) setup is the recommended best practice**.
- The 1-TOC architecture uses inline game type tags to control addon visibility, metadata, and per-file loading.

### 1.3 TOC Directives & Conditional GameType Tags
Use `## AllowLoadGameType` and `## ExcludeLoadGameType` to control loading behavior:

| Directive / Tag | Target / Scope | Behavior |
|---|---|---|
| `## AllowLoadGameType: standard` | Entire Addon | Addon only loads on Retail (hidden on Forever & Classic). |
| `## AllowLoadGameType: camelot` | Entire Addon | Addon only loads on WoW Forever. |
| `## Title: MyAddon [AllowLoadGameType standard]` | Metadata | Sets title specifically on Retail. |
| `## Title: MyAddon (Forever) [AllowLoadGameType camelot]` | Metadata | Sets title specifically on WoW Forever. |
| `file.lua [AllowLoadGameType standard]` | File Loading | Loads `file.lua` strictly on Retail. |
| `file.lua [AllowLoadGameType camelot][ExcludeLoadGameType standard, classic]` | File Loading | Loads `file.lua` strictly on WoW Forever. *(Keep an eye on this tag; syntax will evolve in future builds)* |
| `ui.xml [AllowLoadGameType camelot]` | XML Loading | Loads XML layout strictly on WoW Forever. |

### 1.4 Pristine 1-TOC Reference Example
```toc
## Interface: 16001
## Title: MyAddon [AllowLoadGameType camelot]
## Title: MyAddon (Retail) [AllowLoadGameType standard]
## Notes: Clean 1-TOC setup supporting WoW Forever and Retail
## Author: You
## Version: 1.0.0
## SavedVariables: MyAddonDB
## LoadSavedVariablesFirst: true

# Shared Files
shared\constants.lua
shared\utilities.lua

# WoW Forever Exclusive Files
forever\ruleset.lua [AllowLoadGameType camelot][ExcludeLoadGameType standard, classic]
forever\templates.xml [AllowLoadGameType camelot][ExcludeLoadGameType standard, classic]
forever\core.lua [AllowLoadGameType camelot][ExcludeLoadGameType standard, classic]

# Retail Exclusive Files
retail\features.lua [AllowLoadGameType standard]

# Main Addon Entry Point
init.lua
```

---

## 2. Beta Engine Known Bugs & Workarounds

### 2.1 SavedVariables Disk Persistence Bug (CRITICAL)
- **The Issue**: In the current WoW Forever (1.60 / Camelot) Beta engine, Blizzard has a client-level I/O bug where **`SavedVariables` are NOT flushed or persisted to disk on `/reload`, logout, or client exit across ALL addons**.
- **Impact**: Any addon settings changed in-game (via GUI options panels, slash commands, or SavedVariables tables) **will be lost upon UI reload or restart**.
- **Development Workaround**:
  - Do **not** rely on in-game configuration staying saved between sessions.
  - All styling, color palettes, scale/size values, offsets, and feature toggles must be configured directly inside the addon's default settings table in Lua (e.g. `addonDBDefaults` in `core.lua`).
  - Always merge defaults defensively inside `ADDON_LOADED`.

### 2.2 `UnitName("player")` vs `UnitName("target")` Discrepancy
- **The Issue**:
  - `UnitName("player")` returns the **full name** (including normalized realm/suffix or full identifier).
  - `UnitName("target")` does **NOT** return the full name (returns a truncated, short, or base name).
- **Status**: Blizzard's client team is actively iterating on unit name resolution; the final behavior is still evolving. Keep an eye on incoming beta patches.
- **Defensive Best Practices**:
  1. **Never use strict string equality** to test if a target is the player:
     ```lua
     -- BAD / UNRELIABLE ON FOREVER:
     if UnitName("target") == UnitName("player") then ... end

     -- SAFE & TAINT-FREE:
     if UnitIsUnit("target", "player") then ... end
     ```
  2. **Sanitize Names**: Strip realm suffixes using `Ambiguate(name, "none")` or regex `name:match("^[^-]+")` when indexing lookup tables or formatting display strings.

### 2.3 Community Bug Telemetry & Stanzilla WoWUIBugs Tracker
- **Official WoWUIBugs Repository**: [https://github.com/Stanzilla/WoWUIBugs/issues/](https://github.com/Stanzilla/WoWUIBugs/issues/)
  - The authoritative community repository tracking active client and FrameXML bugs, directly monitored by addon authors and Blizzard UI engineers.
- **WoW Forever Discord #bugs Channel**:
  - Live discussion on beta build updates (e.g. frequent build drops during active beta testing cycles).
- **Recent Notable Forever Beta Bugs (Build 1.60.1.69977 / Interface 16001)**:
  - **Issue #887 (`cancelaura` on target-slot)**: In `Blizzard_FrameXML/SecureTemplates.lua`, `CANCELABLE_ITEMS` was replaced with `IsCancellableSlotValid`, but `cancelaura` still indexes `CANCELABLE_ITEMS[slot]`, causing fatal nil-indexing errors when cancelling temporary weapon enchants via `SecureActionButtonTemplate`.
  - **Issue #886 (Shaman Weapon Imbues)**: Shaman weapon imbues (`Enum.ItemEnchantType.Imbue`) are invisible to `C_PaperDollInfo.GetTemporaryEnchantmentInfo(16)` and `CustomAuraContainerTemplate`. Addons must query `C_Item.GetWeaponEnchantInfo(slot)` directly to detect imbues like Rockbiter, Flametongue, or Windfury.

---

## 3. Realm Names & Ruleset Substitution (AceDB Pattern)

### 3.1 The Realm Absence Problem
WoW Forever does **not** have traditional realms or server names. Standard APIs like `GetRealmName()` or `GetNormalizedRealmName()` return empty strings (`""`), nil, or generic non-unique server strings.

### 3.2 Using Rulesets as Makeshift Realms
If you are using **AceDB-3.0** (or your own custom profile / SavedVariables manager) and need a realm identifier for per-realm settings or character profiles (`charKey = name .. " - " .. realm`), use active **Game Rulesets** as the makeshift realm name.

Blizzard's AceDB-3.0 implementation handles this for builds between version 16000 and 20000:
```lua
local function GetMakeshiftRealmName()
    local _, _, _, version = GetBuildInfo()
    if version > 16000 and version < 20000 then
        if C_GameRules and C_GameRules.IsGameRuleActive then
            if C_GameRules.IsGameRuleActive(Enum.GameRule.HardcoreRuleset) then
                return "Hardcore"
            elseif C_GameRules.IsGameRuleActive(Enum.GameRule.RPRuleset) then
                return "RP"
            elseif C_GameRules.IsGameRuleActive(Enum.GameRule.PvPRuleset) then
                return "PvP"
            else
                return "PvE"
            end
        end
    end
    local realm = GetRealmName()
    return (realm and realm ~= "") and realm or "PvE"
end
```

### 3.3 Standalone SavedVariables Key Pattern
```lua
local playerName = UnitName("player")
if playerName then
    playerName = Ambiguate(playerName, "none") -- Strip any trailing realm suffix
end
local realmKey = GetMakeshiftRealmName()
local profileKey = (playerName or "Unknown") .. " - " .. realmKey
```

---

## 4. Lua & XML Addon Building Architecture

Building modern addons on the 12.0 Camelot engine requires a clean separation of concerns between declarative markup (XML) and dynamic logic (Lua).

### 4.1 When to Use XML vs Pure Lua
- **Use XML for**:
  - Static frame structures, overlays, and virtual templates (`virtual="true"`).
  - Inheriting standard Blizzard templates (`BackdropTemplate`, `ResizeLayoutFrame`, `UIPanelButtonTemplate`).
  - Pre-allocating widget hierarchies (StatusBars, FontStrings, Textures) that load before Lua scripts execute.
- **Use Lua for**:
  - All dynamic data queries, mathematical operations, and combat updates.
  - Event registration (`RegisterEvent`) and frame script handlers (`SetScript`, `HookScript`).
  - Safe formatting of 12.0 `<secret value>` numbers and strings.
  - Zero-taint nameplate hooking and registry management.

### 4.2 Modern XML Template Declarations
```xml
<Ui xmlns="http://www.blizzard.com/wow/ui/"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://www.blizzard.com/wow/ui/
    https://raw.githubusercontent.com/Gethe/wow-ui-source/live/Interface/AddOns/Blizzard_SharedXML/UI.xsd">

    <!-- Virtual Cast Bar Template with BackdropTemplate -->
    <StatusBar name="MyForeverCastBarTemplate" virtual="true" inherits="BackdropTemplate">
        <Size x="200" y="18"/>
        <BarTexture file="Interface\TargetingFrame\UI-StatusBar"/>
        <BarColor r="1.0" g="0.7" b="0.0"/>
        <Layers>
            <Layer level="BACKGROUND">
                <Texture name="$parentBackground" setAllPoints="true">
                    <Color r="0.1" g="0.1" b="0.1" a="0.8"/>
                </Texture>
            </Layer>
            <Layer level="ARTWORK">
                <Texture name="$parentIcon" parentKey="Icon">
                    <Size x="18" y="18"/>
                    <Anchors>
                        <Anchor point="RIGHT" relativePoint="LEFT" x="-4" y="0"/>
                    </Anchors>
                </Texture>
                <FontString name="$parentText" parentKey="Text" inherits="GameFontHighlightSmall">
                    <Anchors>
                        <Anchor point="CENTER" x="0" y="0"/>
                    </Anchors>
                </FontString>
            </Layer>
        </Layers>
    </StatusBar>

    <!-- Concrete Main Frame Container -->
    <Frame name="MyForeverMainFrame" parent="UIParent" hidden="true" inherits="BackdropTemplate">
        <Size x="320" y="240"/>
        <Anchors>
            <Anchor point="CENTER"/>
        </Anchors>
    </Frame>
</Ui>
```

### 4.3 XML Script Traps & Best Practices
- **Never put inline Lua logic inside XML `<Scripts>` tags** (e.g. `<OnUpdate>`, `<OnClick>`, `<OnLoad>`). Inline XML scripts execute in a less controlled scope, complicate stack tracing, and can easily introduce UI taint when touching protected frames.
- **Preferred Pattern**: Define the frame hierarchy in XML, then bind scripts and events in Lua:
  ```lua
  local addonName, ns = ...

  local frame = MyForeverMainFrame
  frame:RegisterEvent("PLAYER_LOGIN")
  frame:SetScript("OnEvent", function(self, event, ...)
      if event == "PLAYER_LOGIN" then
          ns:Initialize()
      end
  end)
  ```

---

## 5. The 12.0 / Camelot "Secret Values" & UI Taint System

Starting in 12.0 (Camelot / WoW Forever), Blizzard introduced strict UI taint and data protection:

### 5.1 Secret Values
- In restricted environments (combat, dungeons, raids), APIs like `UnitHealth()`, `UnitHealthMax()`, `bar:GetValue()`, and status bar text can return `<secret number>` or `<secret string>`.
- **Fatal Error**: Any mathematical comparison or operator (`val > 0`, `val >= 1000`, `val + 1`, `hp / maxHp`, `AbbreviateNumbers(val)`) on a secret value triggers a fatal Lua error:
  ```
  attempt to perform arithmetic on a secret value (while execution tainted by '<AddonName>')
  attempt to compare local 'val' (a secret number value, while execution tainted by '<AddonName>')
  ```

### 5.2 Official Inspection APIs
- `issecretvalue(value)`: Returns `true` if `value` is a secret value.
- `issecrettable(tbl)`: Returns `true` if a table contains secret values.
- `issecurevalue(value)`: Returns `true` if a value is secure.

### 5.3 The `<secret string>` Trap with `fs:GetText()`
- On 12.0 clients, reading text from Blizzard native widgets via `fs:GetText()` returns a `<secret string>` when tainted.
- Any comparison (`t ~= ""`, `t == ""`), pattern match (`t:match(...)`, `t:find(...)`), or string concatenation (`..`) on a secret string throws:
  ```
  attempt to compare local 't' (a secret string value, while execution tainted by '<AddonName>')
  ```
- **Rule**: Never attempt to read or parse Blizzard's native FontStrings to extract health or percentage values. Always generate addon-owned FontStrings and calculate values independently.

### 5.4 C-Side Formatting on FontStrings (`FontString:SetFormattedText`)
- Standard Lua `string.format("%d", val)` throws fatal errors when passed a secret value.
- Blizzard's C++ widget method `FontString:SetFormattedText()` **natively accepts secret values** and formats them internally without exposing raw numbers to the Lua VM:
  ```lua
  -- Secret integer health display
  pcall(fs.SetFormattedText, fs, "%d", secretHp)
  -- Secret percentage display (scaled 0-100)
  pcall(fs.SetFormattedText, fs, "%.0f%%", secretPercent)
  ```
- Always wrap in `pcall` and provide a fallback to `FontString:SetText(secretVal)`.

### 5.5 `CurveConstants.ScaleTo100` & `UnitHealthPercent`
- In 12.0, `UnitHealthPercent(unit)` returns a normalized 0.0–1.0 secret value by default. Formatting with `"%.0f%%"` would output `1%` or `0%`.
- To obtain a 0–100 percentage in 12.0 without Lua math, pass Blizzard's built-in scale curve:
  ```lua
  local curve = (CurveConstants and CurveConstants.ScaleTo100) or GetScaleTo100Curve()
  local percent = UnitHealthPercent(unit, true, curve)
  fs:SetFormattedText("%.0f%%", percent)
  ```
- **Curve Fallback**: If `CurveConstants.ScaleTo100` is nil, construct a curve via `C_CurveUtil.CreateCurve()`:
  ```lua
  local curve = C_CurveUtil.CreateCurve()
  curve:SetType(Enum.LuaCurveType.Linear)
  curve:AddPoint(0, 0)
  curve:AddPoint(1, 100)
  ```

### 5.6 Real-Time Combat Updates via `healthBar:HookScript("OnValueChanged")`
- In combat, Blizzard's C++ engine calls `healthBar:SetValue(hp)` directly on the unit frame's status bar.
- Hooking `OnValueChanged` and `OnMinMaxChanged` on `unitFrame.healthBar` ensures instant, zero-delay health and percentage updates on the exact frame damage occurs:
  ```lua
  if not healthBar.FPHookedValueChanged and healthBar.HookScript then
      healthBar.FPHookedValueChanged = true
      healthBar:HookScript("OnValueChanged", function(self)
          UpdateHealthText(unitFrame)
      end)
      healthBar:HookScript("OnMinMaxChanged", function(self)
          UpdateHealthText(unitFrame)
      end)
  end
  ```

### 5.7 The Visual Status Bar Width Trap (`tw / w`)
- Status bar fill textures frequently use texture coordinate clipping rather than physical pixel resizing, or may report full width before layout. This locks `(tw / w)` to `100%` continuously!
- **Rule**: Never place visual fill ratio before `UnitHealthPercent(unit, true, curve)` in your evaluation chain.

### 5.8 Defensive Guard Pattern
```lua
local val = bar:GetValue()
if issecretvalue and issecretvalue(val) then
    -- Value is secret / restricted: do NOT compare (val > 0) or format with AbbreviateNumbers(val)
    return
end
if val and val > 0 then
    -- Safe to perform standard math
end
```

---

## 6. Forbidden Frames & Safe Nameplate Lifecycle

1. **`IsForbidden()` Check**:
   - Always check `if not frame or frame:IsForbidden() then return end` before touching any nameplate or unit frame.
2. **Lifecycle Events**:
   - Use `NAME_PLATE_UNIT_ADDED` (payload: `unitID`) and `NAME_PLATE_UNIT_REMOVED` (payload: `unitID`).
   - Retrieve frame via `C_NamePlate.GetNamePlateForUnit(unitID)` or iterate with `C_NamePlate.GetNamePlates()`.
   - Ensure the frame has an active `unitFrame` before applying modifications.

---

## 7. Nameplate Zero-Taint Architecture (ForeverPlates / Plater-Style)

1. **External Registry Pattern**:
   - **Never** attach custom tables, textures, or status bars directly onto Blizzard's `unitFrame` (e.g. `unitFrame.myCustomBar = ...`).
   - Use an internal registry table keyed by the frame:
     ```lua
     local plates = {} -- plates[unitFrame] = { border = ..., nameText = ..., levelBox = ... }
     ```
2. **Addon-Owned FontStrings for Names**:
   - Blizzard's native name FontString (`unitFrame.name`) is automatically recolored and reset to white during combat updates.
   - Set Blizzard's name to alpha 0 (`unitFrame.name:SetAlpha(0)`).
   - Create an addon-owned FontString parented to the health bar:
     ```lua
     local nameText = healthBar:CreateFontString(nil, "OVERLAY")
     nameText:SetFont(font, size, "OUTLINE")
     data.nameText = nameText
     ```
3. **Mandatory Recursion Guards on All Secure Hooks**:
   - When hooking Blizzard methods (`SetPoint`, `SetFontObject`, `Show`, `SetBackdrop`), always guard with a boolean flag to prevent C-stack overflow:
     ```lua
     hooksecurefunc(fs, "SetPoint", function(self, point, relTo, relPoint, x, y)
         if self.FPReanchoring then return end
         self.FPReanchoring = true
         -- your re-anchoring logic
         self.FPReanchoring = nil
     end)
     ```
4. **Blizzard `statusText` CVar Nameplate Clash**:
   - When providing custom health text on nameplates, keep `SetCVar("statusText", "0")` and `SetCVar("statusTextDisplay", "NONE")`, and hide native FontStrings via `pcall(fs.SetAlpha, fs, 0)`.
5. **Composite Health Text Architecture (`150/150 100%`)**:
   - **The Problem**: In combat, `hp` and `maxHp` are secret numbers. String concatenation (`hp .. "/" .. maxHp`) crashes with fatal Lua errors.
   - **The Solution**: Use 4 separate addon-owned FontStrings (`hpCurrent`, `hpDivider`, `hpMax`, `hpPercent`) anchored flush:
     ```lua
     data.hpDivider:ClearAllPoints()
     data.hpDivider:SetPoint("CENTER", hb, "CENTER", -16, 0)
     data.hpDivider:SetJustifyH("CENTER")
     data.hpDivider:SetText("/")

     data.hpCurrent:ClearAllPoints()
     data.hpCurrent:SetPoint("RIGHT", data.hpDivider, "LEFT", 0, 0)
     data.hpCurrent:SetJustifyH("RIGHT")

     data.hpMax:ClearAllPoints()
     data.hpMax:SetPoint("LEFT", data.hpDivider, "RIGHT", 0, 0)
     data.hpMax:SetJustifyH("LEFT")

     data.hpPercent:ClearAllPoints()
     data.hpPercent:SetPoint("LEFT", data.hpMax, "RIGHT", 4, 0)
     data.hpPercent:SetJustifyH("LEFT")
     ```
   - **Secret Mode**: Use `pcall(fs.SetFormattedText, fs, "%d", secretHp)` and `pcall(fs.SetFormattedText, fs, "%.0f%%", secretPercent)`.
   - **Non-Secret Mode**: Use `data.hpCurrent:SetText(Abbreviate(hp) .. "/" .. Abbreviate(maxHp) .. " " .. pctStr)`.

---

## 8. Level Text Typography & Difficulty Colors

1. **Multi-Stage Level FontString Discovery**:
   - The level FontString on nameplates varies across client builds and templates (`unitFrame.LevelFrame.LevelText`, `unitFrame.LevelFrame.levelText`, `levelFrame.Text`, `unitFrame.level`). Resolve via a multi-stage helper.
2. **Bold & Matched Font Application**:
   - Use `"THICKOUTLINE"` with a bold font (e.g. `ForcedSquare.ttf`):
     ```lua
     levelText:SetFont(font, fontSize, "THICKOUTLINE")
     levelText:SetShadowOffset(1, -1)
     levelText:SetShadowColor(0, 0, 0, 0.95)
     ```
3. **Preserving Difficulty Colors**:
   - Never call `SetTextColor` on the level FontString unless intentionally overriding. Blizzard's native creature difficulty coloring (grey, green, yellow, orange, red, skull) will remain intact.

---

## 9. Nameplate Auras, Debuffs & Buffs (`C_UnitAuras`)

1. **Modern `C_UnitAuras` API & `UNIT_AURA` Event**:
   - In 12.0, `UNIT_AURA` provides `(unitTarget, updateInfo)` with `addedAuras`, `updatedAuraInstanceIDs`, and `removedAuraInstanceIDs`.
   - Primary lookup API: `C_UnitAuras.GetAuraDataByAuraInstanceID(unit, auraInstanceID)`.
2. **Preventing Mob Name Clipping**:
   - When mob names are raised (e.g. `y = +6`), debuff icons and duration timers clip into the text.
   - Shift the aura container anchor north (`y = +2` or higher) and hook `SetPoint`.
3. **Native CVar Support**:
   - `nameplateDebuffPadding` controls engine-level spacing between the health bar and debuffs:
     ```lua
     SetCVar("nameplateDebuffPadding", "6")
     ```

---

## 10. Threat, Aggro & Execute Mechanics

1. **Threat Query**:
   ```lua
   local function GetSafeThreatStatus(unit)
       if not unit or not UnitExists(unit) or not UnitCanAttack("player", unit) then
           return nil
       end
       local ok, isTanking, threatStatus = pcall(UnitDetailedThreatSituation, "player", unit)
       if not ok or not threatStatus then return nil end
       if issecretvalue and issecretvalue(threatStatus) then return nil end
       return isTanking, threatStatus
   end
   ```
2. **Role-Based Threat Coloring (Plater Logic)**:
   - **Tank**: `3` = Green (Holding), `2/1` = Orange (Losing), `0` = Red (Lost).
   - **DPS/Healer**: `3` = Red (Aggroed), `2/1` = Orange (High), `0` = Normal class/reaction color.
3. **Execute Range**:
   - Guard health queries against secret values before calculating `(hp / maxHp) * 100`.
   - Trigger execute border glow or tint when `percent <= executeThreshold` (e.g. 20% or 35%).

---

## 11. Cast Bars & Interrupt Shields

1. **Cast Query APIs**:
   - `UnitCastingInfo(unit)`: 8th return value is `notInterruptible` (boolean).
   - `UnitChannelInfo(unit)`: 7th return value is `notInterruptible` (boolean).
2. **Visual Indicators**:
   - **Interruptible**: Standard color (e.g. Gold/Yellow), spell icon visible.
   - **Not Interruptible (Shielded)**: Distinct color (e.g. Silver/Grey/Orange) + shield icon.
3. **Cast Events**:
   - Register `UNIT_SPELLCAST_START`, `UNIT_SPELLCAST_STOP`, `UNIT_SPELLCAST_FAILED`, `UNIT_SPELLCAST_INTERRUPTED`, `UNIT_SPELLCAST_CHANNEL_START`, `UNIT_SPELLCAST_CHANNEL_STOP`, `UNIT_SPELLCAST_INTERRUPTIBLE`, `UNIT_SPELLCAST_NOT_INTERRUPTIBLE`.

---

## 12. Target Highlighting & Essential Nameplate CVars

1. **Target Identification**: Check `UnitIsUnit(unit, "target")`.
2. **Engine CVars**:
   | CVar | Value | Description |
   |---|---|---|
   | `nameplateMotion` | `0` or `1` | `0` = Overlapping nameplates, `1` = Stacking nameplates. |
   | `nameplateOverlapH` | `0.8` - `1.1` | Horizontal spacing between stacked nameplates. |
   | `nameplateOverlapV` | `1.1` - `1.4` | Vertical spacing between stacked nameplates. |
   | `nameplateSelectedScale` | `1.15` - `1.25` | Scale multiplier for the targeted nameplate. |
   | `nameplateMinScale` / `nameplateMaxScale` | `1.0` | Eliminates distance scaling jitter. |
   | `nameplateDebuffPadding` | `4` - `8` | Distance between health bar and debuff icons. |
   | `nameplateTargetRadialPosition` | `1` or `2` | Fixates target plate inside screen bounds. |
   | `nameplateShowEnemyMinions` | `0` or `1` | Toggle display of totems, pets, and minor guardians. |
   | `nameplateShowEnemyMinus` | `0` or `1` | Toggle display of trivial/minor mobs. |

---

## 13. Pixel Borders, Outlines & Legacy Art Suppression

1. **Crisp 1px/2px Pixel Borders**:
   - Use 4 thin textures (`top`, `bottom`, `left`, `right`) using `"Interface\\Buttons\\WHITE8X8"` on layer `"OVERLAY"` (sublevel 5 or 6).
2. **Synchronized Outlines**:
   - Keep health bar and level box borders synchronized in color and thickness.
3. **Suppressing Blizzard Default Art**:
   - Suppress classic gold dragon textures, selection highlights, and NineSlice borders by setting textures to `nil`, alpha 0, and hooking `Show` / `SetAlpha`.

---

## 14. SavedVariables Architecture & Defaults Management

1. **Modern Engine TOC Directive (`LoadSavedVariablesFirst: true`)**:
   - Instructs Blizzard's C++ engine to deserialize SavedVariables before parsing addon scripts.
2. **Defensive Default Merging**:
   - In `ADDON_LOADED`, merge defaults recursively without overwriting existing keys:
     ```lua
     local function MergeDefaults(src, dest)
         if type(src) ~= "table" then return {} end
         if type(dest) ~= "table" then dest = {} end
         for k, v in pairs(src) do
             if type(v) == "table" then
                 dest[k] = MergeDefaults(v, dest[k])
             elseif dest[k] == nil then
                 dest[k] = v
             end
         end
         return dest
     end
     ```
3. **Beta Workaround Reminder**: Because disk persistence is currently broken in the Forever beta client, default tables are the **source of truth**. Hardcode configuration updates into defaults during development.

---

## 15. Debugging & In-Game Verification Workflow

1. **Reloading the UI**:
   - Disk modifications take effect after executing `/reload` in chat or restarting the game.
2. **Checking Script Errors**:
   - Use `/console scriptErrors 1` to ensure Lua errors pop up immediately.
   - Differentiate session history by inspecting error timestamps.
3. **ToS & Ban Safety**:
   - All addon development in `Interface\AddOns` uses Blizzard's official Lua sandbox. Tainted actions are blocked by the engine, not penalized with account bans.

---

## 16. Elite Intel & Theorycrafting References

1. **Stanzilla WoWUIBugs Tracker**: [https://github.com/Stanzilla/WoWUIBugs/issues/](https://github.com/Stanzilla/WoWUIBugs/issues/)
   - Authoritative tracker for modern WoW FrameXML and engine bugs across Forever, Retail, and Classic.
2. **Warcraft Tavern (WoW Forever Hub)**: [https://www.warcrafttavern.com/forever/](https://www.warcrafttavern.com/forever/)
   - Leveling guides, talent progression paths, quest overviews, dungeon strategies.
3. **Wowhead (WoW Forever Database & Guides)**: [https://www.wowhead.com/forever](https://www.wowhead.com/forever)
   - Live Beta 1.60 talent trees (env 16), spell database, Level 20 dungeon loot tables (*Hall of Thanes*, *Ruins of Lordaeron*), datamined tooltips.
4. **Mobalytics (WoW Forever Hub)**: [https://mobalytics.gg/wow-forever](https://mobalytics.gg/wow-forever)
   - Meta rankings, leveling build tier lists, dungeon speedrun telemetry, PvP battleground performance.
5. **WoW Forever Discord #bugs Channel**:
   - Live community and developer telemetry for active beta build drops and engine patches.
