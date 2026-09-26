# Marcus Custom Options - Backup & Recovery for BetterBlizzFrames

This directory contains a complete backup of all code, modules, and GUI configurations for **Marcus Custom Options** in **BetterBlizzFrames** for World of Warcraft (WoW Forever / Camelot & Retail 12.0).

---

## Included Features & Fixes

1. **Marcus Custom Options GUI Tab**:
   - Dedicated navigation tab inside BetterBlizzFrames options panel.
   - Real-time combat health & resource text toggles (`Both`, `Value`, `Percent`, `None`).
   - Font size & custom font selection (PT Sans Narrow Bold, Expressway, Prototype, etc.).
   - Health bar color modes (`Default`, `Class`, `Custom`) with live color picker.

2. **Frame & Resource Bar Dimensions & Fill Fixes**:
   - Player Frame overall scale, health bar width & height, resource bar width & height.
   - Target Frame overall scale, health bar width & height, resource bar width & height.
   - **Target Resource Bar Full Fill Fix**: Replaced the curved/slanted Blizzard mask with a clean square mask (`pixelMask.tga`) anchored to the exact bounds of the target mana bar. Eliminates the transparent gap and diagonal cutoff on the right half, allowing blue mana, yellow energy, and rage to cleanly and fully fill the entire rectangle at 100% just like the player frame.
   - Container, mask, and 1px black border synchronization (`noPortrait.lua`).

3. **Player Buffs & Debuffs Positioning Below Player Frame**:
   - Anchored directly below player health / mana bar without overlaps.
   - Default X offset: `0` (centered under player bar).
   - Default Y offset: `-4` (clean spacing below bar).
   - Default scale: `0.70`.
   - Per-row count: `8`.
   - **Hide Collapse Button** checkbox (default `true`).
   - **Hide Duration Text** checkbox (default `false`).
   - Edit Mode support without freezing frame.

4. **Target Buffs Positioning Below Target Frame**:
   - Anchored cleanly below target health / mana bar.
   - **Target Buffs Remaining Duration Text**: Displays time left (e.g. `49m`, `16m`, `45s`) placed directly below each target buff icon in the exact same small yellow font (`GameFontNormalSmall`) as player buffs.
   - **Hide Buff Duration Numbers** checkbox in GUI: Lets user easily toggle the remaining cooldown numbers below target buffs on or off, identical to player buffs.
   - **Target Buffs Horizontal Offset (X)** slider (`-300` to `300`, default `0`).
   - **Target Buffs Vertical Offset (Y)** slider (`-300` to `100`, default `-4`).
   - **Target Buffs Icon Scale** slider (`0.40` to `2.50`, default `0.85`).
   - **Target Buffs Per Row** slider (`2` to `24`, default `8`).
   - **Square High-Quality Buffs** checkbox with 1px border.
   - **Reset Target Buffs** button to easily restore default layout.
   - Works with both native Blizzard 12.0 `AuraContainer` and BetterBlizzFrames custom aura hosts.

---

## How to Re-Apply if BetterBlizzFrames is Updated Again

Whenever an addon manager (CurseForge, WoWUp, etc.) updates BetterBlizzFrames:
1. Double-click `install_marcus_options.bat` in this folder.
2. Type `/reload` in World of Warcraft.
