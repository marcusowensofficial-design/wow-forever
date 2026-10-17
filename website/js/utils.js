/**
 * World of Warcraft: Forever - Shared Utility Functions
 */

function escapeHtml(string) {
  if (!string) return '';
  return String(string)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Universal clipboard copy with modern API and fallback support
 */
function copyTextToClipboard(text, onSuccess, onError) {
  if (!text) {
    const err = new Error('No text to copy');
    if (onError) onError(err);
    return Promise.reject(err);
  }
  if (navigator.clipboard && window.isSecureContext) {
    return navigator.clipboard.writeText(text)
      .then(() => {
        if (onSuccess) onSuccess();
      })
      .catch((_err) => {
        return fallbackCopy(text, onSuccess, onError);
      });
  } else {
    return fallbackCopy(text, onSuccess, onError);
  }
}

function fallbackCopy(text, onSuccess, onError) {
  try {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.style.position = "fixed";
    ta.style.top = "0";
    ta.style.left = "0";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.focus();
    ta.select();
    const successful = document.execCommand("copy");
    document.body.removeChild(ta);
    if (successful) {
      if (onSuccess) onSuccess();
      return Promise.resolve();
    } else {
      const err = new Error('execCommand copy returned false');
      if (onError) onError(err);
      return Promise.reject(err);
    }
  } catch (err) {
    if (onError) onError(err);
    return Promise.reject(err);
  }
}

/**
 * Non-blocking in-app toast notification
 */
function showToast(message, type = 'info', duration = 3000) {
  if (typeof document === 'undefined') return;
  let container = document.getElementById('wow-toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'wow-toast-container';
    container.className = 'wow-toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `wow-toast-item toast-${type}`;
  const icon = type === 'success' ? '✓' : type === 'error' ? '✕' : type === 'warning' ? '⚠️' : '⚡';
  toast.innerHTML = `<span class="wow-toast-icon">${icon}</span><span class="wow-toast-msg">${escapeHtml(message)}</span>`;
  container.appendChild(toast);

  // Trigger entrance
  requestAnimationFrame(() => {
    toast.classList.add('is-visible');
  });

  setTimeout(() => {
    toast.classList.remove('is-visible');
    toast.addEventListener('transitionend', () => toast.remove(), { once: true });
  }, duration);
}

function positionTooltip(event, tooltip) {
  if (!tooltip || !event) return;
  const padding = 16;
  const ttWidth = tooltip.offsetWidth || 340;
  const ttHeight = tooltip.offsetHeight || 220;

  let left = event.clientX + 16;
  let top = event.clientY + 16;

  if (left + ttWidth > window.innerWidth - padding) {
    left = Math.max(padding, event.clientX - ttWidth - 16);
  }
  if (top + ttHeight > window.innerHeight - padding) {
    top = Math.max(padding, event.clientY - ttHeight - 16);
  }

  tooltip.style.left = `${left}px`;
  tooltip.style.top = `${top}px`;
}

if (typeof window !== 'undefined') {
  window.escapeHtml = escapeHtml;
  window.copyTextToClipboard = copyTextToClipboard;
  window.showToast = showToast;
  window.positionTooltip = positionTooltip;

  // Universal image error fallback for WoW icon CDNs with contextual material placeholder resolution
  window.addEventListener('error', (event) => {
    if (event.target && event.target.tagName === 'IMG') {
      const img = event.target;
      const cdnBase = 'https://wow.zamimg.com/images/wow/icons/medium/';
      const fallback = `${cdnBase}inv_misc_questionmark.jpg`;

      // 1. Attempt smart material placeholder resolution before showing red question mark
      if (!img.dataset.hasFailedPlaceholder) {
        img.dataset.hasFailedPlaceholder = 'true';
        const label = (img.alt || img.title || img.dataset.recipeName || img.dataset.itemName || img.parentElement?.dataset?.itemName || '').toLowerCase();
        let placeholder = null;

        if (label.includes('star wood')) placeholder = 'inv_tradeskillitem_03';
        else if (label.includes('wood') || label.includes('log') || label.includes('lumber') || label.includes('timber')) placeholder = 'inv_tradeskillitem_01';
        else if (label.includes('thread') || label.includes('string') || label.includes('cord') || label.includes('twine') || label.includes('yarn') || label.includes('spool') || label.includes('fiber')) placeholder = 'inv_fabric_linen_03';
        else if (label.includes('cloth') || label.includes('linen') || label.includes('fabric')) placeholder = 'inv_fabric_linen_01';
        else if (label.includes('leather') || label.includes('hide') || label.includes('pelt') || label.includes('fur')) placeholder = 'inv_misc_leatherscrap_01';
        else if (label.includes('tin bar')) placeholder = 'inv_ingot_05';
        else if (label.includes('bar') || label.includes('ingot')) placeholder = 'inv_ingot_01';
        else if (label.includes('ore') || label.includes('nugget')) placeholder = 'inv_ore_copper_01';
        else if (label.includes('stone') || label.includes('rock')) placeholder = 'inv_stone_01';
        else if (label.includes('herb') || label.includes('leaf') || label.includes('blossom') || label.includes('weed') || label.includes('root') || label.includes('kelp')) placeholder = 'inv_misc_herb_01';
        else if (label.includes('potion') || label.includes('elixir') || label.includes('flask') || label.includes('vial')) placeholder = 'inv_potion_51';
        else if (label.includes('dust') || label.includes('powder') || label.includes('sand')) placeholder = 'inv_misc_dust_01';
        else if (label.includes('meat') || label.includes('flank') || label.includes('rib') || label.includes('steak') || label.includes('flesh')) placeholder = 'inv_misc_food_14';
        else if (label.includes('fish') || label.includes('salmon') || label.includes('trout') || label.includes('snapper') || label.includes('eel')) placeholder = 'inv_misc_fish_02';
        else if (label.includes('gem') || label.includes('ruby') || label.includes('sapphire') || label.includes('diamond') || label.includes('emerald') || label.includes('pearl')) placeholder = 'inv_misc_gem_ruby_01';
        else if (label.includes('flint') || label.includes('tinder')) placeholder = 'inv_stone_11';
        else if (label.includes('water') || label.includes('drink')) placeholder = 'inv_drink_01';

        if (placeholder) {
          const placeholderUrl = `${cdnBase}${placeholder}.jpg`;
          if (img.src !== placeholderUrl) {
            img.src = placeholderUrl;
            return;
          }
        }
      }

      // 2. Ultimate fallback to question mark if placeholder also fails or no category match
      if (img.src && !img.src.includes('inv_misc_questionmark') && !img.dataset.hasFailed) {
        img.dataset.hasFailed = 'true';
        img.src = fallback;
      }
    }
  }, true);
}

