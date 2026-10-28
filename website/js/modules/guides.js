/**
 * World of Warcraft: Forever - Curated Classic+ Guides Module
 * Powers the dedicated Classic+ Guides Tab (#tab-guides), Category Subtabs,
 * Field Manual Master-Detail Reader, Table of Contents, Search, and Quick Modals.
 */

let activeGuideCategory = 'all';
let activeGuideId = 'guide-sleeping-bag';
let guideSearchQuery = '';
let guideViewLayout = 'reader'; // 'reader' | 'cards'
let activeDungeonSubfilter = 'all'; // 'all' | 'custom' | 'alliance' | 'horde' | 'lvl13-20' | 'lvl21-34'

const GUIDE_CATEGORY_MAP = {
  all: null,
  classes: ['Classes & Pets', 'Classes & Specs'],
  leveling: ['Leveling & Quests'],
  dungeons: ['Dungeons & Raids'],
  professions: ['Economy & Professions'],
  secrets: ['Exploration & Secrets'],
  pvp: ['PvP & Tournaments']
};

function initGuidesHub() {
  // Update guide counts on pills
  updateCategoryPillCounts();

  // Render both page views and any codex cards
  renderGuidesPage();
  renderGuidesCards();

  // Setup event listeners
  setupGuidePageEvents();
  setupGuideModalEvents();

  // Check URL hash for initial deep link
  checkGuidesHash();
  window.addEventListener('hashchange', checkGuidesHash);
}

function updateCategoryPillCounts() {
  const guides = window.WOW_TOOLS_DATA?.guides || [];
  const countAll = document.getElementById('count-cat-all');
  if (countAll) countAll.textContent = guides.length;
  const statVerified = document.getElementById('stat-verified-guides');
  if (statVerified) statVerified.textContent = guides.length;

  Object.keys(GUIDE_CATEGORY_MAP).forEach(catKey => {
    if (catKey === 'all') return;
    const countEl = document.getElementById(`count-cat-${catKey}`);
    if (countEl) {
      const allowed = GUIDE_CATEGORY_MAP[catKey];
      const count = guides.filter(g => allowed.includes(g.category)).length;
      countEl.textContent = count;
    }
  });
}

function getFilteredGuides() {
  const guides = window.WOW_TOOLS_DATA?.guides || [];
  const allowedCategories = GUIDE_CATEGORY_MAP[activeGuideCategory];

  return guides.filter(g => {
    // 1. Category filter
    if (allowedCategories && !allowedCategories.includes(g.category)) {
      return false;
    }

    // 2. Dungeon subfilter (active only on Dungeons & Raids category)
    if (activeGuideCategory === 'dungeons' && activeDungeonSubfilter !== 'all') {
      const meta = g.dungeonMeta;
      if (!meta) {
        return false;
      }
      if (activeDungeonSubfilter === 'custom' && meta.type !== 'custom') return false;
      if (activeDungeonSubfilter === 'alliance' && meta.faction !== 'Alliance' && meta.faction !== 'Both') return false;
      if (activeDungeonSubfilter === 'horde' && meta.faction !== 'Horde' && meta.faction !== 'Both') return false;
      if (activeDungeonSubfilter === 'lvl13-20' && meta.levelMin > 20) return false;
      if (activeDungeonSubfilter === 'lvl21-34' && meta.levelMax < 21) return false;
    }

    // 3. Search query filter
    if (guideSearchQuery) {
      const q = guideSearchQuery.toLowerCase();
      const inTitle = g.title && g.title.toLowerCase().includes(q);
      const inCat = g.category && g.category.toLowerCase().includes(q);
      const inSummary = g.summary && g.summary.toLowerCase().includes(q);
      const inContent = g.content && g.content.toLowerCase().includes(q);
      if (!inTitle && !inCat && !inSummary && !inContent) return false;
    }

    return true;
  });
}

