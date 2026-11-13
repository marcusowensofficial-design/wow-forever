# ForeverLiquid Changelog

## v1.4.1 — Suffix-aware AH pricing
- Loot is now priced by its exact random suffix (of the Eagle, of the Monkey, ...) using ForeverMarket 1.1.0's per-suffix data, instead of one price shared by every suffix.
- If that suffix has never been seen on the AH, the cheapest suffix of the item is used and the loot tooltip says so ("Est. from cheapest suffix").
- Still works with older ForeverMarket versions and with the saved ForeverMarketDB directly.

## v1.4.0 "Insight" — plan and what shipped

### Findings from the code review
Bugs / risks
1. **Paused session kept ticking after a restore.** `RestoreSession` set `isPaused = true` but never set `pauseStart`, so `GetSessionDuration` kept counting.
2. **`/fl reset` left `session.transfers` untouched** (mail/bank/trade amounts), so Gold/hr was skewed after a reset. Transfers were also not saved or restored.
3. **`UNIT_POWER_UPDATE` and `UNIT_SPELLCAST_SUCCEEDED` were registered for every unit.** In a dungeon or raid that is hundreds of events per second for data only the player needs. Now `RegisterUnitEvent("player")`.
4. **A session was only saved on clean logout.** A crash or disconnect lost the whole session. Now auto-saved every 60s.
5. Old sessions were silently discarded after the timeout, with no record kept.

Upgrades
6. Rates were whole-session averages only, so a 3-hour session hid how you are doing *right now*.
7. No idle handling: standing AFK dragged XP/hr and Gold/hr down.
8. No death tracking.
9. No history of past sessions or personal bests.

### What shipped
- Fixes for items 1-5 (core.lua).
- New `insights.lua` module:
  - Rolling **recent rates** (default last 15 min) for XP/hr and Gold/hr, shown in tooltips, `/fl stats` and the chat/Discord reports.
  - **Smart auto-pause** when idle (opt-in): `/fl afk <minutes|off>`. Idle time is removed from the session clock and tracking resumes the moment you gain XP, loot, money, rep, or enter combat.
  - **Death counter** (saved with the session, shown in tooltip / reports / history).
  - **Session History** window (`/fl history`, also in the right-click menu): every finished or timed-out session is archived (last 40), with personal bests (best XP/hr, best Gold/hr, longest session).
  - `/fl stats` prints a private full summary to your chat window.
  - `/fl rate <minutes>` changes the recent-rate window (5-60).
- Version bumped to 1.4.0 in both TOCs, core and README.

### Ideas not built yet (backlog)
- Per-zone XP/gold breakdown ("where do I earn the most?")
- Level-up time log ("how long did each level take")
- Dashboard tab for History + a sparkline of XP/hr over the session
- Options-panel entries for the new settings (currently slash commands)
- Gathering / profession skill-up tracker
- Auction-house mail income tracker (ForeverMarket tie-in)
- Plugin API so other WoW Forever addons can add pods to the bar
