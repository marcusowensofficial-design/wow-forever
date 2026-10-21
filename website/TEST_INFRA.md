# Test Infrastructure: Interactive Multi-Dimensional Progression Stat & Requirement Filter E2E Testing Suite

## 1. Overview & Architecture

The Progression Stat & Requirement Filter E2E Testing Suite provides an automated, requirement-driven, opaque-box verification framework for the **Interactive Multi-Dimensional Progression Stat & Requirement Filter** (Beta Build 1.60.1.70425). It independently validates the 17-dimension stat parser, filter state machine, speed direction operators (`≥` / `≤`), speed benchmark helper (`ℹ️`), active filter badge counter, 1-click Reset All Filters button, alt promotion engine, and step suppression across both the Top-Level Weapons Progression Hub (`#weapons`) and Class Deep Dive Progression tabs (`#deepdives/:class/progression`).

The testing architecture strictly decouples test assertions from internal implementation details. The suite evaluates runtime data models and user-facing contracts directly against the authoritative specifications defined in `PROJECT.md` and `ORIGINAL_REQUEST.md` (§ 2026-10-20T22:20:31Z R1–R4).

```
===================================================================================
                  PROGRESSION FILTER E2E TEST RUNNER
                 (tests/test_progression_filter_e2e.mjs)
===================================================================================
                                      │
          ┌───────────────────────────┼───────────────────────────┐
          ▼                           ▼                           ▼
  [Dataset VM Loader]         [Test Framework]            [Progression Filter
(class-progression-data.js, (tests/helpers/assertions.js)   Contract Engine]
      bis-data.js)                                      (window.WOW_PROGRESSION_FILTER
          │                           │                  / Reference Spec Oracle)
          └───────────────────────────┼───────────────────────────┘
                                      │
       ┌──────────────────┬───────────┴──────────┬──────────────────┐
       ▼                  ▼                      ▼                  ▼
 [Tier 1: Features] [Tier 2: Boundaries]   [Tier 3: Combos]   [Tier 4: Scenarios]
  (>=5 tests per     (>=5 tests per         (Faction, Source,  (Rogue fast dagger,
   feature group;     boundary category;     and Slot chips     Warrior slow 2H,
   9 feature groups;  unconstrained,        combined with      Caster SP, Paladin
   55 total tests)    exact bounds, etc.)   stat filters)      shield, 7671 audit)
===================================================================================
```

---

## 2. Directory Layout & Test Organization

```
website/
├── tests/
│   ├── test_progression_filter_e2e.mjs     # Standalone Progression Filter Master E2E Runner
│   ├── run_e2e.js                          # Build 70425 Talents & Racials Test Runner
│   └── helpers/
│       ├── loader.js                       # Node VM dataset isolated loader
│       ├── talent-engine.js                # Talent validator & math engine
│       └── assertions.js                   # Structured assertion & reporting framework
├── js/
│   ├── data/
│   │   ├── class-progression-data.js       # Curated 1–60 progression roadmaps (439 steps, 3,482 alts)
│   │   └── bis-data.js                     # Phase 2 Level 30 BiS equipment database (3,750 items)
│   └── modules/
│       ├── deepdives/
│       │   ├── progression-filter.js       # Dedicated Filter Module (window.WOW_PROGRESSION_FILTER)
│       │   └── class-progression.js        # Timeline & step card renderer
│       └── weapons-hub.js                  # Top-level weapons progression controller
├── TEST_INFRA.md                           # Test infrastructure and methodology (this file)
└── TEST_READY.md                           # Test execution guide, metrics, and feature checklist
```

---

## 3. Four-Tier Testing Methodology

The test suite follows the 4-tier testing hierarchy mandated by `PROJECT.md`:

