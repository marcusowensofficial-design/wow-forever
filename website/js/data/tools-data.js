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
      revealedNewItems: 684,
      revealedPercent: 28.21,
      classicItemsHidden: 5006,
      classicRevealed: 3190,
      sodLeftovers: 5168,
      lastUpdated: "October 15, 2026"
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
      status: "Active in Beta Phase 2 (Day 29)",
      bossCount: 6,
      dropsCount: 28,
      dropsSeen: 28,
      entrance: "Hidden sewer drain pipe beneath Alterac Mountain ridges into Dalaran Underbelly.",
      bosses: [
        {
          name: "Atrexis the Grave Knight",
          title: "Undead Ritual Commander",
          drops: [
            { name: "Graveweave Bindings", slot: "Cloth Wrist", iLvl: 32, quality: "q3", stats: "+5 Intellect, +4 Spirit, +6 Spell Power" },
            { name: "Bonebinder's Signet", slot: "Finger", iLvl: 32, quality: "q3", stats: "+6 Stamina, +5 Spirit, +8 Healing" },
            { name: "Gravespike Repeater", slot: "Ranged Crossbow", iLvl: 33, quality: "q3", stats: "16.4 DPS, +4 Agility, +3 Stamina" }
          ]
        },
        {
          name: "Lyn the Ignored",
          title: "Summoned Market Specter",
          drops: [
            { name: "Cartilage Shapers", slot: "Leather Hands", iLvl: 33, quality: "q3", stats: "+7 Agility, +6 Stamina, +10 Attack Power" },
            { name: "Tendonscraper Dagger", slot: "Main Hand Dagger", iLvl: 33, quality: "q3", stats: "18.2 DPS, Speed 1.60, +5 Agility" },
            { name: "Bonepile Gaze", slot: "Shield", iLvl: 33, quality: "q3", stats: "Block 24, +6 Stamina, +4 Strength" }
          ]
        },
        {
          name: "Arcane Anomaly",
          title: "Guardian of the Breach",
          drops: [
            { name: "Runemender's Seal", slot: "Finger", iLvl: 33, quality: "q3", stats: "+6 Intellect, +8 Spell Damage" },
            { name: "Ephemeral Grips", slot: "Cloth Hands", iLvl: 33, quality: "q3", stats: "+7 Intellect, +5 Spirit, +9 Spell Power" },
            { name: "Mana-Warped Chain Shirt", slot: "Mail Chest", iLvl: 34, quality: "q3", stats: "+9 Strength, +8 Stamina, +6 Intellect" }
          ]
        },
        {
          name: "Arcanic Enigma",
          title: "Polymorphing Ley-Weaver",
          drops: [
            { name: "Drape of Shifting Energy", slot: "Cloth Back", iLvl: 33, quality: "q3", stats: "24 Armor, +5 Intellect, +7 Spell Power" },
            { name: "Violet Sorcerer's Robes", slot: "Cloth Chest (Set)", iLvl: 34, quality: "q3", stats: "+10 Intellect, +7 Spirit, +12 Spell Power" },
            { name: "Wand of Mana Concentration", slot: "Wand", iLvl: 32, quality: "q3", stats: "58 - 108 Arcane Damage, Speed 1.80 (46.1 DPS), +4 Intellect" }
          ]
        },
        {
          name: "Unstable Sentinel",
          title: "Kirin Tor Automaton",
          drops: [
            { name: "Guardian's Dualblade", slot: "Two-Hand Axe", iLvl: 33, quality: "q3", stats: "74 - 112 Damage, Speed 3.40 (27.4 DPS), +12 Strength, +8 Stamina" },
            { name: "Refractory Scaleguards", slot: "Mail Legs", iLvl: 34, quality: "q3", stats: "+10 Strength, +8 Stamina" },
            { name: "Unstable Crystalline Shoulderpads", slot: "Leather Shoulder", iLvl: 33, quality: "q3", stats: "148 Armor, +8 Agility, +7 Stamina, +5 Attack Power" },
            { name: "Blueprint: Spinning Wheel", slot: "Tailoring Blueprint", iLvl: 30, quality: "q2", stats: "Teaches Spinning Wheel campsite station" }
          ]
        },
        {
          name: "Shade of the Archmage",
          title: "Corrupted Kirin Tor Council",
          drops: [
            { name: "Archmagister's Faceted Pendant", slot: "Neck", iLvl: 35, quality: "q3", stats: "+6 Intellect, Equip: +12 Attack Power, Use: +10% Undead XP (5m)" },
            { name: "Violet Sorcerer's Mantle", slot: "Cloth Shoulder (Set)", iLvl: 35, quality: "q3", stats: "48 Armor, +9 Intellect, +6 Stamina, +11 Arcane/Frost Spell Damage" },
            { name: "Ponderous Orb", slot: "Off-Hand", iLvl: 35, quality: "q3", stats: "+8 Intellect, +6 Spirit, +11 Spell Power" },
            { name: "Blueprint: Arcane Salvager", slot: "Enchanting Blueprint", iLvl: 30, quality: "q2", stats: "Teaches Arcane Salvager campfire tool" }
          ]
        }
      ]
    },
    "dungeon-03": {
      name: "Excavation Site 4",
      levelRange: "26 – 31",
      zone: "Wetlands (Above Whelgar's Excavation)",
      status: "Active in Beta Phase 2 (Day 29)",
      bossCount: 6,
      dropsCount: 16,
      dropsSeen: 16,
      entrance: "Titan tunnel entrance nestled above the northern Wetlands dig site cliffs.",
      bosses: [
        {
          name: "Saltspine",
          title: "Marshland Alpha Crocolisk",
          drops: [
            { name: "Supple Bellyskin Leggings", slot: "Leather Legs", iLvl: 31, quality: "q3", stats: "+6 Agility, +5 Stamina" },
            { name: "Saltscale Girdle", slot: "Mail Waist", iLvl: 31, quality: "q3", stats: "+5 Strength, +4 Stamina" },
            { name: "Glinteye Slippers", slot: "Cloth Feet", iLvl: 31, quality: "q3", stats: "+5 Intellect, +4 Spirit" }
          ]
        },
        {
          name: "Shadetooth",
          title: "Highland Raptor Matriarch",
          drops: [
            { name: "Raptorclaw Greaves", slot: "Mail Feet", iLvl: 32, quality: "q3", stats: "+7 Strength, +6 Stamina" },
            { name: "Garb of Florid Feathers", slot: "Leather Chest", iLvl: 32, quality: "q3", stats: "+8 Agility, +6 Stamina" },
            { name: "Raptor's Gaze", slot: "Off-Hand", iLvl: 32, quality: "q3", stats: "+6 Intellect, +5 Spirit, +8 Spell Power" },
            { name: "Blueprint: Greenhouse", slot: "Herbalism Blueprint", iLvl: 28, quality: "q2", stats: "Teaches Greenhouse Camping station" }
          ]
        },
        {
          name: "Highland Horror",
          title: "Corrupted Bog Elemental",
          drops: [
            { name: "Garb of Fallen Felbark", slot: "Cloth Chest", iLvl: 34, quality: "q3", stats: "+8 Stamina, +9 Intellect, +11 Spell Damage" },
            { name: "Horrible Rootcore", slot: "Quest Item", iLvl: 30, quality: "q1", stats: "Starts Horrors in the Highland questline" }
          ]
        },
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
        },
        {
          name: "Relic Guardian",
          title: "Titan Vault Custodial Construct",
          drops: [
            { name: "Reliquary Mantle", slot: "Mail Shoulder", iLvl: 34, quality: "q3", stats: "+7 Strength, +6 Stamina" },
            { name: "Ring of Power Regulation", slot: "Finger", iLvl: 34, quality: "q3", stats: "+5 Intellect, +5 Stamina, +7 Spell Power" },
            { name: "Golemsight Long Gun", slot: "Ranged Gun", iLvl: 33, quality: "q3", stats: "14.8 DPS, +4 Agility, +3 Stamina" },
            { name: "Titan Relic", slot: "Quest Item", iLvl: 30, quality: "q1", stats: "100% party drop — starts Prehistoric Prism / Earthen Echo" }
          ]
        }
      ]
    },
    "dungeon-01": {
      name: "Hall of Thanes",
      levelRange: "13 – 18",
      zone: "Beneath Ironforge (Dun Morogh)",
      status: "Active in Beta Phase 1 & 2",
      bossCount: 4,
      dropsCount: 13,
      dropsSeen: 13,
      entrance: "Vault gateway beneath the High Seat in Ironforge.",
      bosses: [
        {
          name: "Faldrim Anvilmar",
          title: "Ancient Dwarf Thane Spirit",
          drops: [
            { name: "Ephemeral Choker", slot: "Neck", iLvl: 18, quality: "q3", stats: "+3 Spirit, +2 Stamina" },
            { name: "Aetherwisp Bracers", slot: "Cloth Wrist", iLvl: 18, quality: "q3", stats: "+3 Intellect, +2 Spirit" },
            { name: "Spiritwraith Drape", slot: "Cloth Back", iLvl: 18, quality: "q3", stats: "+3 Stamina, +2 Agility" }
          ]
        },
        {
          name: "Magmatus",
          title: "Raging Fire Elemental",
          drops: [
            { name: "Kindlegem Girdle", slot: "Mail Waist", iLvl: 18, quality: "q3", stats: "+4 Strength, +3 Stamina" },
            { name: "Flamefist Grips", slot: "Leather Hands", iLvl: 18, quality: "q3", stats: "+4 Agility, +3 Stamina" },
            { name: "Fang of Magmatus", slot: "Dagger", iLvl: 18, quality: "q3", stats: "11.8 DPS, Speed 1.60, +2 Agility, +2 Fire Spell Dmg" }
          ]
        },
        {
          name: "Plunder",
          title: "Trogg Treasure Warlord",
          drops: [
            { name: "Golemheart Stave", slot: "Two-Hand Staff", iLvl: 18, quality: "q3", stats: "14.2 DPS, +5 Intellect, +4 Spirit" },
            { name: "Treads of the Protector Golem", slot: "Mail Feet", iLvl: 18, quality: "q3", stats: "+4 Strength, +4 Stamina" },
            { name: "Golemguard Chest", slot: "Mail Chest", iLvl: 18, quality: "q3", stats: "+5 Strength, +5 Stamina" }
          ]
        },
        {
          name: "Durgen Dirgehammer",
          title: "Disgraced Royal Thane",
          drops: [
            { name: "Durgen's Crescent Axe", slot: "Main Hand Axe", iLvl: 18, quality: "q3", stats: "15.5 DPS, Speed 2.40, +5 Strength, +2 Stamina" },
            { name: "Direhammer Leggings", slot: "Leather Legs", iLvl: 18, quality: "q3", stats: "+5 Agility, +4 Stamina" },
            { name: "Robes of the Disgraced Thane", slot: "Cloth Chest", iLvl: 18, quality: "q3", stats: "+6 Intellect, +4 Spirit" },
            { name: "Durgen Dirgehammer's Head", slot: "Quest Item", iLvl: 18, quality: "q1", stats: "Starts An Ancient Grudge turn-in" }
          ]
        }
      ]
    },
    "dungeon-02": {
      name: "Ruins of Lordaeron",
      levelRange: "15 – 20",
      zone: "Tirisfal Glades (Above Undercity)",
      status: "Active in Beta Phase 1 & 2",
      bossCount: 7,
      dropsCount: 25,
      dropsSeen: 22,
      entrance: "Ruined palace courtyard in Capital City ruins above Undercity.",
      bosses: [
        {
          name: "The Baron",
          title: "Stitched Abomination",
          drops: [
            { name: "Meathook Slicer", slot: "Dagger", iLvl: 20, quality: "q3", stats: "13.2 DPS, Speed 1.50, +3 Agility, +2 Stamina" },
            { name: "Abomination Bones", slot: "Mail Chest", iLvl: 20, quality: "q3", stats: "+6 Strength, +4 Stamina" },
            { name: "Leftover Abomination Skin", slot: "Cloth Chest", iLvl: 20, quality: "q3", stats: "+5 Intellect, +4 Spirit" }
          ]
        },
        {
          name: "Witherfang",
          title: "Venomous Spider Broodmother",
          drops: [
            { name: "Atrophic Girdle", slot: "Mail Waist", iLvl: 20, quality: "q3", stats: "+4 Strength, +3 Stamina" },
            { name: "Witherbite Bracers", slot: "Leather Wrist", iLvl: 20, quality: "q3", stats: "+3 Agility, +3 Stamina" },
            { name: "Segmented Spider Leg", slot: "Two-Hand Staff", iLvl: 20, quality: "q3", stats: "14.8 DPS, +5 Intellect, +4 Stamina" }
          ]
        },
        {
          name: "The Abandoned",
          title: "Tortured Royal Shade",
          drops: [
            { name: "Rotmender's Leggings", slot: "Cloth Legs (Set)", iLvl: 21, quality: "q3", stats: "+6 Intellect, +5 Spirit, +4 Healing" },
            { name: "Grip of Fear", slot: "Mail Hands", iLvl: 20, quality: "q3", stats: "+4 Strength, +4 Stamina" },
            { name: "Scepter of the Abandoned", slot: "Main Hand Mace", iLvl: 20, quality: "q3", stats: "14.0 DPS, +4 Stamina, +4 Intellect" }
          ]
        },
        {
          name: "Bjork",
          title: "Skeletal Garrison Commander",
          drops: [
            { name: "Bonerust Leggings", slot: "Mail Legs", iLvl: 20, quality: "q3", stats: "+6 Strength, +5 Stamina" },
            { name: "Tuskwrap Belt", slot: "Cloth Waist", iLvl: 20, quality: "q3", stats: "+4 Intellect, +4 Spirit" },
            { name: "Corpse Chopper", slot: "Two-Hand Axe", iLvl: 21, quality: "q3", stats: "17.4 DPS, Speed 3.20, +7 Strength, +4 Stamina" }
          ]
        },
        {
          name: "Rath'mael",
          title: "Scourge Master Necromancer",
          drops: [
            { name: "Mirror of Rath'mael", slot: "Shield", iLvl: 22, quality: "q3", stats: "460 Armor, 16 Block, +5 Stamina, +3 Intellect" },
            { name: "Rotmender's Treads", slot: "Cloth Feet (Set)", iLvl: 21, quality: "q3", stats: "+5 Intellect, +4 Spirit, +5 Healing" },
            { name: "Coldspire Staff", slot: "Two-Hand Staff", iLvl: 22, quality: "q3", stats: "16.8 DPS, +7 Intellect, +5 Spirit, +6 Frost Dmg" },
            { name: "Blueprint: Fermenter", slot: "Alchemy Blueprint", iLvl: 20, quality: "q2", stats: "Teaches Fermenter campsite station" },
            { name: "Blueprint: Arcane Salvager", slot: "Enchanting Blueprint", iLvl: 20, quality: "q2", stats: "Teaches Arcane Salvager campsite tool" }
          ]
        },
        {
          name: "Viktor the Vile",
          title: "Renegade Apothecary",
          drops: [
            { name: "Vilewalkers", slot: "Mail Feet", iLvl: 20, quality: "q3", stats: "+5 Strength, +4 Stamina" },
            { name: "Bloodied Chestwraps", slot: "Leather Chest", iLvl: 20, quality: "q3", stats: "+6 Agility, +5 Stamina" },
            { name: "Vileblood Scimitar", slot: "One-Hand Sword", iLvl: 20, quality: "q3", stats: "15.0 DPS, Speed 2.20, +4 Strength, +3 Stamina" }
          ]
        },
        {
          name: "Lordaeron Captain",
          title: "Rare Spectral Royal Guard",
          drops: [
            { name: "Haunting Blade", slot: "Two-Hand Sword", iLvl: 22, quality: "q3", stats: "18.2 DPS, Speed 3.00, +6 Strength, +5 Stamina" },
            { name: "Phantom Armor", slot: "Mail Chest", iLvl: 22, quality: "q3", stats: "210 Armor, +7 Strength, +6 Stamina" }
          ]
        }
      ]
    },
    "dungeon-05": {
      name: "The Drowned City",
      levelRange: "35 – 42",
      zone: "Stranglethorn Vale (Sunken Coast)",
      status: "Launch Day Content (Nov 4, 2026)",
      bossCount: 4,
      dropsCount: 14,
      dropsSeen: 14,
      entrance: "Sunken Gurubashi coastal ruins south of Vile Reef; non-linear aquatic and temple wings.",
      bosses: [
        {
          name: "Zul'Alai",
          title: "Enraged Gurubashi Berserker",
          drops: [
            { name: "Blood-Soaked Gurubashi Cleaver", slot: "One-Hand Axe", iLvl: 41, quality: "q3", stats: "29.4 DPS, Speed 2.50, +9 Strength, +6 Stamina" },
            { name: "Zul'Alai's War Harness", slot: "Mail Chest", iLvl: 41, quality: "q3", stats: "312 Armor, +12 Strength, +10 Stamina, +1% Crit" }
          ]
        },
        {
          name: "Zin'aka",
          title: "Terror of the Aquatic Depths",
          drops: [
            { name: "Tidecaller Trinket", slot: "Trinket", iLvl: 42, quality: "q3", stats: "Equip: +16 Spell Damage & Healing, Use: Swim Speed +40% (10m)" },
            { name: "Brinescale Legguards", slot: "Leather Legs", iLvl: 41, quality: "q3", stats: "+13 Agility, +9 Stamina" }
          ]
        },
        {
          name: "Deathless Marrow",
          title: "Risen Atal'ai Lich",
          drops: [
            { name: "Whitemane's Chapeau (Tide-Blessed)", slot: "Cloth Head", iLvl: 43, quality: "q3", stats: "+14 Intellect, +14 Spirit, +18 Spell Power" },
            { name: "Marrow-Woven Gloves", slot: "Cloth Hands", iLvl: 42, quality: "q3", stats: "+10 Intellect, +8 Stamina, +14 Shadow/Frost Spell Dmg" }
          ]
        },
        {
          name: "Min'loth the Serpent",
          title: "Avatar of the Sunken Temple",
          drops: [
            { name: "Trident of the Gurubashi Depths", slot: "Two-Hand Polearm", iLvl: 44, quality: "q3", stats: "41.8 DPS, Speed 3.40, +18 Strength, +12 Agility, +10 Stamina" },
            { name: "Scale of Min'loth", slot: "Shield", iLvl: 43, quality: "q3", stats: "1,180 Armor, 28 Block, +11 Stamina, +10 Nature Resistance" }
          ]
        }
      ]
    },
    "dungeon-06": {
      name: "Krol'dok Stronghold",
      levelRange: "40 – 46",
      zone: "Riverglades (Eastern Kingdoms)",
      status: "Launch Day Content (Nov 4, 2026)",
      bossCount: 3,
      dropsCount: 12,
      dropsSeen: 12,
      entrance: "Fortified ogre citadel overlooking the eastern Riverglades timberlands.",
      bosses: [
        {
          name: "Chieftain Vark",
          title: "Renegade Centaur Outrider",
          drops: [
            { name: "Riverglades Windcloak", slot: "Back", iLvl: 45, quality: "q3", stats: "38 Armor, +11 Agility, +8 Stamina, +12 Attack Power" },
            { name: "Outrider's Hoofguards", slot: "Plate Feet", iLvl: 45, quality: "q3", stats: "365 Armor, +12 Strength, +11 Stamina" }
          ]
        },
        {
          name: "Magi Lord Gorgor",
          title: "Two-Headed Ogre Arcanist",
          drops: [
            { name: "Gorgor's Eye of Insight", slot: "Neck", iLvl: 46, quality: "q3", stats: "+12 Intellect, +8 Spirit, +15 Spell Damage & Healing" },
            { name: "Runed Ogre-Magi Cuffs", slot: "Cloth Wrist", iLvl: 46, quality: "q3", stats: "+9 Intellect, +7 Stamina, +13 Spell Power" }
          ]
        },
        {
          name: "Warboss Krol'dok",
          title: "Supreme Overlord of the Stronghold",
          drops: [
            { name: "Colossal Ogre Greataxe", slot: "Two-Hand Axe", iLvl: 48, quality: "q3", stats: "47.2 DPS, Speed 3.70, +22 Strength, +15 Stamina, +1% Crit" },
            { name: "Crown of the Ogre Warboss", slot: "Mail Head", iLvl: 47, quality: "q3", stats: "268 Armor, +15 Agility, +12 Stamina, +24 Attack Power" }
          ]
        }
      ]
    },
    "dungeon-07": {
      name: "Alcaz Island Prison",
      levelRange: "48 – 54",
      zone: "Dustwallow Marsh (Offshore Fortress)",
      status: "Launch Day Content (Nov 4, 2026)",
      bossCount: 3,
      dropsCount: 12,
      dropsSeen: 12,
      entrance: "Subterranean stockade gate beneath the central keep of Alcaz Island.",
      bosses: [
        {
          name: "Warden Bloodthorn",
          title: "Defias Blackguard Inquisitor",
          drops: [
            { name: "Prisoner's Broken Manacles", slot: "Plate Wrist", iLvl: 52, quality: "q3", stats: "285 Armor, +11 Strength, +13 Stamina, +7 Defense" },
            { name: "Bloodthorn's Stiletto", slot: "One-Hand Dagger", iLvl: 52, quality: "q3", stats: "36.5 DPS, Speed 1.50, +10 Agility, +16 Attack Power" }
          ]
        },
        {
          name: "Shadow Priestess Vivian",
          title: "Cult of the Dark Strand",
          drops: [
            { name: "Shadowfang Band", slot: "Finger", iLvl: 53, quality: "q3", stats: "+10 Intellect, +9 Stamina, +18 Spell Damage & Healing" },
            { name: "Vestments of the Dark Strand", slot: "Cloth Chest", iLvl: 53, quality: "q3", stats: "78 Armor, +16 Intellect, +12 Spirit, +22 Spell Power" }
          ]
        },
        {
          name: "Draconian Overseer",
          title: "Onyxian Brood Commander",
          drops: [
            { name: "Blackflame Dragonshield", slot: "Shield", iLvl: 55, quality: "q3", stats: "1,940 Armor, 38 Block, +15 Stamina, +15 Fire Resistance" },
            { name: "Drake-Scale Pauldrons", slot: "Leather Shoulder", iLvl: 54, quality: "q3", stats: "142 Armor, +16 Agility, +12 Stamina, +1% Hit" }
          ]
        }
      ]
    },
    "dungeon-08": {
      name: "Blackmaw Hold",
      levelRange: "55 – 60",
      zone: "Azshara (Timbermaw Stronghold)",
      status: "Launch Day Content (Nov 4, 2026)",
      bossCount: 3,
      dropsCount: 15,
      dropsSeen: 15,
      entrance: "Timbermaw cavern fortress in northern Azshara.",
      bosses: [
        {
          name: "Chieftain Winterhoof",
          title: "Fallen Timbermaw Warlord",
          drops: [
            { name: "Winterhoof's Totemic Maul", slot: "Two-Hand Mace", iLvl: 58, quality: "q3", stats: "54.6 DPS, Speed 3.60, +24 Strength, +18 Stamina, +220 Armor in Bear/Cat Form" },
            { name: "Belt of the Timbermaw Alpha", slot: "Leather Waist", iLvl: 58, quality: "q3", stats: "118 Armor, +15 Strength, +15 Agility, +12 Stamina" }
          ]
        },
        {
          name: "Void-Touched Ursa",
          title: "Abyssal Bear Monstrosity",
          drops: [
            { name: "Ursa's Void-Hardened Breastplate", slot: "Plate Chest", iLvl: 59, quality: "q3", stats: "680 Armor, +18 Strength, +22 Stamina, +10 Defense" },
            { name: "Claw of the Abyssal Bear", slot: "Fist Weapon", iLvl: 59, quality: "q3", stats: "41.2 DPS, Speed 1.60, +12 Agility, +1% Crit" }
          ]
        },
        {
          name: "Shamaness Karr",
          title: "Corrupted Elder Mystic",
          drops: [
            { name: "Furbolg War Totem", slot: "Relic / Totem / Idol", iLvl: 60, quality: "q3", stats: "Equip: Increases Spell Power and Attack Power of your primary totem/idol aura by +24" },
            { name: "Garb of the Corrupted Elder", slot: "Mail Chest", iLvl: 60, quality: "q3", stats: "410 Armor, +18 Intellect, +14 Stamina, +28 Spell Power, +6 MP5" }
          ]
        }
      ]
    },
    "dungeon-09": {
      name: "Shaper's Terrace",
      levelRange: "58 – 60",
      zone: "Un'Goro Crater (Beneath Fire Plume Ridge)",
      status: "Launch Day Content (Nov 4, 2026)",
      bossCount: 3,
      dropsCount: 16,
      dropsSeen: 16,
      entrance: "Titan vault elevator hidden within the eastern magma tubes of Fire Plume Ridge.",
      bosses: [
        {
          name: "Prime Warden Aurelius",
          title: "Titan Defense Matrix",
          drops: [
            { name: "Aurelius's Bulwark of Order", slot: "Plate Legs", iLvl: 60, quality: "q3", stats: "595 Armor, +20 Strength, +22 Stamina, +1% Hit" },
            { name: "Signet of the Titan Shapers", slot: "Finger", iLvl: 60, quality: "q3", stats: "+12 Stamina, +28 Attack Power, +1% Crit" }
          ]
        },
        {
          name: "The Primordial Hydra",
          title: "Specimen Zero-Four",
          drops: [
            { name: "Primordial Scale Leggings", slot: "Leather Legs", iLvl: 60, quality: "q3", stats: "175 Armor, +22 Agility, +16 Stamina, +1% Hit" },
            { name: "Hydra-Fang Longbow", slot: "Ranged Bow", iLvl: 60, quality: "q3", stats: "33.8 DPS, Speed 2.90, +10 Agility, +14 Ranged AP" }
          ]
        },
        {
          name: "Genesis Core 07",
          title: "Un'Goro Engine Apex",
          drops: [
            { name: "Crown of the Shapers", slot: "Cloth Head", iLvl: 61, quality: "q4", stats: "92 Armor, +24 Intellect, +16 Stamina, +36 Spell Damage & Healing, +1% Spell Crit" },
            { name: "Primordial Crystal Blade", slot: "One-Hand Sword", iLvl: 61, quality: "q4", stats: "46.8 DPS, Speed 2.60, +14 Strength, +12 Agility, +1% Hit" }
          ]
        }
      ]
    },
    "raid-01": {
      name: "Barrow Deeps (Launch Raid)",
      levelRange: "Level 60 (10-Player Tier 1)",
      zone: "Mount Hyjal / Blackmaw Underworld",
      status: "Unlocks December 9, 2026",
      bossCount: 4,
      dropsCount: 24,
      dropsSeen: 24,
      entrance: "Ancient barrow prison portal beneath the northern boughs of Mount Hyjal.",
      bosses: [
        {
          name: "Warden Avatar Maiev's Vigil",
          title: "Automated Sentinel Construct",
          drops: [
            { name: "Mantle of the Barrow Watcher", slot: "Leather Shoulder", iLvl: 65, quality: "q4", stats: "178 Armor, +24 Agility, +18 Stamina, +1% Hit" },
            { name: "Chakram of the Vigil", slot: "Ranged Thrown / Relic", iLvl: 65, quality: "q4", stats: "+14 Agility, +26 Attack Power" }
          ]
        },
        {
          name: "Shadow Fiend Tenebrous",
          title: "Devourer of Bound Souls",
          drops: [
            { name: "Tenebrous Shroud of Shadows", slot: "Back", iLvl: 65, quality: "q4", stats: "54 Armor, +15 Intellect, +14 Stamina, +28 Spell Damage & Healing" },
            { name: "Cuffs of Eternal Gloom", slot: "Cloth Wrist", iLvl: 65, quality: "q4", stats: "+16 Intellect, +12 Stamina, +24 Spell Power" }
          ]
        },
        {
          name: "The Slumbering Druid",
          title: "Nightmare-Corrupted Shan'do",
          drops: [
            { name: "Staff of the Emerald Dreamer", slot: "Two-Hand Staff", iLvl: 66, quality: "q4", stats: "58.2 DPS, +28 Intellect, +24 Spirit, +62 Healing (+21 Spell Damage)" },
            { name: "Idol of the Slumbering Bear", slot: "Relic", iLvl: 66, quality: "q4", stats: "Equip: Reduces rage cost of Maul and Swipe by 3 and increases Armor in Bear Form by 180" }
          ]
        },
        {
          name: "Tormentor Grazz",
          title: "Jailer of the Deep Vault",
          drops: [
            { name: "Glaive of the Slumbering Watcher", slot: "One-Hand Sword", iLvl: 67, quality: "q4", stats: "53.4 DPS, Speed 2.70, +16 Strength, +14 Stamina, +1% Crit" },
            { name: "Tier 1 Classic+ Helm Token", slot: "Tier 1 Token", iLvl: 66, quality: "q4", stats: "Redeemable for Class Tier 1 Headpiece (Tank, Healer, or DPS variant)" }
          ]
        }
      ]
    },
    "raid-02": {
      name: "Hyjal Summit (Launch Raid)",
      levelRange: "Level 60 (20-Player Tier 1)",
      zone: "Mount Hyjal",
      status: "Unlocks December 9, 2026",
      bossCount: 4,
      dropsCount: 28,
      dropsSeen: 28,
      entrance: "Nordrassil World-Tree Sanctuary at the peak of Mount Hyjal.",
      bosses: [
        {
          name: "Dreadlord Mal'Ganis Avatar",
          title: "Echo of the Nathrezim",
          drops: [
            { name: "Nathrezim Mind-Blade", slot: "One-Hand Dagger", iLvl: 67, quality: "q4", stats: "44.5 DPS, +16 Intellect, +14 Stamina, +42 Spell Damage & Healing, +1% Spell Crit" },
            { name: "Carapace of the Dreadlord", slot: "Plate Chest", iLvl: 67, quality: "q4", stats: "810 Armor, +24 Strength, +28 Stamina, +12 Defense" }
          ]
        },
        {
          name: "Anetheron the Defiler",
          title: "Commander of the Fel Swarm",
          drops: [
            { name: "Anetheron's Towering Inferno Girdle", slot: "Mail Waist", iLvl: 67, quality: "q4", stats: "285 Armor, +20 Agility, +18 Stamina, +36 Attack Power, +1% Hit" },
            { name: "Band of Carrion Swarm", slot: "Finger", iLvl: 67, quality: "q4", stats: "+14 Stamina, +16 Intellect, +29 Spell Power" }
          ]
        },
        {
          name: "Corrupted Nordrassil Sapling",
          title: "Blighted World-Tree Root",
          drops: [
            { name: "World-Tree Heart Trinket", slot: "Trinket", iLvl: 68, quality: "q4", stats: "Equip: Restores 12 Mana per 5 sec, Use: Grants +180 Healing & +60 Spell Damage for 15 sec" },
            { name: "Bark-Woven Leggings of Hyjal", slot: "Leather Legs", iLvl: 67, quality: "q4", stats: "215 Armor, +26 Strength, +22 Agility, +20 Stamina" }
          ]
        },
        {
          name: "General Kaz'rogal",
          title: "Doomguard Warlord",
          drops: [
            { name: "Crown of Nordrassil", slot: "Head (All Armor Types)", iLvl: 69, quality: "q4", stats: "+25 All Primary Attributes, +15 All Magic Resistances, +1% Crit" },
            { name: "Kaz'rogal's Cleaver of Doom", slot: "Two-Hand Axe", iLvl: 69, quality: "q4", stats: "71.4 DPS, Speed 3.80, +34 Strength, +24 Stamina, +2% Crit" }
          ]
        }
      ]
    },
    "raid-03": {
      name: "Onyxia's Lair (Forever Edition)",
      levelRange: "Level 60 (40-Player Tier 1)",
      zone: "Dustwallow Marsh (Wyrmbog)",
      status: "Unlocks December 9, 2026",
      bossCount: 1,
      dropsCount: 18,
      dropsSeen: 18,
      entrance: "Dragonmaw cavern lair in southern Wyrmbog (Requires Drakefire Amulet).",
      bosses: [
        {
          name: "Onyxia, Broodmother of the Black Dragonflight",
          title: "Tier 1 Pinnacle Raid Boss",
          drops: [
            { name: "Vis'kag the Bloodletter", slot: "One-Hand Sword", iLvl: 71, quality: "q4", stats: "55.2 DPS, Speed 2.60, +6 Expertise, Chance on hit: Delivers a fatal wound for 240 damage" },
            { name: "Deathbringer", slot: "One-Hand Axe", iLvl: 71, quality: "q4", stats: "56.4 DPS, Speed 2.90, +6 Expertise, Chance on hit: Sends a shadowy bolt for 110-140 damage" },
            { name: "Shard of the Scale", slot: "Trinket", iLvl: 70, quality: "q4", stats: "Equip: Restores 16 Mana per 5 sec and +18 Spell Power" },
            { name: "Head of Onyxia", slot: "Quest Item", iLvl: 70, quality: "q4", stats: "Rewards Onyxia Tooth Pendant / Dragonslayer's Signet / Onyxia Blood Talisman" },
            { name: "Onyxia Hide Backpack", slot: "18-Slot Bag", iLvl: 65, quality: "q4", stats: "Guaranteed 18-Slot Container" }
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
      title: "Hunter Pets & 520 Beasts Master Index (Attack Speeds & Ranks)",
      category: "Classes & Pets",
      source: "ForeverChanges.pro · Warcraft Tavern · Wowhead",
      icon: "https://render.worldofwarcraft.com/us/icons/56/ability_hunter_beasttaming.jpg",
      summary: "Attack speed tiers, family damage modifiers, and rank-by-rank ability trainer beasts across 520 overhauled spawns at the Level 30 cap.",
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
      summary: "All 40 interactive ancient tomes hidden across Azeroth's dungeons, ruins, and towers with milestone relic rewards for all classes.",
      content: `### The Grand Library Questline & 40 Ancient Tomes
In WoW Forever (Build 1.60.1), the ancient library book collection system is accessible to **all classes**. Scattered across the wilderness, crypts, and ruins of Azeroth are **40 interactive ancient tomes**. Collecting and turning these manuscripts in to your faction head librarian yields cumulative milestone rewards and blue dungeon-tier accessories.

### Faction Librarians & Turn-In Locations

• **Alliance Head Librarian:** **Garion Wendell** — Mage Quarter, Stormwind City (37.6, 80.8)
• **Horde Head Librarian:** **Owen Thadd** — Magic Quarter, Undercity (73.4, 33.0)

---

### Milestone Reward Tiers

| Books Required | Milestone Title | Level Req | Item Rewards | Item Stats |
|---|---|---|---|---|
| **10 Books** | *Friend of the Library (Necklace Choice)* | 10 Unique Books | **Scholarly Pendant** (Neck (iLvl 23)) *or* **Erudite's Amulet** (Neck (iLvl 23)) | +3 Stamina, +2 Spirit *or* +2 Agility, +3 Stamina |
| **20 Books** | *Greater Friend of the Library (Ring Choice)* | 20 Unique Books (Level 20+) | **Philanthropist's Ring** (Finger (iLvl 35)) *or* **Field Researcher's Loop** (Finger (iLvl 35)) | +5 Intellect, Equip: +10 Spell Damage and Healing *or* +7 Agility, +7 Stamina |
| **25 Books** | *Master Scholar of Azeroth (Weapon Choice)* | 25 Unique Books (Level 30+ / Req Lvl 40) | **Truthseeker's Bow** (Ranged Bow (iLvl 45)) *or* **Crest of Elucidation** (Off-Hand Shield (iLvl 45)) *or* **Researcher's Night Light** (Off-Hand (iLvl 45)) | 23.8 DPS, +7 Agility, +3 Stamina (Req Level 40) *or* +12 Spirit, +11 Healing, +4 Spell Damage (Req Level 40) *or* +12 Stamina, +7 Fire Spell Damage (Req Level 40) |
| **30 Books** | *Grand Bibliographer (Necklace Reward)* | 30 Unique Books (Level 30+) | **Tome-Studded Choker** (Neck (iLvl 35)) | +8 Stamina, +6 Intellect, +10 Spell Damage and Healing |
| **40 Books** | *Scholar of the First Realm (40/40 Completion)* | All 40 Unique Books | **Lorekeeper's Binding** (Unique Ring (iLvl 38)) | +7 All Stats (+7 Str, +7 Agi, +7 Sta, +7 Int, +7 Spi) |

---

### All 40 Ancient Tome Locations (Grouped by Discovery Zone)

#### Elwynn Forest (1 Book)
• **Archmage Theocritus' Research Journal**: \\\`65.4, 70.1 (Tower of Azora)\\\` — Research notes from the Tower of Azora.

#### Ironforge (1 Book)
• **Archmage Antonidas: The Unabridged Autobiography**: \\\`75.7, 10.5 (Hall of Explorers)\\\` — Somewhat self-indulgent autobiography. Horde players can loot it too.

#### Westfall (1 Book)
• **Bewitchments and Glamours**: \\\`45.4, 70.4 (Moonbrook Schoolhouse)\\\` — Spells for manipulation and deception.

#### Westfall / Loch Modan (1 Book)
• **Rumi of Gnomeregan: The Collected Works**: \\\`52.7, 53.8 (Sentinel Hill) or 35.6, 48.9\\\` — The writings of a notable Gnome mage.

#### Duskwood (2 Books)
• **Crimes Against Anatomy**: \\\`16.6, 28.5 (Darkened Bank Catacombs)\\\` — Written by Doctor Krastinov inside the catacomb end room.
• **Legends of the Gurubashi**: \\\`78.4, 34.6 (Beggar's Haunt)\\\` — Chronicles of the ancient Jungle Troll empire and the avatar of Hakkar.

#### Loch Modan (2 Books)
• **Runes of the Sorcerer-Kings**: \\\`77.4, 14.0 (Mo'grosh Stronghold)\\\` — A relic of the mighty ogre empires of Draenor.
• **The Founding of Ironforge**: \\\`46.2, 13.8 (Algaz Gate Library)\\\` — Architectural blueprints and clan pacts from the construction of Ironforge.

#### Wetlands (1 Book)
• **Goaz Scrolls**: \\\`33.6, 47.9 (Whelgar's Excavation Site)\\\` — Written in lost Titan script.

#### Silverpine Forest (2 Books)
• **The Dalaran Digest, Vol. 23**: \\\`63.5, 63.1 (Ambermill)\\\` — Arcane research of the Kirin Tor.
• **The Scourge of Lordaeron**: \\\`43.8, 40.2 (Pyrewood Village Town Hall)\\\` — Eyewitness testimonies from the fall of Stratholme and the plague grain.

#### Tirisfal Glades (1 Book)
• **The Apothecary's Metaphysical Primer**: \\\`59.4, 52.3 (Brill Gallows)\\\` — Notes on arcane theory by Archmage Rotwick.

#### Darkshore (2 Books)
• **Nar'thalas Almanac, Vol. 74**: \\\`59.8, 22.3 (Ruins of Mathystra)\\\` — Arcane research of the ancient quel'dorei.
• **War of the Ancients: The Well of Eternity**: \\\`37.2, 43.6 (Ruins of Mathystra)\\\` — Highborne scrolls describing the Burning Legion's first invasion ten thousand years ago.

#### The Barrens (3 Books)
• **Arcanic Systems Manual**: \\\`56.3, 8.8 (The Sludge Fen)\\\` — Poorly-organized troubleshooting tips for goblin technology.
• **Baxtan: On Destructive Magics**: \\\`62.7, 36.3 (Ratchet)\\\` — The writings of a notable Goblin mage.
• **Secrets of the Dreamers**: \\\`46.0, 36.5 (Lushwater Oasis / Cavern of Mists)\\\` — Observations on the Emerald Dream inside the Wailing Caverns cave.

#### Stonetalon Mountains (2 Books)
• **Fury of the Land**: \\\`74.4, 85.7 (Grimtotem Post)\\\` — Closely guarded shamanistic secrets of the Grimtotem clan.
• **Rise of the Horde**: \\\`48.6, 61.2 (Sun Rock Retreat)\\\` — Firsthand orc accounts of the crossing through the Dark Portal.

#### Orgrimmar (1 Book)
• **The Lessons of Ta'zo**: \\\`38.7, 78.4 (Valley of Spirits Mural)\\\` — Etchings written by a great Troll mage.

#### Stranglethorn Vale (1 Book)
• **Basilisks: Should Petrification be Feared?**: \\\`41.4, 50.9 (Crystalvein Mine platform)\\\` — Research notes on basilisk reagents outside the mine mouth.

#### Thousand Needles (2 Books)
• **Geomancy: The Stone-Cold Truth**: \\\`34.4, 40.1 (Darkcloud Pinnacle hut)\\\` — Theories on the origin and usage of elemental magic.
• **The Scepter of the Shifting Sands**: \\\`28.4, 76.2 (Mirage Raceway)\\\` — Bronze Dragonflight lore detailing the seal placed upon Ahn'Qiraj.

#### Alterac Mountains (1 Book)
• **Defensive Magics 101**: \\\`48.4, 57.6 (Gallows' Corner Tower)\\\` — Introductory guide to defensive barriers inside the ogre fortress tower.

#### Dustwallow Marsh (1 Book)
• **RwlRwlRwlRwl!**: \\\`57.2, 20.8 (Witch Hill murloc camp)\\\` — Waterlogged book on the ground at the eastern edge of the murloc camp.

#### Arathi Highlands (1 Book)
• **A Web of Lies: Debunking Myths and Legends**: \\\`73.6, 65.2 (Witherbark Village)\\\` — An incomplete thesis claiming spiders are harmless.

#### Desolace (1 Book)
• **Demons and You**: \\\`55.1, 26.2 (Thunder Axe Fortress)\\\` — Inside the large building on a bench against the wall.

#### Badlands (1 Book)
• **Mummies: A Guide to the Unsavory Undead**: \\\`56.7, 39.9 (Mirage Flats)\\\` — Tales frightening enough to scare hardy warriors.

#### Swamp of Sorrows (2 Books)
• **Sanguine Sorcery**: \\\`70.0, 51.0 (Pool of Tears / Sunken Temple roof)\\\` — Outlines powerful blood rituals on top of the Sunken Temple exterior.
• **The Sunken Temple of Atal'Hakkar**: \\\`67.2, 48.4 (Sunken Temple Outer Balcony)\\\` — Warnings of the Green Dragonflight wardens containing Hakkar's nightmare.

#### Tanaris (1 Book)
• **Legends of the Tidesages**: \\\`72.7, 47.8 (Lost Rigger Cove)\\\` — Covered in notes scrawled by an unsteady hand.

#### Burning Steppes (1 Book)
• **Stonewrought Design**: \\\`29.0, 28.9 (Blackrock Mountain Tomb)\\\` — On the altar of Franclorn Forgewright's tomb in Blackrock Mountain.

#### Felwood (1 Book)
• **Northern Kalimdor - A Comprehensive Guide**: \\\`65.2, 3.3 (Timbermaw Hold Tunnel)\\\` — In the tunnel between Felwood and Winterspring.

#### Western Plaguelands (1 Book)
• **Necromancy 101**: \\\`69.4, 72.8 (Caer Darrow Scholomance keep)\\\` — On a table in the ruined keep of Caer Darrow outside the dungeon.

#### Eastern Plaguelands (2 Books)
• **A Study of the Light**: \\\`71.8, 48.2 (Light's Hope Chapel)\\\` — Teachings of the Light inside the chapel building.
• **The Knight and the Lady**: \\\`54.4, 51.1 (Corin's Crossing)\\\` — In a small house by the lake.

#### Winterspring (1 Book)
• **Ka-Boom!**: \\\`60.7, 37.7 (Everlook Alchemy shop)\\\` — On a shelf behind the alchemy supplier in Everlook.

#### Hillsbrad Foothills (1 Book)
• **The Seven Kingdoms**: \\\`51.2, 58.6 (Southshore Town Hall)\\\` — Political history and diplomatic accords of Arathor's successor states.

#### Ashenvale (1 Book)
• **The Old Gods and the Ordering of Azeroth**: \\\`74.2, 60.8 (Forest Song Ruins)\\\` — Titan archives detailing the imprisonment of C'Thun and Yogg-Saron.

#### Zephras Isle (1 Book)
• **The World Tree and the Emerald Dream**: \\\`42.6, 58.2 (Windweaver Sanctum)\\\` — Sacred druidic tome gifted to the early Skyborne by the Green Flight.

💡 **Pro-Tip:** Target macros like \\\`/target Ancient Tome\\\` do not target static world game-objects. Enable **Interact Key** in *Game Menu -> Options -> Controls -> Enable Interact Key* to easily highlight and loot books through terrain and bookshelf corners!`
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

• **Battleground Marks of Honor:** Marks of Honor now stack up to **30** (increased from 20), reducing bag space clutter during Warsong Gulch honor pushes.

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

### The Secret Serpent Form (Embrace of the Viper)
🗺️ **Set Bonus Unlock:** *Embrace of the Viper (5/5)*
• Collect all 5 pieces of the Embrace of the Viper set in Wailing Caverns: Armor of the Fang (Lord Cobrahn), Footpads of the Fang (Lady Anacondra), Leggings of the Fang (Lord Pythas), Belt of the Fang (Lord Serpentis), and Gloves of the Fang (trash drop).
• Equipping all 5 items unlocks **Snake Form**: transforms you into a sleek serpent with slithering Prowl animations, aquatic snake swimming, and the *Dream Venom* proc (chance on melee attack to stun for 1 sec and deal 45 Nature damage over 15s).
• Also unlocks Emerald, Diamondback, and Albino serpent colorations at any Barber Shop!`
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
      title: "Camping Tradeskill (1–225): Complete Leveling Guide, Tents & Stations",
      category: "Economy & Professions",
      source: "ForeverChanges.pro · Warcraft Tavern · Wowhead",
      icon: "https://render.worldofwarcraft.com/us/icons/56/inv_misc_stonetablet_05.jpg",
      summary: "Comprehensive guide to unlocking and leveling Camping (1–225): starter quests, skill-up mechanics, bracket-by-bracket roadmap, portable tents, field crafting stations, and rested XP efficiency.",
      content: `### The Survivalist Tradeskill of WoW Forever
**Camping** is the definitive 4th secondary profession in WoW Forever (alongside First Aid, Cooking, and Fishing). It allows all adventurers—regardless of class or primary craft—to pitch wilderness shelters, establish outdoor rest zones, and deploy portable profession crafting stations anywhere in the world!

---

### How to Unlock Camping & Starter Quests
Unlike primary professions that count toward your 2-craft limit, Camping is a **Secondary Profession** that anyone can learn at character **Level 5+**.

#### The Onboarding Quest: "The Great Outdoors"
Pick up the introductory quest from Wilderness Camp Trainers located just outside starting racial towns:
• **Alliance Trainers:**
  - **Sam Sarsaparilla** — Outside Goldshire, Elwynn Forest (Coordinates: 43.6, 65.8)
  - **Eric Brighthammer** — Outside Kharanos, Dun Morogh (Coordinates: 46.2, 53.4)
  - **Andrea Firebeard** — Outside Thelsamar, Loch Modan
  - **Lyria Nightsong** — Outside Dolanaar, Teldrassil
• **Horde Trainers:**
  - **Eleanor Shackleton** — Outside Brill, Tirisfal Glades (Coordinates: 60.8, 52.0)
  - **Malok Stoneflint** — Outside Razor Hill, Durotar (Coordinates: 51.4, 43.6)
  - **Keldan Wildstrider** — Outside Bloodhoof Village, Mulgore (Coordinates: 47.0, 58.2)

**Quest Steps:**
1. Use the \`/sit\` emote beside the trainer's welcoming campfire for 1 minute to complete the rest cycle and receive your first 1-hour camp buff.
2. Turn in the quest to learn **Apprentice Camping (Skill 1–75)**.
3. Purchase a **Flint and Tinder** and a stack of **Simple Wood** from any general supplies or trade goods vendor to begin crafting your first kits.

---

### The Camping Skill-Up Engine: How You Level Up
Many players wonder how Camping gains skill points in Classic+. Camping skill increases through four distinct activities in the open world:

1. **Crafting & Deploying Campfire Kits:** Assembling campfire kits in your tradeskill menu and deploying them outdoors grants guaranteed skill-ups while the recipe is orange, and frequent skill-ups while yellow.
2. **Pitching Wilderness Shelters:** Constructing Lean-to Shelters, Linen Wall Tents, and Silk Pavilions provides primary bracket skill-ups.
3. **Building Profession Field Workstations:** Crafting field stations (Field Tanning Racks, Field Spinning Wheels, Portable Anvils, Alchemy Cauldrons) rolls reliable skill gains while unlocking open-world crafting for your group.
4. **Cooking Over Active Campfires:** Preparing meals over a campfire you personally established provides bonus rolls toward Camping skill points up to skill 100.

---

### Step-by-Step Leveling Roadmap (1–225 Phase 2 Beta Cap)

#### Bracket 1: Skill 1–25 · Basic Campfire Kits & Flintwork
• **Recipe:** *Basic Campfire Kit* (Skill 1)
• **Materials:** 1x Simple Wood, Flint and Tinder (in bags)
• **Source:** Taught by Camping Trainer upon completing "The Great Outdoors"
• **Strategy:** Craft and deploy approximately 25–30 Basic Campfire Kits. It stays orange until 20, then yellow until 25.
• **Estimated Crafts:** ~28 crafts (28x Simple Wood)

#### Bracket 2: Skill 25–50 · Lean-to Shelters & Tier 1 Stations
• **Recipe:** *Lean-to Shelter* (Skill 25)
• **Materials:** 4x Simple Wood, 2x Rough String
• **Source:** Taught by Camping Trainer at Skill 25
• **Strategy:** Pitch Lean-tos in outdoor leveling zones. Each shelter provides a 30-minute *Windbreak* aura (+2 Stamina) and +50% Rested XP speed. Also deploy your first Tier 1 profession station (Camp Chair, Sharpening Wheel, or Incense Candle) at skill 20 for free milestone skill-ups.
• **Estimated Crafts:** ~28 crafts (112x Simple Wood, 56x Rough String)

#### Bracket 3: Skill 50–75 · Field Tanning Racks & Linen Wall Tents
• **Recipe 1 (50–65):** *Field Tanning Rack* (Skill 40) — 4x Light Leather, 2x Simple Wood (Enables on-site leather curing)
• **Recipe 2 (65–75):** *Linen Wall Tent* (Skill 50) — 8x Linen Cloth, 4x Simple Wood (Grants +100% Rested XP and +4 Stamina/Spirit)
• **Estimated Crafts:** ~18 Tanning Racks + ~12 Linen Wall Tents
• **Total Materials:** ~72x Light Leather, ~84x Simple Wood, ~96x Linen Cloth
• ⚠️ **Important Milestone (Skill 75 / Level 15+):** Visit your major faction camp trainer in Stormwind, Ironforge, Orgrimmar, or Undercity to train **Journeyman Camping (Raises cap to 150)**.

#### Bracket 4: Skill 75–100 · Linen Wall Tents & Field Spinning Wheels
• **Recipe 1 (75–90):** Continue crafting *Linen Wall Tent* (Yellow from 75–85, green at 90). This is the cheapest cloth path.
• **Recipe 2 (90–100):** *Field Spinning Wheel* (Skill 65) — 6x Wool Cloth, 4x Simple Wood, 2x Medium Leather
• **Estimated Crafts:** ~20 Linen Tents + ~12 Spinning Wheels
• **Total Materials:** ~160x Linen Cloth, ~128x Simple Wood, ~72x Wool Cloth, ~24x Medium Leather

#### Bracket 5: Skill 100–125 · Portable Anvils & Journeyman Campfires
• **Recipe 1 (100–115):** *Portable Blacksmithing Anvil* (Skill 90) — 4x Bronze Bar, 2x Heavy Stone
• **Recipe 2 (115–125):** *Journeyman Campfire Kit* (Skill 100) — 1x Star Wood
• **Blueprint Drop:** *Blueprint: Journeyman Campfire* drops from **Lord Serpentis** in Wailing Caverns (or acquired via early trade favor). Holds up to 5 camp stations with a 45-minute burn duration.
• **Estimated Crafts:** ~18 Portable Anvils + ~12 Journeyman Campfires
• **Total Materials:** ~72x Bronze Bar, ~36x Heavy Stone, ~12x Star Wood

#### Bracket 6: Skill 125–150 · Silk Trail Pavilions & Field Cauldrons
• **Recipe 1 (125–140):** *Silk Trail Pavilion* (Skill 100) — 12x Silk Cloth, 4x Iron Bar (Grants +200% Rested XP speed and +3% All Stats Full Rested aura)
• **Recipe 2 (140–150):** *Field Alchemy Cauldron* (Skill 120) — 4x Iron Bar, 2x Stranglekelp, 2x Briarthorn
• **Estimated Crafts:** ~18 Silk Pavilions + ~12 Cauldrons
• **Total Materials:** ~216x Silk Cloth, ~120x Iron Bar, ~24x Stranglekelp, ~24x Briarthorn
• ⚠️ **Phase 1 Tradeskill Cap Reached (150)!**

#### Bracket 7: Skill 150–225 · Phase 2 Beta Cap (Expert Camping & Feasts)
• **Training:** Learn **Expert Camping (Cap 225)** at **Character Level 25+** from Wilderness Survival Masters:
  - **Alliance:** Deneb Walker in Stromgarde Keep, Arathi Highlands
  - **Horde:** Karrina Mekeda in Brackenwall Village, Dustwallow Marsh
• **Skill 150–175:** *Field Alchemy Cauldron* (Stays green/yellow until 175) or *Silk Encampment Tent* (Tailoring 125 / Camping 150: 16x Silk Cloth, 4x Heavy Silken Thread).
• **Skill 175–200:** *Cookie's Feast* (Blueprint drops from **Cookie** in The Deadmines: 5x Lean Wolf Flank, 5x Refreshing Spring Water). Feeds entire party, granting Well Fed +5% monster kill EXP.
• **Skill 200–225:** *Expert Campfire Kit* (Blueprint dropped by mid-level dungeon bosses in Scarlet Monastery / Razorfen Kraul: 1x Thick Logs). Holds up to 10 stations with 60-minute duration.
• 🔒 **Phase 2 Cap:** In Closed Beta Phase 2, player level is capped at 30, meaning tradeskills cap at 225. Artisan Camping (225–300) unlocks in Phase 3!

---

### Total Reagents Shopping List (1–150)
To power-level Camping from 1 to 150 quickly, stock up on the following materials:

| Material | Quantity | Primary Source |
| **Simple Wood** | ~350x | Trade Supplies / General Vendor |
| **Rough String** | ~56x | General Vendor |
| **Star Wood** | ~12x | Trade Supplies Vendor |
| **Linen Cloth** | ~256x | Humanoid drops (Westfall, Silverpine) |
| **Wool Cloth** | ~72x | Humanoid drops (Deadmines, Wetlands) |
| **Silk Cloth** | ~216x | Humanoid drops (SM, Badlands) |
| **Light Leather** | ~72x | Skinning Beasts (Lvl 10–20) |
| **Medium Leather** | ~24x | Skinning Beasts (Lvl 20–30) |
| **Bronze Bar** | ~72x | Smelting Copper + Tin |
| **Iron Bar** | ~120x | Mining Iron Veins |
| **Heavy Stone** | ~36x | Mining Tin / Iron Veins |
| **Stranglekelp / Briarthorn** | ~24x each | Herbalism Gathering |

---

### Rested XP & Leveling Efficiency Engine
Camping is the single most powerful leveling multiplier in WoW Forever when properly stacked:

• **Outdoor Rested XP:** Sitting inside a pitched tent (Lean-to, Linen, or Silk) for just 30 seconds generates up to **5% of your level in Rested XP** on a 1-hour cooldown.
• **Cozy Sleeping Bag Synergy:** Complete the Level 14+ Scavenger Quest to earn the *Cozy Sleeping Bag*. Resting inside for 3 minutes grants **+3% bonus XP from ALL sources (monsters & quests)** for 2 hours!
• **Camp Cooking Feast Synergy:** Consuming a camp feast (such as *Cookie's Feast*) adds **+5% bonus monster kill EXP** while Well Fed.
• **Grand Total:** Stacking a tent rest, sleeping bag buff, and campfire feast provides **over +30% effective leveling velocity** in open-world questing!`
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

### The Comprehension System & Coldflame Saber Discovery
Mages possess a unique secondary research skill — **Comprehension (1–300)** — used to decipher ancient scrolls scattered across Azeroth:
• **Untranslated Scrolls:** Dropped by Syndicate rogue spellcasters in Alterac and Defias mages in Westfall.
• **Library Deciphering:** Study at the Ironforge Library or Stormwind Academy to decipher the scrolls into powerful enchants and combat incantations.
• **Coldflame Saber Forging:** By deciphering the *Scroll of the Saber* and combining it with the *Blade of Silverlaine* (from Baron Silverlaine in Shadowfang Keep), Mages forge the iconic **Coldflame Saber** — 1H Sword granting +32 Spell Power and +98 bonus Fire damage against Frozen targets!

---

### Phase 2 Talent Build (21 Talent Points)
• **Tier 1 (5/5 Arcane Subtlety):** Reduces threat generated by Arcane spells by 40% and reduces target's arcane resistances.
• **Tier 2 (5/5 Arcane Concentration):** Grants a 10% chance to enter a Clearcasting state after any damage attack.
• **Tier 3 (1/1 Spellstrike):** Unlocks the core melee strike.
• **Tier 4 (5/5 Blade Infusion):** Increases your melee critical strike chance by 5% and adds 10% spell damage to critical strikes.
• **Tier 5 (5/5 Arcane Impact):** Increases critical strike chance of Arcane Explosion and Spellstrike by 6%.

💡 **BiS Weapons:** Acquire the forged *Coldflame Saber* (SFK) or *Kirin Tor Battle-Blade* (City of Dalaran) to maximize Spellstrike weapon scaling!`
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
    },
    {
      id: "guide-druid-snake-form",
      title: "Secret Druid Snake Form: Embrace of the Viper Full Guide",
      category: "Classes & Pets",
      source: "ForeverChanges.pro · Wowhead · Classic+",
      icon: "https://wow.zamimg.com/images/wow/icons/large/ability_hunter_pet_windserpent.jpg",
      summary: "How to unlock the custom Druid Snake Form: Wailing Caverns set drops, Dream Venom 1-second stun proc, slithering Prowl, and Barber Shop scales.",
      content: `### Unlocking the Secret Druid Snake Form
One of the most viral discoveries in WoW Forever is the **Druid Snake Form**, an authentic shape-shifting form with dedicated serpent animations, swimming locomotion, and stealth mechanics.

### Requirements & Set Pieces: Embrace of the Viper (5/5)
To unlock Snake Form, Druids must assemble the complete 5-piece **Embrace of the Viper** dungeon set from Wailing Caverns:

| Set Item | Boss / Source | Drop Rate | Key Stats |
| **Armor of the Fang** | Lord Cobrahn | 25% | Chest: 81 Armor, +2 Str, +7 Agi |
| **Footpads of the Fang** | Lady Anacondra | 28% | Feet: 55 Armor, +4 Agi, +4 Sta |
| **Leggings of the Fang** | Lord Pythas | 25% | Legs: 74 Armor, +5 Str, +9 Agi, +4 Sta |
| **Belt of the Fang** | Lord Serpentis | 33% | Waist: 46 Armor, +2 Str, +6 Agi |
| **Gloves of the Fang** | Wailing Caverns Trash Mobs | BoE Rare | Hands: 48 Armor, +5 Agi |

---

### Form Mechanics & Unique Abilities
Equipping the full 5/5 set permanently unlocks Snake Form:
• **Dream Venom:** Chance on hit with melee attacks to stun the target for 1 second and inflict 45 Nature damage over 15 seconds.
• **Slithering Prowl:** In stealth, your serpent slithers silently along the terrain with custom low-profile collision.
• **Aquatic Serpent:** When swimming in water, converts into an aquatic water-snake with increased swimming speed and amphibious breathing.
• **Barber Shop Customization:** Once unlocked on your character, visit any capital city Barber Shop to toggle between Emerald Viper, Diamondback Rattler, and Albino Cobra scale patterns!`
    },
    {
      id: "guide-savory-whimsyfin-delight",
      title: "Savory Whimsyfin Delight: Redridge Fishing & Secret Buff Guide",
      category: "Economy & Professions",
      source: "ForeverChanges.pro · Wowhead · Classic+",
      icon: "https://wow.zamimg.com/images/wow/icons/large/inv_misc_fish_50.jpg",
      summary: "Where to fish Whimsyfin in Redridge Mountains, Cooking 85 recipe source, and the secret 1-hour Orc Pirate / Ninja illusions.",
      content: `### The Classic+ Culinary Sensation: Savory Whimsyfin Delight
The Classic+ counterpart to the legendary Savory Deviate Delight is the **Savory Whimsyfin Delight**, a coveted vanity consumable discovered in the contested riverways of the Eastern Kingdoms.

### Gathering & Recipe Details

| Parameter | Specification |
| **Required Profession** | Cooking (Skill 85) & Fishing (Skill 75+) |
| **Fishing Location** | Redridge Mountains: River pools along Lake Everstill and the Stonewatch river mouth (\`45.0, 52.0\`) |
| **Recipe Source** | Dropped by Redridge Shadowhide Gnolls and Blackrock Orc raiders (~1.8% drop rate) |
| **Ingredients** | 1x Fresh Whimsyfin + 1x Mild Spices |

---

### Effects & Vanity Transformations
Eating a Savory Whimsyfin Delight triggers the **"Yum!"** buff with one of two random 60-minute cosmetic illusions:
• **Orcish Buccaneer:** Transforms your character into a swaggering Orc Pirate complete with tricorne hat, eyepatch, and cutlass.
• **Kek Ninja:** Transforms your character into a masked stealth ninja with smoke-bomb jump animations.
• 💰 **Auction House Economy:** Fresh Whimsyfin and cooked Delights sell for upwards of 40–60 Silver each on the Auction House during Phase 2 tournaments!`
    },
    {
      id: "guide-class-warrior",
      title: "Warrior Level 30 Guide: Spearing Strike, Stance Dancing & Sweeping Strikes",
      category: "Classes & Pets",
      source: "Wowhead · Warcraft Tavern · Classic+",
      icon: "https://render.worldofwarcraft.com/us/icons/56/ability_warrior_savageblow.jpg",
      summary: "Master the Level 30 Warrior: Arms Sweeping Strikes burst, Spearing Strike disarm, stance macro choreography, and Corpsemaker vs Heavehammer.",
      content: `### Warrior Supremacy at Level 30
In WoW Forever, Level 30 represents a monumental power spike for Warriors. Reaching Level 30 unlocks the iconic **Sweeping Strikes (Arms Tier 5)**, **Whirlwind Axe** questline, and the new Classic+ baseline strike **Spearing Strike**.

### Arms vs Fury vs Protection (Level 30 Meta)

| Spec | Strengths | Talent Geometry | Key Weapons |
| **Arms (21/0/0)** | Supreme burst, Cleave, Sweeping Strikes | 3/3 Deep Wounds, 2/2 Impale, 1/1 Sweeping Strikes | Corpsemaker (RFK), Heavehammer (Excavation 4) |
| **Fury (0/21/0)** | Sustained single-target, Enrage, Flurry | 5/5 Cruelty, 5/5 Enrage, 5/5 Flurry | Dual Wingblade / Outlaw Sabre |
| **Protection (0/5/16)** | Dungeon threat, Shield Slam prep, Taunt | 5/5 Shield Spec, 1/1 Last Stand, 5/5 Defiance | Butcher's Cleaver + Petrified Bark Shield |

---

### Core Mechanics & Classic+ Additions

#### 1. Spearing Strike (Arms Talent / Battle Stance)
• **Cost:** 15 Rage (Requires Battle Stance; usable with 1H or 2H weapons following the Phase 2 update).
• **Effect:** Impales the target for 110% weapon damage, **dismounting mounted players and pinning/slowing fleeing targets** (30s cooldown). In open-world PvP and Warsong Gulch, landing Spearing Strike locks down flag carriers and runners immediately.

#### 2. Sweeping Strikes (Arms Capstone at 30)
• **Cost:** 30 Rage (Battle Stance, 30s CD).
• **Mechanic:** Your next 5 melee attacks strike an additional nearby opponent. Paired with Cleave or Overpower, creates unmatched AoE dungeon devastation.

---

### Essential Stance Dancing Macro

\`\`\`lua
#showtooltip Overpower
/cast [nostance:1] Battle Stance
/cast Overpower
\`\`\`

💡 **Weapon Swing Timer Tip:** Never cast Cleave when pooling for Sweeping Strikes. Pool to 55 Rage in Battle Stance, pop Sweeping Strikes, switch to Berserker Stance (if available) or Cleave immediately upon next main-hand swing!`
    },
    {
      id: "guide-class-paladin",
      title: "Paladin Level 30 Guide: Retribution & Holy Taunts (Voice of Truth & Seal Weaving)",
      category: "Classes & Pets",
      source: "Wowhead · Warcraft Tavern · Classic+",
      icon: "https://render.worldofwarcraft.com/us/icons/56/spell_holy_auramastery.jpg",
      summary: "Righteous Defense taunt mechanics, Voice of Truth silence breaks, Seal of Command burst rotation, and Forsaken Paladin holy fire synergies.",
      content: `### The Holy Champion Overhaul in WoW Forever
Paladins in WoW Forever receive critical quality-of-life adjustments that elevate them from auto-attack bots into formidable front-line commanders with reliable taunt mechanics and anti-silence utility.

### Paladin Spec Profiles at Level 30

| Specialization | Role | Top Talent Focus | Signature Utility |
| **Retribution (0/11/10)** | Burst DPS & PvP Juggernaut | 5/5 Conviction, 1/1 Seal of Command | Blessing of Freedom, Hammer of Justice (5s) |
| **Holy (21/0/0)** | Infinite Mana Dungeon Healer | 5/5 Divine Intellect, 5/5 Illumination | Flash of Light R1, Cleanse, Lay on Hands |
| **Protection (0/16/5)** | AoE Dungeon Tank | 5/5 Redoubt, 3/3 Precision, Righteous Fury | Righteous Defense (Taunt), Holy Shield prep |

---

### Key Classic+ Upgrades

#### 1. Righteous Defense (Reliable Taunt)
• **Range:** 30 Yards | **Cooldown:** 10 Seconds | **Cost:** Negligible Mana.
• **Mechanic:** Taunts up to 3 attacking monsters off an ally onto the Paladin. Completely solves Classic Paladin tanking viability in Excavation Site 4 and City of Dalaran!

#### 2. Voice of Truth (Silence & Interrupt Protection)
• When casting under aura concentration, reduces silence duration by 50% and grants a 20% Holy Spell Power surge for 6 seconds following any stun dispel.

---

### Seal Weaving & Rotation Priority

• **Judgement -> Seal of Command:** Apply Judgement of the Crusader for bonus Holy Damage, re-seal Seal of Command, and let slow 3.5s+ two-handed maces (*Verigan's Fist*) proc burst.
• **Illumination Healing Engine:** In Holy spec, spell critical heals refund 100% mana cost, allowing Paladins to heal full dungeons without drinking!`
    },
    {
      id: "guide-class-rogue",
      title: "Rogue Level 30 Guide: Energy Pooling, Stunlock Chains & Poison Alchemy",
      category: "Classes & Pets",
      source: "Wowhead · Warcraft Tavern · Classic+",
      icon: "https://render.worldofwarcraft.com/us/icons/56/ability_rogue_eviscerate.jpg",
      summary: "Energy tick pooling, 14-second stunlock loops, Instant & Crippling Poison at 30, and dual-wield weapon swing timing.",
      content: `### Shadow Lethality at the Level 30 Cap
Rogues combine precise 100-Energy management, deadly crowd control diminishing returns, and custom poison brews to dominate both open-world skirmishes and dungeon DPS meters.

### Spec Pathways at Level 30

| Spec | Build | Best In Slot Weapons | Focus |
| **Combat Swords (0/21/0)** | 5/5 Precision, 5/5 Dual Wield, 1/1 Blade Flurry | Cruel Barb (DM) + Wingblade (WC) | Dungeon AoE cleave, boss sustained DPS |
| **Subtlety Stunlock (0/10/11)** | 5/5 Camouflage, 2/2 Elusiveness, 3/3 Hemorrhage | Meteor Shard + Toxic Revenger | 1v1 PvP duels, Warsong Gulch lockouts |
| **Assassination (21/0/0)** | 5/5 Malice, 3/3 Ruthlessness, 1/1 Cold Blood | 2x Fast 1.4s–1.5s Daggers | 100% Crit Eviscerate execution spikes |

---

### The Perfect 14-Second Stunlock Sequence

1. **Cheap Shot (Lvl 26):** 4-second opener stun (Generates 2 Combo Points).
2. **Backstab / Sinister Strike:** Cast once, then pool energy to 60.
3. **Kidney Shot (Lvl 30):** At second 3.8 of Cheap Shot, land a 3-Combo Point Kidney Shot for 4 seconds of stunned lockout!
4. **Gouge (Rank 3):** 4.5 seconds of incapacitation to regenerate 100 full Energy.
5. **Cold Blood + Eviscerate (Rank 5):** Deals 450+ guaranteed critical damage.

---

### Poison Application Strategy (Level 30 Cap)

• **Main Hand:** Instant Poison Rank 2 (Chance to deal 35 Nature damage on hit).
• **Off-Hand:** Crippling Poison (Reduces movement speed by 50% for 12 seconds). Prevents runners from pulling extra dungeon packs!`
    },
    {
      id: "guide-class-priest",
      title: "Priest Level 30 Guide: Wand DPS, Downranking & Inner Fire Defense",
      category: "Classes & Pets",
      source: "Wowhead · Warcraft Tavern · Classic+",
      icon: "https://render.worldofwarcraft.com/us/icons/56/spell_holy_powerwordshield.jpg",
      summary: "Mastering the 5-second spirit regen rule, Gravestone Scepter wand spikes, Flash Heal vs Heal rank efficiency, and Shadow Weaving debuffs.",
      content: `### Divine Mastery: Priest Progression at Level 30
Priests reign as the quintessential healers of Azeroth, commanding immense single-target triage and offensive shadow pressure while mastering the vital 5-Second Mana Regeneration rule.

### The 5-Second Rule & Spirit Regeneration
After casting a mana-spending spell, spirit-based mana regeneration pauses for **5 seconds**.
💡 **Pro-Tip:** Pre-shield with *Power Word: Shield*, apply *Shadow Word: Pain*, cast one *Smite*, and immediately switch to auto-wand attack! Your mana will regenerate at full speed for the remainder of the encounter.

---

### Level 30 Wand Progression

| Wand | Item Level | DPS | How to Acquire |
| **Gravestone Scepter** | iLvl 29 | **29.0 DPS** | Blackfathom Deeps Quest (*Blackfathom Villainy*) |
| **Excavation Rod** | iLvl 28 | 24.5 DPS | Excavation Site 4 Questline |
| **Greater Magic Wand** | iLvl 18 | 17.5 DPS | Crafted by Enchanters (Skill 75) |

---

### Healing Downranking Efficiency Chart

| Spell & Rank | Mana | Cast Time | Base Heal | HPM |
| **Flash Heal Rank 1** | 125 | 1.5s | 193–237 | 1.72 |
| **Flash Heal Rank 2** | 155 | 1.5s | 258–314 | 1.84 |
| **Heal Rank 1** | 155 | 3.0s | 295–341 | **2.05** |
| **Heal Rank 2** | 205 | 3.0s | 429–491 | **2.24** |
| **Renew Rank 4** | 135 | Instant | 245 over 15s | 1.81 |

• In dungeons, keep Heal Rank 1 as your bread-and-butter tank maintenance spell. Reserve Flash Heal Rank 2 for emergency saves!`
    },
    {
      id: "guide-class-shaman",
      title: "Shaman Level 30 Guide: 2H Enhancement, Totem Twisting & Tanking Shaman",
      category: "Classes & Pets",
      source: "Wowhead · Warcraft Tavern · Classic+",
      icon: "https://render.worldofwarcraft.com/us/icons/56/spell_nature_windfury.jpg",
      summary: "Rockbiter vs Windfury mathematical comparisons, Two-Handed weapon proc bursts, Molten Blast AoE threat, and Mana Spring totem twisting.",
      content: `### Elemental Fury & Enhancement Devastation
Shamans channel primal elements into bone-crushing melee swings, high-potency group totems, and the new Classic+ Earth Warden tanking stance.

### Enhancement 2-Handed Burst vs Rockbiter

| Weapon Imbue | Effect | Best Use Case |
| **Rockbiter Weapon III** | Adds +110 Attack Power and high threat per hit | Tanking dungeons & consistent leveling damage |
| **Windfury Weapon I (Lvl 30)** | 20% chance to grant 2 extra attacks with bonus AP | PvP 1-shot RNG spikes & slow Two-Handers |
| **Flametongue Weapon II** | Adds flat Fire damage based on weapon speed | Fast 1-handed daggers/maces |

---

### Raid-Wide Totem Architecture (No Twisting Required)
In WoW Forever Build 1.60.1.70425, the legacy 10-second "totem twisting" chore has been permanently retired:
• **Raid-Wide Range (40 Yards):** All core elemental totems reach the entire 40-player raid or 5-man dungeon group within a 40-yard radius.
• **Non-Exclusive Air Element Harmony:** **Windfury Totem** and **Grace of Air Totem** are non-exclusive; Windfury applies an instant extra-attack imbue aura while Grace of Air provides +Agility. Shamans no longer need to burn 300 mana every 9 seconds to alternate Air totems.
• Plant your totems once, reposition only when moving encounters, and direct your active mana toward Shocks, Chain Heals, and Lava Bursts!

---

### Classic+ Shaman Tanking Primer
• Equip a high-armor shield like *Petrified Bark Shield* (Gesharahan, Barrens).
• Imbue main hand with **Rockbiter Weapon** for 150% threat generation.
• Use **Earth Shock Rank 3** on cooldown to maintain aggressive boss snap threat!`
    },
    {
      id: "guide-class-warlock",
      title: "Warlock Level 30 Guide: Affliction Drain Tanking & Soul Engine",
      category: "Classes & Pets",
      source: "Wowhead · Warcraft Tavern · Classic+",
      icon: "https://render.worldofwarcraft.com/us/icons/56/spell_shadow_haunting.jpg",
      summary: "Siphon Life + Drain Life perpetual motion tanking, Life Tap mana conversions, Soul Shard bag management, and Voidwalker Sacrifice shields.",
      content: `### The Dark Arts of Infinite Sustain
Warlocks in WoW Forever turn health into mana and mana into dead enemies with near-zero downtime, using Affliction drain loops and versatile demonic companions.

### Affliction Drain Tanking Loop (Level 30)

1. **Curse of Agony Rank 3:** Applied at pull (deals 324 Shadow damage over 24s).
2. **Corruption Rank 4:** Cast instant via *Nightfall* or 2.0s cast (deals 240 Shadow damage).
3. **Siphon Life Rank 1 (Level 30 Capstone):** Drains 15 health per second, healing the Warlock.
4. **Drain Life Rank 2:** Channels 29 health per second directly into your health pool.
5. **Life Tap Rank 2:** Converts surplus health into full mana bars.

💡 **Zero Downtime:** Because your spells heal you for more damage than you take, you never need to drink water or eat food while leveling 1 to 30!

---

### Demon Utility Matrix

| Demon | When to Summon | Signature Power |
| **Imp** | Dungeon DPS groups | Blood Pact (+15 Stamina to entire party), Firebolt |
| **Voidwalker** | Solo leveling & PvP defense | Sacrifice (Grants 505 damage absorption shield) |
| **Succubus** | World PvP & humanoid duels | Seduction (Charms humanoid target for 15 seconds) |
| **Felhunter (Lvl 30)** | Caster duels & Mage counters | Spell Lock (Counterspell silence) & Devour Magic |`
    },
    {
      id: "guide-weapon-class-quests",
      title: "Legendary Classic+ Weapon & Class Quests Compendium (Lvl 10–30)",
      category: "Leveling & Quests",
      source: "Wowhead · Warcraft Tavern · Classic+",
      icon: "https://render.worldofwarcraft.com/us/icons/56/inv_sword_27.jpg",
      summary: "Quest step roadmaps for Whirlwind Axe, Verigan's Fist, Crescent Staff, Fire Totem, Voidwalker Summoning, and Gravestone Scepter.",
      content: `### Iconic Class Quests That Define Classic Progression
Every class possesses signature rite-of-passage questlines between levels 10 and 30 that award game-changing weapons, defensive stances, and class mounts.

### Top Level 20–30 Class Weapon Rewards

| Questline | Class | Level Req | Key Reward | Stats & Power |
| **The Whirlwind Weapon** | Warrior | Lvl 30 | **Whirlwind Axe** | 2H Axe: 35.3 DPS, +15 Str, +14 Sta (BiS through Level 42!) |
| **The Test of Righteousness** | Paladin | Lvl 20 | **Verigan's Fist** | 2H Mace: 21.6 DPS, +6 Sta, +6 Int, +12 Attack Power |
| **Leaders of the Fang** | All Classes | Lvl 18 | **Crescent Staff** | 2H Staff: 20.3 DPS, +7 Int, +7 Spi, +7 Sta (or Wingblade) |
| **Blackfathom Villainy** | All Classes | Lvl 24 | **Gravestone Scepter** | Wand: 29.0 DPS, Shadow Damage |

---

### Whirlwind Axe Quest Roadmap (Level 30 Warrior)
🗺️ **Start:** Fray Island off Ratchet coast (*Klannoc Macleod*).
• **Step 1:** Speak with Bath'rah the Windwatcher in Alterac Mountains (\`80.4, 67.0\`).
• **Step 2:** Gather 8x Bloodscalp Tusks (Stranglethorn), 30x Bloodstone Ore (Arathi), and Charred Necrolyte Charms.
• **Step 3:** Collect 1x Thundering Charm, 1x Burning Charm, and 1x Cresting Charm from Arathi elementals.
• **Step 4:** Defeat **Cyclonian** (Level 40 Elite Wind Elemental). Bring a Level 30 party or guild assistance to secure your Whirlwind Axe!`
    },
    {
      id: "guide-rested-xp-stacking",
      title: "Rested XP & Tent Stacking Deep Dive (+200% Leveling Surge)",
      category: "Leveling & Quests",
      source: "Wowhead · Warcraft Tavern · Classic+",
      icon: "https://render.worldofwarcraft.com/us/icons/56/spell_nature_sleep.jpg",
      summary: "Stacking the Cozy Sleeping Bag, Tier 2/3 Camping Tents, and Capital City Inns for 200% rested generation and Student Fodder optimization.",
      content: `### The Science of Accelerated Leveling
In WoW Forever, Rested Experience is a deeply customizable system rather than a passive waiting game. By combining tradeskill camping shelters with field artifacts, rested bars fill in minutes.

### Rested XP Acceleration Tiers

| Resting Environment | Rested Rate | Time to Earn 1 Full Level Rested |
| **Standard Wilderness** | 1x (Base) | 160 Hours (Nearly 7 days) |
| **Capital City Inn** | 4x | 40 Hours |
| **Tier 1 Lean-to Shelter** | 6x (+50% Inn) | 26 Hours |
| **Tier 2 Linen Tent** | 8x (+100% Inn) | 20 Hours |
| **Tier 3 Silk Pavilion** | **12x (+200% Inn)** | **13.3 Hours** |
| **Cozy Sleeping Bag in Silk Tent** | **24x Surge** | **6.6 Hours (Converts 8 hrs rest in 45 mins!)** |

---

### Student Fodder Rules
• Awarded during Steps 3 and 5 of the Cozy Sleeping Bag questline (total of 12 charges).
• Consuming 1 **Student Fodder** instantly grants **4 bars (20%) of Rested Experience**!
💡 **Optimal Strategy:** Save your Student Fodder for levels 28 and 29 where raw monster experience is at its highest per bar!`
    },
    {
      id: "guide-blackfathom-deeps",
      title: "Blackfathom Deeps & Wailing Caverns: Classic+ Dungeon Primers",
      category: "Dungeons & Raids",
      source: "Wowhead · Warcraft Tavern · Classic+",
      icon: "https://render.worldofwarcraft.com/us/icons/56/spell_shadow_shadowbolt.jpg",
      summary: "Twilight Lord Kelris shadow resistance tricks, Aku'mai cleansing mechanics, Wailing Caverns Fang set farming routes, and quest turn-ins.",
      content: `### Conquering the Iconic Early Dungeons
Blackfathom Deeps (Ashenvale coast) and Wailing Caverns (Northern Barrens) form the core progression stepping stones between levels 18 and 28 in WoW Forever.

### Blackfathom Deeps (Level 24–28)
• **Location:** Zoram Strand, Ashenvale (\`14.4, 14.2\`).
• **Key Encounters:**
  - **Ghamoo-ra:** Giant turtle with massive armor. Armor debuffs (Sunder Armor, Faerie Fire) accelerate this fight significantly.
  - **Twilight Lord Kelris:** Casts *Mind Blast* and *Sleep*. Keep Shadow Resistance up or burst him before sleep cycles cycle through your healer.
  - **Aku'mai (Hydra End-Boss):** Casts Poison Cloud and Frenzy. Tank face away from the party.
• **Premier Loot:** *Strike of the Hydra* (2H Sword: 24.2 DPS), *Tortoise Armor* (Shield), *Reef Axe*.

---

### Wailing Caverns (Level 18–22)
• **Leaders of the Fang:** Slay Lord Cobrahn, Lady Anacondra, Lord Pythas, and Lord Serpentis to trigger the Disciple of Naralex ritual.
• **Secret Fang Set:** Defeating all 4 bosses gives Druids the complete pieces for the **Embrace of the Viper** set, unlocking **Snake Form**!`
    },
    {
      id: "guide-shadowfang-deadmines",
      title: "Shadowfang Keep & The Deadmines: Overhauled Encounters & Pre-BiS",
      category: "Dungeons & Raids",
      source: "Wowhead · Warcraft Tavern · Classic+",
      icon: "https://wow.zamimg.com/images/wow/icons/large/inv_ammo_bullet_01.jpg",
      summary: "Commander Springvale unholy shielding, Archmage Arugal teleport skips, Defias Gunpowder logistics, and Edwin VanCleef add management.",
      content: `### The Kings of Vanilla Dungeons Overhauled
Shadowfang Keep (Silverpine Forest) and The Deadmines (Westfall) have received updated boss tactics and improved itemization in WoW Forever.

### Shadowfang Keep (Level 22–26)
• **Commander Springvale:** Casts *Unholy Shield* which reflects spell damage. Casters stop casting when purple runes circle his armor.
• **Baron Silverlaine:** Debuffs party healing taken by 50%. Triage tank health before pulling. Drops *Blade of Silverlaine* (used in the Battle Mage Coldflame Saber forge!).
• **Archmage Arugal:** Teleports along high parapets and casts *Void Bolt* (heavy shadow damage). Line of sight behind the large pillars when targeted!
• **Notable Pre-BiS:** *Meteor Shard* (Dagger), *Arugal's Robes* (+10 Int, +10 Spi, +3 Sta), *Commander's Crest* (Shield).

---

### The Deadmines (Level 18–22)
• **Rhahk'Zor & Sneed:** Clear surrounding goblin engineers before pulling. Sneed ejects from his shredder at 0% HP with rapid melee strikes.
• **Gilnid & The Smelter:** Dodge molten slag pools.
• **Edwin VanCleef:** Spawns two stealthed Defias Blackguards at 50% HP. Tank pick up adds immediately with Thunder Clap / Righteous Defense.
• **Notable Pre-BiS:** *Cruel Barb* (1H Sword 16.7 DPS), *Smite's Mighty Hammer* (2H Mace), *Cape of the Brotherhood*.`
    },
    {
      id: "guide-professions-1-225",
      title: "Artisan Professions Fast-Leveling Guide (1–225 Routes & Material Budgets)",
      category: "Economy & Professions",
      source: "Wowhead · Warcraft Tavern · Classic+",
      icon: "https://render.worldofwarcraft.com/us/icons/56/trade_blacksmithing.jpg",
      summary: "Most cost-efficient 1 to 225 crafting paths for Alchemy, Blacksmithing, Engineering, Leatherworking, and Tailoring at the Level 30 cap.",
      content: `### Maximizing Crafting Power at the Level 30 Cap
In Closed Beta Phase 2, professions are capped at **Expert 225**. Crafting high-tier blue gear gives players a massive statistical edge in dungeons and PvP duels.

### Fast 1–225 Recipe Paths

#### Alchemy (1–225)
• **1–60:** Minor Healing Potion (Peacebloom + Silverleaf).
• **60–110:** Lesser Healing Potion (Minor Healing + Briarthorn).
• **110–140:** Healing Potion (Bruiseweed + Briarthorn).
• **140–185:** Greater Healing Potion (Liferoot + Kingsblood).
• **185–225:** Elixir of Agility & Superior Healing Potion (Goldthorn + Sungrass).

#### Blacksmithing (1–225)
• **1–75:** Rough Sharpening Stones & Rough Grinding Stones.
• **75–125:** Coarse Grinding Stones & Runed Copper Belt.
• **125–160:** Heavy Grinding Stones & Patterned Bronze Bracers.
• **160–200:** Solid Grinding Stones & Green Iron Hauberk.
• **200–225:** Golden Scale Bracers & Steel Breastplate.

#### Tailoring (1–225)
• **1–75:** Bolt of Linen Cloth & Linen Belt.
• **75–105:** Bolt of Woolen Cloth & Woolen Boots.
• **105–145:** Bolt of Silk Cloth & Azure Silk Hood.
• **145–225:** Silk Headband & Crimson Silk Vest.`
    },
    {
      id: "guide-supply-crates-rep",
      title: "Supply Crate Rep Farming & Turn-In Mathematics (ACA & Durotar Logistics)",
      category: "Economy & Professions",
      source: "Wowhead · Warcraft Tavern · Classic+",
      icon: "https://render.worldofwarcraft.com/us/icons/56/inv_crate_03.jpg",
      summary: "Crate size tiers, humanoid drop chances in Hillsbrad and The Barrens, profit margins per filled crate, and fast Friendly/Honored routes.",
      content: `### The Merchant's Favor Logistics Engine
Supply Crates represent one of the most lucrative and consistent gold-and-reputation mechanics in WoW Forever, rewarding players who keep trade goods prepared.

### Supply Crate Tiers & Rewards

| Crate Tier | Drop Monster Level | Required Materials | Reward (Favor + Gold) |
| **Small Waylaid Crate** | Level 10–18 | 20x Rough Stone / 12x Peacebloom | 150 Favor + 75 Silver |
| **Medium Waylaid Crate** | Level 18–25 | 10x Medium Leather / 8x Healing Potion | 350 Favor + 1 Gold 50 Silver |
| **Large Heavy Crate** | Level 25–32 | 15x Heavy Leather / 10x Iron Bar | **600 Favor + 3 Gold** |

---

### Best Crate Farming Hotspots

🗺️ **Hillsbrad Foothills Syndicate Camps (\`52.4, 44.8\`):** High humanoid density with fast 90-second respawns. Dropping Large Waylaid Crates and Silk Cloth simultaneously.
🗺️ **Wetlands Dragonmaw Encampments (\`47.0, 56.0\`):** Excellent source of Medium and Large crates plus Heavy Leather for skinners.
🗺️ **Southern Barrens Bael Modan Excavation (\`49.0, 84.0\`):** Dwarven miners with high drop rates on mineral crates.`
    },
    {
      id: "guide-legacy-talents",
      title: "Legacy Discovery System & Extra Talent Points (+5 Bonus Blueprint)",
      category: "Exploration & Secrets",
      source: "Wowhead · Classic+ · Method.gg",
      icon: "https://wow.zamimg.com/images/wow/icons/large/achievement_dungeon_classicdungeonmaster.jpg",
      summary: "How to complete the 65 Legacy Challenges to unlock +2 to +5 additional talent points beyond the level 30 cap before launch.",
      content: `### Shattering the Conventional Talent Ceiling
In WoW Forever, character progression extends beyond simple monster killing. The **Legacy Discovery System** tracks 65 world challenges that award bonus talent points!

### How to Unlock the +5 Extra Talent Points at Level 30

| Milestone | Points Earned | Challenges Required | Key Feat |
| **Discovery Milestone 1** | **+1 Talent Point** | 10 Legacy Challenges | Uncover all 10 Stormwind or Orgrimmar hidden relics |
| **Discovery Milestone 2** | **+1 Talent Point** | 20 Legacy Challenges | Slay 15 distinct World Rares |
| **Discovery Milestone 3** | **+1 Talent Point** | 35 Legacy Challenges | Complete 40 Library Manuscripts achievement |
| **Discovery Milestone 4** | **+1 Talent Point** | 50 Legacy Challenges | Achieve Friendly with Azeroth Commerce Authority |
| **Discovery Milestone 5** | **+1 Talent Point** | 65 Legacy Challenges | Clear all 4 Closed Beta dungeons on challenge timer |

💡 **Result:** Instead of the baseline 21 talent points at Level 30, a dedicated player can enter Closed Beta Phase 2 with **up to 26 Talent Points**, unlocking hybrid capstones that opponents cannot match!`
    },
    {
      id: "guide-racials-overhaul",
      title: "Classic+ Racials & Heritage Traits Overhaul (All 8 Races + Skyborne)",
      category: "Classes & Pets",
      source: "Wowhead · Method.gg · Classic+",
      icon: "https://render.worldofwarcraft.com/us/icons/56/achievement_character_orc_male.jpg",
      summary: "Complete statistical breakdown of overhauled racials: Will of the Forsaken, Stoneform, Perception, Escape Artist, and new Skyborne wind traits.",
      content: `### Balanced Racial Traits for Classic+
WoW Forever re-evaluates vanilla racials to eliminate extreme faction imbalances while giving every race distinct combat identity in both PvE raids and PvP arenas.

### Racial Abilities Master Breakdown

| Race | Key Active Racial | Signature Passive | Top Class Synergy |
| **Human** | **Perception:** Increases stealth detection for 20s | The Human Spirit (+5% Spirit), Ruthless (+2% Crit) | Priest, Paladin, Warrior |
| **Orc** | **Blood Fury:** +10% AP & SP (3m CD) • Shatter Curse | Hardiness (-20% Stun), Savage (+1% Crit) | Warlock, Hunter, Warrior, Mage |
| **Undead** | **Will of the Forsaken:** Dispels Charm, Fear, Sleep | Cannibalize, Touch of the Grave (Health drain proc) | Mage, Rogue, Priest, Paladin |
| **Night Elf** | **Shadowmeld:** Gain Stealth while immobile | Quickness (+1% Dodge, +2% Speed - stacks), Wisp Spirit | Druid, Hunter, Rogue |
| **Dwarf** | **Stoneform:** Dispels Bleed, Poison, Disease; Physical reduction | Earth Fury (+2% Crit Dmg/Heal), Big Game Hunter | Priest, Paladin, Hunter, Warrior |
| **Gnome** | **Escape Artist:** Snare dispel • Eureka! (+10% Dmg/Heal/PW:S) | Expansive Mind (+5% Resource), Engineering Spec | Mage, Warlock, Rogue, Priest |
| **Tauren** | **War Stomp:** 2s AoE stun (90s CD) • Cultivation (15m CD) | Endurance (+5% HP, +2% Crit Dmg/Heal), Plainsrunning (+3% Mount Speed) | Shaman, Druid, Warrior |
| **Troll** | **Berserking:** +10% Attack/Casting speed • Rapid Regen | Beast Slaying (+5% Dmg), Regeneration (+20% Regen) | Hunter, Shaman, Mage, Priest, Warlock |
| **The Skyborne** | **Walk on Air:** 10s Glide (90s CD) • Read Leyline (Castable moving) | Wind Blessed (+3% Haste), Elemental Insight | Mage, Priest, Hunter, Rogue, Warrior, Shaman |`
    },
    {
      id: "guide-dwarf-shaman-totems",
      title: "Alliance Dwarf Shaman: Complete Earth, Fire, Water & Air Totem Quest Guide",
      category: "Classes & Pets",
      source: "Wowhead · Warcraft Tavern · Classic+",
      icon: "https://render.worldofwarcraft.com/us/icons/56/spell_nature_strengthofearthtotem02.jpg",
      summary: "Step-by-step quest walkthrough for Alliance Dwarf Shamans acquiring Earth (Kharanos), Fire (Gol'Bolar Quarry), Water (Loch Modan / Wetlands), and Air (Aerie Peak) totems.",
      content: `### Awakening the Mountain Elements
In WoW Forever, Dwarves draw upon Wildhammer stormcallers and Bronzebeard geomancers to bond with the primal elemental forces of Khaz Modan. Alliance Dwarf Shamans obtain their four elemental totems through a dedicated series of mountain trials across Dun Morogh, Loch Modan, Wetlands, and the Hinterlands.

### 1. Earth Totem (Level 4: Dun Morogh)
• **Starting NPC:** Tonn Stonehorn near the dwarven fire pit in Kharanos.
• **Quest Line:** *Call of Earth* (Dun Morogh)
• **Objective:** Travel east to the Shimmer Ridge frostmane wendigo cavern [68, 54]. Defeat Frostmane geomancers to recover 2 **Rough Earth Stones**.
• **Trial:** Bring the stones to the **Shrine of the Earth** nestled high in the Ironforge foothills above Kharanos. Drink the Earth Sap to commune with the Mountain Elemental spirit.
• **Reward:** **Earth Totem** relic item, granting access to Stoneskin Totem and Strength of Earth Totem!

---

### 2. Fire Totem (Level 10: Gol'Bolar Quarry)
• **Starting NPC:** Kran Stonehoof at the High Seat in Ironforge [42, 28].
• **Quest Line:** *Call of Fire* (Khaz Modan)
• **Objective:** Travel southeast of Kharanos to **Gol'Bolar Quarry** [69, 56]. Descend into the excavated subterranean shaft where blazing fire elementals have breached the rockface.
• **Trial:** Slay Fire Tar Elementals for 3 **Searing Slag** and collect a **Firepitch Reagent** from the quarry foreman's supply crate. Return to the Peak of Fire brazier above the quarry to summon and defeat the Fire Spirit.
• **Reward:** **Fire Totem** relic item, unlocking Searing Totem and Fire Nova!

---

### 3. Water Totem (Level 20: Loch Modan & Wetlands)
• **Starting NPC:** Branwyn Steelforge outside Ironforge Gates [53, 35].
• **Quest Line:** *Call of Water: The Pure Mountain Springs*
• **Phase A (Loch Modan):** Travel to Farstrider Lodge [82, 63] in eastern Loch Modan. Speak to Master Huntsman Torvald to obtain an enchanted Dwarven Water Canteen.
• **Phase B (Wetlands):** Proceed north into Wetlands. Slay Tide-Risen Crabs and Marsh Elementals near the Menethil Coast [14, 52] to gather 5 **Droplets of Primal Brine**.
• **Trial:** Climb to the peak overlooking the Greenwarden's Grove [59, 41] to reach the **Shrine of Pure Water**. Pour the purified brine into the basin and defeat the Corrupted Water Elemental.
• **Reward:** **Water Totem** relic item, granting Healing Stream Totem and Mana Spring Totem!

---

### 4. Air Totem (Level 30: Aerie Peak / Hinterlands Spire)
• **Starting NPC:** High Shaman Grimaxe in Ironforge or Stormfeather Lodge in Wetlands.
• **Quest Line:** *Call of Air: Wildhammer Gryphon's Roar*
• **Objective:** Ascend through the mountain pass into the Hinterlands to **Aerie Peak** [14, 48]. Speak with the Wildhammer Gryphonmaster to receive the feather of Swiftfeather.
• **Trial:** Ascend to the windy precipice of the **Wind Spire** [26, 52]. Cast your communion ritual into the rushing thermal drafts to prove your mastery over the howling storms.
• **Reward:** **Air Totem** relic item, unlocking Windfury Totem and Grace of Air Totem!

💡 **Forever Advantage:** Totems are automatically assigned to your dedicated Relic interface slot, freeing up 4 permanent bag inventory spaces compared to Classic Era!`
    },
    {
      id: "guide-mage-comprehension-scrolls",
      title: "Mage Arcane Comprehension Scrolls & Leyline Focus Attunement Guide",
      category: "Exploration & Secrets",
      source: "Wowhead · Warcraft Tavern · Classic+",
      icon: "https://render.worldofwarcraft.com/us/icons/56/inv_scroll_03.jpg",
      summary: "Master guide to acquiring Comprehension Charms, deciphering ancient Arcane Study Scrolls, attuning to regional Leyline Foci, and unlocking spell modifiers.",
      content: `### The Kirin Tor Scholarly Resurgence
In WoW Forever, Mages rediscover the lost arcane methodology of the Highborne and early Dalaran arcanists. By pairing **Comprehension Charms** with ancient regional **Study Scrolls**, Mages decipher arcane cipher glyphs that permanently attune their spells to Azeroth's leyline network.

### 1. Acquiring Comprehension Charms
• **Reagent Vendors & Trainers:** Comprehension Charms can be purchased directly from Mage trainers and reagent vendors in Stormwind (Mage Quarter), Ironforge (Hall of Mystery), Orgrimmar (Valley of Spirits), and Undercity (The Magic Quarter) for 7 silver each.
• **Loot Drops:** Defeating Kirin Tor spellweavers, Syndicate conjurers, or Scarlet spellbinders also awards pouches of uncharged charms.

---

### 2. Ancient Study Scrolls & Cipher Drop Locations

| Study Scroll | Zone / Mob Source | Deciphered Knowledge | Primary Benefit |
| **Scroll of Arcane Insight** | Dalaran Wizards (Ambermill, Silverpine) & Defias Enchanters (Westfall) | *Arcane Surge Efficiency* | Reduces mana cost of Arcane Missiles and Arcane Explosion by 12% |
| **Scroll of Cryomancy** | Frostmane Seers (Dun Morogh) & Venture Co. Surveyors (Loch Modan) | *Frost Channeling Attunement* | Frostbolt critical hits refund 25% base mana cost |
| **Scroll of Pyrotechnics** | Dark Iron Incendiaries (Loch Modan) & Burning Blade Fanatics (Durotar) | *Combustion Dynamics* | Extends Fire Blast maximum casting range from 20 to 26 yards |
| **Scroll of Spatial Transit** | Dalaran Undercroft (Alterac) & Tower of Ilgalar (Redridge) | *Blink Momentum* | Blink removes all movement slowing effects and grants +30% run speed for 2 seconds |

---

### 3. Regional Leyline Focus Attunement Sites
To translate advanced Level 25–30 scrolls, a Mage must stand within 15 yards of a humming **Leyline Focus Stone**:
• **Alterac Mountains:** Subterranean conduit below the City of Dalaran purple forcefield [21, 56].
• **Elwynn Forest:** The highest tower room in **The Tower of Azora** [65, 70].
• **Redridge Mountains:** Upper balcony of **Stonewatch Keep** [78, 48].
• **Ashenvale:** The celestial moonwell inside **Astranaar / Silverwind Refuge** [49, 67].
• **Thousand Needles:** The windswept plateau top of **Highperch** [12, 33].

---

### 4. Fast Transcription In-Game Macro
Use this macro to quickly apply your active Comprehension Charm to an unread scroll in your primary inventory bag:
\`\`\`lua
/use Comprehension Charm
/use item:208831
/run print("|cff69ccf0[Arcane Study]|r Deciphering ancient study scroll...")
\`\`\`

💡 **Scholarly Note:** Deciphered scroll traits persist through death, dual-spec swaps, and talent respecs without requiring re-attunement!`
    },
    {
      id: "guide-master-transit-routes",
      title: "Master World Transit & Continental Travel Directory (Boats, Zeppelins, Tram & Ferries)",
      category: "Leveling & Quests",
      source: "WoW Forever Tools · Warcraft Tavern · Classic+",
      icon: "https://render.worldofwarcraft.com/us/icons/56/inv_misc_map_01.jpg",
      summary: "Interactive visual transit map and complete directory of all inter-continental boat routes, Horde zeppelin towers, the Deeprun Tram, and the Zephras Isle charter ferry.",
      content: `### Azeroth Transit & Rapid Travel Map
Navigating between Kalimdor and the Eastern Kingdoms is a critical rite of passage in WoW Forever. This interactive master transit map details all public continental connections, travel times, and connecting hubs.

<div class="transit-map-container" style="background: #070a13; border: 1px solid var(--border-gold); border-radius: 8px; padding: 1rem; margin: 1.25rem 0; box-shadow: 0 8px 30px rgba(0,0,0,0.6);">
<div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
  <span style="font-family: var(--font-heading); font-size: 1.05rem; color: var(--text-gold); font-weight: 700;">🗺️ Azeroth Continental Transit Network (Build 70425)</span>
  <span style="font-size: 0.75rem; color: #94a3b8; background: rgba(255,255,255,0.06); padding: 0.2rem 0.6rem; border-radius: 4px;">Interactive Vector Diagram • Hover routes for transit info</span>
</div>
<svg viewBox="0 0 900 480" width="100%" height="auto" style="display: block; max-width: 100%; border-radius: 6px; background: linear-gradient(180deg, #090e1a 0%, #060810 100%);">
  <defs>
    <filter id="glow-gold" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="3" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
  </defs>

  <!-- Sea Grid / Grid Lines -->
  <line x1="450" y1="20" x2="450" y2="460" stroke="rgba(255,255,255,0.04)" stroke-dasharray="4,4" />
  <line x1="50" y1="240" x2="850" y2="240" stroke="rgba(255,255,255,0.04)" stroke-dasharray="4,4" />

  <!-- Continent Landmass Backdrops -->
  <!-- Kalimdor -->
  <rect x="50" y="30" width="310" height="420" rx="10" fill="rgba(30, 41, 59, 0.35)" stroke="rgba(56, 189, 248, 0.2)" stroke-width="1.5" />
  <text x="70" y="60" fill="#38bdf8" font-size="14" font-weight="800" letter-spacing="2">KALIMDOR</text>

  <!-- Eastern Kingdoms -->
  <rect x="540" y="30" width="310" height="420" rx="10" fill="rgba(30, 41, 59, 0.35)" stroke="rgba(243, 192, 67, 0.2)" stroke-width="1.5" />
  <text x="560" y="60" fill="#facc15" font-size="14" font-weight="800" letter-spacing="2">EASTERN KINGDOMS</text>

  <!-- The Great Sea & Maelstrom -->
  <text x="450" y="140" fill="#475569" font-size="12" font-weight="700" letter-spacing="3" text-anchor="middle">THE GREAT SEA</text>
  <circle cx="450" cy="220" r="36" fill="none" stroke="rgba(56, 189, 248, 0.25)" stroke-width="2" stroke-dasharray="6,4" />
  <circle cx="450" cy="220" r="18" fill="none" stroke="rgba(147, 197, 253, 0.4)" stroke-width="1.5" stroke-dasharray="3,3" />
  <text x="450" y="224" fill="#93c5fd" font-size="10" font-weight="700" text-anchor="middle">MAELSTROM</text>

  <!-- Zephras Isle Hub -->
  <g class="transit-hub" style="cursor: pointer;">
    <title>Zephras Isle: Neutral Phase 1 &amp; 2 Exploration Hub. Charter Ferry terminal to Menethil Harbor &amp; Ratchet.</title>
    <rect x="410" y="305" width="80" height="34" rx="6" fill="#064e3b" stroke="#10b981" stroke-width="1.5" />
    <circle cx="425" cy="322" r="5" fill="#34d399" />
    <text x="435" y="326" fill="#a7f3d0" font-size="11" font-weight="700">Zephras</text>
  </g>

  <!-- TRANSIT ROUTE PATHS -->

  <!-- 1. Alliance Boat: Menethil Harbor <-> Auberdine -->
  <path d="M 620 195 Q 450 110 180 95" fill="none" stroke="#38bdf8" stroke-width="2.5" stroke-dasharray="6,5">
    <title>Alliance Boat: Menethil Harbor (Wetlands) &lt;--&gt; Auberdine (Darkshore). Travel Time: 2m 45s. Free for all Alliance players.</title>
  </path>

  <!-- 2. Alliance Boat: Menethil Harbor <-> Theramore -->
  <path d="M 620 205 Q 480 260 280 320" fill="none" stroke="#38bdf8" stroke-width="2.5" stroke-dasharray="6,5">
    <title>Alliance Boat: Menethil Harbor (Wetlands) &lt;--&gt; Theramore Isle (Dustwallow Marsh). Travel Time: 3m 10s. Direct link to Southern Kalimdor.</title>
  </path>

  <!-- 3. Horde Zeppelin: Brill (Undercity) <-> Orgrimmar -->
  <path d="M 630 110 Q 470 140 280 180" fill="none" stroke="#f87171" stroke-width="2.5" stroke-dasharray="6,4">
    <title>Horde Zeppelin: Brill Tower (Undercity) &lt;--&gt; Orgrimmar Tower (Durotar). Travel Time: 3m 00s. Primary trans-continental Horde artery.</title>
  </path>

  <!-- 4. Horde Zeppelin: Brill <-> Grom'gol (Stranglethorn) -->
  <path d="M 645 120 Q 695 240 645 380" fill="none" stroke="#f87171" stroke-width="2" stroke-dasharray="6,4">
    <title>Horde Zeppelin: Brill Tower (Tirisfal) &lt;--&gt; Grom'gol Base Camp (Stranglethorn). Travel Time: 2m 30s. Rapid access to southern Eastern Kingdoms.</title>
  </path>

  <!-- 5. Horde Zeppelin: Orgrimmar <-> Grom'gol -->
  <path d="M 285 190 Q 450 360 635 385" fill="none" stroke="#f87171" stroke-width="2.5" stroke-dasharray="6,4">
    <title>Horde Zeppelin: Orgrimmar (Durotar) &lt;--&gt; Grom'gol Base Camp (Stranglethorn). Travel Time: 3m 20s. Direct tropical expedition flight.</title>
  </path>

  <!-- 6. Neutral Steamwheedle Boat: Booty Bay <-> Ratchet -->
  <path d="M 640 430 Q 480 380 280 250" fill="none" stroke="#facc15" stroke-width="3" stroke-dasharray="7,5">
    <title>Neutral Steamwheedle Boat: Booty Bay (Stranglethorn) &lt;--&gt; Ratchet (The Barrens). Travel Time: 2m 50s. Neutral vessel connecting cross-faction continents.</title>
  </path>

  <!-- 7. Deeprun Tram: Stormwind City <-> Ironforge -->
  <line x1="645" y1="285" x2="645" y2="235" stroke="#fbbf24" stroke-width="4" stroke-linecap="round">
    <title>Deeprun Tram: Stormwind City (Dwarven District) &lt;--&gt; Ironforge (Tinker Town). Travel Time: 1m 05s. Underground high-speed rail with Bizmo's Aquarium view.</title>
  </line>

  <!-- 8. Zephras Charter Ferry: Menethil Harbor <-> Zephras Isle -->
  <path d="M 620 215 Q 520 280 470 305" fill="none" stroke="#34d399" stroke-width="2.2" stroke-dasharray="5,4">
    <title>Charter Ferry: Menethil Harbor &lt;--&gt; Zephras Isle. Travel Time: 1m 45s. Phase 2 charter ferry service.</title>
  </path>

  <!-- 9. Zephras Charter Ferry: Ratchet <-> Zephras Isle -->
  <path d="M 280 260 Q 360 300 420 315" fill="none" stroke="#34d399" stroke-width="2.2" stroke-dasharray="5,4">
    <title>Charter Ferry: Ratchet &lt;--&gt; Zephras Isle. Travel Time: 1m 55s. Phase 2 charter ferry service.</title>
  </path>

  <!-- STATIONS / PORTS (KALIMDOR) -->
  <!-- Auberdine -->
  <g style="cursor: pointer;">
    <title>Auberdine Pier (Darkshore): Alliance port connecting to Menethil Harbor. Flight path to Teldrassil / Ashenvale.</title>
    <circle cx="170" cy="95" r="7" fill="#0284c7" stroke="#38bdf8" stroke-width="2" />
    <text x="185" y="100" fill="#bae6fd" font-size="12" font-weight="700">Auberdine</text>
  </g>

  <!-- Orgrimmar -->
  <g style="cursor: pointer;">
    <title>Orgrimmar Zeppelin Tower (Durotar): Horde flight tower connecting to Brill and Grom'gol.</title>
    <circle cx="270" cy="180" r="7" fill="#b91c1c" stroke="#f87171" stroke-width="2" />
    <text x="180" y="185" fill="#fca5a5" font-size="12" font-weight="700">Orgrimmar</text>
  </g>

  <!-- Ratchet -->
  <g style="cursor: pointer;">
    <title>Ratchet Port (The Barrens): Steamwheedle Cartel dock connecting to Booty Bay and Zephras Isle.</title>
    <circle cx="270" cy="245" r="7" fill="#ca8a04" stroke="#facc15" stroke-width="2" />
    <text x="205" y="250" fill="#fef08a" font-size="12" font-weight="700">Ratchet</text>
  </g>

  <!-- Theramore -->
  <g style="cursor: pointer;">
    <title>Theramore Isle (Dustwallow Marsh): Jaina Proudmoore's citadel dock connecting to Menethil Harbor.</title>
    <circle cx="270" cy="320" r="7" fill="#0284c7" stroke="#38bdf8" stroke-width="2" />
    <text x="180" y="325" fill="#bae6fd" font-size="12" font-weight="700">Theramore</text>
  </g>

  <!-- STATIONS / PORTS (EASTERN KINGDOMS) -->
  <!-- Brill (Undercity) -->
  <g style="cursor: pointer;">
    <title>Brill Zeppelin Towers (Tirisfal Glades): Twin towers connecting to Orgrimmar and Grom'gol Base Camp.</title>
    <circle cx="630" cy="110" r="7" fill="#b91c1c" stroke="#f87171" stroke-width="2" />
    <text x="645" y="115" fill="#fca5a5" font-size="12" font-weight="700">Brill (Undercity)</text>
  </g>

  <!-- Menethil Harbor -->
  <g style="cursor: pointer;">
    <title>Menethil Harbor Pier (Wetlands): Major Alliance maritime hub with ships to Auberdine, Theramore, and Zephras Isle.</title>
    <circle cx="630" cy="205" r="8" fill="#0284c7" stroke="#38bdf8" stroke-width="2" />
    <text x="645" y="210" fill="#bae6fd" font-size="12" font-weight="700">Menethil Harbor</text>
  </g>

  <!-- Ironforge -->
  <g style="cursor: pointer;">
    <title>Ironforge (Dun Morogh): Dwarven capital connected via the high-speed Deeprun Tram to Stormwind City.</title>
    <circle cx="645" cy="240" r="6" fill="#d97706" stroke="#fbbf24" stroke-width="2" />
    <text x="660" y="245" fill="#fef08a" font-size="12" font-weight="700">Ironforge (Tram)</text>
  </g>

  <!-- Stormwind City -->
  <g style="cursor: pointer;">
    <title>Stormwind City (Elwynn Forest): Alliance capital connected via the Deeprun Tram in the Dwarven District.</title>
    <circle cx="645" cy="285" r="6" fill="#d97706" stroke="#fbbf24" stroke-width="2" />
    <text x="660" y="290" fill="#fef08a" font-size="12" font-weight="700">Stormwind (Tram)</text>
  </g>

  <!-- Grom'gol Base Camp -->
  <g style="cursor: pointer;">
    <title>Grom'gol Base Camp (Stranglethorn): Horde jungle outpost with twin zeppelin towers to Orgrimmar and Brill.</title>
    <circle cx="635" cy="380" r="7" fill="#b91c1c" stroke="#f87171" stroke-width="2" />
    <text x="650" y="385" fill="#fca5a5" font-size="12" font-weight="700">Grom'gol</text>
  </g>

  <!-- Booty Bay -->
  <g style="cursor: pointer;">
    <title>Booty Bay (Stranglethorn): Steamwheedle goblin port with boat service to Ratchet.</title>
    <circle cx="640" cy="430" r="7" fill="#ca8a04" stroke="#facc15" stroke-width="2" />
    <text x="655" y="435" fill="#fef08a" font-size="12" font-weight="700">Booty Bay</text>
  </g>
</svg>
<div style="display: flex; gap: 1.25rem; flex-wrap: wrap; justify-content: center; margin-top: 0.75rem; font-size: 0.78rem; color: #cbd5e1;">
  <span style="display: inline-flex; align-items: center; gap: 0.35rem;"><span style="display: inline-block; width: 14px; height: 3px; background: #38bdf8;"></span> Alliance Boat</span>
  <span style="display: inline-flex; align-items: center; gap: 0.35rem;"><span style="display: inline-block; width: 14px; height: 3px; background: #f87171;"></span> Horde Zeppelin</span>
  <span style="display: inline-flex; align-items: center; gap: 0.35rem;"><span style="display: inline-block; width: 14px; height: 3px; background: #facc15;"></span> Neutral Steamwheedle Boat</span>
  <span style="display: inline-flex; align-items: center; gap: 0.35rem;"><span style="display: inline-block; width: 14px; height: 4px; background: #fbbf24;"></span> Deeprun Tram</span>
  <span style="display: inline-flex; align-items: center; gap: 0.35rem;"><span style="display: inline-block; width: 14px; height: 3px; background: #34d399;"></span> Zephras Charter Ferry</span>
</div>
</div>

### Continental Transit Timetable & Connections

| Route | Vehicle Type | Faction | Dock / Tower Coordinates | Transit Duration | Key Destination Zone |
| **Menethil Harbor ⇄ Auberdine** | Transport Ship | Alliance | Wetlands [10, 56] ⇄ Darkshore [32, 43] | 2 min 45 sec | Ashenvale & Teldrassil access |
| **Menethil Harbor ⇄ Theramore** | Transport Ship | Alliance | Wetlands [10, 60] ⇄ Dustwallow [67, 51] | 3 min 10 sec | Southern Kalimdor & Barrens |
| **Brill ⇄ Orgrimmar** | Goblin Zeppelin | Horde | Tirisfal [60, 58] ⇄ Durotar [50, 12] | 3 min 00 sec | Primary cross-continent capital transit |
| **Brill ⇄ Grom'gol** | Goblin Zeppelin | Horde | Tirisfal [61, 59] ⇄ Stranglethorn [32, 28] | 2 min 30 sec | Southern Eastern Kingdoms jungles |
| **Orgrimmar ⇄ Grom'gol** | Goblin Zeppelin | Horde | Durotar [51, 14] ⇄ Stranglethorn [31, 29] | 3 min 20 sec | Direct Kalimdor-to-Stranglethorn line |
| **Booty Bay ⇄ Ratchet** | Steamwheedle Vessel | Neutral | Stranglethorn [25, 73] ⇄ Barrens [63, 38] | 2 min 50 sec | Cross-faction global trading corridor |
| **Stormwind ⇄ Ironforge** | Deeprun Tram | Alliance | SW Dwarven District ⇄ IF Tinker Town | 1 min 05 sec | Instant capital transit with zero flight cost |
| **Menethil / Ratchet ⇄ Zephras** | Charter Ferry | Neutral | Wetlands [11, 58] / Barrens [64, 39] | 1 min 50 sec | Zephras Isle Phase 1/2 exploration hub |

💡 **PvP Survival Tip:** Transport ships and zeppelins feature level 55+ Bruisers and faction guards; starting combat on board flags you for PvP and immediately draws lethal guard aggro.`
    },
    {
      id: "guide-level30-hunter",
      title: "Hunter Level 30 Guide: Beast Mastery vs Marksmanship Specs, Pet Abilities & Level 30 Pre-BiS",
      category: "Classes & Pets",
      source: "Wowhead · Warcraft Tavern · Classic+",
      icon: "https://render.worldofwarcraft.com/us/icons/56/ability_hunter_beastmastery.jpg",
      summary: "Optimal 21-point Beast Mastery and Marksmanship talent builds, Pet Diet & Rank 4 ability training, ammo crafting, and Excavation Site 4 dungeon rotation.",
      content: `### Ranged Supremacy at the Level 30 Cap
In Closed Beta Phase 2, Hunters excel in both solo open-world grinding and group dungeon runs thanks to 21 available talent points, Tier 2 camping stat food buffs, and Rank 4 pet abilities.

### 1. Beast Mastery Leveling Spec (21 Points)
• **Core Focus:** Maximum pet speed, attack power, and aggro generation for zero-downtime solo play.
• **Point Distribution (21/0/0):**
  - **Tier 1:** 5/5 *Endurance Training* (+15% pet health, +5% character health)
  - **Tier 2:** 2/2 *Focused Fire* (+2% damage bonus to special abilities), 3/3 *Improved Aspect of the Monkey* (+6% Dodge chance)
  - **Tier 3:** 1/1 *Bestial Swiftness* (Pet outdoor movement speed +30% — unlocks Intimidation!), 4/5 *Unleashed Fury* (+16% pet damage)
  - **Tier 4:** 5/5 *Ferocity* (+15% pet critical strike chance)
  - **Tier 5 Capstone (Row 5):** 1/1 *Intimidation* (Instant 3s pet stun on 60s CD with massive threat!)

---

### 2. Marksmanship Dungeon & PvP Spec (0/21/0)
• **Core Focus:** Intellect-to-AP scaling, reduced Arcane Shot cooldown, Mortal Shots crit multiplier, and Scatter Shot control.
• **Point Distribution (0/21/0):**
  - **Tier 1:** 5/5 *Lethal Attacks* (+5% ranged critical strike chance)
  - **Tier 2:** 5/5 *Careful Aim* (Increases ranged attack power by 50% of your total Intellect — unlocks Mortal Shots!)
  - **Tier 3:** 5/5 *Improved Arcane Shot* (Reduces Arcane Shot cooldown by 1 sec for rotational rhythm)
  - **Tier 4:** 5/5 *Mortal Shots* (+30% ranged weapon critical strike damage bonus; requires 5/5 Careful Aim)
  - **Tier 5 Capstone (Row 5):** 1/1 *Scatter Shot* (Instant 4s disorientation shot on 30s CD for PvP peel)

---

### 3. Level 30 Pet Family & Ability Matrix

| Pet Family | Signature Skills | Best Wilderness Tame Location | Food Diet | Primary Advantage |
| **Cat (Tiger/Lion)** | Claw 4, Bite 4 | Ridge Stalker (Badlands, L36) or Mountain Lion (Hillsbrad, L24) | Meat, Fish | Highest single-target physical DPS (1.2 Attack Speed) |
| **Wind Serpent** | Lightning Breath 3 | Washte Pawne (Barrens, L25) or Cloud Serpent (Thousand Needles) | Fish, Bread, Cheese | 20-yard ranged Nature burst; completely ignores physical armor |
| **Boar** | Charge 3, Bite 4 | Goretusk (Westfall, L16) or Crag Boar (Loch Modan, L20) | Anything (Meat, Fruit, Bread, Fungus) | Instant 1s root + 50% AP on first hit; trivial to feed |

---

### 4. Level 30 Hunter Pre-BiS Weapon Arsenal
• **Ranged Weapon:** *Galvanic Pulse Rifle* (Excavation Site 4 - Chief Engineer Bilgewater) or *Master Hunter's Rifle* (Stranglethorn Nesingwary chain).
• **Melee Stat Sticks:** 2x *Cruel Barb* (Deadmines - Edwin VanCleef) or *Zephras Cleaver* (+7 Agility, +5 Stamina).
• **Ammo:** Use *Heavy Shot* (Engineered or purchased from specialty ammo quartermasters in Ironforge/Orgrimmar).`
    },
    {
      id: "guide-level30-frost-mage",
      title: "Mage Level 30 Guide: Frost AoE Shatter Grinding & Burst PvP Spec",
      category: "Classes & Pets",
      source: "Wowhead · Warcraft Tavern · Classic+",
      icon: "https://render.worldofwarcraft.com/us/icons/56/spell_frost_frostbolt02.jpg",
      summary: "Level 30 Frost AoE grinding pulls, Frostbite + Shatter 50% crit combos, Blizzard snare kite paths, and mana efficiency rotations for Beta Phase 2.",
      content: `### Master of the Bitter Cold
At the Level 30 cap, Frost Mages dominate open-world leveling speed through controlled Blizzard AoE pulls and achieve unmatched burst lethality in PvP through the iconic **Shatter Combo**.

### 1. Level 30 Frost Shatter Spec (21 Points)
• **Point Distribution (0/0/21):**
  - **Tier 1:** 5/5 *Improved Frostbolt* (Reduces casting time of Frostbolt by 0.5s for rapid missile execution)
  - **Tier 2:** 2/2 *Improved Frost Nova* (Reduces Frost Nova cooldown by 4s), 3/3 *Frostbite* (15% chance to freeze chilled targets for 5s)
  - **Tier 3:** 3/3 *Improved Blizzard* (Blizzard adds up to 65% chill snare for AoE kiting), 1/1 *Ice Lance* (Instant cast dealing 3x damage against frozen targets!), 1/3 *Frost Channeling* (Reduces mana cost of Frost spells by 5%)
  - **Tier 4 Capstones (Row 4):** 3/3 *Shatter* (+50% critical strike chance against frozen targets!), 2/2 *Arctic Reach* (+20% Frost spell range and Blizzard area), 1/1 *Ice Block* (10s total physical/spell immunity)

---

### 2. The Shatter Burst Combo Choreography
Because spell travel time exists in WoW Forever, casting an instant spell immediately after a missile spell applies Shatter to both spells simultaneously:
• **Step 1:** Freeze your opponent with **Frost Nova** or trigger a **Frostbite** proc from Ice Armor.
• **Step 2:** Begin casting **Frostbolt (Rank 5)** (2.6s cast).
• **Step 3:** The split second the Frostbolt leaves your hands, cast **Ice Lance (Rank 1)** or **Fire Blast (Rank 4)** (Instant).
• **Result:** Both spells hit the frozen target within the same millisecond spell batch. Both gain the +50% Shatter crit chance and critical damage bonus, frequently inflicting over 650–850 burst damage in a single GCD!

---

### 3. Level 24–30 AoE Blizzard Grinding Hotspots

| Grinding Location | Target Mobs | Level Range | Kite Strategy |
| **Dagger Hills (Westfall)** | Defias Highwaymen & Trappers | 20–24 | Pull 6–8 melee mobs, Blink backward, channel Blizzard Rank 2, Nova any runners |
| **Dun Garok Outskirts (Hillsbrad)** | Ironforge Dwarves (Horde) / Syndicate (Alliance) | 26–29 | Wide open road for figure-8 Blizzard kiting |
| **Coast of Wetlands** | Bluegill Murlocs (Wetlands) | 24–27 | Clustered camp spawns; pull with Rank 1 Frostbolt, gather with Frost Nova, Blizzard down |
| **Shimmering Flats (Thousand Needles)** | Salt Flats Basilisks & Scorpids | 28–30 | Wide unobstructed flat salt desert with zero tree obstacles |

---

### 4. Phase 2 Mana & Consumable Engine
• Always conjure **Mana Agate** (Restores 280–420 mana on use) before pulling.
• Stack **Tier 2 Silk Tent Rested XP** and consume *Cooked Crab Claws* (+8 Spirit) to maximize passive mana regeneration between Blizzard sweeps.`
    },
    {
      id: "guide-level30-druid",
      title: "Druid Level 30 Guide: Feral Shifting Power, Bear Meatshield & Moonkin Burst",
      category: "Classes & Specs",
      source: "ForeverChanges.pro · Wowhead · Build 1.60.1.70425 Forensics",
      icon: "https://render.worldofwarcraft.com/us/icons/56/classicon_druid.jpg",
      summary: "Master the Level 30 Druid: smooth energy regen, Shifting Power keystone burst, Bear crit-rage scaling, Moonkin shatter armor, and Level 30 Pre-BiS.",
      content: `### Master of the Wild at Level 30
In WoW Forever, Level 30 brings monumental architectural modernization for Druids across Feral, Balance, and Restoration. With the permanent removal of rigid 2.0s energy ticks, the introduction of the **Shifting Power** keystone, and complete disarm immunity, Druids are premier dungeon tanks and versatile burst threats.

### Core Build 1.60.1.70425 Innovations

• **Smooth Energy Regeneration:** Cat Form energy now regenerates in a smooth, continuous flow rather than discrete 2-second ticks, providing fluid combat rhythm.
• **Shifting Power (Feral Tier 3 Keystone):** In Cat Form, instantly converts 55% base mana into 40 Energy on a 45s cooldown. Provides immense sustained DPS during boss burn windows.
• **100% Disarm Immunity:** All shapeshift forms (Cat, Bear, Dire Bear, Travel, Aquatic, Moonkin) are completely immune to Disarm mechanics.
• **Baseline Quality of Life:**
  - **Omen of Clarity:** Learned at Level 20 directly from trainers (costs 0 mana; Clearcasting is not consumed by zero-cost spells).
  - **Nature's Grasp:** Learned at Level 10 baseline and usable reactively in all forms.
  - **Revive:** Standard out-of-combat resurrection spell, permanently solving 5-man dungeon wipes.
• **Faerie Fire (Feral):** Instant ranged armor reduction usable directly in form without resetting your melee swing timer.

---

### Level 30 Specialization Geometry (21 Talent Points)

#### 1. Feral Cat DPS (0/21/0) · Bleed & Energy Engine
• **Point Distribution:** 5/5 *Ferocity*, 5/5 *Feral Aggression*, 3/3 *Sharpened Claws*, 1/1 *Shifting Power*, 2/2 *Blood Frenzy*, 3/3 *Predatory Strikes*, 1/1 *Faerie Fire (Feral)*, 1/1 *Feral Charge*.
• **Rotation & Priority:**
  - **Opener:** Prowl -> Ravage / Shred from behind (Forms are 100% immune to Disarm).
  - **Debuff:** Apply Faerie Fire (Feral) on pull without clipping swing timer -> Rake bleed.
  - **Energy Engine:** Claw to 4–5 Combo Points. When energy dips below 20, trigger **Shifting Power** to gain +40 Energy immediately.
  - **Finisher:** Ferocious Bite with maximum Attack Power scaling from Predatory Strikes.

#### 2. Feral Bear Tank (0/21/0) · The Unstoppable Meatshield
• **Mechanics:** Auto-attack crits generate **+75% Rage**; Swipe scales with **3% total AP**; Growl cooldown reduced to 8s.
• **Defense-to-Armor Conversion:** Every point of Defense rating above defense cap converts directly into bonus Armor, multiplied by Dire Bear Form factor.

#### 3. Balance Moonkin (21/0/0) · Nature & Arcane Weaver
• **Moonkin Form:** Grants +306% armor, +3% spell crit to all party members, and allows casting Innervate/Gift of the Wild without leaving form.
• **Keystones:** 5/5 *Moonglow* (-9% mana cost on Wrath & Starfire), 1/1 *Nature's Grace* (-0.5s casting time on spell crits).

#### 4. Restoration (0/0/21) · Smart Triage
• **Key Talents:** 1/1 *Swiftmend* (Tier 4), 1/1 *Wild Growth* (smart party HoT), 1/1 *Gift of the Earthmother* (reduces Rejuvenation & Swiftmend GCD by 0.5s down to 1.0s).

---

### Level 30 Pre-BiS Gearing Matrix

| Slot | Best-in-Slot Item | Source | Key Stats |
|---|---|---|---|
| **Two-Hand Weapon** | **Manual Crowd Pummeler** | Gnomeregan (Crowd Pummeler 9-60) | 31.5 DPS, 3-charge +50% Attack Speed burst |
| **Two-Hand (Alt)** | **Excavator's Heavy Mallet** | Excavation Site 4 (Wetlands) | 28.4 DPS, +12 Str, +6 Sta |
| **Chest** | **Excavator's Tunic** | Excavation Site 4 (Foreman) | 168 Armor, +10 Agi, +8 Sta, +4 Str |
| **Legs** | **Triprunner Dungarees** | Gnomeregan Quest (*The Grand Betrayal*) | 132 Armor, +18 Agi, +2 Str |
| **Belt** | **Prowler's Leather Belt** | Camping Tanning Rack Craft (Skill 150) | 88 Armor, +8 Agi, +6 Sta, +1% Crit |
| **One-Hand (Resto)** | **Gavel of the Crystal Lake** | Excavation Site 4 | 22.0 DPS, +14 Healing Power, +6 Int |
| **Two-Hand (Boomkin)** | **Rod of the Sleepwalker** | Blackfathom Deeps (Twilight Lord Kelris) | +11 Spell Damage, +7 Int, +5 Spi |

---

### Essential Shifting & Power Macro

\`\`\`lua
#showtooltip Cat Form
/cast [nostance:3] Cat Form
/cast [form:3] Shifting Power
\`\`\`

💡 **Form Weaving Tip:** Furor retains 40 Energy when shifting into Cat Form. Pair this with *Shifting Power* to instantly dump 80 Energy into two rapid Shreds or Bites within 1.5 seconds!`
    },
    {
      id: "guide-darkspear-islands-pvp",
      title: "Darkspear Islands 15v15 Battleground Guide: Base Warfare & Decayless Honor",
      category: "PvP & Tournaments",
      source: "wowforeverguides.com · ForeverChanges.pro · Wowhead",
      icon: "https://render.worldofwarcraft.com/us/icons/56/achievement_zone_dustwallowmarsh.jpg",
      summary: "Master the new 15v15 coastal battleground in the Level 30 queue: 4 capture bases, central Idol carrying mechanics, coastal artillery guns, and decayless Rank 14 progression.",
      content: `### The Premier 15v15 Battleground of WoW Forever
**Darkspear Islands** is the flagship 15v15 objective-based battleground in WoW Forever. Situated in the tropical archipelago off the coast of Dustwallow Marsh and the Barrens, it pits the **Darkspear Raiders** (Horde) directly against the **Theramore Expeditionary Force** (Alliance) in a high-octane battle for 2,000 victory resources.

### Battlefield Geography & 4 Coastal Strongholds

Darkspear Islands features 4 fortress bases arranged in a diamond perimeter around a sunken coral sandbar:

| Stronghold Base | Geographical Position | Tactical Role |
|---|---|---|
| **Ruins of Bal'lal** | Northwest Island | Open ruined ziggurat with wide line-of-sight for ranged casters |
| **Spire of the Loa** | Northeast High Bluff | Elevated overlook controlling the eastern shipping lanes |
| **Darkspear Hold** | Southwest Beachhead | Primary Horde landing dock with fortified stockade walls |
| **Theramore Overlook** | Southeast Bastion | Primary Alliance forward outpost commanding southern artillery |

#### Resource Accumulation Dynamics
Resource points tick every 3 seconds based on total bases firmly controlled:
• **1 Base Controlled:** +5 Resources per tick (~12 min to win)
• **2 Bases Controlled:** +10 Resources per tick (~6 min to win)
• **3 Bases Controlled:** +20 Resources per tick (~3 min to win)
• **4 Bases Controlled (Dominance):** +40 Resources per tick (~90s to victory!)

---

### The Central Relic: Idol of the Wild Gods (+200 Instant Points)

Every 3 minutes, the **Idol of the Wild Gods** manifests on the center sandbar between the islets:
• **Weight of the Loa:** Picking up the Idol grants your character the *Carrying the Loa* aura, reducing movement speed by **15%** and increasing damage taken by **10%** (stacking every 30 seconds).
• **Capture Delivery:** Delivering the Idol to any **fully captured friendly stronghold flag** awards **+200 Instant Victory Points** and grants all friendly players on the map a 45-second *Tidal Vigor* buff (+5% haste).
• **Carrier Protection Protocol:** Feral Druids (immune to disarm and able to shift snares), Protection Paladins with Blessing of Freedom, and Mages with Ice Block make elite escort escorts.

---

### Controllable Coastal Artillery Batteries

On the battlements of **Theramore Overlook** and **Darkspear Hold**, players can mount heavy brass shore cannons:
• **Artillery Shells:** 45-yard trajectory range; deals **400–600 AoE physical damage** and knocks down charging enemy waves for 2 seconds (10s firing cooldown).
• **Counter-Battery Tactic:** Rogues in Stealth and Cat Druids in Prowl can slip behind enemy battery parapets to assassinate gunners before team pushes.

---

### Faction Reputations & Level 30 PvP Rewards

Participating in Darkspear Islands earns reputation with **Darkspear Raiders** (Horde) or **Theramore Expeditionary Force** (Alliance):

| Reputation Standing | Required Points | Signature Level 30 Reward |
|---|---|---|
| **Friendly** | 3,000 Rep | **Darkspear / Theramore Soldier's Cloak** (+6 Stamina, +4 Agility/Intellect) |
| **Honored** | 6,000 Rep | **Signet of the Reef Strider** (Ring: +7 Strength, +7 Stamina) *or* **Band of the Island Skirmisher** (+7 Agi, +7 Sta) |
| **Revered** | 12,000 Rep | **Talisman of Tidal Wrath** (Trinket: +12 Spell Power, Use: Restores 300 Mana) |
| **Exalted** | 21,000 Rep | **Faction Crested Battle-Tabard** + Level 30 Rare PvP Weapon Blueprint |

---

### The Decayless 14-Rank Seasonal Honor Track

WoW Forever completely abolishes the unhealthy 18-hour-a-day bracket stacking and weekly rank decay of vanilla WoW:
• **Milestone Progression:** Reaching Rank 1 (*Scout / Private*) through Rank 14 (*High Warlord / Grand Marshal*) is an objective seasonal progression track. Honor earned is banked permanently until you reach the next rank threshold.
• **Phase 2 Cap (Level 30):** In Phase 2, players can reach up to **Rank 5 (First Sergeant / Master Sergeant)**, unlocking 12-slot PvP battle bags and +10 Stamina rare cloaks without losing a single point on weekly resets!`
    },
    {
      id: "guide-camping-crafting-stations",
      title: "Camping Crafting Stations: Tanning Rack, Spinning Wheel & 122 Outdoor Recipes",
      category: "Economy & Professions",
      source: "data/forever_camping_recipes.json · core-data.js · ForeverChanges.pro",
      icon: "https://render.worldofwarcraft.com/us/icons/56/inv_misc_pelt_wolf_01.jpg",
      summary: "Definitive field guide to deployable profession stations: 122 outdoor-locked Leatherworking and Tailoring recipes, rare dungeon blueprints, group party buffs, and Pristine Leather farming.",
      content: `### The Revolution of Wilderness Crafting
In WoW Forever, crafting is no longer confined to capital city anvils and looms. With the Phase 2 update to the Camping tradeskill, **122 signature high-tier recipes CANNOT be crafted indoors or inside major cities**. They strictly require deploying portable, physical field stations beside an outdoor player campfire!

### 1. The Tanning Rack (Leatherworking Station)

• **Profession Requirement:** Leatherworking (Skill 140+).
• **Blueprint Source:** Rare drop from **Razorclaw the Butcher** in Shadowfang Keep (~1 in 900 drop rate).
• **Deployment Reagents:** 5x Medium Leather, 3x Fine Thread, 2x Simple Wood.
• **Field Duration:** Lasts **15 minutes** in the world (Replaces standard Camp Tent; grants standard tent rest bonuses + 1-hour cooldown).
• **Exclusive Party Aura:** While deployed, all party members within 30 yards gain **+8% Physical Damage Reduction**!

#### Top Tanning Rack Signature Recipes (48 Total)

| Recipe Name | Skill Req | Key Reagents | Item Specification |
|---|---|---|---|
| **Defender's Leather Kilt** | Skill 125 | 12x Med Leather, 4x Cured Med Hide, 8x Pristine Leather, 8x Elixir of Minor Fortitude | 108 Armor, +8 Stamina, +6 Strength |
| **Totemic Leather Leggings** | Skill 125 | 12x Med Leather, 4x Cured Med Hide, 8x Pristine Leather, 8x Sulfuric Acid | 108 Armor, +7 Int, +5 Spi, +6 Nature Spell Dmg |
| **Brawler's Leather Legguards** | Skill 125 | 12x Med Leather, 4x Cured Med Hide, 8x Pristine Leather, 8x Shadowgem | 108 Armor, +8 Agility, +5 Stamina |
| **Trapper's Leather Legguards** | Skill 125 | 12x Med Leather, 4x Cured Med Hide, 8x Pristine Leather, 8x Deviate Scale | 108 Armor, +6 Agi, +6 Sta, +4 Spirit |
| **Prowler's Leather Belt** | Skill 150 | 8x Heavy Leather, 2x Cured Med Hide, 1x Jade | 82 Armor, +7 Agi, +5 Sta, +1% Melee Crit |
| **Wolfshead Helm (Rework)** | Skill 165 | 18x Thick Leather, 2x Thick Wolfhide, 4x Heavy Thread | Reworked for smooth energy: Shifting restores 40 Energy and 15 Rage! |

---

### 2. The Field Spinning Wheel (Tailoring Station)

• **Profession Requirement:** Tailoring (Skill 140+).
• **Blueprint Source:** Dropped by **Unstable Sentinel** in City of Dalaran dungeon.
• **Deployment Reagents:** 5x Bolt of Silk Cloth, 3x Fine Thread, 2x Simple Wood.
• **Field Duration:** Lasts **15 minutes** (Replaces Faction Banner; grants standard rest bonuses + 1-hour cooldown).
• **Exclusive Party Aura:** While deployed, all party members within 30 yards gain **+8% Spirit and +200% accelerated Rested XP gain**!

#### Top Spinning Wheel Signature Recipes (74 Total)

| Recipe Name | Skill Req | Key Reagents | Item Specification |
|---|---|---|---|
| **Pristine Leggings** | Skill 125 | 14x Bolt of Silk, 8x Cerulean Dye, 8x Pristine Leather, 2x Silver Bar, 3x Greater Astral Essence | 62 Armor, +9 Intellect, +7 Stamina, +11 Spell Power |
| **Silky Leggings** | Skill 125 | 14x Bolt of Silk, 8x Cerulean Dye, 8x Spider's Silk, 2x Silver Bar, 3x Greater Astral Essence | 62 Armor, +10 Healing Power, +8 Spirit, +4 Int |
| **Flame Leggings** | Skill 125 | 14x Bolt of Silk, 8x Cerulean Dye, 8x Fire Oil, 2x Silver Bar, 3x Greater Astral Essence | 62 Armor, +14 Fire Spell Damage, +5 Int |
| **Gilded Slippers** | Skill 140 | 8x Bolt of Mageweave, 4x Heavy Silken Thread, 2x Magenta Dye, 2x Gold Bar | 48 Armor, +8 Int, +6 Sta, +7 Spell Power |
| **Gilded Handwraps** | Skill 165 | 12x Bolt of Mageweave, 4x Heavy Silken Thread, 2x Magenta Dye, 4x Gold Bar | 42 Armor, +7 Int, +5 Sta, +9 Spell Power |
| **Gilded Cord** | Skill 190 | 28x Bolt of Mageweave, 6x Magenta Dye, 4x Cerulean Dye, 12x Gold Bar | 52 Armor, +11 Int, +8 Sta, +12 Spell Power |
| **Nethergeld Shoulders** | Skill 195 | 16x Bolt of Mageweave, 4x Magenta Dye, 8x Gold Bar, 2x Greater Nether Essence | 58 Armor, +10 Int, +7 Spi, +14 Spell Power |

---

### 3. Pristine Leather Harvest Mechanics

Notice that many of the most powerful Tanning Rack and Spinning Wheel recipes require **Pristine Leather**:
• **The Harvesting Rule:** Pristine Leather drops exclusively from beasts between **Levels 10 and 25** outside starter zones when skinned by a skinner who is **Level 25 or below**.
• **Top Farming Spots:**
  - *Mudrock Crocolisks & Snapjaws* in Wetlands (\`55.0, 68.0\`).
  - *Ghostpaw Alphas & Stags* in Ashenvale (\`42.0, 60.0\`).
  - *Savannah Patriarchs & Thunderhawks* in The Barrens (\`46.0, 50.0\`).
• **Economic Value:** On the Auction House, a single Pristine Leather commands 35–50 silver due to constant demand from Level 30 BiS crafters!`
    },
    {
      id: "guide-zephras-isle-zone",
      title: "Zephras Isle Field Manual: Skyborne Starting Realm & Airship Transit",
      category: "Leveling & Quests",
      source: "core-data.js · Wowhead · Blizzplanet",
      icon: "https://render.worldofwarcraft.com/us/icons/56/ability_hunter_pet_moth.jpg",
      summary: "Master the Level 1–12 Skyborne starting experience in Skywall: floating settlement hubs, updraft thermal gliding, class trainers, and scheduled skyboat connections to Dalaran and Thunder Bluff.",
      content: `### The Skywall Realm: Starting Realm of the Skyborne
**Zephras Isle** is the breathtaking starting zone (Levels 1–12) for the **Skyborne** race in WoW Forever. Suspended in the upper atmospheric boundaries of Skywall high above Kalimdor, Zephras Isle features crystalline architecture, bioluminescent flora, and aerial navigation mechanics never before seen in Classic.

### Unique Environmental Mechanic: Updraft Thermal Gliding

Throughout the floating plateaus of Zephras Isle, natural elemental vents channel vertical updrafts:
• **Launching Vents:** Stepping into an active cyan updraft launches your character high into the sky, granting a 12-second directional glide buff.
• **Zero Fall Damage:** While traversing between the floating islands of Zephras Isle, fall damage is completely disabled—missed jumps catch updraft safety cushions that deposit you back onto the nearest ledge.
• **Racial Synergy:** Skyborne characters utilize their active racial **Gale Step / Walk on Air** for 10-second directional boosts to access hidden treasure chests atop wind spires.

---

### Settlement Hubs & Leveling Flow (1–12)

The quest flow follows a streamlined U-shaped path across the archipelagos:

#### 1. Thendall Village (Levels 1–6)
• **Arrival:** Awaken in the Celestial Nursery. Complete basic weapon training and unlock your two active racials (*Read Leyline* and *Gale Step*).
• **Key Quest:** *An Echo in the Wind* — Attune with the Ancient Sky Conduit (\`48.2, 72.4\`) to receive your first 6-slot bag and racial crest.

#### 2. Shen'dar Village (Levels 6–10)
• **Settlement:** The agricultural and beast-training capital of the lower isles.
• **Trainers:** Apprentice gathering and production trainers (Herbalism, Skinning, Mining, Alchemy, Tailoring, Leatherworking).
• **Key Quest:** *The Great Outdoors* — Introduction to the secondary Camping tradeskill. Craft your first Lean-to shelter and learn to pitch rest areas.

#### 3. Valanaar, Citadel of the Skies (Levels 10–12)
• **The Capital:** Grand floating citadel housing the Skyborne High Council, Journeyman profession trainers, bank, and class trainers.
• **Faction Alignment:** At Level 10, players complete the *Two Paths Above the Clouds* ceremony, selecting allegiance with **The High Order** (Alliance-aligned) or **The Windshapers** (Horde-aligned).
• **Mount Vendor:** Stablemaster Kaelis teaches apprentice riding and sells the majestic *Galestrider* ground mounts.

---

### Scheduled Skyboat Flight Network (5-Minute Cadence)

To travel between Zephras Isle and the surface continents of Azeroth, two massive arcane airships run scheduled passenger routes every 5 minutes:

| Faction / Route | Zephras Isle Terminal | Continental Destination | Transit Notes |
|---|---|---|---|
| **Alliance (High Order)** | **Valanaar East Skyport** (\`65.9, 83.5\`) | **Dalaran North Dock** (\`12.5, 51.8\`, Hillsbrad/Alterac border) | Direct aerial connection to the Eastern Kingdoms and Dalaran perimeter |
| **Horde (Windshapers)** | **Valanaar West Skyport** (\`57.9, 80.9\`) | **Thunder Bluff Skywatcher Plateau** (\`34.3, 25.8\`, Mulgore) | Direct landing pad beside the Great Lift in central Kalimdor |

💡 **Pro-Tip:** If you miss an airship boarding gate, speak with **Skywarden Elidyr** at the Valanaar central landing. For 10 copper, he summons an elemental gust that launches you directly onto the departing skyboat's deck!`
    },
    {
      id: "guide-dungeon-quests-master-tour",
      title: "Master Dungeon Quest Tour (Levels 13–30): Pre-Quests & Single-Run Routing",
      category: "Leveling & Quests",
      source: "data/forever_dungeons.json · ForeverChanges.pro · Wowhead",
      icon: "https://render.worldofwarcraft.com/us/icons/56/spell_holy_prayerofshadowprotection.jpg",
      summary: "Complete quest directory, prerequisites, and single-run routing for all 12 Phase 2 dungeons. Maximize leveling speed following the Phase 2 dungeon mob XP rebalance.",
      content: `### The Single-Run Questing Meta in WoW Forever
In Phase 2 Beta of WoW Forever, grinding dungeon mobs repeatedly for experience was reduced by ~50% raw mob XP. In its place, Blizzard significantly increased dungeon quest turn-in experience and item rewards. 

**The result is clear:** The most mathematically efficient leveling strategy is to gather every single quest for a dungeon beforehand, execute a single clean full-clear run, and turn in all quests at once!

---

### Master Dungeon Directory & Pre-Quest Map (Levels 13–30)

#### 1. Ragefire Chasm (Levels 13–18) · Orgrimmar Chasm
• **Quests (5 Total):** *Testing an Enemy's Strength* (Rahauro, Thunder Bluff), *Searching for the Lost Sack* (Durotar), *Hidden Enemies* (Thrall, Orgrimmar), *Slaying the Beast* (Neeru Fireblade), *The Power to Destroy* (Varimathras, Undercity).
• **Single-Run Yield:** ~7,400 XP + *Girdle of the Beast* (Mail Belt).

#### 2. Hall of Thanes (Levels 13–18) · Ironforge Mountain Vaults (NEW)
• **Location:** Secret gateway carved into the Ironforge southern mountain wall (4 Bosses).
• **Quests (4 Total):** *The Iron Thane's Mandate* (High Seat, Ironforge), *Excavation Troubles* (Hall of Explorers), *Relics of the First Dwarves*, *Culling the Dark Stone*.
• **Single-Run Yield:** ~8,200 XP + *Thane's Heavy Battle-Plate* (iLvl 22).

#### 3. Ruins of Lordaeron (Levels 15–20) · Tirisfal Crypts (NEW)
• **Location:** Catacombs beneath the broken royal throne room of Lordaeron (7 Bosses).
• **Quests (5 Total):** *Apothecary's Retribution* (Apothecarium, Undercity), *Echoes of the Fall* (Brill), *Purging the Royal Chambers*, *The Scourge Infiltration*.
• **Single-Run Yield:** ~9,800 XP + *Lordaeron Royal Signet* (Ring: +4 Str, +4 Sta).

#### 4. Wailing Caverns (Levels 17–24) · Northern Barrens
• **Quests (6 Total):** *Leaders of the Fang* (Nara Wildmane, Thunder Bluff), *Deviate Hides* (Crossroads), *Smart Drinks* (Ratchet), *The Glowing Shard* (Turn-in at top of mountain eye).
• **Single-Run Yield:** ~12,400 XP + *Leggings of the Fang* (BiS Agility legs).

#### 5. The Deadmines (Levels 17–26) · Moonbrook, Westfall
• **Quests (5 Total):** *The Defias Brotherhood* (Long chain starting in Sentinel Hill), *Red Silk Bandanas*, *Underground Assault* (Dwarf district), *The Unsent Letter* (Drops from VanCleef).
• **Single-Run Yield:** ~14,200 XP + *Chausses of Westfall* / *Tunic of Westfall*.

#### 6. Shadowfang Keep (Levels 22–30) · Silverpine Forest
• **Quests (4 Total):** *Arugal Must Die* (Deth'ryll Terrace), *The Book of Ur* (Undercity Magic Quarter), *Deathstalkers in Shadowfang*.
• **Bonus:** **Razorclaw the Butcher** drops the rare blueprint for the **Camping Tanning Rack** (~1:900).

#### 7. Blackfathom Deeps (Levels 24–32) · Zoram Strand, Ashenvale
• **Quests (6 Total):** *Researching the Corruption* (Auberdine / Sun Rock Retreat), *Blackfathom Villainy* (Bashana Runetotem), *Twilight Falls*, *The Essence of Aku'mai*.
• **Single-Run Yield:** ~15,600 XP + *Rod of the Sleepwalker* / *Tortoise Armor*.

#### 8. The Stockade (Levels 24–32) · Stormwind Canal
• **Quests (6 Total):** *Quell The Uprising*, *The Color of Blood*, *Crime and Punishment*, *What Comes Around...* (All available in Stormwind City).
• **Single-Run Yield:** ~13,500 XP + *Ironspine Ring*.

#### 9. Excavation Site: Wetlands (Levels 26–31) · Dun Modr Outskirts (NEW)
• **Location:** Deep Titan archaeological delve in northeastern Wetlands (4 Bosses).
• **Quests (4 Total):** *Dark Iron Sabotage* (Dun Modr), *Titan Energy Cells* (Whelgar's Camp), *Foreman's Treachery*, *Recovering the Titan Keystone*.
• **Single-Run Yield:** ~16,800 XP + *Excavator's Heavy Mallet* / *Heavehammer*.

#### 10. City of Dalaran: Underbelly (Levels 28–33) · Violet Enclave (NEW)
• **Location:** Underbelly sewer complex and hospital quarantine wing below Dalaran dome (6 Bosses).
• **Quests (5 Total):** *Investigating the Shield* (Ambermill / Southshore), *Contaminated Leyline Residue*, *The Arcane Anomalies*, *The Violet Warden's Seal*.
• **Single-Run Yield:** ~18,500 XP + *Dalaran Caretaker Robes* / *Kirin Tor Battle-Blade*.

#### 11. Gnomeregan (Levels 28–30) · Dun Morogh
• **Quests:** *The Grand Betrayal* (Cleanse Thermaplugg), *Data Rescue*, *Essential Artificials*.
• **Must-Have Drops:** **Triprunner Dungarees** (+18 Agi, +2 Str) and **Manual Crowd Pummeler** (Feral Druid / Ret Paladin BiS weapon).

#### 12. Razorfen Kraul (Levels 28–30) · Southern Barrens
• **Quests (4 Total):** *Blueleaf Tubers* (Ratchet), *Going, Going, Guano* (Thousand Needles), *A Vengeful Fate* (Auld Stonespire).
• **Key Drops:** **Corpsemaker** (Level 29 2H Axe: 28.9 DPS) and **Heart of Agamaggan**.

---

### Step-by-Step Level 25–30 Speedrun Itinerary

1. **Level 25:** Clear Shadowfang Keep (SFK) and turn in all 4 Silverpine/Undercity quests.
2. **Level 26–27:** Grab all 6 BFD quests in Ashenvale; run Blackfathom Deeps in a single clean sweep.
3. **Level 28:** Complete Gnomeregan for *Triprunner Dungarees* and *Manual Crowd Pummeler*.
4. **Level 29:** Clear Excavation Site 4 in Wetlands for weapons and high-armor pre-BiS.
5. **Level 30:** Tackle City of Dalaran (Underbelly) for top-tier caster and melee dungeon loot!`
    }
,
    {
      id: "guide-secret-class-macros",
      title: "The Forbidden Macro Codex: Secret Engine Mechanics & Elite Macros for Every Class",
      category: "Classes & Specs",
      source: "Forever Engine Mechanics · Camelot 12.0 / Classic+",
      icon: "https://render.worldofwarcraft.com/us/icons/56/inv_misc_book_09.jpg",
      summary: "Master compendium of hidden client-engine exploits, hardware batching tricks, zero-loss stance dancing, and elite macros for all 9 classes in WoW Forever.",
      content: `### The Mechanics Mortals Miss: How the WoW Engine Really Evaluates Macros

Most players believe macros are just convenient keybind abbreviations. In the modern Camelot (12.0) engine running Classic+ rulesets, macros are micro-scripts executed sequentially during a single hardware input frame event. Understanding how the client batches these lines unlocks capabilities that separate standard players from elite gladiators and top-tier raiders:

💡 **The Golden Rules of Engine Optimization:**
1. **The '!' Toggle Suppression Prefix:** Prepended to togglable spells (like stealth, auto-shot, or ice block), \`!\` instructs the engine to verify activation without ever toggling the state off if pressed repeatedly.
2. **The Swing-Timer Buffer Problem:** The #1 reason Vanish or Feign Death fails is that a queued melee or ranged white swing fires 20–50ms *after* entering stealth. Issuing \`/stopattack\` immediately before the defensive clears the hardware swing buffer.
3. **Hardware Cursor Injection (@cursor):** Skips the client round-trip targeting reticle for area-of-effect spells (Blizzard, Freezing Trap, Rain of Fire), dropping the ability at the hardware mouse pointer with 0ms latency.
4. **Channel Tick Preservation ([nochanneling]):** Eliminates the devastating 20–33% DPS loss caused by spamming channeled spells (Mind Flay, Drain Soul, Arcane Missiles) before their final damage ticks land.
5. **Target-of-Target Anchor ([@targettarget]):** Allows healers and hybrid casters to interrupt, dispel, or DPS the boss through the tank without ever deselecting friendly raid frames.
6. **Zero-GCD Aura Stripping (/cancelaura):** Instantly drops immunities, shields, or stances to eliminate threat lockout or burst-delay windows.

---

### 1. Warrior: Zero-Loss Stance Dancing & Swing Decoupling

#### A. Zero-Loss Stance & Shield Swap Interrupter
Equips a 1H weapon and Shield and switches to Defensive Stance if in Battle/Berserker stance, or immediately fires Shield Bash if already in Defensive Stance.
\`\`\`
#showtooltip [stance:2] Shield Bash; [stance:1/3] Pummel
/equipslot [nostance:2] 16 YourOneHandWeaponName
/equipslot [nostance:2] 17 YourShieldName
/cast [stance:1/3] Defensive Stance; Shield Bash
/startattack
\`\`\`

#### B. Overpower Stance-Dance Reflex
Instantly switches to Battle Stance upon a dodge proc and executes Overpower without resetting your auto-attack swing timer.
\`\`\`
#showtooltip Overpower
/cast [nostance:1] Battle Stance
/cast Overpower
/startattack
\`\`\`

#### C. Heroic Strike & Cleave Rage De-Coupler
Avoids starving yourself of rage when incoming damage spikes by allowing you to cancel a queued Heroic Strike with Alt.
\`\`\`
#showtooltip Heroic Strike
/cast Heroic Strike
/stopcasting [mod:alt]
/startattack
\`\`\`

#### D. Universal Charge & Intercept Mobility Matrix
Charges if out of combat (shifting to Battle Stance automatically), or switches to Berserker Stance and Intercepts mid-combat.
\`\`\`
#showtooltip [combat] Intercept; Charge
/cast [nocombat,nostance:1] Battle Stance; [nocombat] Charge
/cast [combat,nostance:3] Berserker Stance; [combat] Intercept
/startattack
\`\`\`

---

### 2. Rogue: The Frame-Perfect Pickpocket & Swing-Buffer Vanish

#### A. The 'Greedy Ghost' Instant Pickpocket + Cheap Shot
Exploits the fact that Pick Pocket is off the global cooldown with no animation, looting the humanoid target in the exact millisecond before the stun registers.
\`\`\`
#showtooltip Cheap Shot
/targetenemy [noexists]
/cast Pick Pocket
/cast Cheap Shot
\`\`\`

#### B. The Anti-Auto-Attack Vanish Buffer
Guarantees Vanish sticks by flushing all buffered white-swings before activating stealth.
\`\`\`
#showtooltip Vanish
/stopattack
/cancelaura Attack
/cast Vanish
\`\`\`

#### C. The High-Frequency Stealth Hunter & Sap Radar
Spam this key while stealthed. It automatically targets any enemy player within 20 yards and casts Sap before they render on your screen.
\`\`\`
#showtooltip Sap
/cleartarget
/targetenemyplayer [harm][nodead]
/cast [exists] Sap
\`\`\`

#### D. Gouge & First Aid Combat Triage
Immediately halts melee swings to prevent breaking CC, Gouges the enemy, and begins channeling heavy bandages on yourself.
\`\`\`
#showtooltip Gouge
/cast Gouge
/stopattack
/use [@player] Heavy Silk Bandage
\`\`\`

#### E. Mouseover Blind Peeler
Neutralizes approaching adds or enemy healers without losing your current combo-point target.
\`\`\`
#showtooltip Blind
/cast [@mouseover,harm,nodead][@focus,harm,nodead][] Blind
\`\`\`

---

### 3. Mage: Reticle-Skipping & Hypothermia Guard

#### A. Zero-Latency Reticle-Skip Blizzard / Flamestrike
Bypasses the green circle targeting reticle completely, landing the AoE directly beneath your mouse cursor instantly.
\`\`\`
#showtooltip Blizzard
/stopcasting
/cast [@cursor] Blizzard
\`\`\`

#### B. Double-Tap Safe Ice Block with Alt-Cancel
Prevents accidental double-clicking from immediately deactivating your immunity, while allowing voluntary cancellation with Alt.
\`\`\`
#showtooltip Ice Block
/stopcasting
/cast !Ice Block
/cancelaura [mod:alt] Ice Block
\`\`\`

#### C. Omni-Interrupt Mouseover & Focus Counterspell
Aborts your current fireball or frostbolt cast and interrupts the priority target under your mouse or focus frame without losing your DPS target.
\`\`\`
#showtooltip Counterspell
/stopcasting
/cast [@mouseover,harm,nodead][@focus,harm,nodead][] Counterspell
\`\`\`

#### D. Arcane Power + Presence of Mind Instant Pyroblast
Fires off-GCD Arcane Power, triggers instant-cast Presence of Mind, and launches a Pyroblast in 0.0 seconds.
\`\`\`
#showtooltip Pyroblast
/cast Arcane Power
/cast Presence of Mind
/cast Pyroblast
\`\`\`

---

### 4. Hunter: The 1-Tap Trap Batch & Clipless Auto-Shot

#### A. The Unbroken 1-Tap 'Feign Death + Freeze Trap'
Forces your pet to passive to break threat, cancels queued shots, drops combat with Feign Death, and arms Freezing Trap at your cursor in one motion.
\`\`\`
#showtooltip Freezing Trap
/petpassive
/stopattack
/cast Feign Death
/cast [@cursor] Freezing Trap
\`\`\`

#### B. The Clipless Auto-Shot Stutter-Step Engine
Prevents spamming Aimed Shot or Multi-Shot from canceling your auto-shot cadence.
\`\`\`
#showtooltip Aimed Shot
/cast !Auto Shot
/cast Aimed Shot
\`\`\`

#### C. Mouseover Scatter Shot Peeler
Disorients an approaching enemy melee or casting add without dropping focus on your marked target.
\`\`\`
#showtooltip Scatter Shot
/cast [@mouseover,harm,nodead][@focus,harm,nodead][] Scatter Shot
\`\`\`

#### D. Instant Pet Dash & Bite Micro-Anchor
Commands your pet to sprint and bite your mouseover target instantly without waiting for the server's pet AI polling tick.
\`\`\`
#showtooltip Dash
/petattack [@mouseover,harm,nodead][]
/cast Dash
/cast Dive
/cast Bite
\`\`\`

---

### 5. Priest: Tick-Preserving Channels & Tank-Anchored Dispels

#### A. The Clipless Mind Flay Tick-Preserver
Locks out button spam while Mind Flay is channeling, ensuring you never clip the third and final damage tick early.
\`\`\`
#showtooltip Mind Flay
/cast [nochanneling:Mind Flay] Mind Flay
\`\`\`

#### B. Target-of-Target Offensive Dispel & Dotting
Keeps your healing target focused on the friendly tank while dispelling enemy buffs or applying Shadow Word: Pain to whatever the tank is fighting.
\`\`\`
#showtooltip Dispel Magic
/cast [@mouseover,harm,nodead][@targettarget,harm,nodead][harm,nodead] Dispel Magic
\`\`\`

#### C. Night Elf Shadowmeld + Drink Stealth Reset
Drops combat, enters stealth, and begins drinking mana water without breaking Shadowmeld.
\`\`\`
#showtooltip Morning Glory Dew
/cast !Shadowmeld
/use Morning Glory Dew
\`\`\`

#### D. Emergency Desperate Prayer & Healthstone Panic Matrix
Instant clutch survival macro combining racial instant heal, highest-tier healthstone, and Inner Fire re-application.
\`\`\`
#showtooltip Desperate Prayer
/use Master Healthstone
/cast Desperate Prayer
/cast [nostance] Inner Fire
\`\`\`

---

### 6. Paladin: Bubble-Taunt Bleed Cleansing & Seal Weaving

#### A. Zero-Threat-Drop Divine Shield Bleed Wipe
Clears 100% mortal strikes, bleeds, and stacking dungeon debuffs and immediately cancels the bubble before boss threat shifts to your raid.
\`\`\`
#showtooltip Divine Shield
/cast Divine Shield
/cancelaura Divine Shield
\`\`\`

#### B. Swing-Preserving Judgement Weave
Ensures casting Judgement never pauses your auto-attack swing timer or disrupts the 0.4s seal twist window.
\`\`\`
#showtooltip Judgement
/cast Judgement
/startattack
\`\`\`

#### C. Target-of-Target Cleanse & Blessing of Freedom
Cleanses debuffs and roots off whatever ally the enemy boss is currently targeting without changing your active target.
\`\`\`
#showtooltip Cleanse
/cast [@mouseover,help,nodead][@targettarget,help,nodead][@player] Cleanse
\`\`\`

#### D. Divine Favor + Holy Shock Guaranteed Crit Burst
Combines off-GCD 100% spell crit with Holy Shock for instant tank clutch saves or high-burst offensive executes.
\`\`\`
#showtooltip Holy Shock
/cast Divine Favor
/cast [@mouseover,exists][] Holy Shock
\`\`\`

#### E. Blessing of Protection Self-Cancel for Melee Warriors
Allows Warriors and Rogues who receive Blessing of Protection to dump mortal debuffs and immediately resume auto-attacking.
\`\`\`
#showtooltip
/cancelaura Blessing of Protection
\`\`\`

---

### 7. Warlock: Shard Farming Automation & Pet Anchor Kicks

#### A. Clipless Shard Drain Soul Harvester
Protects channel ticks and uses low-mana Rank 1 for effortless Soul Shard farming without wasting mana.
\`\`\`
#showtooltip Drain Soul
/stopcasting
/cast [nochanneling:Drain Soul] Drain Soul(Rank 1)
\`\`\`

#### B. Mouseover Felhunter Spell Lock (Pet Remains on Primary Target)
Fires your Felhunter's interrupt at a priority caster under your mouse cursor while your pet continues meleeing and building threat on its primary target.
\`\`\`
#showtooltip Spell Lock
/cast [@mouseover,harm,nodead][@focus,harm,nodead][] Spell Lock
\`\`\`

#### C. Target-of-Target Death Coil Peeler
Instantly fires Death Coil at whatever enemy is attacking your party healer without requiring manual targeting.
\`\`\`
#showtooltip Death Coil
/cast [@targettarget,harm,nodead][@mouseover,harm,nodead][] Death Coil
\`\`\`

#### D. All-in-One Multi-Curse Modifier Hub
Normal tap = Curse of Agony; Shift = Curse of the Elements; Alt = Curse of Tongues.
\`\`\`
#showtooltip
/cast [mod:shift] Curse of the Elements; [mod:alt] Curse of Tongues; Curse of Agony
\`\`\`

---

### 8. Shaman: Tank-Anchor Purging & Cast-Abort Wind Shear

#### A. Target-of-Target Boss Purge Engine
Strips shields, HoTs, and Bloodlusts off the boss through the tank without losing healing frames.
\`\`\`
#showtooltip Purge
/cast [@targettarget,harm,nodead][@mouseover,harm,nodead][harm,nodead] Purge
\`\`\`

#### B. Instant Cast-Abort Wind Shear
Immediately cancels any long Healing Wave or Lightning Bolt cast to land an instant kick within 0.1s.
\`\`\`
#showtooltip Wind Shear
/stopcasting
/cast [@focus,harm,nodead][@mouseover,harm,nodead][] Wind Shear
\`\`\`

#### C. Elemental Mastery Instant Chain Lightning Nuke
Triggers 100% crit chance, 0 mana cost, and instant cast time for an unstoppable triple-hit burst.
\`\`\`
#showtooltip Chain Lightning
/stopcasting
/cast Elemental Mastery
/cast Chain Lightning
\`\`\`

#### D. Ghost Wolf Anti-Snare Emergency Cleanse
Breaks movement slows and transitions into Ghost Wolf form in the same server tick.
\`\`\`
#showtooltip Ghost Wolf
/cancelaura [stance:1] Ghost Wolf
/cast !Ghost Wolf
\`\`\`

---

### 9. Druid: Tick-Aligned Powershifting & Swift-Shifting

#### A. The Immortal 'Tick-Aligned' Powershifting Engine
Cancels any active form and re-enters Cat Form in the exact same server tick to break movement impairing effects and gain 40 Furor Energy instantly.
\`\`\`
#showtooltip Cat Form
/cancelaura [stance:1] Bear Form; [stance:2] Aquatic Form; [stance:4] Travel Form
/cast !Cat Form
\`\`\`

#### B. Omni-Form Feral Charge Gap-Closer
Automatically shifts into Dire Bear Form if in caster or cat form, then fires Feral Charge in one fluid sequence.
\`\`\`
#showtooltip Feral Charge - Bear
/cast [nostance:1] Dire Bear Form
/cast Feral Charge - Bear
\`\`\`

#### C. Smart Travel, Aquatic & Mount Selector
Intelligently casts Aquatic Form if swimming, Cat Form if indoors, Travel Form if in combat outdoors, or summons your mount if out of combat.
\`\`\`
#showtooltip
/cast [swimming] Aquatic Form; [indoors] Cat Form; [combat,outdoors] Travel Form; [outdoors] Swift Mistsaber; Travel Form
\`\`\`

#### D. Nature's Swiftness Swift-Shift Healer Save
Immediately cancels cast, triggers Nature's Swiftness, and lands an instant max-rank Healing Touch on your mouseover or target-of-target ally.
\`\`\`
#showtooltip Nature's Swiftness
/stopcasting
/cast Nature's Swiftness
/cast [@mouseover,help,nodead][@targettarget,help,nodead][@player] Healing Touch
\`\`\`

---

### 10. Universal Meta Engine & CVar Optimizers

#### A. Client Latency Buffer & Camera Zoom Override
Unclamps camera distance beyond the standard interface slider and tunes the client SpellQueueWindow to match human reaction time (150ms).
\`\`\`
/console cameraDistanceMaxZoomFactor 2.6
/console SpellQueueWindow 150
/console autoLootDefault 1
/console floatingCombatTextCombatDamageDirectionalScale 0
\`\`\`

#### B. Universal Trinket & Racial Burst Stacker
Fires on-use trinkets (slots 13 and 14) and racial power cooldowns simultaneously without interfering with your main rotational ability.
\`\`\`
#showtooltip
/use 13
/use 14
/cast [race:Orc] Blood Fury; [race:Troll] Berserking
/cast Mortal Strike
\`\`\`

#### C. Self-Targeted Bandage Lock
Applies first aid directly to your character without deselecting your hostile target or breaking combat tracking.
\`\`\`
#showtooltip Heavy Silk Bandage
/use [@player] Heavy Silk Bandage
\`\`\`

#### D. Zero-Taint Raid Marker Radial Key
Toggles the Skull raid target marker on your mouseover or target with zero UI taint.
\`\`\`
/tm 8
\`\`\``
    }
  ]
};

// Export to window
if (typeof window !== 'undefined') {
  window.WOW_TOOLS_DATA = WOW_TOOLS_DATA;
}
