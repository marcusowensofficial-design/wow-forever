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
  - **Beta Ends**: October 21, 2026 (35-Day Closed Beta concludes).
  - **Beta Phase 2 (L30 Cap)**: October 8, 2026.
  - **Global Official Launch**: November 4, 2026.
  - **Tier 1 Raids Unlock**: December 9, 2026 (*Barrow Deeps 10m, Hyjal Summit 20m, Onyxia 40m* — No Molten Core at launch).
- **35-Day Beta Duration & Testing Roadmap**: Phase 1 (L20), Phase 2 (L30), and Pre-Launch polish tracking.

### 3. 🛡️ Verified Classic+ Rules & Quality of Life Grid
- 16 core gameplay pillars including:
  - No World Buffs in Raids (anti-Chronoboon meta)
  - Zero WoW Tokens / Paid Boosts
  - Dual Talent Specialization (L40)
  - Anti-Dungeon Spam XP Curve & Full 29-Dungeon Leveling Route
  - In-Combat Addon Disarmament
  - Restored Stormwind Harbor to Auberdine Ferry
  - Ray-Traced Global Illumination & Classic 2004 visual toggle

### 4. 🔨 The 9 Primary Profession Combat Passives & Camping Hub
- Permanent character perks for all 9 primary professions (*Toughness, Lifeblood, Master of Anatomy, Weapon Honing, Mixology, Spirit Weaving, Fur Lining, Ring Enchants, Engineering Tinkers*).
- Cooperative Camping System bonuses.

### 5. 📰 Intel & Dispatches Wire
- Integrated updates from Wowhead, Method.gg, MrGM, and Blizzard Official.
- Search, filter by source, and local storage personal intel logger.

### 6. 📋 Legacy Calculator & Roster Tracker
- Interactive 16-point Legacy Talent Calculator.
- Beta Phase 1 (Level 20) milestone checklist with percentage tracker.
- Squad and Guild roster planner with role breakdown.

---

## 🚀 Deployment

### Deploy on Render (Static Site)
This project is 100% static (HTML, CSS, and Vanilla JavaScript) with zero build dependencies.

1. Log in to your [Render Dashboard](https://dashboard.render.com).
2. Click **New +** -> **Static Site**.
3. Connect your GitHub account and select the **`wow-forever`** repository.
4. Configure the settings:
   - **Name**: `wow-forever` (or your preferred name)
   - **Branch**: `main`
   - **Build Command**: *(Leave empty)*
   - **Publish Directory**: `.` *(Root directory)*
5. Click **Create Static Site**. Render will automatically build and host your site with free SSL and global CDN!

A `render.yaml` Blueprint is included in this repository for automatic deployment.

---

## 💻 Local Development
Simply open `index.html` in any modern web browser or serve it with any local web server:

```bash
# Python
python -m http.server 8000

# Node.js (npx)
npx serve .
```

---

## 📜 License
Created for community theorycrafting and tracking World of Warcraft: Forever. World of Warcraft and Warcraft are registered trademarks of Blizzard Entertainment, Inc.
