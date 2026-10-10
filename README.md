# ⚔️ World of Warcraft: Forever — Classic+ Beta Hub & Portal

A comprehensive, responsive tracking hub, news portal, and character planner for **World of Warcraft: Forever** (Classic+), launching globally on **November 4, 2026**.

![WoW Forever Banner](https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80)

---

## 🌟 Features & Highlights

### 1. 🧙 Interactive Class & Race Directory & Compatibility Matrix

- **Browse by Class**: Complete role profiles, resource mechanics, armor proficiencies, and all eligible races.
- **Browse by Race**: Full lore, faction allegiance, racial mounts, and the standardized **2 Active + 2 Passive** racial toolkit.
- **Full Compatibility Matrix Table**: 9×9 responsive cross-comparison table with instant faction filters (`All Combos`, `Alliance Only`, `Horde Only`, `✦ Only New in Forever`).
- **All 7 New Combinations**: Undead Paladin (*Forsaken Charger* mount), Dwarf Shaman (Wildhammer), Human Hunter, Gnome Priest, Orc Mage, Troll Warlock, and The Skyborne (*Warrior, Hunter, Rogue, Druid*).

### 2. ⏱️ Operations Hub & Real-Time Countdowns

- Live countdown clocks for:
  - **Beta Phase 2 (L30 Cap)**: October 1, 2026 (Patch 1.60.5 Deploys Today!).
  - **Beta Ends**: October 21, 2026 (35-Day Closed Beta concludes).
  - **Global Official Launch**: November 4, 2026.
  - **Tier 1 Raids Unlock**: December 9, 2026 (*Barrow Deeps 10m, Hyjal Summit 20m, Onyxia 40m* — No Molten Core at launch).
- **35-Day Beta Duration & Testing Roadmap**: Phase 1 (L20 Cap, Sept 17 – Oct 1), Phase 2 (L30 Cap, Oct 1 – Oct 21), and Pre-Launch polish tracking.

### 3. 🛡️ Verified Classic+ Rules & Quality of Life Grid

- 16 core gameplay pillars including:
  - No World Buffs in Raids (anti-Chronoboon meta)
  - Zero WoW Tokens / Paid Boosts
  - Dual Talent Specialization (L40)
  - Anti-Dungeon Spam XP Curve & Full 29-Dungeon Leveling Route
  - In-Combat Addon Disarmament & Native Cooldown Manager (Build 1.60.6)
  - Restored Stormwind Harbor to Auberdine Ferry
  - Ray-Traced Global Illumination & Classic 2004 visual toggle

### 4. 🔨 The 9 Primary Profession Combat Passives & Camping Hub

- Permanent character perks for all 9 primary professions (*Toughness, Lifeblood, Master of Anatomy, Weapon Honing, Mixology, Spirit Weaving, Fur Lining, Ring Enchants, Engineering Tinkers*).
- Cooperative Camping System bonuses.

### 5. 🛡️ Level 30 Beta BiS Lists (All 38 Specs & 9 Classes)

- Dedicated equipment planner and gear ranking for the Level 30 Beta Cap (Build 1.60.6.71890).
- **16-Slot Interactive Paper-Doll**: Visual gear layout with authentic quality borders, recommended enchants, stats, and drop sources.
- **Faction Toggle**: Dynamically switches between Alliance and Horde to reflect faction-specific quest rewards and stat allocations.
- **Slot Alternatives Breakdown**: Ranks #1 BiS alongside #2 and #3 alternatives, including drop rates, boss encounters (Dalaran, Excavation Site 4, RFK, Gnomeregan), and required crafting recipes.
- **Live Stat Budget & Talent Speccing**: Calculates total HP, Armor, AP, Spell Power, Crit %, and includes the 26-point talent build (+5 from the *Talented* Legacy perk).
- **One-Click Clipboard Export**: Instantly copies formatted gear lists to clipboard for Discord and guild notes.

### 6. 📊 Interactive Tier List Maker