function renderDungeonSubfilters() {
  const container = document.getElementById('guides-dungeon-subfilters');
  if (!container) return;

  if (activeGuideCategory !== 'dungeons') {
    container.style.display = 'none';
    container.innerHTML = '';
    return;
  }

  container.style.display = 'flex';
  const subfilters = [
    { id: 'all', label: 'All Encounters', icon: '🏰' },
    { id: 'custom', label: 'Classic+ Custom', icon: '✨' },
    { id: 'alliance', label: 'Alliance Path', icon: '🦁' },
    { id: 'horde', label: 'Horde Path', icon: '🐺' },
    { id: 'lvl13-20', label: 'Levels 13–20', icon: '⚔️' },
    { id: 'lvl21-34', label: 'Levels 21–34', icon: '🛡️' }
  ];

  container.innerHTML = subfilters.map(f => `
    <button type="button" 
            class="dungeon-subfilter-btn ${activeDungeonSubfilter === f.id ? 'active' : ''}" 
            data-dungeon-subfilter="${f.id}"
            role="tab"
            aria-selected="${activeDungeonSubfilter === f.id}">
      <span>${f.icon}</span> ${f.label}
    </button>
  `).join('');

  container.querySelectorAll('.dungeon-subfilter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      activeDungeonSubfilter = btn.getAttribute('data-dungeon-subfilter') || 'all';
      renderDungeonSubfilters();
      renderGuidesPage();
    });
  });
}

function renderGuidesPage() {
  const readerMount = document.getElementById('guides-reader-mount');
  const cardsMount = document.getElementById('guides-cards-mount');
  const resultsBanner = document.getElementById('guides-results-banner');
  if (!readerMount && !cardsMount) return;

  renderDungeonSubfilters();

  const guides = window.WOW_TOOLS_DATA?.guides || [];
  const filtered = getFilteredGuides();

  // Update live search banner if searching
  if (resultsBanner) {
    if (guideSearchQuery) {
      resultsBanner.style.display = 'flex';
      resultsBanner.innerHTML = `
        <span>🔍 Showing <strong>${filtered.length}</strong> of <strong>${guides.length}</strong> guides for "<em>${escapeHtml(guideSearchQuery)}</em>"</span>
        <button type="button" class="guides-clear-search-link" onclick="window.clearGuideSearch()">Clear Filter ✕</button>
      `;
    } else {
      resultsBanner.style.display = 'none';
      resultsBanner.innerHTML = '';
    }
  }

  // Ensure activeGuideId is valid within filtered list, else fall back
  if (filtered.length > 0 && !filtered.some(g => g.id === activeGuideId)) {
    activeGuideId = filtered[0].id;
  }

  if (guideViewLayout === 'reader') {
    if (readerMount) {
      readerMount.style.display = 'block';
      renderMasterDetailReader(readerMount, filtered);
    }
    if (cardsMount) cardsMount.style.display = 'none';
  } else {
    if (cardsMount) {
      cardsMount.style.display = 'block';
      renderCardsGrid(cardsMount, filtered);
    }
    if (readerMount) readerMount.style.display = 'none';
  }
}

