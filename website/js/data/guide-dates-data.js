/**
 * World of Warcraft: Forever - Guide publish dates
 * Sets `added` (YYYY-MM-DD) on every guide, which orders each guide category newest first
 * (see getFilteredGuides in js/modules/guides.js). Must load after every other guide data file.
 * List new guides under their publish date; after a full rewrite, move the guide to the new date.
 * scripts/validate.js fails when a guide is missing here.
 */
(function () {
  'use strict';
  if (typeof window === 'undefined') return;
  const DATES = {
    '2026-11-24': [
      'guide-alcaz-prison',
      'guide-bags-storage',
      'guide-blackmaw-hold',
      'guide-craftsmans-writs',
      'guide-dawn-waker-secret',
      'guide-kroldok-stronghold',
      'guide-riding-first-mount',
      'guide-secret-toys',
      'guide-shapers-terrace',
      'guide-shendralar-reputation',
      'guide-sunken-temple-class-quests',
      'guide-the-drowned-city',
      'guide-weapon-skills-trainers'
    ],
    '2026-11-23': [
      'guide-onyxia-encounter',
      'guide-tier1-barrow-deeps-hyjal-prep',
      'guide-tier1-raid-consumables'
    ],
    '2026-11-22': [
      'guide-class-druid-60',
      'guide-class-hunter-60',
      'guide-class-mage-60',
      'guide-class-paladin-60',
      'guide-class-priest-60',
      'guide-class-rogue-60',
      'guide-class-shaman-60',
      'guide-class-warlock-60',
      'guide-class-warrior-60',
      'guide-dungeon-blackrock-depths',
      'guide-dungeon-dire-maul',
      'guide-dungeon-gnomeregan',
      'guide-dungeon-lower-blackrock-spire',
      'guide-dungeon-maraudon',
      'guide-dungeon-razorfen-downs',
      'guide-dungeon-razorfen-kraul',
      'guide-dungeon-scarlet-monastery',
      'guide-dungeon-scholomance',
      'guide-dungeon-stratholme',
      'guide-dungeon-sunken-temple',
      'guide-dungeon-uldaman',
      'guide-dungeon-upper-blackrock-spire',
      'guide-dungeon-zul-farrak',
      'guide-gold-making-60',
      'guide-level-60-checklist',
      'guide-onyxia-attunement',
      'guide-zone-mount-hyjal',
      'guide-zone-riverglades',
      'guide-zone-shendralas'
    ],
    '2026-11-03': [
      'guide-profession-utility-gear'
    ],
    '2026-10-29': [
      'guide-best-professions-by-class',
      'guide-zones-by-level-gathering'
    ],
    '2026-10-28': [
      'guide-dungeon-blackfathom-deeps',
      'guide-dungeon-ragefire-chasm',
      'guide-dungeon-shadowfang-keep',
      'guide-dungeon-the-deadmines',
      'guide-dungeon-the-stockade',
      'guide-dungeon-wailing-caverns'
    ],
    '2026-10-24': [
      'guide-artisan-professions-300',
      'guide-combat-mechanics-hit-caps',
      'guide-companion-addons-suite',
      'guide-dual-spec-economics',
      'guide-early-name-reservation',
      'guide-leveling-30-to-60',
      'guide-tier1-raids-attunements',
      'guide-undead-paladin'
    ],
    '2026-10-19': [
      'guide-hall-of-thanes',
      'guide-ruins-of-lordaeron'
    ],
    '2026-10-18': [
      'guide-camping-crafting-stations',
      'guide-darkspear-islands-pvp',
      'guide-dungeon-quests-master-tour',
      'guide-level30-druid',
      'guide-zephras-isle-zone'
    ],
    '2026-10-17': [
      'guide-dwarf-shaman-totems',
      'guide-level30-frost-mage',
      'guide-level30-hunter',
      'guide-mage-comprehension-scrolls',
      'guide-master-transit-routes'
    ],
    '2026-10-13': [
      'guide-blackfathom-deeps',
      'guide-class-paladin',
      'guide-class-priest',
      'guide-class-rogue',
      'guide-class-shaman',
      'guide-class-warlock',
      'guide-class-warrior',
      'guide-legacy-talents',
      'guide-professions-1-225',
      'guide-racials-overhaul',
      'guide-rested-xp-stacking',
      'guide-shadowfang-deadmines',
      'guide-supply-crates-rep',
      'guide-weapon-class-quests'
    ],
    '2026-10-12': [
      'guide-battle-mage',
      'guide-camping-master',
      'guide-city-of-dalaran',
      'guide-downranking',
      'guide-druid-snake-form',
      'guide-excavation-site',
      'guide-fast-leveling',
      'guide-savory-whimsyfin-delight',
      'guide-scarlet-banner'
    ],
    '2026-10-10': [
      'guide-druid-forms',
      'guide-duel-tournament',
      'guide-hunter-pets',
      'guide-library-books',
      'guide-merchants-favor',
      'guide-pvp-ranks',
      'guide-rares-30',
      'guide-sleeping-bag',
      'guide-transmog'
    ]
  };
  const byId = {};
  for (const [date, ids] of Object.entries(DATES)) for (const id of ids) byId[id] = date;
  window.WOW_GUIDE_DATES = byId;
  for (const g of window.WOW_TOOLS_DATA?.guides || []) {
    if (byId[g.id]) g.added = byId[g.id];
  }
})();
