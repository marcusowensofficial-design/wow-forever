# ForeverLiquid (v1.3.0)

**Ultra-sleek, high-tech neon liquid XP, Reputation, Gold, Inventory, Dungeon & Alt session tracker designed specifically for WoW Forever (Camelot / 12.0 engine) and modern WoW clients.**

---

## 🌟 Visual Theme & Cyberpunk Liquid Aesthetics
* **Obsidian Glass & Neon Glow**: Deep Obsidian Glass (`#050806` / `#0A0E0C`) backdrop framed with 1px electric neon pixel borders, responsive hover effects, and neon drop shadows.
* **6 Selectable Cyberpunk Themes**:
  * 🟩 **Matrix** — Electric Lime & Emerald (`#00FF7F` / `#39FF14`)
  * 🟪 **Cyber Void** — Neon Purple & Ethereal Violet (`#9D4EDD` / `#C77DFF`)
  * 🟧 **Sunwell Core** — Radiant Gold & Amber Plasma (`#FFB703` / `#FFD166`)
  * 🟥 **Blood Knight** — Crimson Neon & Blood Ruby (`#E63946` / `#FF4D6D`)
  * 🟦 **Glacial Frost** — Cyan Laser & Sub-zero Ice (`#00F5D4` / `#48CAE4`)
  * ⬜ **Carbon Minimal** — Titanium Slate & Stealth Monochrome (`#E0E1DD` / `#778DA9`)
* **Classic 20-Bubble (5%) Liquid Reservoir**:
  * Dual-layer fluid status bar with animated wave shimmer, fluid gradient fill, cyan rested-XP overlay, and an animated pulsating spark.
  * Features 19 glowing 5% divider ticks across the reservoir, delivering an authentic Classic WoW experience with an ultra-modern aesthetic.
* **Micro Bag Gauge (`🎒 18/64`)**:
  * Integrated directly into the HUD's Gold Capsule.
  * Real-time slot tracker with dynamic color coding (Neon Green ➜ Warning Amber ➜ Critical Neon Red at < 3 slots). Click to toggle all bags.
* **Neon Obsidian Scrollbars**:
  * Custom 4px neon scroll tracks and glowing thumb sliders across all dashboard feeds and alt rosters.
* **Audio & Visual Fanfares**:
  * Celebration flares, sound cues, and glow animations upon leveling up, hitting gold milestones, or completing your custom financial/mount goal.

---

## ⚡ Core Engine Features

### 1. 4-Tab Obsidian Dashboard Drawer
Toggled smoothly via left-clicking the Gold Pod or typing `/fl`:
* **Tab 1: Analytics & Financial Ledger**:
  * **Leveling / Rep Metrics**: Session XP/Rep, current XP/hr velocity, and exact mobs/turn-ins required to reach the next tier.
  * **Goal & Mount Fund Tracker**: Set a target savings goal (e.g. 100g for Level 40 Riding, 1000g for Epic Mount). Displays a live progress bar, completion percentage, and an intelligent **ETA Countdown** based on your session's net earning velocity.
  * **Financial Cashflow Ledger**: Real-time breakdown of Gross Income (Loot, Quests, Vendor Sales, Trades) vs Gross Expenses (Repairs, Flight Paths, Merchant Purchases, Skill Training, Net Session Profit).
* **Tab 2: Recent Loot Feed**:
  * High-tech drop feed with glowing quality borders, item icons, and vendor prices.
  * Quality filter toggles (All, White+, Green+, Blue+).
  * `Alt + Right-Click` to remove an unwanted drop from session calculations; `Shift + Click` to link items directly into chat.
* **Tab 3: Dungeon & Farm Runs**:
  * **5/Hour Lockout Monitor**: Accurately tracks Blizzard's rolling 5-instance-per-hour limit with a live countdown timer until the oldest instance lockout expires.
  * **Active Run Card**: Tracks current instance name, elapsed run time, mob/boss kills, raw gold picked up, and total vendor loot value.
  * **Historical Run Log**: Logs completed dungeon and farming runs with clear breakdowns of duration, kills, and revenue.
* **Tab 4: Alt Roster 2.0**:
  * Glassmorphic character cards displaying class colors, levels, zones, and resting status.
  * **Dynamic Offline Rested XP Prediction**: Accurately calculates rested XP accumulated while characters are logged out (inn resting vs wild resting).
  * **Account Wealth Summary**: Visualizes total gold across all tracked characters with wealth distribution bars.

### 2. Dual Progression Tracking (XP & Faction Reputation)
* Smoothly transitions from leveling XP into active **Faction Reputation** (`C_Reputation` / `GetWatchedFactionInfo`) at level cap or on demand.
* Color-coded status fills: Exalted Cyan, Revered Neon Green, Honored Lime, Friendly Forest Green, Neutral Gold, Hostile Red.

