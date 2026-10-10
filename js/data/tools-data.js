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
      title: "Cozy Sleeping Bag Guide (+3% XP Buff)",
      category: "Leveling & Utility",
      icon: "https://render.worldofwarcraft.com/us/icons/56/spell_nature_sleep.jpg",
      summary: "Rest in the Cozy Sleeping Bag for 3 minutes to gain a stacking +3% experience bonus for 2 hours.",
      content: `The Cozy Sleeping Bag is one of the most powerful leveling items in WoW Forever:
• How it works: Unroll your sleeping bag anywhere outdoors or inside a tent. Lie down for exactly 3 minutes.
• The Buff: Awards a 3% experience boost from all monster kills and quest turn-ins that persists for 2 full hours!
• Camping Synergy: When used inside a Tier 2 Silk/Ironwood Tent, the resting sleep cadence also generates Rested XP 200% faster!
• Location: Acquired from a short discovery questline starting at level 14 in Westfall (Alliance) or The Barrens (Horde).`
    },
    {
      id: "guide-hunter-pets",
      title: "Hunter Pets & Hardest Hitting Families",
      category: "Class Deep Dive",
      icon: "https://render.worldofwarcraft.com/us/icons/56/ability_hunter_beasttaming.jpg",
      summary: "Comprehensive guide to 502 beast spawns, damage modifiers, attack speed tiers, and pet families in Forever.",
      content: `Pet scaling and abilities have been overhauled for WoW Forever:
• Top Damage Families: Cats (+10% base damage modifier), Raptors (+10% damage), and Wind Serpents (Ranged Lightning Breath ignoring armor).
• Tanking Families: Bears (-9% damage, +8% armor, +5% health) and Turtles (Shell Shield -50% damage taken for 12 sec).
• Key Pet Attack Speeds:
  - Broken Tooth (Badlands): 1.00s attack speed (Fastest pushback in the game!)
  - The Rake (Mulgore): 1.20s attack speed cat
  - Dishu (Barrens): 1.30s cheetah
• Level 30 Beta Cap: At level 30, cats learn Claw Rank 5 and Bite Rank 5 for the highest burst DPS in Warsong Gulch 20-29 bracket.`
    },
    {
      id: "guide-library-books",
      title: "Hidden Library Books & Relic Accessories",
      category: "Exploration & Gear",
      icon: "https://render.worldofwarcraft.com/us/icons/56/inv_misc_book_12.jpg",
      summary: "Where to locate every hidden library book in Ironforge, Stormwind, Undercity, and Dalaran to earn rare rings and necklaces.",
      content: `Blizzard hid 12 interactive ancient tomes across capitals and leveling zones:
• Reward: Finding all 12 unlocks the 'Scholar of the First Realm' achievement, awarding the 'Lorekeeper's Binding' (Rare Ring: +6 All Stats) and 'Tome-Studded Choker' (Rare Neck).
• Book Locations in Phase 2:
  - Stormwind Royal Library: 'The Rise of the Defias Brotherhood' (behind high shelf)
  - Ironforge Hall of Explorers: 'Titan Foundations of Khaz Modan'
  - Dalaran Underbelly (Sewers): 'Forbidden Kirin Tor Necromancy'
  - Wetlands Excavation Dig: 'Tablets of Archeus'`
    },
    {
      id: "guide-duel-tournament",
      title: "$100,000 Level 30 Duel Tournament (Venruki & Durotar)",
      category: "PvP & Esports",
      icon: "https://render.worldofwarcraft.com/us/icons/56/achievement_arena_2v2_7.jpg",
      summary: "Level 30 closed beta tournament hosted by Venruki in Durotar, October 17–18 with $100,000 prize pool.",
      content: `The pinnacle of Phase 2 competitive testing:
• Dates: October 17 & October 18, 2026.
• Venue: Durotar Gates on the North American Beta megarealm.
• Ruleset: Level 30 cap, Best-of-3 single elimination, zero consumables (except class-conjured water/stones), no world buffs.
• Meta Watch: Feral Druids with Frenzied Regeneration, Ret Paladins with Voice of Truth silence immunity, and Arms Warriors with Spearing Strike are favored top contenders!`
    },
    {
      id: "guide-merchants-favor",
      title: "Merchant's Favor Currency & Dalaran Vendors",
      category: "Economy & Currencies",
      icon: "https://render.worldofwarcraft.com/us/icons/56/inv_misc_coin_02.jpg",
      summary: "How to earn and spend Merchant's Favor in Dalaran Underbelly and capital cities for dungeon catch-up gear, bags, and reagents.",
      content: `Merchant's Favor is the premier deterministic currency introduced in WoW Forever:
• Earning Favor:
  - Completing Daily Dungeon Quests for Excavation Site 4, City of Dalaran, and BFD awards 2–4 Merchant's Favor per run.
  - Slaying level 20–30 world rares grants 1 Merchant's Favor per rare kill (capped at 5 daily).
  - Turning in legacy trade goods to Dalaran Underbelly merchants.
• Vendor Offerings:
  - Phase 2 Pre-BiS Catch-Up: Weapons (iLvl 33–35) including Totem of the Storm, Wand of Mana Concentration, and Blightleaf Cinch for 15–25 Favor.
  - 14-Slot Kirin Tor Satchel: 20 Favor (Binds to Account).
  - Specialty Consumables: Elixirs of Giant Growth, Free Action Potions, and Swiftness Potions available for small coin + Favor trade.`
    },
    {
      id: "guide-transmog",
      title: "Classic+ Transmogrification & Wardrobe System",
      category: "Cosmetics & Collections",
      icon: "https://render.worldofwarcraft.com/us/icons/56/inv_chest_cloth_17.jpg",
      summary: "Forever's non-intrusive wardrobe system: rules, armor class restrictions, weapon silhouettes, and toggle options.",
      content: `WoW Forever implements a faithful Classic+ wardrobe system that honors character silhouettes:
• Strict Armor Type Rules: Cloth can only transmog Cloth, Leather only Leather, Mail only Mail, and Plate only Plate.
• Weapon Class Rules: One-handed swords only to 1H swords/axes/maces; two-handed weapons must match swing cadence and weapon class.
• PvP Silhouette Integrity:
  - Transmog is fully visible in open world, dungeons, and capitals.
  - In Battlegrounds (Warsong Gulch) and duels, players can enable 'Classic Authenticity Mode' to render opponents strictly in their true equipped items.
• Appearance Collection: Any soulbound green, blue, or epic item binds its visual to your account-wide Wardrobe collection automatically upon looting.`
    },
    {
      id: "guide-pvp-ranks",
      title: "PvP Honor Ranks 1–14 & Level 30 Warsong Gulch Bracket",
      category: "PvP & Battlegrounds",
      icon: "https://render.worldofwarcraft.com/us/icons/56/pvpcurrency-conquest-alliance.jpg",
      summary: "Warsong Gulch bracket meta at Level 30: Honor rank caps, insignia trinkets, flag running builds, and gear rewards.",
      content: `PvP progression has been redesigned with the new level caps in WoW Forever:
• Phase 2 Bracket: The 20–29 / 30 bracket features intense Warsong Gulch skirmishes.
• Honor Rank Cap: Phase 2 caps progression at Rank 4 (Master Sergeant / Senior Sergeant), unlocking:
  - Rank 2: Class PvP Insignia (Dispel CC on 5m CD)
  - Rank 3: 10% discount on all faction vendors
  - Rank 4: Superior PvP Cloak (+7 Stamina, +5 Agi/Str/Int)
• Flag Running Meta: Feral Druids with Travel Form (Level 30) and Cat Sprint dominate WSG midfield; Mages with Improved Blizzard and Frost Nova control ramp choke points.`
    },
    {
      id: "guide-rares-30",
      title: "34 Rare Spawns & Classic+ Drops (Level 10–30)",
      category: "Exploration & World Rares",
      icon: "https://render.worldofwarcraft.com/us/icons/56/inv_misc_head_dragon_bronze.jpg",
      summary: "Spawn timers, coordinates, and exclusive item drops for all 34 overhauled rare mobs across Westfall, Barrens, Ashenvale, and Wetlands.",
      content: `World rares in WoW Forever have guaranteed drop tables and drop Merchant's Favor:
• Top Level 20–30 Rare Spawns:
  - Lord Condar (Loch Modan, lvl 26): Drops Condar's Feathery Mantle (+8 Agi, +6 Sta leather shoulders).
  - Gesharahan (Barrens, lvl 24): Drops Petrified Bark Shield (Block 18, +5 Sta, +4 Str).
  - Ursol'lok (Ashenvale, lvl 31): Drops Claws of the Ursine (+9 Str, +7 Sta 1H Fist Weapon).
  - Garneg Charskull (Wetlands, lvl 28): Drops Ironband's Warmace (+12 Str, +5 Sta 2H Mace).
• Dynamic Respawn: World rares now feature pseudo-random 45-to-90 minute respawn timers rather than 8-hour classic lockouts.`
    },
    {
      id: "guide-druid-forms",
      title: "Druid Forms Unlock Guide (Aquatic, Cat, Travel & Snake)",
      category: "Class Quests & Secrets",
      icon: "https://render.worldofwarcraft.com/us/icons/56/ability_druid_travelform.jpg",
      summary: "Complete quest walk-through for Aquatic Form (lvl 16), Cat Form (lvl 20), Travel Form (lvl 30), and the hidden Snake Form.",
      content: `Druid form mechanics and quests in WoW Forever Phase 2:
• Aquatic Form (Level 16): Dual-continent questline (Moonglade -> Westfall/Silverpine coast). +50% swim speed, underwater breathing.
• Cat Form (Level 20): Granted directly at class trainer. Unlocks Claw, Rip, and Prowl stealth.
• Travel Form (Level 30): Available at level 30 trainer for 40% outdoor movement speed increase (replaces need for early level 40 mounts!).
• The Secret Serpent / Snake Form:
  - A hidden Wailing Caverns / Sunken Temple druid relic unlocks a cosmetic Viper Form with nature venom spit animation.`
    }
  ]
};

// Export to window
if (typeof window !== 'undefined') {
  window.WOW_TOOLS_DATA = WOW_TOOLS_DATA;
}
