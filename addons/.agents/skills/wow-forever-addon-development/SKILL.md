---
name: wow-forever-addon-development
description: |
  Comprehensive guide and rules for creating and editing World of Warcraft addons specifically for WoW Forever (Camelot / 12.0 engine) and modern WoW clients.
  Covers 16001 TOC standards, Single-TOC architecture, AllowLoadGameType filters, XML and Lua frame design, secret values / UI taint, ruleset realm substitution, SavedVariables persistence, nameplate/unit frame mechanics, Dungeon Journal architecture, map inpainting, and sub-pixel pin calibration.
license: Apache-2.0
metadata:
  version: v6
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

### 2.1 SavedVariables Disk Persistence (FIXED)
- **Status: FIXED**: In earlier WoW Forever (1.60 / Camelot) Beta builds, Blizzard had a client-level I/O bug where `SavedVariables` were not flushed to disk. **This issue has been resolved by Blizzard, and `SavedVariables` now persist normally across `/reload`, logout, and client restarts.**
- **SavedVariables in Action**:
  - Addon settings, positioning, toggles, and user profiles configured via GUI options panels, slash commands, or SavedVariables tables are now properly written to disk (`WTF\Account\<AccountName>\SavedVariables\<AddonName>.lua`) and load reliably upon subsequent sessions.
  - While hardcoding defaults directly into Lua tables is no longer necessary as a disk-persistence workaround, **defensive default merging** inside `ADDON_LOADED` (or via AceDB-3.0) remains standard architectural best practice to safely handle new settings or schema migrations without clobbering existing player configurations.

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
- **Recent Notable Forever Beta Builds & Engine Iterations**:
  - **Build 1.60.3.70420 (Interface 16001 - Sept 27, 2026)**: Blizzard added dedicated C++ helper utilities (`issecure()`, `C_AddOns` API, and font string formatters) to resolve in-combat UI taint on custom nameplates and castbars, allowing clean target aura and castbar decoupling.
  - **Build 1.60.2.70114 (Sept 22, 2026)**: Resolved SavedVariables C++ disk flush bug and Druid Bear Form armor multiplier compounding bug.
  - **Build 1.60.1.69977**:
    - **Issue #887 (`cancelaura` on target-slot)**: In `Blizzard_FrameXML/SecureTemplates.lua`, `CANCELABLE_ITEMS` was replaced with `IsCancellableSlotValid`, but `cancelaura` still indexes `CANCELABLE_ITEMS[slot]`, causing fatal nil-indexing errors when cancelling temporary weapon enchants via `SecureActionButtonTemplate`.
    - **Issue #886 (Shaman Weapon Imbues)**: Shaman weapon imbues (`Enum.ItemEnchantType.Imbue`) are invisible to `C_PaperDollInfo.GetTemporaryEnchantmentInfo(16)` and `CustomAuraContainerTemplate`. Addons must query `C_Item.GetWeaponEnchantInfo(slot)` directly to detect imbues like Rockbiter, Flametongue, or Windfury.

### 2.4 RestrictedExecution & `loadstring_untainted` Beta Defect
- **The Issue**: In the current WoW Forever Beta engine, `loadstring_untainted` is absent or non-functional inside the secure execution environment.
- **Impact**: Any addon relying on `RegisterAttributeDriver` or secure state snippet compilation for dynamic frame paging/visibility (`[vehicleui]`, `[combat]`, `[group]`, `[form]`, etc.) will fail or cause immediate execution taint on secure frames.
- **Workaround**: Use standard out-of-combat event-driven Lua visibility handlers (`frame:Show()`, `frame:Hide()`) instead of secure snippet state drivers wherever possible during beta.

### 2.5 Missing Classic Spell IDs in 12.0 Database & Table Sentinel Pattern
- **The Issue**: Because WoW Forever runs on the modern 12.0 Retail engine with Classic gameplay, `GetSpellInfo` is deprecated in favor of `C_Spell.GetSpellInfo`. Furthermore, several Classic spell IDs are missing from the retail spell database.
- **The Fatal Crash**: If an addon builds lookup tables at file-load time like `local t = { [GetSpellInfo(12345)] = true }`, a missing spell returns `nil`. In Lua, initializing a table with `[nil] = true` throws `table index is nil`, immediately aborting the entire Lua file and failing addon initialization!
- **Defensive Sentinel Pattern**:
  ```lua
  local function SafeSpellName(spellID)
      local info = C_Spell and C_Spell.GetSpellInfo and C_Spell.GetSpellInfo(spellID)
      return (info and info.name) or ("NoSpell_" .. tostring(spellID))
  end
  ```

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
- `C_Secrets.ShouldAurasBeSecret()`: Returns `true` if the engine is currently enforcing secret aura data (e.g. in restricted combat instances). Useful for pre-flight branch checks before querying auras.

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

