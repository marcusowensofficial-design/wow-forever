/**
 * World of Warcraft: Forever - News & Dispatches Module
 * Handles News Grid, Category Filtering, Live Search, and Article Details Modal.
 */

/* ==========================================================================
   4. NEWS & DISPATCH HUB
   ========================================================================== */
let allNewsItems = [];

function initNewsHub() {
  const customNews = JSON.parse(localStorage.getItem('wow_forever_custom_news') || '[]');
  allNewsItems = [...customNews, ...WOW_FOREVER_DATA.newsFeed];

  renderNewsGrid(allNewsItems);
  renderHubRecentUpdates(WOW_FOREVER_DATA.newsFeed);

  const filterChips = document.querySelectorAll('.filter-chip[data-source]');
  filterChips.forEach(chip => {
    chip.addEventListener('click', () => {
      filterChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      applyNewsFilters();
    });
  });

  const searchInput = document.getElementById('news-search-input');
  if (searchInput) {
    searchInput.addEventListener('input', () => {
      applyNewsFilters();
    });
  }

  const customForm = document.getElementById('add-custom-intel-form');
  if (customForm) {
    customForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const title = document.getElementById('custom-title').value.trim();
      const author = document.getElementById('custom-author').value.trim() || 'Community Intel';
      const category = document.getElementById('custom-category').value;
      const summary = document.getElementById('custom-summary').value.trim();
      const content = document.getElementById('custom-content').value.trim();

      if (!title || !summary) return;

      const newArticle = {
        id: 'custom-' + Date.now(),
        title,
        source: 'Personal Log',
        sourceType: 'custom',
        author,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        tag: category,
        summary,
        content: content || summary,
        url: '#'
      };

      const stored = JSON.parse(localStorage.getItem('wow_forever_custom_news') || '[]');
      stored.unshift(newArticle);
      localStorage.setItem('wow_forever_custom_news', JSON.stringify(stored));

      allNewsItems.unshift(newArticle);
      applyNewsFilters();
      customForm.reset();

      if (window.showToast) {
        window.showToast('Intel logged and saved to your personal records!', 'success');
      } else {
        alert('Intel logged and saved to your personal local records!');
      }
    });
  }

  const modalClose = document.getElementById('news-modal-close');
  const modalBackdrop = document.getElementById('news-modal-backdrop');
  if (modalClose && modalBackdrop) {
    modalClose.addEventListener('click', () => {
      modalBackdrop.classList.remove('open');
    });
    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) modalBackdrop.classList.remove('open');
    });
  }
}

/**
 * Fills the homepage "Recent Updates" card from the three newest news entries,
 * so the landing page always mirrors the news feed instead of hardcoded HTML.
 */
function renderHubRecentUpdates(feed) {
  const list = document.querySelector('.hub-update-list');
  if (!list || !Array.isArray(feed) || feed.length === 0) return;
  const TAG_STYLES = { blizzard: 'tag-blue', wowhead: 'tag-purple', tavern: 'tag-purple' };
  const newest = [...feed]
    .map((item, i) => ({ item, i, t: Date.parse(String(item.date).replace(/\s*\(.*\)$/, '')) || 0 }))
    .sort((a, b) => (b.t - a.t) || (a.i - b.i))
    .slice(0, 3)
    .map(x => x.item);
  list.innerHTML = newest.map(item => {
    const shortDate = String(item.date).replace(/\s*\(.*\)$/, '').replace(/,\s*\d{4}$/, '').replace(/^(\w{3})\w*/, '$1');
    // "WoW: Forever Hotfixes — November 11, 2026: Judgement…" → "Judgement…" (the date column already shows the day)
    const title = String(item.title).replace(/^.*?—\s*[A-Z][a-z]+ \d{1,2}, \d{4}:\s*/, '');
    return `
                <a class="hub-update-item" data-target-tab="news">
                  <span class="hub-update-tag ${TAG_STYLES[item.sourceType] || 'tag-blue'}">${escapeHtml(item.tag || 'News')}</span>
                  <span class="hub-update-title" title="${escapeHtml(item.title)}">${escapeHtml(title)}</span>
                  <span class="hub-update-date">${escapeHtml(shortDate)}</span>
                </a>`;
  }).join('');
}