- S/A/B/C/D/F community tier list maker with HTML5 drag-and-drop and keyboard hotkeys (**S**, **A**, **B**, **C**, **D**, **F**, and **Backspace**).
- Filterable token pool across Specs (DPS, Tanks, Healers, All 27), Classes (9), Races (10), and Combos (56).
- Canvas HD PNG export, direct clipboard copy, and local storage autosave.

### 7. 🧪 Spell Downranking Calculator

- Compares WoW Forever (Build 1.60.6) mechanics (no sub-20 penalty, 17-level grace window, then -5%/level penalty) against Classic Era.
- Dynamic sliders for player level and bonus healing/damage, rank-by-rank HPM/HPS tables, and interactive SVG scaling curves.

### 8. 🔍 Universal Command Palette (`/` Hotkey)

- Global search overlay accessible anytime with `/`.
- Fast indexed search across all dungeons, classes, specs, BiS lists, spells, talents, and guides with keyboard navigation.

### 9. 📰 Intel & Dispatches Wire

- Integrated updates from Wowhead, Method.gg, MrGM, and Blizzard Official.
- Search, filter by source, and local storage personal intel logger.

### 10. 📋 Legacy Calculator & Roster Tracker

- Interactive 16-point Legacy Talent Calculator.
- Beta Phase 2 (Level 30) milestone checklist with percentage tracker.
- Squad and Guild roster planner with role breakdown.

### 11. 🛡️ Official In-House Addon Suite (Camelot 12.0 Engine / TOC 16001)

Developed and maintained in `addons/` by Marcus Owens & the WoW Forever Addon Team:

- **`ForeverPlates`**: Minimalist zero-taint pixel nameplates, dynamic threat coloring, and C-side text.
- **`Forever Nameplates Castbars` (`Foreverplatescastbars`)**: Sub-pixel enemy nameplate castbars, latency queue markers, and uninterruptible spell shields.
- **`ForeverLiquid`**: Cyberpunk neon fluid XP/Rep reservoir, real-time gold cashflow ledger, and 5-instance/hr lockout radar.
- **`Forever Dungeon Journal` (`ForeverDungeonJournal`)**: In-game Classic+ encounter atlas, 3D boss viewer, sub-pixel maps, and loot tables.
- **`ForeverBlessings`**: 60-minute Paladin blessing coordinator, interactive class assignment matrix, and missing buff detector.
- **`EchoTwist`**: Windfury extra attack audio-visual alerts, 0.4s golden Seal Twisting cadence indicator, and swing timer.
- **`BetterBlizzFrames (Marcus Custom)`**: Curated baseline UI frame layout, dark frames, and micro-menu refinements backup.

---

### Monorepo Structure

```text
WOWFOREVER/
├── website/             # Web Portal, BiS Planner, Codex & Character Tools (HTML/CSS/JS)
├── addons/              # In-Game WoW Client Addon Suite (Lua/XML/TOC)
├── render.yaml          # Render Blueprint deployment config (staticPublishPath: ./website)
└── README.md            # Repository overview
```

### Deploy on Render (Static Site)

This web portal is 100% static (HTML, CSS, and Vanilla JavaScript) with zero build dependencies.

1. Log in to your [Render Dashboard](https://dashboard.render.com).
2. Click **New +** -> **Static Site**.
3. Connect your GitHub account and select the **`wow-forever`** repository.
4. Configure the settings:
   - **Name**: `wow-forever` (or your preferred name)
   - **Branch**: `main`
   - **Build Command**: *(Leave empty)*
   - **Publish Directory**: `website`
5. Click **Create Static Site**. Render will automatically build and host your site with free SSL and global CDN!

A `render.yaml` Blueprint is included in this repository for automatic deployment.

---

## 💻 Local Development

Navigate into `website/` and serve with any local HTTP server:

```bash
# Using npm
cd website
npm start

# Or with npx serve
npx serve website -l 3000

# Or with Python
python -m http.server 3000 --directory website
```

---

## 📜 License

Created for community theorycrafting and tracking World of Warcraft: Forever. World of Warcraft and Warcraft are registered trademarks of Blizzard Entertainment, Inc.