function renderMasterDetailReader(mountElem, filteredGuides) {
  const currentGuide = filteredGuides.find(g => g.id === activeGuideId) ||
                       (window.WOW_TOOLS_DATA?.guides || []).find(g => g.id === activeGuideId) ||
                       filteredGuides[0];

  if (!currentGuide && filteredGuides.length === 0) {
    mountElem.innerHTML = `
      <div class="guides-empty-state">
        <div class="guides-empty-icon">📜</div>
        <h3>No Guides Found</h3>
        <p>No guides match the selected category and search "${escapeHtml(guideSearchQuery)}".</p>
        <button type="button" class="btn-action-gold" onclick="window.clearGuideSearch()">Reset Search & Filters</button>
      </div>
    `;
    return;
  }

  const formattedContent = formatGuideMarkdown(currentGuide.content, true);
  const headings = extractGuideHeadings(currentGuide.content);
  const classSlug = getClassSlugFromGuide(currentGuide.id);

  mountElem.innerHTML = `
    <div class="guides-master-detail-layout">
      <!-- Left: Guides Index Sidebar -->
      <aside class="guides-sidebar-column">
        <div class="guides-sidebar-header">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.35rem;">
            <span class="guide-count-label">FIELD MANUALS (${filteredGuides.length})</span>
            <span class="guide-phase-tag">Phase 2 • Level 30</span>
          </div>
          <div class="guides-sidebar-status">
            ${activeGuideCategory !== 'all' ? `<span class="active-category-indicator">${escapeHtml(activeGuideCategory.toUpperCase())}</span>` : '<span>ALL CATEGORIES</span>'}
          </div>
        </div>

        <div class="guides-sidebar-list" role="tablist" aria-orientation="vertical">
          ${filteredGuides.map(g => {
            const isActive = g.id === currentGuide.id;
            return `
              <button type="button" 
                      class="guide-sidebar-item ${isActive ? 'active' : ''}"
                      data-guide-id="${g.id}"
                      role="tab"
                      aria-selected="${isActive}">
                <img src="${g.icon}" alt="" class="guide-sidebar-icon" loading="lazy" />
                <div class="guide-sidebar-text">
                  <div class="guide-sidebar-title">${escapeHtml(g.title)}</div>
                  <div class="guide-sidebar-meta">
                    <span class="guide-meta-cat">${escapeHtml(g.category)}</span>
                  </div>
                </div>
              </button>
            `;
          }).join('')}
        </div>
      </aside>

      <!-- Right: Interactive Guide Reader Pane -->
      <article class="guides-reader-column" id="guide-active-article">
        <!-- Top Meta Bar -->
        <div class="guide-reader-header-bar">
          <div class="guide-reader-badges">
            <span class="guide-category-badge">${escapeHtml(currentGuide.category)}</span>
            <span class="guide-source-badge">Verified Source: ${escapeHtml(currentGuide.source || 'Wowhead · Warcraft Tavern')}</span>
            <span class="guide-phase-badge">Phase 2 Cap (Level 30)</span>
          </div>
          <div class="guide-reader-actions">
            ${classSlug ? `
              <button type="button" class="guide-action-pill-btn" onclick="window.jumpToClassDeepDive('${classSlug}')" title="Jump to Interactive Talent Calculator for this class">
                <span>🎯</span> View ${classSlug.toUpperCase()} Builds
              </button>
            ` : ''}
            <button type="button" class="guide-action-pill-btn" onclick="window.copyGuideLink('${currentGuide.id}')" title="Copy shareable link to clipboard">
              <span id="copy-link-icon-${currentGuide.id}">🔗</span> Share
            </button>
          </div>
        </div>

        <h1 class="guide-reader-title">${escapeHtml(currentGuide.title)}</h1>

        ${currentGuide.summary ? `
          <div class="guide-reader-summary">
            <span class="summary-prefix">MISSION BRIEFING:</span>
            ${escapeHtml(currentGuide.summary)}
          </div>
        ` : ''}

        ${headings.length > 1 ? `
          <!-- Sticky Table of Contents Pills -->
          <nav class="guide-toc-nav" aria-label="Table of Contents">
            <span class="guide-toc-label">Quick Jump:</span>
            <div class="guide-toc-pills">
              ${headings.map(h => `
                <a href="#${h.id}" class="guide-toc-chip" onclick="window.smoothScrollToGuideHeading(event, '${h.id}')">
                  ${escapeHtml(h.title)}
                </a>
              `).join('')}
            </div>
          </nav>
        ` : ''}

        <!-- Rendered Guide Content -->
        <div class="guide-body-rendered">
          ${formattedContent}
        </div>

        <!-- Footer Callout -->
        <footer class="guide-reader-footer">
          <div class="guide-footer-left">
            <span>📖 World of Warcraft: Forever Living Compendium</span>
            <span style="color: #64748b;">•</span>
            <span>Closed Beta Phase 2 Verified</span>
          </div>
          <button type="button" class="guide-back-to-top-btn" onclick="window.scrollToGuideTop()">
            <span>▲</span> Back to Top
          </button>
        </footer>
      </article>
    </div>
  `;

  // Hook sidebar click events
  mountElem.querySelectorAll('.guide-sidebar-item').forEach(btn => {
    btn.addEventListener('click', () => {
      const gId = btn.getAttribute('data-guide-id');
      if (gId) {
        activeGuideId = gId;
        renderGuidesPage();
        if (history.replaceState) {
          history.replaceState(null, '', `#guides/${gId}`);
        }
      }
    });
  });
}