### 5.9 The Blizzard FrameXML Execution Taint Cascade (The BuffFrame Trap)
- **The Core Rule**: **NEVER** attempt to manage, re-register events on, or manually execute scripts on native Blizzard secure frames (`BuffFrame`, `PlayerFrame`, `TargetFrame`, `TemporaryEnchantFrame`, etc.).
- **Taint Vectors**:
  ```lua
  -- FATAL IN 12.0: PERMANENTLY TAINTS THE BLIZZARD FRAME
  BuffFrame:RegisterEvent("UNIT_AURA")
  BuffFrame:RegisterUnitEvent("UNIT_AURA", "player")
  BuffFrame:Update()
  RegisterAttributeDriver(BuffFrame, "state-visibility", "hide")
  local onEvent = BuffFrame:GetScript("OnEvent")
  onEvent(BuffFrame, "UNIT_AURA", "player")
  ```
- **The Cascade Mechanism**:
  1. An addon calls `RegisterEvent`, `RegisterAttributeDriver`, or directly executes `Update`/`OnEvent` on a native Blizzard FrameXML frame.
  2. Blizzard's frame becomes permanently tainted by that addon.
  3. When combat begins or aura updates fire, internal engine queries (`C_UnitAuras`, health) return `<secret number>` or `<secret string>` values to Blizzard's code.
  4. Blizzard's FrameXML was written assuming secure execution and performs raw math (`if duration < 31 then` at `BuffFrame.lua:70`, `if buttonInfo.count > 1 then` at `BuffFrame.lua:1304`).
  5. Because animation loops (e.g. `WarningFader`) run on every frame tick (~60 FPS), the unshielded math crashes at over **4,000+ errors per minute**!
  6. The error dialog itself (`Blizzard_ScriptErrorsFrame`) inherits the execution taint, throwing secondary crashes when measuring strings (`prevText`, `cursorOffset`).
- **Remedy**: Leave native Blizzard frames completely untouched. If suppressing them, do so cleanly without registering state drivers, or keep them untainted so they run securely without secret value collisions.

### 5.10 Safe C-Side Aura Displays Under Secret State
When player auras are secret during combat, Lua arithmetic and string comparisons fail. Blizzard provides C-side engine hooks that accept secret values directly:
1. **Cooldown Wheel Swipe Animation**:
   - Never compute `expirationTime - duration` in Lua when secret.
   - Use Blizzard's C-side helper: `CooldownFrame_SetAura(cooldownFrame, unit, auraInstanceID)`.
2. **Stack Application Count**:
   - Never compare `count > 1` or format `fs:SetText(count)` when secret.
   - Use: `fs:SetText(C_UnitAuras.GetAuraApplicationDisplayCount(unit, auraInstanceID, maxDisplay))`.
3. **Dispel Type & Border Color**:
   - Never compare `dispelName == "Magic"` when secret.
   - Resolve color via C-side curve: `local c = C_UnitAuras.GetAuraDispelTypeColor(unit, auraInstanceID, dispelColorCurve)`.

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
4. **Unit Frame Auras (`SecureAuraHeaderTemplate` vs `CustomAuraContainerTemplate`)**:
   - In modern Retail / 12.0 engine, `SecureAuraHeaderTemplate` was removed in 10.0 in favor of `EditModeBuffFrameSystemTemplate` / `CustomAuraContainerTemplate`.
   - On Forever, unit frame addons should check `C_XMLUtil.GetTemplateInfo("SecureAuraHeaderTemplate")`. If missing, fall back to `CustomAuraContainerTemplate` or addon-owned by-index icons, guarding queries with `C_Secrets.ShouldAurasBeSecret()` and `issecretvalue()`.

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
3. **SavedVariables Disk Persistence (Working)**: The earlier beta client bug where `SavedVariables` were not written to disk on reload or exit has been resolved. In-game changes are now saved properly to disk and persist between sessions. Defensive default merging continues to ensure that existing user customizations are preserved while new configuration keys or default schema updates are seamlessly merged.

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

---

## 17. Dungeon Journal Architecture & Loot Pipeline (Forever Standards)

