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

window.openGuideModal = function(targetGuideId) {
  const modal = document.getElementById('guide-detail-modal') || document.getElementById('guides-hub-modal');
  if (!modal) return;

  let bodyElem = document.getElementById('guide-modal-body') || document.getElementById('guides-hub-modal-content');
  if (!bodyElem) return;

  const guides = window.WOW_TOOLS_DATA?.guides || [];
  let currentGuideId = targetGuideId;
  if (!currentGuideId || !guides.some(g => g.id === currentGuideId)) {
    // If target was short alias like 'sleeping-bag', match by partial id
    const match = guides.find(g => targetGuideId && (g.id === targetGuideId || g.id.includes(targetGuideId)));
    currentGuideId = match ? match.id : (guides[0]?.id || '');
  }

  function renderModalLayout() {
    const currentGuide = guides.find(g => g.id === currentGuideId) || guides[0];
    if (!currentGuide) return;

    // Format content bullets and paragraphs
    const formattedContent = currentGuide.content
      .split('\n')
      .map(line => {
        const trimmed = line.trim();
        if (trimmed.startsWith('•')) {
          return `<li style="margin-bottom: 0.4rem; color: #e2e8f0;">${escapeHtml(trimmed.substring(1).trim())}</li>`;
        }
        if (trimmed.startsWith('-')) {
          return `<li style="margin-left: 1.5rem; margin-bottom: 0.3rem; color: #cbd5e1;">${escapeHtml(trimmed.substring(1).trim())}</li>`;
        }
        if (trimmed) {
          return `<p style="margin-bottom: 0.8rem; line-height: 1.6; color: #cbd5e1;">${escapeHtml(trimmed)}</p>`;
        }
        return '';
      }).join('');

    bodyElem.innerHTML = `
      <div class="guides-hub-container" style="display: grid; grid-template-columns: minmax(240px, 280px) 1fr; gap: 1.25rem; min-height: 520px; max-height: 80vh;">
        <!-- Left: Guides Directory Sidebar -->
        <div class="guides-hub-sidebar" style="border-right: 1px solid var(--border-subtle); padding-right: 1rem; overflow-y: auto; display: flex; flex-direction: column; gap: 0.4rem;">
          <div style="padding-bottom: 0.75rem; border-bottom: 1px solid var(--border-subtle); margin-bottom: 0.5rem;">
            <span class="countdown-label" style="color: var(--text-gold); font-size: 0.72rem;">Field Manuals (${guides.length})</span>
            <h3 style="color: #fff; font-size: 1.1rem; margin: 0.15rem 0 0;">Classic+ Guides</h3>
          </div>
          ${guides.map(g => `
            <button type="button" class="guide-nav-item ${g.id === currentGuideId ? 'active' : ''}" 
                    data-guide-id="${g.id}"
                    style="display: flex; align-items: center; gap: 0.6rem; text-align: left; padding: 0.6rem 0.75rem; border-radius: var(--radius-sm); border: 1px solid ${g.id === currentGuideId ? 'var(--border-gold)' : 'transparent'}; background: ${g.id === currentGuideId ? 'rgba(243, 192, 67, 0.12)' : 'rgba(255,255,255,0.02)'}; cursor: pointer; transition: all 0.2s ease;">
              <img src="${g.icon}" alt="" style="width: 28px; height: 28px; border-radius: 4px; border: 1px solid var(--border-gold);" />
              <div style="overflow: hidden;">
                <div style="font-size: 0.84rem; font-weight: 600; color: ${g.id === currentGuideId ? 'var(--text-gold)' : '#e2e8f0'}; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${escapeHtml(g.title)}</div>
                <div style="font-size: 0.72rem; color: #94a3b8;">${escapeHtml(g.category)}</div>
              </div>
            </button>
          `).join('')}
        </div>

        <!-- Right: Active Guide Reader -->
        <div class="guides-hub-reader" style="overflow-y: auto; padding-right: 0.5rem;">
          <div style="display: flex; gap: 0.6rem; align-items: center; margin-bottom: 0.6rem; flex-wrap: wrap;">
            <span class="guide-category-badge" style="background: rgba(243, 192, 67, 0.15); border: 1px solid var(--border-gold); color: var(--text-gold); padding: 0.2rem 0.6rem; border-radius: 4px; font-size: 0.78rem; font-weight: 700;">${escapeHtml(currentGuide.category)}</span>
          </div>
          <h2 style="font-size: 1.55rem; color: #fff; line-height: 1.3; margin-bottom: 1rem; font-family: var(--font-heading);">${escapeHtml(currentGuide.title)}</h2>
          <div style="font-size: 0.95rem; line-height: 1.6;">
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
  }

  renderModalLayout();
  modal.classList.add('is-open');
  modal.removeAttribute('hidden');
};

window.initGuidesHub = initGuidesHub;


