# WoW Forever Engineering Guidelines & Architecture Standards

As senior developers on this project, adhere strictly to the following architectural rules:

## 1. Separation of Concerns (Data vs. Logic)
- **Data files live in `js/data/`**: Pure data dictionaries, coordinates, route tables, trainers, item matrices, and scraping artifacts MUST NEVER be embedded inside UI logic files.
- **Logic modules live in `js/modules/`**: Files in `js/modules/` are strictly controllers, view renderers, and event dispatchers.
- Any new datasets must be added as a separate data script loaded in `index.html` under the `<!-- 1. Data Layer -->` section and attached to `window`.

## 2. Anti-Monolith & File Size Limits
- **Module File Cap**: No single logic module in `js/modules/` should exceed 1,500 lines of code.
- If a feature module approaches 1,500 lines, extract its sub-features into a dedicated subfolder (e.g. `js/modules/professions/` or `js/modules/deepdives/`).
- Never append unrelated functions or new sub-tabs to an existing large file.

## 3. Strict Pre-Commit Verification
- Always execute `node scripts/validate.js` after making modifications. All integrity, talent legality, and DOM checks must pass with zero errors.

## 4. Canonical Class & Faction Invariants (WoW Forever Core Rules)
- **Undead Paladins Exist on Horde**: In WoW Forever, Paladin is a dual-faction class (Alliance: Human, Dwarf; Horde: Undead with Forsaken Charger).
- **NEVER Gray Out or Block Horde for Paladin**:
  - The Horde faction filter button in weapon paths, offhands/shields, and deep dives must ALWAYS be enabled, clickable, and interactive when selected.
  - Progression filtering (`itemMatchesAll`, `generateTimelineCards`, `renderItemTimeline`) must NEVER filter out Horde items or force Paladins to Alliance.
  - Verification scripts and pre-commit checks must strictly guard against regressions that disable Horde for Paladin.
