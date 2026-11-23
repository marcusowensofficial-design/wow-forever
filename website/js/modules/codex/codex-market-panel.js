/**
 * World of Warcraft: Forever - Watchlist & Shopping List Panel
 * A modal over the page with two tabs:
 *   - Watchlist: starred items, the price to alert at, and which ones are at/under target now.
 *   - Shopping list: items + quantities + max price each, total cost, and an export string the
 *     ForeverMarket addon imports in game (/fm list, then paste).
 * State lives in window.WOW_MARKET_TOOLS (per-viewer browser storage).
 */
(function () {
  'use strict';

  let activeTab = 'watch';

  function T() { return window.WOW_MARKET_TOOLS; }

  /** Money as typed in game: "1g 50s", "75s", "99c", "1g50s20c". A bare number means gold. */
  function parseMoney(text) {
    const s = String(text || '').toLowerCase().replace(/\s+/g, '');
    if (!s) return 0;
    if (/^\d+(\.\d+)?$/.test(s)) return Math.round(parseFloat(s) * 10000);
    let total = 0;
    let matched = false;
    s.replace(/(\d+(?:\.\d+)?)([gsc])/g, (_, num, unit) => {
      matched = true;
      total += parseFloat(num) * (unit === 'g' ? 10000 : unit === 's' ? 100 : 1);
      return '';
    });
    return matched ? Math.round(total) : NaN;
  }

  function moneyInput(copper) {
    return copper > 0 ? T().formatCopper(copper) : '';
  }

  function itemLink(id, name) {
    const esc = T().esc;
    return `<a href="https://www.wowhead.com/forever/item=${id}" target="_blank" rel="noopener noreferrer" style="color:#f8fafc;font-weight:600;text-decoration:none;">${esc(name)}</a>`;
  }

  const cell = 'padding:0.45rem 0.5rem;border-bottom:1px solid rgba(255,255,255,0.06);';
  const input = 'width:84px;background:#0f172a;color:#f8fafc;border:1px solid #334155;border-radius:5px;padding:0.25rem 0.35rem;font-size:0.8rem;text-align:right;';
  const xBtn = 'background:none;border:none;color:#f87171;cursor:pointer;font-size:0.95rem;padding:0 0.2rem;';

  function watchHtml() {
    const t = T();
    const ids = t.watchlist.ids();
    if (ids.length === 0) {
      return '<p style="color:#94a3b8;padding:1.2rem 0.4rem;">Nothing starred yet. Click ☆ next to any item in the Item Database to watch it. Items at or under your alert price light up here and on the ⭐ Watchlist button.</p>';
    }
    const rows = ids.map((id) => {
      const e = t.price(id);
      const name = e?.name || `Item ${id}`;
      const hit = t.watchlist.isHit(id);
      const now = t.isListed(e) ? t.formatCopper(e.minBuyout) : '<span style="color:#64748b;">not listed</span>';
      return `<tr>
        <td style="${cell}">${hit ? '<span title="At or under your alert price" style="color:#4ade80;">●</span> ' : ''}${itemLink(id, name)}</td>
        <td style="${cell}text-align:right;color:#facc15;white-space:nowrap;">${now}</td>
        <td style="${cell}text-align:right;color:#94a3b8;white-space:nowrap;">${e?.med14 ? t.formatCopper(e.med14) : '—'}</td>
        <td style="${cell}text-align:right;"><input type="text" inputmode="text" placeholder="1g 50s" aria-label="Alert price for ${t.esc(name)}" data-watch-target="${id}" value="${moneyInput(t.watchlist.target(id))}" style="${input}"></td>
        <td style="${cell}text-align:center;"><button type="button" data-watch-remove="${id}" aria-label="Stop watching ${t.esc(name)}" style="${xBtn}">✕</button></td>
      </tr>`;
    }).join('');
    return `<table style="width:100%;border-collapse:collapse;font-size:0.82rem;">
      <thead><tr style="color:var(--text-gold,#f5d061);font-size:0.72rem;text-transform:uppercase;letter-spacing:0.05em;text-align:left;">
        <th style="padding:0.4rem 0.5rem;">Item</th><th style="padding:0.4rem 0.5rem;text-align:right;">Now</th>
        <th style="padding:0.4rem 0.5rem;text-align:right;">14d median</th><th style="padding:0.4rem 0.5rem;text-align:right;">Alert at</th><th></th>
      </tr></thead><tbody>${rows}</tbody></table>
      <p style="color:#64748b;font-size:0.74rem;margin-top:0.6rem;">Alerts are checked against each new AH scan the site gets. Your watchlist is saved in this browser only.</p>`;
  }

  function shopHtml() {
    const t = T();
    const list = t.shopping.all();
    if (list.length === 0) {
      return '<p style="color:#94a3b8;padding:1.2rem 0.4rem;">Your shopping list is empty. Use "🛒 Add reagents" in the Craft Profit Finder, or "+ list" on deals, to add items.</p>';
    }
    const rows = list.map((x) => {
      const e = t.price(x.id);
      const now = t.isListed(e) ? t.formatCopper(e.minBuyout) : '<span style="color:#64748b;">not listed</span>';
      const over = t.isListed(e) && x.maxEach > 0 && e.minBuyout > x.maxEach;
      return `<tr>
        <td style="${cell}">${itemLink(x.id, x.name)}</td>
        <td style="${cell}text-align:right;"><input type="number" min="1" step="1" aria-label="Quantity of ${t.esc(x.name)}" data-shop-qty="${x.id}" value="${x.qty}" style="${input}width:64px;"></td>
        <td style="${cell}text-align:right;"><input type="text" placeholder="1g 50s" aria-label="Max price each for ${t.esc(x.name)}" data-shop-max="${x.id}" value="${moneyInput(x.maxEach)}" style="${input}"></td>
        <td style="${cell}text-align:right;white-space:nowrap;color:${over ? '#f87171' : '#facc15'};" title="${over ? 'Currently above your max price' : ''}">${now}</td>
        <td style="${cell}text-align:center;"><button type="button" data-shop-remove="${x.id}" aria-label="Remove ${t.esc(x.name)}" style="${xBtn}">✕</button></td>
      </tr>`;
    }).join('');
    return `<table style="width:100%;border-collapse:collapse;font-size:0.82rem;">
      <thead><tr style="color:var(--text-gold,#f5d061);font-size:0.72rem;text-transform:uppercase;letter-spacing:0.05em;text-align:left;">
        <th style="padding:0.4rem 0.5rem;">Item</th><th style="padding:0.4rem 0.5rem;text-align:right;">Qty</th>
        <th style="padding:0.4rem 0.5rem;text-align:right;">Max each</th><th style="padding:0.4rem 0.5rem;text-align:right;">Now</th><th></th>
      </tr></thead><tbody>${rows}</tbody></table>
      <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:0.5rem;margin-top:0.7rem;">
        <strong style="color:#facc15;">Estimated cost: ${t.formatCopper(t.shopping.total(), { zero: true })}</strong>
        <button type="button" id="mkt-shop-clear" style="background:rgba(239,68,68,0.15);color:#fca5a5;border:1px solid rgba(239,68,68,0.35);border-radius:6px;padding:0.3rem 0.65rem;font-size:0.76rem;cursor:pointer;">Clear list</button>
      </div>
      <div style="margin-top:0.9rem;padding:0.75rem;border-radius:8px;background:rgba(56,189,248,0.08);border:1px solid rgba(56,189,248,0.25);">
        <div style="color:#7dd3fc;font-weight:700;font-size:0.82rem;margin-bottom:0.35rem;">Take it in game</div>
        <div style="color:#cbd5e1;font-size:0.76rem;margin-bottom:0.45rem;">Copy this, type <code>/fm list</code> in WoW (ForeverMarket 1.4+), paste it into the box and press Import.</div>
        <div style="display:flex;gap:0.4rem;">
          <input type="text" readonly id="mkt-shop-export" aria-label="Shopping list import string" value="${t.esc(t.shopping.exportString())}" style="flex:1;min-width:0;background:#0f172a;color:#e2e8f0;border:1px solid #334155;border-radius:5px;padding:0.35rem 0.45rem;font-family:monospace;font-size:0.74rem;">
          <button type="button" id="mkt-shop-copy" class="btn-primary" style="padding:0.35rem 0.8rem;font-size:0.78rem;border-radius:6px;cursor:pointer;">Copy</button>
        </div>
      </div>`;
  }

  function render(root) {
    const t = T();
    const hits = t.watchlist.hits().length;
    const tabBtn = (key, label) => `<button type="button" data-mkt-tab="${key}" style="flex:1;padding:0.5rem;border:none;border-bottom:2px solid ${activeTab === key ? '#facc15' : 'transparent'};background:none;color:${activeTab === key ? '#facc15' : '#94a3b8'};font-weight:700;font-size:0.85rem;cursor:pointer;">${label}</button>`;
    root.querySelector('.mkt-panel-body').innerHTML = `
      <div style="display:flex;border-bottom:1px solid #334155;margin-bottom:0.6rem;">
        ${tabBtn('watch', `⭐ Watchlist (${t.watchlist.ids().length}${hits ? ` · ${hits} at target` : ''})`)}
        ${tabBtn('shop', `🛒 Shopping list (${t.shopping.count()})`)}
      </div>
      <div style="overflow-x:auto;">${activeTab === 'watch' ? watchHtml() : shopHtml()}</div>`;
  }

  function close() {
    document.getElementById('mkt-panel')?.remove();
    window.removeEventListener('wowf-market-change', onChange);
    document.removeEventListener('keydown', onKey);
  }
  function onKey(e) { if (e.key === 'Escape') close(); }
  function onChange() {
    const root = document.getElementById('mkt-panel');
    // Don't redraw while someone is typing a price: it would steal the cursor.
    if (root && document.activeElement?.tagName !== 'INPUT') render(root);
  }

  window.openMarketPanel = function (tab) {
    if (!T()) return;
    if (tab) activeTab = tab;
    close();
    const root = document.createElement('div');
    root.id = 'mkt-panel';
    root.setAttribute('role', 'dialog');
    root.setAttribute('aria-modal', 'true');
    root.setAttribute('aria-label', 'Watchlist and shopping list');
    root.style.cssText = 'position:fixed;inset:0;z-index:100000;background:rgba(2,6,23,0.72);display:flex;align-items:flex-start;justify-content:center;padding:4vh 16px;overflow-y:auto;';
    root.innerHTML = `
      <div style="width:100%;max-width:720px;background:#0b1220;border:1px solid rgba(245,158,11,0.35);border-radius:12px;box-shadow:0 20px 50px rgba(0,0,0,0.5);padding:1rem 1.1rem;">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.4rem;">
          <h3 style="margin:0;color:#f8fafc;font-size:1.05rem;">Your market lists</h3>
          <button type="button" id="mkt-panel-close" aria-label="Close" style="background:none;border:none;color:#94a3b8;font-size:1.3rem;cursor:pointer;">✕</button>
        </div>
        <div class="mkt-panel-body"></div>
      </div>`;
    document.body.appendChild(root);

    root.addEventListener('click', (e) => {
      const t = T();
      if (e.target === root || e.target.closest('#mkt-panel-close')) { close(); return; }
      const tabBtn = e.target.closest('[data-mkt-tab]');
      if (tabBtn) { activeTab = tabBtn.dataset.mktTab; render(root); return; }
      const wr = e.target.closest('[data-watch-remove]');
      if (wr) { t.watchlist.remove(Number(wr.dataset.watchRemove)); render(root); return; }
      const sr = e.target.closest('[data-shop-remove]');
      if (sr) { t.shopping.remove(Number(sr.dataset.shopRemove)); render(root); return; }
      if (e.target.closest('#mkt-shop-clear')) { t.shopping.clear(); render(root); return; }
      if (e.target.closest('#mkt-shop-copy')) {
        const box = root.querySelector('#mkt-shop-export');
        const btn = e.target.closest('#mkt-shop-copy');
        const done = () => { btn.textContent = 'Copied ✓'; setTimeout(() => { btn.textContent = 'Copy'; }, 1500); };
        if (navigator.clipboard?.writeText) navigator.clipboard.writeText(box.value).then(done, () => { box.select(); });
        else { box.select(); try { document.execCommand('copy'); done(); } catch (_) { /* user can copy manually */ } }
      }
    });
    root.addEventListener('change', (e) => {
      const t = T();
      const el = e.target;
      const money = parseMoney(el.value);
      if ((el.dataset.watchTarget || el.dataset.shopMax) && Number.isNaN(money)) {
        el.style.borderColor = '#f87171';
        el.title = 'Use a price like 1g 50s, 75s or 99c';
        return;
      }
      if (el.dataset.watchTarget) t.watchlist.setTarget(Number(el.dataset.watchTarget), money);
      else if (el.dataset.shopQty) t.shopping.update(Number(el.dataset.shopQty), { qty: Number(el.value) });
      else if (el.dataset.shopMax) t.shopping.update(Number(el.dataset.shopMax), { maxEach: money });
      el.blur();
      render(root);
    });
    window.addEventListener('wowf-market-change', onChange);
    document.addEventListener('keydown', onKey);
    render(root);
    root.querySelector('#mkt-panel-close')?.focus();
  };
})();