function renderCardsGrid(mountElem, filteredGuides) {
  if (filteredGuides.length === 0) {
    mountElem.innerHTML = `
      <div class="guides-empty-state">
        <div class="guides-empty-icon">📜</div>
        <h3>No Guides Found</h3>
        <p>No guides match the selected category and search "${escapeHtml(guideSearchQuery)}".</p>
        <button type="button" class="btn-action-gold" onclick="window.clearGuideSearch()">Reset Search & Filters</button>
      </div>
    `;
    return;
  }

  mountElem.innerHTML = `
    <div class="curated-guides-grid">
      ${filteredGuides.map(g => `
        <div class="guide-feature-card" onclick="window.navigateToGuide('${g.id}')">
          <div class="guide-card-top">
            <img src="${g.icon}" alt="" class="guide-card-icon" loading="lazy" />
            <div>
              <span class="guide-category-badge">${escapeHtml(g.category)}</span>
              <h3 class="guide-card-title">${escapeHtml(g.title)}</h3>
            </div>
          </div>
          <p class="guide-card-summary">${escapeHtml(g.summary)}</p>
          <div class="guide-card-foot">
            <span class="guide-source-tag">${escapeHtml(g.source ? g.source.split('·')[0].trim() : 'Wowhead')}</span>
            <span class="guide-read-btn">Read Field Manual ➔</span>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

function extractGuideHeadings(markdown) {
  if (!markdown) return [];
  const headings = [];
  const lines = markdown.split('\n');

  lines.forEach(line => {
    const trimmed = line.trim();
    if (trimmed.startsWith('### ') || trimmed.startsWith('## ')) {
      const rawTitle = trimmed.replace(/^#{2,3}\s+/, '').replace(/\*\*/g, '').trim();
      const cleanId = 'sec-' + rawTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
      headings.push({ id: cleanId, title: rawTitle });
    }
  });

  return headings;
}

function getClassSlugFromGuide(guideId) {
  if (!guideId) return null;
  const map = {
    'guide-class-warrior': 'warrior',
    'guide-class-paladin': 'paladin',
    'guide-class-rogue': 'rogue',
    'guide-class-priest': 'priest',
    'guide-class-shaman': 'shaman',
    'guide-class-warlock': 'warlock',
    'guide-hunter-pets': 'hunter',
    'guide-druid-forms': 'druid',
    'guide-druid-snake-form': 'druid',
    'guide-level30-druid': 'druid',
    'guide-class-druid': 'druid',
    'guide-battle-mage': 'mage',
    'guide-dwarf-shaman-totems': 'shaman',
    'guide-mage-comprehension-scrolls': 'mage',
    'guide-level30-hunter': 'hunter',
    'guide-level30-frost-mage': 'mage'
  };
  return map[guideId] || null;
}

function setupGuidePageEvents() {
  // Category pills click
  const pillsContainer = document.getElementById('guides-category-pills');
  if (pillsContainer) {
    pillsContainer.querySelectorAll('.guides-subtab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        pillsContainer.querySelectorAll('.guides-subtab-btn').forEach(b => {
          b.classList.remove('active');
          b.setAttribute('aria-selected', 'false');
        });
        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');

        activeGuideCategory = btn.getAttribute('data-guide-category') || 'all';
        activeDungeonSubfilter = 'all';
        renderGuidesPage();
      });
    });
  }

  // Search input with instant filter and clear button
  const searchInput = document.getElementById('guides-search-input');
  const searchClearBtn = document.getElementById('guides-search-clear');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      guideSearchQuery = e.target.value.trim();
      if (searchClearBtn) {
        if (guideSearchQuery) {
          searchClearBtn.removeAttribute('hidden');
        } else {
          searchClearBtn.setAttribute('hidden', '');
        }
      }
      renderGuidesPage();
    });
  }

  if (searchClearBtn) {
    searchClearBtn.addEventListener('click', () => {
      window.clearGuideSearch();
    });
  }

  // Layout switcher
  const btnReader = document.getElementById('btn-guide-view-reader');
  const btnCards = document.getElementById('btn-guide-view-cards');

  if (btnReader && btnCards) {
    btnReader.addEventListener('click', () => {
      guideViewLayout = 'reader';
      btnReader.classList.add('active');
      btnCards.classList.remove('active');
      renderGuidesPage();
    });

    btnCards.addEventListener('click', () => {
      guideViewLayout = 'cards';
      btnCards.classList.add('active');
      btnReader.classList.remove('active');
      renderGuidesPage();
    });
  }
}