function applyNewsFilters() {
  const activeChip = document.querySelector('.filter-chip[data-source].active');
  const selectedSource = activeChip ? activeChip.getAttribute('data-source') : 'all';
  const query = (document.getElementById('news-search-input')?.value || '').toLowerCase();

  const filtered = allNewsItems.filter(item => {
    const matchesSource = (selectedSource === 'all') || (item.sourceType === selectedSource);
    const matchesSearch = !query || 
      item.title.toLowerCase().includes(query) || 
      item.summary.toLowerCase().includes(query) || 
      item.content.toLowerCase().includes(query) ||
      item.tag.toLowerCase().includes(query);

    return matchesSource && matchesSearch;
  });

  renderNewsGrid(filtered);
}

function renderNewsGrid(items) {
  const container = document.getElementById('news-cards-container');
  if (!container) return;

  if (items.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 3rem; color: var(--text-muted);">
        <p style="font-size: 1.2rem;">No dispatches found matching your filter criteria.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = items.map(item => `
    <article class="news-card">
      <div>
        <div class="news-card-top">
          <span class="source-badge source-${escapeHtml(item.sourceType)}">${escapeHtml(item.source)}</span>
          <span class="news-date">${escapeHtml(item.date)}</span>
        </div>
        <h3 class="news-title">${escapeHtml(item.title)}</h3>
        <p class="news-summary">${escapeHtml(item.summary)}</p>
      </div>
      <div class="news-card-bottom">
        <span class="news-author">By ${escapeHtml(item.author)}</span>
        <button type="button" class="news-read-btn" data-news-id="${escapeHtml(item.id)}">
          Read Full Intel <span>→</span>
        </button>
      </div>
    </article>
  `).join('');

  // Event delegation for news modal buttons
  container.querySelectorAll('.news-read-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const newsId = btn.getAttribute('data-news-id');
      if (newsId) window.openNewsModal(newsId);
    });
  });
}

/* --------------------------------------------------------------------------
   Article body renderer
   News content is light markdown: "• " top bullets (often "• **Area:**" with
   indented "  - " sub-items), "- " / "1. " lists, "**Heading:**" lines and
   plain paragraphs. This turns it into sections and lists instead of a
   wall of <br>-separated text.
   -------------------------------------------------------------------------- */
const NEWS_CLASS_NAMES = ['death knight', 'demon hunter', 'warrior', 'paladin', 'hunter', 'rogue', 'priest', 'shaman', 'mage', 'warlock', 'monk', 'druid', 'evoker'];

function newsInline(text) {
  const escaped = escapeHtml(text);
  return window.formatInlineEmphasis ? window.formatInlineEmphasis(escaped) : escaped;
}

/** "**Druid (Balance):** text" → label "Druid (Balance)", rest "text". */
function splitNewsLabel(text) {
  const m = String(text).match(/^\*\*(.+?):?\*\*:?\s*(.*)$/);
  return m ? { label: m[1].replace(/:$/, ''), rest: m[2] } : { label: null, rest: text };
}

function renderNewsLabel(label) {
  const lower = label.toLowerCase();
  const cls = NEWS_CLASS_NAMES.find(c => lower.startsWith(c));
  const classAttr = cls ? ` class="na-class" style="--na-class-color: var(--class-${cls.replace(' ', '')})"` : '';
  return `<strong${classAttr}>${newsInline(label)}:</strong>`;
}

/** Parses content lines into blocks: paragraphs, headings and nested list items. */
function parseNewsBlocks(content) {
  const blocks = [];
  let para = null;
  const stack = []; // open list items by indent level
  const closePara = () => { para = null; };

  String(content).replace(/\r\n/g, '\n').split('\n').forEach(raw => {
    if (!raw.trim()) { closePara(); return; }
    const bullet = raw.match(/^(\s*)(•|-|\d+\.)\s+(.*)$/);
    if (bullet) {
      closePara();
      const indent = bullet[1].length;
      const item = { text: bullet[3], ordered: /\d/.test(bullet[2]), children: [], indent };
      while (stack.length && stack[stack.length - 1].indent >= indent) stack.pop();
      if (stack.length) {
        stack[stack.length - 1].children.push(item);
      } else {
        const last = blocks[blocks.length - 1];
        if (last && last.type === 'list' && last.ordered === item.ordered) last.items.push(item);
        else blocks.push({ type: 'list', ordered: item.ordered, items: [item] });
      }
      stack.push(item);
      return;
    }
    stack.length = 0;
    const heading = raw.trim().match(/^\*\*([^*]+?):?\*\*:?$/);
    if (heading) { closePara(); blocks.push({ type: 'heading', text: heading[1] }); return; }
    if (para) para.lines.push(raw.trim());
    else { para = { type: 'para', lines: [raw.trim()] }; blocks.push(para); }
  });
  return blocks;
}