Building a responsive, high-performance Dungeon Journal on the 12.0 Camelot engine requires decoupling data declarations from UI presentation and handling beta-specific item cache behaviors.

### 17.1 Decoupled Data Architecture
Avoid monolithic files. Partition data by concern:
- `Data/Dungeons.lua`: Core dungeon registry (`FDJ.DB[dungeonName]`), dungeon level, entrance coordinates, quest lists, and boss arrays with loot tables.
- `Data/Bosses.lua`: Boss levels and 3D creature display IDs (`STATIC_DISPLAY_IDS[npcID] = displayID`).
- `Data/BossTactics.lua`: Encounter overviews, role-specific tips (`tank`, `healer`, `dps`), and ability tables (`id`, `name`, `icon`, `desc`).
- `Data/DungeonMaps.lua`: Interior map texture paths, canvas aspect ratio, boss pin coordinates (`bosses`), and non-boss points of interest (`pois`).
- `Core/Journal.lua`: The UI engine handling frame rendering, tab switching, event registration, and user interactions.

### 17.2 WoW Forever Custom Item IDs (`270xxx` / `273xxx`)
WoW Forever introduces custom item IDs (e.g. `270227`, `273804`) that do not exist on standard Classic or Retail databases:
1. **Pre-fetching Item Data**:
   Whenever displaying a boss's loot, always notify the client to query item data asynchronously:
   ```lua
   if C_Item and C_Item.RequestLoadItemDataByID then
       pcall(C_Item.RequestLoadItemDataByID, itemID)
   end
   ```
2. **Instant Icon & Basic Info Retrieval**:
   Use `C_Item.GetItemInfoInstant(itemID)` or `C_Item.GetItemIconByID(itemID)` to prevent waiting for server round-trips:
   ```lua
   local function ItemIcon(id)
       if C_Item and C_Item.GetItemInfoInstant then
           local _, _, _, _, icon = C_Item.GetItemInfoInstant(id)
           if icon then return icon end
       end
       if C_Item and C_Item.GetItemIconByID then
           local icon = C_Item.GetItemIconByID(id)
           if icon then return icon end
       end
       return "Interface\\Icons\\INV_Misc_QuestionMark"
   end
   ```

### 17.3 Authoritative Quality Resolution via `C_TooltipInfo`
- **The Issue**: On Forever beta, querying `GetItemQualityColor` or `select(3, C_Item.GetItemInfo(id))` can lag or return outdated/grey qualities before the server cache populates.
- **The Solution**: Use Blizzard's C-side tooltip pipeline (`C_TooltipInfo.GetItemByID`) to extract the exact rendered color line:
  ```lua
  local function GetAuthoritativeItemQuality(itemID, fallbackQuality)
      if C_TooltipInfo and type(C_TooltipInfo.GetItemByID) == "function" then
          local ok, data = pcall(C_TooltipInfo.GetItemByID, itemID)
          if ok and type(data) == "table" and type(data.lines) == "table" and data.lines[1] then
              local color = data.lines[1].leftColor or data.lines[1].color
              if color and color.r then
                  return color.r, color.g, color.b
              end
          end
      end
      -- Fallback to standard quality palette
      local r, g, b = GetItemQualityColor(fallbackQuality or 3)
      return r or 0.0, g or 0.44, b or 0.87
  end
  ```

### 17.4 Clean Teardown of Draft / TBD States
- When working on new dungeons, authors frequently add placeholder banners (e.g. `Items Data TBD`).
- **Rule**: When completing a dungeon's loot tables, **completely eradicate** any draft labels (`stockadeItemsTBD`, `stockadeLootTBD`, etc.) and remove special-case scroll/title anchor offsets.
- Every dungeon must adhere to the universal encounter layout:
  - Subtab 1: **Loot** (active by default, displaying item rows with icons, quality colors, slot names, and tooltips).
  - Subtab 2: **Tactics & Abilities** (overview, role tip cards, ability badges).
  - Filters: **All Classes** toggle and **All Slots** dropdown.

---

## 18. High-Precision Dungeon Map & Pin Calibration Pipeline

Adding interior maps and boss markers requires clean background art, valid texture formats, and accurate coordinate mapping.

