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
      window.openGuideModal('sleeping-bag');
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

window.openGuideModal = function(guideId) {
  const modal = document.getElementById('guide-detail-modal') || document.getElementById('guides-hub-modal');
  if (!modal) return;

  let bodyElem = document.getElementById('guide-modal-body') || document.getElementById('guides-hub-modal-content');
  if (!bodyElem) return;

  const guides = window.WOW_TOOLS_DATA?.guides || [];
  const guide = guides.find(g => g.id === guideId) || guides[0];
  if (!guide) return;

  // Format bullets and headings nicely
  const formattedContent = guide.content
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
    <div style="padding: 1.5rem;">
      <div style="display: flex; gap: 0.8rem; align-items: center; margin-bottom: 0.75rem;">
        <span class="guide-category-badge" style="background: rgba(243, 192, 67, 0.15); border: 1px solid var(--border-gold); color: var(--text-gold); padding: 0.2rem 0.6rem; border-radius: 4px; font-size: 0.8rem; font-weight: 700;">${guide.category}</span>
      </div>
      <h2 style="font-size: 1.6rem; color: #fff; line-height: 1.3; margin-bottom: 1rem; font-family: var(--font-heading);">${escapeHtml(guide.title)}</h2>
      <div style="font-size: 0.95rem; line-height: 1.6;">
        ${formattedContent}
      </div>
    </div>
  `;

  modal.classList.add('is-open');
  modal.removeAttribute('hidden');
};

window.initGuidesHub = initGuidesHub;

