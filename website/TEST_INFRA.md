# Test Infrastructure: WoW Forever Beta Build 1.60.1.70425 E2E Testing Suite

## 1. Overview & Architecture

The WoW Forever E2E Testing Suite provides an automated, requirement-driven, opaque-box verification framework for **Beta Build 1.60.1.70425 (Sixteenth Beta Build, October 15, 2026)**. It independently validates the synchronization of talent trees, racials, baseline abilities, raid utility, client versioning, news dispatches, and Level 30 deep dive builds.

The testing architecture strictly decouples test assertions from internal implementation details. The suite evaluates runtime data models and user-facing contracts directly against the authoritative specifications defined in `PROJECT.md` and `ORIGINAL_REQUEST.md`.

```
===================================================================================
                             WOW FOREVER TEST RUNNER
                             (tests/run_e2e.js)
===================================================================================
                                      │
          ┌───────────────────────────┼───────────────────────────┐
          ▼                           ▼                           ▼
   [Dataset Loader]           [Test Framework]            [Talent Engine]
 (tests/helpers/loader.js) (tests/helpers/assertions.js) (tests/helpers/talent-engine.js)
          │                           │                           │
          └───────────────────────────┼───────────────────────────┘
                                      │
       ┌──────────────────┬───────────┴──────────┬──────────────────┐
       ▼                  ▼                      ▼                  ▼
 [Tier 1: Features] [Tier 2: Boundaries]   [Tier 3: Combos]   [Tier 4: Scenarios]
  (>=5 tests per     (>=5 tests per         (Pairwise inter-   (Complete Level 30
   feature category;  category: 0-pt, 21-pt, actions: racials   builds, deep dive
   all 26 features)   capstones, bounds)     + talents/totems)  legality audits)
===================================================================================
```

---

## 2. Directory Layout & Test Organization

```
website/
├── tests/
│   ├── run_e2e.js                      # Primary test runner entry point
│   ├── helpers/
│   │   ├── loader.js                   # Node VM dataset isolated loader
│   │   ├── talent-engine.js            # Independent talent validator & math engine
│   │   └── assertions.js               # Structured assertion & reporting framework
│   └── suites/
│       ├── tier1_features.test.js      # Tier 1: Feature Coverage (all 26 features)
│       ├── tier2_boundaries.test.js    # Tier 2: Boundary & Corner Cases
│       ├── tier3_combinations.test.js  # Tier 3: Cross-Feature Combinations
│       └── tier4_scenarios.test.js     # Tier 4: Real-World Scenarios & Deep Dives
├── TEST_INFRA.md                       # Test infrastructure and methodology (this file)
└── TEST_READY.md                       # Test execution guide and feature coverage checklist
```

---

## 3. Four-Tier Testing Methodology

The test suite follows the 4-tier testing hierarchy mandated by `PROJECT.md`:

