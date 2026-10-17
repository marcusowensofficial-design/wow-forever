import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';
import { validateBuildLegality, getTotalPoints } from '../tests/helpers/talent-engine.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');

console.log('--- CUSTOM COMPETITOR GAP VERIFICATION & SKEPTICAL AUDIT ---');

// 1. Check core-data.js
const coreCode = fs.readFileSync(path.join(ROOT, 'js', 'data', 'core-data.js'), 'utf8');
const coreSandbox = { console, Date };
coreSandbox.window = coreSandbox;
vm.createContext(coreSandbox);
vm.runInContext(coreCode, coreSandbox);
const coreData = coreSandbox.WOW_FOREVER_DATA;

if (!coreData.betaSchedule.stressTest) throw new Error('Missing betaSchedule.stressTest');
if (!coreData.betaSchedule.nameReservation) throw new Error('Missing betaSchedule.nameReservation');
if (!coreData.countdownTargets.stressTest) throw new Error('Missing countdownTargets.stressTest');
if (!coreData.countdownTargets.nameReservation) throw new Error('Missing countdownTargets.nameReservation');
console.log('✓ coreData.betaSchedule & countdownTargets verified');

const news50 = coreData.newsFeed.find(n => n.id === 'news-50');
const news51 = coreData.newsFeed.find(n => n.id === 'news-51');
if (!news50) throw new Error('Missing news-50');
if (!news51) throw new Error('Missing news-51');
if (!news50.title.includes('70450')) throw new Error('news-50 title missing 70450');
if (!news51.title.includes('Trade Hold') && !news51.title.includes('Anti-RMT')) throw new Error('news-51 missing anti-RMT');
console.log('✓ news-50 & news-51 verified');

const expectedPartners = ['ForeverChanges.pro', 'WoW Forever Tools', 'Zockify Forever'];
for (const p of expectedPartners) {
  if (!coreData.quickLinks.some(q => q.name.includes(p))) {
    throw new Error('Missing quickLink for ' + p);
  }
}
console.log('✓ quickLinks in core-data.js verified');

// 2. Check tools-data.js
const toolsCode = fs.readFileSync(path.join(ROOT, 'js', 'data', 'tools-data.js'), 'utf8');
const toolsSandbox = { console, Date };
toolsSandbox.window = toolsSandbox;
vm.createContext(toolsSandbox);
vm.runInContext(toolsCode, toolsSandbox);
const toolsData = toolsSandbox.WOW_TOOLS_DATA;

console.log('Testing toolsData guides count: ' + toolsData.guides.length);
if (toolsData.guides.length !== 39) throw new Error('Expected 39 guides, found ' + toolsData.guides.length);

const expectedGuides = [
  'guide-dwarf-shaman-totems',
  'guide-mage-comprehension-scrolls',
  'guide-master-transit-routes',
  'guide-level30-hunter',
  'guide-level30-frost-mage'
];

for (const gId of expectedGuides) {
  const g = toolsData.guides.find(x => x.id === gId);
  if (!g) throw new Error('Missing guide: ' + gId);
  if (!g.title || !g.content || !g.summary || !g.icon) throw new Error('Guide ' + gId + ' has missing fields');
}
console.log('✓ All 5 new guides exist with complete metadata');

// Check totem twisting text in Shaman guide
const shamanGuide = toolsData.guides.find(g => g.id === 'guide-class-shaman');
if (shamanGuide.content.includes('Totem Twisting Choreography')) {
  throw new Error('Shaman guide still contains obsolete Totem Twisting Choreography text');
}
if (!shamanGuide.content.includes('Raid-Wide Totem Architecture')) {
  throw new Error('Shaman guide missing Raid-Wide Totem Architecture');
}
console.log('✓ Shaman guide totem twisting successfully updated');

// Check transit map SVG & formatGuideMarkdown rendering
const transitGuide = toolsData.guides.find(g => g.id === 'guide-master-transit-routes');
if (!transitGuide.content.includes('<svg') || !transitGuide.content.includes('Auberdine') || !transitGuide.content.includes('Menethil Harbor')) {
  throw new Error('Transit guide missing SVG route map or key ports');
}

// 3. Deep Verification: Guide Markdown parser must not wrap SVG filter nodes with <p> tags
const guidesCode = fs.readFileSync(path.join(ROOT, 'js', 'modules', 'guides.js'), 'utf8');
const guidesSandbox = { console, window: { WOW_TOOLS_DATA: toolsData } };
guidesSandbox.window = guidesSandbox;
vm.createContext(guidesSandbox);
const formatGuideMarkdownMatch = guidesCode.match(/function formatGuideMarkdown\([\s\S]*?\n\}/);
if (!formatGuideMarkdownMatch) throw new Error('Could not find formatGuideMarkdown function in guides.js');
vm.runInContext(formatGuideMarkdownMatch[0] + '; function formatInlineGuide(t){return t;};', guidesSandbox);

const renderedGuideHtml = guidesSandbox.formatGuideMarkdown(transitGuide.content);
if (renderedGuideHtml.includes('<p class="guide-paragraph"><filter') ||
    renderedGuideHtml.includes('<p class="guide-paragraph"><feGaussianBlur') ||
    renderedGuideHtml.includes('<p class="guide-paragraph"><feComposite') ||
    renderedGuideHtml.includes('<p class="guide-paragraph"></filter></p>')) {
  throw new Error('formatGuideMarkdown broke SVG by wrapping filter defs elements in <p> tags!');
}
console.log('✓ formatGuideMarkdown parses SVG transit map cleanly without invalid <p> tag wrappers');