### 18.1 The "Black Screen" Map Texture Trap (Power-of-Two Rule)
- **The Bug**: Custom map textures set via `texture:SetTexture("path\\to\\map.tga")` render as a completely black box in the WoW client if dimensions or compression are incorrect.
- **Engine Rules**:
  1. **Dimensions MUST be Power-of-Two (POT)**: e.g. 512×512, 1024×1024, or 1024×512.
  2. **Format**: Uncompressed 32-bit (RGBA) or 24-bit (RGB) Truevision TGA.
  3. **No Non-POT Textures**: Never save 770×370 or 800×600 directly to `.tga`. Instead, scale or pad the texture to 1024×1024 (or 1024×512) and map texture coordinates via `SetTexCoord(0, 1, 0, 1)` or custom UV bounds.

### 18.2 Atlas Map Inpainting Recipe (Automated Number/Letter Removal)
To convert legacy numbered Atlas maps into clean background textures suitable for dynamic interactive pins:
```python
import cv2
import numpy as np

# Load source map
img = cv2.imread('raw_atlas_map.png')

# 1. Create a binary mask of white/bright baked numbers (e.g., text numbers 1-12)
# White numbers usually have high luminance across RGB:
gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
_, mask = cv2.threshold(gray, 235, 255, cv2.THRESH_BINARY)

# Dilate mask by 2-3 pixels to capture anti-aliasing edges and dark drop shadows
kernel = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (5, 5))
dilated_mask = cv2.dilate(mask, kernel, iterations=1)

# 2. Inpaint using Telea or Navier-Stokes
cleaned = cv2.inpaint(img, dilated_mask, inpaintRadius=3, flags=cv2.INPAINT_TELEA)

# 3. Apply subtle bilateral filter to preserve dungeon walls while smoothing background
final_map = cv2.bilateralFilter(cleaned, d=5, sigmaColor=35, sigmaSpace=35)
cv2.imwrite('Cleaned_Map.png', final_map)
```

### 18.3 Sub-Pixel Landmark Calibration Shortcut (Zero Guesswork)
When a user provides a screenshot containing marker locations (or requests moving a pin to match an image):
**NEVER guess coordinates by eye or iterate with trial-and-error.**

Use linear regression on $\ge 3$ known reference landmarks already defined in `DungeonMaps.lua` (e.g. Boss #1, Boss #6, Boss #12):
```python
import numpy as np

# Reference landmarks: (lua_x, lua_y) from DungeonMaps.lua and (pixel_x, pixel_y) measured from screenshot
data = [
    (0.770, 0.068, 600.63, 27.50),   # Boss A
    (0.465, 0.665, 363.90, 250.90),  # Boss B
    (0.355, 0.825, 278.15, 311.01),  # Boss C
]

lua_x = np.array([d[0] for d in data])
lua_y = np.array([d[1] for d in data])
pix_x = np.array([d[2] for d in data])
pix_y = np.array([d[3] for d in data])

# Fit affine mapping: pix = slope * lua + intercept
slope_x, int_x = np.polyfit(lua_x, pix_x, 1)
slope_y, int_y = np.polyfit(lua_y, pix_y, 1)

# Given target pin pixel measured from screenshot (target_px, target_py):
target_px, target_py = 407.73, 237.91
new_lua_x = (target_px - int_x) / slope_x
new_lua_y = (target_py - int_y) / slope_y

print(f"Target Lua Coords: x = {new_lua_x:.3f}, y = {new_lua_y:.3f}")
# Yields < 1.5px residual error across all landmarks!
```

### 18.4 Pin Hierarchy & Interactive Click-to-Loot Wiring
In `Core/Journal.lua`, map pins are structured into two distinct layers:

1. **Boss Pins (`mapData.bosses`)**:
   - **Visuals**: 24×24 circular icon masked with `Interface\CharacterFrame\TempPortraitAlphaMask`, overlaid with a 30×30 gold border (`BossBorderGold.tga`), and an `orderText` numeric badge (`x = -3, y = 0`).
   - **Click Action**: Directly hooks into the encounter viewer:
     ```lua
     marker:SetScript("OnClick", function(self)
         if self.bossIndex then
             SetMode("bosses")
             SelectBoss(self.bossIndex)
         end
     end)
     ```
   - Hovering over a boss pin displays the boss name, encounter detail, and `"Click to view encounter & loot in journal"`.

2. **Atlas POI Pins (`mapData.pois`)**:
   - For non-boss quest objects, rare spawn event locations (e.g. Fel Steed), or chests.
   - Display a solid dark circle with a gold ring and centered number.
   - Tooltip displays the POI number, name, and quest detail line.
   - Clicking opens or toggles the Map Legend drawer (`frame.dungeonMapLegendPanel`).

