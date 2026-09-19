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

      alert('Intel logged and saved to your personal local records!');
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
          <span class="source-badge source-${item.sourceType}">${item.source}</span>
          <span class="news-date">${item.date}</span>
        </div>
        <h3 class="news-title">${escapeHtml(item.title)}</h3>
        <p class="news-summary">${escapeHtml(item.summary)}</p>
      </div>
      <div class="news-card-bottom">
        <span class="news-author">By ${escapeHtml(item.author)}</span>
        <button class="news-read-btn" onclick="openNewsModal('${item.id}')">
          Read Full Intel <span>→</span>
        </button>
      </div>
    </article>
  `).join('');
}

window.openNewsModal = function(id) {
  const article = allNewsItems.find(a => a.id === id);
  if (!article) return;

  const modalBackdrop = document.getElementById('news-modal-backdrop');
  const modalSource = document.getElementById('modal-source');
  const modalDate = document.getElementById('modal-date');
  const modalTitle = document.getElementById('modal-title');
  const modalAuthor = document.getElementById('modal-author');
  const modalBody = document.getElementById('modal-body');

  if (modalBackdrop) {
    if (modalSource) {
      modalSource.textContent = article.source;
      modalSource.className = `source-badge source-${article.sourceType}`;
    }
    if (modalDate) modalDate.textContent = article.date;
    if (modalTitle) modalTitle.textContent = article.title;
    if (modalAuthor) modalAuthor.textContent = `Author: ${article.author}`;
    
    let bodyContent = escapeHtml(article.content);
    if (article.url && article.url !== '#') {
      bodyContent += `\n\n🔗 Official Link: <a href="${article.url}" target="_blank" rel="noopener" style="color: var(--color-sky); text-decoration: underline;">${article.url}</a>`;
    }
    if (modalBody) modalBody.innerHTML = bodyContent.replace(/\n/g, '<br>');

    modalBackdrop.classList.add('open');
  }
};