### Tier 1: Feature Coverage (Functional Correctness)
Ensures every discrete requirement in the 26-feature inventory is tested with at least 5 targeted test cases per category:
1. **Shaman Elemental Rebuild**: `Elemental Mastery` (Row 7, 31pt), `Lava Burst` (Row 5, 4 ranks, 21pt, no prereq), `Elemental Fury` requiring `Lightning Overload`, `Lightning Overload` requiring `Elemental Alacrity`, `Elemental Alacrity` in Row 2, `Elemental Warding` in Row 3, `Call of Thunder` removed, `Earthbound` in Row 4, `Trial by Fire` renamed.
2. **Shaman Restoration Swap**: `Tidal Focus` in Row 1 Col 3 and `Totemic Focus` in Row 2 Col 3.
3. **Mage Arcane, Fire, & Frost**: `Arcane Wrath` (Row 4 Col 4, 1 rank), `Missile Barrage` (Row 1 Col 4, 2 ranks), `Improved Fire Blast` renamed, `Fire Power` (3 ranks, 12% max), `Critical Mass` (5 ranks, 10% crit), `Ice Lance` (+200% against frozen), `Winter's Chill` (Cone of Cold stacking damage).
4. **Priest Shadow & Discipline**: `Dark Inspiration` (Row 4 Col 1, 5 ranks) replacing `Improved Fade`, `Shadow Affinity` removed, `Improved Mind Blast` in Row 2 Col 1, `Mental Strength` in Row 2 Col 2, `Improved Power Word: Shield` in Row 3 Col 3, `Vampiric Embrace` standardized to 30s CD.
5. **Warlock Affliction & Destruction**: `Grim Reach` (Row 4 Col 4, 2 ranks, +10/20% range) replacing `Malediction`, `Shadow Mastery` (2-10% damage), `Destructive Reach` scoped strictly to Destruction spells.
6. **Paladin, Hunter, Druid, Warrior Talents**: `Reckoning` (4 banked charges on auto-swing), `Shield Specialization` (mana restore on block), `Champion of the Light` (Int to spell damage), `Rapid Recuperation` (in-casting mana regen), `Predator's Edge`, `Furor` (energy decay scaling), `Bloodthrill` (Overpower on Rend), Warrior `Shield Specialization` (Rage on block).
7. **Weapon Racials Deprecation**: Permanent purge of `Sword Specialization` (Human), `Mace Specialization` (Dwarf), and `Axe Specialization` (Orc) across `races-classes.js`, `tools-data.js`, and all class deepdives.
8. **Replacement Racials**: Verification of Human `Ruthless` (+2% crit all spells/attacks), Dwarf `Earth Fury` (+2% crit bonus dmg/heal), Orc `Savage` (+1% crit all spells/abilities), Skyborne `Read Leyline` (2s cast, 2m CD, +100% regen), and 4 racials per race symmetry.
9. **Racial Mechanics Updates**: Verification of Gnome `Eureka!` (8s buff, no charges, benefits PW:Shield), `Blood Fury`, `Shatter Curse`, `Cultivation`, `Endurance`, `Plainsrunning`, `War Stomp`, `Regeneration`, and `Touch of the Grave`.
10. **Raid-Wide Utility & Stat Totems**: Warrior `Battle Shout` raid-wide across all 7 ranks; Shaman `Windfury`, `Grace of Air`, `Strength of Earth`, and `Flametongue` totems raid-wide; non-exclusivity between `Grace of Air` and `Windfury`/`Flametongue`.
11. **Paladin Salvation & Revoke**: Non-blessing `Salvation` and `Mass Salvation` replacing blessings; baseline ability `Revoke`; `Righteous Fury` 90% Holy threat.
12. **Class Spell Tuning Pass**: `Devouring Plague` (24s CD), `Shadow Word: Death` (18s CD), `Chain Lightning` (-35% mana cost), `Fire Nova` tuning, `Mana Tide Totem` (Level 38 rank), `Stormstrike` (8% base mana), `Water Shield` (triggers on all spell crits).
13. **Global Build Versioning & News-45**: Uniform version string `1.60.1.70425` across `core-data.js`, `index.html` headers/badges/footers, and script tags (`?v=1.60.1-70425`); `news-45` timeline dispatch present with complete change summary.
14. **Level 30 Deep Dive Legality**: Recommended Level 30 builds in `shaman.js`, `mage.js`, `priest.js`, `paladin.js`, and `warlock.js` pass talent budget (<= 26 points) and tier gating under the new layouts.

### Tier 2: Boundary & Corner Cases (Structural Robustness)
Evaluates extreme inputs, limits, and edge conditions with at least 5 tests per category:
- **0-Point Trees**: Allocations, refunds, URL serialization, and deserialization of completely empty trees.
- **21-Point Exact Allocations**: Exact baseline Level 30 cap allocations across all 9 classes.
- **Capstones Without Prerequisites**: Rejection of point investment when tier gate point requirements or prerequisite nodes are unmet.
- **Maximum Rank Edge Cases**: Rejection of point investments exceeding `maxRank` (e.g. 2/1, 4/3, 6/5).
- **Level 30 Bounds & Tier Gating**: Row gating formula $5 \times (row - 1)$ strictly enforced across all 7 tiers; point investments above 26 points strictly rejected.

