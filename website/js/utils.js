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

  // Universal image error fallback for WoW icon CDNs
  window.addEventListener('error', (event) => {
    if (event.target && event.target.tagName === 'IMG') {
      const img = event.target;
      const fallback = 'https://wow.zamimg.com/images/wow/icons/medium/inv_misc_questionmark.jpg';
      if (img.src && !img.src.includes('inv_misc_questionmark') && !img.dataset.hasFailed) {
        img.dataset.hasFailed = 'true';
        img.src = fallback;
      }
    }
  }, true);
}

