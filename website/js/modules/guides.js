/**
 * World of Warcraft: Forever - Curated Classic+ Guides Module
 * Renders community guides cards and interactive guide modal.
 */

function initGuidesHub() {
  renderGuidesCards();
  setupGuideModalEvents();
}

function renderGuidesCards() {
  const container = document.getElementById('curated-guides-grid');
  if (!container) return;

  const guides = window.WOW_TOOLS_DATA?.guides || [];

  container.innerHTML = guides.map(g => `
    <div class="guide-feature-card" onclick="openGuideModal('${g.id}')">
      <div class="guide-card-top">
        <img src="${g.icon}" alt="" class="guide-card-icon" />
        <div>
          <span class="guide-category-badge">${g.category}</span>
          <h4 class="guide-card-title">${escapeHtml(g.title)}</h4>
        </div>
      </div>
      <p class="guide-card-summary">${escapeHtml(g.summary)}</p>
      <div class="guide-card-foot">
        <span class="guide-read-btn">Read Full Guide ➔</span>
      </div>
    </div>
  `).join('');
}

function setupGuideModalEvents() {
  const modal = document.getElementById('guide-detail-modal') || document.getElementById('guides-hub-modal');
  const closeBtn = document.getElementById('guide-modal-close') || document.getElementById('guides-hub-close');
  const headerBtn = document.getElementById('btn-open-guides');

  if (headerBtn) {
    headerBtn.addEventListener('click', () => {
      window.openGuideModal();
    });
  }

  if (!modal) return;

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      modal.classList.remove('is-open');
      modal.setAttribute('hidden', '');
    });
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('is-open');
      modal.setAttribute('hidden', '');
    }
  });
}

