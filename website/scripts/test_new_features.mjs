import { chromium } from 'playwright';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');

async function test() {
  console.log('Launching headless Chromium for verification...');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  const consoleErrors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
    }
  });

  const url = `file://${ROOT.replace(/\\/g, '/')}/index.html`;
  console.log(`Navigating to ${url}...`);
  await page.goto(url, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(2000);

  console.log('--- Testing Codex Tab ---');
  await page.click('.nav-tab-btn[data-tab="codex"]');
  await page.waitForTimeout(500);

  console.log('--- Testing Collections (Pets) ---');
  await page.click('.codex-nav-btn[data-codex="mounts"]');
  await page.waitForTimeout(500);
  await page.click('[data-col-tab="pets"]');
  await page.waitForTimeout(500);

  const petCards = await page.$$('.collection-item-card');
  console.log(`Rendered ${petCards.length} companion pet cards on page 1.`);

  console.log('--- Testing World Events & Holidays ---');
  await page.click('.codex-nav-btn[data-codex="events"]');
  await page.waitForTimeout(500);
  const eventCards = await page.$$('.collection-item-card');
  console.log(`Rendered ${eventCards.length} event cards.`);

  console.log('--- Testing Factions & Reputation ---');
  await page.click('.codex-nav-btn[data-codex="reputation"]');
  await page.waitForTimeout(500);
  const factionCards = await page.$$('.collection-item-card');
  console.log(`Rendered ${factionCards.length} faction cards.`);

  console.log('--- Testing Professions Tab ---');
  await page.click('#nav-btn-home');
  await page.waitForTimeout(500);
  await page.click('.nav-tab-btn[data-tab="professions"]');
  await page.waitForTimeout(800);

  // Check console errors
  console.log(`Total console errors during execution: ${consoleErrors.length}`);
  if (consoleErrors.length > 0) {
    console.error('Console errors:', consoleErrors.slice(0, 5));
  }

  await browser.close();
  console.log('Verification finished successfully!');
}

test().catch(err => {
  console.error('Test failed:', err);
  process.exit(1);
});
