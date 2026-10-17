const http = require('http');
const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

const mimeTypes = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.css': 'text/css',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml'
};

const server = http.createServer((req, res) => {
  let reqPath = decodeURIComponent(req.url.split('?')[0]);
  if (reqPath === '/' || reqPath === '') reqPath = '/index.html';
  const filePath = path.join(__dirname, '..', reqPath);

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Not Found: ' + reqPath);
      return;
    }
    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, { 'Content-Type': mimeTypes[ext] || 'application/octet-stream' });
    fs.createReadStream(filePath).pipe(res);
  });
});

async function run() {
  await new Promise(resolve => server.listen(8766, resolve));
  console.log('Server running on http://localhost:8766');

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  page.on('console', msg => {
    if (msg.type() === 'error') {
      console.error('[PAGE ERROR]', msg.text());
    }
  });

  const failures = [];
  function assert(cond, msg) {
    if (!cond) {
      console.error(`FAIL: ${msg}`);
      failures.push(msg);
    } else {
      console.log(`PASS: ${msg}`);
    }
  }

  try {
    await page.goto('http://localhost:8766/#professions', { waitUntil: 'networkidle' });
    await page.waitForTimeout(1000);

    const profSlugs = [
      'alchemy', 'blacksmithing', 'enchanting', 'engineering',
      'leatherworking', 'tailoring', 'mining', 'herbalism',
      'skinning', 'cooking', 'fishing', 'first-aid', 'camping'
    ];

    let totalCraftStepsChecked = 0;

    for (const slug of profSlugs) {
      console.log(`\n--- Auditing Profession: ${slug} ---`);
      await page.evaluate((s) => {
        if (window.WOW_PROFESSIONS?.selectProfession) {
          window.WOW_PROFESSIONS.selectProfession(s, 'leveling');
        }
      }, slug);
      await page.waitForTimeout(400);

      const craftStepRows = await page.$$('.leveling-step-row[data-step-idx]');
      console.log(`Found ${craftStepRows.length} craft step rows in ${slug}`);

      for (let i = 0; i < craftStepRows.length; i++) {
        const row = craftStepRows[i];
        totalCraftStepsChecked++;

        // 1. Check .step-recipe-header
        const header = await row.$('.step-recipe-header');
        assert(header !== null, `${slug} step ${i}: .step-recipe-header exists`);

        // 2. Check .step-crafted-icon-wrap
        const iconWrap = await row.$('.step-crafted-icon-wrap');
        assert(iconWrap !== null, `${slug} step ${i}: .step-crafted-icon-wrap exists`);

        if (iconWrap) {
          const wrapClasses = await iconWrap.getAttribute('class');
          assert(/q[1-4]/.test(wrapClasses), `${slug} step ${i}: icon wrap has quality class (${wrapClasses})`);

          // 3. Check img inside wrap
          const img = await iconWrap.$('img.step-crafted-icon');
          assert(img !== null, `${slug} step ${i}: img.step-crafted-icon exists`);
          if (img) {
            const src = await img.getAttribute('src');
            assert(Boolean(src && src.startsWith('http') && !src.includes('questionmark')), `${slug} step ${i}: valid icon src (${src})`);
          }
        }

        // 4. Check .step-recipe-name
        const nameEl = await row.$('.step-recipe-name');
        assert(nameEl !== null, `${slug} step ${i}: .step-recipe-name exists`);
        if (nameEl) {
          const nameClasses = await nameEl.getAttribute('class');
          assert(/q[1-4]/.test(nameClasses), `${slug} step ${i}: recipe name has quality class (${nameClasses})`);
        }
      }
    }

    console.log(`\nTotal craft steps verified across all professions: ${totalCraftStepsChecked}`);
    assert(totalCraftStepsChecked === 169, `Checked exactly 169 craft steps across all 13 professions`);

    // --- Interactive Tooltip Verification ---
    console.log(`\n--- Testing Interactive Tooltip on Hover ---`);
    await page.evaluate(() => {
      window.WOW_PROFESSIONS.selectProfession('blacksmithing', 'leveling');
    });
    await page.waitForTimeout(300);

    const firstIconWrap = await page.$('.step-crafted-icon-wrap');
    assert(firstIconWrap !== null, `Found first .step-crafted-icon-wrap in blacksmithing`);

    // Hover over icon wrap
    await firstIconWrap.hover();
    await page.waitForTimeout(300);

    const tooltip = await page.$('#wow-item-tooltip');
    assert(tooltip !== null, `#wow-item-tooltip element exists`);
    const isVisible = await tooltip.isVisible();
    assert(isVisible === true, `Tooltip is visible on icon hover`);
    const tooltipText = await tooltip.innerText();
    console.log('Tooltip content on hover:\n' + tooltipText);
    assert(tooltipText.includes('Sharpening Stone') || tooltipText.includes('Rough') || tooltipText.includes('Blacksmithing'), `Tooltip contains item name/metadata`);

    // Unhover
    await page.mouse.move(0, 0);
    await page.waitForTimeout(200);
    const hiddenAfterLeave = !(await tooltip.isVisible());
    assert(hiddenAfterLeave, `Tooltip hides on mouseleave`);

    // Hover over recipe name
    const firstName = await page.$('.step-recipe-name');
    await firstName.hover();
    await page.waitForTimeout(300);
    const visibleOnName = await tooltip.isVisible();
    assert(visibleOnName, `Tooltip is visible on recipe name hover`);

    // --- Click & Return Pill Verification ---
    console.log(`\n--- Testing Click Navigation & Return Pill ---`);
    await page.mouse.move(0, 0);
    await page.waitForTimeout(200);

    // Click icon wrap to jump to recipe
    await firstIconWrap.click();
    await page.waitForTimeout(500);

    // Verify Return Pill is active and visible
    const returnPill = await page.$('#wow-return-pill-btn');
    assert(returnPill !== null, `Return Pill button exists`);
    const pillVisible = await returnPill.isVisible();
    assert(pillVisible === true, `Return Pill button is visible after jump`);
    const pillText = await returnPill.innerText();
    console.log('Return pill text: ' + pillText.replace(/\n/g, ' '));
    assert(pillText.includes('Return to') && pillText.includes('Blacksmithing'), `Return Pill has correct label for leveling roadmap`);

    // Click Return Pill
    await returnPill.click();
    await page.waitForTimeout(500);

    const currentSubtab = await page.evaluate(() => {
      const activeSubtabBtn = document.querySelector('.prof-subnav-btn.active');
      return activeSubtabBtn ? activeSubtabBtn.getAttribute('data-subtab') : '';
    });
    console.log('Subtab after clicking Return Pill: ' + currentSubtab);
    assert(currentSubtab === 'leveling', `Clicking Return Pill returned user directly to 'leveling' subtab`);

    // --- Keyboard accessibility test ---
    console.log(`\n--- Testing Keyboard Accessibility (Focus / Enter / Space) ---`);
    const secondIconWrap = (await page.$$('.step-crafted-icon-wrap'))[1];
    if (secondIconWrap) {
      await secondIconWrap.focus();
      await page.waitForTimeout(300);
      const isVisibleOnFocus = await tooltip.isVisible();
      assert(isVisibleOnFocus, `Tooltip is visible on keyboard focus`);
      const focusText = await tooltip.innerText();
      assert(focusText.length > 0, `Keyboard focus tooltip displays rich item details`);

      await page.keyboard.press('Enter');
      await page.waitForTimeout(500);
      const pillAfterKey = await page.$eval('#wow-return-pill-btn', el => el.style.display !== 'none' && !el.hasAttribute('hidden'));
      assert(pillAfterKey, `Pressing Enter on icon wrap navigates and displays Return Pill`);

      // Return back
      await (await page.$('#wow-return-pill-btn')).click();
      await page.waitForTimeout(400);
    }

    // --- Camping Specific Tooltip Header & Jump Verification ---
    console.log(`\n--- Testing Camping Station Tooltip Title & Jump ---`);
    await page.evaluate(() => {
      window.WOW_PROFESSIONS.selectProfession('camping', 'leveling');
    });
    await page.waitForTimeout(400);

    const campingIconWraps = await page.$$('.step-crafted-icon-wrap');
    if (campingIconWraps.length > 9) {
      await campingIconWraps[9].hover();
      await page.waitForTimeout(300);
      const cauldronText = await tooltip.innerText();
      console.log('Camping step 9 tooltip header: ' + cauldronText.split('\n')[0]);
      assert(cauldronText.includes('Field Alchemy Cauldron'), `Step 9 tooltip header is 'Field Alchemy Cauldron' (not generic 'Fermenter')`);

      // Click step 9 to verify subtab and highlight
      await campingIconWraps[9].click();
      await page.waitForTimeout(500);
      const campSubtab = await page.evaluate(() => document.querySelector('.prof-subnav-btn.active')?.getAttribute('data-subtab'));
      assert(campSubtab === 'upgrades', `Clicking Field Alchemy Cauldron switched to 'upgrades' subtab`);
      const highlightedCard = await page.evaluate(() => document.querySelector('.recipe-card-highlight')?.getAttribute('data-item-name'));
      assert(highlightedCard === 'Fermenter', `Clicking Field Alchemy Cauldron correctly highlighted Fermenter workstation`);

      // Return back to camping roadmap
      await (await page.$('#wow-return-pill-btn')).click();
      await page.waitForTimeout(400);
    }

    // --- Mobile Responsive Viewport Test ---
    console.log(`\n--- Testing Mobile Responsive Layout (375px) ---`);
    await page.setViewportSize({ width: 375, height: 667 });
    await page.waitForTimeout(400);

    const iconSize = await page.evaluate(() => {
      const icon = document.querySelector('.step-crafted-icon-wrap');
      if (!icon) return null;
      const rect = icon.getBoundingClientRect();
      return { width: Math.round(rect.width), height: Math.round(rect.height) };
    });
    console.log('Mobile icon dimensions: ', iconSize);
    assert(iconSize && iconSize.width === 32 && iconSize.height === 32, `Icon dimensions scale down to 32px x 32px on mobile`);

    // Verify no document horizontal scroll overflow
    const hasOverflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth;
    });
    assert(!hasOverflow, `No horizontal document overflow on mobile`);

  } finally {
    await browser.close();
    server.close();
  }

  console.log(`\n========================================`);
  console.log(`E2E TEST RESULT: ${failures.length} failures`);
  if (failures.length > 0) {
    console.error(`FAILURES:\n` + failures.map(f => ' - ' + f).join('\n'));
    process.exit(1);
  } else {
    console.log(`ALL 169 CRAFT STEPS AND TOOLTIPS VERIFIED PERFECTLY!`);
  }
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
