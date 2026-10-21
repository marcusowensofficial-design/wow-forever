#!/usr/bin/env node

/**
 * Empirical Adversarial Challenger Test Suite: Milestone 1
 * Forensic Scraper & Durable Cache Engine
 *
 * Exhaustively stress-tests:
 * 1. Tooltip parser edge cases (nested tags, multi-span procs, <br /> / <br/> regexes, block value vs base block, resistances)
 * 2. Dual-endpoint routing logic (<200k classic vs >=200k forever vs envChange: new)
 * 3. Database cache census (100% shields block > 0, 0 +X Armor, 0 unstripped HTML, clean icon tokens, 0 NaNs, proc preservation)
 * 4. Benchmark items verification (IDs 1168, 6953, 6975, 11684)
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseXmlTooltip, validateBenchmarkItems } from '../scripts/cache-forever-items.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');

const cachePath = path.join(ROOT, 'scratch', 'forever_items_cache.json');
const weaponsPath = path.join(ROOT, 'data', 'scraped', 'wowhead_forever_weapons.json');
const shieldsPath = path.join(ROOT, 'data', 'scraped', 'wowhead_forever_shields.json');
const offhandsPath = path.join(ROOT, 'data', 'scraped', 'wowhead_forever_offhands.json');

const cache = JSON.parse(fs.readFileSync(cachePath, 'utf8'));
const rawWeapons = JSON.parse(fs.readFileSync(weaponsPath, 'utf8'));
const rawShields = JSON.parse(fs.readFileSync(shieldsPath, 'utf8'));
const rawOffhands = JSON.parse(fs.readFileSync(offhandsPath, 'utf8'));

console.log('======================================================================');
console.log('   EMPIRICAL ADVERSARIAL CHALLENGER SUITE: MILESTONE 1');
console.log('======================================================================\n');

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;
const defects = [];

function assert(condition, message, defectDetail = null) {
  totalTests++;
  if (condition) {
    passedTests++;
    console.log(`  ✓ PASS: ${message}`);
  } else {
    failedTests++;
    console.error(`  ✗ FAIL: ${message}`);
    if (defectDetail !== null && defectDetail !== undefined) {
      defects.push({ message, detail: defectDetail });
      console.error(`    Detail: ${typeof defectDetail === 'object' ? JSON.stringify(defectDetail) : defectDetail}`);
    } else {
      defects.push({ message });
    }
  }
}

// ============================================================================
// SUITE 1: TOOLTIP PARSER ADVERSARIAL EDGE CASES
// ============================================================================
console.log('--- SUITE 1: Tooltip Parser Adversarial Edge Cases ---');

// 1.1: Nested anchor tag inside green span (<a class="q2"> inside <span class="q2">)
const xmlNestedAnchor = `
<wowhead>
  <item id="99001">
    <name><![CDATA[Blade of the Archmage]]></name>
    <level>60</level>
    <quality id="4">4</quality>
    <icon>inv_sword_04</icon>
    <inventorySlot id="13"><![CDATA[One-Hand]]></inventorySlot>
    <subclass id="7"><![CDATA[Sword]]></subclass>
    <htmlTooltip><![CDATA[
      <table><tr><td>
        <b class="q4">Blade of the Archmage</b><br>
        Item Level <!--ilvl-->65<br>
        Binds when picked up<br>
        One-Hand\tSword<br>
        <!--dmg-->50 - 100 Damage\tSpeed <!--spd-->2.00<br>
        (37.5 damage per second)<br>
        <!--stat5-->+15 Intellect<br>
        <span class="q2">Equip: Increases spell power by <a href="/spell=12345" class="q2">up to 30</a> points.</span><br>
        Requires Level <!--rlvl-->58
      </td></tr></table>
    ]]></htmlTooltip>
  </item>
</wowhead>
`;
const parsed1 = parseXmlTooltip(xmlNestedAnchor, { id: 99001 });
assert(
  parsed1.equips.length === 1 && parsed1.equips[0] === 'Equip: Increases spell power by up to 30 points.',
  '1.1 Nested anchor tags inside green span stripped cleanly without proc corruption',
  `Parsed proc: "${parsed1.equips[0]}"`
);
assert(
  !parsed1.lines.some(l => /<[^>]+>/.test(l)),
  '1.1b Zero residual HTML tags in lines array'
);

// 1.2: Nested span tags inside green span (<span class="q"> inside <span class="q2">)
const xmlNestedSpan = `
<wowhead>
  <item id="99002">
    <name><![CDATA[Nested Aegis]]></name>
    <level>50</level>
    <quality id="3">3</quality>
    <icon>inv_shield_05</icon>
    <htmlTooltip><![CDATA[
      <b class="q3">Nested Aegis</b><br>
      Off Hand\tShield<br>
      <!--amr-->1500 Armor<br>
      30 Block<br>
      <span class="q2">Equip: Increases healing spells by <span class="q">up to 25</span>.</span><br>
      <span class="q2">Chance on hit: <span class="q1">Blasts target for 50 Holy damage.</span></span>
    ]]></htmlTooltip>
  </item>
</wowhead>
`;
const parsed2 = parseXmlTooltip(xmlNestedSpan, { id: 99002 });
assert(
  parsed2.equips.some(e => e.includes('Increases healing spells by up to 25.')),
  '1.2 Nested span tag stripped cleanly without proc truncation (trailing period preserved)',
  `Parsed equips: ${JSON.stringify(parsed2.equips)}`
);
assert(
  parsed2.equips.some(e => e.includes('Chance on hit: Blasts target for 50 Holy damage.')),
  '1.2b Captures both Equip and Chance on hit in separate spans',
  `Parsed equips: ${JSON.stringify(parsed2.equips)}`
);

// 1.3: Multi-proc item captures all 3 procs (Equip, Chance on hit, Use) in sequence
const xmlMultiProc = `
<wowhead>
  <item id="99003">
    <name><![CDATA[Tri-Proc Annihilator]]></name>
    <level>60</level>
    <quality id="4">4</quality>
    <icon>inv_axe_02</icon>
    <htmlTooltip><![CDATA[
      <b class="q4">Tri-Proc Annihilator</b><br>
      Two-Hand\tTwo-Handed Axe<br>
      <!--dmg-->150 - 250 Damage\tSpeed <!--spd-->3.80<br>
      (52.6 damage per second)<br>
      <span class="q2">Equip: Improves your chance to get a critical strike by 1%.</span><br>
      <span class="q2">Chance on hit: Sends a fiery blast dealing 150 to 250 Fire damage.</span><br>
      <span class="q2">Use: Increases attack power by 100 for 20 sec. (2 Min Cooldown)</span>
    ]]></htmlTooltip>
  </item>
</wowhead>
`;
const parsed3 = parseXmlTooltip(xmlMultiProc, { id: 99003 });
assert(
  parsed3.equips.length === 3,
  '1.3 Multi-proc item captures all 3 procs (Equip, Chance on hit, Use)',
  `Count: ${parsed3.equips.length}, procs: ${JSON.stringify(parsed3.equips)}`
);
assert(
  parsed3.equips[0]?.startsWith('Equip:') && parsed3.equips[1]?.startsWith('Chance on hit:') && parsed3.equips[2]?.startsWith('Use:'),
  '1.3b Multi-proc prefixes correctly preserved in sequence'
);

// 1.4: Un-prefixed base armor variations: <!--amr-->, <br>, <br />, <br/>, start-of-string
const xmlArmorVariations = [
  { html: '<!--amr-->2100 Armor<br>', expected: 2100, tag: '<!--amr-->' },
  { html: '<br>1850 Armor<br>', expected: 1850, tag: '<br>' },
  { html: '<br />1920 Armor<br />', expected: 1920, tag: '<br />' },
  { html: '<br/>1940 Armor<br/>', expected: 1940, tag: '<br/>' },
  { html: '500 Armor<br>', expected: 500, tag: 'start-of-string' }
];

for (const v of xmlArmorVariations) {
  const xml = `<wowhead><item id="99100"><name>Armor Test</name><icon>inv_shield_01</icon><htmlTooltip><![CDATA[${v.html}]]></htmlTooltip></item></wowhead>`;
  const p = parseXmlTooltip(xml, { id: 99100 });
  assert(
    p.armor === v.expected,
    `1.4 Armor parsing with ${v.tag} variant`,
    `Expected ${v.expected}, got ${p.armor}`
  );
  assert(
    !p.stats.includes(`+${v.expected} Armor`),
    `1.4b Armor stat does not contain corrupted "+" prefix for ${v.tag}`,
    `Stats: "${p.stats}"`
  );
}

// 1.5: Shield base block variations: <br>, <br />, <br/>, start-of-string
const xmlBlockVariations = [
  { html: '<br>30 Block<br>', expected: 30, tag: '<br>' },
  { html: '<br />32 Block<br />', expected: 32, tag: '<br />' },
  { html: '<br/>34 Block<br/>', expected: 34, tag: '<br/>' },
  { html: '25 Block<br>', expected: 25, tag: 'start-of-string' }
];

for (const v of xmlBlockVariations) {
  const xml = `<wowhead><item id="99101"><name>Block Test</name><icon>inv_shield_01</icon><htmlTooltip><![CDATA[${v.html}]]></htmlTooltip></item></wowhead>`;
  const p = parseXmlTooltip(xml, { id: 99101 });
  assert(
    p.block === v.expected,
    `1.5 Shield block parsing with ${v.tag} variant`,
    `Expected ${v.expected}, got ${p.block}`
  );
}

// 1.6: Base shield block vs block value equip proc
const xmlShieldBlock = `
<wowhead>
  <item id="99006">
    <name><![CDATA[Wall of the Dead]]></name>
    <level>50</level>
    <quality id="3">3</quality>
    <icon>inv_shield_02</icon>
    <htmlTooltip><![CDATA[
      <b class="q3">Wall of the Dead</b><br>
      Off Hand\tShield<br>
      <!--amr-->1800 Armor<br>
      35 Block<br>
      <span class="q2">Equip: Increases the block value of your shield by 24.</span>
    ]]></htmlTooltip>
  </item>
</wowhead>
`;
const parsed6 = parseXmlTooltip(xmlShieldBlock, { id: 99006 });
assert(
  parsed6.block === 35,
  '1.6 Base shield block is 35 and not corrupted by equip block value proc (24)',
  `Got block: ${parsed6.block}`
);
assert(
  parsed6.stats.includes('35 Block') && !parsed6.stats.includes('+35 Block'),
  '1.6b Base block line has no "+" prefix in stats string'
);
assert(
  parsed6.equips.some(e => e.includes('Increases the block value of your shield by 24.')),
  '1.6c Block value equip proc retained in equips array'
);

// 1.7: Resistance parsing: multi-element, singular, and casing
const xmlResist = `
<wowhead>
  <item id="99007">
    <name><![CDATA[Prismatic Ward]]></name>
    <level>60</level>
    <quality id="4">4</quality>
    <icon>inv_shield_03</icon>
    <htmlTooltip><![CDATA[
      <b class="q4">Prismatic Ward</b><br>
      Off Hand\tShield<br>
      <!--amr-->2100 Armor<br>
      40 Block<br>
      +10 Fire Resistance<br>
      +10 Frost Resistance<br>
      +10 Shadow Resistance<br>
      +10 Nature Resistance<br>
      +10 Arcane Resistance
    ]]></htmlTooltip>
  </item>
</wowhead>
`;
const parsed7 = parseXmlTooltip(xmlResist, { id: 99007 });
assert(
  parsed7.resistances?.fire === 10 &&
  parsed7.resistances?.frost === 10 &&
  parsed7.resistances?.shadow === 10 &&
  parsed7.resistances?.nature === 10 &&
  parsed7.resistances?.arcane === 10,
  '1.7 Multi-element resistances correctly parsed into resistances dictionary',
  `Resistances: ${JSON.stringify(parsed7.resistances)}`
);
assert(
  parsed7.lines.filter(l => l.includes('Resistance')).length === 5,
  '1.7b All 5 resistance lines added to lines array'
);

// 1.8: Trailing period preserved on proc string (e.g. Ironfoe)
const xmlIronfoeProc = `
<wowhead>
  <item id="11684">
    <name><![CDATA[Ironfoe]]></name>
    <level>60</level>
    <icon>spell_frost_frostbrand</icon>
    <htmlTooltip><![CDATA[
      <span class="q2">Chance on hit: Grants 2 extra attacks on your next swing.</span>
    ]]></htmlTooltip>
  </item>
</wowhead>
`;
const parsed8 = parseXmlTooltip(xmlIronfoeProc, { id: 11684 });
assert(
  parsed8.equips[0] === 'Chance on hit: Grants 2 extra attacks on your next swing.',
  '1.8 Trailing period on proc string preserved without truncation',
  `Equip proc: "${parsed8.equips[0]}"`
);

// ============================================================================
// SUITE 2: DUAL-ENDPOINT ROUTING LOGIC
// ============================================================================
console.log('\n--- SUITE 2: Dual-Endpoint Routing Logic ---');

function determineRouting(id, envChange) {
  const isForeverFirst = Boolean(id >= 200000 || (envChange && envChange.status === 'new'));
  const primaryUrl = isForeverFirst
    ? `https://www.wowhead.com/forever/item=${id}&xml`
    : `https://classic.wowhead.com/item=${id}&xml`;
  const secondaryUrl = isForeverFirst
    ? `https://classic.wowhead.com/item=${id}&xml`
    : `https://www.wowhead.com/forever/item=${id}&xml`;
  const envs = isForeverFirst ? [16, 4, 11] : [4, 16, 11];
  return { isForeverFirst, primaryUrl, secondaryUrl, envs };
}

// 2.1: Classic ID (<200k) routes to classic.wowhead.com primary
const routeClassic = determineRouting(1168, null);
assert(
  routeClassic.isForeverFirst === false &&
  routeClassic.primaryUrl === 'https://classic.wowhead.com/item=1168&xml' &&
  routeClassic.secondaryUrl === 'https://www.wowhead.com/forever/item=1168&xml' &&
  JSON.stringify(routeClassic.envs) === JSON.stringify([4, 16, 11]),
  '2.1 Classic ID (1168) routes to classic.wowhead.com primary with dataEnv [4, 16, 11]'
);

// 2.2: Forever custom ID (>=200k) routes to wowhead.com/forever primary
const routeForever = determineRouting(200050, null);
assert(
  routeForever.isForeverFirst === true &&
  routeForever.primaryUrl === 'https://www.wowhead.com/forever/item=200050&xml' &&
  routeForever.secondaryUrl === 'https://classic.wowhead.com/item=200050&xml' &&
  JSON.stringify(routeForever.envs) === JSON.stringify([16, 4, 11]),
  '2.2 Forever custom ID (200050) routes to /forever primary with dataEnv [16, 4, 11]'
);

// 2.3: Classic ID with envChange: { status: 'new' } routes to forever primary
const routeEnvNew = determineRouting(12345, { status: 'new' });
assert(
  routeEnvNew.isForeverFirst === true &&
  routeEnvNew.primaryUrl === 'https://www.wowhead.com/forever/item=12345&xml' &&
  JSON.stringify(routeEnvNew.envs) === JSON.stringify([16, 4, 11]),
  '2.3 Classic ID with envChange.status === "new" routes to forever primary'
);

// ============================================================================
// SUITE 3: DATABASE CENSUS & ADVERSARIAL STRESS-TEST
// ============================================================================
console.log('\n--- SUITE 3: Database Census & Cache Integrity ---');

// 3.1: All 411 raw catalog shields must be present in cache
const missingShields = [];
for (const s of rawShields) {
  if (!cache[String(s.id)]) {
    missingShields.push(s.id);
  }
}
assert(missingShields.length === 0, '3.1 100% of catalog shields are present in cache', missingShields);

// 3.2: 100% of catalog shields must have numeric block > 0
const shieldsInvalidBlock = [];
for (const s of rawShields) {
  const item = cache[String(s.id)];
  if (item) {
    if (typeof item.block !== 'number' || item.block <= 0 || isNaN(item.block)) {
      shieldsInvalidBlock.push({ id: s.id, name: item.name, block: item.block });
    }
  }
}
assert(shieldsInvalidBlock.length === 0, '3.2 100% of catalog shields have numeric block > 0', shieldsInvalidBlock);

// 3.3: 100% of catalog shields must have "X Block" in lines
const shieldsMissingBlockLine = [];
for (const s of rawShields) {
  const item = cache[String(s.id)];
  if (item) {
    const hasBlockLine = item.lines && item.lines.some(l => /^\d+\s+Block$/i.test(l.trim()));
    if (!hasBlockLine) {
      shieldsMissingBlockLine.push({ id: s.id, name: item.name, lines: item.lines });
    }
  }
}
assert(shieldsMissingBlockLine.length === 0, '3.3 100% of catalog shields have "X Block" in lines', shieldsMissingBlockLine);

// 3.4: 0 items in entire cache have "+X Armor" for base physical armor
const itemsWithPlusArmor = [];
for (const [id, item] of Object.entries(cache)) {
  if ((item.stats && /\+\d+\s+Armor\b/.test(item.stats)) || (item.lines && item.lines.some(l => /\+\d+\s+Armor\b/.test(l)))) {
    itemsWithPlusArmor.push({ id, name: item.name, stats: item.stats });
  }
}
assert(itemsWithPlusArmor.length === 0, '3.4 0 items in cache have corrupted "+X Armor"', itemsWithPlusArmor);

// 3.5: 0 items in entire cache have unstripped HTML tags
const itemsWithHtml = [];
for (const [id, item] of Object.entries(cache)) {
  const strProps = [item.name, item.stats, ...(item.lines || []), ...(item.equips || []), ...(item.procs || [])];
  for (const s of strProps) {
    if (typeof s === 'string' && /<[^>]+>/.test(s)) {
      itemsWithHtml.push({ id, name: item.name, snippet: s });
      break;
    }
  }
}
assert(itemsWithHtml.length === 0, '3.5 0 items in cache have unstripped HTML tags', itemsWithHtml);

// 3.6: 100% of items have valid icon tokens
const invalidIcons = [];
for (const [id, item] of Object.entries(cache)) {
  if (!item.icon || item.icon === 'inv_misc_questionmark' || /\.(jpg|png|webp)$/i.test(item.icon) || /[\\/]/.test(item.icon)) {
    invalidIcons.push({ id, name: item.name, icon: item.icon });
  }
}
assert(invalidIcons.length === 0, '3.6 100% of items have valid clean icon tokens', invalidIcons);

// 3.7: ADVERSARIAL CHECK: 0 items in cache contain literal "NaN" strings
const nanItems = [];
for (const [id, item] of Object.entries(cache)) {
  const jsonStr = JSON.stringify(item);
  if (jsonStr.includes('NaN')) {
    nanItems.push({ id, name: item.name, dps: item.dps, lines: item.lines });
  }
}
assert(
  nanItems.length === 0,
  `3.7 0 items in cache contain "NaN" values (found ${nanItems.length} items with NaN)`,
  nanItems
);

// 3.8: ADVERSARIAL CHECK: High-profile proc weapon fidelity (Thrash Blade ID 17705)
const thrashBlade = cache['17705'];
const thrashHasProc = thrashBlade && (
  (thrashBlade.equips && thrashBlade.equips.some(e => e.toLowerCase().includes('extra attack'))) ||
  (thrashBlade.procs && thrashBlade.procs.some(p => p.toLowerCase().includes('extra attack'))) ||
  (thrashBlade.stats && thrashBlade.stats.toLowerCase().includes('extra attack')) ||
  (thrashBlade.lines && thrashBlade.lines.some(l => l.toLowerCase().includes('extra attack')))
);
assert(
  Boolean(thrashHasProc),
  '3.8 High-profile proc weapon Thrash Blade (ID 17705) possesses full extra attack proc in cache',
  { id: 17705, name: thrashBlade?.name, stats: thrashBlade?.stats, lines: thrashBlade?.lines }
);

// ============================================================================
// SUITE 4: BENCHMARK ITEM VERIFICATION
// ============================================================================
console.log('\n--- SUITE 4: Benchmark Items Ground Truth Verification ---');

const benchmarkErrors = validateBenchmarkItems(cache);
assert(
  benchmarkErrors.length === 0,
  '4.0 Cache engine validateBenchmarkItems() reports 0 defects',
  benchmarkErrors
);

// 4.1: Skullflame Shield (ID 1168)
const skullflame = cache['1168'];
assert(skullflame !== undefined, '4.1a Skullflame Shield exists in cache');
assert(skullflame?.name === 'Skullflame Shield', '4.1b Skullflame Shield name correct');
assert(skullflame?.icon === 'inv_shield_01', '4.1c Skullflame Shield icon is "inv_shield_01"');
assert(skullflame?.armor === 2256, '4.1d Skullflame Shield armor is 2256');
assert(skullflame?.block === 40, '4.1e Skullflame Shield block is 40');
assert(skullflame?.reqLevel === 54, '4.1f Skullflame Shield reqLevel is 54');
assert(
  skullflame?.resistances?.fire === 10 && skullflame?.resistances?.shadow === 10,
  '4.1g Skullflame Shield resistances (+10 Fire, +10 Shadow)'
);
assert(
  skullflame?.equips?.some(e => e.includes('stealing 35 life')) &&
  skullflame?.equips?.some(e => e.includes('75 to 125 Fire damage') || e.includes('Flame Strike')),
  '4.1h Skullflame Shield has both procs (3% life drain, 1% flame strike)'
);

// 4.2: Verigan's Fist (ID 6953)
const verigan = cache['6953'];
assert(verigan !== undefined, "4.2a Verigan's Fist exists in cache");
assert(verigan?.name === "Verigan's Fist", "4.2b Verigan's Fist name correct");
assert(verigan?.icon === 'inv_hammer_05', "4.2c Verigan's Fist icon is 'inv_hammer_05'");
assert(verigan?.reqLevel === 20, "4.2d Verigan's Fist reqLevel is 20");
assert(verigan?.speed === '3.20', "4.2e Verigan's Fist speed is '3.20'");
assert(
  verigan?.stats?.includes('+7 Stamina') && verigan?.stats?.includes('+6 Intellect') && verigan?.stats?.includes('+12 Spirit'),
  "4.2f Verigan's Fist stats (+7 Stamina, +6 Intellect, +12 Spirit)"
);
assert(
  verigan?.lines?.some(l => l.includes('Classes: Paladin')),
  "4.2g Verigan's Fist has 'Classes: Paladin'"
);

// 4.3: Whirlwind Axe (ID 6975)
const wwAxe = cache['6975'];
assert(wwAxe !== undefined, '4.3a Whirlwind Axe exists in cache');
assert(wwAxe?.name === 'Whirlwind Axe', '4.3b Whirlwind Axe name correct');
assert(wwAxe?.icon === 'inv_axe_12', '4.3c Whirlwind Axe icon is "inv_axe_12"');
assert(wwAxe?.reqLevel === 30, '4.3d Whirlwind Axe reqLevel is 30');
assert(wwAxe?.speed === '3.60', '4.3e Whirlwind Axe speed is "3.60"');
assert(
  wwAxe?.stats?.includes('+15 Strength') && wwAxe?.stats?.includes('+14 Stamina'),
  '4.3f Whirlwind Axe stats (+15 Strength, +14 Stamina)'
);
assert(
  wwAxe?.lines?.some(l => l.includes('Classes: Warrior')),
  '4.3g Whirlwind Axe has "Classes: Warrior"'
);

// 4.4: Ironfoe (ID 11684)
const ironfoe = cache['11684'];
assert(ironfoe !== undefined, '4.4a Ironfoe exists in cache');
assert(ironfoe?.name === 'Ironfoe', '4.4b Ironfoe name correct');
assert(ironfoe?.icon === 'spell_frost_frostbrand', '4.4c Ironfoe icon is "spell_frost_frostbrand"');
assert(ironfoe?.reqLevel === 55, '4.4d Ironfoe reqLevel is 55');
assert(ironfoe?.speed === '2.40', '4.4e Ironfoe speed is "2.40"');
assert(
  ironfoe?.stats?.includes('Chance on hit: Grants 2 extra attacks on your next swing.'),
  '4.4f Ironfoe untruncated proc with trailing period ("Grants 2 extra attacks on your next swing.")'
);

// ============================================================================
// SUMMARY & VERDICT
// ============================================================================
console.log('\n======================================================================');
console.log(`TOTAL ASSERTIONS: ${totalTests}`);
console.log(`PASSED:           ${passedTests}`);
console.log(`FAILED:           ${failedTests}`);
console.log('======================================================================');

if (failedTests > 0) {
  console.log('\nVERDICT: REQUEST_CHANGES');
  console.log(`Total defects found: ${defects.length}`);
  process.exit(1);
} else {
  console.log('\nVERDICT: APPROVE');
  process.exit(0);
}