function renderGuidesCards() {
  const container = document.getElementById('curated-guides-grid');
  if (!container) return;

  const guides = window.WOW_TOOLS_DATA?.guides || [];

  container.innerHTML = guides.map(g => `
    <div class="guide-feature-card" onclick="window.navigateToGuide('${g.id}')">
      <div class="guide-card-top">
        <img src="${g.icon}" alt="" class="guide-card-icon" loading="lazy" />
        <div>
          <span class="guide-category-badge">${escapeHtml(g.category)}</span>
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
  const modal = document.getElementById('guide-detail-modal');
  const closeBtn = document.getElementById('guide-modal-close');
  const headerBtn = document.getElementById('btn-open-guides');

  if (headerBtn) {
    headerBtn.addEventListener('click', () => {
      window.navigateToGuide();
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
  escaped = escaped.replace(/\[([^\]]+)\]\((https?:\/\/[^\s)"']+|#[^\s)"']+|\/[^\s)"']+)\)/g, (match, label, href) => {
    const isExternal = href.startsWith('http');
    const targetRel = isExternal ? ' target="_blank" rel="noopener"' : '';
    return `<a href="${href}"${targetRel} class="guide-inline-link">${label}</a>`;
  });
  return escaped;
}

function formatGuideMarkdown(content, isPage = false) {
  if (!content) return '';
  const lines = content.split('\n');
  let html = '';
  let inList = false;
  let inTable = false;
  let inCodeBlock = false;
  let codeBuffer = '';

  for (let i = 0; i < lines.length; i++) {
    const rawLine = lines[i];
    const trimmed = rawLine.trim();

    // Code blocks ```lua or ```
    if (trimmed.startsWith('```')) {
      if (!inCodeBlock) {
        inCodeBlock = true;
        codeBuffer = '';
        continue;
      } else {
        inCodeBlock = false;
        const codeId = 'macro-' + Math.random().toString(36).substring(2, 8);
        html += `
          <div class="guide-macro-box">
            <div class="guide-macro-header">
              <span>📜 In-Game Macro / Script</span>
              <button type="button" class="btn-copy-macro" onclick="window.copyMacroCode('${codeId}', this)">
                <span>📋</span> Copy Macro
              </button>
            </div>
            <pre class="guide-macro-pre"><code id="${codeId}">${escapeHtml(codeBuffer.trim())}</code></pre>
          </div>
        `;
        continue;
      }
    }

    if (inCodeBlock) {
      codeBuffer += rawLine + '\n';
      continue;
    }

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

    // Raw HTML / SVG block handling (interactive transit maps, diagrams, custom cards)
    if (trimmed.startsWith('<') && !trimmed.startsWith('<!--') && /^<\/?([a-zA-Z][a-zA-Z0-9:-]*)/.test(trimmed)) {
      html += rawLine + '\n';
      continue;
    }

    // Subheadings
    if (trimmed.startsWith('#### ')) {
      const subTitle = trimmed.substring(5);
      const subId = isPage ? 'sec-' + subTitle.replace(/\*\*/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') : '';
      html += `<h4 ${subId ? `id="${subId}"` : ''} class="guide-subsec-title">${formatInlineGuide(subTitle)}</h4>`;
      continue;
    }
    if (trimmed.startsWith('### ')) {
      const secTitle = trimmed.substring(4);
      const secId = isPage ? 'sec-' + secTitle.replace(/\*\*/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') : '';
      html += `<h3 ${secId ? `id="${secId}"` : ''} class="guide-sec-title">${formatInlineGuide(secTitle)}</h3>`;
      continue;
    }
    if (trimmed.startsWith('## ')) {
      const secTitle = trimmed.substring(3);
      const secId = isPage ? 'sec-' + secTitle.replace(/\*\*/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') : '';
      html += `<h3 ${secId ? `id="${secId}"` : ''} class="guide-sec-title">${formatInlineGuide(secTitle)}</h3>`;
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

window.navigateToGuide = function(targetGuideId, preferredCategory) {
  const guides = window.WOW_TOOLS_DATA?.guides || [];
  let foundGuide = null;

  if (targetGuideId) {
    foundGuide = guides.find(g => g.id === targetGuideId || g.id.includes(targetGuideId));
  }

  if (foundGuide) {
    activeGuideId = foundGuide.id;
  } else if (!activeGuideId && guides.length > 0) {
    activeGuideId = guides[0].id;
  }

  if (preferredCategory) {
    activeGuideCategory = preferredCategory;
  } else if (foundGuide) {
    // Check if current category filter excludes this guide
    const allowed = GUIDE_CATEGORY_MAP[activeGuideCategory];
    if (allowed && !allowed.includes(foundGuide.category)) {
      activeGuideCategory = 'all';
    }
  }

  // Switch to guides main tab
  const guidesTabBtn = document.querySelector('.nav-tab-btn[data-tab="guides"]');
  if (guidesTabBtn && !guidesTabBtn.classList.contains('active')) {
    guidesTabBtn.click();
  }

  // Update category pill active state
  const pillsContainer = document.getElementById('guides-category-pills');
  if (pillsContainer) {
    pillsContainer.querySelectorAll('.guides-subtab-btn').forEach(btn => {
      const cat = btn.getAttribute('data-guide-category');
      const isMatch = cat === activeGuideCategory;
      btn.classList.toggle('active', isMatch);
      btn.setAttribute('aria-selected', isMatch ? 'true' : 'false');
    });
  }

  // Force reader mode when jumping to a specific guide
  guideViewLayout = 'reader';
  const btnReader = document.getElementById('btn-guide-view-reader');
  const btnCards = document.getElementById('btn-guide-view-cards');
  if (btnReader && btnCards) {
    btnReader.classList.add('active');
    btnCards.classList.remove('active');
  }

  renderGuidesPage();

  // Update hash
  if (history.replaceState && activeGuideId) {
    history.replaceState(null, '', `#guides/${activeGuideId}`);
  }

  // Smooth scroll
  setTimeout(() => {
    const tabSection = document.getElementById('tab-guides');
    if (tabSection) {
      tabSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, 100);
};

window.clearGuideSearch = function() {
  guideSearchQuery = '';
  activeGuideCategory = 'all';
  activeDungeonSubfilter = 'all';
  const searchInput = document.getElementById('guides-search-input');
  if (searchInput) searchInput.value = '';
  const searchClearBtn = document.getElementById('guides-search-clear');
  if (searchClearBtn) searchClearBtn.setAttribute('hidden', '');

  const pillsContainer = document.getElementById('guides-category-pills');
  if (pillsContainer) {
    pillsContainer.querySelectorAll('.guides-subtab-btn').forEach(btn => {
      const isAll = btn.getAttribute('data-guide-category') === 'all';
      btn.classList.toggle('active', isAll);
      btn.setAttribute('aria-selected', isAll ? 'true' : 'false');
    });
  }

  renderGuidesPage();
};

window.jumpToClassDeepDive = function(classSlug) {
  const deepDiveTabBtn = document.querySelector('.nav-tab-btn[data-tab="deepdives"]');
  if (deepDiveTabBtn) deepDiveTabBtn.click();
  if (typeof window.switchDeepDiveClass === 'function') {
    window.switchDeepDiveClass(classSlug);
  }
};

window.copyGuideLink = function(guideId) {
  const url = `${window.location.origin}${window.location.pathname}#guides/${guideId}`;
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(url).then(() => {
      const iconSpan = document.getElementById(`copy-link-icon-${guideId}`);
      if (iconSpan) {
        iconSpan.textContent = '✓';
        setTimeout(() => { iconSpan.textContent = '🔗'; }, 2000);
      }
    });
  }
};

window.copyMacroCode = function(codeId, btnElem) {
  const codeElem = document.getElementById(codeId);
  if (!codeElem) return;
  const text = codeElem.textContent || '';
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(() => {
      if (btnElem) {
        const orig = btnElem.innerHTML;
        btnElem.innerHTML = '<span>✓</span> Copied!';
        setTimeout(() => { btnElem.innerHTML = orig; }, 2000);
      }
    });
  }
};

window.smoothScrollToGuideHeading = function(e, headingId) {
  if (e) e.preventDefault();
  const el = document.getElementById(headingId);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};

window.scrollToGuideTop = function() {
  const target = document.getElementById('guide-active-article') || document.getElementById('tab-guides');
  if (target) {
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};

function checkGuidesHash() {
  const hash = (window.location.hash || '').toLowerCase();
  if (hash.startsWith('#guides') || hash.startsWith('#guide')) {
    const parts = hash.split('/');
    if (parts[1]) {
      const rawSub = parts[1].split('?')[0].split('#')[0];
      if (rawSub.startsWith('guide-')) {
        activeGuideId = rawSub;
        renderGuidesPage();
      } else if (GUIDE_CATEGORY_MAP[rawSub]) {
        activeGuideCategory = rawSub;
        renderGuidesPage();
      }
    }
  }
}

window.openGuideModal = function(targetGuideId) {
  const modal = document.getElementById('guide-detail-modal');
  if (!modal) return;

  const bodyElem = document.getElementById('guide-modal-body');
  if (!bodyElem) return;

  const guides = window.WOW_TOOLS_DATA?.guides || [];
  let currentGuideId = targetGuideId;
  if (!currentGuideId || !guides.some(g => g.id === currentGuideId)) {
    const match = guides.find(g => targetGuideId && (g.id === targetGuideId || g.id.includes(targetGuideId)));
    currentGuideId = match ? match.id : (guides[0]?.id || '');
  }

  const currentGuide = guides.find(g => g.id === currentGuideId) || guides[0];
  if (!currentGuide) return;

  const formattedContent = formatGuideMarkdown(currentGuide.content, false);

  bodyElem.innerHTML = `
    <div class="guide-modal-header" style="display: flex; justify-content: space-between; align-items: flex-start; gap: 1rem; margin-bottom: 1rem; padding-bottom: 0.75rem; border-bottom: 1px solid rgba(255,255,255,0.1);">
      <div>
        <div style="display: flex; gap: 0.5rem; align-items: center; margin-bottom: 0.35rem; flex-wrap: wrap;">
          <span class="guide-category-badge">${escapeHtml(currentGuide.category)}</span>
          <span class="guide-source-badge">Verified Source: ${escapeHtml(currentGuide.source || 'Wowhead · Warcraft Tavern')}</span>
        </div>
        <h2 style="font-size: 1.45rem; color: #fff; margin: 0; font-family: var(--font-heading);">${escapeHtml(currentGuide.title)}</h2>
      </div>
      <button type="button" class="btn-action-gold" onclick="document.getElementById('guide-modal-close')?.click(); window.navigateToGuide('${currentGuide.id}')" style="flex-shrink: 0; padding: 0.4rem 0.85rem; font-size: 0.82rem;">
        <span>📖</span> Open in Dedicated Page View
      </button>
    </div>
    <div style="overflow-y: auto; max-height: calc(85vh - 120px); padding-right: 0.5rem;">
      ${currentGuide.summary ? `
        <div style="background: rgba(15, 23, 42, 0.6); border-left: 3px solid var(--text-gold); padding: 0.75rem 1rem; border-radius: 4px; margin-bottom: 1.25rem; font-size: 0.9rem; color: #cbd5e1; line-height: 1.5;">
          ${escapeHtml(currentGuide.summary)}
        </div>
      ` : ''}
      <div class="guide-body-rendered">
        ${formattedContent}
      </div>
    </div>
  `;

  modal.classList.add('is-open');
  modal.removeAttribute('hidden');
};

window.initGuidesHub = initGuidesHub;
