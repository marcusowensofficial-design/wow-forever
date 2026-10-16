#!/usr/bin/env node
/* global process, console */

/**
 * WoW Forever Beta Build 1.60.1.70425 Master E2E Test Runner
 *
 * Executes the 4-tier requirement-driven opaque-box test suite against runtime datasets.
 * Exit Code: 0 on all passed, 1 on any failure.
 */

import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadAllData } from './helpers/loader.js';
import { TestCollector } from './helpers/assertions.js';
import { runTier1Tests } from './suites/tier1_features.test.js';
import { runTier2Tests } from './suites/tier2_boundaries.test.js';
import { runTier3Tests } from './suites/tier3_combinations.test.js';
import { runTier4Tests } from './suites/tier4_scenarios.test.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');

// CLI options
const args = process.argv.slice(2);
const tierArg = args.find(a => a.startsWith('--tier='));
const targetTier = tierArg ? parseInt(tierArg.split('=')[1], 10) : null;
const isVerbose = args.includes('--verbose') || args.includes('-v');

console.log('======================================================================');
console.log('   WOW FOREVER — BETA BUILD 1.60.1.70425 E2E TEST SUITE RUNNER');
console.log('======================================================================');
console.log(`Execution Mode: ${targetTier ? `Tier ${targetTier} Only` : 'All 4 Tiers'}`);
console.log(`Working Directory: ${ROOT}`);
console.log(`Timestamp: ${new Date().toISOString()}\n`);

// 1. Load datasets
console.log('Loading datasets into isolated VM sandbox...');
const startTime = Date.now();
const data = loadAllData(ROOT);
console.log(`✓ Datasets loaded in ${Date.now() - startTime}ms:\n  - Classes in talentsData: ${Object.keys(data.talentsData).length}\n  - Playable races: ${data.racesData.length}\n  - Changes entries: ${data.changesJson?.entries?.length || 0}\n  - Client build: ${data.coreData?.metadata?.clientBuild || 'unknown'}\n  - Deepdives loaded: ${Object.keys(data.deepdives).length}\n`);

// 2. Initialize collectors
const collectors = {
  tier1: new TestCollector('Tier 1: Feature Coverage (26 Features)'),
  tier2: new TestCollector('Tier 2: Boundary & Corner Cases'),
  tier3: new TestCollector('Tier 3: Cross-Feature Combinations'),
  tier4: new TestCollector('Tier 4: Real-World Scenarios & Deep Dives')
};

// 3. Execute requested test tiers
if (!targetTier || targetTier === 1) {
  runTier1Tests(collectors.tier1, data);
}
if (!targetTier || targetTier === 2) {
  runTier2Tests(collectors.tier2, data);
}
if (!targetTier || targetTier === 3) {
  runTier3Tests(collectors.tier3, data);
}
if (!targetTier || targetTier === 4) {
  runTier4Tests(collectors.tier4, data);
}

// 4. Print results & summaries
let grandTotal = 0;
let grandPassed = 0;
let grandFailed = 0;
const failures = [];

const activeTiers = targetTier ? [`tier${targetTier}`] : ['tier1', 'tier2', 'tier3', 'tier4'];

for (const key of activeTiers) {
  const c = collectors[key];
  const summary = c.getSummary();
  grandTotal += summary.total;
  grandPassed += summary.passes;
  grandFailed += summary.failures;

  console.log(`----------------------------------------------------------------------`);
  console.log(` Suite: ${summary.suiteName}`);
  console.log(` Tests: ${summary.total} | Passed: ${summary.passes} | Failed: ${summary.failures} (${summary.duration}ms)`);
  console.log(`----------------------------------------------------------------------`);

  for (const t of summary.tests) {
    if (t.status === 'pass') {
      if (isVerbose) {
        console.log(`  ✓ ${t.name} (${t.duration}ms)`);
      }
    } else {
      console.log(`  ✗ ${t.name} (${t.duration}ms)`);
      console.log(`    Error: ${t.message}`);
      failures.push({
        suite: summary.suiteName,
        name: t.name,
        error: t.message
      });
    }
  }
  console.log('');
}

console.log('======================================================================');
console.log('   E2E TEST RUN SUMMARY');
console.log('======================================================================');
console.log(`Total Test Assertions: ${grandTotal}`);
console.log(`Passed Assertions:     ${grandPassed}`);
console.log(`Failed Assertions:     ${grandFailed}`);
console.log(`Total Elapsed Time:    ${Date.now() - startTime}ms`);
console.log('======================================================================\n');

if (grandFailed > 0) {
  console.log(`⚠️  ${grandFailed} test(s) failed out of ${grandTotal}.\n`);
  console.log('FAILED TEST DETAILS:');
  failures.forEach((f, idx) => {
    console.log(`  [${idx + 1}] ${f.suite} -> ${f.name}`);
    console.log(`      ${f.error}`);
  });
  console.log('\nExiting with code 1.\n');
  process.exit(1);
} else {
  console.log(`🎉 ALL ${grandTotal} E2E TESTS PASSED SUCCESSFULLY!`);
  console.log('Exiting with code 0.\n');
  process.exit(0);
}