function renderNewsItems(items, ordered) {
  const tag = ordered ? 'ol' : 'ul';
  return `<${tag} class="na-list">${items.map(item => {
    const { label, rest } = splitNewsLabel(item.text);
    const head = label ? `${renderNewsLabel(label)}${rest ? ' ' + newsInline(rest) : ''}` : newsInline(item.text);
    const kids = item.children.length ? renderNewsItems(item.children, item.children[0].ordered) : '';
    return `<li>${head}${kids}</li>`;
  }).join('')}</${tag}>`;
}

function renderNewsBody(content) {
  let firstPara = true;
  return parseNewsBlocks(content).map(block => {
    if (block.type === 'heading') return `<h3 class="na-section-title">${newsInline(block.text)}</h3>`;
    if (block.type === 'para') {
      const cls = firstPara ? 'na-lead' : 'na-para';
      firstPara = false;
      return `<p class="${cls}">${block.lines.map(newsInline).join('<br>')}</p>`;
    }
    // Top-level "• **Area:** ..." bullets read best as titled sections.
    let html = '';
    let loose = [];
    const flushLoose = () => {
      if (loose.length) html += renderNewsItems(loose, block.ordered);
      loose = [];
    };
    block.items.forEach(item => {
      const { label, rest } = splitNewsLabel(item.text);
      if (label && !block.ordered) {
        flushLoose();
        html += `<section class="na-section"><h3 class="na-section-title">${newsInline(label)}</h3>`;
        if (rest) html += `<p class="na-para">${newsInline(rest)}</p>`;
        if (item.children.length) html += renderNewsItems(item.children, item.children[0].ordered);
        html += '</section>';
      } else {
        loose.push(item);
      }
    });
    flushLoose();
    return html;
  }).join('');
}

function newsTagTone(article) {
  const tag = String(article.tag || '').toLowerCase();
  if (tag.includes('unconfirmed')) return 'tone-unconfirmed';
  if (tag.includes('official') || article.sourceType === 'blizzard') return 'tone-official';
  return 'tone-default';
}

window.openNewsModal = function(id) {
  const article = allNewsItems.find(a => a.id === id);
  if (!article) return;

  const modalBackdrop = document.getElementById('news-modal-backdrop');
  if (!modalBackdrop) return;
  const modalTag = document.getElementById('modal-tag');
  const modalSource = document.getElementById('modal-source');
  const modalDate = document.getElementById('modal-date');
  const modalTitle = document.getElementById('modal-title');
  const modalAuthor = document.getElementById('modal-author');
  const modalBody = document.getElementById('modal-body');
  const modalFooter = document.getElementById('modal-footer');

  if (modalTag) {
    modalTag.textContent = article.tag || 'News';
    modalTag.className = `news-article-tag ${newsTagTone(article)}`;
  }
  if (modalSource) {
    modalSource.textContent = article.source;
    modalSource.className = `source-badge source-${article.sourceType}`;
  }
  if (modalDate) modalDate.textContent = article.date;
  if (modalTitle) modalTitle.textContent = article.title;
  if (modalAuthor) {
    modalAuthor.textContent = article.author && article.author !== article.source ? `by ${article.author}` : '';
  }
  if (modalBody) {
    modalBody.innerHTML = renderNewsBody(article.content || article.summary || '');
    modalBody.scrollTop = 0;
  }

  if (modalFooter) {
    const url = String(article.url || '');
    if (/^https?:\/\//.test(url)) {
      let host = url;
      try { host = new URL(url).hostname.replace(/^www\./, ''); } catch (e) { /* keep raw url */ }
      const label = article.sourceType === 'blizzard' ? 'Read the official notes' : 'View the original source';
      modalFooter.innerHTML = `
        <span class="news-article-host">${escapeHtml(host)}</span>
        <a class="news-article-link" href="${escapeHtml(encodeURI(url))}" target="_blank" rel="noopener noreferrer">${label} <span aria-hidden="true">↗</span></a>`;
      modalFooter.hidden = false;
    } else {
      modalFooter.innerHTML = '';
      modalFooter.hidden = true;
    }
  }

  modalBackdrop.classList.add('open');
};

