# 🌐 WoW Forever — Web Portal & Character Suite Architecture

A high-performance, dependency-free Single Page Application (SPA) providing real-time beta tracking, game codex data, class deep-dives, interactive talent trees, and 16-slot BiS character planning for **World of Warcraft: Forever** (Classic+).

---

## 📑 Table of Contents
1. [🏛️ Architecture Overview](#️-architecture-overview)
2. [📁 Directory Structure](#-directory-structure)
3. [⚙️ Development & Deployment](#️-development--deployment)
4. [🧪 Testing & Pre-Commit Audits](#-testing--pre-commit-audits)
5. [📦 Addon Suite Integration](#-addon-suite-integration)

---

## 🏛️ Architecture Overview

The web portal is engineered as a **modular vanilla application** deliberately avoiding heavy JavaScript runtime frameworks (React/Vue/Angular) to achieve:
1. **Instant First Paint (< 100ms)** with zero build-step or hydration overhead.
2. **Deterministic State Synchronization** via explicit DOM event delegation and scoped module controllers.
3. **High Data Density** with static multi-megabyte game datasets indexed for $O(1)$ fast lookups in client memory.

### Layered Separation of Concerns

```
┌─────────────────────────────────────────────────────────────┐
│                       Presentation Layer                    │
│           index.html  •  css/styles.css  •  css/tools.css   │
└──────────────────────────────┬──────────────────────────────┘
                               │
┌──────────────────────────────▼──────────────────────────────┐
│                  Application Orchestration                  │
│              js/app.js (Bootstrap & Global Events)          │
│              js/tracker.js (Live Clocks & State Engine)     │
└──────────────────────────────┬──────────────────────────────┘
                               │
┌──────────────────────────────▼──────────────────────────────┐
│                    Feature Module Controllers                │
│    bis.js • atlas.js • professions.js • deepdives.js ...    │
└──────────────────────────────┬──────────────────────────────┘
                               │
┌──────────────────────────────▼──────────────────────────────┐
│                     Domain Data Models                      │
│   js/data/ (core-data, bis-data, talents-data, deepdives/)  │
└─────────────────────────────────────────────────────────────┘
```

---

## 📁 Directory Structure

```text
website/
├── index.html                   # Master semantic HTML5 application shell & view templates
├── package.json                 # Project scripts, Playwright, Cheerio, and ESLint configs
├── README.md                    # Architecture documentation & developer reference
├── AGENTS.md                    # Engineering guidelines, invariants & file size guardrails
├── PROJECT.md                   # Feature roadmaps, milestone audits & progress tracking
├── css/
│   ├── styles.css               # Design system, theme tokens, typography, masthead & core UI
│   └── tools.css                # Tool styling (BiS paper-doll, talent trees, spell rank tables)
├── js/
│   ├── app.js                   # Application bootstrap, navigation routing & modal lifecycle
│   ├── tracker.js               # Real-time beta countdown engine & live ticker scheduler
│   ├── utils.js                 # Shared formatting, DOM helpers, and sanitize routines
│   ├── data/                    # Domain data registry (Static immutable game state)
│   │   ├── core-data.js         # News items, rule pillars, camping mechanics, roadmap
│   │   ├── data.js              # Aggregated lookup indices & compatibility matrix
│   │   ├── races-classes.js     # Class and race definitions, racials, resource types
│   │   ├── talents-data.js      # Talent trees, coordinates, dependencies & rank formulas
│   │   ├── tools-data.js        # Consumable and spell downranking datasets
│   │   ├── bis-data.js          # Level 30 BiS equipment registry across all specs & slots
│   │   ├── atlas-data.js        # Dungeons, bosses, loot tables, rares, books, and PvP data
│   │   ├── professions-data.js  # Tanning rack, spinning wheel, and classic recipes
│   │   ├── class-progression-data.js # 1-60 weapons, wands, shields, and tracks
│   │   └── deepdives/           # Per-class deepdive specs, builds, stat priorities (all 9 classes)
│   └── modules/                 # Self-contained feature controllers
│       ├── addons.js            # Addon Suite browser, spotlight cards & live downloads
│       ├── atlas.js             # Interactive dungeon maps, boss tactics & loot explorer
│       ├── bis.js               # 16-slot interactive paper doll, stat budgets & alternatives
│       ├── camping.js           # Camping perks and buff calculators
│       ├── changes.js           # Forever changes changelog & patch explorer
│       ├── codex.js             # Class & race matrix, lore, toolkit display
│       ├── deepdives.js         # Class deepdive modals, tabs, rotations & talent sync
│       ├── downranking.js       # Spell downranking calculator & mana efficiency formulas
│       ├── guides.js            # Leveling & dungeon routes
│       ├── hiddenitems.js       # Hidden items & discovery tracker
│       ├── hunterpets.js        # Hunter pet radar, family abilities, and diet matrix
│       ├── legacy.js            # Season 1 Class Mastery challenges & achievements
│       ├── lifecycle.js         # Site lifecycle transitions & release state scheduling
│       ├── navigation.js        # Tab switching, scroll restoration, sticky headers
│       ├── news.js              # News feed rendering & categorization
│       ├── planner.js           # Class & talent planner controller
│       ├── professions.js       # Primary/secondary professions, leveling & route calculators
│       ├── search.js            # Global search & fuzzy indexing
│       ├── talent-tree.js       # Interactive talent tree calculator UI & perk math
│       ├── tierlist.js          # Spec rankings & phase viability
│       ├── weapons-hub.js       # Universal weapon progression & filter controller
│       ├── bis/                 # Sub-controllers for BiS equipment modals & slots
│       ├── deepdives/           # Class progression, 17-stat filters, and build trees
│       ├── professions/         # Professions modals, route builders, and leveling tabs
│       └── talent-tree/         # Build serialization, import/export & legality helpers
├── scripts/                     # Tooling, scrapers, data compilers & validation runners
│   ├── validate.js              # 70+ automated pre-commit integrity checks
│   ├── validate-atlas.js        # Atlas data, boss drop, and expanded dungeon validator
│   ├── validate-addons.mjs      # Addon Suite 16001 TOC, XML, and Lua syntax audits
│   ├── package-addons.js        # Automated release packager for Addon Suite zip archives
│   ├── scrape-foreverchanges.js # Data scraper for new dungeons, bosses, and items
│   ├── scrape-competitors.mjs   # Class progression scraper and matrix extractor
│   ├── cache-forever-items.mjs  # Incremental item tooltip cache & Wowhead XML parser
│   └── build-progression.mjs    # Progression gating, stat weights & leveling engine
└── tests/                       # Automated test suites and adversarial test runners
```

---

## ⚙️ Development & Deployment

### Running Locally

You can serve the website using any static HTTP file server:

```bash
# Using npm script:
npm run dev

# Or with npx serve:
npx serve . -l 3000

# Or with Python:
python -m http.server 3000
```

Open `http://localhost:3000` in your browser.

### Cloud Deployment (Render.com)

The project includes root-level deployment configuration via `../render.yaml`:
* **Publish Path**: `./website`
* **SPA Routing**: Wildcard rewrites routed to `/index.html`
* **Zero Build Step**: Native static file distribution via CDN edge caches.

---

## 🧪 Testing & Pre-Commit Audits

All commits and data modifications must pass the automated verification suites:

```bash
# Run core site and data integrity audits (70 checks):
npm test

# Run Addon Suite TOC, XML, and Lua syntax checks (120 checks):
npm run test:addons

# Package clean release archives into website/downloads/:
npm run package:addons

# Run progression pipeline (scrape cache -> build -> compile -> validate):
npm run pipeline:progression
```

---

## 📦 Addon Suite Integration

The website serves as the distribution hub for the **WoW Forever Addon Suite**, supporting the Camelot (12.0) engine:
* **Single-TOC 16001 compliance**: Validated dual-TOC files (`.toc` and `_Camelot.toc`).
* **Automated Packaging**: `npm run package:addons` compresses and hashes releases with zero external dependencies into `website/downloads/`.
