# E2E Test Infra: WoW Forever 1–60 Progression Engine

## Test Philosophy
- Opaque-box, requirement-driven derived strictly from `ORIGINAL_REQUEST.md` without internal module dependencies.
- Methodology: Category-Partition + Boundary Value Analysis + Pairwise Combinatorial Testing + Real-World Workload Testing.

## Feature Inventory & Test Coverage Matrix
| # | Feature | Requirement Source | Tier 1 (Coverage) | Tier 2 (Boundary) | Tier 3 (Cross-Feature) |
|---|---------|-------------------|:-----------------:|:-----------------:|:---------------------:|
| 1 | Dual Endpoint XML Routing | R1 / Priority Directive | 5 | 5 | ✓ |
| 2 | Full-Fidelity Tooltip & Proc Parsing | R1 | 5 | 5 | ✓ |
| 3 | Shield Block & Un-prefixed Armor Extraction | R1 | 5 | 5 | ✓ |
| 4 | Idempotent Caching & Rate Limiting | R1 / Priority Directive | 5 | 5 | ✓ |
| 5 | Benchmark Item Verification Suite | R1 | 5 | 5 | ✓ |
| 6 | Practical Effective Level Formula | R2 | 5 | 5 | ✓ |
| 7 | Dungeon Entrance & Practical Floor Gating | R2 | 5 | 5 | ✓ |
| 8 | Weapon Trainer (Polearms) & DW Level 20 Gating | R2 | 5 | 5 | ✓ |
| 9 | Class Weapon Proficiency Constraints | R2 / R5 | 5 | 5 | ✓ |
| 10 | Human-Tuned Leveling Stat Weights (5 Roles) | R3 | 5 | 5 | ✓ |
| 11 | Tiered Catalog Ranking (⭐ Top Pick + Top 5) | R3 | 5 | 5 | ✓ |
| 12 | Background Equippable Catalog Indexing | R3 | 5 | 5 | ✓ |
| 13 | Single-Command Durable Pipeline Execution | Priority Directive | 5 | 5 | ✓ |
| 14 | Faction Tagging & Dynamic Alt Promotion | R4 | 5 | 5 | ✓ |
| 15 | Canonical Item Source Enums | R4 | 5 | 5 | ✓ |
| 16 | 17-Stat Dimension Filter Parsing & Zero NaN | R4 | 5 | 5 | ✓ |
| 17 | Forever Domain Link & Zamimg CDN Icons | R4 | 5 | 5 | ✓ |
| 18 | Weapon Proficiency Pre-Commit Audit Pass | R5 | 5 | 5 | ✓ |
| 19 | DOM & Data Integrity Pre-Commit Suite Pass | R5 | 5 | 5 | ✓ |

## Test Architecture
- **Test Runner**: `node tests/test_progression_e2e.mjs`
- **Pass/Fail Semantics**: Process exits with code `0` on 100% pass, code `1` on any failure.
- **Output**: Structured console report grouping assertions by Tier 1–4, plus benchmark verification summary.
- **Signal**: Upon 100% pass across Tiers 1–4, writes `TEST_READY.md` at project root.

## Real-World Application Scenarios (Tier 4)
| # | Scenario | Features Exercised | Complexity |
|---|----------|--------------------|------------|
| 1 | Level 19 Twink & Starter Dungeon Progression (RFC, VC, WC) | F6, F7, F9, F10, F11, F14 | Medium |
| 2 | Level 30 Whirlwind Axe & Verigan's Fist Questlines | F2, F5, F6, F8, F9, F10, F11 | High |
| 3 | Mid-Level Caster 1–30 Wand/Spirit vs 31–60 Spell Power Transition | F10, F11, F12, F16 | High |
| 4 | Level 40 Tank Shield & Fast 1H Weapon Dungeon Gating (SM, RFD, Ulda) | F3, F5, F7, F9, F10, F11, F16 | High |
| 5 | Level 55+ End-Game Pre-Raid BiS Dungeon Farming (BRD, LBRS, Scholo, Strat) | F2, F5, F7, F9, F10, F11, F12, F15 | High |
| 6 | Custom WoW Forever Beta Dungeons & Beta Patches Ingestion Pipeline | F1, F4, F12, F13, F17, F18, F19 | High |

## Coverage Thresholds
- **Tier 1 (Feature Coverage)**: $\ge 5 \times 19 = 95$ test cases
- **Tier 2 (Boundary & Corner)**: $\ge 5 \times 19 = 95$ test cases
- **Tier 3 (Cross-Feature Combinations)**: $\ge 19$ pairwise interaction test cases
- **Tier 4 (Real-World Application Scenarios)**: 6 comprehensive end-to-end scenarios
- **Total Minimum Threshold**: $\ge 215$ test cases
