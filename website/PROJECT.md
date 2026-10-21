# Project: Interactive Multi-Dimensional Progression Stat & Requirement Filter

## Architecture
- **Dedicated Filter Module (`js/modules/deepdives/progression-filter.js`)**: Encapsulates filter state, comprehensive tooltip & stat parsing engine (17 dimensions), drawer UI rendering, speed direction operator (`≥`/`≤`) and contextual benchmark popover (`ℹ️`), active filter badge counter, 1-click Reset All Filters button, and multi-criteria logical AND matching.
- **Rendering & Surface Engine (`js/modules/deepdives/class-progression.js`, `js/modules/weapons-hub.js`)**: Single source of truth for timeline and step rendering (`WOW_DEEPDIVES_PROGRESSION.renderProgressionSubtab`). Integrates filter evaluation into `itemMatchesAll()`, executing alt promotion when primary fails, step hiding when neither matches, and empty state rendering with reset button when zero items match across the timeline.
- **Script Registration & DOM (`index.html`)**: Registers `progression-filter.js` before `class-progression.js` with versioning `?v=1.60.1-70425`. Enforces unique DOM IDs and accessible `aria-label`s on all controls.
- **Styling (`css/styles.css`)**: Collapsible drawer styling, responsive multi-column grid, gold accents, benchmark helper popover, counter badge, and reset button.
- **Validation Engine (`scripts/validate.js`)**: 63+ checks verifying DOM IDs, script sources, input accessibility, and build integrity.

## Feature Inventory
| # | Feature | Description | Milestone | Source |
|---|---------|-------------|-----------|--------|
| 1 | Collapsible Filter Drawer UI | Collapsible "Advanced Stat Filters" drawer above weapon, wand, offhand/shield progression roadmaps | M1 | R1 Survey |
| 2 | Level & Scaling Filters | Min/Max Required Level range inputs and Min Weapon DPS input | M1 | R1 Survey |
| 3 | Weapon Swing Speed & Benchmarks | Direction operator dropdown (`≥` slower / `≤` faster), numeric speed input, and `ℹ️` benchmark helper popover | M1 | R1 Survey |
| 4 | Core Attributes Filter | Min Strength, Agility, Stamina, Intellect, Spirit inputs with numeric threshold matching | M1 | R1 Survey |
| 5 | Combat & Caster Stats Filter | Min AP (base/ranged/feral), Crit %, Hit %, Spell Damage, Healing, MP5 inputs with accurate regex extraction | M1 | R1 Survey |
| 6 | Defensive & Shield Stats Filter | Min Armor and Min Block Value (combining base shield block + equip block bonus) | M1 | R1 Survey |
| 7 | Active Counter & Reset Button | Dynamic active filter count badge and 1-click Reset All Filters button restoring default state | M1 | R1 Survey |
| 8 | Comprehensive Tooltip & Stat Parser | Robust parsing engine covering all 17 dimensions across steps, alts, lines, stats, and BiS items with zero errors | M1 | R2 Survey |
| 9 | Multi-Criteria Logical AND Matching | Evaluate all active criteria simultaneously; items must satisfy all active filters to pass | M1 | R3 Survey |
| 10 | Alt Item Promotion Engine | When primary item fails active filters but an alt matches, promote alt to hero card with `⭐ Alt Promoted` badge | M2 | R3 Survey |
| 11 | Step Hiding & Empty State | Hide steps where neither primary nor alts match; display accessible empty state with 1-click reset when zero steps match | M2 | R3 Survey |
| 12 | Chip Filter Coexistence | Seamless coexistence with existing Faction (All/Alliance/Horde), Source, and Slot (1H/MH/2H/Ranged) filters | M2 | R3 Survey |
| 13 | Dual-Surface Shared Deployment | Enable 1:1 on both Weapons Progression Hub (`#weapons`) and Class Deep Dives (`#deepdives/:class/progression`) | M2 | R4 Survey |
| 14 | Architecture & Anti-Monolith Compliance | Implement in dedicated `progression-filter.js`; ensure `class-progression.js` remains <= 1,500 lines; pass DOM validation | M2 | R4 Survey |
| 15 | E2E Testing Suite & Infra | Comprehensive 4-tier test suite in `tests/test_progression_filter_e2e.mjs`, publishing `TEST_INFRA.md` and `TEST_READY.md` | M-TEST | E2E Track |
| 16 | Full Validation & Adversarial Hardening | Verify 100% pass of `node scripts/validate.js` (63 checks) and E2E suite; Tier 5 adversarial stress testing | M3 | Project Pattern |

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| M-TEST | E2E Testing Track | Design 4-tier test suite (`tests/test_progression_filter_e2e.mjs`), `TEST_INFRA.md`, `TEST_READY.md` | none | DONE |
| M1 | Core Filter Module & Parsing Engine | Implement `js/modules/deepdives/progression-filter.js` (stat parser, state machine, drawer UI, speed benchmarks, styles in `css/styles.css`) | none | DONE |
| M2 | Dual-Surface Integration & Wiring | Register in `index.html`, wire into `class-progression.js`, verify `#weapons` & `#deepdives` 1:1 parity | M1 | DONE |
| M3 | Full Validation, E2E Pass & Hardening | Verify `node scripts/validate.js`, run E2E test suite, Reviewer, Challenger, and Forensic Auditor verification | M-TEST, M2 | DONE |

## Interface Contracts

### Progression Filter Contract (`progression-filter.js` ↔ `class-progression.js` ↔ `weapons-hub.js`)
- `window.WOW_PROGRESSION_FILTER` exposes:
  - `renderDrawerHtml(): string` — renders the collapsible drawer markup with all 17 controls, badge, and reset button.
  - `setupEventListeners(container, onUpdateCallback)` — binds input events, toggle drawer, speed benchmark popover, and reset actions.
  - `parseItemStats(item): Object` — extracts normalized numeric stats:
    `{ reqLevel, iLvl, dps, speed, armor, block, strength, agility, stamina, intellect, spirit, attackPower, crit, hit, spellDamage, healing, mp5 }`.
  - `itemMatchesFilter(item): boolean` — evaluates item against active filter criteria using logical AND.
  - `getActiveFilterCount(): number` — returns the count of active filter fields.
  - `resetFilters(): void` — clears all active filter fields to unconstrained defaults.
  - `getState(): Object` / `setState(newState): void` — state getters and setters.

### Alt Promotion Contract
- In `class-progression.js` `renderStepCard(step, ...)`:
  - Step's primary item evaluated against `itemMatchesAll(step, ...)`.
  - If primary fails, examine `step.alts`. The first matching alt is promoted to primary hero display (`displayStep = { ...step, ...altMatch, isAltPromoted: true }`).
  - Hero card displays `⭐ Alt Promoted` badge when `isAltPromoted` is true.
  - Remaining alts filtered to only include items matching active filters.
  - If neither primary nor any alts match, step returns `''`.

## Code Layout
- Exclusive Write Ownership:
  - M-TEST owns: `tests/test_progression_filter_e2e.mjs`, `TEST_INFRA.md`, `TEST_READY.md`.
  - M1 owns: `js/modules/deepdives/progression-filter.js`, `css/styles.css` (appends filter drawer CSS).
  - M2 owns: `index.html` (script tag registration), `js/modules/deepdives/class-progression.js` (filter integration hooks).
  - M3 owns: Verification and hardening reports.
