/**
 * World of Warcraft: Forever - Event schedule maths
 * Finds the current or next run of an event from the client's holiday records.
 * Works in "wall time": a realm-time clock reading stored as if it were UTC.
 */
(function () {
  'use strict';

  const HOUR = 3600 * 1000;
  const DAY = 24 * HOUR;
  // Realm time is assumed to be US Pacific, which this site uses for its other countdowns.
  const REALM_ZONE = 'America/Los_Angeles';

  function realmWallTime(date) {
    const parts = {};
    new Intl.DateTimeFormat('en-US', {
      timeZone: REALM_ZONE, hourCycle: 'h23', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit'
    }).formatToParts(date).forEach(p => { parts[p.type] = Number(p.value); });
    return Date.UTC(parts.year, parts.month - 1, parts.day, parts.hour, parts.minute);
  }

  const toWall = (d, year) => Date.UTC(year ?? d.y, d.mo - 1, d.d, d.h || 0, d.mi || 0);

  /** Current or next run of one schedule record as { start, end }, or null when none is listed. */
  function nextRun(sched, now) {
    const length = (sched.hours || 0) * HOUR;
    const pick = (starts) => {
      const start = starts.sort((a, b) => a - b).find(s => (length ? s + length > now : s >= now));
      return start === undefined ? null : { start, end: start + length };
    };
    if (sched.rule === 'dates') return pick((sched.dates || []).map(d => toWall(d)));
    if (!sched.start) return null;
    if (sched.rule === 'cycle' && sched.cycle) {
      const first = toWall(sched.start);
      const step = sched.cycle * HOUR;
      const n = Math.max(0, Math.floor((now - first) / step));
      return pick([first + n * step, first + (n + 1) * step]);
    }
    if (sched.rule === 'yearly') {
      const y = new Date(now).getUTCFullYear();
      return pick([y - 1, y, y + 1].map(year => toWall(sched.start, year)));
    }
    if (sched.rule === 'weekly') {
      const t = new Date(now);
      const sameDay = Date.UTC(t.getUTCFullYear(), t.getUTCMonth(), t.getUTCDate() + (sched.start.wd || 0) - t.getUTCDay(), sched.start.h || 0, sched.start.mi || 0);
      return pick([sameDay - 7 * DAY, sameDay, sameDay + 7 * DAY]);
    }
    return null;
  }

  function span(ms) {
    const h = Math.max(1, Math.ceil(ms / HOUR));
    if (h < 48) return `${h} hour${h === 1 ? '' : 's'}`;
    const d = Math.round(h / 24);
    return `${d} days`;
  }

  const formatDay = (wall) => new Date(wall).toLocaleString('en-US', {
    timeZone: 'UTC', weekday: 'short', month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit'
  });

  /** Status over every visible schedule of an event: { state, sched, start, end, statusText, dateText }. */
  function eventStatus(event, date) {
    const now = realmWallTime(date || new Date());
    const runs = (event.schedules || []).filter(s => !s.hidden)
      .map(sched => ({ sched, run: nextRun(sched, now) })).filter(x => x.run)
      .sort((a, b) => a.run.start - b.run.start);
    if (!runs.length) return { state: 'none', sched: null, start: null, end: null, statusText: 'No date announced', dateText: '' };
    const { sched, run } = runs[0];
    const active = run.start <= now && run.end > now;
    return {
      state: active ? 'active' : 'upcoming',
      sched,
      start: run.start,
      end: run.end,
      statusText: active ? `Active now, ${span(run.end - now)} left` : `Starts in ${span(run.start - now)}`,
      dateText: active ? `Ends ${formatDay(run.end)} (realm time)` : `Starts ${formatDay(run.start)} (realm time)`
    };
  }

  window.WOW_EVENT_SCHEDULE = { eventStatus, nextRun, realmWallTime };
})();