### Tier 1: Feature Coverage (Core Requirements)
Ensures every functional requirement in R1 through R4 is rigorously tested with at least 5 targeted test cases per feature category:
1. **Level Range Filters (R1, AC § Filter Precision)**:
   - Default unconstrained state (`minLevel: null`, `maxLevel: null`).
   - Minimum level constraint (`minLevel: 20` rejects `< 20`, keeps `>= 20`).
   - Maximum level constraint (`maxLevel: 30` rejects `> 30`, keeps `<= 30`).
   - Narrow level bracket (`minLevel: 15, maxLevel: 20` strictly restricts timeline to 15–20).
   - Starter items lacking explicit `reqLevel` property default to level 1.
   - Parsing required level from tooltip `lines` array (`Requires Level (\d+)`).
2. **Weapon DPS Filters (R1, AC § Filter Precision)**:
   - Default unconstrained state (`minDps: null/0`).
   - Float threshold evaluation (`minDps: 20.5` rejects strictly below 20.5, keeps `>= 20.5`).
   - Floating-point boundary comparison (e.g. 20.49 vs 20.50).
   - Non-weapon off-hands and shields evaluate to 0 DPS and are filtered when `minDps > 0`.
   - Parsing DPS from string formats with unit text (`"25.4 DPS"`).
   - Parsing parenthetical DPS from tooltip lines (`(31.25 damage per second)`).
3. **Weapon Swing Speed & Operator (R1, AC § Filter Precision, AC § UI)**:
   - Default unconstrained state (`speedVal: null`).
   - Slower operator `≥` (`speedVal: 3.50` accepts 3.50, 3.80; rejects 2.60).
   - Faster operator `≤` (`speedVal: 1.80` accepts 1.40, 1.80; rejects 2.00).
   - Exact speed boundary inclusion (`speedVal: 2.60` with both `≥` and `≤`).
   - Non-weapon items (speed 0) fail numeric speed filter without generating `NaN`.
   - Speed operator toggle behavior dynamically inverting filter outcomes.
4. **Core Attributes Filter (R1, AC § Filter Precision)**:
   - Minimum Strength (`minStr: 7` matches `>= 7`, rejects `< 7`).
   - Minimum Agility (`minAgi: 5` matches `>= 5`, rejects `< 5`).
   - Minimum Stamina (`minSta: 10` matches `>= 10`, rejects `< 10`).
   - Minimum Intellect (`minInt: 6` matches `>= 6`, rejects `< 5`).
   - Minimum Spirit (`minSpi: 4` matches `>= 4`, rejects `< 3`).
   - Multi-attribute logical AND (`minStr: 7, minSta: 7` strictly requires BOTH).
   - Parsing abbreviated stat tokens (`+16 Str, +17 Sta, +3 Agi, +5 Int, +4 Spi`).
5. **Combat & Caster Stats Filter (R1, AC § Filter Precision)**:
   - Attack Power (AP, RAP, Feral AP aggregation formula `baseAP + Math.max(feralAP, rangedAP)`).
   - Critical Strike % (`+X% Critical Strike`, `+X Crit`, `+X Critical Strike Rating`).
   - Hit Chance % (`+X% Hit`, `+X Hit Rating`).
   - Spell Damage / Spell Power extraction from generic lines, tokens (`+X SP`), and school bonuses.
   - Healing Power extraction from pure healing (`Equip: Increases healing...`), dual lines, and tokens.
   - Asymmetric caster items (*Trogg Scepter* +33 healing matches `minHealing: 30`, fails `minSpellDmg: 30`).
   - MP5 extraction (`Equip: Restores X mana per 5 sec`, `+X MP5`).
6. **Defensive & Shield Stats Filter (R1, AC § Filter Precision)**:
   - Armor parsing from direct property and lines (`minArmor: 500` matches 984, rejects 250).
   - Comma-formatted armor normalization (`"1,380 Armor"` -> 1380).
   - Base shield block value parsing (`17 Block`, `+1 Block`, `item.block`).
   - Equip block value bonus extraction (`Increases the block value of your shield by (\d+)`).
   - Combined shield block summation formula: $\text{Total Block} = \text{Base Block} + \text{Equip Block Bonus}$.
   - Exclusion of Block Chance (`+2% Block Chance`) and block damage triggers from block value.
