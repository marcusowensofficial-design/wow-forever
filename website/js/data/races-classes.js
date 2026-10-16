/**
 * World of Warcraft: Forever - Races & Classes Dataset
 * Contains new race/class combinations, all playable races, and class archetypes.
 */

if (typeof window !== 'undefined' && window.WOW_FOREVER_DATA) {
  window.WOW_FOREVER_DATA.newClassCombos = [
  {
    "race": "Undead (Forsaken)",
    "className": "Paladin",
    "faction": "Horde",
    "role": "Tank / Healer / DPS",
    "lore": "Former knights of the Silver Hand whose broken faith now burns with agonizing cleansing light. Unlocks the unique 'Forsaken Charger' skeletal warhorse mount at level 40!",
    "icon": "paladin-undead",
    "badgeColor": "#C41E3A",
    "mount": "Forsaken Charger (Unique Skeletal Warhorse)"
  },
  {
    "race": "Dwarf",
    "className": "Shaman",
    "faction": "Alliance",
    "role": "Healer / DPS / Tank",
    "lore": "Wildhammer clan emissaries from the Aerie Peak who commune with storm elementals and Khaz Modan stone. Brings Bloodlust and totems to Alliance.",
    "icon": "shaman-dwarf",
    "badgeColor": "#0078FF",
    "mount": "Armored Ram of the Storm"
  },
  {
    "race": "Gnome",
    "className": "Priest",
    "faction": "Alliance",
    "role": "Healer / DPS",
    "lore": "Tinkers and scholars of Gnomeregan who analyze the divine geometry of the Light and psychological frequencies of Shadow.",
    "icon": "priest-gnome",
    "badgeColor": "#0078FF",
    "mount": "Mechanostrider of Clarity"
  },
  {
    "race": "Orc",
    "className": "Mage",
    "faction": "Horde",
    "role": "Ranged DPS",
    "lore": "Students of ancient clan scrolls studying ley lines beneath Durotar, combining Blood Fury with devastating pyroblasts and arcane torrents.",
    "icon": "mage-orc",
    "badgeColor": "#C41E3A",
    "mount": "Arcane-Runed War Wolf"
  },
  {
    "race": "Human",
    "className": "Hunter",
    "faction": "Alliance",
    "role": "Ranged / Melee DPS",
    "lore": "Frontiersmen, royal gamekeepers, and marksmen from the Elwynn woods, accompanied by guard mastiffs and redridge cougars.",
    "icon": "hunter-human",
    "badgeColor": "#0078FF",
    "mount": "Elwynn Steed"
  },
  {
    "race": "Troll",
    "className": "Warlock",
    "faction": "Horde",
    "role": "Ranged DPS",
    "lore": "Shadow hunters and witch doctors who delve past Loa spirits into nether pacts, binding felhounds and succubi through ancient voodoo mojo.",
    "icon": "warlock-troll",
    "badgeColor": "#C41E3A",
    "mount": "Shadow-Marked Raptor"
  }
];
  window.WOW_FOREVER_DATA.allRacesData = [
  {
    "id": "human",
    "name": "Human",
    "faction": "Alliance",
    "icon": "👤",
    "crest": "🦁",
    "mount": "Elwynn Steed (Horse)",
    "lore": "Resilient and adaptive defenders of the Kingdom of Stormwind. Their mastery of swords, diplomatic spirit, and indomitable will make them natural leaders.",
    "allowedClasses": [
      {
        "name": "Warrior",
        "isNew": false
      },
      {
        "name": "Paladin",
        "isNew": false
      },
      {
        "name": "Hunter",
        "isNew": true,
        "note": "✦ NEW RACE/CLASS COMBINATION: Human Hunter — In original Classic, Humans could not be Hunters (Alliance was limited to Night Elf & Dwarf). WoW Forever unlocks Human Hunters as Stormwind marksmen and Elwynn Forest gamekeepers."
      },
      {
        "name": "Rogue",
        "isNew": false
      },
      {
        "name": "Priest",
        "isNew": false
      },
      {
        "name": "Mage",
        "isNew": false
      },
      {
        "name": "Warlock",
        "isNew": false
      }
    ],
    "racials": [
      {
        "name": "Will to Survive",
        "type": "Active",
        "effect": "Remove Stuns."
      },
      {
        "name": "Perception",
        "type": "Active • 20s",
        "effect": "Detect Stealthed enemies for 20 sec."
      },
      {
        "name": "Ruthless",
        "type": "Passive",
        "effect": "+2% critical strike chance with all spells and attacks."
      },
      {
        "name": "The Human Spirit",
        "type": "Passive",
        "effect": "5% increased Spirit."
      }
    ]
  },
  {
    "id": "dwarf",
    "name": "Dwarf",
    "faction": "Alliance",
    "icon": "⛏️",
    "crest": "🛡️",
    "mount": "Mountain Ram / Armored Storm Ram (Shaman)",
    "lore": "Hardy mountain-dwellers of Ironforge and the Wildhammer peaks of Aerie Peak. Master miners and storm-callers who draw resilience from Khaz Modan stone.",
    "allowedClasses": [
      {
        "name": "Warrior",
        "isNew": false
      },
      {
        "name": "Paladin",
        "isNew": false
      },
      {
        "name": "Hunter",
        "isNew": false
      },
      {
        "name": "Rogue",
        "isNew": false
      },
      {
        "name": "Priest",
        "isNew": false
      },
      {
        "name": "Shaman",
        "isNew": true,
        "note": "✦ NEW IN FOREVER: Wildhammer shamans bringing Bloodlust and totems to Alliance"
      }
    ],
    "racials": [
      {
        "name": "Stoneform",
        "type": "Active • 8s",
        "effect": "Immunity to Bleeds, Poisons, and Diseases and reduce Physical damage taken for 8 sec."
      },
      {
        "name": "Find Treasure",
        "type": "Active",
        "effect": "Track nearby treasure chests."
      },
      {
        "name": "Earth Fury",
        "type": "Passive",
        "effect": "+2% critical strike bonus to damage and healing."
      },
      {
        "name": "Big Game Hunter",
        "type": "Passive",
        "effect": "Damage to Beasts increased by 5%."
      }
    ]
  },
  {
    "id": "nightelf",
    "name": "Night Elf",
    "faction": "Alliance",
    "icon": "🌙",
    "crest": "🏹",
    "mount": "Nightsaber",
    "lore": "Ancient, reclusive protectors of Darnassus and Teldrassil attuned to the goddess Elune and the emerald dream.",
    "allowedClasses": [
      {
        "name": "Warrior",
        "isNew": false
      },
      {
        "name": "Hunter",
        "isNew": false
      },
      {
        "name": "Rogue",
        "isNew": false
      },
      {
        "name": "Priest",
        "isNew": false
      },
      {
        "name": "Druid",
        "isNew": false
      }
    ],
    "racials": [
      {
        "name": "Elune's Light",
        "type": "Active • 15s",
        "effect": "Increases critical chance by 10% for 15 sec."
      },
      {
        "name": "Shadowmeld",
        "type": "Active",
        "effect": "Gain Stealth while immobile."
      },
      {
        "name": "Quickness",
        "type": "Passive",
        "effect": "1% increased Dodge chance and 2% increased run speed."
      },
      {
        "name": "Wisp Spirit",
        "type": "Passive",
        "effect": "75% increased run speed while dead."
      }
    ]
  },
  {
    "id": "gnome",
    "name": "Gnome",
    "faction": "Alliance",
    "icon": "⚙️",
    "crest": "🔧",
    "mount": "Mechanostrider of Clarity",
    "lore": "Brilliant, eccentric inventors of Gnomeregan who analyze arcane calculus, mechanical wizardry, and divine geometry.",
    "allowedClasses": [
      {
        "name": "Warrior",
        "isNew": false
      },
      {
        "name": "Rogue",
        "isNew": false
      },
      {
        "name": "Priest",
        "isNew": true,
        "note": "✦ NEW IN FOREVER: Tinkers of the Light and psychological Shadow mechanics"
      },
      {
        "name": "Mage",
        "isNew": false
      },
      {
        "name": "Warlock",
        "isNew": false
      }
    ],
    "racials": [
      {
        "name": "Escape Artist",
        "type": "Active",
        "effect": "Brief Immunity to Roots and Snares."
      },
      {
        "name": "Eureka!",
        "type": "Active • 8s",
        "effect": "Increases spell damage and healing by 10% and reduces spell mana cost by 10% for 8 sec. Has no charge limit and directly benefits Power Word: Shield absorption."
      },
      {
        "name": "Expansive Mind",
        "type": "Passive",
        "effect": "Maximum Mana, Rage, or Energy increased by 5%."
      },
      {
        "name": "Engineering Specialization",
        "type": "Passive",
        "effect": "More reliable engineering devices."
      }
    ]
  },
  {
    "id": "skyborne",
    "name": "The Skyborne",
    "faction": "Neutral (Alliance or Horde at L10)",
    "icon": "🦅",
    "crest": "💨",
    "mount": "Cloudrunner / Sky-Strider",
    "lore": "A majestic neutral race of high elven wind-weavers who took refuge on Zephras Isle during the Great Sundering. Masters of aerodynamics and aerial combat.",
    "allowedClasses": [
      {
        "name": "Warrior",
        "isNew": true,
        "note": "✦ NEW PLAYABLE RACE: Aerial mobility & root-breaking charge (Both Factions)"
      },
      {
        "name": "Hunter",
        "isNew": true,
        "note": "✦ NEW PLAYABLE RACE: Wind-guided archery and cloud-falcon taming (Both Factions)"
      },
      {
        "name": "Rogue",
        "isNew": true,
        "note": "✦ NEW PLAYABLE RACE: Gliding backstabs and thermal shadow maneuvers (Both Factions)"
      },
      {
        "name": "Druid",
        "isNew": true,
        "note": "✦ NEW PLAYABLE RACE: Sky-eagle flight forms and wind-weave nature magic (Both Factions)"
      },
      {
        "name": "Mage",
        "isNew": true,
        "note": "✦ ALLIANCE EXCLUSIVE (High Order): Ley line scholars manipulating arcane thermals & pyroblasts"
      },
      {
        "name": "Shaman",
        "isNew": true,
        "note": "✦ HORDE EXCLUSIVE (Windshapers): Skywall wind pact elementals binding totems & lightning"
      }
    ],
    "racials": [
      {
        "name": "Walk on Air",
        "type": "Active • 10s",
        "effect": "Glide downward through the air for 10 sec."
      },
      {
        "name": "Read Leyline",
        "type": "Active • 2m CD",
        "effect": "2 sec cast, 2 min cooldown. Gain +100% mana, energy, and rage regeneration for 30 sec (or 15 min if channeled within 40 yards of an active leyline)."
      },
      {
        "name": "Wind Blessed",
        "type": "Passive",
        "effect": "1% increased melee, ranged, and spellcasting Haste."
      },
      {
        "name": "Elemental Insight",
        "type": "Passive",
        "effect": "Damage to Elementals increased by 5%."
      }
    ]
  },
  {
    "id": "orc",
    "name": "Orc",
    "faction": "Horde",
    "icon": "🐺",
    "crest": "🪓",
    "mount": "War Wolf / Arcane-Runed Wolf (Mage)",
    "lore": "Fierce warriors and shamans of Durotar who have forged a noble destiny under Thrall's Horde, embracing elemental honor and ley line magics.",
    "allowedClasses": [
      {
        "name": "Warrior",
        "isNew": false
      },
      {
        "name": "Hunter",
        "isNew": false
      },
      {
        "name": "Rogue",
        "isNew": false
      },
      {
        "name": "Shaman",
        "isNew": false
      },
      {
        "name": "Mage",
        "isNew": true,
        "note": "✦ NEW IN FOREVER: Durotar ley line scholars combining Blood Fury with Pyroblasts"
      },
      {
        "name": "Warlock",
        "isNew": false
      }
    ],
    "racials": [
      {
        "name": "Blood Fury",
        "type": "Active • 15s • 2m CD",
        "effect": "Increases Attack Power and Spell Power by 10% for 15 sec. 2 min cooldown."
      },
      {
        "name": "Shatter Curse",
        "type": "Active • 8s • 2m CD",
        "effect": "Removes all Curse and Bane effects and grants immunity to Curses and Banes while reducing Magical damage taken by 10% for 8 sec. 2 min cooldown."
      },
      {
        "name": "Savage",
        "type": "Passive",
        "effect": "+1% critical strike chance with all spells and abilities."
      },
      {
        "name": "Hardiness",
        "type": "Passive",
        "effect": "Stun durations decreased by 20%."
      }
    ]
  },
  {
    "id": "undead",
    "name": "Undead (Forsaken)",
    "faction": "Horde",
    "icon": "💀",
    "crest": "☣️",
    "mount": "Skeletal Warhorse / Forsaken Charger (Paladin)",
    "lore": "Free-willed undead of Lordaeron who broke free from the Lich King's grasp under Queen Sylvanas. Dark vengeance and agonizing holy light guide their crusade.",
    "allowedClasses": [
      {
        "name": "Warrior",
        "isNew": false
      },
      {
        "name": "Paladin",
        "isNew": true,
        "note": "✦ NEW IN FOREVER: Horde's first Paladin! Features custom Forsaken Charger skeletal warhorse"
      },
      {
        "name": "Rogue",
        "isNew": false
      },
      {
        "name": "Priest",
        "isNew": false
      },
      {
        "name": "Mage",
        "isNew": false
      },
      {
        "name": "Warlock",
        "isNew": false
      }
    ],
    "racials": [
      {
        "name": "Will of the Forsaken",
        "type": "Active",
        "effect": "Removes Charm, Fear, and Sleep."
      },
      {
        "name": "Cannibalize",
        "type": "Active",
        "effect": "Consume corpses to regenerate 35% Health and Mana over time."
      },
      {
        "name": "Underwater Breathing",
        "type": "Passive",
        "effect": "Breathe 300% longer underwater."
      },
      {
        "name": "Touch of the Grave",
        "type": "Passive",
        "effect": "Your damaging attacks and spells have a chance to trigger a shadow burst that drains the target for Shadow damage and heals you for 100% of the damage dealt."
      }
    ]
  },
  {
    "id": "tauren",
    "name": "Tauren",
    "faction": "Horde",
    "icon": "🐂",
    "crest": "🌾",
    "mount": "Kodo",
    "lore": "Spiritual, towering nomads of Mulgore dedicated to the Earth Mother, shamanic balance, and ancestral strength.",
    "allowedClasses": [
      {
        "name": "Warrior",
        "isNew": false
      },
      {
        "name": "Hunter",
        "isNew": false
      },
      {
        "name": "Shaman",
        "isNew": false
      },
      {
        "name": "Druid",
        "isNew": false
      }
    ],
    "racials": [
      {
        "name": "War Stomp",
        "type": "Active • 0.5s Cast • 2m CD",
        "effect": "Stuns up to 5 enemies within 8 yards for 2 sec. 0.5 sec cast, 2 min cooldown."
      },
      {
        "name": "Cultivation",
        "type": "Active • 1h CD",
        "effect": "Activate near an herb node to sprout a bonus herb nearby that can be gathered without the Herbalism profession. (✦ Note: Picking standard wild herb nodes still requires learning Herbalism)."
      },
      {
        "name": "Plainsrunning",
        "type": "Passive",
        "effect": "Increases movement speed by up to 40% after running continuously for 10 seconds outdoors. Taking damage or entering combat cancels the effect."
      },
      {
        "name": "Endurance",
        "type": "Passive",
        "effect": "Total Health increased by 5% and melee/spell Hit Chance increased by 1%."
      }
    ]
  },
  {
    "id": "troll",
    "name": "Troll (Darkspear)",
    "faction": "Horde",
    "icon": "🏹",
    "crest": "🌴",
    "mount": "Raptor",
    "lore": "Exiled island hunters and witch doctors led by Vol'jin who commune with Loa spirits, master voodoo hexes, and nether demonology.",
    "allowedClasses": [
      {
        "name": "Warrior",
        "isNew": false
      },
      {
        "name": "Hunter",
        "isNew": false
      },
      {
        "name": "Rogue",
        "isNew": false
      },
      {
        "name": "Priest",
        "isNew": false
      },
      {
        "name": "Shaman",
        "isNew": false
      },
      {
        "name": "Mage",
        "isNew": false
      },
      {
        "name": "Warlock",
        "isNew": true,
        "note": "✦ NEW IN FOREVER: Voodoo witch doctors binding nether demons through Loa mojo"
      }
    ],
    "racials": [
      {
        "name": "Berserking",
        "type": "Active • 10s",
        "effect": "Increases casting and attack speed by 10% for 10 sec."
      },
      {
        "name": "Rapid Regeneration",
        "type": "Active",
        "effect": "Regenerate 50% of maximum Health over time."
      },
      {
        "name": "Beast Slaying",
        "type": "Passive",
        "effect": "Damage to Beasts increased by 5%."
      },
      {
        "name": "Regeneration",
        "type": "Passive",
        "effect": "Total Health regeneration increased by 10%, and 10% of total Health regeneration may continue during combat."
      }
    ]
  }
];
  window.WOW_FOREVER_DATA.allClassesData = [
  {
    "id": "warrior",
    "name": "Warrior",
    "icon": "⚔️",
    "role": "Tank / Melee DPS",
    "specs": "Arms • Fury • Protection",
    "armor": "Plate (Lvl 40), Mail (1–39), Shields",
    "resource": "Rage",
    "color": "#C79C6E",
    "description": "Masters of physical combat who wield heavy plate armor and devastating two-handed weapons. Unstoppable frontline tanks and berserkers.",
    "allowedRaces": [
      {
        "id": "human",
        "name": "Human",
        "faction": "Alliance",
        "isNew": false
      },
      {
        "id": "dwarf",
        "name": "Dwarf",
        "faction": "Alliance",
        "isNew": false
      },
      {
        "id": "nightelf",
        "name": "Night Elf",
        "faction": "Alliance",
        "isNew": false
      },
      {
        "id": "gnome",
        "name": "Gnome",
        "faction": "Alliance",
        "isNew": false
      },
      {
        "id": "skyborne",
        "name": "The Skyborne",
        "faction": "Alliance & Horde",
        "isNew": true,
        "note": "✦ New in Forever: Aerial mobility & root-breaking charge"
      },
      {
        "id": "orc",
        "name": "Orc",
        "faction": "Horde",
        "isNew": false
      },
      {
        "id": "undead",
        "name": "Undead",
        "faction": "Horde",
        "isNew": false
      },
      {
        "id": "tauren",
        "name": "Tauren",
        "faction": "Horde",
        "isNew": false
      },
      {
        "id": "troll",
        "name": "Troll",
        "faction": "Horde",
        "isNew": false
      }
    ]
  },
  {
    "id": "paladin",
    "name": "Paladin",
    "icon": "🛡️",
    "role": "Tank / Healer / Melee DPS",
    "specs": "Holy • Protection • Retribution",
    "armor": "Plate (Lvl 40), Mail (1–39), Shields",
    "resource": "Mana",
    "color": "#F58CBA",
    "description": "Holy crusaders who protect allies with blessings, auras, and shields while smiting demons and undead with righteous light. Now receives Hand of Reckoning taunt.",
    "allowedRaces": [
      {
        "id": "human",
        "name": "Human",
        "faction": "Alliance",
        "isNew": false
      },
      {
        "id": "dwarf",
        "name": "Dwarf",
        "faction": "Alliance",
        "isNew": false
      },
      {
        "id": "undead",
        "name": "Undead (Forsaken)",
        "faction": "Horde",
        "isNew": true,
        "note": "✦ NEW IN FOREVER: Horde's first Paladin! Features custom Forsaken Charger skeletal warhorse"
      }
    ]
  },
  {
    "id": "hunter",
    "name": "Hunter",
    "icon": "🏹",
    "role": "Ranged / Melee DPS",
    "specs": "Beast Mastery • Marksmanship • Survival",
    "armor": "Mail (Lvl 40), Leather (1–39)",
    "resource": "Mana",
    "color": "#ABD473",
    "description": "Deadly trackers and marksmen of the wilderness who tame savage beasts, lay tactical traps, and unleash barrages of arrows and bullets.",
    "allowedRaces": [
      {
        "id": "human",
        "name": "Human",
        "faction": "Alliance",
        "isNew": true,
        "note": "✦ NEW RACE/CLASS COMBINATION: Human Hunter — In original Classic, Humans could not be Hunters (Alliance was limited to Night Elf & Dwarf). WoW Forever unlocks Human Hunters as Kingdom of Stormwind marksmen and Elwynn Forest gamekeepers."
      },
      {
        "id": "dwarf",
        "name": "Dwarf",
        "faction": "Alliance",
        "isNew": false
      },
      {
        "id": "nightelf",
        "name": "Night Elf",
        "faction": "Alliance",
        "isNew": false
      },
      {
        "id": "skyborne",
        "name": "The Skyborne",
        "faction": "Alliance & Horde",
        "isNew": true,
        "note": "✦ NEW RACE & CLASS COMBINATION: Skyborne Hunter — The Skyborne are a brand-new playable neutral race in WoW Forever hailing from Zephras Isle, mastering wind-guided archery and cloud-falcon taming."
      },
      {
        "id": "orc",
        "name": "Orc",
        "faction": "Horde",
        "isNew": false
      },
      {
        "id": "tauren",
        "name": "Tauren",
        "faction": "Horde",
        "isNew": false
      },
      {
        "id": "troll",
        "name": "Troll",
        "faction": "Horde",
        "isNew": false
      }
    ]
  },
  {
    "id": "rogue",
    "name": "Rogue",
    "icon": "🗡️",
    "role": "Melee DPS",
    "specs": "Assassination • Combat • Subtlety",
    "armor": "Leather",
    "resource": "Energy / Combo Points",
    "color": "#FFF569",
    "description": "Silent stalkers who strike from the shadows with dual daggers, lockpicking expertise, and deadly poisons. In Forever, poisons and abilities do not require vendor reagents.",
    "allowedRaces": [
      {
        "id": "human",
        "name": "Human",
        "faction": "Alliance",
        "isNew": false
      },
      {
        "id": "dwarf",
        "name": "Dwarf",
        "faction": "Alliance",
        "isNew": false
      },
      {
        "id": "nightelf",
        "name": "Night Elf",
        "faction": "Alliance",
        "isNew": false
      },
      {
        "id": "gnome",
        "name": "Gnome",
        "faction": "Alliance",
        "isNew": false
      },
      {
        "id": "skyborne",
        "name": "The Skyborne",
        "faction": "Alliance & Horde",
        "isNew": true,
        "note": "✦ New in Forever: Gliding backstabs and thermal shadow maneuvers"
      },
      {
        "id": "orc",
        "name": "Orc",
        "faction": "Horde",
        "isNew": false
      },
      {
        "id": "undead",
        "name": "Undead",
        "faction": "Horde",
        "isNew": false
      },
      {
        "id": "troll",
        "name": "Troll",
        "faction": "Horde",
        "isNew": false
      }
    ]
  },
  {
    "id": "priest",
    "name": "Priest",
    "icon": "✨",
    "role": "Healer / Ranged DPS",
    "specs": "Discipline • Holy • Shadow",
    "armor": "Cloth",
    "resource": "Mana",
    "color": "#FFFFFF",
    "description": "Masters of divine prayer and mind-bending shadow. Supreme group healers with Power Word shields, or devastating Shadowform damage dealers.",
    "allowedRaces": [
      {
        "id": "human",
        "name": "Human",
        "faction": "Alliance",
        "isNew": false
      },
      {
        "id": "dwarf",
        "name": "Dwarf",
        "faction": "Alliance",
        "isNew": false
      },
      {
        "id": "nightelf",
        "name": "Night Elf",
        "faction": "Alliance",
        "isNew": false
      },
      {
        "id": "gnome",
        "name": "Gnome",
        "faction": "Alliance",
        "isNew": true,
        "note": "✦ NEW IN FOREVER: Mechanostrider of Clarity mount; geometric Light and mental Shadow"
      },
      {
        "id": "undead",
        "name": "Undead",
        "faction": "Horde",
        "isNew": false
      },
      {
        "id": "troll",
        "name": "Troll",
        "faction": "Horde",
        "isNew": false
      }
    ]
  },
  {
    "id": "shaman",
    "name": "Shaman",
    "icon": "⚡",
    "role": "Healer / Melee & Ranged DPS / Off-Tank",
    "specs": "Elemental • Enhancement • Restoration",
    "armor": "Mail (Lvl 40), Leather (1–39), Shields",
    "resource": "Mana",
    "color": "#0070DE",
    "description": "Spiritual masters who commune with fire, earth, water, and air. Drop powerful totems and unleash chain lightning and healing rains.",
    "allowedRaces": [
      {
        "id": "dwarf",
        "name": "Dwarf (Wildhammer)",
        "faction": "Alliance",
        "isNew": true,
        "note": "✦ NEW IN FOREVER: Brings Bloodlust, Windfury, and totems to Alliance!"
      },
      {
        "id": "skyborne",
        "name": "The Skyborne (Windshapers)",
        "faction": "Horde",
        "isNew": true,
        "note": "✦ NEW IN FOREVER: Horde Windshapers channeling Skywall elementals, wind-infused totems & chain lightning"
      },
      {
        "id": "orc",
        "name": "Orc",
        "faction": "Horde",
        "isNew": false
      },
      {
        "id": "tauren",
        "name": "Tauren",
        "faction": "Horde",
        "isNew": false
      },
      {
        "id": "troll",
        "name": "Troll",
        "faction": "Horde",
        "isNew": false
      }
    ]
  },
  {
    "id": "mage",
    "name": "Mage",
    "icon": "🔥",
    "role": "Ranged DPS",
    "specs": "Arcane • Fire • Frost",
    "armor": "Cloth",
    "resource": "Mana",
    "color": "#69CCF0",
    "description": "Masters of the arcane elements who conjure food, teleport across continents with no rune cost, freeze foes in place, and unleash volcanic pyroblasts.",
    "allowedRaces": [
      {
        "id": "human",
        "name": "Human",
        "faction": "Alliance",
        "isNew": false
      },
      {
        "id": "gnome",
        "name": "Gnome",
        "faction": "Alliance",
        "isNew": false
      },
      {
        "id": "skyborne",
        "name": "The Skyborne (High Order)",
        "faction": "Alliance",
        "isNew": true,
        "note": "✦ NEW IN FOREVER: Alliance High Order ley scholars manipulating arcane thermals & devastating pyroblasts"
      },
      {
        "id": "orc",
        "name": "Orc",
        "faction": "Horde",
        "isNew": true,
        "note": "✦ NEW IN FOREVER: Ley line masters combining Blood Fury with devastating Pyroblasts"
      },
      {
        "id": "undead",
        "name": "Undead",
        "faction": "Horde",
        "isNew": false
      },
      {
        "id": "troll",
        "name": "Troll",
        "faction": "Horde",
        "isNew": false
      }
    ]
  },
  {
    "id": "warlock",
    "name": "Warlock",
    "icon": "🔮",
    "role": "Ranged DPS",
    "specs": "Affliction • Demonology • Destruction",
    "armor": "Cloth",
    "resource": "Mana / Health (Life Tap)",
    "color": "#9482C9",
    "description": "Dark practitioners who enslave demonic minions, curse enemies with lingering afflictions, and summon allies without burning endless soul shards.",
    "allowedRaces": [
      {
        "id": "human",
        "name": "Human",
        "faction": "Alliance",
        "isNew": false
      },
      {
        "id": "gnome",
        "name": "Gnome",
        "faction": "Alliance",
        "isNew": false
      },
      {
        "id": "orc",
        "name": "Orc",
        "faction": "Horde",
        "isNew": false
      },
      {
        "id": "undead",
        "name": "Undead",
        "faction": "Horde",
        "isNew": false
      },
      {
        "id": "troll",
        "name": "Troll (Darkspear)",
        "faction": "Horde",
        "isNew": true,
        "note": "✦ NEW IN FOREVER: Voodoo witch doctors binding nether demons through Loa mojo"
      }
    ]
  },
  {
    "id": "druid",
    "name": "Druid",
    "icon": "🌿",
    "role": "Tank / Healer / Melee & Ranged DPS",
    "specs": "Balance • Feral Combat • Restoration",
    "armor": "Leather",
    "resource": "Mana / Rage (Bear) / Energy (Cat)",
    "color": "#FF7D0A",
    "description": "Shape-shifting keepers of nature who transform into ferocious bears, swift feline stalkers, aquatic sea-beasts, or moonkin spellcasters.",
    "allowedRaces": [
      {
        "id": "nightelf",
        "name": "Night Elf",
        "faction": "Alliance",
        "isNew": false
      },
      {
        "id": "skyborne",
        "name": "The Skyborne",
        "faction": "Alliance & Horde",
        "isNew": true,
        "note": "✦ NEW IN FOREVER: Sky-eagle flight forms and wind-weave nature magic"
      },
      {
        "id": "tauren",
        "name": "Tauren",
        "faction": "Horde",
        "isNew": false
      }
    ]
  }
];
}
