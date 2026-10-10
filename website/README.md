# 🌐 WoW Forever — Web Portal & Character Suite Architecture

A high-performance, dependency-free Single Page Application (SPA) providing real-time beta tracking, game codex data, class deep-dives, interactive talent trees, and 16-slot BiS character planning for **World of Warcraft: Forever** (Classic+).

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
│    bis.js • talent-tree.js • deepdives.js • codex.js ...    │
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
├── package.json                 # Local development scripts (serve, dev, preview)
├── README.md                    # Architecture documentation & contributor guide
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
│   │   └── deepdives/           # Per-class deepdive specs, builds, stat priorities
│   │       ├── druid.js
│   │       ├── hunter.js
│   │       ├── mage.js
│   │       ├── paladin.js
│   │       ├── priest.js
│   │       ├── rogue.js
│   │       ├── shaman.js
│   │       ├── warlock.js
│   │       ├── warrior.js
│   │       └── pending.js
│   └── modules/                 # Self-contained feature controllers
│       ├── bis.js               # 16-slot interactive paper doll, stat budgets & alternatives
│       ├── camping.js           # Camping perks and buff calculators
│       ├── codex.js             # Class & race matrix, lore, toolkit display
│       ├── deepdives.js         # Class deepdive modals, tabs, rotations & talent sync
│       ├── downranking.js       # Spell downranking calculator & mana efficiency formulas
│       ├── guides.js            # Leveling & dungeon routes
│       ├── hiddenitems.js       # Hidden items & discovery tracker
│       ├── navigation.js        # Tab switching, scroll restoration, sticky headers
│       ├── news.js              # News feed rendering & categorization
│       ├── planner.js           # Class & talent planner controller
│       ├── search.js            # Global search & fuzzy indexing
│       ├── talent-tree.js       # Interactive talent tree calculator UI & perk math
│       └── tierlist.js          # Spec rankings & phase viability
└── images/
    ├── icons/                   # Production UI badges (Alliance / Horde crests)
    └── screenshots/             # QA verification and visual regression captures
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
