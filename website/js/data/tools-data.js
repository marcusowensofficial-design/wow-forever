/**
 * World of Warcraft: Forever - Interactive Tools & Mechanics Dataset
 * Dedicated dataset for:
 * 1. Tier List Maker (Specs, Classes, Races, Combos)
 * 2. Downranking Calculator (Build 1.60.6 vs Classic Era 1.15.9)
 * 3. Hidden Items & Datamining Obfuscation Tracker
 * 4. Dungeon Encounter Atlas & Boss Loot Tables
 * 5. Curated Classic+ Guides
 */

const WOW_TOOLS_DATA = {
  // 1. TIER LIST TOKENS
  tierList: {
    specs: {
      dps: [
        { id: "warrior-arms", name: "Arms Warrior", class: "Warrior", color: "#C79C6E", icon: "https://render.worldofwarcraft.com/us/icons/56/ability_rogue_eviscerate.jpg", role: "DPS" },
        { id: "warrior-fury", name: "Fury Warrior", class: "Warrior", color: "#C79C6E", icon: "https://render.worldofwarcraft.com/us/icons/56/ability_warrior_innerrage.jpg", role: "DPS" },
        { id: "paladin-ret", name: "Ret Paladin", class: "Paladin", color: "#F58CBA", icon: "https://render.worldofwarcraft.com/us/icons/56/spell_holy_auraoflight.jpg", role: "DPS" },
        { id: "hunter-bm", name: "BM Hunter", class: "Hunter", color: "#ABD473", icon: "https://render.worldofwarcraft.com/us/icons/56/ability_hunter_beasttaming.jpg", role: "DPS" },
        { id: "hunter-mm", name: "Marksman Hunter", class: "Hunter", color: "#ABD473", icon: "https://render.worldofwarcraft.com/us/icons/56/ability_marksmanship.jpg", role: "DPS" },
        { id: "hunter-surv", name: "Survival Hunter", class: "Hunter", color: "#ABD473", icon: "https://render.worldofwarcraft.com/us/icons/56/ability_hunter_swiftstrike.jpg", role: "DPS" },
        { id: "rogue-sin", name: "Assassin Rogue", class: "Rogue", color: "#FFF569", icon: "https://render.worldofwarcraft.com/us/icons/56/ability_rogue_deadlybrew.jpg", role: "DPS" },
        { id: "rogue-combat", name: "Combat Rogue", class: "Rogue", color: "#FFF569", icon: "https://render.worldofwarcraft.com/us/icons/56/ability_backstab.jpg", role: "DPS" },
        { id: "rogue-sub", name: "Subtlety Rogue", class: "Rogue", color: "#FFF569", icon: "https://render.worldofwarcraft.com/us/icons/56/ability_stealth.jpg", role: "DPS" },
        { id: "priest-shadow", name: "Shadow Priest", class: "Priest", color: "#FFFFFF", icon: "https://render.worldofwarcraft.com/us/icons/56/spell_shadow_shadowwordpain.jpg", role: "DPS" },
        { id: "shaman-ele", name: "Ele Shaman", class: "Shaman", color: "#2B8CFF", icon: "https://render.worldofwarcraft.com/us/icons/56/spell_nature_lightning.jpg", role: "DPS" },
        { id: "shaman-enh", name: "Enhance Shaman", class: "Shaman", color: "#2B8CFF", icon: "https://render.worldofwarcraft.com/us/icons/56/spell_nature_lightningshield.jpg", role: "DPS" },
        { id: "mage-arcane", name: "Arcane Mage", class: "Mage", color: "#69CCF0", icon: "https://render.worldofwarcraft.com/us/icons/56/spell_holy_magicalsentry.jpg", role: "DPS" },
        { id: "mage-fire", name: "Fire Mage", class: "Mage", color: "#69CCF0", icon: "https://render.worldofwarcraft.com/us/icons/56/spell_fire_firebolt02.jpg", role: "DPS" },
        { id: "mage-frost", name: "Frost Mage", class: "Mage", color: "#69CCF0", icon: "https://render.worldofwarcraft.com/us/icons/56/spell_frost_frostbolt02.jpg", role: "DPS" },
        { id: "warlock-aff", name: "Afflic Warlock", class: "Warlock", color: "#9482C9", icon: "https://render.worldofwarcraft.com/us/icons/56/spell_shadow_deathcoil.jpg", role: "DPS" },
        { id: "warlock-demo", name: "Demo Warlock", class: "Warlock", color: "#9482C9", icon: "https://render.worldofwarcraft.com/us/icons/56/spell_shadow_metamorphosis.jpg", role: "DPS" },
        { id: "warlock-destro", name: "Destro Warlock", class: "Warlock", color: "#9482C9", icon: "https://render.worldofwarcraft.com/us/icons/56/spell_shadow_rainoffire.jpg", role: "DPS" },
        { id: "druid-bal", name: "Balance Druid", class: "Druid", color: "#FF7D0A", icon: "https://render.worldofwarcraft.com/us/icons/56/spell_nature_starfall.jpg", role: "DPS" },
        { id: "druid-feraldps", name: "Feral Cat Druid", class: "Druid", color: "#FF7D0A", icon: "https://render.worldofwarcraft.com/us/icons/56/ability_druid_catform.jpg", role: "DPS" }
      ],
      tanks: [
        { id: "warrior-prot", name: "Prot Warrior", class: "Warrior", color: "#C79C6E", icon: "https://render.worldofwarcraft.com/us/icons/56/inv_shield_06.jpg", role: "Tank" },
        { id: "paladin-prot", name: "Prot Paladin", class: "Paladin", color: "#F58CBA", icon: "https://render.worldofwarcraft.com/us/icons/56/spell_holy_devotionaura.jpg", role: "Tank" },
        { id: "druid-bear", name: "Feral Bear Druid", class: "Druid", color: "#FF7D0A", icon: "https://render.worldofwarcraft.com/us/icons/56/ability_racial_bearform.jpg", role: "Tank" }
      ],
      healers: [
        { id: "priest-holy", name: "Holy Priest", class: "Priest", color: "#FFFFFF", icon: "https://render.worldofwarcraft.com/us/icons/56/spell_holy_guardianspirit.jpg", role: "Healer" },
        { id: "priest-disc", name: "Discipline Priest", class: "Priest", color: "#FFFFFF", icon: "https://render.worldofwarcraft.com/us/icons/56/spell_holy_powerwordshield.jpg", role: "Healer" },
        { id: "paladin-holy", name: "Holy Paladin", class: "Paladin", color: "#F58CBA", icon: "https://render.worldofwarcraft.com/us/icons/56/spell_holy_holybolt.jpg", role: "Healer" },
        { id: "shaman-resto", name: "Resto Shaman", class: "Shaman", color: "#2B8CFF", icon: "https://render.worldofwarcraft.com/us/icons/56/spell_nature_magicimmunity.jpg", role: "Healer" },
        { id: "druid-resto", name: "Resto Druid", class: "Druid", color: "#FF7D0A", icon: "https://render.worldofwarcraft.com/us/icons/56/spell_nature_healingtouch.jpg", role: "Healer" }
      ]
    },
    classes: [
      { id: "class-warrior", name: "Warrior", color: "#C79C6E", icon: "https://render.worldofwarcraft.com/us/icons/56/classicon_warrior.jpg" },
      { id: "class-paladin", name: "Paladin", color: "#F58CBA", icon: "https://render.worldofwarcraft.com/us/icons/56/classicon_paladin.jpg" },
      { id: "class-hunter", name: "Hunter", color: "#ABD473", icon: "https://render.worldofwarcraft.com/us/icons/56/classicon_hunter.jpg" },
      { id: "class-rogue", name: "Rogue", color: "#FFF569", icon: "https://render.worldofwarcraft.com/us/icons/56/classicon_rogue.jpg" },
      { id: "class-priest", name: "Priest", color: "#FFFFFF", icon: "https://render.worldofwarcraft.com/us/icons/56/classicon_priest.jpg" },
      { id: "class-shaman", name: "Shaman", color: "#2B8CFF", icon: "https://render.worldofwarcraft.com/us/icons/56/classicon_shaman.jpg" },
      { id: "class-mage", name: "Mage", color: "#69CCF0", icon: "https://render.worldofwarcraft.com/us/icons/56/classicon_mage.jpg" },
      { id: "class-warlock", name: "Warlock", color: "#9482C9", icon: "https://render.worldofwarcraft.com/us/icons/56/classicon_warlock.jpg" },
      { id: "class-druid", name: "Druid", color: "#FF7D0A", icon: "https://render.worldofwarcraft.com/us/icons/56/classicon_druid.jpg" }
    ],
    races: [
      { id: "race-human", name: "Human", faction: "Alliance", color: "#4A8BE8", icon: "https://render.worldofwarcraft.com/us/icons/56/race_human_male.jpg" },
      { id: "race-dwarf", name: "Dwarf (Wildhammer)", faction: "Alliance", color: "#4A8BE8", icon: "https://render.worldofwarcraft.com/us/icons/56/race_dwarf_male.jpg" },
      { id: "race-nightelf", name: "Night Elf", faction: "Alliance", color: "#4A8BE8", icon: "https://render.worldofwarcraft.com/us/icons/56/achievement_character_nightelf_male.jpg" },
      { id: "race-gnome", name: "Gnome", faction: "Alliance", color: "#4A8BE8", icon: "https://render.worldofwarcraft.com/us/icons/56/race_gnome_male.jpg" },
      { id: "race-skyborne-all", name: "Skyborne (Sunstrider)", faction: "Alliance", color: "#38bdf8", icon: "https://render.worldofwarcraft.com/us/icons/56/inv_misc_head_elf_01.jpg" },
      { id: "race-orc", name: "Orc", faction: "Horde", color: "#D8392B", icon: "https://render.worldofwarcraft.com/us/icons/56/race_orc_male.jpg" },
      { id: "race-undead", name: "Forsaken (Undead)", faction: "Horde", color: "#D8392B", icon: "https://render.worldofwarcraft.com/us/icons/56/achievement_character_undead_male.jpg" },
      { id: "race-tauren", name: "Tauren", faction: "Horde", color: "#D8392B", icon: "https://render.worldofwarcraft.com/us/icons/56/race_tauren_male.jpg" },
      { id: "race-troll", name: "Troll", faction: "Horde", color: "#D8392B", icon: "https://render.worldofwarcraft.com/us/icons/56/race_troll_male.jpg" },
      { id: "race-skyborne-hor", name: "Skyborne (Gryphonwing)", faction: "Horde", color: "#f97316", icon: "https://render.worldofwarcraft.com/us/icons/56/inv_misc_head_elf_02.jpg" }
    ],
    combosHighlight: [
      { id: "combo-undead-paladin", name: "Undead Paladin", faction: "Horde", icon: "https://render.worldofwarcraft.com/us/icons/56/spell_holy_holybolt.jpg", isNew: true },
      { id: "combo-dwarf-shaman", name: "Dwarf Shaman", faction: "Alliance", icon: "https://render.worldofwarcraft.com/us/icons/56/spell_nature_lightning.jpg", isNew: true },
      { id: "combo-human-hunter", name: "Human Hunter", faction: "Alliance", icon: "https://render.worldofwarcraft.com/us/icons/56/ability_marksmanship.jpg", isNew: true },
      { id: "combo-gnome-priest", name: "Gnome Priest", faction: "Alliance", icon: "https://render.worldofwarcraft.com/us/icons/56/spell_holy_powerwordshield.jpg", isNew: true },
      { id: "combo-orc-mage", name: "Orc Mage", faction: "Horde", icon: "https://render.worldofwarcraft.com/us/icons/56/spell_fire_firebolt02.jpg", isNew: true },
      { id: "combo-troll-warlock", name: "Troll Warlock", faction: "Horde", icon: "https://render.worldofwarcraft.com/us/icons/56/spell_shadow_deathcoil.jpg", isNew: true },
      { id: "combo-skyborne-druid", name: "Skyborne Druid", faction: "Both", icon: "https://render.worldofwarcraft.com/us/icons/56/spell_nature_starfall.jpg", isNew: true },
      { id: "combo-skyborne-warrior", name: "Skyborne Warrior", faction: "Both", icon: "https://render.worldofwarcraft.com/us/icons/56/ability_rogue_eviscerate.jpg", isNew: true },
      { id: "combo-skyborne-hunter", name: "Skyborne Hunter", faction: "Both", icon: "https://render.worldofwarcraft.com/us/icons/56/ability_hunter_beasttaming.jpg", isNew: true },
      { id: "combo-skyborne-rogue", name: "Skyborne Rogue", faction: "Both", icon: "https://render.worldofwarcraft.com/us/icons/56/ability_stealth.jpg", isNew: true }
    ]
  },

  // 2. DOWNRANKING CALCULATOR (WoW Forever Build 1.60.6 vs Classic Era 1.15.9)
  downranking: {
    classes: [
      { id: "priest", name: "Priest", icon: "https://render.worldofwarcraft.com/us/icons/56/classicon_priest.jpg" },
      { id: "druid", name: "Druid", icon: "https://render.worldofwarcraft.com/us/icons/56/classicon_druid.jpg" },
      { id: "paladin", name: "Paladin", icon: "https://render.worldofwarcraft.com/us/icons/56/classicon_paladin.jpg" },
      { id: "shaman", name: "Shaman", icon: "https://render.worldofwarcraft.com/us/icons/56/classicon_shaman.jpg" },
      { id: "mage", name: "Mage", icon: "https://render.worldofwarcraft.com/us/icons/56/classicon_mage.jpg" },
      { id: "warlock", name: "Warlock", icon: "https://render.worldofwarcraft.com/us/icons/56/classicon_warlock.jpg" }
    ],
    spells: {
      priest: [
        {
          id: "heal",
          name: "Heal",
          type: "heal",
          icon: "https://render.worldofwarcraft.com/us/icons/56/spell_holy_heal02.jpg",
          desc: "Direct single target holy heal with 3.0 second cast.",
          baseCast: 3.0,
          ranks: [
            { rank: 1, level: 16, minVal: 295, maxVal: 341, mana: 155, coefForever: 0.857, coefClassic: 0.729 },
            { rank: 2, level: 22, minVal: 429, maxVal: 491, mana: 205, coefForever: 0.857, coefClassic: 0.857 },
            { rank: 3, level: 28, minVal: 566, maxVal: 642, mana: 255, coefForever: 0.857, coefClassic: 0.857 },
            { rank: 4, level: 34, minVal: 712, maxVal: 804, mana: 305, coefForever: 0.857, coefClassic: 0.857 }
          ]
        },
        {
          id: "lesser-heal",
          name: "Lesser Heal",
          type: "heal",
          icon: "https://render.worldofwarcraft.com/us/icons/56/spell_holy_lesserheal.jpg",
          desc: "Early priest heal. Under Classic Era, Rank 1 was penalized by 75% down to 12.3% coefficient; in Forever it gets full 42.9%!",
          baseCast: 2.5,
          ranks: [
            { rank: 1, level: 1, minVal: 46, maxVal: 56, mana: 30, coefForever: 0.429, coefClassic: 0.123 },
            { rank: 2, level: 4, minVal: 71, maxVal: 85, mana: 45, coefForever: 0.571, coefClassic: 0.229 },
            { rank: 3, level: 10, minVal: 135, maxVal: 157, mana: 75, coefForever: 0.714, coefClassic: 0.446 }
          ]
        },
        {
          id: "flash-heal",
          name: "Flash Heal",
          type: "heal",
          icon: "https://render.worldofwarcraft.com/us/icons/56/spell_holy_flashheal.jpg",
          desc: "Fast 1.5s emergency heal.",
          baseCast: 1.5,
          ranks: [
            { rank: 1, level: 20, minVal: 193, maxVal: 237, mana: 125, coefForever: 0.429, coefClassic: 0.429 },
            { rank: 2, level: 26, minVal: 258, maxVal: 314, mana: 155, coefForever: 0.429, coefClassic: 0.429 },
            { rank: 3, level: 32, minVal: 327, maxVal: 393, mana: 185, coefForever: 0.429, coefClassic: 0.429 },
            { rank: 4, level: 38, minVal: 400, maxVal: 478, mana: 215, coefForever: 0.429, coefClassic: 0.429 },
            { rank: 5, level: 44, minVal: 518, maxVal: 616, mana: 265, coefForever: 0.429, coefClassic: 0.429 }
          ]
        },
        {
          id: "renew",
          name: "Renew",
          type: "hot",
          icon: "https://render.worldofwarcraft.com/us/icons/56/spell_holy_renew.jpg",
          desc: "Heal over 15 seconds (5 ticks). Rank 1 retains 100% coefficient in Forever vs 55% in Classic.",
          baseCast: 1.5,
          ticks: 5,
          ranks: [
            { rank: 1, level: 8, minVal: 45, maxVal: 45, mana: 30, coefForever: 1.0, coefClassic: 0.55 },
            { rank: 2, level: 14, minVal: 100, maxVal: 100, mana: 65, coefForever: 1.0, coefClassic: 0.75 },
            { rank: 3, level: 20, minVal: 175, maxVal: 175, mana: 105, coefForever: 1.0, coefClassic: 1.0 },
            { rank: 4, level: 26, minVal: 245, maxVal: 245, mana: 140, coefForever: 1.0, coefClassic: 1.0 },
            { rank: 5, level: 32, minVal: 315, maxVal: 315, mana: 170, coefForever: 1.0, coefClassic: 1.0 }
          ]
        },
        {
          id: "shadow-word-pain",
          name: "Shadow Word: Pain",
          type: "damage",
          icon: "https://render.worldofwarcraft.com/us/icons/56/spell_shadow_shadowwordpain.jpg",
          desc: "Instant shadow DoT over 18 seconds (6 ticks). Rank 1 costs only 25 mana for quick mob tagging and pushback.",
          baseCast: 1.5,
          ticks: 6,
          ranks: [
            { rank: 1, level: 4, minVal: 30, maxVal: 30, mana: 25, coefForever: 1.0, coefClassic: 0.35 },
            { rank: 2, level: 10, minVal: 66, maxVal: 66, mana: 50, coefForever: 1.0, coefClassic: 0.60 },
            { rank: 3, level: 18, minVal: 132, maxVal: 132, mana: 95, coefForever: 1.0, coefClassic: 1.0 },
            { rank: 4, level: 26, minVal: 234, maxVal: 234, mana: 155, coefForever: 1.0, coefClassic: 1.0 }
          ]
        }
      ],
      druid: [
        {
          id: "healing-touch",
          name: "Healing Touch",
          type: "heal",
          icon: "https://render.worldofwarcraft.com/us/icons/56/spell_nature_healingtouch.jpg",
          desc: "Big slow direct heal. In Forever, Rank 1 cast has 42.9% coefficient (up from 12.3% in Classic Era).",
          baseCast: 3.5,
          ranks: [
            { rank: 1, level: 1, minVal: 37, maxVal: 51, mana: 25, coefForever: 0.429, coefClassic: 0.123, cast: 1.5 },
            { rank: 2, level: 8, minVal: 88, maxVal: 112, mana: 55, coefForever: 0.571, coefClassic: 0.354, cast: 2.0 },
            { rank: 3, level: 14, minVal: 195, maxVal: 243, mana: 110, coefForever: 0.714, coefClassic: 0.552, cast: 2.5 },
            { rank: 4, level: 20, minVal: 363, maxVal: 445, mana: 185, coefForever: 0.857, coefClassic: 0.857, cast: 3.0 },
            { rank: 5, level: 26, minVal: 572, maxVal: 694, mana: 270, coefForever: 1.0, coefClassic: 1.0, cast: 3.5 },
            { rank: 6, level: 32, minVal: 742, maxVal: 894, mana: 335, coefForever: 1.0, coefClassic: 1.0, cast: 3.5 }
          ]
        },
        {
          id: "rejuvenation",
          name: "Rejuvenation",
          type: "hot",
          icon: "https://render.worldofwarcraft.com/us/icons/56/spell_nature_rejuvenation.jpg",
          desc: "HoT over 12 seconds. Rank 1 in Forever gets full 80% vs 32% in Classic.",
          baseCast: 1.5,
          ticks: 4,
          ranks: [
            { rank: 1, level: 4, minVal: 32, maxVal: 32, mana: 25, coefForever: 0.80, coefClassic: 0.32 },
            { rank: 2, level: 10, minVal: 56, maxVal: 56, mana: 40, coefForever: 0.80, coefClassic: 0.48 },
            { rank: 3, level: 16, minVal: 116, maxVal: 116, mana: 75, coefForever: 0.80, coefClassic: 0.68 },
            { rank: 4, level: 22, minVal: 180, maxVal: 180, mana: 105, coefForever: 0.80, coefClassic: 0.80 },
            { rank: 5, level: 28, minVal: 244, maxVal: 244, mana: 135, coefForever: 0.80, coefClassic: 0.80 }
          ]
        },
        {
          id: "moonfire",
          name: "Moonfire",
          type: "damage",
          icon: "https://render.worldofwarcraft.com/us/icons/56/spell_nature_starfall.jpg",
          desc: "Instant arcane strike + DoT. Rank 1 costs just 25 mana to destroy enemy totems or break stealth instantly.",
          baseCast: 1.5,
          ticks: 4,
          ranks: [
            { rank: 1, level: 4, minVal: 21, maxVal: 21, mana: 25, coefForever: 0.52, coefClassic: 0.18 },
            { rank: 2, level: 10, minVal: 45, maxVal: 45, mana: 50, coefForever: 0.52, coefClassic: 0.35 },
            { rank: 3, level: 16, minVal: 84, maxVal: 84, mana: 75, coefForever: 0.52, coefClassic: 0.52 },
            { rank: 4, level: 22, minVal: 130, maxVal: 130, mana: 105, coefForever: 0.52, coefClassic: 0.52 },
            { rank: 5, level: 28, minVal: 184, maxVal: 184, mana: 150, coefForever: 0.52, coefClassic: 0.52 }
          ]
        }
      ],
      paladin: [
        {
          id: "holy-light",
          name: "Holy Light",
          type: "heal",
          icon: "https://render.worldofwarcraft.com/us/icons/56/spell_holy_holybolt.jpg",
          desc: "Main paladin heal. 2.5 second cast.",
          baseCast: 2.5,
          ranks: [
            { rank: 1, level: 1, minVal: 39, maxVal: 47, mana: 35, coefForever: 0.714, coefClassic: 0.205 },
            { rank: 2, level: 6, minVal: 76, maxVal: 90, mana: 60, coefForever: 0.714, coefClassic: 0.380 },
            { rank: 3, level: 14, minVal: 159, maxVal: 187, mana: 110, coefForever: 0.714, coefClassic: 0.582 },
            { rank: 4, level: 22, minVal: 310, maxVal: 360, mana: 190, coefForever: 0.714, coefClassic: 0.714 },
            { rank: 5, level: 30, minVal: 468, maxVal: 540, mana: 275, coefForever: 0.714, coefClassic: 0.714 }
          ]
        },
        {
          id: "flash-of-light",
          name: "Flash of Light",
          type: "heal",
          icon: "https://render.worldofwarcraft.com/us/icons/56/spell_holy_flashheal.jpg",
          desc: "Fast 1.5s paladin heal, renowned for extreme mana efficiency.",
          baseCast: 1.5,
          ranks: [
            { rank: 1, level: 20, minVal: 62, maxVal: 72, mana: 35, coefForever: 0.429, coefClassic: 0.429 },
            { rank: 2, level: 26, minVal: 96, maxVal: 110, mana: 50, coefForever: 0.429, coefClassic: 0.429 },
            { rank: 3, level: 34, minVal: 145, maxVal: 163, mana: 70, coefForever: 0.429, coefClassic: 0.429 }
          ]
        }
      ],
      shaman: [
        {
          id: "healing-wave",
          name: "Healing Wave",
          type: "heal",
          icon: "https://render.worldofwarcraft.com/us/icons/56/spell_nature_magicimmunity.jpg",
          desc: "Core Shaman healing spell. Rank 1 has 42.9% coefficient in Forever vs 12.3% in Classic.",
          baseCast: 3.0,
          ranks: [
            { rank: 1, level: 1, minVal: 34, maxVal: 44, mana: 25, coefForever: 0.429, coefClassic: 0.123, cast: 1.5 },
            { rank: 2, level: 6, minVal: 64, maxVal: 78, mana: 45, coefForever: 0.571, coefClassic: 0.285, cast: 2.0 },
            { rank: 3, level: 12, minVal: 129, maxVal: 155, mana: 80, coefForever: 0.714, coefClassic: 0.485, cast: 2.5 },
            { rank: 4, level: 18, minVal: 268, maxVal: 316, mana: 155, coefForever: 0.857, coefClassic: 0.785, cast: 3.0 },
            { rank: 5, level: 24, minVal: 376, maxVal: 440, mana: 200, coefForever: 0.857, coefClassic: 0.857, cast: 3.0 },
            { rank: 6, level: 32, minVal: 536, maxVal: 622, mana: 265, coefForever: 0.857, coefClassic: 0.857, cast: 3.0 }
          ]
        }
      ],
      mage: [
        {
          id: "frostbolt",
          name: "Frostbolt",
          type: "damage",
          icon: "https://render.worldofwarcraft.com/us/icons/56/spell_frost_frostbolt02.jpg",
          desc: "Direct frost damage + 40% slow. Rank 1 cast time is only 1.5s for fast kiting and snare application.",
          baseCast: 3.0,
          ranks: [
            { rank: 1, level: 1, minVal: 20, maxVal: 22, mana: 25, coefForever: 0.429, coefClassic: 0.123, cast: 1.5 },
            { rank: 2, level: 8, minVal: 38, maxVal: 42, mana: 35, coefForever: 0.571, coefClassic: 0.320, cast: 2.0 },
            { rank: 3, level: 14, minVal: 65, maxVal: 71, mana: 50, coefForever: 0.714, coefClassic: 0.510, cast: 2.5 },
            { rank: 4, level: 20, minVal: 104, maxVal: 114, mana: 85, coefForever: 0.814, coefClassic: 0.814, cast: 2.8 },
            { rank: 5, level: 26, minVal: 145, maxVal: 159, mana: 115, coefForever: 0.814, coefClassic: 0.814, cast: 3.0 }
          ]
        },
        {
          id: "blizzard",
          name: "Blizzard",
          type: "damage",
          icon: "https://render.worldofwarcraft.com/us/icons/56/spell_frost_icestorm.jpg",
          desc: "Channeled AoE frost storm over 8 seconds. Rank 1 costs only 320 mana for 75% Improved Blizzard snare across mob packs.",
          baseCast: 8.0,
          ticks: 8,
          ranks: [
            { rank: 1, level: 20, minVal: 200, maxVal: 200, mana: 320, coefForever: 0.33, coefClassic: 0.33 },
            { rank: 2, level: 28, minVal: 352, maxVal: 352, mana: 520, coefForever: 0.33, coefClassic: 0.33 },
            { rank: 3, level: 36, minVal: 520, maxVal: 520, mana: 720, coefForever: 0.33, coefClassic: 0.33 }
          ]
        }
      ],
      warlock: [
        {
          id: "shadow-bolt",
          name: "Shadow Bolt",
          type: "damage",
          icon: "https://render.worldofwarcraft.com/us/icons/56/spell_shadow_shadowbolt.jpg",
          desc: "Direct shadow nuke. Can proc Shadow Vulnerability (ISB).",
          baseCast: 3.0,
          ranks: [
            { rank: 1, level: 1, minVal: 13, maxVal: 18, mana: 25, coefForever: 0.429, coefClassic: 0.123, cast: 1.7 },
            { rank: 2, level: 6, minVal: 26, maxVal: 34, mana: 40, coefForever: 0.571, coefClassic: 0.315, cast: 2.2 },
            { rank: 3, level: 12, minVal: 52, maxVal: 64, mana: 70, coefForever: 0.714, coefClassic: 0.510, cast: 2.8 },
            { rank: 4, level: 20, minVal: 106, maxVal: 124, mana: 110, coefForever: 0.857, coefClassic: 0.857, cast: 3.0 },
            { rank: 5, level: 28, minVal: 169, maxVal: 195, mana: 160, coefForever: 0.857, coefClassic: 0.857, cast: 3.0 }
          ]
        },
        {
          id: "life-tap",
          name: "Life Tap",
          type: "heal",
          icon: "https://render.worldofwarcraft.com/us/icons/56/spell_shadow_burningspirit.jpg",
          desc: "Instant conversion of Health to Mana. Rank 1 sacrifices minimal HP (30 HP) into 30 Mana with zero threat overhead.",
          baseCast: 1.5,
          ranks: [
            { rank: 1, level: 6, minVal: 30, maxVal: 30, mana: 1, coefForever: 0.80, coefClassic: 0.35 },
            { rank: 2, level: 16, minVal: 75, maxVal: 75, mana: 1, coefForever: 0.80, coefClassic: 0.80 },
            { rank: 3, level: 26, minVal: 140, maxVal: 140, mana: 1, coefForever: 0.80, coefClassic: 0.80 },
            { rank: 4, level: 36, minVal: 220, maxVal: 220, mana: 1, coefForever: 0.80, coefClassic: 0.80 }
          ]
        }
      ]
    }
  },

  // 3. ITEMS BLIZZARD IS HIDING (OBFUSCATION TRACKER)
  hiddenItems: {
    stats: {
      totalNewItems: 2425,
      revealedNewItems: 639,
      revealedPercent: 26.35,
      classicItemsHidden: 5006,
      classicRevealed: 3134,
      sodLeftovers: 5168,
      lastUpdated: "October 9, 2026"
    },
    demoItem: {
      id: 273049,
      icon: "https://render.worldofwarcraft.com/us/icons/56/inv_misc_necklacea8.jpg",
      hidden: {
        name: "Retrieving item information",
        slot: "Neck",
        type: "Miscellaneous",
        status: "Obfuscated on Client"
      },
      revealed: {
        name: "Archmagister's Faceted Pendant",
        quality: "Rare",
        qualityClass: "q3",
        iLvl: 35,
        slot: "Neck",
        binding: "Binds when picked up",
        stats: ["+6 Intellect", "Requires Level 30"],
        equipEffect: "Equip: +12 Attack Power",
        useEffect: "Use: Increase experience gained from slaying Undead by 10% for 5 min. (15 Min Cooldown)",
        sellPrice: "35s 20c"
      }
    },
    recentReveals: [
      { id: 273049, name: "Archmagister's Faceted Pendant", iLvl: 35, slot: "Neck", quality: "q3", icon: "https://render.worldofwarcraft.com/us/icons/56/inv_misc_necklacea8.jpg", source: "City of Dalaran (Shade of Archmage)" },
      { id: 273051, name: "Violet Sorcerer's Mantle", iLvl: 35, slot: "Shoulder", quality: "q3", icon: "https://render.worldofwarcraft.com/us/icons/56/inv_shoulder_02.jpg", source: "City of Dalaran" },
      { id: 273052, name: "Ponderous Orb", iLvl: 35, slot: "Off-hand", quality: "q3", icon: "https://render.worldofwarcraft.com/us/icons/56/inv_misc_orb_04.jpg", source: "City of Dalaran" },
      { id: 273037, name: "Felbough Arm", iLvl: 34, slot: "Two-Hand", quality: "q3", icon: "https://render.worldofwarcraft.com/us/icons/56/inv_spear_08.jpg", source: "Excavation Site 4" },
      { id: 273038, name: "Garb of Fallen Felbark", iLvl: 34, slot: "Chest", quality: "q3", icon: "https://render.worldofwarcraft.com/us/icons/56/inv_shirt_09.jpg", source: "Excavation Site 4" },
      { id: 273039, name: "Blightleaf Rope", iLvl: 34, slot: "Waist", quality: "q3", icon: "https://render.worldofwarcraft.com/us/icons/56/inv_belt_10.jpg", source: "Excavation Site 4" },
      { id: 286988, name: "Violet Sorcerer's Leggings", iLvl: 34, slot: "Legs", quality: "q3", icon: "https://render.worldofwarcraft.com/us/icons/56/inv_pants_cloth_18.jpg", source: "City of Dalaran" },
      { id: 273040, name: "Spine of the Devourer", iLvl: 33, slot: "Two-Hand Staff", quality: "q3", icon: "https://render.worldofwarcraft.com/us/icons/56/inv_staff_07.jpg", source: "Excavation Site 4" },
      { id: 273046, name: "Guardian's Dualblade", iLvl: 33, slot: "Two-Hand Axe", quality: "q3", icon: "https://render.worldofwarcraft.com/us/icons/56/inv_throwingaxe_05.jpg", source: "City of Dalaran Sentinel" },
      { id: 273055, name: "Bonepile Gaze", iLvl: 33, slot: "Shield", quality: "q3", icon: "https://render.worldofwarcraft.com/us/icons/56/inv_shield_02.jpg", source: "City of Dalaran (Underbelly)" }
    ]
  },

  // 4. DETAILED BOSS LOOT TABLES (For Forever Dungeons Atlas)
  detailedDungeonLoot: {
    "dungeon-04": {
      name: "City of Dalaran (Under Siege)",
      levelRange: "28 – 33",
      zone: "Alterac Mountains",
      status: "Active in Beta Phase 2 (Day 22)",
      bossCount: 8,
      dropsCount: 28,
      dropsSeen: 28,
      entrance: "Hidden sewer drain pipe beneath Alterac Mountain ridges into Dalaran Underbelly.",
      bosses: [
        {
          name: "Arcane Anomaly",
          title: "Guardian of the Breach",
          drops: [
            { name: "Ponderous Orb", slot: "Off-Hand", iLvl: 35, quality: "q3", stats: "+7 Intellect, +4 Spirit, Equip: Restores 3 mana per 5 sec." },
            { name: "Violet Sorcerer's Sandals", slot: "Cloth Feet", iLvl: 33, quality: "q3", stats: "+5 Stamina, +8 Intellect, +6 Spell Damage" }
          ]
        },
        {
          name: "Unstable Sentinel",
          title: "Kirin Tor Automaton",
          drops: [
            { name: "Guardian's Dualblade", slot: "Two-Hand Axe", iLvl: 33, quality: "q3", stats: "74 - 112 Damage, Speed 3.40 (27.4 DPS), +12 Strength, +8 Stamina" },
            { name: "Unstable Crystalline Shoulderpads", slot: "Mail Shoulder", iLvl: 33, quality: "q3", stats: "148 Armor, +8 Agility, +7 Stamina, +5 Attack Power" }
          ]
        },
        {
          name: "Shade of the Archmage",
          title: "Corrupted Kirin Tor Council",
          drops: [
            { name: "Archmagister's Faceted Pendant", slot: "Neck", iLvl: 35, quality: "q3", stats: "+6 Intellect, Equip: +12 Attack Power, Use: +10% Undead XP (5m)" },
            { name: "Violet Sorcerer's Mantle", slot: "Cloth Shoulder", iLvl: 35, quality: "q3", stats: "48 Armor, +9 Intellect, +6 Stamina, +11 Arcane/Frost Spell Damage" },
            { name: "Wand of Mana Concentration", slot: "Wand", iLvl: 32, quality: "q3", stats: "58 - 108 Arcane Damage, Speed 1.80 (46.1 DPS), +4 Intellect" }
          ]
        }
      ]
    },
    "dungeon-03": {
      name: "Excavation Site 4",
      levelRange: "26 – 31",
      zone: "Wetlands (Above Whelgar's Excavation)",
      status: "Active in Beta Phase 2 (Day 22)",
      bossCount: 4,
      dropsCount: 13,
      dropsSeen: 11,
      entrance: "Titan tunnel entrance nestled above the northern Wetlands dig site cliffs.",
      bosses: [
        {
          name: "Dark Iron Surveyor Brand",
          title: "Demolitions Master",
          drops: [
            { name: "Blightleaf Rope", slot: "Leather Waist", iLvl: 34, quality: "q3", stats: "58 Armor, +8 Agility, +6 Stamina, +4 Hit Rating" },
            { name: "Dark Iron Prospector's Hatchet", slot: "One-Hand Axe", iLvl: 32, quality: "q3", stats: "36 - 68 Damage, Speed 2.20 (23.6 DPS), +6 Strength, +4 Stamina" }
          ]
        },
        {
          name: "Sentinel Archeus",
          title: "Awakened Titan Watcher",
          drops: [
            { name: "Felbough Arm", slot: "Two-Hand Polearm", iLvl: 34, quality: "q3", stats: "78 - 118 Damage, Speed 3.20 (30.6 DPS), +14 Strength, +10 Stamina" },
            { name: "Spine of the Devourer", slot: "Staff", iLvl: 33, quality: "q3", stats: "64 - 98 Damage, Speed 2.80, +12 Spirit, +8 Stamina, +14 Healing Spells" }
          ]
        }
      ]
    },
    "dungeon-01": {
      name: "Hall of Thanes",
      levelRange: "13 – 18",
      zone: "Ironforge Depths (Khaz Modan)",
      status: "Active in Beta Phase 1 & 2",
      bossCount: 4,
      dropsCount: 16,
      dropsSeen: 16,
      entrance: "Hidden vault gateway beneath the Great Forge, next to the High Seat passage.",
      bosses: [
        {
          name: "Thane Magni's Remnant",
          title: "Ancient Dwarf King Spirit",
          drops: [
            { name: "Thane's Runic Ring", slot: "Finger", iLvl: 18, quality: "q3", stats: "+3 Strength, +3 Stamina, +2 Defense" },
            { name: "Forgewarden Buckler", slot: "Shield", iLvl: 18, quality: "q3", stats: "382 Armor, 11 Block, +4 Stamina, +2 Spirit" }
          ]
        },
        {
          name: "The Lithic Golem",
          title: "Deepstone Behemoth",
          drops: [
            { name: "Trogg-Cracker Mallet", slot: "Two-Hand Mace", iLvl: 18, quality: "q3", stats: "38 - 58 Damage, Speed 3.10 (15.5 DPS), +5 Strength" },
            { name: "Deepstone Carved Bracers", slot: "Plate Wrist", iLvl: 17, quality: "q2", stats: "98 Armor, +3 Strength, +3 Stamina" }
          ]
        }
      ]
    },
    "dungeon-02": {
      name: "Ruins of Lordaeron",
      levelRange: "15 – 20",
      zone: "Tirisfal Glades (Underbelly)",
      status: "Active in Beta Phase 1 & 2",
      bossCount: 4,
      dropsCount: 18,
      dropsSeen: 18,
      entrance: "Courtyard of the ruined palace of Capital City.",
      bosses: [
        {
          name: "Commander Valerius",
          title: "Scarlet Prelate",
          drops: [
            { name: "Crown of the Lost Kingdom", slot: "Mail Head", iLvl: 20, quality: "q3", stats: "142 Armor, +6 Strength, +5 Stamina, +3 Spirit" },
            { name: "Lordaeron Crested Shield", slot: "Shield", iLvl: 20, quality: "q3", stats: "420 Armor, 14 Block, +4 Strength, +3 Stamina" }
          ]
        },
        {
          name: "Archmage Aethelred's Echo",
          title: "Spectral Conjurer",
          drops: [
            { name: "Mantle of the Penitent", slot: "Cloth Shoulder", iLvl: 20, quality: "q3", stats: "32 Armor, +5 Intellect, +4 Spirit, +5 Spell Damage" },
            { name: "Royal Apparition Dagger", slot: "Dagger", iLvl: 20, quality: "q3", stats: "18 - 34 Damage, Speed 1.60 (16.2 DPS), +3 Agility, +3 Stamina" }
          ]
        }
      ]
    }
  },

  // 5. CURATED COMMUNITY GUIDES
  guides: [
    {
      id: "guide-sleeping-bag",
      title: "Cozy Sleeping Bag Guide (+3% XP Buff & Student Fodder)",
      category: "Leveling & Quests",
      source: "ForeverChanges.pro · Warcraft Tavern · Wowhead",
      icon: "https://render.worldofwarcraft.com/us/icons/56/spell_nature_sleep.jpg",
      summary: "Rest in the Cozy Sleeping Bag for 3 minutes to gain a stacking +3% experience bonus for 2 hours, plus 4x Student Fodder consumable rested charges.",
      content: `### Overview: The Ultimate Classic+ Leveling Artifact
The **Cozy Sleeping Bag** is the premier open-world utility item in WoW Forever. When deployed outdoors or inside player-pitched tents, it grants stacking experience acceleration and accelerates rested experience gain.

💡 **Core Mechanic:** Channel the sleeping bag for 3 minutes (1 min per stack). You earn the **Well-Rested** aura granting **+3% Experience** from monster kills and quest turn-ins for 2 full hours (7,200 seconds)!

| Item Attribute | Specification |
| Name | Cozy Sleeping Bag |
| Item Level | 40 (Requires Level 14 to start quest) |
| Cooldown | 60 Minutes |
| Duration on Ground | 20 Minutes (party members can share!) |
| Rested Buff | +1% XP per minute rested (max 3 stacks = +3% XP) |
| Buff Duration | 2 Hours (persists through death) |

---

### Complete 5-Step Cross-Continent Walkthrough

#### Step 1: "...and that note you found" (Level 14 Req)
🗺️ **Alliance Start:** Alexston Farmstead, Westfall (\`37.4, 50.6\`) — Click the *Burned-Out Remains* in the scorched wheat field.
🗺️ **Horde Start:** Field of Giants, The Barrens (\`46.4, 73.9\`) — Click the *Burned-Out Remains* beside the ruined watchtower.
• **Objective:** Loot the charred traveler's journal note to accept the cross-continent breadcrumb.
• **Reward:** Swiftness Potion (+50% speed for 15s) + Lesser Troll's Blood Elixir.

#### Step 2: "Stepping Stones" (Opposite Continent)
🗺️ **Alliance Turn-in:** Journey across the sea to The Barrens (\`46.4, 73.9\`) to inspect the Horde Burned Remains.
🗺️ **Horde Turn-in:** Take the Zeppelin to Tirisfal / Grom'gol and travel to Westfall (\`37.4, 50.6\`) to inspect the Alliance Burned Remains.
• **Objective:** Inspect the nailed plank at the opposing camp to decipher the mountain climber's coordinates.
• **Reward:** 2x 12-Slot Specialty Bags (*Sturdy Lunchbox* & *Old Toolbox*) + Simple Wood & Flint.

#### Step 3: "Scramble & Wet Job" (Stonetalon Mountains)
🗺️ **Coords:** Stonetalon Mountain Trail (\`50.9, 52.3\` -> Camp at \`40.7, 52.4\` -> Dirt Mound at \`39.6, 49.9\`).
• **Objective:** Head north of Sun Rock Retreat along the cliff ledge. Loot the *Pocket Litter* at the abandoned tent, then carefully jump the chasm onto the *Mound of Dirt*.
• **Reward:** Choice of Thrown/Ranged Weapon (*Silver Star* / *Moonsight Rifle* / *Precision Bow*) + **4x Student Fodder**!

#### Step 4: "Eagle's Fist" (Loch Modan)
🗺️ **Coords:** Stonewrought Dam, Loch Modan (\`49.4, 12.9\`).
• **Objective:** Walk along the crest of Stonewrought Dam. Look down toward the Wetlands chasm and drop down onto the massive dwarven architectural relief carvings to retrieve the *Carved Eagle Figurine*.
• **Reward:** Hickory Pipe + Rumsey Rum Light (+5 Stamina).

#### Step 5: "This Must Be The Place" (Thoradin's Wall)
🗺️ **Coords:** Thoradin's Wall, Hillsbrad/Arathi Border (\`87.4, 49.7\` Cart -> \`22.4, 24.2\` Wall Ramparts).
• **Objective:** Leap from the broken supply cart south of Durnholde Keep onto the wall battlements. Follow the upper parapet into the guard room and loot the *Hastily Rolled-Up Satchel*.
• **Final Reward:** **Cozy Sleeping Bag** + 8x Student Fodder + 4,200 XP!

---

### Camping Tradeskill Synergy
💡 When used inside a **Tier 2 Silk Tent** or **Tier 3 Ironwood Pavilion** pitched by a Camping tradeskill player, sleeping generates Rested XP at **200% acceleration rate**, converting 8 hours of offline rest in just 45 minutes!`
    },
    {
      id: "guide-hunter-pets",
      title: "Hunter Pets & 502 Beasts Master Index (Attack Speeds & Ranks)",
      category: "Classes & Pets",
      source: "ForeverChanges.pro · Warcraft Tavern · Wowhead",
      icon: "https://render.worldofwarcraft.com/us/icons/56/ability_hunter_beasttaming.jpg",
      summary: "Attack speed tiers, family damage modifiers, and rank-by-rank ability trainer beasts across 502 overhauled spawns at the Level 30 cap.",
      content: `### Pet Mechanics Overhaul in WoW Forever
Pet normalization and ability scaling in WoW Forever preserve the distinct advantages of famous rare beasts while balancing family modifiers across PvE and PvP.

### Top Hardest Hitting Families & Damage Modifiers

| Family | Damage Mod | Armor Mod | HP Mod | Primary Abilities | Top Specialization |
| Cat | **+10%** | Base | Base | Claw, Bite, Dash, Prowl | Burst DPS / PvP Pushback |
| Raptor | **+10%** | Base | -5% | Claw, Bite | Sustained Melee DPS |
| Wind Serpent | **+7%** | Base | Base | Lightning Breath (Ignores Armor) | Ranged Magic DPS / Anti-Plate |
| Bat | **+7%** | Base | Base | Bite, Screech (AOE AP Debuff) | Dungeon Tanking & Threat Peel |
| Bear | -9% | **+8%** | **+5%** | Claw, Bite, Swipe | Solo Leveling & Off-Tanking |
| Turtle | -10% | **+13%** | Base | Bite, Shell Shield (-50% Dmg Taken) | Raid Tanking Boss Mechanics |

---

### Key Attack Speed Tiers (Spell Pushback Kings)
Attack speed determines the frequency of spell-casting pushback on opposing casters in duels and Warsong Gulch:

• **1.00s Attack Speed:**
  - **Broken Tooth** (Badlands, Lvl 37): *Fastest attack speed in World of Warcraft!* Unlocks once Phase 3 opens.
• **1.20s Attack Speed:**
  - **The Rake** (Mulgore, Lvl 10 Rare Lion \`44.2, 15.6\`): Premier leveling and PvP cat.
  - **Starving Mountain Lion** (Hillsbrad Foothills, Lvl 23–24).
• **1.30s Attack Speed:**
  - **Dishu** (The Barrens, Lvl 13 Rare Cheetah \`49.8, 40.2\`).
  - **Swamp Jaguar** (Swamp of Sorrows, Lvl 35).
• **2.00s Normal / Heavy Hitter:**
  - Elder Crocolisks (Wetlands) and Elder Ashenvale Bears. Ideal for high single-hit Auto-Shot sync.

---

### Phase 2 Ability Training Locations (Level 30 Cap)

| Ability & Rank | Level Req | Beast & Location | Coordinates |
| Claw Rank 5 | Lvl 28 | Elder Ashenvale Bear (Ashenvale) | \`40.2, 65.4\` |
| Claw Rank 5 | Lvl 28 | Saltscale Crocolisk (Wetlands) | \`26.0, 48.0\` |
| Bite Rank 5 | Lvl 28 | Giant Moss Crawler (Wetlands) | \`54.2, 68.4\` |
| Bite Rank 5 | Lvl 28 | Dread Swoop (Arathi Highlands) | \`46.0, 42.0\` |
| Lightning Breath Rank 3 | Lvl 24 | Thunderhawk Cloudscraper (Barrens) | \`44.0, 62.0\` |
| Screech Rank 2 | Lvl 24 | Greater Salt Flats Scavenger (1K Needles) | \`68.0, 78.0\` |
| Shell Shield | Lvl 20 | Sparkleshell Snapper (1K Needles) | \`80.0, 76.0\` |

💡 **Pet Training Point Optimization:** At Level 30, your pet has **145 total training points** (5 TP per level from 2–30). Spend 50 on Great Stamina Rank 4, 50 on Natural Armor Rank 4, and 25 on Claw 5 / Bite 5 for max PvP survivability!`
    },
    {
      id: "guide-library-books",
      title: "40 Hidden Library Books & Relic Accessories",
      category: "Exploration & Secrets",
      source: "ForeverChanges.pro · Warcraft Tavern · Wowhead",
      icon: "https://render.worldofwarcraft.com/us/icons/56/inv_misc_book_12.jpg",
      summary: "All 40 interactive ancient tomes hidden across Stormwind, Ironforge, Undercity, and Dalaran with milestone relic rewards.",
      content: `### The Grand Library Questline & Milestone Achievements
Scattered throughout the royal archives, secret crypts, and mage sanctuaries of Azeroth are **40 interactive ancient manuscripts**. Finding these tomes unlocks cumulative achievement milestones granting blue accessories.

### Milestone Achievement Tiers & Rewards

| Milestone | Achievement Title | Guaranteed Reward | Item Stats |
| **10 Books** | *Novice Archivist* | **Scholar's Sash** (Waist) | 28 Armor, +5 Int, +4 Spi, +6 Spell Dmg |
| **20 Books** | *Keeper of the Tomes* | **Ancient Researcher's Band** (Ring) | +5 Stamina, +6 Intellect, +8 Spell Dmg |
| **30 Books** | *Grand Bibliographer* | **Tome-Studded Choker** (Necklace) | +8 Stamina, +6 Intellect, +10 Spell Dmg |
| **40 Books** | *Scholar of the First Realm* | **Lorekeeper's Binding** (Unique Ring) | **+7 All Stats** (+7 Str, Agi, Sta, Int, Spi) |

---

### Phase 2 Accessible Books by Region

#### Region 1: Stormwind Royal Archives (10 Books)
• **Book 1 — The Rise of the Defias:** Royal Library (\`75.2, 28.4\`) on the top mahogany shelf behind Master Mathias Shaw's emissary.
• **Book 2 — Foundations of the Kingdom:** Cathedral of Light crypts (\`40.1, 26.8\`) behind Bishop Farthing.
• **Book 3 — The First War Chronicles:** SI:7 Headquarters (\`77.6, 59.2\`) inside the locked desk drawer.
• **Book 4 — Arcane Principles of Medivh:** Mage Quarter Tower (\`45.4, 88.0\`) on the spiraling ascending ramp.

#### Region 2: Ironforge Hall of Explorers (10 Books)
• **Book 5 — Titan Foundations of Khaz Modan:** Hall of Explorers museum wing (\`72.4, 12.8\`) beneath the iron titan foot display.
• **Book 6 — The War of the Three Hammers:** High Seat (\`40.0, 52.2\`) right of King Magni's throne.
• **Book 7 — Ironband's Geological Compendium:** Tinkertown workshop (\`68.0, 50.4\`).

#### Region 3: Undercity Royal & Magic Quarters (10 Books)
• **Book 8 — Forbidden Kirin Tor Necromancy:** Apothecarium lower laboratory (\`48.2, 69.4\`) beside Chief Plaguebringer Middleton.
• **Book 9 — Fall of the Menethil Dynasty:** Royal Quarter throne platform (\`56.4, 91.8\`) behind Lady Sylvanas Windrunner.
• **Book 10 — Shadow Weaving in Lordaeron:** Magic Quarter shadow sanctum (\`84.2, 18.0\`).

#### Region 4: Dalaran Dome & Contested Frontiers (10 Books)
• **Book 11 — The Kirin Tor Schism:** Dalaran Underbelly sewer intake (\`52.1, 44.6\`).
• **Book 12 — Tablets of Archeus:** Whelgar's Excavation Site, Wetlands (\`34.8, 47.2\`) inside the archaeological tent.
• **Book 13 — Scythe of Elune Legend:** Twilight Grove, Duskwood (\`45.6, 45.0\`) beneath the corrupted world tree roots.

💡 **Pro-Tip:** Target macros like \`/target Ancient Tome\` or \`/target Moldering Manuscript\` do not highlight static world game-objects. Enable **Interact Key** in Interface Options -> Controls to loot books through walls!`
    },
    {
      id: "guide-duel-tournament",
      title: "$100,000 Level 30 Duel Tournament (Venruki & Durotar Ruleset)",
      category: "PvP & Tournaments",
      source: "ForeverChanges.pro · Method.gg · Wowhead",
      icon: "https://render.worldofwarcraft.com/us/icons/56/achievement_arena_2v2_7.jpg",
      summary: "Ruleset, arena boundaries, banned consumables, and class matchup meta for the $100,000 Level 30 Beta Tournament hosted by Venruki.",
      content: `### The $100,000 Closed Beta Showcase
Hosted live on Twitch by **Venruki** on October 17–18, 2026, the **Level 30 Duel Championship** pits 64 of the highest-ranked North American and European gladiators against one another on the NA Beta Megarealm.

### Tournament Format & Restrictions

| Parameter | Tournament Specification |
| Prize Pool | **$100,000 USD** ($50K 1st, $25K 2nd, $15K 3rd, $10K 4th) |
| Level Cap | Strictly Level 30 (21 Talent Points available) |
| Venue | Durotar Gates ring (Outside Orgrimmar) |
| Match Rules | Best of 3 Single Elimination; Finals Best of 5 |
| Consumables | **BANNED:** All open-world potions, engineering bombs, and world buffs! |
| Allowed Items | Class-conjured food/water, Healthstones, Soulstones, Mana Agates |
| Duel Arena | 40-yard radius flagged chalk boundary; crossing triggers 5s forfeit countdown |

---

### Class Meta Tier List & Matchup Breakdown

#### S-Tier (Favored Champions)
• **Feral Druid (11/10/0):**
  - Travel Form (40% movespeed) breaks all Frost Novas and Crippling Poisons on GCD.
  - *Frenzied Regeneration* + *Bear Form Armor* converts mana into unstoppable HP pools.
  - Auto-bleed kiting allows resetting via Prowl in max-range duels.
• **Arms Warrior (21/0/0):**
  - Access to *Deep Wounds*, *Impale*, and new Classic+ ability *Spearing Strike*.
  - Armed with *Corpsemaker* (RFK) or *Heavehammer* (Excavation Site 4), 2-shot burst potential on squishy cloth.
• **Retribution Paladin (0/11/10):**
  - *Blessing of Freedom* negates slows; *Voice of Truth* gives temporary spell-school silence immunity.
  - *Hammer of Justice* (5s stun) into *Seal of Command* burst deals over 600 damage.

#### A-Tier (High Skill Cap)
• **Frost Mage (0/21/0):**
  - Improved Blizzard, Shatter combo, Cold Snap double Ice Block. Difficult against Feral shape-shifting.
• **Subtlety Rogue (0/10/11):**
  - Cheap Shot -> Kidney Shot -> Gouge stunlock locks opponents out for 14 continuous seconds.
• **Affliction Warlock (18/3/0):**
  - Drain Life + Siphon Life + Fear spam. S-Tier against casters, vulnerable to Warrior intercept burst.

#### B-Tier (Bracket Underdogs)
• Shadow Priests (No Shadowform until level 40; reliant on Mind Blast + SW:P).
• Beast Mastery Hunters (High burst with Bite 5 / Claw 5 pet, but dead-zone kiting is punishable in a 40yd duel circle).`
    },
    {
      id: "guide-merchants-favor",
      title: "Azeroth Commerce Authority & Durotar Supply Logistics",
      category: "Economy & Professions",
      source: "ForeverChanges.pro · Warcraft Tavern · Wowhead",
      icon: "https://render.worldofwarcraft.com/us/icons/56/inv_misc_coin_02.jpg",
      summary: "Supply Crate logistics, faction camp coordinates, and exact Merchant's Favor costs for bags, weapons, mounts, and recipes.",
      content: `### The Deterministic Economy of WoW Forever
**Merchant's Favor** is the unified reputation and currency engine designed to reward crafters, gatherers, and dungeon runners without RNG lockouts.

### Supply Base Outposts & Locations

🗺️ **Alliance Camp:** *Azeroth Commerce Authority*
• **Location:** Three Corners, Redridge Mountains (\`10.5, 72.7\`) at the triple junction of Elwynn, Duskwood, and Lakeshire.
• **Quartermaster:** *Marcy Baker* (\`9.5, 71.1\`). Note: Contested territory, watch for Horde stealthers!

🗺️ **Horde Camp:** *Durotar Supply and Logistics*
• **Location:** West of Crossroads, The Barrens (\`49.7, 29.4\`) on the road toward Stonetalon.
• **Quartermaster:** *Dokimi* (\`50.0, 29.2\`). Protected Horde territory.

---

### Ways to Earn Merchant's Favor

• **Filled Supply Crates:** Dropped by level 10–30 humanoids and chests. Fill with matching trade goods (e.g. 20x Copper Bar, 10x Medium Leather, 8x Minor Healing Potion) for **250–500 Favor + 1.5–3 Gold** per turn-in!
• **Daily Dungeon Quests:** Completing Excavation Site 4, City of Dalaran, and Blackfathom Deeps daily bounties awards **4 Merchant's Favor** each.
• **World Rare Kills:** Slaying any of the 34 datamined world rares grants **1 Merchant's Favor** (capped at 5 daily).

---

### Quartermaster Inventory & Costs

| Item Name | Item Type / Slot | Cost (Favor) | Stats & Notable Utility |
| **Pack Kodo Mount** | Faction Ground Mount (60% Speed) | 6,000 Favor | Usable at Level 30! Includes mobile repair vendor |
| **Minimule Pet** | Vanity Pet Companion | 1,500 Favor | Cute pack-mule companion that carries small mail |
| **Kirin Tor Satchel** | 14-Slot Bag | 800 Favor | **Binds to Account** (Send to alts freely!) |
| **Totem of the Storm** | Shaman Relic | 1,200 Favor | Increases Lightning Bolt spell power by +14 |
| **Wand of Mana Concentration** | Wand (iLvl 34) | 1,200 Favor | 32–59 Arcane Dmg, Speed 1.50 (30.3 DPS) |
| **Blightleaf Cinch** | Leather Belt (iLvl 32) | 950 Favor | 62 Armor, +7 Agi, +6 Sta, +5 Strength |
| **Signpost of Guidance** | Camping Toy | 400 Favor | Deploys directional trail marker for party members |`
    },
    {
      id: "guide-transmog",
      title: "Classic+ Transmogrification & Wardrobe System",
      category: "Exploration & Secrets",
      source: "ForeverChanges.pro · Wowhead · Method.gg",
      icon: "https://render.worldofwarcraft.com/us/icons/56/inv_chest_cloth_17.jpg",
      summary: "Rules, armor-type boundaries, silhouette fidelity, and the competitive Classic Authenticity toggle in WoW Forever.",
      content: `### Silhouette-Honoring Transmogrification
WoW Forever introduces a non-intrusive Wardrobe System that preserves the visual gravitas and silhouette recognition of Classic World of Warcraft while letting players customize their appearance.

### The 4 Core Rules of Appearance Customization

#### 1. Strict Armor Type Locks
• **Cloth** can only transmog into Cloth appearances.
• **Leather** can only transmog into Leather appearances.
• **Mail** can only transmog into Mail appearances.
• **Plate** can only transmog into Plate appearances.
🔒 You cannot disguise a heavily armored Paladin or Warrior as a robe-wearing Priest!

#### 2. Weapon Silhouette & Swing Cadence Rules
• **One-Handed Weapons:** 1H Swords, 1H Maces, and 1H Axes can freely cross-transmog with each other, provided your character's class has weapon proficiency.
• **Daggers and Fists:** Daggers can only transmog to Daggers; Fist weapons can only transmog to Fist weapons (to protect 1.3s/1.4s animation cadences).
• **Two-Handed Weapons:** 2H Swords, 2H Maces, and 2H Axes can cross-transmog. Polearms and Staves cross-transmog together.

#### 3. Automatic Account-Wide Collection
• Looting any Bind-on-Pickup or equipping any Bind-on-Equip green, blue, or epic item instantly permanently registers its appearance to your **Account Wardrobe**.
• Selling or disenchanting the base item afterwards does **not** revoke the collected visual!

---

### Competitive "Classic Authenticity Mode"
⚔️ For competitive integrity in Warsong Gulch, Arathi Basin, and sanctioned duels:
• Under **Interface Options -> Display -> Wardrobe**, players can toggle **Classic Authenticity Mode**.
• When toggled ON, all enemy and friendly characters will render strictly in their true, equipped physical armor models, completely disabling visual transmogs on your local screen!`
    },
    {
      id: "guide-pvp-ranks",
      title: "PvP Honor Ranks 1–14 & Level 30 Warsong Gulch Bracket",
      category: "PvP & Tournaments",
      source: "ForeverChanges.pro · Warcraft Tavern · Wowhead",
      icon: "https://render.worldofwarcraft.com/us/icons/56/pvpcurrency-conquest-alliance.jpg",
      summary: "Level 30 bracket honor calculations, Rank 1-4 rewards, insignia trinkets, and flag running routes in Warsong Gulch.",
      content: `### Phase 2 PvP Honor Structure
In Closed Beta Phase 2, character level is capped at 30. The classic honor system has been adjusted so progression aligns with active bracket milestones.

### Phase 2 Rank Progression Cap (Rank 1 to 4)

| Rank | Alliance Title | Horde Title | CP Required | Unlocked Reward |
| **Rank 1** | Private | Scout | 15 HKs | **Private's / Scout's Tabard** |
| **Rank 2** | Corporal | Grunt | 2,000 CP | **Class PvP Insignia** (Dispel CC on 5m CD) |
| **Rank 3** | Sergeant | Sergeant | 5,000 CP | **10% Faction Vendor Discount** |
| **Rank 4** | Master Sergeant | Senior Sergeant | 10,000 CP | **Superior PvP Cloak** (+7 Sta, +5 primary stat) |

🔒 *Ranks 5 through 14 (First Sergeant to Grand Marshal / High Warlord) remain capped until Phase 3 and launch level caps unlock.*

---

### Warsong Gulch (20–29 / 30) Bracket Meta

#### Flag Running (The Feral King)
• **Travel Form (Level 30):** The definitive flag running tool. 40% outdoor movement speed without consuming mount cast times.
• **Shapeshift Cleansing:** Shifting from Cat -> Travel or Bear -> Travel removes all movement impairing effects (Frostbolt slows, Crippling Poison, Hamstring).
• **Defensive Stash:** While holding 10 stacks in the friendly base, shifting into Bear Form with *Frenzied Regeneration* provides up to 1,800 effective HP against enemy rogue burst.

#### Midfield Choke Control
• **Mages:** Improved Blizzard placed on the graveyard ramp completely shuts down Horde tunnel assaults.
• **Priests:** Dispel Magic removes enemy Priests' Power Word: Shield and Paladins' Blessing of Freedom instantly.
• **Warriors:** Piercing Howl (Fury tree) slows entire enemy offense squads within 10 yards regardless of facing.`
    },
    {
      id: "guide-rares-30",
      title: "34 Datamined World Rares & Guaranteed Drops (Level 10–30)",
      category: "Exploration & Secrets",
      source: "ForeverChanges.pro · Warcraft Tavern · Wowhead",
      icon: "https://render.worldofwarcraft.com/us/icons/56/inv_misc_head_dragon_bronze.jpg",
      summary: "Spawn timers, coordinates, and exclusive item drops for all 34 overhauled rare mobs across Westfall, Barrens, Ashenvale, and Wetlands.",
      content: `### Overhauled World Rare Mechanics
In WoW Forever, open-world rare spawns are no longer trivial recolors with 8-hour dead periods. They now feature **dynamic 45–90 minute respawn timers**, guaranteed rare quality loot tables, and grant **1 Merchant's Favor** upon defeat!

### Top 10 High-Value World Rares (Phase 2)

| Rare Mob | Zone | Coords | Level | Top Item Drop | Item Stats |
| **Lord Condar** | Loch Modan | \`75.2, 38.6\` | Lvl 26 | *Condar's Feathery Mantle* | Leather Shoulders: +8 Agi, +6 Sta |
| **Gesharahan** | The Barrens | \`47.8, 40.2\` | Lvl 24 | *Petrified Bark Shield* | Shield: Block 18, +5 Sta, +4 Str |
| **Ursol'lok** | Ashenvale | \`84.2, 49.0\` | Lvl 31 | *Claws of the Ursine* | 1H Fist: 18.2 DPS, +9 Str, +7 Sta |
| **Garneg Charskull** | Wetlands | \`53.4, 72.8\` | Lvl 28 | *Ironband's Warmace* | 2H Mace: 22.4 DPS, +12 Str, +5 Sta |
| **Slark** | Redridge Mts | \`41.2, 58.6\` | Lvl 25 | *Slark's Venomous Stinger* | Dagger: Speed 1.40, +6 Agi, Chance on Hit Poison |
| **Lupos** | Duskwood | \`24.0, 26.0\` | Lvl 23 | *Shadowfang Collar* | Cloth Helm: +6 Int, +5 Sta, +8 Shadow Dmg |
| **Bruex Firecaller** | Stonetalon | \`60.2, 62.4\` | Lvl 27 | *Cinderweave Robes* | Cloth Chest: +8 Int, +6 Sta, +12 Fire Dmg |
| **Mazzranache** | Mulgore | \`34.0, 42.0\` | Lvl 9 | *Mazzranache's Beak* | 1H Dagger: +2 Agi, +1 Sta |
| **Foreman Thistleneedle**| Westfall | \`42.2, 71.8\` | Lvl 18 | *Thistlewood Crossbow*| Ranged: 12.1 DPS, +3 Agi, +2 Sta |
| **Humar the Pridelord** | The Barrens | \`61.6, 32.4\` | Lvl 23 | *Pridelord's Pauldrons*| Mail Shoulders: +7 Str, +6 Sta |

💡 **Macro Hunting Tip:** Create a macro with \`/cleartarget [dead]\` followed by \`/target Lord Condar\` / \`/target Gesharahan\` / \`/target Ursol'lok\` to acquire targets instantly upon spawn!`
    },
    {
      id: "guide-druid-forms",
      title: "Druid Forms Masterclass (Aquatic, Cat, Travel & Secret Viper Form)",
      category: "Classes & Pets",
      source: "ForeverChanges.pro · Warcraft Tavern · Wowhead",
      icon: "https://render.worldofwarcraft.com/us/icons/56/ability_druid_travelform.jpg",
      summary: "Complete quest walk-through for Aquatic Form (lvl 16), Cat Form (lvl 20), Travel Form (lvl 30), and the hidden Sunken Temple Viper Form.",
      content: `### Druid Shape-Shifting Progression in WoW Forever
Druids possess unparalleled flexibility across Phase 2, with early access to full land and aquatic mobility tools.

### Form Breakdown & Quest Roadmaps

#### 1. Bear Form (Level 10)
• **Quest:** *Heeding the Call* -> *Moonglade Teleport* -> *Trial of the Bear*.
• **Mechanic:** +180% Armor from items, +20 Stamina equivalent, generates Rage on auto-attacks.

#### 2. Aquatic Form (Level 16)
• **Quest:** *Trial of the Sea Lion* (Dual-Continent Journey).
• **Alliance Route:** Retrieve Half of the Pendant off Westfall coast (\`17.6, 33.2\`) and Darkshore coast (\`49.0, 11.2\`).
• **Horde Route:** Retrieve Half of the Pendant off Silverpine Forest coast (\`29.4, 29.8\`) and The Barrens (\`57.2, 8.8\`).
• **Utility:** +50% Swimming Speed and permanent underwater respiration.

#### 3. Cat Form (Level 20)
• **Unlock:** Granted directly at your class trainer at Level 20.
• **Mechanics:** Energy bar (100 Energy), Claw, Rip bleed, Prowl stealth, and Tiger's Fury.

#### 4. Travel Form (Level 30)
• **Unlock:** Available at class trainers upon reaching Level 30 for 1 Gold 40 Silver.
• **Utility:** **+40% Outdoor Movement Speed**. Replaces early mounts, costs negligible mana to cast, and immediately breaks roots and movement impairs!

---

### The Secret Serpent Form (Viper Relic)
🗺️ **Hidden Relic:** *Fang of the Venomspitter*
• Inside the newly tuned Sunken Grotto cavern near Wailing Caverns (\`44.2, 36.8\`), defeat the rare elite serpent *Xaliss the Slitherer*.
• Slaying Xaliss yields the ancient Druidic relic *Viper Totem*.
• Activating this relic cosmetic turns your Cat Form into a **Verdant Viper** with custom venom-spitting idle animations!`
    },
    {
      id: "guide-downranking",
      title: "Downranking Mechanics & Spell Rank Efficiency Guide",
      category: "Classes & Pets",
      source: "ForeverChanges.pro · Warcraft Tavern · Wowhead",
      icon: "https://render.worldofwarcraft.com/us/icons/56/spell_holy_flashheal.jpg",
      summary: "The mathematical Level 20 penalty formula, coefficient rules, and rank-by-rank healing efficiency charts for all 5 healing specs.",
      content: `### How Spell Downranking Works in WoW Forever
Downranking is the art of casting lower ranks of healing and damage spells to maximize Healing per Mana (HPM) and avoid overhealing, while leveraging high bonus Spell Power gear.

### The Downranking Mathematical Penalty Formula
Spells learned below character **Level 20** receive a scaling coefficient penalty to prevent level 1 spell abuse:

\`Penalty Multiplier = (Level Learned + 11) / 20\`  *(if Level Learned < 20)*

💡 **Rule of Thumb:** Any spell learned at Level 20 or higher gets **100% of your Spell Power coefficient** with zero penalty!

---

### Priest Healing Rank Efficiency (Level 30 Cap)

| Spell & Rank | Mana Cost | Base Heal | Cast Time | Heal per Mana (HPM) | Ideal Scenario |
| **Flash Heal Rank 1** | 125 Mana | 193–237 | 1.5s | 1.72 HPM | Fast emergency save |
| **Flash Heal Rank 2** | 155 Mana | 258–314 | 1.5s | 1.84 HPM | Sustained dungeon single-target |
| **Flash Heal Rank 3** | 185 Mana | 327–393 | 1.5s | 1.94 HPM | Max Phase 2 burst triage |
| **Heal Rank 1** | 155 Mana | 295–341 | 3.0s | **2.05 HPM** | Mana-efficient slow maintenance |
| **Heal Rank 2** | 205 Mana | 429–491 | 3.0s | **2.24 HPM** | Highest HPM tank healing |

---

### Paladin, Shaman & Druid Downranking Rules
• **Paladins:** *Flash of Light Rank 1* (35 Mana) has a high base efficiency and crits trigger *Illumination* (refunding 100% mana cost), making Paladins near-infinite mana batteries.
• **Shamans:** *Healing Wave Rank 3* (145 Mana) is the sweet spot for mana preservation. *Chain Heal Rank 1* (260 Mana) hits 3 targets for raid clump maintenance.
• **Druids:** *Healing Touch Rank 4* (185 Mana, 3.0s) provides the highest HPM before Artisan talents unlock in Phase 3.`
    },
    {
      id: "guide-fast-leveling",
      title: "1–30 Classic+ Speedrun & XP Routing Walkthrough",
      category: "Leveling & Quests",
      source: "ForeverChanges.pro · Warcraft Tavern · Wowhead",
      icon: "https://render.worldofwarcraft.com/us/icons/56/spell_holy_borrowedtime.jpg",
      summary: "Optimized route from 1 to 30 integrating Cozy Sleeping Bag checkpoints, rested camping stations, and high-density dungeon quest hubs.",
      content: `### Fast Leveling Architecture: 1 to 30 in Under 16 Hours
By combining the **+3% Cozy Sleeping Bag buff**, rested tents, and dense Classic+ quest clusters, players can reach the Phase 2 cap of 30 faster than ever before.

### Alliance Optimized Speedrun Path

#### Levels 1–10: Starter Valleys
• Complete Elwynn Forest / Dun Morogh starter hubs. Reach level 10 by clearing Hogger or Gol'Balar Quarry.
• Train class abilities and first profession gathering skills (Mining/Herbalism/Skinning).

#### Levels 10–15: Westfall & Sleeping Bag Start
• Quest Westfall: Saldean's Farm, Sentinel Hill, and Furlbrow's Deed.
• 🎯 **Level 14 Checkpoint:** Complete Step 1 of the Cozy Sleeping Bag at Alexston Farmstead (\`37.4, 50.6\`).
• Clear The Deadmines dungeon quests (6,500 XP total turn-in).

#### Levels 15–22: Loch Modan & Redridge Mountains
• Loch Modan: Trogg hunt, Valley of Kings, and Dam quests.
• Redridge: Lakeshire bridge quests, Gnoll bounties, and Yowler.
• 🎯 Pick up Step 4 of the Sleeping Bag on Stonewrought Dam crest.

#### Levels 22–30: Wetlands, Excavation Site 4 & Duskwood
• Head to Wetlands: Complete Greenwarden quests, Digsite excavations.
• ⚔️ Run **Excavation Site 4** dungeon for the massive *Prehistoric Prism* quest turn-ins.
• Finish in Duskwood (Nightbane, Hermit of Duskwood, Morgan Ladimore) to hit Level 30!

---

### Horde Optimized Speedrun Path

#### Levels 1–10: Durotar / Mulgore / Tirisfal
• Clear Valley of Trials / Camp Narache. Reach Level 10 and train first talent points.

#### Levels 10–16: Northern Barrens & Sleeping Bag Start
• Crossroads quests: Plainstriders, Raptors, and Oasis fungus.
• 🎯 **Level 14 Checkpoint:** Complete Step 1 of the Sleeping Bag at Field of Giants (\`46.4, 73.9\`).
• Wailing Caverns: Complete all 6 dungeon quests for blue weapons (*Wingblade* or *Crescent Staff*).

#### Levels 16–24: Stonetalon Mountains & Southern Barrens
• Stonetalon: Sun Rock Retreat, Webwinder Path (Grab Sleeping Bag Step 3!).
• Camp Taurajo: Quillboar bristles, Silithid pods, and Bael Modan dig site.

#### Levels 24–30: Ashenvale, Hillsbrad & Thousand Needles
• Ashenvale: Splintertree Post and Warsong Lumber Camp quests.
• Hillsbrad: Tarren Mill missions and Thoradin's Wall (Complete Sleeping Bag Step 5!).
• Thousand Needles: Shimmering Flats racing quests to reach Level 30!`
    },
    {
      id: "guide-excavation-site",
      title: "New Dungeon: Excavation Site 4 Full Walkthrough",
      category: "Dungeons & Raids",
      source: "ForeverChanges.pro · Warcraft Tavern · Wowhead",
      icon: "https://render.worldofwarcraft.com/us/icons/56/inv_misc_gem_opal_01.jpg",
      summary: "Boss strategies, trash skips, entrance coords, and Titan Relic quest chain for the Level 26–31 Wetlands dungeon.",
      content: `### Overview: Excavation Site 4 (Wetlands)
Excavation Site 4 is a brand-new Classic+ dungeon set within the archaeological cliff caves overlooking Whelgar's Excavation in central Wetlands.

| Parameter | Dungeon Profile |
| Level Range | 26–31 (Optimal party level: 28–29) |
| Entrance Coords | Wetlands (\`34.8, 47.2\`) inside the upper cliff tunnel |
| Boss Count | 4 Encounters (Saltspine, Shadetooth, Webspinner, Relic Guardian) |
| Expected XP | 24,000–28,000 Total Quest + Mob XP |
| Currency Drops | 4x Merchant's Favor from daily completion |

---

### Boss Encounters & Tactics

#### 1. Saltspine (Level 28 Elite Crocolisk)
• **Location:** Roaming the starting underground marsh.
• **Strategy:** Clear all surrounding swamp hatchlings before pulling. Saltspine has massive physical auto-attacks; tank keep defensive cooldowns rolling.
• **Notable Loot:** *Supple Bellyskin Leggings* (+6 Agi, +5 Sta Leather) and *Saltscale Girdle* (+5 Str, +4 Sta Mail).

#### 2. Shadetooth (Level 29 Elite Raptor Matriarch)
• **Mechanic:** Slaying the raptor matriarch spawns an immediate wave of *Raptors in the Grass*.
• **Strategy:** Group must stack for AOE Cleave and Frost Nova to kill the hatchlings before Shadetooth's mate enrages.
• **Notable Loot:** *Shadetooth Fang* (Dagger 16.5 DPS, +4 Agi) and *Raptor-Rib Vest* (+7 Sta, +6 Str).

#### 3. Webspinner Toxinmaker (Level 29 Elite Giant Spider)
• **Mechanic:** Casts *Neurotoxic Spit* dealing heavy nature damage over 8 seconds.
• **Strategy:** Shaman Poison Cleansing Totem or Druid Cure Poison completely trivializes this fight.

#### 4. Relic Guardian (Level 30 Titan Mech End-Boss)
• **Mechanic:** Dormant Titan console at the end of the hall. Interacting initiates the battle.
• ⚠️ **Threat Protocol Reset:** Every 20 seconds, the boss drops all threat and targets the highest DPS player! Damage dealers hold burst for 3 seconds while tank taunts immediately.
• **Notable Loot:**
  - *Reliquary Mantle* (Mail Shoulder: +7 Str, +6 Sta)
  - *Ring of Power Regulation* (Ring: +5 Int, +5 Sta, +7 Spell Power)
  - *Golemsight Long Gun* (Ranged: 14.8 DPS, +4 Agi, +3 Sta)
  - **Titan Relic:** 100% Drop quest starter item!`
    },
    {
      id: "guide-city-of-dalaran",
      title: "New Dungeon: City of Dalaran (Underbelly & Violet Enclave)",
      category: "Dungeons & Raids",
      source: "ForeverChanges.pro · Warcraft Tavern · Wowhead",
      icon: "https://render.worldofwarcraft.com/us/icons/56/spell_arcane_portaldalaran.jpg",
      summary: "Infiltrate the Dalaran arcane bubble in Alterac Mountains: 4 bosses, spell reflect tactics, and Kirin Tor pre-BiS weapons.",
      content: `### Overview: The Secret City of Dalaran Dungeon
Nestled inside the mysterious violet magical dome in Alterac Mountains (\`20.4, 82.0\`), **City of Dalaran** is a premier Level 28–32 dungeon exploring the arcane catacombs and underbelly of the Kirin Tor.

### Dungeon Overview & Mechanics

| Parameter | Specifications |
| Level Range | 28–32 (Party recommended level: 30) |
| Entrance | Alterac Mountains (\`20.4, 82.0\`) through the sewer aqueduct gate |
| Encounters | 4 Bosses (Overseer Kaelen, Archmage Echo, Sludge-Gargoyle, Anomaly) |
| Special Feature | Arcane Leyline Crystals that boost caster spell power inside by +20 |

---

### Boss Tactics & Encounters

#### Boss 1: Overseer Kaelen (Level 30 Elite Human Mage)
• **Mechanic:** Casts *Arcane Barrier* reflecting 50% of direct spells back at casters.
• **Tactic:** Melee interrupts are essential. Kick or Shield Bash *Arcane Volley* immediately.
• **Drops:** *Overseer's Spell-Thread Gloves* (+6 Int, +5 Sta, +9 Spell Power).

#### Boss 2: Archmage Vargoth's Echo (Level 31 Arcane Projection)
• **Mechanic:** Mirrors of the Archmage summon 3 illusions that cast Polymorph.
• **Tactic:** Assign off-DPS to burst down the illusions immediately to prevent healer sheep lockouts.
• **Drops:** *Echoing Staff of Dalaran* (2H Staff: 22.8 DPS, +9 Int, +6 Sta, +12 Spell Power).

#### Boss 3: Sludge-Gargoyle (Level 31 Corrupted Underbelly Golem)
• **Mechanic:** Sludge Puddle spawns beneath the tank's feet reducing armor by 30%.
• **Tactic:** Kite the gargoyle in a clockwise circle around the sewer cistern.

#### Boss 4: Kirin Tor Anomaly (Level 32 End-Boss)
• **Mechanic:** *Mana Singularity* pulls all players into the center and detonates after 4 seconds.
• ⚠️ **Warning:** Entire group must run outward to the walls as soon as the pull mechanic triggers!
• **Notable Loot:**
  - *Robes of the Violet Citadel* (Cloth: +11 Int, +8 Sta, +14 Spell Power)
  - *Kirin Tor Battle-Blade* (1H Sword: 19.4 DPS, +6 Str, +5 Agi)
  - *Amulet of Arcane Convergence* (Neck: +6 Int, +5 Sta, +8 Spell Power)`
    },
    {
      id: "guide-camping-master",
      title: "Camping Tradeskill (1–150): Portable Tents & Stations",
      category: "Economy & Professions",
      source: "ForeverChanges.pro · Warcraft Tavern · Wowhead",
      icon: "https://render.worldofwarcraft.com/us/icons/56/inv_misc_stonetablet_05.jpg",
      summary: "Campfire cooking, lean-to shelters, silk tents, and field stations (tanning racks, spinning wheels, portable anvils, and cauldrons).",
      content: `### The Survivalist Tradeskill of WoW Forever
**Camping** is the definitive 4th secondary profession in WoW Forever (alongside First Aid, Cooking, and Fishing). It allows players to pitch shelters, establish rest zones, and deploy portable profession crafting stations anywhere in the wilderness!

### Shelter Tiers & Rested XP Acceleration

| Shelter Tier | Camping Skill | Required Materials | Resting Speed Bonus | Special Buff |
| **Lean-to Shelter** | 1–50 | 4x Simple Wood, 2x Rough String | **+50% Rested XP** | Windbreak (+2 Stamina for 30m) |
| **Linen Wall Tent** | 50–100 | 8x Linen Cloth, 4x Simple Wood | **+100% Rested XP** | Warmth (+4 Stamina & Spirit) |
| **Silk Trail Pavilion**| 100–150 | 12x Silk Cloth, 4x Iron Bar | **+200% Rested XP** | Full Rested Aura (+3% All Stats) |

---

### Portable Field Crafting Stations (1–150)
Camping enables crafters to process materials in the open field without returning to capital cities:

• **Field Tanning Rack (Camping 40):** Deploys a curing station for Leatherworkers to convert Ruined Leather Scraps into Light Leather and Medium Leather on-site.
• **Field Spinning Wheel (Camping 65):** Enables Tailors to spin wool, silk, and spider webs into bolts without capital looms.
• **Portable Blacksmithing Anvil (Camping 90):** Deploys a fold-out bronze anvil allowing Blacksmiths and Engineers to forge gear next to mining veins!
• **Field Alchemy Cauldron (Camping 120):** Grants party members the ability to boil herbs into community elixir cauldrons that refresh 5 potion charges for the raid.`
    },
    {
      id: "guide-battle-mage",
      title: "Battle Mage: Arcane Melee & Spellblade Class Spec",
      category: "Classes & Pets",
      source: "ForeverChanges.pro · Method.gg · Wowhead",
      icon: "https://render.worldofwarcraft.com/us/icons/56/spell_holy_magicalsentry.jpg",
      summary: "Master the new melee Spellblade spec: Mail armor proficiency, Mana Blade weapon scaling, Spellstrike, and Arcane Ward defense.",
      content: `### The Spellblade Revolution in WoW Forever
The **Battle Mage** is an official Classic+ specialization that transforms the traditionally fragile cloth caster into a front-line armored combatant who infuses steel weapons with raw arcane devastation.

### Core Mechanics & New Abilities

• **Spellstrike:** Instant melee weapon attack that deals 100% physical weapon damage plus an additional 60–90 Arcane Damage, consuming 8% base mana. Generates an Arcane Charge.
• **Mana Blade:** Enhances your main-hand weapon for 10 minutes, converting 20% of your total Spell Power into bonus melee Attack Power and restoring 2% mana on melee hits.
• **Arcane Ward:** Surrounds the Battle Mage in a defensive barrier that increases Parry chance by 15% and reflects 15 Arcane damage back at attackers.
• **Mail Armor Attunement:** At Level 30, Battle Mages can equip Mail armor pieces with Intellect and Spell Damage.

---

### Phase 2 Talent Build (21 Talent Points)
• **Tier 1 (5/5 Arcane Subtlety):** Reduces threat generated by Arcane spells by 40% and reduces target's arcane resistances.
• **Tier 2 (5/5 Arcane Concentration):** Grants a 10% chance to enter a Clearcasting state after any damage attack.
• **Tier 3 (1/1 Spellstrike):** Unlocks the core melee strike.
• **Tier 4 (5/5 Blade Infusion):** Increases your melee critical strike chance by 5% and adds 10% spell damage to critical strikes.
• **Tier 5 (5/5 Arcane Impact):** Increases critical strike chance of Arcane Explosion and Spellstrike by 6%.

💡 **BiS Weapons:** Look for high base top-end damage swords like *Kirin Tor Battle-Blade* (City of Dalaran) or *Royal Apparition Dagger* (BFD) to maximize Spellstrike scaling!`
    },
    {
      id: "guide-scarlet-banner",
      title: "Scarlet Banner Faction & Monastery Recon (Level 25–30)",
      category: "Leveling & Quests",
      source: "ForeverChanges.pro · Warcraft Tavern · Wowhead",
      icon: "https://render.worldofwarcraft.com/us/icons/56/inv_banner_01.jpg",
      summary: "Level 25-30 questline around the Scarlet Monastery perimeter, hunting courier escorts in Hillsbrad, and reputation vendor rewards.",
      content: `### Infiltrating the Scarlet Crusade Perimeter
In WoW Forever, the **Scarlet Banner** introduces an immersive espionage and bounty campaign set across Hillsbrad Foothills, Silverpine Forest, and the Tirisfal Glades monastery approaches.

### Quest Campaign Walkthrough (Level 25–30)

#### 1. "Intercepting the Courier"
🗺️ **Hillsbrad Trail (\`48.6, 32.4\`):** Ambush the *Scarlet Courier* and his two heavy elite squires patrolling the road between Southshore and Tarren Mill.
• **Loot:** *Coded Crusade Dispatch* deciphering troop movements toward Alterac.
• **Reward:** 3,800 XP + 500 Scarlet Banner Reputation.

#### 2. "Reconnaissance in the North"
• Infiltrate the courtyard outside the Scarlet Monastery entrances in Tirisfal Glades.
• Plant scouting markers at the Graveyard archway and Library entrance without pulling the elite sentries.

#### 3. "The Grand Inquisitor's Decrees"
• Slay 15 Scarlet Chaplains and 10 Scarlet Guardsmen in the Western Plaguelands border camp.

---

### Scarlet Banner Reputation Tiers & Rewards

| Reputation Tier | Vendor Unlocks | Cost | Item Stats & Benefit |
| **Friendly** | *Holy Water of the Crusade* | 15 Silver | Cleanses diseases and deals 400 Holy Dmg to undead |
| **Honored** | *Tabard of the Pure Flame* | 2 Gold | Striking red and white cross embroidered tabard |
| **Honored** | *Scarlet Scout's Pauldrons* | 4 Gold 50 Silver | Mail Shoulders: 145 Armor, +8 Str, +6 Sta |
| **Revered** | *Inquisitor's Signet* | 8 Gold | Finger: +7 Int, +5 Sta, +8 Holy Spell Damage |`
    },
    {
      id: "guide-booty-bay-engineering",
      title: "Goblin Engineering & Booty Bay Buckshot Innovations",
      category: "Economy & Professions",
      source: "ForeverChanges.pro · Warcraft Tavern · Wowhead",
      icon: "https://render.worldofwarcraft.com/us/icons/56/inv_misc_bomb_04.jpg",
      summary: "New Phase 2 schematics: High-Yield Dynamite, Flash Grenades, Gyromatic Micro-Adjuster XL, and Goblin Jumper Cables XL.",
      content: `### The Goblin Mechanical Renaissance
Goblin Engineering trainers in **Ratchet** and **Booty Bay** have unlocked brand-new Classic+ schematics tailored for the Level 30 cap and open-world skirmishes.

### Premier Phase 2 Engineering Schematics

#### 1. High-Yield Dynamite (Skill 135)
• **Materials:** 2x Heavy Blasting Powder, 1x Silk Cloth.
• **Effect:** Deals **160 to 220 Fire Damage** and stuns all targets in a 5-yard radius for 2 seconds (1 min CD). Outstanding for flag defense in Warsong Gulch!

#### 2. Flash Grenade (Skill 140)
• **Materials:** 1x Bronze Tube, 1x Coarse Blasting Powder, 1x Flash Powder.
• **Effect:** Blinds the target for 4 seconds from up to 20 yards away. Does not share diminishing returns with Rogue Blind!

#### 3. Goblin Jumper Cables XL (Skill 150)
• **Materials:** 2x Iron Bar, 2x Fused Wiring, 1x Shadowgem.
• **Effect:** Has a **50% chance** to shock a dead ally back to life with 500 health and mana (30 min CD). Essential for wipe recovery in Excavation Site 4!

#### 4. Booty Bay Buckshot (Skill 125)
• **Materials:** 1x Solid Stone, 1x Heavy Blasting Powder.
• **Effect:** Shotgun ammunition adding **+11.5 DPS** to ranged shot weapons, usable at Level 25!`
    },
    {
      id: "guide-phase2-economy",
      title: "Phase 2 Trade Economy & Artisan Stockpiling Strategy",
      category: "Economy & Professions",
      source: "ForeverChanges.pro · Warcraft Tavern · Wowhead",
      icon: "https://render.worldofwarcraft.com/us/icons/56/inv_misc_coin_01.jpg",
      summary: "Most valuable trade goods at level 30 cap, high-yield farming loops, and what to stockpile before Phase 3 Artisan 300 unlocks.",
      content: `### Mastering the Closed Beta Economy
Because Closed Beta Phase 2 caps player level at 30 and professions at 225, specific trade goods experience massive supply pinches while high-level materials can be stockpiled cheaply for Phase 3!

### High-Value Phase 2 Commodities

| Material | Primary Source | Current AH Demand | Farming Hotspot |
| **Heavy Leather** | Skinning (Lvl 25–35 beasts) | **VERY HIGH** | Wetlands Crocolisks & Hillsbrad Mountain Lions |
| **Iron Ore / Bars** | Mining (Skill 125–175) | **EXTREME** | Arathi Highlands perimeter & Thousand Needles canyons |
| **Heavy Stone** | Mined with Iron | **HIGH** | Essential for Heavy Sharpening Stones and Dynamite |
| **Silk Cloth** | Humanoids (Lvl 28–35) | **HIGH** | Syndicate camps in Hillsbrad & Kurzen compound |
| **Goldthorn** | Herbalism (Skill 170) | **EXTREME** | Foothills ridges, key component for Free Action Potions |
| **Wild Steelbloom** | Herbalism (Skill 115) | **HIGH** | Arathi mountain passes, required for Catseye Elixirs |

---

### What to Stockpile Before Phase 3 (Artisan 300 Unlock)
When Phase 3 launches, character level will rise to 40+, unlocking **Artisan training (225–300)**. Smart players are filling their bank alts with materials that will skyrocket in price on day one:

• **Mithril Ore & Solid Stone:** Needed for 225–260 Blacksmithing and Engineering.
• **Mageweave Cloth:** Needed for 225–260 Tailoring and First Aid bandages.
• **Thick Leather:** Needed for 225–260 Leatherworking.
• **Fadeleaf & Blindweed:** Essential for 225+ high-tier potions and Blinding Powder!`
    }
  ]
};

// Export to window
if (typeof window !== 'undefined') {
  window.WOW_TOOLS_DATA = WOW_TOOLS_DATA;
}