function formatInlineGuide(str) {
  if (!str) return '';
  let escaped = escapeHtml(str);
  escaped = escaped.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  escaped = escaped.replace(/`([^`]+)`/g, '<code class="guide-inline-code">$1</code>');
  return escaped;
}

function formatGuideMarkdown(content) {
  if (!content) return '';
  const lines = content.split('\n');
  let html = '';
  let inList = false;
  let inTable = false;

  for (let i = 0; i < lines.length; i++) {
    const rawLine = lines[i];
    const trimmed = rawLine.trim();

    // End list if line is not a list item
    if (inList && !trimmed.startsWith('•') && !trimmed.startsWith('-') && !trimmed.startsWith('*')) {
      html += '</ul>';
      inList = false;
    }

    // Markdown table handling
    if (trimmed.startsWith('|') && trimmed.endsWith('|')) {
      const cells = trimmed.split('|').slice(1, -1).map(c => c.trim());
      if (cells.every(c => /^:?-+:?$/.test(c))) {
        continue;
      }
      if (!inTable) {
        inTable = true;
        html += '<div class="guide-table-wrap"><table class="guide-data-table"><thead><tr>';
        cells.forEach(c => { html += `<th>${formatInlineGuide(c)}</th>`; });
        html += '</tr></thead><tbody>';
        continue;
      } else {
        html += '<tr>';
        cells.forEach(c => { html += `<td>${formatInlineGuide(c)}</td>`; });
        html += '</tr>';
        continue;
      }
    } else if (inTable) {
      html += '</tbody></table></div>';
      inTable = false;
    }

    if (!trimmed) {
      continue;
    }

    // Subheadings
    if (trimmed.startsWith('#### ')) {
      html += `<h4 class="guide-subsec-title">${formatInlineGuide(trimmed.substring(5))}</h4>`;
      continue;
    }
    if (trimmed.startsWith('### ')) {
      html += `<h3 class="guide-sec-title">${formatInlineGuide(trimmed.substring(4))}</h3>`;
      continue;
    }
    if (trimmed.startsWith('## ')) {
      html += `<h3 class="guide-sec-title">${formatInlineGuide(trimmed.substring(3))}</h3>`;
      continue;
    }

    // Callout alert cards
    if (/^(💡|⚠️|🔒|🗺️|⚔️|📦|🎯)\s/.test(trimmed)) {
      const icon = trimmed.match(/^(💡|⚠️|🔒|🗺️|⚔️|📦|🎯)/)[0];
      const text = trimmed.substring(icon.length).trim();
      let alertClass = 'guide-callout-info';
      if (icon === '⚠️') alertClass = 'guide-callout-warning';
      if (icon === '🔒') alertClass = 'guide-callout-danger';
      if (icon === '💡') alertClass = 'guide-callout-tip';
      if (icon === '🗺️') alertClass = 'guide-callout-map';

      html += `
        <div class="guide-callout ${alertClass}">
          <span class="guide-callout-icon">${icon}</span>
          <div class="guide-callout-content">${formatInlineGuide(text)}</div>
        </div>
      `;
      continue;
    }

    // Horizontal rule dividers
    if (/^---+$/.test(trimmed)) {
      html += '<hr class="guide-divider" />';
      continue;
    }

    // Bullet points
    if (trimmed.startsWith('•') || trimmed.startsWith('-') || trimmed.startsWith('*')) {
      if (!inList) {
        html += '<ul class="guide-bullet-list">';
        inList = true;
      }
      const itemText = trimmed.replace(/^[•\-*]\s*/, '');
      html += `<li>${formatInlineGuide(itemText)}</li>`;
      continue;
    }

    // Standard paragraph
    html += `<p class="guide-paragraph">${formatInlineGuide(trimmed)}</p>`;
  }

  if (inList) html += '</ul>';
  if (inTable) html += '</tbody></table></div>';

  return html;
}

window.openGuideModal = function(targetGuideId) {
  const modal = document.getElementById('guide-detail-modal') || document.getElementById('guides-hub-modal');
  if (!modal) return;

  let bodyElem = document.getElementById('guide-modal-body') || document.getElementById('guides-hub-modal-content');
  if (!bodyElem) return;

  const guides = window.WOW_TOOLS_DATA?.guides || [];
  let currentGuideId = targetGuideId;
  if (!currentGuideId || !guides.some(g => g.id === currentGuideId)) {
    const match = guides.find(g => targetGuideId && (g.id === targetGuideId || g.id.includes(targetGuideId)));
    currentGuideId = match ? match.id : (guides[0]?.id || '');
  }

  let searchQuery = '';

  function renderModalLayout() {
    const currentGuide = guides.find(g => g.id === currentGuideId) || guides[0];
    if (!currentGuide) return;

    const filteredGuides = guides.filter(g => {
      if (!searchQuery) return true;
      const q = searchQuery.toLowerCase();
      return (g.title && g.title.toLowerCase().includes(q)) ||
             (g.category && g.category.toLowerCase().includes(q)) ||
             (g.summary && g.summary.toLowerCase().includes(q));
    });

    const formattedContent = formatGuideMarkdown(currentGuide.content);

    bodyElem.innerHTML = `
      <div class="guides-hub-container" style="display: grid; grid-template-columns: minmax(260px, 300px) 1fr; gap: 1.25rem; min-height: 540px; max-height: 82vh;">
        <!-- Left: Guides Directory Sidebar -->
        <div class="guides-hub-sidebar" style="border-right: 1px solid var(--border-subtle); padding-right: 1rem; overflow-y: auto; display: flex; flex-direction: column; gap: 0.4rem;">
          <div style="padding-bottom: 0.65rem; border-bottom: 1px solid var(--border-subtle); margin-bottom: 0.35rem;">
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <span class="countdown-label" style="color: var(--text-gold); font-size: 0.72rem; text-transform: uppercase; font-weight: 700;">Field Manuals (${guides.length})</span>
              <span style="font-size: 0.72rem; color: #94a3b8;">Phase 2 Ready</span>
            </div>
            <h3 style="color: #fff; font-size: 1.1rem; margin: 0.2rem 0 0.4rem 0; font-family: var(--font-heading);">Classic+ Guides</h3>
            <input type="text" id="guide-sidebar-search-input" class="guide-sidebar-search" placeholder="Search guides..." value="${escapeHtml(searchQuery)}" aria-label="Search Classic+ guides" />
          </div>

          <div class="guides-nav-scroll-list" style="display: flex; flex-direction: column; gap: 0.35rem; overflow-y: auto;">
            ${filteredGuides.length > 0 ? filteredGuides.map(g => `
              <button type="button" class="guide-nav-item ${g.id === currentGuideId ? 'active' : ''}" 
                      data-guide-id="${g.id}"
                      style="display: flex; align-items: center; gap: 0.6rem; text-align: left; padding: 0.6rem 0.75rem; border-radius: var(--radius-sm); border: 1px solid ${g.id === currentGuideId ? 'var(--border-gold)' : 'transparent'}; background: ${g.id === currentGuideId ? 'rgba(243, 192, 67, 0.12)' : 'rgba(255,255,255,0.02)'}; cursor: pointer; transition: all 0.2s ease;">
                <img src="${g.icon}" alt="" style="width: 28px; height: 28px; border-radius: 4px; border: 1px solid var(--border-gold); flex-shrink: 0; object-fit: cover;" loading="lazy" />
                <div style="overflow: hidden; min-width: 0;">
                  <div style="font-size: 0.84rem; font-weight: 600; color: ${g.id === currentGuideId ? 'var(--text-gold)' : '#e2e8f0'}; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${escapeHtml(g.title)}</div>
                  <div style="font-size: 0.72rem; color: #94a3b8;">${escapeHtml(g.category)}</div>
                </div>
              </button>
            `).join('') : `
              <div style="padding: 1.5rem; text-align: center; color: #94a3b8; font-size: 0.85rem;">
                No guides matching "${escapeHtml(searchQuery)}".
              </div>
            `}
          </div>
        </div>

        <!-- Right: Active Guide Reader -->
        <div class="guides-hub-reader" style="overflow-y: auto; padding-right: 0.75rem;">
          <div style="display: flex; gap: 0.6rem; align-items: center; margin-bottom: 0.75rem; flex-wrap: wrap;">
            <span class="guide-category-badge" style="background: rgba(243, 192, 67, 0.15); border: 1px solid var(--border-gold); color: var(--text-gold); padding: 0.2rem 0.6rem; border-radius: 4px; font-size: 0.76rem; font-weight: 700;">${escapeHtml(currentGuide.category)}</span>
            <span class="guide-source-badge">Verified Source: ${escapeHtml(currentGuide.source || 'ForeverChanges.pro · Warcraft Tavern · Wowhead')}</span>
            <span class="guide-phase-badge">Phase 2 (Level 30 Cap)</span>
          </div>

          <h2 style="font-size: 1.55rem; color: #fff; line-height: 1.3; margin-bottom: 0.75rem; font-family: var(--font-heading);">${escapeHtml(currentGuide.title)}</h2>

          ${currentGuide.summary ? `
            <div style="background: rgba(15, 23, 42, 0.6); border-left: 3px solid var(--text-gold); padding: 0.75rem 1rem; border-radius: 4px; margin-bottom: 1.25rem; font-size: 0.9rem; color: #cbd5e1; line-height: 1.5;">
              ${escapeHtml(currentGuide.summary)}
            </div>
          ` : ''}

          <div class="guide-body-rendered">
            ${formattedContent}
          </div>
        </div>
      </div>
    `;

    // Hook click events on sidebar items
    bodyElem.querySelectorAll('.guide-nav-item').forEach(btn => {
      btn.addEventListener('click', () => {
        currentGuideId = btn.getAttribute('data-guide-id');
        renderModalLayout();
      });
    });

    // Hook search input
    const searchInput = bodyElem.querySelector('#guide-sidebar-search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value.trim();
        // Update sidebar items only to preserve scroll
        const scrollList = bodyElem.querySelector('.guides-nav-scroll-list');
        if (!scrollList) return;
        const filtered = guides.filter(g => {
          if (!searchQuery) return true;
          const q = searchQuery.toLowerCase();
          return (g.title && g.title.toLowerCase().includes(q)) ||
                 (g.category && g.category.toLowerCase().includes(q)) ||
                 (g.summary && g.summary.toLowerCase().includes(q));
        });

        scrollList.innerHTML = filtered.length > 0 ? filtered.map(g => `
          <button type="button" class="guide-nav-item ${g.id === currentGuideId ? 'active' : ''}" 
                  data-guide-id="${g.id}"
                  style="display: flex; align-items: center; gap: 0.6rem; text-align: left; padding: 0.6rem 0.75rem; border-radius: var(--radius-sm); border: 1px solid ${g.id === currentGuideId ? 'var(--border-gold)' : 'transparent'}; background: ${g.id === currentGuideId ? 'rgba(243, 192, 67, 0.12)' : 'rgba(255,255,255,0.02)'}; cursor: pointer; transition: all 0.2s ease;">
            <img src="${g.icon}" alt="" style="width: 28px; height: 28px; border-radius: 4px; border: 1px solid var(--border-gold); flex-shrink: 0; object-fit: cover;" loading="lazy" />
            <div style="overflow: hidden; min-width: 0;">
              <div style="font-size: 0.84rem; font-weight: 600; color: ${g.id === currentGuideId ? 'var(--text-gold)' : '#e2e8f0'}; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${escapeHtml(g.title)}</div>
              <div style="font-size: 0.72rem; color: #94a3b8;">${escapeHtml(g.category)}</div>
            </div>
          </button>
        `).join('') : `
          <div style="padding: 1.5rem; text-align: center; color: #94a3b8; font-size: 0.85rem;">
            No guides matching "${escapeHtml(searchQuery)}".
          </div>
        `;

        scrollList.querySelectorAll('.guide-nav-item').forEach(btn => {
          btn.addEventListener('click', () => {
            currentGuideId = btn.getAttribute('data-guide-id');
            renderModalLayout();
          });
        });
      });
    }
  }

  renderModalLayout();
  modal.classList.add('is-open');
  modal.removeAttribute('hidden');
};

window.initGuidesHub = initGuidesHub;


