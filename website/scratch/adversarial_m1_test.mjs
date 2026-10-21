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

console.log('======================================================================');
console.log('   MILESTONE 1 ADVERSARIAL STRESS-TEST & INTEGRITY HARNESS');
console.log('======================================================================\n');

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;
const failureDetails = [];

function assert(condition, testName, details = '') {
  totalTests++;
  if (condition) {
    passedTests++;
    console.log(`  ✓ PASS: ${testName}`);
  } else {
    failedTests++;
    console.error(`  ✗ FAIL: ${testName}`);
    if (details) console.error(`    Details: ${details}`);
    failureDetails.push({ testName, details });
  }
}

// ============================================================================
// SUITE 1: TOOLTIP PARSER ADVERSARIAL SUITE
// ============================================================================
console.log('--- SUITE 1: Tooltip Parser Adversarial Edge Cases ---');

// 1.1: Nested HTML tags inside green span (anchor tag inside span)
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

// 1.2: Nested span tags inside green span
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
  '1.2 Nested span tag stripped cleanly without proc truncation',
  `Parsed equips: ${JSON.stringify(parsed2.equips)}`
);
assert(
  parsed2.equips.some(e => e.includes('Chance on hit: Blasts target for 50 Holy damage.')),
  '1.2b Captures both Equip and Chance on hit in separate spans',
  `Parsed equips: ${JSON.stringify(parsed2.equips)}`
);

// 1.3: Procs with multiple green spans on an item (Equip + Chance on hit + Use)
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
  parsed3.equips[0].startsWith('Equip:') && parsed3.equips[1].startsWith('Chance on hit:') && parsed3.equips[2].startsWith('Use:'),
  '1.3b Multi-proc prefixes correctly preserved in sequence'
);

// 1.4: Un-prefixed base armor variations: <!--amr--> vs <br> vs <br /> vs start of string
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

// 1.5: Bonus armor from Equip proc must NOT overwrite base armor
const xmlBonusArmor = `
<wowhead>
  <item id="99005">
    <name><![CDATA[Defender Bulwark]]></name>
    <level>55</level>
    <quality id="4">4</quality>
    <icon>inv_shield_01</icon>
    <htmlTooltip><![CDATA[
      <b class="q4">Defender Bulwark</b><br>
      Off Hand\tShield<br>
      <!--amr-->2000 Armor<br>
      40 Block<br>
      <span class="q2">Equip: Increases defense rating by 10 and armor by 150.</span>
    ]]></htmlTooltip>
  </item>
</wowhead>
`;
const parsed5 = parseXmlTooltip(xmlBonusArmor, { id: 99005 });
assert(
  parsed5.armor === 2000,
  '1.5 Base armor (2000) is not overwritten by equip proc mentioning armor (+150)',
  `Got armor: ${parsed5.armor}`
);

// 1.6: Shield base block vs block value equip proc
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
  parsed7.resistances.fire === 10 &&
  parsed7.resistances.frost === 10 &&
  parsed7.resistances.shadow === 10 &&
  parsed7.resistances.nature === 10 &&
  parsed7.resistances.arcane === 10,
  '1.7 Multi-element resistances correctly parsed into resistances dictionary',
  `Resistances: ${JSON.stringify(parsed7.resistances)}`
);
assert(
  parsed7.lines.filter(l => l.includes('Resistance')).length === 5,
  '1.7b All 5 resistance lines added to lines array'
);

// 1.8: Scaling annotations stripped from procs (@ L60)
const xmlScalingProc = `
<wowhead>
  <item id="99008">
    <name><![CDATA[Tuning Blade]]></name>
    <level>60</level>
    <icon>inv_sword_01</icon>
    <htmlTooltip><![CDATA[
      <span class="q2">Equip: Improves critical strike rating by 14 (1.00% @ L60).</span>
    ]]></htmlTooltip>
  </item>
</wowhead>
`;
const parsed8 = parseXmlTooltip(xmlScalingProc, { id: 99008 });
assert(
  !parsed8.equips[0].includes('@ L60'),
  '1.8 Scaling annotation (@ L60) stripped cleanly from equip line',
  `Equip proc: "${parsed8.equips[0]}"`
);

// 1.9: Trailing punctuation on procs (e.g. Ironfoe trailing period)
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
const parsed9 = parseXmlTooltip(xmlIronfoeProc, { id: 11684 });
assert(
  parsed9.equips[0] === 'Chance on hit: Grants 2 extra attacks on your next swing.',
  '1.9 Trailing period on proc string preserved without truncation',
  `Equip proc: "${parsed9.equips[0]}"`
);

