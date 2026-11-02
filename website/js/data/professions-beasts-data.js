/**
 * World of Warcraft: Forever - Skinnable Beasts & Yield Matrix Dataset
 * Covers skinnable beasts across Classic/Forever zones with level brackets,
 * required skinning skill, drop tables, and zone spawn densities.
 */

(function () {
  "use strict";

  window.WOW_SKINNABLE_BEASTS_DATA = [
    // --- SKILL 1–75: Levels 1–15 (Light Leather / Ruined Scraps) ---
    { name: "Plainstrider", minLevel: 1, maxLevel: 2, skill: 1, drops: ["Ruined Leather Scraps"], primaryZone: "Mulgore", spawns: 97, seenInForever: true },
    { name: "Prairie Dog", minLevel: 1, maxLevel: 1, skill: 1, drops: ["Ruined Leather Scraps", "Light Leather"], primaryZone: "Mulgore", spawns: 30, seenInForever: false },
    { name: "Battleboar", minLevel: 3, maxLevel: 4, skill: 1, drops: ["Ruined Leather Scraps"], primaryZone: "Mulgore", spawns: 46, seenInForever: true },
    { name: "Mountain Cougar", minLevel: 3, maxLevel: 4, skill: 1, drops: ["Ruined Leather Scraps"], primaryZone: "Mulgore", spawns: 72, seenInForever: true },
    { name: "Bristleback Battleboar", minLevel: 4, maxLevel: 5, skill: 1, drops: ["Light Leather", "Light Hide"], primaryZone: "Mulgore", spawns: 28, seenInForever: true },
    { name: "Prairie Wolf", minLevel: 5, maxLevel: 6, skill: 1, drops: ["Ruined Leather Scraps", "Light Leather"], primaryZone: "Mulgore", spawns: 48, seenInForever: true },
    { name: "Adult Plainstrider", minLevel: 6, maxLevel: 7, skill: 1, drops: ["Ruined Leather Scraps", "Light Leather"], primaryZone: "Mulgore", spawns: 52, seenInForever: true },
    { name: "Flatland Cougar", minLevel: 7, maxLevel: 8, skill: 1, drops: ["Ruined Leather Scraps", "Light Leather"], primaryZone: "Mulgore", spawns: 73, seenInForever: true },
    { name: "Prairie Stalker", minLevel: 7, maxLevel: 8, skill: 1, drops: ["Ruined Leather Scraps", "Light Leather"], primaryZone: "Mulgore", spawns: 116, seenInForever: true },
    { name: "Elder Plainstrider", minLevel: 8, maxLevel: 9, skill: 1, drops: ["Ruined Leather Scraps", "Light Leather"], primaryZone: "Mulgore", spawns: 77, seenInForever: true },
    { name: "Flatland Prowler", minLevel: 9, maxLevel: 10, skill: 1, drops: ["Ruined Leather Scraps", "Light Leather"], primaryZone: "Mulgore", spawns: 82, seenInForever: true },
    { name: "Prairie Wolf Alpha", minLevel: 9, maxLevel: 10, skill: 1, drops: ["Ruined Leather Scraps", "Light Leather"], primaryZone: "Mulgore", spawns: 61, seenInForever: true },
    { name: "Mottled Boar", minLevel: 1, maxLevel: 2, skill: 1, drops: ["Ruined Leather Scraps"], primaryZone: "Durotar", spawns: 85, seenInForever: true },
    { name: "Scorpid Worker", minLevel: 3, maxLevel: 4, skill: 1, drops: ["Ruined Leather Scraps"], primaryZone: "Durotar", spawns: 54, seenInForever: true },
    { name: "Durotar Tiger", minLevel: 7, maxLevel: 8, skill: 1, drops: ["Ruined Leather Scraps", "Light Leather"], primaryZone: "Durotar", spawns: 60, seenInForever: true },
    { name: "Young Wolf", minLevel: 1, maxLevel: 2, skill: 1, drops: ["Ruined Leather Scraps"], primaryZone: "Elwynn Forest", spawns: 68, seenInForever: true },
    { name: "Mangy Wolf", minLevel: 3, maxLevel: 4, skill: 1, drops: ["Ruined Leather Scraps"], primaryZone: "Elwynn Forest", spawns: 55, seenInForever: true },
    { name: "Prowler", minLevel: 9, maxLevel: 10, skill: 1, drops: ["Light Leather", "Light Hide"], primaryZone: "Elwynn Forest", spawns: 42, seenInForever: true },
    { name: "Crag Boar", minLevel: 2, maxLevel: 3, skill: 1, drops: ["Ruined Leather Scraps"], primaryZone: "Dun Morogh", spawns: 64, seenInForever: true },
    { name: "Winter Wolf", minLevel: 6, maxLevel: 7, skill: 1, drops: ["Ruined Leather Scraps", "Light Leather"], primaryZone: "Dun Morogh", spawns: 50, seenInForever: true },
    { name: "Nightsaber", minLevel: 1, maxLevel: 2, skill: 1, drops: ["Ruined Leather Scraps"], primaryZone: "Teldrassil", spawns: 45, seenInForever: true },
    { name: "Duskstalker", minLevel: 9, maxLevel: 10, skill: 1, drops: ["Light Leather", "Light Hide"], primaryZone: "Teldrassil", spawns: 38, seenInForever: true },

    // --- SKILL 10–75: Levels 11–15 (Light Leather / Light Hide) ---
    { name: "Arra'chea", minLevel: 11, maxLevel: 11, skill: 10, drops: ["Light Leather", "Light Hide"], primaryZone: "Mulgore", spawns: 1, seenInForever: true },
    { name: "Fleeting Plainstrider", minLevel: 12, maxLevel: 13, skill: 20, drops: ["Light Leather", "Light Hide"], primaryZone: "The Barrens", spawns: 16, seenInForever: true },
    { name: "Kolkar Packhound", minLevel: 13, maxLevel: 13, skill: 30, drops: ["Light Leather", "Light Hide"], primaryZone: "The Barrens", spawns: 12, seenInForever: true },
    { name: "Sunscale Screecher", minLevel: 13, maxLevel: 15, skill: 30, drops: ["Light Leather", "Light Hide"], primaryZone: "The Barrens", spawns: 20, seenInForever: true },
    { name: "Zhevra Runner", minLevel: 13, maxLevel: 14, skill: 30, drops: ["Light Leather", "Light Hide"], primaryZone: "The Barrens", spawns: 26, seenInForever: true },
    { name: "Savannah Prowler", minLevel: 14, maxLevel: 15, skill: 40, drops: ["Light Leather", "Light Hide"], primaryZone: "The Barrens", spawns: 31, seenInForever: true },
    { name: "Goretusk", minLevel: 14, maxLevel: 15, skill: 40, drops: ["Light Leather", "Light Hide"], primaryZone: "Westfall", spawns: 44, seenInForever: true },
    { name: "Loch Crocolisk", minLevel: 14, maxLevel: 15, skill: 40, drops: ["Light Leather", "Light Hide"], primaryZone: "Loch Modan", spawns: 25, seenInForever: true },

    // --- SKILL 75–150: Levels 16–25 (Medium Leather / Medium Hide) ---
    { name: "Ornery Plainstrider", minLevel: 16, maxLevel: 17, skill: 60, drops: ["Light Leather", "Medium Leather", "Light Hide"], primaryZone: "The Barrens", spawns: 22, seenInForever: true },
    { name: "Sunscale Scytheclaw", minLevel: 16, maxLevel: 18, skill: 70, drops: ["Light Leather", "Medium Leather", "Light Hide"], primaryZone: "The Barrens", spawns: 29, seenInForever: true },
    { name: "Zhevra Charger", minLevel: 17, maxLevel: 18, skill: 70, drops: ["Light Leather", "Medium Leather", "Light Hide"], primaryZone: "The Barrens", spawns: 17, seenInForever: true },
    { name: "Hecklefang Snarler", minLevel: 18, maxLevel: 19, skill: 80, drops: ["Light Leather", "Medium Leather"], primaryZone: "The Barrens", spawns: 13, seenInForever: true },
    { name: "Thunderhawk Hatchling", minLevel: 18, maxLevel: 20, skill: 90, drops: ["Light Leather", "Medium Leather"], primaryZone: "The Barrens", spawns: 18, seenInForever: true },
    { name: "Savannah Highpercher", minLevel: 21, maxLevel: 22, skill: 105, drops: ["Medium Leather", "Medium Hide"], primaryZone: "The Barrens", spawns: 24, seenInForever: true },
    { name: "Ashenvale Bear", minLevel: 21, maxLevel: 23, skill: 105, drops: ["Medium Leather", "Medium Hide"], primaryZone: "Ashenvale", spawns: 35, seenInForever: true },
    { name: "Ghostpaw Alpha", minLevel: 22, maxLevel: 24, skill: 110, drops: ["Medium Leather", "Medium Hide"], primaryZone: "Ashenvale", spawns: 32, seenInForever: true },
    { name: "Elder Moss Creeper", minLevel: 24, maxLevel: 25, skill: 120, drops: ["Medium Leather", "Medium Hide"], primaryZone: "Hillsbrad Foothills", spawns: 28, seenInForever: true },
    { name: "Giant Wetlands Crocolisk", minLevel: 24, maxLevel: 26, skill: 120, drops: ["Medium Leather", "Heavy Leather"], primaryZone: "Wetlands", spawns: 30, seenInForever: true },
    { name: "Mire Monster", minLevel: 25, maxLevel: 26, skill: 125, drops: ["Medium Leather", "Heavy Leather"], primaryZone: "Dustwallow Marsh", spawns: 22, seenInForever: true },

    // --- SKILL 150–225: Levels 26–35 (Heavy Leather / Heavy Hide) ---
    { name: "Snapjaw", minLevel: 28, maxLevel: 30, skill: 140, drops: ["Heavy Leather", "Medium Leather"], primaryZone: "Hillsbrad Foothills", spawns: 40, seenInForever: true },
    { name: "Scorpashi Snapper", minLevel: 30, maxLevel: 31, skill: 155, drops: ["Heavy Leather", "Medium Leather", "Heavy Hide"], primaryZone: "Desolace", spawns: 28, seenInForever: true },
    { name: "Gritjaw Basilisk", minLevel: 31, maxLevel: 32, skill: 160, drops: ["Heavy Leather", "Heavy Hide"], primaryZone: "Stranglethorn Vale", spawns: 25, seenInForever: true },
    { name: "Young Stranglethorn Tiger", minLevel: 30, maxLevel: 31, skill: 155, drops: ["Heavy Leather", "Heavy Hide"], primaryZone: "Stranglethorn Vale", spawns: 45, seenInForever: true },
    { name: "Stranglethorn Raptor", minLevel: 32, maxLevel: 34, skill: 160, drops: ["Heavy Leather", "Heavy Hide"], primaryZone: "Stranglethorn Vale", spawns: 50, seenInForever: true },
    { name: "Raging Thunder Lizard", minLevel: 33, maxLevel: 34, skill: 170, drops: ["Heavy Leather", "Heavy Hide"], primaryZone: "The Barrens", spawns: 18, seenInForever: true },
    { name: "Elder Salt Flats Scorpid", minLevel: 34, maxLevel: 35, skill: 175, drops: ["Heavy Leather", "Heavy Hide"], primaryZone: "Thousand Needles", spawns: 32, seenInForever: true },
    { name: "Hulking Gritjaw Basilisk", minLevel: 35, maxLevel: 36, skill: 180, drops: ["Heavy Leather", "Thick Leather", "Heavy Hide"], primaryZone: "Stranglethorn Vale", spawns: 33, seenInForever: true },

    // --- SKILL 225–300: Levels 36–60 (Thick Leather / Rugged Leather) ---
    { name: "Elder Thunder Lizard", minLevel: 37, maxLevel: 38, skill: 190, drops: ["Heavy Leather", "Thick Leather", "Heavy Hide"], primaryZone: "Desolace", spawns: 20, seenInForever: true },
    { name: "Ley Hunter", minLevel: 39, maxLevel: 40, skill: 200, drops: ["Heavy Leather", "Thick Leather"], primaryZone: "Desolace", spawns: 15, seenInForever: true },
    { name: "Jungle Stalker", minLevel: 40, maxLevel: 42, skill: 205, drops: ["Thick Leather", "Heavy Hide"], primaryZone: "Stranglethorn Vale", spawns: 38, seenInForever: true },
    { name: "Wastewander Hyena", minLevel: 41, maxLevel: 43, skill: 210, drops: ["Thick Leather", "Thick Hide"], primaryZone: "Tanaris", spawns: 40, seenInForever: true },
    { name: "Blisterpaw Hyena", minLevel: 42, maxLevel: 44, skill: 215, drops: ["Thick Leather", "Thick Hide"], primaryZone: "Tanaris", spawns: 36, seenInForever: true },
    { name: "Ironfur Bear", minLevel: 44, maxLevel: 46, skill: 225, drops: ["Thick Leather", "Thick Hide"], primaryZone: "Feralas", spawns: 45, seenInForever: true },
    { name: "Groddoc Ape", minLevel: 46, maxLevel: 48, skill: 235, drops: ["Thick Leather", "Rugged Leather"], primaryZone: "Feralas", spawns: 40, seenInForever: true },
    { name: "Snickerfang Hyena", minLevel: 48, maxLevel: 50, skill: 245, drops: ["Thick Leather", "Rugged Leather"], primaryZone: "Blasted Lands", spawns: 35, seenInForever: true },
    { name: "Steelfur Bear", minLevel: 50, maxLevel: 52, skill: 255, drops: ["Rugged Leather", "Rugged Hide"], primaryZone: "Winterspring", spawns: 50, seenInForever: true },
    { name: "Frostsaber", minLevel: 53, maxLevel: 55, skill: 270, drops: ["Rugged Leather", "Rugged Hide"], primaryZone: "Winterspring", spawns: 55, seenInForever: true },
    { name: "Plaguehound", minLevel: 54, maxLevel: 56, skill: 275, drops: ["Rugged Leather", "Rugged Hide"], primaryZone: "Eastern Plaguelands", spawns: 42, seenInForever: true },
    { name: "Devilsaur", minLevel: 55, maxLevel: 55, skill: 275, drops: ["Devilsaur Leather", "Rugged Leather"], primaryZone: "Un'Goro Crater", spawns: 12, seenInForever: true },
    { name: "Ironhide Devilsaur", minLevel: 56, maxLevel: 57, skill: 285, drops: ["Devilsaur Leather", "Rugged Leather"], primaryZone: "Un'Goro Crater", spawns: 10, seenInForever: true },
    { name: "Chimera", minLevel: 56, maxLevel: 58, skill: 285, drops: ["Chimera Leather", "Rugged Leather"], primaryZone: "Winterspring", spawns: 30, seenInForever: true }
  ];

  window.WOW_SKINNING_ZONES = [
    { zone: "Mulgore", levels: "1–10", bestForSkill: "1–50", faction: "Horde" },
    { zone: "Durotar", levels: "1–10", bestForSkill: "1–50", faction: "Horde" },
    { zone: "Elwynn Forest", levels: "1–10", bestForSkill: "1–50", faction: "Alliance" },
    { zone: "Dun Morogh", levels: "1–10", bestForSkill: "1–50", faction: "Alliance" },
    { zone: "Teldrassil", levels: "1–10", bestForSkill: "1–50", faction: "Alliance" },
    { zone: "The Barrens", levels: "10–25", bestForSkill: "50–130", faction: "Horde" },
    { zone: "Westfall", levels: "10–20", bestForSkill: "50–100", faction: "Alliance" },
    { zone: "Loch Modan", levels: "10–20", bestForSkill: "50–100", faction: "Alliance" },
    { zone: "Ashenvale", levels: "20–30", bestForSkill: "100–150", faction: "Contested" },
    { zone: "Hillsbrad Foothills", levels: "20–30", bestForSkill: "100–150", faction: "Contested" },
    { zone: "Wetlands", levels: "20–30", bestForSkill: "100–150", faction: "Contested" },
    { zone: "Stranglethorn Vale", levels: "30–45", bestForSkill: "150–225", faction: "Contested" },
    { zone: "Thousand Needles", levels: "25–35", bestForSkill: "125–175", faction: "Contested" },
    { zone: "Desolace", levels: "30–40", bestForSkill: "150–200", faction: "Contested" },
    { zone: "Dustwallow Marsh", levels: "35–45", bestForSkill: "175–225", faction: "Contested" },
    { zone: "Tanaris", levels: "40–50", bestForSkill: "200–250", faction: "Contested" },
    { zone: "Feralas", levels: "40–50", bestForSkill: "200–250", faction: "Contested" },
    { zone: "Un'Goro Crater", levels: "50–55", bestForSkill: "250–280", faction: "Contested" },
    { zone: "Winterspring", levels: "55–60", bestForSkill: "275–300", faction: "Contested" },
    { zone: "Eastern Plaguelands", levels: "55–60", bestForSkill: "275–300", faction: "Contested" }
  ];
})();