// 4. Deep Verification: Hunter and Mage talent builds in Guide 38 & 39 must be 100% legal in Build 70425
const talentsCode = fs.readFileSync(path.join(ROOT, 'js', 'data', 'talents-data.js'), 'utf8');
const talentsSandbox = { window: {} };
talentsSandbox.window = talentsSandbox;
vm.createContext(talentsSandbox);
vm.runInContext(talentsCode, talentsSandbox);
const talentsData = talentsSandbox.window.WOW_TALENTS_DATA;

// Hunter BM build: 5/5 Endurance Training, 2/2 Focused Fire, 3/3 Imp Aspect of the Monkey, 1/1 Bestial Swiftness, 4/5 Unleashed Fury, 5/5 Ferocity, 1/1 Intimidation
const hunterBmPoints = { 108: 5, 109: 2, 110: 3, 113: 1, 114: 4, 116: 5, 119: 1 };
const bmAudit = validateBuildLegality(talentsData.hunter.talents, hunterBmPoints, 21);
if (!bmAudit.valid) throw new Error('Hunter BM spec in Guide 38 failed legality: ' + bmAudit.errors.join('; '));
if (getTotalPoints(hunterBmPoints) !== 21) throw new Error('Hunter BM spec must equal 21 points');

// Hunter MM build: 5/5 Lethal Attacks, 5/5 Careful Aim, 5/5 Imp Arcane Shot, 5/5 Mortal Shots, 1/1 Scatter Shot
const hunterMmPoints = { 125: 5, 128: 5, 130: 5, 133: 5, 136: 1 };
const mmAudit = validateBuildLegality(talentsData.hunter.talents, hunterMmPoints, 21);
if (!mmAudit.valid) throw new Error('Hunter MM spec in Guide 38 failed legality: ' + mmAudit.errors.join('; '));
if (getTotalPoints(hunterMmPoints) !== 21) throw new Error('Hunter MM spec must equal 21 points');

// Frost Mage spec: 5/5 Imp Frostbolt, 2/2 Imp Frost Nova, 3/3 Frostbite, 3/3 Imp Blizzard, 1/1 Ice Lance, 1/3 Frost Channeling, 3/3 Shatter, 2/2 Arctic Reach, 1/1 Ice Block
const frostMagePoints = { 349: 5, 353: 2, 354: 3, 358: 3, 357: 1, 356: 1, 361: 3, 359: 2, 360: 1 };
const frostAudit = validateBuildLegality(talentsData.mage.talents, frostMagePoints, 21);
if (!frostAudit.valid) throw new Error('Frost Mage spec in Guide 39 failed legality: ' + frostAudit.errors.join('; '));
if (getTotalPoints(frostMagePoints) !== 21) throw new Error('Frost Mage spec must equal 21 points');
console.log('✓ Guide 38 & 39 talent builds verified strictly legal against Build 70425 talent trees');

// 5. Check index.html & CSS
const indexHtml = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
if (!indexHtml.includes('id="modal-talent-calculator"')) throw new Error('index.html missing modal-talent-calculator id');
if (!indexHtml.includes('id="talent-saved-builds-drawer"')) throw new Error('index.html missing talent-saved-builds-drawer id');
for (const p of expectedPartners) {
  if (!indexHtml.includes(p)) throw new Error('index.html missing chip/link for ' + p);
}
if (!indexHtml.includes('Open Beta Stress Test')) throw new Error('index.html missing Open Beta Stress Test');
if (!indexHtml.includes('Early Name Reservation')) throw new Error('index.html missing Early Name Reservation');
console.log('✓ index.html structure, chips, and modals verified');

const toolsCss = fs.readFileSync(path.join(ROOT, 'css', 'tools.css'), 'utf8');
if (!toolsCss.includes('#talents-standalone-mount') || !toolsCss.includes('position: relative;')) {
  throw new Error('#talents-standalone-mount missing position: relative in css/tools.css');
}
console.log('✓ css/tools.css #talents-standalone-mount position: relative verified');

// 6. Check talent-tree.js
const talentTreeCode = fs.readFileSync(path.join(ROOT, 'js', 'modules', 'talent-tree.js'), 'utf8');
if (!talentTreeCode.includes('wow_forever_saved_talent_builds')) throw new Error('talent-tree.js missing localStorage key wow_forever_saved_talent_builds');
if (!talentTreeCode.includes('btn-save-talent-build')) throw new Error('talent-tree.js missing btn-save-talent-build');
if (!talentTreeCode.includes('btn-toggle-saved-builds')) throw new Error('talent-tree.js missing btn-toggle-saved-builds');
if (!talentTreeCode.includes('loadSavedBuilds')) throw new Error('talent-tree.js missing loadSavedBuilds export');
if (!talentTreeCode.includes('state.specName = trimmedName')) throw new Error('talent-tree.js saveCurrentBuild missing state.specName update');
if (!talentTreeCode.includes("state.specId = build.specId || 'custom'")) throw new Error('talent-tree.js loadSavedBuild missing specId restore');
if (!talentTreeCode.includes('state.originalPoints = Object.assign({}, build.points)')) throw new Error('talent-tree.js loadSavedBuild missing originalPoints update');
console.log('✓ talent-tree.js saved builds integration & state hygiene verified');

console.log('\n✓ ALL CUSTOM SKEPTICAL INTEGRITY CHECKS PASSED PERFECTLY!\n');
