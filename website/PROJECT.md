# Project: WoW Forever Beta Build 1.60.1.70425 Synchronization

## Architecture
WoW Forever is a static vanilla/camelot web application delivering database search, interactive talent calculators, deep dive class guides, and addon distribution.
- **Talent Engine (`js/data/talents-data.js`, `js/modules/talent-tree.js`)**: Encodes class talent trees using 4-column x 7-row grids. Enforces tier point requirements ($5 \times (row - 1)$) and prerequisite node dependencies (`req`). Build serialization orders talents by `row ASC, col ASC`.
- **Racial & Class Data (`js/data/races-classes.js`)**: Encodes 9 playable races, 4 racials per race (2 active, 2 passive), stat distributions, and class compatibility.
- **Changes Dataset (`data/forever_changes.json`, `js/data/changes-data.js`)**: Single source of truth for datamined diffs against baseline Vanilla. Compiled into JS bundle for runtime consumption.
- **Core Presentation & Deep Dives (`js/data/core-data.js`, `index.html`, `js/data/deepdives/`)**: Client build versioning, live realm status, news dispatches, and Level 30 recommended builds with legacy notes.
- **Validation Engine (`scripts/validate.js`)**: Automated test suite executing 53+ integrity, DOM, legality, and data synchronization checks.

## Feature Inventory
| # | Feature | Description | Milestone | Source |
|---|---------|-------------|-----------|--------|
| 1 | Shaman Elemental Rebuild | `Elemental Mastery` Row 7 (31pt); `Lava Burst` Row 5 (4 ranks, 21pt, no prereq); `Elemental Fury` req `Lightning Overload`; `Lightning Overload` req `Elemental Alacrity`; `Elemental Alacrity` Row 2; `Elemental Warding` Row 3; Remove `Call of Thunder`; `Earthbound` Row 4; Rename `Improved Fire Nova` to `Trial by Fire` | M1 | R1 Survey |
| 2 | Shaman Restoration Swap | Swap `Tidal Focus` (Row 1 Col 3) and `Totemic Focus` (Row 2 Col 3) | M1 | R1 Survey |
| 3 | Mage Arcane Adjustments | Add `Arcane Wrath` (Row 4 Col 4, 1 rank); Move `Missile Barrage` to Row 1 Col 4 (2 ranks) | M1 | R1 Survey |
| 4 | Mage Fire Adjustments | Rename `Wake of Fire` to `Improved Fire Blast`; Rescale `Fire Power` to 3 ranks; Rescale `Critical Mass` to 5 ranks | M1 | R1 Survey |
| 5 | Mage Frost Adjustments | Update `Ice Lance` (+200% against frozen); Update `Winter's Chill` (Cone of Cold stacking damage) | M1 | R1 Survey |
| 6 | Priest Shadow Adjustments | Add `Dark Inspiration` (Row 4 Col 1, 5 ranks) replacing `Improved Fade`; Remove `Shadow Affinity`; Move `Improved Mind Blast` to Row 2 Col 1; Cooldown of `Vampiric Embrace` to 30s | M1 | R1 Survey |
| 7 | Priest Discipline Adjustments | Move `Mental Strength` to Row 2 Col 2; Move `Improved Power Word: Shield` to Row 3 Col 3 (prereq to Soul Warding) | M1 | R1 Survey |
| 8 | Warlock Affliction & Destro | Replace `Malediction` with `Grim Reach` (Row 4 Col 4, 2 ranks, +10/20% range); Update `Shadow Mastery` (2-10%); Update `Destructive Reach` (Destruction spells) | M1 | R1 Survey |
| 9 | Paladin Talent Updates | Update `Reckoning` (accumulates up to 4 charges, triggers on auto swing); `Shield Specialization`; `Champion of the Light` | M1 | R1 Survey |
| 10 | Hunter Talent Updates | Update `Rapid Recuperation` tooltip and mechanics | M1 | R1 Survey |
| 11 | Druid Talent Updates | Update `Predator's Edge` and `Furor` mechanics and values | M1 | R1 Survey |
| 12 | Warrior Talent Updates | Update `Bloodthrill` mechanics and values | M1 | R1 Survey |
| 13 | Weapon Racial Deprecation | Permanently remove `Sword Specialization` (Human), `Mace Specialization` (Dwarf), `Axe Specialization` (Orc) from active datasets | M2 | R2 Survey |
| 14 | Replacement Racials | Add Human `Ruthless` (+2% crit all spells/attacks), Dwarf `Earth Fury` (+2% crit bonus dmg/heal), Orc `Savage` (+1% crit all spells/abilities), Skyborne `Read Leyline` (2s cast, 2m CD, +100% regen) | M2 | R2 Survey |
| 15 | Racial Mechanics Updates | Update `Eureka!` (Gnome: 8s buff, no charges, benefits PW:Shield), `Blood Fury`, `Shatter Curse`, `Cultivation`, `Endurance`, `Plainsrunning`, `War Stomp`, `Regeneration`, `Touch of the Grave` | M2 | R2 Survey |
| 16 | Deepdive & Tool Racial Purge | Cleanse obsolete weapon racial text from `tools-data.js` and all class deep dives (`hunter.js`, `mage.js`, `paladin.js`, `priest.js`, `rogue.js`, `shaman.js`, `warrior.js`) | M2 | R2 Survey |
| 17 | Battle Shout Raid-wide | Flag `Battle Shout` as Raid-wide across all 7 ranks in `forever_changes.json` and `changes-data.js` | M2 | R3 Survey |
| 18 | Shaman Totems Raid-wide | Flag `Windfury`, `Grace of Air`, `Strength of Earth`, and `Flametongue` totems as Raid-wide; document removal of exclusivity between Grace of Air and Windfury/Flametongue | M2 | R3 Survey |
| 19 | Paladin Salvation & Revoke | Replace blessings with `Salvation` and `Mass Salvation`; add new baseline ability `Revoke` | M2 | R3 Survey |
| 20 | Class Spell Tuning Pass | Update `Righteous Fury` (90% Holy threat), `Devouring Plague` (24s CD), `Shadow Word: Death` (18s CD), `Chain Lightning` (-35% mana), `Fire Nova`, `Mana Tide Totem` (Level 38 rank), `Stormstrike` (8% base mana), `Water Shield` (triggers on all spell crits) | M2 | R3 Survey |
| 21 | Global Build Versioning | Update client build to `1.60.1.70425` across `core-data.js`, `index.html` headers/badges/footers, and 48 script imports (`?v=1.60.1-70425`) | M3 | R4 Survey |
| 22 | News Dispatch news-45 | Add official news dispatch / timeline card for Beta Build 1.60.1.70425 (Sixteenth Beta Build, October 15, 2026) summarizing all 128 changes | M3 | R4 Survey |
| 23 | Deep Dive Level 30 Builds | Rebuild Level 30 recommended builds in `shaman.js`, `mage.js`, `priest.js`, `paladin.js`, `warlock.js` with 100% legal 21-point allocations under new rows, tiers, and prerequisites | M3 | R4 Survey |
| 24 | E2E Testing Suite & Infra | Requirements-driven test suite with 4 tiers (Feature, Boundary, Combinatorial, Scenarios), publishing `TEST_INFRA.md` and `TEST_READY.md` | M-TEST | E2E Track |
| 25 | Validation Engine Upgrade | Extend `scripts/validate.js` to 53+ checks asserting Build 1.60.1.70425, obsolete weapon racials purge, removed talents purge, new nodes presence, and deep dive tier/prerequisite legality | M4 | AC 45-51 |
| 26 | Adversarial Hardening | Tier 5 white-box challenger coverage audit and adversarial stress testing against talent math, serialization, and edge cases | M4 | Project Pattern |

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| M-TEST | E2E Testing Track | Test suite design, test cases (Tiers 1-4), `TEST_INFRA.md`, `TEST_READY.md` | none | DONE |
| M1 | Talent Trees & Node Synchronization | Rebuild Shaman, Mage, Priest, Warlock, Paladin, Hunter, Druid, Warrior talents in `talents-data.js` and `changes-data.js` | none | DONE |
| M2 | Racial Abilities & Spells/Utility | Rework 9 racials in `races-classes.js`, clean obsolete racials in `tools-data.js` & deepdives, update Raid-wide utility and 8 tuned spells | none | DONE |
| M3 | Core Metadata, News & Deep Dives | Update client build `1.60.1.70425` across `core-data.js`, `index.html`, add `news-45`, and re-encode Level 30 builds in deepdives | M1, M2 | DONE |
| M4 | Final E2E Pass & Adversarial Hardening | Verify 100% pass of `node scripts/validate.js` and E2E test suite; Tier 5 adversarial hardening | M-TEST, M3 | DONE |