7. **Active Filter Counter Badge (R1, AC § UI)**:
   - Dynamic count of active criteria (`activeCount === 0` on default unconstrained load).
   - Single filter increment (`minLevel: 15` -> count 1).
   - Multi-filter increment (`minLevel: 15, minDps: 20, minStr: 5` -> count 3).
   - Boundary defaults do not count as active (`minLevel: 1` or `maxLevel: 60` are inactive).
   - Speed operator alone without speed value does not increment count.
   - Badge HTML rendering (`<span class="filter-count-badge active">3 Active</span>`).
8. **Reset Button & State Restoration (R1, AC § UI)**:
   - `resetFilters()` resets all numeric inputs to null/empty.
   - `resetFilters()` restores `minLevel` and `maxLevel` to default boundaries.
   - `resetFilters()` restores `speedOp` to `">="`.
   - `resetFilters()` resets `getActiveFilterCount()` to 0.
   - Restores 100% of previously filtered items immediately.
   - Preserves drawer open/closed UI toggle state (`isDrawerOpen`).
9. **Speed Operator & Benchmark Popover (R1, AC § UI)**:
   - Dropdown defaults to `≥` (Slower / At least).
   - Dropdown selectable to `≤` (Faster / At most).
   - Speed benchmark helper popover (`ℹ️`) markup and styling.
   - Benchmark guidance breakdown: Fast (1.20–1.80s), Standard (1.90–2.80s), Slow (2.90–4.00s).
   - Accessible WCAG attributes (`aria-controls`, `aria-expanded`, `role="tooltip"`).

---

### Tier 2: Boundary & Corner Cases (Structural Robustness)
Evaluates extreme inputs, edge conditions, and data anomalies with at least 5 tests per category:
1. **Unconstrained Empty Defaults**:
   - Empty object `{}` passes all items.
   - Empty strings `""` on number fields parse cleanly as unconstrained nulls.
   - Zero-value inputs (`minStr: 0`, `minDps: 0`) treated as unconstrained.
   - Inverted level range (`minLevel: 30, maxLevel: 20`) handles cleanly with 0 matches (no NaN or exception).
   - Null or undefined item objects pass safely through `parseItemStats` returning safe defaults.
2. **Exact Speed Boundaries & Precision**:
   - Extreme high-speed boundary: 1.00s hyper-fast dagger.
   - Extreme slow boundary: 4.00s heavy 2H mace.
   - Exact boundary equality on `<=` and `>=`.
   - Floating point speed comparison tolerance (avoiding precision drift).
   - Items lacking swing speed (shields/offhand tomes) gracefully evaluate to speed 0 without throwing.
3. **Negative Stats & False Positive Guards**:
   - Cursed/datamined negative stats (`"-1 Intellect"`, `"-5 Stamina"`) correctly captured with negative sign.
   - Filtering `minInt: 0` correctly rejects items with negative intellect (`-1 < 0`).
   - Zero attribute placeholders (`"+0 Agility"`) parsed as 0 (fails `minAgi: 1`).
   - Selectable stat tokens (`"+9 [Agility or Strength]"`) credited towards either attribute.
   - Rejection of false-positive target debuff lines (`"Chance on hit: lowers Intellect of target by 4"`).
   - Rejection of summon lines colliding with stat names (`"Equip: Summons the infernal spirit of Shahram"`).
4. **Comma-Formatted Armor & High Values**:
   - High-armor shields with comma formatting (`"1,380 Armor"`) normalized to numeric `1380`.
   - Comma in middle of string (`"1,078 Armor"`) normalized to numeric `1078`.
   - Rejection of temporary proc armor buffs (`"chance to grant you 1080 armor for 12 sec"`).
   - Armor extracted from summary `stats` string (`"1,380 Armor, +22 Block"`).
   - Non-armor weapons evaluate to armor 0 without `NaN`.
