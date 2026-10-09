# 🛡️ ForeverBlessings

**60-Minute Paladin Blessing Management, Raid Assignment Matrix & Missing Buff Coordinator for World of Warcraft: Forever (Camelot 12.0 Engine / TOC 16001).**

---

## 🌟 Overview
ForeverBlessings is an official in-house WoW Forever raid utility designed to streamline Paladin blessings under the Camelot 12.0 engine updates:
- **60-Minute Blessing Support**: Tailored to WoW Forever's extended 1-hour Greater Blessings without reagent costs.
- **Class Assignment Matrix**: Interactive GUI matrix to assign individual blessings (Kings, Might, Wisdom, Salvation, Light, Sanctuary) per class (Warrior, Paladin, Hunter, Rogue, Priest, Shaman, Mage, Warlock, Druid).
- **Zero-Taint Audit**: Operates out-of-combat with safe unit aura scanning via `C_UnitAuras`, strictly avoiding modification of Blizzard's native `BuffFrame` to prevent 12.0 taint cascades.
- **Missing Buff Detection**: Live status indicators show missing counts per class in party and raid groups with one-click chat reporting.

## 🛠️ Slash Commands
- `/fb` or `/foreverblessings`: Toggle the assignment matrix GUI.
- `/fb show`: Show the assignment matrix.
- `/fb hide`: Hide the assignment matrix.
- `/fb scan`: Run an immediate roster scan and print missing blessings to chat.
- `/fb reset`: Reset positions and assignment matrix to default settings.

## 📁 Installation
Place into your WoW Forever AddOns directory:
```
World of Warcraft\_classic_beta_\Interface\AddOns\ForeverBlessings\
```
