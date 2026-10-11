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
  if (!text) return;
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text)
      .then(() => { if (onSuccess) onSuccess(); })
      .catch(() => { fallbackCopy(text, onSuccess, onError); });
  } else {
    fallbackCopy(text, onSuccess, onError);
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
    } else {
      if (onError) onError();
    }
  } catch (err) {
    if (onError) onError(err);
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

if (typeof window !== 'undefined') {
  window.escapeHtml = escapeHtml;
  window.copyTextToClipboard = copyTextToClipboard;
  window.showToast = showToast;
}

