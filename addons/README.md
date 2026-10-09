# 🛡️ WoW Forever Official In-House Addon Suite
**Engineered for World of Warcraft: Forever (Camelot 12.0 Retail Engine / TOC 16001)**  
**Lead Developer:** Marcus Owens & The WoW Forever Addon Team

This directory contains the official in-house addon projects developed specifically for World of Warcraft: Forever. All addons adhere to strict 12.0 Camelot zero-taint guidelines, defensive SavedVariables merging, single-TOC / dual-TOC architecture, and sub-pixel UI calibration.

---

## 📦 Our Addon Projects

| Project Folder | Addon Name | Primary Function | Key Features |
| :--- | :--- | :--- | :--- |
| `ForeverPlates/` | **ForeverPlates** | Minimalist Combat Nameplates | Zero-taint pixel nameplates, dynamic threat coloring, execute range indicators, C-side font strings. |
| `Foreverplatescastbars/` | **Forever Nameplates Castbars** | Nameplate & Unit Castbars | Sub-pixel enemy nameplate castbars, player/target/focus tracking, latency spell-queue markers, uninterruptible shields. |
| `ForeverLiquid/` | **ForeverLiquid** | Leveling & Economy Ledger | Cyberpunk neon fluid XP/Rep reservoir, real-time gold cashflow analytics, mount fund target, 5-instance/hr lockout radar. |
| `ForeverDungeonJournal/` | **Forever Dungeon Journal** | In-Game Classic+ Encounters | 3D boss model viewer, sub-pixel calibrated maps, encounter abilities & lore, loot tables with item preview. |
| `ForeverBlessings/` | **ForeverBlessings** | Paladin Blessing Coordinator | 60-minute reagent-free blessing manager, interactive class assignment matrix, live missing buff scanner & chat reporting. |
| `EchoTwist/` | **EchoTwist** | Melee Cadence & Proc HUD | Sub-pixel melee swing timer, 0.4s golden Seal Twisting cadence window, instant Windfury & extra attack audio-visual echoes. |
| `BetterBlizzFrames_MarcusCustom_Backup/` | **BetterBlizzFrames (Marcus Custom)** | Baseline Frame Architecture | Curated baseline UI layout, dark frames, customized action bars, unit frame positions, and micro-menu refinements. |

---

## 🎯 Architecture Standards
1. **Interface Version**: `## Interface: 16001` (Camelot 12.0 target).
2. **GameType Discrimination**: Single-TOC with `[AllowLoadGameType camelot]` or separate `_Camelot.toc` variants.
3. **Zero-Taint Policy**:
   - Never hook or re-register script handlers on secure frames (`BuffFrame`, `CompactRaidFrameManager`, etc.).
   - Use defensive table merges (`MergeDefaults`) to prevent nil index wipeouts.
   - Format numbers and time via engine-safe C-side helpers to prevent `<secret value>` string exceptions.

---

## 📂 Installation
Copy any project folder directly into:
```
World of Warcraft\_classic_beta_\Interface\AddOns\
```