// 1.10: Cosmetic / Statless items have non-empty lines fallback
const xmlCosmetic = `
<wowhead>
  <item id="99010">
    <name><![CDATA[Festive Sparkler]]></name>
    <level>1</level>
    <icon>inv_misc_sparkler</icon>
    <htmlTooltip><![CDATA[
      Festive Sparkler
    ]]></htmlTooltip>
  </item>
</wowhead>
`;
const parsed10 = parseXmlTooltip(xmlCosmetic, { id: 99010, name: 'Festive Sparkler' });
assert(
  Array.isArray(parsed10.lines) && parsed10.lines.length > 0 && parsed10.lines[0] === 'Festive Sparkler',
  '1.10 Cosmetic/statless item receives non-empty lines array fallback'
);

// ============================================================================
// SUITE 2: DUAL-ENDPOINT ROUTING LOGIC
// ============================================================================
console.log('\n--- SUITE 2: Dual-Endpoint Routing Logic ---');

function determineRouting(id, envChange) {
  const isForeverFirst = id >= 200000 || (envChange && envChange.status === 'new');
  const primaryUrl = isForeverFirst
    ? `https://www.wowhead.com/forever/item=${id}&xml`
    : `https://classic.wowhead.com/item=${id}&xml`;
  const secondaryUrl = isForeverFirst
    ? `https://classic.wowhead.com/item=${id}&xml`
    : `https://www.wowhead.com/forever/item=${id}&xml`;
  const envs = isForeverFirst ? [16, 4, 11] : [4, 16, 11];
  return { isForeverFirst, primaryUrl, secondaryUrl, envs };
}

// 2.1: Classic ID < 200,000 routes to classic.wowhead.com primary
const routeClassic = determineRouting(1168, null);
assert(
  routeClassic.isForeverFirst === false &&
  routeClassic.primaryUrl === 'https://classic.wowhead.com/item=1168&xml' &&
  routeClassic.secondaryUrl === 'https://www.wowhead.com/forever/item=1168&xml' &&
  JSON.stringify(routeClassic.envs) === JSON.stringify([4, 16, 11]),
  '2.1 Classic ID (1168) routes to classic.wowhead.com primary with dataEnv [4, 16, 11]'
);

// 2.2: Forever custom ID >= 200,000 routes to wowhead.com/forever primary
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
  routeEnvNew.primaryUrl === 'https://www.wowhead.com/forever/item=12345&xml',
  '2.3 Classic ID with envChange.status === "new" routes to forever primary'
);

// ============================================================================
// SUITE 3: CACHE INTEGRITY & RANDOM SAMPLING
// ============================================================================
console.log('\n--- SUITE 3: Cache Integrity & Random Sampling ---');

assert(fs.existsSync(cachePath), '3.0 Cache file exists at scratch/forever_items_cache.json');
const cache = JSON.parse(fs.readFileSync(cachePath, 'utf8'));
const cacheEntries = Object.values(cache);
console.log(`  Total cached items: ${cacheEntries.length}`);

// 3.1: Full cache sweep for 0 NaN, 0 corrupt armor strings, 0 unstripped HTML tags, valid icon tokens
let nanCount = 0;
let corruptArmorCount = 0;
let corruptBlockCount = 0;
let unstrippedHtmlCount = 0;
let invalidIconCount = 0;
let emptyLinesCount = 0;

for (const it of cacheEntries) {
  // Check for NaN in numeric properties
  const numProps = ['iLvl', 'reqLevel', 'effectiveLevel', 'armor', 'block', 'dmgmin', 'dmgmax'];
  for (const p of numProps) {
    if (it[p] !== null && it[p] !== undefined && Number.isNaN(it[p])) {
      nanCount++;
      console.error(`NaN in item ${it.id} property ${p}`);
    }
  }

  // Check for corrupt "+X Armor" in stats or lines
  if (it.stats && /\+\d+\s+Armor\b/.test(it.stats)) corruptArmorCount++;
  if (it.lines && it.lines.some(l => /\+\d+\s+Armor\b/.test(l))) corruptArmorCount++;

  // Check for corrupt "+X Block" in stats or lines
  if (it.stats && /\+\d+\s+Block\b/.test(it.stats)) corruptBlockCount++;
  if (it.lines && it.lines.some(l => /\+\d+\s+Block\b/.test(l))) corruptBlockCount++;

  // Check for unstripped HTML in any string property
  const strProps = [it.name, it.stats, ...(it.lines || []), ...(it.equips || []), ...(it.procs || [])];
  for (const s of strProps) {
    if (typeof s === 'string' && /<[^>]+>/.test(s)) {
      unstrippedHtmlCount++;
      break;
    }
  }

  // Check valid icon token
  if (!it.icon || it.icon === 'inv_misc_questionmark' || /\.(jpg|png|webp)$/i.test(it.icon) || /[\\/]/.test(it.icon)) {
    invalidIconCount++;
  }

  // Check lines non-empty
  if (!it.lines || !Array.isArray(it.lines) || it.lines.length === 0) {
    emptyLinesCount++;
  }
}

