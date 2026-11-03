import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');

const changesJsonPath = path.join(ROOT, 'data', 'forever_changes.json');
const changesJsPath = path.join(ROOT, 'js', 'data', 'changes-data.js');

const data = JSON.parse(fs.readFileSync(changesJsonPath, 'utf8'));
const entries = data.entries;

// Let's add or update key patch entries for Nov 2 / Nov 3
const newOrUpdated = [
  // Hunter Hotfixes
  {
    id: "calc-hunter-marksmanship-barrage-nov3",
    name: "Barrage",
    class: "hunter",
    kind: "talent",
    tree_name: "Marksmanship",
    tree_id: "361",
    tree_index: 1,
    icon: "ability_upgrademoonglaive",
    reported_change_kind: "buffed",
    evidence_status: "official_notes",
    rank_texts: {
      "1": "Increases the damage done by your Multi-Shot, Aimed Shot, and Volley abilities by 5%.",
      "2": "Increases the damage done by your Multi-Shot, Aimed Shot, and Volley abilities by 10%.",
      "3": "Increases the damage done by your Multi-Shot, Aimed Shot, and Volley abilities by 15%."
    },
    max_rank: 3,
    discovered_at: "2026-11-03",
    calculator_eligible: true,
    summary: "Buffed from 3/7/10% to 5/10/15% damage bonus on Multi-Shot, Aimed Shot, and Volley.",
    changes: ["Damage increase raised to 5/10/15% from 3/7/10%."]
  },
  {
    id: "calc-hunter-marksmanship-sniper-shot-nov3",
    name: "Sniper Shot",
    class: "hunter",
    kind: "talent",
    tree_name: "Marksmanship",
    tree_id: "361",
    tree_index: 1,
    icon: "hunter_pvp_snipershot",
    reported_change_kind: "buffed",
    evidence_status: "official_notes",
    rank_texts: {
      "1": "A long-range shot that deals ranged damage plus 320 and increases the range of your next 3 Shots by 10 yards for 10 sec.",
      "2": "A long-range shot that deals ranged damage plus 450 and increases the range of your next 3 Shots by 10 yards for 10 sec.",
      "3": "A long-range shot that deals ranged damage plus 590 and increases the range of your next 3 Shots by 10 yards for 10 sec."
    },
    max_rank: 3,
    discovered_at: "2026-11-03",
    calculator_eligible: true,
    summary: "Bonus damage doubled on all ranks: Rank 1 deals +320 (was +160), Rank 2 +450 (was +225), Rank 3 +590 (was +295).",
    changes: ["Bonus damage increased by 100% across all ranks."]
  },
  {
    id: "calc-hunter-marksmanship-trueshot-aura-nov3",
    name: "Trueshot Aura",
    class: "hunter",
    kind: "talent",
    tree_name: "Marksmanship",
    tree_id: "361",
    tree_index: 1,
    icon: "ability_trueshot",
    reported_change_kind: "buffed",
    evidence_status: "official_notes",
    rank_texts: {
      "1": "Increases the Ranged Attack Power of party or raid members within 45 yds by 20.",
      "2": "Increases the Ranged Attack Power of party or raid members within 45 yds by 35.",
      "3": "Increases the Ranged Attack Power of party or raid members within 45 yds by 50.",
      "4": "Increases the Ranged Attack Power of party or raid members within 45 yds by 75.",
      "5": "Increases the Ranged Attack Power of party or raid members within 45 yds by 100."
    },
    max_rank: 5,
    discovered_at: "2026-11-03",
    calculator_eligible: true,
    summary: "Ranged Attack Power buffed: Rank 1: 20 (was 15), Rank 2: 35 (was 22), Rank 3: 50 (was 30), Rank 4: 75 (was 40), Rank 5: 100 (was 50).",
    changes: ["Ranged Attack Power increased significantly across all ranks."]
  },
  {
    id: "spellbook-hunter-aspect-of-the-hawk-nov3",
    name: "Aspect of the Hawk",
    class: "hunter",
    kind: "spell",
    icon: "spell_nature_ravenform",
    reported_change_kind: "buffed",
    evidence_status: "official_notes",
    discovered_at: "2026-11-03",
    summary: "Ranged Attack Power bonus buffed to 20, 35, 50, 70, 90, 110 for ranks 1-6 (was 15, 22, 30, 38, 47, 55).",
    changes: ["RAP increased across all ranks."]
  },
  // Rogue New Spells
  {
    id: "spellbook-rogue-shank-nov2",
    name: "Shank",
    class: "rogue",
    kind: "spell",
    icon: "inv_throwingknife_04",
    reported_change_kind: "new",
    evidence_status: "official_notes",
    discovered_at: "2026-11-02",
    summary: "Learned at level 24. 5 Energy, 10s cooldown, Melee. Instantly strike with off-hand weapon, dealing 50% weapon damage and generating 15 Energy (Rank 2 at level 44 generates 25 Energy). Cannot miss.",
    changes: ["New baseline off-hand strike ability generating energy."]
  },
  {
    id: "spellbook-rogue-poised-nov2",
    name: "Poised",
    class: "rogue",
    kind: "spell",
    icon: "ability_rogue_stayingfocused",
    reported_change_kind: "new",
    evidence_status: "official_notes",
    discovered_at: "2026-11-02",
    summary: "Learned at level 18. When not in combat and at maximum Energy, reduces the Energy cost of your next Energy ability by 10.",
    changes: ["New out-of-combat passive energy efficiency."]
  },
  // Druid Poised & Balance/Feral changes
  {
    id: "spellbook-druid-poised-nov2",
    name: "Poised",
    class: "druid",
    kind: "spell",
    icon: "spell_nature_elementalshields",
    reported_change_kind: "new",
    evidence_status: "official_notes",
    discovered_at: "2026-11-02",
    summary: "Learned at level 32. When not in combat and at maximum Energy, reduces the Energy cost of your next Energy ability by 10.",
    changes: ["New out-of-combat passive energy efficiency."]
  },
  // Shaman Call of Thunder
  {
    id: "calc-shaman-elemental-call-of-thunder-nov2",
    name: "Call of Thunder",
    class: "shaman",
    kind: "talent",
    tree_name: "Elemental",
    icon: "spell_nature_callstorm",
    reported_change_kind: "new",
    evidence_status: "official_notes",
    discovered_at: "2026-11-02",
    summary: "Replaces Lava Burst as Tier 5 1-point talent. Increases critical strike chance of Lightning Bolt and Chain Lightning by 5%.",
    changes: ["Lava Burst removed and replaced with Call of Thunder."]
  }
];

for (const entry of newOrUpdated) {
  const existingIdx = entries.findIndex(e => e.id === entry.id);
  if (existingIdx !== -1) {
    entries[existingIdx] = { ...entries[existingIdx], ...entry };
  } else {
    entries.push(entry);
  }
}

// Update stats
data.classes.all.stats.everything = entries.length;

fs.writeFileSync(changesJsonPath, JSON.stringify(data, null, 2), 'utf8');
console.log('Updated data/forever_changes.json');

const jsContent = `/**
 * World of Warcraft: Forever - Changes Master Dataset
 * Auto-synced from data/forever_changes.json (Updated November 3, 2026)
 */
window.WOW_CHANGES_DATA = ${JSON.stringify(data, null, 2)};
`;
fs.writeFileSync(changesJsPath, jsContent, 'utf8');
console.log('Updated js/data/changes-data.js');