5. **Shield Base Block + Equip Bonus Summation**:
   - Shield with only base block (`item.block: 15`).
   - Shield with base block 57 and equip bonus 21 summing to 78 (*Crest of Preeminence*).
   - *Lord Blackwood's Buckler* (66 base + 27 equip = 93 total block).
   - Block chance line (`+2% Block`) excluded from block value.
   - Block damage trigger line (`Deals 13 to 15 Holy damage every time you block`) excluded from block value.
6. **Items Without Lines Array & Incomplete Schemas**:
   - Items with missing/undefined `lines` array (e.g. *Golemheart Stave*) recovered via `stats` string.
   - Items missing explicit `reqLevel` defaulted to 1.
   - Alt items with stats only in `value` summary string.
   - BiS item schema interoperability (using `ilvl` instead of `iLvl`, string `itemId`, and damage rows in `lines`).
   - Non-array or malformed tooltip lines handled gracefully.

---

### Tier 3: Cross-Feature Combinations (Pairwise & Multi-System Interactions)
Validates interactions between the filter drawer and existing progression roadmap controls:
1. **Faction Chips + Stat Filters**:
   - Faction = Alliance + `minStr: 8` on Paladin/Warrior roadmaps (retains Alliance/Neutral, excludes Horde).
   - Faction = Horde + `minDps: 12.0` (Staff of Orgrimmar in alts promoted; Alliance quest rewards excluded).
   - Class faction locks (Shaman forced Horde; Paladin Alliance/Undead).
2. **Source Chips + Stat Filters**:
   - Source = Dungeon + `minDps: 20.0` (retains Corpsemaker, Ravager; excludes vendor/quest).
   - Source = Quest + `minAgi: 5` (retains quest rewards with Agility >= 5).
   - Source = Vendor + `minDps: 5.0` (retains starter vendor items).
3. **Slot Chips + Speed / Stat Filters**:
   - Slot = One-Hand + `speedOp: '<=', speedVal: 1.80` (isolates fast 1H daggers/swords; rejects 2H).
   - Slot = Two-Hand + `speedOp: '>=', speedVal: 3.50` (isolates slow 2H weapons; rejects 1H).
   - Slot = Shield + `minBlock: 15` (retains shields with block >= 15; excludes weapons/tomes).
4. **Multi-Criteria Logical AND Combinations**:
   - Faction = Horde + Source = Dungeon + Slot = Two-Hand + `minDps: 20.0`.
   - Faction = Alliance + Source = Quest + `minStr: 5` + `minSta: 5`.
5. **Alt Promotion Across Multi-Criteria**:
   - Primary item fails stat filter; Alt 1 matches all criteria -> Alt 1 promoted to Hero card.
   - Hero card displays `⭐ Alt Promoted` badge.
   - Demoted primary item placed into alts tray if it meets faction/source/slot filters.
   - Neither primary nor any alt matches -> step omitted from roadmap (`return ''`).

---

### Tier 4: Real-World Scenarios & Deep Dives (End-to-End Workflows)
Validates end-to-end player progression workflows and forensic dataset integrity:
1. **Rogue Fast Dagger & Poison Leveling**:
   - Configuration: Slot: `One-Hand`, `speedOp: '<='`, `speedVal: 1.80`, `minAgi: 2`.
   - Verifies isolation of fast off-hand poison weapons across levels 1–60.
2. **Warrior Arms Slow 2H Burst Weapon Scaling**:
   - Configuration: Slot: `Two-Hand`, `speedOp: '>='`, `speedVal: 3.50`, `minDps: 20.0`.
   - Verifies isolation of slow, high-damage weapons (*Corpsemaker* 3.80s, *Whirlwind Axe* 3.60s, *Ravager* 3.50s).