### 3. Precision Combat XP vs Quest XP Engine
* Listens to `CHAT_MSG_COMBAT_XP_GAIN` and `QUEST_TURNED_IN`.
* Separates pure monster grinding from quest turn-ins, preventing quest reward spikes from distorting your "Mobs to Level" telemetry.

### 4. Discord Markdown Export
* Click the Discord icon or run `/fl export` to open a one-click copyable (`Ctrl + C`) Markdown summary modal, formatted with emojis and code blocks for sharing to guild Discord channels.

### 5. Protected Junk Whitelist / Blacklist
* Protects valuable white/grey novelty items, sentimental vanity items, or crafting components from being sold by the auto-vendor engine (`/fl protect <ItemLink|ItemID>`).

### 6. Vendor Automation & Smart Combat Protection
* **Auto-Sell Greys**: Cleanses bags of unprotected grey junk items upon merchant interaction, printing profit summaries to chat.
* **Auto-Repair**: Repairs equipped gear when visiting capable merchants.
* **Smart In-Combat Dimming**: Automatically lowers HUD opacity in combat to minimize distraction.
* **Zero UI Taint Architecture**: Designed strictly around isolated frames and Camelot 12.0 `BackdropTemplate` standards.

---

## 🎮 Controls & Interactions
* **Left-Click & Drag (or Shift+Drag)**: Move the HUD bar anywhere on your screen.
* **Left-Click (Level/Badge Pod)**: Cycle tracking focus mode (`AUTO` ➜ `XP` ➜ `REP`).
* **Left-Click (Status Bar)**: Cycle display mode (`Percentage & Value` ➜ `Rate & Time to Next` ➜ `Remaining & Mobs/Rep to Level`).
* **Left-Click (Gold Pod)**: Smoothly open/close the **Neon Obsidian Dashboard Drawer**.
* **Left-Click (Bag Gauge)**: Open or close all player bags.
* **Right-Click (HUD)**: Open the quick context action menu (Themes, Pause/Resume, Save, Share, Lock, Layouts, Focus).
* **Alt + Right-Click (Recent Loot Row)**: Remove an accidentally looted or unwanted drop from the session.
* **Shift + Click (Recent Loot Row)**: Link the item into chat.

---

## 💬 Slash Commands

| Command | Description |
| :--- | :--- |
| `/fl` | Toggle the Neon Obsidian Dashboard drawer |
| `/fl toggle` | Show or hide the main HUD bar |
| `/fl config` | Open the Blizzard Settings options panel |
| `/fl theme <matrix\|void\|sunwell\|blood\|frost\|carbon>` | Switch active Cyberpunk color theme |
| `/fl goal <amount>` | Set Mount Fund / target savings goal in gold (e.g. `/fl goal 100`) |
| `/fl export` | Open the Discord Markdown export dialog |
| `/fl protect <link\|id>` | Add an item to the protected junk whitelist |
| `/fl unprotect <link\|id>` | Remove an item from the protected junk whitelist |
| `/fl protected` | Print all protected items in chat |
| `/fl bubbles` | Toggle the 20-bubble (5%) divider ticks on the liquid reservoir |
| `/fl bagmeter` | Toggle the micro bag capacity gauge on the HUD |
| `/fl report <say\|party\|guild>` | Share formatted session report to active chat channel |
| `/fl rep` | Cycle tracking focus (`AUTO` ➜ `XP` ➜ `REP`) |
| `/fl bags` | Check current free bag capacity in chat |
| `/fl pause` | Pause or resume session timer and rate velocity |
| `/fl save` | Manually save a session snapshot to database |
| `/fl restore` | Force restore the previously saved session |
| `/fl reset` | Reset current session metrics (XP, Gold, Loot, Runs) |
| `/fl lock` | Lock or unlock HUD position |
| `/fl filter <all\|white\|green\|blue>` | Switch Recent Loot feed quality filter |
| `/fl dock <free\|top\|bottom\|minimap>` | Switch layout docking mode |
| `/fl autosell` | Toggle auto-selling grey junk at merchants |
| `/fl autorepair` | Toggle auto-repairing gear at merchants |
| `/fl combat` | Toggle in-combat HUD dimming |
| `/fl toast` | Toggle neon rare loot drop toasts on/off |
| `/fl loot` | Toggle factoring item vendor value into Gold/hr speed |
| `/fl scale <0.5 - 2.0>` | Adjust HUD display scale |
| `/fl width <420 - 850>` | Adjust HUD bar width |
| `/fl test` | Trigger a simulated Epic loot toast animation preview |

---

## 🛠️ Architecture & Specifications
* **Target Engine**: World of Warcraft 12.0 Camelot / WoW Forever Beta.
* **Interface Version**: `16001`.
* **Single-TOC Support**: `[AllowLoadGameType camelot]` & `[AllowLoadGameType standard]`.
* **Database**: `ForeverLiquidDB` (character & account-scoped schema with automatic migration).
