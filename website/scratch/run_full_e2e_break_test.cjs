const http = require('http');
const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

// Simple static server
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

async function runTests() {
  await new Promise(resolve => server.listen(8765, resolve));
  console.log('Test static server running on http://localhost:8765');

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  // Listen to console errors and warnings
  page.on('console', msg => {
    if (msg.type() === 'error') {
      console.error('[BROWSER ERROR]', msg.text());
    }
  });

  const failures = [];

  try {
    console.log('\n--- Test 1: Navigation to Professions & Category Collision Auto-Clear ---');
    await page.goto('http://localhost:8765/index.html');
    await page.waitForLoadState('networkidle');

    // Click Professions Tab
    await page.click('.nav-tab-btn[data-tab="professions"]');
    await page.waitForTimeout(300);

    // Click Leatherworking tile
    await page.click('.prof-tile-btn[data-slug="leatherworking"]');
    await page.waitForTimeout(300);

    // Type "Light Leather" in search input
    const searchInput = page.locator('#prof-search-input');
    await searchInput.fill('Light Leather');
    await page.waitForTimeout(300);

    const recipeCountBefore = await page.locator('.recipe-card').count();
    console.log(`Recipes matching "Light Leather" in All Categories: ${recipeCountBefore}`);

    // Click "Head (39)" category chip
    const headChip = page.locator('.prof-cat-chip[data-cat="Head"]');
    const chipText = await headChip.innerText();
    console.log(`Found Head category chip: "${chipText.trim()}"`);
    await headChip.click();
    await page.waitForTimeout(300);

    // Search query should now be cleared because Light Leather had 0 matches in Head
    const searchValAfter = await searchInput.inputValue();
    const recipeCountAfter = await page.locator('.recipe-card').count();
    console.log(`After clicking Head: search input = "${searchValAfter}", recipes count = ${recipeCountAfter}`);

    if (searchValAfter !== '') {
      failures.push({
        name: 'Auto-Clear conflicting search query',
        expected: 'Empty search input',
        actual: `"${searchValAfter}"`,
        rootCause: 'Search query was not cleared when category had 0 matches'
      });
    }

    if (recipeCountAfter !== 39) {
      failures.push({
        name: 'Head category recipe count',
        expected: '39 recipes',
        actual: `${recipeCountAfter} recipes`,
        rootCause: 'Not all 39 helmets were displayed'
      });
    }

    console.log('\n--- Test 2: Category Pill Re-Click Toggle to All Categories ---');
    // Re-click Head chip with empty search
    await headChip.click();
    await page.waitForTimeout(300);
    const activeCatAfterReclick = await page.locator('.prof-cat-chip.active').getAttribute('data-cat');
    console.log(`Active category after re-clicking Head chip: ${activeCatAfterReclick}`);
    if (activeCatAfterReclick !== 'all') {
      failures.push({
        name: 'Re-clicking active category toggles to all',
        expected: 'all',
        actual: activeCatAfterReclick,
        rootCause: 'Re-clicking active category pill did not toggle back to all'
      });
    }

    console.log('\n--- Test 3: Search with Partial Match in Category (Should NOT clear) ---');
    // Select Hands chip
    const handsChip = page.locator('.prof-cat-chip[data-cat="Hands"]');
    await handsChip.click();
    await page.waitForTimeout(300);
    // Type "Gloves"
    await searchInput.fill('Gloves');
    await page.waitForTimeout(300);
    const glovesCount = await page.locator('.recipe-card').count();
    console.log(`"Gloves" in Hands count: ${glovesCount}`);
    // Click Hands again (or click Chest which also has items)
    // Now click Chest (does it have "Gloves"? Probably 0, so should clear)
    const chestChip = page.locator('.prof-cat-chip[data-cat="Chest"]');
    await chestChip.click();
    await page.waitForTimeout(300);
    const searchAfterChest = await searchInput.inputValue();
    console.log(`Search after clicking Chest: "${searchAfterChest}"`);
    if (searchAfterChest !== '') {
      failures.push({
        name: 'Auto-clear on Chest without gloves',
        expected: '',
        actual: searchAfterChest,
        rootCause: 'Search query was not cleared'
      });
    }

    console.log('\n--- Test 4: Reagent Lookup Modal Hover Tooltips ---');
    // Clear search and select All categories in Leatherworking
    await page.click('.prof-cat-chip[data-cat="all"]');
    await page.waitForTimeout(300);

    // Find a recipe with "Medium Leather" and click the reagent chip
    const mediumLeatherChip = page.locator('.reagent-chip', { hasText: 'Medium Leather' }).first();
    await mediumLeatherChip.click();
    await page.waitForTimeout(400);

    const reagentModal = page.locator('#prof-reagent-lookup-modal');
    const isModalOpen = await reagentModal.evaluate(el => el.classList.contains('is-open') && !el.hasAttribute('hidden'));
    console.log(`Reagent modal open: ${isModalOpen}`);

    // Check recipe rows
    const firstRow = reagentModal.locator('.reagent-lookup-row').first();
    const firstIcon = firstRow.locator('.reagent-row-icon');
    const firstName = firstRow.locator('.reagent-row-name');

    // Hover icon
    await firstIcon.hover();
    await page.waitForTimeout(200);
    const tooltip = page.locator('#wow-item-tooltip');
    const isTooltipVisible1 = await tooltip.evaluate(el => el && el.style.display !== 'none' && el.innerHTML.length > 20);
    const tooltipHtml1 = await tooltip.innerHTML();
    console.log(`Tooltip visible on icon hover: ${isTooltipVisible1}`);

    if (!isTooltipVisible1) {
      failures.push({
        name: 'Tooltip on recipe icon hover in reagent modal',
        expected: 'Tooltip visible',
        actual: 'Tooltip hidden or empty',
        rootCause: 'Tooltip listener failed to trigger or render'
      });
    }

    // Hover out
    await page.mouse.move(0, 0);
    await page.waitForTimeout(200);
    const isTooltipHidden1 = await tooltip.evaluate(el => !el || el.style.display === 'none' || el.style.opacity === '0');
    console.log(`Tooltip hidden on mouse leave: ${isTooltipHidden1}`);

    // Hover name
    await firstName.hover();
    await page.waitForTimeout(200);
    const isTooltipVisible2 = await tooltip.evaluate(el => el && el.style.display !== 'none' && el.innerHTML.length > 20);
    console.log(`Tooltip visible on name hover: ${isTooltipVisible2}`);

    if (!isTooltipVisible2) {
      failures.push({
        name: 'Tooltip on recipe name hover in reagent modal',
        expected: 'Tooltip visible',
        actual: 'Tooltip hidden or empty',
        rootCause: 'Tooltip listener failed on name hover'
      });
    }

    console.log('\n--- Test 5: Reagent Modal Cross-Navigation & Return Pill ---');
    // Inside Medium Leather modal, click "View in Blacksmithing ›" (or Blacksmithing recipe row)
    const bsJumpBtn = reagentModal.locator('.reagent-jump-btn[data-slug="blacksmithing"]').first();
    const bsBtnCount = await bsJumpBtn.count();
    console.log(`Found Blacksmithing jump button: ${bsBtnCount > 0}`);

    if (bsBtnCount > 0) {
      await bsJumpBtn.click();
      await page.waitForTimeout(400);

      // Verify we are now in Blacksmithing
      const activeProfTile = await page.locator('.prof-tile-btn.active').getAttribute('data-slug');
      console.log(`Current active profession after jump: ${activeProfTile}`);

      // Verify Return Pill Button is rendered and visible
      const returnPill = page.locator('#wow-return-pill-btn');
      const isPillVisible = await returnPill.evaluate(el => el && el.style.display !== 'none' && !el.hasAttribute('hidden'));
      const pillText = await returnPill.innerText();
      console.log(`Return pill visible: ${isPillVisible}, text: "${pillText.trim()}"`);

      if (!isPillVisible) {
        failures.push({
          name: 'Floating Return Pill button visibility after cross-navigation',
          expected: 'Visible return pill button',
          actual: 'Hidden or missing',
          rootCause: 'Return target not set or pill button not displayed'
        });
      }

      // Click Return Pill Button!
      await returnPill.click();
      await page.waitForTimeout(500);

      // Verify we returned to Leatherworking and the Medium Leather modal re-opened
      const currentProfAfterReturn = await page.locator('.prof-tile-btn.active').getAttribute('data-slug');
      const isModalReopened = await page.locator('#prof-reagent-lookup-modal').evaluate(el => el.classList.contains('is-open'));
      console.log(`After Return pill click: prof = ${currentProfAfterReturn}, modal reopened = ${isModalReopened}`);

      if (currentProfAfterReturn !== 'leatherworking' || !isModalReopened) {
        failures.push({
          name: '1-click Return Pill restores prior profession and reagent modal',
          expected: 'Leatherworking with Medium Leather modal open',
          actual: `prof=${currentProfAfterReturn}, modalOpen=${isModalReopened}`,
          rootCause: 'executeReturn failed to restore modal or profession'
        });
      }

      // Close modal
      await page.click('#reagent-lookup-close-btn');
      await page.waitForTimeout(300);
    }

    console.log('\n--- Test 6: Cross-Profession Jump with Active Category (The Discovered Bug!) ---');
    // Set category to Head in Leatherworking
    await page.click('.prof-cat-chip[data-cat="Head"]');
    await page.waitForTimeout(300);
    // Open reagent modal for Medium Leather
    await page.locator('.reagent-chip', { hasText: 'Medium Leather' }).first().click();
    await page.waitForTimeout(300);
    // Click jump to Blacksmithing
    const bsJumpBtn2 = page.locator('#prof-reagent-lookup-modal .reagent-jump-btn[data-slug="blacksmithing"]').first();
    if (await bsJumpBtn2.count() > 0) {
      await bsJumpBtn2.click();
      await page.waitForTimeout(400);

      // Now check Blacksmithing recipes! Are they showing recipes, or 0 recipes ("No recipes found")?
      const bsRecipeCount = await page.locator('.recipe-card').count();
      const emptyMsg = await page.locator('.recipe-grid').innerText();
      console.log(`Blacksmithing recipe count after jumping with Head category active: ${bsRecipeCount}`);
      if (bsRecipeCount === 0) {
        console.error('BUG CONFIRMED: Blacksmithing has 0 recipes because currentCategory was still "head"!');
        failures.push({
          name: 'Category reset on profession cross-navigation',
          expected: '>0 recipes matching the jumped recipe',
          actual: '0 recipes ("' + emptyMsg.trim() + '")',
          rootCause: 'selectProfession does not reset currentCategory to "all", keeping stale category from previous profession'
        });
      }
    }

    console.log('\n--- Test 7: Browser Back/Forward Navigation Across Tabs & History ---');
    // Go to #overview
    await page.goto('http://localhost:8765/index.html');
    await page.waitForLoadState('networkidle');

    // Click Tab: Changes
    await page.click('.nav-tab-btn[data-tab="changes"]');
    await page.waitForTimeout(200);
    console.log('Navigated to #changes');

    // Click Tab: BiS
    await page.click('.nav-tab-btn[data-tab="bis"]');
    await page.waitForTimeout(200);
    console.log('Navigated to #bis');

    // Click Tab: Professions
    await page.click('.nav-tab-btn[data-tab="professions"]');
    await page.waitForTimeout(200);
    console.log('Navigated to #professions');

    // Browser Back (should go to #bis)
    await page.goBack();
    await page.waitForTimeout(300);
    const activeTab1 = await page.locator('.nav-tab-btn.active').getAttribute('data-tab');
    console.log(`After Back 1: active tab = ${activeTab1}, url hash = ${page.url().split('#')[1] || ''}`);

    if (activeTab1 !== 'bis') {
      failures.push({
        name: 'Browser Back button tab restoration (to bis)',
        expected: 'bis',
        actual: activeTab1,
        rootCause: 'popstate did not restore bis tab'
      });
    }

    // Browser Back (should go to #changes)
    await page.goBack();
    await page.waitForTimeout(300);
    const activeTab2 = await page.locator('.nav-tab-btn.active').getAttribute('data-tab');
    console.log(`After Back 2: active tab = ${activeTab2}, url hash = ${page.url().split('#')[1] || ''}`);

    if (activeTab2 !== 'changes') {
      failures.push({
        name: 'Browser Back button tab restoration (to changes)',
        expected: 'changes',
        actual: activeTab2,
        rootCause: 'popstate did not restore changes tab'
      });
    }

    // Browser Back (should go to #overview / initial tab)
    await page.goBack();
    await page.waitForTimeout(300);
    const activeTab3 = await page.locator('.nav-tab-btn.active').getAttribute('data-tab');
    const hash3 = page.url().split('#')[1] || '';
    console.log(`After Back 3 (to initial root): active tab = ${activeTab3}, url hash = ${hash3}`);

    if (activeTab3 !== 'overview') {
      failures.push({
        name: 'Browser Back button root tab restoration (to overview)',
        expected: 'overview',
        actual: activeTab3,
        rootCause: 'checkUrlHashTab returns early if !hash instead of restoring overview tab'
      });
    }

    console.log('\n--- Test 8: Modal Dismissal on Browser Back Button ---');
    // Open professions -> leatherworking
    await page.click('.nav-tab-btn[data-tab="professions"]');
    await page.waitForTimeout(200);
    await page.click('.prof-tile-btn[data-slug="leatherworking"]');
    await page.waitForTimeout(200);
    // Open reagent modal
    await page.locator('.reagent-chip', { hasText: 'Medium Leather' }).first().click();
    await page.waitForTimeout(300);
    const modalBeforeBack = await page.locator('#prof-reagent-lookup-modal').evaluate(el => el.classList.contains('is-open'));
    console.log(`Reagent modal open before back: ${modalBeforeBack}`);
    // Hit browser Back
    await page.goBack();
    await page.waitForTimeout(300);
    const modalAfterBack = await page.locator('#prof-reagent-lookup-modal').evaluate(el => el.classList.contains('is-open'));
    console.log(`Reagent modal open after back: ${modalAfterBack}`);
    if (modalAfterBack) {
      failures.push({
        name: 'Modal dismissal on browser back',
        expected: 'Modal closed (not is-open)',
        actual: 'Modal still open',
        rootCause: 'popstate listener did not dismiss modal'
      });
    }

    console.log('\n--- Test 9: Direct Recipe Card Click in Reagent Modal ---');
    // Re-open Leatherworking recipes
    await page.click('.nav-tab-btn[data-tab="professions"]');
    await page.waitForTimeout(200);
    await page.click('.prof-tile-btn[data-slug="leatherworking"]');
    await page.waitForTimeout(200);
    await page.locator('.reagent-chip', { hasText: 'Medium Leather' }).first().click();
    await page.waitForTimeout(300);

    // Click the main body of the first recipe row (not the jump button)
    const firstRowMain = page.locator('#prof-reagent-lookup-modal .reagent-lookup-row-main').first();
    const recipeTargetName = await firstRowMain.getAttribute('data-recipe-name');
    console.log(`Clicking recipe card row for: "${recipeTargetName}"`);
    await firstRowMain.click();
    await page.waitForTimeout(500);

    // Modal should be closed, return pill displayed, and target recipe highlighted
    const modalOpenAfterRowClick = await page.locator('#prof-reagent-lookup-modal').evaluate(el => el.classList.contains('is-open'));
    const pillVisibleAfterRowClick = await page.locator('#wow-return-pill-btn').evaluate(el => el && el.style.display !== 'none');
    console.log(`Modal closed: ${!modalOpenAfterRowClick}, Return pill visible: ${pillVisibleAfterRowClick}`);

    if (modalOpenAfterRowClick || !pillVisibleAfterRowClick) {
      failures.push({
        name: 'Direct recipe row click in reagent modal',
        expected: 'Modal closed and return pill visible',
        actual: `modalOpen=${modalOpenAfterRowClick}, pillVisible=${pillVisibleAfterRowClick}`,
        rootCause: 'Row click failed to close modal or set return target'
      });
    }

    console.log('\n--- Test 10: Return Pill Dismiss Button ---');
    const dismissBtn = page.locator('#wow-return-pill-btn .return-pill-dismiss');
    await dismissBtn.click();
    await page.waitForTimeout(200);
    const pillVisibleAfterDismiss = await page.locator('#wow-return-pill-btn').evaluate(el => el && el.style.display !== 'none');
    console.log(`Return pill visible after clicking dismiss: ${pillVisibleAfterDismiss}`);
    if (pillVisibleAfterDismiss) {
      failures.push({
        name: 'Return pill dismiss button',
        expected: 'Pill hidden',
        actual: 'Pill still visible',
        rootCause: 'Dismiss button failed to clear return target'
      });
    }

    console.log('\n--- Test 11: BiS Badge Click & Cross-Navigation ---');
    // Clear search and view Blacksmithing recipes
    const bsSearchInp = page.locator('#prof-search-input');
    await bsSearchInp.fill('');
    await page.waitForTimeout(300);
    await page.click('.prof-tile-btn[data-slug="blacksmithing"]');
    await page.waitForTimeout(400);
    // Find a recipe with .recipe-bis-badge (e.g. Lionheart Helm, Dark Iron, etc.)
    const bisBadge = page.locator('.recipe-bis-badge').first();
    const hasBisBadge = await bisBadge.count() > 0;
    console.log(`Found BiS badge on page: ${hasBisBadge}`);
    if (hasBisBadge) {
      await bisBadge.click();
      await page.waitForTimeout(500);
      const activeTabAfterBis = await page.locator('.nav-tab-btn.active').getAttribute('data-tab');
      const pillAfterBis = await page.locator('#wow-return-pill-btn').evaluate(el => el && el.style.display !== 'none');
      const pillTextAfterBis = await page.locator('#wow-return-pill-btn').innerText();
      console.log(`After BiS badge click: active tab = ${activeTabAfterBis}, return pill text = "${pillTextAfterBis.trim()}"`);
      if (activeTabAfterBis !== 'bis' || !pillAfterBis) {
        failures.push({
          name: 'BiS badge navigation and return pill target',
          expected: 'Navigated to BiS with return pill visible',
          actual: `tab=${activeTabAfterBis}, pillVisible=${pillAfterBis}`,
          rootCause: 'BiS badge click failed to navigate or set return target'
        });
      }
    } else {
      failures.push({
        name: 'BiS badge presence on Blacksmithing recipes',
        expected: 'At least 1 BiS badge',
        actual: '0 BiS badges',
        rootCause: 'BiS lookup map or recipe match failed'
      });
    }

  } catch (err) {
    console.error('Test execution error:', err);
    failures.push({
      name: 'Fatal Test Execution Error',
      expected: 'No error',
      actual: err.message,
      rootCause: err.stack
    });
  } finally {
    await browser.close();
    server.close();
  }

  console.log('\n=======================================');
  console.log(`Test finished with ${failures.length} failures.`);
  failures.forEach(f => {
    console.log(`\n❌ [${f.name}]`);
    console.log(`   Expected:   ${f.expected}`);
    console.log(`   Actual:     ${f.actual}`);
    console.log(`   Root Cause: ${f.rootCause}`);
  });
  console.log('=======================================');

  process.exit(failures.length > 0 ? 1 : 0);
}

runTests();