3. **Caster Spell Damage & Healing Weapon Progression**:
   - Configuration: `minSpellDmg: 10` or `minHealing: 15` on Priest, Mage, Warlock, Shaman.
   - Verifies caster weapon progression spikes (*Trogg Scepter*, *Hypnotic Blade*, spell staves).
4. **Protection Paladin High-Armor High-Block Shield Progression**:
   - Configuration: `minArmor: 300`, `minBlock: 12` on Paladin/Warrior shield paths.
   - Verifies low-armor early bucklers are filtered while quality mid-tier shields pass.
5. **Complete Filter Lifecycle (Apply -> Empty State -> 1-Click Reset)**:
   - Apply unreachable filter (`minDps: 999.0`).
   - Roadmap outputs 0 matches; empty state banner rendered.
   - Click "Reset All Filters" -> state reset to defaults -> 100% roadmap restored.
6. **Dual-Surface Parity Verification**:
   - Renders weapons roadmap on `#weapons` and `#deepdives/:class/progression`.
   - Asserts identical filtered output HTML and step counts across both surfaces.
7. **Comprehensive Forensic Dataset Census**:
   - Executes `parseItemStats` across all 439 progression steps and 3,482 alts in `WOW_PROGRESSION_DATA` and 3,750 BiS items in `WOW_BIS_DATA` (7,671 total items).
   - Asserts 0 thrown exceptions, 0 `NaN` values, and 100% data fidelity.

---

## 4. Test Infrastructure & Execution Engine

### Dataset Isolation via Node VM
The test runner loads browser-targeted global datasets (`class-progression-data.js`, `bis-data.js`) in an isolated Node.js `node:vm` sandbox with mock `window` and `document` environments. This achieves sub-second execution speeds without requiring a headless browser or modifying production datasets.

### Dual-Execution Target Support
The test runner dynamically inspects the workspace:
1. If `js/modules/deepdives/progression-filter.js` exists on disk, it is loaded into the VM context and tested directly as the production implementation.
2. If `progression-filter.js` is pending implementation (e.g. during initial test suite creation in M-TEST), the test runner seamlessly verifies the contract against the formal Reference Specification Oracle derived from `PROJECT.md` and `explorer_survey_p3_3`.
3. When worker implementation lands, the exact same test suite automatically validates production code with zero modifications.

---

## 5. Execution Guide

### Run Full Test Suite:
```bash
node tests/test_progression_filter_e2e.mjs
```

### Run Specific Tiers:
```bash
node tests/test_progression_filter_e2e.mjs --tier=1     # Tier 1 Feature Coverage
node tests/test_progression_filter_e2e.mjs --tier=2     # Tier 2 Boundary Cases
node tests/test_progression_filter_e2e.mjs --tier=3     # Tier 3 Cross-Feature Combos
node tests/test_progression_filter_e2e.mjs --tier=4     # Tier 4 Real-World Scenarios
```

### Verbose Mode:
```bash
node tests/test_progression_filter_e2e.mjs --verbose
```

### Pre-Commit Validation:
```bash
node scripts/validate.js
```

### Exit Codes:
- `0`: All executed test assertions passed successfully.
- `1`: One or more test assertions failed (details printed to stderr/stdout).

---

## 6. Authoritative Reference Sources

All expected outputs in this test suite are derived directly from:
- `ORIGINAL_REQUEST.md`: Requirements § 2026-10-20T22:20:31Z R1–R4.
- `PROJECT.md`: Progression Filter Contract and 17-dimension architecture.
- `explorer_survey_p3_3/analysis.md`: State machine, speed benchmarks, and 4-tier matrix.
- `explorer_survey_p3_2/analysis.md`: Tooltip parsing rules and 7,671-item census.
- `js/data/class-progression-data.js` and `js/data/bis-data.js`: Authoritative runtime item data.
