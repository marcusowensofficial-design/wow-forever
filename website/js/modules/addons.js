/**
 * addons.js
 * In-House Companion Addon Suite Hub & Distribution Manager
 * Handles slash-command copying, download telemetry, and installation guidance.
 */

(function() {
  'use strict';

  function initAddonHub() {
    const tabAddons = document.getElementById('tab-addons');
    if (!tabAddons) return;

    // Hook copy-to-clipboard for all slash-command pills and paths
    tabAddons.querySelectorAll('.addon-cmd-pill').forEach(pill => {
      pill.addEventListener('click', () => {
        const cmd = pill.getAttribute('data-cmd') || pill.textContent.trim();
        const copyFn = window.copyTextToClipboard || ((t, fn) => navigator.clipboard?.writeText(t).then(fn));
        copyFn(cmd, () => {
          const orig = pill.innerHTML;
          pill.innerHTML = `<span>✓</span> Copied!`;
          pill.style.borderColor = '#10b981';
          pill.style.color = '#34d399';
          setTimeout(() => {
            pill.innerHTML = orig;
            pill.style.borderColor = '';
            pill.style.color = '';
          }, 2000);
          if (window.showToast) {
            window.showToast(`Command "${cmd}" copied to clipboard!`, 'success');
          }
        });
      });
    });

    // Hook download links to provide instant feedback toast
    tabAddons.querySelectorAll('.addon-download-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const addonName = btn.getAttribute('data-addon-name') || 'Addon';
        if (window.showToast) {
          window.showToast(`Downloading ${addonName}... Extract to World of Warcraft/_camelot_/Interface/AddOns/`, 'info');
        }
      });
    });

    // Installation path copy button
    const pathCopyBtn = document.getElementById('btn-copy-install-path');
    if (pathCopyBtn) {
      pathCopyBtn.addEventListener('click', () => {
        const pathText = pathCopyBtn.getAttribute('data-path') || 'World of Warcraft\\_camelot_\\Interface\\AddOns\\';
        const copyFn = window.copyTextToClipboard || ((t, fn) => navigator.clipboard?.writeText(t).then(fn));
        copyFn(pathText, () => {
          pathCopyBtn.innerHTML = `<span>✓</span> Path Copied!`;
          setTimeout(() => {
            pathCopyBtn.innerHTML = `<span>📋</span> Copy Path`;
          }, 2000);
          if (window.showToast) {
            window.showToast('Addon directory path copied to clipboard!', 'success');
          }
        });
      });
    }
  }

  // Export & initialize
  window.initAddonHub = initAddonHub;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAddonHub);
  } else {
    initAddonHub();
  }
})();
