# Monorepo Project Boundaries

This workspace is a Monorepo containing two distinct subsystems:

## 1. Web Portal & Character Suite (`website/`)
- **Scope**: Public-facing web application for World of Warcraft: Forever.
- **Technologies**: Vanilla HTML5, CSS3, Vanilla ES Modules (`website/js/modules/`, `website/js/data/`).
- **Entry Point**: `website/index.html`.
- **Deployment**: Render static site with `staticPublishPath: ./website`.
- **Rule**: When the user requests website features, UI changes, planner updates, or bugfixes for the site, work EXCLUSIVELY inside the `website/` directory. Never mix addon Lua/XML code into this directory.

## 2. World of Warcraft In-Game Addons (`addons/`)
- **Scope**: In-game client addons for World of Warcraft (Camelot / 12.0 engine and Classic+).
- **Projects**: `ForeverPlates`, `ForeverBlessings`, `ForeverDungeonJournal`, `ForeverDungeonJournalv2`, `ForeverLiquid`, `BetterCastBars`, `EchoTwist`.
- **Technologies**: Lua 5.1, WoW XML frame templates, `.toc` manifests.
- **Rule**: When working on in-game addons, work EXCLUSIVELY inside the appropriate subdirectory under `addons/`. Never modify website HTML/CSS/JS files for addon tasks.
