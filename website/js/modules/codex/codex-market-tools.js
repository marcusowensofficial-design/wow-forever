/**
 * World of Warcraft: Forever - Shared Market Helpers
 * Pure helpers over WOW_MARKET_SCAN_DATA used by the Item Database, Craft Profit Finder,
 * Disenchant Flips, guides and gathering views: scan freshness, deals, sell timing,
 * sparklines, plus the per-viewer watchlist and shopping list (browser localStorage).
 *
 * Exposed as window.WOW_MARKET_TOOLS. Fires a `wowf-market-change` event on window whenever
 * the watchlist or shopping list changes, so pills and panels can refresh.
 */
(function () {
  'use strict';

  const STALE_DAYS = 3;
  const DEAL_RATIO = 0.6;          // listed at or under 60% of the 14-day median
  const DEAL_MIN_MEDIAN = 2000;    // ignore junk worth under 20s
  const HINT_BAND = 0.15;          // ±15% around the median counts as normal
  const WATCH_KEY = 'wowf.market.watchlist';
  const SHOP_KEY = 'wowf.market.shopping';
  const SHOP_PREFIX = 'FMSL1:';

  function market() { return window.WOW_MARKET_SCAN_DATA || null; }
  function prices() { return market()?.prices || {}; }
  function price(id) { return prices()[id] || null; }

  function formatCopper(copper, opts = {}) {
    const raw = Math.round(Number(copper) || 0);
    if (raw === 0 && !opts.zero) return '—';
    const neg = raw < 0;
    const c = Math.abs(raw);
    const g = Math.floor(c / 10000);
    const s = Math.floor((c % 10000) / 100);
    const k = c % 100;
    let out;
    if (g > 0) out = `${g.toLocaleString('en-US')}g${s > 0 ? ` ${s}s` : ''}`;
    else if (s > 0) out = `${s}s${k > 0 ? ` ${k}c` : ''}`;
    else out = `${k}c`;
    return (neg ? '-' : opts.sign && raw > 0 ? '+' : '') + out;
  }

  function esc(str) {
    return String(str == null ? '' : str).replace(/[&<>"']/g, (ch) => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    }[ch]));
  }

  /** { days, stale, dateStr } for the active scan, or null when no market data is loaded. */
  function scanAge() {
    const t = market()?.lastScanTime;
    if (!t) return null;
    const days = Math.max(0, Math.floor((Date.now() / 1000 - t) / 86400));
    return {
      days,
      stale: days >= STALE_DAYS,
      dateStr: new Date(t * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      ago: days === 0 ? 'today' : `${days} day${days === 1 ? '' : 's'} ago`
    };
  }

  /** True when the item was on the AH in the latest scan (old records linger in the data). */
  function isListed(entry) {
    const t = market()?.lastScanTime || 0;
    return !!entry && entry.minBuyout > 0 && entry.lastSeen >= t - 86400;
  }

  /** The price you can count on selling at: the lower of lowest buyout and 14-day median. */
  function safeSellPrice(entry) {
    if (!entry || !(entry.minBuyout > 0)) return 0;
    return Math.min(entry.minBuyout, entry.med14 || entry.minBuyout);
  }

  /**
   * What the item usually goes for at the low end: the lower quartile of the daily lowest
   * prices before today. A median can be inflated by one overpriced auction sitting unsold
   * for days; the low quartile isn't. Needs 5+ days of history, else 0 (unknown).
   */
  function typicalLow(entry) {
    const prior = (entry?.h || []).slice(0, -1).filter((v) => v > 0);
    if (prior.length < 5 || !(entry.med14 > 0)) return 0;
    prior.sort((a, b) => a - b);
    return Math.round((prior[Math.floor((prior.length - 1) * 0.25)] / 100) * entry.med14);
  }

  function isDeal(entry) {
    if (!isListed(entry)) return false;
    const ref = typicalLow(entry);
    return ref >= DEAL_MIN_MEDIAN && entry.minBuyout <= ref * DEAL_RATIO;
  }

  /** 0.42 = listed 42% under its usual low price. */
  function discount(entry) {
    const ref = typicalLow(entry);
    if (!ref || !(entry.minBuyout > 0)) return 0;
    return 1 - entry.minBuyout / ref;
  }

  /** Recent direction of the daily history: +0.2 = the last few days ran 20% above earlier days. */
  function trend(entry) {
    const pts = (entry?.h || []).filter((v) => v > 0);
    if (pts.length < 4) return 0;
    const half = Math.floor(pts.length / 2);
    const avg = (a) => a.reduce((s, v) => s + v, 0) / a.length;
    const early = avg(pts.slice(0, half));
    return early > 0 ? avg(pts.slice(-3)) / early - 1 : 0;
  }

  /**
   * Should a seller list now or wait? { key: 'sell'|'hold'|'normal', label, why }.
   * Compares the current lowest buyout to the 14-day median, and notes the recent trend.
   */
  function sellHint(entry) {
    if (!entry || !(entry.med14 > 0)) return null;
    if (!isListed(entry)) {
      return { key: 'sell', label: 'Sell now', why: 'Nobody is selling it right now, so you set the price' };
    }
    // Compare with the usual low price when there's enough history; the median otherwise.
    const low = typicalLow(entry);
    const ref = low || entry.med14;
    const refTxt = low ? 'its usual price' : 'its 14-day median';
    const ratio = entry.minBuyout / ref;
    const t = trend(entry);
    const trendTxt = Math.abs(t) >= 0.1 ? `, and prices have been ${t > 0 ? 'rising' : 'falling'} lately` : '';
    if (ratio >= 1 + HINT_BAND) {
      return { key: 'sell', label: 'Sell now', why: `Price is ${Math.round((ratio - 1) * 100)}% above ${refTxt}${trendTxt}` };
    }
    if (ratio <= 1 - HINT_BAND) {
      return { key: 'hold', label: 'Hold', why: `Price is ${Math.round((1 - ratio) * 100)}% below ${refTxt}${trendTxt}` };
    }
    return { key: 'normal', label: 'Normal', why: `Price is close to ${refTxt}${trendTxt}` };
  }

  const HINT_COLORS = { sell: '#4ade80', hold: '#fbbf24', normal: '#94a3b8' };

  function sellHintChip(entry) {
    const hint = sellHint(entry);
    if (!hint) return '';
    const c = HINT_COLORS[hint.key];
    return `<span title="${esc(hint.why)}" style="display:inline-block;padding:0.02rem 0.36rem;border-radius:999px;border:1px solid ${c}55;background:${c}1f;color:${c};font-size:0.66rem;font-weight:700;white-space:nowrap;">${esc(hint.label)}</span>`;
  }

  /**
   * Inline SVG sparkline of the daily history (h values are % of the median; 0 = no data).
   * A dashed line marks the median. Uses currentColor so it follows the surrounding text color.
   */
  function sparklineSvg(entry, w = 140, hgt = 30) {
    const h = entry?.h;
    if (!Array.isArray(h) || h.filter((v) => v > 0).length < 3) return '';
    const vals = h.filter((v) => v > 0);
    const lo = Math.min(100, ...vals);
    const hi = Math.max(100, ...vals);
    const span = hi - lo || 1;
    const pad = 3;
    const x = (i) => pad + (i * (w - pad * 2)) / Math.max(1, h.length - 1);
    const y = (v) => pad + (hgt - pad * 2) * (1 - (v - lo) / span);
    let d = '';
    let pen = false;
    const dots = [];
    h.forEach((v, i) => {
      if (v > 0) {
        d += `${pen ? 'L' : 'M'}${x(i).toFixed(1)},${y(v).toFixed(1)}`;
        pen = true;
        dots.push(`<circle cx="${x(i).toFixed(1)}" cy="${y(v).toFixed(1)}" r="1.6"/>`);
      }
    });
    const medY = y(100).toFixed(1);
    return `<svg width="${w}" height="${hgt}" viewBox="0 0 ${w} ${hgt}" role="img" aria-label="Daily lowest price, last ${h.length} days" style="display:block;color:inherit;">
      <line x1="0" x2="${w}" y1="${medY}" y2="${medY}" stroke="currentColor" stroke-opacity="0.35" stroke-dasharray="3 3"/>
      <path d="${d}" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>
      <g fill="currentColor">${dots.join('')}</g>
    </svg>`;
  }

  // ---- Per-viewer storage (best effort: private windows may block it) ----
  function readJson(key, fallback) {
    try {
      const v = JSON.parse(localStorage.getItem(key) || 'null');
      return v == null ? fallback : v;
    } catch (_) {
      return fallback;
    }
  }
  function writeJson(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch (_) { /* not persisted */ }
    window.dispatchEvent(new CustomEvent('wowf-market-change', { detail: { key } }));
  }

  /** Watchlist: { id: targetCopper }. A "hit" is a listed item at or under its target. */
  const watchlist = {
    all() { return readJson(WATCH_KEY, {}); },
    has(id) { return Object.prototype.hasOwnProperty.call(this.all(), id); },
    target(id) { return this.all()[id] || 0; },
    add(id, target) {
      const all = this.all();
      const e = price(id);
      all[id] = Math.max(1, Math.round(target || (e ? safeSellPrice(e) * 0.85 : 0)));
      writeJson(WATCH_KEY, all);
    },
    setTarget(id, target) {
      const all = this.all();
      if (!(id in all)) return;
      all[id] = Math.max(1, Math.round(target) || 1);
      writeJson(WATCH_KEY, all);
    },
    remove(id) {
      const all = this.all();
      delete all[id];
      writeJson(WATCH_KEY, all);
    },
    toggle(id) { if (this.has(id)) this.remove(id); else this.add(id); return this.has(id); },
    ids() { return Object.keys(this.all()).map(Number); },
    isHit(id) {
      const e = price(id);
      const t = this.target(id);
      return !!t && isListed(e) && e.minBuyout <= t;
    },
    hits() { return this.ids().filter((id) => this.isHit(id)); }
  };

  /** Shopping list: [{ id, name, qty, maxEach }], exported as FMSL1:id,qty,maxEach;... */
  const shopping = {
    all() {
      const list = readJson(SHOP_KEY, []);
      return Array.isArray(list) ? list : [];
    },
    add(id, qty = 1, maxEach = 0, name = '') {
      const list = this.all();
      const e = price(id);
      const cur = list.find((x) => x.id === Number(id));
      const max = Math.round(maxEach || (e ? Math.max(e.minBuyout, e.med14 || 0) : 0));
      if (cur) {
        cur.qty += Math.max(1, Math.round(qty));
        cur.maxEach = Math.max(cur.maxEach || 0, max);
      } else {
        list.push({ id: Number(id), name: name || e?.name || `Item ${id}`, qty: Math.max(1, Math.round(qty)), maxEach: max });
      }
      writeJson(SHOP_KEY, list);
    },
    update(id, patch) {
      const list = this.all();
      const cur = list.find((x) => x.id === Number(id));
      if (!cur) return;
      Object.assign(cur, patch);
      cur.qty = Math.max(1, Math.round(cur.qty) || 1);
      cur.maxEach = Math.max(0, Math.round(cur.maxEach) || 0);
      writeJson(SHOP_KEY, list);
    },
    remove(id) { writeJson(SHOP_KEY, this.all().filter((x) => x.id !== Number(id))); },
    clear() { writeJson(SHOP_KEY, []); },
    count() { return this.all().length; },
    /** Estimated cost at current lowest buyouts (falls back to max price when not listed). */
    total() {
      return this.all().reduce((s, x) => {
        const e = price(x.id);
        return s + x.qty * (isListed(e) ? e.minBuyout : x.maxEach || 0);
      }, 0);
    },
    exportString() {
      return SHOP_PREFIX + this.all().map((x) => `${x.id},${x.qty},${x.maxEach || 0}`).join(';');
    }
  };

  window.WOW_MARKET_TOOLS = {
    STALE_DAYS,
    SHOP_PREFIX,
    market,
    prices,
    price,
    formatCopper,
    esc,
    scanAge,
    isListed,
    safeSellPrice,
    typicalLow,
    isDeal,
    discount,
    trend,
    sellHint,
    sellHintChip,
    sparklineSvg,
    watchlist,
    shopping
  };
})();