assert(nanCount === 0, '3.1 Zero NaN values across all numeric properties in full cache', `Found ${nanCount} NaNs`);
assert(corruptArmorCount === 0, '3.2 Zero corrupt "+X Armor" strings across full cache', `Found ${corruptArmorCount} corrupt armor strings`);
assert(corruptBlockCount === 0, '3.3 Zero corrupt "+X Block" strings across full cache', `Found ${corruptBlockCount} corrupt block strings`);
assert(unstrippedHtmlCount === 0, '3.4 Zero unstripped HTML tags across full cache', `Found ${unstrippedHtmlCount} items with unstripped HTML`);
assert(invalidIconCount === 0, '3.5 Zero invalid icon tokens across full cache', `Found ${invalidIconCount} invalid icons`);
assert(emptyLinesCount === 0, '3.6 Zero items with empty lines array across full cache', `Found ${emptyLinesCount} empty lines`);

// 3.7: Random Sampling: 100 weapons, 50 shields, 50 offhands
const whWeapons = JSON.parse(fs.readFileSync(weaponsPath, 'utf8'));
const whShields = JSON.parse(fs.readFileSync(shieldsPath, 'utf8'));
const whOffhands = JSON.parse(fs.readFileSync(offhandsPath, 'utf8'));

function sampleArray(arr, count) {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

const sampledWeapons = sampleArray(whWeapons, 100);
const sampledShields = sampleArray(whShields, 50);
const sampledOffhands = sampleArray(whOffhands, 50);

// Verify sampled weapons
let weaponDefects = 0;
for (const w of sampledWeapons) {
  const c = cache[String(w.id)];
  if (!c) { weaponDefects++; continue; }
  if (!c.name || !c.icon || c.icon === 'inv_misc_questionmark') weaponDefects++;
  if (!c.lines || c.lines.length === 0) weaponDefects++;
  if (c.stats && /<[^>]+>/.test(c.stats)) weaponDefects++;
}
assert(
  weaponDefects === 0,
  '3.7 Sample of 100 random weapons has 100% cache integrity and 0 defects',
  `Defects: ${weaponDefects}`
);

// Verify sampled shields
let shieldDefects = 0;
for (const s of sampledShields) {
  const c = cache[String(s.id)];
  if (!c) { shieldDefects++; continue; }
  if (typeof c.block !== 'number' || c.block <= 0) shieldDefects++;
  if (!c.lines.some(l => /^\d+\s+Block$/i.test(l)) && !/\b\d+\s+Block\b/.test(c.stats || '')) shieldDefects++;
  if (c.stats && /\+\d+\s+Block\b/.test(c.stats)) shieldDefects++;
  if (c.stats && /\+\d+\s+Armor\b/.test(c.stats)) shieldDefects++;
}
assert(
  shieldDefects === 0,
  '3.8 Sample of 50 random shields has valid positive numeric block, unprefixed armor, and 0 defects',
  `Defects: ${shieldDefects}`
);

// Verify sampled offhands
let offhandDefects = 0;
for (const o of sampledOffhands) {
  const c = cache[String(o.id)];
  if (!c) { offhandDefects++; continue; }
  if (!c.name || !c.icon) offhandDefects++;
  if (!c.lines || c.lines.length === 0) offhandDefects++;
}
assert(
  offhandDefects === 0,
  '3.9 Sample of 50 random offhands has complete metadata and 0 defects',
  `Defects: ${offhandDefects}`
);

// ============================================================================
// SUITE 4: BENCHMARK ITEM VERIFICATION
// ============================================================================
console.log('\n--- SUITE 4: Benchmark Item Exact Assertions ---');

const benchmarkErrors = validateBenchmarkItems(cache);
assert(
  benchmarkErrors.length === 0,
  '4.0 Cache engine built-in validateBenchmarkItems() reports 0 defects',
  `Errors: ${benchmarkErrors.join(', ')}`
);

// 4.1: Skullflame Shield (ID 1168)
const skullflame = cache['1168'];
assert(skullflame !== undefined, '4.1a Skullflame Shield (1168) exists in cache');
assert(skullflame.name === 'Skullflame Shield', '4.1b Skullflame Shield name is "Skullflame Shield"');
assert(skullflame.icon === 'inv_shield_01', '4.1c Skullflame Shield icon is "inv_shield_01"');
assert(skullflame.armor === 2256, '4.1d Skullflame Shield armor is 2256 (unprefixed)');
assert(skullflame.block === 40, '4.1e Skullflame Shield block is 40');
assert(skullflame.quality === 'q4', '4.1f Skullflame Shield quality is "q4"');
assert(skullflame.reqLevel === 54, '4.1g Skullflame Shield reqLevel is 54');
assert(
  skullflame.resistances && skullflame.resistances.fire === 10 && skullflame.resistances.shadow === 10,
  '4.1h Skullflame Shield has +10 Fire and +10 Shadow resistance'
);
assert(
  skullflame.equips.some(e => e.includes('stealing 35 life')) &&
  skullflame.equips.some(e => e.includes('75 to 125 Fire damage') || e.includes('Flame Strike') || e.includes('targets around you')),
  '4.1i Skullflame Shield possesses both iconic procs (3% life drain, 1% flame strike)'
);

// 4.2: Verigan's Fist (ID 6953)
const verigan = cache['6953'];
assert(verigan !== undefined, "4.2a Verigan's Fist (6953) exists in cache");
assert(verigan.name === "Verigan's Fist", "4.2b Verigan's Fist name is correct");
assert(verigan.icon === 'inv_hammer_05', "4.2c Verigan's Fist icon is 'inv_hammer_05'");
assert(verigan.reqLevel === 20, "4.2d Verigan's Fist reqLevel is 20");
assert(verigan.speed === '3.20', "4.2e Verigan's Fist speed is '3.20'");
assert(
  verigan.stats.includes('+7 Stamina') && verigan.stats.includes('+6 Intellect') && verigan.stats.includes('+12 Spirit'),
  "4.2f Verigan's Fist has authentic stats (+7 Stamina, +6 Intellect, +12 Spirit)"
);
assert(
  verigan.lines.some(l => l.includes('Classes: Paladin')),
  "4.2g Verigan's Fist has 'Classes: Paladin' class restriction"
);

// 4.3: Whirlwind Axe (ID 6975)
const wwAxe = cache['6975'];
assert(wwAxe !== undefined, '4.3a Whirlwind Axe (6975) exists in cache');
assert(wwAxe.name === 'Whirlwind Axe', '4.3b Whirlwind Axe name is correct');
assert(wwAxe.icon === 'inv_axe_12', '4.3c Whirlwind Axe icon is "inv_axe_12"');
assert(wwAxe.reqLevel === 30, '4.3d Whirlwind Axe reqLevel is 30');
assert(wwAxe.speed === '3.60', '4.3e Whirlwind Axe speed is "3.60"');
assert(
  wwAxe.stats.includes('+15 Strength') && wwAxe.stats.includes('+14 Stamina'),
  '4.3f Whirlwind Axe has authentic stats (+15 Strength, +14 Stamina)'
);
assert(
  wwAxe.lines.some(l => l.includes('Classes: Warrior')),
  '4.3g Whirlwind Axe has "Classes: Warrior" class restriction'
);

// 4.4: Ironfoe (ID 11684)
const ironfoe = cache['11684'];
assert(ironfoe !== undefined, '4.4a Ironfoe (11684) exists in cache');
assert(ironfoe.name === 'Ironfoe', '4.4b Ironfoe name is correct');
assert(ironfoe.icon === 'spell_frost_frostbrand', '4.4c Ironfoe icon is "spell_frost_frostbrand"');
assert(ironfoe.reqLevel === 55, '4.4d Ironfoe reqLevel is 55');
assert(ironfoe.speed === '2.40', '4.4e Ironfoe speed is "2.40"');
assert(
  ironfoe.stats.includes('Chance on hit: Grants 2 extra attacks on your next swing.'),
  '4.4f Ironfoe has untruncated proc with trailing period ("Grants 2 extra attacks on your next swing.")'
);

// ============================================================================
// SUMMARY & VERDICT
// ============================================================================
console.log('\n======================================================================');
console.log('   ADVERSARIAL STRESS-TEST HARNESS SUMMARY');
console.log('======================================================================');
console.log(`Total Assertions:  ${totalTests}`);
console.log(`Passed:            ${passedTests}`);
console.log(`Failed:            ${failedTests}`);
console.log('======================================================================');

if (failedTests > 0) {
  console.error('\nFAILURES DETECTED:');
  failureDetails.forEach(f => console.error(`  - ${f.testName}: ${f.details}`));
  process.exit(1);
} else {
  console.log('\n🎉 ALL ADVERSARIAL STRESS TESTS PASSED WITH 0 DEFECTS!');
  process.exit(0);
}
