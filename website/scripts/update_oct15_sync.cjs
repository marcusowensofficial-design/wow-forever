/* global __dirname, console */
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'data', 'forever_changes.json');
const jsPath = path.join(__dirname, '..', 'js', 'data', 'changes-data.js');

const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
const entries = data.entries;

// 1. Mage Frost Blast
let frostBlast = entries.find(e => e.id === 'spellbook-mage-frost-blast');
if (!frostBlast) {
  frostBlast = {
    id: 'spellbook-mage-frost-blast',
    name: 'Frost Blast',
    class: 'mage',
    kind: 'spell',
    tree_name: 'Frost',
    icon: 'spell_frost_frostblast',
    reported_change_kind: 'added',
    spellbook_status: 'new',
    summary: 'New spell learned at level 24. Deals damage and slows target movement by 40% (1.5s cast). Serves as Rank 1 Frostbolt replacement and is affected by all Frostbolt talents.',
    changes: [
      'New baseline spell learned at level 24',
      '1.5 second cast time, slows target movement by 40%',
      'Affected by all talents that affect Frostbolt'
    ],
    order: 301,
    evidence_status: 'client_data',
    rank_texts: {
      '1': '60 Mana, 30 yd range, 1.5 sec cast. Blasts the enemy with frost, causing 42 to 46 Frost damage and slowing movement speed by 40% for 5 sec. Affected by all talents that affect Frostbolt.'
    },
    max_rank: 1,
    classic: { status: 'absent' },
    sources: [{ url: 'https://wago.tools/db2/SkillLineAbility?build=1.60.1.70425', title: 'WoW Forever beta client, build 1.60.1.70425', type: 'client_data' }],
    discovered_at: '2026-10-15'
  };
  entries.push(frostBlast);
}

// 2. Paladin Consecration
const conc = entries.find(e => e.id === 'paladin-consecration');
if (conc) {
  conc.summary = 'Trained without a talent from level 20. Consecration Spell Power coefficient per tick adjusted to 0.042 (was 0.095).';
  conc.changes = conc.changes || [];
  if (!conc.changes.some(c => c.includes('0.042'))) {
    conc.changes.push('Spell Power coefficient per tick adjusted to 0.042 (was 0.095)');
  }
}

// 3. Druid Shred
const shred = entries.find(e => e.id === 'spellbook-druid-shred');
if (shred) {
  shred.summary = 'Rank 1 learned at level 20 (was 22) to align with Shredding Attacks. Rank 5: 155% instead of 225%.';
  shred.changes = shred.changes || [];
  if (!shred.changes.some(c => c.includes('level 20'))) {
    shred.changes.push('Rank 1 learned at level 20 (was level 22)');
  }
}

// 4. Warrior Slam
const slam = entries.find(e => e.id === 'spellbook-warrior-slam');
if (slam) {
  slam.summary = 'Slam is no longer subject to spell pushback. Ranks 1 to 4 trained earlier than in Classic. Rank 5 new.';
  slam.changes = slam.changes || [];
  if (!slam.changes.some(c => c.includes('spell pushback'))) {
    slam.changes.push('Slam is no longer subject to spell pushback');
  }
}

// 5. Shaman Fire Nova
const fn = entries.find(e => e.id === 'shaman-fire-nova');
if (fn) {
  fn.summary = 'Strikes from active Fire totem on a 10s cooldown. Spell Power coefficient changed to 0.143 (was 0.214); base damage and mana cost significantly reduced.';
  fn.changes = fn.changes || [];
  if (!fn.changes.some(c => c.includes('0.143'))) {
    fn.changes.push('Spell Power coefficient adjusted to 0.143 (was 0.214) with reduced base damage and mana cost');
  }
}

// 6. Hunter Auto Shot
const as = entries.find(e => e.id === 'spellbook-hunter-auto-shot');
if (as) {
  as.reported_change_kind = 'modified';
  as.summary = 'Requires standing still for 0.5s before shooting, matching early versions of World of Warcraft.';
  as.changes = ['Requires standing still for 0.5s before shooting', 'Added Auto Attack/Auto Shot toggle setting'];
}

// Recompute stats
for (const slug of Object.keys(data.classes)) {
  const isAll = slug === 'all';
  const classEntries = isAll ? entries : entries.filter(e => e.class === slug);

  const talents = classEntries.filter(e => e.kind === 'talent');
  const spells = classEntries.filter(e => e.kind === 'spell');

  const talentsChanged = talents.filter(e => ['modified', 'moved', 'renamed'].includes(e.reported_change_kind));
  const talentsNew = talents.filter(e => e.reported_change_kind === 'added');
  const talentsRemoved = talents.filter(e => e.reported_change_kind === 'removed');
  const spellsChanged = spells.filter(e => e.reported_change_kind !== 'unchanged');
  const allChanges = talentsChanged.length + talentsNew.length + talentsRemoved.length + spellsChanged.length;

  data.classes[slug].stats = {
    allChanges,
    talentsChanged: talentsChanged.length,
    talentsNew: talentsNew.length,
    talentsRemoved: talentsRemoved.length,
    spellsChanged: spellsChanged.length,
    spellsTotal: spells.length,
    everything: classEntries.length
  };
}

// Save forever_changes.json
fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n');
console.log('Saved data/forever_changes.json successfully');

// Save changes-data.js
const jsContent = `/**
 * World of Warcraft: Forever - Class & Spell Changes Dataset
 * ${data.classes.all.stats.allChanges} Total Changes (${data.classes.all.stats.talentsNew} New Talents, ${data.classes.all.stats.talentsChanged} Changed Talents, ${data.classes.all.stats.spellsChanged} Spells) across all 9 classes.
 * Public client datamined changes compared directly with Classic Era client data.
 */

window.WOW_CHANGES_DATA = ${JSON.stringify(data)};
`;

fs.writeFileSync(jsPath, jsContent);
console.log('Saved js/data/changes-data.js successfully');