## Interface Contracts

### Talent Node Contract (`talents-data.js` ↔ `talent-tree.js` ↔ `deepdives/*.js`)
- Each node object must define:
  ```json
  {
    "id": <integer>,
    "tree": <integer 0-2>,
    "treeId": <integer>,
    "name": "<string>",
    "icon": "https://render.worldofwarcraft.com/us/icons/56/<iconName>.jpg",
    "iconName": "<string>",
    "row": <integer 1-7>,
    "col": <integer 1-4>,
    "maxRank": <integer 1-5>,
    "spellId": <integer>,
    "req": <integer id or null>,
    "descriptions": ["<string rank 1>", ...]
  }
  ```
- Tier Gate Rule: Spending points in Row $R$ requires at least $5 \times (R - 1)$ points already allocated in that tree.
- Prerequisite Rule: A node with `req: X` cannot receive points unless node $X$ is allocated to its `maxRank`.
- Serialization Rule: `TalentTreeModule.parseBuildUrl` and `serializeBuild` index nodes ordered by `row ASC, col ASC`. Deep dive `buildUrl` strings must match this exact node sequence.

### Racial Ability Contract (`races-classes.js` ↔ UI & Tools)
- Each race entry in `allRacesData` must have exactly 4 racials: 2 Active, 2 Passive.
- Deprecated racials `Sword Specialization`, `Mace Specialization`, `Axe Specialization` MUST NOT appear anywhere in active datasets or strings.
- Replacement racials: `Ruthless` (Human, Passive), `Earth Fury` (Dwarf, Passive), `Savage` (Orc, Passive), `Read Leyline` (Skyborne, Active).

### Changes Dataset Contract (`data/forever_changes.json` ↔ `js/data/changes-data.js`)
- `forever_changes.json` contains full structured JSON with summary counts (`talentsChanged`, `spellsChanged`, etc.).
- `js/data/changes-data.js` wraps the JSON verbatim in `window.WOW_CHANGES_DATA = { ... };`.
- Both files must remain in 100% byte/hash parity.

## Code Layout
- Exclusive Write Ownership:
  - M-TEST owns: `tests/`, `TEST_INFRA.md`, `TEST_READY.md`.
  - M1 owns: `js/data/talents-data.js`.
  - M2 owns: `js/data/races-classes.js`, `js/data/tools-data.js`.
  - Shared Dataset: `data/forever_changes.json` and `js/data/changes-data.js` are updated sequentially (M1 updates talent changes, M2 updates racial & spell changes).
  - M3 owns: `js/data/core-data.js`, `index.html`, `js/data/deepdives/*.js`.
  - M4 owns: `scripts/validate.js`.
- No concurrent workers may write to the same file.
