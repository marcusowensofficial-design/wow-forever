# Project: WoW Forever 1–60 Progression Weapons, Wands, Off-Hands & Shields Engine

## Architecture
- **Forensic Scraper & Durable Cache Engine (`scripts/cache-forever-items.mjs`, `scratch/forever_items_cache.json`)**:
  - Dual-endpoint router: Classic items (<200k) route to `classic.wowhead.com/item={id}&xml`, custom Forever items (>=200k or `envChange.status === 'new'`) route to `www.wowhead.com/forever/item={id}&xml`.
  - Full-fidelity XML/HTML tooltip parser: Strips nested HTML tags, captures multi-line `Equip:`, `Chance on hit:`, and `Use:` effects without truncation; captures base shield block (`X Block` / `blockamount`), un-prefixed `X Armor`, elemental resistances, and exact Wowhead icon tokens (`https://wow.zamimg.com/images/wow/icons/medium/${icon}.jpg`).
  - Idempotent incremental caching: Skips items with complete verified data; batches network requests with rate-limiting (12 concurrent, 150ms delay, exponential backoff).
  - Benchmark self-test suite validating IDs 1168 (Skullflame Shield), 6953 (Verigan's Fist), 6975 (Whirlwind Axe), 11684 (Ironfoe).
- **Master Progression Gating & Stat Weight Engine (`scripts/build-progression.mjs`, `data/scraped/forever_*.json`)**:
  - Single-command master ingestion engine replacing fragmented legacy scripts.
  - Practical effective level bracketing: `effectiveLevel = Math.max(item.reqLevel, quest.reqLevel, dungeon.minEnterLevel, dungeon.practicalGroupLevel, trainerUnlockLevel)`.
  - Gated dungeon instances: RFC 13, VC 18, WC 18, SFK 22, BFD 24, Stocks 24, Gnome 29, RFK 30, SM GY 30, SM Lib 33, SM Arm 36, SM Cath 39, RFD 38, Ulda 41, ZF 44, Mara 46, ST 50, BRD 52, LBRS/DM/Scholo/Strat 56–58; custom Forever dungeons (Hall of Thanes 14, Ruins of Lordaeron 18, Excavation Site 29, City of Dalaran 31).
  - Weapon proficiency trainer floors (Polearms level 20, Warrior/Hunter Dual Wield level 20) and strict class equip rules (Paladin 0 axes, Hunter ranged track 0 melee, Shaman 0 swords, Rogue 0 2H/axes, Druid 0 swords/axes).
  - Human-tuned leveling stat weights for 5 roles: Melee DPS (instant attack weapon damage + slow speed bias), Rogue OH (fast poison speed), Hunter (slow ranged volley damage), Caster DPS (levels 1–30 wand DPS + Spirit 5SR vs levels 31–60 Spell Power/Hit), Healer (Healing Power, MP5, Spirit), Tank (Shield block value/armor, fast 1H HS rage dumping).
  - Two-tiered catalog ranking: Highlights designated "⭐ Top Pick" hero + top 4–5 alternative upgrades per bracket, fully indexing all 2,592 datamined equippable items in the background alternatives pool.
- **Compiler & Browser Bundle (`scripts/compile-progression-data.mjs`, `js/data/class-progression-data.js`)**:
  - Bundles weapons, shields, off-hands, wands, macros, spellbooks into `window.WOW_PROGRESSION_DATA`.
- **UI Controller & Filter Integration (`js/modules/deepdives/class-progression.js`, `js/modules/deepdives/progression-filter.js`)**:
  - Highlights "⭐ Top Pick" badge on hero card.
  - Renders top 4–5 alternatives cleanly on cards with expandable "+N more alternatives" control.
  - Full multi-criteria filtering across all 17 stat dimensions with 0 NaNs.
  - Dynamic alt promotion (`⭐ Alt Promoted`) when active filters or faction selection disqualify the hero.
  - 100% link formatting to `https://www.wowhead.com/forever/item={id}`.
- **Pre-Commit Verification & Audit Hardening (`scripts/audit-weapons.mjs`, `scripts/validate.js`)**:
  - Resolves all 43 weapon proficiency failures in `audit-weapons.mjs`.
  - Extends `validate.js` with Checks 64–68: class weapon proficiencies, dungeon level entry gating, faction tagging completeness, 17 stat parsing without NaN, and forever domain link validation.

## Feature Inventory
| # | Feature | Description | Milestone | Source |
|---|---------|-------------|-----------|--------|
| 1 | Dual Endpoint Routing & XML Fetch | Route <200k items to Classic XML and >=200k/new items to Forever XML | M1 | R1 Survey |
| 2 | Full-Fidelity Tooltip XML/JSON Parser | Strip nested HTML tags; capture multi-line Equip/Proc/Use effects | M1 | R1 Survey |
| 3 | Shield Block & Un-prefixed Armor Parsing | Capture base shield block (`X Block`), un-prefixed `X Armor`, elemental resistances | M1 | R1 Survey |
| 4 | Idempotent Caching & Rate Limiting | Skip verified entries, batch 12 concurrent, token bucket backoff, periodic flush | M1 | R1 Survey / Priority Directive |
| 5 | Benchmark Item Automated Verification | Exact assertions for Skullflame Shield (1168), Verigan's Fist (6953), Whirlwind Axe (6975), Ironfoe (11684) | M1 | R1 Survey / Priority Directive |
| 6 | Practical Effective Level Bracketing | `Math.max(reqLevel, questReq, dungeonMin, dungeonPractical, trainerLevel)` | M2 | R2 Survey |
| 7 | Dungeon Instance Level Floor Gating | Enforce practical floors (VC 18, WC 18, SM 30–39, ZF 44, Mara 46, BRD 52, etc.) | M2 | R2 Survey |
| 8 | Weapon Trainer & Dual Wield Availability | Gate Polearms to Level 20; gate Dual Wield to Level 20 for Warriors/Hunters | M2 | R2 Survey |
| 9 | Class Weapon Proficiency Constraints | Paladin 0 axes; Hunter ranged track 0 melee; Shaman 0 swords; Druid 0 swords/axes | M2 | R2 Survey |
| 10 | Human-Tuned Leveling Stat Weights | Implement 5 role leveling formulas (Melee DPS slow, Rogue OH fast, Hunter slow, Caster 1-30 wand/Spirit vs 31-60 spell, Healer, Tank) | M2 | R3 Survey |
| 11 | Tiered Catalog Ranking & Full Indexing | Highlight "⭐ Top Pick" + top 4–5 alts; index all 2,592 datamined items into background pool | M2 | R3 Survey |
| 12 | Single-Command Unified Progression Pipeline | `npm run pipeline:progression` executing cache -> build -> compile -> audit -> validate | M2 | Priority Directive |
| 13 | Faction Completeness & Source Tagging | 100% faction tagging (`alliance`, `horde`, `both`); canonical sources (`quest`, `dungeon_drop`, `vendor`, `crafted`, `world_drop`) | M3 | R4 Survey |
| 14 | 17-Stat Filter Parsing & Zero NaN | Progression filter evaluates all 17 dimensions cleanly without producing NaN | M3 | R4 Survey |
| 15 | Forever Domain Link & CDN Icon Integrity | All links target `https://www.wowhead.com/forever/item={id}`; icons use Zamimg medium CDN | M3 | R4 Survey |
| 16 | UI Card Enhancement & Progressive Disclosure | Render "⭐ Top Pick" badge, top 5 alts, expandable "+N more alternatives" toggle | M3 | R3 Survey |
| 17 | Weapon Proficiency Audit Fixes | Fix 43 failures in `scripts/audit-weapons.mjs` (38 Hunter melee, 5 Paladin axes, Truesilver regex) | M4 | R5 Survey |
| 18 | Pre-Commit Test Suite Expansion | Add Checks 64–68 to `scripts/validate.js` (proficiencies, dungeon gating, faction, 17-stat, links) | M4 | R5 Survey |
| 19 | Opaque-Box E2E Test Suite | Design 4-tier E2E test suite (Feature, Boundary, Combinations, Real-World) publishing `TEST_READY.md` | M-TEST | E2E Track |
| 20 | Adversarial Coverage Hardening & Verification | Pass 100% E2E tests + Tier 5 adversarial stress testing; Reviewer, Challenger, and Auditor gating | M-FINAL | Project Pattern |

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| M-TEST | E2E Testing Track | Requirement-driven opaque-box test suite (`tests/test_progression_e2e.mjs`), `TEST_INFRA.md`, publish `TEST_READY.md` | none | DONE |
| M1 | Forensic Scraper & Durable Cache Pipeline | `scripts/cache-forever-items.mjs`, `scratch/forever_items_cache.json`, dual endpoints, full tooltip parser, benchmark test | none | DONE |
| M2 | Progression Gating, Stat Weights & Single-Command Engine | `scripts/build-progression.mjs`, `package.json`, dungeon/quest/trainer gating, leveling stat weights, indexing all 2,592 items, compilation | M1 | DONE |
| M3 | UI Integration, Faction Guardrails & Filter Compatibility | `js/modules/deepdives/class-progression.js`, `forever_*.json`, Top Pick badge, top 5 alts + expandable pool, faction completeness, canonical sources | M2 | DONE |
| M4 | Automated Audit & Pre-Commit Test Suite Hardening | `scripts/audit-weapons.mjs` (0 errors), `scripts/validate.js` Checks 64–68 (0 failures) | M2, M3 | DONE |
| M-FINAL | 100% E2E Test Pass & Adversarial Hardening | Pass 100% E2E test suite (Tiers 1–4) + Tier 5 adversarial coverage hardening with Challenger/Reviewer/Auditor verification | M-TEST, M4 | PLANNED |

## Interface Contracts
### Cache Engine (`scripts/cache-forever-items.mjs` ↔ `scratch/forever_items_cache.json`)
- Cache entry schema:
  ```json
  {
    "id": 1168,
    "name": "Skullflame Shield",
    "icon": "inv_shield_01",
    "quality": 4,
    "reqLevel": 54,
    "effectiveLevel": 54,
    "armor": 2256,
    "block": 40,
    "speed": null,
    "dps": null,
    "stats": "2256 Armor, 40 Block, +10 Fire Resistance, +10 Shadow Resistance, Equip: When struck in combat has a 3% chance of stealing 35 life from target enemy., Equip: When struck in combat has a 1% chance of causing a Flame Strike that deals 75 to 125 Fire damage to all enemies around you.",
    "lines": ["2256 Armor", "40 Block", "+10 Fire Resistance", "+10 Shadow Resistance", "..."],
    "procs": ["Equip: ...", "Equip: ..."],
    "resistances": { "fire": 10, "shadow": 10 },
    "classRestriction": null
  }
  ```

### Master Ingestion Engine (`scripts/build-progression.mjs` ↔ `data/scraped/forever_*.json`)
- `effectiveLevel` calculation:
  ```javascript
  effectiveLevel = Math.max(
    item.reqLevel || 0,
    item.questReqLevel || 0,
    dungeonMinEnterLevel || 0,
    dungeonPracticalLevel || 0,
    trainerFloorLevel || 0
  );
  ```
- Progression Step Schema:
  ```json
  {
    "levelBracket": "17-18",
    "name": "Cruel Barb",
    "itemId": 5191,
    "icon": "inv_sword_18",
    "quality": 3,
    "dps": 17.69,
    "speed": 2.6,
    "stats": "+12 Attack Power",
    "effectiveLevel": 18,
    "faction": "both",
    "source": { "kind": "dungeon_drop", "text": "Edwin VanCleef (The Deadmines)" },
    "alts": [
      {
        "name": "Smite's Mighty Hammer",
        "itemId": 5196,
        "effectiveLevel": 18,
        "score": 184.2,
        "rank": 2,
        "faction": "both",
        "source": { "kind": "dungeon_drop", "text": "Mr. Smite (The Deadmines)" }
      }
    ],
    "pool": [ ...all remaining eligible items for bracket... ]
  }
  ```

## Code Layout
- Exclusive Write Ownership:
  - M-TEST: `TEST_INFRA.md`, `TEST_READY.md`, `tests/test_progression_e2e.mjs`.
  - M1: `scripts/cache-forever-items.mjs`, `scratch/forever_items_cache.json`.
  - M2: `scripts/build-progression.mjs`, `scripts/compile-progression-data.mjs`, `package.json`, `data/scraped/forever_weapons.json`, `forever_offhands.json`, `forever_wands.json`.
  - M3: `js/modules/deepdives/class-progression.js`.
  - M4: `scripts/audit-weapons.mjs`, `scripts/validate.js`.
