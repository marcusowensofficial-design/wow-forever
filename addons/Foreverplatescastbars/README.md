# ⚔️ ForeverPlates Castbars (Forever Nameplates Castbars)

**Nameplate & unit-frame cast bars with latency window, GCD bar, shielded-cast colors and an OLED-style settings window for World of Warcraft: Forever (Camelot 12.0 engine / TOC 16001).**

---

## 🌟 Overview
ForeverPlates Castbars is part of the **WoW Forever Addon Suite**, developed by Marcus Owens. It pairs with `ForeverPlates` (auras move out of the way of the cast bar, outline colors stay in sync) but also works on its own: the custom fonts ship in this addon's `media` folder.

- **Enemy nameplate cast bars**: drawn directly under enemy nameplates, either matching the health bar width or a custom width (left-aligned or centered).
- **Player, target & focus cast bars**: spell name, timer, icon, per-bar colors and borders, movable.
- **Latency window**: shades the end of your casts by your world latency, for spell queueing.
- **GCD bar**: thin global cooldown bar under the player cast bar (also shows for instant casts).
- **Shielded casts**: non-interruptible casts get their own color and border on nameplates, target and focus.
- **Blizzard bar suppression**: hides Blizzard's own player, target, focus and nameplate cast bars (optional).

## 🛠️ Settings & Slash Commands
Open the settings window with `/fpc` (also `/bcb`, `/bettercastbars`, `/forevercast`) or from **Game Menu → Options → AddOns**.
The window has a sidebar with sections: **Overview**, **Enemy Cast Bars**, **Enemy Colors**, **Player Bar**, **Player Colors**, **Target Bar**, **Focus Bar**, **Fonts & Text** and **Shared Colors**.

| Command | What it does |
| :--- | :--- |
| `/fpc` | Open or close the settings window |
| `/fpc help` | List all commands |
| `/fpc unlock` / `/fpc lock` | Show draggable placeholders and move bars / lock them again |
| `/fpc test` / `/fpc hidetest` | Preview every bar plus a mock enemy nameplate |
| `/fpc target` / `/fpc focus` | Toggle the target / focus cast bar |
| `/fpc reset` | Reset bar positions |
| `/fpc debug` | Diagnostics for your target's nameplate cast bar |

While the settings window is open, any unlocked bar shows a placeholder you can drag.

## 📁 Installation
Place into your WoW Forever AddOns directory:
```
World of Warcraft\_classic_beta_\Interface\AddOns\Foreverplatescastbars\
```

## 📝 Changelog
**2.3.0**
- GCD bar now shows for instant casts (it was hidden along with the idle cast bar).
- Enemy cast bar Width slider works: "Match Health Bar Width" off = custom width, "Left-Align" picks left vs centered.
- Bars can be dragged while unlocked (placeholder shown in the settings window or after `/fpc unlock`); test casts loop until stopped.
- Closing the settings window ends test mode.
- Icon gap works the same direction on every bar.
- Target and focus bars show the shielded (non-interruptible) color.
- Empowered casts detected correctly; stale timer text no longer shown for hidden-timing casts.
- Fonts bundled with the addon, with automatic fallback, so it works without ForeverPlates.
- Much lighter Blizzard cast bar suppression (no constant nameplate rescans, no resizing of Blizzard frames, CVars only written when the setting changes).
- Reset Defaults asks for confirmation, resets positions, and no longer re-applies old migrations.
- Settings window rebuilt with a sidebar, page titles and descriptions; created on first open instead of at login.
- No longer writes the legacy `BetterCastBarsDB` (still read once for migration).
