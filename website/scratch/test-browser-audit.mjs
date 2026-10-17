import { chromium } from 'playwright';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

(async () => {
  try {
    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext({
      viewport: { width: 1440, height: 900 }
    });
    const page = await context.newPage();
    const errors = [];
    const warnings = [];
    const failedRequests = [];

    page.on('console', msg => {
      if (msg.type() === 'error') errors.push(msg.text());
      if (msg.type() === 'warning') warnings.push(msg.text());
    });
    page.on('pageerror', err => errors.push(err.message));
    page.on('requestfailed', req => {
      // Ignore external icon CDN failures if offline, but note local files
      failedRequests.push(`${req.url()} (${req.failure()?.errorText || 'failed'})`);
    });

    const indexPath = 'file:///' + path.resolve(__dirname, '../index.html').replace(/\\/g, '/');
    console.log('Navigating to', indexPath);
    await page.goto(indexPath, { waitUntil: 'load' });

    console.log('Page loaded successfully. Gathering tabs...');
    const tabs = await page.$$eval('.nav-tab-btn', btns => btns.map(b => b.getAttribute('data-tab')));
    console.log(`Found ${tabs.length} tabs:`, tabs.join(', '));

    for (const tab of tabs) {
      if (!tab) continue;
      const btn = await page.$(`.nav-tab-btn[data-tab="${tab}"]`);
      if (btn) {
        await btn.click();
        await page.waitForTimeout(60);
      }
    }

    console.log('\n=======================================');
    console.log('PAGE AUDIT REPORT');
    console.log('=======================================');
    console.log('Console Errors:', errors.length);
    errors.forEach(e => console.log('  ❌ ERROR:', e));
    console.log('Console Warnings:', warnings.length);
    warnings.slice(0, 10).forEach(w => console.log('  ⚠️ WARN:', w));
    console.log('Failed Requests:', failedRequests.length);
    failedRequests.slice(0, 15).forEach(f => console.log('  🌐 FAILED:', f));

    // Check broken images
    const brokenImages = await page.evaluate(() => {
      const imgs = Array.from(document.querySelectorAll('img'));
      return imgs
        .filter(img => !img.complete || img.naturalWidth === 0)
        .map(img => img.src || img.getAttribute('src'));
    });
    console.log(`Broken Images (${brokenImages.length}):`);
    brokenImages.slice(0, 15).forEach(src => console.log('  🖼️ BROKEN:', src));

    await browser.close();
  } catch (err) {
    console.error('Audit execution failed:', err);
  }
})();