### Tier 3: Cross-Feature Combinations (Pairwise Interactions)
Validates interactions between disparate system mechanics:
- Racial crit bonuses combined with class talent crit multipliers (e.g. Human `Ruthless` + Fire Mage `Critical Mass`).
- Dwarf `Earth Fury` crit damage bonus combined with Shaman `Elemental Fury` +100% crit multiplier.
- Orc `Savage` +1% crit combined with Warlock Affliction/Destruction spells.
- Non-exclusive Shaman totems (`Grace of Air` + `Windfury`) stacking simultaneously on raid members.
- Paladin `Righteous Fury` (+90% threat) combined with `Salvation` (-30% threat) and `Revoke` dispel.
- Gnome `Eureka!` (8s buff) paired with Priest `Power Word: Shield` empowered by Discipline talents.
- Shaman `Water Shield` mana return triggered by `Lava Burst` and Nature spell critical hits.

### Tier 4: Real-World Application Scenarios (End-to-End Workflows)
Validates end-to-end player build configurations and complete deepdive legality audits:
- Complete 21-point Level 30 Shaman Elemental progression (`Convection` -> `Elemental Alacrity` -> `Elemental Focus` -> `Trial by Fire` -> `Lava Burst`).
- Complete 21-point Level 30 Priest Discipline progression (`Unbreakable Will` -> `Mental Strength` -> `Improved PW:S` -> `Soul Warding`).
- Complete 21-point Level 30 Mage Fire progression (`Improved Fire Blast` -> `Ignite` -> `Incinerate` -> `Pyroblast` -> `Critical Mass` 5/5).
- Complete 21-point Level 30 Warlock Affliction progression (`Suppression` -> `Improved Corruption` -> `Fel Concentration` -> `Grim Reach` 2/2).
- Full automated legality audit of all recommended talent builds across all 10 deep dive files in `js/data/deepdives/*.js`.

---

## 4. Test Infrastructure & Execution Engine

### Dataset Isolation via Node VM
The test suite utilizes Node.js's built-in `node:vm` module to load browser-oriented global datasets (`talents-data.js`, `races-classes.js`, `changes-data.js`, `core-data.js`, `deepdives/*.js`) in isolated execution contexts. This eliminates the need for heavyweight browser instances (like Chromium or WebKit) for data-integrity and mathematical tests, delivering sub-second execution speeds without modifying any production source files.

### Independent Verification Engine
To prevent facade testing and circular reasoning, `tests/helpers/talent-engine.js` implements an independent, pure-mathematical validation engine that verifies:
- Tier Gating: $\text{CurrentPointsInTree} \ge 5 \times (\text{Row} - 1)$
- Prerequisite Tree Satisfaction: $\text{PointsInReqNode} = \text{ReqNode.maxRank}$
- Build String Serialization: Ordering nodes by `row ASC, col ASC`

---

## 5. Execution Guide

### Run Full Test Suite:
```bash
node tests/run_e2e.js
```

### Run Specific Tiers:
```bash
node tests/run_e2e.js --tier=1     # Tier 1 Feature Coverage
node tests/run_e2e.js --tier=2     # Tier 2 Boundary Cases
node tests/run_e2e.js --tier=3     # Tier 3 Cross-Feature Combos
node tests/run_e2e.js --tier=4     # Tier 4 Real-World Scenarios
```

### Verbose Mode:
```bash
node tests/run_e2e.js --verbose
```

### Exit Codes:
- `0`: All executed test assertions passed successfully.
- `1`: One or more test assertions failed (details printed to stderr/stdout).

---

## 6. Authoritative Reference Sources

All expected outputs in this test suite are derived directly from:
- `ORIGINAL_REQUEST.md`: Official Beta Build 1.60.1.70425 synchronizations and acceptance criteria.
- `PROJECT.md`: System architecture, 26-feature inventory, and module interface contracts.
- Official Client DB2 / Talents Forever Datamined Changelog (October 15, 2026).
